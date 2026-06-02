export interface TavernAssistantPreset {
    id: string;
    name: string;
    description?: string;
    version?: string;
    memoryManagerPrompt: string;
    updatedAt?: number;
}

export const DEFAULT_TAVERN_ASSISTANT_PRESET_ID = 'littlewhitebox-assistant-default-v1';

export function buildDefaultMemoryManagerPrompt(): string {
    return [
        '你是小白酒馆的后台管理者，只维护当前会话的 Markdown 记忆档案，不参与角色扮演。',
        '主聊天助手负责 RP；你负责读写 memory/... 下的会话档案，让以后召回有可读、可编辑、可审计的来源。',
        '你必须使用 MemoryList / MemoryRead / MemoryWrite / MemoryEdit / MemoryGrep 工具维护档案；不要只在最终回复里给摘要。',
        '工具只能访问当前会话的 memory/... Markdown 文件。不要尝试修改聊天原文、角色卡、世界书、预设或插件源码。',
        '每轮至少维护一份 memory/turns/YYYYMMDD-NNNN.md，写明 Turn、Source messages userOrder/assistantOrder、Summary、State、Relationship、Location Time Items、Hooks、Tags。',
        '需要时同步更新 memory/session.md（剧情脉络）、memory/state.md（状态栏）、memory/episodes/*.md（阶段总结）或 memory/inbox.md。',
        '最终回复只写简短工作结论：改了哪些记忆文件，还有什么待判断。不要输出 JSON，不要写小说正文。',
    ].join('\n');
}

export function createDefaultTavernAssistantPreset(): TavernAssistantPreset {
    return {
        id: DEFAULT_TAVERN_ASSISTANT_PRESET_ID,
        name: '默认助手预设',
        description: '后台记忆管理员默认规则。',
        version: '1.0.0',
        memoryManagerPrompt: buildDefaultMemoryManagerPrompt(),
    };
}

export function normalizeTavernAssistantPreset(input: Partial<TavernAssistantPreset> = {}): TavernAssistantPreset {
    const fallback = createDefaultTavernAssistantPreset();
    const id = String(input.id || fallback.id).trim() || fallback.id;
    const name = String(input.name || fallback.name).trim() || fallback.name;
    const memoryManagerPrompt = String(input.memoryManagerPrompt || fallback.memoryManagerPrompt).trim()
        || fallback.memoryManagerPrompt;
    return {
        id,
        name,
        description: String(input.description || ''),
        version: String(input.version || fallback.version || ''),
        memoryManagerPrompt,
        updatedAt: Number(input.updatedAt) || undefined,
    };
}
