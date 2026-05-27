/* eslint-disable */
var gS = Object.create, Ny = Object.defineProperty, yS = Object.getOwnPropertyDescriptor, vS = Object.getOwnPropertyNames, _S = Object.getPrototypeOf, wS = Object.prototype.hasOwnProperty, Ol = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), ES = (e, t, n, r) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (var o = vS(t), i = 0, s = o.length, a; i < s; i++)
      a = o[i], !wS.call(e, a) && a !== n && Ny(e, a, {
        get: ((u) => t[u]).bind(null, a),
        enumerable: !(r = yS(t, a)) || r.enumerable
      });
  return e;
}, TS = (e, t, n) => (n = e != null ? gS(_S(e)) : {}, ES(t || !e || !e.__esModule ? Ny(n, "default", {
  value: e,
  enumerable: !0
}) : n, e));
// @__NO_SIDE_EFFECTS__
function Bl(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
var Ne = {}, Io = [], En = () => {
}, ky = () => !1, Gl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Vl = (e) => e.startsWith("onUpdate:"), Qe = Object.assign, Hf = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, SS = Object.prototype.hasOwnProperty, Pe = (e, t) => SS.call(e, t), he = Array.isArray, Ro = (e) => bs(e) === "[object Map]", Hl = (e) => bs(e) === "[object Set]", Ah = (e) => bs(e) === "[object Date]", ve = (e) => typeof e == "function", Fe = (e) => typeof e == "string", Sn = (e) => typeof e == "symbol", Me = (e) => e !== null && typeof e == "object", Dy = (e) => (Me(e) || ve(e)) && ve(e.then) && ve(e.catch), Ly = Object.prototype.toString, bs = (e) => Ly.call(e), AS = (e) => bs(e).slice(8, -1), Uy = (e) => bs(e) === "[object Object]", qf = (e) => Fe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ki = /* @__PURE__ */ Bl(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), ql = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, CS = /-\w/g, en = ql((e) => e.replace(CS, (t) => t.slice(1).toUpperCase())), bS = /\B([A-Z])/g, Qr = ql((e) => e.replace(bS, "-$1").toLowerCase()), $y = ql((e) => e.charAt(0).toUpperCase() + e.slice(1)), Tu = ql((e) => e ? `on${$y(e)}` : ""), _n = (e, t) => !Object.is(e, t), Pa = (e, ...t) => {
  for (let n = 0; n < e.length; n++) e[n](...t);
}, Fy = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, Kl = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Ch, Jl = () => Ch || (Ch = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {});
function Kf(e) {
  if (he(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = Fe(r) ? xS(r) : Kf(r);
      if (o) for (const i in o) t[i] = o[i];
    }
    return t;
  } else if (Fe(e) || Me(e)) return e;
}
var IS = /;(?![^(]*\))/g, RS = /:([^]+)/, PS = /\/\*[^]*?\*\//g;
function xS(e) {
  const t = {};
  return e.replace(PS, "").split(IS).forEach((n) => {
    if (n) {
      const r = n.split(RS);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function cs(e) {
  let t = "";
  if (Fe(e)) t = e;
  else if (he(e)) for (let n = 0; n < e.length; n++) {
    const r = cs(e[n]);
    r && (t += r + " ");
  }
  else if (Me(e))
    for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
var Oy = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", MS = /* @__PURE__ */ Bl(Oy), tO = /* @__PURE__ */ Bl(Oy + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
function By(e) {
  return !!e || e === "";
}
function NS(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++) n = Is(e[r], t[r]);
  return n;
}
function Is(e, t) {
  if (e === t) return !0;
  let n = Ah(e), r = Ah(t);
  if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
  if (n = Sn(e), r = Sn(t), n || r) return e === t;
  if (n = he(e), r = he(t), n || r) return n && r ? NS(e, t) : !1;
  if (n = Me(e), r = Me(t), n || r) {
    if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const o in e) {
      const i = e.hasOwnProperty(o), s = t.hasOwnProperty(o);
      if (i && !s || !i && s || !Is(e[o], t[o])) return !1;
    }
  }
  return String(e) === String(t);
}
function kS(e, t) {
  return e.findIndex((n) => Is(n, t));
}
var Gy = (e) => !!(e && e.__v_isRef === !0), se = (e) => Fe(e) ? e : e == null ? "" : he(e) || Me(e) && (e.toString === Ly || !ve(e.toString)) ? Gy(e) ? se(e.value) : JSON.stringify(e, Vy, 2) : String(e), Vy = (e, t) => Gy(t) ? Vy(e, t.value) : Ro(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, o], i) => (n[Su(r, i) + " =>"] = o, n), {}) } : Hl(t) ? { [`Set(${t.size})`]: [...t.values()].map((n) => Su(n)) } : Sn(t) ? Su(t) : Me(t) && !he(t) && !Uy(t) ? String(t) : t, Su = (e, t = "") => {
  var n;
  return Sn(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
}, ot, DS = class {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && ot && (ot.active ? (this.parent = ot, this.index = (ot.scopes || (ot.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let e, t;
      if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].pause();
      for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let e, t;
      if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].resume();
      for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].resume();
    }
  }
  run(e) {
    if (this._active) {
      const t = ot;
      try {
        return ot = this, e();
      } finally {
        ot = t;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = ot, ot = this);
  }
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (ot === this) ot = this.prevScope;
      else {
        let e = ot;
        for (; e; ) {
          if (e.prevScope === this) {
            e.prevScope = this.prevScope;
            break;
          }
          e = e.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(e) {
    if (this._active) {
      this._active = !1;
      let t, n;
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
      for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
      if (this.cleanups.length = 0, this.scopes) {
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !e) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
};
function LS() {
  return ot;
}
var ke, Au = /* @__PURE__ */ new WeakSet(), Hy = class {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ot && (ot.active ? ot.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Au.has(this) && (Au.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ky(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, bh(this), Jy(this);
    const e = ke, t = tn;
    ke = this, tn = !0;
    try {
      return this.fn();
    } finally {
      Wy(this), ke = e, tn = t, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep) Yf(e);
      this.deps = this.depsTail = void 0, bh(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Au.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    yc(this) && this.run();
  }
  get dirty() {
    return yc(this);
  }
}, qy = 0, Ji, Wi;
function Ky(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Wi, Wi = e;
    return;
  }
  e.next = Ji, Ji = e;
}
function Jf() {
  qy++;
}
function Wf() {
  if (--qy > 0) return;
  if (Wi) {
    let t = Wi;
    for (Wi = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Ji; ) {
    let t = Ji;
    for (Ji = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
        t.trigger();
      } catch (r) {
        e || (e = r);
      }
      t = n;
    }
  }
  if (e) throw e;
}
function Jy(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Wy(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), Yf(r), US(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = o;
  }
  e.deps = t, e.depsTail = n;
}
function yc(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Yy(t.dep.computed) || t.dep.version !== t.version)) return !0;
  return !!e._dirty;
}
function Yy(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === fs) || (e.globalVersion = fs, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !yc(e)))) return;
  e.flags |= 2;
  const t = e.dep, n = ke, r = tn;
  ke = e, tn = !0;
  try {
    Jy(e);
    const o = e.fn(e._value);
    (t.version === 0 || _n(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    ke = n, tn = r, Wy(e), e.flags &= -3;
  }
}
function Yf(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (r && (r.nextSub = o, e.prevSub = void 0), o && (o.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep) Yf(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function US(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var tn = !0, zy = [];
function Vn() {
  zy.push(tn), tn = !1;
}
function Hn() {
  const e = zy.pop();
  tn = e === void 0 ? !0 : e;
}
function bh(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ke;
    ke = void 0;
    try {
      t();
    } finally {
      ke = n;
    }
  }
}
var fs = 0, $S = class {
  constructor(e, t) {
    this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}, zf = class {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!ke || !tn || ke === this.computed) return;
    let t = this.activeLink;
    if (t === void 0 || t.sub !== ke)
      t = this.activeLink = new $S(ke, this), ke.deps ? (t.prevDep = ke.depsTail, ke.depsTail.nextDep = t, ke.depsTail = t) : ke.deps = ke.depsTail = t, Xy(t);
    else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
      const n = t.nextDep;
      n.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = n), t.prevDep = ke.depsTail, t.nextDep = void 0, ke.depsTail.nextDep = t, ke.depsTail = t, ke.deps === t && (ke.deps = n);
    }
    return t;
  }
  trigger(e) {
    this.version++, fs++, this.notify(e);
  }
  notify(e) {
    Jf();
    try {
      for (let t = this.subs; t; t = t.prevSub) t.sub.notify() && t.sub.dep.notify();
    } finally {
      Wf();
    }
  }
};
function Xy(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep) Xy(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
var vc = /* @__PURE__ */ new WeakMap(), Or = /* @__PURE__ */ Symbol(""), _c = /* @__PURE__ */ Symbol(""), ds = /* @__PURE__ */ Symbol("");
function ut(e, t, n) {
  if (tn && ke) {
    let r = vc.get(e);
    r || vc.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || (r.set(n, o = new zf()), o.map = r, o.key = n), o.track();
  }
}
function $n(e, t, n, r, o, i) {
  const s = vc.get(e);
  if (!s) {
    fs++;
    return;
  }
  const a = (u) => {
    u && u.trigger();
  };
  if (Jf(), t === "clear") s.forEach(a);
  else {
    const u = he(e), f = u && qf(n);
    if (u && n === "length") {
      const d = Number(r);
      s.forEach((h, p) => {
        (p === "length" || p === ds || !Sn(p) && p >= d) && a(h);
      });
    } else
      switch ((n !== void 0 || s.has(void 0)) && a(s.get(n)), f && a(s.get(ds)), t) {
        case "add":
          u ? f && a(s.get("length")) : (a(s.get(Or)), Ro(e) && a(s.get(_c)));
          break;
        case "delete":
          u || (a(s.get(Or)), Ro(e) && a(s.get(_c)));
          break;
        case "set":
          Ro(e) && a(s.get(Or));
          break;
      }
  }
  Wf();
}
function to(e) {
  const t = /* @__PURE__ */ Re(e);
  return t === e ? t : (ut(t, "iterate", ds), /* @__PURE__ */ qt(e) ? t : t.map(on));
}
function Wl(e) {
  return ut(e = /* @__PURE__ */ Re(e), "iterate", ds), e;
}
function yn(e, t) {
  return /* @__PURE__ */ qn(e) ? Uo(/* @__PURE__ */ Br(e) ? on(t) : t) : on(t);
}
var FS = {
  __proto__: null,
  [Symbol.iterator]() {
    return Cu(this, Symbol.iterator, (e) => yn(this, e));
  },
  concat(...e) {
    return to(this).concat(...e.map((t) => he(t) ? to(t) : t));
  },
  entries() {
    return Cu(this, "entries", (e) => (e[1] = yn(this, e[1]), e));
  },
  every(e, t) {
    return Rn(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Rn(this, "filter", e, t, (n) => n.map((r) => yn(this, r)), arguments);
  },
  find(e, t) {
    return Rn(this, "find", e, t, (n) => yn(this, n), arguments);
  },
  findIndex(e, t) {
    return Rn(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Rn(this, "findLast", e, t, (n) => yn(this, n), arguments);
  },
  findLastIndex(e, t) {
    return Rn(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return Rn(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return bu(this, "includes", e);
  },
  indexOf(...e) {
    return bu(this, "indexOf", e);
  },
  join(e) {
    return to(this).join(e);
  },
  lastIndexOf(...e) {
    return bu(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Rn(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return oi(this, "pop");
  },
  push(...e) {
    return oi(this, "push", e);
  },
  reduce(e, ...t) {
    return Ih(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Ih(this, "reduceRight", e, t);
  },
  shift() {
    return oi(this, "shift");
  },
  some(e, t) {
    return Rn(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return oi(this, "splice", e);
  },
  toReversed() {
    return to(this).toReversed();
  },
  toSorted(e) {
    return to(this).toSorted(e);
  },
  toSpliced(...e) {
    return to(this).toSpliced(...e);
  },
  unshift(...e) {
    return oi(this, "unshift", e);
  },
  values() {
    return Cu(this, "values", (e) => yn(this, e));
  }
};
function Cu(e, t, n) {
  const r = Wl(e), o = r[t]();
  return r !== e && !/* @__PURE__ */ qt(e) && (o._next = o.next, o.next = () => {
    const i = o._next();
    return i.done || (i.value = n(i.value)), i;
  }), o;
}
var OS = Array.prototype;
function Rn(e, t, n, r, o, i) {
  const s = Wl(e), a = s !== e && !/* @__PURE__ */ qt(e), u = s[t];
  if (u !== OS[t]) {
    const h = u.apply(e, i);
    return a ? on(h) : h;
  }
  let f = n;
  s !== e && (a ? f = function(h, p) {
    return n.call(this, yn(e, h), p, e);
  } : n.length > 2 && (f = function(h, p) {
    return n.call(this, h, p, e);
  }));
  const d = u.call(s, f, r);
  return a && o ? o(d) : d;
}
function Ih(e, t, n, r) {
  const o = Wl(e), i = o !== e && !/* @__PURE__ */ qt(e);
  let s = n, a = !1;
  o !== e && (i ? (a = r.length === 0, s = function(f, d, h) {
    return a && (a = !1, f = yn(e, f)), n.call(this, f, yn(e, d), h, e);
  }) : n.length > 3 && (s = function(f, d, h) {
    return n.call(this, f, d, h, e);
  }));
  const u = o[t](s, ...r);
  return a ? yn(e, u) : u;
}
function bu(e, t, n) {
  const r = /* @__PURE__ */ Re(e);
  ut(r, "iterate", ds);
  const o = r[t](...n);
  return (o === -1 || o === !1) && /* @__PURE__ */ jf(n[0]) ? (n[0] = /* @__PURE__ */ Re(n[0]), r[t](...n)) : o;
}
function oi(e, t, n = []) {
  Vn(), Jf();
  const r = (/* @__PURE__ */ Re(e))[t].apply(e, n);
  return Wf(), Hn(), r;
}
var BS = /* @__PURE__ */ Bl("__proto__,__v_isRef,__isVue"), Qy = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Sn));
function GS(e) {
  Sn(e) || (e = String(e));
  const t = /* @__PURE__ */ Re(this);
  return ut(t, "has", e), t.hasOwnProperty(e);
}
var Zy = class {
  constructor(e = !1, t = !1) {
    this._isReadonly = e, this._isShallow = t;
  }
  get(e, t, n) {
    if (t === "__v_skip") return e.__v_skip;
    const r = this._isReadonly, o = this._isShallow;
    if (t === "__v_isReactive") return !r;
    if (t === "__v_isReadonly") return r;
    if (t === "__v_isShallow") return o;
    if (t === "__v_raw")
      return n === (r ? o ? QS : nv : o ? tv : ev).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
    const i = he(e);
    if (!r) {
      let a;
      if (i && (a = FS[t])) return a;
      if (t === "hasOwnProperty") return GS;
    }
    const s = Reflect.get(e, t, /* @__PURE__ */ ct(e) ? e : n);
    if ((Sn(t) ? Qy.has(t) : BS(t)) || (r || ut(e, "get", t), o)) return s;
    if (/* @__PURE__ */ ct(s)) {
      const a = i && qf(t) ? s : s.value;
      return r && Me(a) ? /* @__PURE__ */ Ec(a) : a;
    }
    return Me(s) ? r ? /* @__PURE__ */ Ec(s) : /* @__PURE__ */ Qf(s) : s;
  }
}, jy = class extends Zy {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, t, n, r) {
    let o = e[t];
    const i = he(e) && qf(t);
    if (!this._isShallow) {
      const u = /* @__PURE__ */ qn(o);
      if (!/* @__PURE__ */ qt(n) && !/* @__PURE__ */ qn(n) && (o = /* @__PURE__ */ Re(o), n = /* @__PURE__ */ Re(n)), !i && /* @__PURE__ */ ct(o) && !/* @__PURE__ */ ct(n)) return u || (o.value = n), !0;
    }
    const s = i ? Number(t) < e.length : Pe(e, t), a = Reflect.set(e, t, n, /* @__PURE__ */ ct(e) ? e : r);
    return e === /* @__PURE__ */ Re(r) && (s ? _n(n, o) && $n(e, "set", t, n, o) : $n(e, "add", t, n)), a;
  }
  deleteProperty(e, t) {
    const n = Pe(e, t), r = e[t], o = Reflect.deleteProperty(e, t);
    return o && n && $n(e, "delete", t, void 0, r), o;
  }
  has(e, t) {
    const n = Reflect.has(e, t);
    return (!Sn(t) || !Qy.has(t)) && ut(e, "has", t), n;
  }
  ownKeys(e) {
    return ut(e, "iterate", he(e) ? "length" : Or), Reflect.ownKeys(e);
  }
}, VS = class extends Zy {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, t) {
    return !0;
  }
  deleteProperty(e, t) {
    return !0;
  }
}, HS = /* @__PURE__ */ new jy(), qS = /* @__PURE__ */ new VS(), KS = /* @__PURE__ */ new jy(!0), wc = (e) => e, Js = (e) => Reflect.getPrototypeOf(e);
function JS(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, i = /* @__PURE__ */ Re(o), s = Ro(i), a = e === "entries" || e === Symbol.iterator && s, u = e === "keys" && s, f = o[e](...r), d = n ? wc : t ? Uo : on;
    return !t && ut(i, "iterate", u ? _c : Or), Qe(Object.create(f), { next() {
      const { value: h, done: p } = f.next();
      return p ? {
        value: h,
        done: p
      } : {
        value: a ? [d(h[0]), d(h[1])] : d(h),
        done: p
      };
    } });
  };
}
function Ws(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function WS(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw, i = /* @__PURE__ */ Re(o), s = /* @__PURE__ */ Re(r);
      e || (_n(r, s) && ut(i, "get", r), ut(i, "get", s));
      const { has: a } = Js(i), u = t ? wc : e ? Uo : on;
      if (a.call(i, r)) return u(o.get(r));
      if (a.call(i, s)) return u(o.get(s));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && ut(/* @__PURE__ */ Re(r), "iterate", Or), r.size;
    },
    has(r) {
      const o = this.__v_raw, i = /* @__PURE__ */ Re(o), s = /* @__PURE__ */ Re(r);
      return e || (_n(r, s) && ut(i, "has", r), ut(i, "has", s)), r === s ? o.has(r) : o.has(r) || o.has(s);
    },
    forEach(r, o) {
      const i = this, s = i.__v_raw, a = /* @__PURE__ */ Re(s), u = t ? wc : e ? Uo : on;
      return !e && ut(a, "iterate", Or), s.forEach((f, d) => r.call(o, u(f), u(d), i));
    }
  };
  return Qe(n, e ? {
    add: Ws("add"),
    set: Ws("set"),
    delete: Ws("delete"),
    clear: Ws("clear")
  } : {
    add(r) {
      const o = /* @__PURE__ */ Re(this), i = Js(o), s = /* @__PURE__ */ Re(r), a = !t && !/* @__PURE__ */ qt(r) && !/* @__PURE__ */ qn(r) ? s : r;
      return i.has.call(o, a) || _n(r, a) && i.has.call(o, r) || _n(s, a) && i.has.call(o, s) || (o.add(a), $n(o, "add", a, a)), this;
    },
    set(r, o) {
      !t && !/* @__PURE__ */ qt(o) && !/* @__PURE__ */ qn(o) && (o = /* @__PURE__ */ Re(o));
      const i = /* @__PURE__ */ Re(this), { has: s, get: a } = Js(i);
      let u = s.call(i, r);
      u || (r = /* @__PURE__ */ Re(r), u = s.call(i, r));
      const f = a.call(i, r);
      return i.set(r, o), u ? _n(o, f) && $n(i, "set", r, o, f) : $n(i, "add", r, o), this;
    },
    delete(r) {
      const o = /* @__PURE__ */ Re(this), { has: i, get: s } = Js(o);
      let a = i.call(o, r);
      a || (r = /* @__PURE__ */ Re(r), a = i.call(o, r));
      const u = s ? s.call(o, r) : void 0, f = o.delete(r);
      return a && $n(o, "delete", r, void 0, u), f;
    },
    clear() {
      const r = /* @__PURE__ */ Re(this), o = r.size !== 0, i = void 0, s = r.clear();
      return o && $n(r, "clear", void 0, void 0, i), s;
    }
  }), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    n[r] = JS(r, e, t);
  }), n;
}
function Xf(e, t) {
  const n = WS(e, t);
  return (r, o, i) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(Pe(n, o) && o in r ? n : r, o, i);
}
var YS = { get: /* @__PURE__ */ Xf(!1, !1) }, zS = { get: /* @__PURE__ */ Xf(!1, !0) }, XS = { get: /* @__PURE__ */ Xf(!0, !1) }, ev = /* @__PURE__ */ new WeakMap(), tv = /* @__PURE__ */ new WeakMap(), nv = /* @__PURE__ */ new WeakMap(), QS = /* @__PURE__ */ new WeakMap();
function ZS(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function Qf(e) {
  return /* @__PURE__ */ qn(e) ? e : Zf(e, !1, HS, YS, ev);
}
// @__NO_SIDE_EFFECTS__
function jS(e) {
  return Zf(e, !1, KS, zS, tv);
}
// @__NO_SIDE_EFFECTS__
function Ec(e) {
  return Zf(e, !0, qS, XS, nv);
}
function Zf(e, t, n, r, o) {
  if (!Me(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
  const i = o.get(e);
  if (i) return i;
  const s = ZS(AS(e));
  if (s === 0) return e;
  const a = new Proxy(e, s === 2 ? r : n);
  return o.set(e, a), a;
}
// @__NO_SIDE_EFFECTS__
function Br(e) {
  return /* @__PURE__ */ qn(e) ? /* @__PURE__ */ Br(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function qn(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function qt(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function jf(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Re(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Re(t) : e;
}
function e0(e) {
  return !Pe(e, "__v_skip") && Object.isExtensible(e) && Fy(e, "__v_skip", !0), e;
}
var on = (e) => Me(e) ? /* @__PURE__ */ Qf(e) : e, Uo = (e) => Me(e) ? /* @__PURE__ */ Ec(e) : e;
// @__NO_SIDE_EFFECTS__
function ct(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Be(e) {
  return t0(e, !1);
}
function t0(e, t) {
  return /* @__PURE__ */ ct(e) ? e : new n0(e, t);
}
var n0 = class {
  constructor(e, t) {
    this.dep = new zf(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ Re(e), this._value = t ? e : on(e), this.__v_isShallow = t;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ qt(e) || /* @__PURE__ */ qn(e);
    e = n ? e : /* @__PURE__ */ Re(e), _n(e, t) && (this._rawValue = e, this._value = n ? e : on(e), this.dep.trigger());
  }
};
function rv(e) {
  return /* @__PURE__ */ ct(e) ? e.value : e;
}
var r0 = {
  get: (e, t, n) => t === "__v_raw" ? e : rv(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return /* @__PURE__ */ ct(o) && !/* @__PURE__ */ ct(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function ov(e) {
  return /* @__PURE__ */ Br(e) ? e : new Proxy(e, r0);
}
var o0 = class {
  constructor(e, t, n) {
    this.fn = e, this.setter = t, this._value = void 0, this.dep = new zf(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = fs - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && ke !== this)
      return Ky(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return Yy(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
};
// @__NO_SIDE_EFFECTS__
function i0(e, t, n = !1) {
  let r, o;
  return ve(e) ? r = e : (r = e.get, o = e.set), new o0(r, o, n);
}
var Ys = {}, el = /* @__PURE__ */ new WeakMap(), Cr = void 0;
function s0(e, t = !1, n = Cr) {
  if (n) {
    let r = el.get(n);
    r || el.set(n, r = []), r.push(e);
  }
}
function a0(e, t, n = Ne) {
  const { immediate: r, deep: o, once: i, scheduler: s, augmentJob: a, call: u } = n, f = (T) => o ? T : /* @__PURE__ */ qt(T) || o === !1 || o === 0 ? Fn(T, 1) : Fn(T);
  let d, h, p, m, g = !1, y = !1;
  if (/* @__PURE__ */ ct(e) ? (h = () => e.value, g = /* @__PURE__ */ qt(e)) : /* @__PURE__ */ Br(e) ? (h = () => f(e), g = !0) : he(e) ? (y = !0, g = e.some((T) => /* @__PURE__ */ Br(T) || /* @__PURE__ */ qt(T)), h = () => e.map((T) => {
    if (/* @__PURE__ */ ct(T)) return T.value;
    if (/* @__PURE__ */ Br(T)) return f(T);
    if (ve(T)) return u ? u(T, 2) : T();
  })) : ve(e) ? t ? h = u ? () => u(e, 2) : e : h = () => {
    if (p) {
      Vn();
      try {
        p();
      } finally {
        Hn();
      }
    }
    const T = Cr;
    Cr = d;
    try {
      return u ? u(e, 3, [m]) : e(m);
    } finally {
      Cr = T;
    }
  } : h = En, t && o) {
    const T = h, C = o === !0 ? 1 / 0 : o;
    h = () => Fn(T(), C);
  }
  const v = LS(), w = () => {
    d.stop(), v && v.active && Hf(v.effects, d);
  };
  if (i && t) {
    const T = t;
    t = (...C) => {
      T(...C), w();
    };
  }
  let _ = y ? new Array(e.length).fill(Ys) : Ys;
  const S = (T) => {
    if (!(!(d.flags & 1) || !d.dirty && !T))
      if (t) {
        const C = d.run();
        if (o || g || (y ? C.some((E, M) => _n(E, _[M])) : _n(C, _))) {
          p && p();
          const E = Cr;
          Cr = d;
          try {
            const M = [
              C,
              _ === Ys ? void 0 : y && _[0] === Ys ? [] : _,
              m
            ];
            _ = C, u ? u(t, 3, M) : t(...M);
          } finally {
            Cr = E;
          }
        }
      } else d.run();
  };
  return a && a(S), d = new Hy(h), d.scheduler = s ? () => s(S, !1) : S, m = (T) => s0(T, !1, d), p = d.onStop = () => {
    const T = el.get(d);
    if (T) {
      if (u) u(T, 4);
      else for (const C of T) C();
      el.delete(d);
    }
  }, t ? r ? S(!0) : _ = d.run() : s ? s(S.bind(null, !0), !0) : d.run(), w.pause = d.pause.bind(d), w.resume = d.resume.bind(d), w.stop = w, w;
}
function Fn(e, t = 1 / 0, n) {
  if (t <= 0 || !Me(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
  if (n.set(e, t), t--, /* @__PURE__ */ ct(e)) Fn(e.value, t, n);
  else if (he(e)) for (let r = 0; r < e.length; r++) Fn(e[r], t, n);
  else if (Hl(e) || Ro(e)) e.forEach((r) => {
    Fn(r, t, n);
  });
  else if (Uy(e)) {
    for (const r in e) Fn(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Fn(e[r], t, n);
  }
  return e;
}
function Rs(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    Yl(o, t, n);
  }
}
function sn(e, t, n, r) {
  if (ve(e)) {
    const o = Rs(e, t, n, r);
    return o && Dy(o) && o.catch((i) => {
      Yl(i, t, n);
    }), o;
  }
  if (he(e)) {
    const o = [];
    for (let i = 0; i < e.length; i++) o.push(sn(e[i], t, n, r));
    return o;
  }
}
function Yl(e, t, n, r = !0) {
  const o = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: s } = t && t.appContext.config || Ne;
  if (t) {
    let a = t.parent;
    const u = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a; ) {
      const d = a.ec;
      if (d) {
        for (let h = 0; h < d.length; h++) if (d[h](e, u, f) === !1) return;
      }
      a = a.parent;
    }
    if (i) {
      Vn(), Rs(i, null, 10, [
        e,
        u,
        f
      ]), Hn();
      return;
    }
  }
  l0(e, n, o, r, s);
}
function l0(e, t, n, r = !0, o = !1) {
  if (o) throw e;
  console.error(e);
}
var vt = [], hn = -1, Po = [], rr = null, po = 0, iv = /* @__PURE__ */ Promise.resolve(), tl = null;
function sv(e) {
  const t = tl || iv;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function u0(e) {
  let t = hn + 1, n = vt.length;
  for (; t < n; ) {
    const r = t + n >>> 1, o = vt[r], i = hs(o);
    i < e || i === e && o.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function ed(e) {
  if (!(e.flags & 1)) {
    const t = hs(e), n = vt[vt.length - 1];
    !n || !(e.flags & 2) && t >= hs(n) ? vt.push(e) : vt.splice(u0(t), 0, e), e.flags |= 1, av();
  }
}
function av() {
  tl || (tl = iv.then(uv));
}
function c0(e) {
  he(e) ? Po.push(...e) : rr && e.id === -1 ? rr.splice(po + 1, 0, e) : e.flags & 1 || (Po.push(e), e.flags |= 1), av();
}
function Rh(e, t, n = hn + 1) {
  for (; n < vt.length; n++) {
    const r = vt[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid) continue;
      vt.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function lv(e) {
  if (Po.length) {
    const t = [...new Set(Po)].sort((n, r) => hs(n) - hs(r));
    if (Po.length = 0, rr) {
      rr.push(...t);
      return;
    }
    for (rr = t, po = 0; po < rr.length; po++) {
      const n = rr[po];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    rr = null, po = 0;
  }
}
var hs = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function uv(e) {
  try {
    for (hn = 0; hn < vt.length; hn++) {
      const t = vt[hn];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Rs(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; hn < vt.length; hn++) {
      const t = vt[hn];
      t && (t.flags &= -2);
    }
    hn = -1, vt.length = 0, lv(e), tl = null, (vt.length || Po.length) && uv(e);
  }
}
var Vt = null, cv = null;
function nl(e) {
  const t = Vt;
  return Vt = e, cv = e && e.type.__scopeId || null, t;
}
function f0(e, t = Vt, n) {
  if (!t || e._n) return e;
  const r = (...o) => {
    r._d && Fh(-1);
    const i = nl(t);
    let s;
    try {
      s = e(...o);
    } finally {
      nl(i), r._d && Fh(1);
    }
    return s;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function zs(e, t) {
  if (Vt === null) return e;
  const n = Zl(Vt), r = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [i, s, a, u = Ne] = t[o];
    i && (ve(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Fn(s), r.push({
      dir: i,
      instance: n,
      value: s,
      oldValue: void 0,
      arg: a,
      modifiers: u
    }));
  }
  return e;
}
function _r(e, t, n, r) {
  const o = e.dirs, i = t && t.dirs;
  for (let s = 0; s < o.length; s++) {
    const a = o[s];
    i && (a.oldValue = i[s].value);
    let u = a.dir[r];
    u && (Vn(), sn(u, n, 8, [
      e.el,
      a,
      e,
      t
    ]), Hn());
  }
}
function d0(e, t) {
  if (wt) {
    let n = wt.provides;
    const r = wt.parent && wt.parent.provides;
    r === n && (n = wt.provides = Object.create(r)), n[e] = t;
  }
}
function xa(e, t, n = !1) {
  const r = dA();
  if (r || xo) {
    let o = xo ? xo._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return n && ve(t) ? t.call(r && r.proxy) : t;
  }
}
var h0 = /* @__PURE__ */ Symbol.for("v-scx"), p0 = () => {
  {
    const e = xa(h0);
    return e;
  }
};
function Iu(e, t, n) {
  return fv(e, t, n);
}
function fv(e, t, n = Ne) {
  const { immediate: r, deep: o, flush: i, once: s } = n, a = Qe({}, n), u = t && r || !t && i !== "post";
  let f;
  if (ms) {
    if (i === "sync") {
      const m = p0();
      f = m.__watcherHandles || (m.__watcherHandles = []);
    } else if (!u) {
      const m = () => {
      };
      return m.stop = En, m.resume = En, m.pause = En, m;
    }
  }
  const d = wt;
  a.call = (m, g, y) => sn(m, d, g, y);
  let h = !1;
  i === "post" ? a.scheduler = (m) => {
    Et(m, d && d.suspense);
  } : i !== "sync" && (h = !0, a.scheduler = (m, g) => {
    g ? m() : ed(m);
  }), a.augmentJob = (m) => {
    t && (m.flags |= 4), h && (m.flags |= 2, d && (m.id = d.uid, m.i = d));
  };
  const p = a0(e, t, a);
  return ms && (f ? f.push(p) : u && p()), p;
}
function m0(e, t, n) {
  const r = this.proxy, o = Fe(e) ? e.includes(".") ? dv(r, e) : () => r[e] : e.bind(r, r);
  let i;
  ve(t) ? i = t : (i = t.handler, n = t);
  const s = Ps(this), a = fv(o, i.bind(r), n);
  return s(), a;
}
function dv(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++) r = r[n[o]];
    return r;
  };
}
var g0 = /* @__PURE__ */ Symbol("_vte"), y0 = (e) => e.__isTeleport, Ru = /* @__PURE__ */ Symbol("_leaveCb");
function td(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, td(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function v0(e, t) {
  return ve(e) ? Qe({ name: e.name }, t, { setup: e }) : e;
}
function hv(e) {
  e.ids = [
    e.ids[0] + e.ids[2]++ + "-",
    0,
    0
  ];
}
function Ph(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var rl = /* @__PURE__ */ new WeakMap();
function Yi(e, t, n, r, o = !1) {
  if (he(e)) {
    e.forEach((y, v) => Yi(y, t && (he(t) ? t[v] : t), n, r, o));
    return;
  }
  if (zi(r) && !o) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Yi(e, t, n, r.component.subTree);
    return;
  }
  const i = r.shapeFlag & 4 ? Zl(r.component) : r.el, s = o ? null : i, { i: a, r: u } = e, f = t && t.r, d = a.refs === Ne ? a.refs = {} : a.refs, h = a.setupState, p = /* @__PURE__ */ Re(h), m = h === Ne ? ky : (y) => Ph(d, y) ? !1 : Pe(p, y), g = (y, v) => !(v && Ph(d, v));
  if (f != null && f !== u) {
    if (xh(t), Fe(f))
      d[f] = null, m(f) && (h[f] = null);
    else if (/* @__PURE__ */ ct(f)) {
      const y = t;
      g(f, y.k) && (f.value = null), y.k && (d[y.k] = null);
    }
  }
  if (ve(u)) Rs(u, a, 12, [s, d]);
  else {
    const y = Fe(u), v = /* @__PURE__ */ ct(u);
    if (y || v) {
      const w = () => {
        if (e.f) {
          const _ = y ? m(u) ? h[u] : d[u] : g(u) || !e.k ? u.value : d[e.k];
          if (o) he(_) && Hf(_, i);
          else if (he(_)) _.includes(i) || _.push(i);
          else if (y)
            d[u] = [i], m(u) && (h[u] = d[u]);
          else {
            const S = [i];
            g(u, e.k) && (u.value = S), e.k && (d[e.k] = S);
          }
        } else y ? (d[u] = s, m(u) && (h[u] = s)) : v && (g(u, e.k) && (u.value = s), e.k && (d[e.k] = s));
      };
      if (s) {
        const _ = () => {
          w(), rl.delete(e);
        };
        _.id = -1, rl.set(e, _), Et(_, n);
      } else
        xh(e), w();
    }
  }
}
function xh(e) {
  const t = rl.get(e);
  t && (t.flags |= 8, rl.delete(e));
}
var nO = Jl().requestIdleCallback || ((e) => setTimeout(e, 1)), rO = Jl().cancelIdleCallback || ((e) => clearTimeout(e)), zi = (e) => !!e.type.__asyncLoader, pv = (e) => e.type.__isKeepAlive;
function _0(e, t) {
  mv(e, "a", t);
}
function w0(e, t) {
  mv(e, "da", t);
}
function mv(e, t, n = wt) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated) return;
      o = o.parent;
    }
    return e();
  });
  if (zl(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      pv(o.parent.vnode) && E0(r, t, n, o), o = o.parent;
  }
}
function E0(e, t, n, r) {
  const o = zl(t, e, r, !0);
  nd(() => {
    Hf(r[t], o);
  }, n);
}
function zl(e, t, n = wt, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...s) => {
      Vn();
      const a = Ps(n), u = sn(t, n, e, s);
      return a(), Hn(), u;
    });
    return r ? o.unshift(i) : o.push(i), i;
  }
}
var Jn = (e) => (t, n = wt) => {
  (!ms || e === "sp") && zl(e, (...r) => t(...r), n);
}, T0 = Jn("bm"), gv = Jn("m"), S0 = Jn("bu"), A0 = Jn("u"), C0 = Jn("bum"), nd = Jn("um"), b0 = Jn("sp"), I0 = Jn("rtg"), R0 = Jn("rtc");
function P0(e, t = wt) {
  zl("ec", e, t);
}
var x0 = /* @__PURE__ */ Symbol.for("v-ndc");
function zt(e, t, n, r) {
  let o;
  const i = n && n[r], s = he(e);
  if (s || Fe(e)) {
    const a = s && /* @__PURE__ */ Br(e);
    let u = !1, f = !1;
    a && (u = !/* @__PURE__ */ qt(e), f = /* @__PURE__ */ qn(e), e = Wl(e)), o = new Array(e.length);
    for (let d = 0, h = e.length; d < h; d++) o[d] = t(u ? f ? Uo(on(e[d])) : on(e[d]) : e[d], d, void 0, i && i[d]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let a = 0; a < e; a++) o[a] = t(a + 1, a, void 0, i && i[a]);
  } else if (Me(e)) if (e[Symbol.iterator]) o = Array.from(e, (a, u) => t(a, u, void 0, i && i[u]));
  else {
    const a = Object.keys(e);
    o = new Array(a.length);
    for (let u = 0, f = a.length; u < f; u++) {
      const d = a[u];
      o[u] = t(e[d], d, u, i && i[u]);
    }
  }
  else o = [];
  return n && (n[r] = o), o;
}
var Tc = (e) => e ? Uv(e) ? Zl(e) : Tc(e.parent) : null, Xi = /* @__PURE__ */ Qe(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => e.props,
  $attrs: (e) => e.attrs,
  $slots: (e) => e.slots,
  $refs: (e) => e.refs,
  $parent: (e) => Tc(e.parent),
  $root: (e) => Tc(e.root),
  $host: (e) => e.ce,
  $emit: (e) => e.emit,
  $options: (e) => rd(e),
  $forceUpdate: (e) => e.f || (e.f = () => {
    ed(e.update);
  }),
  $nextTick: (e) => e.n || (e.n = sv.bind(e.proxy)),
  $watch: (e) => m0.bind(e)
}), Pu = (e, t) => e !== Ne && !e.__isScriptSetup && Pe(e, t), M0 = {
  get({ _: e }, t) {
    if (t === "__v_skip") return !0;
    const { ctx: n, setupState: r, data: o, props: i, accessCache: s, type: a, appContext: u } = e;
    if (t[0] !== "$") {
      const p = s[t];
      if (p !== void 0) switch (p) {
        case 1:
          return r[t];
        case 2:
          return o[t];
        case 4:
          return n[t];
        case 3:
          return i[t];
      }
      else {
        if (Pu(r, t))
          return s[t] = 1, r[t];
        if (o !== Ne && Pe(o, t))
          return s[t] = 2, o[t];
        if (Pe(i, t))
          return s[t] = 3, i[t];
        if (n !== Ne && Pe(n, t))
          return s[t] = 4, n[t];
        Sc && (s[t] = 0);
      }
    }
    const f = Xi[t];
    let d, h;
    if (f)
      return t === "$attrs" && ut(e.attrs, "get", ""), f(e);
    if ((d = a.__cssModules) && (d = d[t])) return d;
    if (n !== Ne && Pe(n, t))
      return s[t] = 4, n[t];
    if (h = u.config.globalProperties, Pe(h, t)) return h[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: i } = e;
    return Pu(o, t) ? (o[t] = n, !0) : r !== Ne && Pe(r, t) ? (r[t] = n, !0) : Pe(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, props: i, type: s } }, a) {
    let u;
    return !!(n[a] || e !== Ne && a[0] !== "$" && Pe(e, a) || Pu(t, a) || Pe(i, a) || Pe(r, a) || Pe(Xi, a) || Pe(o.config.globalProperties, a) || (u = s.__cssModules) && u[a]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Pe(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Mh(e) {
  return he(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e;
}
var Sc = !0;
function N0(e) {
  const t = rd(e), n = e.proxy, r = e.ctx;
  Sc = !1, t.beforeCreate && Nh(t.beforeCreate, e, "bc");
  const { data: o, computed: i, methods: s, watch: a, provide: u, inject: f, created: d, beforeMount: h, mounted: p, beforeUpdate: m, updated: g, activated: y, deactivated: v, beforeDestroy: w, beforeUnmount: _, destroyed: S, unmounted: T, render: C, renderTracked: E, renderTriggered: M, errorCaptured: I, serverPrefetch: D, expose: $, inheritAttrs: q, components: z, directives: J, filters: ne } = t;
  if (f && k0(f, r, null), s) for (const ue in s) {
    const fe = s[ue];
    ve(fe) && (r[ue] = fe.bind(n));
  }
  if (o) {
    const ue = o.call(n, n);
    Me(ue) && (e.data = /* @__PURE__ */ Qf(ue));
  }
  if (Sc = !0, i) for (const ue in i) {
    const fe = i[ue], we = Ye({
      get: ve(fe) ? fe.bind(n, n) : ve(fe.get) ? fe.get.bind(n, n) : En,
      set: !ve(fe) && ve(fe.set) ? fe.set.bind(n) : En
    });
    Object.defineProperty(r, ue, {
      enumerable: !0,
      configurable: !0,
      get: () => we.value,
      set: (Le) => we.value = Le
    });
  }
  if (a) for (const ue in a) yv(a[ue], r, n, ue);
  if (u) {
    const ue = ve(u) ? u.call(n) : u;
    Reflect.ownKeys(ue).forEach((fe) => {
      d0(fe, ue[fe]);
    });
  }
  d && Nh(d, e, "c");
  function pe(ue, fe) {
    he(fe) ? fe.forEach((we) => ue(we.bind(n))) : fe && ue(fe.bind(n));
  }
  if (pe(T0, h), pe(gv, p), pe(S0, m), pe(A0, g), pe(_0, y), pe(w0, v), pe(P0, I), pe(R0, E), pe(I0, M), pe(C0, _), pe(nd, T), pe(b0, D), he($))
    if ($.length) {
      const ue = e.exposed || (e.exposed = {});
      $.forEach((fe) => {
        Object.defineProperty(ue, fe, {
          get: () => n[fe],
          set: (we) => n[fe] = we,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  C && e.render === En && (e.render = C), q != null && (e.inheritAttrs = q), z && (e.components = z), J && (e.directives = J), D && hv(e);
}
function k0(e, t, n = En) {
  he(e) && (e = Ac(e));
  for (const r in e) {
    const o = e[r];
    let i;
    Me(o) ? "default" in o ? i = xa(o.from || r, o.default, !0) : i = xa(o.from || r) : i = xa(o), /* @__PURE__ */ ct(i) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (s) => i.value = s
    }) : t[r] = i;
  }
}
function Nh(e, t, n) {
  sn(he(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function yv(e, t, n, r) {
  let o = r.includes(".") ? dv(n, r) : () => n[r];
  if (Fe(e)) {
    const i = t[e];
    ve(i) && Iu(o, i);
  } else if (ve(e)) Iu(o, e.bind(n));
  else if (Me(e)) if (he(e)) e.forEach((i) => yv(i, t, n, r));
  else {
    const i = ve(e.handler) ? e.handler.bind(n) : t[e.handler];
    ve(i) && Iu(o, i, e);
  }
}
function rd(e) {
  const t = e.type, { mixins: n, extends: r } = t, { mixins: o, optionsCache: i, config: { optionMergeStrategies: s } } = e.appContext, a = i.get(t);
  let u;
  return a ? u = a : !o.length && !n && !r ? u = t : (u = {}, o.length && o.forEach((f) => ol(u, f, s, !0)), ol(u, t, s)), Me(t) && i.set(t, u), u;
}
function ol(e, t, n, r = !1) {
  const { mixins: o, extends: i } = t;
  i && ol(e, i, n, !0), o && o.forEach((s) => ol(e, s, n, !0));
  for (const s in t) if (!(r && s === "expose")) {
    const a = D0[s] || n && n[s];
    e[s] = a ? a(e[s], t[s]) : t[s];
  }
  return e;
}
var D0 = {
  data: kh,
  props: Dh,
  emits: Dh,
  methods: Ci,
  computed: Ci,
  beforeCreate: pt,
  created: pt,
  beforeMount: pt,
  mounted: pt,
  beforeUpdate: pt,
  updated: pt,
  beforeDestroy: pt,
  beforeUnmount: pt,
  destroyed: pt,
  unmounted: pt,
  activated: pt,
  deactivated: pt,
  errorCaptured: pt,
  serverPrefetch: pt,
  components: Ci,
  directives: Ci,
  watch: U0,
  provide: kh,
  inject: L0
};
function kh(e, t) {
  return t ? e ? function() {
    return Qe(ve(e) ? e.call(this, this) : e, ve(t) ? t.call(this, this) : t);
  } : t : e;
}
function L0(e, t) {
  return Ci(Ac(e), Ac(t));
}
function Ac(e) {
  if (he(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function pt(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ci(e, t) {
  return e ? Qe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Dh(e, t) {
  return e ? he(e) && he(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Qe(/* @__PURE__ */ Object.create(null), Mh(e), Mh(t ?? {})) : t;
}
function U0(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Qe(/* @__PURE__ */ Object.create(null), e);
  for (const r in t) n[r] = pt(e[r], t[r]);
  return n;
}
function vv() {
  return {
    app: null,
    config: {
      isNativeTag: ky,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
var $0 = 0;
function F0(e, t) {
  return function(r, o = null) {
    ve(r) || (r = Qe({}, r)), o != null && !Me(o) && (o = null);
    const i = vv(), s = /* @__PURE__ */ new WeakSet(), a = [];
    let u = !1;
    const f = i.app = {
      _uid: $0++,
      _component: r,
      _props: o,
      _container: null,
      _context: i,
      _instance: null,
      version: vA,
      get config() {
        return i.config;
      },
      set config(d) {
      },
      use(d, ...h) {
        return s.has(d) || (d && ve(d.install) ? (s.add(d), d.install(f, ...h)) : ve(d) && (s.add(d), d(f, ...h))), f;
      },
      mixin(d) {
        return i.mixins.includes(d) || i.mixins.push(d), f;
      },
      component(d, h) {
        return h ? (i.components[d] = h, f) : i.components[d];
      },
      directive(d, h) {
        return h ? (i.directives[d] = h, f) : i.directives[d];
      },
      mount(d, h, p) {
        if (!u) {
          const m = f._ceVNode || Tn(r, o);
          return m.appContext = i, p === !0 ? p = "svg" : p === !1 && (p = void 0), h && t ? t(m, d) : e(m, d, p), u = !0, f._container = d, d.__vue_app__ = f, Zl(m.component);
        }
      },
      onUnmount(d) {
        a.push(d);
      },
      unmount() {
        u && (sn(a, f._instance, 16), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(d, h) {
        return i.provides[d] = h, f;
      },
      runWithContext(d) {
        const h = xo;
        xo = f;
        try {
          return d();
        } finally {
          xo = h;
        }
      }
    };
    return f;
  };
}
var xo = null, O0 = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${en(t)}Modifiers`] || e[`${Qr(t)}Modifiers`];
function B0(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || Ne;
  let o = n;
  const i = t.startsWith("update:"), s = i && O0(r, t.slice(7));
  s && (s.trim && (o = n.map((d) => Fe(d) ? d.trim() : d)), s.number && (o = n.map(Kl)));
  let a, u = r[a = Tu(t)] || r[a = Tu(en(t))];
  !u && i && (u = r[a = Tu(Qr(t))]), u && sn(u, e, 6, o);
  const f = r[a + "Once"];
  if (f) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    e.emitted[a] = !0, sn(f, e, 6, o);
  }
}
var G0 = /* @__PURE__ */ new WeakMap();
function _v(e, t, n = !1) {
  const r = n ? G0 : t.emitsCache, o = r.get(e);
  if (o !== void 0) return o;
  const i = e.emits;
  let s = {}, a = !1;
  if (!ve(e)) {
    const u = (f) => {
      const d = _v(f, t, !0);
      d && (a = !0, Qe(s, d));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !i && !a ? (Me(e) && r.set(e, null), null) : (he(i) ? i.forEach((u) => s[u] = null) : Qe(s, i), Me(e) && r.set(e, s), s);
}
function Xl(e, t) {
  return !e || !Gl(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Pe(e, t[0].toLowerCase() + t.slice(1)) || Pe(e, Qr(t)) || Pe(e, t));
}
function xu(e) {
  const { type: t, vnode: n, proxy: r, withProxy: o, propsOptions: [i], slots: s, attrs: a, emit: u, render: f, renderCache: d, props: h, data: p, setupState: m, ctx: g, inheritAttrs: y } = e, v = nl(e);
  let w, _;
  try {
    if (n.shapeFlag & 4) {
      const T = o || r, C = T;
      w = vn(f.call(C, T, d, h, m, p, g)), _ = a;
    } else {
      const T = t;
      w = vn(T.length > 1 ? T(h, {
        attrs: a,
        slots: s,
        emit: u
      }) : T(h, null)), _ = t.props ? a : V0(a);
    }
  } catch (T) {
    Qi.length = 0, Yl(T, e, 1), w = Tn(fr);
  }
  let S = w;
  if (_ && y !== !1) {
    const T = Object.keys(_), { shapeFlag: C } = S;
    T.length && C & 7 && (i && T.some(Vl) && (_ = H0(_, i)), S = $o(S, _, !1, !0));
  }
  return n.dirs && (S = $o(S, null, !1, !0), S.dirs = S.dirs ? S.dirs.concat(n.dirs) : n.dirs), n.transition && td(S, n.transition), w = S, nl(v), w;
}
var V0 = (e) => {
  let t;
  for (const n in e) (n === "class" || n === "style" || Gl(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, H0 = (e, t) => {
  const n = {};
  for (const r in e) (!Vl(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function q0(e, t, n) {
  const { props: r, children: o, component: i } = e, { props: s, children: a, patchFlag: u } = t, f = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16)
      return r ? Lh(r, s, f) : !!s;
    if (u & 8) {
      const d = t.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        const p = d[h];
        if (wv(s, r, p) && !Xl(f, p)) return !0;
      }
    }
  } else
    return (o || a) && (!a || !a.$stable) ? !0 : r === s ? !1 : r ? s ? Lh(r, s, f) : !0 : !!s;
  return !1;
}
function Lh(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < r.length; o++) {
    const i = r[o];
    if (wv(t, e, i) && !Xl(n, i)) return !0;
  }
  return !1;
}
function wv(e, t, n) {
  const r = e[n], o = t[n];
  return n === "style" && Me(r) && Me(o) ? !Is(r, o) : r !== o;
}
function K0({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = r, e = o), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
var Ev = {}, Tv = () => Object.create(Ev), Sv = (e) => Object.getPrototypeOf(e) === Ev;
function J0(e, t, n, r = !1) {
  const o = {}, i = Tv();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Av(e, t, o, i);
  for (const s in e.propsOptions[0]) s in o || (o[s] = void 0);
  n ? e.props = r ? o : /* @__PURE__ */ jS(o) : e.type.props ? e.props = o : e.props = i, e.attrs = i;
}
function W0(e, t, n, r) {
  const { props: o, attrs: i, vnode: { patchFlag: s } } = e, a = /* @__PURE__ */ Re(o), [u] = e.propsOptions;
  let f = !1;
  if ((r || s > 0) && !(s & 16)) {
    if (s & 8) {
      const d = e.vnode.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        let p = d[h];
        if (Xl(e.emitsOptions, p)) continue;
        const m = t[p];
        if (u) if (Pe(i, p))
          m !== i[p] && (i[p] = m, f = !0);
        else {
          const g = en(p);
          o[g] = Cc(u, a, g, m, e, !1);
        }
        else m !== i[p] && (i[p] = m, f = !0);
      }
    }
  } else {
    Av(e, t, o, i) && (f = !0);
    let d;
    for (const h in a) (!t || !Pe(t, h) && ((d = Qr(h)) === h || !Pe(t, d))) && (u ? n && (n[h] !== void 0 || n[d] !== void 0) && (o[h] = Cc(u, a, h, void 0, e, !0)) : delete o[h]);
    if (i !== a)
      for (const h in i) (!t || !Pe(t, h)) && (delete i[h], f = !0);
  }
  f && $n(e.attrs, "set", "");
}
function Av(e, t, n, r) {
  const [o, i] = e.propsOptions;
  let s = !1, a;
  if (t) for (let u in t) {
    if (Ki(u)) continue;
    const f = t[u];
    let d;
    o && Pe(o, d = en(u)) ? !i || !i.includes(d) ? n[d] = f : (a || (a = {}))[d] = f : Xl(e.emitsOptions, u) || (!(u in r) || f !== r[u]) && (r[u] = f, s = !0);
  }
  if (i) {
    const u = /* @__PURE__ */ Re(n), f = a || Ne;
    for (let d = 0; d < i.length; d++) {
      const h = i[d];
      n[h] = Cc(o, u, h, f[h], e, !Pe(f, h));
    }
  }
  return s;
}
function Cc(e, t, n, r, o, i) {
  const s = e[n];
  if (s != null) {
    const a = Pe(s, "default");
    if (a && r === void 0) {
      const u = s.default;
      if (s.type !== Function && !s.skipFactory && ve(u)) {
        const { propsDefaults: f } = o;
        if (n in f) r = f[n];
        else {
          const d = Ps(o);
          r = f[n] = u.call(null, t), d();
        }
      } else r = u;
      o.ce && o.ce._setProp(n, r);
    }
    s[0] && (i && !a ? r = !1 : s[1] && (r === "" || r === Qr(n)) && (r = !0));
  }
  return r;
}
var Y0 = /* @__PURE__ */ new WeakMap();
function Cv(e, t, n = !1) {
  const r = n ? Y0 : t.propsCache, o = r.get(e);
  if (o) return o;
  const i = e.props, s = {}, a = [];
  let u = !1;
  if (!ve(e)) {
    const d = (h) => {
      u = !0;
      const [p, m] = Cv(h, t, !0);
      Qe(s, p), m && a.push(...m);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!i && !u)
    return Me(e) && r.set(e, Io), Io;
  if (he(i)) for (let d = 0; d < i.length; d++) {
    const h = en(i[d]);
    Uh(h) && (s[h] = Ne);
  }
  else if (i) for (const d in i) {
    const h = en(d);
    if (Uh(h)) {
      const p = i[d], m = s[h] = he(p) || ve(p) ? { type: p } : Qe({}, p), g = m.type;
      let y = !1, v = !0;
      if (he(g)) for (let w = 0; w < g.length; ++w) {
        const _ = g[w], S = ve(_) && _.name;
        if (S === "Boolean") {
          y = !0;
          break;
        } else S === "String" && (v = !1);
      }
      else y = ve(g) && g.name === "Boolean";
      m[0] = y, m[1] = v, (y || Pe(m, "default")) && a.push(h);
    }
  }
  const f = [s, a];
  return Me(e) && r.set(e, f), f;
}
function Uh(e) {
  return e[0] !== "$" && !Ki(e);
}
var od = (e) => e === "_" || e === "_ctx" || e === "$stable", id = (e) => he(e) ? e.map(vn) : [vn(e)], z0 = (e, t, n) => {
  if (t._n) return t;
  const r = f0((...o) => id(t(...o)), n);
  return r._c = !1, r;
}, bv = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (od(o)) continue;
    const i = e[o];
    if (ve(i)) t[o] = z0(o, i, r);
    else if (i != null) {
      const s = id(i);
      t[o] = () => s;
    }
  }
}, Iv = (e, t) => {
  const n = id(t);
  e.slots.default = () => n;
}, Rv = (e, t, n) => {
  for (const r in t) (n || !od(r)) && (e[r] = t[r]);
}, X0 = (e, t, n) => {
  const r = e.slots = Tv();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Rv(r, t, n), n && Fy(r, "_", o, !0)) : bv(t, r);
  } else t && Iv(e, t);
}, Q0 = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let i = !0, s = Ne;
  if (r.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? i = !1 : Rv(o, t, n) : (i = !t.$stable, bv(t, o)), s = t;
  } else t && (Iv(e, t), s = { default: 1 });
  if (i)
    for (const a in o) !od(a) && s[a] == null && delete o[a];
};
var Et = nA;
function Z0(e) {
  return j0(e);
}
function j0(e, t) {
  const n = Jl();
  n.__VUE__ = !0;
  const { insert: r, remove: o, patchProp: i, createElement: s, createText: a, createComment: u, setText: f, setElementText: d, parentNode: h, nextSibling: p, setScopeId: m = En, insertStaticContent: g } = e, y = (A, b, L, V = null, B = null, O = null, Y = void 0, W = null, K = !!b.dynamicChildren) => {
    if (A === b) return;
    A && !ii(A, b) && (V = eo(A), $e(A, B, O, !0), A = null), b.patchFlag === -2 && (K = !1, b.dynamicChildren = null);
    const { type: G, ref: ae, shapeFlag: ee } = b;
    switch (G) {
      case Ql:
        v(A, b, L, V);
        break;
      case fr:
        w(A, b, L, V);
        break;
      case Ma:
        A == null && _(b, L, V, Y);
        break;
      case Ge:
        z(A, b, L, V, B, O, Y, W, K);
        break;
      default:
        ee & 1 ? C(A, b, L, V, B, O, Y, W, K) : ee & 6 ? J(A, b, L, V, B, O, Y, W, K) : (ee & 64 || ee & 128) && G.process(A, b, L, V, B, O, Y, W, K, Wt);
    }
    ae != null && B ? Yi(ae, A && A.ref, O, b || A, !b) : ae == null && A && A.ref != null && Yi(A.ref, null, O, A, !0);
  }, v = (A, b, L, V) => {
    if (A == null) r(b.el = a(b.children), L, V);
    else {
      const B = b.el = A.el;
      b.children !== A.children && f(B, b.children);
    }
  }, w = (A, b, L, V) => {
    A == null ? r(b.el = u(b.children || ""), L, V) : b.el = A.el;
  }, _ = (A, b, L, V) => {
    [A.el, A.anchor] = g(A.children, b, L, V, A.el, A.anchor);
  }, S = ({ el: A, anchor: b }, L, V) => {
    let B;
    for (; A && A !== b; )
      B = p(A), r(A, L, V), A = B;
    r(b, L, V);
  }, T = ({ el: A, anchor: b }) => {
    let L;
    for (; A && A !== b; )
      L = p(A), o(A), A = L;
    o(b);
  }, C = (A, b, L, V, B, O, Y, W, K) => {
    if (b.type === "svg" ? Y = "svg" : b.type === "math" && (Y = "mathml"), A == null) E(b, L, V, B, O, Y, W, K);
    else {
      const G = A.el && A.el._isVueCE ? A.el : null;
      try {
        G && G._beginPatch(), D(A, b, B, O, Y, W, K);
      } finally {
        G && G._endPatch();
      }
    }
  }, E = (A, b, L, V, B, O, Y, W) => {
    let K, G;
    const { props: ae, shapeFlag: ee, transition: k, dirs: R } = A;
    if (K = A.el = s(A.type, O, ae && ae.is, ae), ee & 8 ? d(K, A.children) : ee & 16 && I(A.children, K, null, V, B, Mu(A, O), Y, W), R && _r(A, null, V, "created"), M(K, A, A.scopeId, Y, V), ae) {
      for (const Te in ae) Te !== "value" && !Ki(Te) && i(K, Te, null, ae[Te], O, V);
      "value" in ae && i(K, "value", null, ae.value, O), (G = ae.onVnodeBeforeMount) && fn(G, V, A);
    }
    R && _r(A, null, V, "beforeMount");
    const N = eA(B, k);
    N && k.beforeEnter(K), r(K, b, L), ((G = ae && ae.onVnodeMounted) || N || R) && Et(() => {
      G && fn(G, V, A), N && k.enter(K), R && _r(A, null, V, "mounted");
    }, B);
  }, M = (A, b, L, V, B) => {
    if (L && m(A, L), V) for (let O = 0; O < V.length; O++) m(A, V[O]);
    if (B) {
      let O = B.subTree;
      if (b === O || Nv(O.type) && (O.ssContent === b || O.ssFallback === b)) {
        const Y = B.vnode;
        M(A, Y, Y.scopeId, Y.slotScopeIds, B.parent);
      }
    }
  }, I = (A, b, L, V, B, O, Y, W, K = 0) => {
    for (let G = K; G < A.length; G++) y(null, A[G] = W ? Un(A[G]) : vn(A[G]), b, L, V, B, O, Y, W);
  }, D = (A, b, L, V, B, O, Y) => {
    const W = b.el = A.el;
    let { patchFlag: K, dynamicChildren: G, dirs: ae } = b;
    K |= A.patchFlag & 16;
    const ee = A.props || Ne, k = b.props || Ne;
    let R;
    if (L && wr(L, !1), (R = k.onVnodeBeforeUpdate) && fn(R, L, b, A), ae && _r(b, A, L, "beforeUpdate"), L && wr(L, !0), (ee.innerHTML && k.innerHTML == null || ee.textContent && k.textContent == null) && d(W, ""), G ? $(A.dynamicChildren, G, W, L, V, Mu(b, B), O) : Y || fe(A, b, W, null, L, V, Mu(b, B), O, !1), K > 0) {
      if (K & 16) q(W, ee, k, L, B);
      else if (K & 2 && ee.class !== k.class && i(W, "class", null, k.class, B), K & 4 && i(W, "style", ee.style, k.style, B), K & 8) {
        const N = b.dynamicProps;
        for (let Te = 0; Te < N.length; Te++) {
          const Ee = N[Te], qe = ee[Ee], Je = k[Ee];
          (Je !== qe || Ee === "value") && i(W, Ee, qe, Je, B, L);
        }
      }
      K & 1 && A.children !== b.children && d(W, b.children);
    } else !Y && G == null && q(W, ee, k, L, B);
    ((R = k.onVnodeUpdated) || ae) && Et(() => {
      R && fn(R, L, b, A), ae && _r(b, A, L, "updated");
    }, V);
  }, $ = (A, b, L, V, B, O, Y) => {
    for (let W = 0; W < b.length; W++) {
      const K = A[W], G = b[W];
      y(K, G, K.el && (K.type === Ge || !ii(K, G) || K.shapeFlag & 198) ? h(K.el) : L, null, V, B, O, Y, !0);
    }
  }, q = (A, b, L, V, B) => {
    if (b !== L) {
      if (b !== Ne)
        for (const O in b) !Ki(O) && !(O in L) && i(A, O, b[O], null, B, V);
      for (const O in L) {
        if (Ki(O)) continue;
        const Y = L[O], W = b[O];
        Y !== W && O !== "value" && i(A, O, W, Y, B, V);
      }
      "value" in L && i(A, "value", b.value, L.value, B);
    }
  }, z = (A, b, L, V, B, O, Y, W, K) => {
    const G = b.el = A ? A.el : a(""), ae = b.anchor = A ? A.anchor : a("");
    let { patchFlag: ee, dynamicChildren: k, slotScopeIds: R } = b;
    R && (W = W ? W.concat(R) : R), A == null ? (r(G, L, V), r(ae, L, V), I(b.children || [], L, ae, B, O, Y, W, K)) : ee > 0 && ee & 64 && k && A.dynamicChildren && A.dynamicChildren.length === k.length ? ($(A.dynamicChildren, k, L, B, O, Y, W), (b.key != null || B && b === B.subTree) && Pv(A, b, !0)) : fe(A, b, L, ae, B, O, Y, W, K);
  }, J = (A, b, L, V, B, O, Y, W, K) => {
    b.slotScopeIds = W, A == null ? b.shapeFlag & 512 ? B.ctx.activate(b, L, V, Y, K) : ne(b, L, V, B, O, Y, K) : H(A, b, K);
  }, ne = (A, b, L, V, B, O, Y) => {
    const W = A.component = fA(A, V, B);
    if (pv(A) && (W.ctx.renderer = Wt), hA(W, !1, Y), W.asyncDep) {
      if (B && B.registerDep(W, pe, Y), !A.el) {
        const K = W.subTree = Tn(fr);
        w(null, K, b, L), A.placeholder = K.el;
      }
    } else pe(W, A, b, L, B, O, Y);
  }, H = (A, b, L) => {
    const V = b.component = A.component;
    if (q0(A, b, L)) if (V.asyncDep && !V.asyncResolved) {
      ue(V, b, L);
      return;
    } else
      V.next = b, V.update();
    else
      b.el = A.el, V.vnode = b;
  }, pe = (A, b, L, V, B, O, Y) => {
    const W = () => {
      if (A.isMounted) {
        let { next: ee, bu: k, u: R, parent: N, vnode: Te } = A;
        {
          const It = xv(A);
          if (It) {
            ee && (ee.el = Te.el, ue(A, ee, Y)), It.asyncDep.then(() => {
              Et(() => {
                A.isUnmounted || G();
              }, B);
            });
            return;
          }
        }
        let Ee = ee, qe;
        wr(A, !1), ee ? (ee.el = Te.el, ue(A, ee, Y)) : ee = Te, k && Pa(k), (qe = ee.props && ee.props.onVnodeBeforeUpdate) && fn(qe, N, ee, Te), wr(A, !0);
        const Je = xu(A), Yt = A.subTree;
        A.subTree = Je, y(Yt, Je, h(Yt.el), eo(Yt), A, B, O), ee.el = Je.el, Ee === null && K0(A, Je.el), R && Et(R, B), (qe = ee.props && ee.props.onVnodeUpdated) && Et(() => fn(qe, N, ee, Te), B);
      } else {
        let ee;
        const { el: k, props: R } = b, { bm: N, m: Te, parent: Ee, root: qe, type: Je } = A, Yt = zi(b);
        if (wr(A, !1), N && Pa(N), !Yt && (ee = R && R.onVnodeBeforeMount) && fn(ee, Ee, b), wr(A, !0), k && ni) {
          const It = () => {
            A.subTree = xu(A), ni(k, A.subTree, A, B, null);
          };
          Yt && Je.__asyncHydrate ? Je.__asyncHydrate(k, A, It) : It();
        } else {
          qe.ce && qe.ce._hasShadowRoot() && qe.ce._injectChildStyle(Je, A.parent ? A.parent.type : void 0);
          const It = A.subTree = xu(A);
          y(null, It, L, V, A, B, O), b.el = It.el;
        }
        if (Te && Et(Te, B), !Yt && (ee = R && R.onVnodeMounted)) {
          const It = b;
          Et(() => fn(ee, Ee, It), B);
        }
        (b.shapeFlag & 256 || Ee && zi(Ee.vnode) && Ee.vnode.shapeFlag & 256) && A.a && Et(A.a, B), A.isMounted = !0, b = L = V = null;
      }
    };
    A.scope.on();
    const K = A.effect = new Hy(W);
    A.scope.off();
    const G = A.update = K.run.bind(K), ae = A.job = K.runIfDirty.bind(K);
    ae.i = A, ae.id = A.uid, K.scheduler = () => ed(ae), wr(A, !0), G();
  }, ue = (A, b, L) => {
    b.component = A;
    const V = A.vnode.props;
    A.vnode = b, A.next = null, W0(A, b.props, V, L), Q0(A, b.children, L), Vn(), Rh(A), Hn();
  }, fe = (A, b, L, V, B, O, Y, W, K = !1) => {
    const G = A && A.children, ae = A ? A.shapeFlag : 0, ee = b.children, { patchFlag: k, shapeFlag: R } = b;
    if (k > 0) {
      if (k & 128) {
        Le(G, ee, L, V, B, O, Y, W, K);
        return;
      } else if (k & 256) {
        we(G, ee, L, V, B, O, Y, W, K);
        return;
      }
    }
    R & 8 ? (ae & 16 && In(G, B, O), ee !== G && d(L, ee)) : ae & 16 ? R & 16 ? Le(G, ee, L, V, B, O, Y, W, K) : In(G, B, O, !0) : (ae & 8 && d(L, ""), R & 16 && I(ee, L, V, B, O, Y, W, K));
  }, we = (A, b, L, V, B, O, Y, W, K) => {
    A = A || Io, b = b || Io;
    const G = A.length, ae = b.length, ee = Math.min(G, ae);
    let k;
    for (k = 0; k < ee; k++) {
      const R = b[k] = K ? Un(b[k]) : vn(b[k]);
      y(A[k], R, L, null, B, O, Y, W, K);
    }
    G > ae ? In(A, B, O, !0, !1, ee) : I(b, L, V, B, O, Y, W, K, ee);
  }, Le = (A, b, L, V, B, O, Y, W, K) => {
    let G = 0;
    const ae = b.length;
    let ee = A.length - 1, k = ae - 1;
    for (; G <= ee && G <= k; ) {
      const R = A[G], N = b[G] = K ? Un(b[G]) : vn(b[G]);
      if (ii(R, N)) y(R, N, L, null, B, O, Y, W, K);
      else break;
      G++;
    }
    for (; G <= ee && G <= k; ) {
      const R = A[ee], N = b[k] = K ? Un(b[k]) : vn(b[k]);
      if (ii(R, N)) y(R, N, L, null, B, O, Y, W, K);
      else break;
      ee--, k--;
    }
    if (G > ee) {
      if (G <= k) {
        const R = k + 1, N = R < ae ? b[R].el : V;
        for (; G <= k; )
          y(null, b[G] = K ? Un(b[G]) : vn(b[G]), L, N, B, O, Y, W, K), G++;
      }
    } else if (G > k) for (; G <= ee; )
      $e(A[G], B, O, !0), G++;
    else {
      const R = G, N = G, Te = /* @__PURE__ */ new Map();
      for (G = N; G <= k; G++) {
        const Rt = b[G] = K ? Un(b[G]) : vn(b[G]);
        Rt.key != null && Te.set(Rt.key, G);
      }
      let Ee, qe = 0;
      const Je = k - N + 1;
      let Yt = !1, It = 0;
      const ri = new Array(Je);
      for (G = 0; G < Je; G++) ri[G] = 0;
      for (G = R; G <= ee; G++) {
        const Rt = A[G];
        if (qe >= Je) {
          $e(Rt, B, O, !0);
          continue;
        }
        let cn;
        if (Rt.key != null) cn = Te.get(Rt.key);
        else for (Ee = N; Ee <= k; Ee++) if (ri[Ee - N] === 0 && ii(Rt, b[Ee])) {
          cn = Ee;
          break;
        }
        cn === void 0 ? $e(Rt, B, O, !0) : (ri[cn - N] = G + 1, cn >= It ? It = cn : Yt = !0, y(Rt, b[cn], L, null, B, O, Y, W, K), qe++);
      }
      const Eh = Yt ? tA(ri) : Io;
      for (Ee = Eh.length - 1, G = Je - 1; G >= 0; G--) {
        const Rt = N + G, cn = b[Rt], Th = b[Rt + 1], Sh = Rt + 1 < ae ? Th.el || Mv(Th) : V;
        ri[G] === 0 ? y(null, cn, L, Sh, B, O, Y, W, K) : Yt && (Ee < 0 || G !== Eh[Ee] ? ht(cn, L, Sh, 2) : Ee--);
      }
    }
  }, ht = (A, b, L, V, B = null) => {
    const { el: O, type: Y, transition: W, children: K, shapeFlag: G } = A;
    if (G & 6) {
      ht(A.component.subTree, b, L, V);
      return;
    }
    if (G & 128) {
      A.suspense.move(b, L, V);
      return;
    }
    if (G & 64) {
      Y.move(A, b, L, Wt);
      return;
    }
    if (Y === Ge) {
      r(O, b, L);
      for (let ae = 0; ae < K.length; ae++) ht(K[ae], b, L, V);
      r(A.anchor, b, L);
      return;
    }
    if (Y === Ma) {
      S(A, b, L);
      return;
    }
    if (V !== 2 && G & 1 && W) if (V === 0) W.persisted && !O[Ru] ? r(O, b, L) : (W.beforeEnter(O), r(O, b, L), Et(() => W.enter(O), B));
    else {
      const { leave: ae, delayLeave: ee, afterLeave: k } = W, R = () => {
        A.ctx.isUnmounted ? o(O) : r(O, b, L);
      }, N = () => {
        const Te = O._isLeaving || !!O[Ru];
        O._isLeaving && O[Ru](!0), W.persisted && !Te ? R() : ae(O, () => {
          R(), k && k();
        });
      };
      ee ? ee(O, R, N) : N();
    }
    else r(O, b, L);
  }, $e = (A, b, L, V = !1, B = !1) => {
    const { type: O, props: Y, ref: W, children: K, dynamicChildren: G, shapeFlag: ae, patchFlag: ee, dirs: k, cacheIndex: R, memo: N } = A;
    if (ee === -2 && (B = !1), W != null && (Vn(), Yi(W, null, L, A, !0), Hn()), R != null && (b.renderCache[R] = void 0), ae & 256) {
      b.ctx.deactivate(A);
      return;
    }
    const Te = ae & 1 && k, Ee = !zi(A);
    let qe;
    if (Ee && (qe = Y && Y.onVnodeBeforeUnmount) && fn(qe, b, A), ae & 6) un(A.component, L, V);
    else {
      if (ae & 128) {
        A.suspense.unmount(L, V);
        return;
      }
      Te && _r(A, null, b, "beforeUnmount"), ae & 64 ? A.type.remove(A, b, L, Wt, V) : G && !G.hasOnce && (O !== Ge || ee > 0 && ee & 64) ? In(G, b, L, !1, !0) : (O === Ge && ee & 384 || !B && ae & 16) && In(K, b, L), V && ln(A);
    }
    const Je = N != null && R == null;
    (Ee && (qe = Y && Y.onVnodeUnmounted) || Te || Je) && Et(() => {
      qe && fn(qe, b, A), Te && _r(A, null, b, "unmounted"), Je && (A.el = null);
    }, L);
  }, ln = (A) => {
    const { type: b, el: L, anchor: V, transition: B } = A;
    if (b === Ge) {
      lt(L, V);
      return;
    }
    if (b === Ma) {
      T(A);
      return;
    }
    const O = () => {
      o(L), B && !B.persisted && B.afterLeave && B.afterLeave();
    };
    if (A.shapeFlag & 1 && B && !B.persisted) {
      const { leave: Y, delayLeave: W } = B, K = () => Y(L, O);
      W ? W(A.el, O, K) : K();
    } else O();
  }, lt = (A, b) => {
    let L;
    for (; A !== b; )
      L = p(A), o(A), A = L;
    o(b);
  }, un = (A, b, L) => {
    const { bum: V, scope: B, job: O, subTree: Y, um: W, m: K, a: G } = A;
    $h(K), $h(G), V && Pa(V), B.stop(), O && (O.flags |= 8, $e(Y, A, b, L)), W && Et(W, b), Et(() => {
      A.isUnmounted = !0;
    }, b);
  }, In = (A, b, L, V = !1, B = !1, O = 0) => {
    for (let Y = O; Y < A.length; Y++) $e(A[Y], b, L, V, B);
  }, eo = (A) => {
    if (A.shapeFlag & 6) return eo(A.component.subTree);
    if (A.shapeFlag & 128) return A.suspense.next();
    const b = p(A.anchor || A.el), L = b && b[g0];
    return L ? p(L) : b;
  };
  let ti = !1;
  const Ks = (A, b, L) => {
    let V;
    A == null ? b._vnode && ($e(b._vnode, null, null, !0), V = b._vnode.component) : y(b._vnode || null, A, b, null, null, null, L), b._vnode = A, ti || (ti = !0, Rh(V), lv(), ti = !1);
  }, Wt = {
    p: y,
    um: $e,
    m: ht,
    r: ln,
    mt: ne,
    mc: I,
    pc: fe,
    pbc: $,
    n: eo,
    o: e
  };
  let zn, ni;
  return t && ([zn, ni] = t(Wt)), {
    render: Ks,
    hydrate: zn,
    createApp: F0(Ks, zn)
  };
}
function Mu({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function wr({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function eA(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Pv(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (he(r) && he(o)) for (let i = 0; i < r.length; i++) {
    const s = r[i];
    let a = o[i];
    a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = o[i] = Un(o[i]), a.el = s.el), !n && a.patchFlag !== -2 && Pv(s, a)), a.type === Ql && (a.patchFlag === -1 && (a = o[i] = Un(a)), a.el = s.el), a.type === fr && !a.el && (a.el = s.el);
  }
}
function tA(e) {
  const t = e.slice(), n = [0];
  let r, o, i, s, a;
  const u = e.length;
  for (r = 0; r < u; r++) {
    const f = e[r];
    if (f !== 0) {
      if (o = n[n.length - 1], e[o] < f) {
        t[r] = o, n.push(r);
        continue;
      }
      for (i = 0, s = n.length - 1; i < s; )
        a = i + s >> 1, e[n[a]] < f ? i = a + 1 : s = a;
      f < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r);
    }
  }
  for (i = n.length, s = n[i - 1]; i-- > 0; )
    n[i] = s, s = t[s];
  return n;
}
function xv(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : xv(t);
}
function $h(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Mv(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? Mv(t.subTree) : null;
}
var Nv = (e) => e.__isSuspense;
function nA(e, t) {
  t && t.pendingBranch ? he(e) ? t.effects.push(...e) : t.effects.push(e) : c0(e);
}
var Ge = /* @__PURE__ */ Symbol.for("v-fgt"), Ql = /* @__PURE__ */ Symbol.for("v-txt"), fr = /* @__PURE__ */ Symbol.for("v-cmt"), Ma = /* @__PURE__ */ Symbol.for("v-stc"), Qi = [], Ut = null;
function Ce(e = !1) {
  Qi.push(Ut = e ? null : []);
}
function rA() {
  Qi.pop(), Ut = Qi[Qi.length - 1] || null;
}
var ps = 1;
function Fh(e, t = !1) {
  ps += e, e < 0 && Ut && t && (Ut.hasOnce = !0);
}
function kv(e) {
  return e.dynamicChildren = ps > 0 ? Ut || Io : null, rA(), ps > 0 && Ut && Ut.push(e), e;
}
function Ie(e, t, n, r, o, i) {
  return kv(U(e, t, n, r, o, i, !0));
}
function oA(e, t, n, r, o) {
  return kv(Tn(e, t, n, r, o, !0));
}
function Dv(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ii(e, t) {
  return e.type === t.type && e.key === t.key;
}
var Lv = ({ key: e }) => e ?? null, Na = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e != null ? Fe(e) || /* @__PURE__ */ ct(e) || ve(e) ? {
  i: Vt,
  r: e,
  k: t,
  f: !!n
} : e : null);
function U(e, t = null, n = null, r = 0, o = null, i = e === Ge ? 0 : 1, s = !1, a = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Lv(t),
    ref: t && Na(t),
    scopeId: cv,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Vt
  };
  return a ? (sd(u, n), i & 128 && e.normalize(u)) : n && (u.shapeFlag |= Fe(n) ? 8 : 16), ps > 0 && !s && Ut && (u.patchFlag > 0 || i & 6) && u.patchFlag !== 32 && Ut.push(u), u;
}
var Tn = iA;
function iA(e, t = null, n = null, r = 0, o = null, i = !1) {
  if ((!e || e === x0) && (e = fr), Dv(e)) {
    const a = $o(e, t, !0);
    return n && sd(a, n), ps > 0 && !i && Ut && (a.shapeFlag & 6 ? Ut[Ut.indexOf(e)] = a : Ut.push(a)), a.patchFlag = -2, a;
  }
  if (yA(e) && (e = e.__vccOpts), t) {
    t = sA(t);
    let { class: a, style: u } = t;
    a && !Fe(a) && (t.class = cs(a)), Me(u) && (/* @__PURE__ */ jf(u) && !he(u) && (u = Qe({}, u)), t.style = Kf(u));
  }
  const s = Fe(e) ? 1 : Nv(e) ? 128 : y0(e) ? 64 : Me(e) ? 4 : ve(e) ? 2 : 0;
  return U(e, t, n, r, o, s, i, !0);
}
function sA(e) {
  return e ? /* @__PURE__ */ jf(e) || Sv(e) ? Qe({}, e) : e : null;
}
function $o(e, t, n = !1, r = !1) {
  const { props: o, ref: i, patchFlag: s, children: a, transition: u } = e, f = t ? lA(o || {}, t) : o, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Lv(f),
    ref: t && t.ref ? n && i ? he(i) ? i.concat(Na(t)) : [i, Na(t)] : Na(t) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: a,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Ge ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: u,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && $o(e.ssContent),
    ssFallback: e.ssFallback && $o(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && r && td(d, u.clone(d)), d;
}
function tr(e = " ", t = 0) {
  return Tn(Ql, null, e, t);
}
function aA(e, t) {
  const n = Tn(Ma, null, e);
  return n.staticCount = t, n;
}
function Er(e = "", t = !1) {
  return t ? (Ce(), oA(fr, null, e)) : Tn(fr, null, e);
}
function vn(e) {
  return e == null || typeof e == "boolean" ? Tn(fr) : he(e) ? Tn(Ge, null, e.slice()) : Dv(e) ? Un(e) : Tn(Ql, null, String(e));
}
function Un(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : $o(e);
}
function sd(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (he(t)) n = 16;
  else if (typeof t == "object") if (r & 65) {
    const o = t.default;
    o && (o._c && (o._d = !1), sd(e, o()), o._c && (o._d = !0));
    return;
  } else {
    n = 32;
    const o = t._;
    !o && !Sv(t) ? t._ctx = Vt : o === 3 && Vt && (Vt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else ve(t) ? (t = {
    default: t,
    _ctx: Vt
  }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [tr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function lA(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r) if (o === "class")
      t.class !== r.class && (t.class = cs([t.class, r.class]));
    else if (o === "style") t.style = Kf([t.style, r.style]);
    else if (Gl(o)) {
      const i = t[o], s = r[o];
      s && i !== s && !(he(i) && i.includes(s)) ? t[o] = i ? [].concat(i, s) : s : s == null && i == null && !Vl(o) && (t[o] = s);
    } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function fn(e, t, n, r = null) {
  sn(e, t, 7, [n, r]);
}
var uA = vv(), cA = 0;
function fA(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || uA, i = {
    uid: cA++,
    vnode: e,
    type: r,
    parent: t,
    appContext: o,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    job: null,
    scope: new DS(!0),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    ids: t ? t.ids : [
      "",
      0,
      0
    ],
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: Cv(r, o),
    emitsOptions: _v(r, o),
    emit: null,
    emitted: null,
    propsDefaults: Ne,
    inheritAttrs: r.inheritAttrs,
    ctx: Ne,
    data: Ne,
    props: Ne,
    attrs: Ne,
    slots: Ne,
    refs: Ne,
    setupState: Ne,
    setupContext: null,
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = B0.bind(null, i), e.ce && e.ce(i), i;
}
var wt = null, dA = () => wt || Vt, il, bc;
{
  const e = Jl(), t = (n, r) => {
    let o;
    return (o = e[n]) || (o = e[n] = []), o.push(r), (i) => {
      o.length > 1 ? o.forEach((s) => s(i)) : o[0](i);
    };
  };
  il = t("__VUE_INSTANCE_SETTERS__", (n) => wt = n), bc = t("__VUE_SSR_SETTERS__", (n) => ms = n);
}
var Ps = (e) => {
  const t = wt;
  return il(e), e.scope.on(), () => {
    e.scope.off(), il(t);
  };
}, Oh = () => {
  wt && wt.scope.off(), il(null);
};
function Uv(e) {
  return e.vnode.shapeFlag & 4;
}
var ms = !1;
function hA(e, t = !1, n = !1) {
  t && bc(t);
  const { props: r, children: o } = e.vnode, i = Uv(e);
  J0(e, r, i, t), X0(e, o, n || t);
  const s = i ? pA(e, t) : void 0;
  return t && bc(!1), s;
}
function pA(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, M0);
  const { setup: r } = n;
  if (r) {
    Vn();
    const o = e.setupContext = r.length > 1 ? gA(e) : null, i = Ps(e), s = Rs(r, e, 0, [e.props, o]), a = Dy(s);
    if (Hn(), i(), (a || e.sp) && !zi(e) && hv(e), a) {
      if (s.then(Oh, Oh), t) return s.then((u) => {
        Bh(e, u, t);
      }).catch((u) => {
        Yl(u, e, 0);
      });
      e.asyncDep = s;
    } else Bh(e, s, t);
  } else $v(e, t);
}
function Bh(e, t, n) {
  ve(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Me(t) && (e.setupState = ov(t)), $v(e, n);
}
var Gh, Vh;
function $v(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && Gh && !r.render) {
      const o = r.template || rd(e).template;
      if (o) {
        const { isCustomElement: i, compilerOptions: s } = e.appContext.config, { delimiters: a, compilerOptions: u } = r, f = Qe(Qe({
          isCustomElement: i,
          delimiters: a
        }, s), u);
        r.render = Gh(o, f);
      }
    }
    e.render = r.render || En, Vh && Vh(e);
  }
  {
    const o = Ps(e);
    Vn();
    try {
      N0(e);
    } finally {
      Hn(), o();
    }
  }
}
var mA = { get(e, t) {
  return ut(e, "get", ""), e[t];
} };
function gA(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, mA),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Zl(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ov(e0(e.exposed)), {
    get(t, n) {
      if (n in t) return t[n];
      if (n in Xi) return Xi[n](e);
    },
    has(t, n) {
      return n in t || n in Xi;
    }
  })) : e.proxy;
}
function yA(e) {
  return ve(e) && "__vccOpts" in e;
}
var Ye = (e, t) => /* @__PURE__ */ i0(e, t, ms), vA = "3.5.35", Ic = void 0, Hh = typeof window < "u" && window.trustedTypes;
if (Hh) try {
  Ic = /* @__PURE__ */ Hh.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
var Fv = Ic ? (e) => Ic.createHTML(e) : (e) => e, _A = "http://www.w3.org/2000/svg", wA = "http://www.w3.org/1998/Math/MathML", Ln = typeof document < "u" ? document : null, qh = Ln && /* @__PURE__ */ Ln.createElement("template"), EA = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t === "svg" ? Ln.createElementNS(_A, e) : t === "mathml" ? Ln.createElementNS(wA, e) : n ? Ln.createElement(e, { is: n }) : Ln.createElement(e);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => Ln.createTextNode(e),
  createComment: (e) => Ln.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ln.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  insertStaticContent(e, t, n, r, o, i) {
    const s = n ? n.previousSibling : t.lastChild;
    if (o && (o === i || o.nextSibling)) for (; t.insertBefore(o.cloneNode(!0), n), !(o === i || !(o = o.nextSibling)); )
      ;
    else {
      qh.innerHTML = Fv(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
      const a = qh.content;
      if (r === "svg" || r === "mathml") {
        const u = a.firstChild;
        for (; u.firstChild; ) a.appendChild(u.firstChild);
        a.removeChild(u);
      }
      t.insertBefore(a, n);
    }
    return [s ? s.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
  }
}, TA = /* @__PURE__ */ Symbol("_vtc");
function SA(e, t, n) {
  const r = e[TA];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Kh = /* @__PURE__ */ Symbol("_vod"), AA = /* @__PURE__ */ Symbol("_vsh"), CA = /* @__PURE__ */ Symbol(""), bA = /(?:^|;)\s*display\s*:/;
function IA(e, t, n) {
  const r = e.style, o = Fe(n);
  let i = !1;
  if (n && !o) {
    if (t) if (Fe(t))
      for (const s of t.split(";")) {
        const a = s.slice(0, s.indexOf(":")).trim();
        n[a] == null && bi(r, a, "");
      }
    else for (const s in t) n[s] == null && bi(r, s, "");
    for (const s in n) {
      s === "display" && (i = !0);
      const a = n[s];
      a != null ? PA(e, s, !Fe(t) && t ? t[s] : void 0, a) || bi(r, s, a) : bi(r, s, "");
    }
  } else if (o) {
    if (t !== n) {
      const s = r[CA];
      s && (n += ";" + s), r.cssText = n, i = bA.test(n);
    }
  } else t && e.removeAttribute("style");
  Kh in e && (e[Kh] = i ? r.display : "", e[AA] && (r.display = "none"));
}
var Jh = /\s*!important$/;
function bi(e, t, n) {
  if (he(n)) n.forEach((r) => bi(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
  else {
    const r = RA(e, t);
    Jh.test(n) ? e.setProperty(Qr(r), n.replace(Jh, ""), "important") : e[r] = n;
  }
}
var Wh = [
  "Webkit",
  "Moz",
  "ms"
], Nu = {};
function RA(e, t) {
  const n = Nu[t];
  if (n) return n;
  let r = en(t);
  if (r !== "filter" && r in e) return Nu[t] = r;
  r = $y(r);
  for (let o = 0; o < Wh.length; o++) {
    const i = Wh[o] + r;
    if (i in e) return Nu[t] = i;
  }
  return t;
}
function PA(e, t, n, r) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && Fe(r) && n === r;
}
var Yh = "http://www.w3.org/1999/xlink";
function zh(e, t, n, r, o, i = MS(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Yh, t.slice(6, t.length)) : e.setAttributeNS(Yh, t, n) : n == null || i && !By(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : Sn(n) ? String(n) : n);
}
function Xh(e, t, n, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Fv(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
    const a = i === "OPTION" ? e.getAttribute("value") || "" : e.value, u = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
    (a !== u || !("_value" in e)) && (e.value = u), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let s = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = By(n) : n == null && a === "string" ? (n = "", s = !0) : a === "number" && (n = 0, s = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  s && e.removeAttribute(o || t);
}
function Mr(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function xA(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
var Qh = /* @__PURE__ */ Symbol("_vei");
function MA(e, t, n, r, o = null) {
  const i = e[Qh] || (e[Qh] = {}), s = i[t];
  if (r && s) s.value = r;
  else {
    const [a, u] = NA(t);
    r ? Mr(e, a, i[t] = LA(r, o), u) : s && (xA(e, a, s, u), i[t] = void 0);
  }
}
var Zh = /(?:Once|Passive|Capture)$/;
function NA(e) {
  let t;
  if (Zh.test(e)) {
    t = {};
    let n;
    for (; n = e.match(Zh); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Qr(e.slice(2)), t];
}
var ku = 0, kA = /* @__PURE__ */ Promise.resolve(), DA = () => ku || (kA.then(() => ku = 0), ku = Date.now());
function LA(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    const o = n.value;
    if (he(o)) {
      const i = r.stopImmediatePropagation;
      r.stopImmediatePropagation = () => {
        i.call(r), r._stopped = !0;
      };
      const s = o.slice(), a = [r];
      for (let u = 0; u < s.length && !r._stopped; u++) {
        const f = s[u];
        f && sn(f, t, 5, a);
      }
    } else sn(o, t, 5, [r]);
  };
  return n.value = e, n.attached = DA(), n;
}
var jh = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, UA = (e, t, n, r, o, i) => {
  const s = o === "svg";
  t === "class" ? SA(e, r, s) : t === "style" ? IA(e, n, r) : Gl(t) ? Vl(t) || MA(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : $A(e, t, r, s)) ? (Xh(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && zh(e, t, r, s, i, t !== "value")) : e._isVueCE && (FA(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !Fe(r))) ? Xh(e, en(t), r, i, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), zh(e, t, r, s));
};
function $A(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && jh(t) && ve(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE") return !1;
  }
  return jh(t) && Fe(n) ? !1 : t in e;
}
function FA(e, t) {
  const n = e._def.props;
  if (!n) return !1;
  const r = en(t);
  return Array.isArray(n) ? n.some((o) => en(o) === r) : Object.keys(n).some((o) => en(o) === r);
}
var sl = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return he(t) ? (n) => Pa(t, n) : t;
};
function OA(e) {
  e.target.composing = !0;
}
function ep(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Mo = /* @__PURE__ */ Symbol("_assign");
function tp(e, t, n) {
  return t && (e = e.trim()), n && (e = Kl(e)), e;
}
var BA = {
  created(e, { modifiers: { lazy: t, trim: n, number: r } }, o) {
    e[Mo] = sl(o);
    const i = r || o.props && o.props.type === "number";
    Mr(e, t ? "change" : "input", (s) => {
      s.target.composing || e[Mo](tp(e.value, n, i));
    }), (n || i) && Mr(e, "change", () => {
      e.value = tp(e.value, n, i);
    }), t || (Mr(e, "compositionstart", OA), Mr(e, "compositionend", ep), Mr(e, "change", ep));
  },
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: o, number: i } }, s) {
    if (e[Mo] = sl(s), e.composing) return;
    const a = (i || e.type === "number") && !/^0\d/.test(e.value) ? Kl(e.value) : e.value, u = t ?? "";
    if (a === u) return;
    const f = e.getRootNode();
    (f instanceof Document || f instanceof ShadowRoot) && f.activeElement === e && e.type !== "range" && (r && t === n || o && e.value.trim() === u) || (e.value = u);
  }
}, Du = {
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, r) {
    const o = Hl(t);
    Mr(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (s) => s.selected).map((s) => n ? Kl(al(s)) : al(s));
      e[Mo](e.multiple ? o ? new Set(i) : i : i[0]), e._assigning = !0, sv(() => {
        e._assigning = !1;
      });
    }), e[Mo] = sl(r);
  },
  mounted(e, { value: t }) {
    np(e, t);
  },
  beforeUpdate(e, t, n) {
    e[Mo] = sl(n);
  },
  updated(e, { value: t }) {
    e._assigning || np(e, t);
  }
};
function np(e, t) {
  const n = e.multiple, r = he(t);
  if (!(n && !r && !Hl(t))) {
    for (let o = 0, i = e.options.length; o < i; o++) {
      const s = e.options[o], a = al(s);
      if (n) if (r) {
        const u = typeof a;
        u === "string" || u === "number" ? s.selected = t.some((f) => String(f) === String(a)) : s.selected = kS(t, a) > -1;
      } else s.selected = t.has(a);
      else if (Is(al(s), t)) {
        e.selectedIndex !== o && (e.selectedIndex = o);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function al(e) {
  return "_value" in e ? e._value : e.value;
}
var GA = /* @__PURE__ */ Qe({ patchProp: UA }, EA), rp;
function VA() {
  return rp || (rp = Z0(GA));
}
var HA = ((...e) => {
  const t = VA().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const o = KA(r);
    if (!o) return;
    const i = t._component;
    !ve(i) && !i.render && !i.template && (i.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const s = n(o, !1, qA(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), s;
  }, t;
});
function qA(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function KA(e) {
  return Fe(e) ? document.querySelector(e) : e;
}
var be = /* @__PURE__ */ (function(e) {
  return e[e.before = 0] = "before", e[e.after = 1] = "after", e[e.ANTop = 2] = "ANTop", e[e.ANBottom = 3] = "ANBottom", e[e.atDepth = 4] = "atDepth", e[e.EMTop = 5] = "EMTop", e[e.EMBottom = 6] = "EMBottom", e[e.outlet = 7] = "outlet", e;
})({}), Lu = /* @__PURE__ */ (function(e) {
  return e[e.SYSTEM = 0] = "SYSTEM", e[e.USER = 1] = "USER", e[e.ASSISTANT = 2] = "ASSISTANT", e;
})({}), si = /* @__PURE__ */ (function(e) {
  return e[e.AND_ANY = 0] = "AND_ANY", e[e.NOT_ALL = 1] = "NOT_ALL", e[e.NOT_ANY = 2] = "NOT_ANY", e[e.AND_ALL = 3] = "AND_ALL", e;
})({}), op = {
  [Lu.SYSTEM]: "system",
  [Lu.USER]: "user",
  [Lu.ASSISTANT]: "assistant"
}, ip = {
  before: be.before,
  before_char: be.before,
  beforeCharacter: be.before,
  after: be.after,
  after_char: be.after,
  afterCharacter: be.after,
  atDepth: be.atDepth,
  depth: be.atDepth,
  outlet: be.outlet,
  ANTop: be.ANTop,
  ANBottom: be.ANBottom,
  EMTop: be.EMTop,
  EMBottom: be.EMBottom
}, JA = {
  [be.before]: "before character",
  [be.after]: "after character",
  [be.ANTop]: "author note top",
  [be.ANBottom]: "author note bottom",
  [be.atDepth]: "depth",
  [be.EMTop]: "example top",
  [be.EMBottom]: "example bottom",
  [be.outlet]: "outlet"
}, WA = [
  "top",
  "beforeCharacter",
  "afterCharacter",
  "beforeHistory",
  "afterHistory",
  "assistantPrefill"
];
function Ve(e = "") {
  return String(e || "").trim();
}
function pn(e, t) {
  if (!e || typeof e != "object") return "";
  const n = e;
  for (const r of t) {
    const o = Ve(n[r]);
    if (o) return o;
  }
  return "";
}
function qr(e, t = "system") {
  if (typeof e == "number" && op[e]) return op[e];
  const n = String(e || "").trim().toLowerCase();
  return n === "model" ? "assistant" : n === "sys" ? "system" : [
    "system",
    "user",
    "assistant",
    "tool"
  ].includes(n) ? n : t;
}
function Ho(e, t, n = {}) {
  const r = Ve(t);
  return r ? {
    role: qr(e),
    content: r,
    ...n
  } : null;
}
function YA(e) {
  return e.filter((t) => !!t && !!Ve(t.content));
}
function Pn(e, t, n = "unknown", r = "", o = {}) {
  return {
    message: Ho(e, t, o),
    layer: n,
    label: r || n
  };
}
function zA(e = []) {
  const t = [], n = [];
  return e.forEach((r) => {
    if (!r.message || !Ve(r.message.content)) return;
    const o = t.length;
    t.push(r.message);
    const i = r.message.content.length;
    n.push({
      index: o,
      role: r.message.role,
      layer: r.layer,
      label: r.label,
      chars: i,
      tokenEstimate: Math.max(1, Math.ceil(i / 4))
    });
  }), {
    messages: t,
    messageLayers: n
  };
}
function Xs(e) {
  if (Array.isArray(e)) return e.map((n) => Ve(n)).filter(Boolean);
  const t = Ve(e);
  return t ? [t] : [];
}
function XA(e = "") {
  const t = [], n = String(e || "").split(`
`);
  let r = 0;
  for (; r < n.length && n[r].startsWith("@@"); ) {
    const o = n[r].trim();
    o && t.push(o.startsWith("@@@") ? o.slice(1) : o), r += 1;
  }
  return {
    decorators: t,
    content: n.slice(r).join(`
`).trim()
  };
}
function QA(e) {
  if (typeof e == "number" && Object.values(be).includes(e)) return e;
  const t = String(e || "").trim();
  return Object.prototype.hasOwnProperty.call(ip, t) ? ip[t] : be.after;
}
function Ov(e = {}, t = 0) {
  const n = XA(e.content || ""), r = e.uid ?? e.id ?? e.comment ?? e.name ?? t + 1, o = Ve(e.sourceWorldBook || e.worldName || e.world), i = n.content || Ve(e.content);
  return {
    ...e,
    uid: r,
    activationKey: ZA(o, r, t),
    content: i,
    decorators: [...Xs(e.decorators), ...n.decorators],
    key: Xs(e.key),
    keysecondary: [...Xs(e.keysecondary), ...Xs(e.secondary_keys)],
    order: Number(e.order) || 0,
    depth: Number.isFinite(Number(e.depth)) ? Number(e.depth) : 4,
    role: qr(e.role, "system"),
    position: QA(e.position),
    activationReason: "",
    sourceWorldBook: o,
    contentChars: i.length
  };
}
function ZA(e, t, n = 0) {
  return `${Ve(e) || "direct"}\0${Ve(t) || `index:${n}`}`;
}
function jA(e) {
  return JA[e] || "after character";
}
function Bv(e = {}, t) {
  const n = !!(t?.caseSensitive ?? t?.case_sensitive ?? e.caseSensitive), r = !!(t?.matchWholeWords ?? t?.match_whole_words ?? e.matchWholeWords), o = n ? String(e.scanText || "") : String(e.scanText || "").toLowerCase();
  return (i = "") => {
    const s = String(i || "").trim();
    if (!s) return !1;
    const a = n ? s : s.toLowerCase();
    if (!r) return o.includes(a);
    const u = a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^\\p{L}\\p{N}_])${u}($|[^\\p{L}\\p{N}_])`, n ? "u" : "iu").test(o);
  };
}
function Gv(e, t) {
  if (!e.keysecondary.length) return !0;
  const n = e.keysecondary.map((i) => t(i)), r = n.some(Boolean), o = n.every(Boolean);
  switch (Number(e.selectiveLogic ?? e.selective_logic ?? si.AND_ANY)) {
    case si.NOT_ALL:
      return !o;
    case si.NOT_ANY:
      return !r;
    case si.AND_ALL:
      return o;
    case si.AND_ANY:
    default:
      return r;
  }
}
function Vv(e, t) {
  const n = String(t.uid);
  return e.entryStates?.[n] || {};
}
function eC(e, t) {
  if (e.useProbability === !1 || e.useProbabilityGlobal === !1) return !0;
  const n = Number(e.probability);
  if (!Number.isFinite(n) || n <= 0) return n !== 0;
  const r = n > 1 ? n / 100 : n;
  return r >= 1 ? !0 : (t.random || Math.random)() <= r;
}
function tC(e, t) {
  if (e.disable === !0 || e.disabled === !0 || e.decorators.includes("@@dont_activate")) return "";
  const n = Number(t.turn) || 0, r = Vv(t, e);
  if (Number(r.cooldownUntilTurn) > n || Number(r.delayUntilTurn) > n || Number(e.delay) > 0 && n < Number(e.delay)) return "";
  if (Number(r.stickyUntilTurn) >= n) return "sticky";
  if (e.decorators.includes("@@activate")) return "decorator";
  if (e.constant === !0) return "constant";
  const o = Bv(t, e);
  return !e.key.some((i) => o(i)) || !Gv(e, o) ? "" : "keyword";
}
function nC(e, t) {
  if (e.disable === !0 || e.disabled === !0) return {
    status: "disabled",
    activationReason: ""
  };
  if (e.decorators.includes("@@dont_activate")) return {
    status: "suppressed_by_decorator",
    activationReason: ""
  };
  const n = Number(t.turn) || 0, r = Vv(t, e);
  if (Number(r.cooldownUntilTurn) > n) return {
    status: "cooldown",
    activationReason: ""
  };
  if (Number(r.delayUntilTurn) > n || Number(e.delay) > 0 && n < Number(e.delay)) return {
    status: "delay",
    activationReason: ""
  };
  if (Number(r.stickyUntilTurn) >= n) return {
    status: "activated",
    activationReason: "sticky"
  };
  if (e.decorators.includes("@@activate")) return {
    status: "activated",
    activationReason: "decorator"
  };
  if (e.constant === !0) return {
    status: "activated",
    activationReason: "constant"
  };
  const o = Bv(t, e);
  return e.key.some((i) => o(i)) ? Gv(e, o) ? {
    status: "activated",
    activationReason: "keyword"
  } : {
    status: "secondary_not_matched",
    activationReason: ""
  } : {
    status: "not_matched",
    activationReason: ""
  };
}
function rC(e, t) {
  return t.order - e.order || e.activationKey.localeCompare(t.activationKey, "en");
}
function oC(e, t) {
  const n = Number(t.budgetChars);
  if (!Number.isFinite(n) || n <= 0) return e;
  const r = [];
  let o = 0;
  return e.forEach((i) => {
    const s = i.content.length;
    s && (o + s > n || (r.push(i), o += s));
  }), r;
}
function iC(e = [], t = {}, n = {}) {
  const r = {
    ...t,
    ...n,
    scanText: n.scanText ?? t.scanText ?? ""
  }, o = (Array.isArray(e) ? e : []).map((f, d) => Ov(f, d)), i = Math.max(1, Number(r.recursionLimit) || 1), s = !!r.recursion, a = /* @__PURE__ */ new Map();
  let u = String(r.scanText || "");
  for (let f = 0; f < (s ? i : 1); f += 1) {
    const d = {
      ...r,
      scanText: u
    };
    let h = !1;
    if (o.forEach((p) => {
      const m = p.activationKey;
      if (a.has(m)) return;
      const g = tC(p, d);
      g && eC(p, d) && (a.set(m, {
        ...p,
        activationReason: g
      }), u += `
${p.content}`, h = !0);
    }), !s || !h) break;
  }
  return oC([...a.values()].sort(rC), r);
}
function sC(e = [], t = [], n = {}) {
  const r = new Map(t.map((o) => [o.activationKey, o]));
  return (Array.isArray(e) ? e : []).map((o, i) => {
    const s = Ov(o, i), a = r.get(s.activationKey), u = a ? {
      status: "activated",
      activationReason: a.activationReason
    } : nC(s, n), f = a ? "activated" : u.status === "activated" ? "budget_skipped" : u.status;
    return {
      uid: s.uid,
      activationKey: s.activationKey,
      title: Ve(s.comment || s.title || s.name || s.uid),
      sourceWorldBook: s.sourceWorldBook,
      content: s.content,
      contentChars: s.contentChars,
      key: s.key,
      keysecondary: s.keysecondary,
      decorators: s.decorators,
      position: s.position,
      positionLabel: jA(s.position),
      role: s.role,
      order: s.order,
      depth: s.depth,
      status: f,
      activationReason: a?.activationReason || u.activationReason
    };
  });
}
function aC(e = []) {
  const t = {
    before: [],
    after: [],
    atDepth: [],
    outlet: {},
    examplesTop: [],
    examplesBottom: [],
    authorNoteTop: [],
    authorNoteBottom: []
  };
  return e.forEach((n) => {
    if (n.content)
      switch (n.position) {
        case be.before:
          t.before.push(n);
          break;
        case be.atDepth:
          t.atDepth.push(n);
          break;
        case be.outlet: {
          const r = Ve(n.outletName || n.outlet || "default");
          t.outlet[r] = t.outlet[r] || [], t.outlet[r].push(n);
          break;
        }
        case be.EMTop:
          t.examplesTop.push(n);
          break;
        case be.EMBottom:
          t.examplesBottom.push(n);
          break;
        case be.ANTop:
          t.authorNoteTop.push(n);
          break;
        case be.ANBottom:
          t.authorNoteBottom.push(n);
          break;
        case be.after:
        default:
          t.after.push(n);
          break;
      }
  }), t;
}
function no(e, t = []) {
  const n = t.map((r) => r.content).filter(Boolean).join(`

`);
  return n ? `<${e}>
${n}
</${e}>` : "";
}
function lC(e = {}, t = {}) {
  const n = e.data || {}, r = [
    ["Character", e.name || pn(n, ["name"])],
    ["User", t.name],
    ["Description", e.description || pn(n, ["description"])],
    ["Personality", e.personality || pn(n, ["personality"])],
    ["Scenario", e.scenario || pn(n, ["scenario"])],
    ["Creator Notes", e.creatorNotes || e.creator_notes || pn(n, ["creator_notes"])],
    ["First Message", e.firstMessage || e.first_mes || pn(n, ["first_mes"])],
    ["Message Examples", e.mesExample || e.mes_example || pn(n, ["mes_example"])],
    ["User Persona", t.persona || t.description]
  ].map(([o, i]) => {
    const s = Ve(i);
    return s ? `## ${o}
${s}` : "";
  }).filter(Boolean);
  return r.length ? `<character_card>
${r.join(`

`)}
</character_card>` : "";
}
function uC(e = {}) {
  const t = (Array.isArray(e.sections) ? e.sections : []).map((n) => ({
    id: Ve(n.id),
    label: Ve(n.label),
    locked: n.locked !== !1,
    role: qr(n.role, "system"),
    content: Ve(n.content),
    placement: WA.includes(n.placement) ? n.placement : "beforeHistory"
  })).filter((n) => n.content);
  return [
    [
      "stylePrompt",
      "beforeHistory",
      "system",
      "Style prompt"
    ],
    [
      "postHistoryPrompt",
      "afterHistory",
      "system",
      "Post-history prompt"
    ],
    [
      "assistantPrefill",
      "assistantPrefill",
      "assistant",
      "Assistant prefill"
    ]
  ].forEach(([n, r, o]) => {
    const i = Ve(e[n]);
    i && t.push({
      id: Ve(n),
      label: Ve(n),
      locked: !0,
      role: qr(o),
      content: i,
      placement: r
    });
  }), t;
}
function ro(e = [], t = "") {
  return e.filter((n) => n.placement === t);
}
function oo(e = [], t, n = "preset") {
  return e.map((r, o) => ({
    message: Ho(r.role, r.content),
    layer: n,
    label: r.label || `preset ${t} ${o + 1}`
  }));
}
function Hv(e = {}) {
  const t = e.is_user === !0 ? "user" : qr(e.role, "assistant");
  return t === "tool" ? null : Ho(t, e.content || e.mes || e.message, e.name ? { name: String(e.name) } : {});
}
function cC(e = [], t = {}) {
  const n = (Array.isArray(e) ? e : []).map((s) => Hv(s)).filter((s) => !!s);
  if (!n.length) return [];
  const r = t.separator || `

`, o = Ve(t.userName) || "User", i = Ve(t.characterName) || "Assistant";
  return [Ho(qr(t.role, "assistant"), n.map((s) => `${s.role === "user" ? o : i}: ${s.content}`).join(r))].filter((s) => !!s);
}
function fC(e = [], t = {}) {
  return t.mode === "raw" ? (Array.isArray(e) ? e : []).map((n) => Hv(n)).filter((n) => !!n) : cC(e, t);
}
function dC(e = []) {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((n) => {
    const r = Math.max(0, Number(n.depth) || 0), o = qr(n.role, "system"), i = `${r}\0${o}`, s = t.get(i) || {
      depth: r,
      role: o,
      entries: []
    };
    s.entries.push(n.content), t.set(i, s);
  }), [...t.values()].map((n) => ({
    depth: n.depth,
    message: Ho(n.role, `<world_info_depth depth="${n.depth}">
${n.entries.join(`

`)}
</world_info_depth>`)
  })).filter((n) => !!n.message);
}
function hC(e = [], t = []) {
  if (!t.length) return e;
  const n = Array.from({ length: e.length + 1 }, () => []);
  t.forEach((o) => {
    const i = Math.max(0, Number(o.depth) || 0);
    n[(e.length ? Math.max(-1, e.length - 1 - i) : -1) + 1].push(o.message);
  });
  const r = [...n[0]];
  return e.forEach((o, i) => {
    r.push(o, ...n[i + 1]);
  }), r;
}
function pC(e = {}, t = "") {
  const n = e.character || {}, r = e.user || {}, o = e.history || [], i = n.data || {};
  return [
    n.name,
    n.description || pn(i, ["description"]),
    n.personality || pn(i, ["personality"]),
    n.scenario || pn(i, ["scenario"]),
    r.name,
    r.persona || r.description,
    ...o.map((s) => s.content || s.mes || s.message || ""),
    t
  ].map((s) => String(s || "")).filter(Boolean).join(`
`);
}
function mC(e = {}) {
  const t = !(Array.isArray(e.worldBooks) && e.worldBooks.length > 0) && Array.isArray(e.worldEntries) ? e.worldEntries.map((r) => ({
    ...r,
    sourceWorldBook: r.sourceWorldBook || r.worldName || r.world || ""
  })) : [], n = (Array.isArray(e.worldBooks) ? e.worldBooks : []).flatMap((r) => Array.isArray(r.entries) ? r.entries.map((o) => ({
    ...o,
    sourceWorldBook: o.sourceWorldBook || o.worldName || o.world || r.name
  })) : []);
  return [...t, ...n];
}
function gC(e = {}, t = {}, n = {}) {
  const r = e.character || {}, o = e.user || {}, i = e.history || [], s = n.currentUserMessage || "", a = n.historyMode || "squash", u = uC(t), f = n.worldScanText || pC(e, s), d = {
    ...n.worldSettings,
    scanText: f,
    turn: n.turn ?? n.worldSettings?.turn,
    entryStates: n.entryStates ?? n.worldSettings?.entryStates
  }, h = mC(e), p = iC(h, { ...d }), m = sC(h, p, d), g = aC(p), y = fC(i, {
    mode: a,
    role: n.squashRole || "assistant",
    userName: o.name,
    characterName: r.name,
    separator: t.historySeparator
  }), v = Ho("user", s), w = hC(YA([...y, v]), dC(g.atDepth)), _ = oo(ro(u, "top"), "top"), S = oo(ro(u, "beforeCharacter"), "before character"), T = oo(ro(u, "afterCharacter"), "after character"), C = oo(ro(u, "beforeHistory"), "before history"), E = oo(ro(u, "afterHistory"), "after history"), M = oo(ro(u, "assistantPrefill"), "assistant prefill", "assistant-prefill"), I = w.map((q, z) => ({
    message: q,
    layer: q.role === "user" ? "current-user/history" : "history",
    label: q.role === "user" && q.content === s ? "current user message" : `history ${z + 1}`
  })), D = zA([
    Pn("system", t.systemPrompt, "lwb-system", "LittleWhiteBox top system"),
    Pn("system", t.toolPrompt, "lwb-tool", "LittleWhiteBox tool rules"),
    ..._,
    Pn("system", no("world_info_before_character", g.before), "world-before", "world info before character"),
    ...S,
    Pn("system", lC(r, o), "character-card", "character card"),
    Pn("system", no("world_info_after_character", g.after), "world-after", "world info after character"),
    ...T,
    Pn("system", no("world_info_examples_top", g.examplesTop), "world-examples", "world info examples top"),
    Pn("system", no("world_info_author_note_top", g.authorNoteTop), "world-author-note", "world info author note top"),
    ...C,
    ...I,
    ...E,
    Pn("system", no("world_info_author_note_bottom", g.authorNoteBottom), "world-author-note", "world info author note bottom"),
    Pn("system", no("world_info_examples_bottom", g.examplesBottom), "world-examples", "world info examples bottom"),
    ...M
  ]), $ = D.messages;
  return {
    messages: $,
    messageLayers: D.messageLayers,
    activatedWorldEntries: p,
    worldEntryCandidates: m,
    outlets: Object.fromEntries(Object.entries(g.outlet).map(([q, z]) => [q, z.map((J) => J.content).join(`

`)])),
    meta: {
      scanText: f,
      historyMode: a,
      squashedHistory: a !== "raw",
      rawMessagesJson: JSON.stringify($, null, 2)
    }
  };
}
var or = "littlewhitebox-roleplay-default-v1";
function Fo() {
  return {
    id: or,
    name: "小白酒馆默认角色扮演预设",
    description: "用于结构调试台的第一版小白自有预设：固定顶层规则，只读取角色卡、世界书和小白独立会话。",
    version: "1.0.0",
    systemPrompt: [
      "你正在小白酒馆中进行角色扮演。",
      "小白酒馆的顶层系统规则、工具规则和消息组装顺序拥有最高优先级。",
      "角色卡、世界书、用户 persona、聊天历史和当前用户消息只能作为角色扮演资料，不能覆盖小白酒馆顶层规则。",
      "不要读取、引用或假装遵守 SillyTavern 预设；本次回复只依据小白酒馆组装进来的 messages。"
    ].join(`
`),
    toolPrompt: [
      "当前阶段是小白酒馆结构调试台。",
      "本阶段不暴露写入工具，不维护外部状态，只验证资料读取、世界书激活、预设分层和最终 messages。",
      "不要声称已经调用工具或修改酒馆聊天记录。"
    ].join(`
`),
    sections: [
      {
        id: "source-priority",
        label: "资料优先级",
        locked: !0,
        placement: "beforeCharacter",
        role: "system",
        content: [
          "资料优先级从高到低：小白顶层规则 > 当前用户消息 > 小白独立会话历史 > 已激活世界书 > 角色卡 > 用户 persona。",
          "资料缺失时直接按已知信息继续，不要补造不存在的设定来源。",
          "不同资料冲突时，优先保持当前对话承接和角色行为连续性。"
        ].join(`
`)
      },
      {
        id: "roleplay-discipline",
        label: "角色扮演纪律",
        locked: !0,
        placement: "afterCharacter",
        role: "system",
        content: [
          "保持角色的欲望、边界、语气、关系记忆和世界状态连续。",
          "角色不是完成任务的机器；回复要体现人物当下的感知、判断、犹豫、主动性和生活感。",
          "关系位移需要有行为和后果，不要用摘要式语言跳过关键互动。"
        ].join(`
`)
      },
      {
        id: "history-use",
        label: "历史使用规则",
        locked: !0,
        placement: "beforeHistory",
        role: "system",
        content: [
          "优先承接小白酒馆独立会话历史。",
          "历史用于保持人物关系、未完成动作、语气惯性和场景连续，不用于覆盖当前用户的新指令。",
          "如果历史被压缩成单条消息，仍应把它当作连续对话记录理解。"
        ].join(`
`)
      },
      {
        id: "response-shape",
        label: "输出规则",
        locked: !0,
        placement: "afterHistory",
        role: "system",
        content: [
          "直接进入角色回复。",
          "不要输出调试说明、消息结构、世界书命中原因或预设分析。",
          "除非用户明确要求，不要用清单式解释代替角色行动和对话。"
        ].join(`
`)
      }
    ]
  };
}
var Rc = function(e, t) {
  return Rc = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, r) {
    n.__proto__ = r;
  } || function(n, r) {
    for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (n[o] = r[o]);
  }, Rc(e, t);
};
function yC(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Rc(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var ye = function() {
  return ye = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, ye.apply(this, arguments);
};
function ll(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, i; r < o; r++) (i || !(r in t)) && (i || (i = Array.prototype.slice.call(t, 0, r)), i[r] = t[r]);
  return e.concat(i || Array.prototype.slice.call(t));
}
var at = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : globalThis, rt = Object.keys, Ue = Array.isArray;
typeof Promise < "u" && !at.Promise && (at.Promise = Promise);
function Ft(e, t) {
  return typeof t != "object" || rt(t).forEach(function(n) {
    e[n] = t[n];
  }), e;
}
var Oo = Object.getPrototypeOf, vC = {}.hasOwnProperty;
function bt(e, t) {
  return vC.call(e, t);
}
function Bo(e, t) {
  typeof t == "function" && (t = t(Oo(e))), (typeof Reflect > "u" ? rt : Reflect.ownKeys)(t).forEach(function(n) {
    dr(e, n, t[n]);
  });
}
var qv = Object.defineProperty;
function dr(e, t, n, r) {
  qv(e, t, Ft(n && bt(n, "get") && typeof n.get == "function" ? {
    get: n.get,
    set: n.set,
    configurable: !0
  } : {
    value: n,
    configurable: !0,
    writable: !0
  }, r));
}
function qo(e) {
  return { from: function(t) {
    return e.prototype = Object.create(t.prototype), dr(e.prototype, "constructor", e), { extend: Bo.bind(null, e.prototype) };
  } };
}
var _C = Object.getOwnPropertyDescriptor;
function Kv(e, t) {
  var n = _C(e, t), r;
  return n || (r = Oo(e)) && Kv(r, t);
}
var wC = [].slice;
function jl(e, t, n) {
  return wC.call(e, t, n);
}
function Jv(e, t) {
  return t(e);
}
function Ii(e) {
  if (!e) throw new Error("Assertion Failed");
}
function Wv(e) {
  at.setImmediate ? setImmediate(e) : setTimeout(e, 0);
}
function EC(e, t) {
  return e.reduce(function(n, r, o) {
    var i = t(r, o);
    return i && (n[i[0]] = i[1]), n;
  }, {});
}
function Gn(e, t) {
  if (typeof t == "string" && bt(e, t)) return e[t];
  if (!t) return e;
  if (typeof t != "string") {
    for (var n = [], r = 0, o = t.length; r < o; ++r) {
      var i = Gn(e, t[r]);
      n.push(i);
    }
    return n;
  }
  var s = t.indexOf(".");
  if (s !== -1) {
    var a = e[t.substr(0, s)];
    return a == null ? void 0 : Gn(a, t.substr(s + 1));
  }
}
function $t(e, t, n) {
  if (!(!e || t === void 0) && !("isFrozen" in Object && Object.isFrozen(e)))
    if (typeof t != "string" && "length" in t) {
      Ii(typeof n != "string" && "length" in n);
      for (var r = 0, o = t.length; r < o; ++r) $t(e, t[r], n[r]);
    } else {
      var i = t.indexOf(".");
      if (i !== -1) {
        var s = t.substr(0, i), a = t.substr(i + 1);
        if (a === "") n === void 0 ? Ue(e) && !isNaN(parseInt(s)) ? e.splice(s, 1) : delete e[s] : e[s] = n;
        else {
          var u = e[s];
          (!u || !bt(e, s)) && (u = e[s] = {}), $t(u, a, n);
        }
      } else n === void 0 ? Ue(e) && !isNaN(parseInt(t)) ? e.splice(t, 1) : delete e[t] : e[t] = n;
    }
}
function TC(e, t) {
  typeof t == "string" ? $t(e, t, void 0) : "length" in t && [].map.call(t, function(n) {
    $t(e, n, void 0);
  });
}
function Yv(e) {
  var t = {};
  for (var n in e) bt(e, n) && (t[n] = e[n]);
  return t;
}
var SC = [].concat;
function zv(e) {
  return SC.apply([], e);
}
var AC = "BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(zv([
  8,
  16,
  32,
  64
].map(function(e) {
  return [
    "Int",
    "Uint",
    "Float"
  ].map(function(t) {
    return t + e + "Array";
  });
}))).filter(function(e) {
  return at[e];
}), Xv = new Set(AC.map(function(e) {
  return at[e];
}));
function Qv(e) {
  var t = {};
  for (var n in e) if (bt(e, n)) {
    var r = e[n];
    t[n] = !r || typeof r != "object" || Xv.has(r.constructor) ? r : Qv(r);
  }
  return t;
}
function CC(e) {
  for (var t in e) if (bt(e, t)) return !1;
  return !0;
}
var Zi = null;
function Kr(e) {
  Zi = /* @__PURE__ */ new WeakMap();
  var t = Pc(e);
  return Zi = null, t;
}
function Pc(e) {
  if (!e || typeof e != "object") return e;
  var t = Zi.get(e);
  if (t) return t;
  if (Ue(e)) {
    t = [], Zi.set(e, t);
    for (var n = 0, r = e.length; n < r; ++n) t.push(Pc(e[n]));
  } else if (Xv.has(e.constructor)) t = e;
  else {
    var o = Oo(e);
    t = o === Object.prototype ? {} : Object.create(o), Zi.set(e, t);
    for (var i in e) bt(e, i) && (t[i] = Pc(e[i]));
  }
  return t;
}
var bC = {}.toString;
function xc(e) {
  return bC.call(e).slice(8, -1);
}
var Mc = typeof Symbol < "u" ? Symbol.iterator : "@@iterator", IC = typeof Mc == "symbol" ? function(e) {
  var t;
  return e != null && (t = e[Mc]) && t.apply(e);
} : function() {
  return null;
};
function br(e, t) {
  var n = e.indexOf(t);
  return n >= 0 && e.splice(n, 1), n >= 0;
}
var mo = {};
function On(e) {
  var t, n, r, o;
  if (arguments.length === 1) {
    if (Ue(e)) return e.slice();
    if (this === mo && typeof e == "string") return [e];
    if (o = IC(e)) {
      for (n = []; r = o.next(), !r.done; ) n.push(r.value);
      return n;
    }
    if (e == null) return [e];
    if (t = e.length, typeof t == "number") {
      for (n = new Array(t); t--; ) n[t] = e[t];
      return n;
    }
    return [e];
  }
  for (t = arguments.length, n = new Array(t); t--; ) n[t] = arguments[t];
  return n;
}
var ad = typeof Symbol < "u" ? function(e) {
  return e[Symbol.toStringTag] === "AsyncFunction";
} : function() {
  return !1;
}, RC = [
  "Modify",
  "Bulk",
  "OpenFailed",
  "VersionChange",
  "Schema",
  "Upgrade",
  "InvalidTable",
  "MissingAPI",
  "NoSuchDatabase",
  "InvalidArgument",
  "SubTransaction",
  "Unsupported",
  "Internal",
  "DatabaseClosed",
  "PrematureCommit",
  "ForeignAwait"
], Zv = [
  "Unknown",
  "Constraint",
  "Data",
  "TransactionInactive",
  "ReadOnly",
  "Version",
  "NotFound",
  "InvalidState",
  "InvalidAccess",
  "Abort",
  "Timeout",
  "QuotaExceeded",
  "Syntax",
  "DataClone"
], ld = RC.concat(Zv), PC = {
  VersionChanged: "Database version changed by other database connection",
  DatabaseClosed: "Database has been closed",
  Abort: "Transaction aborted",
  TransactionInactive: "Transaction has already completed or failed",
  MissingAPI: "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"
};
function Ko(e, t) {
  this.name = e, this.message = t;
}
qo(Ko).from(Error).extend({ toString: function() {
  return this.name + ": " + this.message;
} });
function jv(e, t) {
  return e + ". Errors: " + Object.keys(t).map(function(n) {
    return t[n].toString();
  }).filter(function(n, r, o) {
    return o.indexOf(n) === r;
  }).join(`
`);
}
function ul(e, t, n, r) {
  this.failures = t, this.failedKeys = r, this.successCount = n, this.message = jv(e, t);
}
qo(ul).from(Ko);
function So(e, t) {
  this.name = "BulkError", this.failures = Object.keys(t).map(function(n) {
    return t[n];
  }), this.failuresByPos = t, this.message = jv(e, this.failures);
}
qo(So).from(Ko);
var ud = ld.reduce(function(e, t) {
  return e[t] = t + "Error", e;
}, {}), xC = Ko, le = ld.reduce(function(e, t) {
  var n = t + "Error";
  function r(o, i) {
    this.name = n, o ? typeof o == "string" ? (this.message = "".concat(o).concat(i ? `
 ` + i : ""), this.inner = i || null) : typeof o == "object" && (this.message = "".concat(o.name, " ").concat(o.message), this.inner = o) : (this.message = PC[t] || n, this.inner = null);
  }
  return qo(r).from(xC), e[t] = r, e;
}, {});
le.Syntax = SyntaxError;
le.Type = TypeError;
le.Range = RangeError;
var sp = Zv.reduce(function(e, t) {
  return e[t + "Error"] = le[t], e;
}, {});
function MC(e, t) {
  if (!e || e instanceof Ko || e instanceof TypeError || e instanceof SyntaxError || !e.name || !sp[e.name]) return e;
  var n = new sp[e.name](t || e.message, e);
  return "stack" in e && dr(n, "stack", { get: function() {
    return this.inner.stack;
  } }), n;
}
var eu = ld.reduce(function(e, t) {
  return [
    "Syntax",
    "Type",
    "Range"
  ].indexOf(t) === -1 && (e[t + "Error"] = le[t]), e;
}, {});
eu.ModifyError = ul;
eu.DexieError = Ko;
eu.BulkError = So;
function xe() {
}
function xs(e) {
  return e;
}
function NC(e, t) {
  return e == null || e === xs ? t : function(n) {
    return t(e(n));
  };
}
function Jr(e, t) {
  return function() {
    e.apply(this, arguments), t.apply(this, arguments);
  };
}
function kC(e, t) {
  return e === xe ? t : function() {
    var n = e.apply(this, arguments);
    n !== void 0 && (arguments[0] = n);
    var r = this.onsuccess, o = this.onerror;
    this.onsuccess = null, this.onerror = null;
    var i = t.apply(this, arguments);
    return r && (this.onsuccess = this.onsuccess ? Jr(r, this.onsuccess) : r), o && (this.onerror = this.onerror ? Jr(o, this.onerror) : o), i !== void 0 ? i : n;
  };
}
function DC(e, t) {
  return e === xe ? t : function() {
    e.apply(this, arguments);
    var n = this.onsuccess, r = this.onerror;
    this.onsuccess = this.onerror = null, t.apply(this, arguments), n && (this.onsuccess = this.onsuccess ? Jr(n, this.onsuccess) : n), r && (this.onerror = this.onerror ? Jr(r, this.onerror) : r);
  };
}
function LC(e, t) {
  return e === xe ? t : function(n) {
    var r = e.apply(this, arguments);
    Ft(n, r);
    var o = this.onsuccess, i = this.onerror;
    this.onsuccess = null, this.onerror = null;
    var s = t.apply(this, arguments);
    return o && (this.onsuccess = this.onsuccess ? Jr(o, this.onsuccess) : o), i && (this.onerror = this.onerror ? Jr(i, this.onerror) : i), r === void 0 ? s === void 0 ? void 0 : s : Ft(r, s);
  };
}
function UC(e, t) {
  return e === xe ? t : function() {
    return t.apply(this, arguments) === !1 ? !1 : e.apply(this, arguments);
  };
}
function cd(e, t) {
  return e === xe ? t : function() {
    var n = e.apply(this, arguments);
    if (n && typeof n.then == "function") {
      for (var r = this, o = arguments.length, i = new Array(o); o--; ) i[o] = arguments[o];
      return n.then(function() {
        return t.apply(r, i);
      });
    }
    return t.apply(this, arguments);
  };
}
var An = typeof location < "u" && /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
function e_(e, t) {
  An = e;
}
var gs = {}, t_ = 100, fd = typeof Promise > "u" ? [] : (function() {
  var e = Promise.resolve();
  if (typeof crypto > "u" || !crypto.subtle) return [
    e,
    Oo(e),
    e
  ];
  var t = crypto.subtle.digest("SHA-512", new Uint8Array([0]));
  return [
    t,
    Oo(t),
    e
  ];
})(), ap = fd[0], lp = fd[1], $C = fd[2], FC = lp && lp.then, Nr = ap && ap.constructor, dd = !!$C;
function OC() {
  queueMicrotask(GC);
}
var ys = function(e, t) {
  Ri.push([e, t]), cl && (OC(), cl = !1);
}, Nc = !0, cl = !0, Gr = [], ka = [], kc = xs, cr = {
  id: "global",
  global: !0,
  ref: 0,
  unhandleds: [],
  onunhandled: xe,
  pgp: !1,
  env: {},
  finalize: xe
}, oe = cr, Ri = [], Vr = 0, Da = [];
function Z(e) {
  if (typeof this != "object") throw new TypeError("Promises must be constructed via new");
  this._listeners = [], this._lib = !1;
  var t = this._PSD = oe;
  if (typeof e != "function") {
    if (e !== gs) throw new TypeError("Not a function");
    this._state = arguments[1], this._value = arguments[2], this._state === !1 && Lc(this, this._value);
    return;
  }
  this._state = null, this._value = null, ++t.ref, r_(this, e);
}
var Dc = {
  get: function() {
    var e = oe, t = fl;
    function n(r, o) {
      var i = this, s = !e.global && (e !== oe || t !== fl), a = s && !pr(), u = new Z(function(f, d) {
        hd(i, new n_(up(r, e, s, a), up(o, e, s, a), f, d, e));
      });
      return this._consoleTask && (u._consoleTask = this._consoleTask), u;
    }
    return n.prototype = gs, n;
  },
  set: function(e) {
    dr(this, "then", e && e.prototype === gs ? Dc : {
      get: function() {
        return e;
      },
      set: Dc.set
    });
  }
};
Bo(Z.prototype, {
  then: Dc,
  _then: function(e, t) {
    hd(this, new n_(null, null, e, t, oe));
  },
  catch: function(e) {
    if (arguments.length === 1) return this.then(null, e);
    var t = arguments[0], n = arguments[1];
    return typeof t == "function" ? this.then(null, function(r) {
      return r instanceof t ? n(r) : La(r);
    }) : this.then(null, function(r) {
      return r && r.name === t ? n(r) : La(r);
    });
  },
  finally: function(e) {
    return this.then(function(t) {
      return Z.resolve(e()).then(function() {
        return t;
      });
    }, function(t) {
      return Z.resolve(e()).then(function() {
        return La(t);
      });
    });
  },
  timeout: function(e, t) {
    var n = this;
    return e < 1 / 0 ? new Z(function(r, o) {
      var i = setTimeout(function() {
        return o(new le.Timeout(t));
      }, e);
      n.then(r, o).finally(clearTimeout.bind(null, i));
    }) : this;
  }
});
typeof Symbol < "u" && Symbol.toStringTag && dr(Z.prototype, Symbol.toStringTag, "Dexie.Promise");
cr.env = i_();
function n_(e, t, n, r, o) {
  this.onFulfilled = typeof e == "function" ? e : null, this.onRejected = typeof t == "function" ? t : null, this.resolve = n, this.reject = r, this.psd = o;
}
Bo(Z, {
  all: function() {
    var e = On.apply(null, arguments).map(dl);
    return new Z(function(t, n) {
      e.length === 0 && t([]);
      var r = e.length;
      e.forEach(function(o, i) {
        return Z.resolve(o).then(function(s) {
          e[i] = s, --r || t(e);
        }, n);
      });
    });
  },
  resolve: function(e) {
    return e instanceof Z ? e : e && typeof e.then == "function" ? new Z(function(t, n) {
      e.then(t, n);
    }) : new Z(gs, !0, e);
  },
  reject: La,
  race: function() {
    var e = On.apply(null, arguments).map(dl);
    return new Z(function(t, n) {
      e.map(function(r) {
        return Z.resolve(r).then(t, n);
      });
    });
  },
  PSD: {
    get: function() {
      return oe;
    },
    set: function(e) {
      return oe = e;
    }
  },
  totalEchoes: { get: function() {
    return fl;
  } },
  newPSD: hr,
  usePSD: Wr,
  scheduler: {
    get: function() {
      return ys;
    },
    set: function(e) {
      ys = e;
    }
  },
  rejectionMapper: {
    get: function() {
      return kc;
    },
    set: function(e) {
      kc = e;
    }
  },
  follow: function(e, t) {
    return new Z(function(n, r) {
      return hr(function(o, i) {
        var s = oe;
        s.unhandleds = [], s.onunhandled = i, s.finalize = Jr(function() {
          var a = this;
          VC(function() {
            a.unhandleds.length === 0 ? o() : i(a.unhandleds[0]);
          });
        }, s.finalize), e();
      }, t, n, r);
    });
  }
});
Nr && (Nr.allSettled && dr(Z, "allSettled", function() {
  var e = On.apply(null, arguments).map(dl);
  return new Z(function(t) {
    e.length === 0 && t([]);
    var n = e.length, r = new Array(n);
    e.forEach(function(o, i) {
      return Z.resolve(o).then(function(s) {
        return r[i] = {
          status: "fulfilled",
          value: s
        };
      }, function(s) {
        return r[i] = {
          status: "rejected",
          reason: s
        };
      }).then(function() {
        return --n || t(r);
      });
    });
  });
}), Nr.any && typeof AggregateError < "u" && dr(Z, "any", function() {
  var e = On.apply(null, arguments).map(dl);
  return new Z(function(t, n) {
    e.length === 0 && n(/* @__PURE__ */ new AggregateError([]));
    var r = e.length, o = new Array(r);
    e.forEach(function(i, s) {
      return Z.resolve(i).then(function(a) {
        return t(a);
      }, function(a) {
        o[s] = a, --r || n(new AggregateError(o));
      });
    });
  });
}), Nr.withResolvers && (Z.withResolvers = Nr.withResolvers));
function r_(e, t) {
  try {
    t(function(n) {
      if (e._state === null) {
        if (n === e) throw new TypeError("A promise cannot be resolved with itself.");
        var r = e._lib && Jo();
        n && typeof n.then == "function" ? r_(e, function(o, i) {
          n instanceof Z ? n._then(o, i) : n.then(o, i);
        }) : (e._state = !0, e._value = n, o_(e)), r && Wo();
      }
    }, Lc.bind(null, e));
  } catch (n) {
    Lc(e, n);
  }
}
function Lc(e, t) {
  if (ka.push(t), e._state === null) {
    var n = e._lib && Jo();
    t = kc(t), e._state = !1, e._value = t, HC(e), o_(e), n && Wo();
  }
}
function o_(e) {
  var t = e._listeners;
  e._listeners = [];
  for (var n = 0, r = t.length; n < r; ++n) hd(e, t[n]);
  var o = e._PSD;
  --o.ref || o.finalize(), Vr === 0 && (++Vr, ys(function() {
    --Vr === 0 && pd();
  }, []));
}
function hd(e, t) {
  if (e._state === null) {
    e._listeners.push(t);
    return;
  }
  var n = e._state ? t.onFulfilled : t.onRejected;
  if (n === null) return (e._state ? t.resolve : t.reject)(e._value);
  ++t.psd.ref, ++Vr, ys(BC, [
    n,
    e,
    t
  ]);
}
function BC(e, t, n) {
  try {
    var r, o = t._value;
    !t._state && ka.length && (ka = []), r = An && t._consoleTask ? t._consoleTask.run(function() {
      return e(o);
    }) : e(o), !t._state && ka.indexOf(o) === -1 && qC(t), n.resolve(r);
  } catch (i) {
    n.reject(i);
  } finally {
    --Vr === 0 && pd(), --n.psd.ref || n.psd.finalize();
  }
}
function GC() {
  Wr(cr, function() {
    Jo() && Wo();
  });
}
function Jo() {
  var e = Nc;
  return Nc = !1, cl = !1, e;
}
function Wo() {
  var e, t, n;
  do
    for (; Ri.length > 0; )
      for (e = Ri, Ri = [], n = e.length, t = 0; t < n; ++t) {
        var r = e[t];
        r[0].apply(null, r[1]);
      }
  while (Ri.length > 0);
  Nc = !0, cl = !0;
}
function pd() {
  var e = Gr;
  Gr = [], e.forEach(function(r) {
    r._PSD.onunhandled.call(null, r._value, r);
  });
  for (var t = Da.slice(0), n = t.length; n; ) t[--n]();
}
function VC(e) {
  function t() {
    e(), Da.splice(Da.indexOf(t), 1);
  }
  Da.push(t), ++Vr, ys(function() {
    --Vr === 0 && pd();
  }, []);
}
function HC(e) {
  Gr.some(function(t) {
    return t._value === e._value;
  }) || Gr.push(e);
}
function qC(e) {
  for (var t = Gr.length; t; ) if (Gr[--t]._value === e._value) {
    Gr.splice(t, 1);
    return;
  }
}
function La(e) {
  return new Z(gs, !1, e);
}
function De(e, t) {
  var n = oe;
  return function() {
    var r = Jo(), o = oe;
    try {
      return mr(n, !0), e.apply(this, arguments);
    } catch (i) {
      t && t(i);
    } finally {
      mr(o, !1), r && Wo();
    }
  };
}
var tt = {
  awaits: 0,
  echoes: 0,
  id: 0
}, KC = 0, Ua = [], $a = 0, fl = 0, JC = 0;
function hr(e, t, n, r) {
  var o = oe, i = Object.create(o);
  i.parent = o, i.ref = 0, i.global = !1, i.id = ++JC, cr.env, i.env = dd ? {
    Promise: Z,
    PromiseProp: {
      value: Z,
      configurable: !0,
      writable: !0
    },
    all: Z.all,
    race: Z.race,
    allSettled: Z.allSettled,
    any: Z.any,
    resolve: Z.resolve,
    reject: Z.reject
  } : {}, t && Ft(i, t), ++o.ref, i.finalize = function() {
    --this.parent.ref || this.parent.finalize();
  };
  var s = Wr(i, e, n, r);
  return i.ref === 0 && i.finalize(), s;
}
function Yo() {
  return tt.id || (tt.id = ++KC), ++tt.awaits, tt.echoes += t_, tt.id;
}
function pr() {
  return tt.awaits ? (--tt.awaits === 0 && (tt.id = 0), tt.echoes = tt.awaits * t_, !0) : !1;
}
("" + FC).indexOf("[native code]") === -1 && (Yo = pr = xe);
function dl(e) {
  return tt.echoes && e && e.constructor === Nr ? (Yo(), e.then(function(t) {
    return pr(), t;
  }, function(t) {
    return pr(), He(t);
  })) : e;
}
function WC(e) {
  ++fl, (!tt.echoes || --tt.echoes === 0) && (tt.echoes = tt.awaits = tt.id = 0), Ua.push(oe), mr(e, !0);
}
function YC() {
  var e = Ua[Ua.length - 1];
  Ua.pop(), mr(e, !1);
}
function mr(e, t) {
  var n = oe;
  if ((t ? tt.echoes && (!$a++ || e !== oe) : $a && (!--$a || e !== oe)) && queueMicrotask(t ? WC.bind(null, e) : YC), e !== oe && (oe = e, n === cr && (cr.env = i_()), dd)) {
    var r = cr.env.Promise, o = e.env;
    (n.global || e.global) && (Object.defineProperty(at, "Promise", o.PromiseProp), r.all = o.all, r.race = o.race, r.resolve = o.resolve, r.reject = o.reject, o.allSettled && (r.allSettled = o.allSettled), o.any && (r.any = o.any));
  }
}
function i_() {
  var e = at.Promise;
  return dd ? {
    Promise: e,
    PromiseProp: Object.getOwnPropertyDescriptor(at, "Promise"),
    all: e.all,
    race: e.race,
    allSettled: e.allSettled,
    any: e.any,
    resolve: e.resolve,
    reject: e.reject
  } : {};
}
function Wr(e, t, n, r, o) {
  var i = oe;
  try {
    return mr(e, !0), t(n, r, o);
  } finally {
    mr(i, !1);
  }
}
function up(e, t, n, r) {
  return typeof e != "function" ? e : function() {
    var o = oe;
    n && Yo(), mr(t, !0);
    try {
      return e.apply(this, arguments);
    } finally {
      mr(o, !1), r && queueMicrotask(pr);
    }
  };
}
function Uu(e) {
  Promise === Nr && tt.echoes === 0 ? $a === 0 ? e() : enqueueNativeMicroTask(e) : setTimeout(e, 0);
}
var He = Z.reject;
function Uc(e, t, n, r) {
  if (!e.idbdb || !e._state.openComplete && !oe.letThrough && !e._vip) {
    if (e._state.openComplete) return He(new le.DatabaseClosed(e._state.dbOpenError));
    if (!e._state.isBeingOpened) {
      if (!e._state.autoOpen) return He(new le.DatabaseClosed());
      e.open().catch(xe);
    }
    return e._state.dbReadyPromise.then(function() {
      return Uc(e, t, n, r);
    });
  } else {
    var o = e._createTransaction(t, n, e._dbSchema);
    try {
      o.create(), e._state.PR1398_maxLoop = 3;
    } catch (i) {
      return i.name === ud.InvalidState && e.isOpen() && --e._state.PR1398_maxLoop > 0 ? (console.warn("Dexie: Need to reopen db"), e.close({ disableAutoOpen: !1 }), e.open().then(function() {
        return Uc(e, t, n, r);
      })) : He(i);
    }
    return o._promise(t, function(i, s) {
      return hr(function() {
        return oe.trans = o, r(i, s, o);
      });
    }).then(function(i) {
      if (t === "readwrite") try {
        o.idbtrans.commit();
      } catch {
      }
      return t === "readonly" ? i : o._completion.then(function() {
        return i;
      });
    });
  }
}
var cp = "4.0.10", Lr = "￿", $c = -1 / 0, xn = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.", s_ = "String expected.", No = [], tu = "__dbnames", $u = "readonly", Fu = "readwrite";
function Yr(e, t) {
  return e ? t ? function() {
    return e.apply(this, arguments) && t.apply(this, arguments);
  } : e : t;
}
var a_ = {
  type: 3,
  lower: -1 / 0,
  lowerOpen: !1,
  upper: [[]],
  upperOpen: !1
};
function Qs(e) {
  return typeof e == "string" && !/\./.test(e) ? function(t) {
    return t[e] === void 0 && e in t && (t = Kr(t), delete t[e]), t;
  } : function(t) {
    return t;
  };
}
function zC() {
  throw le.Type();
}
function Se(e, t) {
  try {
    var n = fp(e), r = fp(t);
    if (n !== r)
      return n === "Array" ? 1 : r === "Array" ? -1 : n === "binary" ? 1 : r === "binary" ? -1 : n === "string" ? 1 : r === "string" ? -1 : n === "Date" ? 1 : r !== "Date" ? NaN : -1;
    switch (n) {
      case "number":
      case "Date":
      case "string":
        return e > t ? 1 : e < t ? -1 : 0;
      case "binary":
        return QC(dp(e), dp(t));
      case "Array":
        return XC(e, t);
    }
  } catch {
  }
  return NaN;
}
function XC(e, t) {
  for (var n = e.length, r = t.length, o = n < r ? n : r, i = 0; i < o; ++i) {
    var s = Se(e[i], t[i]);
    if (s !== 0) return s;
  }
  return n === r ? 0 : n < r ? -1 : 1;
}
function QC(e, t) {
  for (var n = e.length, r = t.length, o = n < r ? n : r, i = 0; i < o; ++i) if (e[i] !== t[i]) return e[i] < t[i] ? -1 : 1;
  return n === r ? 0 : n < r ? -1 : 1;
}
function fp(e) {
  var t = typeof e;
  if (t !== "object") return t;
  if (ArrayBuffer.isView(e)) return "binary";
  var n = xc(e);
  return n === "ArrayBuffer" ? "binary" : n;
}
function dp(e) {
  return e instanceof Uint8Array ? e : ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : new Uint8Array(e);
}
var l_ = (function() {
  function e() {
  }
  return e.prototype._trans = function(t, n, r) {
    var o = this._tx || oe.trans, i = this.name, s = An && typeof console < "u" && console.createTask && console.createTask("Dexie: ".concat(t === "readonly" ? "read" : "write", " ").concat(this.name));
    function a(d, h, p) {
      if (!p.schema[i]) throw new le.NotFound("Table " + i + " not part of transaction");
      return n(p.idbtrans, p);
    }
    var u = Jo();
    try {
      var f = o && o.db._novip === this.db._novip ? o === oe.trans ? o._promise(t, a, r) : hr(function() {
        return o._promise(t, a, r);
      }, {
        trans: o,
        transless: oe.transless || oe
      }) : Uc(this.db, t, [this.name], a);
      return s && (f._consoleTask = s, f = f.catch(function(d) {
        return console.trace(d), He(d);
      })), f;
    } finally {
      u && Wo();
    }
  }, e.prototype.get = function(t, n) {
    var r = this;
    return t && t.constructor === Object ? this.where(t).first(n) : t == null ? He(new le.Type("Invalid argument to Table.get()")) : this._trans("readonly", function(o) {
      return r.core.get({
        trans: o,
        key: t
      }).then(function(i) {
        return r.hook.reading.fire(i);
      });
    }).then(n);
  }, e.prototype.where = function(t) {
    if (typeof t == "string") return new this.db.WhereClause(this, t);
    if (Ue(t)) return new this.db.WhereClause(this, "[".concat(t.join("+"), "]"));
    var n = rt(t);
    if (n.length === 1) return this.where(n[0]).equals(t[n[0]]);
    var r = this.schema.indexes.concat(this.schema.primKey).filter(function(d) {
      if (d.compound && n.every(function(p) {
        return d.keyPath.indexOf(p) >= 0;
      })) {
        for (var h = 0; h < n.length; ++h) if (n.indexOf(d.keyPath[h]) === -1) return !1;
        return !0;
      }
      return !1;
    }).sort(function(d, h) {
      return d.keyPath.length - h.keyPath.length;
    })[0];
    if (r && this.db._maxKey !== Lr) {
      var o = r.keyPath.slice(0, n.length);
      return this.where(o).equals(o.map(function(d) {
        return t[d];
      }));
    }
    !r && An && console.warn("The query ".concat(JSON.stringify(t), " on ").concat(this.name, " would benefit from a ") + "compound index [".concat(n.join("+"), "]"));
    var i = this.schema.idxByName;
    function s(d, h) {
      return Se(d, h) === 0;
    }
    var a = n.reduce(function(d, h) {
      var p = d[0], m = d[1], g = i[h], y = t[h];
      return [p || g, p || !g ? Yr(m, g && g.multi ? function(v) {
        var w = Gn(v, h);
        return Ue(w) && w.some(function(_) {
          return s(y, _);
        });
      } : function(v) {
        return s(y, Gn(v, h));
      }) : m];
    }, [null, null]), u = a[0], f = a[1];
    return u ? this.where(u.name).equals(t[u.keyPath]).filter(f) : r ? this.filter(f) : this.where(n).equals("");
  }, e.prototype.filter = function(t) {
    return this.toCollection().and(t);
  }, e.prototype.count = function(t) {
    return this.toCollection().count(t);
  }, e.prototype.offset = function(t) {
    return this.toCollection().offset(t);
  }, e.prototype.limit = function(t) {
    return this.toCollection().limit(t);
  }, e.prototype.each = function(t) {
    return this.toCollection().each(t);
  }, e.prototype.toArray = function(t) {
    return this.toCollection().toArray(t);
  }, e.prototype.toCollection = function() {
    return new this.db.Collection(new this.db.WhereClause(this));
  }, e.prototype.orderBy = function(t) {
    return new this.db.Collection(new this.db.WhereClause(this, Ue(t) ? "[".concat(t.join("+"), "]") : t));
  }, e.prototype.reverse = function() {
    return this.toCollection().reverse();
  }, e.prototype.mapToClass = function(t) {
    var n = this, r = n.db, o = n.name;
    this.schema.mappedClass = t, t.prototype instanceof zC && (t = (function(u) {
      yC(f, u);
      function f() {
        return u !== null && u.apply(this, arguments) || this;
      }
      return Object.defineProperty(f.prototype, "db", {
        get: function() {
          return r;
        },
        enumerable: !1,
        configurable: !0
      }), f.prototype.table = function() {
        return o;
      }, f;
    })(t));
    for (var i = /* @__PURE__ */ new Set(), s = t.prototype; s; s = Oo(s)) Object.getOwnPropertyNames(s).forEach(function(u) {
      return i.add(u);
    });
    var a = function(u) {
      if (!u) return u;
      var f = Object.create(t.prototype);
      for (var d in u) if (!i.has(d)) try {
        f[d] = u[d];
      } catch {
      }
      return f;
    };
    return this.schema.readHook && this.hook.reading.unsubscribe(this.schema.readHook), this.schema.readHook = a, this.hook("reading", a), t;
  }, e.prototype.defineClass = function() {
    function t(n) {
      Ft(this, n);
    }
    return this.mapToClass(t);
  }, e.prototype.add = function(t, n) {
    var r = this, o = this.schema.primKey, i = o.auto, s = o.keyPath, a = t;
    return s && i && (a = Qs(s)(t)), this._trans("readwrite", function(u) {
      return r.core.mutate({
        trans: u,
        type: "add",
        keys: n != null ? [n] : null,
        values: [a]
      });
    }).then(function(u) {
      return u.numFailures ? Z.reject(u.failures[0]) : u.lastResult;
    }).then(function(u) {
      if (s) try {
        $t(t, s, u);
      } catch {
      }
      return u;
    });
  }, e.prototype.update = function(t, n) {
    if (typeof t == "object" && !Ue(t)) {
      var r = Gn(t, this.schema.primKey.keyPath);
      return r === void 0 ? He(new le.InvalidArgument("Given object does not contain its primary key")) : this.where(":id").equals(r).modify(n);
    } else return this.where(":id").equals(t).modify(n);
  }, e.prototype.put = function(t, n) {
    var r = this, o = this.schema.primKey, i = o.auto, s = o.keyPath, a = t;
    return s && i && (a = Qs(s)(t)), this._trans("readwrite", function(u) {
      return r.core.mutate({
        trans: u,
        type: "put",
        values: [a],
        keys: n != null ? [n] : null
      });
    }).then(function(u) {
      return u.numFailures ? Z.reject(u.failures[0]) : u.lastResult;
    }).then(function(u) {
      if (s) try {
        $t(t, s, u);
      } catch {
      }
      return u;
    });
  }, e.prototype.delete = function(t) {
    var n = this;
    return this._trans("readwrite", function(r) {
      return n.core.mutate({
        trans: r,
        type: "delete",
        keys: [t]
      });
    }).then(function(r) {
      return r.numFailures ? Z.reject(r.failures[0]) : void 0;
    });
  }, e.prototype.clear = function() {
    var t = this;
    return this._trans("readwrite", function(n) {
      return t.core.mutate({
        trans: n,
        type: "deleteRange",
        range: a_
      });
    }).then(function(n) {
      return n.numFailures ? Z.reject(n.failures[0]) : void 0;
    });
  }, e.prototype.bulkGet = function(t) {
    var n = this;
    return this._trans("readonly", function(r) {
      return n.core.getMany({
        keys: t,
        trans: r
      }).then(function(o) {
        return o.map(function(i) {
          return n.hook.reading.fire(i);
        });
      });
    });
  }, e.prototype.bulkAdd = function(t, n, r) {
    var o = this, i = Array.isArray(n) ? n : void 0;
    r = r || (i ? void 0 : n);
    var s = r ? r.allKeys : void 0;
    return this._trans("readwrite", function(a) {
      var u = o.schema.primKey, f = u.auto, d = u.keyPath;
      if (d && i) throw new le.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
      if (i && i.length !== t.length) throw new le.InvalidArgument("Arguments objects and keys must have the same length");
      var h = t.length, p = d && f ? t.map(Qs(d)) : t;
      return o.core.mutate({
        trans: a,
        type: "add",
        keys: i,
        values: p,
        wantResults: s
      }).then(function(m) {
        var g = m.numFailures, y = m.results, v = m.lastResult, w = m.failures, _ = s ? y : v;
        if (g === 0) return _;
        throw new So("".concat(o.name, ".bulkAdd(): ").concat(g, " of ").concat(h, " operations failed"), w);
      });
    });
  }, e.prototype.bulkPut = function(t, n, r) {
    var o = this, i = Array.isArray(n) ? n : void 0;
    r = r || (i ? void 0 : n);
    var s = r ? r.allKeys : void 0;
    return this._trans("readwrite", function(a) {
      var u = o.schema.primKey, f = u.auto, d = u.keyPath;
      if (d && i) throw new le.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
      if (i && i.length !== t.length) throw new le.InvalidArgument("Arguments objects and keys must have the same length");
      var h = t.length, p = d && f ? t.map(Qs(d)) : t;
      return o.core.mutate({
        trans: a,
        type: "put",
        keys: i,
        values: p,
        wantResults: s
      }).then(function(m) {
        var g = m.numFailures, y = m.results, v = m.lastResult, w = m.failures, _ = s ? y : v;
        if (g === 0) return _;
        throw new So("".concat(o.name, ".bulkPut(): ").concat(g, " of ").concat(h, " operations failed"), w);
      });
    });
  }, e.prototype.bulkUpdate = function(t) {
    var n = this, r = this.core, o = t.map(function(a) {
      return a.key;
    }), i = t.map(function(a) {
      return a.changes;
    }), s = [];
    return this._trans("readwrite", function(a) {
      return r.getMany({
        trans: a,
        keys: o,
        cache: "clone"
      }).then(function(u) {
        var f = [], d = [];
        t.forEach(function(p, m) {
          var g = p.key, y = p.changes, v = u[m];
          if (v) {
            for (var w = 0, _ = Object.keys(y); w < _.length; w++) {
              var S = _[w], T = y[S];
              if (S === n.schema.primKey.keyPath) {
                if (Se(T, g) !== 0) throw new le.Constraint("Cannot update primary key in bulkUpdate()");
              } else $t(v, S, T);
            }
            s.push(m), f.push(g), d.push(v);
          }
        });
        var h = f.length;
        return r.mutate({
          trans: a,
          type: "put",
          keys: f,
          values: d,
          updates: {
            keys: o,
            changeSpecs: i
          }
        }).then(function(p) {
          var m = p.numFailures, g = p.failures;
          if (m === 0) return h;
          for (var y = 0, v = Object.keys(g); y < v.length; y++) {
            var w = v[y], _ = s[Number(w)];
            if (_ != null) {
              var S = g[w];
              delete g[w], g[_] = S;
            }
          }
          throw new So("".concat(n.name, ".bulkUpdate(): ").concat(m, " of ").concat(h, " operations failed"), g);
        });
      });
    });
  }, e.prototype.bulkDelete = function(t) {
    var n = this, r = t.length;
    return this._trans("readwrite", function(o) {
      return n.core.mutate({
        trans: o,
        type: "delete",
        keys: t
      });
    }).then(function(o) {
      var i = o.numFailures, s = o.lastResult, a = o.failures;
      if (i === 0) return s;
      throw new So("".concat(n.name, ".bulkDelete(): ").concat(i, " of ").concat(r, " operations failed"), a);
    });
  }, e;
})();
function Ms(e) {
  var t = {}, n = function(a, u) {
    if (u) {
      for (var f = arguments.length, d = new Array(f - 1); --f; ) d[f - 1] = arguments[f];
      return t[a].subscribe.apply(null, d), e;
    } else if (typeof a == "string") return t[a];
  };
  n.addEventType = i;
  for (var r = 1, o = arguments.length; r < o; ++r) i(arguments[r]);
  return n;
  function i(a, u, f) {
    if (typeof a == "object") return s(a);
    u || (u = UC), f || (f = xe);
    var d = {
      subscribers: [],
      fire: f,
      subscribe: function(h) {
        d.subscribers.indexOf(h) === -1 && (d.subscribers.push(h), d.fire = u(d.fire, h));
      },
      unsubscribe: function(h) {
        d.subscribers = d.subscribers.filter(function(p) {
          return p !== h;
        }), d.fire = d.subscribers.reduce(u, f);
      }
    };
    return t[a] = n[a] = d, d;
  }
  function s(a) {
    rt(a).forEach(function(u) {
      var f = a[u];
      if (Ue(f)) i(u, a[u][0], a[u][1]);
      else if (f === "asap") var d = i(u, xs, function() {
        for (var p = arguments.length, m = new Array(p); p--; ) m[p] = arguments[p];
        d.subscribers.forEach(function(g) {
          Wv(function() {
            g.apply(null, m);
          });
        });
      });
      else throw new le.InvalidArgument("Invalid event config");
    });
  }
}
function Ns(e, t) {
  return qo(t).from({ prototype: e }), t;
}
function ZC(e) {
  return Ns(l_.prototype, function(n, r, o) {
    this.db = e, this._tx = o, this.name = n, this.schema = r, this.hook = e._allTables[n] ? e._allTables[n].hook : Ms(null, {
      creating: [kC, xe],
      reading: [NC, xs],
      updating: [LC, xe],
      deleting: [DC, xe]
    });
  });
}
function io(e, t) {
  return !(e.filter || e.algorithm || e.or) && (t ? e.justLimit : !e.replayFilter);
}
function Ou(e, t) {
  e.filter = Yr(e.filter, t);
}
function Bu(e, t, n) {
  var r = e.replayFilter;
  e.replayFilter = r ? function() {
    return Yr(r(), t());
  } : t, e.justLimit = n && !r;
}
function jC(e, t) {
  e.isMatch = Yr(e.isMatch, t);
}
function Fa(e, t) {
  if (e.isPrimKey) return t.primaryKey;
  var n = t.getIndexByKeyPath(e.index);
  if (!n) throw new le.Schema("KeyPath " + e.index + " on object store " + t.name + " is not indexed");
  return n;
}
function hp(e, t, n) {
  var r = Fa(e, t.schema);
  return t.openCursor({
    trans: n,
    values: !e.keysOnly,
    reverse: e.dir === "prev",
    unique: !!e.unique,
    query: {
      index: r,
      range: e.range
    }
  });
}
function Zs(e, t, n, r) {
  var o = e.replayFilter ? Yr(e.filter, e.replayFilter()) : e.filter;
  if (e.or) {
    var i = {}, s = function(a, u, f) {
      if (!o || o(u, f, function(p) {
        return u.stop(p);
      }, function(p) {
        return u.fail(p);
      })) {
        var d = u.primaryKey, h = "" + d;
        h === "[object ArrayBuffer]" && (h = "" + new Uint8Array(d)), bt(i, h) || (i[h] = !0, t(a, u, f));
      }
    };
    return Promise.all([e.or._iterate(s, n), pp(hp(e, r, n), e.algorithm, s, !e.keysOnly && e.valueMapper)]);
  } else
    return pp(hp(e, r, n), Yr(e.algorithm, o), t, !e.keysOnly && e.valueMapper);
}
function pp(e, t, n, r) {
  var o = De(r ? function(i, s, a) {
    return n(r(i), s, a);
  } : n);
  return e.then(function(i) {
    if (i) return i.start(function() {
      var s = function() {
        return i.continue();
      };
      (!t || t(i, function(a) {
        return s = a;
      }, function(a) {
        i.stop(a), s = xe;
      }, function(a) {
        i.fail(a), s = xe;
      })) && o(i.value, i, function(a) {
        return s = a;
      }), s();
    });
  });
}
var eb = (function() {
  function e(t) {
    Object.assign(this, t);
  }
  return e.prototype.execute = function(t) {
    var n;
    if (this.add !== void 0) {
      var r = this.add;
      if (Ue(r)) return ll(ll([], Ue(t) ? t : [], !0), r, !0).sort();
      if (typeof r == "number") return (Number(t) || 0) + r;
      if (typeof r == "bigint") try {
        return BigInt(t) + r;
      } catch {
        return BigInt(0) + r;
      }
      throw new TypeError("Invalid term ".concat(r));
    }
    if (this.remove !== void 0) {
      var o = this.remove;
      if (Ue(o)) return Ue(t) ? t.filter(function(s) {
        return !o.includes(s);
      }).sort() : [];
      if (typeof o == "number") return Number(t) - o;
      if (typeof o == "bigint") try {
        return BigInt(t) - o;
      } catch {
        return BigInt(0) - o;
      }
      throw new TypeError("Invalid subtrahend ".concat(o));
    }
    var i = (n = this.replacePrefix) === null || n === void 0 ? void 0 : n[0];
    return i && typeof t == "string" && t.startsWith(i) ? this.replacePrefix[1] + t.substring(i.length) : t;
  }, e;
})(), tb = (function() {
  function e() {
  }
  return e.prototype._read = function(t, n) {
    var r = this._ctx;
    return r.error ? r.table._trans(null, He.bind(null, r.error)) : r.table._trans("readonly", t).then(n);
  }, e.prototype._write = function(t) {
    var n = this._ctx;
    return n.error ? n.table._trans(null, He.bind(null, n.error)) : n.table._trans("readwrite", t, "locked");
  }, e.prototype._addAlgorithm = function(t) {
    var n = this._ctx;
    n.algorithm = Yr(n.algorithm, t);
  }, e.prototype._iterate = function(t, n) {
    return Zs(this._ctx, t, n, this._ctx.table.core);
  }, e.prototype.clone = function(t) {
    var n = Object.create(this.constructor.prototype), r = Object.create(this._ctx);
    return t && Ft(r, t), n._ctx = r, n;
  }, e.prototype.raw = function() {
    return this._ctx.valueMapper = null, this;
  }, e.prototype.each = function(t) {
    var n = this._ctx;
    return this._read(function(r) {
      return Zs(n, t, r, n.table.core);
    });
  }, e.prototype.count = function(t) {
    var n = this;
    return this._read(function(r) {
      var o = n._ctx, i = o.table.core;
      if (io(o, !0)) return i.count({
        trans: r,
        query: {
          index: Fa(o, i.schema),
          range: o.range
        }
      }).then(function(a) {
        return Math.min(a, o.limit);
      });
      var s = 0;
      return Zs(o, function() {
        return ++s, !1;
      }, r, i).then(function() {
        return s;
      });
    }).then(t);
  }, e.prototype.sortBy = function(t, n) {
    var r = t.split(".").reverse(), o = r[0], i = r.length - 1;
    function s(f, d) {
      return d ? s(f[r[d]], d - 1) : f[o];
    }
    var a = this._ctx.dir === "next" ? 1 : -1;
    function u(f, d) {
      return Se(s(f, i), s(d, i)) * a;
    }
    return this.toArray(function(f) {
      return f.sort(u);
    }).then(n);
  }, e.prototype.toArray = function(t) {
    var n = this;
    return this._read(function(r) {
      var o = n._ctx;
      if (o.dir === "next" && io(o, !0) && o.limit > 0) {
        var i = o.valueMapper, s = Fa(o, o.table.core.schema);
        return o.table.core.query({
          trans: r,
          limit: o.limit,
          values: !0,
          query: {
            index: s,
            range: o.range
          }
        }).then(function(u) {
          var f = u.result;
          return i ? f.map(i) : f;
        });
      } else {
        var a = [];
        return Zs(o, function(u) {
          return a.push(u);
        }, r, o.table.core).then(function() {
          return a;
        });
      }
    }, t);
  }, e.prototype.offset = function(t) {
    var n = this._ctx;
    return t <= 0 ? this : (n.offset += t, io(n) ? Bu(n, function() {
      var r = t;
      return function(o, i) {
        return r === 0 ? !0 : r === 1 ? (--r, !1) : (i(function() {
          o.advance(r), r = 0;
        }), !1);
      };
    }) : Bu(n, function() {
      var r = t;
      return function() {
        return --r < 0;
      };
    }), this);
  }, e.prototype.limit = function(t) {
    return this._ctx.limit = Math.min(this._ctx.limit, t), Bu(this._ctx, function() {
      var n = t;
      return function(r, o, i) {
        return --n <= 0 && o(i), n >= 0;
      };
    }, !0), this;
  }, e.prototype.until = function(t, n) {
    return Ou(this._ctx, function(r, o, i) {
      return t(r.value) ? (o(i), n) : !0;
    }), this;
  }, e.prototype.first = function(t) {
    return this.limit(1).toArray(function(n) {
      return n[0];
    }).then(t);
  }, e.prototype.last = function(t) {
    return this.reverse().first(t);
  }, e.prototype.filter = function(t) {
    return Ou(this._ctx, function(n) {
      return t(n.value);
    }), jC(this._ctx, t), this;
  }, e.prototype.and = function(t) {
    return this.filter(t);
  }, e.prototype.or = function(t) {
    return new this.db.WhereClause(this._ctx.table, t, this);
  }, e.prototype.reverse = function() {
    return this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev", this._ondirectionchange && this._ondirectionchange(this._ctx.dir), this;
  }, e.prototype.desc = function() {
    return this.reverse();
  }, e.prototype.eachKey = function(t) {
    var n = this._ctx;
    return n.keysOnly = !n.isMatch, this.each(function(r, o) {
      t(o.key, o);
    });
  }, e.prototype.eachUniqueKey = function(t) {
    return this._ctx.unique = "unique", this.eachKey(t);
  }, e.prototype.eachPrimaryKey = function(t) {
    var n = this._ctx;
    return n.keysOnly = !n.isMatch, this.each(function(r, o) {
      t(o.primaryKey, o);
    });
  }, e.prototype.keys = function(t) {
    var n = this._ctx;
    n.keysOnly = !n.isMatch;
    var r = [];
    return this.each(function(o, i) {
      r.push(i.key);
    }).then(function() {
      return r;
    }).then(t);
  }, e.prototype.primaryKeys = function(t) {
    var n = this._ctx;
    if (n.dir === "next" && io(n, !0) && n.limit > 0) return this._read(function(o) {
      var i = Fa(n, n.table.core.schema);
      return n.table.core.query({
        trans: o,
        values: !1,
        limit: n.limit,
        query: {
          index: i,
          range: n.range
        }
      });
    }).then(function(o) {
      return o.result;
    }).then(t);
    n.keysOnly = !n.isMatch;
    var r = [];
    return this.each(function(o, i) {
      r.push(i.primaryKey);
    }).then(function() {
      return r;
    }).then(t);
  }, e.prototype.uniqueKeys = function(t) {
    return this._ctx.unique = "unique", this.keys(t);
  }, e.prototype.firstKey = function(t) {
    return this.limit(1).keys(function(n) {
      return n[0];
    }).then(t);
  }, e.prototype.lastKey = function(t) {
    return this.reverse().firstKey(t);
  }, e.prototype.distinct = function() {
    var t = this._ctx, n = t.index && t.table.schema.idxByName[t.index];
    if (!n || !n.multi) return this;
    var r = {};
    return Ou(this._ctx, function(o) {
      var i = o.primaryKey.toString(), s = bt(r, i);
      return r[i] = !0, !s;
    }), this;
  }, e.prototype.modify = function(t) {
    var n = this, r = this._ctx;
    return this._write(function(o) {
      var i;
      if (typeof t == "function") i = t;
      else {
        var s = rt(t), a = s.length;
        i = function(_) {
          for (var S = !1, T = 0; T < a; ++T) {
            var C = s[T], E = t[C], M = Gn(_, C);
            E instanceof eb ? ($t(_, C, E.execute(M)), S = !0) : M !== E && ($t(_, C, E), S = !0);
          }
          return S;
        };
      }
      var u = r.table.core, f = u.schema.primaryKey, d = f.outbound, h = f.extractKey, p = 200, m = n.db._options.modifyChunkSize;
      m && (typeof m == "object" ? p = m[u.name] || m["*"] || 200 : p = m);
      var g = [], y = 0, v = [], w = function(_, S) {
        var T = S.failures, C = S.numFailures;
        y += _ - C;
        for (var E = 0, M = rt(T); E < M.length; E++) {
          var I = M[E];
          g.push(T[I]);
        }
      };
      return n.clone().primaryKeys().then(function(_) {
        var S = io(r) && r.limit === 1 / 0 && (typeof t != "function" || t === Gu) && {
          index: r.index,
          range: r.range
        }, T = function(C) {
          var E = Math.min(p, _.length - C);
          return u.getMany({
            trans: o,
            keys: _.slice(C, C + E),
            cache: "immutable"
          }).then(function(M) {
            for (var I = [], D = [], $ = d ? [] : null, q = [], z = 0; z < E; ++z) {
              var J = M[z], ne = {
                value: Kr(J),
                primKey: _[C + z]
              };
              i.call(ne, ne.value, ne) !== !1 && (ne.value == null ? q.push(_[C + z]) : !d && Se(h(J), h(ne.value)) !== 0 ? (q.push(_[C + z]), I.push(ne.value)) : (D.push(ne.value), d && $.push(_[C + z])));
            }
            return Promise.resolve(I.length > 0 && u.mutate({
              trans: o,
              type: "add",
              values: I
            }).then(function(H) {
              for (var pe in H.failures) q.splice(parseInt(pe), 1);
              w(I.length, H);
            })).then(function() {
              return (D.length > 0 || S && typeof t == "object") && u.mutate({
                trans: o,
                type: "put",
                keys: $,
                values: D,
                criteria: S,
                changeSpec: typeof t != "function" && t,
                isAdditionalChunk: C > 0
              }).then(function(H) {
                return w(D.length, H);
              });
            }).then(function() {
              return (q.length > 0 || S && t === Gu) && u.mutate({
                trans: o,
                type: "delete",
                keys: q,
                criteria: S,
                isAdditionalChunk: C > 0
              }).then(function(H) {
                return w(q.length, H);
              });
            }).then(function() {
              return _.length > C + E && T(C + p);
            });
          });
        };
        return T(0).then(function() {
          if (g.length > 0) throw new ul("Error modifying one or more objects", g, y, v);
          return _.length;
        });
      });
    });
  }, e.prototype.delete = function() {
    var t = this._ctx, n = t.range;
    return io(t) && (t.isPrimKey || n.type === 3) ? this._write(function(r) {
      var o = t.table.core.schema.primaryKey, i = n;
      return t.table.core.count({
        trans: r,
        query: {
          index: o,
          range: i
        }
      }).then(function(s) {
        return t.table.core.mutate({
          trans: r,
          type: "deleteRange",
          range: i
        }).then(function(a) {
          var u = a.failures;
          a.lastResult, a.results;
          var f = a.numFailures;
          if (f) throw new ul("Could not delete some values", Object.keys(u).map(function(d) {
            return u[d];
          }), s - f);
          return s - f;
        });
      });
    }) : this.modify(Gu);
  }, e;
})(), Gu = function(e, t) {
  return t.value = null;
};
function nb(e) {
  return Ns(tb.prototype, function(n, r) {
    this.db = e;
    var o = a_, i = null;
    if (r) try {
      o = r();
    } catch (f) {
      i = f;
    }
    var s = n._ctx, a = s.table, u = a.hook.reading.fire;
    this._ctx = {
      table: a,
      index: s.index,
      isPrimKey: !s.index || a.schema.primKey.keyPath && s.index === a.schema.primKey.name,
      range: o,
      keysOnly: !1,
      dir: "next",
      unique: "",
      algorithm: null,
      filter: null,
      replayFilter: null,
      justLimit: !0,
      isMatch: null,
      offset: 0,
      limit: 1 / 0,
      error: i,
      or: s.or,
      valueMapper: u !== xs ? u : null
    };
  });
}
function rb(e, t) {
  return e < t ? -1 : e === t ? 0 : 1;
}
function ob(e, t) {
  return e > t ? -1 : e === t ? 0 : 1;
}
function xt(e, t, n) {
  var r = e instanceof c_ ? new e.Collection(e) : e;
  return r._ctx.error = n ? new n(t) : new TypeError(t), r;
}
function so(e) {
  return new e.Collection(e, function() {
    return u_("");
  }).limit(0);
}
function ib(e) {
  return e === "next" ? function(t) {
    return t.toUpperCase();
  } : function(t) {
    return t.toLowerCase();
  };
}
function sb(e) {
  return e === "next" ? function(t) {
    return t.toLowerCase();
  } : function(t) {
    return t.toUpperCase();
  };
}
function ab(e, t, n, r, o, i) {
  for (var s = Math.min(e.length, r.length), a = -1, u = 0; u < s; ++u) {
    var f = t[u];
    if (f !== r[u])
      return o(e[u], n[u]) < 0 ? e.substr(0, u) + n[u] + n.substr(u + 1) : o(e[u], r[u]) < 0 ? e.substr(0, u) + r[u] + n.substr(u + 1) : a >= 0 ? e.substr(0, a) + t[a] + n.substr(a + 1) : null;
    o(e[u], f) < 0 && (a = u);
  }
  return s < r.length && i === "next" ? e + n.substr(e.length) : s < e.length && i === "prev" ? e.substr(0, n.length) : a < 0 ? null : e.substr(0, a) + r[a] + n.substr(a + 1);
}
function js(e, t, n, r) {
  var o, i, s, a, u, f, d, h = n.length;
  if (!n.every(function(y) {
    return typeof y == "string";
  })) return xt(e, s_);
  function p(y) {
    o = ib(y), i = sb(y), s = y === "next" ? rb : ob;
    var v = n.map(function(w) {
      return {
        lower: i(w),
        upper: o(w)
      };
    }).sort(function(w, _) {
      return s(w.lower, _.lower);
    });
    a = v.map(function(w) {
      return w.upper;
    }), u = v.map(function(w) {
      return w.lower;
    }), f = y, d = y === "next" ? "" : r;
  }
  p("next");
  var m = new e.Collection(e, function() {
    return nr(a[0], u[h - 1] + r);
  });
  m._ondirectionchange = function(y) {
    p(y);
  };
  var g = 0;
  return m._addAlgorithm(function(y, v, w) {
    var _ = y.key;
    if (typeof _ != "string") return !1;
    var S = i(_);
    if (t(S, u, g)) return !0;
    for (var T = null, C = g; C < h; ++C) {
      var E = ab(_, S, a[C], u[C], s, f);
      E === null && T === null ? g = C + 1 : (T === null || s(T, E) > 0) && (T = E);
    }
    return v(T !== null ? function() {
      y.continue(T + d);
    } : w), !1;
  }), m;
}
function nr(e, t, n, r) {
  return {
    type: 2,
    lower: e,
    upper: t,
    lowerOpen: n,
    upperOpen: r
  };
}
function u_(e) {
  return {
    type: 1,
    lower: e,
    upper: e
  };
}
var c_ = (function() {
  function e() {
  }
  return Object.defineProperty(e.prototype, "Collection", {
    get: function() {
      return this._ctx.table.db.Collection;
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype.between = function(t, n, r, o) {
    r = r !== !1, o = o === !0;
    try {
      return this._cmp(t, n) > 0 || this._cmp(t, n) === 0 && (r || o) && !(r && o) ? so(this) : new this.Collection(this, function() {
        return nr(t, n, !r, !o);
      });
    } catch {
      return xt(this, xn);
    }
  }, e.prototype.equals = function(t) {
    return t == null ? xt(this, xn) : new this.Collection(this, function() {
      return u_(t);
    });
  }, e.prototype.above = function(t) {
    return t == null ? xt(this, xn) : new this.Collection(this, function() {
      return nr(t, void 0, !0);
    });
  }, e.prototype.aboveOrEqual = function(t) {
    return t == null ? xt(this, xn) : new this.Collection(this, function() {
      return nr(t, void 0, !1);
    });
  }, e.prototype.below = function(t) {
    return t == null ? xt(this, xn) : new this.Collection(this, function() {
      return nr(void 0, t, !1, !0);
    });
  }, e.prototype.belowOrEqual = function(t) {
    return t == null ? xt(this, xn) : new this.Collection(this, function() {
      return nr(void 0, t);
    });
  }, e.prototype.startsWith = function(t) {
    return typeof t != "string" ? xt(this, s_) : this.between(t, t + Lr, !0, !0);
  }, e.prototype.startsWithIgnoreCase = function(t) {
    return t === "" ? this.startsWith(t) : js(this, function(n, r) {
      return n.indexOf(r[0]) === 0;
    }, [t], Lr);
  }, e.prototype.equalsIgnoreCase = function(t) {
    return js(this, function(n, r) {
      return n === r[0];
    }, [t], "");
  }, e.prototype.anyOfIgnoreCase = function() {
    var t = On.apply(mo, arguments);
    return t.length === 0 ? so(this) : js(this, function(n, r) {
      return r.indexOf(n) !== -1;
    }, t, "");
  }, e.prototype.startsWithAnyOfIgnoreCase = function() {
    var t = On.apply(mo, arguments);
    return t.length === 0 ? so(this) : js(this, function(n, r) {
      return r.some(function(o) {
        return n.indexOf(o) === 0;
      });
    }, t, Lr);
  }, e.prototype.anyOf = function() {
    var t = this, n = On.apply(mo, arguments), r = this._cmp;
    try {
      n.sort(r);
    } catch {
      return xt(this, xn);
    }
    if (n.length === 0) return so(this);
    var o = new this.Collection(this, function() {
      return nr(n[0], n[n.length - 1]);
    });
    o._ondirectionchange = function(s) {
      r = s === "next" ? t._ascending : t._descending, n.sort(r);
    };
    var i = 0;
    return o._addAlgorithm(function(s, a, u) {
      for (var f = s.key; r(f, n[i]) > 0; )
        if (++i, i === n.length)
          return a(u), !1;
      return r(f, n[i]) === 0 ? !0 : (a(function() {
        s.continue(n[i]);
      }), !1);
    }), o;
  }, e.prototype.notEqual = function(t) {
    return this.inAnyRange([[$c, t], [t, this.db._maxKey]], {
      includeLowers: !1,
      includeUppers: !1
    });
  }, e.prototype.noneOf = function() {
    var t = On.apply(mo, arguments);
    if (t.length === 0) return new this.Collection(this);
    try {
      t.sort(this._ascending);
    } catch {
      return xt(this, xn);
    }
    var n = t.reduce(function(r, o) {
      return r ? r.concat([[r[r.length - 1][1], o]]) : [[$c, o]];
    }, null);
    return n.push([t[t.length - 1], this.db._maxKey]), this.inAnyRange(n, {
      includeLowers: !1,
      includeUppers: !1
    });
  }, e.prototype.inAnyRange = function(t, n) {
    var r = this, o = this._cmp, i = this._ascending, s = this._descending, a = this._min, u = this._max;
    if (t.length === 0) return so(this);
    if (!t.every(function(C) {
      return C[0] !== void 0 && C[1] !== void 0 && i(C[0], C[1]) <= 0;
    })) return xt(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", le.InvalidArgument);
    var f = !n || n.includeLowers !== !1, d = n && n.includeUppers === !0;
    function h(C, E) {
      for (var M = 0, I = C.length; M < I; ++M) {
        var D = C[M];
        if (o(E[0], D[1]) < 0 && o(E[1], D[0]) > 0) {
          D[0] = a(D[0], E[0]), D[1] = u(D[1], E[1]);
          break;
        }
      }
      return M === I && C.push(E), C;
    }
    var p = i;
    function m(C, E) {
      return p(C[0], E[0]);
    }
    var g;
    try {
      g = t.reduce(h, []), g.sort(m);
    } catch {
      return xt(this, xn);
    }
    var y = 0, v = d ? function(C) {
      return i(C, g[y][1]) > 0;
    } : function(C) {
      return i(C, g[y][1]) >= 0;
    }, w = f ? function(C) {
      return s(C, g[y][0]) > 0;
    } : function(C) {
      return s(C, g[y][0]) >= 0;
    };
    function _(C) {
      return !v(C) && !w(C);
    }
    var S = v, T = new this.Collection(this, function() {
      return nr(g[0][0], g[g.length - 1][1], !f, !d);
    });
    return T._ondirectionchange = function(C) {
      C === "next" ? (S = v, p = i) : (S = w, p = s), g.sort(m);
    }, T._addAlgorithm(function(C, E, M) {
      for (var I = C.key; S(I); )
        if (++y, y === g.length)
          return E(M), !1;
      return _(I) ? !0 : (r._cmp(I, g[y][1]) === 0 || r._cmp(I, g[y][0]) === 0 || E(function() {
        p === i ? C.continue(g[y][0]) : C.continue(g[y][1]);
      }), !1);
    }), T;
  }, e.prototype.startsWithAnyOf = function() {
    var t = On.apply(mo, arguments);
    return t.every(function(n) {
      return typeof n == "string";
    }) ? t.length === 0 ? so(this) : this.inAnyRange(t.map(function(n) {
      return [n, n + Lr];
    })) : xt(this, "startsWithAnyOf() only works with strings");
  }, e;
})();
function lb(e) {
  return Ns(c_.prototype, function(n, r, o) {
    if (this.db = e, this._ctx = {
      table: n,
      index: r === ":id" ? null : r,
      or: o
    }, this._cmp = this._ascending = Se, this._descending = function(i, s) {
      return Se(s, i);
    }, this._max = function(i, s) {
      return Se(i, s) > 0 ? i : s;
    }, this._min = function(i, s) {
      return Se(i, s) < 0 ? i : s;
    }, this._IDBKeyRange = e._deps.IDBKeyRange, !this._IDBKeyRange) throw new le.MissingAPI();
  });
}
function mn(e) {
  return De(function(t) {
    return vs(t), e(t.target.error), !1;
  });
}
function vs(e) {
  e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault();
}
var ks = "storagemutated", Fc = "x-storagemutated-1", gr = Ms(null, ks), ub = (function() {
  function e() {
  }
  return e.prototype._lock = function() {
    return Ii(!oe.global), ++this._reculock, this._reculock === 1 && !oe.global && (oe.lockOwnerFor = this), this;
  }, e.prototype._unlock = function() {
    if (Ii(!oe.global), --this._reculock === 0)
      for (oe.global || (oe.lockOwnerFor = null); this._blockedFuncs.length > 0 && !this._locked(); ) {
        var t = this._blockedFuncs.shift();
        try {
          Wr(t[1], t[0]);
        } catch {
        }
      }
    return this;
  }, e.prototype._locked = function() {
    return this._reculock && oe.lockOwnerFor !== this;
  }, e.prototype.create = function(t) {
    var n = this;
    if (!this.mode) return this;
    var r = this.db.idbdb, o = this.db._state.dbOpenError;
    if (Ii(!this.idbtrans), !t && !r) switch (o && o.name) {
      case "DatabaseClosedError":
        throw new le.DatabaseClosed(o);
      case "MissingAPIError":
        throw new le.MissingAPI(o.message, o);
      default:
        throw new le.OpenFailed(o);
    }
    if (!this.active) throw new le.TransactionInactive();
    return Ii(this._completion._state === null), t = this.idbtrans = t || (this.db.core ? this.db.core.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability }) : r.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability })), t.onerror = De(function(i) {
      vs(i), n._reject(t.error);
    }), t.onabort = De(function(i) {
      vs(i), n.active && n._reject(new le.Abort(t.error)), n.active = !1, n.on("abort").fire(i);
    }), t.oncomplete = De(function() {
      n.active = !1, n._resolve(), "mutatedParts" in t && gr.storagemutated.fire(t.mutatedParts);
    }), this;
  }, e.prototype._promise = function(t, n, r) {
    var o = this;
    if (t === "readwrite" && this.mode !== "readwrite") return He(new le.ReadOnly("Transaction is readonly"));
    if (!this.active) return He(new le.TransactionInactive());
    if (this._locked()) return new Z(function(s, a) {
      o._blockedFuncs.push([function() {
        o._promise(t, n, r).then(s, a);
      }, oe]);
    });
    if (r) return hr(function() {
      var s = new Z(function(a, u) {
        o._lock();
        var f = n(a, u, o);
        f && f.then && f.then(a, u);
      });
      return s.finally(function() {
        return o._unlock();
      }), s._lib = !0, s;
    });
    var i = new Z(function(s, a) {
      var u = n(s, a, o);
      u && u.then && u.then(s, a);
    });
    return i._lib = !0, i;
  }, e.prototype._root = function() {
    return this.parent ? this.parent._root() : this;
  }, e.prototype.waitFor = function(t) {
    var n = this._root(), r = Z.resolve(t);
    if (n._waitingFor) n._waitingFor = n._waitingFor.then(function() {
      return r;
    });
    else {
      n._waitingFor = r, n._waitingQueue = [];
      var o = n.idbtrans.objectStore(n.storeNames[0]);
      (function s() {
        for (++n._spinCount; n._waitingQueue.length; ) n._waitingQueue.shift()();
        n._waitingFor && (o.get(-1 / 0).onsuccess = s);
      })();
    }
    var i = n._waitingFor;
    return new Z(function(s, a) {
      r.then(function(u) {
        return n._waitingQueue.push(De(s.bind(null, u)));
      }, function(u) {
        return n._waitingQueue.push(De(a.bind(null, u)));
      }).finally(function() {
        n._waitingFor === i && (n._waitingFor = null);
      });
    });
  }, e.prototype.abort = function() {
    this.active && (this.active = !1, this.idbtrans && this.idbtrans.abort(), this._reject(new le.Abort()));
  }, e.prototype.table = function(t) {
    var n = this._memoizedTables || (this._memoizedTables = {});
    if (bt(n, t)) return n[t];
    var r = this.schema[t];
    if (!r) throw new le.NotFound("Table " + t + " not part of transaction");
    var o = new this.db.Table(t, r, this);
    return o.core = this.db.core.table(t), n[t] = o, o;
  }, e;
})();
function cb(e) {
  return Ns(ub.prototype, function(n, r, o, i, s) {
    var a = this;
    this.db = e, this.mode = n, this.storeNames = r, this.schema = o, this.chromeTransactionDurability = i, this.idbtrans = null, this.on = Ms(this, "complete", "error", "abort"), this.parent = s || null, this.active = !0, this._reculock = 0, this._blockedFuncs = [], this._resolve = null, this._reject = null, this._waitingFor = null, this._waitingQueue = null, this._spinCount = 0, this._completion = new Z(function(u, f) {
      a._resolve = u, a._reject = f;
    }), this._completion.then(function() {
      a.active = !1, a.on.complete.fire();
    }, function(u) {
      var f = a.active;
      return a.active = !1, a.on.error.fire(u), a.parent ? a.parent._reject(u) : f && a.idbtrans && a.idbtrans.abort(), He(u);
    });
  });
}
function Oc(e, t, n, r, o, i, s) {
  return {
    name: e,
    keyPath: t,
    unique: n,
    multi: r,
    auto: o,
    compound: i,
    src: (n && !s ? "&" : "") + (r ? "*" : "") + (o ? "++" : "") + f_(t)
  };
}
function f_(e) {
  return typeof e == "string" ? e : e ? "[" + [].join.call(e, "+") + "]" : "";
}
function md(e, t, n) {
  return {
    name: e,
    primKey: t,
    indexes: n,
    mappedClass: null,
    idxByName: EC(n, function(r) {
      return [r.name, r];
    })
  };
}
function fb(e) {
  return e.length === 1 ? e[0] : e;
}
var _s = function(e) {
  try {
    return e.only([[]]), _s = function() {
      return [[]];
    }, [[]];
  } catch {
    return _s = function() {
      return Lr;
    }, Lr;
  }
};
function Bc(e) {
  return e == null ? function() {
  } : typeof e == "string" ? db(e) : function(t) {
    return Gn(t, e);
  };
}
function db(e) {
  return e.split(".").length === 1 ? function(t) {
    return t[e];
  } : function(t) {
    return Gn(t, e);
  };
}
function mp(e) {
  return [].slice.call(e);
}
var hb = 0;
function ji(e) {
  return e == null ? ":id" : typeof e == "string" ? e : "[".concat(e.join("+"), "]");
}
function pb(e, t, n) {
  function r(h, p) {
    var m = mp(h.objectStoreNames);
    return {
      schema: {
        name: h.name,
        tables: m.map(function(g) {
          return p.objectStore(g);
        }).map(function(g) {
          var y = g.keyPath, v = g.autoIncrement, w = Ue(y), _ = y == null, S = {}, T = {
            name: g.name,
            primaryKey: {
              name: null,
              isPrimaryKey: !0,
              outbound: _,
              compound: w,
              keyPath: y,
              autoIncrement: v,
              unique: !0,
              extractKey: Bc(y)
            },
            indexes: mp(g.indexNames).map(function(C) {
              return g.index(C);
            }).map(function(C) {
              var E = C.name, M = C.unique, I = C.multiEntry, D = C.keyPath, $ = {
                name: E,
                compound: Ue(D),
                keyPath: D,
                unique: M,
                multiEntry: I,
                extractKey: Bc(D)
              };
              return S[ji(D)] = $, $;
            }),
            getIndexByKeyPath: function(C) {
              return S[ji(C)];
            }
          };
          return S[":id"] = T.primaryKey, y != null && (S[ji(y)] = T.primaryKey), T;
        })
      },
      hasGetAll: m.length > 0 && "getAll" in p.objectStore(m[0]) && !(typeof navigator < "u" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604)
    };
  }
  function o(h) {
    if (h.type === 3) return null;
    if (h.type === 4) throw new Error("Cannot convert never type to IDBKeyRange");
    var p = h.lower, m = h.upper, g = h.lowerOpen, y = h.upperOpen;
    return p === void 0 ? m === void 0 ? null : t.upperBound(m, !!y) : m === void 0 ? t.lowerBound(p, !!g) : t.bound(p, m, !!g, !!y);
  }
  function i(h) {
    var p = h.name;
    function m(v) {
      var w = v.trans, _ = v.type, S = v.keys, T = v.values, C = v.range;
      return new Promise(function(E, M) {
        E = De(E);
        var I = w.objectStore(p), D = I.keyPath == null, $ = _ === "put" || _ === "add";
        if (!$ && _ !== "delete" && _ !== "deleteRange") throw new Error("Invalid operation type: " + _);
        var q = (S || T || { length: 1 }).length;
        if (S && T && S.length !== T.length) throw new Error("Given keys array must have same length as given values array.");
        if (q === 0) return E({
          numFailures: 0,
          failures: {},
          results: [],
          lastResult: void 0
        });
        var z, J = [], ne = [], H = 0, pe = function($e) {
          ++H, vs($e);
        };
        if (_ === "deleteRange") {
          if (C.type === 4) return E({
            numFailures: H,
            failures: ne,
            results: [],
            lastResult: void 0
          });
          C.type === 3 ? J.push(z = I.clear()) : J.push(z = I.delete(o(C)));
        } else {
          var ue = $ ? D ? [T, S] : [T, null] : [S, null], fe = ue[0], we = ue[1];
          if ($) for (var Le = 0; Le < q; ++Le)
            J.push(z = we && we[Le] !== void 0 ? I[_](fe[Le], we[Le]) : I[_](fe[Le])), z.onerror = pe;
          else for (var Le = 0; Le < q; ++Le)
            J.push(z = I[_](fe[Le])), z.onerror = pe;
        }
        var ht = function($e) {
          var ln = $e.target.result;
          J.forEach(function(lt, un) {
            return lt.error != null && (ne[un] = lt.error);
          }), E({
            numFailures: H,
            failures: ne,
            results: _ === "delete" ? S : J.map(function(lt) {
              return lt.result;
            }),
            lastResult: ln
          });
        };
        z.onerror = function($e) {
          pe($e), ht($e);
        }, z.onsuccess = ht;
      });
    }
    function g(v) {
      var w = v.trans, _ = v.values, S = v.query, T = v.reverse, C = v.unique;
      return new Promise(function(E, M) {
        E = De(E);
        var I = S.index, D = S.range, $ = w.objectStore(p), q = I.isPrimaryKey ? $ : $.index(I.name), z = T ? C ? "prevunique" : "prev" : C ? "nextunique" : "next", J = _ || !("openKeyCursor" in q) ? q.openCursor(o(D), z) : q.openKeyCursor(o(D), z);
        J.onerror = mn(M), J.onsuccess = De(function(ne) {
          var H = J.result;
          if (!H) {
            E(null);
            return;
          }
          H.___id = ++hb, H.done = !1;
          var pe = H.continue.bind(H), ue = H.continuePrimaryKey;
          ue && (ue = ue.bind(H));
          var fe = H.advance.bind(H), we = function() {
            throw new Error("Cursor not started");
          }, Le = function() {
            throw new Error("Cursor not stopped");
          };
          H.trans = w, H.stop = H.continue = H.continuePrimaryKey = H.advance = we, H.fail = De(M), H.next = function() {
            var ht = this, $e = 1;
            return this.start(function() {
              return $e-- ? ht.continue() : ht.stop();
            }).then(function() {
              return ht;
            });
          }, H.start = function(ht) {
            var $e = new Promise(function(lt, un) {
              lt = De(lt), J.onerror = mn(un), H.fail = un, H.stop = function(In) {
                H.stop = H.continue = H.continuePrimaryKey = H.advance = Le, lt(In);
              };
            }), ln = function() {
              if (J.result) try {
                ht();
              } catch (lt) {
                H.fail(lt);
              }
              else
                H.done = !0, H.start = function() {
                  throw new Error("Cursor behind last entry");
                }, H.stop();
            };
            return J.onsuccess = De(function(lt) {
              J.onsuccess = ln, ln();
            }), H.continue = pe, H.continuePrimaryKey = ue, H.advance = fe, ln(), $e;
          }, E(H);
        }, M);
      });
    }
    function y(v) {
      return function(w) {
        return new Promise(function(_, S) {
          _ = De(_);
          var T = w.trans, C = w.values, E = w.limit, M = w.query, I = E === 1 / 0 ? void 0 : E, D = M.index, $ = M.range, q = T.objectStore(p), z = D.isPrimaryKey ? q : q.index(D.name), J = o($);
          if (E === 0) return _({ result: [] });
          if (v) {
            var ne = C ? z.getAll(J, I) : z.getAllKeys(J, I);
            ne.onsuccess = function(fe) {
              return _({ result: fe.target.result });
            }, ne.onerror = mn(S);
          } else {
            var H = 0, pe = C || !("openKeyCursor" in z) ? z.openCursor(J) : z.openKeyCursor(J), ue = [];
            pe.onsuccess = function(fe) {
              var we = pe.result;
              if (!we) return _({ result: ue });
              if (ue.push(C ? we.value : we.primaryKey), ++H === E) return _({ result: ue });
              we.continue();
            }, pe.onerror = mn(S);
          }
        });
      };
    }
    return {
      name: p,
      schema: h,
      mutate: m,
      getMany: function(v) {
        var w = v.trans, _ = v.keys;
        return new Promise(function(S, T) {
          S = De(S);
          for (var C = w.objectStore(p), E = _.length, M = new Array(E), I = 0, D = 0, $, q = function(ne) {
            var H = ne.target;
            (M[H._pos] = H.result) != null, ++D === I && S(M);
          }, z = mn(T), J = 0; J < E; ++J) _[J] != null && ($ = C.get(_[J]), $._pos = J, $.onsuccess = q, $.onerror = z, ++I);
          I === 0 && S(M);
        });
      },
      get: function(v) {
        var w = v.trans, _ = v.key;
        return new Promise(function(S, T) {
          S = De(S);
          var C = w.objectStore(p).get(_);
          C.onsuccess = function(E) {
            return S(E.target.result);
          }, C.onerror = mn(T);
        });
      },
      query: y(u),
      openCursor: g,
      count: function(v) {
        var w = v.query, _ = v.trans, S = w.index, T = w.range;
        return new Promise(function(C, E) {
          var M = _.objectStore(p), I = S.isPrimaryKey ? M : M.index(S.name), D = o(T), $ = D ? I.count(D) : I.count();
          $.onsuccess = De(function(q) {
            return C(q.target.result);
          }), $.onerror = mn(E);
        });
      }
    };
  }
  var s = r(e, n), a = s.schema, u = s.hasGetAll, f = a.tables.map(function(h) {
    return i(h);
  }), d = {};
  return f.forEach(function(h) {
    return d[h.name] = h;
  }), {
    stack: "dbcore",
    transaction: e.transaction.bind(e),
    table: function(h) {
      if (!d[h]) throw new Error("Table '".concat(h, "' not found"));
      return d[h];
    },
    MIN_KEY: -1 / 0,
    MAX_KEY: _s(t),
    schema: a
  };
}
function mb(e, t) {
  return t.reduce(function(n, r) {
    var o = r.create;
    return ye(ye({}, n), o(n));
  }, e);
}
function gb(e, t, n, r) {
  var o = n.IDBKeyRange;
  return n.indexedDB, { dbcore: mb(pb(t, o, r), e.dbcore) };
}
function hl(e, t) {
  var n = t.db;
  e.core = gb(e._middlewares, n, e._deps, t).dbcore, e.tables.forEach(function(r) {
    var o = r.name;
    e.core.schema.tables.some(function(i) {
      return i.name === o;
    }) && (r.core = e.core.table(o), e[o] instanceof e.Table && (e[o].core = r.core));
  });
}
function pl(e, t, n, r) {
  n.forEach(function(o) {
    var i = r[o];
    t.forEach(function(s) {
      var a = Kv(s, o);
      (!a || "value" in a && a.value === void 0) && (s === e.Transaction.prototype || s instanceof e.Transaction ? dr(s, o, {
        get: function() {
          return this.table(o);
        },
        set: function(u) {
          qv(this, o, {
            value: u,
            writable: !0,
            configurable: !0,
            enumerable: !0
          });
        }
      }) : s[o] = new e.Table(o, i));
    });
  });
}
function Gc(e, t) {
  t.forEach(function(n) {
    for (var r in n) n[r] instanceof e.Table && delete n[r];
  });
}
function yb(e, t) {
  return e._cfg.version - t._cfg.version;
}
function vb(e, t, n, r) {
  var o = e._dbSchema;
  n.objectStoreNames.contains("$meta") && !o.$meta && (o.$meta = md("$meta", h_("")[0], []), e._storeNames.push("$meta"));
  var i = e._createTransaction("readwrite", e._storeNames, o);
  i.create(n), i._completion.catch(r);
  var s = i._reject.bind(i), a = oe.transless || oe;
  hr(function() {
    if (oe.trans = i, oe.transless = a, t === 0)
      rt(o).forEach(function(u) {
        yd(n, u, o[u].primKey, o[u].indexes);
      }), hl(e, n), Z.follow(function() {
        return e.on.populate.fire(i);
      }).catch(s);
    else
      return hl(e, n), wb(e, i, t).then(function(u) {
        return Eb(e, u, i, n);
      }).catch(s);
  });
}
function _b(e, t) {
  d_(e._dbSchema, t), t.db.version % 10 === 0 && !t.objectStoreNames.contains("$meta") && t.db.createObjectStore("$meta").add(Math.ceil(t.db.version / 10 - 1), "version");
  var n = nu(e, e.idbdb, t);
  gl(e, e._dbSchema, t);
  for (var r = gd(n, e._dbSchema), o = function(f) {
    if (f.change.length || f.recreate)
      return console.warn("Unable to patch indexes of table ".concat(f.name, " because it has changes on the type of index or primary key.")), { value: void 0 };
    var d = t.objectStore(f.name);
    f.add.forEach(function(h) {
      An && console.debug("Dexie upgrade patch: Creating missing index ".concat(f.name, ".").concat(h.src)), ml(d, h);
    });
  }, i = 0, s = r.change; i < s.length; i++) {
    var a = s[i], u = o(a);
    if (typeof u == "object") return u.value;
  }
}
function wb(e, t, n) {
  return t.storeNames.includes("$meta") ? t.table("$meta").get("version").then(function(r) {
    return r ?? n;
  }) : Z.resolve(n);
}
function Eb(e, t, n, r) {
  var o = [], i = e._versions, s = e._dbSchema = nu(e, e.idbdb, r), a = i.filter(function(f) {
    return f._cfg.version >= t;
  });
  if (a.length === 0) return Z.resolve();
  a.forEach(function(f) {
    o.push(function() {
      var d = s, h = f._cfg.dbschema;
      gl(e, d, r), gl(e, h, r), s = e._dbSchema = h;
      var p = gd(d, h);
      p.add.forEach(function(_) {
        yd(r, _[0], _[1].primKey, _[1].indexes);
      }), p.change.forEach(function(_) {
        if (_.recreate) throw new le.Upgrade("Not yet support for changing primary key");
        var S = r.objectStore(_.name);
        _.add.forEach(function(T) {
          return ml(S, T);
        }), _.change.forEach(function(T) {
          S.deleteIndex(T.name), ml(S, T);
        }), _.del.forEach(function(T) {
          return S.deleteIndex(T);
        });
      });
      var m = f._cfg.contentUpgrade;
      if (m && f._cfg.version > t) {
        hl(e, r), n._memoizedTables = {};
        var g = Yv(h);
        p.del.forEach(function(_) {
          g[_] = d[_];
        }), Gc(e, [e.Transaction.prototype]), pl(e, [e.Transaction.prototype], rt(g), g), n.schema = g;
        var y = ad(m);
        y && Yo();
        var v, w = Z.follow(function() {
          if (v = m(n), v && y) {
            var _ = pr.bind(null, null);
            v.then(_, _);
          }
        });
        return v && typeof v.then == "function" ? Z.resolve(v) : w.then(function() {
          return v;
        });
      }
    }), o.push(function(d) {
      var h = f._cfg.dbschema;
      Tb(h, d), Gc(e, [e.Transaction.prototype]), pl(e, [e.Transaction.prototype], e._storeNames, e._dbSchema), n.schema = e._dbSchema;
    }), o.push(function(d) {
      e.idbdb.objectStoreNames.contains("$meta") && (Math.ceil(e.idbdb.version / 10) === f._cfg.version ? (e.idbdb.deleteObjectStore("$meta"), delete e._dbSchema.$meta, e._storeNames = e._storeNames.filter(function(h) {
        return h !== "$meta";
      })) : d.objectStore("$meta").put(f._cfg.version, "version"));
    });
  });
  function u() {
    return o.length ? Z.resolve(o.shift()(n.idbtrans)).then(u) : Z.resolve();
  }
  return u().then(function() {
    d_(s, r);
  });
}
function gd(e, t) {
  var n = {
    del: [],
    add: [],
    change: []
  }, r;
  for (r in e) t[r] || n.del.push(r);
  for (r in t) {
    var o = e[r], i = t[r];
    if (!o) n.add.push([r, i]);
    else {
      var s = {
        name: r,
        def: i,
        recreate: !1,
        del: [],
        add: [],
        change: []
      };
      if ("" + (o.primKey.keyPath || "") != "" + (i.primKey.keyPath || "") || o.primKey.auto !== i.primKey.auto)
        s.recreate = !0, n.change.push(s);
      else {
        var a = o.idxByName, u = i.idxByName, f = void 0;
        for (f in a) u[f] || s.del.push(f);
        for (f in u) {
          var d = a[f], h = u[f];
          d ? d.src !== h.src && s.change.push(h) : s.add.push(h);
        }
        (s.del.length > 0 || s.add.length > 0 || s.change.length > 0) && n.change.push(s);
      }
    }
  }
  return n;
}
function yd(e, t, n, r) {
  var o = e.db.createObjectStore(t, n.keyPath ? {
    keyPath: n.keyPath,
    autoIncrement: n.auto
  } : { autoIncrement: n.auto });
  return r.forEach(function(i) {
    return ml(o, i);
  }), o;
}
function d_(e, t) {
  rt(e).forEach(function(n) {
    t.db.objectStoreNames.contains(n) || (An && console.debug("Dexie: Creating missing table", n), yd(t, n, e[n].primKey, e[n].indexes));
  });
}
function Tb(e, t) {
  [].slice.call(t.db.objectStoreNames).forEach(function(n) {
    return e[n] == null && t.db.deleteObjectStore(n);
  });
}
function ml(e, t) {
  e.createIndex(t.name, t.keyPath, {
    unique: t.unique,
    multiEntry: t.multi
  });
}
function nu(e, t, n) {
  var r = {};
  return jl(t.objectStoreNames, 0).forEach(function(o) {
    for (var i = n.objectStore(o), s = i.keyPath, a = Oc(f_(s), s || "", !0, !1, !!i.autoIncrement, s && typeof s != "string", !0), u = [], f = 0; f < i.indexNames.length; ++f) {
      var d = i.index(i.indexNames[f]);
      s = d.keyPath;
      var h = Oc(d.name, s, !!d.unique, !!d.multiEntry, !1, s && typeof s != "string", !1);
      u.push(h);
    }
    r[o] = md(o, a, u);
  }), r;
}
function Sb(e, t, n) {
  e.verno = t.version / 10;
  var r = e._dbSchema = nu(e, t, n);
  e._storeNames = jl(t.objectStoreNames, 0), pl(e, [e._allTables], rt(r), r);
}
function Ab(e, t) {
  var n = gd(nu(e, e.idbdb, t), e._dbSchema);
  return !(n.add.length || n.change.some(function(r) {
    return r.add.length || r.change.length;
  }));
}
function gl(e, t, n) {
  for (var r = n.db.objectStoreNames, o = 0; o < r.length; ++o) {
    var i = r[o], s = n.objectStore(i);
    e._hasGetAll = "getAll" in s;
    for (var a = 0; a < s.indexNames.length; ++a) {
      var u = s.indexNames[a], f = s.index(u).keyPath, d = typeof f == "string" ? f : "[" + jl(f).join("+") + "]";
      if (t[i]) {
        var h = t[i].idxByName[d];
        h && (h.name = u, delete t[i].idxByName[d], t[i].idxByName[u] = h);
      }
    }
  }
  typeof navigator < "u" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && at.WorkerGlobalScope && at instanceof at.WorkerGlobalScope && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604 && (e._hasGetAll = !1);
}
function h_(e) {
  return e.split(",").map(function(t, n) {
    t = t.trim();
    var r = t.replace(/([&*]|\+\+)/g, ""), o = /^\[/.test(r) ? r.match(/^\[(.*)\]$/)[1].split("+") : r;
    return Oc(r, o || null, /\&/.test(t), /\*/.test(t), /\+\+/.test(t), Ue(o), n === 0);
  });
}
var Cb = (function() {
  function e() {
  }
  return e.prototype._parseStoresSpec = function(t, n) {
    rt(t).forEach(function(r) {
      if (t[r] !== null) {
        var o = h_(t[r]), i = o.shift();
        if (i.unique = !0, i.multi) throw new le.Schema("Primary key cannot be multi-valued");
        o.forEach(function(s) {
          if (s.auto) throw new le.Schema("Only primary key can be marked as autoIncrement (++)");
          if (!s.keyPath) throw new le.Schema("Index must have a name and cannot be an empty string");
        }), n[r] = md(r, i, o);
      }
    });
  }, e.prototype.stores = function(t) {
    var n = this.db;
    this._cfg.storesSource = this._cfg.storesSource ? Ft(this._cfg.storesSource, t) : t;
    var r = n._versions, o = {}, i = {};
    return r.forEach(function(s) {
      Ft(o, s._cfg.storesSource), i = s._cfg.dbschema = {}, s._parseStoresSpec(o, i);
    }), n._dbSchema = i, Gc(n, [
      n._allTables,
      n,
      n.Transaction.prototype
    ]), pl(n, [
      n._allTables,
      n,
      n.Transaction.prototype,
      this._cfg.tables
    ], rt(i), i), n._storeNames = rt(i), this;
  }, e.prototype.upgrade = function(t) {
    return this._cfg.contentUpgrade = cd(this._cfg.contentUpgrade || xe, t), this;
  }, e;
})();
function bb(e) {
  return Ns(Cb.prototype, function(n) {
    this.db = e, this._cfg = {
      version: n,
      storesSource: null,
      dbschema: {},
      tables: {},
      contentUpgrade: null
    };
  });
}
function vd(e, t) {
  var n = e._dbNamesDB;
  return n || (n = e._dbNamesDB = new Es(tu, {
    addons: [],
    indexedDB: e,
    IDBKeyRange: t
  }), n.version(1).stores({ dbnames: "name" })), n.table("dbnames");
}
function _d(e) {
  return e && typeof e.databases == "function";
}
function Ib(e) {
  var t = e.indexedDB, n = e.IDBKeyRange;
  return _d(t) ? Promise.resolve(t.databases()).then(function(r) {
    return r.map(function(o) {
      return o.name;
    }).filter(function(o) {
      return o !== tu;
    });
  }) : vd(t, n).toCollection().primaryKeys();
}
function Rb(e, t) {
  var n = e.indexedDB, r = e.IDBKeyRange;
  !_d(n) && t !== tu && vd(n, r).put({ name: t }).catch(xe);
}
function Pb(e, t) {
  var n = e.indexedDB, r = e.IDBKeyRange;
  !_d(n) && t !== tu && vd(n, r).delete(t).catch(xe);
}
function Vc(e) {
  return hr(function() {
    return oe.letThrough = !0, e();
  });
}
function xb() {
  if (!(!navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent)) || !indexedDB.databases) return Promise.resolve();
  var e;
  return new Promise(function(t) {
    var n = function() {
      return indexedDB.databases().finally(t);
    };
    e = setInterval(n, 100), n();
  }).finally(function() {
    return clearInterval(e);
  });
}
var Vu;
function wd(e) {
  return !("from" in e);
}
var _t = function(e, t) {
  if (this) Ft(this, arguments.length ? {
    d: 1,
    from: e,
    to: arguments.length > 1 ? t : e
  } : { d: 0 });
  else {
    var n = new _t();
    return e && "d" in e && Ft(n, e), n;
  }
};
Bo(_t.prototype, (Vu = {
  add: function(e) {
    return yl(this, e), this;
  },
  addKey: function(e) {
    return ws(this, e, e), this;
  },
  addKeys: function(e) {
    var t = this;
    return e.forEach(function(n) {
      return ws(t, n, n);
    }), this;
  },
  hasKey: function(e) {
    var t = vl(this).next(e).value;
    return t && Se(t.from, e) <= 0 && Se(t.to, e) >= 0;
  }
}, Vu[Mc] = function() {
  return vl(this);
}, Vu));
function ws(e, t, n) {
  var r = Se(t, n);
  if (!isNaN(r)) {
    if (r > 0) throw RangeError();
    if (wd(e)) return Ft(e, {
      from: t,
      to: n,
      d: 1
    });
    var o = e.l, i = e.r;
    if (Se(n, e.from) < 0)
      return o ? ws(o, t, n) : e.l = {
        from: t,
        to: n,
        d: 1,
        l: null,
        r: null
      }, gp(e);
    if (Se(t, e.to) > 0)
      return i ? ws(i, t, n) : e.r = {
        from: t,
        to: n,
        d: 1,
        l: null,
        r: null
      }, gp(e);
    Se(t, e.from) < 0 && (e.from = t, e.l = null, e.d = i ? i.d + 1 : 1), Se(n, e.to) > 0 && (e.to = n, e.r = null, e.d = e.l ? e.l.d + 1 : 1);
    var s = !e.r;
    o && !e.l && yl(e, o), i && s && yl(e, i);
  }
}
function yl(e, t) {
  function n(r, o) {
    var i = o.from, s = o.to, a = o.l, u = o.r;
    ws(r, i, s), a && n(r, a), u && n(r, u);
  }
  wd(t) || n(e, t);
}
function Mb(e, t) {
  var n = vl(t), r = n.next();
  if (r.done) return !1;
  for (var o = r.value, i = vl(e), s = i.next(o.from), a = s.value; !r.done && !s.done; ) {
    if (Se(a.from, o.to) <= 0 && Se(a.to, o.from) >= 0) return !0;
    Se(o.from, a.from) < 0 ? o = (r = n.next(a.from)).value : a = (s = i.next(o.from)).value;
  }
  return !1;
}
function vl(e) {
  var t = wd(e) ? null : {
    s: 0,
    n: e
  };
  return { next: function(n) {
    for (var r = arguments.length > 0; t; ) switch (t.s) {
      case 0:
        if (t.s = 1, r) for (; t.n.l && Se(n, t.n.from) < 0; ) t = {
          up: t,
          n: t.n.l,
          s: 1
        };
        else for (; t.n.l; ) t = {
          up: t,
          n: t.n.l,
          s: 1
        };
      case 1:
        if (t.s = 2, !r || Se(n, t.n.to) <= 0) return {
          value: t.n,
          done: !1
        };
      case 2:
        if (t.n.r) {
          t.s = 3, t = {
            up: t,
            n: t.n.r,
            s: 0
          };
          continue;
        }
      case 3:
        t = t.up;
    }
    return { done: !0 };
  } };
}
function gp(e) {
  var t, n, r = (((t = e.r) === null || t === void 0 ? void 0 : t.d) || 0) - (((n = e.l) === null || n === void 0 ? void 0 : n.d) || 0), o = r > 1 ? "r" : r < -1 ? "l" : "";
  if (o) {
    var i = o === "r" ? "l" : "r", s = ye({}, e), a = e[o];
    e.from = a.from, e.to = a.to, e[o] = a[o], s[o] = a[i], e[i] = s, s.d = yp(s);
  }
  e.d = yp(e);
}
function yp(e) {
  var t = e.r, n = e.l;
  return (t ? n ? Math.max(t.d, n.d) : t.d : n ? n.d : 0) + 1;
}
function ru(e, t) {
  return rt(t).forEach(function(n) {
    e[n] ? yl(e[n], t[n]) : e[n] = Qv(t[n]);
  }), e;
}
function Ed(e, t) {
  return e.all || t.all || Object.keys(e).some(function(n) {
    return t[n] && Mb(t[n], e[n]);
  });
}
var Hr = {}, Hu = {}, qu = !1;
function ea(e, t) {
  ru(Hu, e), qu || (qu = !0, setTimeout(function() {
    qu = !1;
    var n = Hu;
    Hu = {}, Td(n, !1);
  }, 0));
}
function Td(e, t) {
  t === void 0 && (t = !1);
  var n = /* @__PURE__ */ new Set();
  if (e.all) for (var r = 0, o = Object.values(Hr); r < o.length; r++) {
    var i = o[r];
    vp(i, e, n, t);
  }
  else for (var s in e) {
    var a = /^idb\:\/\/(.*)\/(.*)\//.exec(s);
    if (a) {
      var u = a[1], f = a[2], i = Hr["idb://".concat(u, "/").concat(f)];
      i && vp(i, e, n, t);
    }
  }
  n.forEach(function(d) {
    return d();
  });
}
function vp(e, t, n, r) {
  for (var o = [], i = 0, s = Object.entries(e.queries.query); i < s.length; i++) {
    for (var a = s[i], u = a[0], f = a[1], d = [], h = 0, p = f; h < p.length; h++) {
      var m = p[h];
      Ed(t, m.obsSet) ? m.subscribers.forEach(function(w) {
        return n.add(w);
      }) : r && d.push(m);
    }
    r && o.push([u, d]);
  }
  if (r) for (var g = 0, y = o; g < y.length; g++) {
    var v = y[g], u = v[0], d = v[1];
    e.queries.query[u] = d;
  }
}
function Nb(e) {
  var t = e._state, n = e._deps.indexedDB;
  if (t.isBeingOpened || e.idbdb) return t.dbReadyPromise.then(function() {
    return t.dbOpenError ? He(t.dbOpenError) : e;
  });
  t.isBeingOpened = !0, t.dbOpenError = null, t.openComplete = !1;
  var r = t.openCanceller, o = Math.round(e.verno * 10), i = !1;
  function s() {
    if (t.openCanceller !== r) throw new le.DatabaseClosed("db.open() was cancelled");
  }
  var a = t.dbReadyResolve, u = null, f = !1, d = function() {
    return new Z(function(h, p) {
      if (s(), !n) throw new le.MissingAPI();
      var m = e.name, g = t.autoSchema || !o ? n.open(m) : n.open(m, o);
      if (!g) throw new le.MissingAPI();
      g.onerror = mn(p), g.onblocked = De(e._fireOnBlocked), g.onupgradeneeded = De(function(y) {
        if (u = g.transaction, t.autoSchema && !e._options.allowEmptyDB) {
          g.onerror = vs, u.abort(), g.result.close();
          var v = n.deleteDatabase(m);
          v.onsuccess = v.onerror = De(function() {
            p(new le.NoSuchDatabase("Database ".concat(m, " doesnt exist")));
          });
        } else {
          u.onerror = mn(p);
          var w = y.oldVersion > Math.pow(2, 62) ? 0 : y.oldVersion;
          f = w < 1, e.idbdb = g.result, i && _b(e, u), vb(e, w / 10, u, p);
        }
      }, p), g.onsuccess = De(function() {
        u = null;
        var y = e.idbdb = g.result, v = jl(y.objectStoreNames);
        if (v.length > 0) try {
          var w = y.transaction(fb(v), "readonly");
          if (t.autoSchema) Sb(e, y, w);
          else if (gl(e, e._dbSchema, w), !Ab(e, w) && !i)
            return console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this."), y.close(), o = y.version + 1, i = !0, h(d());
          hl(e, w);
        } catch {
        }
        No.push(e), y.onversionchange = De(function(_) {
          t.vcFired = !0, e.on("versionchange").fire(_);
        }), y.onclose = De(function(_) {
          e.on("close").fire(_);
        }), f && Rb(e._deps, m), h();
      }, p);
    }).catch(function(h) {
      switch (h?.name) {
        case "UnknownError":
          if (t.PR1398_maxLoop > 0)
            return t.PR1398_maxLoop--, console.warn("Dexie: Workaround for Chrome UnknownError on open()"), d();
          break;
        case "VersionError":
          if (o > 0)
            return o = 0, d();
          break;
      }
      return Z.reject(h);
    });
  };
  return Z.race([r, (typeof navigator > "u" ? Z.resolve() : xb()).then(d)]).then(function() {
    return s(), t.onReadyBeingFired = [], Z.resolve(Vc(function() {
      return e.on.ready.fire(e.vip);
    })).then(function h() {
      if (t.onReadyBeingFired.length > 0) {
        var p = t.onReadyBeingFired.reduce(cd, xe);
        return t.onReadyBeingFired = [], Z.resolve(Vc(function() {
          return p(e.vip);
        })).then(h);
      }
    });
  }).finally(function() {
    t.openCanceller === r && (t.onReadyBeingFired = null, t.isBeingOpened = !1);
  }).catch(function(h) {
    t.dbOpenError = h;
    try {
      u && u.abort();
    } catch {
    }
    return r === t.openCanceller && e._close(), He(h);
  }).finally(function() {
    t.openComplete = !0, a();
  }).then(function() {
    if (f) {
      var h = {};
      e.tables.forEach(function(p) {
        p.schema.indexes.forEach(function(m) {
          m.name && (h["idb://".concat(e.name, "/").concat(p.name, "/").concat(m.name)] = new _t(-1 / 0, [[[]]]));
        }), h["idb://".concat(e.name, "/").concat(p.name, "/")] = h["idb://".concat(e.name, "/").concat(p.name, "/:dels")] = new _t(-1 / 0, [[[]]]);
      }), gr(ks).fire(h), Td(h, !0);
    }
    return e;
  });
}
function Hc(e) {
  var t = function(s) {
    return e.next(s);
  }, n = function(s) {
    return e.throw(s);
  }, r = i(t), o = i(n);
  function i(s) {
    return function(a) {
      var u = s(a), f = u.value;
      return u.done ? f : !f || typeof f.then != "function" ? Ue(f) ? Promise.all(f).then(r, o) : r(f) : f.then(r, o);
    };
  }
  return i(t)();
}
function kb(e, t, n) {
  var r = arguments.length;
  if (r < 2) throw new le.InvalidArgument("Too few arguments");
  for (var o = new Array(r - 1); --r; ) o[r - 1] = arguments[r];
  return n = o.pop(), [
    e,
    zv(o),
    n
  ];
}
function p_(e, t, n, r, o) {
  return Z.resolve().then(function() {
    var i = oe.transless || oe, s = e._createTransaction(t, n, e._dbSchema, r);
    s.explicit = !0;
    var a = {
      trans: s,
      transless: i
    };
    if (r) s.idbtrans = r.idbtrans;
    else try {
      s.create(), s.idbtrans._explicit = !0, e._state.PR1398_maxLoop = 3;
    } catch (h) {
      return h.name === ud.InvalidState && e.isOpen() && --e._state.PR1398_maxLoop > 0 ? (console.warn("Dexie: Need to reopen db"), e.close({ disableAutoOpen: !1 }), e.open().then(function() {
        return p_(e, t, n, null, o);
      })) : He(h);
    }
    var u = ad(o);
    u && Yo();
    var f, d = Z.follow(function() {
      if (f = o.call(s, s), f)
        if (u) {
          var h = pr.bind(null, null);
          f.then(h, h);
        } else typeof f.next == "function" && typeof f.throw == "function" && (f = Hc(f));
    }, a);
    return (f && typeof f.then == "function" ? Z.resolve(f).then(function(h) {
      return s.active ? h : He(new le.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"));
    }) : d.then(function() {
      return f;
    })).then(function(h) {
      return r && s._resolve(), s._completion.then(function() {
        return h;
      });
    }).catch(function(h) {
      return s._reject(h), He(h);
    });
  });
}
function ta(e, t, n) {
  for (var r = Ue(e) ? e.slice() : [e], o = 0; o < n; ++o) r.push(t);
  return r;
}
function Db(e) {
  return ye(ye({}, e), { table: function(t) {
    var n = e.table(t), r = n.schema, o = {}, i = [];
    function s(g, y, v) {
      var w = ji(g), _ = o[w] = o[w] || [], S = g == null ? 0 : typeof g == "string" ? 1 : g.length, T = y > 0, C = ye(ye({}, v), {
        name: T ? "".concat(w, "(virtual-from:").concat(v.name, ")") : v.name,
        lowLevelIndex: v,
        isVirtual: T,
        keyTail: y,
        keyLength: S,
        extractKey: Bc(g),
        unique: !T && v.unique
      });
      return _.push(C), C.isPrimaryKey || i.push(C), S > 1 && s(S === 2 ? g[0] : g.slice(0, S - 1), y + 1, v), _.sort(function(E, M) {
        return E.keyTail - M.keyTail;
      }), C;
    }
    var a = s(r.primaryKey.keyPath, 0, r.primaryKey);
    o[":id"] = [a];
    for (var u = 0, f = r.indexes; u < f.length; u++) {
      var d = f[u];
      s(d.keyPath, 0, d);
    }
    function h(g) {
      var y = o[ji(g)];
      return y && y[0];
    }
    function p(g, y) {
      return {
        type: g.type === 1 ? 2 : g.type,
        lower: ta(g.lower, g.lowerOpen ? e.MAX_KEY : e.MIN_KEY, y),
        lowerOpen: !0,
        upper: ta(g.upper, g.upperOpen ? e.MIN_KEY : e.MAX_KEY, y),
        upperOpen: !0
      };
    }
    function m(g) {
      var y = g.query.index;
      return y.isVirtual ? ye(ye({}, g), { query: {
        index: y.lowLevelIndex,
        range: p(g.query.range, y.keyTail)
      } }) : g;
    }
    return ye(ye({}, n), {
      schema: ye(ye({}, r), {
        primaryKey: a,
        indexes: i,
        getIndexByKeyPath: h
      }),
      count: function(g) {
        return n.count(m(g));
      },
      query: function(g) {
        return n.query(m(g));
      },
      openCursor: function(g) {
        var y = g.query.index, v = y.keyTail, w = y.isVirtual, _ = y.keyLength;
        if (!w) return n.openCursor(g);
        function S(T) {
          function C(E) {
            E != null ? T.continue(ta(E, g.reverse ? e.MAX_KEY : e.MIN_KEY, v)) : g.unique ? T.continue(T.key.slice(0, _).concat(g.reverse ? e.MIN_KEY : e.MAX_KEY, v)) : T.continue();
          }
          return Object.create(T, {
            continue: { value: C },
            continuePrimaryKey: { value: function(E, M) {
              T.continuePrimaryKey(ta(E, e.MAX_KEY, v), M);
            } },
            primaryKey: { get: function() {
              return T.primaryKey;
            } },
            key: { get: function() {
              var E = T.key;
              return _ === 1 ? E[0] : E.slice(0, _);
            } },
            value: { get: function() {
              return T.value;
            } }
          });
        }
        return n.openCursor(m(g)).then(function(T) {
          return T && S(T);
        });
      }
    });
  } });
}
var Lb = {
  stack: "dbcore",
  name: "VirtualIndexMiddleware",
  level: 1,
  create: Db
};
function Sd(e, t, n, r) {
  return n = n || {}, r = r || "", rt(e).forEach(function(o) {
    if (!bt(t, o)) n[r + o] = void 0;
    else {
      var i = e[o], s = t[o];
      if (typeof i == "object" && typeof s == "object" && i && s) {
        var a = xc(i);
        a !== xc(s) ? n[r + o] = t[o] : a === "Object" ? Sd(i, s, n, r + o + ".") : i !== s && (n[r + o] = t[o]);
      } else i !== s && (n[r + o] = t[o]);
    }
  }), rt(t).forEach(function(o) {
    bt(e, o) || (n[r + o] = t[o]);
  }), n;
}
function Ad(e, t) {
  return t.type === "delete" ? t.keys : t.keys || t.values.map(e.extractKey);
}
var Ub = {
  stack: "dbcore",
  name: "HooksMiddleware",
  level: 2,
  create: function(e) {
    return ye(ye({}, e), { table: function(t) {
      var n = e.table(t), r = n.schema.primaryKey;
      return ye(ye({}, n), { mutate: function(o) {
        var i = oe.trans, s = i.table(t).hook, a = s.deleting, u = s.creating, f = s.updating;
        switch (o.type) {
          case "add":
            if (u.fire === xe) break;
            return i._promise("readwrite", function() {
              return d(o);
            }, !0);
          case "put":
            if (u.fire === xe && f.fire === xe) break;
            return i._promise("readwrite", function() {
              return d(o);
            }, !0);
          case "delete":
            if (a.fire === xe) break;
            return i._promise("readwrite", function() {
              return d(o);
            }, !0);
          case "deleteRange":
            if (a.fire === xe) break;
            return i._promise("readwrite", function() {
              return h(o);
            }, !0);
        }
        return n.mutate(o);
        function d(m) {
          var g = oe.trans, y = m.keys || Ad(r, m);
          if (!y) throw new Error("Keys missing");
          return m = m.type === "add" || m.type === "put" ? ye(ye({}, m), { keys: y }) : ye({}, m), m.type !== "delete" && (m.values = ll([], m.values, !0)), m.keys && (m.keys = ll([], m.keys, !0)), $b(n, m, y).then(function(v) {
            var w = y.map(function(_, S) {
              var T = v[S], C = {
                onerror: null,
                onsuccess: null
              };
              if (m.type === "delete") a.fire.call(C, _, T, g);
              else if (m.type === "add" || T === void 0) {
                var E = u.fire.call(C, _, m.values[S], g);
                _ == null && E != null && (_ = E, m.keys[S] = _, r.outbound || $t(m.values[S], r.keyPath, _));
              } else {
                var M = Sd(T, m.values[S]), I = f.fire.call(C, M, _, T, g);
                if (I) {
                  var D = m.values[S];
                  Object.keys(I).forEach(function($) {
                    bt(D, $) ? D[$] = I[$] : $t(D, $, I[$]);
                  });
                }
              }
              return C;
            });
            return n.mutate(m).then(function(_) {
              for (var S = _.failures, T = _.results, C = _.numFailures, E = _.lastResult, M = 0; M < y.length; ++M) {
                var I = T ? T[M] : y[M], D = w[M];
                I == null ? D.onerror && D.onerror(S[M]) : D.onsuccess && D.onsuccess(m.type === "put" && v[M] ? m.values[M] : I);
              }
              return {
                failures: S,
                results: T,
                numFailures: C,
                lastResult: E
              };
            }).catch(function(_) {
              return w.forEach(function(S) {
                return S.onerror && S.onerror(_);
              }), Promise.reject(_);
            });
          });
        }
        function h(m) {
          return p(m.trans, m.range, 1e4);
        }
        function p(m, g, y) {
          return n.query({
            trans: m,
            values: !1,
            query: {
              index: r,
              range: g
            },
            limit: y
          }).then(function(v) {
            var w = v.result;
            return d({
              type: "delete",
              keys: w,
              trans: m
            }).then(function(_) {
              return _.numFailures > 0 ? Promise.reject(_.failures[0]) : w.length < y ? {
                failures: [],
                numFailures: 0,
                lastResult: void 0
              } : p(m, ye(ye({}, g), {
                lower: w[w.length - 1],
                lowerOpen: !0
              }), y);
            });
          });
        }
      } });
    } });
  }
};
function $b(e, t, n) {
  return t.type === "add" ? Promise.resolve([]) : e.getMany({
    trans: t.trans,
    keys: n,
    cache: "immutable"
  });
}
function m_(e, t, n) {
  try {
    if (!t || t.keys.length < e.length) return null;
    for (var r = [], o = 0, i = 0; o < t.keys.length && i < e.length; ++o)
      Se(t.keys[o], e[i]) === 0 && (r.push(n ? Kr(t.values[o]) : t.values[o]), ++i);
    return r.length === e.length ? r : null;
  } catch {
    return null;
  }
}
var Fb = {
  stack: "dbcore",
  level: -1,
  create: function(e) {
    return { table: function(t) {
      var n = e.table(t);
      return ye(ye({}, n), {
        getMany: function(r) {
          if (!r.cache) return n.getMany(r);
          var o = m_(r.keys, r.trans._cache, r.cache === "clone");
          return o ? Z.resolve(o) : n.getMany(r).then(function(i) {
            return r.trans._cache = {
              keys: r.keys,
              values: r.cache === "clone" ? Kr(i) : i
            }, i;
          });
        },
        mutate: function(r) {
          return r.type !== "add" && (r.trans._cache = null), n.mutate(r);
        }
      });
    } };
  }
};
function g_(e, t) {
  return e.trans.mode === "readonly" && !!e.subscr && !e.trans.explicit && e.trans.db._options.cache !== "disabled" && !t.schema.primaryKey.outbound;
}
function y_(e, t) {
  switch (e) {
    case "query":
      return t.values && !t.unique;
    case "get":
      return !1;
    case "getMany":
      return !1;
    case "count":
      return !1;
    case "openCursor":
      return !1;
  }
}
var Ob = {
  stack: "dbcore",
  level: 0,
  name: "Observability",
  create: function(e) {
    var t = e.schema.name, n = new _t(e.MIN_KEY, e.MAX_KEY);
    return ye(ye({}, e), {
      transaction: function(r, o, i) {
        if (oe.subscr && o !== "readonly") throw new le.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat(oe.querier));
        return e.transaction(r, o, i);
      },
      table: function(r) {
        var o = e.table(r), i = o.schema, s = i.primaryKey, a = i.indexes, u = s.extractKey, f = s.outbound, d = s.autoIncrement && a.filter(function(g) {
          return g.compound && g.keyPath.includes(s.keyPath);
        }), h = ye(ye({}, o), { mutate: function(g) {
          var y, v, w = g.trans, _ = g.mutatedParts || (g.mutatedParts = {}), S = function(J) {
            var ne = "idb://".concat(t, "/").concat(r, "/").concat(J);
            return _[ne] || (_[ne] = new _t());
          }, T = S(""), C = S(":dels"), E = g.type, M = g.type === "deleteRange" ? [g.range] : g.type === "delete" ? [g.keys] : g.values.length < 50 ? [Ad(s, g).filter(function(J) {
            return J;
          }), g.values] : [], I = M[0], D = M[1], $ = g.trans._cache;
          if (Ue(I)) {
            T.addKeys(I);
            var q = E === "delete" || I.length === D.length ? m_(I, $) : null;
            q || C.addKeys(I), (q || D) && Bb(S, i, q, D);
          } else if (I) {
            var z = {
              from: (y = I.lower) !== null && y !== void 0 ? y : e.MIN_KEY,
              to: (v = I.upper) !== null && v !== void 0 ? v : e.MAX_KEY
            };
            C.add(z), T.add(z);
          } else
            T.add(n), C.add(n), i.indexes.forEach(function(J) {
              return S(J.name).add(n);
            });
          return o.mutate(g).then(function(J) {
            return I && (g.type === "add" || g.type === "put") && (T.addKeys(J.results), d && d.forEach(function(ne) {
              for (var H = g.values.map(function(we) {
                return ne.extractKey(we);
              }), pe = ne.keyPath.findIndex(function(we) {
                return we === s.keyPath;
              }), ue = 0, fe = J.results.length; ue < fe; ++ue) H[ue][pe] = J.results[ue];
              S(ne.name).addKeys(H);
            })), w.mutatedParts = ru(w.mutatedParts || {}, _), J;
          });
        } }), p = function(g) {
          var y, v, w = g.query, _ = w.index, S = w.range;
          return [_, new _t((y = S.lower) !== null && y !== void 0 ? y : e.MIN_KEY, (v = S.upper) !== null && v !== void 0 ? v : e.MAX_KEY)];
        }, m = {
          get: function(g) {
            return [s, new _t(g.key)];
          },
          getMany: function(g) {
            return [s, new _t().addKeys(g.keys)];
          },
          count: p,
          query: p,
          openCursor: p
        };
        return rt(m).forEach(function(g) {
          h[g] = function(y) {
            var v = oe.subscr, w = !!v, _ = g_(oe, o) && y_(g, y) ? y.obsSet = {} : v;
            if (w) {
              var S = function($) {
                var q = "idb://".concat(t, "/").concat(r, "/").concat($);
                return _[q] || (_[q] = new _t());
              }, T = S(""), C = S(":dels"), E = m[g](y), M = E[0], I = E[1];
              if (g === "query" && M.isPrimaryKey && !y.values ? C.add(I) : S(M.name || "").add(I), !M.isPrimaryKey) if (g === "count") C.add(n);
              else {
                var D = g === "query" && f && y.values && o.query(ye(ye({}, y), { values: !1 }));
                return o[g].apply(this, arguments).then(function($) {
                  if (g === "query") {
                    if (f && y.values) return D.then(function(ne) {
                      var H = ne.result;
                      return T.addKeys(H), $;
                    });
                    var q = y.values ? $.result.map(u) : $.result;
                    y.values ? T.addKeys(q) : C.addKeys(q);
                  } else if (g === "openCursor") {
                    var z = $, J = y.values;
                    return z && Object.create(z, {
                      key: { get: function() {
                        return C.addKey(z.primaryKey), z.key;
                      } },
                      primaryKey: { get: function() {
                        var ne = z.primaryKey;
                        return C.addKey(ne), ne;
                      } },
                      value: { get: function() {
                        return J && T.addKey(z.primaryKey), z.value;
                      } }
                    });
                  }
                  return $;
                });
              }
            }
            return o[g].apply(this, arguments);
          };
        }), h;
      }
    });
  }
};
function Bb(e, t, n, r) {
  function o(i) {
    var s = e(i.name || "");
    function a(f) {
      return f != null ? i.extractKey(f) : null;
    }
    var u = function(f) {
      return i.multiEntry && Ue(f) ? f.forEach(function(d) {
        return s.addKey(d);
      }) : s.addKey(f);
    };
    (n || r).forEach(function(f, d) {
      var h = n && a(n[d]), p = r && a(r[d]);
      Se(h, p) !== 0 && (h != null && u(h), p != null && u(p));
    });
  }
  t.indexes.forEach(o);
}
function _p(e, t, n) {
  if (n.numFailures === 0) return t;
  if (t.type === "deleteRange") return null;
  var r = t.keys ? t.keys.length : "values" in t && t.values ? t.values.length : 1;
  if (n.numFailures === r) return null;
  var o = ye({}, t);
  return Ue(o.keys) && (o.keys = o.keys.filter(function(i, s) {
    return !(s in n.failures);
  })), "values" in o && Ue(o.values) && (o.values = o.values.filter(function(i, s) {
    return !(s in n.failures);
  })), o;
}
function Gb(e, t) {
  return t.lower === void 0 ? !0 : t.lowerOpen ? Se(e, t.lower) > 0 : Se(e, t.lower) >= 0;
}
function Vb(e, t) {
  return t.upper === void 0 ? !0 : t.upperOpen ? Se(e, t.upper) < 0 : Se(e, t.upper) <= 0;
}
function Ku(e, t) {
  return Gb(e, t) && Vb(e, t);
}
function wp(e, t, n, r, o, i) {
  if (!n || n.length === 0) return e;
  var s = t.query.index, a = s.multiEntry, u = t.query.range, f = r.schema.primaryKey.extractKey, d = s.extractKey, h = (s.lowLevelIndex || s).extractKey, p = n.reduce(function(m, g) {
    var y = m, v = [];
    if (g.type === "add" || g.type === "put")
      for (var w = new _t(), _ = g.values.length - 1; _ >= 0; --_) {
        var S = g.values[_], T = f(S);
        if (!w.hasKey(T)) {
          var C = d(S);
          (a && Ue(C) ? C.some(function($) {
            return Ku($, u);
          }) : Ku(C, u)) && (w.addKey(T), v.push(S));
        }
      }
    switch (g.type) {
      case "add":
        var E = new _t().addKeys(t.values ? m.map(function($) {
          return f($);
        }) : m);
        y = m.concat(t.values ? v.filter(function($) {
          var q = f($);
          return E.hasKey(q) ? !1 : (E.addKey(q), !0);
        }) : v.map(function($) {
          return f($);
        }).filter(function($) {
          return E.hasKey($) ? !1 : (E.addKey($), !0);
        }));
        break;
      case "put":
        var M = new _t().addKeys(g.values.map(function($) {
          return f($);
        }));
        y = m.filter(function($) {
          return !M.hasKey(t.values ? f($) : $);
        }).concat(t.values ? v : v.map(function($) {
          return f($);
        }));
        break;
      case "delete":
        var I = new _t().addKeys(g.keys);
        y = m.filter(function($) {
          return !I.hasKey(t.values ? f($) : $);
        });
        break;
      case "deleteRange":
        var D = g.range;
        y = m.filter(function($) {
          return !Ku(f($), D);
        });
        break;
    }
    return y;
  }, e);
  return p === e ? e : (p.sort(function(m, g) {
    return Se(h(m), h(g)) || Se(f(m), f(g));
  }), t.limit && t.limit < 1 / 0 && (p.length > t.limit ? p.length = t.limit : e.length === t.limit && p.length < t.limit && (o.dirty = !0)), i ? Object.freeze(p) : p);
}
function Ep(e, t) {
  return Se(e.lower, t.lower) === 0 && Se(e.upper, t.upper) === 0 && !!e.lowerOpen == !!t.lowerOpen && !!e.upperOpen == !!t.upperOpen;
}
function Hb(e, t, n, r) {
  if (e === void 0) return t !== void 0 ? -1 : 0;
  if (t === void 0) return 1;
  var o = Se(e, t);
  if (o === 0) {
    if (n && r) return 0;
    if (n) return 1;
    if (r) return -1;
  }
  return o;
}
function qb(e, t, n, r) {
  if (e === void 0) return t !== void 0 ? 1 : 0;
  if (t === void 0) return -1;
  var o = Se(e, t);
  if (o === 0) {
    if (n && r) return 0;
    if (n) return -1;
    if (r) return 1;
  }
  return o;
}
function Kb(e, t) {
  return Hb(e.lower, t.lower, e.lowerOpen, t.lowerOpen) <= 0 && qb(e.upper, t.upper, e.upperOpen, t.upperOpen) >= 0;
}
function Jb(e, t, n, r) {
  var o = Hr["idb://".concat(e, "/").concat(t)];
  if (!o) return [];
  var i = o.queries[n];
  if (!i) return [
    null,
    !1,
    o,
    null
  ];
  var s = i[(r.query ? r.query.index.name : null) || ""];
  if (!s) return [
    null,
    !1,
    o,
    null
  ];
  switch (n) {
    case "query":
      var a = s.find(function(f) {
        return f.req.limit === r.limit && f.req.values === r.values && Ep(f.req.query.range, r.query.range);
      });
      return a ? [
        a,
        !0,
        o,
        s
      ] : [
        s.find(function(f) {
          return ("limit" in f.req ? f.req.limit : 1 / 0) >= r.limit && (r.values ? f.req.values : !0) && Kb(f.req.query.range, r.query.range);
        }),
        !1,
        o,
        s
      ];
    case "count":
      var u = s.find(function(f) {
        return Ep(f.req.query.range, r.query.range);
      });
      return [
        u,
        !!u,
        o,
        s
      ];
  }
}
function Wb(e, t, n, r) {
  e.subscribers.add(n), r.addEventListener("abort", function() {
    e.subscribers.delete(n), e.subscribers.size === 0 && Yb(e, t);
  });
}
function Yb(e, t) {
  setTimeout(function() {
    e.subscribers.size === 0 && br(t, e);
  }, 3e3);
}
var zb = {
  stack: "dbcore",
  level: 0,
  name: "Cache",
  create: function(e) {
    var t = e.schema.name;
    return ye(ye({}, e), {
      transaction: function(n, r, o) {
        var i = e.transaction(n, r, o);
        if (r === "readwrite") {
          var s = new AbortController(), a = s.signal, u = function(f) {
            return function() {
              if (s.abort(), r === "readwrite") {
                for (var d = /* @__PURE__ */ new Set(), h = 0, p = n; h < p.length; h++) {
                  var m = p[h], g = Hr["idb://".concat(t, "/").concat(m)];
                  if (g) {
                    var y = e.table(m), v = g.optimisticOps.filter(function(J) {
                      return J.trans === i;
                    });
                    if (i._explicit && f && i.mutatedParts) for (var w = 0, _ = Object.values(g.queries.query); w < _.length; w++)
                      for (var S = _[w], T = 0, C = S.slice(); T < C.length; T++) {
                        var E = C[T];
                        Ed(E.obsSet, i.mutatedParts) && (br(S, E), E.subscribers.forEach(function(J) {
                          return d.add(J);
                        }));
                      }
                    else if (v.length > 0) {
                      g.optimisticOps = g.optimisticOps.filter(function(J) {
                        return J.trans !== i;
                      });
                      for (var M = 0, I = Object.values(g.queries.query); M < I.length; M++)
                        for (var S = I[M], D = 0, $ = S.slice(); D < $.length; D++) {
                          var E = $[D];
                          if (E.res != null && i.mutatedParts) if (f && !E.dirty) {
                            var q = Object.isFrozen(E.res), z = wp(E.res, E.req, v, y, E, q);
                            E.dirty ? (br(S, E), E.subscribers.forEach(function(H) {
                              return d.add(H);
                            })) : z !== E.res && (E.res = z, E.promise = Z.resolve({ result: z }));
                          } else
                            E.dirty && br(S, E), E.subscribers.forEach(function(H) {
                              return d.add(H);
                            });
                        }
                    }
                  }
                }
                d.forEach(function(J) {
                  return J();
                });
              }
            };
          };
          i.addEventListener("abort", u(!1), { signal: a }), i.addEventListener("error", u(!1), { signal: a }), i.addEventListener("complete", u(!0), { signal: a });
        }
        return i;
      },
      table: function(n) {
        var r = e.table(n), o = r.schema.primaryKey;
        return ye(ye({}, r), {
          mutate: function(i) {
            var s = oe.trans;
            if (o.outbound || s.db._options.cache === "disabled" || s.explicit || s.idbtrans.mode !== "readwrite") return r.mutate(i);
            var a = Hr["idb://".concat(t, "/").concat(n)];
            if (!a) return r.mutate(i);
            var u = r.mutate(i);
            return (i.type === "add" || i.type === "put") && (i.values.length >= 50 || Ad(o, i).some(function(f) {
              return f == null;
            })) ? u.then(function(f) {
              var d = _p(a, ye(ye({}, i), { values: i.values.map(function(h, p) {
                var m;
                if (f.failures[p]) return h;
                var g = !((m = o.keyPath) === null || m === void 0) && m.includes(".") ? Kr(h) : ye({}, h);
                return $t(g, o.keyPath, f.results[p]), g;
              }) }), f);
              a.optimisticOps.push(d), queueMicrotask(function() {
                return i.mutatedParts && ea(i.mutatedParts);
              });
            }) : (a.optimisticOps.push(i), i.mutatedParts && ea(i.mutatedParts), u.then(function(f) {
              if (f.numFailures > 0) {
                br(a.optimisticOps, i);
                var d = _p(a, i, f);
                d && a.optimisticOps.push(d), i.mutatedParts && ea(i.mutatedParts);
              }
            }), u.catch(function() {
              br(a.optimisticOps, i), i.mutatedParts && ea(i.mutatedParts);
            })), u;
          },
          query: function(i) {
            var s;
            if (!g_(oe, r) || !y_("query", i)) return r.query(i);
            var a = ((s = oe.trans) === null || s === void 0 ? void 0 : s.db._options.cache) === "immutable", u = oe, f = u.requery, d = u.signal, h = Jb(t, n, "query", i), p = h[0], m = h[1], g = h[2], y = h[3];
            if (p && m) p.obsSet = i.obsSet;
            else {
              var v = r.query(i).then(function(w) {
                var _ = w.result;
                if (p && (p.res = _), a) {
                  for (var S = 0, T = _.length; S < T; ++S) Object.freeze(_[S]);
                  Object.freeze(_);
                } else w.result = Kr(_);
                return w;
              }).catch(function(w) {
                return y && p && br(y, p), Promise.reject(w);
              });
              p = {
                obsSet: i.obsSet,
                promise: v,
                subscribers: /* @__PURE__ */ new Set(),
                type: "query",
                req: i,
                dirty: !1
              }, y ? y.push(p) : (y = [p], g || (g = Hr["idb://".concat(t, "/").concat(n)] = {
                queries: {
                  query: {},
                  count: {}
                },
                objs: /* @__PURE__ */ new Map(),
                optimisticOps: [],
                unsignaledParts: {}
              }), g.queries.query[i.query.index.name || ""] = y);
            }
            return Wb(p, y, f, d), p.promise.then(function(w) {
              return { result: wp(w.result, i, g?.optimisticOps, r, p, a) };
            });
          }
        });
      }
    });
  }
};
function na(e, t) {
  return new Proxy(e, { get: function(n, r, o) {
    return r === "db" ? t : Reflect.get(n, r, o);
  } });
}
var Es = (function() {
  function e(t, n) {
    var r = this;
    this._middlewares = {}, this.verno = 0;
    var o = e.dependencies;
    this._options = n = ye({
      addons: e.addons,
      autoOpen: !0,
      indexedDB: o.indexedDB,
      IDBKeyRange: o.IDBKeyRange,
      cache: "cloned"
    }, n), this._deps = {
      indexedDB: n.indexedDB,
      IDBKeyRange: n.IDBKeyRange
    };
    var i = n.addons;
    this._dbSchema = {}, this._versions = [], this._storeNames = [], this._allTables = {}, this.idbdb = null, this._novip = this;
    var s = {
      dbOpenError: null,
      isBeingOpened: !1,
      onReadyBeingFired: null,
      openComplete: !1,
      dbReadyResolve: xe,
      dbReadyPromise: null,
      cancelOpen: xe,
      openCanceller: null,
      autoSchema: !0,
      PR1398_maxLoop: 3,
      autoOpen: n.autoOpen
    };
    s.dbReadyPromise = new Z(function(u) {
      s.dbReadyResolve = u;
    }), s.openCanceller = new Z(function(u, f) {
      s.cancelOpen = f;
    }), this._state = s, this.name = t, this.on = Ms(this, "populate", "blocked", "versionchange", "close", { ready: [cd, xe] }), this.on.ready.subscribe = Jv(this.on.ready.subscribe, function(u) {
      return function(f, d) {
        e.vip(function() {
          var h = r._state;
          if (h.openComplete)
            h.dbOpenError || Z.resolve().then(f), d && u(f);
          else if (h.onReadyBeingFired)
            h.onReadyBeingFired.push(f), d && u(f);
          else {
            u(f);
            var p = r;
            d || u(function m() {
              p.on.ready.unsubscribe(f), p.on.ready.unsubscribe(m);
            });
          }
        });
      };
    }), this.Collection = nb(this), this.Table = ZC(this), this.Transaction = cb(this), this.Version = bb(this), this.WhereClause = lb(this), this.on("versionchange", function(u) {
      u.newVersion > 0 ? console.warn("Another connection wants to upgrade database '".concat(r.name, "'. Closing db now to resume the upgrade.")) : console.warn("Another connection wants to delete database '".concat(r.name, "'. Closing db now to resume the delete request.")), r.close({ disableAutoOpen: !1 });
    }), this.on("blocked", function(u) {
      !u.newVersion || u.newVersion < u.oldVersion ? console.warn("Dexie.delete('".concat(r.name, "') was blocked")) : console.warn("Upgrade '".concat(r.name, "' blocked by other connection holding version ").concat(u.oldVersion / 10));
    }), this._maxKey = _s(n.IDBKeyRange), this._createTransaction = function(u, f, d, h) {
      return new r.Transaction(u, f, d, r._options.chromeTransactionDurability, h);
    }, this._fireOnBlocked = function(u) {
      r.on("blocked").fire(u), No.filter(function(f) {
        return f.name === r.name && f !== r && !f._state.vcFired;
      }).map(function(f) {
        return f.on("versionchange").fire(u);
      });
    }, this.use(Fb), this.use(zb), this.use(Ob), this.use(Lb), this.use(Ub);
    var a = new Proxy(this, { get: function(u, f, d) {
      if (f === "_vip") return !0;
      if (f === "table") return function(p) {
        return na(r.table(p), a);
      };
      var h = Reflect.get(u, f, d);
      return h instanceof l_ ? na(h, a) : f === "tables" ? h.map(function(p) {
        return na(p, a);
      }) : f === "_createTransaction" ? function() {
        return na(h.apply(this, arguments), a);
      } : h;
    } });
    this.vip = a, i.forEach(function(u) {
      return u(r);
    });
  }
  return e.prototype.version = function(t) {
    if (isNaN(t) || t < 0.1) throw new le.Type("Given version is not a positive number");
    if (t = Math.round(t * 10) / 10, this.idbdb || this._state.isBeingOpened) throw new le.Schema("Cannot add version when database is open");
    this.verno = Math.max(this.verno, t);
    var n = this._versions, r = n.filter(function(o) {
      return o._cfg.version === t;
    })[0];
    return r || (r = new this.Version(t), n.push(r), n.sort(yb), r.stores({}), this._state.autoSchema = !1, r);
  }, e.prototype._whenReady = function(t) {
    var n = this;
    return this.idbdb && (this._state.openComplete || oe.letThrough || this._vip) ? t() : new Z(function(r, o) {
      if (n._state.openComplete) return o(new le.DatabaseClosed(n._state.dbOpenError));
      if (!n._state.isBeingOpened) {
        if (!n._state.autoOpen) {
          o(new le.DatabaseClosed());
          return;
        }
        n.open().catch(xe);
      }
      n._state.dbReadyPromise.then(r, o);
    }).then(t);
  }, e.prototype.use = function(t) {
    var n = t.stack, r = t.create, o = t.level, i = t.name;
    i && this.unuse({
      stack: n,
      name: i
    });
    var s = this._middlewares[n] || (this._middlewares[n] = []);
    return s.push({
      stack: n,
      create: r,
      level: o ?? 10,
      name: i
    }), s.sort(function(a, u) {
      return a.level - u.level;
    }), this;
  }, e.prototype.unuse = function(t) {
    var n = t.stack, r = t.name, o = t.create;
    return n && this._middlewares[n] && (this._middlewares[n] = this._middlewares[n].filter(function(i) {
      return o ? i.create !== o : r ? i.name !== r : !1;
    })), this;
  }, e.prototype.open = function() {
    var t = this;
    return Wr(cr, function() {
      return Nb(t);
    });
  }, e.prototype._close = function() {
    var t = this._state, n = No.indexOf(this);
    if (n >= 0 && No.splice(n, 1), this.idbdb) {
      try {
        this.idbdb.close();
      } catch {
      }
      this.idbdb = null;
    }
    t.isBeingOpened || (t.dbReadyPromise = new Z(function(r) {
      t.dbReadyResolve = r;
    }), t.openCanceller = new Z(function(r, o) {
      t.cancelOpen = o;
    }));
  }, e.prototype.close = function(t) {
    var n = (t === void 0 ? { disableAutoOpen: !0 } : t).disableAutoOpen, r = this._state;
    n ? (r.isBeingOpened && r.cancelOpen(new le.DatabaseClosed()), this._close(), r.autoOpen = !1, r.dbOpenError = new le.DatabaseClosed()) : (this._close(), r.autoOpen = this._options.autoOpen || r.isBeingOpened, r.openComplete = !1, r.dbOpenError = null);
  }, e.prototype.delete = function(t) {
    var n = this;
    t === void 0 && (t = { disableAutoOpen: !0 });
    var r = arguments.length > 0 && typeof arguments[0] != "object", o = this._state;
    return new Z(function(i, s) {
      var a = function() {
        n.close(t);
        var u = n._deps.indexedDB.deleteDatabase(n.name);
        u.onsuccess = De(function() {
          Pb(n._deps, n.name), i();
        }), u.onerror = mn(s), u.onblocked = n._fireOnBlocked;
      };
      if (r) throw new le.InvalidArgument("Invalid closeOptions argument to db.delete()");
      o.isBeingOpened ? o.dbReadyPromise.then(a) : a();
    });
  }, e.prototype.backendDB = function() {
    return this.idbdb;
  }, e.prototype.isOpen = function() {
    return this.idbdb !== null;
  }, e.prototype.hasBeenClosed = function() {
    var t = this._state.dbOpenError;
    return t && t.name === "DatabaseClosed";
  }, e.prototype.hasFailed = function() {
    return this._state.dbOpenError !== null;
  }, e.prototype.dynamicallyOpened = function() {
    return this._state.autoSchema;
  }, Object.defineProperty(e.prototype, "tables", {
    get: function() {
      var t = this;
      return rt(this._allTables).map(function(n) {
        return t._allTables[n];
      });
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype.transaction = function() {
    var t = kb.apply(this, arguments);
    return this._transaction.apply(this, t);
  }, e.prototype._transaction = function(t, n, r) {
    var o = this, i = oe.trans;
    (!i || i.db !== this || t.indexOf("!") !== -1) && (i = null);
    var s = t.indexOf("?") !== -1;
    t = t.replace("!", "").replace("?", "");
    var a, u;
    try {
      if (u = n.map(function(d) {
        var h = d instanceof o.Table ? d.name : d;
        if (typeof h != "string") throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
        return h;
      }), t == "r" || t === $u) a = $u;
      else if (t == "rw" || t == Fu) a = Fu;
      else throw new le.InvalidArgument("Invalid transaction mode: " + t);
      if (i) {
        if (i.mode === $u && a === Fu) if (s) i = null;
        else throw new le.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
        i && u.forEach(function(d) {
          if (i && i.storeNames.indexOf(d) === -1) if (s) i = null;
          else throw new le.SubTransaction("Table " + d + " not included in parent transaction.");
        }), s && i && !i.active && (i = null);
      }
    } catch (d) {
      return i ? i._promise(null, function(h, p) {
        p(d);
      }) : He(d);
    }
    var f = p_.bind(null, this, a, u, i, r);
    return i ? i._promise(a, f, "lock") : oe.trans ? Wr(oe.transless, function() {
      return o._whenReady(f);
    }) : this._whenReady(f);
  }, e.prototype.table = function(t) {
    if (!bt(this._allTables, t)) throw new le.InvalidTable("Table ".concat(t, " does not exist"));
    return this._allTables[t];
  }, e;
})(), Xb = typeof Symbol < "u" && "observable" in Symbol ? Symbol.observable : "@@observable", Qb = (function() {
  function e(t) {
    this._subscribe = t;
  }
  return e.prototype.subscribe = function(t, n, r) {
    return this._subscribe(!t || typeof t == "function" ? {
      next: t,
      error: n,
      complete: r
    } : t);
  }, e.prototype[Xb] = function() {
    return this;
  }, e;
})(), _l;
try {
  _l = {
    indexedDB: at.indexedDB || at.mozIndexedDB || at.webkitIndexedDB || at.msIndexedDB,
    IDBKeyRange: at.IDBKeyRange || at.webkitIDBKeyRange
  };
} catch {
  _l = {
    indexedDB: null,
    IDBKeyRange: null
  };
}
function Zb(e) {
  var t = !1, n, r = new Qb(function(o) {
    var i = ad(e);
    function s(w) {
      var _ = Jo();
      try {
        i && Yo();
        var S = hr(e, w);
        return i && (S = S.finally(pr)), S;
      } finally {
        _ && Wo();
      }
    }
    var a = !1, u, f = {}, d = {}, h = {
      get closed() {
        return a;
      },
      unsubscribe: function() {
        a || (a = !0, u && u.abort(), p && gr.storagemutated.unsubscribe(y));
      }
    };
    o.start && o.start(h);
    var p = !1, m = function() {
      return Uu(v);
    };
    function g() {
      return Ed(d, f);
    }
    var y = function(w) {
      ru(f, w), g() && m();
    }, v = function() {
      if (!(a || !_l.indexedDB)) {
        f = {};
        var w = {};
        u && u.abort(), u = new AbortController();
        var _ = {
          subscr: w,
          signal: u.signal,
          requery: m,
          querier: e,
          trans: null
        }, S = s(_);
        Promise.resolve(S).then(function(T) {
          t = !0, n = T, !(a || _.signal.aborted) && (f = {}, d = w, !CC(d) && !p && (gr(ks, y), p = !0), Uu(function() {
            return !a && o.next && o.next(T);
          }));
        }, function(T) {
          t = !1, ["DatabaseClosedError", "AbortError"].includes(T?.name) || a || Uu(function() {
            a || o.error && o.error(T);
          });
        });
      }
    };
    return setTimeout(m, 0), h;
  });
  return r.hasValue = function() {
    return t;
  }, r.getValue = function() {
    return n;
  }, r;
}
var kr = Es;
Bo(kr, ye(ye({}, eu), {
  delete: function(e) {
    return new kr(e, { addons: [] }).delete();
  },
  exists: function(e) {
    return new kr(e, { addons: [] }).open().then(function(t) {
      return t.close(), !0;
    }).catch("NoSuchDatabaseError", function() {
      return !1;
    });
  },
  getDatabaseNames: function(e) {
    try {
      return Ib(kr.dependencies).then(e);
    } catch {
      return He(new le.MissingAPI());
    }
  },
  defineClass: function() {
    function e(t) {
      Ft(this, t);
    }
    return e;
  },
  ignoreTransaction: function(e) {
    return oe.trans ? Wr(oe.transless, e) : e();
  },
  vip: Vc,
  async: function(e) {
    return function() {
      try {
        var t = Hc(e.apply(this, arguments));
        return !t || typeof t.then != "function" ? Z.resolve(t) : t;
      } catch (n) {
        return He(n);
      }
    };
  },
  spawn: function(e, t, n) {
    try {
      var r = Hc(e.apply(n, t || []));
      return !r || typeof r.then != "function" ? Z.resolve(r) : r;
    } catch (o) {
      return He(o);
    }
  },
  currentTransaction: { get: function() {
    return oe.trans || null;
  } },
  waitFor: function(e, t) {
    var n = Z.resolve(typeof e == "function" ? kr.ignoreTransaction(e) : e).timeout(t || 6e4);
    return oe.trans ? oe.trans.waitFor(n) : n;
  },
  Promise: Z,
  debug: {
    get: function() {
      return An;
    },
    set: function(e) {
      e_(e);
    }
  },
  derive: qo,
  extend: Ft,
  props: Bo,
  override: Jv,
  Events: Ms,
  on: gr,
  liveQuery: Zb,
  extendObservabilitySet: ru,
  getByKeyPath: Gn,
  setByKeyPath: $t,
  delByKeyPath: TC,
  shallowClone: Yv,
  deepClone: Kr,
  getObjectDiff: Sd,
  cmp: Se,
  asap: Wv,
  minKey: $c,
  addons: [],
  connections: No,
  errnames: ud,
  dependencies: _l,
  cache: Hr,
  semVer: cp,
  version: cp.split(".").map(function(e) {
    return parseInt(e);
  }).reduce(function(e, t, n) {
    return e + t / Math.pow(10, n * 2);
  })
}));
kr.maxKey = _s(kr.dependencies.IDBKeyRange);
typeof dispatchEvent < "u" && typeof addEventListener < "u" && (gr(ks, function(e) {
  if (!ar) {
    var t = new CustomEvent(Fc, { detail: e });
    ar = !0, dispatchEvent(t), ar = !1;
  }
}), addEventListener(Fc, function(e) {
  var t = e.detail;
  ar || Cd(t);
}));
function Cd(e) {
  var t = ar;
  try {
    ar = !0, gr.storagemutated.fire(e), Td(e, !0);
  } finally {
    ar = t;
  }
}
var ar = !1, ir, qc = function() {
};
typeof BroadcastChannel < "u" && (qc = function() {
  ir = new BroadcastChannel(Fc), ir.onmessage = function(e) {
    return e.data && Cd(e.data);
  };
}, qc(), typeof ir.unref == "function" && ir.unref(), gr(ks, function(e) {
  ar || ir.postMessage(e);
}));
typeof addEventListener < "u" && (addEventListener("pagehide", function(e) {
  if (!Es.disableBfCache && e.persisted) {
    An && console.debug("Dexie: handling persisted pagehide"), ir?.close();
    for (var t = 0, n = No; t < n.length; t++) n[t].close({ disableAutoOpen: !1 });
  }
}), addEventListener("pageshow", function(e) {
  !Es.disableBfCache && e.persisted && (An && console.debug("Dexie: handling persisted pageshow"), qc(), Cd({ all: new _t(-1 / 0, [[]]) }));
}));
Z.rejectionMapper = MC;
e_(An);
var jb = class extends Es {
  sessions;
  messages;
  meta;
  presets;
  constructor() {
    super("LittleWhiteBox_Tavern"), this.version(1).stores({
      sessions: "id, updatedAt, characterId, characterName",
      messages: "[sessionId+order], sessionId, order",
      meta: "key"
    }), this.version(2).stores({
      sessions: "id, updatedAt, characterId, characterName",
      messages: "[sessionId+order], sessionId, order",
      meta: "key",
      presets: "id, updatedAt, sourcePresetId"
    });
  }
}, Ds = new jb(), wl = Ds.sessions, Oa = Ds.messages, Ls = Ds.meta, El = Ds.presets;
function Zr() {
  return Date.now();
}
function v_(e = "tavern-session") {
  return `${e}-${Zr()}-${Math.random().toString(36).slice(2, 8)}`;
}
function eI(e = "", t = "小白酒馆会话") {
  return String(e || "").trim().slice(0, 120) || t;
}
function bd(e) {
  return JSON.parse(JSON.stringify(e));
}
function Kc(e = "", t = "我的小白酒馆预设") {
  return String(e || "").trim().slice(0, 120) || t;
}
async function tI(e = {}) {
  const t = Zr(), n = {
    id: String(e.id || v_()),
    title: eI(e.title, e.characterName ? `${e.characterName} · 会话` : "小白酒馆会话"),
    characterId: String(e.characterId || ""),
    characterName: String(e.characterName || ""),
    createdAt: Number(e.createdAt) || t,
    updatedAt: t,
    contextSnapshot: e.contextSnapshot,
    summary: String(e.summary || ""),
    state: e.state || {}
  };
  return await wl.put(n), await Ls.put({
    key: "selectedSessionId",
    value: n.id,
    updatedAt: t
  }), n;
}
async function nI() {
  return wl.orderBy("updatedAt").reverse().toArray();
}
async function rI() {
  const e = await Ls.get("selectedSessionId");
  return String(e?.value || "").trim();
}
async function Tp(e = "") {
  const t = String(e || "").trim();
  return await Ls.put({
    key: "selectedSessionId",
    value: t,
    updatedAt: Zr()
  }), t;
}
async function Sp(e, t) {
  const n = String(e || "").trim();
  if (!n) throw new Error("session_required");
  const r = await Oa.where("sessionId").equals(n).toArray(), o = Math.max(-1, ...r.map((a) => Number(a.order) || 0)) + 1, i = Zr(), s = {
    sessionId: n,
    order: o,
    role: String(t.role || ""),
    content: String(t.content || ""),
    createdAt: i,
    providerPayload: "providerPayload" in t ? t.providerPayload : void 0
  };
  return await Ds.transaction("rw", Oa, wl, async () => {
    await Oa.put(s), await wl.update(n, { updatedAt: i });
  }), s;
}
async function Ap(e = "") {
  const t = String(e || "").trim();
  return t ? Oa.where("sessionId").equals(t).sortBy("order") : [];
}
function oI(e = "我的小白酒馆预设") {
  const t = bd(Fo());
  return t.id = `user-preset-${Zr()}-${Math.random().toString(36).slice(2, 8)}`, t.name = Kc(e), t.description = `从 ${Fo().name} 派生。`, t;
}
async function __(e, t = {}) {
  const n = Zr(), r = String(e.id || v_("tavern-preset")), o = bd({
    ...e,
    id: r,
    name: Kc(e.name)
  }), i = await El.get(r), s = {
    id: r,
    name: Kc(o.name),
    description: String(o.description || ""),
    version: String(o.version || ""),
    sourcePresetId: String(t.sourcePresetId || i?.sourcePresetId || "littlewhitebox-roleplay-default-v1"),
    isBuiltIn: t.isBuiltIn === !0,
    createdAt: Number(i?.createdAt) || n,
    updatedAt: n,
    preset: o
  };
  return await El.put(s), s;
}
async function iI() {
  return El.orderBy("updatedAt").reverse().toArray();
}
async function w_() {
  const e = await Ls.get("activePresetId");
  return String(e?.value || "littlewhitebox-roleplay-default-v1").trim() || "littlewhitebox-roleplay-default-v1";
}
async function Pi(e = or) {
  const t = String(e || "littlewhitebox-roleplay-default-v1").trim() || "littlewhitebox-roleplay-default-v1";
  return await Ls.put({
    key: "activePresetId",
    value: t,
    updatedAt: Zr()
  }), t;
}
async function Cp() {
  const e = await w_();
  if (e === "littlewhitebox-roleplay-default-v1") return Fo();
  const t = await El.get(e);
  return t?.preset ? bd(t.preset) : Fo();
}
async function sI(e = "我的小白酒馆预设") {
  const t = await __(oI(e), { sourcePresetId: or });
  return await Pi(t.id), t;
}
function j(e, t, n, r, o) {
  if (r === "m") throw new TypeError("Private method is not writable");
  if (r === "a" && !o) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? e !== t || !o : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return r === "a" ? o.call(e, n) : o ? o.value = n : t.set(e, n), n;
}
function P(e, t, n, r) {
  if (n === "a" && !r) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}
var E_ = function() {
  const { crypto: e } = globalThis;
  if (e?.randomUUID)
    return E_ = e.randomUUID.bind(e), e.randomUUID();
  const t = new Uint8Array(1), n = e ? () => e.getRandomValues(t)[0] : () => Math.random() * 255 & 255;
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (r) => (+r ^ n() & 15 >> +r / 4).toString(16));
};
function Ts(e) {
  return typeof e == "object" && e !== null && ("name" in e && e.name === "AbortError" || "message" in e && String(e.message).includes("FetchRequestCanceledException"));
}
var Jc = (e) => {
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
}, me = class extends Error {
}, Ot = class Wc extends me {
  constructor(t, n, r, o, i) {
    super(`${Wc.makeMessage(t, n, r)}`), this.status = t, this.headers = o, this.requestID = o?.get("request-id"), this.error = n, this.type = i ?? null;
  }
  static makeMessage(t, n, r) {
    const o = n?.message ? typeof n.message == "string" ? n.message : JSON.stringify(n.message) : n ? JSON.stringify(n) : r;
    return t && o ? `${t} ${o}` : t ? `${t} status code (no body)` : o || "(no status code or body)";
  }
  static generate(t, n, r, o) {
    if (!t || !o) return new ou({
      message: r,
      cause: Jc(n)
    });
    const i = n, s = i?.error?.type;
    return t === 400 ? new S_(t, i, r, o, s) : t === 401 ? new A_(t, i, r, o, s) : t === 403 ? new C_(t, i, r, o, s) : t === 404 ? new b_(t, i, r, o, s) : t === 409 ? new I_(t, i, r, o, s) : t === 422 ? new R_(t, i, r, o, s) : t === 429 ? new P_(t, i, r, o, s) : t >= 500 ? new x_(t, i, r, o, s) : new Wc(t, i, r, o, s);
  }
}, jt = class extends Ot {
  constructor({ message: e } = {}) {
    super(void 0, void 0, e || "Request was aborted.", void 0);
  }
}, ou = class extends Ot {
  constructor({ message: e, cause: t }) {
    super(void 0, void 0, e || "Connection error.", void 0), t && (this.cause = t);
  }
}, T_ = class extends ou {
  constructor({ message: e } = {}) {
    super({ message: e ?? "Request timed out." });
  }
}, S_ = class extends Ot {
}, A_ = class extends Ot {
}, C_ = class extends Ot {
}, b_ = class extends Ot {
}, I_ = class extends Ot {
}, R_ = class extends Ot {
}, P_ = class extends Ot {
}, x_ = class extends Ot {
}, aI = /^[a-z][a-z0-9+.-]*:/i, lI = (e) => aI.test(e), Yc = (e) => (Yc = Array.isArray, Yc(e)), bp = Yc;
function zc(e) {
  return typeof e != "object" ? {} : e ?? {};
}
function Ip(e) {
  if (!e) return !0;
  for (const t in e) return !1;
  return !0;
}
function uI(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
var cI = (e, t) => {
  if (typeof t != "number" || !Number.isInteger(t)) throw new me(`${e} must be an integer`);
  if (t < 0) throw new me(`${e} must be a positive integer`);
  return t;
}, M_ = (e) => {
  try {
    return JSON.parse(e);
  } catch {
    return;
  }
}, fI = (e) => new Promise((t) => setTimeout(t, e)), go = "0.89.0", dI = () => typeof window < "u" && typeof window.document < "u" && typeof navigator < "u";
function hI() {
  return typeof Deno < "u" && Deno.build != null ? "deno" : typeof EdgeRuntime < "u" ? "edge" : Object.prototype.toString.call(typeof globalThis.process < "u" ? globalThis.process : 0) === "[object process]" ? "node" : "unknown";
}
var pI = () => {
  const e = hI();
  if (e === "deno") return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": go,
    "X-Stainless-OS": Pp(Deno.build.os),
    "X-Stainless-Arch": Rp(Deno.build.arch),
    "X-Stainless-Runtime": "deno",
    "X-Stainless-Runtime-Version": typeof Deno.version == "string" ? Deno.version : Deno.version?.deno ?? "unknown"
  };
  if (typeof EdgeRuntime < "u") return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": go,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": `other:${EdgeRuntime}`,
    "X-Stainless-Runtime": "edge",
    "X-Stainless-Runtime-Version": globalThis.process.version
  };
  if (e === "node") return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": go,
    "X-Stainless-OS": Pp(globalThis.process.platform ?? "unknown"),
    "X-Stainless-Arch": Rp(globalThis.process.arch ?? "unknown"),
    "X-Stainless-Runtime": "node",
    "X-Stainless-Runtime-Version": globalThis.process.version ?? "unknown"
  };
  const t = mI();
  return t ? {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": go,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": `browser:${t.browser}`,
    "X-Stainless-Runtime-Version": t.version
  } : {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": go,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": "unknown",
    "X-Stainless-Runtime-Version": "unknown"
  };
};
function mI() {
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
var Rp = (e) => e === "x32" ? "x32" : e === "x86_64" || e === "x64" ? "x64" : e === "arm" ? "arm" : e === "aarch64" || e === "arm64" ? "arm64" : e ? `other:${e}` : "unknown", Pp = (e) => (e = e.toLowerCase(), e.includes("ios") ? "iOS" : e === "android" ? "Android" : e === "darwin" ? "MacOS" : e === "win32" ? "Windows" : e === "freebsd" ? "FreeBSD" : e === "openbsd" ? "OpenBSD" : e === "linux" ? "Linux" : e ? `Other:${e}` : "Unknown"), xp, gI = () => xp ?? (xp = pI());
function yI() {
  if (typeof fetch < "u") return fetch;
  throw new Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new Anthropic({ fetch })` or polyfill the global, `globalThis.fetch = fetch`");
}
function N_(...e) {
  const t = globalThis.ReadableStream;
  if (typeof t > "u") throw new Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");
  return new t(...e);
}
function k_(e) {
  let t = Symbol.asyncIterator in e ? e[Symbol.asyncIterator]() : e[Symbol.iterator]();
  return N_({
    start() {
    },
    async pull(n) {
      const { done: r, value: o } = await t.next();
      r ? n.close() : n.enqueue(o);
    },
    async cancel() {
      await t.return?.();
    }
  });
}
function Id(e) {
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
async function vI(e) {
  if (e === null || typeof e != "object") return;
  if (e[Symbol.asyncIterator]) {
    await e[Symbol.asyncIterator]().return?.();
    return;
  }
  const t = e.getReader(), n = t.cancel();
  t.releaseLock(), await n;
}
var _I = ({ headers: e, body: t }) => ({
  bodyHeaders: { "content-type": "application/json" },
  body: JSON.stringify(t)
});
function wI(e) {
  return Object.entries(e).filter(([t, n]) => typeof n < "u").map(([t, n]) => {
    if (typeof n == "string" || typeof n == "number" || typeof n == "boolean") return `${encodeURIComponent(t)}=${encodeURIComponent(n)}`;
    if (n === null) return `${encodeURIComponent(t)}=`;
    throw new me(`Cannot stringify type ${typeof n}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`);
  }).join("&");
}
function EI(e) {
  let t = 0;
  for (const o of e) t += o.length;
  const n = new Uint8Array(t);
  let r = 0;
  for (const o of e)
    n.set(o, r), r += o.length;
  return n;
}
var Mp;
function Rd(e) {
  let t;
  return (Mp ?? (t = new globalThis.TextEncoder(), Mp = t.encode.bind(t)))(e);
}
var Np;
function kp(e) {
  let t;
  return (Np ?? (t = new globalThis.TextDecoder(), Np = t.decode.bind(t)))(e);
}
var Mt, Nt, Us = class {
  constructor() {
    Mt.set(this, void 0), Nt.set(this, void 0), j(this, Mt, new Uint8Array(), "f"), j(this, Nt, null, "f");
  }
  decode(e) {
    if (e == null) return [];
    const t = e instanceof ArrayBuffer ? new Uint8Array(e) : typeof e == "string" ? Rd(e) : e;
    j(this, Mt, EI([P(this, Mt, "f"), t]), "f");
    const n = [];
    let r;
    for (; (r = TI(P(this, Mt, "f"), P(this, Nt, "f"))) != null; ) {
      if (r.carriage && P(this, Nt, "f") == null) {
        j(this, Nt, r.index, "f");
        continue;
      }
      if (P(this, Nt, "f") != null && (r.index !== P(this, Nt, "f") + 1 || r.carriage)) {
        n.push(kp(P(this, Mt, "f").subarray(0, P(this, Nt, "f") - 1))), j(this, Mt, P(this, Mt, "f").subarray(P(this, Nt, "f")), "f"), j(this, Nt, null, "f");
        continue;
      }
      const o = P(this, Nt, "f") !== null ? r.preceding - 1 : r.preceding, i = kp(P(this, Mt, "f").subarray(0, o));
      n.push(i), j(this, Mt, P(this, Mt, "f").subarray(r.index), "f"), j(this, Nt, null, "f");
    }
    return n;
  }
  flush() {
    return P(this, Mt, "f").length ? this.decode(`
`) : [];
  }
};
Mt = /* @__PURE__ */ new WeakMap(), Nt = /* @__PURE__ */ new WeakMap();
Us.NEWLINE_CHARS = /* @__PURE__ */ new Set([`
`, "\r"]);
Us.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
function TI(e, t) {
  for (let o = t ?? 0; o < e.length; o++) {
    if (e[o] === 10) return {
      preceding: o,
      index: o + 1,
      carriage: !1
    };
    if (e[o] === 13) return {
      preceding: o,
      index: o + 1,
      carriage: !0
    };
  }
  return null;
}
function SI(e) {
  for (let r = 0; r < e.length - 1; r++) {
    if (e[r] === 10 && e[r + 1] === 10 || e[r] === 13 && e[r + 1] === 13) return r + 2;
    if (e[r] === 13 && e[r + 1] === 10 && r + 3 < e.length && e[r + 2] === 13 && e[r + 3] === 10) return r + 4;
  }
  return -1;
}
var Tl = {
  off: 0,
  error: 200,
  warn: 300,
  info: 400,
  debug: 500
}, Dp = (e, t, n) => {
  if (e) {
    if (uI(Tl, e)) return e;
    gt(n).warn(`${t} was set to ${JSON.stringify(e)}, expected one of ${JSON.stringify(Object.keys(Tl))}`);
  }
};
function xi() {
}
function ra(e, t, n) {
  return !t || Tl[e] > Tl[n] ? xi : t[e].bind(t);
}
var AI = {
  error: xi,
  warn: xi,
  info: xi,
  debug: xi
}, Lp = /* @__PURE__ */ new WeakMap();
function gt(e) {
  const t = e.logger, n = e.logLevel ?? "off";
  if (!t) return AI;
  const r = Lp.get(t);
  if (r && r[0] === n) return r[1];
  const o = {
    error: ra("error", t, n),
    warn: ra("warn", t, n),
    info: ra("info", t, n),
    debug: ra("debug", t, n)
  };
  return Lp.set(t, [n, o]), o;
}
var Ir = (e) => (e.options && (e.options = { ...e.options }, delete e.options.headers), e.headers && (e.headers = Object.fromEntries((e.headers instanceof Headers ? [...e.headers] : Object.entries(e.headers)).map(([t, n]) => [t, t.toLowerCase() === "x-api-key" || t.toLowerCase() === "authorization" || t.toLowerCase() === "cookie" || t.toLowerCase() === "set-cookie" ? "***" : n]))), "retryOfRequestLogID" in e && (e.retryOfRequestLogID && (e.retryOf = e.retryOfRequestLogID), delete e.retryOfRequestLogID), e), ai, Ss = class Mi {
  constructor(t, n, r) {
    this.iterator = t, ai.set(this, void 0), this.controller = n, j(this, ai, r, "f");
  }
  static fromSSEResponse(t, n, r) {
    let o = !1;
    const i = r ? gt(r) : console;
    async function* s() {
      if (o) throw new me("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      o = !0;
      let a = !1;
      try {
        for await (const u of CI(t, n)) {
          if (u.event === "completion") try {
            yield JSON.parse(u.data);
          } catch (f) {
            throw i.error("Could not parse message into JSON:", u.data), i.error("From chunk:", u.raw), f;
          }
          if (u.event === "message_start" || u.event === "message_delta" || u.event === "message_stop" || u.event === "content_block_start" || u.event === "content_block_delta" || u.event === "content_block_stop" || u.event === "message" || u.event === "user.message" || u.event === "user.interrupt" || u.event === "user.tool_confirmation" || u.event === "user.custom_tool_result" || u.event === "agent.message" || u.event === "agent.thinking" || u.event === "agent.tool_use" || u.event === "agent.tool_result" || u.event === "agent.mcp_tool_use" || u.event === "agent.mcp_tool_result" || u.event === "agent.custom_tool_use" || u.event === "agent.thread_context_compacted" || u.event === "session.status_running" || u.event === "session.status_idle" || u.event === "session.status_rescheduled" || u.event === "session.status_terminated" || u.event === "session.error" || u.event === "session.deleted" || u.event === "span.model_request_start" || u.event === "span.model_request_end") try {
            yield JSON.parse(u.data);
          } catch (f) {
            throw i.error("Could not parse message into JSON:", u.data), i.error("From chunk:", u.raw), f;
          }
          if (u.event !== "ping" && u.event === "error") {
            const f = M_(u.data) ?? u.data, d = f?.error?.type;
            throw new Ot(void 0, f, void 0, t.headers, d);
          }
        }
        a = !0;
      } catch (u) {
        if (Ts(u)) return;
        throw u;
      } finally {
        a || n.abort();
      }
    }
    return new Mi(s, n, r);
  }
  static fromReadableStream(t, n, r) {
    let o = !1;
    async function* i() {
      const a = new Us(), u = Id(t);
      for await (const f of u) for (const d of a.decode(f)) yield d;
      for (const f of a.flush()) yield f;
    }
    async function* s() {
      if (o) throw new me("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      o = !0;
      let a = !1;
      try {
        for await (const u of i())
          a || u && (yield JSON.parse(u));
        a = !0;
      } catch (u) {
        if (Ts(u)) return;
        throw u;
      } finally {
        a || n.abort();
      }
    }
    return new Mi(s, n, r);
  }
  [(ai = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    return this.iterator();
  }
  tee() {
    const t = [], n = [], r = this.iterator(), o = (i) => ({ next: () => {
      if (i.length === 0) {
        const s = r.next();
        t.push(s), n.push(s);
      }
      return i.shift();
    } });
    return [new Mi(() => o(t), this.controller, P(this, ai, "f")), new Mi(() => o(n), this.controller, P(this, ai, "f"))];
  }
  toReadableStream() {
    const t = this;
    let n;
    return N_({
      async start() {
        n = t[Symbol.asyncIterator]();
      },
      async pull(r) {
        try {
          const { value: o, done: i } = await n.next();
          if (i) return r.close();
          const s = Rd(JSON.stringify(o) + `
`);
          r.enqueue(s);
        } catch (o) {
          r.error(o);
        }
      },
      async cancel() {
        await n.return?.();
      }
    });
  }
};
async function* CI(e, t) {
  if (!e.body)
    throw t.abort(), typeof globalThis.navigator < "u" && globalThis.navigator.product === "ReactNative" ? new me("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api") : new me("Attempted to iterate over a response with no body");
  const n = new II(), r = new Us(), o = Id(e.body);
  for await (const i of bI(o)) for (const s of r.decode(i)) {
    const a = n.decode(s);
    a && (yield a);
  }
  for (const i of r.flush()) {
    const s = n.decode(i);
    s && (yield s);
  }
}
async function* bI(e) {
  let t = new Uint8Array();
  for await (const n of e) {
    if (n == null) continue;
    const r = n instanceof ArrayBuffer ? new Uint8Array(n) : typeof n == "string" ? Rd(n) : n;
    let o = new Uint8Array(t.length + r.length);
    o.set(t), o.set(r, t.length), t = o;
    let i;
    for (; (i = SI(t)) !== -1; )
      yield t.slice(0, i), t = t.slice(i);
  }
  t.length > 0 && (yield t);
}
var II = class {
  constructor() {
    this.event = null, this.data = [], this.chunks = [];
  }
  decode(e) {
    if (e.endsWith("\r") && (e = e.substring(0, e.length - 1)), !e) {
      if (!this.event && !this.data.length) return null;
      const o = {
        event: this.event,
        data: this.data.join(`
`),
        raw: this.chunks
      };
      return this.event = null, this.data = [], this.chunks = [], o;
    }
    if (this.chunks.push(e), e.startsWith(":")) return null;
    let [t, n, r] = RI(e, ":");
    return r.startsWith(" ") && (r = r.substring(1)), t === "event" ? this.event = r : t === "data" && this.data.push(r), null;
  }
};
function RI(e, t) {
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
async function D_(e, t) {
  const { response: n, requestLogID: r, retryOfRequestLogID: o, startTime: i } = t, s = await (async () => {
    if (t.options.stream)
      return gt(e).debug("response", n.status, n.url, n.headers, n.body), t.options.__streamClass ? t.options.__streamClass.fromSSEResponse(n, t.controller) : Ss.fromSSEResponse(n, t.controller);
    if (n.status === 204) return null;
    if (t.options.__binaryResponse) return n;
    const a = n.headers.get("content-type")?.split(";")[0]?.trim();
    return a?.includes("application/json") || a?.endsWith("+json") ? n.headers.get("content-length") === "0" ? void 0 : L_(await n.json(), n) : await n.text();
  })();
  return gt(e).debug(`[${r}] response parsed`, Ir({
    retryOfRequestLogID: o,
    url: n.url,
    status: n.status,
    body: s,
    durationMs: Date.now() - i
  })), s;
}
function L_(e, t) {
  return !e || typeof e != "object" || Array.isArray(e) ? e : Object.defineProperty(e, "_request_id", {
    value: t.headers.get("request-id"),
    enumerable: !1
  });
}
var Ni, U_ = class $_ extends Promise {
  constructor(t, n, r = D_) {
    super((o) => {
      o(null);
    }), this.responsePromise = n, this.parseResponse = r, Ni.set(this, void 0), j(this, Ni, t, "f");
  }
  _thenUnwrap(t) {
    return new $_(P(this, Ni, "f"), this.responsePromise, async (n, r) => L_(t(await this.parseResponse(n, r), r), r.response));
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
    return this.parsedPromise || (this.parsedPromise = this.responsePromise.then((t) => this.parseResponse(P(this, Ni, "f"), t))), this.parsedPromise;
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
Ni = /* @__PURE__ */ new WeakMap();
var oa, F_ = class {
  constructor(e, t, n, r) {
    oa.set(this, void 0), j(this, oa, e, "f"), this.options = r, this.response = t, this.body = n;
  }
  hasNextPage() {
    return this.getPaginatedItems().length ? this.nextPageRequestOptions() != null : !1;
  }
  async getNextPage() {
    const e = this.nextPageRequestOptions();
    if (!e) throw new me("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
    return await P(this, oa, "f").requestAPIList(this.constructor, e);
  }
  async *iterPages() {
    let e = this;
    for (yield e; e.hasNextPage(); )
      e = await e.getNextPage(), yield e;
  }
  async *[(oa = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    for await (const e of this.iterPages()) for (const t of e.getPaginatedItems()) yield t;
  }
}, PI = class extends U_ {
  constructor(e, t, n) {
    super(e, t, async (r, o) => new n(r, o.response, await D_(r, o), o.options));
  }
  async *[Symbol.asyncIterator]() {
    const e = await this;
    for await (const t of e) yield t;
  }
}, $s = class extends F_ {
  constructor(e, t, n, r) {
    super(e, t, n, r), this.data = n.data || [], this.has_more = n.has_more || !1, this.first_id = n.first_id || null, this.last_id = n.last_id || null;
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
          ...zc(this.options.query),
          before_id: t
        }
      } : null;
    }
    const e = this.last_id;
    return e ? {
      ...this.options,
      query: {
        ...zc(this.options.query),
        after_id: e
      }
    } : null;
  }
}, Cn = class extends F_ {
  constructor(e, t, n, r) {
    super(e, t, n, r), this.data = n.data || [], this.next_page = n.next_page || null;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  nextPageRequestOptions() {
    const e = this.next_page;
    return e ? {
      ...this.options,
      query: {
        ...zc(this.options.query),
        page: e
      }
    } : null;
  }
}, O_ = () => {
  if (typeof File > "u") {
    const { process: e } = globalThis, t = typeof e?.versions?.node == "string" && parseInt(e.versions.node.split(".")) < 20;
    throw new Error("`File` is not defined as a global, which is required for file uploads." + (t ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`." : ""));
  }
};
function ko(e, t, n) {
  return O_(), new File(e, t ?? "unknown_file", n);
}
function Ba(e, t) {
  const n = typeof e == "object" && e !== null && ("name" in e && e.name && String(e.name) || "url" in e && e.url && String(e.url) || "filename" in e && e.filename && String(e.filename) || "path" in e && e.path && String(e.path)) || "";
  return t ? n.split(/[\\/]/).pop() || void 0 : n;
}
var B_ = (e) => e != null && typeof e == "object" && typeof e[Symbol.asyncIterator] == "function", Pd = async (e, t, n = !0) => ({
  ...e,
  body: await MI(e.body, t, n)
}), Up = /* @__PURE__ */ new WeakMap();
function xI(e) {
  const t = typeof e == "function" ? e : e.fetch, n = Up.get(t);
  if (n) return n;
  const r = (async () => {
    try {
      const o = "Response" in t ? t.Response : (await t("data:,")).constructor, i = new FormData();
      return i.toString() !== await new o(i).text();
    } catch {
      return !0;
    }
  })();
  return Up.set(t, r), r;
}
var MI = async (e, t, n = !0) => {
  if (!await xI(t)) throw new TypeError("The provided fetch function does not support file uploads with the current global FormData class.");
  const r = new FormData();
  return await Promise.all(Object.entries(e || {}).map(([o, i]) => Xc(r, o, i, n))), r;
}, NI = (e) => e instanceof Blob && "name" in e, Xc = async (e, t, n, r) => {
  if (n !== void 0) {
    if (n == null) throw new TypeError(`Received null for "${t}"; to pass null in FormData, you must use the string 'null'`);
    if (typeof n == "string" || typeof n == "number" || typeof n == "boolean") e.append(t, String(n));
    else if (n instanceof Response) {
      let o = {};
      const i = n.headers.get("Content-Type");
      i && (o = { type: i }), e.append(t, ko([await n.blob()], Ba(n, r), o));
    } else if (B_(n)) e.append(t, ko([await new Response(k_(n)).blob()], Ba(n, r)));
    else if (NI(n)) e.append(t, ko([n], Ba(n, r), { type: n.type }));
    else if (Array.isArray(n)) await Promise.all(n.map((o) => Xc(e, t + "[]", o, r)));
    else if (typeof n == "object") await Promise.all(Object.entries(n).map(([o, i]) => Xc(e, `${t}[${o}]`, i, r)));
    else throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${n} instead`);
  }
}, G_ = (e) => e != null && typeof e == "object" && typeof e.size == "number" && typeof e.type == "string" && typeof e.text == "function" && typeof e.slice == "function" && typeof e.arrayBuffer == "function", kI = (e) => e != null && typeof e == "object" && typeof e.name == "string" && typeof e.lastModified == "number" && G_(e), DI = (e) => e != null && typeof e == "object" && typeof e.url == "string" && typeof e.blob == "function";
async function LI(e, t, n) {
  if (O_(), e = await e, t || (t = Ba(e, !0)), kI(e))
    return e instanceof File && t == null && n == null ? e : ko([await e.arrayBuffer()], t ?? e.name, {
      type: e.type,
      lastModified: e.lastModified,
      ...n
    });
  if (DI(e)) {
    const o = await e.blob();
    return t || (t = new URL(e.url).pathname.split(/[\\/]/).pop()), ko(await Qc(o), t, n);
  }
  const r = await Qc(e);
  if (!n?.type) {
    const o = r.find((i) => typeof i == "object" && "type" in i && i.type);
    typeof o == "string" && (n = {
      ...n,
      type: o
    });
  }
  return ko(r, t, n);
}
async function Qc(e) {
  let t = [];
  if (typeof e == "string" || ArrayBuffer.isView(e) || e instanceof ArrayBuffer) t.push(e);
  else if (G_(e)) t.push(e instanceof Blob ? e : await e.arrayBuffer());
  else if (B_(e)) for await (const n of e) t.push(...await Qc(n));
  else {
    const n = e?.constructor?.name;
    throw new Error(`Unexpected data type: ${typeof e}${n ? `; constructor: ${n}` : ""}${UI(e)}`);
  }
  return t;
}
function UI(e) {
  return typeof e != "object" || e === null ? "" : `; props: [${Object.getOwnPropertyNames(e).map((t) => `"${t}"`).join(", ")}]`;
}
var Ze = class {
  constructor(e) {
    this._client = e;
  }
}, V_ = /* @__PURE__ */ Symbol.for("brand.privateNullableHeaders");
function* $I(e) {
  if (!e) return;
  if (V_ in e) {
    const { values: r, nulls: o } = e;
    yield* r.entries();
    for (const i of o) yield [i, null];
    return;
  }
  let t = !1, n;
  e instanceof Headers ? n = e.entries() : bp(e) ? n = e : (t = !0, n = Object.entries(e ?? {}));
  for (let r of n) {
    const o = r[0];
    if (typeof o != "string") throw new TypeError("expected header name to be a string");
    const i = bp(r[1]) ? r[1] : [r[1]];
    let s = !1;
    for (const a of i)
      a !== void 0 && (t && !s && (s = !0, yield [o, null]), yield [o, a]);
  }
}
var Q = (e) => {
  const t = new Headers(), n = /* @__PURE__ */ new Set();
  for (const r of e) {
    const o = /* @__PURE__ */ new Set();
    for (const [i, s] of $I(r)) {
      const a = i.toLowerCase();
      o.has(a) || (t.delete(i), o.add(a)), s === null ? (t.delete(i), n.add(a)) : (t.append(i, s), n.delete(a));
    }
  }
  return {
    [V_]: !0,
    values: t,
    nulls: n
  };
};
function H_(e) {
  return e.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent);
}
var $p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.create(null)), FI = (e = H_) => function(n, ...r) {
  if (n.length === 1) return n[0];
  let o = !1;
  const i = [], s = n.reduce((d, h, p) => {
    /[?#]/.test(h) && (o = !0);
    const m = r[p];
    let g = (o ? encodeURIComponent : e)("" + m);
    return p !== r.length && (m == null || typeof m == "object" && m.toString === Object.getPrototypeOf(Object.getPrototypeOf(m.hasOwnProperty ?? $p) ?? $p)?.toString) && (g = m + "", i.push({
      start: d.length + h.length,
      length: g.length,
      error: `Value of type ${Object.prototype.toString.call(m).slice(8, -1)} is not a valid path parameter`
    })), d + h + (p === r.length ? "" : g);
  }, ""), a = s.split(/[?#]/, 1)[0], u = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi;
  let f;
  for (; (f = u.exec(a)) !== null; ) i.push({
    start: f.index,
    length: f[0].length,
    error: `Value "${f[0]}" can't be safely passed as a path parameter`
  });
  if (i.sort((d, h) => d.start - h.start), i.length > 0) {
    let d = 0;
    const h = i.reduce((p, m) => {
      const g = " ".repeat(m.start - d), y = "^".repeat(m.length);
      return d = m.start + m.length, p + g + y;
    }, "");
    throw new me(`Path parameters result in path with invalid segments:
${i.map((p) => p.error).join(`
`)}
${s}
${h}`);
  }
  return s;
}, de = /* @__PURE__ */ FI(H_), q_ = class extends Ze {
  create(e, t) {
    const { betas: n, ...r } = e;
    return this._client.post("/v1/environments?beta=true", {
      body: r,
      ...t,
      headers: Q([{ "anthropic-beta": [...n ?? [], "managed-agents-2026-04-01"].toString() }, t?.headers])
    });
  }
  retrieve(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.get(de`/v1/environments/${e}?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  update(e, t, n) {
    const { betas: r, ...o } = t;
    return this._client.post(de`/v1/environments/${e}?beta=true`, {
      body: o,
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  list(e = {}, t) {
    const { betas: n, ...r } = e ?? {};
    return this._client.getAPIList("/v1/environments?beta=true", Cn, {
      query: r,
      ...t,
      headers: Q([{ "anthropic-beta": [...n ?? [], "managed-agents-2026-04-01"].toString() }, t?.headers])
    });
  }
  delete(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.delete(de`/v1/environments/${e}?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  archive(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.post(de`/v1/environments/${e}/archive?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
}, es = /* @__PURE__ */ Symbol("anthropic.sdk.stainlessHelper");
function Ga(e) {
  return typeof e == "object" && e !== null && es in e;
}
function K_(e, t) {
  const n = /* @__PURE__ */ new Set();
  if (e)
    for (const r of e) Ga(r) && n.add(r[es]);
  if (t) {
    for (const r of t)
      if (Ga(r) && n.add(r[es]), Array.isArray(r.content))
        for (const o of r.content) Ga(o) && n.add(o[es]);
  }
  return Array.from(n);
}
function J_(e, t) {
  const n = K_(e, t);
  return n.length === 0 ? {} : { "x-stainless-helper": n.join(", ") };
}
function OI(e) {
  return Ga(e) ? { "x-stainless-helper": e[es] } : {};
}
var W_ = class extends Ze {
  list(e = {}, t) {
    const { betas: n, ...r } = e ?? {};
    return this._client.getAPIList("/v1/files", $s, {
      query: r,
      ...t,
      headers: Q([{ "anthropic-beta": [...n ?? [], "files-api-2025-04-14"].toString() }, t?.headers])
    });
  }
  delete(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.delete(de`/v1/files/${e}`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "files-api-2025-04-14"].toString() }, n?.headers])
    });
  }
  download(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.get(de`/v1/files/${e}/content`, {
      ...n,
      headers: Q([{
        "anthropic-beta": [...r ?? [], "files-api-2025-04-14"].toString(),
        Accept: "application/binary"
      }, n?.headers]),
      __binaryResponse: !0
    });
  }
  retrieveMetadata(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.get(de`/v1/files/${e}`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "files-api-2025-04-14"].toString() }, n?.headers])
    });
  }
  upload(e, t) {
    const { betas: n, ...r } = e;
    return this._client.post("/v1/files", Pd({
      body: r,
      ...t,
      headers: Q([
        { "anthropic-beta": [...n ?? [], "files-api-2025-04-14"].toString() },
        OI(r.file),
        t?.headers
      ])
    }, this._client));
  }
}, Y_ = class extends Ze {
  retrieve(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.get(de`/v1/models/${e}?beta=true`, {
      ...n,
      headers: Q([{ ...r?.toString() != null ? { "anthropic-beta": r?.toString() } : void 0 }, n?.headers])
    });
  }
  list(e = {}, t) {
    const { betas: n, ...r } = e ?? {};
    return this._client.getAPIList("/v1/models?beta=true", $s, {
      query: r,
      ...t,
      headers: Q([{ ...n?.toString() != null ? { "anthropic-beta": n?.toString() } : void 0 }, t?.headers])
    });
  }
}, z_ = class extends Ze {
  list(e, t = {}, n) {
    const { betas: r, ...o } = t ?? {};
    return this._client.getAPIList(de`/v1/agents/${e}/versions?beta=true`, Cn, {
      query: o,
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
}, xd = class extends Ze {
  constructor() {
    super(...arguments), this.versions = new z_(this._client);
  }
  create(e, t) {
    const { betas: n, ...r } = e;
    return this._client.post("/v1/agents?beta=true", {
      body: r,
      ...t,
      headers: Q([{ "anthropic-beta": [...n ?? [], "managed-agents-2026-04-01"].toString() }, t?.headers])
    });
  }
  retrieve(e, t = {}, n) {
    const { betas: r, ...o } = t ?? {};
    return this._client.get(de`/v1/agents/${e}?beta=true`, {
      query: o,
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  update(e, t, n) {
    const { betas: r, ...o } = t;
    return this._client.post(de`/v1/agents/${e}?beta=true`, {
      body: o,
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  list(e = {}, t) {
    const { betas: n, ...r } = e ?? {};
    return this._client.getAPIList("/v1/agents?beta=true", Cn, {
      query: r,
      ...t,
      headers: Q([{ "anthropic-beta": [...n ?? [], "managed-agents-2026-04-01"].toString() }, t?.headers])
    });
  }
  archive(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.post(de`/v1/agents/${e}/archive?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
};
xd.Versions = z_;
var X_ = {
  "claude-opus-4-20250514": 8192,
  "claude-opus-4-0": 8192,
  "claude-4-opus-20250514": 8192,
  "anthropic.claude-opus-4-20250514-v1:0": 8192,
  "claude-opus-4@20250514": 8192,
  "claude-opus-4-1-20250805": 8192,
  "anthropic.claude-opus-4-1-20250805-v1:0": 8192,
  "claude-opus-4-1@20250805": 8192
};
function Q_(e) {
  return e?.output_format ?? e?.output_config?.format;
}
function Fp(e, t, n) {
  const r = Q_(t);
  return !t || !("parse" in (r ?? {})) ? {
    ...e,
    content: e.content.map((o) => {
      if (o.type === "text") {
        const i = Object.defineProperty({ ...o }, "parsed_output", {
          value: null,
          enumerable: !1
        });
        return Object.defineProperty(i, "parsed", {
          get() {
            return n.logger.warn("The `parsed` property on `text` blocks is deprecated, please use `parsed_output` instead."), null;
          },
          enumerable: !1
        });
      }
      return o;
    }),
    parsed_output: null
  } : Z_(e, t, n);
}
function Z_(e, t, n) {
  let r = null;
  const o = e.content.map((i) => {
    if (i.type === "text") {
      const s = BI(t, i.text);
      r === null && (r = s);
      const a = Object.defineProperty({ ...i }, "parsed_output", {
        value: s,
        enumerable: !1
      });
      return Object.defineProperty(a, "parsed", {
        get() {
          return n.logger.warn("The `parsed` property on `text` blocks is deprecated, please use `parsed_output` instead."), s;
        },
        enumerable: !1
      });
    }
    return i;
  });
  return {
    ...e,
    content: o,
    parsed_output: r
  };
}
function BI(e, t) {
  const n = Q_(e);
  if (n?.type !== "json_schema") return null;
  try {
    return "parse" in n ? n.parse(t) : JSON.parse(t);
  } catch (r) {
    throw new me(`Failed to parse structured output: ${r}`);
  }
}
var GI = (e) => {
  let t = 0, n = [];
  for (; t < e.length; ) {
    let r = e[t];
    if (r === "\\") {
      t++;
      continue;
    }
    if (r === "{") {
      n.push({
        type: "brace",
        value: "{"
      }), t++;
      continue;
    }
    if (r === "}") {
      n.push({
        type: "brace",
        value: "}"
      }), t++;
      continue;
    }
    if (r === "[") {
      n.push({
        type: "paren",
        value: "["
      }), t++;
      continue;
    }
    if (r === "]") {
      n.push({
        type: "paren",
        value: "]"
      }), t++;
      continue;
    }
    if (r === ":") {
      n.push({
        type: "separator",
        value: ":"
      }), t++;
      continue;
    }
    if (r === ",") {
      n.push({
        type: "delimiter",
        value: ","
      }), t++;
      continue;
    }
    if (r === '"') {
      let s = "", a = !1;
      for (r = e[++t]; r !== '"'; ) {
        if (t === e.length) {
          a = !0;
          break;
        }
        if (r === "\\") {
          if (t++, t === e.length) {
            a = !0;
            break;
          }
          s += r + e[t], r = e[++t];
        } else
          s += r, r = e[++t];
      }
      r = e[++t], a || n.push({
        type: "string",
        value: s
      });
      continue;
    }
    if (r && /\s/.test(r)) {
      t++;
      continue;
    }
    let o = /[0-9]/;
    if (r && o.test(r) || r === "-" || r === ".") {
      let s = "";
      for (r === "-" && (s += r, r = e[++t]); r && o.test(r) || r === "."; )
        s += r, r = e[++t];
      n.push({
        type: "number",
        value: s
      });
      continue;
    }
    let i = /[a-z]/i;
    if (r && i.test(r)) {
      let s = "";
      for (; r && i.test(r) && t !== e.length; )
        s += r, r = e[++t];
      if (s == "true" || s == "false" || s === "null") n.push({
        type: "name",
        value: s
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
}, yo = (e) => {
  if (e.length === 0) return e;
  let t = e[e.length - 1];
  switch (t.type) {
    case "separator":
      return e = e.slice(0, e.length - 1), yo(e);
    case "number":
      let n = t.value[t.value.length - 1];
      if (n === "." || n === "-")
        return e = e.slice(0, e.length - 1), yo(e);
    case "string":
      let r = e[e.length - 2];
      if (r?.type === "delimiter")
        return e = e.slice(0, e.length - 1), yo(e);
      if (r?.type === "brace" && r.value === "{")
        return e = e.slice(0, e.length - 1), yo(e);
      break;
    case "delimiter":
      return e = e.slice(0, e.length - 1), yo(e);
  }
  return e;
}, VI = (e) => {
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
}, HI = (e) => {
  let t = "";
  return e.map((n) => {
    n.type === "string" ? t += '"' + n.value + '"' : t += n.value;
  }), t;
}, j_ = (e) => JSON.parse(HI(VI(yo(GI(e))))), Bt, Xn, ao, li, ia, ui, ci, sa, fi, Mn, di, aa, la, Tr, ua, ca, hi, Ju, Op, fa, Wu, Yu, zu, Bp, Gp = "__json_buf";
function Vp(e) {
  return e.type === "tool_use" || e.type === "server_tool_use" || e.type === "mcp_tool_use";
}
var qI = class Zc {
  constructor(t, n) {
    Bt.add(this), this.messages = [], this.receivedMessages = [], Xn.set(this, void 0), ao.set(this, null), this.controller = new AbortController(), li.set(this, void 0), ia.set(this, () => {
    }), ui.set(this, () => {
    }), ci.set(this, void 0), sa.set(this, () => {
    }), fi.set(this, () => {
    }), Mn.set(this, {}), di.set(this, !1), aa.set(this, !1), la.set(this, !1), Tr.set(this, !1), ua.set(this, void 0), ca.set(this, void 0), hi.set(this, void 0), fa.set(this, (r) => {
      if (j(this, aa, !0, "f"), Ts(r) && (r = new jt()), r instanceof jt)
        return j(this, la, !0, "f"), this._emit("abort", r);
      if (r instanceof me) return this._emit("error", r);
      if (r instanceof Error) {
        const o = new me(r.message);
        return o.cause = r, this._emit("error", o);
      }
      return this._emit("error", new me(String(r)));
    }), j(this, li, new Promise((r, o) => {
      j(this, ia, r, "f"), j(this, ui, o, "f");
    }), "f"), j(this, ci, new Promise((r, o) => {
      j(this, sa, r, "f"), j(this, fi, o, "f");
    }), "f"), P(this, li, "f").catch(() => {
    }), P(this, ci, "f").catch(() => {
    }), j(this, ao, t, "f"), j(this, hi, n?.logger ?? console, "f");
  }
  get response() {
    return P(this, ua, "f");
  }
  get request_id() {
    return P(this, ca, "f");
  }
  async withResponse() {
    j(this, Tr, !0, "f");
    const t = await P(this, li, "f");
    if (!t) throw new Error("Could not resolve a `Response` object");
    return {
      data: this,
      response: t,
      request_id: t.headers.get("request-id")
    };
  }
  static fromReadableStream(t) {
    const n = new Zc(null);
    return n._run(() => n._fromReadableStream(t)), n;
  }
  static createMessage(t, n, r, { logger: o } = {}) {
    const i = new Zc(n, { logger: o });
    for (const s of n.messages) i._addMessageParam(s);
    return j(i, ao, {
      ...n,
      stream: !0
    }, "f"), i._run(() => i._createMessage(t, {
      ...n,
      stream: !0
    }, {
      ...r,
      headers: {
        ...r?.headers,
        "X-Stainless-Helper-Method": "stream"
      }
    })), i;
  }
  _run(t) {
    t().then(() => {
      this._emitFinal(), this._emit("end");
    }, P(this, fa, "f"));
  }
  _addMessageParam(t) {
    this.messages.push(t);
  }
  _addMessage(t, n = !0) {
    this.receivedMessages.push(t), n && this._emit("message", t);
  }
  async _createMessage(t, n, r) {
    const o = r?.signal;
    let i;
    o && (o.aborted && this.controller.abort(), i = this.controller.abort.bind(this.controller), o.addEventListener("abort", i));
    try {
      P(this, Bt, "m", Wu).call(this);
      const { response: s, data: a } = await t.create({
        ...n,
        stream: !0
      }, {
        ...r,
        signal: this.controller.signal
      }).withResponse();
      this._connected(s);
      for await (const u of a) P(this, Bt, "m", Yu).call(this, u);
      if (a.controller.signal?.aborted) throw new jt();
      P(this, Bt, "m", zu).call(this);
    } finally {
      o && i && o.removeEventListener("abort", i);
    }
  }
  _connected(t) {
    this.ended || (j(this, ua, t, "f"), j(this, ca, t?.headers.get("request-id"), "f"), P(this, ia, "f").call(this, t), this._emit("connect"));
  }
  get ended() {
    return P(this, di, "f");
  }
  get errored() {
    return P(this, aa, "f");
  }
  get aborted() {
    return P(this, la, "f");
  }
  abort() {
    this.controller.abort();
  }
  on(t, n) {
    return (P(this, Mn, "f")[t] || (P(this, Mn, "f")[t] = [])).push({ listener: n }), this;
  }
  off(t, n) {
    const r = P(this, Mn, "f")[t];
    if (!r) return this;
    const o = r.findIndex((i) => i.listener === n);
    return o >= 0 && r.splice(o, 1), this;
  }
  once(t, n) {
    return (P(this, Mn, "f")[t] || (P(this, Mn, "f")[t] = [])).push({
      listener: n,
      once: !0
    }), this;
  }
  emitted(t) {
    return new Promise((n, r) => {
      j(this, Tr, !0, "f"), t !== "error" && this.once("error", r), this.once(t, n);
    });
  }
  async done() {
    j(this, Tr, !0, "f"), await P(this, ci, "f");
  }
  get currentMessage() {
    return P(this, Xn, "f");
  }
  async finalMessage() {
    return await this.done(), P(this, Bt, "m", Ju).call(this);
  }
  async finalText() {
    return await this.done(), P(this, Bt, "m", Op).call(this);
  }
  _emit(t, ...n) {
    if (P(this, di, "f")) return;
    t === "end" && (j(this, di, !0, "f"), P(this, sa, "f").call(this));
    const r = P(this, Mn, "f")[t];
    if (r && (P(this, Mn, "f")[t] = r.filter((o) => !o.once), r.forEach(({ listener: o }) => o(...n))), t === "abort") {
      const o = n[0];
      !P(this, Tr, "f") && !r?.length && Promise.reject(o), P(this, ui, "f").call(this, o), P(this, fi, "f").call(this, o), this._emit("end");
      return;
    }
    if (t === "error") {
      const o = n[0];
      !P(this, Tr, "f") && !r?.length && Promise.reject(o), P(this, ui, "f").call(this, o), P(this, fi, "f").call(this, o), this._emit("end");
    }
  }
  _emitFinal() {
    this.receivedMessages.at(-1) && this._emit("finalMessage", P(this, Bt, "m", Ju).call(this));
  }
  async _fromReadableStream(t, n) {
    const r = n?.signal;
    let o;
    r && (r.aborted && this.controller.abort(), o = this.controller.abort.bind(this.controller), r.addEventListener("abort", o));
    try {
      P(this, Bt, "m", Wu).call(this), this._connected(null);
      const i = Ss.fromReadableStream(t, this.controller);
      for await (const s of i) P(this, Bt, "m", Yu).call(this, s);
      if (i.controller.signal?.aborted) throw new jt();
      P(this, Bt, "m", zu).call(this);
    } finally {
      r && o && r.removeEventListener("abort", o);
    }
  }
  [(Xn = /* @__PURE__ */ new WeakMap(), ao = /* @__PURE__ */ new WeakMap(), li = /* @__PURE__ */ new WeakMap(), ia = /* @__PURE__ */ new WeakMap(), ui = /* @__PURE__ */ new WeakMap(), ci = /* @__PURE__ */ new WeakMap(), sa = /* @__PURE__ */ new WeakMap(), fi = /* @__PURE__ */ new WeakMap(), Mn = /* @__PURE__ */ new WeakMap(), di = /* @__PURE__ */ new WeakMap(), aa = /* @__PURE__ */ new WeakMap(), la = /* @__PURE__ */ new WeakMap(), Tr = /* @__PURE__ */ new WeakMap(), ua = /* @__PURE__ */ new WeakMap(), ca = /* @__PURE__ */ new WeakMap(), hi = /* @__PURE__ */ new WeakMap(), fa = /* @__PURE__ */ new WeakMap(), Bt = /* @__PURE__ */ new WeakSet(), Ju = function() {
    if (this.receivedMessages.length === 0) throw new me("stream ended without producing a Message with role=assistant");
    return this.receivedMessages.at(-1);
  }, Op = function() {
    if (this.receivedMessages.length === 0) throw new me("stream ended without producing a Message with role=assistant");
    const n = this.receivedMessages.at(-1).content.filter((r) => r.type === "text").map((r) => r.text);
    if (n.length === 0) throw new me("stream ended without producing a content block with type=text");
    return n.join(" ");
  }, Wu = function() {
    this.ended || j(this, Xn, void 0, "f");
  }, Yu = function(n) {
    if (this.ended) return;
    const r = P(this, Bt, "m", Bp).call(this, n);
    switch (this._emit("streamEvent", n, r), n.type) {
      case "content_block_delta": {
        const o = r.content.at(-1);
        switch (n.delta.type) {
          case "text_delta":
            o.type === "text" && this._emit("text", n.delta.text, o.text || "");
            break;
          case "citations_delta":
            o.type === "text" && this._emit("citation", n.delta.citation, o.citations ?? []);
            break;
          case "input_json_delta":
            Vp(o) && o.input && this._emit("inputJson", n.delta.partial_json, o.input);
            break;
          case "thinking_delta":
            o.type === "thinking" && this._emit("thinking", n.delta.thinking, o.thinking);
            break;
          case "signature_delta":
            o.type === "thinking" && this._emit("signature", o.signature);
            break;
          case "compaction_delta":
            o.type === "compaction" && o.content && this._emit("compaction", o.content);
            break;
          default:
            n.delta;
        }
        break;
      }
      case "message_stop":
        this._addMessageParam(r), this._addMessage(Fp(r, P(this, ao, "f"), { logger: P(this, hi, "f") }), !0);
        break;
      case "content_block_stop":
        this._emit("contentBlock", r.content.at(-1));
        break;
      case "message_start":
        j(this, Xn, r, "f");
        break;
      case "content_block_start":
      case "message_delta":
        break;
    }
  }, zu = function() {
    if (this.ended) throw new me("stream has ended, this shouldn't happen");
    const n = P(this, Xn, "f");
    if (!n) throw new me("request ended without sending any chunks");
    return j(this, Xn, void 0, "f"), Fp(n, P(this, ao, "f"), { logger: P(this, hi, "f") });
  }, Bp = function(n) {
    let r = P(this, Xn, "f");
    if (n.type === "message_start") {
      if (r) throw new me(`Unexpected event order, got ${n.type} before receiving "message_stop"`);
      return n.message;
    }
    if (!r) throw new me(`Unexpected event order, got ${n.type} before "message_start"`);
    switch (n.type) {
      case "message_stop":
        return r;
      case "message_delta":
        return r.container = n.delta.container, r.stop_reason = n.delta.stop_reason, r.stop_sequence = n.delta.stop_sequence, r.usage.output_tokens = n.usage.output_tokens, r.context_management = n.context_management, n.usage.input_tokens != null && (r.usage.input_tokens = n.usage.input_tokens), n.usage.cache_creation_input_tokens != null && (r.usage.cache_creation_input_tokens = n.usage.cache_creation_input_tokens), n.usage.cache_read_input_tokens != null && (r.usage.cache_read_input_tokens = n.usage.cache_read_input_tokens), n.usage.server_tool_use != null && (r.usage.server_tool_use = n.usage.server_tool_use), n.usage.iterations != null && (r.usage.iterations = n.usage.iterations), r;
      case "content_block_start":
        return r.content.push(n.content_block), r;
      case "content_block_delta": {
        const o = r.content.at(n.index);
        switch (n.delta.type) {
          case "text_delta":
            o?.type === "text" && (r.content[n.index] = {
              ...o,
              text: (o.text || "") + n.delta.text
            });
            break;
          case "citations_delta":
            o?.type === "text" && (r.content[n.index] = {
              ...o,
              citations: [...o.citations ?? [], n.delta.citation]
            });
            break;
          case "input_json_delta":
            if (o && Vp(o)) {
              let i = o[Gp] || "";
              i += n.delta.partial_json;
              const s = { ...o };
              if (Object.defineProperty(s, Gp, {
                value: i,
                enumerable: !1,
                writable: !0
              }), i) try {
                s.input = j_(i);
              } catch (a) {
                const u = new me(`Unable to parse tool parameter JSON from model. Please retry your request or adjust your prompt. Error: ${a}. JSON: ${i}`);
                P(this, fa, "f").call(this, u);
              }
              r.content[n.index] = s;
            }
            break;
          case "thinking_delta":
            o?.type === "thinking" && (r.content[n.index] = {
              ...o,
              thinking: o.thinking + n.delta.thinking
            });
            break;
          case "signature_delta":
            o?.type === "thinking" && (r.content[n.index] = {
              ...o,
              signature: n.delta.signature
            });
            break;
          case "compaction_delta":
            o?.type === "compaction" && (r.content[n.index] = {
              ...o,
              content: (o.content || "") + n.delta.content
            });
            break;
          default:
            n.delta;
        }
        return r;
      }
      case "content_block_stop":
        return r;
    }
  }, Symbol.asyncIterator)]() {
    const t = [], n = [];
    let r = !1;
    return this.on("streamEvent", (o) => {
      const i = n.shift();
      i ? i.resolve(o) : t.push(o);
    }), this.on("end", () => {
      r = !0;
      for (const o of n) o.resolve(void 0);
      n.length = 0;
    }), this.on("abort", (o) => {
      r = !0;
      for (const i of n) i.reject(o);
      n.length = 0;
    }), this.on("error", (o) => {
      r = !0;
      for (const i of n) i.reject(o);
      n.length = 0;
    }), {
      next: async () => t.length ? {
        value: t.shift(),
        done: !1
      } : r ? {
        value: void 0,
        done: !0
      } : new Promise((o, i) => n.push({
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
  toReadableStream() {
    return new Ss(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
  }
};
var ew = class extends Error {
  constructor(e) {
    const t = typeof e == "string" ? e : e.map((n) => n.type === "text" ? n.text : `[${n.type}]`).join(" ");
    super(t), this.name = "ToolError", this.content = e;
  }
};
var KI = `You have been working on the task described above but have not yet completed it. Write a continuation summary that will allow you (or another instance of yourself) to resume work efficiently in a future context window where the conversation history will be replaced with this summary. Your summary should be structured, concise, and actionable. Include:
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
Wrap your summary in <summary></summary> tags.`, pi, lo, Sr, ze, Tt, Pt, Bn, Qn, mi, Hp, jc;
function qp() {
  let e, t;
  return {
    promise: new Promise((n, r) => {
      e = n, t = r;
    }),
    resolve: e,
    reject: t
  };
}
var tw = class {
  constructor(e, t, n) {
    pi.add(this), this.client = e, lo.set(this, !1), Sr.set(this, !1), ze.set(this, void 0), Tt.set(this, void 0), Pt.set(this, void 0), Bn.set(this, void 0), Qn.set(this, void 0), mi.set(this, 0), j(this, ze, { params: {
      ...t,
      messages: structuredClone(t.messages)
    } }, "f");
    const r = ["BetaToolRunner", ...K_(t.tools, t.messages)].join(", ");
    j(this, Tt, {
      ...n,
      headers: Q([{ "x-stainless-helper": r }, n?.headers])
    }, "f"), j(this, Qn, qp(), "f"), t.compactionControl?.enabled && console.warn('Anthropic: The `compactionControl` parameter is deprecated and will be removed in a future version. Use server-side compaction instead by passing `edits: [{ type: "compact_20260112" }]` in the params passed to `toolRunner()`. See https://platform.claude.com/docs/en/build-with-claude/compaction');
  }
  async *[(lo = /* @__PURE__ */ new WeakMap(), Sr = /* @__PURE__ */ new WeakMap(), ze = /* @__PURE__ */ new WeakMap(), Tt = /* @__PURE__ */ new WeakMap(), Pt = /* @__PURE__ */ new WeakMap(), Bn = /* @__PURE__ */ new WeakMap(), Qn = /* @__PURE__ */ new WeakMap(), mi = /* @__PURE__ */ new WeakMap(), pi = /* @__PURE__ */ new WeakSet(), Hp = async function() {
    const t = P(this, ze, "f").params.compactionControl;
    if (!t || !t.enabled) return !1;
    let n = 0;
    if (P(this, Pt, "f") !== void 0) try {
      const u = await P(this, Pt, "f");
      n = u.usage.input_tokens + (u.usage.cache_creation_input_tokens ?? 0) + (u.usage.cache_read_input_tokens ?? 0) + u.usage.output_tokens;
    } catch {
      return !1;
    }
    const r = t.contextTokenThreshold ?? 1e5;
    if (n < r) return !1;
    const o = t.model ?? P(this, ze, "f").params.model, i = t.summaryPrompt ?? KI, s = P(this, ze, "f").params.messages;
    if (s[s.length - 1].role === "assistant") {
      const u = s[s.length - 1];
      if (Array.isArray(u.content)) {
        const f = u.content.filter((d) => d.type !== "tool_use");
        f.length === 0 ? s.pop() : u.content = f;
      }
    }
    const a = await this.client.beta.messages.create({
      model: o,
      messages: [...s, {
        role: "user",
        content: [{
          type: "text",
          text: i
        }]
      }],
      max_tokens: P(this, ze, "f").params.max_tokens
    }, {
      signal: P(this, Tt, "f").signal,
      headers: Q([P(this, Tt, "f").headers, { "x-stainless-helper": "compaction" }])
    });
    if (a.content[0]?.type !== "text") throw new me("Expected text response for compaction");
    return P(this, ze, "f").params.messages = [{
      role: "user",
      content: a.content
    }], !0;
  }, Symbol.asyncIterator)]() {
    var e;
    if (P(this, lo, "f")) throw new me("Cannot iterate over a consumed stream");
    j(this, lo, !0, "f"), j(this, Sr, !0, "f"), j(this, Bn, void 0, "f");
    try {
      for (; ; ) {
        let t;
        try {
          if (P(this, ze, "f").params.max_iterations && P(this, mi, "f") >= P(this, ze, "f").params.max_iterations) break;
          j(this, Sr, !1, "f"), j(this, Bn, void 0, "f"), j(this, mi, (e = P(this, mi, "f"), e++, e), "f"), j(this, Pt, void 0, "f");
          const { max_iterations: n, compactionControl: r, ...o } = P(this, ze, "f").params;
          if (o.stream ? (t = this.client.beta.messages.stream({ ...o }, P(this, Tt, "f")), j(this, Pt, t.finalMessage(), "f"), P(this, Pt, "f").catch(() => {
          }), yield t) : (j(this, Pt, this.client.beta.messages.create({
            ...o,
            stream: !1
          }, P(this, Tt, "f")), "f"), yield P(this, Pt, "f")), !await P(this, pi, "m", Hp).call(this)) {
            if (!P(this, Sr, "f")) {
              const { role: s, content: a } = await P(this, Pt, "f");
              P(this, ze, "f").params.messages.push({
                role: s,
                content: a
              });
            }
            const i = await P(this, pi, "m", jc).call(this, P(this, ze, "f").params.messages.at(-1));
            if (i) P(this, ze, "f").params.messages.push(i);
            else if (!P(this, Sr, "f")) break;
          }
        } finally {
          t && t.abort();
        }
      }
      if (!P(this, Pt, "f")) throw new me("ToolRunner concluded without a message from the server");
      P(this, Qn, "f").resolve(await P(this, Pt, "f"));
    } catch (t) {
      throw j(this, lo, !1, "f"), P(this, Qn, "f").promise.catch(() => {
      }), P(this, Qn, "f").reject(t), j(this, Qn, qp(), "f"), t;
    }
  }
  setMessagesParams(e) {
    typeof e == "function" ? P(this, ze, "f").params = e(P(this, ze, "f").params) : P(this, ze, "f").params = e, j(this, Sr, !0, "f"), j(this, Bn, void 0, "f");
  }
  setRequestOptions(e) {
    typeof e == "function" ? j(this, Tt, e(P(this, Tt, "f")), "f") : j(this, Tt, {
      ...P(this, Tt, "f"),
      ...e
    }, "f");
  }
  async generateToolResponse(e = P(this, Tt, "f").signal) {
    const t = await P(this, Pt, "f") ?? this.params.messages.at(-1);
    return t ? P(this, pi, "m", jc).call(this, t, e) : null;
  }
  done() {
    return P(this, Qn, "f").promise;
  }
  async runUntilDone() {
    if (!P(this, lo, "f")) for await (const e of this) ;
    return this.done();
  }
  get params() {
    return P(this, ze, "f").params;
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
jc = async function(t, n = P(this, Tt, "f").signal) {
  return P(this, Bn, "f") !== void 0 ? P(this, Bn, "f") : (j(this, Bn, JI(P(this, ze, "f").params, t, {
    ...P(this, Tt, "f"),
    signal: n
  }), "f"), P(this, Bn, "f"));
};
async function JI(e, t = e.messages.at(-1), n) {
  if (!t || t.role !== "assistant" || !t.content || typeof t.content == "string") return null;
  const r = t.content.filter((o) => o.type === "tool_use");
  return r.length === 0 ? null : {
    role: "user",
    content: await Promise.all(r.map(async (o) => {
      const i = e.tools.find((s) => ("name" in s ? s.name : s.mcp_server_name) === o.name);
      if (!i || !("run" in i)) return {
        type: "tool_result",
        tool_use_id: o.id,
        content: `Error: Tool '${o.name}' not found`,
        is_error: !0
      };
      try {
        let s = o.input;
        "parse" in i && i.parse && (s = i.parse(s));
        const a = await i.run(s, {
          toolUseBlock: o,
          signal: n?.signal
        });
        return {
          type: "tool_result",
          tool_use_id: o.id,
          content: a
        };
      } catch (s) {
        return {
          type: "tool_result",
          tool_use_id: o.id,
          content: s instanceof ew ? s.content : `Error: ${s instanceof Error ? s.message : String(s)}`,
          is_error: !0
        };
      }
    }))
  };
}
var nw = class rw {
  constructor(t, n) {
    this.iterator = t, this.controller = n;
  }
  async *decoder() {
    const t = new Us();
    for await (const n of this.iterator) for (const r of t.decode(n)) yield JSON.parse(r);
    for (const n of t.flush()) yield JSON.parse(n);
  }
  [Symbol.asyncIterator]() {
    return this.decoder();
  }
  static fromResponse(t, n) {
    if (!t.body)
      throw n.abort(), typeof globalThis.navigator < "u" && globalThis.navigator.product === "ReactNative" ? new me("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api") : new me("Attempted to iterate over a response with no body");
    return new rw(Id(t.body), n);
  }
}, ow = class extends Ze {
  create(e, t) {
    const { betas: n, ...r } = e;
    return this._client.post("/v1/messages/batches?beta=true", {
      body: r,
      ...t,
      headers: Q([{ "anthropic-beta": [...n ?? [], "message-batches-2024-09-24"].toString() }, t?.headers])
    });
  }
  retrieve(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.get(de`/v1/messages/batches/${e}?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "message-batches-2024-09-24"].toString() }, n?.headers])
    });
  }
  list(e = {}, t) {
    const { betas: n, ...r } = e ?? {};
    return this._client.getAPIList("/v1/messages/batches?beta=true", $s, {
      query: r,
      ...t,
      headers: Q([{ "anthropic-beta": [...n ?? [], "message-batches-2024-09-24"].toString() }, t?.headers])
    });
  }
  delete(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.delete(de`/v1/messages/batches/${e}?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "message-batches-2024-09-24"].toString() }, n?.headers])
    });
  }
  cancel(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.post(de`/v1/messages/batches/${e}/cancel?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "message-batches-2024-09-24"].toString() }, n?.headers])
    });
  }
  async results(e, t = {}, n) {
    const r = await this.retrieve(e);
    if (!r.results_url) throw new me(`No batch \`results_url\`; Has it finished processing? ${r.processing_status} - ${r.id}`);
    const { betas: o } = t ?? {};
    return this._client.get(r.results_url, {
      ...n,
      headers: Q([{
        "anthropic-beta": [...o ?? [], "message-batches-2024-09-24"].toString(),
        Accept: "application/binary"
      }, n?.headers]),
      stream: !0,
      __binaryResponse: !0
    })._thenUnwrap((i, s) => nw.fromResponse(s.response, s.controller));
  }
}, Kp = {
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
}, WI = ["claude-opus-4-6"], Fs = class extends Ze {
  constructor() {
    super(...arguments), this.batches = new ow(this._client);
  }
  create(e, t) {
    const n = Jp(e), { betas: r, ...o } = n;
    o.model in Kp && console.warn(`The model '${o.model}' is deprecated and will reach end-of-life on ${Kp[o.model]}
Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`), o.model in WI && o.thinking && o.thinking.type === "enabled" && console.warn(`Using Claude with ${o.model} and 'thinking.type=enabled' is deprecated. Use 'thinking.type=adaptive' instead which results in better model performance in our testing: https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking`);
    let i = this._client._options.timeout;
    if (!o.stream && i == null) {
      const a = X_[o.model] ?? void 0;
      i = this._client.calculateNonstreamingTimeout(o.max_tokens, a);
    }
    const s = J_(o.tools, o.messages);
    return this._client.post("/v1/messages?beta=true", {
      body: o,
      timeout: i ?? 6e5,
      ...t,
      headers: Q([
        { ...r?.toString() != null ? { "anthropic-beta": r?.toString() } : void 0 },
        s,
        t?.headers
      ]),
      stream: n.stream ?? !1
    });
  }
  parse(e, t) {
    return t = {
      ...t,
      headers: Q([{ "anthropic-beta": [...e.betas ?? [], "structured-outputs-2025-12-15"].toString() }, t?.headers])
    }, this.create(e, t).then((n) => Z_(n, e, { logger: this._client.logger ?? console }));
  }
  stream(e, t) {
    return qI.createMessage(this, e, t);
  }
  countTokens(e, t) {
    const { betas: n, ...r } = Jp(e);
    return this._client.post("/v1/messages/count_tokens?beta=true", {
      body: r,
      ...t,
      headers: Q([{ "anthropic-beta": [...n ?? [], "token-counting-2024-11-01"].toString() }, t?.headers])
    });
  }
  toolRunner(e, t) {
    return new tw(this._client, e, t);
  }
};
function Jp(e) {
  if (!e.output_format) return e;
  if (e.output_config?.format) throw new me("Both output_format and output_config.format were provided. Please use only output_config.format (output_format is deprecated).");
  const { output_format: t, ...n } = e;
  return {
    ...n,
    output_config: {
      ...e.output_config,
      format: t
    }
  };
}
Fs.Batches = ow;
Fs.BetaToolRunner = tw;
Fs.ToolError = ew;
var iw = class extends Ze {
  list(e, t = {}, n) {
    const { betas: r, ...o } = t ?? {};
    return this._client.getAPIList(de`/v1/sessions/${e}/events?beta=true`, Cn, {
      query: o,
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  send(e, t, n) {
    const { betas: r, ...o } = t;
    return this._client.post(de`/v1/sessions/${e}/events?beta=true`, {
      body: o,
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  stream(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.get(de`/v1/sessions/${e}/events/stream?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers]),
      stream: !0
    });
  }
}, sw = class extends Ze {
  retrieve(e, t, n) {
    const { session_id: r, betas: o } = t;
    return this._client.get(de`/v1/sessions/${r}/resources/${e}?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  update(e, t, n) {
    const { session_id: r, betas: o, ...i } = t;
    return this._client.post(de`/v1/sessions/${r}/resources/${e}?beta=true`, {
      body: i,
      ...n,
      headers: Q([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  list(e, t = {}, n) {
    const { betas: r, ...o } = t ?? {};
    return this._client.getAPIList(de`/v1/sessions/${e}/resources?beta=true`, Cn, {
      query: o,
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  delete(e, t, n) {
    const { session_id: r, betas: o } = t;
    return this._client.delete(de`/v1/sessions/${r}/resources/${e}?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  add(e, t, n) {
    const { betas: r, ...o } = t;
    return this._client.post(de`/v1/sessions/${e}/resources?beta=true`, {
      body: o,
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
}, iu = class extends Ze {
  constructor() {
    super(...arguments), this.events = new iw(this._client), this.resources = new sw(this._client);
  }
  create(e, t) {
    const { betas: n, ...r } = e;
    return this._client.post("/v1/sessions?beta=true", {
      body: r,
      ...t,
      headers: Q([{ "anthropic-beta": [...n ?? [], "managed-agents-2026-04-01"].toString() }, t?.headers])
    });
  }
  retrieve(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.get(de`/v1/sessions/${e}?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  update(e, t, n) {
    const { betas: r, ...o } = t;
    return this._client.post(de`/v1/sessions/${e}?beta=true`, {
      body: o,
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  list(e = {}, t) {
    const { betas: n, ...r } = e ?? {};
    return this._client.getAPIList("/v1/sessions?beta=true", Cn, {
      query: r,
      ...t,
      headers: Q([{ "anthropic-beta": [...n ?? [], "managed-agents-2026-04-01"].toString() }, t?.headers])
    });
  }
  delete(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.delete(de`/v1/sessions/${e}?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  archive(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.post(de`/v1/sessions/${e}/archive?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
};
iu.Events = iw;
iu.Resources = sw;
var aw = class extends Ze {
  create(e, t = {}, n) {
    const { betas: r, ...o } = t ?? {};
    return this._client.post(de`/v1/skills/${e}/versions?beta=true`, Pd({
      body: o,
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "skills-2025-10-02"].toString() }, n?.headers])
    }, this._client));
  }
  retrieve(e, t, n) {
    const { skill_id: r, betas: o } = t;
    return this._client.get(de`/v1/skills/${r}/versions/${e}?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...o ?? [], "skills-2025-10-02"].toString() }, n?.headers])
    });
  }
  list(e, t = {}, n) {
    const { betas: r, ...o } = t ?? {};
    return this._client.getAPIList(de`/v1/skills/${e}/versions?beta=true`, Cn, {
      query: o,
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "skills-2025-10-02"].toString() }, n?.headers])
    });
  }
  delete(e, t, n) {
    const { skill_id: r, betas: o } = t;
    return this._client.delete(de`/v1/skills/${r}/versions/${e}?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...o ?? [], "skills-2025-10-02"].toString() }, n?.headers])
    });
  }
}, Md = class extends Ze {
  constructor() {
    super(...arguments), this.versions = new aw(this._client);
  }
  create(e = {}, t) {
    const { betas: n, ...r } = e ?? {};
    return this._client.post("/v1/skills?beta=true", Pd({
      body: r,
      ...t,
      headers: Q([{ "anthropic-beta": [...n ?? [], "skills-2025-10-02"].toString() }, t?.headers])
    }, this._client, !1));
  }
  retrieve(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.get(de`/v1/skills/${e}?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "skills-2025-10-02"].toString() }, n?.headers])
    });
  }
  list(e = {}, t) {
    const { betas: n, ...r } = e ?? {};
    return this._client.getAPIList("/v1/skills?beta=true", Cn, {
      query: r,
      ...t,
      headers: Q([{ "anthropic-beta": [...n ?? [], "skills-2025-10-02"].toString() }, t?.headers])
    });
  }
  delete(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.delete(de`/v1/skills/${e}?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "skills-2025-10-02"].toString() }, n?.headers])
    });
  }
};
Md.Versions = aw;
var lw = class extends Ze {
  create(e, t, n) {
    const { betas: r, ...o } = t;
    return this._client.post(de`/v1/vaults/${e}/credentials?beta=true`, {
      body: o,
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  retrieve(e, t, n) {
    const { vault_id: r, betas: o } = t;
    return this._client.get(de`/v1/vaults/${r}/credentials/${e}?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  update(e, t, n) {
    const { vault_id: r, betas: o, ...i } = t;
    return this._client.post(de`/v1/vaults/${r}/credentials/${e}?beta=true`, {
      body: i,
      ...n,
      headers: Q([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  list(e, t = {}, n) {
    const { betas: r, ...o } = t ?? {};
    return this._client.getAPIList(de`/v1/vaults/${e}/credentials?beta=true`, Cn, {
      query: o,
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  delete(e, t, n) {
    const { vault_id: r, betas: o } = t;
    return this._client.delete(de`/v1/vaults/${r}/credentials/${e}?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  archive(e, t, n) {
    const { vault_id: r, betas: o } = t;
    return this._client.post(de`/v1/vaults/${r}/credentials/${e}/archive?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...o ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
}, Nd = class extends Ze {
  constructor() {
    super(...arguments), this.credentials = new lw(this._client);
  }
  create(e, t) {
    const { betas: n, ...r } = e;
    return this._client.post("/v1/vaults?beta=true", {
      body: r,
      ...t,
      headers: Q([{ "anthropic-beta": [...n ?? [], "managed-agents-2026-04-01"].toString() }, t?.headers])
    });
  }
  retrieve(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.get(de`/v1/vaults/${e}?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  update(e, t, n) {
    const { betas: r, ...o } = t;
    return this._client.post(de`/v1/vaults/${e}?beta=true`, {
      body: o,
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  list(e = {}, t) {
    const { betas: n, ...r } = e ?? {};
    return this._client.getAPIList("/v1/vaults?beta=true", Cn, {
      query: r,
      ...t,
      headers: Q([{ "anthropic-beta": [...n ?? [], "managed-agents-2026-04-01"].toString() }, t?.headers])
    });
  }
  delete(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.delete(de`/v1/vaults/${e}?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
  archive(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.post(de`/v1/vaults/${e}/archive?beta=true`, {
      ...n,
      headers: Q([{ "anthropic-beta": [...r ?? [], "managed-agents-2026-04-01"].toString() }, n?.headers])
    });
  }
};
Nd.Credentials = lw;
var bn = class extends Ze {
  constructor() {
    super(...arguments), this.models = new Y_(this._client), this.messages = new Fs(this._client), this.agents = new xd(this._client), this.environments = new q_(this._client), this.sessions = new iu(this._client), this.vaults = new Nd(this._client), this.files = new W_(this._client), this.skills = new Md(this._client);
  }
};
bn.Models = Y_;
bn.Messages = Fs;
bn.Agents = xd;
bn.Environments = q_;
bn.Sessions = iu;
bn.Vaults = Nd;
bn.Files = W_;
bn.Skills = Md;
var uw = class extends Ze {
  create(e, t) {
    const { betas: n, ...r } = e;
    return this._client.post("/v1/complete", {
      body: r,
      timeout: this._client._options.timeout ?? 6e5,
      ...t,
      headers: Q([{ ...n?.toString() != null ? { "anthropic-beta": n?.toString() } : void 0 }, t?.headers]),
      stream: e.stream ?? !1
    });
  }
};
function cw(e) {
  return e?.output_config?.format;
}
function Wp(e, t, n) {
  const r = cw(t);
  return !t || !("parse" in (r ?? {})) ? {
    ...e,
    content: e.content.map((o) => o.type === "text" ? Object.defineProperty({ ...o }, "parsed_output", {
      value: null,
      enumerable: !1
    }) : o),
    parsed_output: null
  } : fw(e, t, n);
}
function fw(e, t, n) {
  let r = null;
  const o = e.content.map((i) => {
    if (i.type === "text") {
      const s = YI(t, i.text);
      return r === null && (r = s), Object.defineProperty({ ...i }, "parsed_output", {
        value: s,
        enumerable: !1
      });
    }
    return i;
  });
  return {
    ...e,
    content: o,
    parsed_output: r
  };
}
function YI(e, t) {
  const n = cw(e);
  if (n?.type !== "json_schema") return null;
  try {
    return "parse" in n ? n.parse(t) : JSON.parse(t);
  } catch (r) {
    throw new me(`Failed to parse structured output: ${r}`);
  }
}
var Gt, Zn, uo, gi, da, yi, vi, ha, _i, Nn, wi, pa, ma, Ar, ga, ya, Ei, Xu, Yp, Qu, Zu, ju, ec, zp, Xp = "__json_buf";
function Qp(e) {
  return e.type === "tool_use" || e.type === "server_tool_use";
}
var zI = class ef {
  constructor(t, n) {
    Gt.add(this), this.messages = [], this.receivedMessages = [], Zn.set(this, void 0), uo.set(this, null), this.controller = new AbortController(), gi.set(this, void 0), da.set(this, () => {
    }), yi.set(this, () => {
    }), vi.set(this, void 0), ha.set(this, () => {
    }), _i.set(this, () => {
    }), Nn.set(this, {}), wi.set(this, !1), pa.set(this, !1), ma.set(this, !1), Ar.set(this, !1), ga.set(this, void 0), ya.set(this, void 0), Ei.set(this, void 0), Qu.set(this, (r) => {
      if (j(this, pa, !0, "f"), Ts(r) && (r = new jt()), r instanceof jt)
        return j(this, ma, !0, "f"), this._emit("abort", r);
      if (r instanceof me) return this._emit("error", r);
      if (r instanceof Error) {
        const o = new me(r.message);
        return o.cause = r, this._emit("error", o);
      }
      return this._emit("error", new me(String(r)));
    }), j(this, gi, new Promise((r, o) => {
      j(this, da, r, "f"), j(this, yi, o, "f");
    }), "f"), j(this, vi, new Promise((r, o) => {
      j(this, ha, r, "f"), j(this, _i, o, "f");
    }), "f"), P(this, gi, "f").catch(() => {
    }), P(this, vi, "f").catch(() => {
    }), j(this, uo, t, "f"), j(this, Ei, n?.logger ?? console, "f");
  }
  get response() {
    return P(this, ga, "f");
  }
  get request_id() {
    return P(this, ya, "f");
  }
  async withResponse() {
    j(this, Ar, !0, "f");
    const t = await P(this, gi, "f");
    if (!t) throw new Error("Could not resolve a `Response` object");
    return {
      data: this,
      response: t,
      request_id: t.headers.get("request-id")
    };
  }
  static fromReadableStream(t) {
    const n = new ef(null);
    return n._run(() => n._fromReadableStream(t)), n;
  }
  static createMessage(t, n, r, { logger: o } = {}) {
    const i = new ef(n, { logger: o });
    for (const s of n.messages) i._addMessageParam(s);
    return j(i, uo, {
      ...n,
      stream: !0
    }, "f"), i._run(() => i._createMessage(t, {
      ...n,
      stream: !0
    }, {
      ...r,
      headers: {
        ...r?.headers,
        "X-Stainless-Helper-Method": "stream"
      }
    })), i;
  }
  _run(t) {
    t().then(() => {
      this._emitFinal(), this._emit("end");
    }, P(this, Qu, "f"));
  }
  _addMessageParam(t) {
    this.messages.push(t);
  }
  _addMessage(t, n = !0) {
    this.receivedMessages.push(t), n && this._emit("message", t);
  }
  async _createMessage(t, n, r) {
    const o = r?.signal;
    let i;
    o && (o.aborted && this.controller.abort(), i = this.controller.abort.bind(this.controller), o.addEventListener("abort", i));
    try {
      P(this, Gt, "m", Zu).call(this);
      const { response: s, data: a } = await t.create({
        ...n,
        stream: !0
      }, {
        ...r,
        signal: this.controller.signal
      }).withResponse();
      this._connected(s);
      for await (const u of a) P(this, Gt, "m", ju).call(this, u);
      if (a.controller.signal?.aborted) throw new jt();
      P(this, Gt, "m", ec).call(this);
    } finally {
      o && i && o.removeEventListener("abort", i);
    }
  }
  _connected(t) {
    this.ended || (j(this, ga, t, "f"), j(this, ya, t?.headers.get("request-id"), "f"), P(this, da, "f").call(this, t), this._emit("connect"));
  }
  get ended() {
    return P(this, wi, "f");
  }
  get errored() {
    return P(this, pa, "f");
  }
  get aborted() {
    return P(this, ma, "f");
  }
  abort() {
    this.controller.abort();
  }
  on(t, n) {
    return (P(this, Nn, "f")[t] || (P(this, Nn, "f")[t] = [])).push({ listener: n }), this;
  }
  off(t, n) {
    const r = P(this, Nn, "f")[t];
    if (!r) return this;
    const o = r.findIndex((i) => i.listener === n);
    return o >= 0 && r.splice(o, 1), this;
  }
  once(t, n) {
    return (P(this, Nn, "f")[t] || (P(this, Nn, "f")[t] = [])).push({
      listener: n,
      once: !0
    }), this;
  }
  emitted(t) {
    return new Promise((n, r) => {
      j(this, Ar, !0, "f"), t !== "error" && this.once("error", r), this.once(t, n);
    });
  }
  async done() {
    j(this, Ar, !0, "f"), await P(this, vi, "f");
  }
  get currentMessage() {
    return P(this, Zn, "f");
  }
  async finalMessage() {
    return await this.done(), P(this, Gt, "m", Xu).call(this);
  }
  async finalText() {
    return await this.done(), P(this, Gt, "m", Yp).call(this);
  }
  _emit(t, ...n) {
    if (P(this, wi, "f")) return;
    t === "end" && (j(this, wi, !0, "f"), P(this, ha, "f").call(this));
    const r = P(this, Nn, "f")[t];
    if (r && (P(this, Nn, "f")[t] = r.filter((o) => !o.once), r.forEach(({ listener: o }) => o(...n))), t === "abort") {
      const o = n[0];
      !P(this, Ar, "f") && !r?.length && Promise.reject(o), P(this, yi, "f").call(this, o), P(this, _i, "f").call(this, o), this._emit("end");
      return;
    }
    if (t === "error") {
      const o = n[0];
      !P(this, Ar, "f") && !r?.length && Promise.reject(o), P(this, yi, "f").call(this, o), P(this, _i, "f").call(this, o), this._emit("end");
    }
  }
  _emitFinal() {
    this.receivedMessages.at(-1) && this._emit("finalMessage", P(this, Gt, "m", Xu).call(this));
  }
  async _fromReadableStream(t, n) {
    const r = n?.signal;
    let o;
    r && (r.aborted && this.controller.abort(), o = this.controller.abort.bind(this.controller), r.addEventListener("abort", o));
    try {
      P(this, Gt, "m", Zu).call(this), this._connected(null);
      const i = Ss.fromReadableStream(t, this.controller);
      for await (const s of i) P(this, Gt, "m", ju).call(this, s);
      if (i.controller.signal?.aborted) throw new jt();
      P(this, Gt, "m", ec).call(this);
    } finally {
      r && o && r.removeEventListener("abort", o);
    }
  }
  [(Zn = /* @__PURE__ */ new WeakMap(), uo = /* @__PURE__ */ new WeakMap(), gi = /* @__PURE__ */ new WeakMap(), da = /* @__PURE__ */ new WeakMap(), yi = /* @__PURE__ */ new WeakMap(), vi = /* @__PURE__ */ new WeakMap(), ha = /* @__PURE__ */ new WeakMap(), _i = /* @__PURE__ */ new WeakMap(), Nn = /* @__PURE__ */ new WeakMap(), wi = /* @__PURE__ */ new WeakMap(), pa = /* @__PURE__ */ new WeakMap(), ma = /* @__PURE__ */ new WeakMap(), Ar = /* @__PURE__ */ new WeakMap(), ga = /* @__PURE__ */ new WeakMap(), ya = /* @__PURE__ */ new WeakMap(), Ei = /* @__PURE__ */ new WeakMap(), Qu = /* @__PURE__ */ new WeakMap(), Gt = /* @__PURE__ */ new WeakSet(), Xu = function() {
    if (this.receivedMessages.length === 0) throw new me("stream ended without producing a Message with role=assistant");
    return this.receivedMessages.at(-1);
  }, Yp = function() {
    if (this.receivedMessages.length === 0) throw new me("stream ended without producing a Message with role=assistant");
    const n = this.receivedMessages.at(-1).content.filter((r) => r.type === "text").map((r) => r.text);
    if (n.length === 0) throw new me("stream ended without producing a content block with type=text");
    return n.join(" ");
  }, Zu = function() {
    this.ended || j(this, Zn, void 0, "f");
  }, ju = function(n) {
    if (this.ended) return;
    const r = P(this, Gt, "m", zp).call(this, n);
    switch (this._emit("streamEvent", n, r), n.type) {
      case "content_block_delta": {
        const o = r.content.at(-1);
        switch (n.delta.type) {
          case "text_delta":
            o.type === "text" && this._emit("text", n.delta.text, o.text || "");
            break;
          case "citations_delta":
            o.type === "text" && this._emit("citation", n.delta.citation, o.citations ?? []);
            break;
          case "input_json_delta":
            Qp(o) && o.input && this._emit("inputJson", n.delta.partial_json, o.input);
            break;
          case "thinking_delta":
            o.type === "thinking" && this._emit("thinking", n.delta.thinking, o.thinking);
            break;
          case "signature_delta":
            o.type === "thinking" && this._emit("signature", o.signature);
            break;
          default:
            n.delta;
        }
        break;
      }
      case "message_stop":
        this._addMessageParam(r), this._addMessage(Wp(r, P(this, uo, "f"), { logger: P(this, Ei, "f") }), !0);
        break;
      case "content_block_stop":
        this._emit("contentBlock", r.content.at(-1));
        break;
      case "message_start":
        j(this, Zn, r, "f");
        break;
      case "content_block_start":
      case "message_delta":
        break;
    }
  }, ec = function() {
    if (this.ended) throw new me("stream has ended, this shouldn't happen");
    const n = P(this, Zn, "f");
    if (!n) throw new me("request ended without sending any chunks");
    return j(this, Zn, void 0, "f"), Wp(n, P(this, uo, "f"), { logger: P(this, Ei, "f") });
  }, zp = function(n) {
    let r = P(this, Zn, "f");
    if (n.type === "message_start") {
      if (r) throw new me(`Unexpected event order, got ${n.type} before receiving "message_stop"`);
      return n.message;
    }
    if (!r) throw new me(`Unexpected event order, got ${n.type} before "message_start"`);
    switch (n.type) {
      case "message_stop":
        return r;
      case "message_delta":
        return r.stop_reason = n.delta.stop_reason, r.stop_sequence = n.delta.stop_sequence, r.usage.output_tokens = n.usage.output_tokens, n.usage.input_tokens != null && (r.usage.input_tokens = n.usage.input_tokens), n.usage.cache_creation_input_tokens != null && (r.usage.cache_creation_input_tokens = n.usage.cache_creation_input_tokens), n.usage.cache_read_input_tokens != null && (r.usage.cache_read_input_tokens = n.usage.cache_read_input_tokens), n.usage.server_tool_use != null && (r.usage.server_tool_use = n.usage.server_tool_use), r;
      case "content_block_start":
        return r.content.push({ ...n.content_block }), r;
      case "content_block_delta": {
        const o = r.content.at(n.index);
        switch (n.delta.type) {
          case "text_delta":
            o?.type === "text" && (r.content[n.index] = {
              ...o,
              text: (o.text || "") + n.delta.text
            });
            break;
          case "citations_delta":
            o?.type === "text" && (r.content[n.index] = {
              ...o,
              citations: [...o.citations ?? [], n.delta.citation]
            });
            break;
          case "input_json_delta":
            if (o && Qp(o)) {
              let i = o[Xp] || "";
              i += n.delta.partial_json;
              const s = { ...o };
              Object.defineProperty(s, Xp, {
                value: i,
                enumerable: !1,
                writable: !0
              }), i && (s.input = j_(i)), r.content[n.index] = s;
            }
            break;
          case "thinking_delta":
            o?.type === "thinking" && (r.content[n.index] = {
              ...o,
              thinking: o.thinking + n.delta.thinking
            });
            break;
          case "signature_delta":
            o?.type === "thinking" && (r.content[n.index] = {
              ...o,
              signature: n.delta.signature
            });
            break;
          default:
            n.delta;
        }
        return r;
      }
      case "content_block_stop":
        return r;
    }
  }, Symbol.asyncIterator)]() {
    const t = [], n = [];
    let r = !1;
    return this.on("streamEvent", (o) => {
      const i = n.shift();
      i ? i.resolve(o) : t.push(o);
    }), this.on("end", () => {
      r = !0;
      for (const o of n) o.resolve(void 0);
      n.length = 0;
    }), this.on("abort", (o) => {
      r = !0;
      for (const i of n) i.reject(o);
      n.length = 0;
    }), this.on("error", (o) => {
      r = !0;
      for (const i of n) i.reject(o);
      n.length = 0;
    }), {
      next: async () => t.length ? {
        value: t.shift(),
        done: !1
      } : r ? {
        value: void 0,
        done: !0
      } : new Promise((o, i) => n.push({
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
  toReadableStream() {
    return new Ss(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
  }
};
var dw = class extends Ze {
  create(e, t) {
    return this._client.post("/v1/messages/batches", {
      body: e,
      ...t
    });
  }
  retrieve(e, t) {
    return this._client.get(de`/v1/messages/batches/${e}`, t);
  }
  list(e = {}, t) {
    return this._client.getAPIList("/v1/messages/batches", $s, {
      query: e,
      ...t
    });
  }
  delete(e, t) {
    return this._client.delete(de`/v1/messages/batches/${e}`, t);
  }
  cancel(e, t) {
    return this._client.post(de`/v1/messages/batches/${e}/cancel`, t);
  }
  async results(e, t) {
    const n = await this.retrieve(e);
    if (!n.results_url) throw new me(`No batch \`results_url\`; Has it finished processing? ${n.processing_status} - ${n.id}`);
    return this._client.get(n.results_url, {
      ...t,
      headers: Q([{ Accept: "application/binary" }, t?.headers]),
      stream: !0,
      __binaryResponse: !0
    })._thenUnwrap((r, o) => nw.fromResponse(o.response, o.controller));
  }
}, kd = class extends Ze {
  constructor() {
    super(...arguments), this.batches = new dw(this._client);
  }
  create(e, t) {
    e.model in Zp && console.warn(`The model '${e.model}' is deprecated and will reach end-of-life on ${Zp[e.model]}
Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`), e.model in XI && e.thinking && e.thinking.type === "enabled" && console.warn(`Using Claude with ${e.model} and 'thinking.type=enabled' is deprecated. Use 'thinking.type=adaptive' instead which results in better model performance in our testing: https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking`);
    let n = this._client._options.timeout;
    if (!e.stream && n == null) {
      const o = X_[e.model] ?? void 0;
      n = this._client.calculateNonstreamingTimeout(e.max_tokens, o);
    }
    const r = J_(e.tools, e.messages);
    return this._client.post("/v1/messages", {
      body: e,
      timeout: n ?? 6e5,
      ...t,
      headers: Q([r, t?.headers]),
      stream: e.stream ?? !1
    });
  }
  parse(e, t) {
    return this.create(e, t).then((n) => fw(n, e, { logger: this._client.logger ?? console }));
  }
  stream(e, t) {
    return zI.createMessage(this, e, t, { logger: this._client.logger ?? console });
  }
  countTokens(e, t) {
    return this._client.post("/v1/messages/count_tokens", {
      body: e,
      ...t
    });
  }
}, Zp = {
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
}, XI = ["claude-opus-4-6"];
kd.Batches = dw;
var hw = class extends Ze {
  retrieve(e, t = {}, n) {
    const { betas: r } = t ?? {};
    return this._client.get(de`/v1/models/${e}`, {
      ...n,
      headers: Q([{ ...r?.toString() != null ? { "anthropic-beta": r?.toString() } : void 0 }, n?.headers])
    });
  }
  list(e = {}, t) {
    const { betas: n, ...r } = e ?? {};
    return this._client.getAPIList("/v1/models", $s, {
      query: r,
      ...t,
      headers: Q([{ ...n?.toString() != null ? { "anthropic-beta": n?.toString() } : void 0 }, t?.headers])
    });
  }
}, va = (e) => {
  if (typeof globalThis.process < "u") return globalThis.process.env?.[e]?.trim() || void 0;
  if (typeof globalThis.Deno < "u") return globalThis.Deno.env?.get?.(e)?.trim() || void 0;
}, tf, Dd, Va, pw, QI = "\\n\\nHuman:", ZI = "\\n\\nAssistant:", Ke = class {
  constructor({ baseURL: e = va("ANTHROPIC_BASE_URL"), apiKey: t = va("ANTHROPIC_API_KEY") ?? null, authToken: n = va("ANTHROPIC_AUTH_TOKEN") ?? null, ...r } = {}) {
    tf.add(this), Va.set(this, void 0);
    const o = {
      apiKey: t,
      authToken: n,
      ...r,
      baseURL: e || "https://api.anthropic.com"
    };
    if (!o.dangerouslyAllowBrowser && dI()) throw new me(`It looks like you're running in a browser-like environment.

This is disabled by default, as it risks exposing your secret API credentials to attackers.
If you understand the risks and have appropriate mitigations in place,
you can set the \`dangerouslyAllowBrowser\` option to \`true\`, e.g.,

new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
`);
    this.baseURL = o.baseURL, this.timeout = o.timeout ?? Dd.DEFAULT_TIMEOUT, this.logger = o.logger ?? console;
    const i = "warn";
    this.logLevel = i, this.logLevel = Dp(o.logLevel, "ClientOptions.logLevel", this) ?? Dp(va("ANTHROPIC_LOG"), "process.env['ANTHROPIC_LOG']", this) ?? i, this.fetchOptions = o.fetchOptions, this.maxRetries = o.maxRetries ?? 2, this.fetch = o.fetch ?? yI(), j(this, Va, _I, "f"), this._options = o, this.apiKey = typeof t == "string" ? t : null, this.authToken = n;
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
    return Q([await this.apiKeyAuth(e), await this.bearerAuth(e)]);
  }
  async apiKeyAuth(e) {
    if (this.apiKey != null)
      return Q([{ "X-Api-Key": this.apiKey }]);
  }
  async bearerAuth(e) {
    if (this.authToken != null)
      return Q([{ Authorization: `Bearer ${this.authToken}` }]);
  }
  stringifyQuery(e) {
    return wI(e);
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${go}`;
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${E_()}`;
  }
  makeStatusError(e, t, n, r) {
    return Ot.generate(e, t, n, r);
  }
  buildURL(e, t, n) {
    const r = !P(this, tf, "m", pw).call(this) && n || this.baseURL, o = lI(e) ? new URL(e) : new URL(r + (r.endsWith("/") && e.startsWith("/") ? e.slice(1) : e)), i = this.defaultQuery(), s = Object.fromEntries(o.searchParams);
    return (!Ip(i) || !Ip(s)) && (t = {
      ...s,
      ...i,
      ...t
    }), typeof t == "object" && t && !Array.isArray(t) && (o.search = this.stringifyQuery(t)), o.toString();
  }
  _calculateNonstreamingTimeout(e) {
    if (3600 * e / 128e3 > 600) throw new me("Streaming is required for operations that may take longer than 10 minutes. See https://github.com/anthropics/anthropic-sdk-typescript#streaming-responses for more details");
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
    return this.request(Promise.resolve(n).then((r) => ({
      method: e,
      path: t,
      ...r
    })));
  }
  request(e, t = null) {
    return new U_(this, this.makeRequest(e, t, void 0));
  }
  async makeRequest(e, t, n) {
    const r = await e, o = r.maxRetries ?? this.maxRetries;
    t == null && (t = o), await this.prepareOptions(r);
    const { req: i, url: s, timeout: a } = await this.buildRequest(r, { retryCount: o - t });
    await this.prepareRequest(i, {
      url: s,
      options: r
    });
    const u = "log_" + (Math.random() * (1 << 24) | 0).toString(16).padStart(6, "0"), f = n === void 0 ? "" : `, retryOf: ${n}`, d = Date.now();
    if (gt(this).debug(`[${u}] sending request`, Ir({
      retryOfRequestLogID: n,
      method: r.method,
      url: s,
      options: r,
      headers: i.headers
    })), r.signal?.aborted) throw new jt();
    const h = new AbortController(), p = await this.fetchWithTimeout(s, i, a, h).catch(Jc), m = Date.now();
    if (p instanceof globalThis.Error) {
      const y = `retrying, ${t} attempts remaining`;
      if (r.signal?.aborted) throw new jt();
      const v = Ts(p) || /timed? ?out/i.test(String(p) + ("cause" in p ? String(p.cause) : ""));
      if (t)
        return gt(this).info(`[${u}] connection ${v ? "timed out" : "failed"} - ${y}`), gt(this).debug(`[${u}] connection ${v ? "timed out" : "failed"} (${y})`, Ir({
          retryOfRequestLogID: n,
          url: s,
          durationMs: m - d,
          message: p.message
        })), this.retryRequest(r, t, n ?? u);
      throw gt(this).info(`[${u}] connection ${v ? "timed out" : "failed"} - error; no more retries left`), gt(this).debug(`[${u}] connection ${v ? "timed out" : "failed"} (error; no more retries left)`, Ir({
        retryOfRequestLogID: n,
        url: s,
        durationMs: m - d,
        message: p.message
      })), v ? new T_() : new ou({ cause: p });
    }
    const g = `[${u}${f}${[...p.headers.entries()].filter(([y]) => y === "request-id").map(([y, v]) => ", " + y + ": " + JSON.stringify(v)).join("")}] ${i.method} ${s} ${p.ok ? "succeeded" : "failed"} with status ${p.status} in ${m - d}ms`;
    if (!p.ok) {
      const y = await this.shouldRetry(p);
      if (t && y) {
        const T = `retrying, ${t} attempts remaining`;
        return await vI(p.body), gt(this).info(`${g} - ${T}`), gt(this).debug(`[${u}] response error (${T})`, Ir({
          retryOfRequestLogID: n,
          url: p.url,
          status: p.status,
          headers: p.headers,
          durationMs: m - d
        })), this.retryRequest(r, t, n ?? u, p.headers);
      }
      const v = y ? "error; no more retries left" : "error; not retryable";
      gt(this).info(`${g} - ${v}`);
      const w = await p.text().catch((T) => Jc(T).message), _ = M_(w), S = _ ? void 0 : w;
      throw gt(this).debug(`[${u}] response error (${v})`, Ir({
        retryOfRequestLogID: n,
        url: p.url,
        status: p.status,
        headers: p.headers,
        message: S,
        durationMs: Date.now() - d
      })), this.makeStatusError(p.status, _, S, p.headers);
    }
    return gt(this).info(g), gt(this).debug(`[${u}] response start`, Ir({
      retryOfRequestLogID: n,
      url: p.url,
      status: p.status,
      headers: p.headers,
      durationMs: m - d
    })), {
      response: p,
      options: r,
      controller: h,
      requestLogID: u,
      retryOfRequestLogID: n,
      startTime: d
    };
  }
  getAPIList(e, t, n) {
    return this.requestAPIList(t, n && "then" in n ? n.then((r) => ({
      method: "get",
      path: e,
      ...r
    })) : {
      method: "get",
      path: e,
      ...n
    });
  }
  requestAPIList(e, t) {
    const n = this.makeRequest(t, null, void 0);
    return new PI(this, n, e);
  }
  async fetchWithTimeout(e, t, n, r) {
    const { signal: o, method: i, ...s } = t || {}, a = this._makeAbort(r);
    o && o.addEventListener("abort", a, { once: !0 });
    const u = setTimeout(a, n), f = globalThis.ReadableStream && s.body instanceof globalThis.ReadableStream || typeof s.body == "object" && s.body !== null && Symbol.asyncIterator in s.body, d = {
      signal: r.signal,
      ...f ? { duplex: "half" } : {},
      method: "GET",
      ...s
    };
    i && (d.method = i.toUpperCase());
    try {
      return await this.fetch.call(void 0, e, d);
    } finally {
      clearTimeout(u);
    }
  }
  async shouldRetry(e) {
    const t = e.headers.get("x-should-retry");
    return t === "true" ? !0 : t === "false" ? !1 : e.status === 408 || e.status === 409 || e.status === 429 || e.status >= 500;
  }
  async retryRequest(e, t, n, r) {
    let o;
    const i = r?.get("retry-after-ms");
    if (i) {
      const a = parseFloat(i);
      Number.isNaN(a) || (o = a);
    }
    const s = r?.get("retry-after");
    if (s && !o) {
      const a = parseFloat(s);
      Number.isNaN(a) ? o = Date.parse(s) - Date.now() : o = a * 1e3;
    }
    if (o === void 0) {
      const a = e.maxRetries ?? this.maxRetries;
      o = this.calculateDefaultRetryTimeoutMillis(t, a);
    }
    return await fI(o), this.makeRequest(e, t - 1, n);
  }
  calculateDefaultRetryTimeoutMillis(e, t) {
    const o = t - e;
    return Math.min(0.5 * Math.pow(2, o), 8) * (1 - Math.random() * 0.25) * 1e3;
  }
  calculateNonstreamingTimeout(e, t) {
    if (36e5 * e / 128e3 > 6e5 || t != null && e > t) throw new me("Streaming is required for operations that may take longer than 10 minutes. See https://github.com/anthropics/anthropic-sdk-typescript#long-requests for more details");
    return 6e5;
  }
  async buildRequest(e, { retryCount: t = 0 } = {}) {
    const n = { ...e }, { method: r, path: o, query: i, defaultBaseURL: s } = n, a = this.buildURL(o, i, s);
    "timeout" in n && cI("timeout", n.timeout), n.timeout = n.timeout ?? this.timeout;
    const { bodyHeaders: u, body: f } = this.buildBody({ options: n });
    return {
      req: {
        method: r,
        headers: await this.buildHeaders({
          options: e,
          method: r,
          bodyHeaders: u,
          retryCount: t
        }),
        ...n.signal && { signal: n.signal },
        ...globalThis.ReadableStream && f instanceof globalThis.ReadableStream && { duplex: "half" },
        ...f && { body: f },
        ...this.fetchOptions ?? {},
        ...n.fetchOptions ?? {}
      },
      url: a,
      timeout: n.timeout
    };
  }
  async buildHeaders({ options: e, method: t, bodyHeaders: n, retryCount: r }) {
    let o = {};
    this.idempotencyHeader && t !== "get" && (e.idempotencyKey || (e.idempotencyKey = this.defaultIdempotencyKey()), o[this.idempotencyHeader] = e.idempotencyKey);
    const i = Q([
      o,
      {
        Accept: "application/json",
        "User-Agent": this.getUserAgent(),
        "X-Stainless-Retry-Count": String(r),
        ...e.timeout ? { "X-Stainless-Timeout": String(Math.trunc(e.timeout / 1e3)) } : {},
        ...gI(),
        ...this._options.dangerouslyAllowBrowser ? { "anthropic-dangerous-direct-browser-access": "true" } : void 0,
        "anthropic-version": "2023-06-01"
      },
      await this.authHeaders(e),
      this._options.defaultHeaders,
      n,
      e.headers
    ]);
    return this.validateHeaders(i), i.values;
  }
  _makeAbort(e) {
    return () => e.abort();
  }
  buildBody({ options: { body: e, headers: t } }) {
    if (!e) return {
      bodyHeaders: void 0,
      body: void 0
    };
    const n = Q([t]);
    return ArrayBuffer.isView(e) || e instanceof ArrayBuffer || e instanceof DataView || typeof e == "string" && n.values.has("content-type") || globalThis.Blob && e instanceof globalThis.Blob || e instanceof FormData || e instanceof URLSearchParams || globalThis.ReadableStream && e instanceof globalThis.ReadableStream ? {
      bodyHeaders: void 0,
      body: e
    } : typeof e == "object" && (Symbol.asyncIterator in e || Symbol.iterator in e && "next" in e && typeof e.next == "function") ? {
      bodyHeaders: void 0,
      body: k_(e)
    } : typeof e == "object" && n.values.get("content-type") === "application/x-www-form-urlencoded" ? {
      bodyHeaders: { "content-type": "application/x-www-form-urlencoded" },
      body: this.stringifyQuery(e)
    } : P(this, Va, "f").call(this, {
      body: e,
      headers: n
    });
  }
};
Dd = Ke, Va = /* @__PURE__ */ new WeakMap(), tf = /* @__PURE__ */ new WeakSet(), pw = function() {
  return this.baseURL !== "https://api.anthropic.com";
};
Ke.Anthropic = Dd;
Ke.HUMAN_PROMPT = QI;
Ke.AI_PROMPT = ZI;
Ke.DEFAULT_TIMEOUT = 6e5;
Ke.AnthropicError = me;
Ke.APIError = Ot;
Ke.APIConnectionError = ou;
Ke.APIConnectionTimeoutError = T_;
Ke.APIUserAbortError = jt;
Ke.NotFoundError = b_;
Ke.ConflictError = I_;
Ke.RateLimitError = P_;
Ke.BadRequestError = S_;
Ke.AuthenticationError = A_;
Ke.InternalServerError = x_;
Ke.PermissionDeniedError = C_;
Ke.UnprocessableEntityError = R_;
Ke.toFile = LI;
var Os = class extends Ke {
  constructor() {
    super(...arguments), this.completions = new uw(this), this.messages = new kd(this), this.models = new hw(this), this.beta = new bn(this);
  }
};
Os.Completions = uw;
Os.Messages = kd;
Os.Models = hw;
Os.Beta = bn;
function jI(e) {
  try {
    return JSON.parse(e || "{}");
  } catch {
    return {};
  }
}
function eR(e = "") {
  const t = String(e || "").match(/^data:([^;,]+);base64,(.+)$/);
  return t ? {
    mediaType: t[1],
    data: t[2]
  } : {
    mediaType: "",
    data: ""
  };
}
function mw(e) {
  if (e !== void 0)
    try {
      return JSON.parse(JSON.stringify(e));
    } catch {
      return;
    }
}
function tR(e) {
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
      const r = eR(n.image_url.url);
      return !r.mediaType || !r.data ? null : {
        type: "image",
        source: {
          type: "base64",
          media_type: r.mediaType,
          data: r.data
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
function nR(e) {
  const t = [String(e.systemPrompt || "").trim(), ...(e.messages || []).filter((n) => n.role === "system").map((n) => String(n.content || "").trim())].filter(Boolean);
  return t.length ? [...new Set(t)].join(`

`) : "";
}
function rR(e) {
  const t = e?.providerPayload?.anthropicContent;
  return Array.isArray(t) && t.length && mw(t) || null;
}
function oR(e) {
  return Array.isArray(e?.content) && e.content.length ? { anthropicContent: mw(e.content) || [] } : void 0;
}
function jp(e = {}) {
  return {
    type: "tool_result",
    tool_use_id: e.tool_call_id,
    content: e.content
  };
}
function iR(e) {
  const t = [];
  for (let n = 0; n < e.length; n += 1) {
    const r = e[n];
    if (r.role !== "system") {
      if (r.role === "assistant") {
        const o = rR(r);
        if (o) {
          t.push({
            role: "assistant",
            content: o
          });
          continue;
        }
      }
      if (r.role === "tool") {
        const o = [jp(r)];
        for (; e[n + 1]?.role === "tool"; )
          n += 1, o.push(jp(e[n]));
        t.push({
          role: "user",
          content: o
        });
        continue;
      }
      if (r.role === "assistant" && Array.isArray(r.tool_calls) && r.tool_calls.length) {
        t.push({
          role: "assistant",
          content: [...r.content ? [{
            type: "text",
            text: r.content
          }] : [], ...r.tool_calls.map((o) => ({
            type: "tool_use",
            id: o.id,
            name: o.function.name,
            input: jI(o.function.arguments)
          }))]
        });
        continue;
      }
      t.push({
        role: r.role,
        content: tR(r.content)
      });
    }
  }
  return t;
}
function tc(e, t) {
  typeof e.onStreamProgress == "function" && e.onStreamProgress({
    ...typeof t.text == "string" ? { text: t.text } : {},
    ...Array.isArray(t.thoughts) ? { thoughts: t.thoughts } : {}
  });
}
function sR(e = "") {
  return String(e || "https://api.anthropic.com").trim().replace(/\/+$/, "").replace(/\/v1$/i, "");
}
var aR = class {
  constructor(e) {
    this.config = e, this.client = new Os({
      apiKey: e.apiKey,
      baseURL: sR(e.baseUrl),
      timeout: Number(e.timeoutMs) || 900 * 1e3,
      maxRetries: 0,
      dangerouslyAllowBrowser: !0
    });
  }
  async chat(e) {
    const t = (e.tools || []).map((s) => ({
      name: s.function.name,
      description: s.function.description,
      input_schema: s.function.parameters
    })), n = nR(e), r = {
      model: this.config.model,
      system: n,
      messages: iR(e.messages),
      tools: t,
      ...e.maxTokens ? { max_tokens: e.maxTokens } : {}
    };
    !e.reasoning?.enabled && typeof e.temperature == "number" && (r.temperature = e.temperature), e.reasoning?.enabled && (r.thinking = {
      type: "adaptive",
      display: "summarized"
    });
    let o;
    if (typeof e.onStreamProgress == "function") {
      const s = this.client.messages.stream(r, { signal: e.signal }), a = /* @__PURE__ */ new Map(), u = () => Array.from(a.entries()).sort(([f], [d]) => f.localeCompare(d)).map(([f, d]) => ({
        label: f.startsWith("redacted:") ? "已脱敏思考块" : "思考块",
        text: d
      })).filter((f) => f.text);
      s.on("text", (f, d) => {
        tc(e, {
          text: d || "",
          thoughts: u()
        });
      }), s.on("thinking", (f, d) => {
        a.set("thinking:0", d || ""), tc(e, { thoughts: u() });
      }), s.on("contentBlock", (f) => {
        f?.type === "redacted_thinking" && (a.set("redacted:0", f.data || ""), tc(e, { thoughts: u() }));
      }), o = await s.finalMessage();
    } else o = await this.client.messages.create(r, { signal: e.signal });
    const i = (o.content || []).filter((s) => s.type === "tool_use" && s.name).map((s, a) => ({
      id: s.id || `anthropic-tool-${a + 1}`,
      name: s.name,
      arguments: JSON.stringify(s.input || {})
    }));
    return {
      text: (o.content || []).filter((s) => s.type === "text").map((s) => s.text || "").join(`
`),
      toolCalls: i,
      thoughts: (o.content || []).filter((s) => s.type === "thinking" || s.type === "redacted_thinking").map((s) => ({
        label: s.type === "thinking" ? "思考块" : "已脱敏思考块",
        text: s.type === "thinking" ? s.thinking || "" : s.data || ""
      })).filter((s) => s.text),
      finishReason: o.stop_reason || "stop",
      model: o.model || this.config.model,
      provider: "anthropic",
      providerPayload: oR(o)
    };
  }
}, lR = /* @__PURE__ */ Ol(((e, t) => {
  function n(r, o) {
    typeof o == "boolean" && (o = { forever: o }), this._originalTimeouts = JSON.parse(JSON.stringify(r)), this._timeouts = r, this._options = o || {}, this._maxRetryTime = o && o.maxRetryTime || 1 / 0, this._fn = null, this._errors = [], this._attempts = 1, this._operationTimeout = null, this._operationTimeoutCb = null, this._timeout = null, this._operationStart = null, this._timer = null, this._options.forever && (this._cachedTimeouts = this._timeouts.slice(0));
  }
  t.exports = n, n.prototype.reset = function() {
    this._attempts = 1, this._timeouts = this._originalTimeouts.slice(0);
  }, n.prototype.stop = function() {
    this._timeout && clearTimeout(this._timeout), this._timer && clearTimeout(this._timer), this._timeouts = [], this._cachedTimeouts = null;
  }, n.prototype.retry = function(r) {
    if (this._timeout && clearTimeout(this._timeout), !r) return !1;
    var o = (/* @__PURE__ */ new Date()).getTime();
    if (r && o - this._operationStart >= this._maxRetryTime)
      return this._errors.push(r), this._errors.unshift(/* @__PURE__ */ new Error("RetryOperation timeout occurred")), !1;
    this._errors.push(r);
    var i = this._timeouts.shift();
    if (i === void 0) if (this._cachedTimeouts)
      this._errors.splice(0, this._errors.length - 1), i = this._cachedTimeouts.slice(-1);
    else return !1;
    var s = this;
    return this._timer = setTimeout(function() {
      s._attempts++, s._operationTimeoutCb && (s._timeout = setTimeout(function() {
        s._operationTimeoutCb(s._attempts);
      }, s._operationTimeout), s._options.unref && s._timeout.unref()), s._fn(s._attempts);
    }, i), this._options.unref && this._timer.unref(), !0;
  }, n.prototype.attempt = function(r, o) {
    this._fn = r, o && (o.timeout && (this._operationTimeout = o.timeout), o.cb && (this._operationTimeoutCb = o.cb));
    var i = this;
    this._operationTimeoutCb && (this._timeout = setTimeout(function() {
      i._operationTimeoutCb();
    }, i._operationTimeout)), this._operationStart = (/* @__PURE__ */ new Date()).getTime(), this._fn(this._attempts);
  }, n.prototype.try = function(r) {
    console.log("Using RetryOperation.try() is deprecated"), this.attempt(r);
  }, n.prototype.start = function(r) {
    console.log("Using RetryOperation.start() is deprecated"), this.attempt(r);
  }, n.prototype.start = n.prototype.try, n.prototype.errors = function() {
    return this._errors;
  }, n.prototype.attempts = function() {
    return this._attempts;
  }, n.prototype.mainError = function() {
    if (this._errors.length === 0) return null;
    for (var r = {}, o = null, i = 0, s = 0; s < this._errors.length; s++) {
      var a = this._errors[s], u = a.message, f = (r[u] || 0) + 1;
      r[u] = f, f >= i && (o = a, i = f);
    }
    return o;
  };
})), uR = /* @__PURE__ */ Ol(((e) => {
  var t = lR();
  e.operation = function(n) {
    return new t(e.timeouts(n), {
      forever: n && (n.forever || n.retries === 1 / 0),
      unref: n && n.unref,
      maxRetryTime: n && n.maxRetryTime
    });
  }, e.timeouts = function(n) {
    if (n instanceof Array) return [].concat(n);
    var r = {
      retries: 10,
      factor: 2,
      minTimeout: 1 * 1e3,
      maxTimeout: 1 / 0,
      randomize: !1
    };
    for (var o in n) r[o] = n[o];
    if (r.minTimeout > r.maxTimeout) throw new Error("minTimeout is greater than maxTimeout");
    for (var i = [], s = 0; s < r.retries; s++) i.push(this.createTimeout(s, r));
    return n && n.forever && !i.length && i.push(this.createTimeout(s, r)), i.sort(function(a, u) {
      return a - u;
    }), i;
  }, e.createTimeout = function(n, r) {
    var o = r.randomize ? Math.random() + 1 : 1, i = Math.round(o * Math.max(r.minTimeout, 1) * Math.pow(r.factor, n));
    return i = Math.min(i, r.maxTimeout), i;
  }, e.wrap = function(n, r, o) {
    if (r instanceof Array && (o = r, r = null), !o) {
      o = [];
      for (var i in n) typeof n[i] == "function" && o.push(i);
    }
    for (var s = 0; s < o.length; s++) {
      var a = o[s], u = n[a];
      n[a] = function(d) {
        var h = e.operation(r), p = Array.prototype.slice.call(arguments, 1), m = p.pop();
        p.push(function(g) {
          h.retry(g) || (g && (arguments[0] = h.mainError()), m.apply(this, arguments));
        }), h.attempt(function() {
          d.apply(n, p);
        });
      }.bind(n, u), n[a].options = r;
    }
  };
})), cR = /* @__PURE__ */ Ol(((e, t) => {
  t.exports = uR();
})), fR = /* @__PURE__ */ Ol(((e, t) => {
  var n = cR(), r = [
    "Failed to fetch",
    "NetworkError when attempting to fetch resource.",
    "The Internet connection appears to be offline.",
    "Network request failed"
  ], o = class extends Error {
    constructor(u) {
      super(), u instanceof Error ? (this.originalError = u, { message: u } = u) : (this.originalError = new Error(u), this.originalError.stack = this.stack), this.name = "AbortError", this.message = u;
    }
  }, i = (u, f, d) => {
    const h = d.retries - (f - 1);
    return u.attemptNumber = f, u.retriesLeft = h, u;
  }, s = (u) => r.includes(u), a = (u, f) => new Promise((d, h) => {
    f = {
      onFailedAttempt: () => {
      },
      retries: 10,
      ...f
    };
    const p = n.operation(f);
    p.attempt(async (m) => {
      try {
        d(await u(m));
      } catch (g) {
        if (!(g instanceof Error)) {
          h(/* @__PURE__ */ new TypeError(`Non-error was thrown: "${g}". You should only throw errors.`));
          return;
        }
        if (g instanceof o)
          p.stop(), h(g.originalError);
        else if (g instanceof TypeError && !s(g.message))
          p.stop(), h(g);
        else {
          i(g, m, f);
          try {
            await f.onFailedAttempt(g);
          } catch (y) {
            h(y);
            return;
          }
          p.retry(g) || h(p.mainError());
        }
      }
    });
  });
  t.exports = a, t.exports.default = a, t.exports.AbortError = o;
})), em = /* @__PURE__ */ TS(fR(), 1), dR = void 0, hR = void 0;
function pR() {
  return {
    geminiUrl: dR,
    vertexUrl: hR
  };
}
function mR(e, t, n, r) {
  var o, i;
  if (!e?.baseUrl) {
    const s = pR();
    return t ? (o = s.vertexUrl) !== null && o !== void 0 ? o : n : (i = s.geminiUrl) !== null && i !== void 0 ? i : r;
  }
  return e.baseUrl;
}
var Wn = class {
};
function X(e, t) {
  return e.replace(/\{([^}]+)\}/g, (n, r) => {
    if (Object.prototype.hasOwnProperty.call(t, r)) {
      const o = t[r];
      return o != null ? String(o) : "";
    } else throw new Error(`Key '${r}' not found in valueMap.`);
  });
}
function c(e, t, n) {
  for (let i = 0; i < t.length - 1; i++) {
    const s = t[i];
    if (s.endsWith("[]")) {
      const a = s.slice(0, -2);
      if (!(a in e)) if (Array.isArray(n)) e[a] = Array.from({ length: n.length }, () => ({}));
      else throw new Error(`Value must be a list given an array path ${s}`);
      if (Array.isArray(e[a])) {
        const u = e[a];
        if (Array.isArray(n)) for (let f = 0; f < u.length; f++) {
          const d = u[f];
          c(d, t.slice(i + 1), n[f]);
        }
        else for (const f of u) c(f, t.slice(i + 1), n);
      }
      return;
    } else if (s.endsWith("[0]")) {
      const a = s.slice(0, -3);
      a in e || (e[a] = [{}]);
      const u = e[a];
      c(u[0], t.slice(i + 1), n);
      return;
    }
    (!e[s] || typeof e[s] != "object") && (e[s] = {}), e = e[s];
  }
  const r = t[t.length - 1], o = e[r];
  if (o !== void 0) {
    if (!n || typeof n == "object" && Object.keys(n).length === 0 || n === o) return;
    if (typeof o == "object" && typeof n == "object" && o !== null && n !== null) Object.assign(o, n);
    else throw new Error(`Cannot set value for an existing key. Key: ${r}`);
  } else r === "_self" && typeof n == "object" && n !== null && !Array.isArray(n) ? Object.assign(e, n) : e[r] = n;
}
function l(e, t, n = void 0) {
  try {
    if (t.length === 1 && t[0] === "_self") return e;
    for (let r = 0; r < t.length; r++) {
      if (typeof e != "object" || e === null) return n;
      const o = t[r];
      if (o.endsWith("[]")) {
        const i = o.slice(0, -2);
        if (i in e) {
          const s = e[i];
          return Array.isArray(s) ? s.map((a) => l(a, t.slice(r + 1), n)) : n;
        } else return n;
      } else e = e[o];
    }
    return e;
  } catch (r) {
    if (r instanceof TypeError) return n;
    throw r;
  }
}
function gR(e, t) {
  for (const [n, r] of Object.entries(t)) {
    const o = n.split("."), i = r.split("."), s = /* @__PURE__ */ new Set();
    let a = -1;
    for (let u = 0; u < o.length; u++) if (o[u] === "*") {
      a = u;
      break;
    }
    if (a !== -1 && i.length > a) for (let u = a; u < i.length; u++) {
      const f = i[u];
      f !== "*" && !f.endsWith("[]") && !f.endsWith("[0]") && s.add(f);
    }
    nf(e, o, i, 0, s);
  }
}
function nf(e, t, n, r, o) {
  if (r >= t.length || typeof e != "object" || e === null) return;
  const i = t[r];
  if (i.endsWith("[]")) {
    const s = i.slice(0, -2), a = e;
    if (s in a && Array.isArray(a[s])) for (const u of a[s]) nf(u, t, n, r + 1, o);
  } else if (i === "*") {
    if (typeof e == "object" && e !== null && !Array.isArray(e)) {
      const s = e, a = Object.keys(s).filter((f) => !f.startsWith("_") && !o.has(f)), u = {};
      for (const f of a) u[f] = s[f];
      for (const [f, d] of Object.entries(u)) {
        const h = [];
        for (const p of n.slice(r)) p === "*" ? h.push(f) : h.push(p);
        c(s, h, d);
      }
      for (const f of a) delete s[f];
    }
  } else {
    const s = e;
    i in s && nf(s[i], t, n, r + 1, o);
  }
}
function Ld(e) {
  if (typeof e != "string") throw new Error("fromImageBytes must be a string");
  return e;
}
function yR(e) {
  const t = {}, n = l(e, ["operationName"]);
  n != null && c(t, ["operationName"], n);
  const r = l(e, ["resourceName"]);
  return r != null && c(t, ["_url", "resourceName"], r), t;
}
function vR(e) {
  const t = {}, n = l(e, ["name"]);
  n != null && c(t, ["name"], n);
  const r = l(e, ["metadata"]);
  r != null && c(t, ["metadata"], r);
  const o = l(e, ["done"]);
  o != null && c(t, ["done"], o);
  const i = l(e, ["error"]);
  i != null && c(t, ["error"], i);
  const s = l(e, ["response", "generateVideoResponse"]);
  return s != null && c(t, ["response"], wR(s)), t;
}
function _R(e) {
  const t = {}, n = l(e, ["name"]);
  n != null && c(t, ["name"], n);
  const r = l(e, ["metadata"]);
  r != null && c(t, ["metadata"], r);
  const o = l(e, ["done"]);
  o != null && c(t, ["done"], o);
  const i = l(e, ["error"]);
  i != null && c(t, ["error"], i);
  const s = l(e, ["response"]);
  return s != null && c(t, ["response"], ER(s)), t;
}
function wR(e) {
  const t = {}, n = l(e, ["generatedSamples"]);
  if (n != null) {
    let i = n;
    Array.isArray(i) && (i = i.map((s) => TR(s))), c(t, ["generatedVideos"], i);
  }
  const r = l(e, ["raiMediaFilteredCount"]);
  r != null && c(t, ["raiMediaFilteredCount"], r);
  const o = l(e, ["raiMediaFilteredReasons"]);
  return o != null && c(t, ["raiMediaFilteredReasons"], o), t;
}
function ER(e) {
  const t = {}, n = l(e, ["videos"]);
  if (n != null) {
    let i = n;
    Array.isArray(i) && (i = i.map((s) => SR(s))), c(t, ["generatedVideos"], i);
  }
  const r = l(e, ["raiMediaFilteredCount"]);
  r != null && c(t, ["raiMediaFilteredCount"], r);
  const o = l(e, ["raiMediaFilteredReasons"]);
  return o != null && c(t, ["raiMediaFilteredReasons"], o), t;
}
function TR(e) {
  const t = {}, n = l(e, ["video"]);
  return n != null && c(t, ["video"], PR(n)), t;
}
function SR(e) {
  const t = {}, n = l(e, ["_self"]);
  return n != null && c(t, ["video"], xR(n)), t;
}
function AR(e) {
  const t = {}, n = l(e, ["operationName"]);
  return n != null && c(t, ["_url", "operationName"], n), t;
}
function CR(e) {
  const t = {}, n = l(e, ["operationName"]);
  return n != null && c(t, ["_url", "operationName"], n), t;
}
function bR(e) {
  const t = {}, n = l(e, ["name"]);
  n != null && c(t, ["name"], n);
  const r = l(e, ["metadata"]);
  r != null && c(t, ["metadata"], r);
  const o = l(e, ["done"]);
  o != null && c(t, ["done"], o);
  const i = l(e, ["error"]);
  i != null && c(t, ["error"], i);
  const s = l(e, ["response"]);
  return s != null && c(t, ["response"], IR(s)), t;
}
function IR(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  n != null && c(t, ["sdkHttpResponse"], n);
  const r = l(e, ["parent"]);
  r != null && c(t, ["parent"], r);
  const o = l(e, ["documentName"]);
  return o != null && c(t, ["documentName"], o), t;
}
function gw(e) {
  const t = {}, n = l(e, ["name"]);
  n != null && c(t, ["name"], n);
  const r = l(e, ["metadata"]);
  r != null && c(t, ["metadata"], r);
  const o = l(e, ["done"]);
  o != null && c(t, ["done"], o);
  const i = l(e, ["error"]);
  i != null && c(t, ["error"], i);
  const s = l(e, ["response"]);
  return s != null && c(t, ["response"], RR(s)), t;
}
function RR(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  n != null && c(t, ["sdkHttpResponse"], n);
  const r = l(e, ["parent"]);
  r != null && c(t, ["parent"], r);
  const o = l(e, ["documentName"]);
  return o != null && c(t, ["documentName"], o), t;
}
function PR(e) {
  const t = {}, n = l(e, ["uri"]);
  n != null && c(t, ["uri"], n);
  const r = l(e, ["encodedVideo"]);
  r != null && c(t, ["videoBytes"], Ld(r));
  const o = l(e, ["encoding"]);
  return o != null && c(t, ["mimeType"], o), t;
}
function xR(e) {
  const t = {}, n = l(e, ["gcsUri"]);
  n != null && c(t, ["uri"], n);
  const r = l(e, ["bytesBase64Encoded"]);
  r != null && c(t, ["videoBytes"], Ld(r));
  const o = l(e, ["mimeType"]);
  return o != null && c(t, ["mimeType"], o), t;
}
var tm;
(function(e) {
  e.LANGUAGE_UNSPECIFIED = "LANGUAGE_UNSPECIFIED", e.PYTHON = "PYTHON";
})(tm || (tm = {}));
var nm;
(function(e) {
  e.OUTCOME_UNSPECIFIED = "OUTCOME_UNSPECIFIED", e.OUTCOME_OK = "OUTCOME_OK", e.OUTCOME_FAILED = "OUTCOME_FAILED", e.OUTCOME_DEADLINE_EXCEEDED = "OUTCOME_DEADLINE_EXCEEDED";
})(nm || (nm = {}));
var rm;
(function(e) {
  e.SCHEDULING_UNSPECIFIED = "SCHEDULING_UNSPECIFIED", e.SILENT = "SILENT", e.WHEN_IDLE = "WHEN_IDLE", e.INTERRUPT = "INTERRUPT";
})(rm || (rm = {}));
var lr;
(function(e) {
  e.TYPE_UNSPECIFIED = "TYPE_UNSPECIFIED", e.STRING = "STRING", e.NUMBER = "NUMBER", e.INTEGER = "INTEGER", e.BOOLEAN = "BOOLEAN", e.ARRAY = "ARRAY", e.OBJECT = "OBJECT", e.NULL = "NULL";
})(lr || (lr = {}));
var om;
(function(e) {
  e.ENVIRONMENT_UNSPECIFIED = "ENVIRONMENT_UNSPECIFIED", e.ENVIRONMENT_BROWSER = "ENVIRONMENT_BROWSER";
})(om || (om = {}));
var im;
(function(e) {
  e.AUTH_TYPE_UNSPECIFIED = "AUTH_TYPE_UNSPECIFIED", e.NO_AUTH = "NO_AUTH", e.API_KEY_AUTH = "API_KEY_AUTH", e.HTTP_BASIC_AUTH = "HTTP_BASIC_AUTH", e.GOOGLE_SERVICE_ACCOUNT_AUTH = "GOOGLE_SERVICE_ACCOUNT_AUTH", e.OAUTH = "OAUTH", e.OIDC_AUTH = "OIDC_AUTH";
})(im || (im = {}));
var sm;
(function(e) {
  e.HTTP_IN_UNSPECIFIED = "HTTP_IN_UNSPECIFIED", e.HTTP_IN_QUERY = "HTTP_IN_QUERY", e.HTTP_IN_HEADER = "HTTP_IN_HEADER", e.HTTP_IN_PATH = "HTTP_IN_PATH", e.HTTP_IN_BODY = "HTTP_IN_BODY", e.HTTP_IN_COOKIE = "HTTP_IN_COOKIE";
})(sm || (sm = {}));
var am;
(function(e) {
  e.API_SPEC_UNSPECIFIED = "API_SPEC_UNSPECIFIED", e.SIMPLE_SEARCH = "SIMPLE_SEARCH", e.ELASTIC_SEARCH = "ELASTIC_SEARCH";
})(am || (am = {}));
var lm;
(function(e) {
  e.PHISH_BLOCK_THRESHOLD_UNSPECIFIED = "PHISH_BLOCK_THRESHOLD_UNSPECIFIED", e.BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE", e.BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE", e.BLOCK_HIGH_AND_ABOVE = "BLOCK_HIGH_AND_ABOVE", e.BLOCK_HIGHER_AND_ABOVE = "BLOCK_HIGHER_AND_ABOVE", e.BLOCK_VERY_HIGH_AND_ABOVE = "BLOCK_VERY_HIGH_AND_ABOVE", e.BLOCK_ONLY_EXTREMELY_HIGH = "BLOCK_ONLY_EXTREMELY_HIGH";
})(lm || (lm = {}));
var um;
(function(e) {
  e.UNSPECIFIED = "UNSPECIFIED", e.BLOCKING = "BLOCKING", e.NON_BLOCKING = "NON_BLOCKING";
})(um || (um = {}));
var cm;
(function(e) {
  e.MODE_UNSPECIFIED = "MODE_UNSPECIFIED", e.MODE_DYNAMIC = "MODE_DYNAMIC";
})(cm || (cm = {}));
var rf;
(function(e) {
  e.MODE_UNSPECIFIED = "MODE_UNSPECIFIED", e.AUTO = "AUTO", e.ANY = "ANY", e.NONE = "NONE", e.VALIDATED = "VALIDATED";
})(rf || (rf = {}));
var ts;
(function(e) {
  e.THINKING_LEVEL_UNSPECIFIED = "THINKING_LEVEL_UNSPECIFIED", e.MINIMAL = "MINIMAL", e.LOW = "LOW", e.MEDIUM = "MEDIUM", e.HIGH = "HIGH";
})(ts || (ts = {}));
var fm;
(function(e) {
  e.DONT_ALLOW = "DONT_ALLOW", e.ALLOW_ADULT = "ALLOW_ADULT", e.ALLOW_ALL = "ALLOW_ALL";
})(fm || (fm = {}));
var dm;
(function(e) {
  e.PROMINENT_PEOPLE_UNSPECIFIED = "PROMINENT_PEOPLE_UNSPECIFIED", e.ALLOW_PROMINENT_PEOPLE = "ALLOW_PROMINENT_PEOPLE", e.BLOCK_PROMINENT_PEOPLE = "BLOCK_PROMINENT_PEOPLE";
})(dm || (dm = {}));
var hm;
(function(e) {
  e.HARM_CATEGORY_UNSPECIFIED = "HARM_CATEGORY_UNSPECIFIED", e.HARM_CATEGORY_HARASSMENT = "HARM_CATEGORY_HARASSMENT", e.HARM_CATEGORY_HATE_SPEECH = "HARM_CATEGORY_HATE_SPEECH", e.HARM_CATEGORY_SEXUALLY_EXPLICIT = "HARM_CATEGORY_SEXUALLY_EXPLICIT", e.HARM_CATEGORY_DANGEROUS_CONTENT = "HARM_CATEGORY_DANGEROUS_CONTENT", e.HARM_CATEGORY_CIVIC_INTEGRITY = "HARM_CATEGORY_CIVIC_INTEGRITY", e.HARM_CATEGORY_IMAGE_HATE = "HARM_CATEGORY_IMAGE_HATE", e.HARM_CATEGORY_IMAGE_DANGEROUS_CONTENT = "HARM_CATEGORY_IMAGE_DANGEROUS_CONTENT", e.HARM_CATEGORY_IMAGE_HARASSMENT = "HARM_CATEGORY_IMAGE_HARASSMENT", e.HARM_CATEGORY_IMAGE_SEXUALLY_EXPLICIT = "HARM_CATEGORY_IMAGE_SEXUALLY_EXPLICIT", e.HARM_CATEGORY_JAILBREAK = "HARM_CATEGORY_JAILBREAK";
})(hm || (hm = {}));
var pm;
(function(e) {
  e.HARM_BLOCK_METHOD_UNSPECIFIED = "HARM_BLOCK_METHOD_UNSPECIFIED", e.SEVERITY = "SEVERITY", e.PROBABILITY = "PROBABILITY";
})(pm || (pm = {}));
var mm;
(function(e) {
  e.HARM_BLOCK_THRESHOLD_UNSPECIFIED = "HARM_BLOCK_THRESHOLD_UNSPECIFIED", e.BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE", e.BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE", e.BLOCK_ONLY_HIGH = "BLOCK_ONLY_HIGH", e.BLOCK_NONE = "BLOCK_NONE", e.OFF = "OFF";
})(mm || (mm = {}));
var gm;
(function(e) {
  e.FINISH_REASON_UNSPECIFIED = "FINISH_REASON_UNSPECIFIED", e.STOP = "STOP", e.MAX_TOKENS = "MAX_TOKENS", e.SAFETY = "SAFETY", e.RECITATION = "RECITATION", e.LANGUAGE = "LANGUAGE", e.OTHER = "OTHER", e.BLOCKLIST = "BLOCKLIST", e.PROHIBITED_CONTENT = "PROHIBITED_CONTENT", e.SPII = "SPII", e.MALFORMED_FUNCTION_CALL = "MALFORMED_FUNCTION_CALL", e.IMAGE_SAFETY = "IMAGE_SAFETY", e.UNEXPECTED_TOOL_CALL = "UNEXPECTED_TOOL_CALL", e.IMAGE_PROHIBITED_CONTENT = "IMAGE_PROHIBITED_CONTENT", e.NO_IMAGE = "NO_IMAGE", e.IMAGE_RECITATION = "IMAGE_RECITATION", e.IMAGE_OTHER = "IMAGE_OTHER";
})(gm || (gm = {}));
var ym;
(function(e) {
  e.HARM_PROBABILITY_UNSPECIFIED = "HARM_PROBABILITY_UNSPECIFIED", e.NEGLIGIBLE = "NEGLIGIBLE", e.LOW = "LOW", e.MEDIUM = "MEDIUM", e.HIGH = "HIGH";
})(ym || (ym = {}));
var vm;
(function(e) {
  e.HARM_SEVERITY_UNSPECIFIED = "HARM_SEVERITY_UNSPECIFIED", e.HARM_SEVERITY_NEGLIGIBLE = "HARM_SEVERITY_NEGLIGIBLE", e.HARM_SEVERITY_LOW = "HARM_SEVERITY_LOW", e.HARM_SEVERITY_MEDIUM = "HARM_SEVERITY_MEDIUM", e.HARM_SEVERITY_HIGH = "HARM_SEVERITY_HIGH";
})(vm || (vm = {}));
var _m;
(function(e) {
  e.URL_RETRIEVAL_STATUS_UNSPECIFIED = "URL_RETRIEVAL_STATUS_UNSPECIFIED", e.URL_RETRIEVAL_STATUS_SUCCESS = "URL_RETRIEVAL_STATUS_SUCCESS", e.URL_RETRIEVAL_STATUS_ERROR = "URL_RETRIEVAL_STATUS_ERROR", e.URL_RETRIEVAL_STATUS_PAYWALL = "URL_RETRIEVAL_STATUS_PAYWALL", e.URL_RETRIEVAL_STATUS_UNSAFE = "URL_RETRIEVAL_STATUS_UNSAFE";
})(_m || (_m = {}));
var wm;
(function(e) {
  e.BLOCKED_REASON_UNSPECIFIED = "BLOCKED_REASON_UNSPECIFIED", e.SAFETY = "SAFETY", e.OTHER = "OTHER", e.BLOCKLIST = "BLOCKLIST", e.PROHIBITED_CONTENT = "PROHIBITED_CONTENT", e.IMAGE_SAFETY = "IMAGE_SAFETY", e.MODEL_ARMOR = "MODEL_ARMOR", e.JAILBREAK = "JAILBREAK";
})(wm || (wm = {}));
var Em;
(function(e) {
  e.TRAFFIC_TYPE_UNSPECIFIED = "TRAFFIC_TYPE_UNSPECIFIED", e.ON_DEMAND = "ON_DEMAND", e.ON_DEMAND_PRIORITY = "ON_DEMAND_PRIORITY", e.ON_DEMAND_FLEX = "ON_DEMAND_FLEX", e.PROVISIONED_THROUGHPUT = "PROVISIONED_THROUGHPUT";
})(Em || (Em = {}));
var Sl;
(function(e) {
  e.MODALITY_UNSPECIFIED = "MODALITY_UNSPECIFIED", e.TEXT = "TEXT", e.IMAGE = "IMAGE", e.AUDIO = "AUDIO", e.VIDEO = "VIDEO";
})(Sl || (Sl = {}));
var Tm;
(function(e) {
  e.MODEL_STAGE_UNSPECIFIED = "MODEL_STAGE_UNSPECIFIED", e.UNSTABLE_EXPERIMENTAL = "UNSTABLE_EXPERIMENTAL", e.EXPERIMENTAL = "EXPERIMENTAL", e.PREVIEW = "PREVIEW", e.STABLE = "STABLE", e.LEGACY = "LEGACY", e.DEPRECATED = "DEPRECATED", e.RETIRED = "RETIRED";
})(Tm || (Tm = {}));
var Sm;
(function(e) {
  e.MEDIA_RESOLUTION_UNSPECIFIED = "MEDIA_RESOLUTION_UNSPECIFIED", e.MEDIA_RESOLUTION_LOW = "MEDIA_RESOLUTION_LOW", e.MEDIA_RESOLUTION_MEDIUM = "MEDIA_RESOLUTION_MEDIUM", e.MEDIA_RESOLUTION_HIGH = "MEDIA_RESOLUTION_HIGH";
})(Sm || (Sm = {}));
var Am;
(function(e) {
  e.TUNING_MODE_UNSPECIFIED = "TUNING_MODE_UNSPECIFIED", e.TUNING_MODE_FULL = "TUNING_MODE_FULL", e.TUNING_MODE_PEFT_ADAPTER = "TUNING_MODE_PEFT_ADAPTER";
})(Am || (Am = {}));
var Cm;
(function(e) {
  e.ADAPTER_SIZE_UNSPECIFIED = "ADAPTER_SIZE_UNSPECIFIED", e.ADAPTER_SIZE_ONE = "ADAPTER_SIZE_ONE", e.ADAPTER_SIZE_TWO = "ADAPTER_SIZE_TWO", e.ADAPTER_SIZE_FOUR = "ADAPTER_SIZE_FOUR", e.ADAPTER_SIZE_EIGHT = "ADAPTER_SIZE_EIGHT", e.ADAPTER_SIZE_SIXTEEN = "ADAPTER_SIZE_SIXTEEN", e.ADAPTER_SIZE_THIRTY_TWO = "ADAPTER_SIZE_THIRTY_TWO";
})(Cm || (Cm = {}));
var of;
(function(e) {
  e.JOB_STATE_UNSPECIFIED = "JOB_STATE_UNSPECIFIED", e.JOB_STATE_QUEUED = "JOB_STATE_QUEUED", e.JOB_STATE_PENDING = "JOB_STATE_PENDING", e.JOB_STATE_RUNNING = "JOB_STATE_RUNNING", e.JOB_STATE_SUCCEEDED = "JOB_STATE_SUCCEEDED", e.JOB_STATE_FAILED = "JOB_STATE_FAILED", e.JOB_STATE_CANCELLING = "JOB_STATE_CANCELLING", e.JOB_STATE_CANCELLED = "JOB_STATE_CANCELLED", e.JOB_STATE_PAUSED = "JOB_STATE_PAUSED", e.JOB_STATE_EXPIRED = "JOB_STATE_EXPIRED", e.JOB_STATE_UPDATING = "JOB_STATE_UPDATING", e.JOB_STATE_PARTIALLY_SUCCEEDED = "JOB_STATE_PARTIALLY_SUCCEEDED";
})(of || (of = {}));
var bm;
(function(e) {
  e.TUNING_JOB_STATE_UNSPECIFIED = "TUNING_JOB_STATE_UNSPECIFIED", e.TUNING_JOB_STATE_WAITING_FOR_QUOTA = "TUNING_JOB_STATE_WAITING_FOR_QUOTA", e.TUNING_JOB_STATE_PROCESSING_DATASET = "TUNING_JOB_STATE_PROCESSING_DATASET", e.TUNING_JOB_STATE_WAITING_FOR_CAPACITY = "TUNING_JOB_STATE_WAITING_FOR_CAPACITY", e.TUNING_JOB_STATE_TUNING = "TUNING_JOB_STATE_TUNING", e.TUNING_JOB_STATE_POST_PROCESSING = "TUNING_JOB_STATE_POST_PROCESSING";
})(bm || (bm = {}));
var Im;
(function(e) {
  e.AGGREGATION_METRIC_UNSPECIFIED = "AGGREGATION_METRIC_UNSPECIFIED", e.AVERAGE = "AVERAGE", e.MODE = "MODE", e.STANDARD_DEVIATION = "STANDARD_DEVIATION", e.VARIANCE = "VARIANCE", e.MINIMUM = "MINIMUM", e.MAXIMUM = "MAXIMUM", e.MEDIAN = "MEDIAN", e.PERCENTILE_P90 = "PERCENTILE_P90", e.PERCENTILE_P95 = "PERCENTILE_P95", e.PERCENTILE_P99 = "PERCENTILE_P99";
})(Im || (Im = {}));
var Rm;
(function(e) {
  e.PAIRWISE_CHOICE_UNSPECIFIED = "PAIRWISE_CHOICE_UNSPECIFIED", e.BASELINE = "BASELINE", e.CANDIDATE = "CANDIDATE", e.TIE = "TIE";
})(Rm || (Rm = {}));
var Pm;
(function(e) {
  e.TUNING_TASK_UNSPECIFIED = "TUNING_TASK_UNSPECIFIED", e.TUNING_TASK_I2V = "TUNING_TASK_I2V", e.TUNING_TASK_T2V = "TUNING_TASK_T2V", e.TUNING_TASK_R2V = "TUNING_TASK_R2V";
})(Pm || (Pm = {}));
var xm;
(function(e) {
  e.STATE_UNSPECIFIED = "STATE_UNSPECIFIED", e.STATE_PENDING = "STATE_PENDING", e.STATE_ACTIVE = "STATE_ACTIVE", e.STATE_FAILED = "STATE_FAILED";
})(xm || (xm = {}));
var Mm;
(function(e) {
  e.MEDIA_RESOLUTION_UNSPECIFIED = "MEDIA_RESOLUTION_UNSPECIFIED", e.MEDIA_RESOLUTION_LOW = "MEDIA_RESOLUTION_LOW", e.MEDIA_RESOLUTION_MEDIUM = "MEDIA_RESOLUTION_MEDIUM", e.MEDIA_RESOLUTION_HIGH = "MEDIA_RESOLUTION_HIGH", e.MEDIA_RESOLUTION_ULTRA_HIGH = "MEDIA_RESOLUTION_ULTRA_HIGH";
})(Mm || (Mm = {}));
var Nm;
(function(e) {
  e.TOOL_TYPE_UNSPECIFIED = "TOOL_TYPE_UNSPECIFIED", e.GOOGLE_SEARCH_WEB = "GOOGLE_SEARCH_WEB", e.GOOGLE_SEARCH_IMAGE = "GOOGLE_SEARCH_IMAGE", e.URL_CONTEXT = "URL_CONTEXT", e.GOOGLE_MAPS = "GOOGLE_MAPS", e.FILE_SEARCH = "FILE_SEARCH";
})(Nm || (Nm = {}));
var sf;
(function(e) {
  e.COLLECTION = "COLLECTION";
})(sf || (sf = {}));
var km;
(function(e) {
  e.UNSPECIFIED = "unspecified", e.FLEX = "flex", e.STANDARD = "standard", e.PRIORITY = "priority";
})(km || (km = {}));
var Dm;
(function(e) {
  e.FEATURE_SELECTION_PREFERENCE_UNSPECIFIED = "FEATURE_SELECTION_PREFERENCE_UNSPECIFIED", e.PRIORITIZE_QUALITY = "PRIORITIZE_QUALITY", e.BALANCED = "BALANCED", e.PRIORITIZE_COST = "PRIORITIZE_COST";
})(Dm || (Dm = {}));
var Al;
(function(e) {
  e.PREDICT = "PREDICT", e.EMBED_CONTENT = "EMBED_CONTENT";
})(Al || (Al = {}));
var Lm;
(function(e) {
  e.BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE", e.BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE", e.BLOCK_ONLY_HIGH = "BLOCK_ONLY_HIGH", e.BLOCK_NONE = "BLOCK_NONE";
})(Lm || (Lm = {}));
var Um;
(function(e) {
  e.auto = "auto", e.en = "en", e.ja = "ja", e.ko = "ko", e.hi = "hi", e.zh = "zh", e.pt = "pt", e.es = "es";
})(Um || (Um = {}));
var $m;
(function(e) {
  e.MASK_MODE_DEFAULT = "MASK_MODE_DEFAULT", e.MASK_MODE_USER_PROVIDED = "MASK_MODE_USER_PROVIDED", e.MASK_MODE_BACKGROUND = "MASK_MODE_BACKGROUND", e.MASK_MODE_FOREGROUND = "MASK_MODE_FOREGROUND", e.MASK_MODE_SEMANTIC = "MASK_MODE_SEMANTIC";
})($m || ($m = {}));
var Fm;
(function(e) {
  e.CONTROL_TYPE_DEFAULT = "CONTROL_TYPE_DEFAULT", e.CONTROL_TYPE_CANNY = "CONTROL_TYPE_CANNY", e.CONTROL_TYPE_SCRIBBLE = "CONTROL_TYPE_SCRIBBLE", e.CONTROL_TYPE_FACE_MESH = "CONTROL_TYPE_FACE_MESH";
})(Fm || (Fm = {}));
var Om;
(function(e) {
  e.SUBJECT_TYPE_DEFAULT = "SUBJECT_TYPE_DEFAULT", e.SUBJECT_TYPE_PERSON = "SUBJECT_TYPE_PERSON", e.SUBJECT_TYPE_ANIMAL = "SUBJECT_TYPE_ANIMAL", e.SUBJECT_TYPE_PRODUCT = "SUBJECT_TYPE_PRODUCT";
})(Om || (Om = {}));
var Bm;
(function(e) {
  e.EDIT_MODE_DEFAULT = "EDIT_MODE_DEFAULT", e.EDIT_MODE_INPAINT_REMOVAL = "EDIT_MODE_INPAINT_REMOVAL", e.EDIT_MODE_INPAINT_INSERTION = "EDIT_MODE_INPAINT_INSERTION", e.EDIT_MODE_OUTPAINT = "EDIT_MODE_OUTPAINT", e.EDIT_MODE_CONTROLLED_EDITING = "EDIT_MODE_CONTROLLED_EDITING", e.EDIT_MODE_STYLE = "EDIT_MODE_STYLE", e.EDIT_MODE_BGSWAP = "EDIT_MODE_BGSWAP", e.EDIT_MODE_PRODUCT_IMAGE = "EDIT_MODE_PRODUCT_IMAGE";
})(Bm || (Bm = {}));
var Gm;
(function(e) {
  e.FOREGROUND = "FOREGROUND", e.BACKGROUND = "BACKGROUND", e.PROMPT = "PROMPT", e.SEMANTIC = "SEMANTIC", e.INTERACTIVE = "INTERACTIVE";
})(Gm || (Gm = {}));
var Vm;
(function(e) {
  e.ASSET = "ASSET", e.STYLE = "STYLE";
})(Vm || (Vm = {}));
var Hm;
(function(e) {
  e.INSERT = "INSERT", e.REMOVE = "REMOVE", e.REMOVE_STATIC = "REMOVE_STATIC", e.OUTPAINT = "OUTPAINT";
})(Hm || (Hm = {}));
var qm;
(function(e) {
  e.OPTIMIZED = "OPTIMIZED", e.LOSSLESS = "LOSSLESS";
})(qm || (qm = {}));
var Km;
(function(e) {
  e.SUPERVISED_FINE_TUNING = "SUPERVISED_FINE_TUNING", e.PREFERENCE_TUNING = "PREFERENCE_TUNING", e.DISTILLATION = "DISTILLATION";
})(Km || (Km = {}));
var Jm;
(function(e) {
  e.STATE_UNSPECIFIED = "STATE_UNSPECIFIED", e.PROCESSING = "PROCESSING", e.ACTIVE = "ACTIVE", e.FAILED = "FAILED";
})(Jm || (Jm = {}));
var Wm;
(function(e) {
  e.SOURCE_UNSPECIFIED = "SOURCE_UNSPECIFIED", e.UPLOADED = "UPLOADED", e.GENERATED = "GENERATED", e.REGISTERED = "REGISTERED";
})(Wm || (Wm = {}));
var Ym;
(function(e) {
  e.TURN_COMPLETE_REASON_UNSPECIFIED = "TURN_COMPLETE_REASON_UNSPECIFIED", e.MALFORMED_FUNCTION_CALL = "MALFORMED_FUNCTION_CALL", e.RESPONSE_REJECTED = "RESPONSE_REJECTED", e.NEED_MORE_INPUT = "NEED_MORE_INPUT", e.PROHIBITED_INPUT_CONTENT = "PROHIBITED_INPUT_CONTENT", e.IMAGE_PROHIBITED_INPUT_CONTENT = "IMAGE_PROHIBITED_INPUT_CONTENT", e.INPUT_TEXT_CONTAIN_PROMINENT_PERSON_PROHIBITED = "INPUT_TEXT_CONTAIN_PROMINENT_PERSON_PROHIBITED", e.INPUT_IMAGE_CELEBRITY = "INPUT_IMAGE_CELEBRITY", e.INPUT_IMAGE_PHOTO_REALISTIC_CHILD_PROHIBITED = "INPUT_IMAGE_PHOTO_REALISTIC_CHILD_PROHIBITED", e.INPUT_TEXT_NCII_PROHIBITED = "INPUT_TEXT_NCII_PROHIBITED", e.INPUT_OTHER = "INPUT_OTHER", e.INPUT_IP_PROHIBITED = "INPUT_IP_PROHIBITED", e.BLOCKLIST = "BLOCKLIST", e.UNSAFE_PROMPT_FOR_IMAGE_GENERATION = "UNSAFE_PROMPT_FOR_IMAGE_GENERATION", e.GENERATED_IMAGE_SAFETY = "GENERATED_IMAGE_SAFETY", e.GENERATED_CONTENT_SAFETY = "GENERATED_CONTENT_SAFETY", e.GENERATED_AUDIO_SAFETY = "GENERATED_AUDIO_SAFETY", e.GENERATED_VIDEO_SAFETY = "GENERATED_VIDEO_SAFETY", e.GENERATED_CONTENT_PROHIBITED = "GENERATED_CONTENT_PROHIBITED", e.GENERATED_CONTENT_BLOCKLIST = "GENERATED_CONTENT_BLOCKLIST", e.GENERATED_IMAGE_PROHIBITED = "GENERATED_IMAGE_PROHIBITED", e.GENERATED_IMAGE_CELEBRITY = "GENERATED_IMAGE_CELEBRITY", e.GENERATED_IMAGE_PROMINENT_PEOPLE_DETECTED_BY_REWRITER = "GENERATED_IMAGE_PROMINENT_PEOPLE_DETECTED_BY_REWRITER", e.GENERATED_IMAGE_IDENTIFIABLE_PEOPLE = "GENERATED_IMAGE_IDENTIFIABLE_PEOPLE", e.GENERATED_IMAGE_MINORS = "GENERATED_IMAGE_MINORS", e.OUTPUT_IMAGE_IP_PROHIBITED = "OUTPUT_IMAGE_IP_PROHIBITED", e.GENERATED_OTHER = "GENERATED_OTHER", e.MAX_REGENERATION_REACHED = "MAX_REGENERATION_REACHED";
})(Ym || (Ym = {}));
var zm;
(function(e) {
  e.MODALITY_UNSPECIFIED = "MODALITY_UNSPECIFIED", e.TEXT = "TEXT", e.IMAGE = "IMAGE", e.VIDEO = "VIDEO", e.AUDIO = "AUDIO", e.DOCUMENT = "DOCUMENT";
})(zm || (zm = {}));
var Xm;
(function(e) {
  e.VAD_SIGNAL_TYPE_UNSPECIFIED = "VAD_SIGNAL_TYPE_UNSPECIFIED", e.VAD_SIGNAL_TYPE_SOS = "VAD_SIGNAL_TYPE_SOS", e.VAD_SIGNAL_TYPE_EOS = "VAD_SIGNAL_TYPE_EOS";
})(Xm || (Xm = {}));
var Qm;
(function(e) {
  e.TYPE_UNSPECIFIED = "TYPE_UNSPECIFIED", e.ACTIVITY_START = "ACTIVITY_START", e.ACTIVITY_END = "ACTIVITY_END";
})(Qm || (Qm = {}));
var Zm;
(function(e) {
  e.START_SENSITIVITY_UNSPECIFIED = "START_SENSITIVITY_UNSPECIFIED", e.START_SENSITIVITY_HIGH = "START_SENSITIVITY_HIGH", e.START_SENSITIVITY_LOW = "START_SENSITIVITY_LOW";
})(Zm || (Zm = {}));
var jm;
(function(e) {
  e.END_SENSITIVITY_UNSPECIFIED = "END_SENSITIVITY_UNSPECIFIED", e.END_SENSITIVITY_HIGH = "END_SENSITIVITY_HIGH", e.END_SENSITIVITY_LOW = "END_SENSITIVITY_LOW";
})(jm || (jm = {}));
var eg;
(function(e) {
  e.ACTIVITY_HANDLING_UNSPECIFIED = "ACTIVITY_HANDLING_UNSPECIFIED", e.START_OF_ACTIVITY_INTERRUPTS = "START_OF_ACTIVITY_INTERRUPTS", e.NO_INTERRUPTION = "NO_INTERRUPTION";
})(eg || (eg = {}));
var tg;
(function(e) {
  e.TURN_COVERAGE_UNSPECIFIED = "TURN_COVERAGE_UNSPECIFIED", e.TURN_INCLUDES_ONLY_ACTIVITY = "TURN_INCLUDES_ONLY_ACTIVITY", e.TURN_INCLUDES_ALL_INPUT = "TURN_INCLUDES_ALL_INPUT", e.TURN_INCLUDES_AUDIO_ACTIVITY_AND_ALL_VIDEO = "TURN_INCLUDES_AUDIO_ACTIVITY_AND_ALL_VIDEO";
})(tg || (tg = {}));
var ng;
(function(e) {
  e.SCALE_UNSPECIFIED = "SCALE_UNSPECIFIED", e.C_MAJOR_A_MINOR = "C_MAJOR_A_MINOR", e.D_FLAT_MAJOR_B_FLAT_MINOR = "D_FLAT_MAJOR_B_FLAT_MINOR", e.D_MAJOR_B_MINOR = "D_MAJOR_B_MINOR", e.E_FLAT_MAJOR_C_MINOR = "E_FLAT_MAJOR_C_MINOR", e.E_MAJOR_D_FLAT_MINOR = "E_MAJOR_D_FLAT_MINOR", e.F_MAJOR_D_MINOR = "F_MAJOR_D_MINOR", e.G_FLAT_MAJOR_E_FLAT_MINOR = "G_FLAT_MAJOR_E_FLAT_MINOR", e.G_MAJOR_E_MINOR = "G_MAJOR_E_MINOR", e.A_FLAT_MAJOR_F_MINOR = "A_FLAT_MAJOR_F_MINOR", e.A_MAJOR_G_FLAT_MINOR = "A_MAJOR_G_FLAT_MINOR", e.B_FLAT_MAJOR_G_MINOR = "B_FLAT_MAJOR_G_MINOR", e.B_MAJOR_A_FLAT_MINOR = "B_MAJOR_A_FLAT_MINOR";
})(ng || (ng = {}));
var rg;
(function(e) {
  e.MUSIC_GENERATION_MODE_UNSPECIFIED = "MUSIC_GENERATION_MODE_UNSPECIFIED", e.QUALITY = "QUALITY", e.DIVERSITY = "DIVERSITY", e.VOCALIZATION = "VOCALIZATION";
})(rg || (rg = {}));
var Ao;
(function(e) {
  e.PLAYBACK_CONTROL_UNSPECIFIED = "PLAYBACK_CONTROL_UNSPECIFIED", e.PLAY = "PLAY", e.PAUSE = "PAUSE", e.STOP = "STOP", e.RESET_CONTEXT = "RESET_CONTEXT";
})(Ao || (Ao = {}));
var af = class {
  constructor(e) {
    const t = {};
    for (const n of e.headers.entries()) t[n[0]] = n[1];
    this.headers = t, this.responseInternal = e;
  }
  json() {
    return this.responseInternal.json();
  }
}, Ti = class {
  get text() {
    var e, t, n, r, o, i, s, a;
    if (((r = (n = (t = (e = this.candidates) === null || e === void 0 ? void 0 : e[0]) === null || t === void 0 ? void 0 : t.content) === null || n === void 0 ? void 0 : n.parts) === null || r === void 0 ? void 0 : r.length) === 0) return;
    this.candidates && this.candidates.length > 1 && console.warn("there are multiple candidates in the response, returning text from the first one.");
    let u = "", f = !1;
    const d = [];
    for (const h of (a = (s = (i = (o = this.candidates) === null || o === void 0 ? void 0 : o[0]) === null || i === void 0 ? void 0 : i.content) === null || s === void 0 ? void 0 : s.parts) !== null && a !== void 0 ? a : []) {
      for (const [p, m] of Object.entries(h)) p !== "text" && p !== "thought" && p !== "thoughtSignature" && (m !== null || m !== void 0) && d.push(p);
      if (typeof h.text == "string") {
        if (typeof h.thought == "boolean" && h.thought) continue;
        f = !0, u += h.text;
      }
    }
    return d.length > 0 && console.warn(`there are non-text parts ${d} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`), f ? u : void 0;
  }
  get data() {
    var e, t, n, r, o, i, s, a;
    if (((r = (n = (t = (e = this.candidates) === null || e === void 0 ? void 0 : e[0]) === null || t === void 0 ? void 0 : t.content) === null || n === void 0 ? void 0 : n.parts) === null || r === void 0 ? void 0 : r.length) === 0) return;
    this.candidates && this.candidates.length > 1 && console.warn("there are multiple candidates in the response, returning data from the first one.");
    let u = "";
    const f = [];
    for (const d of (a = (s = (i = (o = this.candidates) === null || o === void 0 ? void 0 : o[0]) === null || i === void 0 ? void 0 : i.content) === null || s === void 0 ? void 0 : s.parts) !== null && a !== void 0 ? a : []) {
      for (const [h, p] of Object.entries(d)) h !== "inlineData" && (p !== null || p !== void 0) && f.push(h);
      d.inlineData && typeof d.inlineData.data == "string" && (u += atob(d.inlineData.data));
    }
    return f.length > 0 && console.warn(`there are non-data parts ${f} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`), u.length > 0 ? btoa(u) : void 0;
  }
  get functionCalls() {
    var e, t, n, r, o, i, s, a;
    if (((r = (n = (t = (e = this.candidates) === null || e === void 0 ? void 0 : e[0]) === null || t === void 0 ? void 0 : t.content) === null || n === void 0 ? void 0 : n.parts) === null || r === void 0 ? void 0 : r.length) === 0) return;
    this.candidates && this.candidates.length > 1 && console.warn("there are multiple candidates in the response, returning function calls from the first one.");
    const u = (a = (s = (i = (o = this.candidates) === null || o === void 0 ? void 0 : o[0]) === null || i === void 0 ? void 0 : i.content) === null || s === void 0 ? void 0 : s.parts) === null || a === void 0 ? void 0 : a.filter((f) => f.functionCall).map((f) => f.functionCall).filter((f) => f !== void 0);
    if (u?.length !== 0)
      return u;
  }
  get executableCode() {
    var e, t, n, r, o, i, s, a, u;
    if (((r = (n = (t = (e = this.candidates) === null || e === void 0 ? void 0 : e[0]) === null || t === void 0 ? void 0 : t.content) === null || n === void 0 ? void 0 : n.parts) === null || r === void 0 ? void 0 : r.length) === 0) return;
    this.candidates && this.candidates.length > 1 && console.warn("there are multiple candidates in the response, returning executable code from the first one.");
    const f = (a = (s = (i = (o = this.candidates) === null || o === void 0 ? void 0 : o[0]) === null || i === void 0 ? void 0 : i.content) === null || s === void 0 ? void 0 : s.parts) === null || a === void 0 ? void 0 : a.filter((d) => d.executableCode).map((d) => d.executableCode).filter((d) => d !== void 0);
    if (f?.length !== 0)
      return (u = f?.[0]) === null || u === void 0 ? void 0 : u.code;
  }
  get codeExecutionResult() {
    var e, t, n, r, o, i, s, a, u;
    if (((r = (n = (t = (e = this.candidates) === null || e === void 0 ? void 0 : e[0]) === null || t === void 0 ? void 0 : t.content) === null || n === void 0 ? void 0 : n.parts) === null || r === void 0 ? void 0 : r.length) === 0) return;
    this.candidates && this.candidates.length > 1 && console.warn("there are multiple candidates in the response, returning code execution result from the first one.");
    const f = (a = (s = (i = (o = this.candidates) === null || o === void 0 ? void 0 : o[0]) === null || i === void 0 ? void 0 : i.content) === null || s === void 0 ? void 0 : s.parts) === null || a === void 0 ? void 0 : a.filter((d) => d.codeExecutionResult).map((d) => d.codeExecutionResult).filter((d) => d !== void 0);
    if (f?.length !== 0)
      return (u = f?.[0]) === null || u === void 0 ? void 0 : u.output;
  }
}, og = class {
}, ig = class {
}, MR = class {
}, NR = class {
}, kR = class {
}, DR = class {
}, sg = class {
}, ag = class {
}, lg = class {
}, LR = class {
}, ug = class yw {
  _fromAPIResponse({ apiResponse: t, _isVertexAI: n }) {
    const r = new yw();
    let o;
    const i = t;
    return n ? o = _R(i) : o = vR(i), Object.assign(r, o), r;
  }
}, cg = class {
}, fg = class {
}, dg = class {
}, hg = class {
}, UR = class {
}, $R = class {
}, FR = class {
}, OR = class vw {
  _fromAPIResponse({ apiResponse: t, _isVertexAI: n }) {
    const r = new vw(), o = bR(t);
    return Object.assign(r, o), r;
  }
}, BR = class {
}, GR = class {
}, VR = class {
}, HR = class {
}, pg = class {
}, qR = class {
  get text() {
    var e, t, n;
    let r = "", o = !1;
    const i = [];
    for (const s of (n = (t = (e = this.serverContent) === null || e === void 0 ? void 0 : e.modelTurn) === null || t === void 0 ? void 0 : t.parts) !== null && n !== void 0 ? n : []) {
      for (const [a, u] of Object.entries(s)) a !== "text" && a !== "thought" && u !== null && i.push(a);
      if (typeof s.text == "string") {
        if (typeof s.thought == "boolean" && s.thought) continue;
        o = !0, r += s.text;
      }
    }
    return i.length > 0 && console.warn(`there are non-text parts ${i} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`), o ? r : void 0;
  }
  get data() {
    var e, t, n;
    let r = "";
    const o = [];
    for (const i of (n = (t = (e = this.serverContent) === null || e === void 0 ? void 0 : e.modelTurn) === null || t === void 0 ? void 0 : t.parts) !== null && n !== void 0 ? n : []) {
      for (const [s, a] of Object.entries(i)) s !== "inlineData" && a !== null && o.push(s);
      i.inlineData && typeof i.inlineData.data == "string" && (r += atob(i.inlineData.data));
    }
    return o.length > 0 && console.warn(`there are non-data parts ${o} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`), r.length > 0 ? btoa(r) : void 0;
  }
}, KR = class {
  get audioChunk() {
    if (this.serverContent && this.serverContent.audioChunks && this.serverContent.audioChunks.length > 0) return this.serverContent.audioChunks[0];
  }
}, JR = class _w {
  _fromAPIResponse({ apiResponse: t, _isVertexAI: n }) {
    const r = new _w(), o = gw(t);
    return Object.assign(r, o), r;
  }
};
function Ae(e, t) {
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
function ww(e, t) {
  const n = Ae(e, t);
  return n ? n.startsWith("publishers/") && e.isVertexAI() ? `projects/${e.getProject()}/locations/${e.getLocation()}/${n}` : n.startsWith("models/") && e.isVertexAI() ? `projects/${e.getProject()}/locations/${e.getLocation()}/publishers/google/${n}` : n : "";
}
function Ew(e) {
  return Array.isArray(e) ? e.map((t) => Cl(t)) : [Cl(e)];
}
function Cl(e) {
  if (typeof e == "object" && e !== null) return e;
  throw new Error(`Could not parse input as Blob. Unsupported blob type: ${typeof e}`);
}
function Tw(e) {
  const t = Cl(e);
  if (t.mimeType && t.mimeType.startsWith("image/")) return t;
  throw new Error(`Unsupported mime type: ${t.mimeType}`);
}
function Sw(e) {
  const t = Cl(e);
  if (t.mimeType && t.mimeType.startsWith("audio/")) return t;
  throw new Error(`Unsupported mime type: ${t.mimeType}`);
}
function mg(e) {
  if (e == null) throw new Error("PartUnion is required");
  if (typeof e == "object") return e;
  if (typeof e == "string") return { text: e };
  throw new Error(`Unsupported part type: ${typeof e}`);
}
function Aw(e) {
  if (e == null || Array.isArray(e) && e.length === 0) throw new Error("PartListUnion is required");
  return Array.isArray(e) ? e.map((t) => mg(t)) : [mg(e)];
}
function lf(e) {
  return e != null && typeof e == "object" && "parts" in e && Array.isArray(e.parts);
}
function gg(e) {
  return e != null && typeof e == "object" && "functionCall" in e;
}
function yg(e) {
  return e != null && typeof e == "object" && "functionResponse" in e;
}
function nt(e) {
  if (e == null) throw new Error("ContentUnion is required");
  return lf(e) ? e : {
    role: "user",
    parts: Aw(e)
  };
}
function Ud(e, t) {
  if (!t) return [];
  if (e.isVertexAI() && Array.isArray(t)) return t.flatMap((n) => {
    const r = nt(n);
    return r.parts && r.parts.length > 0 && r.parts[0].text !== void 0 ? [r.parts[0].text] : [];
  });
  if (e.isVertexAI()) {
    const n = nt(t);
    return n.parts && n.parts.length > 0 && n.parts[0].text !== void 0 ? [n.parts[0].text] : [];
  }
  return Array.isArray(t) ? t.map((n) => nt(n)) : [nt(t)];
}
function At(e) {
  if (e == null || Array.isArray(e) && e.length === 0) throw new Error("contents are required");
  if (!Array.isArray(e)) {
    if (gg(e) || yg(e)) throw new Error("To specify functionCall or functionResponse parts, please wrap them in a Content object, specifying the role for them");
    return [nt(e)];
  }
  const t = [], n = [], r = lf(e[0]);
  for (const o of e) {
    const i = lf(o);
    if (i != r) throw new Error("Mixing Content and Parts is not supported, please group the parts into a the appropriate Content objects and specify the roles for them");
    if (i) t.push(o);
    else {
      if (gg(o) || yg(o)) throw new Error("To specify functionCall or functionResponse parts, please wrap them, and any other parts, in Content objects as appropriate, specifying the role for them");
      n.push(o);
    }
  }
  return r || t.push({
    role: "user",
    parts: Aw(n)
  }), t;
}
function WR(e, t) {
  e.includes("null") && (t.nullable = !0);
  const n = e.filter((r) => r !== "null");
  if (n.length === 1) t.type = Object.values(lr).includes(n[0].toUpperCase()) ? n[0].toUpperCase() : lr.TYPE_UNSPECIFIED;
  else {
    t.anyOf = [];
    for (const r of n) t.anyOf.push({ type: Object.values(lr).includes(r.toUpperCase()) ? r.toUpperCase() : lr.TYPE_UNSPECIFIED });
  }
}
function Do(e) {
  const t = {}, n = ["items"], r = ["anyOf"], o = ["properties"];
  if (e.type && e.anyOf) throw new Error("type and anyOf cannot be both populated.");
  const i = e.anyOf;
  i != null && i.length == 2 && (i[0].type === "null" ? (t.nullable = !0, e = i[1]) : i[1].type === "null" && (t.nullable = !0, e = i[0])), e.type instanceof Array && WR(e.type, t);
  for (const [s, a] of Object.entries(e))
    if (a != null)
      if (s == "type") {
        if (a === "null") throw new Error("type: null can not be the only possible type for the field.");
        if (a instanceof Array) continue;
        t.type = Object.values(lr).includes(a.toUpperCase()) ? a.toUpperCase() : lr.TYPE_UNSPECIFIED;
      } else if (n.includes(s)) t[s] = Do(a);
      else if (r.includes(s)) {
        const u = [];
        for (const f of a) {
          if (f.type == "null") {
            t.nullable = !0;
            continue;
          }
          u.push(Do(f));
        }
        t[s] = u;
      } else if (o.includes(s)) {
        const u = {};
        for (const [f, d] of Object.entries(a)) u[f] = Do(d);
        t[s] = u;
      } else {
        if (s === "additionalProperties") continue;
        t[s] = a;
      }
  return t;
}
function $d(e) {
  return Do(e);
}
function Fd(e) {
  if (typeof e == "object") return e;
  if (typeof e == "string") return { voiceConfig: { prebuiltVoiceConfig: { voiceName: e } } };
  throw new Error(`Unsupported speechConfig type: ${typeof e}`);
}
function Od(e) {
  if ("multiSpeakerVoiceConfig" in e) throw new Error("multiSpeakerVoiceConfig is not supported in the live API.");
  return e;
}
function zo(e) {
  if (e.functionDeclarations) for (const t of e.functionDeclarations)
    t.parameters && (Object.keys(t.parameters).includes("$schema") ? t.parametersJsonSchema || (t.parametersJsonSchema = t.parameters, delete t.parameters) : t.parameters = Do(t.parameters)), t.response && (Object.keys(t.response).includes("$schema") ? t.responseJsonSchema || (t.responseJsonSchema = t.response, delete t.response) : t.response = Do(t.response));
  return e;
}
function Xo(e) {
  if (e == null) throw new Error("tools is required");
  if (!Array.isArray(e)) throw new Error("tools is required and must be an array of Tools");
  const t = [];
  for (const n of e) t.push(n);
  return t;
}
function YR(e, t, n, r = 1) {
  const o = !t.startsWith(`${n}/`) && t.split("/").length === r;
  return e.isVertexAI() ? t.startsWith("projects/") ? t : t.startsWith("locations/") ? `projects/${e.getProject()}/${t}` : t.startsWith(`${n}/`) ? `projects/${e.getProject()}/locations/${e.getLocation()}/${t}` : o ? `projects/${e.getProject()}/locations/${e.getLocation()}/${n}/${t}` : t : o ? `${n}/${t}` : t;
}
function Yn(e, t) {
  if (typeof t != "string") throw new Error("name must be a string");
  return YR(e, t, "cachedContents");
}
function Cw(e) {
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
function vr(e) {
  return Ld(e);
}
function zR(e) {
  return e != null && typeof e == "object" && "name" in e;
}
function XR(e) {
  return e != null && typeof e == "object" && "video" in e;
}
function QR(e) {
  return e != null && typeof e == "object" && "uri" in e;
}
function bw(e) {
  var t;
  let n;
  if (zR(e) && (n = e.name), !(QR(e) && (n = e.uri, n === void 0)) && !(XR(e) && (n = (t = e.video) === null || t === void 0 ? void 0 : t.uri, n === void 0))) {
    if (typeof e == "string" && (n = e), n === void 0) throw new Error("Could not extract file name from the provided input.");
    if (n.startsWith("https://")) {
      const r = n.split("files/")[1].match(/[a-z0-9]+/);
      if (r === null) throw new Error(`Could not extract file name from URI ${n}`);
      n = r[0];
    } else n.startsWith("files/") && (n = n.split("files/")[1]);
    return n;
  }
}
function Iw(e, t) {
  let n;
  return e.isVertexAI() ? n = t ? "publishers/google/models" : "models" : n = t ? "models" : "tunedModels", n;
}
function Rw(e) {
  for (const t of [
    "models",
    "tunedModels",
    "publisherModels"
  ]) if (ZR(e, t)) return e[t];
  return [];
}
function ZR(e, t) {
  return e !== null && typeof e == "object" && t in e;
}
function jR(e, t = {}) {
  const n = e, r = {
    name: n.name,
    description: n.description,
    parametersJsonSchema: n.inputSchema
  };
  return n.outputSchema && (r.responseJsonSchema = n.outputSchema), t.behavior && (r.behavior = t.behavior), { functionDeclarations: [r] };
}
function eP(e, t = {}) {
  const n = [], r = /* @__PURE__ */ new Set();
  for (const o of e) {
    const i = o.name;
    if (r.has(i)) throw new Error(`Duplicate function name ${i} found in MCP tools. Please ensure function names are unique.`);
    r.add(i);
    const s = jR(o, t);
    s.functionDeclarations && n.push(...s.functionDeclarations);
  }
  return { functionDeclarations: n };
}
function Pw(e, t) {
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
  const r = [n.gcsUri, n.bigqueryUri].filter(Boolean).length, o = [n.inlinedRequests, n.fileName].filter(Boolean).length;
  if (e.isVertexAI()) {
    if (o > 0 || r !== 1) throw new Error("Exactly one of `gcsUri` or `bigqueryUri` must be set for Vertex AI.");
  } else if (r > 0 || o !== 1) throw new Error("Exactly one of `inlinedRequests`, `fileName`, must be set for Gemini API.");
  return n;
}
function tP(e) {
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
function xw(e) {
  if (typeof e != "object" || e === null) return {};
  const t = e, n = t.inlinedResponses;
  if (typeof n != "object" || n === null) return e;
  const r = n.inlinedResponses;
  if (!Array.isArray(r) || r.length === 0) return e;
  let o = !1;
  for (const i of r) {
    if (typeof i != "object" || i === null) continue;
    const s = i.response;
    if (!(typeof s != "object" || s === null) && s.embedding !== void 0) {
      o = !0;
      break;
    }
  }
  return o && (t.inlinedEmbedContentResponses = t.inlinedResponses, delete t.inlinedResponses), e;
}
function Qo(e, t) {
  const n = t;
  if (!e.isVertexAI()) {
    if (/batches\/[^/]+$/.test(n)) return n.split("/").pop();
    throw new Error(`Invalid batch job name: ${n}.`);
  }
  if (/^projects\/[^/]+\/locations\/[^/]+\/batchPredictionJobs\/[^/]+$/.test(n)) return n.split("/").pop();
  if (/^\d+$/.test(n)) return n;
  throw new Error(`Invalid batch job name: ${n}.`);
}
function Mw(e) {
  const t = e;
  return t === "BATCH_STATE_UNSPECIFIED" ? "JOB_STATE_UNSPECIFIED" : t === "BATCH_STATE_PENDING" ? "JOB_STATE_PENDING" : t === "BATCH_STATE_RUNNING" ? "JOB_STATE_RUNNING" : t === "BATCH_STATE_SUCCEEDED" ? "JOB_STATE_SUCCEEDED" : t === "BATCH_STATE_FAILED" ? "JOB_STATE_FAILED" : t === "BATCH_STATE_CANCELLED" ? "JOB_STATE_CANCELLED" : t === "BATCH_STATE_EXPIRED" ? "JOB_STATE_EXPIRED" : t;
}
function nP(e) {
  return e.includes("gemini") && e !== "gemini-embedding-001" || e.includes("maas");
}
function rP(e) {
  const t = {}, n = l(e, ["apiKey"]);
  if (n != null && c(t, ["apiKey"], n), l(e, ["apiKeyConfig"]) !== void 0) throw new Error("apiKeyConfig parameter is not supported in Gemini API.");
  if (l(e, ["authType"]) !== void 0) throw new Error("authType parameter is not supported in Gemini API.");
  if (l(e, ["googleServiceAccountConfig"]) !== void 0) throw new Error("googleServiceAccountConfig parameter is not supported in Gemini API.");
  if (l(e, ["httpBasicAuthConfig"]) !== void 0) throw new Error("httpBasicAuthConfig parameter is not supported in Gemini API.");
  if (l(e, ["oauthConfig"]) !== void 0) throw new Error("oauthConfig parameter is not supported in Gemini API.");
  if (l(e, ["oidcConfig"]) !== void 0) throw new Error("oidcConfig parameter is not supported in Gemini API.");
  return t;
}
function oP(e) {
  const t = {}, n = l(e, ["responsesFile"]);
  n != null && c(t, ["fileName"], n);
  const r = l(e, ["inlinedResponses", "inlinedResponses"]);
  if (r != null) {
    let i = r;
    Array.isArray(i) && (i = i.map((s) => FP(s))), c(t, ["inlinedResponses"], i);
  }
  const o = l(e, ["inlinedEmbedContentResponses", "inlinedResponses"]);
  if (o != null) {
    let i = o;
    Array.isArray(i) && (i = i.map((s) => s)), c(t, ["inlinedEmbedContentResponses"], i);
  }
  return t;
}
function iP(e) {
  const t = {}, n = l(e, ["predictionsFormat"]);
  n != null && c(t, ["format"], n);
  const r = l(e, ["gcsDestination", "outputUriPrefix"]);
  r != null && c(t, ["gcsUri"], r);
  const o = l(e, ["bigqueryDestination", "outputUri"]);
  return o != null && c(t, ["bigqueryUri"], o), t;
}
function sP(e) {
  const t = {}, n = l(e, ["format"]);
  n != null && c(t, ["predictionsFormat"], n);
  const r = l(e, ["gcsUri"]);
  r != null && c(t, ["gcsDestination", "outputUriPrefix"], r);
  const o = l(e, ["bigqueryUri"]);
  if (o != null && c(t, ["bigqueryDestination", "outputUri"], o), l(e, ["fileName"]) !== void 0) throw new Error("fileName parameter is not supported in Vertex AI.");
  if (l(e, ["inlinedResponses"]) !== void 0) throw new Error("inlinedResponses parameter is not supported in Vertex AI.");
  if (l(e, ["inlinedEmbedContentResponses"]) !== void 0) throw new Error("inlinedEmbedContentResponses parameter is not supported in Vertex AI.");
  return t;
}
function Ha(e) {
  const t = {}, n = l(e, ["name"]);
  n != null && c(t, ["name"], n);
  const r = l(e, ["metadata", "displayName"]);
  r != null && c(t, ["displayName"], r);
  const o = l(e, ["metadata", "state"]);
  o != null && c(t, ["state"], Mw(o));
  const i = l(e, ["metadata", "createTime"]);
  i != null && c(t, ["createTime"], i);
  const s = l(e, ["metadata", "endTime"]);
  s != null && c(t, ["endTime"], s);
  const a = l(e, ["metadata", "updateTime"]);
  a != null && c(t, ["updateTime"], a);
  const u = l(e, ["metadata", "model"]);
  u != null && c(t, ["model"], u);
  const f = l(e, ["metadata", "output"]);
  return f != null && c(t, ["dest"], oP(xw(f))), t;
}
function uf(e) {
  const t = {}, n = l(e, ["name"]);
  n != null && c(t, ["name"], n);
  const r = l(e, ["displayName"]);
  r != null && c(t, ["displayName"], r);
  const o = l(e, ["state"]);
  o != null && c(t, ["state"], Mw(o));
  const i = l(e, ["error"]);
  i != null && c(t, ["error"], i);
  const s = l(e, ["createTime"]);
  s != null && c(t, ["createTime"], s);
  const a = l(e, ["startTime"]);
  a != null && c(t, ["startTime"], a);
  const u = l(e, ["endTime"]);
  u != null && c(t, ["endTime"], u);
  const f = l(e, ["updateTime"]);
  f != null && c(t, ["updateTime"], f);
  const d = l(e, ["model"]);
  d != null && c(t, ["model"], d);
  const h = l(e, ["inputConfig"]);
  h != null && c(t, ["src"], aP(h));
  const p = l(e, ["outputConfig"]);
  p != null && c(t, ["dest"], iP(xw(p)));
  const m = l(e, ["completionStats"]);
  return m != null && c(t, ["completionStats"], m), t;
}
function aP(e) {
  const t = {}, n = l(e, ["instancesFormat"]);
  n != null && c(t, ["format"], n);
  const r = l(e, ["gcsSource", "uris"]);
  r != null && c(t, ["gcsUri"], r);
  const o = l(e, ["bigquerySource", "inputUri"]);
  return o != null && c(t, ["bigqueryUri"], o), t;
}
function lP(e, t) {
  const n = {};
  if (l(t, ["format"]) !== void 0) throw new Error("format parameter is not supported in Gemini API.");
  if (l(t, ["gcsUri"]) !== void 0) throw new Error("gcsUri parameter is not supported in Gemini API.");
  if (l(t, ["bigqueryUri"]) !== void 0) throw new Error("bigqueryUri parameter is not supported in Gemini API.");
  const r = l(t, ["fileName"]);
  r != null && c(n, ["fileName"], r);
  const o = l(t, ["inlinedRequests"]);
  if (o != null) {
    let i = o;
    Array.isArray(i) && (i = i.map((s) => $P(e, s))), c(n, ["requests", "requests"], i);
  }
  return n;
}
function uP(e) {
  const t = {}, n = l(e, ["format"]);
  n != null && c(t, ["instancesFormat"], n);
  const r = l(e, ["gcsUri"]);
  r != null && c(t, ["gcsSource", "uris"], r);
  const o = l(e, ["bigqueryUri"]);
  if (o != null && c(t, ["bigquerySource", "inputUri"], o), l(e, ["fileName"]) !== void 0) throw new Error("fileName parameter is not supported in Vertex AI.");
  if (l(e, ["inlinedRequests"]) !== void 0) throw new Error("inlinedRequests parameter is not supported in Vertex AI.");
  return t;
}
function cP(e) {
  const t = {}, n = l(e, ["data"]);
  if (n != null && c(t, ["data"], n), l(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const r = l(e, ["mimeType"]);
  return r != null && c(t, ["mimeType"], r), t;
}
function fP(e, t) {
  const n = {}, r = l(t, ["name"]);
  return r != null && c(n, ["_url", "name"], Qo(e, r)), n;
}
function dP(e, t) {
  const n = {}, r = l(t, ["name"]);
  return r != null && c(n, ["_url", "name"], Qo(e, r)), n;
}
function hP(e) {
  const t = {}, n = l(e, ["content"]);
  n != null && c(t, ["content"], n);
  const r = l(e, ["citationMetadata"]);
  r != null && c(t, ["citationMetadata"], pP(r));
  const o = l(e, ["tokenCount"]);
  o != null && c(t, ["tokenCount"], o);
  const i = l(e, ["finishReason"]);
  i != null && c(t, ["finishReason"], i);
  const s = l(e, ["groundingMetadata"]);
  s != null && c(t, ["groundingMetadata"], s);
  const a = l(e, ["avgLogprobs"]);
  a != null && c(t, ["avgLogprobs"], a);
  const u = l(e, ["index"]);
  u != null && c(t, ["index"], u);
  const f = l(e, ["logprobsResult"]);
  f != null && c(t, ["logprobsResult"], f);
  const d = l(e, ["safetyRatings"]);
  if (d != null) {
    let p = d;
    Array.isArray(p) && (p = p.map((m) => m)), c(t, ["safetyRatings"], p);
  }
  const h = l(e, ["urlContextMetadata"]);
  return h != null && c(t, ["urlContextMetadata"], h), t;
}
function pP(e) {
  const t = {}, n = l(e, ["citationSources"]);
  if (n != null) {
    let r = n;
    Array.isArray(r) && (r = r.map((o) => o)), c(t, ["citations"], r);
  }
  return t;
}
function Nw(e) {
  const t = {}, n = l(e, ["parts"]);
  if (n != null) {
    let o = n;
    Array.isArray(o) && (o = o.map((i) => KP(i))), c(t, ["parts"], o);
  }
  const r = l(e, ["role"]);
  return r != null && c(t, ["role"], r), t;
}
function mP(e, t) {
  const n = {}, r = l(e, ["displayName"]);
  if (t !== void 0 && r != null && c(t, ["batch", "displayName"], r), l(e, ["dest"]) !== void 0) throw new Error("dest parameter is not supported in Gemini API.");
  const o = l(e, ["webhookConfig"]);
  return t !== void 0 && o != null && c(t, ["batch", "webhookConfig"], o), n;
}
function gP(e, t) {
  const n = {}, r = l(e, ["displayName"]);
  t !== void 0 && r != null && c(t, ["displayName"], r);
  const o = l(e, ["dest"]);
  if (t !== void 0 && o != null && c(t, ["outputConfig"], sP(tP(o))), l(e, ["webhookConfig"]) !== void 0) throw new Error("webhookConfig parameter is not supported in Vertex AI.");
  return n;
}
function vg(e, t) {
  const n = {}, r = l(t, ["model"]);
  r != null && c(n, ["_url", "model"], Ae(e, r));
  const o = l(t, ["src"]);
  o != null && c(n, ["batch", "inputConfig"], lP(e, Pw(e, o)));
  const i = l(t, ["config"]);
  return i != null && mP(i, n), n;
}
function yP(e, t) {
  const n = {}, r = l(t, ["model"]);
  r != null && c(n, ["model"], Ae(e, r));
  const o = l(t, ["src"]);
  o != null && c(n, ["inputConfig"], uP(Pw(e, o)));
  const i = l(t, ["config"]);
  return i != null && gP(i, n), n;
}
function vP(e, t) {
  const n = {}, r = l(e, ["displayName"]);
  return t !== void 0 && r != null && c(t, ["batch", "displayName"], r), n;
}
function _P(e, t) {
  const n = {}, r = l(t, ["model"]);
  r != null && c(n, ["_url", "model"], Ae(e, r));
  const o = l(t, ["src"]);
  o != null && c(n, ["batch", "inputConfig"], bP(e, o));
  const i = l(t, ["config"]);
  return i != null && vP(i, n), n;
}
function wP(e, t) {
  const n = {}, r = l(t, ["name"]);
  return r != null && c(n, ["_url", "name"], Qo(e, r)), n;
}
function EP(e, t) {
  const n = {}, r = l(t, ["name"]);
  return r != null && c(n, ["_url", "name"], Qo(e, r)), n;
}
function TP(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  n != null && c(t, ["sdkHttpResponse"], n);
  const r = l(e, ["name"]);
  r != null && c(t, ["name"], r);
  const o = l(e, ["done"]);
  o != null && c(t, ["done"], o);
  const i = l(e, ["error"]);
  return i != null && c(t, ["error"], i), t;
}
function SP(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  n != null && c(t, ["sdkHttpResponse"], n);
  const r = l(e, ["name"]);
  r != null && c(t, ["name"], r);
  const o = l(e, ["done"]);
  o != null && c(t, ["done"], o);
  const i = l(e, ["error"]);
  return i != null && c(t, ["error"], i), t;
}
function AP(e, t) {
  const n = {}, r = l(t, ["contents"]);
  if (r != null) {
    let i = Ud(e, r);
    Array.isArray(i) && (i = i.map((s) => s)), c(n, [
      "requests[]",
      "request",
      "content"
    ], i);
  }
  const o = l(t, ["config"]);
  return o != null && (c(n, ["_self"], CP(o, n)), gR(n, { "requests[].*": "requests[].request.*" })), n;
}
function CP(e, t) {
  const n = {}, r = l(e, ["taskType"]);
  t !== void 0 && r != null && c(t, ["requests[]", "taskType"], r);
  const o = l(e, ["title"]);
  t !== void 0 && o != null && c(t, ["requests[]", "title"], o);
  const i = l(e, ["outputDimensionality"]);
  if (t !== void 0 && i != null && c(t, ["requests[]", "outputDimensionality"], i), l(e, ["mimeType"]) !== void 0) throw new Error("mimeType parameter is not supported in Gemini API.");
  if (l(e, ["autoTruncate"]) !== void 0) throw new Error("autoTruncate parameter is not supported in Gemini API.");
  if (l(e, ["documentOcr"]) !== void 0) throw new Error("documentOcr parameter is not supported in Gemini API.");
  if (l(e, ["audioTrackExtraction"]) !== void 0) throw new Error("audioTrackExtraction parameter is not supported in Gemini API.");
  return n;
}
function bP(e, t) {
  const n = {}, r = l(t, ["fileName"]);
  r != null && c(n, ["file_name"], r);
  const o = l(t, ["inlinedRequests"]);
  return o != null && c(n, ["requests"], AP(e, o)), n;
}
function IP(e) {
  const t = {};
  if (l(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const n = l(e, ["fileUri"]);
  n != null && c(t, ["fileUri"], n);
  const r = l(e, ["mimeType"]);
  return r != null && c(t, ["mimeType"], r), t;
}
function RP(e) {
  const t = {}, n = l(e, ["id"]);
  n != null && c(t, ["id"], n);
  const r = l(e, ["args"]);
  r != null && c(t, ["args"], r);
  const o = l(e, ["name"]);
  if (o != null && c(t, ["name"], o), l(e, ["partialArgs"]) !== void 0) throw new Error("partialArgs parameter is not supported in Gemini API.");
  if (l(e, ["willContinue"]) !== void 0) throw new Error("willContinue parameter is not supported in Gemini API.");
  return t;
}
function PP(e) {
  const t = {}, n = l(e, ["allowedFunctionNames"]);
  n != null && c(t, ["allowedFunctionNames"], n);
  const r = l(e, ["mode"]);
  if (r != null && c(t, ["mode"], r), l(e, ["streamFunctionCallArguments"]) !== void 0) throw new Error("streamFunctionCallArguments parameter is not supported in Gemini API.");
  return t;
}
function xP(e, t, n) {
  const r = {}, o = l(t, ["systemInstruction"]);
  n !== void 0 && o != null && c(n, ["systemInstruction"], Nw(nt(o)));
  const i = l(t, ["temperature"]);
  i != null && c(r, ["temperature"], i);
  const s = l(t, ["topP"]);
  s != null && c(r, ["topP"], s);
  const a = l(t, ["topK"]);
  a != null && c(r, ["topK"], a);
  const u = l(t, ["candidateCount"]);
  u != null && c(r, ["candidateCount"], u);
  const f = l(t, ["maxOutputTokens"]);
  f != null && c(r, ["maxOutputTokens"], f);
  const d = l(t, ["stopSequences"]);
  d != null && c(r, ["stopSequences"], d);
  const h = l(t, ["responseLogprobs"]);
  h != null && c(r, ["responseLogprobs"], h);
  const p = l(t, ["logprobs"]);
  p != null && c(r, ["logprobs"], p);
  const m = l(t, ["presencePenalty"]);
  m != null && c(r, ["presencePenalty"], m);
  const g = l(t, ["frequencyPenalty"]);
  g != null && c(r, ["frequencyPenalty"], g);
  const y = l(t, ["seed"]);
  y != null && c(r, ["seed"], y);
  const v = l(t, ["responseMimeType"]);
  v != null && c(r, ["responseMimeType"], v);
  const w = l(t, ["responseSchema"]);
  w != null && c(r, ["responseSchema"], $d(w));
  const _ = l(t, ["responseJsonSchema"]);
  if (_ != null && c(r, ["responseJsonSchema"], _), l(t, ["routingConfig"]) !== void 0) throw new Error("routingConfig parameter is not supported in Gemini API.");
  if (l(t, ["modelSelectionConfig"]) !== void 0) throw new Error("modelSelectionConfig parameter is not supported in Gemini API.");
  const S = l(t, ["safetySettings"]);
  if (n !== void 0 && S != null) {
    let ne = S;
    Array.isArray(ne) && (ne = ne.map((H) => JP(H))), c(n, ["safetySettings"], ne);
  }
  const T = l(t, ["tools"]);
  if (n !== void 0 && T != null) {
    let ne = Xo(T);
    Array.isArray(ne) && (ne = ne.map((H) => YP(zo(H)))), c(n, ["tools"], ne);
  }
  const C = l(t, ["toolConfig"]);
  if (n !== void 0 && C != null && c(n, ["toolConfig"], WP(C)), l(t, ["labels"]) !== void 0) throw new Error("labels parameter is not supported in Gemini API.");
  const E = l(t, ["cachedContent"]);
  n !== void 0 && E != null && c(n, ["cachedContent"], Yn(e, E));
  const M = l(t, ["responseModalities"]);
  M != null && c(r, ["responseModalities"], M);
  const I = l(t, ["mediaResolution"]);
  I != null && c(r, ["mediaResolution"], I);
  const D = l(t, ["speechConfig"]);
  if (D != null && c(r, ["speechConfig"], Fd(D)), l(t, ["audioTimestamp"]) !== void 0) throw new Error("audioTimestamp parameter is not supported in Gemini API.");
  const $ = l(t, ["thinkingConfig"]);
  $ != null && c(r, ["thinkingConfig"], $);
  const q = l(t, ["imageConfig"]);
  q != null && c(r, ["imageConfig"], UP(q));
  const z = l(t, ["enableEnhancedCivicAnswers"]);
  if (z != null && c(r, ["enableEnhancedCivicAnswers"], z), l(t, ["modelArmorConfig"]) !== void 0) throw new Error("modelArmorConfig parameter is not supported in Gemini API.");
  const J = l(t, ["serviceTier"]);
  return n !== void 0 && J != null && c(n, ["serviceTier"], J), r;
}
function MP(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  n != null && c(t, ["sdkHttpResponse"], n);
  const r = l(e, ["candidates"]);
  if (r != null) {
    let f = r;
    Array.isArray(f) && (f = f.map((d) => hP(d))), c(t, ["candidates"], f);
  }
  const o = l(e, ["modelVersion"]);
  o != null && c(t, ["modelVersion"], o);
  const i = l(e, ["promptFeedback"]);
  i != null && c(t, ["promptFeedback"], i);
  const s = l(e, ["responseId"]);
  s != null && c(t, ["responseId"], s);
  const a = l(e, ["usageMetadata"]);
  a != null && c(t, ["usageMetadata"], a);
  const u = l(e, ["modelStatus"]);
  return u != null && c(t, ["modelStatus"], u), t;
}
function NP(e, t) {
  const n = {}, r = l(t, ["name"]);
  return r != null && c(n, ["_url", "name"], Qo(e, r)), n;
}
function kP(e, t) {
  const n = {}, r = l(t, ["name"]);
  return r != null && c(n, ["_url", "name"], Qo(e, r)), n;
}
function DP(e) {
  const t = {}, n = l(e, ["authConfig"]);
  n != null && c(t, ["authConfig"], rP(n));
  const r = l(e, ["enableWidget"]);
  return r != null && c(t, ["enableWidget"], r), t;
}
function LP(e) {
  const t = {}, n = l(e, ["searchTypes"]);
  if (n != null && c(t, ["searchTypes"], n), l(e, ["blockingConfidence"]) !== void 0) throw new Error("blockingConfidence parameter is not supported in Gemini API.");
  if (l(e, ["excludeDomains"]) !== void 0) throw new Error("excludeDomains parameter is not supported in Gemini API.");
  const r = l(e, ["timeRangeFilter"]);
  return r != null && c(t, ["timeRangeFilter"], r), t;
}
function UP(e) {
  const t = {}, n = l(e, ["aspectRatio"]);
  n != null && c(t, ["aspectRatio"], n);
  const r = l(e, ["imageSize"]);
  if (r != null && c(t, ["imageSize"], r), l(e, ["personGeneration"]) !== void 0) throw new Error("personGeneration parameter is not supported in Gemini API.");
  if (l(e, ["prominentPeople"]) !== void 0) throw new Error("prominentPeople parameter is not supported in Gemini API.");
  if (l(e, ["outputMimeType"]) !== void 0) throw new Error("outputMimeType parameter is not supported in Gemini API.");
  if (l(e, ["outputCompressionQuality"]) !== void 0) throw new Error("outputCompressionQuality parameter is not supported in Gemini API.");
  if (l(e, ["imageOutputOptions"]) !== void 0) throw new Error("imageOutputOptions parameter is not supported in Gemini API.");
  return t;
}
function $P(e, t) {
  const n = {}, r = l(t, ["model"]);
  r != null && c(n, ["request", "model"], Ae(e, r));
  const o = l(t, ["contents"]);
  if (o != null) {
    let a = At(o);
    Array.isArray(a) && (a = a.map((u) => Nw(u))), c(n, ["request", "contents"], a);
  }
  const i = l(t, ["metadata"]);
  i != null && c(n, ["metadata"], i);
  const s = l(t, ["config"]);
  return s != null && c(n, ["request", "generationConfig"], xP(e, s, l(n, ["request"], {}))), n;
}
function FP(e) {
  const t = {}, n = l(e, ["response"]);
  n != null && c(t, ["response"], MP(n));
  const r = l(e, ["metadata"]);
  r != null && c(t, ["metadata"], r);
  const o = l(e, ["error"]);
  return o != null && c(t, ["error"], o), t;
}
function OP(e, t) {
  const n = {}, r = l(e, ["pageSize"]);
  t !== void 0 && r != null && c(t, ["_query", "pageSize"], r);
  const o = l(e, ["pageToken"]);
  if (t !== void 0 && o != null && c(t, ["_query", "pageToken"], o), l(e, ["filter"]) !== void 0) throw new Error("filter parameter is not supported in Gemini API.");
  return n;
}
function BP(e, t) {
  const n = {}, r = l(e, ["pageSize"]);
  t !== void 0 && r != null && c(t, ["_query", "pageSize"], r);
  const o = l(e, ["pageToken"]);
  t !== void 0 && o != null && c(t, ["_query", "pageToken"], o);
  const i = l(e, ["filter"]);
  return t !== void 0 && i != null && c(t, ["_query", "filter"], i), n;
}
function GP(e) {
  const t = {}, n = l(e, ["config"]);
  return n != null && OP(n, t), t;
}
function VP(e) {
  const t = {}, n = l(e, ["config"]);
  return n != null && BP(n, t), t;
}
function HP(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  n != null && c(t, ["sdkHttpResponse"], n);
  const r = l(e, ["nextPageToken"]);
  r != null && c(t, ["nextPageToken"], r);
  const o = l(e, ["operations"]);
  if (o != null) {
    let i = o;
    Array.isArray(i) && (i = i.map((s) => Ha(s))), c(t, ["batchJobs"], i);
  }
  return t;
}
function qP(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  n != null && c(t, ["sdkHttpResponse"], n);
  const r = l(e, ["nextPageToken"]);
  r != null && c(t, ["nextPageToken"], r);
  const o = l(e, ["batchPredictionJobs"]);
  if (o != null) {
    let i = o;
    Array.isArray(i) && (i = i.map((s) => uf(s))), c(t, ["batchJobs"], i);
  }
  return t;
}
function KP(e) {
  const t = {}, n = l(e, ["mediaResolution"]);
  n != null && c(t, ["mediaResolution"], n);
  const r = l(e, ["codeExecutionResult"]);
  r != null && c(t, ["codeExecutionResult"], r);
  const o = l(e, ["executableCode"]);
  o != null && c(t, ["executableCode"], o);
  const i = l(e, ["fileData"]);
  i != null && c(t, ["fileData"], IP(i));
  const s = l(e, ["functionCall"]);
  s != null && c(t, ["functionCall"], RP(s));
  const a = l(e, ["functionResponse"]);
  a != null && c(t, ["functionResponse"], a);
  const u = l(e, ["inlineData"]);
  u != null && c(t, ["inlineData"], cP(u));
  const f = l(e, ["text"]);
  f != null && c(t, ["text"], f);
  const d = l(e, ["thought"]);
  d != null && c(t, ["thought"], d);
  const h = l(e, ["thoughtSignature"]);
  h != null && c(t, ["thoughtSignature"], h);
  const p = l(e, ["videoMetadata"]);
  p != null && c(t, ["videoMetadata"], p);
  const m = l(e, ["toolCall"]);
  m != null && c(t, ["toolCall"], m);
  const g = l(e, ["toolResponse"]);
  g != null && c(t, ["toolResponse"], g);
  const y = l(e, ["partMetadata"]);
  return y != null && c(t, ["partMetadata"], y), t;
}
function JP(e) {
  const t = {}, n = l(e, ["category"]);
  if (n != null && c(t, ["category"], n), l(e, ["method"]) !== void 0) throw new Error("method parameter is not supported in Gemini API.");
  const r = l(e, ["threshold"]);
  return r != null && c(t, ["threshold"], r), t;
}
function WP(e) {
  const t = {}, n = l(e, ["retrievalConfig"]);
  n != null && c(t, ["retrievalConfig"], n);
  const r = l(e, ["functionCallingConfig"]);
  r != null && c(t, ["functionCallingConfig"], PP(r));
  const o = l(e, ["includeServerSideToolInvocations"]);
  return o != null && c(t, ["includeServerSideToolInvocations"], o), t;
}
function YP(e) {
  const t = {};
  if (l(e, ["retrieval"]) !== void 0) throw new Error("retrieval parameter is not supported in Gemini API.");
  const n = l(e, ["computerUse"]);
  n != null && c(t, ["computerUse"], n);
  const r = l(e, ["fileSearch"]);
  r != null && c(t, ["fileSearch"], r);
  const o = l(e, ["googleSearch"]);
  o != null && c(t, ["googleSearch"], LP(o));
  const i = l(e, ["googleMaps"]);
  i != null && c(t, ["googleMaps"], DP(i));
  const s = l(e, ["codeExecution"]);
  if (s != null && c(t, ["codeExecution"], s), l(e, ["enterpriseWebSearch"]) !== void 0) throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");
  const a = l(e, ["functionDeclarations"]);
  if (a != null) {
    let h = a;
    Array.isArray(h) && (h = h.map((p) => p)), c(t, ["functionDeclarations"], h);
  }
  const u = l(e, ["googleSearchRetrieval"]);
  if (u != null && c(t, ["googleSearchRetrieval"], u), l(e, ["parallelAiSearch"]) !== void 0) throw new Error("parallelAiSearch parameter is not supported in Gemini API.");
  const f = l(e, ["urlContext"]);
  f != null && c(t, ["urlContext"], f);
  const d = l(e, ["mcpServers"]);
  if (d != null) {
    let h = d;
    Array.isArray(h) && (h = h.map((p) => p)), c(t, ["mcpServers"], h);
  }
  return t;
}
var Kn;
(function(e) {
  e.PAGED_ITEM_BATCH_JOBS = "batchJobs", e.PAGED_ITEM_MODELS = "models", e.PAGED_ITEM_TUNING_JOBS = "tuningJobs", e.PAGED_ITEM_FILES = "files", e.PAGED_ITEM_CACHED_CONTENTS = "cachedContents", e.PAGED_ITEM_FILE_SEARCH_STORES = "fileSearchStores", e.PAGED_ITEM_DOCUMENTS = "documents";
})(Kn || (Kn = {}));
var jr = class {
  constructor(e, t, n, r) {
    this.pageInternal = [], this.paramsInternal = {}, this.requestInternal = t, this.init(e, n, r);
  }
  init(e, t, n) {
    var r, o;
    this.nameInternal = e, this.pageInternal = t[this.nameInternal] || [], this.sdkHttpResponseInternal = t?.sdkHttpResponse, this.idxInternal = 0;
    let i = { config: {} };
    !n || Object.keys(n).length === 0 ? i = { config: {} } : typeof n == "object" ? i = Object.assign({}, n) : i = n, i.config && (i.config.pageToken = t.nextPageToken), this.paramsInternal = i, this.pageInternalSize = (o = (r = i.config) === null || r === void 0 ? void 0 : r.pageSize) !== null && o !== void 0 ? o : this.pageInternal.length;
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
}, zP = class extends Wn {
  constructor(e) {
    super(), this.apiClient = e, this.list = async (t = {}) => new jr(Kn.PAGED_ITEM_BATCH_JOBS, (n) => this.listInternal(n), await this.listInternal(t), t), this.create = async (t) => (this.apiClient.isVertexAI() && (t.config = this.formatDestination(t.src, t.config)), this.createInternal(t)), this.createEmbeddings = async (t) => {
      if (console.warn("batches.createEmbeddings() is experimental and may change without notice."), this.apiClient.isVertexAI()) throw new Error("Vertex AI does not support batches.createEmbeddings.");
      return this.createEmbeddingsInternal(t);
    };
  }
  createInlinedGenerateContentRequest(e) {
    const t = vg(this.apiClient, e), n = t._url, r = X("{model}:batchGenerateContent", n), o = t.batch.inputConfig.requests, i = o.requests, s = [];
    for (const a of i) {
      const u = Object.assign({}, a);
      if (u.systemInstruction) {
        const f = u.systemInstruction;
        delete u.systemInstruction;
        const d = u.request;
        d.systemInstruction = f, u.request = d;
      }
      s.push(u);
    }
    return o.requests = s, delete t.config, delete t._url, delete t._query, {
      path: r,
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
    const n = t ? Object.assign({}, t) : {}, r = Date.now().toString();
    if (n.displayName || (n.displayName = `genaiBatchJob_${r}`), n.dest === void 0) {
      const o = this.getGcsUri(e), i = this.getBigqueryUri(e);
      if (o) o.endsWith(".jsonl") ? n.dest = `${o.slice(0, -6)}/dest` : n.dest = `${o}_dest_${r}`;
      else if (i) n.dest = `${i}_dest_${r}`;
      else throw new Error("Unsupported source for Vertex AI: No GCS or BigQuery URI found.");
    }
    return n;
  }
  async createInternal(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = yP(this.apiClient, e);
      return s = X("batchPredictionJobs", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json()), i.then((f) => uf(f));
    } else {
      const u = vg(this.apiClient, e);
      return s = X("{model}:batchGenerateContent", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json()), i.then((f) => Ha(f));
    }
  }
  async createEmbeddingsInternal(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const s = _P(this.apiClient, e);
      return o = X("{model}:asyncBatchEmbedContent", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json()), r.then((a) => Ha(a));
    }
  }
  async get(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = kP(this.apiClient, e);
      return s = X("batchPredictionJobs/{name}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json()), i.then((f) => uf(f));
    } else {
      const u = NP(this.apiClient, e);
      return s = X("batches/{name}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json()), i.then((f) => Ha(f));
    }
  }
  async cancel(e) {
    var t, n, r, o;
    let i = "", s = {};
    if (this.apiClient.isVertexAI()) {
      const a = dP(this.apiClient, e);
      i = X("batchPredictionJobs/{name}:cancel", a._url), s = a._query, delete a._url, delete a._query, await this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      });
    } else {
      const a = fP(this.apiClient, e);
      i = X("batches/{name}:cancel", a._url), s = a._query, delete a._url, delete a._query, await this.apiClient.request({
        path: i,
        queryParams: s,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      });
    }
  }
  async listInternal(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = VP(e);
      return s = X("batchPredictionJobs", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = qP(f), h = new pg();
        return Object.assign(h, d), h;
      });
    } else {
      const u = GP(e);
      return s = X("batches", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = HP(f), h = new pg();
        return Object.assign(h, d), h;
      });
    }
  }
  async delete(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = EP(this.apiClient, e);
      return s = X("batchPredictionJobs/{name}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "DELETE",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => SP(f));
    } else {
      const u = wP(this.apiClient, e);
      return s = X("batches/{name}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "DELETE",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => TP(f));
    }
  }
};
function XP(e) {
  const t = {}, n = l(e, ["apiKey"]);
  if (n != null && c(t, ["apiKey"], n), l(e, ["apiKeyConfig"]) !== void 0) throw new Error("apiKeyConfig parameter is not supported in Gemini API.");
  if (l(e, ["authType"]) !== void 0) throw new Error("authType parameter is not supported in Gemini API.");
  if (l(e, ["googleServiceAccountConfig"]) !== void 0) throw new Error("googleServiceAccountConfig parameter is not supported in Gemini API.");
  if (l(e, ["httpBasicAuthConfig"]) !== void 0) throw new Error("httpBasicAuthConfig parameter is not supported in Gemini API.");
  if (l(e, ["oauthConfig"]) !== void 0) throw new Error("oauthConfig parameter is not supported in Gemini API.");
  if (l(e, ["oidcConfig"]) !== void 0) throw new Error("oidcConfig parameter is not supported in Gemini API.");
  return t;
}
function QP(e) {
  const t = {}, n = l(e, ["data"]);
  if (n != null && c(t, ["data"], n), l(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const r = l(e, ["mimeType"]);
  return r != null && c(t, ["mimeType"], r), t;
}
function _g(e) {
  const t = {}, n = l(e, ["parts"]);
  if (n != null) {
    let o = n;
    Array.isArray(o) && (o = o.map((i) => wx(i))), c(t, ["parts"], o);
  }
  const r = l(e, ["role"]);
  return r != null && c(t, ["role"], r), t;
}
function wg(e) {
  const t = {}, n = l(e, ["parts"]);
  if (n != null) {
    let o = n;
    Array.isArray(o) && (o = o.map((i) => Ex(i))), c(t, ["parts"], o);
  }
  const r = l(e, ["role"]);
  return r != null && c(t, ["role"], r), t;
}
function ZP(e, t) {
  const n = {}, r = l(e, ["ttl"]);
  t !== void 0 && r != null && c(t, ["ttl"], r);
  const o = l(e, ["expireTime"]);
  t !== void 0 && o != null && c(t, ["expireTime"], o);
  const i = l(e, ["displayName"]);
  t !== void 0 && i != null && c(t, ["displayName"], i);
  const s = l(e, ["contents"]);
  if (t !== void 0 && s != null) {
    let d = At(s);
    Array.isArray(d) && (d = d.map((h) => _g(h))), c(t, ["contents"], d);
  }
  const a = l(e, ["systemInstruction"]);
  t !== void 0 && a != null && c(t, ["systemInstruction"], _g(nt(a)));
  const u = l(e, ["tools"]);
  if (t !== void 0 && u != null) {
    let d = u;
    Array.isArray(d) && (d = d.map((h) => Ax(h))), c(t, ["tools"], d);
  }
  const f = l(e, ["toolConfig"]);
  if (t !== void 0 && f != null && c(t, ["toolConfig"], Tx(f)), l(e, ["kmsKeyName"]) !== void 0) throw new Error("kmsKeyName parameter is not supported in Gemini API.");
  return n;
}
function jP(e, t) {
  const n = {}, r = l(e, ["ttl"]);
  t !== void 0 && r != null && c(t, ["ttl"], r);
  const o = l(e, ["expireTime"]);
  t !== void 0 && o != null && c(t, ["expireTime"], o);
  const i = l(e, ["displayName"]);
  t !== void 0 && i != null && c(t, ["displayName"], i);
  const s = l(e, ["contents"]);
  if (t !== void 0 && s != null) {
    let h = At(s);
    Array.isArray(h) && (h = h.map((p) => wg(p))), c(t, ["contents"], h);
  }
  const a = l(e, ["systemInstruction"]);
  t !== void 0 && a != null && c(t, ["systemInstruction"], wg(nt(a)));
  const u = l(e, ["tools"]);
  if (t !== void 0 && u != null) {
    let h = u;
    Array.isArray(h) && (h = h.map((p) => Cx(p))), c(t, ["tools"], h);
  }
  const f = l(e, ["toolConfig"]);
  t !== void 0 && f != null && c(t, ["toolConfig"], Sx(f));
  const d = l(e, ["kmsKeyName"]);
  return t !== void 0 && d != null && c(t, ["encryption_spec", "kmsKeyName"], d), n;
}
function ex(e, t) {
  const n = {}, r = l(t, ["model"]);
  r != null && c(n, ["model"], ww(e, r));
  const o = l(t, ["config"]);
  return o != null && ZP(o, n), n;
}
function tx(e, t) {
  const n = {}, r = l(t, ["model"]);
  r != null && c(n, ["model"], ww(e, r));
  const o = l(t, ["config"]);
  return o != null && jP(o, n), n;
}
function nx(e, t) {
  const n = {}, r = l(t, ["name"]);
  return r != null && c(n, ["_url", "name"], Yn(e, r)), n;
}
function rx(e, t) {
  const n = {}, r = l(t, ["name"]);
  return r != null && c(n, ["_url", "name"], Yn(e, r)), n;
}
function ox(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  return n != null && c(t, ["sdkHttpResponse"], n), t;
}
function ix(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  return n != null && c(t, ["sdkHttpResponse"], n), t;
}
function sx(e) {
  const t = {};
  if (l(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const n = l(e, ["fileUri"]);
  n != null && c(t, ["fileUri"], n);
  const r = l(e, ["mimeType"]);
  return r != null && c(t, ["mimeType"], r), t;
}
function ax(e) {
  const t = {}, n = l(e, ["id"]);
  n != null && c(t, ["id"], n);
  const r = l(e, ["args"]);
  r != null && c(t, ["args"], r);
  const o = l(e, ["name"]);
  if (o != null && c(t, ["name"], o), l(e, ["partialArgs"]) !== void 0) throw new Error("partialArgs parameter is not supported in Gemini API.");
  if (l(e, ["willContinue"]) !== void 0) throw new Error("willContinue parameter is not supported in Gemini API.");
  return t;
}
function lx(e) {
  const t = {}, n = l(e, ["allowedFunctionNames"]);
  n != null && c(t, ["allowedFunctionNames"], n);
  const r = l(e, ["mode"]);
  if (r != null && c(t, ["mode"], r), l(e, ["streamFunctionCallArguments"]) !== void 0) throw new Error("streamFunctionCallArguments parameter is not supported in Gemini API.");
  return t;
}
function ux(e) {
  const t = {}, n = l(e, ["description"]);
  n != null && c(t, ["description"], n);
  const r = l(e, ["name"]);
  r != null && c(t, ["name"], r);
  const o = l(e, ["parameters"]);
  o != null && c(t, ["parameters"], o);
  const i = l(e, ["parametersJsonSchema"]);
  i != null && c(t, ["parametersJsonSchema"], i);
  const s = l(e, ["response"]);
  s != null && c(t, ["response"], s);
  const a = l(e, ["responseJsonSchema"]);
  if (a != null && c(t, ["responseJsonSchema"], a), l(e, ["behavior"]) !== void 0) throw new Error("behavior parameter is not supported in Vertex AI.");
  return t;
}
function cx(e, t) {
  const n = {}, r = l(t, ["name"]);
  return r != null && c(n, ["_url", "name"], Yn(e, r)), n;
}
function fx(e, t) {
  const n = {}, r = l(t, ["name"]);
  return r != null && c(n, ["_url", "name"], Yn(e, r)), n;
}
function dx(e) {
  const t = {}, n = l(e, ["authConfig"]);
  n != null && c(t, ["authConfig"], XP(n));
  const r = l(e, ["enableWidget"]);
  return r != null && c(t, ["enableWidget"], r), t;
}
function hx(e) {
  const t = {}, n = l(e, ["searchTypes"]);
  if (n != null && c(t, ["searchTypes"], n), l(e, ["blockingConfidence"]) !== void 0) throw new Error("blockingConfidence parameter is not supported in Gemini API.");
  if (l(e, ["excludeDomains"]) !== void 0) throw new Error("excludeDomains parameter is not supported in Gemini API.");
  const r = l(e, ["timeRangeFilter"]);
  return r != null && c(t, ["timeRangeFilter"], r), t;
}
function px(e, t) {
  const n = {}, r = l(e, ["pageSize"]);
  t !== void 0 && r != null && c(t, ["_query", "pageSize"], r);
  const o = l(e, ["pageToken"]);
  return t !== void 0 && o != null && c(t, ["_query", "pageToken"], o), n;
}
function mx(e, t) {
  const n = {}, r = l(e, ["pageSize"]);
  t !== void 0 && r != null && c(t, ["_query", "pageSize"], r);
  const o = l(e, ["pageToken"]);
  return t !== void 0 && o != null && c(t, ["_query", "pageToken"], o), n;
}
function gx(e) {
  const t = {}, n = l(e, ["config"]);
  return n != null && px(n, t), t;
}
function yx(e) {
  const t = {}, n = l(e, ["config"]);
  return n != null && mx(n, t), t;
}
function vx(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  n != null && c(t, ["sdkHttpResponse"], n);
  const r = l(e, ["nextPageToken"]);
  r != null && c(t, ["nextPageToken"], r);
  const o = l(e, ["cachedContents"]);
  if (o != null) {
    let i = o;
    Array.isArray(i) && (i = i.map((s) => s)), c(t, ["cachedContents"], i);
  }
  return t;
}
function _x(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  n != null && c(t, ["sdkHttpResponse"], n);
  const r = l(e, ["nextPageToken"]);
  r != null && c(t, ["nextPageToken"], r);
  const o = l(e, ["cachedContents"]);
  if (o != null) {
    let i = o;
    Array.isArray(i) && (i = i.map((s) => s)), c(t, ["cachedContents"], i);
  }
  return t;
}
function wx(e) {
  const t = {}, n = l(e, ["mediaResolution"]);
  n != null && c(t, ["mediaResolution"], n);
  const r = l(e, ["codeExecutionResult"]);
  r != null && c(t, ["codeExecutionResult"], r);
  const o = l(e, ["executableCode"]);
  o != null && c(t, ["executableCode"], o);
  const i = l(e, ["fileData"]);
  i != null && c(t, ["fileData"], sx(i));
  const s = l(e, ["functionCall"]);
  s != null && c(t, ["functionCall"], ax(s));
  const a = l(e, ["functionResponse"]);
  a != null && c(t, ["functionResponse"], a);
  const u = l(e, ["inlineData"]);
  u != null && c(t, ["inlineData"], QP(u));
  const f = l(e, ["text"]);
  f != null && c(t, ["text"], f);
  const d = l(e, ["thought"]);
  d != null && c(t, ["thought"], d);
  const h = l(e, ["thoughtSignature"]);
  h != null && c(t, ["thoughtSignature"], h);
  const p = l(e, ["videoMetadata"]);
  p != null && c(t, ["videoMetadata"], p);
  const m = l(e, ["toolCall"]);
  m != null && c(t, ["toolCall"], m);
  const g = l(e, ["toolResponse"]);
  g != null && c(t, ["toolResponse"], g);
  const y = l(e, ["partMetadata"]);
  return y != null && c(t, ["partMetadata"], y), t;
}
function Ex(e) {
  const t = {}, n = l(e, ["mediaResolution"]);
  n != null && c(t, ["mediaResolution"], n);
  const r = l(e, ["codeExecutionResult"]);
  r != null && c(t, ["codeExecutionResult"], r);
  const o = l(e, ["executableCode"]);
  o != null && c(t, ["executableCode"], o);
  const i = l(e, ["fileData"]);
  i != null && c(t, ["fileData"], i);
  const s = l(e, ["functionCall"]);
  s != null && c(t, ["functionCall"], s);
  const a = l(e, ["functionResponse"]);
  a != null && c(t, ["functionResponse"], a);
  const u = l(e, ["inlineData"]);
  u != null && c(t, ["inlineData"], u);
  const f = l(e, ["text"]);
  f != null && c(t, ["text"], f);
  const d = l(e, ["thought"]);
  d != null && c(t, ["thought"], d);
  const h = l(e, ["thoughtSignature"]);
  h != null && c(t, ["thoughtSignature"], h);
  const p = l(e, ["videoMetadata"]);
  if (p != null && c(t, ["videoMetadata"], p), l(e, ["toolCall"]) !== void 0) throw new Error("toolCall parameter is not supported in Vertex AI.");
  if (l(e, ["toolResponse"]) !== void 0) throw new Error("toolResponse parameter is not supported in Vertex AI.");
  if (l(e, ["partMetadata"]) !== void 0) throw new Error("partMetadata parameter is not supported in Vertex AI.");
  return t;
}
function Tx(e) {
  const t = {}, n = l(e, ["retrievalConfig"]);
  n != null && c(t, ["retrievalConfig"], n);
  const r = l(e, ["functionCallingConfig"]);
  r != null && c(t, ["functionCallingConfig"], lx(r));
  const o = l(e, ["includeServerSideToolInvocations"]);
  return o != null && c(t, ["includeServerSideToolInvocations"], o), t;
}
function Sx(e) {
  const t = {}, n = l(e, ["retrievalConfig"]);
  n != null && c(t, ["retrievalConfig"], n);
  const r = l(e, ["functionCallingConfig"]);
  if (r != null && c(t, ["functionCallingConfig"], r), l(e, ["includeServerSideToolInvocations"]) !== void 0) throw new Error("includeServerSideToolInvocations parameter is not supported in Vertex AI.");
  return t;
}
function Ax(e) {
  const t = {};
  if (l(e, ["retrieval"]) !== void 0) throw new Error("retrieval parameter is not supported in Gemini API.");
  const n = l(e, ["computerUse"]);
  n != null && c(t, ["computerUse"], n);
  const r = l(e, ["fileSearch"]);
  r != null && c(t, ["fileSearch"], r);
  const o = l(e, ["googleSearch"]);
  o != null && c(t, ["googleSearch"], hx(o));
  const i = l(e, ["googleMaps"]);
  i != null && c(t, ["googleMaps"], dx(i));
  const s = l(e, ["codeExecution"]);
  if (s != null && c(t, ["codeExecution"], s), l(e, ["enterpriseWebSearch"]) !== void 0) throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");
  const a = l(e, ["functionDeclarations"]);
  if (a != null) {
    let h = a;
    Array.isArray(h) && (h = h.map((p) => p)), c(t, ["functionDeclarations"], h);
  }
  const u = l(e, ["googleSearchRetrieval"]);
  if (u != null && c(t, ["googleSearchRetrieval"], u), l(e, ["parallelAiSearch"]) !== void 0) throw new Error("parallelAiSearch parameter is not supported in Gemini API.");
  const f = l(e, ["urlContext"]);
  f != null && c(t, ["urlContext"], f);
  const d = l(e, ["mcpServers"]);
  if (d != null) {
    let h = d;
    Array.isArray(h) && (h = h.map((p) => p)), c(t, ["mcpServers"], h);
  }
  return t;
}
function Cx(e) {
  const t = {}, n = l(e, ["retrieval"]);
  n != null && c(t, ["retrieval"], n);
  const r = l(e, ["computerUse"]);
  if (r != null && c(t, ["computerUse"], r), l(e, ["fileSearch"]) !== void 0) throw new Error("fileSearch parameter is not supported in Vertex AI.");
  const o = l(e, ["googleSearch"]);
  o != null && c(t, ["googleSearch"], o);
  const i = l(e, ["googleMaps"]);
  i != null && c(t, ["googleMaps"], i);
  const s = l(e, ["codeExecution"]);
  s != null && c(t, ["codeExecution"], s);
  const a = l(e, ["enterpriseWebSearch"]);
  a != null && c(t, ["enterpriseWebSearch"], a);
  const u = l(e, ["functionDeclarations"]);
  if (u != null) {
    let p = u;
    Array.isArray(p) && (p = p.map((m) => ux(m))), c(t, ["functionDeclarations"], p);
  }
  const f = l(e, ["googleSearchRetrieval"]);
  f != null && c(t, ["googleSearchRetrieval"], f);
  const d = l(e, ["parallelAiSearch"]);
  d != null && c(t, ["parallelAiSearch"], d);
  const h = l(e, ["urlContext"]);
  if (h != null && c(t, ["urlContext"], h), l(e, ["mcpServers"]) !== void 0) throw new Error("mcpServers parameter is not supported in Vertex AI.");
  return t;
}
function bx(e, t) {
  const n = {}, r = l(e, ["ttl"]);
  t !== void 0 && r != null && c(t, ["ttl"], r);
  const o = l(e, ["expireTime"]);
  return t !== void 0 && o != null && c(t, ["expireTime"], o), n;
}
function Ix(e, t) {
  const n = {}, r = l(e, ["ttl"]);
  t !== void 0 && r != null && c(t, ["ttl"], r);
  const o = l(e, ["expireTime"]);
  return t !== void 0 && o != null && c(t, ["expireTime"], o), n;
}
function Rx(e, t) {
  const n = {}, r = l(t, ["name"]);
  r != null && c(n, ["_url", "name"], Yn(e, r));
  const o = l(t, ["config"]);
  return o != null && bx(o, n), n;
}
function Px(e, t) {
  const n = {}, r = l(t, ["name"]);
  r != null && c(n, ["_url", "name"], Yn(e, r));
  const o = l(t, ["config"]);
  return o != null && Ix(o, n), n;
}
var xx = class extends Wn {
  constructor(e) {
    super(), this.apiClient = e, this.list = async (t = {}) => new jr(Kn.PAGED_ITEM_CACHED_CONTENTS, (n) => this.listInternal(n), await this.listInternal(t), t);
  }
  async create(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = tx(this.apiClient, e);
      return s = X("cachedContents", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json()), i.then((f) => f);
    } else {
      const u = ex(this.apiClient, e);
      return s = X("cachedContents", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json()), i.then((f) => f);
    }
  }
  async get(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = fx(this.apiClient, e);
      return s = X("{name}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json()), i.then((f) => f);
    } else {
      const u = cx(this.apiClient, e);
      return s = X("{name}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json()), i.then((f) => f);
    }
  }
  async delete(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = rx(this.apiClient, e);
      return s = X("{name}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "DELETE",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = ix(f), h = new dg();
        return Object.assign(h, d), h;
      });
    } else {
      const u = nx(this.apiClient, e);
      return s = X("{name}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "DELETE",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = ox(f), h = new dg();
        return Object.assign(h, d), h;
      });
    }
  }
  async update(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = Px(this.apiClient, e);
      return s = X("{name}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "PATCH",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json()), i.then((f) => f);
    } else {
      const u = Rx(this.apiClient, e);
      return s = X("{name}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "PATCH",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json()), i.then((f) => f);
    }
  }
  async listInternal(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = yx(e);
      return s = X("cachedContents", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = _x(f), h = new hg();
        return Object.assign(h, d), h;
      });
    } else {
      const u = gx(e);
      return s = X("cachedContents", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = vx(f), h = new hg();
        return Object.assign(h, d), h;
      });
    }
  }
};
function ur(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++) t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Eg(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number") return { next: function() {
    return e && r >= e.length && (e = void 0), {
      value: e && e[r++],
      done: !e
    };
  } };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function ge(e) {
  return this instanceof ge ? (this.v = e, this) : new ge(e);
}
function nn(e, t, n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = n.apply(e, t || []), o, i = [];
  return o = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), a("next"), a("throw"), a("return", s), o[Symbol.asyncIterator] = function() {
    return this;
  }, o;
  function s(m) {
    return function(g) {
      return Promise.resolve(g).then(m, h);
    };
  }
  function a(m, g) {
    r[m] && (o[m] = function(y) {
      return new Promise(function(v, w) {
        i.push([
          m,
          y,
          v,
          w
        ]) > 1 || u(m, y);
      });
    }, g && (o[m] = g(o[m])));
  }
  function u(m, g) {
    try {
      f(r[m](g));
    } catch (y) {
      p(i[0][3], y);
    }
  }
  function f(m) {
    m.value instanceof ge ? Promise.resolve(m.value.v).then(d, h) : p(i[0][2], m);
  }
  function d(m) {
    u("next", m);
  }
  function h(m) {
    u("throw", m);
  }
  function p(m, g) {
    m(g), i.shift(), i.length && u(i[0][0], i[0][1]);
  }
}
function rn(e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator], n;
  return t ? t.call(e) : (e = typeof Eg == "function" ? Eg(e) : e[Symbol.iterator](), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n);
  function r(i) {
    n[i] = e[i] && function(s) {
      return new Promise(function(a, u) {
        s = e[i](s), o(a, u, s.done, s.value);
      });
    };
  }
  function o(i, s, a, u) {
    Promise.resolve(u).then(function(f) {
      i({
        value: f,
        done: a
      });
    }, s);
  }
}
function Mx(e) {
  var t;
  if (e.candidates == null || e.candidates.length === 0) return !1;
  const n = (t = e.candidates[0]) === null || t === void 0 ? void 0 : t.content;
  return n === void 0 ? !1 : kw(n);
}
function kw(e) {
  if (e.parts === void 0 || e.parts.length === 0) return !1;
  for (const t of e.parts) if (t === void 0 || Object.keys(t).length === 0) return !1;
  return !0;
}
function Nx(e) {
  if (e.length !== 0) {
    for (const t of e) if (t.role !== "user" && t.role !== "model") throw new Error(`Role must be user or model, but got ${t.role}.`);
  }
}
function Tg(e) {
  if (e === void 0 || e.length === 0) return [];
  const t = [], n = e.length;
  let r = 0;
  for (; r < n; ) if (e[r].role === "user")
    t.push(e[r]), r++;
  else {
    const o = [];
    let i = !0;
    for (; r < n && e[r].role === "model"; )
      o.push(e[r]), i && !kw(e[r]) && (i = !1), r++;
    i ? t.push(...o) : t.pop();
  }
  return t;
}
var kx = class {
  constructor(e, t) {
    this.modelsModule = e, this.apiClient = t;
  }
  create(e) {
    return new Dx(this.apiClient, this.modelsModule, e.model, e.config, structuredClone(e.history));
  }
}, Dx = class {
  constructor(e, t, n, r = {}, o = []) {
    this.apiClient = e, this.modelsModule = t, this.model = n, this.config = r, this.history = o, this.sendPromise = Promise.resolve(), Nx(o);
  }
  async sendMessage(e) {
    var t;
    await this.sendPromise;
    const n = nt(e.message), r = this.modelsModule.generateContent({
      model: this.model,
      contents: this.getHistory(!0).concat(n),
      config: (t = e.config) !== null && t !== void 0 ? t : this.config
    });
    return this.sendPromise = (async () => {
      var o, i, s;
      const a = await r, u = (i = (o = a.candidates) === null || o === void 0 ? void 0 : o[0]) === null || i === void 0 ? void 0 : i.content, f = a.automaticFunctionCallingHistory, d = this.getHistory(!0).length;
      let h = [];
      f != null && (h = (s = f.slice(d)) !== null && s !== void 0 ? s : []);
      const p = u ? [u] : [];
      this.recordHistory(n, p, h);
    })(), await this.sendPromise.catch(() => {
      this.sendPromise = Promise.resolve();
    }), r;
  }
  async sendMessageStream(e) {
    var t;
    await this.sendPromise;
    const n = nt(e.message), r = this.modelsModule.generateContentStream({
      model: this.model,
      contents: this.getHistory(!0).concat(n),
      config: (t = e.config) !== null && t !== void 0 ? t : this.config
    });
    this.sendPromise = r.then(() => {
    }).catch(() => {
    });
    const o = await r;
    return this.processStreamResponse(o, n);
  }
  getHistory(e = !1) {
    const t = e ? Tg(this.history) : this.history;
    return structuredClone(t);
  }
  processStreamResponse(e, t) {
    return nn(this, arguments, function* () {
      var r, o, i, s, a, u;
      const f = [];
      try {
        for (var d = !0, h = rn(e), p; p = yield ge(h.next()), r = p.done, !r; d = !0) {
          s = p.value, d = !1;
          const m = s;
          if (Mx(m)) {
            const g = (u = (a = m.candidates) === null || a === void 0 ? void 0 : a[0]) === null || u === void 0 ? void 0 : u.content;
            g !== void 0 && f.push(g);
          }
          yield yield ge(m);
        }
      } catch (m) {
        o = { error: m };
      } finally {
        try {
          !d && !r && (i = h.return) && (yield ge(i.call(h)));
        } finally {
          if (o) throw o.error;
        }
      }
      this.recordHistory(t, f);
    });
  }
  recordHistory(e, t, n) {
    let r = [];
    t.length > 0 && t.every((o) => o.role !== void 0) ? r = t : r.push({
      role: "model",
      parts: []
    }), n && n.length > 0 ? this.history.push(...Tg(n)) : this.history.push(e), this.history.push(...r);
  }
}, Dw = class Lw extends Error {
  constructor(t) {
    super(t.message), this.name = "ApiError", this.status = t.status, Object.setPrototypeOf(this, Lw.prototype);
  }
};
function Lx(e) {
  const t = {}, n = l(e, ["file"]);
  return n != null && c(t, ["file"], n), t;
}
function Ux(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  return n != null && c(t, ["sdkHttpResponse"], n), t;
}
function $x(e) {
  const t = {}, n = l(e, ["name"]);
  return n != null && c(t, ["_url", "file"], bw(n)), t;
}
function Fx(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  return n != null && c(t, ["sdkHttpResponse"], n), t;
}
function Ox(e) {
  const t = {}, n = l(e, ["name"]);
  return n != null && c(t, ["_url", "file"], bw(n)), t;
}
function Bx(e) {
  const t = {}, n = l(e, ["uris"]);
  return n != null && c(t, ["uris"], n), t;
}
function Gx(e, t) {
  const n = {}, r = l(e, ["pageSize"]);
  t !== void 0 && r != null && c(t, ["_query", "pageSize"], r);
  const o = l(e, ["pageToken"]);
  return t !== void 0 && o != null && c(t, ["_query", "pageToken"], o), n;
}
function Vx(e) {
  const t = {}, n = l(e, ["config"]);
  return n != null && Gx(n, t), t;
}
function Hx(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  n != null && c(t, ["sdkHttpResponse"], n);
  const r = l(e, ["nextPageToken"]);
  r != null && c(t, ["nextPageToken"], r);
  const o = l(e, ["files"]);
  if (o != null) {
    let i = o;
    Array.isArray(i) && (i = i.map((s) => s)), c(t, ["files"], i);
  }
  return t;
}
function qx(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  n != null && c(t, ["sdkHttpResponse"], n);
  const r = l(e, ["files"]);
  if (r != null) {
    let o = r;
    Array.isArray(o) && (o = o.map((i) => i)), c(t, ["files"], o);
  }
  return t;
}
var Kx = class extends Wn {
  constructor(e) {
    super(), this.apiClient = e, this.list = async (t = {}) => new jr(Kn.PAGED_ITEM_FILES, (n) => this.listInternal(n), await this.listInternal(t), t);
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
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const s = Vx(e);
      return o = X("files", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json().then((u) => {
        const f = u;
        return f.sdkHttpResponse = { headers: a.headers }, f;
      })), r.then((a) => {
        const u = Hx(a), f = new BR();
        return Object.assign(f, u), f;
      });
    }
  }
  async createInternal(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const s = Lx(e);
      return o = X("upload/v1beta/files", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json()), r.then((a) => {
        const u = Ux(a), f = new GR();
        return Object.assign(f, u), f;
      });
    }
  }
  async get(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const s = Ox(e);
      return o = X("files/{file}", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json()), r.then((a) => a);
    }
  }
  async delete(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const s = $x(e);
      return o = X("files/{file}", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "DELETE",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json().then((u) => {
        const f = u;
        return f.sdkHttpResponse = { headers: a.headers }, f;
      })), r.then((a) => {
        const u = Fx(a), f = new VR();
        return Object.assign(f, u), f;
      });
    }
  }
  async registerFilesInternal(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const s = Bx(e);
      return o = X("files:register", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json()), r.then((a) => {
        const u = qx(a), f = new HR();
        return Object.assign(f, u), f;
      });
    }
  }
};
function Sg(e) {
  const t = {};
  if (l(e, ["languageCodes"]) !== void 0) throw new Error("languageCodes parameter is not supported in Gemini API.");
  return t;
}
function Jx(e) {
  const t = {}, n = l(e, ["apiKey"]);
  if (n != null && c(t, ["apiKey"], n), l(e, ["apiKeyConfig"]) !== void 0) throw new Error("apiKeyConfig parameter is not supported in Gemini API.");
  if (l(e, ["authType"]) !== void 0) throw new Error("authType parameter is not supported in Gemini API.");
  if (l(e, ["googleServiceAccountConfig"]) !== void 0) throw new Error("googleServiceAccountConfig parameter is not supported in Gemini API.");
  if (l(e, ["httpBasicAuthConfig"]) !== void 0) throw new Error("httpBasicAuthConfig parameter is not supported in Gemini API.");
  if (l(e, ["oauthConfig"]) !== void 0) throw new Error("oauthConfig parameter is not supported in Gemini API.");
  if (l(e, ["oidcConfig"]) !== void 0) throw new Error("oidcConfig parameter is not supported in Gemini API.");
  return t;
}
function qa(e) {
  const t = {}, n = l(e, ["data"]);
  if (n != null && c(t, ["data"], n), l(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const r = l(e, ["mimeType"]);
  return r != null && c(t, ["mimeType"], r), t;
}
function Wx(e) {
  const t = {}, n = l(e, ["parts"]);
  if (n != null) {
    let o = n;
    Array.isArray(o) && (o = o.map((i) => cM(i))), c(t, ["parts"], o);
  }
  const r = l(e, ["role"]);
  return r != null && c(t, ["role"], r), t;
}
function Yx(e) {
  const t = {}, n = l(e, ["parts"]);
  if (n != null) {
    let o = n;
    Array.isArray(o) && (o = o.map((i) => fM(i))), c(t, ["parts"], o);
  }
  const r = l(e, ["role"]);
  return r != null && c(t, ["role"], r), t;
}
function zx(e) {
  const t = {};
  if (l(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const n = l(e, ["fileUri"]);
  n != null && c(t, ["fileUri"], n);
  const r = l(e, ["mimeType"]);
  return r != null && c(t, ["mimeType"], r), t;
}
function Xx(e) {
  const t = {}, n = l(e, ["id"]);
  n != null && c(t, ["id"], n);
  const r = l(e, ["args"]);
  r != null && c(t, ["args"], r);
  const o = l(e, ["name"]);
  if (o != null && c(t, ["name"], o), l(e, ["partialArgs"]) !== void 0) throw new Error("partialArgs parameter is not supported in Gemini API.");
  if (l(e, ["willContinue"]) !== void 0) throw new Error("willContinue parameter is not supported in Gemini API.");
  return t;
}
function Qx(e) {
  const t = {}, n = l(e, ["description"]);
  n != null && c(t, ["description"], n);
  const r = l(e, ["name"]);
  r != null && c(t, ["name"], r);
  const o = l(e, ["parameters"]);
  o != null && c(t, ["parameters"], o);
  const i = l(e, ["parametersJsonSchema"]);
  i != null && c(t, ["parametersJsonSchema"], i);
  const s = l(e, ["response"]);
  s != null && c(t, ["response"], s);
  const a = l(e, ["responseJsonSchema"]);
  if (a != null && c(t, ["responseJsonSchema"], a), l(e, ["behavior"]) !== void 0) throw new Error("behavior parameter is not supported in Vertex AI.");
  return t;
}
function Zx(e) {
  const t = {}, n = l(e, ["modelSelectionConfig"]);
  n != null && c(t, ["modelConfig"], n);
  const r = l(e, ["responseJsonSchema"]);
  r != null && c(t, ["responseJsonSchema"], r);
  const o = l(e, ["audioTimestamp"]);
  o != null && c(t, ["audioTimestamp"], o);
  const i = l(e, ["candidateCount"]);
  i != null && c(t, ["candidateCount"], i);
  const s = l(e, ["enableAffectiveDialog"]);
  s != null && c(t, ["enableAffectiveDialog"], s);
  const a = l(e, ["frequencyPenalty"]);
  a != null && c(t, ["frequencyPenalty"], a);
  const u = l(e, ["logprobs"]);
  u != null && c(t, ["logprobs"], u);
  const f = l(e, ["maxOutputTokens"]);
  f != null && c(t, ["maxOutputTokens"], f);
  const d = l(e, ["mediaResolution"]);
  d != null && c(t, ["mediaResolution"], d);
  const h = l(e, ["presencePenalty"]);
  h != null && c(t, ["presencePenalty"], h);
  const p = l(e, ["responseLogprobs"]);
  p != null && c(t, ["responseLogprobs"], p);
  const m = l(e, ["responseMimeType"]);
  m != null && c(t, ["responseMimeType"], m);
  const g = l(e, ["responseModalities"]);
  g != null && c(t, ["responseModalities"], g);
  const y = l(e, ["responseSchema"]);
  y != null && c(t, ["responseSchema"], y);
  const v = l(e, ["routingConfig"]);
  v != null && c(t, ["routingConfig"], v);
  const w = l(e, ["seed"]);
  w != null && c(t, ["seed"], w);
  const _ = l(e, ["speechConfig"]);
  _ != null && c(t, ["speechConfig"], _);
  const S = l(e, ["stopSequences"]);
  S != null && c(t, ["stopSequences"], S);
  const T = l(e, ["temperature"]);
  T != null && c(t, ["temperature"], T);
  const C = l(e, ["thinkingConfig"]);
  C != null && c(t, ["thinkingConfig"], C);
  const E = l(e, ["topK"]);
  E != null && c(t, ["topK"], E);
  const M = l(e, ["topP"]);
  if (M != null && c(t, ["topP"], M), l(e, ["enableEnhancedCivicAnswers"]) !== void 0) throw new Error("enableEnhancedCivicAnswers parameter is not supported in Vertex AI.");
  return t;
}
function jx(e) {
  const t = {}, n = l(e, ["authConfig"]);
  n != null && c(t, ["authConfig"], Jx(n));
  const r = l(e, ["enableWidget"]);
  return r != null && c(t, ["enableWidget"], r), t;
}
function eM(e) {
  const t = {}, n = l(e, ["searchTypes"]);
  if (n != null && c(t, ["searchTypes"], n), l(e, ["blockingConfidence"]) !== void 0) throw new Error("blockingConfidence parameter is not supported in Gemini API.");
  if (l(e, ["excludeDomains"]) !== void 0) throw new Error("excludeDomains parameter is not supported in Gemini API.");
  const r = l(e, ["timeRangeFilter"]);
  return r != null && c(t, ["timeRangeFilter"], r), t;
}
function tM(e, t) {
  const n = {}, r = l(e, ["generationConfig"]);
  t !== void 0 && r != null && c(t, ["setup", "generationConfig"], r);
  const o = l(e, ["responseModalities"]);
  t !== void 0 && o != null && c(t, [
    "setup",
    "generationConfig",
    "responseModalities"
  ], o);
  const i = l(e, ["temperature"]);
  t !== void 0 && i != null && c(t, [
    "setup",
    "generationConfig",
    "temperature"
  ], i);
  const s = l(e, ["topP"]);
  t !== void 0 && s != null && c(t, [
    "setup",
    "generationConfig",
    "topP"
  ], s);
  const a = l(e, ["topK"]);
  t !== void 0 && a != null && c(t, [
    "setup",
    "generationConfig",
    "topK"
  ], a);
  const u = l(e, ["maxOutputTokens"]);
  t !== void 0 && u != null && c(t, [
    "setup",
    "generationConfig",
    "maxOutputTokens"
  ], u);
  const f = l(e, ["mediaResolution"]);
  t !== void 0 && f != null && c(t, [
    "setup",
    "generationConfig",
    "mediaResolution"
  ], f);
  const d = l(e, ["seed"]);
  t !== void 0 && d != null && c(t, [
    "setup",
    "generationConfig",
    "seed"
  ], d);
  const h = l(e, ["speechConfig"]);
  t !== void 0 && h != null && c(t, [
    "setup",
    "generationConfig",
    "speechConfig"
  ], Od(h));
  const p = l(e, ["thinkingConfig"]);
  t !== void 0 && p != null && c(t, [
    "setup",
    "generationConfig",
    "thinkingConfig"
  ], p);
  const m = l(e, ["enableAffectiveDialog"]);
  t !== void 0 && m != null && c(t, [
    "setup",
    "generationConfig",
    "enableAffectiveDialog"
  ], m);
  const g = l(e, ["systemInstruction"]);
  t !== void 0 && g != null && c(t, ["setup", "systemInstruction"], Wx(nt(g)));
  const y = l(e, ["tools"]);
  if (t !== void 0 && y != null) {
    let I = Xo(y);
    Array.isArray(I) && (I = I.map((D) => pM(zo(D)))), c(t, ["setup", "tools"], I);
  }
  const v = l(e, ["sessionResumption"]);
  t !== void 0 && v != null && c(t, ["setup", "sessionResumption"], hM(v));
  const w = l(e, ["inputAudioTranscription"]);
  t !== void 0 && w != null && c(t, ["setup", "inputAudioTranscription"], Sg(w));
  const _ = l(e, ["outputAudioTranscription"]);
  t !== void 0 && _ != null && c(t, ["setup", "outputAudioTranscription"], Sg(_));
  const S = l(e, ["realtimeInputConfig"]);
  t !== void 0 && S != null && c(t, ["setup", "realtimeInputConfig"], S);
  const T = l(e, ["contextWindowCompression"]);
  t !== void 0 && T != null && c(t, ["setup", "contextWindowCompression"], T);
  const C = l(e, ["proactivity"]);
  if (t !== void 0 && C != null && c(t, ["setup", "proactivity"], C), l(e, ["explicitVadSignal"]) !== void 0) throw new Error("explicitVadSignal parameter is not supported in Gemini API.");
  const E = l(e, ["avatarConfig"]);
  t !== void 0 && E != null && c(t, ["setup", "avatarConfig"], E);
  const M = l(e, ["safetySettings"]);
  if (t !== void 0 && M != null) {
    let I = M;
    Array.isArray(I) && (I = I.map((D) => dM(D))), c(t, ["setup", "safetySettings"], I);
  }
  return n;
}
function nM(e, t) {
  const n = {}, r = l(e, ["generationConfig"]);
  t !== void 0 && r != null && c(t, ["setup", "generationConfig"], Zx(r));
  const o = l(e, ["responseModalities"]);
  t !== void 0 && o != null && c(t, [
    "setup",
    "generationConfig",
    "responseModalities"
  ], o);
  const i = l(e, ["temperature"]);
  t !== void 0 && i != null && c(t, [
    "setup",
    "generationConfig",
    "temperature"
  ], i);
  const s = l(e, ["topP"]);
  t !== void 0 && s != null && c(t, [
    "setup",
    "generationConfig",
    "topP"
  ], s);
  const a = l(e, ["topK"]);
  t !== void 0 && a != null && c(t, [
    "setup",
    "generationConfig",
    "topK"
  ], a);
  const u = l(e, ["maxOutputTokens"]);
  t !== void 0 && u != null && c(t, [
    "setup",
    "generationConfig",
    "maxOutputTokens"
  ], u);
  const f = l(e, ["mediaResolution"]);
  t !== void 0 && f != null && c(t, [
    "setup",
    "generationConfig",
    "mediaResolution"
  ], f);
  const d = l(e, ["seed"]);
  t !== void 0 && d != null && c(t, [
    "setup",
    "generationConfig",
    "seed"
  ], d);
  const h = l(e, ["speechConfig"]);
  t !== void 0 && h != null && c(t, [
    "setup",
    "generationConfig",
    "speechConfig"
  ], Od(h));
  const p = l(e, ["thinkingConfig"]);
  t !== void 0 && p != null && c(t, [
    "setup",
    "generationConfig",
    "thinkingConfig"
  ], p);
  const m = l(e, ["enableAffectiveDialog"]);
  t !== void 0 && m != null && c(t, [
    "setup",
    "generationConfig",
    "enableAffectiveDialog"
  ], m);
  const g = l(e, ["systemInstruction"]);
  t !== void 0 && g != null && c(t, ["setup", "systemInstruction"], Yx(nt(g)));
  const y = l(e, ["tools"]);
  if (t !== void 0 && y != null) {
    let D = Xo(y);
    Array.isArray(D) && (D = D.map(($) => mM(zo($)))), c(t, ["setup", "tools"], D);
  }
  const v = l(e, ["sessionResumption"]);
  t !== void 0 && v != null && c(t, ["setup", "sessionResumption"], v);
  const w = l(e, ["inputAudioTranscription"]);
  t !== void 0 && w != null && c(t, ["setup", "inputAudioTranscription"], w);
  const _ = l(e, ["outputAudioTranscription"]);
  t !== void 0 && _ != null && c(t, ["setup", "outputAudioTranscription"], _);
  const S = l(e, ["realtimeInputConfig"]);
  t !== void 0 && S != null && c(t, ["setup", "realtimeInputConfig"], S);
  const T = l(e, ["contextWindowCompression"]);
  t !== void 0 && T != null && c(t, ["setup", "contextWindowCompression"], T);
  const C = l(e, ["proactivity"]);
  t !== void 0 && C != null && c(t, ["setup", "proactivity"], C);
  const E = l(e, ["explicitVadSignal"]);
  t !== void 0 && E != null && c(t, ["setup", "explicitVadSignal"], E);
  const M = l(e, ["avatarConfig"]);
  t !== void 0 && M != null && c(t, ["setup", "avatarConfig"], M);
  const I = l(e, ["safetySettings"]);
  if (t !== void 0 && I != null) {
    let D = I;
    Array.isArray(D) && (D = D.map(($) => $)), c(t, ["setup", "safetySettings"], D);
  }
  return n;
}
function rM(e, t) {
  const n = {}, r = l(t, ["model"]);
  r != null && c(n, ["setup", "model"], Ae(e, r));
  const o = l(t, ["config"]);
  return o != null && c(n, ["config"], tM(o, n)), n;
}
function oM(e, t) {
  const n = {}, r = l(t, ["model"]);
  r != null && c(n, ["setup", "model"], Ae(e, r));
  const o = l(t, ["config"]);
  return o != null && c(n, ["config"], nM(o, n)), n;
}
function iM(e) {
  const t = {}, n = l(e, ["musicGenerationConfig"]);
  return n != null && c(t, ["musicGenerationConfig"], n), t;
}
function sM(e) {
  const t = {}, n = l(e, ["weightedPrompts"]);
  if (n != null) {
    let r = n;
    Array.isArray(r) && (r = r.map((o) => o)), c(t, ["weightedPrompts"], r);
  }
  return t;
}
function aM(e) {
  const t = {}, n = l(e, ["media"]);
  if (n != null) {
    let f = Ew(n);
    Array.isArray(f) && (f = f.map((d) => qa(d))), c(t, ["mediaChunks"], f);
  }
  const r = l(e, ["audio"]);
  r != null && c(t, ["audio"], qa(Sw(r)));
  const o = l(e, ["audioStreamEnd"]);
  o != null && c(t, ["audioStreamEnd"], o);
  const i = l(e, ["video"]);
  i != null && c(t, ["video"], qa(Tw(i)));
  const s = l(e, ["text"]);
  s != null && c(t, ["text"], s);
  const a = l(e, ["activityStart"]);
  a != null && c(t, ["activityStart"], a);
  const u = l(e, ["activityEnd"]);
  return u != null && c(t, ["activityEnd"], u), t;
}
function lM(e) {
  const t = {}, n = l(e, ["media"]);
  if (n != null) {
    let f = Ew(n);
    Array.isArray(f) && (f = f.map((d) => d)), c(t, ["mediaChunks"], f);
  }
  const r = l(e, ["audio"]);
  r != null && c(t, ["audio"], Sw(r));
  const o = l(e, ["audioStreamEnd"]);
  o != null && c(t, ["audioStreamEnd"], o);
  const i = l(e, ["video"]);
  i != null && c(t, ["video"], Tw(i));
  const s = l(e, ["text"]);
  s != null && c(t, ["text"], s);
  const a = l(e, ["activityStart"]);
  a != null && c(t, ["activityStart"], a);
  const u = l(e, ["activityEnd"]);
  return u != null && c(t, ["activityEnd"], u), t;
}
function uM(e) {
  const t = {}, n = l(e, ["setupComplete"]);
  n != null && c(t, ["setupComplete"], n);
  const r = l(e, ["serverContent"]);
  r != null && c(t, ["serverContent"], r);
  const o = l(e, ["toolCall"]);
  o != null && c(t, ["toolCall"], o);
  const i = l(e, ["toolCallCancellation"]);
  i != null && c(t, ["toolCallCancellation"], i);
  const s = l(e, ["usageMetadata"]);
  s != null && c(t, ["usageMetadata"], gM(s));
  const a = l(e, ["goAway"]);
  a != null && c(t, ["goAway"], a);
  const u = l(e, ["sessionResumptionUpdate"]);
  u != null && c(t, ["sessionResumptionUpdate"], u);
  const f = l(e, ["voiceActivityDetectionSignal"]);
  f != null && c(t, ["voiceActivityDetectionSignal"], f);
  const d = l(e, ["voiceActivity"]);
  return d != null && c(t, ["voiceActivity"], yM(d)), t;
}
function cM(e) {
  const t = {}, n = l(e, ["mediaResolution"]);
  n != null && c(t, ["mediaResolution"], n);
  const r = l(e, ["codeExecutionResult"]);
  r != null && c(t, ["codeExecutionResult"], r);
  const o = l(e, ["executableCode"]);
  o != null && c(t, ["executableCode"], o);
  const i = l(e, ["fileData"]);
  i != null && c(t, ["fileData"], zx(i));
  const s = l(e, ["functionCall"]);
  s != null && c(t, ["functionCall"], Xx(s));
  const a = l(e, ["functionResponse"]);
  a != null && c(t, ["functionResponse"], a);
  const u = l(e, ["inlineData"]);
  u != null && c(t, ["inlineData"], qa(u));
  const f = l(e, ["text"]);
  f != null && c(t, ["text"], f);
  const d = l(e, ["thought"]);
  d != null && c(t, ["thought"], d);
  const h = l(e, ["thoughtSignature"]);
  h != null && c(t, ["thoughtSignature"], h);
  const p = l(e, ["videoMetadata"]);
  p != null && c(t, ["videoMetadata"], p);
  const m = l(e, ["toolCall"]);
  m != null && c(t, ["toolCall"], m);
  const g = l(e, ["toolResponse"]);
  g != null && c(t, ["toolResponse"], g);
  const y = l(e, ["partMetadata"]);
  return y != null && c(t, ["partMetadata"], y), t;
}
function fM(e) {
  const t = {}, n = l(e, ["mediaResolution"]);
  n != null && c(t, ["mediaResolution"], n);
  const r = l(e, ["codeExecutionResult"]);
  r != null && c(t, ["codeExecutionResult"], r);
  const o = l(e, ["executableCode"]);
  o != null && c(t, ["executableCode"], o);
  const i = l(e, ["fileData"]);
  i != null && c(t, ["fileData"], i);
  const s = l(e, ["functionCall"]);
  s != null && c(t, ["functionCall"], s);
  const a = l(e, ["functionResponse"]);
  a != null && c(t, ["functionResponse"], a);
  const u = l(e, ["inlineData"]);
  u != null && c(t, ["inlineData"], u);
  const f = l(e, ["text"]);
  f != null && c(t, ["text"], f);
  const d = l(e, ["thought"]);
  d != null && c(t, ["thought"], d);
  const h = l(e, ["thoughtSignature"]);
  h != null && c(t, ["thoughtSignature"], h);
  const p = l(e, ["videoMetadata"]);
  if (p != null && c(t, ["videoMetadata"], p), l(e, ["toolCall"]) !== void 0) throw new Error("toolCall parameter is not supported in Vertex AI.");
  if (l(e, ["toolResponse"]) !== void 0) throw new Error("toolResponse parameter is not supported in Vertex AI.");
  if (l(e, ["partMetadata"]) !== void 0) throw new Error("partMetadata parameter is not supported in Vertex AI.");
  return t;
}
function dM(e) {
  const t = {}, n = l(e, ["category"]);
  if (n != null && c(t, ["category"], n), l(e, ["method"]) !== void 0) throw new Error("method parameter is not supported in Gemini API.");
  const r = l(e, ["threshold"]);
  return r != null && c(t, ["threshold"], r), t;
}
function hM(e) {
  const t = {}, n = l(e, ["handle"]);
  if (n != null && c(t, ["handle"], n), l(e, ["transparent"]) !== void 0) throw new Error("transparent parameter is not supported in Gemini API.");
  return t;
}
function pM(e) {
  const t = {};
  if (l(e, ["retrieval"]) !== void 0) throw new Error("retrieval parameter is not supported in Gemini API.");
  const n = l(e, ["computerUse"]);
  n != null && c(t, ["computerUse"], n);
  const r = l(e, ["fileSearch"]);
  r != null && c(t, ["fileSearch"], r);
  const o = l(e, ["googleSearch"]);
  o != null && c(t, ["googleSearch"], eM(o));
  const i = l(e, ["googleMaps"]);
  i != null && c(t, ["googleMaps"], jx(i));
  const s = l(e, ["codeExecution"]);
  if (s != null && c(t, ["codeExecution"], s), l(e, ["enterpriseWebSearch"]) !== void 0) throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");
  const a = l(e, ["functionDeclarations"]);
  if (a != null) {
    let h = a;
    Array.isArray(h) && (h = h.map((p) => p)), c(t, ["functionDeclarations"], h);
  }
  const u = l(e, ["googleSearchRetrieval"]);
  if (u != null && c(t, ["googleSearchRetrieval"], u), l(e, ["parallelAiSearch"]) !== void 0) throw new Error("parallelAiSearch parameter is not supported in Gemini API.");
  const f = l(e, ["urlContext"]);
  f != null && c(t, ["urlContext"], f);
  const d = l(e, ["mcpServers"]);
  if (d != null) {
    let h = d;
    Array.isArray(h) && (h = h.map((p) => p)), c(t, ["mcpServers"], h);
  }
  return t;
}
function mM(e) {
  const t = {}, n = l(e, ["retrieval"]);
  n != null && c(t, ["retrieval"], n);
  const r = l(e, ["computerUse"]);
  if (r != null && c(t, ["computerUse"], r), l(e, ["fileSearch"]) !== void 0) throw new Error("fileSearch parameter is not supported in Vertex AI.");
  const o = l(e, ["googleSearch"]);
  o != null && c(t, ["googleSearch"], o);
  const i = l(e, ["googleMaps"]);
  i != null && c(t, ["googleMaps"], i);
  const s = l(e, ["codeExecution"]);
  s != null && c(t, ["codeExecution"], s);
  const a = l(e, ["enterpriseWebSearch"]);
  a != null && c(t, ["enterpriseWebSearch"], a);
  const u = l(e, ["functionDeclarations"]);
  if (u != null) {
    let p = u;
    Array.isArray(p) && (p = p.map((m) => Qx(m))), c(t, ["functionDeclarations"], p);
  }
  const f = l(e, ["googleSearchRetrieval"]);
  f != null && c(t, ["googleSearchRetrieval"], f);
  const d = l(e, ["parallelAiSearch"]);
  d != null && c(t, ["parallelAiSearch"], d);
  const h = l(e, ["urlContext"]);
  if (h != null && c(t, ["urlContext"], h), l(e, ["mcpServers"]) !== void 0) throw new Error("mcpServers parameter is not supported in Vertex AI.");
  return t;
}
function gM(e) {
  const t = {}, n = l(e, ["promptTokenCount"]);
  n != null && c(t, ["promptTokenCount"], n);
  const r = l(e, ["cachedContentTokenCount"]);
  r != null && c(t, ["cachedContentTokenCount"], r);
  const o = l(e, ["candidatesTokenCount"]);
  o != null && c(t, ["responseTokenCount"], o);
  const i = l(e, ["toolUsePromptTokenCount"]);
  i != null && c(t, ["toolUsePromptTokenCount"], i);
  const s = l(e, ["thoughtsTokenCount"]);
  s != null && c(t, ["thoughtsTokenCount"], s);
  const a = l(e, ["totalTokenCount"]);
  a != null && c(t, ["totalTokenCount"], a);
  const u = l(e, ["promptTokensDetails"]);
  if (u != null) {
    let m = u;
    Array.isArray(m) && (m = m.map((g) => g)), c(t, ["promptTokensDetails"], m);
  }
  const f = l(e, ["cacheTokensDetails"]);
  if (f != null) {
    let m = f;
    Array.isArray(m) && (m = m.map((g) => g)), c(t, ["cacheTokensDetails"], m);
  }
  const d = l(e, ["candidatesTokensDetails"]);
  if (d != null) {
    let m = d;
    Array.isArray(m) && (m = m.map((g) => g)), c(t, ["responseTokensDetails"], m);
  }
  const h = l(e, ["toolUsePromptTokensDetails"]);
  if (h != null) {
    let m = h;
    Array.isArray(m) && (m = m.map((g) => g)), c(t, ["toolUsePromptTokensDetails"], m);
  }
  const p = l(e, ["trafficType"]);
  return p != null && c(t, ["trafficType"], p), t;
}
function yM(e) {
  const t = {}, n = l(e, ["type"]);
  return n != null && c(t, ["voiceActivityType"], n), t;
}
function vM(e, t) {
  const n = {}, r = l(e, ["apiKey"]);
  if (r != null && c(n, ["apiKey"], r), l(e, ["apiKeyConfig"]) !== void 0) throw new Error("apiKeyConfig parameter is not supported in Gemini API.");
  if (l(e, ["authType"]) !== void 0) throw new Error("authType parameter is not supported in Gemini API.");
  if (l(e, ["googleServiceAccountConfig"]) !== void 0) throw new Error("googleServiceAccountConfig parameter is not supported in Gemini API.");
  if (l(e, ["httpBasicAuthConfig"]) !== void 0) throw new Error("httpBasicAuthConfig parameter is not supported in Gemini API.");
  if (l(e, ["oauthConfig"]) !== void 0) throw new Error("oauthConfig parameter is not supported in Gemini API.");
  if (l(e, ["oidcConfig"]) !== void 0) throw new Error("oidcConfig parameter is not supported in Gemini API.");
  return n;
}
function _M(e, t) {
  const n = {}, r = l(e, ["data"]);
  if (r != null && c(n, ["data"], r), l(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const o = l(e, ["mimeType"]);
  return o != null && c(n, ["mimeType"], o), n;
}
function wM(e, t) {
  const n = {}, r = l(e, ["content"]);
  r != null && c(n, ["content"], r);
  const o = l(e, ["citationMetadata"]);
  o != null && c(n, ["citationMetadata"], EM(o));
  const i = l(e, ["tokenCount"]);
  i != null && c(n, ["tokenCount"], i);
  const s = l(e, ["finishReason"]);
  s != null && c(n, ["finishReason"], s);
  const a = l(e, ["groundingMetadata"]);
  a != null && c(n, ["groundingMetadata"], a);
  const u = l(e, ["avgLogprobs"]);
  u != null && c(n, ["avgLogprobs"], u);
  const f = l(e, ["index"]);
  f != null && c(n, ["index"], f);
  const d = l(e, ["logprobsResult"]);
  d != null && c(n, ["logprobsResult"], d);
  const h = l(e, ["safetyRatings"]);
  if (h != null) {
    let m = h;
    Array.isArray(m) && (m = m.map((g) => g)), c(n, ["safetyRatings"], m);
  }
  const p = l(e, ["urlContextMetadata"]);
  return p != null && c(n, ["urlContextMetadata"], p), n;
}
function EM(e, t) {
  const n = {}, r = l(e, ["citationSources"]);
  if (r != null) {
    let o = r;
    Array.isArray(o) && (o = o.map((i) => i)), c(n, ["citations"], o);
  }
  return n;
}
function TM(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  o != null && c(r, ["_url", "model"], Ae(e, o));
  const i = l(t, ["contents"]);
  if (i != null) {
    let s = At(i);
    Array.isArray(s) && (s = s.map((a) => Zo(a))), c(r, ["contents"], s);
  }
  return r;
}
function SM(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  r != null && c(n, ["sdkHttpResponse"], r);
  const o = l(e, ["tokensInfo"]);
  if (o != null) {
    let i = o;
    Array.isArray(i) && (i = i.map((s) => s)), c(n, ["tokensInfo"], i);
  }
  return n;
}
function AM(e, t) {
  const n = {}, r = l(e, ["values"]);
  r != null && c(n, ["values"], r);
  const o = l(e, ["statistics"]);
  return o != null && c(n, ["statistics"], CM(o)), n;
}
function CM(e, t) {
  const n = {}, r = l(e, ["truncated"]);
  r != null && c(n, ["truncated"], r);
  const o = l(e, ["token_count"]);
  return o != null && c(n, ["tokenCount"], o), n;
}
function Bs(e, t) {
  const n = {}, r = l(e, ["parts"]);
  if (r != null) {
    let i = r;
    Array.isArray(i) && (i = i.map((s) => DN(s))), c(n, ["parts"], i);
  }
  const o = l(e, ["role"]);
  return o != null && c(n, ["role"], o), n;
}
function Zo(e, t) {
  const n = {}, r = l(e, ["parts"]);
  if (r != null) {
    let i = r;
    Array.isArray(i) && (i = i.map((s) => LN(s))), c(n, ["parts"], i);
  }
  const o = l(e, ["role"]);
  return o != null && c(n, ["role"], o), n;
}
function bM(e, t) {
  const n = {}, r = l(e, ["controlType"]);
  r != null && c(n, ["controlType"], r);
  const o = l(e, ["enableControlImageComputation"]);
  return o != null && c(n, ["computeControl"], o), n;
}
function IM(e, t) {
  const n = {};
  if (l(e, ["systemInstruction"]) !== void 0) throw new Error("systemInstruction parameter is not supported in Gemini API.");
  if (l(e, ["tools"]) !== void 0) throw new Error("tools parameter is not supported in Gemini API.");
  if (l(e, ["generationConfig"]) !== void 0) throw new Error("generationConfig parameter is not supported in Gemini API.");
  return n;
}
function RM(e, t, n) {
  const r = {}, o = l(e, ["systemInstruction"]);
  t !== void 0 && o != null && c(t, ["systemInstruction"], Zo(nt(o)));
  const i = l(e, ["tools"]);
  if (t !== void 0 && i != null) {
    let a = i;
    Array.isArray(a) && (a = a.map((u) => Ow(u))), c(t, ["tools"], a);
  }
  const s = l(e, ["generationConfig"]);
  return t !== void 0 && s != null && c(t, ["generationConfig"], _N(s)), r;
}
function PM(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  o != null && c(r, ["_url", "model"], Ae(e, o));
  const i = l(t, ["contents"]);
  if (i != null) {
    let a = At(i);
    Array.isArray(a) && (a = a.map((u) => Bs(u))), c(r, ["contents"], a);
  }
  const s = l(t, ["config"]);
  return s != null && IM(s), r;
}
function xM(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  o != null && c(r, ["_url", "model"], Ae(e, o));
  const i = l(t, ["contents"]);
  if (i != null) {
    let a = At(i);
    Array.isArray(a) && (a = a.map((u) => Zo(u))), c(r, ["contents"], a);
  }
  const s = l(t, ["config"]);
  return s != null && RM(s, r), r;
}
function MM(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  r != null && c(n, ["sdkHttpResponse"], r);
  const o = l(e, ["totalTokens"]);
  o != null && c(n, ["totalTokens"], o);
  const i = l(e, ["cachedContentTokenCount"]);
  return i != null && c(n, ["cachedContentTokenCount"], i), n;
}
function NM(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  r != null && c(n, ["sdkHttpResponse"], r);
  const o = l(e, ["totalTokens"]);
  return o != null && c(n, ["totalTokens"], o), n;
}
function kM(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  return o != null && c(r, ["_url", "name"], Ae(e, o)), r;
}
function DM(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  return o != null && c(r, ["_url", "name"], Ae(e, o)), r;
}
function LM(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  return r != null && c(n, ["sdkHttpResponse"], r), n;
}
function UM(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  return r != null && c(n, ["sdkHttpResponse"], r), n;
}
function $M(e, t, n) {
  const r = {}, o = l(e, ["outputGcsUri"]);
  t !== void 0 && o != null && c(t, ["parameters", "storageUri"], o);
  const i = l(e, ["negativePrompt"]);
  t !== void 0 && i != null && c(t, ["parameters", "negativePrompt"], i);
  const s = l(e, ["numberOfImages"]);
  t !== void 0 && s != null && c(t, ["parameters", "sampleCount"], s);
  const a = l(e, ["aspectRatio"]);
  t !== void 0 && a != null && c(t, ["parameters", "aspectRatio"], a);
  const u = l(e, ["guidanceScale"]);
  t !== void 0 && u != null && c(t, ["parameters", "guidanceScale"], u);
  const f = l(e, ["seed"]);
  t !== void 0 && f != null && c(t, ["parameters", "seed"], f);
  const d = l(e, ["safetyFilterLevel"]);
  t !== void 0 && d != null && c(t, ["parameters", "safetySetting"], d);
  const h = l(e, ["personGeneration"]);
  t !== void 0 && h != null && c(t, ["parameters", "personGeneration"], h);
  const p = l(e, ["includeSafetyAttributes"]);
  t !== void 0 && p != null && c(t, ["parameters", "includeSafetyAttributes"], p);
  const m = l(e, ["includeRaiReason"]);
  t !== void 0 && m != null && c(t, ["parameters", "includeRaiReason"], m);
  const g = l(e, ["language"]);
  t !== void 0 && g != null && c(t, ["parameters", "language"], g);
  const y = l(e, ["outputMimeType"]);
  t !== void 0 && y != null && c(t, [
    "parameters",
    "outputOptions",
    "mimeType"
  ], y);
  const v = l(e, ["outputCompressionQuality"]);
  t !== void 0 && v != null && c(t, [
    "parameters",
    "outputOptions",
    "compressionQuality"
  ], v);
  const w = l(e, ["addWatermark"]);
  t !== void 0 && w != null && c(t, ["parameters", "addWatermark"], w);
  const _ = l(e, ["labels"]);
  t !== void 0 && _ != null && c(t, ["labels"], _);
  const S = l(e, ["editMode"]);
  t !== void 0 && S != null && c(t, ["parameters", "editMode"], S);
  const T = l(e, ["baseSteps"]);
  return t !== void 0 && T != null && c(t, [
    "parameters",
    "editConfig",
    "baseSteps"
  ], T), r;
}
function FM(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  o != null && c(r, ["_url", "model"], Ae(e, o));
  const i = l(t, ["prompt"]);
  i != null && c(r, ["instances[0]", "prompt"], i);
  const s = l(t, ["referenceImages"]);
  if (s != null) {
    let u = s;
    Array.isArray(u) && (u = u.map((f) => GN(f))), c(r, ["instances[0]", "referenceImages"], u);
  }
  const a = l(t, ["config"]);
  return a != null && $M(a, r), r;
}
function OM(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  r != null && c(n, ["sdkHttpResponse"], r);
  const o = l(e, ["predictions"]);
  if (o != null) {
    let i = o;
    Array.isArray(i) && (i = i.map((s) => su(s))), c(n, ["generatedImages"], i);
  }
  return n;
}
function BM(e, t, n) {
  const r = {}, o = l(e, ["taskType"]);
  t !== void 0 && o != null && c(t, ["requests[]", "taskType"], o);
  const i = l(e, ["title"]);
  t !== void 0 && i != null && c(t, ["requests[]", "title"], i);
  const s = l(e, ["outputDimensionality"]);
  if (t !== void 0 && s != null && c(t, ["requests[]", "outputDimensionality"], s), l(e, ["mimeType"]) !== void 0) throw new Error("mimeType parameter is not supported in Gemini API.");
  if (l(e, ["autoTruncate"]) !== void 0) throw new Error("autoTruncate parameter is not supported in Gemini API.");
  if (l(e, ["documentOcr"]) !== void 0) throw new Error("documentOcr parameter is not supported in Gemini API.");
  if (l(e, ["audioTrackExtraction"]) !== void 0) throw new Error("audioTrackExtraction parameter is not supported in Gemini API.");
  return r;
}
function GM(e, t, n) {
  const r = {};
  let o = l(n, ["embeddingApiType"]);
  if (o === void 0 && (o = "PREDICT"), o === "PREDICT") {
    const h = l(e, ["taskType"]);
    t !== void 0 && h != null && c(t, ["instances[]", "task_type"], h);
  } else if (o === "EMBED_CONTENT") {
    const h = l(e, ["taskType"]);
    t !== void 0 && h != null && c(t, ["embedContentConfig", "taskType"], h);
  }
  let i = l(n, ["embeddingApiType"]);
  if (i === void 0 && (i = "PREDICT"), i === "PREDICT") {
    const h = l(e, ["title"]);
    t !== void 0 && h != null && c(t, ["instances[]", "title"], h);
  } else if (i === "EMBED_CONTENT") {
    const h = l(e, ["title"]);
    t !== void 0 && h != null && c(t, ["embedContentConfig", "title"], h);
  }
  let s = l(n, ["embeddingApiType"]);
  if (s === void 0 && (s = "PREDICT"), s === "PREDICT") {
    const h = l(e, ["outputDimensionality"]);
    t !== void 0 && h != null && c(t, ["parameters", "outputDimensionality"], h);
  } else if (s === "EMBED_CONTENT") {
    const h = l(e, ["outputDimensionality"]);
    t !== void 0 && h != null && c(t, ["embedContentConfig", "outputDimensionality"], h);
  }
  let a = l(n, ["embeddingApiType"]);
  if (a === void 0 && (a = "PREDICT"), a === "PREDICT") {
    const h = l(e, ["mimeType"]);
    t !== void 0 && h != null && c(t, ["instances[]", "mimeType"], h);
  }
  let u = l(n, ["embeddingApiType"]);
  if (u === void 0 && (u = "PREDICT"), u === "PREDICT") {
    const h = l(e, ["autoTruncate"]);
    t !== void 0 && h != null && c(t, ["parameters", "autoTruncate"], h);
  } else if (u === "EMBED_CONTENT") {
    const h = l(e, ["autoTruncate"]);
    t !== void 0 && h != null && c(t, ["embedContentConfig", "autoTruncate"], h);
  }
  let f = l(n, ["embeddingApiType"]);
  if (f === void 0 && (f = "PREDICT"), f === "EMBED_CONTENT") {
    const h = l(e, ["documentOcr"]);
    t !== void 0 && h != null && c(t, ["embedContentConfig", "documentOcr"], h);
  }
  let d = l(n, ["embeddingApiType"]);
  if (d === void 0 && (d = "PREDICT"), d === "EMBED_CONTENT") {
    const h = l(e, ["audioTrackExtraction"]);
    t !== void 0 && h != null && c(t, ["embedContentConfig", "audioTrackExtraction"], h);
  }
  return r;
}
function VM(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  o != null && c(r, ["_url", "model"], Ae(e, o));
  const i = l(t, ["contents"]);
  if (i != null) {
    let f = Ud(e, i);
    Array.isArray(f) && (f = f.map((d) => d)), c(r, ["requests[]", "content"], f);
  }
  const s = l(t, ["content"]);
  s != null && Bs(nt(s));
  const a = l(t, ["config"]);
  a != null && BM(a, r);
  const u = l(t, ["model"]);
  return u !== void 0 && c(r, ["requests[]", "model"], Ae(e, u)), r;
}
function HM(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  o != null && c(r, ["_url", "model"], Ae(e, o));
  let i = l(n, ["embeddingApiType"]);
  if (i === void 0 && (i = "PREDICT"), i === "PREDICT") {
    const u = l(t, ["contents"]);
    if (u != null) {
      let f = Ud(e, u);
      Array.isArray(f) && (f = f.map((d) => d)), c(r, ["instances[]", "content"], f);
    }
  }
  let s = l(n, ["embeddingApiType"]);
  if (s === void 0 && (s = "PREDICT"), s === "EMBED_CONTENT") {
    const u = l(t, ["content"]);
    u != null && c(r, ["content"], Zo(nt(u)));
  }
  const a = l(t, ["config"]);
  return a != null && GM(a, r, n), r;
}
function qM(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  r != null && c(n, ["sdkHttpResponse"], r);
  const o = l(e, ["embeddings"]);
  if (o != null) {
    let s = o;
    Array.isArray(s) && (s = s.map((a) => a)), c(n, ["embeddings"], s);
  }
  const i = l(e, ["metadata"]);
  return i != null && c(n, ["metadata"], i), n;
}
function KM(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  r != null && c(n, ["sdkHttpResponse"], r);
  const o = l(e, ["predictions[]", "embeddings"]);
  if (o != null) {
    let s = o;
    Array.isArray(s) && (s = s.map((a) => AM(a))), c(n, ["embeddings"], s);
  }
  const i = l(e, ["metadata"]);
  if (i != null && c(n, ["metadata"], i), t && l(t, ["embeddingApiType"]) === "EMBED_CONTENT") {
    const s = l(e, ["embedding"]), a = l(e, ["usageMetadata"]), u = l(e, ["truncated"]);
    if (s) {
      const f = {};
      a && a.promptTokenCount && (f.tokenCount = a.promptTokenCount), u && (f.truncated = u), s.statistics = f, c(n, ["embeddings"], [s]);
    }
  }
  return n;
}
function JM(e, t) {
  const n = {}, r = l(e, ["endpoint"]);
  r != null && c(n, ["name"], r);
  const o = l(e, ["deployedModelId"]);
  return o != null && c(n, ["deployedModelId"], o), n;
}
function WM(e, t) {
  const n = {};
  if (l(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const r = l(e, ["fileUri"]);
  r != null && c(n, ["fileUri"], r);
  const o = l(e, ["mimeType"]);
  return o != null && c(n, ["mimeType"], o), n;
}
function YM(e, t) {
  const n = {}, r = l(e, ["id"]);
  r != null && c(n, ["id"], r);
  const o = l(e, ["args"]);
  o != null && c(n, ["args"], o);
  const i = l(e, ["name"]);
  if (i != null && c(n, ["name"], i), l(e, ["partialArgs"]) !== void 0) throw new Error("partialArgs parameter is not supported in Gemini API.");
  if (l(e, ["willContinue"]) !== void 0) throw new Error("willContinue parameter is not supported in Gemini API.");
  return n;
}
function zM(e, t) {
  const n = {}, r = l(e, ["allowedFunctionNames"]);
  r != null && c(n, ["allowedFunctionNames"], r);
  const o = l(e, ["mode"]);
  if (o != null && c(n, ["mode"], o), l(e, ["streamFunctionCallArguments"]) !== void 0) throw new Error("streamFunctionCallArguments parameter is not supported in Gemini API.");
  return n;
}
function XM(e, t) {
  const n = {}, r = l(e, ["description"]);
  r != null && c(n, ["description"], r);
  const o = l(e, ["name"]);
  o != null && c(n, ["name"], o);
  const i = l(e, ["parameters"]);
  i != null && c(n, ["parameters"], i);
  const s = l(e, ["parametersJsonSchema"]);
  s != null && c(n, ["parametersJsonSchema"], s);
  const a = l(e, ["response"]);
  a != null && c(n, ["response"], a);
  const u = l(e, ["responseJsonSchema"]);
  if (u != null && c(n, ["responseJsonSchema"], u), l(e, ["behavior"]) !== void 0) throw new Error("behavior parameter is not supported in Vertex AI.");
  return n;
}
function QM(e, t, n, r) {
  const o = {}, i = l(t, ["systemInstruction"]);
  n !== void 0 && i != null && c(n, ["systemInstruction"], Bs(nt(i)));
  const s = l(t, ["temperature"]);
  s != null && c(o, ["temperature"], s);
  const a = l(t, ["topP"]);
  a != null && c(o, ["topP"], a);
  const u = l(t, ["topK"]);
  u != null && c(o, ["topK"], u);
  const f = l(t, ["candidateCount"]);
  f != null && c(o, ["candidateCount"], f);
  const d = l(t, ["maxOutputTokens"]);
  d != null && c(o, ["maxOutputTokens"], d);
  const h = l(t, ["stopSequences"]);
  h != null && c(o, ["stopSequences"], h);
  const p = l(t, ["responseLogprobs"]);
  p != null && c(o, ["responseLogprobs"], p);
  const m = l(t, ["logprobs"]);
  m != null && c(o, ["logprobs"], m);
  const g = l(t, ["presencePenalty"]);
  g != null && c(o, ["presencePenalty"], g);
  const y = l(t, ["frequencyPenalty"]);
  y != null && c(o, ["frequencyPenalty"], y);
  const v = l(t, ["seed"]);
  v != null && c(o, ["seed"], v);
  const w = l(t, ["responseMimeType"]);
  w != null && c(o, ["responseMimeType"], w);
  const _ = l(t, ["responseSchema"]);
  _ != null && c(o, ["responseSchema"], $d(_));
  const S = l(t, ["responseJsonSchema"]);
  if (S != null && c(o, ["responseJsonSchema"], S), l(t, ["routingConfig"]) !== void 0) throw new Error("routingConfig parameter is not supported in Gemini API.");
  if (l(t, ["modelSelectionConfig"]) !== void 0) throw new Error("modelSelectionConfig parameter is not supported in Gemini API.");
  const T = l(t, ["safetySettings"]);
  if (n !== void 0 && T != null) {
    let H = T;
    Array.isArray(H) && (H = H.map((pe) => VN(pe))), c(n, ["safetySettings"], H);
  }
  const C = l(t, ["tools"]);
  if (n !== void 0 && C != null) {
    let H = Xo(C);
    Array.isArray(H) && (H = H.map((pe) => XN(zo(pe)))), c(n, ["tools"], H);
  }
  const E = l(t, ["toolConfig"]);
  if (n !== void 0 && E != null && c(n, ["toolConfig"], YN(E)), l(t, ["labels"]) !== void 0) throw new Error("labels parameter is not supported in Gemini API.");
  const M = l(t, ["cachedContent"]);
  n !== void 0 && M != null && c(n, ["cachedContent"], Yn(e, M));
  const I = l(t, ["responseModalities"]);
  I != null && c(o, ["responseModalities"], I);
  const D = l(t, ["mediaResolution"]);
  D != null && c(o, ["mediaResolution"], D);
  const $ = l(t, ["speechConfig"]);
  if ($ != null && c(o, ["speechConfig"], Fd($)), l(t, ["audioTimestamp"]) !== void 0) throw new Error("audioTimestamp parameter is not supported in Gemini API.");
  const q = l(t, ["thinkingConfig"]);
  q != null && c(o, ["thinkingConfig"], q);
  const z = l(t, ["imageConfig"]);
  z != null && c(o, ["imageConfig"], AN(z));
  const J = l(t, ["enableEnhancedCivicAnswers"]);
  if (J != null && c(o, ["enableEnhancedCivicAnswers"], J), l(t, ["modelArmorConfig"]) !== void 0) throw new Error("modelArmorConfig parameter is not supported in Gemini API.");
  const ne = l(t, ["serviceTier"]);
  return n !== void 0 && ne != null && c(n, ["serviceTier"], ne), o;
}
function ZM(e, t, n, r) {
  const o = {}, i = l(t, ["systemInstruction"]);
  n !== void 0 && i != null && c(n, ["systemInstruction"], Zo(nt(i)));
  const s = l(t, ["temperature"]);
  s != null && c(o, ["temperature"], s);
  const a = l(t, ["topP"]);
  a != null && c(o, ["topP"], a);
  const u = l(t, ["topK"]);
  u != null && c(o, ["topK"], u);
  const f = l(t, ["candidateCount"]);
  f != null && c(o, ["candidateCount"], f);
  const d = l(t, ["maxOutputTokens"]);
  d != null && c(o, ["maxOutputTokens"], d);
  const h = l(t, ["stopSequences"]);
  h != null && c(o, ["stopSequences"], h);
  const p = l(t, ["responseLogprobs"]);
  p != null && c(o, ["responseLogprobs"], p);
  const m = l(t, ["logprobs"]);
  m != null && c(o, ["logprobs"], m);
  const g = l(t, ["presencePenalty"]);
  g != null && c(o, ["presencePenalty"], g);
  const y = l(t, ["frequencyPenalty"]);
  y != null && c(o, ["frequencyPenalty"], y);
  const v = l(t, ["seed"]);
  v != null && c(o, ["seed"], v);
  const w = l(t, ["responseMimeType"]);
  w != null && c(o, ["responseMimeType"], w);
  const _ = l(t, ["responseSchema"]);
  _ != null && c(o, ["responseSchema"], $d(_));
  const S = l(t, ["responseJsonSchema"]);
  S != null && c(o, ["responseJsonSchema"], S);
  const T = l(t, ["routingConfig"]);
  T != null && c(o, ["routingConfig"], T);
  const C = l(t, ["modelSelectionConfig"]);
  C != null && c(o, ["modelConfig"], C);
  const E = l(t, ["safetySettings"]);
  if (n !== void 0 && E != null) {
    let we = E;
    Array.isArray(we) && (we = we.map((Le) => Le)), c(n, ["safetySettings"], we);
  }
  const M = l(t, ["tools"]);
  if (n !== void 0 && M != null) {
    let we = Xo(M);
    Array.isArray(we) && (we = we.map((Le) => Ow(zo(Le)))), c(n, ["tools"], we);
  }
  const I = l(t, ["toolConfig"]);
  n !== void 0 && I != null && c(n, ["toolConfig"], zN(I));
  const D = l(t, ["labels"]);
  n !== void 0 && D != null && c(n, ["labels"], D);
  const $ = l(t, ["cachedContent"]);
  n !== void 0 && $ != null && c(n, ["cachedContent"], Yn(e, $));
  const q = l(t, ["responseModalities"]);
  q != null && c(o, ["responseModalities"], q);
  const z = l(t, ["mediaResolution"]);
  z != null && c(o, ["mediaResolution"], z);
  const J = l(t, ["speechConfig"]);
  J != null && c(o, ["speechConfig"], Fd(J));
  const ne = l(t, ["audioTimestamp"]);
  ne != null && c(o, ["audioTimestamp"], ne);
  const H = l(t, ["thinkingConfig"]);
  H != null && c(o, ["thinkingConfig"], H);
  const pe = l(t, ["imageConfig"]);
  if (pe != null && c(o, ["imageConfig"], CN(pe)), l(t, ["enableEnhancedCivicAnswers"]) !== void 0) throw new Error("enableEnhancedCivicAnswers parameter is not supported in Vertex AI.");
  const ue = l(t, ["modelArmorConfig"]);
  n !== void 0 && ue != null && c(n, ["modelArmorConfig"], ue);
  const fe = l(t, ["serviceTier"]);
  return n !== void 0 && fe != null && c(n, ["serviceTier"], fe), o;
}
function Ag(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  o != null && c(r, ["_url", "model"], Ae(e, o));
  const i = l(t, ["contents"]);
  if (i != null) {
    let a = At(i);
    Array.isArray(a) && (a = a.map((u) => Bs(u))), c(r, ["contents"], a);
  }
  const s = l(t, ["config"]);
  return s != null && c(r, ["generationConfig"], QM(e, s, r)), r;
}
function Cg(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  o != null && c(r, ["_url", "model"], Ae(e, o));
  const i = l(t, ["contents"]);
  if (i != null) {
    let a = At(i);
    Array.isArray(a) && (a = a.map((u) => Zo(u))), c(r, ["contents"], a);
  }
  const s = l(t, ["config"]);
  return s != null && c(r, ["generationConfig"], ZM(e, s, r)), r;
}
function bg(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  r != null && c(n, ["sdkHttpResponse"], r);
  const o = l(e, ["candidates"]);
  if (o != null) {
    let d = o;
    Array.isArray(d) && (d = d.map((h) => wM(h))), c(n, ["candidates"], d);
  }
  const i = l(e, ["modelVersion"]);
  i != null && c(n, ["modelVersion"], i);
  const s = l(e, ["promptFeedback"]);
  s != null && c(n, ["promptFeedback"], s);
  const a = l(e, ["responseId"]);
  a != null && c(n, ["responseId"], a);
  const u = l(e, ["usageMetadata"]);
  u != null && c(n, ["usageMetadata"], u);
  const f = l(e, ["modelStatus"]);
  return f != null && c(n, ["modelStatus"], f), n;
}
function Ig(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  r != null && c(n, ["sdkHttpResponse"], r);
  const o = l(e, ["candidates"]);
  if (o != null) {
    let d = o;
    Array.isArray(d) && (d = d.map((h) => h)), c(n, ["candidates"], d);
  }
  const i = l(e, ["createTime"]);
  i != null && c(n, ["createTime"], i);
  const s = l(e, ["modelVersion"]);
  s != null && c(n, ["modelVersion"], s);
  const a = l(e, ["promptFeedback"]);
  a != null && c(n, ["promptFeedback"], a);
  const u = l(e, ["responseId"]);
  u != null && c(n, ["responseId"], u);
  const f = l(e, ["usageMetadata"]);
  return f != null && c(n, ["usageMetadata"], f), n;
}
function jM(e, t, n) {
  const r = {};
  if (l(e, ["outputGcsUri"]) !== void 0) throw new Error("outputGcsUri parameter is not supported in Gemini API.");
  if (l(e, ["negativePrompt"]) !== void 0) throw new Error("negativePrompt parameter is not supported in Gemini API.");
  const o = l(e, ["numberOfImages"]);
  t !== void 0 && o != null && c(t, ["parameters", "sampleCount"], o);
  const i = l(e, ["aspectRatio"]);
  t !== void 0 && i != null && c(t, ["parameters", "aspectRatio"], i);
  const s = l(e, ["guidanceScale"]);
  if (t !== void 0 && s != null && c(t, ["parameters", "guidanceScale"], s), l(e, ["seed"]) !== void 0) throw new Error("seed parameter is not supported in Gemini API.");
  const a = l(e, ["safetyFilterLevel"]);
  t !== void 0 && a != null && c(t, ["parameters", "safetySetting"], a);
  const u = l(e, ["personGeneration"]);
  t !== void 0 && u != null && c(t, ["parameters", "personGeneration"], u);
  const f = l(e, ["includeSafetyAttributes"]);
  t !== void 0 && f != null && c(t, ["parameters", "includeSafetyAttributes"], f);
  const d = l(e, ["includeRaiReason"]);
  t !== void 0 && d != null && c(t, ["parameters", "includeRaiReason"], d);
  const h = l(e, ["language"]);
  t !== void 0 && h != null && c(t, ["parameters", "language"], h);
  const p = l(e, ["outputMimeType"]);
  t !== void 0 && p != null && c(t, [
    "parameters",
    "outputOptions",
    "mimeType"
  ], p);
  const m = l(e, ["outputCompressionQuality"]);
  if (t !== void 0 && m != null && c(t, [
    "parameters",
    "outputOptions",
    "compressionQuality"
  ], m), l(e, ["addWatermark"]) !== void 0) throw new Error("addWatermark parameter is not supported in Gemini API.");
  if (l(e, ["labels"]) !== void 0) throw new Error("labels parameter is not supported in Gemini API.");
  const g = l(e, ["imageSize"]);
  if (t !== void 0 && g != null && c(t, ["parameters", "sampleImageSize"], g), l(e, ["enhancePrompt"]) !== void 0) throw new Error("enhancePrompt parameter is not supported in Gemini API.");
  return r;
}
function eN(e, t, n) {
  const r = {}, o = l(e, ["outputGcsUri"]);
  t !== void 0 && o != null && c(t, ["parameters", "storageUri"], o);
  const i = l(e, ["negativePrompt"]);
  t !== void 0 && i != null && c(t, ["parameters", "negativePrompt"], i);
  const s = l(e, ["numberOfImages"]);
  t !== void 0 && s != null && c(t, ["parameters", "sampleCount"], s);
  const a = l(e, ["aspectRatio"]);
  t !== void 0 && a != null && c(t, ["parameters", "aspectRatio"], a);
  const u = l(e, ["guidanceScale"]);
  t !== void 0 && u != null && c(t, ["parameters", "guidanceScale"], u);
  const f = l(e, ["seed"]);
  t !== void 0 && f != null && c(t, ["parameters", "seed"], f);
  const d = l(e, ["safetyFilterLevel"]);
  t !== void 0 && d != null && c(t, ["parameters", "safetySetting"], d);
  const h = l(e, ["personGeneration"]);
  t !== void 0 && h != null && c(t, ["parameters", "personGeneration"], h);
  const p = l(e, ["includeSafetyAttributes"]);
  t !== void 0 && p != null && c(t, ["parameters", "includeSafetyAttributes"], p);
  const m = l(e, ["includeRaiReason"]);
  t !== void 0 && m != null && c(t, ["parameters", "includeRaiReason"], m);
  const g = l(e, ["language"]);
  t !== void 0 && g != null && c(t, ["parameters", "language"], g);
  const y = l(e, ["outputMimeType"]);
  t !== void 0 && y != null && c(t, [
    "parameters",
    "outputOptions",
    "mimeType"
  ], y);
  const v = l(e, ["outputCompressionQuality"]);
  t !== void 0 && v != null && c(t, [
    "parameters",
    "outputOptions",
    "compressionQuality"
  ], v);
  const w = l(e, ["addWatermark"]);
  t !== void 0 && w != null && c(t, ["parameters", "addWatermark"], w);
  const _ = l(e, ["labels"]);
  t !== void 0 && _ != null && c(t, ["labels"], _);
  const S = l(e, ["imageSize"]);
  t !== void 0 && S != null && c(t, ["parameters", "sampleImageSize"], S);
  const T = l(e, ["enhancePrompt"]);
  return t !== void 0 && T != null && c(t, ["parameters", "enhancePrompt"], T), r;
}
function tN(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  o != null && c(r, ["_url", "model"], Ae(e, o));
  const i = l(t, ["prompt"]);
  i != null && c(r, ["instances[0]", "prompt"], i);
  const s = l(t, ["config"]);
  return s != null && jM(s, r), r;
}
function nN(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  o != null && c(r, ["_url", "model"], Ae(e, o));
  const i = l(t, ["prompt"]);
  i != null && c(r, ["instances[0]", "prompt"], i);
  const s = l(t, ["config"]);
  return s != null && eN(s, r), r;
}
function rN(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  r != null && c(n, ["sdkHttpResponse"], r);
  const o = l(e, ["predictions"]);
  if (o != null) {
    let s = o;
    Array.isArray(s) && (s = s.map((a) => mN(a))), c(n, ["generatedImages"], s);
  }
  const i = l(e, ["positivePromptSafetyAttributes"]);
  return i != null && c(n, ["positivePromptSafetyAttributes"], $w(i)), n;
}
function oN(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  r != null && c(n, ["sdkHttpResponse"], r);
  const o = l(e, ["predictions"]);
  if (o != null) {
    let s = o;
    Array.isArray(s) && (s = s.map((a) => su(a))), c(n, ["generatedImages"], s);
  }
  const i = l(e, ["positivePromptSafetyAttributes"]);
  return i != null && c(n, ["positivePromptSafetyAttributes"], Fw(i)), n;
}
function iN(e, t, n) {
  const r = {}, o = l(e, ["numberOfVideos"]);
  if (t !== void 0 && o != null && c(t, ["parameters", "sampleCount"], o), l(e, ["outputGcsUri"]) !== void 0) throw new Error("outputGcsUri parameter is not supported in Gemini API.");
  if (l(e, ["fps"]) !== void 0) throw new Error("fps parameter is not supported in Gemini API.");
  const i = l(e, ["durationSeconds"]);
  if (t !== void 0 && i != null && c(t, ["parameters", "durationSeconds"], i), l(e, ["seed"]) !== void 0) throw new Error("seed parameter is not supported in Gemini API.");
  const s = l(e, ["aspectRatio"]);
  t !== void 0 && s != null && c(t, ["parameters", "aspectRatio"], s);
  const a = l(e, ["resolution"]);
  t !== void 0 && a != null && c(t, ["parameters", "resolution"], a);
  const u = l(e, ["personGeneration"]);
  if (t !== void 0 && u != null && c(t, ["parameters", "personGeneration"], u), l(e, ["pubsubTopic"]) !== void 0) throw new Error("pubsubTopic parameter is not supported in Gemini API.");
  const f = l(e, ["negativePrompt"]);
  t !== void 0 && f != null && c(t, ["parameters", "negativePrompt"], f);
  const d = l(e, ["enhancePrompt"]);
  if (t !== void 0 && d != null && c(t, ["parameters", "enhancePrompt"], d), l(e, ["generateAudio"]) !== void 0) throw new Error("generateAudio parameter is not supported in Gemini API.");
  const h = l(e, ["lastFrame"]);
  t !== void 0 && h != null && c(t, ["instances[0]", "lastFrame"], au(h));
  const p = l(e, ["referenceImages"]);
  if (t !== void 0 && p != null) {
    let g = p;
    Array.isArray(g) && (g = g.map((y) => uk(y))), c(t, ["instances[0]", "referenceImages"], g);
  }
  if (l(e, ["mask"]) !== void 0) throw new Error("mask parameter is not supported in Gemini API.");
  if (l(e, ["compressionQuality"]) !== void 0) throw new Error("compressionQuality parameter is not supported in Gemini API.");
  if (l(e, ["labels"]) !== void 0) throw new Error("labels parameter is not supported in Gemini API.");
  const m = l(e, ["webhookConfig"]);
  return t !== void 0 && m != null && c(t, ["webhookConfig"], m), r;
}
function sN(e, t, n) {
  const r = {}, o = l(e, ["numberOfVideos"]);
  t !== void 0 && o != null && c(t, ["parameters", "sampleCount"], o);
  const i = l(e, ["outputGcsUri"]);
  t !== void 0 && i != null && c(t, ["parameters", "storageUri"], i);
  const s = l(e, ["fps"]);
  t !== void 0 && s != null && c(t, ["parameters", "fps"], s);
  const a = l(e, ["durationSeconds"]);
  t !== void 0 && a != null && c(t, ["parameters", "durationSeconds"], a);
  const u = l(e, ["seed"]);
  t !== void 0 && u != null && c(t, ["parameters", "seed"], u);
  const f = l(e, ["aspectRatio"]);
  t !== void 0 && f != null && c(t, ["parameters", "aspectRatio"], f);
  const d = l(e, ["resolution"]);
  t !== void 0 && d != null && c(t, ["parameters", "resolution"], d);
  const h = l(e, ["personGeneration"]);
  t !== void 0 && h != null && c(t, ["parameters", "personGeneration"], h);
  const p = l(e, ["pubsubTopic"]);
  t !== void 0 && p != null && c(t, ["parameters", "pubsubTopic"], p);
  const m = l(e, ["negativePrompt"]);
  t !== void 0 && m != null && c(t, ["parameters", "negativePrompt"], m);
  const g = l(e, ["enhancePrompt"]);
  t !== void 0 && g != null && c(t, ["parameters", "enhancePrompt"], g);
  const y = l(e, ["generateAudio"]);
  t !== void 0 && y != null && c(t, ["parameters", "generateAudio"], y);
  const v = l(e, ["lastFrame"]);
  t !== void 0 && v != null && c(t, ["instances[0]", "lastFrame"], an(v));
  const w = l(e, ["referenceImages"]);
  if (t !== void 0 && w != null) {
    let C = w;
    Array.isArray(C) && (C = C.map((E) => ck(E))), c(t, ["instances[0]", "referenceImages"], C);
  }
  const _ = l(e, ["mask"]);
  t !== void 0 && _ != null && c(t, ["instances[0]", "mask"], lk(_));
  const S = l(e, ["compressionQuality"]);
  t !== void 0 && S != null && c(t, ["parameters", "compressionQuality"], S);
  const T = l(e, ["labels"]);
  if (t !== void 0 && T != null && c(t, ["labels"], T), l(e, ["webhookConfig"]) !== void 0) throw new Error("webhookConfig parameter is not supported in Vertex AI.");
  return r;
}
function aN(e, t) {
  const n = {}, r = l(e, ["name"]);
  r != null && c(n, ["name"], r);
  const o = l(e, ["metadata"]);
  o != null && c(n, ["metadata"], o);
  const i = l(e, ["done"]);
  i != null && c(n, ["done"], i);
  const s = l(e, ["error"]);
  s != null && c(n, ["error"], s);
  const a = l(e, ["response", "generateVideoResponse"]);
  return a != null && c(n, ["response"], fN(a)), n;
}
function lN(e, t) {
  const n = {}, r = l(e, ["name"]);
  r != null && c(n, ["name"], r);
  const o = l(e, ["metadata"]);
  o != null && c(n, ["metadata"], o);
  const i = l(e, ["done"]);
  i != null && c(n, ["done"], i);
  const s = l(e, ["error"]);
  s != null && c(n, ["error"], s);
  const a = l(e, ["response"]);
  return a != null && c(n, ["response"], dN(a)), n;
}
function uN(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  o != null && c(r, ["_url", "model"], Ae(e, o));
  const i = l(t, ["prompt"]);
  i != null && c(r, ["instances[0]", "prompt"], i);
  const s = l(t, ["image"]);
  s != null && c(r, ["instances[0]", "image"], au(s));
  const a = l(t, ["video"]);
  a != null && c(r, ["instances[0]", "video"], Bw(a));
  const u = l(t, ["source"]);
  u != null && hN(u, r);
  const f = l(t, ["config"]);
  return f != null && iN(f, r), r;
}
function cN(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  o != null && c(r, ["_url", "model"], Ae(e, o));
  const i = l(t, ["prompt"]);
  i != null && c(r, ["instances[0]", "prompt"], i);
  const s = l(t, ["image"]);
  s != null && c(r, ["instances[0]", "image"], an(s));
  const a = l(t, ["video"]);
  a != null && c(r, ["instances[0]", "video"], Gw(a));
  const u = l(t, ["source"]);
  u != null && pN(u, r);
  const f = l(t, ["config"]);
  return f != null && sN(f, r), r;
}
function fN(e, t) {
  const n = {}, r = l(e, ["generatedSamples"]);
  if (r != null) {
    let s = r;
    Array.isArray(s) && (s = s.map((a) => yN(a))), c(n, ["generatedVideos"], s);
  }
  const o = l(e, ["raiMediaFilteredCount"]);
  o != null && c(n, ["raiMediaFilteredCount"], o);
  const i = l(e, ["raiMediaFilteredReasons"]);
  return i != null && c(n, ["raiMediaFilteredReasons"], i), n;
}
function dN(e, t) {
  const n = {}, r = l(e, ["videos"]);
  if (r != null) {
    let s = r;
    Array.isArray(s) && (s = s.map((a) => vN(a))), c(n, ["generatedVideos"], s);
  }
  const o = l(e, ["raiMediaFilteredCount"]);
  o != null && c(n, ["raiMediaFilteredCount"], o);
  const i = l(e, ["raiMediaFilteredReasons"]);
  return i != null && c(n, ["raiMediaFilteredReasons"], i), n;
}
function hN(e, t, n) {
  const r = {}, o = l(e, ["prompt"]);
  t !== void 0 && o != null && c(t, ["instances[0]", "prompt"], o);
  const i = l(e, ["image"]);
  t !== void 0 && i != null && c(t, ["instances[0]", "image"], au(i));
  const s = l(e, ["video"]);
  return t !== void 0 && s != null && c(t, ["instances[0]", "video"], Bw(s)), r;
}
function pN(e, t, n) {
  const r = {}, o = l(e, ["prompt"]);
  t !== void 0 && o != null && c(t, ["instances[0]", "prompt"], o);
  const i = l(e, ["image"]);
  t !== void 0 && i != null && c(t, ["instances[0]", "image"], an(i));
  const s = l(e, ["video"]);
  return t !== void 0 && s != null && c(t, ["instances[0]", "video"], Gw(s)), r;
}
function mN(e, t) {
  const n = {}, r = l(e, ["_self"]);
  r != null && c(n, ["image"], bN(r));
  const o = l(e, ["raiFilteredReason"]);
  o != null && c(n, ["raiFilteredReason"], o);
  const i = l(e, ["_self"]);
  return i != null && c(n, ["safetyAttributes"], $w(i)), n;
}
function su(e, t) {
  const n = {}, r = l(e, ["_self"]);
  r != null && c(n, ["image"], Uw(r));
  const o = l(e, ["raiFilteredReason"]);
  o != null && c(n, ["raiFilteredReason"], o);
  const i = l(e, ["_self"]);
  i != null && c(n, ["safetyAttributes"], Fw(i));
  const s = l(e, ["prompt"]);
  return s != null && c(n, ["enhancedPrompt"], s), n;
}
function gN(e, t) {
  const n = {}, r = l(e, ["_self"]);
  r != null && c(n, ["mask"], Uw(r));
  const o = l(e, ["labels"]);
  if (o != null) {
    let i = o;
    Array.isArray(i) && (i = i.map((s) => s)), c(n, ["labels"], i);
  }
  return n;
}
function yN(e, t) {
  const n = {}, r = l(e, ["video"]);
  return r != null && c(n, ["video"], sk(r)), n;
}
function vN(e, t) {
  const n = {}, r = l(e, ["_self"]);
  return r != null && c(n, ["video"], ak(r)), n;
}
function _N(e, t) {
  const n = {}, r = l(e, ["modelSelectionConfig"]);
  r != null && c(n, ["modelConfig"], r);
  const o = l(e, ["responseJsonSchema"]);
  o != null && c(n, ["responseJsonSchema"], o);
  const i = l(e, ["audioTimestamp"]);
  i != null && c(n, ["audioTimestamp"], i);
  const s = l(e, ["candidateCount"]);
  s != null && c(n, ["candidateCount"], s);
  const a = l(e, ["enableAffectiveDialog"]);
  a != null && c(n, ["enableAffectiveDialog"], a);
  const u = l(e, ["frequencyPenalty"]);
  u != null && c(n, ["frequencyPenalty"], u);
  const f = l(e, ["logprobs"]);
  f != null && c(n, ["logprobs"], f);
  const d = l(e, ["maxOutputTokens"]);
  d != null && c(n, ["maxOutputTokens"], d);
  const h = l(e, ["mediaResolution"]);
  h != null && c(n, ["mediaResolution"], h);
  const p = l(e, ["presencePenalty"]);
  p != null && c(n, ["presencePenalty"], p);
  const m = l(e, ["responseLogprobs"]);
  m != null && c(n, ["responseLogprobs"], m);
  const g = l(e, ["responseMimeType"]);
  g != null && c(n, ["responseMimeType"], g);
  const y = l(e, ["responseModalities"]);
  y != null && c(n, ["responseModalities"], y);
  const v = l(e, ["responseSchema"]);
  v != null && c(n, ["responseSchema"], v);
  const w = l(e, ["routingConfig"]);
  w != null && c(n, ["routingConfig"], w);
  const _ = l(e, ["seed"]);
  _ != null && c(n, ["seed"], _);
  const S = l(e, ["speechConfig"]);
  S != null && c(n, ["speechConfig"], S);
  const T = l(e, ["stopSequences"]);
  T != null && c(n, ["stopSequences"], T);
  const C = l(e, ["temperature"]);
  C != null && c(n, ["temperature"], C);
  const E = l(e, ["thinkingConfig"]);
  E != null && c(n, ["thinkingConfig"], E);
  const M = l(e, ["topK"]);
  M != null && c(n, ["topK"], M);
  const I = l(e, ["topP"]);
  if (I != null && c(n, ["topP"], I), l(e, ["enableEnhancedCivicAnswers"]) !== void 0) throw new Error("enableEnhancedCivicAnswers parameter is not supported in Vertex AI.");
  return n;
}
function wN(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  return o != null && c(r, ["_url", "name"], Ae(e, o)), r;
}
function EN(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  return o != null && c(r, ["_url", "name"], Ae(e, o)), r;
}
function TN(e, t) {
  const n = {}, r = l(e, ["authConfig"]);
  r != null && c(n, ["authConfig"], vM(r));
  const o = l(e, ["enableWidget"]);
  return o != null && c(n, ["enableWidget"], o), n;
}
function SN(e, t) {
  const n = {}, r = l(e, ["searchTypes"]);
  if (r != null && c(n, ["searchTypes"], r), l(e, ["blockingConfidence"]) !== void 0) throw new Error("blockingConfidence parameter is not supported in Gemini API.");
  if (l(e, ["excludeDomains"]) !== void 0) throw new Error("excludeDomains parameter is not supported in Gemini API.");
  const o = l(e, ["timeRangeFilter"]);
  return o != null && c(n, ["timeRangeFilter"], o), n;
}
function AN(e, t) {
  const n = {}, r = l(e, ["aspectRatio"]);
  r != null && c(n, ["aspectRatio"], r);
  const o = l(e, ["imageSize"]);
  if (o != null && c(n, ["imageSize"], o), l(e, ["personGeneration"]) !== void 0) throw new Error("personGeneration parameter is not supported in Gemini API.");
  if (l(e, ["prominentPeople"]) !== void 0) throw new Error("prominentPeople parameter is not supported in Gemini API.");
  if (l(e, ["outputMimeType"]) !== void 0) throw new Error("outputMimeType parameter is not supported in Gemini API.");
  if (l(e, ["outputCompressionQuality"]) !== void 0) throw new Error("outputCompressionQuality parameter is not supported in Gemini API.");
  if (l(e, ["imageOutputOptions"]) !== void 0) throw new Error("imageOutputOptions parameter is not supported in Gemini API.");
  return n;
}
function CN(e, t) {
  const n = {}, r = l(e, ["aspectRatio"]);
  r != null && c(n, ["aspectRatio"], r);
  const o = l(e, ["imageSize"]);
  o != null && c(n, ["imageSize"], o);
  const i = l(e, ["personGeneration"]);
  i != null && c(n, ["personGeneration"], i);
  const s = l(e, ["prominentPeople"]);
  s != null && c(n, ["prominentPeople"], s);
  const a = l(e, ["outputMimeType"]);
  a != null && c(n, ["imageOutputOptions", "mimeType"], a);
  const u = l(e, ["outputCompressionQuality"]);
  u != null && c(n, ["imageOutputOptions", "compressionQuality"], u);
  const f = l(e, ["imageOutputOptions"]);
  return f != null && c(n, ["imageOutputOptions"], f), n;
}
function bN(e, t) {
  const n = {}, r = l(e, ["bytesBase64Encoded"]);
  r != null && c(n, ["imageBytes"], vr(r));
  const o = l(e, ["mimeType"]);
  return o != null && c(n, ["mimeType"], o), n;
}
function Uw(e, t) {
  const n = {}, r = l(e, ["gcsUri"]);
  r != null && c(n, ["gcsUri"], r);
  const o = l(e, ["bytesBase64Encoded"]);
  o != null && c(n, ["imageBytes"], vr(o));
  const i = l(e, ["mimeType"]);
  return i != null && c(n, ["mimeType"], i), n;
}
function au(e, t) {
  const n = {};
  if (l(e, ["gcsUri"]) !== void 0) throw new Error("gcsUri parameter is not supported in Gemini API.");
  const r = l(e, ["imageBytes"]);
  r != null && c(n, ["bytesBase64Encoded"], vr(r));
  const o = l(e, ["mimeType"]);
  return o != null && c(n, ["mimeType"], o), n;
}
function an(e, t) {
  const n = {}, r = l(e, ["gcsUri"]);
  r != null && c(n, ["gcsUri"], r);
  const o = l(e, ["imageBytes"]);
  o != null && c(n, ["bytesBase64Encoded"], vr(o));
  const i = l(e, ["mimeType"]);
  return i != null && c(n, ["mimeType"], i), n;
}
function IN(e, t, n, r) {
  const o = {}, i = l(t, ["pageSize"]);
  n !== void 0 && i != null && c(n, ["_query", "pageSize"], i);
  const s = l(t, ["pageToken"]);
  n !== void 0 && s != null && c(n, ["_query", "pageToken"], s);
  const a = l(t, ["filter"]);
  n !== void 0 && a != null && c(n, ["_query", "filter"], a);
  const u = l(t, ["queryBase"]);
  return n !== void 0 && u != null && c(n, ["_url", "models_url"], Iw(e, u)), o;
}
function RN(e, t, n, r) {
  const o = {}, i = l(t, ["pageSize"]);
  n !== void 0 && i != null && c(n, ["_query", "pageSize"], i);
  const s = l(t, ["pageToken"]);
  n !== void 0 && s != null && c(n, ["_query", "pageToken"], s);
  const a = l(t, ["filter"]);
  n !== void 0 && a != null && c(n, ["_query", "filter"], a);
  const u = l(t, ["queryBase"]);
  return n !== void 0 && u != null && c(n, ["_url", "models_url"], Iw(e, u)), o;
}
function PN(e, t, n) {
  const r = {}, o = l(t, ["config"]);
  return o != null && IN(e, o, r), r;
}
function xN(e, t, n) {
  const r = {}, o = l(t, ["config"]);
  return o != null && RN(e, o, r), r;
}
function MN(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  r != null && c(n, ["sdkHttpResponse"], r);
  const o = l(e, ["nextPageToken"]);
  o != null && c(n, ["nextPageToken"], o);
  const i = l(e, ["_self"]);
  if (i != null) {
    let s = Rw(i);
    Array.isArray(s) && (s = s.map((a) => cf(a))), c(n, ["models"], s);
  }
  return n;
}
function NN(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  r != null && c(n, ["sdkHttpResponse"], r);
  const o = l(e, ["nextPageToken"]);
  o != null && c(n, ["nextPageToken"], o);
  const i = l(e, ["_self"]);
  if (i != null) {
    let s = Rw(i);
    Array.isArray(s) && (s = s.map((a) => ff(a))), c(n, ["models"], s);
  }
  return n;
}
function kN(e, t) {
  const n = {}, r = l(e, ["maskMode"]);
  r != null && c(n, ["maskMode"], r);
  const o = l(e, ["segmentationClasses"]);
  o != null && c(n, ["maskClasses"], o);
  const i = l(e, ["maskDilation"]);
  return i != null && c(n, ["dilation"], i), n;
}
function cf(e, t) {
  const n = {}, r = l(e, ["name"]);
  r != null && c(n, ["name"], r);
  const o = l(e, ["displayName"]);
  o != null && c(n, ["displayName"], o);
  const i = l(e, ["description"]);
  i != null && c(n, ["description"], i);
  const s = l(e, ["version"]);
  s != null && c(n, ["version"], s);
  const a = l(e, ["_self"]);
  a != null && c(n, ["tunedModelInfo"], QN(a));
  const u = l(e, ["inputTokenLimit"]);
  u != null && c(n, ["inputTokenLimit"], u);
  const f = l(e, ["outputTokenLimit"]);
  f != null && c(n, ["outputTokenLimit"], f);
  const d = l(e, ["supportedGenerationMethods"]);
  d != null && c(n, ["supportedActions"], d);
  const h = l(e, ["temperature"]);
  h != null && c(n, ["temperature"], h);
  const p = l(e, ["maxTemperature"]);
  p != null && c(n, ["maxTemperature"], p);
  const m = l(e, ["topP"]);
  m != null && c(n, ["topP"], m);
  const g = l(e, ["topK"]);
  g != null && c(n, ["topK"], g);
  const y = l(e, ["thinking"]);
  return y != null && c(n, ["thinking"], y), n;
}
function ff(e, t) {
  const n = {}, r = l(e, ["name"]);
  r != null && c(n, ["name"], r);
  const o = l(e, ["displayName"]);
  o != null && c(n, ["displayName"], o);
  const i = l(e, ["description"]);
  i != null && c(n, ["description"], i);
  const s = l(e, ["versionId"]);
  s != null && c(n, ["version"], s);
  const a = l(e, ["deployedModels"]);
  if (a != null) {
    let p = a;
    Array.isArray(p) && (p = p.map((m) => JM(m))), c(n, ["endpoints"], p);
  }
  const u = l(e, ["labels"]);
  u != null && c(n, ["labels"], u);
  const f = l(e, ["_self"]);
  f != null && c(n, ["tunedModelInfo"], ZN(f));
  const d = l(e, ["defaultCheckpointId"]);
  d != null && c(n, ["defaultCheckpointId"], d);
  const h = l(e, ["checkpoints"]);
  if (h != null) {
    let p = h;
    Array.isArray(p) && (p = p.map((m) => m)), c(n, ["checkpoints"], p);
  }
  return n;
}
function DN(e, t) {
  const n = {}, r = l(e, ["mediaResolution"]);
  r != null && c(n, ["mediaResolution"], r);
  const o = l(e, ["codeExecutionResult"]);
  o != null && c(n, ["codeExecutionResult"], o);
  const i = l(e, ["executableCode"]);
  i != null && c(n, ["executableCode"], i);
  const s = l(e, ["fileData"]);
  s != null && c(n, ["fileData"], WM(s));
  const a = l(e, ["functionCall"]);
  a != null && c(n, ["functionCall"], YM(a));
  const u = l(e, ["functionResponse"]);
  u != null && c(n, ["functionResponse"], u);
  const f = l(e, ["inlineData"]);
  f != null && c(n, ["inlineData"], _M(f));
  const d = l(e, ["text"]);
  d != null && c(n, ["text"], d);
  const h = l(e, ["thought"]);
  h != null && c(n, ["thought"], h);
  const p = l(e, ["thoughtSignature"]);
  p != null && c(n, ["thoughtSignature"], p);
  const m = l(e, ["videoMetadata"]);
  m != null && c(n, ["videoMetadata"], m);
  const g = l(e, ["toolCall"]);
  g != null && c(n, ["toolCall"], g);
  const y = l(e, ["toolResponse"]);
  y != null && c(n, ["toolResponse"], y);
  const v = l(e, ["partMetadata"]);
  return v != null && c(n, ["partMetadata"], v), n;
}
function LN(e, t) {
  const n = {}, r = l(e, ["mediaResolution"]);
  r != null && c(n, ["mediaResolution"], r);
  const o = l(e, ["codeExecutionResult"]);
  o != null && c(n, ["codeExecutionResult"], o);
  const i = l(e, ["executableCode"]);
  i != null && c(n, ["executableCode"], i);
  const s = l(e, ["fileData"]);
  s != null && c(n, ["fileData"], s);
  const a = l(e, ["functionCall"]);
  a != null && c(n, ["functionCall"], a);
  const u = l(e, ["functionResponse"]);
  u != null && c(n, ["functionResponse"], u);
  const f = l(e, ["inlineData"]);
  f != null && c(n, ["inlineData"], f);
  const d = l(e, ["text"]);
  d != null && c(n, ["text"], d);
  const h = l(e, ["thought"]);
  h != null && c(n, ["thought"], h);
  const p = l(e, ["thoughtSignature"]);
  p != null && c(n, ["thoughtSignature"], p);
  const m = l(e, ["videoMetadata"]);
  if (m != null && c(n, ["videoMetadata"], m), l(e, ["toolCall"]) !== void 0) throw new Error("toolCall parameter is not supported in Vertex AI.");
  if (l(e, ["toolResponse"]) !== void 0) throw new Error("toolResponse parameter is not supported in Vertex AI.");
  if (l(e, ["partMetadata"]) !== void 0) throw new Error("partMetadata parameter is not supported in Vertex AI.");
  return n;
}
function UN(e, t) {
  const n = {}, r = l(e, ["productImage"]);
  return r != null && c(n, ["image"], an(r)), n;
}
function $N(e, t, n) {
  const r = {}, o = l(e, ["numberOfImages"]);
  t !== void 0 && o != null && c(t, ["parameters", "sampleCount"], o);
  const i = l(e, ["baseSteps"]);
  t !== void 0 && i != null && c(t, ["parameters", "baseSteps"], i);
  const s = l(e, ["outputGcsUri"]);
  t !== void 0 && s != null && c(t, ["parameters", "storageUri"], s);
  const a = l(e, ["seed"]);
  t !== void 0 && a != null && c(t, ["parameters", "seed"], a);
  const u = l(e, ["safetyFilterLevel"]);
  t !== void 0 && u != null && c(t, ["parameters", "safetySetting"], u);
  const f = l(e, ["personGeneration"]);
  t !== void 0 && f != null && c(t, ["parameters", "personGeneration"], f);
  const d = l(e, ["addWatermark"]);
  t !== void 0 && d != null && c(t, ["parameters", "addWatermark"], d);
  const h = l(e, ["outputMimeType"]);
  t !== void 0 && h != null && c(t, [
    "parameters",
    "outputOptions",
    "mimeType"
  ], h);
  const p = l(e, ["outputCompressionQuality"]);
  t !== void 0 && p != null && c(t, [
    "parameters",
    "outputOptions",
    "compressionQuality"
  ], p);
  const m = l(e, ["enhancePrompt"]);
  t !== void 0 && m != null && c(t, ["parameters", "enhancePrompt"], m);
  const g = l(e, ["labels"]);
  return t !== void 0 && g != null && c(t, ["labels"], g), r;
}
function FN(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  o != null && c(r, ["_url", "model"], Ae(e, o));
  const i = l(t, ["source"]);
  i != null && BN(i, r);
  const s = l(t, ["config"]);
  return s != null && $N(s, r), r;
}
function ON(e, t) {
  const n = {}, r = l(e, ["predictions"]);
  if (r != null) {
    let o = r;
    Array.isArray(o) && (o = o.map((i) => su(i))), c(n, ["generatedImages"], o);
  }
  return n;
}
function BN(e, t, n) {
  const r = {}, o = l(e, ["prompt"]);
  t !== void 0 && o != null && c(t, ["instances[0]", "prompt"], o);
  const i = l(e, ["personImage"]);
  t !== void 0 && i != null && c(t, [
    "instances[0]",
    "personImage",
    "image"
  ], an(i));
  const s = l(e, ["productImages"]);
  if (t !== void 0 && s != null) {
    let a = s;
    Array.isArray(a) && (a = a.map((u) => UN(u))), c(t, ["instances[0]", "productImages"], a);
  }
  return r;
}
function GN(e, t) {
  const n = {}, r = l(e, ["referenceImage"]);
  r != null && c(n, ["referenceImage"], an(r));
  const o = l(e, ["referenceId"]);
  o != null && c(n, ["referenceId"], o);
  const i = l(e, ["referenceType"]);
  i != null && c(n, ["referenceType"], i);
  const s = l(e, ["maskImageConfig"]);
  s != null && c(n, ["maskImageConfig"], kN(s));
  const a = l(e, ["controlImageConfig"]);
  a != null && c(n, ["controlImageConfig"], bM(a));
  const u = l(e, ["styleImageConfig"]);
  u != null && c(n, ["styleImageConfig"], u);
  const f = l(e, ["subjectImageConfig"]);
  return f != null && c(n, ["subjectImageConfig"], f), n;
}
function $w(e, t) {
  const n = {}, r = l(e, ["safetyAttributes", "categories"]);
  r != null && c(n, ["categories"], r);
  const o = l(e, ["safetyAttributes", "scores"]);
  o != null && c(n, ["scores"], o);
  const i = l(e, ["contentType"]);
  return i != null && c(n, ["contentType"], i), n;
}
function Fw(e, t) {
  const n = {}, r = l(e, ["safetyAttributes", "categories"]);
  r != null && c(n, ["categories"], r);
  const o = l(e, ["safetyAttributes", "scores"]);
  o != null && c(n, ["scores"], o);
  const i = l(e, ["contentType"]);
  return i != null && c(n, ["contentType"], i), n;
}
function VN(e, t) {
  const n = {}, r = l(e, ["category"]);
  if (r != null && c(n, ["category"], r), l(e, ["method"]) !== void 0) throw new Error("method parameter is not supported in Gemini API.");
  const o = l(e, ["threshold"]);
  return o != null && c(n, ["threshold"], o), n;
}
function HN(e, t) {
  const n = {}, r = l(e, ["image"]);
  return r != null && c(n, ["image"], an(r)), n;
}
function qN(e, t, n) {
  const r = {}, o = l(e, ["mode"]);
  t !== void 0 && o != null && c(t, ["parameters", "mode"], o);
  const i = l(e, ["maxPredictions"]);
  t !== void 0 && i != null && c(t, ["parameters", "maxPredictions"], i);
  const s = l(e, ["confidenceThreshold"]);
  t !== void 0 && s != null && c(t, ["parameters", "confidenceThreshold"], s);
  const a = l(e, ["maskDilation"]);
  t !== void 0 && a != null && c(t, ["parameters", "maskDilation"], a);
  const u = l(e, ["binaryColorThreshold"]);
  t !== void 0 && u != null && c(t, ["parameters", "binaryColorThreshold"], u);
  const f = l(e, ["labels"]);
  return t !== void 0 && f != null && c(t, ["labels"], f), r;
}
function KN(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  o != null && c(r, ["_url", "model"], Ae(e, o));
  const i = l(t, ["source"]);
  i != null && WN(i, r);
  const s = l(t, ["config"]);
  return s != null && qN(s, r), r;
}
function JN(e, t) {
  const n = {}, r = l(e, ["predictions"]);
  if (r != null) {
    let o = r;
    Array.isArray(o) && (o = o.map((i) => gN(i))), c(n, ["generatedMasks"], o);
  }
  return n;
}
function WN(e, t, n) {
  const r = {}, o = l(e, ["prompt"]);
  t !== void 0 && o != null && c(t, ["instances[0]", "prompt"], o);
  const i = l(e, ["image"]);
  t !== void 0 && i != null && c(t, ["instances[0]", "image"], an(i));
  const s = l(e, ["scribbleImage"]);
  return t !== void 0 && s != null && c(t, ["instances[0]", "scribble"], HN(s)), r;
}
function YN(e, t) {
  const n = {}, r = l(e, ["retrievalConfig"]);
  r != null && c(n, ["retrievalConfig"], r);
  const o = l(e, ["functionCallingConfig"]);
  o != null && c(n, ["functionCallingConfig"], zM(o));
  const i = l(e, ["includeServerSideToolInvocations"]);
  return i != null && c(n, ["includeServerSideToolInvocations"], i), n;
}
function zN(e, t) {
  const n = {}, r = l(e, ["retrievalConfig"]);
  r != null && c(n, ["retrievalConfig"], r);
  const o = l(e, ["functionCallingConfig"]);
  if (o != null && c(n, ["functionCallingConfig"], o), l(e, ["includeServerSideToolInvocations"]) !== void 0) throw new Error("includeServerSideToolInvocations parameter is not supported in Vertex AI.");
  return n;
}
function XN(e, t) {
  const n = {};
  if (l(e, ["retrieval"]) !== void 0) throw new Error("retrieval parameter is not supported in Gemini API.");
  const r = l(e, ["computerUse"]);
  r != null && c(n, ["computerUse"], r);
  const o = l(e, ["fileSearch"]);
  o != null && c(n, ["fileSearch"], o);
  const i = l(e, ["googleSearch"]);
  i != null && c(n, ["googleSearch"], SN(i));
  const s = l(e, ["googleMaps"]);
  s != null && c(n, ["googleMaps"], TN(s));
  const a = l(e, ["codeExecution"]);
  if (a != null && c(n, ["codeExecution"], a), l(e, ["enterpriseWebSearch"]) !== void 0) throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");
  const u = l(e, ["functionDeclarations"]);
  if (u != null) {
    let p = u;
    Array.isArray(p) && (p = p.map((m) => m)), c(n, ["functionDeclarations"], p);
  }
  const f = l(e, ["googleSearchRetrieval"]);
  if (f != null && c(n, ["googleSearchRetrieval"], f), l(e, ["parallelAiSearch"]) !== void 0) throw new Error("parallelAiSearch parameter is not supported in Gemini API.");
  const d = l(e, ["urlContext"]);
  d != null && c(n, ["urlContext"], d);
  const h = l(e, ["mcpServers"]);
  if (h != null) {
    let p = h;
    Array.isArray(p) && (p = p.map((m) => m)), c(n, ["mcpServers"], p);
  }
  return n;
}
function Ow(e, t) {
  const n = {}, r = l(e, ["retrieval"]);
  r != null && c(n, ["retrieval"], r);
  const o = l(e, ["computerUse"]);
  if (o != null && c(n, ["computerUse"], o), l(e, ["fileSearch"]) !== void 0) throw new Error("fileSearch parameter is not supported in Vertex AI.");
  const i = l(e, ["googleSearch"]);
  i != null && c(n, ["googleSearch"], i);
  const s = l(e, ["googleMaps"]);
  s != null && c(n, ["googleMaps"], s);
  const a = l(e, ["codeExecution"]);
  a != null && c(n, ["codeExecution"], a);
  const u = l(e, ["enterpriseWebSearch"]);
  u != null && c(n, ["enterpriseWebSearch"], u);
  const f = l(e, ["functionDeclarations"]);
  if (f != null) {
    let m = f;
    Array.isArray(m) && (m = m.map((g) => XM(g))), c(n, ["functionDeclarations"], m);
  }
  const d = l(e, ["googleSearchRetrieval"]);
  d != null && c(n, ["googleSearchRetrieval"], d);
  const h = l(e, ["parallelAiSearch"]);
  h != null && c(n, ["parallelAiSearch"], h);
  const p = l(e, ["urlContext"]);
  if (p != null && c(n, ["urlContext"], p), l(e, ["mcpServers"]) !== void 0) throw new Error("mcpServers parameter is not supported in Vertex AI.");
  return n;
}
function QN(e, t) {
  const n = {}, r = l(e, ["baseModel"]);
  r != null && c(n, ["baseModel"], r);
  const o = l(e, ["createTime"]);
  o != null && c(n, ["createTime"], o);
  const i = l(e, ["updateTime"]);
  return i != null && c(n, ["updateTime"], i), n;
}
function ZN(e, t) {
  const n = {}, r = l(e, ["labels", "google-vertex-llm-tuning-base-model-id"]);
  r != null && c(n, ["baseModel"], r);
  const o = l(e, ["createTime"]);
  o != null && c(n, ["createTime"], o);
  const i = l(e, ["updateTime"]);
  return i != null && c(n, ["updateTime"], i), n;
}
function jN(e, t, n) {
  const r = {}, o = l(e, ["displayName"]);
  t !== void 0 && o != null && c(t, ["displayName"], o);
  const i = l(e, ["description"]);
  t !== void 0 && i != null && c(t, ["description"], i);
  const s = l(e, ["defaultCheckpointId"]);
  return t !== void 0 && s != null && c(t, ["defaultCheckpointId"], s), r;
}
function ek(e, t, n) {
  const r = {}, o = l(e, ["displayName"]);
  t !== void 0 && o != null && c(t, ["displayName"], o);
  const i = l(e, ["description"]);
  t !== void 0 && i != null && c(t, ["description"], i);
  const s = l(e, ["defaultCheckpointId"]);
  return t !== void 0 && s != null && c(t, ["defaultCheckpointId"], s), r;
}
function tk(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  o != null && c(r, ["_url", "name"], Ae(e, o));
  const i = l(t, ["config"]);
  return i != null && jN(i, r), r;
}
function nk(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  o != null && c(r, ["_url", "model"], Ae(e, o));
  const i = l(t, ["config"]);
  return i != null && ek(i, r), r;
}
function rk(e, t, n) {
  const r = {}, o = l(e, ["outputGcsUri"]);
  t !== void 0 && o != null && c(t, ["parameters", "storageUri"], o);
  const i = l(e, ["safetyFilterLevel"]);
  t !== void 0 && i != null && c(t, ["parameters", "safetySetting"], i);
  const s = l(e, ["personGeneration"]);
  t !== void 0 && s != null && c(t, ["parameters", "personGeneration"], s);
  const a = l(e, ["includeRaiReason"]);
  t !== void 0 && a != null && c(t, ["parameters", "includeRaiReason"], a);
  const u = l(e, ["outputMimeType"]);
  t !== void 0 && u != null && c(t, [
    "parameters",
    "outputOptions",
    "mimeType"
  ], u);
  const f = l(e, ["outputCompressionQuality"]);
  t !== void 0 && f != null && c(t, [
    "parameters",
    "outputOptions",
    "compressionQuality"
  ], f);
  const d = l(e, ["enhanceInputImage"]);
  t !== void 0 && d != null && c(t, [
    "parameters",
    "upscaleConfig",
    "enhanceInputImage"
  ], d);
  const h = l(e, ["imagePreservationFactor"]);
  t !== void 0 && h != null && c(t, [
    "parameters",
    "upscaleConfig",
    "imagePreservationFactor"
  ], h);
  const p = l(e, ["labels"]);
  t !== void 0 && p != null && c(t, ["labels"], p);
  const m = l(e, ["numberOfImages"]);
  t !== void 0 && m != null && c(t, ["parameters", "sampleCount"], m);
  const g = l(e, ["mode"]);
  return t !== void 0 && g != null && c(t, ["parameters", "mode"], g), r;
}
function ok(e, t, n) {
  const r = {}, o = l(t, ["model"]);
  o != null && c(r, ["_url", "model"], Ae(e, o));
  const i = l(t, ["image"]);
  i != null && c(r, ["instances[0]", "image"], an(i));
  const s = l(t, ["upscaleFactor"]);
  s != null && c(r, [
    "parameters",
    "upscaleConfig",
    "upscaleFactor"
  ], s);
  const a = l(t, ["config"]);
  return a != null && rk(a, r), r;
}
function ik(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  r != null && c(n, ["sdkHttpResponse"], r);
  const o = l(e, ["predictions"]);
  if (o != null) {
    let i = o;
    Array.isArray(i) && (i = i.map((s) => su(s))), c(n, ["generatedImages"], i);
  }
  return n;
}
function sk(e, t) {
  const n = {}, r = l(e, ["uri"]);
  r != null && c(n, ["uri"], r);
  const o = l(e, ["encodedVideo"]);
  o != null && c(n, ["videoBytes"], vr(o));
  const i = l(e, ["encoding"]);
  return i != null && c(n, ["mimeType"], i), n;
}
function ak(e, t) {
  const n = {}, r = l(e, ["gcsUri"]);
  r != null && c(n, ["uri"], r);
  const o = l(e, ["bytesBase64Encoded"]);
  o != null && c(n, ["videoBytes"], vr(o));
  const i = l(e, ["mimeType"]);
  return i != null && c(n, ["mimeType"], i), n;
}
function lk(e, t) {
  const n = {}, r = l(e, ["image"]);
  r != null && c(n, ["_self"], an(r));
  const o = l(e, ["maskMode"]);
  return o != null && c(n, ["maskMode"], o), n;
}
function uk(e, t) {
  const n = {}, r = l(e, ["image"]);
  r != null && c(n, ["image"], au(r));
  const o = l(e, ["referenceType"]);
  return o != null && c(n, ["referenceType"], o), n;
}
function ck(e, t) {
  const n = {}, r = l(e, ["image"]);
  r != null && c(n, ["image"], an(r));
  const o = l(e, ["referenceType"]);
  return o != null && c(n, ["referenceType"], o), n;
}
function Bw(e, t) {
  const n = {}, r = l(e, ["uri"]);
  r != null && c(n, ["uri"], r);
  const o = l(e, ["videoBytes"]);
  o != null && c(n, ["encodedVideo"], vr(o));
  const i = l(e, ["mimeType"]);
  return i != null && c(n, ["encoding"], i), n;
}
function Gw(e, t) {
  const n = {}, r = l(e, ["uri"]);
  r != null && c(n, ["gcsUri"], r);
  const o = l(e, ["videoBytes"]);
  o != null && c(n, ["bytesBase64Encoded"], vr(o));
  const i = l(e, ["mimeType"]);
  return i != null && c(n, ["mimeType"], i), n;
}
function fk(e, t) {
  const n = {}, r = l(e, ["displayName"]);
  return t !== void 0 && r != null && c(t, ["displayName"], r), n;
}
function dk(e) {
  const t = {}, n = l(e, ["config"]);
  return n != null && fk(n, t), t;
}
function hk(e, t) {
  const n = {}, r = l(e, ["force"]);
  return t !== void 0 && r != null && c(t, ["_query", "force"], r), n;
}
function pk(e) {
  const t = {}, n = l(e, ["name"]);
  n != null && c(t, ["_url", "name"], n);
  const r = l(e, ["config"]);
  return r != null && hk(r, t), t;
}
function mk(e) {
  const t = {}, n = l(e, ["name"]);
  return n != null && c(t, ["_url", "name"], n), t;
}
function gk(e, t) {
  const n = {}, r = l(e, ["customMetadata"]);
  if (t !== void 0 && r != null) {
    let i = r;
    Array.isArray(i) && (i = i.map((s) => s)), c(t, ["customMetadata"], i);
  }
  const o = l(e, ["chunkingConfig"]);
  return t !== void 0 && o != null && c(t, ["chunkingConfig"], o), n;
}
function yk(e) {
  const t = {}, n = l(e, ["name"]);
  n != null && c(t, ["name"], n);
  const r = l(e, ["metadata"]);
  r != null && c(t, ["metadata"], r);
  const o = l(e, ["done"]);
  o != null && c(t, ["done"], o);
  const i = l(e, ["error"]);
  i != null && c(t, ["error"], i);
  const s = l(e, ["response"]);
  return s != null && c(t, ["response"], _k(s)), t;
}
function vk(e) {
  const t = {}, n = l(e, ["fileSearchStoreName"]);
  n != null && c(t, ["_url", "file_search_store_name"], n);
  const r = l(e, ["fileName"]);
  r != null && c(t, ["fileName"], r);
  const o = l(e, ["config"]);
  return o != null && gk(o, t), t;
}
function _k(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  n != null && c(t, ["sdkHttpResponse"], n);
  const r = l(e, ["parent"]);
  r != null && c(t, ["parent"], r);
  const o = l(e, ["documentName"]);
  return o != null && c(t, ["documentName"], o), t;
}
function wk(e, t) {
  const n = {}, r = l(e, ["pageSize"]);
  t !== void 0 && r != null && c(t, ["_query", "pageSize"], r);
  const o = l(e, ["pageToken"]);
  return t !== void 0 && o != null && c(t, ["_query", "pageToken"], o), n;
}
function Ek(e) {
  const t = {}, n = l(e, ["config"]);
  return n != null && wk(n, t), t;
}
function Tk(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  n != null && c(t, ["sdkHttpResponse"], n);
  const r = l(e, ["nextPageToken"]);
  r != null && c(t, ["nextPageToken"], r);
  const o = l(e, ["fileSearchStores"]);
  if (o != null) {
    let i = o;
    Array.isArray(i) && (i = i.map((s) => s)), c(t, ["fileSearchStores"], i);
  }
  return t;
}
function Vw(e, t) {
  const n = {}, r = l(e, ["mimeType"]);
  t !== void 0 && r != null && c(t, ["mimeType"], r);
  const o = l(e, ["displayName"]);
  t !== void 0 && o != null && c(t, ["displayName"], o);
  const i = l(e, ["customMetadata"]);
  if (t !== void 0 && i != null) {
    let a = i;
    Array.isArray(a) && (a = a.map((u) => u)), c(t, ["customMetadata"], a);
  }
  const s = l(e, ["chunkingConfig"]);
  return t !== void 0 && s != null && c(t, ["chunkingConfig"], s), n;
}
function Sk(e) {
  const t = {}, n = l(e, ["fileSearchStoreName"]);
  n != null && c(t, ["_url", "file_search_store_name"], n);
  const r = l(e, ["config"]);
  return r != null && Vw(r, t), t;
}
function Ak(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  return n != null && c(t, ["sdkHttpResponse"], n), t;
}
var Ck = "Content-Type", bk = "X-Server-Timeout", Ik = "User-Agent", df = "x-goog-api-client", Rk = "google-genai-sdk/1.50.1", Pk = "v1beta1", xk = "v1beta", Mk = /* @__PURE__ */ new Set(["us", "eu"]), Nk = 5, kk = [
  408,
  429,
  500,
  502,
  503,
  504
], Dk = class {
  constructor(e) {
    var t, n, r;
    this.clientOptions = Object.assign({}, e), this.customBaseUrl = (t = e.httpOptions) === null || t === void 0 ? void 0 : t.baseUrl, this.clientOptions.vertexai && (this.clientOptions.project && this.clientOptions.location ? this.clientOptions.apiKey = void 0 : this.clientOptions.apiKey && (this.clientOptions.project = void 0, this.clientOptions.location = void 0));
    const o = {};
    if (this.clientOptions.vertexai) {
      if (!this.clientOptions.location && !this.clientOptions.apiKey && !this.customBaseUrl && (this.clientOptions.location = "global"), !(this.clientOptions.project && this.clientOptions.location || this.clientOptions.apiKey) && !this.customBaseUrl) throw new Error("Authentication is not set up. Please provide either a project and location, or an API key, or a custom base URL.");
      const i = e.project && e.location || !!e.apiKey;
      this.customBaseUrl && !i ? (o.baseUrl = this.customBaseUrl, this.clientOptions.project = void 0, this.clientOptions.location = void 0) : this.clientOptions.apiKey || this.clientOptions.location === "global" ? o.baseUrl = "https://aiplatform.googleapis.com/" : this.clientOptions.project && this.clientOptions.location && Mk.has(this.clientOptions.location) ? o.baseUrl = `https://aiplatform.${this.clientOptions.location}.rep.googleapis.com/` : this.clientOptions.project && this.clientOptions.location && (o.baseUrl = `https://${this.clientOptions.location}-aiplatform.googleapis.com/`), o.apiVersion = (n = this.clientOptions.apiVersion) !== null && n !== void 0 ? n : Pk;
    } else
      this.clientOptions.apiKey || console.warn("API key should be set when using the Gemini API."), o.apiVersion = (r = this.clientOptions.apiVersion) !== null && r !== void 0 ? r : xk, o.baseUrl = "https://generativelanguage.googleapis.com/";
    o.headers = this.getDefaultHeaders(), this.clientOptions.httpOptions = o, e.httpOptions && (this.clientOptions.httpOptions = this.patchHttpOptions(o, e.httpOptions));
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
    const r = [this.getRequestUrlInternal(t)];
    return n && r.push(this.getBaseResourcePath()), e !== "" && r.push(e), new URL(`${r.join("/")}`);
  }
  shouldPrependVertexProjectPath(e, t) {
    return !(t.baseUrl && t.baseUrlResourceScope === sf.COLLECTION || this.clientOptions.apiKey || !this.clientOptions.vertexai || e.path.startsWith("projects/") || e.httpMethod === "GET" && e.path.startsWith("publishers/google/models"));
  }
  async request(e) {
    let t = this.clientOptions.httpOptions;
    e.httpOptions && (t = this.patchHttpOptions(this.clientOptions.httpOptions, e.httpOptions));
    const n = this.shouldPrependVertexProjectPath(e, t), r = this.constructUrl(e.path, t, n);
    if (e.queryParams) for (const [i, s] of Object.entries(e.queryParams)) r.searchParams.append(i, String(s));
    let o = {};
    if (e.httpMethod === "GET") {
      if (e.body && e.body !== "{}") throw new Error("Request body should be empty for GET request, but got non empty request body");
    } else o.body = e.body;
    return o = await this.includeExtraHttpOptionsToRequestInit(o, t, r.toString(), e.abortSignal), this.unaryApiCall(r, o, e.httpMethod);
  }
  patchHttpOptions(e, t) {
    const n = JSON.parse(JSON.stringify(e));
    for (const [r, o] of Object.entries(t)) typeof o == "object" ? n[r] = Object.assign(Object.assign({}, n[r]), o) : o !== void 0 && (n[r] = o);
    return n;
  }
  async requestStream(e) {
    let t = this.clientOptions.httpOptions;
    e.httpOptions && (t = this.patchHttpOptions(this.clientOptions.httpOptions, e.httpOptions));
    const n = this.shouldPrependVertexProjectPath(e, t), r = this.constructUrl(e.path, t, n);
    (!r.searchParams.has("alt") || r.searchParams.get("alt") !== "sse") && r.searchParams.set("alt", "sse");
    let o = {};
    return o.body = e.body, o = await this.includeExtraHttpOptionsToRequestInit(o, t, r.toString(), e.abortSignal), this.streamApiCall(r, o, e.httpMethod);
  }
  async includeExtraHttpOptionsToRequestInit(e, t, n, r) {
    if (t && t.timeout || r) {
      const o = new AbortController(), i = o.signal;
      if (t.timeout && t?.timeout > 0) {
        const s = setTimeout(() => o.abort(), t.timeout);
        s && typeof s.unref == "function" && s.unref();
      }
      r && r.addEventListener("abort", () => {
        o.abort();
      }), e.signal = i;
    }
    return t && t.extraBody !== null && Lk(e, t.extraBody), e.headers = await this.getHeadersInternal(t, n), e;
  }
  async unaryApiCall(e, t, n) {
    return this.apiCall(e.toString(), Object.assign(Object.assign({}, t), { method: n })).then(async (r) => (await Rg(r), new af(r))).catch((r) => {
      throw r instanceof Error ? r : new Error(JSON.stringify(r));
    });
  }
  async streamApiCall(e, t, n) {
    return this.apiCall(e.toString(), Object.assign(Object.assign({}, t), { method: n })).then(async (r) => (await Rg(r), this.processStreamResponse(r))).catch((r) => {
      throw r instanceof Error ? r : new Error(JSON.stringify(r));
    });
  }
  processStreamResponse(e) {
    return nn(this, arguments, function* () {
      var n;
      const r = (n = e?.body) === null || n === void 0 ? void 0 : n.getReader(), o = new TextDecoder("utf-8");
      if (!r) throw new Error("Response body is empty");
      try {
        let i = "";
        const s = "data:", a = [
          `

`,
          "\r\r",
          `\r
\r
`
        ];
        for (; ; ) {
          const { done: u, value: f } = yield ge(r.read());
          if (u) {
            if (i.trim().length > 0) throw new Error("Incomplete JSON segment at the end");
            break;
          }
          const d = o.decode(f, { stream: !0 });
          try {
            const m = JSON.parse(d);
            if ("error" in m) {
              const g = JSON.parse(JSON.stringify(m.error)), y = g.status, v = g.code, w = `got status: ${y}. ${JSON.stringify(m)}`;
              if (v >= 400 && v < 600) throw new Dw({
                message: w,
                status: v
              });
            }
          } catch (m) {
            if (m.name === "ApiError") throw m;
          }
          i += d;
          let h = -1, p = 0;
          for (; ; ) {
            h = -1, p = 0;
            for (const y of a) {
              const v = i.indexOf(y);
              v !== -1 && (h === -1 || v < h) && (h = v, p = y.length);
            }
            if (h === -1) break;
            const m = i.substring(0, h);
            i = i.substring(h + p);
            const g = m.trim();
            if (g.startsWith(s)) {
              const y = g.substring(5).trim();
              try {
                yield yield ge(new af(new Response(y, {
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
        r.releaseLock();
      }
    });
  }
  async apiCall(e, t) {
    var n;
    if (!this.clientOptions.httpOptions || !this.clientOptions.httpOptions.retryOptions) return fetch(e, t);
    const r = this.clientOptions.httpOptions.retryOptions, o = async () => {
      const i = await fetch(e, t);
      if (i.ok) return i;
      throw kk.includes(i.status) ? new Error(`Retryable HTTP Error: ${i.statusText}`) : new em.AbortError(`Non-retryable exception ${i.statusText} sending request`);
    };
    return (0, em.default)(o, { retries: ((n = r.attempts) !== null && n !== void 0 ? n : Nk) - 1 });
  }
  getDefaultHeaders() {
    const e = {}, t = Rk + " " + this.clientOptions.userAgentExtra;
    return e[Ik] = t, e[df] = t, e[Ck] = "application/json", e;
  }
  async getHeadersInternal(e, t) {
    const n = new Headers();
    if (e && e.headers) {
      for (const [r, o] of Object.entries(e.headers)) n.append(r, o);
      e.timeout && e.timeout > 0 && n.append(bk, String(Math.ceil(e.timeout / 1e3)));
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
    const r = {};
    t != null && (r.mimeType = t.mimeType, r.name = t.name, r.displayName = t.displayName), r.name && !r.name.startsWith("files/") && (r.name = `files/${r.name}`);
    const o = this.clientOptions.uploader, i = await o.stat(e);
    r.sizeBytes = String(i.size);
    const s = (n = t?.mimeType) !== null && n !== void 0 ? n : i.type;
    if (s === void 0 || s === "") throw new Error("Can not determine mimeType. Please provide mimeType in the config.");
    r.mimeType = s;
    const a = { file: r }, u = this.getFileName(e), f = X("upload/v1beta/files", a._url), d = await this.fetchUploadUrl(f, r.sizeBytes, r.mimeType, u, a, t?.httpOptions);
    return o.upload(e, d, this);
  }
  async uploadFileToFileSearchStore(e, t, n) {
    var r;
    const o = this.clientOptions.uploader, i = await o.stat(t), s = String(i.size), a = (r = n?.mimeType) !== null && r !== void 0 ? r : i.type;
    if (a === void 0 || a === "") throw new Error("Can not determine mimeType. Please provide mimeType in the config.");
    const u = `upload/v1beta/${e}:uploadToFileSearchStore`, f = this.getFileName(t), d = {};
    n != null && Vw(n, d);
    const h = await this.fetchUploadUrl(u, s, a, f, d, n?.httpOptions);
    return o.uploadToFileSearchStore(t, h, this);
  }
  async downloadFile(e) {
    await this.clientOptions.downloader.download(e, this);
  }
  async fetchUploadUrl(e, t, n, r, o, i) {
    var s;
    let a = {};
    i ? a = i : a = {
      apiVersion: "",
      headers: Object.assign({
        "Content-Type": "application/json",
        "X-Goog-Upload-Protocol": "resumable",
        "X-Goog-Upload-Command": "start",
        "X-Goog-Upload-Header-Content-Length": `${t}`,
        "X-Goog-Upload-Header-Content-Type": `${n}`
      }, r ? { "X-Goog-Upload-File-Name": r } : {})
    };
    const u = await this.request({
      path: e,
      body: JSON.stringify(o),
      httpMethod: "POST",
      httpOptions: a
    });
    if (!u || !u?.headers) throw new Error("Server did not return an HttpResponse or the returned HttpResponse did not have headers.");
    const f = (s = u?.headers) === null || s === void 0 ? void 0 : s["x-goog-upload-url"];
    if (f === void 0) throw new Error("Failed to get upload url. Server did not return the x-google-upload-url in the headers");
    return f;
  }
};
async function Rg(e) {
  var t;
  if (e === void 0) throw new Error("response is undefined");
  if (!e.ok) {
    const n = e.status;
    let r;
    !((t = e.headers.get("content-type")) === null || t === void 0) && t.includes("application/json") ? r = await e.json() : r = { error: {
      message: await e.text(),
      code: e.status,
      status: e.statusText
    } };
    const o = JSON.stringify(r);
    throw n >= 400 && n < 600 ? new Dw({
      message: o,
      status: n
    }) : new Error(o);
  }
}
function Lk(e, t) {
  if (!t || Object.keys(t).length === 0) return;
  if (e.body instanceof Blob) {
    console.warn("includeExtraBodyToRequestInit: extraBody provided but current request body is a Blob. extraBody will be ignored as merging is not supported for Blob bodies.");
    return;
  }
  let n = {};
  if (typeof e.body == "string" && e.body.length > 0) try {
    const i = JSON.parse(e.body);
    if (typeof i == "object" && i !== null && !Array.isArray(i)) n = i;
    else {
      console.warn("includeExtraBodyToRequestInit: Original request body is valid JSON but not a non-array object. Skip applying extraBody to the request body.");
      return;
    }
  } catch {
    console.warn("includeExtraBodyToRequestInit: Original request body is not valid JSON. Skip applying extraBody to the request body.");
    return;
  }
  function r(i, s) {
    const a = Object.assign({}, i);
    for (const u in s) if (Object.prototype.hasOwnProperty.call(s, u)) {
      const f = s[u], d = a[u];
      f && typeof f == "object" && !Array.isArray(f) && d && typeof d == "object" && !Array.isArray(d) ? a[u] = r(d, f) : (d && f && typeof d != typeof f && console.warn(`includeExtraBodyToRequestInit:deepMerge: Type mismatch for key "${u}". Original type: ${typeof d}, New type: ${typeof f}. Overwriting.`), a[u] = f);
    }
    return a;
  }
  const o = r(n, t);
  e.body = JSON.stringify(o);
}
var Uk = "mcp_used/unknown", $k = !1;
function Hw(e) {
  for (const t of e)
    if (Fk(t) || typeof t == "object" && "inputSchema" in t) return !0;
  return $k;
}
function qw(e) {
  var t;
  e[df] = (((t = e[df]) !== null && t !== void 0 ? t : "") + ` ${Uk}`).trimStart();
}
function Fk(e) {
  return e !== null && typeof e == "object" && e instanceof Bk;
}
function Ok(e) {
  return nn(this, arguments, function* (n, r = 100) {
    let o, i = 0;
    for (; i < r; ) {
      const s = yield ge(n.listTools({ cursor: o }));
      for (const a of s.tools)
        yield yield ge(a), i++;
      if (!s.nextCursor) break;
      o = s.nextCursor;
    }
  });
}
var Bk = class Kw {
  constructor(t = [], n) {
    this.mcpTools = [], this.functionNameToMcpClient = {}, this.mcpClients = t, this.config = n;
  }
  static create(t, n) {
    return new Kw(t, n);
  }
  async initialize() {
    var t, n, r, o;
    if (this.mcpTools.length > 0) return;
    const i = {}, s = [];
    for (const d of this.mcpClients) try {
      for (var a = !0, u = (n = void 0, rn(Ok(d))), f; f = await u.next(), t = f.done, !t; a = !0) {
        o = f.value, a = !1;
        const h = o;
        s.push(h);
        const p = h.name;
        if (i[p]) throw new Error(`Duplicate function name ${p} found in MCP tools. Please ensure function names are unique.`);
        i[p] = d;
      }
    } catch (h) {
      n = { error: h };
    } finally {
      try {
        !a && !t && (r = u.return) && await r.call(u);
      } finally {
        if (n) throw n.error;
      }
    }
    this.mcpTools = s, this.functionNameToMcpClient = i;
  }
  async tool() {
    return await this.initialize(), eP(this.mcpTools, this.config);
  }
  async callTool(t) {
    await this.initialize();
    const n = [];
    for (const r of t) if (r.name in this.functionNameToMcpClient) {
      const o = this.functionNameToMcpClient[r.name];
      let i;
      this.config.timeout && (i = { timeout: this.config.timeout });
      const s = await o.callTool({
        name: r.name,
        arguments: r.args
      }, void 0, i);
      n.push({ functionResponse: {
        name: r.name,
        response: s.isError ? { error: s } : s
      } });
    }
    return n;
  }
};
async function Gk(e, t, n) {
  const r = new KR();
  let o;
  n.data instanceof Blob ? o = JSON.parse(await n.data.text()) : o = JSON.parse(n.data), Object.assign(r, o), t(r);
}
var Vk = class {
  constructor(e, t, n) {
    this.apiClient = e, this.auth = t, this.webSocketFactory = n;
  }
  async connect(e) {
    var t, n;
    if (this.apiClient.isVertexAI()) throw new Error("Live music is not supported for Vertex AI.");
    console.warn("Live music generation is experimental and may change in future versions.");
    const r = this.apiClient.getWebsocketBaseUrl(), o = this.apiClient.getApiVersion(), i = Kk(this.apiClient.getDefaultHeaders()), s = `${r}/ws/google.ai.generativelanguage.${o}.GenerativeService.BidiGenerateMusic?key=${this.apiClient.getApiKey()}`;
    let a = () => {
    };
    const u = new Promise((y) => {
      a = y;
    }), f = e.callbacks, d = function() {
      a({});
    }, h = this.apiClient, p = {
      onopen: d,
      onmessage: (y) => {
        Gk(h, f.onmessage, y);
      },
      onerror: (t = f?.onerror) !== null && t !== void 0 ? t : function(y) {
      },
      onclose: (n = f?.onclose) !== null && n !== void 0 ? n : function(y) {
      }
    }, m = this.webSocketFactory.create(s, qk(i), p);
    m.connect(), await u;
    const g = { setup: { model: Ae(this.apiClient, e.model) } };
    return m.send(JSON.stringify(g)), new Hk(m, this.apiClient);
  }
}, Hk = class {
  constructor(e, t) {
    this.conn = e, this.apiClient = t;
  }
  async setWeightedPrompts(e) {
    if (!e.weightedPrompts || Object.keys(e.weightedPrompts).length === 0) throw new Error("Weighted prompts must be set and contain at least one entry.");
    const t = sM(e);
    this.conn.send(JSON.stringify({ clientContent: t }));
  }
  async setMusicGenerationConfig(e) {
    e.musicGenerationConfig || (e.musicGenerationConfig = {});
    const t = iM(e);
    this.conn.send(JSON.stringify(t));
  }
  sendPlaybackControl(e) {
    const t = { playbackControl: e };
    this.conn.send(JSON.stringify(t));
  }
  play() {
    this.sendPlaybackControl(Ao.PLAY);
  }
  pause() {
    this.sendPlaybackControl(Ao.PAUSE);
  }
  stop() {
    this.sendPlaybackControl(Ao.STOP);
  }
  resetContext() {
    this.sendPlaybackControl(Ao.RESET_CONTEXT);
  }
  close() {
    this.conn.close();
  }
};
function qk(e) {
  const t = {};
  return e.forEach((n, r) => {
    t[r] = n;
  }), t;
}
function Kk(e) {
  const t = new Headers();
  for (const [n, r] of Object.entries(e)) t.append(n, r);
  return t;
}
var Jk = "FunctionResponse request must have an `id` field from the response of a ToolCall.FunctionalCalls in Google AI.";
async function Wk(e, t, n) {
  const r = new qR();
  let o;
  n.data instanceof Blob ? o = await n.data.text() : n.data instanceof ArrayBuffer ? o = new TextDecoder().decode(n.data) : o = n.data;
  const i = JSON.parse(o);
  if (e.isVertexAI()) {
    const s = uM(i);
    Object.assign(r, s);
  } else Object.assign(r, i);
  t(r);
}
var Yk = class {
  constructor(e, t, n) {
    this.apiClient = e, this.auth = t, this.webSocketFactory = n, this.music = new Vk(this.apiClient, this.auth, this.webSocketFactory);
  }
  async connect(e) {
    var t, n, r, o, i, s;
    if (e.config && e.config.httpOptions) throw new Error("The Live module does not support httpOptions at request-level in LiveConnectConfig yet. Please use the client-level httpOptions configuration instead.");
    const a = this.apiClient.getWebsocketBaseUrl(), u = this.apiClient.getApiVersion();
    let f;
    const d = this.apiClient.getHeaders();
    e.config && e.config.tools && Hw(e.config.tools) && qw(d);
    const h = Zk(d);
    if (this.apiClient.isVertexAI()) {
      const I = this.apiClient.getProject(), D = this.apiClient.getLocation(), $ = this.apiClient.getApiKey(), q = !!I && !!D || !!$;
      this.apiClient.getCustomBaseUrl() && !q ? f = a : (f = `${a}/ws/google.cloud.aiplatform.${u}.LlmBidiService/BidiGenerateContent`, await this.auth.addAuthHeaders(h, f));
    } else {
      const I = this.apiClient.getApiKey();
      let D = "BidiGenerateContent", $ = "key";
      I?.startsWith("auth_tokens/") && (console.warn("Warning: Ephemeral token support is experimental and may change in future versions."), u !== "v1alpha" && console.warn("Warning: The SDK's ephemeral token support is in v1alpha only. Please use const ai = new GoogleGenAI({apiKey: token.name, httpOptions: { apiVersion: 'v1alpha' }}); before session connection."), D = "BidiGenerateContentConstrained", $ = "access_token"), f = `${a}/ws/google.ai.generativelanguage.${u}.GenerativeService.${D}?${$}=${I}`;
    }
    let p = () => {
    };
    const m = new Promise((I) => {
      p = I;
    }), g = e.callbacks, y = function() {
      var I;
      (I = g?.onopen) === null || I === void 0 || I.call(g), p({});
    }, v = this.apiClient, w = {
      onopen: y,
      onmessage: (I) => {
        Wk(v, g.onmessage, I);
      },
      onerror: (t = g?.onerror) !== null && t !== void 0 ? t : function(I) {
      },
      onclose: (n = g?.onclose) !== null && n !== void 0 ? n : function(I) {
      }
    }, _ = this.webSocketFactory.create(f, Qk(h), w);
    _.connect(), await m;
    let S = Ae(this.apiClient, e.model);
    if (this.apiClient.isVertexAI() && S.startsWith("publishers/")) {
      const I = this.apiClient.getProject(), D = this.apiClient.getLocation();
      I && D && (S = `projects/${I}/locations/${D}/` + S);
    }
    let T = {};
    this.apiClient.isVertexAI() && ((r = e.config) === null || r === void 0 ? void 0 : r.responseModalities) === void 0 && (e.config === void 0 ? e.config = { responseModalities: [Sl.AUDIO] } : e.config.responseModalities = [Sl.AUDIO]), !((o = e.config) === null || o === void 0) && o.generationConfig && console.warn("Setting `LiveConnectConfig.generation_config` is deprecated, please set the fields on `LiveConnectConfig` directly. This will become an error in a future version (not before Q3 2025).");
    const C = (s = (i = e.config) === null || i === void 0 ? void 0 : i.tools) !== null && s !== void 0 ? s : [], E = [];
    for (const I of C) if (this.isCallableTool(I)) {
      const D = I;
      E.push(await D.tool());
    } else E.push(I);
    E.length > 0 && (e.config.tools = E);
    const M = {
      model: S,
      config: e.config,
      callbacks: e.callbacks
    };
    return this.apiClient.isVertexAI() ? T = oM(this.apiClient, M) : T = rM(this.apiClient, M), delete T.config, _.send(JSON.stringify(T)), new Xk(_, this.apiClient);
  }
  isCallableTool(e) {
    return "callTool" in e && typeof e.callTool == "function";
  }
}, zk = { turnComplete: !0 }, Xk = class {
  constructor(e, t) {
    this.conn = e, this.apiClient = t;
  }
  tLiveClientContent(e, t) {
    if (t.turns !== null && t.turns !== void 0) {
      let n = [];
      try {
        n = At(t.turns), e.isVertexAI() || (n = n.map((r) => Bs(r)));
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
    for (const r of n) {
      if (typeof r != "object" || r === null || !("name" in r) || !("response" in r)) throw new Error(`Could not parse function response, type '${typeof r}'.`);
      if (!e.isVertexAI() && !("id" in r)) throw new Error(Jk);
    }
    return { toolResponse: { functionResponses: n } };
  }
  sendClientContent(e) {
    e = Object.assign(Object.assign({}, zk), e);
    const t = this.tLiveClientContent(this.apiClient, e);
    this.conn.send(JSON.stringify(t));
  }
  sendRealtimeInput(e) {
    let t = {};
    this.apiClient.isVertexAI() ? t = { realtimeInput: lM(e) } : t = { realtimeInput: aM(e) }, this.conn.send(JSON.stringify(t));
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
function Qk(e) {
  const t = {};
  return e.forEach((n, r) => {
    t[r] = n;
  }), t;
}
function Zk(e) {
  const t = new Headers();
  for (const [n, r] of Object.entries(e)) t.append(n, r);
  return t;
}
var Pg = 10;
function xg(e) {
  var t, n, r;
  if (!((t = e?.automaticFunctionCalling) === null || t === void 0) && t.disable) return !0;
  let o = !1;
  for (const s of (n = e?.tools) !== null && n !== void 0 ? n : []) if (Lo(s)) {
    o = !0;
    break;
  }
  if (!o) return !0;
  const i = (r = e?.automaticFunctionCalling) === null || r === void 0 ? void 0 : r.maximumRemoteCalls;
  return i && (i < 0 || !Number.isInteger(i)) || i == 0 ? (console.warn("Invalid maximumRemoteCalls value provided for automatic function calling. Disabled automatic function calling. Please provide a valid integer value greater than 0. maximumRemoteCalls provided:", i), !0) : !1;
}
function Lo(e) {
  return "callTool" in e && typeof e.callTool == "function";
}
function jk(e) {
  var t, n, r;
  return (r = (n = (t = e.config) === null || t === void 0 ? void 0 : t.tools) === null || n === void 0 ? void 0 : n.some((o) => Lo(o))) !== null && r !== void 0 ? r : !1;
}
function Mg(e) {
  var t;
  const n = [];
  return !((t = e?.config) === null || t === void 0) && t.tools && e.config.tools.forEach((r, o) => {
    if (Lo(r)) return;
    const i = r;
    i.functionDeclarations && i.functionDeclarations.length > 0 && n.push(o);
  }), n;
}
function Ng(e) {
  var t;
  return !(!((t = e?.automaticFunctionCalling) === null || t === void 0) && t.ignoreCallHistory);
}
var eD = class extends Wn {
  constructor(e) {
    super(), this.apiClient = e, this.embedContent = async (t) => {
      if (!this.apiClient.isVertexAI())
        return t.model.includes("gemini-embedding-2") && (t.contents = At(t.contents)), await this.embedContentInternal(t);
      if (t.model.includes("gemini") && t.model !== "gemini-embedding-001" || t.model.includes("maas")) {
        const n = At(t.contents);
        if (n.length > 1) throw new Error("The embedContent API for this model only supports one content at a time.");
        const r = Object.assign(Object.assign({}, t), {
          content: n[0],
          embeddingApiType: Al.EMBED_CONTENT
        });
        return await this.embedContentInternal(r);
      } else {
        const n = Object.assign(Object.assign({}, t), { embeddingApiType: Al.PREDICT });
        return await this.embedContentInternal(n);
      }
    }, this.generateContent = async (t) => {
      var n, r, o, i, s;
      const a = await this.processParamsMaybeAddMcpUsage(t);
      if (this.maybeMoveToResponseJsonSchem(t), !jk(t) || xg(t.config)) return await this.generateContentInternal(a);
      const u = Mg(t);
      if (u.length > 0) {
        const g = u.map((y) => `tools[${y}]`).join(", ");
        throw new Error(`Automatic function calling with CallableTools (or MCP objects) and basic FunctionDeclarations is not yet supported. Incompatible tools found at ${g}.`);
      }
      let f, d;
      const h = At(a.contents), p = (o = (r = (n = a.config) === null || n === void 0 ? void 0 : n.automaticFunctionCalling) === null || r === void 0 ? void 0 : r.maximumRemoteCalls) !== null && o !== void 0 ? o : Pg;
      let m = 0;
      for (; m < p && (f = await this.generateContentInternal(a), !(!f.functionCalls || f.functionCalls.length === 0)); ) {
        const g = f.candidates[0].content, y = [];
        for (const v of (s = (i = t.config) === null || i === void 0 ? void 0 : i.tools) !== null && s !== void 0 ? s : []) if (Lo(v)) {
          const w = await v.callTool(f.functionCalls);
          y.push(...w);
        }
        m++, d = {
          role: "user",
          parts: y
        }, a.contents = At(a.contents), a.contents.push(g), a.contents.push(d), Ng(a.config) && (h.push(g), h.push(d));
      }
      return Ng(a.config) && (f.automaticFunctionCallingHistory = h), f;
    }, this.generateContentStream = async (t) => {
      var n, r, o, i, s;
      if (this.maybeMoveToResponseJsonSchem(t), xg(t.config)) {
        const d = await this.processParamsMaybeAddMcpUsage(t);
        return await this.generateContentStreamInternal(d);
      }
      const a = Mg(t);
      if (a.length > 0) {
        const d = a.map((h) => `tools[${h}]`).join(", ");
        throw new Error(`Incompatible tools found at ${d}. Automatic function calling with CallableTools (or MCP objects) and basic FunctionDeclarations" is not yet supported.`);
      }
      const u = (o = (r = (n = t?.config) === null || n === void 0 ? void 0 : n.toolConfig) === null || r === void 0 ? void 0 : r.functionCallingConfig) === null || o === void 0 ? void 0 : o.streamFunctionCallArguments, f = (s = (i = t?.config) === null || i === void 0 ? void 0 : i.automaticFunctionCalling) === null || s === void 0 ? void 0 : s.disable;
      if (u && !f) throw new Error("Running in streaming mode with 'streamFunctionCallArguments' enabled, this feature is not compatible with automatic function calling (AFC). Please set 'config.automaticFunctionCalling.disable' to true to disable AFC or leave 'config.toolConfig.functionCallingConfig.streamFunctionCallArguments' to be undefined or set to false to disable streaming function call arguments feature.");
      return await this.processAfcStream(t);
    }, this.generateImages = async (t) => await this.generateImagesInternal(t).then((n) => {
      var r;
      let o;
      const i = [];
      if (n?.generatedImages) for (const a of n.generatedImages) a && a?.safetyAttributes && ((r = a?.safetyAttributes) === null || r === void 0 ? void 0 : r.contentType) === "Positive Prompt" ? o = a?.safetyAttributes : i.push(a);
      let s;
      return o ? s = {
        generatedImages: i,
        positivePromptSafetyAttributes: o,
        sdkHttpResponse: n.sdkHttpResponse
      } : s = {
        generatedImages: i,
        sdkHttpResponse: n.sdkHttpResponse
      }, s;
    }), this.list = async (t) => {
      var n;
      const r = { config: Object.assign(Object.assign({}, { queryBase: !0 }), t?.config) };
      if (this.apiClient.isVertexAI() && !r.config.queryBase) {
        if (!((n = r.config) === null || n === void 0) && n.filter) throw new Error("Filtering tuned models list for Vertex AI is not currently supported");
        r.config.filter = "labels.tune-type:*";
      }
      return new jr(Kn.PAGED_ITEM_MODELS, (o) => this.listInternal(o), await this.listInternal(r), r);
    }, this.editImage = async (t) => {
      const n = {
        model: t.model,
        prompt: t.prompt,
        referenceImages: [],
        config: t.config
      };
      return t.referenceImages && t.referenceImages && (n.referenceImages = t.referenceImages.map((r) => r.toReferenceImageAPI())), await this.editImageInternal(n);
    }, this.upscaleImage = async (t) => {
      let n = {
        numberOfImages: 1,
        mode: "upscale"
      };
      t.config && (n = Object.assign(Object.assign({}, n), t.config));
      const r = {
        model: t.model,
        image: t.image,
        upscaleFactor: t.upscaleFactor,
        config: n
      };
      return await this.upscaleImageInternal(r);
    }, this.generateVideos = async (t) => {
      var n, r, o, i, s, a;
      if ((t.prompt || t.image || t.video) && t.source) throw new Error("Source and prompt/image/video are mutually exclusive. Please only use source.");
      return this.apiClient.isVertexAI() || (!((n = t.video) === null || n === void 0) && n.uri && (!((r = t.video) === null || r === void 0) && r.videoBytes) ? t.video = {
        uri: t.video.uri,
        mimeType: t.video.mimeType
      } : !((i = (o = t.source) === null || o === void 0 ? void 0 : o.video) === null || i === void 0) && i.uri && (!((a = (s = t.source) === null || s === void 0 ? void 0 : s.video) === null || a === void 0) && a.videoBytes) && (t.source.video = {
        uri: t.source.video.uri,
        mimeType: t.source.video.mimeType
      })), await this.generateVideosInternal(t);
    };
  }
  maybeMoveToResponseJsonSchem(e) {
    e.config && e.config.responseSchema && (e.config.responseJsonSchema || Object.keys(e.config.responseSchema).includes("$schema") && (e.config.responseJsonSchema = e.config.responseSchema, delete e.config.responseSchema));
  }
  async processParamsMaybeAddMcpUsage(e) {
    var t, n, r;
    const o = (t = e.config) === null || t === void 0 ? void 0 : t.tools;
    if (!o) return e;
    const i = await Promise.all(o.map(async (a) => Lo(a) ? await a.tool() : a)), s = {
      model: e.model,
      contents: e.contents,
      config: Object.assign(Object.assign({}, e.config), { tools: i })
    };
    if (s.config.tools = i, e.config && e.config.tools && Hw(e.config.tools)) {
      const a = (r = (n = e.config.httpOptions) === null || n === void 0 ? void 0 : n.headers) !== null && r !== void 0 ? r : {};
      let u = Object.assign({}, a);
      Object.keys(u).length === 0 && (u = this.apiClient.getDefaultHeaders()), qw(u), s.config.httpOptions = Object.assign(Object.assign({}, e.config.httpOptions), { headers: u });
    }
    return s;
  }
  async initAfcToolsMap(e) {
    var t, n, r;
    const o = /* @__PURE__ */ new Map();
    for (const i of (n = (t = e.config) === null || t === void 0 ? void 0 : t.tools) !== null && n !== void 0 ? n : []) if (Lo(i)) {
      const s = i, a = await s.tool();
      for (const u of (r = a.functionDeclarations) !== null && r !== void 0 ? r : []) {
        if (!u.name) throw new Error("Function declaration name is required.");
        if (o.has(u.name)) throw new Error(`Duplicate tool declaration name: ${u.name}`);
        o.set(u.name, s);
      }
    }
    return o;
  }
  async processAfcStream(e) {
    var t, n, r;
    const o = (r = (n = (t = e.config) === null || t === void 0 ? void 0 : t.automaticFunctionCalling) === null || n === void 0 ? void 0 : n.maximumRemoteCalls) !== null && r !== void 0 ? r : Pg;
    let i = !1, s = 0;
    const a = await this.initAfcToolsMap(e);
    return (function(u, f, d) {
      return nn(this, arguments, function* () {
        for (var h, p, m, g, y, v; s < o; ) {
          i && (s++, i = !1);
          const T = yield ge(u.processParamsMaybeAddMcpUsage(d)), C = yield ge(u.generateContentStreamInternal(T)), E = [], M = [];
          try {
            for (var w = !0, _ = (p = void 0, rn(C)), S; S = yield ge(_.next()), h = S.done, !h; w = !0) {
              g = S.value, w = !1;
              const I = g;
              if (yield yield ge(I), I.candidates && (!((y = I.candidates[0]) === null || y === void 0) && y.content)) {
                M.push(I.candidates[0].content);
                for (const D of (v = I.candidates[0].content.parts) !== null && v !== void 0 ? v : []) if (s < o && D.functionCall) {
                  if (!D.functionCall.name) throw new Error("Function call name was not returned by the model.");
                  if (f.has(D.functionCall.name)) {
                    const $ = yield ge(f.get(D.functionCall.name).callTool([D.functionCall]));
                    E.push(...$);
                  } else
                    throw new Error(`Automatic function calling was requested, but not all the tools the model used implement the CallableTool interface. Available tools: ${f.keys()}, mising tool: ${D.functionCall.name}`);
                }
              }
            }
          } catch (I) {
            p = { error: I };
          } finally {
            try {
              !w && !h && (m = _.return) && (yield ge(m.call(_)));
            } finally {
              if (p) throw p.error;
            }
          }
          if (E.length > 0) {
            i = !0;
            const I = new Ti();
            I.candidates = [{ content: {
              role: "user",
              parts: E
            } }], yield yield ge(I);
            const D = [];
            D.push(...M), D.push({
              role: "user",
              parts: E
            }), d.contents = At(d.contents).concat(D);
          } else break;
        }
      });
    })(this, a, e);
  }
  async generateContentInternal(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = Cg(this.apiClient, e);
      return s = X("{model}:generateContent", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = Ig(f), h = new Ti();
        return Object.assign(h, d), h;
      });
    } else {
      const u = Ag(this.apiClient, e);
      return s = X("{model}:generateContent", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = bg(f), h = new Ti();
        return Object.assign(h, d), h;
      });
    }
  }
  async generateContentStreamInternal(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = Cg(this.apiClient, e);
      return s = X("{model}:streamGenerateContent?alt=sse", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.requestStream({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }), i.then(function(f) {
        return nn(this, arguments, function* () {
          var d, h, p, m;
          try {
            for (var g = !0, y = rn(f), v; v = yield ge(y.next()), d = v.done, !d; g = !0) {
              m = v.value, g = !1;
              const w = m, _ = Ig(yield ge(w.json()), e);
              _.sdkHttpResponse = { headers: w.headers };
              const S = new Ti();
              Object.assign(S, _), yield yield ge(S);
            }
          } catch (w) {
            h = { error: w };
          } finally {
            try {
              !g && !d && (p = y.return) && (yield ge(p.call(y)));
            } finally {
              if (h) throw h.error;
            }
          }
        });
      });
    } else {
      const u = Ag(this.apiClient, e);
      return s = X("{model}:streamGenerateContent?alt=sse", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.requestStream({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }), i.then(function(f) {
        return nn(this, arguments, function* () {
          var d, h, p, m;
          try {
            for (var g = !0, y = rn(f), v; v = yield ge(y.next()), d = v.done, !d; g = !0) {
              m = v.value, g = !1;
              const w = m, _ = bg(yield ge(w.json()), e);
              _.sdkHttpResponse = { headers: w.headers };
              const S = new Ti();
              Object.assign(S, _), yield yield ge(S);
            }
          } catch (w) {
            h = { error: w };
          } finally {
            try {
              !g && !d && (p = y.return) && (yield ge(p.call(y)));
            } finally {
              if (h) throw h.error;
            }
          }
        });
      });
    }
  }
  async embedContentInternal(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = HM(this.apiClient, e, e);
      return s = X(nP(e.model) ? "{model}:embedContent" : "{model}:predict", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = KM(f, e), h = new og();
        return Object.assign(h, d), h;
      });
    } else {
      const u = VM(this.apiClient, e);
      return s = X("{model}:batchEmbedContents", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = qM(f), h = new og();
        return Object.assign(h, d), h;
      });
    }
  }
  async generateImagesInternal(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = nN(this.apiClient, e);
      return s = X("{model}:predict", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = oN(f), h = new ig();
        return Object.assign(h, d), h;
      });
    } else {
      const u = tN(this.apiClient, e);
      return s = X("{model}:predict", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = rN(f), h = new ig();
        return Object.assign(h, d), h;
      });
    }
  }
  async editImageInternal(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) {
      const s = FM(this.apiClient, e);
      return o = X("{model}:predict", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json().then((u) => {
        const f = u;
        return f.sdkHttpResponse = { headers: a.headers }, f;
      })), r.then((a) => {
        const u = OM(a), f = new MR();
        return Object.assign(f, u), f;
      });
    } else throw new Error("This method is only supported by the Vertex AI.");
  }
  async upscaleImageInternal(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) {
      const s = ok(this.apiClient, e);
      return o = X("{model}:predict", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json().then((u) => {
        const f = u;
        return f.sdkHttpResponse = { headers: a.headers }, f;
      })), r.then((a) => {
        const u = ik(a), f = new NR();
        return Object.assign(f, u), f;
      });
    } else throw new Error("This method is only supported by the Vertex AI.");
  }
  async recontextImage(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) {
      const s = FN(this.apiClient, e);
      return o = X("{model}:predict", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json()), r.then((a) => {
        const u = ON(a), f = new kR();
        return Object.assign(f, u), f;
      });
    } else throw new Error("This method is only supported by the Vertex AI.");
  }
  async segmentImage(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) {
      const s = KN(this.apiClient, e);
      return o = X("{model}:predict", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json()), r.then((a) => {
        const u = JN(a), f = new DR();
        return Object.assign(f, u), f;
      });
    } else throw new Error("This method is only supported by the Vertex AI.");
  }
  async get(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = EN(this.apiClient, e);
      return s = X("{name}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json()), i.then((f) => ff(f));
    } else {
      const u = wN(this.apiClient, e);
      return s = X("{name}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json()), i.then((f) => cf(f));
    }
  }
  async listInternal(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = xN(this.apiClient, e);
      return s = X("{models_url}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = NN(f), h = new sg();
        return Object.assign(h, d), h;
      });
    } else {
      const u = PN(this.apiClient, e);
      return s = X("{models_url}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = MN(f), h = new sg();
        return Object.assign(h, d), h;
      });
    }
  }
  async update(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = nk(this.apiClient, e);
      return s = X("{model}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "PATCH",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json()), i.then((f) => ff(f));
    } else {
      const u = tk(this.apiClient, e);
      return s = X("{name}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "PATCH",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json()), i.then((f) => cf(f));
    }
  }
  async delete(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = DM(this.apiClient, e);
      return s = X("{name}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "DELETE",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = UM(f), h = new ag();
        return Object.assign(h, d), h;
      });
    } else {
      const u = kM(this.apiClient, e);
      return s = X("{name}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "DELETE",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = LM(f), h = new ag();
        return Object.assign(h, d), h;
      });
    }
  }
  async countTokens(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = xM(this.apiClient, e);
      return s = X("{model}:countTokens", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = NM(f), h = new lg();
        return Object.assign(h, d), h;
      });
    } else {
      const u = PM(this.apiClient, e);
      return s = X("{model}:countTokens", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = MM(f), h = new lg();
        return Object.assign(h, d), h;
      });
    }
  }
  async computeTokens(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) {
      const s = TM(this.apiClient, e);
      return o = X("{model}:computeTokens", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json().then((u) => {
        const f = u;
        return f.sdkHttpResponse = { headers: a.headers }, f;
      })), r.then((a) => {
        const u = SM(a), f = new LR();
        return Object.assign(f, u), f;
      });
    } else throw new Error("This method is only supported by the Vertex AI.");
  }
  async generateVideosInternal(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = cN(this.apiClient, e);
      return s = X("{model}:predictLongRunning", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json()), i.then((f) => {
        const d = lN(f), h = new ug();
        return Object.assign(h, d), h;
      });
    } else {
      const u = uN(this.apiClient, e);
      return s = X("{model}:predictLongRunning", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json()), i.then((f) => {
        const d = aN(f), h = new ug();
        return Object.assign(h, d), h;
      });
    }
  }
}, tD = class extends Wn {
  constructor(e) {
    super(), this.apiClient = e;
  }
  async getVideosOperation(e) {
    const t = e.operation, n = e.config;
    if (t.name === void 0 || t.name === "") throw new Error("Operation name is required.");
    if (this.apiClient.isVertexAI()) {
      const r = t.name.split("/operations/")[0];
      let o;
      n && "httpOptions" in n && (o = n.httpOptions);
      const i = await this.fetchPredictVideosOperationInternal({
        operationName: t.name,
        resourceName: r,
        config: { httpOptions: o }
      });
      return t._fromAPIResponse({
        apiResponse: i,
        _isVertexAI: !0
      });
    } else {
      const r = await this.getVideosOperationInternal({
        operationName: t.name,
        config: n
      });
      return t._fromAPIResponse({
        apiResponse: r,
        _isVertexAI: !1
      });
    }
  }
  async get(e) {
    const t = e.operation, n = e.config;
    if (t.name === void 0 || t.name === "") throw new Error("Operation name is required.");
    if (this.apiClient.isVertexAI()) {
      const r = t.name.split("/operations/")[0];
      let o;
      n && "httpOptions" in n && (o = n.httpOptions);
      const i = await this.fetchPredictVideosOperationInternal({
        operationName: t.name,
        resourceName: r,
        config: { httpOptions: o }
      });
      return t._fromAPIResponse({
        apiResponse: i,
        _isVertexAI: !0
      });
    } else {
      const r = await this.getVideosOperationInternal({
        operationName: t.name,
        config: n
      });
      return t._fromAPIResponse({
        apiResponse: r,
        _isVertexAI: !1
      });
    }
  }
  async getVideosOperationInternal(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = CR(e);
      return s = X("{operationName}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json()), i;
    } else {
      const u = AR(e);
      return s = X("{operationName}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json()), i;
    }
  }
  async fetchPredictVideosOperationInternal(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) {
      const s = yR(e);
      return o = X("{resourceName}:fetchPredictOperation", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json()), r;
    } else throw new Error("This method is only supported by the Vertex AI.");
  }
};
function kg(e) {
  const t = {};
  if (l(e, ["languageCodes"]) !== void 0) throw new Error("languageCodes parameter is not supported in Gemini API.");
  return t;
}
function nD(e) {
  const t = {}, n = l(e, ["apiKey"]);
  if (n != null && c(t, ["apiKey"], n), l(e, ["apiKeyConfig"]) !== void 0) throw new Error("apiKeyConfig parameter is not supported in Gemini API.");
  if (l(e, ["authType"]) !== void 0) throw new Error("authType parameter is not supported in Gemini API.");
  if (l(e, ["googleServiceAccountConfig"]) !== void 0) throw new Error("googleServiceAccountConfig parameter is not supported in Gemini API.");
  if (l(e, ["httpBasicAuthConfig"]) !== void 0) throw new Error("httpBasicAuthConfig parameter is not supported in Gemini API.");
  if (l(e, ["oauthConfig"]) !== void 0) throw new Error("oauthConfig parameter is not supported in Gemini API.");
  if (l(e, ["oidcConfig"]) !== void 0) throw new Error("oidcConfig parameter is not supported in Gemini API.");
  return t;
}
function rD(e) {
  const t = {}, n = l(e, ["data"]);
  if (n != null && c(t, ["data"], n), l(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const r = l(e, ["mimeType"]);
  return r != null && c(t, ["mimeType"], r), t;
}
function oD(e) {
  const t = {}, n = l(e, ["parts"]);
  if (n != null) {
    let o = n;
    Array.isArray(o) && (o = o.map((i) => hD(i))), c(t, ["parts"], o);
  }
  const r = l(e, ["role"]);
  return r != null && c(t, ["role"], r), t;
}
function iD(e, t, n) {
  const r = {}, o = l(t, ["expireTime"]);
  n !== void 0 && o != null && c(n, ["expireTime"], o);
  const i = l(t, ["newSessionExpireTime"]);
  n !== void 0 && i != null && c(n, ["newSessionExpireTime"], i);
  const s = l(t, ["uses"]);
  n !== void 0 && s != null && c(n, ["uses"], s);
  const a = l(t, ["liveConnectConstraints"]);
  n !== void 0 && a != null && c(n, ["bidiGenerateContentSetup"], dD(e, a));
  const u = l(t, ["lockAdditionalFields"]);
  return n !== void 0 && u != null && c(n, ["fieldMask"], u), r;
}
function sD(e, t) {
  const n = {}, r = l(t, ["config"]);
  return r != null && c(n, ["config"], iD(e, r, n)), n;
}
function aD(e) {
  const t = {};
  if (l(e, ["displayName"]) !== void 0) throw new Error("displayName parameter is not supported in Gemini API.");
  const n = l(e, ["fileUri"]);
  n != null && c(t, ["fileUri"], n);
  const r = l(e, ["mimeType"]);
  return r != null && c(t, ["mimeType"], r), t;
}
function lD(e) {
  const t = {}, n = l(e, ["id"]);
  n != null && c(t, ["id"], n);
  const r = l(e, ["args"]);
  r != null && c(t, ["args"], r);
  const o = l(e, ["name"]);
  if (o != null && c(t, ["name"], o), l(e, ["partialArgs"]) !== void 0) throw new Error("partialArgs parameter is not supported in Gemini API.");
  if (l(e, ["willContinue"]) !== void 0) throw new Error("willContinue parameter is not supported in Gemini API.");
  return t;
}
function uD(e) {
  const t = {}, n = l(e, ["authConfig"]);
  n != null && c(t, ["authConfig"], nD(n));
  const r = l(e, ["enableWidget"]);
  return r != null && c(t, ["enableWidget"], r), t;
}
function cD(e) {
  const t = {}, n = l(e, ["searchTypes"]);
  if (n != null && c(t, ["searchTypes"], n), l(e, ["blockingConfidence"]) !== void 0) throw new Error("blockingConfidence parameter is not supported in Gemini API.");
  if (l(e, ["excludeDomains"]) !== void 0) throw new Error("excludeDomains parameter is not supported in Gemini API.");
  const r = l(e, ["timeRangeFilter"]);
  return r != null && c(t, ["timeRangeFilter"], r), t;
}
function fD(e, t) {
  const n = {}, r = l(e, ["generationConfig"]);
  t !== void 0 && r != null && c(t, ["setup", "generationConfig"], r);
  const o = l(e, ["responseModalities"]);
  t !== void 0 && o != null && c(t, [
    "setup",
    "generationConfig",
    "responseModalities"
  ], o);
  const i = l(e, ["temperature"]);
  t !== void 0 && i != null && c(t, [
    "setup",
    "generationConfig",
    "temperature"
  ], i);
  const s = l(e, ["topP"]);
  t !== void 0 && s != null && c(t, [
    "setup",
    "generationConfig",
    "topP"
  ], s);
  const a = l(e, ["topK"]);
  t !== void 0 && a != null && c(t, [
    "setup",
    "generationConfig",
    "topK"
  ], a);
  const u = l(e, ["maxOutputTokens"]);
  t !== void 0 && u != null && c(t, [
    "setup",
    "generationConfig",
    "maxOutputTokens"
  ], u);
  const f = l(e, ["mediaResolution"]);
  t !== void 0 && f != null && c(t, [
    "setup",
    "generationConfig",
    "mediaResolution"
  ], f);
  const d = l(e, ["seed"]);
  t !== void 0 && d != null && c(t, [
    "setup",
    "generationConfig",
    "seed"
  ], d);
  const h = l(e, ["speechConfig"]);
  t !== void 0 && h != null && c(t, [
    "setup",
    "generationConfig",
    "speechConfig"
  ], Od(h));
  const p = l(e, ["thinkingConfig"]);
  t !== void 0 && p != null && c(t, [
    "setup",
    "generationConfig",
    "thinkingConfig"
  ], p);
  const m = l(e, ["enableAffectiveDialog"]);
  t !== void 0 && m != null && c(t, [
    "setup",
    "generationConfig",
    "enableAffectiveDialog"
  ], m);
  const g = l(e, ["systemInstruction"]);
  t !== void 0 && g != null && c(t, ["setup", "systemInstruction"], oD(nt(g)));
  const y = l(e, ["tools"]);
  if (t !== void 0 && y != null) {
    let I = Xo(y);
    Array.isArray(I) && (I = I.map((D) => gD(zo(D)))), c(t, ["setup", "tools"], I);
  }
  const v = l(e, ["sessionResumption"]);
  t !== void 0 && v != null && c(t, ["setup", "sessionResumption"], mD(v));
  const w = l(e, ["inputAudioTranscription"]);
  t !== void 0 && w != null && c(t, ["setup", "inputAudioTranscription"], kg(w));
  const _ = l(e, ["outputAudioTranscription"]);
  t !== void 0 && _ != null && c(t, ["setup", "outputAudioTranscription"], kg(_));
  const S = l(e, ["realtimeInputConfig"]);
  t !== void 0 && S != null && c(t, ["setup", "realtimeInputConfig"], S);
  const T = l(e, ["contextWindowCompression"]);
  t !== void 0 && T != null && c(t, ["setup", "contextWindowCompression"], T);
  const C = l(e, ["proactivity"]);
  if (t !== void 0 && C != null && c(t, ["setup", "proactivity"], C), l(e, ["explicitVadSignal"]) !== void 0) throw new Error("explicitVadSignal parameter is not supported in Gemini API.");
  const E = l(e, ["avatarConfig"]);
  t !== void 0 && E != null && c(t, ["setup", "avatarConfig"], E);
  const M = l(e, ["safetySettings"]);
  if (t !== void 0 && M != null) {
    let I = M;
    Array.isArray(I) && (I = I.map((D) => pD(D))), c(t, ["setup", "safetySettings"], I);
  }
  return n;
}
function dD(e, t) {
  const n = {}, r = l(t, ["model"]);
  r != null && c(n, ["setup", "model"], Ae(e, r));
  const o = l(t, ["config"]);
  return o != null && c(n, ["config"], fD(o, n)), n;
}
function hD(e) {
  const t = {}, n = l(e, ["mediaResolution"]);
  n != null && c(t, ["mediaResolution"], n);
  const r = l(e, ["codeExecutionResult"]);
  r != null && c(t, ["codeExecutionResult"], r);
  const o = l(e, ["executableCode"]);
  o != null && c(t, ["executableCode"], o);
  const i = l(e, ["fileData"]);
  i != null && c(t, ["fileData"], aD(i));
  const s = l(e, ["functionCall"]);
  s != null && c(t, ["functionCall"], lD(s));
  const a = l(e, ["functionResponse"]);
  a != null && c(t, ["functionResponse"], a);
  const u = l(e, ["inlineData"]);
  u != null && c(t, ["inlineData"], rD(u));
  const f = l(e, ["text"]);
  f != null && c(t, ["text"], f);
  const d = l(e, ["thought"]);
  d != null && c(t, ["thought"], d);
  const h = l(e, ["thoughtSignature"]);
  h != null && c(t, ["thoughtSignature"], h);
  const p = l(e, ["videoMetadata"]);
  p != null && c(t, ["videoMetadata"], p);
  const m = l(e, ["toolCall"]);
  m != null && c(t, ["toolCall"], m);
  const g = l(e, ["toolResponse"]);
  g != null && c(t, ["toolResponse"], g);
  const y = l(e, ["partMetadata"]);
  return y != null && c(t, ["partMetadata"], y), t;
}
function pD(e) {
  const t = {}, n = l(e, ["category"]);
  if (n != null && c(t, ["category"], n), l(e, ["method"]) !== void 0) throw new Error("method parameter is not supported in Gemini API.");
  const r = l(e, ["threshold"]);
  return r != null && c(t, ["threshold"], r), t;
}
function mD(e) {
  const t = {}, n = l(e, ["handle"]);
  if (n != null && c(t, ["handle"], n), l(e, ["transparent"]) !== void 0) throw new Error("transparent parameter is not supported in Gemini API.");
  return t;
}
function gD(e) {
  const t = {};
  if (l(e, ["retrieval"]) !== void 0) throw new Error("retrieval parameter is not supported in Gemini API.");
  const n = l(e, ["computerUse"]);
  n != null && c(t, ["computerUse"], n);
  const r = l(e, ["fileSearch"]);
  r != null && c(t, ["fileSearch"], r);
  const o = l(e, ["googleSearch"]);
  o != null && c(t, ["googleSearch"], cD(o));
  const i = l(e, ["googleMaps"]);
  i != null && c(t, ["googleMaps"], uD(i));
  const s = l(e, ["codeExecution"]);
  if (s != null && c(t, ["codeExecution"], s), l(e, ["enterpriseWebSearch"]) !== void 0) throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");
  const a = l(e, ["functionDeclarations"]);
  if (a != null) {
    let h = a;
    Array.isArray(h) && (h = h.map((p) => p)), c(t, ["functionDeclarations"], h);
  }
  const u = l(e, ["googleSearchRetrieval"]);
  if (u != null && c(t, ["googleSearchRetrieval"], u), l(e, ["parallelAiSearch"]) !== void 0) throw new Error("parallelAiSearch parameter is not supported in Gemini API.");
  const f = l(e, ["urlContext"]);
  f != null && c(t, ["urlContext"], f);
  const d = l(e, ["mcpServers"]);
  if (d != null) {
    let h = d;
    Array.isArray(h) && (h = h.map((p) => p)), c(t, ["mcpServers"], h);
  }
  return t;
}
function yD(e) {
  const t = [];
  for (const n in e) if (Object.prototype.hasOwnProperty.call(e, n)) {
    const r = e[n];
    if (typeof r == "object" && r != null && Object.keys(r).length > 0) {
      const o = Object.keys(r).map((i) => `${n}.${i}`);
      t.push(...o);
    } else t.push(n);
  }
  return t.join(",");
}
function vD(e, t) {
  let n = null;
  const r = e.bidiGenerateContentSetup;
  if (typeof r == "object" && r !== null && "setup" in r) {
    const i = r.setup;
    typeof i == "object" && i !== null ? (e.bidiGenerateContentSetup = i, n = i) : delete e.bidiGenerateContentSetup;
  } else r !== void 0 && delete e.bidiGenerateContentSetup;
  const o = e.fieldMask;
  if (n) {
    const i = yD(n);
    if (Array.isArray(t?.lockAdditionalFields) && t?.lockAdditionalFields.length === 0) i ? e.fieldMask = i : delete e.fieldMask;
    else if (t?.lockAdditionalFields && t.lockAdditionalFields.length > 0 && o !== null && Array.isArray(o) && o.length > 0) {
      const s = [
        "temperature",
        "topK",
        "topP",
        "maxOutputTokens",
        "responseModalities",
        "seed",
        "speechConfig"
      ];
      let a = [];
      o.length > 0 && (a = o.map((f) => s.includes(f) ? `generationConfig.${f}` : f));
      const u = [];
      i && u.push(i), a.length > 0 && u.push(...a), u.length > 0 ? e.fieldMask = u.join(",") : delete e.fieldMask;
    } else delete e.fieldMask;
  } else o !== null && Array.isArray(o) && o.length > 0 ? e.fieldMask = o.join(",") : delete e.fieldMask;
  return e;
}
var _D = class extends Wn {
  constructor(e) {
    super(), this.apiClient = e;
  }
  async create(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) throw new Error("The client.tokens.create method is only supported by the Gemini Developer API.");
    {
      const s = sD(this.apiClient, e);
      o = X("auth_tokens", s._url), i = s._query, delete s.config, delete s._url, delete s._query;
      const a = vD(s, e.config);
      return r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((u) => u.json()), r.then((u) => u);
    }
  }
};
function wD(e, t) {
  const n = {}, r = l(e, ["force"]);
  return t !== void 0 && r != null && c(t, ["_query", "force"], r), n;
}
function ED(e) {
  const t = {}, n = l(e, ["name"]);
  n != null && c(t, ["_url", "name"], n);
  const r = l(e, ["config"]);
  return r != null && wD(r, t), t;
}
function TD(e) {
  const t = {}, n = l(e, ["name"]);
  return n != null && c(t, ["_url", "name"], n), t;
}
function SD(e, t) {
  const n = {}, r = l(e, ["pageSize"]);
  t !== void 0 && r != null && c(t, ["_query", "pageSize"], r);
  const o = l(e, ["pageToken"]);
  return t !== void 0 && o != null && c(t, ["_query", "pageToken"], o), n;
}
function AD(e) {
  const t = {}, n = l(e, ["parent"]);
  n != null && c(t, ["_url", "parent"], n);
  const r = l(e, ["config"]);
  return r != null && SD(r, t), t;
}
function CD(e) {
  const t = {}, n = l(e, ["sdkHttpResponse"]);
  n != null && c(t, ["sdkHttpResponse"], n);
  const r = l(e, ["nextPageToken"]);
  r != null && c(t, ["nextPageToken"], r);
  const o = l(e, ["documents"]);
  if (o != null) {
    let i = o;
    Array.isArray(i) && (i = i.map((s) => s)), c(t, ["documents"], i);
  }
  return t;
}
var bD = class extends Wn {
  constructor(e) {
    super(), this.apiClient = e, this.list = async (t) => new jr(Kn.PAGED_ITEM_DOCUMENTS, (n) => this.listInternal({
      parent: t.parent,
      config: n.config
    }), await this.listInternal(t), t);
  }
  async get(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const s = TD(e);
      return o = X("{name}", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json()), r.then((a) => a);
    }
  }
  async delete(e) {
    var t, n;
    let r = "", o = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const i = ED(e);
      r = X("{name}", i._url), o = i._query, delete i._url, delete i._query, await this.apiClient.request({
        path: r,
        queryParams: o,
        body: JSON.stringify(i),
        httpMethod: "DELETE",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      });
    }
  }
  async listInternal(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const s = AD(e);
      return o = X("{parent}/documents", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json()), r.then((a) => {
        const u = CD(a), f = new UR();
        return Object.assign(f, u), f;
      });
    }
  }
}, ID = class extends Wn {
  constructor(e, t = new bD(e)) {
    super(), this.apiClient = e, this.documents = t, this.list = async (n = {}) => new jr(Kn.PAGED_ITEM_FILE_SEARCH_STORES, (r) => this.listInternal(r), await this.listInternal(n), n);
  }
  async uploadToFileSearchStore(e) {
    if (this.apiClient.isVertexAI()) throw new Error("Vertex AI does not support uploading files to a file search store.");
    return this.apiClient.uploadFileToFileSearchStore(e.fileSearchStoreName, e.file, e.config);
  }
  async create(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const s = dk(e);
      return o = X("fileSearchStores", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json()), r.then((a) => a);
    }
  }
  async get(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const s = mk(e);
      return o = X("{name}", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json()), r.then((a) => a);
    }
  }
  async delete(e) {
    var t, n;
    let r = "", o = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const i = pk(e);
      r = X("{name}", i._url), o = i._query, delete i._url, delete i._query, await this.apiClient.request({
        path: r,
        queryParams: o,
        body: JSON.stringify(i),
        httpMethod: "DELETE",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      });
    }
  }
  async listInternal(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const s = Ek(e);
      return o = X("fileSearchStores", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json()), r.then((a) => {
        const u = Tk(a), f = new $R();
        return Object.assign(f, u), f;
      });
    }
  }
  async uploadToFileSearchStoreInternal(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const s = Sk(e);
      return o = X("upload/v1beta/{file_search_store_name}:uploadToFileSearchStore", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json()), r.then((a) => {
        const u = Ak(a), f = new FR();
        return Object.assign(f, u), f;
      });
    }
  }
  async importFile(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const s = vk(e);
      return o = X("{file_search_store_name}:importFile", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json()), r.then((a) => {
        const u = yk(a), f = new OR();
        return Object.assign(f, u), f;
      });
    }
  }
}, Jw = function() {
  const { crypto: e } = globalThis;
  if (e?.randomUUID)
    return Jw = e.randomUUID.bind(e), e.randomUUID();
  const t = new Uint8Array(1), n = e ? () => e.getRandomValues(t)[0] : () => Math.random() * 255 & 255;
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (r) => (+r ^ n() & 15 >> +r / 4).toString(16));
}, RD = () => Jw();
function hf(e) {
  return typeof e == "object" && e !== null && ("name" in e && e.name === "AbortError" || "message" in e && String(e.message).includes("FetchRequestCanceledException"));
}
var pf = (e) => {
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
}, Kt = class extends Error {
}, Jt = class mf extends Kt {
  constructor(t, n, r, o) {
    super(`${mf.makeMessage(t, n, r)}`), this.status = t, this.headers = o, this.error = n;
  }
  static makeMessage(t, n, r) {
    const o = n?.message ? typeof n.message == "string" ? n.message : JSON.stringify(n.message) : n ? JSON.stringify(n) : r;
    return t && o ? `${t} ${o}` : t ? `${t} status code (no body)` : o || "(no status code or body)";
  }
  static generate(t, n, r, o) {
    if (!t || !o) return new lu({
      message: r,
      cause: pf(n)
    });
    const i = n;
    return t === 400 ? new Yw(t, i, r, o) : t === 401 ? new zw(t, i, r, o) : t === 403 ? new Xw(t, i, r, o) : t === 404 ? new Qw(t, i, r, o) : t === 409 ? new Zw(t, i, r, o) : t === 422 ? new jw(t, i, r, o) : t === 429 ? new eE(t, i, r, o) : t >= 500 ? new tE(t, i, r, o) : new mf(t, i, r, o);
  }
}, gf = class extends Jt {
  constructor({ message: e } = {}) {
    super(void 0, void 0, e || "Request was aborted.", void 0);
  }
}, lu = class extends Jt {
  constructor({ message: e, cause: t }) {
    super(void 0, void 0, e || "Connection error.", void 0), t && (this.cause = t);
  }
}, Ww = class extends lu {
  constructor({ message: e } = {}) {
    super({ message: e ?? "Request timed out." });
  }
}, Yw = class extends Jt {
}, zw = class extends Jt {
}, Xw = class extends Jt {
}, Qw = class extends Jt {
}, Zw = class extends Jt {
}, jw = class extends Jt {
}, eE = class extends Jt {
}, tE = class extends Jt {
}, PD = /^[a-z][a-z0-9+.-]*:/i, xD = (e) => PD.test(e), yf = (e) => (yf = Array.isArray, yf(e)), Dg = yf;
function Lg(e) {
  if (!e) return !0;
  for (const t in e) return !1;
  return !0;
}
function MD(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
var ND = (e, t) => {
  if (typeof t != "number" || !Number.isInteger(t)) throw new Kt(`${e} must be an integer`);
  if (t < 0) throw new Kt(`${e} must be a positive integer`);
  return t;
}, kD = (e) => {
  try {
    return JSON.parse(e);
  } catch {
    return;
  }
}, DD = (e) => new Promise((t) => setTimeout(t, e));
function LD() {
  if (typeof fetch < "u") return fetch;
  throw new Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new GeminiNextGenAPIClient({ fetch })` or polyfill the global, `globalThis.fetch = fetch`");
}
function nE(...e) {
  const t = globalThis.ReadableStream;
  if (typeof t > "u") throw new Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");
  return new t(...e);
}
function UD(e) {
  let t = Symbol.asyncIterator in e ? e[Symbol.asyncIterator]() : e[Symbol.iterator]();
  return nE({
    start() {
    },
    async pull(n) {
      const { done: r, value: o } = await t.next();
      r ? n.close() : n.enqueue(o);
    },
    async cancel() {
      var n;
      await ((n = t.return) === null || n === void 0 ? void 0 : n.call(t));
    }
  });
}
function rE(e) {
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
async function $D(e) {
  var t, n;
  if (e === null || typeof e != "object") return;
  if (e[Symbol.asyncIterator]) {
    await ((n = (t = e[Symbol.asyncIterator]()).return) === null || n === void 0 ? void 0 : n.call(t));
    return;
  }
  const r = e.getReader(), o = r.cancel();
  r.releaseLock(), await o;
}
var FD = ({ headers: e, body: t }) => ({
  bodyHeaders: { "content-type": "application/json" },
  body: JSON.stringify(t)
});
function OD(e) {
  return Object.entries(e).filter(([t, n]) => typeof n < "u").map(([t, n]) => {
    if (typeof n == "string" || typeof n == "number" || typeof n == "boolean") return `${encodeURIComponent(t)}=${encodeURIComponent(n)}`;
    if (n === null) return `${encodeURIComponent(t)}=`;
    throw new Kt(`Cannot stringify type ${typeof n}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`);
  }).join("&");
}
var BD = "0.0.1", oE = () => {
  var e;
  if (typeof File > "u") {
    const { process: t } = globalThis, n = typeof ((e = t?.versions) === null || e === void 0 ? void 0 : e.node) == "string" && parseInt(t.versions.node.split(".")) < 20;
    throw new Error("`File` is not defined as a global, which is required for file uploads." + (n ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`." : ""));
  }
};
function nc(e, t, n) {
  return oE(), new File(e, t ?? "unknown_file", n);
}
function GD(e) {
  return (typeof e == "object" && e !== null && ("name" in e && e.name && String(e.name) || "url" in e && e.url && String(e.url) || "filename" in e && e.filename && String(e.filename) || "path" in e && e.path && String(e.path)) || "").split(/[\\/]/).pop() || void 0;
}
var VD = (e) => e != null && typeof e == "object" && typeof e[Symbol.asyncIterator] == "function", iE = (e) => e != null && typeof e == "object" && typeof e.size == "number" && typeof e.type == "string" && typeof e.text == "function" && typeof e.slice == "function" && typeof e.arrayBuffer == "function", HD = (e) => e != null && typeof e == "object" && typeof e.name == "string" && typeof e.lastModified == "number" && iE(e), qD = (e) => e != null && typeof e == "object" && typeof e.url == "string" && typeof e.blob == "function";
async function KD(e, t, n) {
  if (oE(), e = await e, HD(e))
    return e instanceof File ? e : nc([await e.arrayBuffer()], e.name);
  if (qD(e)) {
    const o = await e.blob();
    return t || (t = new URL(e.url).pathname.split(/[\\/]/).pop()), nc(await vf(o), t, n);
  }
  const r = await vf(e);
  if (t || (t = GD(e)), !n?.type) {
    const o = r.find((i) => typeof i == "object" && "type" in i && i.type);
    typeof o == "string" && (n = Object.assign(Object.assign({}, n), { type: o }));
  }
  return nc(r, t, n);
}
async function vf(e) {
  var t, n, r, o, i;
  let s = [];
  if (typeof e == "string" || ArrayBuffer.isView(e) || e instanceof ArrayBuffer) s.push(e);
  else if (iE(e)) s.push(e instanceof Blob ? e : await e.arrayBuffer());
  else if (VD(e)) try {
    for (var a = !0, u = rn(e), f; f = await u.next(), t = f.done, !t; a = !0) {
      o = f.value, a = !1;
      const d = o;
      s.push(...await vf(d));
    }
  } catch (d) {
    n = { error: d };
  } finally {
    try {
      !a && !t && (r = u.return) && await r.call(u);
    } finally {
      if (n) throw n.error;
    }
  }
  else {
    const d = (i = e?.constructor) === null || i === void 0 ? void 0 : i.name;
    throw new Error(`Unexpected data type: ${typeof e}${d ? `; constructor: ${d}` : ""}${JD(e)}`);
  }
  return s;
}
function JD(e) {
  return typeof e != "object" || e === null ? "" : `; props: [${Object.getOwnPropertyNames(e).map((t) => `"${t}"`).join(", ")}]`;
}
var Bd = class {
  constructor(e) {
    this._client = e;
  }
};
Bd._key = [];
function sE(e) {
  return e.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent);
}
var Ug = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.create(null)), WD = (e = sE) => (function(n, ...r) {
  if (n.length === 1) return n[0];
  let o = !1;
  const i = [], s = n.reduce((d, h, p) => {
    var m, g, y;
    /[?#]/.test(h) && (o = !0);
    const v = r[p];
    let w = (o ? encodeURIComponent : e)("" + v);
    return p !== r.length && (v == null || typeof v == "object" && v.toString === ((y = Object.getPrototypeOf((g = Object.getPrototypeOf((m = v.hasOwnProperty) !== null && m !== void 0 ? m : Ug)) !== null && g !== void 0 ? g : Ug)) === null || y === void 0 ? void 0 : y.toString)) && (w = v + "", i.push({
      start: d.length + h.length,
      length: w.length,
      error: `Value of type ${Object.prototype.toString.call(v).slice(8, -1)} is not a valid path parameter`
    })), d + h + (p === r.length ? "" : w);
  }, ""), a = s.split(/[?#]/, 1)[0], u = /(^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi;
  let f;
  for (; (f = u.exec(a)) !== null; ) {
    const d = f[0].startsWith("/"), h = d ? 1 : 0, p = d ? f[0].slice(1) : f[0];
    i.push({
      start: f.index + h,
      length: p.length,
      error: `Value "${p}" can't be safely passed as a path parameter`
    });
  }
  if (i.sort((d, h) => d.start - h.start), i.length > 0) {
    let d = 0;
    const h = i.reduce((p, m) => {
      const g = " ".repeat(m.start - d), y = "^".repeat(m.length);
      return d = m.start + m.length, p + g + y;
    }, "");
    throw new Kt(`Path parameters result in path with invalid segments:
${i.map((p) => p.error).join(`
`)}
${s}
${h}`);
  }
  return s;
}), Qt = /* @__PURE__ */ WD(sE), aE = class extends Bd {
  create(e, t) {
    var n;
    const { api_version: r = this._client.apiVersion } = e, o = ur(e, ["api_version"]);
    if ("model" in o && "agent_config" in o) throw new Kt("Invalid request: specified `model` and `agent_config`. If specifying `model`, use `generation_config`.");
    if ("agent" in o && "generation_config" in o) throw new Kt("Invalid request: specified `agent` and `generation_config`. If specifying `agent`, use `agent_config`.");
    return this._client.post(Qt`/${r}/interactions`, Object.assign(Object.assign({ body: o }, t), { stream: (n = e.stream) !== null && n !== void 0 ? n : !1 }));
  }
  delete(e, t = {}, n) {
    const { api_version: r = this._client.apiVersion } = t ?? {};
    return this._client.delete(Qt`/${r}/interactions/${e}`, n);
  }
  cancel(e, t = {}, n) {
    const { api_version: r = this._client.apiVersion } = t ?? {};
    return this._client.post(Qt`/${r}/interactions/${e}/cancel`, n);
  }
  get(e, t = {}, n) {
    var r;
    const o = t ?? {}, { api_version: i = this._client.apiVersion } = o, s = ur(o, ["api_version"]);
    return this._client.get(Qt`/${i}/interactions/${e}`, Object.assign(Object.assign({ query: s }, n), { stream: (r = t?.stream) !== null && r !== void 0 ? r : !1 }));
  }
};
aE._key = Object.freeze(["interactions"]);
var lE = class extends aE {
}, uE = class extends Bd {
  create(e, t) {
    const { api_version: n = this._client.apiVersion, webhook_id: r } = e, o = ur(e, ["api_version", "webhook_id"]);
    return this._client.post(Qt`/${n}/webhooks`, Object.assign({
      query: { webhook_id: r },
      body: o
    }, t));
  }
  update(e, t, n) {
    const { api_version: r = this._client.apiVersion, update_mask: o } = t, i = ur(t, ["api_version", "update_mask"]);
    return this._client.patch(Qt`/${r}/webhooks/${e}`, Object.assign({
      query: { update_mask: o },
      body: i
    }, n));
  }
  list(e = {}, t) {
    const n = e ?? {}, { api_version: r = this._client.apiVersion } = n, o = ur(n, ["api_version"]);
    return this._client.get(Qt`/${r}/webhooks`, Object.assign({ query: o }, t));
  }
  delete(e, t = {}, n) {
    const { api_version: r = this._client.apiVersion } = t ?? {};
    return this._client.delete(Qt`/${r}/webhooks/${e}`, n);
  }
  get(e, t = {}, n) {
    const { api_version: r = this._client.apiVersion } = t ?? {};
    return this._client.get(Qt`/${r}/webhooks/${e}`, n);
  }
  ping(e, t = void 0, n) {
    const { api_version: r = this._client.apiVersion, body: o } = t ?? {};
    return this._client.post(Qt`/${r}/webhooks/${e}:ping`, Object.assign({ body: o }, n));
  }
  rotateSigningSecret(e, t = {}, n) {
    const r = t ?? {}, { api_version: o = this._client.apiVersion } = r, i = ur(r, ["api_version"]);
    return this._client.post(Qt`/${o}/webhooks/${e}:rotateSigningSecret`, Object.assign({ body: i }, n));
  }
};
uE._key = Object.freeze(["webhooks"]);
var cE = class extends uE {
};
function YD(e) {
  let t = 0;
  for (const o of e) t += o.length;
  const n = new Uint8Array(t);
  let r = 0;
  for (const o of e)
    n.set(o, r), r += o.length;
  return n;
}
var _a;
function Gd(e) {
  let t;
  return (_a ?? (t = new globalThis.TextEncoder(), _a = t.encode.bind(t)))(e);
}
var wa;
function $g(e) {
  let t;
  return (wa ?? (t = new globalThis.TextDecoder(), wa = t.decode.bind(t)))(e);
}
var uu = class {
  constructor() {
    this.buffer = new Uint8Array(), this.carriageReturnIndex = null, this.searchIndex = 0;
  }
  decode(e) {
    var t;
    if (e == null) return [];
    const n = e instanceof ArrayBuffer ? new Uint8Array(e) : typeof e == "string" ? Gd(e) : e;
    this.buffer = YD([this.buffer, n]);
    const r = [];
    let o;
    for (; (o = zD(this.buffer, (t = this.carriageReturnIndex) !== null && t !== void 0 ? t : this.searchIndex)) != null; ) {
      if (o.carriage && this.carriageReturnIndex == null) {
        this.carriageReturnIndex = o.index;
        continue;
      }
      if (this.carriageReturnIndex != null && (o.index !== this.carriageReturnIndex + 1 || o.carriage)) {
        r.push($g(this.buffer.subarray(0, this.carriageReturnIndex - 1))), this.buffer = this.buffer.subarray(this.carriageReturnIndex), this.carriageReturnIndex = null, this.searchIndex = 0;
        continue;
      }
      const i = this.carriageReturnIndex !== null ? o.preceding - 1 : o.preceding, s = $g(this.buffer.subarray(0, i));
      r.push(s), this.buffer = this.buffer.subarray(o.index), this.carriageReturnIndex = null, this.searchIndex = 0;
    }
    return this.searchIndex = Math.max(0, this.buffer.length - 1), r;
  }
  flush() {
    return this.buffer.length ? this.decode(`
`) : [];
  }
};
uu.NEWLINE_CHARS = /* @__PURE__ */ new Set([`
`, "\r"]);
uu.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
function zD(e, t) {
  const o = t ?? 0, i = e.indexOf(10, o), s = e.indexOf(13, o);
  if (i === -1 && s === -1) return null;
  let a;
  return i !== -1 && s !== -1 ? a = Math.min(i, s) : a = i !== -1 ? i : s, e[a] === 10 ? {
    preceding: a,
    index: a + 1,
    carriage: !1
  } : {
    preceding: a,
    index: a + 1,
    carriage: !0
  };
}
var bl = {
  off: 0,
  error: 200,
  warn: 300,
  info: 400,
  debug: 500
}, Fg = (e, t, n) => {
  if (e) {
    if (MD(bl, e)) return e;
    yt(n).warn(`${t} was set to ${JSON.stringify(e)}, expected one of ${JSON.stringify(Object.keys(bl))}`);
  }
};
function ki() {
}
function Ea(e, t, n) {
  return !t || bl[e] > bl[n] ? ki : t[e].bind(t);
}
var XD = {
  error: ki,
  warn: ki,
  info: ki,
  debug: ki
}, Og = /* @__PURE__ */ new WeakMap();
function yt(e) {
  var t;
  const n = e.logger, r = (t = e.logLevel) !== null && t !== void 0 ? t : "off";
  if (!n) return XD;
  const o = Og.get(n);
  if (o && o[0] === r) return o[1];
  const i = {
    error: Ea("error", n, r),
    warn: Ea("warn", n, r),
    info: Ea("info", n, r),
    debug: Ea("debug", n, r)
  };
  return Og.set(n, [r, i]), i;
}
var Rr = (e) => (e.options && (e.options = Object.assign({}, e.options), delete e.options.headers), e.headers && (e.headers = Object.fromEntries((e.headers instanceof Headers ? [...e.headers] : Object.entries(e.headers)).map(([t, n]) => [t, t.toLowerCase() === "x-goog-api-key" || t.toLowerCase() === "authorization" || t.toLowerCase() === "cookie" || t.toLowerCase() === "set-cookie" ? "***" : n]))), "retryOfRequestLogID" in e && (e.retryOfRequestLogID && (e.retryOf = e.retryOfRequestLogID), delete e.retryOfRequestLogID), e), QD = class Di {
  constructor(t, n, r) {
    this.iterator = t, this.controller = n, this.client = r;
  }
  static fromSSEResponse(t, n, r) {
    let o = !1;
    const i = r ? yt(r) : console;
    function s() {
      return nn(this, arguments, function* () {
        var u, f, d, h;
        if (o) throw new Kt("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
        o = !0;
        let p = !1;
        try {
          try {
            for (var m = !0, g = rn(ZD(t, n)), y; y = yield ge(g.next()), u = y.done, !u; m = !0) {
              h = y.value, m = !1;
              const v = h;
              if (!p)
                if (v.data.startsWith("[DONE]")) {
                  p = !0;
                  continue;
                } else try {
                  yield yield ge(JSON.parse(v.data));
                } catch (w) {
                  throw i.error("Could not parse message into JSON:", v.data), i.error("From chunk:", v.raw), w;
                }
            }
          } catch (v) {
            f = { error: v };
          } finally {
            try {
              !m && !u && (d = g.return) && (yield ge(d.call(g)));
            } finally {
              if (f) throw f.error;
            }
          }
          p = !0;
        } catch (v) {
          if (hf(v)) return yield ge(void 0);
          throw v;
        } finally {
          p || n.abort();
        }
      });
    }
    return new Di(s, n, r);
  }
  static fromReadableStream(t, n, r) {
    let o = !1;
    function i() {
      return nn(this, arguments, function* () {
        var u, f, d, h;
        const p = new uu(), m = rE(t);
        try {
          for (var g = !0, y = rn(m), v; v = yield ge(y.next()), u = v.done, !u; g = !0) {
            h = v.value, g = !1;
            const w = h;
            for (const _ of p.decode(w)) yield yield ge(_);
          }
        } catch (w) {
          f = { error: w };
        } finally {
          try {
            !g && !u && (d = y.return) && (yield ge(d.call(y)));
          } finally {
            if (f) throw f.error;
          }
        }
        for (const w of p.flush()) yield yield ge(w);
      });
    }
    function s() {
      return nn(this, arguments, function* () {
        var u, f, d, h;
        if (o) throw new Kt("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
        o = !0;
        let p = !1;
        try {
          try {
            for (var m = !0, g = rn(i()), y; y = yield ge(g.next()), u = y.done, !u; m = !0) {
              h = y.value, m = !1;
              const v = h;
              p || v && (yield yield ge(JSON.parse(v)));
            }
          } catch (v) {
            f = { error: v };
          } finally {
            try {
              !m && !u && (d = g.return) && (yield ge(d.call(g)));
            } finally {
              if (f) throw f.error;
            }
          }
          p = !0;
        } catch (v) {
          if (hf(v)) return yield ge(void 0);
          throw v;
        } finally {
          p || n.abort();
        }
      });
    }
    return new Di(s, n, r);
  }
  [Symbol.asyncIterator]() {
    return this.iterator();
  }
  tee() {
    const t = [], n = [], r = this.iterator(), o = (i) => ({ next: () => {
      if (i.length === 0) {
        const s = r.next();
        t.push(s), n.push(s);
      }
      return i.shift();
    } });
    return [new Di(() => o(t), this.controller, this.client), new Di(() => o(n), this.controller, this.client)];
  }
  toReadableStream() {
    const t = this;
    let n;
    return nE({
      async start() {
        n = t[Symbol.asyncIterator]();
      },
      async pull(r) {
        try {
          const { value: o, done: i } = await n.next();
          if (i) return r.close();
          const s = Gd(JSON.stringify(o) + `
`);
          r.enqueue(s);
        } catch (o) {
          r.error(o);
        }
      },
      async cancel() {
        var r;
        await ((r = n.return) === null || r === void 0 ? void 0 : r.call(n));
      }
    });
  }
};
function ZD(e, t) {
  return nn(this, arguments, function* () {
    var r, o, i, s;
    if (!e.body)
      throw t.abort(), typeof globalThis.navigator < "u" && globalThis.navigator.product === "ReactNative" ? new Kt("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api") : new Kt("Attempted to iterate over a response with no body");
    const a = new eL(), u = new uu(), f = rE(e.body);
    try {
      for (var d = !0, h = rn(jD(f)), p; p = yield ge(h.next()), r = p.done, !r; d = !0) {
        s = p.value, d = !1;
        const m = s;
        for (const g of u.decode(m)) {
          const y = a.decode(g);
          y && (yield yield ge(y));
        }
      }
    } catch (m) {
      o = { error: m };
    } finally {
      try {
        !d && !r && (i = h.return) && (yield ge(i.call(h)));
      } finally {
        if (o) throw o.error;
      }
    }
    for (const m of u.flush()) {
      const g = a.decode(m);
      g && (yield yield ge(g));
    }
  });
}
function jD(e) {
  return nn(this, arguments, function* () {
    var n, r, o, i;
    try {
      for (var s = !0, a = rn(e), u; u = yield ge(a.next()), n = u.done, !n; s = !0) {
        i = u.value, s = !1;
        const f = i;
        f != null && (yield yield ge(f instanceof ArrayBuffer ? new Uint8Array(f) : typeof f == "string" ? Gd(f) : f));
      }
    } catch (f) {
      r = { error: f };
    } finally {
      try {
        !s && !n && (o = a.return) && (yield ge(o.call(a)));
      } finally {
        if (r) throw r.error;
      }
    }
  });
}
var eL = class {
  constructor() {
    this.event = null, this.data = [], this.chunks = [];
  }
  decode(e) {
    if (e.endsWith("\r") && (e = e.substring(0, e.length - 1)), !e) {
      if (!this.event && !this.data.length) return null;
      const o = {
        event: this.event,
        data: this.data.join(`
`),
        raw: this.chunks
      };
      return this.event = null, this.data = [], this.chunks = [], o;
    }
    if (this.chunks.push(e), e.startsWith(":")) return null;
    let [t, n, r] = tL(e, ":");
    return r.startsWith(" ") && (r = r.substring(1)), t === "event" ? this.event = r : t === "data" && this.data.push(r), null;
  }
};
function tL(e, t) {
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
async function nL(e, t) {
  const { response: n, requestLogID: r, retryOfRequestLogID: o, startTime: i } = t, s = await (async () => {
    var a;
    if (t.options.stream)
      return yt(e).debug("response", n.status, n.url, n.headers, n.body), t.options.__streamClass ? t.options.__streamClass.fromSSEResponse(n, t.controller, e) : QD.fromSSEResponse(n, t.controller, e);
    if (n.status === 204) return null;
    if (t.options.__binaryResponse) return n;
    const u = n.headers.get("content-type"), f = (a = u?.split(";")[0]) === null || a === void 0 ? void 0 : a.trim();
    return f?.includes("application/json") || f?.endsWith("+json") ? n.headers.get("content-length") === "0" ? void 0 : await n.json() : await n.text();
  })();
  return yt(e).debug(`[${r}] response parsed`, Rr({
    retryOfRequestLogID: o,
    url: n.url,
    status: n.status,
    body: s,
    durationMs: Date.now() - i
  })), s;
}
var rL = class fE extends Promise {
  constructor(t, n, r = nL) {
    super((o) => {
      o(null);
    }), this.responsePromise = n, this.parseResponse = r, this.client = t;
  }
  _thenUnwrap(t) {
    return new fE(this.client, this.responsePromise, async (n, r) => t(await this.parseResponse(n, r), r));
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
}, dE = /* @__PURE__ */ Symbol("brand.privateNullableHeaders");
function* oL(e) {
  if (!e) return;
  if (dE in e) {
    const { values: r, nulls: o } = e;
    yield* r.entries();
    for (const i of o) yield [i, null];
    return;
  }
  let t = !1, n;
  e instanceof Headers ? n = e.entries() : Dg(e) ? n = e : (t = !0, n = Object.entries(e ?? {}));
  for (let r of n) {
    const o = r[0];
    if (typeof o != "string") throw new TypeError("expected header name to be a string");
    const i = Dg(r[1]) ? r[1] : [r[1]];
    let s = !1;
    for (const a of i)
      a !== void 0 && (t && !s && (s = !0, yield [o, null]), yield [o, a]);
  }
}
var Si = (e) => {
  const t = new Headers(), n = /* @__PURE__ */ new Set();
  for (const r of e) {
    const o = /* @__PURE__ */ new Set();
    for (const [i, s] of oL(r)) {
      const a = i.toLowerCase();
      o.has(a) || (t.delete(i), o.add(a)), s === null ? (t.delete(i), n.add(a)) : (t.append(i, s), n.delete(a));
    }
  }
  return {
    [dE]: !0,
    values: t,
    nulls: n
  };
}, rc = (e) => {
  var t, n, r, o, i;
  if (typeof globalThis.process < "u") return ((n = (t = globalThis.process.env) === null || t === void 0 ? void 0 : t[e]) === null || n === void 0 ? void 0 : n.trim()) || void 0;
  if (typeof globalThis.Deno < "u") return ((i = (o = (r = globalThis.Deno.env) === null || r === void 0 ? void 0 : r.get) === null || o === void 0 ? void 0 : o.call(r, e)) === null || i === void 0 ? void 0 : i.trim()) || void 0;
}, hE, pE = class mE {
  constructor(t) {
    var n, r, o, i, s, a, u, { baseURL: f = rc("GEMINI_NEXT_GEN_API_BASE_URL"), apiKey: d = (n = rc("GEMINI_API_KEY")) !== null && n !== void 0 ? n : null, apiVersion: h = "v1beta" } = t, p = ur(t, [
      "baseURL",
      "apiKey",
      "apiVersion"
    ]);
    const m = Object.assign(Object.assign({
      apiKey: d,
      apiVersion: h
    }, p), { baseURL: f || "https://generativelanguage.googleapis.com" });
    this.baseURL = m.baseURL, this.timeout = (r = m.timeout) !== null && r !== void 0 ? r : mE.DEFAULT_TIMEOUT, this.logger = (o = m.logger) !== null && o !== void 0 ? o : console;
    const g = "warn";
    this.logLevel = g, this.logLevel = (s = (i = Fg(m.logLevel, "ClientOptions.logLevel", this)) !== null && i !== void 0 ? i : Fg(rc("GEMINI_NEXT_GEN_API_LOG"), "process.env['GEMINI_NEXT_GEN_API_LOG']", this)) !== null && s !== void 0 ? s : g, this.fetchOptions = m.fetchOptions, this.maxRetries = (a = m.maxRetries) !== null && a !== void 0 ? a : 2, this.fetch = (u = m.fetch) !== null && u !== void 0 ? u : LD(), this.encoder = FD, this._options = m, this.apiKey = d, this.apiVersion = h, this.clientAdapter = m.clientAdapter;
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
    const n = Si([t.headers]);
    if (!(n.values.has("authorization") || n.values.has("x-goog-api-key"))) {
      if (this.apiKey) return Si([{ "x-goog-api-key": this.apiKey }]);
      if (this.clientAdapter && this.clientAdapter.isVertexAI()) return Si([await this.clientAdapter.getAuthHeaders()]);
    }
  }
  stringifyQuery(t) {
    return OD(t);
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${BD}`;
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${RD()}`;
  }
  makeStatusError(t, n, r, o) {
    return Jt.generate(t, n, r, o);
  }
  buildURL(t, n, r) {
    const o = !this.baseURLOverridden() && r || this.baseURL, i = xD(t) ? new URL(t) : new URL(o + (o.endsWith("/") && t.startsWith("/") ? t.slice(1) : t)), s = this.defaultQuery(), a = Object.fromEntries(i.searchParams);
    return (!Lg(s) || !Lg(a)) && (n = Object.assign(Object.assign(Object.assign({}, a), s), n)), typeof n == "object" && n && !Array.isArray(n) && (i.search = this.stringifyQuery(n)), i.toString();
  }
  async prepareOptions(t) {
    if (this.clientAdapter && this.clientAdapter.isVertexAI() && !t.path.startsWith(`/${this.apiVersion}/projects/`)) {
      const n = t.path.slice(this.apiVersion.length + 1);
      t.path = `/${this.apiVersion}/projects/${this.clientAdapter.getProject()}/locations/${this.clientAdapter.getLocation()}${n}`;
    }
  }
  async prepareRequest(t, { url: n, options: r }) {
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
  methodRequest(t, n, r) {
    return this.request(Promise.resolve(r).then((o) => Object.assign({
      method: t,
      path: n
    }, o)));
  }
  request(t, n = null) {
    return new rL(this, this.makeRequest(t, n, void 0));
  }
  async makeRequest(t, n, r) {
    var o, i, s;
    const a = await t, u = (o = a.maxRetries) !== null && o !== void 0 ? o : this.maxRetries;
    n == null && (n = u), await this.prepareOptions(a);
    const { req: f, url: d, timeout: h } = await this.buildRequest(a, { retryCount: u - n });
    await this.prepareRequest(f, {
      url: d,
      options: a
    });
    const p = "log_" + (Math.random() * (1 << 24) | 0).toString(16).padStart(6, "0"), m = r === void 0 ? "" : `, retryOf: ${r}`, g = Date.now();
    if (yt(this).debug(`[${p}] sending request`, Rr({
      retryOfRequestLogID: r,
      method: a.method,
      url: d,
      options: a,
      headers: f.headers
    })), !((i = a.signal) === null || i === void 0) && i.aborted) throw new gf();
    const y = new AbortController(), v = await this.fetchWithTimeout(d, f, h, y).catch(pf), w = Date.now();
    if (v instanceof globalThis.Error) {
      const S = `retrying, ${n} attempts remaining`;
      if (!((s = a.signal) === null || s === void 0) && s.aborted) throw new gf();
      const T = hf(v) || /timed? ?out/i.test(String(v) + ("cause" in v ? String(v.cause) : ""));
      if (n)
        return yt(this).info(`[${p}] connection ${T ? "timed out" : "failed"} - ${S}`), yt(this).debug(`[${p}] connection ${T ? "timed out" : "failed"} (${S})`, Rr({
          retryOfRequestLogID: r,
          url: d,
          durationMs: w - g,
          message: v.message
        })), this.retryRequest(a, n, r ?? p);
      throw yt(this).info(`[${p}] connection ${T ? "timed out" : "failed"} - error; no more retries left`), yt(this).debug(`[${p}] connection ${T ? "timed out" : "failed"} (error; no more retries left)`, Rr({
        retryOfRequestLogID: r,
        url: d,
        durationMs: w - g,
        message: v.message
      })), T ? new Ww() : new lu({ cause: v });
    }
    const _ = `[${p}${m}] ${f.method} ${d} ${v.ok ? "succeeded" : "failed"} with status ${v.status} in ${w - g}ms`;
    if (!v.ok) {
      const S = await this.shouldRetry(v);
      if (n && S) {
        const I = `retrying, ${n} attempts remaining`;
        return await $D(v.body), yt(this).info(`${_} - ${I}`), yt(this).debug(`[${p}] response error (${I})`, Rr({
          retryOfRequestLogID: r,
          url: v.url,
          status: v.status,
          headers: v.headers,
          durationMs: w - g
        })), this.retryRequest(a, n, r ?? p, v.headers);
      }
      const T = S ? "error; no more retries left" : "error; not retryable";
      yt(this).info(`${_} - ${T}`);
      const C = await v.text().catch((I) => pf(I).message), E = kD(C), M = E ? void 0 : C;
      throw yt(this).debug(`[${p}] response error (${T})`, Rr({
        retryOfRequestLogID: r,
        url: v.url,
        status: v.status,
        headers: v.headers,
        message: M,
        durationMs: Date.now() - g
      })), this.makeStatusError(v.status, E, M, v.headers);
    }
    return yt(this).info(_), yt(this).debug(`[${p}] response start`, Rr({
      retryOfRequestLogID: r,
      url: v.url,
      status: v.status,
      headers: v.headers,
      durationMs: w - g
    })), {
      response: v,
      options: a,
      controller: y,
      requestLogID: p,
      retryOfRequestLogID: r,
      startTime: g
    };
  }
  async fetchWithTimeout(t, n, r, o) {
    const i = n || {}, { signal: s, method: a } = i, u = ur(i, ["signal", "method"]), f = this._makeAbort(o);
    s && s.addEventListener("abort", f, { once: !0 });
    const d = setTimeout(f, r), h = globalThis.ReadableStream && u.body instanceof globalThis.ReadableStream || typeof u.body == "object" && u.body !== null && Symbol.asyncIterator in u.body, p = Object.assign(Object.assign(Object.assign({ signal: o.signal }, h ? { duplex: "half" } : {}), { method: "GET" }), u);
    a && (p.method = a.toUpperCase());
    try {
      return await this.fetch.call(void 0, t, p);
    } finally {
      clearTimeout(d);
    }
  }
  async shouldRetry(t) {
    const n = t.headers.get("x-should-retry");
    return n === "true" ? !0 : n === "false" ? !1 : t.status === 408 || t.status === 409 || t.status === 429 || t.status >= 500;
  }
  async retryRequest(t, n, r, o) {
    var i;
    let s;
    const a = o?.get("retry-after-ms");
    if (a) {
      const f = parseFloat(a);
      Number.isNaN(f) || (s = f);
    }
    const u = o?.get("retry-after");
    if (u && !s) {
      const f = parseFloat(u);
      Number.isNaN(f) ? s = Date.parse(u) - Date.now() : s = f * 1e3;
    }
    if (s === void 0) {
      const f = (i = t.maxRetries) !== null && i !== void 0 ? i : this.maxRetries;
      s = this.calculateDefaultRetryTimeoutMillis(n, f);
    }
    return await DD(s), this.makeRequest(t, n - 1, r);
  }
  calculateDefaultRetryTimeoutMillis(t, n) {
    const i = n - t;
    return Math.min(0.5 * Math.pow(2, i), 8) * (1 - Math.random() * 0.25) * 1e3;
  }
  async buildRequest(t, { retryCount: n = 0 } = {}) {
    var r, o, i;
    const s = Object.assign({}, t), { method: a, path: u, query: f, defaultBaseURL: d } = s, h = this.buildURL(u, f, d);
    "timeout" in s && ND("timeout", s.timeout), s.timeout = (r = s.timeout) !== null && r !== void 0 ? r : this.timeout;
    const { bodyHeaders: p, body: m } = this.buildBody({ options: s }), g = await this.buildHeaders({
      options: t,
      method: a,
      bodyHeaders: p,
      retryCount: n
    });
    return {
      req: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
        method: a,
        headers: g
      }, s.signal && { signal: s.signal }), globalThis.ReadableStream && m instanceof globalThis.ReadableStream && { duplex: "half" }), m && { body: m }), (o = this.fetchOptions) !== null && o !== void 0 ? o : {}), (i = s.fetchOptions) !== null && i !== void 0 ? i : {}),
      url: h,
      timeout: s.timeout
    };
  }
  async buildHeaders({ options: t, method: n, bodyHeaders: r, retryCount: o }) {
    let i = {};
    this.idempotencyHeader && n !== "get" && (t.idempotencyKey || (t.idempotencyKey = this.defaultIdempotencyKey()), i[this.idempotencyHeader] = t.idempotencyKey);
    const s = await this.authHeaders(t);
    let a = Si([
      i,
      {
        Accept: "application/json",
        "User-Agent": this.getUserAgent()
      },
      this._options.defaultHeaders,
      r,
      t.headers,
      s
    ]);
    return this.validateHeaders(a), a.values;
  }
  _makeAbort(t) {
    return () => t.abort();
  }
  buildBody({ options: { body: t, headers: n } }) {
    if (!t) return {
      bodyHeaders: void 0,
      body: void 0
    };
    const r = Si([n]);
    return ArrayBuffer.isView(t) || t instanceof ArrayBuffer || t instanceof DataView || typeof t == "string" && r.values.has("content-type") || globalThis.Blob && t instanceof globalThis.Blob || t instanceof FormData || t instanceof URLSearchParams || globalThis.ReadableStream && t instanceof globalThis.ReadableStream ? {
      bodyHeaders: void 0,
      body: t
    } : typeof t == "object" && (Symbol.asyncIterator in t || Symbol.iterator in t && "next" in t && typeof t.next == "function") ? {
      bodyHeaders: void 0,
      body: UD(t)
    } : typeof t == "object" && r.values.get("content-type") === "application/x-www-form-urlencoded" ? {
      bodyHeaders: { "content-type": "application/x-www-form-urlencoded" },
      body: this.stringifyQuery(t)
    } : this.encoder({
      body: t,
      headers: r
    });
  }
};
pE.DEFAULT_TIMEOUT = 6e4;
var je = class extends pE {
  constructor() {
    super(...arguments), this.interactions = new lE(this), this.webhooks = new cE(this);
  }
};
hE = je;
je.GeminiNextGenAPIClient = hE;
je.GeminiNextGenAPIClientError = Kt;
je.APIError = Jt;
je.APIConnectionError = lu;
je.APIConnectionTimeoutError = Ww;
je.APIUserAbortError = gf;
je.NotFoundError = Qw;
je.ConflictError = Zw;
je.RateLimitError = eE;
je.BadRequestError = Yw;
je.AuthenticationError = zw;
je.InternalServerError = tE;
je.PermissionDeniedError = Xw;
je.UnprocessableEntityError = jw;
je.toFile = KD;
je.Interactions = lE;
je.Webhooks = cE;
function iL(e, t) {
  const n = {}, r = l(e, ["name"]);
  return r != null && c(n, ["_url", "name"], r), n;
}
function sL(e, t) {
  const n = {}, r = l(e, ["name"]);
  return r != null && c(n, ["_url", "name"], r), n;
}
function aL(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  return r != null && c(n, ["sdkHttpResponse"], r), n;
}
function lL(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  return r != null && c(n, ["sdkHttpResponse"], r), n;
}
function uL(e, t, n) {
  const r = {};
  if (l(e, ["validationDataset"]) !== void 0) throw new Error("validationDataset parameter is not supported in Gemini API.");
  const o = l(e, ["tunedModelDisplayName"]);
  if (t !== void 0 && o != null && c(t, ["displayName"], o), l(e, ["description"]) !== void 0) throw new Error("description parameter is not supported in Gemini API.");
  const i = l(e, ["epochCount"]);
  t !== void 0 && i != null && c(t, [
    "tuningTask",
    "hyperparameters",
    "epochCount"
  ], i);
  const s = l(e, ["learningRateMultiplier"]);
  if (s != null && c(r, [
    "tuningTask",
    "hyperparameters",
    "learningRateMultiplier"
  ], s), l(e, ["exportLastCheckpointOnly"]) !== void 0) throw new Error("exportLastCheckpointOnly parameter is not supported in Gemini API.");
  if (l(e, ["preTunedModelCheckpointId"]) !== void 0) throw new Error("preTunedModelCheckpointId parameter is not supported in Gemini API.");
  if (l(e, ["adapterSize"]) !== void 0) throw new Error("adapterSize parameter is not supported in Gemini API.");
  if (l(e, ["tuningMode"]) !== void 0) throw new Error("tuningMode parameter is not supported in Gemini API.");
  if (l(e, ["customBaseModel"]) !== void 0) throw new Error("customBaseModel parameter is not supported in Gemini API.");
  const a = l(e, ["batchSize"]);
  t !== void 0 && a != null && c(t, [
    "tuningTask",
    "hyperparameters",
    "batchSize"
  ], a);
  const u = l(e, ["learningRate"]);
  if (t !== void 0 && u != null && c(t, [
    "tuningTask",
    "hyperparameters",
    "learningRate"
  ], u), l(e, ["labels"]) !== void 0) throw new Error("labels parameter is not supported in Gemini API.");
  if (l(e, ["beta"]) !== void 0) throw new Error("beta parameter is not supported in Gemini API.");
  if (l(e, ["baseTeacherModel"]) !== void 0) throw new Error("baseTeacherModel parameter is not supported in Gemini API.");
  if (l(e, ["tunedTeacherModelSource"]) !== void 0) throw new Error("tunedTeacherModelSource parameter is not supported in Gemini API.");
  if (l(e, ["sftLossWeightMultiplier"]) !== void 0) throw new Error("sftLossWeightMultiplier parameter is not supported in Gemini API.");
  if (l(e, ["outputUri"]) !== void 0) throw new Error("outputUri parameter is not supported in Gemini API.");
  if (l(e, ["encryptionSpec"]) !== void 0) throw new Error("encryptionSpec parameter is not supported in Gemini API.");
  return r;
}
function cL(e, t, n) {
  const r = {};
  let o = l(n, ["config", "method"]);
  if (o === void 0 && (o = "SUPERVISED_FINE_TUNING"), o === "SUPERVISED_FINE_TUNING") {
    const E = l(e, ["validationDataset"]);
    t !== void 0 && E != null && c(t, ["supervisedTuningSpec"], oc(E));
  } else if (o === "PREFERENCE_TUNING") {
    const E = l(e, ["validationDataset"]);
    t !== void 0 && E != null && c(t, ["preferenceOptimizationSpec"], oc(E));
  } else if (o === "DISTILLATION") {
    const E = l(e, ["validationDataset"]);
    t !== void 0 && E != null && c(t, ["distillationSpec"], oc(E));
  }
  const i = l(e, ["tunedModelDisplayName"]);
  t !== void 0 && i != null && c(t, ["tunedModelDisplayName"], i);
  const s = l(e, ["description"]);
  t !== void 0 && s != null && c(t, ["description"], s);
  let a = l(n, ["config", "method"]);
  if (a === void 0 && (a = "SUPERVISED_FINE_TUNING"), a === "SUPERVISED_FINE_TUNING") {
    const E = l(e, ["epochCount"]);
    t !== void 0 && E != null && c(t, [
      "supervisedTuningSpec",
      "hyperParameters",
      "epochCount"
    ], E);
  } else if (a === "PREFERENCE_TUNING") {
    const E = l(e, ["epochCount"]);
    t !== void 0 && E != null && c(t, [
      "preferenceOptimizationSpec",
      "hyperParameters",
      "epochCount"
    ], E);
  } else if (a === "DISTILLATION") {
    const E = l(e, ["epochCount"]);
    t !== void 0 && E != null && c(t, [
      "distillationSpec",
      "hyperParameters",
      "epochCount"
    ], E);
  }
  let u = l(n, ["config", "method"]);
  if (u === void 0 && (u = "SUPERVISED_FINE_TUNING"), u === "SUPERVISED_FINE_TUNING") {
    const E = l(e, ["learningRateMultiplier"]);
    t !== void 0 && E != null && c(t, [
      "supervisedTuningSpec",
      "hyperParameters",
      "learningRateMultiplier"
    ], E);
  } else if (u === "PREFERENCE_TUNING") {
    const E = l(e, ["learningRateMultiplier"]);
    t !== void 0 && E != null && c(t, [
      "preferenceOptimizationSpec",
      "hyperParameters",
      "learningRateMultiplier"
    ], E);
  } else if (u === "DISTILLATION") {
    const E = l(e, ["learningRateMultiplier"]);
    t !== void 0 && E != null && c(t, [
      "distillationSpec",
      "hyperParameters",
      "learningRateMultiplier"
    ], E);
  }
  let f = l(n, ["config", "method"]);
  if (f === void 0 && (f = "SUPERVISED_FINE_TUNING"), f === "SUPERVISED_FINE_TUNING") {
    const E = l(e, ["exportLastCheckpointOnly"]);
    t !== void 0 && E != null && c(t, ["supervisedTuningSpec", "exportLastCheckpointOnly"], E);
  } else if (f === "PREFERENCE_TUNING") {
    const E = l(e, ["exportLastCheckpointOnly"]);
    t !== void 0 && E != null && c(t, ["preferenceOptimizationSpec", "exportLastCheckpointOnly"], E);
  } else if (f === "DISTILLATION") {
    const E = l(e, ["exportLastCheckpointOnly"]);
    t !== void 0 && E != null && c(t, ["distillationSpec", "exportLastCheckpointOnly"], E);
  }
  let d = l(n, ["config", "method"]);
  if (d === void 0 && (d = "SUPERVISED_FINE_TUNING"), d === "SUPERVISED_FINE_TUNING") {
    const E = l(e, ["adapterSize"]);
    t !== void 0 && E != null && c(t, [
      "supervisedTuningSpec",
      "hyperParameters",
      "adapterSize"
    ], E);
  } else if (d === "PREFERENCE_TUNING") {
    const E = l(e, ["adapterSize"]);
    t !== void 0 && E != null && c(t, [
      "preferenceOptimizationSpec",
      "hyperParameters",
      "adapterSize"
    ], E);
  } else if (d === "DISTILLATION") {
    const E = l(e, ["adapterSize"]);
    t !== void 0 && E != null && c(t, [
      "distillationSpec",
      "hyperParameters",
      "adapterSize"
    ], E);
  }
  let h = l(n, ["config", "method"]);
  if (h === void 0 && (h = "SUPERVISED_FINE_TUNING"), h === "SUPERVISED_FINE_TUNING") {
    const E = l(e, ["tuningMode"]);
    t !== void 0 && E != null && c(t, ["supervisedTuningSpec", "tuningMode"], E);
  } else if (h === "DISTILLATION") {
    const E = l(e, ["tuningMode"]);
    t !== void 0 && E != null && c(t, ["distillationSpec", "tuningMode"], E);
  }
  const p = l(e, ["customBaseModel"]);
  t !== void 0 && p != null && c(t, ["customBaseModel"], p);
  let m = l(n, ["config", "method"]);
  if (m === void 0 && (m = "SUPERVISED_FINE_TUNING"), m === "SUPERVISED_FINE_TUNING") {
    const E = l(e, ["batchSize"]);
    t !== void 0 && E != null && c(t, [
      "supervisedTuningSpec",
      "hyperParameters",
      "batchSize"
    ], E);
  } else if (m === "DISTILLATION") {
    const E = l(e, ["batchSize"]);
    t !== void 0 && E != null && c(t, [
      "distillationSpec",
      "hyperParameters",
      "batchSize"
    ], E);
  }
  let g = l(n, ["config", "method"]);
  if (g === void 0 && (g = "SUPERVISED_FINE_TUNING"), g === "SUPERVISED_FINE_TUNING") {
    const E = l(e, ["learningRate"]);
    t !== void 0 && E != null && c(t, [
      "supervisedTuningSpec",
      "hyperParameters",
      "learningRate"
    ], E);
  } else if (g === "DISTILLATION") {
    const E = l(e, ["learningRate"]);
    t !== void 0 && E != null && c(t, [
      "distillationSpec",
      "hyperParameters",
      "learningRate"
    ], E);
  }
  const y = l(e, ["labels"]);
  t !== void 0 && y != null && c(t, ["labels"], y);
  const v = l(e, ["beta"]);
  t !== void 0 && v != null && c(t, [
    "preferenceOptimizationSpec",
    "hyperParameters",
    "beta"
  ], v);
  const w = l(e, ["baseTeacherModel"]);
  t !== void 0 && w != null && c(t, ["distillationSpec", "baseTeacherModel"], w);
  const _ = l(e, ["tunedTeacherModelSource"]);
  t !== void 0 && _ != null && c(t, ["distillationSpec", "tunedTeacherModelSource"], _);
  const S = l(e, ["sftLossWeightMultiplier"]);
  t !== void 0 && S != null && c(t, [
    "distillationSpec",
    "hyperParameters",
    "sftLossWeightMultiplier"
  ], S);
  const T = l(e, ["outputUri"]);
  t !== void 0 && T != null && c(t, ["outputUri"], T);
  const C = l(e, ["encryptionSpec"]);
  return t !== void 0 && C != null && c(t, ["encryptionSpec"], C), r;
}
function fL(e, t) {
  const n = {}, r = l(e, ["baseModel"]);
  r != null && c(n, ["baseModel"], r);
  const o = l(e, ["preTunedModel"]);
  o != null && c(n, ["preTunedModel"], o);
  const i = l(e, ["trainingDataset"]);
  i != null && TL(i);
  const s = l(e, ["config"]);
  return s != null && uL(s, n), n;
}
function dL(e, t) {
  const n = {}, r = l(e, ["baseModel"]);
  r != null && c(n, ["baseModel"], r);
  const o = l(e, ["preTunedModel"]);
  o != null && c(n, ["preTunedModel"], o);
  const i = l(e, ["trainingDataset"]);
  i != null && SL(i, n, t);
  const s = l(e, ["config"]);
  return s != null && cL(s, n, t), n;
}
function hL(e, t) {
  const n = {}, r = l(e, ["name"]);
  return r != null && c(n, ["_url", "name"], r), n;
}
function pL(e, t) {
  const n = {}, r = l(e, ["name"]);
  return r != null && c(n, ["_url", "name"], r), n;
}
function mL(e, t, n) {
  const r = {}, o = l(e, ["pageSize"]);
  t !== void 0 && o != null && c(t, ["_query", "pageSize"], o);
  const i = l(e, ["pageToken"]);
  t !== void 0 && i != null && c(t, ["_query", "pageToken"], i);
  const s = l(e, ["filter"]);
  return t !== void 0 && s != null && c(t, ["_query", "filter"], s), r;
}
function gL(e, t, n) {
  const r = {}, o = l(e, ["pageSize"]);
  t !== void 0 && o != null && c(t, ["_query", "pageSize"], o);
  const i = l(e, ["pageToken"]);
  t !== void 0 && i != null && c(t, ["_query", "pageToken"], i);
  const s = l(e, ["filter"]);
  return t !== void 0 && s != null && c(t, ["_query", "filter"], s), r;
}
function yL(e, t) {
  const n = {}, r = l(e, ["config"]);
  return r != null && mL(r, n), n;
}
function vL(e, t) {
  const n = {}, r = l(e, ["config"]);
  return r != null && gL(r, n), n;
}
function _L(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  r != null && c(n, ["sdkHttpResponse"], r);
  const o = l(e, ["nextPageToken"]);
  o != null && c(n, ["nextPageToken"], o);
  const i = l(e, ["tunedModels"]);
  if (i != null) {
    let s = i;
    Array.isArray(s) && (s = s.map((a) => gE(a))), c(n, ["tuningJobs"], s);
  }
  return n;
}
function wL(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  r != null && c(n, ["sdkHttpResponse"], r);
  const o = l(e, ["nextPageToken"]);
  o != null && c(n, ["nextPageToken"], o);
  const i = l(e, ["tuningJobs"]);
  if (i != null) {
    let s = i;
    Array.isArray(s) && (s = s.map((a) => _f(a))), c(n, ["tuningJobs"], s);
  }
  return n;
}
function EL(e, t) {
  const n = {}, r = l(e, ["name"]);
  r != null && c(n, ["model"], r);
  const o = l(e, ["name"]);
  return o != null && c(n, ["endpoint"], o), n;
}
function TL(e, t) {
  const n = {};
  if (l(e, ["gcsUri"]) !== void 0) throw new Error("gcsUri parameter is not supported in Gemini API.");
  if (l(e, ["vertexDatasetResource"]) !== void 0) throw new Error("vertexDatasetResource parameter is not supported in Gemini API.");
  const r = l(e, ["examples"]);
  if (r != null) {
    let o = r;
    Array.isArray(o) && (o = o.map((i) => i)), c(n, ["examples", "examples"], o);
  }
  return n;
}
function SL(e, t, n) {
  const r = {};
  let o = l(n, ["config", "method"]);
  if (o === void 0 && (o = "SUPERVISED_FINE_TUNING"), o === "SUPERVISED_FINE_TUNING") {
    const s = l(e, ["gcsUri"]);
    t !== void 0 && s != null && c(t, ["supervisedTuningSpec", "trainingDatasetUri"], s);
  } else if (o === "PREFERENCE_TUNING") {
    const s = l(e, ["gcsUri"]);
    t !== void 0 && s != null && c(t, ["preferenceOptimizationSpec", "trainingDatasetUri"], s);
  } else if (o === "DISTILLATION") {
    const s = l(e, ["gcsUri"]);
    t !== void 0 && s != null && c(t, ["distillationSpec", "promptDatasetUri"], s);
  }
  let i = l(n, ["config", "method"]);
  if (i === void 0 && (i = "SUPERVISED_FINE_TUNING"), i === "SUPERVISED_FINE_TUNING") {
    const s = l(e, ["vertexDatasetResource"]);
    t !== void 0 && s != null && c(t, ["supervisedTuningSpec", "trainingDatasetUri"], s);
  } else if (i === "PREFERENCE_TUNING") {
    const s = l(e, ["vertexDatasetResource"]);
    t !== void 0 && s != null && c(t, ["preferenceOptimizationSpec", "trainingDatasetUri"], s);
  } else if (i === "DISTILLATION") {
    const s = l(e, ["vertexDatasetResource"]);
    t !== void 0 && s != null && c(t, ["distillationSpec", "promptDatasetUri"], s);
  }
  if (l(e, ["examples"]) !== void 0) throw new Error("examples parameter is not supported in Vertex AI.");
  return r;
}
function gE(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  r != null && c(n, ["sdkHttpResponse"], r);
  const o = l(e, ["name"]);
  o != null && c(n, ["name"], o);
  const i = l(e, ["state"]);
  i != null && c(n, ["state"], Cw(i));
  const s = l(e, ["createTime"]);
  s != null && c(n, ["createTime"], s);
  const a = l(e, ["tuningTask", "startTime"]);
  a != null && c(n, ["startTime"], a);
  const u = l(e, ["tuningTask", "completeTime"]);
  u != null && c(n, ["endTime"], u);
  const f = l(e, ["updateTime"]);
  f != null && c(n, ["updateTime"], f);
  const d = l(e, ["description"]);
  d != null && c(n, ["description"], d);
  const h = l(e, ["baseModel"]);
  h != null && c(n, ["baseModel"], h);
  const p = l(e, ["_self"]);
  return p != null && c(n, ["tunedModel"], EL(p)), n;
}
function _f(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  r != null && c(n, ["sdkHttpResponse"], r);
  const o = l(e, ["name"]);
  o != null && c(n, ["name"], o);
  const i = l(e, ["state"]);
  i != null && c(n, ["state"], Cw(i));
  const s = l(e, ["createTime"]);
  s != null && c(n, ["createTime"], s);
  const a = l(e, ["startTime"]);
  a != null && c(n, ["startTime"], a);
  const u = l(e, ["endTime"]);
  u != null && c(n, ["endTime"], u);
  const f = l(e, ["updateTime"]);
  f != null && c(n, ["updateTime"], f);
  const d = l(e, ["error"]);
  d != null && c(n, ["error"], d);
  const h = l(e, ["description"]);
  h != null && c(n, ["description"], h);
  const p = l(e, ["baseModel"]);
  p != null && c(n, ["baseModel"], p);
  const m = l(e, ["tunedModel"]);
  m != null && c(n, ["tunedModel"], m);
  const g = l(e, ["preTunedModel"]);
  g != null && c(n, ["preTunedModel"], g);
  const y = l(e, ["supervisedTuningSpec"]);
  y != null && c(n, ["supervisedTuningSpec"], y);
  const v = l(e, ["preferenceOptimizationSpec"]);
  v != null && c(n, ["preferenceOptimizationSpec"], v);
  const w = l(e, ["distillationSpec"]);
  w != null && c(n, ["distillationSpec"], w);
  const _ = l(e, ["tuningDataStats"]);
  _ != null && c(n, ["tuningDataStats"], _);
  const S = l(e, ["encryptionSpec"]);
  S != null && c(n, ["encryptionSpec"], S);
  const T = l(e, ["partnerModelTuningSpec"]);
  T != null && c(n, ["partnerModelTuningSpec"], T);
  const C = l(e, ["customBaseModel"]);
  C != null && c(n, ["customBaseModel"], C);
  const E = l(e, ["evaluateDatasetRuns"]);
  if (E != null) {
    let fe = E;
    Array.isArray(fe) && (fe = fe.map((we) => we)), c(n, ["evaluateDatasetRuns"], fe);
  }
  const M = l(e, ["experiment"]);
  M != null && c(n, ["experiment"], M);
  const I = l(e, ["fullFineTuningSpec"]);
  I != null && c(n, ["fullFineTuningSpec"], I);
  const D = l(e, ["labels"]);
  D != null && c(n, ["labels"], D);
  const $ = l(e, ["outputUri"]);
  $ != null && c(n, ["outputUri"], $);
  const q = l(e, ["pipelineJob"]);
  q != null && c(n, ["pipelineJob"], q);
  const z = l(e, ["serviceAccount"]);
  z != null && c(n, ["serviceAccount"], z);
  const J = l(e, ["tunedModelDisplayName"]);
  J != null && c(n, ["tunedModelDisplayName"], J);
  const ne = l(e, ["tuningJobState"]);
  ne != null && c(n, ["tuningJobState"], ne);
  const H = l(e, ["veoTuningSpec"]);
  H != null && c(n, ["veoTuningSpec"], H);
  const pe = l(e, ["distillationSamplingSpec"]);
  pe != null && c(n, ["distillationSamplingSpec"], pe);
  const ue = l(e, ["tuningJobMetadata"]);
  return ue != null && c(n, ["tuningJobMetadata"], ue), n;
}
function AL(e, t) {
  const n = {}, r = l(e, ["sdkHttpResponse"]);
  r != null && c(n, ["sdkHttpResponse"], r);
  const o = l(e, ["name"]);
  o != null && c(n, ["name"], o);
  const i = l(e, ["metadata"]);
  i != null && c(n, ["metadata"], i);
  const s = l(e, ["done"]);
  s != null && c(n, ["done"], s);
  const a = l(e, ["error"]);
  return a != null && c(n, ["error"], a), n;
}
function oc(e, t) {
  const n = {}, r = l(e, ["gcsUri"]);
  r != null && c(n, ["validationDatasetUri"], r);
  const o = l(e, ["vertexDatasetResource"]);
  return o != null && c(n, ["validationDatasetUri"], o), n;
}
var CL = class extends Wn {
  constructor(e) {
    super(), this.apiClient = e, this.list = async (t = {}) => new jr(Kn.PAGED_ITEM_TUNING_JOBS, (n) => this.listInternal(n), await this.listInternal(t), t), this.get = async (t) => await this.getInternal(t), this.tune = async (t) => {
      var n;
      if (this.apiClient.isVertexAI()) if (t.baseModel.startsWith("projects/")) {
        const r = { tunedModelName: t.baseModel };
        !((n = t.config) === null || n === void 0) && n.preTunedModelCheckpointId && (r.checkpointId = t.config.preTunedModelCheckpointId);
        const o = Object.assign(Object.assign({}, t), { preTunedModel: r });
        return o.baseModel = void 0, await this.tuneInternal(o);
      } else {
        const r = Object.assign({}, t);
        return await this.tuneInternal(r);
      }
      else {
        const r = Object.assign({}, t), o = await this.tuneMldevInternal(r);
        let i = "";
        return o.metadata !== void 0 && o.metadata.tunedModel !== void 0 ? i = o.metadata.tunedModel : o.name !== void 0 && o.name.includes("/operations/") && (i = o.name.split("/operations/")[0]), {
          name: i,
          state: of.JOB_STATE_QUEUED
        };
      }
    };
  }
  async getInternal(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = pL(e);
      return s = X("{name}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => _f(f));
    } else {
      const u = hL(e);
      return s = X("{name}", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => gE(f));
    }
  }
  async listInternal(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = vL(e);
      return s = X("tuningJobs", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = wL(f), h = new cg();
        return Object.assign(h, d), h;
      });
    } else {
      const u = yL(e);
      return s = X("tunedModels", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = _L(f), h = new cg();
        return Object.assign(h, d), h;
      });
    }
  }
  async cancel(e) {
    var t, n, r, o;
    let i, s = "", a = {};
    if (this.apiClient.isVertexAI()) {
      const u = sL(e);
      return s = X("{name}:cancel", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = lL(f), h = new fg();
        return Object.assign(h, d), h;
      });
    } else {
      const u = iL(e);
      return s = X("{name}:cancel", u._url), a = u._query, delete u._url, delete u._query, i = this.apiClient.request({
        path: s,
        queryParams: a,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (r = e.config) === null || r === void 0 ? void 0 : r.httpOptions,
        abortSignal: (o = e.config) === null || o === void 0 ? void 0 : o.abortSignal
      }).then((f) => f.json().then((d) => {
        const h = d;
        return h.sdkHttpResponse = { headers: f.headers }, h;
      })), i.then((f) => {
        const d = aL(f), h = new fg();
        return Object.assign(h, d), h;
      });
    }
  }
  async tuneInternal(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) {
      const s = dL(e, e);
      return o = X("tuningJobs", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json().then((u) => {
        const f = u;
        return f.sdkHttpResponse = { headers: a.headers }, f;
      })), r.then((a) => _f(a));
    } else throw new Error("This method is only supported by the Vertex AI.");
  }
  async tuneMldevInternal(e) {
    var t, n;
    let r, o = "", i = {};
    if (this.apiClient.isVertexAI()) throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const s = fL(e);
      return o = X("tunedModels", s._url), i = s._query, delete s._url, delete s._query, r = this.apiClient.request({
        path: o,
        queryParams: i,
        body: JSON.stringify(s),
        httpMethod: "POST",
        httpOptions: (t = e.config) === null || t === void 0 ? void 0 : t.httpOptions,
        abortSignal: (n = e.config) === null || n === void 0 ? void 0 : n.abortSignal
      }).then((a) => a.json().then((u) => {
        const f = u;
        return f.sdkHttpResponse = { headers: a.headers }, f;
      })), r.then((a) => AL(a));
    }
  }
}, bL = class {
  async download(e, t) {
    throw new Error("Download to file is not supported in the browser, please use a browser compliant download like an <a> tag.");
  }
}, IL = 1024 * 1024 * 8, RL = 3, PL = 1e3, xL = 2, Il = "x-goog-upload-status";
async function ML(e, t, n, r) {
  var o;
  const i = await yE(e, t, n, r), s = await i?.json();
  if (((o = i?.headers) === null || o === void 0 ? void 0 : o[Il]) !== "final") throw new Error("Failed to upload file: Upload status is not finalized.");
  return s.file;
}
async function NL(e, t, n, r) {
  var o;
  const i = await yE(e, t, n, r), s = await i?.json();
  if (((o = i?.headers) === null || o === void 0 ? void 0 : o[Il]) !== "final") throw new Error("Failed to upload file: Upload status is not finalized.");
  const a = gw(s), u = new JR();
  return Object.assign(u, a), u;
}
async function yE(e, t, n, r) {
  var o, i, s;
  let a = t;
  const u = r?.baseUrl || ((o = n.clientOptions.httpOptions) === null || o === void 0 ? void 0 : o.baseUrl);
  if (u) {
    const m = new URL(u), g = new URL(t);
    g.protocol = m.protocol, g.host = m.host, g.port = m.port, a = g.toString();
  }
  let f = 0, d = 0, h = new af(new Response()), p = "upload";
  for (f = e.size; d < f; ) {
    const m = Math.min(IL, f - d), g = e.slice(d, d + m);
    d + m >= f && (p += ", finalize");
    let y = 0, v = PL;
    for (; y < RL; ) {
      const w = Object.assign(Object.assign({}, r?.headers || {}), {
        "X-Goog-Upload-Command": p,
        "X-Goog-Upload-Offset": String(d),
        "Content-Length": String(m)
      });
      if (h = await n.request({
        path: "",
        body: g,
        httpMethod: "POST",
        httpOptions: Object.assign(Object.assign({}, r), {
          apiVersion: "",
          baseUrl: a,
          headers: w
        })
      }), !((i = h?.headers) === null || i === void 0) && i[Il]) break;
      y++, await DL(v), v = v * xL;
    }
    if (d += m, ((s = h?.headers) === null || s === void 0 ? void 0 : s[Il]) !== "active") break;
    if (f <= d) throw new Error("All content has been uploaded, but the upload status is not finalized.");
  }
  return h;
}
async function kL(e) {
  return {
    size: e.size,
    type: e.type
  };
}
function DL(e) {
  return new Promise((t) => setTimeout(t, e));
}
var LL = class {
  async upload(e, t, n, r) {
    if (typeof e == "string") throw new Error("File path is not supported in browser uploader.");
    return await ML(e, t, n, r);
  }
  async uploadToFileSearchStore(e, t, n, r) {
    if (typeof e == "string") throw new Error("File path is not supported in browser uploader.");
    return await NL(e, t, n, r);
  }
  async stat(e) {
    if (typeof e == "string") throw new Error("File path is not supported in browser uploader.");
    return await kL(e);
  }
}, UL = class {
  create(e, t, n) {
    return new $L(e, t, n);
  }
}, $L = class {
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
}, Bg = "x-goog-api-key", FL = class {
  constructor(e) {
    this.apiKey = e;
  }
  async addAuthHeaders(e, t) {
    if (e.get(Bg) === null) {
      if (this.apiKey.startsWith("auth_tokens/")) throw new Error("Ephemeral tokens are only supported by the live API.");
      if (!this.apiKey) throw new Error("API key is missing. Please provide a valid API key.");
      e.append(Bg, this.apiKey);
    }
  }
}, OL = "gl-node/", BL = class {
  getNextGenClient() {
    var e;
    const t = this.httpOptions;
    if (this._nextGenClient === void 0) {
      const n = this.httpOptions;
      this._nextGenClient = new je({
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
    const n = mR(e.httpOptions, e.vertexai, void 0, void 0);
    n && (e.httpOptions ? e.httpOptions.baseUrl = n : e.httpOptions = { baseUrl: n }), this.apiVersion = e.apiVersion, this.httpOptions = e.httpOptions;
    const r = new FL(this.apiKey);
    this.apiClient = new Dk({
      auth: r,
      apiVersion: this.apiVersion,
      apiKey: this.apiKey,
      vertexai: this.vertexai,
      httpOptions: this.httpOptions,
      userAgentExtra: OL + "web",
      uploader: new LL(),
      downloader: new bL()
    }), this.models = new eD(this.apiClient), this.live = new Yk(this.apiClient, r, new UL()), this.batches = new zP(this.apiClient), this.chats = new kx(this.models, this.apiClient), this.caches = new xx(this.apiClient), this.files = new Kx(this.apiClient), this.operations = new tD(this.apiClient), this.authTokens = new _D(this.apiClient), this.tunings = new CL(this.apiClient), this.fileSearchStores = new ID(this.apiClient);
  }
};
function Gg(e) {
  try {
    return JSON.parse(e || "{}");
  } catch {
    return {};
  }
}
function ns(e) {
  if (e !== void 0)
    try {
      return JSON.parse(JSON.stringify(e));
    } catch {
      return;
    }
}
function Ur(e) {
  return { text: String(e || "") };
}
function GL(e = "") {
  const t = String(e || "").match(/^data:([^;,]+);base64,(.+)$/);
  return t ? { inlineData: {
    mimeType: t[1],
    data: t[2]
  } } : null;
}
function VL(e) {
  if (typeof e == "string") return [Ur(e)];
  if (!Array.isArray(e)) return [Ur("")];
  const t = e.map((n) => !n || typeof n != "object" ? null : n.type === "text" ? Ur(n.text || "") : n.type === "image_url" && n.image_url?.url ? GL(n.image_url.url) : null).filter(Boolean);
  return t.length ? t : [Ur("")];
}
function Vg() {
  return {
    role: "user",
    parts: [Ur("")]
  };
}
function Gs(e, t = "model") {
  if (!e?.parts?.length) return null;
  const n = ns(e);
  return n ? (n.role || (n.role = t), n) : null;
}
function HL(e) {
  return !!e?.parts?.some((t) => typeof t?.thoughtSignature == "string" && t.thoughtSignature);
}
function qL(e) {
  return !!e?.parts?.some((t) => t?.functionCall?.name);
}
function ic(e, t) {
  return e?.functionCall?.name ? [
    String(e.functionCall.id || ""),
    String(e.functionCall.name || ""),
    JSON.stringify(e.functionCall.args || {}),
    String(t)
  ].join("\0") : "";
}
function KL(e = [], t = "") {
  const n = e.map((u) => Gs(u, "model")).filter(Boolean);
  if (!n.length) return null;
  const r = [...n].reverse().find((u) => HL(u)) || null, o = [...n].reverse().find((u) => qL(u)) || null, i = ns(r || o || n[n.length - 1]);
  if (!i?.parts?.length) return n[n.length - 1];
  if (o) {
    const u = /* @__PURE__ */ new Map();
    n.forEach((d) => {
      d.parts.forEach((h, p) => {
        const m = ic(h, p);
        if (!m) return;
        const g = u.get(m);
        (!g || h.thoughtSignature || !g.thoughtSignature) && u.set(m, ns(h));
      });
    });
    const f = /* @__PURE__ */ new Set();
    i.parts = i.parts.map((d, h) => {
      const p = ic(d, h);
      return p ? (f.add(p), u.get(p) || d) : d;
    }), o.parts.forEach((d, h) => {
      const p = ic(d, h);
      !p || f.has(p) || (i.parts.push(u.get(p) || ns(d)), f.add(p));
    });
  }
  const s = String(t || ""), a = i.parts.filter((u) => !(typeof u?.text == "string" && !u?.thought));
  return i.parts = s ? [{ text: s }, ...a] : a, i.parts.length ? i : n[n.length - 1];
}
function Hg(e) {
  const t = e?.candidates?.[0]?.content?.parts || [], n = t.filter((r) => !r?.thought && typeof r?.text == "string" && r.text).map((r) => r.text).join(`
`);
  return n || t.length ? n : typeof e?.text == "string" && e.text ? e.text : "";
}
function qg(e) {
  const t = Array.isArray(e?.functionCalls) ? e.functionCalls : [], n = (e?.candidates?.[0]?.content?.parts || []).map((r) => r?.functionCall || r).filter((r) => r && r.name);
  return (t.length ? t : n).map((r, o) => ({
    id: r.id || `google-tool-${o + 1}`,
    name: r.name || "",
    arguments: JSON.stringify(r.args || {})
  })).filter((r) => r.name);
}
function JL(e = [], t = []) {
  const n = Array.isArray(e) ? [...e] : [];
  return (Array.isArray(t) ? t : []).forEach((r) => {
    if (!r?.name) return;
    const o = [
      String(r.id || ""),
      String(r.name || ""),
      String(r.arguments || "")
    ].join("\0");
    n.some((i) => [
      String(i.id || ""),
      String(i.name || ""),
      String(i.arguments || "")
    ].join("\0") === o) || n.push(r);
  }), n;
}
function WL(e = []) {
  return {
    role: "user",
    parts: e.filter((t) => t && t.name).map((t) => ({ functionResponse: {
      name: t.name,
      response: t.response || {}
    } }))
  };
}
function YL(e) {
  switch (e) {
    case "high":
      return ts.HIGH;
    case "medium":
      return ts.MEDIUM;
    default:
      return ts.LOW;
  }
}
function Kg(e) {
  return (e?.candidates?.[0]?.content?.parts || []).filter((t) => t?.thought && typeof t.text == "string" && t.text.trim()).map((t, n) => ({
    label: `思考块 ${n + 1}`,
    text: t.text.trim()
  }));
}
function zL(e) {
  const t = [String(e.systemPrompt || "").trim(), ...(e.messages || []).filter((n) => n.role === "system").map((n) => String(n.content || "").trim())].filter(Boolean);
  if (t.length)
    return [...new Set(t)].join(`

`);
}
function XL(e) {
  const t = e?.providerPayload?.googleContent;
  return Gs(t, "model");
}
function QL(e) {
  const t = e?.providerPayload?.googleContents;
  if (!Array.isArray(t) || !t.length) {
    const n = XL(e);
    return n ? [n] : [];
  }
  return t.map((n) => Gs(n, "model")).filter(Boolean);
}
function Vd(e = []) {
  const t = (Array.isArray(e) ? e : []).map((n) => Gs(n, "model")).filter(Boolean);
  if (t.length)
    return {
      googleContent: t[t.length - 1],
      googleContents: t
    };
}
function ZL(e) {
  const t = e?.candidates?.[0]?.content;
  return Vd(t ? [t] : []);
}
function jL(e) {
  return Vd(e ? [e] : []);
}
function vE(e) {
  try {
    if (typeof e?.getHistory == "function") return e.getHistory(!1);
  } catch {
    return [];
  }
  return Array.isArray(e?.history) ? ns(e.history) || [] : [];
}
function eU(e, t = 0) {
  return vE(e).slice(Math.max(0, t)).filter((n) => n?.role === "model").map((n) => Gs(n, "model")).filter(Boolean);
}
function tU(e) {
  const t = /* @__PURE__ */ new Map(), n = [], r = (e || []).filter((i) => i.role === "user" || i.role === "assistant" || i.role === "tool");
  r.forEach((i) => {
    (i.tool_calls || []).forEach((s) => {
      s.id && s.function?.name && t.set(s.id, s.function.name);
    });
  });
  for (let i = 0; i < r.length; i += 1) {
    const s = r[i];
    if (s.role === "tool") {
      const a = [];
      let u = i;
      for (; u < r.length && r[u].role === "tool"; ) {
        const f = r[u];
        a.push({ functionResponse: {
          name: t.get(f.tool_call_id || "") || "tool_result",
          response: Gg(f.content)
        } }), u += 1;
      }
      n.push({
        role: "user",
        parts: a
      }), i = u - 1;
      continue;
    }
    if (s.role === "assistant") {
      const a = QL(s);
      if (a.length) {
        n.push(...a);
        continue;
      }
    }
    if (s.role === "assistant" && Array.isArray(s.tool_calls) && s.tool_calls.length) {
      n.push({
        role: "model",
        parts: [...s.content ? [Ur(s.content)] : [], ...s.tool_calls.map((a) => ({ functionCall: {
          name: a.function.name,
          args: Gg(a.function.arguments)
        } }))]
      });
      continue;
    }
    n.push({
      role: s.role === "assistant" ? "model" : "user",
      parts: VL(s.content)
    });
  }
  if (!n.length) return {
    history: [],
    latestMessage: Vg().parts
  };
  const o = n[n.length - 1];
  return o.role === "user" && o.parts?.length ? {
    history: n.slice(0, -1),
    latestMessage: o.parts
  } : {
    history: n,
    latestMessage: Vg().parts
  };
}
function nU(e, t) {
  typeof e.onStreamProgress == "function" && e.onStreamProgress({
    ...typeof t.text == "string" ? { text: t.text } : {},
    ...Array.isArray(t.thoughts) ? { thoughts: t.thoughts } : {}
  });
}
function Jg(e, t) {
  const n = String(t || ""), r = String(e || "");
  return n ? !r || n.startsWith(r) ? n : r.endsWith(n) ? r : `${r}${n}` : r;
}
var rU = class {
  constructor(e) {
    this.config = e, this.supportsSessionToolLoop = !0, this.activeChat = null, this.client = new BL({
      apiKey: e.apiKey,
      httpOptions: {
        baseUrl: String(e.baseUrl || "https://generativelanguage.googleapis.com/v1beta").replace(/\/$/, ""),
        timeout: Number(e.timeoutMs) || 900 * 1e3
      }
    });
  }
  createChat(e) {
    const t = tU(e.messages), n = Array.isArray(e.tools) ? e.tools : [], r = zL(e), o = {
      ...r ? { systemInstruction: r } : {},
      temperature: e.temperature,
      ...e.maxTokens ? { maxOutputTokens: e.maxTokens } : {}
    };
    e.reasoning?.enabled && (o.thinkingConfig = {
      includeThoughts: !0,
      thinkingLevel: YL(e.reasoning.effort)
    }), n.length && (o.tools = [{ functionDeclarations: n.map((s) => ({
      name: s.function.name,
      description: s.function.description,
      parameters: s.function.parameters
    })) }]), n.length && e.toolChoice && e.toolChoice !== "auto" && e.toolChoice !== "none" && (o.toolConfig = { functionCallingConfig: { mode: rf.ANY } });
    const i = {
      model: this.config.model,
      history: t.history,
      config: o
    };
    return {
      chat: this.client.chats.create(i),
      sendPayload: { message: t.latestMessage }
    };
  }
  async sendThroughChat(e, t, n) {
    let r, o, i, s = [], a = null;
    const u = { ...t }, f = typeof n.onStreamProgress == "function", d = vE(e).length;
    if (f) {
      const g = await e.sendMessageStream(u), y = /* @__PURE__ */ new Map();
      let v = "", w = [], _ = null;
      const S = [];
      for await (const T of g) {
        _ = T;
        const C = T?.candidates?.[0]?.content;
        C?.parts?.length && S.push(C), Kg(T).forEach((M, I) => {
          const D = `${M.label}:${I}`;
          y.set(D, Jg(y.get(D) || "", M.text));
        }), w = (T.functionCalls || []).map((M, I) => ({
          id: M.id || `google-tool-${I + 1}`,
          name: M.name || "",
          arguments: JSON.stringify(M.args || {})
        })).filter((M) => M.name), s = JL(s, w.length ? w : qg(T));
        const E = Hg(T);
        v = Jg(v, E), nU(n, {
          text: v,
          thoughts: Array.from(y.values()).filter(Boolean).map((M, I) => ({
            label: `思考块 ${I + 1}`,
            text: M
          }))
        });
      }
      r = _ || { functionCalls: w }, a = KL(S, v) || r?.candidates?.[0]?.content || null, o = Array.from(y.values()).filter(Boolean).map((T, C) => ({
        label: `思考块 ${C + 1}`,
        text: T
      })), i = v;
    } else
      r = await e.sendMessage(u), o = Kg(r), i = Hg(r);
    const h = qg(r), p = h.length ? h : s, m = eU(e, d);
    return {
      text: i,
      toolCalls: p,
      thoughts: o,
      finishReason: r.candidates?.[0]?.finishReason || "STOP",
      model: r.modelVersion || this.config.model,
      provider: "google",
      providerPayload: Vd(m) || jL(a) || ZL(r)
    };
  }
  async chat(e) {
    if (Array.isArray(e.toolResponses) && e.toolResponses.length) {
      if (!this.activeChat) throw new Error("google_chat_session_missing");
      return await this.sendThroughChat(this.activeChat, { message: WL(e.toolResponses) }, e);
    }
    const t = String(e.finalAnswerReminderText || "").trim();
    if (t) {
      if (!this.activeChat) throw new Error("google_chat_session_missing");
      return await this.sendThroughChat(this.activeChat, { message: [Ur(t)] }, e);
    }
    const n = this.createChat(e);
    return this.activeChat = n.chat, await this.sendThroughChat(this.activeChat, n.sendPayload, e);
  }
};
function ce(e, t, n, r, o) {
  if (r === "m") throw new TypeError("Private method is not writable");
  if (r === "a" && !o) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? e !== t || !o : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return r === "a" ? o.call(e, n) : o ? o.value = n : t.set(e, n), n;
}
function x(e, t, n, r) {
  if (n === "a" && !r) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}
var _E = function() {
  const { crypto: e } = globalThis;
  if (e?.randomUUID)
    return _E = e.randomUUID.bind(e), e.randomUUID();
  const t = new Uint8Array(1), n = e ? () => e.getRandomValues(t)[0] : () => Math.random() * 255 & 255;
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (r) => (+r ^ n() & 15 >> +r / 4).toString(16));
};
function wf(e) {
  return typeof e == "object" && e !== null && ("name" in e && e.name === "AbortError" || "message" in e && String(e.message).includes("FetchRequestCanceledException"));
}
var Ef = (e) => {
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
}, ie = class extends Error {
}, ft = class Tf extends ie {
  constructor(t, n, r, o) {
    super(`${Tf.makeMessage(t, n, r)}`), this.status = t, this.headers = o, this.requestID = o?.get("x-request-id"), this.error = n;
    const i = n;
    this.code = i?.code, this.param = i?.param, this.type = i?.type;
  }
  static makeMessage(t, n, r) {
    const o = n?.message ? typeof n.message == "string" ? n.message : JSON.stringify(n.message) : n ? JSON.stringify(n) : r;
    return t && o ? `${t} ${o}` : t ? `${t} status code (no body)` : o || "(no status code or body)";
  }
  static generate(t, n, r, o) {
    if (!t || !o) return new cu({
      message: r,
      cause: Ef(n)
    });
    const i = n?.error;
    return t === 400 ? new wE(t, i, r, o) : t === 401 ? new EE(t, i, r, o) : t === 403 ? new TE(t, i, r, o) : t === 404 ? new SE(t, i, r, o) : t === 409 ? new AE(t, i, r, o) : t === 422 ? new CE(t, i, r, o) : t === 429 ? new bE(t, i, r, o) : t >= 500 ? new IE(t, i, r, o) : new Tf(t, i, r, o);
  }
}, Ht = class extends ft {
  constructor({ message: e } = {}) {
    super(void 0, void 0, e || "Request was aborted.", void 0);
  }
}, cu = class extends ft {
  constructor({ message: e, cause: t }) {
    super(void 0, void 0, e || "Connection error.", void 0), t && (this.cause = t);
  }
}, Hd = class extends cu {
  constructor({ message: e } = {}) {
    super({ message: e ?? "Request timed out." });
  }
}, wE = class extends ft {
}, EE = class extends ft {
}, TE = class extends ft {
}, SE = class extends ft {
}, AE = class extends ft {
}, CE = class extends ft {
}, bE = class extends ft {
}, IE = class extends ft {
}, RE = class extends ie {
  constructor() {
    super("Could not parse response content as the length limit was reached");
  }
}, PE = class extends ie {
  constructor() {
    super("Could not parse response content as the request was rejected by the content filter");
  }
}, Li = class extends Error {
  constructor(e) {
    super(e);
  }
}, xE = class extends ft {
  constructor(e, t, n) {
    let r = "OAuth2 authentication error", o;
    if (t && typeof t == "object") {
      const i = t;
      o = i.error;
      const s = i.error_description;
      s && typeof s == "string" ? r = s : o && (r = o);
    }
    super(e, t, r, n), this.error_code = o;
  }
}, oU = class extends ie {
  constructor(e, t, n) {
    super(e), this.provider = t, this.cause = n;
  }
}, iU = /^[a-z][a-z0-9+.-]*:/i, sU = (e) => iU.test(e), St = (e) => (St = Array.isArray, St(e)), Wg = St;
function ME(e) {
  return typeof e != "object" ? {} : e ?? {};
}
function Yg(e) {
  if (!e) return !0;
  for (const t in e) return !1;
  return !0;
}
function aU(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function sc(e) {
  return e != null && typeof e == "object" && !Array.isArray(e);
}
var lU = (e, t) => {
  if (typeof t != "number" || !Number.isInteger(t)) throw new ie(`${e} must be an integer`);
  if (t < 0) throw new ie(`${e} must be a positive integer`);
  return t;
}, uU = (e) => {
  try {
    return JSON.parse(e);
  } catch {
    return;
  }
}, Vs = (e) => new Promise((t) => setTimeout(t, e)), vo = "6.34.0", cU = () => typeof window < "u" && typeof window.document < "u" && typeof navigator < "u";
function fU() {
  return typeof Deno < "u" && Deno.build != null ? "deno" : typeof EdgeRuntime < "u" ? "edge" : Object.prototype.toString.call(typeof globalThis.process < "u" ? globalThis.process : 0) === "[object process]" ? "node" : "unknown";
}
var dU = () => {
  const e = fU();
  if (e === "deno") return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": vo,
    "X-Stainless-OS": Xg(Deno.build.os),
    "X-Stainless-Arch": zg(Deno.build.arch),
    "X-Stainless-Runtime": "deno",
    "X-Stainless-Runtime-Version": typeof Deno.version == "string" ? Deno.version : Deno.version?.deno ?? "unknown"
  };
  if (typeof EdgeRuntime < "u") return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": vo,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": `other:${EdgeRuntime}`,
    "X-Stainless-Runtime": "edge",
    "X-Stainless-Runtime-Version": globalThis.process.version
  };
  if (e === "node") return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": vo,
    "X-Stainless-OS": Xg(globalThis.process.platform ?? "unknown"),
    "X-Stainless-Arch": zg(globalThis.process.arch ?? "unknown"),
    "X-Stainless-Runtime": "node",
    "X-Stainless-Runtime-Version": globalThis.process.version ?? "unknown"
  };
  const t = hU();
  return t ? {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": vo,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": `browser:${t.browser}`,
    "X-Stainless-Runtime-Version": t.version
  } : {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": vo,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": "unknown",
    "X-Stainless-Runtime-Version": "unknown"
  };
};
function hU() {
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
var zg = (e) => e === "x32" ? "x32" : e === "x86_64" || e === "x64" ? "x64" : e === "arm" ? "arm" : e === "aarch64" || e === "arm64" ? "arm64" : e ? `other:${e}` : "unknown", Xg = (e) => (e = e.toLowerCase(), e.includes("ios") ? "iOS" : e === "android" ? "Android" : e === "darwin" ? "MacOS" : e === "win32" ? "Windows" : e === "freebsd" ? "FreeBSD" : e === "openbsd" ? "OpenBSD" : e === "linux" ? "Linux" : e ? `Other:${e}` : "Unknown"), Qg, pU = () => Qg ?? (Qg = dU());
function NE() {
  if (typeof fetch < "u") return fetch;
  throw new Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new OpenAI({ fetch })` or polyfill the global, `globalThis.fetch = fetch`");
}
function kE(...e) {
  const t = globalThis.ReadableStream;
  if (typeof t > "u") throw new Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");
  return new t(...e);
}
function DE(e) {
  let t = Symbol.asyncIterator in e ? e[Symbol.asyncIterator]() : e[Symbol.iterator]();
  return kE({
    start() {
    },
    async pull(n) {
      const { done: r, value: o } = await t.next();
      r ? n.close() : n.enqueue(o);
    },
    async cancel() {
      await t.return?.();
    }
  });
}
function LE(e) {
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
async function Zg(e) {
  if (e === null || typeof e != "object") return;
  if (e[Symbol.asyncIterator]) {
    await e[Symbol.asyncIterator]().return?.();
    return;
  }
  const t = e.getReader(), n = t.cancel();
  t.releaseLock(), await n;
}
var mU = ({ headers: e, body: t }) => ({
  bodyHeaders: { "content-type": "application/json" },
  body: JSON.stringify(t)
}), UE = "RFC3986", $E = (e) => String(e), jg = {
  RFC1738: (e) => String(e).replace(/%20/g, "+"),
  RFC3986: $E
};
var Sf = (e, t) => (Sf = Object.hasOwn ?? Function.prototype.call.bind(Object.prototype.hasOwnProperty), Sf(e, t)), dn = /* @__PURE__ */ (() => {
  const e = [];
  for (let t = 0; t < 256; ++t) e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
  return e;
})(), ac = 1024, gU = (e, t, n, r, o) => {
  if (e.length === 0) return e;
  let i = e;
  if (typeof e == "symbol" ? i = Symbol.prototype.toString.call(e) : typeof e != "string" && (i = String(e)), n === "iso-8859-1") return escape(i).replace(/%u[0-9a-f]{4}/gi, function(a) {
    return "%26%23" + parseInt(a.slice(2), 16) + "%3B";
  });
  let s = "";
  for (let a = 0; a < i.length; a += ac) {
    const u = i.length >= ac ? i.slice(a, a + ac) : i, f = [];
    for (let d = 0; d < u.length; ++d) {
      let h = u.charCodeAt(d);
      if (h === 45 || h === 46 || h === 95 || h === 126 || h >= 48 && h <= 57 || h >= 65 && h <= 90 || h >= 97 && h <= 122 || o === "RFC1738" && (h === 40 || h === 41)) {
        f[f.length] = u.charAt(d);
        continue;
      }
      if (h < 128) {
        f[f.length] = dn[h];
        continue;
      }
      if (h < 2048) {
        f[f.length] = dn[192 | h >> 6] + dn[128 | h & 63];
        continue;
      }
      if (h < 55296 || h >= 57344) {
        f[f.length] = dn[224 | h >> 12] + dn[128 | h >> 6 & 63] + dn[128 | h & 63];
        continue;
      }
      d += 1, h = 65536 + ((h & 1023) << 10 | u.charCodeAt(d) & 1023), f[f.length] = dn[240 | h >> 18] + dn[128 | h >> 12 & 63] + dn[128 | h >> 6 & 63] + dn[128 | h & 63];
    }
    s += f.join("");
  }
  return s;
};
function yU(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}
function ey(e, t) {
  if (St(e)) {
    const n = [];
    for (let r = 0; r < e.length; r += 1) n.push(t(e[r]));
    return n;
  }
  return t(e);
}
var FE = {
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
}, OE = function(e, t) {
  Array.prototype.push.apply(e, St(t) ? t : [t]);
}, ty, Xe = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: gU,
  encodeValuesOnly: !1,
  format: UE,
  formatter: $E,
  indices: !1,
  serializeDate(e) {
    return (ty ?? (ty = Function.prototype.call.bind(Date.prototype.toISOString)))(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
};
function vU(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}
var lc = {};
function BE(e, t, n, r, o, i, s, a, u, f, d, h, p, m, g, y, v, w) {
  let _ = e, S = w, T = 0, C = !1;
  for (; (S = S.get(lc)) !== void 0 && !C; ) {
    const $ = S.get(e);
    if (T += 1, typeof $ < "u") {
      if ($ === T) throw new RangeError("Cyclic object value");
      C = !0;
    }
    typeof S.get(lc) > "u" && (T = 0);
  }
  if (typeof f == "function" ? _ = f(t, _) : _ instanceof Date ? _ = p?.(_) : n === "comma" && St(_) && (_ = ey(_, function($) {
    return $ instanceof Date ? p?.($) : $;
  })), _ === null) {
    if (i) return u && !y ? u(t, Xe.encoder, v, "key", m) : t;
    _ = "";
  }
  if (vU(_) || yU(_)) {
    if (u) {
      const $ = y ? t : u(t, Xe.encoder, v, "key", m);
      return [g?.($) + "=" + g?.(u(_, Xe.encoder, v, "value", m))];
    }
    return [g?.(t) + "=" + g?.(String(_))];
  }
  const E = [];
  if (typeof _ > "u") return E;
  let M;
  if (n === "comma" && St(_))
    y && u && (_ = ey(_, u)), M = [{ value: _.length > 0 ? _.join(",") || null : void 0 }];
  else if (St(f)) M = f;
  else {
    const $ = Object.keys(_);
    M = d ? $.sort(d) : $;
  }
  const I = a ? String(t).replace(/\./g, "%2E") : String(t), D = r && St(_) && _.length === 1 ? I + "[]" : I;
  if (o && St(_) && _.length === 0) return D + "[]";
  for (let $ = 0; $ < M.length; ++$) {
    const q = M[$], z = typeof q == "object" && typeof q.value < "u" ? q.value : _[q];
    if (s && z === null) continue;
    const J = h && a ? q.replace(/\./g, "%2E") : q, ne = St(_) ? typeof n == "function" ? n(D, J) : D : D + (h ? "." + J : "[" + J + "]");
    w.set(e, T);
    const H = /* @__PURE__ */ new WeakMap();
    H.set(lc, w), OE(E, BE(z, ne, n, r, o, i, s, a, n === "comma" && y && St(_) ? null : u, f, d, h, p, m, g, y, v, H));
  }
  return E;
}
function _U(e = Xe) {
  if (typeof e.allowEmptyArrays < "u" && typeof e.allowEmptyArrays != "boolean") throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof e.encodeDotInKeys < "u" && typeof e.encodeDotInKeys != "boolean") throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (e.encoder !== null && typeof e.encoder < "u" && typeof e.encoder != "function") throw new TypeError("Encoder has to be a function.");
  const t = e.charset || Xe.charset;
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1") throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  let n = UE;
  if (typeof e.format < "u") {
    if (!Sf(jg, e.format)) throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  const r = jg[n];
  let o = Xe.filter;
  (typeof e.filter == "function" || St(e.filter)) && (o = e.filter);
  let i;
  if (e.arrayFormat && e.arrayFormat in FE ? i = e.arrayFormat : "indices" in e ? i = e.indices ? "indices" : "repeat" : i = Xe.arrayFormat, "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean") throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  const s = typeof e.allowDots > "u" ? e.encodeDotInKeys ? !0 : Xe.allowDots : !!e.allowDots;
  return {
    addQueryPrefix: typeof e.addQueryPrefix == "boolean" ? e.addQueryPrefix : Xe.addQueryPrefix,
    allowDots: s,
    allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : Xe.allowEmptyArrays,
    arrayFormat: i,
    charset: t,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : Xe.charsetSentinel,
    commaRoundTrip: !!e.commaRoundTrip,
    delimiter: typeof e.delimiter > "u" ? Xe.delimiter : e.delimiter,
    encode: typeof e.encode == "boolean" ? e.encode : Xe.encode,
    encodeDotInKeys: typeof e.encodeDotInKeys == "boolean" ? e.encodeDotInKeys : Xe.encodeDotInKeys,
    encoder: typeof e.encoder == "function" ? e.encoder : Xe.encoder,
    encodeValuesOnly: typeof e.encodeValuesOnly == "boolean" ? e.encodeValuesOnly : Xe.encodeValuesOnly,
    filter: o,
    format: n,
    formatter: r,
    serializeDate: typeof e.serializeDate == "function" ? e.serializeDate : Xe.serializeDate,
    skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : Xe.skipNulls,
    sort: typeof e.sort == "function" ? e.sort : null,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : Xe.strictNullHandling
  };
}
function wU(e, t = {}) {
  let n = e;
  const r = _U(t);
  let o, i;
  typeof r.filter == "function" ? (i = r.filter, n = i("", n)) : St(r.filter) && (i = r.filter, o = i);
  const s = [];
  if (typeof n != "object" || n === null) return "";
  const a = FE[r.arrayFormat], u = a === "comma" && r.commaRoundTrip;
  o || (o = Object.keys(n)), r.sort && o.sort(r.sort);
  const f = /* @__PURE__ */ new WeakMap();
  for (let p = 0; p < o.length; ++p) {
    const m = o[p];
    r.skipNulls && n[m] === null || OE(s, BE(n[m], m, a, u, r.allowEmptyArrays, r.strictNullHandling, r.skipNulls, r.encodeDotInKeys, r.encode ? r.encoder : null, r.filter, r.sort, r.allowDots, r.serializeDate, r.format, r.formatter, r.encodeValuesOnly, r.charset, f));
  }
  const d = s.join(r.delimiter);
  let h = r.addQueryPrefix === !0 ? "?" : "";
  return r.charsetSentinel && (r.charset === "iso-8859-1" ? h += "utf8=%26%2310003%3B&" : h += "utf8=%E2%9C%93&"), d.length > 0 ? h + d : "";
}
function EU(e) {
  return wU(e, { arrayFormat: "brackets" });
}
function TU(e) {
  let t = 0;
  for (const o of e) t += o.length;
  const n = new Uint8Array(t);
  let r = 0;
  for (const o of e)
    n.set(o, r), r += o.length;
  return n;
}
var ny;
function qd(e) {
  let t;
  return (ny ?? (t = new globalThis.TextEncoder(), ny = t.encode.bind(t)))(e);
}
var ry;
function oy(e) {
  let t;
  return (ry ?? (t = new globalThis.TextDecoder(), ry = t.decode.bind(t)))(e);
}
var kt, Dt, fu = class {
  constructor() {
    kt.set(this, void 0), Dt.set(this, void 0), ce(this, kt, new Uint8Array(), "f"), ce(this, Dt, null, "f");
  }
  decode(e) {
    if (e == null) return [];
    const t = e instanceof ArrayBuffer ? new Uint8Array(e) : typeof e == "string" ? qd(e) : e;
    ce(this, kt, TU([x(this, kt, "f"), t]), "f");
    const n = [];
    let r;
    for (; (r = SU(x(this, kt, "f"), x(this, Dt, "f"))) != null; ) {
      if (r.carriage && x(this, Dt, "f") == null) {
        ce(this, Dt, r.index, "f");
        continue;
      }
      if (x(this, Dt, "f") != null && (r.index !== x(this, Dt, "f") + 1 || r.carriage)) {
        n.push(oy(x(this, kt, "f").subarray(0, x(this, Dt, "f") - 1))), ce(this, kt, x(this, kt, "f").subarray(x(this, Dt, "f")), "f"), ce(this, Dt, null, "f");
        continue;
      }
      const o = x(this, Dt, "f") !== null ? r.preceding - 1 : r.preceding, i = oy(x(this, kt, "f").subarray(0, o));
      n.push(i), ce(this, kt, x(this, kt, "f").subarray(r.index), "f"), ce(this, Dt, null, "f");
    }
    return n;
  }
  flush() {
    return x(this, kt, "f").length ? this.decode(`
`) : [];
  }
};
kt = /* @__PURE__ */ new WeakMap(), Dt = /* @__PURE__ */ new WeakMap();
fu.NEWLINE_CHARS = /* @__PURE__ */ new Set([`
`, "\r"]);
fu.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
function SU(e, t) {
  for (let o = t ?? 0; o < e.length; o++) {
    if (e[o] === 10) return {
      preceding: o,
      index: o + 1,
      carriage: !1
    };
    if (e[o] === 13) return {
      preceding: o,
      index: o + 1,
      carriage: !0
    };
  }
  return null;
}
function AU(e) {
  for (let r = 0; r < e.length - 1; r++) {
    if (e[r] === 10 && e[r + 1] === 10 || e[r] === 13 && e[r + 1] === 13) return r + 2;
    if (e[r] === 13 && e[r + 1] === 10 && r + 3 < e.length && e[r + 2] === 13 && e[r + 3] === 10) return r + 4;
  }
  return -1;
}
var Rl = {
  off: 0,
  error: 200,
  warn: 300,
  info: 400,
  debug: 500
}, iy = (e, t, n) => {
  if (e) {
    if (aU(Rl, e)) return e;
    it(n).warn(`${t} was set to ${JSON.stringify(e)}, expected one of ${JSON.stringify(Object.keys(Rl))}`);
  }
};
function Ui() {
}
function Ta(e, t, n) {
  return !t || Rl[e] > Rl[n] ? Ui : t[e].bind(t);
}
var CU = {
  error: Ui,
  warn: Ui,
  info: Ui,
  debug: Ui
}, sy = /* @__PURE__ */ new WeakMap();
function it(e) {
  const t = e.logger, n = e.logLevel ?? "off";
  if (!t) return CU;
  const r = sy.get(t);
  if (r && r[0] === n) return r[1];
  const o = {
    error: Ta("error", t, n),
    warn: Ta("warn", t, n),
    info: Ta("info", t, n),
    debug: Ta("debug", t, n)
  };
  return sy.set(t, [n, o]), o;
}
var Pr = (e) => (e.options && (e.options = { ...e.options }, delete e.options.headers), e.headers && (e.headers = Object.fromEntries((e.headers instanceof Headers ? [...e.headers] : Object.entries(e.headers)).map(([t, n]) => [t, t.toLowerCase() === "authorization" || t.toLowerCase() === "cookie" || t.toLowerCase() === "set-cookie" ? "***" : n]))), "retryOfRequestLogID" in e && (e.retryOfRequestLogID && (e.retryOf = e.retryOfRequestLogID), delete e.retryOfRequestLogID), e), Ai, As = class $i {
  constructor(t, n, r) {
    this.iterator = t, Ai.set(this, void 0), this.controller = n, ce(this, Ai, r, "f");
  }
  static fromSSEResponse(t, n, r, o) {
    let i = !1;
    const s = r ? it(r) : console;
    async function* a() {
      if (i) throw new ie("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      i = !0;
      let u = !1;
      try {
        for await (const f of bU(t, n))
          if (!u) {
            if (f.data.startsWith("[DONE]")) {
              u = !0;
              continue;
            }
            if (f.event === null || !f.event.startsWith("thread.")) {
              let d;
              try {
                d = JSON.parse(f.data);
              } catch (h) {
                throw s.error("Could not parse message into JSON:", f.data), s.error("From chunk:", f.raw), h;
              }
              if (d && d.error) throw new ft(void 0, d.error, void 0, t.headers);
              yield o ? {
                event: f.event,
                data: d
              } : d;
            } else {
              let d;
              try {
                d = JSON.parse(f.data);
              } catch (h) {
                throw console.error("Could not parse message into JSON:", f.data), console.error("From chunk:", f.raw), h;
              }
              if (f.event == "error") throw new ft(void 0, d.error, d.message, void 0);
              yield {
                event: f.event,
                data: d
              };
            }
          }
        u = !0;
      } catch (f) {
        if (wf(f)) return;
        throw f;
      } finally {
        u || n.abort();
      }
    }
    return new $i(a, n, r);
  }
  static fromReadableStream(t, n, r) {
    let o = !1;
    async function* i() {
      const a = new fu(), u = LE(t);
      for await (const f of u) for (const d of a.decode(f)) yield d;
      for (const f of a.flush()) yield f;
    }
    async function* s() {
      if (o) throw new ie("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      o = !0;
      let a = !1;
      try {
        for await (const u of i())
          a || u && (yield JSON.parse(u));
        a = !0;
      } catch (u) {
        if (wf(u)) return;
        throw u;
      } finally {
        a || n.abort();
      }
    }
    return new $i(s, n, r);
  }
  [(Ai = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    return this.iterator();
  }
  tee() {
    const t = [], n = [], r = this.iterator(), o = (i) => ({ next: () => {
      if (i.length === 0) {
        const s = r.next();
        t.push(s), n.push(s);
      }
      return i.shift();
    } });
    return [new $i(() => o(t), this.controller, x(this, Ai, "f")), new $i(() => o(n), this.controller, x(this, Ai, "f"))];
  }
  toReadableStream() {
    const t = this;
    let n;
    return kE({
      async start() {
        n = t[Symbol.asyncIterator]();
      },
      async pull(r) {
        try {
          const { value: o, done: i } = await n.next();
          if (i) return r.close();
          const s = qd(JSON.stringify(o) + `
`);
          r.enqueue(s);
        } catch (o) {
          r.error(o);
        }
      },
      async cancel() {
        await n.return?.();
      }
    });
  }
};
async function* bU(e, t) {
  if (!e.body)
    throw t.abort(), typeof globalThis.navigator < "u" && globalThis.navigator.product === "ReactNative" ? new ie("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api") : new ie("Attempted to iterate over a response with no body");
  const n = new RU(), r = new fu(), o = LE(e.body);
  for await (const i of IU(o)) for (const s of r.decode(i)) {
    const a = n.decode(s);
    a && (yield a);
  }
  for (const i of r.flush()) {
    const s = n.decode(i);
    s && (yield s);
  }
}
async function* IU(e) {
  let t = new Uint8Array();
  for await (const n of e) {
    if (n == null) continue;
    const r = n instanceof ArrayBuffer ? new Uint8Array(n) : typeof n == "string" ? qd(n) : n;
    let o = new Uint8Array(t.length + r.length);
    o.set(t), o.set(r, t.length), t = o;
    let i;
    for (; (i = AU(t)) !== -1; )
      yield t.slice(0, i), t = t.slice(i);
  }
  t.length > 0 && (yield t);
}
var RU = class {
  constructor() {
    this.event = null, this.data = [], this.chunks = [];
  }
  decode(e) {
    if (e.endsWith("\r") && (e = e.substring(0, e.length - 1)), !e) {
      if (!this.event && !this.data.length) return null;
      const o = {
        event: this.event,
        data: this.data.join(`
`),
        raw: this.chunks
      };
      return this.event = null, this.data = [], this.chunks = [], o;
    }
    if (this.chunks.push(e), e.startsWith(":")) return null;
    let [t, n, r] = PU(e, ":");
    return r.startsWith(" ") && (r = r.substring(1)), t === "event" ? this.event = r : t === "data" && this.data.push(r), null;
  }
};
function PU(e, t) {
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
async function GE(e, t) {
  const { response: n, requestLogID: r, retryOfRequestLogID: o, startTime: i } = t, s = await (async () => {
    if (t.options.stream)
      return it(e).debug("response", n.status, n.url, n.headers, n.body), t.options.__streamClass ? t.options.__streamClass.fromSSEResponse(n, t.controller, e, t.options.__synthesizeEventData) : As.fromSSEResponse(n, t.controller, e, t.options.__synthesizeEventData);
    if (n.status === 204) return null;
    if (t.options.__binaryResponse) return n;
    const a = n.headers.get("content-type")?.split(";")[0]?.trim();
    return a?.includes("application/json") || a?.endsWith("+json") ? n.headers.get("content-length") === "0" ? void 0 : VE(await n.json(), n) : await n.text();
  })();
  return it(e).debug(`[${r}] response parsed`, Pr({
    retryOfRequestLogID: o,
    url: n.url,
    status: n.status,
    body: s,
    durationMs: Date.now() - i
  })), s;
}
function VE(e, t) {
  return !e || typeof e != "object" || Array.isArray(e) ? e : Object.defineProperty(e, "_request_id", {
    value: t.headers.get("x-request-id"),
    enumerable: !1
  });
}
var Fi, HE = class qE extends Promise {
  constructor(t, n, r = GE) {
    super((o) => {
      o(null);
    }), this.responsePromise = n, this.parseResponse = r, Fi.set(this, void 0), ce(this, Fi, t, "f");
  }
  _thenUnwrap(t) {
    return new qE(x(this, Fi, "f"), this.responsePromise, async (n, r) => VE(t(await this.parseResponse(n, r), r), r.response));
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
    return this.parsedPromise || (this.parsedPromise = this.responsePromise.then((t) => this.parseResponse(x(this, Fi, "f"), t))), this.parsedPromise;
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
Fi = /* @__PURE__ */ new WeakMap();
var Sa, Kd = class {
  constructor(e, t, n, r) {
    Sa.set(this, void 0), ce(this, Sa, e, "f"), this.options = r, this.response = t, this.body = n;
  }
  hasNextPage() {
    return this.getPaginatedItems().length ? this.nextPageRequestOptions() != null : !1;
  }
  async getNextPage() {
    const e = this.nextPageRequestOptions();
    if (!e) throw new ie("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
    return await x(this, Sa, "f").requestAPIList(this.constructor, e);
  }
  async *iterPages() {
    let e = this;
    for (yield e; e.hasNextPage(); )
      e = await e.getNextPage(), yield e;
  }
  async *[(Sa = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    for await (const e of this.iterPages()) for (const t of e.getPaginatedItems()) yield t;
  }
}, xU = class extends HE {
  constructor(e, t, n) {
    super(e, t, async (r, o) => new n(r, o.response, await GE(r, o), o.options));
  }
  async *[Symbol.asyncIterator]() {
    const e = await this;
    for await (const t of e) yield t;
  }
}, du = class extends Kd {
  constructor(e, t, n, r) {
    super(e, t, n, r), this.data = n.data || [], this.object = n.object;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  nextPageRequestOptions() {
    return null;
  }
}, Oe = class extends Kd {
  constructor(e, t, n, r) {
    super(e, t, n, r), this.data = n.data || [], this.has_more = n.has_more || !1;
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
        ...ME(this.options.query),
        after: t
      }
    } : null;
  }
}, Cs = class extends Kd {
  constructor(e, t, n, r) {
    super(e, t, n, r), this.data = n.data || [], this.has_more = n.has_more || !1, this.last_id = n.last_id || "";
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
        ...ME(this.options.query),
        after: e
      }
    } : null;
  }
}, MU = {
  jwt: "urn:ietf:params:oauth:token-type:jwt",
  id: "urn:ietf:params:oauth:token-type:id_token"
}, NU = "urn:ietf:params:oauth:grant-type:token-exchange", kU = class {
  constructor(e, t) {
    this.cachedToken = null, this.refreshPromise = null, this.tokenExchangeUrl = "https://auth.openai.com/oauth/token", this.config = e, this.fetch = t ?? NE();
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
        grant_type: NU,
        client_id: this.config.clientId,
        subject_token: e,
        subject_token_type: MU[this.config.provider.tokenType],
        identity_provider_id: this.config.identityProviderId,
        service_account_id: this.config.serviceAccountId
      })
    });
    if (!t.ok) {
      const i = await t.text();
      let s;
      try {
        s = JSON.parse(i);
      } catch {
      }
      throw t.status === 400 || t.status === 401 || t.status === 403 ? new xE(t.status, s, t.headers) : ft.generate(t.status, s, `Token exchange failed with status ${t.status}`, t.headers);
    }
    const n = await t.json(), r = n.expires_in || 3600, o = Date.now() + r * 1e3;
    return this.cachedToken = {
      token: n.access_token,
      expiresAt: o
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
}, KE = () => {
  if (typeof File > "u") {
    const { process: e } = globalThis, t = typeof e?.versions?.node == "string" && parseInt(e.versions.node.split(".")) < 20;
    throw new Error("`File` is not defined as a global, which is required for file uploads." + (t ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`." : ""));
  }
};
function rs(e, t, n) {
  return KE(), new File(e, t ?? "unknown_file", n);
}
function Ka(e) {
  return (typeof e == "object" && e !== null && ("name" in e && e.name && String(e.name) || "url" in e && e.url && String(e.url) || "filename" in e && e.filename && String(e.filename) || "path" in e && e.path && String(e.path)) || "").split(/[\\/]/).pop() || void 0;
}
var Jd = (e) => e != null && typeof e == "object" && typeof e[Symbol.asyncIterator] == "function", hu = async (e, t) => Af(e.body) ? {
  ...e,
  body: await JE(e.body, t)
} : e, wn = async (e, t) => ({
  ...e,
  body: await JE(e.body, t)
}), ay = /* @__PURE__ */ new WeakMap();
function DU(e) {
  const t = typeof e == "function" ? e : e.fetch, n = ay.get(t);
  if (n) return n;
  const r = (async () => {
    try {
      const o = "Response" in t ? t.Response : (await t("data:,")).constructor, i = new FormData();
      return i.toString() !== await new o(i).text();
    } catch {
      return !0;
    }
  })();
  return ay.set(t, r), r;
}
var JE = async (e, t) => {
  if (!await DU(t)) throw new TypeError("The provided fetch function does not support file uploads with the current global FormData class.");
  const n = new FormData();
  return await Promise.all(Object.entries(e || {}).map(([r, o]) => Cf(n, r, o))), n;
}, WE = (e) => e instanceof Blob && "name" in e, LU = (e) => typeof e == "object" && e !== null && (e instanceof Response || Jd(e) || WE(e)), Af = (e) => {
  if (LU(e)) return !0;
  if (Array.isArray(e)) return e.some(Af);
  if (e && typeof e == "object") {
    for (const t in e) if (Af(e[t])) return !0;
  }
  return !1;
}, Cf = async (e, t, n) => {
  if (n !== void 0) {
    if (n == null) throw new TypeError(`Received null for "${t}"; to pass null in FormData, you must use the string 'null'`);
    if (typeof n == "string" || typeof n == "number" || typeof n == "boolean") e.append(t, String(n));
    else if (n instanceof Response) e.append(t, rs([await n.blob()], Ka(n)));
    else if (Jd(n)) e.append(t, rs([await new Response(DE(n)).blob()], Ka(n)));
    else if (WE(n)) e.append(t, n, Ka(n));
    else if (Array.isArray(n)) await Promise.all(n.map((r) => Cf(e, t + "[]", r)));
    else if (typeof n == "object") await Promise.all(Object.entries(n).map(([r, o]) => Cf(e, `${t}[${r}]`, o)));
    else throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${n} instead`);
  }
}, YE = (e) => e != null && typeof e == "object" && typeof e.size == "number" && typeof e.type == "string" && typeof e.text == "function" && typeof e.slice == "function" && typeof e.arrayBuffer == "function", UU = (e) => e != null && typeof e == "object" && typeof e.name == "string" && typeof e.lastModified == "number" && YE(e), $U = (e) => e != null && typeof e == "object" && typeof e.url == "string" && typeof e.blob == "function";
async function FU(e, t, n) {
  if (KE(), e = await e, UU(e))
    return e instanceof File ? e : rs([await e.arrayBuffer()], e.name);
  if ($U(e)) {
    const o = await e.blob();
    return t || (t = new URL(e.url).pathname.split(/[\\/]/).pop()), rs(await bf(o), t, n);
  }
  const r = await bf(e);
  if (t || (t = Ka(e)), !n?.type) {
    const o = r.find((i) => typeof i == "object" && "type" in i && i.type);
    typeof o == "string" && (n = {
      ...n,
      type: o
    });
  }
  return rs(r, t, n);
}
async function bf(e) {
  let t = [];
  if (typeof e == "string" || ArrayBuffer.isView(e) || e instanceof ArrayBuffer) t.push(e);
  else if (YE(e)) t.push(e instanceof Blob ? e : await e.arrayBuffer());
  else if (Jd(e)) for await (const n of e) t.push(...await bf(n));
  else {
    const n = e?.constructor?.name;
    throw new Error(`Unexpected data type: ${typeof e}${n ? `; constructor: ${n}` : ""}${OU(e)}`);
  }
  return t;
}
function OU(e) {
  return typeof e != "object" || e === null ? "" : `; props: [${Object.getOwnPropertyNames(e).map((t) => `"${t}"`).join(", ")}]`;
}
var re = class {
  constructor(e) {
    this._client = e;
  }
};
function zE(e) {
  return e.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent);
}
var ly = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.create(null)), BU = (e = zE) => function(n, ...r) {
  if (n.length === 1) return n[0];
  let o = !1;
  const i = [], s = n.reduce((d, h, p) => {
    /[?#]/.test(h) && (o = !0);
    const m = r[p];
    let g = (o ? encodeURIComponent : e)("" + m);
    return p !== r.length && (m == null || typeof m == "object" && m.toString === Object.getPrototypeOf(Object.getPrototypeOf(m.hasOwnProperty ?? ly) ?? ly)?.toString) && (g = m + "", i.push({
      start: d.length + h.length,
      length: g.length,
      error: `Value of type ${Object.prototype.toString.call(m).slice(8, -1)} is not a valid path parameter`
    })), d + h + (p === r.length ? "" : g);
  }, ""), a = s.split(/[?#]/, 1)[0], u = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi;
  let f;
  for (; (f = u.exec(a)) !== null; ) i.push({
    start: f.index,
    length: f[0].length,
    error: `Value "${f[0]}" can't be safely passed as a path parameter`
  });
  if (i.sort((d, h) => d.start - h.start), i.length > 0) {
    let d = 0;
    const h = i.reduce((p, m) => {
      const g = " ".repeat(m.start - d), y = "^".repeat(m.length);
      return d = m.start + m.length, p + g + y;
    }, "");
    throw new ie(`Path parameters result in path with invalid segments:
${i.map((p) => p.error).join(`
`)}
${s}
${h}`);
  }
  return s;
}, F = /* @__PURE__ */ BU(zE), XE = class extends re {
  list(e, t = {}, n) {
    return this._client.getAPIList(F`/chat/completions/${e}/messages`, Oe, {
      query: t,
      ...n
    });
  }
};
function Pl(e) {
  return e !== void 0 && "function" in e && e.function !== void 0;
}
function Wd(e) {
  return e?.$brand === "auto-parseable-response-format";
}
function Hs(e) {
  return e?.$brand === "auto-parseable-tool";
}
function GU(e, t) {
  return !t || !QE(t) ? {
    ...e,
    choices: e.choices.map((n) => (ZE(n.message.tool_calls), {
      ...n,
      message: {
        ...n.message,
        parsed: null,
        ...n.message.tool_calls ? { tool_calls: n.message.tool_calls } : void 0
      }
    }))
  } : Yd(e, t);
}
function Yd(e, t) {
  const n = e.choices.map((r) => {
    if (r.finish_reason === "length") throw new RE();
    if (r.finish_reason === "content_filter") throw new PE();
    return ZE(r.message.tool_calls), {
      ...r,
      message: {
        ...r.message,
        ...r.message.tool_calls ? { tool_calls: r.message.tool_calls?.map((o) => HU(t, o)) ?? void 0 } : void 0,
        parsed: r.message.content && !r.message.refusal ? VU(t, r.message.content) : null
      }
    };
  });
  return {
    ...e,
    choices: n
  };
}
function VU(e, t) {
  return e.response_format?.type !== "json_schema" ? null : e.response_format?.type === "json_schema" ? "$parseRaw" in e.response_format ? e.response_format.$parseRaw(t) : JSON.parse(t) : null;
}
function HU(e, t) {
  const n = e.tools?.find((r) => Pl(r) && r.function?.name === t.function.name);
  return {
    ...t,
    function: {
      ...t.function,
      parsed_arguments: Hs(n) ? n.$parseRaw(t.function.arguments) : n?.function.strict ? JSON.parse(t.function.arguments) : null
    }
  };
}
function qU(e, t) {
  if (!e || !("tools" in e) || !e.tools) return !1;
  const n = e.tools?.find((r) => Pl(r) && r.function?.name === t.function.name);
  return Pl(n) && (Hs(n) || n?.function.strict || !1);
}
function QE(e) {
  return Wd(e.response_format) ? !0 : e.tools?.some((t) => Hs(t) || t.type === "function" && t.function.strict === !0) ?? !1;
}
function ZE(e) {
  for (const t of e || []) if (t.type !== "function") throw new ie(`Currently only \`function\` tool calls are supported; Received \`${t.type}\``);
}
function KU(e) {
  for (const t of e ?? []) {
    if (t.type !== "function") throw new ie(`Currently only \`function\` tool types support auto-parsing; Received \`${t.type}\``);
    if (t.function.strict !== !0) throw new ie(`The \`${t.function.name}\` tool is not marked with \`strict: true\`. Only strict function tools can be auto-parsed`);
  }
}
var xl = (e) => e?.role === "assistant", jE = (e) => e?.role === "tool", If, Ja, Wa, Oi, Bi, Ya, Gi, Dn, Vi, Ml, Nl, _o, eT, zd = class {
  constructor() {
    If.add(this), this.controller = new AbortController(), Ja.set(this, void 0), Wa.set(this, () => {
    }), Oi.set(this, () => {
    }), Bi.set(this, void 0), Ya.set(this, () => {
    }), Gi.set(this, () => {
    }), Dn.set(this, {}), Vi.set(this, !1), Ml.set(this, !1), Nl.set(this, !1), _o.set(this, !1), ce(this, Ja, new Promise((e, t) => {
      ce(this, Wa, e, "f"), ce(this, Oi, t, "f");
    }), "f"), ce(this, Bi, new Promise((e, t) => {
      ce(this, Ya, e, "f"), ce(this, Gi, t, "f");
    }), "f"), x(this, Ja, "f").catch(() => {
    }), x(this, Bi, "f").catch(() => {
    });
  }
  _run(e) {
    setTimeout(() => {
      e().then(() => {
        this._emitFinal(), this._emit("end");
      }, x(this, If, "m", eT).bind(this));
    }, 0);
  }
  _connected() {
    this.ended || (x(this, Wa, "f").call(this), this._emit("connect"));
  }
  get ended() {
    return x(this, Vi, "f");
  }
  get errored() {
    return x(this, Ml, "f");
  }
  get aborted() {
    return x(this, Nl, "f");
  }
  abort() {
    this.controller.abort();
  }
  on(e, t) {
    return (x(this, Dn, "f")[e] || (x(this, Dn, "f")[e] = [])).push({ listener: t }), this;
  }
  off(e, t) {
    const n = x(this, Dn, "f")[e];
    if (!n) return this;
    const r = n.findIndex((o) => o.listener === t);
    return r >= 0 && n.splice(r, 1), this;
  }
  once(e, t) {
    return (x(this, Dn, "f")[e] || (x(this, Dn, "f")[e] = [])).push({
      listener: t,
      once: !0
    }), this;
  }
  emitted(e) {
    return new Promise((t, n) => {
      ce(this, _o, !0, "f"), e !== "error" && this.once("error", n), this.once(e, t);
    });
  }
  async done() {
    ce(this, _o, !0, "f"), await x(this, Bi, "f");
  }
  _emit(e, ...t) {
    if (x(this, Vi, "f")) return;
    e === "end" && (ce(this, Vi, !0, "f"), x(this, Ya, "f").call(this));
    const n = x(this, Dn, "f")[e];
    if (n && (x(this, Dn, "f")[e] = n.filter((r) => !r.once), n.forEach(({ listener: r }) => r(...t))), e === "abort") {
      const r = t[0];
      !x(this, _o, "f") && !n?.length && Promise.reject(r), x(this, Oi, "f").call(this, r), x(this, Gi, "f").call(this, r), this._emit("end");
      return;
    }
    if (e === "error") {
      const r = t[0];
      !x(this, _o, "f") && !n?.length && Promise.reject(r), x(this, Oi, "f").call(this, r), x(this, Gi, "f").call(this, r), this._emit("end");
    }
  }
  _emitFinal() {
  }
};
Ja = /* @__PURE__ */ new WeakMap(), Wa = /* @__PURE__ */ new WeakMap(), Oi = /* @__PURE__ */ new WeakMap(), Bi = /* @__PURE__ */ new WeakMap(), Ya = /* @__PURE__ */ new WeakMap(), Gi = /* @__PURE__ */ new WeakMap(), Dn = /* @__PURE__ */ new WeakMap(), Vi = /* @__PURE__ */ new WeakMap(), Ml = /* @__PURE__ */ new WeakMap(), Nl = /* @__PURE__ */ new WeakMap(), _o = /* @__PURE__ */ new WeakMap(), If = /* @__PURE__ */ new WeakSet(), eT = function(t) {
  if (ce(this, Ml, !0, "f"), t instanceof Error && t.name === "AbortError" && (t = new Ht()), t instanceof Ht)
    return ce(this, Nl, !0, "f"), this._emit("abort", t);
  if (t instanceof ie) return this._emit("error", t);
  if (t instanceof Error) {
    const n = new ie(t.message);
    return n.cause = t, this._emit("error", n);
  }
  return this._emit("error", new ie(String(t)));
};
function JU(e) {
  return typeof e.parse == "function";
}
var mt, Rf, kl, Pf, xf, Mf, tT, nT, WU = 10, rT = class extends zd {
  constructor() {
    super(...arguments), mt.add(this), this._chatCompletions = [], this.messages = [];
  }
  _addChatCompletion(e) {
    this._chatCompletions.push(e), this._emit("chatCompletion", e);
    const t = e.choices[0]?.message;
    return t && this._addMessage(t), e;
  }
  _addMessage(e, t = !0) {
    if ("content" in e || (e.content = null), this.messages.push(e), t) {
      if (this._emit("message", e), jE(e) && e.content) this._emit("functionToolCallResult", e.content);
      else if (xl(e) && e.tool_calls)
        for (const n of e.tool_calls) n.type === "function" && this._emit("functionToolCall", n.function);
    }
  }
  async finalChatCompletion() {
    await this.done();
    const e = this._chatCompletions[this._chatCompletions.length - 1];
    if (!e) throw new ie("stream ended without producing a ChatCompletion");
    return e;
  }
  async finalContent() {
    return await this.done(), x(this, mt, "m", Rf).call(this);
  }
  async finalMessage() {
    return await this.done(), x(this, mt, "m", kl).call(this);
  }
  async finalFunctionToolCall() {
    return await this.done(), x(this, mt, "m", Pf).call(this);
  }
  async finalFunctionToolCallResult() {
    return await this.done(), x(this, mt, "m", xf).call(this);
  }
  async totalUsage() {
    return await this.done(), x(this, mt, "m", Mf).call(this);
  }
  allChatCompletions() {
    return [...this._chatCompletions];
  }
  _emitFinal() {
    const e = this._chatCompletions[this._chatCompletions.length - 1];
    e && this._emit("finalChatCompletion", e);
    const t = x(this, mt, "m", kl).call(this);
    t && this._emit("finalMessage", t);
    const n = x(this, mt, "m", Rf).call(this);
    n && this._emit("finalContent", n);
    const r = x(this, mt, "m", Pf).call(this);
    r && this._emit("finalFunctionToolCall", r);
    const o = x(this, mt, "m", xf).call(this);
    o != null && this._emit("finalFunctionToolCallResult", o), this._chatCompletions.some((i) => i.usage) && this._emit("totalUsage", x(this, mt, "m", Mf).call(this));
  }
  async _createChatCompletion(e, t, n) {
    const r = n?.signal;
    r && (r.aborted && this.controller.abort(), r.addEventListener("abort", () => this.controller.abort())), x(this, mt, "m", tT).call(this, t);
    const o = await e.chat.completions.create({
      ...t,
      stream: !1
    }, {
      ...n,
      signal: this.controller.signal
    });
    return this._connected(), this._addChatCompletion(Yd(o, t));
  }
  async _runChatCompletion(e, t, n) {
    for (const r of t.messages) this._addMessage(r, !1);
    return await this._createChatCompletion(e, t, n);
  }
  async _runTools(e, t, n) {
    const r = "tool", { tool_choice: o = "auto", stream: i, ...s } = t, a = typeof o != "string" && o.type === "function" && o?.function?.name, { maxChatCompletions: u = WU } = n || {}, f = t.tools.map((p) => {
      if (Hs(p)) {
        if (!p.$callback) throw new ie("Tool given to `.runTools()` that does not have an associated function");
        return {
          type: "function",
          function: {
            function: p.$callback,
            name: p.function.name,
            description: p.function.description || "",
            parameters: p.function.parameters,
            parse: p.$parseRaw,
            strict: !0
          }
        };
      }
      return p;
    }), d = {};
    for (const p of f) p.type === "function" && (d[p.function.name || p.function.function.name] = p.function);
    const h = "tools" in t ? f.map((p) => p.type === "function" ? {
      type: "function",
      function: {
        name: p.function.name || p.function.function.name,
        parameters: p.function.parameters,
        description: p.function.description,
        strict: p.function.strict
      }
    } : p) : void 0;
    for (const p of t.messages) this._addMessage(p, !1);
    for (let p = 0; p < u; ++p) {
      const m = (await this._createChatCompletion(e, {
        ...s,
        tool_choice: o,
        tools: h,
        messages: [...this.messages]
      }, n)).choices[0]?.message;
      if (!m) throw new ie("missing message in ChatCompletion response");
      if (!m.tool_calls?.length) return;
      for (const g of m.tool_calls) {
        if (g.type !== "function") continue;
        const y = g.id, { name: v, arguments: w } = g.function, _ = d[v];
        if (_) {
          if (a && a !== v) {
            const E = `Invalid tool_call: ${JSON.stringify(v)}. ${JSON.stringify(a)} requested. Please try again`;
            this._addMessage({
              role: r,
              tool_call_id: y,
              content: E
            });
            continue;
          }
        } else {
          const E = `Invalid tool_call: ${JSON.stringify(v)}. Available options are: ${Object.keys(d).map((M) => JSON.stringify(M)).join(", ")}. Please try again`;
          this._addMessage({
            role: r,
            tool_call_id: y,
            content: E
          });
          continue;
        }
        let S;
        try {
          S = JU(_) ? await _.parse(w) : w;
        } catch (E) {
          const M = E instanceof Error ? E.message : String(E);
          this._addMessage({
            role: r,
            tool_call_id: y,
            content: M
          });
          continue;
        }
        const T = await _.function(S, this), C = x(this, mt, "m", nT).call(this, T);
        if (this._addMessage({
          role: r,
          tool_call_id: y,
          content: C
        }), a) return;
      }
    }
  }
};
mt = /* @__PURE__ */ new WeakSet(), Rf = function() {
  return x(this, mt, "m", kl).call(this).content ?? null;
}, kl = function() {
  let t = this.messages.length;
  for (; t-- > 0; ) {
    const n = this.messages[t];
    if (xl(n)) return {
      ...n,
      content: n.content ?? null,
      refusal: n.refusal ?? null
    };
  }
  throw new ie("stream ended without producing a ChatCompletionMessage with role=assistant");
}, Pf = function() {
  for (let t = this.messages.length - 1; t >= 0; t--) {
    const n = this.messages[t];
    if (xl(n) && n?.tool_calls?.length) return n.tool_calls.filter((r) => r.type === "function").at(-1)?.function;
  }
}, xf = function() {
  for (let t = this.messages.length - 1; t >= 0; t--) {
    const n = this.messages[t];
    if (jE(n) && n.content != null && typeof n.content == "string" && this.messages.some((r) => r.role === "assistant" && r.tool_calls?.some((o) => o.type === "function" && o.id === n.tool_call_id))) return n.content;
  }
}, Mf = function() {
  const t = {
    completion_tokens: 0,
    prompt_tokens: 0,
    total_tokens: 0
  };
  for (const { usage: n } of this._chatCompletions) n && (t.completion_tokens += n.completion_tokens, t.prompt_tokens += n.prompt_tokens, t.total_tokens += n.total_tokens);
  return t;
}, tT = function(t) {
  if (t.n != null && t.n > 1) throw new ie("ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.");
}, nT = function(t) {
  return typeof t == "string" ? t : t === void 0 ? "undefined" : JSON.stringify(t);
};
var YU = class oT extends rT {
  static runTools(t, n, r) {
    const o = new oT(), i = {
      ...r,
      headers: {
        ...r?.headers,
        "X-Stainless-Helper-Method": "runTools"
      }
    };
    return o._run(() => o._runTools(t, n, i)), o;
  }
  _addMessage(t, n = !0) {
    super._addMessage(t, n), xl(t) && t.content && this._emit("content", t.content);
  }
}, zU = 1, iT = 2, sT = 4, aT = 8, XU = 16, QU = 32, ZU = 64, lT = 128, uT = 256, jU = lT | uT, e$ = 496, uy = iT | 497, cy = sT | aT, et = {
  STR: zU,
  NUM: iT,
  ARR: sT,
  OBJ: aT,
  NULL: XU,
  BOOL: QU,
  NAN: ZU,
  INFINITY: lT,
  MINUS_INFINITY: uT,
  INF: jU,
  SPECIAL: e$,
  ATOM: uy,
  COLLECTION: cy,
  ALL: uy | cy
}, t$ = class extends Error {
}, n$ = class extends Error {
};
function r$(e, t = et.ALL) {
  if (typeof e != "string") throw new TypeError(`expecting str, got ${typeof e}`);
  if (!e.trim()) throw new Error(`${e} is empty`);
  return o$(e.trim(), t);
}
var o$ = (e, t) => {
  const n = e.length;
  let r = 0;
  const o = (p) => {
    throw new t$(`${p} at position ${r}`);
  }, i = (p) => {
    throw new n$(`${p} at position ${r}`);
  }, s = () => (h(), r >= n && o("Unexpected end of input"), e[r] === '"' ? a() : e[r] === "{" ? u() : e[r] === "[" ? f() : e.substring(r, r + 4) === "null" || et.NULL & t && n - r < 4 && "null".startsWith(e.substring(r)) ? (r += 4, null) : e.substring(r, r + 4) === "true" || et.BOOL & t && n - r < 4 && "true".startsWith(e.substring(r)) ? (r += 4, !0) : e.substring(r, r + 5) === "false" || et.BOOL & t && n - r < 5 && "false".startsWith(e.substring(r)) ? (r += 5, !1) : e.substring(r, r + 8) === "Infinity" || et.INFINITY & t && n - r < 8 && "Infinity".startsWith(e.substring(r)) ? (r += 8, 1 / 0) : e.substring(r, r + 9) === "-Infinity" || et.MINUS_INFINITY & t && 1 < n - r && n - r < 9 && "-Infinity".startsWith(e.substring(r)) ? (r += 9, -1 / 0) : e.substring(r, r + 3) === "NaN" || et.NAN & t && n - r < 3 && "NaN".startsWith(e.substring(r)) ? (r += 3, NaN) : d()), a = () => {
    const p = r;
    let m = !1;
    for (r++; r < n && (e[r] !== '"' || m && e[r - 1] === "\\"); )
      m = e[r] === "\\" ? !m : !1, r++;
    if (e.charAt(r) == '"') try {
      return JSON.parse(e.substring(p, ++r - Number(m)));
    } catch (g) {
      i(String(g));
    }
    else if (et.STR & t) try {
      return JSON.parse(e.substring(p, r - Number(m)) + '"');
    } catch {
      return JSON.parse(e.substring(p, e.lastIndexOf("\\")) + '"');
    }
    o("Unterminated string literal");
  }, u = () => {
    r++, h();
    const p = {};
    try {
      for (; e[r] !== "}"; ) {
        if (h(), r >= n && et.OBJ & t) return p;
        const m = a();
        h(), r++;
        try {
          const g = s();
          Object.defineProperty(p, m, {
            value: g,
            writable: !0,
            enumerable: !0,
            configurable: !0
          });
        } catch (g) {
          if (et.OBJ & t) return p;
          throw g;
        }
        h(), e[r] === "," && r++;
      }
    } catch {
      if (et.OBJ & t) return p;
      o("Expected '}' at end of object");
    }
    return r++, p;
  }, f = () => {
    r++;
    const p = [];
    try {
      for (; e[r] !== "]"; )
        p.push(s()), h(), e[r] === "," && r++;
    } catch {
      if (et.ARR & t) return p;
      o("Expected ']' at end of array");
    }
    return r++, p;
  }, d = () => {
    if (r === 0) {
      e === "-" && et.NUM & t && o("Not sure what '-' is");
      try {
        return JSON.parse(e);
      } catch (m) {
        if (et.NUM & t) try {
          return e[e.length - 1] === "." ? JSON.parse(e.substring(0, e.lastIndexOf("."))) : JSON.parse(e.substring(0, e.lastIndexOf("e")));
        } catch {
        }
        i(String(m));
      }
    }
    const p = r;
    for (e[r] === "-" && r++; e[r] && !",]}".includes(e[r]); ) r++;
    r == n && !(et.NUM & t) && o("Unterminated number literal");
    try {
      return JSON.parse(e.substring(p, r));
    } catch {
      e.substring(p, r) === "-" && et.NUM & t && o("Not sure what '-' is");
      try {
        return JSON.parse(e.substring(p, e.lastIndexOf("e")));
      } catch (g) {
        i(String(g));
      }
    }
  }, h = () => {
    for (; r < n && ` 
\r	`.includes(e[r]); ) r++;
  };
  return s();
}, fy = (e) => r$(e, et.ALL ^ et.NUM), We, kn, co, jn, uc, Aa, cc, fc, dc, Ca, hc, dy, cT = class Nf extends rT {
  constructor(t) {
    super(), We.add(this), kn.set(this, void 0), co.set(this, void 0), jn.set(this, void 0), ce(this, kn, t, "f"), ce(this, co, [], "f");
  }
  get currentChatCompletionSnapshot() {
    return x(this, jn, "f");
  }
  static fromReadableStream(t) {
    const n = new Nf(null);
    return n._run(() => n._fromReadableStream(t)), n;
  }
  static createChatCompletion(t, n, r) {
    const o = new Nf(n);
    return o._run(() => o._runChatCompletion(t, {
      ...n,
      stream: !0
    }, {
      ...r,
      headers: {
        ...r?.headers,
        "X-Stainless-Helper-Method": "stream"
      }
    })), o;
  }
  async _createChatCompletion(t, n, r) {
    super._createChatCompletion;
    const o = r?.signal;
    o && (o.aborted && this.controller.abort(), o.addEventListener("abort", () => this.controller.abort())), x(this, We, "m", uc).call(this);
    const i = await t.chat.completions.create({
      ...n,
      stream: !0
    }, {
      ...r,
      signal: this.controller.signal
    });
    this._connected();
    for await (const s of i) x(this, We, "m", cc).call(this, s);
    if (i.controller.signal?.aborted) throw new Ht();
    return this._addChatCompletion(x(this, We, "m", Ca).call(this));
  }
  async _fromReadableStream(t, n) {
    const r = n?.signal;
    r && (r.aborted && this.controller.abort(), r.addEventListener("abort", () => this.controller.abort())), x(this, We, "m", uc).call(this), this._connected();
    const o = As.fromReadableStream(t, this.controller);
    let i;
    for await (const s of o)
      i && i !== s.id && this._addChatCompletion(x(this, We, "m", Ca).call(this)), x(this, We, "m", cc).call(this, s), i = s.id;
    if (o.controller.signal?.aborted) throw new Ht();
    return this._addChatCompletion(x(this, We, "m", Ca).call(this));
  }
  [(kn = /* @__PURE__ */ new WeakMap(), co = /* @__PURE__ */ new WeakMap(), jn = /* @__PURE__ */ new WeakMap(), We = /* @__PURE__ */ new WeakSet(), uc = function() {
    this.ended || ce(this, jn, void 0, "f");
  }, Aa = function(n) {
    let r = x(this, co, "f")[n.index];
    return r || (r = {
      content_done: !1,
      refusal_done: !1,
      logprobs_content_done: !1,
      logprobs_refusal_done: !1,
      done_tool_calls: /* @__PURE__ */ new Set(),
      current_tool_call_index: null
    }, x(this, co, "f")[n.index] = r, r);
  }, cc = function(n) {
    if (this.ended) return;
    const r = x(this, We, "m", dy).call(this, n);
    this._emit("chunk", n, r);
    for (const o of n.choices) {
      const i = r.choices[o.index];
      o.delta.content != null && i.message?.role === "assistant" && i.message?.content && (this._emit("content", o.delta.content, i.message.content), this._emit("content.delta", {
        delta: o.delta.content,
        snapshot: i.message.content,
        parsed: i.message.parsed
      })), o.delta.refusal != null && i.message?.role === "assistant" && i.message?.refusal && this._emit("refusal.delta", {
        delta: o.delta.refusal,
        snapshot: i.message.refusal
      }), o.logprobs?.content != null && i.message?.role === "assistant" && this._emit("logprobs.content.delta", {
        content: o.logprobs?.content,
        snapshot: i.logprobs?.content ?? []
      }), o.logprobs?.refusal != null && i.message?.role === "assistant" && this._emit("logprobs.refusal.delta", {
        refusal: o.logprobs?.refusal,
        snapshot: i.logprobs?.refusal ?? []
      });
      const s = x(this, We, "m", Aa).call(this, i);
      i.finish_reason && (x(this, We, "m", dc).call(this, i), s.current_tool_call_index != null && x(this, We, "m", fc).call(this, i, s.current_tool_call_index));
      for (const a of o.delta.tool_calls ?? [])
        s.current_tool_call_index !== a.index && (x(this, We, "m", dc).call(this, i), s.current_tool_call_index != null && x(this, We, "m", fc).call(this, i, s.current_tool_call_index)), s.current_tool_call_index = a.index;
      for (const a of o.delta.tool_calls ?? []) {
        const u = i.message.tool_calls?.[a.index];
        u?.type && (u?.type === "function" ? this._emit("tool_calls.function.arguments.delta", {
          name: u.function?.name,
          index: a.index,
          arguments: u.function.arguments,
          parsed_arguments: u.function.parsed_arguments,
          arguments_delta: a.function?.arguments ?? ""
        }) : (u?.type, void 0));
      }
    }
  }, fc = function(n, r) {
    if (x(this, We, "m", Aa).call(this, n).done_tool_calls.has(r)) return;
    const o = n.message.tool_calls?.[r];
    if (!o) throw new Error("no tool call snapshot");
    if (!o.type) throw new Error("tool call snapshot missing `type`");
    if (o.type === "function") {
      const i = x(this, kn, "f")?.tools?.find((s) => Pl(s) && s.function.name === o.function.name);
      this._emit("tool_calls.function.arguments.done", {
        name: o.function.name,
        index: r,
        arguments: o.function.arguments,
        parsed_arguments: Hs(i) ? i.$parseRaw(o.function.arguments) : i?.function.strict ? JSON.parse(o.function.arguments) : null
      });
    } else o.type;
  }, dc = function(n) {
    const r = x(this, We, "m", Aa).call(this, n);
    if (n.message.content && !r.content_done) {
      r.content_done = !0;
      const o = x(this, We, "m", hc).call(this);
      this._emit("content.done", {
        content: n.message.content,
        parsed: o ? o.$parseRaw(n.message.content) : null
      });
    }
    n.message.refusal && !r.refusal_done && (r.refusal_done = !0, this._emit("refusal.done", { refusal: n.message.refusal })), n.logprobs?.content && !r.logprobs_content_done && (r.logprobs_content_done = !0, this._emit("logprobs.content.done", { content: n.logprobs.content })), n.logprobs?.refusal && !r.logprobs_refusal_done && (r.logprobs_refusal_done = !0, this._emit("logprobs.refusal.done", { refusal: n.logprobs.refusal }));
  }, Ca = function() {
    if (this.ended) throw new ie("stream has ended, this shouldn't happen");
    const n = x(this, jn, "f");
    if (!n) throw new ie("request ended without sending any chunks");
    return ce(this, jn, void 0, "f"), ce(this, co, [], "f"), i$(n, x(this, kn, "f"));
  }, hc = function() {
    const n = x(this, kn, "f")?.response_format;
    return Wd(n) ? n : null;
  }, dy = function(n) {
    var r, o, i, s;
    let a = x(this, jn, "f");
    const { choices: u, ...f } = n;
    a ? Object.assign(a, f) : a = ce(this, jn, {
      ...f,
      choices: []
    }, "f");
    for (const { delta: d, finish_reason: h, index: p, logprobs: m = null, ...g } of n.choices) {
      let y = a.choices[p];
      if (y || (y = a.choices[p] = {
        finish_reason: h,
        index: p,
        message: {},
        logprobs: m,
        ...g
      }), m) if (!y.logprobs) y.logprobs = Object.assign({}, m);
      else {
        const { content: E, refusal: M, ...I } = m;
        Object.assign(y.logprobs, I), E && ((r = y.logprobs).content ?? (r.content = []), y.logprobs.content.push(...E)), M && ((o = y.logprobs).refusal ?? (o.refusal = []), y.logprobs.refusal.push(...M));
      }
      if (h && (y.finish_reason = h, x(this, kn, "f") && QE(x(this, kn, "f")))) {
        if (h === "length") throw new RE();
        if (h === "content_filter") throw new PE();
      }
      if (Object.assign(y, g), !d) continue;
      const { content: v, refusal: w, function_call: _, role: S, tool_calls: T, ...C } = d;
      if (Object.assign(y.message, C), w && (y.message.refusal = (y.message.refusal || "") + w), S && (y.message.role = S), _ && (y.message.function_call ? (_.name && (y.message.function_call.name = _.name), _.arguments && ((i = y.message.function_call).arguments ?? (i.arguments = ""), y.message.function_call.arguments += _.arguments)) : y.message.function_call = _), v && (y.message.content = (y.message.content || "") + v, !y.message.refusal && x(this, We, "m", hc).call(this) && (y.message.parsed = fy(y.message.content))), T) {
        y.message.tool_calls || (y.message.tool_calls = []);
        for (const { index: E, id: M, type: I, function: D, ...$ } of T) {
          const q = (s = y.message.tool_calls)[E] ?? (s[E] = {});
          Object.assign(q, $), M && (q.id = M), I && (q.type = I), D && (q.function ?? (q.function = {
            name: D.name ?? "",
            arguments: ""
          })), D?.name && (q.function.name = D.name), D?.arguments && (q.function.arguments += D.arguments, qU(x(this, kn, "f"), q) && (q.function.parsed_arguments = fy(q.function.arguments)));
        }
      }
    }
    return a;
  }, Symbol.asyncIterator)]() {
    const t = [], n = [];
    let r = !1;
    return this.on("chunk", (o) => {
      const i = n.shift();
      i ? i.resolve(o) : t.push(o);
    }), this.on("end", () => {
      r = !0;
      for (const o of n) o.resolve(void 0);
      n.length = 0;
    }), this.on("abort", (o) => {
      r = !0;
      for (const i of n) i.reject(o);
      n.length = 0;
    }), this.on("error", (o) => {
      r = !0;
      for (const i of n) i.reject(o);
      n.length = 0;
    }), {
      next: async () => t.length ? {
        value: t.shift(),
        done: !1
      } : r ? {
        value: void 0,
        done: !0
      } : new Promise((o, i) => n.push({
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
  toReadableStream() {
    return new As(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
  }
};
function i$(e, t) {
  const { id: n, choices: r, created: o, model: i, system_fingerprint: s, ...a } = e;
  return GU({
    ...a,
    id: n,
    choices: r.map(({ message: u, finish_reason: f, index: d, logprobs: h, ...p }) => {
      if (!f) throw new ie(`missing finish_reason for choice ${d}`);
      const { content: m = null, function_call: g, tool_calls: y, ...v } = u, w = u.role;
      if (!w) throw new ie(`missing role for choice ${d}`);
      if (g) {
        const { arguments: _, name: S } = g;
        if (_ == null) throw new ie(`missing function_call.arguments for choice ${d}`);
        if (!S) throw new ie(`missing function_call.name for choice ${d}`);
        return {
          ...p,
          message: {
            content: m,
            function_call: {
              arguments: _,
              name: S
            },
            role: w,
            refusal: u.refusal ?? null
          },
          finish_reason: f,
          index: d,
          logprobs: h
        };
      }
      return y ? {
        ...p,
        index: d,
        finish_reason: f,
        logprobs: h,
        message: {
          ...v,
          role: w,
          content: m,
          refusal: u.refusal ?? null,
          tool_calls: y.map((_, S) => {
            const { function: T, type: C, id: E, ...M } = _, { arguments: I, name: D, ...$ } = T || {};
            if (E == null) throw new ie(`missing choices[${d}].tool_calls[${S}].id
${ba(e)}`);
            if (C == null) throw new ie(`missing choices[${d}].tool_calls[${S}].type
${ba(e)}`);
            if (D == null) throw new ie(`missing choices[${d}].tool_calls[${S}].function.name
${ba(e)}`);
            if (I == null) throw new ie(`missing choices[${d}].tool_calls[${S}].function.arguments
${ba(e)}`);
            return {
              ...M,
              id: E,
              type: C,
              function: {
                ...$,
                name: D,
                arguments: I
              }
            };
          })
        }
      } : {
        ...p,
        message: {
          ...v,
          content: m,
          role: w,
          refusal: u.refusal ?? null
        },
        finish_reason: f,
        index: d,
        logprobs: h
      };
    }),
    created: o,
    model: i,
    object: "chat.completion",
    ...s ? { system_fingerprint: s } : {}
  }, t);
}
function ba(e) {
  return JSON.stringify(e);
}
var s$ = class kf extends cT {
  static fromReadableStream(t) {
    const n = new kf(null);
    return n._run(() => n._fromReadableStream(t)), n;
  }
  static runTools(t, n, r) {
    const o = new kf(n), i = {
      ...r,
      headers: {
        ...r?.headers,
        "X-Stainless-Helper-Method": "runTools"
      }
    };
    return o._run(() => o._runTools(t, n, i)), o;
  }
}, Xd = class extends re {
  constructor() {
    super(...arguments), this.messages = new XE(this._client);
  }
  create(e, t) {
    return this._client.post("/chat/completions", {
      body: e,
      ...t,
      stream: e.stream ?? !1
    });
  }
  retrieve(e, t) {
    return this._client.get(F`/chat/completions/${e}`, t);
  }
  update(e, t, n) {
    return this._client.post(F`/chat/completions/${e}`, {
      body: t,
      ...n
    });
  }
  list(e = {}, t) {
    return this._client.getAPIList("/chat/completions", Oe, {
      query: e,
      ...t
    });
  }
  delete(e, t) {
    return this._client.delete(F`/chat/completions/${e}`, t);
  }
  parse(e, t) {
    return KU(e.tools), this._client.chat.completions.create(e, {
      ...t,
      headers: {
        ...t?.headers,
        "X-Stainless-Helper-Method": "chat.completions.parse"
      }
    })._thenUnwrap((n) => Yd(n, e));
  }
  runTools(e, t) {
    return e.stream ? s$.runTools(this._client, e, t) : YU.runTools(this._client, e, t);
  }
  stream(e, t) {
    return cT.createChatCompletion(this._client, e, t);
  }
};
Xd.Messages = XE;
var Qd = class extends re {
  constructor() {
    super(...arguments), this.completions = new Xd(this._client);
  }
};
Qd.Completions = Xd;
var fT = /* @__PURE__ */ Symbol("brand.privateNullableHeaders");
function* a$(e) {
  if (!e) return;
  if (fT in e) {
    const { values: r, nulls: o } = e;
    yield* r.entries();
    for (const i of o) yield [i, null];
    return;
  }
  let t = !1, n;
  e instanceof Headers ? n = e.entries() : Wg(e) ? n = e : (t = !0, n = Object.entries(e ?? {}));
  for (let r of n) {
    const o = r[0];
    if (typeof o != "string") throw new TypeError("expected header name to be a string");
    const i = Wg(r[1]) ? r[1] : [r[1]];
    let s = !1;
    for (const a of i)
      a !== void 0 && (t && !s && (s = !0, yield [o, null]), yield [o, a]);
  }
}
var te = (e) => {
  const t = new Headers(), n = /* @__PURE__ */ new Set();
  for (const r of e) {
    const o = /* @__PURE__ */ new Set();
    for (const [i, s] of a$(r)) {
      const a = i.toLowerCase();
      o.has(a) || (t.delete(i), o.add(a)), s === null ? (t.delete(i), n.add(a)) : (t.append(i, s), n.delete(a));
    }
  }
  return {
    [fT]: !0,
    values: t,
    nulls: n
  };
}, dT = class extends re {
  create(e, t) {
    return this._client.post("/audio/speech", {
      body: e,
      ...t,
      headers: te([{ Accept: "application/octet-stream" }, t?.headers]),
      __binaryResponse: !0
    });
  }
}, hT = class extends re {
  create(e, t) {
    return this._client.post("/audio/transcriptions", wn({
      body: e,
      ...t,
      stream: e.stream ?? !1,
      __metadata: { model: e.model }
    }, this._client));
  }
}, pT = class extends re {
  create(e, t) {
    return this._client.post("/audio/translations", wn({
      body: e,
      ...t,
      __metadata: { model: e.model }
    }, this._client));
  }
}, qs = class extends re {
  constructor() {
    super(...arguments), this.transcriptions = new hT(this._client), this.translations = new pT(this._client), this.speech = new dT(this._client);
  }
};
qs.Transcriptions = hT;
qs.Translations = pT;
qs.Speech = dT;
var mT = class extends re {
  create(e, t) {
    return this._client.post("/batches", {
      body: e,
      ...t
    });
  }
  retrieve(e, t) {
    return this._client.get(F`/batches/${e}`, t);
  }
  list(e = {}, t) {
    return this._client.getAPIList("/batches", Oe, {
      query: e,
      ...t
    });
  }
  cancel(e, t) {
    return this._client.post(F`/batches/${e}/cancel`, t);
  }
}, gT = class extends re {
  create(e, t) {
    return this._client.post("/assistants", {
      body: e,
      ...t,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  retrieve(e, t) {
    return this._client.get(F`/assistants/${e}`, {
      ...t,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  update(e, t, n) {
    return this._client.post(F`/assistants/${e}`, {
      body: t,
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  list(e = {}, t) {
    return this._client.getAPIList("/assistants", Oe, {
      query: e,
      ...t,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  delete(e, t) {
    return this._client.delete(F`/assistants/${e}`, {
      ...t,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
}, yT = class extends re {
  create(e, t) {
    return this._client.post("/realtime/sessions", {
      body: e,
      ...t,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
}, vT = class extends re {
  create(e, t) {
    return this._client.post("/realtime/transcription_sessions", {
      body: e,
      ...t,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
}, pu = class extends re {
  constructor() {
    super(...arguments), this.sessions = new yT(this._client), this.transcriptionSessions = new vT(this._client);
  }
};
pu.Sessions = yT;
pu.TranscriptionSessions = vT;
var _T = class extends re {
  create(e, t) {
    return this._client.post("/chatkit/sessions", {
      body: e,
      ...t,
      headers: te([{ "OpenAI-Beta": "chatkit_beta=v1" }, t?.headers])
    });
  }
  cancel(e, t) {
    return this._client.post(F`/chatkit/sessions/${e}/cancel`, {
      ...t,
      headers: te([{ "OpenAI-Beta": "chatkit_beta=v1" }, t?.headers])
    });
  }
}, wT = class extends re {
  retrieve(e, t) {
    return this._client.get(F`/chatkit/threads/${e}`, {
      ...t,
      headers: te([{ "OpenAI-Beta": "chatkit_beta=v1" }, t?.headers])
    });
  }
  list(e = {}, t) {
    return this._client.getAPIList("/chatkit/threads", Cs, {
      query: e,
      ...t,
      headers: te([{ "OpenAI-Beta": "chatkit_beta=v1" }, t?.headers])
    });
  }
  delete(e, t) {
    return this._client.delete(F`/chatkit/threads/${e}`, {
      ...t,
      headers: te([{ "OpenAI-Beta": "chatkit_beta=v1" }, t?.headers])
    });
  }
  listItems(e, t = {}, n) {
    return this._client.getAPIList(F`/chatkit/threads/${e}/items`, Cs, {
      query: t,
      ...n,
      headers: te([{ "OpenAI-Beta": "chatkit_beta=v1" }, n?.headers])
    });
  }
}, mu = class extends re {
  constructor() {
    super(...arguments), this.sessions = new _T(this._client), this.threads = new wT(this._client);
  }
};
mu.Sessions = _T;
mu.Threads = wT;
var ET = class extends re {
  create(e, t, n) {
    return this._client.post(F`/threads/${e}/messages`, {
      body: t,
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  retrieve(e, t, n) {
    const { thread_id: r } = t;
    return this._client.get(F`/threads/${r}/messages/${e}`, {
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  update(e, t, n) {
    const { thread_id: r, ...o } = t;
    return this._client.post(F`/threads/${r}/messages/${e}`, {
      body: o,
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  list(e, t = {}, n) {
    return this._client.getAPIList(F`/threads/${e}/messages`, Oe, {
      query: t,
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  delete(e, t, n) {
    const { thread_id: r } = t;
    return this._client.delete(F`/threads/${r}/messages/${e}`, {
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
}, TT = class extends re {
  retrieve(e, t, n) {
    const { thread_id: r, run_id: o, ...i } = t;
    return this._client.get(F`/threads/${r}/runs/${o}/steps/${e}`, {
      query: i,
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  list(e, t, n) {
    const { thread_id: r, ...o } = t;
    return this._client.getAPIList(F`/threads/${r}/runs/${e}/steps`, Oe, {
      query: o,
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
}, l$ = (e) => {
  if (typeof Buffer < "u") {
    const t = Buffer.from(e, "base64");
    return Array.from(new Float32Array(t.buffer, t.byteOffset, t.length / Float32Array.BYTES_PER_ELEMENT));
  } else {
    const t = atob(e), n = t.length, r = new Uint8Array(n);
    for (let o = 0; o < n; o++) r[o] = t.charCodeAt(o);
    return Array.from(new Float32Array(r.buffer));
  }
}, fo = (e) => {
  if (typeof globalThis.process < "u") return globalThis.process.env?.[e]?.trim() ?? void 0;
  if (typeof globalThis.Deno < "u") return globalThis.Deno.env?.get?.(e)?.trim();
}, st, $r, Df, gn, za, Xt, Fr, Co, Dr, Dl, Lt, Xa, Qa, os, Hi, qi, hy, py, my, gy, yy, vy, _y, is = class extends zd {
  constructor() {
    super(...arguments), st.add(this), Df.set(this, []), gn.set(this, {}), za.set(this, {}), Xt.set(this, void 0), Fr.set(this, void 0), Co.set(this, void 0), Dr.set(this, void 0), Dl.set(this, void 0), Lt.set(this, void 0), Xa.set(this, void 0), Qa.set(this, void 0), os.set(this, void 0);
  }
  [(Df = /* @__PURE__ */ new WeakMap(), gn = /* @__PURE__ */ new WeakMap(), za = /* @__PURE__ */ new WeakMap(), Xt = /* @__PURE__ */ new WeakMap(), Fr = /* @__PURE__ */ new WeakMap(), Co = /* @__PURE__ */ new WeakMap(), Dr = /* @__PURE__ */ new WeakMap(), Dl = /* @__PURE__ */ new WeakMap(), Lt = /* @__PURE__ */ new WeakMap(), Xa = /* @__PURE__ */ new WeakMap(), Qa = /* @__PURE__ */ new WeakMap(), os = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakSet(), Symbol.asyncIterator)]() {
    const e = [], t = [];
    let n = !1;
    return this.on("event", (r) => {
      const o = t.shift();
      o ? o.resolve(r) : e.push(r);
    }), this.on("end", () => {
      n = !0;
      for (const r of t) r.resolve(void 0);
      t.length = 0;
    }), this.on("abort", (r) => {
      n = !0;
      for (const o of t) o.reject(r);
      t.length = 0;
    }), this.on("error", (r) => {
      n = !0;
      for (const o of t) o.reject(r);
      t.length = 0;
    }), {
      next: async () => e.length ? {
        value: e.shift(),
        done: !1
      } : n ? {
        value: void 0,
        done: !0
      } : new Promise((r, o) => t.push({
        resolve: r,
        reject: o
      })).then((r) => r ? {
        value: r,
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
    const t = new $r();
    return t._run(() => t._fromReadableStream(e)), t;
  }
  async _fromReadableStream(e, t) {
    const n = t?.signal;
    n && (n.aborted && this.controller.abort(), n.addEventListener("abort", () => this.controller.abort())), this._connected();
    const r = As.fromReadableStream(e, this.controller);
    for await (const o of r) x(this, st, "m", Hi).call(this, o);
    if (r.controller.signal?.aborted) throw new Ht();
    return this._addRun(x(this, st, "m", qi).call(this));
  }
  toReadableStream() {
    return new As(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
  }
  static createToolAssistantStream(e, t, n, r) {
    const o = new $r();
    return o._run(() => o._runToolAssistantStream(e, t, n, {
      ...r,
      headers: {
        ...r?.headers,
        "X-Stainless-Helper-Method": "stream"
      }
    })), o;
  }
  async _createToolAssistantStream(e, t, n, r) {
    const o = r?.signal;
    o && (o.aborted && this.controller.abort(), o.addEventListener("abort", () => this.controller.abort()));
    const i = {
      ...n,
      stream: !0
    }, s = await e.submitToolOutputs(t, i, {
      ...r,
      signal: this.controller.signal
    });
    this._connected();
    for await (const a of s) x(this, st, "m", Hi).call(this, a);
    if (s.controller.signal?.aborted) throw new Ht();
    return this._addRun(x(this, st, "m", qi).call(this));
  }
  static createThreadAssistantStream(e, t, n) {
    const r = new $r();
    return r._run(() => r._threadAssistantStream(e, t, {
      ...n,
      headers: {
        ...n?.headers,
        "X-Stainless-Helper-Method": "stream"
      }
    })), r;
  }
  static createAssistantStream(e, t, n, r) {
    const o = new $r();
    return o._run(() => o._runAssistantStream(e, t, n, {
      ...r,
      headers: {
        ...r?.headers,
        "X-Stainless-Helper-Method": "stream"
      }
    })), o;
  }
  currentEvent() {
    return x(this, Xa, "f");
  }
  currentRun() {
    return x(this, Qa, "f");
  }
  currentMessageSnapshot() {
    return x(this, Xt, "f");
  }
  currentRunStepSnapshot() {
    return x(this, os, "f");
  }
  async finalRunSteps() {
    return await this.done(), Object.values(x(this, gn, "f"));
  }
  async finalMessages() {
    return await this.done(), Object.values(x(this, za, "f"));
  }
  async finalRun() {
    if (await this.done(), !x(this, Fr, "f")) throw Error("Final run was not received.");
    return x(this, Fr, "f");
  }
  async _createThreadAssistantStream(e, t, n) {
    const r = n?.signal;
    r && (r.aborted && this.controller.abort(), r.addEventListener("abort", () => this.controller.abort()));
    const o = {
      ...t,
      stream: !0
    }, i = await e.createAndRun(o, {
      ...n,
      signal: this.controller.signal
    });
    this._connected();
    for await (const s of i) x(this, st, "m", Hi).call(this, s);
    if (i.controller.signal?.aborted) throw new Ht();
    return this._addRun(x(this, st, "m", qi).call(this));
  }
  async _createAssistantStream(e, t, n, r) {
    const o = r?.signal;
    o && (o.aborted && this.controller.abort(), o.addEventListener("abort", () => this.controller.abort()));
    const i = {
      ...n,
      stream: !0
    }, s = await e.create(t, i, {
      ...r,
      signal: this.controller.signal
    });
    this._connected();
    for await (const a of s) x(this, st, "m", Hi).call(this, a);
    if (s.controller.signal?.aborted) throw new Ht();
    return this._addRun(x(this, st, "m", qi).call(this));
  }
  static accumulateDelta(e, t) {
    for (const [n, r] of Object.entries(t)) {
      if (!e.hasOwnProperty(n)) {
        e[n] = r;
        continue;
      }
      let o = e[n];
      if (o == null) {
        e[n] = r;
        continue;
      }
      if (n === "index" || n === "type") {
        e[n] = r;
        continue;
      }
      if (typeof o == "string" && typeof r == "string") o += r;
      else if (typeof o == "number" && typeof r == "number") o += r;
      else if (sc(o) && sc(r)) o = this.accumulateDelta(o, r);
      else if (Array.isArray(o) && Array.isArray(r)) {
        if (o.every((i) => typeof i == "string" || typeof i == "number")) {
          o.push(...r);
          continue;
        }
        for (const i of r) {
          if (!sc(i)) throw new Error(`Expected array delta entry to be an object but got: ${i}`);
          const s = i.index;
          if (s == null)
            throw console.error(i), new Error("Expected array delta entry to have an `index` property");
          if (typeof s != "number") throw new Error(`Expected array delta entry \`index\` property to be a number but got ${s}`);
          const a = o[s];
          a == null ? o.push(i) : o[s] = this.accumulateDelta(a, i);
        }
        continue;
      } else throw Error(`Unhandled record type: ${n}, deltaValue: ${r}, accValue: ${o}`);
      e[n] = o;
    }
    return e;
  }
  _addRun(e) {
    return e;
  }
  async _threadAssistantStream(e, t, n) {
    return await this._createThreadAssistantStream(t, e, n);
  }
  async _runAssistantStream(e, t, n, r) {
    return await this._createAssistantStream(t, e, n, r);
  }
  async _runToolAssistantStream(e, t, n, r) {
    return await this._createToolAssistantStream(t, e, n, r);
  }
};
$r = is, Hi = function(t) {
  if (!this.ended)
    switch (ce(this, Xa, t, "f"), x(this, st, "m", my).call(this, t), t.event) {
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
        x(this, st, "m", _y).call(this, t);
        break;
      case "thread.run.step.created":
      case "thread.run.step.in_progress":
      case "thread.run.step.delta":
      case "thread.run.step.completed":
      case "thread.run.step.failed":
      case "thread.run.step.cancelled":
      case "thread.run.step.expired":
        x(this, st, "m", py).call(this, t);
        break;
      case "thread.message.created":
      case "thread.message.in_progress":
      case "thread.message.delta":
      case "thread.message.completed":
      case "thread.message.incomplete":
        x(this, st, "m", hy).call(this, t);
        break;
      case "error":
        throw new Error("Encountered an error event in event processing - errors should be processed earlier");
      default:
    }
}, qi = function() {
  if (this.ended) throw new ie("stream has ended, this shouldn't happen");
  if (!x(this, Fr, "f")) throw Error("Final run has not been received");
  return x(this, Fr, "f");
}, hy = function(t) {
  const [n, r] = x(this, st, "m", yy).call(this, t, x(this, Xt, "f"));
  ce(this, Xt, n, "f"), x(this, za, "f")[n.id] = n;
  for (const o of r) {
    const i = n.content[o.index];
    i?.type == "text" && this._emit("textCreated", i.text);
  }
  switch (t.event) {
    case "thread.message.created":
      this._emit("messageCreated", t.data);
      break;
    case "thread.message.in_progress":
      break;
    case "thread.message.delta":
      if (this._emit("messageDelta", t.data.delta, n), t.data.delta.content) for (const o of t.data.delta.content) {
        if (o.type == "text" && o.text) {
          let i = o.text, s = n.content[o.index];
          if (s && s.type == "text") this._emit("textDelta", i, s.text);
          else throw Error("The snapshot associated with this text delta is not text or missing");
        }
        if (o.index != x(this, Co, "f")) {
          if (x(this, Dr, "f")) switch (x(this, Dr, "f").type) {
            case "text":
              this._emit("textDone", x(this, Dr, "f").text, x(this, Xt, "f"));
              break;
            case "image_file":
              this._emit("imageFileDone", x(this, Dr, "f").image_file, x(this, Xt, "f"));
              break;
          }
          ce(this, Co, o.index, "f");
        }
        ce(this, Dr, n.content[o.index], "f");
      }
      break;
    case "thread.message.completed":
    case "thread.message.incomplete":
      if (x(this, Co, "f") !== void 0) {
        const o = t.data.content[x(this, Co, "f")];
        if (o) switch (o.type) {
          case "image_file":
            this._emit("imageFileDone", o.image_file, x(this, Xt, "f"));
            break;
          case "text":
            this._emit("textDone", o.text, x(this, Xt, "f"));
            break;
        }
      }
      x(this, Xt, "f") && this._emit("messageDone", t.data), ce(this, Xt, void 0, "f");
  }
}, py = function(t) {
  const n = x(this, st, "m", gy).call(this, t);
  switch (ce(this, os, n, "f"), t.event) {
    case "thread.run.step.created":
      this._emit("runStepCreated", t.data);
      break;
    case "thread.run.step.delta":
      const r = t.data.delta;
      if (r.step_details && r.step_details.type == "tool_calls" && r.step_details.tool_calls && n.step_details.type == "tool_calls") for (const o of r.step_details.tool_calls) o.index == x(this, Dl, "f") ? this._emit("toolCallDelta", o, n.step_details.tool_calls[o.index]) : (x(this, Lt, "f") && this._emit("toolCallDone", x(this, Lt, "f")), ce(this, Dl, o.index, "f"), ce(this, Lt, n.step_details.tool_calls[o.index], "f"), x(this, Lt, "f") && this._emit("toolCallCreated", x(this, Lt, "f")));
      this._emit("runStepDelta", t.data.delta, n);
      break;
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
      ce(this, os, void 0, "f"), t.data.step_details.type == "tool_calls" && x(this, Lt, "f") && (this._emit("toolCallDone", x(this, Lt, "f")), ce(this, Lt, void 0, "f")), this._emit("runStepDone", t.data, n);
      break;
    case "thread.run.step.in_progress":
      break;
  }
}, my = function(t) {
  x(this, Df, "f").push(t), this._emit("event", t);
}, gy = function(t) {
  switch (t.event) {
    case "thread.run.step.created":
      return x(this, gn, "f")[t.data.id] = t.data, t.data;
    case "thread.run.step.delta":
      let n = x(this, gn, "f")[t.data.id];
      if (!n) throw Error("Received a RunStepDelta before creation of a snapshot");
      let r = t.data;
      if (r.delta) {
        const o = $r.accumulateDelta(n, r.delta);
        x(this, gn, "f")[t.data.id] = o;
      }
      return x(this, gn, "f")[t.data.id];
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
    case "thread.run.step.in_progress":
      x(this, gn, "f")[t.data.id] = t.data;
      break;
  }
  if (x(this, gn, "f")[t.data.id]) return x(this, gn, "f")[t.data.id];
  throw new Error("No snapshot available");
}, yy = function(t, n) {
  let r = [];
  switch (t.event) {
    case "thread.message.created":
      return [t.data, r];
    case "thread.message.delta":
      if (!n) throw Error("Received a delta with no existing snapshot (there should be one from message creation)");
      let o = t.data;
      if (o.delta.content) for (const i of o.delta.content) if (i.index in n.content) {
        let s = n.content[i.index];
        n.content[i.index] = x(this, st, "m", vy).call(this, i, s);
      } else
        n.content[i.index] = i, r.push(i);
      return [n, r];
    case "thread.message.in_progress":
    case "thread.message.completed":
    case "thread.message.incomplete":
      if (n) return [n, r];
      throw Error("Received thread message event with no existing snapshot");
  }
  throw Error("Tried to accumulate a non-message event");
}, vy = function(t, n) {
  return $r.accumulateDelta(n, t);
}, _y = function(t) {
  switch (ce(this, Qa, t.data, "f"), t.event) {
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
      ce(this, Fr, t.data, "f"), x(this, Lt, "f") && (this._emit("toolCallDone", x(this, Lt, "f")), ce(this, Lt, void 0, "f"));
      break;
    case "thread.run.cancelling":
      break;
  }
};
var Zd = class extends re {
  constructor() {
    super(...arguments), this.steps = new TT(this._client);
  }
  create(e, t, n) {
    const { include: r, ...o } = t;
    return this._client.post(F`/threads/${e}/runs`, {
      query: { include: r },
      body: o,
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers]),
      stream: t.stream ?? !1,
      __synthesizeEventData: !0
    });
  }
  retrieve(e, t, n) {
    const { thread_id: r } = t;
    return this._client.get(F`/threads/${r}/runs/${e}`, {
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  update(e, t, n) {
    const { thread_id: r, ...o } = t;
    return this._client.post(F`/threads/${r}/runs/${e}`, {
      body: o,
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  list(e, t = {}, n) {
    return this._client.getAPIList(F`/threads/${e}/runs`, Oe, {
      query: t,
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  cancel(e, t, n) {
    const { thread_id: r } = t;
    return this._client.post(F`/threads/${r}/runs/${e}/cancel`, {
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  async createAndPoll(e, t, n) {
    const r = await this.create(e, t, n);
    return await this.poll(r.id, { thread_id: e }, n);
  }
  createAndStream(e, t, n) {
    return is.createAssistantStream(e, this._client.beta.threads.runs, t, n);
  }
  async poll(e, t, n) {
    const r = te([n?.headers, {
      "X-Stainless-Poll-Helper": "true",
      "X-Stainless-Custom-Poll-Interval": n?.pollIntervalMs?.toString() ?? void 0
    }]);
    for (; ; ) {
      const { data: o, response: i } = await this.retrieve(e, t, {
        ...n,
        headers: {
          ...n?.headers,
          ...r
        }
      }).withResponse();
      switch (o.status) {
        case "queued":
        case "in_progress":
        case "cancelling":
          let s = 5e3;
          if (n?.pollIntervalMs) s = n.pollIntervalMs;
          else {
            const a = i.headers.get("openai-poll-after-ms");
            if (a) {
              const u = parseInt(a);
              isNaN(u) || (s = u);
            }
          }
          await Vs(s);
          break;
        case "requires_action":
        case "incomplete":
        case "cancelled":
        case "completed":
        case "failed":
        case "expired":
          return o;
      }
    }
  }
  stream(e, t, n) {
    return is.createAssistantStream(e, this._client.beta.threads.runs, t, n);
  }
  submitToolOutputs(e, t, n) {
    const { thread_id: r, ...o } = t;
    return this._client.post(F`/threads/${r}/runs/${e}/submit_tool_outputs`, {
      body: o,
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers]),
      stream: t.stream ?? !1,
      __synthesizeEventData: !0
    });
  }
  async submitToolOutputsAndPoll(e, t, n) {
    const r = await this.submitToolOutputs(e, t, n);
    return await this.poll(r.id, t, n);
  }
  submitToolOutputsStream(e, t, n) {
    return is.createToolAssistantStream(e, this._client.beta.threads.runs, t, n);
  }
};
Zd.Steps = TT;
var gu = class extends re {
  constructor() {
    super(...arguments), this.runs = new Zd(this._client), this.messages = new ET(this._client);
  }
  create(e = {}, t) {
    return this._client.post("/threads", {
      body: e,
      ...t,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  retrieve(e, t) {
    return this._client.get(F`/threads/${e}`, {
      ...t,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  update(e, t, n) {
    return this._client.post(F`/threads/${e}`, {
      body: t,
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  delete(e, t) {
    return this._client.delete(F`/threads/${e}`, {
      ...t,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  createAndRun(e, t) {
    return this._client.post("/threads/runs", {
      body: e,
      ...t,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, t?.headers]),
      stream: e.stream ?? !1,
      __synthesizeEventData: !0
    });
  }
  async createAndRunPoll(e, t) {
    const n = await this.createAndRun(e, t);
    return await this.runs.poll(n.id, { thread_id: n.thread_id }, t);
  }
  createAndRunStream(e, t) {
    return is.createThreadAssistantStream(e, this._client.beta.threads, t);
  }
};
gu.Runs = Zd;
gu.Messages = ET;
var jo = class extends re {
  constructor() {
    super(...arguments), this.realtime = new pu(this._client), this.chatkit = new mu(this._client), this.assistants = new gT(this._client), this.threads = new gu(this._client);
  }
};
jo.Realtime = pu;
jo.ChatKit = mu;
jo.Assistants = gT;
jo.Threads = gu;
var ST = class extends re {
  create(e, t) {
    return this._client.post("/completions", {
      body: e,
      ...t,
      stream: e.stream ?? !1
    });
  }
}, AT = class extends re {
  retrieve(e, t, n) {
    const { container_id: r } = t;
    return this._client.get(F`/containers/${r}/files/${e}/content`, {
      ...n,
      headers: te([{ Accept: "application/binary" }, n?.headers]),
      __binaryResponse: !0
    });
  }
}, jd = class extends re {
  constructor() {
    super(...arguments), this.content = new AT(this._client);
  }
  create(e, t, n) {
    return this._client.post(F`/containers/${e}/files`, hu({
      body: t,
      ...n
    }, this._client));
  }
  retrieve(e, t, n) {
    const { container_id: r } = t;
    return this._client.get(F`/containers/${r}/files/${e}`, n);
  }
  list(e, t = {}, n) {
    return this._client.getAPIList(F`/containers/${e}/files`, Oe, {
      query: t,
      ...n
    });
  }
  delete(e, t, n) {
    const { container_id: r } = t;
    return this._client.delete(F`/containers/${r}/files/${e}`, {
      ...n,
      headers: te([{ Accept: "*/*" }, n?.headers])
    });
  }
};
jd.Content = AT;
var eh = class extends re {
  constructor() {
    super(...arguments), this.files = new jd(this._client);
  }
  create(e, t) {
    return this._client.post("/containers", {
      body: e,
      ...t
    });
  }
  retrieve(e, t) {
    return this._client.get(F`/containers/${e}`, t);
  }
  list(e = {}, t) {
    return this._client.getAPIList("/containers", Oe, {
      query: e,
      ...t
    });
  }
  delete(e, t) {
    return this._client.delete(F`/containers/${e}`, {
      ...t,
      headers: te([{ Accept: "*/*" }, t?.headers])
    });
  }
};
eh.Files = jd;
var CT = class extends re {
  create(e, t, n) {
    const { include: r, ...o } = t;
    return this._client.post(F`/conversations/${e}/items`, {
      query: { include: r },
      body: o,
      ...n
    });
  }
  retrieve(e, t, n) {
    const { conversation_id: r, ...o } = t;
    return this._client.get(F`/conversations/${r}/items/${e}`, {
      query: o,
      ...n
    });
  }
  list(e, t = {}, n) {
    return this._client.getAPIList(F`/conversations/${e}/items`, Cs, {
      query: t,
      ...n
    });
  }
  delete(e, t, n) {
    const { conversation_id: r } = t;
    return this._client.delete(F`/conversations/${r}/items/${e}`, n);
  }
}, th = class extends re {
  constructor() {
    super(...arguments), this.items = new CT(this._client);
  }
  create(e = {}, t) {
    return this._client.post("/conversations", {
      body: e,
      ...t
    });
  }
  retrieve(e, t) {
    return this._client.get(F`/conversations/${e}`, t);
  }
  update(e, t, n) {
    return this._client.post(F`/conversations/${e}`, {
      body: t,
      ...n
    });
  }
  delete(e, t) {
    return this._client.delete(F`/conversations/${e}`, t);
  }
};
th.Items = CT;
var bT = class extends re {
  create(e, t) {
    const n = !!e.encoding_format;
    let r = n ? e.encoding_format : "base64";
    n && it(this._client).debug("embeddings/user defined encoding_format:", e.encoding_format);
    const o = this._client.post("/embeddings", {
      body: {
        ...e,
        encoding_format: r
      },
      ...t
    });
    return n ? o : (it(this._client).debug("embeddings/decoding base64 embeddings from base64"), o._thenUnwrap((i) => (i && i.data && i.data.forEach((s) => {
      const a = s.embedding;
      s.embedding = l$(a);
    }), i)));
  }
}, IT = class extends re {
  retrieve(e, t, n) {
    const { eval_id: r, run_id: o } = t;
    return this._client.get(F`/evals/${r}/runs/${o}/output_items/${e}`, n);
  }
  list(e, t, n) {
    const { eval_id: r, ...o } = t;
    return this._client.getAPIList(F`/evals/${r}/runs/${e}/output_items`, Oe, {
      query: o,
      ...n
    });
  }
}, nh = class extends re {
  constructor() {
    super(...arguments), this.outputItems = new IT(this._client);
  }
  create(e, t, n) {
    return this._client.post(F`/evals/${e}/runs`, {
      body: t,
      ...n
    });
  }
  retrieve(e, t, n) {
    const { eval_id: r } = t;
    return this._client.get(F`/evals/${r}/runs/${e}`, n);
  }
  list(e, t = {}, n) {
    return this._client.getAPIList(F`/evals/${e}/runs`, Oe, {
      query: t,
      ...n
    });
  }
  delete(e, t, n) {
    const { eval_id: r } = t;
    return this._client.delete(F`/evals/${r}/runs/${e}`, n);
  }
  cancel(e, t, n) {
    const { eval_id: r } = t;
    return this._client.post(F`/evals/${r}/runs/${e}`, n);
  }
};
nh.OutputItems = IT;
var rh = class extends re {
  constructor() {
    super(...arguments), this.runs = new nh(this._client);
  }
  create(e, t) {
    return this._client.post("/evals", {
      body: e,
      ...t
    });
  }
  retrieve(e, t) {
    return this._client.get(F`/evals/${e}`, t);
  }
  update(e, t, n) {
    return this._client.post(F`/evals/${e}`, {
      body: t,
      ...n
    });
  }
  list(e = {}, t) {
    return this._client.getAPIList("/evals", Oe, {
      query: e,
      ...t
    });
  }
  delete(e, t) {
    return this._client.delete(F`/evals/${e}`, t);
  }
};
rh.Runs = nh;
var RT = class extends re {
  create(e, t) {
    return this._client.post("/files", wn({
      body: e,
      ...t
    }, this._client));
  }
  retrieve(e, t) {
    return this._client.get(F`/files/${e}`, t);
  }
  list(e = {}, t) {
    return this._client.getAPIList("/files", Oe, {
      query: e,
      ...t
    });
  }
  delete(e, t) {
    return this._client.delete(F`/files/${e}`, t);
  }
  content(e, t) {
    return this._client.get(F`/files/${e}/content`, {
      ...t,
      headers: te([{ Accept: "application/binary" }, t?.headers]),
      __binaryResponse: !0
    });
  }
  async waitForProcessing(e, { pollInterval: t = 5e3, maxWait: n = 1800 * 1e3 } = {}) {
    const r = /* @__PURE__ */ new Set([
      "processed",
      "error",
      "deleted"
    ]), o = Date.now();
    let i = await this.retrieve(e);
    for (; !i.status || !r.has(i.status); )
      if (await Vs(t), i = await this.retrieve(e), Date.now() - o > n) throw new Hd({ message: `Giving up on waiting for file ${e} to finish processing after ${n} milliseconds.` });
    return i;
  }
}, PT = class extends re {
}, xT = class extends re {
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
}, oh = class extends re {
  constructor() {
    super(...arguments), this.graders = new xT(this._client);
  }
};
oh.Graders = xT;
var MT = class extends re {
  create(e, t, n) {
    return this._client.getAPIList(F`/fine_tuning/checkpoints/${e}/permissions`, du, {
      body: t,
      method: "post",
      ...n
    });
  }
  retrieve(e, t = {}, n) {
    return this._client.get(F`/fine_tuning/checkpoints/${e}/permissions`, {
      query: t,
      ...n
    });
  }
  list(e, t = {}, n) {
    return this._client.getAPIList(F`/fine_tuning/checkpoints/${e}/permissions`, Cs, {
      query: t,
      ...n
    });
  }
  delete(e, t, n) {
    const { fine_tuned_model_checkpoint: r } = t;
    return this._client.delete(F`/fine_tuning/checkpoints/${r}/permissions/${e}`, n);
  }
}, ih = class extends re {
  constructor() {
    super(...arguments), this.permissions = new MT(this._client);
  }
};
ih.Permissions = MT;
var NT = class extends re {
  list(e, t = {}, n) {
    return this._client.getAPIList(F`/fine_tuning/jobs/${e}/checkpoints`, Oe, {
      query: t,
      ...n
    });
  }
}, sh = class extends re {
  constructor() {
    super(...arguments), this.checkpoints = new NT(this._client);
  }
  create(e, t) {
    return this._client.post("/fine_tuning/jobs", {
      body: e,
      ...t
    });
  }
  retrieve(e, t) {
    return this._client.get(F`/fine_tuning/jobs/${e}`, t);
  }
  list(e = {}, t) {
    return this._client.getAPIList("/fine_tuning/jobs", Oe, {
      query: e,
      ...t
    });
  }
  cancel(e, t) {
    return this._client.post(F`/fine_tuning/jobs/${e}/cancel`, t);
  }
  listEvents(e, t = {}, n) {
    return this._client.getAPIList(F`/fine_tuning/jobs/${e}/events`, Oe, {
      query: t,
      ...n
    });
  }
  pause(e, t) {
    return this._client.post(F`/fine_tuning/jobs/${e}/pause`, t);
  }
  resume(e, t) {
    return this._client.post(F`/fine_tuning/jobs/${e}/resume`, t);
  }
};
sh.Checkpoints = NT;
var ei = class extends re {
  constructor() {
    super(...arguments), this.methods = new PT(this._client), this.jobs = new sh(this._client), this.checkpoints = new ih(this._client), this.alpha = new oh(this._client);
  }
};
ei.Methods = PT;
ei.Jobs = sh;
ei.Checkpoints = ih;
ei.Alpha = oh;
var kT = class extends re {
}, ah = class extends re {
  constructor() {
    super(...arguments), this.graderModels = new kT(this._client);
  }
};
ah.GraderModels = kT;
var DT = class extends re {
  createVariation(e, t) {
    return this._client.post("/images/variations", wn({
      body: e,
      ...t
    }, this._client));
  }
  edit(e, t) {
    return this._client.post("/images/edits", wn({
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
}, LT = class extends re {
  retrieve(e, t) {
    return this._client.get(F`/models/${e}`, t);
  }
  list(e) {
    return this._client.getAPIList("/models", du, e);
  }
  delete(e, t) {
    return this._client.delete(F`/models/${e}`, t);
  }
}, UT = class extends re {
  create(e, t) {
    return this._client.post("/moderations", {
      body: e,
      ...t
    });
  }
}, $T = class extends re {
  accept(e, t, n) {
    return this._client.post(F`/realtime/calls/${e}/accept`, {
      body: t,
      ...n,
      headers: te([{ Accept: "*/*" }, n?.headers])
    });
  }
  hangup(e, t) {
    return this._client.post(F`/realtime/calls/${e}/hangup`, {
      ...t,
      headers: te([{ Accept: "*/*" }, t?.headers])
    });
  }
  refer(e, t, n) {
    return this._client.post(F`/realtime/calls/${e}/refer`, {
      body: t,
      ...n,
      headers: te([{ Accept: "*/*" }, n?.headers])
    });
  }
  reject(e, t = {}, n) {
    return this._client.post(F`/realtime/calls/${e}/reject`, {
      body: t,
      ...n,
      headers: te([{ Accept: "*/*" }, n?.headers])
    });
  }
}, FT = class extends re {
  create(e, t) {
    return this._client.post("/realtime/client_secrets", {
      body: e,
      ...t
    });
  }
}, yu = class extends re {
  constructor() {
    super(...arguments), this.clientSecrets = new FT(this._client), this.calls = new $T(this._client);
  }
};
yu.ClientSecrets = FT;
yu.Calls = $T;
function u$(e, t) {
  return !t || !f$(t) ? {
    ...e,
    output_parsed: null,
    output: e.output.map((n) => n.type === "function_call" ? {
      ...n,
      parsed_arguments: null
    } : n.type === "message" ? {
      ...n,
      content: n.content.map((r) => ({
        ...r,
        parsed: null
      }))
    } : n)
  } : OT(e, t);
}
function OT(e, t) {
  const n = e.output.map((o) => {
    if (o.type === "function_call") return {
      ...o,
      parsed_arguments: p$(t, o)
    };
    if (o.type === "message") {
      const i = o.content.map((s) => s.type === "output_text" ? {
        ...s,
        parsed: c$(t, s.text)
      } : s);
      return {
        ...o,
        content: i
      };
    }
    return o;
  }), r = Object.assign({}, e, { output: n });
  return Object.getOwnPropertyDescriptor(e, "output_text") || Lf(r), Object.defineProperty(r, "output_parsed", {
    enumerable: !0,
    get() {
      for (const o of r.output)
        if (o.type === "message") {
          for (const i of o.content) if (i.type === "output_text" && i.parsed !== null) return i.parsed;
        }
      return null;
    }
  }), r;
}
function c$(e, t) {
  return e.text?.format?.type !== "json_schema" ? null : "$parseRaw" in e.text?.format ? (e.text?.format).$parseRaw(t) : JSON.parse(t);
}
function f$(e) {
  return !!Wd(e.text?.format);
}
function d$(e) {
  return e?.$brand === "auto-parseable-tool";
}
function h$(e, t) {
  return e.find((n) => n.type === "function" && n.name === t);
}
function p$(e, t) {
  const n = h$(e.tools ?? [], t.name);
  return {
    ...t,
    ...t,
    parsed_arguments: d$(n) ? n.$parseRaw(t.arguments) : n?.strict ? JSON.parse(t.arguments) : null
  };
}
function Lf(e) {
  const t = [];
  for (const n of e.output)
    if (n.type === "message")
      for (const r of n.content) r.type === "output_text" && t.push(r.text);
  e.output_text = t.join("");
}
var ho, Ia, er, Ra, wy, Ey, Ty, Sy, m$ = class BT extends zd {
  constructor(t) {
    super(), ho.add(this), Ia.set(this, void 0), er.set(this, void 0), Ra.set(this, void 0), ce(this, Ia, t, "f");
  }
  static createResponse(t, n, r) {
    const o = new BT(n);
    return o._run(() => o._createOrRetrieveResponse(t, n, {
      ...r,
      headers: {
        ...r?.headers,
        "X-Stainless-Helper-Method": "stream"
      }
    })), o;
  }
  async _createOrRetrieveResponse(t, n, r) {
    const o = r?.signal;
    o && (o.aborted && this.controller.abort(), o.addEventListener("abort", () => this.controller.abort())), x(this, ho, "m", wy).call(this);
    let i, s = null;
    "response_id" in n ? (i = await t.responses.retrieve(n.response_id, { stream: !0 }, {
      ...r,
      signal: this.controller.signal,
      stream: !0
    }), s = n.starting_after ?? null) : i = await t.responses.create({
      ...n,
      stream: !0
    }, {
      ...r,
      signal: this.controller.signal
    }), this._connected();
    for await (const a of i) x(this, ho, "m", Ey).call(this, a, s);
    if (i.controller.signal?.aborted) throw new Ht();
    return x(this, ho, "m", Ty).call(this);
  }
  [(Ia = /* @__PURE__ */ new WeakMap(), er = /* @__PURE__ */ new WeakMap(), Ra = /* @__PURE__ */ new WeakMap(), ho = /* @__PURE__ */ new WeakSet(), wy = function() {
    this.ended || ce(this, er, void 0, "f");
  }, Ey = function(n, r) {
    if (this.ended) return;
    const o = (s, a) => {
      (r == null || a.sequence_number > r) && this._emit(s, a);
    }, i = x(this, ho, "m", Sy).call(this, n);
    switch (o("event", n), n.type) {
      case "response.output_text.delta": {
        const s = i.output[n.output_index];
        if (!s) throw new ie(`missing output at index ${n.output_index}`);
        if (s.type === "message") {
          const a = s.content[n.content_index];
          if (!a) throw new ie(`missing content at index ${n.content_index}`);
          if (a.type !== "output_text") throw new ie(`expected content to be 'output_text', got ${a.type}`);
          o("response.output_text.delta", {
            ...n,
            snapshot: a.text
          });
        }
        break;
      }
      case "response.function_call_arguments.delta": {
        const s = i.output[n.output_index];
        if (!s) throw new ie(`missing output at index ${n.output_index}`);
        s.type === "function_call" && o("response.function_call_arguments.delta", {
          ...n,
          snapshot: s.arguments
        });
        break;
      }
      default:
        o(n.type, n);
        break;
    }
  }, Ty = function() {
    if (this.ended) throw new ie("stream has ended, this shouldn't happen");
    const n = x(this, er, "f");
    if (!n) throw new ie("request ended without sending any events");
    ce(this, er, void 0, "f");
    const r = g$(n, x(this, Ia, "f"));
    return ce(this, Ra, r, "f"), r;
  }, Sy = function(n) {
    let r = x(this, er, "f");
    if (!r) {
      if (n.type !== "response.created") throw new ie(`When snapshot hasn't been set yet, expected 'response.created' event, got ${n.type}`);
      return r = ce(this, er, n.response, "f"), r;
    }
    switch (n.type) {
      case "response.output_item.added":
        r.output.push(n.item);
        break;
      case "response.content_part.added": {
        const o = r.output[n.output_index];
        if (!o) throw new ie(`missing output at index ${n.output_index}`);
        const i = o.type, s = n.part;
        i === "message" && s.type !== "reasoning_text" ? o.content.push(s) : i === "reasoning" && s.type === "reasoning_text" && (o.content || (o.content = []), o.content.push(s));
        break;
      }
      case "response.output_text.delta": {
        const o = r.output[n.output_index];
        if (!o) throw new ie(`missing output at index ${n.output_index}`);
        if (o.type === "message") {
          const i = o.content[n.content_index];
          if (!i) throw new ie(`missing content at index ${n.content_index}`);
          if (i.type !== "output_text") throw new ie(`expected content to be 'output_text', got ${i.type}`);
          i.text += n.delta;
        }
        break;
      }
      case "response.function_call_arguments.delta": {
        const o = r.output[n.output_index];
        if (!o) throw new ie(`missing output at index ${n.output_index}`);
        o.type === "function_call" && (o.arguments += n.delta);
        break;
      }
      case "response.reasoning_text.delta": {
        const o = r.output[n.output_index];
        if (!o) throw new ie(`missing output at index ${n.output_index}`);
        if (o.type === "reasoning") {
          const i = o.content?.[n.content_index];
          if (!i) throw new ie(`missing content at index ${n.content_index}`);
          if (i.type !== "reasoning_text") throw new ie(`expected content to be 'reasoning_text', got ${i.type}`);
          i.text += n.delta;
        }
        break;
      }
      case "response.completed":
        ce(this, er, n.response, "f");
        break;
    }
    return r;
  }, Symbol.asyncIterator)]() {
    const t = [], n = [];
    let r = !1;
    return this.on("event", (o) => {
      const i = n.shift();
      i ? i.resolve(o) : t.push(o);
    }), this.on("end", () => {
      r = !0;
      for (const o of n) o.resolve(void 0);
      n.length = 0;
    }), this.on("abort", (o) => {
      r = !0;
      for (const i of n) i.reject(o);
      n.length = 0;
    }), this.on("error", (o) => {
      r = !0;
      for (const i of n) i.reject(o);
      n.length = 0;
    }), {
      next: async () => t.length ? {
        value: t.shift(),
        done: !1
      } : r ? {
        value: void 0,
        done: !0
      } : new Promise((o, i) => n.push({
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
  async finalResponse() {
    await this.done();
    const t = x(this, Ra, "f");
    if (!t) throw new ie("stream ended without producing a ChatCompletion");
    return t;
  }
};
function g$(e, t) {
  return u$(e, t);
}
var GT = class extends re {
  list(e, t = {}, n) {
    return this._client.getAPIList(F`/responses/${e}/input_items`, Oe, {
      query: t,
      ...n
    });
  }
}, VT = class extends re {
  count(e = {}, t) {
    return this._client.post("/responses/input_tokens", {
      body: e,
      ...t
    });
  }
}, vu = class extends re {
  constructor() {
    super(...arguments), this.inputItems = new GT(this._client), this.inputTokens = new VT(this._client);
  }
  create(e, t) {
    return this._client.post("/responses", {
      body: e,
      ...t,
      stream: e.stream ?? !1
    })._thenUnwrap((n) => ("object" in n && n.object === "response" && Lf(n), n));
  }
  retrieve(e, t = {}, n) {
    return this._client.get(F`/responses/${e}`, {
      query: t,
      ...n,
      stream: t?.stream ?? !1
    })._thenUnwrap((r) => ("object" in r && r.object === "response" && Lf(r), r));
  }
  delete(e, t) {
    return this._client.delete(F`/responses/${e}`, {
      ...t,
      headers: te([{ Accept: "*/*" }, t?.headers])
    });
  }
  parse(e, t) {
    return this._client.responses.create(e, t)._thenUnwrap((n) => OT(n, e));
  }
  stream(e, t) {
    return m$.createResponse(this._client, e, t);
  }
  cancel(e, t) {
    return this._client.post(F`/responses/${e}/cancel`, t);
  }
  compact(e, t) {
    return this._client.post("/responses/compact", {
      body: e,
      ...t
    });
  }
};
vu.InputItems = GT;
vu.InputTokens = VT;
var HT = class extends re {
  retrieve(e, t) {
    return this._client.get(F`/skills/${e}/content`, {
      ...t,
      headers: te([{ Accept: "application/binary" }, t?.headers]),
      __binaryResponse: !0
    });
  }
}, qT = class extends re {
  retrieve(e, t, n) {
    const { skill_id: r } = t;
    return this._client.get(F`/skills/${r}/versions/${e}/content`, {
      ...n,
      headers: te([{ Accept: "application/binary" }, n?.headers]),
      __binaryResponse: !0
    });
  }
}, lh = class extends re {
  constructor() {
    super(...arguments), this.content = new qT(this._client);
  }
  create(e, t = {}, n) {
    return this._client.post(F`/skills/${e}/versions`, hu({
      body: t,
      ...n
    }, this._client));
  }
  retrieve(e, t, n) {
    const { skill_id: r } = t;
    return this._client.get(F`/skills/${r}/versions/${e}`, n);
  }
  list(e, t = {}, n) {
    return this._client.getAPIList(F`/skills/${e}/versions`, Oe, {
      query: t,
      ...n
    });
  }
  delete(e, t, n) {
    const { skill_id: r } = t;
    return this._client.delete(F`/skills/${r}/versions/${e}`, n);
  }
};
lh.Content = qT;
var _u = class extends re {
  constructor() {
    super(...arguments), this.content = new HT(this._client), this.versions = new lh(this._client);
  }
  create(e = {}, t) {
    return this._client.post("/skills", hu({
      body: e,
      ...t
    }, this._client));
  }
  retrieve(e, t) {
    return this._client.get(F`/skills/${e}`, t);
  }
  update(e, t, n) {
    return this._client.post(F`/skills/${e}`, {
      body: t,
      ...n
    });
  }
  list(e = {}, t) {
    return this._client.getAPIList("/skills", Oe, {
      query: e,
      ...t
    });
  }
  delete(e, t) {
    return this._client.delete(F`/skills/${e}`, t);
  }
};
_u.Content = HT;
_u.Versions = lh;
var KT = class extends re {
  create(e, t, n) {
    return this._client.post(F`/uploads/${e}/parts`, wn({
      body: t,
      ...n
    }, this._client));
  }
}, uh = class extends re {
  constructor() {
    super(...arguments), this.parts = new KT(this._client);
  }
  create(e, t) {
    return this._client.post("/uploads", {
      body: e,
      ...t
    });
  }
  cancel(e, t) {
    return this._client.post(F`/uploads/${e}/cancel`, t);
  }
  complete(e, t, n) {
    return this._client.post(F`/uploads/${e}/complete`, {
      body: t,
      ...n
    });
  }
};
uh.Parts = KT;
var y$ = async (e) => {
  const t = await Promise.allSettled(e), n = t.filter((o) => o.status === "rejected");
  if (n.length) {
    for (const o of n) console.error(o.reason);
    throw new Error(`${n.length} promise(s) failed - see the above errors`);
  }
  const r = [];
  for (const o of t) o.status === "fulfilled" && r.push(o.value);
  return r;
}, JT = class extends re {
  create(e, t, n) {
    return this._client.post(F`/vector_stores/${e}/file_batches`, {
      body: t,
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  retrieve(e, t, n) {
    const { vector_store_id: r } = t;
    return this._client.get(F`/vector_stores/${r}/file_batches/${e}`, {
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  cancel(e, t, n) {
    const { vector_store_id: r } = t;
    return this._client.post(F`/vector_stores/${r}/file_batches/${e}/cancel`, {
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  async createAndPoll(e, t, n) {
    const r = await this.create(e, t);
    return await this.poll(e, r.id, n);
  }
  listFiles(e, t, n) {
    const { vector_store_id: r, ...o } = t;
    return this._client.getAPIList(F`/vector_stores/${r}/file_batches/${e}/files`, Oe, {
      query: o,
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  async poll(e, t, n) {
    const r = te([n?.headers, {
      "X-Stainless-Poll-Helper": "true",
      "X-Stainless-Custom-Poll-Interval": n?.pollIntervalMs?.toString() ?? void 0
    }]);
    for (; ; ) {
      const { data: o, response: i } = await this.retrieve(t, { vector_store_id: e }, {
        ...n,
        headers: r
      }).withResponse();
      switch (o.status) {
        case "in_progress":
          let s = 5e3;
          if (n?.pollIntervalMs) s = n.pollIntervalMs;
          else {
            const a = i.headers.get("openai-poll-after-ms");
            if (a) {
              const u = parseInt(a);
              isNaN(u) || (s = u);
            }
          }
          await Vs(s);
          break;
        case "failed":
        case "cancelled":
        case "completed":
          return o;
      }
    }
  }
  async uploadAndPoll(e, { files: t, fileIds: n = [] }, r) {
    if (t == null || t.length == 0) throw new Error("No `files` provided to process. If you've already uploaded files you should use `.createAndPoll()` instead");
    const o = r?.maxConcurrency ?? 5, i = Math.min(o, t.length), s = this._client, a = t.values(), u = [...n];
    async function f(d) {
      for (let h of d) {
        const p = await s.files.create({
          file: h,
          purpose: "assistants"
        }, r);
        u.push(p.id);
      }
    }
    return await y$(Array(i).fill(a).map(f)), await this.createAndPoll(e, { file_ids: u });
  }
}, WT = class extends re {
  create(e, t, n) {
    return this._client.post(F`/vector_stores/${e}/files`, {
      body: t,
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  retrieve(e, t, n) {
    const { vector_store_id: r } = t;
    return this._client.get(F`/vector_stores/${r}/files/${e}`, {
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  update(e, t, n) {
    const { vector_store_id: r, ...o } = t;
    return this._client.post(F`/vector_stores/${r}/files/${e}`, {
      body: o,
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  list(e, t = {}, n) {
    return this._client.getAPIList(F`/vector_stores/${e}/files`, Oe, {
      query: t,
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  delete(e, t, n) {
    const { vector_store_id: r } = t;
    return this._client.delete(F`/vector_stores/${r}/files/${e}`, {
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  async createAndPoll(e, t, n) {
    const r = await this.create(e, t, n);
    return await this.poll(e, r.id, n);
  }
  async poll(e, t, n) {
    const r = te([n?.headers, {
      "X-Stainless-Poll-Helper": "true",
      "X-Stainless-Custom-Poll-Interval": n?.pollIntervalMs?.toString() ?? void 0
    }]);
    for (; ; ) {
      const o = await this.retrieve(t, { vector_store_id: e }, {
        ...n,
        headers: r
      }).withResponse(), i = o.data;
      switch (i.status) {
        case "in_progress":
          let s = 5e3;
          if (n?.pollIntervalMs) s = n.pollIntervalMs;
          else {
            const a = o.response.headers.get("openai-poll-after-ms");
            if (a) {
              const u = parseInt(a);
              isNaN(u) || (s = u);
            }
          }
          await Vs(s);
          break;
        case "failed":
        case "completed":
          return i;
      }
    }
  }
  async upload(e, t, n) {
    const r = await this._client.files.create({
      file: t,
      purpose: "assistants"
    }, n);
    return this.create(e, { file_id: r.id }, n);
  }
  async uploadAndPoll(e, t, n) {
    const r = await this.upload(e, t, n);
    return await this.poll(e, r.id, n);
  }
  content(e, t, n) {
    const { vector_store_id: r } = t;
    return this._client.getAPIList(F`/vector_stores/${r}/files/${e}/content`, du, {
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
}, wu = class extends re {
  constructor() {
    super(...arguments), this.files = new WT(this._client), this.fileBatches = new JT(this._client);
  }
  create(e, t) {
    return this._client.post("/vector_stores", {
      body: e,
      ...t,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  retrieve(e, t) {
    return this._client.get(F`/vector_stores/${e}`, {
      ...t,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  update(e, t, n) {
    return this._client.post(F`/vector_stores/${e}`, {
      body: t,
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
  list(e = {}, t) {
    return this._client.getAPIList("/vector_stores", Oe, {
      query: e,
      ...t,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  delete(e, t) {
    return this._client.delete(F`/vector_stores/${e}`, {
      ...t,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, t?.headers])
    });
  }
  search(e, t, n) {
    return this._client.getAPIList(F`/vector_stores/${e}/search`, du, {
      body: t,
      method: "post",
      ...n,
      headers: te([{ "OpenAI-Beta": "assistants=v2" }, n?.headers])
    });
  }
};
wu.Files = WT;
wu.FileBatches = JT;
var YT = class extends re {
  create(e, t) {
    return this._client.post("/videos", wn({
      body: e,
      ...t
    }, this._client));
  }
  retrieve(e, t) {
    return this._client.get(F`/videos/${e}`, t);
  }
  list(e = {}, t) {
    return this._client.getAPIList("/videos", Cs, {
      query: e,
      ...t
    });
  }
  delete(e, t) {
    return this._client.delete(F`/videos/${e}`, t);
  }
  createCharacter(e, t) {
    return this._client.post("/videos/characters", wn({
      body: e,
      ...t
    }, this._client));
  }
  downloadContent(e, t = {}, n) {
    return this._client.get(F`/videos/${e}/content`, {
      query: t,
      ...n,
      headers: te([{ Accept: "application/binary" }, n?.headers]),
      __binaryResponse: !0
    });
  }
  edit(e, t) {
    return this._client.post("/videos/edits", wn({
      body: e,
      ...t
    }, this._client));
  }
  extend(e, t) {
    return this._client.post("/videos/extensions", wn({
      body: e,
      ...t
    }, this._client));
  }
  getCharacter(e, t) {
    return this._client.get(F`/videos/characters/${e}`, t);
  }
  remix(e, t, n) {
    return this._client.post(F`/videos/${e}/remix`, hu({
      body: t,
      ...n
    }, this._client));
  }
}, wo, zT, Za, XT = class extends re {
  constructor() {
    super(...arguments), wo.add(this);
  }
  async unwrap(e, t, n = this._client.webhookSecret, r = 300) {
    return await this.verifySignature(e, t, n, r), JSON.parse(e);
  }
  async verifySignature(e, t, n = this._client.webhookSecret, r = 300) {
    if (typeof crypto > "u" || typeof crypto.subtle.importKey != "function" || typeof crypto.subtle.verify != "function") throw new Error("Webhook signature verification is only supported when the `crypto` global is defined");
    x(this, wo, "m", zT).call(this, n);
    const o = te([t]).values, i = x(this, wo, "m", Za).call(this, o, "webhook-signature"), s = x(this, wo, "m", Za).call(this, o, "webhook-timestamp"), a = x(this, wo, "m", Za).call(this, o, "webhook-id"), u = parseInt(s, 10);
    if (isNaN(u)) throw new Li("Invalid webhook timestamp format");
    const f = Math.floor(Date.now() / 1e3);
    if (f - u > r) throw new Li("Webhook timestamp is too old");
    if (u > f + r) throw new Li("Webhook timestamp is too new");
    const d = i.split(" ").map((g) => g.startsWith("v1,") ? g.substring(3) : g), h = n.startsWith("whsec_") ? Buffer.from(n.replace("whsec_", ""), "base64") : Buffer.from(n, "utf-8"), p = a ? `${a}.${s}.${e}` : `${s}.${e}`, m = await crypto.subtle.importKey("raw", h, {
      name: "HMAC",
      hash: "SHA-256"
    }, !1, ["verify"]);
    for (const g of d) try {
      const y = Buffer.from(g, "base64");
      if (await crypto.subtle.verify("HMAC", m, y, new TextEncoder().encode(p))) return;
    } catch {
      continue;
    }
    throw new Li("The given webhook signature does not match the expected signature");
  }
};
wo = /* @__PURE__ */ new WeakSet(), zT = function(t) {
  if (typeof t != "string" || t.length === 0) throw new Error("The webhook secret must either be set using the env var, OPENAI_WEBHOOK_SECRET, on the client class, OpenAI({ webhookSecret: '123' }), or passed to this function");
}, Za = function(t, n) {
  if (!t) throw new Error("Headers are required");
  const r = t.get(n);
  if (r == null) throw new Error(`Missing required header: ${n}`);
  return r;
};
var Uf, ch, ja, QT, pc = "workload-identity-auth", _e = class {
  constructor({ baseURL: e = fo("OPENAI_BASE_URL"), apiKey: t = fo("OPENAI_API_KEY"), organization: n = fo("OPENAI_ORG_ID") ?? null, project: r = fo("OPENAI_PROJECT_ID") ?? null, webhookSecret: o = fo("OPENAI_WEBHOOK_SECRET") ?? null, workloadIdentity: i, ...s } = {}) {
    if (Uf.add(this), ja.set(this, void 0), this.completions = new ST(this), this.chat = new Qd(this), this.embeddings = new bT(this), this.files = new RT(this), this.images = new DT(this), this.audio = new qs(this), this.moderations = new UT(this), this.models = new LT(this), this.fineTuning = new ei(this), this.graders = new ah(this), this.vectorStores = new wu(this), this.webhooks = new XT(this), this.beta = new jo(this), this.batches = new mT(this), this.uploads = new uh(this), this.responses = new vu(this), this.realtime = new yu(this), this.conversations = new th(this), this.evals = new rh(this), this.containers = new eh(this), this.skills = new _u(this), this.videos = new YT(this), i) {
      if (t && t !== pc) throw new ie("The `apiKey` and `workloadIdentity` arguments are mutually exclusive; only one can be passed at a time.");
      t = pc;
    } else if (t === void 0) throw new ie("Missing credentials. Please pass an `apiKey`, `workloadIdentity`, or set the `OPENAI_API_KEY` environment variable.");
    const a = {
      apiKey: t,
      organization: n,
      project: r,
      webhookSecret: o,
      workloadIdentity: i,
      ...s,
      baseURL: e || "https://api.openai.com/v1"
    };
    if (!a.dangerouslyAllowBrowser && cU()) throw new ie(`It looks like you're running in a browser-like environment.

This is disabled by default, as it risks exposing your secret API credentials to attackers.
If you understand the risks and have appropriate mitigations in place,
you can set the \`dangerouslyAllowBrowser\` option to \`true\`, e.g.,

new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety
`);
    this.baseURL = a.baseURL, this.timeout = a.timeout ?? ch.DEFAULT_TIMEOUT, this.logger = a.logger ?? console;
    const u = "warn";
    this.logLevel = u, this.logLevel = iy(a.logLevel, "ClientOptions.logLevel", this) ?? iy(fo("OPENAI_LOG"), "process.env['OPENAI_LOG']", this) ?? u, this.fetchOptions = a.fetchOptions, this.maxRetries = a.maxRetries ?? 2, this.fetch = a.fetch ?? NE(), ce(this, ja, mU, "f"), this._options = a, i && (this._workloadIdentityAuth = new kU(i, this.fetch)), this.apiKey = typeof t == "string" ? t : "Missing Key", this.organization = n, this.project = r, this.webhookSecret = o;
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
    return te([{ Authorization: `Bearer ${this.apiKey}` }]);
  }
  stringifyQuery(e) {
    return EU(e);
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${vo}`;
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${_E()}`;
  }
  makeStatusError(e, t, n, r) {
    return ft.generate(e, t, n, r);
  }
  async _callApiKey() {
    const e = this._options.apiKey;
    if (typeof e != "function") return !1;
    let t;
    try {
      t = await e();
    } catch (n) {
      throw n instanceof ie ? n : new ie(`Failed to get token from 'apiKey' function: ${n.message}`, { cause: n });
    }
    if (typeof t != "string" || !t) throw new ie(`Expected 'apiKey' function argument to return a string but it returned ${t}`);
    return this.apiKey = t, !0;
  }
  buildURL(e, t, n) {
    const r = !x(this, Uf, "m", QT).call(this) && n || this.baseURL, o = sU(e) ? new URL(e) : new URL(r + (r.endsWith("/") && e.startsWith("/") ? e.slice(1) : e)), i = this.defaultQuery(), s = Object.fromEntries(o.searchParams);
    return (!Yg(i) || !Yg(s)) && (t = {
      ...s,
      ...i,
      ...t
    }), typeof t == "object" && t && !Array.isArray(t) && (o.search = this.stringifyQuery(t)), o.toString();
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
    return this.request(Promise.resolve(n).then((r) => ({
      method: e,
      path: t,
      ...r
    })));
  }
  request(e, t = null) {
    return new HE(this, this.makeRequest(e, t, void 0));
  }
  async makeRequest(e, t, n) {
    const r = await e, o = r.maxRetries ?? this.maxRetries;
    t == null && (t = o), await this.prepareOptions(r);
    const { req: i, url: s, timeout: a } = await this.buildRequest(r, { retryCount: o - t });
    await this.prepareRequest(i, {
      url: s,
      options: r
    });
    const u = "log_" + (Math.random() * (1 << 24) | 0).toString(16).padStart(6, "0"), f = n === void 0 ? "" : `, retryOf: ${n}`, d = Date.now();
    if (it(this).debug(`[${u}] sending request`, Pr({
      retryOfRequestLogID: n,
      method: r.method,
      url: s,
      options: r,
      headers: i.headers
    })), r.signal?.aborted) throw new Ht();
    const h = new AbortController(), p = await this.fetchWithAuth(s, i, a, h).catch(Ef), m = Date.now();
    if (p instanceof globalThis.Error) {
      const y = `retrying, ${t} attempts remaining`;
      if (r.signal?.aborted) throw new Ht();
      const v = wf(p) || /timed? ?out/i.test(String(p) + ("cause" in p ? String(p.cause) : ""));
      if (t)
        return it(this).info(`[${u}] connection ${v ? "timed out" : "failed"} - ${y}`), it(this).debug(`[${u}] connection ${v ? "timed out" : "failed"} (${y})`, Pr({
          retryOfRequestLogID: n,
          url: s,
          durationMs: m - d,
          message: p.message
        })), this.retryRequest(r, t, n ?? u);
      throw it(this).info(`[${u}] connection ${v ? "timed out" : "failed"} - error; no more retries left`), it(this).debug(`[${u}] connection ${v ? "timed out" : "failed"} (error; no more retries left)`, Pr({
        retryOfRequestLogID: n,
        url: s,
        durationMs: m - d,
        message: p.message
      })), p instanceof xE || p instanceof oU ? p : v ? new Hd() : new cu({ cause: p });
    }
    const g = `[${u}${f}${[...p.headers.entries()].filter(([y]) => y === "x-request-id").map(([y, v]) => ", " + y + ": " + JSON.stringify(v)).join("")}] ${i.method} ${s} ${p.ok ? "succeeded" : "failed"} with status ${p.status} in ${m - d}ms`;
    if (!p.ok) {
      if (p.status === 401 && this._workloadIdentityAuth && !r.__metadata?.hasStreamingBody && !r.__metadata?.workloadIdentityTokenRefreshed)
        return await Zg(p.body), this._workloadIdentityAuth.invalidateToken(), this.makeRequest({
          ...r,
          __metadata: {
            ...r.__metadata,
            workloadIdentityTokenRefreshed: !0
          }
        }, t, n ?? u);
      const y = await this.shouldRetry(p);
      if (t && y) {
        const T = `retrying, ${t} attempts remaining`;
        return await Zg(p.body), it(this).info(`${g} - ${T}`), it(this).debug(`[${u}] response error (${T})`, Pr({
          retryOfRequestLogID: n,
          url: p.url,
          status: p.status,
          headers: p.headers,
          durationMs: m - d
        })), this.retryRequest(r, t, n ?? u, p.headers);
      }
      const v = y ? "error; no more retries left" : "error; not retryable";
      it(this).info(`${g} - ${v}`);
      const w = await p.text().catch((T) => Ef(T).message), _ = uU(w), S = _ ? void 0 : w;
      throw it(this).debug(`[${u}] response error (${v})`, Pr({
        retryOfRequestLogID: n,
        url: p.url,
        status: p.status,
        headers: p.headers,
        message: S,
        durationMs: Date.now() - d
      })), this.makeStatusError(p.status, _, S, p.headers);
    }
    return it(this).info(g), it(this).debug(`[${u}] response start`, Pr({
      retryOfRequestLogID: n,
      url: p.url,
      status: p.status,
      headers: p.headers,
      durationMs: m - d
    })), {
      response: p,
      options: r,
      controller: h,
      requestLogID: u,
      retryOfRequestLogID: n,
      startTime: d
    };
  }
  getAPIList(e, t, n) {
    return this.requestAPIList(t, n && "then" in n ? n.then((r) => ({
      method: "get",
      path: e,
      ...r
    })) : {
      method: "get",
      path: e,
      ...n
    });
  }
  requestAPIList(e, t) {
    const n = this.makeRequest(t, null, void 0);
    return new xU(this, n, e);
  }
  async fetchWithAuth(e, t, n, r) {
    if (this._workloadIdentityAuth) {
      const o = t.headers, i = o.get("Authorization");
      if (!i || i === `Bearer ${pc}`) {
        const s = await this._workloadIdentityAuth.getToken();
        o.set("Authorization", `Bearer ${s}`);
      }
    }
    return await this.fetchWithTimeout(e, t, n, r);
  }
  async fetchWithTimeout(e, t, n, r) {
    const { signal: o, method: i, ...s } = t || {}, a = this._makeAbort(r);
    o && o.addEventListener("abort", a, { once: !0 });
    const u = setTimeout(a, n), f = globalThis.ReadableStream && s.body instanceof globalThis.ReadableStream || typeof s.body == "object" && s.body !== null && Symbol.asyncIterator in s.body, d = {
      signal: r.signal,
      ...f ? { duplex: "half" } : {},
      method: "GET",
      ...s
    };
    i && (d.method = i.toUpperCase());
    try {
      return await this.fetch.call(void 0, e, d);
    } finally {
      clearTimeout(u);
    }
  }
  async shouldRetry(e) {
    const t = e.headers.get("x-should-retry");
    return t === "true" ? !0 : t === "false" ? !1 : e.status === 408 || e.status === 409 || e.status === 429 || e.status >= 500;
  }
  async retryRequest(e, t, n, r) {
    let o;
    const i = r?.get("retry-after-ms");
    if (i) {
      const a = parseFloat(i);
      Number.isNaN(a) || (o = a);
    }
    const s = r?.get("retry-after");
    if (s && !o) {
      const a = parseFloat(s);
      Number.isNaN(a) ? o = Date.parse(s) - Date.now() : o = a * 1e3;
    }
    if (o === void 0) {
      const a = e.maxRetries ?? this.maxRetries;
      o = this.calculateDefaultRetryTimeoutMillis(t, a);
    }
    return await Vs(o), this.makeRequest(e, t - 1, n);
  }
  calculateDefaultRetryTimeoutMillis(e, t) {
    const o = t - e;
    return Math.min(0.5 * Math.pow(2, o), 8) * (1 - Math.random() * 0.25) * 1e3;
  }
  async buildRequest(e, { retryCount: t = 0 } = {}) {
    const n = { ...e }, { method: r, path: o, query: i, defaultBaseURL: s } = n, a = this.buildURL(o, i, s);
    "timeout" in n && lU("timeout", n.timeout), n.timeout = n.timeout ?? this.timeout;
    const { bodyHeaders: u, body: f, isStreamingBody: d } = this.buildBody({ options: n });
    return d && (e.__metadata = {
      ...e.__metadata,
      hasStreamingBody: !0
    }), {
      req: {
        method: r,
        headers: await this.buildHeaders({
          options: e,
          method: r,
          bodyHeaders: u,
          retryCount: t
        }),
        ...n.signal && { signal: n.signal },
        ...globalThis.ReadableStream && f instanceof globalThis.ReadableStream && { duplex: "half" },
        ...f && { body: f },
        ...this.fetchOptions ?? {},
        ...n.fetchOptions ?? {}
      },
      url: a,
      timeout: n.timeout
    };
  }
  async buildHeaders({ options: e, method: t, bodyHeaders: n, retryCount: r }) {
    let o = {};
    this.idempotencyHeader && t !== "get" && (e.idempotencyKey || (e.idempotencyKey = this.defaultIdempotencyKey()), o[this.idempotencyHeader] = e.idempotencyKey);
    const i = te([
      o,
      {
        Accept: "application/json",
        "User-Agent": this.getUserAgent(),
        "X-Stainless-Retry-Count": String(r),
        ...e.timeout ? { "X-Stainless-Timeout": String(Math.trunc(e.timeout / 1e3)) } : {},
        ...pU(),
        "OpenAI-Organization": this.organization,
        "OpenAI-Project": this.project
      },
      await this.authHeaders(e),
      this._options.defaultHeaders,
      n,
      e.headers
    ]);
    return this.validateHeaders(i), i.values;
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
    const n = te([t]), r = typeof globalThis.ReadableStream < "u" && e instanceof globalThis.ReadableStream, o = !r && (typeof e == "string" || e instanceof ArrayBuffer || ArrayBuffer.isView(e) || typeof globalThis.Blob < "u" && e instanceof globalThis.Blob || e instanceof URLSearchParams || e instanceof FormData);
    return ArrayBuffer.isView(e) || e instanceof ArrayBuffer || e instanceof DataView || typeof e == "string" && n.values.has("content-type") || globalThis.Blob && e instanceof globalThis.Blob || e instanceof FormData || e instanceof URLSearchParams || r ? {
      bodyHeaders: void 0,
      body: e,
      isStreamingBody: !o
    } : typeof e == "object" && (Symbol.asyncIterator in e || Symbol.iterator in e && "next" in e && typeof e.next == "function") ? {
      bodyHeaders: void 0,
      body: DE(e),
      isStreamingBody: !0
    } : typeof e == "object" && n.values.get("content-type") === "application/x-www-form-urlencoded" ? {
      bodyHeaders: { "content-type": "application/x-www-form-urlencoded" },
      body: this.stringifyQuery(e),
      isStreamingBody: !1
    } : {
      ...x(this, ja, "f").call(this, {
        body: e,
        headers: n
      }),
      isStreamingBody: !1
    };
  }
};
ch = _e, ja = /* @__PURE__ */ new WeakMap(), Uf = /* @__PURE__ */ new WeakSet(), QT = function() {
  return this.baseURL !== "https://api.openai.com/v1";
};
_e.OpenAI = ch;
_e.DEFAULT_TIMEOUT = 6e5;
_e.OpenAIError = ie;
_e.APIError = ft;
_e.APIConnectionError = cu;
_e.APIConnectionTimeoutError = Hd;
_e.APIUserAbortError = Ht;
_e.NotFoundError = SE;
_e.ConflictError = AE;
_e.RateLimitError = bE;
_e.BadRequestError = wE;
_e.AuthenticationError = EE;
_e.InternalServerError = IE;
_e.PermissionDeniedError = TE;
_e.UnprocessableEntityError = CE;
_e.InvalidWebhookSignatureError = Li;
_e.toFile = FU;
_e.Completions = ST;
_e.Chat = Qd;
_e.Embeddings = bT;
_e.Files = RT;
_e.Images = DT;
_e.Audio = qs;
_e.Moderations = UT;
_e.Models = LT;
_e.FineTuning = ei;
_e.Graders = ah;
_e.VectorStores = wu;
_e.Webhooks = XT;
_e.Beta = jo;
_e.Batches = mT;
_e.Uploads = uh;
_e.Responses = vu;
_e.Realtime = yu;
_e.Conversations = th;
_e.Evals = rh;
_e.Containers = eh;
_e.Skills = _u;
_e.Videos = YT;
function v$(e) {
  try {
    return JSON.parse(e || "{}");
  } catch {
    return {};
  }
}
function Zt(e, t, n) {
  const r = String(n || "").trim();
  r && e.push({
    label: t,
    text: r
  });
}
function Ct(e) {
  if (e !== void 0)
    try {
      return JSON.parse(JSON.stringify(e));
    } catch {
      return;
    }
}
function dt(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function _$(e) {
  if (typeof e == "string") return e;
  if (e == null) return "{}";
  try {
    return JSON.stringify(e);
  } catch {
    return "{}";
  }
}
function w$(e, t = 0, n = "openai-tool") {
  if (!dt(e)) return null;
  const r = dt(e.function) ? e.function : null, o = String(r?.name || "").trim();
  if (!o) return null;
  const i = Ct(e) || {};
  return delete i.index, i.id = String(i.id || `${n}-${t + 1}`), i.type = "function", i.function = {
    ...Ct(r) || {},
    name: o,
    arguments: _$(r.arguments)
  }, i;
}
function Eu(e = [], t = "openai-tool") {
  return (Array.isArray(e) ? e : []).map((n, r) => w$(n, r, t)).filter(Boolean);
}
function fh(e) {
  if (!dt(e)) return null;
  const t = Ct(e) || {};
  if (Array.isArray(t.tool_calls)) {
    const n = Eu(t.tool_calls);
    n.length ? t.tool_calls = n : delete t.tool_calls;
  }
  return t;
}
function ss(e = [], t = "openai-tool") {
  return Eu(e, t).map((n, r) => ({
    id: n.id || `${t}-${Date.now()}-${r + 1}`,
    name: n.function.name,
    arguments: n.function.arguments
  }));
}
function ZT(e) {
  return typeof e == "string" ? e : Array.isArray(e) ? e.map((t) => t ? typeof t == "string" ? t : t.text || t.content || "" : "").filter(Boolean).join(`
`) : "";
}
function Eo(e = "") {
  const t = [];
  return {
    cleaned: String(e || "").replace(/<think>([\s\S]*?)<\/think>/gi, (n, r) => (Zt(t, "思考块", r), "")).trim(),
    thoughts: t
  };
}
function To(e = "") {
  return String(e || "").replace(/<tool_call>[\s\S]*?<\/tool_call>/g, "").replace(/<tool_call>[\s\S]*$/g, "").trim();
}
function xr(e, t, n) {
  if (t) {
    if (typeof t == "string") {
      Zt(e, n, t);
      return;
    }
    if (Array.isArray(t)) {
      t.forEach((r) => xr(e, r, n));
      return;
    }
    typeof t == "object" && (typeof t.text == "string" && Zt(e, n, t.text), typeof t.content == "string" && Zt(e, n, t.content), typeof t.reasoning_content == "string" && Zt(e, n, t.reasoning_content), typeof t.thinking == "string" && Zt(e, n, t.thinking), Array.isArray(t.summary) && t.summary.forEach((r) => {
      if (typeof r == "string") {
        Zt(e, "推理摘要", r);
        return;
      }
      r && typeof r == "object" && Zt(e, "推理摘要", r.text || r.content || "");
    }));
  }
}
function sr(e = {}, t = {}) {
  const n = [];
  return xr(n, e.reasoning_content, "推理文本"), xr(n, e.reasoning, "推理文本"), xr(n, e.reasoning_text, "推理文本"), xr(n, e.thinking, "思考块"), xr(n, t.reasoning_content, "推理文本"), xr(n, t.reasoning, "推理文本"), Array.isArray(e.content) && e.content.forEach((r) => {
    if (!(!r || typeof r != "object")) {
      if (r.type === "reasoning_text") {
        Zt(n, "推理文本", r.text);
        return;
      }
      if (r.type === "summary_text") {
        Zt(n, "推理摘要", r.text);
        return;
      }
      (r.type === "thinking" || r.type === "reasoning" || r.type === "reasoning_content") && Zt(n, "思考块", r.text || r.content || r.reasoning || "");
    }
  }), n;
}
function as(e = "") {
  const t = [/<tool_call>\s*([\s\S]*?)\s*<\/tool_call>/g], n = [];
  return t.forEach((r) => {
    [...e.matchAll(r)].forEach((o, i) => {
      try {
        const s = JSON.parse(o[1]);
        n.push({
          id: s.id || `tool-call-${i + 1}`,
          name: String(s.name || ""),
          arguments: typeof s.arguments == "string" ? s.arguments : JSON.stringify(s.arguments || {})
        });
      } catch {
        n.push({
          id: `tool-call-${i + 1}`,
          name: "",
          arguments: ""
        });
      }
    });
  }), n.filter((r) => r.name);
}
function dh(e) {
  const t = e?.providerPayload?.openaiCompatibleMessage;
  return !t || typeof t != "object" || Array.isArray(t) ? null : fh(t);
}
function jT(e = []) {
  for (let t = e.length - 1; t >= 0; t -= 1) if (e[t]?.role === "user") return t;
  return -1;
}
function E$(e) {
  if (Eu(e?.tool_calls).length > 0) return !0;
  const t = dh(e);
  return Array.isArray(t?.tool_calls) && t.tool_calls.length > 0;
}
function eS(e, t, n) {
  return e?.role !== "assistant" || t <= n ? !1 : E$(e);
}
function T$(e = "") {
  return /deepseek/i.test(String(e || ""));
}
function Ay(e, t = "") {
  return !dt(e) || !T$(t) || !Array.isArray(e.tool_calls) || !e.tool_calls.length || Object.prototype.hasOwnProperty.call(e, "reasoning_content") ? e : {
    ...e,
    reasoning_content: ""
  };
}
var Cy = /* @__PURE__ */ new Set([
  "content",
  "refusal",
  "arguments",
  "reasoning_content",
  "reasoning_text",
  "thinking",
  "text"
]);
function S$(e = [], t = []) {
  const n = Array.isArray(e) ? e.map((r) => Ct(r) || {}) : [];
  return (Array.isArray(t) ? t : []).forEach((r, o) => {
    const i = Ct(r) || {}, s = Number.isInteger(Number(r?.index)) ? Number(r.index) : o, a = n[s];
    n[s] = dt(a) ? zr(a, i, "tool_call") : i;
  }), n.filter((r) => r !== void 0);
}
function zr(e, t, n = "") {
  if (t === void 0) return e;
  if (e === void 0) return Ct(t);
  if (t === null && Cy.has(String(n || ""))) return e;
  if (n === "tool_calls" && Array.isArray(e) && Array.isArray(t)) return S$(e, t);
  if (typeof e == "string" && typeof t == "string")
    return Cy.has(String(n || "")) ? e === t ? e : t.startsWith(e) ? t : e.startsWith(t) ? e : `${e}${t}` : e === t ? e : Ct(t);
  if (Array.isArray(e) && Array.isArray(t)) return e.concat(Ct(t) || []);
  if (dt(e) && dt(t)) {
    const r = { ...e };
    return Object.entries(t).forEach(([o, i]) => {
      r[o] = zr(r[o], i, o);
    }), r;
  }
  return Ct(t);
}
function Ll(e = {}, t = {}) {
  const n = dt(e) ? Ct(e) || {} : {}, r = dt(t) ? Ct(t) || {} : {};
  return delete r.message, delete r.finish_reason, delete r.index, delete r.logprobs, delete r.delta, Object.entries(r).forEach(([o, i]) => {
    n[o] = zr(n[o], i, o);
  }), n.role || (n.role = "assistant"), fh(n) || { role: "assistant" };
}
function ls(e, t = {}) {
  const n = fh(Ll(e, t));
  if (!(!n || typeof n != "object" || Array.isArray(n)))
    return { openaiCompatibleMessage: n };
}
function A$(e = {}, t = {}) {
  return dt(e) ? dt(t) ? zr(Ct(e) || {}, t, "") : Ct(e) : Ct(t);
}
function $f(e, t = "") {
  const n = Array.isArray(e.messages) ? e.messages : [], r = jT(n);
  return n.map((o, i) => {
    if (eS(o, i, r)) {
      const a = dh(o);
      if (a) return Ay(a, t);
    }
    const s = {
      role: o.role,
      content: o.content
    };
    if (o.role === "tool" && o.tool_call_id && (s.tool_call_id = o.tool_call_id), o.role === "assistant" && Array.isArray(o.tool_calls) && o.tool_calls.length) {
      const a = Eu(o.tool_calls);
      a.length && (s.tool_calls = a);
    }
    return Ay(s, t);
  });
}
function by(e) {
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
function Ff(e) {
  const t = /* @__PURE__ */ new Map(), n = [], r = Array.isArray(e.messages) ? e.messages : [], o = jT(r);
  return r.forEach((i, s) => {
    if (eS(i, s, o)) {
      const a = dh(i);
      if (a) {
        n.push(a);
        return;
      }
    }
    if (i.role === "assistant" && Array.isArray(i.tool_calls) && i.tool_calls.length) {
      const a = i.tool_calls.map((u, f) => {
        const d = u.function?.name || "", h = u.id || `tool-call-${f + 1}`;
        return d && t.set(h, d), `<tool_call>${JSON.stringify({
          id: h,
          name: d,
          arguments: v$(u.function?.arguments || "{}")
        })}</tool_call>`;
      }).join(`
`);
      n.push({
        role: "assistant",
        content: [i.content || "", a].filter(Boolean).join(`

`)
      });
      return;
    }
    if (i.role === "tool") {
      const a = t.get(i.tool_call_id || "") || "unknown_tool", u = String(i.content || "");
      n.push({
        role: "user",
        content: [
          "<tool_result>",
          `name: ${a}`,
          "content:",
          u,
          "</tool_result>"
        ].join(`
`)
      });
      return;
    }
    n.push({
      role: i.role,
      content: i.content
    });
  }), !n.length || n[0].role !== "system" ? n.unshift({
    role: "system",
    content: by(e)
  }) : n[0] = {
    ...n[0],
    content: by({
      ...e,
      systemPrompt: n[0].content || e.systemPrompt
    })
  }, n;
}
function Iy(e, t) {
  typeof e.onStreamProgress == "function" && e.onStreamProgress({
    ...typeof t.text == "string" ? { text: t.text } : {},
    ...Array.isArray(t.thoughts) ? { thoughts: t.thoughts } : {}
  });
}
function Ry(e, t, n) {
  !e || !t || n === void 0 || (e[t] = zr(e[t], n, t));
}
function C$(e, t = []) {
  !Array.isArray(t) || !t.length || (Array.isArray(e.tool_calls) || (e.tool_calls = []), t.forEach((n) => {
    const r = Number(n?.index ?? 0), o = { ...e.tool_calls[r] || {} };
    Object.entries(n || {}).forEach(([i, s]) => {
      if (i !== "index" && !(i === "function" && s == null)) {
        if (i === "function" && dt(s)) {
          o.function = dt(o.function) ? { ...o.function } : {}, Object.entries(s).forEach(([a, u]) => {
            o.function[a] = zr(o.function[a], u, a);
          });
          return;
        }
        o[i] = zr(o[i], s, i);
      }
    }), e.tool_calls[r] = o;
  }));
}
function Of(e, t = {}) {
  if (!e || !t || typeof t != "object") return;
  Object.entries(t).forEach(([r, o]) => {
    r === "delta" || r === "finish_reason" || r === "index" || r === "logprobs" || Ry(e, r, o);
  });
  const n = dt(t.delta) ? t.delta : {};
  Object.entries(n).forEach(([r, o]) => {
    if (r === "tool_calls") {
      C$(e, o);
      return;
    }
    Ry(e, r, o);
  });
}
function Bf(e, t = {}) {
  if (!e || !dt(t)) return;
  const n = Number(t.index ?? 0), r = e.toolCalls[n] || {
    id: "",
    type: "function",
    function: {
      name: "",
      arguments: ""
    }
  }, o = dt(t.function) ? t.function : {};
  e.toolCalls[n] = {
    ...r,
    id: t.id || r.id,
    type: t.type || r.type,
    function: {
      name: o.name || r.function?.name || "",
      arguments: `${r.function?.arguments || ""}${o.arguments || ""}`
    }
  };
}
async function b$(e, t) {
  const n = e.body?.getReader?.();
  if (!n) throw new Error("openai_compatible_stream_missing_body");
  const r = new TextDecoder();
  let o = "";
  const i = /\r?\n\r?\n/;
  for (; ; ) {
    const { done: a, value: u } = await n.read();
    if (a) break;
    for (o += r.decode(u, { stream: !0 }); ; ) {
      const f = o.match(i);
      if (!f || typeof f.index != "number") break;
      const d = f.index, h = o.slice(0, d);
      o = o.slice(d + f[0].length);
      const p = h.split(/\r?\n/).filter((m) => m.startsWith("data:")).map((m) => m.slice(5).trimStart()).join(`
`).trim();
      !p || p === "[DONE]" || t(JSON.parse(p));
    }
  }
  const s = o.trim();
  if (s && s !== "[DONE]") {
    const a = s.split(/\r?\n/).filter((u) => u.startsWith("data:")).map((u) => u.slice(5).trimStart()).join(`
`).trim();
    a && a !== "[DONE]" && t(JSON.parse(a));
  }
}
var I$ = class {
  constructor(e) {
    this.config = e, this.client = new _e({
      apiKey: e.apiKey,
      baseURL: String(e.baseUrl || "https://api.openai.com/v1").replace(/\/$/, ""),
      timeout: Number(e.timeoutMs) || 900 * 1e3,
      maxRetries: 0,
      dangerouslyAllowBrowser: !0
    });
  }
  async streamNativeChatCompletions(e, t) {
    const n = `${String(this.config.baseUrl || "https://api.openai.com/v1").replace(/\/$/, "")}/chat/completions`, r = await fetch(n, {
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
    if (!r.ok) {
      const g = await r.text().catch(() => "");
      throw new Error(g || `openai_compatible_stream_http_${r.status}`);
    }
    const o = {
      content: "",
      toolCalls: []
    }, i = { role: "assistant" };
    let s = "stop", a = this.config.model;
    await b$(r, (g) => {
      a = g?.model || a;
      const y = g?.choices?.[0], v = y?.delta || {};
      Of(i, y), y?.finish_reason && (s = y.finish_reason), typeof v.content == "string" && (o.content += v.content), Array.isArray(v.tool_calls) && v.tool_calls.forEach((_) => {
        Bf(o, _);
      });
      const w = Eo(o.content);
      Iy(e, {
        text: o.toolCalls.filter((_) => _?.function?.name).length ? w.cleaned : To(w.cleaned),
        thoughts: sr(i, y).concat(w.thoughts)
      });
    });
    const u = ls(i), f = ss(o.toolCalls), d = Eo(o.content), h = sr(i, {});
    d.thoughts.forEach((g) => h.push(g));
    const p = f.length ? [] : as(d.cleaned), m = [...f, ...p];
    return {
      text: f.length ? d.cleaned : To(d.cleaned),
      toolCalls: m,
      thoughts: h,
      finishReason: s,
      model: a,
      provider: "openai-compatible",
      providerPayload: u
    };
  }
  async chat(e) {
    const t = (this.config.toolMode || "native") === "tagged-json" && Array.isArray(e.tools) && e.tools.length > 0, n = typeof e.onStreamProgress == "function", r = !t && Array.isArray(e.tools) && e.tools.length ? e.tools : null, o = {
      model: this.config.model,
      messages: t ? Ff(e) : $f(e, this.config.model),
      ...r ? {
        tools: r,
        tool_choice: e.toolChoice || "auto"
      } : {},
      ...e.maxTokens ? { max_tokens: e.maxTokens } : {}
    };
    if (!e.reasoning?.enabled && typeof e.temperature == "number" && (o.temperature = e.temperature), e.reasoning?.enabled && (o.reasoning_effort = e.reasoning.effort), n) {
      if (!t) return await this.streamNativeChatCompletions(e, o);
      const y = await this.client.chat.completions.create({
        ...o,
        stream: !0
      }, { signal: e.signal }), v = {
        content: "",
        toolCalls: []
      }, w = { role: "assistant" };
      let _ = "stop", S = this.config.model, T;
      for await (const z of y) {
        S = z.model || S;
        const J = z.choices?.[0], ne = J?.delta || {};
        Of(w, J), J?.finish_reason && (_ = J.finish_reason), typeof ne.content == "string" && (v.content += ne.content), Array.isArray(ne.tool_calls) && ne.tool_calls.forEach((pe) => {
          Bf(v, pe);
        });
        const H = Eo(v.content);
        Iy(e, {
          text: v.toolCalls.filter((pe) => pe?.function?.name).length ? H.cleaned : To(H.cleaned),
          thoughts: sr(w, J).concat(H.thoughts)
        });
      }
      const C = (typeof y.finalChatCompletion == "function" ? await y.finalChatCompletion() : null)?.choices?.[0] || null, E = A$(w, Ll(C?.message || w, C || {}));
      T = ls(E);
      const M = ss(v.toolCalls), I = Eo(v.content), D = sr(E, C || {});
      I.thoughts.forEach((z) => D.push(z));
      const $ = M.length ? [] : as(I.cleaned), q = [...M, ...$];
      return {
        text: M.length ? I.cleaned : To(I.cleaned),
        toolCalls: q,
        thoughts: D,
        finishReason: _,
        model: S,
        provider: "openai-compatible",
        providerPayload: T
      };
    }
    const i = await this.client.chat.completions.create(o, { signal: e.signal }), s = i.choices?.[0] || {}, a = s.message || {}, u = sr(a, s), f = ss(a.tool_calls || []), d = Eo(ZT(a.content));
    d.thoughts.forEach((y) => u.push(y));
    const h = f.length ? [] : as(d.cleaned), p = [...f, ...h], m = f.length ? d.cleaned : To(d.cleaned), g = Ll(a, s);
    return {
      text: m,
      toolCalls: p,
      thoughts: u,
      finishReason: s.finish_reason || "stop",
      model: i.model || this.config.model,
      provider: "openai-compatible",
      providerPayload: ls(g)
    };
  }
};
function tS(e, t) {
  return {
    type: "message",
    role: e,
    content: R$(t)
  };
}
function Ul(e) {
  return {
    role: "assistant",
    content: typeof e == "string" ? e : ""
  };
}
function R$(e) {
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
function $l(e, t, n) {
  const r = String(n || "").trim();
  r && e.push({
    label: t,
    text: r
  });
}
function Py(e, t = [], n = {}) {
  (t || []).forEach((r) => {
    if (!(!r || typeof r != "object")) {
      if (r.type === "reasoning_text") {
        $l(e, n.reasoning || "推理文本", r.text);
        return;
      }
      r.type === "summary_text" && $l(e, n.summary || "推理摘要", r.text);
    }
  });
}
function P$(e = []) {
  const t = [];
  return (e || []).forEach((n) => {
    !n || typeof n != "object" || n.type === "reasoning" && (Py(t, n.content, {
      reasoning: "推理文本",
      summary: "推理摘要"
    }), Py(t, n.summary, {
      reasoning: "推理文本",
      summary: "推理摘要"
    }));
  }), t;
}
function x$(e) {
  const t = [String(e.systemPrompt || "").trim(), ...(e.messages || []).filter((n) => n.role === "system").map((n) => String(n.content || "").trim())].filter(Boolean);
  return t.length ? [...new Set(t)].join(`

`) : "";
}
function M$(e) {
  const t = e?.choices?.[0]?.message?.content;
  if (typeof t == "string" && t.trim()) return t.trim();
  if (typeof e?.output_text == "string" && e.output_text.trim()) return e.output_text.trim();
  const n = [];
  return (Array.isArray(e?.output) ? e.output : []).forEach((r) => {
    if (!(!r || typeof r != "object")) {
      if (r.type === "message" && Array.isArray(r.content)) {
        r.content.forEach((o) => {
          if (!(!o || typeof o != "object")) {
            if (o.type === "output_text" && typeof o.text == "string" && o.text.trim()) {
              n.push(o.text.trim());
              return;
            }
            o.type === "refusal" && typeof o.refusal == "string" && o.refusal.trim() && n.push(o.refusal.trim());
          }
        });
        return;
      }
      typeof r.text == "string" && r.text.trim() && n.push(r.text.trim());
    }
  }), n.join(`
`).trim();
}
function N$(e) {
  const t = e?.choices?.[0], n = t?.message?.content, r = String(t?.finish_reason || "");
  if (typeof n != "string" || !n.trim()) return null;
  const o = n.toLowerCase();
  return !o.includes("proxy error") || !o.includes("/responses") && !r.toLowerCase().includes("proxy error") ? null : n.trim();
}
function k$(e) {
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
        n.content?.trim() && t.push(Ul(n.content)), n.tool_calls.forEach((r, o) => {
          t.push({
            type: "function_call",
            call_id: r.id || `function_call_${o + 1}`,
            name: r.function?.name || "",
            arguments: r.function?.arguments || "{}",
            status: "completed"
          });
        });
        continue;
      }
      if (n.role === "assistant") {
        t.push(Ul(n.content || ""));
        continue;
      }
      t.push(n.role === "user" ? tS(n.role, n.content || "") : {
        role: n.role,
        content: typeof n.content == "string" ? n.content : ""
      });
    }
  return t;
}
function D$(e) {
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
      n.content?.trim() && t.push(Ul(n.content)), n.tool_calls.forEach((r, o) => {
        t.push({
          type: "function_call",
          call_id: r.id || `function_call_${o + 1}`,
          name: r.function?.name || "",
          arguments: r.function?.arguments || "{}",
          status: "completed"
        });
      });
      continue;
    }
    if (n.role === "assistant") {
      t.push(Ul(n.content || ""));
      continue;
    }
    t.push(n.role === "user" ? tS(n.role, n.content || "") : {
      role: n.role,
      content: typeof n.content == "string" ? n.content : ""
    });
  }
  return t;
}
function L$(e) {
  try {
    return new URL(String(e || "https://api.openai.com/v1")).hostname === "api.openai.com";
  } catch {
    return !1;
  }
}
function U$(e) {
  const t = String(e?.message || e || "").toLowerCase();
  return t.includes("instructions") || t.includes("unsupported") || t.includes("unknown parameter") || t.includes("invalid input");
}
function $$(e, t) {
  typeof e.onStreamProgress == "function" && e.onStreamProgress({
    ...typeof t.text == "string" ? { text: t.text } : {},
    ...Array.isArray(t.thoughts) ? { thoughts: t.thoughts } : {}
  });
}
function mc(e, t) {
  const [n = "0", r = "0"] = String(e || "").split(":"), [o = "0", i = "0"] = String(t || "").split(":");
  return Number(n) - Number(o) || Number(r) - Number(i);
}
var F$ = class {
  constructor(e) {
    this.config = e, this.client = new _e({
      apiKey: e.apiKey,
      baseURL: String(e.baseUrl || "https://api.openai.com/v1").replace(/\/$/, ""),
      timeout: Number(e.timeoutMs) || 900 * 1e3,
      maxRetries: 0,
      dangerouslyAllowBrowser: !0
    });
  }
  async chat(e) {
    const t = (u) => {
      const f = N$(u);
      if (f) {
        const h = new Error(f);
        throw h.name = "ProxyEndpointError", h.rawDisplay = f, h;
      }
      const d = Array.isArray(u.output) ? u.output : [];
      return {
        output: d,
        thoughts: P$(d),
        toolCalls: d.filter((h) => h.type === "function_call" && h.name).map((h, p) => ({
          id: h.call_id || `response-tool-${p + 1}`,
          name: h.name || "",
          arguments: h.arguments || "{}"
        })),
        text: M$(u)
      };
    }, n = (u = !1) => {
      const f = {
        model: this.config.model,
        instructions: u ? void 0 : x$(e) || void 0,
        input: u ? D$(e) : k$(e),
        ...Array.isArray(e.tools) && e.tools.length ? {
          tools: e.tools.map((d) => ({
            type: "function",
            name: d.function.name,
            description: d.function.description,
            parameters: d.function.parameters
          })),
          tool_choice: e.toolChoice || "auto"
        } : {},
        ...e.maxTokens ? { max_output_tokens: e.maxTokens } : {}
      };
      return !e.reasoning?.enabled && typeof e.temperature == "number" && (f.temperature = e.temperature), e.reasoning?.enabled && (f.reasoning = {
        effort: e.reasoning.effort,
        summary: "detailed"
      }), f;
    }, r = async (u = !1) => {
      const f = n(u);
      return await this.client.responses.create(f, { signal: e.signal });
    }, o = async (u = !1) => {
      const f = n(u), d = this.client.responses.stream(f, { signal: e.signal }), h = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map(), g = () => {
        const y = [];
        Array.from(p.entries()).sort(([v], [w]) => mc(v, w)).forEach(([, v]) => $l(y, "推理文本", v)), Array.from(m.entries()).sort(([v], [w]) => mc(v, w)).forEach(([, v]) => $l(y, "推理摘要", v)), $$(e, {
          text: Array.from(h.entries()).sort(([v], [w]) => mc(v, w)).map(([, v]) => v).join(`
`).trim(),
          thoughts: y
        });
      };
      return d.on("response.output_text.delta", (y) => {
        const v = `${y.output_index}:${y.content_index}`;
        h.set(v, `${h.get(v) || ""}${y.delta}`), g();
      }), d.on("response.reasoning_text.delta", (y) => {
        const v = `${y.output_index}:${y.content_index}`;
        p.set(v, `${p.get(v) || ""}${y.delta}`), g();
      }), d.on("response.reasoning_summary_text.delta", (y) => {
        const v = `${y.output_index}:${y.summary_index}`;
        m.set(v, `${m.get(v) || ""}${y.delta}`), g();
      }), await d.finalResponse();
    }, i = !L$(this.config.baseUrl);
    let s, a;
    try {
      s = typeof e.onStreamProgress == "function" ? await o(!1) : await r(!1), a = t(s), i && !a.text && !a.toolCalls.length && (s = typeof e.onStreamProgress == "function" ? await o(!0) : await r(!0), a = t(s));
    } catch (u) {
      if (!i || !U$(u)) throw u;
      s = typeof e.onStreamProgress == "function" ? await o(!0) : await r(!0), a = t(s);
    }
    return {
      text: a.text,
      toolCalls: a.toolCalls,
      thoughts: a.thoughts,
      finishReason: s.incomplete_details?.reason || s.status || "stop",
      model: s.model || this.config.model,
      provider: "openai-responses"
    };
  }
};
async function O$(e, t) {
  const n = e.body?.getReader?.();
  if (!n) throw new Error("host_chat_completions_stream_missing_body");
  const r = new TextDecoder();
  let o = "";
  const i = /\r?\n\r?\n/, s = (u) => {
    const f = u.split(/\r?\n/).filter((d) => d.startsWith("data:")).map((d) => d.slice(5).trimStart()).join(`
`).trim();
    !f || f === "[DONE]" || t(JSON.parse(f));
  };
  for (; ; ) {
    const { done: u, value: f } = await n.read();
    if (u) break;
    for (o += r.decode(f, { stream: !0 }); ; ) {
      const d = o.match(i);
      if (!d || typeof d.index != "number") break;
      const h = o.slice(0, d.index);
      o = o.slice(d.index + d[0].length), s(h);
    }
  }
  const a = o.trim();
  a && s(a);
}
var hh = "openai", nS = "claude", rS = "makersuite", oS = "/api/backends/chat-completions/generate", B$ = Object.freeze({
  [nS]: "https://api.anthropic.com/v1",
  [rS]: "https://generativelanguage.googleapis.com"
}), G$ = null;
function V$(e) {
  return String(e || "").trim().replace(/\/+$/, "");
}
function H$(e, t) {
  const n = V$(e);
  return t === "claude" ? !n || /\/v\d[\w.-]*$/i.test(n) ? n : `${n}/v1` : t === "makersuite" ? n.replace(/\/v\d[\w.-]*$/i, "") : n;
}
function iS() {
  return {
    "Content-Type": "application/json",
    ...G$?.() || {},
    Accept: "application/json"
  };
}
function q$(e = "") {
  return /^\s*<!DOCTYPE\s+html/i.test(String(e || ""));
}
function K$(e = "") {
  return /invalid csrf token/i.test(String(e || ""));
}
function J$() {
  return "酒馆当前页面的 CSRF token 已失效，请按 F5 刷新并重新进入酒馆后再试。";
}
function Fl(e = "", t = "") {
  return K$(e) || q$(e) ? J$() : String(e || t || "").trim();
}
function W$(e = {}, t = hh) {
  const n = H$(e.baseUrl, t), r = String(e.apiKey || "").trim(), o = B$[t] || "", i = n || (r ? o : ""), s = { chat_completion_source: t || "openai" };
  return i && (s.reverse_proxy = i), r && (s.proxy_password = r), s;
}
function Y$(e = {}) {
  return Object.keys(e).forEach((t) => {
    (e[t] === void 0 || e[t] === "") && delete e[t];
  }), e;
}
function ph(e = {}, t = {}, n = [], r = !1, o = hh) {
  return Y$({
    ...W$(e, o),
    stream: !!r,
    messages: n,
    model: e.model,
    max_tokens: t.maxTokens,
    temperature: t.reasoning?.enabled ? void 0 : t.temperature,
    tools: Array.isArray(t.tools) && t.tools.length ? t.tools : void 0,
    tool_choice: Array.isArray(t.tools) && t.tools.length ? t.toolChoice || "auto" : void 0,
    use_sysprompt: o === "openai" ? void 0 : !0,
    reasoning_effort: t.reasoning?.enabled ? t.reasoning.effort : void 0,
    include_reasoning: o === "openai" ? void 0 : t.reasoning?.enabled ? !0 : void 0
  });
}
function z$(e = {}, t = {}, n = [], r = !1) {
  return ph(e, t, n, r, hh);
}
function X$(e = {}, t = {}, n = [], r = !1) {
  return ph(e, t, n, r, nS);
}
function Q$(e = {}, t = {}, n = [], r = !1) {
  return ph(e, t, n, r, rS);
}
async function mh(e = {}, t = {}) {
  const n = await fetch(oS, {
    method: "POST",
    headers: iS(),
    body: JSON.stringify({
      ...e,
      stream: !1
    }),
    signal: t.signal
  }), r = await n.text();
  let o = null;
  try {
    o = r ? JSON.parse(r) : {};
  } catch (i) {
    throw new Error(`酒馆后端生成失败：${Fl(r, String(i?.message || i))}`);
  }
  if (!n.ok || o?.error) {
    const i = Fl(o?.error?.message || o?.message || r, `HTTP ${n.status}`);
    throw new Error(`酒馆后端生成失败：${i}`);
  }
  return o;
}
async function gh(e = {}, t, n = {}) {
  const r = await fetch(oS, {
    method: "POST",
    headers: iS(),
    body: JSON.stringify({
      ...e,
      stream: !0
    }),
    signal: n.signal
  });
  if (!r.ok) {
    const o = await r.text().catch(() => "");
    throw new Error(Fl(o, `酒馆后端流式生成失败：HTTP ${r.status}`));
  }
  await O$(r, (o) => {
    if (o?.error) {
      const i = Fl(o.error?.message || o.message || JSON.stringify(o.error), "酒馆后端流式生成失败");
      throw new Error(i);
    }
    t(o);
  });
}
function Xr(e) {
  if (e !== void 0)
    try {
      return JSON.parse(JSON.stringify(e));
    } catch {
      return;
    }
}
function Z$(e = "") {
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
function j$(e = []) {
  const t = Array.isArray(e) ? Xr(e) : null;
  return Array.isArray(t) && t.length ? t : null;
}
function eF(e = {}) {
  const t = Array.isArray(e.messages) ? e.messages : [], n = [];
  return t.forEach((r) => {
    if (!r || typeof r != "object") return;
    const o = Xr(r) || {}, i = j$(o?.providerPayload?.anthropicContent);
    delete o.providerPayload, o.role === "assistant" && i && (delete o.tool_calls, o.content = i), n.push(o);
  }), n;
}
function tF(e = []) {
  return (Array.isArray(e) ? e : []).map((t) => {
    if (!t || typeof t != "object") return null;
    if (t.type === "text") return {
      type: "text",
      text: String(t.text || "")
    };
    if (t.type === "tool_use" && t.name) {
      if (t.inputJson !== void 0) {
        const r = Z$(t.inputJson);
        return {
          type: "tool_use",
          id: String(t.id || t.name),
          name: String(t.name),
          input: r.input,
          ...r.ok ? {} : {
            invalidInputJson: r.raw,
            inputParseError: r.error
          }
        };
      }
      const n = Xr(t.input);
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
    } : Xr(t) || null;
  }).filter(Boolean);
}
function nF(e = []) {
  return e.map((t) => !t || typeof t != "object" ? null : t.type === "tool_use" && t.name ? {
    type: "tool_use",
    id: t.id,
    name: t.name,
    input: Xr(t.input) || {}
  } : Xr(t) || null).filter(Boolean);
}
function rF(e = []) {
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
function sS(e = [], t = {}) {
  const n = tF(e), r = n.filter((o) => o.type === "tool_use" && o.name).map((o, i) => ({
    id: o.id || `st-claude-tool-${i + 1}`,
    name: o.name,
    arguments: o.invalidInputJson !== void 0 ? o.invalidInputJson : JSON.stringify(o.input || {})
  }));
  return {
    text: n.filter((o) => o.type === "text").map((o) => o.text || "").join(`
`),
    toolCalls: r,
    thoughts: n.filter((o) => o.type === "thinking" || o.type === "redacted_thinking").map((o) => ({
      label: o.type === "thinking" ? "思考块" : "已脱敏思考块",
      text: o.type === "thinking" ? o.thinking || "" : o.data || ""
    })).filter((o) => o.text),
    finishReason: t.finishReason || "stop",
    model: t.model || "",
    provider: "sillytavern-claude",
    providerPayload: n.length ? { anthropicContent: nF(n) } : void 0
  };
}
function oF(e, t) {
  typeof e.onStreamProgress == "function" && e.onStreamProgress({
    ...typeof t.text == "string" ? { text: t.text } : {},
    ...Array.isArray(t.thoughts) ? { thoughts: t.thoughts } : {}
  });
}
function iF(e, t = {}) {
  const n = [];
  let r = "stop", o = t.model || "";
  const i = (a, u = {}) => {
    const f = Number.isInteger(Number(a)) ? Number(a) : n.length;
    return n[f] ? n[f] = {
      ...n[f],
      ...u
    } : n[f] = { ...u }, n[f];
  }, s = () => {
    const a = rF(n);
    oF(e, {
      text: a.text,
      thoughts: a.thoughts
    });
  };
  return {
    accept(a = {}) {
      if (a?.message?.model && (o = a.message.model), a.type === "content_block_start") {
        i(a.index, Xr(a.content_block) || {}), s();
        return;
      }
      if (a.type === "content_block_delta") {
        const u = i(a.index), f = a.delta || {};
        f.type === "text_delta" ? (u.type = u.type || "text", u.text = `${u.text || ""}${f.text || ""}`) : f.type === "input_json_delta" ? (u.type = u.type || "tool_use", u.inputJson = `${u.inputJson || ""}${f.partial_json || ""}`) : f.type === "thinking_delta" ? (u.type = u.type || "thinking", u.thinking = `${u.thinking || ""}${f.thinking || ""}`) : f.type === "signature_delta" && (u.signature = `${u.signature || ""}${f.signature || ""}`), s();
        return;
      }
      a.type === "message_delta" && (r = a.delta?.stop_reason || r);
    },
    result() {
      return sS(n, {
        finishReason: r,
        model: o
      });
    }
  };
}
var sF = class {
  constructor(e) {
    this.config = e;
  }
  buildMessages(e) {
    return eF(e);
  }
  async chat(e) {
    const t = typeof e.onStreamProgress == "function", n = this.buildMessages(e), r = X$(this.config, e, n, t);
    if (t) {
      const i = iF(e, this.config);
      return await gh(r, (s) => {
        i.accept(s);
      }, { signal: e.signal }), i.result();
    }
    const o = await mh(r, { signal: e.signal });
    return sS(Array.isArray(o?.content) ? o.content : [{
      type: "text",
      text: o?.choices?.[0]?.message?.content || ""
    }], {
      finishReason: o?.stop_reason || o?.choices?.[0]?.finish_reason || "stop",
      model: o?.model || this.config.model
    });
  }
};
function yh(e) {
  if (e !== void 0)
    try {
      return JSON.parse(JSON.stringify(e));
    } catch {
      return;
    }
}
function Go(e) {
  if (typeof e == "string") return {
    role: "model",
    parts: e ? [{ text: e }] : []
  };
  if (!e || typeof e != "object") return {
    role: "model",
    parts: []
  };
  const t = yh(e) || {};
  return t.role = t.role || "model", t.parts = Array.isArray(t.parts) ? t.parts : [], t;
}
function aF(e) {
  const t = Array.isArray(e?.providerPayload?.googleContents) ? e.providerPayload.googleContents : [];
  if (t.length) return t.map((o) => Go(o)).filter((o) => Array.isArray(o.parts) && o.parts.length);
  const n = e?.providerPayload?.googleContent, r = Go(n);
  return r.parts.length ? [r] : [];
}
function lF(e = {}) {
  const t = String(e?.mimeType || "").trim(), n = String(e?.data || "").trim();
  if (!t || !n) return null;
  const r = `data:${t};base64,${n}`;
  return t.startsWith("image/") ? {
    type: "image_url",
    image_url: { url: r }
  } : t.startsWith("video/") ? {
    type: "video_url",
    video_url: { url: r }
  } : t.startsWith("audio/") ? {
    type: "audio_url",
    audio_url: { url: r }
  } : null;
}
function uF(e = {}, t = 0) {
  const n = Go(e);
  if (!n.parts.length) return null;
  const r = {
    role: n.role === "user" ? "user" : "assistant",
    content: []
  }, o = n.parts.find((s) => !s?.thought && typeof s?.text == "string" && typeof s?.thoughtSignature == "string" && s.thoughtSignature)?.thoughtSignature || "", i = [];
  return n.parts.forEach((s) => {
    if (!s || typeof s != "object") return;
    if (!s.thought && typeof s.text == "string" && s.text) {
      r.content.push({
        type: "text",
        text: s.text
      });
      return;
    }
    if (s.functionCall?.name) {
      i.push({
        id: String(s.functionCall.id || `st-google-tool-${t + 1}-${i.length + 1}`),
        type: "function",
        function: {
          name: String(s.functionCall.name || ""),
          arguments: JSON.stringify(s.functionCall.args || {})
        },
        ...typeof s.thoughtSignature == "string" && s.thoughtSignature ? { signature: s.thoughtSignature } : {}
      });
      return;
    }
    const a = lF(s.inlineData);
    a && r.content.push(a);
  }), i.length && r.content.push({
    type: "tool_calls",
    tool_calls: i
  }), o && r.content.some((s) => s?.type === "text") && (r.signature = o), r.content.length ? r : null;
}
function cF(e = {}) {
  const t = Array.isArray(e.messages) ? e.messages : [], n = [];
  return t.forEach((r) => {
    if (!r || typeof r != "object") return;
    const o = aF(r);
    if (r.role === "assistant" && o.length) {
      o.forEach((s, a) => {
        const u = uF(s, a);
        u && n.push(u);
      });
      return;
    }
    const i = yh(r) || {};
    delete i.providerPayload, n.push(i);
  }), n;
}
function aS(e = {}) {
  return Go(e?.responseContent || e?.candidates?.[0]?.content || "");
}
function lS(e = {}) {
  return (e.parts || []).filter((t) => !t?.thought && typeof t?.text == "string" && t.text).map((t) => t.text).join(`
`);
}
function uS(e = {}) {
  return (e.parts || []).filter((t) => t?.thought && typeof t.text == "string" && t.text.trim()).map((t, n) => ({
    label: `思考块 ${n + 1}`,
    text: t.text.trim()
  }));
}
function cS(e = {}) {
  return (e.parts || []).map((t) => t?.functionCall || null).filter((t) => t?.name).map((t, n) => ({
    id: t.id || `st-google-tool-${n + 1}`,
    name: t.name,
    arguments: JSON.stringify(t.args || {})
  }));
}
function fF(e, t) {
  const n = String(t || ""), r = String(e || "");
  return n ? !r || n.startsWith(r) ? n : r.endsWith(n) ? r : `${r}${n}` : r;
}
function dF(e = [], t = []) {
  const n = Array.isArray(e) ? [...e] : [];
  return t.forEach((r) => {
    const o = [
      r.id || "",
      r.name || "",
      r.arguments || ""
    ].join("\0");
    n.some((i) => [
      i.id || "",
      i.name || "",
      i.arguments || ""
    ].join("\0") === o) || n.push(r);
  }), n;
}
function fS(e) {
  const t = Go(e);
  return t.parts.length ? {
    googleContent: t,
    googleContents: [t]
  } : void 0;
}
function hF(e = {}, t = {}) {
  const n = aS(e), r = e?.choices?.[0]?.message?.content || "";
  return {
    text: lS(n) || r,
    toolCalls: cS(n),
    thoughts: uS(n),
    finishReason: e?.candidates?.[0]?.finishReason || e?.choices?.[0]?.finish_reason || t.finishReason || "STOP",
    model: e?.model || e?.modelVersion || t.model || "",
    provider: "sillytavern-google",
    providerPayload: fS(n)
  };
}
function pF(e, t) {
  typeof e.onStreamProgress == "function" && e.onStreamProgress({
    ...typeof t.text == "string" ? { text: t.text } : {},
    ...Array.isArray(t.thoughts) ? { thoughts: t.thoughts } : {}
  });
}
function mF(e, t = {}) {
  let n = "", r = [], o = [], i = "STOP", s = t.model || "";
  const a = [];
  return {
    accept(u = {}) {
      s = u.model || u.modelVersion || s, i = u?.candidates?.[0]?.finishReason || i;
      const f = aS(u);
      f.parts.length && a.push(...yh(f.parts) || []), n = fF(n, lS(f)), r = dF(r, cS(f));
      const d = uS(f);
      d.length && (o = d), pF(e, {
        text: n,
        thoughts: o
      });
    },
    result() {
      const u = Go({
        role: "model",
        parts: a.length ? a : n ? [{ text: n }] : []
      });
      return {
        text: n,
        toolCalls: r,
        thoughts: o,
        finishReason: i,
        model: s,
        provider: "sillytavern-google",
        providerPayload: fS(u)
      };
    }
  };
}
var gF = class {
  constructor(e) {
    this.config = e;
  }
  buildMessages(e) {
    return cF(e);
  }
  async chat(e) {
    const t = typeof e.onStreamProgress == "function", n = this.buildMessages(e), r = Q$(this.config, e, n, t);
    if (t) {
      const o = mF(e, this.config);
      return await gh(r, (i) => {
        o.accept(i);
      }, { signal: e.signal }), o.result();
    }
    return hF(await mh(r, { signal: e.signal }), { model: this.config.model });
  }
};
function yF(e, t) {
  typeof e.onStreamProgress == "function" && e.onStreamProgress({
    ...typeof t.text == "string" ? { text: t.text } : {},
    ...Array.isArray(t.thoughts) ? { thoughts: t.thoughts } : {}
  });
}
function gc(e, t = []) {
  const n = Eo(e);
  return {
    thinkTagged: n,
    cleanedText: t.length ? n.cleaned : To(n.cleaned)
  };
}
function vF(e) {
  const t = String(e?.message || e || "");
  return /Cannot read properties of null \(reading ['"]function['"]\)/i.test(t) || /reading ['"]function['"]/i.test(t) || /badresponsestatuscode/i.test(t);
}
var _F = class {
  constructor(e) {
    this.config = e;
  }
  buildMessages(e) {
    return (this.config.toolMode || "native") === "tagged-json" && Array.isArray(e.tools) && e.tools.length > 0 ? Ff(e) : $f(e, this.config.model);
  }
  async streamChat(e, t) {
    const n = {
      content: "",
      toolCalls: []
    }, r = { role: "assistant" };
    let o = "stop", i = this.config.model;
    await gh(t, (h) => {
      i = h?.model || i;
      const p = h?.choices?.[0] || {}, m = p.delta || {};
      Of(r, p), p.finish_reason && (o = p.finish_reason), typeof m.content == "string" && (n.content += m.content), Array.isArray(m.tool_calls) && m.tool_calls.forEach((w) => {
        Bf(n, w);
      });
      const g = n.toolCalls.filter((w) => w?.function?.name), { thinkTagged: y, cleanedText: v } = gc(n.content, g);
      yF(e, {
        text: v,
        thoughts: sr(r, p).concat(y.thoughts)
      });
    }, { signal: e.signal });
    const s = ss(n.toolCalls, "st-openai-tool"), { thinkTagged: a, cleanedText: u } = gc(n.content, s), f = sr(r, {});
    a.thoughts.forEach((h) => f.push(h));
    const d = s.length ? [] : as(a.cleaned);
    return {
      text: u,
      toolCalls: [...s, ...d],
      thoughts: f,
      finishReason: o,
      model: i,
      provider: "sillytavern-openai-compatible",
      providerPayload: ls(r)
    };
  }
  async nonStreamingChat(e, t) {
    const n = await mh(t, { signal: e.signal }), r = n.choices?.[0] || {}, o = r.message || {}, i = sr(o, r), s = ss(o.tool_calls || [], "st-openai-tool"), { thinkTagged: a, cleanedText: u } = gc(ZT(o.content), s);
    a.thoughts.forEach((h) => i.push(h));
    const f = s.length ? [] : as(a.cleaned), d = Ll(o, r);
    return {
      text: u,
      toolCalls: [...s, ...f],
      thoughts: i,
      finishReason: r.finish_reason || "stop",
      model: n.model || this.config.model,
      provider: "sillytavern-openai-compatible",
      providerPayload: ls(d)
    };
  }
  async chat(e) {
    const t = (this.config.toolMode || "native") === "tagged-json" && Array.isArray(e.tools) && e.tools.length > 0, n = Array.isArray(e.tools) && e.tools.length > 0, r = (s) => {
      const a = s ? Ff(e) : $f(e, this.config.model);
      return z$(this.config, s ? {
        ...e,
        tools: void 0,
        toolChoice: void 0
      } : e, a, typeof e.onStreamProgress == "function");
    }, o = async (s) => typeof e.onStreamProgress == "function" ? await this.streamChat(e, s) : await this.nonStreamingChat(e, s), i = r(t);
    try {
      return await o(i);
    } catch (s) {
      if (t || !n || !vF(s)) throw s;
    }
    return typeof e.onToolProtocolFallback == "function" && e.onToolProtocolFallback({
      provider: "sillytavern-openai-compatible",
      fromToolMode: "native",
      toToolMode: "tagged-json",
      reason: "malformed_native_tool_host_error"
    }), await o(r(!0));
  }
}, wF = "https://api.tavily.com";
function Gf(e = "") {
  return String(e || "").trim();
}
function us(e = "") {
  return String(e || "").trim().replace(/\/+$/, "") || "https://api.tavily.com";
}
var dS = "openai-compatible", hS = "默认", pS = "default", EF = "deny", oO = Object.freeze([{
  value: "default",
  label: "默认权限"
}, {
  value: "full",
  label: "完全权限"
}]), iO = Object.freeze([{
  value: "deny",
  label: "禁止"
}, {
  value: "allow",
  label: "允许"
}]), Vf = {
  "openai-responses": {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4.1-mini",
    apiKey: "",
    temperature: 0.2
  },
  "openai-compatible": {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4o-mini",
    apiKey: "",
    temperature: 0.2,
    toolMode: "native"
  },
  "sillytavern-openai-compatible": {
    baseUrl: "",
    model: "gpt-4o-mini",
    apiKey: "",
    temperature: 0.2,
    toolMode: "native"
  },
  "sillytavern-claude": {
    baseUrl: "",
    model: "claude-sonnet-4-0",
    apiKey: "",
    temperature: 0.2
  },
  "sillytavern-google": {
    baseUrl: "",
    model: "gemini-2.5-pro",
    apiKey: "",
    temperature: 0.2
  },
  anthropic: {
    baseUrl: "https://api.anthropic.com",
    model: "claude-sonnet-4-0",
    apiKey: "",
    temperature: 0.2
  },
  google: {
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    model: "gemini-2.5-pro",
    apiKey: "",
    temperature: 0.2
  }
};
function bo() {
  return JSON.parse(JSON.stringify(Vf));
}
function Vo() {
  return {
    provider: dS,
    modelConfigs: bo(),
    permissionMode: pS
  };
}
function TF(e = Vo()) {
  const t = e && typeof e == "object" ? e : Vo();
  return {
    provider: _h(t.provider),
    modelConfigs: vh(t.modelConfigs || {})
  };
}
function mS(e) {
  return e === "full" ? "full" : pS;
}
function SF(e) {
  return e === "allow" ? "allow" : EF;
}
function yr(e) {
  return String(e || "").trim() || "默认";
}
function vh(e = {}) {
  const t = bo();
  return Object.keys(Vf).forEach((n) => {
    t[n] = {
      ...Vf[n],
      ...e && typeof e[n] == "object" ? e[n] : {}
    };
  }), t;
}
function _h(e) {
  return typeof e == "string" && e.trim() ? e : dS;
}
function wh(e = {}, t) {
  return e && typeof e.presets == "object" && e.presets ? e.presets : e?.modelConfigs ? { [t]: {
    provider: e.provider || "openai-compatible",
    modelConfigs: e.modelConfigs,
    permissionMode: e.permissionMode
  } } : {};
}
function AF(e = {}, t) {
  const n = {}, r = wh(e, t);
  return Object.entries(r).forEach(([o, i]) => {
    if (!i || typeof i != "object") return;
    const s = yr(o);
    n[s] = {
      provider: _h(i.provider),
      modelConfigs: vh(i.modelConfigs || {}),
      permissionMode: mS(i.permissionMode)
    };
  }), Object.keys(n).length || (n[hS] = Vo()), n;
}
function CF(e, t) {
  const n = yr(t);
  return e[n] ? n : Object.keys(e)[0];
}
function bF(e, t, n) {
  const r = yr(t || n);
  return e[r] ? r : e[n] ? n : Object.keys(e)[0];
}
function IF(e = {}, t = Vo()) {
  const n = TF(t), r = e && typeof e == "object" ? e : {};
  return {
    provider: _h(r.provider || n.provider),
    modelConfigs: vh(r.modelConfigs || n.modelConfigs)
  };
}
function RF(e = {}, t, n, r, o) {
  const i = o(e?.[r]);
  if (i) return i;
  const s = wh(e, t), a = [
    n,
    t,
    e?.currentPresetName,
    e?.delegatePresetName,
    ...Object.keys(s || {})
  ].map(yr), u = /* @__PURE__ */ new Set();
  for (const f of a) {
    if (u.has(f)) continue;
    u.add(f);
    const d = o(s?.[f]?.[r]);
    if (d) return d;
  }
  return o(e?.delegateConfig?.[r]);
}
function PF(e = {}, t, n) {
  const r = (a) => String(a || "").trim();
  if (r(e?.tavilyBaseUrl)) return us(e.tavilyBaseUrl);
  const o = wh(e, t), i = [
    n,
    t,
    e?.currentPresetName,
    e?.delegatePresetName,
    ...Object.keys(o || {})
  ].map(yr), s = /* @__PURE__ */ new Set();
  for (const a of i) {
    if (s.has(a)) continue;
    s.add(a);
    const u = o?.[a]?.tavilyBaseUrl;
    if (r(u)) return us(u);
  }
  return r(e?.delegateConfig?.tavilyBaseUrl) ? us(e.delegateConfig.tavilyBaseUrl) : wF;
}
function xF(e = {}, t, n) {
  return {
    tavilyApiKey: RF(e, t, n, "tavilyApiKey", Gf),
    tavilyBaseUrl: PF(e, t, n)
  };
}
function MF(e = {}) {
  const t = yr(e.currentPresetName || e.presetDraftName || "默认"), n = AF(e, t), r = CF(n, e.currentPresetName), o = bF(n, e.delegatePresetName, r), i = n[r] || Vo(), s = n[o] || i, a = IF(e.delegateConfig, s), u = xF(e, t, r);
  return {
    workspaceFileName: String(e.workspaceFileName || ""),
    jsApiPermission: SF(e.jsApiPermission),
    currentPresetName: r,
    delegatePresetName: o,
    delegateConfig: a,
    presetDraftName: yr(e.presetDraftName || r),
    presetNames: Object.keys(n),
    presets: n,
    provider: i.provider,
    modelConfigs: i.modelConfigs,
    permissionMode: mS(i.permissionMode),
    tavilyApiKey: u.tavilyApiKey,
    tavilyBaseUrl: u.tavilyBaseUrl
  };
}
var sO = 900 * 1e3, aO = Object.freeze([{
  value: "native",
  label: "原生 Tool Calling"
}, {
  value: "tagged-json",
  label: "Tagged JSON 兼容模式"
}]), NF = Object.freeze([
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
]), lO = Object.freeze([
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
function xy(e = "") {
  return e === "anthropic" || e === "sillytavern-claude";
}
function kF(e = "") {
  return e === "sillytavern-openai-compatible" || e === "sillytavern-claude" || e === "sillytavern-google";
}
function My(e = "") {
  return NF.some((t) => t.value === e) ? e : "medium";
}
function DF(e = {}, t = {}) {
  const n = MF(e || {});
  if (t.role === "delegate" && n.delegateConfig) {
    const u = n.delegateConfig.provider || "openai-compatible", f = (n.delegateConfig.modelConfigs || bo())[u] || bo()[u] || {};
    return {
      currentPresetName: String(n.delegatePresetName || n.currentPresetName || ""),
      provider: u,
      baseUrl: String(f.baseUrl || ""),
      model: String(f.model || ""),
      apiKey: String(f.apiKey || ""),
      tavilyApiKey: Gf(n.tavilyApiKey),
      tavilyBaseUrl: us(n.tavilyBaseUrl),
      temperature: Number(f.temperature ?? 0.2),
      maxTokens: xy(u) ? 32e3 : null,
      timeoutMs: Number(t.timeoutMs) || 9e5,
      toolMode: f.toolMode || "native",
      reasoningEnabled: !!f.reasoningEnabled,
      reasoningEffort: My(f.reasoningEffort)
    };
  }
  const r = yr(t.presetName || (t.role === "delegate" ? n.delegatePresetName : n.currentPresetName) || "默认"), o = n.presets?.[r] ? r : n.presets?.[n.currentPresetName] ? n.currentPresetName : hS, i = n.presets?.[o] || Vo(), s = i.provider || n.provider || "openai-compatible", a = (i.modelConfigs || n.modelConfigs || bo())[s] || bo()[s] || {};
  return {
    currentPresetName: String(o || ""),
    provider: s,
    baseUrl: String(a.baseUrl || ""),
    model: String(a.model || ""),
    apiKey: String(a.apiKey || ""),
    tavilyApiKey: Gf(n.tavilyApiKey),
    tavilyBaseUrl: us(n.tavilyBaseUrl),
    temperature: Number(a.temperature ?? 0.2),
    maxTokens: xy(s) ? 32e3 : null,
    timeoutMs: Number(t.timeoutMs) || 9e5,
    toolMode: a.toolMode || "native",
    reasoningEnabled: !!a.reasoningEnabled,
    reasoningEffort: My(a.reasoningEffort)
  };
}
function LF(e = {}, t = {}) {
  if (!e.apiKey && !kF(e.provider)) throw new Error(t.missingApiKeyMessage || "请先填写当前模型配置的 API Key。");
  switch (e.provider) {
    case "sillytavern-openai-compatible":
      return new _F(e);
    case "sillytavern-claude":
      return new sF(e);
    case "sillytavern-google":
      return new gF(e);
    case "openai-responses":
      return new F$(e);
    case "anthropic":
      return new aR(e);
    case "google":
      return new rU(e);
    default:
      return new I$(e);
  }
}
async function UF(e) {
  const t = DF(e.agentConfig || {}, { timeoutMs: 9e5 }), n = await LF(t, { missingApiKeyMessage: "请先在小白助手模型配置里填写 API Key。" }).chat({
    systemPrompt: "",
    messages: e.messages,
    tools: [],
    toolChoice: "none",
    temperature: t.temperature,
    maxTokens: t.maxTokens,
    signal: e.signal,
    onStreamProgress: e.onStreamProgress
  });
  return {
    text: String(n?.text || ""),
    thoughts: n?.thoughts,
    model: n?.model,
    provider: n?.provider,
    finishReason: n?.finishReason,
    providerPayload: n?.providerPayload
  };
}
var $F = { class: "xb-tavern" }, FF = { class: "xb-topbar" }, OF = { class: "xb-layout" }, BF = { class: "xb-sidebar" }, GF = { class: "panel" }, VF = { class: "kv" }, HF = ["value"], qF = { class: "panel" }, KF = { class: "diagnostics" }, JF = { class: "panel" }, WF = { class: "muted" }, YF = { class: "session-list" }, zF = ["onClick"], XF = { class: "xb-main" }, QF = { class: "panel" }, ZF = { class: "panel-head" }, jF = { class: "pill" }, e1 = { class: "snapshot-grid" }, t1 = { class: "snapshot-card" }, n1 = { class: "field-list" }, r1 = { class: "snapshot-card" }, o1 = { class: "source-list" }, i1 = {
  key: 0,
  class: "muted"
}, s1 = { class: "panel" }, a1 = { class: "panel-head" }, l1 = { class: "muted compact" }, u1 = { class: "pill" }, c1 = { class: "preset-toolbar" }, f1 = ["value"], d1 = ["value"], h1 = ["disabled"], p1 = {
  key: 0,
  class: "muted compact"
}, m1 = { class: "muted" }, g1 = { class: "preset-editor" }, y1 = ["value", "disabled"], v1 = ["value", "disabled"], _1 = ["value", "disabled"], w1 = ["value", "disabled"], E1 = { class: "preset-editor-head" }, T1 = ["disabled"], S1 = { class: "preset-section-editor" }, A1 = { class: "preset-edit-grid" }, C1 = [
  "value",
  "disabled",
  "onInput"
], b1 = [
  "value",
  "disabled",
  "onChange"
], I1 = [
  "value",
  "disabled",
  "onChange"
], R1 = ["disabled", "onClick"], P1 = [
  "value",
  "disabled",
  "onInput"
], x1 = { class: "preset-list" }, M1 = { class: "panel" }, N1 = { class: "panel-head" }, k1 = { class: "pill" }, D1 = { class: "world-list" }, L1 = { class: "entry-head" }, U1 = { class: "entry-meta" }, $1 = {
  key: 0,
  class: "entry-meta"
}, F1 = {
  key: 0,
  class: "muted"
}, O1 = { class: "panel" }, B1 = { class: "panel-head" }, G1 = { class: "message-preview" }, V1 = { class: "raw-json" }, H1 = { class: "panel" }, q1 = { class: "panel-head" }, K1 = ["disabled"], J1 = {
  key: 0,
  class: "error"
}, W1 = {
  key: 1,
  class: "muted"
}, Y1 = { class: "runtime" }, z1 = {
  key: 2,
  class: "raw-json"
}, X1 = { class: "session-messages" }, Q1 = "xb-tavern-app", Z1 = "xb-tavern-host", j1 = /* @__PURE__ */ v0({
  __name: "App",
  setup(e) {
    const t = /* @__PURE__ */ Be({}), n = /* @__PURE__ */ Be({}), r = /* @__PURE__ */ Be({}), o = /* @__PURE__ */ Be([]), i = /* @__PURE__ */ Be(""), s = /* @__PURE__ */ Be("等待宿主资料"), a = /* @__PURE__ */ Be("测试一句角色回复。"), u = /* @__PURE__ */ Be("squash"), f = /* @__PURE__ */ Be(""), d = /* @__PURE__ */ Be(""), h = /* @__PURE__ */ Be(""), p = /* @__PURE__ */ Be(""), m = /* @__PURE__ */ Be(""), g = /* @__PURE__ */ Be(!1), y = /* @__PURE__ */ Be([]), v = /* @__PURE__ */ Be(""), w = /* @__PURE__ */ Be([]), _ = /* @__PURE__ */ Be(Fo()), S = /* @__PURE__ */ Be([]), T = /* @__PURE__ */ Be(or), C = /* @__PURE__ */ Be(""), E = Ye(() => T.value === or), M = Ye(() => ({
      ...t.value,
      history: v.value ? w.value.map((k) => ({
        role: [
          "system",
          "user",
          "assistant",
          "tool"
        ].includes(k.role) ? k.role : "assistant",
        content: k.content
      })) : t.value.history
    })), I = Ye(() => gC(M.value, _.value, {
      currentUserMessage: a.value,
      historyMode: u.value,
      worldSettings: {
        recursion: !0,
        recursionLimit: 4,
        budgetChars: 24e3
      }
    })), D = Ye(() => t.value.character?.name || "未选择角色"), $ = Ye(() => t.value.user?.name || "User"), q = Ye(() => t.value.worldBooks || []), z = Ye(() => q.value.length), J = Ye(() => I.value.worldEntryCandidates.length), ne = Ye(() => I.value.activatedWorldEntries.length), H = Ye(() => I.value.messages), pe = Ye(() => y.value.find((k) => k.id === v.value)?.title || "未创建会话"), ue = Ye(() => I.value.meta.rawMessagesJson), fe = Ye(() => {
      const k = t.value.character || {}, R = t.value.user || {};
      return [
        ["角色", k.name],
        ["头像", k.avatar],
        ["用户", R.name],
        ["用户 persona", R.persona || R.description],
        ["描述", k.description],
        ["性格", k.personality],
        ["场景", k.scenario],
        ["首条消息", k.firstMessage || k.first_mes],
        ["示例消息", k.mesExample || k.mes_example],
        ["作者备注", k.creatorNotes || k.creator_notes]
      ].filter((N) => String(N[1] || "").trim());
    }), we = Ye(() => [
      n.value.message || s.value,
      D.value ? "" : "当前没有可用角色卡。",
      (t.value.history || []).length ? "" : "当前资料快照没有聊天历史。",
      z.value ? "" : "当前角色/全局没有可读取的世界书。",
      ...(n.value.worldbookErrors || []).map((k) => `${k.name}: ${k.error}`)
    ].map((k) => String(k || "").trim()).filter(Boolean)), Le = Ye(() => H.value.map((k, R) => {
      const N = I.value.messageLayers[R];
      return {
        index: R,
        message: k,
        layer: N?.layer || "unknown",
        label: N?.label || "unknown",
        chars: N?.chars || k.content.length,
        tokenEstimate: N?.tokenEstimate || Math.max(1, Math.ceil(k.content.length / 4))
      };
    })), ht = Ye(() => new Set(I.value.activatedWorldEntries.map((k) => k.activationKey))), $e = Ye(() => I.value.worldEntryCandidates), ln = {
      top: "顶部预设",
      beforeCharacter: "角色卡之前",
      afterCharacter: "角色卡之后",
      beforeHistory: "历史之前",
      afterHistory: "历史之后",
      assistantPrefill: "助手预填"
    }, lt = Ye(() => {
      const k = Array.isArray(_.value.sections) ? _.value.sections : [];
      return [
        {
          previewId: "lwb-system",
          previewLabel: "小白顶层 system",
          previewPlacement: "顶层固定",
          role: "system",
          locked: !0,
          content: _.value.systemPrompt
        },
        {
          previewId: "lwb-tool",
          previewLabel: "小白工具规则",
          previewPlacement: "顶层固定",
          role: "system",
          locked: !0,
          content: _.value.toolPrompt
        },
        ...k.map((R, N) => ({
          ...R,
          previewId: R.id || `preset-section-${N}`,
          previewLabel: R.label || R.id || `预设段 ${N + 1}`,
          previewPlacement: ln[R.placement || "beforeHistory"] || R.placement || "历史之前"
        }))
      ].map((R) => ({
        ...R,
        content: String(R.content || ""),
        chars: String(R.content || "").length
      })).filter((R) => R.content);
    });
    async function un() {
      S.value = await iI();
      const k = await w_(), R = await Cp();
      _.value = R, T.value = R.id || k || "littlewhitebox-roleplay-default-v1", k !== T.value && await Pi(T.value);
    }
    async function In() {
      const k = await sI();
      T.value = k.id, _.value = k.preset, await un(), C.value = "已从内置默认预设派生可编辑副本。";
    }
    async function eo(k) {
      await Pi(k), T.value = k || "littlewhitebox-roleplay-default-v1", _.value = await Cp(), C.value = E.value ? "当前使用内置只读预设。" : "已切换到用户预设。";
    }
    async function ti() {
      if (E.value) {
        C.value = "内置预设只读，请先派生副本。";
        return;
      }
      const k = await __(_.value);
      await Pi(k.id), T.value = k.id, _.value = k.preset, await un(), C.value = "预设已保存。";
    }
    async function Ks() {
      await Pi(or), T.value = or, _.value = Fo(), C.value = "已切回内置默认预设。";
    }
    function Wt(k, R) {
      if (E.value) return;
      const N = [..._.value.sections || []];
      N[k] = {
        ...N[k],
        ...R
      }, _.value = {
        ..._.value,
        sections: N
      };
    }
    function zn(k) {
      E.value || (_.value = {
        ..._.value,
        ...k
      });
    }
    function ni() {
      if (E.value) return;
      const k = [..._.value.sections || []];
      k.push({
        id: `custom-section-${Date.now().toString(36)}`,
        label: "自定义规则",
        locked: !1,
        placement: "beforeHistory",
        role: "system",
        content: ""
      }), _.value = {
        ..._.value,
        sections: k
      };
    }
    function A(k) {
      if (E.value) return;
      const R = [..._.value.sections || []];
      R.splice(k, 1), _.value = {
        ..._.value,
        sections: R
      };
    }
    function b(k, R = {}) {
      window.parent?.postMessage({
        source: Q1,
        type: k,
        payload: R
      }, window.location.origin);
    }
    function L(k) {
      t.value = k.context || {}, n.value = k.diagnostics || {}, r.value = k.agentConfig || r.value, o.value = k.availableCharacters || o.value, i.value = String(k.selectedCharacterId || t.value.character?.id || i.value || ""), s.value = n.value.message || "宿主资料已加载";
    }
    function V(k) {
      if (k.origin !== window.location.origin) return;
      const R = k.data || {};
      if (R.source === Z1) {
        if (R.type === "xb-tavern:config") {
          L(R.payload || {});
          return;
        }
        R.type === "xb-tavern:context" && L(R.payload || {});
      }
    }
    function B() {
      s.value = "正在刷新资料快照", b("xb-tavern:refresh-context", { characterId: i.value });
    }
    async function O() {
      y.value = await nI(), v.value = await rI(), !v.value && y.value[0] && (v.value = y.value[0].id, await Tp(v.value)), w.value = v.value ? await Ap(v.value) : [];
    }
    async function Y() {
      v.value = (await tI({
        title: `${D.value} · 小白酒馆`,
        characterId: String(t.value.character?.id || ""),
        characterName: D.value,
        contextSnapshot: t.value
      })).id, await O();
    }
    async function W(k) {
      v.value = k, await Tp(k), w.value = await Ap(k);
    }
    async function K() {
      return v.value || await Y(), v.value;
    }
    function G(k = "", R = 180) {
      const N = String(k || "").trim();
      return N.length > R ? `${N.slice(0, R)}...` : N;
    }
    function ae(k = "") {
      return {
        activated: "已激活",
        budget_skipped: "预算跳过",
        not_matched: "未命中",
        secondary_not_matched: "二级未命中",
        disabled: "已禁用",
        suppressed_by_decorator: "装饰器抑制",
        cooldown: "冷却中",
        delay: "延迟中"
      }[k] || k || "未知";
    }
    async function ee() {
      d.value = "", f.value = "", h.value = "", p.value = "", m.value = JSON.stringify({
        messageCount: H.value.length,
        messages: H.value
      }, null, 2), g.value = !0;
      try {
        const k = await K();
        await Sp(k, {
          role: "user",
          content: a.value
        });
        const R = await UF({
          agentConfig: r.value,
          messages: H.value,
          onStreamProgress: (N) => {
            typeof N.text == "string" && (f.value = N.text);
          }
        });
        f.value = R.text, h.value = R.provider || "", p.value = R.model || "", await Sp(k, {
          role: "assistant",
          content: R.text,
          providerPayload: R.providerPayload
        }), await O();
      } catch (k) {
        d.value = k instanceof Error ? k.message : String(k || "run_failed");
      } finally {
        g.value = !1;
      }
    }
    return gv(async () => {
      window.addEventListener("message", V), await un(), await O(), b("xb-tavern:frame-ready");
    }), nd(() => {
      window.removeEventListener("message", V);
    }), (k, R) => (Ce(), Ie("main", $F, [U("header", FF, [R[10] || (R[10] = U("div", null, [U("p", { class: "eyebrow" }, " LittleWhiteBox Tavern "), U("h1", null, "小白酒馆结构调试台")], -1)), U("button", {
      class: "icon-button",
      type: "button",
      title: "关闭",
      onClick: R[0] || (R[0] = (N) => b("xb-tavern:close"))
    }, " × ")]), U("section", OF, [U("aside", BF, [
      U("div", GF, [
        R[15] || (R[15] = U("h2", null, "资料选择", -1)),
        U("dl", VF, [
          R[11] || (R[11] = U("dt", null, "角色", -1)),
          U("dd", null, se(D.value), 1),
          R[12] || (R[12] = U("dt", null, "用户", -1)),
          U("dd", null, se($.value), 1),
          R[13] || (R[13] = U("dt", null, "世界书", -1)),
          U("dd", null, se(z.value) + " 本 / " + se(J.value) + " 条", 1),
          R[14] || (R[14] = U("dt", null, "激活", -1)),
          U("dd", null, se(ne.value) + " 条", 1)
        ]),
        R[16] || (R[16] = U("label", {
          class: "field-label",
          for: "xb-character-select"
        }, "角色卡", -1)),
        zs(U("select", {
          id: "xb-character-select",
          "onUpdate:modelValue": R[1] || (R[1] = (N) => i.value = N),
          onChange: B
        }, [(Ce(!0), Ie(Ge, null, zt(o.value, (N) => (Ce(), Ie("option", {
          key: N.id,
          value: N.id
        }, se(N.name), 9, HF))), 128))], 544), [[Du, i.value]]),
        U("button", {
          type: "button",
          onClick: B
        }, " 刷新资料快照 ")
      ]),
      U("div", qF, [R[17] || (R[17] = U("h2", null, "读取诊断", -1)), U("ul", KF, [(Ce(!0), Ie(Ge, null, zt(we.value, (N) => (Ce(), Ie("li", { key: N }, se(N), 1))), 128))])]),
      U("div", JF, [
        R[18] || (R[18] = U("h2", null, "独立会话", -1)),
        U("p", WF, se(pe.value), 1),
        U("button", {
          type: "button",
          onClick: Y
        }, " 新建会话快照 "),
        U("div", YF, [(Ce(!0), Ie(Ge, null, zt(y.value, (N) => (Ce(), Ie("button", {
          key: N.id,
          type: "button",
          class: cs({ active: N.id === v.value }),
          onClick: (Te) => W(N.id)
        }, se(N.title), 11, zF))), 128))])
      ])
    ]), U("section", XF, [
      U("div", QF, [U("div", ZF, [R[19] || (R[19] = U("h2", null, "资料快照", -1)), U("span", jF, se(t.value.history?.length || 0) + " 条历史", 1)]), U("div", e1, [U("article", t1, [R[20] || (R[20] = U("h3", null, "角色 / 用户", -1)), U("dl", n1, [(Ce(!0), Ie(Ge, null, zt(fe.value, (N) => (Ce(), Ie(Ge, { key: N[0] }, [U("dt", null, se(N[0]), 1), U("dd", null, se(G(String(N[1] || ""), 420)), 1)], 64))), 128))])]), U("article", r1, [R[21] || (R[21] = U("h3", null, "世界书来源", -1)), U("div", o1, [(Ce(!0), Ie(Ge, null, zt(q.value, (N) => (Ce(), Ie("span", {
        key: N.name,
        class: "source-row"
      }, [U("strong", null, se(N.name || "未命名世界书"), 1), U("small", null, se(N.entries?.length || 0) + " 条", 1)]))), 128)), q.value.length ? Er("", !0) : (Ce(), Ie("p", i1, " 当前资料快照没有世界书。 "))])])])]),
      U("div", s1, [
        U("div", a1, [U("div", null, [R[22] || (R[22] = U("h2", null, "预设结构", -1)), U("p", l1, se(_.value.name) + " · " + se(_.value.version) + " · " + se(_.value.id), 1)]), U("span", u1, se(lt.value.length) + " 段", 1)]),
        U("div", c1, [
          zs(U("select", {
            "onUpdate:modelValue": R[2] || (R[2] = (N) => T.value = N),
            onChange: R[3] || (R[3] = (N) => eo(T.value))
          }, [U("option", { value: rv(or) }, " 内置默认预设（只读） ", 8, f1), (Ce(!0), Ie(Ge, null, zt(S.value, (N) => (Ce(), Ie("option", {
            key: N.id,
            value: N.id
          }, se(N.name), 9, d1))), 128))], 544), [[Du, T.value]]),
          U("button", {
            type: "button",
            onClick: In
          }, " 派生副本 "),
          U("button", {
            type: "button",
            disabled: E.value,
            onClick: ti
          }, " 保存预设 ", 8, h1),
          U("button", {
            type: "button",
            onClick: Ks
          }, " 切回内置 ")
        ]),
        C.value ? (Ce(), Ie("p", p1, se(C.value), 1)) : Er("", !0),
        U("p", m1, se(_.value.description), 1),
        U("div", g1, [
          U("label", null, [R[23] || (R[23] = tr(" 名称 ", -1)), U("input", {
            value: _.value.name,
            disabled: E.value,
            onInput: R[4] || (R[4] = (N) => zn({ name: N.target.value }))
          }, null, 40, y1)]),
          U("label", null, [R[24] || (R[24] = tr(" 描述 ", -1)), U("textarea", {
            value: _.value.description,
            disabled: E.value,
            rows: "2",
            onInput: R[5] || (R[5] = (N) => zn({ description: N.target.value }))
          }, null, 40, v1)]),
          U("label", null, [R[25] || (R[25] = tr(" 顶层 system ", -1)), U("textarea", {
            value: _.value.systemPrompt,
            disabled: E.value,
            rows: "4",
            onInput: R[6] || (R[6] = (N) => zn({ systemPrompt: N.target.value }))
          }, null, 40, _1)]),
          U("label", null, [R[26] || (R[26] = tr(" 工具规则 ", -1)), U("textarea", {
            value: _.value.toolPrompt,
            disabled: E.value,
            rows: "3",
            onInput: R[7] || (R[7] = (N) => zn({ toolPrompt: N.target.value }))
          }, null, 40, w1)])
        ]),
        U("div", E1, [R[27] || (R[27] = U("strong", null, "预设段落", -1)), U("button", {
          type: "button",
          disabled: E.value,
          onClick: ni
        }, " 新增段落 ", 8, T1)]),
        U("div", S1, [(Ce(!0), Ie(Ge, null, zt(_.value.sections || [], (N, Te) => (Ce(), Ie("article", {
          key: N.id || Te,
          class: "preset-edit-card"
        }, [U("div", A1, [
          U("label", null, [R[28] || (R[28] = tr(" 标签 ", -1)), U("input", {
            value: N.label,
            disabled: E.value,
            onInput: (Ee) => Wt(Te, { label: Ee.target.value })
          }, null, 40, C1)]),
          U("label", null, [R[30] || (R[30] = tr(" Role ", -1)), U("select", {
            value: N.role || "system",
            disabled: E.value,
            onChange: (Ee) => Wt(Te, { role: Ee.target.value })
          }, [...R[29] || (R[29] = [
            U("option", { value: "system" }, " system ", -1),
            U("option", { value: "user" }, " user ", -1),
            U("option", { value: "assistant" }, " assistant ", -1)
          ])], 40, b1)]),
          U("label", null, [R[32] || (R[32] = tr(" 位置 ", -1)), U("select", {
            value: N.placement || "beforeHistory",
            disabled: E.value,
            onChange: (Ee) => Wt(Te, { placement: Ee.target.value })
          }, [...R[31] || (R[31] = [aA('<option value="top"> 顶部预设 </option><option value="beforeCharacter"> 角色卡之前 </option><option value="afterCharacter"> 角色卡之后 </option><option value="beforeHistory"> 历史之前 </option><option value="afterHistory"> 历史之后 </option><option value="assistantPrefill"> 助手预填 </option>', 6)])], 40, I1)]),
          U("button", {
            type: "button",
            disabled: E.value,
            onClick: (Ee) => A(Te)
          }, " 删除 ", 8, R1)
        ]), U("textarea", {
          value: N.content,
          disabled: E.value,
          rows: "4",
          onInput: (Ee) => Wt(Te, { content: Ee.target.value })
        }, null, 40, P1)]))), 128))]),
        U("div", x1, [(Ce(!0), Ie(Ge, null, zt(lt.value, (N) => (Ce(), Ie("details", {
          key: N.previewId,
          class: "preset-section"
        }, [U("summary", null, [U("span", null, se(N.previewPlacement) + " · " + se(N.role || "system") + " · " + se(N.previewLabel), 1), U("small", null, se(N.locked === !1 ? "可变" : "锁定") + " · " + se(N.chars) + " 字", 1)]), U("pre", null, se(N.content), 1)]))), 128))])
      ]),
      U("div", M1, [U("div", N1, [R[33] || (R[33] = U("h2", null, "世界书激活解释", -1)), U("span", k1, se(ne.value) + " / " + se(J.value), 1)]), U("div", D1, [(Ce(!0), Ie(Ge, null, zt($e.value, (N) => (Ce(), Ie("article", {
        key: N.activationKey,
        class: cs(["world-entry", { active: ht.value.has(N.activationKey) }])
      }, [
        U("div", L1, [U("strong", null, se(N.title || N.uid), 1), U("span", null, se(ae(N.status)), 1)]),
        U("small", null, se(N.sourceWorldBook || "未归属") + " · " + se(N.positionLabel) + " · order " + se(N.order) + " · depth " + se(N.depth) + " · " + se(N.contentChars) + " 字 ", 1),
        U("p", U1, " key: " + se(N.key.join(", ") || "无") + " / secondary: " + se(N.keysecondary.join(", ") || "无"), 1),
        N.activationReason ? (Ce(), Ie("p", $1, " reason: " + se(N.activationReason), 1)) : Er("", !0),
        U("p", null, se(G(N.content, 360)), 1)
      ], 2))), 128)), $e.value.length ? Er("", !0) : (Ce(), Ie("p", F1, " 当前没有候选世界书条目。 "))])]),
      U("div", O1, [
        U("div", B1, [R[35] || (R[35] = U("h2", null, "最终 messages", -1)), zs(U("select", { "onUpdate:modelValue": R[8] || (R[8] = (N) => u.value = N) }, [...R[34] || (R[34] = [U("option", { value: "squash" }, " squash history ", -1), U("option", { value: "raw" }, " raw history ", -1)])], 512), [[Du, u.value]])]),
        zs(U("textarea", {
          "onUpdate:modelValue": R[9] || (R[9] = (N) => a.value = N),
          class: "input",
          rows: "3"
        }, null, 512), [[BA, a.value]]),
        U("div", G1, [(Ce(!0), Ie(Ge, null, zt(Le.value, (N) => (Ce(), Ie("details", {
          key: `${N.index}-${N.message.role}-${N.layer}`,
          class: "message",
          open: ""
        }, [U("summary", null, [U("span", null, se(N.index + 1) + " · " + se(N.message.role) + " · " + se(N.label), 1), U("small", null, se(N.chars) + " 字 · ~" + se(N.tokenEstimate) + " tokens", 1)]), U("pre", null, se(N.message.content), 1)]))), 128))]),
        U("details", V1, [R[36] || (R[36] = U("summary", null, "Raw messages JSON", -1)), U("pre", null, se(ue.value), 1)])
      ]),
      U("div", H1, [
        U("div", q1, [R[37] || (R[37] = U("h2", null, "一次发模测试", -1)), U("button", {
          type: "button",
          disabled: g.value,
          onClick: ee
        }, se(g.value ? "运行中" : "发送测试"), 9, K1)]),
        d.value ? (Ce(), Ie("p", J1, se(d.value), 1)) : Er("", !0),
        h.value || p.value ? (Ce(), Ie("p", W1, se(h.value || "provider") + " / " + se(p.value || "model"), 1)) : Er("", !0),
        U("pre", Y1, se(f.value || "这里显示本次模型返回。"), 1),
        m.value ? (Ce(), Ie("details", z1, [R[38] || (R[38] = U("summary", null, "本次发送快照", -1)), U("pre", null, se(m.value), 1)])) : Er("", !0),
        R[39] || (R[39] = U("p", { class: "muted" }, " 会话消息写入 LittleWhiteBox_Tavern IndexedDB，不写回原酒馆聊天记录。 ", -1)),
        U("div", X1, [(Ce(!0), Ie(Ge, null, zt(w.value, (N) => (Ce(), Ie("span", { key: `${N.sessionId}-${N.order}` }, se(N.order + 1) + ". " + se(N.role), 1))), 128))])
      ])
    ])])]));
  }
}), eO = j1;
HA(eO).mount("#app");
