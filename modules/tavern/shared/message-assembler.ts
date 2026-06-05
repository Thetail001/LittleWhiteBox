import type { TavernRegexApplicationSummary } from './regex';

export enum XBTavernWorldPosition {
    before = 0,
    after = 1,
    ANTop = 2,
    ANBottom = 3,
    atDepth = 4,
    EMTop = 5,
    EMBottom = 6,
    outlet = 7,
}

export enum XBTavernPromptRole {
    SYSTEM = 0,
    USER = 1,
    ASSISTANT = 2,
}

export enum XBTavernSelectiveLogic {
    AND_ANY = 0,
    NOT_ALL = 1,
    NOT_ANY = 2,
    AND_ALL = 3,
}

export type XbTavernRole = 'system' | 'user' | 'assistant' | 'tool';

export interface XbTavernMessage {
    role: XbTavernRole;
    content: string;
    name?: string;
    thoughts?: Array<{ label?: string; text?: string }>;
}

export interface XbTavernCharacter {
    id?: string;
    name?: string;
    avatar?: string;
    description?: string;
    personality?: string;
    scenario?: string;
    firstMessage?: string;
    first_mes?: string;
    mesExample?: string;
    mes_example?: string;
    creatorNotes?: string;
    creator_notes?: string;
    data?: Record<string, unknown>;
}

export interface XbTavernUser {
    id?: string;
    name?: string;
    avatar?: string;
    persona?: string;
    description?: string;
}

export interface XbTavernHistoryMessage {
    role?: XbTavernRole | 'model' | 'sys' | number;
    content?: string;
    mes?: string;
    message?: string;
    name?: string;
    is_user?: boolean;
    thoughts?: Array<{ label?: string; text?: string }>;
}

export interface XbTavernWorldBook {
    name: string;
    entries: XbTavernWorldEntry[];
    error?: string;
}

export interface XbTavernWorldEntry {
    uid?: string | number;
    id?: string | number;
    key?: string[] | string;
    keysecondary?: string[] | string;
    secondary_keys?: string[] | string;
    content?: string;
    comment?: string;
    title?: string;
    name?: string;
    order?: number;
    position?: XBTavernWorldPosition | keyof typeof XBTavernWorldPosition | string | number;
    role?: XbTavernRole | XBTavernPromptRole | number | string;
    depth?: number;
    constant?: boolean;
    disable?: boolean;
    disabled?: boolean;
    decorators?: string[] | string;
    selective?: boolean;
    selectiveLogic?: XBTavernSelectiveLogic | number;
    selective_logic?: XBTavernSelectiveLogic | number;
    caseSensitive?: boolean;
    case_sensitive?: boolean;
    matchWholeWords?: boolean;
    match_whole_words?: boolean;
    probability?: number;
    useProbability?: boolean;
    useProbabilityGlobal?: boolean;
    sticky?: number | boolean;
    cooldown?: number;
    delay?: number;
    outlet?: string;
    outletName?: string;
    world?: string;
    worldName?: string;
    sourceWorldBook?: string;
    extensions?: Record<string, unknown>;
}

export interface XbTavernContext {
    character?: XbTavernCharacter;
    user?: XbTavernUser;
    history?: XbTavernHistoryMessage[];
    worldBooks?: XbTavernWorldBook[];
    worldEntries?: XbTavernWorldEntry[];
    sessionMeta?: Record<string, unknown>;
}

export type TavernChatPromptPlacement =
    | 'top'
    | 'beforeCharacter'
    | 'afterCharacter'
    | 'beforeHistory'
    | 'afterHistory'
    | 'assistantPrefill';

export interface TavernChatPromptSection {
    id?: string;
    label?: string;
    locked?: boolean;
    enabled?: boolean;
    marker?: boolean;
    role?: XbTavernRole | XBTavernPromptRole | number | string;
    content?: string;
    placement?: TavernChatPromptPlacement;
    source?: 'promptManager' | 'systemPrompt' | 'contextTemplate' | 'instructTemplate' | 'manual' | string;
}

export interface TavernChatPromptPresetBundle {
    id?: string;
    name?: string;
    description?: string;
    version?: string;
    source?: 'sillytavern' | string;
    selected?: boolean;
    promptManager?: {
        name?: string;
        prompts?: unknown[];
        promptOrder?: unknown;
        rawPreset?: Record<string, unknown>;
        activeCharacterId?: string | number;
        activeOrder?: unknown[];
    };
    systemPrompt?: {
        name?: string;
        enabled?: boolean;
        content?: string;
        postHistory?: string;
    };
    contextTemplate?: {
        name?: string;
        storyString?: string;
        chatStart?: string;
        exampleSeparator?: string;
    };
    instructTemplate?: {
        name?: string;
        enabled?: boolean;
        inputSequence?: string;
        inputSuffix?: string;
        outputSequence?: string;
        outputSuffix?: string;
        systemSequence?: string;
        systemSuffix?: string;
        firstInputSequence?: string;
        lastInputSequence?: string;
        firstOutputSequence?: string;
        lastOutputSequence?: string;
        stopSequence?: string;
    };
    historySeparator?: string;
    sections?: TavernChatPromptSection[];
    updatedAt?: number;
}

export type XbTavernPresetPlacement = TavernChatPromptPlacement;
export type XbTavernPresetSection = TavernChatPromptSection;
export type XbTavernPreset = TavernChatPromptPresetBundle;

export interface XbTavernRuntimeState {
    currentUserMessage?: string;
    historyMode?: 'raw' | 'squash';
    squashRole?: XbTavernRole;
    worldScanText?: string;
    worldSettings?: XbTavernWorldSettings;
    memoryContext?: XbTavernMemoryContext;
    turn?: number;
    entryStates?: Record<string, XbTavernWorldEntryState>;
}

export interface XbTavernMemoryContext {
    episodeSummaries?: XbTavernMemoryEpisodeSummary[];
    turnSummaries?: XbTavernMemoryTurnSummary[];
    memoryFiles?: XbTavernMemoryFileSummary[];
}

export interface XbTavernMemoryFileSummary {
    path?: string;
    title?: string;
    content?: string;
    recallReason?: string;
    recallScore?: number;
}

export interface XbTavernMemoryEpisodeSummary {
    id?: string;
    title?: string;
    summary?: string;
    startTurn?: number;
    endTurn?: number;
    keyChanges?: string[];
    unresolved?: string[];
    recallReason?: string;
    recallScore?: number;
}

export interface XbTavernMemoryTurnSummary {
    id?: string;
    turn?: number;
    summary?: string;
    episodeId?: string;
    userOrder?: number;
    assistantOrder?: number;
    characterState?: string;
    relationshipChange?: string;
    locationTimeItems?: string;
    hooks?: string[];
    tags?: string[];
    recallReason?: string;
    recallScore?: number;
}

export interface XbTavernWorldEntryState {
    stickyUntilTurn?: number;
    cooldownUntilTurn?: number;
    delayUntilTurn?: number;
}

export interface XbTavernWorldSettings {
    scanText?: string;
    caseSensitive?: boolean;
    matchWholeWords?: boolean;
    budgetChars?: number;
    recursion?: boolean;
    recursionLimit?: number;
    turn?: number;
    entryStates?: Record<string, XbTavernWorldEntryState>;
    random?: () => number;
}

export interface ActivatedWorldEntry extends XbTavernWorldEntry {
    uid: string | number;
    activationKey: string;
    content: string;
    key: string[];
    keysecondary: string[];
    decorators: string[];
    position: XBTavernWorldPosition;
    role: XbTavernRole;
    order: number;
    depth: number;
    activationReason: string;
    sourceWorldBook: string;
    contentChars: number;
}

export interface XbTavernWorldEntryCandidate {
    uid: string | number;
    activationKey: string;
    title: string;
    sourceWorldBook: string;
    content: string;
    contentChars: number;
    key: string[];
    keysecondary: string[];
    matchedKeys: string[];
    matchedSecondaryKeys: string[];
    decorators: string[];
    position: XBTavernWorldPosition;
    positionLabel: string;
    role: XbTavernRole;
    order: number;
    depth: number;
    status: string;
    activationReason: string;
    budgetUsedBefore?: number;
    budgetRemainingBefore?: number;
    budgetShortfall?: number;
    insertionTarget: string;
}

export interface XbTavernMessageLayer {
    index: number;
    role: XbTavernRole;
    layer: string;
    label: string;
    sourceId?: string;
    chars: number;
    tokenEstimate: number;
}

export interface XbTavernMessageBuildResult {
    messages: XbTavernMessage[];
    messageLayers: XbTavernMessageLayer[];
    activatedWorldEntries: ActivatedWorldEntry[];
    worldEntryCandidates: XbTavernWorldEntryCandidate[];
    outlets: Record<string, string>;
    meta: {
        scanText: string;
        scanTextChars: number;
        historyMode: 'raw' | 'squash';
        squashedHistory: boolean;
        rawMessagesJson: string;
        regexApplications?: TavernRegexApplicationSummary;
        worldBudget: {
            enabled: boolean;
            limit: number;
            used: number;
            remaining: number;
            activatedChars: number;
            skippedChars: number;
        };
        worldPositionCounts: Record<string, number>;
        worldEntryStateUpdates: Record<string, XbTavernWorldEntryState>;
    };
}

export interface XbTavernBuildSnapshot {
    chatPresetId: string;
    chatPresetName: string;
    presetId: string;
    presetName: string;
    characterId: string;
    characterName: string;
    userName: string;
    historyCount: number;
    worldBooks: Array<{ name: string; entries: number; error?: string }>;
    messageCount: number;
    messageChars: number;
    messageLayers: XbTavernMessageLayer[];
    rawMessagesJson: string;
    regexApplications?: TavernRegexApplicationSummary;
    activatedWorldEntries: Array<{
        uid: string | number;
        sourceWorldBook: string;
        title: string;
        activationReason: string;
        insertionTarget: string;
        contentChars: number;
    }>;
    worldBudget: XbTavernMessageBuildResult['meta']['worldBudget'];
    worldPositionCounts: Record<string, number>;
    scanTextChars: number;
    diagnostics?: unknown;
}

export type XbTavernWorldEntriesTransform = (entries: ActivatedWorldEntry[]) => ActivatedWorldEntry[] | Promise<ActivatedWorldEntry[]>;
export type XbTavernConversationMessagesTransform = (messages: XbTavernMessage[]) => XbTavernMessage[] | Promise<XbTavernMessage[]>;

const ROLE_BY_NUMBER: Record<number, XbTavernRole> = {
    [XBTavernPromptRole.SYSTEM]: 'system',
    [XBTavernPromptRole.USER]: 'user',
    [XBTavernPromptRole.ASSISTANT]: 'assistant',
};

const POSITION_ALIASES: Record<string, XBTavernWorldPosition> = {
    before: XBTavernWorldPosition.before,
    before_char: XBTavernWorldPosition.before,
    beforeCharacter: XBTavernWorldPosition.before,
    after: XBTavernWorldPosition.after,
    after_char: XBTavernWorldPosition.after,
    afterCharacter: XBTavernWorldPosition.after,
    atDepth: XBTavernWorldPosition.atDepth,
    depth: XBTavernWorldPosition.atDepth,
    outlet: XBTavernWorldPosition.outlet,
    ANTop: XBTavernWorldPosition.ANTop,
    ANBottom: XBTavernWorldPosition.ANBottom,
    EMTop: XBTavernWorldPosition.EMTop,
    EMBottom: XBTavernWorldPosition.EMBottom,
};

const POSITION_LABELS: Record<XBTavernWorldPosition, string> = {
    [XBTavernWorldPosition.before]: 'before character',
    [XBTavernWorldPosition.after]: 'after character',
    [XBTavernWorldPosition.ANTop]: 'author note top',
    [XBTavernWorldPosition.ANBottom]: 'author note bottom',
    [XBTavernWorldPosition.atDepth]: 'depth',
    [XBTavernWorldPosition.EMTop]: 'example top',
    [XBTavernWorldPosition.EMBottom]: 'example bottom',
    [XBTavernWorldPosition.outlet]: 'outlet',
};

const PLACEMENT_ORDER = [
    'top',
    'beforeCharacter',
    'afterCharacter',
    'beforeHistory',
    'afterHistory',
    'assistantPrefill',
] as const;

interface NormalizedPresetSection {
    id?: string;
    label?: string;
    enabled: boolean;
    marker: boolean;
    role: XbTavernRole;
    content: string;
    placement: TavernChatPromptPlacement;
    source?: string;
}

function normalizeText(value: unknown = ''): string {
    return String(value || '').trim();
}

function pickNestedString(source: unknown, keys: string[]): string {
    if (!source || typeof source !== 'object') {return '';}
    const record = source as Record<string, unknown>;
    for (const key of keys) {
        const text = normalizeText(record[key]);
        if (text) {return text;}
    }
    return '';
}

export function normalizeRole(role: unknown, fallback: XbTavernRole = 'system'): XbTavernRole {
    if (typeof role === 'number' && ROLE_BY_NUMBER[role]) {return ROLE_BY_NUMBER[role];}
    const normalized = String(role || '').trim().toLowerCase();
    if (normalized === 'model') {return 'assistant';}
    if (normalized === 'sys') {return 'system';}
    return ['system', 'user', 'assistant', 'tool'].includes(normalized) ? normalized as XbTavernRole : fallback;
}

function makeMessage(role: unknown, content: unknown, extra: Partial<XbTavernMessage> = {}): XbTavernMessage | null {
    const text = normalizeText(content);
    if (!text) {return null;}
    return {
        role: normalizeRole(role),
        content: text,
        ...extra,
    };
}

function normalizeThoughtBlocks(value: unknown): Array<{ label: string; text: string }> {
    if (!Array.isArray(value)) {return [];}
    return value
        .map((thought, index) => {
            const record = thought && typeof thought === 'object' ? thought as Record<string, unknown> : {};
            const text = normalizeText(record.text);
            if (!text) {return null;}
            return {
                label: normalizeText(record.label) || `reasoning ${index + 1}`,
                text,
            };
        })
        .filter((thought): thought is { label: string; text: string } => !!thought);
}

function renderPromptReasoning(thoughts: Array<{ label?: string; text?: string }> = []): string {
    const normalized = normalizeThoughtBlocks(thoughts);
    if (!normalized.length) {return '';}
    return [
        '<reasoning>',
        ...normalized.map((thought) => [
            `<thought label="${normalizeText(thought.label).replace(/"/g, '&quot;')}">`,
            thought.text,
            '</thought>',
        ].join('\n')),
        '</reasoning>',
    ].join('\n');
}

function appendPromptReasoningToMessage(message: XbTavernMessage): XbTavernMessage {
    const { thoughts: _thoughts, ...providerMessage } = message;
    if (message.role !== 'assistant') {return providerMessage;}
    const reasoning = renderPromptReasoning(message.thoughts || []);
    if (!reasoning) {return providerMessage;}
    return {
        ...providerMessage,
        content: [message.content, reasoning].filter(Boolean).join('\n\n'),
    };
}

function compactMessages(messages: Array<XbTavernMessage | null>): XbTavernMessage[] {
    return messages.filter((message): message is XbTavernMessage => !!message && !!normalizeText(message.content));
}

interface XbTavernMessageUnit {
    message: XbTavernMessage | null;
    layer: string;
    label: string;
    sourceId?: string;
}

function makeMessageUnit(
    role: unknown,
    content: unknown,
    layer = 'unknown',
    label = '',
    extra: Partial<XbTavernMessage> = {},
    sourceId = '',
): XbTavernMessageUnit {
    return {
        message: makeMessage(role, content, extra),
        layer,
        label: label || layer,
        sourceId: normalizeText(sourceId),
    };
}

function compactMessageUnits(units: XbTavernMessageUnit[] = []): { messages: XbTavernMessage[]; messageLayers: XbTavernMessageLayer[] } {
    const messages: XbTavernMessage[] = [];
    const messageLayers: XbTavernMessageLayer[] = [];
    units.forEach((unit) => {
        if (!unit.message || !normalizeText(unit.message.content)) {return;}
        const index = messages.length;
        messages.push(unit.message);
        const chars = unit.message.content.length;
        messageLayers.push({
            index,
            role: unit.message.role,
            layer: unit.layer,
            label: unit.label,
            sourceId: unit.sourceId || undefined,
            chars,
            tokenEstimate: Math.max(1, Math.ceil(chars / 4)),
        });
    });
    return { messages, messageLayers };
}

function normalizeStringArray(value: unknown): string[] {
    if (Array.isArray(value)) {
        return value.map((item) => normalizeText(item)).filter(Boolean);
    }
    const text = normalizeText(value);
    return text ? [text] : [];
}

function stripDecorators(content = ''): { decorators: string[]; content: string } {
    const decorators: string[] = [];
    const lines = String(content || '').split('\n');
    let cursor = 0;

    while (cursor < lines.length && lines[cursor].startsWith('@@')) {
        const line = lines[cursor].trim();
        if (line) {decorators.push(line.startsWith('@@@') ? line.slice(1) : line);}
        cursor += 1;
    }

    return {
        decorators,
        content: lines.slice(cursor).join('\n').trim(),
    };
}

function resolveWorldPosition(position: XbTavernWorldEntry['position']): XBTavernWorldPosition {
    if (typeof position === 'number' && Object.values(XBTavernWorldPosition).includes(position)) {
        return position as XBTavernWorldPosition;
    }
    const key = String(position || '').trim();
    return Object.prototype.hasOwnProperty.call(POSITION_ALIASES, key)
        ? POSITION_ALIASES[key]
        : XBTavernWorldPosition.after;
}

function normalizeEntry(entry: XbTavernWorldEntry = {}, index = 0): ActivatedWorldEntry {
    const stripped = stripDecorators(entry.content || '');
    const rawUid = entry.uid ?? entry.id ?? entry.comment ?? entry.name ?? index + 1;
    const sourceWorldBook = normalizeText(entry.sourceWorldBook || entry.worldName || entry.world);
    const content = stripped.content || normalizeText(entry.content);
    return {
        ...entry,
        uid: rawUid,
        activationKey: makeWorldEntryKey(sourceWorldBook, rawUid, index),
        content,
        decorators: [
            ...normalizeStringArray(entry.decorators),
            ...stripped.decorators,
        ],
        key: normalizeStringArray(entry.key),
        keysecondary: [
            ...normalizeStringArray(entry.keysecondary),
            ...normalizeStringArray(entry.secondary_keys),
        ],
        order: Number(entry.order) || 0,
        depth: Number.isFinite(Number(entry.depth)) ? Number(entry.depth) : 4,
        role: normalizeRole(entry.role, 'system'),
        position: resolveWorldPosition(entry.position),
        activationReason: '',
        sourceWorldBook,
        contentChars: content.length,
    };
}

function makeWorldEntryKey(sourceWorldBook: unknown, uid: unknown, index = 0): string {
    const source = normalizeText(sourceWorldBook) || 'direct';
    const id = normalizeText(uid) || `index:${index}`;
    return `${source}\u0000${id}`;
}

export function describeWorldPosition(position: XBTavernWorldPosition): string {
    return POSITION_LABELS[position] || 'after character';
}

function buildMatcher(settings: XbTavernWorldSettings = {}, entry?: XbTavernWorldEntry) {
    const caseSensitive = !!(entry?.caseSensitive ?? entry?.case_sensitive ?? settings.caseSensitive);
    const matchWholeWords = !!(entry?.matchWholeWords ?? entry?.match_whole_words ?? settings.matchWholeWords);
    const source = caseSensitive ? String(settings.scanText || '') : String(settings.scanText || '').toLowerCase();

    return (keyword = '') => {
        const rawKeyword = String(keyword || '').trim();
        if (!rawKeyword) {return false;}
        const key = caseSensitive ? rawKeyword : rawKeyword.toLowerCase();
        if (!matchWholeWords) {return source.includes(key);}
        const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pattern = new RegExp(`(^|[^\\p{L}\\p{N}_])${escaped}($|[^\\p{L}\\p{N}_])`, caseSensitive ? 'u' : 'iu');
        return pattern.test(source);
    };
}

function secondaryMatches(entry: ActivatedWorldEntry, matchesKeyword: (keyword: string) => boolean): boolean {
    if (entry.selective === false) {return true;}
    if (!entry.keysecondary.length) {return true;}
    const matches = entry.keysecondary.map((keyword) => matchesKeyword(keyword));
    const hasAny = matches.some(Boolean);
    const hasAll = matches.every(Boolean);
    const logic = Number(entry.selectiveLogic ?? entry.selective_logic ?? XBTavernSelectiveLogic.AND_ANY);

    switch (logic) {
        case XBTavernSelectiveLogic.NOT_ALL:
            return !hasAll;
        case XBTavernSelectiveLogic.NOT_ANY:
            return !hasAny;
        case XBTavernSelectiveLogic.AND_ALL:
            return hasAll;
        case XBTavernSelectiveLogic.AND_ANY:
        default:
            return hasAny;
    }
}

function getEntryState(settings: XbTavernWorldSettings, entry: ActivatedWorldEntry): XbTavernWorldEntryState {
    return settings.entryStates?.[entry.activationKey] || settings.entryStates?.[String(entry.uid)] || {};
}

function isStickyActive(entry: ActivatedWorldEntry, settings: XbTavernWorldSettings): boolean {
    const turn = Number(settings.turn) || 0;
    const state = getEntryState(settings, entry);
    return Number(state.stickyUntilTurn) >= turn;
}

function shouldPassProbability(entry: ActivatedWorldEntry, settings: XbTavernWorldSettings): boolean {
    if (entry.useProbability === false || entry.useProbabilityGlobal === false) {return true;}
    if (isStickyActive(entry, settings)) {return true;}
    const raw = Number(entry.probability);
    if (!Number.isFinite(raw) || raw <= 0) {return raw !== 0;}
    const probability = raw > 1 ? raw / 100 : raw;
    if (probability >= 1) {return true;}
    const random = settings.random || Math.random;
    return random() <= probability;
}

function activationReasonForEntry(entry: ActivatedWorldEntry, settings: XbTavernWorldSettings): string {
    if (entry.disable === true || entry.disabled === true) {return '';}

    const turn = Number(settings.turn) || 0;
    const state = getEntryState(settings, entry);
    const stickyActive = isStickyActive(entry, settings);
    if (Number(state.delayUntilTurn) > turn) {return '';}
    if (Number(entry.delay) > 0 && turn < Number(entry.delay)) {return '';}
    if (Number(state.cooldownUntilTurn) > turn && !stickyActive) {return '';}
    if (entry.decorators.includes('@@activate')) {return 'decorator';}
    if (entry.decorators.includes('@@dont_activate')) {return '';}
    if (entry.constant === true) {return 'constant';}
    if (stickyActive) {return 'sticky';}

    const matchesKeyword = buildMatcher(settings, entry);
    const hasPrimary = entry.key.some((keyword) => matchesKeyword(keyword));
    if (!hasPrimary) {return '';}
    if (!secondaryMatches(entry, matchesKeyword)) {return '';}
    return 'keyword';
}

function explainEntryStatus(entry: ActivatedWorldEntry, settings: XbTavernWorldSettings): { status: string; activationReason: string } {
    if (entry.disable === true || entry.disabled === true) {return { status: 'disabled', activationReason: '' };}

    const turn = Number(settings.turn) || 0;
    const state = getEntryState(settings, entry);
    const stickyActive = isStickyActive(entry, settings);
    if (Number(state.delayUntilTurn) > turn || (Number(entry.delay) > 0 && turn < Number(entry.delay))) {
        return { status: 'delay', activationReason: '' };
    }
    if (Number(state.cooldownUntilTurn) > turn && !stickyActive) {return { status: 'cooldown', activationReason: '' };}
    if (entry.decorators.includes('@@activate')) {return { status: 'activated', activationReason: 'decorator' };}
    if (entry.decorators.includes('@@dont_activate')) {return { status: 'suppressed_by_decorator', activationReason: '' };}
    if (entry.constant === true) {return { status: 'activated', activationReason: 'constant' };}
    if (stickyActive) {return { status: 'activated', activationReason: 'sticky' };}

    const matchesKeyword = buildMatcher(settings, entry);
    const hasPrimary = entry.key.some((keyword) => matchesKeyword(keyword));
    if (!hasPrimary) {return { status: 'not_matched', activationReason: '' };}
    if (!secondaryMatches(entry, matchesKeyword)) {return { status: 'secondary_not_matched', activationReason: '' };}
    return { status: 'activated', activationReason: 'keyword' };
}

function sortWorldEntries(left: ActivatedWorldEntry, right: ActivatedWorldEntry): number {
    return right.order - left.order || left.activationKey.localeCompare(right.activationKey, 'en');
}

function getWorldBudgetLimit(settings: XbTavernWorldSettings): number {
    const budget = Number(settings.budgetChars);
    return Number.isFinite(budget) && budget > 0 ? budget : 0;
}

function buildWorldBudgetDebug(sortedEntries: ActivatedWorldEntry[] = [], settings: XbTavernWorldSettings = {}): {
    includedKeys: Set<string>;
    byKey: Map<string, Pick<XbTavernWorldEntryCandidate, 'budgetUsedBefore' | 'budgetRemainingBefore' | 'budgetShortfall'>>;
    enabled: boolean;
    limit: number;
    used: number;
    remaining: number;
    activatedChars: number;
    skippedChars: number;
} {
    const limit = getWorldBudgetLimit(settings);
    const enabled = limit > 0;
    const includedKeys = new Set<string>();
    const byKey = new Map<string, Pick<XbTavernWorldEntryCandidate, 'budgetUsedBefore' | 'budgetRemainingBefore' | 'budgetShortfall'>>();
    const result: ActivatedWorldEntry[] = [];
    let used = 0;
    let skippedChars = 0;

    sortedEntries.forEach((entry) => {
        const size = entry.content.length;
        if (!size) {return;}
        const remaining = enabled ? Math.max(0, limit - used) : Number.POSITIVE_INFINITY;
        byKey.set(entry.activationKey, {
            budgetUsedBefore: used,
            budgetRemainingBefore: enabled ? remaining : undefined,
            budgetShortfall: enabled && used + size > limit ? used + size - limit : undefined,
        });
        if (enabled && used + size > limit) {
            skippedChars += size;
            return;
        }
        result.push(entry);
        includedKeys.add(entry.activationKey);
        used += size;
    });

    return {
        includedKeys,
        byKey,
        enabled,
        limit,
        used,
        remaining: enabled ? Math.max(0, limit - used) : 0,
        activatedChars: used,
        skippedChars,
    };
}

function applyWorldBudget(entries: ActivatedWorldEntry[], settings: XbTavernWorldSettings): ActivatedWorldEntry[] {
    const debug = buildWorldBudgetDebug(entries, settings);
    if (!debug.enabled) {return entries;}
    return entries.filter((entry) => debug.includedKeys.has(entry.activationKey));
}

export function activateWorldEntries(
    entries: XbTavernWorldEntry[] = [],
    scanStateOrSettings: XbTavernWorldSettings | { scanText?: string } = {},
    settings: XbTavernWorldSettings = {},
): ActivatedWorldEntry[] {
    const baseSettings = {
        ...scanStateOrSettings,
        ...settings,
        scanText: settings.scanText ?? scanStateOrSettings.scanText ?? '',
    };
    const normalizedEntries = (Array.isArray(entries) ? entries : []).map((entry, index) => normalizeEntry(entry, index));
    const recursionLimit = Math.max(1, Number(baseSettings.recursionLimit) || 1);
    const allowRecursion = !!baseSettings.recursion;
    const activated = new Map<string, ActivatedWorldEntry>();
    let scanText = String(baseSettings.scanText || '');

    for (let pass = 0; pass < (allowRecursion ? recursionLimit : 1); pass += 1) {
        const passSettings = { ...baseSettings, scanText };
        let changed = false;
        normalizedEntries.forEach((entry) => {
            const key = entry.activationKey;
            if (activated.has(key)) {return;}
            const activationReason = activationReasonForEntry(entry, passSettings);
            if (!activationReason) {return;}
            if (!shouldPassProbability(entry, passSettings)) {return;}
            activated.set(key, { ...entry, activationReason });
            scanText += `\n${entry.content}`;
            changed = true;
        });
        if (!allowRecursion || !changed) {break;}
    }

    return applyWorldBudget([...activated.values()].sort(sortWorldEntries), baseSettings);
}

function buildWorldEntryCandidates(
    entries: XbTavernWorldEntry[] = [],
    activatedEntries: ActivatedWorldEntry[] = [],
    settings: XbTavernWorldSettings = {},
    budgetDebug = buildWorldBudgetDebug(activatedEntries, settings),
): XbTavernWorldEntryCandidate[] {
    const activatedByKey = new Map(activatedEntries.map((entry) => [entry.activationKey, entry]));
    const budgetIncluded = budgetDebug.includedKeys;
    return (Array.isArray(entries) ? entries : []).map((entry, index) => {
        const normalized = normalizeEntry(entry, index);
        const activated = activatedByKey.get(normalized.activationKey);
        const budgetInfo = budgetDebug.byKey.get(normalized.activationKey) || {};
        const explanation = activated
            ? { status: 'activated', activationReason: activated.activationReason }
            : explainEntryStatus(normalized, settings);
        const matcher = buildMatcher(settings, normalized);
        const status = activated
            ? (budgetDebug.enabled && !budgetIncluded.has(normalized.activationKey) ? 'budget_skipped' : 'activated')
            : (explanation.status === 'activated' ? 'probability_failed' : explanation.status);
        return {
            uid: normalized.uid,
            activationKey: normalized.activationKey,
            title: normalizeText(normalized.comment || normalized.title || normalized.name || normalized.uid),
            sourceWorldBook: normalized.sourceWorldBook,
            content: normalized.content,
            contentChars: normalized.contentChars,
            key: normalized.key,
            keysecondary: normalized.keysecondary,
            matchedKeys: normalized.key.filter((keyword) => matcher(keyword)),
            matchedSecondaryKeys: normalized.keysecondary.filter((keyword) => matcher(keyword)),
            decorators: normalized.decorators,
            position: normalized.position,
            positionLabel: describeWorldPosition(normalized.position),
            role: normalized.role,
            order: normalized.order,
            depth: normalized.depth,
            status,
            activationReason: activated?.activationReason || explanation.activationReason,
            insertionTarget: insertionTargetForEntry(normalized),
            ...budgetInfo,
        };
    });
}

function insertionTargetForEntry(entry: Pick<ActivatedWorldEntry, 'position' | 'depth' | 'outletName' | 'outlet'>): string {
    switch (entry.position) {
        case XBTavernWorldPosition.before:
            return 'before character card';
        case XBTavernWorldPosition.after:
            return 'after character card';
        case XBTavernWorldPosition.atDepth:
            return `history depth ${Math.max(0, Number(entry.depth) || 0)}`;
        case XBTavernWorldPosition.ANTop:
            return 'author note top';
        case XBTavernWorldPosition.ANBottom:
            return 'author note bottom';
        case XBTavernWorldPosition.EMTop:
            return 'example messages top';
        case XBTavernWorldPosition.EMBottom:
            return 'example messages bottom';
        case XBTavernWorldPosition.outlet:
            return `outlet:${normalizeText(entry.outletName || entry.outlet || 'default')}`;
        default:
            return describeWorldPosition(entry.position);
    }
}

interface WorldBuckets {
    before: ActivatedWorldEntry[];
    after: ActivatedWorldEntry[];
    atDepth: ActivatedWorldEntry[];
    outlet: Record<string, ActivatedWorldEntry[]>;
    examplesTop: ActivatedWorldEntry[];
    examplesBottom: ActivatedWorldEntry[];
    authorNoteTop: ActivatedWorldEntry[];
    authorNoteBottom: ActivatedWorldEntry[];
}

function groupWorldEntries(entries: ActivatedWorldEntry[] = []): WorldBuckets {
    const buckets: WorldBuckets = {
        before: [],
        after: [],
        atDepth: [],
        outlet: {},
        examplesTop: [],
        examplesBottom: [],
        authorNoteTop: [],
        authorNoteBottom: [],
    };

    entries.forEach((entry) => {
        if (!entry.content) {return;}
        switch (entry.position) {
            case XBTavernWorldPosition.before:
                buckets.before.push(entry);
                break;
            case XBTavernWorldPosition.atDepth:
                buckets.atDepth.push(entry);
                break;
            case XBTavernWorldPosition.outlet: {
                const outletName = normalizeText(entry.outletName || entry.outlet || 'default');
                buckets.outlet[outletName] = buckets.outlet[outletName] || [];
                buckets.outlet[outletName].push(entry);
                break;
            }
            case XBTavernWorldPosition.EMTop:
                buckets.examplesTop.push(entry);
                break;
            case XBTavernWorldPosition.EMBottom:
                buckets.examplesBottom.push(entry);
                break;
            case XBTavernWorldPosition.ANTop:
                buckets.authorNoteTop.push(entry);
                break;
            case XBTavernWorldPosition.ANBottom:
                buckets.authorNoteBottom.push(entry);
                break;
            case XBTavernWorldPosition.after:
            default:
                buckets.after.push(entry);
                break;
        }
    });

    return buckets;
}

function countWorldPositions(entries: ActivatedWorldEntry[] = []): Record<string, number> {
    const counts: Record<string, number> = {};
    entries.forEach((entry) => {
        const target = insertionTargetForEntry(entry);
        counts[target] = (counts[target] || 0) + 1;
    });
    return counts;
}

function buildWorldEntryStateUpdates(entries: ActivatedWorldEntry[] = [], settings: XbTavernWorldSettings = {}): Record<string, XbTavernWorldEntryState> {
    const turn = Number(settings.turn) || 0;
    const updates: Record<string, XbTavernWorldEntryState> = {};
    entries.forEach((entry) => {
        const key = entry.activationKey;
        const update: XbTavernWorldEntryState = {};
        const sticky = entry.sticky === true ? 1 : Number(entry.sticky);
        const cooldown = Number(entry.cooldown);
        const delay = Number(entry.delay);
        if (Number.isFinite(sticky) && sticky > 0) {
            update.stickyUntilTurn = turn + sticky;
        }
        if (Number.isFinite(cooldown) && cooldown > 0) {
            update.cooldownUntilTurn = turn + cooldown;
        }
        if (Number.isFinite(delay) && delay > 0) {
            update.delayUntilTurn = turn + delay;
        }
        if (Object.keys(update).length) {
            updates[key] = update;
        }
    });
    return updates;
}

function renderEntryBlock(title: string, entries: ActivatedWorldEntry[] = []): string {
    const content = entries.map((entry) => entry.content).filter(Boolean).join('\n\n');
    return content ? `<${title}>\n${content}\n</${title}>` : '';
}

function buildCharacterBlock(character: XbTavernCharacter = {}, user: XbTavernUser = {}): string {
    const data = character.data || {};
    const fields = [
        ['Character', character.name || pickNestedString(data, ['name'])],
        ['User', user.name],
        ['Description', character.description || pickNestedString(data, ['description'])],
        ['Personality', character.personality || pickNestedString(data, ['personality'])],
        ['Scenario', character.scenario || pickNestedString(data, ['scenario'])],
        ['Creator Notes', character.creatorNotes || character.creator_notes || pickNestedString(data, ['creator_notes'])],
        ['First Message', character.firstMessage || character.first_mes || pickNestedString(data, ['first_mes'])],
        ['Message Examples', character.mesExample || character.mes_example || pickNestedString(data, ['mes_example'])],
        ['User Persona', user.persona || user.description],
    ]
        .map(([label, value]) => {
            const text = normalizeText(value);
            return text ? `## ${label}\n${text}` : '';
        })
        .filter(Boolean);

    return fields.length ? `<character_card>\n${fields.join('\n\n')}\n</character_card>` : '';
}

function buildSingleCharacterFieldBlock(title: string, content: unknown): string {
    const text = normalizeText(content);
    return text ? `## ${title}\n${text}` : '';
}

function formatMemoryList(items: unknown[] = []): string {
    return items.map((item) => normalizeText(item)).filter(Boolean).map((item) => `- ${item}`).join('\n');
}

function buildMemoryBlock(memoryContext: XbTavernMemoryContext = {}): string {
    const episodes = Array.isArray(memoryContext.episodeSummaries) ? memoryContext.episodeSummaries : [];
    const turns = Array.isArray(memoryContext.turnSummaries) ? memoryContext.turnSummaries : [];
    const memoryFiles = Array.isArray(memoryContext.memoryFiles) ? memoryContext.memoryFiles : [];
    const sections: string[] = [];

    const fileLines = memoryFiles
        .map((file) => {
            const path = normalizeText(file.path);
            const title = normalizeText(file.title) || path || '记忆档案';
            const content = normalizeText(file.content);
            return content ? `### ${title}${path ? ` (${path})` : ''}\n${content}` : '';
        })
        .filter(Boolean);
    if (fileLines.length) {
        sections.push(`## 固定记忆档案\n${fileLines.join('\n\n')}`);
    }

    const formatEpisodeLine = (episode: XbTavernMemoryEpisodeSummary) => {
        const title = normalizeText(episode.title) || '未命名阶段';
        const range = Number.isFinite(Number(episode.startTurn)) || Number.isFinite(Number(episode.endTurn))
            ? `turn ${Number(episode.startTurn) || 0}-${Number(episode.endTurn) || 0}`
            : '';
        const summary = normalizeText(episode.summary);
        const keyChanges = formatMemoryList(episode.keyChanges || []);
        const unresolved = formatMemoryList(episode.unresolved || []);
        return [
            `### ${title}${range ? ` (${range})` : ''}`,
            summary,
            keyChanges ? `关键变化：\n${keyChanges}` : '',
            unresolved ? `未解决：\n${unresolved}` : '',
        ].filter(Boolean).join('\n');
    };
    const fixedEpisodeLines = episodes
        .filter((episode) => ['current', 'open'].includes(String(episode.recallReason || '')))
        .map(formatEpisodeLine)
        .filter(Boolean);
    if (fixedEpisodeLines.length) {
        sections.push(`## 当前/未解决阶段\n${fixedEpisodeLines.join('\n\n')}`);
    }

    const matchedEpisodeLines = episodes
        .filter((episode) => !['current', 'open'].includes(String(episode.recallReason || '')))
        .map(formatEpisodeLine)
        .filter(Boolean);
    if (matchedEpisodeLines.length) {
        sections.push(`## 召回命中阶段\n${matchedEpisodeLines.join('\n\n')}`);
    }

    const turnLines = turns
        .map((turn) => {
            const source = [
                Number.isFinite(Number(turn.turn)) ? `turn ${Number(turn.turn)}` : '',
                Number.isFinite(Number(turn.userOrder)) && Number.isFinite(Number(turn.assistantOrder))
                    ? `messages ${Number(turn.userOrder)}/${Number(turn.assistantOrder)}`
                    : '',
            ].filter(Boolean).join(' · ');
            const tags = (turn.tags || []).map((tag) => normalizeText(tag)).filter(Boolean).join('、');
            const summary = normalizeText(turn.summary);
            if (!summary) {return '';}
            const details = [
                turn.characterState ? `人物状态：${normalizeText(turn.characterState)}` : '',
                turn.relationshipChange ? `关系变化：${normalizeText(turn.relationshipChange)}` : '',
                turn.locationTimeItems ? `时地物：${normalizeText(turn.locationTimeItems)}` : '',
                turn.hooks?.length ? `钩子：${turn.hooks.map((hook) => normalizeText(hook)).filter(Boolean).join('、')}` : '',
            ].filter(Boolean).join('；');
            return `- ${source ? `${source}: ` : ''}${summary}${details ? `（${details}）` : ''}${tags ? ` [${tags}]` : ''}`;
        })
        .filter(Boolean);
    if (turnLines.length) {
        sections.push(`## 召回命中小总结\n${turnLines.join('\n')}`);
    }

    return sections.length ? `<session_memory>\n${sections.join('\n\n')}\n</session_memory>` : '';
}

function normalizeChatPromptSections(chatPreset: TavernChatPromptPresetBundle = {}): NormalizedPresetSection[] {
    const source = Array.isArray(chatPreset.sections) ? chatPreset.sections : [];
    const sections = source.map((section) => ({
        id: normalizeText(section.id),
        label: normalizeText(section.label),
        enabled: section.enabled !== false,
        marker: section.marker === true,
        role: normalizeRole(section.role, 'system'),
        content: normalizeText(section.content),
        placement: PLACEMENT_ORDER.includes(section.placement as never) ? section.placement! : 'beforeHistory',
        source: normalizeText(section.source),
    })).filter((section) => section.enabled && (section.content || section.marker)) as NormalizedPresetSection[];

    return sections;
}

function pickSections(sections: NormalizedPresetSection[] = [], placement = ''): NormalizedPresetSection[] {
    return sections.filter((section) => section.placement === placement);
}

function presetSectionUnits(
    sections: NormalizedPresetSection[] = [],
    placementLabel: string,
    layer = 'preset',
): XbTavernMessageUnit[] {
    return sections.map((section, index) => ({
        message: makeMessage(section.role, section.content),
        layer,
        label: section.label || `preset ${placementLabel} ${index + 1}`,
        sourceId: section.id || undefined,
    }));
}

type XbTavernWorldBuckets = ReturnType<typeof groupWorldEntries>;

function promptMarkerIdentifier(section: NormalizedPresetSection = {} as NormalizedPresetSection): string {
    return normalizeText(section.id).replace(/^prompt-manager:/, '');
}

function buildPromptManagerOrderedUnits(options: {
    presetSections: NormalizedPresetSection[];
    character: XbTavernCharacter;
    user: XbTavernUser;
    worldBuckets: XbTavernWorldBuckets;
    historyUnits: XbTavernMessageUnit[];
    currentUserUnits: XbTavernMessageUnit[];
    memoryContext: XbTavernMemoryContext;
}): XbTavernMessageUnit[] {
    const {
        presetSections,
        character,
        user,
        worldBuckets,
        historyUnits,
        currentUserUnits,
        memoryContext,
    } = options;
    const data = character.data || {};
    const usedMarkers = new Set<string>();
    const units: XbTavernMessageUnit[] = [];
    const pushMarker = (marker: string, markerUnits: XbTavernMessageUnit[]) => {
        usedMarkers.add(marker);
        units.push(...markerUnits);
    };

    presetSections.forEach((section, index) => {
        const marker = promptMarkerIdentifier(section);
        if (section.marker) {
            switch (marker) {
                case 'worldInfoBefore':
                    pushMarker(marker, [makeMessageUnit('system', renderEntryBlock('world_info_before_character', worldBuckets.before), 'world-before', section.label || 'World Info (before)', {}, section.id)]);
                    return;
                case 'worldInfoAfter':
                    pushMarker(marker, [makeMessageUnit('system', renderEntryBlock('world_info_after_character', worldBuckets.after), 'world-after', section.label || 'World Info (after)', {}, section.id)]);
                    return;
                case 'charDescription':
                    pushMarker(marker, [makeMessageUnit(section.role, buildSingleCharacterFieldBlock('Description', character.description || pickNestedString(data, ['description'])), 'character-card', section.label || 'Char Description', {}, section.id)]);
                    return;
                case 'charPersonality':
                    pushMarker(marker, [makeMessageUnit(section.role, buildSingleCharacterFieldBlock('Personality', character.personality || pickNestedString(data, ['personality'])), 'character-card', section.label || 'Char Personality', {}, section.id)]);
                    return;
                case 'scenario':
                    pushMarker(marker, [makeMessageUnit(section.role, buildSingleCharacterFieldBlock('Scenario', character.scenario || pickNestedString(data, ['scenario'])), 'character-card', section.label || 'Scenario', {}, section.id)]);
                    return;
                case 'personaDescription':
                    pushMarker(marker, [makeMessageUnit(section.role, buildSingleCharacterFieldBlock('User Persona', user.persona || user.description), 'character-card', section.label || 'Persona Description', {}, section.id)]);
                    return;
                case 'dialogueExamples':
                    pushMarker(marker, [makeMessageUnit(section.role, buildSingleCharacterFieldBlock('Message Examples', character.mesExample || character.mes_example || pickNestedString(data, ['mes_example'])), 'character-card', section.label || 'Chat Examples', {}, section.id)]);
                    return;
                case 'chatHistory':
                    pushMarker(marker, [
                        makeMessageUnit('system', renderEntryBlock('world_info_examples_top', worldBuckets.examplesTop), 'world-examples', 'world info examples top'),
                        makeMessageUnit('system', renderEntryBlock('world_info_author_note_top', worldBuckets.authorNoteTop), 'world-author-note', 'world info author note top'),
                        ...historyUnits,
                        makeMessageUnit('system', buildMemoryBlock(memoryContext), 'memory', 'session memory'),
                        ...currentUserUnits,
                    ]);
                    return;
                default:
                    return;
            }
        }
        units.push({
            message: makeMessage(section.role, section.content),
            layer: section.source === 'promptManager' ? 'preset' : 'preset',
            label: section.label || `preset ordered ${index + 1}`,
            sourceId: section.id || undefined,
        });
    });

    if (!usedMarkers.has('worldInfoBefore')) {
        units.push(makeMessageUnit('system', renderEntryBlock('world_info_before_character', worldBuckets.before), 'world-before', 'world info before character'));
    }
    if (!usedMarkers.has('charDescription') && !usedMarkers.has('charPersonality') && !usedMarkers.has('scenario') && !usedMarkers.has('personaDescription') && !usedMarkers.has('dialogueExamples')) {
        units.push(makeMessageUnit('system', buildCharacterBlock(character, user), 'character-card', 'character card'));
    }
    if (!usedMarkers.has('worldInfoAfter')) {
        units.push(makeMessageUnit('system', renderEntryBlock('world_info_after_character', worldBuckets.after), 'world-after', 'world info after character'));
    }
    if (!usedMarkers.has('chatHistory')) {
        units.push(
            makeMessageUnit('system', renderEntryBlock('world_info_examples_top', worldBuckets.examplesTop), 'world-examples', 'world info examples top'),
            makeMessageUnit('system', renderEntryBlock('world_info_author_note_top', worldBuckets.authorNoteTop), 'world-author-note', 'world info author note top'),
            ...historyUnits,
            makeMessageUnit('system', buildMemoryBlock(memoryContext), 'memory', 'session memory'),
            ...currentUserUnits,
        );
    }
    units.push(
        makeMessageUnit('system', renderEntryBlock('world_info_author_note_bottom', worldBuckets.authorNoteBottom), 'world-author-note', 'world info author note bottom'),
        makeMessageUnit('system', renderEntryBlock('world_info_examples_bottom', worldBuckets.examplesBottom), 'world-examples', 'world info examples bottom'),
    );
    return units;
}

function normalizeHistoryMessage(message: XbTavernHistoryMessage = {}): XbTavernMessage | null {
    const role = message.is_user === true ? 'user' : normalizeRole(message.role, 'assistant');
    if (role === 'tool') {return null;}
    return makeMessage(role, message.content || message.mes || message.message, {
        ...(message.name ? { name: String(message.name) } : {}),
        ...(normalizeThoughtBlocks(message.thoughts).length ? { thoughts: normalizeThoughtBlocks(message.thoughts) } : {}),
    });
}

export function squashChatHistory(history: XbTavernHistoryMessage[] = [], options: {
    separator?: string;
    userName?: string;
    characterName?: string;
    role?: XbTavernRole;
} = {}): XbTavernMessage[] {
    const messages = (Array.isArray(history) ? history : [])
        .map((message) => normalizeHistoryMessage(message))
        .filter((message): message is XbTavernMessage => !!message);
    if (!messages.length) {return [];}

    const separator = options.separator || '\n\n';
    const role = normalizeRole(options.role, 'system');
    const content = messages.map((message) => {
        const historyRole = message.role === 'user' ? 'user' : 'assistant';
        return `<message role="${historyRole}">\n${message.content}\n</message>`;
    }).join(separator);

    return [makeMessage(role, `<conversation_history>\n${content}\n</conversation_history>`)].filter((message): message is XbTavernMessage => !!message);
}

function buildHistoryMessages(history: XbTavernHistoryMessage[] = [], options: {
    mode?: 'raw' | 'squash';
    role?: XbTavernRole;
    userName?: string;
    characterName?: string;
    separator?: string;
} = {}): XbTavernMessage[] {
    if (options.mode === 'raw') {
        return (Array.isArray(history) ? history : [])
            .map((message) => normalizeHistoryMessage(message))
            .filter((message): message is XbTavernMessage => !!message);
    }
    return squashChatHistory(history, options);
}

function buildDepthMessages(entries: ActivatedWorldEntry[] = []): Array<{ depth: number; message: XbTavernMessage }> {
    const groups = new Map<string, { depth: number; role: XbTavernRole; entries: string[] }>();
    entries.forEach((entry) => {
        const depth = Math.max(0, Number(entry.depth) || 0);
        const role = normalizeRole(entry.role, 'system');
        const key = `${depth}\u0000${role}`;
        const existing = groups.get(key) || { depth, role, entries: [] };
        existing.entries.push(entry.content);
        groups.set(key, existing);
    });
    return [...groups.values()].map((group) => ({
        depth: group.depth,
        message: makeMessage(group.role, `<world_info_depth depth="${group.depth}">\n${group.entries.join('\n\n')}\n</world_info_depth>`),
    })).filter((item): item is { depth: number; message: XbTavernMessage } => !!item.message);
}

function insertDepthMessages(messages: XbTavernMessage[] = [], depthMessages: Array<{ depth: number; message: XbTavernMessage }> = []): XbTavernMessage[] {
    if (!depthMessages.length) {return messages;}
    const slots = Array.from({ length: messages.length + 1 }, () => [] as XbTavernMessage[]);

    depthMessages.forEach((item) => {
        const depth = Math.max(0, Number(item.depth) || 0);
        const afterIndex = messages.length ? Math.max(-1, messages.length - 1 - depth) : -1;
        slots[afterIndex + 1].push(item.message);
    });

    const result = [...slots[0]];
    messages.forEach((message, index) => {
        result.push(message, ...slots[index + 1]);
    });
    return result;
}

export function buildScanText(context: XbTavernContext = {}, currentUserMessage = ''): string {
    const character = context.character || {};
    const user = context.user || {};
    const history = context.history || [];
    const data = character.data || {};
    return [
        character.name,
        character.description || pickNestedString(data, ['description']),
        character.personality || pickNestedString(data, ['personality']),
        character.scenario || pickNestedString(data, ['scenario']),
        user.name,
        user.persona || user.description,
        ...history.map((message) => message.content || message.mes || message.message || ''),
        currentUserMessage,
    ].map((item) => String(item || '')).filter(Boolean).join('\n');
}

function collectContextWorldEntries(context: XbTavernContext = {}): XbTavernWorldEntry[] {
    const hasWorldBooks = Array.isArray(context.worldBooks) && context.worldBooks.length > 0;
    const directEntries = !hasWorldBooks && Array.isArray(context.worldEntries) ? context.worldEntries.map((entry) => ({
        ...entry,
        sourceWorldBook: entry.sourceWorldBook || entry.worldName || entry.world || '',
    })) : [];
    const bookEntries = (Array.isArray(context.worldBooks) ? context.worldBooks : [])
        .flatMap((book) => Array.isArray(book.entries)
            ? book.entries.map((entry) => ({
                ...entry,
                sourceWorldBook: entry.sourceWorldBook || entry.worldName || entry.world || book.name,
            }))
            : []);
    return dedupeWorldEntries([...directEntries, ...bookEntries]);
}

function makeWorldEntryDedupeKey(entry: XbTavernWorldEntry = {}): string {
    const source = normalizeText(entry.sourceWorldBook || entry.worldName || entry.world) || 'direct';
    const rawUid = entry.uid ?? entry.id;
    const uid = normalizeText(rawUid);
    if (uid) {return `${source}\u0000uid\u0000${uid}`;}
    const title = normalizeText(entry.comment || entry.title || entry.name);
    const content = normalizeText(entry.content);
    const key = normalizeStringArray(entry.key).join('\u0001');
    const keysecondary = [
        ...normalizeStringArray(entry.keysecondary),
        ...normalizeStringArray(entry.secondary_keys),
    ].join('\u0001');
    return `${source}\u0000body\u0000${title}\u0000${key}\u0000${keysecondary}\u0000${content}`;
}

function dedupeWorldEntries(entries: XbTavernWorldEntry[] = []): XbTavernWorldEntry[] {
    const seen = new Set<string>();
    const result: XbTavernWorldEntry[] = [];
    entries.forEach((entry) => {
        const key = makeWorldEntryDedupeKey(entry);
        if (seen.has(key)) {return;}
        seen.add(key);
        result.push(entry);
    });
    return result;
}

interface PreparedXbTavernMessageBuild {
    character: XbTavernCharacter;
    user: XbTavernUser;
    history: XbTavernHistoryMessage[];
    currentUserMessage: string;
    historyMode: 'raw' | 'squash';
    squashRole?: XbTavernRole;
    memoryContext: XbTavernMemoryContext;
    presetSections: NormalizedPresetSection[];
    scanText: string;
    worldSettings: XbTavernWorldSettings;
    worldEntryCandidates: XbTavernWorldEntryCandidate[];
    activatedWorldEntries: ActivatedWorldEntry[];
    budgetDebug: ReturnType<typeof buildWorldBudgetDebug>;
    promptConversationMessages?: XbTavernMessage[];
}

function prepareXbTavernMessageBuild(
    context: XbTavernContext = {},
    chatPreset: TavernChatPromptPresetBundle = {},
    runtimeState: XbTavernRuntimeState = {},
): PreparedXbTavernMessageBuild {
    const character = context.character || {};
    const user = context.user || {};
    const history = context.history || [];
    const currentUserMessage = runtimeState.currentUserMessage || '';
    const historyMode = runtimeState.historyMode || 'raw';
    const memoryContext = runtimeState.memoryContext || {};
    const presetSections = normalizeChatPromptSections(chatPreset);
    const scanText = runtimeState.worldScanText || buildScanText(context, currentUserMessage);
    const worldSettings = {
        ...runtimeState.worldSettings,
        scanText,
        turn: runtimeState.turn ?? runtimeState.worldSettings?.turn,
        entryStates: runtimeState.entryStates ?? runtimeState.worldSettings?.entryStates,
    };
    const worldEntries = collectContextWorldEntries(context);
    const activatedBeforeBudget = activateWorldEntries(worldEntries, {
        ...worldSettings,
        budgetChars: 0,
    });
    const budgetDebug = buildWorldBudgetDebug(activatedBeforeBudget, worldSettings);
    const worldEntryCandidates = buildWorldEntryCandidates(worldEntries, activatedBeforeBudget, worldSettings, budgetDebug);
    const activatedWorldEntries = activatedBeforeBudget.filter((entry) => !budgetDebug.enabled || budgetDebug.includedKeys.has(entry.activationKey));
    return {
        character,
        user,
        history,
        currentUserMessage,
        historyMode,
        squashRole: runtimeState.squashRole,
        memoryContext,
        presetSections,
        scanText,
        worldSettings,
        worldEntryCandidates,
        activatedWorldEntries,
        budgetDebug,
    };
}

function buildPromptConversationMessages(
    prepared: PreparedXbTavernMessageBuild,
    chatPreset: TavernChatPromptPresetBundle = {},
): XbTavernMessage[] {
    const historyMessages = buildHistoryMessages(prepared.history, {
        mode: prepared.historyMode,
        role: prepared.squashRole || 'system',
        userName: prepared.user.name,
        characterName: prepared.character.name,
        separator: chatPreset.historySeparator,
    });
    const currentUser = makeMessage('user', prepared.currentUserMessage);
    return compactMessages([...historyMessages, currentUser]);
}

function buildXbTavernMessagesFromPrepared(
    chatPreset: TavernChatPromptPresetBundle = {},
    prepared: PreparedXbTavernMessageBuild,
    regexApplications?: TavernRegexApplicationSummary,
): XbTavernMessageBuildResult {
    const {
        character,
        user,
        history,
        currentUserMessage,
        historyMode,
        squashRole,
        memoryContext,
        presetSections,
        scanText,
        worldSettings,
        worldEntryCandidates,
        activatedWorldEntries,
        budgetDebug,
    } = prepared;
    const worldBuckets = groupWorldEntries(activatedWorldEntries);
    void history;
    void currentUserMessage;
    void squashRole;

    const conversationMessages = insertDepthMessages(
        (prepared.promptConversationMessages || buildPromptConversationMessages(prepared, chatPreset))
            .map(appendPromptReasoningToMessage),
        buildDepthMessages(worldBuckets.atDepth),
    );

    const topSections = presetSectionUnits(pickSections(presetSections, 'top'), 'top');
    const beforeCharacterSections = presetSectionUnits(pickSections(presetSections, 'beforeCharacter'), 'before character');
    const afterCharacterSections = presetSectionUnits(pickSections(presetSections, 'afterCharacter'), 'after character');
    const beforeHistorySections = presetSectionUnits(pickSections(presetSections, 'beforeHistory'), 'before history');
    const afterHistorySections = presetSectionUnits(pickSections(presetSections, 'afterHistory'), 'after history');
    const assistantPrefillSections = presetSectionUnits(pickSections(presetSections, 'assistantPrefill'), 'assistant prefill', 'assistant-prefill');
    const hasPromptManagerOrder = presetSections.some((section) => section.source === 'promptManager');
    const conversationUnits = conversationMessages.map((message, index) => ({
        message,
        layer: message.role === 'user' ? 'current-user/history' : 'history',
        label: `history ${index + 1}`,
    }));
    let currentUserUnitIndex = -1;
    for (let index = conversationUnits.length - 1; index >= 0; index -= 1) {
        if (conversationUnits[index]?.message?.role === 'user') {
            currentUserUnitIndex = index;
            conversationUnits[index].label = 'current user message';
            break;
        }
    }
    const historyUnits = currentUserUnitIndex >= 0 ? conversationUnits.slice(0, currentUserUnitIndex) : conversationUnits;
    const currentUserUnits = currentUserUnitIndex >= 0 ? conversationUnits.slice(currentUserUnitIndex) : [];
    const orderedPromptUnits = hasPromptManagerOrder
        ? buildPromptManagerOrderedUnits({
            presetSections,
            character,
            user,
            worldBuckets,
            historyUnits,
            currentUserUnits,
            memoryContext,
        })
        : null;
    const compacted = compactMessageUnits(orderedPromptUnits || [
        ...topSections,
        makeMessageUnit('system', renderEntryBlock('world_info_before_character', worldBuckets.before), 'world-before', 'world info before character'),
        ...beforeCharacterSections,
        makeMessageUnit('system', buildCharacterBlock(character, user), 'character-card', 'character card'),
        makeMessageUnit('system', renderEntryBlock('world_info_after_character', worldBuckets.after), 'world-after', 'world info after character'),
        ...afterCharacterSections,
        makeMessageUnit('system', renderEntryBlock('world_info_examples_top', worldBuckets.examplesTop), 'world-examples', 'world info examples top'),
        makeMessageUnit('system', renderEntryBlock('world_info_author_note_top', worldBuckets.authorNoteTop), 'world-author-note', 'world info author note top'),
        ...beforeHistorySections,
        ...historyUnits,
        makeMessageUnit('system', buildMemoryBlock(memoryContext), 'memory', 'session memory'),
        ...currentUserUnits,
        ...afterHistorySections,
        makeMessageUnit('system', renderEntryBlock('world_info_author_note_bottom', worldBuckets.authorNoteBottom), 'world-author-note', 'world info author note bottom'),
        makeMessageUnit('system', renderEntryBlock('world_info_examples_bottom', worldBuckets.examplesBottom), 'world-examples', 'world info examples bottom'),
        ...assistantPrefillSections,
    ]);
    const messages = compacted.messages;

    return {
        messages,
        messageLayers: compacted.messageLayers,
        activatedWorldEntries,
        worldEntryCandidates,
        outlets: Object.fromEntries(Object.entries(worldBuckets.outlet).map(([name, entries]) => [
            name,
            entries.map((entry) => entry.content).join('\n\n'),
        ])),
        meta: {
            scanText,
            scanTextChars: scanText.length,
            historyMode,
            squashedHistory: historyMode !== 'raw',
            rawMessagesJson: JSON.stringify(messages, null, 2),
            ...(regexApplications ? { regexApplications } : {}),
            worldBudget: {
                enabled: budgetDebug.enabled,
                limit: budgetDebug.limit,
                used: budgetDebug.used,
                remaining: budgetDebug.remaining,
                activatedChars: budgetDebug.activatedChars,
                skippedChars: budgetDebug.skippedChars,
            },
            worldPositionCounts: countWorldPositions(activatedWorldEntries),
            worldEntryStateUpdates: buildWorldEntryStateUpdates(activatedWorldEntries, worldSettings),
        },
    };
}

export function buildXbTavernMessages(
    context: XbTavernContext = {},
    chatPreset: TavernChatPromptPresetBundle = {},
    runtimeState: XbTavernRuntimeState = {},
): XbTavernMessageBuildResult {
    return buildXbTavernMessagesFromPrepared(
        chatPreset,
        prepareXbTavernMessageBuild(context, chatPreset, runtimeState),
    );
}

export async function buildXbTavernMessagesAsync(
    context: XbTavernContext = {},
    chatPreset: TavernChatPromptPresetBundle = {},
    runtimeState: XbTavernRuntimeState = {},
    options: {
        transformWorldEntries?: XbTavernWorldEntriesTransform;
        transformConversationMessages?: XbTavernConversationMessagesTransform;
        regexApplications?: TavernRegexApplicationSummary;
    } = {},
): Promise<XbTavernMessageBuildResult> {
    const prepared = prepareXbTavernMessageBuild(context, chatPreset, runtimeState);
    if (options.transformWorldEntries) {
        prepared.activatedWorldEntries = (await options.transformWorldEntries(prepared.activatedWorldEntries))
            .map((entry) => ({
                ...entry,
                content: normalizeText(entry.content),
                contentChars: normalizeText(entry.content).length,
            }))
            .filter((entry) => !!entry.content);
    }
    if (options.transformConversationMessages) {
        prepared.promptConversationMessages = compactMessages(
            (await options.transformConversationMessages(buildPromptConversationMessages(prepared, chatPreset)))
                .map((message) => ({
                    ...message,
                    content: normalizeText(message.content),
                })),
        );
    }
    return buildXbTavernMessagesFromPrepared(chatPreset, prepared, options.regexApplications);
}

export function createXbTavernBuildSnapshot(
    context: XbTavernContext = {},
    chatPreset: TavernChatPromptPresetBundle = {},
    result: XbTavernMessageBuildResult,
    diagnostics: unknown = undefined,
): XbTavernBuildSnapshot {
    const character = context.character || {};
    const user = context.user || {};
    const worldBooks = Array.isArray(context.worldBooks) ? context.worldBooks : [];
    const candidateByKey = new Map(result.worldEntryCandidates.map((entry) => [entry.activationKey, entry]));
    return {
        chatPresetId: normalizeText(chatPreset.id),
        chatPresetName: normalizeText(chatPreset.name),
        presetId: normalizeText(chatPreset.id),
        presetName: normalizeText(chatPreset.name),
        characterId: normalizeText(character.id),
        characterName: normalizeText(character.name),
        userName: normalizeText(user.name),
        historyCount: Array.isArray(context.history) ? context.history.length : 0,
        worldBooks: worldBooks.map((book) => ({
            name: normalizeText(book.name),
            entries: Array.isArray(book.entries) ? book.entries.length : 0,
            ...(book.error ? { error: normalizeText(book.error) } : {}),
        })),
        messageCount: result.messages.length,
        messageChars: result.messages.reduce((sum, message) => sum + String(message.content || '').length, 0),
        messageLayers: result.messageLayers,
        rawMessagesJson: result.meta.rawMessagesJson,
        ...(result.meta.regexApplications ? { regexApplications: result.meta.regexApplications } : {}),
        activatedWorldEntries: result.activatedWorldEntries.map((entry) => {
            const candidate = candidateByKey.get(entry.activationKey);
            return {
                uid: entry.uid,
                sourceWorldBook: entry.sourceWorldBook,
                title: candidate?.title || normalizeText(entry.comment || entry.title || entry.name || entry.uid),
                activationReason: entry.activationReason,
                insertionTarget: candidate?.insertionTarget || insertionTargetForEntry(entry),
                contentChars: entry.contentChars,
            };
        }),
        worldBudget: result.meta.worldBudget,
        worldPositionCounts: result.meta.worldPositionCounts,
        scanTextChars: result.meta.scanTextChars,
        ...(diagnostics === undefined ? {} : { diagnostics }),
    };
}
