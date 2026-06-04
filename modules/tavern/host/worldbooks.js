/* eslint-disable -- generated from TypeScript source; run npm run build:tavern */
import { saveSettingsDebounced } from "../../../../../../../script.js";
import {
  createWorldInfoEntry,
  getWorldInfoSettings,
  loadWorldInfo,
  saveWorldInfo,
  selected_world_info,
  updateWorldInfoList,
  updateWorldInfoSettings,
  world_names
} from "../../../../../../world-info.js";
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
function normalizeList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => text(item)).filter(Boolean);
  }
  return String(value || "").split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
}
function entriesToArray(entries) {
  const source = Array.isArray(entries) ? entries : Object.values(asRecord(entries));
  return source.map((entry) => cloneJson(asRecord(entry))).sort((left, right) => {
    const leftOrder = Number(left.order ?? 0);
    const rightOrder = Number(right.order ?? 0);
    return rightOrder - leftOrder || Number(left.uid ?? 0) - Number(right.uid ?? 0);
  });
}
function normalizeWorldbookForClient(name, data = {}) {
  return {
    ...cloneJson(data),
    name: text(data.name) || name,
    entries: entriesToArray(data.entries)
  };
}
function buildEntriesForSave(existingEntries, nextEntries) {
  const existingByUid = /* @__PURE__ */ new Map();
  entriesToArray(existingEntries).forEach((entry) => {
    existingByUid.set(String(entry.uid ?? ""), entry);
  });
  const container = {};
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
      comment: String(entry.comment || ""),
      content: String(entry.content || ""),
      order: Number(entry.order ?? existing.order ?? 100),
      disable: entry.disable === true,
      constant: entry.constant === true,
      selective: entry.selective === true
    };
    container[String(finalUid)] = next;
  });
  return container;
}
async function ensureWorldbookNames() {
  if (!Array.isArray(world_names) || !world_names.length) {
    await updateWorldInfoList();
  }
  return Array.isArray(world_names) ? [...world_names] : [];
}
async function listTavernWorldbooks() {
  const names = await ensureWorldbookNames();
  const activeNames = Array.isArray(selected_world_info) ? [...selected_world_info] : [];
  return {
    books: names.map((name) => ({
      name,
      active: activeNames.includes(name)
    })),
    activeNames
  };
}
async function getTavernWorldbook(input) {
  const name = text(asRecord(input).name);
  if (!name) {
    throw new Error("\u7F3A\u5C11\u4E16\u754C\u4E66\u540D\u79F0\u3002");
  }
  const data = asRecord(await loadWorldInfo(name));
  if (!Object.keys(data).length) {
    throw new Error(`\u4E16\u754C\u4E66\u4E0D\u5B58\u5728\uFF1A${name}`);
  }
  return normalizeWorldbookForClient(name, data);
}
async function saveTavernWorldbook(input) {
  const payload = asRecord(input);
  const name = text(payload.name);
  const book = asRecord(payload.book);
  if (!name) {
    throw new Error("\u7F3A\u5C11\u4E16\u754C\u4E66\u540D\u79F0\u3002");
  }
  const existing = asRecord(await loadWorldInfo(name));
  if (!Object.keys(existing).length) {
    throw new Error(`\u4E16\u754C\u4E66\u4E0D\u5B58\u5728\uFF1A${name}`);
  }
  const next = {
    ...existing,
    ...cloneJson(book),
    name: text(book.name) || name,
    entries: buildEntriesForSave(existing.entries, book.entries ?? existing.entries)
  };
  await saveWorldInfo(name, next, true);
  return normalizeWorldbookForClient(name, next);
}
async function createTavernWorldbookEntry(input) {
  const payload = asRecord(input);
  const name = text(payload.name);
  if (!name) {
    throw new Error("\u7F3A\u5C11\u4E16\u754C\u4E66\u540D\u79F0\u3002");
  }
  const existing = asRecord(await loadWorldInfo(name));
  if (!Object.keys(existing).length) {
    throw new Error(`\u4E16\u754C\u4E66\u4E0D\u5B58\u5728\uFF1A${name}`);
  }
  const book = asRecord(payload.book);
  const data = {
    ...existing,
    ...cloneJson(book),
    name: text(book.name) || name,
    entries: buildEntriesForSave(existing.entries, book.entries ?? existing.entries)
  };
  if (!data.entries || typeof data.entries !== "object") {
    data.entries = {};
  }
  const entry = createWorldInfoEntry(name, data);
  if (!entry) {
    throw new Error("\u65E0\u6CD5\u521B\u5EFA\u4E16\u754C\u4E66\u6761\u76EE\u3002");
  }
  return normalizeWorldbookForClient(name, data);
}
function setTavernWorldbookActive(input) {
  const source = asRecord(input);
  const name = text(source.name);
  const active = source.active === true;
  if (!name) {
    throw new Error("\u7F3A\u5C11\u4E16\u754C\u4E66\u540D\u79F0\u3002");
  }
  const current = Array.isArray(selected_world_info) ? selected_world_info.filter((item) => item !== name) : [];
  const next = active ? [...current, name] : current;
  updateWorldInfoSettings(getWorldInfoSettings(), next);
  saveSettingsDebounced?.();
  return {
    activeNames: next
  };
}
export {
  createTavernWorldbookEntry,
  getTavernWorldbook,
  listTavernWorldbooks,
  saveTavernWorldbook,
  setTavernWorldbookActive
};
