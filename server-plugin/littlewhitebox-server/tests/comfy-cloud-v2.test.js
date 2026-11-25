'use strict';

const assert = require('node:assert/strict');
const { EventEmitter } = require('node:events');
const { afterEach, test } = require('node:test');

const comfyAdapter = require('../../../modules/draw/server/providers/comfyui/adapter.js');
const cloudV2 = require('../../../modules/draw/server/providers/comfyui/cloud-v2.js');
const comfyBackendTransport = require('../../../modules/draw/providers/comfyui/backend-transport-contract.cjs');
const { registerTransportRoutes } = require('../../../modules/draw/server/transport.js');
const { createEnvelopeValidator } = require('../../../modules/draw/server/draw-runs/envelope.js');

const ORIGINAL_FETCH = global.fetch;
const PNG = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00]);
const JPEG = Buffer.from([0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10]);

afterEach(() => {
    global.fetch = ORIGINAL_FETCH;
});

function jsonResponse(body, status = 200, extraHeaders = {}) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json', ...extraHeaders },
    });
}

function makeWorkflow() {
    return {
        6: { class_type: 'CLIPTextEncode', inputs: { text: '1girl' } },
        9: { class_type: 'SaveImage', inputs: { images: ['8', 0] }, _meta: { title: 'Final output' } },
    };
}

test('Comfy Cloud API v2 submits with Bearer + Idempotency-Key + extra_data, polls follow-up link, and strips auth on cross-origin 302', async () => {
    const calls = [];
    let pollCount = 0;

    global.fetch = async (url, options = {}) => {
        const parsed = new URL(url);
        const headers = options.headers || {};
        calls.push({
            method: options.method || 'GET',
            href: parsed.href,
            headers,
            body: options.body ? JSON.parse(options.body) : null,
        });

        if (parsed.origin === 'https://cloud.comfy.org' && parsed.pathname === '/api/v2/jobs' && options.method === 'POST') {
            return jsonResponse({
                id: 'job-123',
                status: 'queued',
                outputs: [],
                urls: {
                    self: '/api/v2/jobs/job-123',
                    cancel: '/api/v2/jobs/job-123/cancel',
                    events: '/api/v2/jobs/job-123/events',
                },
            }, 201);
        }
        if (parsed.href === 'https://cloud.comfy.org/api/v2/jobs/job-123') {
            pollCount += 1;
            if (pollCount === 1) {
                return jsonResponse({
                    id: 'job-123',
                    status: 'running',
                    outputs: [],
                    urls: { self: '/api/v2/jobs/job-123', cancel: '/api/v2/jobs/job-123/cancel' },
                });
            }
            return jsonResponse({
                id: 'job-123',
                status: 'succeeded',
                outputs: [
                    {
                        node_id: '9',
                        name: 'out.png',
                        type: 'image',
                        content_type: 'image/png',
                        size_bytes: PNG.length,
                        id: 'asset-9',
                        url: 'https://cloud.comfy.org/api/v2/assets/asset-9/content',
                    },
                ],
                urls: { self: '/api/v2/jobs/job-123', cancel: '/api/v2/jobs/job-123/cancel' },
            });
        }
        if (parsed.href === 'https://cloud.comfy.org/api/v2/assets/asset-9/content') {
            return new Response(null, {
                status: 302,
                headers: { Location: 'https://storage.googleapis.com/signed-bucket/out.png?sig=abc' },
            });
        }
        if (parsed.href === 'https://storage.googleapis.com/signed-bucket/out.png?sig=abc') {
            return new Response(PNG, { status: 200, headers: { 'Content-Type': 'image/png' } });
        }
        throw new Error(`Unexpected fetch: ${parsed.href}`);
    };

    const result = await cloudV2.execute({
        context: { url: 'https://cloud.comfy.org', auth: 'comfyui-secret-key', connectionMode: 'cloud' },
        item: { request: { workflow: makeWorkflow(), preferredSaveImageNodeId: '9' } },
        signal: new AbortController().signal,
        pollIntervalMs: 1,
    });

    assert.deepEqual(result, { buffer: PNG, mime: 'image/png' });
    assert.equal(calls[0].headers.Authorization, 'Bearer comfyui-secret-key');
    assert.match(calls[0].headers['Idempotency-Key'], /^[0-9a-f-]{36}$/);
    assert.equal(calls[0].body.extra_data.api_key_comfy_org, 'comfyui-secret-key');

    const assetRedirectCall = calls.find(c => c.href.includes('/assets/asset-9/content'));
    assert.equal(assetRedirectCall.headers.Authorization, 'Bearer comfyui-secret-key');

    const gcsCall = calls.find(c => c.href.startsWith('https://storage.googleapis.com/'));
    assert.equal(gcsCall.headers.Authorization, undefined);
});

test('Comfy Cloud API v2 upgrades same-host http:// follow-up and output links to https:// so Bearer auth is preserved', async () => {
    const requested = [];
    global.fetch = async (url, options = {}) => {
        const parsed = new URL(url);
        requested.push({ href: parsed.href, auth: options.headers?.Authorization });
        if (parsed.href === 'https://cloud.comfy.org/api/v2/jobs' && options.method === 'POST') {
            return jsonResponse({
                id: 'job-http-link',
                status: 'queued',
                outputs: [],
                urls: {
                    self: 'http://cloud.comfy.org/api/v2/jobs/job-http-link',
                    cancel: 'http://cloud.comfy.org/api/v2/jobs/job-http-link/cancel',
                },
            }, 201);
        }
        if (parsed.href === 'https://cloud.comfy.org/api/v2/jobs/job-http-link') {
            return jsonResponse({
                id: 'job-http-link',
                status: 'succeeded',
                outputs: [{
                    node_id: '9',
                    type: 'image',
                    content_type: 'image/png',
                    id: 'asset-http',
                    url: 'http://cloud.comfy.org/api/v2/assets/asset-http/content',
                }],
                urls: {
                    self: 'http://cloud.comfy.org/api/v2/jobs/job-http-link',
                    cancel: 'http://cloud.comfy.org/api/v2/jobs/job-http-link/cancel',
                },
            });
        }
        if (parsed.href === 'https://cloud.comfy.org/api/v2/assets/asset-http/content') {
            return new Response(null, {
                status: 302,
                headers: { Location: 'https://storage.googleapis.com/signed/asset-http.png' },
            });
        }
        if (parsed.href === 'https://storage.googleapis.com/signed/asset-http.png') {
            return new Response(PNG, { status: 200 });
        }
        throw new Error(`Unexpected fetch: ${parsed.href}`);
    };

    const result = await cloudV2.execute({
        context: { url: 'https://cloud.comfy.org', auth: 'comfyui-secret', connectionMode: 'cloud' },
        item: { request: { workflow: makeWorkflow(), preferredSaveImageNodeId: '9' } },
        signal: new AbortController().signal,
        pollIntervalMs: 1,
    });

    assert.deepEqual(result, { buffer: PNG, mime: 'image/png' });
    assert.deepEqual(requested, [
        { href: 'https://cloud.comfy.org/api/v2/jobs', auth: 'Bearer comfyui-secret' },
        { href: 'https://cloud.comfy.org/api/v2/jobs/job-http-link', auth: 'Bearer comfyui-secret' },
        { href: 'https://cloud.comfy.org/api/v2/assets/asset-http/content', auth: 'Bearer comfyui-secret' },
        { href: 'https://storage.googleapis.com/signed/asset-http.png', auth: undefined },
    ]);
});

test('Comfy Cloud API v2 falls back from expired output.url to /api/v2/assets/{id}/content and supports resultMode=all', async () => {
    const requested = [];
    global.fetch = async (url, options = {}) => {
        const parsed = new URL(url);
        requested.push(parsed.href);
        if (parsed.pathname === '/api/v2/jobs' && options.method === 'POST') {
            return jsonResponse({
                id: 'job-batch',
                status: 'succeeded',
                outputs: [
                    { node_id: '9', type: 'image', content_type: 'image/png', id: 'a1', url: 'https://cdn.example.invalid/expired.png' },
                    { node_id: '9', type: 'image', content_type: 'image/jpeg', id: 'a2', url: 'https://cdn.example.invalid/fresh.jpg' },
                ],
                urls: { self: '/api/v2/jobs/job-batch', cancel: '/api/v2/jobs/job-batch/cancel' },
            }, 201);
        }
        if (parsed.href === 'https://cdn.example.invalid/expired.png') {
            return new Response('expired', { status: 403 });
        }
        if (parsed.href === 'https://cloud.comfy.org/api/v2/assets/a1/content') {
            return new Response(PNG, { status: 200 });
        }
        if (parsed.href === 'https://cdn.example.invalid/fresh.jpg') {
            return new Response(JPEG, { status: 200 });
        }
        throw new Error(`Unexpected fetch: ${parsed.href}`);
    };

    const result = await cloudV2.execute({
        context: { url: 'https://cloud.comfy.org', auth: 'comfyui-key', connectionMode: 'cloud' },
        item: { request: { workflow: makeWorkflow(), preferredSaveImageNodeId: '9', resultMode: 'all' } },
        signal: new AbortController().signal,
        pollIntervalMs: 1,
    });

    assert.equal(result.mime, 'application/vnd.littlewhitebox.images+zip');
    assert.ok(requested.includes('https://cloud.comfy.org/api/v2/assets/a1/content'));
});

test('Comfy Cloud API v2 cancels the active cloud job on abort', async () => {
    const controller = new AbortController();
    const calls = [];
    let markPolling;
    const polling = new Promise(resolve => { markPolling = resolve; });

    global.fetch = async (url, options = {}) => {
        const parsed = new URL(url);
        calls.push({ method: options.method || 'GET', pathname: parsed.pathname });
        if (parsed.pathname === '/api/v2/jobs' && options.method === 'POST') {
            return jsonResponse({
                id: 'job-abort',
                status: 'queued',
                outputs: [],
                urls: { self: '/api/v2/jobs/job-abort', cancel: '/api/v2/jobs/job-abort/cancel' },
            }, 201);
        }
        if (parsed.pathname === '/api/v2/jobs/job-abort/cancel') {
            return jsonResponse({ id: 'job-abort', status: 'canceling', outputs: [], urls: {} });
        }
        markPolling();
        return await new Promise((_resolve, reject) => {
            options.signal.addEventListener('abort', () => reject(Object.assign(new Error('aborted'), { name: 'AbortError' })), { once: true });
        });
    };

    const pending = cloudV2.execute({
        context: { url: 'https://cloud.comfy.org', auth: 'comfyui-key', connectionMode: 'cloud' },
        item: { request: { workflow: makeWorkflow(), preferredSaveImageNodeId: '9' } },
        signal: controller.signal,
        pollIntervalMs: 1,
    });
    await polling;
    controller.abort();

    await assert.rejects(pending, error => error?.name === 'AbortError');
    assert.deepEqual(calls.map(c => `${c.method} ${c.pathname}`), [
        'POST /api/v2/jobs',
        'GET /api/v2/jobs/job-abort',
        'POST /api/v2/jobs/job-abort/cancel',
    ]);
});

test('Comfy Cloud API v2 surfaces credit, auth, and node execution errors clearly', async () => {
    global.fetch = async () => jsonResponse({
        error: { code: 'insufficient_credits', message: 'Not enough credits' },
    }, 402);

    await assert.rejects(
        cloudV2.execute({
            context: { url: 'https://cloud.comfy.org', auth: 'comfyui-key', connectionMode: 'cloud' },
            item: { request: { workflow: makeWorkflow() } },
            signal: new AbortController().signal,
            pollIntervalMs: 1,
        }),
        /Credits 余额不足/,
    );

    global.fetch = async (url, options = {}) => {
        const parsed = new URL(url);
        if (parsed.pathname === '/api/v2/jobs' && options.method === 'POST') {
            return jsonResponse({
                id: 'job-fail',
                status: 'failed',
                outputs: [],
                error: {
                    code: 'node_execution_error',
                    message: 'Checkpoint not found',
                    node_id: '4',
                    class_type: 'CheckpointLoaderSimple',
                },
                urls: { self: '/api/v2/jobs/job-fail', cancel: '/api/v2/jobs/job-fail/cancel' },
            }, 201);
        }
        throw new Error(`Unexpected fetch: ${parsed.href}`);
    };

    await assert.rejects(
        cloudV2.execute({
            context: { url: 'https://cloud.comfy.org', auth: 'comfyui-key', connectionMode: 'cloud' },
            item: { request: { workflow: makeWorkflow() } },
            signal: new AbortController().signal,
            pollIntervalMs: 1,
        }),
        /CheckpointLoaderSimple \[4\] Checkpoint not found/,
    );
});

test('Comfy Cloud testConnection distinguishes valid v2 404 JSON from auth errors and non-API HTML 404', async () => {
    global.fetch = async () => jsonResponse({ error: { code: 'not_found', message: 'Job not found' } }, 404);
    const ok = await cloudV2.testConnection({ url: 'https://cloud.comfy.org', key: 'comfyui-valid', signal: new AbortController().signal });
    assert.equal(ok.ok, true);

    global.fetch = async () => jsonResponse({ error: { code: 'unauthorized', message: 'Invalid key' } }, 401);
    const unauthorized = await cloudV2.testConnection({ url: 'https://cloud.comfy.org', key: 'bad', signal: new AbortController().signal });
    assert.equal(unauthorized.ok, false);
    assert.equal(unauthorized.status, 401);

    global.fetch = async () => new Response('<html>404 Not Found</html>', { status: 404, headers: { 'Content-Type': 'text/html' } });
    const wrongSite = await cloudV2.testConnection({ url: 'https://example.com', key: 'comfyui-valid', signal: new AbortController().signal });
    assert.equal(wrongSite.ok, false);
    assert.equal(wrongSite.status, 404);
});

test('ComfyUI adapter delegates connectionMode=cloud to Comfy API v2 while preserving legacy normalization', async () => {
    const legacy = comfyAdapter.normalize(
        { url: 'http://127.0.0.1:8188', auth: 'u:p' },
        [{ request: { workflow: makeWorkflow() }, timeout: 30000 }],
        { parseTimeout: Number, parseUrl: String },
    );
    assert.deepEqual(legacy.context, { url: 'http://127.0.0.1:8188', auth: 'u:p' });

    const cloud = comfyAdapter.normalize(
        { url: 'https://cloud.comfy.org', auth: 'comfyui-abc', connectionMode: 'cloud' },
        [{ request: { workflow: makeWorkflow(), preferredSaveImageNodeId: '9' }, timeout: 30000 }],
        { parseTimeout: Number, parseUrl: String },
    );
    assert.deepEqual(cloud.context, { url: 'https://cloud.comfy.org', auth: 'comfyui-abc', connectionMode: 'cloud' });

    global.fetch = async (url, options = {}) => {
        const parsed = new URL(url);
        if (parsed.pathname === '/api/v2/jobs' && options.method === 'POST') {
            return jsonResponse({
                id: 'job-adapter',
                status: 'succeeded',
                outputs: [{ node_id: '9', type: 'image', content_type: 'image/png', id: 'asset-1', url: 'https://cdn.example.invalid/a.png' }],
                urls: { self: '/api/v2/jobs/job-adapter', cancel: '/api/v2/jobs/job-adapter/cancel' },
            }, 201);
        }
        return new Response(PNG, { status: 200 });
    };

    const output = await comfyAdapter.execute({
        context: cloud.context,
        item: cloud.items[0],
        signal: new AbortController().signal,
    });
    assert.deepEqual(output, { buffer: PNG, mime: 'image/png' });
});

test('server transport routes handle comfy-cloud-test and comfy-cloud-generate via /v2 endpoints', async () => {
    const routes = new Map();
    registerTransportRoutes({ post: (routePath, handler) => routes.set(routePath, handler) });

    global.fetch = async (url, options = {}) => {
        const parsed = new URL(url);
        if (parsed.pathname.startsWith('/api/v2/jobs/00000000')) {
            return jsonResponse({ error: { code: 'not_found', message: 'No such job' } }, 404);
        }
        if (parsed.pathname === '/api/v2/jobs' && options.method === 'POST') {
            return jsonResponse({
                id: 'job-transport',
                status: 'succeeded',
                outputs: [{ node_id: '9', type: 'image', content_type: 'image/png', id: 'asset-t', url: 'https://cdn.example.invalid/t.png' }],
                urls: { self: '/api/v2/jobs/job-transport', cancel: '/api/v2/jobs/job-transport/cancel' },
            }, 201);
        }
        return new Response(PNG, { status: 200 });
    };

    const invoke = async (routePath, body) => {
        const req = Object.assign(new EventEmitter(), { body });
        let statusCode = 200;
        let sentBody = null;
        const res = Object.assign(new EventEmitter(), {
            headersSent: false,
            writableEnded: false,
            status(code) { statusCode = code; return this; },
            send(payload) { sentBody = payload; this.writableEnded = true; return this; },
        });
        const handler = routes.get(routePath);
        await handler(req, res, error => { throw error; });
        return { statusCode, body: sentBody };
    };

    const testResult = await invoke(comfyBackendTransport.testPath, {
        operation: comfyBackendTransport.testOperation,
        url: 'https://cloud.comfy.org',
        key: 'comfyui-test',
        timeout: 10000,
    });
    assert.equal(testResult.statusCode, 200);
    assert.equal(testResult.body.ok, true);

    const genResult = await invoke(comfyBackendTransport.generatePath, {
        operation: comfyBackendTransport.generateOperation,
        url: 'https://cloud.comfy.org',
        key: 'comfyui-test',
        payload: { workflow: makeWorkflow(), preferredSaveImageNodeId: '9' },
        timeout: 10000,
    });
    assert.equal(genResult.statusCode, 200);
    assert.equal(genResult.body.ok, true);
    assert.equal(genResult.body.base64, PNG.toString('base64'));
    assert.equal(genResult.body.mime, 'image/png');
});

test('ComfyUI compiler and DrawRun envelope propagate optional connectionMode=cloud cleanly', async () => {
    const { compile } = await import('../../../modules/draw/providers/comfyui/compiler.js');
    const workflowJson = JSON.stringify(makeWorkflow());
    const recipe = {
        host: 'https://cloud.comfy.org',
        auth: 'comfyui-key',
        connectionMode: 'cloud',
        timeout: 120000,
        delayMs: 1000,
        workflowMode: 'custom',
        customWorkflow: {
            json: workflowJson,
            nodePositive: '6',
            nodeNegative: '',
            nodeWidth: '',
            nodeHeight: '',
            nodeSeed: '',
            nodeSaveImage: '9',
        },
        params: { width: 1024, height: 1024 },
        positivePrefix: '',
        negativePrefix: '',
        knownCharacters: [],
        promptOverride: '',
        negativePromptOverride: '',
        seeds: [42],
    };

    const compiled = compile([{ scene: '1girl, sunset' }], recipe);
    assert.deepEqual(compiled.context, {
        url: 'https://cloud.comfy.org',
        auth: 'comfyui-key',
        connectionMode: 'cloud',
    });

    const validator = createEnvelopeValidator({
        hashSceneSource: text => `hash:${text}`,
        assertDrawRunId: id => id,
        assertScenePlannerMessages: () => {},
        assertSubmitScenePlanTool: () => {},
        getNovelModelCapability: () => ({}),
    });
    const baseEnvelope = {
        version: 1,
        runId: 'run-cloud-1',
        sourceHash: 'hash:hello',
        imageProvider: 'comfyui',
        planner: {
            prompt: { systemPrompt: '', messages: [{ role: 'user', content: 'hi' }] },
            tool: { name: 'submit_scene_plan' },
            validationContext: {
                sceneSource: {
                    sourceText: 'hello',
                    sourceHash: 'hash:hello',
                    content: 'hello',
                    numberedContent: '1. hello',
                    points: [{ number: 1, offset: 5 }],
                },
                effectiveMaxImages: 1,
                maxPlanImages: 1,
                effectiveMaxCharactersPerImage: 0,
                centerMode: 'grid',
            },
            presentCharacters: [],
        },
        agent: {
            channel: 'openai-compatible',
            providerConfig: {
                provider: 'openai-compatible',
                baseUrl: 'https://api.example.test/v1',
                model: 'gpt-4o-mini',
                maxTokens: 1024,
                timeoutMs: 30000,
                toolMode: 'native',
                reasoning: {},
            },
        },
        generationRecipe: recipe,
    };

    const validated = validator(baseEnvelope);
    assert.equal(validated.envelope.generationRecipe.connectionMode, 'cloud');

    assert.throws(
        () => validator({
            ...baseEnvelope,
            generationRecipe: { ...recipe, connectionMode: 'invalid-mode' },
        }),
        /generationRecipe\.connectionMode is invalid/,
    );
});
