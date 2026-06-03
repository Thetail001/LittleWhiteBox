<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { enhanceMarkdownContent, renderMarkdownToHtml } from '../../agent-core/ui/message-markdown.js';
import { createAgentSettingsPanel } from '../../agent-core/ui/settings-panel.js';
import { buildAgentSettingsPanelMarkup } from '../../agent-core/ui/settings-markup.js';
import { normalizeAgentConfig } from '../../agent-core/config.js';
import { createAgentAdapter, resolveActiveProviderConfig } from '../../agent-core/provider-config.js';
import { setHostChatCompletionsRequestHeadersProvider } from '../../../shared/host-llm/chat-completions/client.js';
import {
    type XbTavernContext,
    type TavernChatPromptPresetBundle,
} from '../shared/message-assembler';
import { buildXbTavernBrain } from '../shared/brain';
import {
    buildXbTavernMemoryIgnoredTerms,
    buildXbTavernMemoryQuery,
    getXbTavernMemoryTokenizerStatus,
    preloadXbTavernMemoryTokenizer,
    selectXbTavernMemoryContext,
} from '../shared/memory-retrieval';
import {
    getTavernMemoryIndex,
    listTavernMemoryFiles,
    writeTavernMemoryFile,
} from '../shared/memory-files';
import {
    createFallbackTavernChatPromptPresetBundle,
    normalizeTavernChatPromptPresetBundle,
} from '../shared/chat-presets';
import {
    createTavernSession,
    appendTavernMessage,
    deleteTavernSession,
    deleteTavernMessages,
    getActiveTavernAssistantPresetId,
    getSelectedTavernSessionId,
    listTavernAssistantPresets,
    listTavernEpisodeSummaries,
    listTavernManagerRuns,
    loadActiveTavernAssistantPreset,
    listTavernMessages,
    listTavernSessions,
    listTavernTurnSummaries,
    markTavernMemoryStaleFromOrder,
    normalizeTavernSessionState,
    replaceTavernSessionState,
    saveTavernAssistantPreset,
    setActiveTavernAssistantPresetId,
    setSelectedTavernSessionId,
    updateTavernMessage,
    updateTavernSessionSnapshot,
    type TavernEpisodeSummaryRecord,
    type TavernManagerRunRecord,
    type TavernMemoryFileRecord,
    type TavernMemoryIndexRecord,
    type TavernMessageRecord,
    type TavernAssistantPresetRecord,
    type TavernSessionRecord,
    type TavernTurnSummaryRecord,
} from '../shared/session-db';
import {
    buildTavernManagerSystemPrompt,
    createDefaultTavernAssistantPreset,
    normalizeTavernAssistantPreset,
    type TavernAssistantPreset,
} from '../shared/assistant-presets';
import { buildContextHistory, deriveTavernSessionStateFromMessages, runXbTavernTurn, simulateXbTavernRequest } from './runtime/run-once';
import { runXbTavernManagerAfterTurn } from './runtime/manager';
import { resolveXbTavernProviderConfig } from './runtime/provider';

interface TavernDiagnostics {
    ok?: boolean;
    message?: string;
    worldbookErrors?: Array<{ name: string; error: string }>;
}

interface RequestAuditSnapshot {
    rawMessagesJson?: string;
    rawRequestJson?: string;
    requestKind?: string;
    capturedAt?: number;
    messageCount?: number;
    messageChars?: number;
    presetName?: string;
    provider?: string;
    providerLabel?: string;
    model?: string;
    toolMode?: string;
}

interface PromptEditorRow {
    identifier: string;
    name: string;
    role: string;
    content: string;
    enabled: boolean;
    marker: boolean;
    systemPrompt: boolean;
    injectionPosition: number;
    injectionDepth: number | string;
    source: string;
    orderEntry: Record<string, unknown>;
    prompt: Record<string, unknown>;
    listed: boolean;
}

type AssistantPresetSectionKey =
    | 'managerIdentityPrompt'
    | 'managerContextPrompt'
    | 'managerToolPrompt'
    | 'managerMemoryPrompt'
    | 'managerWorkflowPrompt'
    | 'managerOutputPrompt'
    | 'managerCustomPrompt';

interface AssistantPresetSectionRow {
    key: AssistantPresetSectionKey;
    label: string;
    summary: string;
    rows: number;
}

interface TavernCharacterOption {
    id: string;
    name: string;
    avatar?: string;
    description?: string;
    personality?: string;
    scenario?: string;
    firstMessage?: string;
}

const SOURCE_APP = 'xb-tavern-app';
const SOURCE_HOST = 'xb-tavern-host';
const HOST_REQUEST_TIMEOUT_MS = 5000;
const CHARACTER_CONTEXT_TIMEOUT_MS = 15000;

const context = ref<XbTavernContext>({});
const diagnostics = ref<TavernDiagnostics>({});
const agentConfig = ref<Record<string, unknown>>({});
const hostRequestHeaders = ref<Record<string, unknown>>({});
const apiSettingsRootRef = ref<HTMLElement | null>(null);
const apiConfigSave = ref({ status: 'idle', requestId: '', error: '' });
const apiConfigStatus = ref('');
const availableCharacters = ref<TavernCharacterOption[]>([]);
const selectedCharacterId = ref('');
const pendingCharacterSessionId = ref('');
const pendingCharacterError = ref('');
const statusText = ref('等待读取资料');
const currentUserMessage = ref('');
const historyMode = ref<'raw' | 'squash'>('raw');
const runtimeText = ref('');
const runtimeError = ref('');
const runtimeProvider = ref('');
const runtimeModel = ref('');
const runtimeSnapshotJson = ref('');
const isRunning = ref(false);
const sessions = ref<TavernSessionRecord[]>([]);
const selectedSessionId = ref('');
const sessionMessages = ref<TavernMessageRecord[]>([]);
const turnSummaries = ref<TavernTurnSummaryRecord[]>([]);
const episodeSummaries = ref<TavernEpisodeSummaryRecord[]>([]);
const managerRuns = ref<TavernManagerRunRecord[]>([]);
const memoryFiles = ref<TavernMemoryFileRecord[]>([]);
const memoryIndex = ref<TavernMemoryIndexRecord | null>(null);
const memoryTokenizerStatus = ref(getXbTavernMemoryTokenizerStatus());
const selectedMemoryFilePath = ref('');
const memoryEditorDraft = ref('');
const memoryEditorMode = ref<'preview' | 'edit'>('preview');
const memoryEditorStatus = ref('');
const managerActionStatus = ref('');
const managerInputDraft = ref('');
const managerInputStatus = ref('');
const managerLocalMessages = ref<Array<{ id: string; role: 'user' | 'assistant'; content: string; createdAt: number }>>([]);
const isManagerAssistantRunning = ref(false);
const initialChatPreset = createFallbackTavernChatPromptPresetBundle();
const initialAssistantPreset: TavernAssistantPreset = createDefaultTavernAssistantPreset();
const assistantPresetSections: AssistantPresetSectionRow[] = [
    { key: 'managerIdentityPrompt', label: '身份与边界', summary: '它是谁，和主聊天助手如何分工。', rows: 6 },
    { key: 'managerContextPrompt', label: '信息来源', summary: '它默认拿到什么，哪些信息要自己再查。', rows: 5 },
    { key: 'managerToolPrompt', label: '工具纪律', summary: '它可以怎么用工具，不能碰什么。', rows: 6 },
    { key: 'managerMemoryPrompt', label: '记忆档案规则', summary: '各个 memory 文件分别负责什么。', rows: 6 },
    { key: 'managerWorkflowPrompt', label: '维护流程', summary: '每轮维护记忆时的工作顺序。', rows: 6 },
    { key: 'managerOutputPrompt', label: '输出规则', summary: '它结束时该怎么交代结果。', rows: 4 },
    { key: 'managerCustomPrompt', label: '补充规则', summary: '留给你单独补充的额外口径。', rows: 5 },
];
const preset = ref<TavernChatPromptPresetBundle>(initialChatPreset);
const activeChatPreset = ref<TavernChatPromptPresetBundle>(initialChatPreset);
const chatPresetList = ref<Record<string, unknown>>({});
const presetStatus = ref('');
const savedPresetJson = ref(JSON.stringify(initialChatPreset));
const selectedPromptIdentifier = ref('');
const assistantPreset = ref<TavernAssistantPreset>(initialAssistantPreset);
const activeAssistantPreset = ref<TavernAssistantPreset>(initialAssistantPreset);
const assistantPresets = ref<TavernAssistantPresetRecord[]>([]);
const activeAssistantPresetId = ref('');
const assistantPresetStatus = ref('');
const savedAssistantPresetJson = ref(JSON.stringify(initialAssistantPreset));
const selectedPresetSourceId = ref('');
type AppView = 'home' | 'chat' | 'characters' | 'settings';
type SettingsWorkspaceKey = 'api' | 'chatPreset' | 'assistantPreset';
type ChatFocus = 'chat' | 'manager';
type ChatLayout = 'chat' | 'balanced' | 'editor';
function readInitialView(): AppView {
    const hash = String(window.location.hash || '').replace(/^#\/?/, '');
    const [view] = hash.split('/');
    if (view === 'chat' || view === 'characters' || view === 'settings') {
        return view;
    }
    return 'home';
}
function readInitialSettingsWorkspace(): SettingsWorkspaceKey {
    const hash = String(window.location.hash || '').replace(/^#\/?/, '');
    const key = hash.split('/')[1];
    if (key === 'chatPreset' || key === 'assistantPreset') {return key;}
    return 'api';
}
interface PendingHostRequest {
    resolve: (value: Record<string, unknown>) => void;
    reject: (error: Error) => void;
    timer: number;
}
const pendingHostRequests = new Map<string, PendingHostRequest>();
const presetDirty = computed(() => snapshotPreset(preset.value) !== savedPresetJson.value);
const assistantPresetDirty = computed(() => snapshotAssistantPreset(assistantPreset.value) !== savedAssistantPresetJson.value);
const assistantPromptPreview = computed(() => buildTavernManagerSystemPrompt(assistantPreset.value));
const selectedSession = computed(() => sessions.value.find((item) => item.id === selectedSessionId.value) || null);
const sessionRuntimeState = computed(() => normalizeTavernSessionState(selectedSession.value?.state || {}));
const activeView = ref<AppView>(readInitialView());
const activeSettingsWorkspace = ref<SettingsWorkspaceKey>(readInitialSettingsWorkspace());
const chatFocus = ref<ChatFocus>('chat');
const chatLayout = ref<ChatLayout>('balanced');
const chatScrollRef = ref<HTMLElement | null>(null);
const chatAutoScroll = ref(true);
const showChatScrollTop = ref(false);
const showChatScrollBottom = ref(false);
const chatScrollControlsActive = ref(false);
const editingMessageKey = ref('');
const editingMessageDraft = ref('');
const showPromptInspector = ref(false);
const promptInspectorTab = ref<'history' | 'simulate'>('history');
const simulateRequestInput = ref('');
const simulateRequestJson = ref('');
const simulateRequestStatus = ref('');
const simulateRequestError = ref('');
const messageActionFeedback = ref<Record<string, 'success' | 'error'>>({});
const activeRunController = ref<AbortController | null>(null);
const managerAssistantController = ref<AbortController | null>(null);
const markdownHtmlCache = new Map<string, string>();
const apiSettingsPanelState: Record<string, unknown> = {
    config: {},
    configDraft: null,
    configFormSyncPending: true,
    configPage: 'main',
    configSave: apiConfigSave.value,
    pullStateByProvider: {},
    modelOptionsByProvider: {},
};
let apiSettingsPanel: ReturnType<typeof createAgentSettingsPanel> | null = null;
let chatScrollHideTimer: number | null = null;
let pendingCharacterSessionTimer: number | null = null;
let chatScrollTicking = false;
let chatTouchStartY: number | null = null;
let chatLastScrollTop = 0;
let simulateRequestSequence = 0;
const usingLockedSessionContext = computed(() => !!selectedSession.value?.contextSnapshot);
const liveWorldBookCount = computed(() => context.value.worldBooks?.length || 0);
const liveWorldEntryCount = computed(() => (context.value.worldBooks || []).reduce((sum, book) => sum + (book.entries?.length || 0), 0));
const contextSourceTitle = computed(() => usingLockedSessionContext.value
    ? '会话快照'
    : '酒馆当前资料');
const contextSourceDetail = computed(() => usingLockedSessionContext.value
    ? `保存于会话：${displayableTavernName(selectedSession.value?.characterName || selectedSession.value?.title || '', '未选择角色')}。`
    : `${displayableTavernName(context.value.character?.name || '', '未选择角色')} · 世界书 ${liveWorldBookCount.value} 本 / ${liveWorldEntryCount.value} 条。`);
const effectiveContext = computed<XbTavernContext>(() => ({
    ...(selectedSession.value?.contextSnapshot || context.value),
    history: selectedSessionId.value
        ? buildContextHistory(sessionMessages.value)
        : context.value.history,
}));
const memoryContext = computed(() => {
    if (memoryTokenizerStatus.value.status !== 'ready') {return {};}
    return selectXbTavernMemoryContext({
        episodeSummaries: episodeSummaries.value,
        turnSummaries: turnSummaries.value,
        memoryFiles: memoryFiles.value,
        queryText: buildXbTavernMemoryQuery(effectiveContext.value, currentUserMessage.value),
        ignoredTerms: buildXbTavernMemoryIgnoredTerms(effectiveContext.value),
    });
});

const brainBuild = computed(() => buildXbTavernBrain({
    context: effectiveContext.value,
    chatPreset: activeChatPreset.value,
    currentUserMessage: currentUserMessage.value,
    historyMode: historyMode.value,
    turn: sessionRuntimeState.value.turn,
    entryStates: sessionRuntimeState.value.worldEntryStates,
    memoryContext: memoryContext.value,
    diagnostics: diagnostics.value,
}));
const buildResult = computed(() => brainBuild.value.buildResult);

const effectiveCharacter = computed(() => effectiveContext.value.character || {});
const effectiveUser = computed(() => effectiveContext.value.user || {});
const characterName = computed(() => displayableTavernName(effectiveCharacter.value.name || '', '未选择角色'));
const hasCharacter = computed(() => !!displayableTavernName(effectiveCharacter.value.name || ''));
const characterAvatar = computed(() => String(effectiveCharacter.value.avatar || '').trim());
const liveCharacter = computed(() => context.value.character || {});
const liveCharacterId = computed(() => String(liveCharacter.value.id || selectedCharacterId.value || '').trim());
const characterCards = computed<TavernCharacterOption[]>(() => {
    const byId = new Map<string, TavernCharacterOption>();
    availableCharacters.value.forEach((character) => {
        const id = String(character.id || '').trim();
        if (!id) {return;}
        byId.set(id, {
            id,
            name: String(character.name || '').trim() || `角色 ${id}`,
            avatar: String(character.avatar || '').trim(),
            description: String(character.description || '').trim(),
            personality: String(character.personality || '').trim(),
            scenario: String(character.scenario || '').trim(),
            firstMessage: String(character.firstMessage || '').trim(),
        });
    });
    const currentId = String(liveCharacter.value.id || '').trim();
    if (currentId && liveCharacter.value.name && !byId.has(currentId)) {
        byId.set(currentId, {
            id: currentId,
            name: String(liveCharacter.value.name || '').trim(),
            avatar: String(liveCharacter.value.avatar || '').trim(),
            description: String(liveCharacter.value.description || '').trim(),
            personality: String(liveCharacter.value.personality || '').trim(),
            scenario: String(liveCharacter.value.scenario || '').trim(),
            firstMessage: String(liveCharacter.value.firstMessage || '').trim(),
        });
    }
    return [...byId.values()].sort((left, right) => {
        const leftCurrent = left.id === liveCharacterId.value ? -1 : 0;
        const rightCurrent = right.id === liveCharacterId.value ? -1 : 0;
        if (leftCurrent !== rightCurrent) {return leftCurrent - rightCurrent;}
        return left.name.localeCompare(right.name, 'zh-Hans-CN');
    });
});
const userName = computed(() => effectiveUser.value.name || 'User');
const worldBooks = computed(() => effectiveContext.value.worldBooks || []);
const worldBookCount = computed(() => worldBooks.value.length);
const worldEntryCount = computed(() => buildResult.value.worldEntryCandidates.length);
const activatedCount = computed(() => buildResult.value.activatedWorldEntries.length);
const messagePreview = computed(() => buildResult.value.messages);
function cleanTavernDisplayName(value = '') {
    return String(value || '')
        .replace(/\s*[·-]\s*小白酒馆\s*$/g, '')
        .replace(/\s*[·-]\s*会话\s*$/g, '')
        .replace(/^小白酒馆会话$/g, '')
        .replace(/\s*·\s*第\s*\d+\s*轮\s*·\s*\d+\s*条可用消息\s*$/g, '')
        .trim();
}

function isSystemDisplayName(value = '') {
    return /^(sillytavern\s+system|system)\b/i.test(String(value || '').trim());
}

function displayableTavernName(value = '', fallback = '') {
    const cleaned = cleanTavernDisplayName(value);
    return cleaned && !isSystemDisplayName(cleaned) ? cleaned : fallback;
}

function sessionDisplayTitle(session?: TavernSessionRecord | null) {
    if (!session) {return '';}
    const character = displayableTavernName(session.characterName || '');
    if (character) {return character;}
    const title = displayableTavernName(session.title || '');
    if (title) {return title;}
    return '';
}

const selectedSessionTitle = computed(() => (
    sessionDisplayTitle(selectedSession.value)
    || displayableTavernName(effectiveCharacter.value.name || '')
    || '未选择角色'
));
const displayCharacterName = computed(() => (
    selectedSessionId.value
        ? selectedSessionTitle.value
        : (displayableTavernName(characterName.value) || '未选择角色')
));
const rawMessagesJson = computed(() => buildResult.value.meta.rawMessagesJson);
const buildSnapshot = computed(() => brainBuild.value.buildSnapshot);
const effectiveHistoryCount = computed(() => effectiveContext.value.history?.length || 0);
const lastRequestSnapshot = computed(() => selectedSession.value?.state?.lastRequestSnapshot as RequestAuditSnapshot | undefined);
const lastRequestRawJson = computed(() => String(lastRequestSnapshot.value?.rawRequestJson || lastRequestSnapshot.value?.rawMessagesJson || ''));
const lastRequestMatchesPreview = computed(() => !!lastRequestSnapshot.value?.rawMessagesJson
    && lastRequestSnapshot.value.rawMessagesJson === rawMessagesJson.value);
const resolvedProviderConfig = computed(() => resolveXbTavernProviderConfig(agentConfig.value));
const apiReady = computed(() => resolvedProviderConfig.value.readiness.ok);
const apiReadyDetail = computed(() => resolvedProviderConfig.value.readiness.message);
const chatMessages = computed(() => sessionMessages.value);
const sessionMessagesForChat = computed(() => sessionMessages.value.filter((message) => !message.error));
const latestErrorMessage = computed(() => {
    if (runtimeError.value) {return runtimeError.value;}
    const lastMessage = [...sessionMessages.value].sort((left, right) => left.order - right.order).at(-1);
    return lastMessage?.error ? lastMessage.content : '';
});
const latestManagerRun = computed(() => managerRuns.value[0] || null);
const managerBusy = computed(() => managerRuns.value.some((run) => ['queued', 'running'].includes(run.status)));
const recentTurnSummaries = computed(() => [...turnSummaries.value].reverse().slice(0, 8));
const sidebarSessions = computed(() => sessions.value.slice(0, 6));
const chatSidebarSessions = computed(() => {
    const currentCharacterId = String(selectedSession.value?.characterId || effectiveContext.value.character?.id || '').trim();
    const sameCharacter = currentCharacterId
        ? sessions.value.filter((session) => String(session.characterId || '').trim() === currentCharacterId)
        : sessions.value;
    return sameCharacter.slice(0, 6);
});
const activeMemoryFiles = computed(() => memoryFiles.value.filter((file) => file.status !== 'stale'));
const selectedMemoryFile = computed(() => (
    memoryFiles.value.find((file) => file.path === selectedMemoryFilePath.value)
    || memoryFiles.value[0]
    || null
));
function memoryFileDisplayName(fileOrPath: TavernMemoryFileRecord | string | null | undefined) {
    const path = typeof fileOrPath === 'string' ? fileOrPath : String(fileOrPath?.path || '');
    if (path === 'memory/session.md') {return '剧情脉络';}
    if (path === 'memory/state.md') {return '状态栏';}
    if (path === 'memory/inbox.md') {return '待整理';}
    const episodeMatch = path.match(/^memory\/episodes\/([^/]+)\.md$/);
    if (episodeMatch) {
        const number = episodeMatch[1].replace(/^0+/, '') || episodeMatch[1];
        return `阶段 ${number}`;
    }
    const turnMatch = path.match(/^memory\/turns\/(\d{8})-(\d+)\.md$/);
    if (turnMatch) {
        const order = Number(turnMatch[2]) || 0;
        return order > 0 ? `第 ${order} 楼小记` : '楼层小记';
    }
    return path.replace(/^memory\//, '').replace(/\.md$/i, '') || '记忆档案';
}

function memoryFileKindLabel(fileOrPath: TavernMemoryFileRecord | string | null | undefined) {
    const path = typeof fileOrPath === 'string' ? fileOrPath : String(fileOrPath?.path || '');
    if (path === 'memory/session.md') {return '剧情为什么走到现在';}
    if (path === 'memory/state.md') {return '当前事实与状态';}
    if (path === 'memory/inbox.md') {return '待归档问题';}
    if (path.startsWith('memory/episodes/')) {return '阶段总结';}
    if (path.startsWith('memory/turns/')) {return '每回合小总结';}
    return '记忆档案';
}

function memoryFileSortWeight(path = '') {
    if (path === 'memory/session.md') {return 0;}
    if (path === 'memory/state.md') {return 1;}
    if (path === 'memory/inbox.md') {return 2;}
    if (path.startsWith('memory/episodes/')) {return 10;}
    if (path.startsWith('memory/turns/')) {return 20;}
    return 30;
}

const memoryDirectoryGroups = computed(() => {
    const groups = [
        {
            key: 'core',
            title: '核心档案',
            files: [] as TavernMemoryFileRecord[],
        },
        {
            key: 'episodes',
            title: '阶段档案',
            files: [] as TavernMemoryFileRecord[],
        },
        {
            key: 'turns',
            title: '楼层小记',
            files: [] as TavernMemoryFileRecord[],
        },
    ];
    const rest: TavernMemoryFileRecord[] = [];
    [...memoryFiles.value]
        .sort((left, right) => (
            memoryFileSortWeight(left.path) - memoryFileSortWeight(right.path)
            || String(left.path || '').localeCompare(String(right.path || ''))
        ))
        .forEach((file) => {
            if (['memory/session.md', 'memory/state.md', 'memory/inbox.md'].includes(file.path)) {
                groups[0].files.push(file);
            } else if (file.path.startsWith('memory/episodes/')) {
                groups[1].files.push(file);
            } else if (file.path.startsWith('memory/turns/')) {
                groups[2].files.push(file);
            } else {
                rest.push(file);
            }
        });
    const visible = groups.filter((group) => group.files.length);
    if (rest.length) {
        visible.push({
            key: 'other',
            title: '其他档案',
            files: rest,
        });
    }
    return visible;
});
const selectedMemoryFileTitle = computed(() => memoryFileDisplayName(selectedMemoryFile.value || 'memory/session.md'));
const memoryEditorDirty = computed(() => (
    !!selectedMemoryFile.value
    && memoryEditorDraft.value !== String(selectedMemoryFile.value.content || '')
));
const memoryIndexStatusLine = computed(() => {
    const tokenizer = memoryTokenizerStatus.value;
    if (tokenizer.status !== 'ready') {
        if (tokenizer.status === 'failed') {return `记忆检索准备失败：${tokenizer.error || 'memory_tokenizer_failed'}`;}
        if (tokenizer.status === 'loading') {return '记忆检索准备中';}
        return '记忆检索尚未准备好';
    }
    const index = memoryIndex.value;
    if (!index) {return '还没有可检索记忆';}
    if (index.status === 'ready') {return '记忆可检索';}
    if (index.status === 'failed') {return `记忆整理失败：${index.error || 'memory_index_failed'}`;}
    return '记忆正在整理';
});
const managerStatusLine = computed(() => {
    if (managerActionStatus.value) {return managerActionStatus.value;}
    const latest = latestManagerRun.value;
    if (!latest) {return '暂无工作记录';}
    if (latest.status === 'failed') {return `失败：${latest.error || 'manager_failed'}`;}
    if (latest.status === 'completed') {return `最近完成：第 ${latest.turn} 轮`; }
    if (latest.status === 'running') {return `正在整理：第 ${latest.turn} 轮`; }
    return `排队中：第 ${latest.turn} 轮`;
});
const chatMarkdownSignature = computed(() => sessionMessages.value
    .map((message) => `${message.sessionId}:${message.order}:${message.error ? 1 : 0}:${markdownSignature(message.content)}`)
    .join('|'));
const chatSubtitle = computed(() => {
    if (!selectedSessionId.value) {return '写一句话后会自动创建独立会话。';}
    const turn = Number(sessionRuntimeState.value.turn || 0);
    return `第 ${turn} 轮`;
});
const lastModelLine = computed(() => {
    const provider = String(lastRequestSnapshot.value?.providerLabel || lastRequestSnapshot.value?.provider || runtimeProvider.value || resolvedProviderConfig.value.providerLabel || '').trim();
    const model = String(lastRequestSnapshot.value?.model || runtimeModel.value || resolvedProviderConfig.value.model || '').trim();
    if (!provider && !model) {return '还没有调用记录';}
    return `${provider || '未知通道'} / ${model || '未知模型'}`;
});
const apiRuntimeLine = computed(() => {
    const config = resolvedProviderConfig.value;
    return `预设「${config.currentPresetName || '默认'}」 · ${config.providerLabel} / ${config.model || '未选择模型'}`;
});
const canSendMessage = computed(() => isRunning.value || !!currentUserMessage.value.trim());
const canSendManagerMessage = computed(() => isManagerAssistantRunning.value || !!managerInputDraft.value.trim());
const characterFields = computed(() => {
    const character = effectiveContext.value.character || {};
    const user = effectiveContext.value.user || {};
    return [
        ['角色', character.name],
        ['头像', character.avatar],
        ['用户', user.name],
        ['用户设定', user.persona || user.description],
        ['描述', character.description],
        ['性格', character.personality],
        ['场景', character.scenario],
        ['首条消息', character.firstMessage || character.first_mes],
        ['示例消息', character.mesExample || character.mes_example],
        ['作者备注', character.creatorNotes || character.creator_notes],
    ].filter((item) => String(item[1] || '').trim());
});

const diagnosticRows = computed(() => {
    const rows = [
        contextSourceDetail.value,
        apiReady.value ? `API：${apiRuntimeLine.value}` : `API：${apiReadyDetail.value}`,
        diagnostics.value.message || statusText.value,
        characterName.value ? '' : '当前没有可用角色卡。',
        effectiveHistoryCount.value ? '' : '这次准备资料里没有聊天历史。',
        worldBookCount.value ? '' : '这次准备资料里没有可用世界书。',
        ...(diagnostics.value.worldbookErrors || []).map((item) => `${item.name}: ${item.error}`),
    ];
    return rows.map((item) => String(item || '').trim()).filter(Boolean);
});

const messageRows = computed(() => messagePreview.value.map((message, index) => {
    const layer = buildResult.value.messageLayers[index];
    return {
        index,
        message,
        layer: layer?.layer || 'unknown',
        label: layer?.label || 'unknown',
        sourceId: layer?.sourceId || '',
        chars: layer?.chars || message.content.length,
        tokenEstimate: layer?.tokenEstimate || Math.max(1, Math.ceil(message.content.length / 4)),
    };
}));

type MessagePreviewRow = (typeof messageRows.value)[number];

const messageGroups = computed(() => {
    const labels: Record<string, string> = {
        top: '开场规则',
        preset: '预设条目',
        'world-before': '先放入的世界书',
        'character-card': '角色卡',
        'world-after': '角色卡后的世界书',
        'world-author-note': '世界书 · 作者备注',
        'world-examples': '世界书 · 示例消息',
        history: '会话历史',
        'current-user/history': '历史和本次输入',
        'current-user': '本次输入',
        'world-depth': '插入到历史里的世界书',
        'assistant-prefill': '回复开头',
    };
    const groups: Array<{ key: string; label: string; rows: MessagePreviewRow[]; chars: number; tokenEstimate: number }> = [];
    messageRows.value.forEach((row) => {
        const previous = groups[groups.length - 1];
        let group = previous?.key === row.layer ? previous : null;
        if (!group) {
            group = {
                key: row.layer,
                label: labels[row.layer] || row.label || row.layer,
                rows: [],
                chars: 0,
                tokenEstimate: 0,
            };
            groups.push(group);
        }
        group.rows.push(row);
        group.chars += row.chars;
        group.tokenEstimate += row.tokenEstimate;
    });
    return groups;
});

const activatedOrder = computed(() => new Map(buildResult.value.activatedWorldEntries.map((entry, index) => [entry.activationKey, index])));
const candidateRows = computed(() => buildResult.value.worldEntryCandidates);
function displayList(value: unknown): string {
    if (Array.isArray(value)) {return value.map((item) => String(item || '').trim()).filter(Boolean).join(', ');}
    return String(value || '').trim();
}
const worldBookEntryRows = computed(() => worldBooks.value.flatMap((book) => (book.entries || []).map((entry, index) => ({
    key: `${book.name || 'worldbook'}-${entry.uid ?? entry.id ?? index}`,
    bookName: book.name || '未命名世界书',
    title: String(entry.comment || entry.title || entry.name || entry.uid || entry.id || `条目 ${index + 1}`),
    keywords: displayList(entry.key),
    secondaryKeywords: displayList(entry.keysecondary || entry.secondary_keys),
    content: String(entry.content || ''),
}))));
const scanTextPreview = computed(() => buildResult.value.meta.scanText || '');
const worldBudget = computed(() => buildResult.value.meta.worldBudget);
const worldPositionRows = computed(() => Object.entries(buildResult.value.meta.worldPositionCounts || {})
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], 'zh-Hans-CN')));
const activatedCandidateRows = computed(() => candidateRows.value
    .filter((entry) => entry.status === 'activated')
    .sort((left, right) => (activatedOrder.value.get(left.activationKey) ?? 999999) - (activatedOrder.value.get(right.activationKey) ?? 999999)));
const skippedCandidateRows = computed(() => candidateRows.value
    .filter((entry) => entry.status !== 'activated')
    .sort((left, right) => right.order - left.order || left.activationKey.localeCompare(right.activationKey, 'zh-Hans-CN')));
const placementLabels: Record<string, string> = {
    top: '最前面',
    beforeCharacter: '角色卡前',
    afterCharacter: '角色卡后',
    beforeHistory: '历史前',
    afterHistory: '历史后',
    assistantPrefill: '回复开头',
};
function promptRecord(value: unknown): Record<string, unknown> {
    return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function clonePromptJson<T>(value: T): T {
    try {
        return JSON.parse(JSON.stringify(value)) as T;
    } catch {
        return value;
    }
}

function getPromptManagerDraft(): Record<string, unknown> {
    return promptRecord(preset.value.promptManager);
}

function getRawPresetDraft(): Record<string, unknown> {
    const manager = getPromptManagerDraft();
    return promptRecord(manager.rawPreset);
}

function getPromptArrayDraft(): Record<string, unknown>[] {
    const raw = getRawPresetDraft();
    const manager = getPromptManagerDraft();
    const source = Array.isArray(raw.prompts)
        ? raw.prompts
        : Array.isArray(manager.prompts)
            ? manager.prompts
            : [];
    return source.map((item) => promptRecord(item)).filter((item) => String(item.identifier || item.id || '').trim());
}

function getPromptOrderContainersDraft(): Record<string, unknown>[] {
    const raw = getRawPresetDraft();
    const manager = getPromptManagerDraft();
    const source = Array.isArray(raw.prompt_order)
        ? raw.prompt_order
        : Array.isArray(manager.promptOrder)
            ? manager.promptOrder
            : [];
    return source.map((item) => promptRecord(item));
}

function getActivePromptOrderDraft(): Record<string, unknown>[] {
    const manager = getPromptManagerDraft();
    const activeOrder = Array.isArray(manager.activeOrder) ? manager.activeOrder.map((item) => promptRecord(item)) : [];
    if (activeOrder.length) {return activeOrder;}
    const activeCharacterId = String(manager.activeCharacterId ?? '').trim();
    if (!activeCharacterId) {return [];}
    const containers = getPromptOrderContainersDraft();
    const activeContainer = containers.find((item) => String(item.character_id ?? '') === activeCharacterId);
    return Array.isArray(activeContainer?.order) ? activeContainer.order.map((item) => promptRecord(item)) : [];
}

function getActivePromptCharacterId(): string {
    return String(getPromptManagerDraft().activeCharacterId ?? '').trim();
}

const canEditPromptOrder = computed(() => Boolean(getActivePromptCharacterId()));

const promptEditorRows = computed<PromptEditorRow[]>(() => {
    const prompts = getPromptArrayDraft();
    const promptById = new Map(prompts.map((prompt, index) => [
        String(prompt.identifier || prompt.id || `prompt-${index + 1}`).trim(),
        prompt,
    ]));
    const order = getActivePromptOrderDraft();
    const seen = new Set<string>();
    const rows: PromptEditorRow[] = [];

    order.forEach((entry) => {
        const identifier = String(entry.identifier || '').trim();
        if (!identifier || seen.has(identifier)) {return;}
        const prompt = promptById.get(identifier) || { identifier, name: identifier };
        seen.add(identifier);
        rows.push({
            identifier,
            name: String(prompt.name || prompt.label || identifier),
            role: String(prompt.role || 'system'),
            content: String(prompt.content || ''),
            enabled: entry.enabled !== false,
            marker: prompt.marker === true,
            systemPrompt: prompt.system_prompt === true,
            injectionPosition: Number(prompt.injection_position ?? 0),
            injectionDepth: Number.isFinite(Number(prompt.injection_depth)) ? Number(prompt.injection_depth) : '',
            source: prompt.extension ? '扩展' : prompt.system_prompt ? '系统' : '预设',
            orderEntry: entry,
            prompt,
            listed: true,
        });
    });

    return rows;
});
const selectedPromptRow = computed(() => promptEditorRows.value.find((row) => row.identifier === selectedPromptIdentifier.value) || promptEditorRows.value[0] || null);
const activePromptOrderLabel = computed(() => {
    const activeCharacterId = getActivePromptCharacterId();
    return activeCharacterId ? `当前角色 ${activeCharacterId}` : '未取得当前角色顺序';
});
const presetRows = computed(() => (preset.value.sections || [])
    .map((section, index) => ({
        ...section,
        previewId: section.id || `chat-preset-section-${index}`,
        previewLabel: section.label || section.source || `提示词 ${index + 1}`,
        previewPlacement: section.source === 'promptManager'
            ? (section.marker ? '酒馆标记' : '酒馆顺序')
            : (placementLabels[section.placement || 'beforeHistory'] || section.placement || '历史前'),
        sectionIndex: index,
        chars: String(section.content || '').length,
    }))
    .filter((row) => (row.content || row.marker) && row.enabled !== false));
const presetTotalChars = computed(() => presetRows.value.reduce((sum, row) => sum + row.chars, 0));

watch(promptEditorRows, (rows) => {
    if (!rows.length) {
        selectedPromptIdentifier.value = '';
        return;
    }
    if (!rows.some((row) => row.identifier === selectedPromptIdentifier.value)) {
        selectedPromptIdentifier.value = rows[0]?.identifier || '';
    }
}, { immediate: true });

function snapshotPreset(value = preset.value) {
    return JSON.stringify(value || {});
}

function snapshotAssistantPreset(value = assistantPreset.value) {
    return JSON.stringify(value || {});
}

function applyActiveChatPreset(next: Partial<TavernChatPromptPresetBundle> = {}, options: { replaceDraft?: boolean } = {}) {
    const normalized = normalizeTavernChatPromptPresetBundle(next);
    activeChatPreset.value = normalized;
    savedPresetJson.value = snapshotPreset(normalized);
    if (options.replaceDraft !== false) {
        preset.value = normalized;
    }
}

function applyActiveAssistantPreset(next: Partial<TavernAssistantPreset> = {}, options: { replaceDraft?: boolean } = {}) {
    const normalized = normalizeTavernAssistantPreset(next);
    activeAssistantPreset.value = normalized;
    savedAssistantPresetJson.value = snapshotAssistantPreset(normalized);
    if (options.replaceDraft !== false) {
        assistantPreset.value = normalized;
    }
}

async function refreshPresets() {
    const [loadedAssistantPresets, activeAssistantId, loadedAssistantPreset] = await Promise.all([
        listTavernAssistantPresets(),
        getActiveTavernAssistantPresetId(),
        loadActiveTavernAssistantPreset(),
    ]);
    assistantPresets.value = loadedAssistantPresets;
    activeAssistantPresetId.value = activeAssistantId || loadedAssistantPreset.id;
    applyActiveAssistantPreset(loadedAssistantPreset, { replaceDraft: !assistantPresetDirty.value });
}

async function refreshChatPresetFromHost() {
    const result = await requestHost('xb-tavern:list-chat-presets');
    if (result.ok === false) {
        presetStatus.value = String(result.error || '读取失败');
        return;
    }
    const payload = (result.result || result) as Record<string, unknown>;
    chatPresetList.value = payload;
    applyActiveChatPreset(payload.active as Partial<TavernChatPromptPresetBundle>);
    selectedPresetSourceId.value = '';
}

async function saveCurrentPreset() {
    if (!canEditPromptOrder.value) {
        presetStatus.value = '未取得当前角色顺序，请刷新后再保存';
        return;
    }
    presetStatus.value = '正在保存';
    const result = await requestHost('xb-tavern:save-chat-preset', {
        payload: preset.value as unknown as Record<string, unknown>,
    });
    if (result.ok === false) {
        presetStatus.value = String(result.error || '保存失败');
        return;
    }
    applyActiveChatPreset(result.result as Partial<TavernChatPromptPresetBundle>);
    presetStatus.value = '已保存';
    postToHost('xb-tavern:refresh-context', {});
}

async function discardPresetChanges() {
    if (!presetDirty.value) {return;}
    preset.value = normalizeTavernChatPromptPresetBundle(activeChatPreset.value);
    savedPresetJson.value = snapshotPreset(activeChatPreset.value);
    presetStatus.value = '已放弃';
}

function updateChatPresetPatch(patch: Partial<TavernChatPromptPresetBundle>) {
    preset.value = normalizeTavernChatPromptPresetBundle({
        ...preset.value,
        ...patch,
    });
}

function updateChatPresetComponent(
    key: 'promptManager' | 'systemPrompt' | 'contextTemplate' | 'instructTemplate',
    patch: Record<string, unknown>,
) {
    preset.value = normalizeTavernChatPromptPresetBundle({
        ...preset.value,
        [key]: {
            ...((preset.value[key] || {}) as Record<string, unknown>),
            ...patch,
        },
    });
}

function commitPromptManagerDraft(rawPreset: Record<string, unknown>, patch: Record<string, unknown> = {}) {
    const prompts = Array.isArray(rawPreset.prompts) ? rawPreset.prompts : [];
    const promptOrder = Array.isArray(rawPreset.prompt_order) ? rawPreset.prompt_order : [];
    updateChatPresetComponent('promptManager', {
        rawPreset,
        prompts,
        promptOrder,
        ...patch,
    });
}

function updatePromptByIdentifier(identifier: string, patch: Record<string, unknown>) {
    const targetId = String(identifier || '').trim();
    if (!targetId) {return;}
    const rawPreset = clonePromptJson(getRawPresetDraft());
    const prompts = getPromptArrayDraft().map((prompt) => ({ ...prompt }));
    const index = prompts.findIndex((prompt) => String(prompt.identifier || prompt.id || '').trim() === targetId);
    if (index >= 0) {
        prompts[index] = {
            ...prompts[index],
            ...patch,
            identifier: targetId,
        };
    } else {
        prompts.push({
            identifier: targetId,
            name: targetId,
            role: 'system',
            content: '',
            ...patch,
        });
    }
    rawPreset.prompts = prompts;
    commitPromptManagerDraft(rawPreset);
}

function setActivePromptOrder(nextOrder: Record<string, unknown>[]) {
    const rawPreset = clonePromptJson(getRawPresetDraft());
    const manager = getPromptManagerDraft();
    const containers = getPromptOrderContainersDraft().map((item) => ({ ...item }));
    const activeCharacterId = String(manager.activeCharacterId ?? '').trim();
    if (!activeCharacterId) {
        presetStatus.value = '未取得当前角色顺序，请刷新后再保存';
        return;
    }
    let targetIndex = containers.findIndex((item) => String(item.character_id ?? '') === activeCharacterId);
    if (targetIndex < 0) {
        targetIndex = containers.length;
        containers.push({
            character_id: activeCharacterId,
            order: [],
        });
    }
    containers[targetIndex] = {
        ...containers[targetIndex],
        order: nextOrder,
    };
    rawPreset.prompt_order = containers;
    commitPromptManagerDraft(rawPreset, { activeOrder: nextOrder });
}

function buildCurrentPromptOrderFromRows(rows = promptEditorRows.value): Record<string, unknown>[] {
    return rows
        .filter((row) => row.listed)
        .map((row) => ({
            ...row.orderEntry,
            identifier: row.identifier,
            enabled: row.enabled,
        }));
}

function updatePromptOrderEntry(identifier: string, patch: Record<string, unknown>) {
    const targetId = String(identifier || '').trim();
    if (!canEditPromptOrder.value) {
        presetStatus.value = '未取得当前角色顺序，请刷新后再保存';
        return;
    }
    if (!targetId) {return;}
    const rows = promptEditorRows.value;
    const nextOrder = buildCurrentPromptOrderFromRows(rows).map((entry) => (
        String(entry.identifier || '').trim() === targetId
            ? { ...entry, ...patch, identifier: targetId }
            : entry
    ));
    setActivePromptOrder(nextOrder);
}

function movePromptRow(identifier: string, direction: -1 | 1) {
    if (!canEditPromptOrder.value) {
        presetStatus.value = '未取得当前角色顺序，请刷新后再保存';
        return;
    }
    const rows = promptEditorRows.value;
    const index = rows.findIndex((row) => row.identifier === identifier);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= rows.length) {return;}
    const nextRows = rows.slice();
    const [item] = nextRows.splice(index, 1);
    if (!item) {return;}
    nextRows.splice(nextIndex, 0, item);
    setActivePromptOrder(buildCurrentPromptOrderFromRows(nextRows));
    selectedPromptIdentifier.value = identifier;
}

function togglePromptRow(identifier: string, enabled: boolean) {
    updatePromptOrderEntry(identifier, { enabled });
}

function promptRoleDisplay(role = ''): string {
    return String(role || 'system').trim() || 'system';
}

function updateAssistantPresetPatch(patch: Partial<TavernAssistantPreset>) {
    assistantPreset.value = {
        ...assistantPreset.value,
        ...patch,
    };
}

function readAssistantPresetField(key: AssistantPresetSectionKey): string {
    return String(assistantPreset.value[key] || '');
}

function updateAssistantPresetField(key: AssistantPresetSectionKey, value = '') {
    updateAssistantPresetPatch({ [key]: value } as Partial<TavernAssistantPreset>);
}

async function selectAssistantPreset(presetId: string) {
    await setActiveTavernAssistantPresetId(presetId);
    activeAssistantPresetId.value = presetId;
    applyActiveAssistantPreset(await loadActiveTavernAssistantPreset());
    assistantPresetStatus.value = '已切换';
}

async function saveCurrentAssistantPreset() {
    const record = await saveTavernAssistantPreset(assistantPreset.value, {
        isBuiltIn: assistantPreset.value.id === activeAssistantPresetId.value && assistantPreset.value.id.includes('default'),
    });
    await setActiveTavernAssistantPresetId(record.id);
    activeAssistantPresetId.value = record.id;
    applyActiveAssistantPreset(record.preset);
    assistantPresets.value = await listTavernAssistantPresets();
    assistantPresetStatus.value = '已保存';
}

async function deriveAssistantPreset() {
    const record = await saveTavernAssistantPreset({
        ...assistantPreset.value,
        id: `assistant-preset-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: `${assistantPreset.value.name || '助手预设'} 副本`,
    });
    await setActiveTavernAssistantPresetId(record.id);
    activeAssistantPresetId.value = record.id;
    applyActiveAssistantPreset(record.preset);
    assistantPresets.value = await listTavernAssistantPresets();
    assistantPresetStatus.value = '已复制';
}

async function discardAssistantPresetChanges() {
    if (!assistantPresetDirty.value) {return;}
    assistantPreset.value = { ...activeAssistantPreset.value };
    savedAssistantPresetJson.value = snapshotAssistantPreset(activeAssistantPreset.value);
    assistantPresetStatus.value = '已放弃';
}

function describeError(error: unknown) {
    return error instanceof Error ? error.message : String(error || 'unknown_error');
}

function postToHost(type: string, payload: Record<string, unknown> = {}) {
    window.parent?.postMessage({ source: SOURCE_APP, type, payload }, window.location.origin);
}

function createHostRequestId(prefix = 'host') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function requestHost(type: string, payload: Record<string, unknown> = {}, options: { timeoutMs?: number } = {}) {
    const requestId = createHostRequestId();
    postToHost(type, { ...payload, requestId });
    return new Promise<Record<string, unknown>>((resolve, reject) => {
        const timer = window.setTimeout(() => {
            pendingHostRequests.delete(requestId);
            reject(new Error('host_request_timeout'));
        }, Number(options.timeoutMs) || HOST_REQUEST_TIMEOUT_MS);
        pendingHostRequests.set(requestId, { resolve, reject, timer });
    });
}

function resolveHostRequest(payload: Record<string, unknown> = {}) {
    const requestId = String(payload.requestId || '');
    const pending = pendingHostRequests.get(requestId);
    if (!pending) {return;}
    window.clearTimeout(pending.timer);
    pendingHostRequests.delete(requestId);
    if (payload.ok === false) {
        pending.reject(new Error(String(payload.error || 'host_request_failed')));
        return;
    }
    pending.resolve(payload);
}

function installHostRequestHeadersProvider(payload: Record<string, unknown> = {}) {
    const fallbackHeaders = payload.hostRequestHeaders && typeof payload.hostRequestHeaders === 'object'
        ? payload.hostRequestHeaders as Record<string, unknown>
        : hostRequestHeaders.value;
    hostRequestHeaders.value = fallbackHeaders || {};
    setHostChatCompletionsRequestHeadersProvider(async () => {
        try {
            const result = await requestHost('xb-tavern:get-host-request-headers');
            return result.hostRequestHeaders && typeof result.hostRequestHeaders === 'object'
                ? result.hostRequestHeaders as Record<string, unknown>
                : hostRequestHeaders.value;
        } catch {
            return hostRequestHeaders.value;
        }
    });
}

function syncApiSettingsConfigFromAgentConfig() {
    apiSettingsPanelState.config = normalizeAgentConfig(agentConfig.value || {});
    apiSettingsPanelState.configDraft = null;
    apiSettingsPanelState.configFormSyncPending = true;
}

function beginApiConfigSave(requestId = '') {
    apiConfigSave.value = { status: 'saving', requestId, error: '' };
    apiSettingsPanelState.configSave = apiConfigSave.value;
    apiConfigStatus.value = '正在保存共享 API 配置...';
    void nextTick(renderApiSettingsPanel);
}

function completeApiConfigSave(requestId = '', result: { ok?: boolean; error?: string } = {}) {
    if (requestId && apiConfigSave.value.requestId && requestId !== apiConfigSave.value.requestId) {return;}
    apiConfigSave.value = {
        status: result.ok ? 'success' : 'error',
        requestId,
        error: result.error || '',
    };
    apiSettingsPanelState.configSave = apiConfigSave.value;
    apiConfigStatus.value = result.ok ? '共享 API 配置已保存。' : `保存失败：${result.error || 'unknown_error'}`;
    window.setTimeout(() => {
        if (apiConfigSave.value.requestId !== requestId || apiConfigSave.value.status !== 'success') {return;}
        apiConfigSave.value = { status: 'idle', requestId: '', error: '' };
        apiSettingsPanelState.configSave = apiConfigSave.value;
        apiConfigStatus.value = '';
        void nextTick(renderApiSettingsPanel);
    }, 1400);
    void nextTick(renderApiSettingsPanel);
}

function handleApiConfigSave(payload: { requestId?: string; payload?: Record<string, unknown> }) {
    const requestId = String(payload.requestId || `save-config-${Date.now()}`);
    beginApiConfigSave(requestId);
    postToHost('xb-tavern:save-config', {
        requestId,
        payload: payload.payload || {},
    });
}

function renderApiSettingsPanel() {
    const root = apiSettingsRootRef.value;
    if (!root) {return;}
    if (!apiSettingsPanel) {
        apiSettingsPanel = createAgentSettingsPanel({
            state: apiSettingsPanelState,
            render: renderApiSettingsPanel,
            describeError,
            showToast: (message: string) => {
                apiConfigStatus.value = String(message || '');
            },
            saveConfig: handleApiConfigSave,
            getRuntimeSummaryText: () => apiRuntimeLine.value,
        });
    }
    apiSettingsPanelState.configSave = apiConfigSave.value;
    // The settings panel markup is generated by our first-party shared config renderer.
    // eslint-disable-next-line no-unsanitized/property
    root.innerHTML = buildAgentSettingsPanelMarkup({
        configSave: apiConfigSave.value,
        runtimeText: apiRuntimeLine.value,
        inlineToastText: apiConfigStatus.value,
        showAssistantPermissions: false,
        showDelegateSettings: true,
        activePage: String(apiSettingsPanelState.configPage || 'main'),
        delegatePresetHint: '记忆整理会复用这里的分身 API；当前聊天仍使用主 API。',
        isBusy: isRunning.value,
        canDeletePreset: Object.keys((apiSettingsPanelState.config as Record<string, unknown>)?.presets || {}).length > 1,
    });
    apiSettingsPanel.syncConfigToForm(root);
    apiSettingsPanel.bindSettingsPanelEvents(root);
}

function handleApiConfigSaved(payload: Record<string, unknown>) {
    const ok = payload.ok === true;
    if (ok) {
        agentConfig.value = payload.config as Record<string, unknown> || agentConfig.value;
        syncApiSettingsConfigFromAgentConfig();
        completeApiConfigSave(String(payload.requestId || ''), { ok: true });
        return;
    }
    syncApiSettingsConfigFromAgentConfig();
    completeApiConfigSave(String(payload.requestId || ''), {
        ok: false,
        error: String(payload.error || '保存失败'),
    });
}

function applyHostPayload(payload: Record<string, unknown>) {
    installHostRequestHeadersProvider(payload);
    context.value = payload.context as XbTavernContext || {};
    diagnostics.value = payload.diagnostics as TavernDiagnostics || {};
    if ('agentConfig' in payload) {
        agentConfig.value = payload.agentConfig as Record<string, unknown> || agentConfig.value;
        syncApiSettingsConfigFromAgentConfig();
    }
    if ('chatPreset' in payload) {
        applyActiveChatPreset(payload.chatPreset as Partial<TavernChatPromptPresetBundle>, {
            replaceDraft: !presetDirty.value,
        });
    }
    if ('chatPresetList' in payload) {
        chatPresetList.value = payload.chatPresetList as Record<string, unknown> || {};
    }
    availableCharacters.value = payload.availableCharacters as TavernCharacterOption[] || availableCharacters.value;
    selectedCharacterId.value = String(payload.selectedCharacterId || context.value.character?.id || selectedCharacterId.value || '');
    statusText.value = usingLockedSessionContext.value
        ? `${diagnostics.value.message || '宿主资料已加载'}；当前会话仍使用锁定资料。`
        : diagnostics.value.message || '宿主资料已加载';
    void finishPendingCharacterSession().catch((error) => {
        pendingCharacterError.value = error instanceof Error ? error.message : String(error || 'create_session_failed');
        clearPendingCharacterSession();
    });
    void nextTick(renderApiSettingsPanel);
}

function onHostMessage(event: MessageEvent) {
    if (event.origin !== window.location.origin) {return;}
    const data = event.data || {};
    if (data.source !== SOURCE_HOST) {return;}
    if (data.type === 'xb-tavern:host-result') {
        resolveHostRequest(data.payload || {});
        return;
    }
    if (data.type === 'xb-tavern:config') {
        applyHostPayload(data.payload || {});
        return;
    }
    if (data.type === 'xb-tavern:context') {
        applyHostPayload(data.payload || {});
        return;
    }
    if (data.type === 'xb-tavern:config-saved') {
        handleApiConfigSaved(data.payload || {});
    }
}

function openCharacterSelect() {
    activeView.value = 'characters';
    pendingCharacterError.value = '';
}

function refreshCharacterList() {
    statusText.value = '正在读取角色列表';
    pendingCharacterError.value = '';
    postToHost('xb-tavern:refresh-context', {});
}

async function refreshSessions() {
    sessions.value = await listTavernSessions();
    selectedSessionId.value = await getSelectedTavernSessionId();
    if (!selectedSessionId.value && sessions.value[0]) {
        selectedSessionId.value = sessions.value[0].id;
        await setSelectedTavernSessionId(selectedSessionId.value);
    }
    sessionMessages.value = selectedSessionId.value ? await listTavernMessages(selectedSessionId.value) : [];
    await refreshManagerRecords(selectedSessionId.value);
}

async function refreshManagerRecords(sessionId = selectedSessionId.value) {
    const id = String(sessionId || '').trim();
    if (!id) {
        turnSummaries.value = [];
        episodeSummaries.value = [];
        managerRuns.value = [];
        memoryFiles.value = [];
        memoryIndex.value = null;
        selectedMemoryFilePath.value = '';
        return;
    }
    const [turns, episodes, runs, files, index] = await Promise.all([
        listTavernTurnSummaries(id),
        listTavernEpisodeSummaries(id),
        listTavernManagerRuns(id, { limit: 18 }),
        listTavernMemoryFiles(id, { includeStale: true }),
        getTavernMemoryIndex(id),
    ]);
    if (id !== selectedSessionId.value) {return;}
    turnSummaries.value = turns;
    episodeSummaries.value = episodes.reverse();
    managerRuns.value = runs;
    memoryFiles.value = files;
    memoryIndex.value = index;
    if (!files.some((file) => file.path === selectedMemoryFilePath.value)) {
        selectedMemoryFilePath.value = files[0]?.path || '';
    }
}

async function rebuildSelectedSessionRuntimeState(messages: TavernMessageRecord[] = sessionMessages.value) {
    if (!selectedSessionId.value) {return;}
    const state = deriveTavernSessionStateFromMessages({
        messages,
        contextSnapshot: selectedSession.value?.contextSnapshot || context.value,
        chatPreset: activeChatPreset.value,
        historyMode: historyMode.value,
        diagnostics: diagnostics.value,
    });
    await replaceTavernSessionState(selectedSessionId.value, state);
    await refreshSessions();
}

function resetSessionPreviewState() {
    simulateRequestSequence += 1;
    currentUserMessage.value = '';
    runtimeText.value = '';
    runtimeError.value = '';
    runtimeSnapshotJson.value = '';
    simulateRequestInput.value = '';
    simulateRequestJson.value = '';
    simulateRequestStatus.value = '';
    simulateRequestError.value = '';
    showPromptInspector.value = false;
    promptInspectorTab.value = 'history';
    markdownHtmlCache.clear();
}

async function appendFirstMessageIfPresent(sessionId: string, snapshotContext: XbTavernContext) {
    const firstMessage = String(snapshotContext.character?.firstMessage || snapshotContext.character?.first_mes || '').trim();
    if (!firstMessage) {return;}
    await appendTavernMessage(sessionId, {
        role: 'assistant',
        name: String(snapshotContext.character?.name || ''),
        content: firstMessage,
        contextSnapshot: snapshotContext,
        chatPresetId: String(activeChatPreset.value.id || ''),
        chatPresetName: String(activeChatPreset.value.name || ''),
        presetId: String(activeChatPreset.value.id || ''),
        presetName: String(activeChatPreset.value.name || ''),
    });
}

async function createSessionFromContext(options: { includeFirstMessage?: boolean; contextSnapshot?: XbTavernContext } = {}) {
    const snapshotContext = options.contextSnapshot || context.value;
    const snapshotBrain = buildXbTavernBrain({
        context: snapshotContext,
        chatPreset: activeChatPreset.value,
        currentUserMessage: '',
        historyMode: historyMode.value,
        turn: 0,
        entryStates: {},
        diagnostics: diagnostics.value,
    });
    const session = await createTavernSession({
        title: String(snapshotContext.character?.name || '未选择角色'),
        characterId: String(snapshotContext.character?.id || ''),
        characterName: String(snapshotContext.character?.name || '未选择角色'),
        contextSnapshot: snapshotContext,
        buildSnapshot: snapshotBrain.buildSnapshot,
        chatPresetId: String(activeChatPreset.value.id || ''),
        chatPresetName: String(activeChatPreset.value.name || ''),
        presetId: String(activeChatPreset.value.id || ''),
        presetName: String(activeChatPreset.value.name || ''),
        state: {
            turn: 0,
            worldEntryStates: {},
        },
    });
    if (options.includeFirstMessage !== false) {
        await appendFirstMessageIfPresent(session.id, snapshotContext);
    }
    selectedSessionId.value = session.id;
    await refreshSessions();
    return session;
}

async function createSessionAndOpenChat(options: { contextSnapshot?: XbTavernContext } = {}) {
    await createSessionFromContext(options);
    activeView.value = 'chat';
    chatFocus.value = 'chat';
}

async function handleHomePrimaryAction() {
    if (selectedSessionId.value) {
        openChatView();
        return;
    }
    openCharacterSelect();
}

async function handleHomeNewSession() {
    openCharacterSelect();
}

function clearPendingCharacterSession() {
    if (pendingCharacterSessionTimer) {
        window.clearTimeout(pendingCharacterSessionTimer);
        pendingCharacterSessionTimer = null;
    }
    pendingCharacterSessionId.value = '';
}

async function finishPendingCharacterSession() {
    const targetId = pendingCharacterSessionId.value;
    if (!targetId) {return;}
    const currentId = String(context.value.character?.id || selectedCharacterId.value || '').trim();
    if (currentId !== targetId) {return;}
    if (!displayableTavernName(context.value.character?.name || '')) {
        clearPendingCharacterSession();
        pendingCharacterError.value = '没有读到这张角色卡。';
        return;
    }
    clearPendingCharacterSession();
    pendingCharacterError.value = '';
    resetSessionPreviewState();
    await createSessionAndOpenChat();
}

async function selectCharacterAndCreateSession(characterId: string) {
    const targetId = String(characterId || '').trim();
    if (!targetId || pendingCharacterSessionId.value) {return;}
    selectedSessionId.value = '';
    sessionMessages.value = [];
    await setSelectedTavernSessionId('');
    await refreshManagerRecords('');
    resetSessionPreviewState();
    selectedCharacterId.value = targetId;
    pendingCharacterError.value = '';
    statusText.value = '正在读取角色卡';
    pendingCharacterSessionId.value = targetId;
    if (pendingCharacterSessionTimer) {window.clearTimeout(pendingCharacterSessionTimer);}
    pendingCharacterSessionTimer = window.setTimeout(() => {
        if (pendingCharacterSessionId.value !== targetId) {return;}
        clearPendingCharacterSession();
        pendingCharacterError.value = '读取角色卡超时。';
    }, CHARACTER_CONTEXT_TIMEOUT_MS);
    postToHost('xb-tavern:refresh-context', { characterId: targetId, includeHistory: false });
}

async function refreshSelectedSessionSnapshot() {
    if (!selectedSessionId.value) {return;}
    const snapshotContext = context.value;
    const snapshotBrain = buildXbTavernBrain({
        context: snapshotContext,
        chatPreset: activeChatPreset.value,
        currentUserMessage: currentUserMessage.value,
        historyMode: historyMode.value,
        turn: sessionRuntimeState.value.turn,
        entryStates: sessionRuntimeState.value.worldEntryStates,
        diagnostics: diagnostics.value,
    });
    await updateTavernSessionSnapshot(selectedSessionId.value, {
        contextSnapshot: snapshotContext,
        buildSnapshot: snapshotBrain.buildSnapshot,
        chatPresetId: String(activeChatPreset.value.id || ''),
        chatPresetName: String(activeChatPreset.value.name || ''),
        presetId: String(activeChatPreset.value.id || ''),
        presetName: String(activeChatPreset.value.name || ''),
    });
    await refreshSessions();
}

async function selectSession(sessionId: string) {
    resetSessionPreviewState();
    selectedSessionId.value = sessionId;
    await setSelectedTavernSessionId(sessionId);
    sessionMessages.value = await listTavernMessages(sessionId);
    await refreshManagerRecords(sessionId);
    activeView.value = 'chat';
    chatFocus.value = 'chat';
}

async function removeSession(sessionId: string, event?: Event) {
    event?.stopPropagation();
    const id = String(sessionId || '').trim();
    if (!id) {return;}
    const session = sessions.value.find((item) => item.id === id);
    const title = sessionDisplayTitle(session) || '这个会话';
    if (!window.confirm(`删除「${title}」？`)) {return;}
    if (id === selectedSessionId.value && isRunning.value) {
        activeRunController.value?.abort();
    }
    const removed = await deleteTavernSession(id);
    if (!removed) {return;}
    if (id === selectedSessionId.value) {
        resetSessionPreviewState();
    }
    await refreshSessions();
    if (!selectedSessionId.value) {
        sessionMessages.value = [];
        await refreshManagerRecords('');
        activeView.value = 'home';
        return;
    }
    activeView.value = 'home';
}

function openChatView() {
    activeView.value = 'chat';
    chatFocus.value = 'chat';
}

function openPromptInspector(tab: 'history' | 'simulate' = 'history') {
    promptInspectorTab.value = tab;
    showPromptInspector.value = true;
}

function closePromptInspector() {
    showPromptInspector.value = false;
}

async function simulateApiRequest() {
    const messageText = simulateRequestInput.value.trim();
    simulateRequestError.value = '';
    simulateRequestStatus.value = '';
    simulateRequestJson.value = '';
    if (!messageText) {
        simulateRequestError.value = '先写一句话。';
        return;
    }
    const requestSequence = simulateRequestSequence + 1;
    simulateRequestSequence = requestSequence;
    const requestSessionId = selectedSessionId.value;
    simulateRequestStatus.value = '模拟中';
    try {
        const result = await simulateXbTavernRequest({
            sessionId: requestSessionId,
            agentConfig: agentConfig.value,
            contextSnapshot: context.value,
            chatPreset: activeChatPreset.value,
            currentUserMessage: messageText,
            runtimeState: normalizeTavernSessionState(selectedSession.value?.state || {}),
            diagnostics: diagnostics.value,
            historyMode: historyMode.value,
        });
        if (requestSequence !== simulateRequestSequence || requestSessionId !== selectedSessionId.value) {return;}
        simulateRequestJson.value = result.requestSnapshot.rawRequestJson || result.requestSnapshot.rawMessagesJson || '';
        simulateRequestStatus.value = `模拟完成 · ${result.requestSnapshot.providerLabel || result.provider} / ${result.model || '未选择模型'}`;
    } catch (error) {
        if (requestSequence !== simulateRequestSequence || requestSessionId !== selectedSessionId.value) {return;}
        simulateRequestStatus.value = '';
        simulateRequestError.value = error instanceof Error ? error.message : String(error || 'simulate_failed');
    }
}

function shortText(value = '', limit = 180) {
    const text = String(value || '').trim();
    return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

function statusLabel(status = '') {
    const labels: Record<string, string> = {
        activated: '本次会带上',
        budget_skipped: '超出预算，未带上',
        not_matched: '本次未带上',
        secondary_not_matched: '二级关键词不满足',
        disabled: '已禁用',
        suppressed_by_decorator: '装饰器抑制',
        cooldown: '冷却中',
        delay: '延迟中',
        probability_failed: '概率判定未带上',
    };
    return labels[status] || status || '未知';
}

function managerStatusLabel(status = '') {
    const labels: Record<string, string> = {
        queued: '排队',
        running: '运行中',
        completed: '完成',
        failed: '失败',
    };
    return labels[status] || status || '未知';
}

function formatManagerSource(run: TavernManagerRunRecord) {
    return `第 ${run.turn || 0} 轮 · ${run.userOrder}/${run.assistantOrder}`;
}

function formatSummarySource(summary: TavernTurnSummaryRecord) {
    return `第 ${summary.turn || 0} 轮 · ${summary.userOrder}/${summary.assistantOrder}`;
}

function formatRunModelLine(run: TavernManagerRunRecord) {
    const provider = String(run.provider || '').trim();
    const model = String(run.model || '').trim();
    return [provider, model].filter(Boolean).join(' / ') || '未记录模型';
}

function memoryFileStatusLabel(status = '') {
    return status === 'stale' ? '过期' : '可用';
}

function formatMemoryFileMeta(file: TavernMemoryFileRecord) {
    return `${memoryFileStatusLabel(file.status)} · ${Math.max(0, String(file.content || '').length)} 字`;
}

async function saveSelectedMemoryFile() {
    const file = selectedMemoryFile.value;
    if (!selectedSessionId.value || !file) {return;}
    memoryEditorStatus.value = '保存中';
    try {
        await writeTavernMemoryFile(selectedSessionId.value, file.path, memoryEditorDraft.value, { source: 'user' });
        await refreshManagerRecords(selectedSessionId.value);
        memoryEditorMode.value = 'preview';
        memoryEditorStatus.value = '已保存';
        window.setTimeout(() => {
            if (memoryEditorStatus.value === '已保存') {memoryEditorStatus.value = '';}
        }, 1600);
    } catch (error) {
        memoryEditorStatus.value = error instanceof Error ? error.message : String(error || '保存失败');
    }
}

function enterMemoryEditMode() {
    if (!selectedMemoryFile.value) {return;}
    memoryEditorMode.value = 'edit';
    void nextTick(() => {
        const textarea = document.querySelector<HTMLTextAreaElement>('[data-memory-editor-textarea="true"]');
        textarea?.focus();
    });
}

function previewMemoryDraft() {
    if (!selectedMemoryFile.value) {return;}
    memoryEditorMode.value = 'preview';
}

function formatDebugJson(value: unknown) {
    try {
        return JSON.stringify(value ?? null, null, 2);
    } catch {
        return String(value || '');
    }
}

async function retryManagerRun(run: TavernManagerRunRecord) {
    if (!selectedSessionId.value || managerBusy.value) {return;}
    const messages = await listTavernMessages(selectedSessionId.value);
    const userMessage = messages.find((message) => message.order === run.userOrder && message.role === 'user');
    const assistantMessage = messages.find((message) => message.order === run.assistantOrder && message.role === 'assistant' && !message.error);
    if (!userMessage || !assistantMessage) {
        managerActionStatus.value = '原文楼层不存在，无法重试。';
        await refreshManagerRecords();
        return;
    }
    managerActionStatus.value = '记忆正在重试。';
    try {
        const result = await runXbTavernManagerAfterTurn({
            sessionId: selectedSessionId.value,
            agentConfig: agentConfig.value,
            userMessage,
            assistantMessage,
            turn: run.turn,
            trigger: 'manual_retry',
        });
        managerActionStatus.value = result.ok ? '' : `失败：${result.error || 'manager_retry_failed'}`;
    } catch (error) {
        managerActionStatus.value = error instanceof Error ? error.message : String(error || 'manager_retry_failed');
    } finally {
        await refreshManagerRecords();
    }
}

function candidateReason(entry: { status?: string; activationReason?: string; budgetShortfall?: number; budgetRemainingBefore?: number; matchedKeys?: string[]; matchedSecondaryKeys?: string[] }) {
    if (entry.status === 'activated') {
        const matched = [
            ...(entry.matchedKeys || []),
            ...(entry.matchedSecondaryKeys || []),
        ].filter(Boolean);
        if (matched.length) {return `触发关键词：${matched.join(', ')}`;}
        if (entry.activationReason === 'constant') {return '常驻条目，本次固定带上';}
        if (entry.activationReason === 'decorator') {return '装饰器要求本次带上';}
        if (entry.activationReason === 'sticky') {return '粘滞状态，本次继续带上';}
        return '本次会带上';
    }
    if (entry.status === 'budget_skipped') {
        const shortfall = Number(entry.budgetShortfall) || 0;
        return shortfall > 0 ? `预算不足，差 ${shortfall} 字` : '预算跳过';
    }
    return statusLabel(entry.status || '');
}

function roleLabel(role = '') {
    const labels: Record<string, string> = {
        system: '规则',
        user: '你',
        assistant: '角色',
        tool: '工具结果',
    };
    return labels[role] || role || '未知';
}

function formatMessageTime(value: unknown) {
    const timestamp = Number(value) || 0;
    if (!timestamp) {return '';}
    try {
        return new Intl.DateTimeFormat('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(timestamp));
    } catch {
        return '';
    }
}

function markdownSignature(text = '') {
    const raw = String(text || '');
    let hash = 0;
    for (let index = 0; index < raw.length; index += 1) {
        hash = ((hash * 31) + raw.charCodeAt(index)) >>> 0;
    }
    return `${raw.length}:${hash.toString(36)}`;
}

function renderChatMarkdown(text = '') {
    // renderMarkdownToHtml sanitizes through DOMPurify when SillyTavern exposes it,
    // matching the ebook/assistant Markdown pipeline before Vue inserts the HTML.
    const raw = String(text || '');
    const canCache = !/(^|\n)(`{3,}|~{3,})[ \t]*(html|htm|xhtml|xml|svg|vue|svelte)?\b/i.test(raw)
        && !/^<!doctype\s+html/i.test(raw.trim())
        && !/^<html[\s>]/i.test(raw.trim());
    const cacheKey = markdownSignature(raw);
    if (canCache && markdownHtmlCache.has(cacheKey)) {
        return markdownHtmlCache.get(cacheKey) || '';
    }
    const html = renderMarkdownToHtml(raw);
    if (canCache) {
        markdownHtmlCache.set(cacheKey, html);
        if (markdownHtmlCache.size > 160) {
            const firstKey = markdownHtmlCache.keys().next().value;
            if (firstKey) {markdownHtmlCache.delete(firstKey);}
        }
    }
    return html;
}

function enhanceChatMarkdown() {
    const root = chatScrollRef.value;
    if (!root?.querySelectorAll) {return;}
    root.querySelectorAll<HTMLElement>('.xb-tavern-markdown').forEach((node) => {
        const signature = node.dataset.markdownSignature || '';
        enhanceMarkdownContent(node, {
            codeBlockClassName: 'xb-tavern-codeblock',
            codeCopyClassName: 'xb-tavern-code-copy',
        });
        node.dataset.markdownEnhanced = signature;
    });
}

function messageKey(message: TavernMessageRecord) {
    return `${message.sessionId}:${message.order}`;
}

function canEditMessage(message: TavernMessageRecord) {
    return !isRunning.value && !message.error && ['user', 'assistant'].includes(message.role);
}

function isEditingMessage(message: TavernMessageRecord) {
    return editingMessageKey.value === messageKey(message);
}

function flashMessageAction(message: TavernMessageRecord, action: string, ok: boolean) {
    const key = `${messageKey(message)}:${action}`;
    messageActionFeedback.value = {
        ...messageActionFeedback.value,
        [key]: ok ? 'success' : 'error',
    };
    window.setTimeout(() => {
        const next = { ...messageActionFeedback.value };
        delete next[key];
        messageActionFeedback.value = next;
    }, 1100);
}

function actionFeedback(message: TavernMessageRecord, action: string) {
    return messageActionFeedback.value[`${messageKey(message)}:${action}`] || '';
}

async function copyTextWithFallback(text = '') {
    const normalized = String(text || '');
    if (!normalized) {return false;}
    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(normalized);
            return true;
        }
    } catch {
        // Fall through to the legacy path.
    }
    try {
        const textarea = document.createElement('textarea');
        textarea.value = normalized;
        textarea.setAttribute('readonly', 'readonly');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.style.pointerEvents = 'none';
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        const copied = document.execCommand('copy');
        textarea.remove();
        return copied;
    } catch {
        return false;
    }
}

async function copyMessage(message: TavernMessageRecord) {
    const ok = await copyTextWithFallback(message.content || '');
    flashMessageAction(message, 'copy', ok);
}

function startEditMessage(message: TavernMessageRecord) {
    if (!canEditMessage(message)) {return;}
    editingMessageKey.value = messageKey(message);
    editingMessageDraft.value = message.content || '';
    void nextTick(() => {
        const textarea = chatScrollRef.value?.querySelector<HTMLTextAreaElement>(`[data-message-editor="${messageKey(message)}"]`);
        if (!textarea) {return;}
        autoSizeTextarea(textarea);
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    });
}

function cancelEditMessage() {
    editingMessageKey.value = '';
    editingMessageDraft.value = '';
}

function autoSizeTextarea(textarea: HTMLTextAreaElement | null) {
    if (!textarea) {return;}
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(Math.max(textarea.scrollHeight, 144), 420)}px`;
}

function handleEditKeydown(event: KeyboardEvent, message: TavernMessageRecord) {
    if (event.key === 'Escape') {
        event.preventDefault();
        cancelEditMessage();
        return;
    }
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        void saveEditMessage(message);
    }
}

function handleEditInput(event: Event) {
    autoSizeTextarea(event.target as HTMLTextAreaElement);
}

function handleComposeInput(event: Event) {
    autoSizeTextarea(event.target as HTMLTextAreaElement);
}

async function saveEditMessage(message: TavernMessageRecord, options: { rerun?: boolean } = {}) {
    if (!canEditMessage(message)) {return;}
    const content = editingMessageDraft.value.trim();
    if (!content) {
        flashMessageAction(message, 'edit', false);
        return;
    }
    const updated = await updateTavernMessage(message.sessionId, message.order, { content });
    if (updated) {
        await markTavernMemoryStaleFromOrder(message.sessionId, message.order);
    }
    if (updated && selectedSessionId.value) {
        sessionMessages.value = await listTavernMessages(selectedSessionId.value);
        await refreshManagerRecords(selectedSessionId.value);
    }
    cancelEditMessage();
    flashMessageAction(updated || message, 'edit', !!updated);
    if (updated && options.rerun) {
        await rerunFromMessage(updated);
    } else if (updated) {
        await rebuildSelectedSessionRuntimeState();
    }
}

function findDeleteOrders(message: TavernMessageRecord) {
    if (message.role !== 'user') {return [message.order];}
    const sorted = [...sessionMessages.value].sort((left, right) => left.order - right.order);
    const startIndex = sorted.findIndex((item) => item.order === message.order);
    if (startIndex < 0) {return [message.order];}
    const orders: number[] = [];
    for (let index = startIndex; index < sorted.length; index += 1) {
        const item = sorted[index];
        if (index > startIndex && item.role === 'user') {break;}
        orders.push(item.order);
    }
    return orders;
}

async function deleteMessageTurn(message: TavernMessageRecord) {
    if (isRunning.value) {return;}
    const deleted = await deleteTavernMessages(message.sessionId, findDeleteOrders(message));
    if (deleted > 0) {
        await markTavernMemoryStaleFromOrder(message.sessionId, message.order);
    }
    if (selectedSessionId.value) {
        sessionMessages.value = await listTavernMessages(selectedSessionId.value);
        await refreshManagerRecords(selectedSessionId.value);
    }
    if (deleted > 0) {
        await rebuildSelectedSessionRuntimeState();
    }
    if (editingMessageKey.value.startsWith(`${message.sessionId}:`)) {
        cancelEditMessage();
    }
    flashMessageAction(message, 'delete', deleted > 0);
}

async function rerunFromMessage(message: TavernMessageRecord) {
    if (isRunning.value) {return;}
    const sorted = [...sessionMessages.value].sort((left, right) => left.order - right.order);
    const index = sorted.findIndex((item) => item.order === message.order);
    const userMessage = message.role === 'user'
        ? message
        : [...sorted.slice(0, Math.max(0, index + 1))].reverse().find((item) => item.role === 'user');
    if (!userMessage) {
        flashMessageAction(message, 'rerun', false);
        return;
    }
    const ordersToDelete = sorted
        .filter((item) => item.order > userMessage.order)
        .map((item) => item.order);
    await deleteTavernMessages(userMessage.sessionId, ordersToDelete);
    await markTavernMemoryStaleFromOrder(userMessage.sessionId, userMessage.order);
    if (selectedSessionId.value) {
        sessionMessages.value = await listTavernMessages(selectedSessionId.value);
        await refreshManagerRecords(selectedSessionId.value);
    }
    flashMessageAction(message, 'rerun', true);
    await runOnce({
        messageText: userMessage.content,
        reuseUserMessageOrder: userMessage.order,
    });
}

function insertionTargetLabel(target = '') {
    const text = String(target || '');
    const exact: Record<string, string> = {
        'before character card': '角色卡前',
        'after character card': '角色卡后',
        'author note top': '作者备注前段',
        'author note bottom': '作者备注后段',
        'example messages top': '示例对话前段',
        'example messages bottom': '示例对话后段',
    };
    if (exact[text]) {return exact[text];}
    if (text.startsWith('history depth ')) {
        return `插入历史第 ${text.replace('history depth ', '')} 层`;
    }
    if (text.startsWith('outlet:')) {
        return `自定义出口：${text.replace('outlet:', '')}`;
    }
    return text || '未指定位置';
}

function updateChatScrollButtons() {
    const node = chatScrollRef.value;
    if (!node) {
        showChatScrollTop.value = false;
        showChatScrollBottom.value = false;
        return;
    }
    const threshold = 80;
    showChatScrollTop.value = node.scrollTop > threshold;
    showChatScrollBottom.value = node.scrollHeight - node.scrollTop - node.clientHeight > threshold;
}

function scheduleHideChatScrollHelpers() {
    chatScrollControlsActive.value = true;
    if (chatScrollHideTimer) {
        window.clearTimeout(chatScrollHideTimer);
    }
    chatScrollHideTimer = window.setTimeout(() => {
        chatScrollControlsActive.value = false;
        chatScrollHideTimer = null;
    }, 1500);
}

function isChatNearBottom() {
    const node = chatScrollRef.value;
    if (!node) {return true;}
    return node.scrollHeight - node.scrollTop - node.clientHeight <= 56;
}

function scrollChatToBottom(force = false) {
    if (!force && !chatAutoScroll.value) {return;}
    if (force) {chatAutoScroll.value = true;}
    void nextTick(() => {
        const node = chatScrollRef.value;
        if (!node) {return;}
        node.scrollTop = node.scrollHeight;
        requestAnimationFrame(() => {
            node.scrollTop = node.scrollHeight;
            updateChatScrollButtons();
            scheduleHideChatScrollHelpers();
        });
    });
}

function scrollChatToTop() {
    const node = chatScrollRef.value;
    if (!node) {return;}
    chatAutoScroll.value = false;
    chatLastScrollTop = 0;
    node.scrollTop = 0;
    updateChatScrollButtons();
    scheduleHideChatScrollHelpers();
}

function handleChatScroll() {
    const node = chatScrollRef.value;
    if (!node) {return;}
    const currentScrollTop = Number(node.scrollTop || 0);
    const scrollingTowardBottom = currentScrollTop > chatLastScrollTop;
    chatLastScrollTop = currentScrollTop;
    const nearBottom = isChatNearBottom();
    if (nearBottom) {
        if (chatAutoScroll.value !== false || scrollingTowardBottom) {
            chatAutoScroll.value = true;
        }
    } else {
        chatAutoScroll.value = false;
    }
    if (chatScrollTicking) {return;}
    chatScrollTicking = true;
    requestAnimationFrame(() => {
        updateChatScrollButtons();
        scheduleHideChatScrollHelpers();
        chatScrollTicking = false;
    });
}

function handleChatWheel(event: WheelEvent) {
    if (Number(event.deltaY || 0) < 0) {
        chatAutoScroll.value = false;
    }
}

function handleChatTouchStart(event: TouchEvent) {
    chatTouchStartY = Number(event.touches?.[0]?.clientY);
}

function handleChatTouchMove(event: TouchEvent) {
    const currentY = Number(event.touches?.[0]?.clientY);
    if (!Number.isFinite(Number(chatTouchStartY)) || !Number.isFinite(currentY)) {
        chatAutoScroll.value = false;
        return;
    }
    if (chatTouchStartY !== null && currentY > chatTouchStartY + 4) {
        chatAutoScroll.value = false;
    }
}

function handleComposeKeydown(event: KeyboardEvent) {
    if (event.key !== 'Enter') {return;}
    if (event.isComposing || event.shiftKey || event.altKey) {return;}
    const shouldSend = event.ctrlKey || event.metaKey || window.innerWidth >= 760;
    if (!shouldSend) {return;}
    event.preventDefault();
    void runOnce();
}

function handleManagerComposeKeydown(event: KeyboardEvent) {
    if (event.key !== 'Enter') {return;}
    if (event.isComposing || event.shiftKey || event.altKey) {return;}
    const shouldSend = event.ctrlKey || event.metaKey || window.innerWidth >= 760;
    if (!shouldSend) {return;}
    event.preventDefault();
    handleManagerSubmit();
}

function updateManagerLocalMessage(id: string, content: string) {
    managerLocalMessages.value = managerLocalMessages.value.map((message) => (
        message.id === id ? { ...message, content } : message
    ));
}

function buildManagerAssistantContext() {
    const selectedFile = selectedMemoryFile.value;
    const fileList = memoryFiles.value
        .map((file) => `- ${memoryFileDisplayName(file)}：${memoryFileKindLabel(file)}，${memoryFileStatusLabel(file.status)}，${String(file.content || '').length} 字`)
        .join('\n') || '无';
    const runList = managerRuns.value.slice(0, 5)
        .map((run) => `- 第 ${run.turn || 0} 轮 ${managerStatusLabel(run.status)}：${run.inputSummary || run.outputText || run.error || ''}`)
        .join('\n') || '无';
    const summaryList = recentTurnSummaries.value.slice(0, 6)
        .map((summary) => `- ${formatSummarySource(summary)}：${summary.summary || ''}`)
        .join('\n') || '无';
    return [
        `当前角色：${displayCharacterName.value}`,
        `当前会话：${chatSubtitle.value}`,
        '',
        '[记忆文件列表]',
        fileList,
        '',
        '[当前打开的记忆文件]',
        selectedFile ? `${memoryFileDisplayName(selectedFile)}\n\n${String(selectedFile.content || '')}` : '无',
        '',
        '[最近后台工作]',
        runList,
        '',
        '[最近小结]',
        summaryList,
    ].join('\n');
}

async function handleManagerSubmit() {
    if (isManagerAssistantRunning.value) {
        managerAssistantController.value?.abort();
        return;
    }
    const text = managerInputDraft.value.trim();
    if (!text) {return;}
    const now = Date.now();
    const assistantId = `manager-assistant-${now}`;
    managerLocalMessages.value = [
        ...managerLocalMessages.value,
        {
            id: `manager-user-${now}`,
            role: 'user',
            content: text,
            createdAt: now,
        },
        {
            id: assistantId,
            role: 'assistant',
            content: '...',
            createdAt: now + 1,
        },
    ];
    managerInputDraft.value = '';
    managerInputStatus.value = '运行中';
    const controller = new AbortController();
    managerAssistantController.value = controller;
    isManagerAssistantRunning.value = true;
    try {
        const providerConfig = resolveActiveProviderConfig(agentConfig.value || {}, {
            role: 'delegate',
            timeoutMs: 15 * 60 * 1000,
        });
        const adapter = createAgentAdapter(providerConfig, {
            missingApiKeyMessage: '请先在 API 配置里填写分身 API。',
        });
        let streamedText = '';
        const result = await adapter.chat({
            systemPrompt: [
                '你是小白酒馆的助手聊天，不扮演角色，不替角色 RP。',
                '你帮助用户理解当前会话、记忆档案和后台工作记录。',
                '你不能直接修改记忆文件；需要修改时，引导用户在右侧编辑器修改并保存。',
                '回答要短，直接说结论。',
            ].join('\n'),
            messages: [
                {
                    role: 'user',
                    content: `${buildManagerAssistantContext()}\n\n[用户问题]\n${text}`,
                },
            ],
            tools: [],
            toolChoice: 'none',
            temperature: providerConfig.temperature,
            maxTokens: providerConfig.maxTokens,
            signal: controller.signal,
            onStreamProgress: (snapshot: { text?: string }) => {
                if (typeof snapshot.text === 'string') {
                    streamedText = snapshot.text;
                    updateManagerLocalMessage(assistantId, streamedText || '...');
                }
            },
        });
        const finalText = String(result?.text || streamedText || '').trim();
        updateManagerLocalMessage(assistantId, finalText || '没有返回内容。');
        managerInputStatus.value = '';
    } catch (error) {
        if (controller.signal.aborted) {
            updateManagerLocalMessage(assistantId, '已停止。');
            managerInputStatus.value = '';
        } else {
            updateManagerLocalMessage(assistantId, error instanceof Error ? error.message : String(error || 'assistant_failed'));
            managerInputStatus.value = '失败';
        }
    } finally {
        if (managerAssistantController.value === controller) {
            managerAssistantController.value = null;
        }
        isManagerAssistantRunning.value = false;
    }
}

function cancelActiveRun() {
    activeRunController.value?.abort();
}

function handleChatSubmit() {
    void runOnce();
}

async function warmupMemoryTokenizer() {
    memoryTokenizerStatus.value = getXbTavernMemoryTokenizerStatus();
    const ok = await preloadXbTavernMemoryTokenizer();
    memoryTokenizerStatus.value = getXbTavernMemoryTokenizerStatus();
    if (!ok) {
        managerActionStatus.value = `记忆检索准备失败：${memoryTokenizerStatus.value.error || 'memory_tokenizer_failed'}`;
    }
}

async function runOnce(options: { messageText?: string; reuseUserMessageOrder?: number } = {}) {
    if (isRunning.value) {
        cancelActiveRun();
        return;
    }
    const messageText = String(options.messageText ?? currentUserMessage.value ?? '').trim();
    if (!messageText) {
        runtimeError.value = '先写一句话。';
        return;
    }
    if (!selectedSessionId.value) {
        await createSessionFromContext();
    }
    const controller = new AbortController();
    activeRunController.value = controller;
    runtimeError.value = '';
    runtimeText.value = '';
    runtimeProvider.value = '';
    runtimeModel.value = '';
    runtimeSnapshotJson.value = JSON.stringify({
        status: 'running',
    }, null, 2);
    isRunning.value = true;
    chatAutoScroll.value = true;
    try {
        const result = await runXbTavernTurn({
            sessionId: selectedSessionId.value,
            agentConfig: agentConfig.value,
            contextSnapshot: context.value,
            chatPreset: activeChatPreset.value,
            assistantPreset: activeAssistantPreset.value,
            currentUserMessage: messageText,
            runtimeState: normalizeTavernSessionState(selectedSession.value?.state || {}),
            diagnostics: diagnostics.value,
            historyMode: historyMode.value,
            signal: controller.signal,
            reuseUserMessageOrder: options.reuseUserMessageOrder,
            runManager: true,
            onStreamProgress: (snapshot) => {
                if (typeof snapshot.text === 'string') {runtimeText.value = snapshot.text;}
            },
            onUserMessageSaved: async (sessionId, message) => {
                selectedSessionId.value = sessionId;
                await setSelectedTavernSessionId(sessionId);
                const exists = sessionMessages.value.some((item) => item.sessionId === message.sessionId && item.order === message.order);
                sessionMessages.value = exists ? sessionMessages.value : [...sessionMessages.value, message].sort((left, right) => left.order - right.order);
                currentUserMessage.value = '';
                await refreshSessions();
                scrollChatToBottom(true);
            },
            onAssistantMessageSaved: async (sessionId, message) => {
                selectedSessionId.value = sessionId;
                const exists = sessionMessages.value.some((item) => item.sessionId === message.sessionId && item.order === message.order);
                sessionMessages.value = exists ? sessionMessages.value : [...sessionMessages.value, message].sort((left, right) => left.order - right.order);
                await refreshSessions();
                scrollChatToBottom(true);
            },
            onManagerRunSaved: async (sessionId) => {
                await refreshManagerRecords(sessionId);
            },
        });
        selectedSessionId.value = result.sessionId;
        runtimeText.value = '';
        runtimeError.value = result.error || '';
        runtimeProvider.value = result.provider || '';
        runtimeModel.value = result.model || '';
        runtimeSnapshotJson.value = JSON.stringify({
            provider: result.provider || '',
            model: result.model || '',
            previewMatchesRequest: result.previewMatchesRequest,
            nextTurn: result.nextTurn,
            buildSnapshot: result.buildSnapshot,
            requestSnapshot: result.requestSnapshot,
            error: result.error || '',
        }, null, 2);
        await refreshSessions();
        await refreshManagerRecords(result.sessionId);
        scrollChatToBottom(true);
    } catch (error) {
        runtimeError.value = error instanceof Error ? error.message : String(error || 'run_failed');
    } finally {
        if (activeRunController.value === controller) {
            activeRunController.value = null;
        }
        isRunning.value = false;
        scrollChatToBottom(true);
    }
}

watch([
    () => chatMessages.value.length,
    () => chatMarkdownSignature.value,
    () => runtimeText.value,
    () => activeView.value,
], () => {
    if (activeView.value === 'chat') {
        scrollChatToBottom();
        void nextTick(() => {
            enhanceChatMarkdown();
            updateChatScrollButtons();
        });
    }
});

watch([
    () => activeSettingsWorkspace.value,
    () => activeView.value,
    () => apiConfigSave.value.status,
    () => agentConfig.value,
], () => {
    if (activeView.value === 'settings' && activeSettingsWorkspace.value === 'api') {
        void nextTick(renderApiSettingsPanel);
    }
});

watch(selectedMemoryFile, (file) => {
    memoryEditorDraft.value = String(file?.content || '');
    memoryEditorMode.value = 'preview';
    memoryEditorStatus.value = '';
}, { immediate: true });

onMounted(async () => {
    // onHostMessage validates origin and message source before accepting payloads.
    // eslint-disable-next-line no-restricted-syntax
    window.addEventListener('message', onHostMessage);
    if (activeView.value === 'settings' && activeSettingsWorkspace.value === 'api') {
        void nextTick(renderApiSettingsPanel);
    }
    void warmupMemoryTokenizer();
    await refreshPresets();
    await refreshSessions();
    syncApiSettingsConfigFromAgentConfig();
    if (activeView.value === 'settings' && activeSettingsWorkspace.value === 'api') {
        await nextTick(renderApiSettingsPanel);
    }
    postToHost('xb-tavern:frame-ready');
});

onUnmounted(() => {
    window.removeEventListener('message', onHostMessage);
    setHostChatCompletionsRequestHeadersProvider(null);
    pendingHostRequests.forEach((request) => {
        window.clearTimeout(request.timer);
        request.reject(new Error('tavern_unmounted'));
    });
    pendingHostRequests.clear();
    activeRunController.value?.abort();
    managerAssistantController.value?.abort();
    if (chatScrollHideTimer) {
        window.clearTimeout(chatScrollHideTimer);
        chatScrollHideTimer = null;
    }
    clearPendingCharacterSession();
});
</script>

<template>
  <main class="xb-tavern xb-os-shell">
    <aside class="xb-os-rail">
      <button
        class="rail-brand"
        type="button"
        title="首页"
        @click="activeView = 'home'"
      >
        <span>XB</span>
        <strong>小白酒馆</strong>
      </button>
      <nav
        class="rail-nav"
        aria-label="页面"
      >
        <button
          type="button"
          :class="{ active: activeView === 'home' || activeView === 'characters' }"
          @click="activeView = 'home'"
        >
          <span>01</span>
          首页
        </button>
        <button
          type="button"
          :class="{ active: activeView === 'chat' }"
          @click="openChatView"
        >
          <span>02</span>
          聊天
        </button>
        <button
          type="button"
          :class="{ active: activeView === 'settings' }"
          @click="activeView = 'settings'"
        >
          <span>03</span>
          设置
        </button>
      </nav>
      <span
        class="mobile-settings-label"
        aria-hidden="true"
      >设置</span>
      <div class="rail-status">
        <span>{{ apiReady ? 'READY' : 'SETUP' }}</span>
        <strong>{{ displayCharacterName }}</strong>
        <small v-if="selectedSessionId">{{ chatSubtitle }}</small>
      </div>
      <button
        class="rail-close"
        type="button"
        title="关闭"
        aria-label="关闭"
        @click="postToHost('xb-tavern:close')"
      >
        ×
      </button>
    </aside>

    <section class="xb-os-stage">
      <section
        v-if="activeView === 'home'"
        class="tavern-home xb-page home-command-center"
      >
        <div class="home-hero home-command-hero">
          <div class="home-brand-panel">
            <div class="home-brand-mark">
              XB
            </div>
            <p class="eyebrow">
              角色共演
            </p>
            <h2>{{ hasCharacter ? displayCharacterName : '选择角色' }}</h2>
            <p>
              {{ selectedSessionId ? chatSubtitle : '选择角色，开一段新的对话。' }}
            </p>
            <div class="home-metric-strip">
              <span>
                <strong>{{ sessions.length }}</strong>
                会话
              </span>
              <span>
                <strong>{{ worldBookCount }}</strong>
                世界书
              </span>
              <span>
                <strong>{{ apiReady ? 'OK' : 'SET' }}</strong>
                API
              </span>
            </div>
          </div>
          <div class="home-command-panel">
            <button
              type="button"
              class="home-action-main"
              @click="handleHomePrimaryAction"
            >
              <strong>{{ selectedSessionId ? '继续聊天' : '选择角色' }}</strong>
              <span>{{ selectedSessionId ? selectedSessionTitle : `${characterCards.length} 张角色卡可选` }}</span>
            </button>
            <button
              type="button"
              class="home-action-main"
              @click="handleHomeNewSession"
            >
              <strong>{{ selectedSessionId ? '选择角色' : '刷新角色' }}</strong>
              <span>{{ selectedSessionId ? '开新的独立会话' : '查看角色卡' }}</span>
            </button>
          </div>
        </div>

        <section class="session-board home-session-board">
          <div class="panel-head">
            <div>
              <h2>会话管理</h2>
            </div>
          </div>
          <div class="home-session-list">
            <div
              v-for="session in sessions"
              :key="session.id"
              class="session-card"
              :class="{ active: session.id === selectedSessionId }"
            >
              <button
                type="button"
                class="session-open"
                @click="selectSession(session.id)"
              >
                <strong>{{ sessionDisplayTitle(session) || '未选择角色' }}</strong>
                <small>第 {{ normalizeTavernSessionState(session.state || {}).turn || 0 }} 轮</small>
              </button>
              <button
                type="button"
                class="session-delete"
                @click="removeSession(session.id, $event)"
              >
                删除
              </button>
            </div>
            <p
              v-if="!sessions.length"
              class="muted"
            >
              还没有会话。
            </p>
          </div>
        </section>
      </section>

      <section
        v-if="activeView === 'characters'"
        class="xb-page character-select-page"
      >
        <header class="character-select-head">
          <button
            type="button"
            class="ghost-link"
            @click="activeView = 'home'"
          >
            返回首页
          </button>
          <div>
            <p class="eyebrow">
              角色
            </p>
            <h2>选择角色卡</h2>
            <p>选中一张角色卡后，会用它的角色资料和世界书创建新的独立会话。</p>
          </div>
          <button
            type="button"
            @click="refreshCharacterList"
          >
            刷新列表
          </button>
        </header>

        <div
          v-if="pendingCharacterError"
          class="character-select-error"
        >
          {{ pendingCharacterError }}
        </div>

        <section
          v-if="characterCards.length"
          class="character-card-grid"
        >
          <button
            v-for="character in characterCards"
            :key="character.id"
            type="button"
            class="character-card-option"
            :class="{
              current: character.id === liveCharacterId,
              pending: character.id === pendingCharacterSessionId,
            }"
            :disabled="!!pendingCharacterSessionId"
            @click="selectCharacterAndCreateSession(character.id)"
          >
            <span class="character-card-avatar">
              <img
                v-if="character.avatar"
                :src="character.avatar"
                alt=""
              >
              <span v-else>{{ character.name.slice(0, 1) }}</span>
            </span>
            <span class="character-card-body">
              <span class="character-card-title">
                <strong>{{ character.name }}</strong>
                <small v-if="character.id === liveCharacterId">当前</small>
                <small v-if="character.id === pendingCharacterSessionId">读取中</small>
              </span>
              <span class="character-card-desc">
                {{ shortText(character.description || character.personality || character.scenario || character.firstMessage || '没有卡面摘要。', 150) }}
              </span>
            </span>
          </button>
        </section>

        <section
          v-else
          class="character-empty"
        >
          <h2>没有读到角色卡</h2>
          <p>请先在酒馆里加载角色，再刷新列表。</p>
          <button
            type="button"
            @click="refreshCharacterList"
          >
            刷新列表
          </button>
        </section>
      </section>

      <section
        v-if="activeView === 'chat'"
        class="tavern-chat xb-page"
        :class="[`chat-focus-${chatFocus}`, `chat-layout-${chatLayout}`]"
      >
        <aside class="chat-side xb-sidebar">
          <section class="chat-profile xb-brand">
            <div class="avatar-orb">
              <img
                v-if="characterAvatar"
                :src="characterAvatar"
                alt=""
              >
              <span v-else>{{ displayCharacterName.slice(0, 1) }}</span>
            </div>
            <div>
              <h2>{{ displayCharacterName }}</h2>
              <p>{{ chatSubtitle }}</p>
            </div>
            <div
              class="xb-workspace-controller chat-layout-controller"
              aria-label="区域大小"
            >
              <button
                type="button"
                class="xb-layout-button"
                :class="{ 'is-active': chatLayout === 'chat' }"
                @click="chatLayout = 'chat'"
              >
                聊天
              </button>
              <button
                type="button"
                class="xb-layout-button"
                :class="{ 'is-active': chatLayout === 'balanced' }"
                @click="chatLayout = 'balanced'"
              >
                平衡
              </button>
              <button
                type="button"
                class="xb-layout-button"
                :class="{ 'is-active': chatLayout === 'editor' }"
                @click="chatLayout = 'editor'"
              >
                编辑
              </button>
            </div>
          </section>

          <section class="chat-side-block chat-directory-block">
            <div class="side-block-head">
              <strong>会话目录</strong>
            </div>
            <div class="session-list chat-directory-list xb-files">
              <div
                v-for="session in chatSidebarSessions"
                :key="session.id"
                class="session-card compact"
                :class="{ active: session.id === selectedSessionId }"
              >
                <button
                  type="button"
                  class="session-open"
                  @click="selectSession(session.id)"
                >
                  <strong>{{ sessionDisplayTitle(session) || '未选择角色' }}</strong>
                  <small>第 {{ normalizeTavernSessionState(session.state || {}).turn || 0 }} 轮</small>
                </button>
              </div>
              <button
                v-if="sessions.length > chatSidebarSessions.length"
                type="button"
                class="session-more"
                @click="activeView = 'home'"
              >
                查看全部会话
              </button>
              <p
                v-if="!chatSidebarSessions.length"
                class="muted compact"
              >
                当前角色还没有其他会话。
              </p>
            </div>
          </section>

          <section class="chat-side-block chat-directory-block">
            <div class="side-block-head">
              <strong>记忆目录</strong>
              <span>{{ activeMemoryFiles.length }}</span>
            </div>
            <div
              v-if="memoryFiles.length"
              class="memory-directory-list xb-files"
            >
              <div
                v-for="group in memoryDirectoryGroups"
                :key="group.key"
                class="memory-file-group"
              >
                <div class="memory-file-group-title">
                  <span>{{ group.title }}</span>
                  <em>{{ group.files.length }}</em>
                </div>
                <div class="memory-file-tree">
                  <button
                    v-for="file in group.files"
                    :key="file.path"
                    type="button"
                    class="memory-file"
                    :class="{ active: selectedMemoryFile?.path === file.path, stale: file.status === 'stale' }"
                    @click="selectedMemoryFilePath = file.path"
                  >
                    <span class="memory-file-main">{{ memoryFileDisplayName(file) }}</span>
                    <small>{{ memoryFileKindLabel(file) }} · {{ memoryFileStatusLabel(file.status) }}</small>
                  </button>
                </div>
              </div>
            </div>
            <p
              v-else
              class="muted compact"
            >
              还没有记忆档案。
            </p>
          </section>
        </aside>

        <section
          class="chat-workbench"
          :class="{ 'is-manager': chatFocus === 'manager' }"
        >
          <div class="chat-flip-card">
            <section
              class="chat-face chat-face-front chat-main"
              :aria-hidden="chatFocus === 'manager'"
            >
              <header class="chat-head">
                <div>
                  <h2>角色聊天</h2>
                  <p>{{ chatSubtitle }}</p>
                </div>
                <div class="chat-head-actions">
                  <button
                    type="button"
                    class="prompt-inspector-trigger"
                    @click="openPromptInspector('history')"
                  >
                    提示词
                  </button>
                  <button
                    type="button"
                    class="chat-flip-trigger"
                    @click="chatFocus = 'manager'"
                  >
                    助手聊天
                  </button>
                </div>
              </header>
              <div
                ref="chatScrollRef"
                class="chat-scroll"
                @scroll="handleChatScroll"
                @wheel.passive="handleChatWheel"
                @touchstart.passive="handleChatTouchStart"
                @touchmove.passive="handleChatTouchMove"
              >
                <div
                  v-for="message in chatMessages"
                  :key="`${message.sessionId}-${message.order}`"
                  class="chat-bubble"
                  :class="[
                    message.role === 'user' ? 'from-user' : 'from-assistant',
                    { 'is-error': message.error },
                  ]"
                >
                  <div class="bubble-meta">
                    <span>{{ message.error ? '错误' : roleLabel(message.role) }}</span>
                    <small>{{ formatMessageTime(message.createdAt) }}</small>
                  </div>
                  <div
                    v-if="isEditingMessage(message)"
                    class="message-edit-panel"
                  >
                    <textarea
                      v-model="editingMessageDraft"
                      class="message-edit-box"
                      rows="6"
                      :data-message-editor="messageKey(message)"
                      @input="handleEditInput"
                      @keydown="handleEditKeydown($event, message)"
                    />
                    <div class="message-edit-actions">
                      <button
                        type="button"
                        @click="saveEditMessage(message)"
                      >
                        保存
                      </button>
                      <button
                        type="button"
                        @click="saveEditMessage(message, { rerun: true })"
                      >
                        保存并重跑
                      </button>
                      <button
                        type="button"
                        @click="cancelEditMessage"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                  <div
                    v-else
                    class="xb-tavern-markdown"
                    :data-markdown-signature="markdownSignature(message.content)"
                    v-html="renderChatMarkdown(message.content)"
                  />
                  <div
                    v-if="!isEditingMessage(message)"
                    class="message-actions"
                  >
                    <button
                      type="button"
                      :class="actionFeedback(message, 'copy')"
                      title="复制"
                      aria-label="复制"
                      @click="copyMessage(message)"
                    >
                      ⧉
                    </button>
                    <button
                      type="button"
                      :disabled="!canEditMessage(message)"
                      :class="actionFeedback(message, 'edit')"
                      title="编辑"
                      aria-label="编辑"
                      @click="startEditMessage(message)"
                    >
                      ✎
                    </button>
                    <button
                      type="button"
                      :disabled="isRunning"
                      :class="actionFeedback(message, 'rerun')"
                      title="重新生成"
                      aria-label="重新生成"
                      @click="rerunFromMessage(message)"
                    >
                      ↻
                    </button>
                    <button
                      type="button"
                      :disabled="isRunning"
                      :class="actionFeedback(message, 'delete')"
                      title="删除"
                      aria-label="删除"
                      @click="deleteMessageTurn(message)"
                    >
                      ⌫
                    </button>
                  </div>
                </div>
                <div
                  v-if="isRunning && runtimeText"
                  class="chat-bubble from-assistant streaming"
                >
                  <div class="bubble-meta">
                    <span>角色</span>
                    <small>生成中</small>
                  </div>
                  <div
                    class="xb-tavern-markdown"
                    :data-markdown-signature="markdownSignature(runtimeText)"
                    v-html="renderChatMarkdown(runtimeText)"
                  />
                </div>
                <div
                  v-if="isRunning && !runtimeText"
                  class="chat-bubble from-assistant streaming thinking"
                >
                  <div class="bubble-meta">
                    <span>角色</span>
                    <small>生成中</small>
                  </div>
                  <p>正在组织回复...</p>
                </div>
                <p
                  v-if="!chatMessages.length && !isRunning"
                  class="chat-empty"
                >
                  写一句话，开始。
                </p>
                <div
                  class="chat-scroll-helpers"
                  :class="{ active: chatScrollControlsActive }"
                >
                  <button
                    type="button"
                    :class="{ visible: showChatScrollTop }"
                    title="回到顶部"
                    aria-label="回到顶部"
                    @click="scrollChatToTop"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    :class="{ visible: showChatScrollBottom }"
                    title="回到底部"
                    aria-label="回到底部"
                    @click="scrollChatToBottom(true)"
                  >
                    ▼
                  </button>
                </div>
              </div>
              <form
                class="chat-compose"
                @submit.prevent="handleChatSubmit"
              >
                <div
                  v-if="latestErrorMessage"
                  class="compose-error"
                >
                  {{ latestErrorMessage }}
                </div>
                <textarea
                  v-model="currentUserMessage"
                  rows="3"
                  placeholder="对角色说一句话..."
                  :disabled="isRunning"
                  @input="handleComposeInput"
                  @keydown="handleComposeKeydown"
                />
                <button
                  type="submit"
                  class="primary-action"
                  :disabled="!canSendMessage"
                >
                  {{ isRunning ? '停止' : '发送' }}
                </button>
              </form>
            </section>

            <section
              class="chat-face chat-face-back chat-manager"
              :aria-hidden="chatFocus === 'chat'"
            >
              <header class="manager-head">
                <div>
                  <p class="eyebrow">
                    Assistant
                  </p>
                  <h2>助手聊天</h2>
                  <p>{{ managerStatusLine }}</p>
                </div>
                <div class="manager-head-actions">
                  <button
                    type="button"
                    class="prompt-inspector-trigger"
                    @click="openPromptInspector('history')"
                  >
                    提示词
                  </button>
                  <button
                    type="button"
                    class="chat-flip-trigger"
                    @click="chatFocus = 'chat'"
                  >
                    角色聊天
                  </button>
                </div>
              </header>

              <div class="manager-chat-scroll">
                <article
                  v-for="message in managerLocalMessages"
                  :key="message.id"
                  class="manager-card manager-message"
                  :class="message.role === 'user' ? 'manager-message-user' : 'manager-message-assistant'"
                >
                  <div class="manager-run-title">
                    <strong>{{ message.role === 'user' ? '我' : '助手' }}</strong>
                    <small>{{ formatMessageTime(message.createdAt) }}</small>
                  </div>
                  <div
                    class="xb-tavern-markdown"
                    :data-markdown-signature="markdownSignature(message.content)"
                    v-html="renderChatMarkdown(message.content)"
                  />
                </article>

                <article class="manager-card manager-message manager-message-system">
                  <div class="manager-run-title">
                    <strong>记忆档案</strong>
                    <small>{{ activeMemoryFiles.length }}/{{ memoryFiles.length }}</small>
                  </div>
                  <p>{{ memoryIndexStatusLine }}</p>
                  <p v-if="selectedMemoryFile">
                    当前打开：{{ memoryFileDisplayName(selectedMemoryFile) }}
                  </p>
                </article>

                <article
                  v-for="episode in episodeSummaries.slice(0, 2)"
                  :key="episode.id"
                  class="manager-card manager-message manager-message-episode"
                >
                  <div class="manager-run-title">
                    <strong>{{ episode.title }}</strong>
                    <small>第 {{ episode.startTurn }}-{{ episode.endTurn }} 轮</small>
                  </div>
                  <p>{{ episode.summary || '暂无摘要。' }}</p>
                  <p v-if="episode.unresolved?.length">
                    未解决：{{ episode.unresolved.join('、') }}
                  </p>
                </article>

                <article
                  v-for="run in managerRuns"
                  :key="run.id"
                  class="manager-card manager-message manager-message-run"
                  :class="`is-${run.status}`"
                >
                  <div class="manager-run-title">
                    <strong>{{ managerStatusLabel(run.status) }}</strong>
                    <small>{{ formatManagerSource(run) }}</small>
                  </div>
                  <p>{{ run.inputSummary }}</p>
                  <small>{{ formatRunModelLine(run) }}</small>
                  <p v-if="run.parsedAction">
                    动作：{{ run.parsedAction }}
                  </p>
                  <p v-if="run.changedFiles?.length">
                    文件：{{ run.changedFiles.join('、') }}
                  </p>
                  <details v-if="run.outputText">
                    <summary>工作结论</summary>
                    <pre>{{ run.outputText }}</pre>
                  </details>
                  <details v-if="run.toolTrace">
                    <summary>改动记录</summary>
                    <pre>{{ formatDebugJson(run.toolTrace) }}</pre>
                  </details>
                  <p v-if="run.error">
                    {{ run.error }}
                  </p>
                  <button
                    v-if="run.status === 'failed'"
                    type="button"
                    :disabled="managerBusy"
                    @click="retryManagerRun(run)"
                  >
                    重试
                  </button>
                </article>

                <article
                  v-for="summary in recentTurnSummaries.slice(0, 4)"
                  :key="summary.id"
                  class="manager-card manager-message manager-message-turn"
                >
                  <div class="manager-run-title">
                    <strong>{{ formatSummarySource(summary) }}</strong>
                    <small>{{ summary.tags?.join('、') || '无标签' }}</small>
                  </div>
                  <p>{{ summary.summary }}</p>
                </article>

                <p
                  v-if="!managerLocalMessages.length && !managerRuns.length && !episodeSummaries.length && !turnSummaries.length"
                  class="chat-empty"
                >
                  助手还没有工作记录。
                </p>
              </div>

              <form
                class="manager-compose chat-compose"
                @submit.prevent="handleManagerSubmit"
              >
                <div
                  v-if="managerInputStatus"
                  class="compose-error"
                >
                  {{ managerInputStatus }}
                </div>
                <textarea
                  v-model="managerInputDraft"
                  rows="3"
                  placeholder="和助手说一句话..."
                  :disabled="isManagerAssistantRunning"
                  @input="handleComposeInput"
                  @keydown="handleManagerComposeKeydown"
                />
                <button
                  type="submit"
                  class="primary-action"
                  :disabled="!canSendManagerMessage"
                >
                  {{ isManagerAssistantRunning ? '停止' : '发送' }}
                </button>
              </form>
            </section>
          </div>
        </section>

        <aside class="tavern-memory-editor xb-editor">
          <header class="tavern-editor-head xb-editor-head">
            <div class="xb-path">
              {{ selectedMemoryFileTitle }}
            </div>
            <div class="tavern-editor-actions xb-editor-actions">
              <button
                v-if="memoryEditorMode === 'preview'"
                type="button"
                :disabled="!selectedMemoryFile"
                @click="enterMemoryEditMode"
              >
                编辑
              </button>
              <button
                v-if="memoryEditorMode === 'edit'"
                type="button"
                :disabled="!selectedMemoryFile"
                @click="previewMemoryDraft"
              >
                预览
              </button>
              <button
                v-if="memoryEditorMode === 'edit' || memoryEditorDirty"
                type="button"
                :disabled="!selectedMemoryFile || !memoryEditorDirty"
                @click="saveSelectedMemoryFile"
              >
                保存
              </button>
            </div>
          </header>
          <div class="tavern-editor-body xb-editor-body">
            <div
              v-if="selectedMemoryFile && memoryEditorMode === 'preview'"
              class="tavern-editor-preview xb-tavern-markdown"
              :data-markdown-signature="markdownSignature(memoryEditorDraft)"
              v-html="renderChatMarkdown(memoryEditorDraft)"
            />
            <textarea
              v-else-if="selectedMemoryFile"
              v-model="memoryEditorDraft"
              spellcheck="false"
              data-memory-editor-textarea="true"
            />
            <div
              v-else
              class="tavern-editor-empty"
            >
              选择一份记忆档案。
            </div>
          </div>
          <footer class="tavern-editor-foot xb-editor-foot">
            <span>{{ memoryEditorDirty ? '有未保存修改' : '已同步' }}</span>
            <span v-if="memoryEditorStatus">{{ memoryEditorStatus }}</span>
            <span v-if="selectedMemoryFile">{{ formatMemoryFileMeta(selectedMemoryFile) }}</span>
          </footer>
        </aside>
      </section>


      <section
        v-if="activeView === 'settings'"
        class="xb-layout xb-page settings-layout"
      >
        <aside class="xb-sidebar settings-sidebar">
          <div class="panel guide-card">
            <h2>设置</h2>
            <div class="guide-steps">
              <button
                type="button"
                class="guide-step"
                :class="{ active: activeSettingsWorkspace === 'api' }"
                @click="activeSettingsWorkspace = 'api'"
              >
                <strong>API 配置</strong>
                <span>共享模型</span>
              </button>
              <button
                type="button"
                class="guide-step"
                :class="{ active: activeSettingsWorkspace === 'chatPreset' }"
                @click="activeSettingsWorkspace = 'chatPreset'"
              >
                <strong>聊天预设</strong>
                <span>酒馆提示词</span>
              </button>
              <button
                type="button"
                class="guide-step"
                :class="{ active: activeSettingsWorkspace === 'assistantPreset' }"
                @click="activeSettingsWorkspace = 'assistantPreset'"
              >
                <strong>助手预设</strong>
                <span>后台管理员</span>
              </button>
            </div>
          </div>
        </aside>

        <section class="xb-main">
          <div
            v-show="activeSettingsWorkspace === 'api'"
            class="panel step-panel api-workspace"
          >
            <div class="panel-head">
              <div>
                <h2>API 配置</h2>
                <p class="muted compact">
                  共享模型预设
                </p>
              </div>
              <span
                class="pill"
                :class="{ warning: !apiReady }"
              >
                {{ apiReady ? '可发模' : '需配置' }}
              </span>
            </div>
            <div
              class="what-to-check"
              :class="{ warning: !apiReady }"
            >
              <strong>当前模型：</strong>
              <span>{{ apiReady ? apiRuntimeLine : apiReadyDetail }}</span>
            </div>
            <div
              ref="apiSettingsRootRef"
              class="tavern-api-settings"
            />
          </div>

          <div
            v-show="activeSettingsWorkspace === 'chatPreset'"
            class="panel step-panel preset-workspace"
          >
            <div class="panel-head preset-page-head">
              <div>
                <h2>聊天预设</h2>
                <p class="muted compact">
                  酒馆提示词
                </p>
              </div>
              <div class="panel-pills">
                <span
                  v-if="presetDirty"
                  class="pill warning"
                >未保存</span>
                <span class="pill">{{ presetRows.length }} 条 · {{ presetTotalChars }} 字</span>
              </div>
            </div>
            <div class="preset-command-bar">
              <label>
                <span>名称</span>
                <input
                  :value="preset.name"
                  @input="updateChatPresetPatch({ name: ($event.target as HTMLInputElement).value })"
                >
              </label>
              <div class="preset-actions">
                <button
                  type="button"
                  @click="refreshChatPresetFromHost"
                >
                  刷新
                </button>
                <button
                  type="button"
                  :disabled="!presetDirty"
                  @click="discardPresetChanges"
                >
                  放弃
                </button>
                <button
                  type="button"
                  :disabled="!canEditPromptOrder"
                  @click="saveCurrentPreset"
                >
                  保存
                </button>
              </div>
            </div>
            <div
              v-if="presetStatus"
              class="preset-status-line"
            >
              <span>{{ presetStatus }}</span>
            </div>

            <div class="preset-studio">
              <section class="preset-edit-main">
                <div class="preset-form-grid">
                  <label>
                    <span>酒馆 OpenAI 预设</span>
                    <input
                      :value="preset.promptManager?.name || ''"
                      readonly
                    >
                  </label>
                  <label>
                    <span>顺序</span>
                    <input
                      :value="activePromptOrderLabel"
                      readonly
                    >
                  </label>
                </div>
                <div class="prompt-manager-list">
                  <div
                    v-for="(row, index) in promptEditorRows"
                    :key="row.identifier"
                    class="prompt-manager-row"
                    :class="{ selected: selectedPromptIdentifier === row.identifier, disabled: !row.enabled, marker: row.marker }"
                    @click="selectedPromptIdentifier = row.identifier"
                  >
                    <button
                      type="button"
                      class="prompt-row-index"
                      title="选择"
                      @click.stop="selectedPromptIdentifier = row.identifier"
                    >
                      {{ index + 1 }}
                    </button>
                    <div class="prompt-row-main">
                      <strong>{{ row.name }}</strong>
                      <small>{{ promptRoleDisplay(row.role) }}</small>
                    </div>
                    <div class="prompt-row-actions">
                      <button
                        type="button"
                        title="上移"
                        :disabled="!canEditPromptOrder || index === 0"
                        @click.stop="movePromptRow(row.identifier, -1)"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        title="下移"
                        :disabled="!canEditPromptOrder || index === promptEditorRows.length - 1"
                        @click.stop="movePromptRow(row.identifier, 1)"
                      >
                        ↓
                      </button>
                      <label
                        class="prompt-toggle"
                        title="启用"
                        @click.stop
                      >
                        <input
                          type="checkbox"
                          :checked="row.enabled"
                          :disabled="!canEditPromptOrder"
                          @change="togglePromptRow(row.identifier, ($event.target as HTMLInputElement).checked)"
                        >
                      </label>
                    </div>
                  </div>
                </div>
                <details class="preset-advanced-json">
                  <summary>高级 JSON</summary>
                  <label class="preset-text-field">
                    <span>原始预设</span>
                    <textarea
                      :value="JSON.stringify(preset.promptManager?.rawPreset || {}, null, 2)"
                      rows="12"
                      spellcheck="false"
                      readonly
                    />
                  </label>
                </details>
              </section>

              <aside class="preset-preview-panel prompt-detail-panel">
                <div class="preset-preview-head">
                  <strong>{{ selectedPromptRow?.name || '提示词条目' }}</strong>
                  <span>{{ promptRoleDisplay(String(selectedPromptRow?.role || 'system')) }}</span>
                </div>
                <div
                  v-if="selectedPromptRow"
                  class="prompt-detail-form"
                >
                  <label class="inline-check prompt-enabled-check">
                    <input
                      type="checkbox"
                      :checked="selectedPromptRow.enabled"
                      :disabled="!canEditPromptOrder"
                      @change="togglePromptRow(selectedPromptRow.identifier, ($event.target as HTMLInputElement).checked)"
                    >
                    <span>启用</span>
                  </label>
                  <label>
                    <span>名称</span>
                    <input
                      :value="selectedPromptRow.name"
                      @input="updatePromptByIdentifier(selectedPromptRow.identifier, { name: ($event.target as HTMLInputElement).value })"
                    >
                  </label>
                  <label>
                    <span>Role</span>
                    <select
                      :value="selectedPromptRow.role"
                      @change="updatePromptByIdentifier(selectedPromptRow.identifier, { role: ($event.target as HTMLSelectElement).value })"
                    >
                      <option value="system">system</option>
                      <option value="user">user</option>
                      <option value="assistant">assistant</option>
                    </select>
                  </label>
                  <label class="preset-text-field">
                    <span>内容</span>
                    <textarea
                      :value="selectedPromptRow.content"
                      rows="16"
                      spellcheck="false"
                      :disabled="selectedPromptRow.marker"
                      @input="updatePromptByIdentifier(selectedPromptRow.identifier, { content: ($event.target as HTMLTextAreaElement).value })"
                    />
                  </label>
                </div>
                <div
                  v-else
                  class="empty-note"
                >
                  当前预设没有可编辑条目。
                </div>
                <div class="preset-order-list compact-preview">
                  <div
                    v-for="row in presetRows"
                    :key="row.previewId"
                    class="preset-order-row"
                  >
                    <strong>{{ row.previewLabel }}</strong>
                    <small>{{ promptRoleDisplay(String(row.role || 'system')) }}</small>
                  </div>
                </div>
              </aside>
            </div>
          </div>

          <div
            v-show="activeSettingsWorkspace === 'assistantPreset'"
            class="panel step-panel preset-workspace"
          >
            <div class="panel-head preset-page-head">
              <div>
                <h2>助手预设</h2>
                <p class="muted compact">
                  后台管理员
                </p>
              </div>
              <div class="panel-pills">
                <span
                  v-if="assistantPresetDirty"
                  class="pill warning"
                >未保存</span>
                <span class="pill">{{ assistantPreset.name || '未命名' }}</span>
              </div>
            </div>
            <div class="preset-command-bar">
              <label>
                <span>当前预设</span>
                <select
                  v-model="activeAssistantPresetId"
                  @change="selectAssistantPreset(activeAssistantPresetId)"
                >
                  <option
                    v-for="item in assistantPresets"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </label>
              <div class="preset-actions">
                <button
                  type="button"
                  @click="deriveAssistantPreset"
                >
                  复制
                </button>
                <button
                  type="button"
                  :disabled="!assistantPresetDirty"
                  @click="discardAssistantPresetChanges"
                >
                  放弃
                </button>
                <button
                  type="button"
                  @click="saveCurrentAssistantPreset"
                >
                  保存
                </button>
              </div>
            </div>
            <div
              v-if="assistantPresetStatus"
              class="preset-status-line"
            >
              <span>{{ assistantPresetStatus }}</span>
            </div>
            <div class="preset-meta-strip">
              <label>
                <span>名称</span>
                <input
                  :value="assistantPreset.name"
                  @input="updateAssistantPresetPatch({ name: ($event.target as HTMLInputElement).value })"
                >
              </label>
              <label>
                <span>说明</span>
                <input
                  :value="assistantPreset.description || ''"
                  @input="updateAssistantPresetPatch({ description: ($event.target as HTMLInputElement).value })"
                >
              </label>
            </div>
            <div class="preset-section-editor assistant-preset-grid">
              <section
                v-for="section in assistantPresetSections"
                :key="section.key"
                class="preset-edit-card"
              >
                <div class="preset-card-head">
                  <strong>{{ section.label }}</strong>
                  <small>{{ section.summary }}</small>
                </div>
                <label class="preset-text-field">
                  <textarea
                    :value="readAssistantPresetField(section.key)"
                    :rows="section.rows"
                    @input="updateAssistantPresetField(section.key, ($event.target as HTMLTextAreaElement).value)"
                  />
                </label>
              </section>
            </div>
            <details class="preset-advanced-json">
              <summary>最终提示词预览</summary>
              <label class="preset-text-field">
                <span>运行时 system prompt</span>
                <textarea
                  :value="assistantPromptPreview"
                  rows="20"
                  readonly
                />
              </label>
            </details>
          </div>
        </section>
      </section>
    </section>

    <div
      v-if="showPromptInspector"
      class="prompt-inspector-overlay"
      @click.self="closePromptInspector"
      @keydown.esc="closePromptInspector"
    >
      <section
        class="prompt-inspector-modal"
        tabindex="-1"
      >
        <header class="prompt-inspector-head">
          <div>
            <p class="eyebrow">
              请求记录
            </p>
            <h2>API 请求</h2>
            <p>{{ lastRequestRawJson ? '上一次真实调用' : '暂无真实调用' }}</p>
          </div>
          <button
            type="button"
            aria-label="关闭"
            @click="closePromptInspector"
          >
            ×
          </button>
        </header>

        <div
          class="prompt-inspector-tabs"
          aria-label="API 请求视图"
        >
          <button
            type="button"
            :class="{ active: promptInspectorTab === 'history' }"
            @click="promptInspectorTab = 'history'"
          >
            历史
          </button>
          <button
            type="button"
            :class="{ active: promptInspectorTab === 'simulate' }"
            @click="promptInspectorTab = 'simulate'"
          >
            模拟
          </button>
        </div>

        <div class="prompt-inspector-body">
          <section
            v-show="promptInspectorTab === 'history'"
            class="prompt-inspector-view"
          >
            <div class="prompt-inspector-summary">
              <span>{{ lastRequestRawJson ? '有记录' : '暂无记录' }}</span>
              <span>{{ lastRequestSnapshot?.requestKind || 'history' }}</span>
              <span>{{ lastRequestSnapshot?.providerLabel || lastRequestSnapshot?.provider || '未调用' }}</span>
              <span>{{ lastRequestSnapshot?.model || '未选择模型' }}</span>
            </div>
            <pre
              v-if="lastRequestRawJson"
              class="prompt-request-json"
            >{{ lastRequestRawJson }}</pre>
            <p
              v-else
              class="prompt-empty-state"
            >
              暂无请求历史。
            </p>
          </section>

          <section
            v-show="promptInspectorTab === 'simulate'"
            class="prompt-inspector-view"
          >
            <div class="prompt-simulate-panel">
              <div>
                <label for="request-simulate-input">输入</label>
                <textarea
                  id="request-simulate-input"
                  v-model="simulateRequestInput"
                  rows="5"
                  placeholder="写一句要模拟发送的话"
                />
              </div>
              <button
                type="button"
                @click="simulateApiRequest"
              >
                模拟
              </button>
            </div>
            <p
              v-if="simulateRequestStatus"
              class="muted compact"
            >
              {{ simulateRequestStatus }}
            </p>
            <p
              v-if="simulateRequestError"
              class="error"
            >
              {{ simulateRequestError }}
            </p>
            <pre
              v-if="simulateRequestJson"
              class="prompt-request-json"
            >{{ simulateRequestJson }}</pre>
          </section>
        </div>
      </section>
    </div>
  </main>
</template>
