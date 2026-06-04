import { characters, this_chid } from '../../../../../../../script.js';
import {
    allowPresetScripts,
    allowScopedScripts,
    getCurrentPresetAPI,
    getCurrentPresetName,
    getScriptsByType,
    isPresetScriptsAllowed,
    isScopedScriptsAllowed,
    regex_placement,
    saveScriptsByType,
    SCRIPT_TYPES,
    substitute_find_regex,
} from '../../../../../../extensions/regex/engine.js';

interface TavernRegexScript {
    id?: string;
    scriptName?: string;
    findRegex?: string;
    replaceString?: string;
    trimStrings?: string[];
    placement?: number[];
    disabled?: boolean;
    markdownOnly?: boolean;
    promptOnly?: boolean;
    runOnEdit?: boolean;
    substituteRegex?: number;
    minDepth?: number | null;
    maxDepth?: number | null;
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

function normalizeScriptType(value: unknown): number {
    const parsed = Number(value);
    if (parsed === SCRIPT_TYPES.GLOBAL || parsed === SCRIPT_TYPES.SCOPED || parsed === SCRIPT_TYPES.PRESET) {
        return parsed;
    }
    const label = text(value).toLowerCase();
    if (label === 'global') {return SCRIPT_TYPES.GLOBAL;}
    if (label === 'scoped' || label === 'character') {return SCRIPT_TYPES.SCOPED;}
    if (label === 'preset') {return SCRIPT_TYPES.PRESET;}
    throw new Error('未知正则类型。');
}

function createId(): string {
    const cryptoApi = globalThis.crypto;
    if (cryptoApi?.randomUUID) {
        return cryptoApi.randomUUID();
    }
    return `regex-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeStringArray(value: unknown): string[] {
    if (Array.isArray(value)) {
        return value.map((item) => text(item)).filter(Boolean);
    }
    return String(value || '')
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);
}

function normalizeNumberArray(value: unknown): number[] {
    if (!Array.isArray(value)) {return [];}
    return value
        .map((item) => Number(item))
        .filter((item) => Number.isFinite(item));
}

function nullableNumber(value: unknown): number | null {
    if (value === null || value === undefined || value === '') {return null;}
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

function normalizeRegexScript(input: unknown): TavernRegexScript {
    const source = asRecord(input);
    return {
        ...cloneJson(source),
        id: text(source.id) || createId(),
        scriptName: text(source.scriptName),
        findRegex: String(source.findRegex || ''),
        replaceString: String(source.replaceString || ''),
        trimStrings: normalizeStringArray(source.trimStrings),
        placement: normalizeNumberArray(source.placement),
        disabled: source.disabled === true,
        markdownOnly: source.markdownOnly === true,
        promptOnly: source.promptOnly === true,
        runOnEdit: source.runOnEdit !== false,
        substituteRegex: Number.isFinite(Number(source.substituteRegex)) ? Number(source.substituteRegex) : substitute_find_regex.NONE,
        minDepth: nullableNumber(source.minDepth),
        maxDepth: nullableNumber(source.maxDepth),
    };
}

function currentCharacter(): unknown {
    const index = Number(this_chid);
    return Number.isFinite(index) ? characters?.[index] : undefined;
}

function buildGroup(scriptType: number, key: string, label: string): Record<string, unknown> {
    const scripts = getScriptsByType(scriptType).map((script) => normalizeRegexScript(script));
    const presetApi = getCurrentPresetAPI();
    const presetName = getCurrentPresetName();
    return {
        key,
        label,
        scriptType,
        scripts,
        allowed: scriptType === SCRIPT_TYPES.SCOPED
            ? isScopedScriptsAllowed(currentCharacter())
            : scriptType === SCRIPT_TYPES.PRESET
                ? isPresetScriptsAllowed(presetApi, presetName)
                : true,
    };
}

export function listTavernRegexScripts(): Record<string, unknown> {
    return {
        groups: [
            buildGroup(SCRIPT_TYPES.GLOBAL, 'global', '全局'),
            buildGroup(SCRIPT_TYPES.SCOPED, 'scoped', '当前角色'),
            buildGroup(SCRIPT_TYPES.PRESET, 'preset', '当前预设'),
        ],
        placements: {
            userInput: regex_placement.USER_INPUT,
            aiOutput: regex_placement.AI_OUTPUT,
            slashCommand: regex_placement.SLASH_COMMAND,
            worldInfo: regex_placement.WORLD_INFO,
            reasoning: regex_placement.REASONING,
        },
    };
}

export async function saveTavernRegexScript(input: unknown): Promise<Record<string, unknown>> {
    const source = asRecord(input);
    const scriptType = normalizeScriptType(source.scriptType);
    const script = normalizeRegexScript(source.script);
    if (!script.scriptName) {
        throw new Error('正则名称不能为空。');
    }
    const scripts = getScriptsByType(scriptType).map((item) => normalizeRegexScript(item));
    const index = scripts.findIndex((item) => item.id === script.id);
    if (index >= 0) {
        scripts[index] = script;
    } else {
        scripts.push(script);
    }
    await saveScriptsByType(scripts, scriptType);
    if (scriptType === SCRIPT_TYPES.SCOPED) {
        allowScopedScripts(currentCharacter());
    } else if (scriptType === SCRIPT_TYPES.PRESET) {
        allowPresetScripts(getCurrentPresetAPI(), getCurrentPresetName());
    }
    return listTavernRegexScripts();
}

export async function deleteTavernRegexScript(input: unknown): Promise<Record<string, unknown>> {
    const source = asRecord(input);
    const scriptType = normalizeScriptType(source.scriptType);
    const id = text(source.id);
    if (!id) {
        throw new Error('缺少正则 ID。');
    }
    const scripts = getScriptsByType(scriptType)
        .map((item) => normalizeRegexScript(item))
        .filter((item) => item.id !== id);
    await saveScriptsByType(scripts, scriptType);
    return listTavernRegexScripts();
}
