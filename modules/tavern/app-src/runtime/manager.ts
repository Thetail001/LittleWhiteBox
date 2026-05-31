import { createAgentAdapter, resolveActiveProviderConfig } from '../../../agent-core/provider-config.js';
import type { XbTavernMessage } from '../../shared/message-assembler';
import {
    createTavernManagerRun,
    listTavernEpisodeSummaries,
    listTavernMessages,
    listTavernTurnSummaries,
    updateTavernManagerRun,
    upsertTavernEpisodeSummary,
    upsertTavernTurnSummary,
    type TavernEpisodeSummaryRecord,
    type TavernManagerRunRecord,
    type TavernMessageRecord,
    type TavernTurnSummaryRecord,
} from '../../shared/session-db';
import { getXbTavernProviderLabel } from './provider';

export type XbTavernEpisodeDecisionAction =
    | 'append_to_existing'
    | 'create_new_episode'
    | 'keep_unassigned'
    | 'revise_recent';

export interface XbTavernManagerParsedResult {
    turnSummary?: Partial<TavernTurnSummaryRecord>;
    episodeDecision?: {
        action?: XbTavernEpisodeDecisionAction;
        episodeId?: string;
        title?: string;
        summary?: string;
        keyChanges?: string[];
        unresolved?: string[];
        turnSummaryIds?: string[];
    };
}

export interface XbTavernManagerOnceOptions {
    agentConfig: Record<string, unknown>;
    messages: XbTavernMessage[];
    signal?: AbortSignal;
}

export interface XbTavernManagerOnceResult {
    text: string;
    provider?: string;
    model?: string;
}

export interface XbTavernManagerRunInput {
    sessionId: string;
    agentConfig: Record<string, unknown>;
    userMessage: TavernMessageRecord;
    assistantMessage: TavernMessageRecord;
    turn: number;
    trigger?: string;
    managerRunId?: string;
    recentTurnSummaries?: TavernTurnSummaryRecord[];
    recentEpisodeSummaries?: TavernEpisodeSummaryRecord[];
    signal?: AbortSignal;
    executeManagerOnce?: (options: XbTavernManagerOnceOptions) => Promise<XbTavernManagerOnceResult>;
}

export interface XbTavernManagerRunResult {
    ok: boolean;
    managerRun: TavernManagerRunRecord;
    turnSummary?: TavernTurnSummaryRecord;
    episodeSummary?: TavernEpisodeSummaryRecord;
    error?: string;
}

export interface XbTavernManagerScheduleResult {
    managerRunId: string;
    managerStatus: TavernManagerRunRecord['status'];
    completion?: Promise<XbTavernManagerRunResult>;
}

const managerQueues = new Map<string, Promise<unknown>>();

function normalizeText(value: unknown = '', limit = 4000): string {
    const text = String(value || '').trim();
    return text.length > limit ? text.slice(0, limit) : text;
}

function normalizeStringArray(value: unknown, limit = 12): string[] {
    const items = Array.isArray(value) ? value : typeof value === 'string' ? [value] : [];
    return items
        .map((item) => normalizeText(item, 240))
        .filter(Boolean)
        .slice(0, limit);
}

function safeJson(value: unknown): string {
    try {
        return JSON.stringify(value, null, 2);
    } catch {
        return String(value || '');
    }
}

function extractJsonObject(text = ''): Record<string, unknown> | null {
    const source = String(text || '').trim();
    if (!source) {return null;}
    const fenced = source.match(/```(?:json)?\s*([\s\S]*?)```/i);
    const candidate = fenced?.[1]?.trim() || source;
    try {
        const parsed = JSON.parse(candidate);
        return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
            ? parsed as Record<string, unknown>
            : null;
    } catch {
        const start = candidate.indexOf('{');
        const end = candidate.lastIndexOf('}');
        if (start >= 0 && end > start) {
            try {
                const parsed = JSON.parse(candidate.slice(start, end + 1));
                return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
                    ? parsed as Record<string, unknown>
                    : null;
            } catch {
                return null;
            }
        }
        return null;
    }
}

function normalizeAction(value: unknown): XbTavernEpisodeDecisionAction {
    const action = String(value || '').trim();
    return ['append_to_existing', 'create_new_episode', 'keep_unassigned', 'revise_recent'].includes(action)
        ? action as XbTavernEpisodeDecisionAction
        : 'keep_unassigned';
}

export function parseXbTavernManagerResult(text = ''): XbTavernManagerParsedResult {
    const parsed = extractJsonObject(text);
    if (!parsed) {
        throw new Error('manager_result_json_required');
    }
    const turnSource = parsed.turnSummary && typeof parsed.turnSummary === 'object'
        ? parsed.turnSummary as Record<string, unknown>
        : {};
    const episodeSource = parsed.episodeDecision && typeof parsed.episodeDecision === 'object'
        ? parsed.episodeDecision as Record<string, unknown>
        : {};
    const summary = normalizeText(turnSource.summary, 2000);
    if (!summary) {
        throw new Error('manager_turn_summary_required');
    }
    return {
        turnSummary: {
            summary,
            characterState: normalizeText(turnSource.characterState, 1200),
            relationshipChange: normalizeText(turnSource.relationshipChange, 1200),
            locationTimeItems: normalizeText(turnSource.locationTimeItems, 1200),
            hooks: normalizeStringArray(turnSource.hooks),
            tags: normalizeStringArray(turnSource.tags),
        },
        episodeDecision: {
            action: normalizeAction(episodeSource.action),
            episodeId: normalizeText(episodeSource.episodeId, 200),
            title: normalizeText(episodeSource.title, 160),
            summary: normalizeText(episodeSource.summary, 4000),
            keyChanges: normalizeStringArray(episodeSource.keyChanges, 20),
            unresolved: normalizeStringArray(episodeSource.unresolved, 20),
            turnSummaryIds: normalizeStringArray(episodeSource.turnSummaryIds, 20),
        },
    };
}

function buildManagerSystemPrompt(): string {
    return [
        '你是小白酒馆的后台管理者，只维护会话记忆，不参与角色扮演。',
        '主聊天助手负责和用户 RP；你只在后台阅读一轮 user/assistant 原文、最近小总结和阶段大总结。',
        '你的任务是生成本轮小总结，并判断它是否属于某个剧情阶段。',
        '不要写小说正文，不要替角色说话，不要解释工作流程。',
        '必须只返回 JSON，不要 Markdown，不要代码块。',
    ].join('\n');
}

function buildManagerUserPrompt(input: {
    turn: number;
    userMessage: TavernMessageRecord;
    assistantMessage: TavernMessageRecord;
    recentTurnSummaries: TavernTurnSummaryRecord[];
    recentEpisodeSummaries: TavernEpisodeSummaryRecord[];
}): string {
    return [
        '[本轮原文定位]',
        `turn: ${input.turn}`,
        `userOrder: ${input.userMessage.order}`,
        `assistantOrder: ${input.assistantMessage.order}`,
        '',
        '[用户消息]',
        input.userMessage.content,
        '',
        '[角色回复]',
        input.assistantMessage.content,
        '',
        '[最近小总结]',
        safeJson(input.recentTurnSummaries.slice(-8).map((summary) => ({
            id: summary.id,
            turn: summary.turn,
            episodeId: summary.episodeId,
            summary: summary.summary,
            tags: summary.tags,
        }))),
        '',
        '[最近阶段大总结]',
        safeJson(input.recentEpisodeSummaries.slice(-4).map((episode) => ({
            id: episode.id,
            title: episode.title,
            startTurn: episode.startTurn,
            endTurn: episode.endTurn,
            summary: episode.summary,
            keyChanges: episode.keyChanges,
            unresolved: episode.unresolved,
        }))),
        '',
        '[输出 JSON 结构]',
        safeJson({
            turnSummary: {
                summary: '本轮发生了什么，保留因果和情绪变化。',
                characterState: '角色当前状态变化，没有则空字符串。',
                relationshipChange: '关系变化，没有则空字符串。',
                locationTimeItems: '时间、地点、物品变化，没有则空字符串。',
                hooks: ['未解决钩子'],
                tags: ['关键词'],
            },
            episodeDecision: {
                action: 'append_to_existing | create_new_episode | keep_unassigned | revise_recent',
                episodeId: '并入/修正已有阶段时填写已有 id，否则空字符串。',
                title: '新阶段或更新阶段标题。',
                summary: '阶段大总结。keep_unassigned 时可为空。',
                keyChanges: ['阶段关键变化'],
                unresolved: ['阶段未解决问题'],
                turnSummaryIds: ['列出属于这个阶段的相关小总结 id；本轮小总结会由系统自动补上。'],
            },
        }),
    ].join('\n');
}

function buildInputSummary(input: XbTavernManagerRunInput): string {
    return `turn ${input.turn}; messages ${input.userMessage.order}/${input.assistantMessage.order}; user ${input.userMessage.content.length} chars; assistant ${input.assistantMessage.content.length} chars`;
}

async function runManagerOnce(options: XbTavernManagerOnceOptions): Promise<XbTavernManagerOnceResult> {
    const providerConfig = resolveActiveProviderConfig(options.agentConfig || {}, {
        role: 'delegate',
        timeoutMs: 15 * 60 * 1000,
    });
    const adapter = createAgentAdapter(providerConfig, {
        missingApiKeyMessage: '请先在 API 配置里填写后台管理者 API。'
    });
    const result = await adapter.chat({
        systemPrompt: options.messages[0]?.content || '',
        messages: options.messages.slice(1),
        tools: [],
        toolChoice: 'none',
        temperature: providerConfig.temperature,
        maxTokens: providerConfig.maxTokens,
        signal: options.signal,
        onStreamProgress: () => {},
    });
    return {
        text: String(result?.text || '').trim(),
        provider: String(result?.provider || providerConfig.provider || ''),
        model: String(result?.model || providerConfig.model || ''),
    };
}

async function applyEpisodeDecision(input: {
    sessionId: string;
    turn: number;
    turnSummary: TavernTurnSummaryRecord;
    decision: NonNullable<XbTavernManagerParsedResult['episodeDecision']>;
    recentEpisodeSummaries: TavernEpisodeSummaryRecord[];
    recentTurnSummaries: TavernTurnSummaryRecord[];
}): Promise<TavernEpisodeSummaryRecord | undefined> {
    const action = normalizeAction(input.decision.action);
    if (action === 'keep_unassigned') {return undefined;}
    const allEpisodes = await listTavernEpisodeSummaries(input.sessionId);
    const allTurnSummaries = await listTavernTurnSummaries(input.sessionId);
    const latestEpisode = allEpisodes[allEpisodes.length - 1]
        || input.recentEpisodeSummaries[input.recentEpisodeSummaries.length - 1];
    const targetId = normalizeText(input.decision.episodeId)
        || (action === 'append_to_existing' || action === 'revise_recent' ? latestEpisode?.id || '' : '');
    const explicitTargetExists = !normalizeText(input.decision.episodeId)
        || allEpisodes.some((episode) => episode.id === targetId)
        || input.recentEpisodeSummaries.some((episode) => episode.id === targetId);
    if (action !== 'create_new_episode' && !targetId) {return undefined;}
    if (action !== 'create_new_episode' && !explicitTargetExists) {return undefined;}
    const activeTurnIds = new Set(allTurnSummaries.map((summary) => summary.id));
    const summaryIds = [
        ...normalizeStringArray(input.decision.turnSummaryIds, 100)
            .filter((summaryId) => activeTurnIds.has(summaryId)),
        input.turnSummary.id,
    ];
    const uniqueSummaryIds = [...new Set(summaryIds)];
    const matchedRecentTurns = input.recentTurnSummaries.filter((summary) => uniqueSummaryIds.includes(summary.id));
    const turns = [...matchedRecentTurns, input.turnSummary].map((summary) => Number(summary.turn) || input.turn);
    const startTurn = Math.min(...turns, input.turn);
    const endTurn = Math.max(...turns, input.turn);
    const existingEpisode = targetId
        ? allEpisodes.find((episode) => episode.id === targetId)
            || input.recentEpisodeSummaries.find((episode) => episode.id === targetId)
        : undefined;
    return await upsertTavernEpisodeSummary({
        id: action === 'create_new_episode' ? undefined : targetId || undefined,
        sessionId: input.sessionId,
        title: input.decision.title || existingEpisode?.title || `第 ${startTurn} 轮阶段`,
        summary: input.decision.summary || existingEpisode?.summary || input.turnSummary.summary,
        startTurn: Math.min(startTurn, Number(existingEpisode?.startTurn ?? startTurn) || startTurn),
        endTurn: Math.max(endTurn, Number(existingEpisode?.endTurn ?? endTurn) || endTurn),
        turnSummaryIds: [
            ...(existingEpisode?.turnSummaryIds || []),
            ...uniqueSummaryIds,
        ],
        keyChanges: input.decision.keyChanges || existingEpisode?.keyChanges || [],
        unresolved: input.decision.unresolved || existingEpisode?.unresolved || [],
        status: 'active',
    });
}

async function assertManagerSourceMessagesCurrent(input: XbTavernManagerRunInput): Promise<void> {
    const messages = await listTavernMessages(input.sessionId);
    const userMessage = messages.find((message) => message.order === input.userMessage.order);
    const assistantMessage = messages.find((message) => message.order === input.assistantMessage.order);
    const userMatches = userMessage?.role === 'user'
        && userMessage.error !== true
        && userMessage.content === input.userMessage.content;
    const assistantMatches = assistantMessage?.role === 'assistant'
        && assistantMessage.error !== true
        && assistantMessage.content === input.assistantMessage.content;
    if (!userMatches || !assistantMatches) {
        throw new Error('manager_source_messages_changed');
    }
}

export async function runXbTavernManagerAfterTurn(input: XbTavernManagerRunInput): Promise<XbTavernManagerRunResult> {
    const sessionId = String(input.sessionId || '').trim();
    if (!sessionId) {throw new Error('manager_session_required');}
    const providerConfig = resolveActiveProviderConfig(input.agentConfig || {}, {
        role: 'delegate',
        timeoutMs: 15 * 60 * 1000,
    });
    const managerRun = input.managerRunId
        ? await updateTavernManagerRun(input.managerRunId, {
            status: 'running',
            provider: getXbTavernProviderLabel(String(providerConfig.provider || '')),
            model: String(providerConfig.model || ''),
            inputSummary: buildInputSummary(input),
        })
        : await createTavernManagerRun({
            sessionId,
            turn: input.turn,
            userOrder: input.userMessage.order,
            assistantOrder: input.assistantMessage.order,
            trigger: input.trigger || 'after_turn',
            status: 'running',
            provider: getXbTavernProviderLabel(String(providerConfig.provider || '')),
            model: String(providerConfig.model || ''),
            inputSummary: buildInputSummary(input),
        });
    if (!managerRun) {throw new Error('manager_run_missing');}

    const recentTurnSummaries = input.recentTurnSummaries || await listTavernTurnSummaries(sessionId, { limit: 12 });
    const recentEpisodeSummaries = input.recentEpisodeSummaries || await listTavernEpisodeSummaries(sessionId, { limit: 6 });
    const messages: XbTavernMessage[] = [
        { role: 'system', content: buildManagerSystemPrompt() },
        {
            role: 'user',
            content: buildManagerUserPrompt({
                turn: input.turn,
                userMessage: input.userMessage,
                assistantMessage: input.assistantMessage,
                recentTurnSummaries,
                recentEpisodeSummaries,
            }),
        },
    ];

    let resultText = '';
    let resultProvider = '';
    let resultModel = '';
    try {
        await assertManagerSourceMessagesCurrent(input);
        const executeManagerOnce = input.executeManagerOnce || runManagerOnce;
        const result = await executeManagerOnce({
            agentConfig: input.agentConfig,
            messages,
            signal: input.signal,
        });
        resultText = String(result.text || '');
        resultProvider = String(result.provider || '');
        resultModel = String(result.model || '');
        await assertManagerSourceMessagesCurrent(input);
        const parsed = parseXbTavernManagerResult(result.text);
        const turnSummary = await upsertTavernTurnSummary({
            ...parsed.turnSummary,
            sessionId,
            turn: input.turn,
            userOrder: input.userMessage.order,
            assistantOrder: input.assistantMessage.order,
            status: 'active',
        });
        const episodeSummary = await applyEpisodeDecision({
            sessionId,
            turn: input.turn,
            turnSummary,
            decision: parsed.episodeDecision || { action: 'keep_unassigned' },
            recentEpisodeSummaries,
            recentTurnSummaries,
        });
        const completed = await updateTavernManagerRun(managerRun.id, {
            status: 'completed',
            provider: result.provider || managerRun.provider || '',
            model: result.model || managerRun.model || '',
            outputText: result.text,
            parsedAction: parsed.episodeDecision?.action || 'keep_unassigned',
            error: '',
        }) || managerRun;
        return {
            ok: true,
            managerRun: completed,
            turnSummary,
            episodeSummary,
        };
    } catch (error) {
        const errorText = error instanceof Error ? error.message : String(error || 'manager_failed');
        const failed = await updateTavernManagerRun(managerRun.id, {
            status: 'failed',
            provider: resultProvider || managerRun.provider || '',
            model: resultModel || managerRun.model || '',
            outputText: resultText,
            error: errorText,
        }) || managerRun;
        return {
            ok: false,
            managerRun: failed,
            error: errorText,
        };
    }
}

export async function scheduleXbTavernManagerAfterTurn(input: XbTavernManagerRunInput & {
    awaitCompletion?: boolean;
    onManagerRunSaved?: (run: TavernManagerRunRecord) => void | Promise<void>;
}): Promise<XbTavernManagerScheduleResult> {
    const queued = await createTavernManagerRun({
        sessionId: input.sessionId,
        turn: input.turn,
        userOrder: input.userMessage.order,
        assistantOrder: input.assistantMessage.order,
        trigger: input.trigger || 'after_turn',
        status: 'queued',
        inputSummary: buildInputSummary(input),
    });
    await input.onManagerRunSaved?.(queued);
    const previous = managerQueues.get(input.sessionId) || Promise.resolve();
    const completion = previous
        .catch(() => {})
        .then(async () => {
            const result = await runXbTavernManagerAfterTurn({
                ...input,
                managerRunId: queued.id,
            });
            await input.onManagerRunSaved?.(result.managerRun);
            return result;
        })
        .catch(async (error) => {
            const errorText = error instanceof Error ? error.message : String(error || 'manager_failed');
            const failed = await updateTavernManagerRun(queued.id, {
                status: 'failed',
                error: errorText,
            }) || queued;
            await input.onManagerRunSaved?.(failed);
            return {
                ok: false,
                managerRun: failed,
                error: errorText,
            };
        });
    managerQueues.set(input.sessionId, completion);
    completion.finally(() => {
        if (managerQueues.get(input.sessionId) === completion) {
            managerQueues.delete(input.sessionId);
        }
    });
    const completedResult = input.awaitCompletion ? await completion : null;
    return {
        managerRunId: queued.id,
        managerStatus: completedResult?.managerRun?.status || queued.status,
        completion,
    };
}
