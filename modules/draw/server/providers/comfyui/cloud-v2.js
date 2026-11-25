'use strict';

const { randomBytes } = require('node:crypto');
const {
    createUpstreamError,
    detectImageMime,
    endpoint,
    readErrorText,
    readJsonResponse,
    readResponseBuffer,
} = require('../upstream.js');

const DEFAULT_POLL_INTERVAL_MS = 1000;
const MAX_RETRY_AFTER_MS = 15_000;
const CANCEL_REQUEST_TIMEOUT_MS = 5_000;
const MAX_REDIRECT_HOPS = 5;
const TERMINAL_JOB_STATUSES = new Set(['succeeded', 'failed', 'canceled', 'expired']);
const PROBE_JOB_ID = '00000000-0000-0000-0000-000000000000';

function createAbortError(message = 'Request aborted') {
    return Object.assign(new Error(message), { name: 'AbortError' });
}

function generateIdempotencyKey() {
    const bytes = randomBytes(16);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = bytes.toString('hex');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function waitWithSignal(signal, duration = DEFAULT_POLL_INTERVAL_MS) {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            reject(createAbortError());
            return;
        }
        const finish = () => {
            signal?.removeEventListener('abort', abort);
            resolve();
        };
        const timer = setTimeout(finish, Math.max(0, duration));
        const abort = () => {
            clearTimeout(timer);
            reject(createAbortError());
        };
        signal?.addEventListener('abort', abort, { once: true });
    });
}

function buildBearerHeaders(auth) {
    const token = String(auth || '').trim();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

function parseRetryAfterMs(response, fallbackMs) {
    const raw = response?.headers?.get?.('retry-after');
    if (!raw) return fallbackMs;
    const seconds = Number(raw);
    if (Number.isFinite(seconds) && seconds >= 0) {
        return Math.min(MAX_RETRY_AFTER_MS, Math.max(200, Math.round(seconds * 1000)));
    }
    const timestamp = Date.parse(raw);
    if (Number.isFinite(timestamp)) {
        const delta = timestamp - Date.now();
        if (delta > 0) return Math.min(MAX_RETRY_AFTER_MS, Math.max(200, delta));
    }
    return fallbackMs;
}

function normalizeOriginProtocol(targetUrl, baseUrl) {
    const base = new URL(baseUrl);
    const target = targetUrl instanceof URL ? new URL(targetUrl.href) : new URL(targetUrl);
    // Comfy Cloud behind TLS-terminating proxies emits http:// links for the same host.
    // Upgrade same-host http:// links back to https:// so Cloudflare 301s never strip Bearer auth.
    if (base.protocol === 'https:' && target.protocol === 'http:' && target.host === base.host) {
        target.protocol = 'https:';
    }
    return target;
}

function resolveJobLink(baseUrl, link, fallbackPath) {
    const raw = String(link || '').trim();
    if (raw) {
        if (/^https?:\/\//i.test(raw)) return normalizeOriginProtocol(raw, baseUrl);
        if (raw.startsWith('/')) return new URL(raw, new URL(baseUrl).origin);
    }
    return endpoint(baseUrl, fallbackPath, { appendPath: true });
}

function parseErrorEnvelope(text) {
    if (!text) return null;
    try {
        const parsed = JSON.parse(text);
        if (parsed && typeof parsed === 'object') {
            if (parsed.error && typeof parsed.error === 'object') {
                return {
                    code: String(parsed.error.code || '').trim(),
                    message: String(parsed.error.message || '').trim(),
                    details: parsed.error.details && typeof parsed.error.details === 'object' ? parsed.error.details : null,
                };
            }
            if (typeof parsed.code === 'string' || typeof parsed.message === 'string') {
                return {
                    code: String(parsed.code || '').trim(),
                    message: String(parsed.message || '').trim(),
                    details: parsed.details && typeof parsed.details === 'object' ? parsed.details : null,
                };
            }
        }
    } catch (error) {
        if (!(error instanceof SyntaxError)) throw error;
    }
    return null;
}

function formatNodeErrors(nodeErrors) {
    if (!nodeErrors || typeof nodeErrors !== 'object') return '';
    return Object.entries(nodeErrors)
        .slice(0, 8)
        .map(([nodeId, entry]) => {
            const classType = entry?.class_type || 'Unknown';
            const list = Array.isArray(entry?.errors) ? entry.errors : [];
            const detail = list
                .map(err => err?.message || err?.details || err?.type || '')
                .filter(Boolean)
                .join('; ');
            return `${classType} [${nodeId}]${detail ? `: ${detail}` : ''}`;
        })
        .join('\n');
}

function formatCloudApiError(status, rawText) {
    const envelope = parseErrorEnvelope(rawText);
    const code = envelope?.code || '';
    const message = envelope?.message || rawText || `HTTP ${status}`;
    const nodeSummary = formatNodeErrors(envelope?.details?.node_errors);
    const suffix = nodeSummary ? `\n\n${nodeSummary}` : '';

    if (status === 401 || code === 'unauthorized') {
        return `Comfy Cloud 认证失败（HTTP ${status}）：请检查 API Key 是否正确或已失效。${message ? ` (${message})` : ''}`;
    }
    if (status === 402 || code === 'insufficient_credits') {
        return `Comfy Cloud Credits 余额不足（HTTP ${status}）：请检查账户余额或订阅状态。${message ? ` (${message})` : ''}`;
    }
    if (status === 403 || code === 'forbidden') {
        return `Comfy Cloud 权限不足（HTTP ${status}）：请确认账号拥有有效 Comfy Cloud 付费订阅与 API 访问权限。${message ? ` (${message})` : ''}`;
    }
    if (code === 'workflow_format_ui') {
        return '工作流格式错误：请从 ComfyUI / Comfy Cloud 使用 Export (API) 导出 API 格式工作流 JSON。';
    }
    if (code === 'unknown_node_class' && Array.isArray(envelope?.details?.unknown_node_classes) && envelope.details.unknown_node_classes.length) {
        return `Comfy Cloud 缺少自定义节点：${envelope.details.unknown_node_classes.join(', ')}${suffix}`;
    }
    if (status === 429 || code === 'rate_limited' || code === 'queue_full') {
        return `Comfy Cloud 并发或速率受限（HTTP ${status}）：${message}`;
    }
    return `Comfy Cloud 请求失败（HTTP ${status}${code ? ` / ${code}` : ''}）：${message}${suffix}`;
}

function formatJobExecutionError(jobError) {
    if (!jobError || typeof jobError !== 'object') {
        return 'Comfy Cloud 任务执行失败';
    }
    const code = String(jobError.code || '').trim();
    const message = String(jobError.message || '').trim();
    const nodePrefix = jobError.class_type || jobError.node_id
        ? `${jobError.class_type || 'Node'} [${jobError.node_id || '?'}] `
        : '';
    const nodeErrors = formatNodeErrors(jobError.node_errors);
    const detail = [nodePrefix + message, nodeErrors].filter(Boolean).join('\n\n');
    return `Comfy Cloud 生成失败${code ? ` (${code})` : ''}${detail ? `\n\n${detail}` : ''}`;
}

function isImageOutput(output) {
    if (!output || typeof output !== 'object') return false;
    if (String(output.type || '').toLowerCase() === 'image') return true;
    const mime = String(output.content_type || '').toLowerCase();
    return mime.startsWith('image/');
}

function selectCloudOutputs(job, preferredSaveImageNodeId, saveImageNodeIds = [], all = false) {
    const outputs = (Array.isArray(job?.outputs) ? job.outputs : []).filter(isImageOutput);
    if (!outputs.length) return all ? [] : null;

    const preferredId = String(preferredSaveImageNodeId || '').trim();
    if (preferredId) {
        const preferred = outputs.filter(item => String(item.node_id || '') === preferredId);
        if (preferred.length) return all ? preferred : preferred[0];
    }

    for (const nodeId of saveImageNodeIds) {
        const matched = outputs.filter(item => String(item.node_id || '') === String(nodeId));
        if (matched.length) return all ? matched : matched[0];
    }

    return all ? outputs : outputs[0];
}

function isRedirectStatus(status) {
    return status === 301 || status === 302 || status === 303 || status === 307 || status === 308;
}

async function fetchAssetBufferFollowingRedirects(initialUrl, { baseOrigin, authHeaders, signal }) {
    let currentUrl = new URL(initialUrl);
    for (let hop = 0; hop <= MAX_REDIRECT_HOPS; hop++) {
        const sameOrigin = currentUrl.origin === baseOrigin;
        const response = await fetch(currentUrl, {
            method: 'GET',
            headers: sameOrigin ? authHeaders : {},
            redirect: 'manual',
            signal,
        });
        if (isRedirectStatus(response.status)) {
            const location = response.headers.get('location');
            if (!location) {
                throw createUpstreamError(response, `Comfy Cloud asset redirect missing Location header (HTTP ${response.status})`);
            }
            const nextUrl = new URL(location, currentUrl);
            if (nextUrl.protocol !== 'http:' && nextUrl.protocol !== 'https:') {
                throw new Error('Comfy Cloud asset redirect used an unsupported protocol');
            }
            currentUrl = nextUrl;
            continue;
        }
        if (!response.ok) {
            const errorText = await readErrorText(response);
            throw createUpstreamError(response, formatCloudApiError(response.status, errorText));
        }
        return await readResponseBuffer(response);
    }
    throw new Error('Comfy Cloud asset download exceeded maximum redirect limit');
}

async function downloadCloudOutput({ baseUrl, authHeaders, output, signal }) {
    const baseOrigin = new URL(baseUrl).origin;
    const directUrl = String(output?.url || '').trim();
    const assetId = String(output?.id || '').trim();

    if (directUrl && /^https?:\/\//i.test(directUrl)) {
        try {
            const normalizedUrl = normalizeOriginProtocol(directUrl, baseUrl);
            return await fetchAssetBufferFollowingRedirects(normalizedUrl, { baseOrigin, authHeaders, signal });
        } catch (error) {
            if (error?.name === 'AbortError' || signal?.aborted || !assetId) throw error;
            // Signed output URLs can expire before download; fall back to /api/v2/assets/{id}/content.
            if (![401, 403, 404, 410].includes(Number(error?.status))) throw error;
        }
    }

    if (!assetId) {
        throw new Error('Comfy Cloud output did not include a downloadable url or asset id');
    }
    const contentUrl = endpoint(baseUrl, `/api/v2/assets/${encodeURIComponent(assetId)}/content`, { appendPath: true });
    return await fetchAssetBufferFollowingRedirects(contentUrl, { baseOrigin, authHeaders, signal });
}

function normalizeClassType(value) {
    return String(value || '').replace(/\s+/g, '').toLowerCase();
}

function outputTitleScore(node) {
    const title = String(node?._meta?.title || node?.title || '').trim();
    if (/final|最终/i.test(title)) return 50;
    if (/output|result|输出|结果/i.test(title)) return 40;
    if (/save|保存/i.test(title)) return 35;
    return 0;
}

function getSaveImageNodeIds(workflow) {
    return Object.entries(workflow || {})
        .filter(([, node]) => normalizeClassType(node?.class_type) === 'saveimage')
        .map(([id, node]) => ({ id: String(id), score: outputTitleScore(node) }))
        .sort((a, b) => b.score - a.score || Number(b.id) - Number(a.id))
        .map(entry => entry.id);
}

async function execute({ context, item, signal, pollIntervalMs = DEFAULT_POLL_INTERVAL_MS }) {
    const baseUrl = String(context?.url || '').trim();
    const auth = String(context?.auth || '').trim();
    const authHeaders = buildBearerHeaders(auth);
    const submitUrl = endpoint(baseUrl, '/api/v2/jobs', { appendPath: true });
    const workflow = item?.request?.workflow;
    const preferredSaveImageNodeId = String(item?.request?.preferredSaveImageNodeId || '').trim();
    const saveImageNodeIds = getSaveImageNodeIds(workflow);

    const payload = { workflow };
    // Comfy Platform API keys (comfyui-*) also authenticate Partner/API nodes inside workflows.
    if (/^comfyui-/i.test(auth)) {
        payload.extra_data = { api_key_comfy_org: auth };
    }

    let jobId = '';
    let cancelUrl = null;
    let cancelSent = false;

    const cancelCloudJob = () => {
        if (!jobId || cancelSent) return;
        cancelSent = true;
        const target = cancelUrl || endpoint(baseUrl, `/api/v2/jobs/${encodeURIComponent(jobId)}/cancel`, { appendPath: true });
        fetch(target, {
            method: 'POST',
            headers: { ...authHeaders, Accept: 'application/json' },
            signal: AbortSignal.timeout(CANCEL_REQUEST_TIMEOUT_MS),
        }).catch((caughtError) => {
            console.warn({ source: __filename, operation: 'cancelCloudJob' }, caughtError);
        });
    };

    signal?.addEventListener('abort', cancelCloudJob, { once: true });
    try {
        const submitResponse = await fetch(submitUrl, {
            method: 'POST',
            headers: {
                ...authHeaders,
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Idempotency-Key': generateIdempotencyKey(),
            },
            body: JSON.stringify(payload),
            signal,
        });
        if (!submitResponse.ok) {
            const errorText = await readErrorText(submitResponse);
            throw createUpstreamError(submitResponse, formatCloudApiError(submitResponse.status, errorText));
        }
        let job = await readJsonResponse(submitResponse);
        jobId = String(job?.id || '').trim();
        if (!jobId) {
            throw new Error('Comfy Cloud did not return a job ID');
        }
        const pollUrl = resolveJobLink(baseUrl, job?.urls?.self, `/api/v2/jobs/${encodeURIComponent(jobId)}`);
        cancelUrl = resolveJobLink(baseUrl, job?.urls?.cancel, `/api/v2/jobs/${encodeURIComponent(jobId)}/cancel`);

        if (signal?.aborted) {
            cancelCloudJob();
            throw createAbortError();
        }

        while (!signal?.aborted && !TERMINAL_JOB_STATUSES.has(String(job?.status || ''))) {
            await waitWithSignal(signal, pollIntervalMs);
            if (signal?.aborted) break;
            const pollResponse = await fetch(pollUrl, {
                method: 'GET',
                headers: { ...authHeaders, Accept: 'application/json' },
                signal,
            });
            if (pollResponse.status === 429 || pollResponse.status === 503) {
                const retryDelay = parseRetryAfterMs(pollResponse, Math.max(pollIntervalMs, 2000));
                await waitWithSignal(signal, retryDelay);
                continue;
            }
            if (!pollResponse.ok) {
                const errorText = await readErrorText(pollResponse);
                throw createUpstreamError(pollResponse, formatCloudApiError(pollResponse.status, errorText));
            }
            job = await readJsonResponse(pollResponse);
            if (job?.urls?.cancel) {
                cancelUrl = resolveJobLink(baseUrl, job.urls.cancel, `/api/v2/jobs/${encodeURIComponent(jobId)}/cancel`);
            }
        }

        if (signal?.aborted) throw createAbortError();

        const status = String(job?.status || '');
        if (status === 'failed') {
            throw new Error(formatJobExecutionError(job?.error));
        }
        if (status === 'canceled') {
            throw createAbortError('Comfy Cloud 任务已取消');
        }
        if (status === 'expired') {
            throw new Error('Comfy Cloud 任务在完成前已过期，请重试');
        }
        if (status !== 'succeeded') {
            throw new Error(`Comfy Cloud 返回了未知任务状态：${status || 'empty'}`);
        }

        if (item?.request?.resultMode === 'all') {
            const { packImageCollection, imageMime, IMAGE_COLLECTION_MIME } = await import('../../../shared/image-collection.js');
            const selectedOutputs = selectCloudOutputs(job, preferredSaveImageNodeId, saveImageNodeIds, true);
            const images = [];
            let incomplete = false;
            for (const output of selectedOutputs) {
                try {
                    const bytes = await downloadCloudOutput({ baseUrl, authHeaders, output, signal });
                    imageMime(bytes);
                    images.push(bytes);
                } catch (error) {
                    incomplete = true;
                    if (error?.name === 'AbortError' || signal?.aborted) break;
                }
            }
            if (!images.length) throw new Error('Comfy Cloud did not return a valid image');
            return { buffer: Buffer.from(packImageCollection(images, incomplete)), mime: IMAGE_COLLECTION_MIME };
        }

        const output = selectCloudOutputs(job, preferredSaveImageNodeId, saveImageNodeIds, false);
        if (!output) {
            throw new Error('Comfy Cloud 任务已完成，但未返回图片输出，请检查工作流的 SaveImage 节点配置');
        }
        const buffer = await downloadCloudOutput({ baseUrl, authHeaders, output, signal });
        const mime = detectImageMime(buffer);
        if (!mime) {
            throw new Error('Comfy Cloud returned an unsupported image format');
        }
        return { buffer, mime };
    } finally {
        signal?.removeEventListener('abort', cancelCloudJob);
    }
}

async function testConnection({ url, key = '', signal }) {
    const baseUrl = String(url || '').trim();
    const authHeaders = buildBearerHeaders(key);
    const probeUrl = endpoint(baseUrl, `/api/v2/jobs/${PROBE_JOB_ID}`, { appendPath: true });
    const response = await fetch(probeUrl, {
        method: 'GET',
        headers: { ...authHeaders, Accept: 'application/json' },
        signal,
    });
    const text = await readErrorText(response);
    const contentType = String(response.headers.get('content-type') || '').toLowerCase();
    const envelope = parseErrorEnvelope(text);

    if (response.status === 401 || response.status === 402 || response.status === 403) {
        return { ok: false, status: response.status, error: formatCloudApiError(response.status, text) };
    }
    if (response.status === 404 && (envelope?.code === 'not_found' || envelope?.code === 'job_not_found' || (contentType.includes('application/json') && envelope))) {
        return { ok: true, status: 200 };
    }
    if (response.ok && contentType.includes('application/json')) {
        return { ok: true, status: response.status };
    }
    if (response.status === 404) {
        return {
            ok: false,
            status: 404,
            error: '目标地址未响应 Comfy API v2 JSON 协议（HTTP 404），请确认地址为 https://cloud.comfy.org、Serverless Deployment 或 comfy-api-proxy 地址',
        };
    }
    return {
        ok: false,
        status: response.status,
        error: formatCloudApiError(response.status, text),
    };
}

module.exports = {
    DEFAULT_POLL_INTERVAL_MS,
    execute,
    formatCloudApiError,
    formatJobExecutionError,
    generateIdempotencyKey,
    resolveJobLink,
    selectCloudOutputs,
    testConnection,
};
