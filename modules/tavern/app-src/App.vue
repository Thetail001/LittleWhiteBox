<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import {
    type XbTavernContext,
    type XbTavernPresetSection,
} from '../shared/message-assembler';
import { buildXbTavernBrain } from '../shared/brain';
import { createDefaultXbTavernPreset, DEFAULT_XB_TAVERN_PRESET_ID } from '../shared/presets';
import {
    createTavernSession,
    deriveAndActivateDefaultTavernPreset,
    getActiveTavernPresetId,
    getSelectedTavernSessionId,
    loadActiveTavernPreset,
    listTavernMessages,
    listTavernSessions,
    listUserTavernPresets,
    normalizeTavernSessionState,
    saveTavernPreset,
    setActiveTavernPresetId,
    setSelectedTavernSessionId,
    updateTavernSessionSnapshot,
    type TavernMessageRecord,
    type TavernPresetRecord,
    type TavernSessionRecord,
} from '../shared/session-db';
import { buildContextHistory, runXbTavernTurn } from './runtime/run-once';

interface TavernDiagnostics {
    ok?: boolean;
    message?: string;
    worldbookErrors?: Array<{ name: string; error: string }>;
}

interface RequestAuditSnapshot {
    rawMessagesJson?: string;
    messageCount?: number;
    messageChars?: number;
    provider?: string;
    model?: string;
}

const SOURCE_APP = 'xb-tavern-app';
const SOURCE_HOST = 'xb-tavern-host';

const context = ref<XbTavernContext>({});
const diagnostics = ref<TavernDiagnostics>({});
const agentConfig = ref<Record<string, unknown>>({});
const availableCharacters = ref<Array<{ id: string; name: string; avatar?: string }>>([]);
const selectedCharacterId = ref('');
const statusText = ref('等待读取资料');
const currentUserMessage = ref('');
const historyMode = ref<'raw' | 'squash'>('squash');
const runtimeText = ref('');
const runtimeError = ref('');
const runtimeProvider = ref('');
const runtimeModel = ref('');
const runtimeSnapshotJson = ref('');
const isRunning = ref(false);
const sessions = ref<TavernSessionRecord[]>([]);
const selectedSessionId = ref('');
const sessionMessages = ref<TavernMessageRecord[]>([]);
const preset = ref(createDefaultXbTavernPreset());
const userPresets = ref<TavernPresetRecord[]>([]);
const activePresetId = ref(DEFAULT_XB_TAVERN_PRESET_ID);
const presetStatus = ref('');
const savedPresetJson = ref('');
const selectedPresetSourceId = ref('');
type AppView = 'home' | 'chat' | 'settings';
type WorkspaceKey = 'snapshot' | 'world' | 'messages' | 'runtime' | 'preset';
interface BrainCheck {
    key: WorkspaceKey;
    label: string;
    ok: boolean;
    detail: string;
}
const presetIsBuiltIn = computed(() => activePresetId.value === DEFAULT_XB_TAVERN_PRESET_ID);
const presetDirty = computed(() => !presetIsBuiltIn.value && snapshotPreset(preset.value) !== savedPresetJson.value);
const selectedSession = computed(() => sessions.value.find((item) => item.id === selectedSessionId.value) || null);
const sessionRuntimeState = computed(() => normalizeTavernSessionState(selectedSession.value?.state || {}));
const activeView = ref<AppView>('home');
const usingLockedSessionContext = computed(() => !!selectedSession.value?.contextSnapshot);
const liveWorldBookCount = computed(() => context.value.worldBooks?.length || 0);
const liveWorldEntryCount = computed(() => (context.value.worldBooks || []).reduce((sum, book) => sum + (book.entries?.length || 0), 0));
const contextSourceTitle = computed(() => usingLockedSessionContext.value
    ? '当前显示和试聊：会话锁定资料'
    : '当前显示和试聊：刚读取的酒馆资料');
const contextSourceDetail = computed(() => usingLockedSessionContext.value
    ? `会话锁定了 ${selectedSession.value?.characterName || '未选择角色'} 的资料。你刚改角色卡或世界书后，需要刷新会话资料，或者改用刚读取资料重新试聊。`
    : `正在使用酒馆最新读取资料：${context.value.character?.name || '未选择角色'} / 世界书 ${liveWorldBookCount.value} 本 ${liveWorldEntryCount.value} 条。`);
const activeWorkspace = ref<WorkspaceKey>('snapshot');
const workspaceTabs = [
    { key: 'snapshot', label: '1 选角色', hint: '确认小白读的是哪张卡' },
    { key: 'world', label: '2 看资料', hint: '看世界书和检查结果' },
    { key: 'messages', label: '3 看发送内容', hint: '确认模型实际会收到什么' },
    { key: 'runtime', label: '4 试聊一句', hint: '跑一轮验证脑子是否正常' },
] as const;
const activeWorkspaceItem = computed(() => workspaceTabs.find((item) => item.key === activeWorkspace.value) || {
    key: 'preset',
    label: '调整小白预设',
    hint: '修改第 3 步最终发送内容里使用的小白规则',
});

const effectiveContext = computed<XbTavernContext>(() => ({
    ...(selectedSession.value?.contextSnapshot || context.value),
    history: selectedSessionId.value
        ? buildContextHistory(sessionMessages.value)
        : context.value.history,
}));

const brainBuild = computed(() => buildXbTavernBrain({
    context: effectiveContext.value,
    preset: preset.value,
    currentUserMessage: currentUserMessage.value,
    historyMode: historyMode.value,
    turn: sessionRuntimeState.value.turn,
    entryStates: sessionRuntimeState.value.worldEntryStates,
    diagnostics: diagnostics.value,
}));
const buildResult = computed(() => brainBuild.value.buildResult);

const effectiveCharacter = computed(() => effectiveContext.value.character || {});
const effectiveUser = computed(() => effectiveContext.value.user || {});
const characterName = computed(() => effectiveCharacter.value.name || '未选择角色');
const userName = computed(() => effectiveUser.value.name || 'User');
const worldBooks = computed(() => effectiveContext.value.worldBooks || []);
const worldBookCount = computed(() => worldBooks.value.length);
const worldEntryCount = computed(() => buildResult.value.worldEntryCandidates.length);
const activatedCount = computed(() => buildResult.value.activatedWorldEntries.length);
const messagePreview = computed(() => buildResult.value.messages);
const selectedSessionTitle = computed(() => selectedSession.value?.title || '未创建会话');
const rawMessagesJson = computed(() => buildResult.value.meta.rawMessagesJson);
const buildSnapshot = computed(() => brainBuild.value.buildSnapshot);
const effectiveHistoryCount = computed(() => effectiveContext.value.history?.length || 0);
const lastRequestSnapshot = computed(() => selectedSession.value?.state?.lastRequestSnapshot as RequestAuditSnapshot | undefined);
const lastRequestMatchesPreview = computed(() => !!lastRequestSnapshot.value?.rawMessagesJson
    && lastRequestSnapshot.value.rawMessagesJson === rawMessagesJson.value);
const sessionMessagesForChat = computed(() => sessionMessages.value.filter((message) => !message.error));
const latestErrorMessage = computed(() => [...sessionMessages.value].reverse().find((message) => message.error)?.content || runtimeError.value);
const chatReadyLabel = computed(() => selectedSessionId.value ? selectedSessionTitle.value : '未创建会话');
const brainChecks = computed<BrainCheck[]>(() => {
    const layers = buildResult.value.messageLayers;
    const topRulesLocked = layers[0]?.layer === 'lwb-system'
        && layers[1]?.layer === 'lwb-tool'
        && messagePreview.value[0]?.role === 'system'
        && messagePreview.value[1]?.role === 'system';
    const worldExplainable = candidateRows.value.every((entry) => entry.status && entry.insertionTarget);
    const hasRequestAudit = !!lastRequestSnapshot.value?.rawMessagesJson;
    return [
        {
            key: 'snapshot',
            label: '资料快照',
            ok: !!effectiveContext.value.character?.name,
            detail: effectiveContext.value.character?.name
                ? `${effectiveContext.value.character.name} / 世界书 ${worldBookCount.value} 本 / 历史 ${effectiveHistoryCount.value} 条`
                : '还没有读到角色卡',
        },
        {
            key: 'messages',
            label: '顶层规则',
            ok: topRulesLocked,
            detail: topRulesLocked ? '小白 system 和工具边界固定在最前两条' : '最前两条规则异常',
        },
        {
            key: 'world',
            label: '世界书解释',
            ok: worldExplainable,
            detail: `候选 ${worldEntryCount.value} 条，激活 ${activatedCount.value} 条，跳过原因可检查`,
        },
        {
            key: 'messages',
            label: '发送内容',
            ok: lastRequestMatchesPreview.value,
            detail: hasRequestAudit
                ? (lastRequestMatchesPreview.value
                    ? `上次试跑和当前预览一致：${lastRequestSnapshot.value?.messageCount || messagePreview.value.length} 条`
                    : '当前预览已经不同于上次实际发送，需要重新试跑')
                : `待试跑：当前预览 ${messagePreview.value.length} 条 / ${buildSnapshot.value.messageChars} 字`,
        },
        {
            key: 'runtime',
            label: '独立会话',
            ok: !!selectedSessionId.value,
            detail: selectedSessionId.value ? '试跑会写入小白酒馆会话' : '还没创建小白酒馆会话',
        },
    ];
});

const characterFields = computed(() => {
    const character = effectiveContext.value.character || {};
    const user = effectiveContext.value.user || {};
    return [
        ['角色', character.name],
        ['头像', character.avatar],
        ['用户', user.name],
        ['用户 persona', user.persona || user.description],
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
        'lwb-system': '最高优先级规则',
        'lwb-tool': '工具和行为边界',
        top: '开场规则',
        preset: '补充规则',
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
const presetRows = computed(() => {
    const sections = Array.isArray(preset.value.sections) ? preset.value.sections : [];
    const rows: Array<XbTavernPresetSection & { previewId: string; previewLabel: string; previewPlacement: string }> = [
        {
            previewId: 'lwb-system',
            previewLabel: '最高优先级规则',
            previewPlacement: '固定在最前面',
            role: 'system',
            locked: true,
            enabled: true,
            content: preset.value.systemPrompt,
        },
        {
            previewId: 'lwb-tool',
            previewLabel: '工具和行为边界',
            previewPlacement: '固定在最前面',
            role: 'system',
            locked: true,
            enabled: true,
            content: preset.value.toolPrompt,
        },
        ...sections.map((section, index) => ({
            ...section,
            previewId: section.id || `preset-section-${index}`,
            previewLabel: section.label || section.id || `规则段 ${index + 1}`,
            previewPlacement: placementLabels[section.placement || 'beforeHistory'] || section.placement || '历史前',
            enabled: section.enabled !== false,
        })),
    ];
    return rows
        .map((row) => ({
            ...row,
            content: String(row.content || ''),
            chars: String(row.content || '').length,
        }))
        .filter((row) => row.content || row.enabled === false);
});

function snapshotPreset(value = preset.value) {
    return JSON.stringify(value || {});
}

async function refreshPresets() {
    userPresets.value = await listUserTavernPresets();
    const activeId = await getActiveTavernPresetId();
    const loaded = await loadActiveTavernPreset();
    preset.value = loaded;
    activePresetId.value = loaded.id || activeId || DEFAULT_XB_TAVERN_PRESET_ID;
    savedPresetJson.value = snapshotPreset(loaded);
    if (activeId !== activePresetId.value) {
        await setActiveTavernPresetId(activePresetId.value);
    }
}

async function deriveDefaultPreset() {
    const record = await deriveAndActivateDefaultTavernPreset();
    activePresetId.value = record.id;
    preset.value = record.preset;
    await refreshPresets();
    presetStatus.value = '已复制一份默认规则，可以开始修改。';
}

async function selectPreset(presetId: string) {
    await setActiveTavernPresetId(presetId);
    activePresetId.value = presetId || DEFAULT_XB_TAVERN_PRESET_ID;
    preset.value = await loadActiveTavernPreset();
    savedPresetJson.value = snapshotPreset(preset.value);
    selectedPresetSourceId.value = '';
    presetStatus.value = presetIsBuiltIn.value ? '当前使用默认规则，不能直接修改。' : '已切换到你的规则。';
}

async function saveCurrentPreset() {
    if (presetIsBuiltIn.value) {
        presetStatus.value = '默认规则不能直接改，请先复制一份。';
        return;
    }
    const record = await saveTavernPreset(preset.value);
    await setActiveTavernPresetId(record.id);
    activePresetId.value = record.id;
    preset.value = record.preset;
    savedPresetJson.value = snapshotPreset(record.preset);
    await refreshPresets();
    presetStatus.value = '规则已保存。';
}

async function resetToBuiltInPreset() {
    await setActiveTavernPresetId(DEFAULT_XB_TAVERN_PRESET_ID);
    activePresetId.value = DEFAULT_XB_TAVERN_PRESET_ID;
    preset.value = createDefaultXbTavernPreset();
    savedPresetJson.value = snapshotPreset(preset.value);
    selectedPresetSourceId.value = '';
    presetStatus.value = '已切回默认规则。';
}

function updatePresetSection(index: number, patch: Partial<XbTavernPresetSection>) {
    if (presetIsBuiltIn.value) {return;}
    const sections = [...(preset.value.sections || [])];
    sections[index] = {
        ...sections[index],
        ...patch,
    };
    preset.value = {
        ...preset.value,
        sections,
    };
}

function updatePresetMeta(patch: Partial<typeof preset.value>) {
    if (presetIsBuiltIn.value) {return;}
    preset.value = {
        ...preset.value,
        ...patch,
    };
}

function addPresetSection() {
    if (presetIsBuiltIn.value) {return;}
    const sections = [...(preset.value.sections || [])];
    const id = `custom-section-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    sections.push({
        id,
        label: '新的补充规则',
        locked: false,
        enabled: true,
        placement: 'beforeHistory',
        role: 'system',
        content: '',
    });
    preset.value = {
        ...preset.value,
        sections,
    };
    selectedPresetSourceId.value = id;
}

function movePresetSection(index: number, direction: -1 | 1) {
    if (presetIsBuiltIn.value) {return;}
    const sections = [...(preset.value.sections || [])];
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= sections.length) {return;}
    const [section] = sections.splice(index, 1);
    sections.splice(nextIndex, 0, section);
    preset.value = {
        ...preset.value,
        sections,
    };
}

function removePresetSection(index: number) {
    if (presetIsBuiltIn.value) {return;}
    const sections = [...(preset.value.sections || [])];
    const removedId = sections[index]?.id || '';
    sections.splice(index, 1);
    preset.value = {
        ...preset.value,
        sections,
    };
    if (selectedPresetSourceId.value === removedId) {
        selectedPresetSourceId.value = '';
    }
}

async function discardPresetChanges() {
    if (presetIsBuiltIn.value || !presetDirty.value) {return;}
    preset.value = await loadActiveTavernPreset();
    savedPresetJson.value = snapshotPreset(preset.value);
    selectedPresetSourceId.value = '';
    presetStatus.value = '已放弃未保存的改动。';
}

function postToHost(type: string, payload: Record<string, unknown> = {}) {
    window.parent?.postMessage({ source: SOURCE_APP, type, payload }, window.location.origin);
}

function applyHostPayload(payload: Record<string, unknown>) {
    context.value = payload.context as XbTavernContext || {};
    diagnostics.value = payload.diagnostics as TavernDiagnostics || {};
    agentConfig.value = payload.agentConfig as Record<string, unknown> || agentConfig.value;
    availableCharacters.value = payload.availableCharacters as Array<{ id: string; name: string; avatar?: string }> || availableCharacters.value;
    selectedCharacterId.value = String(payload.selectedCharacterId || context.value.character?.id || selectedCharacterId.value || '');
    statusText.value = usingLockedSessionContext.value
        ? `${diagnostics.value.message || '宿主资料已加载'}；当前会话仍使用锁定资料。`
        : diagnostics.value.message || '宿主资料已加载';
}

function onHostMessage(event: MessageEvent) {
    if (event.origin !== window.location.origin) {return;}
    const data = event.data || {};
    if (data.source !== SOURCE_HOST) {return;}
    if (data.type === 'xb-tavern:config') {
        applyHostPayload(data.payload || {});
        return;
    }
    if (data.type === 'xb-tavern:context') {
        applyHostPayload(data.payload || {});
    }
}

function refreshSelectedCharacter() {
    statusText.value = '正在重新读取这张角色卡';
    postToHost('xb-tavern:refresh-context', {
        characterId: selectedCharacterId.value,
    });
}

async function useLiveContextForPreview() {
    selectedSessionId.value = '';
    sessionMessages.value = [];
    runtimeText.value = '';
    runtimeError.value = '';
    runtimeSnapshotJson.value = '';
    await setSelectedTavernSessionId('');
}

async function refreshSessions() {
    sessions.value = await listTavernSessions();
    selectedSessionId.value = await getSelectedTavernSessionId();
    if (!selectedSessionId.value && sessions.value[0]) {
        selectedSessionId.value = sessions.value[0].id;
        await setSelectedTavernSessionId(selectedSessionId.value);
    }
    sessionMessages.value = selectedSessionId.value ? await listTavernMessages(selectedSessionId.value) : [];
}

async function createSessionFromContext() {
    const snapshotContext = context.value;
    const snapshotBrain = buildXbTavernBrain({
        context: snapshotContext,
        preset: preset.value,
        currentUserMessage: currentUserMessage.value,
        historyMode: historyMode.value,
        turn: 0,
        entryStates: {},
        diagnostics: diagnostics.value,
    });
    const session = await createTavernSession({
        title: `${snapshotContext.character?.name || '未选择角色'} · 小白酒馆`,
        characterId: String(snapshotContext.character?.id || ''),
        characterName: String(snapshotContext.character?.name || '未选择角色'),
        contextSnapshot: snapshotContext,
        buildSnapshot: snapshotBrain.buildSnapshot,
        presetId: String(preset.value.id || activePresetId.value || ''),
        presetName: String(preset.value.name || ''),
        state: {
            turn: 0,
            worldEntryStates: {},
        },
    });
    selectedSessionId.value = session.id;
    await refreshSessions();
    return session;
}

async function createSessionAndOpenChat() {
    await createSessionFromContext();
    activeView.value = 'chat';
}

async function refreshSelectedSessionSnapshot() {
    if (!selectedSessionId.value) {return;}
    const snapshotContext = context.value;
    const snapshotBrain = buildXbTavernBrain({
        context: snapshotContext,
        preset: preset.value,
        currentUserMessage: currentUserMessage.value,
        historyMode: historyMode.value,
        turn: sessionRuntimeState.value.turn,
        entryStates: sessionRuntimeState.value.worldEntryStates,
        diagnostics: diagnostics.value,
    });
    await updateTavernSessionSnapshot(selectedSessionId.value, {
        contextSnapshot: snapshotContext,
        buildSnapshot: snapshotBrain.buildSnapshot,
        presetId: String(preset.value.id || activePresetId.value || ''),
        presetName: String(preset.value.name || ''),
    });
    await refreshSessions();
}

async function selectSession(sessionId: string) {
    selectedSessionId.value = sessionId;
    await setSelectedTavernSessionId(sessionId);
    sessionMessages.value = await listTavernMessages(sessionId);
    activeView.value = 'chat';
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
        user: '用户',
        assistant: 'AI',
        tool: '工具结果',
    };
    return labels[role] || role || '未知';
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

async function runOnce() {
    if (!String(currentUserMessage.value || '').trim()) {
        runtimeError.value = '先写一句要发给角色的话。';
        return;
    }
    runtimeError.value = '';
    runtimeText.value = '';
    runtimeProvider.value = '';
    runtimeModel.value = '';
    runtimeSnapshotJson.value = JSON.stringify({
        status: 'running',
    }, null, 2);
    isRunning.value = true;
    try {
        const result = await runXbTavernTurn({
            sessionId: selectedSessionId.value,
            agentConfig: agentConfig.value,
            contextSnapshot: context.value,
            preset: preset.value,
            currentUserMessage: currentUserMessage.value,
            runtimeState: normalizeTavernSessionState(selectedSession.value?.state || {}),
            diagnostics: diagnostics.value,
            historyMode: historyMode.value,
            onStreamProgress: (snapshot) => {
                if (typeof snapshot.text === 'string') {runtimeText.value = snapshot.text;}
            },
        });
        selectedSessionId.value = result.sessionId;
        runtimeText.value = result.assistantMessage?.content || result.errorMessage?.content || '';
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
        currentUserMessage.value = '';
    } catch (error) {
        runtimeError.value = error instanceof Error ? error.message : String(error || 'run_failed');
    } finally {
        isRunning.value = false;
    }
}

onMounted(async () => {
    // onHostMessage validates origin and message source before accepting payloads.
    // eslint-disable-next-line no-restricted-syntax
    window.addEventListener('message', onHostMessage);
    await refreshPresets();
    await refreshSessions();
    postToHost('xb-tavern:frame-ready');
});

onUnmounted(() => {
    window.removeEventListener('message', onHostMessage);
});
</script>

<template>
  <main class="xb-tavern">
    <header class="xb-topbar">
      <div>
        <p class="eyebrow">
          LittleWhiteBox Tavern
        </p>
        <h1>小白酒馆</h1>
        <p class="top-subtitle">
          选角色，开会话，检查资料，然后进入独立聊天。
        </p>
      </div>
      <nav
        class="view-tabs"
        aria-label="小白酒馆页面"
      >
        <button
          type="button"
          :class="{ active: activeView === 'home' }"
          @click="activeView = 'home'"
        >
          首页
        </button>
        <button
          type="button"
          :class="{ active: activeView === 'chat' }"
          @click="activeView = 'chat'"
        >
          聊天
        </button>
        <button
          type="button"
          :class="{ active: activeView === 'settings' }"
          @click="activeView = 'settings'"
        >
          设置
        </button>
        <button
          class="icon-button"
          type="button"
          title="关闭"
          @click="postToHost('xb-tavern:close')"
        >
          ×
        </button>
      </nav>
    </header>

    <section
      v-if="activeView === 'home'"
      class="tavern-home"
    >
      <div class="home-hero">
        <div>
          <p class="eyebrow">
            独立会话
          </p>
          <h2>{{ characterName }}</h2>
          <p>
            {{ contextSourceDetail }}
          </p>
        </div>
        <div class="home-actions">
          <button
            type="button"
            class="primary-action"
            @click="selectedSessionId ? activeView = 'chat' : createSessionAndOpenChat()"
          >
            {{ selectedSessionId ? '进入聊天' : '开始聊天' }}
          </button>
          <button
            type="button"
            @click="refreshSelectedCharacter"
          >
            从酒馆重新读取
          </button>
          <button
            v-if="usingLockedSessionContext"
            type="button"
            @click="useLiveContextForPreview"
          >
            改用刚读取资料
          </button>
        </div>
      </div>

      <div class="home-grid">
        <article class="home-card">
          <span>当前角色</span>
          <strong>{{ characterName }}</strong>
          <small>{{ userName }} · 历史 {{ effectiveHistoryCount }} 条</small>
          <label
            class="field-label"
            for="xb-home-character-select"
          >切换角色卡</label>
          <select
            id="xb-home-character-select"
            v-model="selectedCharacterId"
            @change="refreshSelectedCharacter"
          >
            <option
              v-for="character in availableCharacters"
              :key="character.id"
              :value="character.id"
            >
              {{ character.name }}
            </option>
          </select>
        </article>

        <article class="home-card">
          <span>资料状态</span>
          <strong>{{ worldBookCount }} 本世界书</strong>
          <small>{{ worldBookEntryRows.length }} 个条目 · 本次会带上 {{ activatedCount }} 条</small>
          <button
            type="button"
            @click="activeView = 'settings'; activeWorkspace = 'world'"
          >
            查看资料
          </button>
        </article>

        <article class="home-card">
          <span>会话</span>
          <strong>{{ chatReadyLabel }}</strong>
          <small>{{ sessionMessagesForChat.length }} 条消息</small>
          <button
            type="button"
            @click="createSessionAndOpenChat"
          >
            新开会话
          </button>
        </article>
      </div>

      <section class="session-board">
        <div class="panel-head">
          <div>
            <h2>会话列表</h2>
            <p class="muted compact">
              选择一个会话后直接进入聊天页。
            </p>
          </div>
          <button
            type="button"
            @click="activeView = 'settings'"
          >
            设置
          </button>
        </div>
        <div class="home-session-list">
          <button
            v-for="session in sessions"
            :key="session.id"
            type="button"
            :class="{ active: session.id === selectedSessionId }"
            @click="selectSession(session.id)"
          >
            <strong>{{ session.title }}</strong>
            <small>{{ session.characterName || '未选择角色' }}</small>
          </button>
          <p
            v-if="!sessions.length"
            class="muted"
          >
            还没有小白酒馆会话。
          </p>
        </div>
      </section>
    </section>

    <section
      v-if="activeView === 'chat'"
      class="tavern-chat"
    >
      <aside class="chat-side">
        <div class="panel">
          <h2>{{ characterName }}</h2>
          <p class="muted compact">
            {{ contextSourceTitle }}
          </p>
          <dl class="kv">
            <dt>世界书</dt>
            <dd>{{ worldBookCount }} 本 / {{ activatedCount }} 条</dd>
            <dt>会话</dt>
            <dd>{{ chatReadyLabel }}</dd>
          </dl>
          <button
            type="button"
            @click="activeView = 'settings'; activeWorkspace = 'world'"
          >
            查看本轮资料
          </button>
          <button
            type="button"
            @click="activeView = 'home'"
          >
            返回首页
          </button>
        </div>
        <div class="panel">
          <h2>会话</h2>
          <div class="session-list">
            <button
              v-for="session in sessions"
              :key="session.id"
              type="button"
              :class="{ active: session.id === selectedSessionId }"
              @click="selectSession(session.id)"
            >
              {{ session.title }}
            </button>
          </div>
        </div>
      </aside>

      <section class="chat-main">
        <header class="chat-head">
          <div>
            <p class="eyebrow">
              CHAT
            </p>
            <h2>{{ selectedSessionTitle }}</h2>
          </div>
          <button
            type="button"
            @click="createSessionAndOpenChat"
          >
            新会话
          </button>
        </header>
        <div class="chat-scroll">
          <div
            v-for="message in sessionMessagesForChat"
            :key="`${message.sessionId}-${message.order}`"
            class="chat-bubble"
            :class="message.role === 'user' ? 'from-user' : 'from-assistant'"
          >
            <span>{{ roleLabel(message.role) }}</span>
            <p>{{ message.content }}</p>
          </div>
          <div
            v-if="isRunning && runtimeText"
            class="chat-bubble from-assistant streaming"
          >
            <span>AI</span>
            <p>{{ runtimeText }}</p>
          </div>
          <p
            v-if="!sessionMessagesForChat.length && !isRunning"
            class="chat-empty"
          >
            这里还没有消息。下面写一句话，开始测试这个角色。
          </p>
          <p
            v-if="latestErrorMessage"
            class="error"
          >
            {{ latestErrorMessage }}
          </p>
        </div>
        <form
          class="chat-compose"
          @submit.prevent="runOnce"
        >
          <textarea
            v-model="currentUserMessage"
            rows="3"
            placeholder="对角色说一句话..."
          />
          <button
            type="submit"
            class="primary-action"
            :disabled="isRunning"
          >
            {{ isRunning ? '发送中' : '发送' }}
          </button>
        </form>
      </section>
    </section>

    <section
      v-if="activeView === 'settings'"
      class="xb-layout"
    >
      <aside class="xb-sidebar">
        <div class="panel guide-card">
          <h2>你现在要做什么</h2>
          <p class="muted">
            按顺序看完四步。只要有一步不对，就先停下来修脑子，不进入正式聊天。
          </p>
          <div class="guide-steps">
            <button
              v-for="tab in workspaceTabs"
              :key="tab.key"
              type="button"
              class="guide-step"
              :class="{ active: activeWorkspace === tab.key }"
              @click="activeWorkspace = tab.key"
            >
              <strong>{{ tab.label }}</strong>
              <span>{{ tab.hint }}</span>
            </button>
          </div>
          <button
            type="button"
            class="guide-step guide-step-secondary"
            :class="{ active: activeWorkspace === 'preset' }"
            @click="activeWorkspace = 'preset'"
          >
            <strong>调预设</strong>
            <span>需要改小白规则时再打开</span>
          </button>
        </div>

        <div class="panel">
          <h2>当前选择</h2>
          <p class="context-source">
            <strong>{{ contextSourceTitle }}</strong>
            <span>{{ contextSourceDetail }}</span>
          </p>
          <dl class="kv">
            <dt>角色</dt>
            <dd>{{ characterName }}</dd>
            <dt>用户</dt>
            <dd>{{ userName }}</dd>
            <dt>世界书</dt>
            <dd>{{ worldBookCount }} 本 / {{ worldEntryCount }} 条</dd>
            <dt>会带上</dt>
            <dd>{{ activatedCount }} 条</dd>
          </dl>
          <label
            class="field-label"
            for="xb-character-select"
          >角色卡</label>
          <select
            id="xb-character-select"
            v-model="selectedCharacterId"
            @change="refreshSelectedCharacter"
          >
            <option
              v-for="character in availableCharacters"
              :key="character.id"
              :value="character.id"
            >
              {{ character.name }}
            </option>
          </select>
          <button
            type="button"
            @click="refreshSelectedCharacter"
          >
            从酒馆重新读取
          </button>
          <button
            v-if="usingLockedSessionContext"
            type="button"
            @click="useLiveContextForPreview"
          >
            改用刚读取资料
          </button>
        </div>

        <div class="panel">
          <h2>准备状态</h2>
          <ul class="diagnostics">
            <li
              v-for="row in diagnosticRows"
              :key="row"
            >
              {{ row }}
            </li>
          </ul>
        </div>

        <div class="panel">
          <h2>会话</h2>
          <p class="muted">
            {{ selectedSessionTitle }}
          </p>
          <button
            type="button"
            @click="createSessionFromContext"
          >
            用刚读取资料开始新会话
          </button>
          <button
            type="button"
            :disabled="!selectedSessionId"
            @click="refreshSelectedSessionSnapshot"
          >
            把刚读取资料写入当前会话
          </button>
          <button
            v-if="usingLockedSessionContext"
            type="button"
            @click="useLiveContextForPreview"
          >
            不用旧会话，直接看刚读取资料
          </button>
          <div class="session-list">
            <button
              v-for="session in sessions"
              :key="session.id"
              type="button"
              :class="{ active: session.id === selectedSessionId }"
              @click="selectSession(session.id)"
            >
              {{ session.title }}
            </button>
          </div>
        </div>
      </aside>

      <section class="xb-main">
        <div class="panel workspace-panel">
          <div class="panel-head">
            <div>
              <h2>{{ activeWorkspaceItem.label }}</h2>
              <p class="muted compact">
                {{ activeWorkspaceItem.hint }}
              </p>
            </div>
            <span class="pill">
              {{ characterName }}
            </span>
          </div>
          <div class="brain-checks compact-checks">
            <button
              v-for="check in brainChecks"
              :key="check.label"
              type="button"
              class="brain-check"
              :class="{ ok: check.ok, warn: !check.ok }"
              @click="activeWorkspace = check.key"
            >
              <span class="check-mark">{{ check.ok ? '✓' : '!' }}</span>
              <span>
                <strong>{{ check.label }}</strong>
                <small>{{ check.detail }}</small>
              </span>
            </button>
          </div>
        </div>

        <div
          v-show="activeWorkspace === 'snapshot'"
          class="panel step-panel"
        >
          <div class="panel-head">
            <div>
              <h2>1. 选角色卡</h2>
              <p class="muted compact">
                先确认小白酒馆读到的是你想测试的角色，不要在错角色上继续验。
              </p>
            </div>
            <span class="pill">历史 {{ effectiveHistoryCount }} 条</span>
          </div>
          <div class="what-to-check">
            <strong>你要判断：</strong>
            <span>角色名、用户 persona、角色描述、首条消息和世界书来源是不是这次要测试的资料。</span>
          </div>
          <div
            v-if="usingLockedSessionContext"
            class="context-warning"
          >
            <strong>你现在看的不是刚读取资料。</strong>
            <span>当前选中了旧会话，页面和试聊都在用会话锁定资料。刚改过世界书时，先点“改用刚读取资料”，或把刚读取资料写入当前会话。</span>
          </div>
          <div class="step-actions">
            <label>
              角色卡
              <select
                v-model="selectedCharacterId"
                @change="refreshSelectedCharacter"
              >
                <option
                  v-for="character in availableCharacters"
                  :key="character.id"
                  :value="character.id"
                >
                  {{ character.name }}
                </option>
              </select>
            </label>
            <button
              type="button"
              @click="refreshSelectedCharacter"
            >
              从酒馆重新读取
            </button>
            <button
              type="button"
              @click="createSessionFromContext"
            >
              用刚读取资料开始新会话
            </button>
            <button
              v-if="usingLockedSessionContext"
              type="button"
              @click="useLiveContextForPreview"
            >
              改用刚读取资料
            </button>
          </div>
          <div class="snapshot-grid">
            <article class="snapshot-card">
              <h3>读到的角色 / 用户</h3>
              <dl class="field-list">
                <template
                  v-for="field in characterFields"
                  :key="field[0]"
                >
                  <dt>{{ field[0] }}</dt>
                  <dd>{{ shortText(String(field[1] || ''), 420) }}</dd>
                </template>
              </dl>
            </article>
            <article class="snapshot-card">
              <h3>读到的世界书</h3>
              <div class="source-list">
                <span
                  v-for="book in worldBooks"
                  :key="book.name"
                  class="source-row"
                >
                  <strong>{{ book.name || '未命名世界书' }}</strong>
                  <small>{{ book.entries?.length || 0 }} 条</small>
                </span>
                <p
                  v-if="!worldBooks.length"
                  class="muted"
                >
                  这次准备资料里没有世界书。
                </p>
              </div>
            </article>
          </div>
        </div>

        <div
          v-show="activeWorkspace === 'world'"
          class="panel step-panel"
        >
          <div class="panel-head">
            <div>
              <h2>2. 看它读到了哪些资料</h2>
              <p class="muted compact">
                先看小白读到了哪些世界书；本次试聊会带上哪些条目，会由第 4 步那句话决定。
              </p>
            </div>
            <div class="panel-pills">
              <span class="pill">{{ activatedCount }} / {{ worldEntryCount }}</span>
              <span class="pill">{{ worldBudget.enabled ? `${worldBudget.used}/${worldBudget.limit} 字` : '无预算限制' }}</span>
            </div>
          </div>
          <div class="what-to-check">
            <strong>你要判断：</strong>
            <span>该触发的世界书有没有触发；不该触发的有没有混进来；检查结果有没有明显报错。</span>
          </div>
          <div
            v-if="usingLockedSessionContext"
            class="context-warning"
          >
            <strong>世界书来自旧会话快照。</strong>
            <span>如果你刚改了酒馆世界书，这里不会自动变化。点“改用刚读取资料”看最新资料，或回到会话区刷新当前会话资料。</span>
            <button
              type="button"
              @click="useLiveContextForPreview"
            >
              改用刚读取资料
            </button>
          </div>
          <ul class="diagnostics inline-diagnostics">
            <li
              v-for="row in diagnosticRows"
              :key="row"
            >
              {{ row }}
            </li>
          </ul>
          <section class="read-world-section">
            <div class="message-group-head">
              <strong>已经读到的世界书条目</strong>
              <span>{{ worldBookEntryRows.length }} 条</span>
            </div>
            <div class="world-list read-world-list">
              <article
                v-for="entry in worldBookEntryRows"
                :key="entry.key"
                class="world-entry"
              >
                <div class="entry-head">
                  <strong>{{ entry.title }}</strong>
                  <span>{{ entry.bookName }}</span>
                </div>
                <p class="entry-meta">
                  关键词：{{ entry.keywords || '无' }} / 二级关键词：{{ entry.secondaryKeywords || '无' }}
                </p>
                <p>{{ shortText(entry.content, 260) }}</p>
              </article>
              <p
                v-if="!worldBookEntryRows.length"
                class="muted"
              >
                这次没有读到世界书条目。
              </p>
            </div>
          </section>
          <div class="world-debug-grid">
            <details class="debug-box">
              <summary>开发查看：用于匹配世界书的文本 · {{ buildResult.meta.scanTextChars }} 字</summary>
              <pre>{{ shortText(scanTextPreview, 2400) }}</pre>
            </details>
            <div class="debug-box">
              <strong>会放到哪里</strong>
              <div class="position-list">
                <span
                  v-for="row in worldPositionRows"
                  :key="row[0]"
                >
                  {{ insertionTargetLabel(row[0]) }} · {{ row[1] }}
                </span>
                <span v-if="!worldPositionRows.length">这次没有带上世界书</span>
              </div>
            </div>
          </div>
          <div class="message-group-head world-send-head">
            <strong>本次试聊会带上的世界书</strong>
            <span>由第 4 步输入决定</span>
          </div>
          <div class="world-list">
            <article
              v-for="entry in activatedCandidateRows"
              :key="entry.activationKey"
              class="world-entry"
              :class="{ active: true }"
            >
              <div class="entry-head">
                <strong>{{ entry.title || entry.uid }}</strong>
                <span>{{ statusLabel(entry.status) }}</span>
              </div>
              <small>
                来自 {{ entry.sourceWorldBook || '未归属' }} · 放到 {{ insertionTargetLabel(entry.insertionTarget) }} · {{ entry.contentChars }} 字
              </small>
              <p class="entry-meta">
                关键词：{{ entry.key.join(', ') || '无' }} / 二级关键词：{{ entry.keysecondary.join(', ') || '无' }}
              </p>
              <p class="entry-meta">
                {{ candidateReason(entry) }}
                <template v-if="entry.status === 'budget_skipped' && typeof entry.budgetRemainingBefore === 'number'">
                  · 当时剩余 {{ entry.budgetRemainingBefore }} 字
                </template>
              </p>
              <p>{{ shortText(entry.content, 360) }}</p>
            </article>
            <p
              v-if="!activatedCandidateRows.length"
              class="muted"
            >
              当前这句试聊输入没有触发世界书条目。这不代表没读到世界书；去第 4 步换一句包含关键词的话，再回来看会带上哪些条目。
            </p>
          </div>
          <details
            v-if="skippedCandidateRows.length"
            class="raw-json"
          >
            <summary>高级查看：本次不会带上的候选条目 · {{ skippedCandidateRows.length }} 条</summary>
            <div class="world-list folded-world-list">
              <article
                v-for="entry in skippedCandidateRows"
                :key="entry.activationKey"
                class="world-entry"
              >
                <div class="entry-head">
                  <strong>{{ entry.title || entry.uid }}</strong>
                  <span>{{ statusLabel(entry.status) }}</span>
                </div>
                <small>
                  来自 {{ entry.sourceWorldBook || '未归属' }} · {{ entry.contentChars }} 字
                </small>
                <p class="entry-meta">
                  {{ candidateReason(entry) }}
                </p>
              </article>
            </div>
          </details>
        </div>

        <div
          v-show="activeWorkspace === 'messages'"
          class="panel step-panel"
        >
          <div class="panel-head">
            <div>
              <h2>3. 看最终会发给模型什么</h2>
              <p class="muted compact">
                小白会把固定规则、预设、角色卡、世界书、历史和你的本次输入组装成这些内容。
              </p>
            </div>
            <label class="mini-select">
              历史
              <select v-model="historyMode">
                <option value="squash">
                  压缩历史
                </option>
                <option value="raw">
                  逐条历史
                </option>
              </select>
            </label>
          </div>
          <div class="what-to-check">
            <strong>你要判断：</strong>
            <span>最前面必须是小白固定规则；酒馆预设不能混进来；世界书和角色卡应出现在合理位置。</span>
          </div>
          <p class="context-source inline-source">
            <strong>{{ contextSourceTitle }}</strong>
            <span>{{ contextSourceDetail }}</span>
          </p>
          <div class="test-message-preview">
            <strong>本次试聊输入</strong>
            <p>{{ currentUserMessage || '还没填写。去第 4 步写一句要对角色说的话。' }}</p>
            <button
              type="button"
              @click="activeWorkspace = 'runtime'"
            >
              去试聊页修改
            </button>
          </div>
          <div class="message-preview">
            <section
              v-for="group in messageGroups"
              :key="group.key"
              class="message-group"
            >
              <div class="message-group-head">
                <strong>{{ group.label }}</strong>
                <span>{{ group.rows.length }} 条 · {{ group.chars }} 字 · ~{{ group.tokenEstimate }} tokens</span>
              </div>
              <details
                v-for="row in group.rows"
                :key="`${row.index}-${row.message.role}-${row.layer}`"
                class="message"
                :class="{ linked: row.sourceId && selectedPresetSourceId === row.sourceId }"
                open
              >
                <summary>
                  <span>{{ row.index + 1 }} · {{ roleLabel(row.message.role) }} · {{ row.label }}</span>
                  <small>{{ row.chars }} 字 · ~{{ row.tokenEstimate }} tokens</small>
                </summary>
                <pre>{{ row.message.content }}</pre>
              </details>
            </section>
          </div>
          <details class="raw-json">
            <summary>开发查看：原始 messages</summary>
            <pre>{{ rawMessagesJson }}</pre>
          </details>
        </div>

        <div
          v-show="activeWorkspace === 'runtime'"
          class="panel step-panel"
        >
          <div class="panel-head">
            <div>
              <h2>4. 试聊一句</h2>
              <p class="muted compact">
                只跑一轮验证消息结构和模型通道，结果写入小白酒馆自己的会话。
              </p>
            </div>
            <button
              type="button"
              :disabled="isRunning"
              @click="runOnce"
            >
              {{ isRunning ? '试聊中' : '试聊一句' }}
            </button>
          </div>
          <div class="what-to-check">
            <strong>你要判断：</strong>
            <span>回复是否像这张角色、是否读到了该读的世界书、是否没有暴露调试信息。</span>
          </div>
          <div
            v-if="usingLockedSessionContext"
            class="context-warning"
          >
            <strong>这次试聊会用旧会话锁定资料。</strong>
            <span>如果你刚改了角色卡或世界书，先点下面按钮改用刚读取资料，或刷新当前会话资料。</span>
            <button
              type="button"
              @click="useLiveContextForPreview"
            >
              改用刚读取资料
            </button>
          </div>
          <div class="run-card">
            <div>
              <strong>怎么试：</strong>
              <ol>
                <li>在下面写一句你要对角色说的话。</li>
                <li>点“试聊一句”。</li>
                <li>看回复像不像这个角色、有没有吃到世界书。</li>
              </ol>
            </div>
            <p class="context-source inline-source">
              <strong>{{ contextSourceTitle }}</strong>
              <span>{{ contextSourceDetail }}</span>
            </p>
          </div>
          <label class="field-label">要发给角色的一句话</label>
          <textarea
            v-model="currentUserMessage"
            class="input"
            rows="3"
          />
          <p
            v-if="runtimeError"
            class="error"
          >
            {{ runtimeError }}
          </p>
          <p
            v-if="runtimeProvider || runtimeModel"
            class="muted"
          >
            模型通道：{{ runtimeProvider || '未知通道' }} / {{ runtimeModel || '未知模型' }}
          </p>
          <p
            v-if="lastRequestSnapshot?.rawMessagesJson"
            class="muted"
          >
            发送内容检查：{{ lastRequestMatchesPreview ? '当前预览和上次实际发送一致' : '当前预览已变化，需要重新试聊' }}
          </p>
          <pre class="runtime">{{ runtimeText || '这里显示 AI 的试跑回复。' }}</pre>
          <details
            v-if="runtimeSnapshotJson"
            class="raw-json"
          >
            <summary>开发查看：本次发送记录</summary>
            <pre>{{ runtimeSnapshotJson }}</pre>
          </details>
          <p class="muted">
            这里只写入小白酒馆自己的会话，不会改动原酒馆聊天。
          </p>
          <div class="session-messages">
            <span
              v-for="message in sessionMessages"
              :key="`${message.sessionId}-${message.order}`"
            >
              {{ message.order + 1 }}. {{ roleLabel(message.role) }}
            </span>
          </div>
        </div>

        <div
          v-show="activeWorkspace === 'preset'"
          class="panel step-panel preset-workspace"
        >
          <div class="panel-head drawer-head">
            <div>
              <h2>调整小白预设</h2>
              <p class="muted compact">
                这里会影响第 3 步里最终发给模型的内容。默认规则不能直接改，需要先复制一份。
              </p>
            </div>
            <div class="panel-pills">
              <span
                v-if="presetDirty"
                class="pill warning"
              >未保存</span>
              <span class="pill">{{ preset.version }} · {{ preset.id }}</span>
            </div>
          </div>
          <div class="preset-toolbar">
            <select
              v-model="activePresetId"
              @change="selectPreset(activePresetId)"
            >
              <option :value="DEFAULT_XB_TAVERN_PRESET_ID">
                默认规则（不能直接改）
              </option>
              <option
                v-for="item in userPresets"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
            <button
              type="button"
              @click="deriveDefaultPreset"
            >
              复制一份来改
            </button>
            <button
              type="button"
              :disabled="presetIsBuiltIn"
              @click="saveCurrentPreset"
            >
              保存规则
            </button>
            <button
              type="button"
              :disabled="!presetDirty"
              @click="discardPresetChanges"
            >
              放弃改动
            </button>
            <button
              type="button"
              @click="resetToBuiltInPreset"
            >
              用回默认
            </button>
          </div>
          <p
            v-if="presetStatus"
            class="muted compact"
          >
            {{ presetStatus }}
          </p>
          <p class="muted">
            {{ preset.description }}
          </p>
          <div class="preset-editor">
            <label>
              名称
              <input
                :value="preset.name"
                :disabled="presetIsBuiltIn"
                @input="updatePresetMeta({ name: ($event.target as HTMLInputElement).value })"
              >
            </label>
            <label>
              描述
              <textarea
                :value="preset.description"
                :disabled="presetIsBuiltIn"
                rows="2"
                @input="updatePresetMeta({ description: ($event.target as HTMLTextAreaElement).value })"
              />
            </label>
            <label>
              最高优先级规则
              <textarea
                :value="preset.systemPrompt"
                :disabled="presetIsBuiltIn"
                rows="4"
                @input="updatePresetMeta({ systemPrompt: ($event.target as HTMLTextAreaElement).value })"
              />
            </label>
            <label>
              工具和行为边界
              <textarea
                :value="preset.toolPrompt"
                :disabled="presetIsBuiltIn"
                rows="3"
                @input="updatePresetMeta({ toolPrompt: ($event.target as HTMLTextAreaElement).value })"
              />
            </label>
          </div>
          <div class="preset-editor-head">
            <strong>可插入的补充规则</strong>
            <button
              type="button"
              :disabled="presetIsBuiltIn"
              @click="addPresetSection"
            >
              新增规则段
            </button>
          </div>
          <div class="preset-section-editor">
            <article
              v-for="(section, index) in preset.sections || []"
              :key="section.id || index"
              class="preset-edit-card"
              :class="{
                disabled: section.enabled === false,
                selected: selectedPresetSourceId === section.id,
              }"
              @click="selectedPresetSourceId = section.id || ''"
            >
              <div class="preset-card-head">
                <label class="inline-check">
                  <input
                    type="checkbox"
                    :checked="section.enabled !== false"
                    :disabled="presetIsBuiltIn"
                    @change="updatePresetSection(index, { enabled: ($event.target as HTMLInputElement).checked })"
                  >
                  启用
                </label>
                <span class="muted compact">
                  {{ section.locked === false ? '可变段' : '锁定段' }}
                </span>
                <div class="row-actions">
                  <button
                    type="button"
                    :disabled="presetIsBuiltIn || index === 0"
                    @click.stop="movePresetSection(index, -1)"
                  >
                    上移
                  </button>
                  <button
                    type="button"
                    :disabled="presetIsBuiltIn || index === (preset.sections || []).length - 1"
                    @click.stop="movePresetSection(index, 1)"
                  >
                    下移
                  </button>
                </div>
              </div>
              <div class="preset-edit-grid">
                <label>
                  标签
                  <input
                    :value="section.label"
                    :disabled="presetIsBuiltIn"
                    @input="updatePresetSection(index, { label: ($event.target as HTMLInputElement).value })"
                  >
                </label>
                <label>
                  消息身份
                  <select
                    :value="section.role || 'system'"
                    :disabled="presetIsBuiltIn"
                    @change="updatePresetSection(index, { role: ($event.target as HTMLSelectElement).value })"
                  >
                    <option value="system">
                      规则消息
                    </option>
                    <option value="user">
                      用户消息
                    </option>
                    <option value="assistant">
                      AI 消息
                    </option>
                  </select>
                </label>
                <label>
                  放入位置
                  <select
                    :value="section.placement || 'beforeHistory'"
                    :disabled="presetIsBuiltIn"
                    @change="updatePresetSection(index, { placement: ($event.target as HTMLSelectElement).value as XbTavernPresetSection['placement'] })"
                  >
                    <option value="top">
                      最前面
                    </option>
                    <option value="beforeCharacter">
                      角色卡之前
                    </option>
                    <option value="afterCharacter">
                      角色卡之后
                    </option>
                    <option value="beforeHistory">
                      历史之前
                    </option>
                    <option value="afterHistory">
                      历史之后
                    </option>
                    <option value="assistantPrefill">
                      回复开头
                    </option>
                  </select>
                </label>
                <button
                  type="button"
                  :disabled="presetIsBuiltIn"
                  @click.stop="removePresetSection(index)"
                >
                  删除
                </button>
              </div>
              <textarea
                :value="section.content"
                :disabled="presetIsBuiltIn"
                rows="4"
                @input="updatePresetSection(index, { content: ($event.target as HTMLTextAreaElement).value })"
              />
            </article>
          </div>
          <div class="preset-list">
            <details
              v-for="row in presetRows"
              :key="row.previewId"
              class="preset-section"
              :class="{
                disabled: row.enabled === false,
                selected: selectedPresetSourceId === row.previewId,
              }"
              @click="selectedPresetSourceId = row.previewId"
            >
              <summary>
                <span>{{ row.previewPlacement }} · {{ row.previewLabel }}</span>
                <small>{{ row.enabled === false ? '停用' : '启用' }} · {{ row.locked === false ? '可变' : '锁定' }} · {{ row.chars }} 字</small>
              </summary>
              <pre>{{ row.content }}</pre>
            </details>
          </div>
        </div>
      </section>
    </section>
  </main>
</template>
