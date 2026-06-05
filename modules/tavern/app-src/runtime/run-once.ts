import { createAgentAdapter } from '../../../agent-core/provider-config.js';
import {
    type XbTavernBuildSnapshot,
    type XbTavernContext,
    type XbTavernMessage,
    type XbTavernMessageBuildResult,
    type TavernChatPromptPresetBundle,
    type XbTavernRuntimeState,
    XBTavernWorldPosition,
} from '../../shared/message-assembler';
import type { TavernAssistantPreset } from '../../shared/assistant-presets';
import {
    appendTavernMessage,
    createTavernSession,
    deleteTavernMessages,
    getTavernSession,
    listTavernMessages,
    markTavernMemoryStaleFromOrder,
    mergeWorldEntryStates,
    normalizeTavernSessionState,
    replaceTavernSessionState,
    updateTavernSessionState,
    updateTavernSessionSnapshot,
    type TavernMessageRecord,
    type TavernSessionRecord,
    type TavernSessionState,
} from '../../shared/session-db';
import { buildXbTavernBrain, buildXbTavernBrainAsync } from '../../shared/brain';
import {
    countRegexApplications,
    hasRegexApplications,
    type TavernApplyRegex,
    type TavernApplyRegexItem,
    type TavernAppliedRegexItem,
    type TavernRegexApplicationSummary,
} from '../../shared/regex';
import {
    buildXbTavernMemoryIgnoredTerms,
    buildXbTavernMemoryQuery,
    retrieveXbTavernMemoryContext,
} from '../../shared/memory-retrieval';
import { createXbTavernAgentRuntime } from './agent-runtime';
import {
    scheduleXbTavernManagerAfterTurn,
    type XbTavernManagerOnceOptions,
    type XbTavernManagerOnceResult,
} from './manager';
import { assertXbTavernProviderReady, resolveXbTavernProviderConfig } from './provider';

export interface TavernRunOnceOptions {
    agentConfig: Record<string, unknown>;
    messages: XbTavernMessage[];
    chatPreset?: TavernChatPromptPresetBundle;
    regexApplications?: TavernRegexApplicationSummary;
    signal?: AbortSignal;
    onStreamProgress?: (snapshot: { text?: string; thoughts?: Array<{ label?: string; text?: string }> }) => void;
}

export interface TavernRequestInspection {
    provider?: string;
    model?: string;
    transport?: string;
    request?: unknown;
    [key: string]: unknown;
}

export interface TavernRequestSnapshot {
    presetName: string;
    chatPresetName: string;
    apiPresetName: string;
    provider: string;
    providerLabel: string;
    model: string;
    toolMode: string;
    messageCount: number;
    messageChars: number;
    rawMessagesJson: string;
    rawRequestJson: string;
    requestKind: 'actual' | 'simulated' | 'fallback';
    capturedAt: number;
    requestInspection?: TavernRequestInspection;
    regexApplications?: TavernRegexApplicationSummary;
}

export interface TavernRunOnceResult {
    text: string;
    thoughts?: Array<{ label?: string; text?: string }>;
    model?: string;
    provider?: string;
    finishReason?: string;
    providerPayload?: unknown;
    requestSnapshot: TavernRequestSnapshot;
}

export interface TavernDiagnostics {
    ok?: boolean;
    message?: string;
    worldbookErrors?: Array<{ name: string; error: string }>;
}

export interface XbTavernRunTurnInput {
    sessionId?: string;
    agentConfig: Record<string, unknown>;
    contextSnapshot: XbTavernContext;
    chatPreset?: TavernChatPromptPresetBundle;
    preset?: TavernChatPromptPresetBundle;
    assistantPreset?: TavernAssistantPreset;
    currentUserMessage: string;
    runtimeState?: TavernSessionState;
    diagnostics?: TavernDiagnostics;
    historyMode?: XbTavernRuntimeState['historyMode'];
    signal?: AbortSignal;
    onStreamProgress?: (snapshot: { text?: string; thoughts?: Array<{ label?: string; text?: string }> }) => void;
    onUserMessageSaved?: (sessionId: string, message: TavernMessageRecord) => void | Promise<void>;
    onAssistantMessageSaved?: (sessionId: string, message: TavernMessageRecord) => void | Promise<void>;
    onManagerRunSaved?: (sessionId: string, managerRunId: string) => void | Promise<void>;
    reuseUserMessageOrder?: number;
    awaitManager?: boolean;
    runManager?: boolean;
    executeRunOnce?: (options: TavernRunOnceOptions) => Promise<TavernRunOnceResult>;
    executeManagerOnce?: (options: XbTavernManagerOnceOptions) => Promise<XbTavernManagerOnceResult>;
    applyRegex?: TavernApplyRegex;
}

export interface XbTavernRunResult {
    sessionId: string;
    userMessage: TavernMessageRecord;
    assistantMessage?: TavernMessageRecord;
    errorMessage?: TavernMessageRecord;
    buildResult: XbTavernMessageBuildResult;
    buildSnapshot: XbTavernBuildSnapshot;
    requestSnapshot: TavernRequestSnapshot;
    provider: string;
    model: string;
    finishReason?: string;
    previewMatchesRequest: boolean;
    nextTurn: number;
    managerRunId?: string;
    managerStatus?: string;
    error?: string;
}

export interface XbTavernSimulateRequestInput {
    sessionId?: string;
    agentConfig: Record<string, unknown>;
    contextSnapshot: XbTavernContext;
    chatPreset?: TavernChatPromptPresetBundle;
    preset?: TavernChatPromptPresetBundle;
    currentUserMessage: string;
    runtimeState?: TavernSessionState;
    diagnostics?: TavernDiagnostics;
    historyMode?: XbTavernRuntimeState['historyMode'];
    applyRegex?: TavernApplyRegex;
}

export interface XbTavernSimulateRequestResult {
    buildResult: XbTavernMessageBuildResult;
    buildSnapshot: XbTavernBuildSnapshot;
    requestSnapshot: TavernRequestSnapshot;
    provider: string;
    model: string;
}

function isAbortLikeError(error: unknown, signal?: AbortSignal): boolean {
    if (signal?.aborted) {return true;}
    if (!error || typeof error !== 'object') {return false;}
    const record = error as { name?: unknown; code?: unknown; message?: unknown };
    const name = String(record.name || '');
    const code = String(record.code || '');
    const message = String(record.message || '');
    return name === 'AbortError'
        || code === 'ABORT_ERR'
        || /abort|aborted|cancelled|canceled/i.test(message);
}

async function notifyRunCallback(callback: (() => void | Promise<void>) | undefined): Promise<void> {
    if (!callback) {return;}
    try {
        await callback();
    } catch (error) {
        console.warn('[小白酒馆] run callback failed', error);
    }
}

async function persistRunSessionState(
    sessionId: string,
    state: Partial<TavernSessionState>,
    options: { replace?: boolean } = {},
): Promise<TavernSessionRecord | null> {
    return options.replace
        ? await replaceTavernSessionState(sessionId, state)
        : await updateTavernSessionState(sessionId, state);
}

function hasUsableTavernContext(context?: XbTavernContext | null): boolean {
    const name = String(context?.character?.name || '').trim();
    return !!name && !/^(sillytavern\s+system|system)\b/i.test(name);
}

function resolveSessionContext(
    session?: Pick<TavernSessionRecord, 'contextSnapshot'> | null,
    fallbackContext: XbTavernContext = {},
): XbTavernContext {
    return hasUsableTavernContext(session?.contextSnapshot)
        ? session?.contextSnapshot || {}
        : fallbackContext || {};
}

function assertUsableTavernContext(context: XbTavernContext = {}): void {
    if (hasUsableTavernContext(context)) {return;}
    throw new Error('当前没有可用角色资料，请先选择角色或刷新当前资料。');
}

function resolveInputChatPreset(input: {
    chatPreset?: TavernChatPromptPresetBundle;
    preset?: TavernChatPromptPresetBundle;
} = {}): TavernChatPromptPresetBundle {
    return input.chatPreset || input.preset || {};
}

function addRegexSummary(target: TavernRegexApplicationSummary, source?: TavernRegexApplicationSummary): void {
    if (!source) {return;}
    (['userInput', 'worldInfo', 'aiOutput', 'reasoning'] as const).forEach((key) => {
        const count = Number(source[key]) || 0;
        if (count > 0) {
            target[key] = (target[key] || 0) + count;
        }
    });
}

function unchangedRegexItems(items: TavernApplyRegexItem[] = []): TavernAppliedRegexItem[] {
    return items.map((item) => ({
        id: item.id,
        text: item.text,
        changed: false,
    }));
}

async function applyTavernRegexItems(
    applyRegex: TavernApplyRegex | undefined,
    items: TavernApplyRegexItem[] = [],
): Promise<TavernAppliedRegexItem[]> {
    if (!items.length) {return [];}
    if (!applyRegex) {return unchangedRegexItems(items);}
    const result = await applyRegex(items);
    const byId = new Map((Array.isArray(result.items) ? result.items : []).map((item) => [item.id, item]));
    return items.map((item) => byId.get(item.id) || {
        id: item.id,
        text: item.text,
        changed: false,
    });
}

async function applySingleTavernRegex(input: {
    applyRegex?: TavernApplyRegex;
    placement: TavernApplyRegexItem['placement'];
    text: string;
    id: string;
    options?: TavernApplyRegexItem['options'];
}): Promise<{ text: string; summary?: TavernRegexApplicationSummary }> {
    const [item] = await applyTavernRegexItems(input.applyRegex, [{
        id: `${input.placement}:${input.id}`,
        text: input.text,
        placement: input.placement,
        options: input.options,
    }]);
    return {
        text: item?.text ?? input.text,
        summary: countRegexApplications(item ? [item] : []),
    };
}

async function applyReasoningRegex(input: {
    applyRegex?: TavernApplyRegex;
    thoughts?: Array<{ label?: string; text?: string }>;
}): Promise<{ thoughts?: Array<{ label?: string; text?: string }>; summary?: TavernRegexApplicationSummary }> {
    const thoughts = Array.isArray(input.thoughts) ? input.thoughts : [];
    const regexItems = thoughts
        .map((thought, index) => ({
            id: `reasoning:${index}`,
            text: String(thought.text || ''),
            placement: 'reasoning' as const,
        }))
        .filter((item) => item.text);
    if (!regexItems.length) {
        return { thoughts: input.thoughts };
    }
    const applied = await applyTavernRegexItems(input.applyRegex, regexItems);
    const byId = new Map(applied.map((item) => [item.id, item]));
    return {
        thoughts: thoughts.map((thought, index) => ({
            ...thought,
            text: byId.get(`reasoning:${index}`)?.text ?? thought.text,
        })),
        summary: countRegexApplications(applied),
    };
}

async function applyPromptRegexToConversationMessages(input: {
    applyRegex?: TavernApplyRegex;
    messages: XbTavernMessage[];
}): Promise<{ messages: XbTavernMessage[]; summary?: TavernRegexApplicationSummary }> {
    const messages = Array.isArray(input.messages) ? input.messages : [];
    const regexItems = messages.reduce<TavernApplyRegexItem[]>((items, message, index) => {
        const depth = messages.length - index - 1;
        if (['user', 'assistant'].includes(message.role) && String(message.content || '')) {
            const placement = message.role === 'user' ? 'userInput' : 'aiOutput';
            items.push({
                id: `${placement}:prompt:${index}`,
                text: String(message.content || ''),
                placement,
                options: {
                    isPrompt: true,
                    depth,
                },
            });
        }
        if (message.role === 'assistant' && Array.isArray(message.thoughts)) {
            message.thoughts.forEach((thought, thoughtIndex) => {
                const text = String(thought?.text || '');
                if (!text) {return;}
                items.push({
                    id: `reasoning:prompt:${index}:${thoughtIndex}`,
                    text,
                    placement: 'reasoning',
                    options: {
                        isPrompt: true,
                        depth,
                    },
                });
            });
        }
        return items;
    }, []);
    if (!regexItems.length) {
        return { messages };
    }
    const applied = await applyTavernRegexItems(input.applyRegex, regexItems);
    const byId = new Map(applied.map((item) => [item.id, item]));
    return {
        messages: messages.map((message, index) => {
            const placement = message.role === 'user' ? 'userInput' : message.role === 'assistant' ? 'aiOutput' : '';
            const item = placement ? byId.get(`${placement}:prompt:${index}`) : null;
            const thoughts = Array.isArray(message.thoughts)
                ? message.thoughts.map((thought, thoughtIndex) => ({
                    ...thought,
                    text: byId.get(`reasoning:prompt:${index}:${thoughtIndex}`)?.text ?? thought.text,
                }))
                : message.thoughts;
            return {
                ...message,
                ...(item ? { content: item.text } : {}),
                ...(thoughts ? { thoughts } : {}),
            };
        }),
        summary: countRegexApplications(applied),
    };
}

export function buildTavernRequestSnapshot(
    agentConfig: Record<string, unknown> = {},
    messages: XbTavernMessage[] = [],
    override: Partial<Pick<TavernRequestSnapshot, 'provider' | 'model' | 'requestKind'>> & {
        requestInspection?: TavernRequestInspection | null;
        chatPreset?: TavernChatPromptPresetBundle;
        regexApplications?: TavernRegexApplicationSummary;
    } = {},
): TavernRequestSnapshot {
    const providerConfig = resolveXbTavernProviderConfig(agentConfig);
    const requestInspection = override.requestInspection || null;
    const chatPresetName = String(override.chatPreset?.name || '').trim();
    const rawMessagesJson = JSON.stringify(messages, null, 2);
    const requestForJson = requestInspection || {
        provider: String(override.provider || providerConfig.provider || ''),
        model: String(override.model || providerConfig.model || ''),
        transport: 'unavailable',
        request: {
            messages,
        },
    };
    return {
        presetName: chatPresetName || providerConfig.currentPresetName,
        chatPresetName,
        apiPresetName: providerConfig.currentPresetName,
        provider: String(override.provider || providerConfig.provider || ''),
        providerLabel: providerConfig.providerLabel,
        model: String(override.model || providerConfig.model || ''),
        toolMode: providerConfig.toolMode,
        messageCount: messages.length,
        messageChars: messages.reduce((sum, message) => sum + String(message.content || '').length, 0),
        rawMessagesJson,
        rawRequestJson: JSON.stringify(requestForJson, null, 2),
        requestKind: override.requestKind || 'actual',
        capturedAt: Date.now(),
        ...(hasRegexApplications(override.regexApplications) ? { regexApplications: override.regexApplications } : {}),
        ...(requestInspection ? { requestInspection } : {}),
    };
}

async function inspectTavernRequest(input: {
    agentConfig: Record<string, unknown>;
    messages: XbTavernMessage[];
    chatPreset?: TavernChatPromptPresetBundle;
    signal?: AbortSignal;
    onStreamProgress?: TavernRunOnceOptions['onStreamProgress'];
    requestKind?: TavernRequestSnapshot['requestKind'];
    regexApplications?: TavernRegexApplicationSummary;
}): Promise<{
    task: ReturnType<ReturnType<typeof createXbTavernAgentRuntime>['buildChatTask']>;
    adapter: { chat: (task: unknown) => Promise<Record<string, unknown>>; inspectRequest?: (task: unknown) => Promise<TavernRequestInspection> | TavernRequestInspection };
    providerConfig: ReturnType<typeof assertXbTavernProviderReady>;
    requestSnapshot: TavernRequestSnapshot;
}> {
    const providerConfig = assertXbTavernProviderReady(input.agentConfig);
    const runtime = createXbTavernAgentRuntime(providerConfig);
    const adapter = createAgentAdapter(providerConfig as unknown as Record<string, unknown>, {
        missingApiKeyMessage: '请先在 API 配置里选择模型/填写 Key。',
    }) as {
        chat: (task: unknown) => Promise<Record<string, unknown>>;
        inspectRequest?: (task: unknown) => Promise<TavernRequestInspection> | TavernRequestInspection;
    };
    const task = runtime.buildChatTask({
        messages: input.messages,
        signal: input.signal,
        onStreamProgress: input.onStreamProgress,
    });
    const requestInspection = typeof adapter.inspectRequest === 'function'
        ? await adapter.inspectRequest(task)
        : null;
    return {
        task,
        adapter,
        providerConfig,
        requestSnapshot: buildTavernRequestSnapshot(input.agentConfig, input.messages, {
            provider: String(requestInspection?.provider || providerConfig.provider || ''),
            model: String(requestInspection?.model || providerConfig.model || ''),
            requestInspection,
            requestKind: input.requestKind || 'actual',
            chatPreset: input.chatPreset,
            regexApplications: input.regexApplications,
        }),
    };
}

export function buildContextHistory(messages: TavernMessageRecord[] = []): XbTavernMessage[] {
    return messages
        .filter((message) => !message.error)
        .map((message) => ({
            role: ['system', 'user', 'assistant', 'tool'].includes(message.role)
                ? message.role as XbTavernMessage['role']
                : 'assistant',
            content: message.content,
            ...(message.name ? { name: message.name } : {}),
            ...(Array.isArray(message.thoughts) && message.thoughts.length ? { thoughts: message.thoughts } : {}),
        }));
}

function findCompletedAssistantForUser(messages: TavernMessageRecord[] = [], userIndex = -1): TavernMessageRecord | null {
    if (userIndex < 0) {return null;}
    for (let index = userIndex + 1; index < messages.length; index += 1) {
        const message = messages[index];
        if (message.role === 'user') {break;}
        if (message.role === 'assistant' && !message.error && String(message.content || '').trim()) {
            return message;
        }
    }
    return null;
}

export function deriveTavernSessionStateFromMessages(input: {
    messages?: TavernMessageRecord[];
    contextSnapshot?: XbTavernContext;
    chatPreset?: TavernChatPromptPresetBundle;
    preset?: TavernChatPromptPresetBundle;
    historyMode?: XbTavernRuntimeState['historyMode'];
    diagnostics?: TavernDiagnostics;
}): TavernSessionState {
    const chatPreset = resolveInputChatPreset(input);
    const sorted = [...(input.messages || [])].sort((left, right) => left.order - right.order);
    const contextSnapshot = input.contextSnapshot || {};
    const priorMessages: TavernMessageRecord[] = [];
    let turn = 0;
    let worldEntryStates: NonNullable<TavernSessionState['worldEntryStates']> = {};
    let lastBuildSnapshot: XbTavernBuildSnapshot | undefined;
    let lastRequestSnapshot: unknown;
    let lastProvider = '';
    let lastModel = '';

    sorted.forEach((message, index) => {
        if (message.role !== 'user' || message.error || !String(message.content || '').trim()) {
            priorMessages.push(message);
            return;
        }
        const assistant = findCompletedAssistantForUser(sorted, index);
        if (assistant) {
            const brain = buildXbTavernBrain({
                context: {
                    ...contextSnapshot,
                    history: buildContextHistory(priorMessages),
                },
                chatPreset,
                currentUserMessage: message.content,
                historyMode: input.historyMode || 'raw',
                turn,
                entryStates: worldEntryStates,
                diagnostics: input.diagnostics || {},
            });
            worldEntryStates = mergeWorldEntryStates(
                worldEntryStates,
                brain.buildResult.meta.worldEntryStateUpdates,
            );
            turn += 1;
            lastBuildSnapshot = brain.buildSnapshot;
            lastRequestSnapshot = assistant.requestSnapshot || message.requestSnapshot;
            lastProvider = String(assistant.provider || '');
            lastModel = String(assistant.model || '');
        }
        priorMessages.push(message);
    });

    const lastMessage = sorted[sorted.length - 1];
    return {
        turn,
        worldEntryStates,
        lastBuildSnapshot,
        lastRequestSnapshot,
        lastProvider,
        lastModel,
        lastError: lastMessage?.error ? String(lastMessage.content || '') : '',
    };
}

async function ensureRunSession(input: XbTavernRunTurnInput, buildSnapshot?: XbTavernBuildSnapshot): Promise<TavernSessionRecord> {
    const existing = await getTavernSession(input.sessionId || '');
    if (existing) {return existing;}
    const chatPreset = resolveInputChatPreset(input);
    const contextSnapshot = input.contextSnapshot || {};
    const character = contextSnapshot.character || {};
    return await createTavernSession({
        title: String(character.name || '未选择角色'),
        characterId: String(character.id || ''),
        characterName: String(character.name || '未选择角色'),
        contextSnapshot,
        buildSnapshot,
        chatPresetId: String(chatPreset.id || ''),
        chatPresetName: String(chatPreset.name || ''),
        presetId: String(chatPreset.id || ''),
        presetName: String(chatPreset.name || ''),
        state: {
            turn: 0,
            worldEntryStates: {},
        },
    });
}

export async function runTavernOnce(options: TavernRunOnceOptions): Promise<TavernRunOnceResult> {
    const inspected = await inspectTavernRequest({
        agentConfig: options.agentConfig,
        messages: options.messages,
        chatPreset: options.chatPreset,
        regexApplications: options.regexApplications,
        signal: options.signal,
        onStreamProgress: options.onStreamProgress,
        requestKind: 'actual',
    });
    let result: Record<string, unknown>;
    try {
        result = await inspected.adapter.chat(inspected.task);
    } catch (error) {
        const requestInspection = (error as { requestInspection?: TavernRequestInspection } | null)?.requestInspection;
        if (requestInspection && error && typeof error === 'object') {
            (error as { requestSnapshot?: TavernRequestSnapshot }).requestSnapshot = buildTavernRequestSnapshot(options.agentConfig, options.messages, {
                provider: String(requestInspection.provider || inspected.providerConfig.provider || ''),
                model: String(requestInspection.model || inspected.providerConfig.model || ''),
                requestInspection,
                requestKind: 'actual',
                chatPreset: options.chatPreset,
                regexApplications: options.regexApplications,
            });
        }
        throw error;
    }
    const finalInspection = (result?.requestInspection || inspected.requestSnapshot.requestInspection || null) as TavernRequestInspection | null;
    const text = String(result?.text || '');
    const provider = String(result?.provider || finalInspection?.provider || inspected.providerConfig.provider || '');
    const model = String(result?.model || finalInspection?.model || inspected.providerConfig.model || '');
    return {
        text,
        thoughts: result?.thoughts as Array<{ label?: string; text?: string }> | undefined,
        model,
        provider,
        finishReason: result?.finishReason as string | undefined,
        providerPayload: result?.providerPayload,
        requestSnapshot: buildTavernRequestSnapshot(options.agentConfig, options.messages, {
            provider,
            model,
            requestInspection: finalInspection,
            requestKind: 'actual',
            chatPreset: options.chatPreset,
            regexApplications: options.regexApplications,
        }),
    };
}

export async function simulateXbTavernRequest(input: XbTavernSimulateRequestInput): Promise<XbTavernSimulateRequestResult> {
    const chatPreset = resolveInputChatPreset(input);
    const session = input.sessionId ? await getTavernSession(input.sessionId) : null;
    const sessionMessages = session ? await listTavernMessages(session.id) : [];
    const lockedContext = resolveSessionContext(session, input.contextSnapshot);
    assertUsableTavernContext(lockedContext);
    const sessionState = normalizeTavernSessionState(session?.state || input.runtimeState || {});
    const inputRegex = await applySingleTavernRegex({
        applyRegex: input.applyRegex,
        placement: 'userInput',
        id: 'simulate',
        text: input.currentUserMessage,
    });
    const regexApplications: TavernRegexApplicationSummary = {};
    addRegexSummary(regexApplications, inputRegex.summary);
    const currentUserMessage = inputRegex.text;
    const contextForBuild: XbTavernContext = {
        ...lockedContext,
        history: session ? buildContextHistory(sessionMessages) : (input.contextSnapshot.history || []),
    };
    const memoryQuery = buildXbTavernMemoryQuery(contextForBuild, currentUserMessage);
    const brain = await buildXbTavernBrainAsync({
        context: contextForBuild,
        chatPreset,
        currentUserMessage,
        historyMode: input.historyMode || 'raw',
        turn: sessionState.turn,
        entryStates: sessionState.worldEntryStates,
        memoryContext: session
            ? await retrieveXbTavernMemoryContext({
                sessionId: session.id,
                queryText: memoryQuery,
                ignoredTerms: buildXbTavernMemoryIgnoredTerms(contextForBuild),
            })
            : undefined,
        diagnostics: input.diagnostics || {},
        regexApplications,
        transformConversationMessages: async (messages) => {
            const applied = await applyPromptRegexToConversationMessages({
                applyRegex: input.applyRegex,
                messages,
            });
            addRegexSummary(regexApplications, applied.summary);
            return applied.messages;
        },
        transformWorldEntries: async (entries) => {
            const applied = await applyTavernRegexItems(input.applyRegex, entries.map((entry) => ({
                id: `worldInfo:${entry.activationKey}`,
                text: entry.content,
                placement: 'worldInfo',
                options: {
                    isMarkdown: false,
                    isPrompt: true,
                    depth: entry.position === XBTavernWorldPosition.atDepth ? entry.depth : null,
                },
            })));
            addRegexSummary(regexApplications, countRegexApplications(applied));
            const byId = new Map(applied.map((item) => [item.id, item]));
            return entries.map((entry) => {
                const item = byId.get(`worldInfo:${entry.activationKey}`);
                const content = item?.text ?? entry.content;
                return {
                    ...entry,
                    content,
                    contentChars: content.length,
                };
            });
        },
    });
    const inspected = await inspectTavernRequest({
        agentConfig: input.agentConfig,
        messages: brain.buildResult.messages,
        chatPreset,
        onStreamProgress: () => {},
        requestKind: 'simulated',
        regexApplications,
    });
    const provider = inspected.requestSnapshot.provider;
    const model = inspected.requestSnapshot.model;
    return {
        buildResult: brain.buildResult,
        buildSnapshot: brain.buildSnapshot,
        requestSnapshot: inspected.requestSnapshot,
        provider,
        model,
    };
}

export async function runXbTavernTurn(input: XbTavernRunTurnInput): Promise<XbTavernRunResult> {
    const chatPreset = resolveInputChatPreset(input);
    if (!input.sessionId) {
        assertUsableTavernContext(input.contextSnapshot || {});
    }
    const baseSession = await ensureRunSession(input);
    let sessionMessages = await listTavernMessages(baseSession.id);
    const lockedContext = resolveSessionContext(baseSession, input.contextSnapshot);
    assertUsableTavernContext(lockedContext);
    const reusedOrder = Number(input.reuseUserMessageOrder);
    const reusedUserMessage = Number.isInteger(reusedOrder) && reusedOrder >= 0
        ? sessionMessages.find((message) => message.order === reusedOrder && message.role === 'user' && !message.error) || null
        : null;
    if (reusedUserMessage) {
        await markTavernMemoryStaleFromOrder(baseSession.id, reusedUserMessage.order);
        await deleteTavernMessages(
            baseSession.id,
            sessionMessages
                .filter((message) => message.order > reusedUserMessage.order)
                .map((message) => message.order),
        );
        sessionMessages = await listTavernMessages(baseSession.id);
    }
    const historyMessages = reusedUserMessage
        ? sessionMessages.filter((message) => message.order < reusedUserMessage.order)
        : sessionMessages;
    const sessionState = reusedUserMessage
        ? normalizeTavernSessionState(deriveTavernSessionStateFromMessages({
            messages: historyMessages,
            contextSnapshot: lockedContext,
            chatPreset: input.chatPreset,
            historyMode: input.historyMode || 'raw',
            diagnostics: input.diagnostics,
        }))
        : normalizeTavernSessionState(baseSession.state || input.runtimeState || {});
    const shouldReplaceSessionState = !!reusedUserMessage;
    const rawCurrentUserMessage = reusedUserMessage?.content || input.currentUserMessage;
    const regexApplications: TavernRegexApplicationSummary = {};
    const inputRegex = reusedUserMessage
        ? { text: rawCurrentUserMessage, summary: undefined }
        : await applySingleTavernRegex({
            applyRegex: input.applyRegex,
            placement: 'userInput',
            id: 'turn',
            text: rawCurrentUserMessage,
        });
    addRegexSummary(regexApplications, inputRegex.summary);
    const currentUserMessage = inputRegex.text;
    const contextForBuild: XbTavernContext = {
        ...lockedContext,
        history: buildContextHistory(historyMessages),
    };
    const memoryQuery = buildXbTavernMemoryQuery(contextForBuild, currentUserMessage);
    const brain = await buildXbTavernBrainAsync({
        context: contextForBuild,
        chatPreset,
        currentUserMessage,
        historyMode: input.historyMode || 'raw',
        turn: sessionState.turn,
        entryStates: sessionState.worldEntryStates,
        memoryContext: await retrieveXbTavernMemoryContext({
            sessionId: baseSession.id,
            queryText: memoryQuery,
            ignoredTerms: buildXbTavernMemoryIgnoredTerms(contextForBuild),
        }),
        diagnostics: input.diagnostics || {},
        regexApplications,
        transformConversationMessages: async (messages) => {
            const applied = await applyPromptRegexToConversationMessages({
                applyRegex: input.applyRegex,
                messages,
            });
            addRegexSummary(regexApplications, applied.summary);
            return applied.messages;
        },
        transformWorldEntries: async (entries) => {
            const applied = await applyTavernRegexItems(input.applyRegex, entries.map((entry) => ({
                id: `worldInfo:${entry.activationKey}`,
                text: entry.content,
                placement: 'worldInfo',
                options: {
                    isMarkdown: false,
                    isPrompt: true,
                    depth: entry.position === XBTavernWorldPosition.atDepth ? entry.depth : null,
                },
            })));
            addRegexSummary(regexApplications, countRegexApplications(applied));
            const byId = new Map(applied.map((item) => [item.id, item]));
            return entries.map((entry) => {
                const item = byId.get(`worldInfo:${entry.activationKey}`);
                const content = item?.text ?? entry.content;
                return {
                    ...entry,
                    content,
                    contentChars: content.length,
                };
            });
        },
    });
    const { buildResult, buildSnapshot } = brain;
    const session = baseSession.buildSnapshot
        ? baseSession
        : await updateTavernSessionSnapshot(baseSession.id, {
            contextSnapshot: lockedContext,
            buildSnapshot,
            chatPresetId: String(chatPreset.id || baseSession.chatPresetId || baseSession.presetId || ''),
            chatPresetName: String(chatPreset.name || baseSession.chatPresetName || baseSession.presetName || ''),
            presetId: String(chatPreset.id || baseSession.presetId || ''),
            presetName: String(chatPreset.name || baseSession.presetName || ''),
        }) || baseSession;

    let latestStreamText = '';
    const handleStreamProgress = (snapshot: { text?: string; thoughts?: Array<{ label?: string; text?: string }> }) => {
        if (typeof snapshot.text === 'string') {latestStreamText = snapshot.text;}
        input.onStreamProgress?.(snapshot);
    };

    let requestSnapshot = buildTavernRequestSnapshot(input.agentConfig, buildResult.messages, {
        chatPreset,
        regexApplications,
    });
    try {
        requestSnapshot = (await inspectTavernRequest({
            agentConfig: input.agentConfig,
            messages: buildResult.messages,
            chatPreset,
            onStreamProgress: handleStreamProgress,
            requestKind: 'actual',
            regexApplications,
        })).requestSnapshot;
    } catch {
        requestSnapshot = buildTavernRequestSnapshot(input.agentConfig, buildResult.messages, {
            requestKind: 'fallback',
            chatPreset,
            regexApplications,
        });
    }
    const presetId = String(chatPreset.id || session.chatPresetId || session.presetId || '');
    const presetName = String(chatPreset.name || session.chatPresetName || session.presetName || '');
    const userMessage = reusedUserMessage || await appendTavernMessage(session.id, {
            role: 'user',
            content: currentUserMessage,
            contextSnapshot: lockedContext,
            buildSnapshot,
            chatPresetId: presetId,
            chatPresetName: presetName,
            presetId,
            presetName,
            requestSnapshot,
    });
    await notifyRunCallback(() => input.onUserMessageSaved?.(session.id, userMessage));

    try {
        const executeRunOnce = input.executeRunOnce || runTavernOnce;
        const result = await executeRunOnce({
            agentConfig: input.agentConfig,
            messages: buildResult.messages,
            chatPreset,
            regexApplications,
            signal: input.signal,
            onStreamProgress: handleStreamProgress,
        });
        const outputRegex = await applySingleTavernRegex({
            applyRegex: input.applyRegex,
            placement: 'aiOutput',
            id: 'assistant',
            text: result.text,
        });
        const reasoningRegex = await applyReasoningRegex({
            applyRegex: input.applyRegex,
            thoughts: result.thoughts,
        });
        addRegexSummary(regexApplications, outputRegex.summary);
        addRegexSummary(regexApplications, reasoningRegex.summary);
        if (outputRegex.text !== result.text || reasoningRegex.thoughts !== result.thoughts) {
            input.onStreamProgress?.({ text: outputRegex.text, thoughts: reasoningRegex.thoughts });
        }
        const assistantRequestSnapshot: TavernRequestSnapshot = {
            ...result.requestSnapshot,
            regexApplications,
        };
        const assistantMessage = await appendTavernMessage(session.id, {
            role: 'assistant',
            content: outputRegex.text,
            thoughts: reasoningRegex.thoughts,
            providerPayload: result.providerPayload,
            contextSnapshot: lockedContext,
            buildSnapshot,
            chatPresetId: presetId,
            chatPresetName: presetName,
            presetId,
            presetName,
            requestSnapshot: assistantRequestSnapshot,
            provider: result.provider || '',
            model: result.model || '',
            finishReason: result.finishReason || '',
        });
        await notifyRunCallback(() => input.onAssistantMessageSaved?.(session.id, assistantMessage));
        const nextTurn = Number(sessionState.turn || 0) + 1;
        await persistRunSessionState(session.id, {
            turn: nextTurn,
            worldEntryStates: shouldReplaceSessionState
                ? mergeWorldEntryStates(sessionState.worldEntryStates || {}, buildResult.meta.worldEntryStateUpdates)
                : buildResult.meta.worldEntryStateUpdates,
            lastBuildSnapshot: buildSnapshot,
            lastRequestSnapshot: assistantRequestSnapshot,
            lastProvider: result.provider || '',
            lastModel: result.model || '',
        }, {
            replace: shouldReplaceSessionState,
        });
        let managerRunId = '';
        let managerStatus = '';
        if (input.runManager === true && !assistantMessage.error) {
            const manager = await scheduleXbTavernManagerAfterTurn({
                sessionId: session.id,
                agentConfig: input.agentConfig,
                userMessage,
                assistantMessage,
                turn: nextTurn,
                assistantPreset: input.assistantPreset,
                awaitCompletion: input.awaitManager === true,
                executeManagerOnce: input.executeManagerOnce,
                onManagerRunSaved: async (run) => {
                    await notifyRunCallback(() => input.onManagerRunSaved?.(session.id, run.id));
                },
            });
            managerRunId = manager.managerRunId;
            managerStatus = manager.managerStatus;
        }
        return {
            sessionId: session.id,
            userMessage,
            assistantMessage,
            buildResult,
            buildSnapshot,
            requestSnapshot: assistantRequestSnapshot,
            provider: result.provider || '',
            model: result.model || '',
            finishReason: result.finishReason,
            previewMatchesRequest: buildResult.meta.rawMessagesJson === assistantRequestSnapshot.rawMessagesJson,
            nextTurn,
            managerRunId,
            managerStatus,
        };
    } catch (error) {
        const failedRequestSnapshot = (error as { requestSnapshot?: TavernRequestSnapshot } | null)?.requestSnapshot;
        if (failedRequestSnapshot) {
            requestSnapshot = {
                ...failedRequestSnapshot,
                regexApplications,
            };
        }
        const aborted = isAbortLikeError(error, input.signal);
        const partialText = String(latestStreamText || '').trim();
        if (aborted && partialText) {
            const partialRegex = await applySingleTavernRegex({
                applyRegex: input.applyRegex,
                placement: 'aiOutput',
                id: 'assistant-partial',
                text: partialText,
            });
            addRegexSummary(regexApplications, partialRegex.summary);
            if (partialRegex.text !== partialText) {
                input.onStreamProgress?.({ text: partialRegex.text });
            }
            const errorMessage = await appendTavernMessage(session.id, {
                role: 'assistant',
                content: partialRegex.text,
                error: false,
                contextSnapshot: lockedContext,
                buildSnapshot,
                chatPresetId: presetId,
                chatPresetName: presetName,
                presetId,
                presetName,
                requestSnapshot,
                provider: requestSnapshot.provider,
                model: requestSnapshot.model,
                finishReason: 'aborted',
            });
            await notifyRunCallback(() => input.onAssistantMessageSaved?.(session.id, errorMessage));
            const nextTurn = Number(sessionState.turn || 0) + 1;
            await persistRunSessionState(session.id, {
                turn: nextTurn,
                worldEntryStates: shouldReplaceSessionState
                    ? mergeWorldEntryStates(sessionState.worldEntryStates || {}, buildResult.meta.worldEntryStateUpdates)
                    : buildResult.meta.worldEntryStateUpdates,
                lastBuildSnapshot: buildSnapshot,
                lastRequestSnapshot: requestSnapshot,
                lastProvider: requestSnapshot.provider,
                lastModel: requestSnapshot.model,
            }, {
                replace: shouldReplaceSessionState,
            });
            let managerRunId = '';
            let managerStatus = '';
            if (input.runManager === true) {
                const manager = await scheduleXbTavernManagerAfterTurn({
                    sessionId: session.id,
                    agentConfig: input.agentConfig,
                    userMessage,
                    assistantMessage: errorMessage,
                    turn: nextTurn,
                    assistantPreset: input.assistantPreset,
                    awaitCompletion: input.awaitManager === true,
                    executeManagerOnce: input.executeManagerOnce,
                    onManagerRunSaved: async (run) => {
                        await notifyRunCallback(() => input.onManagerRunSaved?.(session.id, run.id));
                    },
                });
                managerRunId = manager.managerRunId;
                managerStatus = manager.managerStatus;
            }
            return {
                sessionId: session.id,
                userMessage,
                assistantMessage: errorMessage,
                buildResult,
                buildSnapshot,
                requestSnapshot,
                provider: requestSnapshot.provider,
                model: requestSnapshot.model,
                finishReason: 'aborted',
                previewMatchesRequest: buildResult.meta.rawMessagesJson === requestSnapshot.rawMessagesJson,
                nextTurn,
                managerRunId,
                managerStatus,
            };
        }
        const errorText = error instanceof Error ? error.message : String(error || 'run_failed');
        const errorMessage = await appendTavernMessage(session.id, {
            role: 'assistant',
            content: aborted ? '已停止生成。' : errorText,
            error: true,
            contextSnapshot: lockedContext,
            buildSnapshot,
            chatPresetId: presetId,
            chatPresetName: presetName,
            presetId,
            presetName,
            requestSnapshot,
            provider: requestSnapshot.provider,
            model: requestSnapshot.model,
            finishReason: aborted ? 'aborted' : 'error',
        });
        await notifyRunCallback(() => input.onAssistantMessageSaved?.(session.id, errorMessage));
        await persistRunSessionState(session.id, {
            turn: Number(sessionState.turn || 0),
            worldEntryStates: shouldReplaceSessionState ? sessionState.worldEntryStates || {} : {},
            lastBuildSnapshot: buildSnapshot,
            lastRequestSnapshot: requestSnapshot,
            lastProvider: requestSnapshot.provider,
            lastModel: requestSnapshot.model,
            lastError: aborted ? '已停止生成。' : errorText,
        }, {
            replace: shouldReplaceSessionState,
        });
        return {
            sessionId: session.id,
            userMessage,
            errorMessage,
            buildResult,
            buildSnapshot,
            requestSnapshot,
            provider: requestSnapshot.provider,
            model: requestSnapshot.model,
            finishReason: aborted ? 'aborted' : 'error',
            previewMatchesRequest: buildResult.meta.rawMessagesJson === requestSnapshot.rawMessagesJson,
            nextTurn: Number(sessionState.turn || 0),
            error: aborted ? '已停止生成。' : errorText,
        };
    }
}
