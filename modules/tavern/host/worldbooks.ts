import { saveSettingsDebounced } from '../../../../../../../script.js';
import {
    createWorldInfoEntry,
    getWorldInfoSettings,
    loadWorldInfo,
    saveWorldInfo,
    selected_world_info,
    updateWorldInfoList,
    updateWorldInfoSettings,
    world_names,
} from '../../../../../../world-info.js';

interface TavernWorldbookEntry {
    uid?: number | string;
    key?: unknown[];
    keysecondary?: unknown[];
    comment?: string;
    content?: string;
    order?: number;
    disable?: boolean;
    constant?: boolean;
    selective?: boolean;
    position?: number;
    [key: string]: unknown;
}

interface TavernWorldbookPayload {
    name?: string;
    entries?: TavernWorldbookEntry[] | Record<string, TavernWorldbookEntry>;
    [key: string]: unknown;
}

function asRecord(value: unknown): Record<string, unknown> {
    return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function cloneJson<T>(value: T): T {
    try {
        return JSON.parse(JSON.stringify(value)) as T;
    } catch {
        return value;
    }
}

function text(value: unknown): string {
    return String(value || '').trim();
}

function normalizeList(value: unknown): string[] {
    if (Array.isArray(value)) {
        return value.map((item) => text(item)).filter(Boolean);
    }
    return String(value || '')
        .split(/\r?\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);
}

function entriesToArray(entries: unknown): TavernWorldbookEntry[] {
    const source = Array.isArray(entries)
        ? entries
        : Object.values(asRecord(entries));
    return source
        .map((entry) => cloneJson(asRecord(entry)) as TavernWorldbookEntry)
        .sort((left, right) => {
            const leftOrder = Number(left.order ?? 0);
            const rightOrder = Number(right.order ?? 0);
            return rightOrder - leftOrder || Number(left.uid ?? 0) - Number(right.uid ?? 0);
        });
}

function normalizeWorldbookForClient(name: string, data: Record<string, unknown> = {}): Record<string, unknown> {
    return {
        ...cloneJson(data),
        name: text(data.name) || name,
        entries: entriesToArray(data.entries),
    };
}

function buildEntriesForSave(existingEntries: unknown, nextEntries: unknown): Record<string, TavernWorldbookEntry> {
    const existingByUid = new Map<string, TavernWorldbookEntry>();
    entriesToArray(existingEntries).forEach((entry) => {
        existingByUid.set(String(entry.uid ?? ''), entry);
    });
    const container: Record<string, TavernWorldbookEntry> = {};
    entriesToArray(nextEntries).forEach((entry, index) => {
        const uid = Number(entry.uid);
        const finalUid = Number.isFinite(uid) ? uid : index;
        const existing = existingByUid.get(String(finalUid)) || {};
        const next = {
            ...existing,
            ...entry,
            uid: finalUid,
            key: normalizeList(entry.key),
            keysecondary: normalizeList(entry.keysecondary),
            comment: String(entry.comment || ''),
            content: String(entry.content || ''),
            order: Number(entry.order ?? existing.order ?? 100),
            disable: entry.disable === true,
            constant: entry.constant === true,
            selective: entry.selective === true,
        };
        container[String(finalUid)] = next;
    });
    return container;
}

async function ensureWorldbookNames(): Promise<string[]> {
    if (!Array.isArray(world_names) || !world_names.length) {
        await updateWorldInfoList();
    }
    return Array.isArray(world_names) ? [...world_names] : [];
}

export async function listTavernWorldbooks(): Promise<Record<string, unknown>> {
    const names = await ensureWorldbookNames();
    const activeNames = Array.isArray(selected_world_info) ? [...selected_world_info] : [];
    return {
        books: names.map((name) => ({
            name,
            active: activeNames.includes(name),
        })),
        activeNames,
    };
}

export async function getTavernWorldbook(input: unknown): Promise<Record<string, unknown>> {
    const name = text(asRecord(input).name);
    if (!name) {
        throw new Error('缺少世界书名称。');
    }
    const data = asRecord(await loadWorldInfo(name));
    if (!Object.keys(data).length) {
        throw new Error(`世界书不存在：${name}`);
    }
    return normalizeWorldbookForClient(name, data);
}

export async function saveTavernWorldbook(input: unknown): Promise<Record<string, unknown>> {
    const payload = asRecord(input);
    const name = text(payload.name);
    const book = asRecord(payload.book) as TavernWorldbookPayload;
    if (!name) {
        throw new Error('缺少世界书名称。');
    }
    const existing = asRecord(await loadWorldInfo(name));
    if (!Object.keys(existing).length) {
        throw new Error(`世界书不存在：${name}`);
    }
    const next = {
        ...existing,
        ...cloneJson(book),
        name: text(book.name) || name,
        entries: buildEntriesForSave(existing.entries, book.entries ?? existing.entries),
    };
    await saveWorldInfo(name, next, true);
    return normalizeWorldbookForClient(name, next);
}

export async function createTavernWorldbookEntry(input: unknown): Promise<Record<string, unknown>> {
    const payload = asRecord(input);
    const name = text(payload.name);
    if (!name) {
        throw new Error('缺少世界书名称。');
    }
    const existing = asRecord(await loadWorldInfo(name));
    if (!Object.keys(existing).length) {
        throw new Error(`世界书不存在：${name}`);
    }
    const book = asRecord(payload.book) as TavernWorldbookPayload;
    const data = {
        ...existing,
        ...cloneJson(book),
        name: text(book.name) || name,
        entries: buildEntriesForSave(existing.entries, book.entries ?? existing.entries),
    };
    if (!data.entries || typeof data.entries !== 'object') {
        data.entries = {};
    }
    const entry = createWorldInfoEntry(name, data);
    if (!entry) {
        throw new Error('无法创建世界书条目。');
    }
    return normalizeWorldbookForClient(name, data);
}

export function setTavernWorldbookActive(input: unknown): Record<string, unknown> {
    const source = asRecord(input);
    const name = text(source.name);
    const active = source.active === true;
    if (!name) {
        throw new Error('缺少世界书名称。');
    }
    const current = Array.isArray(selected_world_info) ? selected_world_info.filter((item) => item !== name) : [];
    const next = active ? [...current, name] : current;
    updateWorldInfoSettings(getWorldInfoSettings(), next);
    saveSettingsDebounced?.();
    return {
        activeNames: next,
    };
}
