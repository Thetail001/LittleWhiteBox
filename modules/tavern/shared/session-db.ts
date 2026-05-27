import Dexie, { type DexieTable } from '../../../libs/dexie.mjs';
import type { XbTavernContext, XbTavernMessage, XbTavernPreset } from './message-assembler';
import { createDefaultXbTavernPreset, DEFAULT_XB_TAVERN_PRESET_ID } from './presets';

export interface TavernSessionRecord {
    id: string;
    title: string;
    characterId?: string;
    characterName?: string;
    createdAt: number;
    updatedAt: number;
    contextSnapshot?: XbTavernContext;
    summary?: string;
    state?: Record<string, unknown>;
}

export interface TavernMessageRecord {
    sessionId: string;
    order: number;
    role: string;
    content: string;
    createdAt: number;
    providerPayload?: unknown;
}

export interface TavernMetaRecord {
    key: string;
    value: unknown;
    updatedAt: number;
}

export interface TavernPresetRecord {
    id: string;
    name: string;
    description?: string;
    version?: string;
    sourcePresetId?: string;
    isBuiltIn?: boolean;
    createdAt: number;
    updatedAt: number;
    preset: XbTavernPreset;
}

class TavernDatabase extends Dexie {
    sessions!: DexieTable<TavernSessionRecord>;
    messages!: DexieTable<TavernMessageRecord>;
    meta!: DexieTable<TavernMetaRecord>;
    presets!: DexieTable<TavernPresetRecord>;

    constructor() {
        super('LittleWhiteBox_Tavern');
        this.version(1).stores({
            sessions: 'id, updatedAt, characterId, characterName',
            messages: '[sessionId+order], sessionId, order',
            meta: 'key',
        });
        this.version(2).stores({
            sessions: 'id, updatedAt, characterId, characterName',
            messages: '[sessionId+order], sessionId, order',
            meta: 'key',
            presets: 'id, updatedAt, sourcePresetId',
        });
    }
}

const db = new TavernDatabase();

export const tavernSessionsTable = db.sessions;
export const tavernMessagesTable = db.messages;
export const tavernMetaTable = db.meta;
export const tavernPresetsTable = db.presets;

function now(): number {
    return Date.now();
}

function createId(prefix = 'tavern-session'): string {
    return `${prefix}-${now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeTitle(value = '', fallback = '小白酒馆会话'): string {
    const normalized = String(value || '').trim();
    return normalized.slice(0, 120) || fallback;
}

function cloneJson<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
}

function normalizePresetName(value = '', fallback = '我的小白酒馆预设'): string {
    const normalized = String(value || '').trim();
    return normalized.slice(0, 120) || fallback;
}

export async function createTavernSession(input: Partial<TavernSessionRecord> = {}): Promise<TavernSessionRecord> {
    const timestamp = now();
    const session: TavernSessionRecord = {
        id: String(input.id || createId()),
        title: normalizeTitle(input.title, input.characterName ? `${input.characterName} · 会话` : '小白酒馆会话'),
        characterId: String(input.characterId || ''),
        characterName: String(input.characterName || ''),
        createdAt: Number(input.createdAt) || timestamp,
        updatedAt: timestamp,
        contextSnapshot: input.contextSnapshot,
        summary: String(input.summary || ''),
        state: input.state || {},
    };
    await tavernSessionsTable.put(session);
    await tavernMetaTable.put({ key: 'selectedSessionId', value: session.id, updatedAt: timestamp });
    return session;
}

export async function listTavernSessions(): Promise<TavernSessionRecord[]> {
    return tavernSessionsTable.orderBy('updatedAt').reverse().toArray();
}

export async function getSelectedTavernSessionId(): Promise<string> {
    const entry = await tavernMetaTable.get('selectedSessionId');
    return String(entry?.value || '').trim();
}

export async function setSelectedTavernSessionId(sessionId = ''): Promise<string> {
    const value = String(sessionId || '').trim();
    await tavernMetaTable.put({ key: 'selectedSessionId', value, updatedAt: now() });
    return value;
}

export async function getTavernSession(sessionId = ''): Promise<TavernSessionRecord | null> {
    const id = String(sessionId || '').trim();
    if (!id) {return null;}
    return await tavernSessionsTable.get(id) || null;
}

export async function appendTavernMessage(sessionId: string, message: XbTavernMessage | TavernMessageRecord): Promise<TavernMessageRecord> {
    const id = String(sessionId || '').trim();
    if (!id) {throw new Error('session_required');}
    const existing = await tavernMessagesTable.where('sessionId').equals(id).toArray();
    const order = Math.max(-1, ...existing.map((item) => Number(item.order) || 0)) + 1;
    const timestamp = now();
    const record: TavernMessageRecord = {
        sessionId: id,
        order,
        role: String(message.role || ''),
        content: String(message.content || ''),
        createdAt: timestamp,
        providerPayload: 'providerPayload' in message ? message.providerPayload : undefined,
    };
    await db.transaction('rw', tavernMessagesTable, tavernSessionsTable, async () => {
        await tavernMessagesTable.put(record);
        await tavernSessionsTable.update(id, { updatedAt: timestamp });
    });
    return record;
}

export async function listTavernMessages(sessionId = ''): Promise<TavernMessageRecord[]> {
    const id = String(sessionId || '').trim();
    if (!id) {return [];}
    return tavernMessagesTable.where('sessionId').equals(id).sortBy('order');
}

export function createUserPresetFromBuiltIn(name = '我的小白酒馆预设'): XbTavernPreset {
    const preset = cloneJson(createDefaultXbTavernPreset());
    preset.id = `user-preset-${now()}-${Math.random().toString(36).slice(2, 8)}`;
    preset.name = normalizePresetName(name);
    preset.description = `从 ${createDefaultXbTavernPreset().name} 派生。`;
    return preset;
}

export async function saveTavernPreset(preset: XbTavernPreset, options: {
    sourcePresetId?: string;
    isBuiltIn?: boolean;
} = {}): Promise<TavernPresetRecord> {
    const timestamp = now();
    const id = String(preset.id || createId('tavern-preset'));
    const normalizedPreset = cloneJson({
        ...preset,
        id,
        name: normalizePresetName(preset.name),
    });
    const existing = await tavernPresetsTable.get(id);
    const record: TavernPresetRecord = {
        id,
        name: normalizePresetName(normalizedPreset.name),
        description: String(normalizedPreset.description || ''),
        version: String(normalizedPreset.version || ''),
        sourcePresetId: String(options.sourcePresetId || existing?.sourcePresetId || DEFAULT_XB_TAVERN_PRESET_ID),
        isBuiltIn: options.isBuiltIn === true,
        createdAt: Number(existing?.createdAt) || timestamp,
        updatedAt: timestamp,
        preset: normalizedPreset,
    };
    await tavernPresetsTable.put(record);
    return record;
}

export async function listUserTavernPresets(): Promise<TavernPresetRecord[]> {
    return tavernPresetsTable.orderBy('updatedAt').reverse().toArray();
}

export async function getActiveTavernPresetId(): Promise<string> {
    const entry = await tavernMetaTable.get('activePresetId');
    return String(entry?.value || DEFAULT_XB_TAVERN_PRESET_ID).trim() || DEFAULT_XB_TAVERN_PRESET_ID;
}

export async function setActiveTavernPresetId(presetId = DEFAULT_XB_TAVERN_PRESET_ID): Promise<string> {
    const value = String(presetId || DEFAULT_XB_TAVERN_PRESET_ID).trim() || DEFAULT_XB_TAVERN_PRESET_ID;
    await tavernMetaTable.put({ key: 'activePresetId', value, updatedAt: now() });
    return value;
}

export async function loadActiveTavernPreset(): Promise<XbTavernPreset> {
    const activeId = await getActiveTavernPresetId();
    if (activeId === DEFAULT_XB_TAVERN_PRESET_ID) {return createDefaultXbTavernPreset();}
    const record = await tavernPresetsTable.get(activeId);
    return record?.preset ? cloneJson(record.preset) : createDefaultXbTavernPreset();
}

export async function deriveAndActivateDefaultTavernPreset(name = '我的小白酒馆预设'): Promise<TavernPresetRecord> {
    const preset = createUserPresetFromBuiltIn(name);
    const record = await saveTavernPreset(preset, { sourcePresetId: DEFAULT_XB_TAVERN_PRESET_ID });
    await setActiveTavernPresetId(record.id);
    return record;
}

export default db;
