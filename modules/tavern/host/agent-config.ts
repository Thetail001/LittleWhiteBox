import { getRequestHeaders } from '../../../../../../../script.js';
import { AssistantStorage } from '../../../core/server-storage.js';
import { normalizeAgentSettings } from '../../agent-core/config.js';

const SERVER_FILE_KEY = 'settings';

export async function loadTavernAgentConfig(): Promise<Record<string, unknown>> {
    try {
        return normalizeAgentSettings(await AssistantStorage.get(SERVER_FILE_KEY, null) || {});
    } catch {
        return normalizeAgentSettings({});
    }
}

export async function buildTavernFrameConfig(contextPayload: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
    return {
        agentConfig: await loadTavernAgentConfig(),
        hostRequestHeaders: getRequestHeaders?.() || {},
        ...contextPayload,
    };
}
