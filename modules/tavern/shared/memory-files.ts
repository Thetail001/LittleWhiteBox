import { applyTextEdits } from '../../agent-core/tools/text-edit.js';
import {
    tavernMemoryFilesTable,
    tavernMemoryIndexesTable,
    tavernEpisodeSummariesTable,
    tavernSessionsTable,
    tavernTurnSummariesTable,
    listTavernTurnSummaries,
    upsertTavernEpisodeSummary,
    upsertTavernTurnSummary,
    type TavernEpisodeSummaryRecord,
    type TavernMemoryFileRecord,
    type TavernMemoryFileStatus,
    type TavernMemoryIndexRecord,
    type TavernMessageRecord,
    type TavernTurnSummaryRecord,
} from './session-db';

export const TAVERN_MEMORY_TOOL_NAMES = {
    LIST: 'MemoryList',
    READ: 'MemoryRead',
    WRITE: 'MemoryWrite',
    EDIT: 'MemoryEdit',
    GREP: 'MemoryGrep',
} as const;

export interface TavernMemoryToolResult {
    ok: boolean;
    summary: string;
    path?: string;
    files?: Array<Pick<TavernMemoryFileRecord, 'path' | 'status' | 'updatedAt'>>;
    content?: string;
    matches?: Array<{ path: string; line: number; text: string }>;
    changed?: boolean;
    error?: string;
    warning?: string;
    details?: unknown;
}

function now(): number {
    return Date.now();
}

function normalizeInline(value: unknown = '', limit = 400): string {
    const text = String(value || '').replace(/\s+/g, ' ').trim();
    return text.length > limit ? text.slice(0, limit) : text;
}

function normalizeBody(value: unknown = '', limit = 20000): string {
    const text = String(value || '').replace(/\r\n/g, '\n').trim();
    return text.length > limit ? text.slice(0, limit) : text;
}

export function normalizeTavernMemoryPath(value: unknown = ''): string {
    const path = String(value || '').replace(/\\/g, '/').trim();
    if (!path) {throw new Error('memory_path_required');}
    if (!path.startsWith('memory/')) {throw new Error('memory_path_scope_required');}
    if (path.includes('\0') || path.includes('//') || path.split('/').some((part) => part === '..' || part === '.')) {
        throw new Error('memory_path_invalid');
    }
    if (!path.endsWith('.md')) {throw new Error('memory_path_must_be_md');}
    return path;
}

function cloneJson<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
}

function ymd(timestamp = Date.now()): string {
    return new Date(timestamp).toISOString().slice(0, 10).replace(/-/g, '');
}

function padOrder(order = 0): string {
    return String(Math.max(0, Number(order) || 0)).padStart(4, '0');
}

export function buildTurnMemoryPath(userOrder = 0, timestamp = Date.now()): string {
    return `memory/turns/${ymd(timestamp)}-${padOrder(userOrder)}.md`;
}

function defaultMemoryFiles(sessionId = '', characterName = ''): TavernMemoryFileRecord[] {
    const timestamp = now();
    const name = normalizeInline(characterName, 120) || '当前角色';
    const base = { sessionId, status: 'active' as TavernMemoryFileStatus, createdAt: timestamp, updatedAt: timestamp, source: 'default' };
    return [
        {
            ...base,
            path: 'memory/session.md',
            content: [
                '# 剧情脉络',
                '',
                `- 角色：${name}`,
                '- 当前剧情段：未开始',
                '',
                '## 故事为什么走到现在',
                '- 暂无。',
                '',
                '## 当前剧情压力',
                '- 暂无。',
                '',
                '## 未解决事项',
                '- 暂无。',
            ].join('\n'),
        },
        {
            ...base,
            path: 'memory/state.md',
            content: [
                '# 状态栏',
                '',
                '## 当前事实',
                '- 暂无。',
                '',
                '## 当前关系',
                '- 暂无。',
                '',
                '## 当前地点',
                '- 暂无。',
                '',
                '## 当前物品',
                '- 暂无。',
            ].join('\n'),
        },
        {
            ...base,
            path: 'memory/episodes/001.md',
            content: [
                '# 初始阶段',
                '',
                '- Range: turn 0-0',
                '',
                '## Summary',
                '暂无。',
                '',
                '## Key Changes',
                '- 暂无。',
                '',
                '## Unresolved',
                '- 暂无。',
                '',
                '## Turn Summary IDs',
                '- 暂无。',
            ].join('\n'),
        },
        {
            ...base,
            path: 'memory/inbox.md',
            content: [
                '# 管理员收件箱',
                '',
                '## 待判断',
                '- 暂无。',
                '',
                '## 失败记录',
                '- 暂无。',
            ].join('\n'),
        },
    ];
}

export async function ensureTavernMemoryDefaults(sessionId = '', options: { characterName?: string } = {}): Promise<TavernMemoryFileRecord[]> {
    const id = String(sessionId || '').trim();
    if (!id) {throw new Error('memory_session_required');}
    const existing = await tavernMemoryFilesTable.where('sessionId').equals(id).toArray();
    if (existing.length) {return existing.sort((left, right) => left.path.localeCompare(right.path));}
    const files = defaultMemoryFiles(id, options.characterName);
    await tavernMemoryFilesTable.bulkPut(files);
    await tavernSessionsTable.update(id, { updatedAt: now() });
    return files;
}

export async function listTavernMemoryFiles(sessionId = '', options: {
    includeStale?: boolean;
} = {}): Promise<TavernMemoryFileRecord[]> {
    const id = String(sessionId || '').trim();
    if (!id) {return [];}
    const rows = await tavernMemoryFilesTable.where('sessionId').equals(id).sortBy('path');
    return options.includeStale ? rows : rows.filter((row) => row.status !== 'stale');
}

export async function getTavernMemoryFile(sessionId = '', pathInput = ''): Promise<TavernMemoryFileRecord | null> {
    const id = String(sessionId || '').trim();
    if (!id) {return null;}
    const path = normalizeTavernMemoryPath(pathInput);
    return await tavernMemoryFilesTable.get([id, path]) || null;
}

export async function writeTavernMemoryFile(sessionId = '', pathInput = '', contentInput = '', options: {
    source?: string;
    staleFromOrder?: number;
} = {}): Promise<TavernMemoryFileRecord> {
    const id = String(sessionId || '').trim();
    if (!id) {throw new Error('memory_session_required');}
    const path = normalizeTavernMemoryPath(pathInput);
    const timestamp = now();
    const existing = await tavernMemoryFilesTable.get([id, path]);
    const record: TavernMemoryFileRecord = {
        sessionId: id,
        path,
        content: String(contentInput || '').replace(/\r\n/g, '\n'),
        status: 'active',
        source: String(options.source || existing?.source || 'manager'),
        staleFromOrder: Number.isFinite(Number(options.staleFromOrder)) ? Number(options.staleFromOrder) : existing?.staleFromOrder,
        createdAt: Number(existing?.createdAt) || timestamp,
        updatedAt: timestamp,
    };
    await tavernMemoryFilesTable.put(record);
    await tavernSessionsTable.update(id, { updatedAt: timestamp });
    await markTavernMemoryIndexStale(id);
    return record;
}

export async function markTavernMemoryIndexStale(sessionId = '', error = ''): Promise<TavernMemoryIndexRecord> {
    const id = String(sessionId || '').trim();
    if (!id) {throw new Error('memory_session_required');}
    const timestamp = now();
    const record: TavernMemoryIndexRecord = {
        sessionId: id,
        kind: 'markdown-derived',
        status: 'stale',
        error: String(error || ''),
        sourceFingerprint: '',
        derivedAt: timestamp,
        updatedAt: timestamp,
    };
    await tavernMemoryIndexesTable.put(record);
    return record;
}

export async function getTavernMemoryIndex(sessionId = '', kind = 'markdown-derived'): Promise<TavernMemoryIndexRecord | null> {
    const id = String(sessionId || '').trim();
    if (!id) {return null;}
    return await tavernMemoryIndexesTable.get([id, kind]) || null;
}

function parseListSection(content = '', heading = ''): string[] {
    const body = parseSection(content, heading);
    return body.split('\n')
        .map((line) => line.replace(/^\s*[-*]\s*/, '').trim())
        .filter((line) => line && !['暂无。', '暂无'].includes(line))
        .slice(0, 40);
}

function parseSection(content = '', heading = ''): string {
    const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = String(content || '').match(new RegExp(`(?:^|\\n)##\\s+${escaped}\\s*\\n([\\s\\S]*?)(?=\\n##\\s+|$)`, 'i'));
    return String(match?.[1] || '').trim();
}

function parseTitle(content = '', fallback = '未命名'): string {
    const match = String(content || '').match(/^\s*#\s+(.+?)\s*$/m);
    return normalizeInline(match?.[1] || fallback, 120) || fallback;
}

function parseTurnRange(content = ''): { startTurn: number; endTurn: number } {
    const match = String(content || '').match(/Range:\s*turn\s*(\d+)\s*-\s*(\d+)/i);
    const startTurn = Math.max(0, Number(match?.[1]) || 0);
    const endTurn = Math.max(startTurn, Number(match?.[2]) || startTurn);
    return { startTurn, endTurn };
}

function parseSourceOrders(content = ''): { turn: number; userOrder: number; assistantOrder: number } {
    const turnMatch = String(content || '').match(/(?:^|\n)-\s*Turn:\s*(\d+)/i);
    const sourceMatch = String(content || '').match(/(?:^|\n)-\s*Source:\s*messages\s*(\d+)\s*\/\s*(\d+)/i);
    return {
        turn: Number.isFinite(Number(turnMatch?.[1])) ? Math.max(0, Number(turnMatch?.[1])) : -1,
        userOrder: Number.isFinite(Number(sourceMatch?.[1])) ? Number(sourceMatch?.[1]) : -1,
        assistantOrder: Number.isFinite(Number(sourceMatch?.[2])) ? Number(sourceMatch?.[2]) : -1,
    };
}

function parseTurnFile(file: TavernMemoryFileRecord): Partial<TavernTurnSummaryRecord> | null {
    if (!/^memory\/turns\/.+\.md$/.test(file.path) || file.status === 'stale') {return null;}
    const source = parseSourceOrders(file.content);
    if (!Number.isInteger(source.turn) || source.turn < 0
        || !Number.isInteger(source.userOrder) || source.userOrder < 0
        || !Number.isInteger(source.assistantOrder) || source.assistantOrder < 0) {
        return null;
    }
    const summary = normalizeBody(parseSection(file.content, 'Summary'), 2000);
    if (!summary || summary === '暂无。') {return null;}
    return {
        id: `md-turn-${file.sessionId}-${source.userOrder}-${source.assistantOrder}`,
        sessionId: file.sessionId,
        turn: source.turn,
        userOrder: source.userOrder,
        assistantOrder: source.assistantOrder,
        summary,
        characterState: normalizeBody(parseSection(file.content, 'State'), 1200),
        relationshipChange: normalizeBody(parseSection(file.content, 'Relationship'), 1200),
        locationTimeItems: normalizeBody(parseSection(file.content, 'Location Time Items'), 1200),
        hooks: parseListSection(file.content, 'Hooks').slice(0, 12),
        tags: parseListSection(file.content, 'Tags').slice(0, 12),
        status: 'active',
    };
}

function parseEpisodeFile(file: TavernMemoryFileRecord): Partial<TavernEpisodeSummaryRecord> | null {
    if (!/^memory\/episodes\/.+\.md$/.test(file.path) || file.status === 'stale') {return null;}
    const title = parseTitle(file.content, file.path.split('/').pop() || '阶段');
    const { startTurn, endTurn } = parseTurnRange(file.content);
    const summary = normalizeBody(parseSection(file.content, 'Summary'), 4000);
    if (!summary || summary === '暂无。') {return null;}
    return {
        id: `md-episode-${file.sessionId}-${file.path}`,
        sessionId: file.sessionId,
        title,
        summary,
        startTurn,
        endTurn,
        turnSummaryIds: parseListSection(file.content, 'Turn Summary IDs')
            .filter((item) => item.startsWith('md-turn-') || item.startsWith('turn-summary-'))
            .slice(0, 100),
        keyChanges: parseListSection(file.content, 'Key Changes').slice(0, 20),
        unresolved: parseListSection(file.content, 'Unresolved').slice(0, 20),
        status: 'active',
    };
}

function buildFingerprint(files: TavernMemoryFileRecord[]): string {
    const payload = files.map((file) => `${file.path}\u001f${file.status}\u001f${file.updatedAt}\u001f${file.content.length}`).join('\u001e');
    let hash = 2166136261;
    for (let index = 0; index < payload.length; index += 1) {
        hash ^= payload.charCodeAt(index);
        hash = Math.imul(hash, 16777619) >>> 0;
    }
    return `${files.length}:${hash.toString(16)}`;
}

async function staleMissingMarkdownDerivedRecords(sessionId: string, activeTurnIds: Set<string>, activeEpisodeIds: Set<string>, timestamp: number): Promise<void> {
    const turnPrefix = `md-turn-${sessionId}-`;
    const episodePrefix = `md-episode-${sessionId}-memory/`;
    const [turns, episodes] = await Promise.all([
        tavernTurnSummariesTable.where('sessionId').equals(sessionId).toArray(),
        tavernEpisodeSummariesTable.where('sessionId').equals(sessionId).toArray(),
    ]);
    await Promise.all(turns
        .filter((summary) => summary.status !== 'stale'
            && summary.id.startsWith(turnPrefix)
            && !activeTurnIds.has(summary.id))
        .map((summary) => tavernTurnSummariesTable.update(summary.id, {
            status: 'stale',
            updatedAt: timestamp,
        })));
    await Promise.all(episodes
        .filter((episode) => episode.status !== 'stale'
            && episode.id.startsWith(episodePrefix)
            && !activeEpisodeIds.has(episode.id))
        .map((episode) => tavernEpisodeSummariesTable.update(episode.id, {
            status: 'stale',
            updatedAt: timestamp,
        })));
}

export async function rebuildTavernMemoryDerivedIndex(sessionId = ''): Promise<TavernMemoryIndexRecord> {
    const id = String(sessionId || '').trim();
    if (!id) {throw new Error('memory_session_required');}
    const timestamp = now();
    try {
        const files = await listTavernMemoryFiles(id, { includeStale: true });
        const turnRecords = files.map(parseTurnFile).filter(Boolean) as Partial<TavernTurnSummaryRecord>[];
        const turnIds = new Set<string>();
        for (const turn of turnRecords) {
            const saved = await upsertTavernTurnSummary(turn);
            turnIds.add(saved.id);
        }
        const activeTurnIds = new Set((await listTavernTurnSummaries(id)).map((summary) => summary.id));
        turnIds.forEach((turnId) => activeTurnIds.add(turnId));
        const episodeIds = new Set<string>();
        for (const episode of files.map(parseEpisodeFile).filter(Boolean) as Partial<TavernEpisodeSummaryRecord>[]) {
            const saved = await upsertTavernEpisodeSummary({
                ...episode,
                turnSummaryIds: (episode.turnSummaryIds || []).filter((summaryId) => activeTurnIds.has(summaryId)),
            });
            episodeIds.add(saved.id);
        }
        await staleMissingMarkdownDerivedRecords(id, turnIds, episodeIds, timestamp);
        const record: TavernMemoryIndexRecord = {
            sessionId: id,
            kind: 'markdown-derived',
            status: 'ready',
            error: '',
            sourceFingerprint: buildFingerprint(files),
            derivedAt: timestamp,
            updatedAt: timestamp,
        };
        await tavernMemoryIndexesTable.put(record);
        return record;
    } catch (error) {
        const record: TavernMemoryIndexRecord = {
            sessionId: id,
            kind: 'markdown-derived',
            status: 'failed',
            error: error instanceof Error ? error.message : String(error || 'memory_index_failed'),
            sourceFingerprint: '',
            derivedAt: timestamp,
            updatedAt: timestamp,
        };
        await tavernMemoryIndexesTable.put(record);
        return record;
    }
}

function getToolPath(args: Record<string, unknown>): string {
    return normalizeTavernMemoryPath(args.filePath || args.path || '');
}

export function getTavernMemoryToolDefinitions(): Array<{ type: 'function'; function: { name: string; description: string; parameters: unknown } }> {
    return [
        {
            type: 'function',
            function: {
                name: TAVERN_MEMORY_TOOL_NAMES.LIST,
                description: 'List Markdown memory files for this tavern session. Does not read file bodies.',
                parameters: { type: 'object', properties: {}, additionalProperties: false },
            },
        },
        {
            type: 'function',
            function: {
                name: TAVERN_MEMORY_TOOL_NAMES.READ,
                description: 'Read one current-session memory Markdown file under memory/.',
                parameters: {
                    type: 'object',
                    properties: {
                        filePath: { type: 'string', description: 'Path under memory/, for example memory/session.md.' },
                    },
                    required: ['filePath'],
                    additionalProperties: false,
                },
            },
        },
        {
            type: 'function',
            function: {
                name: TAVERN_MEMORY_TOOL_NAMES.WRITE,
                description: 'Write or replace one current-session memory Markdown file under memory/. Use for new turn files or whole-file rewrites.',
                parameters: {
                    type: 'object',
                    properties: {
                        filePath: { type: 'string' },
                        content: { type: 'string' },
                    },
                    required: ['filePath', 'content'],
                    additionalProperties: false,
                },
            },
        },
        {
            type: 'function',
            function: {
                name: TAVERN_MEMORY_TOOL_NAMES.EDIT,
                description: 'Apply targeted edits to one current-session memory Markdown file under memory/. Uses the same edit item shapes as the shared text edit tool.',
                parameters: {
                    type: 'object',
                    properties: {
                        filePath: { type: 'string' },
                        edits: { type: 'array', items: { type: 'object' } },
                    },
                    required: ['filePath', 'edits'],
                    additionalProperties: false,
                },
            },
        },
        {
            type: 'function',
            function: {
                name: TAVERN_MEMORY_TOOL_NAMES.GREP,
                description: 'Search current-session memory Markdown files by plain text or regex.',
                parameters: {
                    type: 'object',
                    properties: {
                        pattern: { type: 'string' },
                        regex: { type: 'boolean' },
                    },
                    required: ['pattern'],
                    additionalProperties: false,
                },
            },
        },
    ];
}

export async function executeTavernMemoryTool(sessionId = '', toolName = '', args: Record<string, unknown> = {}): Promise<TavernMemoryToolResult> {
    const id = String(sessionId || '').trim();
    if (!id) {return { ok: false, summary: '缺少 sessionId。', error: 'memory_session_required' };}
    await ensureTavernMemoryDefaults(id);
    try {
        if (toolName === TAVERN_MEMORY_TOOL_NAMES.LIST) {
            const files = await listTavernMemoryFiles(id, { includeStale: true });
            return {
                ok: true,
                summary: `找到 ${files.length} 个记忆文件。`,
                files: files.map((file) => ({ path: file.path, status: file.status, updatedAt: file.updatedAt })),
            };
        }
        if (toolName === TAVERN_MEMORY_TOOL_NAMES.READ) {
            const path = getToolPath(args);
            const file = await getTavernMemoryFile(id, path);
            if (!file) {return { ok: false, summary: `${path} 不存在。`, path, error: 'memory_file_not_found' };}
            return { ok: true, summary: `已读取 ${path}。`, path, content: file.content };
        }
        if (toolName === TAVERN_MEMORY_TOOL_NAMES.WRITE) {
            const path = getToolPath(args);
            const file = await writeTavernMemoryFile(id, path, String(args.content || ''), { source: 'manager' });
            return { ok: true, summary: `已写入 ${file.path}。`, path: file.path, changed: true };
        }
        if (toolName === TAVERN_MEMORY_TOOL_NAMES.EDIT) {
            const path = getToolPath(args);
            const file = await getTavernMemoryFile(id, path);
            if (!file) {return { ok: false, summary: `${path} 不存在。`, path, error: 'memory_file_not_found' };}
            const result = applyTextEdits(file.content, args.edits);
            if (result.ok) {
                await writeTavernMemoryFile(id, path, result.content, { source: 'manager' });
            }
            return {
                ok: !!result.ok,
                summary: result.ok ? `已修改 ${path}，应用 ${result.appliedCount || 0} 项。` : `未修改 ${path}。`,
                path,
                changed: !!result.ok,
                warning: result.warning,
                error: result.ok ? '' : 'memory_edit_failed',
                details: result.results,
            };
        }
        if (toolName === TAVERN_MEMORY_TOOL_NAMES.GREP) {
            const pattern = String(args.pattern || '').trim();
            if (!pattern) {return { ok: false, summary: '缺少搜索词。', error: 'memory_grep_pattern_required' };}
            const matcher = args.regex === true
                ? new RegExp(pattern, 'iu')
                : null;
            const lower = pattern.toLowerCase();
            const matches: Array<{ path: string; line: number; text: string }> = [];
            const files = await listTavernMemoryFiles(id, { includeStale: true });
            files.forEach((file) => {
                file.content.split('\n').forEach((line, index) => {
                    const ok = matcher ? matcher.test(line) : line.toLowerCase().includes(lower);
                    if (ok) {
                        matches.push({ path: file.path, line: index + 1, text: line.trim() });
                    }
                });
            });
            return {
                ok: true,
                summary: `搜索到 ${matches.length} 项。`,
                matches: matches.slice(0, 80),
            };
        }
        return { ok: false, summary: `${toolName} 不可用。`, error: 'memory_tool_not_available' };
    } catch (error) {
        return {
            ok: false,
            summary: error instanceof Error ? error.message : String(error || 'memory_tool_failed'),
            error: error instanceof Error ? error.message : String(error || 'memory_tool_failed'),
        };
    }
}

export async function writeTurnMemoryFromMessages(input: {
    sessionId: string;
    turn: number;
    userMessage: TavernMessageRecord;
    assistantMessage: TavernMessageRecord;
    summary?: string;
    characterState?: string;
    relationshipChange?: string;
    locationTimeItems?: string;
    hooks?: string[];
    tags?: string[];
}): Promise<TavernMemoryFileRecord> {
    const path = buildTurnMemoryPath(input.userMessage.order, input.assistantMessage.createdAt || Date.now());
    const list = (items?: string[]) => (items || []).map((item) => `- ${item}`).join('\n') || '- 暂无。';
    const content = [
        `# Turn ${input.turn}`,
        '',
        `- Turn: ${input.turn}`,
        `- Source: messages ${input.userMessage.order}/${input.assistantMessage.order}`,
        '',
        '## Summary',
        input.summary || '本轮发生了新的对话，需要管理员后续整理。',
        '',
        '## State',
        input.characterState || '',
        '',
        '## Relationship',
        input.relationshipChange || '',
        '',
        '## Location Time Items',
        input.locationTimeItems || '',
        '',
        '## Hooks',
        list(input.hooks),
        '',
        '## Tags',
        list(input.tags),
    ].join('\n');
    return writeTavernMemoryFile(input.sessionId, path, content, {
        source: 'manager',
        staleFromOrder: input.userMessage.order,
    });
}

export function cloneMemoryFile(file: TavernMemoryFileRecord): TavernMemoryFileRecord {
    return cloneJson(file);
}
