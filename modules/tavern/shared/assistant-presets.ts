export interface TavernAssistantPreset {
    id: string;
    name: string;
    description?: string;
    version?: string;
    managerIdentityPrompt: string;
    managerContextPrompt: string;
    managerToolPrompt: string;
    managerMemoryPrompt: string;
    managerWorkflowPrompt: string;
    managerOutputPrompt: string;
    managerCustomPrompt?: string;
    memoryManagerPrompt?: string;
    updatedAt?: number;
}

export const DEFAULT_TAVERN_ASSISTANT_PRESET_ID = 'littlewhitebox-assistant-default-v1';

function normalizeText(value: unknown = ''): string {
    return String(value || '').trim();
}

function joinLines(lines: string[] = []): string {
    return lines.join('\n').trim();
}

function buildDefaultAssistantPresetSections() {
    return {
        managerIdentityPrompt: buildDefaultManagerIdentityPrompt(),
        managerContextPrompt: buildDefaultManagerContextPrompt(),
        managerToolPrompt: buildDefaultManagerToolPrompt(),
        managerMemoryPrompt: buildDefaultManagerMemoryPrompt(),
        managerWorkflowPrompt: buildDefaultManagerWorkflowPrompt(),
        managerOutputPrompt: buildDefaultManagerOutputPrompt(),
        managerCustomPrompt: '',
    };
}

export function buildDefaultManagerIdentityPrompt(): string {
    return joinLines([
        '你是小白酒馆的后台管理者，只维护当前会话的 Markdown 记忆档案，不参与角色扮演。',
        '主聊天助手负责 RP；你负责把记忆整理成可读、可编辑、可审计、可召回的会话档案。',
        '你不是主助手的附和者，也不是为了凑摘要而工作的压缩器；你的职责是让记忆层长期稳定。',
    ]);
}

export function buildDefaultManagerContextPrompt(): string {
    return joinLines([
        '你会自动拿到本轮 user/assistant 原文定位、最近小总结、最近阶段总结，以及当前已有的 memory 文件列表。',
        '这些运行时上下文是你的工作起点；是否继续读取某个 memory 文件，由你根据本轮变化自行判断。',
        '你只处理当前 session 的记忆，不推断其他会话、角色卡、世界书或外部文件里的内容。',
    ]);
}

export function buildDefaultManagerToolPrompt(): string {
    return joinLines([
        '你必须通过 MemoryList / MemoryRead / MemoryWrite / MemoryEdit / MemoryGrep 维护记忆档案；不要只在最终回复里给摘要。',
        '工具只能访问当前会话的 memory/... Markdown 文件。不要尝试修改聊天原文、角色卡、世界书、预设或插件源码。',
        '需要改同一个文件时，先读当前内容，再做最小必要改动；不要无理由整文件重写。',
    ]);
}

export function buildDefaultManagerMemoryPrompt(): string {
    return joinLines([
        '每轮至少维护一份 memory/turns/YYYYMMDD-NNNN.md，写明 Turn、Source messages、Summary、State、Relationship、Location Time Items、Hooks、Tags。',
        'memory/session.md 负责长期剧情脉络；memory/state.md 负责稳定状态；memory/episodes/*.md 负责阶段档案；memory/inbox.md 负责待判断和失败残留。',
        '记忆主形态是 Markdown 档案；结构化小总结、阶段总结和检索索引都只是从这些 Markdown 派生出来的。',
    ]);
}

export function buildDefaultManagerWorkflowPrompt(): string {
    return joinLines([
        '先判断本轮变化影响了哪些记忆文件，再按需读取相关文件，不要机械地全读一遍。',
        '至少完成本轮 turns 记录；如果本轮改变了长期脉络、稳定状态、阶段边界或待判断事项，再同步更新对应文件。',
        '写完后让记忆保持自洽：避免 turns、session、state、episode、inbox 互相打架。',
    ]);
}

export function buildDefaultManagerOutputPrompt(): string {
    return joinLines([
        '最终回复只写简短工作结论：改了哪些记忆文件，还有什么待判断。',
        '不要输出 JSON，不要写小说正文，不要把完整 Markdown 再复述一遍。',
    ]);
}

function hasStructuredManagerSections(input: Partial<TavernAssistantPreset> = {}): boolean {
    return [
        input.managerIdentityPrompt,
        input.managerContextPrompt,
        input.managerToolPrompt,
        input.managerMemoryPrompt,
        input.managerWorkflowPrompt,
        input.managerOutputPrompt,
        input.managerCustomPrompt,
    ].some((value) => normalizeText(value));
}

function normalizeLegacyManagerPrompt(input: Partial<TavernAssistantPreset> = {}): string {
    const legacy = normalizeText(input.memoryManagerPrompt);
    if (!legacy) {return '';}
    if (legacy === buildDefaultMemoryManagerPrompt()) {return '';}
    return legacy;
}

function composeManagerSystemPrompt(input: Partial<TavernAssistantPreset> = {}): string {
    const fallback = buildDefaultAssistantPresetSections();
    const sections = [
        ['身份与边界', normalizeText(input.managerIdentityPrompt) || fallback.managerIdentityPrompt],
        ['信息来源', normalizeText(input.managerContextPrompt) || fallback.managerContextPrompt],
        ['工具纪律', normalizeText(input.managerToolPrompt) || fallback.managerToolPrompt],
        ['记忆档案规则', normalizeText(input.managerMemoryPrompt) || fallback.managerMemoryPrompt],
        ['维护流程', normalizeText(input.managerWorkflowPrompt) || fallback.managerWorkflowPrompt],
        ['输出规则', normalizeText(input.managerOutputPrompt) || fallback.managerOutputPrompt],
        ['补充规则', normalizeText(input.managerCustomPrompt)],
    ].filter(([, content]) => normalizeText(content));
    const lines = ['# 后台管理者'];
    sections.forEach(([title, content]) => {
        lines.push('', `## ${title}`, String(content));
    });
    return lines.join('\n').trim();
}

export function buildTavernManagerSystemPrompt(input: Partial<TavernAssistantPreset> = {}): string {
    return composeManagerSystemPrompt(input);
}

export function buildDefaultMemoryManagerPrompt(): string {
    return composeManagerSystemPrompt(buildDefaultAssistantPresetSections());
}

export function createDefaultTavernAssistantPreset(): TavernAssistantPreset {
    const sections = buildDefaultAssistantPresetSections();
    return {
        id: DEFAULT_TAVERN_ASSISTANT_PRESET_ID,
        name: '默认助手预设',
        description: '后台记忆管理员默认规则。',
        version: '2.0.0',
        ...sections,
        memoryManagerPrompt: composeManagerSystemPrompt(sections),
    };
}

export function normalizeTavernAssistantPreset(input: Partial<TavernAssistantPreset> = {}): TavernAssistantPreset {
    const fallback = createDefaultTavernAssistantPreset();
    const id = normalizeText(input.id) || fallback.id;
    const name = normalizeText(input.name) || fallback.name;
    const legacyPrompt = hasStructuredManagerSections(input) ? '' : normalizeLegacyManagerPrompt(input);
    const normalized: TavernAssistantPreset = {
        id,
        name,
        description: String(input.description || ''),
        version: normalizeText(input.version) || fallback.version || '',
        managerIdentityPrompt: normalizeText(input.managerIdentityPrompt) || fallback.managerIdentityPrompt,
        managerContextPrompt: normalizeText(input.managerContextPrompt) || fallback.managerContextPrompt,
        managerToolPrompt: normalizeText(input.managerToolPrompt) || fallback.managerToolPrompt,
        managerMemoryPrompt: normalizeText(input.managerMemoryPrompt) || fallback.managerMemoryPrompt,
        managerWorkflowPrompt: normalizeText(input.managerWorkflowPrompt) || fallback.managerWorkflowPrompt,
        managerOutputPrompt: normalizeText(input.managerOutputPrompt) || fallback.managerOutputPrompt,
        managerCustomPrompt: normalizeText(input.managerCustomPrompt) || legacyPrompt || '',
        updatedAt: Number(input.updatedAt) || undefined,
    };
    normalized.memoryManagerPrompt = composeManagerSystemPrompt(normalized);
    return normalized;
}
