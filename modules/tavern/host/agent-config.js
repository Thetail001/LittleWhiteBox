/* eslint-disable -- generated from TypeScript source; run npm run build:tavern */
import { getRequestHeaders } from "../../../../../../../script.js";
import { AssistantStorage } from "../../../core/server-storage.js";
import { normalizeAgentSettings } from "../../agent-core/config.js";
const SERVER_FILE_KEY = "settings";
async function loadTavernAgentConfig() {
  try {
    return normalizeAgentSettings(await AssistantStorage.get(SERVER_FILE_KEY, null) || {});
  } catch {
    return normalizeAgentSettings({});
  }
}
async function buildTavernFrameConfig(contextPayload = {}) {
  return {
    agentConfig: await loadTavernAgentConfig(),
    hostRequestHeaders: getRequestHeaders?.() || {},
    ...contextPayload
  };
}
export {
  buildTavernFrameConfig,
  loadTavernAgentConfig
};
