var v = Object.create;
var n = Object.defineProperty,
    w = Object.defineProperties,
    x = Object.getOwnPropertyDescriptor,
    y = Object.getOwnPropertyDescriptors,
    z = Object.getOwnPropertyNames,
    m = Object.getOwnPropertySymbols,
    A = Object.getPrototypeOf,
    o = Object.prototype.hasOwnProperty,
    s = Object.prototype.propertyIsEnumerable;
var l = (b, a) => (a = Symbol[b]) ? a : Symbol.for("Symbol." + b);
var r = (b, a, c) => a in b ? n(b, a, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: c
    }) : b[a] = c,
    C = (b, a) => {
        for (var c in a || = {}) o.call(a, c) && r(b, c, a[c]);
        if (m)
            for (var c of m(a)) s.call(a, c) && r(b, c, a[c]);
        return b
    },
    D = (b, a) => w(b, y(a));
var E = (b => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(b, {
    get: (a, c) => (typeof require < "u" ? require : a)[c]
}) : b)(function(b) {
    if (typeof require < "u") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + b + '" is not supported')
});
var F = (b, a) => {
    var c = {};
    for (var d in b) o.call(b, d) && a.indexOf(d) < 0 && (c[d] = b[d]);
    if (b != null && m)
        for (var d of m(b)) a.indexOf(d) < 0 && s.call(b, d) && (c[d] = b[d]);
    return c
};
var G = (b, a) => () => (a || b((a = {
        exports: {}
    }).exports, a), a.exports),
    H = (b, a) => {
        for (var c in a) n(b, c, {
            get: a[c],
            enumerable: !0
        })
    },
    B = (b, a, c, d) => {
        if (a && typeof a == "object" || typeof a == "function")
            for (let e of z(a)) !o.call(b, e) && e !== c && n(b, e, {
                get: () => a[e],
                enumerable: !(d = x(a, e)) || d.enumerable
            });
        return b
    };
var I = (b, a, c) => (c = b != null ? v(A(b)) : {}, B(a || !b || !b.__esModule ? n(c, "default", {
    value: b,
    enumerable: !0
}) : c, b));
var J = (b, a, c) => new Promise((d, e) => {
        var f = g => {
                try {
                    i(c.next(g))
                } catch (j) {
                    e(j)
                }
            },
            h = g => {
                try {
                    i(c.throw(g))
                } catch (j) {
                    e(j)
                }
            },
            i = g => g.done ? d(g.value) : Promise.resolve(g.value).then(f, h);
        i((c = c.apply(b, a)).next())
    }),
    t = function(b, a) {
        this[0] = b, this[1] = a
    },
    K = (b, a, c) => {
        var d = (h, i, g, j) => {
                try {
                    var p = c[h](i),
                        q = (i = p.value) instanceof t,
                        u = p.done;
                    Promise.resolve(q ? i[0] : i).then(k => q ? d(h === "return" ? h : "next", i[1] ? {
                        done: k.done,
                        value: k.value
                    } : k, g, j) : g({
                        value: k,
                        done: u
                    })).catch(k => d("throw", k, g, j))
                } catch (k) {
                    j(k)
                }
            },
            e = h => f[h] = i => new Promise((g, j) => d(h, i, g, j)),
            f = {};
        return c = c.apply(b, a), f[l("asyncIterator")] = () => f, e("next"), e("throw"), e("return"), f
    },
    L = b => {
        var a = b[l("asyncIterator")],
            c = !1,
            d, e = {};
        return a == null ? (a = b[l("iterator")](), d = f => e[f] = h => a[f](h)) : (a = a.call(b), d = f => e[f] = h => {
            if (c) {
                if (c = !1, f === "throw") throw h;
                return h
            }
            return c = !0, {
                done: !1,
                value: new t(new Promise(i => {
                    var g = a[f](h);
                    if (!(g instanceof Object)) throw TypeError("Object expected");
                    i(g)
                }), 1)
            }
        }), e[l("iterator")] = () => e, d("next"), "throw" in a ? d("throw") : e.throw = f => {
            throw f
        }, "return" in a && d("return"), e
    },
    M = (b, a, c) => (a = b[l("asyncIterator")]) ? a.call(b) : (b = b[l("iterator")](), a = {}, c = (d, e) => (e = b[d]) && (a[d] = f => new Promise((h, i, g) => (f = e.call(b, f), g = f.done, Promise.resolve(f.value).then(j => h({
        value: j,
        done: g
    }), i)))), c("next"), c("return"), a);
export {
    C as a, D as b, E as c, F as d, G as e, H as f, I as g, J as h, t as i, K as j, L as k, M as l
};