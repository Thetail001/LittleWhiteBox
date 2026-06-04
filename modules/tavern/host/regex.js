/* eslint-disable -- generated from TypeScript source; run npm run build:tavern */
import { characters, this_chid } from "../../../../../../../script.js";
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
  substitute_find_regex
} from "../../../../../../extensions/regex/engine.js";
function asRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function cloneJson(value) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return value;
  }
}
function text(value) {
  return String(value || "").trim();
}
function normalizeScriptType(value) {
  const parsed = Number(value);
  if (parsed === SCRIPT_TYPES.GLOBAL || parsed === SCRIPT_TYPES.SCOPED || parsed === SCRIPT_TYPES.PRESET) {
    return parsed;
  }
  const label = text(value).toLowerCase();
  if (label === "global") {
    return SCRIPT_TYPES.GLOBAL;
  }
  if (label === "scoped" || label === "character") {
    return SCRIPT_TYPES.SCOPED;
  }
  if (label === "preset") {
    return SCRIPT_TYPES.PRESET;
  }
  throw new Error("\u672A\u77E5\u6B63\u5219\u7C7B\u578B\u3002");
}
function createId() {
  const cryptoApi = globalThis.crypto;
  if (cryptoApi?.randomUUID) {
    return cryptoApi.randomUUID();
  }
  return `regex-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
function normalizeStringArray(value) {
  if (Array.isArray(value)) {
    return value.map((item) => text(item)).filter(Boolean);
  }
  return String(value || "").split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
}
function normalizeNumberArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((item) => Number(item)).filter((item) => Number.isFinite(item));
}
function nullableNumber(value) {
  if (value === null || value === void 0 || value === "") {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
function normalizeRegexScript(input) {
  const source = asRecord(input);
  return {
    ...cloneJson(source),
    id: text(source.id) || createId(),
    scriptName: text(source.scriptName),
    findRegex: String(source.findRegex || ""),
    replaceString: String(source.replaceString || ""),
    trimStrings: normalizeStringArray(source.trimStrings),
    placement: normalizeNumberArray(source.placement),
    disabled: source.disabled === true,
    markdownOnly: source.markdownOnly === true,
    promptOnly: source.promptOnly === true,
    runOnEdit: source.runOnEdit !== false,
    substituteRegex: Number.isFinite(Number(source.substituteRegex)) ? Number(source.substituteRegex) : substitute_find_regex.NONE,
    minDepth: nullableNumber(source.minDepth),
    maxDepth: nullableNumber(source.maxDepth)
  };
}
function currentCharacter() {
  const index = Number(this_chid);
  return Number.isFinite(index) ? characters?.[index] : void 0;
}
function buildGroup(scriptType, key, label) {
  const scripts = getScriptsByType(scriptType).map((script) => normalizeRegexScript(script));
  const presetApi = getCurrentPresetAPI();
  const presetName = getCurrentPresetName();
  return {
    key,
    label,
    scriptType,
    scripts,
    allowed: scriptType === SCRIPT_TYPES.SCOPED ? isScopedScriptsAllowed(currentCharacter()) : scriptType === SCRIPT_TYPES.PRESET ? isPresetScriptsAllowed(presetApi, presetName) : true
  };
}
function listTavernRegexScripts() {
  return {
    groups: [
      buildGroup(SCRIPT_TYPES.GLOBAL, "global", "\u5168\u5C40"),
      buildGroup(SCRIPT_TYPES.SCOPED, "scoped", "\u5F53\u524D\u89D2\u8272"),
      buildGroup(SCRIPT_TYPES.PRESET, "preset", "\u5F53\u524D\u9884\u8BBE")
    ],
    placements: {
      userInput: regex_placement.USER_INPUT,
      aiOutput: regex_placement.AI_OUTPUT,
      slashCommand: regex_placement.SLASH_COMMAND,
      worldInfo: regex_placement.WORLD_INFO,
      reasoning: regex_placement.REASONING
    }
  };
}
async function saveTavernRegexScript(input) {
  const source = asRecord(input);
  const scriptType = normalizeScriptType(source.scriptType);
  const script = normalizeRegexScript(source.script);
  if (!script.scriptName) {
    throw new Error("\u6B63\u5219\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\u3002");
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
async function deleteTavernRegexScript(input) {
  const source = asRecord(input);
  const scriptType = normalizeScriptType(source.scriptType);
  const id = text(source.id);
  if (!id) {
    throw new Error("\u7F3A\u5C11\u6B63\u5219 ID\u3002");
  }
  const scripts = getScriptsByType(scriptType).map((item) => normalizeRegexScript(item)).filter((item) => item.id !== id);
  await saveScriptsByType(scripts, scriptType);
  return listTavernRegexScripts();
}
export {
  deleteTavernRegexScript,
  listTavernRegexScripts,
  saveTavernRegexScript
};
