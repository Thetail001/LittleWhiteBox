import { createAgentAdapter, resolveActiveProviderConfig } from '../../../agent-core/provider-config.js';
import {
    buildProviderAssistantToolCallMessage,
    hasVisibleText,
    resolveResultToolCalls,
} from '../../../agent-core/runtime/protocol.js';
import type { XbTavernMessage } from '../../shared/message-assembler';
import { createDefaultTavernAssistantPreset, type TavernAssistantPreset } from '../../shared/assistant-presets';
import {
    ensureTavernMemoryDefaults,
    executeTavernMemoryTool,
    getTavernMemoryToolDefinitions,
    listTavernMemoryFiles,
    rebuildTavernMemoryDerivedIndex,
    type TavernMemoryToolResult,
} from '../../shared/memory-files';
import {
    createTavernManagerRun,
    listTavernEpisodeSummaries,
    listTavernMessages,
    listTavernTurnSummaries,
    updateTavernManagerRun,
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
    tools?: unknown[];
    toolChoice?: 'auto' | 'none' | string;
    signal?: AbortSignal;
}

export interface XbTavernManagerOnceResult {
    text: string;
    provider?: string;
    model?: string;
    toolCalls?: unknown[];
    providerPayload?: unknown;
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
    assistantPreset?: TavernAssistantPreset;
    signal?: AbortSignal;
    executeManagerOnce?: (options: XbTavernManagerOnceOptions) => Promise<XbTavernManagerOnceResult>;
}

export interface XbTavernManagerRunResult {
    ok: boolean;
    managerRun: TavernManagerRunRecord;
    turnSummary?: TavernTurnSummaryRecord;
    episodeSummary?: TavernEpisodeSummaryRecord;
    changedFiles?: string[];
    error?: string;
}

export interface XbTavernManagerScheduleResult {
    managerRunId: string;
    managerStatus: TavernManagerRunRecord['status'];
    completion?: Promise<XbTavernManagerRunResult>;
}

const managerQueues = new Map<string, Promise<unknown>>();
const MAX_MANAGER_TOOL_ROUNDS = 8;

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

function safeJsonParse(value: unknown, fallback: Record<string, unknown> = {}): Record<string, unknown> {
    try {
        const parsed = JSON.parse(String(value || '{}'));
        return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
            ? parsed as Record<string, unknown>
            : fallback;
    } catch {
        return fallback;
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

function buildManagerSystemPrompt(assistantPreset: TavernAssistantPreset | undefined): string {
    return String(
        assistantPreset?.memoryManagerPrompt
        || createDefaultTavernAssistantPreset().memoryManagerPrompt
        || '',
    ).trim();
}

function buildManagerUserPrompt(input: {
    turn: number;
    userMessage: TavernMessageRecord;
    assistantMessage: TavernMessageRecord;
    recentTurnSummaries: TavernTurnSummaryRecord[];
    recentEpisodeSummaries: TavernEpisodeSummaryRecord[];
    memoryFiles: Array<{ path: string; status: string; updatedAt: number }>;
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
        '[最近阶段总结]',
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
        '[已有 Markdown 记忆文件]',
        safeJson(input.memoryFiles),
        '',
        '[本轮要求]',
        '1. 先用工具查看需要的 memory 文件。',
        '2. 写入或修改本轮 turns 记录，必要时更新 session/state/episode/inbox。',
        '3. 最终只用自然语言简短说明改动，不要输出 JSON。',
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
        tools: Array.isArray(options.tools) ? options.tools : [],
        toolChoice: options.toolChoice || (options.tools?.length ? 'auto' : 'none'),
        temperature: providerConfig.temperature,
        maxTokens: providerConfig.maxTokens,
        signal: options.signal,
        onStreamProgress: () => {},
    });
    return {
        text: String(result?.text || '').trim(),
        provider: String(result?.provider || providerConfig.provider || ''),
        model: String(result?.model || providerConfig.model || ''),
        toolCalls: Array.isArray(result?.toolCalls) ? result.toolCalls : [],
        providerPayload: result?.providerPayload,
    };
}

function summarizeToolArguments(args: Record<string, unknown> = {}): string {
    return ['filePath', 'path', 'pattern'].map((key) => {
        const value = normalizeText(args[key], 160);
        return value ? `${key}: ${value}` : '';
    }).filter(Boolean).join('; ');
}

function summarizeToolResult(result: TavernMemoryToolResult): string {
    return normalizeText(result.summary || result.error || '', 240);
}

function hasFailedMemoryTool(toolTrace: Array<Record<string, unknown>> = []): boolean {
    return toolTrace.some((item) => item.ok === false);
}

async function runManagerAgentWithTools(input: XbTavernManagerRunInput, messages: XbTavernMessage[], providerConfig: Record<string, unknown>): Promise<{
    text: string;
    provider: string;
    model: string;
    toolTrace: Array<Record<string, unknown>>;
    changedFiles: string[];
}> {
    const executeManagerOnce = input.executeManagerOnce || runManagerOnce;
    const tools = getTavernMemoryToolDefinitions();
    const toolTrace: Array<Record<string, unknown>> = [];
    const changedFiles = new Set<string>();
    let finalText = '';
    let resultProvider = '';
    let resultModel = '';
    let reminded = false;

    for (let round = 1; round <= MAX_MANAGER_TOOL_ROUNDS; round += 1) {
        const result = await executeManagerOnce({
            agentConfig: input.agentConfig,
            messages,
            tools,
            toolChoice: 'auto',
            signal: input.signal,
        });
        finalText = String(result.text || '').trim();
        resultProvider = String(result.provider || resultProvider || providerConfig.provider || '');
        resultModel = String(result.model || resultModel || providerConfig.model || '');
        const resultRecord = result as unknown as Record<string, unknown>;
        const toolCalls = resolveResultToolCalls(resultRecord, providerConfig, {
            fallbackPrefix: 'tavern-memory-tool',
        });
        if (!toolCalls.length) {
            if (!hasVisibleText(finalText) && toolTrace.length && !reminded) {
                reminded = true;
                messages.push({
                    role: 'system',
                    content: '你已经拿到了记忆工具结果。现在不要再调用工具，直接简短说明本轮记忆维护结果。',
                });
                continue;
            }
            return {
                text: finalText,
                provider: resultProvider,
                model: resultModel,
                toolTrace,
                changedFiles: [...changedFiles],
            };
        }

        messages.push(buildProviderAssistantToolCallMessage(resultRecord, toolCalls, {
            fallbackPrefix: 'tavern-memory-tool',
        }) as unknown as XbTavernMessage);

        for (const toolCall of toolCalls) {
            const args = safeJsonParse(toolCall.arguments, {});
            const toolResult = await executeTavernMemoryTool(input.sessionId, toolCall.name, args);
            if (toolResult.changed && toolResult.path) {
                changedFiles.add(toolResult.path);
            }
            toolTrace.push({
                round,
                name: toolCall.name,
                ok: toolResult.ok,
                args: summarizeToolArguments(args),
                path: toolResult.path || '',
                summary: summarizeToolResult(toolResult),
                error: toolResult.error || '',
            });
            messages.push({
                role: 'tool',
                tool_call_id: toolCall.id,
                content: safeJson(toolResult),
            } as XbTavernMessage);
        }
    }

    throw new Error('manager_tool_round_limit');
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

    await ensureTavernMemoryDefaults(sessionId);
    const recentTurnSummaries = input.recentTurnSummaries || await listTavernTurnSummaries(sessionId, { limit: 12 });
    const recentEpisodeSummaries = input.recentEpisodeSummaries || await listTavernEpisodeSummaries(sessionId, { limit: 6 });
    const memoryFiles = await listTavernMemoryFiles(sessionId, { includeStale: true });
    const messages: XbTavernMessage[] = [
        { role: 'system', content: buildManagerSystemPrompt(input.assistantPreset) },
        {
            role: 'user',
            content: buildManagerUserPrompt({
                turn: input.turn,
                userMessage: input.userMessage,
                assistantMessage: input.assistantMessage,
                recentTurnSummaries,
                recentEpisodeSummaries,
                memoryFiles: memoryFiles.map((file) => ({
                    path: file.path,
                    status: file.status,
                    updatedAt: file.updatedAt,
                })),
            }),
        },
    ];

    let resultText = '';
    let resultProvider = '';
    let resultModel = '';
    let toolTrace: Array<Record<string, unknown>> = [];
    let changedFiles: string[] = [];
    try {
        await assertManagerSourceMessagesCurrent(input);
        const result = await runManagerAgentWithTools(input, messages, providerConfig);
        resultText = result.text;
        resultProvider = result.provider;
        resultModel = result.model;
        toolTrace = result.toolTrace;
        changedFiles = result.changedFiles;
        await assertManagerSourceMessagesCurrent(input);
        if (hasFailedMemoryTool(toolTrace)) {
            throw new Error('manager_memory_tool_failed');
        }
        if (!changedFiles.length) {
            throw new Error('manager_memory_tool_required');
        }
        await rebuildTavernMemoryDerivedIndex(sessionId);
        const refreshedTurns = await listTavernTurnSummaries(sessionId);
        const turnSummary = refreshedTurns.find((summary) => (
            summary.userOrder === input.userMessage.order
            && summary.assistantOrder === input.assistantMessage.order
        ));
        if (!turnSummary) {
            throw new Error('manager_turn_memory_required');
        }
        const refreshedEpisodes = await listTavernEpisodeSummaries(sessionId);
        const episodeSummary = refreshedEpisodes[refreshedEpisodes.length - 1];
        const completed = await updateTavernManagerRun(managerRun.id, {
            status: 'completed',
            provider: resultProvider || managerRun.provider || '',
            model: resultModel || managerRun.model || '',
            outputText: resultText || `已维护 ${changedFiles.length} 个记忆文件。`,
            parsedAction: changedFiles.length ? 'memory_files_updated' : 'memory_checked',
            toolTrace,
            changedFiles,
            error: '',
        }) || managerRun;
        return {
            ok: true,
            managerRun: completed,
            turnSummary,
            episodeSummary,
            changedFiles,
        };
    } catch (error) {
        const errorText = error instanceof Error ? error.message : String(error || 'manager_failed');
        await rebuildTavernMemoryDerivedIndex(sessionId);
        const failed = await updateTavernManagerRun(managerRun.id, {
            status: 'failed',
            provider: resultProvider || managerRun.provider || '',
            model: resultModel || managerRun.model || '',
            outputText: resultText,
            toolTrace,
            changedFiles,
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
