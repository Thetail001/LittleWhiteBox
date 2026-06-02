import { saveSettingsDebounced } from '../../../../../../../script.js';
import { getPresetManager } from '../../../../../../preset-manager.js';
import { promptManager } from '../../../../../../openai.js';
import { context_presets, power_user } from '../../../../../../power-user.js';
import { instruct_presets } from '../../../../../../instruct-mode.js';
import { system_prompts } from '../../../../../../sysprompt.js';

type XbTavernRole = 'system' | 'user' | 'assistant' | 'tool';
type TavernChatPromptPlacement =
    | 'top'
    | 'beforeCharacter'
    | 'afterCharacter'
    | 'beforeHistory'
    | 'afterHistory'
    | 'assistantPrefill';

interface TavernChatPromptSection {
    id?: string;
    label?: string;
    enabled?: boolean;
    role?: XbTavernRole | string;
    content?: string;
    placement?: TavernChatPromptPlacement;
    source?: string;
}

interface TavernChatPromptPresetBundle {
    id?: string;
    name?: string;
    source?: string;
    selected?: boolean;
    promptManager?: { name?: string; prompts?: unknown[]; promptOrder?: unknown };
    systemPrompt?: { name?: string; enabled?: boolean; content?: string; postHistory?: string };
    contextTemplate?: { name?: string; storyString?: string; chatStart?: string; exampleSeparator?: string };
    instructTemplate?: Record<string, unknown>;
    sections?: TavernChatPromptSection[];
    updatedAt?: number;
}

function createFallbackTavernChatPromptPresetBundle(): TavernChatPromptPresetBundle {
    return {
        id: 'sillytavern-current-chat-prompt',
        name: '酒馆当前聊天预设',
        source: 'sillytavern',
        selected: true,
        sections: [],
    };
}

function asRecord(value: unknown): Record<string, unknown> {
    return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function asArray<T = unknown>(value: unknown): T[] {
    return Array.isArray(value) ? value as T[] : [];
}

function cloneJson<T>(value: T): T {
    try {
        return JSON.parse(JSON.stringify(value)) as T;
    } catch {
        return value;
    }
}

function normalizeText(value: unknown = ''): string {
    return String(value || '').trim();
}

function normalizeTavernChatPromptPresetBundle(input: TavernChatPromptPresetBundle = {}): TavernChatPromptPresetBundle {
    const fallback = createFallbackTavernChatPromptPresetBundle();
    return {
        id: normalizeText(input.id) || fallback.id,
        name: normalizeText(input.name) || fallback.name,
        source: normalizeText(input.source) || 'sillytavern',
        selected: input.selected !== false,
        promptManager: input.promptManager,
        systemPrompt: input.systemPrompt,
        contextTemplate: input.contextTemplate,
        instructTemplate: input.instructTemplate,
        sections: Array.isArray(input.sections)
            ? input.sections.filter((section) => normalizeText(section.content))
            : [],
        updatedAt: Number(input.updatedAt) || undefined,
    };
}

function normalizePromptRole(value: unknown): XbTavernRole {
    const role = normalizeText(value).toLowerCase();
    return role === 'user' || role === 'assistant' ? role : 'system';
}

function resolvePromptPlacement(prompt: Record<string, unknown>): TavernChatPromptSection['placement'] {
    const identifier = normalizeText(prompt.identifier || prompt.id).toLowerCase();
    if (identifier === 'jailbreak') {return 'afterHistory';}
    const injectionPosition = Number(prompt.injection_position);
    if (Number.isFinite(injectionPosition) && injectionPosition > 0) {return 'afterHistory';}
    const position = normalizeText(prompt.position).toLowerCase();
    if (position.includes('after')) {return 'afterHistory';}
    if (position.includes('depth') || Number.isFinite(Number(prompt.injection_depth))) {return 'beforeHistory';}
    return 'beforeHistory';
}

function getPreparedPromptManagerPrompts(): unknown[] {
    const collection = promptManager?.getPromptCollection?.('normal');
    const prompts = asArray(asRecord(collection).collection);
    return prompts.length ? prompts : asArray(asRecord(promptManager?.serviceSettings).prompts);
}

function buildPromptManagerSections(prompts: unknown[] = []): TavernChatPromptSection[] {
    const sections: TavernChatPromptSection[] = [];
    prompts.forEach((item, index) => {
        const prompt = asRecord(item);
        const content = normalizeText(prompt.content);
        if (!content || prompt.enabled === false || prompt.disabled === true) {return;}
        const identifier = normalizeText(prompt.identifier || prompt.id || `prompt-${index + 1}`);
        sections.push({
            id: `prompt-manager:${identifier}`,
            label: normalizeText(prompt.name || prompt.label || identifier),
            enabled: true,
            role: normalizePromptRole(prompt.role),
            content,
            placement: resolvePromptPlacement(prompt),
            source: 'promptManager',
        });
    });
    return sections;
}

function buildCurrentBundle(): TavernChatPromptPresetBundle {
    const promptSettings = asRecord(promptManager?.serviceSettings);
    const promptPresetName = normalizeText(getPresetManager('openai')?.getSelectedPresetName?.());
    const systemPrompt = asRecord(power_user?.sysprompt);
    const contextTemplate = asRecord(power_user?.context);
    const instructTemplate = asRecord(power_user?.instruct);
    const sections: TavernChatPromptSection[] = [
        ...buildPromptManagerSections(getPreparedPromptManagerPrompts()),
    ];
    const syspromptContent = normalizeText(systemPrompt.content);
    if (systemPrompt.enabled !== false && syspromptContent) {
        sections.unshift({
            id: 'sysprompt:current',
            label: normalizeText(systemPrompt.name) || 'System Prompt',
            enabled: true,
            role: 'system',
            content: syspromptContent,
            placement: systemPrompt.post_history ? 'afterHistory' : 'top',
            source: 'systemPrompt',
        });
    }
    const storyString = normalizeText(contextTemplate.story_string);
    if (storyString) {
        sections.push({
            id: 'context:story-string',
            label: normalizeText(contextTemplate.preset) || 'Context Template',
            enabled: true,
            role: 'system',
            content: storyString,
            placement: 'beforeCharacter',
            source: 'contextTemplate',
        });
    }
    const instructSystem = [
        normalizeText(instructTemplate.system_sequence),
        normalizeText(instructTemplate.system_suffix),
        normalizeText(instructTemplate.user_alignment_message),
    ].filter(Boolean).join('\n');
    if (instructTemplate.enabled !== false && instructSystem) {
        sections.push({
            id: 'instruct:system',
            label: normalizeText(instructTemplate.preset) || 'Instruct Template',
            enabled: true,
            role: 'system',
            content: instructSystem,
            placement: 'top',
            source: 'instructTemplate',
        });
    }
    return normalizeTavernChatPromptPresetBundle({
        id: [
            promptPresetName,
            normalizeText(systemPrompt.name),
            normalizeText(contextTemplate.preset),
            normalizeText(instructTemplate.preset),
        ].filter(Boolean).join(' / ') || createFallbackTavernChatPromptPresetBundle().id,
        name: promptPresetName || createFallbackTavernChatPromptPresetBundle().name,
        source: 'sillytavern',
        selected: true,
        promptManager: {
            name: promptPresetName,
            prompts: cloneJson(asArray(promptSettings.prompts)),
            promptOrder: cloneJson(promptSettings.prompt_order),
        },
        systemPrompt: {
            name: normalizeText(systemPrompt.name),
            enabled: systemPrompt.enabled !== false,
            content: syspromptContent,
            postHistory: normalizeText(systemPrompt.post_history),
        },
        contextTemplate: {
            name: normalizeText(contextTemplate.preset),
            storyString,
            chatStart: normalizeText(contextTemplate.chat_start),
            exampleSeparator: normalizeText(contextTemplate.example_separator),
        },
        instructTemplate: {
            name: normalizeText(instructTemplate.preset),
            enabled: instructTemplate.enabled === true,
            inputSequence: normalizeText(instructTemplate.input_sequence),
            inputSuffix: normalizeText(instructTemplate.input_suffix),
            outputSequence: normalizeText(instructTemplate.output_sequence),
            outputSuffix: normalizeText(instructTemplate.output_suffix),
            systemSequence: normalizeText(instructTemplate.system_sequence),
            systemSuffix: normalizeText(instructTemplate.system_suffix),
            firstInputSequence: normalizeText(instructTemplate.first_input_sequence),
            lastInputSequence: normalizeText(instructTemplate.last_input_sequence),
            firstOutputSequence: normalizeText(instructTemplate.first_output_sequence),
            lastOutputSequence: normalizeText(instructTemplate.last_output_sequence),
            stopSequence: normalizeText(instructTemplate.stop_sequence),
        },
        sections,
        updatedAt: Date.now(),
    });
}

function getComponentNames(): Record<string, string[]> {
    return {
        promptManager: getPresetManager('openai')?.getAllPresets?.() || [],
        systemPrompt: system_prompts.map((item: Record<string, unknown>) => normalizeText(item.name)).filter(Boolean),
        contextTemplate: context_presets.map((item: Record<string, unknown>) => normalizeText(item.name)).filter(Boolean),
        instructTemplate: instruct_presets.map((item: Record<string, unknown>) => normalizeText(item.name)).filter(Boolean),
    };
}

export function listTavernChatPresetBundles(): Record<string, unknown> {
    const active = buildCurrentBundle();
    return {
        active,
        bundles: [active],
        components: getComponentNames(),
    };
}

export function getTavernChatPresetBundle(): TavernChatPromptPresetBundle {
    return buildCurrentBundle();
}

async function savePromptManagerPreset(bundle: TavernChatPromptPresetBundle): Promise<void> {
    const manager = getPresetManager('openai');
    const name = normalizeText(bundle.promptManager?.name);
    if (!manager || !name) {return;}
    const existing = cloneJson(manager.getCompletionPresetByName?.(name) || {});
    if (!Object.keys(asRecord(existing)).length) {
        throw new Error(`聊天预设不存在：${name}`);
    }
    const patch: Record<string, unknown> = {
        ...asRecord(existing),
    };
    if (Array.isArray(bundle.promptManager?.prompts)) {
        patch.prompts = cloneJson(bundle.promptManager.prompts);
        if (promptManager?.serviceSettings) {
            promptManager.serviceSettings.prompts = cloneJson(bundle.promptManager.prompts);
        }
    }
    if (bundle.promptManager && 'promptOrder' in bundle.promptManager) {
        patch.prompt_order = cloneJson(bundle.promptManager.promptOrder);
        if (promptManager?.serviceSettings) {
            promptManager.serviceSettings.prompt_order = cloneJson(bundle.promptManager.promptOrder);
        }
    }
    await manager.savePreset?.(name, patch);
}

function applyPromptManagerPromptFieldsFromPreset(name = ''): boolean {
    const manager = getPresetManager('openai');
    const presetName = normalizeText(name);
    if (!manager || !presetName) {return false;}
    const preset = asRecord(manager.getCompletionPresetByName?.(presetName));
    if (!Object.keys(preset).length) {return false;}
    if (Array.isArray(preset.prompts) && promptManager?.serviceSettings) {
        promptManager.serviceSettings.prompts = cloneJson(preset.prompts);
    }
    if ('prompt_order' in preset && promptManager?.serviceSettings) {
        promptManager.serviceSettings.prompt_order = cloneJson(preset.prompt_order);
    }
    promptManager?.saveServiceSettings?.();
    promptManager?.render?.(false);
    return true;
}

async function saveSystemPromptPreset(bundle: TavernChatPromptPresetBundle): Promise<void> {
    const data = bundle.systemPrompt;
    const name = normalizeText(data?.name);
    if (!name) {return;}
    const preset = {
        name,
        content: normalizeText(data?.content),
        post_history: normalizeText(data?.postHistory),
    };
    await getPresetManager('sysprompt')?.savePreset?.(name, preset);
    power_user.sysprompt.enabled = data?.enabled !== false;
    power_user.sysprompt.name = name;
    power_user.sysprompt.content = preset.content;
    power_user.sysprompt.post_history = preset.post_history;
}

async function saveContextTemplate(bundle: TavernChatPromptPresetBundle): Promise<void> {
    const data = bundle.contextTemplate;
    const name = normalizeText(data?.name);
    if (!name) {return;}
    const existing = context_presets.find((item: Record<string, unknown>) => item.name === name) || {};
    const preset = {
        ...cloneJson(existing),
        name,
        story_string: normalizeText(data?.storyString),
        chat_start: normalizeText(data?.chatStart),
        example_separator: normalizeText(data?.exampleSeparator),
    };
    await getPresetManager('context')?.savePreset?.(name, preset);
    power_user.context.preset = name;
    Object.assign(power_user.context, preset);
}

async function saveInstructTemplate(bundle: TavernChatPromptPresetBundle): Promise<void> {
    const data = bundle.instructTemplate;
    const name = normalizeText(data?.name);
    if (!name) {return;}
    const existing = instruct_presets.find((item: Record<string, unknown>) => item.name === name) || {};
    const preset = {
        ...cloneJson(existing),
        name,
        input_sequence: normalizeText(data?.inputSequence),
        input_suffix: normalizeText(data?.inputSuffix),
        output_sequence: normalizeText(data?.outputSequence),
        output_suffix: normalizeText(data?.outputSuffix),
        system_sequence: normalizeText(data?.systemSequence),
        system_suffix: normalizeText(data?.systemSuffix),
        first_input_sequence: normalizeText(data?.firstInputSequence),
        last_input_sequence: normalizeText(data?.lastInputSequence),
        first_output_sequence: normalizeText(data?.firstOutputSequence),
        last_output_sequence: normalizeText(data?.lastOutputSequence),
        stop_sequence: normalizeText(data?.stopSequence),
    };
    await getPresetManager('instruct')?.savePreset?.(name, preset);
    power_user.instruct.enabled = data?.enabled === true;
    power_user.instruct.preset = name;
    Object.assign(power_user.instruct, preset);
}

export async function saveTavernChatPresetBundle(input: unknown): Promise<TavernChatPromptPresetBundle> {
    const bundle = normalizeTavernChatPromptPresetBundle(asRecord(input));
    await savePromptManagerPreset(bundle);
    await saveSystemPromptPreset(bundle);
    await saveContextTemplate(bundle);
    await saveInstructTemplate(bundle);
    saveSettingsDebounced?.();
    return buildCurrentBundle();
}

export async function selectTavernChatPresetBundle(input: unknown): Promise<TavernChatPromptPresetBundle> {
    const source = asRecord(input);
    const promptManagerName = normalizeText(source.promptManagerName || source.name);
    if (promptManagerName) {
        applyPromptManagerPromptFieldsFromPreset(promptManagerName);
    }
    const systemPromptName = normalizeText(source.systemPromptName);
    if (systemPromptName) {
        getPresetManager('sysprompt')?.selectPreset?.(getPresetManager('sysprompt')?.findPreset?.(systemPromptName));
    }
    const contextTemplateName = normalizeText(source.contextTemplateName);
    if (contextTemplateName) {
        getPresetManager('context')?.selectPreset?.(getPresetManager('context')?.findPreset?.(contextTemplateName));
    }
    const instructTemplateName = normalizeText(source.instructTemplateName);
    if (instructTemplateName) {
        getPresetManager('instruct')?.selectPreset?.(getPresetManager('instruct')?.findPreset?.(instructTemplateName));
    }
    saveSettingsDebounced?.();
    return buildCurrentBundle();
}
