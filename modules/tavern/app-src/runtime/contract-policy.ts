import {
    getTavernContractMandateDefinition,
    resolveTavernSessionContractRuntime,
    type TavernSessionContract,
    type TavernSessionContractRuntime,
} from '../../shared/session-contract';
import { TAVERN_MEMORY_TOOL_NAMES, type TavernMemoryToolResult } from '../../shared/memory-files';
import { TAVERN_STATE_TOOL_NAMES, type TavernStateToolResult } from '../../shared/structured-state';

const MEMORY_TOOL_NAMES: string[] = Object.values(TAVERN_MEMORY_TOOL_NAMES)
    .filter((name) => name !== TAVERN_MEMORY_TOOL_NAMES.CHAT_HISTORY);
const STATE_TOOL_NAMES: string[] = Object.values(TAVERN_STATE_TOOL_NAMES);

export interface TavernAutoManagerToolPolicy {
    runtime: TavernSessionContractRuntime;
    allowedToolNames: string[];
    deniedToolNames: string[];
}

function getAutoManagerToolModuleKey(toolName = ''): 'memoryArchiving' | 'cartographyEngine' | null {
    const name = String(toolName || '').trim();
    if (!name || name === TAVERN_MEMORY_TOOL_NAMES.CHAT_HISTORY) {return null;}
    if (MEMORY_TOOL_NAMES.includes(name)) {return 'memoryArchiving';}
    if (STATE_TOOL_NAMES.includes(name)) {return 'cartographyEngine';}
    return null;
}

function isStateToolName(toolName = ''): boolean {
    return STATE_TOOL_NAMES.includes(String(toolName || '').trim());
}

export function resolveTavernAutoManagerToolPolicy(
    contract?: Partial<TavernSessionContract> | null,
): TavernAutoManagerToolPolicy {
    const runtime = resolveTavernSessionContractRuntime(contract);
    const allowedToolNames: string[] = [TAVERN_MEMORY_TOOL_NAMES.CHAT_HISTORY];
    if (runtime.includeMemoryFiles) {
        allowedToolNames.push(...MEMORY_TOOL_NAMES);
    }
    if (runtime.includeStructuredStates) {
        allowedToolNames.push(...STATE_TOOL_NAMES);
    }
    const allowed = new Set(allowedToolNames);
    const deniedToolNames = [...MEMORY_TOOL_NAMES, ...STATE_TOOL_NAMES].filter((name) => !allowed.has(name));
    return {
        runtime,
        allowedToolNames: [...allowed],
        deniedToolNames,
    };
}

export function filterAutoManagerToolDefinitions<T extends { function?: { name?: string } }>(
    tools: T[] = [],
    contract?: Partial<TavernSessionContract> | null,
): T[] {
    const allowed = new Set(resolveTavernAutoManagerToolPolicy(contract).allowedToolNames);
    return tools.filter((tool) => allowed.has(String(tool?.function?.name || '').trim()));
}

export function isAutoManagerToolAllowed(
    toolName = '',
    contract?: Partial<TavernSessionContract> | null,
): boolean {
    const allowed = new Set(resolveTavernAutoManagerToolPolicy(contract).allowedToolNames);
    return allowed.has(String(toolName || '').trim());
}

export function buildDeniedAutoManagerToolResult(
    toolName = '',
    contract?: Partial<TavernSessionContract> | null,
): TavernMemoryToolResult | TavernStateToolResult {
    const name = String(toolName || '').trim();
    const moduleKey = getAutoManagerToolModuleKey(name);
    const moduleTitle = moduleKey
        ? (getTavernContractMandateDefinition(moduleKey)?.title || moduleKey)
        : 'Auto Manager';
    const summary = moduleKey
        ? `契约未授权 ${moduleTitle}，本轮不会执行 ${name || '该工具'}。`
        : `自动管理员当前不会执行 ${name || '该工具'}。`;
    if (isStateToolName(name)) {
        return {
            ok: false,
            summary,
            changed: false,
            error: 'contract_tool_unauthorized',
            warnings: resolveTavernAutoManagerToolPolicy(contract).runtime.hasAutomaticManagerWork
                ? []
                : ['contract_manager_work_disabled'],
        };
    }
    return {
        ok: false,
        summary,
        changed: false,
        error: 'contract_tool_unauthorized',
        warning: resolveTavernAutoManagerToolPolicy(contract).runtime.hasAutomaticManagerWork
            ? ''
            : 'contract_manager_work_disabled',
    };
}
