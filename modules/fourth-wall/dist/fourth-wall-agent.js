var om = Object.create, Xc = Object.defineProperty, im = Object.getOwnPropertyDescriptor, sm = Object.getOwnPropertyNames, rm = Object.getPrototypeOf, am = Object.prototype.hasOwnProperty, Mi = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), lm = (e, t, n, o) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (var i = sm(t), s = 0, a = i.length, u; s < a; s++)
      u = i[s], !am.call(e, u) && u !== n && Xc(e, u, {
        get: ((c) => t[c]).bind(null, u),
        enumerable: !(o = im(t, u)) || o.enumerable
      });
  return e;
}, um = (e, t, n) => (n = e != null ? om(rm(e)) : {}, lm(t || !e || !e.__esModule ? Xc(n, "default", {
  value: e,
  enumerable: !0
}) : n, e)), cm = "https://api.tavily.com";
function Ps(e = "") {
  return String(e || "").trim();
}
function Ue(e = "") {
  return String(e || "").trim().replace(/\/+$/, "") || "https://api.tavily.com";
}
var Qc = "openai-compatible", br = "默认", Zc = "default", dm = "deny", fm = Object.freeze([{
  value: "default",
  label: "默认权限"
}, {
  value: "full",
  label: "完全权限"
}]), pm = Object.freeze([{
  value: "deny",
  label: "禁止"
}, {
  value: "allow",
  label: "允许"
}]), xs = {
  "openai-responses": {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4.1-mini",
    apiKey: "",
    temperature: 0.2,
    sendTemperature: !0
  },
  "openai-compatible": {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4o-mini",
    apiKey: "",
    temperature: 0.2,
    sendTemperature: !0,
    toolMode: "native"
  },
  "sillytavern-openai-compatible": {
    baseUrl: "",
    model: "gpt-4o-mini",
    apiKey: "",
    temperature: 0.2,
    sendTemperature: !0,
    toolMode: "native"
  },
  "sillytavern-claude": {
    baseUrl: "",
    model: "claude-sonnet-4-0",
    apiKey: "",
    temperature: 0.2,
    sendTemperature: !0
  },
  "sillytavern-google": {
    baseUrl: "",
    model: "gemini-2.5-pro",
    apiKey: "",
    temperature: 0.2,
    sendTemperature: !0
  },
  anthropic: {
    baseUrl: "https://api.anthropic.com",
    model: "claude-sonnet-4-0",
    apiKey: "",
    temperature: 0.2,
    sendTemperature: !0
  },
  google: {
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    model: "gemini-2.5-pro",
    apiKey: "",
    temperature: 0.2,
    sendTemperature: !0
  }
};
function jt() {
  return JSON.parse(JSON.stringify(xs));
}
function Ee() {
  return {
    provider: Qc,
    modelConfigs: jt(),
    permissionMode: Zc
  };
}
function hm(e = Ee()) {
  const t = e && typeof e == "object" ? e : Ee();
  return {
    provider: Rr(t.provider),
    modelConfigs: De(t.modelConfigs || {})
  };
}
function en(e) {
  return e === "full" ? "full" : Zc;
}
function je(e) {
  return e === "allow" ? "allow" : dm;
}
function ce(e) {
  return String(e || "").trim() || "默认";
}
function De(e = {}) {
  const t = jt();
  return Object.keys(xs).forEach((n) => {
    t[n] = {
      ...xs[n],
      ...e && typeof e[n] == "object" ? e[n] : {}
    };
  }), t;
}
function Rr(e) {
  return typeof e == "string" && e.trim() ? e : Qc;
}
function Pr(e = {}, t) {
  return e && typeof e.presets == "object" && e.presets ? e.presets : e?.modelConfigs ? { [t]: {
    provider: e.provider || "openai-compatible",
    modelConfigs: e.modelConfigs,
    permissionMode: e.permissionMode
  } } : {};
}
function jc(e = {}, t) {
  const n = {}, o = Pr(e, t);
  return Object.entries(o).forEach(([i, s]) => {
    if (!s || typeof s != "object") return;
    const a = ce(i);
    n[a] = {
      provider: Rr(s.provider),
      modelConfigs: De(s.modelConfigs || {}),
      permissionMode: en(s.permissionMode)
    };
  }), Object.keys(n).length || (n[br] = Ee()), n;
}
function ed(e, t) {
  const n = ce(t);
  return e[n] ? n : Object.keys(e)[0];
}
function td(e, t, n) {
  const o = ce(t || n);
  return e[o] ? o : e[n] ? n : Object.keys(e)[0];
}
function nd(e = {}, t = Ee()) {
  const n = hm(t), o = e && typeof e == "object" ? e : {};
  return {
    provider: Rr(o.provider || n.provider),
    modelConfigs: De(o.modelConfigs || n.modelConfigs)
  };
}
function mm(e = {}, t, n, o, i) {
  const s = i(e?.[o]);
  if (s) return s;
  const a = Pr(e, t), u = [
    n,
    t,
    e?.currentPresetName,
    e?.delegatePresetName,
    ...Object.keys(a || {})
  ].map(ce), c = /* @__PURE__ */ new Set();
  for (const d of u) {
    if (c.has(d)) continue;
    c.add(d);
    const p = i(a?.[d]?.[o]);
    if (p) return p;
  }
  return i(e?.delegateConfig?.[o]);
}
function gm(e = {}, t, n) {
  const o = (u) => String(u || "").trim();
  if (o(e?.tavilyBaseUrl)) return Ue(e.tavilyBaseUrl);
  const i = Pr(e, t), s = [
    n,
    t,
    e?.currentPresetName,
    e?.delegatePresetName,
    ...Object.keys(i || {})
  ].map(ce), a = /* @__PURE__ */ new Set();
  for (const u of s) {
    if (a.has(u)) continue;
    a.add(u);
    const c = i?.[u]?.tavilyBaseUrl;
    if (o(c)) return Ue(c);
  }
  return o(e?.delegateConfig?.tavilyBaseUrl) ? Ue(e.delegateConfig.tavilyBaseUrl) : cm;
}
function od(e = {}, t, n) {
  return {
    tavilyApiKey: mm(e, t, n, "tavilyApiKey", Ps),
    tavilyBaseUrl: gm(e, t, n)
  };
}
function ym(e = {}, t = {}) {
  const { defaultWorkspaceFileName: n = "", normalizeWorkspaceName: o = (f) => String(f || "") } = t, i = ce(e.currentPresetName || e.presetName || "默认"), s = jc(e, i), a = ed(s, e.currentPresetName), u = td(s, e.delegatePresetName, a), c = s[u] || s[a] || Ee(), d = nd(e.delegateConfig, c), p = od(e, i, a);
  return {
    enabled: !!e.enabled,
    workspaceFileName: o(e.workspaceFileName || n),
    jsApiPermission: je(e.jsApiPermission),
    currentPresetName: a,
    delegatePresetName: u,
    delegateConfig: d,
    presets: s,
    tavilyApiKey: p.tavilyApiKey,
    tavilyBaseUrl: p.tavilyBaseUrl,
    updatedAt: Number(e.updatedAt) || 0,
    configVersion: Number(e.configVersion) || 0
  };
}
function Zo(e = {}) {
  const t = ce(e.currentPresetName || e.presetDraftName || "默认"), n = jc(e, t), o = ed(n, e.currentPresetName), i = td(n, e.delegatePresetName, o), s = n[o] || Ee(), a = n[i] || s, u = nd(e.delegateConfig, a), c = od(e, t, o);
  return {
    workspaceFileName: String(e.workspaceFileName || ""),
    jsApiPermission: je(e.jsApiPermission),
    currentPresetName: o,
    delegatePresetName: i,
    delegateConfig: u,
    presetDraftName: ce(e.presetDraftName || o),
    presetNames: Object.keys(n),
    presets: n,
    provider: s.provider,
    modelConfigs: s.modelConfigs,
    permissionMode: en(s.permissionMode),
    tavilyApiKey: c.tavilyApiKey,
    tavilyBaseUrl: c.tavilyBaseUrl
  };
}
function U(e, t, n, o, i) {
  if (o === "m") throw new TypeError("Private method is not writable");
  if (o === "a" && !i) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return o === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}
function S(e, t, n, o) {
  if (n === "a" && !o) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? e !== t || !o : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n === "m" ? o : n === "a" ? o.call(e) : o ? o.value : t.get(e);
}
var id = function() {
  const { crypto: e } = globalThis;
  if (e?.randomUUID)
    return id = e.randomUUID.bind(e), e.randomUUID();
  const t = new Uint8Array(1), n = e ? () => e.getRandomValues(t)[0] : () => Math.random() * 255 & 255;
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (o) => (+o ^ n() & 15 >> +o / 4).toString(16));
};
function uo(e) {
  return typeof e == "object" && e !== null && ("name" in e && e.name === "AbortError" || "message" in e && String(e.message).includes("FetchRequestCanceledException"));
}
var Ms = (e) => {
  if (e instanceof Error) return e;
  if (typeof e == "object" && e !== null) {
    try {
      if (Object.prototype.toString.call(e) === "[object Error]") {
        const t = new Error(e.message, e.cause ? { cause: e.cause } : {});
        return e.stack && (t.stack = e.stack), e.cause && !t.cause && (t.cause = e.cause), e.name && (t.name = e.name), t;
      }
    } catch {
    }
    try {
      return new Error(JSON.stringify(e));
    } catch {
    }
  }
  return new Error(e);
}, H = class extends Error {
}, Le = class Ns extends H {
  constructor(t, n, o, i, s) {
    super(`${Ns.makeMessage(t, n, o)}`), this.status = t, this.headers = i, this.requestID = i?.get("request-id"), this.error = n, this.type = s ?? null;
  }
  static makeMessage(t, n, o) {
    const i = n?.message ? typeof n.message == "string" ? n.message : JSON.stringify(n.message) : n ? JSON.stringify(n) : o;
    return t && i ? `${t} ${i}` : t ? `${t} status code (no body)` : i || "(no status code or body)";
  }
  static generate(t, n, o, i) {
    if (!t || !i) return new Ni({
      message: o,
      cause: Ms(n)
    });
    const s = n, a = s?.error?.type;
    return t === 400 ? new rd(t, s, o, i, a) : t === 401 ? new ad(t, s, o, i, a) : t === 403 ? new ld(t, s, o, i, a) : t === 404 ? new ud(t, s, o, i, a) : t === 409 ? new cd(t, s, o, i, a) : t === 422 ? new dd(t, s, o, i, a) : t === 429 ? new fd(t, s, o, i, a) : t >= 500 ? new pd(t, s, o, i, a) : new Ns(t, s, o, i, a);
  }
}, We = class extends Le {
  constructor({ message: e } = {}) {
    super(void 0, void 0, e || "Request was aborted.", void 0);
  }
}, Ni = class extends Le {
  constructor({ message: e, cause: t }) {
    super(void 0, void 0, e || "Connection error.", void 0), t && (this.cause = t);
  }
}, sd = class extends Ni {
  constructor({ message: e } = {}) {
    super({ message: e ?? "Request timed out." });
  }
}, rd = class extends Le {
}, ad = class extends Le {
}, ld = class extends Le {
}, ud = class extends Le {
}, cd = class extends Le {
}, dd = class extends Le {
}, fd = class extends Le {
}, pd = class extends Le {
}, _m = /^[a-z][a-z0-9+.-]*:/i, vm = (e) => _m.test(e), ks = (e) => (ks = Array.isArray, ks(e)), Fa = ks;
function Ds(e) {
  return typeof e != "object" ? {} : e ?? {};
}
function Ba(e) {
  if (!e) return !0;
  for (const t in e) return !1;
  return !0;
}
function Tm(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
var Sm = (e, t) => {
  if (typeof t != "number" || !Number.isInteger(t)) throw new H(`${e} must be an integer`);
  if (t < 0) throw new H(`${e} must be a positive integer`);
  return t;
}, hd = (e) => {
  try {
    return JSON.parse(e);
  } catch {
    return;
  }
}, Em = (e) => new Promise((t) => setTimeout(t, e)), Yt = "0.89.0", wm = () => typeof window < "u" && typeof window.document < "u" && typeof navigator < "u";
function Am() {
  return typeof Deno < "u" && Deno.build != null ? "deno" : typeof EdgeRuntime < "u" ? "edge" : Object.prototype.toString.call(typeof globalThis.process < "u" ? globalThis.process : 0) === "[object process]" ? "node" : "unknown";
}
var Cm = () => {
  const e = Am();
  if (e === "deno") return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": Yt,
    "X-Stainless-OS": Oa(Deno.build.os),
    "X-Stainless-Arch": Ga(Deno.build.arch),
    "X-Stainless-Runtime": "deno",
    "X-Stainless-Runtime-Version": typeof Deno.version == "string" ? Deno.version : Deno.version?.deno ?? "unknown"
  };
  if (typeof EdgeRuntime < "u") return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": Yt,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": `other:${EdgeRuntime}`,
    "X-Stainless-Runtime": "edge",
    "X-Stainless-Runtime-Version": globalThis.process.version
  };
  if (e === "node") return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": Yt,
    "X-Stainless-OS": Oa(globalThis.process.platform ?? "unknown"),
    "X-Stainless-Arch": Ga(globalThis.process.arch ?? "unknown"),
    "X-Stainless-Runtime": "node",
    "X-Stainless-Runtime-Version": globalThis.process.version ?? "unknown"
  };
  const t = Im();
  return t ? {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": Yt,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": `browser:${t.browser}`,
    "X-Stainless-Runtime-Version": t.version
  } : {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": Yt,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": "unknown",
    "X-Stainless-Runtime-Version": "unknown"
  };
};
function Im() {
  if (typeof navigator > "u" || !navigator) return null;
  for (const { key: e, pattern: t } of [
    {
      key: "edge",
      pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    },
    {
      key: "ie",
      pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    },
    {
      key: "ie",
      pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/
    },
    {
      key: "chrome",
      pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    },
    {
      key: "firefox",
      pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    },
    {
      key: "safari",
      pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/
    }
  ]) {
    const n = t.exec(navigator.userAgent);
    if (n) return {
      browser: e,
      version: `${n[1] || 0}.${n[2] || 0}.${n[3] || 0}`
    };
  }
  return null;
}
var Ga = (e) => e === "x32" ? "x32" : e === "x86_64" || e === "x64" ? "x64" : e === "arm" ? "arm" : e === "aarch64" || e === "arm64" ? "arm64" : e ? `other:${e}` : "unknown", Oa = (e) => (e = e.toLowerCase(), e.includes("ios") ? "iOS" : e === "android" ? "Android" : e === "darwin" ? "MacOS" : e === "win32" ? "Windows" : e === "freebsd" ? "FreeBSD" : e === "openbsd" ? "OpenBSD" : e === "linux" ? "Linux" : e ? `Other:${e}` : "Unknown"), qa, bm = () => qa ?? (qa = Cm());
function Rm() {
  if (typeof fetch < "u") return fetch;
  throw new Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new Anthropic({ fetch })` or polyfill the global, `globalThis.fetch = fetch`");
}
function md(...e) {
  const t = globalThis.ReadableStream;
  if (typeof t > "u") throw new Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");
  return new t(...e);
}
function gd(e) {
  let t = Symbol.asyncIterator in e ? e[Symbol.asyncIterator]() : e[Symbol.iterator]();
  return md({
    start() {
    },
    async pull(n) {
      const { done: o, value: i } = await t.next();
      o ? n.close() : n.enqueue(i);
    },
    async cancel() {
      await t.return?.();
    }
  });
}
function xr(e) {
  if (e[Symbol.asyncIterator]) return e;
  const t = e.getReader();
  return {
    async next() {
      try {
        const n = await t.read();
        return n?.done && t.releaseLock(), n;
      } catch (n) {
        throw t.releaseLock(), n;
      }
    },
    async return() {
      const n = t.cancel();
      return t.releaseLock(), await n, {
        done: !0,
        value: void 0
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
async function Pm(e) {
  if (e === null || typeof e != "object") return;
  if (e[Symbol.asyncIterator]) {
    await e[Symbol.asyncIterator]().return?.();
    return;
  }
  const t = e.getReader(), n = t.cancel();
  t.releaseLock(), await n;
}
var xm = ({ headers: e, body: t }) => ({
  bodyHeaders: { "content-type": "application/json" },
  body: JSON.stringify(t)
});
function Mm(e) {
  return Object.entries(e).filter(([t, n]) => typeof n < "u").map(([t, n]) => {
    if (typeof n == "string" || typeof n == "number" || typeof n == "boolean") return `${encodeURIComponent(t)}=${encodeURIComponent(n)}`;
    if (n === null) return `${encodeURIComponent(t)}=`;
    throw new H(`Cannot stringify type ${typeof n}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`);
  }).join("&");
}
function Nm(e) {
  let t = 0;
  for (const i of e) t += i.length;
  const n = new Uint8Array(t);
  let o = 0;
  for (const i of e)
    n.set(i, o), o += i.length;
  return n;
}
var Va;
function Mr(e) {
  let t;
  return (Va ?? (t = new globalThis.TextEncoder(), Va = t.encode.bind(t)))(e);
}
var Ha;
function Ja(e) {
  let t;
  return (Ha ?? (t = new globalThis.TextDecoder(), Ha = t.decode.bind(t)))(e);
}
var be, Re, go = class {
  constructor() {
    be.set(this, void 0), Re.set(this, void 0), U(this, be, new Uint8Array(), "f"), U(this, Re, null, "f");
  }
  decode(e) {
    if (e == null) return [];
    const t = e instanceof ArrayBuffer ? new Uint8Array(e) : typeof e == "string" ? Mr(e) : e;
    U(this, be, Nm([S(this, be, "f"), t]), "f");
    const n = [];
    let o;
    for (; (o = km(S(this, be, "f"), S(this, Re, "f"))) != null; ) {
      if (o.carriage && S(this, Re, "f") == null) {
        U(this, Re, o.index, "f");
        continue;
      }
      if (S(this, Re, "f") != null && (o.index !== S(this, Re, "f") + 1 || o.carriage)) {
        n.push(Ja(S(this, be, "f").subarray(0, S(this, Re, "f") - 1))), U(this, be, S(this, be, "f").subarray(S(this, Re, "f")), "f"), U(this, Re, null, "f");
        continue;
      }
      const i = S(this, Re, "f") !== null ? o.preceding - 1 : o.preceding, s = Ja(S(this, be, "f").subarray(0, i));
      n.push(s), U(this, be, S(this, be, "f").subarray(o.index), "f"), U(this, Re, null, "f");
    }
    return n;
  }
  flush() {
    return S(this, be, "f").length ? this.decode(`
`) : [];
  }
};
be = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap();
go.NEWLINE_CHARS = /* @__PURE__ */ new Set([`
`, "\r"]);
go.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
function km(e, t) {
  for (let i = t ?? 0; i < e.length; i++) {
    if (e[i] === 10) return {
      preceding: i,
      index: i + 1,
      carriage: !1
    };
    if (e[i] === 13) return {
      preceding: i,
      index: i + 1,
      carriage: !0
    };
  }
  return null;
}
function Dm(e) {
  for (let o = 0; o < e.length - 1; o++) {
    if (e[o] === 10 && e[o + 1] === 10 || e[o] === 13 && e[o + 1] === 13) return o + 2;
    if (e[o] === 13 && e[o + 1] === 10 && o + 3 < e.length && e[o + 2] === 13 && e[o + 3] === 10) return o + 4;
  }
  return -1;
}
var mi = {
  off: 0,
  error: 200,
  warn: 300,
  info: 400,
  debug: 500
}, Wa = (e, t, n) => {
  if (e) {
    if (Tm(mi, e)) return e;
    ve(n).warn(`${t} was set to ${JSON.stringify(e)}, expected one of ${JSON.stringify(Object.keys(mi))}`);
  }
};
function Fn() {
}
function Co(e, t, n) {
  return !t || mi[e] > mi[n] ? Fn : t[e].bind(t);
}
var Um = {
  error: Fn,
  warn: Fn,
  info: Fn,
  debug: Fn
}, Ka = /* @__PURE__ */ new WeakMap();
function ve(e) {
  const t = e.logger, n = e.logLevel ?? "off";
  if (!t) return Um;
  const o = Ka.get(t);
  if (o && o[0] === n) return o[1];
  const i = {
    error: Co("error", t, n),
    warn: Co("warn", t, n),
    info: Co("info", t, n),
    debug: Co("debug", t, n)
  };
  return Ka.set(t, [n, i]), i;
}
var It = (e) => (e.options && (e.options = { ...e.options }, delete e.options.headers), e.headers && (e.headers = Object.fromEntries((e.headers instanceof Headers ? [...e.headers] : Object.entries(e.headers)).map(([t, n]) => [t, t.toLowerCase() === "x-api-key" || t.toLowerCase() === "authorization" || t.toLowerCase() === "cookie" || t.toLowerCase() === "set-cookie" ? "***" : n]))), "retryOfRequestLogID" in e && (e.retryOfRequestLogID && (e.retryOf = e.retryOfRequestLogID), delete e.retryOfRequestLogID), e), Tn, co = class Bn {
  constructor(t, n, o) {
    this.iterator = t, Tn.set(this, void 0), this.controller = n, U(this, Tn, o, "f");
  }
  static fromSSEResponse(t, n, o) {
    let i = !1;
    const s = o ? ve(o) : console;
    async function* a() {
      if (i) throw new H("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      i = !0;
      let u = !1;
      try {
        for await (const c of Lm(t, n)) {
          if (c.event === "completion") try {
            yield JSON.parse(c.data);
          } catch (d) {
            throw s.error("Could not parse message into JSON:", c.data), s.error("From chunk:", c.raw), d;
          }
          if (c.event === "message_start" || c.event === "message_delta" || c.event === "message_stop" || c.event === "content_block_start" || c.event === "content_block_delta" || c.event === "content_block_stop" || c.event === "message" || c.event === "user.message" || c.event === "user.interrupt" || c.event === "user.tool_confirmation" || c.event === "user.custom_tool_result" || c.event === "agent.message" || c.event === "agent.thinking" || c.event === "agent.tool_use" || c.event === "agent.tool_result" || c.event === "agent.mcp_tool_use" || c.event === "agent.mcp_tool_result" || c.event === "agent.custom_tool_use" || c.event === "agent.thread_context_compacted" || c.event === "session.status_running" || c.event === "session.status_idle" || c.event === "session.status_rescheduled" || c.event === "session.status_terminated" || c.event === "session.error" || c.event === "session.deleted" || c.event === "span.model_request_start" || c.event === "span.model_request_end") try {
            yield JSON.parse(c.data);
          } catch (d) {
            throw s.error("Could not parse message into JSON:", c.data), s.error("From chunk:", c.raw), d;
          }
          if (c.event !== "ping" && c.event === "error") {
            const d = hd(c.data) ?? c.data, p = d?.error?.type;
            throw new Le(void 0, d, void 0, t.headers, p);
          }
        }
        u = !0;
      } catch (c) {
        if (uo(c)) return;
        throw c;
      } finally {
        u || n.abort();
      }
    }
    return new Bn(a, n, o);
  }
  static fromReadableStream(t, n, o) {
    let i = !1;
    async function* s() {
      const u = new go(), c = xr(t);
      for await (const d of c) for (const p of u.decode(d)) yield p;
      for (const d of u.flush()) yield d;
    }
    async function* a() {
      if (i) throw new H("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      i = !0;
      let u = !1;
      try {
        for await (const c of s())
          u || c && (yield JSON.parse(c));
        u = !0;
      } catch (c) {
        if (uo(c)) return;
        throw c;
      } finally {
        u || n.abort();
      }
    }
    return new Bn(a, n, o);
  }
  [(Tn = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    return this.iterator();
  }
  tee() {
    const t = [], n = [], o = this.iterator(), i = (s) => ({ next: () => {
      if (s.length === 0) {
        const a = o.next();
        t.push(a), n.push(a);
      }
      return s.shift();
    } });
    return [new Bn(() => i(t), this.controller, S(this, Tn, "f")), new Bn(() => i(n), this.controller, S(this, Tn, "f"))];
  }
  toReadableStream() {
    const t = this;
    let n;
    return md({
      async start() {
        n = t[Symbol.asyncIterator]();
      },
      async pull(o) {
        try {
          const { value: i, done: s } = await n.next();
          if (s) return o.close();
          const a = Mr(JSON.stringify(i) + `
`);
          o.enqueue(a);
        } catch (i) {
          o.error(i);
        }
      },
      async cancel() {
        await n.return?.();
      }
    });
  }
};
async function* Lm(e, t) {
  if (!e.body)
    throw t.abort(), typeof globalThis.navigator < "u" && globalThis.navigator.product === "ReactNative" ? new H("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api") : new H("Attempted to iterate over a response with no body");
  const n = new Fm(), o = new go(), i = xr(e.body);
  for await (const s of $m(i)) for (const a of o.decode(s)) {
    const u = n.decode(a);
    u && (yield u);
  }
  for (const s of o.flush()) {
    const a = n.decode(s);
    a && (yield a);
  }
}
async function* $m(e) {
  let t = new Uint8Array();
  for await (const n of e) {
    if (n == null) continue;
    const o = n instanceof ArrayBuffer ? new Uint8Array(n) : typeof n == "string" ? Mr(n) : n;
    let i = new Uint8Array(t.length + o.length);
    i.set(t), i.set(o, t.length), t = i;
    let s;
    for (; (s = Dm(t)) !== -1; )
      yield t.slice(0, s), t = t.slice(s);
  }
  t.length > 0 && (yield t);
}
var Fm = class {
  constructor() {
    this.event = null, this.data = [], this.chunks = [];
  }
  decode(e) {
    if (e.endsWith("\r") && (e = e.substring(0, e.length - 1)), !e) {
      if (!this.event && !this.data.length) return null;
      const i = {
        event: this.event,
        data: this.data.join(`
`),
        raw: this.chunks
      };
      return this.event = null, this.data = [], this.chunks = [], i;
    }
    if (this.chunks.push(e), e.startsWith(":")) return null;
    let [t, n, o] = Bm(e, ":");
    return o.startsWith(" ") && (o = o.substring(1)), t === "event" ? this.event = o : t === "data" && this.data.push(o), null;
  }
};
function Bm(e, t) {
  const n = e.indexOf(t);
  return n !== -1 ? [
    e.substring(0, n),
    t,
    e.substring(n + t.length)
  ] : [
    e,
    "",
    ""
  ];
}
async function yd(e, t) {
  const { response: n, requestLogID: o, retryOfRequestLogID: i, startTime: s } = t, a = await (async () => {
    if (t.options.stream)
      return ve(e).debug("response", n.status, n.url, n.headers, n.body), t.options.__streamClass ? t.options.__streamClass.fromSSEResponse(n, t.controller) : co.fromSSEResponse(n, t.controller);
    if (n.status === 204) return null;
    if (t.options.__binaryResponse) return n;
    const u = n.headers.get("content-type")?.split(";")[0]?.trim();
    return u?.includes("application/json") || u?.endsWith("+json") ? n.headers.get("content-length") === "0" ? void 0 : _d(await n.json(), n) : await n.text();
  })();
  return ve(e).debug(`[${o}] response parsed`, It({
    retryOfRequestLogID: i,
    url: n.url,
    status: n.status,
    body: a,
    durationMs: Date.now() - s
  })), a;
}
function _d(e, t) {
  return !e || typeof e != "object" || Array.isArray(e) ? e : Object.defineProperty(e, "_request_id", {
    value: t.headers.get("request-id"),
    enumerable: !1
  });
}
var Gn, vd = class Td extends Promise {
  constructor(t, n, o = yd) {
    super((i) => {
      i(null);
    }), this.responsePromise = n, this.parseResponse = o, Gn.set(this, void 0), U(this, Gn, t, "f");
  }
  _thenUnwrap(t) {
    return new Td(S(this, Gn, "f"), this.responsePromise, async (n, o) => _d(t(await this.parseResponse(n, o), o), o.response));
  }
  asResponse() {
    return this.responsePromise.then((t) => t.response);
  }
  async withResponse() {
    const [t, n] = await Promise.all([this.parse(), this.asResponse()]);
    return {
      data: t,
      response: n,
      request_id: n.headers.get("request-id")
    };
  }
  parse() {
    return this.parsedPromise || (this.parsedPromise = this.responsePromise.then((t) => this.parseResponse(S(this, Gn, "f"), t))), this.parsedPromise;
  }
  then(t, n) {
    return this.parse().then(t, n);
  }
  catch(t) {
    return this.parse().catch(t);
  }
  finally(t) {
    return this.parse().finally(t);
  }
};
Gn = /* @__PURE__ */ new WeakMap();
var Io, Sd = class {
  constructor(e, t, n, o) {
    Io.set(this, void 0), U(this, Io, e, "f"), this.options = o, this.response = t, this.body = n;
  }
  hasNextPage() {
    return this.getPaginatedItems().length ? this.nextPageRequestOptions() != null : !1;
  }
  async getNextPage() {
    const e = this.nextPageRequestOptions();
    if (!e) throw new H("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
    return await S(this, Io, "f").requestAPIList(this.constructor, e);
  }
  async *iterPages() {
    let e = this;
    for (yield e; e.hasNextPage(); )
      e = await e.getNextPage(), yield e;
  }
  async *[(Io = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    for await (const e of this.iterPages()) for (const t of e.getPaginatedItems()) yield t;
  }
}, Gm = class extends vd {
  constructor(e, t, n) {
    super(e, t, async (o, i) => new n(o, i.response, await yd(o, i), i.options));
  }
  async *[Symbol.asyncIterator]() {
    const e = await this;
    for await (const t of e) yield t;
  }
}, yo = class extends Sd {
  constructor(e, t, n, o) {
    super(e, t, n, o), this.data = n.data || [], this.has_more = n.has_more || !1, this.first_id = n.first_id || null, this.last_id = n.last_id || null;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  hasNextPage() {
    return this.has_more === !1 ? !1 : super.hasNextPage();
  }
  nextPageRequestOptions() {
    if (this.options.query?.before_id) {
      const t = this.first_id;
      return t ? {
        ...this.options,
        query: {
          ...Ds(this.options.query),
          before_id: t
        }
      } : null;
    }
    const e = this.last_id;
    return e ? {
      ...this.options,
      query: {
        ...Ds(this.options.query),
        after_id: e
      }
    } : null;
  }
}, nt = class extends Sd {
  constructor(e, t, n, o) {
    super(e, t, n, o), this.data = n.data || [], this.next_page = n.next_page || null;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  nextPageRequestOptions() {
    const e = this.next_page;
    return e ? {
      ...this.options,
      query: {
        ...Ds(this.options.query),
        page: e
      }
    } : null;
  }
}, Ed = () => {
  if (typeof File > "u") {
    const { process: e } = globalThis, t = typeof e?.versions?.node == "string" && parseInt(e.versions.node.split(".")) < 20;
    throw new Error("`File` is not defined as a global, which is required for file uploads." + (t ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`." : ""));
  }
};
function on(e, t, n) {
  return Ed(), new File(e, t ?? "unknown_file", n);
}
function jo(e, t) {
  const n = typeof e == "object" && e !== null && ("name" in e && e.name && String(e.name) || "url" in e && e.url && String(e.url) || "filename" in e && e.filename && String(e.filename) || "path" in e && e.path && String(e.path)) || "";
  return t ? n.split(/[\\/]/).pop() || void 0 : n;
}
var wd = (e) => e != null && typeof e == "object" && typeof e[Symbol.asyncIterator] == "function", Nr = async (e, t, n = !0) => ({
  ...e,
  body: await qm(e.body, t, n)
}), Ya = /* @__PURE__ */ new WeakMap();
function Om(e) {
  const t = typeof e == "function" ? e : e.fetch, n = Ya.get(t);
  if (n) return n;
  const o = (async () => {
    try {
      const i = "Response" in t ? t.Response : (await t("data:,")).constructor, s = new FormData();
      return s.toString() !== await new i(s).text();
    } catch {
      return !0;
    }
  })();
  return Ya.set(t, o), o;
}
var qm = async (e, t, n = !0) => {
  if (!await Om(t)) throw new TypeError("The provided fetch function does not support file uploads with the current global FormData class.");
  const o = new FormData();
  return await Promise.all(Object.entries(e || {}).map(([i, s]) => Us(o, i, s, n))), o;
}, Vm = (e) => e instanceof Blob && "name" in e, Us = async (e, t, n, o) => {
  if (n !== void 0) {
    if (n == null) throw new TypeError(`Received null for "${t}"; to pass null in FormData, you must use the string 'null'`);
    if (typeof n == "string" || typeof n == "number" || typeof n == "boolean") e.append(t, String(n));
    else if (n instanceof Response) {
      let i = {};
      const s = n.headers.get("Content-Type");
      s && (i = { type: s }), e.append(t, on([await n.blob()], jo(n, o), i));
    } else if (wd(n)) e.append(t, on([await new Response(gd(n)).blob()], jo(n, o)));
    else if (Vm(n)) e.append(t, on([n], jo(n, o), { type: n.type }));
    else if (Array.isArray(n)) await Promise.all(n.map((i) => Us(e, t + "[]", i, o)));
    else if (typeof n == "object") await Promise.all(Object.entries(n).map(([i, s]) => Us(e, `${t}[${i}]`, s, o)));
    else throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${n} instead`);
  }
}, Ad = (e) => e != null && typeof e == "object" && typeof e.size == "number" && typeof e.type == "string" && typeof e.text == "function" && typeof e.slice == "function" && typeof e.arrayBuffer == "function", Hm = (e) => e != null && typeof e == "object" && typeof e.name == "string" && typeof e.lastModified == "number" && Ad(e), Jm = (e) => e != null && typeof e == "object" && typeof e.url == "string" && typeof e.blob == "function";
async function Wm(e, t, n) {
  if (Ed(), e = await e, t || (t = jo(e, !0)), Hm(e))
    return e instanceof File && t == null && n == null ? e : on([await e.arrayBuffer()], t ?? e.name, {
      type: e.type,
      lastModified: e.lastModified,
      ...n
    });
  if (Jm(e)) {
    const i = await e.blob();
    return t || (t = new URL(e.url).pathname.split(/[\\/]/).pop()), on(await Ls(i), t, n);
  }
  const o = await Ls(e);
  if (!n?.type) {
    const i = o.find((s) => typeof s == "object" && "type" in s && s.type);
    typeof i == "string" && (n = {
      ...n,
      type: i
    });
  }
  return on(o, t, n);
}
async function Ls(e) {
  let t = [];
  if (typeof e == "string" || ArrayBuffer.isView(e) || e instanceof ArrayBuffer) t.push(e);
  else if (Ad(e)) t.push(e instanceof Blob ? e : await e.arrayBuffer());
  else if (wd(e)) for await (const n of e) t.push(...await Ls(n));
  else {
    const n = e?.constructor?.name;
    throw new Error(`Unexpected data type: ${typeof e}${n ? `; constructor: ${n}` : ""}${Km(e)}`);
  }
  return t;
}
function Km(e) {
  return typeof e != "object" || e === null ? "" : `; props: [${Object.getOwnPropertyNames(e).map((t) => `"${t}"`).join(", ")}]`;
}
var re = class {
  constructor(e) {
    this._client = e;
  }
}, Cd = /* @__PURE__ */ Symbol.for("brand.privateNullableHeaders");
function* Ym(e) {
  if (!e) return;
  if (Cd in e) {
    const { values: o, nulls: i } = e;
    yield* o.entries();
    for (const s of i) yield [s, null];
    return;
  }
  let t = !1, n;
  e instanceof Headers ? n = e.entries() : Fa(e) ? n = e : (t = !0, n = Object.entries(e ?? {}));
  for (let o of n) {
    const i = o[0];
    if (typeof i != "string") throw new TypeError("expected header name to be a string");
    const s = Fa(o[1]) ? o[1] : [o[1]];
    let a = !1;
    for (const u of s)
      u !== void 0 && (t && !a && (a = !0, yield [i, null]), yield [i, u]);
  }
}
var D = (e) => {
  const t = new Headers(), n = /* @__PURE__ */ new Set();
  for (const o of e) {
    const i = /* @__PURE__ */ new Set();
    for (const [s, a] of Ym(o)) {
      const u = s.toLowerCase();
      i.has(u) || (t.delete(s), i.add(u)), a === null ? (t.delete(s), n.add(u)) : (t.append(s, a), n.delete(u));
    }
  }
  return {
    [Cd]: !0,
    values: t,
    nulls: n
  };
};
function Id(e) {
  return e.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent);
}
var za = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.create(null)), zm = (e = Id) => function(n, ...o) {
  if (n.length === 1) return n[0];
  let i = !1;
  const s = [], a = n.reduce((p, f, h) => {
    /[?#]/.test(f) && (i = !0);
    const m = o[h];
    let g = (i ? encodeURIComponent : e)("" + m);
    return h !== o.length && (m == null || typeof m == "object" && m.toString === Object.getPrototypeOf(Object.getPrototypeOf(m.hasOwnProperty ?? za) ?? za)?.toString) && (g = m + "", s.push({
      start: p.length + f.length,
      length: g.length,
      error: `Value of type ${Object.prototype.toString.call(m).slice(8, -1)} is not a valid path parameter`
    })), p + f + (h === o.length ? "" : g);
  }, ""), u = a.split(/[?#]/, 1)[0], c = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi;
  let d;
  for (; (d = c.exec(u)) !== null; ) s.push({
    start: d.index,
    length: d[0].length,
    error: `Value "${d[0]}" can't be safely passed as a path parameter`
  });
  if (s.sort((p, f) => p.start - f.start), s.length > 0) {
    let p = 0;
    const f = s.reduce((h, m) => {
      const g = " ".repeat(m.start - p), y = "^".repeat(m.length);
      return p = m.start + m.length, h + g + y;
    }, "");
    throw new H(`Path parameters result in path with invalid segments:
${s.map((h) => h.error).join(`
`)}
${a}
${f}`);
  }
  return a;
}, q = /* @__PURE__ */ zm(Id), bd = class extends re {
  create(e, t) {
    const { betas: n, ...o } = e;
    return this._client.post("/v1/environments?beta=true", {
      body: o,
      ...t,
      headers: D([{ "anthropic-beta": [...n ?? [], "managed-agents-2026-04-01"].toString() }, t?.headers])
    });
  }
  retrieve(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.get(q`/v1/environments/${e}?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  update(e, t, n) {
    const { betas: o, ...i } = t;
    return this._client.post(q`/v1/environments/${e}?beta=true`, {
      body: i,
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  list(e = {}, t) {
    const { betas: n, ...o } = e ?? {};
    return this._client.getAPIList("/v1/environments?beta=true", nt, {
      query: o,
      ...t,
      headers: D([{ "anthropic-beta": [...n ?? [], "managed-agents-2026-04-01"].toString() }, t?.headers])
    });
  }
  delete(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.delete(q`/v1/environments/${e}?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  archive(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.post(q`/v1/environments/${e}/archive?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
}, eo = /* @__PURE__ */ Symbol("anthropic.sdk.stainlessHelper");
function ei(e) {
  return typeof e == "object" && e !== null && eo in e;
}
function Rd(e, t) {
  const n = /* @__PURE__ */ new Set();
  if (e)
    for (const o of e) ei(o) && n.add(o[eo]);
  if (t) {
    for (const o of t)
      if (ei(o) && n.add(o[eo]), Array.isArray(o.content))
        for (const i of o.content) ei(i) && n.add(i[eo]);
  }
  return Array.from(n);
}
function Pd(e, t) {
  const n = Rd(e, t);
  return n.length === 0 ? {} : { "x-stainless-helper": n.join(", ") };
}
function Xm(e) {
  return ei(e) ? { "x-stainless-helper": e[eo] } : {};
}
var xd = class extends re {
  list(e = {}, t) {
    const { betas: n, ...o } = e ?? {};
    return this._client.getAPIList("/v1/files", yo, {
      query: o,
      ...t,
      headers: D([{ "anthropic-beta": [...n ?? [], "files-api-2025-04-14"].toString() }, t?.headers])
    });
  }
  delete(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.delete(q`/v1/files/${e}`, {
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "files-api-2025-04-14"].toString() }, n?.headers])
    });
  }
  download(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.get(q`/v1/files/${e}/content`, {
      ...n,
      headers: D([{
        "anthropic-beta": [...o ?? [], "files-api-2025-04-14"].toString(),
        Accept: "application/binary"
      }, n?.headers]),
      __binaryResponse: !0
    });
  }
  retrieveMetadata(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.get(q`/v1/files/${e}`, {
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "files-api-2025-04-14"].toString() }, n?.headers])
    });
  }
  upload(e, t) {
    const { betas: n, ...o } = e;
    return this._client.post("/v1/files", Nr({
      body: o,
      ...t,
      headers: D([
        { "anthropic-beta": [...n ?? [], "files-api-2025-04-14"].toString() },
        Xm(o.file),
        t?.headers
      ])
    }, this._client));
  }
}, Md = class extends re {
  retrieve(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.get(q`/v1/models/${e}?beta=true`, {
      ...n,
      headers: D([{ ...o?.toString() != null ? { "anthropic-beta": o?.toString() } : void 0 }, n?.headers])
    });
  }
  list(e = {}, t) {
    const { betas: n, ...o } = e ?? {};
    return this._client.getAPIList("/v1/models?beta=true", yo, {
      query: o,
      ...t,
      headers: D([{ ...n?.toString() != null ? { "anthropic-beta": n?.toString() } : void 0 }, t?.headers])
    });
  }
}, Nd = class extends re {
  list(e, t = {}, n) {
    const { betas: o, ...i } = t ?? {};
    return this._client.getAPIList(q`/v1/agents/${e}/versions?beta=true`, nt, {
      query: i,
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
}, kr = class extends re {
  constructor() {
    super(...arguments), this.versions = new Nd(this._client);
  }
  create(e, t) {
    const { betas: n, ...o } = e;
    return this._client.post("/v1/agents?beta=true", {
      body: o,
      ...t,
      headers: D([{ "anthropic-beta": [...n ?? [], "managed-agents-2026-04-01"].toString() }, t?.headers])
    });
  }
  retrieve(e, t = {}, n) {
    const { betas: o, ...i } = t ?? {};
    return this._client.get(q`/v1/agents/${e}?beta=true`, {
      query: i,
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  update(e, t, n) {
    const { betas: o, ...i } = t;
    return this._client.post(q`/v1/agents/${e}?beta=true`, {
      body: i,
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  list(e = {}, t) {
    const { betas: n, ...o } = e ?? {};
    return this._client.getAPIList("/v1/agents?beta=true", nt, {
      query: o,
      ...t,
      headers: D([{ "anthropic-beta": [...n ?? [], "managed-agents-2026-04-01"].toString() }, t?.headers])
    });
  }
  archive(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.post(q`/v1/agents/${e}/archive?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
};
kr.Versions = Nd;
var kd = {
  "claude-opus-4-20250514": 8192,
  "claude-opus-4-0": 8192,
  "claude-4-opus-20250514": 8192,
  "anthropic.claude-opus-4-20250514-v1:0": 8192,
  "claude-opus-4@20250514": 8192,
  "claude-opus-4-1-20250805": 8192,
  "anthropic.claude-opus-4-1-20250805-v1:0": 8192,
  "claude-opus-4-1@20250805": 8192
};
function Dd(e) {
  return e?.output_format ?? e?.output_config?.format;
}
function Xa(e, t, n) {
  const o = Dd(t);
  return !t || !("parse" in (o ?? {})) ? {
    ...e,
    content: e.content.map((i) => {
      if (i.type === "text") {
        const s = Object.defineProperty({ ...i }, "parsed_output", {
          value: null,
          enumerable: !1
        });
        return Object.defineProperty(s, "parsed", {
          get() {
            return n.logger.warn("The `parsed` property on `text` blocks is deprecated, please use `parsed_output` instead."), null;
          },
          enumerable: !1
        });
      }
      return i;
    }),
    parsed_output: null
  } : Ud(e, t, n);
}
function Ud(e, t, n) {
  let o = null;
  const i = e.content.map((s) => {
    if (s.type === "text") {
      const a = Qm(t, s.text);
      o === null && (o = a);
      const u = Object.defineProperty({ ...s }, "parsed_output", {
        value: a,
        enumerable: !1
      });
      return Object.defineProperty(u, "parsed", {
        get() {
          return n.logger.warn("The `parsed` property on `text` blocks is deprecated, please use `parsed_output` instead."), a;
        },
        enumerable: !1
      });
    }
    return s;
  });
  return {
    ...e,
    content: i,
    parsed_output: o
  };
}
function Qm(e, t) {
  const n = Dd(e);
  if (n?.type !== "json_schema") return null;
  try {
    return "parse" in n ? n.parse(t) : JSON.parse(t);
  } catch (o) {
    throw new H(`Failed to parse structured output: ${o}`);
  }
}
var Zm = (e) => {
  let t = 0, n = [];
  for (; t < e.length; ) {
    let o = e[t];
    if (o === "\\") {
      t++;
      continue;
    }
    if (o === "{") {
      n.push({
        type: "brace",
        value: "{"
      }), t++;
      continue;
    }
    if (o === "}") {
      n.push({
        type: "brace",
        value: "}"
      }), t++;
      continue;
    }
    if (o === "[") {
      n.push({
        type: "paren",
        value: "["
      }), t++;
      continue;
    }
    if (o === "]") {
      n.push({
        type: "paren",
        value: "]"
      }), t++;
      continue;
    }
    if (o === ":") {
      n.push({
        type: "separator",
        value: ":"
      }), t++;
      continue;
    }
    if (o === ",") {
      n.push({
        type: "delimiter",
        value: ","
      }), t++;
      continue;
    }
    if (o === '"') {
      let a = "", u = !1;
      for (o = e[++t]; o !== '"'; ) {
        if (t === e.length) {
          u = !0;
          break;
        }
        if (o === "\\") {
          if (t++, t === e.length) {
            u = !0;
            break;
          }
          a += o + e[t], o = e[++t];
        } else
          a += o, o = e[++t];
      }
      o = e[++t], u || n.push({
        type: "string",
        value: a
      });
      continue;
    }
    if (o && /\s/.test(o)) {
      t++;
      continue;
    }
    let i = /[0-9]/;
    if (o && i.test(o) || o === "-" || o === ".") {
      let a = "";
      for (o === "-" && (a += o, o = e[++t]); o && i.test(o) || o === "."; )
        a += o, o = e[++t];
      n.push({
        type: "number",
        value: a
      });
      continue;
    }
    let s = /[a-z]/i;
    if (o && s.test(o)) {
      let a = "";
      for (; o && s.test(o) && t !== e.length; )
        a += o, o = e[++t];
      if (a == "true" || a == "false" || a === "null") n.push({
        type: "name",
        value: a
      });
      else {
        t++;
        continue;
      }
      continue;
    }
    t++;
  }
  return n;
}, zt = (e) => {
  if (e.length === 0) return e;
  let t = e[e.length - 1];
  switch (t.type) {
    case "separator":
      return e = e.slice(0, e.length - 1), zt(e);
    case "number":
      let n = t.value[t.value.length - 1];
      if (n === "." || n === "-")
        return e = e.slice(0, e.length - 1), zt(e);
    case "string":
      let o = e[e.length - 2];
      if (o?.type === "delimiter")
        return e = e.slice(0, e.length - 1), zt(e);
      if (o?.type === "brace" && o.value === "{")
        return e = e.slice(0, e.length - 1), zt(e);
      break;
    case "delimiter":
      return e = e.slice(0, e.length - 1), zt(e);
  }
  return e;
}, jm = (e) => {
  let t = [];
  return e.map((n) => {
    n.type === "brace" && (n.value === "{" ? t.push("}") : t.splice(t.lastIndexOf("}"), 1)), n.type === "paren" && (n.value === "[" ? t.push("]") : t.splice(t.lastIndexOf("]"), 1));
  }), t.length > 0 && t.reverse().map((n) => {
    n === "}" ? e.push({
      type: "brace",
      value: "}"
    }) : n === "]" && e.push({
      type: "paren",
      value: "]"
    });
  }), e;
}, eg = (e) => {
  let t = "";
  return e.map((n) => {
    n.type === "string" ? t += '"' + n.value + '"' : t += n.value;
  }), t;
}, Ld = (e) => JSON.parse(eg(jm(zt(Zm(e))))), Fe, ht, Ot, Sn, bo, En, wn, Ro, An, it, Cn, Po, xo, wt, Mo, No, In, is, Qa, ko, ss, rs, as, Za, ja = "__json_buf";
function el(e) {
  return e.type === "tool_use" || e.type === "server_tool_use" || e.type === "mcp_tool_use";
}
var tg = class $s {
  constructor(t, n) {
    Fe.add(this), this.messages = [], this.receivedMessages = [], ht.set(this, void 0), Ot.set(this, null), this.controller = new AbortController(), Sn.set(this, void 0), bo.set(this, () => {
    }), En.set(this, () => {
    }), wn.set(this, void 0), Ro.set(this, () => {
    }), An.set(this, () => {
    }), it.set(this, {}), Cn.set(this, !1), Po.set(this, !1), xo.set(this, !1), wt.set(this, !1), Mo.set(this, void 0), No.set(this, void 0), In.set(this, void 0), ko.set(this, (o) => {
      if (U(this, Po, !0, "f"), uo(o) && (o = new We()), o instanceof We)
        return U(this, xo, !0, "f"), this._emit("abort", o);
      if (o instanceof H) return this._emit("error", o);
      if (o instanceof Error) {
        const i = new H(o.message);
        return i.cause = o, this._emit("error", i);
      }
      return this._emit("error", new H(String(o)));
    }), U(this, Sn, new Promise((o, i) => {
      U(this, bo, o, "f"), U(this, En, i, "f");
    }), "f"), U(this, wn, new Promise((o, i) => {
      U(this, Ro, o, "f"), U(this, An, i, "f");
    }), "f"), S(this, Sn, "f").catch(() => {
    }), S(this, wn, "f").catch(() => {
    }), U(this, Ot, t, "f"), U(this, In, n?.logger ?? console, "f");
  }
  get response() {
    return S(this, Mo, "f");
  }
  get request_id() {
    return S(this, No, "f");
  }
  async withResponse() {
    U(this, wt, !0, "f");
    const t = await S(this, Sn, "f");
    if (!t) throw new Error("Could not resolve a `Response` object");
    return {
      data: this,
      response: t,
      request_id: t.headers.get("request-id")
    };
  }
  static fromReadableStream(t) {
    const n = new $s(null);
    return n._run(() => n._fromReadableStream(t)), n;
  }
  static createMessage(t, n, o, { logger: i } = {}) {
    const s = new $s(n, { logger: i });
    for (const a of n.messages) s._addMessageParam(a);
    return U(s, Ot, {
      ...n,
      stream: !0
    }, "f"), s._run(() => s._createMessage(t, {
      ...n,
      stream: !0
    }, {
      ...o,
      headers: {
        ...o?.headers,
        "X-Stainless-Helper-Method": "stream"
      }
    })), s;
  }
  _run(t) {
    t().then(() => {
      this._emitFinal(), this._emit("end");
    }, S(this, ko, "f"));
  }
  _addMessageParam(t) {
    this.messages.push(t);
  }
  _addMessage(t, n = !0) {
    this.receivedMessages.push(t), n && this._emit("message", t);
  }
  async _createMessage(t, n, o) {
    const i = o?.signal;
    let s;
    i && (i.aborted && this.controller.abort(), s = this.controller.abort.bind(this.controller), i.addEventListener("abort", s));
    try {
      S(this, Fe, "m", ss).call(this);
      const { response: a, data: u } = await t.create({
        ...n,
        stream: !0
      }, {
        ...o,
        signal: this.controller.signal
      }).withResponse();
      this._connected(a);
      for await (const c of u) S(this, Fe, "m", rs).call(this, c);
      if (u.controller.signal?.aborted) throw new We();
      S(this, Fe, "m", as).call(this);
    } finally {
      i && s && i.removeEventListener("abort", s);
    }
  }
  _connected(t) {
    this.ended || (U(this, Mo, t, "f"), U(this, No, t?.headers.get("request-id"), "f"), S(this, bo, "f").call(this, t), this._emit("connect"));
  }
  get ended() {
    return S(this, Cn, "f");
  }
  get errored() {
    return S(this, Po, "f");
  }
  get aborted() {
    return S(this, xo, "f");
  }
  abort() {
    this.controller.abort();
  }
  on(t, n) {
    return (S(this, it, "f")[t] || (S(this, it, "f")[t] = [])).push({ listener: n }), this;
  }
  off(t, n) {
    const o = S(this, it, "f")[t];
    if (!o) return this;
    const i = o.findIndex((s) => s.listener === n);
    return i >= 0 && o.splice(i, 1), this;
  }
  once(t, n) {
    return (S(this, it, "f")[t] || (S(this, it, "f")[t] = [])).push({
      listener: n,
      once: !0
    }), this;
  }
  emitted(t) {
    return new Promise((n, o) => {
      U(this, wt, !0, "f"), t !== "error" && this.once("error", o), this.once(t, n);
    });
  }
  async done() {
    U(this, wt, !0, "f"), await S(this, wn, "f");
  }
  get currentMessage() {
    return S(this, ht, "f");
  }
  async finalMessage() {
    return await this.done(), S(this, Fe, "m", is).call(this);
  }
  async finalText() {
    return await this.done(), S(this, Fe, "m", Qa).call(this);
  }
  _emit(t, ...n) {
    if (S(this, Cn, "f")) return;
    t === "end" && (U(this, Cn, !0, "f"), S(this, Ro, "f").call(this));
    const o = S(this, it, "f")[t];
    if (o && (S(this, it, "f")[t] = o.filter((i) => !i.once), o.forEach(({ listener: i }) => i(...n))), t === "abort") {
      const i = n[0];
      !S(this, wt, "f") && !o?.length && Promise.reject(i), S(this, En, "f").call(this, i), S(this, An, "f").call(this, i), this._emit("end");
      return;
    }
    if (t === "error") {
      const i = n[0];
      !S(this, wt, "f") && !o?.length && Promise.reject(i), S(this, En, "f").call(this, i), S(this, An, "f").call(this, i), this._emit("end");
    }
  }
  _emitFinal() {
    this.receivedMessages.at(-1) && this._emit("finalMessage", S(this, Fe, "m", is).call(this));
  }
  async _fromReadableStream(t, n) {
    const o = n?.signal;
    let i;
    o && (o.aborted && this.controller.abort(), i = this.controller.abort.bind(this.controller), o.addEventListener("abort", i));
    try {
      S(this, Fe, "m", ss).call(this), this._connected(null);
      const s = co.fromReadableStream(t, this.controller);
      for await (const a of s) S(this, Fe, "m", rs).call(this, a);
      if (s.controller.signal?.aborted) throw new We();
      S(this, Fe, "m", as).call(this);
    } finally {
      o && i && o.removeEventListener("abort", i);
    }
  }
  [(ht = /* @__PURE__ */ new WeakMap(), Ot = /* @__PURE__ */ new WeakMap(), Sn = /* @__PURE__ */ new WeakMap(), bo = /* @__PURE__ */ new WeakMap(), En = /* @__PURE__ */ new WeakMap(), wn = /* @__PURE__ */ new WeakMap(), Ro = /* @__PURE__ */ new WeakMap(), An = /* @__PURE__ */ new WeakMap(), it = /* @__PURE__ */ new WeakMap(), Cn = /* @__PURE__ */ new WeakMap(), Po = /* @__PURE__ */ new WeakMap(), xo = /* @__PURE__ */ new WeakMap(), wt = /* @__PURE__ */ new WeakMap(), Mo = /* @__PURE__ */ new WeakMap(), No = /* @__PURE__ */ new WeakMap(), In = /* @__PURE__ */ new WeakMap(), ko = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakSet(), is = function() {
    if (this.receivedMessages.length === 0) throw new H("stream ended without producing a Message with role=assistant");
    return this.receivedMessages.at(-1);
  }, Qa = function() {
    if (this.receivedMessages.length === 0) throw new H("stream ended without producing a Message with role=assistant");
    const n = this.receivedMessages.at(-1).content.filter((o) => o.type === "text").map((o) => o.text);
    if (n.length === 0) throw new H("stream ended without producing a content block with type=text");
    return n.join(" ");
  }, ss = function() {
    this.ended || U(this, ht, void 0, "f");
  }, rs = function(n) {
    if (this.ended) return;
    const o = S(this, Fe, "m", Za).call(this, n);
    switch (this._emit("streamEvent", n, o), n.type) {
      case "content_block_delta": {
        const i = o.content.at(-1);
        switch (n.delta.type) {
          case "text_delta":
            i.type === "text" && this._emit("text", n.delta.text, i.text || "");
            break;
          case "citations_delta":
            i.type === "text" && this._emit("citation", n.delta.citation, i.citations ?? []);
            break;
          case "input_json_delta":
            el(i) && i.input && this._emit("inputJson", n.delta.partial_json, i.input);
            break;
          case "thinking_delta":
            i.type === "thinking" && this._emit("thinking", n.delta.thinking, i.thinking);
            break;
          case "signature_delta":
            i.type === "thinking" && this._emit("signature", i.signature);
            break;
          case "compaction_delta":
            i.type === "compaction" && i.content && this._emit("compaction", i.content);
            break;
          default:
            n.delta;
        }
        break;
      }
      case "message_stop":
        this._addMessageParam(o), this._addMessage(Xa(o, S(this, Ot, "f"), { logger: S(this, In, "f") }), !0);
        break;
      case "content_block_stop":
        this._emit("contentBlock", o.content.at(-1));
        break;
      case "message_start":
        U(this, ht, o, "f");
        break;
      case "content_block_start":
      case "message_delta":
        break;
    }
  }, as = function() {
    if (this.ended) throw new H("stream has ended, this shouldn't happen");
    const n = S(this, ht, "f");
    if (!n) throw new H("request ended without sending any chunks");
    return U(this, ht, void 0, "f"), Xa(n, S(this, Ot, "f"), { logger: S(this, In, "f") });
  }, Za = function(n) {
    let o = S(this, ht, "f");
    if (n.type === "message_start") {
      if (o) throw new H(`Unexpected event order, got ${n.type} before receiving "message_stop"`);
      return n.message;
    }
    if (!o) throw new H(`Unexpected event order, got ${n.type} before "message_start"`);
    switch (n.type) {
      case "message_stop":
        return o;
      case "message_delta":
        return o.container = n.delta.container, o.stop_reason = n.delta.stop_reason, o.stop_sequence = n.delta.stop_sequence, o.usage.output_tokens = n.usage.output_tokens, o.context_management = n.context_management, n.usage.input_tokens != null && (o.usage.input_tokens = n.usage.input_tokens), n.usage.cache_creation_input_tokens != null && (o.usage.cache_creation_input_tokens = n.usage.cache_creation_input_tokens), n.usage.cache_read_input_tokens != null && (o.usage.cache_read_input_tokens = n.usage.cache_read_input_tokens), n.usage.server_tool_use != null && (o.usage.server_tool_use = n.usage.server_tool_use), n.usage.iterations != null && (o.usage.iterations = n.usage.iterations), o;
      case "content_block_start":
        return o.content.push(n.content_block), o;
      case "content_block_delta": {
        const i = o.content.at(n.index);
        switch (n.delta.type) {
          case "text_delta":
            i?.type === "text" && (o.content[n.index] = {
              ...i,
              text: (i.text || "") + n.delta.text
            });
            break;
          case "citations_delta":
            i?.type === "text" && (o.content[n.index] = {
              ...i,
              citations: [...i.citations ?? [], n.delta.citation]
            });
            break;
          case "input_json_delta":
            if (i && el(i)) {
              let s = i[ja] || "";
              s += n.delta.partial_json;
              const a = { ...i };
              if (Object.defineProperty(a, ja, {
                value: s,
                enumerable: !1,
                writable: !0
              }), s) try {
                a.input = Ld(s);
              } catch (u) {
                const c = new H(`Unable to parse tool parameter JSON from model. Please retry your request or adjust your prompt. Error: ${u}. JSON: ${s}`);
                S(this, ko, "f").call(this, c);
              }
              o.content[n.index] = a;
            }
            break;
          case "thinking_delta":
            i?.type === "thinking" && (o.content[n.index] = {
              ...i,
              thinking: i.thinking + n.delta.thinking
            });
            break;
          case "signature_delta":
            i?.type === "thinking" && (o.content[n.index] = {
              ...i,
              signature: n.delta.signature
            });
            break;
          case "compaction_delta":
            i?.type === "compaction" && (o.content[n.index] = {
              ...i,
              content: (i.content || "") + n.delta.content
            });
            break;
          default:
            n.delta;
        }
        return o;
      }
      case "content_block_stop":
        return o;
    }
  }, Symbol.asyncIterator)]() {
    const t = [], n = [];
    let o = !1;
    return this.on("streamEvent", (i) => {
      const s = n.shift();
      s ? s.resolve(i) : t.push(i);
    }), this.on("end", () => {
      o = !0;
      for (const i of n) i.resolve(void 0);
      n.length = 0;
    }), this.on("abort", (i) => {
      o = !0;
      for (const s of n) s.reject(i);
      n.length = 0;
    }), this.on("error", (i) => {
      o = !0;
      for (const s of n) s.reject(i);
      n.length = 0;
    }), {
      next: async () => t.length ? {
        value: t.shift(),
        done: !1
      } : o ? {
        value: void 0,
        done: !0
      } : new Promise((i, s) => n.push({
        resolve: i,
        reject: s
      })).then((i) => i ? {
        value: i,
        done: !1
      } : {
        value: void 0,
        done: !0
      }),
      return: async () => (this.abort(), {
        value: void 0,
        done: !0
      })
    };
  }
  toReadableStream() {
    return new co(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
  }
};
var $d = class extends Error {
  constructor(e) {
    const t = typeof e == "string" ? e : e.map((n) => n.type === "text" ? n.text : `[${n.type}]`).join(" ");
    super(t), this.name = "ToolError", this.content = e;
  }
};
var ng = `You have been working on the task described above but have not yet completed it. Write a continuation summary that will allow you (or another instance of yourself) to resume work efficiently in a future context window where the conversation history will be replaced with this summary. Your summary should be structured, concise, and actionable. Include:
1. Task Overview
The user's core request and success criteria
Any clarifications or constraints they specified
2. Current State
What has been completed so far
Files created, modified, or analyzed (with paths if relevant)
Key outputs or artifacts produced
3. Important Discoveries
Technical constraints or requirements uncovered
Decisions made and their rationale
Errors encountered and how they were resolved
What approaches were tried that didn't work (and why)
4. Next Steps
Specific actions needed to complete the task
Any blockers or open questions to resolve
Priority order if multiple steps remain
5. Context to Preserve
User preferences or style requirements
Domain-specific details that aren't obvious
Any promises made to the user
Be concise but complete—err on the side of including information that would prevent duplicate work or repeated mistakes. Write in a way that enables immediate resumption of the task.
Wrap your summary in <summary></summary> tags.`, bn, qt, At, ie, Se, Ie, lt, mt, Rn, tl, Fs;
function nl() {
  let e, t;
  return {
    promise: new Promise((n, o) => {
      e = n, t = o;
    }),
    resolve: e,
    reject: t
  };
}
var Fd = class {
  constructor(e, t, n) {
    bn.add(this), this.client = e, qt.set(this, !1), At.set(this, !1), ie.set(this, void 0), Se.set(this, void 0), Ie.set(this, void 0), lt.set(this, void 0), mt.set(this, void 0), Rn.set(this, 0), U(this, ie, { params: {
      ...t,
      messages: structuredClone(t.messages)
    } }, "f");
    const o = ["BetaToolRunner", ...Rd(t.tools, t.messages)].join(", ");
    U(this, Se, {
      ...n,
      headers: D([{ "x-stainless-helper": o }, n?.headers])
    }, "f"), U(this, mt, nl(), "f"), t.compactionControl?.enabled && console.warn('Anthropic: The `compactionControl` parameter is deprecated and will be removed in a future version. Use server-side compaction instead by passing `edits: [{ type: "compact_20260112" }]` in the params passed to `toolRunner()`. See https://platform.claude.com/docs/en/build-with-claude/compaction');
  }
  async *[(qt = /* @__PURE__ */ new WeakMap(), At = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new WeakMap(), lt = /* @__PURE__ */ new WeakMap(), mt = /* @__PURE__ */ new WeakMap(), Rn = /* @__PURE__ */ new WeakMap(), bn = /* @__PURE__ */ new WeakSet(), tl = async function() {
    const t = S(this, ie, "f").params.compactionControl;
    if (!t || !t.enabled) return !1;
    let n = 0;
    if (S(this, Ie, "f") !== void 0) try {
      const c = await S(this, Ie, "f");
      n = c.usage.input_tokens + (c.usage.cache_creation_input_tokens ?? 0) + (c.usage.cache_read_input_tokens ?? 0) + c.usage.output_tokens;
    } catch {
      return !1;
    }
    const o = t.contextTokenThreshold ?? 1e5;
    if (n < o) return !1;
    const i = t.model ?? S(this, ie, "f").params.model, s = t.summaryPrompt ?? ng, a = S(this, ie, "f").params.messages;
    if (a[a.length - 1].role === "assistant") {
      const c = a[a.length - 1];
      if (Array.isArray(c.content)) {
        const d = c.content.filter((p) => p.type !== "tool_use");
        d.length === 0 ? a.pop() : c.content = d;
      }
    }
    const u = await this.client.beta.messages.create({
      model: i,
      messages: [...a, {
        role: "user",
        content: [{
          type: "text",
          text: s
        }]
      }],
      max_tokens: S(this, ie, "f").params.max_tokens
    }, {
      signal: S(this, Se, "f").signal,
      headers: D([S(this, Se, "f").headers, { "x-stainless-helper": "compaction" }])
    });
    if (u.content[0]?.type !== "text") throw new H("Expected text response for compaction");
    return S(this, ie, "f").params.messages = [{
      role: "user",
      content: u.content
    }], !0;
  }, Symbol.asyncIterator)]() {
    var e;
    if (S(this, qt, "f")) throw new H("Cannot iterate over a consumed stream");
    U(this, qt, !0, "f"), U(this, At, !0, "f"), U(this, lt, void 0, "f");
    try {
      for (; ; ) {
        let t;
        try {
          if (S(this, ie, "f").params.max_iterations && S(this, Rn, "f") >= S(this, ie, "f").params.max_iterations) break;
          U(this, At, !1, "f"), U(this, lt, void 0, "f"), U(this, Rn, (e = S(this, Rn, "f"), e++, e), "f"), U(this, Ie, void 0, "f");
          const { max_iterations: n, compactionControl: o, ...i } = S(this, ie, "f").params;
          if (i.stream ? (t = this.client.beta.messages.stream({ ...i }, S(this, Se, "f")), U(this, Ie, t.finalMessage(), "f"), S(this, Ie, "f").catch(() => {
          }), yield t) : (U(this, Ie, this.client.beta.messages.create({
            ...i,
            stream: !1
          }, S(this, Se, "f")), "f"), yield S(this, Ie, "f")), !await S(this, bn, "m", tl).call(this)) {
            if (!S(this, At, "f")) {
              const { role: a, content: u } = await S(this, Ie, "f");
              S(this, ie, "f").params.messages.push({
                role: a,
                content: u
              });
            }
            const s = await S(this, bn, "m", Fs).call(this, S(this, ie, "f").params.messages.at(-1));
            if (s) S(this, ie, "f").params.messages.push(s);
            else if (!S(this, At, "f")) break;
          }
        } finally {
          t && t.abort();
        }
      }
      if (!S(this, Ie, "f")) throw new H("ToolRunner concluded without a message from the server");
      S(this, mt, "f").resolve(await S(this, Ie, "f"));
    } catch (t) {
      throw U(this, qt, !1, "f"), S(this, mt, "f").promise.catch(() => {
      }), S(this, mt, "f").reject(t), U(this, mt, nl(), "f"), t;
    }
  }
  setMessagesParams(e) {
    typeof e == "function" ? S(this, ie, "f").params = e(S(this, ie, "f").params) : S(this, ie, "f").params = e, U(this, At, !0, "f"), U(this, lt, void 0, "f");
  }
  setRequestOptions(e) {
    typeof e == "function" ? U(this, Se, e(S(this, Se, "f")), "f") : U(this, Se, {
      ...S(this, Se, "f"),
      ...e
    }, "f");
  }
  async generateToolResponse(e = S(this, Se, "f").signal) {
    const t = await S(this, Ie, "f") ?? this.params.messages.at(-1);
    return t ? S(this, bn, "m", Fs).call(this, t, e) : null;
  }
  done() {
    return S(this, mt, "f").promise;
  }
  async runUntilDone() {
    if (!S(this, qt, "f")) for await (const e of this) ;
    return this.done();
  }
  get params() {
    return S(this, ie, "f").params;
  }
  pushMessages(...e) {
    this.setMessagesParams((t) => ({
      ...t,
      messages: [...t.messages, ...e]
    }));
  }
  then(e, t) {
    return this.runUntilDone().then(e, t);
  }
};
Fs = async function(t, n = S(this, Se, "f").signal) {
  return S(this, lt, "f") !== void 0 ? S(this, lt, "f") : (U(this, lt, og(S(this, ie, "f").params, t, {
    ...S(this, Se, "f"),
    signal: n
  }), "f"), S(this, lt, "f"));
};
async function og(e, t = e.messages.at(-1), n) {
  if (!t || t.role !== "assistant" || !t.content || typeof t.content == "string") return null;
  const o = t.content.filter((i) => i.type === "tool_use");
  return o.length === 0 ? null : {
    role: "user",
    content: await Promise.all(o.map(async (i) => {
      const s = e.tools.find((a) => ("name" in a ? a.name : a.mcp_server_name) === i.name);
      if (!s || !("run" in s)) return {
        type: "tool_result",
        tool_use_id: i.id,
        content: `Error: Tool '${i.name}' not found`,
        is_error: !0
      };
      try {
        let a = i.input;
        "parse" in s && s.parse && (a = s.parse(a));
        const u = await s.run(a, {
          toolUseBlock: i,
          signal: n?.signal
        });
        return {
          type: "tool_result",
          tool_use_id: i.id,
          content: u
        };
      } catch (a) {
        return {
          type: "tool_result",
          tool_use_id: i.id,
          content: a instanceof $d ? a.content : `Error: ${a instanceof Error ? a.message : String(a)}`,
          is_error: !0
        };
      }
    }))
  };
}
var Bd = class Gd {
  constructor(t, n) {
    this.iterator = t, this.controller = n;
  }
  async *decoder() {
    const t = new go();
    for await (const n of this.iterator) for (const o of t.decode(n)) yield JSON.parse(o);
    for (const n of t.flush()) yield JSON.parse(n);
  }
  [Symbol.asyncIterator]() {
    return this.decoder();
  }
  static fromResponse(t, n) {
    if (!t.body)
      throw n.abort(), typeof globalThis.navigator < "u" && globalThis.navigator.product === "ReactNative" ? new H("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api") : new H("Attempted to iterate over a response with no body");
    return new Gd(xr(t.body), n);
  }
}, Od = class extends re {
  create(e, t) {
    const { betas: n, ...o } = e;
    return this._client.post("/v1/messages/batches?beta=true", {
      body: o,
      ...t,
      headers: D([{ "anthropic-beta": [...n ?? [], "message-batches-2024-09-24"].toString() }, t?.headers])
    });
  }
  retrieve(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.get(q`/v1/messages/batches/${e}?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "message-batches-2024-09-24"].toString() }, n?.headers])
    });
  }
  list(e = {}, t) {
    const { betas: n, ...o } = e ?? {};
    return this._client.getAPIList("/v1/messages/batches?beta=true", yo, {
      query: o,
      ...t,
      headers: D([{ "anthropic-beta": [...n ?? [], "message-batches-2024-09-24"].toString() }, t?.headers])
    });
  }
  delete(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.delete(q`/v1/messages/batches/${e}?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "message-batches-2024-09-24"].toString() }, n?.headers])
    });
  }
  cancel(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.post(q`/v1/messages/batches/${e}/cancel?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "message-batches-2024-09-24"].toString() }, n?.headers])
    });
  }
  async results(e, t = {}, n) {
    const o = await this.retrieve(e);
    if (!o.results_url) throw new H(`No batch \`results_url\`; Has it finished processing? ${o.processing_status} - ${o.id}`);
    const { betas: i } = t ?? {};
    return this._client.get(o.results_url, {
      ...n,
      headers: D([{
        "anthropic-beta": [...i ?? [], "message-batches-2024-09-24"].toString(),
        Accept: "application/binary"
      }, n?.headers]),
      stream: !0,
      __binaryResponse: !0
    })._thenUnwrap((s, a) => Bd.fromResponse(a.response, a.controller));
  }
}, ol = {
  "claude-1.3": "November 6th, 2024",
  "claude-1.3-100k": "November 6th, 2024",
  "claude-instant-1.1": "November 6th, 2024",
  "claude-instant-1.1-100k": "November 6th, 2024",
  "claude-instant-1.2": "November 6th, 2024",
  "claude-3-sonnet-20240229": "July 21st, 2025",
  "claude-3-opus-20240229": "January 5th, 2026",
  "claude-2.1": "July 21st, 2025",
  "claude-2.0": "July 21st, 2025",
  "claude-3-7-sonnet-latest": "February 19th, 2026",
  "claude-3-7-sonnet-20250219": "February 19th, 2026"
}, ig = ["claude-opus-4-6"], _o = class extends re {
  constructor() {
    super(...arguments), this.batches = new Od(this._client);
  }
  create(e, t) {
    const n = il(e), { betas: o, ...i } = n;
    i.model in ol && console.warn(`The model '${i.model}' is deprecated and will reach end-of-life on ${ol[i.model]}
Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`), i.model in ig && i.thinking && i.thinking.type === "enabled" && console.warn(`Using Claude with ${i.model} and 'thinking.type=enabled' is deprecated. Use 'thinking.type=adaptive' instead which results in better model performance in our testing: https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking`);
    let s = this._client._options.timeout;
    if (!i.stream && s == null) {
      const u = kd[i.model] ?? void 0;
      s = this._client.calculateNonstreamingTimeout(i.max_tokens, u);
    }
    const a = Pd(i.tools, i.messages);
    return this._client.post("/v1/messages?beta=true", {
      body: i,
      timeout: s ?? 6e5,
      ...t,
      headers: D([
        { ...o?.toString() != null ? { "anthropic-beta": o?.toString() } : void 0 },
        a,
        t?.headers
      ]),
      stream: n.stream ?? !1
    });
  }
  parse(e, t) {
    return t = {
      ...t,
      headers: D([{ "anthropic-beta": [...e.betas ?? [], "structured-outputs-2025-12-15"].toString() }, t?.headers])
    }, this.create(e, t).then((n) => Ud(n, e, { logger: this._client.logger ?? console }));
  }
  stream(e, t) {
    return tg.createMessage(this, e, t);
  }
  countTokens(e, t) {
    const { betas: n, ...o } = il(e);
    return this._client.post("/v1/messages/count_tokens?beta=true", {
      body: o,
      ...t,
      headers: D([{ "anthropic-beta": [...n ?? [], "token-counting-2024-11-01"].toString() }, t?.headers])
    });
  }
  toolRunner(e, t) {
    return new Fd(this._client, e, t);
  }
};
function il(e) {
  if (!e.output_format) return e;
  if (e.output_config?.format) throw new H("Both output_format and output_config.format were provided. Please use only output_config.format (output_format is deprecated).");
  const { output_format: t, ...n } = e;
  return {
    ...n,
    output_config: {
      ...e.output_config,
      format: t
    }
  };
}
_o.Batches = Od;
_o.BetaToolRunner = Fd;
_o.ToolError = $d;
var qd = class extends re {
  list(e, t = {}, n) {
    const { betas: o, ...i } = t ?? {};
    return this._client.getAPIList(q`/v1/sessions/${e}/events?beta=true`, nt, {
      query: i,
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  send(e, t, n) {
    const { betas: o, ...i } = t;
    return this._client.post(q`/v1/sessions/${e}/events?beta=true`, {
      body: i,
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  stream(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.get(q`/v1/sessions/${e}/events/stream?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers]),
      stream: !0
    });
  }
}, Vd = class extends re {
  retrieve(e, t, n) {
    const { session_id: o, betas: i } = t;
    return this._client.get(q`/v1/sessions/${o}/resources/${e}?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...i ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  update(e, t, n) {
    const { session_id: o, betas: i, ...s } = t;
    return this._client.post(q`/v1/sessions/${o}/resources/${e}?beta=true`, {
      body: s,
      ...n,
      headers: D([{ "anthropic-beta": [...i ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  list(e, t = {}, n) {
    const { betas: o, ...i } = t ?? {};
    return this._client.getAPIList(q`/v1/sessions/${e}/resources?beta=true`, nt, {
      query: i,
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  delete(e, t, n) {
    const { session_id: o, betas: i } = t;
    return this._client.delete(q`/v1/sessions/${o}/resources/${e}?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...i ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  add(e, t, n) {
    const { betas: o, ...i } = t;
    return this._client.post(q`/v1/sessions/${e}/resources?beta=true`, {
      body: i,
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
}, ki = class extends re {
  constructor() {
    super(...arguments), this.events = new qd(this._client), this.resources = new Vd(this._client);
  }
  create(e, t) {
    const { betas: n, ...o } = e;
    return this._client.post("/v1/sessions?beta=true", {
      body: o,
      ...t,
      headers: D([{ "anthropic-beta": [...n ?? [], "managed-agents-2026-04-01"].toString() }, t?.headers])
    });
  }
  retrieve(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.get(q`/v1/sessions/${e}?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  update(e, t, n) {
    const { betas: o, ...i } = t;
    return this._client.post(q`/v1/sessions/${e}?beta=true`, {
      body: i,
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  list(e = {}, t) {
    const { betas: n, ...o } = e ?? {};
    return this._client.getAPIList("/v1/sessions?beta=true", nt, {
      query: o,
      ...t,
      headers: D([{ "anthropic-beta": [...n ?? [], "managed-agents-2026-04-01"].toString() }, t?.headers])
    });
  }
  delete(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.delete(q`/v1/sessions/${e}?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  archive(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.post(q`/v1/sessions/${e}/archive?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
};
ki.Events = qd;
ki.Resources = Vd;
var Hd = class extends re {
  create(e, t = {}, n) {
    const { betas: o, ...i } = t ?? {};
    return this._client.post(q`/v1/skills/${e}/versions?beta=true`, Nr({
      body: i,
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "skills-2025-10-02"].toString() }, n?.headers])
    }, this._client));
  }
  retrieve(e, t, n) {
    const { skill_id: o, betas: i } = t;
    return this._client.get(q`/v1/skills/${o}/versions/${e}?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...i ?? [], "skills-2025-10-02"].toString() }, n?.headers])
    });
  }
  list(e, t = {}, n) {
    const { betas: o, ...i } = t ?? {};
    return this._client.getAPIList(q`/v1/skills/${e}/versions?beta=true`, nt, {
      query: i,
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "skills-2025-10-02"].toString() }, n?.headers])
    });
  }
  delete(e, t, n) {
    const { skill_id: o, betas: i } = t;
    return this._client.delete(q`/v1/skills/${o}/versions/${e}?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...i ?? [], "skills-2025-10-02"].toString() }, n?.headers])
    });
  }
}, Dr = class extends re {
  constructor() {
    super(...arguments), this.versions = new Hd(this._client);
  }
  create(e = {}, t) {
    const { betas: n, ...o } = e ?? {};
    return this._client.post("/v1/skills?beta=true", Nr({
      body: o,
      ...t,
      headers: D([{ "anthropic-beta": [...n ?? [], "skills-2025-10-02"].toString() }, t?.headers])
    }, this._client, !1));
  }
  retrieve(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.get(q`/v1/skills/${e}?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "skills-2025-10-02"].toString() }, n?.headers])
    });
  }
  list(e = {}, t) {
    const { betas: n, ...o } = e ?? {};
    return this._client.getAPIList("/v1/skills?beta=true", nt, {
      query: o,
      ...t,
      headers: D([{ "anthropic-beta": [...n ?? [], "skills-2025-10-02"].toString() }, t?.headers])
    });
  }
  delete(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.delete(q`/v1/skills/${e}?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "skills-2025-10-02"].toString() }, n?.headers])
    });
  }
};
Dr.Versions = Hd;
var Jd = class extends re {
  create(e, t, n) {
    const { betas: o, ...i } = t;
    return this._client.post(q`/v1/vaults/${e}/credentials?beta=true`, {
      body: i,
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  retrieve(e, t, n) {
    const { vault_id: o, betas: i } = t;
    return this._client.get(q`/v1/vaults/${o}/credentials/${e}?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...i ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  update(e, t, n) {
    const { vault_id: o, betas: i, ...s } = t;
    return this._client.post(q`/v1/vaults/${o}/credentials/${e}?beta=true`, {
      body: s,
      ...n,
      headers: D([{ "anthropic-beta": [...i ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  list(e, t = {}, n) {
    const { betas: o, ...i } = t ?? {};
    return this._client.getAPIList(q`/v1/vaults/${e}/credentials?beta=true`, nt, {
      query: i,
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  delete(e, t, n) {
    const { vault_id: o, betas: i } = t;
    return this._client.delete(q`/v1/vaults/${o}/credentials/${e}?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...i ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  archive(e, t, n) {
    const { vault_id: o, betas: i } = t;
    return this._client.post(q`/v1/vaults/${o}/credentials/${e}/archive?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...i ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
}, Ur = class extends re {
  constructor() {
    super(...arguments), this.credentials = new Jd(this._client);
  }
  create(e, t) {
    const { betas: n, ...o } = e;
    return this._client.post("/v1/vaults?beta=true", {
      body: o,
      ...t,
      headers: D([{ "anthropic-beta": [...n ?? [], "managed-agents-2026-04-01"].toString() }, t?.headers])
    });
  }
  retrieve(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.get(q`/v1/vaults/${e}?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  update(e, t, n) {
    const { betas: o, ...i } = t;
    return this._client.post(q`/v1/vaults/${e}?beta=true`, {
      body: i,
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  list(e = {}, t) {
    const { betas: n, ...o } = e ?? {};
    return this._client.getAPIList("/v1/vaults?beta=true", nt, {
      query: o,
      ...t,
      headers: D([{ "anthropic-beta": [...n ?? [], "managed-agents-2026-04-01"].toString() }, t?.headers])
    });
  }
  delete(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.delete(q`/v1/vaults/${e}?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  archive(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.post(q`/v1/vaults/${e}/archive?beta=true`, {
      ...n,
      headers: D([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
};
Ur.Credentials = Jd;
var ot = class extends re {
  constructor() {
    super(...arguments), this.models = new Md(this._client), this.messages = new _o(this._client), this.agents = new kr(this._client), this.environments = new bd(this._client), this.sessions = new ki(this._client), this.vaults = new Ur(this._client), this.files = new xd(this._client), this.skills = new Dr(this._client);
  }
};
ot.Models = Md;
ot.Messages = _o;
ot.Agents = kr;
ot.Environments = bd;
ot.Sessions = ki;
ot.Vaults = Ur;
ot.Files = xd;
ot.Skills = Dr;
var Wd = class extends re {
  create(e, t) {
    const { betas: n, ...o } = e;
    return this._client.post("/v1/complete", {
      body: o,
      timeout: this._client._options.timeout ?? 6e5,
      ...t,
      headers: D([{ ...n?.toString() != null ? { "anthropic-beta": n?.toString() } : void 0 }, t?.headers]),
      stream: e.stream ?? !1
    });
  }
};
function Kd(e) {
  return e?.output_config?.format;
}
function sl(e, t, n) {
  const o = Kd(t);
  return !t || !("parse" in (o ?? {})) ? {
    ...e,
    content: e.content.map((i) => i.type === "text" ? Object.defineProperty({ ...i }, "parsed_output", {
      value: null,
      enumerable: !1
    }) : i),
    parsed_output: null
  } : Yd(e, t, n);
}
function Yd(e, t, n) {
  let o = null;
  const i = e.content.map((s) => {
    if (s.type === "text") {
      const a = sg(t, s.text);
      return o === null && (o = a), Object.defineProperty({ ...s }, "parsed_output", {
        value: a,
        enumerable: !1
      });
    }
    return s;
  });
  return {
    ...e,
    content: i,
    parsed_output: o
  };
}
function sg(e, t) {
  const n = Kd(e);
  if (n?.type !== "json_schema") return null;
  try {
    return "parse" in n ? n.parse(t) : JSON.parse(t);
  } catch (o) {
    throw new H(`Failed to parse structured output: ${o}`);
  }
}
var Be, gt, Vt, Pn, Do, xn, Mn, Uo, Nn, st, kn, Lo, $o, Ct, Fo, Bo, Dn, ls, rl, us, cs, ds, fs, al, ll = "__json_buf";
function ul(e) {
  return e.type === "tool_use" || e.type === "server_tool_use";
}
var rg = class Bs {
  constructor(t, n) {
    Be.add(this), this.messages = [], this.receivedMessages = [], gt.set(this, void 0), Vt.set(this, null), this.controller = new AbortController(), Pn.set(this, void 0), Do.set(this, () => {
    }), xn.set(this, () => {
    }), Mn.set(this, void 0), Uo.set(this, () => {
    }), Nn.set(this, () => {
    }), st.set(this, {}), kn.set(this, !1), Lo.set(this, !1), $o.set(this, !1), Ct.set(this, !1), Fo.set(this, void 0), Bo.set(this, void 0), Dn.set(this, void 0), us.set(this, (o) => {
      if (U(this, Lo, !0, "f"), uo(o) && (o = new We()), o instanceof We)
        return U(this, $o, !0, "f"), this._emit("abort", o);
      if (o instanceof H) return this._emit("error", o);
      if (o instanceof Error) {
        const i = new H(o.message);
        return i.cause = o, this._emit("error", i);
      }
      return this._emit("error", new H(String(o)));
    }), U(this, Pn, new Promise((o, i) => {
      U(this, Do, o, "f"), U(this, xn, i, "f");
    }), "f"), U(this, Mn, new Promise((o, i) => {
      U(this, Uo, o, "f"), U(this, Nn, i, "f");
    }), "f"), S(this, Pn, "f").catch(() => {
    }), S(this, Mn, "f").catch(() => {
    }), U(this, Vt, t, "f"), U(this, Dn, n?.logger ?? console, "f");
  }
  get response() {
    return S(this, Fo, "f");
  }
  get request_id() {
    return S(this, Bo, "f");
  }
  async withResponse() {
    U(this, Ct, !0, "f");
    const t = await S(this, Pn, "f");
    if (!t) throw new Error("Could not resolve a `Response` object");
    return {
      data: this,
      response: t,
      request_id: t.headers.get("request-id")
    };
  }
  static fromReadableStream(t) {
    const n = new Bs(null);
    return n._run(() => n._fromReadableStream(t)), n;
  }
  static createMessage(t, n, o, { logger: i } = {}) {
    const s = new Bs(n, { logger: i });
    for (const a of n.messages) s._addMessageParam(a);
    return U(s, Vt, {
      ...n,
      stream: !0
    }, "f"), s._run(() => s._createMessage(t, {
      ...n,
      stream: !0
    }, {
      ...o,
      headers: {
        ...o?.headers,
        "X-Stainless-Helper-Method": "stream"
      }
    })), s;
  }
  _run(t) {
    t().then(() => {
      this._emitFinal(), this._emit("end");
    }, S(this, us, "f"));
  }
  _addMessageParam(t) {
    this.messages.push(t);
  }
  _addMessage(t, n = !0) {
    this.receivedMessages.push(t), n && this._emit("message", t);
  }
  async _createMessage(t, n, o) {
    const i = o?.signal;
    let s;
    i && (i.aborted && this.controller.abort(), s = this.controller.abort.bind(this.controller), i.addEventListener("abort", s));
    try {
      S(this, Be, "m", cs).call(this);
      const { response: a, data: u } = await t.create({
        ...n,
        stream: !0
      }, {
        ...o,
        signal: this.controller.signal
      }).withResponse();
      this._connected(a);
      for await (const c of u) S(this, Be, "m", ds).call(this, c);
      if (u.controller.signal?.aborted) throw new We();
      S(this, Be, "m", fs).call(this);
    } finally {
      i && s && i.removeEventListener("abort", s);
    }
  }
  _connected(t) {
    this.ended || (U(this, Fo, t, "f"), U(this, Bo, t?.headers.get("request-id"), "f"), S(this, Do, "f").call(this, t), this._emit("connect"));
  }
  get ended() {
    return S(this, kn, "f");
  }
  get errored() {
    return S(this, Lo, "f");
  }
  get aborted() {
    return S(this, $o, "f");
  }
  abort() {
    this.controller.abort();
  }
  on(t, n) {
    return (S(this, st, "f")[t] || (S(this, st, "f")[t] = [])).push({ listener: n }), this;
  }
  off(t, n) {
    const o = S(this, st, "f")[t];
    if (!o) return this;
    const i = o.findIndex((s) => s.listener === n);
    return i >= 0 && o.splice(i, 1), this;
  }
  once(t, n) {
    return (S(this, st, "f")[t] || (S(this, st, "f")[t] = [])).push({
      listener: n,
      once: !0
    }), this;
  }
  emitted(t) {
    return new Promise((n, o) => {
      U(this, Ct, !0, "f"), t !== "error" && this.once("error", o), this.once(t, n);
    });
  }
  async done() {
    U(this, Ct, !0, "f"), await S(this, Mn, "f");
  }
  get currentMessage() {
    return S(this, gt, "f");
  }
  async finalMessage() {
    return await this.done(), S(this, Be, "m", ls).call(this);
  }
  async finalText() {
    return await this.done(), S(this, Be, "m", rl).call(this);
  }
  _emit(t, ...n) {
    if (S(this, kn, "f")) return;
    t === "end" && (U(this, kn, !0, "f"), S(this, Uo, "f").call(this));
    const o = S(this, st, "f")[t];
    if (o && (S(this, st, "f")[t] = o.filter((i) => !i.once), o.forEach(({ listener: i }) => i(...n))), t === "abort") {
      const i = n[0];
      !S(this, Ct, "f") && !o?.length && Promise.reject(i), S(this, xn, "f").call(this, i), S(this, Nn, "f").call(this, i), this._emit("end");
      return;
    }
    if (t === "error") {
      const i = n[0];
      !S(this, Ct, "f") && !o?.length && Promise.reject(i), S(this, xn, "f").call(this, i), S(this, Nn, "f").call(this, i), this._emit("end");
    }
  }
  _emitFinal() {
    this.receivedMessages.at(-1) && this._emit("finalMessage", S(this, Be, "m", ls).call(this));
  }
  async _fromReadableStream(t, n) {
    const o = n?.signal;
    let i;
    o && (o.aborted && this.controller.abort(), i = this.controller.abort.bind(this.controller), o.addEventListener("abort", i));
    try {
      S(this, Be, "m", cs).call(this), this._connected(null);
      const s = co.fromReadableStream(t, this.controller);
      for await (const a of s) S(this, Be, "m", ds).call(this, a);
      if (s.controller.signal?.aborted) throw new We();
      S(this, Be, "m", fs).call(this);
    } finally {
      o && i && o.removeEventListener("abort", i);
    }
  }
  [(gt = /* @__PURE__ */ new WeakMap(), Vt = /* @__PURE__ */ new WeakMap(), Pn = /* @__PURE__ */ new WeakMap(), Do = /* @__PURE__ */ new WeakMap(), xn = /* @__PURE__ */ new WeakMap(), Mn = /* @__PURE__ */ new WeakMap(), Uo = /* @__PURE__ */ new WeakMap(), Nn = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakMap(), kn = /* @__PURE__ */ new WeakMap(), Lo = /* @__PURE__ */ new WeakMap(), $o = /* @__PURE__ */ new WeakMap(), Ct = /* @__PURE__ */ new WeakMap(), Fo = /* @__PURE__ */ new WeakMap(), Bo = /* @__PURE__ */ new WeakMap(), Dn = /* @__PURE__ */ new WeakMap(), us = /* @__PURE__ */ new WeakMap(), Be = /* @__PURE__ */ new WeakSet(), ls = function() {
    if (this.receivedMessages.length === 0) throw new H("stream ended without producing a Message with role=assistant");
    return this.receivedMessages.at(-1);
  }, rl = function() {
    if (this.receivedMessages.length === 0) throw new H("stream ended without producing a Message with role=assistant");
    const n = this.receivedMessages.at(-1).content.filter((o) => o.type === "text").map((o) => o.text);
    if (n.length === 0) throw new H("stream ended without producing a content block with type=text");
    return n.join(" ");
  }, cs = function() {
    this.ended || U(this, gt, void 0, "f");
  }, ds = function(n) {
    if (this.ended) return;
    const o = S(this, Be, "m", al).call(this, n);
    switch (this._emit("streamEvent", n, o), n.type) {
      case "content_block_delta": {
        const i = o.content.at(-1);
        switch (n.delta.type) {
          case "text_delta":
            i.type === "text" && this._emit("text", n.delta.text, i.text || "");
            break;
          case "citations_delta":
            i.type === "text" && this._emit("citation", n.delta.citation, i.citations ?? []);
            break;
          case "input_json_delta":
            ul(i) && i.input && this._emit("inputJson", n.delta.partial_json, i.input);
            break;
          case "thinking_delta":
            i.type === "thinking" && this._emit("thinking", n.delta.thinking, i.thinking);
            break;
          case "signature_delta":
            i.type === "thinking" && this._emit("signature", i.signature);
            break;
          default:
            n.delta;
        }
        break;
      }
      case "message_stop":
        this._addMessageParam(o), this._addMessage(sl(o, S(this, Vt, "f"), { logger: S(this, Dn, "f") }), !0);
        break;
      case "content_block_stop":
        this._emit("contentBlock", o.content.at(-1));
        break;
      case "message_start":
        U(this, gt, o, "f");
        break;
      case "content_block_start":
      case "message_delta":
        break;
    }
  }, fs = function() {
    if (this.ended) throw new H("stream has ended, this shouldn't happen");
    const n = S(this, gt, "f");
    if (!n) throw new H("request ended without sending any chunks");
    return U(this, gt, void 0, "f"), sl(n, S(this, Vt, "f"), { logger: S(this, Dn, "f") });
  }, al = function(n) {
    let o = S(this, gt, "f");
    if (n.type === "message_start") {
      if (o) throw new H(`Unexpected event order, got ${n.type} before receiving "message_stop"`);
      return n.message;
    }
    if (!o) throw new H(`Unexpected event order, got ${n.type} before "message_start"`);
    switch (n.type) {
      case "message_stop":
        return o;
      case "message_delta":
        return o.stop_reason = n.delta.stop_reason, o.stop_sequence = n.delta.stop_sequence, o.usage.output_tokens = n.usage.output_tokens, n.usage.input_tokens != null && (o.usage.input_tokens = n.usage.input_tokens), n.usage.cache_creation_input_tokens != null && (o.usage.cache_creation_input_tokens = n.usage.cache_creation_input_tokens), n.usage.cache_read_input_tokens != null && (o.usage.cache_read_input_tokens = n.usage.cache_read_input_tokens), n.usage.server_tool_use != null && (o.usage.server_tool_use = n.usage.server_tool_use), o;
      case "content_block_start":
        return o.content.push({ ...n.content_block }), o;
      case "content_block_delta": {
        const i = o.content.at(n.index);
        switch (n.delta.type) {
          case "text_delta":
            i?.type === "text" && (o.content[n.index] = {
              ...i,
              text: (i.text || "") + n.delta.text
            });
            break;
          case "citations_delta":
            i?.type === "text" && (o.content[n.index] = {
              ...i,
              citations: [...i.citations ?? [], n.delta.citation]
            });
            break;
          case "input_json_delta":
            if (i && ul(i)) {
              let s = i[ll] || "";
              s += n.delta.partial_json;
              const a = { ...i };
              Object.defineProperty(a, ll, {
                value: s,
                enumerable: !1,
                writable: !0
              }), s && (a.input = Ld(s)), o.content[n.index] = a;
            }
            break;
          case "thinking_delta":
            i?.type === "thinking" && (o.content[n.index] = {
              ...i,
              thinking: i.thinking + n.delta.thinking
            });
            break;
          case "signature_delta":
            i?.type === "thinking" && (o.content[n.index] = {
              ...i,
              signature: n.delta.signature
            });
            break;
          default:
            n.delta;
        }
        return o;
      }
      case "content_block_stop":
        return o;
    }
  }, Symbol.asyncIterator)]() {
    const t = [], n = [];
    let o = !1;
    return this.on("streamEvent", (i) => {
      const s = n.shift();
      s ? s.resolve(i) : t.push(i);
    }), this.on("end", () => {
      o = !0;
      for (const i of n) i.resolve(void 0);
      n.length = 0;
    }), this.on("abort", (i) => {
      o = !0;
      for (const s of n) s.reject(i);
      n.length = 0;
    }), this.on("error", (i) => {
      o = !0;
      for (const s of n) s.reject(i);
      n.length = 0;
    }), {
      next: async () => t.length ? {
        value: t.shift(),
        done: !1
      } : o ? {
        value: void 0,
        done: !0
      } : new Promise((i, s) => n.push({
        resolve: i,
        reject: s
      })).then((i) => i ? {
        value: i,
        done: !1
      } : {
        value: void 0,
        done: !0
      }),
      return: async () => (this.abort(), {
        value: void 0,
        done: !0
      })
    };
  }
  toReadableStream() {
    return new co(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
  }
};
var zd = class extends re {
  create(e, t) {
    return this._client.post("/v1/messages/batches", {
      body: e,
      ...t
    });
  }
  retrieve(e, t) {
    return this._client.get(q`/v1/messages/batches/${e}`, t);
  }
  list(e = {}, t) {
    return this._client.getAPIList("/v1/messages/batches", yo, {
      query: e,
      ...t
    });
  }
  delete(e, t) {
    return this._client.delete(q`/v1/messages/batches/${e}`, t);
  }
  cancel(e, t) {
    return this._client.post(q`/v1/messages/batches/${e}/cancel`, t);
  }
  async results(e, t) {
    const n = await this.retrieve(e);
    if (!n.results_url) throw new H(`No batch \`results_url\`; Has it finished processing? ${n.processing_status} - ${n.id}`);
    return this._client.get(n.results_url, {
      ...t,
      headers: D([{ Accept: "application/binary" }, t?.headers]),
      stream: !0,
      __binaryResponse: !0
    })._thenUnwrap((o, i) => Bd.fromResponse(i.response, i.controller));
  }
}, Lr = class extends re {
  constructor() {
    super(...arguments), this.batches = new zd(this._client);
  }
  create(e, t) {
    e.model in cl && console.warn(`The model '${e.model}' is deprecated and will reach end-of-life on ${cl[e.model]}
Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`), e.model in ag && e.thinking && e.thinking.type === "enabled" && console.warn(`Using Claude with ${e.model} and 'thinking.type=enabled' is deprecated. Use 'thinking.type=adaptive' instead which results in better model performance in our testing: https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking`);
    let n = this._client._options.timeout;
    if (!e.stream && n == null) {
      const i = kd[e.model] ?? void 0;
      n = this._client.calculateNonstreamingTimeout(e.max_tokens, i);
    }
    const o = Pd(e.tools, e.messages);
    return this._client.post("/v1/messages", {
      body: e,
      timeout: n ?? 6e5,
      ...t,
      headers: D([o, t?.headers]),
      stream: e.stream ?? !1
    });
  }
  parse(e, t) {
    return this.create(e, t).then((n) => Yd(n, e, { logger: this._client.logger ?? console }));
  }
  stream(e, t) {
    return rg.createMessage(this, e, t, { logger: this._client.logger ?? console });
  }
  countTokens(e, t) {
    return this._client.post("/v1/messages/count_tokens", {
      body: e,
      ...t
    });
  }
}, cl = {
  "claude-1.3": "November 6th, 2024",
  "claude-1.3-100k": "November 6th, 2024",
  "claude-instant-1.1": "November 6th, 2024",
  "claude-instant-1.1-100k": "November 6th, 2024",
  "claude-instant-1.2": "November 6th, 2024",
  "claude-3-sonnet-20240229": "July 21st, 2025",
  "claude-3-opus-20240229": "January 5th, 2026",
  "claude-2.1": "July 21st, 2025",
  "claude-2.0": "July 21st, 2025",
  "claude-3-7-sonnet-latest": "February 19th, 2026",
  "claude-3-7-sonnet-20250219": "February 19th, 2026",
  "claude-3-5-haiku-latest": "February 19th, 2026",
  "claude-3-5-haiku-20241022": "February 19th, 2026",
  "claude-opus-4-0": "June 15th, 2026",
  "claude-opus-4-20250514": "June 15th, 2026",
  "claude-sonnet-4-0": "June 15th, 2026",
  "claude-sonnet-4-20250514": "June 15th, 2026"
}, ag = ["claude-opus-4-6"];
Lr.Batches = zd;
var Xd = class extends re {
  retrieve(e, t = {}, n) {
    const { betas: o } = t ?? {};
    return this._client.get(q`/v1/models/${e}`, {
      ...n,
      headers: D([{ ...o?.toString() != null ? { "anthropic-beta": o?.toString() } : void 0 }, n?.headers])
    });
  }
  list(e = {}, t) {
    const { betas: n, ...o } = e ?? {};
    return this._client.getAPIList("/v1/models", yo, {
      query: o,
      ...t,
      headers: D([{ ...n?.toString() != null ? { "anthropic-beta": n?.toString() } : void 0 }, t?.headers])
    });
  }
}, Go = (e) => {
  if (typeof globalThis.process < "u") return globalThis.process.env?.[e]?.trim() || void 0;
  if (typeof globalThis.Deno < "u") return globalThis.Deno.env?.get?.(e)?.trim() || void 0;
}, Gs, $r, ti, Qd, lg = "\\n\\nHuman:", ug = "\\n\\nAssistant:", ne = class {
  constructor({ baseURL: e = Go("ANTHROPIC_BASE_URL"), apiKey: t = Go("ANTHROPIC_API_KEY") ?? null, authToken: n = Go("ANTHROPIC_AUTH_TOKEN") ?? null, ...o } = {}) {
    Gs.add(this), ti.set(this, void 0);
    const i = {
      apiKey: t,
      authToken: n,
      ...o,
      baseURL: e || "https://api.anthropic.com"
    };
    if (!i.dangerouslyAllowBrowser && wm()) throw new H(`It looks like you're running in a browser-like environment.

This is disabled by default, as it risks exposing your secret API credentials to attackers.
If you understand the risks and have appropriate mitigations in place,
you can set the \`dangerouslyAllowBrowser\` option to \`true\`, e.g.,

new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
`);
    this.baseURL = i.baseURL, this.timeout = i.timeout ?? $r.DEFAULT_TIMEOUT, this.logger = i.logger ?? console;
    const s = "warn";
    this.logLevel = s, this.logLevel = Wa(i.logLevel, "ClientOptions.logLevel", this) ?? Wa(Go("ANTHROPIC_LOG"), "process.env['ANTHROPIC_LOG']", this) ?? s, this.fetchOptions = i.fetchOptions, this.maxRetries = i.maxRetries ?? 2, this.fetch = i.fetch ?? Rm(), U(this, ti, xm, "f"), this._options = i, this.apiKey = typeof t == "string" ? t : null, this.authToken = n;
  }
  withOptions(e) {
    return new this.constructor({
      ...this._options,
      baseURL: this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      apiKey: this.apiKey,
      authToken: this.authToken,
      ...e
    });
  }
  defaultQuery() {
    return this._options.defaultQuery;
  }
  validateHeaders({ values: e, nulls: t }) {
    if (!(e.get("x-api-key") || e.get("authorization")) && !(this.apiKey && e.get("x-api-key")) && !t.has("x-api-key") && !(this.authToken && e.get("authorization")) && !t.has("authorization"))
      throw new Error('Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted');
  }
  async authHeaders(e) {
    return D([await this.apiKeyAuth(e), await this.bearerAuth(e)]);
  }
  async apiKeyAuth(e) {
    if (this.apiKey != null)
      return D([{ "X-Api-Key": this.apiKey }]);
  }
  async bearerAuth(e) {
    if (this.authToken != null)
      return D([{ Authorization: `Bearer ${this.authToken}` }]);
  }
  stringifyQuery(e) {
    return Mm(e);
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${Yt}`;
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${id()}`;
  }
  makeStatusError(e, t, n, o) {
    return Le.generate(e, t, n, o);
  }
  buildURL(e, t, n) {
    const o = !S(this, Gs, "m", Qd).call(this) && n || this.baseURL, i = vm(e) ? new URL(e) : new URL(o + (o.endsWith("/") && e.startsWith("/") ? e.slice(1) : e)), s = this.defaultQuery(), a = Object.fromEntries(i.searchParams);
    return (!Ba(s) || !Ba(a)) && (t = {
      ...a,
      ...s,
      ...t
    }), typeof t == "object" && t && !Array.isArray(t) && (i.search = this.stringifyQuery(t)), i.toString();
  }
  _calculateNonstreamingTimeout(e) {
    if (3600 * e / 128e3 > 600) throw new H("Streaming is required for operations that may take longer than 10 minutes. See https://github.com/anthropics/anthropic-sdk-typescript#streaming-responses for more details");
    return 600 * 1e3;
  }
  async prepareOptions(e) {
  }
  async prepareRequest(e, { url: t, options: n }) {
  }
  get(e, t) {
    return this.methodRequest("get", e, t);
  }
  post(e, t) {
    return this.methodRequest("post", e, t);
  }
  patch(e, t) {
    return this.methodRequest("patch", e, t);
  }
  put(e, t) {
    return this.methodRequest("put", e, t);
  }
  delete(e, t) {
    return this.methodRequest("delete", e, t);
  }
  methodRequest(e, t, n) {
    return this.request(Promise.resolve(n).then((o) => ({
      method: e,
      path: t,
      ...o
    })));
  }
  request(e, t = null) {
    return new vd(this, this.makeRequest(e, t, void 0));
  }
  async makeRequest(e, t, n) {
    const o = await e, i = o.maxRetries ?? this.maxRetries;
    t == null && (t = i), await this.prepareOptions(o);
    const { req: s, url: a, timeout: u } = await this.buildRequest(o, { retryCount: i - t });
    await this.prepareRequest(s, {
      url: a,
      options: o
    });
    const c = "log_" + (Math.random() * (1 << 24) | 0).toString(16).padStart(6, "0"), d = n === void 0 ? "" : `, retryOf: ${n}`, p = Date.now();
    if (ve(this).debug(`[${c}] sending request`, It({
      retryOfRequestLogID: n,
      method: o.method,
      url: a,
      options: o,
      headers: s.headers
    })), o.signal?.aborted) throw new We();
    const f = new AbortController(), h = await this.fetchWithTimeout(a, s, u, f).catch(Ms), m = Date.now();
    if (h instanceof globalThis.Error) {
      const y = `retrying, ${t} attempts remaining`;
      if (o.signal?.aborted) throw new We();
      const v = uo(h) || /timed? ?out/i.test(String(h) + ("cause" in h ? String(h.cause) : ""));
      if (t)
        return ve(this).info(`[${c}] connection ${v ? "timed out" : "failed"} - ${y}`), ve(this).debug(`[${c}] connection ${v ? "timed out" : "failed"} (${y})`, It({
          retryOfRequestLogID: n,
          url: a,
          durationMs: m - p,
          message: h.message
        })), this.retryRequest(o, t, n ?? c);
      throw ve(this).info(`[${c}] connection ${v ? "timed out" : "failed"} - error; no more retries left`), ve(this).debug(`[${c}] connection ${v ? "timed out" : "failed"} (error; no more retries left)`, It({
        retryOfRequestLogID: n,
        url: a,
        durationMs: m - p,
        message: h.message
      })), v ? new sd() : new Ni({ cause: h });
    }
    const g = `[${c}${d}${[...h.headers.entries()].filter(([y]) => y === "request-id").map(([y, v]) => ", " + y + ": " + JSON.stringify(v)).join("")}] ${s.method} ${a} ${h.ok ? "succeeded" : "failed"} with status ${h.status} in ${m - p}ms`;
    if (!h.ok) {
      const y = await this.shouldRetry(h);
      if (t && y) {
        const M = `retrying, ${t} attempts remaining`;
        return await Pm(h.body), ve(this).info(`${g} - ${M}`), ve(this).debug(`[${c}] response error (${M})`, It({
          retryOfRequestLogID: n,
          url: h.url,
          status: h.status,
          headers: h.headers,
          durationMs: m - p
        })), this.retryRequest(o, t, n ?? c, h.headers);
      }
      const v = y ? "error; no more retries left" : "error; not retryable";
      ve(this).info(`${g} - ${v}`);
      const A = await h.text().catch((M) => Ms(M).message), C = hd(A), R = C ? void 0 : A;
      throw ve(this).debug(`[${c}] response error (${v})`, It({
        retryOfRequestLogID: n,
        url: h.url,
        status: h.status,
        headers: h.headers,
        message: R,
        durationMs: Date.now() - p
      })), this.makeStatusError(h.status, C, R, h.headers);
    }
    return ve(this).info(g), ve(this).debug(`[${c}] response start`, It({
      retryOfRequestLogID: n,
      url: h.url,
      status: h.status,
      headers: h.headers,
      durationMs: m - p
    })), {
      response: h,
      options: o,
      controller: f,
      requestLogID: c,
      retryOfRequestLogID: n,
      startTime: p
    };
  }
  getAPIList(e, t, n) {
    return this.requestAPIList(t, n && "then" in n ? n.then((o) => ({
      method: "get",
      path: e,
      ...o
    })) : {
      method: "get",
      path: e,
      ...n
    });
  }
  requestAPIList(e, t) {
    const n = this.makeRequest(t, null, void 0);
    return new Gm(this, n, e);
  }
  async fetchWithTimeout(e, t, n, o) {
    const { signal: i, method: s, ...a } = t || {}, u = this._makeAbort(o);
    i && i.addEventListener("abort", u, { once: !0 });
    const c = setTimeout(u, n), d = globalThis.ReadableStream && a.body instanceof globalThis.ReadableStream || typeof a.body == "object" && a.body !== null && Symbol.asyncIterator in a.body, p = {
      signal: o.signal,
      ...d ? { duplex: "half" } : {},
      method: "GET",
      ...a
    };
    s && (p.method = s.toUpperCase());
    try {
      return await this.fetch.call(void 0, e, p);
    } finally {
      clearTimeout(c);
    }
  }
  async shouldRetry(e) {
    const t = e.headers.get("x-should-retry");
    return t === "true" ? !0 : t === "false" ? !1 : e.status === 408 || e.status === 409 || e.status === 429 || e.status >= 500;
  }
  async retryRequest(e, t, n, o) {
    let i;
    const s = o?.get("retry-after-ms");
    if (s) {
      const u = parseFloat(s);
      Number.isNaN(u) || (i = u);
    }
    const a = o?.get("retry-after");
    if (a && !i) {
      const u = parseFloat(a);
      Number.isNaN(u) ? i = Date.parse(a) - Date.now() : i = u * 1e3;
    }
    if (i === void 0) {
      const u = e.maxRetries ?? this.maxRetries;
      i = this.calculateDefaultRetryTimeoutMillis(t, u);
    }
    return await Em(i), this.makeRequest(e, t - 1, n);
  }
  calculateDefaultRetryTimeoutMillis(e, t) {
    const i = t - e;
    return Math.min(0.5 * Math.pow(2, i), 8) * (1 - Math.random() * 0.25) * 1e3;
  }
  calculateNonstreamingTimeout(e, t) {
    if (36e5 * e / 128e3 > 6e5 || t != null && e > t) throw new H("Streaming is required for operations that may take longer than 10 minutes. See https://github.com/anthropics/anthropic-sdk-typescript#long-requests for more details");
    return 6e5;
  }
  async buildRequest(e, { retryCount: t = 0 } = {}) {
    const n = { ...e }, { method: o, path: i, query: s, defaultBaseURL: a } = n, u = this.buildURL(i, s, a);
    "timeout" in n && Sm("timeout", n.timeout), n.timeout = n.timeout ?? this.timeout;
    const { bodyHeaders: c, body: d } = this.buildBody({ options: n });
    return {
      req: {
        method: o,
        headers: await this.buildHeaders({
          options: e,
          method: o,
          bodyHeaders: c,
          retryCount: t
        }),
        ...n.signal && { signal: n.signal },
        ...globalThis.ReadableStream && d instanceof globalThis.ReadableStream && { duplex: "half" },
        ...d && { body: d },
        ...this.fetchOptions ?? {},
        ...n.fetchOptions ?? {}
      },
      url: u,
      timeout: n.timeout
    };
  }
  async buildHeaders({ options: e, method: t, bodyHeaders: n, retryCount: o }) {
    let i = {};
    this.idempotencyHeader && t !== "get" && (e.idempotencyKey || (e.idempotencyKey = this.defaultIdempotencyKey()), i[this.idempotencyHeader] = e.idempotencyKey);
    const s = D([
      i,
      {
        Accept: "application/json",
        "User-Agent": this.getUserAgent(),
        "X-Stainless-Retry-Count": String(o),
        ...e.timeout ? { "X-Stainless-Timeout": String(Math.trunc(e.timeout / 1e3)) } : {},
        ...bm(),
        ...this._options.dangerouslyAllowBrowser ? { "anthropic-dangerous-direct-browser-access": "true" } : void 0,
        "anthropic-version": "2023-06-01"
      },
      await this.authHeaders(e),
      this._options.defaultHeaders,
      n,
      e.headers
    ]);
    return this.validateHeaders(s), s.values;
  }
  _makeAbort(e) {
    return () => e.abort();
  }
  buildBody({ options: { body: e, headers: t } }) {
    if (!e) return {
      bodyHeaders: void 0,
      body: void 0
    };
    const n = D([t]);
    return ArrayBuffer.isView(e) || e instanceof ArrayBuffer || e instanceof DataView || typeof e == "string" && n.values.has("content-type") || globalThis.Blob && e instanceof globalThis.Blob || e instanceof FormData || e instanceof URLSearchParams || globalThis.ReadableStream && e instanceof globalThis.ReadableStream ? {
      bodyHeaders: void 0,
      body: e
    } : typeof e == "object" && (Symbol.asyncIterator in e || Symbol.iterator in e && "next" in e && typeof e.next == "function") ? {
      bodyHeaders: void 0,
      body: gd(e)
    } : typeof e == "object" && n.values.get("content-type") === "application/x-www-form-urlencoded" ? {
      bodyHeaders: { "content-type": "application/x-www-form-urlencoded" },
      body: this.stringifyQuery(e)
    } : S(this, ti, "f").call(this, {
      body: e,
      headers: n
    });
  }
};
$r = ne, ti = /* @__PURE__ */ new WeakMap(), Gs = /* @__PURE__ */ new WeakSet(), Qd = function() {
  return this.baseURL !== "https://api.anthropic.com";
};
ne.Anthropic = $r;
ne.HUMAN_PROMPT = lg;
ne.AI_PROMPT = ug;
ne.DEFAULT_TIMEOUT = 6e5;
ne.AnthropicError = H;
ne.APIError = Le;
ne.APIConnectionError = Ni;
ne.APIConnectionTimeoutError = sd;
ne.APIUserAbortError = We;
ne.NotFoundError = ud;
ne.ConflictError = cd;
ne.RateLimitError = fd;
ne.BadRequestError = rd;
ne.AuthenticationError = ad;
ne.InternalServerError = pd;
ne.PermissionDeniedError = ld;
ne.UnprocessableEntityError = dd;
ne.toFile = Wm;
var vo = class extends ne {
  constructor() {
    super(...arguments), this.completions = new Wd(this), this.messages = new Lr(this), this.models = new Xd(this), this.beta = new ot(this);
  }
};
vo.Completions = Wd;
vo.Messages = Lr;
vo.Models = Xd;
vo.Beta = ot;
function cg(e) {
  try {
    return JSON.parse(e || "{}");
  } catch {
    return {};
  }
}
function dg(e = "") {
  const t = String(e || "").match(/^data:([^;,]+);base64,(.+)$/);
  return t ? {
    mediaType: t[1],
    data: t[2]
  } : {
    mediaType: "",
    data: ""
  };
}
function Zd(e) {
  if (e !== void 0)
    try {
      return JSON.parse(JSON.stringify(e));
    } catch {
      return;
    }
}
function fg(e) {
  if (typeof e == "string") return [{
    type: "text",
    text: e
  }];
  if (!Array.isArray(e)) return [{
    type: "text",
    text: ""
  }];
  const t = e.map((n) => {
    if (!n || typeof n != "object") return null;
    if (n.type === "text") return {
      type: "text",
      text: n.text || ""
    };
    if (n.type === "image_url" && n.image_url?.url) {
      const o = dg(n.image_url.url);
      return !o.mediaType || !o.data ? null : {
        type: "image",
        source: {
          type: "base64",
          media_type: o.mediaType,
          data: o.data
        }
      };
    }
    return null;
  }).filter(Boolean);
  return t.length ? t : [{
    type: "text",
    text: ""
  }];
}
function pg(e) {
  const t = [String(e.systemPrompt || "").trim(), ...(e.messages || []).filter((n) => n.role === "system").map((n) => String(n.content || "").trim())].filter(Boolean);
  return t.length ? [...new Set(t)].join(`

`) : "";
}
function hg(e) {
  const t = e?.providerPayload?.anthropicContent;
  return Array.isArray(t) && t.length && Zd(t) || null;
}
function mg(e) {
  return Array.isArray(e?.content) && e.content.length ? { anthropicContent: Zd(e.content) || [] } : void 0;
}
function dl(e = {}) {
  return {
    type: "tool_result",
    tool_use_id: e.tool_call_id,
    content: e.content
  };
}
function fl(e = []) {
  return (Array.isArray(e) ? e : []).map((t) => {
    const n = String(t?.function?.name || "").trim();
    return n ? {
      type: "tool_use",
      id: t.id,
      name: n,
      input: cg(t.function.arguments)
    } : null;
  }).filter(Boolean);
}
function gg(e) {
  const t = [];
  for (let n = 0; n < e.length; n += 1) {
    const o = e[n];
    if (o.role !== "system") {
      if (o.role === "assistant") {
        const i = hg(o), s = fl(o.tool_calls);
        if (i && s.length) {
          t.push({
            role: "assistant",
            content: i.filter((a) => a?.type !== "tool_use").concat(s)
          });
          continue;
        }
        if (i) {
          t.push({
            role: "assistant",
            content: i
          });
          continue;
        }
      }
      if (o.role === "tool") {
        const i = [dl(o)];
        for (; e[n + 1]?.role === "tool"; )
          n += 1, i.push(dl(e[n]));
        t.push({
          role: "user",
          content: i
        });
        continue;
      }
      if (o.role === "assistant" && Array.isArray(o.tool_calls) && o.tool_calls.length) {
        t.push({
          role: "assistant",
          content: [...o.content ? [{
            type: "text",
            text: o.content
          }] : [], ...fl(o.tool_calls)]
        });
        continue;
      }
      t.push({
        role: o.role,
        content: fg(o.content)
      });
    }
  }
  return t;
}
function ps(e, t) {
  typeof e.onStreamProgress == "function" && e.onStreamProgress({
    ...typeof t.text == "string" ? { text: t.text } : {},
    ...Array.isArray(t.thoughts) ? { thoughts: t.thoughts } : {}
  });
}
function yg(e = "") {
  return String(e || "https://api.anthropic.com").trim().replace(/\/+$/, "").replace(/\/v1$/i, "");
}
var _g = class {
  constructor(e) {
    this.config = e, this.client = new vo({
      apiKey: e.apiKey,
      baseURL: yg(e.baseUrl),
      timeout: Number(e.timeoutMs) || 900 * 1e3,
      maxRetries: 0,
      dangerouslyAllowBrowser: !0
    });
  }
  async chat(e) {
    const t = (e.tools || []).map((a) => ({
      name: a.function.name,
      description: a.function.description,
      input_schema: a.function.parameters
    })), n = pg(e), o = {
      model: this.config.model,
      system: n,
      messages: gg(e.messages),
      tools: t,
      ...e.maxTokens ? { max_tokens: e.maxTokens } : {}
    };
    !e.reasoning?.enabled && typeof e.temperature == "number" && (o.temperature = e.temperature), e.reasoning?.enabled && (o.thinking = {
      type: "adaptive",
      display: "summarized"
    });
    let i;
    if (typeof e.onStreamProgress == "function") {
      const a = this.client.messages.stream(o, { signal: e.signal }), u = /* @__PURE__ */ new Map(), c = () => Array.from(u.entries()).sort(([d], [p]) => d.localeCompare(p)).map(([d, p]) => ({
        label: d.startsWith("redacted:") ? "已脱敏思考块" : "思考块",
        text: p
      })).filter((d) => d.text);
      a.on("text", (d, p) => {
        ps(e, {
          text: p || "",
          thoughts: c()
        });
      }), a.on("thinking", (d, p) => {
        u.set("thinking:0", p || ""), ps(e, { thoughts: c() });
      }), a.on("contentBlock", (d) => {
        d?.type === "redacted_thinking" && (u.set("redacted:0", d.data || ""), ps(e, { thoughts: c() }));
      }), i = await a.finalMessage();
    } else i = await this.client.messages.create(o, { signal: e.signal });
    const s = (i.content || []).filter((a) => a.type === "tool_use" && a.name).map((a, u) => ({
      id: a.id || `anthropic-tool-${u + 1}`,
      name: a.name,
      arguments: JSON.stringify(a.input || {})
    }));
    return {
      text: (i.content || []).filter((a) => a.type === "text").map((a) => a.text || "").join(`
`),
      toolCalls: s,
      thoughts: (i.content || []).filter((a) => a.type === "thinking" || a.type === "redacted_thinking").map((a) => ({
        label: a.type === "thinking" ? "思考块" : "已脱敏思考块",
        text: a.type === "thinking" ? a.thinking || "" : a.data || ""
      })).filter((a) => a.text),
      finishReason: i.stop_reason || "stop",
      model: i.model || this.config.model,
      provider: "anthropic",
      providerPayload: mg(i)
    };
  }
}, vg = /* @__PURE__ */ Mi(((e, t) => {
  function n(o, i) {
    typeof i == "boolean" && (i = { forever: i }), this._originalTimeouts = JSON.parse(JSON.stringify(o)), this._timeouts = o, this._options = i || {}, this._maxRetryTime = i && i.maxRetryTime || 1 / 0, this._fn = null, this._errors = [], this._attempts = 1, this._operationTimeout = null, this._operationTimeoutCb = null, this._timeout = null, this._operationStart = null, this._timer = null, this._options.forever && (this._cachedTimeouts = this._timeouts.slice(0));
  }
  t.exports = n, n.prototype.reset = function() {
    this._attempts = 1, this._timeouts = this._originalTimeouts.slice(0);
  }, n.prototype.stop = function() {
    this._timeout && clearTimeout(this._timeout), this._timer && clearTimeout(this._timer), this._timeouts = [], this._cachedTimeouts = null;
  }, n.prototype.retry = function(o) {
    if (this._timeout && clearTimeout(this._timeout), !o) return !1;
    var i = (/* @__PURE__ */ new Date()).getTime();
    if (o && i - this._operationStart >= this._maxRetryTime)
      return this._errors.push(o), this._errors.unshift(/* @__PURE__ */ new Error("RetryOperation timeout occurred")), !1;
    this._errors.push(o);
    var s = this._timeouts.shift();
    if (s === void 0) if (this._cachedTimeouts)
      this._errors.splice(0, this._errors.length - 1), s = this._cachedTimeouts.slice(-1);
    else return !1;
    var a = this;
    return this._timer = setTimeout(function() {
      a._attempts++, a._operationTimeoutCb && (a._timeout = setTimeout(function() {
        a._operationTimeoutCb(a._attempts);
      }, a._operationTimeout), a._options.unref && a._timeout.unref()), a._fn(a._attempts);
    }, s), this._options.unref && this._timer.unref(), !0;
  }, n.prototype.attempt = function(o, i) {
    this._fn = o, i && (i.timeout && (this._operationTimeout = i.timeout), i.cb && (this._operationTimeoutCb = i.cb));
    var s = this;
    this._operationTimeoutCb && (this._timeout = setTimeout(function() {
      s._operationTimeoutCb();
    }, s._operationTimeout)), this._operationStart = (/* @__PURE__ */ new Date()).getTime(), this._fn(this._attempts);
  }, n.prototype.try = function(o) {
    this.attempt(o);
  }, n.prototype.start = function(o) {
    this.attempt(o);
  }, n.prototype.start = n.prototype.try, n.prototype.errors = function() {
    return this._errors;
  }, n.prototype.attempts = function() {
    return this._attempts;
  }, n.prototype.mainError = function() {
    if (this._errors.length === 0) return null;
    for (var o = {}, i = null, s = 0, a = 0; a < this._errors.length; a++) {
      var u = this._errors[a], c = u.message, d = (o[c] || 0) + 1;
      o[c] = d, d >= s && (i = u, s = d);
    }
    return i;
  };
})), Tg = /* @__PURE__ */ Mi(((e) => {
  var t = vg();
  e.operation = function(n) {
    return new t(e.timeouts(n), {
      forever: n && (n.forever || n.retries === 1 / 0),
      unref: n && n.unref,
      maxRetryTime: n && n.maxRetryTime
    });
  }, e.timeouts = function(n) {
    if (n instanceof Array) return [].concat(n);
    var o = {
      retries: 10,
      factor: 2,
      minTimeout: 1 * 1e3,
      maxTimeout: 1 / 0,
      randomize: !1
    };
    for (var i in n) o[i] = n[i];
    if (o.minTimeout > o.maxTimeout) throw new Error("minTimeout is greater than maxTimeout");
    for (var s = [], a = 0; a < o.retries; a++) s.push(this.createTimeout(a, o));
    return n && n.forever && !s.length && s.push(this.createTimeout(a, o)), s.sort(function(u, c) {
      return u - c;
    }), s;
  }, e.createTimeout = function(n, o) {
    var i = o.randomize ? Math.random() + 1 : 1, s = Math.round(i * Math.max(o.minTimeout, 1) * Math.pow(o.factor, n));
    return s = Math.min(s, o.maxTimeout), s;
  }, e.wrap = function(n, o, i) {
    if (o instanceof Array && (i = o, o = null), !i) {
      i = [];
      for (var s in n) typeof n[s] == "function" && i.push(s);
    }
    for (var a = 0; a < i.length; a++) {
      var u = i[a], c = n[u];
      n[u] = function(p) {
        var f = e.operation(o), h = Array.prototype.slice.call(arguments, 1), m = h.pop();
        h.push(function(g) {
          f.retry(g) || (g && (arguments[0] = f.mainError()), m.apply(this, arguments));
        }), f.attempt(function() {
          p.apply(n, h);
        });
      }.bind(n, c), n[u].options = o;
    }
  };
})), Sg = /* @__PURE__ */ Mi(((e, t) => {
  t.exports = Tg();
})), Eg = /* @__PURE__ */ Mi(((e, t) => {
  var n = Sg(), o = [
    "Failed to fetch",
    "NetworkError when attempting to fetch resource.",
    "The Internet connection appears to be offline.",
    "Network request failed"
  ], i = class extends Error {
    constructor(c) {
      super(), c instanceof Error ? (this.originalError = c, { message: c } = c) : (this.originalError = new Error(c), this.originalError.stack = this.stack), this.name = "AbortError", this.message = c;
    }
  }, s = (c, d, p) => {
    const f = p.retries - (d - 1);
    return c.attemptNumber = d, c.retriesLeft = f, c;
  }, a = (c) => o.includes(c), u = (c, d) => new Promise((p, f) => {
    d = {
      onFailedAttempt: () => {
      },
      retries: 10,
      ...d
    };
    const h = n.operation(d);
    h.attempt(async (m) => {
      try {
        p(await c(m));
      } catch (g) {
        if (!(g instanceof Error)) {
          f(/* @__PURE__ */ new TypeError(`Non-error was thrown: "${g}". You should only throw errors.`));
          return;
        }
        if (g instanceof i)
          h.stop(), f(g.originalError);
        else if (g instanceof TypeError && !a(g.message))
          h.stop(), f(g);
        else {
          s(g, m, d);
          try {
            await d.onFailedAttempt(g);
          } catch (y) {
            f(y);
            return;
          }
          h.retry(g) || f(h.mainError());
        }
      }
    });
  });
  t.exports = u, t.exports.default = u, t.exports.AbortError = i;
})), pl = /* @__PURE__ */ um(Eg(), 1), wg = void 0, Ag = void 0;
function Cg() {
  return {
    geminiUrl: wg,
    vertexUrl: Ag
  };
}
function Ig(e, t, n, o) {
  var i, s;
  if (!e?.baseUrl) {
    const a = Cg();
    return t ? (i = a.vertexUrl) !== null && i !== void 0 ? i : n : (s = a.geminiUrl) !== null && s !== void 0 ? s : o;
  }
  return e.baseUrl;
}
var ct = class {
};
function k(e, t) {
  return e.replace(/\{([^}]+)\}/g, (n, o) => {
    if (Object.prototype.hasOwnProperty.call(t, o)) {
      const i = t[o];
      return i != null ? String(i) : "";
    } else throw new Error(`Key '${o}' not found in valueMap.`);
  });
}
function l(e, t, n) {
  for (let s = 0; s < t.length - 1; s++) {
    const a = t[s];
    if (a.endsWith("[]")) {
      const u = a.slice(0, -2);
      if (!(u in e)) if (Array.isArray(n)) e[u] = Array.from({ length: n.length }, () => ({}));
      else throw new Error(`Value must be a list given an array path ${a}`);
      if (Array.isArray(e[u])) {
        const c = e[u];
        if (Array.isArray(n)) for (let d = 0; d < c.length; d++) {
          const p = c[d];
          l(p, t.slice(s + 1), n[d]);
        }
        else for (const d of c) l(d, t.slice(s + 1), n);
      }
      return;
    } else if (a.endsWith("[0]")) {
      const u = a.slice(0, -3);
      u in e || (e[u] = [{}]);
      const c = e[u];
      l(c[0], t.slice(s + 1), n);
      return;
    }
    (!e[a] || typeof e[a] != "object") && (e[a] = {}), e = e[a];
  }
  const o = t[t.length - 1], i = e[o];
  if (i !== void 0) {
    if (!n || typeof n == "object" && Object.keys(n).length === 0 || n === i) return;
    if (typeof i == "object" && typeof n == "object" && i !== null && n !== null) Object.assign(i, n);
    else throw new Error(`Cannot set value for an existing key. Key: ${o}`);
  } else o === "_self" && typeof n == "object" && n !== null && !Array.isArray(n) ? Object.assign(e, n) : e[o] = n;
}
function r(e, t, n = void 0) {
  try {
    if (t.length === 1 && t[0] === "_self") return e;
    for (let o = 0; o < t.length; o++) {
      if (typeof e != "object" || e === null) return n;
      const i = t[o];
      if (i.endsWith("[]")) {
        const s = i.slice(0, -2);
        if (s in e) {
          const a = e[s];
          return Array.isArray(a) ? a.map((u) => r(u, t.slice(o + 1), n)) : n;
        } else return n;
      } else e = e[i];
    }
    return e;
  } catch (o) {
    if (o instanceof TypeError) return n;
    throw o;
  }
}
function bg(e, t) {
  for (const [n, o] of Object.entries(t)) {
    const i = n.split("."), s = o.split("."), a = /* @__PURE__ */ new Set();
    let u = -1;
    for (let c = 0; c < i.length; c++) if (i[c] === "*") {
      u = c;
      break;
    }
    if (u !== -1 && s.length > u) for (let c = u; c < s.length; c++) {
      const d = s[c];
      d !== "*" && !d.endsWith("[]") && !d.endsWith("[0]") && a.add(d);
    }
    Os(e, i, s, 0, a);
  }
}
function Os(e, t, n, o, i) {
  if (o >= t.length || typeof e != "object" || e === null) return;
  const s = t[o];
  if (s.endsWith("[]")) {
    const a = s.slice(0, -2), u = e;
    if (a in u && Array.isArray(u[a])) for (const c of u[a]) Os(c, t, n, o + 1, i);
  } else if (s === "*") {
    if (typeof e == "object" && e !== null && !Array.isArray(e)) {
      const a = e, u = Object.keys(a).filter((d) => !d.startsWith("_") && !i.has(d)), c = {};
      for (const d of u) c[d] = a[d];
      for (const [d, p] of Object.entries(c)) {
        const f = [];
        for (const h of n.slice(o)) h === "*" ? f.push(d) : f.push(h);
        l(a, f, p);
      }
      for (const d of u) delete a[d];
    }
  } else {
    const a = e;
    s in a && Os(a[s], t, n, o + 1, i);
  }
}
function Fr(e) {
  if (typeof e != "string") throw new Error("fromImageBytes must be a string");
  return e;
}
function Rg(e) {
  const t = {}, n = r(e, ["operationName"]);
  n != null && l(t, ["operationName"], n);
  const o = r(e, ["resourceName"]);
  return o != null && l(t, ["_url", "resourceName"], o), t;
}
function Pg(e) {
  const t = {}, n = r(e, ["name"]);
  n != null && l(t, ["name"], n);
  const o = r(e, ["metadata"]);
  o != null && l(t, ["metadata"], o);
  const i = r(e, ["done"]);
  i != null && l(t, ["done"], i);
  const s = r(e, ["error"]);
  s != null && l(t, ["error"], s);
  const a = r(e, ["response", "generateVideoResponse"]);
  return a != null && l(t, ["response"], Mg(a)), t;
}
function xg(e) {
  const t = {}, n = r(e, ["name"]);
  n != null && l(t, ["name"], n);
  const o = r(e, ["metadata"]);
  o != null && l(t, ["metadata"], o);
  const i = r(e, ["done"]);
  i != null && l(t, ["done"], i);
  const s = r(e, ["error"]);
  s != null && l(t, ["error"], s);
  const a = r(e, ["response"]);
  return a != null && l(t, ["response"], Ng(a)), t;
}
function Mg(e) {
  const t = {}, n = r(e, ["generatedSamples"]);
  if (n != null) {
    let s = n;
    Array.isArray(s) && (s = s.map((a) => kg(a))), l(t, ["generatedVideos"], s);
  }
  const o = r(e, ["raiMediaFilteredCount"]);
  o != null && l(t, ["raiMediaFilteredCount"], o);
  const i = r(e, ["raiMediaFilteredReasons"]);
  return i != null && l(t, ["raiMediaFilteredReasons"], i), t;
}
function Ng(e) {
  const t = {}, n = r(e, ["videos"]);
  if (n != null) {
    let s = n;
    Array.isArray(s) && (s = s.map((a) => Dg(a))), l(t, ["generatedVideos"], s);
  }
  const o = r(e, ["raiMediaFilteredCount"]);
  o != null && l(t, ["raiMediaFilteredCount"], o);
  const i = r(e, ["raiMediaFilteredReasons"]);
  return i != null && l(t, ["raiMediaFilteredReasons"], i), t;
}
function kg(e) {
  const t = {}, n = r(e, ["video"]);
  return n != null && l(t, ["video"], Gg(n)), t;
}
function Dg(e) {
  const t = {}, n = r(e, ["_self"]);
  return n != null && l(t, ["video"], Og(n)), t;
}
function Ug(e) {
  const t = {}, n = r(e, ["operationName"]);
  return n != null && l(t, ["_url", "operationName"], n), t;
}
function Lg(e) {
  const t = {}, n = r(e, ["operationName"]);
  return n != null && l(t, ["_url", "operationName"], n), t;
}
function $g(e) {
  const t = {}, n = r(e, ["name"]);
  n != null && l(t, ["name"], n);
  const o = r(e, ["metadata"]);
  o != null && l(t, ["metadata"], o);
  const i = r(e, ["done"]);
  i != null && l(t, ["done"], i);
  const s = r(e, ["error"]);
  s != null && l(t, ["error"], s);
  const a = r(e, ["response"]);
  return a != null && l(t, ["response"], Fg(a)), t;
}
function Fg(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  n != null && l(t, ["sdkHttpResponse"], n);
  const o = r(e, ["parent"]);
  o != null && l(t, ["parent"], o);
  const i = r(e, ["documentName"]);
  return i != null && l(t, ["documentName"], i), t;
}
function jd(e) {
  const t = {}, n = r(e, ["name"]);
  n != null && l(t, ["name"], n);
  const o = r(e, ["metadata"]);
  o != null && l(t, ["metadata"], o);
  const i = r(e, ["done"]);
  i != null && l(t, ["done"], i);
  const s = r(e, ["error"]);
  s != null && l(t, ["error"], s);
  const a = r(e, ["response"]);
  return a != null && l(t, ["response"], Bg(a)), t;
}
function Bg(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  n != null && l(t, ["sdkHttpResponse"], n);
  const o = r(e, ["parent"]);
  o != null && l(t, ["parent"], o);
  const i = r(e, ["documentName"]);
  return i != null && l(t, ["documentName"], i), t;
}
function Gg(e) {
  const t = {}, n = r(e, ["uri"]);
  n != null && l(t, ["uri"], n);
  const o = r(e, ["encodedVideo"]);
  o != null && l(t, ["videoBytes"], Fr(o));
  const i = r(e, ["encoding"]);
  return i != null && l(t, ["mimeType"], i), t;
}
function Og(e) {
  const t = {}, n = r(e, ["gcsUri"]);
  n != null && l(t, ["uri"], n);
  const o = r(e, ["bytesBase64Encoded"]);
  o != null && l(t, ["videoBytes"], Fr(o));
  const i = r(e, ["mimeType"]);
  return i != null && l(t, ["mimeType"], i), t;
}
var hl;
(function(e) {
  e.LANGUAGE_UNSPECIFIED = "LANGUAGE_UNSPECIFIED", e.PYTHON = "PYTHON";
})(hl || (hl = {}));
var ml;
(function(e) {
  e.OUTCOME_UNSPECIFIED = "OUTCOME_UNSPECIFIED", e.OUTCOME_OK = "OUTCOME_OK", e.OUTCOME_FAILED = "OUTCOME_FAILED", e.OUTCOME_DEADLINE_EXCEEDED = "OUTCOME_DEADLINE_EXCEEDED";
})(ml || (ml = {}));
var gl;
(function(e) {
  e.SCHEDULING_UNSPECIFIED = "SCHEDULING_UNSPECIFIED", e.SILENT = "SILENT", e.WHEN_IDLE = "WHEN_IDLE", e.INTERRUPT = "INTERRUPT";
})(gl || (gl = {}));
var Tt;
(function(e) {
  e.TYPE_UNSPECIFIED = "TYPE_UNSPECIFIED", e.STRING = "STRING", e.NUMBER = "NUMBER", e.INTEGER = "INTEGER", e.BOOLEAN = "BOOLEAN", e.ARRAY = "ARRAY", e.OBJECT = "OBJECT", e.NULL = "NULL";
})(Tt || (Tt = {}));
var yl;
(function(e) {
  e.ENVIRONMENT_UNSPECIFIED = "ENVIRONMENT_UNSPECIFIED", e.ENVIRONMENT_BROWSER = "ENVIRONMENT_BROWSER";
})(yl || (yl = {}));
var _l;
(function(e) {
  e.AUTH_TYPE_UNSPECIFIED = "AUTH_TYPE_UNSPECIFIED", e.NO_AUTH = "NO_AUTH", e.API_KEY_AUTH = "API_KEY_AUTH", e.HTTP_BASIC_AUTH = "HTTP_BASIC_AUTH", e.GOOGLE_SERVICE_ACCOUNT_AUTH = "GOOGLE_SERVICE_ACCOUNT_AUTH", e.OAUTH = "OAUTH", e.OIDC_AUTH = "OIDC_AUTH";
})(_l || (_l = {}));
var vl;
(function(e) {
  e.HTTP_IN_UNSPECIFIED = "HTTP_IN_UNSPECIFIED", e.HTTP_IN_QUERY = "HTTP_IN_QUERY", e.HTTP_IN_HEADER = "HTTP_IN_HEADER", e.HTTP_IN_PATH = "HTTP_IN_PATH", e.HTTP_IN_BODY = "HTTP_IN_BODY", e.HTTP_IN_COOKIE = "HTTP_IN_COOKIE";
})(vl || (vl = {}));
var Tl;
(function(e) {
  e.API_SPEC_UNSPECIFIED = "API_SPEC_UNSPECIFIED", e.SIMPLE_SEARCH = "SIMPLE_SEARCH", e.ELASTIC_SEARCH = "ELASTIC_SEARCH";
})(Tl || (Tl = {}));
var Sl;
(function(e) {
  e.PHISH_BLOCK_THRESHOLD_UNSPECIFIED = "PHISH_BLOCK_THRESHOLD_UNSPECIFIED", e.BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE", e.BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE", e.BLOCK_HIGH_AND_ABOVE = "BLOCK_HIGH_AND_ABOVE", e.BLOCK_HIGHER_AND_ABOVE = "BLOCK_HIGHER_AND_ABOVE", e.BLOCK_VERY_HIGH_AND_ABOVE = "BLOCK_VERY_HIGH_AND_ABOVE", e.BLOCK_ONLY_EXTREMELY_HIGH = "BLOCK_ONLY_EXTREMELY_HIGH";
})(Sl || (Sl = {}));
var El;
(function(e) {
  e.UNSPECIFIED = "UNSPECIFIED", e.BLOCKING = "BLOCKING", e.NON_BLOCKING = "NON_BLOCKING";
})(El || (El = {}));
var wl;
(function(e) {
  e.MODE_UNSPECIFIED = "MODE_UNSPECIFIED", e.MODE_DYNAMIC = "MODE_DYNAMIC";
})(wl || (wl = {}));
var qs;
(function(e) {
  e.MODE_UNSPECIFIED = "MODE_UNSPECIFIED", e.AUTO = "AUTO", e.ANY = "ANY", e.NONE = "NONE", e.VALIDATED = "VALIDATED";
})(qs || (qs = {}));
var to;
(function(e) {
  e.THINKING_LEVEL_UNSPECIFIED = "THINKING_LEVEL_UNSPECIFIED", e.MINIMAL = "MINIMAL", e.LOW = "LOW", e.MEDIUM = "MEDIUM", e.HIGH = "HIGH";
})(to || (to = {}));
var Al;
(function(e) {
  e.DONT_ALLOW = "DONT_ALLOW", e.ALLOW_ADULT = "ALLOW_ADULT", e.ALLOW_ALL = "ALLOW_ALL";
})(Al || (Al = {}));
var Cl;
(function(e) {
  e.PROMINENT_PEOPLE_UNSPECIFIED = "PROMINENT_PEOPLE_UNSPECIFIED", e.ALLOW_PROMINENT_PEOPLE = "ALLOW_PROMINENT_PEOPLE", e.BLOCK_PROMINENT_PEOPLE = "BLOCK_PROMINENT_PEOPLE";
})(Cl || (Cl = {}));
var Il;
(function(e) {
  e.HARM_CATEGORY_UNSPECIFIED = "HARM_CATEGORY_UNSPECIFIED", e.HARM_CATEGORY_HARASSMENT = "HARM_CATEGORY_HARASSMENT", e.HARM_CATEGORY_HATE_SPEECH = "HARM_CATEGORY_HATE_SPEECH", e.HARM_CATEGORY_SEXUALLY_EXPLICIT = "HARM_CATEGORY_SEXUALLY_EXPLICIT", e.HARM_CATEGORY_DANGEROUS_CONTENT = "HARM_CATEGORY_DANGEROUS_CONTENT", e.HARM_CATEGORY_CIVIC_INTEGRITY = "HARM_CATEGORY_CIVIC_INTEGRITY", e.HARM_CATEGORY_IMAGE_HATE = "HARM_CATEGORY_IMAGE_HATE", e.HARM_CATEGORY_IMAGE_DANGEROUS_CONTENT = "HARM_CATEGORY_IMAGE_DANGEROUS_CONTENT", e.HARM_CATEGORY_IMAGE_HARASSMENT = "HARM_CATEGORY_IMAGE_HARASSMENT", e.HARM_CATEGORY_IMAGE_SEXUALLY_EXPLICIT = "HARM_CATEGORY_IMAGE_SEXUALLY_EXPLICIT", e.HARM_CATEGORY_JAILBREAK = "HARM_CATEGORY_JAILBREAK";
})(Il || (Il = {}));
var bl;
(function(e) {
  e.HARM_BLOCK_METHOD_UNSPECIFIED = "HARM_BLOCK_METHOD_UNSPECIFIED", e.SEVERITY = "SEVERITY", e.PROBABILITY = "PROBABILITY";
})(bl || (bl = {}));
var Rl;
(function(e) {
  e.HARM_BLOCK_THRESHOLD_UNSPECIFIED = "HARM_BLOCK_THRESHOLD_UNSPECIFIED", e.BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE", e.BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE", e.BLOCK_ONLY_HIGH = "BLOCK_ONLY_HIGH", e.BLOCK_NONE = "BLOCK_NONE", e.OFF = "OFF";
})(Rl || (Rl = {}));
var Pl;
(function(e) {
  e.FINISH_REASON_UNSPECIFIED = "FINISH_REASON_UNSPECIFIED", e.STOP = "STOP", e.MAX_TOKENS = "MAX_TOKENS", e.SAFETY = "SAFETY", e.RECITATION = "RECITATION", e.LANGUAGE = "LANGUAGE", e.OTHER = "OTHER", e.BLOCKLIST = "BLOCKLIST", e.PROHIBITED_CONTENT = "PROHIBITED_CONTENT", e.SPII = "SPII", e.MALFORMED_FUNCTION_CALL = "MALFORMED_FUNCTION_CALL", e.IMAGE_SAFETY = "IMAGE_SAFETY", e.UNEXPECTED_TOOL_CALL = "UNEXPECTED_TOOL_CALL", e.IMAGE_PROHIBITED_CONTENT = "IMAGE_PROHIBITED_CONTENT", e.NO_IMAGE = "NO_IMAGE", e.IMAGE_RECITATION = "IMAGE_RECITATION", e.IMAGE_OTHER = "IMAGE_OTHER";
})(Pl || (Pl = {}));
var xl;
(function(e) {
  e.HARM_PROBABILITY_UNSPECIFIED = "HARM_PROBABILITY_UNSPECIFIED", e.NEGLIGIBLE = "NEGLIGIBLE", e.LOW = "LOW", e.MEDIUM = "MEDIUM", e.HIGH = "HIGH";
})(xl || (xl = {}));
var Ml;
(function(e) {
  e.HARM_SEVERITY_UNSPECIFIED = "HARM_SEVERITY_UNSPECIFIED", e.HARM_SEVERITY_NEGLIGIBLE = "HARM_SEVERITY_NEGLIGIBLE", e.HARM_SEVERITY_LOW = "HARM_SEVERITY_LOW", e.HARM_SEVERITY_MEDIUM = "HARM_SEVERITY_MEDIUM", e.HARM_SEVERITY_HIGH = "HARM_SEVERITY_HIGH";
})(Ml || (Ml = {}));
var Nl;
(function(e) {
  e.URL_RETRIEVAL_STATUS_UNSPECIFIED = "URL_RETRIEVAL_STATUS_UNSPECIFIED", e.URL_RETRIEVAL_STATUS_SUCCESS = "URL_RETRIEVAL_STATUS_SUCCESS", e.URL_RETRIEVAL_STATUS_ERROR = "URL_RETRIEVAL_STATUS_ERROR", e.URL_RETRIEVAL_STATUS_PAYWALL = "URL_RETRIEVAL_STATUS_PAYWALL", e.URL_RETRIEVAL_STATUS_UNSAFE = "URL_RETRIEVAL_STATUS_UNSAFE";
})(Nl || (Nl = {}));
var kl;
(function(e) {
  e.BLOCKED_REASON_UNSPECIFIED = "BLOCKED_REASON_UNSPECIFIED", e.SAFETY = "SAFETY", e.OTHER = "OTHER", e.BLOCKLIST = "BLOCKLIST", e.PROHIBITED_CONTENT = "PROHIBITED_CONTENT", e.IMAGE_SAFETY = "IMAGE_SAFETY", e.MODEL_ARMOR = "MODEL_ARMOR", e.JAILBREAK = "JAILBREAK";
})(kl || (kl = {}));
var Dl;
(function(e) {
  e.TRAFFIC_TYPE_UNSPECIFIED = "TRAFFIC_TYPE_UNSPECIFIED", e.ON_DEMAND = "ON_DEMAND", e.ON_DEMAND_PRIORITY = "ON_DEMAND_PRIORITY", e.ON_DEMAND_FLEX = "ON_DEMAND_FLEX", e.PROVISIONED_THROUGHPUT = "PROVISIONED_THROUGHPUT";
})(Dl || (Dl = {}));
var gi;
(function(e) {
  e.MODALITY_UNSPECIFIED = "MODALITY_UNSPECIFIED", e.TEXT = "TEXT", e.IMAGE = "IMAGE", e.AUDIO = "AUDIO", e.VIDEO = "VIDEO";
})(gi || (gi = {}));
var Ul;
(function(e) {
  e.MODEL_STAGE_UNSPECIFIED = "MODEL_STAGE_UNSPECIFIED", e.UNSTABLE_EXPERIMENTAL = "UNSTABLE_EXPERIMENTAL", e.EXPERIMENTAL = "EXPERIMENTAL", e.PREVIEW = "PREVIEW", e.STABLE = "STABLE", e.LEGACY = "LEGACY", e.DEPRECATED = "DEPRECATED", e.RETIRED = "RETIRED";
})(Ul || (Ul = {}));
var Ll;
(function(e) {
  e.MEDIA_RESOLUTION_UNSPECIFIED = "MEDIA_RESOLUTION_UNSPECIFIED", e.MEDIA_RESOLUTION_LOW = "MEDIA_RESOLUTION_LOW", e.MEDIA_RESOLUTION_MEDIUM = "MEDIA_RESOLUTION_MEDIUM", e.MEDIA_RESOLUTION_HIGH = "MEDIA_RESOLUTION_HIGH";
})(Ll || (Ll = {}));
var $l;
(function(e) {
  e.TUNING_MODE_UNSPECIFIED = "TUNING_MODE_UNSPECIFIED", e.TUNING_MODE_FULL = "TUNING_MODE_FULL", e.TUNING_MODE_PEFT_ADAPTER = "TUNING_MODE_PEFT_ADAPTER";
})($l || ($l = {}));
var Fl;
(function(e) {
  e.ADAPTER_SIZE_UNSPECIFIED = "ADAPTER_SIZE_UNSPECIFIED", e.ADAPTER_SIZE_ONE = "ADAPTER_SIZE_ONE", e.ADAPTER_SIZE_TWO = "ADAPTER_SIZE_TWO", e.ADAPTER_SIZE_FOUR = "ADAPTER_SIZE_FOUR", e.ADAPTER_SIZE_EIGHT = "ADAPTER_SIZE_EIGHT", e.ADAPTER_SIZE_SIXTEEN = "ADAPTER_SIZE_SIXTEEN", e.ADAPTER_SIZE_THIRTY_TWO = "ADAPTER_SIZE_THIRTY_TWO";
})(Fl || (Fl = {}));
var Vs;
(function(e) {
  e.JOB_STATE_UNSPECIFIED = "JOB_STATE_UNSPECIFIED", e.JOB_STATE_QUEUED = "JOB_STATE_QUEUED", e.JOB_STATE_PENDING = "JOB_STATE_PENDING", e.JOB_STATE_RUNNING = "JOB_STATE_RUNNING", e.JOB_STATE_SUCCEEDED = "JOB_STATE_SUCCEEDED", e.JOB_STATE_FAILED = "JOB_STATE_FAILED", e.JOB_STATE_CANCELLING = "JOB_STATE_CANCELLING", e.JOB_STATE_CANCELLED = "JOB_STATE_CANCELLED", e.JOB_STATE_PAUSED = "JOB_STATE_PAUSED", e.JOB_STATE_EXPIRED = "JOB_STATE_EXPIRED", e.JOB_STATE_UPDATING = "JOB_STATE_UPDATING", e.JOB_STATE_PARTIALLY_SUCCEEDED = "JOB_STATE_PARTIALLY_SUCCEEDED";
})(Vs || (Vs = {}));
var Bl;
(function(e) {
  e.TUNING_JOB_STATE_UNSPECIFIED = "TUNING_JOB_STATE_UNSPECIFIED", e.TUNING_JOB_STATE_WAITING_FOR_QUOTA = "TUNING_JOB_STATE_WAITING_FOR_QUOTA", e.TUNING_JOB_STATE_PROCESSING_DATASET = "TUNING_JOB_STATE_PROCESSING_DATASET", e.TUNING_JOB_STATE_WAITING_FOR_CAPACITY = "TUNING_JOB_STATE_WAITING_FOR_CAPACITY", e.TUNING_JOB_STATE_TUNING = "TUNING_JOB_STATE_TUNING", e.TUNING_JOB_STATE_POST_PROCESSING = "TUNING_JOB_STATE_POST_PROCESSING";
})(Bl || (Bl = {}));
var Gl;
(function(e) {
  e.AGGREGATION_METRIC_UNSPECIFIED = "AGGREGATION_METRIC_UNSPECIFIED", e.AVERAGE = "AVERAGE", e.MODE = "MODE", e.STANDARD_DEVIATION = "STANDARD_DEVIATION", e.VARIANCE = "VARIANCE", e.MINIMUM = "MINIMUM", e.MAXIMUM = "MAXIMUM", e.MEDIAN = "MEDIAN", e.PERCENTILE_P90 = "PERCENTILE_P90", e.PERCENTILE_P95 = "PERCENTILE_P95", e.PERCENTILE_P99 = "PERCENTILE_P99";
})(Gl || (Gl = {}));
var Ol;
(function(e) {
  e.PAIRWISE_CHOICE_UNSPECIFIED = "PAIRWISE_CHOICE_UNSPECIFIED", e.BASELINE = "BASELINE", e.CANDIDATE = "CANDIDATE", e.TIE = "TIE";
})(Ol || (Ol = {}));
var ql;
(function(e) {
  e.TUNING_TASK_UNSPECIFIED = "TUNING_TASK_UNSPECIFIED", e.TUNING_TASK_I2V = "TUNING_TASK_I2V", e.TUNING_TASK_T2V = "TUNING_TASK_T2V", e.TUNING_TASK_R2V = "TUNING_TASK_R2V";
})(ql || (ql = {}));
var Vl;
(function(e) {
  e.STATE_UNSPECIFIED = "STATE_UNSPECIFIED", e.STATE_PENDING = "STATE_PENDING", e.STATE_ACTIVE = "STATE_ACTIVE", e.STATE_FAILED = "STATE_FAILED";
})(Vl || (Vl = {}));
var Hl;
(function(e) {
  e.MEDIA_RESOLUTION_UNSPECIFIED = "MEDIA_RESOLUTION_UNSPECIFIED", e.MEDIA_RESOLUTION_LOW = "MEDIA_RESOLUTION_LOW", e.MEDIA_RESOLUTION_MEDIUM = "MEDIA_RESOLUTION_MEDIUM", e.MEDIA_RESOLUTION_HIGH = "MEDIA_RESOLUTION_HIGH", e.MEDIA_RESOLUTION_ULTRA_HIGH = "MEDIA_RESOLUTION_ULTRA_HIGH";
})(Hl || (Hl = {}));
var Jl;
(function(e) {
  e.TOOL_TYPE_UNSPECIFIED = "TOOL_TYPE_UNSPECIFIED", e.GOOGLE_SEARCH_WEB = "GOOGLE_SEARCH_WEB", e.GOOGLE_SEARCH_IMAGE = "GOOGLE_SEARCH_IMAGE", e.URL_CONTEXT = "URL_CONTEXT", e.GOOGLE_MAPS = "GOOGLE_MAPS", e.FILE_SEARCH = "FILE_SEARCH";
})(Jl || (Jl = {}));
var Hs;
(function(e) {
  e.COLLECTION = "COLLECTION";
})(Hs || (Hs = {}));
var Wl;
(function(e) {
  e.UNSPECIFIED = "unspecified", e.FLEX = "flex", e.STANDARD = "standard", e.PRIORITY = "priority";
})(Wl || (Wl = {}));
var Kl;
(function(e) {
  e.FEATURE_SELECTION_PREFERENCE_UNSPECIFIED = "FEATURE_SELECTION_PREFERENCE_UNSPECIFIED", e.PRIORITIZE_QUALITY = "PRIORITIZE_QUALITY", e.BALANCED = "BALANCED", e.PRIORITIZE_COST = "PRIORITIZE_COST";
})(Kl || (Kl = {}));
var yi;
(function(e) {
  e.PREDICT = "PREDICT", e.EMBED_CONTENT = "EMBED_CONTENT";
})(yi || (yi = {}));
var Yl;
(function(e) {
  e.BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE", e.BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE", e.BLOCK_ONLY_HIGH = "BLOCK_ONLY_HIGH", e.BLOCK_NONE = "BLOCK_NONE";
})(Yl || (Yl = {}));
var zl;
(function(e) {
  e.auto = "auto", e.en = "en", e.ja = "ja", e.ko = "ko", e.hi = "hi", e.zh = "zh", e.pt = "pt", e.es = "es";
})(zl || (zl = {}));
var Xl;
(function(e) {
  e.MASK_MODE_DEFAULT = "MASK_MODE_DEFAULT", e.MASK_MODE_USER_PROVIDED = "MASK_MODE_USER_PROVIDED", e.MASK_MODE_BACKGROUND = "MASK_MODE_BACKGROUND", e.MASK_MODE_FOREGROUND = "MASK_MODE_FOREGROUND", e.MASK_MODE_SEMANTIC = "MASK_MODE_SEMANTIC";
})(Xl || (Xl = {}));
var Ql;
(function(e) {
  e.CONTROL_TYPE_DEFAULT = "CONTROL_TYPE_DEFAULT", e.CONTROL_TYPE_CANNY = "CONTROL_TYPE_CANNY", e.CONTROL_TYPE_SCRIBBLE = "CONTROL_TYPE_SCRIBBLE", e.CONTROL_TYPE_FACE_MESH = "CONTROL_TYPE_FACE_MESH";
})(Ql || (Ql = {}));
var Zl;
(function(e) {
  e.SUBJECT_TYPE_DEFAULT = "SUBJECT_TYPE_DEFAULT", e.SUBJECT_TYPE_PERSON = "SUBJECT_TYPE_PERSON", e.SUBJECT_TYPE_ANIMAL = "SUBJECT_TYPE_ANIMAL", e.SUBJECT_TYPE_PRODUCT = "SUBJECT_TYPE_PRODUCT";
})(Zl || (Zl = {}));
var jl;
(function(e) {
  e.EDIT_MODE_DEFAULT = "EDIT_MODE_DEFAULT", e.EDIT_MODE_INPAINT_REMOVAL = "EDIT_MODE_INPAINT_REMOVAL", e.EDIT_MODE_INPAINT_INSERTION = "EDIT_MODE_INPAINT_INSERTION", e.EDIT_MODE_OUTPAINT = "EDIT_MODE_OUTPAINT", e.EDIT_MODE_CONTROLLED_EDITING = "EDIT_MODE_CONTROLLED_EDITING", e.EDIT_MODE_STYLE = "EDIT_MODE_STYLE", e.EDIT_MODE_BGSWAP = "EDIT_MODE_BGSWAP", e.EDIT_MODE_PRODUCT_IMAGE = "EDIT_MODE_PRODUCT_IMAGE";
})(jl || (jl = {}));
var eu;
(function(e) {
  e.FOREGROUND = "FOREGROUND", e.BACKGROUND = "BACKGROUND", e.PROMPT = "PROMPT", e.SEMANTIC = "SEMANTIC", e.INTERACTIVE = "INTERACTIVE";
})(eu || (eu = {}));
var tu;
(function(e) {
  e.ASSET = "ASSET", e.STYLE = "STYLE";
})(tu || (tu = {}));
var nu;
(function(e) {
  e.INSERT = "INSERT", e.REMOVE = "REMOVE", e.REMOVE_STATIC = "REMOVE_STATIC", e.OUTPAINT = "OUTPAINT";
})(nu || (nu = {}));
var ou;
(function(e) {
  e.OPTIMIZED = "OPTIMIZED", e.LOSSLESS = "LOSSLESS";
})(ou || (ou = {}));
var iu;
(function(e) {
  e.SUPERVISED_FINE_TUNING = "SUPERVISED_FINE_TUNING", e.PREFERENCE_TUNING = "PREFERENCE_TUNING", e.DISTILLATION = "DISTILLATION";
})(iu || (iu = {}));
var su;
(function(e) {
  e.STATE_UNSPECIFIED = "STATE_UNSPECIFIED", e.PROCESSING = "PROCESSING", e.ACTIVE = "ACTIVE", e.FAILED = "FAILED";
})(su || (su = {}));
var ru;
(function(e) {
  e.SOURCE_UNSPECIFIED = "SOURCE_UNSPECIFIED", e.UPLOADED = "UPLOADED", e.GENERATED = "GENERATED", e.REGISTERED = "REGISTERED";
})(ru || (ru = {}));
var au;
(function(e) {
  e.TURN_COMPLETE_REASON_UNSPECIFIED = "TURN_COMPLETE_REASON_UNSPECIFIED", e.MALFORMED_FUNCTION_CALL = "MALFORMED_FUNCTION_CALL", e.RESPONSE_REJECTED = "RESPONSE_REJECTED", e.NEED_MORE_INPUT = "NEED_MORE_INPUT", e.PROHIBITED_INPUT_CONTENT = "PROHIBITED_INPUT_CONTENT", e.IMAGE_PROHIBITED_INPUT_CONTENT = "IMAGE_PROHIBITED_INPUT_CONTENT", e.INPUT_TEXT_CONTAIN_PROMINENT_PERSON_PROHIBITED = "INPUT_TEXT_CONTAIN_PROMINENT_PERSON_PROHIBITED", e.INPUT_IMAGE_CELEBRITY = "INPUT_IMAGE_CELEBRITY", e.INPUT_IMAGE_PHOTO_REALISTIC_CHILD_PROHIBITED = "INPUT_IMAGE_PHOTO_REALISTIC_CHILD_PROHIBITED", e.INPUT_TEXT_NCII_PROHIBITED = "INPUT_TEXT_NCII_PROHIBITED", e.INPUT_OTHER = "INPUT_OTHER", e.INPUT_IP_PROHIBITED = "INPUT_IP_PROHIBITED", e.BLOCKLIST = "BLOCKLIST", e.UNSAFE_PROMPT_FOR_IMAGE_GENERATION = "UNSAFE_PROMPT_FOR_IMAGE_GENERATION", e.GENERATED_IMAGE_SAFETY = "GENERATED_IMAGE_SAFETY", e.GENERATED_CONTENT_SAFETY = "GENERATED_CONTENT_SAFETY", e.GENERATED_AUDIO_SAFETY = "GENERATED_AUDIO_SAFETY", e.GENERATED_VIDEO_SAFETY = "GENERATED_VIDEO_SAFETY", e.GENERATED_CONTENT_PROHIBITED = "GENERATED_CONTENT_PROHIBITED", e.GENERATED_CONTENT_BLOCKLIST = "GENERATED_CONTENT_BLOCKLIST", e.GENERATED_IMAGE_PROHIBITED = "GENERATED_IMAGE_PROHIBITED", e.GENERATED_IMAGE_CELEBRITY = "GENERATED_IMAGE_CELEBRITY", e.GENERATED_IMAGE_PROMINENT_PEOPLE_DETECTED_BY_REWRITER = "GENERATED_IMAGE_PROMINENT_PEOPLE_DETECTED_BY_REWRITER", e.GENERATED_IMAGE_IDENTIFIABLE_PEOPLE = "GENERATED_IMAGE_IDENTIFIABLE_PEOPLE", e.GENERATED_IMAGE_MINORS = "GENERATED_IMAGE_MINORS", e.OUTPUT_IMAGE_IP_PROHIBITED = "OUTPUT_IMAGE_IP_PROHIBITED", e.GENERATED_OTHER = "GENERATED_OTHER", e.MAX_REGENERATION_REACHED = "MAX_REGENERATION_REACHED";
})(au || (au = {}));
var lu;
(function(e) {
  e.MODALITY_UNSPECIFIED = "MODALITY_UNSPECIFIED", e.TEXT = "TEXT", e.IMAGE = "IMAGE", e.VIDEO = "VIDEO", e.AUDIO = "AUDIO", e.DOCUMENT = "DOCUMENT";
})(lu || (lu = {}));
var uu;
(function(e) {
  e.VAD_SIGNAL_TYPE_UNSPECIFIED = "VAD_SIGNAL_TYPE_UNSPECIFIED", e.VAD_SIGNAL_TYPE_SOS = "VAD_SIGNAL_TYPE_SOS", e.VAD_SIGNAL_TYPE_EOS = "VAD_SIGNAL_TYPE_EOS";
})(uu || (uu = {}));
var cu;
(function(e) {
  e.TYPE_UNSPECIFIED = "TYPE_UNSPECIFIED", e.ACTIVITY_START = "ACTIVITY_START", e.ACTIVITY_END = "ACTIVITY_END";
})(cu || (cu = {}));
var du;
(function(e) {
  e.START_SENSITIVITY_UNSPECIFIED = "START_SENSITIVITY_UNSPECIFIED", e.START_SENSITIVITY_HIGH = "START_SENSITIVITY_HIGH", e.START_SENSITIVITY_LOW = "START_SENSITIVITY_LOW";
})(du || (du = {}));
var fu;
(function(e) {
  e.END_SENSITIVITY_UNSPECIFIED = "END_SENSITIVITY_UNSPECIFIED", e.END_SENSITIVITY_HIGH = "END_SENSITIVITY_HIGH", e.END_SENSITIVITY_LOW = "END_SENSITIVITY_LOW";
})(fu || (fu = {}));
var pu;
(function(e) {
  e.ACTIVITY_HANDLING_UNSPECIFIED = "ACTIVITY_HANDLING_UNSPECIFIED", e.START_OF_ACTIVITY_INTERRUPTS = "START_OF_ACTIVITY_INTERRUPTS", e.NO_INTERRUPTION = "NO_INTERRUPTION";
})(pu || (pu = {}));
var hu;
(function(e) {
  e.TURN_COVERAGE_UNSPECIFIED = "TURN_COVERAGE_UNSPECIFIED", e.TURN_INCLUDES_ONLY_ACTIVITY = "TURN_INCLUDES_ONLY_ACTIVITY", e.TURN_INCLUDES_ALL_INPUT = "TURN_INCLUDES_ALL_INPUT", e.TURN_INCLUDES_AUDIO_ACTIVITY_AND_ALL_VIDEO = "TURN_INCLUDES_AUDIO_ACTIVITY_AND_ALL_VIDEO";
})(hu || (hu = {}));
var mu;
(function(e) {
  e.SCALE_UNSPECIFIED = "SCALE_UNSPECIFIED", e.C_MAJOR_A_MINOR = "C_MAJOR_A_MINOR", e.D_FLAT_MAJOR_B_FLAT_MINOR = "D_FLAT_MAJOR_B_FLAT_MINOR", e.D_MAJOR_B_MINOR = "D_MAJOR_B_MINOR", e.E_FLAT_MAJOR_C_MINOR = "E_FLAT_MAJOR_C_MINOR", e.E_MAJOR_D_FLAT_MINOR = "E_MAJOR_D_FLAT_MINOR", e.F_MAJOR_D_MINOR = "F_MAJOR_D_MINOR", e.G_FLAT_MAJOR_E_FLAT_MINOR = "G_FLAT_MAJOR_E_FLAT_MINOR", e.G_MAJOR_E_MINOR = "G_MAJOR_E_MINOR", e.A_FLAT_MAJOR_F_MINOR = "A_FLAT_MAJOR_F_MINOR", e.A_MAJOR_G_FLAT_MINOR = "A_MAJOR_G_FLAT_MINOR", e.B_FLAT_MAJOR_G_MINOR = "B_FLAT_MAJOR_G_MINOR", e.B_MAJOR_A_FLAT_MINOR = "B_MAJOR_A_FLAT_MINOR";
})(mu || (mu = {}));
var gu;
(function(e) {
  e.MUSIC_GENERATION_MODE_UNSPECIFIED = "MUSIC_GENERATION_MODE_UNSPECIFIED", e.QUALITY = "QUALITY", e.DIVERSITY = "DIVERSITY", e.VOCALIZATION = "VOCALIZATION";
})(gu || (gu = {}));
var tn;
(function(e) {
  e.PLAYBACK_CONTROL_UNSPECIFIED = "PLAYBACK_CONTROL_UNSPECIFIED", e.PLAY = "PLAY", e.PAUSE = "PAUSE", e.STOP = "STOP", e.RESET_CONTEXT = "RESET_CONTEXT";
})(tn || (tn = {}));
var Js = class {
  constructor(e) {
    const t = {};
    for (const n of e.headers.entries()) t[n[0]] = n[1];
    this.headers = t, this.responseInternal = e;
  }
  json() {
    return this.responseInternal.json();
  }
}, Un = class {
  get text() {
    var e, t, n, o, i, s, a, u;
    if (((o = (n = (t = (e = this.candidates) === null || e === void 0 ? void 0 : e[0]) === null || t === void 0 ? void 0 : t.content) === null || n === void 0 ? void 0 : n.parts) === null || o === void 0 ? void 0 : o.length) === 0) return;
    this.candidates && this.candidates.length > 1 && console.warn("there are multiple candidates in the response, returning text from the first one.");
    let c = "", d = !1;
    const p = [];
    for (const f of (u = (a = (s = (i = this.candidates) === null || i === void 0 ? void 0 : i[0]) === null || s === void 0 ? void 0 : s.content) === null || a === void 0 ? void 0 : a.parts) !== null && u !== void 0 ? u : []) {
      for (const [h, m] of Object.entries(f)) h !== "text" && h !== "thought" && h !== "thoughtSignature" && (m !== null || m !== void 0) && p.push(h);
      if (typeof f.text == "string") {
        if (typeof f.thought == "boolean" && f.thought) continue;
        d = !0, c += f.text;
      }
    }
    return p.length > 0 && console.warn(`there are non-text parts ${p} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`), d ? c : void 0;
  }
  get data() {
    var e, t, n, o, i, s, a, u;
    if (((o = (n = (t = (e = this.candidates) === null || e === void 0 ? void 0 : e[0]) === null || t === void 0 ? void 0 : t.content) === null || n === void 0 ? void 0 : n.parts) === null || o === void 0 ? void 0 : o.length) === 0) return;
    this.candidates && this.candidates.length > 1 && console.warn("there are multiple candidates in the response, returning data from the first one.");
    let c = "";
    const d = [];
    for (const p of (u = (a = (s = (i = this.candidates) === null || i === void 0 ? void 0 : i[0]) === null || s === void 0 ? void 0 : s.content) === null || a === void 0 ? void 0 : a.parts) !== null && u !== void 0 ? u : []) {
      for (const [f, h] of Object.entries(p)) f !== "inlineData" && (h !== null || h !== void 0) && d.push(f);
      p.inlineData && typeof p.inlineData.data == "string" && (c += atob(p.inlineData.data));
    }
    return d.length > 0 && console.warn(`there are non-data parts ${d} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`), c.length > 0 ? btoa(c) : void 0;
  }
  get functionCalls() {
    var e, t, n, o, i, s, a, u;
    if (((o = (n = (t = (e = this.candidates) === null || e === void 0 ? void 0 : e[0]) === null || t === void 0 ? void 0 : t.content) === null || n === void 0 ? void 0 : n.parts) === null || o === void 0 ? void 0 : o.length) === 0) return;
    this.candidates && this.candidates.length > 1 && console.warn("there are multiple candidates in the response, returning function calls from the first one.");
    const c = (u = (a = (s = (i = this.candidates) === null || i === void 0 ? void 0 : i[0]) === null || s === void 0 ? void 0 : s.content) === null || a === void 0 ? void 0 : a.parts) === null || u === void 0 ? void 0 : u.filter((d) => d.functionCall).map((d) => d.functionCall).filter((d) => d !== void 0);
    if (c?.length !== 0)
      return c;
  }
  get executableCode() {
    var e, t, n, o, i, s, a, u, c;
    if (((o = (n = (t = (e = this.candidates) === null || e === void 0 ? void 0 : e[0]) === null || t === void 0 ? void 0 : t.content) === null || n === void 0 ? void 0 : n.parts) === null || o === void 0 ? void 0 : o.length) === 0) return;
    this.candidates && this.candidates.length > 1 && console.warn("there are multiple candidates in the response, returning executable code from the first one.");
    const d = (u = (a = (s = (i = this.candidates) === null || i === void 0 ? void 0 : i[0]) === null || s === void 0 ? void 0 : s.content) === null || a === void 0 ? void 0 : a.parts) === null || u === void 0 ? void 0 : u.filter((p) => p.executableCode).map((p) => p.executableCode).filter((p) => p !== void 0);
    if (d?.length !== 0)
      return (c = d?.[0]) === null || c === void 0 ? void 0 : c.code;
  }
  get codeExecutionResult() {
    var e, t, n, o, i, s, a, u, c;
    if (((o = (n = (t = (e = this.candidates) === null || e === void 0 ? void 0 : e[0]) === null || t === void 0 ? void 0 : t.content) === null || n === void 0 ? void 0 : n.parts) === null || o === void 0 ? void 0 : o.length) === 0) return;
    this.candidates && this.candidates.length > 1 && console.warn("there are multiple candidates in the response, returning code execution result from the first one.");
    const d = (u = (a = (s = (i = this.candidates) === null || i === void 0 ? void 0 : i[0]) === null || s === void 0 ? void 0 : s.content) === null || a === void 0 ? void 0 : a.parts) === null || u === void 0 ? void 0 : u.filter((p) => p.codeExecutionResult).map((p) => p.codeExecutionResult).filter((p) => p !== void 0);
    if (d?.length !== 0)
      return (c = d?.[0]) === null || c === void 0 ? void 0 : c.output;
  }
}, yu = class {
}, _u = class {
}, qg = class {
}, Vg = class {
}, Hg = class {
}, Jg = class {
}, vu = class {
}, Tu = class {
}, Su = class {
}, Wg = class {
}, Eu = class ef {
  _fromAPIResponse({ apiResponse: t, _isVertexAI: n }) {
    const o = new ef();
    let i;
    const s = t;
    return n ? i = xg(s) : i = Pg(s), Object.assign(o, i), o;
  }
}, wu = class {
}, Au = class {
}, Cu = class {
}, Iu = class {
}, Kg = class {
}, Yg = class {
}, zg = class {
}, Xg = class tf {
  _fromAPIResponse({ apiResponse: t, _isVertexAI: n }) {
    const o = new tf(), i = $g(t);
    return Object.assign(o, i), o;
  }
}, Qg = class {
}, Zg = class {
}, jg = class {
}, ey = class {
}, bu = class {
}, ty = class {
  get text() {
    var e, t, n;
    let o = "", i = !1;
    const s = [];
    for (const a of (n = (t = (e = this.serverContent) === null || e === void 0 ? void 0 : e.modelTurn) === null || t === void 0 ? void 0 : t.parts) !== null && n !== void 0 ? n : []) {
      for (const [u, c] of Object.entries(a)) u !== "text" && u !== "thought" && c !== null && s.push(u);
      if (typeof a.text == "string") {
        if (typeof a.thought == "boolean" && a.thought) continue;
        i = !0, o += a.text;
      }
    }
    return s.length > 0 && console.warn(`there are non-text parts ${s} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`), i ? o : void 0;
  }
  get data() {
    var e, t, n;
    let o = "";
    const i = [];
    for (const s of (n = (t = (e = this.serverContent) === null || e === void 0 ? void 0 : e.modelTurn) === null || t === void 0 ? void 0 : t.parts) !== null && n !== void 0 ? n : []) {
      for (const [a, u] of Object.entries(s)) a !== "inlineData" && u !== null && i.push(a);
      s.inlineData && typeof s.inlineData.data == "string" && (o += atob(s.inlineData.data));
    }
    return i.length > 0 && console.warn(`there are non-data parts ${i} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`), o.length > 0 ? btoa(o) : void 0;
  }
}, ny = class {
  get audioChunk() {
    if (this.serverContent && this.serverContent.audioChunks && this.serverContent.audioChunks.length > 0) return this.serverContent.audioChunks[0];
  }
}, oy = class nf {
  _fromAPIResponse({ apiResponse: t, _isVertexAI: n }) {
    const o = new nf(), i = jd(t);
    return Object.assign(o, i), o;
  }
};
function z(e, t) {
  if (!t || typeof t != "string") throw new Error("model is required and must be a string");
  if (t.includes("..") || t.includes("?") || t.includes("&")) throw new Error("invalid model parameter");
  if (e.isVertexAI()) {
    if (t.startsWith("publishers/") || t.startsWith("projects/") || t.startsWith("models/")) return t;
    if (t.indexOf("/") >= 0) {
      const n = t.split("/", 2);
      return `publishers/${n[0]}/models/${n[1]}`;
    } else return `publishers/google/models/${t}`;
  } else return t.startsWith("models/") || t.startsWith("tunedModels/") ? t : `models/${t}`;
}
function of(e, t) {
  const n = z(e, t);
  return n ? n.startsWith("publishers/") && e.isVertexAI() ? `projects/${e.getProject()}/locations/${e.getLocation()}/${n}` : n.startsWith("models/") && e.isVertexAI() ? `projects/${e.getProject()}/locations/${e.getLocation()}/publishers/google/${n}` : n : "";
}
function sf(e) {
  return Array.isArray(e) ? e.map((t) => _i(t)) : [_i(e)];
}
function _i(e) {
  if (typeof e == "object" && e !== null) return e;
  throw new Error(`Could not parse input as Blob. Unsupported blob type: ${typeof e}`);
}
function rf(e) {
  const t = _i(e);
  if (t.mimeType && t.mimeType.startsWith("image/")) return t;
  throw new Error(`Unsupported mime type: ${t.mimeType}`);
}
function af(e) {
  const t = _i(e);
  if (t.mimeType && t.mimeType.startsWith("audio/")) return t;
  throw new Error(`Unsupported mime type: ${t.mimeType}`);
}
function Ru(e) {
  if (e == null) throw new Error("PartUnion is required");
  if (typeof e == "object") return e;
  if (typeof e == "string") return { text: e };
  throw new Error(`Unsupported part type: ${typeof e}`);
}
function lf(e) {
  if (e == null || Array.isArray(e) && e.length === 0) throw new Error("PartListUnion is required");
  return Array.isArray(e) ? e.map((t) => Ru(t)) : [Ru(e)];
}
function Ws(e) {
  return e != null && typeof e == "object" && "parts" in e && Array.isArray(e.parts);
}
function Pu(e) {
  return e != null && typeof e == "object" && "functionCall" in e;
}
function xu(e) {
  return e != null && typeof e == "object" && "functionResponse" in e;
}
function de(e) {
  if (e == null) throw new Error("ContentUnion is required");
  return Ws(e) ? e : {
    role: "user",
    parts: lf(e)
  };
}
function Br(e, t) {
  if (!t) return [];
  if (e.isVertexAI() && Array.isArray(t)) return t.flatMap((n) => {
    const o = de(n);
    return o.parts && o.parts.length > 0 && o.parts[0].text !== void 0 ? [o.parts[0].text] : [];
  });
  if (e.isVertexAI()) {
    const n = de(t);
    return n.parts && n.parts.length > 0 && n.parts[0].text !== void 0 ? [n.parts[0].text] : [];
  }
  return Array.isArray(t) ? t.map((n) => de(n)) : [de(t)];
}
function Ae(e) {
  if (e == null || Array.isArray(e) && e.length === 0) throw new Error("contents are required");
  if (!Array.isArray(e)) {
    if (Pu(e) || xu(e)) throw new Error("To specify functionCall or functionResponse parts, please wrap them in a Content object, specifying the role for them");
    return [de(e)];
  }
  const t = [], n = [], o = Ws(e[0]);
  for (const i of e) {
    const s = Ws(i);
    if (s != o) throw new Error("Mixing Content and Parts is not supported, please group the parts into a the appropriate Content objects and specify the roles for them");
    if (s) t.push(i);
    else {
      if (Pu(i) || xu(i)) throw new Error("To specify functionCall or functionResponse parts, please wrap them, and any other parts, in Content objects as appropriate, specifying the role for them");
      n.push(i);
    }
  }
  return o || t.push({
    role: "user",
    parts: lf(n)
  }), t;
}
function iy(e, t) {
  e.includes("null") && (t.nullable = !0);
  const n = e.filter((o) => o !== "null");
  if (n.length === 1) t.type = Object.values(Tt).includes(n[0].toUpperCase()) ? n[0].toUpperCase() : Tt.TYPE_UNSPECIFIED;
  else {
    t.anyOf = [];
    for (const o of n) t.anyOf.push({ type: Object.values(Tt).includes(o.toUpperCase()) ? o.toUpperCase() : Tt.TYPE_UNSPECIFIED });
  }
}
function sn(e) {
  const t = {}, n = ["items"], o = ["anyOf"], i = ["properties"];
  if (e.type && e.anyOf) throw new Error("type and anyOf cannot be both populated.");
  const s = e.anyOf;
  s != null && s.length == 2 && (s[0].type === "null" ? (t.nullable = !0, e = s[1]) : s[1].type === "null" && (t.nullable = !0, e = s[0])), e.type instanceof Array && iy(e.type, t);
  for (const [a, u] of Object.entries(e))
    if (u != null)
      if (a == "type") {
        if (u === "null") throw new Error("type: null can not be the only possible type for the field.");
        if (u instanceof Array) continue;
        t.type = Object.values(Tt).includes(u.toUpperCase()) ? u.toUpperCase() : Tt.TYPE_UNSPECIFIED;
      } else if (n.includes(a)) t[a] = sn(u);
      else if (o.includes(a)) {
        const c = [];
        for (const d of u) {
          if (d.type == "null") {
            t.nullable = !0;
            continue;
          }
          c.push(sn(d));
        }
        t[a] = c;
      } else if (i.includes(a)) {
        const c = {};
        for (const [d, p] of Object.entries(u)) c[d] = sn(p);
        t[a] = c;
      } else {
        if (a === "additionalProperties") continue;
        t[a] = u;
      }
  return t;
}
function Gr(e) {
  return sn(e);
}
function Or(e) {
  if (typeof e == "object") return e;
  if (typeof e == "string") return { voiceConfig: { prebuiltVoiceConfig: { voiceName: e } } };
  throw new Error(`Unsupported speechConfig type: ${typeof e}`);
}
function qr(e) {
  if ("multiSpeakerVoiceConfig" in e) throw new Error("multiSpeakerVoiceConfig is not supported in the live API.");
  return e;
}
function dn(e) {
  if (e.functionDeclarations) for (const t of e.functionDeclarations)
    t.parameters && (Object.keys(t.parameters).includes("$schema") ? t.parametersJsonSchema || (t.parametersJsonSchema = t.parameters, delete t.parameters) : t.parameters = sn(t.parameters)), t.response && (Object.keys(t.response).includes("$schema") ? t.responseJsonSchema || (t.responseJsonSchema = t.response, delete t.response) : t.response = sn(t.response));
  return e;
}
function fn(e) {
  if (e == null) throw new Error("tools is required");
  if (!Array.isArray(e)) throw new Error("tools is required and must be an array of Tools");
  const t = [];
  for (const n of e) t.push(n);
  return t;
}
function sy(e, t, n, o = 1) {
  const i = !t.startsWith(`${n}/`) && t.split("/").length === o;
  return e.isVertexAI() ? t.startsWith("projects/") ? t : t.startsWith("locations/") ? `projects/${e.getProject()}/${t}` : t.startsWith(`${n}/`) ? `projects/${e.getProject()}/locations/${e.getLocation()}/${t}` : i ? `projects/${e.getProject()}/locations/${e.getLocation()}/${n}/${t}` : t : i ? `${n}/${t}` : t;
}
function dt(e, t) {
  if (typeof t != "string") throw new Error("name must be a string");
  return sy(e, t, "cachedContents");
}
function uf(e) {
  switch (e) {
    case "STATE_UNSPECIFIED":
      return "JOB_STATE_UNSPECIFIED";
    case "CREATING":
      return "JOB_STATE_RUNNING";
    case "ACTIVE":
      return "JOB_STATE_SUCCEEDED";
    case "FAILED":
      return "JOB_STATE_FAILED";
    default:
      return e;
  }
}
function Et(e) {
  return Fr(e);
}
function ry(e) {
  return e != null && typeof e == "object" && "name" in e;
}
function ay(e) {
  return e != null && typeof e == "object" && "video" in e;
}
function ly(e) {
  return e != null && typeof e == "object" && "uri" in e;
}
function cf(e) {
  var t;
  let n;
  if (ry(e) && (n = e.name), !(ly(e) && (n = e.uri, n === void 0)) && !(ay(e) && (n = (t = e.video) === null || t === void 0 ? void 0 : t.uri, n === void 0))) {
    if (typeof e == "string" && (n = e), n === void 0) throw new Error("Could not extract file name from the provided input.");
    if (n.startsWith("https://")) {
      const o = n.split("files/")[1].match(/[a-z0-9]+/);
      if (o === null) throw new Error(`Could not extract file name from URI ${n}`);
      n = o[0];
    } else n.startsWith("files/") && (n = n.split("files/")[1]);
    return n;
  }
}
function df(e, t) {
  let n;
  return e.isVertexAI() ? n = t ? "publishers/google/models" : "models" : n = t ? "models" : "tunedModels", n;
}
function ff(e) {
  for (const t of [
    "models",
    "tunedModels",
    "publisherModels"
  ]) if (uy(e, t)) return e[t];
  return [];
}
function uy(e, t) {
  return e !== null && typeof e == "object" && t in e;
}
function cy(e, t = {}) {
  const n = e, o = {
    name: n.name,
    description: n.description,
    parametersJsonSchema: n.inputSchema
  };
  return n.outputSchema && (o.responseJsonSchema = n.outputSchema), t.behavior && (o.behavior = t.behavior), { functionDeclarations: [o] };
}
function dy(e, t = {}) {
  const n = [], o = /* @__PURE__ */ new Set();
  for (const i of e) {
    const s = i.name;
    if (o.has(s)) throw new Error(`Duplicate function name ${s} found in MCP tools. Please ensure function names are unique.`);
    o.add(s);
    const a = cy(i, t);
    a.functionDeclarations && n.push(...a.functionDeclarations);
  }
  return { functionDeclarations: n };
}
function pf(e, t) {
  let n;
  if (typeof t == "string") if (e.isVertexAI()) if (t.startsWith("gs://")) n = {
    format: "jsonl",
    gcsUri: [t]
  };
  else if (t.startsWith("bq://")) n = {
    format: "bigquery",
    bigqueryUri: t
  };
  else throw new Error(`Unsupported string source for Vertex AI: ${t}`);
  else if (t.startsWith("files/")) n = { fileName: t };
  else throw new Error(`Unsupported string source for Gemini API: ${t}`);
  else if (Array.isArray(t)) {
    if (e.isVertexAI()) throw new Error("InlinedRequest[] is not supported in Vertex AI.");
    n = { inlinedRequests: t };
  } else n = t;
  const o = [n.gcsUri, n.bigqueryUri].filter(Boolean).length, i = [n.inlinedRequests, n.fileName].filter(Boolean).length;
  if (e.isVertexAI()) {
    if (i > 0 || o !== 1) throw new Error("Exactly one of `gcsUri` or `bigqueryUri` must be set for Vertex AI.");
  } else if (o > 0 || i !== 1) throw new Error("Exactly one of `inlinedRequests`, `fileName`, must be set for Gemini API.");
  return n;
}
function fy(e) {
  if (typeof e != "string") return e;
  const t = e;
  if (t.startsWith("gs://")) return {
    format: "jsonl",
    gcsUri: t
  };
  if (t.startsWith("bq://")) return {
    format: "bigquery",
    bigqueryUri: t
  };
  throw new Error(`Unsupported destination: ${t}`);
}
function hf(e) {
  if (typeof e != "object" || e === null) return {};
  const t = e, n = t.inlinedResponses;
  if (typeof n != "object" || n === null) return e;
  const o = n.inlinedResponses;
  if (!Array.isArray(o) || o.length === 0) return e;
  let i = !1;
  for (const s of o) {
    if (typeof s != "object" || s === null) continue;
    const a = s.response;
    if (!(typeof a != "object" || a === null) && a.embedding !== void 0) {
      i = !0;
      break;
    }
  }
  return i && (t.inlinedEmbedContentResponses = t.inlinedResponses, delete t.inlinedResponses), e;
}
function pn(e, t) {
  const n = t;
  if (!e.isVertexAI()) {
    if (/batches\/[^/]+$/.test(n)) return n.split("/").pop();
    throw new Error(`Invalid batch job name: ${n}.`);
  }
  if (/^projects\/[^/]+\/locations\/[^/]+\/batchPredictionJobs\/[^/]+$/.test(n)) return n.split("/").pop();
  if (/^\d+$/.test(n)) return n;
  throw new Error(`Invalid batch job name: ${n}.`);
}
function mf(e) {
  const t = e;
  return t === "BATCH_STATE_UNSPECIFIED" ? "JOB_STATE_UNSPECIFIED" : t === "BATCH_STATE_PENDING" ? "JOB_STATE_PENDING" : t === "BATCH_STATE_RUNNING" ? "JOB_STATE_RUNNING" : t === "BATCH_STATE_SUCCEEDED" ? "JOB_STATE_SUCCEEDED" : t === "BATCH_STATE_FAILED" ? "JOB_STATE_FAILED" : t === "BATCH_STATE_CANCELLED" ? "JOB_STATE_CANCELLED" : t === "BATCH_STATE_EXPIRED" ? "JOB_STATE_EXPIRED" : t;
}
function py(e) {
  return e.includes("gemini") && e !== "gemini-embedding-001" || e.includes("maas");
}
function hy(e) {
  const t = {}, n = r(e, ["apiKey"]);
  if (n != null && l(t, ["apiKey"], n), r(e, ["apiKeyConfig"]) !== void 0) throw new Error("apiKeyConfig parameter is not supported in Gemini API.");
  if (r(e, ["authType"]) !== void 0) throw new Error("authType parameter is not supported in Gemini API.");
  if (r(e, ["googleServiceAccountConfig"]) !== void 0) throw new Error("googleServiceAccountConfig parameter is not supported in Gemini API.");
  if (r(e, ["httpBasicAuthConfig"]) !== void 0) throw new Error("httpBasicAuthConfig parameter is not supported in Gemini API.");
  if (r(e, ["oauthConfig"]) !== void 0) throw new Error("oauthConfig parameter is not supported in Gemini API.");
  if (r(e, ["oidcConfig"]) !== void 0) throw new Error("oidcConfig parameter is not supported in Gemini API.");
  return t;
}
function my(e) {
  const t = {}, n = r(e, ["responsesFile"]);
  n != null && l(t, ["fileName"], n);
  const o = r(e, ["inlinedResponses", "inlinedResponses"]);
  if (o != null) {
    let s = o;
    Array.isArray(s) && (s = s.map((a) => zy(a))), l(t, ["inlinedResponses"], s);
  }
  const i = r(e, ["inlinedEmbedContentResponses", "inlinedResponses"]);
  if (i != null) {
    let s = i;
    Array.isArray(s) && (s = s.map((a) => a)), l(t, ["inlinedEmbedContentResponses"], s);
  }
  return t;
}
function gy(e) {
  const t = {}, n = r(e, ["predictionsFormat"]);
  n != null && l(t, ["format"], n);
  const o = r(e, ["gcsDestination", "outputUriPrefix"]);
  o != null && l(t, ["gcsUri"], o);
  const i = r(e, ["bigqueryDestination", "outputUri"]);
  return i != null && l(t, ["bigqueryUri"], i), t;
}
function yy(e) {
  const t = {}, n = r(e, ["format"]);
  n != null && l(t, ["predictionsFormat"], n);
  const o = r(e, ["gcsUri"]);
  o != null && l(t, ["gcsDestination", "outputUriPrefix"], o);
  const i = r(e, ["bigqueryUri"]);
  if (i != null && l(t, ["bigqueryDestination", "outputUri"], i), r(e, ["fileName"]) !== void 0) throw new Error("fileName parameter is not supported in Vertex AI.");
  if (r(e, ["inlinedResponses"]) !== void 0) throw new Error("inlinedResponses parameter is not supported in Vertex AI.");
  if (r(e, ["inlinedEmbedContentResponses"]) !== void 0) throw new Error("inlinedEmbedContentResponses parameter is not supported in Vertex AI.");
  return t;
}
function ni(e) {
  const t = {}, n = r(e, ["name"]);
  n != null && l(t, ["name"], n);
  const o = r(e, ["metadata", "displayName"]);
  o != null && l(t, ["displayName"], o);
  const i = r(e, ["metadata", "state"]);
  i != null && l(t, ["state"], mf(i));
  const s = r(e, ["metadata", "createTime"]);
  s != null && l(t, ["createTime"], s);
  const a = r(e, ["metadata", "endTime"]);
  a != null && l(t, ["endTime"], a);
  const u = r(e, ["metadata", "updateTime"]);
  u != null && l(t, ["updateTime"], u);
  const c = r(e, ["metadata", "model"]);
  c != null && l(t, ["model"], c);
  const d = r(e, ["metadata", "output"]);
  return d != null && l(t, ["dest"], my(hf(d))), t;
}
function Ks(e) {
  const t = {}, n = r(e, ["name"]);
  n != null && l(t, ["name"], n);
  const o = r(e, ["displayName"]);
  o != null && l(t, ["displayName"], o);
  const i = r(e, ["state"]);
  i != null && l(t, ["state"], mf(i));
  const s = r(e, ["error"]);
  s != null && l(t, ["error"], s);
  const a = r(e, ["createTime"]);
  a != null && l(t, ["createTime"], a);
  const u = r(e, ["startTime"]);
  u != null && l(t, ["startTime"], u);
  const c = r(e, ["endTime"]);
  c != null && l(t, ["endTime"], c);
  const d = r(e, ["updateTime"]);
  d != null && l(t, ["updateTime"], d);
  const p = r(e, ["model"]);
  p != null && l(t, ["model"], p);
  const f = r(e, ["inputConfig"]);
  f != null && l(t, ["src"], _y(f));
  const h = r(e, ["outputConfig"]);
  h != null && l(t, ["dest"], gy(hf(h)));
  const m = r(e, ["completionStats"]);
  return m != null && l(t, ["completionStats"], m), t;
}
function _y(e) {
  const t = {}, n = r(e, ["instancesFormat"]);
  n != null && l(t, ["format"], n);
  const o = r(e, ["gcsSource", "uris"]);
  o != null && l(t, ["gcsUri"], o);
  const i = r(e, ["bigquerySource", "inputUri"]);
  return i != null && l(t, ["bigqueryUri"], i), t;
}
function vy(e, t) {
  const n = {};
  if (r(t, ["format"]) !== void 0) throw new Error("format parameter is not supported in Gemini API.");
  if (r(t, ["gcsUri"]) !== void 0) throw new Error("gcsUri parameter is not supported in Gemini API.");
  if (r(t, ["bigqueryUri"]) !== void 0) throw new Error("bigqueryUri parameter is not supported in Gemini API.");
  const o = r(t, ["fileName"]);
  o != null && l(n, ["fileName"], o);
  const i = r(t, ["inlinedRequests"]);
  if (i != null) {
    let s = i;
    Array.isArray(s) && (s = s.map((a) => Yy(e, a))), l(n, ["requests", "requests"], s);
  }
  return n;
}
function Ty(e) {
  const t = {}, n = r(e, ["format"]);
  n != null && l(t, ["instancesFormat"], n);
  const o = r(e, ["gcsUri"]);
  o != null && l(t, ["gcsSource", "uris"], o);
  const i = r(e, ["bigqueryUri"]);
  if (i != null && l(t, ["bigquerySource", "inputUri"], i), r(e, ["fileName"]) !== void 0) throw new Error("fileName parameter is not supported in Vertex AI.");
  if (r(e, ["inlinedRequests"]) !== void 0) throw new Error("inlinedRequests parameter is not supported in Vertex AI.");
  return t;
}
function Sy(e) {
  const t = {}, n = r(e, ["data"]);
  if (n != null && l(t, ["data"], n), r(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const o = r(e, ["mimeType"]);
  return o != null && l(t, ["mimeType"], o), t;
}
function Ey(e, t) {
  const n = {}, o = r(t, ["name"]);
  return o != null && l(n, ["_url", "name"], pn(e, o)), n;
}
function wy(e, t) {
  const n = {}, o = r(t, ["name"]);
  return o != null && l(n, ["_url", "name"], pn(e, o)), n;
}
function Ay(e) {
  const t = {}, n = r(e, ["content"]);
  n != null && l(t, ["content"], n);
  const o = r(e, ["citationMetadata"]);
  o != null && l(t, ["citationMetadata"], Cy(o));
  const i = r(e, ["tokenCount"]);
  i != null && l(t, ["tokenCount"], i);
  const s = r(e, ["finishReason"]);
  s != null && l(t, ["finishReason"], s);
  const a = r(e, ["groundingMetadata"]);
  a != null && l(t, ["groundingMetadata"], a);
  const u = r(e, ["avgLogprobs"]);
  u != null && l(t, ["avgLogprobs"], u);
  const c = r(e, ["index"]);
  c != null && l(t, ["index"], c);
  const d = r(e, ["logprobsResult"]);
  d != null && l(t, ["logprobsResult"], d);
  const p = r(e, ["safetyRatings"]);
  if (p != null) {
    let h = p;
    Array.isArray(h) && (h = h.map((m) => m)), l(t, ["safetyRatings"], h);
  }
  const f = r(e, ["urlContextMetadata"]);
  return f != null && l(t, ["urlContextMetadata"], f), t;
}
function Cy(e) {
  const t = {}, n = r(e, ["citationSources"]);
  if (n != null) {
    let o = n;
    Array.isArray(o) && (o = o.map((i) => i)), l(t, ["citations"], o);
  }
  return t;
}
function gf(e) {
  const t = {}, n = r(e, ["parts"]);
  if (n != null) {
    let i = n;
    Array.isArray(i) && (i = i.map((s) => n_(s))), l(t, ["parts"], i);
  }
  const o = r(e, ["role"]);
  return o != null && l(t, ["role"], o), t;
}
function Iy(e, t) {
  const n = {}, o = r(e, ["displayName"]);
  if (t !== void 0 && o != null && l(t, ["batch", "displayName"], o), r(e, ["dest"]) !== void 0) throw new Error("dest parameter is not supported in Gemini API.");
  const i = r(e, ["webhookConfig"]);
  return t !== void 0 && i != null && l(t, ["batch", "webhookConfig"], i), n;
}
function by(e, t) {
  const n = {}, o = r(e, ["displayName"]);
  t !== void 0 && o != null && l(t, ["displayName"], o);
  const i = r(e, ["dest"]);
  if (t !== void 0 && i != null && l(t, ["outputConfig"], yy(fy(i))), r(e, ["webhookConfig"]) !== void 0) throw new Error("webhookConfig parameter is not supported in Vertex AI.");
  return n;
}
function Mu(e, t) {
  const n = {}, o = r(t, ["model"]);
  o != null && l(n, ["_url", "model"], z(e, o));
  const i = r(t, ["src"]);
  i != null && l(n, ["batch", "inputConfig"], vy(e, pf(e, i)));
  const s = r(t, ["config"]);
  return s != null && Iy(s, n), n;
}
function Ry(e, t) {
  const n = {}, o = r(t, ["model"]);
  o != null && l(n, ["model"], z(e, o));
  const i = r(t, ["src"]);
  i != null && l(n, ["inputConfig"], Ty(pf(e, i)));
  const s = r(t, ["config"]);
  return s != null && by(s, n), n;
}
function Py(e, t) {
  const n = {}, o = r(e, ["displayName"]);
  return t !== void 0 && o != null && l(t, ["batch", "displayName"], o), n;
}
function xy(e, t) {
  const n = {}, o = r(t, ["model"]);
  o != null && l(n, ["_url", "model"], z(e, o));
  const i = r(t, ["src"]);
  i != null && l(n, ["batch", "inputConfig"], $y(e, i));
  const s = r(t, ["config"]);
  return s != null && Py(s, n), n;
}
function My(e, t) {
  const n = {}, o = r(t, ["name"]);
  return o != null && l(n, ["_url", "name"], pn(e, o)), n;
}
function Ny(e, t) {
  const n = {}, o = r(t, ["name"]);
  return o != null && l(n, ["_url", "name"], pn(e, o)), n;
}
function ky(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  n != null && l(t, ["sdkHttpResponse"], n);
  const o = r(e, ["name"]);
  o != null && l(t, ["name"], o);
  const i = r(e, ["done"]);
  i != null && l(t, ["done"], i);
  const s = r(e, ["error"]);
  return s != null && l(t, ["error"], s), t;
}
function Dy(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  n != null && l(t, ["sdkHttpResponse"], n);
  const o = r(e, ["name"]);
  o != null && l(t, ["name"], o);
  const i = r(e, ["done"]);
  i != null && l(t, ["done"], i);
  const s = r(e, ["error"]);
  return s != null && l(t, ["error"], s), t;
}
function Uy(e, t) {
  const n = {}, o = r(t, ["contents"]);
  if (o != null) {
    let s = Br(e, o);
    Array.isArray(s) && (s = s.map((a) => a)), l(n, [
      "requests[]",
      "request",
      "content"
    ], s);
  }
  const i = r(t, ["config"]);
  return i != null && (l(n, ["_self"], Ly(i, n)), bg(n, { "requests[].*": "requests[].request.*" })), n;
}
function Ly(e, t) {
  const n = {}, o = r(e, ["taskType"]);
  t !== void 0 && o != null && l(t, ["requests[]", "taskType"], o);
  const i = r(e, ["title"]);
  t !== void 0 && i != null && l(t, ["requests[]", "title"], i);
  const s = r(e, ["outputDimensionality"]);
  if (t !== void 0 && s != null && l(t, ["requests[]", "outputDimensionality"], s), r(e, ["mimeType"]) !== void 0) throw new Error("mimeType parameter is not supported in Gemini API.");
  if (r(e, ["autoTruncate"]) !== void 0) throw new Error("autoTruncate parameter is not supported in Gemini API.");
  if (r(e, ["documentOcr"]) !== void 0) throw new Error("documentOcr parameter is not supported in Gemini API.");
  if (r(e, ["audioTrackExtraction"]) !== void 0) throw new Error("audioTrackExtraction parameter is not supported in Gemini API.");
  return n;
}
function $y(e, t) {
  const n = {}, o = r(t, ["fileName"]);
  o != null && l(n, ["file_name"], o);
  const i = r(t, ["inlinedRequests"]);
  return i != null && l(n, ["requests"], Uy(e, i)), n;
}
function Fy(e) {
  const t = {};
  if (r(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const n = r(e, ["fileUri"]);
  n != null && l(t, ["fileUri"], n);
  const o = r(e, ["mimeType"]);
  return o != null && l(t, ["mimeType"], o), t;
}
function By(e) {
  const t = {}, n = r(e, ["id"]);
  n != null && l(t, ["id"], n);
  const o = r(e, ["args"]);
  o != null && l(t, ["args"], o);
  const i = r(e, ["name"]);
  if (i != null && l(t, ["name"], i), r(e, ["partialArgs"]) !== void 0) throw new Error("partialArgs parameter is not supported in Gemini API.");
  if (r(e, ["willContinue"]) !== void 0) throw new Error("willContinue parameter is not supported in Gemini API.");
  return t;
}
function Gy(e) {
  const t = {}, n = r(e, ["allowedFunctionNames"]);
  n != null && l(t, ["allowedFunctionNames"], n);
  const o = r(e, ["mode"]);
  if (o != null && l(t, ["mode"], o), r(e, ["streamFunctionCallArguments"]) !== void 0) throw new Error("streamFunctionCallArguments parameter is not supported in Gemini API.");
  return t;
}
function Oy(e, t, n) {
  const o = {}, i = r(t, ["systemInstruction"]);
  n !== void 0 && i != null && l(n, ["systemInstruction"], gf(de(i)));
  const s = r(t, ["temperature"]);
  s != null && l(o, ["temperature"], s);
  const a = r(t, ["topP"]);
  a != null && l(o, ["topP"], a);
  const u = r(t, ["topK"]);
  u != null && l(o, ["topK"], u);
  const c = r(t, ["candidateCount"]);
  c != null && l(o, ["candidateCount"], c);
  const d = r(t, ["maxOutputTokens"]);
  d != null && l(o, ["maxOutputTokens"], d);
  const p = r(t, ["stopSequences"]);
  p != null && l(o, ["stopSequences"], p);
  const f = r(t, ["responseLogprobs"]);
  f != null && l(o, ["responseLogprobs"], f);
  const h = r(t, ["logprobs"]);
  h != null && l(o, ["logprobs"], h);
  const m = r(t, ["presencePenalty"]);
  m != null && l(o, ["presencePenalty"], m);
  const g = r(t, ["frequencyPenalty"]);
  g != null && l(o, ["frequencyPenalty"], g);
  const y = r(t, ["seed"]);
  y != null && l(o, ["seed"], y);
  const v = r(t, ["responseMimeType"]);
  v != null && l(o, ["responseMimeType"], v);
  const A = r(t, ["responseSchema"]);
  A != null && l(o, ["responseSchema"], Gr(A));
  const C = r(t, ["responseJsonSchema"]);
  if (C != null && l(o, ["responseJsonSchema"], C), r(t, ["routingConfig"]) !== void 0) throw new Error("routingConfig parameter is not supported in Gemini API.");
  if (r(t, ["modelSelectionConfig"]) !== void 0) throw new Error("modelSelectionConfig parameter is not supported in Gemini API.");
  const R = r(t, ["safetySettings"]);
  if (n !== void 0 && R != null) {
    let Q = R;
    Array.isArray(Q) && (Q = Q.map((X) => o_(X))), l(n, ["safetySettings"], Q);
  }
  const M = r(t, ["tools"]);
  if (n !== void 0 && M != null) {
    let Q = fn(M);
    Array.isArray(Q) && (Q = Q.map((X) => s_(dn(X)))), l(n, ["tools"], Q);
  }
  const x = r(t, ["toolConfig"]);
  if (n !== void 0 && x != null && l(n, ["toolConfig"], i_(x)), r(t, ["labels"]) !== void 0) throw new Error("labels parameter is not supported in Gemini API.");
  const w = r(t, ["cachedContent"]);
  n !== void 0 && w != null && l(n, ["cachedContent"], dt(e, w));
  const L = r(t, ["responseModalities"]);
  L != null && l(o, ["responseModalities"], L);
  const P = r(t, ["mediaResolution"]);
  P != null && l(o, ["mediaResolution"], P);
  const N = r(t, ["speechConfig"]);
  if (N != null && l(o, ["speechConfig"], Or(N)), r(t, ["audioTimestamp"]) !== void 0) throw new Error("audioTimestamp parameter is not supported in Gemini API.");
  const V = r(t, ["thinkingConfig"]);
  V != null && l(o, ["thinkingConfig"], V);
  const Y = r(t, ["imageConfig"]);
  Y != null && l(o, ["imageConfig"], Ky(Y));
  const j = r(t, ["enableEnhancedCivicAnswers"]);
  if (j != null && l(o, ["enableEnhancedCivicAnswers"], j), r(t, ["modelArmorConfig"]) !== void 0) throw new Error("modelArmorConfig parameter is not supported in Gemini API.");
  const ee = r(t, ["serviceTier"]);
  return n !== void 0 && ee != null && l(n, ["serviceTier"], ee), o;
}
function qy(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  n != null && l(t, ["sdkHttpResponse"], n);
  const o = r(e, ["candidates"]);
  if (o != null) {
    let d = o;
    Array.isArray(d) && (d = d.map((p) => Ay(p))), l(t, ["candidates"], d);
  }
  const i = r(e, ["modelVersion"]);
  i != null && l(t, ["modelVersion"], i);
  const s = r(e, ["promptFeedback"]);
  s != null && l(t, ["promptFeedback"], s);
  const a = r(e, ["responseId"]);
  a != null && l(t, ["responseId"], a);
  const u = r(e, ["usageMetadata"]);
  u != null && l(t, ["usageMetadata"], u);
  const c = r(e, ["modelStatus"]);
  return c != null && l(t, ["modelStatus"], c), t;
}
function Vy(e, t) {
  const n = {}, o = r(t, ["name"]);
  return o != null && l(n, ["_url", "name"], pn(e, o)), n;
}
function Hy(e, t) {
  const n = {}, o = r(t, ["name"]);
  return o != null && l(n, ["_url", "name"], pn(e, o)), n;
}
function Jy(e) {
  const t = {}, n = r(e, ["authConfig"]);
  n != null && l(t, ["authConfig"], hy(n));
  const o = r(e, ["enableWidget"]);
  return o != null && l(t, ["enableWidget"], o), t;
}
function Wy(e) {
  const t = {}, n = r(e, ["searchTypes"]);
  if (n != null && l(t, ["searchTypes"], n), r(e, ["blockingConfidence"]) !== void 0) throw new Error("blockingConfidence parameter is not supported in Gemini API.");
  if (r(e, ["excludeDomains"]) !== void 0) throw new Error("excludeDomains parameter is not supported in Gemini API.");
  const o = r(e, ["timeRangeFilter"]);
  return o != null && l(t, ["timeRangeFilter"], o), t;
}
function Ky(e) {
  const t = {}, n = r(e, ["aspectRatio"]);
  n != null && l(t, ["aspectRatio"], n);
  const o = r(e, ["imageSize"]);
  if (o != null && l(t, ["imageSize"], o), r(e, ["personGeneration"]) !== void 0) throw new Error("personGeneration parameter is not supported in Gemini API.");
  if (r(e, ["prominentPeople"]) !== void 0) throw new Error("prominentPeople parameter is not supported in Gemini API.");
  if (r(e, ["outputMimeType"]) !== void 0) throw new Error("outputMimeType parameter is not supported in Gemini API.");
  if (r(e, ["outputCompressionQuality"]) !== void 0) throw new Error("outputCompressionQuality parameter is not supported in Gemini API.");
  if (r(e, ["imageOutputOptions"]) !== void 0) throw new Error("imageOutputOptions parameter is not supported in Gemini API.");
  return t;
}
function Yy(e, t) {
  const n = {}, o = r(t, ["model"]);
  o != null && l(n, ["request", "model"], z(e, o));
  const i = r(t, ["contents"]);
  if (i != null) {
    let u = Ae(i);
    Array.isArray(u) && (u = u.map((c) => gf(c))), l(n, ["request", "contents"], u);
  }
  const s = r(t, ["metadata"]);
  s != null && l(n, ["metadata"], s);
  const a = r(t, ["config"]);
  return a != null && l(n, ["request", "generationConfig"], Oy(e, a, r(n, ["request"], {}))), n;
}
function zy(e) {
  const t = {}, n = r(e, ["response"]);
  n != null && l(t, ["response"], qy(n));
  const o = r(e, ["metadata"]);
  o != null && l(t, ["metadata"], o);
  const i = r(e, ["error"]);
  return i != null && l(t, ["error"], i), t;
}
function Xy(e, t) {
  const n = {}, o = r(e, ["pageSize"]);
  t !== void 0 && o != null && l(t, ["_query", "pageSize"], o);
  const i = r(e, ["pageToken"]);
  if (t !== void 0 && i != null && l(t, ["_query", "pageToken"], i), r(e, ["filter"]) !== void 0) throw new Error("filter parameter is not supported in Gemini API.");
  return n;
}
function Qy(e, t) {
  const n = {}, o = r(e, ["pageSize"]);
  t !== void 0 && o != null && l(t, ["_query", "pageSize"], o);
  const i = r(e, ["pageToken"]);
  t !== void 0 && i != null && l(t, ["_query", "pageToken"], i);
  const s = r(e, ["filter"]);
  return t !== void 0 && s != null && l(t, ["_query", "filter"], s), n;
}
function Zy(e) {
  const t = {}, n = r(e, ["config"]);
  return n != null && Xy(n, t), t;
}
function jy(e) {
  const t = {}, n = r(e, ["config"]);
  return n != null && Qy(n, t), t;
}
function e_(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  n != null && l(t, ["sdkHttpResponse"], n);
  const o = r(e, ["nextPageToken"]);
  o != null && l(t, ["nextPageToken"], o);
  const i = r(e, ["operations"]);
  if (i != null) {
    let s = i;
    Array.isArray(s) && (s = s.map((a) => ni(a))), l(t, ["batchJobs"], s);
  }
  return t;
}
function t_(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  n != null && l(t, ["sdkHttpResponse"], n);
  const o = r(e, ["nextPageToken"]);
  o != null && l(t, ["nextPageToken"], o);
  const i = r(e, ["batchPredictionJobs"]);
  if (i != null) {
    let s = i;
    Array.isArray(s) && (s = s.map((a) => Ks(a))), l(t, ["batchJobs"], s);
  }
  return t;
}
function n_(e) {
  const t = {}, n = r(e, ["mediaResolution"]);
  n != null && l(t, ["mediaResolution"], n);
  const o = r(e, ["codeExecutionResult"]);
  o != null && l(t, ["codeExecutionResult"], o);
  const i = r(e, ["executableCode"]);
  i != null && l(t, ["executableCode"], i);
  const s = r(e, ["fileData"]);
  s != null && l(t, ["fileData"], Fy(s));
  const a = r(e, ["functionCall"]);
  a != null && l(t, ["functionCall"], By(a));
  const u = r(e, ["functionResponse"]);
  u != null && l(t, ["functionResponse"], u);
  const c = r(e, ["inlineData"]);
  c != null && l(t, ["inlineData"], Sy(c));
  const d = r(e, ["text"]);
  d != null && l(t, ["text"], d);
  const p = r(e, ["thought"]);
  p != null && l(t, ["thought"], p);
  const f = r(e, ["thoughtSignature"]);
  f != null && l(t, ["thoughtSignature"], f);
  const h = r(e, ["videoMetadata"]);
  h != null && l(t, ["videoMetadata"], h);
  const m = r(e, ["toolCall"]);
  m != null && l(t, ["toolCall"], m);
  const g = r(e, ["toolResponse"]);
  g != null && l(t, ["toolResponse"], g);
  const y = r(e, ["partMetadata"]);
  return y != null && l(t, ["partMetadata"], y), t;
}
function o_(e) {
  const t = {}, n = r(e, ["category"]);
  if (n != null && l(t, ["category"], n), r(e, ["method"]) !== void 0) throw new Error("method parameter is not supported in Gemini API.");
  const o = r(e, ["threshold"]);
  return o != null && l(t, ["threshold"], o), t;
}
function i_(e) {
  const t = {}, n = r(e, ["retrievalConfig"]);
  n != null && l(t, ["retrievalConfig"], n);
  const o = r(e, ["functionCallingConfig"]);
  o != null && l(t, ["functionCallingConfig"], Gy(o));
  const i = r(e, ["includeServerSideToolInvocations"]);
  return i != null && l(t, ["includeServerSideToolInvocations"], i), t;
}
function s_(e) {
  const t = {};
  if (r(e, ["retrieval"]) !== void 0) throw new Error("retrieval parameter is not supported in Gemini API.");
  const n = r(e, ["computerUse"]);
  n != null && l(t, ["computerUse"], n);
  const o = r(e, ["fileSearch"]);
  o != null && l(t, ["fileSearch"], o);
  const i = r(e, ["googleSearch"]);
  i != null && l(t, ["googleSearch"], Wy(i));
  const s = r(e, ["googleMaps"]);
  s != null && l(t, ["googleMaps"], Jy(s));
  const a = r(e, ["codeExecution"]);
  if (a != null && l(t, ["codeExecution"], a), r(e, ["enterpriseWebSearch"]) !== void 0) throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");
  const u = r(e, ["functionDeclarations"]);
  if (u != null) {
    let f = u;
    Array.isArray(f) && (f = f.map((h) => h)), l(t, ["functionDeclarations"], f);
  }
  const c = r(e, ["googleSearchRetrieval"]);
  if (c != null && l(t, ["googleSearchRetrieval"], c), r(e, ["parallelAiSearch"]) !== void 0) throw new Error("parallelAiSearch parameter is not supported in Gemini API.");
  const d = r(e, ["urlContext"]);
  d != null && l(t, ["urlContext"], d);
  const p = r(e, ["mcpServers"]);
  if (p != null) {
    let f = p;
    Array.isArray(f) && (f = f.map((h) => h)), l(t, ["mcpServers"], f);
  }
  return t;
}
var ut;
(function(e) {
  e.PAGED_ITEM_BATCH_JOBS = "batchJobs", e.PAGED_ITEM_MODELS = "models", e.PAGED_ITEM_TUNING_JOBS = "tuningJobs", e.PAGED_ITEM_FILES = "files", e.PAGED_ITEM_CACHED_CONTENTS = "cachedContents", e.PAGED_ITEM_FILE_SEARCH_STORES = "fileSearchStores", e.PAGED_ITEM_DOCUMENTS = "documents";
})(ut || (ut = {}));
var Gt = class {
  constructor(e, t, n, o) {
    this.pageInternal = [], this.paramsInternal = {}, this.requestInternal = t, this.init(e, n, o);
  }
  init(e, t, n) {
    var o, i;
    this.nameInternal = e, this.pageInternal = t[this.nameInternal] || [], this.sdkHttpResponseInternal = t?.sdkHttpResponse, this.idxInternal = 0;
    let s = { config: {} };
    !n || Object.keys(n).length === 0 ? s = { config: {} } : typeof n == "object" ? s = Object.assign({}, n) : s = n, s.config && (s.config.pageToken = t.nextPageToken), this.paramsInternal = s, this.pageInternalSize = (i = (o = s.config) === null || o === void 0 ? void 0 : o.pageSize) !== null && i !== void 0 ? i : this.pageInternal.length;
  }
  initNextPage(e) {
    this.init(this.nameInternal, e, this.paramsInternal);
  }
  get page() {
    return this.pageInternal;
  }
  get name() {
    return this.nameInternal;
  }
  get pageSize() {
    return this.pageInternalSize;
  }
  get sdkHttpResponse() {
    return this.sdkHttpResponseInternal;
  }
  get params() {
    return this.paramsInternal;
  }
  get pageLength() {
    return this.pageInternal.length;
  }
  getItem(e) {
    return this.pageInternal[e];
  }
  [Symbol.asyncIterator]() {
    return {
      next: async () => {
        if (this.idxInternal >= this.pageLength) if (this.hasNextPage()) await this.nextPage();
        else return {
          value: void 0,
          done: !0
        };
        const e = this.getItem(this.idxInternal);
        return this.idxInternal += 1, {
          value: e,
          done: !1
        };
      },
      return: async () => ({
        value: void 0,
        done: !0
      })
    };
  }
  async nextPage() {
    if (!this.hasNextPage()) throw new Error("No more pages to fetch.");
    const e = await this.requestInternal(this.params);
    return this.initNextPage(e), this.page;
  }
  hasNextPage() {
    var e;
    return ((e = this.params.config) === null || e === void 0 ? void 0 : e.pageToken) !== void 0;
  }
}, r_ = class extends ct {
  constructor(e) {
    super(), this.apiClient = e, this.list = async (t = {}) => new Gt(ut.PAGED_ITEM_BATCH_JOBS, (n) => this.listInternal(n), await this.listInternal(t), t), this.create = async (t) => (this.apiClient.isVertexAI() && (t.config = this.formatDestination(t.src, t.config)), this.createInternal(t)), this.createEmbeddings = async (t) => {
      if (console.warn("batches.createEmbeddings() is experimental and may change without notice."), this.apiClient.isVertexAI()) throw new Error("Vertex AI does not support batches.createEmbeddings.");
      return this.createEmbeddingsInternal(t);
    };
  }
  createInlinedGenerateContentRequest(e) {
    const t = Mu(this.apiClient, e), n = t._url, o = k("{model}:batchGenerateContent", n), i = t.batch.inputConfig.requests, s = i.requests, a = [];
    for (const u of s) {
      const c = Object.assign({}, u);
      if (c.systemInstruction) {
        const d = c.systemInstruction;
        delete c.systemInstruction;
        const p = c.request;
        p.systemInstruction = d, c.request = p;
      }
      a.push(c);
    }
    return i.requests = a, delete t.config, delete t._url, delete t._query, {
      path: o,
      body: t
    };
  }
  getGcsUri(e) {
    if (typeof e == "string") return e.startsWith("gs://") ? e : void 0;
    if (!Array.isArray(e) && e.gcsUri && e.gcsUri.length > 0) return e.gcsUri[0];
  }
  getBigqueryUri(e) {
    if (typeof e == "string") return e.startsWith("bq://") ? e : void 0;
    if (!Array.isArray(e)) return e.bigqueryUri;
  }
  formatDestination(e, t) {
    const n = t ? Object.assign({}, t) : {}, o = Date.now().toString();
    if (n.displayName || (n.displayName = `genaiBatchJob_${o}`), n.dest === void 0) {
      const i = this.getGcsUri(e), s = this.getBigqueryUri(e);
      if (i) i.endsWith(".jsonl") ? n.dest = `${i.slice(0, -6)}/dest` : n.dest = `${i}_dest_${o}`;
      else if (s) n.dest = `${s}_dest_${o}`;
      else throw new Error("Unsupported source for Vertex AI: No GCS or BigQuery URI found.");
    }
    return n;
  }
  async createInternal(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = Ry(this.apiClient, e);
      return a = k("batchPredictionJobs", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json()), s.then((d) => Ks(d));
    } else {
      const c = Mu(this.apiClient, e);
      return a = k("{model}:batchGenerateContent", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "POST",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json()), s.then((d) => ni(d));
    }
  }
  async createEmbeddingsInternal(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const a = xy(this.apiClient, e);
      return i = k("{model}:asyncBatchEmbedContent", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json()), o.then((u) => ni(u));
    }
  }
  async get(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = Hy(this.apiClient, e);
      return a = k("batchPredictionJobs/{name}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json()), s.then((d) => Ks(d));
    } else {
      const c = Vy(this.apiClient, e);
      return a = k("batches/{name}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "GET",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json()), s.then((d) => ni(d));
    }
  }
  async cancel(e) {
    var t, n, o, i;
    let s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = wy(this.apiClient, e);
      s = k("batchPredictionJobs/{name}:cancel", u._url), a = u._query, delete u._url, delete u._query, await this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      });
    } else {
      const u = Ey(this.apiClient, e);
      s = k("batches/{name}:cancel", u._url), a = u._query, delete u._url, delete u._query, await this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      });
    }
  }
  async listInternal(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = jy(e);
      return a = k("batchPredictionJobs", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = t_(d), f = new bu();
        return Object.assign(f, p), f;
      });
    } else {
      const c = Zy(e);
      return a = k("batches", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "GET",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = e_(d), f = new bu();
        return Object.assign(f, p), f;
      });
    }
  }
  async delete(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = Ny(this.apiClient, e);
      return a = k("batchPredictionJobs/{name}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "DELETE",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => Dy(d));
    } else {
      const c = My(this.apiClient, e);
      return a = k("batches/{name}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "DELETE",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => ky(d));
    }
  }
};
function a_(e) {
  const t = {}, n = r(e, ["apiKey"]);
  if (n != null && l(t, ["apiKey"], n), r(e, ["apiKeyConfig"]) !== void 0) throw new Error("apiKeyConfig parameter is not supported in Gemini API.");
  if (r(e, ["authType"]) !== void 0) throw new Error("authType parameter is not supported in Gemini API.");
  if (r(e, ["googleServiceAccountConfig"]) !== void 0) throw new Error("googleServiceAccountConfig parameter is not supported in Gemini API.");
  if (r(e, ["httpBasicAuthConfig"]) !== void 0) throw new Error("httpBasicAuthConfig parameter is not supported in Gemini API.");
  if (r(e, ["oauthConfig"]) !== void 0) throw new Error("oauthConfig parameter is not supported in Gemini API.");
  if (r(e, ["oidcConfig"]) !== void 0) throw new Error("oidcConfig parameter is not supported in Gemini API.");
  return t;
}
function l_(e) {
  const t = {}, n = r(e, ["data"]);
  if (n != null && l(t, ["data"], n), r(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const o = r(e, ["mimeType"]);
  return o != null && l(t, ["mimeType"], o), t;
}
function Nu(e) {
  const t = {}, n = r(e, ["parts"]);
  if (n != null) {
    let i = n;
    Array.isArray(i) && (i = i.map((s) => M_(s))), l(t, ["parts"], i);
  }
  const o = r(e, ["role"]);
  return o != null && l(t, ["role"], o), t;
}
function ku(e) {
  const t = {}, n = r(e, ["parts"]);
  if (n != null) {
    let i = n;
    Array.isArray(i) && (i = i.map((s) => N_(s))), l(t, ["parts"], i);
  }
  const o = r(e, ["role"]);
  return o != null && l(t, ["role"], o), t;
}
function u_(e, t) {
  const n = {}, o = r(e, ["ttl"]);
  t !== void 0 && o != null && l(t, ["ttl"], o);
  const i = r(e, ["expireTime"]);
  t !== void 0 && i != null && l(t, ["expireTime"], i);
  const s = r(e, ["displayName"]);
  t !== void 0 && s != null && l(t, ["displayName"], s);
  const a = r(e, ["contents"]);
  if (t !== void 0 && a != null) {
    let p = Ae(a);
    Array.isArray(p) && (p = p.map((f) => Nu(f))), l(t, ["contents"], p);
  }
  const u = r(e, ["systemInstruction"]);
  t !== void 0 && u != null && l(t, ["systemInstruction"], Nu(de(u)));
  const c = r(e, ["tools"]);
  if (t !== void 0 && c != null) {
    let p = c;
    Array.isArray(p) && (p = p.map((f) => U_(f))), l(t, ["tools"], p);
  }
  const d = r(e, ["toolConfig"]);
  if (t !== void 0 && d != null && l(t, ["toolConfig"], k_(d)), r(e, ["kmsKeyName"]) !== void 0) throw new Error("kmsKeyName parameter is not supported in Gemini API.");
  return n;
}
function c_(e, t) {
  const n = {}, o = r(e, ["ttl"]);
  t !== void 0 && o != null && l(t, ["ttl"], o);
  const i = r(e, ["expireTime"]);
  t !== void 0 && i != null && l(t, ["expireTime"], i);
  const s = r(e, ["displayName"]);
  t !== void 0 && s != null && l(t, ["displayName"], s);
  const a = r(e, ["contents"]);
  if (t !== void 0 && a != null) {
    let f = Ae(a);
    Array.isArray(f) && (f = f.map((h) => ku(h))), l(t, ["contents"], f);
  }
  const u = r(e, ["systemInstruction"]);
  t !== void 0 && u != null && l(t, ["systemInstruction"], ku(de(u)));
  const c = r(e, ["tools"]);
  if (t !== void 0 && c != null) {
    let f = c;
    Array.isArray(f) && (f = f.map((h) => L_(h))), l(t, ["tools"], f);
  }
  const d = r(e, ["toolConfig"]);
  t !== void 0 && d != null && l(t, ["toolConfig"], D_(d));
  const p = r(e, ["kmsKeyName"]);
  return t !== void 0 && p != null && l(t, ["encryption_spec", "kmsKeyName"], p), n;
}
function d_(e, t) {
  const n = {}, o = r(t, ["model"]);
  o != null && l(n, ["model"], of(e, o));
  const i = r(t, ["config"]);
  return i != null && u_(i, n), n;
}
function f_(e, t) {
  const n = {}, o = r(t, ["model"]);
  o != null && l(n, ["model"], of(e, o));
  const i = r(t, ["config"]);
  return i != null && c_(i, n), n;
}
function p_(e, t) {
  const n = {}, o = r(t, ["name"]);
  return o != null && l(n, ["_url", "name"], dt(e, o)), n;
}
function h_(e, t) {
  const n = {}, o = r(t, ["name"]);
  return o != null && l(n, ["_url", "name"], dt(e, o)), n;
}
function m_(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  return n != null && l(t, ["sdkHttpResponse"], n), t;
}
function g_(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  return n != null && l(t, ["sdkHttpResponse"], n), t;
}
function y_(e) {
  const t = {};
  if (r(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const n = r(e, ["fileUri"]);
  n != null && l(t, ["fileUri"], n);
  const o = r(e, ["mimeType"]);
  return o != null && l(t, ["mimeType"], o), t;
}
function __(e) {
  const t = {}, n = r(e, ["id"]);
  n != null && l(t, ["id"], n);
  const o = r(e, ["args"]);
  o != null && l(t, ["args"], o);
  const i = r(e, ["name"]);
  if (i != null && l(t, ["name"], i), r(e, ["partialArgs"]) !== void 0) throw new Error("partialArgs parameter is not supported in Gemini API.");
  if (r(e, ["willContinue"]) !== void 0) throw new Error("willContinue parameter is not supported in Gemini API.");
  return t;
}
function v_(e) {
  const t = {}, n = r(e, ["allowedFunctionNames"]);
  n != null && l(t, ["allowedFunctionNames"], n);
  const o = r(e, ["mode"]);
  if (o != null && l(t, ["mode"], o), r(e, ["streamFunctionCallArguments"]) !== void 0) throw new Error("streamFunctionCallArguments parameter is not supported in Gemini API.");
  return t;
}
function T_(e) {
  const t = {}, n = r(e, ["description"]);
  n != null && l(t, ["description"], n);
  const o = r(e, ["name"]);
  o != null && l(t, ["name"], o);
  const i = r(e, ["parameters"]);
  i != null && l(t, ["parameters"], i);
  const s = r(e, ["parametersJsonSchema"]);
  s != null && l(t, ["parametersJsonSchema"], s);
  const a = r(e, ["response"]);
  a != null && l(t, ["response"], a);
  const u = r(e, ["responseJsonSchema"]);
  if (u != null && l(t, ["responseJsonSchema"], u), r(e, ["behavior"]) !== void 0) throw new Error("behavior parameter is not supported in Vertex AI.");
  return t;
}
function S_(e, t) {
  const n = {}, o = r(t, ["name"]);
  return o != null && l(n, ["_url", "name"], dt(e, o)), n;
}
function E_(e, t) {
  const n = {}, o = r(t, ["name"]);
  return o != null && l(n, ["_url", "name"], dt(e, o)), n;
}
function w_(e) {
  const t = {}, n = r(e, ["authConfig"]);
  n != null && l(t, ["authConfig"], a_(n));
  const o = r(e, ["enableWidget"]);
  return o != null && l(t, ["enableWidget"], o), t;
}
function A_(e) {
  const t = {}, n = r(e, ["searchTypes"]);
  if (n != null && l(t, ["searchTypes"], n), r(e, ["blockingConfidence"]) !== void 0) throw new Error("blockingConfidence parameter is not supported in Gemini API.");
  if (r(e, ["excludeDomains"]) !== void 0) throw new Error("excludeDomains parameter is not supported in Gemini API.");
  const o = r(e, ["timeRangeFilter"]);
  return o != null && l(t, ["timeRangeFilter"], o), t;
}
function C_(e, t) {
  const n = {}, o = r(e, ["pageSize"]);
  t !== void 0 && o != null && l(t, ["_query", "pageSize"], o);
  const i = r(e, ["pageToken"]);
  return t !== void 0 && i != null && l(t, ["_query", "pageToken"], i), n;
}
function I_(e, t) {
  const n = {}, o = r(e, ["pageSize"]);
  t !== void 0 && o != null && l(t, ["_query", "pageSize"], o);
  const i = r(e, ["pageToken"]);
  return t !== void 0 && i != null && l(t, ["_query", "pageToken"], i), n;
}
function b_(e) {
  const t = {}, n = r(e, ["config"]);
  return n != null && C_(n, t), t;
}
function R_(e) {
  const t = {}, n = r(e, ["config"]);
  return n != null && I_(n, t), t;
}
function P_(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  n != null && l(t, ["sdkHttpResponse"], n);
  const o = r(e, ["nextPageToken"]);
  o != null && l(t, ["nextPageToken"], o);
  const i = r(e, ["cachedContents"]);
  if (i != null) {
    let s = i;
    Array.isArray(s) && (s = s.map((a) => a)), l(t, ["cachedContents"], s);
  }
  return t;
}
function x_(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  n != null && l(t, ["sdkHttpResponse"], n);
  const o = r(e, ["nextPageToken"]);
  o != null && l(t, ["nextPageToken"], o);
  const i = r(e, ["cachedContents"]);
  if (i != null) {
    let s = i;
    Array.isArray(s) && (s = s.map((a) => a)), l(t, ["cachedContents"], s);
  }
  return t;
}
function M_(e) {
  const t = {}, n = r(e, ["mediaResolution"]);
  n != null && l(t, ["mediaResolution"], n);
  const o = r(e, ["codeExecutionResult"]);
  o != null && l(t, ["codeExecutionResult"], o);
  const i = r(e, ["executableCode"]);
  i != null && l(t, ["executableCode"], i);
  const s = r(e, ["fileData"]);
  s != null && l(t, ["fileData"], y_(s));
  const a = r(e, ["functionCall"]);
  a != null && l(t, ["functionCall"], __(a));
  const u = r(e, ["functionResponse"]);
  u != null && l(t, ["functionResponse"], u);
  const c = r(e, ["inlineData"]);
  c != null && l(t, ["inlineData"], l_(c));
  const d = r(e, ["text"]);
  d != null && l(t, ["text"], d);
  const p = r(e, ["thought"]);
  p != null && l(t, ["thought"], p);
  const f = r(e, ["thoughtSignature"]);
  f != null && l(t, ["thoughtSignature"], f);
  const h = r(e, ["videoMetadata"]);
  h != null && l(t, ["videoMetadata"], h);
  const m = r(e, ["toolCall"]);
  m != null && l(t, ["toolCall"], m);
  const g = r(e, ["toolResponse"]);
  g != null && l(t, ["toolResponse"], g);
  const y = r(e, ["partMetadata"]);
  return y != null && l(t, ["partMetadata"], y), t;
}
function N_(e) {
  const t = {}, n = r(e, ["mediaResolution"]);
  n != null && l(t, ["mediaResolution"], n);
  const o = r(e, ["codeExecutionResult"]);
  o != null && l(t, ["codeExecutionResult"], o);
  const i = r(e, ["executableCode"]);
  i != null && l(t, ["executableCode"], i);
  const s = r(e, ["fileData"]);
  s != null && l(t, ["fileData"], s);
  const a = r(e, ["functionCall"]);
  a != null && l(t, ["functionCall"], a);
  const u = r(e, ["functionResponse"]);
  u != null && l(t, ["functionResponse"], u);
  const c = r(e, ["inlineData"]);
  c != null && l(t, ["inlineData"], c);
  const d = r(e, ["text"]);
  d != null && l(t, ["text"], d);
  const p = r(e, ["thought"]);
  p != null && l(t, ["thought"], p);
  const f = r(e, ["thoughtSignature"]);
  f != null && l(t, ["thoughtSignature"], f);
  const h = r(e, ["videoMetadata"]);
  if (h != null && l(t, ["videoMetadata"], h), r(e, ["toolCall"]) !== void 0) throw new Error("toolCall parameter is not supported in Vertex AI.");
  if (r(e, ["toolResponse"]) !== void 0) throw new Error("toolResponse parameter is not supported in Vertex AI.");
  if (r(e, ["partMetadata"]) !== void 0) throw new Error("partMetadata parameter is not supported in Vertex AI.");
  return t;
}
function k_(e) {
  const t = {}, n = r(e, ["retrievalConfig"]);
  n != null && l(t, ["retrievalConfig"], n);
  const o = r(e, ["functionCallingConfig"]);
  o != null && l(t, ["functionCallingConfig"], v_(o));
  const i = r(e, ["includeServerSideToolInvocations"]);
  return i != null && l(t, ["includeServerSideToolInvocations"], i), t;
}
function D_(e) {
  const t = {}, n = r(e, ["retrievalConfig"]);
  n != null && l(t, ["retrievalConfig"], n);
  const o = r(e, ["functionCallingConfig"]);
  if (o != null && l(t, ["functionCallingConfig"], o), r(e, ["includeServerSideToolInvocations"]) !== void 0) throw new Error("includeServerSideToolInvocations parameter is not supported in Vertex AI.");
  return t;
}
function U_(e) {
  const t = {};
  if (r(e, ["retrieval"]) !== void 0) throw new Error("retrieval parameter is not supported in Gemini API.");
  const n = r(e, ["computerUse"]);
  n != null && l(t, ["computerUse"], n);
  const o = r(e, ["fileSearch"]);
  o != null && l(t, ["fileSearch"], o);
  const i = r(e, ["googleSearch"]);
  i != null && l(t, ["googleSearch"], A_(i));
  const s = r(e, ["googleMaps"]);
  s != null && l(t, ["googleMaps"], w_(s));
  const a = r(e, ["codeExecution"]);
  if (a != null && l(t, ["codeExecution"], a), r(e, ["enterpriseWebSearch"]) !== void 0) throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");
  const u = r(e, ["functionDeclarations"]);
  if (u != null) {
    let f = u;
    Array.isArray(f) && (f = f.map((h) => h)), l(t, ["functionDeclarations"], f);
  }
  const c = r(e, ["googleSearchRetrieval"]);
  if (c != null && l(t, ["googleSearchRetrieval"], c), r(e, ["parallelAiSearch"]) !== void 0) throw new Error("parallelAiSearch parameter is not supported in Gemini API.");
  const d = r(e, ["urlContext"]);
  d != null && l(t, ["urlContext"], d);
  const p = r(e, ["mcpServers"]);
  if (p != null) {
    let f = p;
    Array.isArray(f) && (f = f.map((h) => h)), l(t, ["mcpServers"], f);
  }
  return t;
}
function L_(e) {
  const t = {}, n = r(e, ["retrieval"]);
  n != null && l(t, ["retrieval"], n);
  const o = r(e, ["computerUse"]);
  if (o != null && l(t, ["computerUse"], o), r(e, ["fileSearch"]) !== void 0) throw new Error("fileSearch parameter is not supported in Vertex AI.");
  const i = r(e, ["googleSearch"]);
  i != null && l(t, ["googleSearch"], i);
  const s = r(e, ["googleMaps"]);
  s != null && l(t, ["googleMaps"], s);
  const a = r(e, ["codeExecution"]);
  a != null && l(t, ["codeExecution"], a);
  const u = r(e, ["enterpriseWebSearch"]);
  u != null && l(t, ["enterpriseWebSearch"], u);
  const c = r(e, ["functionDeclarations"]);
  if (c != null) {
    let h = c;
    Array.isArray(h) && (h = h.map((m) => T_(m))), l(t, ["functionDeclarations"], h);
  }
  const d = r(e, ["googleSearchRetrieval"]);
  d != null && l(t, ["googleSearchRetrieval"], d);
  const p = r(e, ["parallelAiSearch"]);
  p != null && l(t, ["parallelAiSearch"], p);
  const f = r(e, ["urlContext"]);
  if (f != null && l(t, ["urlContext"], f), r(e, ["mcpServers"]) !== void 0) throw new Error("mcpServers parameter is not supported in Vertex AI.");
  return t;
}
function $_(e, t) {
  const n = {}, o = r(e, ["ttl"]);
  t !== void 0 && o != null && l(t, ["ttl"], o);
  const i = r(e, ["expireTime"]);
  return t !== void 0 && i != null && l(t, ["expireTime"], i), n;
}
function F_(e, t) {
  const n = {}, o = r(e, ["ttl"]);
  t !== void 0 && o != null && l(t, ["ttl"], o);
  const i = r(e, ["expireTime"]);
  return t !== void 0 && i != null && l(t, ["expireTime"], i), n;
}
function B_(e, t) {
  const n = {}, o = r(t, ["name"]);
  o != null && l(n, ["_url", "name"], dt(e, o));
  const i = r(t, ["config"]);
  return i != null && $_(i, n), n;
}
function G_(e, t) {
  const n = {}, o = r(t, ["name"]);
  o != null && l(n, ["_url", "name"], dt(e, o));
  const i = r(t, ["config"]);
  return i != null && F_(i, n), n;
}
var O_ = class extends ct {
  constructor(e) {
    super(), this.apiClient = e, this.list = async (t = {}) => new Gt(ut.PAGED_ITEM_CACHED_CONTENTS, (n) => this.listInternal(n), await this.listInternal(t), t);
  }
  async create(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = f_(this.apiClient, e);
      return a = k("cachedContents", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json()), s.then((d) => d);
    } else {
      const c = d_(this.apiClient, e);
      return a = k("cachedContents", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "POST",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json()), s.then((d) => d);
    }
  }
  async get(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = E_(this.apiClient, e);
      return a = k("{name}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json()), s.then((d) => d);
    } else {
      const c = S_(this.apiClient, e);
      return a = k("{name}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "GET",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json()), s.then((d) => d);
    }
  }
  async delete(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = h_(this.apiClient, e);
      return a = k("{name}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "DELETE",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = g_(d), f = new Cu();
        return Object.assign(f, p), f;
      });
    } else {
      const c = p_(this.apiClient, e);
      return a = k("{name}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "DELETE",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = m_(d), f = new Cu();
        return Object.assign(f, p), f;
      });
    }
  }
  async update(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = G_(this.apiClient, e);
      return a = k("{name}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "PATCH",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json()), s.then((d) => d);
    } else {
      const c = B_(this.apiClient, e);
      return a = k("{name}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "PATCH",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json()), s.then((d) => d);
    }
  }
  async listInternal(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = R_(e);
      return a = k("cachedContents", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = x_(d), f = new Iu();
        return Object.assign(f, p), f;
      });
    } else {
      const c = b_(e);
      return a = k("cachedContents", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "GET",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = P_(d), f = new Iu();
        return Object.assign(f, p), f;
      });
    }
  }
};
function St(e, t) {
  var n = {};
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, o = Object.getOwnPropertySymbols(e); i < o.length; i++) t.indexOf(o[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[i]) && (n[o[i]] = e[o[i]]);
  return n;
}
function Du(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], o = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number") return { next: function() {
    return e && o >= e.length && (e = void 0), {
      value: e && e[o++],
      done: !e
    };
  } };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function J(e) {
  return this instanceof J ? (this.v = e, this) : new J(e);
}
function Ke(e, t, n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var o = n.apply(e, t || []), i, s = [];
  return i = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), u("next"), u("throw"), u("return", a), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function a(m) {
    return function(g) {
      return Promise.resolve(g).then(m, f);
    };
  }
  function u(m, g) {
    o[m] && (i[m] = function(y) {
      return new Promise(function(v, A) {
        s.push([
          m,
          y,
          v,
          A
        ]) > 1 || c(m, y);
      });
    }, g && (i[m] = g(i[m])));
  }
  function c(m, g) {
    try {
      d(o[m](g));
    } catch (y) {
      h(s[0][3], y);
    }
  }
  function d(m) {
    m.value instanceof J ? Promise.resolve(m.value.v).then(p, f) : h(s[0][2], m);
  }
  function p(m) {
    c("next", m);
  }
  function f(m) {
    c("throw", m);
  }
  function h(m, g) {
    m(g), s.shift(), s.length && c(s[0][0], s[0][1]);
  }
}
function Ye(e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator], n;
  return t ? t.call(e) : (e = typeof Du == "function" ? Du(e) : e[Symbol.iterator](), n = {}, o("next"), o("throw"), o("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n);
  function o(s) {
    n[s] = e[s] && function(a) {
      return new Promise(function(u, c) {
        a = e[s](a), i(u, c, a.done, a.value);
      });
    };
  }
  function i(s, a, u, c) {
    Promise.resolve(c).then(function(d) {
      s({
        value: d,
        done: u
      });
    }, a);
  }
}
function q_(e) {
  var t;
  if (e.candidates == null || e.candidates.length === 0) return !1;
  const n = (t = e.candidates[0]) === null || t === void 0 ? void 0 : t.content;
  return n === void 0 ? !1 : yf(n);
}
function yf(e) {
  if (e.parts === void 0 || e.parts.length === 0) return !1;
  for (const t of e.parts) if (t === void 0 || Object.keys(t).length === 0) return !1;
  return !0;
}
function V_(e) {
  if (e.length !== 0) {
    for (const t of e) if (t.role !== "user" && t.role !== "model") throw new Error(`Role must be user or model, but got ${t.role}.`);
  }
}
function Uu(e) {
  if (e === void 0 || e.length === 0) return [];
  const t = [], n = e.length;
  let o = 0;
  for (; o < n; ) if (e[o].role === "user")
    t.push(e[o]), o++;
  else {
    const i = [];
    let s = !0;
    for (; o < n && e[o].role === "model"; )
      i.push(e[o]), s && !yf(e[o]) && (s = !1), o++;
    s ? t.push(...i) : t.pop();
  }
  return t;
}
var H_ = class {
  constructor(e, t) {
    this.modelsModule = e, this.apiClient = t;
  }
  create(e) {
    return new J_(this.apiClient, this.modelsModule, e.model, e.config, structuredClone(e.history));
  }
}, J_ = class {
  constructor(e, t, n, o = {}, i = []) {
    this.apiClient = e, this.modelsModule = t, this.model = n, this.config = o, this.history = i, this.sendPromise = Promise.resolve(), V_(i);
  }
  async sendMessage(e) {
    var t;
    await this.sendPromise;
    const n = de(e.message), o = this.modelsModule.generateContent({
      model: this.model,
      contents: this.getHistory(!0).concat(n),
      config: (t = e.config) !== null && t !== void 0 ? t : this.config
    });
    return this.sendPromise = (async () => {
      var i, s, a;
      const u = await o, c = (s = (i = u.candidates) === null || i === void 0 ? void 0 : i[0]) === null || s === void 0 ? void 0 : s.content, d = u.automaticFunctionCallingHistory, p = this.getHistory(!0).length;
      let f = [];
      d != null && (f = (a = d.slice(p)) !== null && a !== void 0 ? a : []);
      const h = c ? [c] : [];
      this.recordHistory(n, h, f);
    })(), await this.sendPromise.catch(() => {
      this.sendPromise = Promise.resolve();
    }), o;
  }
  async sendMessageStream(e) {
    var t;
    await this.sendPromise;
    const n = de(e.message), o = this.modelsModule.generateContentStream({
      model: this.model,
      contents: this.getHistory(!0).concat(n),
      config: (t = e.config) !== null && t !== void 0 ? t : this.config
    });
    this.sendPromise = o.then(() => {
    }).catch(() => {
    });
    const i = await o;
    return this.processStreamResponse(i, n);
  }
  getHistory(e = !1) {
    const t = e ? Uu(this.history) : this.history;
    return structuredClone(t);
  }
  processStreamResponse(e, t) {
    return Ke(this, arguments, function* () {
      var o, i, s, a, u, c;
      const d = [];
      try {
        for (var p = !0, f = Ye(e), h; h = yield J(f.next()), o = h.done, !o; p = !0) {
          a = h.value, p = !1;
          const m = a;
          if (q_(m)) {
            const g = (c = (u = m.candidates) === null || u === void 0 ? void 0 : u[0]) === null || c === void 0 ? void 0 : c.content;
            g !== void 0 && d.push(g);
          }
          yield yield J(m);
        }
      } catch (m) {
        i = { error: m };
      } finally {
        try {
          !p && !o && (s = f.return) && (yield J(s.call(f)));
        } finally {
          if (i) throw i.error;
        }
      }
      this.recordHistory(t, d);
    });
  }
  recordHistory(e, t, n) {
    let o = [];
    t.length > 0 && t.every((i) => i.role !== void 0) ? o = t : o.push({
      role: "model",
      parts: []
    }), n && n.length > 0 ? this.history.push(...Uu(n)) : this.history.push(e), this.history.push(...o);
  }
}, _f = class vf extends Error {
  constructor(t) {
    super(t.message), this.name = "ApiError", this.status = t.status, Object.setPrototypeOf(this, vf.prototype);
  }
};
function W_(e) {
  const t = {}, n = r(e, ["file"]);
  return n != null && l(t, ["file"], n), t;
}
function K_(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  return n != null && l(t, ["sdkHttpResponse"], n), t;
}
function Y_(e) {
  const t = {}, n = r(e, ["name"]);
  return n != null && l(t, ["_url", "file"], cf(n)), t;
}
function z_(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  return n != null && l(t, ["sdkHttpResponse"], n), t;
}
function X_(e) {
  const t = {}, n = r(e, ["name"]);
  return n != null && l(t, ["_url", "file"], cf(n)), t;
}
function Q_(e) {
  const t = {}, n = r(e, ["uris"]);
  return n != null && l(t, ["uris"], n), t;
}
function Z_(e, t) {
  const n = {}, o = r(e, ["pageSize"]);
  t !== void 0 && o != null && l(t, ["_query", "pageSize"], o);
  const i = r(e, ["pageToken"]);
  return t !== void 0 && i != null && l(t, ["_query", "pageToken"], i), n;
}
function j_(e) {
  const t = {}, n = r(e, ["config"]);
  return n != null && Z_(n, t), t;
}
function ev(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  n != null && l(t, ["sdkHttpResponse"], n);
  const o = r(e, ["nextPageToken"]);
  o != null && l(t, ["nextPageToken"], o);
  const i = r(e, ["files"]);
  if (i != null) {
    let s = i;
    Array.isArray(s) && (s = s.map((a) => a)), l(t, ["files"], s);
  }
  return t;
}
function tv(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  n != null && l(t, ["sdkHttpResponse"], n);
  const o = r(e, ["files"]);
  if (o != null) {
    let i = o;
    Array.isArray(i) && (i = i.map((s) => s)), l(t, ["files"], i);
  }
  return t;
}
var nv = class extends ct {
  constructor(e) {
    super(), this.apiClient = e, this.list = async (t = {}) => new Gt(ut.PAGED_ITEM_FILES, (n) => this.listInternal(n), await this.listInternal(t), t);
  }
  async upload(e) {
    if (this.apiClient.isVertexAI()) throw new Error("Vertex AI does not support uploading files. You can share files through a GCS bucket.");
    return this.apiClient.uploadFile(e.file, e.config).then((t) => t);
  }
  async download(e) {
    await this.apiClient.downloadFile(e);
  }
  async registerFiles(e) {
    throw new Error("registerFiles is only supported in Node.js environments.");
  }
  async _registerFiles(e) {
    return this.registerFilesInternal(e);
  }
  async listInternal(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const a = j_(e);
      return i = k("files", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json().then((c) => {
        const d = c;
        return d.sdkHttpResponse = { headers: u.headers }, d;
      })), o.then((u) => {
        const c = ev(u), d = new Qg();
        return Object.assign(d, c), d;
      });
    }
  }
  async createInternal(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const a = W_(e);
      return i = k("upload/v1beta/files", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json()), o.then((u) => {
        const c = K_(u), d = new Zg();
        return Object.assign(d, c), d;
      });
    }
  }
  async get(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const a = X_(e);
      return i = k("files/{file}", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json()), o.then((u) => u);
    }
  }
  async delete(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const a = Y_(e);
      return i = k("files/{file}", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "DELETE",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json().then((c) => {
        const d = c;
        return d.sdkHttpResponse = { headers: u.headers }, d;
      })), o.then((u) => {
        const c = z_(u), d = new jg();
        return Object.assign(d, c), d;
      });
    }
  }
  async registerFilesInternal(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const a = Q_(e);
      return i = k("files:register", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json()), o.then((u) => {
        const c = tv(u), d = new ey();
        return Object.assign(d, c), d;
      });
    }
  }
};
function Lu(e) {
  const t = {};
  if (r(e, ["languageCodes"]) !== void 0) throw new Error("languageCodes parameter is not supported in Gemini API.");
  return t;
}
function ov(e) {
  const t = {}, n = r(e, ["apiKey"]);
  if (n != null && l(t, ["apiKey"], n), r(e, ["apiKeyConfig"]) !== void 0) throw new Error("apiKeyConfig parameter is not supported in Gemini API.");
  if (r(e, ["authType"]) !== void 0) throw new Error("authType parameter is not supported in Gemini API.");
  if (r(e, ["googleServiceAccountConfig"]) !== void 0) throw new Error("googleServiceAccountConfig parameter is not supported in Gemini API.");
  if (r(e, ["httpBasicAuthConfig"]) !== void 0) throw new Error("httpBasicAuthConfig parameter is not supported in Gemini API.");
  if (r(e, ["oauthConfig"]) !== void 0) throw new Error("oauthConfig parameter is not supported in Gemini API.");
  if (r(e, ["oidcConfig"]) !== void 0) throw new Error("oidcConfig parameter is not supported in Gemini API.");
  return t;
}
function oi(e) {
  const t = {}, n = r(e, ["data"]);
  if (n != null && l(t, ["data"], n), r(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const o = r(e, ["mimeType"]);
  return o != null && l(t, ["mimeType"], o), t;
}
function iv(e) {
  const t = {}, n = r(e, ["parts"]);
  if (n != null) {
    let i = n;
    Array.isArray(i) && (i = i.map((s) => Sv(s))), l(t, ["parts"], i);
  }
  const o = r(e, ["role"]);
  return o != null && l(t, ["role"], o), t;
}
function sv(e) {
  const t = {}, n = r(e, ["parts"]);
  if (n != null) {
    let i = n;
    Array.isArray(i) && (i = i.map((s) => Ev(s))), l(t, ["parts"], i);
  }
  const o = r(e, ["role"]);
  return o != null && l(t, ["role"], o), t;
}
function rv(e) {
  const t = {};
  if (r(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const n = r(e, ["fileUri"]);
  n != null && l(t, ["fileUri"], n);
  const o = r(e, ["mimeType"]);
  return o != null && l(t, ["mimeType"], o), t;
}
function av(e) {
  const t = {}, n = r(e, ["id"]);
  n != null && l(t, ["id"], n);
  const o = r(e, ["args"]);
  o != null && l(t, ["args"], o);
  const i = r(e, ["name"]);
  if (i != null && l(t, ["name"], i), r(e, ["partialArgs"]) !== void 0) throw new Error("partialArgs parameter is not supported in Gemini API.");
  if (r(e, ["willContinue"]) !== void 0) throw new Error("willContinue parameter is not supported in Gemini API.");
  return t;
}
function lv(e) {
  const t = {}, n = r(e, ["description"]);
  n != null && l(t, ["description"], n);
  const o = r(e, ["name"]);
  o != null && l(t, ["name"], o);
  const i = r(e, ["parameters"]);
  i != null && l(t, ["parameters"], i);
  const s = r(e, ["parametersJsonSchema"]);
  s != null && l(t, ["parametersJsonSchema"], s);
  const a = r(e, ["response"]);
  a != null && l(t, ["response"], a);
  const u = r(e, ["responseJsonSchema"]);
  if (u != null && l(t, ["responseJsonSchema"], u), r(e, ["behavior"]) !== void 0) throw new Error("behavior parameter is not supported in Vertex AI.");
  return t;
}
function uv(e) {
  const t = {}, n = r(e, ["modelSelectionConfig"]);
  n != null && l(t, ["modelConfig"], n);
  const o = r(e, ["responseJsonSchema"]);
  o != null && l(t, ["responseJsonSchema"], o);
  const i = r(e, ["audioTimestamp"]);
  i != null && l(t, ["audioTimestamp"], i);
  const s = r(e, ["candidateCount"]);
  s != null && l(t, ["candidateCount"], s);
  const a = r(e, ["enableAffectiveDialog"]);
  a != null && l(t, ["enableAffectiveDialog"], a);
  const u = r(e, ["frequencyPenalty"]);
  u != null && l(t, ["frequencyPenalty"], u);
  const c = r(e, ["logprobs"]);
  c != null && l(t, ["logprobs"], c);
  const d = r(e, ["maxOutputTokens"]);
  d != null && l(t, ["maxOutputTokens"], d);
  const p = r(e, ["mediaResolution"]);
  p != null && l(t, ["mediaResolution"], p);
  const f = r(e, ["presencePenalty"]);
  f != null && l(t, ["presencePenalty"], f);
  const h = r(e, ["responseLogprobs"]);
  h != null && l(t, ["responseLogprobs"], h);
  const m = r(e, ["responseMimeType"]);
  m != null && l(t, ["responseMimeType"], m);
  const g = r(e, ["responseModalities"]);
  g != null && l(t, ["responseModalities"], g);
  const y = r(e, ["responseSchema"]);
  y != null && l(t, ["responseSchema"], y);
  const v = r(e, ["routingConfig"]);
  v != null && l(t, ["routingConfig"], v);
  const A = r(e, ["seed"]);
  A != null && l(t, ["seed"], A);
  const C = r(e, ["speechConfig"]);
  C != null && l(t, ["speechConfig"], C);
  const R = r(e, ["stopSequences"]);
  R != null && l(t, ["stopSequences"], R);
  const M = r(e, ["temperature"]);
  M != null && l(t, ["temperature"], M);
  const x = r(e, ["thinkingConfig"]);
  x != null && l(t, ["thinkingConfig"], x);
  const w = r(e, ["topK"]);
  w != null && l(t, ["topK"], w);
  const L = r(e, ["topP"]);
  if (L != null && l(t, ["topP"], L), r(e, ["enableEnhancedCivicAnswers"]) !== void 0) throw new Error("enableEnhancedCivicAnswers parameter is not supported in Vertex AI.");
  return t;
}
function cv(e) {
  const t = {}, n = r(e, ["authConfig"]);
  n != null && l(t, ["authConfig"], ov(n));
  const o = r(e, ["enableWidget"]);
  return o != null && l(t, ["enableWidget"], o), t;
}
function dv(e) {
  const t = {}, n = r(e, ["searchTypes"]);
  if (n != null && l(t, ["searchTypes"], n), r(e, ["blockingConfidence"]) !== void 0) throw new Error("blockingConfidence parameter is not supported in Gemini API.");
  if (r(e, ["excludeDomains"]) !== void 0) throw new Error("excludeDomains parameter is not supported in Gemini API.");
  const o = r(e, ["timeRangeFilter"]);
  return o != null && l(t, ["timeRangeFilter"], o), t;
}
function fv(e, t) {
  const n = {}, o = r(e, ["generationConfig"]);
  t !== void 0 && o != null && l(t, ["setup", "generationConfig"], o);
  const i = r(e, ["responseModalities"]);
  t !== void 0 && i != null && l(t, [
    "setup",
    "generationConfig",
    "responseModalities"
  ], i);
  const s = r(e, ["temperature"]);
  t !== void 0 && s != null && l(t, [
    "setup",
    "generationConfig",
    "temperature"
  ], s);
  const a = r(e, ["topP"]);
  t !== void 0 && a != null && l(t, [
    "setup",
    "generationConfig",
    "topP"
  ], a);
  const u = r(e, ["topK"]);
  t !== void 0 && u != null && l(t, [
    "setup",
    "generationConfig",
    "topK"
  ], u);
  const c = r(e, ["maxOutputTokens"]);
  t !== void 0 && c != null && l(t, [
    "setup",
    "generationConfig",
    "maxOutputTokens"
  ], c);
  const d = r(e, ["mediaResolution"]);
  t !== void 0 && d != null && l(t, [
    "setup",
    "generationConfig",
    "mediaResolution"
  ], d);
  const p = r(e, ["seed"]);
  t !== void 0 && p != null && l(t, [
    "setup",
    "generationConfig",
    "seed"
  ], p);
  const f = r(e, ["speechConfig"]);
  t !== void 0 && f != null && l(t, [
    "setup",
    "generationConfig",
    "speechConfig"
  ], qr(f));
  const h = r(e, ["thinkingConfig"]);
  t !== void 0 && h != null && l(t, [
    "setup",
    "generationConfig",
    "thinkingConfig"
  ], h);
  const m = r(e, ["enableAffectiveDialog"]);
  t !== void 0 && m != null && l(t, [
    "setup",
    "generationConfig",
    "enableAffectiveDialog"
  ], m);
  const g = r(e, ["systemInstruction"]);
  t !== void 0 && g != null && l(t, ["setup", "systemInstruction"], iv(de(g)));
  const y = r(e, ["tools"]);
  if (t !== void 0 && y != null) {
    let P = fn(y);
    Array.isArray(P) && (P = P.map((N) => Cv(dn(N)))), l(t, ["setup", "tools"], P);
  }
  const v = r(e, ["sessionResumption"]);
  t !== void 0 && v != null && l(t, ["setup", "sessionResumption"], Av(v));
  const A = r(e, ["inputAudioTranscription"]);
  t !== void 0 && A != null && l(t, ["setup", "inputAudioTranscription"], Lu(A));
  const C = r(e, ["outputAudioTranscription"]);
  t !== void 0 && C != null && l(t, ["setup", "outputAudioTranscription"], Lu(C));
  const R = r(e, ["realtimeInputConfig"]);
  t !== void 0 && R != null && l(t, ["setup", "realtimeInputConfig"], R);
  const M = r(e, ["contextWindowCompression"]);
  t !== void 0 && M != null && l(t, ["setup", "contextWindowCompression"], M);
  const x = r(e, ["proactivity"]);
  if (t !== void 0 && x != null && l(t, ["setup", "proactivity"], x), r(e, ["explicitVadSignal"]) !== void 0) throw new Error("explicitVadSignal parameter is not supported in Gemini API.");
  const w = r(e, ["avatarConfig"]);
  t !== void 0 && w != null && l(t, ["setup", "avatarConfig"], w);
  const L = r(e, ["safetySettings"]);
  if (t !== void 0 && L != null) {
    let P = L;
    Array.isArray(P) && (P = P.map((N) => wv(N))), l(t, ["setup", "safetySettings"], P);
  }
  return n;
}
function pv(e, t) {
  const n = {}, o = r(e, ["generationConfig"]);
  t !== void 0 && o != null && l(t, ["setup", "generationConfig"], uv(o));
  const i = r(e, ["responseModalities"]);
  t !== void 0 && i != null && l(t, [
    "setup",
    "generationConfig",
    "responseModalities"
  ], i);
  const s = r(e, ["temperature"]);
  t !== void 0 && s != null && l(t, [
    "setup",
    "generationConfig",
    "temperature"
  ], s);
  const a = r(e, ["topP"]);
  t !== void 0 && a != null && l(t, [
    "setup",
    "generationConfig",
    "topP"
  ], a);
  const u = r(e, ["topK"]);
  t !== void 0 && u != null && l(t, [
    "setup",
    "generationConfig",
    "topK"
  ], u);
  const c = r(e, ["maxOutputTokens"]);
  t !== void 0 && c != null && l(t, [
    "setup",
    "generationConfig",
    "maxOutputTokens"
  ], c);
  const d = r(e, ["mediaResolution"]);
  t !== void 0 && d != null && l(t, [
    "setup",
    "generationConfig",
    "mediaResolution"
  ], d);
  const p = r(e, ["seed"]);
  t !== void 0 && p != null && l(t, [
    "setup",
    "generationConfig",
    "seed"
  ], p);
  const f = r(e, ["speechConfig"]);
  t !== void 0 && f != null && l(t, [
    "setup",
    "generationConfig",
    "speechConfig"
  ], qr(f));
  const h = r(e, ["thinkingConfig"]);
  t !== void 0 && h != null && l(t, [
    "setup",
    "generationConfig",
    "thinkingConfig"
  ], h);
  const m = r(e, ["enableAffectiveDialog"]);
  t !== void 0 && m != null && l(t, [
    "setup",
    "generationConfig",
    "enableAffectiveDialog"
  ], m);
  const g = r(e, ["systemInstruction"]);
  t !== void 0 && g != null && l(t, ["setup", "systemInstruction"], sv(de(g)));
  const y = r(e, ["tools"]);
  if (t !== void 0 && y != null) {
    let N = fn(y);
    Array.isArray(N) && (N = N.map((V) => Iv(dn(V)))), l(t, ["setup", "tools"], N);
  }
  const v = r(e, ["sessionResumption"]);
  t !== void 0 && v != null && l(t, ["setup", "sessionResumption"], v);
  const A = r(e, ["inputAudioTranscription"]);
  t !== void 0 && A != null && l(t, ["setup", "inputAudioTranscription"], A);
  const C = r(e, ["outputAudioTranscription"]);
  t !== void 0 && C != null && l(t, ["setup", "outputAudioTranscription"], C);
  const R = r(e, ["realtimeInputConfig"]);
  t !== void 0 && R != null && l(t, ["setup", "realtimeInputConfig"], R);
  const M = r(e, ["contextWindowCompression"]);
  t !== void 0 && M != null && l(t, ["setup", "contextWindowCompression"], M);
  const x = r(e, ["proactivity"]);
  t !== void 0 && x != null && l(t, ["setup", "proactivity"], x);
  const w = r(e, ["explicitVadSignal"]);
  t !== void 0 && w != null && l(t, ["setup", "explicitVadSignal"], w);
  const L = r(e, ["avatarConfig"]);
  t !== void 0 && L != null && l(t, ["setup", "avatarConfig"], L);
  const P = r(e, ["safetySettings"]);
  if (t !== void 0 && P != null) {
    let N = P;
    Array.isArray(N) && (N = N.map((V) => V)), l(t, ["setup", "safetySettings"], N);
  }
  return n;
}
function hv(e, t) {
  const n = {}, o = r(t, ["model"]);
  o != null && l(n, ["setup", "model"], z(e, o));
  const i = r(t, ["config"]);
  return i != null && l(n, ["config"], fv(i, n)), n;
}
function mv(e, t) {
  const n = {}, o = r(t, ["model"]);
  o != null && l(n, ["setup", "model"], z(e, o));
  const i = r(t, ["config"]);
  return i != null && l(n, ["config"], pv(i, n)), n;
}
function gv(e) {
  const t = {}, n = r(e, ["musicGenerationConfig"]);
  return n != null && l(t, ["musicGenerationConfig"], n), t;
}
function yv(e) {
  const t = {}, n = r(e, ["weightedPrompts"]);
  if (n != null) {
    let o = n;
    Array.isArray(o) && (o = o.map((i) => i)), l(t, ["weightedPrompts"], o);
  }
  return t;
}
function _v(e) {
  const t = {}, n = r(e, ["media"]);
  if (n != null) {
    let d = sf(n);
    Array.isArray(d) && (d = d.map((p) => oi(p))), l(t, ["mediaChunks"], d);
  }
  const o = r(e, ["audio"]);
  o != null && l(t, ["audio"], oi(af(o)));
  const i = r(e, ["audioStreamEnd"]);
  i != null && l(t, ["audioStreamEnd"], i);
  const s = r(e, ["video"]);
  s != null && l(t, ["video"], oi(rf(s)));
  const a = r(e, ["text"]);
  a != null && l(t, ["text"], a);
  const u = r(e, ["activityStart"]);
  u != null && l(t, ["activityStart"], u);
  const c = r(e, ["activityEnd"]);
  return c != null && l(t, ["activityEnd"], c), t;
}
function vv(e) {
  const t = {}, n = r(e, ["media"]);
  if (n != null) {
    let d = sf(n);
    Array.isArray(d) && (d = d.map((p) => p)), l(t, ["mediaChunks"], d);
  }
  const o = r(e, ["audio"]);
  o != null && l(t, ["audio"], af(o));
  const i = r(e, ["audioStreamEnd"]);
  i != null && l(t, ["audioStreamEnd"], i);
  const s = r(e, ["video"]);
  s != null && l(t, ["video"], rf(s));
  const a = r(e, ["text"]);
  a != null && l(t, ["text"], a);
  const u = r(e, ["activityStart"]);
  u != null && l(t, ["activityStart"], u);
  const c = r(e, ["activityEnd"]);
  return c != null && l(t, ["activityEnd"], c), t;
}
function Tv(e) {
  const t = {}, n = r(e, ["setupComplete"]);
  n != null && l(t, ["setupComplete"], n);
  const o = r(e, ["serverContent"]);
  o != null && l(t, ["serverContent"], o);
  const i = r(e, ["toolCall"]);
  i != null && l(t, ["toolCall"], i);
  const s = r(e, ["toolCallCancellation"]);
  s != null && l(t, ["toolCallCancellation"], s);
  const a = r(e, ["usageMetadata"]);
  a != null && l(t, ["usageMetadata"], bv(a));
  const u = r(e, ["goAway"]);
  u != null && l(t, ["goAway"], u);
  const c = r(e, ["sessionResumptionUpdate"]);
  c != null && l(t, ["sessionResumptionUpdate"], c);
  const d = r(e, ["voiceActivityDetectionSignal"]);
  d != null && l(t, ["voiceActivityDetectionSignal"], d);
  const p = r(e, ["voiceActivity"]);
  return p != null && l(t, ["voiceActivity"], Rv(p)), t;
}
function Sv(e) {
  const t = {}, n = r(e, ["mediaResolution"]);
  n != null && l(t, ["mediaResolution"], n);
  const o = r(e, ["codeExecutionResult"]);
  o != null && l(t, ["codeExecutionResult"], o);
  const i = r(e, ["executableCode"]);
  i != null && l(t, ["executableCode"], i);
  const s = r(e, ["fileData"]);
  s != null && l(t, ["fileData"], rv(s));
  const a = r(e, ["functionCall"]);
  a != null && l(t, ["functionCall"], av(a));
  const u = r(e, ["functionResponse"]);
  u != null && l(t, ["functionResponse"], u);
  const c = r(e, ["inlineData"]);
  c != null && l(t, ["inlineData"], oi(c));
  const d = r(e, ["text"]);
  d != null && l(t, ["text"], d);
  const p = r(e, ["thought"]);
  p != null && l(t, ["thought"], p);
  const f = r(e, ["thoughtSignature"]);
  f != null && l(t, ["thoughtSignature"], f);
  const h = r(e, ["videoMetadata"]);
  h != null && l(t, ["videoMetadata"], h);
  const m = r(e, ["toolCall"]);
  m != null && l(t, ["toolCall"], m);
  const g = r(e, ["toolResponse"]);
  g != null && l(t, ["toolResponse"], g);
  const y = r(e, ["partMetadata"]);
  return y != null && l(t, ["partMetadata"], y), t;
}
function Ev(e) {
  const t = {}, n = r(e, ["mediaResolution"]);
  n != null && l(t, ["mediaResolution"], n);
  const o = r(e, ["codeExecutionResult"]);
  o != null && l(t, ["codeExecutionResult"], o);
  const i = r(e, ["executableCode"]);
  i != null && l(t, ["executableCode"], i);
  const s = r(e, ["fileData"]);
  s != null && l(t, ["fileData"], s);
  const a = r(e, ["functionCall"]);
  a != null && l(t, ["functionCall"], a);
  const u = r(e, ["functionResponse"]);
  u != null && l(t, ["functionResponse"], u);
  const c = r(e, ["inlineData"]);
  c != null && l(t, ["inlineData"], c);
  const d = r(e, ["text"]);
  d != null && l(t, ["text"], d);
  const p = r(e, ["thought"]);
  p != null && l(t, ["thought"], p);
  const f = r(e, ["thoughtSignature"]);
  f != null && l(t, ["thoughtSignature"], f);
  const h = r(e, ["videoMetadata"]);
  if (h != null && l(t, ["videoMetadata"], h), r(e, ["toolCall"]) !== void 0) throw new Error("toolCall parameter is not supported in Vertex AI.");
  if (r(e, ["toolResponse"]) !== void 0) throw new Error("toolResponse parameter is not supported in Vertex AI.");
  if (r(e, ["partMetadata"]) !== void 0) throw new Error("partMetadata parameter is not supported in Vertex AI.");
  return t;
}
function wv(e) {
  const t = {}, n = r(e, ["category"]);
  if (n != null && l(t, ["category"], n), r(e, ["method"]) !== void 0) throw new Error("method parameter is not supported in Gemini API.");
  const o = r(e, ["threshold"]);
  return o != null && l(t, ["threshold"], o), t;
}
function Av(e) {
  const t = {}, n = r(e, ["handle"]);
  if (n != null && l(t, ["handle"], n), r(e, ["transparent"]) !== void 0) throw new Error("transparent parameter is not supported in Gemini API.");
  return t;
}
function Cv(e) {
  const t = {};
  if (r(e, ["retrieval"]) !== void 0) throw new Error("retrieval parameter is not supported in Gemini API.");
  const n = r(e, ["computerUse"]);
  n != null && l(t, ["computerUse"], n);
  const o = r(e, ["fileSearch"]);
  o != null && l(t, ["fileSearch"], o);
  const i = r(e, ["googleSearch"]);
  i != null && l(t, ["googleSearch"], dv(i));
  const s = r(e, ["googleMaps"]);
  s != null && l(t, ["googleMaps"], cv(s));
  const a = r(e, ["codeExecution"]);
  if (a != null && l(t, ["codeExecution"], a), r(e, ["enterpriseWebSearch"]) !== void 0) throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");
  const u = r(e, ["functionDeclarations"]);
  if (u != null) {
    let f = u;
    Array.isArray(f) && (f = f.map((h) => h)), l(t, ["functionDeclarations"], f);
  }
  const c = r(e, ["googleSearchRetrieval"]);
  if (c != null && l(t, ["googleSearchRetrieval"], c), r(e, ["parallelAiSearch"]) !== void 0) throw new Error("parallelAiSearch parameter is not supported in Gemini API.");
  const d = r(e, ["urlContext"]);
  d != null && l(t, ["urlContext"], d);
  const p = r(e, ["mcpServers"]);
  if (p != null) {
    let f = p;
    Array.isArray(f) && (f = f.map((h) => h)), l(t, ["mcpServers"], f);
  }
  return t;
}
function Iv(e) {
  const t = {}, n = r(e, ["retrieval"]);
  n != null && l(t, ["retrieval"], n);
  const o = r(e, ["computerUse"]);
  if (o != null && l(t, ["computerUse"], o), r(e, ["fileSearch"]) !== void 0) throw new Error("fileSearch parameter is not supported in Vertex AI.");
  const i = r(e, ["googleSearch"]);
  i != null && l(t, ["googleSearch"], i);
  const s = r(e, ["googleMaps"]);
  s != null && l(t, ["googleMaps"], s);
  const a = r(e, ["codeExecution"]);
  a != null && l(t, ["codeExecution"], a);
  const u = r(e, ["enterpriseWebSearch"]);
  u != null && l(t, ["enterpriseWebSearch"], u);
  const c = r(e, ["functionDeclarations"]);
  if (c != null) {
    let h = c;
    Array.isArray(h) && (h = h.map((m) => lv(m))), l(t, ["functionDeclarations"], h);
  }
  const d = r(e, ["googleSearchRetrieval"]);
  d != null && l(t, ["googleSearchRetrieval"], d);
  const p = r(e, ["parallelAiSearch"]);
  p != null && l(t, ["parallelAiSearch"], p);
  const f = r(e, ["urlContext"]);
  if (f != null && l(t, ["urlContext"], f), r(e, ["mcpServers"]) !== void 0) throw new Error("mcpServers parameter is not supported in Vertex AI.");
  return t;
}
function bv(e) {
  const t = {}, n = r(e, ["promptTokenCount"]);
  n != null && l(t, ["promptTokenCount"], n);
  const o = r(e, ["cachedContentTokenCount"]);
  o != null && l(t, ["cachedContentTokenCount"], o);
  const i = r(e, ["candidatesTokenCount"]);
  i != null && l(t, ["responseTokenCount"], i);
  const s = r(e, ["toolUsePromptTokenCount"]);
  s != null && l(t, ["toolUsePromptTokenCount"], s);
  const a = r(e, ["thoughtsTokenCount"]);
  a != null && l(t, ["thoughtsTokenCount"], a);
  const u = r(e, ["totalTokenCount"]);
  u != null && l(t, ["totalTokenCount"], u);
  const c = r(e, ["promptTokensDetails"]);
  if (c != null) {
    let m = c;
    Array.isArray(m) && (m = m.map((g) => g)), l(t, ["promptTokensDetails"], m);
  }
  const d = r(e, ["cacheTokensDetails"]);
  if (d != null) {
    let m = d;
    Array.isArray(m) && (m = m.map((g) => g)), l(t, ["cacheTokensDetails"], m);
  }
  const p = r(e, ["candidatesTokensDetails"]);
  if (p != null) {
    let m = p;
    Array.isArray(m) && (m = m.map((g) => g)), l(t, ["responseTokensDetails"], m);
  }
  const f = r(e, ["toolUsePromptTokensDetails"]);
  if (f != null) {
    let m = f;
    Array.isArray(m) && (m = m.map((g) => g)), l(t, ["toolUsePromptTokensDetails"], m);
  }
  const h = r(e, ["trafficType"]);
  return h != null && l(t, ["trafficType"], h), t;
}
function Rv(e) {
  const t = {}, n = r(e, ["type"]);
  return n != null && l(t, ["voiceActivityType"], n), t;
}
function Pv(e, t) {
  const n = {}, o = r(e, ["apiKey"]);
  if (o != null && l(n, ["apiKey"], o), r(e, ["apiKeyConfig"]) !== void 0) throw new Error("apiKeyConfig parameter is not supported in Gemini API.");
  if (r(e, ["authType"]) !== void 0) throw new Error("authType parameter is not supported in Gemini API.");
  if (r(e, ["googleServiceAccountConfig"]) !== void 0) throw new Error("googleServiceAccountConfig parameter is not supported in Gemini API.");
  if (r(e, ["httpBasicAuthConfig"]) !== void 0) throw new Error("httpBasicAuthConfig parameter is not supported in Gemini API.");
  if (r(e, ["oauthConfig"]) !== void 0) throw new Error("oauthConfig parameter is not supported in Gemini API.");
  if (r(e, ["oidcConfig"]) !== void 0) throw new Error("oidcConfig parameter is not supported in Gemini API.");
  return n;
}
function xv(e, t) {
  const n = {}, o = r(e, ["data"]);
  if (o != null && l(n, ["data"], o), r(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const i = r(e, ["mimeType"]);
  return i != null && l(n, ["mimeType"], i), n;
}
function Mv(e, t) {
  const n = {}, o = r(e, ["content"]);
  o != null && l(n, ["content"], o);
  const i = r(e, ["citationMetadata"]);
  i != null && l(n, ["citationMetadata"], Nv(i));
  const s = r(e, ["tokenCount"]);
  s != null && l(n, ["tokenCount"], s);
  const a = r(e, ["finishReason"]);
  a != null && l(n, ["finishReason"], a);
  const u = r(e, ["groundingMetadata"]);
  u != null && l(n, ["groundingMetadata"], u);
  const c = r(e, ["avgLogprobs"]);
  c != null && l(n, ["avgLogprobs"], c);
  const d = r(e, ["index"]);
  d != null && l(n, ["index"], d);
  const p = r(e, ["logprobsResult"]);
  p != null && l(n, ["logprobsResult"], p);
  const f = r(e, ["safetyRatings"]);
  if (f != null) {
    let m = f;
    Array.isArray(m) && (m = m.map((g) => g)), l(n, ["safetyRatings"], m);
  }
  const h = r(e, ["urlContextMetadata"]);
  return h != null && l(n, ["urlContextMetadata"], h), n;
}
function Nv(e, t) {
  const n = {}, o = r(e, ["citationSources"]);
  if (o != null) {
    let i = o;
    Array.isArray(i) && (i = i.map((s) => s)), l(n, ["citations"], i);
  }
  return n;
}
function kv(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  i != null && l(o, ["_url", "model"], z(e, i));
  const s = r(t, ["contents"]);
  if (s != null) {
    let a = Ae(s);
    Array.isArray(a) && (a = a.map((u) => hn(u))), l(o, ["contents"], a);
  }
  return o;
}
function Dv(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  o != null && l(n, ["sdkHttpResponse"], o);
  const i = r(e, ["tokensInfo"]);
  if (i != null) {
    let s = i;
    Array.isArray(s) && (s = s.map((a) => a)), l(n, ["tokensInfo"], s);
  }
  return n;
}
function Uv(e, t) {
  const n = {}, o = r(e, ["values"]);
  o != null && l(n, ["values"], o);
  const i = r(e, ["statistics"]);
  return i != null && l(n, ["statistics"], Lv(i)), n;
}
function Lv(e, t) {
  const n = {}, o = r(e, ["truncated"]);
  o != null && l(n, ["truncated"], o);
  const i = r(e, ["token_count"]);
  return i != null && l(n, ["tokenCount"], i), n;
}
function To(e, t) {
  const n = {}, o = r(e, ["parts"]);
  if (o != null) {
    let s = o;
    Array.isArray(s) && (s = s.map((a) => JT(a))), l(n, ["parts"], s);
  }
  const i = r(e, ["role"]);
  return i != null && l(n, ["role"], i), n;
}
function hn(e, t) {
  const n = {}, o = r(e, ["parts"]);
  if (o != null) {
    let s = o;
    Array.isArray(s) && (s = s.map((a) => WT(a))), l(n, ["parts"], s);
  }
  const i = r(e, ["role"]);
  return i != null && l(n, ["role"], i), n;
}
function $v(e, t) {
  const n = {}, o = r(e, ["controlType"]);
  o != null && l(n, ["controlType"], o);
  const i = r(e, ["enableControlImageComputation"]);
  return i != null && l(n, ["computeControl"], i), n;
}
function Fv(e, t) {
  const n = {};
  if (r(e, ["systemInstruction"]) !== void 0) throw new Error("systemInstruction parameter is not supported in Gemini API.");
  if (r(e, ["tools"]) !== void 0) throw new Error("tools parameter is not supported in Gemini API.");
  if (r(e, ["generationConfig"]) !== void 0) throw new Error("generationConfig parameter is not supported in Gemini API.");
  return n;
}
function Bv(e, t, n) {
  const o = {}, i = r(e, ["systemInstruction"]);
  t !== void 0 && i != null && l(t, ["systemInstruction"], hn(de(i)));
  const s = r(e, ["tools"]);
  if (t !== void 0 && s != null) {
    let u = s;
    Array.isArray(u) && (u = u.map((c) => wf(c))), l(t, ["tools"], u);
  }
  const a = r(e, ["generationConfig"]);
  return t !== void 0 && a != null && l(t, ["generationConfig"], xT(a)), o;
}
function Gv(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  i != null && l(o, ["_url", "model"], z(e, i));
  const s = r(t, ["contents"]);
  if (s != null) {
    let u = Ae(s);
    Array.isArray(u) && (u = u.map((c) => To(c))), l(o, ["contents"], u);
  }
  const a = r(t, ["config"]);
  return a != null && Fv(a), o;
}
function Ov(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  i != null && l(o, ["_url", "model"], z(e, i));
  const s = r(t, ["contents"]);
  if (s != null) {
    let u = Ae(s);
    Array.isArray(u) && (u = u.map((c) => hn(c))), l(o, ["contents"], u);
  }
  const a = r(t, ["config"]);
  return a != null && Bv(a, o), o;
}
function qv(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  o != null && l(n, ["sdkHttpResponse"], o);
  const i = r(e, ["totalTokens"]);
  i != null && l(n, ["totalTokens"], i);
  const s = r(e, ["cachedContentTokenCount"]);
  return s != null && l(n, ["cachedContentTokenCount"], s), n;
}
function Vv(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  o != null && l(n, ["sdkHttpResponse"], o);
  const i = r(e, ["totalTokens"]);
  return i != null && l(n, ["totalTokens"], i), n;
}
function Hv(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  return i != null && l(o, ["_url", "name"], z(e, i)), o;
}
function Jv(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  return i != null && l(o, ["_url", "name"], z(e, i)), o;
}
function Wv(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  return o != null && l(n, ["sdkHttpResponse"], o), n;
}
function Kv(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  return o != null && l(n, ["sdkHttpResponse"], o), n;
}
function Yv(e, t, n) {
  const o = {}, i = r(e, ["outputGcsUri"]);
  t !== void 0 && i != null && l(t, ["parameters", "storageUri"], i);
  const s = r(e, ["negativePrompt"]);
  t !== void 0 && s != null && l(t, ["parameters", "negativePrompt"], s);
  const a = r(e, ["numberOfImages"]);
  t !== void 0 && a != null && l(t, ["parameters", "sampleCount"], a);
  const u = r(e, ["aspectRatio"]);
  t !== void 0 && u != null && l(t, ["parameters", "aspectRatio"], u);
  const c = r(e, ["guidanceScale"]);
  t !== void 0 && c != null && l(t, ["parameters", "guidanceScale"], c);
  const d = r(e, ["seed"]);
  t !== void 0 && d != null && l(t, ["parameters", "seed"], d);
  const p = r(e, ["safetyFilterLevel"]);
  t !== void 0 && p != null && l(t, ["parameters", "safetySetting"], p);
  const f = r(e, ["personGeneration"]);
  t !== void 0 && f != null && l(t, ["parameters", "personGeneration"], f);
  const h = r(e, ["includeSafetyAttributes"]);
  t !== void 0 && h != null && l(t, ["parameters", "includeSafetyAttributes"], h);
  const m = r(e, ["includeRaiReason"]);
  t !== void 0 && m != null && l(t, ["parameters", "includeRaiReason"], m);
  const g = r(e, ["language"]);
  t !== void 0 && g != null && l(t, ["parameters", "language"], g);
  const y = r(e, ["outputMimeType"]);
  t !== void 0 && y != null && l(t, [
    "parameters",
    "outputOptions",
    "mimeType"
  ], y);
  const v = r(e, ["outputCompressionQuality"]);
  t !== void 0 && v != null && l(t, [
    "parameters",
    "outputOptions",
    "compressionQuality"
  ], v);
  const A = r(e, ["addWatermark"]);
  t !== void 0 && A != null && l(t, ["parameters", "addWatermark"], A);
  const C = r(e, ["labels"]);
  t !== void 0 && C != null && l(t, ["labels"], C);
  const R = r(e, ["editMode"]);
  t !== void 0 && R != null && l(t, ["parameters", "editMode"], R);
  const M = r(e, ["baseSteps"]);
  return t !== void 0 && M != null && l(t, [
    "parameters",
    "editConfig",
    "baseSteps"
  ], M), o;
}
function zv(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  i != null && l(o, ["_url", "model"], z(e, i));
  const s = r(t, ["prompt"]);
  s != null && l(o, ["instances[0]", "prompt"], s);
  const a = r(t, ["referenceImages"]);
  if (a != null) {
    let c = a;
    Array.isArray(c) && (c = c.map((d) => ZT(d))), l(o, ["instances[0]", "referenceImages"], c);
  }
  const u = r(t, ["config"]);
  return u != null && Yv(u, o), o;
}
function Xv(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  o != null && l(n, ["sdkHttpResponse"], o);
  const i = r(e, ["predictions"]);
  if (i != null) {
    let s = i;
    Array.isArray(s) && (s = s.map((a) => Di(a))), l(n, ["generatedImages"], s);
  }
  return n;
}
function Qv(e, t, n) {
  const o = {}, i = r(e, ["taskType"]);
  t !== void 0 && i != null && l(t, ["requests[]", "taskType"], i);
  const s = r(e, ["title"]);
  t !== void 0 && s != null && l(t, ["requests[]", "title"], s);
  const a = r(e, ["outputDimensionality"]);
  if (t !== void 0 && a != null && l(t, ["requests[]", "outputDimensionality"], a), r(e, ["mimeType"]) !== void 0) throw new Error("mimeType parameter is not supported in Gemini API.");
  if (r(e, ["autoTruncate"]) !== void 0) throw new Error("autoTruncate parameter is not supported in Gemini API.");
  if (r(e, ["documentOcr"]) !== void 0) throw new Error("documentOcr parameter is not supported in Gemini API.");
  if (r(e, ["audioTrackExtraction"]) !== void 0) throw new Error("audioTrackExtraction parameter is not supported in Gemini API.");
  return o;
}
function Zv(e, t, n) {
  const o = {};
  let i = r(n, ["embeddingApiType"]);
  if (i === void 0 && (i = "PREDICT"), i === "PREDICT") {
    const f = r(e, ["taskType"]);
    t !== void 0 && f != null && l(t, ["instances[]", "task_type"], f);
  } else if (i === "EMBED_CONTENT") {
    const f = r(e, ["taskType"]);
    t !== void 0 && f != null && l(t, ["embedContentConfig", "taskType"], f);
  }
  let s = r(n, ["embeddingApiType"]);
  if (s === void 0 && (s = "PREDICT"), s === "PREDICT") {
    const f = r(e, ["title"]);
    t !== void 0 && f != null && l(t, ["instances[]", "title"], f);
  } else if (s === "EMBED_CONTENT") {
    const f = r(e, ["title"]);
    t !== void 0 && f != null && l(t, ["embedContentConfig", "title"], f);
  }
  let a = r(n, ["embeddingApiType"]);
  if (a === void 0 && (a = "PREDICT"), a === "PREDICT") {
    const f = r(e, ["outputDimensionality"]);
    t !== void 0 && f != null && l(t, ["parameters", "outputDimensionality"], f);
  } else if (a === "EMBED_CONTENT") {
    const f = r(e, ["outputDimensionality"]);
    t !== void 0 && f != null && l(t, ["embedContentConfig", "outputDimensionality"], f);
  }
  let u = r(n, ["embeddingApiType"]);
  if (u === void 0 && (u = "PREDICT"), u === "PREDICT") {
    const f = r(e, ["mimeType"]);
    t !== void 0 && f != null && l(t, ["instances[]", "mimeType"], f);
  }
  let c = r(n, ["embeddingApiType"]);
  if (c === void 0 && (c = "PREDICT"), c === "PREDICT") {
    const f = r(e, ["autoTruncate"]);
    t !== void 0 && f != null && l(t, ["parameters", "autoTruncate"], f);
  } else if (c === "EMBED_CONTENT") {
    const f = r(e, ["autoTruncate"]);
    t !== void 0 && f != null && l(t, ["embedContentConfig", "autoTruncate"], f);
  }
  let d = r(n, ["embeddingApiType"]);
  if (d === void 0 && (d = "PREDICT"), d === "EMBED_CONTENT") {
    const f = r(e, ["documentOcr"]);
    t !== void 0 && f != null && l(t, ["embedContentConfig", "documentOcr"], f);
  }
  let p = r(n, ["embeddingApiType"]);
  if (p === void 0 && (p = "PREDICT"), p === "EMBED_CONTENT") {
    const f = r(e, ["audioTrackExtraction"]);
    t !== void 0 && f != null && l(t, ["embedContentConfig", "audioTrackExtraction"], f);
  }
  return o;
}
function jv(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  i != null && l(o, ["_url", "model"], z(e, i));
  const s = r(t, ["contents"]);
  if (s != null) {
    let d = Br(e, s);
    Array.isArray(d) && (d = d.map((p) => p)), l(o, ["requests[]", "content"], d);
  }
  const a = r(t, ["content"]);
  a != null && To(de(a));
  const u = r(t, ["config"]);
  u != null && Qv(u, o);
  const c = r(t, ["model"]);
  return c !== void 0 && l(o, ["requests[]", "model"], z(e, c)), o;
}
function eT(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  i != null && l(o, ["_url", "model"], z(e, i));
  let s = r(n, ["embeddingApiType"]);
  if (s === void 0 && (s = "PREDICT"), s === "PREDICT") {
    const c = r(t, ["contents"]);
    if (c != null) {
      let d = Br(e, c);
      Array.isArray(d) && (d = d.map((p) => p)), l(o, ["instances[]", "content"], d);
    }
  }
  let a = r(n, ["embeddingApiType"]);
  if (a === void 0 && (a = "PREDICT"), a === "EMBED_CONTENT") {
    const c = r(t, ["content"]);
    c != null && l(o, ["content"], hn(de(c)));
  }
  const u = r(t, ["config"]);
  return u != null && Zv(u, o, n), o;
}
function tT(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  o != null && l(n, ["sdkHttpResponse"], o);
  const i = r(e, ["embeddings"]);
  if (i != null) {
    let a = i;
    Array.isArray(a) && (a = a.map((u) => u)), l(n, ["embeddings"], a);
  }
  const s = r(e, ["metadata"]);
  return s != null && l(n, ["metadata"], s), n;
}
function nT(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  o != null && l(n, ["sdkHttpResponse"], o);
  const i = r(e, ["predictions[]", "embeddings"]);
  if (i != null) {
    let a = i;
    Array.isArray(a) && (a = a.map((u) => Uv(u))), l(n, ["embeddings"], a);
  }
  const s = r(e, ["metadata"]);
  if (s != null && l(n, ["metadata"], s), t && r(t, ["embeddingApiType"]) === "EMBED_CONTENT") {
    const a = r(e, ["embedding"]), u = r(e, ["usageMetadata"]), c = r(e, ["truncated"]);
    if (a) {
      const d = {};
      u && u.promptTokenCount && (d.tokenCount = u.promptTokenCount), c && (d.truncated = c), a.statistics = d, l(n, ["embeddings"], [a]);
    }
  }
  return n;
}
function oT(e, t) {
  const n = {}, o = r(e, ["endpoint"]);
  o != null && l(n, ["name"], o);
  const i = r(e, ["deployedModelId"]);
  return i != null && l(n, ["deployedModelId"], i), n;
}
function iT(e, t) {
  const n = {};
  if (r(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const o = r(e, ["fileUri"]);
  o != null && l(n, ["fileUri"], o);
  const i = r(e, ["mimeType"]);
  return i != null && l(n, ["mimeType"], i), n;
}
function sT(e, t) {
  const n = {}, o = r(e, ["id"]);
  o != null && l(n, ["id"], o);
  const i = r(e, ["args"]);
  i != null && l(n, ["args"], i);
  const s = r(e, ["name"]);
  if (s != null && l(n, ["name"], s), r(e, ["partialArgs"]) !== void 0) throw new Error("partialArgs parameter is not supported in Gemini API.");
  if (r(e, ["willContinue"]) !== void 0) throw new Error("willContinue parameter is not supported in Gemini API.");
  return n;
}
function rT(e, t) {
  const n = {}, o = r(e, ["allowedFunctionNames"]);
  o != null && l(n, ["allowedFunctionNames"], o);
  const i = r(e, ["mode"]);
  if (i != null && l(n, ["mode"], i), r(e, ["streamFunctionCallArguments"]) !== void 0) throw new Error("streamFunctionCallArguments parameter is not supported in Gemini API.");
  return n;
}
function aT(e, t) {
  const n = {}, o = r(e, ["description"]);
  o != null && l(n, ["description"], o);
  const i = r(e, ["name"]);
  i != null && l(n, ["name"], i);
  const s = r(e, ["parameters"]);
  s != null && l(n, ["parameters"], s);
  const a = r(e, ["parametersJsonSchema"]);
  a != null && l(n, ["parametersJsonSchema"], a);
  const u = r(e, ["response"]);
  u != null && l(n, ["response"], u);
  const c = r(e, ["responseJsonSchema"]);
  if (c != null && l(n, ["responseJsonSchema"], c), r(e, ["behavior"]) !== void 0) throw new Error("behavior parameter is not supported in Vertex AI.");
  return n;
}
function lT(e, t, n, o) {
  const i = {}, s = r(t, ["systemInstruction"]);
  n !== void 0 && s != null && l(n, ["systemInstruction"], To(de(s)));
  const a = r(t, ["temperature"]);
  a != null && l(i, ["temperature"], a);
  const u = r(t, ["topP"]);
  u != null && l(i, ["topP"], u);
  const c = r(t, ["topK"]);
  c != null && l(i, ["topK"], c);
  const d = r(t, ["candidateCount"]);
  d != null && l(i, ["candidateCount"], d);
  const p = r(t, ["maxOutputTokens"]);
  p != null && l(i, ["maxOutputTokens"], p);
  const f = r(t, ["stopSequences"]);
  f != null && l(i, ["stopSequences"], f);
  const h = r(t, ["responseLogprobs"]);
  h != null && l(i, ["responseLogprobs"], h);
  const m = r(t, ["logprobs"]);
  m != null && l(i, ["logprobs"], m);
  const g = r(t, ["presencePenalty"]);
  g != null && l(i, ["presencePenalty"], g);
  const y = r(t, ["frequencyPenalty"]);
  y != null && l(i, ["frequencyPenalty"], y);
  const v = r(t, ["seed"]);
  v != null && l(i, ["seed"], v);
  const A = r(t, ["responseMimeType"]);
  A != null && l(i, ["responseMimeType"], A);
  const C = r(t, ["responseSchema"]);
  C != null && l(i, ["responseSchema"], Gr(C));
  const R = r(t, ["responseJsonSchema"]);
  if (R != null && l(i, ["responseJsonSchema"], R), r(t, ["routingConfig"]) !== void 0) throw new Error("routingConfig parameter is not supported in Gemini API.");
  if (r(t, ["modelSelectionConfig"]) !== void 0) throw new Error("modelSelectionConfig parameter is not supported in Gemini API.");
  const M = r(t, ["safetySettings"]);
  if (n !== void 0 && M != null) {
    let X = M;
    Array.isArray(X) && (X = X.map((he) => jT(he))), l(n, ["safetySettings"], X);
  }
  const x = r(t, ["tools"]);
  if (n !== void 0 && x != null) {
    let X = fn(x);
    Array.isArray(X) && (X = X.map((he) => aS(dn(he)))), l(n, ["tools"], X);
  }
  const w = r(t, ["toolConfig"]);
  if (n !== void 0 && w != null && l(n, ["toolConfig"], sS(w)), r(t, ["labels"]) !== void 0) throw new Error("labels parameter is not supported in Gemini API.");
  const L = r(t, ["cachedContent"]);
  n !== void 0 && L != null && l(n, ["cachedContent"], dt(e, L));
  const P = r(t, ["responseModalities"]);
  P != null && l(i, ["responseModalities"], P);
  const N = r(t, ["mediaResolution"]);
  N != null && l(i, ["mediaResolution"], N);
  const V = r(t, ["speechConfig"]);
  if (V != null && l(i, ["speechConfig"], Or(V)), r(t, ["audioTimestamp"]) !== void 0) throw new Error("audioTimestamp parameter is not supported in Gemini API.");
  const Y = r(t, ["thinkingConfig"]);
  Y != null && l(i, ["thinkingConfig"], Y);
  const j = r(t, ["imageConfig"]);
  j != null && l(i, ["imageConfig"], UT(j));
  const ee = r(t, ["enableEnhancedCivicAnswers"]);
  if (ee != null && l(i, ["enableEnhancedCivicAnswers"], ee), r(t, ["modelArmorConfig"]) !== void 0) throw new Error("modelArmorConfig parameter is not supported in Gemini API.");
  const Q = r(t, ["serviceTier"]);
  return n !== void 0 && Q != null && l(n, ["serviceTier"], Q), i;
}
function uT(e, t, n, o) {
  const i = {}, s = r(t, ["systemInstruction"]);
  n !== void 0 && s != null && l(n, ["systemInstruction"], hn(de(s)));
  const a = r(t, ["temperature"]);
  a != null && l(i, ["temperature"], a);
  const u = r(t, ["topP"]);
  u != null && l(i, ["topP"], u);
  const c = r(t, ["topK"]);
  c != null && l(i, ["topK"], c);
  const d = r(t, ["candidateCount"]);
  d != null && l(i, ["candidateCount"], d);
  const p = r(t, ["maxOutputTokens"]);
  p != null && l(i, ["maxOutputTokens"], p);
  const f = r(t, ["stopSequences"]);
  f != null && l(i, ["stopSequences"], f);
  const h = r(t, ["responseLogprobs"]);
  h != null && l(i, ["responseLogprobs"], h);
  const m = r(t, ["logprobs"]);
  m != null && l(i, ["logprobs"], m);
  const g = r(t, ["presencePenalty"]);
  g != null && l(i, ["presencePenalty"], g);
  const y = r(t, ["frequencyPenalty"]);
  y != null && l(i, ["frequencyPenalty"], y);
  const v = r(t, ["seed"]);
  v != null && l(i, ["seed"], v);
  const A = r(t, ["responseMimeType"]);
  A != null && l(i, ["responseMimeType"], A);
  const C = r(t, ["responseSchema"]);
  C != null && l(i, ["responseSchema"], Gr(C));
  const R = r(t, ["responseJsonSchema"]);
  R != null && l(i, ["responseJsonSchema"], R);
  const M = r(t, ["routingConfig"]);
  M != null && l(i, ["routingConfig"], M);
  const x = r(t, ["modelSelectionConfig"]);
  x != null && l(i, ["modelConfig"], x);
  const w = r(t, ["safetySettings"]);
  if (n !== void 0 && w != null) {
    let ye = w;
    Array.isArray(ye) && (ye = ye.map((_n) => _n)), l(n, ["safetySettings"], ye);
  }
  const L = r(t, ["tools"]);
  if (n !== void 0 && L != null) {
    let ye = fn(L);
    Array.isArray(ye) && (ye = ye.map((_n) => wf(dn(_n)))), l(n, ["tools"], ye);
  }
  const P = r(t, ["toolConfig"]);
  n !== void 0 && P != null && l(n, ["toolConfig"], rS(P));
  const N = r(t, ["labels"]);
  n !== void 0 && N != null && l(n, ["labels"], N);
  const V = r(t, ["cachedContent"]);
  n !== void 0 && V != null && l(n, ["cachedContent"], dt(e, V));
  const Y = r(t, ["responseModalities"]);
  Y != null && l(i, ["responseModalities"], Y);
  const j = r(t, ["mediaResolution"]);
  j != null && l(i, ["mediaResolution"], j);
  const ee = r(t, ["speechConfig"]);
  ee != null && l(i, ["speechConfig"], Or(ee));
  const Q = r(t, ["audioTimestamp"]);
  Q != null && l(i, ["audioTimestamp"], Q);
  const X = r(t, ["thinkingConfig"]);
  X != null && l(i, ["thinkingConfig"], X);
  const he = r(t, ["imageConfig"]);
  if (he != null && l(i, ["imageConfig"], LT(he)), r(t, ["enableEnhancedCivicAnswers"]) !== void 0) throw new Error("enableEnhancedCivicAnswers parameter is not supported in Vertex AI.");
  const ft = r(t, ["modelArmorConfig"]);
  n !== void 0 && ft != null && l(n, ["modelArmorConfig"], ft);
  const Xe = r(t, ["serviceTier"]);
  return n !== void 0 && Xe != null && l(n, ["serviceTier"], Xe), i;
}
function $u(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  i != null && l(o, ["_url", "model"], z(e, i));
  const s = r(t, ["contents"]);
  if (s != null) {
    let u = Ae(s);
    Array.isArray(u) && (u = u.map((c) => To(c))), l(o, ["contents"], u);
  }
  const a = r(t, ["config"]);
  return a != null && l(o, ["generationConfig"], lT(e, a, o)), o;
}
function Fu(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  i != null && l(o, ["_url", "model"], z(e, i));
  const s = r(t, ["contents"]);
  if (s != null) {
    let u = Ae(s);
    Array.isArray(u) && (u = u.map((c) => hn(c))), l(o, ["contents"], u);
  }
  const a = r(t, ["config"]);
  return a != null && l(o, ["generationConfig"], uT(e, a, o)), o;
}
function Bu(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  o != null && l(n, ["sdkHttpResponse"], o);
  const i = r(e, ["candidates"]);
  if (i != null) {
    let p = i;
    Array.isArray(p) && (p = p.map((f) => Mv(f))), l(n, ["candidates"], p);
  }
  const s = r(e, ["modelVersion"]);
  s != null && l(n, ["modelVersion"], s);
  const a = r(e, ["promptFeedback"]);
  a != null && l(n, ["promptFeedback"], a);
  const u = r(e, ["responseId"]);
  u != null && l(n, ["responseId"], u);
  const c = r(e, ["usageMetadata"]);
  c != null && l(n, ["usageMetadata"], c);
  const d = r(e, ["modelStatus"]);
  return d != null && l(n, ["modelStatus"], d), n;
}
function Gu(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  o != null && l(n, ["sdkHttpResponse"], o);
  const i = r(e, ["candidates"]);
  if (i != null) {
    let p = i;
    Array.isArray(p) && (p = p.map((f) => f)), l(n, ["candidates"], p);
  }
  const s = r(e, ["createTime"]);
  s != null && l(n, ["createTime"], s);
  const a = r(e, ["modelVersion"]);
  a != null && l(n, ["modelVersion"], a);
  const u = r(e, ["promptFeedback"]);
  u != null && l(n, ["promptFeedback"], u);
  const c = r(e, ["responseId"]);
  c != null && l(n, ["responseId"], c);
  const d = r(e, ["usageMetadata"]);
  return d != null && l(n, ["usageMetadata"], d), n;
}
function cT(e, t, n) {
  const o = {};
  if (r(e, ["outputGcsUri"]) !== void 0) throw new Error("outputGcsUri parameter is not supported in Gemini API.");
  if (r(e, ["negativePrompt"]) !== void 0) throw new Error("negativePrompt parameter is not supported in Gemini API.");
  const i = r(e, ["numberOfImages"]);
  t !== void 0 && i != null && l(t, ["parameters", "sampleCount"], i);
  const s = r(e, ["aspectRatio"]);
  t !== void 0 && s != null && l(t, ["parameters", "aspectRatio"], s);
  const a = r(e, ["guidanceScale"]);
  if (t !== void 0 && a != null && l(t, ["parameters", "guidanceScale"], a), r(e, ["seed"]) !== void 0) throw new Error("seed parameter is not supported in Gemini API.");
  const u = r(e, ["safetyFilterLevel"]);
  t !== void 0 && u != null && l(t, ["parameters", "safetySetting"], u);
  const c = r(e, ["personGeneration"]);
  t !== void 0 && c != null && l(t, ["parameters", "personGeneration"], c);
  const d = r(e, ["includeSafetyAttributes"]);
  t !== void 0 && d != null && l(t, ["parameters", "includeSafetyAttributes"], d);
  const p = r(e, ["includeRaiReason"]);
  t !== void 0 && p != null && l(t, ["parameters", "includeRaiReason"], p);
  const f = r(e, ["language"]);
  t !== void 0 && f != null && l(t, ["parameters", "language"], f);
  const h = r(e, ["outputMimeType"]);
  t !== void 0 && h != null && l(t, [
    "parameters",
    "outputOptions",
    "mimeType"
  ], h);
  const m = r(e, ["outputCompressionQuality"]);
  if (t !== void 0 && m != null && l(t, [
    "parameters",
    "outputOptions",
    "compressionQuality"
  ], m), r(e, ["addWatermark"]) !== void 0) throw new Error("addWatermark parameter is not supported in Gemini API.");
  if (r(e, ["labels"]) !== void 0) throw new Error("labels parameter is not supported in Gemini API.");
  const g = r(e, ["imageSize"]);
  if (t !== void 0 && g != null && l(t, ["parameters", "sampleImageSize"], g), r(e, ["enhancePrompt"]) !== void 0) throw new Error("enhancePrompt parameter is not supported in Gemini API.");
  return o;
}
function dT(e, t, n) {
  const o = {}, i = r(e, ["outputGcsUri"]);
  t !== void 0 && i != null && l(t, ["parameters", "storageUri"], i);
  const s = r(e, ["negativePrompt"]);
  t !== void 0 && s != null && l(t, ["parameters", "negativePrompt"], s);
  const a = r(e, ["numberOfImages"]);
  t !== void 0 && a != null && l(t, ["parameters", "sampleCount"], a);
  const u = r(e, ["aspectRatio"]);
  t !== void 0 && u != null && l(t, ["parameters", "aspectRatio"], u);
  const c = r(e, ["guidanceScale"]);
  t !== void 0 && c != null && l(t, ["parameters", "guidanceScale"], c);
  const d = r(e, ["seed"]);
  t !== void 0 && d != null && l(t, ["parameters", "seed"], d);
  const p = r(e, ["safetyFilterLevel"]);
  t !== void 0 && p != null && l(t, ["parameters", "safetySetting"], p);
  const f = r(e, ["personGeneration"]);
  t !== void 0 && f != null && l(t, ["parameters", "personGeneration"], f);
  const h = r(e, ["includeSafetyAttributes"]);
  t !== void 0 && h != null && l(t, ["parameters", "includeSafetyAttributes"], h);
  const m = r(e, ["includeRaiReason"]);
  t !== void 0 && m != null && l(t, ["parameters", "includeRaiReason"], m);
  const g = r(e, ["language"]);
  t !== void 0 && g != null && l(t, ["parameters", "language"], g);
  const y = r(e, ["outputMimeType"]);
  t !== void 0 && y != null && l(t, [
    "parameters",
    "outputOptions",
    "mimeType"
  ], y);
  const v = r(e, ["outputCompressionQuality"]);
  t !== void 0 && v != null && l(t, [
    "parameters",
    "outputOptions",
    "compressionQuality"
  ], v);
  const A = r(e, ["addWatermark"]);
  t !== void 0 && A != null && l(t, ["parameters", "addWatermark"], A);
  const C = r(e, ["labels"]);
  t !== void 0 && C != null && l(t, ["labels"], C);
  const R = r(e, ["imageSize"]);
  t !== void 0 && R != null && l(t, ["parameters", "sampleImageSize"], R);
  const M = r(e, ["enhancePrompt"]);
  return t !== void 0 && M != null && l(t, ["parameters", "enhancePrompt"], M), o;
}
function fT(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  i != null && l(o, ["_url", "model"], z(e, i));
  const s = r(t, ["prompt"]);
  s != null && l(o, ["instances[0]", "prompt"], s);
  const a = r(t, ["config"]);
  return a != null && cT(a, o), o;
}
function pT(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  i != null && l(o, ["_url", "model"], z(e, i));
  const s = r(t, ["prompt"]);
  s != null && l(o, ["instances[0]", "prompt"], s);
  const a = r(t, ["config"]);
  return a != null && dT(a, o), o;
}
function hT(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  o != null && l(n, ["sdkHttpResponse"], o);
  const i = r(e, ["predictions"]);
  if (i != null) {
    let a = i;
    Array.isArray(a) && (a = a.map((u) => IT(u))), l(n, ["generatedImages"], a);
  }
  const s = r(e, ["positivePromptSafetyAttributes"]);
  return s != null && l(n, ["positivePromptSafetyAttributes"], Sf(s)), n;
}
function mT(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  o != null && l(n, ["sdkHttpResponse"], o);
  const i = r(e, ["predictions"]);
  if (i != null) {
    let a = i;
    Array.isArray(a) && (a = a.map((u) => Di(u))), l(n, ["generatedImages"], a);
  }
  const s = r(e, ["positivePromptSafetyAttributes"]);
  return s != null && l(n, ["positivePromptSafetyAttributes"], Ef(s)), n;
}
function gT(e, t, n) {
  const o = {}, i = r(e, ["numberOfVideos"]);
  if (t !== void 0 && i != null && l(t, ["parameters", "sampleCount"], i), r(e, ["outputGcsUri"]) !== void 0) throw new Error("outputGcsUri parameter is not supported in Gemini API.");
  if (r(e, ["fps"]) !== void 0) throw new Error("fps parameter is not supported in Gemini API.");
  const s = r(e, ["durationSeconds"]);
  if (t !== void 0 && s != null && l(t, ["parameters", "durationSeconds"], s), r(e, ["seed"]) !== void 0) throw new Error("seed parameter is not supported in Gemini API.");
  const a = r(e, ["aspectRatio"]);
  t !== void 0 && a != null && l(t, ["parameters", "aspectRatio"], a);
  const u = r(e, ["resolution"]);
  t !== void 0 && u != null && l(t, ["parameters", "resolution"], u);
  const c = r(e, ["personGeneration"]);
  if (t !== void 0 && c != null && l(t, ["parameters", "personGeneration"], c), r(e, ["pubsubTopic"]) !== void 0) throw new Error("pubsubTopic parameter is not supported in Gemini API.");
  const d = r(e, ["negativePrompt"]);
  t !== void 0 && d != null && l(t, ["parameters", "negativePrompt"], d);
  const p = r(e, ["enhancePrompt"]);
  if (t !== void 0 && p != null && l(t, ["parameters", "enhancePrompt"], p), r(e, ["generateAudio"]) !== void 0) throw new Error("generateAudio parameter is not supported in Gemini API.");
  const f = r(e, ["lastFrame"]);
  t !== void 0 && f != null && l(t, ["instances[0]", "lastFrame"], Ui(f));
  const h = r(e, ["referenceImages"]);
  if (t !== void 0 && h != null) {
    let g = h;
    Array.isArray(g) && (g = g.map((y) => TS(y))), l(t, ["instances[0]", "referenceImages"], g);
  }
  if (r(e, ["mask"]) !== void 0) throw new Error("mask parameter is not supported in Gemini API.");
  if (r(e, ["compressionQuality"]) !== void 0) throw new Error("compressionQuality parameter is not supported in Gemini API.");
  if (r(e, ["labels"]) !== void 0) throw new Error("labels parameter is not supported in Gemini API.");
  const m = r(e, ["webhookConfig"]);
  return t !== void 0 && m != null && l(t, ["webhookConfig"], m), o;
}
function yT(e, t, n) {
  const o = {}, i = r(e, ["numberOfVideos"]);
  t !== void 0 && i != null && l(t, ["parameters", "sampleCount"], i);
  const s = r(e, ["outputGcsUri"]);
  t !== void 0 && s != null && l(t, ["parameters", "storageUri"], s);
  const a = r(e, ["fps"]);
  t !== void 0 && a != null && l(t, ["parameters", "fps"], a);
  const u = r(e, ["durationSeconds"]);
  t !== void 0 && u != null && l(t, ["parameters", "durationSeconds"], u);
  const c = r(e, ["seed"]);
  t !== void 0 && c != null && l(t, ["parameters", "seed"], c);
  const d = r(e, ["aspectRatio"]);
  t !== void 0 && d != null && l(t, ["parameters", "aspectRatio"], d);
  const p = r(e, ["resolution"]);
  t !== void 0 && p != null && l(t, ["parameters", "resolution"], p);
  const f = r(e, ["personGeneration"]);
  t !== void 0 && f != null && l(t, ["parameters", "personGeneration"], f);
  const h = r(e, ["pubsubTopic"]);
  t !== void 0 && h != null && l(t, ["parameters", "pubsubTopic"], h);
  const m = r(e, ["negativePrompt"]);
  t !== void 0 && m != null && l(t, ["parameters", "negativePrompt"], m);
  const g = r(e, ["enhancePrompt"]);
  t !== void 0 && g != null && l(t, ["parameters", "enhancePrompt"], g);
  const y = r(e, ["generateAudio"]);
  t !== void 0 && y != null && l(t, ["parameters", "generateAudio"], y);
  const v = r(e, ["lastFrame"]);
  t !== void 0 && v != null && l(t, ["instances[0]", "lastFrame"], ze(v));
  const A = r(e, ["referenceImages"]);
  if (t !== void 0 && A != null) {
    let x = A;
    Array.isArray(x) && (x = x.map((w) => SS(w))), l(t, ["instances[0]", "referenceImages"], x);
  }
  const C = r(e, ["mask"]);
  t !== void 0 && C != null && l(t, ["instances[0]", "mask"], vS(C));
  const R = r(e, ["compressionQuality"]);
  t !== void 0 && R != null && l(t, ["parameters", "compressionQuality"], R);
  const M = r(e, ["labels"]);
  if (t !== void 0 && M != null && l(t, ["labels"], M), r(e, ["webhookConfig"]) !== void 0) throw new Error("webhookConfig parameter is not supported in Vertex AI.");
  return o;
}
function _T(e, t) {
  const n = {}, o = r(e, ["name"]);
  o != null && l(n, ["name"], o);
  const i = r(e, ["metadata"]);
  i != null && l(n, ["metadata"], i);
  const s = r(e, ["done"]);
  s != null && l(n, ["done"], s);
  const a = r(e, ["error"]);
  a != null && l(n, ["error"], a);
  const u = r(e, ["response", "generateVideoResponse"]);
  return u != null && l(n, ["response"], ET(u)), n;
}
function vT(e, t) {
  const n = {}, o = r(e, ["name"]);
  o != null && l(n, ["name"], o);
  const i = r(e, ["metadata"]);
  i != null && l(n, ["metadata"], i);
  const s = r(e, ["done"]);
  s != null && l(n, ["done"], s);
  const a = r(e, ["error"]);
  a != null && l(n, ["error"], a);
  const u = r(e, ["response"]);
  return u != null && l(n, ["response"], wT(u)), n;
}
function TT(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  i != null && l(o, ["_url", "model"], z(e, i));
  const s = r(t, ["prompt"]);
  s != null && l(o, ["instances[0]", "prompt"], s);
  const a = r(t, ["image"]);
  a != null && l(o, ["instances[0]", "image"], Ui(a));
  const u = r(t, ["video"]);
  u != null && l(o, ["instances[0]", "video"], Af(u));
  const c = r(t, ["source"]);
  c != null && AT(c, o);
  const d = r(t, ["config"]);
  return d != null && gT(d, o), o;
}
function ST(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  i != null && l(o, ["_url", "model"], z(e, i));
  const s = r(t, ["prompt"]);
  s != null && l(o, ["instances[0]", "prompt"], s);
  const a = r(t, ["image"]);
  a != null && l(o, ["instances[0]", "image"], ze(a));
  const u = r(t, ["video"]);
  u != null && l(o, ["instances[0]", "video"], Cf(u));
  const c = r(t, ["source"]);
  c != null && CT(c, o);
  const d = r(t, ["config"]);
  return d != null && yT(d, o), o;
}
function ET(e, t) {
  const n = {}, o = r(e, ["generatedSamples"]);
  if (o != null) {
    let a = o;
    Array.isArray(a) && (a = a.map((u) => RT(u))), l(n, ["generatedVideos"], a);
  }
  const i = r(e, ["raiMediaFilteredCount"]);
  i != null && l(n, ["raiMediaFilteredCount"], i);
  const s = r(e, ["raiMediaFilteredReasons"]);
  return s != null && l(n, ["raiMediaFilteredReasons"], s), n;
}
function wT(e, t) {
  const n = {}, o = r(e, ["videos"]);
  if (o != null) {
    let a = o;
    Array.isArray(a) && (a = a.map((u) => PT(u))), l(n, ["generatedVideos"], a);
  }
  const i = r(e, ["raiMediaFilteredCount"]);
  i != null && l(n, ["raiMediaFilteredCount"], i);
  const s = r(e, ["raiMediaFilteredReasons"]);
  return s != null && l(n, ["raiMediaFilteredReasons"], s), n;
}
function AT(e, t, n) {
  const o = {}, i = r(e, ["prompt"]);
  t !== void 0 && i != null && l(t, ["instances[0]", "prompt"], i);
  const s = r(e, ["image"]);
  t !== void 0 && s != null && l(t, ["instances[0]", "image"], Ui(s));
  const a = r(e, ["video"]);
  return t !== void 0 && a != null && l(t, ["instances[0]", "video"], Af(a)), o;
}
function CT(e, t, n) {
  const o = {}, i = r(e, ["prompt"]);
  t !== void 0 && i != null && l(t, ["instances[0]", "prompt"], i);
  const s = r(e, ["image"]);
  t !== void 0 && s != null && l(t, ["instances[0]", "image"], ze(s));
  const a = r(e, ["video"]);
  return t !== void 0 && a != null && l(t, ["instances[0]", "video"], Cf(a)), o;
}
function IT(e, t) {
  const n = {}, o = r(e, ["_self"]);
  o != null && l(n, ["image"], $T(o));
  const i = r(e, ["raiFilteredReason"]);
  i != null && l(n, ["raiFilteredReason"], i);
  const s = r(e, ["_self"]);
  return s != null && l(n, ["safetyAttributes"], Sf(s)), n;
}
function Di(e, t) {
  const n = {}, o = r(e, ["_self"]);
  o != null && l(n, ["image"], Tf(o));
  const i = r(e, ["raiFilteredReason"]);
  i != null && l(n, ["raiFilteredReason"], i);
  const s = r(e, ["_self"]);
  s != null && l(n, ["safetyAttributes"], Ef(s));
  const a = r(e, ["prompt"]);
  return a != null && l(n, ["enhancedPrompt"], a), n;
}
function bT(e, t) {
  const n = {}, o = r(e, ["_self"]);
  o != null && l(n, ["mask"], Tf(o));
  const i = r(e, ["labels"]);
  if (i != null) {
    let s = i;
    Array.isArray(s) && (s = s.map((a) => a)), l(n, ["labels"], s);
  }
  return n;
}
function RT(e, t) {
  const n = {}, o = r(e, ["video"]);
  return o != null && l(n, ["video"], yS(o)), n;
}
function PT(e, t) {
  const n = {}, o = r(e, ["_self"]);
  return o != null && l(n, ["video"], _S(o)), n;
}
function xT(e, t) {
  const n = {}, o = r(e, ["modelSelectionConfig"]);
  o != null && l(n, ["modelConfig"], o);
  const i = r(e, ["responseJsonSchema"]);
  i != null && l(n, ["responseJsonSchema"], i);
  const s = r(e, ["audioTimestamp"]);
  s != null && l(n, ["audioTimestamp"], s);
  const a = r(e, ["candidateCount"]);
  a != null && l(n, ["candidateCount"], a);
  const u = r(e, ["enableAffectiveDialog"]);
  u != null && l(n, ["enableAffectiveDialog"], u);
  const c = r(e, ["frequencyPenalty"]);
  c != null && l(n, ["frequencyPenalty"], c);
  const d = r(e, ["logprobs"]);
  d != null && l(n, ["logprobs"], d);
  const p = r(e, ["maxOutputTokens"]);
  p != null && l(n, ["maxOutputTokens"], p);
  const f = r(e, ["mediaResolution"]);
  f != null && l(n, ["mediaResolution"], f);
  const h = r(e, ["presencePenalty"]);
  h != null && l(n, ["presencePenalty"], h);
  const m = r(e, ["responseLogprobs"]);
  m != null && l(n, ["responseLogprobs"], m);
  const g = r(e, ["responseMimeType"]);
  g != null && l(n, ["responseMimeType"], g);
  const y = r(e, ["responseModalities"]);
  y != null && l(n, ["responseModalities"], y);
  const v = r(e, ["responseSchema"]);
  v != null && l(n, ["responseSchema"], v);
  const A = r(e, ["routingConfig"]);
  A != null && l(n, ["routingConfig"], A);
  const C = r(e, ["seed"]);
  C != null && l(n, ["seed"], C);
  const R = r(e, ["speechConfig"]);
  R != null && l(n, ["speechConfig"], R);
  const M = r(e, ["stopSequences"]);
  M != null && l(n, ["stopSequences"], M);
  const x = r(e, ["temperature"]);
  x != null && l(n, ["temperature"], x);
  const w = r(e, ["thinkingConfig"]);
  w != null && l(n, ["thinkingConfig"], w);
  const L = r(e, ["topK"]);
  L != null && l(n, ["topK"], L);
  const P = r(e, ["topP"]);
  if (P != null && l(n, ["topP"], P), r(e, ["enableEnhancedCivicAnswers"]) !== void 0) throw new Error("enableEnhancedCivicAnswers parameter is not supported in Vertex AI.");
  return n;
}
function MT(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  return i != null && l(o, ["_url", "name"], z(e, i)), o;
}
function NT(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  return i != null && l(o, ["_url", "name"], z(e, i)), o;
}
function kT(e, t) {
  const n = {}, o = r(e, ["authConfig"]);
  o != null && l(n, ["authConfig"], Pv(o));
  const i = r(e, ["enableWidget"]);
  return i != null && l(n, ["enableWidget"], i), n;
}
function DT(e, t) {
  const n = {}, o = r(e, ["searchTypes"]);
  if (o != null && l(n, ["searchTypes"], o), r(e, ["blockingConfidence"]) !== void 0) throw new Error("blockingConfidence parameter is not supported in Gemini API.");
  if (r(e, ["excludeDomains"]) !== void 0) throw new Error("excludeDomains parameter is not supported in Gemini API.");
  const i = r(e, ["timeRangeFilter"]);
  return i != null && l(n, ["timeRangeFilter"], i), n;
}
function UT(e, t) {
  const n = {}, o = r(e, ["aspectRatio"]);
  o != null && l(n, ["aspectRatio"], o);
  const i = r(e, ["imageSize"]);
  if (i != null && l(n, ["imageSize"], i), r(e, ["personGeneration"]) !== void 0) throw new Error("personGeneration parameter is not supported in Gemini API.");
  if (r(e, ["prominentPeople"]) !== void 0) throw new Error("prominentPeople parameter is not supported in Gemini API.");
  if (r(e, ["outputMimeType"]) !== void 0) throw new Error("outputMimeType parameter is not supported in Gemini API.");
  if (r(e, ["outputCompressionQuality"]) !== void 0) throw new Error("outputCompressionQuality parameter is not supported in Gemini API.");
  if (r(e, ["imageOutputOptions"]) !== void 0) throw new Error("imageOutputOptions parameter is not supported in Gemini API.");
  return n;
}
function LT(e, t) {
  const n = {}, o = r(e, ["aspectRatio"]);
  o != null && l(n, ["aspectRatio"], o);
  const i = r(e, ["imageSize"]);
  i != null && l(n, ["imageSize"], i);
  const s = r(e, ["personGeneration"]);
  s != null && l(n, ["personGeneration"], s);
  const a = r(e, ["prominentPeople"]);
  a != null && l(n, ["prominentPeople"], a);
  const u = r(e, ["outputMimeType"]);
  u != null && l(n, ["imageOutputOptions", "mimeType"], u);
  const c = r(e, ["outputCompressionQuality"]);
  c != null && l(n, ["imageOutputOptions", "compressionQuality"], c);
  const d = r(e, ["imageOutputOptions"]);
  return d != null && l(n, ["imageOutputOptions"], d), n;
}
function $T(e, t) {
  const n = {}, o = r(e, ["bytesBase64Encoded"]);
  o != null && l(n, ["imageBytes"], Et(o));
  const i = r(e, ["mimeType"]);
  return i != null && l(n, ["mimeType"], i), n;
}
function Tf(e, t) {
  const n = {}, o = r(e, ["gcsUri"]);
  o != null && l(n, ["gcsUri"], o);
  const i = r(e, ["bytesBase64Encoded"]);
  i != null && l(n, ["imageBytes"], Et(i));
  const s = r(e, ["mimeType"]);
  return s != null && l(n, ["mimeType"], s), n;
}
function Ui(e, t) {
  const n = {};
  if (r(e, ["gcsUri"]) !== void 0) throw new Error("gcsUri parameter is not supported in Gemini API.");
  const o = r(e, ["imageBytes"]);
  o != null && l(n, ["bytesBase64Encoded"], Et(o));
  const i = r(e, ["mimeType"]);
  return i != null && l(n, ["mimeType"], i), n;
}
function ze(e, t) {
  const n = {}, o = r(e, ["gcsUri"]);
  o != null && l(n, ["gcsUri"], o);
  const i = r(e, ["imageBytes"]);
  i != null && l(n, ["bytesBase64Encoded"], Et(i));
  const s = r(e, ["mimeType"]);
  return s != null && l(n, ["mimeType"], s), n;
}
function FT(e, t, n, o) {
  const i = {}, s = r(t, ["pageSize"]);
  n !== void 0 && s != null && l(n, ["_query", "pageSize"], s);
  const a = r(t, ["pageToken"]);
  n !== void 0 && a != null && l(n, ["_query", "pageToken"], a);
  const u = r(t, ["filter"]);
  n !== void 0 && u != null && l(n, ["_query", "filter"], u);
  const c = r(t, ["queryBase"]);
  return n !== void 0 && c != null && l(n, ["_url", "models_url"], df(e, c)), i;
}
function BT(e, t, n, o) {
  const i = {}, s = r(t, ["pageSize"]);
  n !== void 0 && s != null && l(n, ["_query", "pageSize"], s);
  const a = r(t, ["pageToken"]);
  n !== void 0 && a != null && l(n, ["_query", "pageToken"], a);
  const u = r(t, ["filter"]);
  n !== void 0 && u != null && l(n, ["_query", "filter"], u);
  const c = r(t, ["queryBase"]);
  return n !== void 0 && c != null && l(n, ["_url", "models_url"], df(e, c)), i;
}
function GT(e, t, n) {
  const o = {}, i = r(t, ["config"]);
  return i != null && FT(e, i, o), o;
}
function OT(e, t, n) {
  const o = {}, i = r(t, ["config"]);
  return i != null && BT(e, i, o), o;
}
function qT(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  o != null && l(n, ["sdkHttpResponse"], o);
  const i = r(e, ["nextPageToken"]);
  i != null && l(n, ["nextPageToken"], i);
  const s = r(e, ["_self"]);
  if (s != null) {
    let a = ff(s);
    Array.isArray(a) && (a = a.map((u) => Ys(u))), l(n, ["models"], a);
  }
  return n;
}
function VT(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  o != null && l(n, ["sdkHttpResponse"], o);
  const i = r(e, ["nextPageToken"]);
  i != null && l(n, ["nextPageToken"], i);
  const s = r(e, ["_self"]);
  if (s != null) {
    let a = ff(s);
    Array.isArray(a) && (a = a.map((u) => zs(u))), l(n, ["models"], a);
  }
  return n;
}
function HT(e, t) {
  const n = {}, o = r(e, ["maskMode"]);
  o != null && l(n, ["maskMode"], o);
  const i = r(e, ["segmentationClasses"]);
  i != null && l(n, ["maskClasses"], i);
  const s = r(e, ["maskDilation"]);
  return s != null && l(n, ["dilation"], s), n;
}
function Ys(e, t) {
  const n = {}, o = r(e, ["name"]);
  o != null && l(n, ["name"], o);
  const i = r(e, ["displayName"]);
  i != null && l(n, ["displayName"], i);
  const s = r(e, ["description"]);
  s != null && l(n, ["description"], s);
  const a = r(e, ["version"]);
  a != null && l(n, ["version"], a);
  const u = r(e, ["_self"]);
  u != null && l(n, ["tunedModelInfo"], lS(u));
  const c = r(e, ["inputTokenLimit"]);
  c != null && l(n, ["inputTokenLimit"], c);
  const d = r(e, ["outputTokenLimit"]);
  d != null && l(n, ["outputTokenLimit"], d);
  const p = r(e, ["supportedGenerationMethods"]);
  p != null && l(n, ["supportedActions"], p);
  const f = r(e, ["temperature"]);
  f != null && l(n, ["temperature"], f);
  const h = r(e, ["maxTemperature"]);
  h != null && l(n, ["maxTemperature"], h);
  const m = r(e, ["topP"]);
  m != null && l(n, ["topP"], m);
  const g = r(e, ["topK"]);
  g != null && l(n, ["topK"], g);
  const y = r(e, ["thinking"]);
  return y != null && l(n, ["thinking"], y), n;
}
function zs(e, t) {
  const n = {}, o = r(e, ["name"]);
  o != null && l(n, ["name"], o);
  const i = r(e, ["displayName"]);
  i != null && l(n, ["displayName"], i);
  const s = r(e, ["description"]);
  s != null && l(n, ["description"], s);
  const a = r(e, ["versionId"]);
  a != null && l(n, ["version"], a);
  const u = r(e, ["deployedModels"]);
  if (u != null) {
    let h = u;
    Array.isArray(h) && (h = h.map((m) => oT(m))), l(n, ["endpoints"], h);
  }
  const c = r(e, ["labels"]);
  c != null && l(n, ["labels"], c);
  const d = r(e, ["_self"]);
  d != null && l(n, ["tunedModelInfo"], uS(d));
  const p = r(e, ["defaultCheckpointId"]);
  p != null && l(n, ["defaultCheckpointId"], p);
  const f = r(e, ["checkpoints"]);
  if (f != null) {
    let h = f;
    Array.isArray(h) && (h = h.map((m) => m)), l(n, ["checkpoints"], h);
  }
  return n;
}
function JT(e, t) {
  const n = {}, o = r(e, ["mediaResolution"]);
  o != null && l(n, ["mediaResolution"], o);
  const i = r(e, ["codeExecutionResult"]);
  i != null && l(n, ["codeExecutionResult"], i);
  const s = r(e, ["executableCode"]);
  s != null && l(n, ["executableCode"], s);
  const a = r(e, ["fileData"]);
  a != null && l(n, ["fileData"], iT(a));
  const u = r(e, ["functionCall"]);
  u != null && l(n, ["functionCall"], sT(u));
  const c = r(e, ["functionResponse"]);
  c != null && l(n, ["functionResponse"], c);
  const d = r(e, ["inlineData"]);
  d != null && l(n, ["inlineData"], xv(d));
  const p = r(e, ["text"]);
  p != null && l(n, ["text"], p);
  const f = r(e, ["thought"]);
  f != null && l(n, ["thought"], f);
  const h = r(e, ["thoughtSignature"]);
  h != null && l(n, ["thoughtSignature"], h);
  const m = r(e, ["videoMetadata"]);
  m != null && l(n, ["videoMetadata"], m);
  const g = r(e, ["toolCall"]);
  g != null && l(n, ["toolCall"], g);
  const y = r(e, ["toolResponse"]);
  y != null && l(n, ["toolResponse"], y);
  const v = r(e, ["partMetadata"]);
  return v != null && l(n, ["partMetadata"], v), n;
}
function WT(e, t) {
  const n = {}, o = r(e, ["mediaResolution"]);
  o != null && l(n, ["mediaResolution"], o);
  const i = r(e, ["codeExecutionResult"]);
  i != null && l(n, ["codeExecutionResult"], i);
  const s = r(e, ["executableCode"]);
  s != null && l(n, ["executableCode"], s);
  const a = r(e, ["fileData"]);
  a != null && l(n, ["fileData"], a);
  const u = r(e, ["functionCall"]);
  u != null && l(n, ["functionCall"], u);
  const c = r(e, ["functionResponse"]);
  c != null && l(n, ["functionResponse"], c);
  const d = r(e, ["inlineData"]);
  d != null && l(n, ["inlineData"], d);
  const p = r(e, ["text"]);
  p != null && l(n, ["text"], p);
  const f = r(e, ["thought"]);
  f != null && l(n, ["thought"], f);
  const h = r(e, ["thoughtSignature"]);
  h != null && l(n, ["thoughtSignature"], h);
  const m = r(e, ["videoMetadata"]);
  if (m != null && l(n, ["videoMetadata"], m), r(e, ["toolCall"]) !== void 0) throw new Error("toolCall parameter is not supported in Vertex AI.");
  if (r(e, ["toolResponse"]) !== void 0) throw new Error("toolResponse parameter is not supported in Vertex AI.");
  if (r(e, ["partMetadata"]) !== void 0) throw new Error("partMetadata parameter is not supported in Vertex AI.");
  return n;
}
function KT(e, t) {
  const n = {}, o = r(e, ["productImage"]);
  return o != null && l(n, ["image"], ze(o)), n;
}
function YT(e, t, n) {
  const o = {}, i = r(e, ["numberOfImages"]);
  t !== void 0 && i != null && l(t, ["parameters", "sampleCount"], i);
  const s = r(e, ["baseSteps"]);
  t !== void 0 && s != null && l(t, ["parameters", "baseSteps"], s);
  const a = r(e, ["outputGcsUri"]);
  t !== void 0 && a != null && l(t, ["parameters", "storageUri"], a);
  const u = r(e, ["seed"]);
  t !== void 0 && u != null && l(t, ["parameters", "seed"], u);
  const c = r(e, ["safetyFilterLevel"]);
  t !== void 0 && c != null && l(t, ["parameters", "safetySetting"], c);
  const d = r(e, ["personGeneration"]);
  t !== void 0 && d != null && l(t, ["parameters", "personGeneration"], d);
  const p = r(e, ["addWatermark"]);
  t !== void 0 && p != null && l(t, ["parameters", "addWatermark"], p);
  const f = r(e, ["outputMimeType"]);
  t !== void 0 && f != null && l(t, [
    "parameters",
    "outputOptions",
    "mimeType"
  ], f);
  const h = r(e, ["outputCompressionQuality"]);
  t !== void 0 && h != null && l(t, [
    "parameters",
    "outputOptions",
    "compressionQuality"
  ], h);
  const m = r(e, ["enhancePrompt"]);
  t !== void 0 && m != null && l(t, ["parameters", "enhancePrompt"], m);
  const g = r(e, ["labels"]);
  return t !== void 0 && g != null && l(t, ["labels"], g), o;
}
function zT(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  i != null && l(o, ["_url", "model"], z(e, i));
  const s = r(t, ["source"]);
  s != null && QT(s, o);
  const a = r(t, ["config"]);
  return a != null && YT(a, o), o;
}
function XT(e, t) {
  const n = {}, o = r(e, ["predictions"]);
  if (o != null) {
    let i = o;
    Array.isArray(i) && (i = i.map((s) => Di(s))), l(n, ["generatedImages"], i);
  }
  return n;
}
function QT(e, t, n) {
  const o = {}, i = r(e, ["prompt"]);
  t !== void 0 && i != null && l(t, ["instances[0]", "prompt"], i);
  const s = r(e, ["personImage"]);
  t !== void 0 && s != null && l(t, [
    "instances[0]",
    "personImage",
    "image"
  ], ze(s));
  const a = r(e, ["productImages"]);
  if (t !== void 0 && a != null) {
    let u = a;
    Array.isArray(u) && (u = u.map((c) => KT(c))), l(t, ["instances[0]", "productImages"], u);
  }
  return o;
}
function ZT(e, t) {
  const n = {}, o = r(e, ["referenceImage"]);
  o != null && l(n, ["referenceImage"], ze(o));
  const i = r(e, ["referenceId"]);
  i != null && l(n, ["referenceId"], i);
  const s = r(e, ["referenceType"]);
  s != null && l(n, ["referenceType"], s);
  const a = r(e, ["maskImageConfig"]);
  a != null && l(n, ["maskImageConfig"], HT(a));
  const u = r(e, ["controlImageConfig"]);
  u != null && l(n, ["controlImageConfig"], $v(u));
  const c = r(e, ["styleImageConfig"]);
  c != null && l(n, ["styleImageConfig"], c);
  const d = r(e, ["subjectImageConfig"]);
  return d != null && l(n, ["subjectImageConfig"], d), n;
}
function Sf(e, t) {
  const n = {}, o = r(e, ["safetyAttributes", "categories"]);
  o != null && l(n, ["categories"], o);
  const i = r(e, ["safetyAttributes", "scores"]);
  i != null && l(n, ["scores"], i);
  const s = r(e, ["contentType"]);
  return s != null && l(n, ["contentType"], s), n;
}
function Ef(e, t) {
  const n = {}, o = r(e, ["safetyAttributes", "categories"]);
  o != null && l(n, ["categories"], o);
  const i = r(e, ["safetyAttributes", "scores"]);
  i != null && l(n, ["scores"], i);
  const s = r(e, ["contentType"]);
  return s != null && l(n, ["contentType"], s), n;
}
function jT(e, t) {
  const n = {}, o = r(e, ["category"]);
  if (o != null && l(n, ["category"], o), r(e, ["method"]) !== void 0) throw new Error("method parameter is not supported in Gemini API.");
  const i = r(e, ["threshold"]);
  return i != null && l(n, ["threshold"], i), n;
}
function eS(e, t) {
  const n = {}, o = r(e, ["image"]);
  return o != null && l(n, ["image"], ze(o)), n;
}
function tS(e, t, n) {
  const o = {}, i = r(e, ["mode"]);
  t !== void 0 && i != null && l(t, ["parameters", "mode"], i);
  const s = r(e, ["maxPredictions"]);
  t !== void 0 && s != null && l(t, ["parameters", "maxPredictions"], s);
  const a = r(e, ["confidenceThreshold"]);
  t !== void 0 && a != null && l(t, ["parameters", "confidenceThreshold"], a);
  const u = r(e, ["maskDilation"]);
  t !== void 0 && u != null && l(t, ["parameters", "maskDilation"], u);
  const c = r(e, ["binaryColorThreshold"]);
  t !== void 0 && c != null && l(t, ["parameters", "binaryColorThreshold"], c);
  const d = r(e, ["labels"]);
  return t !== void 0 && d != null && l(t, ["labels"], d), o;
}
function nS(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  i != null && l(o, ["_url", "model"], z(e, i));
  const s = r(t, ["source"]);
  s != null && iS(s, o);
  const a = r(t, ["config"]);
  return a != null && tS(a, o), o;
}
function oS(e, t) {
  const n = {}, o = r(e, ["predictions"]);
  if (o != null) {
    let i = o;
    Array.isArray(i) && (i = i.map((s) => bT(s))), l(n, ["generatedMasks"], i);
  }
  return n;
}
function iS(e, t, n) {
  const o = {}, i = r(e, ["prompt"]);
  t !== void 0 && i != null && l(t, ["instances[0]", "prompt"], i);
  const s = r(e, ["image"]);
  t !== void 0 && s != null && l(t, ["instances[0]", "image"], ze(s));
  const a = r(e, ["scribbleImage"]);
  return t !== void 0 && a != null && l(t, ["instances[0]", "scribble"], eS(a)), o;
}
function sS(e, t) {
  const n = {}, o = r(e, ["retrievalConfig"]);
  o != null && l(n, ["retrievalConfig"], o);
  const i = r(e, ["functionCallingConfig"]);
  i != null && l(n, ["functionCallingConfig"], rT(i));
  const s = r(e, ["includeServerSideToolInvocations"]);
  return s != null && l(n, ["includeServerSideToolInvocations"], s), n;
}
function rS(e, t) {
  const n = {}, o = r(e, ["retrievalConfig"]);
  o != null && l(n, ["retrievalConfig"], o);
  const i = r(e, ["functionCallingConfig"]);
  if (i != null && l(n, ["functionCallingConfig"], i), r(e, ["includeServerSideToolInvocations"]) !== void 0) throw new Error("includeServerSideToolInvocations parameter is not supported in Vertex AI.");
  return n;
}
function aS(e, t) {
  const n = {};
  if (r(e, ["retrieval"]) !== void 0) throw new Error("retrieval parameter is not supported in Gemini API.");
  const o = r(e, ["computerUse"]);
  o != null && l(n, ["computerUse"], o);
  const i = r(e, ["fileSearch"]);
  i != null && l(n, ["fileSearch"], i);
  const s = r(e, ["googleSearch"]);
  s != null && l(n, ["googleSearch"], DT(s));
  const a = r(e, ["googleMaps"]);
  a != null && l(n, ["googleMaps"], kT(a));
  const u = r(e, ["codeExecution"]);
  if (u != null && l(n, ["codeExecution"], u), r(e, ["enterpriseWebSearch"]) !== void 0) throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");
  const c = r(e, ["functionDeclarations"]);
  if (c != null) {
    let h = c;
    Array.isArray(h) && (h = h.map((m) => m)), l(n, ["functionDeclarations"], h);
  }
  const d = r(e, ["googleSearchRetrieval"]);
  if (d != null && l(n, ["googleSearchRetrieval"], d), r(e, ["parallelAiSearch"]) !== void 0) throw new Error("parallelAiSearch parameter is not supported in Gemini API.");
  const p = r(e, ["urlContext"]);
  p != null && l(n, ["urlContext"], p);
  const f = r(e, ["mcpServers"]);
  if (f != null) {
    let h = f;
    Array.isArray(h) && (h = h.map((m) => m)), l(n, ["mcpServers"], h);
  }
  return n;
}
function wf(e, t) {
  const n = {}, o = r(e, ["retrieval"]);
  o != null && l(n, ["retrieval"], o);
  const i = r(e, ["computerUse"]);
  if (i != null && l(n, ["computerUse"], i), r(e, ["fileSearch"]) !== void 0) throw new Error("fileSearch parameter is not supported in Vertex AI.");
  const s = r(e, ["googleSearch"]);
  s != null && l(n, ["googleSearch"], s);
  const a = r(e, ["googleMaps"]);
  a != null && l(n, ["googleMaps"], a);
  const u = r(e, ["codeExecution"]);
  u != null && l(n, ["codeExecution"], u);
  const c = r(e, ["enterpriseWebSearch"]);
  c != null && l(n, ["enterpriseWebSearch"], c);
  const d = r(e, ["functionDeclarations"]);
  if (d != null) {
    let m = d;
    Array.isArray(m) && (m = m.map((g) => aT(g))), l(n, ["functionDeclarations"], m);
  }
  const p = r(e, ["googleSearchRetrieval"]);
  p != null && l(n, ["googleSearchRetrieval"], p);
  const f = r(e, ["parallelAiSearch"]);
  f != null && l(n, ["parallelAiSearch"], f);
  const h = r(e, ["urlContext"]);
  if (h != null && l(n, ["urlContext"], h), r(e, ["mcpServers"]) !== void 0) throw new Error("mcpServers parameter is not supported in Vertex AI.");
  return n;
}
function lS(e, t) {
  const n = {}, o = r(e, ["baseModel"]);
  o != null && l(n, ["baseModel"], o);
  const i = r(e, ["createTime"]);
  i != null && l(n, ["createTime"], i);
  const s = r(e, ["updateTime"]);
  return s != null && l(n, ["updateTime"], s), n;
}
function uS(e, t) {
  const n = {}, o = r(e, ["labels", "google-vertex-llm-tuning-base-model-id"]);
  o != null && l(n, ["baseModel"], o);
  const i = r(e, ["createTime"]);
  i != null && l(n, ["createTime"], i);
  const s = r(e, ["updateTime"]);
  return s != null && l(n, ["updateTime"], s), n;
}
function cS(e, t, n) {
  const o = {}, i = r(e, ["displayName"]);
  t !== void 0 && i != null && l(t, ["displayName"], i);
  const s = r(e, ["description"]);
  t !== void 0 && s != null && l(t, ["description"], s);
  const a = r(e, ["defaultCheckpointId"]);
  return t !== void 0 && a != null && l(t, ["defaultCheckpointId"], a), o;
}
function dS(e, t, n) {
  const o = {}, i = r(e, ["displayName"]);
  t !== void 0 && i != null && l(t, ["displayName"], i);
  const s = r(e, ["description"]);
  t !== void 0 && s != null && l(t, ["description"], s);
  const a = r(e, ["defaultCheckpointId"]);
  return t !== void 0 && a != null && l(t, ["defaultCheckpointId"], a), o;
}
function fS(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  i != null && l(o, ["_url", "name"], z(e, i));
  const s = r(t, ["config"]);
  return s != null && cS(s, o), o;
}
function pS(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  i != null && l(o, ["_url", "model"], z(e, i));
  const s = r(t, ["config"]);
  return s != null && dS(s, o), o;
}
function hS(e, t, n) {
  const o = {}, i = r(e, ["outputGcsUri"]);
  t !== void 0 && i != null && l(t, ["parameters", "storageUri"], i);
  const s = r(e, ["safetyFilterLevel"]);
  t !== void 0 && s != null && l(t, ["parameters", "safetySetting"], s);
  const a = r(e, ["personGeneration"]);
  t !== void 0 && a != null && l(t, ["parameters", "personGeneration"], a);
  const u = r(e, ["includeRaiReason"]);
  t !== void 0 && u != null && l(t, ["parameters", "includeRaiReason"], u);
  const c = r(e, ["outputMimeType"]);
  t !== void 0 && c != null && l(t, [
    "parameters",
    "outputOptions",
    "mimeType"
  ], c);
  const d = r(e, ["outputCompressionQuality"]);
  t !== void 0 && d != null && l(t, [
    "parameters",
    "outputOptions",
    "compressionQuality"
  ], d);
  const p = r(e, ["enhanceInputImage"]);
  t !== void 0 && p != null && l(t, [
    "parameters",
    "upscaleConfig",
    "enhanceInputImage"
  ], p);
  const f = r(e, ["imagePreservationFactor"]);
  t !== void 0 && f != null && l(t, [
    "parameters",
    "upscaleConfig",
    "imagePreservationFactor"
  ], f);
  const h = r(e, ["labels"]);
  t !== void 0 && h != null && l(t, ["labels"], h);
  const m = r(e, ["numberOfImages"]);
  t !== void 0 && m != null && l(t, ["parameters", "sampleCount"], m);
  const g = r(e, ["mode"]);
  return t !== void 0 && g != null && l(t, ["parameters", "mode"], g), o;
}
function mS(e, t, n) {
  const o = {}, i = r(t, ["model"]);
  i != null && l(o, ["_url", "model"], z(e, i));
  const s = r(t, ["image"]);
  s != null && l(o, ["instances[0]", "image"], ze(s));
  const a = r(t, ["upscaleFactor"]);
  a != null && l(o, [
    "parameters",
    "upscaleConfig",
    "upscaleFactor"
  ], a);
  const u = r(t, ["config"]);
  return u != null && hS(u, o), o;
}
function gS(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  o != null && l(n, ["sdkHttpResponse"], o);
  const i = r(e, ["predictions"]);
  if (i != null) {
    let s = i;
    Array.isArray(s) && (s = s.map((a) => Di(a))), l(n, ["generatedImages"], s);
  }
  return n;
}
function yS(e, t) {
  const n = {}, o = r(e, ["uri"]);
  o != null && l(n, ["uri"], o);
  const i = r(e, ["encodedVideo"]);
  i != null && l(n, ["videoBytes"], Et(i));
  const s = r(e, ["encoding"]);
  return s != null && l(n, ["mimeType"], s), n;
}
function _S(e, t) {
  const n = {}, o = r(e, ["gcsUri"]);
  o != null && l(n, ["uri"], o);
  const i = r(e, ["bytesBase64Encoded"]);
  i != null && l(n, ["videoBytes"], Et(i));
  const s = r(e, ["mimeType"]);
  return s != null && l(n, ["mimeType"], s), n;
}
function vS(e, t) {
  const n = {}, o = r(e, ["image"]);
  o != null && l(n, ["_self"], ze(o));
  const i = r(e, ["maskMode"]);
  return i != null && l(n, ["maskMode"], i), n;
}
function TS(e, t) {
  const n = {}, o = r(e, ["image"]);
  o != null && l(n, ["image"], Ui(o));
  const i = r(e, ["referenceType"]);
  return i != null && l(n, ["referenceType"], i), n;
}
function SS(e, t) {
  const n = {}, o = r(e, ["image"]);
  o != null && l(n, ["image"], ze(o));
  const i = r(e, ["referenceType"]);
  return i != null && l(n, ["referenceType"], i), n;
}
function Af(e, t) {
  const n = {}, o = r(e, ["uri"]);
  o != null && l(n, ["uri"], o);
  const i = r(e, ["videoBytes"]);
  i != null && l(n, ["encodedVideo"], Et(i));
  const s = r(e, ["mimeType"]);
  return s != null && l(n, ["encoding"], s), n;
}
function Cf(e, t) {
  const n = {}, o = r(e, ["uri"]);
  o != null && l(n, ["gcsUri"], o);
  const i = r(e, ["videoBytes"]);
  i != null && l(n, ["bytesBase64Encoded"], Et(i));
  const s = r(e, ["mimeType"]);
  return s != null && l(n, ["mimeType"], s), n;
}
function ES(e, t) {
  const n = {}, o = r(e, ["displayName"]);
  return t !== void 0 && o != null && l(t, ["displayName"], o), n;
}
function wS(e) {
  const t = {}, n = r(e, ["config"]);
  return n != null && ES(n, t), t;
}
function AS(e, t) {
  const n = {}, o = r(e, ["force"]);
  return t !== void 0 && o != null && l(t, ["_query", "force"], o), n;
}
function CS(e) {
  const t = {}, n = r(e, ["name"]);
  n != null && l(t, ["_url", "name"], n);
  const o = r(e, ["config"]);
  return o != null && AS(o, t), t;
}
function IS(e) {
  const t = {}, n = r(e, ["name"]);
  return n != null && l(t, ["_url", "name"], n), t;
}
function bS(e, t) {
  const n = {}, o = r(e, ["customMetadata"]);
  if (t !== void 0 && o != null) {
    let s = o;
    Array.isArray(s) && (s = s.map((a) => a)), l(t, ["customMetadata"], s);
  }
  const i = r(e, ["chunkingConfig"]);
  return t !== void 0 && i != null && l(t, ["chunkingConfig"], i), n;
}
function RS(e) {
  const t = {}, n = r(e, ["name"]);
  n != null && l(t, ["name"], n);
  const o = r(e, ["metadata"]);
  o != null && l(t, ["metadata"], o);
  const i = r(e, ["done"]);
  i != null && l(t, ["done"], i);
  const s = r(e, ["error"]);
  s != null && l(t, ["error"], s);
  const a = r(e, ["response"]);
  return a != null && l(t, ["response"], xS(a)), t;
}
function PS(e) {
  const t = {}, n = r(e, ["fileSearchStoreName"]);
  n != null && l(t, ["_url", "file_search_store_name"], n);
  const o = r(e, ["fileName"]);
  o != null && l(t, ["fileName"], o);
  const i = r(e, ["config"]);
  return i != null && bS(i, t), t;
}
function xS(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  n != null && l(t, ["sdkHttpResponse"], n);
  const o = r(e, ["parent"]);
  o != null && l(t, ["parent"], o);
  const i = r(e, ["documentName"]);
  return i != null && l(t, ["documentName"], i), t;
}
function MS(e, t) {
  const n = {}, o = r(e, ["pageSize"]);
  t !== void 0 && o != null && l(t, ["_query", "pageSize"], o);
  const i = r(e, ["pageToken"]);
  return t !== void 0 && i != null && l(t, ["_query", "pageToken"], i), n;
}
function NS(e) {
  const t = {}, n = r(e, ["config"]);
  return n != null && MS(n, t), t;
}
function kS(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  n != null && l(t, ["sdkHttpResponse"], n);
  const o = r(e, ["nextPageToken"]);
  o != null && l(t, ["nextPageToken"], o);
  const i = r(e, ["fileSearchStores"]);
  if (i != null) {
    let s = i;
    Array.isArray(s) && (s = s.map((a) => a)), l(t, ["fileSearchStores"], s);
  }
  return t;
}
function If(e, t) {
  const n = {}, o = r(e, ["mimeType"]);
  t !== void 0 && o != null && l(t, ["mimeType"], o);
  const i = r(e, ["displayName"]);
  t !== void 0 && i != null && l(t, ["displayName"], i);
  const s = r(e, ["customMetadata"]);
  if (t !== void 0 && s != null) {
    let u = s;
    Array.isArray(u) && (u = u.map((c) => c)), l(t, ["customMetadata"], u);
  }
  const a = r(e, ["chunkingConfig"]);
  return t !== void 0 && a != null && l(t, ["chunkingConfig"], a), n;
}
function DS(e) {
  const t = {}, n = r(e, ["fileSearchStoreName"]);
  n != null && l(t, ["_url", "file_search_store_name"], n);
  const o = r(e, ["config"]);
  return o != null && If(o, t), t;
}
function US(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  return n != null && l(t, ["sdkHttpResponse"], n), t;
}
var LS = "Content-Type", $S = "X-Server-Timeout", FS = "User-Agent", Xs = "x-goog-api-client", BS = "google-genai-sdk/1.50.1", GS = "v1beta1", OS = "v1beta", qS = /* @__PURE__ */ new Set(["us", "eu"]), VS = 5, HS = [
  408,
  429,
  500,
  502,
  503,
  504
], JS = class {
  constructor(e) {
    var t, n, o;
    this.clientOptions = Object.assign({}, e), this.customBaseUrl = (t = e.httpOptions) === null || t === void 0 ? void 0 : t.baseUrl, this.clientOptions.vertexai && (this.clientOptions.project && this.clientOptions.location ? this.clientOptions.apiKey = void 0 : this.clientOptions.apiKey && (this.clientOptions.project = void 0, this.clientOptions.location = void 0));
    const i = {};
    if (this.clientOptions.vertexai) {
      if (!this.clientOptions.location && !this.clientOptions.apiKey && !this.customBaseUrl && (this.clientOptions.location = "global"), !(this.clientOptions.project && this.clientOptions.location || this.clientOptions.apiKey) && !this.customBaseUrl) throw new Error("Authentication is not set up. Please provide either a project and location, or an API key, or a custom base URL.");
      const s = e.project && e.location || !!e.apiKey;
      this.customBaseUrl && !s ? (i.baseUrl = this.customBaseUrl, this.clientOptions.project = void 0, this.clientOptions.location = void 0) : this.clientOptions.apiKey || this.clientOptions.location === "global" ? i.baseUrl = "https://aiplatform.googleapis.com/" : this.clientOptions.project && this.clientOptions.location && qS.has(this.clientOptions.location) ? i.baseUrl = `https://aiplatform.${this.clientOptions.location}.rep.googleapis.com/` : this.clientOptions.project && this.clientOptions.location && (i.baseUrl = `https://${this.clientOptions.location}-aiplatform.googleapis.com/`), i.apiVersion = (n = this.clientOptions.apiVersion) !== null && n !== void 0 ? n : GS;
    } else
      this.clientOptions.apiKey || console.warn("API key should be set when using the Gemini API."), i.apiVersion = (o = this.clientOptions.apiVersion) !== null && o !== void 0 ? o : OS, i.baseUrl = "https://generativelanguage.googleapis.com/";
    i.headers = this.getDefaultHeaders(), this.clientOptions.httpOptions = i, e.httpOptions && (this.clientOptions.httpOptions = this.patchHttpOptions(i, e.httpOptions));
  }
  isVertexAI() {
    var e;
    return (e = this.clientOptions.vertexai) !== null && e !== void 0 ? e : !1;
  }
  getProject() {
    return this.clientOptions.project;
  }
  getLocation() {
    return this.clientOptions.location;
  }
  getCustomBaseUrl() {
    return this.customBaseUrl;
  }
  async getAuthHeaders() {
    const e = new Headers();
    return await this.clientOptions.auth.addAuthHeaders(e), e;
  }
  getApiVersion() {
    if (this.clientOptions.httpOptions && this.clientOptions.httpOptions.apiVersion !== void 0) return this.clientOptions.httpOptions.apiVersion;
    throw new Error("API version is not set.");
  }
  getBaseUrl() {
    if (this.clientOptions.httpOptions && this.clientOptions.httpOptions.baseUrl !== void 0) return this.clientOptions.httpOptions.baseUrl;
    throw new Error("Base URL is not set.");
  }
  getRequestUrl() {
    return this.getRequestUrlInternal(this.clientOptions.httpOptions);
  }
  getHeaders() {
    if (this.clientOptions.httpOptions && this.clientOptions.httpOptions.headers !== void 0) return this.clientOptions.httpOptions.headers;
    throw new Error("Headers are not set.");
  }
  getRequestUrlInternal(e) {
    if (!e || e.baseUrl === void 0 || e.apiVersion === void 0) throw new Error("HTTP options are not correctly set.");
    const t = [e.baseUrl.endsWith("/") ? e.baseUrl.slice(0, -1) : e.baseUrl];
    return e.apiVersion && e.apiVersion !== "" && t.push(e.apiVersion), t.join("/");
  }
  getBaseResourcePath() {
    return `projects/${this.clientOptions.project}/locations/${this.clientOptions.location}`;
  }
  getApiKey() {
    return this.clientOptions.apiKey;
  }
  getWebsocketBaseUrl() {
    const e = this.getBaseUrl(), t = new URL(e);
    return t.protocol = t.protocol == "http:" ? "ws" : "wss", t.toString();
  }
  setBaseUrl(e) {
    if (this.clientOptions.httpOptions) this.clientOptions.httpOptions.baseUrl = e;
    else throw new Error("HTTP options are not correctly set.");
  }
  constructUrl(e, t, n) {
    const o = [this.getRequestUrlInternal(t)];
    return n && o.push(this.getBaseResourcePath()), e !== "" && o.push(e), new URL(`${o.join("/")}`);
  }
  shouldPrependVertexProjectPath(e, t) {
    return !(t.baseUrl && t.baseUrlResourceScope === Hs.COLLECTION || this.clientOptions.apiKey || !this.clientOptions.vertexai || e.path.startsWith("projects/") || e.httpMethod === "GET" && e.path.startsWith("publishers/google/models"));
  }
  async request(e) {
    let t = this.clientOptions.httpOptions;
    e.httpOptions && (t = this.patchHttpOptions(this.clientOptions.httpOptions, e.httpOptions));
    const n = this.shouldPrependVertexProjectPath(e, t), o = this.constructUrl(e.path, t, n);
    if (e.queryParams) for (const [s, a] of Object.entries(e.queryParams)) o.searchParams.append(s, String(a));
    let i = {};
    if (e.httpMethod === "GET") {
      if (e.body && e.body !== "{}") throw new Error("Request body should be empty for GET request, but got non empty request body");
    } else i.body = e.body;
    return i = await this.includeExtraHttpOptionsToRequestInit(i, t, o.toString(), e.abortSignal), this.unaryApiCall(o, i, e.httpMethod);
  }
  patchHttpOptions(e, t) {
    const n = JSON.parse(JSON.stringify(e));
    for (const [o, i] of Object.entries(t)) typeof i == "object" ? n[o] = Object.assign(Object.assign({}, n[o]), i) : i !== void 0 && (n[o] = i);
    return n;
  }
  async requestStream(e) {
    let t = this.clientOptions.httpOptions;
    e.httpOptions && (t = this.patchHttpOptions(this.clientOptions.httpOptions, e.httpOptions));
    const n = this.shouldPrependVertexProjectPath(e, t), o = this.constructUrl(e.path, t, n);
    (!o.searchParams.has("alt") || o.searchParams.get("alt") !== "sse") && o.searchParams.set("alt", "sse");
    let i = {};
    return i.body = e.body, i = await this.includeExtraHttpOptionsToRequestInit(i, t, o.toString(), e.abortSignal), this.streamApiCall(o, i, e.httpMethod);
  }
  async includeExtraHttpOptionsToRequestInit(e, t, n, o) {
    if (t && t.timeout || o) {
      const i = new AbortController(), s = i.signal;
      if (t.timeout && t?.timeout > 0) {
        const a = setTimeout(() => i.abort(), t.timeout);
        a && typeof a.unref == "function" && a.unref();
      }
      o && o.addEventListener("abort", () => {
        i.abort();
      }), e.signal = s;
    }
    return t && t.extraBody !== null && WS(e, t.extraBody), e.headers = await this.getHeadersInternal(t, n), e;
  }
  async unaryApiCall(e, t, n) {
    return this.apiCall(e.toString(), Object.assign(Object.assign({}, t), { method: n })).then(async (o) => (await Ou(o), new Js(o))).catch((o) => {
      throw o instanceof Error ? o : new Error(JSON.stringify(o));
    });
  }
  async streamApiCall(e, t, n) {
    return this.apiCall(e.toString(), Object.assign(Object.assign({}, t), { method: n })).then(async (o) => (await Ou(o), this.processStreamResponse(o))).catch((o) => {
      throw o instanceof Error ? o : new Error(JSON.stringify(o));
    });
  }
  processStreamResponse(e) {
    return Ke(this, arguments, function* () {
      var n;
      const o = (n = e?.body) === null || n === void 0 ? void 0 : n.getReader(), i = new TextDecoder("utf-8");
      if (!o) throw new Error("Response body is empty");
      try {
        let s = "";
        const a = "data:", u = [
          `

`,
          "\r\r",
          `\r
\r
`
        ];
        for (; ; ) {
          const { done: c, value: d } = yield J(o.read());
          if (c) {
            if (s.trim().length > 0) throw new Error("Incomplete JSON segment at the end");
            break;
          }
          const p = i.decode(d, { stream: !0 });
          try {
            const m = JSON.parse(p);
            if ("error" in m) {
              const g = JSON.parse(JSON.stringify(m.error)), y = g.status, v = g.code, A = `got status: ${y}. ${JSON.stringify(m)}`;
              if (v >= 400 && v < 600) throw new _f({
                message: A,
                status: v
              });
            }
          } catch (m) {
            if (m.name === "ApiError") throw m;
          }
          s += p;
          let f = -1, h = 0;
          for (; ; ) {
            f = -1, h = 0;
            for (const y of u) {
              const v = s.indexOf(y);
              v !== -1 && (f === -1 || v < f) && (f = v, h = y.length);
            }
            if (f === -1) break;
            const m = s.substring(0, f);
            s = s.substring(f + h);
            const g = m.trim();
            if (g.startsWith(a)) {
              const y = g.substring(5).trim();
              try {
                yield yield J(new Js(new Response(y, {
                  headers: e?.headers,
                  status: e?.status,
                  statusText: e?.statusText
                })));
              } catch (v) {
                throw new Error(`exception parsing stream chunk ${y}. ${v}`);
              }
            }
          }
        }
      } finally {
        o.releaseLock();
      }
    });
  }
  async apiCall(e, t) {
    var n;
    if (!this.clientOptions.httpOptions || !this.clientOptions.httpOptions.retryOptions) return fetch(e, t);
    const o = this.clientOptions.httpOptions.retryOptions, i = async () => {
      const s = await fetch(e, t);
      if (s.ok) return s;
      throw HS.includes(s.status) ? new Error(`Retryable HTTP Error: ${s.statusText}`) : new pl.AbortError(`Non-retryable exception ${s.statusText} sending request`);
    };
    return (0, pl.default)(i, { retries: ((n = o.attempts) !== null && n !== void 0 ? n : VS) - 1 });
  }
  getDefaultHeaders() {
    const e = {}, t = BS + " " + this.clientOptions.userAgentExtra;
    return e[FS] = t, e[Xs] = t, e[LS] = "application/json", e;
  }
  async getHeadersInternal(e, t) {
    const n = new Headers();
    if (e && e.headers) {
      for (const [o, i] of Object.entries(e.headers)) n.append(o, i);
      e.timeout && e.timeout > 0 && n.append($S, String(Math.ceil(e.timeout / 1e3)));
    }
    return await this.clientOptions.auth.addAuthHeaders(n, t), n;
  }
  getFileName(e) {
    var t;
    let n = "";
    return typeof e == "string" && (n = e.replace(/[/\\]+$/, ""), n = (t = n.split(/[/\\]/).pop()) !== null && t !== void 0 ? t : ""), n;
  }
  async uploadFile(e, t) {
    var n;
    const o = {};
    t != null && (o.mimeType = t.mimeType, o.name = t.name, o.displayName = t.displayName), o.name && !o.name.startsWith("files/") && (o.name = `files/${o.name}`);
    const i = this.clientOptions.uploader, s = await i.stat(e);
    o.sizeBytes = String(s.size);
    const a = (n = t?.mimeType) !== null && n !== void 0 ? n : s.type;
    if (a === void 0 || a === "") throw new Error("Can not determine mimeType. Please provide mimeType in the config.");
    o.mimeType = a;
    const u = { file: o }, c = this.getFileName(e), d = k("upload/v1beta/files", u._url), p = await this.fetchUploadUrl(d, o.sizeBytes, o.mimeType, c, u, t?.httpOptions);
    return i.upload(e, p, this);
  }
  async uploadFileToFileSearchStore(e, t, n) {
    var o;
    const i = this.clientOptions.uploader, s = await i.stat(t), a = String(s.size), u = (o = n?.mimeType) !== null && o !== void 0 ? o : s.type;
    if (u === void 0 || u === "") throw new Error("Can not determine mimeType. Please provide mimeType in the config.");
    const c = `upload/v1beta/${e}:uploadToFileSearchStore`, d = this.getFileName(t), p = {};
    n != null && If(n, p);
    const f = await this.fetchUploadUrl(c, a, u, d, p, n?.httpOptions);
    return i.uploadToFileSearchStore(t, f, this);
  }
  async downloadFile(e) {
    await this.clientOptions.downloader.download(e, this);
  }
  async fetchUploadUrl(e, t, n, o, i, s) {
    var a;
    let u = {};
    s ? u = s : u = {
      apiVersion: "",
      headers: Object.assign({
        "Content-Type": "application/json",
        "X-Goog-Upload-Protocol": "resumable",
        "X-Goog-Upload-Command": "start",
        "X-Goog-Upload-Header-Content-Length": `${t}`,
        "X-Goog-Upload-Header-Content-Type": `${n}`
      }, o ? { "X-Goog-Upload-File-Name": o } : {})
    };
    const c = await this.request({
      path: e,
      body: JSON.stringify(i),
      httpMethod: "POST",
      httpOptions: u
    });
    if (!c || !c?.headers) throw new Error("Server did not return an HttpResponse or the returned HttpResponse did not have headers.");
    const d = (a = c?.headers) === null || a === void 0 ? void 0 : a["x-goog-upload-url"];
    if (d === void 0) throw new Error("Failed to get upload url. Server did not return the x-google-upload-url in the headers");
    return d;
  }
};
async function Ou(e) {
  var t;
  if (e === void 0) throw new Error("response is undefined");
  if (!e.ok) {
    const n = e.status;
    let o;
    !((t = e.headers.get("content-type")) === null || t === void 0) && t.includes("application/json") ? o = await e.json() : o = { error: {
      message: await e.text(),
      code: e.status,
      status: e.statusText
    } };
    const i = JSON.stringify(o);
    throw n >= 400 && n < 600 ? new _f({
      message: i,
      status: n
    }) : new Error(i);
  }
}
function WS(e, t) {
  if (!t || Object.keys(t).length === 0) return;
  if (e.body instanceof Blob) {
    console.warn("includeExtraBodyToRequestInit: extraBody provided but current request body is a Blob. extraBody will be ignored as merging is not supported for Blob bodies.");
    return;
  }
  let n = {};
  if (typeof e.body == "string" && e.body.length > 0) try {
    const s = JSON.parse(e.body);
    if (typeof s == "object" && s !== null && !Array.isArray(s)) n = s;
    else {
      console.warn("includeExtraBodyToRequestInit: Original request body is valid JSON but not a non-array object. Skip applying extraBody to the request body.");
      return;
    }
  } catch {
    console.warn("includeExtraBodyToRequestInit: Original request body is not valid JSON. Skip applying extraBody to the request body.");
    return;
  }
  function o(s, a) {
    const u = Object.assign({}, s);
    for (const c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
      const d = a[c], p = u[c];
      d && typeof d == "object" && !Array.isArray(d) && p && typeof p == "object" && !Array.isArray(p) ? u[c] = o(p, d) : (p && d && typeof p != typeof d && console.warn(`includeExtraBodyToRequestInit:deepMerge: Type mismatch for key "${c}". Original type: ${typeof p}, New type: ${typeof d}. Overwriting.`), u[c] = d);
    }
    return u;
  }
  const i = o(n, t);
  e.body = JSON.stringify(i);
}
var KS = "mcp_used/unknown", YS = !1;
function bf(e) {
  for (const t of e)
    if (zS(t) || typeof t == "object" && "inputSchema" in t) return !0;
  return YS;
}
function Rf(e) {
  var t;
  e[Xs] = (((t = e[Xs]) !== null && t !== void 0 ? t : "") + ` ${KS}`).trimStart();
}
function zS(e) {
  return e !== null && typeof e == "object" && e instanceof QS;
}
function XS(e) {
  return Ke(this, arguments, function* (n, o = 100) {
    let i, s = 0;
    for (; s < o; ) {
      const a = yield J(n.listTools({ cursor: i }));
      for (const u of a.tools)
        yield yield J(u), s++;
      if (!a.nextCursor) break;
      i = a.nextCursor;
    }
  });
}
var QS = class Pf {
  constructor(t = [], n) {
    this.mcpTools = [], this.functionNameToMcpClient = {}, this.mcpClients = t, this.config = n;
  }
  static create(t, n) {
    return new Pf(t, n);
  }
  async initialize() {
    var t, n, o, i;
    if (this.mcpTools.length > 0) return;
    const s = {}, a = [];
    for (const p of this.mcpClients) try {
      for (var u = !0, c = (n = void 0, Ye(XS(p))), d; d = await c.next(), t = d.done, !t; u = !0) {
        i = d.value, u = !1;
        const f = i;
        a.push(f);
        const h = f.name;
        if (s[h]) throw new Error(`Duplicate function name ${h} found in MCP tools. Please ensure function names are unique.`);
        s[h] = p;
      }
    } catch (f) {
      n = { error: f };
    } finally {
      try {
        !u && !t && (o = c.return) && await o.call(c);
      } finally {
        if (n) throw n.error;
      }
    }
    this.mcpTools = a, this.functionNameToMcpClient = s;
  }
  async tool() {
    return await this.initialize(), dy(this.mcpTools, this.config);
  }
  async callTool(t) {
    await this.initialize();
    const n = [];
    for (const o of t) if (o.name in this.functionNameToMcpClient) {
      const i = this.functionNameToMcpClient[o.name];
      let s;
      this.config.timeout && (s = { timeout: this.config.timeout });
      const a = await i.callTool({
        name: o.name,
        arguments: o.args
      }, void 0, s);
      n.push({ functionResponse: {
        name: o.name,
        response: a.isError ? { error: a } : a
      } });
    }
    return n;
  }
};
async function ZS(e, t, n) {
  const o = new ny();
  let i;
  n.data instanceof Blob ? i = JSON.parse(await n.data.text()) : i = JSON.parse(n.data), Object.assign(o, i), t(o);
}
var jS = class {
  constructor(e, t, n) {
    this.apiClient = e, this.auth = t, this.webSocketFactory = n;
  }
  async connect(e) {
    var t, n;
    if (this.apiClient.isVertexAI()) throw new Error("Live music is not supported for Vertex AI.");
    console.warn("Live music generation is experimental and may change in future versions.");
    const o = this.apiClient.getWebsocketBaseUrl(), i = this.apiClient.getApiVersion(), s = nE(this.apiClient.getDefaultHeaders()), a = `${o}/ws/google.ai.generativelanguage.${i}.GenerativeService.BidiGenerateMusic?key=${this.apiClient.getApiKey()}`;
    let u = () => {
    };
    const c = new Promise((y) => {
      u = y;
    }), d = e.callbacks, p = function() {
      u({});
    }, f = this.apiClient, h = {
      onopen: p,
      onmessage: (y) => {
        ZS(f, d.onmessage, y);
      },
      onerror: (t = d?.onerror) !== null && t !== void 0 ? t : function(y) {
      },
      onclose: (n = d?.onclose) !== null && n !== void 0 ? n : function(y) {
      }
    }, m = this.webSocketFactory.create(a, tE(s), h);
    m.connect(), await c;
    const g = { setup: { model: z(this.apiClient, e.model) } };
    return m.send(JSON.stringify(g)), new eE(m, this.apiClient);
  }
}, eE = class {
  constructor(e, t) {
    this.conn = e, this.apiClient = t;
  }
  async setWeightedPrompts(e) {
    if (!e.weightedPrompts || Object.keys(e.weightedPrompts).length === 0) throw new Error("Weighted prompts must be set and contain at least one entry.");
    const t = yv(e);
    this.conn.send(JSON.stringify({ clientContent: t }));
  }
  async setMusicGenerationConfig(e) {
    e.musicGenerationConfig || (e.musicGenerationConfig = {});
    const t = gv(e);
    this.conn.send(JSON.stringify(t));
  }
  sendPlaybackControl(e) {
    const t = { playbackControl: e };
    this.conn.send(JSON.stringify(t));
  }
  play() {
    this.sendPlaybackControl(tn.PLAY);
  }
  pause() {
    this.sendPlaybackControl(tn.PAUSE);
  }
  stop() {
    this.sendPlaybackControl(tn.STOP);
  }
  resetContext() {
    this.sendPlaybackControl(tn.RESET_CONTEXT);
  }
  close() {
    this.conn.close();
  }
};
function tE(e) {
  const t = {};
  return e.forEach((n, o) => {
    t[o] = n;
  }), t;
}
function nE(e) {
  const t = new Headers();
  for (const [n, o] of Object.entries(e)) t.append(n, o);
  return t;
}
var oE = "FunctionResponse request must have an `id` field from the response of a ToolCall.FunctionalCalls in Google AI.";
async function iE(e, t, n) {
  const o = new ty();
  let i;
  n.data instanceof Blob ? i = await n.data.text() : n.data instanceof ArrayBuffer ? i = new TextDecoder().decode(n.data) : i = n.data;
  const s = JSON.parse(i);
  if (e.isVertexAI()) {
    const a = Tv(s);
    Object.assign(o, a);
  } else Object.assign(o, s);
  t(o);
}
var sE = class {
  constructor(e, t, n) {
    this.apiClient = e, this.auth = t, this.webSocketFactory = n, this.music = new jS(this.apiClient, this.auth, this.webSocketFactory);
  }
  async connect(e) {
    var t, n, o, i, s, a;
    if (e.config && e.config.httpOptions) throw new Error("The Live module does not support httpOptions at request-level in LiveConnectConfig yet. Please use the client-level httpOptions configuration instead.");
    const u = this.apiClient.getWebsocketBaseUrl(), c = this.apiClient.getApiVersion();
    let d;
    const p = this.apiClient.getHeaders();
    e.config && e.config.tools && bf(e.config.tools) && Rf(p);
    const f = uE(p);
    if (this.apiClient.isVertexAI()) {
      const P = this.apiClient.getProject(), N = this.apiClient.getLocation(), V = this.apiClient.getApiKey(), Y = !!P && !!N || !!V;
      this.apiClient.getCustomBaseUrl() && !Y ? d = u : (d = `${u}/ws/google.cloud.aiplatform.${c}.LlmBidiService/BidiGenerateContent`, await this.auth.addAuthHeaders(f, d));
    } else {
      const P = this.apiClient.getApiKey();
      let N = "BidiGenerateContent", V = "key";
      P?.startsWith("auth_tokens/") && (console.warn("Warning: Ephemeral token support is experimental and may change in future versions."), c !== "v1alpha" && console.warn("Warning: The SDK's ephemeral token support is in v1alpha only. Please use const ai = new GoogleGenAI({apiKey: token.name, httpOptions: { apiVersion: 'v1alpha' }}); before session connection."), N = "BidiGenerateContentConstrained", V = "access_token"), d = `${u}/ws/google.ai.generativelanguage.${c}.GenerativeService.${N}?${V}=${P}`;
    }
    let h = () => {
    };
    const m = new Promise((P) => {
      h = P;
    }), g = e.callbacks, y = function() {
      var P;
      (P = g?.onopen) === null || P === void 0 || P.call(g), h({});
    }, v = this.apiClient, A = {
      onopen: y,
      onmessage: (P) => {
        iE(v, g.onmessage, P);
      },
      onerror: (t = g?.onerror) !== null && t !== void 0 ? t : function(P) {
      },
      onclose: (n = g?.onclose) !== null && n !== void 0 ? n : function(P) {
      }
    }, C = this.webSocketFactory.create(d, lE(f), A);
    C.connect(), await m;
    let R = z(this.apiClient, e.model);
    if (this.apiClient.isVertexAI() && R.startsWith("publishers/")) {
      const P = this.apiClient.getProject(), N = this.apiClient.getLocation();
      P && N && (R = `projects/${P}/locations/${N}/` + R);
    }
    let M = {};
    this.apiClient.isVertexAI() && ((o = e.config) === null || o === void 0 ? void 0 : o.responseModalities) === void 0 && (e.config === void 0 ? e.config = { responseModalities: [gi.AUDIO] } : e.config.responseModalities = [gi.AUDIO]), !((i = e.config) === null || i === void 0) && i.generationConfig && console.warn("Setting `LiveConnectConfig.generation_config` is deprecated, please set the fields on `LiveConnectConfig` directly. This will become an error in a future version (not before Q3 2025).");
    const x = (a = (s = e.config) === null || s === void 0 ? void 0 : s.tools) !== null && a !== void 0 ? a : [], w = [];
    for (const P of x) if (this.isCallableTool(P)) {
      const N = P;
      w.push(await N.tool());
    } else w.push(P);
    w.length > 0 && (e.config.tools = w);
    const L = {
      model: R,
      config: e.config,
      callbacks: e.callbacks
    };
    return this.apiClient.isVertexAI() ? M = mv(this.apiClient, L) : M = hv(this.apiClient, L), delete M.config, C.send(JSON.stringify(M)), new aE(C, this.apiClient);
  }
  isCallableTool(e) {
    return "callTool" in e && typeof e.callTool == "function";
  }
}, rE = { turnComplete: !0 }, aE = class {
  constructor(e, t) {
    this.conn = e, this.apiClient = t;
  }
  tLiveClientContent(e, t) {
    if (t.turns !== null && t.turns !== void 0) {
      let n = [];
      try {
        n = Ae(t.turns), e.isVertexAI() || (n = n.map((o) => To(o)));
      } catch {
        throw new Error(`Failed to parse client content "turns", type: '${typeof t.turns}'`);
      }
      return { clientContent: {
        turns: n,
        turnComplete: t.turnComplete
      } };
    }
    return { clientContent: { turnComplete: t.turnComplete } };
  }
  tLiveClienttToolResponse(e, t) {
    let n = [];
    if (t.functionResponses == null) throw new Error("functionResponses is required.");
    if (Array.isArray(t.functionResponses) ? n = t.functionResponses : n = [t.functionResponses], n.length === 0) throw new Error("functionResponses is required.");
    for (const o of n) {
      if (typeof o != "object" || o === null || !("name" in o) || !("response" in o)) throw new Error(`Could not parse function response, type '${typeof o}'.`);
      if (!e.isVertexAI() && !("id" in o)) throw new Error(oE);
    }
    return { toolResponse: { functionResponses: n } };
  }
  sendClientContent(e) {
    e = Object.assign(Object.assign({}, rE), e);
    const t = this.tLiveClientContent(this.apiClient, e);
    this.conn.send(JSON.stringify(t));
  }
  sendRealtimeInput(e) {
    let t = {};
    this.apiClient.isVertexAI() ? t = { realtimeInput: vv(e) } : t = { realtimeInput: _v(e) }, this.conn.send(JSON.stringify(t));
  }
  sendToolResponse(e) {
    if (e.functionResponses == null) throw new Error("Tool response parameters are required.");
    const t = this.tLiveClienttToolResponse(this.apiClient, e);
    this.conn.send(JSON.stringify(t));
  }
  close() {
    this.conn.close();
  }
};
function lE(e) {
  const t = {};
  return e.forEach((n, o) => {
    t[o] = n;
  }), t;
}
function uE(e) {
  const t = new Headers();
  for (const [n, o] of Object.entries(e)) t.append(n, o);
  return t;
}
var qu = 10;
function Vu(e) {
  var t, n, o;
  if (!((t = e?.automaticFunctionCalling) === null || t === void 0) && t.disable) return !0;
  let i = !1;
  for (const a of (n = e?.tools) !== null && n !== void 0 ? n : []) if (rn(a)) {
    i = !0;
    break;
  }
  if (!i) return !0;
  const s = (o = e?.automaticFunctionCalling) === null || o === void 0 ? void 0 : o.maximumRemoteCalls;
  return s && (s < 0 || !Number.isInteger(s)) || s == 0 ? (console.warn("Invalid maximumRemoteCalls value provided for automatic function calling. Disabled automatic function calling. Please provide a valid integer value greater than 0. maximumRemoteCalls provided:", s), !0) : !1;
}
function rn(e) {
  return "callTool" in e && typeof e.callTool == "function";
}
function cE(e) {
  var t, n, o;
  return (o = (n = (t = e.config) === null || t === void 0 ? void 0 : t.tools) === null || n === void 0 ? void 0 : n.some((i) => rn(i))) !== null && o !== void 0 ? o : !1;
}
function Hu(e) {
  var t;
  const n = [];
  return !((t = e?.config) === null || t === void 0) && t.tools && e.config.tools.forEach((o, i) => {
    if (rn(o)) return;
    const s = o;
    s.functionDeclarations && s.functionDeclarations.length > 0 && n.push(i);
  }), n;
}
function Ju(e) {
  var t;
  return !(!((t = e?.automaticFunctionCalling) === null || t === void 0) && t.ignoreCallHistory);
}
var dE = class extends ct {
  constructor(e) {
    super(), this.apiClient = e, this.embedContent = async (t) => {
      if (!this.apiClient.isVertexAI())
        return t.model.includes("gemini-embedding-2") && (t.contents = Ae(t.contents)), await this.embedContentInternal(t);
      if (t.model.includes("gemini") && t.model !== "gemini-embedding-001" || t.model.includes("maas")) {
        const n = Ae(t.contents);
        if (n.length > 1) throw new Error("The embedContent API for this model only supports one content at a time.");
        const o = Object.assign(Object.assign({}, t), {
          content: n[0],
          embeddingApiType: yi.EMBED_CONTENT
        });
        return await this.embedContentInternal(o);
      } else {
        const n = Object.assign(Object.assign({}, t), { embeddingApiType: yi.PREDICT });
        return await this.embedContentInternal(n);
      }
    }, this.generateContent = async (t) => {
      var n, o, i, s, a;
      const u = await this.processParamsMaybeAddMcpUsage(t);
      if (this.maybeMoveToResponseJsonSchem(t), !cE(t) || Vu(t.config)) return await this.generateContentInternal(u);
      const c = Hu(t);
      if (c.length > 0) {
        const g = c.map((y) => `tools[${y}]`).join(", ");
        throw new Error(`Automatic function calling with CallableTools (or MCP objects) and basic FunctionDeclarations is not yet supported. Incompatible tools found at ${g}.`);
      }
      let d, p;
      const f = Ae(u.contents), h = (i = (o = (n = u.config) === null || n === void 0 ? void 0 : n.automaticFunctionCalling) === null || o === void 0 ? void 0 : o.maximumRemoteCalls) !== null && i !== void 0 ? i : qu;
      let m = 0;
      for (; m < h && (d = await this.generateContentInternal(u), !(!d.functionCalls || d.functionCalls.length === 0)); ) {
        const g = d.candidates[0].content, y = [];
        for (const v of (a = (s = t.config) === null || s === void 0 ? void 0 : s.tools) !== null && a !== void 0 ? a : []) if (rn(v)) {
          const A = await v.callTool(d.functionCalls);
          y.push(...A);
        }
        m++, p = {
          role: "user",
          parts: y
        }, u.contents = Ae(u.contents), u.contents.push(g), u.contents.push(p), Ju(u.config) && (f.push(g), f.push(p));
      }
      return Ju(u.config) && (d.automaticFunctionCallingHistory = f), d;
    }, this.generateContentStream = async (t) => {
      var n, o, i, s, a;
      if (this.maybeMoveToResponseJsonSchem(t), Vu(t.config)) {
        const p = await this.processParamsMaybeAddMcpUsage(t);
        return await this.generateContentStreamInternal(p);
      }
      const u = Hu(t);
      if (u.length > 0) {
        const p = u.map((f) => `tools[${f}]`).join(", ");
        throw new Error(`Incompatible tools found at ${p}. Automatic function calling with CallableTools (or MCP objects) and basic FunctionDeclarations" is not yet supported.`);
      }
      const c = (i = (o = (n = t?.config) === null || n === void 0 ? void 0 : n.toolConfig) === null || o === void 0 ? void 0 : o.functionCallingConfig) === null || i === void 0 ? void 0 : i.streamFunctionCallArguments, d = (a = (s = t?.config) === null || s === void 0 ? void 0 : s.automaticFunctionCalling) === null || a === void 0 ? void 0 : a.disable;
      if (c && !d) throw new Error("Running in streaming mode with 'streamFunctionCallArguments' enabled, this feature is not compatible with automatic function calling (AFC). Please set 'config.automaticFunctionCalling.disable' to true to disable AFC or leave 'config.toolConfig.functionCallingConfig.streamFunctionCallArguments' to be undefined or set to false to disable streaming function call arguments feature.");
      return await this.processAfcStream(t);
    }, this.generateImages = async (t) => await this.generateImagesInternal(t).then((n) => {
      var o;
      let i;
      const s = [];
      if (n?.generatedImages) for (const u of n.generatedImages) u && u?.safetyAttributes && ((o = u?.safetyAttributes) === null || o === void 0 ? void 0 : o.contentType) === "Positive Prompt" ? i = u?.safetyAttributes : s.push(u);
      let a;
      return i ? a = {
        generatedImages: s,
        positivePromptSafetyAttributes: i,
        sdkHttpResponse: n.sdkHttpResponse
      } : a = {
        generatedImages: s,
        sdkHttpResponse: n.sdkHttpResponse
      }, a;
    }), this.list = async (t) => {
      var n;
      const o = { config: Object.assign(Object.assign({}, { queryBase: !0 }), t?.config) };
      if (this.apiClient.isVertexAI() && !o.config.queryBase) {
        if (!((n = o.config) === null || n === void 0) && n.filter) throw new Error("Filtering tuned models list for Vertex AI is not currently supported");
        o.config.filter = "labels.tune-type:*";
      }
      return new Gt(ut.PAGED_ITEM_MODELS, (i) => this.listInternal(i), await this.listInternal(o), o);
    }, this.editImage = async (t) => {
      const n = {
        model: t.model,
        prompt: t.prompt,
        referenceImages: [],
        config: t.config
      };
      return t.referenceImages && t.referenceImages && (n.referenceImages = t.referenceImages.map((o) => o.toReferenceImageAPI())), await this.editImageInternal(n);
    }, this.upscaleImage = async (t) => {
      let n = {
        numberOfImages: 1,
        mode: "upscale"
      };
      t.config && (n = Object.assign(Object.assign({}, n), t.config));
      const o = {
        model: t.model,
        image: t.image,
        upscaleFactor: t.upscaleFactor,
        config: n
      };
      return await this.upscaleImageInternal(o);
    }, this.generateVideos = async (t) => {
      var n, o, i, s, a, u;
      if ((t.prompt || t.image || t.video) && t.source) throw new Error("Source and prompt/image/video are mutually exclusive. Please only use source.");
      return this.apiClient.isVertexAI() || (!((n = t.video) === null || n === void 0) && n.uri && (!((o = t.video) === null || o === void 0) && o.videoBytes) ? t.video = {
        uri: t.video.uri,
        mimeType: t.video.mimeType
      } : !((s = (i = t.source) === null || i === void 0 ? void 0 : i.video) === null || s === void 0) && s.uri && (!((u = (a = t.source) === null || a === void 0 ? void 0 : a.video) === null || u === void 0) && u.videoBytes) && (t.source.video = {
        uri: t.source.video.uri,
        mimeType: t.source.video.mimeType
      })), await this.generateVideosInternal(t);
    };
  }
  maybeMoveToResponseJsonSchem(e) {
    e.config && e.config.responseSchema && (e.config.responseJsonSchema || Object.keys(e.config.responseSchema).includes("$schema") && (e.config.responseJsonSchema = e.config.responseSchema, delete e.config.responseSchema));
  }
  async processParamsMaybeAddMcpUsage(e) {
    var t, n, o;
    const i = (t = e.config) === null || t === void 0 ? void 0 : t.tools;
    if (!i) return e;
    const s = await Promise.all(i.map(async (u) => rn(u) ? await u.tool() : u)), a = {
      model: e.model,
      contents: e.contents,
      config: Object.assign(Object.assign({}, e.config), { tools: s })
    };
    if (a.config.tools = s, e.config && e.config.tools && bf(e.config.tools)) {
      const u = (o = (n = e.config.httpOptions) === null || n === void 0 ? void 0 : n.headers) !== null && o !== void 0 ? o : {};
      let c = Object.assign({}, u);
      Object.keys(c).length === 0 && (c = this.apiClient.getDefaultHeaders()), Rf(c), a.config.httpOptions = Object.assign(Object.assign({}, e.config.httpOptions), { headers: c });
    }
    return a;
  }
  async initAfcToolsMap(e) {
    var t, n, o;
    const i = /* @__PURE__ */ new Map();
    for (const s of (n = (t = e.config) === null || t === void 0 ? void 0 : t.tools) !== null && n !== void 0 ? n : []) if (rn(s)) {
      const a = s, u = await a.tool();
      for (const c of (o = u.functionDeclarations) !== null && o !== void 0 ? o : []) {
        if (!c.name) throw new Error("Function declaration name is required.");
        if (i.has(c.name)) throw new Error(`Duplicate tool declaration name: ${c.name}`);
        i.set(c.name, a);
      }
    }
    return i;
  }
  async processAfcStream(e) {
    var t, n, o;
    const i = (o = (n = (t = e.config) === null || t === void 0 ? void 0 : t.automaticFunctionCalling) === null || n === void 0 ? void 0 : n.maximumRemoteCalls) !== null && o !== void 0 ? o : qu;
    let s = !1, a = 0;
    const u = await this.initAfcToolsMap(e);
    return (function(c, d, p) {
      return Ke(this, arguments, function* () {
        for (var f, h, m, g, y, v; a < i; ) {
          s && (a++, s = !1);
          const M = yield J(c.processParamsMaybeAddMcpUsage(p)), x = yield J(c.generateContentStreamInternal(M)), w = [], L = [];
          try {
            for (var A = !0, C = (h = void 0, Ye(x)), R; R = yield J(C.next()), f = R.done, !f; A = !0) {
              g = R.value, A = !1;
              const P = g;
              if (yield yield J(P), P.candidates && (!((y = P.candidates[0]) === null || y === void 0) && y.content)) {
                L.push(P.candidates[0].content);
                for (const N of (v = P.candidates[0].content.parts) !== null && v !== void 0 ? v : []) if (a < i && N.functionCall) {
                  if (!N.functionCall.name) throw new Error("Function call name was not returned by the model.");
                  if (d.has(N.functionCall.name)) {
                    const V = yield J(d.get(N.functionCall.name).callTool([N.functionCall]));
                    w.push(...V);
                  } else
                    throw new Error(`Automatic function calling was requested, but not all the tools the model used implement the CallableTool interface. Available tools: ${d.keys()}, mising tool: ${N.functionCall.name}`);
                }
              }
            }
          } catch (P) {
            h = { error: P };
          } finally {
            try {
              !A && !f && (m = C.return) && (yield J(m.call(C)));
            } finally {
              if (h) throw h.error;
            }
          }
          if (w.length > 0) {
            s = !0;
            const P = new Un();
            P.candidates = [{ content: {
              role: "user",
              parts: w
            } }], yield yield J(P);
            const N = [];
            N.push(...L), N.push({
              role: "user",
              parts: w
            }), p.contents = Ae(p.contents).concat(N);
          } else break;
        }
      });
    })(this, u, e);
  }
  async generateContentInternal(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = Fu(this.apiClient, e);
      return a = k("{model}:generateContent", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = Gu(d), f = new Un();
        return Object.assign(f, p), f;
      });
    } else {
      const c = $u(this.apiClient, e);
      return a = k("{model}:generateContent", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "POST",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = Bu(d), f = new Un();
        return Object.assign(f, p), f;
      });
    }
  }
  async generateContentStreamInternal(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = Fu(this.apiClient, e);
      return a = k("{model}:streamGenerateContent?alt=sse", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.requestStream({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }), s.then(function(d) {
        return Ke(this, arguments, function* () {
          var p, f, h, m;
          try {
            for (var g = !0, y = Ye(d), v; v = yield J(y.next()), p = v.done, !p; g = !0) {
              m = v.value, g = !1;
              const A = m, C = Gu(yield J(A.json()), e);
              C.sdkHttpResponse = { headers: A.headers };
              const R = new Un();
              Object.assign(R, C), yield yield J(R);
            }
          } catch (A) {
            f = { error: A };
          } finally {
            try {
              !g && !p && (h = y.return) && (yield J(h.call(y)));
            } finally {
              if (f) throw f.error;
            }
          }
        });
      });
    } else {
      const c = $u(this.apiClient, e);
      return a = k("{model}:streamGenerateContent?alt=sse", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.requestStream({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "POST",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }), s.then(function(d) {
        return Ke(this, arguments, function* () {
          var p, f, h, m;
          try {
            for (var g = !0, y = Ye(d), v; v = yield J(y.next()), p = v.done, !p; g = !0) {
              m = v.value, g = !1;
              const A = m, C = Bu(yield J(A.json()), e);
              C.sdkHttpResponse = { headers: A.headers };
              const R = new Un();
              Object.assign(R, C), yield yield J(R);
            }
          } catch (A) {
            f = { error: A };
          } finally {
            try {
              !g && !p && (h = y.return) && (yield J(h.call(y)));
            } finally {
              if (f) throw f.error;
            }
          }
        });
      });
    }
  }
  async embedContentInternal(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = eT(this.apiClient, e, e);
      return a = k(py(e.model) ? "{model}:embedContent" : "{model}:predict", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = nT(d, e), f = new yu();
        return Object.assign(f, p), f;
      });
    } else {
      const c = jv(this.apiClient, e);
      return a = k("{model}:batchEmbedContents", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "POST",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = tT(d), f = new yu();
        return Object.assign(f, p), f;
      });
    }
  }
  async generateImagesInternal(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = pT(this.apiClient, e);
      return a = k("{model}:predict", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = mT(d), f = new _u();
        return Object.assign(f, p), f;
      });
    } else {
      const c = fT(this.apiClient, e);
      return a = k("{model}:predict", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "POST",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = hT(d), f = new _u();
        return Object.assign(f, p), f;
      });
    }
  }
  async editImageInternal(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) {
      const a = zv(this.apiClient, e);
      return i = k("{model}:predict", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json().then((c) => {
        const d = c;
        return d.sdkHttpResponse = { headers: u.headers }, d;
      })), o.then((u) => {
        const c = Xv(u), d = new qg();
        return Object.assign(d, c), d;
      });
    } else throw new Error("This method is only supported by the Vertex AI.");
  }
  async upscaleImageInternal(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) {
      const a = mS(this.apiClient, e);
      return i = k("{model}:predict", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json().then((c) => {
        const d = c;
        return d.sdkHttpResponse = { headers: u.headers }, d;
      })), o.then((u) => {
        const c = gS(u), d = new Vg();
        return Object.assign(d, c), d;
      });
    } else throw new Error("This method is only supported by the Vertex AI.");
  }
  async recontextImage(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) {
      const a = zT(this.apiClient, e);
      return i = k("{model}:predict", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json()), o.then((u) => {
        const c = XT(u), d = new Hg();
        return Object.assign(d, c), d;
      });
    } else throw new Error("This method is only supported by the Vertex AI.");
  }
  async segmentImage(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) {
      const a = nS(this.apiClient, e);
      return i = k("{model}:predict", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json()), o.then((u) => {
        const c = oS(u), d = new Jg();
        return Object.assign(d, c), d;
      });
    } else throw new Error("This method is only supported by the Vertex AI.");
  }
  async get(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = NT(this.apiClient, e);
      return a = k("{name}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json()), s.then((d) => zs(d));
    } else {
      const c = MT(this.apiClient, e);
      return a = k("{name}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "GET",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json()), s.then((d) => Ys(d));
    }
  }
  async listInternal(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = OT(this.apiClient, e);
      return a = k("{models_url}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = VT(d), f = new vu();
        return Object.assign(f, p), f;
      });
    } else {
      const c = GT(this.apiClient, e);
      return a = k("{models_url}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "GET",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = qT(d), f = new vu();
        return Object.assign(f, p), f;
      });
    }
  }
  async update(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = pS(this.apiClient, e);
      return a = k("{model}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "PATCH",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json()), s.then((d) => zs(d));
    } else {
      const c = fS(this.apiClient, e);
      return a = k("{name}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "PATCH",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json()), s.then((d) => Ys(d));
    }
  }
  async delete(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = Jv(this.apiClient, e);
      return a = k("{name}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "DELETE",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = Kv(d), f = new Tu();
        return Object.assign(f, p), f;
      });
    } else {
      const c = Hv(this.apiClient, e);
      return a = k("{name}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "DELETE",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = Wv(d), f = new Tu();
        return Object.assign(f, p), f;
      });
    }
  }
  async countTokens(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = Ov(this.apiClient, e);
      return a = k("{model}:countTokens", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = Vv(d), f = new Su();
        return Object.assign(f, p), f;
      });
    } else {
      const c = Gv(this.apiClient, e);
      return a = k("{model}:countTokens", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "POST",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = qv(d), f = new Su();
        return Object.assign(f, p), f;
      });
    }
  }
  async computeTokens(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) {
      const a = kv(this.apiClient, e);
      return i = k("{model}:computeTokens", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json().then((c) => {
        const d = c;
        return d.sdkHttpResponse = { headers: u.headers }, d;
      })), o.then((u) => {
        const c = Dv(u), d = new Wg();
        return Object.assign(d, c), d;
      });
    } else throw new Error("This method is only supported by the Vertex AI.");
  }
  async generateVideosInternal(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = ST(this.apiClient, e);
      return a = k("{model}:predictLongRunning", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json()), s.then((d) => {
        const p = vT(d), f = new Eu();
        return Object.assign(f, p), f;
      });
    } else {
      const c = TT(this.apiClient, e);
      return a = k("{model}:predictLongRunning", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "POST",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json()), s.then((d) => {
        const p = _T(d), f = new Eu();
        return Object.assign(f, p), f;
      });
    }
  }
}, fE = class extends ct {
  constructor(e) {
    super(), this.apiClient = e;
  }
  async getVideosOperation(e) {
    const t = e.operation, n = e.config;
    if (t.name === void 0 || t.name === "") throw new Error("Operation name is required.");
    if (this.apiClient.isVertexAI()) {
      const o = t.name.split("/operations/")[0];
      let i;
      n && "httpOptions" in n && (i = n.httpOptions);
      const s = await this.fetchPredictVideosOperationInternal({
        operationName: t.name,
        resourceName: o,
        config: { httpOptions: i }
      });
      return t._fromAPIResponse({
        apiResponse: s,
        _isVertexAI: !0
      });
    } else {
      const o = await this.getVideosOperationInternal({
        operationName: t.name,
        config: n
      });
      return t._fromAPIResponse({
        apiResponse: o,
        _isVertexAI: !1
      });
    }
  }
  async get(e) {
    const t = e.operation, n = e.config;
    if (t.name === void 0 || t.name === "") throw new Error("Operation name is required.");
    if (this.apiClient.isVertexAI()) {
      const o = t.name.split("/operations/")[0];
      let i;
      n && "httpOptions" in n && (i = n.httpOptions);
      const s = await this.fetchPredictVideosOperationInternal({
        operationName: t.name,
        resourceName: o,
        config: { httpOptions: i }
      });
      return t._fromAPIResponse({
        apiResponse: s,
        _isVertexAI: !0
      });
    } else {
      const o = await this.getVideosOperationInternal({
        operationName: t.name,
        config: n
      });
      return t._fromAPIResponse({
        apiResponse: o,
        _isVertexAI: !1
      });
    }
  }
  async getVideosOperationInternal(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = Lg(e);
      return a = k("{operationName}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json()), s;
    } else {
      const c = Ug(e);
      return a = k("{operationName}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "GET",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json()), s;
    }
  }
  async fetchPredictVideosOperationInternal(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) {
      const a = Rg(e);
      return i = k("{resourceName}:fetchPredictOperation", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json()), o;
    } else throw new Error("This method is only supported by the Vertex AI.");
  }
};
function Wu(e) {
  const t = {};
  if (r(e, ["languageCodes"]) !== void 0) throw new Error("languageCodes parameter is not supported in Gemini API.");
  return t;
}
function pE(e) {
  const t = {}, n = r(e, ["apiKey"]);
  if (n != null && l(t, ["apiKey"], n), r(e, ["apiKeyConfig"]) !== void 0) throw new Error("apiKeyConfig parameter is not supported in Gemini API.");
  if (r(e, ["authType"]) !== void 0) throw new Error("authType parameter is not supported in Gemini API.");
  if (r(e, ["googleServiceAccountConfig"]) !== void 0) throw new Error("googleServiceAccountConfig parameter is not supported in Gemini API.");
  if (r(e, ["httpBasicAuthConfig"]) !== void 0) throw new Error("httpBasicAuthConfig parameter is not supported in Gemini API.");
  if (r(e, ["oauthConfig"]) !== void 0) throw new Error("oauthConfig parameter is not supported in Gemini API.");
  if (r(e, ["oidcConfig"]) !== void 0) throw new Error("oidcConfig parameter is not supported in Gemini API.");
  return t;
}
function hE(e) {
  const t = {}, n = r(e, ["data"]);
  if (n != null && l(t, ["data"], n), r(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const o = r(e, ["mimeType"]);
  return o != null && l(t, ["mimeType"], o), t;
}
function mE(e) {
  const t = {}, n = r(e, ["parts"]);
  if (n != null) {
    let i = n;
    Array.isArray(i) && (i = i.map((s) => AE(s))), l(t, ["parts"], i);
  }
  const o = r(e, ["role"]);
  return o != null && l(t, ["role"], o), t;
}
function gE(e, t, n) {
  const o = {}, i = r(t, ["expireTime"]);
  n !== void 0 && i != null && l(n, ["expireTime"], i);
  const s = r(t, ["newSessionExpireTime"]);
  n !== void 0 && s != null && l(n, ["newSessionExpireTime"], s);
  const a = r(t, ["uses"]);
  n !== void 0 && a != null && l(n, ["uses"], a);
  const u = r(t, ["liveConnectConstraints"]);
  n !== void 0 && u != null && l(n, ["bidiGenerateContentSetup"], wE(e, u));
  const c = r(t, ["lockAdditionalFields"]);
  return n !== void 0 && c != null && l(n, ["fieldMask"], c), o;
}
function yE(e, t) {
  const n = {}, o = r(t, ["config"]);
  return o != null && l(n, ["config"], gE(e, o, n)), n;
}
function _E(e) {
  const t = {};
  if (r(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const n = r(e, ["fileUri"]);
  n != null && l(t, ["fileUri"], n);
  const o = r(e, ["mimeType"]);
  return o != null && l(t, ["mimeType"], o), t;
}
function vE(e) {
  const t = {}, n = r(e, ["id"]);
  n != null && l(t, ["id"], n);
  const o = r(e, ["args"]);
  o != null && l(t, ["args"], o);
  const i = r(e, ["name"]);
  if (i != null && l(t, ["name"], i), r(e, ["partialArgs"]) !== void 0) throw new Error("partialArgs parameter is not supported in Gemini API.");
  if (r(e, ["willContinue"]) !== void 0) throw new Error("willContinue parameter is not supported in Gemini API.");
  return t;
}
function TE(e) {
  const t = {}, n = r(e, ["authConfig"]);
  n != null && l(t, ["authConfig"], pE(n));
  const o = r(e, ["enableWidget"]);
  return o != null && l(t, ["enableWidget"], o), t;
}
function SE(e) {
  const t = {}, n = r(e, ["searchTypes"]);
  if (n != null && l(t, ["searchTypes"], n), r(e, ["blockingConfidence"]) !== void 0) throw new Error("blockingConfidence parameter is not supported in Gemini API.");
  if (r(e, ["excludeDomains"]) !== void 0) throw new Error("excludeDomains parameter is not supported in Gemini API.");
  const o = r(e, ["timeRangeFilter"]);
  return o != null && l(t, ["timeRangeFilter"], o), t;
}
function EE(e, t) {
  const n = {}, o = r(e, ["generationConfig"]);
  t !== void 0 && o != null && l(t, ["setup", "generationConfig"], o);
  const i = r(e, ["responseModalities"]);
  t !== void 0 && i != null && l(t, [
    "setup",
    "generationConfig",
    "responseModalities"
  ], i);
  const s = r(e, ["temperature"]);
  t !== void 0 && s != null && l(t, [
    "setup",
    "generationConfig",
    "temperature"
  ], s);
  const a = r(e, ["topP"]);
  t !== void 0 && a != null && l(t, [
    "setup",
    "generationConfig",
    "topP"
  ], a);
  const u = r(e, ["topK"]);
  t !== void 0 && u != null && l(t, [
    "setup",
    "generationConfig",
    "topK"
  ], u);
  const c = r(e, ["maxOutputTokens"]);
  t !== void 0 && c != null && l(t, [
    "setup",
    "generationConfig",
    "maxOutputTokens"
  ], c);
  const d = r(e, ["mediaResolution"]);
  t !== void 0 && d != null && l(t, [
    "setup",
    "generationConfig",
    "mediaResolution"
  ], d);
  const p = r(e, ["seed"]);
  t !== void 0 && p != null && l(t, [
    "setup",
    "generationConfig",
    "seed"
  ], p);
  const f = r(e, ["speechConfig"]);
  t !== void 0 && f != null && l(t, [
    "setup",
    "generationConfig",
    "speechConfig"
  ], qr(f));
  const h = r(e, ["thinkingConfig"]);
  t !== void 0 && h != null && l(t, [
    "setup",
    "generationConfig",
    "thinkingConfig"
  ], h);
  const m = r(e, ["enableAffectiveDialog"]);
  t !== void 0 && m != null && l(t, [
    "setup",
    "generationConfig",
    "enableAffectiveDialog"
  ], m);
  const g = r(e, ["systemInstruction"]);
  t !== void 0 && g != null && l(t, ["setup", "systemInstruction"], mE(de(g)));
  const y = r(e, ["tools"]);
  if (t !== void 0 && y != null) {
    let P = fn(y);
    Array.isArray(P) && (P = P.map((N) => bE(dn(N)))), l(t, ["setup", "tools"], P);
  }
  const v = r(e, ["sessionResumption"]);
  t !== void 0 && v != null && l(t, ["setup", "sessionResumption"], IE(v));
  const A = r(e, ["inputAudioTranscription"]);
  t !== void 0 && A != null && l(t, ["setup", "inputAudioTranscription"], Wu(A));
  const C = r(e, ["outputAudioTranscription"]);
  t !== void 0 && C != null && l(t, ["setup", "outputAudioTranscription"], Wu(C));
  const R = r(e, ["realtimeInputConfig"]);
  t !== void 0 && R != null && l(t, ["setup", "realtimeInputConfig"], R);
  const M = r(e, ["contextWindowCompression"]);
  t !== void 0 && M != null && l(t, ["setup", "contextWindowCompression"], M);
  const x = r(e, ["proactivity"]);
  if (t !== void 0 && x != null && l(t, ["setup", "proactivity"], x), r(e, ["explicitVadSignal"]) !== void 0) throw new Error("explicitVadSignal parameter is not supported in Gemini API.");
  const w = r(e, ["avatarConfig"]);
  t !== void 0 && w != null && l(t, ["setup", "avatarConfig"], w);
  const L = r(e, ["safetySettings"]);
  if (t !== void 0 && L != null) {
    let P = L;
    Array.isArray(P) && (P = P.map((N) => CE(N))), l(t, ["setup", "safetySettings"], P);
  }
  return n;
}
function wE(e, t) {
  const n = {}, o = r(t, ["model"]);
  o != null && l(n, ["setup", "model"], z(e, o));
  const i = r(t, ["config"]);
  return i != null && l(n, ["config"], EE(i, n)), n;
}
function AE(e) {
  const t = {}, n = r(e, ["mediaResolution"]);
  n != null && l(t, ["mediaResolution"], n);
  const o = r(e, ["codeExecutionResult"]);
  o != null && l(t, ["codeExecutionResult"], o);
  const i = r(e, ["executableCode"]);
  i != null && l(t, ["executableCode"], i);
  const s = r(e, ["fileData"]);
  s != null && l(t, ["fileData"], _E(s));
  const a = r(e, ["functionCall"]);
  a != null && l(t, ["functionCall"], vE(a));
  const u = r(e, ["functionResponse"]);
  u != null && l(t, ["functionResponse"], u);
  const c = r(e, ["inlineData"]);
  c != null && l(t, ["inlineData"], hE(c));
  const d = r(e, ["text"]);
  d != null && l(t, ["text"], d);
  const p = r(e, ["thought"]);
  p != null && l(t, ["thought"], p);
  const f = r(e, ["thoughtSignature"]);
  f != null && l(t, ["thoughtSignature"], f);
  const h = r(e, ["videoMetadata"]);
  h != null && l(t, ["videoMetadata"], h);
  const m = r(e, ["toolCall"]);
  m != null && l(t, ["toolCall"], m);
  const g = r(e, ["toolResponse"]);
  g != null && l(t, ["toolResponse"], g);
  const y = r(e, ["partMetadata"]);
  return y != null && l(t, ["partMetadata"], y), t;
}
function CE(e) {
  const t = {}, n = r(e, ["category"]);
  if (n != null && l(t, ["category"], n), r(e, ["method"]) !== void 0) throw new Error("method parameter is not supported in Gemini API.");
  const o = r(e, ["threshold"]);
  return o != null && l(t, ["threshold"], o), t;
}
function IE(e) {
  const t = {}, n = r(e, ["handle"]);
  if (n != null && l(t, ["handle"], n), r(e, ["transparent"]) !== void 0) throw new Error("transparent parameter is not supported in Gemini API.");
  return t;
}
function bE(e) {
  const t = {};
  if (r(e, ["retrieval"]) !== void 0) throw new Error("retrieval parameter is not supported in Gemini API.");
  const n = r(e, ["computerUse"]);
  n != null && l(t, ["computerUse"], n);
  const o = r(e, ["fileSearch"]);
  o != null && l(t, ["fileSearch"], o);
  const i = r(e, ["googleSearch"]);
  i != null && l(t, ["googleSearch"], SE(i));
  const s = r(e, ["googleMaps"]);
  s != null && l(t, ["googleMaps"], TE(s));
  const a = r(e, ["codeExecution"]);
  if (a != null && l(t, ["codeExecution"], a), r(e, ["enterpriseWebSearch"]) !== void 0) throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");
  const u = r(e, ["functionDeclarations"]);
  if (u != null) {
    let f = u;
    Array.isArray(f) && (f = f.map((h) => h)), l(t, ["functionDeclarations"], f);
  }
  const c = r(e, ["googleSearchRetrieval"]);
  if (c != null && l(t, ["googleSearchRetrieval"], c), r(e, ["parallelAiSearch"]) !== void 0) throw new Error("parallelAiSearch parameter is not supported in Gemini API.");
  const d = r(e, ["urlContext"]);
  d != null && l(t, ["urlContext"], d);
  const p = r(e, ["mcpServers"]);
  if (p != null) {
    let f = p;
    Array.isArray(f) && (f = f.map((h) => h)), l(t, ["mcpServers"], f);
  }
  return t;
}
function RE(e) {
  const t = [];
  for (const n in e) if (Object.prototype.hasOwnProperty.call(e, n)) {
    const o = e[n];
    if (typeof o == "object" && o != null && Object.keys(o).length > 0) {
      const i = Object.keys(o).map((s) => `${n}.${s}`);
      t.push(...i);
    } else t.push(n);
  }
  return t.join(",");
}
function PE(e, t) {
  let n = null;
  const o = e.bidiGenerateContentSetup;
  if (typeof o == "object" && o !== null && "setup" in o) {
    const s = o.setup;
    typeof s == "object" && s !== null ? (e.bidiGenerateContentSetup = s, n = s) : delete e.bidiGenerateContentSetup;
  } else o !== void 0 && delete e.bidiGenerateContentSetup;
  const i = e.fieldMask;
  if (n) {
    const s = RE(n);
    if (Array.isArray(t?.lockAdditionalFields) && t?.lockAdditionalFields.length === 0) s ? e.fieldMask = s : delete e.fieldMask;
    else if (t?.lockAdditionalFields && t.lockAdditionalFields.length > 0 && i !== null && Array.isArray(i) && i.length > 0) {
      const a = [
        "temperature",
        "topK",
        "topP",
        "maxOutputTokens",
        "responseModalities",
        "seed",
        "speechConfig"
      ];
      let u = [];
      i.length > 0 && (u = i.map((d) => a.includes(d) ? `generationConfig.${d}` : d));
      const c = [];
      s && c.push(s), u.length > 0 && c.push(...u), c.length > 0 ? e.fieldMask = c.join(",") : delete e.fieldMask;
    } else delete e.fieldMask;
  } else i !== null && Array.isArray(i) && i.length > 0 ? e.fieldMask = i.join(",") : delete e.fieldMask;
  return e;
}
var xE = class extends ct {
  constructor(e) {
    super(), this.apiClient = e;
  }
  async create(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) throw new Error("The client.tokens.create method is only supported by the Gemini Developer API.");
    {
      const a = yE(this.apiClient, e);
      i = k("auth_tokens", a._url), s = a._query, delete a.config, delete a._url, delete a._query;
      const u = PE(a, e.config);
      return o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((c) => c.json()), o.then((c) => c);
    }
  }
};
function ME(e, t) {
  const n = {}, o = r(e, ["force"]);
  return t !== void 0 && o != null && l(t, ["_query", "force"], o), n;
}
function NE(e) {
  const t = {}, n = r(e, ["name"]);
  n != null && l(t, ["_url", "name"], n);
  const o = r(e, ["config"]);
  return o != null && ME(o, t), t;
}
function kE(e) {
  const t = {}, n = r(e, ["name"]);
  return n != null && l(t, ["_url", "name"], n), t;
}
function DE(e, t) {
  const n = {}, o = r(e, ["pageSize"]);
  t !== void 0 && o != null && l(t, ["_query", "pageSize"], o);
  const i = r(e, ["pageToken"]);
  return t !== void 0 && i != null && l(t, ["_query", "pageToken"], i), n;
}
function UE(e) {
  const t = {}, n = r(e, ["parent"]);
  n != null && l(t, ["_url", "parent"], n);
  const o = r(e, ["config"]);
  return o != null && DE(o, t), t;
}
function LE(e) {
  const t = {}, n = r(e, ["sdkHttpResponse"]);
  n != null && l(t, ["sdkHttpResponse"], n);
  const o = r(e, ["nextPageToken"]);
  o != null && l(t, ["nextPageToken"], o);
  const i = r(e, ["documents"]);
  if (i != null) {
    let s = i;
    Array.isArray(s) && (s = s.map((a) => a)), l(t, ["documents"], s);
  }
  return t;
}
var $E = class extends ct {
  constructor(e) {
    super(), this.apiClient = e, this.list = async (t) => new Gt(ut.PAGED_ITEM_DOCUMENTS, (n) => this.listInternal({
      parent: t.parent,
      config: n.config
    }), await this.listInternal(t), t);
  }
  async get(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const a = kE(e);
      return i = k("{name}", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json()), o.then((u) => u);
    }
  }
  async delete(e) {
    var t, n;
    let o = "", i = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const s = NE(e);
      o = k("{name}", s._url), i = s._query, delete s._url, delete s._query, await this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "DELETE",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      });
    }
  }
  async listInternal(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const a = UE(e);
      return i = k("{parent}/documents", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json()), o.then((u) => {
        const c = LE(u), d = new Kg();
        return Object.assign(d, c), d;
      });
    }
  }
}, FE = class extends ct {
  constructor(e, t = new $E(e)) {
    super(), this.apiClient = e, this.documents = t, this.list = async (n = {}) => new Gt(ut.PAGED_ITEM_FILE_SEARCH_STORES, (o) => this.listInternal(o), await this.listInternal(n), n);
  }
  async uploadToFileSearchStore(e) {
    if (this.apiClient.isVertexAI()) throw new Error("Vertex AI does not support uploading files to a file search store.");
    return this.apiClient.uploadFileToFileSearchStore(e.fileSearchStoreName, e.file, e.config);
  }
  async create(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const a = wS(e);
      return i = k("fileSearchStores", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json()), o.then((u) => u);
    }
  }
  async get(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const a = IS(e);
      return i = k("{name}", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json()), o.then((u) => u);
    }
  }
  async delete(e) {
    var t, n;
    let o = "", i = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const s = CS(e);
      o = k("{name}", s._url), i = s._query, delete s._url, delete s._query, await this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "DELETE",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      });
    }
  }
  async listInternal(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const a = NS(e);
      return i = k("fileSearchStores", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json()), o.then((u) => {
        const c = kS(u), d = new Yg();
        return Object.assign(d, c), d;
      });
    }
  }
  async uploadToFileSearchStoreInternal(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const a = DS(e);
      return i = k("upload/v1beta/{file_search_store_name}:uploadToFileSearchStore", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json()), o.then((u) => {
        const c = US(u), d = new zg();
        return Object.assign(d, c), d;
      });
    }
  }
  async importFile(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const a = PS(e);
      return i = k("{file_search_store_name}:importFile", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json()), o.then((u) => {
        const c = RS(u), d = new Xg();
        return Object.assign(d, c), d;
      });
    }
  }
}, xf = function() {
  const { crypto: e } = globalThis;
  if (e?.randomUUID)
    return xf = e.randomUUID.bind(e), e.randomUUID();
  const t = new Uint8Array(1), n = e ? () => e.getRandomValues(t)[0] : () => Math.random() * 255 & 255;
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (o) => (+o ^ n() & 15 >> +o / 4).toString(16));
}, BE = () => xf();
function Qs(e) {
  return typeof e == "object" && e !== null && ("name" in e && e.name === "AbortError" || "message" in e && String(e.message).includes("FetchRequestCanceledException"));
}
var Zs = (e) => {
  if (e instanceof Error) return e;
  if (typeof e == "object" && e !== null) {
    try {
      if (Object.prototype.toString.call(e) === "[object Error]") {
        const t = new Error(e.message, e.cause ? { cause: e.cause } : {});
        return e.stack && (t.stack = e.stack), e.cause && !t.cause && (t.cause = e.cause), e.name && (t.name = e.name), t;
      }
    } catch {
    }
    try {
      return new Error(JSON.stringify(e));
    } catch {
    }
  }
  return new Error(e);
}, Oe = class extends Error {
}, qe = class js extends Oe {
  constructor(t, n, o, i) {
    super(`${js.makeMessage(t, n, o)}`), this.status = t, this.headers = i, this.error = n;
  }
  static makeMessage(t, n, o) {
    const i = n?.message ? typeof n.message == "string" ? n.message : JSON.stringify(n.message) : n ? JSON.stringify(n) : o;
    return t && i ? `${t} ${i}` : t ? `${t} status code (no body)` : i || "(no status code or body)";
  }
  static generate(t, n, o, i) {
    if (!t || !i) return new Li({
      message: o,
      cause: Zs(n)
    });
    const s = n;
    return t === 400 ? new Nf(t, s, o, i) : t === 401 ? new kf(t, s, o, i) : t === 403 ? new Df(t, s, o, i) : t === 404 ? new Uf(t, s, o, i) : t === 409 ? new Lf(t, s, o, i) : t === 422 ? new $f(t, s, o, i) : t === 429 ? new Ff(t, s, o, i) : t >= 500 ? new Bf(t, s, o, i) : new js(t, s, o, i);
  }
}, er = class extends qe {
  constructor({ message: e } = {}) {
    super(void 0, void 0, e || "Request was aborted.", void 0);
  }
}, Li = class extends qe {
  constructor({ message: e, cause: t }) {
    super(void 0, void 0, e || "Connection error.", void 0), t && (this.cause = t);
  }
}, Mf = class extends Li {
  constructor({ message: e } = {}) {
    super({ message: e ?? "Request timed out." });
  }
}, Nf = class extends qe {
}, kf = class extends qe {
}, Df = class extends qe {
}, Uf = class extends qe {
}, Lf = class extends qe {
}, $f = class extends qe {
}, Ff = class extends qe {
}, Bf = class extends qe {
}, GE = /^[a-z][a-z0-9+.-]*:/i, OE = (e) => GE.test(e), tr = (e) => (tr = Array.isArray, tr(e)), Ku = tr;
function Yu(e) {
  if (!e) return !0;
  for (const t in e) return !1;
  return !0;
}
function qE(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
var VE = (e, t) => {
  if (typeof t != "number" || !Number.isInteger(t)) throw new Oe(`${e} must be an integer`);
  if (t < 0) throw new Oe(`${e} must be a positive integer`);
  return t;
}, HE = (e) => {
  try {
    return JSON.parse(e);
  } catch {
    return;
  }
}, JE = (e) => new Promise((t) => setTimeout(t, e));
function WE() {
  if (typeof fetch < "u") return fetch;
  throw new Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new GeminiNextGenAPIClient({ fetch })` or polyfill the global, `globalThis.fetch = fetch`");
}
function Gf(...e) {
  const t = globalThis.ReadableStream;
  if (typeof t > "u") throw new Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");
  return new t(...e);
}
function KE(e) {
  let t = Symbol.asyncIterator in e ? e[Symbol.asyncIterator]() : e[Symbol.iterator]();
  return Gf({
    start() {
    },
    async pull(n) {
      const { done: o, value: i } = await t.next();
      o ? n.close() : n.enqueue(i);
    },
    async cancel() {
      var n;
      await ((n = t.return) === null || n === void 0 ? void 0 : n.call(t));
    }
  });
}
function Of(e) {
  if (e[Symbol.asyncIterator]) return e;
  const t = e.getReader();
  return {
    async next() {
      try {
        const n = await t.read();
        return n?.done && t.releaseLock(), n;
      } catch (n) {
        throw t.releaseLock(), n;
      }
    },
    async return() {
      const n = t.cancel();
      return t.releaseLock(), await n, {
        done: !0,
        value: void 0
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
async function YE(e) {
  var t, n;
  if (e === null || typeof e != "object") return;
  if (e[Symbol.asyncIterator]) {
    await ((n = (t = e[Symbol.asyncIterator]()).return) === null || n === void 0 ? void 0 : n.call(t));
    return;
  }
  const o = e.getReader(), i = o.cancel();
  o.releaseLock(), await i;
}
var zE = ({ headers: e, body: t }) => ({
  bodyHeaders: { "content-type": "application/json" },
  body: JSON.stringify(t)
});
function XE(e) {
  return Object.entries(e).filter(([t, n]) => typeof n < "u").map(([t, n]) => {
    if (typeof n == "string" || typeof n == "number" || typeof n == "boolean") return `${encodeURIComponent(t)}=${encodeURIComponent(n)}`;
    if (n === null) return `${encodeURIComponent(t)}=`;
    throw new Oe(`Cannot stringify type ${typeof n}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`);
  }).join("&");
}
var QE = "0.0.1", qf = () => {
  var e;
  if (typeof File > "u") {
    const { process: t } = globalThis, n = typeof ((e = t?.versions) === null || e === void 0 ? void 0 : e.node) == "string" && parseInt(t.versions.node.split(".")) < 20;
    throw new Error("`File` is not defined as a global, which is required for file uploads." + (n ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`." : ""));
  }
};
function hs(e, t, n) {
  return qf(), new File(e, t ?? "unknown_file", n);
}
function ZE(e) {
  return (typeof e == "object" && e !== null && ("name" in e && e.name && String(e.name) || "url" in e && e.url && String(e.url) || "filename" in e && e.filename && String(e.filename) || "path" in e && e.path && String(e.path)) || "").split(/[\\/]/).pop() || void 0;
}
var jE = (e) => e != null && typeof e == "object" && typeof e[Symbol.asyncIterator] == "function", Vf = (e) => e != null && typeof e == "object" && typeof e.size == "number" && typeof e.type == "string" && typeof e.text == "function" && typeof e.slice == "function" && typeof e.arrayBuffer == "function", ew = (e) => e != null && typeof e == "object" && typeof e.name == "string" && typeof e.lastModified == "number" && Vf(e), tw = (e) => e != null && typeof e == "object" && typeof e.url == "string" && typeof e.blob == "function";
async function nw(e, t, n) {
  if (qf(), e = await e, ew(e))
    return e instanceof File ? e : hs([await e.arrayBuffer()], e.name);
  if (tw(e)) {
    const i = await e.blob();
    return t || (t = new URL(e.url).pathname.split(/[\\/]/).pop()), hs(await nr(i), t, n);
  }
  const o = await nr(e);
  if (t || (t = ZE(e)), !n?.type) {
    const i = o.find((s) => typeof s == "object" && "type" in s && s.type);
    typeof i == "string" && (n = Object.assign(Object.assign({}, n), { type: i }));
  }
  return hs(o, t, n);
}
async function nr(e) {
  var t, n, o, i, s;
  let a = [];
  if (typeof e == "string" || ArrayBuffer.isView(e) || e instanceof ArrayBuffer) a.push(e);
  else if (Vf(e)) a.push(e instanceof Blob ? e : await e.arrayBuffer());
  else if (jE(e)) try {
    for (var u = !0, c = Ye(e), d; d = await c.next(), t = d.done, !t; u = !0) {
      i = d.value, u = !1;
      const p = i;
      a.push(...await nr(p));
    }
  } catch (p) {
    n = { error: p };
  } finally {
    try {
      !u && !t && (o = c.return) && await o.call(c);
    } finally {
      if (n) throw n.error;
    }
  }
  else {
    const p = (s = e?.constructor) === null || s === void 0 ? void 0 : s.name;
    throw new Error(`Unexpected data type: ${typeof e}${p ? `; constructor: ${p}` : ""}${ow(e)}`);
  }
  return a;
}
function ow(e) {
  return typeof e != "object" || e === null ? "" : `; props: [${Object.getOwnPropertyNames(e).map((t) => `"${t}"`).join(", ")}]`;
}
var Vr = class {
  constructor(e) {
    this._client = e;
  }
};
Vr._key = [];
function Hf(e) {
  return e.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent);
}
var zu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.create(null)), iw = (e = Hf) => (function(n, ...o) {
  if (n.length === 1) return n[0];
  let i = !1;
  const s = [], a = n.reduce((p, f, h) => {
    var m, g, y;
    /[?#]/.test(f) && (i = !0);
    const v = o[h];
    let A = (i ? encodeURIComponent : e)("" + v);
    return h !== o.length && (v == null || typeof v == "object" && v.toString === ((y = Object.getPrototypeOf((g = Object.getPrototypeOf((m = v.hasOwnProperty) !== null && m !== void 0 ? m : zu)) !== null && g !== void 0 ? g : zu)) === null || y === void 0 ? void 0 : y.toString)) && (A = v + "", s.push({
      start: p.length + f.length,
      length: A.length,
      error: `Value of type ${Object.prototype.toString.call(v).slice(8, -1)} is not a valid path parameter`
    })), p + f + (h === o.length ? "" : A);
  }, ""), u = a.split(/[?#]/, 1)[0], c = /(^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi;
  let d;
  for (; (d = c.exec(u)) !== null; ) {
    const p = d[0].startsWith("/"), f = p ? 1 : 0, h = p ? d[0].slice(1) : d[0];
    s.push({
      start: d.index + f,
      length: h.length,
      error: `Value "${h}" can't be safely passed as a path parameter`
    });
  }
  if (s.sort((p, f) => p.start - f.start), s.length > 0) {
    let p = 0;
    const f = s.reduce((h, m) => {
      const g = " ".repeat(m.start - p), y = "^".repeat(m.length);
      return p = m.start + m.length, h + g + y;
    }, "");
    throw new Oe(`Path parameters result in path with invalid segments:
${s.map((h) => h.error).join(`
`)}
${a}
${f}`);
  }
  return a;
}), He = /* @__PURE__ */ iw(Hf), Jf = class extends Vr {
  create(e, t) {
    var n;
    const { api_version: o = this._client.apiVersion } = e, i = St(e, ["api_version"]);
    if ("model" in i && "agent_config" in i) throw new Oe("Invalid request: specified `model` and `agent_config`. If specifying `model`, use `generation_config`.");
    if ("agent" in i && "generation_config" in i) throw new Oe("Invalid request: specified `agent` and `generation_config`. If specifying `agent`, use `agent_config`.");
    return this._client.post(He`/${o}/interactions`, Object.assign(Object.assign({ body: i }, t), { stream: (n = e.stream) !== null && n !== void 0 ? n : !1 }));
  }
  delete(e, t = {}, n) {
    const { api_version: o = this._client.apiVersion } = t ?? {};
    return this._client.delete(He`/${o}/interactions/${e}`, n);
  }
  cancel(e, t = {}, n) {
    const { api_version: o = this._client.apiVersion } = t ?? {};
    return this._client.post(He`/${o}/interactions/${e}/cancel`, n);
  }
  get(e, t = {}, n) {
    var o;
    const i = t ?? {}, { api_version: s = this._client.apiVersion } = i, a = St(i, ["api_version"]);
    return this._client.get(He`/${s}/interactions/${e}`, Object.assign(Object.assign({ query: a }, n), { stream: (o = t?.stream) !== null && o !== void 0 ? o : !1 }));
  }
};
Jf._key = Object.freeze(["interactions"]);
var Wf = class extends Jf {
}, Kf = class extends Vr {
  create(e, t) {
    const { api_version: n = this._client.apiVersion, webhook_id: o } = e, i = St(e, ["api_version", "webhook_id"]);
    return this._client.post(He`/${n}/webhooks`, Object.assign({
      query: { webhook_id: o },
      body: i
    }, t));
  }
  update(e, t, n) {
    const { api_version: o = this._client.apiVersion, update_mask: i } = t, s = St(t, ["api_version", "update_mask"]);
    return this._client.patch(He`/${o}/webhooks/${e}`, Object.assign({
      query: { update_mask: i },
      body: s
    }, n));
  }
  list(e = {}, t) {
    const n = e ?? {}, { api_version: o = this._client.apiVersion } = n, i = St(n, ["api_version"]);
    return this._client.get(He`/${o}/webhooks`, Object.assign({ query: i }, t));
  }
  delete(e, t = {}, n) {
    const { api_version: o = this._client.apiVersion } = t ?? {};
    return this._client.delete(He`/${o}/webhooks/${e}`, n);
  }
  get(e, t = {}, n) {
    const { api_version: o = this._client.apiVersion } = t ?? {};
    return this._client.get(He`/${o}/webhooks/${e}`, n);
  }
  ping(e, t = void 0, n) {
    const { api_version: o = this._client.apiVersion, body: i } = t ?? {};
    return this._client.post(He`/${o}/webhooks/${e}:ping`, Object.assign({ body: i }, n));
  }
  rotateSigningSecret(e, t = {}, n) {
    const o = t ?? {}, { api_version: i = this._client.apiVersion } = o, s = St(o, ["api_version"]);
    return this._client.post(He`/${i}/webhooks/${e}:rotateSigningSecret`, Object.assign({ body: s }, n));
  }
};
Kf._key = Object.freeze(["webhooks"]);
var Yf = class extends Kf {
};
function sw(e) {
  let t = 0;
  for (const i of e) t += i.length;
  const n = new Uint8Array(t);
  let o = 0;
  for (const i of e)
    n.set(i, o), o += i.length;
  return n;
}
var Oo;
function Hr(e) {
  let t;
  return (Oo ?? (t = new globalThis.TextEncoder(), Oo = t.encode.bind(t)))(e);
}
var qo;
function Xu(e) {
  let t;
  return (qo ?? (t = new globalThis.TextDecoder(), qo = t.decode.bind(t)))(e);
}
var $i = class {
  constructor() {
    this.buffer = new Uint8Array(), this.carriageReturnIndex = null, this.searchIndex = 0;
  }
  decode(e) {
    var t;
    if (e == null) return [];
    const n = e instanceof ArrayBuffer ? new Uint8Array(e) : typeof e == "string" ? Hr(e) : e;
    this.buffer = sw([this.buffer, n]);
    const o = [];
    let i;
    for (; (i = rw(this.buffer, (t = this.carriageReturnIndex) !== null && t !== void 0 ? t : this.searchIndex)) != null; ) {
      if (i.carriage && this.carriageReturnIndex == null) {
        this.carriageReturnIndex = i.index;
        continue;
      }
      if (this.carriageReturnIndex != null && (i.index !== this.carriageReturnIndex + 1 || i.carriage)) {
        o.push(Xu(this.buffer.subarray(0, this.carriageReturnIndex - 1))), this.buffer = this.buffer.subarray(this.carriageReturnIndex), this.carriageReturnIndex = null, this.searchIndex = 0;
        continue;
      }
      const s = this.carriageReturnIndex !== null ? i.preceding - 1 : i.preceding, a = Xu(this.buffer.subarray(0, s));
      o.push(a), this.buffer = this.buffer.subarray(i.index), this.carriageReturnIndex = null, this.searchIndex = 0;
    }
    return this.searchIndex = Math.max(0, this.buffer.length - 1), o;
  }
  flush() {
    return this.buffer.length ? this.decode(`
`) : [];
  }
};
$i.NEWLINE_CHARS = /* @__PURE__ */ new Set([`
`, "\r"]);
$i.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
function rw(e, t) {
  const i = t ?? 0, s = e.indexOf(10, i), a = e.indexOf(13, i);
  if (s === -1 && a === -1) return null;
  let u;
  return s !== -1 && a !== -1 ? u = Math.min(s, a) : u = s !== -1 ? s : a, e[u] === 10 ? {
    preceding: u,
    index: u + 1,
    carriage: !1
  } : {
    preceding: u,
    index: u + 1,
    carriage: !0
  };
}
var vi = {
  off: 0,
  error: 200,
  warn: 300,
  info: 400,
  debug: 500
}, Qu = (e, t, n) => {
  if (e) {
    if (qE(vi, e)) return e;
    Te(n).warn(`${t} was set to ${JSON.stringify(e)}, expected one of ${JSON.stringify(Object.keys(vi))}`);
  }
};
function On() {
}
function Vo(e, t, n) {
  return !t || vi[e] > vi[n] ? On : t[e].bind(t);
}
var aw = {
  error: On,
  warn: On,
  info: On,
  debug: On
}, Zu = /* @__PURE__ */ new WeakMap();
function Te(e) {
  var t;
  const n = e.logger, o = (t = e.logLevel) !== null && t !== void 0 ? t : "off";
  if (!n) return aw;
  const i = Zu.get(n);
  if (i && i[0] === o) return i[1];
  const s = {
    error: Vo("error", n, o),
    warn: Vo("warn", n, o),
    info: Vo("info", n, o),
    debug: Vo("debug", n, o)
  };
  return Zu.set(n, [o, s]), s;
}
var bt = (e) => (e.options && (e.options = Object.assign({}, e.options), delete e.options.headers), e.headers && (e.headers = Object.fromEntries((e.headers instanceof Headers ? [...e.headers] : Object.entries(e.headers)).map(([t, n]) => [t, t.toLowerCase() === "x-goog-api-key" || t.toLowerCase() === "authorization" || t.toLowerCase() === "cookie" || t.toLowerCase() === "set-cookie" ? "***" : n]))), "retryOfRequestLogID" in e && (e.retryOfRequestLogID && (e.retryOf = e.retryOfRequestLogID), delete e.retryOfRequestLogID), e), lw = class qn {
  constructor(t, n, o) {
    this.iterator = t, this.controller = n, this.client = o;
  }
  static fromSSEResponse(t, n, o) {
    let i = !1;
    const s = o ? Te(o) : console;
    function a() {
      return Ke(this, arguments, function* () {
        var c, d, p, f;
        if (i) throw new Oe("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
        i = !0;
        let h = !1;
        try {
          try {
            for (var m = !0, g = Ye(uw(t, n)), y; y = yield J(g.next()), c = y.done, !c; m = !0) {
              f = y.value, m = !1;
              const v = f;
              if (!h)
                if (v.data.startsWith("[DONE]")) {
                  h = !0;
                  continue;
                } else try {
                  yield yield J(JSON.parse(v.data));
                } catch (A) {
                  throw s.error("Could not parse message into JSON:", v.data), s.error("From chunk:", v.raw), A;
                }
            }
          } catch (v) {
            d = { error: v };
          } finally {
            try {
              !m && !c && (p = g.return) && (yield J(p.call(g)));
            } finally {
              if (d) throw d.error;
            }
          }
          h = !0;
        } catch (v) {
          if (Qs(v)) return yield J(void 0);
          throw v;
        } finally {
          h || n.abort();
        }
      });
    }
    return new qn(a, n, o);
  }
  static fromReadableStream(t, n, o) {
    let i = !1;
    function s() {
      return Ke(this, arguments, function* () {
        var c, d, p, f;
        const h = new $i(), m = Of(t);
        try {
          for (var g = !0, y = Ye(m), v; v = yield J(y.next()), c = v.done, !c; g = !0) {
            f = v.value, g = !1;
            const A = f;
            for (const C of h.decode(A)) yield yield J(C);
          }
        } catch (A) {
          d = { error: A };
        } finally {
          try {
            !g && !c && (p = y.return) && (yield J(p.call(y)));
          } finally {
            if (d) throw d.error;
          }
        }
        for (const A of h.flush()) yield yield J(A);
      });
    }
    function a() {
      return Ke(this, arguments, function* () {
        var c, d, p, f;
        if (i) throw new Oe("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
        i = !0;
        let h = !1;
        try {
          try {
            for (var m = !0, g = Ye(s()), y; y = yield J(g.next()), c = y.done, !c; m = !0) {
              f = y.value, m = !1;
              const v = f;
              h || v && (yield yield J(JSON.parse(v)));
            }
          } catch (v) {
            d = { error: v };
          } finally {
            try {
              !m && !c && (p = g.return) && (yield J(p.call(g)));
            } finally {
              if (d) throw d.error;
            }
          }
          h = !0;
        } catch (v) {
          if (Qs(v)) return yield J(void 0);
          throw v;
        } finally {
          h || n.abort();
        }
      });
    }
    return new qn(a, n, o);
  }
  [Symbol.asyncIterator]() {
    return this.iterator();
  }
  tee() {
    const t = [], n = [], o = this.iterator(), i = (s) => ({ next: () => {
      if (s.length === 0) {
        const a = o.next();
        t.push(a), n.push(a);
      }
      return s.shift();
    } });
    return [new qn(() => i(t), this.controller, this.client), new qn(() => i(n), this.controller, this.client)];
  }
  toReadableStream() {
    const t = this;
    let n;
    return Gf({
      async start() {
        n = t[Symbol.asyncIterator]();
      },
      async pull(o) {
        try {
          const { value: i, done: s } = await n.next();
          if (s) return o.close();
          const a = Hr(JSON.stringify(i) + `
`);
          o.enqueue(a);
        } catch (i) {
          o.error(i);
        }
      },
      async cancel() {
        var o;
        await ((o = n.return) === null || o === void 0 ? void 0 : o.call(n));
      }
    });
  }
};
function uw(e, t) {
  return Ke(this, arguments, function* () {
    var o, i, s, a;
    if (!e.body)
      throw t.abort(), typeof globalThis.navigator < "u" && globalThis.navigator.product === "ReactNative" ? new Oe("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api") : new Oe("Attempted to iterate over a response with no body");
    const u = new dw(), c = new $i(), d = Of(e.body);
    try {
      for (var p = !0, f = Ye(cw(d)), h; h = yield J(f.next()), o = h.done, !o; p = !0) {
        a = h.value, p = !1;
        const m = a;
        for (const g of c.decode(m)) {
          const y = u.decode(g);
          y && (yield yield J(y));
        }
      }
    } catch (m) {
      i = { error: m };
    } finally {
      try {
        !p && !o && (s = f.return) && (yield J(s.call(f)));
      } finally {
        if (i) throw i.error;
      }
    }
    for (const m of c.flush()) {
      const g = u.decode(m);
      g && (yield yield J(g));
    }
  });
}
function cw(e) {
  return Ke(this, arguments, function* () {
    var n, o, i, s;
    try {
      for (var a = !0, u = Ye(e), c; c = yield J(u.next()), n = c.done, !n; a = !0) {
        s = c.value, a = !1;
        const d = s;
        d != null && (yield yield J(d instanceof ArrayBuffer ? new Uint8Array(d) : typeof d == "string" ? Hr(d) : d));
      }
    } catch (d) {
      o = { error: d };
    } finally {
      try {
        !a && !n && (i = u.return) && (yield J(i.call(u)));
      } finally {
        if (o) throw o.error;
      }
    }
  });
}
var dw = class {
  constructor() {
    this.event = null, this.data = [], this.chunks = [];
  }
  decode(e) {
    if (e.endsWith("\r") && (e = e.substring(0, e.length - 1)), !e) {
      if (!this.event && !this.data.length) return null;
      const i = {
        event: this.event,
        data: this.data.join(`
`),
        raw: this.chunks
      };
      return this.event = null, this.data = [], this.chunks = [], i;
    }
    if (this.chunks.push(e), e.startsWith(":")) return null;
    let [t, n, o] = fw(e, ":");
    return o.startsWith(" ") && (o = o.substring(1)), t === "event" ? this.event = o : t === "data" && this.data.push(o), null;
  }
};
function fw(e, t) {
  const n = e.indexOf(t);
  return n !== -1 ? [
    e.substring(0, n),
    t,
    e.substring(n + t.length)
  ] : [
    e,
    "",
    ""
  ];
}
async function pw(e, t) {
  const { response: n, requestLogID: o, retryOfRequestLogID: i, startTime: s } = t, a = await (async () => {
    var u;
    if (t.options.stream)
      return Te(e).debug("response", n.status, n.url, n.headers, n.body), t.options.__streamClass ? t.options.__streamClass.fromSSEResponse(n, t.controller, e) : lw.fromSSEResponse(n, t.controller, e);
    if (n.status === 204) return null;
    if (t.options.__binaryResponse) return n;
    const c = n.headers.get("content-type"), d = (u = c?.split(";")[0]) === null || u === void 0 ? void 0 : u.trim();
    return d?.includes("application/json") || d?.endsWith("+json") ? n.headers.get("content-length") === "0" ? void 0 : await n.json() : await n.text();
  })();
  return Te(e).debug(`[${o}] response parsed`, bt({
    retryOfRequestLogID: i,
    url: n.url,
    status: n.status,
    body: a,
    durationMs: Date.now() - s
  })), a;
}
var hw = class zf extends Promise {
  constructor(t, n, o = pw) {
    super((i) => {
      i(null);
    }), this.responsePromise = n, this.parseResponse = o, this.client = t;
  }
  _thenUnwrap(t) {
    return new zf(this.client, this.responsePromise, async (n, o) => t(await this.parseResponse(n, o), o));
  }
  asResponse() {
    return this.responsePromise.then((t) => t.response);
  }
  async withResponse() {
    const [t, n] = await Promise.all([this.parse(), this.asResponse()]);
    return {
      data: t,
      response: n
    };
  }
  parse() {
    return this.parsedPromise || (this.parsedPromise = this.responsePromise.then((t) => this.parseResponse(this.client, t))), this.parsedPromise;
  }
  then(t, n) {
    return this.parse().then(t, n);
  }
  catch(t) {
    return this.parse().catch(t);
  }
  finally(t) {
    return this.parse().finally(t);
  }
}, Xf = /* @__PURE__ */ Symbol("brand.privateNullableHeaders");
function* mw(e) {
  if (!e) return;
  if (Xf in e) {
    const { values: o, nulls: i } = e;
    yield* o.entries();
    for (const s of i) yield [s, null];
    return;
  }
  let t = !1, n;
  e instanceof Headers ? n = e.entries() : Ku(e) ? n = e : (t = !0, n = Object.entries(e ?? {}));
  for (let o of n) {
    const i = o[0];
    if (typeof i != "string") throw new TypeError("expected header name to be a string");
    const s = Ku(o[1]) ? o[1] : [o[1]];
    let a = !1;
    for (const u of s)
      u !== void 0 && (t && !a && (a = !0, yield [i, null]), yield [i, u]);
  }
}
var Ln = (e) => {
  const t = new Headers(), n = /* @__PURE__ */ new Set();
  for (const o of e) {
    const i = /* @__PURE__ */ new Set();
    for (const [s, a] of mw(o)) {
      const u = s.toLowerCase();
      i.has(u) || (t.delete(s), i.add(u)), a === null ? (t.delete(s), n.add(u)) : (t.append(s, a), n.delete(u));
    }
  }
  return {
    [Xf]: !0,
    values: t,
    nulls: n
  };
}, ms = (e) => {
  var t, n, o, i, s;
  if (typeof globalThis.process < "u") return ((n = (t = globalThis.process.env) === null || t === void 0 ? void 0 : t[e]) === null || n === void 0 ? void 0 : n.trim()) || void 0;
  if (typeof globalThis.Deno < "u") return ((s = (i = (o = globalThis.Deno.env) === null || o === void 0 ? void 0 : o.get) === null || i === void 0 ? void 0 : i.call(o, e)) === null || s === void 0 ? void 0 : s.trim()) || void 0;
}, Qf, Zf = class jf {
  constructor(t) {
    var n, o, i, s, a, u, c, { baseURL: d = ms("GEMINI_NEXT_GEN_API_BASE_URL"), apiKey: p = (n = ms("GEMINI_API_KEY")) !== null && n !== void 0 ? n : null, apiVersion: f = "v1beta" } = t, h = St(t, [
      "baseURL",
      "apiKey",
      "apiVersion"
    ]);
    const m = Object.assign(Object.assign({
      apiKey: p,
      apiVersion: f
    }, h), { baseURL: d || "https://generativelanguage.googleapis.com" });
    this.baseURL = m.baseURL, this.timeout = (o = m.timeout) !== null && o !== void 0 ? o : jf.DEFAULT_TIMEOUT, this.logger = (i = m.logger) !== null && i !== void 0 ? i : console;
    const g = "warn";
    this.logLevel = g, this.logLevel = (a = (s = Qu(m.logLevel, "ClientOptions.logLevel", this)) !== null && s !== void 0 ? s : Qu(ms("GEMINI_NEXT_GEN_API_LOG"), "process.env['GEMINI_NEXT_GEN_API_LOG']", this)) !== null && a !== void 0 ? a : g, this.fetchOptions = m.fetchOptions, this.maxRetries = (u = m.maxRetries) !== null && u !== void 0 ? u : 2, this.fetch = (c = m.fetch) !== null && c !== void 0 ? c : WE(), this.encoder = zE, this._options = m, this.apiKey = p, this.apiVersion = f, this.clientAdapter = m.clientAdapter;
  }
  withOptions(t) {
    return new this.constructor(Object.assign(Object.assign(Object.assign({}, this._options), {
      baseURL: this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      apiKey: this.apiKey,
      apiVersion: this.apiVersion
    }), t));
  }
  baseURLOverridden() {
    return this.baseURL !== "https://generativelanguage.googleapis.com";
  }
  defaultQuery() {
    return this._options.defaultQuery;
  }
  validateHeaders({ values: t, nulls: n }) {
    if (!(t.has("authorization") || t.has("x-goog-api-key")) && !(this.apiKey && t.get("x-goog-api-key")) && !n.has("x-goog-api-key"))
      throw new Error('Could not resolve authentication method. Expected the apiKey to be set. Or for the "x-goog-api-key" headers to be explicitly omitted');
  }
  async authHeaders(t) {
    const n = Ln([t.headers]);
    if (!(n.values.has("authorization") || n.values.has("x-goog-api-key"))) {
      if (this.apiKey) return Ln([{ "x-goog-api-key": this.apiKey }]);
      if (this.clientAdapter && this.clientAdapter.isVertexAI()) return Ln([await this.clientAdapter.getAuthHeaders()]);
    }
  }
  stringifyQuery(t) {
    return XE(t);
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${QE}`;
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${BE()}`;
  }
  makeStatusError(t, n, o, i) {
    return qe.generate(t, n, o, i);
  }
  buildURL(t, n, o) {
    const i = !this.baseURLOverridden() && o || this.baseURL, s = OE(t) ? new URL(t) : new URL(i + (i.endsWith("/") && t.startsWith("/") ? t.slice(1) : t)), a = this.defaultQuery(), u = Object.fromEntries(s.searchParams);
    return (!Yu(a) || !Yu(u)) && (n = Object.assign(Object.assign(Object.assign({}, u), a), n)), typeof n == "object" && n && !Array.isArray(n) && (s.search = this.stringifyQuery(n)), s.toString();
  }
  async prepareOptions(t) {
    if (this.clientAdapter && this.clientAdapter.isVertexAI() && !t.path.startsWith(`/${this.apiVersion}/projects/`)) {
      const n = t.path.slice(this.apiVersion.length + 1);
      t.path = `/${this.apiVersion}/projects/${this.clientAdapter.getProject()}/locations/${this.clientAdapter.getLocation()}${n}`;
    }
  }
  async prepareRequest(t, { url: n, options: o }) {
  }
  get(t, n) {
    return this.methodRequest("get", t, n);
  }
  post(t, n) {
    return this.methodRequest("post", t, n);
  }
  patch(t, n) {
    return this.methodRequest("patch", t, n);
  }
  put(t, n) {
    return this.methodRequest("put", t, n);
  }
  delete(t, n) {
    return this.methodRequest("delete", t, n);
  }
  methodRequest(t, n, o) {
    return this.request(Promise.resolve(o).then((i) => Object.assign({
      method: t,
      path: n
    }, i)));
  }
  request(t, n = null) {
    return new hw(this, this.makeRequest(t, n, void 0));
  }
  async makeRequest(t, n, o) {
    var i, s, a;
    const u = await t, c = (i = u.maxRetries) !== null && i !== void 0 ? i : this.maxRetries;
    n == null && (n = c), await this.prepareOptions(u);
    const { req: d, url: p, timeout: f } = await this.buildRequest(u, { retryCount: c - n });
    await this.prepareRequest(d, {
      url: p,
      options: u
    });
    const h = "log_" + (Math.random() * (1 << 24) | 0).toString(16).padStart(6, "0"), m = o === void 0 ? "" : `, retryOf: ${o}`, g = Date.now();
    if (Te(this).debug(`[${h}] sending request`, bt({
      retryOfRequestLogID: o,
      method: u.method,
      url: p,
      options: u,
      headers: d.headers
    })), !((s = u.signal) === null || s === void 0) && s.aborted) throw new er();
    const y = new AbortController(), v = await this.fetchWithTimeout(p, d, f, y).catch(Zs), A = Date.now();
    if (v instanceof globalThis.Error) {
      const R = `retrying, ${n} attempts remaining`;
      if (!((a = u.signal) === null || a === void 0) && a.aborted) throw new er();
      const M = Qs(v) || /timed? ?out/i.test(String(v) + ("cause" in v ? String(v.cause) : ""));
      if (n)
        return Te(this).info(`[${h}] connection ${M ? "timed out" : "failed"} - ${R}`), Te(this).debug(`[${h}] connection ${M ? "timed out" : "failed"} (${R})`, bt({
          retryOfRequestLogID: o,
          url: p,
          durationMs: A - g,
          message: v.message
        })), this.retryRequest(u, n, o ?? h);
      throw Te(this).info(`[${h}] connection ${M ? "timed out" : "failed"} - error; no more retries left`), Te(this).debug(`[${h}] connection ${M ? "timed out" : "failed"} (error; no more retries left)`, bt({
        retryOfRequestLogID: o,
        url: p,
        durationMs: A - g,
        message: v.message
      })), M ? new Mf() : new Li({ cause: v });
    }
    const C = `[${h}${m}] ${d.method} ${p} ${v.ok ? "succeeded" : "failed"} with status ${v.status} in ${A - g}ms`;
    if (!v.ok) {
      const R = await this.shouldRetry(v);
      if (n && R) {
        const P = `retrying, ${n} attempts remaining`;
        return await YE(v.body), Te(this).info(`${C} - ${P}`), Te(this).debug(`[${h}] response error (${P})`, bt({
          retryOfRequestLogID: o,
          url: v.url,
          status: v.status,
          headers: v.headers,
          durationMs: A - g
        })), this.retryRequest(u, n, o ?? h, v.headers);
      }
      const M = R ? "error; no more retries left" : "error; not retryable";
      Te(this).info(`${C} - ${M}`);
      const x = await v.text().catch((P) => Zs(P).message), w = HE(x), L = w ? void 0 : x;
      throw Te(this).debug(`[${h}] response error (${M})`, bt({
        retryOfRequestLogID: o,
        url: v.url,
        status: v.status,
        headers: v.headers,
        message: L,
        durationMs: Date.now() - g
      })), this.makeStatusError(v.status, w, L, v.headers);
    }
    return Te(this).info(C), Te(this).debug(`[${h}] response start`, bt({
      retryOfRequestLogID: o,
      url: v.url,
      status: v.status,
      headers: v.headers,
      durationMs: A - g
    })), {
      response: v,
      options: u,
      controller: y,
      requestLogID: h,
      retryOfRequestLogID: o,
      startTime: g
    };
  }
  async fetchWithTimeout(t, n, o, i) {
    const s = n || {}, { signal: a, method: u } = s, c = St(s, ["signal", "method"]), d = this._makeAbort(i);
    a && a.addEventListener("abort", d, { once: !0 });
    const p = setTimeout(d, o), f = globalThis.ReadableStream && c.body instanceof globalThis.ReadableStream || typeof c.body == "object" && c.body !== null && Symbol.asyncIterator in c.body, h = Object.assign(Object.assign(Object.assign({ signal: i.signal }, f ? { duplex: "half" } : {}), { method: "GET" }), c);
    u && (h.method = u.toUpperCase());
    try {
      return await this.fetch.call(void 0, t, h);
    } finally {
      clearTimeout(p);
    }
  }
  async shouldRetry(t) {
    const n = t.headers.get("x-should-retry");
    return n === "true" ? !0 : n === "false" ? !1 : t.status === 408 || t.status === 409 || t.status === 429 || t.status >= 500;
  }
  async retryRequest(t, n, o, i) {
    var s;
    let a;
    const u = i?.get("retry-after-ms");
    if (u) {
      const d = parseFloat(u);
      Number.isNaN(d) || (a = d);
    }
    const c = i?.get("retry-after");
    if (c && !a) {
      const d = parseFloat(c);
      Number.isNaN(d) ? a = Date.parse(c) - Date.now() : a = d * 1e3;
    }
    if (a === void 0) {
      const d = (s = t.maxRetries) !== null && s !== void 0 ? s : this.maxRetries;
      a = this.calculateDefaultRetryTimeoutMillis(n, d);
    }
    return await JE(a), this.makeRequest(t, n - 1, o);
  }
  calculateDefaultRetryTimeoutMillis(t, n) {
    const s = n - t;
    return Math.min(0.5 * Math.pow(2, s), 8) * (1 - Math.random() * 0.25) * 1e3;
  }
  async buildRequest(t, { retryCount: n = 0 } = {}) {
    var o, i, s;
    const a = Object.assign({}, t), { method: u, path: c, query: d, defaultBaseURL: p } = a, f = this.buildURL(c, d, p);
    "timeout" in a && VE("timeout", a.timeout), a.timeout = (o = a.timeout) !== null && o !== void 0 ? o : this.timeout;
    const { bodyHeaders: h, body: m } = this.buildBody({ options: a }), g = await this.buildHeaders({
      options: t,
      method: u,
      bodyHeaders: h,
      retryCount: n
    });
    return {
      req: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
        method: u,
        headers: g
      }, a.signal && { signal: a.signal }), globalThis.ReadableStream && m instanceof globalThis.ReadableStream && { duplex: "half" }), m && { body: m }), (i = this.fetchOptions) !== null && i !== void 0 ? i : {}), (s = a.fetchOptions) !== null && s !== void 0 ? s : {}),
      url: f,
      timeout: a.timeout
    };
  }
  async buildHeaders({ options: t, method: n, bodyHeaders: o, retryCount: i }) {
    let s = {};
    this.idempotencyHeader && n !== "get" && (t.idempotencyKey || (t.idempotencyKey = this.defaultIdempotencyKey()), s[this.idempotencyHeader] = t.idempotencyKey);
    const a = await this.authHeaders(t);
    let u = Ln([
      s,
      {
        Accept: "application/json",
        "User-Agent": this.getUserAgent()
      },
      this._options.defaultHeaders,
      o,
      t.headers,
      a
    ]);
    return this.validateHeaders(u), u.values;
  }
  _makeAbort(t) {
    return () => t.abort();
  }
  buildBody({ options: { body: t, headers: n } }) {
    if (!t) return {
      bodyHeaders: void 0,
      body: void 0
    };
    const o = Ln([n]);
    return ArrayBuffer.isView(t) || t instanceof ArrayBuffer || t instanceof DataView || typeof t == "string" && o.values.has("content-type") || globalThis.Blob && t instanceof globalThis.Blob || t instanceof FormData || t instanceof URLSearchParams || globalThis.ReadableStream && t instanceof globalThis.ReadableStream ? {
      bodyHeaders: void 0,
      body: t
    } : typeof t == "object" && (Symbol.asyncIterator in t || Symbol.iterator in t && "next" in t && typeof t.next == "function") ? {
      bodyHeaders: void 0,
      body: KE(t)
    } : typeof t == "object" && o.values.get("content-type") === "application/x-www-form-urlencoded" ? {
      bodyHeaders: { "content-type": "application/x-www-form-urlencoded" },
      body: this.stringifyQuery(t)
    } : this.encoder({
      body: t,
      headers: o
    });
  }
};
Zf.DEFAULT_TIMEOUT = 6e4;
var ae = class extends Zf {
  constructor() {
    super(...arguments), this.interactions = new Wf(this), this.webhooks = new Yf(this);
  }
};
Qf = ae;
ae.GeminiNextGenAPIClient = Qf;
ae.GeminiNextGenAPIClientError = Oe;
ae.APIError = qe;
ae.APIConnectionError = Li;
ae.APIConnectionTimeoutError = Mf;
ae.APIUserAbortError = er;
ae.NotFoundError = Uf;
ae.ConflictError = Lf;
ae.RateLimitError = Ff;
ae.BadRequestError = Nf;
ae.AuthenticationError = kf;
ae.InternalServerError = Bf;
ae.PermissionDeniedError = Df;
ae.UnprocessableEntityError = $f;
ae.toFile = nw;
ae.Interactions = Wf;
ae.Webhooks = Yf;
function gw(e, t) {
  const n = {}, o = r(e, ["name"]);
  return o != null && l(n, ["_url", "name"], o), n;
}
function yw(e, t) {
  const n = {}, o = r(e, ["name"]);
  return o != null && l(n, ["_url", "name"], o), n;
}
function _w(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  return o != null && l(n, ["sdkHttpResponse"], o), n;
}
function vw(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  return o != null && l(n, ["sdkHttpResponse"], o), n;
}
function Tw(e, t, n) {
  const o = {};
  if (r(e, ["validationDataset"]) !== void 0) throw new Error("validationDataset parameter is not supported in Gemini API.");
  const i = r(e, ["tunedModelDisplayName"]);
  if (t !== void 0 && i != null && l(t, ["displayName"], i), r(e, ["description"]) !== void 0) throw new Error("description parameter is not supported in Gemini API.");
  const s = r(e, ["epochCount"]);
  t !== void 0 && s != null && l(t, [
    "tuningTask",
    "hyperparameters",
    "epochCount"
  ], s);
  const a = r(e, ["learningRateMultiplier"]);
  if (a != null && l(o, [
    "tuningTask",
    "hyperparameters",
    "learningRateMultiplier"
  ], a), r(e, ["exportLastCheckpointOnly"]) !== void 0) throw new Error("exportLastCheckpointOnly parameter is not supported in Gemini API.");
  if (r(e, ["preTunedModelCheckpointId"]) !== void 0) throw new Error("preTunedModelCheckpointId parameter is not supported in Gemini API.");
  if (r(e, ["adapterSize"]) !== void 0) throw new Error("adapterSize parameter is not supported in Gemini API.");
  if (r(e, ["tuningMode"]) !== void 0) throw new Error("tuningMode parameter is not supported in Gemini API.");
  if (r(e, ["customBaseModel"]) !== void 0) throw new Error("customBaseModel parameter is not supported in Gemini API.");
  const u = r(e, ["batchSize"]);
  t !== void 0 && u != null && l(t, [
    "tuningTask",
    "hyperparameters",
    "batchSize"
  ], u);
  const c = r(e, ["learningRate"]);
  if (t !== void 0 && c != null && l(t, [
    "tuningTask",
    "hyperparameters",
    "learningRate"
  ], c), r(e, ["labels"]) !== void 0) throw new Error("labels parameter is not supported in Gemini API.");
  if (r(e, ["beta"]) !== void 0) throw new Error("beta parameter is not supported in Gemini API.");
  if (r(e, ["baseTeacherModel"]) !== void 0) throw new Error("baseTeacherModel parameter is not supported in Gemini API.");
  if (r(e, ["tunedTeacherModelSource"]) !== void 0) throw new Error("tunedTeacherModelSource parameter is not supported in Gemini API.");
  if (r(e, ["sftLossWeightMultiplier"]) !== void 0) throw new Error("sftLossWeightMultiplier parameter is not supported in Gemini API.");
  if (r(e, ["outputUri"]) !== void 0) throw new Error("outputUri parameter is not supported in Gemini API.");
  if (r(e, ["encryptionSpec"]) !== void 0) throw new Error("encryptionSpec parameter is not supported in Gemini API.");
  return o;
}
function Sw(e, t, n) {
  const o = {};
  let i = r(n, ["config", "method"]);
  if (i === void 0 && (i = "SUPERVISED_FINE_TUNING"), i === "SUPERVISED_FINE_TUNING") {
    const w = r(e, ["validationDataset"]);
    t !== void 0 && w != null && l(t, ["supervisedTuningSpec"], gs(w));
  } else if (i === "PREFERENCE_TUNING") {
    const w = r(e, ["validationDataset"]);
    t !== void 0 && w != null && l(t, ["preferenceOptimizationSpec"], gs(w));
  } else if (i === "DISTILLATION") {
    const w = r(e, ["validationDataset"]);
    t !== void 0 && w != null && l(t, ["distillationSpec"], gs(w));
  }
  const s = r(e, ["tunedModelDisplayName"]);
  t !== void 0 && s != null && l(t, ["tunedModelDisplayName"], s);
  const a = r(e, ["description"]);
  t !== void 0 && a != null && l(t, ["description"], a);
  let u = r(n, ["config", "method"]);
  if (u === void 0 && (u = "SUPERVISED_FINE_TUNING"), u === "SUPERVISED_FINE_TUNING") {
    const w = r(e, ["epochCount"]);
    t !== void 0 && w != null && l(t, [
      "supervisedTuningSpec",
      "hyperParameters",
      "epochCount"
    ], w);
  } else if (u === "PREFERENCE_TUNING") {
    const w = r(e, ["epochCount"]);
    t !== void 0 && w != null && l(t, [
      "preferenceOptimizationSpec",
      "hyperParameters",
      "epochCount"
    ], w);
  } else if (u === "DISTILLATION") {
    const w = r(e, ["epochCount"]);
    t !== void 0 && w != null && l(t, [
      "distillationSpec",
      "hyperParameters",
      "epochCount"
    ], w);
  }
  let c = r(n, ["config", "method"]);
  if (c === void 0 && (c = "SUPERVISED_FINE_TUNING"), c === "SUPERVISED_FINE_TUNING") {
    const w = r(e, ["learningRateMultiplier"]);
    t !== void 0 && w != null && l(t, [
      "supervisedTuningSpec",
      "hyperParameters",
      "learningRateMultiplier"
    ], w);
  } else if (c === "PREFERENCE_TUNING") {
    const w = r(e, ["learningRateMultiplier"]);
    t !== void 0 && w != null && l(t, [
      "preferenceOptimizationSpec",
      "hyperParameters",
      "learningRateMultiplier"
    ], w);
  } else if (c === "DISTILLATION") {
    const w = r(e, ["learningRateMultiplier"]);
    t !== void 0 && w != null && l(t, [
      "distillationSpec",
      "hyperParameters",
      "learningRateMultiplier"
    ], w);
  }
  let d = r(n, ["config", "method"]);
  if (d === void 0 && (d = "SUPERVISED_FINE_TUNING"), d === "SUPERVISED_FINE_TUNING") {
    const w = r(e, ["exportLastCheckpointOnly"]);
    t !== void 0 && w != null && l(t, ["supervisedTuningSpec", "exportLastCheckpointOnly"], w);
  } else if (d === "PREFERENCE_TUNING") {
    const w = r(e, ["exportLastCheckpointOnly"]);
    t !== void 0 && w != null && l(t, ["preferenceOptimizationSpec", "exportLastCheckpointOnly"], w);
  } else if (d === "DISTILLATION") {
    const w = r(e, ["exportLastCheckpointOnly"]);
    t !== void 0 && w != null && l(t, ["distillationSpec", "exportLastCheckpointOnly"], w);
  }
  let p = r(n, ["config", "method"]);
  if (p === void 0 && (p = "SUPERVISED_FINE_TUNING"), p === "SUPERVISED_FINE_TUNING") {
    const w = r(e, ["adapterSize"]);
    t !== void 0 && w != null && l(t, [
      "supervisedTuningSpec",
      "hyperParameters",
      "adapterSize"
    ], w);
  } else if (p === "PREFERENCE_TUNING") {
    const w = r(e, ["adapterSize"]);
    t !== void 0 && w != null && l(t, [
      "preferenceOptimizationSpec",
      "hyperParameters",
      "adapterSize"
    ], w);
  } else if (p === "DISTILLATION") {
    const w = r(e, ["adapterSize"]);
    t !== void 0 && w != null && l(t, [
      "distillationSpec",
      "hyperParameters",
      "adapterSize"
    ], w);
  }
  let f = r(n, ["config", "method"]);
  if (f === void 0 && (f = "SUPERVISED_FINE_TUNING"), f === "SUPERVISED_FINE_TUNING") {
    const w = r(e, ["tuningMode"]);
    t !== void 0 && w != null && l(t, ["supervisedTuningSpec", "tuningMode"], w);
  } else if (f === "DISTILLATION") {
    const w = r(e, ["tuningMode"]);
    t !== void 0 && w != null && l(t, ["distillationSpec", "tuningMode"], w);
  }
  const h = r(e, ["customBaseModel"]);
  t !== void 0 && h != null && l(t, ["customBaseModel"], h);
  let m = r(n, ["config", "method"]);
  if (m === void 0 && (m = "SUPERVISED_FINE_TUNING"), m === "SUPERVISED_FINE_TUNING") {
    const w = r(e, ["batchSize"]);
    t !== void 0 && w != null && l(t, [
      "supervisedTuningSpec",
      "hyperParameters",
      "batchSize"
    ], w);
  } else if (m === "DISTILLATION") {
    const w = r(e, ["batchSize"]);
    t !== void 0 && w != null && l(t, [
      "distillationSpec",
      "hyperParameters",
      "batchSize"
    ], w);
  }
  let g = r(n, ["config", "method"]);
  if (g === void 0 && (g = "SUPERVISED_FINE_TUNING"), g === "SUPERVISED_FINE_TUNING") {
    const w = r(e, ["learningRate"]);
    t !== void 0 && w != null && l(t, [
      "supervisedTuningSpec",
      "hyperParameters",
      "learningRate"
    ], w);
  } else if (g === "DISTILLATION") {
    const w = r(e, ["learningRate"]);
    t !== void 0 && w != null && l(t, [
      "distillationSpec",
      "hyperParameters",
      "learningRate"
    ], w);
  }
  const y = r(e, ["labels"]);
  t !== void 0 && y != null && l(t, ["labels"], y);
  const v = r(e, ["beta"]);
  t !== void 0 && v != null && l(t, [
    "preferenceOptimizationSpec",
    "hyperParameters",
    "beta"
  ], v);
  const A = r(e, ["baseTeacherModel"]);
  t !== void 0 && A != null && l(t, ["distillationSpec", "baseTeacherModel"], A);
  const C = r(e, ["tunedTeacherModelSource"]);
  t !== void 0 && C != null && l(t, ["distillationSpec", "tunedTeacherModelSource"], C);
  const R = r(e, ["sftLossWeightMultiplier"]);
  t !== void 0 && R != null && l(t, [
    "distillationSpec",
    "hyperParameters",
    "sftLossWeightMultiplier"
  ], R);
  const M = r(e, ["outputUri"]);
  t !== void 0 && M != null && l(t, ["outputUri"], M);
  const x = r(e, ["encryptionSpec"]);
  return t !== void 0 && x != null && l(t, ["encryptionSpec"], x), o;
}
function Ew(e, t) {
  const n = {}, o = r(e, ["baseModel"]);
  o != null && l(n, ["baseModel"], o);
  const i = r(e, ["preTunedModel"]);
  i != null && l(n, ["preTunedModel"], i);
  const s = r(e, ["trainingDataset"]);
  s != null && kw(s);
  const a = r(e, ["config"]);
  return a != null && Tw(a, n), n;
}
function ww(e, t) {
  const n = {}, o = r(e, ["baseModel"]);
  o != null && l(n, ["baseModel"], o);
  const i = r(e, ["preTunedModel"]);
  i != null && l(n, ["preTunedModel"], i);
  const s = r(e, ["trainingDataset"]);
  s != null && Dw(s, n, t);
  const a = r(e, ["config"]);
  return a != null && Sw(a, n, t), n;
}
function Aw(e, t) {
  const n = {}, o = r(e, ["name"]);
  return o != null && l(n, ["_url", "name"], o), n;
}
function Cw(e, t) {
  const n = {}, o = r(e, ["name"]);
  return o != null && l(n, ["_url", "name"], o), n;
}
function Iw(e, t, n) {
  const o = {}, i = r(e, ["pageSize"]);
  t !== void 0 && i != null && l(t, ["_query", "pageSize"], i);
  const s = r(e, ["pageToken"]);
  t !== void 0 && s != null && l(t, ["_query", "pageToken"], s);
  const a = r(e, ["filter"]);
  return t !== void 0 && a != null && l(t, ["_query", "filter"], a), o;
}
function bw(e, t, n) {
  const o = {}, i = r(e, ["pageSize"]);
  t !== void 0 && i != null && l(t, ["_query", "pageSize"], i);
  const s = r(e, ["pageToken"]);
  t !== void 0 && s != null && l(t, ["_query", "pageToken"], s);
  const a = r(e, ["filter"]);
  return t !== void 0 && a != null && l(t, ["_query", "filter"], a), o;
}
function Rw(e, t) {
  const n = {}, o = r(e, ["config"]);
  return o != null && Iw(o, n), n;
}
function Pw(e, t) {
  const n = {}, o = r(e, ["config"]);
  return o != null && bw(o, n), n;
}
function xw(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  o != null && l(n, ["sdkHttpResponse"], o);
  const i = r(e, ["nextPageToken"]);
  i != null && l(n, ["nextPageToken"], i);
  const s = r(e, ["tunedModels"]);
  if (s != null) {
    let a = s;
    Array.isArray(a) && (a = a.map((u) => ep(u))), l(n, ["tuningJobs"], a);
  }
  return n;
}
function Mw(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  o != null && l(n, ["sdkHttpResponse"], o);
  const i = r(e, ["nextPageToken"]);
  i != null && l(n, ["nextPageToken"], i);
  const s = r(e, ["tuningJobs"]);
  if (s != null) {
    let a = s;
    Array.isArray(a) && (a = a.map((u) => or(u))), l(n, ["tuningJobs"], a);
  }
  return n;
}
function Nw(e, t) {
  const n = {}, o = r(e, ["name"]);
  o != null && l(n, ["model"], o);
  const i = r(e, ["name"]);
  return i != null && l(n, ["endpoint"], i), n;
}
function kw(e, t) {
  const n = {};
  if (r(e, ["gcsUri"]) !== void 0) throw new Error("gcsUri parameter is not supported in Gemini API.");
  if (r(e, ["vertexDatasetResource"]) !== void 0) throw new Error("vertexDatasetResource parameter is not supported in Gemini API.");
  const o = r(e, ["examples"]);
  if (o != null) {
    let i = o;
    Array.isArray(i) && (i = i.map((s) => s)), l(n, ["examples", "examples"], i);
  }
  return n;
}
function Dw(e, t, n) {
  const o = {};
  let i = r(n, ["config", "method"]);
  if (i === void 0 && (i = "SUPERVISED_FINE_TUNING"), i === "SUPERVISED_FINE_TUNING") {
    const a = r(e, ["gcsUri"]);
    t !== void 0 && a != null && l(t, ["supervisedTuningSpec", "trainingDatasetUri"], a);
  } else if (i === "PREFERENCE_TUNING") {
    const a = r(e, ["gcsUri"]);
    t !== void 0 && a != null && l(t, ["preferenceOptimizationSpec", "trainingDatasetUri"], a);
  } else if (i === "DISTILLATION") {
    const a = r(e, ["gcsUri"]);
    t !== void 0 && a != null && l(t, ["distillationSpec", "promptDatasetUri"], a);
  }
  let s = r(n, ["config", "method"]);
  if (s === void 0 && (s = "SUPERVISED_FINE_TUNING"), s === "SUPERVISED_FINE_TUNING") {
    const a = r(e, ["vertexDatasetResource"]);
    t !== void 0 && a != null && l(t, ["supervisedTuningSpec", "trainingDatasetUri"], a);
  } else if (s === "PREFERENCE_TUNING") {
    const a = r(e, ["vertexDatasetResource"]);
    t !== void 0 && a != null && l(t, ["preferenceOptimizationSpec", "trainingDatasetUri"], a);
  } else if (s === "DISTILLATION") {
    const a = r(e, ["vertexDatasetResource"]);
    t !== void 0 && a != null && l(t, ["distillationSpec", "promptDatasetUri"], a);
  }
  if (r(e, ["examples"]) !== void 0) throw new Error("examples parameter is not supported in Vertex AI.");
  return o;
}
function ep(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  o != null && l(n, ["sdkHttpResponse"], o);
  const i = r(e, ["name"]);
  i != null && l(n, ["name"], i);
  const s = r(e, ["state"]);
  s != null && l(n, ["state"], uf(s));
  const a = r(e, ["createTime"]);
  a != null && l(n, ["createTime"], a);
  const u = r(e, ["tuningTask", "startTime"]);
  u != null && l(n, ["startTime"], u);
  const c = r(e, ["tuningTask", "completeTime"]);
  c != null && l(n, ["endTime"], c);
  const d = r(e, ["updateTime"]);
  d != null && l(n, ["updateTime"], d);
  const p = r(e, ["description"]);
  p != null && l(n, ["description"], p);
  const f = r(e, ["baseModel"]);
  f != null && l(n, ["baseModel"], f);
  const h = r(e, ["_self"]);
  return h != null && l(n, ["tunedModel"], Nw(h)), n;
}
function or(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  o != null && l(n, ["sdkHttpResponse"], o);
  const i = r(e, ["name"]);
  i != null && l(n, ["name"], i);
  const s = r(e, ["state"]);
  s != null && l(n, ["state"], uf(s));
  const a = r(e, ["createTime"]);
  a != null && l(n, ["createTime"], a);
  const u = r(e, ["startTime"]);
  u != null && l(n, ["startTime"], u);
  const c = r(e, ["endTime"]);
  c != null && l(n, ["endTime"], c);
  const d = r(e, ["updateTime"]);
  d != null && l(n, ["updateTime"], d);
  const p = r(e, ["error"]);
  p != null && l(n, ["error"], p);
  const f = r(e, ["description"]);
  f != null && l(n, ["description"], f);
  const h = r(e, ["baseModel"]);
  h != null && l(n, ["baseModel"], h);
  const m = r(e, ["tunedModel"]);
  m != null && l(n, ["tunedModel"], m);
  const g = r(e, ["preTunedModel"]);
  g != null && l(n, ["preTunedModel"], g);
  const y = r(e, ["supervisedTuningSpec"]);
  y != null && l(n, ["supervisedTuningSpec"], y);
  const v = r(e, ["preferenceOptimizationSpec"]);
  v != null && l(n, ["preferenceOptimizationSpec"], v);
  const A = r(e, ["distillationSpec"]);
  A != null && l(n, ["distillationSpec"], A);
  const C = r(e, ["tuningDataStats"]);
  C != null && l(n, ["tuningDataStats"], C);
  const R = r(e, ["encryptionSpec"]);
  R != null && l(n, ["encryptionSpec"], R);
  const M = r(e, ["partnerModelTuningSpec"]);
  M != null && l(n, ["partnerModelTuningSpec"], M);
  const x = r(e, ["customBaseModel"]);
  x != null && l(n, ["customBaseModel"], x);
  const w = r(e, ["evaluateDatasetRuns"]);
  if (w != null) {
    let Xe = w;
    Array.isArray(Xe) && (Xe = Xe.map((ye) => ye)), l(n, ["evaluateDatasetRuns"], Xe);
  }
  const L = r(e, ["experiment"]);
  L != null && l(n, ["experiment"], L);
  const P = r(e, ["fullFineTuningSpec"]);
  P != null && l(n, ["fullFineTuningSpec"], P);
  const N = r(e, ["labels"]);
  N != null && l(n, ["labels"], N);
  const V = r(e, ["outputUri"]);
  V != null && l(n, ["outputUri"], V);
  const Y = r(e, ["pipelineJob"]);
  Y != null && l(n, ["pipelineJob"], Y);
  const j = r(e, ["serviceAccount"]);
  j != null && l(n, ["serviceAccount"], j);
  const ee = r(e, ["tunedModelDisplayName"]);
  ee != null && l(n, ["tunedModelDisplayName"], ee);
  const Q = r(e, ["tuningJobState"]);
  Q != null && l(n, ["tuningJobState"], Q);
  const X = r(e, ["veoTuningSpec"]);
  X != null && l(n, ["veoTuningSpec"], X);
  const he = r(e, ["distillationSamplingSpec"]);
  he != null && l(n, ["distillationSamplingSpec"], he);
  const ft = r(e, ["tuningJobMetadata"]);
  return ft != null && l(n, ["tuningJobMetadata"], ft), n;
}
function Uw(e, t) {
  const n = {}, o = r(e, ["sdkHttpResponse"]);
  o != null && l(n, ["sdkHttpResponse"], o);
  const i = r(e, ["name"]);
  i != null && l(n, ["name"], i);
  const s = r(e, ["metadata"]);
  s != null && l(n, ["metadata"], s);
  const a = r(e, ["done"]);
  a != null && l(n, ["done"], a);
  const u = r(e, ["error"]);
  return u != null && l(n, ["error"], u), n;
}
function gs(e, t) {
  const n = {}, o = r(e, ["gcsUri"]);
  o != null && l(n, ["validationDatasetUri"], o);
  const i = r(e, ["vertexDatasetResource"]);
  return i != null && l(n, ["validationDatasetUri"], i), n;
}
var Lw = class extends ct {
  constructor(e) {
    super(), this.apiClient = e, this.list = async (t = {}) => new Gt(ut.PAGED_ITEM_TUNING_JOBS, (n) => this.listInternal(n), await this.listInternal(t), t), this.get = async (t) => await this.getInternal(t), this.tune = async (t) => {
      var n;
      if (this.apiClient.isVertexAI()) if (t.baseModel.startsWith("projects/")) {
        const o = { tunedModelName: t.baseModel };
        !((n = t.config) === null || n === void 0) && n.preTunedModelCheckpointId && (o.checkpointId = t.config.preTunedModelCheckpointId);
        const i = Object.assign(Object.assign({}, t), { preTunedModel: o });
        return i.baseModel = void 0, await this.tuneInternal(i);
      } else {
        const o = Object.assign({}, t);
        return await this.tuneInternal(o);
      }
      else {
        const o = Object.assign({}, t), i = await this.tuneMldevInternal(o);
        let s = "";
        return i.metadata !== void 0 && i.metadata.tunedModel !== void 0 ? s = i.metadata.tunedModel : i.name !== void 0 && i.name.includes("/operations/") && (s = i.name.split("/operations/")[0]), {
          name: s,
          state: Vs.JOB_STATE_QUEUED
        };
      }
    };
  }
  async getInternal(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = Cw(e);
      return a = k("{name}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => or(d));
    } else {
      const c = Aw(e);
      return a = k("{name}", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "GET",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => ep(d));
    }
  }
  async listInternal(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = Pw(e);
      return a = k("tuningJobs", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = Mw(d), f = new wu();
        return Object.assign(f, p), f;
      });
    } else {
      const c = Rw(e);
      return a = k("tunedModels", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "GET",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = xw(d), f = new wu();
        return Object.assign(f, p), f;
      });
    }
  }
  async cancel(e) {
    var t, n, o, i;
    let s, a = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const c = yw(e);
      return a = k("{name}:cancel", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = vw(d), f = new Au();
        return Object.assign(f, p), f;
      });
    } else {
      const c = gw(e);
      return a = k("{name}:cancel", c._url), u = c._query, delete c._url, delete c._query, s = this.apiClient.request({
        path: a,
        queryParams: u,
        body: JSON.stringify(c),
        httpMethod: "POST",
        httpOptions: (o = e.config) === null || o === void 0 ? void 0 : o.httpOptions,
        abortSignal: (i = e.config) === null || i === void 0 ? void 0 : i.abortSignal
      }).then((d) => d.json().then((p) => {
        const f = p;
        return f.sdkHttpResponse = { headers: d.headers }, f;
      })), s.then((d) => {
        const p = _w(d), f = new Au();
        return Object.assign(f, p), f;
      });
    }
  }
  async tuneInternal(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) {
      const a = ww(e, e);
      return i = k("tuningJobs", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json().then((c) => {
        const d = c;
        return d.sdkHttpResponse = { headers: u.headers }, d;
      })), o.then((u) => or(u));
    } else throw new Error("This method is only supported by the Vertex AI.");
  }
  async tuneMldevInternal(e) {
    var t, n;
    let o, i = "", s = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const a = Ew(e);
      return i = k("tunedModels", a._url), s = a._query, delete a._url, delete a._query, o = this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json().then((c) => {
        const d = c;
        return d.sdkHttpResponse = { headers: u.headers }, d;
      })), o.then((u) => Uw(u));
    }
  }
}, $w = class {
  async download(e, t) {
    throw new Error("Download to file is not supported in the browser, please use a browser compliant download like an <a> tag.");
  }
}, Fw = 1024 * 1024 * 8, Bw = 3, Gw = 1e3, Ow = 2, Ti = "x-goog-upload-status";
async function qw(e, t, n, o) {
  var i;
  const s = await tp(e, t, n, o), a = await s?.json();
  if (((i = s?.headers) === null || i === void 0 ? void 0 : i[Ti]) !== "final") throw new Error("Failed to upload file: Upload status is not finalized.");
  return a.file;
}
async function Vw(e, t, n, o) {
  var i;
  const s = await tp(e, t, n, o), a = await s?.json();
  if (((i = s?.headers) === null || i === void 0 ? void 0 : i[Ti]) !== "final") throw new Error("Failed to upload file: Upload status is not finalized.");
  const u = jd(a), c = new oy();
  return Object.assign(c, u), c;
}
async function tp(e, t, n, o) {
  var i, s, a;
  let u = t;
  const c = o?.baseUrl || ((i = n.clientOptions.httpOptions) === null || i === void 0 ? void 0 : i.baseUrl);
  if (c) {
    const m = new URL(c), g = new URL(t);
    g.protocol = m.protocol, g.host = m.host, g.port = m.port, u = g.toString();
  }
  let d = 0, p = 0, f = new Js(new Response()), h = "upload";
  for (d = e.size; p < d; ) {
    const m = Math.min(Fw, d - p), g = e.slice(p, p + m);
    p + m >= d && (h += ", finalize");
    let y = 0, v = Gw;
    for (; y < Bw; ) {
      const A = Object.assign(Object.assign({}, o?.headers || {}), {
        "X-Goog-Upload-Command": h,
        "X-Goog-Upload-Offset": String(p),
        "Content-Length": String(m)
      });
      if (f = await n.request({
        path: "",
        body: g,
        httpMethod: "POST",
        httpOptions: Object.assign(Object.assign({}, o), {
          apiVersion: "",
          baseUrl: u,
          headers: A
        })
      }), !((s = f?.headers) === null || s === void 0) && s[Ti]) break;
      y++, await Jw(v), v = v * Ow;
    }
    if (p += m, ((a = f?.headers) === null || a === void 0 ? void 0 : a[Ti]) !== "active") break;
    if (d <= p) throw new Error("All content has been uploaded, but the upload status is not finalized.");
  }
  return f;
}
async function Hw(e) {
  return {
    size: e.size,
    type: e.type
  };
}
function Jw(e) {
  return new Promise((t) => setTimeout(t, e));
}
var Ww = class {
  async upload(e, t, n, o) {
    if (typeof e == "string") throw new Error("File path is not supported in browser uploader.");
    return await qw(e, t, n, o);
  }
  async uploadToFileSearchStore(e, t, n, o) {
    if (typeof e == "string") throw new Error("File path is not supported in browser uploader.");
    return await Vw(e, t, n, o);
  }
  async stat(e) {
    if (typeof e == "string") throw new Error("File path is not supported in browser uploader.");
    return await Hw(e);
  }
}, Kw = class {
  create(e, t, n) {
    return new Yw(e, t, n);
  }
}, Yw = class {
  constructor(e, t, n) {
    this.url = e, this.headers = t, this.callbacks = n;
  }
  connect() {
    this.ws = new WebSocket(this.url), this.ws.onopen = this.callbacks.onopen, this.ws.onerror = this.callbacks.onerror, this.ws.onclose = this.callbacks.onclose, this.ws.onmessage = this.callbacks.onmessage;
  }
  send(e) {
    if (this.ws === void 0) throw new Error("WebSocket is not connected");
    this.ws.send(e);
  }
  close() {
    if (this.ws === void 0) throw new Error("WebSocket is not connected");
    this.ws.close();
  }
}, ju = "x-goog-api-key", zw = class {
  constructor(e) {
    this.apiKey = e;
  }
  async addAuthHeaders(e, t) {
    if (e.get(ju) === null) {
      if (this.apiKey.startsWith("auth_tokens/")) throw new Error("Ephemeral tokens are only supported by the live API.");
      if (!this.apiKey) throw new Error("API key is missing. Please provide a valid API key.");
      e.append(ju, this.apiKey);
    }
  }
}, Xw = "gl-node/", Qw = class {
  getNextGenClient() {
    var e;
    const t = this.httpOptions;
    if (this._nextGenClient === void 0) {
      const n = this.httpOptions;
      this._nextGenClient = new ae({
        baseURL: this.apiClient.getBaseUrl(),
        apiKey: this.apiKey,
        apiVersion: this.apiClient.getApiVersion(),
        clientAdapter: this.apiClient,
        defaultHeaders: this.apiClient.getDefaultHeaders(),
        timeout: n?.timeout,
        maxRetries: (e = n?.retryOptions) === null || e === void 0 ? void 0 : e.attempts
      });
    }
    return t?.extraBody && console.warn("GoogleGenAI.interactions: Client level httpOptions.extraBody is not supported by the interactions client and will be ignored."), this._nextGenClient;
  }
  get interactions() {
    return this._interactions !== void 0 ? this._interactions : (console.warn("GoogleGenAI.interactions: Interactions usage is experimental and may change in future versions."), this._interactions = this.getNextGenClient().interactions, this._interactions);
  }
  get webhooks() {
    return this._webhooks !== void 0 ? this._webhooks : (this._webhooks = this.getNextGenClient().webhooks, this._webhooks);
  }
  constructor(e) {
    var t;
    if (e.apiKey == null) throw new Error("An API Key must be set when running in a browser");
    if (e.project || e.location) throw new Error("Vertex AI project based authentication is not supported on browser runtimes. Please do not provide a project or location.");
    this.vertexai = (t = e.vertexai) !== null && t !== void 0 ? t : !1, this.apiKey = e.apiKey;
    const n = Ig(e.httpOptions, e.vertexai, void 0, void 0);
    n && (e.httpOptions ? e.httpOptions.baseUrl = n : e.httpOptions = { baseUrl: n }), this.apiVersion = e.apiVersion, this.httpOptions = e.httpOptions;
    const o = new zw(this.apiKey);
    this.apiClient = new JS({
      auth: o,
      apiVersion: this.apiVersion,
      apiKey: this.apiKey,
      vertexai: this.vertexai,
      httpOptions: this.httpOptions,
      userAgentExtra: Xw + "web",
      uploader: new Ww(),
      downloader: new $w()
    }), this.models = new dE(this.apiClient), this.live = new sE(this.apiClient, o, new Kw()), this.batches = new r_(this.apiClient), this.chats = new H_(this.models, this.apiClient), this.caches = new O_(this.apiClient), this.files = new nv(this.apiClient), this.operations = new fE(this.apiClient), this.authTokens = new xE(this.apiClient), this.tunings = new Lw(this.apiClient), this.fileSearchStores = new FE(this.apiClient);
  }
};
function ec(e) {
  try {
    return JSON.parse(e || "{}");
  } catch {
    return {};
  }
}
function no(e) {
  if (e !== void 0)
    try {
      return JSON.parse(JSON.stringify(e));
    } catch {
      return;
    }
}
function kt(e) {
  return { text: String(e || "") };
}
function Zw(e = "") {
  const t = String(e || "").match(/^data:([^;,]+);base64,(.+)$/);
  return t ? { inlineData: {
    mimeType: t[1],
    data: t[2]
  } } : null;
}
function jw(e) {
  if (typeof e == "string") return [kt(e)];
  if (!Array.isArray(e)) return [kt("")];
  const t = e.map((n) => !n || typeof n != "object" ? null : n.type === "text" ? kt(n.text || "") : n.type === "image_url" && n.image_url?.url ? Zw(n.image_url.url) : null).filter(Boolean);
  return t.length ? t : [kt("")];
}
function tc() {
  return {
    role: "user",
    parts: [kt("")]
  };
}
function So(e, t = "model") {
  if (!e?.parts?.length) return null;
  const n = no(e);
  return n ? (n.role || (n.role = t), n) : null;
}
function eA(e) {
  return !!e?.parts?.some((t) => typeof t?.thoughtSignature == "string" && t.thoughtSignature);
}
function tA(e) {
  return !!e?.parts?.some((t) => t?.functionCall?.name);
}
function ys(e, t) {
  return e?.functionCall?.name ? [
    String(e.functionCall.id || ""),
    String(e.functionCall.name || ""),
    JSON.stringify(e.functionCall.args || {}),
    String(t)
  ].join("\0") : "";
}
function nA(e = [], t = "") {
  const n = e.map((c) => So(c, "model")).filter(Boolean);
  if (!n.length) return null;
  const o = [...n].reverse().find((c) => eA(c)) || null, i = [...n].reverse().find((c) => tA(c)) || null, s = no(o || i || n[n.length - 1]);
  if (!s?.parts?.length) return n[n.length - 1];
  if (i) {
    const c = /* @__PURE__ */ new Map();
    n.forEach((p) => {
      p.parts.forEach((f, h) => {
        const m = ys(f, h);
        if (!m) return;
        const g = c.get(m);
        (!g || f.thoughtSignature || !g.thoughtSignature) && c.set(m, no(f));
      });
    });
    const d = /* @__PURE__ */ new Set();
    s.parts = s.parts.map((p, f) => {
      const h = ys(p, f);
      return h ? (d.add(h), c.get(h) || p) : p;
    }), i.parts.forEach((p, f) => {
      const h = ys(p, f);
      !h || d.has(h) || (s.parts.push(c.get(h) || no(p)), d.add(h));
    });
  }
  const a = String(t || ""), u = s.parts.filter((c) => !(typeof c?.text == "string" && !c?.thought));
  return s.parts = a ? [{ text: a }, ...u] : u, s.parts.length ? s : n[n.length - 1];
}
function nc(e) {
  const t = e?.candidates?.[0]?.content?.parts || [], n = t.filter((o) => !o?.thought && typeof o?.text == "string" && o.text).map((o) => o.text).join(`
`);
  return n || t.length ? n : typeof e?.text == "string" && e.text ? e.text : "";
}
function oc(e) {
  const t = Array.isArray(e?.functionCalls) ? e.functionCalls : [], n = (e?.candidates?.[0]?.content?.parts || []).map((o) => o?.functionCall || o).filter((o) => o && o.name);
  return (t.length ? t : n).map((o, i) => ({
    id: o.id || `google-tool-${i + 1}`,
    name: o.name || "",
    arguments: JSON.stringify(o.args || {})
  })).filter((o) => o.name);
}
function oA(e = [], t = []) {
  const n = Array.isArray(e) ? [...e] : [];
  return (Array.isArray(t) ? t : []).forEach((o) => {
    if (!o?.name) return;
    const i = [
      String(o.id || ""),
      String(o.name || ""),
      String(o.arguments || "")
    ].join("\0");
    n.some((s) => [
      String(s.id || ""),
      String(s.name || ""),
      String(s.arguments || "")
    ].join("\0") === i) || n.push(o);
  }), n;
}
function iA(e = []) {
  return {
    role: "user",
    parts: e.filter((t) => t && t.name).map((t) => ({ functionResponse: {
      name: t.name,
      response: t.response || {}
    } }))
  };
}
function sA(e) {
  switch (e) {
    case "high":
      return to.HIGH;
    case "medium":
      return to.MEDIUM;
    default:
      return to.LOW;
  }
}
function ic(e) {
  return (e?.candidates?.[0]?.content?.parts || []).filter((t) => t?.thought && typeof t.text == "string" && t.text.trim()).map((t, n) => ({
    label: `思考块 ${n + 1}`,
    text: t.text.trim()
  }));
}
function rA(e) {
  const t = [String(e.systemPrompt || "").trim(), ...(e.messages || []).filter((n) => n.role === "system").map((n) => String(n.content || "").trim())].filter(Boolean);
  if (t.length)
    return [...new Set(t)].join(`

`);
}
function aA(e) {
  const t = e?.providerPayload?.googleContent;
  return So(t, "model");
}
function lA(e) {
  const t = e?.providerPayload?.googleContents;
  if (!Array.isArray(t) || !t.length) {
    const n = aA(e);
    return n ? [n] : [];
  }
  return t.map((n) => So(n, "model")).filter(Boolean);
}
function Jr(e = []) {
  const t = (Array.isArray(e) ? e : []).map((n) => So(n, "model")).filter(Boolean);
  if (t.length)
    return {
      googleContent: t[t.length - 1],
      googleContents: t
    };
}
function uA(e) {
  const t = e?.candidates?.[0]?.content;
  return Jr(t ? [t] : []);
}
function cA(e) {
  return Jr(e ? [e] : []);
}
function np(e) {
  try {
    if (typeof e?.getHistory == "function") return e.getHistory(!1);
  } catch {
    return [];
  }
  return Array.isArray(e?.history) ? no(e.history) || [] : [];
}
function dA(e, t = 0) {
  return np(e).slice(Math.max(0, t)).filter((n) => n?.role === "model").map((n) => So(n, "model")).filter(Boolean);
}
function fA(e) {
  const t = /* @__PURE__ */ new Map(), n = [], o = (e || []).filter((s) => s.role === "user" || s.role === "assistant" || s.role === "tool");
  o.forEach((s) => {
    (s.tool_calls || []).forEach((a) => {
      a.id && a.function?.name && t.set(a.id, a.function.name);
    });
  });
  for (let s = 0; s < o.length; s += 1) {
    const a = o[s];
    if (a.role === "tool") {
      const u = [];
      let c = s;
      for (; c < o.length && o[c].role === "tool"; ) {
        const d = o[c];
        u.push({ functionResponse: {
          name: String(d.toolName || d.tool_name || "").trim() || t.get(d.tool_call_id || "") || "tool_result",
          response: ec(d.content)
        } }), c += 1;
      }
      n.push({
        role: "user",
        parts: u
      }), s = c - 1;
      continue;
    }
    if (a.role === "assistant") {
      const u = lA(a);
      if (u.length) {
        n.push(...u);
        continue;
      }
    }
    if (a.role === "assistant" && Array.isArray(a.tool_calls) && a.tool_calls.length) {
      n.push({
        role: "model",
        parts: [...a.content ? [kt(a.content)] : [], ...a.tool_calls.map((u) => ({ functionCall: {
          name: u.function.name,
          args: ec(u.function.arguments)
        } }))]
      });
      continue;
    }
    n.push({
      role: a.role === "assistant" ? "model" : "user",
      parts: jw(a.content)
    });
  }
  if (!n.length) return {
    history: [],
    latestMessage: tc().parts
  };
  const i = n[n.length - 1];
  return i.role === "user" && i.parts?.length ? {
    history: n.slice(0, -1),
    latestMessage: i.parts
  } : {
    history: n,
    latestMessage: tc().parts
  };
}
function pA(e, t) {
  typeof e.onStreamProgress == "function" && e.onStreamProgress({
    ...typeof t.text == "string" ? { text: t.text } : {},
    ...Array.isArray(t.thoughts) ? { thoughts: t.thoughts } : {}
  });
}
function sc(e, t) {
  const n = String(t || ""), o = String(e || "");
  return n ? !o || n.startsWith(o) ? n : o.endsWith(n) ? o : `${o}${n}` : o;
}
var hA = class {
  constructor(e) {
    this.config = e, this.supportsSessionToolLoop = !0, this.activeChat = null, this.client = new Qw({
      apiKey: e.apiKey,
      httpOptions: {
        baseUrl: String(e.baseUrl || "https://generativelanguage.googleapis.com/v1beta").replace(/\/$/, ""),
        timeout: Number(e.timeoutMs) || 900 * 1e3
      }
    });
  }
  createChat(e) {
    const t = fA(e.messages), n = Array.isArray(e.tools) ? e.tools : [], o = rA(e), i = {
      ...o ? { systemInstruction: o } : {},
      temperature: e.temperature,
      ...e.maxTokens ? { maxOutputTokens: e.maxTokens } : {}
    };
    e.reasoning?.enabled && (i.thinkingConfig = {
      includeThoughts: !0,
      thinkingLevel: sA(e.reasoning.effort)
    }), n.length && (i.tools = [{ functionDeclarations: n.map((a) => ({
      name: a.function.name,
      description: a.function.description,
      parameters: a.function.parameters
    })) }]), n.length && e.toolChoice && e.toolChoice !== "auto" && e.toolChoice !== "none" && (i.toolConfig = { functionCallingConfig: { mode: qs.ANY } });
    const s = {
      model: this.config.model,
      history: t.history,
      config: i
    };
    return {
      chat: this.client.chats.create(s),
      sendPayload: { message: t.latestMessage }
    };
  }
  async sendThroughChat(e, t, n) {
    let o, i, s, a = [], u = null;
    const c = { ...t }, d = typeof n.onStreamProgress == "function", p = np(e).length;
    if (d) {
      const g = await e.sendMessageStream(c), y = /* @__PURE__ */ new Map();
      let v = "", A = [], C = null;
      const R = [];
      for await (const M of g) {
        C = M;
        const x = M?.candidates?.[0]?.content;
        x?.parts?.length && R.push(x), ic(M).forEach((L, P) => {
          const N = `${L.label}:${P}`;
          y.set(N, sc(y.get(N) || "", L.text));
        }), A = (M.functionCalls || []).map((L, P) => ({
          id: L.id || `google-tool-${P + 1}`,
          name: L.name || "",
          arguments: JSON.stringify(L.args || {})
        })).filter((L) => L.name), a = oA(a, A.length ? A : oc(M));
        const w = nc(M);
        v = sc(v, w), pA(n, {
          text: v,
          thoughts: Array.from(y.values()).filter(Boolean).map((L, P) => ({
            label: `思考块 ${P + 1}`,
            text: L
          }))
        });
      }
      o = C || { functionCalls: A }, u = nA(R, v) || o?.candidates?.[0]?.content || null, i = Array.from(y.values()).filter(Boolean).map((M, x) => ({
        label: `思考块 ${x + 1}`,
        text: M
      })), s = v;
    } else
      o = await e.sendMessage(c), i = ic(o), s = nc(o);
    const f = oc(o), h = f.length ? f : a, m = dA(e, p);
    return {
      text: s,
      toolCalls: h,
      thoughts: i,
      finishReason: o.candidates?.[0]?.finishReason || "STOP",
      model: o.modelVersion || this.config.model,
      provider: "google",
      providerPayload: Jr(m) || cA(u) || uA(o)
    };
  }
  async chat(e) {
    if (Array.isArray(e.toolResponses) && e.toolResponses.length) {
      if (!this.activeChat) throw new Error("google_chat_session_missing");
      return await this.sendThroughChat(this.activeChat, { message: iA(e.toolResponses) }, e);
    }
    const t = String(e.finalAnswerReminderText || "").trim();
    if (t) {
      if (!this.activeChat) throw new Error("google_chat_session_missing");
      return await this.sendThroughChat(this.activeChat, { message: [kt(t)] }, e);
    }
    const n = this.createChat(e);
    return this.activeChat = n.chat, await this.sendThroughChat(this.activeChat, n.sendPayload, e);
  }
};
function O(e, t, n, o, i) {
  if (o === "m") throw new TypeError("Private method is not writable");
  if (o === "a" && !i) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return o === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}
function E(e, t, n, o) {
  if (n === "a" && !o) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? e !== t || !o : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n === "m" ? o : n === "a" ? o.call(e) : o ? o.value : t.get(e);
}
var op = function() {
  const { crypto: e } = globalThis;
  if (e?.randomUUID)
    return op = e.randomUUID.bind(e), e.randomUUID();
  const t = new Uint8Array(1), n = e ? () => e.getRandomValues(t)[0] : () => Math.random() * 255 & 255;
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (o) => (+o ^ n() & 15 >> +o / 4).toString(16));
};
function ir(e) {
  return typeof e == "object" && e !== null && ("name" in e && e.name === "AbortError" || "message" in e && String(e.message).includes("FetchRequestCanceledException"));
}
var sr = (e) => {
  if (e instanceof Error) return e;
  if (typeof e == "object" && e !== null) {
    try {
      if (Object.prototype.toString.call(e) === "[object Error]") {
        const t = new Error(e.message, e.cause ? { cause: e.cause } : {});
        return e.stack && (t.stack = e.stack), e.cause && !t.cause && (t.cause = e.cause), e.name && (t.name = e.name), t;
      }
    } catch {
    }
    try {
      return new Error(JSON.stringify(e));
    } catch {
    }
  }
  return new Error(e);
}, B = class extends Error {
}, me = class rr extends B {
  constructor(t, n, o, i) {
    super(`${rr.makeMessage(t, n, o)}`), this.status = t, this.headers = i, this.requestID = i?.get("x-request-id"), this.error = n;
    const s = n;
    this.code = s?.code, this.param = s?.param, this.type = s?.type;
  }
  static makeMessage(t, n, o) {
    const i = n?.message ? typeof n.message == "string" ? n.message : JSON.stringify(n.message) : n ? JSON.stringify(n) : o;
    return t && i ? `${t} ${i}` : t ? `${t} status code (no body)` : i || "(no status code or body)";
  }
  static generate(t, n, o, i) {
    if (!t || !i) return new Fi({
      message: o,
      cause: sr(n)
    });
    const s = n?.error;
    return t === 400 ? new ip(t, s, o, i) : t === 401 ? new sp(t, s, o, i) : t === 403 ? new rp(t, s, o, i) : t === 404 ? new ap(t, s, o, i) : t === 409 ? new lp(t, s, o, i) : t === 422 ? new up(t, s, o, i) : t === 429 ? new cp(t, s, o, i) : t >= 500 ? new dp(t, s, o, i) : new rr(t, s, o, i);
  }
}, Ge = class extends me {
  constructor({ message: e } = {}) {
    super(void 0, void 0, e || "Request was aborted.", void 0);
  }
}, Fi = class extends me {
  constructor({ message: e, cause: t }) {
    super(void 0, void 0, e || "Connection error.", void 0), t && (this.cause = t);
  }
}, Wr = class extends Fi {
  constructor({ message: e } = {}) {
    super({ message: e ?? "Request timed out." });
  }
}, ip = class extends me {
}, sp = class extends me {
}, rp = class extends me {
}, ap = class extends me {
}, lp = class extends me {
}, up = class extends me {
}, cp = class extends me {
}, dp = class extends me {
}, fp = class extends B {
  constructor() {
    super("Could not parse response content as the length limit was reached");
  }
}, pp = class extends B {
  constructor() {
    super("Could not parse response content as the request was rejected by the content filter");
  }
}, Vn = class extends Error {
  constructor(e) {
    super(e);
  }
}, hp = class extends me {
  constructor(e, t, n) {
    let o = "OAuth2 authentication error", i;
    if (t && typeof t == "object") {
      const s = t;
      i = s.error;
      const a = s.error_description;
      a && typeof a == "string" ? o = a : i && (o = i);
    }
    super(e, t, o, n), this.error_code = i;
  }
}, mA = class extends B {
  constructor(e, t, n) {
    super(e), this.provider = t, this.cause = n;
  }
}, gA = /^[a-z][a-z0-9+.-]*:/i, yA = (e) => gA.test(e), we = (e) => (we = Array.isArray, we(e)), rc = we;
function mp(e) {
  return typeof e != "object" ? {} : e ?? {};
}
function ac(e) {
  if (!e) return !0;
  for (const t in e) return !1;
  return !0;
}
function _A(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function _s(e) {
  return e != null && typeof e == "object" && !Array.isArray(e);
}
var vA = (e, t) => {
  if (typeof t != "number" || !Number.isInteger(t)) throw new B(`${e} must be an integer`);
  if (t < 0) throw new B(`${e} must be a positive integer`);
  return t;
}, TA = (e) => {
  try {
    return JSON.parse(e);
  } catch {
    return;
  }
}, Eo = (e) => new Promise((t) => setTimeout(t, e)), Xt = "6.34.0", SA = () => typeof window < "u" && typeof window.document < "u" && typeof navigator < "u";
function EA() {
  return typeof Deno < "u" && Deno.build != null ? "deno" : typeof EdgeRuntime < "u" ? "edge" : Object.prototype.toString.call(typeof globalThis.process < "u" ? globalThis.process : 0) === "[object process]" ? "node" : "unknown";
}
var wA = () => {
  const e = EA();
  if (e === "deno") return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": Xt,
    "X-Stainless-OS": uc(Deno.build.os),
    "X-Stainless-Arch": lc(Deno.build.arch),
    "X-Stainless-Runtime": "deno",
    "X-Stainless-Runtime-Version": typeof Deno.version == "string" ? Deno.version : Deno.version?.deno ?? "unknown"
  };
  if (typeof EdgeRuntime < "u") return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": Xt,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": `other:${EdgeRuntime}`,
    "X-Stainless-Runtime": "edge",
    "X-Stainless-Runtime-Version": globalThis.process.version
  };
  if (e === "node") return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": Xt,
    "X-Stainless-OS": uc(globalThis.process.platform ?? "unknown"),
    "X-Stainless-Arch": lc(globalThis.process.arch ?? "unknown"),
    "X-Stainless-Runtime": "node",
    "X-Stainless-Runtime-Version": globalThis.process.version ?? "unknown"
  };
  const t = AA();
  return t ? {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": Xt,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": `browser:${t.browser}`,
    "X-Stainless-Runtime-Version": t.version
  } : {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": Xt,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": "unknown",
    "X-Stainless-Runtime-Version": "unknown"
  };
};
function AA() {
  if (typeof navigator > "u" || !navigator) return null;
  for (const { key: e, pattern: t } of [
    {
      key: "edge",
      pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    },
    {
      key: "ie",
      pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    },
    {
      key: "ie",
      pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/
    },
    {
      key: "chrome",
      pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    },
    {
      key: "firefox",
      pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    },
    {
      key: "safari",
      pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/
    }
  ]) {
    const n = t.exec(navigator.userAgent);
    if (n) return {
      browser: e,
      version: `${n[1] || 0}.${n[2] || 0}.${n[3] || 0}`
    };
  }
  return null;
}
var lc = (e) => e === "x32" ? "x32" : e === "x86_64" || e === "x64" ? "x64" : e === "arm" ? "arm" : e === "aarch64" || e === "arm64" ? "arm64" : e ? `other:${e}` : "unknown", uc = (e) => (e = e.toLowerCase(), e.includes("ios") ? "iOS" : e === "android" ? "Android" : e === "darwin" ? "MacOS" : e === "win32" ? "Windows" : e === "freebsd" ? "FreeBSD" : e === "openbsd" ? "OpenBSD" : e === "linux" ? "Linux" : e ? `Other:${e}` : "Unknown"), cc, CA = () => cc ?? (cc = wA());
function gp() {
  if (typeof fetch < "u") return fetch;
  throw new Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new OpenAI({ fetch })` or polyfill the global, `globalThis.fetch = fetch`");
}
function yp(...e) {
  const t = globalThis.ReadableStream;
  if (typeof t > "u") throw new Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");
  return new t(...e);
}
function _p(e) {
  let t = Symbol.asyncIterator in e ? e[Symbol.asyncIterator]() : e[Symbol.iterator]();
  return yp({
    start() {
    },
    async pull(n) {
      const { done: o, value: i } = await t.next();
      o ? n.close() : n.enqueue(i);
    },
    async cancel() {
      await t.return?.();
    }
  });
}
function vp(e) {
  if (e[Symbol.asyncIterator]) return e;
  const t = e.getReader();
  return {
    async next() {
      try {
        const n = await t.read();
        return n?.done && t.releaseLock(), n;
      } catch (n) {
        throw t.releaseLock(), n;
      }
    },
    async return() {
      const n = t.cancel();
      return t.releaseLock(), await n, {
        done: !0,
        value: void 0
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
async function dc(e) {
  if (e === null || typeof e != "object") return;
  if (e[Symbol.asyncIterator]) {
    await e[Symbol.asyncIterator]().return?.();
    return;
  }
  const t = e.getReader(), n = t.cancel();
  t.releaseLock(), await n;
}
var IA = ({ headers: e, body: t }) => ({
  bodyHeaders: { "content-type": "application/json" },
  body: JSON.stringify(t)
}), Tp = "RFC3986", Sp = (e) => String(e), fc = {
  RFC1738: (e) => String(e).replace(/%20/g, "+"),
  RFC3986: Sp
};
var ar = (e, t) => (ar = Object.hasOwn ?? Function.prototype.call.bind(Object.prototype.hasOwnProperty), ar(e, t)), Qe = /* @__PURE__ */ (() => {
  const e = [];
  for (let t = 0; t < 256; ++t) e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
  return e;
})(), vs = 1024, bA = (e, t, n, o, i) => {
  if (e.length === 0) return e;
  let s = e;
  if (typeof e == "symbol" ? s = Symbol.prototype.toString.call(e) : typeof e != "string" && (s = String(e)), n === "iso-8859-1") return escape(s).replace(/%u[0-9a-f]{4}/gi, function(u) {
    return "%26%23" + parseInt(u.slice(2), 16) + "%3B";
  });
  let a = "";
  for (let u = 0; u < s.length; u += vs) {
    const c = s.length >= vs ? s.slice(u, u + vs) : s, d = [];
    for (let p = 0; p < c.length; ++p) {
      let f = c.charCodeAt(p);
      if (f === 45 || f === 46 || f === 95 || f === 126 || f >= 48 && f <= 57 || f >= 65 && f <= 90 || f >= 97 && f <= 122 || i === "RFC1738" && (f === 40 || f === 41)) {
        d[d.length] = c.charAt(p);
        continue;
      }
      if (f < 128) {
        d[d.length] = Qe[f];
        continue;
      }
      if (f < 2048) {
        d[d.length] = Qe[192 | f >> 6] + Qe[128 | f & 63];
        continue;
      }
      if (f < 55296 || f >= 57344) {
        d[d.length] = Qe[224 | f >> 12] + Qe[128 | f >> 6 & 63] + Qe[128 | f & 63];
        continue;
      }
      p += 1, f = 65536 + ((f & 1023) << 10 | c.charCodeAt(p) & 1023), d[d.length] = Qe[240 | f >> 18] + Qe[128 | f >> 12 & 63] + Qe[128 | f >> 6 & 63] + Qe[128 | f & 63];
    }
    a += d.join("");
  }
  return a;
};
function RA(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}
function pc(e, t) {
  if (we(e)) {
    const n = [];
    for (let o = 0; o < e.length; o += 1) n.push(t(e[o]));
    return n;
  }
  return t(e);
}
var Ep = {
  brackets(e) {
    return String(e) + "[]";
  },
  comma: "comma",
  indices(e, t) {
    return String(e) + "[" + t + "]";
  },
  repeat(e) {
    return String(e);
  }
}, wp = function(e, t) {
  Array.prototype.push.apply(e, we(t) ? t : [t]);
}, hc, se = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: bA,
  encodeValuesOnly: !1,
  format: Tp,
  formatter: Sp,
  indices: !1,
  serializeDate(e) {
    return (hc ?? (hc = Function.prototype.call.bind(Date.prototype.toISOString)))(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
};
function PA(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}
var Ts = {};
function Ap(e, t, n, o, i, s, a, u, c, d, p, f, h, m, g, y, v, A) {
  let C = e, R = A, M = 0, x = !1;
  for (; (R = R.get(Ts)) !== void 0 && !x; ) {
    const V = R.get(e);
    if (M += 1, typeof V < "u") {
      if (V === M) throw new RangeError("Cyclic object value");
      x = !0;
    }
    typeof R.get(Ts) > "u" && (M = 0);
  }
  if (typeof d == "function" ? C = d(t, C) : C instanceof Date ? C = h?.(C) : n === "comma" && we(C) && (C = pc(C, function(V) {
    return V instanceof Date ? h?.(V) : V;
  })), C === null) {
    if (s) return c && !y ? c(t, se.encoder, v, "key", m) : t;
    C = "";
  }
  if (PA(C) || RA(C)) {
    if (c) {
      const V = y ? t : c(t, se.encoder, v, "key", m);
      return [g?.(V) + "=" + g?.(c(C, se.encoder, v, "value", m))];
    }
    return [g?.(t) + "=" + g?.(String(C))];
  }
  const w = [];
  if (typeof C > "u") return w;
  let L;
  if (n === "comma" && we(C))
    y && c && (C = pc(C, c)), L = [{ value: C.length > 0 ? C.join(",") || null : void 0 }];
  else if (we(d)) L = d;
  else {
    const V = Object.keys(C);
    L = p ? V.sort(p) : V;
  }
  const P = u ? String(t).replace(/\./g, "%2E") : String(t), N = o && we(C) && C.length === 1 ? P + "[]" : P;
  if (i && we(C) && C.length === 0) return N + "[]";
  for (let V = 0; V < L.length; ++V) {
    const Y = L[V], j = typeof Y == "object" && typeof Y.value < "u" ? Y.value : C[Y];
    if (a && j === null) continue;
    const ee = f && u ? Y.replace(/\./g, "%2E") : Y, Q = we(C) ? typeof n == "function" ? n(N, ee) : N : N + (f ? "." + ee : "[" + ee + "]");
    A.set(e, M);
    const X = /* @__PURE__ */ new WeakMap();
    X.set(Ts, A), wp(w, Ap(j, Q, n, o, i, s, a, u, n === "comma" && y && we(C) ? null : c, d, p, f, h, m, g, y, v, X));
  }
  return w;
}
function xA(e = se) {
  if (typeof e.allowEmptyArrays < "u" && typeof e.allowEmptyArrays != "boolean") throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof e.encodeDotInKeys < "u" && typeof e.encodeDotInKeys != "boolean") throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (e.encoder !== null && typeof e.encoder < "u" && typeof e.encoder != "function") throw new TypeError("Encoder has to be a function.");
  const t = e.charset || se.charset;
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1") throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  let n = Tp;
  if (typeof e.format < "u") {
    if (!ar(fc, e.format)) throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  const o = fc[n];
  let i = se.filter;
  (typeof e.filter == "function" || we(e.filter)) && (i = e.filter);
  let s;
  if (e.arrayFormat && e.arrayFormat in Ep ? s = e.arrayFormat : "indices" in e ? s = e.indices ? "indices" : "repeat" : s = se.arrayFormat, "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean") throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  const a = typeof e.allowDots > "u" ? e.encodeDotInKeys ? !0 : se.allowDots : !!e.allowDots;
  return {
    addQueryPrefix: typeof e.addQueryPrefix == "boolean" ? e.addQueryPrefix : se.addQueryPrefix,
    allowDots: a,
    allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : se.allowEmptyArrays,
    arrayFormat: s,
    charset: t,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : se.charsetSentinel,
    commaRoundTrip: !!e.commaRoundTrip,
    delimiter: typeof e.delimiter > "u" ? se.delimiter : e.delimiter,
    encode: typeof e.encode == "boolean" ? e.encode : se.encode,
    encodeDotInKeys: typeof e.encodeDotInKeys == "boolean" ? e.encodeDotInKeys : se.encodeDotInKeys,
    encoder: typeof e.encoder == "function" ? e.encoder : se.encoder,
    encodeValuesOnly: typeof e.encodeValuesOnly == "boolean" ? e.encodeValuesOnly : se.encodeValuesOnly,
    filter: i,
    format: n,
    formatter: o,
    serializeDate: typeof e.serializeDate == "function" ? e.serializeDate : se.serializeDate,
    skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : se.skipNulls,
    sort: typeof e.sort == "function" ? e.sort : null,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : se.strictNullHandling
  };
}
function MA(e, t = {}) {
  let n = e;
  const o = xA(t);
  let i, s;
  typeof o.filter == "function" ? (s = o.filter, n = s("", n)) : we(o.filter) && (s = o.filter, i = s);
  const a = [];
  if (typeof n != "object" || n === null) return "";
  const u = Ep[o.arrayFormat], c = u === "comma" && o.commaRoundTrip;
  i || (i = Object.keys(n)), o.sort && i.sort(o.sort);
  const d = /* @__PURE__ */ new WeakMap();
  for (let h = 0; h < i.length; ++h) {
    const m = i[h];
    o.skipNulls && n[m] === null || wp(a, Ap(n[m], m, u, c, o.allowEmptyArrays, o.strictNullHandling, o.skipNulls, o.encodeDotInKeys, o.encode ? o.encoder : null, o.filter, o.sort, o.allowDots, o.serializeDate, o.format, o.formatter, o.encodeValuesOnly, o.charset, d));
  }
  const p = a.join(o.delimiter);
  let f = o.addQueryPrefix === !0 ? "?" : "";
  return o.charsetSentinel && (o.charset === "iso-8859-1" ? f += "utf8=%26%2310003%3B&" : f += "utf8=%E2%9C%93&"), p.length > 0 ? f + p : "";
}
function NA(e) {
  return MA(e, { arrayFormat: "brackets" });
}
function kA(e) {
  let t = 0;
  for (const i of e) t += i.length;
  const n = new Uint8Array(t);
  let o = 0;
  for (const i of e)
    n.set(i, o), o += i.length;
  return n;
}
var mc;
function Kr(e) {
  let t;
  return (mc ?? (t = new globalThis.TextEncoder(), mc = t.encode.bind(t)))(e);
}
var gc;
function yc(e) {
  let t;
  return (gc ?? (t = new globalThis.TextDecoder(), gc = t.decode.bind(t)))(e);
}
var Pe, xe, Bi = class {
  constructor() {
    Pe.set(this, void 0), xe.set(this, void 0), O(this, Pe, new Uint8Array(), "f"), O(this, xe, null, "f");
  }
  decode(e) {
    if (e == null) return [];
    const t = e instanceof ArrayBuffer ? new Uint8Array(e) : typeof e == "string" ? Kr(e) : e;
    O(this, Pe, kA([E(this, Pe, "f"), t]), "f");
    const n = [];
    let o;
    for (; (o = DA(E(this, Pe, "f"), E(this, xe, "f"))) != null; ) {
      if (o.carriage && E(this, xe, "f") == null) {
        O(this, xe, o.index, "f");
        continue;
      }
      if (E(this, xe, "f") != null && (o.index !== E(this, xe, "f") + 1 || o.carriage)) {
        n.push(yc(E(this, Pe, "f").subarray(0, E(this, xe, "f") - 1))), O(this, Pe, E(this, Pe, "f").subarray(E(this, xe, "f")), "f"), O(this, xe, null, "f");
        continue;
      }
      const i = E(this, xe, "f") !== null ? o.preceding - 1 : o.preceding, s = yc(E(this, Pe, "f").subarray(0, i));
      n.push(s), O(this, Pe, E(this, Pe, "f").subarray(o.index), "f"), O(this, xe, null, "f");
    }
    return n;
  }
  flush() {
    return E(this, Pe, "f").length ? this.decode(`
`) : [];
  }
};
Pe = /* @__PURE__ */ new WeakMap(), xe = /* @__PURE__ */ new WeakMap();
Bi.NEWLINE_CHARS = /* @__PURE__ */ new Set([`
`, "\r"]);
Bi.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
function DA(e, t) {
  for (let i = t ?? 0; i < e.length; i++) {
    if (e[i] === 10) return {
      preceding: i,
      index: i + 1,
      carriage: !1
    };
    if (e[i] === 13) return {
      preceding: i,
      index: i + 1,
      carriage: !0
    };
  }
  return null;
}
function UA(e) {
  for (let o = 0; o < e.length - 1; o++) {
    if (e[o] === 10 && e[o + 1] === 10 || e[o] === 13 && e[o + 1] === 13) return o + 2;
    if (e[o] === 13 && e[o + 1] === 10 && o + 3 < e.length && e[o + 2] === 13 && e[o + 3] === 10) return o + 4;
  }
  return -1;
}
var Si = {
  off: 0,
  error: 200,
  warn: 300,
  info: 400,
  debug: 500
}, _c = (e, t, n) => {
  if (e) {
    if (_A(Si, e)) return e;
    fe(n).warn(`${t} was set to ${JSON.stringify(e)}, expected one of ${JSON.stringify(Object.keys(Si))}`);
  }
};
function Hn() {
}
function Ho(e, t, n) {
  return !t || Si[e] > Si[n] ? Hn : t[e].bind(t);
}
var LA = {
  error: Hn,
  warn: Hn,
  info: Hn,
  debug: Hn
}, vc = /* @__PURE__ */ new WeakMap();
function fe(e) {
  const t = e.logger, n = e.logLevel ?? "off";
  if (!t) return LA;
  const o = vc.get(t);
  if (o && o[0] === n) return o[1];
  const i = {
    error: Ho("error", t, n),
    warn: Ho("warn", t, n),
    info: Ho("info", t, n),
    debug: Ho("debug", t, n)
  };
  return vc.set(t, [n, i]), i;
}
var Rt = (e) => (e.options && (e.options = { ...e.options }, delete e.options.headers), e.headers && (e.headers = Object.fromEntries((e.headers instanceof Headers ? [...e.headers] : Object.entries(e.headers)).map(([t, n]) => [t, t.toLowerCase() === "authorization" || t.toLowerCase() === "cookie" || t.toLowerCase() === "set-cookie" ? "***" : n]))), "retryOfRequestLogID" in e && (e.retryOfRequestLogID && (e.retryOf = e.retryOfRequestLogID), delete e.retryOfRequestLogID), e), $n, fo = class Jn {
  constructor(t, n, o) {
    this.iterator = t, $n.set(this, void 0), this.controller = n, O(this, $n, o, "f");
  }
  static fromSSEResponse(t, n, o, i) {
    let s = !1;
    const a = o ? fe(o) : console;
    async function* u() {
      if (s) throw new B("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      s = !0;
      let c = !1;
      try {
        for await (const d of $A(t, n))
          if (!c) {
            if (d.data.startsWith("[DONE]")) {
              c = !0;
              continue;
            }
            if (d.event === null || !d.event.startsWith("thread.")) {
              let p;
              try {
                p = JSON.parse(d.data);
              } catch (f) {
                throw a.error("Could not parse message into JSON:", d.data), a.error("From chunk:", d.raw), f;
              }
              if (p && p.error) throw new me(void 0, p.error, void 0, t.headers);
              yield i ? {
                event: d.event,
                data: p
              } : p;
            } else {
              let p;
              try {
                p = JSON.parse(d.data);
              } catch (f) {
                throw console.error("Could not parse message into JSON:", d.data), console.error("From chunk:", d.raw), f;
              }
              if (d.event == "error") throw new me(void 0, p.error, p.message, void 0);
              yield {
                event: d.event,
                data: p
              };
            }
          }
        c = !0;
      } catch (d) {
        if (ir(d)) return;
        throw d;
      } finally {
        c || n.abort();
      }
    }
    return new Jn(u, n, o);
  }
  static fromReadableStream(t, n, o) {
    let i = !1;
    async function* s() {
      const u = new Bi(), c = vp(t);
      for await (const d of c) for (const p of u.decode(d)) yield p;
      for (const d of u.flush()) yield d;
    }
    async function* a() {
      if (i) throw new B("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      i = !0;
      let u = !1;
      try {
        for await (const c of s())
          u || c && (yield JSON.parse(c));
        u = !0;
      } catch (c) {
        if (ir(c)) return;
        throw c;
      } finally {
        u || n.abort();
      }
    }
    return new Jn(a, n, o);
  }
  [($n = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    return this.iterator();
  }
  tee() {
    const t = [], n = [], o = this.iterator(), i = (s) => ({ next: () => {
      if (s.length === 0) {
        const a = o.next();
        t.push(a), n.push(a);
      }
      return s.shift();
    } });
    return [new Jn(() => i(t), this.controller, E(this, $n, "f")), new Jn(() => i(n), this.controller, E(this, $n, "f"))];
  }
  toReadableStream() {
    const t = this;
    let n;
    return yp({
      async start() {
        n = t[Symbol.asyncIterator]();
      },
      async pull(o) {
        try {
          const { value: i, done: s } = await n.next();
          if (s) return o.close();
          const a = Kr(JSON.stringify(i) + `
`);
          o.enqueue(a);
        } catch (i) {
          o.error(i);
        }
      },
      async cancel() {
        await n.return?.();
      }
    });
  }
};
async function* $A(e, t) {
  if (!e.body)
    throw t.abort(), typeof globalThis.navigator < "u" && globalThis.navigator.product === "ReactNative" ? new B("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api") : new B("Attempted to iterate over a response with no body");
  const n = new BA(), o = new Bi(), i = vp(e.body);
  for await (const s of FA(i)) for (const a of o.decode(s)) {
    const u = n.decode(a);
    u && (yield u);
  }
  for (const s of o.flush()) {
    const a = n.decode(s);
    a && (yield a);
  }
}
async function* FA(e) {
  let t = new Uint8Array();
  for await (const n of e) {
    if (n == null) continue;
    const o = n instanceof ArrayBuffer ? new Uint8Array(n) : typeof n == "string" ? Kr(n) : n;
    let i = new Uint8Array(t.length + o.length);
    i.set(t), i.set(o, t.length), t = i;
    let s;
    for (; (s = UA(t)) !== -1; )
      yield t.slice(0, s), t = t.slice(s);
  }
  t.length > 0 && (yield t);
}
var BA = class {
  constructor() {
    this.event = null, this.data = [], this.chunks = [];
  }
  decode(e) {
    if (e.endsWith("\r") && (e = e.substring(0, e.length - 1)), !e) {
      if (!this.event && !this.data.length) return null;
      const i = {
        event: this.event,
        data: this.data.join(`
`),
        raw: this.chunks
      };
      return this.event = null, this.data = [], this.chunks = [], i;
    }
    if (this.chunks.push(e), e.startsWith(":")) return null;
    let [t, n, o] = GA(e, ":");
    return o.startsWith(" ") && (o = o.substring(1)), t === "event" ? this.event = o : t === "data" && this.data.push(o), null;
  }
};
function GA(e, t) {
  const n = e.indexOf(t);
  return n !== -1 ? [
    e.substring(0, n),
    t,
    e.substring(n + t.length)
  ] : [
    e,
    "",
    ""
  ];
}
async function Cp(e, t) {
  const { response: n, requestLogID: o, retryOfRequestLogID: i, startTime: s } = t, a = await (async () => {
    if (t.options.stream)
      return fe(e).debug("response", n.status, n.url, n.headers, n.body), t.options.__streamClass ? t.options.__streamClass.fromSSEResponse(n, t.controller, e, t.options.__synthesizeEventData) : fo.fromSSEResponse(n, t.controller, e, t.options.__synthesizeEventData);
    if (n.status === 204) return null;
    if (t.options.__binaryResponse) return n;
    const u = n.headers.get("content-type")?.split(";")[0]?.trim();
    return u?.includes("application/json") || u?.endsWith("+json") ? n.headers.get("content-length") === "0" ? void 0 : Ip(await n.json(), n) : await n.text();
  })();
  return fe(e).debug(`[${o}] response parsed`, Rt({
    retryOfRequestLogID: i,
    url: n.url,
    status: n.status,
    body: a,
    durationMs: Date.now() - s
  })), a;
}
function Ip(e, t) {
  return !e || typeof e != "object" || Array.isArray(e) ? e : Object.defineProperty(e, "_request_id", {
    value: t.headers.get("x-request-id"),
    enumerable: !1
  });
}
var Wn, bp = class Rp extends Promise {
  constructor(t, n, o = Cp) {
    super((i) => {
      i(null);
    }), this.responsePromise = n, this.parseResponse = o, Wn.set(this, void 0), O(this, Wn, t, "f");
  }
  _thenUnwrap(t) {
    return new Rp(E(this, Wn, "f"), this.responsePromise, async (n, o) => Ip(t(await this.parseResponse(n, o), o), o.response));
  }
  asResponse() {
    return this.responsePromise.then((t) => t.response);
  }
  async withResponse() {
    const [t, n] = await Promise.all([this.parse(), this.asResponse()]);
    return {
      data: t,
      response: n,
      request_id: n.headers.get("x-request-id")
    };
  }
  parse() {
    return this.parsedPromise || (this.parsedPromise = this.responsePromise.then((t) => this.parseResponse(E(this, Wn, "f"), t))), this.parsedPromise;
  }
  then(t, n) {
    return this.parse().then(t, n);
  }
  catch(t) {
    return this.parse().catch(t);
  }
  finally(t) {
    return this.parse().finally(t);
  }
};
Wn = /* @__PURE__ */ new WeakMap();
var Jo, Yr = class {
  constructor(e, t, n, o) {
    Jo.set(this, void 0), O(this, Jo, e, "f"), this.options = o, this.response = t, this.body = n;
  }
  hasNextPage() {
    return this.getPaginatedItems().length ? this.nextPageRequestOptions() != null : !1;
  }
  async getNextPage() {
    const e = this.nextPageRequestOptions();
    if (!e) throw new B("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
    return await E(this, Jo, "f").requestAPIList(this.constructor, e);
  }
  async *iterPages() {
    let e = this;
    for (yield e; e.hasNextPage(); )
      e = await e.getNextPage(), yield e;
  }
  async *[(Jo = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    for await (const e of this.iterPages()) for (const t of e.getPaginatedItems()) yield t;
  }
}, OA = class extends bp {
  constructor(e, t, n) {
    super(e, t, async (o, i) => new n(o, i.response, await Cp(o, i), i.options));
  }
  async *[Symbol.asyncIterator]() {
    const e = await this;
    for await (const t of e) yield t;
  }
}, Gi = class extends Yr {
  constructor(e, t, n, o) {
    super(e, t, n, o), this.data = n.data || [], this.object = n.object;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  nextPageRequestOptions() {
    return null;
  }
}, te = class extends Yr {
  constructor(e, t, n, o) {
    super(e, t, n, o), this.data = n.data || [], this.has_more = n.has_more || !1;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  hasNextPage() {
    return this.has_more === !1 ? !1 : super.hasNextPage();
  }
  nextPageRequestOptions() {
    const e = this.getPaginatedItems(), t = e[e.length - 1]?.id;
    return t ? {
      ...this.options,
      query: {
        ...mp(this.options.query),
        after: t
      }
    } : null;
  }
}, po = class extends Yr {
  constructor(e, t, n, o) {
    super(e, t, n, o), this.data = n.data || [], this.has_more = n.has_more || !1, this.last_id = n.last_id || "";
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  hasNextPage() {
    return this.has_more === !1 ? !1 : super.hasNextPage();
  }
  nextPageRequestOptions() {
    const e = this.last_id;
    return e ? {
      ...this.options,
      query: {
        ...mp(this.options.query),
        after: e
      }
    } : null;
  }
}, qA = {
  jwt: "urn:ietf:params:oauth:token-type:jwt",
  id: "urn:ietf:params:oauth:token-type:id_token"
}, VA = "urn:ietf:params:oauth:grant-type:token-exchange", HA = class {
  constructor(e, t) {
    this.cachedToken = null, this.refreshPromise = null, this.tokenExchangeUrl = "https://auth.openai.com/oauth/token", this.config = e, this.fetch = t ?? gp();
  }
  async getToken() {
    if (!this.cachedToken || this.isTokenExpired(this.cachedToken)) {
      if (this.refreshPromise) return await this.refreshPromise;
      this.refreshPromise = this.refreshToken();
      try {
        return await this.refreshPromise;
      } finally {
        this.refreshPromise = null;
      }
    }
    return this.needsRefresh(this.cachedToken) && !this.refreshPromise && (this.refreshPromise = this.refreshToken().finally(() => {
      this.refreshPromise = null;
    })), this.cachedToken.token;
  }
  async refreshToken() {
    const e = await this.config.provider.getToken(), t = await this.fetch(this.tokenExchangeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: VA,
        client_id: this.config.clientId,
        subject_token: e,
        subject_token_type: qA[this.config.provider.tokenType],
        identity_provider_id: this.config.identityProviderId,
        service_account_id: this.config.serviceAccountId
      })
    });
    if (!t.ok) {
      const s = await t.text();
      let a;
      try {
        a = JSON.parse(s);
      } catch {
      }
      throw t.status === 400 || t.status === 401 || t.status === 403 ? new hp(t.status, a, t.headers) : me.generate(t.status, a, `Token exchange failed with status ${t.status}`, t.headers);
    }
    const n = await t.json(), o = n.expires_in || 3600, i = Date.now() + o * 1e3;
    return this.cachedToken = {
      token: n.access_token,
      expiresAt: i
    }, n.access_token;
  }
  isTokenExpired(e) {
    return Date.now() >= e.expiresAt;
  }
  needsRefresh(e) {
    const t = (this.config.refreshBufferSeconds ?? 1200) * 1e3;
    return Date.now() >= e.expiresAt - t;
  }
  invalidateToken() {
    this.cachedToken = null, this.refreshPromise = null;
  }
}, Pp = () => {
  if (typeof File > "u") {
    const { process: e } = globalThis, t = typeof e?.versions?.node == "string" && parseInt(e.versions.node.split(".")) < 20;
    throw new Error("`File` is not defined as a global, which is required for file uploads." + (t ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`." : ""));
  }
};
function oo(e, t, n) {
  return Pp(), new File(e, t ?? "unknown_file", n);
}
function ii(e) {
  return (typeof e == "object" && e !== null && ("name" in e && e.name && String(e.name) || "url" in e && e.url && String(e.url) || "filename" in e && e.filename && String(e.filename) || "path" in e && e.path && String(e.path)) || "").split(/[\\/]/).pop() || void 0;
}
var zr = (e) => e != null && typeof e == "object" && typeof e[Symbol.asyncIterator] == "function", Oi = async (e, t) => lr(e.body) ? {
  ...e,
  body: await xp(e.body, t)
} : e, tt = async (e, t) => ({
  ...e,
  body: await xp(e.body, t)
}), Tc = /* @__PURE__ */ new WeakMap();
function JA(e) {
  const t = typeof e == "function" ? e : e.fetch, n = Tc.get(t);
  if (n) return n;
  const o = (async () => {
    try {
      const i = "Response" in t ? t.Response : (await t("data:,")).constructor, s = new FormData();
      return s.toString() !== await new i(s).text();
    } catch {
      return !0;
    }
  })();
  return Tc.set(t, o), o;
}
var xp = async (e, t) => {
  if (!await JA(t)) throw new TypeError("The provided fetch function does not support file uploads with the current global FormData class.");
  const n = new FormData();
  return await Promise.all(Object.entries(e || {}).map(([o, i]) => ur(n, o, i))), n;
}, Mp = (e) => e instanceof Blob && "name" in e, WA = (e) => typeof e == "object" && e !== null && (e instanceof Response || zr(e) || Mp(e)), lr = (e) => {
  if (WA(e)) return !0;
  if (Array.isArray(e)) return e.some(lr);
  if (e && typeof e == "object") {
    for (const t in e) if (lr(e[t])) return !0;
  }
  return !1;
}, ur = async (e, t, n) => {
  if (n !== void 0) {
    if (n == null) throw new TypeError(`Received null for "${t}"; to pass null in FormData, you must use the string 'null'`);
    if (typeof n == "string" || typeof n == "number" || typeof n == "boolean") e.append(t, String(n));
    else if (n instanceof Response) e.append(t, oo([await n.blob()], ii(n)));
    else if (zr(n)) e.append(t, oo([await new Response(_p(n)).blob()], ii(n)));
    else if (Mp(n)) e.append(t, n, ii(n));
    else if (Array.isArray(n)) await Promise.all(n.map((o) => ur(e, t + "[]", o)));
    else if (typeof n == "object") await Promise.all(Object.entries(n).map(([o, i]) => ur(e, `${t}[${o}]`, i)));
    else throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${n} instead`);
  }
}, Np = (e) => e != null && typeof e == "object" && typeof e.size == "number" && typeof e.type == "string" && typeof e.text == "function" && typeof e.slice == "function" && typeof e.arrayBuffer == "function", KA = (e) => e != null && typeof e == "object" && typeof e.name == "string" && typeof e.lastModified == "number" && Np(e), YA = (e) => e != null && typeof e == "object" && typeof e.url == "string" && typeof e.blob == "function";
async function zA(e, t, n) {
  if (Pp(), e = await e, KA(e))
    return e instanceof File ? e : oo([await e.arrayBuffer()], e.name);
  if (YA(e)) {
    const i = await e.blob();
    return t || (t = new URL(e.url).pathname.split(/[\\/]/).pop()), oo(await cr(i), t, n);
  }
  const o = await cr(e);
  if (t || (t = ii(e)), !n?.type) {
    const i = o.find((s) => typeof s == "object" && "type" in s && s.type);
    typeof i == "string" && (n = {
      ...n,
      type: i
    });
  }
  return oo(o, t, n);
}
async function cr(e) {
  let t = [];
  if (typeof e == "string" || ArrayBuffer.isView(e) || e instanceof ArrayBuffer) t.push(e);
  else if (Np(e)) t.push(e instanceof Blob ? e : await e.arrayBuffer());
  else if (zr(e)) for await (const n of e) t.push(...await cr(n));
  else {
    const n = e?.constructor?.name;
    throw new Error(`Unexpected data type: ${typeof e}${n ? `; constructor: ${n}` : ""}${XA(e)}`);
  }
  return t;
}
function XA(e) {
  return typeof e != "object" || e === null ? "" : `; props: [${Object.getOwnPropertyNames(e).map((t) => `"${t}"`).join(", ")}]`;
}
var F = class {
  constructor(e) {
    this._client = e;
  }
};
function kp(e) {
  return e.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent);
}
var Sc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.create(null)), QA = (e = kp) => function(n, ...o) {
  if (n.length === 1) return n[0];
  let i = !1;
  const s = [], a = n.reduce((p, f, h) => {
    /[?#]/.test(f) && (i = !0);
    const m = o[h];
    let g = (i ? encodeURIComponent : e)("" + m);
    return h !== o.length && (m == null || typeof m == "object" && m.toString === Object.getPrototypeOf(Object.getPrototypeOf(m.hasOwnProperty ?? Sc) ?? Sc)?.toString) && (g = m + "", s.push({
      start: p.length + f.length,
      length: g.length,
      error: `Value of type ${Object.prototype.toString.call(m).slice(8, -1)} is not a valid path parameter`
    })), p + f + (h === o.length ? "" : g);
  }, ""), u = a.split(/[?#]/, 1)[0], c = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi;
  let d;
  for (; (d = c.exec(u)) !== null; ) s.push({
    start: d.index,
    length: d[0].length,
    error: `Value "${d[0]}" can't be safely passed as a path parameter`
  });
  if (s.sort((p, f) => p.start - f.start), s.length > 0) {
    let p = 0;
    const f = s.reduce((h, m) => {
      const g = " ".repeat(m.start - p), y = "^".repeat(m.length);
      return p = m.start + m.length, h + g + y;
    }, "");
    throw new B(`Path parameters result in path with invalid segments:
${s.map((h) => h.error).join(`
`)}
${a}
${f}`);
  }
  return a;
}, b = /* @__PURE__ */ QA(kp), Dp = class extends F {
  list(e, t = {}, n) {
    return this._client.getAPIList(b`/chat/completions/${e}/messages`, te, {
      query: t,
      ...n
    });
  }
};
function Ei(e) {
  return e !== void 0 && "function" in e && e.function !== void 0;
}
function Xr(e) {
  return e?.$brand === "auto-parseable-response-format";
}
function wo(e) {
  return e?.$brand === "auto-parseable-tool";
}
function ZA(e, t) {
  return !t || !Up(t) ? {
    ...e,
    choices: e.choices.map((n) => (Lp(n.message.tool_calls), {
      ...n,
      message: {
        ...n.message,
        parsed: null,
        ...n.message.tool_calls ? { tool_calls: n.message.tool_calls } : void 0
      }
    }))
  } : Qr(e, t);
}
function Qr(e, t) {
  const n = e.choices.map((o) => {
    if (o.finish_reason === "length") throw new fp();
    if (o.finish_reason === "content_filter") throw new pp();
    return Lp(o.message.tool_calls), {
      ...o,
      message: {
        ...o.message,
        ...o.message.tool_calls ? { tool_calls: o.message.tool_calls?.map((i) => eC(t, i)) ?? void 0 } : void 0,
        parsed: o.message.content && !o.message.refusal ? jA(t, o.message.content) : null
      }
    };
  });
  return {
    ...e,
    choices: n
  };
}
function jA(e, t) {
  return e.response_format?.type !== "json_schema" ? null : e.response_format?.type === "json_schema" ? "$parseRaw" in e.response_format ? e.response_format.$parseRaw(t) : JSON.parse(t) : null;
}
function eC(e, t) {
  const n = e.tools?.find((o) => Ei(o) && o.function?.name === t.function.name);
  return {
    ...t,
    function: {
      ...t.function,
      parsed_arguments: wo(n) ? n.$parseRaw(t.function.arguments) : n?.function.strict ? JSON.parse(t.function.arguments) : null
    }
  };
}
function tC(e, t) {
  if (!e || !("tools" in e) || !e.tools) return !1;
  const n = e.tools?.find((o) => Ei(o) && o.function?.name === t.function.name);
  return Ei(n) && (wo(n) || n?.function.strict || !1);
}
function Up(e) {
  return Xr(e.response_format) ? !0 : e.tools?.some((t) => wo(t) || t.type === "function" && t.function.strict === !0) ?? !1;
}
function Lp(e) {
  for (const t of e || []) if (t.type !== "function") throw new B(`Currently only \`function\` tool calls are supported; Received \`${t.type}\``);
}
function nC(e) {
  for (const t of e ?? []) {
    if (t.type !== "function") throw new B(`Currently only \`function\` tool types support auto-parsing; Received \`${t.type}\``);
    if (t.function.strict !== !0) throw new B(`The \`${t.function.name}\` tool is not marked with \`strict: true\`. Only strict function tools can be auto-parsed`);
  }
}
var wi = (e) => e?.role === "assistant", $p = (e) => e?.role === "tool", dr, si, ri, Kn, Yn, ai, zn, at, Xn, Ai, Ci, Qt, Fp, Zr = class {
  constructor() {
    dr.add(this), this.controller = new AbortController(), si.set(this, void 0), ri.set(this, () => {
    }), Kn.set(this, () => {
    }), Yn.set(this, void 0), ai.set(this, () => {
    }), zn.set(this, () => {
    }), at.set(this, {}), Xn.set(this, !1), Ai.set(this, !1), Ci.set(this, !1), Qt.set(this, !1), O(this, si, new Promise((e, t) => {
      O(this, ri, e, "f"), O(this, Kn, t, "f");
    }), "f"), O(this, Yn, new Promise((e, t) => {
      O(this, ai, e, "f"), O(this, zn, t, "f");
    }), "f"), E(this, si, "f").catch(() => {
    }), E(this, Yn, "f").catch(() => {
    });
  }
  _run(e) {
    setTimeout(() => {
      e().then(() => {
        this._emitFinal(), this._emit("end");
      }, E(this, dr, "m", Fp).bind(this));
    }, 0);
  }
  _connected() {
    this.ended || (E(this, ri, "f").call(this), this._emit("connect"));
  }
  get ended() {
    return E(this, Xn, "f");
  }
  get errored() {
    return E(this, Ai, "f");
  }
  get aborted() {
    return E(this, Ci, "f");
  }
  abort() {
    this.controller.abort();
  }
  on(e, t) {
    return (E(this, at, "f")[e] || (E(this, at, "f")[e] = [])).push({ listener: t }), this;
  }
  off(e, t) {
    const n = E(this, at, "f")[e];
    if (!n) return this;
    const o = n.findIndex((i) => i.listener === t);
    return o >= 0 && n.splice(o, 1), this;
  }
  once(e, t) {
    return (E(this, at, "f")[e] || (E(this, at, "f")[e] = [])).push({
      listener: t,
      once: !0
    }), this;
  }
  emitted(e) {
    return new Promise((t, n) => {
      O(this, Qt, !0, "f"), e !== "error" && this.once("error", n), this.once(e, t);
    });
  }
  async done() {
    O(this, Qt, !0, "f"), await E(this, Yn, "f");
  }
  _emit(e, ...t) {
    if (E(this, Xn, "f")) return;
    e === "end" && (O(this, Xn, !0, "f"), E(this, ai, "f").call(this));
    const n = E(this, at, "f")[e];
    if (n && (E(this, at, "f")[e] = n.filter((o) => !o.once), n.forEach(({ listener: o }) => o(...t))), e === "abort") {
      const o = t[0];
      !E(this, Qt, "f") && !n?.length && Promise.reject(o), E(this, Kn, "f").call(this, o), E(this, zn, "f").call(this, o), this._emit("end");
      return;
    }
    if (e === "error") {
      const o = t[0];
      !E(this, Qt, "f") && !n?.length && Promise.reject(o), E(this, Kn, "f").call(this, o), E(this, zn, "f").call(this, o), this._emit("end");
    }
  }
  _emitFinal() {
  }
};
si = /* @__PURE__ */ new WeakMap(), ri = /* @__PURE__ */ new WeakMap(), Kn = /* @__PURE__ */ new WeakMap(), Yn = /* @__PURE__ */ new WeakMap(), ai = /* @__PURE__ */ new WeakMap(), zn = /* @__PURE__ */ new WeakMap(), at = /* @__PURE__ */ new WeakMap(), Xn = /* @__PURE__ */ new WeakMap(), Ai = /* @__PURE__ */ new WeakMap(), Ci = /* @__PURE__ */ new WeakMap(), Qt = /* @__PURE__ */ new WeakMap(), dr = /* @__PURE__ */ new WeakSet(), Fp = function(t) {
  if (O(this, Ai, !0, "f"), t instanceof Error && t.name === "AbortError" && (t = new Ge()), t instanceof Ge)
    return O(this, Ci, !0, "f"), this._emit("abort", t);
  if (t instanceof B) return this._emit("error", t);
  if (t instanceof Error) {
    const n = new B(t.message);
    return n.cause = t, this._emit("error", n);
  }
  return this._emit("error", new B(String(t)));
};
function oC(e) {
  return typeof e.parse == "function";
}
var _e, fr, Ii, pr, hr, mr, Bp, Gp, iC = 10, Op = class extends Zr {
  constructor() {
    super(...arguments), _e.add(this), this._chatCompletions = [], this.messages = [];
  }
  _addChatCompletion(e) {
    this._chatCompletions.push(e), this._emit("chatCompletion", e);
    const t = e.choices[0]?.message;
    return t && this._addMessage(t), e;
  }
  _addMessage(e, t = !0) {
    if ("content" in e || (e.content = null), this.messages.push(e), t) {
      if (this._emit("message", e), $p(e) && e.content) this._emit("functionToolCallResult", e.content);
      else if (wi(e) && e.tool_calls)
        for (const n of e.tool_calls) n.type === "function" && this._emit("functionToolCall", n.function);
    }
  }
  async finalChatCompletion() {
    await this.done();
    const e = this._chatCompletions[this._chatCompletions.length - 1];
    if (!e) throw new B("stream ended without producing a ChatCompletion");
    return e;
  }
  async finalContent() {
    return await this.done(), E(this, _e, "m", fr).call(this);
  }
  async finalMessage() {
    return await this.done(), E(this, _e, "m", Ii).call(this);
  }
  async finalFunctionToolCall() {
    return await this.done(), E(this, _e, "m", pr).call(this);
  }
  async finalFunctionToolCallResult() {
    return await this.done(), E(this, _e, "m", hr).call(this);
  }
  async totalUsage() {
    return await this.done(), E(this, _e, "m", mr).call(this);
  }
  allChatCompletions() {
    return [...this._chatCompletions];
  }
  _emitFinal() {
    const e = this._chatCompletions[this._chatCompletions.length - 1];
    e && this._emit("finalChatCompletion", e);
    const t = E(this, _e, "m", Ii).call(this);
    t && this._emit("finalMessage", t);
    const n = E(this, _e, "m", fr).call(this);
    n && this._emit("finalContent", n);
    const o = E(this, _e, "m", pr).call(this);
    o && this._emit("finalFunctionToolCall", o);
    const i = E(this, _e, "m", hr).call(this);
    i != null && this._emit("finalFunctionToolCallResult", i), this._chatCompletions.some((s) => s.usage) && this._emit("totalUsage", E(this, _e, "m", mr).call(this));
  }
  async _createChatCompletion(e, t, n) {
    const o = n?.signal;
    o && (o.aborted && this.controller.abort(), o.addEventListener("abort", () => this.controller.abort())), E(this, _e, "m", Bp).call(this, t);
    const i = await e.chat.completions.create({
      ...t,
      stream: !1
    }, {
      ...n,
      signal: this.controller.signal
    });
    return this._connected(), this._addChatCompletion(Qr(i, t));
  }
  async _runChatCompletion(e, t, n) {
    for (const o of t.messages) this._addMessage(o, !1);
    return await this._createChatCompletion(e, t, n);
  }
  async _runTools(e, t, n) {
    const o = "tool", { tool_choice: i = "auto", stream: s, ...a } = t, u = typeof i != "string" && i.type === "function" && i?.function?.name, { maxChatCompletions: c = iC } = n || {}, d = t.tools.map((h) => {
      if (wo(h)) {
        if (!h.$callback) throw new B("Tool given to `.runTools()` that does not have an associated function");
        return {
          type: "function",
          function: {
            function: h.$callback,
            name: h.function.name,
            description: h.function.description || "",
            parameters: h.function.parameters,
            parse: h.$parseRaw,
            strict: !0
          }
        };
      }
      return h;
    }), p = {};
    for (const h of d) h.type === "function" && (p[h.function.name || h.function.function.name] = h.function);
    const f = "tools" in t ? d.map((h) => h.type === "function" ? {
      type: "function",
      function: {
        name: h.function.name || h.function.function.name,
        parameters: h.function.parameters,
        description: h.function.description,
        strict: h.function.strict
      }
    } : h) : void 0;
    for (const h of t.messages) this._addMessage(h, !1);
    for (let h = 0; h < c; ++h) {
      const m = (await this._createChatCompletion(e, {
        ...a,
        tool_choice: i,
        tools: f,
        messages: [...this.messages]
      }, n)).choices[0]?.message;
      if (!m) throw new B("missing message in ChatCompletion response");
      if (!m.tool_calls?.length) return;
      for (const g of m.tool_calls) {
        if (g.type !== "function") continue;
        const y = g.id, { name: v, arguments: A } = g.function, C = p[v];
        if (C) {
          if (u && u !== v) {
            const w = `Invalid tool_call: ${JSON.stringify(v)}. ${JSON.stringify(u)} requested. Please try again`;
            this._addMessage({
              role: o,
              tool_call_id: y,
              content: w
            });
            continue;
          }
        } else {
          const w = `Invalid tool_call: ${JSON.stringify(v)}. Available options are: ${Object.keys(p).map((L) => JSON.stringify(L)).join(", ")}. Please try again`;
          this._addMessage({
            role: o,
            tool_call_id: y,
            content: w
          });
          continue;
        }
        let R;
        try {
          R = oC(C) ? await C.parse(A) : A;
        } catch (w) {
          const L = w instanceof Error ? w.message : String(w);
          this._addMessage({
            role: o,
            tool_call_id: y,
            content: L
          });
          continue;
        }
        const M = await C.function(R, this), x = E(this, _e, "m", Gp).call(this, M);
        if (this._addMessage({
          role: o,
          tool_call_id: y,
          content: x
        }), u) return;
      }
    }
  }
};
_e = /* @__PURE__ */ new WeakSet(), fr = function() {
  return E(this, _e, "m", Ii).call(this).content ?? null;
}, Ii = function() {
  let t = this.messages.length;
  for (; t-- > 0; ) {
    const n = this.messages[t];
    if (wi(n)) return {
      ...n,
      content: n.content ?? null,
      refusal: n.refusal ?? null
    };
  }
  throw new B("stream ended without producing a ChatCompletionMessage with role=assistant");
}, pr = function() {
  for (let t = this.messages.length - 1; t >= 0; t--) {
    const n = this.messages[t];
    if (wi(n) && n?.tool_calls?.length) return n.tool_calls.filter((o) => o.type === "function").at(-1)?.function;
  }
}, hr = function() {
  for (let t = this.messages.length - 1; t >= 0; t--) {
    const n = this.messages[t];
    if ($p(n) && n.content != null && typeof n.content == "string" && this.messages.some((o) => o.role === "assistant" && o.tool_calls?.some((i) => i.type === "function" && i.id === n.tool_call_id))) return n.content;
  }
}, mr = function() {
  const t = {
    completion_tokens: 0,
    prompt_tokens: 0,
    total_tokens: 0
  };
  for (const { usage: n } of this._chatCompletions) n && (t.completion_tokens += n.completion_tokens, t.prompt_tokens += n.prompt_tokens, t.total_tokens += n.total_tokens);
  return t;
}, Bp = function(t) {
  if (t.n != null && t.n > 1) throw new B("ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.");
}, Gp = function(t) {
  return typeof t == "string" ? t : t === void 0 ? "undefined" : JSON.stringify(t);
};
var sC = class qp extends Op {
  static runTools(t, n, o) {
    const i = new qp(), s = {
      ...o,
      headers: {
        ...o?.headers,
        "X-Stainless-Helper-Method": "runTools"
      }
    };
    return i._run(() => i._runTools(t, n, s)), i;
  }
  _addMessage(t, n = !0) {
    super._addMessage(t, n), wi(t) && t.content && this._emit("content", t.content);
  }
}, rC = 1, Vp = 2, Hp = 4, Jp = 8, aC = 16, lC = 32, uC = 64, Wp = 128, Kp = 256, cC = Wp | Kp, dC = 496, Ec = Vp | 497, wc = Hp | Jp, ue = {
  STR: rC,
  NUM: Vp,
  ARR: Hp,
  OBJ: Jp,
  NULL: aC,
  BOOL: lC,
  NAN: uC,
  INFINITY: Wp,
  MINUS_INFINITY: Kp,
  INF: cC,
  SPECIAL: dC,
  ATOM: Ec,
  COLLECTION: wc,
  ALL: Ec | wc
}, fC = class extends Error {
}, pC = class extends Error {
};
function hC(e, t = ue.ALL) {
  if (typeof e != "string") throw new TypeError(`expecting str, got ${typeof e}`);
  if (!e.trim()) throw new Error(`${e} is empty`);
  return mC(e.trim(), t);
}
var mC = (e, t) => {
  const n = e.length;
  let o = 0;
  const i = (h) => {
    throw new fC(`${h} at position ${o}`);
  }, s = (h) => {
    throw new pC(`${h} at position ${o}`);
  }, a = () => (f(), o >= n && i("Unexpected end of input"), e[o] === '"' ? u() : e[o] === "{" ? c() : e[o] === "[" ? d() : e.substring(o, o + 4) === "null" || ue.NULL & t && n - o < 4 && "null".startsWith(e.substring(o)) ? (o += 4, null) : e.substring(o, o + 4) === "true" || ue.BOOL & t && n - o < 4 && "true".startsWith(e.substring(o)) ? (o += 4, !0) : e.substring(o, o + 5) === "false" || ue.BOOL & t && n - o < 5 && "false".startsWith(e.substring(o)) ? (o += 5, !1) : e.substring(o, o + 8) === "Infinity" || ue.INFINITY & t && n - o < 8 && "Infinity".startsWith(e.substring(o)) ? (o += 8, 1 / 0) : e.substring(o, o + 9) === "-Infinity" || ue.MINUS_INFINITY & t && 1 < n - o && n - o < 9 && "-Infinity".startsWith(e.substring(o)) ? (o += 9, -1 / 0) : e.substring(o, o + 3) === "NaN" || ue.NAN & t && n - o < 3 && "NaN".startsWith(e.substring(o)) ? (o += 3, NaN) : p()), u = () => {
    const h = o;
    let m = !1;
    for (o++; o < n && (e[o] !== '"' || m && e[o - 1] === "\\"); )
      m = e[o] === "\\" ? !m : !1, o++;
    if (e.charAt(o) == '"') try {
      return JSON.parse(e.substring(h, ++o - Number(m)));
    } catch (g) {
      s(String(g));
    }
    else if (ue.STR & t) try {
      return JSON.parse(e.substring(h, o - Number(m)) + '"');
    } catch {
      return JSON.parse(e.substring(h, e.lastIndexOf("\\")) + '"');
    }
    i("Unterminated string literal");
  }, c = () => {
    o++, f();
    const h = {};
    try {
      for (; e[o] !== "}"; ) {
        if (f(), o >= n && ue.OBJ & t) return h;
        const m = u();
        f(), o++;
        try {
          const g = a();
          Object.defineProperty(h, m, {
            value: g,
            writable: !0,
            enumerable: !0,
            configurable: !0
          });
        } catch (g) {
          if (ue.OBJ & t) return h;
          throw g;
        }
        f(), e[o] === "," && o++;
      }
    } catch {
      if (ue.OBJ & t) return h;
      i("Expected '}' at end of object");
    }
    return o++, h;
  }, d = () => {
    o++;
    const h = [];
    try {
      for (; e[o] !== "]"; )
        h.push(a()), f(), e[o] === "," && o++;
    } catch {
      if (ue.ARR & t) return h;
      i("Expected ']' at end of array");
    }
    return o++, h;
  }, p = () => {
    if (o === 0) {
      e === "-" && ue.NUM & t && i("Not sure what '-' is");
      try {
        return JSON.parse(e);
      } catch (m) {
        if (ue.NUM & t) try {
          return e[e.length - 1] === "." ? JSON.parse(e.substring(0, e.lastIndexOf("."))) : JSON.parse(e.substring(0, e.lastIndexOf("e")));
        } catch {
        }
        s(String(m));
      }
    }
    const h = o;
    for (e[o] === "-" && o++; e[o] && !",]}".includes(e[o]); ) o++;
    o == n && !(ue.NUM & t) && i("Unterminated number literal");
    try {
      return JSON.parse(e.substring(h, o));
    } catch {
      e.substring(h, o) === "-" && ue.NUM & t && i("Not sure what '-' is");
      try {
        return JSON.parse(e.substring(h, e.lastIndexOf("e")));
      } catch (g) {
        s(String(g));
      }
    }
  }, f = () => {
    for (; o < n && ` 
\r	`.includes(e[o]); ) o++;
  };
  return a();
}, Ac = (e) => hC(e, ue.ALL ^ ue.NUM), oe, rt, Ht, yt, Ss, Wo, Es, ws, As, Ko, Cs, Cc, Yp = class gr extends Op {
  constructor(t) {
    super(), oe.add(this), rt.set(this, void 0), Ht.set(this, void 0), yt.set(this, void 0), O(this, rt, t, "f"), O(this, Ht, [], "f");
  }
  get currentChatCompletionSnapshot() {
    return E(this, yt, "f");
  }
  static fromReadableStream(t) {
    const n = new gr(null);
    return n._run(() => n._fromReadableStream(t)), n;
  }
  static createChatCompletion(t, n, o) {
    const i = new gr(n);
    return i._run(() => i._runChatCompletion(t, {
      ...n,
      stream: !0
    }, {
      ...o,
      headers: {
        ...o?.headers,
        "X-Stainless-Helper-Method": "stream"
      }
    })), i;
  }
  async _createChatCompletion(t, n, o) {
    super._createChatCompletion;
    const i = o?.signal;
    i && (i.aborted && this.controller.abort(), i.addEventListener("abort", () => this.controller.abort())), E(this, oe, "m", Ss).call(this);
    const s = await t.chat.completions.create({
      ...n,
      stream: !0
    }, {
      ...o,
      signal: this.controller.signal
    });
    this._connected();
    for await (const a of s) E(this, oe, "m", Es).call(this, a);
    if (s.controller.signal?.aborted) throw new Ge();
    return this._addChatCompletion(E(this, oe, "m", Ko).call(this));
  }
  async _fromReadableStream(t, n) {
    const o = n?.signal;
    o && (o.aborted && this.controller.abort(), o.addEventListener("abort", () => this.controller.abort())), E(this, oe, "m", Ss).call(this), this._connected();
    const i = fo.fromReadableStream(t, this.controller);
    let s;
    for await (const a of i)
      s && s !== a.id && this._addChatCompletion(E(this, oe, "m", Ko).call(this)), E(this, oe, "m", Es).call(this, a), s = a.id;
    if (i.controller.signal?.aborted) throw new Ge();
    return this._addChatCompletion(E(this, oe, "m", Ko).call(this));
  }
  [(rt = /* @__PURE__ */ new WeakMap(), Ht = /* @__PURE__ */ new WeakMap(), yt = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakSet(), Ss = function() {
    this.ended || O(this, yt, void 0, "f");
  }, Wo = function(n) {
    let o = E(this, Ht, "f")[n.index];
    return o || (o = {
      content_done: !1,
      refusal_done: !1,
      logprobs_content_done: !1,
      logprobs_refusal_done: !1,
      done_tool_calls: /* @__PURE__ */ new Set(),
      current_tool_call_index: null
    }, E(this, Ht, "f")[n.index] = o, o);
  }, Es = function(n) {
    if (this.ended) return;
    const o = E(this, oe, "m", Cc).call(this, n);
    this._emit("chunk", n, o);
    for (const i of n.choices) {
      const s = o.choices[i.index];
      i.delta.content != null && s.message?.role === "assistant" && s.message?.content && (this._emit("content", i.delta.content, s.message.content), this._emit("content.delta", {
        delta: i.delta.content,
        snapshot: s.message.content,
        parsed: s.message.parsed
      })), i.delta.refusal != null && s.message?.role === "assistant" && s.message?.refusal && this._emit("refusal.delta", {
        delta: i.delta.refusal,
        snapshot: s.message.refusal
      }), i.logprobs?.content != null && s.message?.role === "assistant" && this._emit("logprobs.content.delta", {
        content: i.logprobs?.content,
        snapshot: s.logprobs?.content ?? []
      }), i.logprobs?.refusal != null && s.message?.role === "assistant" && this._emit("logprobs.refusal.delta", {
        refusal: i.logprobs?.refusal,
        snapshot: s.logprobs?.refusal ?? []
      });
      const a = E(this, oe, "m", Wo).call(this, s);
      s.finish_reason && (E(this, oe, "m", As).call(this, s), a.current_tool_call_index != null && E(this, oe, "m", ws).call(this, s, a.current_tool_call_index));
      for (const u of i.delta.tool_calls ?? [])
        a.current_tool_call_index !== u.index && (E(this, oe, "m", As).call(this, s), a.current_tool_call_index != null && E(this, oe, "m", ws).call(this, s, a.current_tool_call_index)), a.current_tool_call_index = u.index;
      for (const u of i.delta.tool_calls ?? []) {
        const c = s.message.tool_calls?.[u.index];
        c?.type && (c?.type === "function" ? this._emit("tool_calls.function.arguments.delta", {
          name: c.function?.name,
          index: u.index,
          arguments: c.function.arguments,
          parsed_arguments: c.function.parsed_arguments,
          arguments_delta: u.function?.arguments ?? ""
        }) : (c?.type, void 0));
      }
    }
  }, ws = function(n, o) {
    if (E(this, oe, "m", Wo).call(this, n).done_tool_calls.has(o)) return;
    const i = n.message.tool_calls?.[o];
    if (!i) throw new Error("no tool call snapshot");
    if (!i.type) throw new Error("tool call snapshot missing `type`");
    if (i.type === "function") {
      const s = E(this, rt, "f")?.tools?.find((a) => Ei(a) && a.function.name === i.function.name);
      this._emit("tool_calls.function.arguments.done", {
        name: i.function.name,
        index: o,
        arguments: i.function.arguments,
        parsed_arguments: wo(s) ? s.$parseRaw(i.function.arguments) : s?.function.strict ? JSON.parse(i.function.arguments) : null
      });
    } else i.type;
  }, As = function(n) {
    const o = E(this, oe, "m", Wo).call(this, n);
    if (n.message.content && !o.content_done) {
      o.content_done = !0;
      const i = E(this, oe, "m", Cs).call(this);
      this._emit("content.done", {
        content: n.message.content,
        parsed: i ? i.$parseRaw(n.message.content) : null
      });
    }
    n.message.refusal && !o.refusal_done && (o.refusal_done = !0, this._emit("refusal.done", { refusal: n.message.refusal })), n.logprobs?.content && !o.logprobs_content_done && (o.logprobs_content_done = !0, this._emit("logprobs.content.done", { content: n.logprobs.content })), n.logprobs?.refusal && !o.logprobs_refusal_done && (o.logprobs_refusal_done = !0, this._emit("logprobs.refusal.done", { refusal: n.logprobs.refusal }));
  }, Ko = function() {
    if (this.ended) throw new B("stream has ended, this shouldn't happen");
    const n = E(this, yt, "f");
    if (!n) throw new B("request ended without sending any chunks");
    return O(this, yt, void 0, "f"), O(this, Ht, [], "f"), gC(n, E(this, rt, "f"));
  }, Cs = function() {
    const n = E(this, rt, "f")?.response_format;
    return Xr(n) ? n : null;
  }, Cc = function(n) {
    var o, i, s, a;
    let u = E(this, yt, "f");
    const { choices: c, ...d } = n;
    u ? Object.assign(u, d) : u = O(this, yt, {
      ...d,
      choices: []
    }, "f");
    for (const { delta: p, finish_reason: f, index: h, logprobs: m = null, ...g } of n.choices) {
      let y = u.choices[h];
      if (y || (y = u.choices[h] = {
        finish_reason: f,
        index: h,
        message: {},
        logprobs: m,
        ...g
      }), m) if (!y.logprobs) y.logprobs = Object.assign({}, m);
      else {
        const { content: w, refusal: L, ...P } = m;
        Object.assign(y.logprobs, P), w && ((o = y.logprobs).content ?? (o.content = []), y.logprobs.content.push(...w)), L && ((i = y.logprobs).refusal ?? (i.refusal = []), y.logprobs.refusal.push(...L));
      }
      if (f && (y.finish_reason = f, E(this, rt, "f") && Up(E(this, rt, "f")))) {
        if (f === "length") throw new fp();
        if (f === "content_filter") throw new pp();
      }
      if (Object.assign(y, g), !p) continue;
      const { content: v, refusal: A, function_call: C, role: R, tool_calls: M, ...x } = p;
      if (Object.assign(y.message, x), A && (y.message.refusal = (y.message.refusal || "") + A), R && (y.message.role = R), C && (y.message.function_call ? (C.name && (y.message.function_call.name = C.name), C.arguments && ((s = y.message.function_call).arguments ?? (s.arguments = ""), y.message.function_call.arguments += C.arguments)) : y.message.function_call = C), v && (y.message.content = (y.message.content || "") + v, !y.message.refusal && E(this, oe, "m", Cs).call(this) && (y.message.parsed = Ac(y.message.content))), M) {
        y.message.tool_calls || (y.message.tool_calls = []);
        for (const { index: w, id: L, type: P, function: N, ...V } of M) {
          const Y = (a = y.message.tool_calls)[w] ?? (a[w] = {});
          Object.assign(Y, V), L && (Y.id = L), P && (Y.type = P), N && (Y.function ?? (Y.function = {
            name: N.name ?? "",
            arguments: ""
          })), N?.name && (Y.function.name = N.name), N?.arguments && (Y.function.arguments += N.arguments, tC(E(this, rt, "f"), Y) && (Y.function.parsed_arguments = Ac(Y.function.arguments)));
        }
      }
    }
    return u;
  }, Symbol.asyncIterator)]() {
    const t = [], n = [];
    let o = !1;
    return this.on("chunk", (i) => {
      const s = n.shift();
      s ? s.resolve(i) : t.push(i);
    }), this.on("end", () => {
      o = !0;
      for (const i of n) i.resolve(void 0);
      n.length = 0;
    }), this.on("abort", (i) => {
      o = !0;
      for (const s of n) s.reject(i);
      n.length = 0;
    }), this.on("error", (i) => {
      o = !0;
      for (const s of n) s.reject(i);
      n.length = 0;
    }), {
      next: async () => t.length ? {
        value: t.shift(),
        done: !1
      } : o ? {
        value: void 0,
        done: !0
      } : new Promise((i, s) => n.push({
        resolve: i,
        reject: s
      })).then((i) => i ? {
        value: i,
        done: !1
      } : {
        value: void 0,
        done: !0
      }),
      return: async () => (this.abort(), {
        value: void 0,
        done: !0
      })
    };
  }
  toReadableStream() {
    return new fo(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
  }
};
function gC(e, t) {
  const { id: n, choices: o, created: i, model: s, system_fingerprint: a, ...u } = e;
  return ZA({
    ...u,
    id: n,
    choices: o.map(({ message: c, finish_reason: d, index: p, logprobs: f, ...h }) => {
      if (!d) throw new B(`missing finish_reason for choice ${p}`);
      const { content: m = null, function_call: g, tool_calls: y, ...v } = c, A = c.role;
      if (!A) throw new B(`missing role for choice ${p}`);
      if (g) {
        const { arguments: C, name: R } = g;
        if (C == null) throw new B(`missing function_call.arguments for choice ${p}`);
        if (!R) throw new B(`missing function_call.name for choice ${p}`);
        return {
          ...h,
          message: {
            content: m,
            function_call: {
              arguments: C,
              name: R
            },
            role: A,
            refusal: c.refusal ?? null
          },
          finish_reason: d,
          index: p,
          logprobs: f
        };
      }
      return y ? {
        ...h,
        index: p,
        finish_reason: d,
        logprobs: f,
        message: {
          ...v,
          role: A,
          content: m,
          refusal: c.refusal ?? null,
          tool_calls: y.map((C, R) => {
            const { function: M, type: x, id: w, ...L } = C, { arguments: P, name: N, ...V } = M || {};
            if (w == null) throw new B(`missing choices[${p}].tool_calls[${R}].id
${Yo(e)}`);
            if (x == null) throw new B(`missing choices[${p}].tool_calls[${R}].type
${Yo(e)}`);
            if (N == null) throw new B(`missing choices[${p}].tool_calls[${R}].function.name
${Yo(e)}`);
            if (P == null) throw new B(`missing choices[${p}].tool_calls[${R}].function.arguments
${Yo(e)}`);
            return {
              ...L,
              id: w,
              type: x,
              function: {
                ...V,
                name: N,
                arguments: P
              }
            };
          })
        }
      } : {
        ...h,
        message: {
          ...v,
          content: m,
          role: A,
          refusal: c.refusal ?? null
        },
        finish_reason: d,
        index: p,
        logprobs: f
      };
    }),
    created: i,
    model: s,
    object: "chat.completion",
    ...a ? { system_fingerprint: a } : {}
  }, t);
}
function Yo(e) {
  return JSON.stringify(e);
}
var yC = class yr extends Yp {
  static fromReadableStream(t) {
    const n = new yr(null);
    return n._run(() => n._fromReadableStream(t)), n;
  }
  static runTools(t, n, o) {
    const i = new yr(n), s = {
      ...o,
      headers: {
        ...o?.headers,
        "X-Stainless-Helper-Method": "runTools"
      }
    };
    return i._run(() => i._runTools(t, n, s)), i;
  }
}, jr = class extends F {
  constructor() {
    super(...arguments), this.messages = new Dp(this._client);
  }
  create(e, t) {
    return this._client.post("/chat/completions", {
      body: e,
      ...t,
      stream: e.stream ?? !1
    });
  }
  retrieve(e, t) {
    return this._client.get(b`/chat/completions/${e}`, t);
  }
  update(e, t, n) {
    return this._client.post(b`/chat/completions/${e}`, {
      body: t,
      ...n
    });
  }
  list(e = {}, t) {
    return this._client.getAPIList("/chat/completions", te, {
      query: e,
      ...t
    });
  }
  delete(e, t) {
    return this._client.delete(b`/chat/completions/${e}`, t);
  }
  parse(e, t) {
    return nC(e.tools), this._client.chat.completions.create(e, {
      ...t,
      headers: {
        ...t?.headers,
        "X-Stainless-Helper-Method": "chat.completions.parse"
      }
    })._thenUnwrap((n) => Qr(n, e));
  }
  runTools(e, t) {
    return e.stream ? yC.runTools(this._client, e, t) : sC.runTools(this._client, e, t);
  }
  stream(e, t) {
    return Yp.createChatCompletion(this._client, e, t);
  }
};
jr.Messages = Dp;
var ea = class extends F {
  constructor() {
    super(...arguments), this.completions = new jr(this._client);
  }
};
ea.Completions = jr;
var zp = /* @__PURE__ */ Symbol("brand.privateNullableHeaders");
function* _C(e) {
  if (!e) return;
  if (zp in e) {
    const { values: o, nulls: i } = e;
    yield* o.entries();
    for (const s of i) yield [s, null];
    return;
  }
  let t = !1, n;
  e instanceof Headers ? n = e.entries() : rc(e) ? n = e : (t = !0, n = Object.entries(e ?? {}));
  for (let o of n) {
    const i = o[0];
    if (typeof i != "string") throw new TypeError("expected header name to be a string");
    const s = rc(o[1]) ? o[1] : [o[1]];
    let a = !1;
    for (const u of s)
      u !== void 0 && (t && !a && (a = !0, yield [i, null]), yield [i, u]);
  }
}
var $ = (e) => {
  const t = new Headers(), n = /* @__PURE__ */ new Set();
  for (const o of e) {
    const i = /* @__PURE__ */ new Set();
    for (const [s, a] of _C(o)) {
      const u = s.toLowerCase();
      i.has(u) || (t.delete(s), i.add(u)), a === null ? (t.delete(s), n.add(u)) : (t.append(s, a), n.delete(u));
    }
  }
  return {
    [zp]: !0,
    values: t,
    nulls: n
  };
}, Xp = class extends F {
  create(e, t) {
    return this._client.post("/audio/speech", {
      body: e,
      ...t,
      headers: $([{ Accept: "application/octet-stream" }, t?.headers]),
      __binaryResponse: !0
    });
  }
}, Qp = class extends F {
  create(e, t) {
    return this._client.post("/audio/transcriptions", tt({
      body: e,
      ...t,
      stream: e.stream ?? !1,
      __metadata: { model: e.model }
    }, this._client));
  }
}, Zp = class extends F {
  create(e, t) {
    return this._client.post("/audio/translations", tt({
      body: e,
      ...t,
      __metadata: { model: e.model }
    }, this._client));
  }
}, Ao = class extends F {
  constructor() {
    super(...arguments), this.transcriptions = new Qp(this._client), this.translations = new Zp(this._client), this.speech = new Xp(this._client);
  }
};
Ao.Transcriptions = Qp;
Ao.Translations = Zp;
Ao.Speech = Xp;
var jp = class extends F {
  create(e, t) {
    return this._client.post("/batches", {
      body: e,
      ...t
    });
  }
  retrieve(e, t) {
    return this._client.get(b`/batches/${e}`, t);
  }
  list(e = {}, t) {
    return this._client.getAPIList("/batches", te, {
      query: e,
      ...t
    });
  }
  cancel(e, t) {
    return this._client.post(b`/batches/${e}/cancel`, t);
  }
}, eh = class extends F {
  create(e, t) {
    return this._client.post("/assistants", {
      body: e,
      ...t,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  retrieve(e, t) {
    return this._client.get(b`/assistants/${e}`, {
      ...t,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  update(e, t, n) {
    return this._client.post(b`/assistants/${e}`, {
      body: t,
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  list(e = {}, t) {
    return this._client.getAPIList("/assistants", te, {
      query: e,
      ...t,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  delete(e, t) {
    return this._client.delete(b`/assistants/${e}`, {
      ...t,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
}, th = class extends F {
  create(e, t) {
    return this._client.post("/realtime/sessions", {
      body: e,
      ...t,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
}, nh = class extends F {
  create(e, t) {
    return this._client.post("/realtime/transcription_sessions", {
      body: e,
      ...t,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
}, qi = class extends F {
  constructor() {
    super(...arguments), this.sessions = new th(this._client), this.transcriptionSessions = new nh(this._client);
  }
};
qi.Sessions = th;
qi.TranscriptionSessions = nh;
var oh = class extends F {
  create(e, t) {
    return this._client.post("/chatkit/sessions", {
      body: e,
      ...t,
      headers: $([{ "OpenAI-Beta": "chatkit_beta=v1" }, t?.headers])
    });
  }
  cancel(e, t) {
    return this._client.post(b`/chatkit/sessions/${e}/cancel`, {
      ...t,
      headers: $([{ "OpenAI-Beta": "chatkit_beta=v1" }, t?.headers])
    });
  }
}, ih = class extends F {
  retrieve(e, t) {
    return this._client.get(b`/chatkit/threads/${e}`, {
      ...t,
      headers: $([{ "OpenAI-Beta": "chatkit_beta=v1" }, t?.headers])
    });
  }
  list(e = {}, t) {
    return this._client.getAPIList("/chatkit/threads", po, {
      query: e,
      ...t,
      headers: $([{ "OpenAI-Beta": "chatkit_beta=v1" }, t?.headers])
    });
  }
  delete(e, t) {
    return this._client.delete(b`/chatkit/threads/${e}`, {
      ...t,
      headers: $([{ "OpenAI-Beta": "chatkit_beta=v1" }, t?.headers])
    });
  }
  listItems(e, t = {}, n) {
    return this._client.getAPIList(b`/chatkit/threads/${e}/items`, po, {
      query: t,
      ...n,
      headers: $([{ "OpenAI-Beta": "chatkit_beta=v1" }, n?.headers])
    });
  }
}, Vi = class extends F {
  constructor() {
    super(...arguments), this.sessions = new oh(this._client), this.threads = new ih(this._client);
  }
};
Vi.Sessions = oh;
Vi.Threads = ih;
var sh = class extends F {
  create(e, t, n) {
    return this._client.post(b`/threads/${e}/messages`, {
      body: t,
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  retrieve(e, t, n) {
    const { thread_id: o } = t;
    return this._client.get(b`/threads/${o}/messages/${e}`, {
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  update(e, t, n) {
    const { thread_id: o, ...i } = t;
    return this._client.post(b`/threads/${o}/messages/${e}`, {
      body: i,
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  list(e, t = {}, n) {
    return this._client.getAPIList(b`/threads/${e}/messages`, te, {
      query: t,
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  delete(e, t, n) {
    const { thread_id: o } = t;
    return this._client.delete(b`/threads/${o}/messages/${e}`, {
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
}, rh = class extends F {
  retrieve(e, t, n) {
    const { thread_id: o, run_id: i, ...s } = t;
    return this._client.get(b`/threads/${o}/runs/${i}/steps/${e}`, {
      query: s,
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  list(e, t, n) {
    const { thread_id: o, ...i } = t;
    return this._client.getAPIList(b`/threads/${o}/runs/${e}/steps`, te, {
      query: i,
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
}, vC = (e) => {
  if (typeof Buffer < "u") {
    const t = Buffer.from(e, "base64");
    return Array.from(new Float32Array(t.buffer, t.byteOffset, t.length / Float32Array.BYTES_PER_ELEMENT));
  } else {
    const t = atob(e), n = t.length, o = new Uint8Array(n);
    for (let i = 0; i < n; i++) o[i] = t.charCodeAt(i);
    return Array.from(new Float32Array(o.buffer));
  }
}, Jt = (e) => {
  if (typeof globalThis.process < "u") return globalThis.process.env?.[e]?.trim() ?? void 0;
  if (typeof globalThis.Deno < "u") return globalThis.Deno.env?.get?.(e)?.trim();
}, pe, Dt, _r, et, li, Ve, Ut, nn, xt, bi, Me, ui, ci, io, Qn, Zn, Ic, bc, Rc, Pc, xc, Mc, Nc, so = class extends Zr {
  constructor() {
    super(...arguments), pe.add(this), _r.set(this, []), et.set(this, {}), li.set(this, {}), Ve.set(this, void 0), Ut.set(this, void 0), nn.set(this, void 0), xt.set(this, void 0), bi.set(this, void 0), Me.set(this, void 0), ui.set(this, void 0), ci.set(this, void 0), io.set(this, void 0);
  }
  [(_r = /* @__PURE__ */ new WeakMap(), et = /* @__PURE__ */ new WeakMap(), li = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap(), Ut = /* @__PURE__ */ new WeakMap(), nn = /* @__PURE__ */ new WeakMap(), xt = /* @__PURE__ */ new WeakMap(), bi = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), ui = /* @__PURE__ */ new WeakMap(), ci = /* @__PURE__ */ new WeakMap(), io = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ new WeakSet(), Symbol.asyncIterator)]() {
    const e = [], t = [];
    let n = !1;
    return this.on("event", (o) => {
      const i = t.shift();
      i ? i.resolve(o) : e.push(o);
    }), this.on("end", () => {
      n = !0;
      for (const o of t) o.resolve(void 0);
      t.length = 0;
    }), this.on("abort", (o) => {
      n = !0;
      for (const i of t) i.reject(o);
      t.length = 0;
    }), this.on("error", (o) => {
      n = !0;
      for (const i of t) i.reject(o);
      t.length = 0;
    }), {
      next: async () => e.length ? {
        value: e.shift(),
        done: !1
      } : n ? {
        value: void 0,
        done: !0
      } : new Promise((o, i) => t.push({
        resolve: o,
        reject: i
      })).then((o) => o ? {
        value: o,
        done: !1
      } : {
        value: void 0,
        done: !0
      }),
      return: async () => (this.abort(), {
        value: void 0,
        done: !0
      })
    };
  }
  static fromReadableStream(e) {
    const t = new Dt();
    return t._run(() => t._fromReadableStream(e)), t;
  }
  async _fromReadableStream(e, t) {
    const n = t?.signal;
    n && (n.aborted && this.controller.abort(), n.addEventListener("abort", () => this.controller.abort())), this._connected();
    const o = fo.fromReadableStream(e, this.controller);
    for await (const i of o) E(this, pe, "m", Qn).call(this, i);
    if (o.controller.signal?.aborted) throw new Ge();
    return this._addRun(E(this, pe, "m", Zn).call(this));
  }
  toReadableStream() {
    return new fo(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
  }
  static createToolAssistantStream(e, t, n, o) {
    const i = new Dt();
    return i._run(() => i._runToolAssistantStream(e, t, n, {
      ...o,
      headers: {
        ...o?.headers,
        "X-Stainless-Helper-Method": "stream"
      }
    })), i;
  }
  async _createToolAssistantStream(e, t, n, o) {
    const i = o?.signal;
    i && (i.aborted && this.controller.abort(), i.addEventListener("abort", () => this.controller.abort()));
    const s = {
      ...n,
      stream: !0
    }, a = await e.submitToolOutputs(t, s, {
      ...o,
      signal: this.controller.signal
    });
    this._connected();
    for await (const u of a) E(this, pe, "m", Qn).call(this, u);
    if (a.controller.signal?.aborted) throw new Ge();
    return this._addRun(E(this, pe, "m", Zn).call(this));
  }
  static createThreadAssistantStream(e, t, n) {
    const o = new Dt();
    return o._run(() => o._threadAssistantStream(e, t, {
      ...n,
      headers: {
        ...n?.headers,
        "X-Stainless-Helper-Method": "stream"
      }
    })), o;
  }
  static createAssistantStream(e, t, n, o) {
    const i = new Dt();
    return i._run(() => i._runAssistantStream(e, t, n, {
      ...o,
      headers: {
        ...o?.headers,
        "X-Stainless-Helper-Method": "stream"
      }
    })), i;
  }
  currentEvent() {
    return E(this, ui, "f");
  }
  currentRun() {
    return E(this, ci, "f");
  }
  currentMessageSnapshot() {
    return E(this, Ve, "f");
  }
  currentRunStepSnapshot() {
    return E(this, io, "f");
  }
  async finalRunSteps() {
    return await this.done(), Object.values(E(this, et, "f"));
  }
  async finalMessages() {
    return await this.done(), Object.values(E(this, li, "f"));
  }
  async finalRun() {
    if (await this.done(), !E(this, Ut, "f")) throw Error("Final run was not received.");
    return E(this, Ut, "f");
  }
  async _createThreadAssistantStream(e, t, n) {
    const o = n?.signal;
    o && (o.aborted && this.controller.abort(), o.addEventListener("abort", () => this.controller.abort()));
    const i = {
      ...t,
      stream: !0
    }, s = await e.createAndRun(i, {
      ...n,
      signal: this.controller.signal
    });
    this._connected();
    for await (const a of s) E(this, pe, "m", Qn).call(this, a);
    if (s.controller.signal?.aborted) throw new Ge();
    return this._addRun(E(this, pe, "m", Zn).call(this));
  }
  async _createAssistantStream(e, t, n, o) {
    const i = o?.signal;
    i && (i.aborted && this.controller.abort(), i.addEventListener("abort", () => this.controller.abort()));
    const s = {
      ...n,
      stream: !0
    }, a = await e.create(t, s, {
      ...o,
      signal: this.controller.signal
    });
    this._connected();
    for await (const u of a) E(this, pe, "m", Qn).call(this, u);
    if (a.controller.signal?.aborted) throw new Ge();
    return this._addRun(E(this, pe, "m", Zn).call(this));
  }
  static accumulateDelta(e, t) {
    for (const [n, o] of Object.entries(t)) {
      if (!e.hasOwnProperty(n)) {
        e[n] = o;
        continue;
      }
      let i = e[n];
      if (i == null) {
        e[n] = o;
        continue;
      }
      if (n === "index" || n === "type") {
        e[n] = o;
        continue;
      }
      if (typeof i == "string" && typeof o == "string") i += o;
      else if (typeof i == "number" && typeof o == "number") i += o;
      else if (_s(i) && _s(o)) i = this.accumulateDelta(i, o);
      else if (Array.isArray(i) && Array.isArray(o)) {
        if (i.every((s) => typeof s == "string" || typeof s == "number")) {
          i.push(...o);
          continue;
        }
        for (const s of o) {
          if (!_s(s)) throw new Error(`Expected array delta entry to be an object but got: ${s}`);
          const a = s.index;
          if (a == null)
            throw console.error(s), new Error("Expected array delta entry to have an `index` property");
          if (typeof a != "number") throw new Error(`Expected array delta entry \`index\` property to be a number but got ${a}`);
          const u = i[a];
          u == null ? i.push(s) : i[a] = this.accumulateDelta(u, s);
        }
        continue;
      } else throw Error(`Unhandled record type: ${n}, deltaValue: ${o}, accValue: ${i}`);
      e[n] = i;
    }
    return e;
  }
  _addRun(e) {
    return e;
  }
  async _threadAssistantStream(e, t, n) {
    return await this._createThreadAssistantStream(t, e, n);
  }
  async _runAssistantStream(e, t, n, o) {
    return await this._createAssistantStream(t, e, n, o);
  }
  async _runToolAssistantStream(e, t, n, o) {
    return await this._createToolAssistantStream(t, e, n, o);
  }
};
Dt = so, Qn = function(t) {
  if (!this.ended)
    switch (O(this, ui, t, "f"), E(this, pe, "m", Rc).call(this, t), t.event) {
      case "thread.created":
        break;
      case "thread.run.created":
      case "thread.run.queued":
      case "thread.run.in_progress":
      case "thread.run.requires_action":
      case "thread.run.completed":
      case "thread.run.incomplete":
      case "thread.run.failed":
      case "thread.run.cancelling":
      case "thread.run.cancelled":
      case "thread.run.expired":
        E(this, pe, "m", Nc).call(this, t);
        break;
      case "thread.run.step.created":
      case "thread.run.step.in_progress":
      case "thread.run.step.delta":
      case "thread.run.step.completed":
      case "thread.run.step.failed":
      case "thread.run.step.cancelled":
      case "thread.run.step.expired":
        E(this, pe, "m", bc).call(this, t);
        break;
      case "thread.message.created":
      case "thread.message.in_progress":
      case "thread.message.delta":
      case "thread.message.completed":
      case "thread.message.incomplete":
        E(this, pe, "m", Ic).call(this, t);
        break;
      case "error":
        throw new Error("Encountered an error event in event processing - errors should be processed earlier");
      default:
    }
}, Zn = function() {
  if (this.ended) throw new B("stream has ended, this shouldn't happen");
  if (!E(this, Ut, "f")) throw Error("Final run has not been received");
  return E(this, Ut, "f");
}, Ic = function(t) {
  const [n, o] = E(this, pe, "m", xc).call(this, t, E(this, Ve, "f"));
  O(this, Ve, n, "f"), E(this, li, "f")[n.id] = n;
  for (const i of o) {
    const s = n.content[i.index];
    s?.type == "text" && this._emit("textCreated", s.text);
  }
  switch (t.event) {
    case "thread.message.created":
      this._emit("messageCreated", t.data);
      break;
    case "thread.message.in_progress":
      break;
    case "thread.message.delta":
      if (this._emit("messageDelta", t.data.delta, n), t.data.delta.content) for (const i of t.data.delta.content) {
        if (i.type == "text" && i.text) {
          let s = i.text, a = n.content[i.index];
          if (a && a.type == "text") this._emit("textDelta", s, a.text);
          else throw Error("The snapshot associated with this text delta is not text or missing");
        }
        if (i.index != E(this, nn, "f")) {
          if (E(this, xt, "f")) switch (E(this, xt, "f").type) {
            case "text":
              this._emit("textDone", E(this, xt, "f").text, E(this, Ve, "f"));
              break;
            case "image_file":
              this._emit("imageFileDone", E(this, xt, "f").image_file, E(this, Ve, "f"));
              break;
          }
          O(this, nn, i.index, "f");
        }
        O(this, xt, n.content[i.index], "f");
      }
      break;
    case "thread.message.completed":
    case "thread.message.incomplete":
      if (E(this, nn, "f") !== void 0) {
        const i = t.data.content[E(this, nn, "f")];
        if (i) switch (i.type) {
          case "image_file":
            this._emit("imageFileDone", i.image_file, E(this, Ve, "f"));
            break;
          case "text":
            this._emit("textDone", i.text, E(this, Ve, "f"));
            break;
        }
      }
      E(this, Ve, "f") && this._emit("messageDone", t.data), O(this, Ve, void 0, "f");
  }
}, bc = function(t) {
  const n = E(this, pe, "m", Pc).call(this, t);
  switch (O(this, io, n, "f"), t.event) {
    case "thread.run.step.created":
      this._emit("runStepCreated", t.data);
      break;
    case "thread.run.step.delta":
      const o = t.data.delta;
      if (o.step_details && o.step_details.type == "tool_calls" && o.step_details.tool_calls && n.step_details.type == "tool_calls") for (const i of o.step_details.tool_calls) i.index == E(this, bi, "f") ? this._emit("toolCallDelta", i, n.step_details.tool_calls[i.index]) : (E(this, Me, "f") && this._emit("toolCallDone", E(this, Me, "f")), O(this, bi, i.index, "f"), O(this, Me, n.step_details.tool_calls[i.index], "f"), E(this, Me, "f") && this._emit("toolCallCreated", E(this, Me, "f")));
      this._emit("runStepDelta", t.data.delta, n);
      break;
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
      O(this, io, void 0, "f"), t.data.step_details.type == "tool_calls" && E(this, Me, "f") && (this._emit("toolCallDone", E(this, Me, "f")), O(this, Me, void 0, "f")), this._emit("runStepDone", t.data, n);
      break;
    case "thread.run.step.in_progress":
      break;
  }
}, Rc = function(t) {
  E(this, _r, "f").push(t), this._emit("event", t);
}, Pc = function(t) {
  switch (t.event) {
    case "thread.run.step.created":
      return E(this, et, "f")[t.data.id] = t.data, t.data;
    case "thread.run.step.delta":
      let n = E(this, et, "f")[t.data.id];
      if (!n) throw Error("Received a RunStepDelta before creation of a snapshot");
      let o = t.data;
      if (o.delta) {
        const i = Dt.accumulateDelta(n, o.delta);
        E(this, et, "f")[t.data.id] = i;
      }
      return E(this, et, "f")[t.data.id];
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
    case "thread.run.step.in_progress":
      E(this, et, "f")[t.data.id] = t.data;
      break;
  }
  if (E(this, et, "f")[t.data.id]) return E(this, et, "f")[t.data.id];
  throw new Error("No snapshot available");
}, xc = function(t, n) {
  let o = [];
  switch (t.event) {
    case "thread.message.created":
      return [t.data, o];
    case "thread.message.delta":
      if (!n) throw Error("Received a delta with no existing snapshot (there should be one from message creation)");
      let i = t.data;
      if (i.delta.content) for (const s of i.delta.content) if (s.index in n.content) {
        let a = n.content[s.index];
        n.content[s.index] = E(this, pe, "m", Mc).call(this, s, a);
      } else
        n.content[s.index] = s, o.push(s);
      return [n, o];
    case "thread.message.in_progress":
    case "thread.message.completed":
    case "thread.message.incomplete":
      if (n) return [n, o];
      throw Error("Received thread message event with no existing snapshot");
  }
  throw Error("Tried to accumulate a non-message event");
}, Mc = function(t, n) {
  return Dt.accumulateDelta(n, t);
}, Nc = function(t) {
  switch (O(this, ci, t.data, "f"), t.event) {
    case "thread.run.created":
      break;
    case "thread.run.queued":
      break;
    case "thread.run.in_progress":
      break;
    case "thread.run.requires_action":
    case "thread.run.cancelled":
    case "thread.run.failed":
    case "thread.run.completed":
    case "thread.run.expired":
    case "thread.run.incomplete":
      O(this, Ut, t.data, "f"), E(this, Me, "f") && (this._emit("toolCallDone", E(this, Me, "f")), O(this, Me, void 0, "f"));
      break;
    case "thread.run.cancelling":
      break;
  }
};
var ta = class extends F {
  constructor() {
    super(...arguments), this.steps = new rh(this._client);
  }
  create(e, t, n) {
    const { include: o, ...i } = t;
    return this._client.post(b`/threads/${e}/runs`, {
      query: { include: o },
      body: i,
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers]),
      stream: t.stream ?? !1,
      __synthesizeEventData: !0
    });
  }
  retrieve(e, t, n) {
    const { thread_id: o } = t;
    return this._client.get(b`/threads/${o}/runs/${e}`, {
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  update(e, t, n) {
    const { thread_id: o, ...i } = t;
    return this._client.post(b`/threads/${o}/runs/${e}`, {
      body: i,
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  list(e, t = {}, n) {
    return this._client.getAPIList(b`/threads/${e}/runs`, te, {
      query: t,
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  cancel(e, t, n) {
    const { thread_id: o } = t;
    return this._client.post(b`/threads/${o}/runs/${e}/cancel`, {
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  async createAndPoll(e, t, n) {
    const o = await this.create(e, t, n);
    return await this.poll(o.id, { thread_id: e }, n);
  }
  createAndStream(e, t, n) {
    return so.createAssistantStream(e, this._client.beta.threads.runs, t, n);
  }
  async poll(e, t, n) {
    const o = $([n?.headers, {
      "X-Stainless-Poll-Helper": "true",
      "X-Stainless-Custom-Poll-Interval": n?.pollIntervalMs?.toString() ?? void 0
    }]);
    for (; ; ) {
      const { data: i, response: s } = await this.retrieve(e, t, {
        ...n,
        headers: {
          ...n?.headers,
          ...o
        }
      }).withResponse();
      switch (i.status) {
        case "queued":
        case "in_progress":
        case "cancelling":
          let a = 5e3;
          if (n?.pollIntervalMs) a = n.pollIntervalMs;
          else {
            const u = s.headers.get("openai-poll-after-ms");
            if (u) {
              const c = parseInt(u);
              isNaN(c) || (a = c);
            }
          }
          await Eo(a);
          break;
        case "requires_action":
        case "incomplete":
        case "cancelled":
        case "completed":
        case "failed":
        case "expired":
          return i;
      }
    }
  }
  stream(e, t, n) {
    return so.createAssistantStream(e, this._client.beta.threads.runs, t, n);
  }
  submitToolOutputs(e, t, n) {
    const { thread_id: o, ...i } = t;
    return this._client.post(b`/threads/${o}/runs/${e}/submit_tool_outputs`, {
      body: i,
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers]),
      stream: t.stream ?? !1,
      __synthesizeEventData: !0
    });
  }
  async submitToolOutputsAndPoll(e, t, n) {
    const o = await this.submitToolOutputs(e, t, n);
    return await this.poll(o.id, t, n);
  }
  submitToolOutputsStream(e, t, n) {
    return so.createToolAssistantStream(e, this._client.beta.threads.runs, t, n);
  }
};
ta.Steps = rh;
var Hi = class extends F {
  constructor() {
    super(...arguments), this.runs = new ta(this._client), this.messages = new sh(this._client);
  }
  create(e = {}, t) {
    return this._client.post("/threads", {
      body: e,
      ...t,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  retrieve(e, t) {
    return this._client.get(b`/threads/${e}`, {
      ...t,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  update(e, t, n) {
    return this._client.post(b`/threads/${e}`, {
      body: t,
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  delete(e, t) {
    return this._client.delete(b`/threads/${e}`, {
      ...t,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  createAndRun(e, t) {
    return this._client.post("/threads/runs", {
      body: e,
      ...t,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, t?.headers]),
      stream: e.stream ?? !1,
      __synthesizeEventData: !0
    });
  }
  async createAndRunPoll(e, t) {
    const n = await this.createAndRun(e, t);
    return await this.runs.poll(n.id, { thread_id: n.thread_id }, t);
  }
  createAndRunStream(e, t) {
    return so.createThreadAssistantStream(e, this._client.beta.threads, t);
  }
};
Hi.Runs = ta;
Hi.Messages = sh;
var mn = class extends F {
  constructor() {
    super(...arguments), this.realtime = new qi(this._client), this.chatkit = new Vi(this._client), this.assistants = new eh(this._client), this.threads = new Hi(this._client);
  }
};
mn.Realtime = qi;
mn.ChatKit = Vi;
mn.Assistants = eh;
mn.Threads = Hi;
var ah = class extends F {
  create(e, t) {
    return this._client.post("/completions", {
      body: e,
      ...t,
      stream: e.stream ?? !1
    });
  }
}, lh = class extends F {
  retrieve(e, t, n) {
    const { container_id: o } = t;
    return this._client.get(b`/containers/${o}/files/${e}/content`, {
      ...n,
      headers: $([{ Accept: "application/binary" }, n?.headers]),
      __binaryResponse: !0
    });
  }
}, na = class extends F {
  constructor() {
    super(...arguments), this.content = new lh(this._client);
  }
  create(e, t, n) {
    return this._client.post(b`/containers/${e}/files`, Oi({
      body: t,
      ...n
    }, this._client));
  }
  retrieve(e, t, n) {
    const { container_id: o } = t;
    return this._client.get(b`/containers/${o}/files/${e}`, n);
  }
  list(e, t = {}, n) {
    return this._client.getAPIList(b`/containers/${e}/files`, te, {
      query: t,
      ...n
    });
  }
  delete(e, t, n) {
    const { container_id: o } = t;
    return this._client.delete(b`/containers/${o}/files/${e}`, {
      ...n,
      headers: $([{ Accept: "*/*" }, n?.headers])
    });
  }
};
na.Content = lh;
var oa = class extends F {
  constructor() {
    super(...arguments), this.files = new na(this._client);
  }
  create(e, t) {
    return this._client.post("/containers", {
      body: e,
      ...t
    });
  }
  retrieve(e, t) {
    return this._client.get(b`/containers/${e}`, t);
  }
  list(e = {}, t) {
    return this._client.getAPIList("/containers", te, {
      query: e,
      ...t
    });
  }
  delete(e, t) {
    return this._client.delete(b`/containers/${e}`, {
      ...t,
      headers: $([{ Accept: "*/*" }, t?.headers])
    });
  }
};
oa.Files = na;
var uh = class extends F {
  create(e, t, n) {
    const { include: o, ...i } = t;
    return this._client.post(b`/conversations/${e}/items`, {
      query: { include: o },
      body: i,
      ...n
    });
  }
  retrieve(e, t, n) {
    const { conversation_id: o, ...i } = t;
    return this._client.get(b`/conversations/${o}/items/${e}`, {
      query: i,
      ...n
    });
  }
  list(e, t = {}, n) {
    return this._client.getAPIList(b`/conversations/${e}/items`, po, {
      query: t,
      ...n
    });
  }
  delete(e, t, n) {
    const { conversation_id: o } = t;
    return this._client.delete(b`/conversations/${o}/items/${e}`, n);
  }
}, ia = class extends F {
  constructor() {
    super(...arguments), this.items = new uh(this._client);
  }
  create(e = {}, t) {
    return this._client.post("/conversations", {
      body: e,
      ...t
    });
  }
  retrieve(e, t) {
    return this._client.get(b`/conversations/${e}`, t);
  }
  update(e, t, n) {
    return this._client.post(b`/conversations/${e}`, {
      body: t,
      ...n
    });
  }
  delete(e, t) {
    return this._client.delete(b`/conversations/${e}`, t);
  }
};
ia.Items = uh;
var ch = class extends F {
  create(e, t) {
    const n = !!e.encoding_format;
    let o = n ? e.encoding_format : "base64";
    n && fe(this._client).debug("embeddings/user defined encoding_format:", e.encoding_format);
    const i = this._client.post("/embeddings", {
      body: {
        ...e,
        encoding_format: o
      },
      ...t
    });
    return n ? i : (fe(this._client).debug("embeddings/decoding base64 embeddings from base64"), i._thenUnwrap((s) => (s && s.data && s.data.forEach((a) => {
      const u = a.embedding;
      a.embedding = vC(u);
    }), s)));
  }
}, dh = class extends F {
  retrieve(e, t, n) {
    const { eval_id: o, run_id: i } = t;
    return this._client.get(b`/evals/${o}/runs/${i}/output_items/${e}`, n);
  }
  list(e, t, n) {
    const { eval_id: o, ...i } = t;
    return this._client.getAPIList(b`/evals/${o}/runs/${e}/output_items`, te, {
      query: i,
      ...n
    });
  }
}, sa = class extends F {
  constructor() {
    super(...arguments), this.outputItems = new dh(this._client);
  }
  create(e, t, n) {
    return this._client.post(b`/evals/${e}/runs`, {
      body: t,
      ...n
    });
  }
  retrieve(e, t, n) {
    const { eval_id: o } = t;
    return this._client.get(b`/evals/${o}/runs/${e}`, n);
  }
  list(e, t = {}, n) {
    return this._client.getAPIList(b`/evals/${e}/runs`, te, {
      query: t,
      ...n
    });
  }
  delete(e, t, n) {
    const { eval_id: o } = t;
    return this._client.delete(b`/evals/${o}/runs/${e}`, n);
  }
  cancel(e, t, n) {
    const { eval_id: o } = t;
    return this._client.post(b`/evals/${o}/runs/${e}`, n);
  }
};
sa.OutputItems = dh;
var ra = class extends F {
  constructor() {
    super(...arguments), this.runs = new sa(this._client);
  }
  create(e, t) {
    return this._client.post("/evals", {
      body: e,
      ...t
    });
  }
  retrieve(e, t) {
    return this._client.get(b`/evals/${e}`, t);
  }
  update(e, t, n) {
    return this._client.post(b`/evals/${e}`, {
      body: t,
      ...n
    });
  }
  list(e = {}, t) {
    return this._client.getAPIList("/evals", te, {
      query: e,
      ...t
    });
  }
  delete(e, t) {
    return this._client.delete(b`/evals/${e}`, t);
  }
};
ra.Runs = sa;
var fh = class extends F {
  create(e, t) {
    return this._client.post("/files", tt({
      body: e,
      ...t
    }, this._client));
  }
  retrieve(e, t) {
    return this._client.get(b`/files/${e}`, t);
  }
  list(e = {}, t) {
    return this._client.getAPIList("/files", te, {
      query: e,
      ...t
    });
  }
  delete(e, t) {
    return this._client.delete(b`/files/${e}`, t);
  }
  content(e, t) {
    return this._client.get(b`/files/${e}/content`, {
      ...t,
      headers: $([{ Accept: "application/binary" }, t?.headers]),
      __binaryResponse: !0
    });
  }
  async waitForProcessing(e, { pollInterval: t = 5e3, maxWait: n = 1800 * 1e3 } = {}) {
    const o = /* @__PURE__ */ new Set([
      "processed",
      "error",
      "deleted"
    ]), i = Date.now();
    let s = await this.retrieve(e);
    for (; !s.status || !o.has(s.status); )
      if (await Eo(t), s = await this.retrieve(e), Date.now() - i > n) throw new Wr({ message: `Giving up on waiting for file ${e} to finish processing after ${n} milliseconds.` });
    return s;
  }
}, ph = class extends F {
}, hh = class extends F {
  run(e, t) {
    return this._client.post("/fine_tuning/alpha/graders/run", {
      body: e,
      ...t
    });
  }
  validate(e, t) {
    return this._client.post("/fine_tuning/alpha/graders/validate", {
      body: e,
      ...t
    });
  }
}, aa = class extends F {
  constructor() {
    super(...arguments), this.graders = new hh(this._client);
  }
};
aa.Graders = hh;
var mh = class extends F {
  create(e, t, n) {
    return this._client.getAPIList(b`/fine_tuning/checkpoints/${e}/permissions`, Gi, {
      body: t,
      method: "post",
      ...n
    });
  }
  retrieve(e, t = {}, n) {
    return this._client.get(b`/fine_tuning/checkpoints/${e}/permissions`, {
      query: t,
      ...n
    });
  }
  list(e, t = {}, n) {
    return this._client.getAPIList(b`/fine_tuning/checkpoints/${e}/permissions`, po, {
      query: t,
      ...n
    });
  }
  delete(e, t, n) {
    const { fine_tuned_model_checkpoint: o } = t;
    return this._client.delete(b`/fine_tuning/checkpoints/${o}/permissions/${e}`, n);
  }
}, la = class extends F {
  constructor() {
    super(...arguments), this.permissions = new mh(this._client);
  }
};
la.Permissions = mh;
var gh = class extends F {
  list(e, t = {}, n) {
    return this._client.getAPIList(b`/fine_tuning/jobs/${e}/checkpoints`, te, {
      query: t,
      ...n
    });
  }
}, ua = class extends F {
  constructor() {
    super(...arguments), this.checkpoints = new gh(this._client);
  }
  create(e, t) {
    return this._client.post("/fine_tuning/jobs", {
      body: e,
      ...t
    });
  }
  retrieve(e, t) {
    return this._client.get(b`/fine_tuning/jobs/${e}`, t);
  }
  list(e = {}, t) {
    return this._client.getAPIList("/fine_tuning/jobs", te, {
      query: e,
      ...t
    });
  }
  cancel(e, t) {
    return this._client.post(b`/fine_tuning/jobs/${e}/cancel`, t);
  }
  listEvents(e, t = {}, n) {
    return this._client.getAPIList(b`/fine_tuning/jobs/${e}/events`, te, {
      query: t,
      ...n
    });
  }
  pause(e, t) {
    return this._client.post(b`/fine_tuning/jobs/${e}/pause`, t);
  }
  resume(e, t) {
    return this._client.post(b`/fine_tuning/jobs/${e}/resume`, t);
  }
};
ua.Checkpoints = gh;
var gn = class extends F {
  constructor() {
    super(...arguments), this.methods = new ph(this._client), this.jobs = new ua(this._client), this.checkpoints = new la(this._client), this.alpha = new aa(this._client);
  }
};
gn.Methods = ph;
gn.Jobs = ua;
gn.Checkpoints = la;
gn.Alpha = aa;
var yh = class extends F {
}, ca = class extends F {
  constructor() {
    super(...arguments), this.graderModels = new yh(this._client);
  }
};
ca.GraderModels = yh;
var _h = class extends F {
  createVariation(e, t) {
    return this._client.post("/images/variations", tt({
      body: e,
      ...t
    }, this._client));
  }
  edit(e, t) {
    return this._client.post("/images/edits", tt({
      body: e,
      ...t,
      stream: e.stream ?? !1
    }, this._client));
  }
  generate(e, t) {
    return this._client.post("/images/generations", {
      body: e,
      ...t,
      stream: e.stream ?? !1
    });
  }
}, vh = class extends F {
  retrieve(e, t) {
    return this._client.get(b`/models/${e}`, t);
  }
  list(e) {
    return this._client.getAPIList("/models", Gi, e);
  }
  delete(e, t) {
    return this._client.delete(b`/models/${e}`, t);
  }
}, Th = class extends F {
  create(e, t) {
    return this._client.post("/moderations", {
      body: e,
      ...t
    });
  }
}, Sh = class extends F {
  accept(e, t, n) {
    return this._client.post(b`/realtime/calls/${e}/accept`, {
      body: t,
      ...n,
      headers: $([{ Accept: "*/*" }, n?.headers])
    });
  }
  hangup(e, t) {
    return this._client.post(b`/realtime/calls/${e}/hangup`, {
      ...t,
      headers: $([{ Accept: "*/*" }, t?.headers])
    });
  }
  refer(e, t, n) {
    return this._client.post(b`/realtime/calls/${e}/refer`, {
      body: t,
      ...n,
      headers: $([{ Accept: "*/*" }, n?.headers])
    });
  }
  reject(e, t = {}, n) {
    return this._client.post(b`/realtime/calls/${e}/reject`, {
      body: t,
      ...n,
      headers: $([{ Accept: "*/*" }, n?.headers])
    });
  }
}, Eh = class extends F {
  create(e, t) {
    return this._client.post("/realtime/client_secrets", {
      body: e,
      ...t
    });
  }
}, Ji = class extends F {
  constructor() {
    super(...arguments), this.clientSecrets = new Eh(this._client), this.calls = new Sh(this._client);
  }
};
Ji.ClientSecrets = Eh;
Ji.Calls = Sh;
function TC(e, t) {
  return !t || !EC(t) ? {
    ...e,
    output_parsed: null,
    output: e.output.map((n) => n.type === "function_call" ? {
      ...n,
      parsed_arguments: null
    } : n.type === "message" ? {
      ...n,
      content: n.content.map((o) => ({
        ...o,
        parsed: null
      }))
    } : n)
  } : wh(e, t);
}
function wh(e, t) {
  const n = e.output.map((i) => {
    if (i.type === "function_call") return {
      ...i,
      parsed_arguments: CC(t, i)
    };
    if (i.type === "message") {
      const s = i.content.map((a) => a.type === "output_text" ? {
        ...a,
        parsed: SC(t, a.text)
      } : a);
      return {
        ...i,
        content: s
      };
    }
    return i;
  }), o = Object.assign({}, e, { output: n });
  return Object.getOwnPropertyDescriptor(e, "output_text") || vr(o), Object.defineProperty(o, "output_parsed", {
    enumerable: !0,
    get() {
      for (const i of o.output)
        if (i.type === "message") {
          for (const s of i.content) if (s.type === "output_text" && s.parsed !== null) return s.parsed;
        }
      return null;
    }
  }), o;
}
function SC(e, t) {
  return e.text?.format?.type !== "json_schema" ? null : "$parseRaw" in e.text?.format ? (e.text?.format).$parseRaw(t) : JSON.parse(t);
}
function EC(e) {
  return !!Xr(e.text?.format);
}
function wC(e) {
  return e?.$brand === "auto-parseable-tool";
}
function AC(e, t) {
  return e.find((n) => n.type === "function" && n.name === t);
}
function CC(e, t) {
  const n = AC(e.tools ?? [], t.name);
  return {
    ...t,
    ...t,
    parsed_arguments: wC(n) ? n.$parseRaw(t.arguments) : n?.strict ? JSON.parse(t.arguments) : null
  };
}
function vr(e) {
  const t = [];
  for (const n of e.output)
    if (n.type === "message")
      for (const o of n.content) o.type === "output_text" && t.push(o.text);
  e.output_text = t.join("");
}
var Wt, zo, _t, Xo, kc, Dc, Uc, Lc, IC = class Ah extends Zr {
  constructor(t) {
    super(), Wt.add(this), zo.set(this, void 0), _t.set(this, void 0), Xo.set(this, void 0), O(this, zo, t, "f");
  }
  static createResponse(t, n, o) {
    const i = new Ah(n);
    return i._run(() => i._createOrRetrieveResponse(t, n, {
      ...o,
      headers: {
        ...o?.headers,
        "X-Stainless-Helper-Method": "stream"
      }
    })), i;
  }
  async _createOrRetrieveResponse(t, n, o) {
    const i = o?.signal;
    i && (i.aborted && this.controller.abort(), i.addEventListener("abort", () => this.controller.abort())), E(this, Wt, "m", kc).call(this);
    let s, a = null;
    "response_id" in n ? (s = await t.responses.retrieve(n.response_id, { stream: !0 }, {
      ...o,
      signal: this.controller.signal,
      stream: !0
    }), a = n.starting_after ?? null) : s = await t.responses.create({
      ...n,
      stream: !0
    }, {
      ...o,
      signal: this.controller.signal
    }), this._connected();
    for await (const u of s) E(this, Wt, "m", Dc).call(this, u, a);
    if (s.controller.signal?.aborted) throw new Ge();
    return E(this, Wt, "m", Uc).call(this);
  }
  [(zo = /* @__PURE__ */ new WeakMap(), _t = /* @__PURE__ */ new WeakMap(), Xo = /* @__PURE__ */ new WeakMap(), Wt = /* @__PURE__ */ new WeakSet(), kc = function() {
    this.ended || O(this, _t, void 0, "f");
  }, Dc = function(n, o) {
    if (this.ended) return;
    const i = (a, u) => {
      (o == null || u.sequence_number > o) && this._emit(a, u);
    }, s = E(this, Wt, "m", Lc).call(this, n);
    switch (i("event", n), n.type) {
      case "response.output_text.delta": {
        const a = s.output[n.output_index];
        if (!a) throw new B(`missing output at index ${n.output_index}`);
        if (a.type === "message") {
          const u = a.content[n.content_index];
          if (!u) throw new B(`missing content at index ${n.content_index}`);
          if (u.type !== "output_text") throw new B(`expected content to be 'output_text', got ${u.type}`);
          i("response.output_text.delta", {
            ...n,
            snapshot: u.text
          });
        }
        break;
      }
      case "response.function_call_arguments.delta": {
        const a = s.output[n.output_index];
        if (!a) throw new B(`missing output at index ${n.output_index}`);
        a.type === "function_call" && i("response.function_call_arguments.delta", {
          ...n,
          snapshot: a.arguments
        });
        break;
      }
      default:
        i(n.type, n);
        break;
    }
  }, Uc = function() {
    if (this.ended) throw new B("stream has ended, this shouldn't happen");
    const n = E(this, _t, "f");
    if (!n) throw new B("request ended without sending any events");
    O(this, _t, void 0, "f");
    const o = bC(n, E(this, zo, "f"));
    return O(this, Xo, o, "f"), o;
  }, Lc = function(n) {
    let o = E(this, _t, "f");
    if (!o) {
      if (n.type !== "response.created") throw new B(`When snapshot hasn't been set yet, expected 'response.created' event, got ${n.type}`);
      return o = O(this, _t, n.response, "f"), o;
    }
    switch (n.type) {
      case "response.output_item.added":
        o.output.push(n.item);
        break;
      case "response.content_part.added": {
        const i = o.output[n.output_index];
        if (!i) throw new B(`missing output at index ${n.output_index}`);
        const s = i.type, a = n.part;
        s === "message" && a.type !== "reasoning_text" ? i.content.push(a) : s === "reasoning" && a.type === "reasoning_text" && (i.content || (i.content = []), i.content.push(a));
        break;
      }
      case "response.output_text.delta": {
        const i = o.output[n.output_index];
        if (!i) throw new B(`missing output at index ${n.output_index}`);
        if (i.type === "message") {
          const s = i.content[n.content_index];
          if (!s) throw new B(`missing content at index ${n.content_index}`);
          if (s.type !== "output_text") throw new B(`expected content to be 'output_text', got ${s.type}`);
          s.text += n.delta;
        }
        break;
      }
      case "response.function_call_arguments.delta": {
        const i = o.output[n.output_index];
        if (!i) throw new B(`missing output at index ${n.output_index}`);
        i.type === "function_call" && (i.arguments += n.delta);
        break;
      }
      case "response.reasoning_text.delta": {
        const i = o.output[n.output_index];
        if (!i) throw new B(`missing output at index ${n.output_index}`);
        if (i.type === "reasoning") {
          const s = i.content?.[n.content_index];
          if (!s) throw new B(`missing content at index ${n.content_index}`);
          if (s.type !== "reasoning_text") throw new B(`expected content to be 'reasoning_text', got ${s.type}`);
          s.text += n.delta;
        }
        break;
      }
      case "response.completed":
        O(this, _t, n.response, "f");
        break;
    }
    return o;
  }, Symbol.asyncIterator)]() {
    const t = [], n = [];
    let o = !1;
    return this.on("event", (i) => {
      const s = n.shift();
      s ? s.resolve(i) : t.push(i);
    }), this.on("end", () => {
      o = !0;
      for (const i of n) i.resolve(void 0);
      n.length = 0;
    }), this.on("abort", (i) => {
      o = !0;
      for (const s of n) s.reject(i);
      n.length = 0;
    }), this.on("error", (i) => {
      o = !0;
      for (const s of n) s.reject(i);
      n.length = 0;
    }), {
      next: async () => t.length ? {
        value: t.shift(),
        done: !1
      } : o ? {
        value: void 0,
        done: !0
      } : new Promise((i, s) => n.push({
        resolve: i,
        reject: s
      })).then((i) => i ? {
        value: i,
        done: !1
      } : {
        value: void 0,
        done: !0
      }),
      return: async () => (this.abort(), {
        value: void 0,
        done: !0
      })
    };
  }
  async finalResponse() {
    await this.done();
    const t = E(this, Xo, "f");
    if (!t) throw new B("stream ended without producing a ChatCompletion");
    return t;
  }
};
function bC(e, t) {
  return TC(e, t);
}
var Ch = class extends F {
  list(e, t = {}, n) {
    return this._client.getAPIList(b`/responses/${e}/input_items`, te, {
      query: t,
      ...n
    });
  }
}, Ih = class extends F {
  count(e = {}, t) {
    return this._client.post("/responses/input_tokens", {
      body: e,
      ...t
    });
  }
}, Wi = class extends F {
  constructor() {
    super(...arguments), this.inputItems = new Ch(this._client), this.inputTokens = new Ih(this._client);
  }
  create(e, t) {
    return this._client.post("/responses", {
      body: e,
      ...t,
      stream: e.stream ?? !1
    })._thenUnwrap((n) => ("object" in n && n.object === "response" && vr(n), n));
  }
  retrieve(e, t = {}, n) {
    return this._client.get(b`/responses/${e}`, {
      query: t,
      ...n,
      stream: t?.stream ?? !1
    })._thenUnwrap((o) => ("object" in o && o.object === "response" && vr(o), o));
  }
  delete(e, t) {
    return this._client.delete(b`/responses/${e}`, {
      ...t,
      headers: $([{ Accept: "*/*" }, t?.headers])
    });
  }
  parse(e, t) {
    return this._client.responses.create(e, t)._thenUnwrap((n) => wh(n, e));
  }
  stream(e, t) {
    return IC.createResponse(this._client, e, t);
  }
  cancel(e, t) {
    return this._client.post(b`/responses/${e}/cancel`, t);
  }
  compact(e, t) {
    return this._client.post("/responses/compact", {
      body: e,
      ...t
    });
  }
};
Wi.InputItems = Ch;
Wi.InputTokens = Ih;
var bh = class extends F {
  retrieve(e, t) {
    return this._client.get(b`/skills/${e}/content`, {
      ...t,
      headers: $([{ Accept: "application/binary" }, t?.headers]),
      __binaryResponse: !0
    });
  }
}, Rh = class extends F {
  retrieve(e, t, n) {
    const { skill_id: o } = t;
    return this._client.get(b`/skills/${o}/versions/${e}/content`, {
      ...n,
      headers: $([{ Accept: "application/binary" }, n?.headers]),
      __binaryResponse: !0
    });
  }
}, da = class extends F {
  constructor() {
    super(...arguments), this.content = new Rh(this._client);
  }
  create(e, t = {}, n) {
    return this._client.post(b`/skills/${e}/versions`, Oi({
      body: t,
      ...n
    }, this._client));
  }
  retrieve(e, t, n) {
    const { skill_id: o } = t;
    return this._client.get(b`/skills/${o}/versions/${e}`, n);
  }
  list(e, t = {}, n) {
    return this._client.getAPIList(b`/skills/${e}/versions`, te, {
      query: t,
      ...n
    });
  }
  delete(e, t, n) {
    const { skill_id: o } = t;
    return this._client.delete(b`/skills/${o}/versions/${e}`, n);
  }
};
da.Content = Rh;
var Ki = class extends F {
  constructor() {
    super(...arguments), this.content = new bh(this._client), this.versions = new da(this._client);
  }
  create(e = {}, t) {
    return this._client.post("/skills", Oi({
      body: e,
      ...t
    }, this._client));
  }
  retrieve(e, t) {
    return this._client.get(b`/skills/${e}`, t);
  }
  update(e, t, n) {
    return this._client.post(b`/skills/${e}`, {
      body: t,
      ...n
    });
  }
  list(e = {}, t) {
    return this._client.getAPIList("/skills", te, {
      query: e,
      ...t
    });
  }
  delete(e, t) {
    return this._client.delete(b`/skills/${e}`, t);
  }
};
Ki.Content = bh;
Ki.Versions = da;
var Ph = class extends F {
  create(e, t, n) {
    return this._client.post(b`/uploads/${e}/parts`, tt({
      body: t,
      ...n
    }, this._client));
  }
}, fa = class extends F {
  constructor() {
    super(...arguments), this.parts = new Ph(this._client);
  }
  create(e, t) {
    return this._client.post("/uploads", {
      body: e,
      ...t
    });
  }
  cancel(e, t) {
    return this._client.post(b`/uploads/${e}/cancel`, t);
  }
  complete(e, t, n) {
    return this._client.post(b`/uploads/${e}/complete`, {
      body: t,
      ...n
    });
  }
};
fa.Parts = Ph;
var RC = async (e) => {
  const t = await Promise.allSettled(e), n = t.filter((i) => i.status === "rejected");
  if (n.length) {
    for (const i of n) console.error(i.reason);
    throw new Error(`${n.length} promise(s) failed - see the above errors`);
  }
  const o = [];
  for (const i of t) i.status === "fulfilled" && o.push(i.value);
  return o;
}, xh = class extends F {
  create(e, t, n) {
    return this._client.post(b`/vector_stores/${e}/file_batches`, {
      body: t,
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  retrieve(e, t, n) {
    const { vector_store_id: o } = t;
    return this._client.get(b`/vector_stores/${o}/file_batches/${e}`, {
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  cancel(e, t, n) {
    const { vector_store_id: o } = t;
    return this._client.post(b`/vector_stores/${o}/file_batches/${e}/cancel`, {
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  async createAndPoll(e, t, n) {
    const o = await this.create(e, t);
    return await this.poll(e, o.id, n);
  }
  listFiles(e, t, n) {
    const { vector_store_id: o, ...i } = t;
    return this._client.getAPIList(b`/vector_stores/${o}/file_batches/${e}/files`, te, {
      query: i,
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  async poll(e, t, n) {
    const o = $([n?.headers, {
      "X-Stainless-Poll-Helper": "true",
      "X-Stainless-Custom-Poll-Interval": n?.pollIntervalMs?.toString() ?? void 0
    }]);
    for (; ; ) {
      const { data: i, response: s } = await this.retrieve(t, { vector_store_id: e }, {
        ...n,
        headers: o
      }).withResponse();
      switch (i.status) {
        case "in_progress":
          let a = 5e3;
          if (n?.pollIntervalMs) a = n.pollIntervalMs;
          else {
            const u = s.headers.get("openai-poll-after-ms");
            if (u) {
              const c = parseInt(u);
              isNaN(c) || (a = c);
            }
          }
          await Eo(a);
          break;
        case "failed":
        case "cancelled":
        case "completed":
          return i;
      }
    }
  }
  async uploadAndPoll(e, { files: t, fileIds: n = [] }, o) {
    if (t == null || t.length == 0) throw new Error("No `files` provided to process. If you've already uploaded files you should use `.createAndPoll()` instead");
    const i = o?.maxConcurrency ?? 5, s = Math.min(i, t.length), a = this._client, u = t.values(), c = [...n];
    async function d(p) {
      for (let f of p) {
        const h = await a.files.create({
          file: f,
          purpose: "assistants"
        }, o);
        c.push(h.id);
      }
    }
    return await RC(Array(s).fill(u).map(d)), await this.createAndPoll(e, { file_ids: c });
  }
}, Mh = class extends F {
  create(e, t, n) {
    return this._client.post(b`/vector_stores/${e}/files`, {
      body: t,
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  retrieve(e, t, n) {
    const { vector_store_id: o } = t;
    return this._client.get(b`/vector_stores/${o}/files/${e}`, {
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  update(e, t, n) {
    const { vector_store_id: o, ...i } = t;
    return this._client.post(b`/vector_stores/${o}/files/${e}`, {
      body: i,
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  list(e, t = {}, n) {
    return this._client.getAPIList(b`/vector_stores/${e}/files`, te, {
      query: t,
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  delete(e, t, n) {
    const { vector_store_id: o } = t;
    return this._client.delete(b`/vector_stores/${o}/files/${e}`, {
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  async createAndPoll(e, t, n) {
    const o = await this.create(e, t, n);
    return await this.poll(e, o.id, n);
  }
  async poll(e, t, n) {
    const o = $([n?.headers, {
      "X-Stainless-Poll-Helper": "true",
      "X-Stainless-Custom-Poll-Interval": n?.pollIntervalMs?.toString() ?? void 0
    }]);
    for (; ; ) {
      const i = await this.retrieve(t, { vector_store_id: e }, {
        ...n,
        headers: o
      }).withResponse(), s = i.data;
      switch (s.status) {
        case "in_progress":
          let a = 5e3;
          if (n?.pollIntervalMs) a = n.pollIntervalMs;
          else {
            const u = i.response.headers.get("openai-poll-after-ms");
            if (u) {
              const c = parseInt(u);
              isNaN(c) || (a = c);
            }
          }
          await Eo(a);
          break;
        case "failed":
        case "completed":
          return s;
      }
    }
  }
  async upload(e, t, n) {
    const o = await this._client.files.create({
      file: t,
      purpose: "assistants"
    }, n);
    return this.create(e, { file_id: o.id }, n);
  }
  async uploadAndPoll(e, t, n) {
    const o = await this.upload(e, t, n);
    return await this.poll(e, o.id, n);
  }
  content(e, t, n) {
    const { vector_store_id: o } = t;
    return this._client.getAPIList(b`/vector_stores/${o}/files/${e}/content`, Gi, {
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
}, Yi = class extends F {
  constructor() {
    super(...arguments), this.files = new Mh(this._client), this.fileBatches = new xh(this._client);
  }
  create(e, t) {
    return this._client.post("/vector_stores", {
      body: e,
      ...t,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  retrieve(e, t) {
    return this._client.get(b`/vector_stores/${e}`, {
      ...t,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  update(e, t, n) {
    return this._client.post(b`/vector_stores/${e}`, {
      body: t,
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  list(e = {}, t) {
    return this._client.getAPIList("/vector_stores", te, {
      query: e,
      ...t,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  delete(e, t) {
    return this._client.delete(b`/vector_stores/${e}`, {
      ...t,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  search(e, t, n) {
    return this._client.getAPIList(b`/vector_stores/${e}/search`, Gi, {
      body: t,
      method: "post",
      ...n,
      headers: $([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
};
Yi.Files = Mh;
Yi.FileBatches = xh;
var Nh = class extends F {
  create(e, t) {
    return this._client.post("/videos", tt({
      body: e,
      ...t
    }, this._client));
  }
  retrieve(e, t) {
    return this._client.get(b`/videos/${e}`, t);
  }
  list(e = {}, t) {
    return this._client.getAPIList("/videos", po, {
      query: e,
      ...t
    });
  }
  delete(e, t) {
    return this._client.delete(b`/videos/${e}`, t);
  }
  createCharacter(e, t) {
    return this._client.post("/videos/characters", tt({
      body: e,
      ...t
    }, this._client));
  }
  downloadContent(e, t = {}, n) {
    return this._client.get(b`/videos/${e}/content`, {
      query: t,
      ...n,
      headers: $([{ Accept: "application/binary" }, n?.headers]),
      __binaryResponse: !0
    });
  }
  edit(e, t) {
    return this._client.post("/videos/edits", tt({
      body: e,
      ...t
    }, this._client));
  }
  extend(e, t) {
    return this._client.post("/videos/extensions", tt({
      body: e,
      ...t
    }, this._client));
  }
  getCharacter(e, t) {
    return this._client.get(b`/videos/characters/${e}`, t);
  }
  remix(e, t, n) {
    return this._client.post(b`/videos/${e}/remix`, Oi({
      body: t,
      ...n
    }, this._client));
  }
}, Zt, kh, di, Dh = class extends F {
  constructor() {
    super(...arguments), Zt.add(this);
  }
  async unwrap(e, t, n = this._client.webhookSecret, o = 300) {
    return await this.verifySignature(e, t, n, o), JSON.parse(e);
  }
  async verifySignature(e, t, n = this._client.webhookSecret, o = 300) {
    if (typeof crypto > "u" || typeof crypto.subtle.importKey != "function" || typeof crypto.subtle.verify != "function") throw new Error("Webhook signature verification is only supported when the `crypto` global is defined");
    E(this, Zt, "m", kh).call(this, n);
    const i = $([t]).values, s = E(this, Zt, "m", di).call(this, i, "webhook-signature"), a = E(this, Zt, "m", di).call(this, i, "webhook-timestamp"), u = E(this, Zt, "m", di).call(this, i, "webhook-id"), c = parseInt(a, 10);
    if (isNaN(c)) throw new Vn("Invalid webhook timestamp format");
    const d = Math.floor(Date.now() / 1e3);
    if (d - c > o) throw new Vn("Webhook timestamp is too old");
    if (c > d + o) throw new Vn("Webhook timestamp is too new");
    const p = s.split(" ").map((g) => g.startsWith("v1,") ? g.substring(3) : g), f = n.startsWith("whsec_") ? Buffer.from(n.replace("whsec_", ""), "base64") : Buffer.from(n, "utf-8"), h = u ? `${u}.${a}.${e}` : `${a}.${e}`, m = await crypto.subtle.importKey("raw", f, {
      name: "HMAC",
      hash: "SHA-256"
    }, !1, ["verify"]);
    for (const g of p) try {
      const y = Buffer.from(g, "base64");
      if (await crypto.subtle.verify("HMAC", m, y, new TextEncoder().encode(h))) return;
    } catch {
      continue;
    }
    throw new Vn("The given webhook signature does not match the expected signature");
  }
};
Zt = /* @__PURE__ */ new WeakSet(), kh = function(t) {
  if (typeof t != "string" || t.length === 0) throw new Error("The webhook secret must either be set using the env var, OPENAI_WEBHOOK_SECRET, on the client class, OpenAI({ webhookSecret: '123' }), or passed to this function");
}, di = function(t, n) {
  if (!t) throw new Error("Headers are required");
  const o = t.get(n);
  if (o == null) throw new Error(`Missing required header: ${n}`);
  return o;
};
var Tr, pa, fi, Uh, Is = "workload-identity-auth", W = class {
  constructor({ baseURL: e = Jt("OPENAI_BASE_URL"), apiKey: t = Jt("OPENAI_API_KEY"), organization: n = Jt("OPENAI_ORG_ID") ?? null, project: o = Jt("OPENAI_PROJECT_ID") ?? null, webhookSecret: i = Jt("OPENAI_WEBHOOK_SECRET") ?? null, workloadIdentity: s, ...a } = {}) {
    if (Tr.add(this), fi.set(this, void 0), this.completions = new ah(this), this.chat = new ea(this), this.embeddings = new ch(this), this.files = new fh(this), this.images = new _h(this), this.audio = new Ao(this), this.moderations = new Th(this), this.models = new vh(this), this.fineTuning = new gn(this), this.graders = new ca(this), this.vectorStores = new Yi(this), this.webhooks = new Dh(this), this.beta = new mn(this), this.batches = new jp(this), this.uploads = new fa(this), this.responses = new Wi(this), this.realtime = new Ji(this), this.conversations = new ia(this), this.evals = new ra(this), this.containers = new oa(this), this.skills = new Ki(this), this.videos = new Nh(this), s) {
      if (t && t !== Is) throw new B("The `apiKey` and `workloadIdentity` arguments are mutually exclusive; only one can be passed at a time.");
      t = Is;
    } else if (t === void 0) throw new B("Missing credentials. Please pass an `apiKey`, `workloadIdentity`, or set the `OPENAI_API_KEY` environment variable.");
    const u = {
      apiKey: t,
      organization: n,
      project: o,
      webhookSecret: i,
      workloadIdentity: s,
      ...a,
      baseURL: e || "https://api.openai.com/v1"
    };
    if (!u.dangerouslyAllowBrowser && SA()) throw new B(`It looks like you're running in a browser-like environment.

This is disabled by default, as it risks exposing your secret API credentials to attackers.
If you understand the risks and have appropriate mitigations in place,
you can set the \`dangerouslyAllowBrowser\` option to \`true\`, e.g.,

new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety
`);
    this.baseURL = u.baseURL, this.timeout = u.timeout ?? pa.DEFAULT_TIMEOUT, this.logger = u.logger ?? console;
    const c = "warn";
    this.logLevel = c, this.logLevel = _c(u.logLevel, "ClientOptions.logLevel", this) ?? _c(Jt("OPENAI_LOG"), "process.env['OPENAI_LOG']", this) ?? c, this.fetchOptions = u.fetchOptions, this.maxRetries = u.maxRetries ?? 2, this.fetch = u.fetch ?? gp(), O(this, fi, IA, "f"), this._options = u, s && (this._workloadIdentityAuth = new HA(s, this.fetch)), this.apiKey = typeof t == "string" ? t : "Missing Key", this.organization = n, this.project = o, this.webhookSecret = i;
  }
  withOptions(e) {
    return new this.constructor({
      ...this._options,
      baseURL: this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      apiKey: this.apiKey,
      workloadIdentity: this._options.workloadIdentity,
      organization: this.organization,
      project: this.project,
      webhookSecret: this.webhookSecret,
      ...e
    });
  }
  defaultQuery() {
    return this._options.defaultQuery;
  }
  validateHeaders({ values: e, nulls: t }) {
  }
  async authHeaders(e) {
    return $([{ Authorization: `Bearer ${this.apiKey}` }]);
  }
  stringifyQuery(e) {
    return NA(e);
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${Xt}`;
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${op()}`;
  }
  makeStatusError(e, t, n, o) {
    return me.generate(e, t, n, o);
  }
  async _callApiKey() {
    const e = this._options.apiKey;
    if (typeof e != "function") return !1;
    let t;
    try {
      t = await e();
    } catch (n) {
      throw n instanceof B ? n : new B(`Failed to get token from 'apiKey' function: ${n.message}`, { cause: n });
    }
    if (typeof t != "string" || !t) throw new B(`Expected 'apiKey' function argument to return a string but it returned ${t}`);
    return this.apiKey = t, !0;
  }
  buildURL(e, t, n) {
    const o = !E(this, Tr, "m", Uh).call(this) && n || this.baseURL, i = yA(e) ? new URL(e) : new URL(o + (o.endsWith("/") && e.startsWith("/") ? e.slice(1) : e)), s = this.defaultQuery(), a = Object.fromEntries(i.searchParams);
    return (!ac(s) || !ac(a)) && (t = {
      ...a,
      ...s,
      ...t
    }), typeof t == "object" && t && !Array.isArray(t) && (i.search = this.stringifyQuery(t)), i.toString();
  }
  async prepareOptions(e) {
    await this._callApiKey();
  }
  async prepareRequest(e, { url: t, options: n }) {
  }
  get(e, t) {
    return this.methodRequest("get", e, t);
  }
  post(e, t) {
    return this.methodRequest("post", e, t);
  }
  patch(e, t) {
    return this.methodRequest("patch", e, t);
  }
  put(e, t) {
    return this.methodRequest("put", e, t);
  }
  delete(e, t) {
    return this.methodRequest("delete", e, t);
  }
  methodRequest(e, t, n) {
    return this.request(Promise.resolve(n).then((o) => ({
      method: e,
      path: t,
      ...o
    })));
  }
  request(e, t = null) {
    return new bp(this, this.makeRequest(e, t, void 0));
  }
  async makeRequest(e, t, n) {
    const o = await e, i = o.maxRetries ?? this.maxRetries;
    t == null && (t = i), await this.prepareOptions(o);
    const { req: s, url: a, timeout: u } = await this.buildRequest(o, { retryCount: i - t });
    await this.prepareRequest(s, {
      url: a,
      options: o
    });
    const c = "log_" + (Math.random() * (1 << 24) | 0).toString(16).padStart(6, "0"), d = n === void 0 ? "" : `, retryOf: ${n}`, p = Date.now();
    if (fe(this).debug(`[${c}] sending request`, Rt({
      retryOfRequestLogID: n,
      method: o.method,
      url: a,
      options: o,
      headers: s.headers
    })), o.signal?.aborted) throw new Ge();
    const f = new AbortController(), h = await this.fetchWithAuth(a, s, u, f).catch(sr), m = Date.now();
    if (h instanceof globalThis.Error) {
      const y = `retrying, ${t} attempts remaining`;
      if (o.signal?.aborted) throw new Ge();
      const v = ir(h) || /timed? ?out/i.test(String(h) + ("cause" in h ? String(h.cause) : ""));
      if (t)
        return fe(this).info(`[${c}] connection ${v ? "timed out" : "failed"} - ${y}`), fe(this).debug(`[${c}] connection ${v ? "timed out" : "failed"} (${y})`, Rt({
          retryOfRequestLogID: n,
          url: a,
          durationMs: m - p,
          message: h.message
        })), this.retryRequest(o, t, n ?? c);
      throw fe(this).info(`[${c}] connection ${v ? "timed out" : "failed"} - error; no more retries left`), fe(this).debug(`[${c}] connection ${v ? "timed out" : "failed"} (error; no more retries left)`, Rt({
        retryOfRequestLogID: n,
        url: a,
        durationMs: m - p,
        message: h.message
      })), h instanceof hp || h instanceof mA ? h : v ? new Wr() : new Fi({ cause: h });
    }
    const g = `[${c}${d}${[...h.headers.entries()].filter(([y]) => y === "x-request-id").map(([y, v]) => ", " + y + ": " + JSON.stringify(v)).join("")}] ${s.method} ${a} ${h.ok ? "succeeded" : "failed"} with status ${h.status} in ${m - p}ms`;
    if (!h.ok) {
      if (h.status === 401 && this._workloadIdentityAuth && !o.__metadata?.hasStreamingBody && !o.__metadata?.workloadIdentityTokenRefreshed)
        return await dc(h.body), this._workloadIdentityAuth.invalidateToken(), this.makeRequest({
          ...o,
          __metadata: {
            ...o.__metadata,
            workloadIdentityTokenRefreshed: !0
          }
        }, t, n ?? c);
      const y = await this.shouldRetry(h);
      if (t && y) {
        const M = `retrying, ${t} attempts remaining`;
        return await dc(h.body), fe(this).info(`${g} - ${M}`), fe(this).debug(`[${c}] response error (${M})`, Rt({
          retryOfRequestLogID: n,
          url: h.url,
          status: h.status,
          headers: h.headers,
          durationMs: m - p
        })), this.retryRequest(o, t, n ?? c, h.headers);
      }
      const v = y ? "error; no more retries left" : "error; not retryable";
      fe(this).info(`${g} - ${v}`);
      const A = await h.text().catch((M) => sr(M).message), C = TA(A), R = C ? void 0 : A;
      throw fe(this).debug(`[${c}] response error (${v})`, Rt({
        retryOfRequestLogID: n,
        url: h.url,
        status: h.status,
        headers: h.headers,
        message: R,
        durationMs: Date.now() - p
      })), this.makeStatusError(h.status, C, R, h.headers);
    }
    return fe(this).info(g), fe(this).debug(`[${c}] response start`, Rt({
      retryOfRequestLogID: n,
      url: h.url,
      status: h.status,
      headers: h.headers,
      durationMs: m - p
    })), {
      response: h,
      options: o,
      controller: f,
      requestLogID: c,
      retryOfRequestLogID: n,
      startTime: p
    };
  }
  getAPIList(e, t, n) {
    return this.requestAPIList(t, n && "then" in n ? n.then((o) => ({
      method: "get",
      path: e,
      ...o
    })) : {
      method: "get",
      path: e,
      ...n
    });
  }
  requestAPIList(e, t) {
    const n = this.makeRequest(t, null, void 0);
    return new OA(this, n, e);
  }
  async fetchWithAuth(e, t, n, o) {
    if (this._workloadIdentityAuth) {
      const i = t.headers, s = i.get("Authorization");
      if (!s || s === `Bearer ${Is}`) {
        const a = await this._workloadIdentityAuth.getToken();
        i.set("Authorization", `Bearer ${a}`);
      }
    }
    return await this.fetchWithTimeout(e, t, n, o);
  }
  async fetchWithTimeout(e, t, n, o) {
    const { signal: i, method: s, ...a } = t || {}, u = this._makeAbort(o);
    i && i.addEventListener("abort", u, { once: !0 });
    const c = setTimeout(u, n), d = globalThis.ReadableStream && a.body instanceof globalThis.ReadableStream || typeof a.body == "object" && a.body !== null && Symbol.asyncIterator in a.body, p = {
      signal: o.signal,
      ...d ? { duplex: "half" } : {},
      method: "GET",
      ...a
    };
    s && (p.method = s.toUpperCase());
    try {
      return await this.fetch.call(void 0, e, p);
    } finally {
      clearTimeout(c);
    }
  }
  async shouldRetry(e) {
    const t = e.headers.get("x-should-retry");
    return t === "true" ? !0 : t === "false" ? !1 : e.status === 408 || e.status === 409 || e.status === 429 || e.status >= 500;
  }
  async retryRequest(e, t, n, o) {
    let i;
    const s = o?.get("retry-after-ms");
    if (s) {
      const u = parseFloat(s);
      Number.isNaN(u) || (i = u);
    }
    const a = o?.get("retry-after");
    if (a && !i) {
      const u = parseFloat(a);
      Number.isNaN(u) ? i = Date.parse(a) - Date.now() : i = u * 1e3;
    }
    if (i === void 0) {
      const u = e.maxRetries ?? this.maxRetries;
      i = this.calculateDefaultRetryTimeoutMillis(t, u);
    }
    return await Eo(i), this.makeRequest(e, t - 1, n);
  }
  calculateDefaultRetryTimeoutMillis(e, t) {
    const i = t - e;
    return Math.min(0.5 * Math.pow(2, i), 8) * (1 - Math.random() * 0.25) * 1e3;
  }
  async buildRequest(e, { retryCount: t = 0 } = {}) {
    const n = { ...e }, { method: o, path: i, query: s, defaultBaseURL: a } = n, u = this.buildURL(i, s, a);
    "timeout" in n && vA("timeout", n.timeout), n.timeout = n.timeout ?? this.timeout;
    const { bodyHeaders: c, body: d, isStreamingBody: p } = this.buildBody({ options: n });
    return p && (e.__metadata = {
      ...e.__metadata,
      hasStreamingBody: !0
    }), {
      req: {
        method: o,
        headers: await this.buildHeaders({
          options: e,
          method: o,
          bodyHeaders: c,
          retryCount: t
        }),
        ...n.signal && { signal: n.signal },
        ...globalThis.ReadableStream && d instanceof globalThis.ReadableStream && { duplex: "half" },
        ...d && { body: d },
        ...this.fetchOptions ?? {},
        ...n.fetchOptions ?? {}
      },
      url: u,
      timeout: n.timeout
    };
  }
  async buildHeaders({ options: e, method: t, bodyHeaders: n, retryCount: o }) {
    let i = {};
    this.idempotencyHeader && t !== "get" && (e.idempotencyKey || (e.idempotencyKey = this.defaultIdempotencyKey()), i[this.idempotencyHeader] = e.idempotencyKey);
    const s = $([
      i,
      {
        Accept: "application/json",
        "User-Agent": this.getUserAgent(),
        "X-Stainless-Retry-Count": String(o),
        ...e.timeout ? { "X-Stainless-Timeout": String(Math.trunc(e.timeout / 1e3)) } : {},
        ...CA(),
        "OpenAI-Organization": this.organization,
        "OpenAI-Project": this.project
      },
      await this.authHeaders(e),
      this._options.defaultHeaders,
      n,
      e.headers
    ]);
    return this.validateHeaders(s), s.values;
  }
  _makeAbort(e) {
    return () => e.abort();
  }
  buildBody({ options: { body: e, headers: t } }) {
    if (!e) return {
      bodyHeaders: void 0,
      body: void 0,
      isStreamingBody: !1
    };
    const n = $([t]), o = typeof globalThis.ReadableStream < "u" && e instanceof globalThis.ReadableStream, i = !o && (typeof e == "string" || e instanceof ArrayBuffer || ArrayBuffer.isView(e) || typeof globalThis.Blob < "u" && e instanceof globalThis.Blob || e instanceof URLSearchParams || e instanceof FormData);
    return ArrayBuffer.isView(e) || e instanceof ArrayBuffer || e instanceof DataView || typeof e == "string" && n.values.has("content-type") || globalThis.Blob && e instanceof globalThis.Blob || e instanceof FormData || e instanceof URLSearchParams || o ? {
      bodyHeaders: void 0,
      body: e,
      isStreamingBody: !i
    } : typeof e == "object" && (Symbol.asyncIterator in e || Symbol.iterator in e && "next" in e && typeof e.next == "function") ? {
      bodyHeaders: void 0,
      body: _p(e),
      isStreamingBody: !0
    } : typeof e == "object" && n.values.get("content-type") === "application/x-www-form-urlencoded" ? {
      bodyHeaders: { "content-type": "application/x-www-form-urlencoded" },
      body: this.stringifyQuery(e),
      isStreamingBody: !1
    } : {
      ...E(this, fi, "f").call(this, {
        body: e,
        headers: n
      }),
      isStreamingBody: !1
    };
  }
};
pa = W, fi = /* @__PURE__ */ new WeakMap(), Tr = /* @__PURE__ */ new WeakSet(), Uh = function() {
  return this.baseURL !== "https://api.openai.com/v1";
};
W.OpenAI = pa;
W.DEFAULT_TIMEOUT = 6e5;
W.OpenAIError = B;
W.APIError = me;
W.APIConnectionError = Fi;
W.APIConnectionTimeoutError = Wr;
W.APIUserAbortError = Ge;
W.NotFoundError = ap;
W.ConflictError = lp;
W.RateLimitError = cp;
W.BadRequestError = ip;
W.AuthenticationError = sp;
W.InternalServerError = dp;
W.PermissionDeniedError = rp;
W.UnprocessableEntityError = up;
W.InvalidWebhookSignatureError = Vn;
W.toFile = zA;
W.Completions = ah;
W.Chat = ea;
W.Embeddings = ch;
W.Files = fh;
W.Images = _h;
W.Audio = Ao;
W.Moderations = Th;
W.Models = vh;
W.FineTuning = gn;
W.Graders = ca;
W.VectorStores = Yi;
W.Webhooks = Dh;
W.Beta = mn;
W.Batches = jp;
W.Uploads = fa;
W.Responses = Wi;
W.Realtime = Ji;
W.Conversations = ia;
W.Evals = ra;
W.Containers = oa;
W.Skills = Ki;
W.Videos = Nh;
function Lh(e = "") {
  let t = String(e ?? "").trim();
  return t.endsWith(",") && (t = t.slice(0, -1).trimEnd()), t.startsWith('\\"') && (t = t.slice(2)), t.endsWith('\\"') && (t = t.slice(0, -2)), t.startsWith('"') && (t = t.slice(1)), t.endsWith('"') && (t = t.slice(0, -1)), t.replace(/\r\n/g, `
`).replace(/\\r/g, "\r").replace(/\\n/g, `
`).replace(/\\t/g, "	").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
}
function PC(e = "") {
  return String(e || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function ha(e = "", t = "", n = 0) {
  const o = new RegExp(`(?<![A-Za-z0-9_])(?:\\\\?")?${PC(t)}(?:\\\\?")?\\s*:`, "i"), i = String(e || "").slice(Math.max(0, n)).match(o);
  if (!i || i.index === void 0) return null;
  const s = Math.max(0, n) + i.index;
  return {
    key: t,
    index: s,
    end: s + i[0].length
  };
}
function xC(e = "", t = [], n = 0) {
  return t.map((o) => ha(e, o, n)).filter(Boolean).sort((o, i) => o.index - i.index)[0] || null;
}
function Lt(e = "", t = "", n = []) {
  const o = String(e || ""), i = ha(o, t);
  if (!i) return;
  let s = i.end;
  for (; /\s/.test(o[s] || ""); ) s += 1;
  o[s] === '"' && (s += 1);
  const a = xC(o, n.filter((d) => d !== t), s);
  let u = a ? a.index : o.length;
  if (a) {
    const d = o.lastIndexOf(",", a.index);
    d >= s && (u = d);
  }
  let c = o.slice(s, u).trim();
  return a || (c = c.replace(/\}\s*$/, "").trimEnd()), Lh(c);
}
function jn(e = "") {
  const t = String(e ?? "").trim();
  return /^-?\d+(?:\.\d+)?$/.test(t) ? Number(t) : /^true$/i.test(t) ? !0 : /^false$/i.test(t) ? !1 : /^null$/i.test(t) ? null : Lh(t);
}
var MC = {
  Read: [
    "filePath",
    "path",
    "scope",
    "fromLine",
    "toLine",
    "tail",
    "outputMode",
    "contentFormat"
  ],
  Write: [
    "filePath",
    "path",
    "content"
  ],
  Edit: [
    "filePath",
    "path",
    "edits"
  ],
  Delete: ["filePath", "path"],
  Move: [
    "fromPath",
    "toPath",
    "filePath",
    "path"
  ],
  RenameBook: ["title", "name"],
  ImportMaterial: [
    "title",
    "content",
    "source"
  ],
  Glob: [
    "pattern",
    "path",
    "scope"
  ],
  Grep: [
    "pattern",
    "path",
    "scope",
    "outputMode"
  ],
  WebSearch: ["query", "maxResults"],
  DelegateRun: ["task"],
  PlanCreate: [
    "title",
    "details",
    "priority",
    "owner",
    "blockedBy"
  ],
  PlanUpdate: [
    "id",
    "status",
    "details",
    "priority",
    "owner",
    "blockedBy"
  ],
  PlanList: ["status"],
  apply_patch: ["patchText"]
}, NC = [
  "filePath",
  "path",
  "fromPath",
  "toPath",
  "content",
  "edits",
  "patchText",
  "query",
  "task",
  "title",
  "details",
  "pattern",
  "scope",
  "status",
  "priority",
  "owner",
  "blockedBy",
  "fromLine",
  "toLine",
  "tail",
  "maxResults",
  "outputMode",
  "contentFormat"
];
function $c(e = "", t = [], n = []) {
  for (const o of t) {
    const i = Lt(e, o, n);
    if (i !== void 0) return i;
  }
}
function kC(e = "", t = "") {
  if (t === "Write") {
    const n = {}, o = $c(e, ["filePath", "path"], ["content"]), i = Lt(e, "content", []);
    return o !== void 0 && (n.filePath = jn(o)), i !== void 0 && (n.content = jn(i)), Object.keys(n).length ? n : null;
  }
  if (t === "Edit") {
    const n = {}, o = $c(e, ["filePath", "path"], ["edits"]), i = Lt(e, "edits", []);
    return o !== void 0 && (n.filePath = jn(o)), i !== void 0 && (n.edits = jn(i)), Object.keys(n).length ? n : null;
  }
  return null;
}
function DC(e = "", t = "") {
  const n = String(e || "").trim();
  if (!n) return null;
  try {
    const a = JSON.parse(n);
    if (a && typeof a == "object" && !Array.isArray(a)) return a;
  } catch {
  }
  const o = kC(n, t);
  if (o) return o;
  const i = MC[t] || NC, s = {};
  return i.forEach((a, u) => {
    const c = Lt(n, a, i.slice(u + 1));
    c !== void 0 && (s[a] = jn(c));
  }), Object.keys(s).length ? s : null;
}
function UC(e = "", t = "") {
  const n = DC(e, t);
  return n ? JSON.stringify(n) : "";
}
function $h(e) {
  try {
    return JSON.parse(e || "{}");
  } catch {
    return {};
  }
}
function Je(e, t, n) {
  const o = String(n || "").trim();
  o && e.push({
    label: t,
    text: o
  });
}
function Ce(e) {
  if (e !== void 0)
    try {
      return JSON.parse(JSON.stringify(e));
    } catch {
      return;
    }
}
function ge(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function Fh(e) {
  if (typeof e == "string") return e;
  if (e == null) return "{}";
  try {
    return JSON.stringify(e);
  } catch {
    return "{}";
  }
}
function Bh(e, t = "") {
  if (e && typeof e == "object" && !Array.isArray(e)) return JSON.stringify(e);
  const n = typeof e == "string" ? e : Fh(e);
  return UC(n, t) || JSON.stringify($h(n));
}
function LC(e = "") {
  const t = String(e || ""), n = ha(t, "arguments");
  if (!n) return "";
  let o = n.end;
  for (; /\s/.test(t[o] || ""); ) o += 1;
  const i = t[o] || "";
  return i === "{" ? t.slice(o).replace(/\}\s*$/, "").trimEnd() : i === '"' ? t.slice(o + 1).replace(/"\s*\}\s*$/, "").trimEnd() : t.slice(o).replace(/\}\s*$/, "").trimEnd();
}
function $C(e = "", t = 0) {
  const n = String(e || "").trim(), o = Lt(n, "name", ["id", "arguments"]) || Lt(n, "toolName", ["id", "arguments"]) || "", i = Lt(n, "id", [
    "name",
    "toolName",
    "arguments"
  ]) || `tool-call-${t + 1}`, s = LC(n);
  return !o || !s ? null : {
    id: i,
    name: o,
    arguments: Bh(s, o)
  };
}
function FC(e, t = 0, n = "openai-tool") {
  if (!ge(e)) return null;
  const o = ge(e.function) ? e.function : null, i = String(o?.name || "").trim();
  if (!i) return null;
  const s = Ce(e) || {};
  return delete s.index, s.id = String(s.id || `${n}-${t + 1}`), s.type = "function", s.function = {
    ...Ce(o) || {},
    name: i,
    arguments: Fh(o.arguments)
  }, s;
}
function $t(e = [], t = "openai-tool") {
  return (Array.isArray(e) ? e : []).map((n, o) => FC(n, o, t)).filter(Boolean);
}
function ma(e) {
  if (!ge(e)) return null;
  const t = Ce(e) || {};
  if (typeof t.content == "string" && /<tool_call\b/i.test(t.content) && (t.content = Nt(Mt(t.content).cleaned)), Array.isArray(t.tool_calls)) {
    const n = $t(t.tool_calls);
    n.length ? t.tool_calls = n : delete t.tool_calls;
  }
  return t;
}
function ro(e = [], t = "openai-tool") {
  return $t(e, t).map((n, o) => ({
    id: n.id || `${t}-${Date.now()}-${o + 1}`,
    name: n.function.name,
    arguments: n.function.arguments
  }));
}
function Gh(e) {
  return typeof e == "string" ? e : Array.isArray(e) ? e.map((t) => t ? typeof t == "string" ? t : t.text || t.content || "" : "").filter(Boolean).join(`
`) : "";
}
function Mt(e = "") {
  const t = [];
  return {
    cleaned: String(e || "").replace(/<think>([\s\S]*?)<\/think>/gi, (n, o) => (Je(t, "思考块", o), "")).trim(),
    thoughts: t
  };
}
function Nt(e = "") {
  const t = String(e || ""), n = t.search(/<tool_call\b/i);
  return n < 0 ? t.trim() : t.slice(0, n).trim();
}
function Pt(e, t, n) {
  if (t) {
    if (typeof t == "string") {
      Je(e, n, t);
      return;
    }
    if (Array.isArray(t)) {
      t.forEach((o) => Pt(e, o, n));
      return;
    }
    typeof t == "object" && (typeof t.text == "string" && Je(e, n, t.text), typeof t.content == "string" && Je(e, n, t.content), typeof t.reasoning_content == "string" && Je(e, n, t.reasoning_content), typeof t.thinking == "string" && Je(e, n, t.thinking), Array.isArray(t.summary) && t.summary.forEach((o) => {
      if (typeof o == "string") {
        Je(e, "推理摘要", o);
        return;
      }
      o && typeof o == "object" && Je(e, "推理摘要", o.text || o.content || "");
    }));
  }
}
function vt(e = {}, t = {}) {
  const n = [];
  return Pt(n, e.reasoning_content, "推理文本"), Pt(n, e.reasoning, "推理文本"), Pt(n, e.reasoning_text, "推理文本"), Pt(n, e.thinking, "思考块"), Pt(n, t.reasoning_content, "推理文本"), Pt(n, t.reasoning, "推理文本"), Array.isArray(e.content) && e.content.forEach((o) => {
    if (!(!o || typeof o != "object")) {
      if (o.type === "reasoning_text") {
        Je(n, "推理文本", o.text);
        return;
      }
      if (o.type === "summary_text") {
        Je(n, "推理摘要", o.text);
        return;
      }
      (o.type === "thinking" || o.type === "reasoning" || o.type === "reasoning_content") && Je(n, "思考块", o.text || o.content || o.reasoning || "");
    }
  }), n;
}
function ao(e = "") {
  const t = [/<tool_call>\s*([\s\S]*?)\s*<\/tool_call>/g], n = [];
  return t.forEach((o) => {
    [...e.matchAll(o)].forEach((i, s) => {
      try {
        const a = JSON.parse(i[1]);
        n.push({
          id: a.id || `tool-call-${s + 1}`,
          name: String(a.name || ""),
          arguments: Bh(a.arguments, a.name)
        });
      } catch {
        const a = $C(i[1], s);
        a && n.push(a);
      }
    });
  }), n.filter((o) => o.name);
}
function zi(e) {
  const t = e?.providerPayload?.openaiCompatibleMessage;
  return !t || typeof t != "object" || Array.isArray(t) ? null : ma(t);
}
function BC(e = []) {
  for (let t = e.length - 1; t >= 0; t -= 1) if (e[t]?.role === "user") return t;
  return -1;
}
function GC(e) {
  if ($t(e?.tool_calls).length > 0) return !0;
  const t = zi(e);
  return Array.isArray(t?.tool_calls) && t.tool_calls.length > 0;
}
function OC(e = {}) {
  const t = $t(e?.tool_calls);
  if (t.length) return t;
  const n = $t(zi(e)?.tool_calls);
  return n.length ? n : [];
}
function qC(e = {}) {
  return $t(e?.tool_calls).length > 0;
}
function VC(e, t, n) {
  return e?.role !== "assistant" || t <= n ? !1 : GC(e);
}
function HC(e = "") {
  return /deepseek/i.test(String(e || ""));
}
function Fc(e, t = "") {
  return !ge(e) || !HC(t) || !Array.isArray(e.tool_calls) || !e.tool_calls.length || Object.prototype.hasOwnProperty.call(e, "reasoning_content") ? e : {
    ...e,
    reasoning_content: ""
  };
}
var Bc = /* @__PURE__ */ new Set([
  "content",
  "refusal",
  "arguments",
  "reasoning_content",
  "reasoning_text",
  "thinking",
  "text"
]);
function JC(e = [], t = []) {
  const n = Array.isArray(e) ? e.map((o) => Ce(o) || {}) : [];
  return (Array.isArray(t) ? t : []).forEach((o, i) => {
    const s = Ce(o) || {}, a = Number.isInteger(Number(o?.index)) ? Number(o.index) : i, u = n[a];
    n[a] = ge(u) ? Ft(u, s, "tool_call") : s;
  }), n.filter((o) => o !== void 0);
}
function Ft(e, t, n = "") {
  if (t === void 0) return e;
  if (e === void 0) return Ce(t);
  if (t === null && Bc.has(String(n || ""))) return e;
  if (n === "tool_calls" && Array.isArray(e) && Array.isArray(t)) return JC(e, t);
  if (typeof e == "string" && typeof t == "string")
    return Bc.has(String(n || "")) ? e === t ? e : t.startsWith(e) ? t : e.startsWith(t) ? e : `${e}${t}` : e === t ? e : Ce(t);
  if (Array.isArray(e) && Array.isArray(t)) return e.concat(Ce(t) || []);
  if (ge(e) && ge(t)) {
    const o = { ...e };
    return Object.entries(t).forEach(([i, s]) => {
      o[i] = Ft(o[i], s, i);
    }), o;
  }
  return Ce(t);
}
function Ri(e = {}, t = {}) {
  const n = ge(e) ? Ce(e) || {} : {}, o = ge(t) ? Ce(t) || {} : {};
  return delete o.message, delete o.finish_reason, delete o.index, delete o.logprobs, delete o.delta, Object.entries(o).forEach(([i, s]) => {
    n[i] = Ft(n[i], s, i);
  }), n.role || (n.role = "assistant"), ma(n) || { role: "assistant" };
}
function lo(e, t = {}) {
  const n = ma(Ri(e, t));
  if (!(!n || typeof n != "object" || Array.isArray(n)))
    return { openaiCompatibleMessage: n };
}
function WC(e = {}, t = {}) {
  return ge(e) ? ge(t) ? Ft(Ce(e) || {}, t, "") : Ce(e) : Ce(t);
}
function Sr(e, t = "") {
  const n = Array.isArray(e.messages) ? e.messages : [], o = BC(n);
  return n.map((i, s) => {
    const a = $t(i?.tool_calls);
    if (VC(i, s, o)) {
      const c = zi(i);
      if (qC(c)) return Fc({
        ...c,
        ...a.length ? { tool_calls: a } : {}
      }, t);
    }
    const u = {
      role: i.role,
      content: i.content
    };
    return i.role === "tool" && i.tool_call_id && (u.tool_call_id = i.tool_call_id), i.role === "assistant" && a.length && (u.tool_calls = a), Fc(u, t);
  });
}
function Gc(e) {
  const t = (e.tools || []).map((n) => [`- ${n.function.name}: ${n.function.description || ""}`.trim(), `  参数 JSON Schema: ${JSON.stringify(n.function.parameters || {})}`].join(`
`)).join(`
`);
  return [
    e.systemPrompt || "",
    "如果你需要调用工具，不要使用原生 tool calling 字段。",
    "用 <tool_call> 和 </tool_call> 明确 JSON 范围，请严格输出如下边界标记和包裹的 JSON，不要改写边界标记：",
    '<tool_call>{"name":"工具名","arguments":{...}}</tool_call>',
    "如果需要多个工具调用，可以连续输出多段 <tool_call> ... </tool_call>。",
    "在输出第一个 <tool_call> 之前，可根据任务复杂度决定是否需要先说明：简单查询可直接输出 <tool_call>；复杂任务可先简要说明你准备查什么或怎么查。",
    "一旦开始输出第一个 <tool_call>，就不要再继续输出面向用户的正文、解释、总结或补充；把本轮需要的 tool_call 连续输出完就结束。",
    t ? `可用工具:
${t}` : ""
  ].filter(Boolean).join(`

`);
}
function Er(e) {
  const t = /* @__PURE__ */ new Map(), n = [];
  return (Array.isArray(e.messages) ? e.messages : []).forEach((o) => {
    if (o.role === "assistant") {
      const i = OC(o);
      if (i.length) {
        const s = zi(o), a = typeof s?.content == "string" ? s.content : String(o.content || ""), u = i.map((c, d) => {
          const p = c.function?.name || "", f = c.id || `tool-call-${d + 1}`;
          return p && t.set(f, p), `<tool_call>${JSON.stringify({
            id: f,
            name: p,
            arguments: $h(c.function?.arguments || "{}")
          })}</tool_call>`;
        }).join(`
`);
        n.push({
          role: "assistant",
          content: [a, u].filter(Boolean).join(`

`)
        });
        return;
      }
    }
    if (o.role === "tool") {
      const i = String(o.toolName || o.tool_name || "").trim() || t.get(o.tool_call_id || "") || "unknown_tool";
      o.tool_call_id && t.delete(o.tool_call_id);
      const s = String(o.content || "");
      n.push({
        role: "user",
        content: [
          "<tool_result>",
          "这是系统工具执行结果，不是用户新发言。",
          `name: ${i}`,
          "content:",
          s,
          "</tool_result>"
        ].join(`
`)
      });
      return;
    }
    n.push({
      role: o.role,
      content: o.content
    });
  }), !n.length || n[0].role !== "system" ? n.unshift({
    role: "system",
    content: Gc(e)
  }) : n[0] = {
    ...n[0],
    content: Gc({
      ...e,
      systemPrompt: n[0].content || e.systemPrompt
    })
  }, n;
}
function Oc(e, t) {
  typeof e.onStreamProgress == "function" && e.onStreamProgress({
    ...typeof t.text == "string" ? { text: t.text } : {},
    ...Array.isArray(t.thoughts) ? { thoughts: t.thoughts } : {}
  });
}
function qc(e, t, n) {
  !e || !t || n === void 0 || (e[t] = Ft(e[t], n, t));
}
function KC(e, t = []) {
  !Array.isArray(t) || !t.length || (Array.isArray(e.tool_calls) || (e.tool_calls = []), t.forEach((n) => {
    const o = Number(n?.index ?? 0), i = { ...e.tool_calls[o] || {} };
    Object.entries(n || {}).forEach(([s, a]) => {
      if (s !== "index" && !(s === "function" && a == null)) {
        if (s === "function" && ge(a)) {
          i.function = ge(i.function) ? { ...i.function } : {}, Object.entries(a).forEach(([u, c]) => {
            i.function[u] = Ft(i.function[u], c, u);
          });
          return;
        }
        i[s] = Ft(i[s], a, s);
      }
    }), e.tool_calls[o] = i;
  }));
}
function wr(e, t = {}) {
  if (!e || !t || typeof t != "object") return;
  Object.entries(t).forEach(([o, i]) => {
    o === "delta" || o === "finish_reason" || o === "index" || o === "logprobs" || qc(e, o, i);
  });
  const n = ge(t.delta) ? t.delta : {};
  Object.entries(n).forEach(([o, i]) => {
    if (o === "tool_calls") {
      KC(e, i);
      return;
    }
    qc(e, o, i);
  });
}
function Ar(e, t = {}) {
  if (!e || !ge(t)) return;
  const n = Number(t.index ?? 0), o = e.toolCalls[n] || {
    id: "",
    type: "function",
    function: {
      name: "",
      arguments: ""
    }
  }, i = ge(t.function) ? t.function : {};
  e.toolCalls[n] = {
    ...o,
    id: t.id || o.id,
    type: t.type || o.type,
    function: {
      name: i.name || o.function?.name || "",
      arguments: `${o.function?.arguments || ""}${i.arguments || ""}`
    }
  };
}
async function YC(e, t) {
  const n = e.body?.getReader?.();
  if (!n) throw new Error("openai_compatible_stream_missing_body");
  const o = new TextDecoder();
  let i = "";
  const s = /\r?\n\r?\n/;
  for (; ; ) {
    const { done: u, value: c } = await n.read();
    if (u) break;
    for (i += o.decode(c, { stream: !0 }); ; ) {
      const d = i.match(s);
      if (!d || typeof d.index != "number") break;
      const p = d.index, f = i.slice(0, p);
      i = i.slice(p + d[0].length);
      const h = f.split(/\r?\n/).filter((m) => m.startsWith("data:")).map((m) => m.slice(5).trimStart()).join(`
`).trim();
      !h || h === "[DONE]" || t(JSON.parse(h));
    }
  }
  const a = i.trim();
  if (a && a !== "[DONE]") {
    const u = a.split(/\r?\n/).filter((c) => c.startsWith("data:")).map((c) => c.slice(5).trimStart()).join(`
`).trim();
    u && u !== "[DONE]" && t(JSON.parse(u));
  }
}
var zC = class {
  constructor(e) {
    this.config = e, this.client = new W({
      apiKey: e.apiKey,
      baseURL: String(e.baseUrl || "https://api.openai.com/v1").replace(/\/$/, ""),
      timeout: Number(e.timeoutMs) || 900 * 1e3,
      maxRetries: 0,
      dangerouslyAllowBrowser: !0
    });
  }
  async streamNativeChatCompletions(e, t) {
    const n = `${String(this.config.baseUrl || "https://api.openai.com/v1").replace(/\/$/, "")}/chat/completions`, o = await fetch(n, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        ...t,
        stream: !0
      }),
      signal: e.signal
    });
    if (!o.ok) {
      const g = await o.text().catch(() => "");
      throw new Error(g || `openai_compatible_stream_http_${o.status}`);
    }
    const i = {
      content: "",
      toolCalls: []
    }, s = { role: "assistant" };
    let a = "stop", u = this.config.model;
    await YC(o, (g) => {
      u = g?.model || u;
      const y = g?.choices?.[0], v = y?.delta || {};
      wr(s, y), y?.finish_reason && (a = y.finish_reason), typeof v.content == "string" && (i.content += v.content), Array.isArray(v.tool_calls) && v.tool_calls.forEach((C) => {
        Ar(i, C);
      });
      const A = Mt(i.content);
      Oc(e, {
        text: i.toolCalls.filter((C) => C?.function?.name).length ? A.cleaned : Nt(A.cleaned),
        thoughts: vt(s, y).concat(A.thoughts)
      });
    });
    const c = lo(s), d = ro(i.toolCalls), p = Mt(i.content), f = vt(s, {});
    p.thoughts.forEach((g) => f.push(g));
    const h = d.length ? [] : ao(p.cleaned), m = [...d, ...h];
    return {
      text: d.length ? p.cleaned : Nt(p.cleaned),
      toolCalls: m,
      thoughts: f,
      finishReason: a,
      model: u,
      provider: "openai-compatible",
      providerPayload: c
    };
  }
  async chat(e) {
    const t = (this.config.toolMode || "native") === "tagged-json" && Array.isArray(e.tools) && e.tools.length > 0, n = typeof e.onStreamProgress == "function", o = !t && Array.isArray(e.tools) && e.tools.length ? e.tools : null, i = {
      model: this.config.model,
      messages: t ? Er(e) : Sr(e, this.config.model),
      ...o ? {
        tools: o,
        tool_choice: e.toolChoice || "auto"
      } : {},
      ...e.maxTokens ? { max_tokens: e.maxTokens } : {}
    };
    if (!e.reasoning?.enabled && typeof e.temperature == "number" && (i.temperature = e.temperature), e.reasoning?.enabled && (i.reasoning_effort = e.reasoning.effort), n) {
      if (!t) return await this.streamNativeChatCompletions(e, i);
      const y = await this.client.chat.completions.create({
        ...i,
        stream: !0
      }, { signal: e.signal }), v = {
        content: "",
        toolCalls: []
      }, A = { role: "assistant" };
      let C = "stop", R = this.config.model, M;
      for await (const j of y) {
        R = j.model || R;
        const ee = j.choices?.[0], Q = ee?.delta || {};
        wr(A, ee), ee?.finish_reason && (C = ee.finish_reason), typeof Q.content == "string" && (v.content += Q.content), Array.isArray(Q.tool_calls) && Q.tool_calls.forEach((he) => {
          Ar(v, he);
        });
        const X = Mt(v.content);
        Oc(e, {
          text: v.toolCalls.filter((he) => he?.function?.name).length ? X.cleaned : Nt(X.cleaned),
          thoughts: vt(A, ee).concat(X.thoughts)
        });
      }
      const x = (typeof y.finalChatCompletion == "function" ? await y.finalChatCompletion() : null)?.choices?.[0] || null, w = WC(A, Ri(x?.message || A, x || {}));
      M = lo(w);
      const L = ro(v.toolCalls), P = Mt(v.content), N = vt(w, x || {});
      P.thoughts.forEach((j) => N.push(j));
      const V = L.length ? [] : ao(P.cleaned), Y = [...L, ...V];
      return {
        text: L.length ? P.cleaned : Nt(P.cleaned),
        toolCalls: Y,
        thoughts: N,
        finishReason: C,
        model: R,
        provider: "openai-compatible",
        providerPayload: M
      };
    }
    const s = await this.client.chat.completions.create(i, { signal: e.signal }), a = s.choices?.[0] || {}, u = a.message || {}, c = vt(u, a), d = ro(u.tool_calls || []), p = Mt(Gh(u.content));
    p.thoughts.forEach((y) => c.push(y));
    const f = d.length ? [] : ao(p.cleaned), h = [...d, ...f], m = d.length ? p.cleaned : Nt(p.cleaned), g = Ri(u, a);
    return {
      text: m,
      toolCalls: h,
      thoughts: c,
      finishReason: a.finish_reason || "stop",
      model: s.model || this.config.model,
      provider: "openai-compatible",
      providerPayload: lo(g)
    };
  }
};
function Oh(e, t) {
  return {
    type: "message",
    role: e,
    content: XC(t)
  };
}
function Pi(e) {
  return {
    role: "assistant",
    content: typeof e == "string" ? e : ""
  };
}
function XC(e) {
  if (typeof e == "string") return [{
    type: "input_text",
    text: e
  }];
  if (!Array.isArray(e)) return [{
    type: "input_text",
    text: ""
  }];
  const t = e.map((n) => !n || typeof n != "object" ? null : n.type === "image_url" && n.image_url?.url ? {
    type: "input_image",
    image_url: n.image_url.url
  } : n.type === "text" ? {
    type: "input_text",
    text: n.text || ""
  } : null).filter(Boolean);
  return t.length ? t : [{
    type: "input_text",
    text: ""
  }];
}
function xi(e, t, n) {
  const o = String(n || "").trim();
  o && e.push({
    label: t,
    text: o
  });
}
function Vc(e, t = [], n = {}) {
  (t || []).forEach((o) => {
    if (!(!o || typeof o != "object")) {
      if (o.type === "reasoning_text") {
        xi(e, n.reasoning || "推理文本", o.text);
        return;
      }
      o.type === "summary_text" && xi(e, n.summary || "推理摘要", o.text);
    }
  });
}
function QC(e = []) {
  const t = [];
  return (e || []).forEach((n) => {
    !n || typeof n != "object" || n.type === "reasoning" && (Vc(t, n.content, {
      reasoning: "推理文本",
      summary: "推理摘要"
    }), Vc(t, n.summary, {
      reasoning: "推理文本",
      summary: "推理摘要"
    }));
  }), t;
}
function ZC(e) {
  const t = [String(e.systemPrompt || "").trim(), ...(e.messages || []).filter((n) => n.role === "system").map((n) => String(n.content || "").trim())].filter(Boolean);
  return t.length ? [...new Set(t)].join(`

`) : "";
}
function jC(e) {
  const t = e?.choices?.[0]?.message?.content;
  if (typeof t == "string" && t.trim()) return t.trim();
  if (typeof e?.output_text == "string" && e.output_text.trim()) return e.output_text.trim();
  const n = [];
  return (Array.isArray(e?.output) ? e.output : []).forEach((o) => {
    if (!(!o || typeof o != "object")) {
      if (o.type === "message" && Array.isArray(o.content)) {
        o.content.forEach((i) => {
          if (!(!i || typeof i != "object")) {
            if (i.type === "output_text" && typeof i.text == "string" && i.text.trim()) {
              n.push(i.text.trim());
              return;
            }
            i.type === "refusal" && typeof i.refusal == "string" && i.refusal.trim() && n.push(i.refusal.trim());
          }
        });
        return;
      }
      typeof o.text == "string" && o.text.trim() && n.push(o.text.trim());
    }
  }), n.join(`
`).trim();
}
function eI(e) {
  const t = e?.choices?.[0], n = t?.message?.content, o = String(t?.finish_reason || "");
  if (typeof n != "string" || !n.trim()) return null;
  const i = n.toLowerCase();
  return !i.includes("proxy error") || !i.includes("/responses") && !o.toLowerCase().includes("proxy error") ? null : n.trim();
}
function tI(e) {
  const t = [];
  for (const n of e.messages || [])
    if (n.role !== "system") {
      if (n.role === "tool") {
        t.push({
          type: "function_call_output",
          call_id: n.tool_call_id || "missing_tool_call_id",
          output: n.content
        });
        continue;
      }
      if (n.role === "assistant" && Array.isArray(n.tool_calls) && n.tool_calls.length) {
        n.content?.trim() && t.push(Pi(n.content)), n.tool_calls.forEach((o, i) => {
          t.push({
            type: "function_call",
            call_id: o.id || `function_call_${i + 1}`,
            name: o.function?.name || "",
            arguments: o.function?.arguments || "{}",
            status: "completed"
          });
        });
        continue;
      }
      if (n.role === "assistant") {
        t.push(Pi(n.content || ""));
        continue;
      }
      t.push(n.role === "user" ? Oh(n.role, n.content || "") : {
        role: n.role,
        content: typeof n.content == "string" ? n.content : ""
      });
    }
  return t;
}
function nI(e) {
  const t = [];
  for (const n of e.messages || []) {
    if (n.role === "system") {
      t.push({
        role: "system",
        content: typeof n.content == "string" ? n.content : ""
      });
      continue;
    }
    if (n.role === "tool") {
      t.push({
        type: "function_call_output",
        call_id: n.tool_call_id || "missing_tool_call_id",
        output: n.content
      });
      continue;
    }
    if (n.role === "assistant" && Array.isArray(n.tool_calls) && n.tool_calls.length) {
      n.content?.trim() && t.push(Pi(n.content)), n.tool_calls.forEach((o, i) => {
        t.push({
          type: "function_call",
          call_id: o.id || `function_call_${i + 1}`,
          name: o.function?.name || "",
          arguments: o.function?.arguments || "{}",
          status: "completed"
        });
      });
      continue;
    }
    if (n.role === "assistant") {
      t.push(Pi(n.content || ""));
      continue;
    }
    t.push(n.role === "user" ? Oh(n.role, n.content || "") : {
      role: n.role,
      content: typeof n.content == "string" ? n.content : ""
    });
  }
  return t;
}
function oI(e) {
  try {
    return new URL(String(e || "https://api.openai.com/v1")).hostname === "api.openai.com";
  } catch {
    return !1;
  }
}
function iI(e) {
  const t = String(e?.message || e || "").toLowerCase();
  return t.includes("instructions") || t.includes("unsupported") || t.includes("unknown parameter") || t.includes("invalid input");
}
function sI(e, t) {
  typeof e.onStreamProgress == "function" && e.onStreamProgress({
    ...typeof t.text == "string" ? { text: t.text } : {},
    ...Array.isArray(t.thoughts) ? { thoughts: t.thoughts } : {}
  });
}
function bs(e, t) {
  const [n = "0", o = "0"] = String(e || "").split(":"), [i = "0", s = "0"] = String(t || "").split(":");
  return Number(n) - Number(i) || Number(o) - Number(s);
}
var rI = class {
  constructor(e) {
    this.config = e, this.client = new W({
      apiKey: e.apiKey,
      baseURL: String(e.baseUrl || "https://api.openai.com/v1").replace(/\/$/, ""),
      timeout: Number(e.timeoutMs) || 900 * 1e3,
      maxRetries: 0,
      dangerouslyAllowBrowser: !0
    });
  }
  async chat(e) {
    const t = (c) => {
      const d = eI(c);
      if (d) {
        const f = new Error(d);
        throw f.name = "ProxyEndpointError", f.rawDisplay = d, f;
      }
      const p = Array.isArray(c.output) ? c.output : [];
      return {
        output: p,
        thoughts: QC(p),
        toolCalls: p.filter((f) => f.type === "function_call" && f.name).map((f, h) => ({
          id: f.call_id || `response-tool-${h + 1}`,
          name: f.name || "",
          arguments: f.arguments || "{}"
        })),
        text: jC(c)
      };
    }, n = (c = !1) => {
      const d = {
        model: this.config.model,
        instructions: c ? void 0 : ZC(e) || void 0,
        input: c ? nI(e) : tI(e),
        ...Array.isArray(e.tools) && e.tools.length ? {
          tools: e.tools.map((p) => ({
            type: "function",
            name: p.function.name,
            description: p.function.description,
            parameters: p.function.parameters
          })),
          tool_choice: e.toolChoice || "auto"
        } : {},
        ...e.maxTokens ? { max_output_tokens: e.maxTokens } : {}
      };
      return !e.reasoning?.enabled && typeof e.temperature == "number" && (d.temperature = e.temperature), e.reasoning?.enabled && (d.reasoning = {
        effort: e.reasoning.effort,
        summary: "detailed"
      }), d;
    }, o = async (c = !1) => {
      const d = n(c);
      return await this.client.responses.create(d, { signal: e.signal });
    }, i = async (c = !1) => {
      const d = n(c), p = this.client.responses.stream(d, { signal: e.signal }), f = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map(), g = () => {
        const y = [];
        Array.from(h.entries()).sort(([v], [A]) => bs(v, A)).forEach(([, v]) => xi(y, "推理文本", v)), Array.from(m.entries()).sort(([v], [A]) => bs(v, A)).forEach(([, v]) => xi(y, "推理摘要", v)), sI(e, {
          text: Array.from(f.entries()).sort(([v], [A]) => bs(v, A)).map(([, v]) => v).join(`
`).trim(),
          thoughts: y
        });
      };
      return p.on("response.output_text.delta", (y) => {
        const v = `${y.output_index}:${y.content_index}`;
        f.set(v, `${f.get(v) || ""}${y.delta}`), g();
      }), p.on("response.reasoning_text.delta", (y) => {
        const v = `${y.output_index}:${y.content_index}`;
        h.set(v, `${h.get(v) || ""}${y.delta}`), g();
      }), p.on("response.reasoning_summary_text.delta", (y) => {
        const v = `${y.output_index}:${y.summary_index}`;
        m.set(v, `${m.get(v) || ""}${y.delta}`), g();
      }), await p.finalResponse();
    }, s = !oI(this.config.baseUrl);
    let a, u;
    try {
      a = typeof e.onStreamProgress == "function" ? await i(!1) : await o(!1), u = t(a), s && !u.text && !u.toolCalls.length && (a = typeof e.onStreamProgress == "function" ? await i(!0) : await o(!0), u = t(a));
    } catch (c) {
      if (!s || !iI(c)) throw c;
      a = typeof e.onStreamProgress == "function" ? await i(!0) : await o(!0), u = t(a);
    }
    return {
      text: u.text,
      toolCalls: u.toolCalls,
      thoughts: u.thoughts,
      finishReason: a.incomplete_details?.reason || a.status || "stop",
      model: a.model || this.config.model,
      provider: "openai-responses"
    };
  }
};
async function aI(e, t) {
  const n = e.body?.getReader?.();
  if (!n) throw new Error("host_chat_completions_stream_missing_body");
  const o = new TextDecoder();
  let i = "";
  const s = /\r?\n\r?\n/, a = (c) => {
    const d = c.split(/\r?\n/).filter((p) => p.startsWith("data:")).map((p) => p.slice(5).trimStart()).join(`
`).trim();
    !d || d === "[DONE]" || t(JSON.parse(d));
  };
  for (; ; ) {
    const { done: c, value: d } = await n.read();
    if (c) break;
    for (i += o.decode(d, { stream: !0 }); ; ) {
      const p = i.match(s);
      if (!p || typeof p.index != "number") break;
      const f = i.slice(0, p.index);
      i = i.slice(p.index + p[0].length), a(f);
    }
  }
  const u = i.trim();
  u && a(u);
}
var yn = "openai", ga = "claude", ya = "makersuite", lI = "/api/backends/chat-completions/status", qh = "/api/backends/chat-completions/generate", Vh = Object.freeze({
  [ga]: "https://api.anthropic.com/v1",
  [ya]: "https://generativelanguage.googleapis.com"
}), Hh = null;
function uI(e) {
  return String(e || "").trim().replace(/\/+$/, "");
}
function cI(e, t) {
  const n = uI(e);
  return t === "claude" ? !n || /\/v\d[\w.-]*$/i.test(n) ? n : `${n}/v1` : t === "makersuite" ? n.replace(/\/v\d[\w.-]*$/i, "") : n;
}
function dI(e) {
  Hh = typeof e == "function" ? e : null;
}
function _a() {
  return {
    "Content-Type": "application/json",
    ...Hh?.() || {},
    Accept: "application/json"
  };
}
function fI(e = "") {
  return /^\s*<!DOCTYPE\s+html/i.test(String(e || ""));
}
function pI(e = "") {
  return /invalid csrf token/i.test(String(e || ""));
}
function hI() {
  return "酒馆当前页面的 CSRF token 已失效，请按 F5 刷新并重新进入酒馆后再试。";
}
function ln(e = "", t = "") {
  return pI(e) || fI(e) ? hI() : String(e || t || "").trim();
}
function Jh(e = {}, t = yn) {
  const n = cI(e.baseUrl, t), o = String(e.apiKey || "").trim(), i = Vh[t] || "", s = n || (o ? i : ""), a = { chat_completion_source: t || "openai" };
  return s && (a.reverse_proxy = s), o && (a.proxy_password = o), a;
}
function mI(e = {}) {
  return Object.keys(e).forEach((t) => {
    (e[t] === void 0 || e[t] === "") && delete e[t];
  }), e;
}
function gI(e = {}, t = yn) {
  return Jh(e, t);
}
function va(e = {}, t = {}, n = [], o = !1, i = yn) {
  return mI({
    ...Jh(e, i),
    stream: !!o,
    messages: n,
    model: e.model,
    max_tokens: t.maxTokens,
    temperature: t.reasoning?.enabled ? void 0 : t.temperature,
    tools: Array.isArray(t.tools) && t.tools.length ? t.tools : void 0,
    tool_choice: Array.isArray(t.tools) && t.tools.length ? t.toolChoice || "auto" : void 0,
    use_sysprompt: i === "openai" ? void 0 : !0,
    reasoning_effort: t.reasoning?.enabled ? t.reasoning.effort : void 0,
    include_reasoning: i === "openai" ? void 0 : t.reasoning?.enabled ? !0 : void 0
  });
}
function yI(e = {}, t = {}, n = [], o = !1) {
  return va(e, t, n, o, yn);
}
function _I(e = {}, t = {}, n = [], o = !1) {
  return va(e, t, n, o, ga);
}
function vI(e = {}, t = {}, n = [], o = !1) {
  return va(e, t, n, o, ya);
}
async function TI(e = {}, t = yn, n = {}) {
  const o = await fetch(lI, {
    method: "POST",
    headers: _a(),
    body: JSON.stringify(gI(e, t)),
    signal: n.signal
  }), i = await o.text();
  let s = null;
  try {
    s = i ? JSON.parse(i) : {};
  } catch (u) {
    throw new Error(`酒馆后端模型列表拉取失败：${ln(i, String(u?.message || u))}`);
  }
  if (!o.ok || s?.error) {
    const u = ln(s?.message || s?.error?.message || i, `HTTP ${o.status}`);
    throw new Error(`酒馆后端模型列表拉取失败：${u}`);
  }
  const a = Array.isArray(s?.data) ? s.data.map((u) => String(u?.id || u?.name || "").trim()).filter(Boolean) : [];
  return [...new Set(a)];
}
async function Ta(e = {}, t = {}) {
  const n = await fetch(qh, {
    method: "POST",
    headers: _a(),
    body: JSON.stringify({
      ...e,
      stream: !1
    }),
    signal: t.signal
  }), o = await n.text();
  let i = null;
  try {
    i = o ? JSON.parse(o) : {};
  } catch (s) {
    throw new Error(`酒馆后端生成失败：${ln(o, String(s?.message || s))}`);
  }
  if (!n.ok || i?.error) {
    const s = ln(i?.error?.message || i?.message || o, `HTTP ${n.status}`);
    throw new Error(`酒馆后端生成失败：${s}`);
  }
  return i;
}
async function Sa(e = {}, t, n = {}) {
  const o = await fetch(qh, {
    method: "POST",
    headers: _a(),
    body: JSON.stringify({
      ...e,
      stream: !0
    }),
    signal: n.signal
  });
  if (!o.ok) {
    const i = await o.text().catch(() => "");
    throw new Error(ln(i, `酒馆后端流式生成失败：HTTP ${o.status}`));
  }
  await aI(o, (i) => {
    if (i?.error) {
      const s = ln(i.error?.message || i.message || JSON.stringify(i.error), "酒馆后端流式生成失败");
      throw new Error(s);
    }
    t(i);
  });
}
function Bt(e) {
  if (e !== void 0)
    try {
      return JSON.parse(JSON.stringify(e));
    } catch {
      return;
    }
}
function Wh(e = "") {
  try {
    return {
      ok: !0,
      input: JSON.parse(String(e || ""))
    };
  } catch (t) {
    return {
      ok: !1,
      input: {},
      raw: String(e || ""),
      error: t instanceof Error ? t.message : String(t || "invalid_tool_input_json")
    };
  }
}
function SI(e = []) {
  return (Array.isArray(e) ? e : []).map((t) => {
    const n = String(t?.function?.name || "").trim();
    if (!n) return null;
    const o = Wh(t.function.arguments || "{}");
    return {
      type: "tool_use",
      id: String(t.id || n),
      name: n,
      input: o.input,
      ...o.ok ? {} : {
        invalidInputJson: o.raw,
        inputParseError: o.error
      }
    };
  }).filter(Boolean);
}
function EI(e = []) {
  const t = Array.isArray(e) ? Bt(e) : null;
  return Array.isArray(t) && t.length ? t : null;
}
function wI(e = {}) {
  const t = Array.isArray(e.messages) ? e.messages : [], n = [];
  return t.forEach((o) => {
    if (!o || typeof o != "object") return;
    const i = Bt(o) || {}, s = EI(i?.providerPayload?.anthropicContent), a = SI(i.tool_calls);
    delete i.providerPayload, i.role === "assistant" && s && a.length ? (delete i.tool_calls, i.content = s.filter((u) => u?.type !== "tool_use").concat(a)) : i.role === "assistant" && s && (delete i.tool_calls, i.content = s), n.push(i);
  }), n;
}
function AI(e = []) {
  return (Array.isArray(e) ? e : []).map((t) => {
    if (!t || typeof t != "object") return null;
    if (t.type === "text") return {
      type: "text",
      text: String(t.text || "")
    };
    if (t.type === "tool_use" && t.name) {
      if (t.inputJson !== void 0) {
        const o = Wh(t.inputJson);
        return {
          type: "tool_use",
          id: String(t.id || t.name),
          name: String(t.name),
          input: o.input,
          ...o.ok ? {} : {
            invalidInputJson: o.raw,
            inputParseError: o.error
          }
        };
      }
      const n = Bt(t.input);
      return n !== void 0 ? {
        type: "tool_use",
        id: String(t.id || t.name),
        name: String(t.name),
        input: n
      } : {
        type: "tool_use",
        id: String(t.id || t.name),
        name: String(t.name),
        input: {}
      };
    }
    return t.type === "thinking" ? {
      type: "thinking",
      thinking: String(t.thinking || t.text || "")
    } : t.type === "redacted_thinking" ? {
      type: "redacted_thinking",
      data: String(t.data || "")
    } : Bt(t) || null;
  }).filter(Boolean);
}
function CI(e = []) {
  return e.map((t) => !t || typeof t != "object" ? null : t.type === "tool_use" && t.name ? {
    type: "tool_use",
    id: t.id,
    name: t.name,
    input: Bt(t.input) || {}
  } : Bt(t) || null).filter(Boolean);
}
function II(e = []) {
  const t = Array.isArray(e) ? e : [];
  return {
    text: t.filter((n) => n?.type === "text").map((n) => n.text || "").join(`
`),
    thoughts: t.filter((n) => n?.type === "thinking" || n?.type === "redacted_thinking").map((n) => ({
      label: n.type === "thinking" ? "思考块" : "已脱敏思考块",
      text: n.type === "thinking" ? n.thinking || "" : n.data || ""
    })).filter((n) => n.text)
  };
}
function Kh(e = [], t = {}) {
  const n = AI(e), o = n.filter((i) => i.type === "tool_use" && i.name).map((i, s) => ({
    id: i.id || `st-claude-tool-${s + 1}`,
    name: i.name,
    arguments: i.invalidInputJson !== void 0 ? i.invalidInputJson : JSON.stringify(i.input || {})
  }));
  return {
    text: n.filter((i) => i.type === "text").map((i) => i.text || "").join(`
`),
    toolCalls: o,
    thoughts: n.filter((i) => i.type === "thinking" || i.type === "redacted_thinking").map((i) => ({
      label: i.type === "thinking" ? "思考块" : "已脱敏思考块",
      text: i.type === "thinking" ? i.thinking || "" : i.data || ""
    })).filter((i) => i.text),
    finishReason: t.finishReason || "stop",
    model: t.model || "",
    provider: "sillytavern-claude",
    providerPayload: n.length ? { anthropicContent: CI(n) } : void 0
  };
}
function bI(e, t) {
  typeof e.onStreamProgress == "function" && e.onStreamProgress({
    ...typeof t.text == "string" ? { text: t.text } : {},
    ...Array.isArray(t.thoughts) ? { thoughts: t.thoughts } : {}
  });
}
function RI(e, t = {}) {
  const n = [];
  let o = "stop", i = t.model || "";
  const s = (u, c = {}) => {
    const d = Number.isInteger(Number(u)) ? Number(u) : n.length;
    return n[d] ? n[d] = {
      ...n[d],
      ...c
    } : n[d] = { ...c }, n[d];
  }, a = () => {
    const u = II(n);
    bI(e, {
      text: u.text,
      thoughts: u.thoughts
    });
  };
  return {
    accept(u = {}) {
      if (u?.message?.model && (i = u.message.model), u.type === "content_block_start") {
        s(u.index, Bt(u.content_block) || {}), a();
        return;
      }
      if (u.type === "content_block_delta") {
        const c = s(u.index), d = u.delta || {};
        d.type === "text_delta" ? (c.type = c.type || "text", c.text = `${c.text || ""}${d.text || ""}`) : d.type === "input_json_delta" ? (c.type = c.type || "tool_use", c.inputJson = `${c.inputJson || ""}${d.partial_json || ""}`) : d.type === "thinking_delta" ? (c.type = c.type || "thinking", c.thinking = `${c.thinking || ""}${d.thinking || ""}`) : d.type === "signature_delta" && (c.signature = `${c.signature || ""}${d.signature || ""}`), a();
        return;
      }
      u.type === "message_delta" && (o = u.delta?.stop_reason || o);
    },
    result() {
      return Kh(n, {
        finishReason: o,
        model: i
      });
    }
  };
}
var PI = class {
  constructor(e) {
    this.config = e;
  }
  buildMessages(e) {
    return wI(e);
  }
  async chat(e) {
    const t = typeof e.onStreamProgress == "function", n = this.buildMessages(e), o = _I(this.config, e, n, t);
    if (t) {
      const s = RI(e, this.config);
      return await Sa(o, (a) => {
        s.accept(a);
      }, { signal: e.signal }), s.result();
    }
    const i = await Ta(o, { signal: e.signal });
    return Kh(Array.isArray(i?.content) ? i.content : [{
      type: "text",
      text: i?.choices?.[0]?.message?.content || ""
    }], {
      finishReason: i?.stop_reason || i?.choices?.[0]?.finish_reason || "stop",
      model: i?.model || this.config.model
    });
  }
};
function Ea(e) {
  if (e !== void 0)
    try {
      return JSON.parse(JSON.stringify(e));
    } catch {
      return;
    }
}
function un(e) {
  if (typeof e == "string") return {
    role: "model",
    parts: e ? [{ text: e }] : []
  };
  if (!e || typeof e != "object") return {
    role: "model",
    parts: []
  };
  const t = Ea(e) || {};
  return t.role = t.role || "model", t.parts = Array.isArray(t.parts) ? t.parts : [], t;
}
function xI(e) {
  const t = Array.isArray(e?.providerPayload?.googleContents) ? e.providerPayload.googleContents : [];
  if (t.length) return t.map((i) => un(i)).filter((i) => Array.isArray(i.parts) && i.parts.length);
  const n = e?.providerPayload?.googleContent, o = un(n);
  return o.parts.length ? [o] : [];
}
function MI(e = {}) {
  const t = String(e?.mimeType || "").trim(), n = String(e?.data || "").trim();
  if (!t || !n) return null;
  const o = `data:${t};base64,${n}`;
  return t.startsWith("image/") ? {
    type: "image_url",
    image_url: { url: o }
  } : t.startsWith("video/") ? {
    type: "video_url",
    video_url: { url: o }
  } : t.startsWith("audio/") ? {
    type: "audio_url",
    audio_url: { url: o }
  } : null;
}
function NI(e = {}, t = 0) {
  const n = un(e);
  if (!n.parts.length) return null;
  const o = {
    role: n.role === "user" ? "user" : "assistant",
    content: []
  }, i = n.parts.find((a) => !a?.thought && typeof a?.text == "string" && typeof a?.thoughtSignature == "string" && a.thoughtSignature)?.thoughtSignature || "", s = [];
  return n.parts.forEach((a) => {
    if (!a || typeof a != "object") return;
    if (!a.thought && typeof a.text == "string" && a.text) {
      o.content.push({
        type: "text",
        text: a.text
      });
      return;
    }
    if (a.functionCall?.name) {
      s.push({
        id: String(a.functionCall.id || `st-google-tool-${t + 1}-${s.length + 1}`),
        type: "function",
        function: {
          name: String(a.functionCall.name || ""),
          arguments: JSON.stringify(a.functionCall.args || {})
        },
        ...typeof a.thoughtSignature == "string" && a.thoughtSignature ? { signature: a.thoughtSignature } : {}
      });
      return;
    }
    const u = MI(a.inlineData);
    u && o.content.push(u);
  }), s.length && o.content.push({
    type: "tool_calls",
    tool_calls: s
  }), i && o.content.some((a) => a?.type === "text") && (o.signature = i), o.content.length ? o : null;
}
function kI(e = {}) {
  const t = Array.isArray(e.messages) ? e.messages : [], n = [];
  return t.forEach((o) => {
    if (!o || typeof o != "object") return;
    const i = xI(o);
    if (o.role === "assistant" && i.length) {
      i.forEach((a, u) => {
        const c = NI(a, u);
        c && n.push(c);
      });
      return;
    }
    const s = Ea(o) || {};
    delete s.providerPayload, n.push(s);
  }), n;
}
function Yh(e = {}) {
  return un(e?.responseContent || e?.candidates?.[0]?.content || "");
}
function zh(e = {}) {
  return (e.parts || []).filter((t) => !t?.thought && typeof t?.text == "string" && t.text).map((t) => t.text).join(`
`);
}
function Xh(e = {}) {
  return (e.parts || []).filter((t) => t?.thought && typeof t.text == "string" && t.text.trim()).map((t, n) => ({
    label: `思考块 ${n + 1}`,
    text: t.text.trim()
  }));
}
function Qh(e = {}) {
  return (e.parts || []).map((t) => t?.functionCall || null).filter((t) => t?.name).map((t, n) => ({
    id: t.id || `st-google-tool-${n + 1}`,
    name: t.name,
    arguments: JSON.stringify(t.args || {})
  }));
}
function DI(e, t) {
  const n = String(t || ""), o = String(e || "");
  return n ? !o || n.startsWith(o) ? n : o.endsWith(n) ? o : `${o}${n}` : o;
}
function UI(e = [], t = []) {
  const n = Array.isArray(e) ? [...e] : [];
  return t.forEach((o) => {
    const i = [
      o.id || "",
      o.name || "",
      o.arguments || ""
    ].join("\0");
    n.some((s) => [
      s.id || "",
      s.name || "",
      s.arguments || ""
    ].join("\0") === i) || n.push(o);
  }), n;
}
function Zh(e) {
  const t = un(e);
  return t.parts.length ? {
    googleContent: t,
    googleContents: [t]
  } : void 0;
}
function LI(e = {}, t = {}) {
  const n = Yh(e), o = e?.choices?.[0]?.message?.content || "";
  return {
    text: zh(n) || o,
    toolCalls: Qh(n),
    thoughts: Xh(n),
    finishReason: e?.candidates?.[0]?.finishReason || e?.choices?.[0]?.finish_reason || t.finishReason || "STOP",
    model: e?.model || e?.modelVersion || t.model || "",
    provider: "sillytavern-google",
    providerPayload: Zh(n)
  };
}
function $I(e, t) {
  typeof e.onStreamProgress == "function" && e.onStreamProgress({
    ...typeof t.text == "string" ? { text: t.text } : {},
    ...Array.isArray(t.thoughts) ? { thoughts: t.thoughts } : {}
  });
}
function FI(e, t = {}) {
  let n = "", o = [], i = [], s = "STOP", a = t.model || "";
  const u = [];
  return {
    accept(c = {}) {
      a = c.model || c.modelVersion || a, s = c?.candidates?.[0]?.finishReason || s;
      const d = Yh(c);
      d.parts.length && u.push(...Ea(d.parts) || []), n = DI(n, zh(d)), o = UI(o, Qh(d));
      const p = Xh(d);
      p.length && (i = p), $I(e, {
        text: n,
        thoughts: i
      });
    },
    result() {
      const c = un({
        role: "model",
        parts: u.length ? u : n ? [{ text: n }] : []
      });
      return {
        text: n,
        toolCalls: o,
        thoughts: i,
        finishReason: s,
        model: a,
        provider: "sillytavern-google",
        providerPayload: Zh(c)
      };
    }
  };
}
var BI = class {
  constructor(e) {
    this.config = e;
  }
  buildMessages(e) {
    return kI(e);
  }
  async chat(e) {
    const t = typeof e.onStreamProgress == "function", n = this.buildMessages(e), o = vI(this.config, e, n, t);
    if (t) {
      const i = FI(e, this.config);
      return await Sa(o, (s) => {
        i.accept(s);
      }, { signal: e.signal }), i.result();
    }
    return LI(await Ta(o, { signal: e.signal }), { model: this.config.model });
  }
};
function GI(e, t) {
  typeof e.onStreamProgress == "function" && e.onStreamProgress({
    ...typeof t.text == "string" ? { text: t.text } : {},
    ...Array.isArray(t.thoughts) ? { thoughts: t.thoughts } : {}
  });
}
function Rs(e, t = []) {
  const n = Mt(e);
  return {
    thinkTagged: n,
    cleanedText: t.length ? n.cleaned : Nt(n.cleaned)
  };
}
function OI(e) {
  const t = String(e?.message || e || "");
  return /Cannot read properties of null \(reading ['"]function['"]\)/i.test(t) || /reading ['"]function['"]/i.test(t) || /badresponsestatuscode/i.test(t);
}
var qI = class {
  constructor(e) {
    this.config = e;
  }
  buildMessages(e) {
    return (this.config.toolMode || "native") === "tagged-json" && Array.isArray(e.tools) && e.tools.length > 0 ? Er(e) : Sr(e, this.config.model);
  }
  async streamChat(e, t) {
    const n = {
      content: "",
      toolCalls: []
    }, o = { role: "assistant" };
    let i = "stop", s = this.config.model;
    await Sa(t, (f) => {
      s = f?.model || s;
      const h = f?.choices?.[0] || {}, m = h.delta || {};
      wr(o, h), h.finish_reason && (i = h.finish_reason), typeof m.content == "string" && (n.content += m.content), Array.isArray(m.tool_calls) && m.tool_calls.forEach((A) => {
        Ar(n, A);
      });
      const g = n.toolCalls.filter((A) => A?.function?.name), { thinkTagged: y, cleanedText: v } = Rs(n.content, g);
      GI(e, {
        text: v,
        thoughts: vt(o, h).concat(y.thoughts)
      });
    }, { signal: e.signal });
    const a = ro(n.toolCalls, "st-openai-tool"), { thinkTagged: u, cleanedText: c } = Rs(n.content, a), d = vt(o, {});
    u.thoughts.forEach((f) => d.push(f));
    const p = a.length ? [] : ao(u.cleaned);
    return {
      text: c,
      toolCalls: [...a, ...p],
      thoughts: d,
      finishReason: i,
      model: s,
      provider: "sillytavern-openai-compatible",
      providerPayload: lo(o)
    };
  }
  async nonStreamingChat(e, t) {
    const n = await Ta(t, { signal: e.signal }), o = n.choices?.[0] || {}, i = o.message || {}, s = vt(i, o), a = ro(i.tool_calls || [], "st-openai-tool"), { thinkTagged: u, cleanedText: c } = Rs(Gh(i.content), a);
    u.thoughts.forEach((f) => s.push(f));
    const d = a.length ? [] : ao(u.cleaned), p = Ri(i, o);
    return {
      text: c,
      toolCalls: [...a, ...d],
      thoughts: s,
      finishReason: o.finish_reason || "stop",
      model: n.model || this.config.model,
      provider: "sillytavern-openai-compatible",
      providerPayload: lo(p)
    };
  }
  async chat(e) {
    const t = (this.config.toolMode || "native") === "tagged-json" && Array.isArray(e.tools) && e.tools.length > 0, n = Array.isArray(e.tools) && e.tools.length > 0, o = (a) => {
      const u = a ? Er(e) : Sr(e, this.config.model);
      return yI(this.config, a ? {
        ...e,
        tools: void 0,
        toolChoice: void 0
      } : e, u, typeof e.onStreamProgress == "function");
    }, i = async (a) => typeof e.onStreamProgress == "function" ? await this.streamChat(e, a) : await this.nonStreamingChat(e, a), s = o(t);
    try {
      return await i(s);
    } catch (a) {
      if (t || !n || !OI(a)) throw a;
    }
    return typeof e.onToolProtocolFallback == "function" && e.onToolProtocolFallback({
      provider: "sillytavern-openai-compatible",
      fromToolMode: "native",
      toToolMode: "tagged-json",
      reason: "malformed_native_tool_host_error"
    }), await i(o(!0));
  }
}, Hc = 900 * 1e3, Jc = Object.freeze([{
  value: "native",
  label: "原生 Tool Calling"
}, {
  value: "tagged-json",
  label: "Tagged JSON 兼容模式"
}]), Cr = Object.freeze([
  {
    value: "low",
    label: "低"
  },
  {
    value: "medium",
    label: "中"
  },
  {
    value: "high",
    label: "高"
  }
]), VI = Object.freeze([
  {
    value: "openai-responses",
    label: "OpenAI Responses"
  },
  {
    value: "openai-compatible",
    label: "OpenAI-Compatible"
  },
  {
    value: "sillytavern-openai-compatible",
    label: "SillyTavern OpenAI-Compatible"
  },
  {
    value: "sillytavern-claude",
    label: "SillyTavern Claude"
  },
  {
    value: "sillytavern-google",
    label: "SillyTavern Google AI"
  },
  {
    value: "anthropic",
    label: "Anthropic"
  },
  {
    value: "google",
    label: "Google AI"
  }
]);
function Wc(e = "") {
  return e === "anthropic" || e === "sillytavern-claude";
}
function HI(e = "") {
  return e === "sillytavern-openai-compatible" || e === "sillytavern-claude" || e === "sillytavern-google";
}
function Ne(e = "") {
  return Cr.some((t) => t.value === e) ? e : "medium";
}
function ke(e, t = 0.2) {
  const n = typeof e == "string" && !e.trim() ? t : e, o = Number(n);
  return Number.isFinite(o) ? Math.max(0, Math.min(2, o)) : ke(t, 0.2);
}
function an(e = {}) {
  return e.sendTemperature !== !1;
}
function Kc(e = {}) {
  return an(e) ? ke(e.temperature, 0.2) : void 0;
}
function Yc(e = "", t = {}) {
  return t && typeof t == "object" && t[e] ? t[e] : VI.find((n) => n.value === e)?.label || e || "未配置";
}
function JI(e = {}, t = {}) {
  const n = Zo(e || {});
  if (t.role === "delegate" && n.delegateConfig) {
    const c = n.delegateConfig.provider || "openai-compatible", d = (n.delegateConfig.modelConfigs || jt())[c] || jt()[c] || {};
    return {
      currentPresetName: String(n.delegatePresetName || n.currentPresetName || ""),
      provider: c,
      baseUrl: String(d.baseUrl || ""),
      model: String(d.model || ""),
      apiKey: String(d.apiKey || ""),
      tavilyApiKey: Ps(n.tavilyApiKey),
      tavilyBaseUrl: Ue(n.tavilyBaseUrl),
      temperature: Kc(d),
      sendTemperature: an(d),
      maxTokens: Wc(c) ? 32e3 : null,
      timeoutMs: Number(t.timeoutMs) || 9e5,
      toolMode: d.toolMode || "native",
      reasoningEnabled: !!d.reasoningEnabled,
      reasoningEffort: Ne(d.reasoningEffort)
    };
  }
  const o = ce(t.presetName || (t.role === "delegate" ? n.delegatePresetName : n.currentPresetName) || "默认"), i = n.presets?.[o] ? o : n.presets?.[n.currentPresetName] ? n.currentPresetName : br, s = n.presets?.[i] || Ee(), a = s.provider || n.provider || "openai-compatible", u = (s.modelConfigs || n.modelConfigs || jt())[a] || jt()[a] || {};
  return {
    currentPresetName: String(i || ""),
    provider: a,
    baseUrl: String(u.baseUrl || ""),
    model: String(u.model || ""),
    apiKey: String(u.apiKey || ""),
    tavilyApiKey: Ps(n.tavilyApiKey),
    tavilyBaseUrl: Ue(n.tavilyBaseUrl),
    temperature: Kc(u),
    sendTemperature: an(u),
    maxTokens: Wc(a) ? 32e3 : null,
    timeoutMs: Number(t.timeoutMs) || 9e5,
    toolMode: u.toolMode || "native",
    reasoningEnabled: !!u.reasoningEnabled,
    reasoningEffort: Ne(u.reasoningEffort)
  };
}
function WI(e = {}, t = {}) {
  if (!e.apiKey && !HI(e.provider)) throw new Error(t.missingApiKeyMessage || "请先填写当前模型配置的 API Key。");
  switch (e.provider) {
    case "sillytavern-openai-compatible":
      return new qI(e);
    case "sillytavern-claude":
      return new PI(e);
    case "sillytavern-google":
      return new BI(e);
    case "openai-responses":
      return new rI(e);
    case "anthropic":
      return new _g(e);
    case "google":
      return new hA(e);
    default:
      return new zC(e);
  }
}
var KI = { chat: { exclude: [
  "embedding",
  "embed",
  "rerank",
  "reranker",
  "tts",
  "speech",
  "audio",
  "whisper",
  "transcription",
  "stt",
  "image",
  "sdxl",
  "flux",
  "moderation"
] } }, YI = Object.freeze([
  "claude-opus-4-7",
  "claude-opus-4-6",
  "claude-opus-4-5",
  "claude-opus-4-5-20251101",
  "claude-sonnet-4-6",
  "claude-sonnet-4-5",
  "claude-sonnet-4-5-20250929",
  "claude-opus-4-1",
  "claude-opus-4-1-20250805",
  "claude-opus-4-0",
  "claude-opus-4-20250514",
  "claude-sonnet-4-0",
  "claude-sonnet-4-20250514"
]);
function Ze(e, t, n = "") {
  if (e.replaceChildren(), n) {
    const o = document.createElement("option");
    o.value = "", o.textContent = n, e.appendChild(o);
  }
  t.forEach((o) => {
    const i = document.createElement("option");
    i.value = o.value, i.textContent = o.label, e.appendChild(i);
  });
}
function ho(e = []) {
  const t = [...new Set(e.filter(Boolean).map((i) => String(i).trim()).filter(Boolean))], n = KI.chat, o = t.filter((i) => {
    const s = i.toLowerCase();
    return !n.exclude.some((a) => s.includes(a));
  });
  return o.length ? o : t;
}
function Qo(e = "") {
  return e === "delegate" ? "delegate" : "main";
}
function cn(e) {
  return String(e || "").trim().replace(/\/+$/, "");
}
function zI(e = "") {
  return e === "sillytavern-openai-compatible" || e === "sillytavern-claude" || e === "sillytavern-google";
}
function Kt(e = "") {
  return e === "openai-compatible" || e === "sillytavern-openai-compatible";
}
function Ir(e = "") {
  return e === "anthropic" || e === "sillytavern-claude";
}
function XI(e = "") {
  return e === "sillytavern-claude" ? ga : e === "sillytavern-google" ? ya : yn;
}
function mo(e = []) {
  return [...new Set(e.filter(Boolean).map((t) => String(t).trim()).filter(Boolean))];
}
function QI(e) {
  const t = cn(e);
  if (!t) return [];
  if (t.endsWith("/v1")) {
    const n = t.slice(0, -3);
    return mo([
      `${t}/models`,
      `${n}/v1/models`,
      `${n}/models`
    ]);
  }
  return mo([`${t}/v1/models`, `${t}/models`]);
}
function jh(e) {
  const t = cn(e);
  if (!t) return [];
  if (t.endsWith("/v1")) {
    const n = t.slice(0, -3);
    return mo([
      `${t}/models`,
      `${n}/v1/models`,
      `${n}/models`
    ]);
  }
  return mo([`${t}/v1/models`, `${t}/models`]);
}
function ZI(e, t) {
  const n = cn(e);
  if (!n) return [];
  const o = n.endsWith("/v1beta") ? n.slice(0, -7) : n;
  return mo([
    `${n}/models?key=${encodeURIComponent(t)}`,
    `${n}/models`,
    `${o}/v1beta/models?key=${encodeURIComponent(t)}`,
    `${o}/v1beta/models`,
    `${o}/models?key=${encodeURIComponent(t)}`,
    `${o}/models`
  ]);
}
function jI(e, t) {
  const n = [
    e?.error?.message,
    e?.message,
    e?.detail,
    e?.details,
    e?.error
  ].find((o) => typeof o == "string" && o.trim());
  return n ? n.trim() : String(t || "").trim().slice(0, 160);
}
async function e0(e, t = {}) {
  const n = await fetch(e, t), o = await n.text();
  let i = null, s = null;
  try {
    i = o ? JSON.parse(o) : {};
  } catch (a) {
    s = a;
  }
  return {
    ok: n.ok,
    status: n.status,
    url: e,
    data: i,
    rawText: o,
    parseError: s,
    errorSnippet: jI(i, o)
  };
}
function t0(e) {
  return ho((e?.data || []).map((t) => String(t?.id || "").trim()).filter(Boolean));
}
function em(e) {
  return ho((e?.data || []).map((t) => String(t?.id || "").trim()).filter(Boolean));
}
function n0(e) {
  return ho((e?.models || e?.data || []).map((t) => String(t?.id || t?.name || "")).map((t) => t.split("/").pop() || "").filter(Boolean));
}
async function pi({ urls: e, requestOptionsList: t, extractModels: n, providerLabel: o }) {
  let i = null;
  for (const s of e) for (const a of t) {
    const u = await e0(s, a);
    if (!u.ok) {
      i = u;
      continue;
    }
    if (u.parseError) {
      i = {
        ...u,
        errorSnippet: "返回的不是 JSON"
      };
      continue;
    }
    const c = n(u.data);
    if (c.length) return c;
    i = {
      ...u,
      errorSnippet: "返回成功，但模型列表为空"
    };
  }
  if (i) {
    const s = i.url ? ` (${i.url})` : "", a = i.errorSnippet ? `：${i.errorSnippet}` : "";
    throw new Error(`${o} 拉取模型失败：${i.status || "unknown"}${a}${s}`);
  }
  throw new Error(`${o} 拉取模型失败：未获取到模型列表。`);
}
async function o0(e) {
  const t = String(e.apiKey || "").trim(), n = cn(e.baseUrl || ""), o = cn(n || Vh.claude);
  if (t && o) try {
    return await pi({
      urls: jh(o),
      requestOptionsList: [{ headers: {
        "x-api-key": t,
        "anthropic-version": "2023-06-01",
        Accept: "application/json"
      } }],
      extractModels: em,
      providerLabel: "Anthropic"
    });
  } catch (i) {
    if (n) throw i;
  }
  return [...YI];
}
async function zc(e) {
  const t = e.provider, n = cn(e.baseUrl || ""), o = String(e.apiKey || "").trim();
  if (t === "sillytavern-claude") return ho(await o0(e));
  if (zI(t)) return ho(await TI(e, XI(t)));
  if (!o) throw new Error("请先填写 API Key。");
  if (!n) throw new Error("请先填写 Base URL。");
  return t === "google" ? await pi({
    urls: ZI(n, o),
    requestOptionsList: [
      { headers: {
        Accept: "application/json",
        "x-goog-api-key": o
      } },
      { headers: {
        Accept: "application/json",
        Authorization: `Bearer ${o}`
      } },
      { headers: { Accept: "application/json" } }
    ],
    extractModels: n0,
    providerLabel: "Google AI"
  }) : Ir(t) ? await pi({
    urls: jh(n),
    requestOptionsList: [{ headers: {
      "x-api-key": o,
      "anthropic-version": "2023-06-01",
      Accept: "application/json"
    } }],
    extractModels: em,
    providerLabel: "Anthropic"
  }) : await pi({
    urls: QI(n),
    requestOptionsList: [{ headers: {
      Authorization: `Bearer ${o}`,
      Accept: "application/json"
    } }],
    extractModels: t0,
    providerLabel: t === "openai-responses" ? "OpenAI Responses" : "OpenAI-Compatible"
  });
}
function i0(e) {
  return e instanceof Error ? e.message : String(e || "unknown_error");
}
function u0(e = {}) {
  const { state: t, render: n, showToast: o, createRequestId: i = (_ = "req") => `${_}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, saveConfig: s, describeError: a = i0, getRuntimeSummaryText: u } = e;
  function c() {
    t.configFormSyncPending = !0;
  }
  function d(_, T = "main") {
    const I = String(_ || "").trim() || "openai-compatible";
    return T === "delegate" ? `delegate:${I}` : I;
  }
  function p(_, T = "main") {
    return t.pullStateByProvider?.[d(_, T)] || {
      status: "idle",
      message: ""
    };
  }
  function f(_, T, I = "main") {
    t.pullStateByProvider = {
      ...t.pullStateByProvider || {},
      [d(_, I)]: T
    };
  }
  function h(_, T, I = "main") {
    t.modelOptionsByProvider = {
      ...t.modelOptionsByProvider || {},
      [d(_, I)]: Array.isArray(T) ? T : []
    };
  }
  function m(_, T = "main") {
    const I = d(_, T);
    return Array.isArray(t.modelOptionsByProvider?.[I]) ? t.modelOptionsByProvider[I] : [];
  }
  function g(_, T) {
    const I = t.config?.presets || {}, G = ce(_ || T || "默认");
    return I[G] ? G : T && I[T] ? T : Object.keys(I)[0] || "默认";
  }
  function y(_, T) {
    const I = g(_, br), G = T && typeof T == "object" ? T : Ee(), K = G.provider || "openai-compatible", Z = De(G.modelConfigs || {}), le = Z[K] || {};
    return {
      delegatePresetName: I,
      delegateProvider: K,
      delegateModelConfigs: Z,
      delegateBaseUrl: String(le.baseUrl || ""),
      delegateModel: String(le.model || ""),
      delegateApiKey: String(le.apiKey || ""),
      delegateTemperature: ke(le.temperature, 0.2),
      delegateSendTemperature: an(le),
      delegateReasoningEnabled: !!le.reasoningEnabled,
      delegateReasoningEffort: Ne(le.reasoningEffort),
      delegateToolMode: le.toolMode || "native"
    };
  }
  function v(_ = "openai-compatible", T = {}) {
    const I = De(T || {})[_] || {};
    return {
      baseUrl: String(I.baseUrl || ""),
      model: String(I.model || ""),
      apiKey: String(I.apiKey || ""),
      temperature: ke(I.temperature, 0.2),
      sendTemperature: an(I),
      reasoningEnabled: !!I.reasoningEnabled,
      reasoningEffort: Ne(I.reasoningEffort),
      toolMode: I.toolMode || "native"
    };
  }
  function A(_ = "openai-compatible", T = {}) {
    const I = De(T || {})[_] || {};
    return {
      delegateBaseUrl: String(I.baseUrl || ""),
      delegateModel: String(I.model || ""),
      delegateApiKey: String(I.apiKey || ""),
      delegateTemperature: ke(I.temperature, 0.2),
      delegateSendTemperature: an(I),
      delegateReasoningEnabled: !!I.reasoningEnabled,
      delegateReasoningEffort: Ne(I.reasoningEffort),
      delegateToolMode: I.toolMode || "native"
    };
  }
  function C(_, T, I = t.config) {
    const G = ce(_ || "默认"), K = T && typeof T == "object" ? T : Ee(), Z = K.provider || "openai-compatible", le = De(K.modelConfigs || {}), pt = v(Z, le), vn = g(I?.delegatePresetName, G), Xi = y(vn, I?.delegateConfig && typeof I.delegateConfig == "object" ? I.delegateConfig : (I?.presets || {})[vn] || K);
    return {
      currentPresetName: G,
      presetDraftName: G,
      provider: Z,
      modelConfigs: le,
      ...pt,
      tavilyApiKey: String(I?.tavilyApiKey || ""),
      tavilyBaseUrl: Ue(I?.tavilyBaseUrl || "https://api.tavily.com"),
      permissionMode: en(K.permissionMode),
      jsApiPermission: je(I?.jsApiPermission),
      ...Xi
    };
  }
  function R() {
    if (t.configDraft) return t.configDraft;
    const _ = ce(t.config?.currentPresetName || "默认");
    return t.configDraft = C(_, (t.config?.presets || {})[_] || Ee()), t.configDraft;
  }
  function M(_) {
    const T = R(), I = _.querySelector("#xb-assistant-provider")?.value || T.provider || "openai-compatible", G = _.querySelector("#xb-assistant-delegate-provider")?.value || T.delegateProvider || "openai-compatible", K = {
      baseUrl: _.querySelector("#xb-assistant-base-url")?.value.trim() || "",
      model: _.querySelector("#xb-assistant-model")?.value.trim() || "",
      apiKey: _.querySelector("#xb-assistant-api-key")?.value.trim() || "",
      temperature: ke(_.querySelector("#xb-assistant-temperature")?.value, T.temperature ?? 0.2),
      sendTemperature: _.querySelector("#xb-assistant-send-temperature")?.checked ?? !!(T.sendTemperature ?? !0),
      reasoningEnabled: _.querySelector("#xb-assistant-reasoning-enabled")?.checked || !1,
      reasoningEffort: Ne(_.querySelector("#xb-assistant-reasoning-effort")?.value),
      toolMode: Kt(I) ? _.querySelector("#xb-assistant-tool-mode")?.value || T.toolMode || "native" : void 0
    }, Z = {
      baseUrl: _.querySelector("#xb-assistant-delegate-base-url")?.value.trim() ?? T.delegateBaseUrl ?? "",
      model: _.querySelector("#xb-assistant-delegate-model")?.value.trim() ?? T.delegateModel ?? "",
      apiKey: _.querySelector("#xb-assistant-delegate-api-key")?.value.trim() ?? T.delegateApiKey ?? "",
      temperature: ke(_.querySelector("#xb-assistant-delegate-temperature")?.value, T.delegateTemperature ?? 0.2),
      sendTemperature: _.querySelector("#xb-assistant-delegate-send-temperature")?.checked ?? !!(T.delegateSendTemperature ?? !0),
      reasoningEnabled: _.querySelector("#xb-assistant-delegate-reasoning-enabled")?.checked ?? !!T.delegateReasoningEnabled,
      reasoningEffort: Ne(_.querySelector("#xb-assistant-delegate-reasoning-effort")?.value || T.delegateReasoningEffort),
      toolMode: Kt(G) ? _.querySelector("#xb-assistant-delegate-tool-mode")?.value || T.delegateToolMode || "native" : void 0
    }, le = {
      ...De(T.modelConfigs || {}),
      [I]: {
        ...De(T.modelConfigs || {})[I] || {},
        ...K
      }
    }, pt = {
      ...De(T.delegateModelConfigs || {}),
      [G]: {
        ...De(T.delegateModelConfigs || {})[G] || {},
        ...Z
      }
    };
    return {
      ...T,
      currentPresetName: T.currentPresetName,
      presetDraftName: ce(_.querySelector("#xb-assistant-preset-name")?.value),
      provider: I,
      modelConfigs: le,
      baseUrl: K.baseUrl,
      model: K.model,
      apiKey: K.apiKey,
      temperature: K.temperature,
      sendTemperature: K.sendTemperature,
      reasoningEnabled: K.reasoningEnabled,
      reasoningEffort: K.reasoningEffort,
      toolMode: K.toolMode || T.toolMode || "native",
      tavilyApiKey: _.querySelector("#xb-assistant-tavily-api-key")?.value.trim() || "",
      tavilyBaseUrl: Ue(T.tavilyBaseUrl || "https://api.tavily.com"),
      permissionMode: en(_.querySelector("#xb-assistant-permission-mode")?.value || T.permissionMode),
      jsApiPermission: je(_.querySelector("#xb-assistant-jsapi-permission")?.value || T.jsApiPermission),
      delegatePresetName: g(_.querySelector("#xb-assistant-delegate-preset-select")?.value || T.delegatePresetName, T.currentPresetName),
      delegateProvider: G,
      delegateModelConfigs: pt,
      delegateBaseUrl: Z.baseUrl,
      delegateModel: Z.model,
      delegateApiKey: Z.apiKey,
      delegateTemperature: Z.temperature,
      delegateSendTemperature: Z.sendTemperature,
      delegateReasoningEnabled: Z.reasoningEnabled,
      delegateReasoningEffort: Z.reasoningEffort,
      delegateToolMode: Z.toolMode || T.delegateToolMode || "native"
    };
  }
  function x(_) {
    return t.configDraft = M(_), t.configDraft;
  }
  function w(_ = R()) {
    return Ir(_.provider) ? 32e3 : null;
  }
  function L(_ = R()) {
    return {
      baseUrl: String(_.baseUrl || ""),
      model: String(_.model || ""),
      apiKey: String(_.apiKey || ""),
      temperature: ke(_.temperature, 0.2),
      sendTemperature: !!(_.sendTemperature ?? !0),
      reasoningEnabled: !!_.reasoningEnabled,
      reasoningEffort: Ne(_.reasoningEffort),
      toolMode: Kt(_.provider) ? _.toolMode || "native" : void 0
    };
  }
  function P(_ = R()) {
    return {
      baseUrl: String(_.delegateBaseUrl || ""),
      model: String(_.delegateModel || ""),
      apiKey: String(_.delegateApiKey || ""),
      temperature: ke(_.delegateTemperature, 0.2),
      sendTemperature: !!(_.delegateSendTemperature ?? !0),
      reasoningEnabled: !!_.delegateReasoningEnabled,
      reasoningEffort: Ne(_.delegateReasoningEffort),
      toolMode: Kt(_.delegateProvider) ? _.delegateToolMode || "native" : void 0
    };
  }
  function N(_ = R()) {
    const T = _.delegateProvider || "openai-compatible", I = De(_.delegateModelConfigs || {});
    return {
      provider: T,
      modelConfigs: {
        ...I,
        [T]: {
          ...I[T] || {},
          ...P(_)
        }
      }
    };
  }
  function V(_ = R()) {
    return {
      provider: _.provider || "openai-compatible",
      baseUrl: _.baseUrl || "",
      model: _.model || "",
      apiKey: _.apiKey || "",
      tavilyApiKey: _.tavilyApiKey || "",
      tavilyBaseUrl: Ue(_.tavilyBaseUrl || "https://api.tavily.com"),
      temperature: _.sendTemperature === !1 ? void 0 : ke(_.temperature, 0.2),
      sendTemperature: !!(_.sendTemperature ?? !0),
      maxTokens: w(_),
      timeoutMs: Hc,
      toolMode: _.toolMode || "native",
      reasoningEnabled: !!_.reasoningEnabled,
      reasoningEffort: Ne(_.reasoningEffort)
    };
  }
  function Y(_ = R()) {
    return {
      provider: _.delegateProvider || "openai-compatible",
      baseUrl: _.delegateBaseUrl || "",
      model: _.delegateModel || "",
      apiKey: _.delegateApiKey || "",
      tavilyApiKey: _.tavilyApiKey || "",
      tavilyBaseUrl: Ue(_.tavilyBaseUrl || "https://api.tavily.com"),
      temperature: _.delegateSendTemperature === !1 ? void 0 : ke(_.delegateTemperature, 0.2),
      sendTemperature: !!(_.delegateSendTemperature ?? !0),
      maxTokens: Ir(_.delegateProvider) ? 32e3 : null,
      timeoutMs: Hc,
      toolMode: _.delegateToolMode || "native",
      reasoningEnabled: !!_.delegateReasoningEnabled,
      reasoningEffort: Ne(_.delegateReasoningEffort)
    };
  }
  function j(_ = {}) {
    const T = (_.role === "delegate", R());
    return _.role === "delegate" ? Y(T) : V(T);
  }
  function ee(_) {
    R(), t.configDraft = {
      ...t.configDraft,
      presetDraftName: ce(_.querySelector("#xb-assistant-preset-name")?.value)
    };
  }
  function Q(_ = R(), T = _.provider || "openai-compatible", I = "main") {
    const G = p(T, I);
    return typeof u == "function" ? u({
      state: t,
      draft: _,
      provider: T,
      pullState: G,
      providerLabel: Yc(T)
    }) : `预设「${_.currentPresetName || "默认"}」 · ${Yc(T)}`;
  }
  function X(_, T, I) {
    const G = _?.querySelector?.(T);
    if (!G) return;
    const K = String(I?.status || "idle"), Z = String(I?.message || "").trim();
    G.textContent = Z, G.hidden = !Z, G.classList.toggle("is-loading", K === "loading"), G.classList.toggle("is-success", K === "success"), G.classList.toggle("is-error", K === "error");
  }
  function he(_) {
    if (!_) return;
    const T = Qo(t.configPage);
    t.configPage = T, _.querySelectorAll("[data-config-page]").forEach((I) => {
      const G = Qo(I?.dataset?.configPage) === T;
      I.classList.toggle("is-active", G), I.setAttribute("aria-selected", G ? "true" : "false");
    }), _.querySelectorAll("[data-config-page-panel]").forEach((I) => {
      const G = Qo(I?.dataset?.configPagePanel) === T;
      I.toggleAttribute("hidden", !G);
    }), _.querySelector("#xb-assistant-delete-preset")?.toggleAttribute("hidden", T === "delegate");
  }
  function ft(_) {
    if (!t.config) return;
    he(_);
    const T = R(), I = T.provider || "openai-compatible", G = m(I), K = T.delegateProvider || "openai-compatible", Z = m(K, "delegate"), le = _.querySelector("#xb-assistant-tool-mode-wrap"), pt = _.querySelector("#xb-assistant-tool-mode"), vn = _.querySelector("#xb-assistant-reasoning-enabled"), Xi = _.querySelector("#xb-assistant-reasoning-effort-wrap"), wa = _.querySelector("#xb-assistant-reasoning-effort"), Qi = _.querySelector("#xb-assistant-permission-mode"), Zi = _.querySelector("#xb-assistant-jsapi-permission"), Aa = _.querySelector("#xb-assistant-model-pulled"), ji = _.querySelector("#xb-assistant-preset-select"), Ca = _.querySelector("#xb-assistant-preset-name"), es = _.querySelector("#xb-assistant-delegate-preset-select"), Ia = _.querySelector("#xb-assistant-delegate-provider"), ba = _.querySelector("#xb-assistant-delegate-base-url"), Ra = _.querySelector("#xb-assistant-delegate-model"), Pa = _.querySelector("#xb-assistant-delegate-api-key"), xa = _.querySelector("#xb-assistant-tavily-api-key"), ts = _.querySelector("#xb-assistant-delegate-model-pulled"), Ma = _.querySelector("#xb-assistant-delegate-tool-mode-wrap"), ns = _.querySelector("#xb-assistant-delegate-tool-mode"), Na = _.querySelector("#xb-assistant-delegate-reasoning-enabled"), ka = _.querySelector("#xb-assistant-delegate-reasoning-effort-wrap"), os = _.querySelector("#xb-assistant-delegate-reasoning-effort");
    if (!ji || !Ca) return;
    const Da = (t.config.presetNames || []).map(($e) => ({
      value: $e,
      label: $e
    }));
    Ze(ji, Da), ji.value = T.currentPresetName || t.config.currentPresetName || "默认", es && (Ze(es, Da), es.value = g(T.delegatePresetName, T.currentPresetName)), Ca.value = T.presetDraftName || T.currentPresetName || "默认", _.querySelector("#xb-assistant-provider").value = I, _.querySelector("#xb-assistant-base-url").value = T.baseUrl || "", _.querySelector("#xb-assistant-model").value = T.model || "", _.querySelector("#xb-assistant-api-key").value = T.apiKey || "", _.querySelector("#xb-assistant-temperature").value = String(ke(T.temperature, 0.2)), _.querySelector("#xb-assistant-send-temperature").checked = !!(T.sendTemperature ?? !0), xa && (xa.value = T.tavilyApiKey || ""), le.style.display = Kt(I) ? "" : "none", Ze(pt, Jc), pt.value = T.toolMode || "native", Qi && (Ze(Qi, fm), Qi.value = en(T.permissionMode)), Zi && (Ze(Zi, pm), Zi.value = je(T.jsApiPermission)), Ze(wa, Cr), vn.checked = !!T.reasoningEnabled, wa.value = Ne(T.reasoningEffort), Xi.style.display = vn.checked ? "" : "none", Ze(Aa, G.map(($e) => ({
      value: $e,
      label: $e
    })), "手动填写"), Aa.value = G.includes(T.model) ? T.model : "", Ia && (Ia.value = K), ba && (ba.value = T.delegateBaseUrl || ""), Ra && (Ra.value = T.delegateModel || ""), Pa && (Pa.value = T.delegateApiKey || "");
    const Ua = _.querySelector("#xb-assistant-delegate-temperature"), La = _.querySelector("#xb-assistant-delegate-send-temperature");
    Ua && (Ua.value = String(ke(T.delegateTemperature, 0.2))), La && (La.checked = !!(T.delegateSendTemperature ?? !0)), Ma && (Ma.style.display = Kt(K) ? "" : "none"), ns && (Ze(ns, Jc), ns.value = T.delegateToolMode || "native"), os && (Ze(os, Cr), os.value = Ne(T.delegateReasoningEffort)), Na && (Na.checked = !!T.delegateReasoningEnabled), ka && (ka.style.display = T.delegateReasoningEnabled ? "" : "none"), ts && (Ze(ts, Z.map(($e) => ({
      value: $e,
      label: $e
    })), "手动填写"), ts.value = Z.includes(T.delegateModel) ? T.delegateModel : ""), X(_, "#xb-assistant-model-pull-status", p(I)), X(_, "#xb-assistant-delegate-model-pull-status", p(K, "delegate"));
    const $a = _.querySelector("#xb-assistant-runtime");
    if ($a) {
      const $e = t.configPage === "delegate";
      $a.textContent = Q($e ? {
        ...T,
        currentPresetName: "分身",
        provider: K
      } : T, $e ? K : I, $e ? "delegate" : "main");
    }
  }
  function Xe(_) {
    if (typeof s != "function") return;
    const T = s(_);
    T && typeof T.catch == "function" && T.catch((I) => {
      o?.(a(I));
    });
  }
  function ye(_, T, I) {
    _.querySelector(T)?.addEventListener("click", () => {
      const G = _.querySelector(I);
      G && (G.type = G.type === "password" ? "text" : "password");
    });
  }
  function _n(_) {
    const T = x(_), I = ce(T.presetDraftName), G = ce(T.currentPresetName || t.config?.currentPresetName || "默认"), K = (t.config?.presets || {})[G] || Ee(), Z = De(T.modelConfigs || K.modelConfigs || {}), le = {
      ...K,
      provider: T.provider,
      permissionMode: en(T.permissionMode),
      modelConfigs: {
        ...Z,
        [T.provider]: {
          ...Z[T.provider] || {},
          ...L(T)
        }
      }
    }, pt = {
      ...t.config?.presets || {},
      [I]: le
    };
    t.config = Zo({
      ...t.config,
      jsApiPermission: je(T.jsApiPermission),
      tavilyApiKey: String(T.tavilyApiKey || ""),
      tavilyBaseUrl: Ue(T.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: I,
      delegatePresetName: g(T.delegatePresetName, I),
      delegateConfig: N(T),
      presets: pt
    }), t.configDraft = C(I, le, t.config), c(), Xe({
      requestId: i("save-config"),
      config: t.config,
      payload: {
        workspaceFileName: t.config?.workspaceFileName || "",
        jsApiPermission: je(t.config?.jsApiPermission),
        tavilyApiKey: String(t.config?.tavilyApiKey || ""),
        tavilyBaseUrl: Ue(t.config?.tavilyBaseUrl || "https://api.tavily.com"),
        currentPresetName: t.config?.currentPresetName || "默认",
        delegatePresetName: t.config?.delegatePresetName || t.config?.currentPresetName || "默认",
        delegateConfig: t.config?.delegateConfig || {},
        presets: t.config?.presets || {}
      }
    });
  }
  function tm(_) {
    if (Object.keys(t.config?.presets || {}).length <= 1) {
      o?.("至少要保留一套预设");
      return;
    }
    const T = x(_), I = ce(t.configDraft?.currentPresetName || t.config?.currentPresetName || "默认"), G = { ...t.config?.presets || {} };
    delete G[I];
    const K = Object.keys(G)[0] || "默认", Z = G[K] || Ee();
    t.config = Zo({
      ...t.config,
      jsApiPermission: je(T.jsApiPermission),
      tavilyApiKey: String(T.tavilyApiKey || t.config?.tavilyApiKey || ""),
      tavilyBaseUrl: Ue(T.tavilyBaseUrl || t.config?.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: K,
      delegatePresetName: g(T.delegatePresetName, K),
      delegateConfig: N(T),
      presets: G
    }), t.configDraft = C(K, Z, t.config), c(), Xe({
      requestId: i("delete-preset"),
      config: t.config,
      payload: {
        workspaceFileName: t.config?.workspaceFileName || "",
        jsApiPermission: je(t.config?.jsApiPermission),
        tavilyApiKey: String(t.config?.tavilyApiKey || ""),
        tavilyBaseUrl: Ue(t.config?.tavilyBaseUrl || "https://api.tavily.com"),
        currentPresetName: t.config?.currentPresetName || "默认",
        delegatePresetName: t.config?.delegatePresetName || t.config?.currentPresetName || "默认",
        delegateConfig: t.config?.delegateConfig || {},
        presets: t.config?.presets || {}
      }
    }), n?.();
  }
  function nm(_) {
    _?.querySelector?.("#xb-assistant-provider") && (_.querySelector("#xb-assistant-provider").addEventListener("change", (T) => {
      const I = T.currentTarget.value, G = x(_);
      t.configDraft = {
        ...G,
        provider: I,
        ...v(I, G.modelConfigs)
      }, c(), n?.();
    }), _.querySelector("#xb-assistant-preset-select").addEventListener("change", (T) => {
      const I = ce(T.currentTarget.value), G = (t.config?.presets || {})[I] || Ee(), K = x(_);
      t.config = Zo({
        ...t.config,
        jsApiPermission: je(K.jsApiPermission),
        currentPresetName: I,
        delegatePresetName: g(K.delegatePresetName, I),
        delegateConfig: N(K)
      }), t.configDraft = C(I, G, t.config), c(), n?.();
    }), _.querySelector("#xb-assistant-preset-name").addEventListener("input", () => {
      ee(_);
    }), _.querySelector("#xb-assistant-base-url").addEventListener("input", () => {
      x(_);
    }), _.querySelector("#xb-assistant-model").addEventListener("input", () => {
      x(_);
    }), _.querySelector("#xb-assistant-api-key").addEventListener("input", () => {
      x(_);
    }), _.querySelector("#xb-assistant-temperature")?.addEventListener("input", () => {
      x(_);
    }), _.querySelector("#xb-assistant-send-temperature")?.addEventListener("change", () => {
      x(_);
    }), _.querySelector("#xb-assistant-tavily-api-key")?.addEventListener("input", () => {
      x(_);
    }), _.querySelector("#xb-assistant-model-pulled").addEventListener("change", (T) => {
      const I = T.currentTarget.value;
      I && (_.querySelector("#xb-assistant-model").value = I, x(_));
    }), ye(_, "#xb-assistant-toggle-key", "#xb-assistant-api-key"), ye(_, "#xb-assistant-toggle-tavily-key", "#xb-assistant-tavily-api-key"), _.querySelector("#xb-assistant-delegate-provider")?.addEventListener("change", (T) => {
      const I = x(_), G = T.currentTarget.value;
      t.configDraft = {
        ...I,
        delegateProvider: G,
        ...A(G, I.delegateModelConfigs)
      }, c(), n?.();
    }), _.querySelector("#xb-assistant-delegate-base-url")?.addEventListener("input", () => {
      x(_);
    }), _.querySelector("#xb-assistant-delegate-model")?.addEventListener("input", () => {
      x(_);
    }), _.querySelector("#xb-assistant-delegate-api-key")?.addEventListener("input", () => {
      x(_);
    }), _.querySelector("#xb-assistant-delegate-temperature")?.addEventListener("input", () => {
      x(_);
    }), _.querySelector("#xb-assistant-delegate-send-temperature")?.addEventListener("change", () => {
      x(_);
    }), _.querySelector("#xb-assistant-delegate-model-pulled")?.addEventListener("change", (T) => {
      const I = T.currentTarget.value;
      if (!I) return;
      const G = _.querySelector("#xb-assistant-delegate-model");
      G && (G.value = I), x(_);
    }), ye(_, "#xb-assistant-delegate-toggle-key", "#xb-assistant-delegate-api-key"), _.querySelector("#xb-assistant-reasoning-enabled").addEventListener("change", () => {
      x(_), c(), n?.();
    }), _.querySelector("#xb-assistant-reasoning-effort").addEventListener("change", () => {
      x(_);
    }), _.querySelector("#xb-assistant-tool-mode").addEventListener("change", () => {
      x(_);
    }), _.querySelector("#xb-assistant-delegate-reasoning-enabled")?.addEventListener("change", () => {
      x(_), c(), n?.();
    }), _.querySelector("#xb-assistant-delegate-reasoning-effort")?.addEventListener("change", () => {
      x(_);
    }), _.querySelector("#xb-assistant-delegate-tool-mode")?.addEventListener("change", () => {
      x(_);
    }), _.querySelector("#xb-assistant-permission-mode")?.addEventListener("change", () => {
      x(_);
    }), _.querySelector("#xb-assistant-jsapi-permission")?.addEventListener("change", () => {
      x(_);
    }), _.querySelector("#xb-assistant-delegate-preset-select")?.addEventListener("change", (T) => {
      const I = g(T.currentTarget?.value, t.configDraft?.currentPresetName || t.config?.currentPresetName || "默认"), G = (t.config?.presets || {})[I] || Ee();
      t.configDraft = {
        ...x(_),
        ...y(I, G)
      }, c(), n?.();
    }), _.querySelectorAll("[data-config-page]").forEach((T) => {
      T.addEventListener("click", (I) => {
        x(_), t.configPage = Qo(I.currentTarget?.dataset?.configPage), he(_), ft(_);
      });
    }), _.querySelector("#xb-assistant-pull-models").addEventListener("click", async () => {
      x(_), c();
      const T = j();
      f(T.provider, {
        status: "loading",
        message: "正在拉取模型列表…"
      }), n?.();
      try {
        const I = await zc(T);
        h(T.provider, I), f(T.provider, {
          status: "success",
          message: `已拉取 ${I.length} 个模型`
        });
      } catch (I) {
        h(T.provider, []), f(T.provider, {
          status: "error",
          message: a(I)
        });
      }
      c(), n?.();
    }), _.querySelector("#xb-assistant-delegate-pull-models")?.addEventListener("click", async () => {
      x(_), c();
      const T = j({ role: "delegate" });
      f(T.provider, {
        status: "loading",
        message: "正在拉取模型列表…"
      }, "delegate"), n?.();
      try {
        const I = await zc(T);
        h(T.provider, I, "delegate"), f(T.provider, {
          status: "success",
          message: `已拉取 ${I.length} 个模型`
        }, "delegate");
      } catch (I) {
        h(T.provider, [], "delegate"), f(T.provider, {
          status: "error",
          message: a(I)
        }, "delegate");
      }
      c(), n?.();
    }), _.querySelector("#xb-assistant-save").addEventListener("click", () => {
      _n(_);
    }), _.querySelector("#xb-assistant-delete-preset").addEventListener("click", () => {
      tm(_);
    }));
  }
  return {
    getActiveProviderConfig: j,
    syncConfigToForm: ft,
    bindSettingsPanelEvents: nm
  };
}
function hi(e = "") {
  return String(e || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function s0(e = {}) {
  const t = String(e?.status || "idle");
  return t === "saving" ? {
    className: "xb-assistant-save-button is-saving",
    title: "正在保存配置",
    html: '<span class="xb-assistant-save-spinner" aria-hidden="true"></span>保存中...'
  } : t === "success" ? {
    className: "xb-assistant-save-button is-success",
    title: "配置已保存",
    html: "已保存"
  } : t === "error" ? {
    className: "xb-assistant-save-button is-error",
    title: hi(e?.error || "保存失败"),
    html: "保存失败"
  } : {
    className: "xb-assistant-save-button",
    title: "保存配置",
    html: "保存配置"
  };
}
function c0(e = {}) {
  const { configSave: t = {}, runtimeText: n = "", inlineToastText: o = "", showInlineToast: i = !0, showAssistantPermissions: s = !0, showDelegateSettings: a = !0, activePage: u = "main", delegatePresetHint: c = "DelegateRun 分身会使用这里的独立 API 配置；可以和主助手使用不同 Provider、Base URL、模型和 Tool 调用格式。", isBusy: d = !1, canDeletePreset: p = !0 } = e, f = s0(t), h = d || String(t?.status || "") === "saving" ? "disabled" : "", m = d || !p ? "disabled" : "", g = u === "delegate" ? "delegate" : "main", y = g === "main", v = g === "delegate", A = s ? `
            <label>
                <span>斜杠命令权限</span>
                <select id="xb-assistant-permission-mode"></select>
            </label>
            <label>
                <span>JavaScript API 权限</span>
                <select id="xb-assistant-jsapi-permission"></select>
            </label>` : "", C = a ? `
            <div class="xb-assistant-config-tabs" role="tablist" aria-label="API 配置分页">
                <button id="xb-assistant-config-tab-main" type="button" class="xb-assistant-config-tab ${y ? "is-active" : ""}" data-config-page="main" role="tab" aria-selected="${y ? "true" : "false"}">主助手 API</button>
                <button id="xb-assistant-config-tab-delegate" type="button" class="xb-assistant-config-tab ${v ? "is-active" : ""}" data-config-page="delegate" role="tab" aria-selected="${v ? "true" : "false"}">分身 API</button>
            </div>` : "", R = a ? `
            <div class="xb-assistant-config-page" data-config-page-panel="delegate" ${v ? "" : "hidden"}>
                <p class="xb-assistant-config-note">${hi(c)}</p>
                <label>
                    <span>已存预设</span>
                    <select id="xb-assistant-delegate-preset-select"></select>
                </label>
                <label>
                    <span>Provider</span>
                    <select id="xb-assistant-delegate-provider">
                        <option value="openai-responses">OpenAI Responses</option>
                        <option value="openai-compatible">OpenAI-compatible</option>
                        <option value="sillytavern-openai-compatible">SillyTavern OpenAI-compatible</option>
                        <option value="sillytavern-claude">SillyTavern Claude</option>
                        <option value="sillytavern-google">SillyTavern Google AI</option>
                        <option value="anthropic">Anthropic</option>
                        <option value="google">Google AI</option>
                    </select>
                </label>
                <label>
                    <span>Base URL</span>
                    <input id="xb-assistant-delegate-base-url" type="text" />
                </label>
                <label>
                    <span>API Key</span>
                    <div class="xb-assistant-inline-input">
                        <input id="xb-assistant-delegate-api-key" type="password" />
                        <button id="xb-assistant-delegate-toggle-key" type="button" class="secondary ghost">显示</button>
                    </div>
                </label>
                <label>
                    <span>Model</span>
                    <input id="xb-assistant-delegate-model" type="text" />
                </label>
                <div class="xb-assistant-temperature-row">
                    <label>
                        <span>温度</span>
                        <input id="xb-assistant-delegate-temperature" type="number" min="0" max="2" step="0.05" />
                    </label>
                    <label class="xb-assistant-checkbox-row">
                        <span>允许传参</span>
                        <span class="xb-assistant-checkbox-control">
                            <input id="xb-assistant-delegate-send-temperature" type="checkbox" />
                        </span>
                    </label>
                </div>
                <div class="xb-assistant-inline-input xb-assistant-model-row">
                    <label class="xb-assistant-grow">
                        <span>已拉取模型</span>
                        <select id="xb-assistant-delegate-model-pulled">
                            <option value="">手动填写</option>
                        </select>
                    </label>
                    <button id="xb-assistant-delegate-pull-models" type="button" class="secondary" ${d ? "disabled" : ""}>拉取模型</button>
                </div>
                <div class="xb-assistant-inline-status" id="xb-assistant-delegate-model-pull-status" aria-live="polite" hidden></div>
                <label id="xb-assistant-delegate-tool-mode-wrap">
                    <span>Tool 调用格式</span>
                    <select id="xb-assistant-delegate-tool-mode"></select>
                </label>
                <label class="xb-assistant-checkbox-row">
                    <span>
                        Reasoning参数
                        <small>需 API 支持，否则报错</small>
                    </span>
                    <span class="xb-assistant-checkbox-control">
                        <input id="xb-assistant-delegate-reasoning-enabled" type="checkbox" />
                        <span>开启</span>
                    </span>
                </label>
                <label id="xb-assistant-delegate-reasoning-effort-wrap">
                    <span>思考强度</span>
                    <select id="xb-assistant-delegate-reasoning-effort"></select>
                </label>
            </div>` : "";
  return `
        <section class="xb-assistant-config">
            ${C}
            <div class="xb-assistant-config-page" data-config-page-panel="main" ${y ? "" : "hidden"}>
            <label>
                <span>已存预设</span>
                <select id="xb-assistant-preset-select"></select>
            </label>
            <label>
                <span>预设名称</span>
                <input id="xb-assistant-preset-name" type="text" placeholder="例如：OpenAI 测试号" />
            </label>
            <label>
                <span>Provider</span>
                <select id="xb-assistant-provider">
                    <option value="openai-responses">OpenAI Responses</option>
                    <option value="openai-compatible">OpenAI-compatible</option>
                    <option value="sillytavern-openai-compatible">SillyTavern OpenAI-compatible</option>
                    <option value="sillytavern-claude">SillyTavern Claude</option>
                    <option value="sillytavern-google">SillyTavern Google AI</option>
                    <option value="anthropic">Anthropic</option>
                    <option value="google">Google AI</option>
                </select>
            </label>
            <label>
                <span>Base URL</span>
                <input id="xb-assistant-base-url" type="text" />
            </label>
            <label>
                <span>API Key</span>
                <div class="xb-assistant-inline-input">
                    <input id="xb-assistant-api-key" type="password" />
                    <button id="xb-assistant-toggle-key" type="button" class="secondary ghost">显示</button>
                </div>
            </label>
            <label>
                <span>Model</span>
                <input id="xb-assistant-model" type="text" />
            </label>
            <div class="xb-assistant-temperature-row">
                <label>
                    <span>温度</span>
                    <input id="xb-assistant-temperature" type="number" min="0" max="2" step="0.05" />
                </label>
                <label class="xb-assistant-checkbox-row">
                    <span>允许传参</span>
                    <span class="xb-assistant-checkbox-control">
                        <input id="xb-assistant-send-temperature" type="checkbox" />
                    </span>
                </label>
            </div>
            <div class="xb-assistant-inline-input xb-assistant-model-row">
                <label class="xb-assistant-grow">
                    <span>已拉取模型</span>
                    <select id="xb-assistant-model-pulled">
                        <option value="">手动填写</option>
                    </select>
                </label>
                <button id="xb-assistant-pull-models" type="button" class="secondary" ${d ? "disabled" : ""}>拉取模型</button>
            </div>
            <div class="xb-assistant-inline-status" id="xb-assistant-model-pull-status" aria-live="polite" hidden></div>
            <label>
                <span>Tavily API Key（全局）</span>
                <div class="xb-assistant-inline-input">
                    <input id="xb-assistant-tavily-api-key" type="password" />
                    <button id="xb-assistant-toggle-tavily-key" type="button" class="secondary ghost">显示</button>
                </div>
            </label>
            <label id="xb-assistant-tool-mode-wrap">
                <span>Tool 调用格式</span>
                <select id="xb-assistant-tool-mode"></select>
            </label>
            ${A}
            <label class="xb-assistant-checkbox-row">
                <span>
                    Reasoning参数
                    <small>需 API 支持，否则报错</small>
                </span>
                <span class="xb-assistant-checkbox-control">
                    <input id="xb-assistant-reasoning-enabled" type="checkbox" />
                    <span>开启</span>
                </span>
            </label>
            <label id="xb-assistant-reasoning-effort-wrap">
                <span>思考强度</span>
                <select id="xb-assistant-reasoning-effort"></select>
            </label>
            </div>
            ${R}
            <div class="xb-assistant-actions">
                <button id="xb-assistant-save" type="button" class="${f.className}" title="${f.title}" ${h}>${f.html}</button>
                <button id="xb-assistant-delete-preset" type="button" class="secondary" ${m} ${v ? "hidden" : ""}>删除配置</button>
            </div>
            <div class="xb-assistant-runtime" id="xb-assistant-runtime">${hi(n)}</div>
            ${i ? `<div class="xb-assistant-toast xb-assistant-toast-inline" id="xb-assistant-toast" aria-live="polite">${hi(o)}</div>` : ""}
        </section>
    `;
}
var r0 = [
  "你是小白X“四次元壁”的交流生成器。",
  "只完成本轮四次元壁回复，不调用工具，不编造外部事实。",
  "严格遵循后续提示词里的输出格式，优先输出可被解析的 <thinking> 与 <msg> 内容。"
].join(`
`);
function a0(e = {}) {
  return {
    msg1: String(e.msg1 || "").trim(),
    msg2: String(e.msg2 || "").trim(),
    msg3: String(e.msg3 || "").trim(),
    msg4: String(e.msg4 || "").trim()
  };
}
function l0(e = {}, t = {}) {
  const { msg1: n, msg2: o, msg3: i, msg4: s } = a0(e);
  return [
    n ? {
      role: "user",
      content: n
    } : null,
    o ? {
      role: "assistant",
      content: o
    } : null,
    i ? {
      role: "user",
      content: i
    } : null,
    s && !t.disableAssistantPrefill ? {
      role: "assistant",
      content: s
    } : null
  ].filter(Boolean);
}
function d0(e = {}) {
  dI(typeof e.requestHeadersProvider == "function" ? e.requestHeadersProvider : null);
}
async function f0(e = {}) {
  const t = JI(ym(e.config || {})), n = WI(t, { missingApiKeyMessage: "请先在小白agent的 API配置 里填写当前预设的 API Key。" }), o = !!e.stream && typeof e.onStreamProgress == "function", i = await n.chat({
    systemPrompt: r0,
    messages: l0(e.builtPrompt || {}, { disableAssistantPrefill: !!e.disableAssistantPrefill }),
    tools: [],
    temperature: t.temperature,
    maxTokens: t.maxTokens,
    reasoning: {
      enabled: t.reasoningEnabled,
      effort: t.reasoningEffort
    },
    signal: e.signal,
    onStreamProgress: o ? e.onStreamProgress : void 0
  });
  return {
    text: String(i?.text || ""),
    thoughts: Array.isArray(i?.thoughts) ? i.thoughts : [],
    provider: i?.provider || t.provider,
    model: i?.model || t.model,
    finishReason: i?.finishReason || ""
  };
}
export {
  c0 as buildAgentSettingsPanelMarkup,
  d0 as configureFourthWallAgent,
  u0 as createAgentSettingsPanel,
  f0 as generateFourthWallResponse,
  Zo as normalizeAgentConfig
};
