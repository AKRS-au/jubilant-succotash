import {
    a as y,
    b as Q
} from "./chunk-YGAJRIQG.js";
var _f = null;
var Za = 1,
    Ya = Symbol("SIGNAL");

function ae(e) {
    let t = _f;
    return _f = e, t
}
var Mf = {
    version: 0,
    lastCleanEpoch: 0,
    dirty: !1,
    producerNode: void 0,
    producerLastReadVersion: void 0,
    producerIndexOfThis: void 0,
    nextProducerIndex: 0,
    liveConsumerNode: void 0,
    liveConsumerIndexOfThis: void 0,
    consumerAllowSignalWrites: !1,
    consumerIsAlwaysLive: !1,
    producerMustRecompute: () => !1,
    producerRecomputeValue: () => {},
    consumerMarkedDirty: () => {},
    consumerOnSignalRead: () => {}
};

function wD(e) {
    if (!(Ja(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === Za)) {
        if (!e.producerMustRecompute(e) && !Qa(e)) {
            e.dirty = !1, e.lastCleanEpoch = Za;
            return
        }
        e.producerRecomputeValue(e), e.dirty = !1, e.lastCleanEpoch = Za
    }
}

function Sf(e) {
    return e && (e.nextProducerIndex = 0), ae(e)
}

function Tf(e, t) {
    if (ae(t), !(!e || e.producerNode === void 0 || e.producerIndexOfThis === void 0 || e.producerLastReadVersion === void 0)) {
        if (Ja(e))
            for (let n = e.nextProducerIndex; n < e.producerNode.length; n++) Ka(e.producerNode[n], e.producerIndexOfThis[n]);
        for (; e.producerNode.length > e.nextProducerIndex;) e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop()
    }
}

function Qa(e) {
    ri(e);
    for (let t = 0; t < e.producerNode.length; t++) {
        let n = e.producerNode[t],
            r = e.producerLastReadVersion[t];
        if (r !== n.version || (wD(n), r !== n.version)) return !0
    }
    return !1
}

function Af(e) {
    if (ri(e), Ja(e))
        for (let t = 0; t < e.producerNode.length; t++) Ka(e.producerNode[t], e.producerIndexOfThis[t]);
    e.producerNode.length = e.producerLastReadVersion.length = e.producerIndexOfThis.length = 0, e.liveConsumerNode && (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0)
}

function Ka(e, t) {
    if (CD(e), ri(e), e.liveConsumerNode.length === 1)
        for (let r = 0; r < e.producerNode.length; r++) Ka(e.producerNode[r], e.producerIndexOfThis[r]);
    let n = e.liveConsumerNode.length - 1;
    if (e.liveConsumerNode[t] = e.liveConsumerNode[n], e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n], e.liveConsumerNode.length--, e.liveConsumerIndexOfThis.length--, t < e.liveConsumerNode.length) {
        let r = e.liveConsumerIndexOfThis[t],
            o = e.liveConsumerNode[t];
        ri(o), o.producerIndexOfThis[r] = t
    }
}

function Ja(e) {
    return e.consumerIsAlwaysLive || (e ? .liveConsumerNode ? .length ? ? 0) > 0
}

function ri(e) {
    e.producerNode ? ? = [], e.producerIndexOfThis ? ? = [], e.producerLastReadVersion ? ? = []
}

function CD(e) {
    e.liveConsumerNode ? ? = [], e.liveConsumerIndexOfThis ? ? = []
}

function ED() {
    throw new Error
}
var ID = ED;

function xf(e) {
    ID = e
}

function T(e) {
    return typeof e == "function"
}

function qn(e) {
    let n = e(r => {
        Error.call(r), r.stack = new Error().stack
    });
    return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n
}
var oi = qn(e => function(n) {
    e(this), this.message = n ? `${n.length} errors occurred during unsubscription:
${n.map((r,o)=>`${o+1}) ${r.toString()}`).join(`
  `)}` : "", this.name = "UnsubscriptionError", this.errors = n
});

function mn(e, t) {
    if (e) {
        let n = e.indexOf(t);
        0 <= n && e.splice(n, 1)
    }
}
var re = class e {
    constructor(t) {
        this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null
    }
    unsubscribe() {
        let t;
        if (!this.closed) {
            this.closed = !0;
            let {
                _parentage: n
            } = this;
            if (n)
                if (this._parentage = null, Array.isArray(n))
                    for (let i of n) i.remove(this);
                else n.remove(this);
            let {
                initialTeardown: r
            } = this;
            if (T(r)) try {
                r()
            } catch (i) {
                t = i instanceof oi ? i.errors : [i]
            }
            let {
                _finalizers: o
            } = this;
            if (o) {
                this._finalizers = null;
                for (let i of o) try {
                    Nf(i)
                } catch (s) {
                    t = t ? ? [], s instanceof oi ? t = [...t, ...s.errors] : t.push(s)
                }
            }
            if (t) throw new oi(t)
        }
    }
    add(t) {
        var n;
        if (t && t !== this)
            if (this.closed) Nf(t);
            else {
                if (t instanceof e) {
                    if (t.closed || t._hasParent(this)) return;
                    t._addParent(this)
                }(this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t)
            }
    }
    _hasParent(t) {
        let {
            _parentage: n
        } = this;
        return n === t || Array.isArray(n) && n.includes(t)
    }
    _addParent(t) {
        let {
            _parentage: n
        } = this;
        this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t
    }
    _removeParent(t) {
        let {
            _parentage: n
        } = this;
        n === t ? this._parentage = null : Array.isArray(n) && mn(n, t)
    }
    remove(t) {
        let {
            _finalizers: n
        } = this;
        n && mn(n, t), t instanceof e && t._removeParent(this)
    }
};
re.EMPTY = (() => {
    let e = new re;
    return e.closed = !0, e
})();
var Xa = re.EMPTY;

function ii(e) {
    return e instanceof re || e && "closed" in e && T(e.remove) && T(e.add) && T(e.unsubscribe)
}

function Nf(e) {
    T(e) ? e() : e.unsubscribe()
}
var Je = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: !1,
    useDeprecatedNextContext: !1
};
var Zn = {
    setTimeout(e, t, ...n) {
        let {
            delegate: r
        } = Zn;
        return r ? .setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n)
    },
    clearTimeout(e) {
        let {
            delegate: t
        } = Zn;
        return (t ? .clearTimeout || clearTimeout)(e)
    },
    delegate: void 0
};

function si(e) {
    Zn.setTimeout(() => {
        let {
            onUnhandledError: t
        } = Je;
        if (t) t(e);
        else throw e
    })
}

function Xe() {}
var Rf = eu("C", void 0, void 0);

function Of(e) {
    return eu("E", void 0, e)
}

function Ff(e) {
    return eu("N", e, void 0)
}

function eu(e, t, n) {
    return {
        kind: e,
        value: t,
        error: n
    }
}
var vn = null;

function Yn(e) {
    if (Je.useDeprecatedSynchronousErrorHandling) {
        let t = !vn;
        if (t && (vn = {
                errorThrown: !1,
                error: null
            }), e(), t) {
            let {
                errorThrown: n,
                error: r
            } = vn;
            if (vn = null, n) throw r
        }
    } else e()
}

function Pf(e) {
    Je.useDeprecatedSynchronousErrorHandling && vn && (vn.errorThrown = !0, vn.error = e)
}
var yn = class extends re {
        constructor(t) {
            super(), this.isStopped = !1, t ? (this.destination = t, ii(t) && t.add(this)) : this.destination = MD
        }
        static create(t, n, r) {
            return new St(t, n, r)
        }
        next(t) {
            this.isStopped ? nu(Ff(t), this) : this._next(t)
        }
        error(t) {
            this.isStopped ? nu(Of(t), this) : (this.isStopped = !0, this._error(t))
        }
        complete() {
            this.isStopped ? nu(Rf, this) : (this.isStopped = !0, this._complete())
        }
        unsubscribe() {
            this.closed || (this.isStopped = !0, super.unsubscribe(), this.destination = null)
        }
        _next(t) {
            this.destination.next(t)
        }
        _error(t) {
            try {
                this.destination.error(t)
            } finally {
                this.unsubscribe()
            }
        }
        _complete() {
            try {
                this.destination.complete()
            } finally {
                this.unsubscribe()
            }
        }
    },
    bD = Function.prototype.bind;

function tu(e, t) {
    return bD.call(e, t)
}
var ru = class {
        constructor(t) {
            this.partialObserver = t
        }
        next(t) {
            let {
                partialObserver: n
            } = this;
            if (n.next) try {
                n.next(t)
            } catch (r) {
                ai(r)
            }
        }
        error(t) {
            let {
                partialObserver: n
            } = this;
            if (n.error) try {
                n.error(t)
            } catch (r) {
                ai(r)
            } else ai(t)
        }
        complete() {
            let {
                partialObserver: t
            } = this;
            if (t.complete) try {
                t.complete()
            } catch (n) {
                ai(n)
            }
        }
    },
    St = class extends yn {
        constructor(t, n, r) {
            super();
            let o;
            if (T(t) || !t) o = {
                next: t ? ? void 0,
                error: n ? ? void 0,
                complete: r ? ? void 0
            };
            else {
                let i;
                this && Je.useDeprecatedNextContext ? (i = Object.create(t), i.unsubscribe = () => this.unsubscribe(), o = {
                    next: t.next && tu(t.next, i),
                    error: t.error && tu(t.error, i),
                    complete: t.complete && tu(t.complete, i)
                }) : o = t
            }
            this.destination = new ru(o)
        }
    };

function ai(e) {
    Je.useDeprecatedSynchronousErrorHandling ? Pf(e) : si(e)
}

function _D(e) {
    throw e
}

function nu(e, t) {
    let {
        onStoppedNotification: n
    } = Je;
    n && Zn.setTimeout(() => n(e, t))
}
var MD = {
    closed: !0,
    next: Xe,
    error: _D,
    complete: Xe
};
var Qn = typeof Symbol == "function" && Symbol.observable || "@@observable";

function fe(e) {
    return e
}

function ou(...e) {
    return iu(e)
}

function iu(e) {
    return e.length === 0 ? fe : e.length === 1 ? e[0] : function(n) {
        return e.reduce((r, o) => o(r), n)
    }
}
var R = (() => {
    class e {
        constructor(n) {
            n && (this._subscribe = n)
        }
        lift(n) {
            let r = new e;
            return r.source = this, r.operator = n, r
        }
        subscribe(n, r, o) {
            let i = TD(n) ? n : new St(n, r, o);
            return Yn(() => {
                let {
                    operator: s,
                    source: a
                } = this;
                i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i))
            }), i
        }
        _trySubscribe(n) {
            try {
                return this._subscribe(n)
            } catch (r) {
                n.error(r)
            }
        }
        forEach(n, r) {
            return r = kf(r), new r((o, i) => {
                let s = new St({
                    next: a => {
                        try {
                            n(a)
                        } catch (u) {
                            i(u), s.unsubscribe()
                        }
                    },
                    error: i,
                    complete: o
                });
                this.subscribe(s)
            })
        }
        _subscribe(n) {
            var r;
            return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(n)
        }[Qn]() {
            return this
        }
        pipe(...n) {
            return iu(n)(this)
        }
        toPromise(n) {
            return n = kf(n), new n((r, o) => {
                let i;
                this.subscribe(s => i = s, s => o(s), () => r(i))
            })
        }
    }
    return e.create = t => new e(t), e
})();

function kf(e) {
    var t;
    return (t = e ? ? Je.Promise) !== null && t !== void 0 ? t : Promise
}

function SD(e) {
    return e && T(e.next) && T(e.error) && T(e.complete)
}

function TD(e) {
    return e && e instanceof yn || SD(e) && ii(e)
}

function su(e) {
    return T(e ? .lift)
}

function S(e) {
    return t => {
        if (su(t)) return t.lift(function(n) {
            try {
                return e(n, this)
            } catch (r) {
                this.error(r)
            }
        });
        throw new TypeError("Unable to lift unknown Observable type")
    }
}

function I(e, t, n, r, o) {
    return new au(e, t, n, r, o)
}
var au = class extends yn {
    constructor(t, n, r, o, i, s) {
        super(t), this.onFinalize = i, this.shouldUnsubscribe = s, this._next = n ? function(a) {
            try {
                n(a)
            } catch (u) {
                t.error(u)
            }
        } : super._next, this._error = o ? function(a) {
            try {
                o(a)
            } catch (u) {
                t.error(u)
            } finally {
                this.unsubscribe()
            }
        } : super._error, this._complete = r ? function() {
            try {
                r()
            } catch (a) {
                t.error(a)
            } finally {
                this.unsubscribe()
            }
        } : super._complete
    }
    unsubscribe() {
        var t;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            let {
                closed: n
            } = this;
            super.unsubscribe(), !n && ((t = this.onFinalize) === null || t === void 0 || t.call(this))
        }
    }
};

function Kn() {
    return S((e, t) => {
        let n = null;
        e._refCount++;
        let r = I(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount) {
                n = null;
                return
            }
            let o = e._connection,
                i = n;
            n = null, o && (!i || o === i) && o.unsubscribe(), t.unsubscribe()
        });
        e.subscribe(r), r.closed || (n = e.connect())
    })
}
var Jn = class extends R {
    constructor(t, n) {
        super(), this.source = t, this.subjectFactory = n, this._subject = null, this._refCount = 0, this._connection = null, su(t) && (this.lift = t.lift)
    }
    _subscribe(t) {
        return this.getSubject().subscribe(t)
    }
    getSubject() {
        let t = this._subject;
        return (!t || t.isStopped) && (this._subject = this.subjectFactory()), this._subject
    }
    _teardown() {
        this._refCount = 0;
        let {
            _connection: t
        } = this;
        this._subject = this._connection = null, t ? .unsubscribe()
    }
    connect() {
        let t = this._connection;
        if (!t) {
            t = this._connection = new re;
            let n = this.getSubject();
            t.add(this.source.subscribe(I(n, void 0, () => {
                this._teardown(), n.complete()
            }, r => {
                this._teardown(), n.error(r)
            }, () => this._teardown()))), t.closed && (this._connection = null, t = re.EMPTY)
        }
        return t
    }
    refCount() {
        return Kn()(this)
    }
};
var Lf = qn(e => function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
});
var he = (() => {
        class e extends R {
            constructor() {
                super(), this.closed = !1, this.currentObservers = null, this.observers = [], this.isStopped = !1, this.hasError = !1, this.thrownError = null
            }
            lift(n) {
                let r = new ui(this, this);
                return r.operator = n, r
            }
            _throwIfClosed() {
                if (this.closed) throw new Lf
            }
            next(n) {
                Yn(() => {
                    if (this._throwIfClosed(), !this.isStopped) {
                        this.currentObservers || (this.currentObservers = Array.from(this.observers));
                        for (let r of this.currentObservers) r.next(n)
                    }
                })
            }
            error(n) {
                Yn(() => {
                    if (this._throwIfClosed(), !this.isStopped) {
                        this.hasError = this.isStopped = !0, this.thrownError = n;
                        let {
                            observers: r
                        } = this;
                        for (; r.length;) r.shift().error(n)
                    }
                })
            }
            complete() {
                Yn(() => {
                    if (this._throwIfClosed(), !this.isStopped) {
                        this.isStopped = !0;
                        let {
                            observers: n
                        } = this;
                        for (; n.length;) n.shift().complete()
                    }
                })
            }
            unsubscribe() {
                this.isStopped = this.closed = !0, this.observers = this.currentObservers = null
            }
            get observed() {
                var n;
                return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0
            }
            _trySubscribe(n) {
                return this._throwIfClosed(), super._trySubscribe(n)
            }
            _subscribe(n) {
                return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n)
            }
            _innerSubscribe(n) {
                let {
                    hasError: r,
                    isStopped: o,
                    observers: i
                } = this;
                return r || o ? Xa : (this.currentObservers = null, i.push(n), new re(() => {
                    this.currentObservers = null, mn(i, n)
                }))
            }
            _checkFinalizedStatuses(n) {
                let {
                    hasError: r,
                    thrownError: o,
                    isStopped: i
                } = this;
                r ? n.error(o) : i && n.complete()
            }
            asObservable() {
                let n = new R;
                return n.source = this, n
            }
        }
        return e.create = (t, n) => new ui(t, n), e
    })(),
    ui = class extends he {
        constructor(t, n) {
            super(), this.destination = t, this.source = n
        }
        next(t) {
            var n, r;
            (r = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || r === void 0 || r.call(n, t)
        }
        error(t) {
            var n, r;
            (r = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || r === void 0 || r.call(n, t)
        }
        complete() {
            var t, n;
            (n = (t = this.destination) === null || t === void 0 ? void 0 : t.complete) === null || n === void 0 || n.call(t)
        }
        _subscribe(t) {
            var n, r;
            return (r = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t)) !== null && r !== void 0 ? r : Xa
        }
    };
var pe = class extends he {
    constructor(t) {
        super(), this._value = t
    }
    get value() {
        return this.getValue()
    }
    _subscribe(t) {
        let n = super._subscribe(t);
        return !n.closed && t.next(this._value), n
    }
    getValue() {
        let {
            hasError: t,
            thrownError: n,
            _value: r
        } = this;
        if (t) throw n;
        return this._throwIfClosed(), r
    }
    next(t) {
        super.next(this._value = t)
    }
};
var $r = {
    now() {
        return ($r.delegate || Date).now()
    },
    delegate: void 0
};
var Br = class extends he {
    constructor(t = 1 / 0, n = 1 / 0, r = $r) {
        super(), this._bufferSize = t, this._windowTime = n, this._timestampProvider = r, this._buffer = [], this._infiniteTimeWindow = !0, this._infiniteTimeWindow = n === 1 / 0, this._bufferSize = Math.max(1, t), this._windowTime = Math.max(1, n)
    }
    next(t) {
        let {
            isStopped: n,
            _buffer: r,
            _infiniteTimeWindow: o,
            _timestampProvider: i,
            _windowTime: s
        } = this;
        n || (r.push(t), !o && r.push(i.now() + s)), this._trimBuffer(), super.next(t)
    }
    _subscribe(t) {
        this._throwIfClosed(), this._trimBuffer();
        let n = this._innerSubscribe(t),
            {
                _infiniteTimeWindow: r,
                _buffer: o
            } = this,
            i = o.slice();
        for (let s = 0; s < i.length && !t.closed; s += r ? 1 : 2) t.next(i[s]);
        return this._checkFinalizedStatuses(t), n
    }
    _trimBuffer() {
        let {
            _bufferSize: t,
            _timestampProvider: n,
            _buffer: r,
            _infiniteTimeWindow: o
        } = this, i = (o ? 1 : 2) * t;
        if (t < 1 / 0 && i < r.length && r.splice(0, r.length - i), !o) {
            let s = n.now(),
                a = 0;
            for (let u = 1; u < r.length && r[u] <= s; u += 2) a = u;
            a && r.splice(0, a + 1)
        }
    }
};
var ci = class extends re {
    constructor(t, n) {
        super()
    }
    schedule(t, n = 0) {
        return this
    }
};
var Hr = {
    setInterval(e, t, ...n) {
        let {
            delegate: r
        } = Hr;
        return r ? .setInterval ? r.setInterval(e, t, ...n) : setInterval(e, t, ...n)
    },
    clearInterval(e) {
        let {
            delegate: t
        } = Hr;
        return (t ? .clearInterval || clearInterval)(e)
    },
    delegate: void 0
};
var li = class extends ci {
    constructor(t, n) {
        super(t, n), this.scheduler = t, this.work = n, this.pending = !1
    }
    schedule(t, n = 0) {
        var r;
        if (this.closed) return this;
        this.state = t;
        let o = this.id,
            i = this.scheduler;
        return o != null && (this.id = this.recycleAsyncId(i, o, n)), this.pending = !0, this.delay = n, this.id = (r = this.id) !== null && r !== void 0 ? r : this.requestAsyncId(i, this.id, n), this
    }
    requestAsyncId(t, n, r = 0) {
        return Hr.setInterval(t.flush.bind(t, this), r)
    }
    recycleAsyncId(t, n, r = 0) {
        if (r != null && this.delay === r && this.pending === !1) return n;
        n != null && Hr.clearInterval(n)
    }
    execute(t, n) {
        if (this.closed) return new Error("executing a cancelled action");
        this.pending = !1;
        let r = this._execute(t, n);
        if (r) return r;
        this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
    }
    _execute(t, n) {
        let r = !1,
            o;
        try {
            this.work(t)
        } catch (i) {
            r = !0, o = i || new Error("Scheduled action threw falsy error")
        }
        if (r) return this.unsubscribe(), o
    }
    unsubscribe() {
        if (!this.closed) {
            let {
                id: t,
                scheduler: n
            } = this, {
                actions: r
            } = n;
            this.work = this.state = this.scheduler = null, this.pending = !1, mn(r, this), t != null && (this.id = this.recycleAsyncId(n, t, null)), this.delay = null, super.unsubscribe()
        }
    }
};
var Xn = class e {
    constructor(t, n = e.now) {
        this.schedulerActionCtor = t, this.now = n
    }
    schedule(t, n = 0, r) {
        return new this.schedulerActionCtor(this, t).schedule(r, n)
    }
};
Xn.now = $r.now;
var di = class extends Xn {
    constructor(t, n = Xn.now) {
        super(t, n), this.actions = [], this._active = !1
    }
    flush(t) {
        let {
            actions: n
        } = this;
        if (this._active) {
            n.push(t);
            return
        }
        let r;
        this._active = !0;
        do
            if (r = t.execute(t.state, t.delay)) break; while (t = n.shift());
        if (this._active = !1, r) {
            for (; t = n.shift();) t.unsubscribe();
            throw r
        }
    }
};
var et = new di(li),
    Vf = et;
var De = new R(e => e.complete());

function fi(e) {
    return e && T(e.schedule)
}

function uu(e) {
    return e[e.length - 1]
}

function Qt(e) {
    return T(uu(e)) ? e.pop() : void 0
}

function lt(e) {
    return fi(uu(e)) ? e.pop() : void 0
}

function jf(e, t) {
    return typeof uu(e) == "number" ? e.pop() : t
}

function ZN(e, t, n, r) {
    var o = arguments.length,
        i = o < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r,
        s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(e, t, n, r);
    else
        for (var a = e.length - 1; a >= 0; a--)(s = e[a]) && (i = (o < 3 ? s(i) : o > 3 ? s(t, n, i) : s(t, n)) || i);
    return o > 3 && i && Object.defineProperty(t, n, i), i
}

function YN(e, t) {
    return function(n, r) {
        t(n, r, e)
    }
}

function $f(e, t, n, r) {
    function o(i) {
        return i instanceof n ? i : new n(function(s) {
            s(i)
        })
    }
    return new(n || (n = Promise))(function(i, s) {
        function a(l) {
            try {
                c(r.next(l))
            } catch (d) {
                s(d)
            }
        }

        function u(l) {
            try {
                c(r.throw(l))
            } catch (d) {
                s(d)
            }
        }

        function c(l) {
            l.done ? i(l.value) : o(l.value).then(a, u)
        }
        c((r = r.apply(e, t || [])).next())
    })
}

function Uf(e) {
    var t = typeof Symbol == "function" && Symbol.iterator,
        n = t && e[t],
        r = 0;
    if (n) return n.call(e);
    if (e && typeof e.length == "number") return {
        next: function() {
            return e && r >= e.length && (e = void 0), {
                value: e && e[r++],
                done: !e
            }
        }
    };
    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
}

function Dn(e) {
    return this instanceof Dn ? (this.v = e, this) : new Dn(e)
}

function Bf(e, t, n) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var r = n.apply(e, t || []),
        o, i = [];
    return o = {}, s("next"), s("throw"), s("return"), o[Symbol.asyncIterator] = function() {
        return this
    }, o;

    function s(f) {
        r[f] && (o[f] = function(h) {
            return new Promise(function(p, g) {
                i.push([f, h, p, g]) > 1 || a(f, h)
            })
        })
    }

    function a(f, h) {
        try {
            u(r[f](h))
        } catch (p) {
            d(i[0][3], p)
        }
    }

    function u(f) {
        f.value instanceof Dn ? Promise.resolve(f.value.v).then(c, l) : d(i[0][2], f)
    }

    function c(f) {
        a("next", f)
    }

    function l(f) {
        a("throw", f)
    }

    function d(f, h) {
        f(h), i.shift(), i.length && a(i[0][0], i[0][1])
    }
}

function Hf(e) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var t = e[Symbol.asyncIterator],
        n;
    return t ? t.call(e) : (e = typeof Uf == "function" ? Uf(e) : e[Symbol.iterator](), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function() {
        return this
    }, n);

    function r(i) {
        n[i] = e[i] && function(s) {
            return new Promise(function(a, u) {
                s = e[i](s), o(a, u, s.done, s.value)
            })
        }
    }

    function o(i, s, a, u) {
        Promise.resolve(u).then(function(c) {
            i({
                value: c,
                done: a
            })
        }, s)
    }
}
var er = e => e && typeof e.length == "number" && typeof e != "function";

function hi(e) {
    return T(e ? .then)
}

function pi(e) {
    return T(e[Qn])
}

function gi(e) {
    return Symbol.asyncIterator && T(e ? .[Symbol.asyncIterator])
}

function mi(e) {
    return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
}

function AD() {
    return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator
}
var vi = AD();

function yi(e) {
    return T(e ? .[vi])
}

function Di(e) {
    return Bf(this, arguments, function*() {
        let n = e.getReader();
        try {
            for (;;) {
                let {
                    value: r,
                    done: o
                } = yield Dn(n.read());
                if (o) return yield Dn(void 0);
                yield yield Dn(r)
            }
        } finally {
            n.releaseLock()
        }
    })
}

function wi(e) {
    return T(e ? .getReader)
}

function k(e) {
    if (e instanceof R) return e;
    if (e != null) {
        if (pi(e)) return xD(e);
        if (er(e)) return ND(e);
        if (hi(e)) return RD(e);
        if (gi(e)) return zf(e);
        if (yi(e)) return OD(e);
        if (wi(e)) return FD(e)
    }
    throw mi(e)
}

function xD(e) {
    return new R(t => {
        let n = e[Qn]();
        if (T(n.subscribe)) return n.subscribe(t);
        throw new TypeError("Provided object does not correctly implement Symbol.observable")
    })
}

function ND(e) {
    return new R(t => {
        for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
        t.complete()
    })
}

function RD(e) {
    return new R(t => {
        e.then(n => {
            t.closed || (t.next(n), t.complete())
        }, n => t.error(n)).then(null, si)
    })
}

function OD(e) {
    return new R(t => {
        for (let n of e)
            if (t.next(n), t.closed) return;
        t.complete()
    })
}

function zf(e) {
    return new R(t => {
        PD(e, t).catch(n => t.error(n))
    })
}

function FD(e) {
    return zf(Di(e))
}

function PD(e, t) {
    var n, r, o, i;
    return $f(this, void 0, void 0, function*() {
        try {
            for (n = Hf(e); r = yield n.next(), !r.done;) {
                let s = r.value;
                if (t.next(s), t.closed) return
            }
        } catch (s) {
            o = {
                error: s
            }
        } finally {
            try {
                r && !r.done && (i = n.return) && (yield i.call(n))
            } finally {
                if (o) throw o.error
            }
        }
        t.complete()
    })
}

function Re(e, t, n, r = 0, o = !1) {
    let i = t.schedule(function() {
        n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe()
    }, r);
    if (e.add(i), !o) return i
}

function Ci(e, t = 0) {
    return S((n, r) => {
        n.subscribe(I(r, o => Re(r, e, () => r.next(o), t), () => Re(r, e, () => r.complete(), t), o => Re(r, e, () => r.error(o), t)))
    })
}

function Ei(e, t = 0) {
    return S((n, r) => {
        r.add(e.schedule(() => n.subscribe(r), t))
    })
}

function Gf(e, t) {
    return k(e).pipe(Ei(t), Ci(t))
}

function Wf(e, t) {
    return k(e).pipe(Ei(t), Ci(t))
}

function qf(e, t) {
    return new R(n => {
        let r = 0;
        return t.schedule(function() {
            r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule())
        })
    })
}

function Zf(e, t) {
    return new R(n => {
        let r;
        return Re(n, t, () => {
            r = e[vi](), Re(n, t, () => {
                let o, i;
                try {
                    ({
                        value: o,
                        done: i
                    } = r.next())
                } catch (s) {
                    n.error(s);
                    return
                }
                i ? n.complete() : n.next(o)
            }, 0, !0)
        }), () => T(r ? .return) && r.return()
    })
}

function Ii(e, t) {
    if (!e) throw new Error("Iterable cannot be null");
    return new R(n => {
        Re(n, t, () => {
            let r = e[Symbol.asyncIterator]();
            Re(n, t, () => {
                r.next().then(o => {
                    o.done ? n.complete() : n.next(o.value)
                })
            }, 0, !0)
        })
    })
}

function Yf(e, t) {
    return Ii(Di(e), t)
}

function Qf(e, t) {
    if (e != null) {
        if (pi(e)) return Gf(e, t);
        if (er(e)) return qf(e, t);
        if (hi(e)) return Wf(e, t);
        if (gi(e)) return Ii(e, t);
        if (yi(e)) return Zf(e, t);
        if (wi(e)) return Yf(e, t)
    }
    throw mi(e)
}

function W(e, t) {
    return t ? Qf(e, t) : k(e)
}

function A(...e) {
    let t = lt(e);
    return W(e, t)
}

function tr(e, t) {
    let n = T(e) ? e : () => e,
        r = o => o.error(n());
    return new R(t ? o => t.schedule(r, 0, o) : r)
}

function cu(e) {
    return !!e && (e instanceof R || T(e.lift) && T(e.subscribe))
}
var Tt = qn(e => function() {
    e(this), this.name = "EmptyError", this.message = "no elements in sequence"
});

function Kf(e) {
    return e instanceof Date && !isNaN(e)
}

function O(e, t) {
    return S((n, r) => {
        let o = 0;
        n.subscribe(I(r, i => {
            r.next(e.call(t, i, o++))
        }))
    })
}
var {
    isArray: kD
} = Array;

function LD(e, t) {
    return kD(t) ? e(...t) : e(t)
}

function nr(e) {
    return O(t => LD(e, t))
}
var {
    isArray: VD
} = Array, {
    getPrototypeOf: jD,
    prototype: UD,
    keys: $D
} = Object;

function bi(e) {
    if (e.length === 1) {
        let t = e[0];
        if (VD(t)) return {
            args: t,
            keys: null
        };
        if (BD(t)) {
            let n = $D(t);
            return {
                args: n.map(r => t[r]),
                keys: n
            }
        }
    }
    return {
        args: e,
        keys: null
    }
}

function BD(e) {
    return e && typeof e == "object" && jD(e) === UD
}

function _i(e, t) {
    return e.reduce((n, r, o) => (n[r] = t[o], n), {})
}

function zr(...e) {
    let t = lt(e),
        n = Qt(e),
        {
            args: r,
            keys: o
        } = bi(e);
    if (r.length === 0) return W([], t);
    let i = new R(HD(r, t, o ? s => _i(o, s) : fe));
    return n ? i.pipe(nr(n)) : i
}

function HD(e, t, n = fe) {
    return r => {
        Jf(t, () => {
            let {
                length: o
            } = e, i = new Array(o), s = o, a = o;
            for (let u = 0; u < o; u++) Jf(t, () => {
                let c = W(e[u], t),
                    l = !1;
                c.subscribe(I(r, d => {
                    i[u] = d, l || (l = !0, a--), a || r.next(n(i.slice()))
                }, () => {
                    --s || r.complete()
                }))
            }, r)
        }, r)
    }
}

function Jf(e, t, n) {
    e ? Re(n, e, t) : t()
}

function Xf(e, t, n, r, o, i, s, a) {
    let u = [],
        c = 0,
        l = 0,
        d = !1,
        f = () => {
            d && !u.length && !c && t.complete()
        },
        h = g => c < r ? p(g) : u.push(g),
        p = g => {
            i && t.next(g), c++;
            let v = !1;
            k(n(g, l++)).subscribe(I(t, w => {
                o ? .(w), i ? h(w) : t.next(w)
            }, () => {
                v = !0
            }, void 0, () => {
                if (v) try {
                    for (c--; u.length && c < r;) {
                        let w = u.shift();
                        s ? Re(t, s, () => p(w)) : p(w)
                    }
                    f()
                } catch (w) {
                    t.error(w)
                }
            }))
        };
    return e.subscribe(I(t, h, () => {
        d = !0, f()
    })), () => {
        a ? .()
    }
}

function te(e, t, n = 1 / 0) {
    return T(t) ? te((r, o) => O((i, s) => t(r, i, o, s))(k(e(r, o))), n) : (typeof t == "number" && (n = t), S((r, o) => Xf(r, o, e, n)))
}

function Kt(e = 1 / 0) {
    return te(fe, e)
}

function eh() {
    return Kt(1)
}

function dt(...e) {
    return eh()(W(e, lt(e)))
}

function Mi(e) {
    return new R(t => {
        k(e()).subscribe(t)
    })
}

function lu(...e) {
    let t = Qt(e),
        {
            args: n,
            keys: r
        } = bi(e),
        o = new R(i => {
            let {
                length: s
            } = n;
            if (!s) {
                i.complete();
                return
            }
            let a = new Array(s),
                u = s,
                c = s;
            for (let l = 0; l < s; l++) {
                let d = !1;
                k(n[l]).subscribe(I(i, f => {
                    d || (d = !0, c--), a[l] = f
                }, () => u--, void 0, () => {
                    (!u || !d) && (c || i.next(r ? _i(r, a) : a), i.complete())
                }))
            }
        });
    return t ? o.pipe(nr(t)) : o
}
var zD = ["addListener", "removeListener"],
    GD = ["addEventListener", "removeEventListener"],
    WD = ["on", "off"];

function du(e, t, n, r) {
    if (T(n) && (r = n, n = void 0), r) return du(e, t, n).pipe(nr(r));
    let [o, i] = YD(e) ? GD.map(s => a => e[s](t, a, n)) : qD(e) ? zD.map(th(e, t)) : ZD(e) ? WD.map(th(e, t)) : [];
    if (!o && er(e)) return te(s => du(s, t, n))(k(e));
    if (!o) throw new TypeError("Invalid event target");
    return new R(s => {
        let a = (...u) => s.next(1 < u.length ? u : u[0]);
        return o(a), () => i(a)
    })
}

function th(e, t) {
    return n => r => e[n](t, r)
}

function qD(e) {
    return T(e.addListener) && T(e.removeListener)
}

function ZD(e) {
    return T(e.on) && T(e.off)
}

function YD(e) {
    return T(e.addEventListener) && T(e.removeEventListener)
}

function At(e = 0, t, n = Vf) {
    let r = -1;
    return t != null && (fi(t) ? n = t : r = t), new R(o => {
        let i = Kf(e) ? +e - n.now() : e;
        i < 0 && (i = 0);
        let s = 0;
        return n.schedule(function() {
            o.closed || (o.next(s++), 0 <= r ? this.schedule(void 0, r) : o.complete())
        }, i)
    })
}

function QD(e = 0, t = et) {
    return e < 0 && (e = 0), At(e, e, t)
}

function KD(...e) {
    let t = lt(e),
        n = jf(e, 1 / 0),
        r = e;
    return r.length ? r.length === 1 ? k(r[0]) : Kt(n)(W(r, t)) : De
}
var JD = new R(Xe);
var {
    isArray: XD
} = Array;

function Si(e) {
    return e.length === 1 && XD(e[0]) ? e[0] : e
}

function we(e, t) {
    return S((n, r) => {
        let o = 0;
        n.subscribe(I(r, i => e.call(t, i, o++) && r.next(i)))
    })
}

function ew(...e) {
    return e = Si(e), e.length === 1 ? k(e[0]) : new R(tw(e))
}

function tw(e) {
    return t => {
        let n = [];
        for (let r = 0; n && !t.closed && r < e.length; r++) n.push(k(e[r]).subscribe(I(t, o => {
            if (n) {
                for (let i = 0; i < n.length; i++) i !== r && n[i].unsubscribe();
                n = null
            }
            t.next(o)
        })))
    }
}

function nw(...e) {
    let t = Qt(e),
        n = Si(e);
    return n.length ? new R(r => {
        let o = n.map(() => []),
            i = n.map(() => !1);
        r.add(() => {
            o = i = null
        });
        for (let s = 0; !r.closed && s < n.length; s++) k(n[s]).subscribe(I(r, a => {
            if (o[s].push(a), o.every(u => u.length)) {
                let u = o.map(c => c.shift());
                r.next(t ? t(...u) : u), o.some((c, l) => !c.length && i[l]) && r.complete()
            }
        }, () => {
            i[s] = !0, !o[s].length && r.complete()
        }));
        return () => {
            o = i = null
        }
    }) : De
}

function nh(e) {
    return S((t, n) => {
        let r = !1,
            o = null,
            i = null,
            s = !1,
            a = () => {
                if (i ? .unsubscribe(), i = null, r) {
                    r = !1;
                    let c = o;
                    o = null, n.next(c)
                }
                s && n.complete()
            },
            u = () => {
                i = null, s && n.complete()
            };
        t.subscribe(I(n, c => {
            r = !0, o = c, i || k(e(c)).subscribe(i = I(n, a, u))
        }, () => {
            s = !0, (!r || !i || i.closed) && n.complete()
        }))
    })
}

function rw(e, t = et) {
    return nh(() => At(e, t))
}

function Jt(e) {
    return S((t, n) => {
        let r = null,
            o = !1,
            i;
        r = t.subscribe(I(n, void 0, void 0, s => {
            i = k(e(s, Jt(e)(t))), r ? (r.unsubscribe(), r = null, i.subscribe(n)) : o = !0
        })), o && (r.unsubscribe(), r = null, i.subscribe(n))
    })
}

function rh(e, t, n, r, o) {
    return (i, s) => {
        let a = n,
            u = t,
            c = 0;
        i.subscribe(I(s, l => {
            let d = c++;
            u = a ? e(u, l, d) : (a = !0, l), r && s.next(u)
        }, o && (() => {
            a && s.next(u), s.complete()
        })))
    }
}

function xt(e, t) {
    return T(t) ? te(e, t, 1) : te(e, 1)
}

function oh(e, t = et) {
    return S((n, r) => {
        let o = null,
            i = null,
            s = null,
            a = () => {
                if (o) {
                    o.unsubscribe(), o = null;
                    let c = i;
                    i = null, r.next(c)
                }
            };

        function u() {
            let c = s + e,
                l = t.now();
            if (l < c) {
                o = this.schedule(void 0, c - l), r.add(o);
                return
            }
            a()
        }
        n.subscribe(I(r, c => {
            i = c, s = t.now(), o || (o = t.schedule(u, e), r.add(o))
        }, () => {
            a(), r.complete()
        }, void 0, () => {
            i = o = null
        }))
    })
}

function Xt(e) {
    return S((t, n) => {
        let r = !1;
        t.subscribe(I(n, o => {
            r = !0, n.next(o)
        }, () => {
            r || n.next(e), n.complete()
        }))
    })
}

function ze(e) {
    return e <= 0 ? () => De : S((t, n) => {
        let r = 0;
        t.subscribe(I(n, o => {
            ++r <= e && (n.next(o), e <= r && n.complete())
        }))
    })
}

function ih() {
    return S((e, t) => {
        e.subscribe(I(t, Xe))
    })
}

function Gr(e) {
    return O(() => e)
}

function fu(e, t) {
    return t ? n => dt(t.pipe(ze(1), ih()), n.pipe(fu(e))) : te((n, r) => k(e(n, r)).pipe(ze(1), Gr(n)))
}

function ow(e, t = et) {
    let n = At(e, t);
    return fu(() => n)
}

function iw(e, t = fe) {
    return e = e ? ? sw, S((n, r) => {
        let o, i = !0;
        n.subscribe(I(r, s => {
            let a = t(s);
            (i || !e(o, a)) && (i = !1, o = a, r.next(s))
        }))
    })
}

function sw(e, t) {
    return e === t
}

function Ti(e = aw) {
    return S((t, n) => {
        let r = !1;
        t.subscribe(I(n, o => {
            r = !0, n.next(o)
        }, () => r ? n.complete() : n.error(e())))
    })
}

function aw() {
    return new Tt
}

function uw(...e) {
    return t => dt(t, A(...e))
}

function en(e) {
    return S((t, n) => {
        try {
            t.subscribe(n)
        } finally {
            n.add(e)
        }
    })
}

function ft(e, t) {
    let n = arguments.length >= 2;
    return r => r.pipe(e ? we((o, i) => e(o, i, r)) : fe, ze(1), n ? Xt(t) : Ti(() => new Tt))
}

function rr(e) {
    return e <= 0 ? () => De : S((t, n) => {
        let r = [];
        t.subscribe(I(n, o => {
            r.push(o), e < r.length && r.shift()
        }, () => {
            for (let o of r) n.next(o);
            n.complete()
        }, void 0, () => {
            r = null
        }))
    })
}

function hu(e, t) {
    let n = arguments.length >= 2;
    return r => r.pipe(e ? we((o, i) => e(o, i, r)) : fe, rr(1), n ? Xt(t) : Ti(() => new Tt))
}

function cw() {
    return S((e, t) => {
        let n, r = !1;
        e.subscribe(I(t, o => {
            let i = n;
            n = o, r && t.next([i, o]), r = !0
        }))
    })
}

function pu(e, t) {
    return S(rh(e, t, arguments.length >= 2, !0))
}

function mu(e = {}) {
    let {
        connector: t = () => new he,
        resetOnError: n = !0,
        resetOnComplete: r = !0,
        resetOnRefCountZero: o = !0
    } = e;
    return i => {
        let s, a, u, c = 0,
            l = !1,
            d = !1,
            f = () => {
                a ? .unsubscribe(), a = void 0
            },
            h = () => {
                f(), s = u = void 0, l = d = !1
            },
            p = () => {
                let g = s;
                h(), g ? .unsubscribe()
            };
        return S((g, v) => {
            c++, !d && !l && f();
            let w = u = u ? ? t();
            v.add(() => {
                c--, c === 0 && !d && !l && (a = gu(p, o))
            }), w.subscribe(v), !s && c > 0 && (s = new St({
                next: V => w.next(V),
                error: V => {
                    d = !0, f(), a = gu(h, n, V), w.error(V)
                },
                complete: () => {
                    l = !0, f(), a = gu(h, r), w.complete()
                }
            }), k(g).subscribe(s))
        })(i)
    }
}

function gu(e, t, ...n) {
    if (t === !0) {
        e();
        return
    }
    if (t === !1) return;
    let r = new St({
        next: () => {
            r.unsubscribe(), e()
        }
    });
    return k(t(...n)).subscribe(r)
}

function lw(e, t, n) {
    let r, o = !1;
    return e && typeof e == "object" ? {
        bufferSize: r = 1 / 0,
        windowTime: t = 1 / 0,
        refCount: o = !1,
        scheduler: n
    } = e : r = e ? ? 1 / 0, mu({
        connector: () => new Br(r, t, n),
        resetOnError: !0,
        resetOnComplete: !1,
        resetOnRefCountZero: o
    })
}

function dw(e) {
    return we((t, n) => e <= n)
}

function vu(...e) {
    let t = lt(e);
    return S((n, r) => {
        (t ? dt(e, n, t) : dt(e, n)).subscribe(r)
    })
}

function Oe(e, t) {
    return S((n, r) => {
        let o = null,
            i = 0,
            s = !1,
            a = () => s && !o && r.complete();
        n.subscribe(I(r, u => {
            o ? .unsubscribe();
            let c = 0,
                l = i++;
            k(e(u, l)).subscribe(o = I(r, d => r.next(t ? t(u, d, l, c++) : d), () => {
                o = null, a()
            }))
        }, () => {
            s = !0, a()
        }))
    })
}

function yu(e) {
    return S((t, n) => {
        k(e).subscribe(I(n, () => n.complete(), Xe)), !n.closed && t.subscribe(n)
    })
}

function fw(e, t = !1) {
    return S((n, r) => {
        let o = 0;
        n.subscribe(I(r, i => {
            let s = e(i, o++);
            (s || t) && r.next(i), !s && r.complete()
        }))
    })
}

function ue(e, t, n) {
    let r = T(e) || t || n ? {
        next: e,
        error: t,
        complete: n
    } : e;
    return r ? S((o, i) => {
        var s;
        (s = r.subscribe) === null || s === void 0 || s.call(r);
        let a = !0;
        o.subscribe(I(i, u => {
            var c;
            (c = r.next) === null || c === void 0 || c.call(r, u), i.next(u)
        }, () => {
            var u;
            a = !1, (u = r.complete) === null || u === void 0 || u.call(r), i.complete()
        }, u => {
            var c;
            a = !1, (c = r.error) === null || c === void 0 || c.call(r, u), i.error(u)
        }, () => {
            var u, c;
            a && ((u = r.unsubscribe) === null || u === void 0 || u.call(r)), (c = r.finalize) === null || c === void 0 || c.call(r)
        }))
    }) : fe
}

function sh(e, t) {
    return S((n, r) => {
        let {
            leading: o = !0,
            trailing: i = !1
        } = t ? ? {}, s = !1, a = null, u = null, c = !1, l = () => {
            u ? .unsubscribe(), u = null, i && (h(), c && r.complete())
        }, d = () => {
            u = null, c && r.complete()
        }, f = p => u = k(e(p)).subscribe(I(r, l, d)), h = () => {
            if (s) {
                s = !1;
                let p = a;
                a = null, r.next(p), !c && f(p)
            }
        };
        n.subscribe(I(r, p => {
            s = !0, a = p, !(u && !u.closed) && (o ? h() : f(p))
        }, () => {
            c = !0, !(i && s && u && !u.closed) && r.complete()
        }))
    })
}

function hw(e, t = et, n) {
    let r = At(e, t);
    return sh(() => r, n)
}

function pw(...e) {
    let t = Qt(e);
    return S((n, r) => {
        let o = e.length,
            i = new Array(o),
            s = e.map(() => !1),
            a = !1;
        for (let u = 0; u < o; u++) k(e[u]).subscribe(I(r, c => {
            i[u] = c, !a && !s[u] && (s[u] = !0, (a = s.every(fe)) && (s = null))
        }, Xe));
        n.subscribe(I(r, u => {
            if (a) {
                let c = [u, ...i];
                r.next(t ? t(...c) : c)
            }
        }))
    })
}
var Jh = "https://g.co/ng/security#xss",
    D = class extends Error {
        constructor(t, n) {
            super(fs(t, n)), this.code = t
        }
    };

function fs(e, t) {
    return `${`NG0${Math.abs(e)}`}${t?": "+t:""}`
}
var Pu = class extends he {
    constructor(t = !1) {
        super(), this.__isAsync = t
    }
    emit(t) {
        super.next(t)
    }
    subscribe(t, n, r) {
        let o = t,
            i = n || (() => null),
            s = r;
        if (t && typeof t == "object") {
            let u = t;
            o = u.next ? .bind(u), i = u.error ? .bind(u), s = u.complete ? .bind(u)
        }
        this.__isAsync && (i = Du(i), o && (o = Du(o)), s && (s = Du(s)));
        let a = super.subscribe({
            next: o,
            error: i,
            complete: s
        });
        return t instanceof re && t.add(a), a
    }
};

function Du(e) {
    return t => {
        setTimeout(e, void 0, t)
    }
}
var ne = Pu;
var L = function(e) {
    return e[e.Default = 0] = "Default", e[e.Host = 1] = "Host", e[e.Self = 2] = "Self", e[e.SkipSelf = 4] = "SkipSelf", e[e.Optional = 8] = "Optional", e
}(L || {});

function Me(e) {
    if (typeof e == "string") return e;
    if (Array.isArray(e)) return "[" + e.map(Me).join(", ") + "]";
    if (e == null) return "" + e;
    if (e.overriddenName) return `${e.overriddenName}`;
    if (e.name) return `${e.name}`;
    let t = e.toString();
    if (t == null) return "" + t;
    let n = t.indexOf(`
`);
    return n === -1 ? t : t.substring(0, n)
}

function ku(e, t) {
    return e == null || e === "" ? t === null ? "" : t : t == null || t === "" ? e : e + " " + t
}

function mw(e, t, n) {
    e != t && vw(n, e, t, "==")
}

function vw(e, t, n, r) {
    throw new Error(`ASSERTION ERROR: ${e}` + (r == null ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`))
}
var Xh = function(e) {
        return e[e.OnPush = 0] = "OnPush", e[e.Default = 1] = "Default", e
    }(Xh || {}),
    gt = function(e) {
        return e[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom", e
    }(gt || {});

function go(e) {
    return {
        toString: e
    }.toString()
}
var oe = globalThis;
var Rt = {},
    _e = [];

function Z(e) {
    for (let t in e)
        if (e[t] === Z) return t;
    throw Error("Could not find renamed property on target object.")
}

function yw(e, t) {
    for (let n in t) t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n])
}
var Dw = Z({\
        u0275cmp: Z
    }),
    ww = Z({\
        u0275dir: Z
    }),
    Cw = Z({\
        u0275pipe: Z
    }),
    Ew = Z({\
        u0275mod: Z
    }),
    Hi = Z({\
        u0275fac: Z
    }),
    Wr = Z({
        __NG_ELEMENT_ID__: Z
    }),
    ah = Z({
        __NG_ENV_ID__: Z
    }),
    Se = function(e) {
        return e[e.None = 0] = "None", e[e.SignalBased = 1] = "SignalBased", e[e.HasDecoratorInputTransform = 2] = "HasDecoratorInputTransform", e
    }(Se || {});

function ep(e, t, n) {
    let r = e.length;
    for (;;) {
        let o = e.indexOf(t, n);
        if (o === -1) return o;
        if (o === 0 || e.charCodeAt(o - 1) <= 32) {
            let i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o
        }
        n = o + 1
    }
}

function Lu(e, t, n) {
    let r = 0;
    for (; r < n.length;) {
        let o = n[r];
        if (typeof o == "number") {
            if (o !== 0) break;
            r++;
            let i = n[r++],
                s = n[r++],
                a = n[r++];
            e.setAttribute(t, s, a, i)
        } else {
            let i = o,
                s = n[++r];
            Iw(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++
        }
    }
    return r
}

function tp(e) {
    return e === 3 || e === 4 || e === 6
}

function Iw(e) {
    return e.charCodeAt(0) === 64
}

function Jr(e, t) {
    if (!(t === null || t.length === 0))
        if (e === null || e.length === 0) e = t.slice();
        else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
                let o = t[r];
                typeof o == "number" ? n = o : n === 0 || (n === -1 || n === 2 ? uh(e, n, o, null, t[++r]) : uh(e, n, o, null, null))
            }
        }
    return e
}

function uh(e, t, n, r, o) {
    let i = 0,
        s = e.length;
    if (t === -1) s = -1;
    else
        for (; i < e.length;) {
            let a = e[i++];
            if (typeof a == "number") {
                if (a === t) {
                    s = -1;
                    break
                } else if (a > t) {
                    s = i - 1;
                    break
                }
            }
        }
    for (; i < e.length;) {
        let a = e[i];
        if (typeof a == "number") break;
        if (a === n) {
            if (r === null) {
                o !== null && (e[i + 1] = o);
                return
            } else if (r === e[i + 1]) {
                e[i + 2] = o;
                return
            }
        }
        i++, r !== null && i++, o !== null && i++
    }
    s !== -1 && (e.splice(s, 0, t), i = s + 1), e.splice(i++, 0, n), r !== null && e.splice(i++, 0, r), o !== null && e.splice(i++, 0, o)
}
var np = "ng-template";

function bw(e, t, n) {
    let r = 0,
        o = !0;
    for (; r < e.length;) {
        let i = e[r++];
        if (typeof i == "string" && o) {
            let s = e[r++];
            if (n && i === "class" && ep(s.toLowerCase(), t, 0) !== -1) return !0
        } else if (i === 1) {
            for (; r < e.length && typeof(i = e[r++]) == "string";)
                if (i.toLowerCase() === t) return !0;
            return !1
        } else typeof i == "number" && (o = !1)
    }
    return !1
}

function rp(e) {
    return e.type === 4 && e.value !== np
}

function _w(e, t, n) {
    let r = e.type === 4 && !n ? np : e.value;
    return t === r
}

function Mw(e, t, n) {
    let r = 4,
        o = e.attrs || [],
        i = Aw(o),
        s = !1;
    for (let a = 0; a < t.length; a++) {
        let u = t[a];
        if (typeof u == "number") {
            if (!s && !tt(r) && !tt(u)) return !1;
            if (s && tt(u)) continue;
            s = !1, r = u | r & 1;
            continue
        }
        if (!s)
            if (r & 4) {
                if (r = 2 | r & 1, u !== "" && !_w(e, u, n) || u === "" && t.length === 1) {
                    if (tt(r)) return !1;
                    s = !0
                }
            } else {
                let c = r & 8 ? u : t[++a];
                if (r & 8 && e.attrs !== null) {
                    if (!bw(e.attrs, c, n)) {
                        if (tt(r)) return !1;
                        s = !0
                    }
                    continue
                }
                let l = r & 8 ? "class" : u,
                    d = Sw(l, o, rp(e), n);
                if (d === -1) {
                    if (tt(r)) return !1;
                    s = !0;
                    continue
                }
                if (c !== "") {
                    let f;
                    d > i ? f = "" : f = o[d + 1].toLowerCase();
                    let h = r & 8 ? f : null;
                    if (h && ep(h, c, 0) !== -1 || r & 2 && c !== f) {
                        if (tt(r)) return !1;
                        s = !0
                    }
                }
            }
    }
    return tt(r) || s
}

function tt(e) {
    return (e & 1) === 0
}

function Sw(e, t, n, r) {
    if (t === null) return -1;
    let o = 0;
    if (r || !n) {
        let i = !1;
        for (; o < t.length;) {
            let s = t[o];
            if (s === e) return o;
            if (s === 3 || s === 6) i = !0;
            else if (s === 1 || s === 2) {
                let a = t[++o];
                for (; typeof a == "string";) a = t[++o];
                continue
            } else {
                if (s === 4) break;
                if (s === 0) {
                    o += 4;
                    continue
                }
            }
            o += i ? 1 : 2
        }
        return -1
    } else return xw(t, e)
}

function op(e, t, n = !1) {
    for (let r = 0; r < t.length; r++)
        if (Mw(e, t[r], n)) return !0;
    return !1
}

function Tw(e) {
    let t = e.attrs;
    if (t != null) {
        let n = t.indexOf(5);
        if (!(n & 1)) return t[n + 1]
    }
    return null
}

function Aw(e) {
    for (let t = 0; t < e.length; t++) {
        let n = e[t];
        if (tp(n)) return t
    }
    return e.length
}

function xw(e, t) {
    let n = e.indexOf(4);
    if (n > -1)
        for (n++; n < e.length;) {
            let r = e[n];
            if (typeof r == "number") return -1;
            if (r === t) return n;
            n++
        }
    return -1
}

function Nw(e, t) {
    e: for (let n = 0; n < t.length; n++) {
        let r = t[n];
        if (e.length === r.length) {
            for (let o = 0; o < e.length; o++)
                if (e[o] !== r[o]) continue e;
            return !0
        }
    }
    return !1
}

function ch(e, t) {
    return e ? ":not(" + t.trim() + ")" : t
}

function Rw(e) {
    let t = e[0],
        n = 1,
        r = 2,
        o = "",
        i = !1;
    for (; n < e.length;) {
        let s = e[n];
        if (typeof s == "string")
            if (r & 2) {
                let a = e[++n];
                o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
            } else r & 8 ? o += "." + s : r & 4 && (o += " " + s);
        else o !== "" && !tt(s) && (t += ch(i, o), o = ""), r = s, i = i || !tt(r);
        n++
    }
    return o !== "" && (t += ch(i, o)), t
}

function Ow(e) {
    return e.map(Rw).join(",")
}

function Fw(e) {
    let t = [],
        n = [],
        r = 1,
        o = 2;
    for (; r < e.length;) {
        let i = e[r];
        if (typeof i == "string") o === 2 ? i !== "" && t.push(i, e[++r]) : o === 8 && n.push(i);
        else {
            if (!tt(o)) break;
            o = i
        }
        r++
    }
    return {
        attrs: t,
        classes: n
    }
}

function ip(e) {
    return go(() => {
        let t = cp(e),
            n = Q(y({}, t), {
                decls: e.decls,
                vars: e.vars,
                template: e.template,
                consts: e.consts || null,
                ngContentSelectors: e.ngContentSelectors,
                onPush: e.changeDetection === Xh.OnPush,
                directiveDefs: null,
                pipeDefs: null,
                dependencies: t.standalone && e.dependencies || null,
                getStandaloneInjector: null,
                signals: e.signals ? ? !1,
                data: e.data || {},
                encapsulation: e.encapsulation || gt.Emulated,
                styles: e.styles || _e,
                _: null,
                schemas: e.schemas || null,
                tView: null,
                id: ""
            });
        lp(n);
        let r = e.dependencies;
        return n.directiveDefs = zi(r, !1), n.pipeDefs = zi(r, !0), n.id = Lw(n), n
    })
}

function Pw(e) {
    return Ot(e) || Xc(e)
}

function kw(e) {
    return e !== null
}

function je(e) {
    return go(() => ({
        type: e.type,
        bootstrap: e.bootstrap || _e,
        declarations: e.declarations || _e,
        imports: e.imports || _e,
        exports: e.exports || _e,
        transitiveCompileScopes: null,
        schemas: e.schemas || null,
        id: e.id || null
    }))
}

function lh(e, t) {
    if (e == null) return Rt;
    let n = {};
    for (let r in e)
        if (e.hasOwnProperty(r)) {
            let o = e[r],
                i, s, a = Se.None;
            Array.isArray(o) ? (a = o[0], i = o[1], s = o[2] ? ? i) : (i = o, s = o), t ? (n[i] = a !== Se.None ? [r, a] : r, t[i] = s) : n[i] = r
        }
    return n
}

function z(e) {
    return go(() => {
        let t = cp(e);
        return lp(t), t
    })
}

function Fn(e) {
    return {
        type: e.type,
        name: e.name,
        factory: null,
        pure: e.pure !== !1,
        standalone: e.standalone === !0,
        onDestroy: e.type.prototype.ngOnDestroy || null
    }
}

function Ot(e) {
    return e[Dw] || null
}

function Xc(e) {
    return e[ww] || null
}

function sp(e) {
    return e[Cw] || null
}

function ap(e) {
    let t = Ot(e) || Xc(e) || sp(e);
    return t !== null ? t.standalone : !1
}

function up(e, t) {
    let n = e[Ew] || null;
    if (!n && t === !0) throw new Error(`Type ${Me(e)} does not have '\u0275mod' property.`);
    return n
}

function cp(e) {
    let t = {};
    return {
        type: e.type,
        providersResolver: null,
        factory: null,
        hostBindings: e.hostBindings || null,
        hostVars: e.hostVars || 0,
        hostAttrs: e.hostAttrs || null,
        contentQueries: e.contentQueries || null,
        declaredInputs: t,
        inputTransforms: null,
        inputConfig: e.inputs || Rt,
        exportAs: e.exportAs || null,
        standalone: e.standalone === !0,
        signals: e.signals === !0,
        selectors: e.selectors || _e,
        viewQuery: e.viewQuery || null,
        features: e.features || null,
        setInput: null,
        findHostDirectiveDefs: null,
        hostDirectives: null,
        inputs: lh(e.inputs, t),
        outputs: lh(e.outputs),
        debugInfo: null
    }
}

function lp(e) {
    e.features ? .forEach(t => t(e))
}

function zi(e, t) {
    if (!e) return null;
    let n = t ? sp : Pw;
    return () => (typeof e == "function" ? e() : e).map(r => n(r)).filter(kw)
}

function Lw(e) {
    let t = 0,
        n = [e.selectors, e.ngContentSelectors, e.hostVars, e.hostAttrs, e.consts, e.vars, e.decls, e.encapsulation, e.standalone, e.signals, e.exportAs, JSON.stringify(e.inputs), JSON.stringify(e.outputs), Object.getOwnPropertyNames(e.type.prototype), !!e.contentQueries, !!e.viewQuery].join("|");
    for (let o of n) t = Math.imul(31, t) + o.charCodeAt(0) << 0;
    return t += 2147483648, "c" + t
}
var wt = 0,
    N = 1,
    x = 2,
    ve = 3,
    nt = 4,
    ke = 5,
    lr = 6,
    Xr = 7,
    me = 8,
    dr = 9,
    Ft = 10,
    j = 11,
    eo = 12,
    dh = 13,
    vr = 14,
    Pe = 15,
    mo = 16,
    or = 17,
    Pt = 18,
    hs = 19,
    dp = 20,
    nn = 21,
    wu = 22,
    In = 23,
    ie = 25,
    el = 1;
var bn = 7,
    Gi = 8,
    fr = 9,
    Ce = 10,
    tl = function(e) {
        return e[e.None = 0] = "None", e[e.HasTransplantedViews = 2] = "HasTransplantedViews", e
    }(tl || {});

function Cn(e) {
    return Array.isArray(e) && typeof e[el] == "object"
}

function jt(e) {
    return Array.isArray(e) && e[el] === !0
}

function nl(e) {
    return (e.flags & 4) !== 0
}

function ps(e) {
    return e.componentOffset > -1
}

function gs(e) {
    return (e.flags & 1) === 1
}

function kt(e) {
    return !!e.template
}

function Vw(e) {
    return (e[x] & 512) !== 0
}
var fp = "svg",
    jw = "math",
    Uw = !1;

function $w() {
    return Uw
}

function Ge(e) {
    for (; Array.isArray(e);) e = e[wt];
    return e
}

function Bw(e) {
    for (; Array.isArray(e);) {
        if (typeof e[el] == "object") return e;
        e = e[wt]
    }
    return null
}

function ms(e, t) {
    return Ge(t[e])
}

function We(e, t) {
    return Ge(t[e.index])
}

function rl(e, t) {
    return e.data[t]
}

function vs(e, t) {
    return e[t]
}

function on(e, t) {
    let n = t[e];
    return Cn(n) ? n : n[wt]
}

function Hw(e) {
    return (e[x] & 4) === 4
}

function ol(e) {
    return (e[x] & 128) === 128
}

function zw(e) {
    return jt(e[ve])
}

function _n(e, t) {
    return t == null ? null : e[t]
}

function hp(e) {
    e[or] = 0
}

function Gw(e) {
    e[x] & 1024 || (e[x] |= 1024, ol(e) && to(e))
}

function Ww(e, t) {
    for (; e > 0;) t = t[vr], e--;
    return t
}

function il(e) {
    return !!(e[x] & 9216 || e[In] ? .dirty)
}

function Vu(e) {
    il(e) ? to(e) : e[x] & 64 && ($w() ? (e[x] |= 1024, to(e)) : e[Ft].changeDetectionScheduler ? .notify())
}

function to(e) {
    e[Ft].changeDetectionScheduler ? .notify();
    let t = no(e);
    for (; t !== null && !(t[x] & 8192 || (t[x] |= 8192, !ol(t)));) t = no(t)
}

function pp(e, t) {
    if ((e[x] & 256) === 256) throw new D(911, !1);
    e[nn] === null && (e[nn] = []), e[nn].push(t)
}

function qw(e, t) {
    if (e[nn] === null) return;
    let n = e[nn].indexOf(t);
    n !== -1 && e[nn].splice(n, 1)
}

function no(e) {
    let t = e[ve];
    return jt(t) ? t[ve] : t
}
var F = {
    lFrame: Ip(null),
    bindingsEnabled: !0,
    skipHydrationRootTNode: null
};

function Zw() {
    return F.lFrame.elementDepthCount
}

function Yw() {
    F.lFrame.elementDepthCount++
}

function Qw() {
    F.lFrame.elementDepthCount--
}

function gp() {
    return F.bindingsEnabled
}

function mp() {
    return F.skipHydrationRootTNode !== null
}

function Kw(e) {
    return F.skipHydrationRootTNode === e
}

function Jw() {
    F.skipHydrationRootTNode = null
}

function b() {
    return F.lFrame.lView
}

function G() {
    return F.lFrame.tView
}

function GL(e) {
    return F.lFrame.contextLView = e, e[me]
}

function WL(e) {
    return F.lFrame.contextLView = null, e
}

function Ee() {
    let e = vp();
    for (; e !== null && e.type === 64;) e = e.parent;
    return e
}

function vp() {
    return F.lFrame.currentTNode
}

function ro() {
    let e = F.lFrame,
        t = e.currentTNode;
    return e.isParent ? t : t.parent
}

function mt(e, t) {
    let n = F.lFrame;
    n.currentTNode = e, n.isParent = t
}

function sl() {
    return F.lFrame.isParent
}

function al() {
    F.lFrame.isParent = !1
}

function Xw() {
    return F.lFrame.contextLView
}

function Ut() {
    let e = F.lFrame,
        t = e.bindingRootIndex;
    return t === -1 && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t
}

function ul() {
    return F.lFrame.bindingIndex
}

function eC(e) {
    return F.lFrame.bindingIndex = e
}

function $t() {
    return F.lFrame.bindingIndex++
}

function ys(e) {
    let t = F.lFrame,
        n = t.bindingIndex;
    return t.bindingIndex = t.bindingIndex + e, n
}

function tC() {
    return F.lFrame.inI18n
}

function yp(e) {
    F.lFrame.inI18n = e
}

function nC(e, t) {
    let n = F.lFrame;
    n.bindingIndex = n.bindingRootIndex = e, ju(t)
}

function rC() {
    return F.lFrame.currentDirectiveIndex
}

function ju(e) {
    F.lFrame.currentDirectiveIndex = e
}

function Dp(e) {
    let t = F.lFrame.currentDirectiveIndex;
    return t === -1 ? null : e[t]
}

function wp() {
    return F.lFrame.currentQueryIndex
}

function cl(e) {
    F.lFrame.currentQueryIndex = e
}

function oC(e) {
    let t = e[N];
    return t.type === 2 ? t.declTNode : t.type === 1 ? e[ke] : null
}

function Cp(e, t, n) {
    if (n & L.SkipSelf) {
        let o = t,
            i = e;
        for (; o = o.parent, o === null && !(n & L.Host);)
            if (o = oC(i), o === null || (i = i[vr], o.type & 10)) break;
        if (o === null) return !1;
        t = o, e = i
    }
    let r = F.lFrame = Ep();
    return r.currentTNode = t, r.lView = e, !0
}

function ll(e) {
    let t = Ep(),
        n = e[N];
    F.lFrame = t, t.currentTNode = n.firstChild, t.lView = e, t.tView = n, t.contextLView = e, t.bindingIndex = n.bindingStartIndex, t.inI18n = !1
}

function Ep() {
    let e = F.lFrame,
        t = e === null ? null : e.child;
    return t === null ? Ip(e) : t
}

function Ip(e) {
    let t = {
        currentTNode: null,
        isParent: !0,
        lView: null,
        tView: null,
        selectedIndex: -1,
        contextLView: null,
        elementDepthCount: 0,
        currentNamespace: null,
        currentDirectiveIndex: -1,
        bindingRootIndex: -1,
        bindingIndex: -1,
        currentQueryIndex: 0,
        parent: e,
        child: null,
        inI18n: !1
    };
    return e !== null && (e.child = t), t
}

function bp() {
    let e = F.lFrame;
    return F.lFrame = e.parent, e.currentTNode = null, e.lView = null, e
}
var _p = bp;

function dl() {
    let e = bp();
    e.isParent = !0, e.tView = null, e.selectedIndex = -1, e.contextLView = null, e.elementDepthCount = 0, e.currentDirectiveIndex = -1, e.currentNamespace = null, e.bindingRootIndex = -1, e.bindingIndex = -1, e.currentQueryIndex = 0
}

function iC(e) {
    return (F.lFrame.contextLView = Ww(e, F.lFrame.contextLView))[me]
}

function sn() {
    return F.lFrame.selectedIndex
}

function Mn(e) {
    F.lFrame.selectedIndex = e
}

function Bt() {
    let e = F.lFrame;
    return rl(e.tView, e.selectedIndex)
}

function qL() {
    F.lFrame.currentNamespace = fp
}

function sC() {
    return F.lFrame.currentNamespace
}
var Mp = !0;

function Ds() {
    return Mp
}

function ws(e) {
    Mp = e
}

function aC() {
    return yr(Ee(), b())
}

function yr(e, t) {
    return new xe(We(e, t))
}
var xe = (() => {
    class e {
        constructor(n) {
            this.nativeElement = n
        }
        static {
            this.__NG_ELEMENT_ID__ = aC
        }
    }
    return e
})();

function uC(e) {
    return e instanceof xe ? e.nativeElement : e
}

function cC(e, t, n) {
    if (e.length !== t.length) return !1;
    for (let r = 0; r < e.length; r++) {
        let o = e[r],
            i = t[r];
        if (n && (o = n(o), i = n(i)), i !== o) return !1
    }
    return !0
}

function lC(e) {
    return e.flat(Number.POSITIVE_INFINITY)
}

function fl(e, t) {
    e.forEach(n => Array.isArray(n) ? fl(n, t) : t(n))
}

function Sp(e, t, n) {
    t >= e.length ? e.push(n) : e.splice(t, 0, n)
}

function Wi(e, t) {
    return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
}

function dC(e, t) {
    let n = [];
    for (let r = 0; r < e; r++) n.push(t);
    return n
}

function fC(e, t, n, r) {
    let o = e.length;
    if (o == t) e.push(n, r);
    else if (o === 1) e.push(r, e[0]), e[0] = n;
    else {
        for (o--, e.push(e[o - 1], e[o]); o > t;) {
            let i = o - 2;
            e[o] = e[i], o--
        }
        e[t] = n, e[t + 1] = r
    }
}

function Pn(e, t, n) {
    let r = vo(e, t);
    return r >= 0 ? e[r | 1] = n : (r = ~r, fC(e, r, t, n)), r
}

function Cu(e, t) {
    let n = vo(e, t);
    if (n >= 0) return e[n | 1]
}

function vo(e, t) {
    return hC(e, t, 1)
}

function hC(e, t, n) {
    let r = 0,
        o = e.length >> n;
    for (; o !== r;) {
        let i = r + (o - r >> 1),
            s = e[i << n];
        if (t === s) return i << n;
        s > t ? o = i : r = i + 1
    }
    return ~(o << n)
}

function pC() {
    return this._results[Symbol.iterator]()
}
var Uu = class e {
    get changes() {
        return this._changes ? ? = new ne
    }
    constructor(t = !1) {
        this._emitDistinctChangesOnly = t, this.dirty = !0, this._onDirty = void 0, this._results = [], this._changesDetected = !1, this._changes = void 0, this.length = 0, this.first = void 0, this.last = void 0;
        let n = e.prototype;
        n[Symbol.iterator] || (n[Symbol.iterator] = pC)
    }
    get(t) {
        return this._results[t]
    }
    map(t) {
        return this._results.map(t)
    }
    filter(t) {
        return this._results.filter(t)
    }
    find(t) {
        return this._results.find(t)
    }
    reduce(t, n) {
        return this._results.reduce(t, n)
    }
    forEach(t) {
        this._results.forEach(t)
    }
    some(t) {
        return this._results.some(t)
    }
    toArray() {
        return this._results.slice()
    }
    toString() {
        return this._results.toString()
    }
    reset(t, n) {
        this.dirty = !1;
        let r = lC(t);
        (this._changesDetected = !cC(this._results, r, n)) && (this._results = r, this.length = r.length, this.last = r[this.length - 1], this.first = r[0])
    }
    notifyOnChanges() {
        this._changes !== void 0 && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this)
    }
    onDirty(t) {
        this._onDirty = t
    }
    setDirty() {
        this.dirty = !0, this._onDirty ? .()
    }
    destroy() {
        this._changes !== void 0 && (this._changes.complete(), this._changes.unsubscribe())
    }
};

function Tp(e) {
    return (e.flags & 128) === 128
}
var $u;

function Ap(e) {
    $u = e
}

function hl() {
    if ($u !== void 0) return $u;
    if (typeof document < "u") return document;
    throw new D(210, !1)
}

function E(e) {
    return {
        token: e.token,
        providedIn: e.providedIn || null,
        factory: e.factory,
        value: void 0
    }
}

function Ue(e) {
    return {
        providers: e.providers || [],
        imports: e.imports || []
    }
}

function Cs(e) {
    return fh(e, Np) || fh(e, Rp)
}

function xp(e) {
    return Cs(e) !== null
}

function fh(e, t) {
    return e.hasOwnProperty(t) ? e[t] : null
}

function gC(e) {
    let t = e && (e[Np] || e[Rp]);
    return t || null
}

function hh(e) {
    return e && (e.hasOwnProperty(ph) || e.hasOwnProperty(mC)) ? e[ph] : null
}
var Np = Z({\
        u0275prov: Z
    }),
    ph = Z({\
        u0275inj: Z
    }),
    Rp = Z({
        ngInjectableDef: Z
    }),
    mC = Z({
        ngInjectorDef: Z
    }),
    C = class {
        constructor(t, n) {
            this._desc = t, this.ngMetadataName = "InjectionToken", this.\u0275prov = void 0, typeof n == "number" ? this.__NG_ELEMENT_ID__ = n : n !== void 0 && (this.\u0275prov = E({
                token: this,
                providedIn: n.providedIn || "root",
                factory: n.factory
            }))
        }
        get multi() {
            return this
        }
        toString() {
            return `InjectionToken ${this._desc}`
        }
    },
    Es = new C("", {
        providedIn: "root",
        factory: () => vC
    }),
    vC = "ng",
    pl = new C(""),
    Ct = new C("", {
        providedIn: "platform",
        factory: () => "unknown"
    });
var ZL = new C(""),
    gl = new C("", {
        providedIn: "root",
        factory: () => hl().body ? .querySelector("[ngCspNonce]") ? .getAttribute("ngCspNonce") || null
    });
var yC = Z({
    __forward_ref__: Z
});

function qe(e) {
    return e.__forward_ref__ = qe, e.toString = function() {
        return Me(this())
    }, e
}

function ge(e) {
    return Op(e) ? e() : e
}

function Op(e) {
    return typeof e == "function" && e.hasOwnProperty(yC) && e.__forward_ref__ === qe
}

function Fp(e) {
    return e && !!e.\u0275providers
}

function rt(e) {
    return typeof e == "string" ? e : e == null ? "" : String(e)
}

function DC(e) {
    return typeof e == "function" ? e.name || e.toString() : typeof e == "object" && e != null && typeof e.type == "function" ? e.type.name || e.type.toString() : rt(e)
}

function wC(e, t) {
    let n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
    throw new D(-200, e)
}

function ml(e, t) {
    throw new D(-201, !1)
}
var Bu;

function Pp() {
    return Bu
}

function Fe(e) {
    let t = Bu;
    return Bu = e, t
}

function kp(e, t, n) {
    let r = Cs(e);
    if (r && r.providedIn == "root") return r.value === void 0 ? r.value = r.factory() : r.value;
    if (n & L.Optional) return null;
    if (t !== void 0) return t;
    ml(e, "Injector")
}
var CC = {},
    oo = CC,
    Hu = "__NG_DI_FLAG__",
    qi = "ngTempTokenPath",
    EC = "ngTokenPath",
    IC = /\n/gm,
    bC = "\u0275",
    gh = "__source",
    ur;

function _C() {
    return ur
}

function tn(e) {
    let t = ur;
    return ur = e, t
}

function MC(e, t = L.Default) {
    if (ur === void 0) throw new D(-203, !1);
    return ur === null ? kp(e, void 0, t) : ur.get(e, t & L.Optional ? null : void 0, t)
}

function M(e, t = L.Default) {
    return (Pp() || MC)(ge(e), t)
}

function m(e, t = L.Default) {
    return M(e, Is(t))
}

function Is(e) {
    return typeof e > "u" || typeof e == "number" ? e : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4)
}

function zu(e) {
    let t = [];
    for (let n = 0; n < e.length; n++) {
        let r = ge(e[n]);
        if (Array.isArray(r)) {
            if (r.length === 0) throw new D(900, !1);
            let o, i = L.Default;
            for (let s = 0; s < r.length; s++) {
                let a = r[s],
                    u = SC(a);
                typeof u == "number" ? u === -1 ? o = a.token : i |= u : o = a
            }
            t.push(M(o, i))
        } else t.push(M(r))
    }
    return t
}

function vl(e, t) {
    return e[Hu] = t, e.prototype[Hu] = t, e
}

function SC(e) {
    return e[Hu]
}

function TC(e, t, n, r) {
    let o = e[qi];
    throw t[gh] && o.unshift(t[gh]), e.message = AC(`
` + e.message, o, n, r), e[EC] = o, e[qi] = null, e
}

function AC(e, t, n, r = null) {
    e = e && e.charAt(0) === `
` && e.charAt(1) == bC ? e.slice(2) : e;
    let o = Me(t);
    if (Array.isArray(t)) o = t.map(Me).join(" -> ");
    else if (typeof t == "object") {
        let i = [];
        for (let s in t)
            if (t.hasOwnProperty(s)) {
                let a = t[s];
                i.push(s + ":" + (typeof a == "string" ? JSON.stringify(a) : Me(a)))
            }
        o = `{${i.join(", ")}}`
    }
    return `${n}${r?"("+r+")":""}[${o}]: ${e.replace(IC,`
  `)}`
}
var xC = "h",
    NC = "b";
var RC = () => null;

function yl(e, t, n = !1) {
    return RC(e, t, n)
}
var Ai = "__parameters__";

function OC(e) {
    return function(...n) {
        if (e) {
            let r = e(...n);
            for (let o in r) this[o] = r[o]
        }
    }
}

function Dl(e, t, n) {
    return go(() => {
        let r = OC(t);

        function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            let s = new o(...i);
            return a.annotation = s, a;

            function a(u, c, l) {
                let d = u.hasOwnProperty(Ai) ? u[Ai] : Object.defineProperty(u, Ai, {
                    value: []
                })[Ai];
                for (; d.length <= l;) d.push(null);
                return (d[l] = d[l] || []).push(s), u
            }
        }
        return n && (o.prototype = Object.create(n.prototype)), o.prototype.ngMetadataName = e, o.annotationCls = o, o
    })
}
var YL = vl(Dl("Inject", e => ({
        token: e
    })), -1),
    yo = vl(Dl("Optional"), 8);
var bs = vl(Dl("SkipSelf"), 4);

function Sn(e, t) {
    let n = e.hasOwnProperty(Hi);
    return n ? e[Hi] : null
}
var hr = new C(""),
    Lp = new C("", -1),
    Vp = new C(""),
    Zi = class {
        get(t, n = oo) {
            if (n === oo) {
                let r = new Error(`NullInjectorError: No provider for ${Me(t)}!`);
                throw r.name = "NullInjectorError", r
            }
            return n
        }
    };

function _s(e) {
    return {\
        u0275providers: e
    }
}

function FC(...e) {
    return {\
        u0275providers: jp(!0, e),
        \u0275fromNgModule: !0
    }
}

function jp(e, ...t) {
    let n = [],
        r = new Set,
        o, i = s => {
            n.push(s)
        };
    return fl(t, s => {
        let a = s;
        Gu(a, i, [], r) && (o || = [], o.push(a))
    }), o !== void 0 && Up(o, i), n
}

function Up(e, t) {
    for (let n = 0; n < e.length; n++) {
        let {
            ngModule: r,
            providers: o
        } = e[n];
        wl(o, i => {
            t(i, r)
        })
    }
}

function Gu(e, t, n, r) {
    if (e = ge(e), !e) return !1;
    let o = null,
        i = hh(e),
        s = !i && Ot(e);
    if (!i && !s) {
        let u = e.ngModule;
        if (i = hh(u), i) o = u;
        else return !1
    } else {
        if (s && !s.standalone) return !1;
        o = e
    }
    let a = r.has(o);
    if (s) {
        if (a) return !1;
        if (r.add(o), s.dependencies) {
            let u = typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
            for (let c of u) Gu(c, t, n, r)
        }
    } else if (i) {
        if (i.imports != null && !a) {
            r.add(o);
            let c;
            try {
                fl(i.imports, l => {
                    Gu(l, t, n, r) && (c || = [], c.push(l))
                })
            } finally {}
            c !== void 0 && Up(c, t)
        }
        if (!a) {
            let c = Sn(o) || (() => new o);
            t({
                provide: o,
                useFactory: c,
                deps: _e
            }, o), t({
                provide: Vp,
                useValue: o,
                multi: !0
            }, o), t({
                provide: hr,
                useValue: () => M(o),
                multi: !0
            }, o)
        }
        let u = i.providers;
        if (u != null && !a) {
            let c = e;
            wl(u, l => {
                t(l, c)
            })
        }
    } else return !1;
    return o !== e && e.providers !== void 0
}

function wl(e, t) {
    for (let n of e) Fp(n) && (n = n.\u0275providers), Array.isArray(n) ? wl(n, t) : t(n)
}
var PC = Z({
    provide: String,
    useValue: Z
});

function $p(e) {
    return e !== null && typeof e == "object" && PC in e
}

function kC(e) {
    return !!(e && e.useExisting)
}

function LC(e) {
    return !!(e && e.useFactory)
}

function pr(e) {
    return typeof e == "function"
}

function VC(e) {
    return !!e.useClass
}
var Ms = new C(""),
    ki = {},
    jC = {},
    Eu;

function Ss() {
    return Eu === void 0 && (Eu = new Zi), Eu
}
var Te = class {},
    io = class extends Te {
        get destroyed() {
            return this._destroyed
        }
        constructor(t, n, r, o) {
            super(), this.parent = n, this.source = r, this.scopes = o, this.records = new Map, this._ngOnDestroyHooks = new Set, this._onDestroyHooks = [], this._destroyed = !1, qu(t, s => this.processProvider(s)), this.records.set(Lp, ir(void 0, this)), o.has("environment") && this.records.set(Te, ir(void 0, this));
            let i = this.records.get(Ms);
            i != null && typeof i.value == "string" && this.scopes.add(i.value), this.injectorDefTypes = new Set(this.get(Vp, _e, L.Self))
        }
        destroy() {
            this.assertNotDestroyed(), this._destroyed = !0;
            try {
                for (let n of this._ngOnDestroyHooks) n.ngOnDestroy();
                let t = this._onDestroyHooks;
                this._onDestroyHooks = [];
                for (let n of t) n()
            } finally {
                this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear()
            }
        }
        onDestroy(t) {
            return this.assertNotDestroyed(), this._onDestroyHooks.push(t), () => this.removeOnDestroy(t)
        }
        runInContext(t) {
            this.assertNotDestroyed();
            let n = tn(this),
                r = Fe(void 0),
                o;
            try {
                return t()
            } finally {
                tn(n), Fe(r)
            }
        }
        get(t, n = oo, r = L.Default) {
            if (this.assertNotDestroyed(), t.hasOwnProperty(ah)) return t[ah](this);
            r = Is(r);
            let o, i = tn(this),
                s = Fe(void 0);
            try {
                if (!(r & L.SkipSelf)) {
                    let u = this.records.get(t);
                    if (u === void 0) {
                        let c = zC(t) && Cs(t);
                        c && this.injectableDefInScope(c) ? u = ir(Wu(t), ki) : u = null, this.records.set(t, u)
                    }
                    if (u != null) return this.hydrate(t, u)
                }
                let a = r & L.Self ? Ss() : this.parent;
                return n = r & L.Optional && n === oo ? null : n, a.get(t, n)
            } catch (a) {
                if (a.name === "NullInjectorError") {
                    if ((a[qi] = a[qi] || []).unshift(Me(t)), i) throw a;
                    return TC(a, t, "R3InjectorError", this.source)
                } else throw a
            } finally {
                Fe(s), tn(i)
            }
        }
        resolveInjectorInitializers() {
            let t = tn(this),
                n = Fe(void 0),
                r;
            try {
                let o = this.get(hr, _e, L.Self);
                for (let i of o) i()
            } finally {
                tn(t), Fe(n)
            }
        }
        toString() {
            let t = [],
                n = this.records;
            for (let r of n.keys()) t.push(Me(r));
            return `R3Injector[${t.join(", ")}]`
        }
        assertNotDestroyed() {
            if (this._destroyed) throw new D(205, !1)
        }
        processProvider(t) {
            t = ge(t);
            let n = pr(t) ? t : ge(t && t.provide),
                r = $C(t);
            if (!pr(t) && t.multi === !0) {
                let o = this.records.get(n);
                o || (o = ir(void 0, ki, !0), o.factory = () => zu(o.multi), this.records.set(n, o)), n = t, o.multi.push(t)
            }
            this.records.set(n, r)
        }
        hydrate(t, n) {
            return n.value === ki && (n.value = jC, n.value = n.factory()), typeof n.value == "object" && n.value && HC(n.value) && this._ngOnDestroyHooks.add(n.value), n.value
        }
        injectableDefInScope(t) {
            if (!t.providedIn) return !1;
            let n = ge(t.providedIn);
            return typeof n == "string" ? n === "any" || this.scopes.has(n) : this.injectorDefTypes.has(n)
        }
        removeOnDestroy(t) {
            let n = this._onDestroyHooks.indexOf(t);
            n !== -1 && this._onDestroyHooks.splice(n, 1)
        }
    };

function Wu(e) {
    let t = Cs(e),
        n = t !== null ? t.factory : Sn(e);
    if (n !== null) return n;
    if (e instanceof C) throw new D(204, !1);
    if (e instanceof Function) return UC(e);
    throw new D(204, !1)
}

function UC(e) {
    if (e.length > 0) throw new D(204, !1);
    let n = gC(e);
    return n !== null ? () => n.factory(e) : () => new e
}

function $C(e) {
    if ($p(e)) return ir(void 0, e.useValue); {
        let t = Bp(e);
        return ir(t, ki)
    }
}

function Bp(e, t, n) {
    let r;
    if (pr(e)) {
        let o = ge(e);
        return Sn(o) || Wu(o)
    } else if ($p(e)) r = () => ge(e.useValue);
    else if (LC(e)) r = () => e.useFactory(...zu(e.deps || []));
    else if (kC(e)) r = () => M(ge(e.useExisting));
    else {
        let o = ge(e && (e.useClass || e.provide));
        if (BC(e)) r = () => new o(...zu(e.deps));
        else return Sn(o) || Wu(o)
    }
    return r
}

function ir(e, t, n = !1) {
    return {
        factory: e,
        value: t,
        multi: n ? [] : void 0
    }
}

function BC(e) {
    return !!e.deps
}

function HC(e) {
    return e !== null && typeof e == "object" && typeof e.ngOnDestroy == "function"
}

function zC(e) {
    return typeof e == "function" || typeof e == "object" && e instanceof C
}

function qu(e, t) {
    for (let n of e) Array.isArray(n) ? qu(n, t) : n && Fp(n) ? qu(n.\u0275providers, t) : t(n)
}

function Et(e, t) {
    e instanceof io && e.assertNotDestroyed();
    let n, r = tn(e),
        o = Fe(void 0);
    try {
        return t()
    } finally {
        tn(r), Fe(o)
    }
}

function GC(e) {
    if (!Pp() && !_C()) throw new D(-203, !1)
}

function WC(e) {
    let t = oe.ng;
    if (t && t.\u0275compilerFacade) return t.\u0275compilerFacade;
    throw new Error("JIT compiler unavailable")
}

function qC(e) {
    return typeof e == "function"
}
var Zu = class {
    constructor(t, n, r) {
        this.previousValue = t, this.currentValue = n, this.firstChange = r
    }
    isFirstChange() {
        return this.firstChange
    }
};

function Hp(e, t, n, r) {
    t !== null ? t.applyValueToInputSignal(t, r) : e[n] = r
}

function an() {
    return zp
}

function zp(e) {
    return e.type.prototype.ngOnChanges && (e.setInput = YC), ZC
}
an.ngInherit = !0;

function ZC() {
    let e = Wp(this),
        t = e ? .current;
    if (t) {
        let n = e.previous;
        if (n === Rt) e.previous = t;
        else
            for (let r in t) n[r] = t[r];
        e.current = null, this.ngOnChanges(t)
    }
}

function YC(e, t, n, r, o) {
    let i = this.declaredInputs[r],
        s = Wp(e) || QC(e, {
            previous: Rt,
            current: null
        }),
        a = s.current || (s.current = {}),
        u = s.previous,
        c = u[i];
    a[i] = new Zu(c && c.currentValue, n, u === Rt), Hp(e, t, o, n)
}
var Gp = "__ngSimpleChanges__";

function Wp(e) {
    return e[Gp] || null
}

function QC(e, t) {
    return e[Gp] = t
}
var mh = null;
var ht = function(e, t, n) {
    mh ? .(e, t, n)
};

function KC(e, t, n) {
    let {
        ngOnChanges: r,
        ngOnInit: o,
        ngDoCheck: i
    } = t.type.prototype;
    if (r) {
        let s = zp(t);
        (n.preOrderHooks ? ? = []).push(e, s), (n.preOrderCheckHooks ? ? = []).push(e, s)
    }
    o && (n.preOrderHooks ? ? = []).push(0 - e, o), i && ((n.preOrderHooks ? ? = []).push(e, i), (n.preOrderCheckHooks ? ? = []).push(e, i))
}

function Ts(e, t) {
    for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
        let i = e.data[n].type.prototype,
            {
                ngAfterContentInit: s,
                ngAfterContentChecked: a,
                ngAfterViewInit: u,
                ngAfterViewChecked: c,
                ngOnDestroy: l
            } = i;
        s && (e.contentHooks ? ? = []).push(-n, s), a && ((e.contentHooks ? ? = []).push(n, a), (e.contentCheckHooks ? ? = []).push(n, a)), u && (e.viewHooks ? ? = []).push(-n, u), c && ((e.viewHooks ? ? = []).push(n, c), (e.viewCheckHooks ? ? = []).push(n, c)), l != null && (e.destroyHooks ? ? = []).push(n, l)
    }
}

function Li(e, t, n) {
    qp(e, t, 3, n)
}

function Vi(e, t, n, r) {
    (e[x] & 3) === n && qp(e, t, n, r)
}

function Iu(e, t) {
    let n = e[x];
    (n & 3) === t && (n &= 16383, n += 1, e[x] = n)
}

function qp(e, t, n, r) {
    let o = r !== void 0 ? e[or] & 65535 : 0,
        i = r ? ? -1,
        s = t.length - 1,
        a = 0;
    for (let u = o; u < s; u++)
        if (typeof t[u + 1] == "number") {
            if (a = t[u], r != null && a >= r) break
        } else t[u] < 0 && (e[or] += 65536), (a < i || i == -1) && (JC(e, n, t, u), e[or] = (e[or] & 4294901760) + u + 2), u++
}

function vh(e, t) {
    ht(4, e, t);
    let n = ae(null);
    try {
        t.call(e)
    } finally {
        ae(n), ht(5, e, t)
    }
}

function JC(e, t, n, r) {
    let o = n[r] < 0,
        i = n[r + 1],
        s = o ? -n[r] : n[r],
        a = e[s];
    o ? e[x] >> 14 < e[or] >> 16 && (e[x] & 3) === t && (e[x] += 16384, vh(a, i)) : vh(a, i)
}
var cr = -1,
    Tn = class {
        constructor(t, n, r) {
            this.factory = t, this.resolving = !1, this.canSeeViewProviders = n, this.injectImpl = r
        }
    };

function XC(e) {
    return e instanceof Tn
}

function eE(e) {
    return (e.flags & 8) !== 0
}

function tE(e) {
    return (e.flags & 16) !== 0
}

function Zp(e) {
    return e !== cr
}

function Yi(e) {
    return e & 32767
}

function nE(e) {
    return e >> 16
}

function Qi(e, t) {
    let n = nE(e),
        r = t;
    for (; n > 0;) r = r[vr], n--;
    return r
}
var Yu = !0;

function Ki(e) {
    let t = Yu;
    return Yu = e, t
}
var rE = 256,
    Yp = rE - 1,
    Qp = 5,
    oE = 0,
    pt = {};

function iE(e, t, n) {
    let r;
    typeof n == "string" ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(Wr) && (r = n[Wr]), r == null && (r = n[Wr] = oE++);
    let o = r & Yp,
        i = 1 << o;
    t.data[e + (o >> Qp)] |= i
}

function Ji(e, t) {
    let n = Kp(e, t);
    if (n !== -1) return n;
    let r = t[N];
    r.firstCreatePass && (e.injectorIndex = t.length, bu(r.data, e), bu(t, null), bu(r.blueprint, null));
    let o = Cl(e, t),
        i = e.injectorIndex;
    if (Zp(o)) {
        let s = Yi(o),
            a = Qi(o, t),
            u = a[N].data;
        for (let c = 0; c < 8; c++) t[i + c] = a[s + c] | u[s + c]
    }
    return t[i + 8] = o, i
}

function bu(e, t) {
    e.push(0, 0, 0, 0, 0, 0, 0, 0, t)
}

function Kp(e, t) {
    return e.injectorIndex === -1 || e.parent && e.parent.injectorIndex === e.injectorIndex || t[e.injectorIndex + 8] === null ? -1 : e.injectorIndex
}

function Cl(e, t) {
    if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
    let n = 0,
        r = null,
        o = t;
    for (; o !== null;) {
        if (r = ng(o), r === null) return cr;
        if (n++, o = o[vr], r.injectorIndex !== -1) return r.injectorIndex | n << 16
    }
    return cr
}

function Qu(e, t, n) {
    iE(e, t, n)
}

function sE(e, t) {
    if (t === "class") return e.classes;
    if (t === "style") return e.styles;
    let n = e.attrs;
    if (n) {
        let r = n.length,
            o = 0;
        for (; o < r;) {
            let i = n[o];
            if (tp(i)) break;
            if (i === 0) o = o + 2;
            else if (typeof i == "number")
                for (o++; o < r && typeof n[o] == "string";) o++;
            else {
                if (i === t) return n[o + 1];
                o = o + 2
            }
        }
    }
    return null
}

function Jp(e, t, n) {
    if (n & L.Optional || e !== void 0) return e;
    ml(t, "NodeInjector")
}

function Xp(e, t, n, r) {
    if (n & L.Optional && r === void 0 && (r = null), !(n & (L.Self | L.Host))) {
        let o = e[dr],
            i = Fe(void 0);
        try {
            return o ? o.get(t, r, n & L.Optional) : kp(t, r, n & L.Optional)
        } finally {
            Fe(i)
        }
    }
    return Jp(r, t, n)
}

function eg(e, t, n, r = L.Default, o) {
    if (e !== null) {
        if (t[x] & 2048 && !(r & L.Self)) {
            let s = lE(e, t, n, r, pt);
            if (s !== pt) return s
        }
        let i = tg(e, t, n, r, pt);
        if (i !== pt) return i
    }
    return Xp(t, n, r, o)
}

function tg(e, t, n, r, o) {
    let i = uE(n);
    if (typeof i == "function") {
        if (!Cp(t, e, r)) return r & L.Host ? Jp(o, n, r) : Xp(t, n, r, o);
        try {
            let s;
            if (s = i(r), s == null && !(r & L.Optional)) ml(n);
            else return s
        } finally {
            _p()
        }
    } else if (typeof i == "number") {
        let s = null,
            a = Kp(e, t),
            u = cr,
            c = r & L.Host ? t[Pe][ke] : null;
        for ((a === -1 || r & L.SkipSelf) && (u = a === -1 ? Cl(e, t) : t[a + 8], u === cr || !Dh(r, !1) ? a = -1 : (s = t[N], a = Yi(u), t = Qi(u, t))); a !== -1;) {
            let l = t[N];
            if (yh(i, a, l.data)) {
                let d = aE(a, t, n, s, r, c);
                if (d !== pt) return d
            }
            u = t[a + 8], u !== cr && Dh(r, t[N].data[a + 8] === c) && yh(i, a, t) ? (s = l, a = Yi(u), t = Qi(u, t)) : a = -1
        }
    }
    return o
}

function aE(e, t, n, r, o, i) {
    let s = t[N],
        a = s.data[e + 8],
        u = r == null ? ps(a) && Yu : r != s && (a.type & 3) !== 0,
        c = o & L.Host && i === a,
        l = ji(a, s, n, u, c);
    return l !== null ? An(t, s, l, a) : pt
}

function ji(e, t, n, r, o) {
    let i = e.providerIndexes,
        s = t.data,
        a = i & 1048575,
        u = e.directiveStart,
        c = e.directiveEnd,
        l = i >> 20,
        d = r ? a : a + l,
        f = o ? a + l : c;
    for (let h = d; h < f; h++) {
        let p = s[h];
        if (h < u && n === p || h >= u && p.type === n) return h
    }
    if (o) {
        let h = s[u];
        if (h && kt(h) && h.type === n) return u
    }
    return null
}

function An(e, t, n, r) {
    let o = e[n],
        i = t.data;
    if (XC(o)) {
        let s = o;
        s.resolving && wC(DC(i[n]));
        let a = Ki(s.canSeeViewProviders);
        s.resolving = !0;
        let u, c = s.injectImpl ? Fe(s.injectImpl) : null,
            l = Cp(e, r, L.Default);
        try {
            o = e[n] = s.factory(void 0, i, e, r), t.firstCreatePass && n >= r.directiveStart && KC(n, i[n], t)
        } finally {
            c !== null && Fe(c), Ki(a), s.resolving = !1, _p()
        }
    }
    return o
}

function uE(e) {
    if (typeof e == "string") return e.charCodeAt(0) || 0;
    let t = e.hasOwnProperty(Wr) ? e[Wr] : void 0;
    return typeof t == "number" ? t >= 0 ? t & Yp : cE : t
}

function yh(e, t, n) {
    let r = 1 << e;
    return !!(n[t + (e >> Qp)] & r)
}

function Dh(e, t) {
    return !(e & L.Self) && !(e & L.Host && t)
}
var En = class {
    constructor(t, n) {
        this._tNode = t, this._lView = n
    }
    get(t, n, r) {
        return eg(this._tNode, this._lView, t, Is(r), n)
    }
};

function cE() {
    return new En(Ee(), b())
}

function Ht(e) {
    return go(() => {
        let t = e.prototype.constructor,
            n = t[Hi] || Ku(t),
            r = Object.prototype,
            o = Object.getPrototypeOf(e.prototype).constructor;
        for (; o && o !== r;) {
            let i = o[Hi] || Ku(o);
            if (i && i !== n) return i;
            o = Object.getPrototypeOf(o)
        }
        return i => new i
    })
}

function Ku(e) {
    return Op(e) ? () => {
        let t = Ku(ge(e));
        return t && t()
    } : Sn(e)
}

function lE(e, t, n, r, o) {
    let i = e,
        s = t;
    for (; i !== null && s !== null && s[x] & 2048 && !(s[x] & 512);) {
        let a = tg(i, s, n, r | L.Self, pt);
        if (a !== pt) return a;
        let u = i.parent;
        if (!u) {
            let c = s[dp];
            if (c) {
                let l = c.get(n, pt, r);
                if (l !== pt) return l
            }
            u = ng(s), s = s[vr]
        }
        i = u
    }
    return o
}

function ng(e) {
    let t = e[N],
        n = t.type;
    return n === 2 ? t.declTNode : n === 1 ? e[ke] : null
}

function rg(e) {
    return sE(Ee(), e)
}

function wh(e, t = null, n = null, r) {
    let o = og(e, t, n, r);
    return o.resolveInjectorInitializers(), o
}

function og(e, t = null, n = null, r, o = new Set) {
    let i = [n || _e, FC(e)];
    return r = r || (typeof e == "object" ? void 0 : Me(e)), new io(i, t || Ss(), r || null, o)
}
var Ze = (() => {
        class e {
            static {
                this.THROW_IF_NOT_FOUND = oo
            }
            static {
                this.NULL = new Zi
            }
            static create(n, r) {
                if (Array.isArray(n)) return wh({
                    name: ""
                }, r, n, ""); {
                    let o = n.name ? ? "";
                    return wh({
                        name: o
                    }, n.parent, n.providers, o)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    providedIn: "any",
                    factory: () => M(Lp)
                })
            }
            static {
                this.__NG_ELEMENT_ID__ = -1
            }
        }
        return e
    })(),
    dE = "ngOriginalError";

function _u(e) {
    return e[dE]
}
var vt = class {
        constructor() {
            this._console = console
        }
        handleError(t) {
            let n = this._findOriginalError(t);
            this._console.error("ERROR", t), n && this._console.error("ORIGINAL ERROR", n)
        }
        _findOriginalError(t) {
            let n = t && _u(t);
            for (; n && _u(n);) n = _u(n);
            return n || null
        }
    },
    ig = new C("", {
        providedIn: "root",
        factory: () => m(vt).handleError.bind(void 0)
    });
var sg = !1,
    fE = new C("", {
        providedIn: "root",
        factory: () => sg
    }),
    xi;

function hE() {
    if (xi === void 0 && (xi = null, oe.trustedTypes)) try {
        xi = oe.trustedTypes.createPolicy("angular", {
            createHTML: e => e,
            createScript: e => e,
            createScriptURL: e => e
        })
    } catch {}
    return xi
}

function As(e) {
    return hE() ? .createHTML(e) || e
}
var Ni;

function ag() {
    if (Ni === void 0 && (Ni = null, oe.trustedTypes)) try {
        Ni = oe.trustedTypes.createPolicy("angular#unsafe-bypass", {
            createHTML: e => e,
            createScript: e => e,
            createScriptURL: e => e
        })
    } catch {}
    return Ni
}

function Ch(e) {
    return ag() ? .createHTML(e) || e
}

function Eh(e) {
    return ag() ? .createScriptURL(e) || e
}
var Lt = class {
        constructor(t) {
            this.changingThisBreaksApplicationSecurity = t
        }
        toString() {
            return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Jh})`
        }
    },
    Ju = class extends Lt {
        getTypeName() {
            return "HTML"
        }
    },
    Xu = class extends Lt {
        getTypeName() {
            return "Style"
        }
    },
    ec = class extends Lt {
        getTypeName() {
            return "Script"
        }
    },
    tc = class extends Lt {
        getTypeName() {
            return "URL"
        }
    },
    nc = class extends Lt {
        getTypeName() {
            return "ResourceURL"
        }
    };

function $e(e) {
    return e instanceof Lt ? e.changingThisBreaksApplicationSecurity : e
}

function zt(e, t) {
    let n = pE(e);
    if (n != null && n !== t) {
        if (n === "ResourceURL" && t === "URL") return !0;
        throw new Error(`Required a safe ${t}, got a ${n} (see ${Jh})`)
    }
    return n === t
}

function pE(e) {
    return e instanceof Lt && e.getTypeName() || null
}

function ug(e) {
    return new Ju(e)
}

function cg(e) {
    return new Xu(e)
}

function lg(e) {
    return new ec(e)
}

function dg(e) {
    return new tc(e)
}

function fg(e) {
    return new nc(e)
}

function hg(e) {
    let t = new oc(e);
    return gE() ? new rc(t) : t
}
var rc = class {
        constructor(t) {
            this.inertDocumentHelper = t
        }
        getInertBodyElement(t) {
            t = "<body><remove></remove>" + t;
            try {
                let n = new window.DOMParser().parseFromString(As(t), "text/html").body;
                return n === null ? this.inertDocumentHelper.getInertBodyElement(t) : (n.removeChild(n.firstChild), n)
            } catch {
                return null
            }
        }
    },
    oc = class {
        constructor(t) {
            this.defaultDoc = t, this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")
        }
        getInertBodyElement(t) {
            let n = this.inertDocument.createElement("template");
            return n.innerHTML = As(t), n
        }
    };

function gE() {
    try {
        return !!new window.DOMParser().parseFromString(As(""), "text/html")
    } catch {
        return !1
    }
}
var mE = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;

function Do(e) {
    return e = String(e), e.match(mE) ? e : "unsafe:" + e
}

function Gt(e) {
    let t = {};
    for (let n of e.split(",")) t[n] = !0;
    return t
}

function wo(...e) {
    let t = {};
    for (let n of e)
        for (let r in n) n.hasOwnProperty(r) && (t[r] = !0);
    return t
}
var pg = Gt("area,br,col,hr,img,wbr"),
    gg = Gt("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
    mg = Gt("rp,rt"),
    vE = wo(mg, gg),
    yE = wo(gg, Gt("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),
    DE = wo(mg, Gt("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),
    ic = wo(pg, yE, DE, vE),
    El = Gt("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
    wE = Gt("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),
    CE = Gt("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),
    vg = wo(El, wE, CE),
    EE = Gt("script,style,template"),
    sc = class {
        constructor() {
            this.sanitizedSomething = !1, this.buf = []
        }
        sanitizeChildren(t) {
            let n = t.firstChild,
                r = !0;
            for (; n;) {
                if (n.nodeType === Node.ELEMENT_NODE ? r = this.startElement(n) : n.nodeType === Node.TEXT_NODE ? this.chars(n.nodeValue) : this.sanitizedSomething = !0, r && n.firstChild) {
                    n = n.firstChild;
                    continue
                }
                for (; n;) {
                    n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
                    let o = this.checkClobberedElement(n, n.nextSibling);
                    if (o) {
                        n = o;
                        break
                    }
                    n = this.checkClobberedElement(n, n.parentNode)
                }
            }
            return this.buf.join("")
        }
        startElement(t) {
            let n = t.nodeName.toLowerCase();
            if (!ic.hasOwnProperty(n)) return this.sanitizedSomething = !0, !EE.hasOwnProperty(n);
            this.buf.push("<"), this.buf.push(n);
            let r = t.attributes;
            for (let o = 0; o < r.length; o++) {
                let i = r.item(o),
                    s = i.name,
                    a = s.toLowerCase();
                if (!vg.hasOwnProperty(a)) {
                    this.sanitizedSomething = !0;
                    continue
                }
                let u = i.value;
                El[a] && (u = Do(u)), this.buf.push(" ", s, '="', Ih(u), '"')
            }
            return this.buf.push(">"), !0
        }
        endElement(t) {
            let n = t.nodeName.toLowerCase();
            ic.hasOwnProperty(n) && !pg.hasOwnProperty(n) && (this.buf.push("</"), this.buf.push(n), this.buf.push(">"))
        }
        chars(t) {
            this.buf.push(Ih(t))
        }
        checkClobberedElement(t, n) {
            if (n && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY) throw new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`);
            return n
        }
    },
    IE = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
    bE = /([^\#-~ |!])/g;

function Ih(e) {
    return e.replace(/&/g, "&amp;").replace(IE, function(t) {
        let n = t.charCodeAt(0),
            r = t.charCodeAt(1);
        return "&#" + ((n - 55296) * 1024 + (r - 56320) + 65536) + ";"
    }).replace(bE, function(t) {
        return "&#" + t.charCodeAt(0) + ";"
    }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
var Ri;

function Il(e, t) {
    let n = null;
    try {
        Ri = Ri || hg(e);
        let r = t ? String(t) : "";
        n = Ri.getInertBodyElement(r);
        let o = 5,
            i = r;
        do {
            if (o === 0) throw new Error("Failed to sanitize html because the input is unstable");
            o--, r = i, i = n.innerHTML, n = Ri.getInertBodyElement(r)
        } while (r !== i);
        let a = new sc().sanitizeChildren(ac(n) || n);
        return As(a)
    } finally {
        if (n) {
            let r = ac(n) || n;
            for (; r.firstChild;) r.removeChild(r.firstChild)
        }
    }
}

function ac(e) {
    return "content" in e && _E(e) ? e.content : null
}

function _E(e) {
    return e.nodeType === Node.ELEMENT_NODE && e.nodeName === "TEMPLATE"
}
var ot = function(e) {
    return e[e.NONE = 0] = "NONE", e[e.HTML = 1] = "HTML", e[e.STYLE = 2] = "STYLE", e[e.SCRIPT = 3] = "SCRIPT", e[e.URL = 4] = "URL", e[e.RESOURCE_URL = 5] = "RESOURCE_URL", e
}(ot || {});

function QL(e) {
    let t = bl();
    return t ? Ch(t.sanitize(ot.HTML, e) || "") : zt(e, "HTML") ? Ch($e(e)) : Il(hl(), rt(e))
}

function KL(e) {
    let t = bl();
    return t ? t.sanitize(ot.URL, e) || "" : zt(e, "URL") ? $e(e) : Do(rt(e))
}

function JL(e) {
    let t = bl();
    if (t) return Eh(t.sanitize(ot.RESOURCE_URL, e) || "");
    if (zt(e, "ResourceURL")) return Eh($e(e));
    throw new D(904, !1)
}

function bl() {
    let e = b();
    return e && e[Ft].sanitizer
}
var ME = /^>|^->|<!--|-->|--!>|<!-$/g,
    SE = /(<|>)/g,
    TE = "\u200B$1\u200B";

function AE(e) {
    return e.replace(ME, t => t.replace(SE, TE))
}
var yg = new Map,
    xE = 0;

function NE() {
    return xE++
}

function RE(e) {
    yg.set(e[hs], e)
}

function OE(e) {
    yg.delete(e[hs])
}
var bh = "__ngContext__";

function yt(e, t) {
    Cn(t) ? (e[bh] = t[hs], RE(t)) : e[bh] = t
}

function XL(e) {
    return e.ownerDocument.defaultView
}

function eV(e) {
    return e.ownerDocument
}

function tV(e) {
    return e.ownerDocument.body
}

function Dg(e) {
    return e instanceof Function ? e() : e
}

function FE(e) {
    return (e ? ? m(Ze)).get(Ct) === "browser"
}
var Dt = function(e) {
        return e[e.Important = 1] = "Important", e[e.DashCase = 2] = "DashCase", e
    }(Dt || {}),
    uc;

function _l(e, t) {
    return uc(e, t)
}

function PE(e) {
    uc === void 0 && (uc = e())
}

function sr(e, t, n, r, o) {
    if (r != null) {
        let i, s = !1;
        jt(r) ? i = r : Cn(r) && (s = !0, r = r[wt]);
        let a = Ge(r);
        e === 0 && n !== null ? o == null ? Mg(t, n, a) : xn(t, n, a, o || null, !0) : e === 1 && n !== null ? xn(t, n, a, o || null, !0) : e === 2 ? Rg(t, a, s) : e === 3 && t.destroyNode(a), i != null && WE(t, e, i, n, o)
    }
}

function Ml(e, t) {
    return e.createText(t)
}

function wg(e, t, n) {
    e.setValue(t, n)
}

function Cg(e, t) {
    return e.createComment(AE(t))
}

function Sl(e, t, n) {
    return e.createElement(t, n)
}

function kE(e, t) {
    Eg(e, t), t[wt] = null, t[ke] = null
}

function LE(e, t, n, r, o, i) {
    r[wt] = o, r[ke] = t, Os(e, r, n, 1, o, i)
}

function Eg(e, t) {
    Os(e, t, t[j], 2, null, null)
}

function VE(e) {
    let t = e[eo];
    if (!t) return Mu(e[N], e);
    for (; t;) {
        let n = null;
        if (Cn(t)) n = t[eo];
        else {
            let r = t[Ce];
            r && (n = r)
        }
        if (!n) {
            for (; t && !t[nt] && t !== e;) Cn(t) && Mu(t[N], t), t = t[ve];
            t === null && (t = e), Cn(t) && Mu(t[N], t), n = t && t[nt]
        }
        t = n
    }
}

function jE(e, t, n, r) {
    let o = Ce + r,
        i = n.length;
    r > 0 && (n[o - 1][nt] = t), r < i - Ce ? (t[nt] = n[o], Sp(n, Ce + r, t)) : (n.push(t), t[nt] = null), t[ve] = n;
    let s = t[mo];
    s !== null && n !== s && UE(s, t);
    let a = t[Pt];
    a !== null && a.insertView(e), Vu(t), t[x] |= 128
}

function UE(e, t) {
    let n = e[fr],
        o = t[ve][ve][Pe];
    t[Pe] !== o && (e[x] |= tl.HasTransplantedViews), n === null ? e[fr] = [t] : n.push(t)
}

function Ig(e, t) {
    let n = e[fr],
        r = n.indexOf(t);
    n.splice(r, 1)
}

function so(e, t) {
    if (e.length <= Ce) return;
    let n = Ce + t,
        r = e[n];
    if (r) {
        let o = r[mo];
        o !== null && o !== e && Ig(o, r), t > 0 && (e[n - 1][nt] = r[nt]);
        let i = Wi(e, Ce + t);
        kE(r[N], r);
        let s = i[Pt];
        s !== null && s.detachView(i[N]), r[ve] = null, r[nt] = null, r[x] &= -129
    }
    return r
}

function xs(e, t) {
    if (!(t[x] & 256)) {
        let n = t[j];
        n.destroyNode && Os(e, t, n, 3, null, null), VE(t)
    }
}

function Mu(e, t) {
    if (!(t[x] & 256)) {
        t[x] &= -129, t[x] |= 256, t[In] && Af(t[In]), BE(e, t), $E(e, t), t[N].type === 1 && t[j].destroy();
        let n = t[mo];
        if (n !== null && jt(t[ve])) {
            n !== t[ve] && Ig(n, t);
            let r = t[Pt];
            r !== null && r.detachView(e)
        }
        OE(t)
    }
}

function $E(e, t) {
    let n = e.cleanup,
        r = t[Xr];
    if (n !== null)
        for (let i = 0; i < n.length - 1; i += 2)
            if (typeof n[i] == "string") {
                let s = n[i + 3];
                s >= 0 ? r[s]() : r[-s].unsubscribe(), i += 2
            } else {
                let s = r[n[i + 1]];
                n[i].call(s)
            }
    r !== null && (t[Xr] = null);
    let o = t[nn];
    if (o !== null) {
        t[nn] = null;
        for (let i = 0; i < o.length; i++) {
            let s = o[i];
            s()
        }
    }
}

function BE(e, t) {
    let n;
    if (e != null && (n = e.destroyHooks) != null)
        for (let r = 0; r < n.length; r += 2) {
            let o = t[n[r]];
            if (!(o instanceof Tn)) {
                let i = n[r + 1];
                if (Array.isArray(i))
                    for (let s = 0; s < i.length; s += 2) {
                        let a = o[i[s]],
                            u = i[s + 1];
                        ht(4, a, u);
                        try {
                            u.call(a)
                        } finally {
                            ht(5, a, u)
                        }
                    } else {
                        ht(4, o, i);
                        try {
                            i.call(o)
                        } finally {
                            ht(5, o, i)
                        }
                    }
            }
        }
}

function bg(e, t, n) {
    return _g(e, t.parent, n)
}

function _g(e, t, n) {
    let r = t;
    for (; r !== null && r.type & 40;) t = r, r = t.parent;
    if (r === null) return n[wt]; {
        let {
            componentOffset: o
        } = r;
        if (o > -1) {
            let {
                encapsulation: i
            } = e.data[r.directiveStart + o];
            if (i === gt.None || i === gt.Emulated) return null
        }
        return We(r, n)
    }
}

function xn(e, t, n, r, o) {
    e.insertBefore(t, n, r, o)
}

function Mg(e, t, n) {
    e.appendChild(t, n)
}

function _h(e, t, n, r, o) {
    r !== null ? xn(e, t, n, r, o) : Mg(e, t, n)
}

function HE(e, t, n, r) {
    e.removeChild(t, n, r)
}

function Ns(e, t) {
    return e.parentNode(t)
}

function zE(e, t) {
    return e.nextSibling(t)
}

function Sg(e, t, n) {
    return Ag(e, t, n)
}

function Tg(e, t, n) {
    return e.type & 40 ? We(e, n) : null
}
var Ag = Tg,
    cc;

function xg(e, t) {
    Ag = e, cc = t
}

function Rs(e, t, n, r) {
    let o = bg(e, r, t),
        i = t[j],
        s = r.parent || t[ke],
        a = Sg(s, r, t);
    if (o != null)
        if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) _h(i, o, n[u], a, !1);
        else _h(i, o, n, a, !1);
    cc !== void 0 && cc(i, r, t, n, o)
}

function Ui(e, t) {
    if (t !== null) {
        let n = t.type;
        if (n & 3) return We(t, e);
        if (n & 4) return lc(-1, e[t.index]);
        if (n & 8) {
            let r = t.child;
            if (r !== null) return Ui(e, r); {
                let o = e[t.index];
                return jt(o) ? lc(-1, o) : Ge(o)
            }
        } else {
            if (n & 32) return _l(t, e)() || Ge(e[t.index]); {
                let r = Ng(e, t);
                if (r !== null) {
                    if (Array.isArray(r)) return r[0];
                    let o = no(e[Pe]);
                    return Ui(o, r)
                } else return Ui(e, t.next)
            }
        }
    }
    return null
}

function Ng(e, t) {
    if (t !== null) {
        let r = e[Pe][ke],
            o = t.projection;
        return r.projection[o]
    }
    return null
}

function lc(e, t) {
    let n = Ce + e + 1;
    if (n < t.length) {
        let r = t[n],
            o = r[N].firstChild;
        if (o !== null) return Ui(r, o)
    }
    return t[bn]
}

function Rg(e, t, n) {
    let r = Ns(e, t);
    r && HE(e, r, t, n)
}

function Tl(e, t, n, r, o, i, s) {
    for (; n != null;) {
        let a = r[n.index],
            u = n.type;
        if (s && t === 0 && (a && yt(Ge(a), r), n.flags |= 2), (n.flags & 32) !== 32)
            if (u & 8) Tl(e, t, n.child, r, o, i, !1), sr(t, e, o, a, i);
            else if (u & 32) {
            let c = _l(n, r),
                l;
            for (; l = c();) sr(t, e, o, l, i);
            sr(t, e, o, a, i)
        } else u & 16 ? Og(e, t, r, n, o, i) : sr(t, e, o, a, i);
        n = s ? n.projectionNext : n.next
    }
}

function Os(e, t, n, r, o, i) {
    Tl(n, r, e.firstChild, t, o, i, !1)
}

function GE(e, t, n) {
    let r = t[j],
        o = bg(e, n, t),
        i = n.parent || t[ke],
        s = Sg(i, n, t);
    Og(r, 0, t, n, o, s)
}

function Og(e, t, n, r, o, i) {
    let s = n[Pe],
        u = s[ke].projection[r.projection];
    if (Array.isArray(u))
        for (let c = 0; c < u.length; c++) {
            let l = u[c];
            sr(t, e, o, l, i)
        } else {
            let c = u,
                l = s[ve];
            Tp(r) && (c.flags |= 128), Tl(e, t, c, l, o, i, !0)
        }
}

function WE(e, t, n, r, o) {
    let i = n[bn],
        s = Ge(n);
    i !== s && sr(t, e, r, i, o);
    for (let a = Ce; a < n.length; a++) {
        let u = n[a];
        Os(u[N], u, e, t, r, i)
    }
}

function qE(e, t, n, r, o) {
    if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
    else {
        let i = r.indexOf("-") === -1 ? void 0 : Dt.DashCase;
        o == null ? e.removeStyle(n, r, i) : (typeof o == "string" && o.endsWith("!important") && (o = o.slice(0, -10), i |= Dt.Important), e.setStyle(n, r, o, i))
    }
}

function ZE(e, t, n) {
    e.setAttribute(t, "style", n)
}

function Fg(e, t, n) {
    n === "" ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n)
}

function Pg(e, t, n) {
    let {
        mergedAttrs: r,
        classes: o,
        styles: i
    } = n;
    r !== null && Lu(e, t, r), o !== null && Fg(e, t, o), i !== null && ZE(e, t, i)
}
var Ie = {};

function nV(e = 1) {
    kg(G(), b(), sn() + e, !1)
}

function kg(e, t, n, r) {
    if (!r)
        if ((t[x] & 3) === 3) {
            let i = e.preOrderCheckHooks;
            i !== null && Li(t, i, n)
        } else {
            let i = e.preOrderHooks;
            i !== null && Vi(t, i, 0, n)
        }
    Mn(n)
}

function _(e, t = L.Default) {
    let n = b();
    if (n === null) return M(e, t);
    let r = Ee();
    return eg(r, n, ge(e), t)
}

function Lg() {
    let e = "invalid";
    throw new Error(e)
}

function Vg(e, t, n, r, o, i) {
    let s = ae(null);
    try {
        let a = null;
        o & Se.SignalBased && (a = t[r][Ya]), a !== null && a.transformFn !== void 0 && (i = a.transformFn(i)), o & Se.HasDecoratorInputTransform && (i = e.inputTransforms[r].call(t, i)), e.setInput !== null ? e.setInput(t, a, i, n, r) : Hp(t, a, r, i)
    } finally {
        ae(s)
    }
}

function YE(e, t) {
    let n = e.hostBindingOpCodes;
    if (n !== null) try {
        for (let r = 0; r < n.length; r++) {
            let o = n[r];
            if (o < 0) Mn(~o);
            else {
                let i = o,
                    s = n[++r],
                    a = n[++r];
                nC(s, i);
                let u = t[i];
                a(2, u)
            }
        }
    } finally {
        Mn(-1)
    }
}

function Fs(e, t, n, r, o, i, s, a, u, c, l) {
    let d = t.blueprint.slice();
    return d[wt] = o, d[x] = r | 4 | 128 | 8 | 64, (c !== null || e && e[x] & 2048) && (d[x] |= 2048), hp(d), d[ve] = d[vr] = e, d[me] = n, d[Ft] = s || e && e[Ft], d[j] = a || e && e[j], d[dr] = u || e && e[dr] || null, d[ke] = i, d[hs] = NE(), d[lr] = l, d[dp] = c, d[Pe] = t.type == 2 ? e[Pe] : d, d
}

function Dr(e, t, n, r, o) {
    let i = e.data[t];
    if (i === null) i = Al(e, t, n, r, o), tC() && (i.flags |= 32);
    else if (i.type & 64) {
        i.type = n, i.value = r, i.attrs = o;
        let s = ro();
        i.injectorIndex = s === null ? -1 : s.injectorIndex
    }
    return mt(i, !0), i
}

function Al(e, t, n, r, o) {
    let i = vp(),
        s = sl(),
        a = s ? i : i && i.parent,
        u = e.data[t] = tI(e, a, n, t, r, o);
    return e.firstChild === null && (e.firstChild = u), i !== null && (s ? i.child == null && u.parent !== null && (i.child = u) : i.next === null && (i.next = u, u.prev = i)), u
}

function Co(e, t, n, r) {
    if (n === 0) return -1;
    let o = t.length;
    for (let i = 0; i < n; i++) t.push(r), e.blueprint.push(r), e.data.push(null);
    return o
}

function jg(e, t, n, r, o) {
    let i = sn(),
        s = r & 2;
    try {
        Mn(-1), s && t.length > ie && kg(e, t, ie, !1), ht(s ? 2 : 0, o), n(r, o)
    } finally {
        Mn(i), ht(s ? 3 : 1, o)
    }
}

function xl(e, t, n) {
    if (nl(t)) {
        let r = ae(null);
        try {
            let o = t.directiveStart,
                i = t.directiveEnd;
            for (let s = o; s < i; s++) {
                let a = e.data[s];
                a.contentQueries && a.contentQueries(1, n[s], s)
            }
        } finally {
            ae(r)
        }
    }
}

function Nl(e, t, n) {
    gp() && (aI(e, t, n, We(n, t)), (n.flags & 64) === 64 && Bg(e, t, n))
}

function Rl(e, t, n = We) {
    let r = t.localNames;
    if (r !== null) {
        let o = t.index + 1;
        for (let i = 0; i < r.length; i += 2) {
            let s = r[i + 1],
                a = s === -1 ? n(t, e) : e[s];
            e[o++] = a
        }
    }
}

function Ug(e) {
    let t = e.tView;
    return t === null || t.incompleteFirstPass ? e.tView = Ol(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts, e.id) : t
}

function Ol(e, t, n, r, o, i, s, a, u, c, l) {
    let d = ie + r,
        f = d + o,
        h = QE(d, f),
        p = typeof c == "function" ? c() : c;
    return h[N] = {
        type: e,
        blueprint: h,
        template: n,
        queries: null,
        viewQuery: a,
        declTNode: t,
        data: h.slice().fill(null, d),
        bindingStartIndex: d,
        expandoStartIndex: f,
        hostBindingOpCodes: null,
        firstCreatePass: !0,
        firstUpdatePass: !0,
        staticViewQueries: !1,
        staticContentQueries: !1,
        preOrderHooks: null,
        preOrderCheckHooks: null,
        contentHooks: null,
        contentCheckHooks: null,
        viewHooks: null,
        viewCheckHooks: null,
        destroyHooks: null,
        cleanup: null,
        contentQueries: null,
        components: null,
        directiveRegistry: typeof i == "function" ? i() : i,
        pipeRegistry: typeof s == "function" ? s() : s,
        firstChild: null,
        schemas: u,
        consts: p,
        incompleteFirstPass: !1,
        ssrId: l
    }
}

function QE(e, t) {
    let n = [];
    for (let r = 0; r < t; r++) n.push(r < e ? null : Ie);
    return n
}

function KE(e, t, n, r) {
    let i = r.get(fE, sg) || n === gt.ShadowDom,
        s = e.selectRootElement(t, i);
    return JE(s), s
}

function JE(e) {
    XE(e)
}
var XE = () => null;

function eI(e, t, n, r) {
    let o = Wg(t);
    o.push(n), e.firstCreatePass && qg(e).push(r, o.length - 1)
}

function tI(e, t, n, r, o, i) {
    let s = t ? t.injectorIndex : -1,
        a = 0;
    return mp() && (a |= 128), {
        type: n,
        index: r,
        insertBeforeIndex: null,
        injectorIndex: s,
        directiveStart: -1,
        directiveEnd: -1,
        directiveStylingLast: -1,
        componentOffset: -1,
        propertyBindings: null,
        flags: a,
        providerIndexes: 0,
        value: o,
        attrs: i,
        mergedAttrs: null,
        localNames: null,
        initialInputs: void 0,
        inputs: null,
        outputs: null,
        tView: null,
        next: null,
        prev: null,
        projectionNext: null,
        child: null,
        parent: t,
        projection: null,
        styles: null,
        stylesWithoutHost: null,
        residualStyles: void 0,
        classes: null,
        classesWithoutHost: null,
        residualClasses: void 0,
        classBindings: 0,
        styleBindings: 0
    }
}

function Mh(e, t, n, r, o) {
    for (let i in t) {
        if (!t.hasOwnProperty(i)) continue;
        let s = t[i];
        if (s === void 0) continue;
        r ? ? = {};
        let a, u = Se.None;
        Array.isArray(s) ? (a = s[0], u = s[1]) : a = s;
        let c = i;
        if (o !== null) {
            if (!o.hasOwnProperty(i)) continue;
            c = o[i]
        }
        e === 0 ? Sh(r, n, c, a, u) : Sh(r, n, c, a)
    }
    return r
}

function Sh(e, t, n, r, o) {
    let i;
    e.hasOwnProperty(n) ? (i = e[n]).push(t, r) : i = e[n] = [t, r], o !== void 0 && i.push(o)
}

function nI(e, t, n) {
    let r = t.directiveStart,
        o = t.directiveEnd,
        i = e.data,
        s = t.attrs,
        a = [],
        u = null,
        c = null;
    for (let l = r; l < o; l++) {
        let d = i[l],
            f = n ? n.get(d) : null,
            h = f ? f.inputs : null,
            p = f ? f.outputs : null;
        u = Mh(0, d.inputs, l, u, h), c = Mh(1, d.outputs, l, c, p);
        let g = u !== null && s !== null && !rp(t) ? mI(u, l, s) : null;
        a.push(g)
    }
    u !== null && (u.hasOwnProperty("class") && (t.flags |= 8), u.hasOwnProperty("style") && (t.flags |= 16)), t.initialInputs = a, t.inputs = u, t.outputs = c
}

function rI(e) {
    return e === "class" ? "className" : e === "for" ? "htmlFor" : e === "formaction" ? "formAction" : e === "innerHtml" ? "innerHTML" : e === "readonly" ? "readOnly" : e === "tabindex" ? "tabIndex" : e
}

function un(e, t, n, r, o, i, s, a) {
    let u = We(t, n),
        c = t.inputs,
        l;
    !a && c != null && (l = c[r]) ? (kl(e, n, l, r, o), ps(t) && oI(n, t.index)) : t.type & 3 ? (r = rI(r), o = s != null ? s(o, t.value || "", r) : o, i.setProperty(u, r, o)) : t.type & 12
}

function oI(e, t) {
    let n = on(t, e);
    n[x] & 16 || (n[x] |= 64)
}

function Fl(e, t, n, r) {
    if (gp()) {
        let o = r === null ? null : {
                "": -1
            },
            i = cI(e, n),
            s, a;
        i === null ? s = a = null : [s, a] = i, s !== null && $g(e, t, n, s, o, a), o && lI(n, r, o)
    }
    n.mergedAttrs = Jr(n.mergedAttrs, n.attrs)
}

function $g(e, t, n, r, o, i) {
    for (let c = 0; c < r.length; c++) Qu(Ji(n, t), e, r[c].type);
    fI(n, e.data.length, r.length);
    for (let c = 0; c < r.length; c++) {
        let l = r[c];
        l.providersResolver && l.providersResolver(l)
    }
    let s = !1,
        a = !1,
        u = Co(e, t, r.length, null);
    for (let c = 0; c < r.length; c++) {
        let l = r[c];
        n.mergedAttrs = Jr(n.mergedAttrs, l.hostAttrs), hI(e, n, t, u, l), dI(u, l, o), l.contentQueries !== null && (n.flags |= 4), (l.hostBindings !== null || l.hostAttrs !== null || l.hostVars !== 0) && (n.flags |= 64);
        let d = l.type.prototype;
        !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((e.preOrderHooks ? ? = []).push(n.index), s = !0), !a && (d.ngOnChanges || d.ngDoCheck) && ((e.preOrderCheckHooks ? ? = []).push(n.index), a = !0), u++
    }
    nI(e, n, i)
}

function iI(e, t, n, r, o) {
    let i = o.hostBindings;
    if (i) {
        let s = e.hostBindingOpCodes;
        s === null && (s = e.hostBindingOpCodes = []);
        let a = ~t.index;
        sI(s) != a && s.push(a), s.push(n, r, i)
    }
}

function sI(e) {
    let t = e.length;
    for (; t > 0;) {
        let n = e[--t];
        if (typeof n == "number" && n < 0) return n
    }
    return 0
}

function aI(e, t, n, r) {
    let o = n.directiveStart,
        i = n.directiveEnd;
    ps(n) && pI(t, n, e.data[o + n.componentOffset]), e.firstCreatePass || Ji(n, t), yt(r, t);
    let s = n.initialInputs;
    for (let a = o; a < i; a++) {
        let u = e.data[a],
            c = An(t, e, a, n);
        if (yt(c, t), s !== null && gI(t, a - o, c, u, n, s), kt(u)) {
            let l = on(n.index, t);
            l[me] = An(t, e, a, n)
        }
    }
}

function Bg(e, t, n) {
    let r = n.directiveStart,
        o = n.directiveEnd,
        i = n.index,
        s = rC();
    try {
        Mn(i);
        for (let a = r; a < o; a++) {
            let u = e.data[a],
                c = t[a];
            ju(a), (u.hostBindings !== null || u.hostVars !== 0 || u.hostAttrs !== null) && uI(u, c)
        }
    } finally {
        Mn(-1), ju(s)
    }
}

function uI(e, t) {
    e.hostBindings !== null && e.hostBindings(1, t)
}

function cI(e, t) {
    let n = e.directiveRegistry,
        r = null,
        o = null;
    if (n)
        for (let i = 0; i < n.length; i++) {
            let s = n[i];
            if (op(t, s.selectors, !1))
                if (r || (r = []), kt(s))
                    if (s.findHostDirectiveDefs !== null) {
                        let a = [];
                        o = o || new Map, s.findHostDirectiveDefs(s, a, o), r.unshift(...a, s);
                        let u = a.length;
                        dc(e, t, u)
                    } else r.unshift(s), dc(e, t, 0);
            else o = o || new Map, s.findHostDirectiveDefs ? .(s, r, o), r.push(s)
        }
    return r === null ? null : [r, o]
}

function dc(e, t, n) {
    t.componentOffset = n, (e.components ? ? = []).push(t.index)
}

function lI(e, t, n) {
    if (t) {
        let r = e.localNames = [];
        for (let o = 0; o < t.length; o += 2) {
            let i = n[t[o + 1]];
            if (i == null) throw new D(-301, !1);
            r.push(t[o], i)
        }
    }
}

function dI(e, t, n) {
    if (n) {
        if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
        kt(t) && (n[""] = e)
    }
}

function fI(e, t, n) {
    e.flags |= 1, e.directiveStart = t, e.directiveEnd = t + n, e.providerIndexes = t
}

function hI(e, t, n, r, o) {
    e.data[r] = o;
    let i = o.factory || (o.factory = Sn(o.type, !0)),
        s = new Tn(i, kt(o), _);
    e.blueprint[r] = s, n[r] = s, iI(e, t, r, Co(e, n, o.hostVars, Ie), o)
}

function pI(e, t, n) {
    let r = We(t, e),
        o = Ug(n),
        i = e[Ft].rendererFactory,
        s = 16;
    n.signals ? s = 4096 : n.onPush && (s = 64);
    let a = Ps(e, Fs(e, o, null, s, r, t, null, i.createRenderer(r, n), null, null, null));
    e[t.index] = a
}

function Hg(e, t, n, r, o, i) {
    let s = We(e, t);
    Pl(t[j], s, i, e.value, n, r, o)
}

function Pl(e, t, n, r, o, i, s) {
    if (i == null) e.removeAttribute(t, o, n);
    else {
        let a = s == null ? rt(i) : s(i, r || "", o);
        e.setAttribute(t, o, a, n)
    }
}

function gI(e, t, n, r, o, i) {
    let s = i[t];
    if (s !== null)
        for (let a = 0; a < s.length;) {
            let u = s[a++],
                c = s[a++],
                l = s[a++],
                d = s[a++];
            Vg(r, n, u, c, l, d)
        }
}

function mI(e, t, n) {
    let r = null,
        o = 0;
    for (; o < n.length;) {
        let i = n[o];
        if (i === 0) {
            o += 4;
            continue
        } else if (i === 5) {
            o += 2;
            continue
        }
        if (typeof i == "number") break;
        if (e.hasOwnProperty(i)) {
            r === null && (r = []);
            let s = e[i];
            for (let a = 0; a < s.length; a += 3)
                if (s[a] === t) {
                    r.push(i, s[a + 1], s[a + 2], n[o + 1]);
                    break
                }
        }
        o += 2
    }
    return r
}

function zg(e, t, n, r) {
    return [e, !0, 0, t, null, r, null, n, null, null]
}

function Gg(e, t) {
    let n = e.contentQueries;
    if (n !== null) {
        let r = ae(null);
        try {
            for (let o = 0; o < n.length; o += 2) {
                let i = n[o],
                    s = n[o + 1];
                if (s !== -1) {
                    let a = e.data[s];
                    cl(i), a.contentQueries(2, t[s], s)
                }
            }
        } finally {
            ae(r)
        }
    }
}

function Ps(e, t) {
    return e[eo] ? e[dh][nt] = t : e[eo] = t, e[dh] = t, t
}

function fc(e, t, n) {
    cl(0);
    let r = ae(null);
    try {
        t(e, n)
    } finally {
        ae(r)
    }
}

function Wg(e) {
    return e[Xr] || (e[Xr] = [])
}

function qg(e) {
    return e.cleanup || (e.cleanup = [])
}

function vI(e, t, n) {
    return (e === null || kt(e)) && (n = Bw(n[t.index])), n[j]
}

function Zg(e, t) {
    let n = e[dr],
        r = n ? n.get(vt, null) : null;
    r && r.handleError(t)
}

function kl(e, t, n, r, o) {
    for (let i = 0; i < n.length;) {
        let s = n[i++],
            a = n[i++],
            u = n[i++],
            c = t[s],
            l = e.data[s];
        Vg(l, c, r, a, u, o)
    }
}

function yI(e, t, n) {
    let r = ms(t, e);
    wg(e[j], r, n)
}

function DI(e, t) {
    let n = on(t, e),
        r = n[N];
    wI(r, n);
    let o = n[wt];
    o !== null && n[lr] === null && (n[lr] = yl(o, n[dr])), Ll(r, n, n[me])
}

function wI(e, t) {
    for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n])
}

function Ll(e, t, n) {
    ll(t);
    try {
        let r = e.viewQuery;
        r !== null && fc(1, r, n);
        let o = e.template;
        o !== null && jg(e, t, o, 1, n), e.firstCreatePass && (e.firstCreatePass = !1), t[Pt] ? .finishViewCreation(e), e.staticContentQueries && Gg(e, t), e.staticViewQueries && fc(2, e.viewQuery, n);
        let i = e.components;
        i !== null && CI(t, i)
    } catch (r) {
        throw e.firstCreatePass && (e.incompleteFirstPass = !0, e.firstCreatePass = !1), r
    } finally {
        t[x] &= -5, dl()
    }
}

function CI(e, t) {
    for (let n = 0; n < t.length; n++) DI(e, t[n])
}

function ks(e, t, n, r) {
    let o = t.tView,
        s = e[x] & 4096 ? 4096 : 16,
        a = Fs(e, o, n, s, null, t, null, null, null, r ? .injector ? ? null, r ? .dehydratedView ? ? null),
        u = e[t.index];
    a[mo] = u;
    let c = e[Pt];
    return c !== null && (a[Pt] = c.createEmbeddedView(o)), Ll(o, a, n), a
}

function Yg(e, t) {
    let n = Ce + t;
    if (n < e.length) return e[n]
}

function ao(e, t) {
    return !t || t.firstChild === null || Tp(e)
}

function Ls(e, t, n, r = !0) {
    let o = t[N];
    if (jE(o, t, e, n), r) {
        let s = lc(n, e),
            a = t[j],
            u = Ns(a, e[bn]);
        u !== null && LE(o, e[ke], a, t, u, s)
    }
    let i = t[lr];
    i !== null && i.firstChild !== null && (i.firstChild = null)
}

function Qg(e, t) {
    let n = so(e, t);
    return n !== void 0 && xs(n[N], n), n
}

function Xi(e, t, n, r, o = !1) {
    for (; n !== null;) {
        let i = t[n.index];
        i !== null && r.push(Ge(i)), jt(i) && EI(i, r);
        let s = n.type;
        if (s & 8) Xi(e, t, n.child, r);
        else if (s & 32) {
            let a = _l(n, t),
                u;
            for (; u = a();) r.push(u)
        } else if (s & 16) {
            let a = Ng(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
                let u = no(t[Pe]);
                Xi(u[N], u, a, r, !0)
            }
        }
        n = o ? n.projectionNext : n.next
    }
    return r
}

function EI(e, t) {
    for (let n = Ce; n < e.length; n++) {
        let r = e[n],
            o = r[N].firstChild;
        o !== null && Xi(r[N], r, o, t)
    }
    e[bn] !== e[wt] && t.push(e[bn])
}
var Kg = [];

function II(e) {
    return e[In] ? ? bI(e)
}

function bI(e) {
    let t = Kg.pop() ? ? Object.create(MI);
    return t.lView = e, t
}

function _I(e) {
    e.lView[In] !== e && (e.lView = null, Kg.push(e))
}
var MI = Q(y({}, Mf), {
    consumerIsAlwaysLive: !0,
    consumerMarkedDirty: e => {
        to(e.lView)
    },
    consumerOnSignalRead() {
        this.lView[In] = this
    }
});

function Jg(e) {
    return em(e[eo])
}

function Xg(e) {
    return em(e[nt])
}

function em(e) {
    for (; e !== null && !jt(e);) e = e[nt];
    return e
}
var tm = 100;

function nm(e, t = !0, n = 0) {
    let r = e[Ft],
        o = r.rendererFactory,
        i = !1;
    i || o.begin ? .();
    try {
        SI(e, n)
    } catch (s) {
        throw t && Zg(e, s), s
    } finally {
        i || (o.end ? .(), r.inlineEffectRunner ? .flush())
    }
}

function SI(e, t) {
    hc(e, t);
    let n = 0;
    for (; il(e);) {
        if (n === tm) throw new D(103, !1);
        n++, hc(e, 1)
    }
}

function TI(e, t, n, r) {
    let o = t[x];
    if ((o & 256) === 256) return;
    let i = !1;
    !i && t[Ft].inlineEffectRunner ? .flush(), ll(t);
    let s = null,
        a = null;
    !i && AI(e) && (a = II(t), s = Sf(a));
    try {
        hp(t), eC(e.bindingStartIndex), n !== null && jg(e, t, n, 2, r);
        let u = (o & 3) === 3;
        if (!i)
            if (u) {
                let d = e.preOrderCheckHooks;
                d !== null && Li(t, d, null)
            } else {
                let d = e.preOrderHooks;
                d !== null && Vi(t, d, 0, null), Iu(t, 0)
            }
        if (xI(t), rm(t, 0), e.contentQueries !== null && Gg(e, t), !i)
            if (u) {
                let d = e.contentCheckHooks;
                d !== null && Li(t, d)
            } else {
                let d = e.contentHooks;
                d !== null && Vi(t, d, 1), Iu(t, 1)
            }
        YE(e, t);
        let c = e.components;
        c !== null && im(t, c, 0);
        let l = e.viewQuery;
        if (l !== null && fc(2, l, r), !i)
            if (u) {
                let d = e.viewCheckHooks;
                d !== null && Li(t, d)
            } else {
                let d = e.viewHooks;
                d !== null && Vi(t, d, 2), Iu(t, 2)
            }
        if (e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[wu]) {
            for (let d of t[wu]) d();
            t[wu] = null
        }
        i || (t[x] &= -73)
    } catch (u) {
        throw to(t), u
    } finally {
        a !== null && (Tf(a, s), _I(a)), dl()
    }
}

function AI(e) {
    return e.type !== 2
}

function rm(e, t) {
    for (let n = Jg(e); n !== null; n = Xg(n))
        for (let r = Ce; r < n.length; r++) {
            let o = n[r];
            om(o, t)
        }
}

function xI(e) {
    for (let t = Jg(e); t !== null; t = Xg(t)) {
        if (!(t[x] & tl.HasTransplantedViews)) continue;
        let n = t[fr];
        for (let r = 0; r < n.length; r++) {
            let o = n[r],
                i = o[ve];
            Gw(o)
        }
    }
}

function NI(e, t, n) {
    let r = on(t, e);
    om(r, n)
}

function om(e, t) {
    ol(e) && hc(e, t)
}

function hc(e, t) {
    let r = e[N],
        o = e[x],
        i = e[In],
        s = !!(t === 0 && o & 16);
    if (s || = !!(o & 64 && t === 0), s || = !!(o & 1024), s || = !!(i ? .dirty && Qa(i)), i && (i.dirty = !1), e[x] &= -9217, s) TI(r, e, r.template, e[me]);
    else if (o & 8192) {
        rm(e, 1);
        let a = r.components;
        a !== null && im(e, a, 1)
    }
}

function im(e, t, n) {
    for (let r = 0; r < t.length; r++) NI(e, t[r], n)
}

function Vl(e) {
    for (e[Ft].changeDetectionScheduler ? .notify(); e;) {
        e[x] |= 64;
        let t = no(e);
        if (Vw(e) && !t) return e;
        e = t
    }
    return null
}
var Nn = class {
        get rootNodes() {
            let t = this._lView,
                n = t[N];
            return Xi(n, t, n.firstChild, [])
        }
        constructor(t, n, r = !0) {
            this._lView = t, this._cdRefInjectingView = n, this.notifyErrorHandler = r, this._appRef = null, this._attachedToViewContainer = !1
        }
        get context() {
            return this._lView[me]
        }
        set context(t) {
            this._lView[me] = t
        }
        get destroyed() {
            return (this._lView[x] & 256) === 256
        }
        destroy() {
            if (this._appRef) this._appRef.detachView(this);
            else if (this._attachedToViewContainer) {
                let t = this._lView[ve];
                if (jt(t)) {
                    let n = t[Gi],
                        r = n ? n.indexOf(this) : -1;
                    r > -1 && (so(t, r), Wi(n, r))
                }
                this._attachedToViewContainer = !1
            }
            xs(this._lView[N], this._lView)
        }
        onDestroy(t) {
            pp(this._lView, t)
        }
        markForCheck() {
            Vl(this._cdRefInjectingView || this._lView)
        }
        detach() {
            this._lView[x] &= -129
        }
        reattach() {
            Vu(this._lView), this._lView[x] |= 128
        }
        detectChanges() {
            this._lView[x] |= 1024, nm(this._lView, this.notifyErrorHandler)
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
            if (this._appRef) throw new D(902, !1);
            this._attachedToViewContainer = !0
        }
        detachFromAppRef() {
            this._appRef = null, Eg(this._lView[N], this._lView)
        }
        attachToAppRef(t) {
            if (this._attachedToViewContainer) throw new D(902, !1);
            this._appRef = t, Vu(this._lView)
        }
    },
    Vt = (() => {
        class e {
            static {
                this.__NG_ELEMENT_ID__ = FI
            }
        }
        return e
    })(),
    RI = Vt,
    OI = class extends RI {
        constructor(t, n, r) {
            super(), this._declarationLView = t, this._declarationTContainer = n, this.elementRef = r
        }
        get ssrId() {
            return this._declarationTContainer.tView ? .ssrId || null
        }
        createEmbeddedView(t, n) {
            return this.createEmbeddedViewImpl(t, n)
        }
        createEmbeddedViewImpl(t, n, r) {
            let o = ks(this._declarationLView, this._declarationTContainer, t, {
                injector: n,
                dehydratedView: r
            });
            return new Nn(o)
        }
    };

function FI() {
    return Vs(Ee(), b())
}

function Vs(e, t) {
    return e.type & 4 ? new OI(t, e, yr(e, t)) : null
}
var oV = new RegExp(`^(\\d+)*(${NC}|${xC})*(.*)`);
var PI = () => null;

function uo(e, t) {
    return PI(e, t)
}
var pc = class {},
    gc = class {},
    es = class {};

function kI(e) {
    let t = Error(`No component factory found for ${Me(e)}.`);
    return t[LI] = e, t
}
var LI = "ngComponent";
var mc = class {
        resolveComponentFactory(t) {
            throw kI(t)
        }
    },
    js = (() => {
        class e {
            static {
                this.NULL = new mc
            }
        }
        return e
    })(),
    co = class {},
    it = (() => {
        class e {
            constructor() {
                this.destroyNode = null
            }
            static {
                this.__NG_ELEMENT_ID__ = () => VI()
            }
        }
        return e
    })();

function VI() {
    let e = b(),
        t = Ee(),
        n = on(t.index, e);
    return (Cn(n) ? n : e)[j]
}
var jI = (() => {
        class e {
            static {
                this.\u0275prov = E({
                    token: e,
                    providedIn: "root",
                    factory: () => null
                })
            }
        }
        return e
    })(),
    Su = {};

function UI(e) {
    return typeof e == "function" && e[Ya] !== void 0
}

function sm(e) {
    return UI(e) && typeof e.set == "function"
}

function jl(e) {
    let t = ae(null);
    try {
        return e()
    } finally {
        ae(t)
    }
}

function am(e) {
    return Ul(e) ? Array.isArray(e) || !(e instanceof Map) && Symbol.iterator in e : !1
}

function $I(e, t) {
    if (Array.isArray(e))
        for (let n = 0; n < e.length; n++) t(e[n]);
    else {
        let n = e[Symbol.iterator](),
            r;
        for (; !(r = n.next()).done;) t(r.value)
    }
}

function Ul(e) {
    return e !== null && (typeof e == "function" || typeof e == "object")
}
var vc = class {
        constructor() {}
        supports(t) {
            return am(t)
        }
        create(t) {
            return new yc(t)
        }
    },
    BI = (e, t) => t,
    yc = class {
        constructor(t) {
            this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = t || BI
        }
        forEachItem(t) {
            let n;
            for (n = this._itHead; n !== null; n = n._next) t(n)
        }
        forEachOperation(t) {
            let n = this._itHead,
                r = this._removalsHead,
                o = 0,
                i = null;
            for (; n || r;) {
                let s = !r || n && n.currentIndex < Th(r, o, i) ? n : r,
                    a = Th(s, o, i),
                    u = s.currentIndex;
                if (s === r) o--, r = r._nextRemoved;
                else if (n = n._next, s.previousIndex == null) o++;
                else {
                    i || (i = []);
                    let c = a - o,
                        l = u - o;
                    if (c != l) {
                        for (let f = 0; f < c; f++) {
                            let h = f < i.length ? i[f] : i[f] = 0,
                                p = h + f;
                            l <= p && p < c && (i[f] = h + 1)
                        }
                        let d = s.previousIndex;
                        i[d] = l - c
                    }
                }
                a !== u && t(s, a, u)
            }
        }
        forEachPreviousItem(t) {
            let n;
            for (n = this._previousItHead; n !== null; n = n._nextPrevious) t(n)
        }
        forEachAddedItem(t) {
            let n;
            for (n = this._additionsHead; n !== null; n = n._nextAdded) t(n)
        }
        forEachMovedItem(t) {
            let n;
            for (n = this._movesHead; n !== null; n = n._nextMoved) t(n)
        }
        forEachRemovedItem(t) {
            let n;
            for (n = this._removalsHead; n !== null; n = n._nextRemoved) t(n)
        }
        forEachIdentityChange(t) {
            let n;
            for (n = this._identityChangesHead; n !== null; n = n._nextIdentityChange) t(n)
        }
        diff(t) {
            if (t == null && (t = []), !am(t)) throw new D(900, !1);
            return this.check(t) ? this : null
        }
        onDestroy() {}
        check(t) {
            this._reset();
            let n = this._itHead,
                r = !1,
                o, i, s;
            if (Array.isArray(t)) {
                this.length = t.length;
                for (let a = 0; a < this.length; a++) i = t[a], s = this._trackByFn(a, i), n === null || !Object.is(n.trackById, s) ? (n = this._mismatch(n, i, s, a), r = !0) : (r && (n = this._verifyReinsertion(n, i, s, a)), Object.is(n.item, i) || this._addIdentityChange(n, i)), n = n._next
            } else o = 0, $I(t, a => {
                s = this._trackByFn(o, a), n === null || !Object.is(n.trackById, s) ? (n = this._mismatch(n, a, s, o), r = !0) : (r && (n = this._verifyReinsertion(n, a, s, o)), Object.is(n.item, a) || this._addIdentityChange(n, a)), n = n._next, o++
            }), this.length = o;
            return this._truncate(n), this.collection = t, this.isDirty
        }
        get isDirty() {
            return this._additionsHead !== null || this._movesHead !== null || this._removalsHead !== null || this._identityChangesHead !== null
        }
        _reset() {
            if (this.isDirty) {
                let t;
                for (t = this._previousItHead = this._itHead; t !== null; t = t._next) t._nextPrevious = t._next;
                for (t = this._additionsHead; t !== null; t = t._nextAdded) t.previousIndex = t.currentIndex;
                for (this._additionsHead = this._additionsTail = null, t = this._movesHead; t !== null; t = t._nextMoved) t.previousIndex = t.currentIndex;
                this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null
            }
        }
        _mismatch(t, n, r, o) {
            let i;
            return t === null ? i = this._itTail : (i = t._prev, this._remove(t)), t = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(r, null), t !== null ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._reinsertAfter(t, i, o)) : (t = this._linkedRecords === null ? null : this._linkedRecords.get(r, o), t !== null ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._moveAfter(t, i, o)) : t = this._addAfter(new Dc(n, r), i, o)), t
        }
        _verifyReinsertion(t, n, r, o) {
            let i = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(r, null);
            return i !== null ? t = this._reinsertAfter(i, t._prev, o) : t.currentIndex != o && (t.currentIndex = o, this._addToMoves(t, o)), t
        }
        _truncate(t) {
            for (; t !== null;) {
                let n = t._next;
                this._addToRemovals(this._unlink(t)), t = n
            }
            this._unlinkedRecords !== null && this._unlinkedRecords.clear(), this._additionsTail !== null && (this._additionsTail._nextAdded = null), this._movesTail !== null && (this._movesTail._nextMoved = null), this._itTail !== null && (this._itTail._next = null), this._removalsTail !== null && (this._removalsTail._nextRemoved = null), this._identityChangesTail !== null && (this._identityChangesTail._nextIdentityChange = null)
        }
        _reinsertAfter(t, n, r) {
            this._unlinkedRecords !== null && this._unlinkedRecords.remove(t);
            let o = t._prevRemoved,
                i = t._nextRemoved;
            return o === null ? this._removalsHead = i : o._nextRemoved = i, i === null ? this._removalsTail = o : i._prevRemoved = o, this._insertAfter(t, n, r), this._addToMoves(t, r), t
        }
        _moveAfter(t, n, r) {
            return this._unlink(t), this._insertAfter(t, n, r), this._addToMoves(t, r), t
        }
        _addAfter(t, n, r) {
            return this._insertAfter(t, n, r), this._additionsTail === null ? this._additionsTail = this._additionsHead = t : this._additionsTail = this._additionsTail._nextAdded = t, t
        }
        _insertAfter(t, n, r) {
            let o = n === null ? this._itHead : n._next;
            return t._next = o, t._prev = n, o === null ? this._itTail = t : o._prev = t, n === null ? this._itHead = t : n._next = t, this._linkedRecords === null && (this._linkedRecords = new ts), this._linkedRecords.put(t), t.currentIndex = r, t
        }
        _remove(t) {
            return this._addToRemovals(this._unlink(t))
        }
        _unlink(t) {
            this._linkedRecords !== null && this._linkedRecords.remove(t);
            let n = t._prev,
                r = t._next;
            return n === null ? this._itHead = r : n._next = r, r === null ? this._itTail = n : r._prev = n, t
        }
        _addToMoves(t, n) {
            return t.previousIndex === n || (this._movesTail === null ? this._movesTail = this._movesHead = t : this._movesTail = this._movesTail._nextMoved = t), t
        }
        _addToRemovals(t) {
            return this._unlinkedRecords === null && (this._unlinkedRecords = new ts), this._unlinkedRecords.put(t), t.currentIndex = null, t._nextRemoved = null, this._removalsTail === null ? (this._removalsTail = this._removalsHead = t, t._prevRemoved = null) : (t._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = t), t
        }
        _addIdentityChange(t, n) {
            return t.item = n, this._identityChangesTail === null ? this._identityChangesTail = this._identityChangesHead = t : this._identityChangesTail = this._identityChangesTail._nextIdentityChange = t, t
        }
    },
    Dc = class {
        constructor(t, n) {
            this.item = t, this.trackById = n, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null
        }
    },
    wc = class {
        constructor() {
            this._head = null, this._tail = null
        }
        add(t) {
            this._head === null ? (this._head = this._tail = t, t._nextDup = null, t._prevDup = null) : (this._tail._nextDup = t, t._prevDup = this._tail, t._nextDup = null, this._tail = t)
        }
        get(t, n) {
            let r;
            for (r = this._head; r !== null; r = r._nextDup)
                if ((n === null || n <= r.currentIndex) && Object.is(r.trackById, t)) return r;
            return null
        }
        remove(t) {
            let n = t._prevDup,
                r = t._nextDup;
            return n === null ? this._head = r : n._nextDup = r, r === null ? this._tail = n : r._prevDup = n, this._head === null
        }
    },
    ts = class {
        constructor() {
            this.map = new Map
        }
        put(t) {
            let n = t.trackById,
                r = this.map.get(n);
            r || (r = new wc, this.map.set(n, r)), r.add(t)
        }
        get(t, n) {
            let r = t,
                o = this.map.get(r);
            return o ? o.get(t, n) : null
        }
        remove(t) {
            let n = t.trackById;
            return this.map.get(n).remove(t) && this.map.delete(n), t
        }
        get isEmpty() {
            return this.map.size === 0
        }
        clear() {
            this.map.clear()
        }
    };

function Th(e, t, n) {
    let r = e.previousIndex;
    if (r === null) return r;
    let o = 0;
    return n && r < n.length && (o = n[r]), r + t + o
}
var Cc = class {
        constructor() {}
        supports(t) {
            return t instanceof Map || Ul(t)
        }
        create() {
            return new Ec
        }
    },
    Ec = class {
        constructor() {
            this._records = new Map, this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, this._changesHead = null, this._changesTail = null, this._additionsHead = null, this._additionsTail = null, this._removalsHead = null, this._removalsTail = null
        }
        get isDirty() {
            return this._additionsHead !== null || this._changesHead !== null || this._removalsHead !== null
        }
        forEachItem(t) {
            let n;
            for (n = this._mapHead; n !== null; n = n._next) t(n)
        }
        forEachPreviousItem(t) {
            let n;
            for (n = this._previousMapHead; n !== null; n = n._nextPrevious) t(n)
        }
        forEachChangedItem(t) {
            let n;
            for (n = this._changesHead; n !== null; n = n._nextChanged) t(n)
        }
        forEachAddedItem(t) {
            let n;
            for (n = this._additionsHead; n !== null; n = n._nextAdded) t(n)
        }
        forEachRemovedItem(t) {
            let n;
            for (n = this._removalsHead; n !== null; n = n._nextRemoved) t(n)
        }
        diff(t) {
            if (!t) t = new Map;
            else if (!(t instanceof Map || Ul(t))) throw new D(900, !1);
            return this.check(t) ? this : null
        }
        onDestroy() {}
        check(t) {
            this._reset();
            let n = this._mapHead;
            if (this._appendAfter = null, this._forEach(t, (r, o) => {
                    if (n && n.key === o) this._maybeAddToChanges(n, r), this._appendAfter = n, n = n._next;
                    else {
                        let i = this._getOrCreateRecordForKey(o, r);
                        n = this._insertBeforeOrAppend(n, i)
                    }
                }), n) {
                n._prev && (n._prev._next = null), this._removalsHead = n;
                for (let r = n; r !== null; r = r._nextRemoved) r === this._mapHead && (this._mapHead = null), this._records.delete(r.key), r._nextRemoved = r._next, r.previousValue = r.currentValue, r.currentValue = null, r._prev = null, r._next = null
            }
            return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty
        }
        _insertBeforeOrAppend(t, n) {
            if (t) {
                let r = t._prev;
                return n._next = t, n._prev = r, t._prev = n, r && (r._next = n), t === this._mapHead && (this._mapHead = n), this._appendAfter = t, t
            }
            return this._appendAfter ? (this._appendAfter._next = n, n._prev = this._appendAfter) : this._mapHead = n, this._appendAfter = n, null
        }
        _getOrCreateRecordForKey(t, n) {
            if (this._records.has(t)) {
                let o = this._records.get(t);
                this._maybeAddToChanges(o, n);
                let i = o._prev,
                    s = o._next;
                return i && (i._next = s), s && (s._prev = i), o._next = null, o._prev = null, o
            }
            let r = new Ic(t);
            return this._records.set(t, r), r.currentValue = n, this._addToAdditions(r), r
        }
        _reset() {
            if (this.isDirty) {
                let t;
                for (this._previousMapHead = this._mapHead, t = this._previousMapHead; t !== null; t = t._next) t._nextPrevious = t._next;
                for (t = this._changesHead; t !== null; t = t._nextChanged) t.previousValue = t.currentValue;
                for (t = this._additionsHead; t != null; t = t._nextAdded) t.previousValue = t.currentValue;
                this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null
            }
        }
        _maybeAddToChanges(t, n) {
            Object.is(n, t.currentValue) || (t.previousValue = t.currentValue, t.currentValue = n, this._addToChanges(t))
        }
        _addToAdditions(t) {
            this._additionsHead === null ? this._additionsHead = this._additionsTail = t : (this._additionsTail._nextAdded = t, this._additionsTail = t)
        }
        _addToChanges(t) {
            this._changesHead === null ? this._changesHead = this._changesTail = t : (this._changesTail._nextChanged = t, this._changesTail = t)
        }
        _forEach(t, n) {
            t instanceof Map ? t.forEach(n) : Object.keys(t).forEach(r => n(t[r], r))
        }
    },
    Ic = class {
        constructor(t) {
            this.key = t, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, this._nextChanged = null
        }
    };

function Ah() {
    return new $l([new vc])
}
var $l = (() => {
    class e {
        static {
            this.\u0275prov = E({
                token: e,
                providedIn: "root",
                factory: Ah
            })
        }
        constructor(n) {
            this.factories = n
        }
        static create(n, r) {
            if (r != null) {
                let o = r.factories.slice();
                n = n.concat(o)
            }
            return new e(n)
        }
        static extend(n) {
            return {
                provide: e,
                useFactory: r => e.create(n, r || Ah()),
                deps: [
                    [e, new bs, new yo]
                ]
            }
        }
        find(n) {
            let r = this.factories.find(o => o.supports(n));
            if (r != null) return r;
            throw new D(901, !1)
        }
    }
    return e
})();

function xh() {
    return new Bl([new Cc])
}
var Bl = (() => {
    class e {
        static {
            this.\u0275prov = E({
                token: e,
                providedIn: "root",
                factory: xh
            })
        }
        constructor(n) {
            this.factories = n
        }
        static create(n, r) {
            if (r) {
                let o = r.factories.slice();
                n = n.concat(o)
            }
            return new e(n)
        }
        static extend(n) {
            return {
                provide: e,
                useFactory: r => e.create(n, r || xh()),
                deps: [
                    [e, new bs, new yo]
                ]
            }
        }
        find(n) {
            let r = this.factories.find(o => o.supports(n));
            if (r) return r;
            throw new D(901, !1)
        }
    }
    return e
})();
var kn = (() => {
    class e {
        static {
            this.__NG_ELEMENT_ID__ = HI
        }
    }
    return e
})();

function HI(e) {
    return zI(Ee(), b(), (e & 16) === 16)
}

function zI(e, t, n) {
    if (ps(e) && !n) {
        let r = on(e.index, t);
        return new Nn(r, r)
    } else if (e.type & 47) {
        let r = t[Pe];
        return new Nn(r, t)
    }
    return null
}
var um = (() => {
        class e {
            static {
                this.__NG_ELEMENT_ID__ = GI
            }
            static {
                this.__NG_ENV_ID__ = n => n
            }
        }
        return e
    })(),
    bc = class extends um {
        constructor(t) {
            super(), this._lView = t
        }
        onDestroy(t) {
            return pp(this._lView, t), () => qw(this._lView, t)
        }
    };

function GI() {
    return new bc(b())
}
var Nh = new Set;

function wr(e) {
    Nh.has(e) || (Nh.add(e), performance ? .mark ? .("mark_feature_usage", {
        detail: {
            feature: e
        }
    }))
}

function Rh(...e) {}

function WI() {
    let e = typeof oe.requestAnimationFrame == "function",
        t = oe[e ? "requestAnimationFrame" : "setTimeout"],
        n = oe[e ? "cancelAnimationFrame" : "clearTimeout"];
    if (typeof Zone < "u" && t && n) {
        let r = t[Zone.__symbol__("OriginalDelegate")];
        r && (t = r);
        let o = n[Zone.__symbol__("OriginalDelegate")];
        o && (n = o)
    }
    return {
        nativeRequestAnimationFrame: t,
        nativeCancelAnimationFrame: n
    }
}
var q = class e {
        constructor({
            enableLongStackTrace: t = !1,
            shouldCoalesceEventChangeDetection: n = !1,
            shouldCoalesceRunChangeDetection: r = !1
        }) {
            if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new ne(!1), this.onMicrotaskEmpty = new ne(!1), this.onStable = new ne(!1), this.onError = new ne(!1), typeof Zone > "u") throw new D(908, !1);
            Zone.assertZonePatched();
            let o = this;
            o._nesting = 0, o._outer = o._inner = Zone.current, Zone.TaskTrackingZoneSpec && (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec)), t && Zone.longStackTraceZoneSpec && (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)), o.shouldCoalesceEventChangeDetection = !r && n, o.shouldCoalesceRunChangeDetection = r, o.lastRequestAnimationFrameId = -1, o.nativeRequestAnimationFrame = WI().nativeRequestAnimationFrame, YI(o)
        }
        static isInAngularZone() {
            return typeof Zone < "u" && Zone.current.get("isAngularZone") === !0
        }
        static assertInAngularZone() {
            if (!e.isInAngularZone()) throw new D(909, !1)
        }
        static assertNotInAngularZone() {
            if (e.isInAngularZone()) throw new D(909, !1)
        }
        run(t, n, r) {
            return this._inner.run(t, n, r)
        }
        runTask(t, n, r, o) {
            let i = this._inner,
                s = i.scheduleEventTask("NgZoneEvent: " + o, t, qI, Rh, Rh);
            try {
                return i.runTask(s, n, r)
            } finally {
                i.cancelTask(s)
            }
        }
        runGuarded(t, n, r) {
            return this._inner.runGuarded(t, n, r)
        }
        runOutsideAngular(t) {
            return this._outer.run(t)
        }
    },
    qI = {};

function Hl(e) {
    if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable) try {
        e._nesting++, e.onMicrotaskEmpty.emit(null)
    } finally {
        if (e._nesting--, !e.hasPendingMicrotasks) try {
            e.runOutsideAngular(() => e.onStable.emit(null))
        } finally {
            e.isStable = !0
        }
    }
}

function ZI(e) {
    e.isCheckStableRunning || e.lastRequestAnimationFrameId !== -1 || (e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(oe, () => {
        e.fakeTopEventTask || (e.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
            e.lastRequestAnimationFrameId = -1, _c(e), e.isCheckStableRunning = !0, Hl(e), e.isCheckStableRunning = !1
        }, void 0, () => {}, () => {})), e.fakeTopEventTask.invoke()
    }), _c(e))
}

function YI(e) {
    let t = () => {
        ZI(e)
    };
    e._inner = e._inner.fork({
        name: "angular",
        properties: {
            isAngularZone: !0
        },
        onInvokeTask: (n, r, o, i, s, a) => {
            if (QI(a)) return n.invokeTask(o, i, s, a);
            try {
                return Oh(e), n.invokeTask(o, i, s, a)
            } finally {
                (e.shouldCoalesceEventChangeDetection && i.type === "eventTask" || e.shouldCoalesceRunChangeDetection) && t(), Fh(e)
            }
        },
        onInvoke: (n, r, o, i, s, a, u) => {
            try {
                return Oh(e), n.invoke(o, i, s, a, u)
            } finally {
                e.shouldCoalesceRunChangeDetection && t(), Fh(e)
            }
        },
        onHasTask: (n, r, o, i) => {
            n.hasTask(o, i), r === o && (i.change == "microTask" ? (e._hasPendingMicrotasks = i.microTask, _c(e), Hl(e)) : i.change == "macroTask" && (e.hasPendingMacrotasks = i.macroTask))
        },
        onHandleError: (n, r, o, i) => (n.handleError(o, i), e.runOutsideAngular(() => e.onError.emit(i)), !1)
    })
}

function _c(e) {
    e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && e.lastRequestAnimationFrameId !== -1 ? e.hasPendingMicrotasks = !0 : e.hasPendingMicrotasks = !1
}

function Oh(e) {
    e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null))
}

function Fh(e) {
    e._nesting--, Hl(e)
}
var Mc = class {
    constructor() {
        this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new ne, this.onMicrotaskEmpty = new ne, this.onStable = new ne, this.onError = new ne
    }
    run(t, n, r) {
        return t.apply(n, r)
    }
    runGuarded(t, n, r) {
        return t.apply(n, r)
    }
    runOutsideAngular(t) {
        return t()
    }
    runTask(t, n, r, o) {
        return t.apply(n, r)
    }
};

function QI(e) {
    return !Array.isArray(e) || e.length !== 1 ? !1 : e[0].data ? .__ignore_ng_zone__ === !0
}

function KI(e = "zone.js", t) {
    return e === "noop" ? new Mc : e === "zone.js" ? new q(t) : e
}
var ar = function(e) {
        return e[e.EarlyRead = 0] = "EarlyRead", e[e.Write = 1] = "Write", e[e.MixedReadWrite = 2] = "MixedReadWrite", e[e.Read = 3] = "Read", e
    }(ar || {}),
    JI = {
        destroy() {}
    };

function zl(e, t) {
    !t && GC(zl);
    let n = t ? .injector ? ? m(Ze);
    if (!FE(n)) return JI;
    wr("NgAfterNextRender");
    let r = n.get(Gl),
        o = r.handler ? ? = new Tc,
        i = t ? .phase ? ? ar.MixedReadWrite,
        s = () => {
            o.unregister(u), a()
        },
        a = n.get(um).onDestroy(s),
        u = new Sc(n, i, () => {
            s(), e()
        });
    return o.register(u), {
        destroy: s
    }
}
var Sc = class {
        constructor(t, n, r) {
            this.phase = n, this.callbackFn = r, this.zone = t.get(q), this.errorHandler = t.get(vt, null, {
                optional: !0
            })
        }
        invoke() {
            try {
                this.zone.runOutsideAngular(this.callbackFn)
            } catch (t) {
                this.errorHandler ? .handleError(t)
            }
        }
    },
    Tc = class {
        constructor() {
            this.executingCallbacks = !1, this.buckets = {
                [ar.EarlyRead]: new Set,
                [ar.Write]: new Set,
                [ar.MixedReadWrite]: new Set,
                [ar.Read]: new Set
            }, this.deferredCallbacks = new Set
        }
        register(t) {
            (this.executingCallbacks ? this.deferredCallbacks : this.buckets[t.phase]).add(t)
        }
        unregister(t) {
            this.buckets[t.phase].delete(t), this.deferredCallbacks.delete(t)
        }
        execute() {
            this.executingCallbacks = !0;
            for (let t of Object.values(this.buckets))
                for (let n of t) n.invoke();
            this.executingCallbacks = !1;
            for (let t of this.deferredCallbacks) this.buckets[t.phase].add(t);
            this.deferredCallbacks.clear()
        }
        destroy() {
            for (let t of Object.values(this.buckets)) t.clear();
            this.deferredCallbacks.clear()
        }
    },
    Gl = (() => {
        class e {
            constructor() {
                this.handler = null, this.internalCallbacks = []
            }
            execute() {
                let n = [...this.internalCallbacks];
                this.internalCallbacks.length = 0;
                for (let r of n) r();
                this.handler ? .execute()
            }
            ngOnDestroy() {
                this.handler ? .destroy(), this.handler = null, this.internalCallbacks.length = 0
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    providedIn: "root",
                    factory: () => new e
                })
            }
        }
        return e
    })();

function ns(e, t, n) {
    let r = n ? e.styles : null,
        o = n ? e.classes : null,
        i = 0;
    if (t !== null)
        for (let s = 0; s < t.length; s++) {
            let a = t[s];
            if (typeof a == "number") i = a;
            else if (i == 1) o = ku(o, a);
            else if (i == 2) {
                let u = a,
                    c = t[++s];
                r = ku(r, u + ": " + c + ";")
            }
        }
    n ? e.styles = r : e.stylesWithoutHost = r, n ? e.classes = o : e.classesWithoutHost = o
}
var rs = class extends js {
    constructor(t) {
        super(), this.ngModule = t
    }
    resolveComponentFactory(t) {
        let n = Ot(t);
        return new Rn(n, this.ngModule)
    }
};

function Ph(e) {
    let t = [];
    for (let n in e) {
        if (!e.hasOwnProperty(n)) continue;
        let r = e[n];
        r !== void 0 && t.push({
            propName: Array.isArray(r) ? r[0] : r,
            templateName: n
        })
    }
    return t
}

function XI(e) {
    let t = e.toLowerCase();
    return t === "svg" ? fp : t === "math" ? jw : null
}
var Ac = class {
        constructor(t, n) {
            this.injector = t, this.parentInjector = n
        }
        get(t, n, r) {
            r = Is(r);
            let o = this.injector.get(t, Su, r);
            return o !== Su || n === Su ? o : this.parentInjector.get(t, n, r)
        }
    },
    Rn = class extends es {
        get inputs() {
            let t = this.componentDef,
                n = t.inputTransforms,
                r = Ph(t.inputs);
            if (n !== null)
                for (let o of r) n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
            return r
        }
        get outputs() {
            return Ph(this.componentDef.outputs)
        }
        constructor(t, n) {
            super(), this.componentDef = t, this.ngModule = n, this.componentType = t.type, this.selector = Ow(t.selectors), this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [], this.isBoundToModule = !!n
        }
        create(t, n, r, o) {
            o = o || this.ngModule;
            let i = o instanceof Te ? o : o ? .injector;
            i && this.componentDef.getStandaloneInjector !== null && (i = this.componentDef.getStandaloneInjector(i) || i);
            let s = i ? new Ac(t, i) : t,
                a = s.get(co, null);
            if (a === null) throw new D(407, !1);
            let u = s.get(jI, null),
                c = s.get(Gl, null),
                l = s.get(pc, null),
                d = {
                    rendererFactory: a,
                    sanitizer: u,
                    inlineEffectRunner: null,
                    afterRenderEventManager: c,
                    changeDetectionScheduler: l
                },
                f = a.createRenderer(null, this.componentDef),
                h = this.componentDef.selectors[0][0] || "div",
                p = r ? KE(f, r, this.componentDef.encapsulation, s) : Sl(f, h, XI(h)),
                g = 512;
            this.componentDef.signals ? g |= 4096 : this.componentDef.onPush || (g |= 16);
            let v = null;
            p !== null && (v = yl(p, s, !0));
            let w = Ol(0, null, null, 1, 0, null, null, null, null, null, null),
                V = Fs(null, w, null, g, null, null, d, f, s, null, v);
            ll(V);
            let U, J;
            try {
                let ee = this.componentDef,
                    be, Wn = null;
                ee.findHostDirectiveDefs ? (be = [], Wn = new Map, ee.findHostDirectiveDefs(ee, be, Wn), be.push(ee)) : be = [ee];
                let yD = eb(V, p),
                    DD = tb(yD, p, ee, be, V, d, f);
                J = rl(w, ie), p && ob(f, ee, p, r), n !== void 0 && ib(J, this.ngContentSelectors, n), U = rb(DD, ee, be, Wn, V, [sb]), Ll(w, V, null)
            } finally {
                dl()
            }
            return new xc(this.componentType, U, yr(J, V), V, J)
        }
    },
    xc = class extends gc {
        constructor(t, n, r, o, i) {
            super(), this.location = r, this._rootLView = o, this._tNode = i, this.previousInputValues = null, this.instance = n, this.hostView = this.changeDetectorRef = new Nn(o, void 0, !1), this.componentType = t
        }
        setInput(t, n) {
            let r = this._tNode.inputs,
                o;
            if (r !== null && (o = r[t])) {
                if (this.previousInputValues ? ? = new Map, this.previousInputValues.has(t) && Object.is(this.previousInputValues.get(t), n)) return;
                let i = this._rootLView;
                kl(i[N], i, o, t, n), this.previousInputValues.set(t, n);
                let s = on(this._tNode.index, i);
                Vl(s)
            }
        }
        get injector() {
            return new En(this._tNode, this._rootLView)
        }
        destroy() {
            this.hostView.destroy()
        }
        onDestroy(t) {
            this.hostView.onDestroy(t)
        }
    };

function eb(e, t) {
    let n = e[N],
        r = ie;
    return e[r] = t, Dr(n, r, 2, "#host", null)
}

function tb(e, t, n, r, o, i, s) {
    let a = o[N];
    nb(r, e, t, s);
    let u = null;
    t !== null && (u = yl(t, o[dr]));
    let c = i.rendererFactory.createRenderer(t, n),
        l = 16;
    n.signals ? l = 4096 : n.onPush && (l = 64);
    let d = Fs(o, Ug(n), null, l, o[e.index], e, i, c, null, null, u);
    return a.firstCreatePass && dc(a, e, r.length - 1), Ps(o, d), o[e.index] = d
}

function nb(e, t, n, r) {
    for (let o of e) t.mergedAttrs = Jr(t.mergedAttrs, o.hostAttrs);
    t.mergedAttrs !== null && (ns(t, t.mergedAttrs, !0), n !== null && Pg(r, n, t))
}

function rb(e, t, n, r, o, i) {
    let s = Ee(),
        a = o[N],
        u = We(s, o);
    $g(a, o, s, n, null, r);
    for (let l = 0; l < n.length; l++) {
        let d = s.directiveStart + l,
            f = An(o, a, d, s);
        yt(f, o)
    }
    Bg(a, o, s), u && yt(u, o);
    let c = An(o, a, s.directiveStart + s.componentOffset, s);
    if (e[me] = o[me] = c, i !== null)
        for (let l of i) l(c, t);
    return xl(a, s, e), c
}

function ob(e, t, n, r) {
    if (r) Lu(e, n, ["ng-version", "17.2.1"]);
    else {
        let {
            attrs: o,
            classes: i
        } = Fw(t.selectors[0]);
        o && Lu(e, n, o), i && i.length > 0 && Fg(e, n, i.join(" "))
    }
}

function ib(e, t, n) {
    let r = e.projection = [];
    for (let o = 0; o < t.length; o++) {
        let i = n[o];
        r.push(i != null ? Array.from(i) : null)
    }
}

function sb() {
    let e = Ee();
    Ts(b()[N], e)
}
var st = (() => {
    class e {
        static {
            this.__NG_ELEMENT_ID__ = ab
        }
    }
    return e
})();

function ab() {
    let e = Ee();
    return lm(e, b())
}
var ub = st,
    cm = class extends ub {
        constructor(t, n, r) {
            super(), this._lContainer = t, this._hostTNode = n, this._hostLView = r
        }
        get element() {
            return yr(this._hostTNode, this._hostLView)
        }
        get injector() {
            return new En(this._hostTNode, this._hostLView)
        }
        get parentInjector() {
            let t = Cl(this._hostTNode, this._hostLView);
            if (Zp(t)) {
                let n = Qi(t, this._hostLView),
                    r = Yi(t),
                    o = n[N].data[r + 8];
                return new En(o, n)
            } else return new En(null, this._hostLView)
        }
        clear() {
            for (; this.length > 0;) this.remove(this.length - 1)
        }
        get(t) {
            let n = kh(this._lContainer);
            return n !== null && n[t] || null
        }
        get length() {
            return this._lContainer.length - Ce
        }
        createEmbeddedView(t, n, r) {
            let o, i;
            typeof r == "number" ? o = r : r != null && (o = r.index, i = r.injector);
            let s = uo(this._lContainer, t.ssrId),
                a = t.createEmbeddedViewImpl(n || {}, i, s);
            return this.insertImpl(a, o, ao(this._hostTNode, s)), a
        }
        createComponent(t, n, r, o, i) {
            let s = t && !qC(t),
                a;
            if (s) a = n;
            else {
                let p = n || {};
                a = p.index, r = p.injector, o = p.projectableNodes, i = p.environmentInjector || p.ngModuleRef
            }
            let u = s ? t : new Rn(Ot(t)),
                c = r || this.parentInjector;
            if (!i && u.ngModule == null) {
                let g = (s ? c : this.parentInjector).get(Te, null);
                g && (i = g)
            }
            let l = Ot(u.componentType ? ? {}),
                d = uo(this._lContainer, l ? .id ? ? null),
                f = d ? .firstChild ? ? null,
                h = u.create(c, o, f, i);
            return this.insertImpl(h.hostView, a, ao(this._hostTNode, d)), h
        }
        insert(t, n) {
            return this.insertImpl(t, n, !0)
        }
        insertImpl(t, n, r) {
            let o = t._lView;
            if (zw(o)) {
                let a = this.indexOf(t);
                if (a !== -1) this.detach(a);
                else {
                    let u = o[ve],
                        c = new cm(u, u[ke], u[ve]);
                    c.detach(c.indexOf(t))
                }
            }
            let i = this._adjustIndex(n),
                s = this._lContainer;
            return Ls(s, o, i, r), t.attachToViewContainerRef(), Sp(Tu(s), i, t), t
        }
        move(t, n) {
            return this.insert(t, n)
        }
        indexOf(t) {
            let n = kh(this._lContainer);
            return n !== null ? n.indexOf(t) : -1
        }
        remove(t) {
            let n = this._adjustIndex(t, -1),
                r = so(this._lContainer, n);
            r && (Wi(Tu(this._lContainer), n), xs(r[N], r))
        }
        detach(t) {
            let n = this._adjustIndex(t, -1),
                r = so(this._lContainer, n);
            return r && Wi(Tu(this._lContainer), n) != null ? new Nn(r) : null
        }
        _adjustIndex(t, n = 0) {
            return t ? ? this.length + n
        }
    };

function kh(e) {
    return e[Gi]
}

function Tu(e) {
    return e[Gi] || (e[Gi] = [])
}

function lm(e, t) {
    let n, r = t[e.index];
    return jt(r) ? n = r : (n = zg(r, t, null, e), t[e.index] = n, Ps(t, n)), lb(n, t, e, r), new cm(n, e, t)
}

function cb(e, t) {
    let n = e[j],
        r = n.createComment(""),
        o = We(t, e),
        i = Ns(n, o);
    return xn(n, i, r, zE(n, o), !1), r
}
var lb = hb,
    db = () => !1;

function fb(e, t, n) {
    return db(e, t, n)
}

function hb(e, t, n, r) {
    if (e[bn]) return;
    let o;
    n.type & 8 ? o = Ge(r) : o = cb(t, n), e[bn] = o
}
var Nc = class e {
        constructor(t) {
            this.queryList = t, this.matches = null
        }
        clone() {
            return new e(this.queryList)
        }
        setDirty() {
            this.queryList.setDirty()
        }
    },
    Rc = class e {
        constructor(t = []) {
            this.queries = t
        }
        createEmbeddedView(t) {
            let n = t.queries;
            if (n !== null) {
                let r = t.contentQueries !== null ? t.contentQueries[0] : n.length,
                    o = [];
                for (let i = 0; i < r; i++) {
                    let s = n.getByIndex(i),
                        a = this.queries[s.indexInDeclarationView];
                    o.push(a.clone())
                }
                return new e(o)
            }
            return null
        }
        insertView(t) {
            this.dirtyQueriesWithMatches(t)
        }
        detachView(t) {
            this.dirtyQueriesWithMatches(t)
        }
        finishViewCreation(t) {
            this.dirtyQueriesWithMatches(t)
        }
        dirtyQueriesWithMatches(t) {
            for (let n = 0; n < this.queries.length; n++) Wl(t, n).matches !== null && this.queries[n].setDirty()
        }
    },
    os = class {
        constructor(t, n, r = null) {
            this.flags = n, this.read = r, typeof t == "string" ? this.predicate = Cb(t) : this.predicate = t
        }
    },
    Oc = class e {
        constructor(t = []) {
            this.queries = t
        }
        elementStart(t, n) {
            for (let r = 0; r < this.queries.length; r++) this.queries[r].elementStart(t, n)
        }
        elementEnd(t) {
            for (let n = 0; n < this.queries.length; n++) this.queries[n].elementEnd(t)
        }
        embeddedTView(t) {
            let n = null;
            for (let r = 0; r < this.length; r++) {
                let o = n !== null ? n.length : 0,
                    i = this.getByIndex(r).embeddedTView(t, o);
                i && (i.indexInDeclarationView = r, n !== null ? n.push(i) : n = [i])
            }
            return n !== null ? new e(n) : null
        }
        template(t, n) {
            for (let r = 0; r < this.queries.length; r++) this.queries[r].template(t, n)
        }
        getByIndex(t) {
            return this.queries[t]
        }
        get length() {
            return this.queries.length
        }
        track(t) {
            this.queries.push(t)
        }
    },
    Fc = class e {
        constructor(t, n = -1) {
            this.metadata = t, this.matches = null, this.indexInDeclarationView = -1, this.crossesNgTemplate = !1, this._appliesToNextNode = !0, this._declarationNodeIndex = n
        }
        elementStart(t, n) {
            this.isApplyingToNode(n) && this.matchTNode(t, n)
        }
        elementEnd(t) {
            this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1)
        }
        template(t, n) {
            this.elementStart(t, n)
        }
        embeddedTView(t, n) {
            return this.isApplyingToNode(t) ? (this.crossesNgTemplate = !0, this.addMatch(-t.index, n), new e(this.metadata)) : null
        }
        isApplyingToNode(t) {
            if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
                let n = this._declarationNodeIndex,
                    r = t.parent;
                for (; r !== null && r.type & 8 && r.index !== n;) r = r.parent;
                return n === (r !== null ? r.index : -1)
            }
            return this._appliesToNextNode
        }
        matchTNode(t, n) {
            let r = this.metadata.predicate;
            if (Array.isArray(r))
                for (let o = 0; o < r.length; o++) {
                    let i = r[o];
                    this.matchTNodeWithReadOption(t, n, pb(n, i)), this.matchTNodeWithReadOption(t, n, ji(n, t, i, !1, !1))
                } else r === Vt ? n.type & 4 && this.matchTNodeWithReadOption(t, n, -1) : this.matchTNodeWithReadOption(t, n, ji(n, t, r, !1, !1))
        }
        matchTNodeWithReadOption(t, n, r) {
            if (r !== null) {
                let o = this.metadata.read;
                if (o !== null)
                    if (o === xe || o === st || o === Vt && n.type & 4) this.addMatch(n.index, -2);
                    else {
                        let i = ji(n, t, o, !1, !1);
                        i !== null && this.addMatch(n.index, i)
                    }
                else this.addMatch(n.index, r)
            }
        }
        addMatch(t, n) {
            this.matches === null ? this.matches = [t, n] : this.matches.push(t, n)
        }
    };

function pb(e, t) {
    let n = e.localNames;
    if (n !== null) {
        for (let r = 0; r < n.length; r += 2)
            if (n[r] === t) return n[r + 1]
    }
    return null
}

function gb(e, t) {
    return e.type & 11 ? yr(e, t) : e.type & 4 ? Vs(e, t) : null
}

function mb(e, t, n, r) {
    return n === -1 ? gb(t, e) : n === -2 ? vb(e, t, r) : An(e, e[N], n, t)
}

function vb(e, t, n) {
    if (n === xe) return yr(t, e);
    if (n === Vt) return Vs(t, e);
    if (n === st) return lm(t, e)
}

function dm(e, t, n, r) {
    let o = t[Pt].queries[r];
    if (o.matches === null) {
        let i = e.data,
            s = n.matches,
            a = [];
        for (let u = 0; s !== null && u < s.length; u += 2) {
            let c = s[u];
            if (c < 0) a.push(null);
            else {
                let l = i[c];
                a.push(mb(t, l, s[u + 1], n.metadata.read))
            }
        }
        o.matches = a
    }
    return o.matches
}

function Pc(e, t, n, r) {
    let o = e.queries.getByIndex(n),
        i = o.matches;
    if (i !== null) {
        let s = dm(e, t, o, n);
        for (let a = 0; a < i.length; a += 2) {
            let u = i[a];
            if (u > 0) r.push(s[a / 2]);
            else {
                let c = i[a + 1],
                    l = t[-u];
                for (let d = Ce; d < l.length; d++) {
                    let f = l[d];
                    f[mo] === f[ve] && Pc(f[N], f, c, r)
                }
                if (l[fr] !== null) {
                    let d = l[fr];
                    for (let f = 0; f < d.length; f++) {
                        let h = d[f];
                        Pc(h[N], h, c, r)
                    }
                }
            }
        }
    }
    return r
}

function yb(e, t) {
    return e[Pt].queries[t].queryList
}

function fm(e, t, n) {
    let r = new Uu((n & 4) === 4);
    return eI(e, t, r, r.destroy), (t[Pt] ? ? = new Rc).queries.push(new Nc(r)) - 1
}

function Db(e, t, n) {
    let r = G();
    return r.firstCreatePass && (hm(r, new os(e, t, n), -1), (t & 2) === 2 && (r.staticViewQueries = !0)), fm(r, b(), t)
}

function wb(e, t, n, r) {
    let o = G();
    if (o.firstCreatePass) {
        let i = Ee();
        hm(o, new os(t, n, r), i.index), Eb(o, e), (n & 2) === 2 && (o.staticContentQueries = !0)
    }
    return fm(o, b(), n)
}

function Cb(e) {
    return e.split(",").map(t => t.trim())
}

function hm(e, t, n) {
    e.queries === null && (e.queries = new Oc), e.queries.track(new Fc(t, n))
}

function Eb(e, t) {
    let n = e.contentQueries || (e.contentQueries = []),
        r = n.length ? n[n.length - 1] : -1;
    t !== r && n.push(e.queries.length - 1, t)
}

function Wl(e, t) {
    return e.queries.getByIndex(t)
}

function Ib(e, t) {
    let n = e[N],
        r = Wl(n, t);
    return r.crossesNgTemplate ? Pc(n, e, t, []) : dm(n, e, r, t)
}

function bb(e) {
    let t = [],
        n = new Map;

    function r(o) {
        let i = n.get(o);
        if (!i) {
            let s = e(o);
            n.set(o, i = s.then(Tb))
        }
        return i
    }
    return is.forEach((o, i) => {
        let s = [];
        o.templateUrl && s.push(r(o.templateUrl).then(c => {
            o.template = c
        }));
        let a = typeof o.styles == "string" ? [o.styles] : o.styles || [];
        if (o.styles = a, o.styleUrl && o.styleUrls ? .length) throw new Error("@Component cannot define both `styleUrl` and `styleUrls`. Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple");
        if (o.styleUrls ? .length) {
            let c = o.styles.length,
                l = o.styleUrls;
            o.styleUrls.forEach((d, f) => {
                a.push(""), s.push(r(d).then(h => {
                    a[c + f] = h, l.splice(l.indexOf(d), 1), l.length == 0 && (o.styleUrls = void 0)
                }))
            })
        } else o.styleUrl && s.push(r(o.styleUrl).then(c => {
            a.push(c), o.styleUrl = void 0
        }));
        let u = Promise.all(s).then(() => Ab(i));
        t.push(u)
    }), Mb(), Promise.all(t).then(() => {})
}
var is = new Map,
    _b = new Set;

function Mb() {
    let e = is;
    return is = new Map, e
}

function Sb() {
    return is.size === 0
}

function Tb(e) {
    return typeof e == "string" ? e : e.text()
}

function Ab(e) {
    _b.delete(e)
}

function xb(e) {
    return Object.getPrototypeOf(e.prototype).constructor
}

function Le(e) {
    let t = xb(e.type),
        n = !0,
        r = [e];
    for (; t;) {
        let o;
        if (kt(e)) o = t.\u0275cmp || t.\u0275dir;
        else {
            if (t.\u0275cmp) throw new D(903, !1);
            o = t.\u0275dir
        }
        if (o) {
            if (n) {
                r.push(o);
                let s = e;
                s.inputs = Oi(e.inputs), s.inputTransforms = Oi(e.inputTransforms), s.declaredInputs = Oi(e.declaredInputs), s.outputs = Oi(e.outputs);
                let a = o.hostBindings;
                a && Pb(e, a);
                let u = o.viewQuery,
                    c = o.contentQueries;
                if (u && Ob(e, u), c && Fb(e, c), Nb(e, o), yw(e.outputs, o.outputs), kt(o) && o.data.animation) {
                    let l = e.data;
                    l.animation = (l.animation || []).concat(o.data.animation)
                }
            }
            let i = o.features;
            if (i)
                for (let s = 0; s < i.length; s++) {
                    let a = i[s];
                    a && a.ngInherit && a(e), a === Le && (n = !1)
                }
        }
        t = Object.getPrototypeOf(t)
    }
    Rb(r)
}

function Nb(e, t) {
    for (let n in t.inputs) {
        if (!t.inputs.hasOwnProperty(n) || e.inputs.hasOwnProperty(n)) continue;
        let r = t.inputs[n];
        if (r !== void 0 && (e.inputs[n] = r, e.declaredInputs[n] = t.declaredInputs[n], t.inputTransforms !== null)) {
            let o = Array.isArray(r) ? r[0] : r;
            if (!t.inputTransforms.hasOwnProperty(o)) continue;
            e.inputTransforms ? ? = {}, e.inputTransforms[o] = t.inputTransforms[o]
        }
    }
}

function Rb(e) {
    let t = 0,
        n = null;
    for (let r = e.length - 1; r >= 0; r--) {
        let o = e[r];
        o.hostVars = t += o.hostVars, o.hostAttrs = Jr(o.hostAttrs, n = Jr(n, o.hostAttrs))
    }
}

function Oi(e) {
    return e === Rt ? {} : e === _e ? [] : e
}

function Ob(e, t) {
    let n = e.viewQuery;
    n ? e.viewQuery = (r, o) => {
        t(r, o), n(r, o)
    } : e.viewQuery = t
}

function Fb(e, t) {
    let n = e.contentQueries;
    n ? e.contentQueries = (r, o, i) => {
        t(r, o, i), n(r, o, i)
    } : e.contentQueries = t
}

function Pb(e, t) {
    let n = e.hostBindings;
    n ? e.hostBindings = (r, o) => {
        t(r, o), n(r, o)
    } : e.hostBindings = t
}

function sV(e) {
    let t = n => {
        let r = (Array.isArray(e) ? e : e()).map(o => typeof o == "function" ? {
            directive: ge(o),
            inputs: Rt,
            outputs: Rt
        } : {
            directive: ge(o.directive),
            inputs: Lh(o.inputs),
            outputs: Lh(o.outputs)
        });
        n.hostDirectives === null ? (n.findHostDirectiveDefs = pm, n.hostDirectives = r) : n.hostDirectives.unshift(...r)
    };
    return t.ngInherit = !0, t
}

function pm(e, t, n) {
    if (e.hostDirectives !== null)
        for (let r of e.hostDirectives) {
            let o = Xc(r.directive);
            kb(o.declaredInputs, r.inputs), pm(o, t, n), n.set(o, r), t.push(o)
        }
}

function Lh(e) {
    if (e === void 0 || e.length === 0) return Rt;
    let t = {};
    for (let n = 0; n < e.length; n += 2) t[e[n]] = e[n + 1];
    return t
}

function kb(e, t) {
    for (let n in t)
        if (t.hasOwnProperty(n)) {
            let r = t[n],
                o = e[n];
            e[r] = o
        }
}

function gm(e) {
    let t = e.inputConfig,
        n = {};
    for (let r in t)
        if (t.hasOwnProperty(r)) {
            let o = t[r];
            Array.isArray(o) && o[3] && (n[r] = o[3])
        }
    e.inputTransforms = n
}
var rn = class {},
    lo = class {};
var ss = class extends rn {
        constructor(t, n, r) {
            super(), this._parent = n, this._bootstrapComponents = [], this.destroyCbs = [], this.componentFactoryResolver = new rs(this);
            let o = up(t);
            this._bootstrapComponents = Dg(o.bootstrap), this._r3Injector = og(t, n, [{
                provide: rn,
                useValue: this
            }, {
                provide: js,
                useValue: this.componentFactoryResolver
            }, ...r], Me(t), new Set(["environment"])), this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(t)
        }
        get injector() {
            return this._r3Injector
        }
        destroy() {
            let t = this._r3Injector;
            !t.destroyed && t.destroy(), this.destroyCbs.forEach(n => n()), this.destroyCbs = null
        }
        onDestroy(t) {
            this.destroyCbs.push(t)
        }
    },
    as = class extends lo {
        constructor(t) {
            super(), this.moduleType = t
        }
        create(t) {
            return new ss(this.moduleType, t, [])
        }
    };

function Lb(e, t, n) {
    return new ss(e, t, n)
}
var kc = class extends rn {
    constructor(t) {
        super(), this.componentFactoryResolver = new rs(this), this.instance = null;
        let n = new io([...t.providers, {
            provide: rn,
            useValue: this
        }, {
            provide: js,
            useValue: this.componentFactoryResolver
        }], t.parent || Ss(), t.debugName, new Set(["environment"]));
        this.injector = n, t.runEnvironmentInitializers && n.resolveInjectorInitializers()
    }
    destroy() {
        this.injector.destroy()
    }
    onDestroy(t) {
        this.injector.onDestroy(t)
    }
};

function Us(e, t, n = null) {
    return new kc({
        providers: e,
        parent: t,
        debugName: n,
        runEnvironmentInitializers: !0
    }).injector
}
var Ln = (() => {
    class e {
        constructor() {
            this.taskId = 0, this.pendingTasks = new Set, this.hasPendingTasks = new pe(!1)
        }
        get _hasPendingTasks() {
            return this.hasPendingTasks.value
        }
        add() {
            this._hasPendingTasks || this.hasPendingTasks.next(!0);
            let n = this.taskId++;
            return this.pendingTasks.add(n), n
        }
        remove(n) {
            this.pendingTasks.delete(n), this.pendingTasks.size === 0 && this._hasPendingTasks && this.hasPendingTasks.next(!1)
        }
        ngOnDestroy() {
            this.pendingTasks.clear(), this._hasPendingTasks && this.hasPendingTasks.next(!1)
        }
        static {
            this.\u0275fac = function(r) {
                return new(r || e)
            }
        }
        static {
            this.\u0275prov = E({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
    }
    return e
})();

function Cr(e, t, n) {
    return e[t] = n
}

function mm(e, t) {
    return e[t]
}

function Ae(e, t, n) {
    let r = e[t];
    return Object.is(r, n) ? !1 : (e[t] = n, !0)
}

function fo(e, t, n, r) {
    let o = Ae(e, t, n);
    return Ae(e, t + 1, r) || o
}

function vm(e, t, n, r, o) {
    let i = fo(e, t, n, r);
    return Ae(e, t + 2, o) || i
}

function Lc(e, t, n, r, o, i) {
    let s = fo(e, t, n, r);
    return fo(e, t + 2, o, i) || s
}

function Vb(e, t, n, r, o, i, s, a, u) {
    let c = t.consts,
        l = Dr(t, e, 4, s || null, _n(c, a));
    Fl(t, n, l, _n(c, u)), Ts(t, l);
    let d = l.tView = Ol(2, l, r, o, i, t.directiveRegistry, t.pipeRegistry, null, t.schemas, c, null);
    return t.queries !== null && (t.queries.template(t, l), d.queries = t.queries.embeddedTView(l)), l
}

function Vc(e, t, n, r, o, i, s, a) {
    let u = b(),
        c = G(),
        l = e + ie,
        d = c.firstCreatePass ? Vb(l, c, u, t, n, r, o, i, s) : c.data[l];
    mt(d, !1);
    let f = jb(c, u, d, e);
    Ds() && Rs(c, u, f, d), yt(f, u);
    let h = zg(f, u, f, d);
    return u[l] = h, Ps(u, h), fb(h, d, u), gs(d) && Nl(c, u, d), s != null && Rl(u, d, a), Vc
}
var jb = Ub;

function Ub(e, t, n, r) {
    return ws(!0), t[j].createComment("")
}

function ql(e, t, n, r) {
    let o = b(),
        i = $t();
    if (Ae(o, i, t)) {
        let s = G(),
            a = Bt();
        Hg(a, o, e, t, n, r)
    }
    return ql
}

function Zl(e, t, n, r) {
    return Ae(e, $t(), n) ? t + rt(n) + r : Ie
}

function Yl(e, t, n, r, o, i) {
    let s = ul(),
        a = fo(e, s, n, o);
    return ys(2), a ? t + rt(n) + r + rt(o) + i : Ie
}

function ym(e, t, n, r, o, i, s, a) {
    let u = ul(),
        c = vm(e, u, n, o, s);
    return ys(3), c ? t + rt(n) + r + rt(o) + i + rt(s) + a : Ie
}

function $b(e, t, n, r, o, i, s, a) {
    let u = b(),
        c = Yl(u, t, n, r, o, i);
    if (c !== Ie) {
        let l = Bt();
        Hg(l, u, e, c, s, a)
    }
    return $b
}

function Fi(e, t) {
    return e << 17 | t << 2
}

function On(e) {
    return e >> 17 & 32767
}

function Bb(e) {
    return (e & 2) == 2
}

function Hb(e, t) {
    return e & 131071 | t << 17
}

function jc(e) {
    return e | 2
}

function gr(e) {
    return (e & 131068) >> 2
}

function Au(e, t) {
    return e & -131069 | t << 2
}

function zb(e) {
    return (e & 1) === 1
}

function Uc(e) {
    return e | 1
}

function Gb(e, t, n, r, o, i) {
    let s = i ? t.classBindings : t.styleBindings,
        a = On(s),
        u = gr(s);
    e[r] = n;
    let c = !1,
        l;
    if (Array.isArray(n)) {
        let d = n;
        l = d[1], (l === null || vo(d, l) > 0) && (c = !0)
    } else l = n;
    if (o)
        if (u !== 0) {
            let f = On(e[a + 1]);
            e[r + 1] = Fi(f, a), f !== 0 && (e[f + 1] = Au(e[f + 1], r)), e[a + 1] = Hb(e[a + 1], r)
        } else e[r + 1] = Fi(a, 0), a !== 0 && (e[a + 1] = Au(e[a + 1], r)), a = r;
    else e[r + 1] = Fi(u, 0), a === 0 ? a = r : e[u + 1] = Au(e[u + 1], r), u = r;
    c && (e[r + 1] = jc(e[r + 1])), Vh(e, l, r, !0), Vh(e, l, r, !1), Wb(t, l, e, r, i), s = Fi(a, u), i ? t.classBindings = s : t.styleBindings = s
}

function Wb(e, t, n, r, o) {
    let i = o ? e.residualClasses : e.residualStyles;
    i != null && typeof t == "string" && vo(i, t) >= 0 && (n[r + 1] = Uc(n[r + 1]))
}

function Vh(e, t, n, r) {
    let o = e[n + 1],
        i = t === null,
        s = r ? On(o) : gr(o),
        a = !1;
    for (; s !== 0 && (a === !1 || i);) {
        let u = e[s],
            c = e[s + 1];
        qb(u, t) && (a = !0, e[s + 1] = r ? Uc(c) : jc(c)), s = r ? On(c) : gr(c)
    }
    a && (e[n + 1] = r ? jc(o) : Uc(o))
}

function qb(e, t) {
    return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t ? !0 : Array.isArray(e) && typeof t == "string" ? vo(e, t) >= 0 : !1
}
var ce = {
    textEnd: 0,
    key: 0,
    keyEnd: 0,
    value: 0,
    valueEnd: 0
};

function Dm(e) {
    return e.substring(ce.key, ce.keyEnd)
}

function Zb(e) {
    return e.substring(ce.value, ce.valueEnd)
}

function Yb(e) {
    return Em(e), wm(e, mr(e, 0, ce.textEnd))
}

function wm(e, t) {
    let n = ce.textEnd;
    return n === t ? -1 : (t = ce.keyEnd = Kb(e, ce.key = t, n), mr(e, t, n))
}

function Qb(e) {
    return Em(e), Cm(e, mr(e, 0, ce.textEnd))
}

function Cm(e, t) {
    let n = ce.textEnd,
        r = ce.key = mr(e, t, n);
    return n === r ? -1 : (r = ce.keyEnd = Jb(e, r, n), r = jh(e, r, n, 58), r = ce.value = mr(e, r, n), r = ce.valueEnd = Xb(e, r, n), jh(e, r, n, 59))
}

function Em(e) {
    ce.key = 0, ce.keyEnd = 0, ce.value = 0, ce.valueEnd = 0, ce.textEnd = e.length
}

function mr(e, t, n) {
    for (; t < n && e.charCodeAt(t) <= 32;) t++;
    return t
}

function Kb(e, t, n) {
    for (; t < n && e.charCodeAt(t) > 32;) t++;
    return t
}

function Jb(e, t, n) {
    let r;
    for (; t < n && ((r = e.charCodeAt(t)) === 45 || r === 95 || (r & -33) >= 65 && (r & -33) <= 90 || r >= 48 && r <= 57);) t++;
    return t
}

function jh(e, t, n, r) {
    return t = mr(e, t, n), t < n && t++, t
}

function Xb(e, t, n) {
    let r = -1,
        o = -1,
        i = -1,
        s = t,
        a = s;
    for (; s < n;) {
        let u = e.charCodeAt(s++);
        if (u === 59) return a;
        u === 34 || u === 39 ? a = s = Uh(e, u, s, n) : t === s - 4 && i === 85 && o === 82 && r === 76 && u === 40 ? a = s = Uh(e, 41, s, n) : u > 32 && (a = s), i = o, o = r, r = u & -33
    }
    return a
}

function Uh(e, t, n, r) {
    let o = -1,
        i = n;
    for (; i < r;) {
        let s = e.charCodeAt(i++);
        if (s == t && o !== 92) return i;
        s == 92 && o === 92 ? o = 0 : o = s
    }
    throw new Error
}

function e_(e, t, n) {
    let r = b(),
        o = $t();
    if (Ae(r, o, t)) {
        let i = G(),
            s = Bt();
        un(i, s, r, e, t, r[j], n, !1)
    }
    return e_
}

function $c(e, t, n, r, o) {
    let i = t.inputs,
        s = o ? "class" : "style";
    kl(e, n, i[s], s, r)
}

function Im(e, t, n) {
    return bm(e, t, n, !1), Im
}

function $s(e, t) {
    return bm(e, t, null, !0), $s
}

function aV(e) {
    Eo(Sm, t_, e, !1)
}

function t_(e, t) {
    for (let n = Qb(t); n >= 0; n = Cm(t, n)) Sm(e, Dm(t), Zb(t))
}

function uV(e) {
    Eo(a_, Bs, e, !0)
}

function Bs(e, t) {
    for (let n = Yb(t); n >= 0; n = wm(t, n)) Pn(e, Dm(t), !0)
}

function bm(e, t, n, r) {
    let o = b(),
        i = G(),
        s = ys(2);
    if (i.firstUpdatePass && Mm(i, e, s, r), t !== Ie && Ae(o, s, t)) {
        let a = i.data[sn()];
        Tm(i, a, o, o[j], e, o[s + 1] = c_(t, n), r, s)
    }
}

function Eo(e, t, n, r) {
    let o = G(),
        i = ys(2);
    o.firstUpdatePass && Mm(o, null, i, r);
    let s = b();
    if (n !== Ie && Ae(s, i, n)) {
        let a = o.data[sn()];
        if (Am(a, r) && !_m(o, i)) {
            let u = r ? a.classesWithoutHost : a.stylesWithoutHost;
            u !== null && (n = ku(u, n || "")), $c(o, a, s, n, r)
        } else u_(o, a, s, s[j], s[i + 1], s[i + 1] = s_(e, t, n), r, i)
    }
}

function _m(e, t) {
    return t >= e.expandoStartIndex
}

function Mm(e, t, n, r) {
    let o = e.data;
    if (o[n + 1] === null) {
        let i = o[sn()],
            s = _m(e, n);
        Am(i, r) && t === null && !s && (t = !1), t = n_(o, i, t, r), Gb(o, i, t, n, s, r)
    }
}

function n_(e, t, n, r) {
    let o = Dp(e),
        i = r ? t.residualClasses : t.residualStyles;
    if (o === null)(r ? t.classBindings : t.styleBindings) === 0 && (n = xu(null, e, t, n, r), n = ho(n, t.attrs, r), i = null);
    else {
        let s = t.directiveStylingLast;
        if (s === -1 || e[s] !== o)
            if (n = xu(o, e, t, n, r), i === null) {
                let u = r_(e, t, r);
                u !== void 0 && Array.isArray(u) && (u = xu(null, e, t, u[1], r), u = ho(u, t.attrs, r), o_(e, t, r, u))
            } else i = i_(e, t, r)
    }
    return i !== void 0 && (r ? t.residualClasses = i : t.residualStyles = i), n
}

function r_(e, t, n) {
    let r = n ? t.classBindings : t.styleBindings;
    if (gr(r) !== 0) return e[On(r)]
}

function o_(e, t, n, r) {
    let o = n ? t.classBindings : t.styleBindings;
    e[On(o)] = r
}

function i_(e, t, n) {
    let r, o = t.directiveEnd;
    for (let i = 1 + t.directiveStylingLast; i < o; i++) {
        let s = e[i].hostAttrs;
        r = ho(r, s, n)
    }
    return ho(r, t.attrs, n)
}

function xu(e, t, n, r, o) {
    let i = null,
        s = n.directiveEnd,
        a = n.directiveStylingLast;
    for (a === -1 ? a = n.directiveStart : a++; a < s && (i = t[a], r = ho(r, i.hostAttrs, o), i !== e);) a++;
    return e !== null && (n.directiveStylingLast = a), r
}

function ho(e, t, n) {
    let r = n ? 1 : 2,
        o = -1;
    if (t !== null)
        for (let i = 0; i < t.length; i++) {
            let s = t[i];
            typeof s == "number" ? o = s : o === r && (Array.isArray(e) || (e = e === void 0 ? [] : ["", e]), Pn(e, s, n ? !0 : t[++i]))
        }
    return e === void 0 ? null : e
}

function s_(e, t, n) {
    if (n == null || n === "") return _e;
    let r = [],
        o = $e(n);
    if (Array.isArray(o))
        for (let i = 0; i < o.length; i++) e(r, o[i], !0);
    else if (typeof o == "object")
        for (let i in o) o.hasOwnProperty(i) && e(r, i, o[i]);
    else typeof o == "string" && t(r, o);
    return r
}

function Sm(e, t, n) {
    Pn(e, t, $e(n))
}

function a_(e, t, n) {
    let r = String(t);
    r !== "" && !r.includes(" ") && Pn(e, r, n)
}

function u_(e, t, n, r, o, i, s, a) {
    o === Ie && (o = _e);
    let u = 0,
        c = 0,
        l = 0 < o.length ? o[0] : null,
        d = 0 < i.length ? i[0] : null;
    for (; l !== null || d !== null;) {
        let f = u < o.length ? o[u + 1] : void 0,
            h = c < i.length ? i[c + 1] : void 0,
            p = null,
            g;
        l === d ? (u += 2, c += 2, f !== h && (p = d, g = h)) : d === null || l !== null && l < d ? (u += 2, p = l) : (c += 2, p = d, g = h), p !== null && Tm(e, t, n, r, p, g, s, a), l = u < o.length ? o[u] : null, d = c < i.length ? i[c] : null
    }
}

function Tm(e, t, n, r, o, i, s, a) {
    if (!(t.type & 3)) return;
    let u = e.data,
        c = u[a + 1],
        l = zb(c) ? $h(u, t, n, o, gr(c), s) : void 0;
    if (!us(l)) {
        us(i) || Bb(c) && (i = $h(u, null, n, o, a, s));
        let d = ms(sn(), n);
        qE(r, s, d, o, i)
    }
}

function $h(e, t, n, r, o, i) {
    let s = t === null,
        a;
    for (; o > 0;) {
        let u = e[o],
            c = Array.isArray(u),
            l = c ? u[1] : u,
            d = l === null,
            f = n[o + 1];
        f === Ie && (f = d ? _e : void 0);
        let h = d ? Cu(f, r) : l === r ? f : void 0;
        if (c && !us(h) && (h = Cu(u, r)), us(h) && (a = h, s)) return a;
        let p = e[o + 1];
        o = s ? On(p) : gr(p)
    }
    if (t !== null) {
        let u = i ? t.residualClasses : t.residualStyles;
        u != null && (a = Cu(u, r))
    }
    return a
}

function us(e) {
    return e !== void 0
}

function c_(e, t) {
    return e == null || e === "" || (typeof t == "string" ? e = e + t : typeof e == "object" && (e = Me($e(e)))), e
}

function Am(e, t) {
    return (e.flags & (t ? 8 : 16)) !== 0
}

function cV(e, t, n) {
    let r = b(),
        o = Zl(r, e, t, n);
    Eo(Pn, Bs, o, !0)
}

function lV(e, t, n, r, o) {
    let i = b(),
        s = Yl(i, e, t, n, r, o);
    Eo(Pn, Bs, s, !0)
}

function dV(e, t, n, r, o, i, s) {
    let a = b(),
        u = ym(a, e, t, n, r, o, i, s);
    Eo(Pn, Bs, u, !0)
}

function fV() {
    return b()[Pe][me]
}
var Bc = class {
    destroy(t) {}
    updateValue(t, n) {}
    swap(t, n) {
        let r = Math.min(t, n),
            o = Math.max(t, n),
            i = this.detach(o);
        if (o - r > 1) {
            let s = this.detach(r);
            this.attach(r, i), this.attach(o, s)
        } else this.attach(r, i)
    }
    move(t, n) {
        this.attach(n, this.detach(t))
    }
};

function Nu(e, t, n, r, o) {
    return e === n && Object.is(t, r) ? 1 : Object.is(o(e, t), o(n, r)) ? -1 : 0
}

function l_(e, t, n) {
    let r, o, i = 0,
        s = e.length - 1;
    if (Array.isArray(t)) {
        let a = t.length - 1;
        for (; i <= s && i <= a;) {
            let u = e.at(i),
                c = t[i],
                l = Nu(i, u, i, c, n);
            if (l !== 0) {
                l < 0 && e.updateValue(i, c), i++;
                continue
            }
            let d = e.at(s),
                f = t[a],
                h = Nu(s, d, a, f, n);
            if (h !== 0) {
                h < 0 && e.updateValue(s, f), s--, a--;
                continue
            }
            let p = n(i, u),
                g = n(s, d),
                v = n(i, c);
            if (Object.is(v, g)) {
                let w = n(a, f);
                Object.is(w, p) ? (e.swap(i, s), e.updateValue(s, f), a--, s--) : e.move(s, i), e.updateValue(i, c), i++;
                continue
            }
            if (r ? ? = new cs, o ? ? = Hh(e, i, s, n), Hc(e, r, i, v)) e.updateValue(i, c), i++, s++;
            else if (o.has(v)) r.set(p, e.detach(i)), s--;
            else {
                let w = e.create(i, t[i]);
                e.attach(i, w), i++, s++
            }
        }
        for (; i <= a;) Bh(e, r, n, i, t[i]), i++
    } else if (t != null) {
        let a = t[Symbol.iterator](),
            u = a.next();
        for (; !u.done && i <= s;) {
            let c = e.at(i),
                l = u.value,
                d = Nu(i, c, i, l, n);
            if (d !== 0) d < 0 && e.updateValue(i, l), i++, u = a.next();
            else {
                r ? ? = new cs, o ? ? = Hh(e, i, s, n);
                let f = n(i, l);
                if (Hc(e, r, i, f)) e.updateValue(i, l), i++, s++, u = a.next();
                else if (!o.has(f)) e.attach(i, e.create(i, l)), i++, s++, u = a.next();
                else {
                    let h = n(i, c);
                    r.set(h, e.detach(i)), s--
                }
            }
        }
        for (; !u.done;) Bh(e, r, n, e.length, u.value), u = a.next()
    }
    for (; i <= s;) e.destroy(e.detach(s--));
    r ? .forEach(a => {
        e.destroy(a)
    })
}

function Hc(e, t, n, r) {
    return t !== void 0 && t.has(r) ? (e.attach(n, t.get(r)), t.delete(r), !0) : !1
}

function Bh(e, t, n, r, o) {
    if (Hc(e, t, r, n(r, o))) e.updateValue(r, o);
    else {
        let i = e.create(r, o);
        e.attach(r, i)
    }
}

function Hh(e, t, n, r) {
    let o = new Set;
    for (let i = t; i <= n; i++) o.add(r(i, e.at(i)));
    return o
}
var cs = class {
    constructor() {
        this.kvMap = new Map, this._vMap = void 0
    }
    has(t) {
        return this.kvMap.has(t)
    }
    delete(t) {
        if (!this.has(t)) return !1;
        let n = this.kvMap.get(t);
        return this._vMap !== void 0 && this._vMap.has(n) ? (this.kvMap.set(t, this._vMap.get(n)), this._vMap.delete(n)) : this.kvMap.delete(t), !0
    }
    get(t) {
        return this.kvMap.get(t)
    }
    set(t, n) {
        if (this.kvMap.has(t)) {
            let r = this.kvMap.get(t);
            this._vMap === void 0 && (this._vMap = new Map);
            let o = this._vMap;
            for (; o.has(r);) r = o.get(r);
            o.set(r, n)
        } else this.kvMap.set(t, n)
    }
    forEach(t) {
        for (let [n, r] of this.kvMap)
            if (t(r, n), this._vMap !== void 0) {
                let o = this._vMap;
                for (; o.has(r);) r = o.get(r), t(r, n)
            }
    }
};

function hV(e, t, n) {
    wr("NgControlFlow");
    let r = b(),
        o = $t(),
        i = qc(r, ie + e),
        s = 0;
    if (Ae(r, o, t)) {
        let a = ae(null);
        try {
            if (Qg(i, s), t !== -1) {
                let u = Zc(r[N], ie + t),
                    c = uo(i, u.tView.ssrId),
                    l = ks(r, u, n, {
                        dehydratedView: c
                    });
                Ls(i, l, s, ao(u, c))
            }
        } finally {
            ae(a)
        }
    } else {
        let a = Yg(i, s);
        a !== void 0 && (a[me] = n)
    }
}
var zc = class {
    constructor(t, n, r) {
        this.lContainer = t, this.$implicit = n, this.$index = r
    }
    get $count() {
        return this.lContainer.length - Ce
    }
};

function pV(e, t) {
    return t
}
var Gc = class {
    constructor(t, n, r) {
        this.hasEmptyBlock = t, this.trackByFn = n, this.liveCollection = r
    }
};

function gV(e, t, n, r, o, i, s, a, u, c, l, d, f) {
    wr("NgControlFlow");
    let h = u !== void 0,
        p = b(),
        g = a ? s.bind(p[Pe][me]) : s,
        v = new Gc(h, g);
    p[ie + e] = v, Vc(e + 1, t, n, r, o, i), h && Vc(e + 2, u, c, l, d, f)
}
var Wc = class extends Bc {
    constructor(t, n, r) {
        super(), this.lContainer = t, this.hostLView = n, this.templateTNode = r, this.needsIndexUpdate = !1
    }
    get length() {
        return this.lContainer.length - Ce
    }
    at(t) {
        return this.getLView(t)[me].$implicit
    }
    attach(t, n) {
        let r = n[lr];
        this.needsIndexUpdate || = t !== this.length, Ls(this.lContainer, n, t, ao(this.templateTNode, r))
    }
    detach(t) {
        return this.needsIndexUpdate || = t !== this.length - 1, d_(this.lContainer, t)
    }
    create(t, n) {
        let r = uo(this.lContainer, this.templateTNode.tView.ssrId);
        return ks(this.hostLView, this.templateTNode, new zc(this.lContainer, n, t), {
            dehydratedView: r
        })
    }
    destroy(t) {
        xs(t[N], t)
    }
    updateValue(t, n) {
        this.getLView(t)[me].$implicit = n
    }
    reset() {
        this.needsIndexUpdate = !1
    }
    updateIndexes() {
        if (this.needsIndexUpdate)
            for (let t = 0; t < this.length; t++) this.getLView(t)[me].$index = t
    }
    getLView(t) {
        return f_(this.lContainer, t)
    }
};

function mV(e) {
    let t = ae(null),
        n = sn();
    try {
        let r = b(),
            o = r[N],
            i = r[n];
        if (i.liveCollection === void 0) {
            let a = n + 1,
                u = qc(r, a),
                c = Zc(o, a);
            i.liveCollection = new Wc(u, r, c)
        } else i.liveCollection.reset();
        let s = i.liveCollection;
        if (l_(s, e, i.trackByFn), s.updateIndexes(), i.hasEmptyBlock) {
            let a = $t(),
                u = s.length === 0;
            if (Ae(r, a, u)) {
                let c = n + 2,
                    l = qc(r, c);
                if (u) {
                    let d = Zc(o, c),
                        f = uo(l, d.tView.ssrId),
                        h = ks(r, d, void 0, {
                            dehydratedView: f
                        });
                    Ls(l, h, 0, ao(d, f))
                } else Qg(l, 0)
            }
        }
    } finally {
        ae(t)
    }
}

function qc(e, t) {
    return e[t]
}

function d_(e, t) {
    return so(e, t)
}

function f_(e, t) {
    return Yg(e, t)
}

function Zc(e, t) {
    return rl(e, t)
}

function h_(e, t, n, r, o, i) {
    let s = t.consts,
        a = _n(s, o),
        u = Dr(t, e, 2, r, a);
    return Fl(t, n, u, _n(s, i)), u.attrs !== null && ns(u, u.attrs, !1), u.mergedAttrs !== null && ns(u, u.mergedAttrs, !0), t.queries !== null && t.queries.elementStart(t, u), u
}

function xm(e, t, n, r) {
    let o = b(),
        i = G(),
        s = ie + e,
        a = o[j],
        u = i.firstCreatePass ? h_(s, i, o, t, n, r) : i.data[s],
        c = p_(i, o, u, a, t, e);
    o[s] = c;
    let l = gs(u);
    return mt(u, !0), Pg(a, c, u), (u.flags & 32) !== 32 && Ds() && Rs(i, o, c, u), Zw() === 0 && yt(c, o), Yw(), l && (Nl(i, o, u), xl(i, u, o)), r !== null && Rl(o, u), xm
}

function Nm() {
    let e = Ee();
    sl() ? al() : (e = e.parent, mt(e, !1));
    let t = e;
    Kw(t) && Jw(), Qw();
    let n = G();
    return n.firstCreatePass && (Ts(n, e), nl(e) && n.queries.elementEnd(e)), t.classesWithoutHost != null && eE(t) && $c(n, t, b(), t.classesWithoutHost, !0), t.stylesWithoutHost != null && tE(t) && $c(n, t, b(), t.stylesWithoutHost, !1), Nm
}

function Ql(e, t, n, r) {
    return xm(e, t, n, r), Nm(), Ql
}
var p_ = (e, t, n, r, o, i) => (ws(!0), Sl(r, o, sC()));

function g_(e, t, n, r, o) {
    let i = t.consts,
        s = _n(i, r),
        a = Dr(t, e, 8, "ng-container", s);
    s !== null && ns(a, s, !0);
    let u = _n(i, o);
    return Fl(t, n, a, u), t.queries !== null && t.queries.elementStart(t, a), a
}

function Rm(e, t, n) {
    let r = b(),
        o = G(),
        i = e + ie,
        s = o.firstCreatePass ? g_(i, o, r, t, n) : o.data[i];
    mt(s, !0);
    let a = v_(o, r, s, e);
    return r[i] = a, Ds() && Rs(o, r, a, s), yt(a, r), gs(s) && (Nl(o, r, s), xl(o, s, r)), n != null && Rl(r, s), Rm
}

function Om() {
    let e = Ee(),
        t = G();
    return sl() ? al() : (e = e.parent, mt(e, !1)), t.firstCreatePass && (Ts(t, e), nl(e) && t.queries.elementEnd(e)), Om
}

function m_(e, t, n) {
    return Rm(e, t, n), Om(), m_
}
var v_ = (e, t, n, r) => (ws(!0), Cg(t[j], ""));

function vV() {
    return b()
}

function y_(e, t, n) {
    let r = b(),
        o = $t();
    if (Ae(r, o, t)) {
        let i = G(),
            s = Bt();
        un(i, s, r, e, t, r[j], n, !0)
    }
    return y_
}

function D_(e, t, n) {
    let r = b(),
        o = $t();
    if (Ae(r, o, t)) {
        let i = G(),
            s = Bt(),
            a = Dp(i.data),
            u = vI(a, s, r);
        un(i, s, r, e, t, u, n, !0)
    }
    return D_
}
var wn = void 0;

function w_(e) {
    let t = e,
        n = Math.floor(Math.abs(e)),
        r = e.toString().replace(/^[^.]*\.?/, "").length;
    return n === 1 && r === 0 ? 1 : 5
}
var C_ = ["en", [
            ["a", "p"],
            ["AM", "PM"], wn
        ],
        [
            ["AM", "PM"], wn, wn
        ],
        [
            ["S", "M", "T", "W", "T", "F", "S"],
            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        ], wn, [
            ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
            ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        ], wn, [
            ["B", "A"],
            ["BC", "AD"],
            ["Before Christ", "Anno Domini"]
        ], 0, [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", wn, "{1} 'at' {0}", wn],
        [".", ",", ";", "%", "+", "-", "E", "\xD7", "\u2030", "\u221E", "NaN", ":"],
        ["#,##0.###", "#,##0%", "\xA4#,##0.00", "#E0"], "USD", "$", "US Dollar", {}, "ltr", w_
    ],
    qr = {};

function Fm(e, t, n) {
    typeof t != "string" && (n = t, t = e[X.LocaleId]), t = t.toLowerCase().replace(/_/g, "-"), qr[t] = e, n && (qr[t][X.ExtraData] = n)
}

function Ve(e) {
    let t = E_(e),
        n = zh(t);
    if (n) return n;
    let r = t.split("-")[0];
    if (n = zh(r), n) return n;
    if (r === "en") return C_;
    throw new D(701, !1)
}

function Pm(e) {
    return Ve(e)[X.PluralCase]
}

function zh(e) {
    return e in qr || (qr[e] = oe.ng && oe.ng.common && oe.ng.common.locales && oe.ng.common.locales[e]), qr[e]
}
var X = function(e) {
    return e[e.LocaleId = 0] = "LocaleId", e[e.DayPeriodsFormat = 1] = "DayPeriodsFormat", e[e.DayPeriodsStandalone = 2] = "DayPeriodsStandalone", e[e.DaysFormat = 3] = "DaysFormat", e[e.DaysStandalone = 4] = "DaysStandalone", e[e.MonthsFormat = 5] = "MonthsFormat", e[e.MonthsStandalone = 6] = "MonthsStandalone", e[e.Eras = 7] = "Eras", e[e.FirstDayOfWeek = 8] = "FirstDayOfWeek", e[e.WeekendRange = 9] = "WeekendRange", e[e.DateFormat = 10] = "DateFormat", e[e.TimeFormat = 11] = "TimeFormat", e[e.DateTimeFormat = 12] = "DateTimeFormat", e[e.NumberSymbols = 13] = "NumberSymbols", e[e.NumberFormats = 14] = "NumberFormats", e[e.CurrencyCode = 15] = "CurrencyCode", e[e.CurrencySymbol = 16] = "CurrencySymbol", e[e.CurrencyName = 17] = "CurrencyName", e[e.Currencies = 18] = "Currencies", e[e.Directionality = 19] = "Directionality", e[e.PluralCase = 20] = "PluralCase", e[e.ExtraData = 21] = "ExtraData", e
}(X || {});

function E_(e) {
    return e.toLowerCase().replace(/_/g, "-")
}
var I_ = ["zero", "one", "two", "few", "many"];

function b_(e, t) {
    let n = Pm(t)(parseInt(e, 10)),
        r = I_[n];
    return r !== void 0 ? r : "other"
}
var ls = "en-US";
var km = {
        marker: "element"
    },
    Lm = {
        marker: "ICU"
    },
    Nt = function(e) {
        return e[e.SHIFT = 2] = "SHIFT", e[e.APPEND_EAGERLY = 1] = "APPEND_EAGERLY", e[e.COMMENT = 2] = "COMMENT", e
    }(Nt || {}),
    Vm = ls;

function __(e) {
    typeof e == "string" && (Vm = e.toLowerCase().replace(/_/g, "-"))
}

function M_() {
    return Vm
}

function jm(e, t, n) {
    let r = t.insertBeforeIndex,
        o = Array.isArray(r) ? r[0] : r;
    return o === null ? Tg(e, t, n) : Ge(n[o])
}

function Um(e, t, n, r, o) {
    let i = t.insertBeforeIndex;
    if (Array.isArray(i)) {
        let s = r,
            a = null;
        if (t.type & 3 || (a = s, s = o), s !== null && t.componentOffset === -1)
            for (let u = 1; u < i.length; u++) {
                let c = n[i[u]];
                xn(e, s, c, a, !1)
            }
    }
}

function $m(e, t) {
    if (e.push(t), e.length > 1)
        for (let n = e.length - 2; n >= 0; n--) {
            let r = e[n];
            Bm(r) || S_(r, t) && T_(r) === null && A_(r, t.index)
        }
}

function Bm(e) {
    return !(e.type & 64)
}

function S_(e, t) {
    return Bm(t) || e.index > t.index
}

function T_(e) {
    let t = e.insertBeforeIndex;
    return Array.isArray(t) ? t[0] : t
}

function A_(e, t) {
    let n = e.insertBeforeIndex;
    Array.isArray(n) ? n[0] = t : (xg(jm, Um), e.insertBeforeIndex = t)
}

function Zr(e, t) {
    let n = e.data[t];
    return n === null || typeof n == "string" ? null : n.hasOwnProperty("currentCaseLViewIndex") ? n : n.value
}

function x_(e, t, n) {
    let r = e.data[t];
    r === null ? e.data[t] = n : r.value = n
}

function N_(e, t) {
    let n = e.insertBeforeIndex;
    n === null ? (xg(jm, Um), n = e.insertBeforeIndex = [null, t]) : (mw(Array.isArray(n), !0, "Expecting array here"), n.push(t))
}

function R_(e, t, n) {
    let r = Al(e, n, 64, null, null);
    return $m(t, r), r
}

function Hs(e, t) {
    let n = t[e.currentCaseLViewIndex];
    return n === null ? n : n < 0 ? ~n : n
}

function O_(e) {
    return e >>> 17
}

function F_(e) {
    return (e & 131070) >>> 1
}

function P_(e, t, n) {
    return e | t << 17 | n << 1
}
var po = 0,
    Yr = 0;

function k_(e) {
    e && (po = po | 1 << Math.min(Yr, 31)), Yr++
}

function L_(e, t, n) {
    if (Yr > 0) {
        let r = e.data[n],
            o = Array.isArray(r) ? r : r.update,
            i = ul() - Yr - 1;
        zm(e, t, o, i, po)
    }
    po = 0, Yr = 0
}

function V_(e, t, n, r) {
    let o = e[j];
    for (let i = 0; i < t.length; i++) {
        let s = t[i++],
            a = t[i],
            u = (s & Nt.COMMENT) === Nt.COMMENT,
            c = (s & Nt.APPEND_EAGERLY) === Nt.APPEND_EAGERLY,
            l = s >>> Nt.SHIFT,
            d = e[l];
        d === null && (d = e[l] = u ? o.createComment(a) : Ml(o, a)), c && n !== null && xn(o, n, d, r, !1)
    }
}

function Hm(e, t, n, r) {
    let o = n[j],
        i = null,
        s;
    for (let a = 0; a < t.length; a++) {
        let u = t[a];
        if (typeof u == "string") {
            let c = t[++a];
            n[c] === null && (n[c] = Ml(o, u))
        } else if (typeof u == "number") switch (u & 1) {
            case 0:
                let c = O_(u);
                i === null && (i = c, s = Ns(o, r));
                let l, d;
                if (c === i ? (l = r, d = s) : (l = null, d = Ge(n[c])), d !== null) {
                    let g = F_(u),
                        v = n[g];
                    xn(o, d, v, l, !1);
                    let w = Zr(e, g);
                    if (w !== null && typeof w == "object") {
                        let V = Hs(w, n);
                        V !== null && Hm(e, w.create[V], n, n[w.anchorIdx])
                    }
                }
                break;
            case 1:
                let f = u >>> 1,
                    h = t[++a],
                    p = t[++a];
                Pl(o, ms(f, n), null, null, h, p, null);
                break;
            default:
        } else switch (u) {
            case Lm:
                let c = t[++a],
                    l = t[++a];
                if (n[l] === null) {
                    let h = n[l] = Cg(o, c);
                    yt(h, n)
                }
                break;
            case km:
                let d = t[++a],
                    f = t[++a];
                if (n[f] === null) {
                    let h = n[f] = Sl(o, d, null);
                    yt(h, n)
                }
                break;
            default:
        }
    }
}

function zm(e, t, n, r, o) {
    for (let i = 0; i < n.length; i++) {
        let s = n[i],
            a = n[++i];
        if (s & o) {
            let u = "";
            for (let c = i + 1; c <= i + a; c++) {
                let l = n[c];
                if (typeof l == "string") u += l;
                else if (typeof l == "number")
                    if (l < 0) u += rt(t[r - l]);
                    else {
                        let d = l >>> 2;
                        switch (l & 3) {
                            case 1:
                                let f = n[++c],
                                    h = n[++c],
                                    p = e.data[d];
                                typeof p == "string" ? Pl(t[j], t[d], null, p, f, u, h) : un(e, p, t, f, u, t[j], h, !1);
                                break;
                            case 0:
                                let g = t[d];
                                g !== null && wg(t[j], g, u);
                                break;
                            case 2:
                                j_(e, Zr(e, d), t, u);
                                break;
                            case 3:
                                Gh(e, Zr(e, d), r, t);
                                break
                        }
                    }
            }
        } else {
            let u = n[i + 1];
            if (u > 0 && (u & 3) === 3) {
                let c = u >>> 2,
                    l = Zr(e, c);
                t[l.currentCaseLViewIndex] < 0 && Gh(e, l, r, t)
            }
        }
        i += a
    }
}

function Gh(e, t, n, r) {
    let o = r[t.currentCaseLViewIndex];
    if (o !== null) {
        let i = po;
        o < 0 && (o = r[t.currentCaseLViewIndex] = ~o, i = -1), zm(e, r, t.update[o], n, i)
    }
}

function j_(e, t, n, r) {
    let o = U_(t, r);
    if (Hs(t, n) !== o && (Gm(e, t, n), n[t.currentCaseLViewIndex] = o === null ? null : ~o, o !== null)) {
        let s = n[t.anchorIdx];
        s && Hm(e, t.create[o], n, s)
    }
}

function Gm(e, t, n) {
    let r = Hs(t, n);
    if (r !== null) {
        let o = t.remove[r];
        for (let i = 0; i < o.length; i++) {
            let s = o[i];
            if (s > 0) {
                let a = ms(s, n);
                a !== null && Rg(n[j], a)
            } else Gm(e, Zr(e, ~s), n)
        }
    }
}

function U_(e, t) {
    let n = e.cases.indexOf(t);
    if (n === -1) switch (e.type) {
        case 1:
            {
                let r = b_(t, M_());n = e.cases.indexOf(r),
                n === -1 && r !== "other" && (n = e.cases.indexOf("other"));
                break
            }
        case 0:
            {
                n = e.cases.indexOf("other");
                break
            }
    }
    return n === -1 ? null : n
}

function $_() {
    let e = [],
        t = -1,
        n, r;

    function o(a, u) {
        for (n = u; e.length;) e.pop();
        return i(a.value, u), s
    }

    function i(a, u) {
        t = 0;
        let c = Hs(a, u);
        c !== null ? r = a.remove[c] : r = _e
    }

    function s() {
        if (t < r.length) {
            let a = r[t++];
            if (a > 0) return n[a]; {
                e.push(t, r);
                let u = ~a,
                    c = n[N].data[u];
                return i(c, n), s()
            }
        } else return e.length === 0 ? null : (r = e.pop(), t = e.pop(), s())
    }
    return o
}
var ds = /�(\d+):?\d*�/gi;
var B_ = /�(\d+)�/,
    Wm = /^\s*(�\d+:?\d*�)\s*,\s*(select|plural)\s*,/,
    Qr = "\uFFFD",
    H_ = /�\/?\*(\d+:\d+)�/gi,
    z_ = /�(\/?[#*]\d+):?\d*�/gi,
    G_ = /\uE500/g;

function W_(e) {
    return e.replace(G_, " ")
}

function q_(e, t, n, r, o, i) {
    let s = ro(),
        a = [],
        u = [],
        c = [
            []
        ];
    o = Q_(o, i);
    let l = W_(o).split(z_);
    for (let d = 0; d < l.length; d++) {
        let f = l[d];
        if (d & 1) {
            let h = f.charCodeAt(0) === 47,
                p = f.charCodeAt(h ? 1 : 0),
                g = ie + Number.parseInt(f.substring(h ? 2 : 1));
            if (h) c.shift(), mt(ro(), !1);
            else {
                let v = R_(e, c[0], g);
                c.unshift([]), mt(v, !0)
            }
        } else {
            let h = Yc(f);
            for (let p = 0; p < h.length; p++) {
                let g = h[p];
                if (p & 1) {
                    let v = g;
                    if (typeof v != "object") throw new Error(`Unable to parse ICU expression in "${o}" message.`);
                    let V = qm(e, s, c[0], n, a, "", !0).index;
                    Ym(e, n, u, t, v, V)
                } else {
                    let v = g;
                    v !== "" && Z_(e, s, c[0], a, u, n, v)
                }
            }
        }
    }
    e.data[r] = {
        create: a,
        update: u
    }
}

function qm(e, t, n, r, o, i, s) {
    let a = Co(e, r, 1, null),
        u = a << Nt.SHIFT,
        c = ro();
    t === c && (c = null), c === null && (u |= Nt.APPEND_EAGERLY), s && (u |= Nt.COMMENT, PE($_)), o.push(u, i === null ? "" : i);
    let l = Al(e, a, s ? 32 : 1, i === null ? "" : i, null);
    $m(n, l);
    let d = l.index;
    return mt(l, !1), c !== null && t !== c && N_(c, d), l
}

function Z_(e, t, n, r, o, i, s) {
    let a = s.match(ds),
        u = qm(e, t, n, i, r, a ? null : s, !1);
    a && $i(o, s, u.index, null, 0, null)
}

function $i(e, t, n, r, o, i) {
    let s = e.length,
        a = s + 1;
    e.push(null, null);
    let u = s + 2,
        c = t.split(ds),
        l = 0;
    for (let d = 0; d < c.length; d++) {
        let f = c[d];
        if (d & 1) {
            let h = o + parseInt(f, 10);
            e.push(-1 - h), l = l | Zm(h)
        } else f !== "" && e.push(f)
    }
    return e.push(n << 2 | (r ? 1 : 0)), r && e.push(r, i), e[s] = l, e[a] = e.length - u, l
}

function Zm(e) {
    return 1 << Math.min(e, 31)
}

function Y_(e) {
    return e === -1
}

function Wh(e) {
    let t, n = "",
        r = 0,
        o = !1,
        i;
    for (;
        (t = H_.exec(e)) !== null;) o ? t[0] === `${Qr}/*${i}${Qr}` && (r = t.index, o = !1) : (n += e.substring(r, t.index + t[0].length), i = t[1], o = !0);
    return n += e.slice(r), n
}

function Q_(e, t) {
    if (Y_(t)) return Wh(e); {
        let n = e.indexOf(`:${t}${Qr}`) + 2 + t.toString().length,
            r = e.search(new RegExp(`${Qr}\\/\\*\\d+:${t}${Qr}`));
        return Wh(e.substring(n, r))
    }
}

function Ym(e, t, n, r, o, i) {
    let s = 0,
        a = {
            type: o.type,
            currentCaseLViewIndex: Co(e, t, 1, null),
            anchorIdx: i,
            cases: [],
            create: [],
            remove: [],
            update: []
        };
    e0(n, o, i), x_(e, i, a);
    let u = o.values;
    for (let c = 0; c < u.length; c++) {
        let l = u[c],
            d = [];
        for (let f = 0; f < l.length; f++) {
            let h = l[f];
            if (typeof h != "string") {
                let p = d.push(h) - 1;
                l[f] = `<!--\uFFFD${p}\uFFFD-->`
            }
        }
        s = J_(e, a, t, n, r, o.cases[c], l.join(""), d) | s
    }
    s && t0(n, s, i)
}

function K_(e) {
    let t = [],
        n = [],
        r = 1,
        o = 0;
    e = e.replace(Wm, function(s, a, u) {
        return u === "select" ? r = 0 : r = 1, o = parseInt(a.slice(1), 10), ""
    });
    let i = Yc(e);
    for (let s = 0; s < i.length;) {
        let a = i[s++].trim();
        r === 1 && (a = a.replace(/\s*(?:=)?(\w+)\s*/, "$1")), a.length && t.push(a);
        let u = Yc(i[s++]);
        t.length > n.length && n.push(u)
    }
    return {
        type: r,
        mainBinding: o,
        cases: t,
        values: n
    }
}

function Yc(e) {
    if (!e) return [];
    let t = 0,
        n = [],
        r = [],
        o = /[{}]/g;
    o.lastIndex = 0;
    let i;
    for (; i = o.exec(e);) {
        let a = i.index;
        if (i[0] == "}") {
            if (n.pop(), n.length == 0) {
                let u = e.substring(t, a);
                Wm.test(u) ? r.push(K_(u)) : r.push(u), t = a + 1
            }
        } else {
            if (n.length == 0) {
                let u = e.substring(t, a);
                r.push(u), t = a + 1
            }
            n.push("{")
        }
    }
    let s = e.substring(t);
    return r.push(s), r
}

function J_(e, t, n, r, o, i, s, a) {
    let u = [],
        c = [],
        l = [];
    t.cases.push(i), t.create.push(u), t.remove.push(c), t.update.push(l);
    let f = hg(hl()).getInertBodyElement(s),
        h = ac(f) || f;
    return h ? Qm(e, t, n, r, u, c, l, h, o, a, 0) : 0
}

function Qm(e, t, n, r, o, i, s, a, u, c, l) {
    let d = 0,
        f = a.firstChild;
    for (; f;) {
        let h = Co(e, n, 1, null);
        switch (f.nodeType) {
            case Node.ELEMENT_NODE:
                let p = f,
                    g = p.tagName.toLowerCase();
                if (ic.hasOwnProperty(g)) {
                    Ru(o, km, g, u, h), e.data[h] = g;
                    let U = p.attributes;
                    for (let J = 0; J < U.length; J++) {
                        let ee = U.item(J),
                            be = ee.name.toLowerCase();
                        !!ee.value.match(ds) ? vg.hasOwnProperty(be) && (El[be] ? $i(s, ee.value, h, ee.name, 0, Do) : $i(s, ee.value, h, ee.name, 0, null)) : n0(o, h, ee)
                    }
                    d = Qm(e, t, n, r, o, i, s, f, h, c, l + 1) | d, qh(i, h, l)
                }
                break;
            case Node.TEXT_NODE:
                let v = f.textContent || "",
                    w = v.match(ds);
                Ru(o, null, w ? "" : v, u, h), qh(i, h, l), w && (d = $i(s, v, h, null, 0, null) | d);
                break;
            case Node.COMMENT_NODE:
                let V = B_.exec(f.textContent || "");
                if (V) {
                    let U = parseInt(V[1], 10),
                        J = c[U];
                    Ru(o, Lm, "", u, h), Ym(e, n, r, u, J, h), X_(i, h, l)
                }
                break
        }
        f = f.nextSibling
    }
    return d
}

function qh(e, t, n) {
    n === 0 && e.push(t)
}

function X_(e, t, n) {
    n === 0 && (e.push(~t), e.push(t))
}

function e0(e, t, n) {
    e.push(Zm(t.mainBinding), 2, -1 - t.mainBinding, n << 2 | 2)
}

function t0(e, t, n) {
    e.push(t, 1, n << 2 | 3)
}

function Ru(e, t, n, r, o) {
    t !== null && e.push(t), e.push(n, o, P_(0, r, o))
}

function n0(e, t, n) {
    e.push(t << 1 | 1, n.name, n.value)
}

function r0(e, t, n = -1) {
    let r = G(),
        o = b(),
        i = ie + e,
        s = _n(r.consts, t),
        a = ro();
    if (r.firstCreatePass && q_(r, a === null ? 0 : a.index, o, i, s, n), r.type === 2) {
        let f = o[Pe];
        f[x] |= 32
    } else o[x] |= 32;
    let u = r.data[i],
        c = a === o[ke] ? null : a,
        l = _g(r, c, o),
        d = a && a.type & 8 ? o[a.index] : null;
    V_(o, u.create, l, d), yp(!0)
}

function o0() {
    yp(!1)
}

function yV(e, t, n) {
    r0(e, t, n), o0()
}

function i0(e) {
    let t = b();
    return k_(Ae(t, $t(), e)), i0
}

function DV(e) {
    L_(G(), b(), e + ie)
}

function at(e, t, n, r) {
    let o = b(),
        i = G(),
        s = Ee();
    return Km(i, o, o[j], s, e, t, r), at
}

function s0(e, t, n, r) {
    let o = e.cleanup;
    if (o != null)
        for (let i = 0; i < o.length - 1; i += 2) {
            let s = o[i];
            if (s === n && o[i + 1] === r) {
                let a = t[Xr],
                    u = o[i + 2];
                return a.length > u ? a[u] : null
            }
            typeof s == "string" && (i += 2)
        }
    return null
}

function Km(e, t, n, r, o, i, s) {
    let a = gs(r),
        c = e.firstCreatePass && qg(e),
        l = t[me],
        d = Wg(t),
        f = !0;
    if (r.type & 3 || s) {
        let g = We(r, t),
            v = s ? s(g) : g,
            w = d.length,
            V = s ? J => s(Ge(J[r.index])) : r.index,
            U = null;
        if (!s && a && (U = s0(e, t, o, r.index)), U !== null) {
            let J = U.__ngLastListenerFn__ || U;
            J.__ngNextListenerFn__ = i, U.__ngLastListenerFn__ = i, f = !1
        } else {
            i = Yh(r, t, l, i, !1);
            let J = n.listen(v, o, i);
            d.push(i, J), c && c.push(o, V, w, w + 1)
        }
    } else i = Yh(r, t, l, i, !1);
    let h = r.outputs,
        p;
    if (f && h !== null && (p = h[o])) {
        let g = p.length;
        if (g)
            for (let v = 0; v < g; v += 2) {
                let w = p[v],
                    V = p[v + 1],
                    ee = t[w][V].subscribe(i),
                    be = d.length;
                if (d.push(i, ee), c) {
                    let Wn = typeof ee == "function" ? be + 1 : -(be + 1);
                    c.push(o, r.index, be, Wn)
                }
            }
    }
}

function Zh(e, t, n, r) {
    try {
        return ht(6, t, n), n(r) !== !1
    } catch (o) {
        return Zg(e, o), !1
    } finally {
        ht(7, t, n)
    }
}

function Yh(e, t, n, r, o) {
    return function i(s) {
        if (s === Function) return r;
        let a = e.componentOffset > -1 ? on(e.index, t) : t;
        Vl(a);
        let u = Zh(t, n, r, s),
            c = i.__ngNextListenerFn__;
        for (; c;) u = Zh(t, n, c, s) && u, c = c.__ngNextListenerFn__;
        return o && u === !1 && s.preventDefault(), u
    }
}

function wV(e = 1) {
    return iC(e)
}

function a0(e, t) {
    let n = null,
        r = Tw(e);
    for (let o = 0; o < t.length; o++) {
        let i = t[o];
        if (i === "*") {
            n = o;
            continue
        }
        if (r === null ? op(e, i, !0) : Nw(r, i)) return o
    }
    return n
}

function CV(e) {
    let t = b()[Pe][ke];
    if (!t.projection) {
        let n = e ? e.length : 1,
            r = t.projection = dC(n, null),
            o = r.slice(),
            i = t.child;
        for (; i !== null;) {
            let s = e ? a0(i, e) : 0;
            s !== null && (o[s] ? o[s].projectionNext = i : r[s] = i, o[s] = i), i = i.next
        }
    }
}

function EV(e, t = 0, n) {
    let r = b(),
        o = G(),
        i = Dr(o, ie + e, 16, null, n || null);
    i.projection === null && (i.projection = t), al(), (!r[lr] || mp()) && (i.flags & 32) !== 32 && GE(o, r, i)
}

function u0(e, t, n) {
    return Jm(e, "", t, "", n), u0
}

function Jm(e, t, n, r, o) {
    let i = b(),
        s = Zl(i, t, n, r);
    if (s !== Ie) {
        let a = G(),
            u = Bt();
        un(a, u, i, e, s, i[j], o, !1)
    }
    return Jm
}

function c0(e, t, n, r, o, i, s) {
    let a = b(),
        u = Yl(a, t, n, r, o, i);
    if (u !== Ie) {
        let c = G(),
            l = Bt();
        un(c, l, a, e, u, a[j], s, !1)
    }
    return c0
}

function l0(e, t, n, r, o, i, s, a, u) {
    let c = b(),
        l = ym(c, t, n, r, o, i, s, a);
    if (l !== Ie) {
        let d = G(),
            f = Bt();
        un(d, f, c, e, l, c[j], u, !1)
    }
    return l0
}

function d0(e, t, n, r) {
    wb(e, t, n, r)
}

function IV(e, t, n) {
    Db(e, t, n)
}

function f0(e) {
    let t = b(),
        n = G(),
        r = wp();
    cl(r + 1);
    let o = Wl(n, r);
    if (e.dirty && Hw(t) === ((o.metadata.flags & 2) === 2)) {
        if (o.matches === null) e.reset([]);
        else {
            let i = Ib(t, r);
            e.reset(i, uC), e.notifyOnChanges()
        }
        return !0
    }
    return !1
}

function h0() {
    return yb(b(), wp())
}

function p0(e, t, n, r) {
    n >= e.data.length && (e.data[n] = null, e.blueprint[n] = null), t[n] = r
}

function bV(e) {
    let t = Xw();
    return vs(t, ie + e)
}

function _V(e, t = "") {
    let n = b(),
        r = G(),
        o = e + ie,
        i = r.firstCreatePass ? Dr(r, o, 1, t, null) : r.data[o],
        s = g0(r, n, i, t, e);
    n[o] = s, Ds() && Rs(r, n, s, i), mt(i, !1)
}
var g0 = (e, t, n, r, o) => (ws(!0), Ml(t[j], r));

function m0(e) {
    return Xm("", e, ""), m0
}

function Xm(e, t, n) {
    let r = b(),
        o = Zl(r, e, t, n);
    return o !== Ie && yI(r, sn(), o), Xm
}

function v0(e, t, n) {
    sm(t) && (t = t());
    let r = b(),
        o = $t();
    if (Ae(r, o, t)) {
        let i = G(),
            s = Bt();
        un(i, s, r, e, t, r[j], n, !1)
    }
    return v0
}

function MV(e, t) {
    let n = sm(e);
    return n && e.set(t), n
}

function y0(e, t) {
    let n = b(),
        r = G(),
        o = Ee();
    return Km(r, n, n[j], o, e, t), y0
}

function D0(e, t, n) {
    let r = G();
    if (r.firstCreatePass) {
        let o = kt(e);
        Qc(n, r.data, r.blueprint, o, !0), Qc(t, r.data, r.blueprint, o, !1)
    }
}

function Qc(e, t, n, r, o) {
    if (e = ge(e), Array.isArray(e))
        for (let i = 0; i < e.length; i++) Qc(e[i], t, n, r, o);
    else {
        let i = G(),
            s = b(),
            a = Ee(),
            u = pr(e) ? e : ge(e.provide),
            c = Bp(e),
            l = a.providerIndexes & 1048575,
            d = a.directiveStart,
            f = a.providerIndexes >> 20;
        if (pr(e) || !e.multi) {
            let h = new Tn(c, o, _),
                p = Fu(u, t, o ? l : l + f, d);
            p === -1 ? (Qu(Ji(a, s), i, u), Ou(i, e, t.length), t.push(u), a.directiveStart++, a.directiveEnd++, o && (a.providerIndexes += 1048576), n.push(h), s.push(h)) : (n[p] = h, s[p] = h)
        } else {
            let h = Fu(u, t, l + f, d),
                p = Fu(u, t, l, l + f),
                g = h >= 0 && n[h],
                v = p >= 0 && n[p];
            if (o && !v || !o && !g) {
                Qu(Ji(a, s), i, u);
                let w = E0(o ? C0 : w0, n.length, o, r, c);
                !o && v && (n[p].providerFactory = w), Ou(i, e, t.length, 0), t.push(u), a.directiveStart++, a.directiveEnd++, o && (a.providerIndexes += 1048576), n.push(w), s.push(w)
            } else {
                let w = ev(n[o ? p : h], c, !o && r);
                Ou(i, e, h > -1 ? h : p, w)
            }!o && r && v && n[p].componentProviders++
        }
    }
}

function Ou(e, t, n, r) {
    let o = pr(t),
        i = VC(t);
    if (o || i) {
        let u = (i ? ge(t.useClass) : t).prototype.ngOnDestroy;
        if (u) {
            let c = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
                let l = c.indexOf(n);
                l === -1 ? c.push(n, [r, u]) : c[l + 1].push(r, u)
            } else c.push(n, u)
        }
    }
}

function ev(e, t, n) {
    return n && e.componentProviders++, e.multi.push(t) - 1
}

function Fu(e, t, n, r) {
    for (let o = n; o < r; o++)
        if (t[o] === e) return o;
    return -1
}

function w0(e, t, n, r) {
    return Kc(this.multi, [])
}

function C0(e, t, n, r) {
    let o = this.multi,
        i;
    if (this.providerFactory) {
        let s = this.providerFactory.componentProviders,
            a = An(n, n[N], this.providerFactory.index, r);
        i = a.slice(0, s), Kc(o, i);
        for (let u = s; u < a.length; u++) i.push(a[u])
    } else i = [], Kc(o, i);
    return i
}

function Kc(e, t) {
    for (let n = 0; n < e.length; n++) {
        let r = e[n];
        t.push(r())
    }
    return t
}

function E0(e, t, n, r, o) {
    let i = new Tn(e, n, _);
    return i.multi = [], i.index = t, i.componentProviders = 0, ev(i, o, r && !n), i
}

function It(e, t = []) {
    return n => {
        n.providersResolver = (r, o) => D0(r, o ? o(e) : e, t)
    }
}
var I0 = (() => {
    class e {
        constructor(n) {
            this._injector = n, this.cachedInjectors = new Map
        }
        getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n)) {
                let r = jp(!1, n.type),
                    o = r.length > 0 ? Us([r], this._injector, `Standalone[${n.type.name}]`) : null;
                this.cachedInjectors.set(n, o)
            }
            return this.cachedInjectors.get(n)
        }
        ngOnDestroy() {
            try {
                for (let n of this.cachedInjectors.values()) n !== null && n.destroy()
            } finally {
                this.cachedInjectors.clear()
            }
        }
        static {
            this.\u0275prov = E({
                token: e,
                providedIn: "environment",
                factory: () => new e(M(Te))
            })
        }
    }
    return e
})();

function tv(e) {
    wr("NgStandalone"), e.getStandaloneInjector = t => t.get(I0).getOrCreateStandaloneInjector(e)
}

function SV(e, t, n) {
    let r = e.\u0275cmp;
    r.directiveDefs = zi(t, !1), r.pipeDefs = zi(n, !0)
}

function TV(e, t, n) {
    let r = Ut() + e,
        o = b();
    return o[r] === Ie ? Cr(o, r, n ? t.call(n) : t()) : mm(o, r)
}

function AV(e, t, n, r) {
    return nv(b(), Ut(), e, t, n, r)
}

function xV(e, t, n, r, o) {
    return rv(b(), Ut(), e, t, n, r, o)
}

function NV(e, t, n, r, o, i) {
    return ov(b(), Ut(), e, t, n, r, o, i)
}

function RV(e, t, n, r, o, i, s) {
    return b0(b(), Ut(), e, t, n, r, o, i, s)
}

function OV(e, t, n, r, o, i, s, a, u, c, l) {
    let d = Ut() + e,
        f = b(),
        h = Lc(f, d, n, r, o, i);
    return Lc(f, d + 4, s, a, u, c) || h ? Cr(f, d + 8, l ? t.call(l, n, r, o, i, s, a, u, c) : t(n, r, o, i, s, a, u, c)) : mm(f, d + 8)
}

function zs(e, t) {
    let n = e[t];
    return n === Ie ? void 0 : n
}

function nv(e, t, n, r, o, i) {
    let s = t + n;
    return Ae(e, s, o) ? Cr(e, s + 1, i ? r.call(i, o) : r(o)) : zs(e, s + 1)
}

function rv(e, t, n, r, o, i, s) {
    let a = t + n;
    return fo(e, a, o, i) ? Cr(e, a + 2, s ? r.call(s, o, i) : r(o, i)) : zs(e, a + 2)
}

function ov(e, t, n, r, o, i, s, a) {
    let u = t + n;
    return vm(e, u, o, i, s) ? Cr(e, u + 3, a ? r.call(a, o, i, s) : r(o, i, s)) : zs(e, u + 3)
}

function b0(e, t, n, r, o, i, s, a, u) {
    let c = t + n;
    return Lc(e, c, o, i, s, a) ? Cr(e, c + 4, u ? r.call(u, o, i, s, a) : r(o, i, s, a)) : zs(e, c + 4)
}

function FV(e, t) {
    let n = G(),
        r, o = e + ie;
    n.firstCreatePass ? (r = _0(t, n.pipeRegistry), n.data[o] = r, r.onDestroy && (n.destroyHooks ? ? = []).push(o, r.onDestroy)) : r = n.data[o];
    let i = r.factory || (r.factory = Sn(r.type, !0)),
        s, a = Fe(_);
    try {
        let u = Ki(!1),
            c = i();
        return Ki(u), p0(n, b(), o, c), c
    } finally {
        Fe(a)
    }
}

function _0(e, t) {
    if (t)
        for (let n = t.length - 1; n >= 0; n--) {
            let r = t[n];
            if (e === r.name) return r
        }
}

function PV(e, t, n) {
    let r = e + ie,
        o = b(),
        i = vs(o, r);
    return Kl(o, r) ? nv(o, Ut(), t, i.transform, n, i) : i.transform(n)
}

function kV(e, t, n, r) {
    let o = e + ie,
        i = b(),
        s = vs(i, o);
    return Kl(i, o) ? rv(i, Ut(), t, s.transform, n, r, s) : s.transform(n, r)
}

function LV(e, t, n, r, o) {
    let i = e + ie,
        s = b(),
        a = vs(s, i);
    return Kl(s, i) ? ov(s, Ut(), t, a.transform, n, r, o, a) : a.transform(n, r, o)
}

function Kl(e, t) {
    return e[N].data[t].pure
}

function VV(e, t) {
    return Vs(e, t)
}
var Pi = null;

function M0(e) {
    Pi !== null && (e.defaultEncapsulation !== Pi.defaultEncapsulation || e.preserveWhitespaces !== Pi.preserveWhitespaces) || (Pi = e)
}
var Gs = (() => {
    class e {
        log(n) {
            console.log(n)
        }
        warn(n) {
            console.warn(n)
        }
        static {
            this.\u0275fac = function(r) {
                return new(r || e)
            }
        }
        static {
            this.\u0275prov = E({
                token: e,
                factory: e.\u0275fac,
                providedIn: "platform"
            })
        }
    }
    return e
})();
var Jl = new C(""),
    Io = new C(""),
    Ws = (() => {
        class e {
            constructor(n, r, o) {
                this._ngZone = n, this.registry = r, this._pendingCount = 0, this._isZoneStable = !0, this._callbacks = [], this.taskTrackingZone = null, Xl || (S0(o), o.addToWindow(r)), this._watchAngularEvents(), n.run(() => {
                    this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone")
                })
            }
            _watchAngularEvents() {
                this._ngZone.onUnstable.subscribe({
                    next: () => {
                        this._isZoneStable = !1
                    }
                }), this._ngZone.runOutsideAngular(() => {
                    this._ngZone.onStable.subscribe({
                        next: () => {
                            q.assertNotInAngularZone(), queueMicrotask(() => {
                                this._isZoneStable = !0, this._runCallbacksIfReady()
                            })
                        }
                    })
                })
            }
            increasePendingRequestCount() {
                return this._pendingCount += 1, this._pendingCount
            }
            decreasePendingRequestCount() {
                if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
                return this._runCallbacksIfReady(), this._pendingCount
            }
            isStable() {
                return this._isZoneStable && this._pendingCount === 0 && !this._ngZone.hasPendingMacrotasks
            }
            _runCallbacksIfReady() {
                if (this.isStable()) queueMicrotask(() => {
                    for (; this._callbacks.length !== 0;) {
                        let n = this._callbacks.pop();
                        clearTimeout(n.timeoutId), n.doneCb()
                    }
                });
                else {
                    let n = this.getPendingTasks();
                    this._callbacks = this._callbacks.filter(r => r.updateCb && r.updateCb(n) ? (clearTimeout(r.timeoutId), !1) : !0)
                }
            }
            getPendingTasks() {
                return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(n => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data
                })) : []
            }
            addCallback(n, r, o) {
                let i = -1;
                r && r > 0 && (i = setTimeout(() => {
                    this._callbacks = this._callbacks.filter(s => s.timeoutId !== i), n()
                }, r)), this._callbacks.push({
                    doneCb: n,
                    timeoutId: i,
                    updateCb: o
                })
            }
            whenStable(n, r, o) {
                if (o && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                this.addCallback(n, r, o), this._runCallbacksIfReady()
            }
            getPendingRequestCount() {
                return this._pendingCount
            }
            registerApplication(n) {
                this.registry.registerApplication(n, this)
            }
            unregisterApplication(n) {
                this.registry.unregisterApplication(n)
            }
            findProviders(n, r, o) {
                return []
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(M(q), M(qs), M(Io))
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac
                })
            }
        }
        return e
    })(),
    qs = (() => {
        class e {
            constructor() {
                this._applications = new Map
            }
            registerApplication(n, r) {
                this._applications.set(n, r)
            }
            unregisterApplication(n) {
                this._applications.delete(n)
            }
            unregisterAllApplications() {
                this._applications.clear()
            }
            getTestability(n) {
                return this._applications.get(n) || null
            }
            getAllTestabilities() {
                return Array.from(this._applications.values())
            }
            getAllRootElements() {
                return Array.from(this._applications.keys())
            }
            findTestabilityInTree(n, r = !0) {
                return Xl ? .findTestabilityInTree(this, n, r) ? ? null
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "platform"
                })
            }
        }
        return e
    })();

function S0(e) {
    Xl = e
}
var Xl;

function cn(e) {
    return !!e && typeof e.then == "function"
}

function ed(e) {
    return !!e && typeof e.subscribe == "function"
}
var Zs = new C(""),
    iv = (() => {
        class e {
            constructor() {
                this.initialized = !1, this.done = !1, this.donePromise = new Promise((n, r) => {
                    this.resolve = n, this.reject = r
                }), this.appInits = m(Zs, {
                    optional: !0
                }) ? ? []
            }
            runInitializers() {
                if (this.initialized) return;
                let n = [];
                for (let o of this.appInits) {
                    let i = o();
                    if (cn(i)) n.push(i);
                    else if (ed(i)) {
                        let s = new Promise((a, u) => {
                            i.subscribe({
                                complete: a,
                                error: u
                            })
                        });
                        n.push(s)
                    }
                }
                let r = () => {
                    this.done = !0, this.resolve()
                };
                Promise.all(n).then(() => {
                    r()
                }).catch(o => {
                    this.reject(o)
                }), n.length === 0 && r(), this.initialized = !0
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
            }
        }
        return e
    })(),
    Ys = new C("");

function T0() {
    xf(() => {
        throw new D(600, !1)
    })
}

function A0(e) {
    return e.isBoundToModule
}

function x0(e, t, n) {
    try {
        let r = n();
        return cn(r) ? r.catch(o => {
            throw t.runOutsideAngular(() => e.handleError(o)), o
        }) : r
    } catch (r) {
        throw t.runOutsideAngular(() => e.handleError(r)), r
    }
}

function sv(e, t) {
    return Array.isArray(t) ? t.reduce(sv, e) : y(y({}, e), t)
}
var Vn = (() => {
    class e {
        constructor() {
            this._bootstrapListeners = [], this._runningTick = !1, this._destroyed = !1, this._destroyListeners = [], this._views = [], this.internalErrorHandler = m(ig), this.afterRenderEffectManager = m(Gl), this.componentTypes = [], this.components = [], this.isStable = m(Ln).hasPendingTasks.pipe(O(n => !n)), this._injector = m(Te)
        }
        get destroyed() {
            return this._destroyed
        }
        get injector() {
            return this._injector
        }
        bootstrap(n, r) {
            let o = n instanceof es;
            if (!this._injector.get(iv).done) {
                let f = !o && ap(n),
                    h = !1;
                throw new D(405, h)
            }
            let s;
            o ? s = n : s = this._injector.get(js).resolveComponentFactory(n), this.componentTypes.push(s.componentType);
            let a = A0(s) ? void 0 : this._injector.get(rn),
                u = r || s.selector,
                c = s.create(Ze.NULL, [], u, a),
                l = c.location.nativeElement,
                d = c.injector.get(Jl, null);
            return d ? .registerApplication(l), c.onDestroy(() => {
                this.detachView(c.hostView), Bi(this.components, c), d ? .unregisterApplication(l)
            }), this._loadComponent(c), c
        }
        tick() {
            if (this._runningTick) throw new D(101, !1);
            try {
                this._runningTick = !0, this.detectChangesInAttachedViews()
            } catch (n) {
                this.internalErrorHandler(n)
            } finally {
                this._runningTick = !1
            }
        }
        detectChangesInAttachedViews() {
            let n = 0;
            do {
                if (n === tm) throw new D(103, !1);
                let r = n === 0;
                for (let {
                        _lView: o,
                        notifyErrorHandler: i
                    } of this._views) !r && !Qh(o) || this.detectChangesInView(o, i, r);
                this.afterRenderEffectManager.execute(), n++
            } while (this._views.some(({
                    _lView: r
                }) => Qh(r)))
        }
        detectChangesInView(n, r, o) {
            let i;
            o ? (i = 0, n[x] |= 1024) : n[x] & 64 ? i = 0 : i = 1, nm(n, r, i)
        }
        attachView(n) {
            let r = n;
            this._views.push(r), r.attachToAppRef(this)
        }
        detachView(n) {
            let r = n;
            Bi(this._views, r), r.detachFromAppRef()
        }
        _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            let r = this._injector.get(Ys, []);
            [...this._bootstrapListeners, ...r].forEach(o => o(n))
        }
        ngOnDestroy() {
            if (!this._destroyed) try {
                this._destroyListeners.forEach(n => n()), this._views.slice().forEach(n => n.destroy())
            } finally {
                this._destroyed = !0, this._views = [], this._bootstrapListeners = [], this._destroyListeners = []
            }
        }
        onDestroy(n) {
            return this._destroyListeners.push(n), () => Bi(this._destroyListeners, n)
        }
        destroy() {
            if (this._destroyed) throw new D(406, !1);
            let n = this._injector;
            n.destroy && !n.destroyed && n.destroy()
        }
        get viewCount() {
            return this._views.length
        }
        warnIfDestroyed() {}
        static {
            this.\u0275fac = function(r) {
                return new(r || e)
            }
        }
        static {
            this.\u0275prov = E({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
    }
    return e
})();

function Bi(e, t) {
    let n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
}

function Qh(e) {
    return il(e)
}
var Jc = class {
        constructor(t, n) {
            this.ngModuleFactory = t, this.componentFactories = n
        }
    },
    Qs = (() => {
        class e {
            compileModuleSync(n) {
                return new as(n)
            }
            compileModuleAsync(n) {
                return Promise.resolve(this.compileModuleSync(n))
            }
            compileModuleAndAllComponentsSync(n) {
                let r = this.compileModuleSync(n),
                    o = up(n),
                    i = Dg(o.declarations).reduce((s, a) => {
                        let u = Ot(a);
                        return u && s.push(new Rn(u)), s
                    }, []);
                return new Jc(r, i)
            }
            compileModuleAndAllComponentsAsync(n) {
                return Promise.resolve(this.compileModuleAndAllComponentsSync(n))
            }
            clearCache() {}
            clearCacheFor(n) {}
            getModuleId(n) {}
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
            }
        }
        return e
    })(),
    N0 = new C("");

function R0(e, t, n) {
    let r = new as(n);
    return Promise.resolve(r)
}

function Kh(e) {
    for (let t = e.length - 1; t >= 0; t--)
        if (e[t] !== void 0) return e[t]
}
var O0 = (() => {
    class e {
        constructor() {
            this.zone = m(q), this.applicationRef = m(Vn)
        }
        initialize() {
            this._onMicrotaskEmptySubscription || (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
                next: () => {
                    this.zone.run(() => {
                        this.applicationRef.tick()
                    })
                }
            }))
        }
        ngOnDestroy() {
            this._onMicrotaskEmptySubscription ? .unsubscribe()
        }
        static {
            this.\u0275fac = function(r) {
                return new(r || e)
            }
        }
        static {
            this.\u0275prov = E({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
    }
    return e
})();

function F0(e) {
    return [{
        provide: q,
        useFactory: e
    }, {
        provide: hr,
        multi: !0,
        useFactory: () => {
            let t = m(O0, {
                optional: !0
            });
            return () => t.initialize()
        }
    }, {
        provide: hr,
        multi: !0,
        useFactory: () => {
            let t = m(L0);
            return () => {
                t.initialize()
            }
        }
    }, {
        provide: ig,
        useFactory: P0
    }]
}

function P0() {
    let e = m(q),
        t = m(vt);
    return n => e.runOutsideAngular(() => t.handleError(n))
}

function k0(e) {
    return {
        enableLongStackTrace: !1,
        shouldCoalesceEventChangeDetection: e ? .eventCoalescing ? ? !1,
        shouldCoalesceRunChangeDetection: e ? .runCoalescing ? ? !1
    }
}
var L0 = (() => {
    class e {
        constructor() {
            this.subscription = new re, this.initialized = !1, this.zone = m(q), this.pendingTasks = m(Ln)
        }
        initialize() {
            if (this.initialized) return;
            this.initialized = !0;
            let n = null;
            !this.zone.isStable && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (n = this.pendingTasks.add()), this.zone.runOutsideAngular(() => {
                this.subscription.add(this.zone.onStable.subscribe(() => {
                    q.assertNotInAngularZone(), queueMicrotask(() => {
                        n !== null && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (this.pendingTasks.remove(n), n = null)
                    })
                }))
            }), this.subscription.add(this.zone.onUnstable.subscribe(() => {
                q.assertInAngularZone(), n ? ? = this.pendingTasks.add()
            }))
        }
        ngOnDestroy() {
            this.subscription.unsubscribe()
        }
        static {
            this.\u0275fac = function(r) {
                return new(r || e)
            }
        }
        static {
            this.\u0275prov = E({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
    }
    return e
})();

function V0() {
    return typeof $localize < "u" && $localize.locale || ls
}
var Er = new C("", {
    providedIn: "root",
    factory: () => m(Er, L.Optional | L.SkipSelf) || V0()
});
var av = new C(""),
    uv = (() => {
        class e {
            constructor(n) {
                this._injector = n, this._modules = [], this._destroyListeners = [], this._destroyed = !1
            }
            bootstrapModuleFactory(n, r) {
                let o = KI(r ? .ngZone, k0({
                    eventCoalescing: r ? .ngZoneEventCoalescing,
                    runCoalescing: r ? .ngZoneRunCoalescing
                }));
                return o.run(() => {
                    let i = Lb(n.moduleType, this.injector, F0(() => o)),
                        s = i.injector.get(vt, null);
                    return o.runOutsideAngular(() => {
                        let a = o.onError.subscribe({
                            next: u => {
                                s.handleError(u)
                            }
                        });
                        i.onDestroy(() => {
                            Bi(this._modules, i), a.unsubscribe()
                        })
                    }), x0(s, o, () => {
                        let a = i.injector.get(iv);
                        return a.runInitializers(), a.donePromise.then(() => {
                            let u = i.injector.get(Er, ls);
                            return __(u || ls), this._moduleDoBootstrap(i), i
                        })
                    })
                })
            }
            bootstrapModule(n, r = []) {
                let o = sv({}, r);
                return R0(this.injector, o, n).then(i => this.bootstrapModuleFactory(i, o))
            }
            _moduleDoBootstrap(n) {
                let r = n.injector.get(Vn);
                if (n._bootstrapComponents.length > 0) n._bootstrapComponents.forEach(o => r.bootstrap(o));
                else if (n.instance.ngDoBootstrap) n.instance.ngDoBootstrap(r);
                else throw new D(-403, !1);
                this._modules.push(n)
            }
            onDestroy(n) {
                this._destroyListeners.push(n)
            }
            get injector() {
                return this._injector
            }
            destroy() {
                if (this._destroyed) throw new D(404, !1);
                this._modules.slice().forEach(r => r.destroy()), this._destroyListeners.forEach(r => r());
                let n = this._injector.get(av, null);
                n && (n.forEach(r => r()), n.clear()), this._destroyed = !0
            }
            get destroyed() {
                return this._destroyed
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(M(Ze))
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "platform"
                })
            }
        }
        return e
    })(),
    Kr = null,
    cv = new C("");

function j0(e) {
    if (Kr && !Kr.get(cv, !1)) throw new D(400, !1);
    T0(), Kr = e;
    let t = e.get(uv);
    return B0(e), t
}

function td(e, t, n = []) {
    let r = `Platform: ${t}`,
        o = new C(r);
    return (i = []) => {
        let s = lv();
        if (!s || s.injector.get(cv, !1)) {
            let a = [...n, ...i, {
                provide: o,
                useValue: !0
            }];
            e ? e(a) : j0(U0(a, r))
        }
        return $0(o)
    }
}

function U0(e = [], t) {
    return Ze.create({
        name: t,
        providers: [{
            provide: Ms,
            useValue: "platform"
        }, {
            provide: av,
            useValue: new Set([() => Kr = null])
        }, ...e]
    })
}

function $0(e) {
    let t = lv();
    if (!t) throw new D(401, !1);
    return t
}

function lv() {
    return Kr ? .get(uv) ? ? null
}

function B0(e) {
    e.get(pl, null) ? .forEach(n => n())
}
var dv = td(null, "core", []),
    fv = (() => {
        class e {
            constructor(n) {}
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(M(Vn))
                }
            }
            static {
                this.\u0275mod = je({
                    type: e
                })
            }
            static {
                this.\u0275inj = Ue({})
            }
        }
        return e
    })();

function Ks(e) {
    return typeof e == "boolean" ? e : e != null && e !== "false"
}

function H0(e, t = NaN) {
    return !isNaN(parseFloat(e)) && !isNaN(Number(e)) ? Number(e) : t
}

function jV(e, t) {
    let n = Ot(e),
        r = t.elementInjector || Ss();
    return new Rn(n).create(r, t.projectableNodes, t.hostElement, t.environmentInjector)
}

function hv(e) {
    let t = Ot(e);
    if (!t) return null;
    let n = new Rn(t);
    return {
        get selector() {
            return n.selector
        },
        get type() {
            return n.componentType
        },
        get inputs() {
            return n.inputs
        },
        get outputs() {
            return n.outputs
        },
        get ngContentSelectors() {
            return n.ngContentSelectors
        },
        get isStandalone() {
            return t.standalone
        },
        get isSignal() {
            return t.signals
        }
    }
}
var Cv = null;

function bt() {
    return Cv
}

function Ev(e) {
    Cv ? ? = e
}
var sa = class {};
var ye = new C(""),
    gd = (() => {
        class e {
            historyGo(n) {
                throw new Error("")
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: () => m(z0),
                    providedIn: "platform"
                })
            }
        }
        return e
    })(),
    Iv = new C(""),
    z0 = (() => {
        class e extends gd {
            constructor() {
                super(), this._doc = m(ye), this._location = window.location, this._history = window.history
            }
            getBaseHrefFromDOM() {
                return bt().getBaseHref(this._doc)
            }
            onPopState(n) {
                let r = bt().getGlobalEventTarget(this._doc, "window");
                return r.addEventListener("popstate", n, !1), () => r.removeEventListener("popstate", n)
            }
            onHashChange(n) {
                let r = bt().getGlobalEventTarget(this._doc, "window");
                return r.addEventListener("hashchange", n, !1), () => r.removeEventListener("hashchange", n)
            }
            get href() {
                return this._location.href
            }
            get protocol() {
                return this._location.protocol
            }
            get hostname() {
                return this._location.hostname
            }
            get port() {
                return this._location.port
            }
            get pathname() {
                return this._location.pathname
            }
            get search() {
                return this._location.search
            }
            get hash() {
                return this._location.hash
            }
            set pathname(n) {
                this._location.pathname = n
            }
            pushState(n, r, o) {
                this._history.pushState(n, r, o)
            }
            replaceState(n, r, o) {
                this._history.replaceState(n, r, o)
            }
            forward() {
                this._history.forward()
            }
            back() {
                this._history.back()
            }
            historyGo(n = 0) {
                this._history.go(n)
            }
            getState() {
                return this._history.state
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: () => new e,
                    providedIn: "platform"
                })
            }
        }
        return e
    })();

function md(e, t) {
    if (e.length == 0) return t;
    if (t.length == 0) return e;
    let n = 0;
    return e.endsWith("/") && n++, t.startsWith("/") && n++, n == 2 ? e + t.substring(1) : n == 1 ? e + t : e + "/" + t
}

function pv(e) {
    let t = e.match(/#|\?|$/),
        n = t && t.index || e.length,
        r = n - (e[n - 1] === "/" ? 1 : 0);
    return e.slice(0, r) + e.slice(n)
}

function qt(e) {
    return e && e[0] !== "?" ? "?" + e : e
}
var jn = (() => {
        class e {
            historyGo(n) {
                throw new Error("")
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: () => m(vd),
                    providedIn: "root"
                })
            }
        }
        return e
    })(),
    bv = new C(""),
    vd = (() => {
        class e extends jn {
            constructor(n, r) {
                super(), this._platformLocation = n, this._removeListenerFns = [], this._baseHref = r ? ? this._platformLocation.getBaseHrefFromDOM() ? ? m(ye).location ? .origin ? ? ""
            }
            ngOnDestroy() {
                for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
            }
            onPopState(n) {
                this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n))
            }
            getBaseHref() {
                return this._baseHref
            }
            prepareExternalUrl(n) {
                return md(this._baseHref, n)
            }
            path(n = !1) {
                let r = this._platformLocation.pathname + qt(this._platformLocation.search),
                    o = this._platformLocation.hash;
                return o && n ? `${r}${o}` : r
            }
            pushState(n, r, o, i) {
                let s = this.prepareExternalUrl(o + qt(i));
                this._platformLocation.pushState(n, r, s)
            }
            replaceState(n, r, o, i) {
                let s = this.prepareExternalUrl(o + qt(i));
                this._platformLocation.replaceState(n, r, s)
            }
            forward() {
                this._platformLocation.forward()
            }
            back() {
                this._platformLocation.back()
            }
            getState() {
                return this._platformLocation.getState()
            }
            historyGo(n = 0) {
                this._platformLocation.historyGo ? .(n)
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(M(gd), M(bv, 8))
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
            }
        }
        return e
    })(),
    _v = (() => {
        class e extends jn {
            constructor(n, r) {
                super(), this._platformLocation = n, this._baseHref = "", this._removeListenerFns = [], r != null && (this._baseHref = r)
            }
            ngOnDestroy() {
                for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
            }
            onPopState(n) {
                this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n))
            }
            getBaseHref() {
                return this._baseHref
            }
            path(n = !1) {
                let r = this._platformLocation.hash ? ? "#";
                return r.length > 0 ? r.substring(1) : r
            }
            prepareExternalUrl(n) {
                let r = md(this._baseHref, n);
                return r.length > 0 ? "#" + r : r
            }
            pushState(n, r, o, i) {
                let s = this.prepareExternalUrl(o + qt(i));
                s.length == 0 && (s = this._platformLocation.pathname), this._platformLocation.pushState(n, r, s)
            }
            replaceState(n, r, o, i) {
                let s = this.prepareExternalUrl(o + qt(i));
                s.length == 0 && (s = this._platformLocation.pathname), this._platformLocation.replaceState(n, r, s)
            }
            forward() {
                this._platformLocation.forward()
            }
            back() {
                this._platformLocation.back()
            }
            getState() {
                return this._platformLocation.getState()
            }
            historyGo(n = 0) {
                this._platformLocation.historyGo ? .(n)
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(M(gd), M(bv, 8))
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac
                })
            }
        }
        return e
    })(),
    br = (() => {
        class e {
            constructor(n) {
                this._subject = new ne, this._urlChangeListeners = [], this._urlChangeSubscription = null, this._locationStrategy = n;
                let r = this._locationStrategy.getBaseHref();
                this._basePath = q0(pv(gv(r))), this._locationStrategy.onPopState(o => {
                    this._subject.emit({
                        url: this.path(!0),
                        pop: !0,
                        state: o.state,
                        type: o.type
                    })
                })
            }
            ngOnDestroy() {
                this._urlChangeSubscription ? .unsubscribe(), this._urlChangeListeners = []
            }
            path(n = !1) {
                return this.normalize(this._locationStrategy.path(n))
            }
            getState() {
                return this._locationStrategy.getState()
            }
            isCurrentPathEqualTo(n, r = "") {
                return this.path() == this.normalize(n + qt(r))
            }
            normalize(n) {
                return e.stripTrailingSlash(W0(this._basePath, gv(n)))
            }
            prepareExternalUrl(n) {
                return n && n[0] !== "/" && (n = "/" + n), this._locationStrategy.prepareExternalUrl(n)
            }
            go(n, r = "", o = null) {
                this._locationStrategy.pushState(o, "", n, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(n + qt(r)), o)
            }
            replaceState(n, r = "", o = null) {
                this._locationStrategy.replaceState(o, "", n, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(n + qt(r)), o)
            }
            forward() {
                this._locationStrategy.forward()
            }
            back() {
                this._locationStrategy.back()
            }
            historyGo(n = 0) {
                this._locationStrategy.historyGo ? .(n)
            }
            onUrlChange(n) {
                return this._urlChangeListeners.push(n), this._urlChangeSubscription ? ? = this.subscribe(r => {
                    this._notifyUrlChangeListeners(r.url, r.state)
                }), () => {
                    let r = this._urlChangeListeners.indexOf(n);
                    this._urlChangeListeners.splice(r, 1), this._urlChangeListeners.length === 0 && (this._urlChangeSubscription ? .unsubscribe(), this._urlChangeSubscription = null)
                }
            }
            _notifyUrlChangeListeners(n = "", r) {
                this._urlChangeListeners.forEach(o => o(n, r))
            }
            subscribe(n, r, o) {
                return this._subject.subscribe({
                    next: n,
                    error: r,
                    complete: o
                })
            }
            static {
                this.normalizeQueryParams = qt
            }
            static {
                this.joinWithSlash = md
            }
            static {
                this.stripTrailingSlash = pv
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(M(jn))
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: () => G0(),
                    providedIn: "root"
                })
            }
        }
        return e
    })();

function G0() {
    return new br(M(jn))
}

function W0(e, t) {
    if (!e || !t.startsWith(e)) return t;
    let n = t.substring(e.length);
    return n === "" || ["/", ";", "?", "#"].includes(n[0]) ? n : t
}

function gv(e) {
    return e.replace(/\/index.html$/, "")
}

function q0(e) {
    if (new RegExp("^(https?:)?//").test(e)) {
        let [, n] = e.split(/\/\/[^\/]+/);
        return n
    }
    return e
}
var yd = function(e) {
    return e[e.Decimal = 0] = "Decimal", e[e.Percent = 1] = "Percent", e[e.Currency = 2] = "Currency", e[e.Scientific = 3] = "Scientific", e
}(yd || {});
var Ne = function(e) {
        return e[e.Format = 0] = "Format", e[e.Standalone = 1] = "Standalone", e
    }(Ne || {}),
    Y = function(e) {
        return e[e.Narrow = 0] = "Narrow", e[e.Abbreviated = 1] = "Abbreviated", e[e.Wide = 2] = "Wide", e[e.Short = 3] = "Short", e
    }(Y || {}),
    Be = function(e) {
        return e[e.Short = 0] = "Short", e[e.Medium = 1] = "Medium", e[e.Long = 2] = "Long", e[e.Full = 3] = "Full", e
    }(Be || {}),
    le = function(e) {
        return e[e.Decimal = 0] = "Decimal", e[e.Group = 1] = "Group", e[e.List = 2] = "List", e[e.PercentSign = 3] = "PercentSign", e[e.PlusSign = 4] = "PlusSign", e[e.MinusSign = 5] = "MinusSign", e[e.Exponential = 6] = "Exponential", e[e.SuperscriptingExponent = 7] = "SuperscriptingExponent", e[e.PerMille = 8] = "PerMille", e[e.Infinity = 9] = "Infinity", e[e.NaN = 10] = "NaN", e[e.TimeSeparator = 11] = "TimeSeparator", e[e.CurrencyDecimal = 12] = "CurrencyDecimal", e[e.CurrencyGroup = 13] = "CurrencyGroup", e
    }(le || {});

function Z0(e) {
    return Ve(e)[X.LocaleId]
}

function Y0(e, t, n) {
    let r = Ve(e),
        o = [r[X.DayPeriodsFormat], r[X.DayPeriodsStandalone]],
        i = Ye(o, t);
    return Ye(i, n)
}

function Q0(e, t, n) {
    let r = Ve(e),
        o = [r[X.DaysFormat], r[X.DaysStandalone]],
        i = Ye(o, t);
    return Ye(i, n)
}

function K0(e, t, n) {
    let r = Ve(e),
        o = [r[X.MonthsFormat], r[X.MonthsStandalone]],
        i = Ye(o, t);
    return Ye(i, n)
}

function J0(e, t) {
    let r = Ve(e)[X.Eras];
    return Ye(r, t)
}

function Js(e, t) {
    let n = Ve(e);
    return Ye(n[X.DateFormat], t)
}

function Xs(e, t) {
    let n = Ve(e);
    return Ye(n[X.TimeFormat], t)
}

function ea(e, t) {
    let r = Ve(e)[X.DateTimeFormat];
    return Ye(r, t)
}

function ct(e, t) {
    let n = Ve(e),
        r = n[X.NumberSymbols][t];
    if (typeof r > "u") {
        if (t === le.CurrencyDecimal) return n[X.NumberSymbols][le.Decimal];
        if (t === le.CurrencyGroup) return n[X.NumberSymbols][le.Group]
    }
    return r
}

function Mv(e, t) {
    return Ve(e)[X.NumberFormats][t]
}

function Sv(e) {
    if (!e[X.ExtraData]) throw new Error(`Missing extra locale data for the locale "${e[X.LocaleId]}". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`)
}

function X0(e) {
    let t = Ve(e);
    return Sv(t), (t[X.ExtraData][2] || []).map(r => typeof r == "string" ? nd(r) : [nd(r[0]), nd(r[1])])
}

function eM(e, t, n) {
    let r = Ve(e);
    Sv(r);
    let o = [r[X.ExtraData][0], r[X.ExtraData][1]],
        i = Ye(o, t) || [];
    return Ye(i, n) || []
}

function Ye(e, t) {
    for (let n = t; n > -1; n--)
        if (typeof e[n] < "u") return e[n];
    throw new Error("Locale data API: locale data undefined")
}

function nd(e) {
    let [t, n] = e.split(":");
    return {
        hours: +t,
        minutes: +n
    }
}
var tM = /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
    ta = {},
    nM = /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/,
    Zt = function(e) {
        return e[e.Short = 0] = "Short", e[e.ShortGMT = 1] = "ShortGMT", e[e.Long = 2] = "Long", e[e.Extended = 3] = "Extended", e
    }(Zt || {}),
    B = function(e) {
        return e[e.FullYear = 0] = "FullYear", e[e.Month = 1] = "Month", e[e.Date = 2] = "Date", e[e.Hours = 3] = "Hours", e[e.Minutes = 4] = "Minutes", e[e.Seconds = 5] = "Seconds", e[e.FractionalSeconds = 6] = "FractionalSeconds", e[e.Day = 7] = "Day", e
    }(B || {}),
    $ = function(e) {
        return e[e.DayPeriods = 0] = "DayPeriods", e[e.Days = 1] = "Days", e[e.Months = 2] = "Months", e[e.Eras = 3] = "Eras", e
    }($ || {});

function rM(e, t, n, r) {
    let o = fM(e);
    t = Wt(n, t) || t;
    let s = [],
        a;
    for (; t;)
        if (a = nM.exec(t), a) {
            s = s.concat(a.slice(1));
            let l = s.pop();
            if (!l) break;
            t = l
        } else {
            s.push(t);
            break
        }
    let u = o.getTimezoneOffset();
    r && (u = Av(r, u), o = dM(o, r, !0));
    let c = "";
    return s.forEach(l => {
        let d = cM(l);
        c += d ? d(o, n, u) : l === "''" ? "'" : l.replace(/(^'|'$)/g, "").replace(/''/g, "'")
    }), c
}

function aa(e, t, n) {
    let r = new Date(0);
    return r.setFullYear(e, t, n), r.setHours(0, 0, 0), r
}

function Wt(e, t) {
    let n = Z0(e);
    if (ta[n] ? ? = {}, ta[n][t]) return ta[n][t];
    let r = "";
    switch (t) {
        case "shortDate":
            r = Js(e, Be.Short);
            break;
        case "mediumDate":
            r = Js(e, Be.Medium);
            break;
        case "longDate":
            r = Js(e, Be.Long);
            break;
        case "fullDate":
            r = Js(e, Be.Full);
            break;
        case "shortTime":
            r = Xs(e, Be.Short);
            break;
        case "mediumTime":
            r = Xs(e, Be.Medium);
            break;
        case "longTime":
            r = Xs(e, Be.Long);
            break;
        case "fullTime":
            r = Xs(e, Be.Full);
            break;
        case "short":
            let o = Wt(e, "shortTime"),
                i = Wt(e, "shortDate");
            r = na(ea(e, Be.Short), [o, i]);
            break;
        case "medium":
            let s = Wt(e, "mediumTime"),
                a = Wt(e, "mediumDate");
            r = na(ea(e, Be.Medium), [s, a]);
            break;
        case "long":
            let u = Wt(e, "longTime"),
                c = Wt(e, "longDate");
            r = na(ea(e, Be.Long), [u, c]);
            break;
        case "full":
            let l = Wt(e, "fullTime"),
                d = Wt(e, "fullDate");
            r = na(ea(e, Be.Full), [l, d]);
            break
    }
    return r && (ta[n][t] = r), r
}

function na(e, t) {
    return t && (e = e.replace(/\{([^}]+)}/g, function(n, r) {
        return t != null && r in t ? t[r] : n
    })), e
}

function ut(e, t, n = "-", r, o) {
    let i = "";
    (e < 0 || o && e <= 0) && (o ? e = -e + 1 : (e = -e, i = n));
    let s = String(e);
    for (; s.length < t;) s = "0" + s;
    return r && (s = s.slice(s.length - t)), i + s
}

function oM(e, t) {
    return ut(e, 3).substring(0, t)
}

function se(e, t, n = 0, r = !1, o = !1) {
    return function(i, s) {
        let a = iM(e, i);
        if ((n > 0 || a > -n) && (a += n), e === B.Hours) a === 0 && n === -12 && (a = 12);
        else if (e === B.FractionalSeconds) return oM(a, t);
        let u = ct(s, le.MinusSign);
        return ut(a, t, u, r, o)
    }
}

function iM(e, t) {
    switch (e) {
        case B.FullYear:
            return t.getFullYear();
        case B.Month:
            return t.getMonth();
        case B.Date:
            return t.getDate();
        case B.Hours:
            return t.getHours();
        case B.Minutes:
            return t.getMinutes();
        case B.Seconds:
            return t.getSeconds();
        case B.FractionalSeconds:
            return t.getMilliseconds();
        case B.Day:
            return t.getDay();
        default:
            throw new Error(`Unknown DateType value "${e}".`)
    }
}

function K(e, t, n = Ne.Format, r = !1) {
    return function(o, i) {
        return sM(o, i, e, t, n, r)
    }
}

function sM(e, t, n, r, o, i) {
    switch (n) {
        case $.Months:
            return K0(t, o, r)[e.getMonth()];
        case $.Days:
            return Q0(t, o, r)[e.getDay()];
        case $.DayPeriods:
            let s = e.getHours(),
                a = e.getMinutes();
            if (i) {
                let c = X0(t),
                    l = eM(t, o, r),
                    d = c.findIndex(f => {
                        if (Array.isArray(f)) {
                            let [h, p] = f, g = s >= h.hours && a >= h.minutes, v = s < p.hours || s === p.hours && a < p.minutes;
                            if (h.hours < p.hours) {
                                if (g && v) return !0
                            } else if (g || v) return !0
                        } else if (f.hours === s && f.minutes === a) return !0;
                        return !1
                    });
                if (d !== -1) return l[d]
            }
            return Y0(t, o, r)[s < 12 ? 0 : 1];
        case $.Eras:
            return J0(t, r)[e.getFullYear() <= 0 ? 0 : 1];
        default:
            let u = n;
            throw new Error(`unexpected translation type ${u}`)
    }
}

function ra(e) {
    return function(t, n, r) {
        let o = -1 * r,
            i = ct(n, le.MinusSign),
            s = o > 0 ? Math.floor(o / 60) : Math.ceil(o / 60);
        switch (e) {
            case Zt.Short:
                return (o >= 0 ? "+" : "") + ut(s, 2, i) + ut(Math.abs(o % 60), 2, i);
            case Zt.ShortGMT:
                return "GMT" + (o >= 0 ? "+" : "") + ut(s, 1, i);
            case Zt.Long:
                return "GMT" + (o >= 0 ? "+" : "") + ut(s, 2, i) + ":" + ut(Math.abs(o % 60), 2, i);
            case Zt.Extended:
                return r === 0 ? "Z" : (o >= 0 ? "+" : "") + ut(s, 2, i) + ":" + ut(Math.abs(o % 60), 2, i);
            default:
                throw new Error(`Unknown zone width "${e}"`)
        }
    }
}
var aM = 0,
    ia = 4;

function uM(e) {
    let t = aa(e, aM, 1).getDay();
    return aa(e, 0, 1 + (t <= ia ? ia : ia + 7) - t)
}

function Tv(e) {
    let t = e.getDay(),
        n = t === 0 ? -3 : ia - t;
    return aa(e.getFullYear(), e.getMonth(), e.getDate() + n)
}

function rd(e, t = !1) {
    return function(n, r) {
        let o;
        if (t) {
            let i = new Date(n.getFullYear(), n.getMonth(), 1).getDay() - 1,
                s = n.getDate();
            o = 1 + Math.floor((s + i) / 7)
        } else {
            let i = Tv(n),
                s = uM(i.getFullYear()),
                a = i.getTime() - s.getTime();
            o = 1 + Math.round(a / 6048e5)
        }
        return ut(o, e, ct(r, le.MinusSign))
    }
}

function oa(e, t = !1) {
    return function(n, r) {
        let i = Tv(n).getFullYear();
        return ut(i, e, ct(r, le.MinusSign), t)
    }
}
var od = {};

function cM(e) {
    if (od[e]) return od[e];
    let t;
    switch (e) {
        case "G":
        case "GG":
        case "GGG":
            t = K($.Eras, Y.Abbreviated);
            break;
        case "GGGG":
            t = K($.Eras, Y.Wide);
            break;
        case "GGGGG":
            t = K($.Eras, Y.Narrow);
            break;
        case "y":
            t = se(B.FullYear, 1, 0, !1, !0);
            break;
        case "yy":
            t = se(B.FullYear, 2, 0, !0, !0);
            break;
        case "yyy":
            t = se(B.FullYear, 3, 0, !1, !0);
            break;
        case "yyyy":
            t = se(B.FullYear, 4, 0, !1, !0);
            break;
        case "Y":
            t = oa(1);
            break;
        case "YY":
            t = oa(2, !0);
            break;
        case "YYY":
            t = oa(3);
            break;
        case "YYYY":
            t = oa(4);
            break;
        case "M":
        case "L":
            t = se(B.Month, 1, 1);
            break;
        case "MM":
        case "LL":
            t = se(B.Month, 2, 1);
            break;
        case "MMM":
            t = K($.Months, Y.Abbreviated);
            break;
        case "MMMM":
            t = K($.Months, Y.Wide);
            break;
        case "MMMMM":
            t = K($.Months, Y.Narrow);
            break;
        case "LLL":
            t = K($.Months, Y.Abbreviated, Ne.Standalone);
            break;
        case "LLLL":
            t = K($.Months, Y.Wide, Ne.Standalone);
            break;
        case "LLLLL":
            t = K($.Months, Y.Narrow, Ne.Standalone);
            break;
        case "w":
            t = rd(1);
            break;
        case "ww":
            t = rd(2);
            break;
        case "W":
            t = rd(1, !0);
            break;
        case "d":
            t = se(B.Date, 1);
            break;
        case "dd":
            t = se(B.Date, 2);
            break;
        case "c":
        case "cc":
            t = se(B.Day, 1);
            break;
        case "ccc":
            t = K($.Days, Y.Abbreviated, Ne.Standalone);
            break;
        case "cccc":
            t = K($.Days, Y.Wide, Ne.Standalone);
            break;
        case "ccccc":
            t = K($.Days, Y.Narrow, Ne.Standalone);
            break;
        case "cccccc":
            t = K($.Days, Y.Short, Ne.Standalone);
            break;
        case "E":
        case "EE":
        case "EEE":
            t = K($.Days, Y.Abbreviated);
            break;
        case "EEEE":
            t = K($.Days, Y.Wide);
            break;
        case "EEEEE":
            t = K($.Days, Y.Narrow);
            break;
        case "EEEEEE":
            t = K($.Days, Y.Short);
            break;
        case "a":
        case "aa":
        case "aaa":
            t = K($.DayPeriods, Y.Abbreviated);
            break;
        case "aaaa":
            t = K($.DayPeriods, Y.Wide);
            break;
        case "aaaaa":
            t = K($.DayPeriods, Y.Narrow);
            break;
        case "b":
        case "bb":
        case "bbb":
            t = K($.DayPeriods, Y.Abbreviated, Ne.Standalone, !0);
            break;
        case "bbbb":
            t = K($.DayPeriods, Y.Wide, Ne.Standalone, !0);
            break;
        case "bbbbb":
            t = K($.DayPeriods, Y.Narrow, Ne.Standalone, !0);
            break;
        case "B":
        case "BB":
        case "BBB":
            t = K($.DayPeriods, Y.Abbreviated, Ne.Format, !0);
            break;
        case "BBBB":
            t = K($.DayPeriods, Y.Wide, Ne.Format, !0);
            break;
        case "BBBBB":
            t = K($.DayPeriods, Y.Narrow, Ne.Format, !0);
            break;
        case "h":
            t = se(B.Hours, 1, -12);
            break;
        case "hh":
            t = se(B.Hours, 2, -12);
            break;
        case "H":
            t = se(B.Hours, 1);
            break;
        case "HH":
            t = se(B.Hours, 2);
            break;
        case "m":
            t = se(B.Minutes, 1);
            break;
        case "mm":
            t = se(B.Minutes, 2);
            break;
        case "s":
            t = se(B.Seconds, 1);
            break;
        case "ss":
            t = se(B.Seconds, 2);
            break;
        case "S":
            t = se(B.FractionalSeconds, 1);
            break;
        case "SS":
            t = se(B.FractionalSeconds, 2);
            break;
        case "SSS":
            t = se(B.FractionalSeconds, 3);
            break;
        case "Z":
        case "ZZ":
        case "ZZZ":
            t = ra(Zt.Short);
            break;
        case "ZZZZZ":
            t = ra(Zt.Extended);
            break;
        case "O":
        case "OO":
        case "OOO":
        case "z":
        case "zz":
        case "zzz":
            t = ra(Zt.ShortGMT);
            break;
        case "OOOO":
        case "ZZZZ":
        case "zzzz":
            t = ra(Zt.Long);
            break;
        default:
            return null
    }
    return od[e] = t, t
}

function Av(e, t) {
    e = e.replace(/:/g, "");
    let n = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
    return isNaN(n) ? t : n
}

function lM(e, t) {
    return e = new Date(e.getTime()), e.setMinutes(e.getMinutes() + t), e
}

function dM(e, t, n) {
    let r = n ? -1 : 1,
        o = e.getTimezoneOffset(),
        i = Av(t, o);
    return lM(e, r * (i - o))
}

function fM(e) {
    if (mv(e)) return e;
    if (typeof e == "number" && !isNaN(e)) return new Date(e);
    if (typeof e == "string") {
        if (e = e.trim(), /^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e)) {
            let [o, i = 1, s = 1] = e.split("-").map(a => +a);
            return aa(o, i - 1, s)
        }
        let n = parseFloat(e);
        if (!isNaN(e - n)) return new Date(n);
        let r;
        if (r = e.match(tM)) return hM(r)
    }
    let t = new Date(e);
    if (!mv(t)) throw new Error(`Unable to convert "${e}" into a date`);
    return t
}

function hM(e) {
    let t = new Date(0),
        n = 0,
        r = 0,
        o = e[8] ? t.setUTCFullYear : t.setFullYear,
        i = e[8] ? t.setUTCHours : t.setHours;
    e[9] && (n = Number(e[9] + e[10]), r = Number(e[9] + e[11])), o.call(t, Number(e[1]), Number(e[2]) - 1, Number(e[3]));
    let s = Number(e[4] || 0) - n,
        a = Number(e[5] || 0) - r,
        u = Number(e[6] || 0),
        c = Math.floor(parseFloat("0." + (e[7] || 0)) * 1e3);
    return i.call(t, s, a, u, c), t
}

function mv(e) {
    return e instanceof Date && !isNaN(e.valueOf())
}
var pM = /^(\d+)?\.((\d+)(-(\d+))?)?$/,
    vv = 22,
    ua = ".",
    _o = "0",
    gM = ";",
    mM = ",",
    id = "#";
var vM = "%";

function xv(e, t, n, r, o, i, s = !1) {
    let a = "",
        u = !1;
    if (!isFinite(e)) a = ct(n, le.Infinity);
    else {
        let c = CM(e);
        s && (c = wM(c));
        let l = t.minInt,
            d = t.minFrac,
            f = t.maxFrac;
        if (i) {
            let V = i.match(pM);
            if (V === null) throw new Error(`${i} is not a valid digit info`);
            let U = V[1],
                J = V[3],
                ee = V[5];
            U != null && (l = sd(U)), J != null && (d = sd(J)), ee != null ? f = sd(ee) : J != null && d > f && (f = d)
        }
        EM(c, d, f);
        let h = c.digits,
            p = c.integerLen,
            g = c.exponent,
            v = [];
        for (u = h.every(V => !V); p < l; p++) h.unshift(0);
        for (; p < 0; p++) h.unshift(0);
        p > 0 ? v = h.splice(p, h.length) : (v = h, h = [0]);
        let w = [];
        for (h.length >= t.lgSize && w.unshift(h.splice(-t.lgSize, h.length).join("")); h.length > t.gSize;) w.unshift(h.splice(-t.gSize, h.length).join(""));
        h.length && w.unshift(h.join("")), a = w.join(ct(n, r)), v.length && (a += ct(n, o) + v.join("")), g && (a += ct(n, le.Exponential) + "+" + g)
    }
    return e < 0 && !u ? a = t.negPre + a + t.negSuf : a = t.posPre + a + t.posSuf, a
}

function yM(e, t, n) {
    let r = Mv(t, yd.Percent),
        o = Nv(r, ct(t, le.MinusSign));
    return xv(e, o, t, le.Group, le.Decimal, n, !0).replace(new RegExp(vM, "g"), ct(t, le.PercentSign))
}

function DM(e, t, n) {
    let r = Mv(t, yd.Decimal),
        o = Nv(r, ct(t, le.MinusSign));
    return xv(e, o, t, le.Group, le.Decimal, n)
}

function Nv(e, t = "-") {
    let n = {
            minInt: 1,
            minFrac: 0,
            maxFrac: 0,
            posPre: "",
            posSuf: "",
            negPre: "",
            negSuf: "",
            gSize: 0,
            lgSize: 0
        },
        r = e.split(gM),
        o = r[0],
        i = r[1],
        s = o.indexOf(ua) !== -1 ? o.split(ua) : [o.substring(0, o.lastIndexOf(_o) + 1), o.substring(o.lastIndexOf(_o) + 1)],
        a = s[0],
        u = s[1] || "";
    n.posPre = a.substring(0, a.indexOf(id));
    for (let l = 0; l < u.length; l++) {
        let d = u.charAt(l);
        d === _o ? n.minFrac = n.maxFrac = l + 1 : d === id ? n.maxFrac = l + 1 : n.posSuf += d
    }
    let c = a.split(mM);
    if (n.gSize = c[1] ? c[1].length : 0, n.lgSize = c[2] || c[1] ? (c[2] || c[1]).length : 0, i) {
        let l = o.length - n.posPre.length - n.posSuf.length,
            d = i.indexOf(id);
        n.negPre = i.substring(0, d).replace(/'/g, ""), n.negSuf = i.slice(d + l).replace(/'/g, "")
    } else n.negPre = t + n.posPre, n.negSuf = n.posSuf;
    return n
}

function wM(e) {
    if (e.digits[0] === 0) return e;
    let t = e.digits.length - e.integerLen;
    return e.exponent ? e.exponent += 2 : (t === 0 ? e.digits.push(0, 0) : t === 1 && e.digits.push(0), e.integerLen += 2), e
}

function CM(e) {
    let t = Math.abs(e) + "",
        n = 0,
        r, o, i, s, a;
    for ((o = t.indexOf(ua)) > -1 && (t = t.replace(ua, "")), (i = t.search(/e/i)) > 0 ? (o < 0 && (o = i), o += +t.slice(i + 1), t = t.substring(0, i)) : o < 0 && (o = t.length), i = 0; t.charAt(i) === _o; i++);
    if (i === (a = t.length)) r = [0], o = 1;
    else {
        for (a--; t.charAt(a) === _o;) a--;
        for (o -= i, r = [], s = 0; i <= a; i++, s++) r[s] = Number(t.charAt(i))
    }
    return o > vv && (r = r.splice(0, vv - 1), n = o - 1, o = 1), {
        digits: r,
        exponent: n,
        integerLen: o
    }
}

function EM(e, t, n) {
    if (t > n) throw new Error(`The minimum number of digits after fraction (${t}) is higher than the maximum (${n}).`);
    let r = e.digits,
        o = r.length - e.integerLen,
        i = Math.min(Math.max(t, o), n),
        s = i + e.integerLen,
        a = r[s];
    if (s > 0) {
        r.splice(Math.max(e.integerLen, s));
        for (let d = s; d < r.length; d++) r[d] = 0
    } else {
        o = Math.max(0, o), e.integerLen = 1, r.length = Math.max(1, s = i + 1), r[0] = 0;
        for (let d = 1; d < s; d++) r[d] = 0
    }
    if (a >= 5)
        if (s - 1 < 0) {
            for (let d = 0; d > s; d--) r.unshift(0), e.integerLen++;
            r.unshift(1), e.integerLen++
        } else r[s - 1]++;
    for (; o < Math.max(0, i); o++) r.push(0);
    let u = i !== 0,
        c = t + e.integerLen,
        l = r.reduceRight(function(d, f, h, p) {
            return f = f + d, p[h] = f < 10 ? f : f - 10, u && (p[h] === 0 && h >= c ? p.pop() : u = !1), f >= 10 ? 1 : 0
        }, 0);
    l && (r.unshift(l), e.integerLen++)
}

function sd(e) {
    let t = parseInt(e);
    if (isNaN(t)) throw new Error("Invalid integer literal when parsing " + e);
    return t
}

function nj(e, t, n) {
    return Fm(e, t, n)
}

function la(e, t) {
    t = encodeURIComponent(t);
    for (let n of e.split(";")) {
        let r = n.indexOf("="),
            [o, i] = r == -1 ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
        if (o.trim() === t) return decodeURIComponent(i)
    }
    return null
}
var ad = /\s+/,
    yv = [],
    rj = (() => {
        class e {
            constructor(n, r) {
                this._ngEl = n, this._renderer = r, this.initialClasses = yv, this.stateMap = new Map
            }
            set klass(n) {
                this.initialClasses = n != null ? n.trim().split(ad) : yv
            }
            set ngClass(n) {
                this.rawClass = typeof n == "string" ? n.trim().split(ad) : n
            }
            ngDoCheck() {
                for (let r of this.initialClasses) this._updateState(r, !0);
                let n = this.rawClass;
                if (Array.isArray(n) || n instanceof Set)
                    for (let r of n) this._updateState(r, !0);
                else if (n != null)
                    for (let r of Object.keys(n)) this._updateState(r, !!n[r]);
                this._applyStateDiff()
            }
            _updateState(n, r) {
                let o = this.stateMap.get(n);
                o !== void 0 ? (o.enabled !== r && (o.changed = !0, o.enabled = r), o.touched = !0) : this.stateMap.set(n, {
                    enabled: r,
                    changed: !0,
                    touched: !0
                })
            }
            _applyStateDiff() {
                for (let n of this.stateMap) {
                    let r = n[0],
                        o = n[1];
                    o.changed ? (this._toggleClass(r, o.enabled), o.changed = !1) : o.touched || (o.enabled && this._toggleClass(r, !1), this.stateMap.delete(r)), o.touched = !1
                }
            }
            _toggleClass(n, r) {
                n = n.trim(), n.length > 0 && n.split(ad).forEach(o => {
                    r ? this._renderer.addClass(this._ngEl.nativeElement, o) : this._renderer.removeClass(this._ngEl.nativeElement, o)
                })
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(xe), _(it))
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["", "ngClass", ""]
                    ],
                    inputs: {
                        klass: [Se.None, "class", "klass"],
                        ngClass: "ngClass"
                    },
                    standalone: !0
                })
            }
        }
        return e
    })();
var ud = class {
        constructor(t, n, r, o) {
            this.$implicit = t, this.ngForOf = n, this.index = r, this.count = o
        }
        get first() {
            return this.index === 0
        }
        get last() {
            return this.index === this.count - 1
        }
        get even() {
            return this.index % 2 === 0
        }
        get odd() {
            return !this.even
        }
    },
    oj = (() => {
        class e {
            set ngForOf(n) {
                this._ngForOf = n, this._ngForOfDirty = !0
            }
            set ngForTrackBy(n) {
                this._trackByFn = n
            }
            get ngForTrackBy() {
                return this._trackByFn
            }
            constructor(n, r, o) {
                this._viewContainer = n, this._template = r, this._differs = o, this._ngForOf = null, this._ngForOfDirty = !0, this._differ = null
            }
            set ngForTemplate(n) {
                n && (this._template = n)
            }
            ngDoCheck() {
                if (this._ngForOfDirty) {
                    this._ngForOfDirty = !1;
                    let n = this._ngForOf;
                    if (!this._differ && n)
                        if (0) try {} catch {} else this._differ = this._differs.find(n).create(this.ngForTrackBy)
                }
                if (this._differ) {
                    let n = this._differ.diff(this._ngForOf);
                    n && this._applyChanges(n)
                }
            }
            _applyChanges(n) {
                let r = this._viewContainer;
                n.forEachOperation((o, i, s) => {
                    if (o.previousIndex == null) r.createEmbeddedView(this._template, new ud(o.item, this._ngForOf, -1, -1), s === null ? void 0 : s);
                    else if (s == null) r.remove(i === null ? void 0 : i);
                    else if (i !== null) {
                        let a = r.get(i);
                        r.move(a, s), Dv(a, o)
                    }
                });
                for (let o = 0, i = r.length; o < i; o++) {
                    let a = r.get(o).context;
                    a.index = o, a.count = i, a.ngForOf = this._ngForOf
                }
                n.forEachIdentityChange(o => {
                    let i = r.get(o.currentIndex);
                    Dv(i, o)
                })
            }
            static ngTemplateContextGuard(n, r) {
                return !0
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(st), _(Vt), _($l))
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["", "ngFor", "", "ngForOf", ""]
                    ],
                    inputs: {
                        ngForOf: "ngForOf",
                        ngForTrackBy: "ngForTrackBy",
                        ngForTemplate: "ngForTemplate"
                    },
                    standalone: !0
                })
            }
        }
        return e
    })();

function Dv(e, t) {
    e.context.$implicit = t.item
}
var ij = (() => {
        class e {
            constructor(n, r) {
                this._viewContainer = n, this._context = new cd, this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = r
            }
            set ngIf(n) {
                this._context.$implicit = this._context.ngIf = n, this._updateView()
            }
            set ngIfThen(n) {
                wv("ngIfThen", n), this._thenTemplateRef = n, this._thenViewRef = null, this._updateView()
            }
            set ngIfElse(n) {
                wv("ngIfElse", n), this._elseTemplateRef = n, this._elseViewRef = null, this._updateView()
            }
            _updateView() {
                this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
            }
            static ngTemplateContextGuard(n, r) {
                return !0
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(st), _(Vt))
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["", "ngIf", ""]
                    ],
                    inputs: {
                        ngIf: "ngIf",
                        ngIfThen: "ngIfThen",
                        ngIfElse: "ngIfElse"
                    },
                    standalone: !0
                })
            }
        }
        return e
    })(),
    cd = class {
        constructor() {
            this.$implicit = null, this.ngIf = null
        }
    };

function wv(e, t) {
    if (!!!(!t || t.createEmbeddedView)) throw new Error(`${e} must be a TemplateRef, but received '${Me(t)}'.`)
}
var IM = !0,
    ca = class {
        constructor(t, n) {
            this._viewContainerRef = t, this._templateRef = n, this._created = !1
        }
        create() {
            this._created = !0, this._viewContainerRef.createEmbeddedView(this._templateRef)
        }
        destroy() {
            this._created = !1, this._viewContainerRef.clear()
        }
        enforceState(t) {
            t && !this._created ? this.create() : !t && this._created && this.destroy()
        }
    },
    Rv = (() => {
        class e {
            constructor() {
                this._defaultViews = [], this._defaultUsed = !1, this._caseCount = 0, this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1
            }
            set ngSwitch(n) {
                this._ngSwitch = n, this._caseCount === 0 && this._updateDefaultCases(!0)
            }
            _addCase() {
                return this._caseCount++
            }
            _addDefault(n) {
                this._defaultViews.push(n)
            }
            _matchCase(n) {
                let r = IM ? n === this._ngSwitch : n == this._ngSwitch;
                return this._lastCasesMatched || = r, this._lastCaseCheckIndex++, this._lastCaseCheckIndex === this._caseCount && (this._updateDefaultCases(!this._lastCasesMatched), this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1), r
            }
            _updateDefaultCases(n) {
                if (this._defaultViews.length > 0 && n !== this._defaultUsed) {
                    this._defaultUsed = n;
                    for (let r of this._defaultViews) r.enforceState(n)
                }
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["", "ngSwitch", ""]
                    ],
                    inputs: {
                        ngSwitch: "ngSwitch"
                    },
                    standalone: !0
                })
            }
        }
        return e
    })(),
    sj = (() => {
        class e {
            constructor(n, r, o) {
                this.ngSwitch = o, o._addCase(), this._view = new ca(n, r)
            }
            ngDoCheck() {
                this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase))
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(st), _(Vt), _(Rv, 9))
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["", "ngSwitchCase", ""]
                    ],
                    inputs: {
                        ngSwitchCase: "ngSwitchCase"
                    },
                    standalone: !0
                })
            }
        }
        return e
    })(),
    aj = (() => {
        class e {
            constructor(n, r, o) {
                o._addDefault(new ca(n, r))
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(st), _(Vt), _(Rv, 9))
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["", "ngSwitchDefault", ""]
                    ],
                    standalone: !0
                })
            }
        }
        return e
    })();
var uj = (() => {
        class e {
            constructor(n, r, o) {
                this._ngEl = n, this._differs = r, this._renderer = o, this._ngStyle = null, this._differ = null
            }
            set ngStyle(n) {
                this._ngStyle = n, !this._differ && n && (this._differ = this._differs.find(n).create())
            }
            ngDoCheck() {
                if (this._differ) {
                    let n = this._differ.diff(this._ngStyle);
                    n && this._applyChanges(n)
                }
            }
            _setStyle(n, r) {
                let [o, i] = n.split("."), s = o.indexOf("-") === -1 ? void 0 : Dt.DashCase;
                r != null ? this._renderer.setStyle(this._ngEl.nativeElement, o, i ? `${r}${i}` : r, s) : this._renderer.removeStyle(this._ngEl.nativeElement, o, s)
            }
            _applyChanges(n) {
                n.forEachRemovedItem(r => this._setStyle(r.key, null)), n.forEachAddedItem(r => this._setStyle(r.key, r.currentValue)), n.forEachChangedItem(r => this._setStyle(r.key, r.currentValue))
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(xe), _(Bl), _(it))
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["", "ngStyle", ""]
                    ],
                    inputs: {
                        ngStyle: "ngStyle"
                    },
                    standalone: !0
                })
            }
        }
        return e
    })(),
    cj = (() => {
        class e {
            constructor(n) {
                this._viewContainerRef = n, this._viewRef = null, this.ngTemplateOutletContext = null, this.ngTemplateOutlet = null, this.ngTemplateOutletInjector = null
            }
            ngOnChanges(n) {
                if (this._shouldRecreateView(n)) {
                    let r = this._viewContainerRef;
                    if (this._viewRef && r.remove(r.indexOf(this._viewRef)), !this.ngTemplateOutlet) {
                        this._viewRef = null;
                        return
                    }
                    let o = this._createContextForwardProxy();
                    this._viewRef = r.createEmbeddedView(this.ngTemplateOutlet, o, {
                        injector: this.ngTemplateOutletInjector ? ? void 0
                    })
                }
            }
            _shouldRecreateView(n) {
                return !!n.ngTemplateOutlet || !!n.ngTemplateOutletInjector
            }
            _createContextForwardProxy() {
                return new Proxy({}, {
                    set: (n, r, o) => this.ngTemplateOutletContext ? Reflect.set(this.ngTemplateOutletContext, r, o) : !1,
                    get: (n, r, o) => {
                        if (this.ngTemplateOutletContext) return Reflect.get(this.ngTemplateOutletContext, r, o)
                    }
                })
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(st))
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["", "ngTemplateOutlet", ""]
                    ],
                    inputs: {
                        ngTemplateOutletContext: "ngTemplateOutletContext",
                        ngTemplateOutlet: "ngTemplateOutlet",
                        ngTemplateOutletInjector: "ngTemplateOutletInjector"
                    },
                    standalone: !0,
                    features: [an]
                })
            }
        }
        return e
    })();

function _r(e, t) {
    return new D(2100, !1)
}
var ld = class {
        createSubscription(t, n) {
            return jl(() => t.subscribe({
                next: n,
                error: r => {
                    throw r
                }
            }))
        }
        dispose(t) {
            jl(() => t.unsubscribe())
        }
    },
    dd = class {
        createSubscription(t, n) {
            return t.then(n, r => {
                throw r
            })
        }
        dispose(t) {}
    },
    bM = new dd,
    _M = new ld,
    lj = (() => {
        class e {
            constructor(n) {
                this._latestValue = null, this._subscription = null, this._obj = null, this._strategy = null, this._ref = n
            }
            ngOnDestroy() {
                this._subscription && this._dispose(), this._ref = null
            }
            transform(n) {
                return this._obj ? n !== this._obj ? (this._dispose(), this.transform(n)) : this._latestValue : (n && this._subscribe(n), this._latestValue)
            }
            _subscribe(n) {
                this._obj = n, this._strategy = this._selectStrategy(n), this._subscription = this._strategy.createSubscription(n, r => this._updateLatestValue(n, r))
            }
            _selectStrategy(n) {
                if (cn(n)) return bM;
                if (ed(n)) return _M;
                throw _r(e, n)
            }
            _dispose() {
                this._strategy.dispose(this._subscription), this._latestValue = null, this._subscription = null, this._obj = null
            }
            _updateLatestValue(n, r) {
                n === this._obj && (this._latestValue = r, this._ref.markForCheck())
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(kn, 16))
                }
            }
            static {
                this.\u0275pipe = Fn({
                    name: "async",
                    type: e,
                    pure: !1,
                    standalone: !0
                })
            }
        }
        return e
    })(),
    dj = (() => {
        class e {
            transform(n) {
                if (n == null) return null;
                if (typeof n != "string") throw _r(e, n);
                return n.toLowerCase()
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275pipe = Fn({
                    name: "lowercase",
                    type: e,
                    pure: !0,
                    standalone: !0
                })
            }
        }
        return e
    })();
var fj = (() => {
        class e {
            transform(n) {
                if (n == null) return null;
                if (typeof n != "string") throw _r(e, n);
                return n.toUpperCase()
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275pipe = Fn({
                    name: "uppercase",
                    type: e,
                    pure: !0,
                    standalone: !0
                })
            }
        }
        return e
    })(),
    MM = "mediumDate",
    SM = new C(""),
    TM = new C(""),
    hj = (() => {
        class e {
            constructor(n, r, o) {
                this.locale = n, this.defaultTimezone = r, this.defaultOptions = o
            }
            transform(n, r, o, i) {
                if (n == null || n === "" || n !== n) return null;
                try {
                    let s = r ? ? this.defaultOptions ? .dateFormat ? ? MM,
                        a = o ? ? this.defaultOptions ? .timezone ? ? this.defaultTimezone ? ? void 0;
                    return rM(n, s, i || this.locale, a)
                } catch (s) {
                    throw _r(e, s.message)
                }
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(Er, 16), _(SM, 24), _(TM, 24))
                }
            }
            static {
                this.\u0275pipe = Fn({
                    name: "date",
                    type: e,
                    pure: !0,
                    standalone: !0
                })
            }
        }
        return e
    })();
var pj = (() => {
        class e {
            constructor(n) {
                this._locale = n
            }
            transform(n, r, o) {
                if (!Ov(n)) return null;
                o || = this._locale;
                try {
                    let i = Fv(n);
                    return DM(i, o, r)
                } catch (i) {
                    throw _r(e, i.message)
                }
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(Er, 16))
                }
            }
            static {
                this.\u0275pipe = Fn({
                    name: "number",
                    type: e,
                    pure: !0,
                    standalone: !0
                })
            }
        }
        return e
    })(),
    gj = (() => {
        class e {
            constructor(n) {
                this._locale = n
            }
            transform(n, r, o) {
                if (!Ov(n)) return null;
                o || = this._locale;
                try {
                    let i = Fv(n);
                    return yM(i, o, r)
                } catch (i) {
                    throw _r(e, i.message)
                }
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(Er, 16))
                }
            }
            static {
                this.\u0275pipe = Fn({
                    name: "percent",
                    type: e,
                    pure: !0,
                    standalone: !0
                })
            }
        }
        return e
    })();

function Ov(e) {
    return !(e == null || e === "" || e !== e)
}

function Fv(e) {
    if (typeof e == "string" && !isNaN(Number(e) - parseFloat(e))) return Number(e);
    if (typeof e != "number") throw new Error(`${e} is not a number`);
    return e
}
var Pv = (() => {
        class e {
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275mod = je({
                    type: e
                })
            }
            static {
                this.\u0275inj = Ue({})
            }
        }
        return e
    })(),
    Dd = "browser",
    AM = "server";

function xM(e) {
    return e === Dd
}

function wd(e) {
    return e === AM
}
var kv = (() => {
        class e {
            static {
                this.\u0275prov = E({
                    token: e,
                    providedIn: "root",
                    factory: () => xM(m(Ct)) ? new fd(m(ye), window) : new hd
                })
            }
        }
        return e
    })(),
    fd = class {
        constructor(t, n) {
            this.document = t, this.window = n, this.offset = () => [0, 0]
        }
        setOffset(t) {
            Array.isArray(t) ? this.offset = () => t : this.offset = t
        }
        getScrollPosition() {
            return [this.window.scrollX, this.window.scrollY]
        }
        scrollToPosition(t) {
            this.window.scrollTo(t[0], t[1])
        }
        scrollToAnchor(t) {
            let n = NM(this.document, t);
            n && (this.scrollToElement(n), n.focus())
        }
        setHistoryScrollRestoration(t) {
            this.window.history.scrollRestoration = t
        }
        scrollToElement(t) {
            let n = t.getBoundingClientRect(),
                r = n.left + this.window.pageXOffset,
                o = n.top + this.window.pageYOffset,
                i = this.offset();
            this.window.scrollTo(r - i[0], o - i[1])
        }
    };

function NM(e, t) {
    let n = e.getElementById(t) || e.getElementsByName(t)[0];
    if (n) return n;
    if (typeof e.createTreeWalker == "function" && e.body && typeof e.body.attachShadow == "function") {
        let r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT),
            o = r.currentNode;
        for (; o;) {
            let i = o.shadowRoot;
            if (i) {
                let s = i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                if (s) return s
            }
            o = r.nextNode()
        }
    }
    return null
}
var hd = class {
        setOffset(t) {}
        getScrollPosition() {
            return [0, 0]
        }
        scrollToPosition(t) {}
        scrollToAnchor(t) {}
        setHistoryScrollRestoration(t) {}
    },
    Ir = class {};
var So = class {},
    fa = class {},
    Un = class e {
        constructor(t) {
            this.normalizedNames = new Map, this.lazyUpdate = null, t ? typeof t == "string" ? this.lazyInit = () => {
                this.headers = new Map, t.split(`
`).forEach(n => {
                    let r = n.indexOf(":");
                    if (r > 0) {
                        let o = n.slice(0, r),
                            i = o.toLowerCase(),
                            s = n.slice(r + 1).trim();
                        this.maybeSetNormalizedName(o, i), this.headers.has(i) ? this.headers.get(i).push(s) : this.headers.set(i, [s])
                    }
                })
            } : typeof Headers < "u" && t instanceof Headers ? (this.headers = new Map, t.forEach((n, r) => {
                this.setHeaderEntries(r, n)
            })) : this.lazyInit = () => {
                this.headers = new Map, Object.entries(t).forEach(([n, r]) => {
                    this.setHeaderEntries(n, r)
                })
            } : this.headers = new Map
        }
        has(t) {
            return this.init(), this.headers.has(t.toLowerCase())
        }
        get(t) {
            this.init();
            let n = this.headers.get(t.toLowerCase());
            return n && n.length > 0 ? n[0] : null
        }
        keys() {
            return this.init(), Array.from(this.normalizedNames.values())
        }
        getAll(t) {
            return this.init(), this.headers.get(t.toLowerCase()) || null
        }
        append(t, n) {
            return this.clone({
                name: t,
                value: n,
                op: "a"
            })
        }
        set(t, n) {
            return this.clone({
                name: t,
                value: n,
                op: "s"
            })
        }
        delete(t, n) {
            return this.clone({
                name: t,
                value: n,
                op: "d"
            })
        }
        maybeSetNormalizedName(t, n) {
            this.normalizedNames.has(n) || this.normalizedNames.set(n, t)
        }
        init() {
            this.lazyInit && (this.lazyInit instanceof e ? this.copyFrom(this.lazyInit) : this.lazyInit(), this.lazyInit = null, this.lazyUpdate && (this.lazyUpdate.forEach(t => this.applyUpdate(t)), this.lazyUpdate = null))
        }
        copyFrom(t) {
            t.init(), Array.from(t.headers.keys()).forEach(n => {
                this.headers.set(n, t.headers.get(n)), this.normalizedNames.set(n, t.normalizedNames.get(n))
            })
        }
        clone(t) {
            let n = new e;
            return n.lazyInit = this.lazyInit && this.lazyInit instanceof e ? this.lazyInit : this, n.lazyUpdate = (this.lazyUpdate || []).concat([t]), n
        }
        applyUpdate(t) {
            let n = t.name.toLowerCase();
            switch (t.op) {
                case "a":
                case "s":
                    let r = t.value;
                    if (typeof r == "string" && (r = [r]), r.length === 0) return;
                    this.maybeSetNormalizedName(t.name, n);
                    let o = (t.op === "a" ? this.headers.get(n) : void 0) || [];
                    o.push(...r), this.headers.set(n, o);
                    break;
                case "d":
                    let i = t.value;
                    if (!i) this.headers.delete(n), this.normalizedNames.delete(n);
                    else {
                        let s = this.headers.get(n);
                        if (!s) return;
                        s = s.filter(a => i.indexOf(a) === -1), s.length === 0 ? (this.headers.delete(n), this.normalizedNames.delete(n)) : this.headers.set(n, s)
                    }
                    break
            }
        }
        setHeaderEntries(t, n) {
            let r = (Array.isArray(n) ? n : [n]).map(i => i.toString()),
                o = t.toLowerCase();
            this.headers.set(o, r), this.maybeSetNormalizedName(t, o)
        }
        forEach(t) {
            this.init(), Array.from(this.normalizedNames.keys()).forEach(n => t(this.normalizedNames.get(n), this.headers.get(n)))
        }
    };
var Ed = class {
    encodeKey(t) {
        return Lv(t)
    }
    encodeValue(t) {
        return Lv(t)
    }
    decodeKey(t) {
        return decodeURIComponent(t)
    }
    decodeValue(t) {
        return decodeURIComponent(t)
    }
};

function PM(e, t) {
    let n = new Map;
    return e.length > 0 && e.replace(/^\?/, "").split("&").forEach(o => {
        let i = o.indexOf("="),
            [s, a] = i == -1 ? [t.decodeKey(o), ""] : [t.decodeKey(o.slice(0, i)), t.decodeValue(o.slice(i + 1))],
            u = n.get(s) || [];
        u.push(a), n.set(s, u)
    }), n
}
var kM = /%(\d[a-f0-9])/gi,
    LM = {
        40: "@",
        "3A": ":",
        24: "$",
        "2C": ",",
        "3B": ";",
        "3D": "=",
        "3F": "?",
        "2F": "/"
    };

function Lv(e) {
    return encodeURIComponent(e).replace(kM, (t, n) => LM[n] ? ? t)
}

function da(e) {
    return `${e}`
}
var ln = class e {
    constructor(t = {}) {
        if (this.updates = null, this.cloneFrom = null, this.encoder = t.encoder || new Ed, t.fromString) {
            if (t.fromObject) throw new Error("Cannot specify both fromString and fromObject.");
            this.map = PM(t.fromString, this.encoder)
        } else t.fromObject ? (this.map = new Map, Object.keys(t.fromObject).forEach(n => {
            let r = t.fromObject[n],
                o = Array.isArray(r) ? r.map(da) : [da(r)];
            this.map.set(n, o)
        })) : this.map = null
    }
    has(t) {
        return this.init(), this.map.has(t)
    }
    get(t) {
        this.init();
        let n = this.map.get(t);
        return n ? n[0] : null
    }
    getAll(t) {
        return this.init(), this.map.get(t) || null
    }
    keys() {
        return this.init(), Array.from(this.map.keys())
    }
    append(t, n) {
        return this.clone({
            param: t,
            value: n,
            op: "a"
        })
    }
    appendAll(t) {
        let n = [];
        return Object.keys(t).forEach(r => {
            let o = t[r];
            Array.isArray(o) ? o.forEach(i => {
                n.push({
                    param: r,
                    value: i,
                    op: "a"
                })
            }) : n.push({
                param: r,
                value: o,
                op: "a"
            })
        }), this.clone(n)
    }
    set(t, n) {
        return this.clone({
            param: t,
            value: n,
            op: "s"
        })
    }
    delete(t, n) {
        return this.clone({
            param: t,
            value: n,
            op: "d"
        })
    }
    toString() {
        return this.init(), this.keys().map(t => {
            let n = this.encoder.encodeKey(t);
            return this.map.get(t).map(r => n + "=" + this.encoder.encodeValue(r)).join("&")
        }).filter(t => t !== "").join("&")
    }
    clone(t) {
        let n = new e({
            encoder: this.encoder
        });
        return n.cloneFrom = this.cloneFrom || this, n.updates = (this.updates || []).concat(t), n
    }
    init() {
        this.map === null && (this.map = new Map), this.cloneFrom !== null && (this.cloneFrom.init(), this.cloneFrom.keys().forEach(t => this.map.set(t, this.cloneFrom.map.get(t))), this.updates.forEach(t => {
            switch (t.op) {
                case "a":
                case "s":
                    let n = (t.op === "a" ? this.map.get(t.param) : void 0) || [];
                    n.push(da(t.value)), this.map.set(t.param, n);
                    break;
                case "d":
                    if (t.value !== void 0) {
                        let r = this.map.get(t.param) || [],
                            o = r.indexOf(da(t.value));
                        o !== -1 && r.splice(o, 1), r.length > 0 ? this.map.set(t.param, r) : this.map.delete(t.param)
                    } else {
                        this.map.delete(t.param);
                        break
                    }
            }
        }), this.cloneFrom = this.updates = null)
    }
};
var Id = class {
    constructor() {
        this.map = new Map
    }
    set(t, n) {
        return this.map.set(t, n), this
    }
    get(t) {
        return this.map.has(t) || this.map.set(t, t.defaultValue()), this.map.get(t)
    }
    delete(t) {
        return this.map.delete(t), this
    }
    has(t) {
        return this.map.has(t)
    }
    keys() {
        return this.map.keys()
    }
};

function VM(e) {
    switch (e) {
        case "DELETE":
        case "GET":
        case "HEAD":
        case "OPTIONS":
        case "JSONP":
            return !1;
        default:
            return !0
    }
}

function Vv(e) {
    return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer
}

function jv(e) {
    return typeof Blob < "u" && e instanceof Blob
}

function Uv(e) {
    return typeof FormData < "u" && e instanceof FormData
}

function jM(e) {
    return typeof URLSearchParams < "u" && e instanceof URLSearchParams
}
var Mo = class e {
        constructor(t, n, r, o) {
            this.url = n, this.body = null, this.reportProgress = !1, this.withCredentials = !1, this.responseType = "json", this.method = t.toUpperCase();
            let i;
            if (VM(this.method) || o ? (this.body = r !== void 0 ? r : null, i = o) : i = r, i && (this.reportProgress = !!i.reportProgress, this.withCredentials = !!i.withCredentials, i.responseType && (this.responseType = i.responseType), i.headers && (this.headers = i.headers), i.context && (this.context = i.context), i.params && (this.params = i.params), this.transferCache = i.transferCache), this.headers ? ? = new Un, this.context ? ? = new Id, !this.params) this.params = new ln, this.urlWithParams = n;
            else {
                let s = this.params.toString();
                if (s.length === 0) this.urlWithParams = n;
                else {
                    let a = n.indexOf("?"),
                        u = a === -1 ? "?" : a < n.length - 1 ? "&" : "";
                    this.urlWithParams = n + u + s
                }
            }
        }
        serializeBody() {
            return this.body === null ? null : Vv(this.body) || jv(this.body) || Uv(this.body) || jM(this.body) || typeof this.body == "string" ? this.body : this.body instanceof ln ? this.body.toString() : typeof this.body == "object" || typeof this.body == "boolean" || Array.isArray(this.body) ? JSON.stringify(this.body) : this.body.toString()
        }
        detectContentTypeHeader() {
            return this.body === null || Uv(this.body) ? null : jv(this.body) ? this.body.type || null : Vv(this.body) ? null : typeof this.body == "string" ? "text/plain" : this.body instanceof ln ? "application/x-www-form-urlencoded;charset=UTF-8" : typeof this.body == "object" || typeof this.body == "number" || typeof this.body == "boolean" ? "application/json" : null
        }
        clone(t = {}) {
            let n = t.method || this.method,
                r = t.url || this.url,
                o = t.responseType || this.responseType,
                i = t.body !== void 0 ? t.body : this.body,
                s = t.withCredentials !== void 0 ? t.withCredentials : this.withCredentials,
                a = t.reportProgress !== void 0 ? t.reportProgress : this.reportProgress,
                u = t.headers || this.headers,
                c = t.params || this.params,
                l = t.context ? ? this.context;
            return t.setHeaders !== void 0 && (u = Object.keys(t.setHeaders).reduce((d, f) => d.set(f, t.setHeaders[f]), u)), t.setParams && (c = Object.keys(t.setParams).reduce((d, f) => d.set(f, t.setParams[f]), c)), new e(n, r, i, {
                params: c,
                headers: u,
                context: l,
                reportProgress: a,
                responseType: o,
                withCredentials: s
            })
        }
    },
    Mr = function(e) {
        return e[e.Sent = 0] = "Sent", e[e.UploadProgress = 1] = "UploadProgress", e[e.ResponseHeader = 2] = "ResponseHeader", e[e.DownloadProgress = 3] = "DownloadProgress", e[e.Response = 4] = "Response", e[e.User = 5] = "User", e
    }(Mr || {}),
    To = class {
        constructor(t, n = ga.Ok, r = "OK") {
            this.headers = t.headers || new Un, this.status = t.status !== void 0 ? t.status : n, this.statusText = t.statusText || r, this.url = t.url || null, this.ok = this.status >= 200 && this.status < 300
        }
    },
    bd = class e extends To {
        constructor(t = {}) {
            super(t), this.type = Mr.ResponseHeader
        }
        clone(t = {}) {
            return new e({
                headers: t.headers || this.headers,
                status: t.status !== void 0 ? t.status : this.status,
                statusText: t.statusText || this.statusText,
                url: t.url || this.url || void 0
            })
        }
    },
    ha = class e extends To {
        constructor(t = {}) {
            super(t), this.type = Mr.Response, this.body = t.body !== void 0 ? t.body : null
        }
        clone(t = {}) {
            return new e({
                body: t.body !== void 0 ? t.body : this.body,
                headers: t.headers || this.headers,
                status: t.status !== void 0 ? t.status : this.status,
                statusText: t.statusText || this.statusText,
                url: t.url || this.url || void 0
            })
        }
    },
    pa = class extends To {
        constructor(t) {
            super(t, 0, "Unknown Error"), this.name = "HttpErrorResponse", this.ok = !1, this.status >= 200 && this.status < 300 ? this.message = `Http failure during parsing for ${t.url||"(unknown url)"}` : this.message = `Http failure response for ${t.url||"(unknown url)"}: ${t.status} ${t.statusText}`, this.error = t.error || null
        }
    },
    ga = function(e) {
        return e[e.Continue = 100] = "Continue", e[e.SwitchingProtocols = 101] = "SwitchingProtocols", e[e.Processing = 102] = "Processing", e[e.EarlyHints = 103] = "EarlyHints", e[e.Ok = 200] = "Ok", e[e.Created = 201] = "Created", e[e.Accepted = 202] = "Accepted", e[e.NonAuthoritativeInformation = 203] = "NonAuthoritativeInformation", e[e.NoContent = 204] = "NoContent", e[e.ResetContent = 205] = "ResetContent", e[e.PartialContent = 206] = "PartialContent", e[e.MultiStatus = 207] = "MultiStatus", e[e.AlreadyReported = 208] = "AlreadyReported", e[e.ImUsed = 226] = "ImUsed", e[e.MultipleChoices = 300] = "MultipleChoices", e[e.MovedPermanently = 301] = "MovedPermanently", e[e.Found = 302] = "Found", e[e.SeeOther = 303] = "SeeOther", e[e.NotModified = 304] = "NotModified", e[e.UseProxy = 305] = "UseProxy", e[e.Unused = 306] = "Unused", e[e.TemporaryRedirect = 307] = "TemporaryRedirect", e[e.PermanentRedirect = 308] = "PermanentRedirect", e[e.BadRequest = 400] = "BadRequest", e[e.Unauthorized = 401] = "Unauthorized", e[e.PaymentRequired = 402] = "PaymentRequired", e[e.Forbidden = 403] = "Forbidden", e[e.NotFound = 404] = "NotFound", e[e.MethodNotAllowed = 405] = "MethodNotAllowed", e[e.NotAcceptable = 406] = "NotAcceptable", e[e.ProxyAuthenticationRequired = 407] = "ProxyAuthenticationRequired", e[e.RequestTimeout = 408] = "RequestTimeout", e[e.Conflict = 409] = "Conflict", e[e.Gone = 410] = "Gone", e[e.LengthRequired = 411] = "LengthRequired", e[e.PreconditionFailed = 412] = "PreconditionFailed", e[e.PayloadTooLarge = 413] = "PayloadTooLarge", e[e.UriTooLong = 414] = "UriTooLong", e[e.UnsupportedMediaType = 415] = "UnsupportedMediaType", e[e.RangeNotSatisfiable = 416] = "RangeNotSatisfiable", e[e.ExpectationFailed = 417] = "ExpectationFailed", e[e.ImATeapot = 418] = "ImATeapot", e[e.MisdirectedRequest = 421] = "MisdirectedRequest", e[e.UnprocessableEntity = 422] = "UnprocessableEntity", e[e.Locked = 423] = "Locked", e[e.FailedDependency = 424] = "FailedDependency", e[e.TooEarly = 425] = "TooEarly", e[e.UpgradeRequired = 426] = "UpgradeRequired", e[e.PreconditionRequired = 428] = "PreconditionRequired", e[e.TooManyRequests = 429] = "TooManyRequests", e[e.RequestHeaderFieldsTooLarge = 431] = "RequestHeaderFieldsTooLarge", e[e.UnavailableForLegalReasons = 451] = "UnavailableForLegalReasons", e[e.InternalServerError = 500] = "InternalServerError", e[e.NotImplemented = 501] = "NotImplemented", e[e.BadGateway = 502] = "BadGateway", e[e.ServiceUnavailable = 503] = "ServiceUnavailable", e[e.GatewayTimeout = 504] = "GatewayTimeout", e[e.HttpVersionNotSupported = 505] = "HttpVersionNotSupported", e[e.VariantAlsoNegotiates = 506] = "VariantAlsoNegotiates", e[e.InsufficientStorage = 507] = "InsufficientStorage", e[e.LoopDetected = 508] = "LoopDetected", e[e.NotExtended = 510] = "NotExtended", e[e.NetworkAuthenticationRequired = 511] = "NetworkAuthenticationRequired", e
    }(ga || {});

function Cd(e, t) {
    return {
        body: t,
        headers: e.headers,
        context: e.context,
        observe: e.observe,
        params: e.params,
        reportProgress: e.reportProgress,
        responseType: e.responseType,
        withCredentials: e.withCredentials,
        transferCache: e.transferCache
    }
}
var UM = (() => {
    class e {
        constructor(n) {
            this.handler = n
        }
        request(n, r, o = {}) {
            let i;
            if (n instanceof Mo) i = n;
            else {
                let u;
                o.headers instanceof Un ? u = o.headers : u = new Un(o.headers);
                let c;
                o.params && (o.params instanceof ln ? c = o.params : c = new ln({
                    fromObject: o.params
                })), i = new Mo(n, r, o.body !== void 0 ? o.body : null, {
                    headers: u,
                    context: o.context,
                    params: c,
                    reportProgress: o.reportProgress,
                    responseType: o.responseType || "json",
                    withCredentials: o.withCredentials,
                    transferCache: o.transferCache
                })
            }
            let s = A(i).pipe(xt(u => this.handler.handle(u)));
            if (n instanceof Mo || o.observe === "events") return s;
            let a = s.pipe(we(u => u instanceof ha));
            switch (o.observe || "body") {
                case "body":
                    switch (i.responseType) {
                        case "arraybuffer":
                            return a.pipe(O(u => {
                                if (u.body !== null && !(u.body instanceof ArrayBuffer)) throw new Error("Response is not an ArrayBuffer.");
                                return u.body
                            }));
                        case "blob":
                            return a.pipe(O(u => {
                                if (u.body !== null && !(u.body instanceof Blob)) throw new Error("Response is not a Blob.");
                                return u.body
                            }));
                        case "text":
                            return a.pipe(O(u => {
                                if (u.body !== null && typeof u.body != "string") throw new Error("Response is not a string.");
                                return u.body
                            }));
                        case "json":
                        default:
                            return a.pipe(O(u => u.body))
                    }
                case "response":
                    return a;
                default:
                    throw new Error(`Unreachable: unhandled observe type ${o.observe}}`)
            }
        }
        delete(n, r = {}) {
            return this.request("DELETE", n, r)
        }
        get(n, r = {}) {
            return this.request("GET", n, r)
        }
        head(n, r = {}) {
            return this.request("HEAD", n, r)
        }
        jsonp(n, r) {
            return this.request("JSONP", n, {
                params: new ln().append(r, "JSONP_CALLBACK"),
                observe: "body",
                responseType: "json"
            })
        }
        options(n, r = {}) {
            return this.request("OPTIONS", n, r)
        }
        patch(n, r, o = {}) {
            return this.request("PATCH", n, Cd(o, r))
        }
        post(n, r, o = {}) {
            return this.request("POST", n, Cd(o, r))
        }
        put(n, r, o = {}) {
            return this.request("PUT", n, Cd(o, r))
        }
        static {
            this.\u0275fac = function(r) {
                return new(r || e)(M(So))
            }
        }
        static {
            this.\u0275prov = E({
                token: e,
                factory: e.\u0275fac
            })
        }
    }
    return e
})();

function zv(e, t) {
    return t(e)
}

function $M(e, t) {
    return (n, r) => t.intercept(n, {
        handle: o => e(o, r)
    })
}

function BM(e, t, n) {
    return (r, o) => Et(n, () => t(r, i => e(i, o)))
}
var HM = new C(""),
    _d = new C(""),
    zM = new C(""),
    GM = new C("");

function WM() {
    let e = null;
    return (t, n) => {
        e === null && (e = (m(HM, {
            optional: !0
        }) ? ? []).reduceRight($M, zv));
        let r = m(Ln),
            o = r.add();
        return e(t, n).pipe(en(() => r.remove(o)))
    }
}
var $v = (() => {
    class e extends So {
        constructor(n, r) {
            super(), this.backend = n, this.injector = r, this.chain = null, this.pendingTasks = m(Ln);
            let o = m(GM, {
                optional: !0
            });
            this.backend = o ? ? n
        }
        handle(n) {
            if (this.chain === null) {
                let o = Array.from(new Set([...this.injector.get(_d), ...this.injector.get(zM, [])]));
                this.chain = o.reduceRight((i, s) => BM(i, s, this.injector), zv)
            }
            let r = this.pendingTasks.add();
            return this.chain(n, o => this.backend.handle(o)).pipe(en(() => this.pendingTasks.remove(r)))
        }
        static {
            this.\u0275fac = function(r) {
                return new(r || e)(M(fa), M(Te))
            }
        }
        static {
            this.\u0275prov = E({
                token: e,
                factory: e.\u0275fac
            })
        }
    }
    return e
})();
var qM = /^\)\]\}',?\n/;

function ZM(e) {
    return "responseURL" in e && e.responseURL ? e.responseURL : /^X-Request-URL:/m.test(e.getAllResponseHeaders()) ? e.getResponseHeader("X-Request-URL") : null
}
var Bv = (() => {
        class e {
            constructor(n) {
                this.xhrFactory = n
            }
            handle(n) {
                if (n.method === "JSONP") throw new D(-2800, !1);
                let r = this.xhrFactory;
                return (r.\u0275loadImpl ? W(r.\u0275loadImpl()) : A(null)).pipe(Oe(() => new R(i => {
                    let s = r.build();
                    if (s.open(n.method, n.urlWithParams), n.withCredentials && (s.withCredentials = !0), n.headers.forEach((g, v) => s.setRequestHeader(g, v.join(","))), n.headers.has("Accept") || s.setRequestHeader("Accept", "application/json, text/plain, */*"), !n.headers.has("Content-Type")) {
                        let g = n.detectContentTypeHeader();
                        g !== null && s.setRequestHeader("Content-Type", g)
                    }
                    if (n.responseType) {
                        let g = n.responseType.toLowerCase();
                        s.responseType = g !== "json" ? g : "text"
                    }
                    let a = n.serializeBody(),
                        u = null,
                        c = () => {
                            if (u !== null) return u;
                            let g = s.statusText || "OK",
                                v = new Un(s.getAllResponseHeaders()),
                                w = ZM(s) || n.url;
                            return u = new bd({
                                headers: v,
                                status: s.status,
                                statusText: g,
                                url: w
                            }), u
                        },
                        l = () => {
                            let {
                                headers: g,
                                status: v,
                                statusText: w,
                                url: V
                            } = c(), U = null;
                            v !== ga.NoContent && (U = typeof s.response > "u" ? s.responseText : s.response), v === 0 && (v = U ? ga.Ok : 0);
                            let J = v >= 200 && v < 300;
                            if (n.responseType === "json" && typeof U == "string") {
                                let ee = U;
                                U = U.replace(qM, "");
                                try {
                                    U = U !== "" ? JSON.parse(U) : null
                                } catch (be) {
                                    U = ee, J && (J = !1, U = {
                                        error: be,
                                        text: U
                                    })
                                }
                            }
                            J ? (i.next(new ha({
                                body: U,
                                headers: g,
                                status: v,
                                statusText: w,
                                url: V || void 0
                            })), i.complete()) : i.error(new pa({
                                error: U,
                                headers: g,
                                status: v,
                                statusText: w,
                                url: V || void 0
                            }))
                        },
                        d = g => {
                            let {
                                url: v
                            } = c(), w = new pa({
                                error: g,
                                status: s.status || 0,
                                statusText: s.statusText || "Unknown Error",
                                url: v || void 0
                            });
                            i.error(w)
                        },
                        f = !1,
                        h = g => {
                            f || (i.next(c()), f = !0);
                            let v = {
                                type: Mr.DownloadProgress,
                                loaded: g.loaded
                            };
                            g.lengthComputable && (v.total = g.total), n.responseType === "text" && s.responseText && (v.partialText = s.responseText), i.next(v)
                        },
                        p = g => {
                            let v = {
                                type: Mr.UploadProgress,
                                loaded: g.loaded
                            };
                            g.lengthComputable && (v.total = g.total), i.next(v)
                        };
                    return s.addEventListener("load", l), s.addEventListener("error", d), s.addEventListener("timeout", d), s.addEventListener("abort", d), n.reportProgress && (s.addEventListener("progress", h), a !== null && s.upload && s.upload.addEventListener("progress", p)), s.send(a), i.next({
                        type: Mr.Sent
                    }), () => {
                        s.removeEventListener("error", d), s.removeEventListener("abort", d), s.removeEventListener("load", l), s.removeEventListener("timeout", d), n.reportProgress && (s.removeEventListener("progress", h), a !== null && s.upload && s.upload.removeEventListener("progress", p)), s.readyState !== s.DONE && s.abort()
                    }
                })))
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(M(Ir))
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac
                })
            }
        }
        return e
    })(),
    Gv = new C(""),
    YM = "XSRF-TOKEN",
    QM = new C("", {
        providedIn: "root",
        factory: () => YM
    }),
    KM = "X-XSRF-TOKEN",
    JM = new C("", {
        providedIn: "root",
        factory: () => KM
    }),
    ma = class {},
    XM = (() => {
        class e {
            constructor(n, r, o) {
                this.doc = n, this.platform = r, this.cookieName = o, this.lastCookieString = "", this.lastToken = null, this.parseCount = 0
            }
            getToken() {
                if (this.platform === "server") return null;
                let n = this.doc.cookie || "";
                return n !== this.lastCookieString && (this.parseCount++, this.lastToken = la(n, this.cookieName), this.lastCookieString = n), this.lastToken
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(M(ye), M(Ct), M(QM))
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac
                })
            }
        }
        return e
    })();

function eS(e, t) {
    let n = e.url.toLowerCase();
    if (!m(Gv) || e.method === "GET" || e.method === "HEAD" || n.startsWith("http://") || n.startsWith("https://")) return t(e);
    let r = m(ma).getToken(),
        o = m(JM);
    return r != null && !e.headers.has(o) && (e = e.clone({
        headers: e.headers.set(o, r)
    })), t(e)
}
var Wv = function(e) {
    return e[e.Interceptors = 0] = "Interceptors", e[e.LegacyInterceptors = 1] = "LegacyInterceptors", e[e.CustomXsrfConfiguration = 2] = "CustomXsrfConfiguration", e[e.NoXsrfProtection = 3] = "NoXsrfProtection", e[e.JsonpSupport = 4] = "JsonpSupport", e[e.RequestsMadeViaParent = 5] = "RequestsMadeViaParent", e[e.Fetch = 6] = "Fetch", e
}(Wv || {});

function tS(e, t) {
    return {\
        u0275kind: e,
        \u0275providers: t
    }
}

function nS(...e) {
    let t = [UM, Bv, $v, {
        provide: So,
        useExisting: $v
    }, {
        provide: fa,
        useExisting: Bv
    }, {
        provide: _d,
        useValue: eS,
        multi: !0
    }, {
        provide: Gv,
        useValue: !0
    }, {
        provide: ma,
        useClass: XM
    }];
    for (let n of e) t.push(...n.\u0275providers);
    return _s(t)
}
var Hv = new C("");

function rS() {
    return tS(Wv.LegacyInterceptors, [{
        provide: Hv,
        useFactory: WM
    }, {
        provide: _d,
        useExisting: Hv,
        multi: !0
    }])
}
var Aj = (() => {
    class e {
        static {
            this.\u0275fac = function(r) {
                return new(r || e)
            }
        }
        static {
            this.\u0275mod = je({
                type: e
            })
        }
        static {
            this.\u0275inj = Ue({
                providers: [nS(rS())]
            })
        }
    }
    return e
})();
var Td = class extends sa {
        constructor() {
            super(...arguments), this.supportsDOMEvents = !0
        }
    },
    Ad = class e extends Td {
        static makeCurrent() {
            Ev(new e)
        }
        onAndCancel(t, n, r) {
            return t.addEventListener(n, r), () => {
                t.removeEventListener(n, r)
            }
        }
        dispatchEvent(t, n) {
            t.dispatchEvent(n)
        }
        remove(t) {
            t.parentNode && t.parentNode.removeChild(t)
        }
        createElement(t, n) {
            return n = n || this.getDefaultDocument(), n.createElement(t)
        }
        createHtmlDocument() {
            return document.implementation.createHTMLDocument("fakeTitle")
        }
        getDefaultDocument() {
            return document
        }
        isElementNode(t) {
            return t.nodeType === Node.ELEMENT_NODE
        }
        isShadowRoot(t) {
            return t instanceof DocumentFragment
        }
        getGlobalEventTarget(t, n) {
            return n === "window" ? window : n === "document" ? t : n === "body" ? t.body : null
        }
        getBaseHref(t) {
            let n = oS();
            return n == null ? null : iS(n)
        }
        resetBaseElement() {
            Ao = null
        }
        getUserAgent() {
            return window.navigator.userAgent
        }
        getCookie(t) {
            return la(document.cookie, t)
        }
    },
    Ao = null;

function oS() {
    return Ao = Ao || document.querySelector("base"), Ao ? Ao.getAttribute("href") : null
}

function iS(e) {
    return new URL(e, document.baseURI).pathname
}
var xd = class {
        addToWindow(t) {
            oe.getAngularTestability = (r, o = !0) => {
                let i = t.findTestabilityInTree(r, o);
                if (i == null) throw new D(5103, !1);
                return i
            }, oe.getAllAngularTestabilities = () => t.getAllTestabilities(), oe.getAllAngularRootElements = () => t.getAllRootElements();
            let n = r => {
                let o = oe.getAllAngularTestabilities(),
                    i = o.length,
                    s = function() {
                        i--, i == 0 && r()
                    };
                o.forEach(a => {
                    a.whenStable(s)
                })
            };
            oe.frameworkStabilizers || (oe.frameworkStabilizers = []), oe.frameworkStabilizers.push(n)
        }
        findTestabilityInTree(t, n, r) {
            if (n == null) return null;
            let o = t.getTestability(n);
            return o ? ? (r ? bt().isShadowRoot(n) ? this.findTestabilityInTree(t, n.host, !0) : this.findTestabilityInTree(t, n.parentElement, !0) : null)
        }
    },
    sS = (() => {
        class e {
            build() {
                return new XMLHttpRequest
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac
                })
            }
        }
        return e
    })(),
    Nd = new C(""),
    Qv = (() => {
        class e {
            constructor(n, r) {
                this._zone = r, this._eventNameToPlugin = new Map, n.forEach(o => {
                    o.manager = this
                }), this._plugins = n.slice().reverse()
            }
            addEventListener(n, r, o) {
                return this._findPluginFor(r).addEventListener(n, r, o)
            }
            getZone() {
                return this._zone
            }
            _findPluginFor(n) {
                let r = this._eventNameToPlugin.get(n);
                if (r) return r;
                if (r = this._plugins.find(i => i.supports(n)), !r) throw new D(5101, !1);
                return this._eventNameToPlugin.set(n, r), r
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(M(Nd), M(q))
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac
                })
            }
        }
        return e
    })(),
    va = class {
        constructor(t) {
            this._doc = t
        }
    },
    Md = "ng-app-id",
    Kv = (() => {
        class e {
            constructor(n, r, o, i = {}) {
                this.doc = n, this.appId = r, this.nonce = o, this.platformId = i, this.styleRef = new Map, this.hostNodes = new Set, this.styleNodesInDOM = this.collectServerRenderedStyles(), this.platformIsServer = wd(i), this.resetHostNodes()
            }
            addStyles(n) {
                for (let r of n) this.changeUsageCount(r, 1) === 1 && this.onStyleAdded(r)
            }
            removeStyles(n) {
                for (let r of n) this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r)
            }
            ngOnDestroy() {
                let n = this.styleNodesInDOM;
                n && (n.forEach(r => r.remove()), n.clear());
                for (let r of this.getAllStyles()) this.onStyleRemoved(r);
                this.resetHostNodes()
            }
            addHost(n) {
                this.hostNodes.add(n);
                for (let r of this.getAllStyles()) this.addStyleToHost(n, r)
            }
            removeHost(n) {
                this.hostNodes.delete(n)
            }
            getAllStyles() {
                return this.styleRef.keys()
            }
            onStyleAdded(n) {
                for (let r of this.hostNodes) this.addStyleToHost(r, n)
            }
            onStyleRemoved(n) {
                let r = this.styleRef;
                r.get(n) ? .elements ? .forEach(o => o.remove()), r.delete(n)
            }
            collectServerRenderedStyles() {
                let n = this.doc.head ? .querySelectorAll(`style[${Md}="${this.appId}"]`);
                if (n ? .length) {
                    let r = new Map;
                    return n.forEach(o => {
                        o.textContent != null && r.set(o.textContent, o)
                    }), r
                }
                return null
            }
            changeUsageCount(n, r) {
                let o = this.styleRef;
                if (o.has(n)) {
                    let i = o.get(n);
                    return i.usage += r, i.usage
                }
                return o.set(n, {
                    usage: r,
                    elements: []
                }), r
            }
            getStyleElement(n, r) {
                let o = this.styleNodesInDOM,
                    i = o ? .get(r);
                if (i ? .parentNode === n) return o.delete(r), i.removeAttribute(Md), i; {
                    let s = this.doc.createElement("style");
                    return this.nonce && s.setAttribute("nonce", this.nonce), s.textContent = r, this.platformIsServer && s.setAttribute(Md, this.appId), n.appendChild(s), s
                }
            }
            addStyleToHost(n, r) {
                let o = this.getStyleElement(n, r),
                    i = this.styleRef,
                    s = i.get(r) ? .elements;
                s ? s.push(o) : i.set(r, {
                    elements: [o],
                    usage: 1
                })
            }
            resetHostNodes() {
                let n = this.hostNodes;
                n.clear(), n.add(this.doc.head)
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(M(ye), M(Es), M(gl, 8), M(Ct))
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac
                })
            }
        }
        return e
    })(),
    Sd = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/",
        math: "http://www.w3.org/1998/MathML/"
    },
    Od = /%COMP%/g,
    Jv = "%COMP%",
    aS = `_nghost-${Jv}`,
    uS = `_ngcontent-${Jv}`,
    cS = !0,
    lS = new C("", {
        providedIn: "root",
        factory: () => cS
    });

function dS(e) {
    return uS.replace(Od, e)
}

function fS(e) {
    return aS.replace(Od, e)
}

function Xv(e, t) {
    return t.map(n => n.replace(Od, e))
}
var qv = (() => {
        class e {
            constructor(n, r, o, i, s, a, u, c = null) {
                this.eventManager = n, this.sharedStylesHost = r, this.appId = o, this.removeStylesOnCompDestroy = i, this.doc = s, this.platformId = a, this.ngZone = u, this.nonce = c, this.rendererByCompId = new Map, this.platformIsServer = wd(a), this.defaultRenderer = new xo(n, s, u, this.platformIsServer)
            }
            createRenderer(n, r) {
                if (!n || !r) return this.defaultRenderer;
                this.platformIsServer && r.encapsulation === gt.ShadowDom && (r = Q(y({}, r), {
                    encapsulation: gt.Emulated
                }));
                let o = this.getOrCreateRenderer(n, r);
                return o instanceof ya ? o.applyToHost(n) : o instanceof No && o.applyStyles(), o
            }
            getOrCreateRenderer(n, r) {
                let o = this.rendererByCompId,
                    i = o.get(r.id);
                if (!i) {
                    let s = this.doc,
                        a = this.ngZone,
                        u = this.eventManager,
                        c = this.sharedStylesHost,
                        l = this.removeStylesOnCompDestroy,
                        d = this.platformIsServer;
                    switch (r.encapsulation) {
                        case gt.Emulated:
                            i = new ya(u, c, r, this.appId, l, s, a, d);
                            break;
                        case gt.ShadowDom:
                            return new Rd(u, c, n, r, s, a, this.nonce, d);
                        default:
                            i = new No(u, c, r, l, s, a, d);
                            break
                    }
                    o.set(r.id, i)
                }
                return i
            }
            ngOnDestroy() {
                this.rendererByCompId.clear()
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(M(Qv), M(Kv), M(Es), M(lS), M(ye), M(Ct), M(q), M(gl))
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac
                })
            }
        }
        return e
    })(),
    xo = class {
        constructor(t, n, r, o) {
            this.eventManager = t, this.doc = n, this.ngZone = r, this.platformIsServer = o, this.data = Object.create(null), this.throwOnSyntheticProps = !0, this.destroyNode = null
        }
        destroy() {}
        createElement(t, n) {
            return n ? this.doc.createElementNS(Sd[n] || n, t) : this.doc.createElement(t)
        }
        createComment(t) {
            return this.doc.createComment(t)
        }
        createText(t) {
            return this.doc.createTextNode(t)
        }
        appendChild(t, n) {
            (Zv(t) ? t.content : t).appendChild(n)
        }
        insertBefore(t, n, r) {
            t && (Zv(t) ? t.content : t).insertBefore(n, r)
        }
        removeChild(t, n) {
            t && t.removeChild(n)
        }
        selectRootElement(t, n) {
            let r = typeof t == "string" ? this.doc.querySelector(t) : t;
            if (!r) throw new D(-5104, !1);
            return n || (r.textContent = ""), r
        }
        parentNode(t) {
            return t.parentNode
        }
        nextSibling(t) {
            return t.nextSibling
        }
        setAttribute(t, n, r, o) {
            if (o) {
                n = o + ":" + n;
                let i = Sd[o];
                i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r)
            } else t.setAttribute(n, r)
        }
        removeAttribute(t, n, r) {
            if (r) {
                let o = Sd[r];
                o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`)
            } else t.removeAttribute(n)
        }
        addClass(t, n) {
            t.classList.add(n)
        }
        removeClass(t, n) {
            t.classList.remove(n)
        }
        setStyle(t, n, r, o) {
            o & (Dt.DashCase | Dt.Important) ? t.style.setProperty(n, r, o & Dt.Important ? "important" : "") : t.style[n] = r
        }
        removeStyle(t, n, r) {
            r & Dt.DashCase ? t.style.removeProperty(n) : t.style[n] = ""
        }
        setProperty(t, n, r) {
            t != null && (t[n] = r)
        }
        setValue(t, n) {
            t.nodeValue = n
        }
        listen(t, n, r) {
            if (typeof t == "string" && (t = bt().getGlobalEventTarget(this.doc, t), !t)) throw new Error(`Unsupported event target ${t} for event ${n}`);
            return this.eventManager.addEventListener(t, n, this.decoratePreventDefault(r))
        }
        decoratePreventDefault(t) {
            return n => {
                if (n === "__ngUnwrap__") return t;
                (this.platformIsServer ? this.ngZone.runGuarded(() => t(n)) : t(n)) === !1 && n.preventDefault()
            }
        }
    };

function Zv(e) {
    return e.tagName === "TEMPLATE" && e.content !== void 0
}
var Rd = class extends xo {
        constructor(t, n, r, o, i, s, a, u) {
            super(t, i, s, u), this.sharedStylesHost = n, this.hostEl = r, this.shadowRoot = r.attachShadow({
                mode: "open"
            }), this.sharedStylesHost.addHost(this.shadowRoot);
            let c = Xv(o.id, o.styles);
            for (let l of c) {
                let d = document.createElement("style");
                a && d.setAttribute("nonce", a), d.textContent = l, this.shadowRoot.appendChild(d)
            }
        }
        nodeOrShadowRoot(t) {
            return t === this.hostEl ? this.shadowRoot : t
        }
        appendChild(t, n) {
            return super.appendChild(this.nodeOrShadowRoot(t), n)
        }
        insertBefore(t, n, r) {
            return super.insertBefore(this.nodeOrShadowRoot(t), n, r)
        }
        removeChild(t, n) {
            return super.removeChild(this.nodeOrShadowRoot(t), n)
        }
        parentNode(t) {
            return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))
        }
        destroy() {
            this.sharedStylesHost.removeHost(this.shadowRoot)
        }
    },
    No = class extends xo {
        constructor(t, n, r, o, i, s, a, u) {
            super(t, i, s, a), this.sharedStylesHost = n, this.removeStylesOnCompDestroy = o, this.styles = u ? Xv(u, r.styles) : r.styles
        }
        applyStyles() {
            this.sharedStylesHost.addStyles(this.styles)
        }
        destroy() {
            this.removeStylesOnCompDestroy && this.sharedStylesHost.removeStyles(this.styles)
        }
    },
    ya = class extends No {
        constructor(t, n, r, o, i, s, a, u) {
            let c = o + "-" + r.id;
            super(t, n, r, i, s, a, u, c), this.contentAttr = dS(c), this.hostAttr = fS(c)
        }
        applyToHost(t) {
            this.applyStyles(), this.setAttribute(t, this.hostAttr, "")
        }
        createElement(t, n) {
            let r = super.createElement(t, n);
            return super.setAttribute(r, this.contentAttr, ""), r
        }
    },
    hS = (() => {
        class e extends va {
            constructor(n) {
                super(n)
            }
            supports(n) {
                return !0
            }
            addEventListener(n, r, o) {
                return n.addEventListener(r, o, !1), () => this.removeEventListener(n, r, o)
            }
            removeEventListener(n, r, o) {
                return n.removeEventListener(r, o)
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(M(ye))
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac
                })
            }
        }
        return e
    })(),
    Yv = ["alt", "control", "meta", "shift"],
    pS = {
        "\b": "Backspace",
        "	": "Tab",
        "\x7F": "Delete",
        "\x1B": "Escape",
        Del: "Delete",
        Esc: "Escape",
        Left: "ArrowLeft",
        Right: "ArrowRight",
        Up: "ArrowUp",
        Down: "ArrowDown",
        Menu: "ContextMenu",
        Scroll: "ScrollLock",
        Win: "OS"
    },
    gS = {
        alt: e => e.altKey,
        control: e => e.ctrlKey,
        meta: e => e.metaKey,
        shift: e => e.shiftKey
    },
    mS = (() => {
        class e extends va {
            constructor(n) {
                super(n)
            }
            supports(n) {
                return e.parseEventName(n) != null
            }
            addEventListener(n, r, o) {
                let i = e.parseEventName(r),
                    s = e.eventCallback(i.fullKey, o, this.manager.getZone());
                return this.manager.getZone().runOutsideAngular(() => bt().onAndCancel(n, i.domEventName, s))
            }
            static parseEventName(n) {
                let r = n.toLowerCase().split("."),
                    o = r.shift();
                if (r.length === 0 || !(o === "keydown" || o === "keyup")) return null;
                let i = e._normalizeKey(r.pop()),
                    s = "",
                    a = r.indexOf("code");
                if (a > -1 && (r.splice(a, 1), s = "code."), Yv.forEach(c => {
                        let l = r.indexOf(c);
                        l > -1 && (r.splice(l, 1), s += c + ".")
                    }), s += i, r.length != 0 || i.length === 0) return null;
                let u = {};
                return u.domEventName = o, u.fullKey = s, u
            }
            static matchEventFullKeyCode(n, r) {
                let o = pS[n.key] || n.key,
                    i = "";
                return r.indexOf("code.") > -1 && (o = n.code, i = "code."), o == null || !o ? !1 : (o = o.toLowerCase(), o === " " ? o = "space" : o === "." && (o = "dot"), Yv.forEach(s => {
                    if (s !== o) {
                        let a = gS[s];
                        a(n) && (i += s + ".")
                    }
                }), i += o, i === r)
            }
            static eventCallback(n, r, o) {
                return i => {
                    e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i))
                }
            }
            static _normalizeKey(n) {
                return n === "esc" ? "escape" : n
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(M(ye))
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac
                })
            }
        }
        return e
    })();

function vS() {
    Ad.makeCurrent()
}

function yS() {
    return new vt
}

function DS() {
    return Ap(document), document
}
var wS = [{
        provide: Ct,
        useValue: Dd
    }, {
        provide: pl,
        useValue: vS,
        multi: !0
    }, {
        provide: ye,
        useFactory: DS,
        deps: []
    }],
    Bj = td(dv, "browser", wS),
    CS = new C(""),
    ES = [{
        provide: Io,
        useClass: xd,
        deps: []
    }, {
        provide: Jl,
        useClass: Ws,
        deps: [q, qs, Io]
    }, {
        provide: Ws,
        useClass: Ws,
        deps: [q, qs, Io]
    }],
    IS = [{
            provide: Ms,
            useValue: "root"
        }, {
            provide: vt,
            useFactory: yS,
            deps: []
        }, {
            provide: Nd,
            useClass: hS,
            multi: !0,
            deps: [ye, q, Ct]
        }, {
            provide: Nd,
            useClass: mS,
            multi: !0,
            deps: [ye]
        }, qv, Kv, Qv, {
            provide: co,
            useExisting: qv
        }, {
            provide: Ir,
            useClass: sS,
            deps: []
        },
        []
    ],
    Hj = (() => {
        class e {
            constructor(n) {}
            static withServerTransition(n) {
                return {
                    ngModule: e,
                    providers: [{
                        provide: Es,
                        useValue: n.appId
                    }]
                }
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(M(CS, 12))
                }
            }
            static {
                this.\u0275mod = je({
                    type: e
                })
            }
            static {
                this.\u0275inj = Ue({
                    providers: [...IS, ...ES],
                    imports: [Pv, fv]
                })
            }
        }
        return e
    })();
var ey = (() => {
    class e {
        constructor(n) {
            this._doc = n
        }
        getTitle() {
            return this._doc.title
        }
        setTitle(n) {
            this._doc.title = n || ""
        }
        static {
            this.\u0275fac = function(r) {
                return new(r || e)(M(ye))
            }
        }
        static {
            this.\u0275prov = E({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
    }
    return e
})();
var bS = (() => {
        class e {
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: function(r) {
                        let o = null;
                        return r ? o = new(r || e) : o = M(_S), o
                    },
                    providedIn: "root"
                })
            }
        }
        return e
    })(),
    _S = (() => {
        class e extends bS {
            constructor(n) {
                super(), this._doc = n
            }
            sanitize(n, r) {
                if (r == null) return null;
                switch (n) {
                    case ot.NONE:
                        return r;
                    case ot.HTML:
                        return zt(r, "HTML") ? $e(r) : Il(this._doc, String(r)).toString();
                    case ot.STYLE:
                        return zt(r, "Style") ? $e(r) : r;
                    case ot.SCRIPT:
                        if (zt(r, "Script")) return $e(r);
                        throw new D(5200, !1);
                    case ot.URL:
                        return zt(r, "URL") ? $e(r) : Do(String(r));
                    case ot.RESOURCE_URL:
                        if (zt(r, "ResourceURL")) return $e(r);
                        throw new D(5201, !1);
                    default:
                        throw new D(5202, !1)
                }
            }
            bypassSecurityTrustHtml(n) {
                return ug(n)
            }
            bypassSecurityTrustStyle(n) {
                return cg(n)
            }
            bypassSecurityTrustScript(n) {
                return lg(n)
            }
            bypassSecurityTrustUrl(n) {
                return dg(n)
            }
            bypassSecurityTrustResourceUrl(n) {
                return fg(n)
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(M(ye))
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
            }
        }
        return e
    })();
var cy = (() => {
        class e {
            constructor(n, r) {
                this._renderer = n, this._elementRef = r, this.onChange = o => {}, this.onTouched = () => {}
            }
            setProperty(n, r) {
                this._renderer.setProperty(this._elementRef.nativeElement, n, r)
            }
            registerOnTouched(n) {
                this.onTouched = n
            }
            registerOnChange(n) {
                this.onChange = n
            }
            setDisabledState(n) {
                this.setProperty("disabled", n)
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(it), _(xe))
                }
            }
            static {
                this.\u0275dir = z({
                    type: e
                })
            }
        }
        return e
    })(),
    Ar = (() => {
        class e extends cy {
            static {
                this.\u0275fac = (() => {
                    let n;
                    return function(o) {
                        return (n || (n = Ht(e)))(o || e)
                    }
                })()
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    features: [Le]
                })
            }
        }
        return e
    })(),
    $n = new C(""),
    SS = {
        provide: $n,
        useExisting: qe(() => TS),
        multi: !0
    },
    TS = (() => {
        class e extends Ar {
            writeValue(n) {
                this.setProperty("checked", n)
            }
            static {
                this.\u0275fac = (() => {
                    let n;
                    return function(o) {
                        return (n || (n = Ht(e)))(o || e)
                    }
                })()
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["input", "type", "checkbox", "formControlName", ""],
                        ["input", "type", "checkbox", "formControl", ""],
                        ["input", "type", "checkbox", "ngModel", ""]
                    ],
                    hostBindings: function(r, o) {
                        r & 1 && at("change", function(s) {
                            return o.onChange(s.target.checked)
                        })("blur", function() {
                            return o.onTouched()
                        })
                    },
                    features: [It([SS]), Le]
                })
            }
        }
        return e
    })(),
    AS = {
        provide: $n,
        useExisting: qe(() => ly),
        multi: !0
    };

function xS() {
    let e = bt() ? bt().getUserAgent() : "";
    return /android (\d+)/.test(e.toLowerCase())
}
var NS = new C(""),
    ly = (() => {
        class e extends cy {
            constructor(n, r, o) {
                super(n, r), this._compositionMode = o, this._composing = !1, this._compositionMode == null && (this._compositionMode = !xS())
            }
            writeValue(n) {
                let r = n ? ? "";
                this.setProperty("value", r)
            }
            _handleInput(n) {
                (!this._compositionMode || this._compositionMode && !this._composing) && this.onChange(n)
            }
            _compositionStart() {
                this._composing = !0
            }
            _compositionEnd(n) {
                this._composing = !1, this._compositionMode && this.onChange(n)
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(it), _(xe), _(NS, 8))
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["input", "formControlName", "", 3, "type", "checkbox"],
                        ["textarea", "formControlName", ""],
                        ["input", "formControl", "", 3, "type", "checkbox"],
                        ["textarea", "formControl", ""],
                        ["input", "ngModel", "", 3, "type", "checkbox"],
                        ["textarea", "ngModel", ""],
                        ["", "ngDefaultControl", ""]
                    ],
                    hostBindings: function(r, o) {
                        r & 1 && at("input", function(s) {
                            return o._handleInput(s.target.value)
                        })("blur", function() {
                            return o.onTouched()
                        })("compositionstart", function() {
                            return o._compositionStart()
                        })("compositionend", function(s) {
                            return o._compositionEnd(s.target.value)
                        })
                    },
                    features: [It([AS]), Le]
                })
            }
        }
        return e
    })();
var Pd = new C(""),
    kd = new C("");

function dy(e) {
    return e != null
}

function fy(e) {
    return cn(e) ? W(e) : e
}

function hy(e) {
    let t = {};
    return e.forEach(n => {
        t = n != null ? y(y({}, t), n) : t
    }), Object.keys(t).length === 0 ? null : t
}

function py(e, t) {
    return t.map(n => n(e))
}

function RS(e) {
    return !e.validate
}

function gy(e) {
    return e.map(t => RS(t) ? t : n => t.validate(n))
}

function OS(e) {
    if (!e) return null;
    let t = e.filter(dy);
    return t.length == 0 ? null : function(n) {
        return hy(py(n, t))
    }
}

function Ld(e) {
    return e != null ? OS(gy(e)) : null
}

function FS(e) {
    if (!e) return null;
    let t = e.filter(dy);
    return t.length == 0 ? null : function(n) {
        let r = py(n, t).map(fy);
        return lu(r).pipe(O(hy))
    }
}

function Vd(e) {
    return e != null ? FS(gy(e)) : null
}

function ty(e, t) {
    return e === null ? [t] : Array.isArray(e) ? [...e, t] : [e, t]
}

function my(e) {
    return e._rawValidators
}

function vy(e) {
    return e._rawAsyncValidators
}

function Fd(e) {
    return e ? Array.isArray(e) ? e : [e] : []
}

function wa(e, t) {
    return Array.isArray(e) ? e.includes(t) : e === t
}

function ny(e, t) {
    let n = Fd(t);
    return Fd(e).forEach(o => {
        wa(n, o) || n.push(o)
    }), n
}

function ry(e, t) {
    return Fd(t).filter(n => !wa(e, n))
}
var Ca = class {
        constructor() {
            this._rawValidators = [], this._rawAsyncValidators = [], this._onDestroyCallbacks = []
        }
        get value() {
            return this.control ? this.control.value : null
        }
        get valid() {
            return this.control ? this.control.valid : null
        }
        get invalid() {
            return this.control ? this.control.invalid : null
        }
        get pending() {
            return this.control ? this.control.pending : null
        }
        get disabled() {
            return this.control ? this.control.disabled : null
        }
        get enabled() {
            return this.control ? this.control.enabled : null
        }
        get errors() {
            return this.control ? this.control.errors : null
        }
        get pristine() {
            return this.control ? this.control.pristine : null
        }
        get dirty() {
            return this.control ? this.control.dirty : null
        }
        get touched() {
            return this.control ? this.control.touched : null
        }
        get status() {
            return this.control ? this.control.status : null
        }
        get untouched() {
            return this.control ? this.control.untouched : null
        }
        get statusChanges() {
            return this.control ? this.control.statusChanges : null
        }
        get valueChanges() {
            return this.control ? this.control.valueChanges : null
        }
        get path() {
            return null
        }
        _setValidators(t) {
            this._rawValidators = t || [], this._composedValidatorFn = Ld(this._rawValidators)
        }
        _setAsyncValidators(t) {
            this._rawAsyncValidators = t || [], this._composedAsyncValidatorFn = Vd(this._rawAsyncValidators)
        }
        get validator() {
            return this._composedValidatorFn || null
        }
        get asyncValidator() {
            return this._composedAsyncValidatorFn || null
        }
        _registerOnDestroy(t) {
            this._onDestroyCallbacks.push(t)
        }
        _invokeOnDestroyCallbacks() {
            this._onDestroyCallbacks.forEach(t => t()), this._onDestroyCallbacks = []
        }
        reset(t = void 0) {
            this.control && this.control.reset(t)
        }
        hasError(t, n) {
            return this.control ? this.control.hasError(t, n) : !1
        }
        getError(t, n) {
            return this.control ? this.control.getError(t, n) : null
        }
    },
    dn = class extends Ca {
        get formDirective() {
            return null
        }
        get path() {
            return null
        }
    },
    Tr = class extends Ca {
        constructor() {
            super(...arguments), this._parent = null, this.name = null, this.valueAccessor = null
        }
    },
    Ea = class {
        constructor(t) {
            this._cd = t
        }
        get isTouched() {
            return !!this._cd ? .control ? .touched
        }
        get isUntouched() {
            return !!this._cd ? .control ? .untouched
        }
        get isPristine() {
            return !!this._cd ? .control ? .pristine
        }
        get isDirty() {
            return !!this._cd ? .control ? .dirty
        }
        get isValid() {
            return !!this._cd ? .control ? .valid
        }
        get isInvalid() {
            return !!this._cd ? .control ? .invalid
        }
        get isPending() {
            return !!this._cd ? .control ? .pending
        }
        get isSubmitted() {
            return !!this._cd ? .submitted
        }
    },
    PS = {
        "[class.ng-untouched]": "isUntouched",
        "[class.ng-touched]": "isTouched",
        "[class.ng-pristine]": "isPristine",
        "[class.ng-dirty]": "isDirty",
        "[class.ng-valid]": "isValid",
        "[class.ng-invalid]": "isInvalid",
        "[class.ng-pending]": "isPending"
    },
    sU = Q(y({}, PS), {
        "[class.ng-submitted]": "isSubmitted"
    }),
    aU = (() => {
        class e extends Ea {
            constructor(n) {
                super(n)
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(Tr, 2))
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["", "formControlName", ""],
                        ["", "ngModel", ""],
                        ["", "formControl", ""]
                    ],
                    hostVars: 14,
                    hostBindings: function(r, o) {
                        r & 2 && $s("ng-untouched", o.isUntouched)("ng-touched", o.isTouched)("ng-pristine", o.isPristine)("ng-dirty", o.isDirty)("ng-valid", o.isValid)("ng-invalid", o.isInvalid)("ng-pending", o.isPending)
                    },
                    features: [Le]
                })
            }
        }
        return e
    })(),
    uU = (() => {
        class e extends Ea {
            constructor(n) {
                super(n)
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(dn, 10))
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["", "formGroupName", ""],
                        ["", "formArrayName", ""],
                        ["", "ngModelGroup", ""],
                        ["", "formGroup", ""],
                        ["form", 3, "ngNoForm", ""],
                        ["", "ngForm", ""]
                    ],
                    hostVars: 16,
                    hostBindings: function(r, o) {
                        r & 2 && $s("ng-untouched", o.isUntouched)("ng-touched", o.isTouched)("ng-pristine", o.isPristine)("ng-dirty", o.isDirty)("ng-valid", o.isValid)("ng-invalid", o.isInvalid)("ng-pending", o.isPending)("ng-submitted", o.isSubmitted)
                    },
                    features: [Le]
                })
            }
        }
        return e
    })();
var Ro = "VALID",
    Da = "INVALID",
    Sr = "PENDING",
    Oo = "DISABLED";

function yy(e) {
    return (Ta(e) ? e.validators : e) || null
}

function kS(e) {
    return Array.isArray(e) ? Ld(e) : e || null
}

function Dy(e, t) {
    return (Ta(t) ? t.asyncValidators : e) || null
}

function LS(e) {
    return Array.isArray(e) ? Vd(e) : e || null
}

function Ta(e) {
    return e != null && !Array.isArray(e) && typeof e == "object"
}

function VS(e, t, n) {
    let r = e.controls;
    if (!(t ? Object.keys(r) : r).length) throw new D(1e3, "");
    if (!r[n]) throw new D(1001, "")
}

function jS(e, t, n) {
    e._forEachChild((r, o) => {
        if (n[o] === void 0) throw new D(1002, "")
    })
}
var Ia = class {
        constructor(t, n) {
            this._pendingDirty = !1, this._hasOwnPendingAsyncValidator = !1, this._pendingTouched = !1, this._onCollectionChange = () => {}, this._parent = null, this.pristine = !0, this.touched = !1, this._onDisabledChange = [], this._assignValidators(t), this._assignAsyncValidators(n)
        }
        get validator() {
            return this._composedValidatorFn
        }
        set validator(t) {
            this._rawValidators = this._composedValidatorFn = t
        }
        get asyncValidator() {
            return this._composedAsyncValidatorFn
        }
        set asyncValidator(t) {
            this._rawAsyncValidators = this._composedAsyncValidatorFn = t
        }
        get parent() {
            return this._parent
        }
        get valid() {
            return this.status === Ro
        }
        get invalid() {
            return this.status === Da
        }
        get pending() {
            return this.status == Sr
        }
        get disabled() {
            return this.status === Oo
        }
        get enabled() {
            return this.status !== Oo
        }
        get dirty() {
            return !this.pristine
        }
        get untouched() {
            return !this.touched
        }
        get updateOn() {
            return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change"
        }
        setValidators(t) {
            this._assignValidators(t)
        }
        setAsyncValidators(t) {
            this._assignAsyncValidators(t)
        }
        addValidators(t) {
            this.setValidators(ny(t, this._rawValidators))
        }
        addAsyncValidators(t) {
            this.setAsyncValidators(ny(t, this._rawAsyncValidators))
        }
        removeValidators(t) {
            this.setValidators(ry(t, this._rawValidators))
        }
        removeAsyncValidators(t) {
            this.setAsyncValidators(ry(t, this._rawAsyncValidators))
        }
        hasValidator(t) {
            return wa(this._rawValidators, t)
        }
        hasAsyncValidator(t) {
            return wa(this._rawAsyncValidators, t)
        }
        clearValidators() {
            this.validator = null
        }
        clearAsyncValidators() {
            this.asyncValidator = null
        }
        markAsTouched(t = {}) {
            this.touched = !0, this._parent && !t.onlySelf && this._parent.markAsTouched(t)
        }
        markAllAsTouched() {
            this.markAsTouched({
                onlySelf: !0
            }), this._forEachChild(t => t.markAllAsTouched())
        }
        markAsUntouched(t = {}) {
            this.touched = !1, this._pendingTouched = !1, this._forEachChild(n => {
                n.markAsUntouched({
                    onlySelf: !0
                })
            }), this._parent && !t.onlySelf && this._parent._updateTouched(t)
        }
        markAsDirty(t = {}) {
            this.pristine = !1, this._parent && !t.onlySelf && this._parent.markAsDirty(t)
        }
        markAsPristine(t = {}) {
            this.pristine = !0, this._pendingDirty = !1, this._forEachChild(n => {
                n.markAsPristine({
                    onlySelf: !0
                })
            }), this._parent && !t.onlySelf && this._parent._updatePristine(t)
        }
        markAsPending(t = {}) {
            this.status = Sr, t.emitEvent !== !1 && this.statusChanges.emit(this.status), this._parent && !t.onlySelf && this._parent.markAsPending(t)
        }
        disable(t = {}) {
            let n = this._parentMarkedDirty(t.onlySelf);
            this.status = Oo, this.errors = null, this._forEachChild(r => {
                r.disable(Q(y({}, t), {
                    onlySelf: !0
                }))
            }), this._updateValue(), t.emitEvent !== !1 && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._updateAncestors(Q(y({}, t), {
                skipPristineCheck: n
            })), this._onDisabledChange.forEach(r => r(!0))
        }
        enable(t = {}) {
            let n = this._parentMarkedDirty(t.onlySelf);
            this.status = Ro, this._forEachChild(r => {
                r.enable(Q(y({}, t), {
                    onlySelf: !0
                }))
            }), this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: t.emitEvent
            }), this._updateAncestors(Q(y({}, t), {
                skipPristineCheck: n
            })), this._onDisabledChange.forEach(r => r(!1))
        }
        _updateAncestors(t) {
            this._parent && !t.onlySelf && (this._parent.updateValueAndValidity(t), t.skipPristineCheck || this._parent._updatePristine(), this._parent._updateTouched())
        }
        setParent(t) {
            this._parent = t
        }
        getRawValue() {
            return this.value
        }
        updateValueAndValidity(t = {}) {
            this._setInitialStatus(), this._updateValue(), this.enabled && (this._cancelExistingSubscription(), this.errors = this._runValidator(), this.status = this._calculateStatus(), (this.status === Ro || this.status === Sr) && this._runAsyncValidator(t.emitEvent)), t.emitEvent !== !1 && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._parent && !t.onlySelf && this._parent.updateValueAndValidity(t)
        }
        _updateTreeValidity(t = {
            emitEvent: !0
        }) {
            this._forEachChild(n => n._updateTreeValidity(t)), this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: t.emitEvent
            })
        }
        _setInitialStatus() {
            this.status = this._allControlsDisabled() ? Oo : Ro
        }
        _runValidator() {
            return this.validator ? this.validator(this) : null
        }
        _runAsyncValidator(t) {
            if (this.asyncValidator) {
                this.status = Sr, this._hasOwnPendingAsyncValidator = !0;
                let n = fy(this.asyncValidator(this));
                this._asyncValidationSubscription = n.subscribe(r => {
                    this._hasOwnPendingAsyncValidator = !1, this.setErrors(r, {
                        emitEvent: t
                    })
                })
            }
        }
        _cancelExistingSubscription() {
            this._asyncValidationSubscription && (this._asyncValidationSubscription.unsubscribe(), this._hasOwnPendingAsyncValidator = !1)
        }
        setErrors(t, n = {}) {
            this.errors = t, this._updateControlsErrors(n.emitEvent !== !1)
        }
        get(t) {
            let n = t;
            return n == null || (Array.isArray(n) || (n = n.split(".")), n.length === 0) ? null : n.reduce((r, o) => r && r._find(o), this)
        }
        getError(t, n) {
            let r = n ? this.get(n) : this;
            return r && r.errors ? r.errors[t] : null
        }
        hasError(t, n) {
            return !!this.getError(t, n)
        }
        get root() {
            let t = this;
            for (; t._parent;) t = t._parent;
            return t
        }
        _updateControlsErrors(t) {
            this.status = this._calculateStatus(), t && this.statusChanges.emit(this.status), this._parent && this._parent._updateControlsErrors(t)
        }
        _initObservables() {
            this.valueChanges = new ne, this.statusChanges = new ne
        }
        _calculateStatus() {
            return this._allControlsDisabled() ? Oo : this.errors ? Da : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(Sr) ? Sr : this._anyControlsHaveStatus(Da) ? Da : Ro
        }
        _anyControlsHaveStatus(t) {
            return this._anyControls(n => n.status === t)
        }
        _anyControlsDirty() {
            return this._anyControls(t => t.dirty)
        }
        _anyControlsTouched() {
            return this._anyControls(t => t.touched)
        }
        _updatePristine(t = {}) {
            this.pristine = !this._anyControlsDirty(), this._parent && !t.onlySelf && this._parent._updatePristine(t)
        }
        _updateTouched(t = {}) {
            this.touched = this._anyControlsTouched(), this._parent && !t.onlySelf && this._parent._updateTouched(t)
        }
        _registerOnCollectionChange(t) {
            this._onCollectionChange = t
        }
        _setUpdateStrategy(t) {
            Ta(t) && t.updateOn != null && (this._updateOn = t.updateOn)
        }
        _parentMarkedDirty(t) {
            let n = this._parent && this._parent.dirty;
            return !t && !!n && !this._parent._anyControlsDirty()
        }
        _find(t) {
            return null
        }
        _assignValidators(t) {
            this._rawValidators = Array.isArray(t) ? t.slice() : t, this._composedValidatorFn = kS(this._rawValidators)
        }
        _assignAsyncValidators(t) {
            this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t, this._composedAsyncValidatorFn = LS(this._rawAsyncValidators)
        }
    },
    ba = class extends Ia {
        constructor(t, n, r) {
            super(yy(n), Dy(r, n)), this.controls = t, this._initObservables(), this._setUpdateStrategy(n), this._setUpControls(), this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !!this.asyncValidator
            })
        }
        registerControl(t, n) {
            return this.controls[t] ? this.controls[t] : (this.controls[t] = n, n.setParent(this), n._registerOnCollectionChange(this._onCollectionChange), n)
        }
        addControl(t, n, r = {}) {
            this.registerControl(t, n), this.updateValueAndValidity({
                emitEvent: r.emitEvent
            }), this._onCollectionChange()
        }
        removeControl(t, n = {}) {
            this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}), delete this.controls[t], this.updateValueAndValidity({
                emitEvent: n.emitEvent
            }), this._onCollectionChange()
        }
        setControl(t, n, r = {}) {
            this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}), delete this.controls[t], n && this.registerControl(t, n), this.updateValueAndValidity({
                emitEvent: r.emitEvent
            }), this._onCollectionChange()
        }
        contains(t) {
            return this.controls.hasOwnProperty(t) && this.controls[t].enabled
        }
        setValue(t, n = {}) {
            jS(this, !0, t), Object.keys(t).forEach(r => {
                VS(this, !0, r), this.controls[r].setValue(t[r], {
                    onlySelf: !0,
                    emitEvent: n.emitEvent
                })
            }), this.updateValueAndValidity(n)
        }
        patchValue(t, n = {}) {
            t != null && (Object.keys(t).forEach(r => {
                let o = this.controls[r];
                o && o.patchValue(t[r], {
                    onlySelf: !0,
                    emitEvent: n.emitEvent
                })
            }), this.updateValueAndValidity(n))
        }
        reset(t = {}, n = {}) {
            this._forEachChild((r, o) => {
                r.reset(t ? t[o] : null, {
                    onlySelf: !0,
                    emitEvent: n.emitEvent
                })
            }), this._updatePristine(n), this._updateTouched(n), this.updateValueAndValidity(n)
        }
        getRawValue() {
            return this._reduceChildren({}, (t, n, r) => (t[r] = n.getRawValue(), t))
        }
        _syncPendingControls() {
            let t = this._reduceChildren(!1, (n, r) => r._syncPendingControls() ? !0 : n);
            return t && this.updateValueAndValidity({
                onlySelf: !0
            }), t
        }
        _forEachChild(t) {
            Object.keys(this.controls).forEach(n => {
                let r = this.controls[n];
                r && t(r, n)
            })
        }
        _setUpControls() {
            this._forEachChild(t => {
                t.setParent(this), t._registerOnCollectionChange(this._onCollectionChange)
            })
        }
        _updateValue() {
            this.value = this._reduceValue()
        }
        _anyControls(t) {
            for (let [n, r] of Object.entries(this.controls))
                if (this.contains(n) && t(r)) return !0;
            return !1
        }
        _reduceValue() {
            let t = {};
            return this._reduceChildren(t, (n, r, o) => ((r.enabled || this.disabled) && (n[o] = r.value), n))
        }
        _reduceChildren(t, n) {
            let r = t;
            return this._forEachChild((o, i) => {
                r = n(r, o, i)
            }), r
        }
        _allControlsDisabled() {
            for (let t of Object.keys(this.controls))
                if (this.controls[t].enabled) return !1;
            return Object.keys(this.controls).length > 0 || this.disabled
        }
        _find(t) {
            return this.controls.hasOwnProperty(t) ? this.controls[t] : null
        }
    };
var xr = new C("CallSetDisabledState", {
        providedIn: "root",
        factory: () => Po
    }),
    Po = "always";

function US(e, t) {
    return [...t.path, e]
}

function _a(e, t, n = Po) {
    jd(e, t), t.valueAccessor.writeValue(e.value), (e.disabled || n === "always") && t.valueAccessor.setDisabledState ? .(e.disabled), BS(e, t), zS(e, t), HS(e, t), $S(e, t)
}

function oy(e, t, n = !0) {
    let r = () => {};
    t.valueAccessor && (t.valueAccessor.registerOnChange(r), t.valueAccessor.registerOnTouched(r)), Sa(e, t), e && (t._invokeOnDestroyCallbacks(), e._registerOnCollectionChange(() => {}))
}

function Ma(e, t) {
    e.forEach(n => {
        n.registerOnValidatorChange && n.registerOnValidatorChange(t)
    })
}

function $S(e, t) {
    if (t.valueAccessor.setDisabledState) {
        let n = r => {
            t.valueAccessor.setDisabledState(r)
        };
        e.registerOnDisabledChange(n), t._registerOnDestroy(() => {
            e._unregisterOnDisabledChange(n)
        })
    }
}

function jd(e, t) {
    let n = my(e);
    t.validator !== null ? e.setValidators(ty(n, t.validator)) : typeof n == "function" && e.setValidators([n]);
    let r = vy(e);
    t.asyncValidator !== null ? e.setAsyncValidators(ty(r, t.asyncValidator)) : typeof r == "function" && e.setAsyncValidators([r]);
    let o = () => e.updateValueAndValidity();
    Ma(t._rawValidators, o), Ma(t._rawAsyncValidators, o)
}

function Sa(e, t) {
    let n = !1;
    if (e !== null) {
        if (t.validator !== null) {
            let o = my(e);
            if (Array.isArray(o) && o.length > 0) {
                let i = o.filter(s => s !== t.validator);
                i.length !== o.length && (n = !0, e.setValidators(i))
            }
        }
        if (t.asyncValidator !== null) {
            let o = vy(e);
            if (Array.isArray(o) && o.length > 0) {
                let i = o.filter(s => s !== t.asyncValidator);
                i.length !== o.length && (n = !0, e.setAsyncValidators(i))
            }
        }
    }
    let r = () => {};
    return Ma(t._rawValidators, r), Ma(t._rawAsyncValidators, r), n
}

function BS(e, t) {
    t.valueAccessor.registerOnChange(n => {
        e._pendingValue = n, e._pendingChange = !0, e._pendingDirty = !0, e.updateOn === "change" && wy(e, t)
    })
}

function HS(e, t) {
    t.valueAccessor.registerOnTouched(() => {
        e._pendingTouched = !0, e.updateOn === "blur" && e._pendingChange && wy(e, t), e.updateOn !== "submit" && e.markAsTouched()
    })
}

function wy(e, t) {
    e._pendingDirty && e.markAsDirty(), e.setValue(e._pendingValue, {
        emitModelToViewChange: !1
    }), t.viewToModelUpdate(e._pendingValue), e._pendingChange = !1
}

function zS(e, t) {
    let n = (r, o) => {
        t.valueAccessor.writeValue(r), o && t.viewToModelUpdate(r)
    };
    e.registerOnChange(n), t._registerOnDestroy(() => {
        e._unregisterOnChange(n)
    })
}

function Cy(e, t) {
    e == null, jd(e, t)
}

function GS(e, t) {
    return Sa(e, t)
}

function WS(e, t) {
    if (!e.hasOwnProperty("model")) return !1;
    let n = e.model;
    return n.isFirstChange() ? !0 : !Object.is(t, n.currentValue)
}

function qS(e) {
    return Object.getPrototypeOf(e.constructor) === Ar
}

function Ey(e, t) {
    e._syncPendingControls(), t.forEach(n => {
        let r = n.control;
        r.updateOn === "submit" && r._pendingChange && (n.viewToModelUpdate(r._pendingValue), r._pendingChange = !1)
    })
}

function ZS(e, t) {
    if (!t) return null;
    Array.isArray(t);
    let n, r, o;
    return t.forEach(i => {
        i.constructor === ly ? n = i : qS(i) ? r = i : o = i
    }), o || r || n || null
}

function YS(e, t) {
    let n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
}
var QS = {
        provide: dn,
        useExisting: qe(() => KS)
    },
    Fo = Promise.resolve(),
    KS = (() => {
        class e extends dn {
            constructor(n, r, o) {
                super(), this.callSetDisabledState = o, this.submitted = !1, this._directives = new Set, this.ngSubmit = new ne, this.form = new ba({}, Ld(n), Vd(r))
            }
            ngAfterViewInit() {
                this._setUpdateStrategy()
            }
            get formDirective() {
                return this
            }
            get control() {
                return this.form
            }
            get path() {
                return []
            }
            get controls() {
                return this.form.controls
            }
            addControl(n) {
                Fo.then(() => {
                    let r = this._findContainer(n.path);
                    n.control = r.registerControl(n.name, n.control), _a(n.control, n, this.callSetDisabledState), n.control.updateValueAndValidity({
                        emitEvent: !1
                    }), this._directives.add(n)
                })
            }
            getControl(n) {
                return this.form.get(n.path)
            }
            removeControl(n) {
                Fo.then(() => {
                    let r = this._findContainer(n.path);
                    r && r.removeControl(n.name), this._directives.delete(n)
                })
            }
            addFormGroup(n) {
                Fo.then(() => {
                    let r = this._findContainer(n.path),
                        o = new ba({});
                    Cy(o, n), r.registerControl(n.name, o), o.updateValueAndValidity({
                        emitEvent: !1
                    })
                })
            }
            removeFormGroup(n) {
                Fo.then(() => {
                    let r = this._findContainer(n.path);
                    r && r.removeControl(n.name)
                })
            }
            getFormGroup(n) {
                return this.form.get(n.path)
            }
            updateModel(n, r) {
                Fo.then(() => {
                    this.form.get(n.path).setValue(r)
                })
            }
            setValue(n) {
                this.control.setValue(n)
            }
            onSubmit(n) {
                return this.submitted = !0, Ey(this.form, this._directives), this.ngSubmit.emit(n), n ? .target ? .method === "dialog"
            }
            onReset() {
                this.resetForm()
            }
            resetForm(n = void 0) {
                this.form.reset(n), this.submitted = !1
            }
            _setUpdateStrategy() {
                this.options && this.options.updateOn != null && (this.form._updateOn = this.options.updateOn)
            }
            _findContainer(n) {
                return n.pop(), n.length ? this.form.get(n) : this.form
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(Pd, 10), _(kd, 10), _(xr, 8))
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
                        ["ng-form"],
                        ["", "ngForm", ""]
                    ],
                    hostBindings: function(r, o) {
                        r & 1 && at("submit", function(s) {
                            return o.onSubmit(s)
                        })("reset", function() {
                            return o.onReset()
                        })
                    },
                    inputs: {
                        options: [Se.None, "ngFormOptions", "options"]
                    },
                    outputs: {
                        ngSubmit: "ngSubmit"
                    },
                    exportAs: ["ngForm"],
                    features: [It([QS]), Le]
                })
            }
        }
        return e
    })();

function iy(e, t) {
    let n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
}

function sy(e) {
    return typeof e == "object" && e !== null && Object.keys(e).length === 2 && "value" in e && "disabled" in e
}
var Iy = class extends Ia {
    constructor(t = null, n, r) {
        super(yy(n), Dy(r, n)), this.defaultValue = null, this._onChange = [], this._pendingChange = !1, this._applyFormState(t), this._setUpdateStrategy(n), this._initObservables(), this.updateValueAndValidity({
            onlySelf: !0,
            emitEvent: !!this.asyncValidator
        }), Ta(n) && (n.nonNullable || n.initialValueIsDefault) && (sy(t) ? this.defaultValue = t.value : this.defaultValue = t)
    }
    setValue(t, n = {}) {
        this.value = this._pendingValue = t, this._onChange.length && n.emitModelToViewChange !== !1 && this._onChange.forEach(r => r(this.value, n.emitViewToModelChange !== !1)), this.updateValueAndValidity(n)
    }
    patchValue(t, n = {}) {
        this.setValue(t, n)
    }
    reset(t = this.defaultValue, n = {}) {
        this._applyFormState(t), this.markAsPristine(n), this.markAsUntouched(n), this.setValue(this.value, n), this._pendingChange = !1
    }
    _updateValue() {}
    _anyControls(t) {
        return !1
    }
    _allControlsDisabled() {
        return this.disabled
    }
    registerOnChange(t) {
        this._onChange.push(t)
    }
    _unregisterOnChange(t) {
        iy(this._onChange, t)
    }
    registerOnDisabledChange(t) {
        this._onDisabledChange.push(t)
    }
    _unregisterOnDisabledChange(t) {
        iy(this._onDisabledChange, t)
    }
    _forEachChild(t) {}
    _syncPendingControls() {
        return this.updateOn === "submit" && (this._pendingDirty && this.markAsDirty(), this._pendingTouched && this.markAsTouched(), this._pendingChange) ? (this.setValue(this._pendingValue, {
            onlySelf: !0,
            emitModelToViewChange: !1
        }), !0) : !1
    }
    _applyFormState(t) {
        sy(t) ? (this.value = this._pendingValue = t.value, t.disabled ? this.disable({
            onlySelf: !0,
            emitEvent: !1
        }) : this.enable({
            onlySelf: !0,
            emitEvent: !1
        })) : this.value = this._pendingValue = t
    }
};
var JS = e => e instanceof Iy;
var XS = {
        provide: Tr,
        useExisting: qe(() => eT)
    },
    ay = Promise.resolve(),
    eT = (() => {
        class e extends Tr {
            constructor(n, r, o, i, s, a) {
                super(), this._changeDetectorRef = s, this.callSetDisabledState = a, this.control = new Iy, this._registered = !1, this.name = "", this.update = new ne, this._parent = n, this._setValidators(r), this._setAsyncValidators(o), this.valueAccessor = ZS(this, i)
            }
            ngOnChanges(n) {
                if (this._checkForErrors(), !this._registered || "name" in n) {
                    if (this._registered && (this._checkName(), this.formDirective)) {
                        let r = n.name.previousValue;
                        this.formDirective.removeControl({
                            name: r,
                            path: this._getPath(r)
                        })
                    }
                    this._setUpControl()
                }
                "isDisabled" in n && this._updateDisabled(n), WS(n, this.viewModel) && (this._updateValue(this.model), this.viewModel = this.model)
            }
            ngOnDestroy() {
                this.formDirective && this.formDirective.removeControl(this)
            }
            get path() {
                return this._getPath(this.name)
            }
            get formDirective() {
                return this._parent ? this._parent.formDirective : null
            }
            viewToModelUpdate(n) {
                this.viewModel = n, this.update.emit(n)
            }
            _setUpControl() {
                this._setUpdateStrategy(), this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this), this._registered = !0
            }
            _setUpdateStrategy() {
                this.options && this.options.updateOn != null && (this.control._updateOn = this.options.updateOn)
            }
            _isStandalone() {
                return !this._parent || !!(this.options && this.options.standalone)
            }
            _setUpStandalone() {
                _a(this.control, this, this.callSetDisabledState), this.control.updateValueAndValidity({
                    emitEvent: !1
                })
            }
            _checkForErrors() {
                this._isStandalone() || this._checkParentType(), this._checkName()
            }
            _checkParentType() {}
            _checkName() {
                this.options && this.options.name && (this.name = this.options.name), !this._isStandalone() && this.name
            }
            _updateValue(n) {
                ay.then(() => {
                    this.control.setValue(n, {
                        emitViewToModelChange: !1
                    }), this._changeDetectorRef ? .markForCheck()
                })
            }
            _updateDisabled(n) {
                let r = n.isDisabled.currentValue,
                    o = r !== 0 && Ks(r);
                ay.then(() => {
                    o && !this.control.disabled ? this.control.disable() : !o && this.control.disabled && this.control.enable(), this._changeDetectorRef ? .markForCheck()
                })
            }
            _getPath(n) {
                return this._parent ? US(n, this._parent) : [n]
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(dn, 9), _(Pd, 10), _(kd, 10), _($n, 10), _(kn, 8), _(xr, 8))
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""]
                    ],
                    inputs: {
                        name: "name",
                        isDisabled: [Se.None, "disabled", "isDisabled"],
                        model: [Se.None, "ngModel", "model"],
                        options: [Se.None, "ngModelOptions", "options"]
                    },
                    outputs: {
                        update: "ngModelChange"
                    },
                    exportAs: ["ngModel"],
                    features: [It([XS]), Le, an]
                })
            }
        }
        return e
    })(),
    lU = (() => {
        class e {
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]
                    ],
                    hostAttrs: ["novalidate", ""]
                })
            }
        }
        return e
    })();
var tT = {
    provide: $n,
    useExisting: qe(() => rT),
    multi: !0
};
var nT = (() => {
        class e {
            constructor() {
                this._accessors = []
            }
            add(n, r) {
                this._accessors.push([n, r])
            }
            remove(n) {
                for (let r = this._accessors.length - 1; r >= 0; --r)
                    if (this._accessors[r][1] === n) {
                        this._accessors.splice(r, 1);
                        return
                    }
            }
            select(n) {
                this._accessors.forEach(r => {
                    this._isSameGroup(r, n) && r[1] !== n && r[1].fireUncheck(n.value)
                })
            }
            _isSameGroup(n, r) {
                return n[0].control ? n[0]._parent === r._control._parent && n[1].name === r.name : !1
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
            }
        }
        return e
    })(),
    rT = (() => {
        class e extends Ar {
            constructor(n, r, o, i) {
                super(n, r), this._registry = o, this._injector = i, this.setDisabledStateFired = !1, this.onChange = () => {}, this.callSetDisabledState = m(xr, {
                    optional: !0
                }) ? ? Po
            }
            ngOnInit() {
                this._control = this._injector.get(Tr), this._checkName(), this._registry.add(this._control, this)
            }
            ngOnDestroy() {
                this._registry.remove(this)
            }
            writeValue(n) {
                this._state = n === this.value, this.setProperty("checked", this._state)
            }
            registerOnChange(n) {
                this._fn = n, this.onChange = () => {
                    n(this.value), this._registry.select(this)
                }
            }
            setDisabledState(n) {
                (this.setDisabledStateFired || n || this.callSetDisabledState === "whenDisabledForLegacyCode") && this.setProperty("disabled", n), this.setDisabledStateFired = !0
            }
            fireUncheck(n) {
                this.writeValue(n)
            }
            _checkName() {
                this.name && this.formControlName && (this.name, this.formControlName), !this.name && this.formControlName && (this.name = this.formControlName)
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(it), _(xe), _(nT), _(Ze))
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["input", "type", "radio", "formControlName", ""],
                        ["input", "type", "radio", "formControl", ""],
                        ["input", "type", "radio", "ngModel", ""]
                    ],
                    hostBindings: function(r, o) {
                        r & 1 && at("change", function() {
                            return o.onChange()
                        })("blur", function() {
                            return o.onTouched()
                        })
                    },
                    inputs: {
                        name: "name",
                        formControlName: "formControlName",
                        value: "value"
                    },
                    features: [It([tT]), Le]
                })
            }
        }
        return e
    })(),
    oT = {
        provide: $n,
        useExisting: qe(() => iT),
        multi: !0
    },
    iT = (() => {
        class e extends Ar {
            writeValue(n) {
                this.setProperty("value", parseFloat(n))
            }
            registerOnChange(n) {
                this.onChange = r => {
                    n(r == "" ? null : parseFloat(r))
                }
            }
            static {
                this.\u0275fac = (() => {
                    let n;
                    return function(o) {
                        return (n || (n = Ht(e)))(o || e)
                    }
                })()
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["input", "type", "range", "formControlName", ""],
                        ["input", "type", "range", "formControl", ""],
                        ["input", "type", "range", "ngModel", ""]
                    ],
                    hostBindings: function(r, o) {
                        r & 1 && at("change", function(s) {
                            return o.onChange(s.target.value)
                        })("input", function(s) {
                            return o.onChange(s.target.value)
                        })("blur", function() {
                            return o.onTouched()
                        })
                    },
                    features: [It([oT]), Le]
                })
            }
        }
        return e
    })(),
    sT = new C("");
var aT = {
        provide: dn,
        useExisting: qe(() => uT)
    },
    uT = (() => {
        class e extends dn {
            constructor(n, r, o) {
                super(), this.callSetDisabledState = o, this.submitted = !1, this._onCollectionChange = () => this._updateDomValue(), this.directives = [], this.form = null, this.ngSubmit = new ne, this._setValidators(n), this._setAsyncValidators(r)
            }
            ngOnChanges(n) {
                this._checkFormPresent(), n.hasOwnProperty("form") && (this._updateValidators(), this._updateDomValue(), this._updateRegistrations(), this._oldForm = this.form)
            }
            ngOnDestroy() {
                this.form && (Sa(this.form, this), this.form._onCollectionChange === this._onCollectionChange && this.form._registerOnCollectionChange(() => {}))
            }
            get formDirective() {
                return this
            }
            get control() {
                return this.form
            }
            get path() {
                return []
            }
            addControl(n) {
                let r = this.form.get(n.path);
                return _a(r, n, this.callSetDisabledState), r.updateValueAndValidity({
                    emitEvent: !1
                }), this.directives.push(n), r
            }
            getControl(n) {
                return this.form.get(n.path)
            }
            removeControl(n) {
                oy(n.control || null, n, !1), YS(this.directives, n)
            }
            addFormGroup(n) {
                this._setUpFormContainer(n)
            }
            removeFormGroup(n) {
                this._cleanUpFormContainer(n)
            }
            getFormGroup(n) {
                return this.form.get(n.path)
            }
            addFormArray(n) {
                this._setUpFormContainer(n)
            }
            removeFormArray(n) {
                this._cleanUpFormContainer(n)
            }
            getFormArray(n) {
                return this.form.get(n.path)
            }
            updateModel(n, r) {
                this.form.get(n.path).setValue(r)
            }
            onSubmit(n) {
                return this.submitted = !0, Ey(this.form, this.directives), this.ngSubmit.emit(n), n ? .target ? .method === "dialog"
            }
            onReset() {
                this.resetForm()
            }
            resetForm(n = void 0) {
                this.form.reset(n), this.submitted = !1
            }
            _updateDomValue() {
                this.directives.forEach(n => {
                    let r = n.control,
                        o = this.form.get(n.path);
                    r !== o && (oy(r || null, n), JS(o) && (_a(o, n, this.callSetDisabledState), n.control = o))
                }), this.form._updateTreeValidity({
                    emitEvent: !1
                })
            }
            _setUpFormContainer(n) {
                let r = this.form.get(n.path);
                Cy(r, n), r.updateValueAndValidity({
                    emitEvent: !1
                })
            }
            _cleanUpFormContainer(n) {
                if (this.form) {
                    let r = this.form.get(n.path);
                    r && GS(r, n) && r.updateValueAndValidity({
                        emitEvent: !1
                    })
                }
            }
            _updateRegistrations() {
                this.form._registerOnCollectionChange(this._onCollectionChange), this._oldForm && this._oldForm._registerOnCollectionChange(() => {})
            }
            _updateValidators() {
                jd(this.form, this), this._oldForm && Sa(this._oldForm, this)
            }
            _checkFormPresent() {
                this.form
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(Pd, 10), _(kd, 10), _(xr, 8))
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["", "formGroup", ""]
                    ],
                    hostBindings: function(r, o) {
                        r & 1 && at("submit", function(s) {
                            return o.onSubmit(s)
                        })("reset", function() {
                            return o.onReset()
                        })
                    },
                    inputs: {
                        form: [Se.None, "formGroup", "form"]
                    },
                    outputs: {
                        ngSubmit: "ngSubmit"
                    },
                    exportAs: ["ngForm"],
                    features: [It([aT]), Le, an]
                })
            }
        }
        return e
    })();
var cT = {
    provide: $n,
    useExisting: qe(() => _y),
    multi: !0
};

function by(e, t) {
    return e == null ? `${t}` : (t && typeof t == "object" && (t = "Object"), `${e}: ${t}`.slice(0, 50))
}

function lT(e) {
    return e.split(":")[0]
}
var _y = (() => {
        class e extends Ar {
            constructor() {
                super(...arguments), this._optionMap = new Map, this._idCounter = 0, this._compareWith = Object.is
            }
            set compareWith(n) {
                this._compareWith = n
            }
            writeValue(n) {
                this.value = n;
                let r = this._getOptionId(n),
                    o = by(r, n);
                this.setProperty("value", o)
            }
            registerOnChange(n) {
                this.onChange = r => {
                    this.value = this._getOptionValue(r), n(this.value)
                }
            }
            _registerOption() {
                return (this._idCounter++).toString()
            }
            _getOptionId(n) {
                for (let r of this._optionMap.keys())
                    if (this._compareWith(this._optionMap.get(r), n)) return r;
                return null
            }
            _getOptionValue(n) {
                let r = lT(n);
                return this._optionMap.has(r) ? this._optionMap.get(r) : n
            }
            static {
                this.\u0275fac = (() => {
                    let n;
                    return function(o) {
                        return (n || (n = Ht(e)))(o || e)
                    }
                })()
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["select", "formControlName", "", 3, "multiple", ""],
                        ["select", "formControl", "", 3, "multiple", ""],
                        ["select", "ngModel", "", 3, "multiple", ""]
                    ],
                    hostBindings: function(r, o) {
                        r & 1 && at("change", function(s) {
                            return o.onChange(s.target.value)
                        })("blur", function() {
                            return o.onTouched()
                        })
                    },
                    inputs: {
                        compareWith: "compareWith"
                    },
                    features: [It([cT]), Le]
                })
            }
        }
        return e
    })(),
    dU = (() => {
        class e {
            constructor(n, r, o) {
                this._element = n, this._renderer = r, this._select = o, this._select && (this.id = this._select._registerOption())
            }
            set ngValue(n) {
                this._select != null && (this._select._optionMap.set(this.id, n), this._setElementValue(by(this.id, n)), this._select.writeValue(this._select.value))
            }
            set value(n) {
                this._setElementValue(n), this._select && this._select.writeValue(this._select.value)
            }
            _setElementValue(n) {
                this._renderer.setProperty(this._element.nativeElement, "value", n)
            }
            ngOnDestroy() {
                this._select && (this._select._optionMap.delete(this.id), this._select.writeValue(this._select.value))
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(xe), _(it), _(_y, 9))
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["option"]
                    ],
                    inputs: {
                        ngValue: "ngValue",
                        value: "value"
                    }
                })
            }
        }
        return e
    })(),
    dT = {
        provide: $n,
        useExisting: qe(() => My),
        multi: !0
    };

function uy(e, t) {
    return e == null ? `${t}` : (typeof t == "string" && (t = `'${t}'`), t && typeof t == "object" && (t = "Object"), `${e}: ${t}`.slice(0, 50))
}

function fT(e) {
    return e.split(":")[0]
}
var My = (() => {
        class e extends Ar {
            constructor() {
                super(...arguments), this._optionMap = new Map, this._idCounter = 0, this._compareWith = Object.is
            }
            set compareWith(n) {
                this._compareWith = n
            }
            writeValue(n) {
                this.value = n;
                let r;
                if (Array.isArray(n)) {
                    let o = n.map(i => this._getOptionId(i));
                    r = (i, s) => {
                        i._setSelected(o.indexOf(s.toString()) > -1)
                    }
                } else r = (o, i) => {
                    o._setSelected(!1)
                };
                this._optionMap.forEach(r)
            }
            registerOnChange(n) {
                this.onChange = r => {
                    let o = [],
                        i = r.selectedOptions;
                    if (i !== void 0) {
                        let s = i;
                        for (let a = 0; a < s.length; a++) {
                            let u = s[a],
                                c = this._getOptionValue(u.value);
                            o.push(c)
                        }
                    } else {
                        let s = r.options;
                        for (let a = 0; a < s.length; a++) {
                            let u = s[a];
                            if (u.selected) {
                                let c = this._getOptionValue(u.value);
                                o.push(c)
                            }
                        }
                    }
                    this.value = o, n(o)
                }
            }
            _registerOption(n) {
                let r = (this._idCounter++).toString();
                return this._optionMap.set(r, n), r
            }
            _getOptionId(n) {
                for (let r of this._optionMap.keys())
                    if (this._compareWith(this._optionMap.get(r)._value, n)) return r;
                return null
            }
            _getOptionValue(n) {
                let r = fT(n);
                return this._optionMap.has(r) ? this._optionMap.get(r)._value : n
            }
            static {
                this.\u0275fac = (() => {
                    let n;
                    return function(o) {
                        return (n || (n = Ht(e)))(o || e)
                    }
                })()
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["select", "multiple", "", "formControlName", ""],
                        ["select", "multiple", "", "formControl", ""],
                        ["select", "multiple", "", "ngModel", ""]
                    ],
                    hostBindings: function(r, o) {
                        r & 1 && at("change", function(s) {
                            return o.onChange(s.target)
                        })("blur", function() {
                            return o.onTouched()
                        })
                    },
                    inputs: {
                        compareWith: "compareWith"
                    },
                    features: [It([dT]), Le]
                })
            }
        }
        return e
    })(),
    fU = (() => {
        class e {
            constructor(n, r, o) {
                this._element = n, this._renderer = r, this._select = o, this._select && (this.id = this._select._registerOption(this))
            }
            set ngValue(n) {
                this._select != null && (this._value = n, this._setElementValue(uy(this.id, n)), this._select.writeValue(this._select.value))
            }
            set value(n) {
                this._select ? (this._value = n, this._setElementValue(uy(this.id, n)), this._select.writeValue(this._select.value)) : this._setElementValue(n)
            }
            _setElementValue(n) {
                this._renderer.setProperty(this._element.nativeElement, "value", n)
            }
            _setSelected(n) {
                this._renderer.setProperty(this._element.nativeElement, "selected", n)
            }
            ngOnDestroy() {
                this._select && (this._select._optionMap.delete(this.id), this._select.writeValue(this._select.value))
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(_(xe), _(it), _(My, 9))
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["option"]
                    ],
                    inputs: {
                        ngValue: "ngValue",
                        value: "value"
                    }
                })
            }
        }
        return e
    })();
var Sy = (() => {
    class e {
        static {
            this.\u0275fac = function(r) {
                return new(r || e)
            }
        }
        static {
            this.\u0275mod = je({
                type: e
            })
        }
        static {
            this.\u0275inj = Ue({})
        }
    }
    return e
})();
var hU = (() => {
        class e {
            static withConfig(n) {
                return {
                    ngModule: e,
                    providers: [{
                        provide: xr,
                        useValue: n.callSetDisabledState ? ? Po
                    }]
                }
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275mod = je({
                    type: e
                })
            }
            static {
                this.\u0275inj = Ue({
                    imports: [Sy]
                })
            }
        }
        return e
    })(),
    pU = (() => {
        class e {
            static withConfig(n) {
                return {
                    ngModule: e,
                    providers: [{
                        provide: sT,
                        useValue: n.warnOnNgModelWithFormControl ? ? "always"
                    }, {
                        provide: xr,
                        useValue: n.callSetDisabledState ? ? Po
                    }]
                }
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275mod = je({
                    type: e
                })
            }
            static {
                this.\u0275inj = Ue({
                    imports: [Sy]
                })
            }
        }
        return e
    })();
var Bn = function(e) {
        return e[e.State = 0] = "State", e[e.Transition = 1] = "Transition", e[e.Sequence = 2] = "Sequence", e[e.Group = 3] = "Group", e[e.Animate = 4] = "Animate", e[e.Keyframes = 5] = "Keyframes", e[e.Style = 6] = "Style", e[e.Trigger = 7] = "Trigger", e[e.Reference = 8] = "Reference", e[e.AnimateChild = 9] = "AnimateChild", e[e.AnimateRef = 10] = "AnimateRef", e[e.Query = 11] = "Query", e[e.Stagger = 12] = "Stagger", e
    }(Bn || {}),
    vU = "*";

function yU(e, t) {
    return {
        type: Bn.Trigger,
        name: e,
        definitions: t,
        options: {}
    }
}

function DU(e, t = null) {
    return {
        type: Bn.Animate,
        styles: t,
        timings: e
    }
}

function wU(e, t = null) {
    return {
        type: Bn.Sequence,
        steps: e,
        options: t
    }
}

function CU(e) {
    return {
        type: Bn.Style,
        styles: e,
        offset: null
    }
}

function EU(e, t, n) {
    return {
        type: Bn.State,
        name: e,
        styles: t,
        options: n
    }
}

function IU(e, t, n = null) {
    return {
        type: Bn.Transition,
        expr: e,
        animation: t,
        options: n
    }
}
var Ty = class {
        constructor(t = 0, n = 0) {
            this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._originalOnDoneFns = [], this._originalOnStartFns = [], this._started = !1, this._destroyed = !1, this._finished = !1, this._position = 0, this.parentPlayer = null, this.totalTime = t + n
        }
        _onFinish() {
            this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
        }
        onStart(t) {
            this._originalOnStartFns.push(t), this._onStartFns.push(t)
        }
        onDone(t) {
            this._originalOnDoneFns.push(t), this._onDoneFns.push(t)
        }
        onDestroy(t) {
            this._onDestroyFns.push(t)
        }
        hasStarted() {
            return this._started
        }
        init() {}
        play() {
            this.hasStarted() || (this._onStart(), this.triggerMicrotask()), this._started = !0
        }
        triggerMicrotask() {
            queueMicrotask(() => this._onFinish())
        }
        _onStart() {
            this._onStartFns.forEach(t => t()), this._onStartFns = []
        }
        pause() {}
        restart() {}
        finish() {
            this._onFinish()
        }
        destroy() {
            this._destroyed || (this._destroyed = !0, this.hasStarted() || this._onStart(), this.finish(), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
        }
        reset() {
            this._started = !1, this._finished = !1, this._onStartFns = this._originalOnStartFns, this._onDoneFns = this._originalOnDoneFns
        }
        setPosition(t) {
            this._position = this.totalTime ? t * this.totalTime : 1
        }
        getPosition() {
            return this.totalTime ? this._position / this.totalTime : 1
        }
        triggerCallback(t) {
            let n = t == "start" ? this._onStartFns : this._onDoneFns;
            n.forEach(r => r()), n.length = 0
        }
    },
    Ay = class {
        constructor(t) {
            this._onDoneFns = [], this._onStartFns = [], this._finished = !1, this._started = !1, this._destroyed = !1, this._onDestroyFns = [], this.parentPlayer = null, this.totalTime = 0, this.players = t;
            let n = 0,
                r = 0,
                o = 0,
                i = this.players.length;
            i == 0 ? queueMicrotask(() => this._onFinish()) : this.players.forEach(s => {
                s.onDone(() => {
                    ++n == i && this._onFinish()
                }), s.onDestroy(() => {
                    ++r == i && this._onDestroy()
                }), s.onStart(() => {
                    ++o == i && this._onStart()
                })
            }), this.totalTime = this.players.reduce((s, a) => Math.max(s, a.totalTime), 0)
        }
        _onFinish() {
            this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
        }
        init() {
            this.players.forEach(t => t.init())
        }
        onStart(t) {
            this._onStartFns.push(t)
        }
        _onStart() {
            this.hasStarted() || (this._started = !0, this._onStartFns.forEach(t => t()), this._onStartFns = [])
        }
        onDone(t) {
            this._onDoneFns.push(t)
        }
        onDestroy(t) {
            this._onDestroyFns.push(t)
        }
        hasStarted() {
            return this._started
        }
        play() {
            this.parentPlayer || this.init(), this._onStart(), this.players.forEach(t => t.play())
        }
        pause() {
            this.players.forEach(t => t.pause())
        }
        restart() {
            this.players.forEach(t => t.restart())
        }
        finish() {
            this._onFinish(), this.players.forEach(t => t.finish())
        }
        destroy() {
            this._onDestroy()
        }
        _onDestroy() {
            this._destroyed || (this._destroyed = !0, this._onFinish(), this.players.forEach(t => t.destroy()), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
        }
        reset() {
            this.players.forEach(t => t.reset()), this._destroyed = !1, this._finished = !1, this._started = !1
        }
        setPosition(t) {
            let n = t * this.totalTime;
            this.players.forEach(r => {
                let o = r.totalTime ? Math.min(1, n / r.totalTime) : 1;
                r.setPosition(o)
            })
        }
        getPosition() {
            let t = this.players.reduce((n, r) => n === null || r.totalTime > n.totalTime ? r : n, null);
            return t != null ? t.getPosition() : 0
        }
        beforeDestroy() {
            this.players.forEach(t => {
                t.beforeDestroy && t.beforeDestroy()
            })
        }
        triggerCallback(t) {
            let n = t == "start" ? this._onStartFns : this._onDoneFns;
            n.forEach(r => r()), n.length = 0
        }
    },
    bU = "!";
var P = "primary",
    Qo = Symbol("RouteTitle"),
    zd = class {
        constructor(t) {
            this.params = t || {}
        }
        has(t) {
            return Object.prototype.hasOwnProperty.call(this.params, t)
        }
        get(t) {
            if (this.has(t)) {
                let n = this.params[t];
                return Array.isArray(n) ? n[0] : n
            }
            return null
        }
        getAll(t) {
            if (this.has(t)) {
                let n = this.params[t];
                return Array.isArray(n) ? n : [n]
            }
            return []
        }
        get keys() {
            return Object.keys(this.params)
        }
    };

function Pr(e) {
    return new zd(e)
}

function hT(e, t, n) {
    let r = n.path.split("/");
    if (r.length > e.length || n.pathMatch === "full" && (t.hasChildren() || r.length < e.length)) return null;
    let o = {};
    for (let i = 0; i < r.length; i++) {
        let s = r[i],
            a = e[i];
        if (s.startsWith(":")) o[s.substring(1)] = a;
        else if (s !== a.path) return null
    }
    return {
        consumed: e.slice(0, r.length),
        posParams: o
    }
}

function pT(e, t) {
    if (e.length !== t.length) return !1;
    for (let n = 0; n < e.length; ++n)
        if (!_t(e[n], t[n])) return !1;
    return !0
}

function _t(e, t) {
    let n = e ? Gd(e) : void 0,
        r = t ? Gd(t) : void 0;
    if (!n || !r || n.length != r.length) return !1;
    let o;
    for (let i = 0; i < n.length; i++)
        if (o = n[i], !Vy(e[o], t[o])) return !1;
    return !0
}

function Gd(e) {
    return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)]
}

function Vy(e, t) {
    if (Array.isArray(e) && Array.isArray(t)) {
        if (e.length !== t.length) return !1;
        let n = [...e].sort(),
            r = [...t].sort();
        return n.every((o, i) => r[i] === o)
    } else return e === t
}

function jy(e) {
    return e.length > 0 ? e[e.length - 1] : null
}

function gn(e) {
    return cu(e) ? e : cn(e) ? W(Promise.resolve(e)) : A(e)
}
var gT = {
        exact: $y,
        subset: By
    },
    Uy = {
        exact: mT,
        subset: vT,
        ignored: () => !0
    };

function xy(e, t, n) {
    return gT[n.paths](e.root, t.root, n.matrixParams) && Uy[n.queryParams](e.queryParams, t.queryParams) && !(n.fragment === "exact" && e.fragment !== t.fragment)
}

function mT(e, t) {
    return _t(e, t)
}

function $y(e, t, n) {
    if (!zn(e.segments, t.segments) || !Na(e.segments, t.segments, n) || e.numberOfChildren !== t.numberOfChildren) return !1;
    for (let r in t.children)
        if (!e.children[r] || !$y(e.children[r], t.children[r], n)) return !1;
    return !0
}

function vT(e, t) {
    return Object.keys(t).length <= Object.keys(e).length && Object.keys(t).every(n => Vy(e[n], t[n]))
}

function By(e, t, n) {
    return Hy(e, t, t.segments, n)
}

function Hy(e, t, n, r) {
    if (e.segments.length > n.length) {
        let o = e.segments.slice(0, n.length);
        return !(!zn(o, n) || t.hasChildren() || !Na(o, n, r))
    } else if (e.segments.length === n.length) {
        if (!zn(e.segments, n) || !Na(e.segments, n, r)) return !1;
        for (let o in t.children)
            if (!e.children[o] || !By(e.children[o], t.children[o], r)) return !1;
        return !0
    } else {
        let o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
        return !zn(e.segments, o) || !Na(e.segments, o, r) || !e.children[P] ? !1 : Hy(e.children[P], t, i, r)
    }
}

function Na(e, t, n) {
    return t.every((r, o) => Uy[n](e[o].parameters, r.parameters))
}
var fn = class {
        constructor(t = new H([], {}), n = {}, r = null) {
            this.root = t, this.queryParams = n, this.fragment = r
        }
        get queryParamMap() {
            return this._queryParamMap ? ? = Pr(this.queryParams), this._queryParamMap
        }
        toString() {
            return wT.serialize(this)
        }
    },
    H = class {
        constructor(t, n) {
            this.segments = t, this.children = n, this.parent = null, Object.values(n).forEach(r => r.parent = this)
        }
        hasChildren() {
            return this.numberOfChildren > 0
        }
        get numberOfChildren() {
            return Object.keys(this.children).length
        }
        toString() {
            return Ra(this)
        }
    },
    Hn = class {
        constructor(t, n) {
            this.path = t, this.parameters = n
        }
        get parameterMap() {
            return this._parameterMap ? ? = Pr(this.parameters), this._parameterMap
        }
        toString() {
            return Gy(this)
        }
    };

function yT(e, t) {
    return zn(e, t) && e.every((n, r) => _t(n.parameters, t[r].parameters))
}

function zn(e, t) {
    return e.length !== t.length ? !1 : e.every((n, r) => n.path === t[r].path)
}

function DT(e, t) {
    let n = [];
    return Object.entries(e.children).forEach(([r, o]) => {
        r === P && (n = n.concat(t(o, r)))
    }), Object.entries(e.children).forEach(([r, o]) => {
        r !== P && (n = n.concat(t(o, r)))
    }), n
}
var Ko = (() => {
        class e {
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: () => new Bo,
                    providedIn: "root"
                })
            }
        }
        return e
    })(),
    Bo = class {
        parse(t) {
            let n = new qd(t);
            return new fn(n.parseRootSegment(), n.parseQueryParams(), n.parseFragment())
        }
        serialize(t) {
            let n = `/${ko(t.root,!0)}`,
                r = IT(t.queryParams),
                o = typeof t.fragment == "string" ? `#${CT(t.fragment)}` : "";
            return `${n}${r}${o}`
        }
    },
    wT = new Bo;

function Ra(e) {
    return e.segments.map(t => Gy(t)).join("/")
}

function ko(e, t) {
    if (!e.hasChildren()) return Ra(e);
    if (t) {
        let n = e.children[P] ? ko(e.children[P], !1) : "",
            r = [];
        return Object.entries(e.children).forEach(([o, i]) => {
            o !== P && r.push(`${o}:${ko(i,!1)}`)
        }), r.length > 0 ? `${n}(${r.join("//")})` : n
    } else {
        let n = DT(e, (r, o) => o === P ? [ko(e.children[P], !1)] : [`${o}:${ko(r,!1)}`]);
        return Object.keys(e.children).length === 1 && e.children[P] != null ? `${Ra(e)}/${n[0]}` : `${Ra(e)}/(${n.join("//")})`
    }
}

function zy(e) {
    return encodeURIComponent(e).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
}

function Aa(e) {
    return zy(e).replace(/%3B/gi, ";")
}

function CT(e) {
    return encodeURI(e)
}

function Wd(e) {
    return zy(e).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
}

function Oa(e) {
    return decodeURIComponent(e)
}

function Ny(e) {
    return Oa(e.replace(/\+/g, "%20"))
}

function Gy(e) {
    return `${Wd(e.path)}${ET(e.parameters)}`
}

function ET(e) {
    return Object.entries(e).map(([t, n]) => `;${Wd(t)}=${Wd(n)}`).join("")
}

function IT(e) {
    let t = Object.entries(e).map(([n, r]) => Array.isArray(r) ? r.map(o => `${Aa(n)}=${Aa(o)}`).join("&") : `${Aa(n)}=${Aa(r)}`).filter(n => n);
    return t.length ? `?${t.join("&")}` : ""
}
var bT = /^[^\/()?;#]+/;

function Ud(e) {
    let t = e.match(bT);
    return t ? t[0] : ""
}
var _T = /^[^\/()?;=#]+/;

function MT(e) {
    let t = e.match(_T);
    return t ? t[0] : ""
}
var ST = /^[^=?&#]+/;

function TT(e) {
    let t = e.match(ST);
    return t ? t[0] : ""
}
var AT = /^[^&#]+/;

function xT(e) {
    let t = e.match(AT);
    return t ? t[0] : ""
}
var qd = class {
    constructor(t) {
        this.url = t, this.remaining = t
    }
    parseRootSegment() {
        return this.consumeOptional("/"), this.remaining === "" || this.peekStartsWith("?") || this.peekStartsWith("#") ? new H([], {}) : new H([], this.parseChildren())
    }
    parseQueryParams() {
        let t = {};
        if (this.consumeOptional("?"))
            do this.parseQueryParam(t); while (this.consumeOptional("&"));
        return t
    }
    parseFragment() {
        return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
    }
    parseChildren() {
        if (this.remaining === "") return {};
        this.consumeOptional("/");
        let t = [];
        for (this.peekStartsWith("(") || t.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");) this.capture("/"), t.push(this.parseSegment());
        let n = {};
        this.peekStartsWith("/(") && (this.capture("/"), n = this.parseParens(!0));
        let r = {};
        return this.peekStartsWith("(") && (r = this.parseParens(!1)), (t.length > 0 || Object.keys(n).length > 0) && (r[P] = new H(t, n)), r
    }
    parseSegment() {
        let t = Ud(this.remaining);
        if (t === "" && this.peekStartsWith(";")) throw new D(4009, !1);
        return this.capture(t), new Hn(Oa(t), this.parseMatrixParams())
    }
    parseMatrixParams() {
        let t = {};
        for (; this.consumeOptional(";");) this.parseParam(t);
        return t
    }
    parseParam(t) {
        let n = MT(this.remaining);
        if (!n) return;
        this.capture(n);
        let r = "";
        if (this.consumeOptional("=")) {
            let o = Ud(this.remaining);
            o && (r = o, this.capture(r))
        }
        t[Oa(n)] = Oa(r)
    }
    parseQueryParam(t) {
        let n = TT(this.remaining);
        if (!n) return;
        this.capture(n);
        let r = "";
        if (this.consumeOptional("=")) {
            let s = xT(this.remaining);
            s && (r = s, this.capture(r))
        }
        let o = Ny(n),
            i = Ny(r);
        if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || (s = [s], t[o] = s), s.push(i)
        } else t[o] = i
    }
    parseParens(t) {
        let n = {};
        for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0;) {
            let r = Ud(this.remaining),
                o = this.remaining[r.length];
            if (o !== "/" && o !== ")" && o !== ";") throw new D(4010, !1);
            let i;
            r.indexOf(":") > -1 ? (i = r.slice(0, r.indexOf(":")), this.capture(i), this.capture(":")) : t && (i = P);
            let s = this.parseChildren();
            n[i] = Object.keys(s).length === 1 ? s[P] : new H([], s), this.consumeOptional("//")
        }
        return n
    }
    peekStartsWith(t) {
        return this.remaining.startsWith(t)
    }
    consumeOptional(t) {
        return this.peekStartsWith(t) ? (this.remaining = this.remaining.substring(t.length), !0) : !1
    }
    capture(t) {
        if (!this.consumeOptional(t)) throw new D(4011, !1)
    }
};

function Wy(e) {
    return e.segments.length > 0 ? new H([], {
        [P]: e
    }) : e
}

function qy(e) {
    let t = {};
    for (let [r, o] of Object.entries(e.children)) {
        let i = qy(o);
        if (r === P && i.segments.length === 0 && i.hasChildren())
            for (let [s, a] of Object.entries(i.children)) t[s] = a;
        else(i.segments.length > 0 || i.hasChildren()) && (t[r] = i)
    }
    let n = new H(e.segments, t);
    return NT(n)
}

function NT(e) {
    if (e.numberOfChildren === 1 && e.children[P]) {
        let t = e.children[P];
        return new H(e.segments.concat(t.segments), t.children)
    }
    return e
}

function kr(e) {
    return e instanceof fn
}

function RT(e, t, n = null, r = null) {
    let o = Zy(e);
    return Yy(o, t, n, r)
}

function Zy(e) {
    let t;

    function n(i) {
        let s = {};
        for (let u of i.children) {
            let c = n(u);
            s[u.outlet] = c
        }
        let a = new H(i.url, s);
        return i === e && (t = a), a
    }
    let r = n(e.root),
        o = Wy(r);
    return t ? ? o
}

function Yy(e, t, n, r) {
    let o = e;
    for (; o.parent;) o = o.parent;
    if (t.length === 0) return $d(o, o, o, n, r);
    let i = OT(t);
    if (i.toRoot()) return $d(o, o, new H([], {}), n, r);
    let s = FT(i, o, e),
        a = s.processChildren ? jo(s.segmentGroup, s.index, i.commands) : Ky(s.segmentGroup, s.index, i.commands);
    return $d(o, s.segmentGroup, a, n, r)
}

function Fa(e) {
    return typeof e == "object" && e != null && !e.outlets && !e.segmentPath
}

function Ho(e) {
    return typeof e == "object" && e != null && e.outlets
}

function $d(e, t, n, r, o) {
    let i = {};
    r && Object.entries(r).forEach(([u, c]) => {
        i[u] = Array.isArray(c) ? c.map(l => `${l}`) : `${c}`
    });
    let s;
    e === t ? s = n : s = Qy(e, t, n);
    let a = Wy(qy(s));
    return new fn(a, i, o)
}

function Qy(e, t, n) {
    let r = {};
    return Object.entries(e.children).forEach(([o, i]) => {
        i === t ? r[o] = n : r[o] = Qy(i, t, n)
    }), new H(e.segments, r)
}
var Pa = class {
    constructor(t, n, r) {
        if (this.isAbsolute = t, this.numberOfDoubleDots = n, this.commands = r, t && r.length > 0 && Fa(r[0])) throw new D(4003, !1);
        let o = r.find(Ho);
        if (o && o !== jy(r)) throw new D(4004, !1)
    }
    toRoot() {
        return this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/"
    }
};

function OT(e) {
    if (typeof e[0] == "string" && e.length === 1 && e[0] === "/") return new Pa(!0, 0, e);
    let t = 0,
        n = !1,
        r = e.reduce((o, i, s) => {
            if (typeof i == "object" && i != null) {
                if (i.outlets) {
                    let a = {};
                    return Object.entries(i.outlets).forEach(([u, c]) => {
                        a[u] = typeof c == "string" ? c.split("/") : c
                    }), [...o, {
                        outlets: a
                    }]
                }
                if (i.segmentPath) return [...o, i.segmentPath]
            }
            return typeof i != "string" ? [...o, i] : s === 0 ? (i.split("/").forEach((a, u) => {
                u == 0 && a === "." || (u == 0 && a === "" ? n = !0 : a === ".." ? t++ : a != "" && o.push(a))
            }), o) : [...o, i]
        }, []);
    return new Pa(n, t, r)
}
var Or = class {
    constructor(t, n, r) {
        this.segmentGroup = t, this.processChildren = n, this.index = r
    }
};

function FT(e, t, n) {
    if (e.isAbsolute) return new Or(t, !0, 0);
    if (!n) return new Or(t, !1, NaN);
    if (n.parent === null) return new Or(n, !0, 0);
    let r = Fa(e.commands[0]) ? 0 : 1,
        o = n.segments.length - 1 + r;
    return PT(n, o, e.numberOfDoubleDots)
}

function PT(e, t, n) {
    let r = e,
        o = t,
        i = n;
    for (; i > o;) {
        if (i -= o, r = r.parent, !r) throw new D(4005, !1);
        o = r.segments.length
    }
    return new Or(r, !1, o - i)
}

function kT(e) {
    return Ho(e[0]) ? e[0].outlets : {
        [P]: e
    }
}

function Ky(e, t, n) {
    if (e ? ? = new H([], {}), e.segments.length === 0 && e.hasChildren()) return jo(e, t, n);
    let r = LT(e, t, n),
        o = n.slice(r.commandIndex);
    if (r.match && r.pathIndex < e.segments.length) {
        let i = new H(e.segments.slice(0, r.pathIndex), {});
        return i.children[P] = new H(e.segments.slice(r.pathIndex), e.children), jo(i, 0, o)
    } else return r.match && o.length === 0 ? new H(e.segments, {}) : r.match && !e.hasChildren() ? Zd(e, t, n) : r.match ? jo(e, 0, o) : Zd(e, t, n)
}

function jo(e, t, n) {
    if (n.length === 0) return new H(e.segments, {}); {
        let r = kT(n),
            o = {};
        if (Object.keys(r).some(i => i !== P) && e.children[P] && e.numberOfChildren === 1 && e.children[P].segments.length === 0) {
            let i = jo(e.children[P], t, n);
            return new H(e.segments, i.children)
        }
        return Object.entries(r).forEach(([i, s]) => {
            typeof s == "string" && (s = [s]), s !== null && (o[i] = Ky(e.children[i], t, s))
        }), Object.entries(e.children).forEach(([i, s]) => {
            r[i] === void 0 && (o[i] = s)
        }), new H(e.segments, o)
    }
}

function LT(e, t, n) {
    let r = 0,
        o = t,
        i = {
            match: !1,
            pathIndex: 0,
            commandIndex: 0
        };
    for (; o < e.segments.length;) {
        if (r >= n.length) return i;
        let s = e.segments[o],
            a = n[r];
        if (Ho(a)) break;
        let u = `${a}`,
            c = r < n.length - 1 ? n[r + 1] : null;
        if (o > 0 && u === void 0) break;
        if (u && c && typeof c == "object" && c.outlets === void 0) {
            if (!Oy(u, c, s)) return i;
            r += 2
        } else {
            if (!Oy(u, {}, s)) return i;
            r++
        }
        o++
    }
    return {
        match: !0,
        pathIndex: o,
        commandIndex: r
    }
}

function Zd(e, t, n) {
    let r = e.segments.slice(0, t),
        o = 0;
    for (; o < n.length;) {
        let i = n[o];
        if (Ho(i)) {
            let u = VT(i.outlets);
            return new H(r, u)
        }
        if (o === 0 && Fa(n[0])) {
            let u = e.segments[t];
            r.push(new Hn(u.path, Ry(n[0]))), o++;
            continue
        }
        let s = Ho(i) ? i.outlets[P] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
        s && a && Fa(a) ? (r.push(new Hn(s, Ry(a))), o += 2) : (r.push(new Hn(s, {})), o++)
    }
    return new H(r, {})
}

function VT(e) {
    let t = {};
    return Object.entries(e).forEach(([n, r]) => {
        typeof r == "string" && (r = [r]), r !== null && (t[n] = Zd(new H([], {}), 0, r))
    }), t
}

function Ry(e) {
    let t = {};
    return Object.entries(e).forEach(([n, r]) => t[n] = `${r}`), t
}

function Oy(e, t, n) {
    return e == n.path && _t(t, n.parameters)
}
var Uo = "imperative",
    de = function(e) {
        return e[e.NavigationStart = 0] = "NavigationStart", e[e.NavigationEnd = 1] = "NavigationEnd", e[e.NavigationCancel = 2] = "NavigationCancel", e[e.NavigationError = 3] = "NavigationError", e[e.RoutesRecognized = 4] = "RoutesRecognized", e[e.ResolveStart = 5] = "ResolveStart", e[e.ResolveEnd = 6] = "ResolveEnd", e[e.GuardsCheckStart = 7] = "GuardsCheckStart", e[e.GuardsCheckEnd = 8] = "GuardsCheckEnd", e[e.RouteConfigLoadStart = 9] = "RouteConfigLoadStart", e[e.RouteConfigLoadEnd = 10] = "RouteConfigLoadEnd", e[e.ChildActivationStart = 11] = "ChildActivationStart", e[e.ChildActivationEnd = 12] = "ChildActivationEnd", e[e.ActivationStart = 13] = "ActivationStart", e[e.ActivationEnd = 14] = "ActivationEnd", e[e.Scroll = 15] = "Scroll", e[e.NavigationSkipped = 16] = "NavigationSkipped", e
    }(de || {}),
    Ke = class {
        constructor(t, n) {
            this.id = t, this.url = n
        }
    },
    Lr = class extends Ke {
        constructor(t, n, r = "imperative", o = null) {
            super(t, n), this.type = de.NavigationStart, this.navigationTrigger = r, this.restoredState = o
        }
        toString() {
            return `NavigationStart(id: ${this.id}, url: '${this.url}')`
        }
    },
    Yt = class extends Ke {
        constructor(t, n, r) {
            super(t, n), this.urlAfterRedirects = r, this.type = de.NavigationEnd
        }
        toString() {
            return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
        }
    },
    Qe = function(e) {
        return e[e.Redirect = 0] = "Redirect", e[e.SupersededByNewNavigation = 1] = "SupersededByNewNavigation", e[e.NoDataFromResolver = 2] = "NoDataFromResolver", e[e.GuardRejected = 3] = "GuardRejected", e
    }(Qe || {}),
    ka = function(e) {
        return e[e.IgnoredSameUrlNavigation = 0] = "IgnoredSameUrlNavigation", e[e.IgnoredByUrlHandlingStrategy = 1] = "IgnoredByUrlHandlingStrategy", e
    }(ka || {}),
    hn = class extends Ke {
        constructor(t, n, r, o) {
            super(t, n), this.reason = r, this.code = o, this.type = de.NavigationCancel
        }
        toString() {
            return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
        }
    },
    pn = class extends Ke {
        constructor(t, n, r, o) {
            super(t, n), this.reason = r, this.code = o, this.type = de.NavigationSkipped
        }
    },
    zo = class extends Ke {
        constructor(t, n, r, o) {
            super(t, n), this.error = r, this.target = o, this.type = de.NavigationError
        }
        toString() {
            return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
        }
    },
    La = class extends Ke {
        constructor(t, n, r, o) {
            super(t, n), this.urlAfterRedirects = r, this.state = o, this.type = de.RoutesRecognized
        }
        toString() {
            return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
    },
    Yd = class extends Ke {
        constructor(t, n, r, o) {
            super(t, n), this.urlAfterRedirects = r, this.state = o, this.type = de.GuardsCheckStart
        }
        toString() {
            return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
    },
    Qd = class extends Ke {
        constructor(t, n, r, o, i) {
            super(t, n), this.urlAfterRedirects = r, this.state = o, this.shouldActivate = i, this.type = de.GuardsCheckEnd
        }
        toString() {
            return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
        }
    },
    Kd = class extends Ke {
        constructor(t, n, r, o) {
            super(t, n), this.urlAfterRedirects = r, this.state = o, this.type = de.ResolveStart
        }
        toString() {
            return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
    },
    Jd = class extends Ke {
        constructor(t, n, r, o) {
            super(t, n), this.urlAfterRedirects = r, this.state = o, this.type = de.ResolveEnd
        }
        toString() {
            return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
    },
    Xd = class {
        constructor(t) {
            this.route = t, this.type = de.RouteConfigLoadStart
        }
        toString() {
            return `RouteConfigLoadStart(path: ${this.route.path})`
        }
    },
    ef = class {
        constructor(t) {
            this.route = t, this.type = de.RouteConfigLoadEnd
        }
        toString() {
            return `RouteConfigLoadEnd(path: ${this.route.path})`
        }
    },
    tf = class {
        constructor(t) {
            this.snapshot = t, this.type = de.ChildActivationStart
        }
        toString() {
            return `ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
        }
    },
    nf = class {
        constructor(t) {
            this.snapshot = t, this.type = de.ChildActivationEnd
        }
        toString() {
            return `ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
        }
    },
    rf = class {
        constructor(t) {
            this.snapshot = t, this.type = de.ActivationStart
        }
        toString() {
            return `ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
        }
    },
    of = class {
        constructor(t) {
            this.snapshot = t, this.type = de.ActivationEnd
        }
        toString() {
            return `ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
        }
    },
    Va = class {
        constructor(t, n, r) {
            this.routerEvent = t, this.position = n, this.anchor = r, this.type = de.Scroll
        }
        toString() {
            let t = this.position ? `${this.position[0]}, ${this.position[1]}` : null;
            return `Scroll(anchor: '${this.anchor}', position: '${t}')`
        }
    },
    Go = class {},
    Wo = class {
        constructor(t) {
            this.url = t
        }
    };
var sf = class {
        constructor() {
            this.outlet = null, this.route = null, this.injector = null, this.children = new Jo, this.attachRef = null
        }
    },
    Jo = (() => {
        class e {
            constructor() {
                this.contexts = new Map
            }
            onChildOutletCreated(n, r) {
                let o = this.getOrCreateContext(n);
                o.outlet = r, this.contexts.set(n, o)
            }
            onChildOutletDestroyed(n) {
                let r = this.getContext(n);
                r && (r.outlet = null, r.attachRef = null)
            }
            onOutletDeactivated() {
                let n = this.contexts;
                return this.contexts = new Map, n
            }
            onOutletReAttached(n) {
                this.contexts = n
            }
            getOrCreateContext(n) {
                let r = this.getContext(n);
                return r || (r = new sf, this.contexts.set(n, r)), r
            }
            getContext(n) {
                return this.contexts.get(n) || null
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
            }
        }
        return e
    })(),
    ja = class {
        constructor(t) {
            this._root = t
        }
        get root() {
            return this._root.value
        }
        parent(t) {
            let n = this.pathFromRoot(t);
            return n.length > 1 ? n[n.length - 2] : null
        }
        children(t) {
            let n = af(t, this._root);
            return n ? n.children.map(r => r.value) : []
        }
        firstChild(t) {
            let n = af(t, this._root);
            return n && n.children.length > 0 ? n.children[0].value : null
        }
        siblings(t) {
            let n = uf(t, this._root);
            return n.length < 2 ? [] : n[n.length - 2].children.map(o => o.value).filter(o => o !== t)
        }
        pathFromRoot(t) {
            return uf(t, this._root).map(n => n.value)
        }
    };

function af(e, t) {
    if (e === t.value) return t;
    for (let n of t.children) {
        let r = af(e, n);
        if (r) return r
    }
    return null
}

function uf(e, t) {
    if (e === t.value) return [t];
    for (let n of t.children) {
        let r = uf(e, n);
        if (r.length) return r.unshift(t), r
    }
    return []
}
var He = class {
    constructor(t, n) {
        this.value = t, this.children = n
    }
    toString() {
        return `TreeNode(${this.value})`
    }
};

function Rr(e) {
    let t = {};
    return e && e.children.forEach(n => t[n.value.outlet] = n), t
}
var Ua = class extends ja {
    constructor(t, n) {
        super(t), this.snapshot = n, yf(this, t)
    }
    toString() {
        return this.snapshot.toString()
    }
};

function Jy(e) {
    let t = jT(e),
        n = new pe([new Hn("", {})]),
        r = new pe({}),
        o = new pe({}),
        i = new pe({}),
        s = new pe(""),
        a = new Vr(n, r, i, s, o, P, e, t.root);
    return a.snapshot = t.root, new Ua(new He(a, []), t)
}

function jT(e) {
    let t = {},
        n = {},
        r = {},
        o = "",
        i = new qo([], t, r, o, n, P, e, null, {});
    return new $a("", new He(i, []))
}
var Vr = class {
    constructor(t, n, r, o, i, s, a, u) {
        this.urlSubject = t, this.paramsSubject = n, this.queryParamsSubject = r, this.fragmentSubject = o, this.dataSubject = i, this.outlet = s, this.component = a, this._futureSnapshot = u, this.title = this.dataSubject ? .pipe(O(c => c[Qo])) ? ? A(void 0), this.url = t, this.params = n, this.queryParams = r, this.fragment = o, this.data = i
    }
    get routeConfig() {
        return this._futureSnapshot.routeConfig
    }
    get root() {
        return this._routerState.root
    }
    get parent() {
        return this._routerState.parent(this)
    }
    get firstChild() {
        return this._routerState.firstChild(this)
    }
    get children() {
        return this._routerState.children(this)
    }
    get pathFromRoot() {
        return this._routerState.pathFromRoot(this)
    }
    get paramMap() {
        return this._paramMap ? ? = this.params.pipe(O(t => Pr(t))), this._paramMap
    }
    get queryParamMap() {
        return this._queryParamMap ? ? = this.queryParams.pipe(O(t => Pr(t))), this._queryParamMap
    }
    toString() {
        return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
    }
};

function vf(e, t, n = "emptyOnly") {
    let r, {
        routeConfig: o
    } = e;
    return t !== null && (n === "always" || o ? .path === "" || !t.component && !t.routeConfig ? .loadComponent) ? r = {
        params: y(y({}, t.params), e.params),
        data: y(y({}, t.data), e.data),
        resolve: y(y(y(y({}, e.data), t.data), o ? .data), e._resolvedData)
    } : r = {
        params: y({}, e.params),
        data: y({}, e.data),
        resolve: y(y({}, e.data), e._resolvedData ? ? {})
    }, o && eD(o) && (r.resolve[Qo] = o.title), r
}
var qo = class {
        get title() {
            return this.data ? .[Qo]
        }
        constructor(t, n, r, o, i, s, a, u, c) {
            this.url = t, this.params = n, this.queryParams = r, this.fragment = o, this.data = i, this.outlet = s, this.component = a, this.routeConfig = u, this._resolve = c
        }
        get root() {
            return this._routerState.root
        }
        get parent() {
            return this._routerState.parent(this)
        }
        get firstChild() {
            return this._routerState.firstChild(this)
        }
        get children() {
            return this._routerState.children(this)
        }
        get pathFromRoot() {
            return this._routerState.pathFromRoot(this)
        }
        get paramMap() {
            return this._paramMap ? ? = Pr(this.params), this._paramMap
        }
        get queryParamMap() {
            return this._queryParamMap ? ? = Pr(this.queryParams), this._queryParamMap
        }
        toString() {
            let t = this.url.map(r => r.toString()).join("/"),
                n = this.routeConfig ? this.routeConfig.path : "";
            return `Route(url:'${t}', path:'${n}')`
        }
    },
    $a = class extends ja {
        constructor(t, n) {
            super(n), this.url = t, yf(this, n)
        }
        toString() {
            return Xy(this._root)
        }
    };

function yf(e, t) {
    t.value._routerState = e, t.children.forEach(n => yf(e, n))
}

function Xy(e) {
    let t = e.children.length > 0 ? ` { ${e.children.map(Xy).join(", ")} } ` : "";
    return `${e.value}${t}`
}

function Bd(e) {
    if (e.snapshot) {
        let t = e.snapshot,
            n = e._futureSnapshot;
        e.snapshot = n, _t(t.queryParams, n.queryParams) || e.queryParamsSubject.next(n.queryParams), t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment), _t(t.params, n.params) || e.paramsSubject.next(n.params), pT(t.url, n.url) || e.urlSubject.next(n.url), _t(t.data, n.data) || e.dataSubject.next(n.data)
    } else e.snapshot = e._futureSnapshot, e.dataSubject.next(e._futureSnapshot.data)
}

function cf(e, t) {
    let n = _t(e.params, t.params) && yT(e.url, t.url),
        r = !e.parent != !t.parent;
    return n && !r && (!e.parent || cf(e.parent, t.parent))
}

function eD(e) {
    return typeof e.title == "string" || e.title === null
}
var UT = (() => {
        class e {
            constructor() {
                this.activated = null, this._activatedRoute = null, this.name = P, this.activateEvents = new ne, this.deactivateEvents = new ne, this.attachEvents = new ne, this.detachEvents = new ne, this.parentContexts = m(Jo), this.location = m(st), this.changeDetector = m(kn), this.environmentInjector = m(Te), this.inputBinder = m(Wa, {
                    optional: !0
                }), this.supportsBindingToComponentInputs = !0
            }
            get activatedComponentRef() {
                return this.activated
            }
            ngOnChanges(n) {
                if (n.name) {
                    let {
                        firstChange: r,
                        previousValue: o
                    } = n.name;
                    if (r) return;
                    this.isTrackedInParentContexts(o) && (this.deactivate(), this.parentContexts.onChildOutletDestroyed(o)), this.initializeOutletWithName()
                }
            }
            ngOnDestroy() {
                this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name), this.inputBinder ? .unsubscribeFromRouteData(this)
            }
            isTrackedInParentContexts(n) {
                return this.parentContexts.getContext(n) ? .outlet === this
            }
            ngOnInit() {
                this.initializeOutletWithName()
            }
            initializeOutletWithName() {
                if (this.parentContexts.onChildOutletCreated(this.name, this), this.activated) return;
                let n = this.parentContexts.getContext(this.name);
                n ? .route && (n.attachRef ? this.attach(n.attachRef, n.route) : this.activateWith(n.route, n.injector))
            }
            get isActivated() {
                return !!this.activated
            }
            get component() {
                if (!this.activated) throw new D(4012, !1);
                return this.activated.instance
            }
            get activatedRoute() {
                if (!this.activated) throw new D(4012, !1);
                return this._activatedRoute
            }
            get activatedRouteData() {
                return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
            }
            detach() {
                if (!this.activated) throw new D(4012, !1);
                this.location.detach();
                let n = this.activated;
                return this.activated = null, this._activatedRoute = null, this.detachEvents.emit(n.instance), n
            }
            attach(n, r) {
                this.activated = n, this._activatedRoute = r, this.location.insert(n.hostView), this.inputBinder ? .bindActivatedRouteToOutletComponent(this), this.attachEvents.emit(n.instance)
            }
            deactivate() {
                if (this.activated) {
                    let n = this.component;
                    this.activated.destroy(), this.activated = null, this._activatedRoute = null, this.deactivateEvents.emit(n)
                }
            }
            activateWith(n, r) {
                if (this.isActivated) throw new D(4013, !1);
                this._activatedRoute = n;
                let o = this.location,
                    s = n.snapshot.component,
                    a = this.parentContexts.getOrCreateContext(this.name).children,
                    u = new lf(n, a, o.injector);
                this.activated = o.createComponent(s, {
                    index: o.length,
                    injector: u,
                    environmentInjector: r ? ? this.environmentInjector
                }), this.changeDetector.markForCheck(), this.inputBinder ? .bindActivatedRouteToOutletComponent(this), this.activateEvents.emit(this.activated.instance)
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275dir = z({
                    type: e,
                    selectors: [
                        ["router-outlet"]
                    ],
                    inputs: {
                        name: "name"
                    },
                    outputs: {
                        activateEvents: "activate",
                        deactivateEvents: "deactivate",
                        attachEvents: "attach",
                        detachEvents: "detach"
                    },
                    exportAs: ["outlet"],
                    standalone: !0,
                    features: [an]
                })
            }
        }
        return e
    })(),
    lf = class {
        constructor(t, n, r) {
            this.route = t, this.childContexts = n, this.parent = r
        }
        get(t, n) {
            return t === Vr ? this.route : t === Jo ? this.childContexts : this.parent.get(t, n)
        }
    },
    Wa = new C(""),
    Fy = (() => {
        class e {
            constructor() {
                this.outletDataSubscriptions = new Map
            }
            bindActivatedRouteToOutletComponent(n) {
                this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n)
            }
            unsubscribeFromRouteData(n) {
                this.outletDataSubscriptions.get(n) ? .unsubscribe(), this.outletDataSubscriptions.delete(n)
            }
            subscribeToRouteData(n) {
                let {
                    activatedRoute: r
                } = n, o = zr([r.queryParams, r.params, r.data]).pipe(Oe(([i, s, a], u) => (a = y(y(y({}, i), s), a), u === 0 ? A(a) : Promise.resolve(a)))).subscribe(i => {
                    if (!n.isActivated || !n.activatedComponentRef || n.activatedRoute !== r || r.component === null) {
                        this.unsubscribeFromRouteData(n);
                        return
                    }
                    let s = hv(r.component);
                    if (!s) {
                        this.unsubscribeFromRouteData(n);
                        return
                    }
                    for (let {
                            templateName: a
                        } of s.inputs) n.activatedComponentRef.setInput(a, i[a])
                });
                this.outletDataSubscriptions.set(n, o)
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac
                })
            }
        }
        return e
    })();

function $T(e, t, n) {
    let r = Zo(e, t._root, n ? n._root : void 0);
    return new Ua(r, t)
}

function Zo(e, t, n) {
    if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
        let r = n.value;
        r._futureSnapshot = t.value;
        let o = BT(e, t, n);
        return new He(r, o)
    } else {
        if (e.shouldAttach(t.value)) {
            let i = e.retrieve(t.value);
            if (i !== null) {
                let s = i.route;
                return s.value._futureSnapshot = t.value, s.children = t.children.map(a => Zo(e, a)), s
            }
        }
        let r = HT(t.value),
            o = t.children.map(i => Zo(e, i));
        return new He(r, o)
    }
}

function BT(e, t, n) {
    return t.children.map(r => {
        for (let o of n.children)
            if (e.shouldReuseRoute(r.value, o.value.snapshot)) return Zo(e, r, o);
        return Zo(e, r)
    })
}

function HT(e) {
    return new Vr(new pe(e.url), new pe(e.params), new pe(e.queryParams), new pe(e.fragment), new pe(e.data), e.outlet, e.component, e)
}
var tD = "ngNavigationCancelingError";

function nD(e, t) {
    let {
        redirectTo: n,
        navigationBehaviorOptions: r
    } = kr(t) ? {
        redirectTo: t,
        navigationBehaviorOptions: void 0
    } : t, o = rD(!1, Qe.Redirect);
    return o.url = n, o.navigationBehaviorOptions = r, o
}

function rD(e, t) {
    let n = new Error(`NavigationCancelingError: ${e||""}`);
    return n[tD] = !0, n.cancellationCode = t, n
}

function zT(e) {
    return oD(e) && kr(e.url)
}

function oD(e) {
    return !!e && e[tD]
}
var GT = (() => {
    class e {
        static {
            this.\u0275fac = function(r) {
                return new(r || e)
            }
        }
        static {
            this.\u0275cmp = ip({
                type: e,
                selectors: [
                    ["ng-component"]
                ],
                standalone: !0,
                features: [tv],
                decls: 1,
                vars: 0,
                template: function(r, o) {
                    r & 1 && Ql(0, "router-outlet")
                },
                dependencies: [UT],
                encapsulation: 2
            })
        }
    }
    return e
})();

function WT(e, t) {
    return e.providers && !e._injector && (e._injector = Us(e.providers, t, `Route: ${e.path}`)), e._injector ? ? t
}

function Df(e) {
    let t = e.children && e.children.map(Df),
        n = t ? Q(y({}, e), {
            children: t
        }) : y({}, e);
    return !n.component && !n.loadComponent && (t || n.loadChildren) && n.outlet && n.outlet !== P && (n.component = GT), n
}

function Mt(e) {
    return e.outlet || P
}

function qT(e, t) {
    let n = e.filter(r => Mt(r) === t);
    return n.push(...e.filter(r => Mt(r) !== t)), n
}

function Xo(e) {
    if (!e) return null;
    if (e.routeConfig ? ._injector) return e.routeConfig._injector;
    for (let t = e.parent; t; t = t.parent) {
        let n = t.routeConfig;
        if (n ? ._loadedInjector) return n._loadedInjector;
        if (n ? ._injector) return n._injector
    }
    return null
}
var ZT = (e, t, n, r) => O(o => (new df(t, o.targetRouterState, o.currentRouterState, n, r).activate(e), o)),
    df = class {
        constructor(t, n, r, o, i) {
            this.routeReuseStrategy = t, this.futureState = n, this.currState = r, this.forwardEvent = o, this.inputBindingEnabled = i
        }
        activate(t) {
            let n = this.futureState._root,
                r = this.currState ? this.currState._root : null;
            this.deactivateChildRoutes(n, r, t), Bd(this.futureState.root), this.activateChildRoutes(n, r, t)
        }
        deactivateChildRoutes(t, n, r) {
            let o = Rr(n);
            t.children.forEach(i => {
                let s = i.value.outlet;
                this.deactivateRoutes(i, o[s], r), delete o[s]
            }), Object.values(o).forEach(i => {
                this.deactivateRouteAndItsChildren(i, r)
            })
        }
        deactivateRoutes(t, n, r) {
            let o = t.value,
                i = n ? n.value : null;
            if (o === i)
                if (o.component) {
                    let s = r.getContext(o.outlet);
                    s && this.deactivateChildRoutes(t, n, s.children)
                } else this.deactivateChildRoutes(t, n, r);
            else i && this.deactivateRouteAndItsChildren(n, r)
        }
        deactivateRouteAndItsChildren(t, n) {
            t.value.component && this.routeReuseStrategy.shouldDetach(t.value.snapshot) ? this.detachAndStoreRouteSubtree(t, n) : this.deactivateRouteAndOutlet(t, n)
        }
        detachAndStoreRouteSubtree(t, n) {
            let r = n.getContext(t.value.outlet),
                o = r && t.value.component ? r.children : n,
                i = Rr(t);
            for (let s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
            if (r && r.outlet) {
                let s = r.outlet.detach(),
                    a = r.children.onOutletDeactivated();
                this.routeReuseStrategy.store(t.value.snapshot, {
                    componentRef: s,
                    route: t,
                    contexts: a
                })
            }
        }
        deactivateRouteAndOutlet(t, n) {
            let r = n.getContext(t.value.outlet),
                o = r && t.value.component ? r.children : n,
                i = Rr(t);
            for (let s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
            r && (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()), r.attachRef = null, r.route = null)
        }
        activateChildRoutes(t, n, r) {
            let o = Rr(n);
            t.children.forEach(i => {
                this.activateRoutes(i, o[i.value.outlet], r), this.forwardEvent(new of (i.value.snapshot))
            }), t.children.length && this.forwardEvent(new nf(t.value.snapshot))
        }
        activateRoutes(t, n, r) {
            let o = t.value,
                i = n ? n.value : null;
            if (Bd(o), o === i)
                if (o.component) {
                    let s = r.getOrCreateContext(o.outlet);
                    this.activateChildRoutes(t, n, s.children)
                } else this.activateChildRoutes(t, n, r);
            else if (o.component) {
                let s = r.getOrCreateContext(o.outlet);
                if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
                    let a = this.routeReuseStrategy.retrieve(o.snapshot);
                    this.routeReuseStrategy.store(o.snapshot, null), s.children.onOutletReAttached(a.contexts), s.attachRef = a.componentRef, s.route = a.route.value, s.outlet && s.outlet.attach(a.componentRef, a.route.value), Bd(a.route.value), this.activateChildRoutes(t, null, s.children)
                } else {
                    let a = Xo(o.snapshot);
                    s.attachRef = null, s.route = o, s.injector = a, s.outlet && s.outlet.activateWith(o, s.injector), this.activateChildRoutes(t, null, s.children)
                }
            } else this.activateChildRoutes(t, null, r)
        }
    },
    Ba = class {
        constructor(t) {
            this.path = t, this.route = this.path[this.path.length - 1]
        }
    },
    Fr = class {
        constructor(t, n) {
            this.component = t, this.route = n
        }
    };

function YT(e, t, n) {
    let r = e._root,
        o = t ? t._root : null;
    return Lo(r, o, n, [r.value])
}

function QT(e) {
    let t = e.routeConfig ? e.routeConfig.canActivateChild : null;
    return !t || t.length === 0 ? null : {
        node: e,
        guards: t
    }
}

function Ur(e, t) {
    let n = Symbol(),
        r = t.get(e, n);
    return r === n ? typeof e == "function" && !xp(e) ? e : t.get(e) : r
}

function Lo(e, t, n, r, o = {
    canDeactivateChecks: [],
    canActivateChecks: []
}) {
    let i = Rr(t);
    return e.children.forEach(s => {
        KT(s, i[s.value.outlet], n, r.concat([s.value]), o), delete i[s.value.outlet]
    }), Object.entries(i).forEach(([s, a]) => $o(a, n.getContext(s), o)), o
}

function KT(e, t, n, r, o = {
    canDeactivateChecks: [],
    canActivateChecks: []
}) {
    let i = e.value,
        s = t ? t.value : null,
        a = n ? n.getContext(e.value.outlet) : null;
    if (s && i.routeConfig === s.routeConfig) {
        let u = JT(s, i, i.routeConfig.runGuardsAndResolvers);
        u ? o.canActivateChecks.push(new Ba(r)) : (i.data = s.data, i._resolvedData = s._resolvedData), i.component ? Lo(e, t, a ? a.children : null, r, o) : Lo(e, t, n, r, o), u && a && a.outlet && a.outlet.isActivated && o.canDeactivateChecks.push(new Fr(a.outlet.component, s))
    } else s && $o(t, a, o), o.canActivateChecks.push(new Ba(r)), i.component ? Lo(e, null, a ? a.children : null, r, o) : Lo(e, null, n, r, o);
    return o
}

function JT(e, t, n) {
    if (typeof n == "function") return n(e, t);
    switch (n) {
        case "pathParamsChange":
            return !zn(e.url, t.url);
        case "pathParamsOrQueryParamsChange":
            return !zn(e.url, t.url) || !_t(e.queryParams, t.queryParams);
        case "always":
            return !0;
        case "paramsOrQueryParamsChange":
            return !cf(e, t) || !_t(e.queryParams, t.queryParams);
        case "paramsChange":
        default:
            return !cf(e, t)
    }
}

function $o(e, t, n) {
    let r = Rr(e),
        o = e.value;
    Object.entries(r).forEach(([i, s]) => {
        o.component ? t ? $o(s, t.children.getContext(i), n) : $o(s, null, n) : $o(s, t, n)
    }), o.component ? t && t.outlet && t.outlet.isActivated ? n.canDeactivateChecks.push(new Fr(t.outlet.component, o)) : n.canDeactivateChecks.push(new Fr(null, o)) : n.canDeactivateChecks.push(new Fr(null, o))
}

function ei(e) {
    return typeof e == "function"
}

function XT(e) {
    return typeof e == "boolean"
}

function eA(e) {
    return e && ei(e.canLoad)
}

function tA(e) {
    return e && ei(e.canActivate)
}

function nA(e) {
    return e && ei(e.canActivateChild)
}

function rA(e) {
    return e && ei(e.canDeactivate)
}

function oA(e) {
    return e && ei(e.canMatch)
}

function iD(e) {
    return e instanceof Tt || e ? .name === "EmptyError"
}
var xa = Symbol("INITIAL_VALUE");

function jr() {
    return Oe(e => zr(e.map(t => t.pipe(ze(1), vu(xa)))).pipe(O(t => {
        for (let n of t)
            if (n !== !0) {
                if (n === xa) return xa;
                if (n === !1 || n instanceof fn) return n
            }
        return !0
    }), we(t => t !== xa), ze(1)))
}

function iA(e, t) {
    return te(n => {
        let {
            targetSnapshot: r,
            currentSnapshot: o,
            guards: {
                canActivateChecks: i,
                canDeactivateChecks: s
            }
        } = n;
        return s.length === 0 && i.length === 0 ? A(Q(y({}, n), {
            guardsResult: !0
        })) : sA(s, r, o, e).pipe(te(a => a && XT(a) ? aA(r, i, e, t) : A(a)), O(a => Q(y({}, n), {
            guardsResult: a
        })))
    })
}

function sA(e, t, n, r) {
    return W(e).pipe(te(o => fA(o.component, o.route, n, t, r)), ft(o => o !== !0, !0))
}

function aA(e, t, n, r) {
    return W(t).pipe(xt(o => dt(cA(o.route.parent, r), uA(o.route, r), dA(e, o.path, n), lA(e, o.route, n))), ft(o => o !== !0, !0))
}

function uA(e, t) {
    return e !== null && t && t(new rf(e)), A(!0)
}

function cA(e, t) {
    return e !== null && t && t(new tf(e)), A(!0)
}

function lA(e, t, n) {
    let r = t.routeConfig ? t.routeConfig.canActivate : null;
    if (!r || r.length === 0) return A(!0);
    let o = r.map(i => Mi(() => {
        let s = Xo(t) ? ? n,
            a = Ur(i, s),
            u = tA(a) ? a.canActivate(t, e) : Et(s, () => a(t, e));
        return gn(u).pipe(ft())
    }));
    return A(o).pipe(jr())
}

function dA(e, t, n) {
    let r = t[t.length - 1],
        i = t.slice(0, t.length - 1).reverse().map(s => QT(s)).filter(s => s !== null).map(s => Mi(() => {
            let a = s.guards.map(u => {
                let c = Xo(s.node) ? ? n,
                    l = Ur(u, c),
                    d = nA(l) ? l.canActivateChild(r, e) : Et(c, () => l(r, e));
                return gn(d).pipe(ft())
            });
            return A(a).pipe(jr())
        }));
    return A(i).pipe(jr())
}

function fA(e, t, n, r, o) {
    let i = t && t.routeConfig ? t.routeConfig.canDeactivate : null;
    if (!i || i.length === 0) return A(!0);
    let s = i.map(a => {
        let u = Xo(t) ? ? o,
            c = Ur(a, u),
            l = rA(c) ? c.canDeactivate(e, t, n, r) : Et(u, () => c(e, t, n, r));
        return gn(l).pipe(ft())
    });
    return A(s).pipe(jr())
}

function hA(e, t, n, r) {
    let o = t.canLoad;
    if (o === void 0 || o.length === 0) return A(!0);
    let i = o.map(s => {
        let a = Ur(s, e),
            u = eA(a) ? a.canLoad(t, n) : Et(e, () => a(t, n));
        return gn(u)
    });
    return A(i).pipe(jr(), sD(r))
}

function sD(e) {
    return ou(ue(t => {
        if (kr(t)) throw nD(e, t)
    }), O(t => t === !0))
}

function pA(e, t, n, r) {
    let o = t.canMatch;
    if (!o || o.length === 0) return A(!0);
    let i = o.map(s => {
        let a = Ur(s, e),
            u = oA(a) ? a.canMatch(t, n) : Et(e, () => a(t, n));
        return gn(u)
    });
    return A(i).pipe(jr(), sD(r))
}
var Yo = class {
        constructor(t) {
            this.segmentGroup = t || null
        }
    },
    Ha = class extends Error {
        constructor(t) {
            super(), this.urlTree = t
        }
    };

function Nr(e) {
    return tr(new Yo(e))
}

function gA(e) {
    return tr(new D(4e3, !1))
}

function mA(e) {
    return tr(rD(!1, Qe.GuardRejected))
}
var ff = class {
        constructor(t, n) {
            this.urlSerializer = t, this.urlTree = n
        }
        lineralizeSegments(t, n) {
            let r = [],
                o = n.root;
            for (;;) {
                if (r = r.concat(o.segments), o.numberOfChildren === 0) return A(r);
                if (o.numberOfChildren > 1 || !o.children[P]) return gA(t.redirectTo);
                o = o.children[P]
            }
        }
        applyRedirectCommands(t, n, r) {
            let o = this.applyRedirectCreateUrlTree(n, this.urlSerializer.parse(n), t, r);
            if (n.startsWith("/")) throw new Ha(o);
            return o
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
            let i = this.createSegmentGroup(t, n.root, r, o);
            return new fn(i, this.createQueryParams(n.queryParams, this.urlTree.queryParams), n.fragment)
        }
        createQueryParams(t, n) {
            let r = {};
            return Object.entries(t).forEach(([o, i]) => {
                if (typeof i == "string" && i.startsWith(":")) {
                    let a = i.substring(1);
                    r[o] = n[a]
                } else r[o] = i
            }), r
        }
        createSegmentGroup(t, n, r, o) {
            let i = this.createSegments(t, n.segments, r, o),
                s = {};
            return Object.entries(n.children).forEach(([a, u]) => {
                s[a] = this.createSegmentGroup(t, u, r, o)
            }), new H(i, s)
        }
        createSegments(t, n, r, o) {
            return n.map(i => i.path.startsWith(":") ? this.findPosParam(t, i, o) : this.findOrReturn(i, r))
        }
        findPosParam(t, n, r) {
            let o = r[n.path.substring(1)];
            if (!o) throw new D(4001, !1);
            return o
        }
        findOrReturn(t, n) {
            let r = 0;
            for (let o of n) {
                if (o.path === t.path) return n.splice(r), o;
                r++
            }
            return t
        }
    },
    hf = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {}
    };

function vA(e, t, n, r, o) {
    let i = wf(e, t, n);
    return i.matched ? (r = WT(t, r), pA(r, t, n, o).pipe(O(s => s === !0 ? i : y({}, hf)))) : A(i)
}

function wf(e, t, n) {
    if (t.path === "**") return yA(n);
    if (t.path === "") return t.pathMatch === "full" && (e.hasChildren() || n.length > 0) ? y({}, hf) : {
        matched: !0,
        consumedSegments: [],
        remainingSegments: n,
        parameters: {},
        positionalParamSegments: {}
    };
    let o = (t.matcher || hT)(n, e, t);
    if (!o) return y({}, hf);
    let i = {};
    Object.entries(o.posParams ? ? {}).forEach(([a, u]) => {
        i[a] = u.path
    });
    let s = o.consumed.length > 0 ? y(y({}, i), o.consumed[o.consumed.length - 1].parameters) : i;
    return {
        matched: !0,
        consumedSegments: o.consumed,
        remainingSegments: n.slice(o.consumed.length),
        parameters: s,
        positionalParamSegments: o.posParams ? ? {}
    }
}

function yA(e) {
    return {
        matched: !0,
        parameters: e.length > 0 ? jy(e).parameters : {},
        consumedSegments: e,
        remainingSegments: [],
        positionalParamSegments: {}
    }
}

function Py(e, t, n, r) {
    return n.length > 0 && CA(e, n, r) ? {
        segmentGroup: new H(t, wA(r, new H(n, e.children))),
        slicedSegments: []
    } : n.length === 0 && EA(e, n, r) ? {
        segmentGroup: new H(e.segments, DA(e, n, r, e.children)),
        slicedSegments: n
    } : {
        segmentGroup: new H(e.segments, e.children),
        slicedSegments: n
    }
}

function DA(e, t, n, r) {
    let o = {};
    for (let i of n)
        if (qa(e, t, i) && !r[Mt(i)]) {
            let s = new H([], {});
            o[Mt(i)] = s
        }
    return y(y({}, r), o)
}

function wA(e, t) {
    let n = {};
    n[P] = t;
    for (let r of e)
        if (r.path === "" && Mt(r) !== P) {
            let o = new H([], {});
            n[Mt(r)] = o
        }
    return n
}

function CA(e, t, n) {
    return n.some(r => qa(e, t, r) && Mt(r) !== P)
}

function EA(e, t, n) {
    return n.some(r => qa(e, t, r))
}

function qa(e, t, n) {
    return (e.hasChildren() || t.length > 0) && n.pathMatch === "full" ? !1 : n.path === ""
}

function IA(e, t, n, r) {
    return Mt(e) !== r && (r === P || !qa(t, n, e)) ? !1 : wf(t, e, n).matched
}

function bA(e, t, n) {
    return t.length === 0 && !e.children[n]
}
var pf = class {};

function _A(e, t, n, r, o, i, s = "emptyOnly") {
    return new gf(e, t, n, r, o, s, i).recognize()
}
var MA = 31,
    gf = class {
        constructor(t, n, r, o, i, s, a) {
            this.injector = t, this.configLoader = n, this.rootComponentType = r, this.config = o, this.urlTree = i, this.paramsInheritanceStrategy = s, this.urlSerializer = a, this.applyRedirects = new ff(this.urlSerializer, this.urlTree), this.absoluteRedirectCount = 0, this.allowRedirects = !0
        }
        noMatchError(t) {
            return new D(4002, `'${t.segmentGroup}'`)
        }
        recognize() {
            let t = Py(this.urlTree.root, [], [], this.config).segmentGroup;
            return this.match(t).pipe(O(n => {
                let r = new qo([], Object.freeze({}), Object.freeze(y({}, this.urlTree.queryParams)), this.urlTree.fragment, {}, P, this.rootComponentType, null, {}),
                    o = new He(r, n),
                    i = new $a("", o),
                    s = RT(r, [], this.urlTree.queryParams, this.urlTree.fragment);
                return s.queryParams = this.urlTree.queryParams, i.url = this.urlSerializer.serialize(s), this.inheritParamsAndData(i._root, null), {
                    state: i,
                    tree: s
                }
            }))
        }
        match(t) {
            return this.processSegmentGroup(this.injector, this.config, t, P).pipe(Jt(r => {
                if (r instanceof Ha) return this.urlTree = r.urlTree, this.match(r.urlTree.root);
                throw r instanceof Yo ? this.noMatchError(r) : r
            }))
        }
        inheritParamsAndData(t, n) {
            let r = t.value,
                o = vf(r, n, this.paramsInheritanceStrategy);
            r.params = Object.freeze(o.params), r.data = Object.freeze(o.data), t.children.forEach(i => this.inheritParamsAndData(i, r))
        }
        processSegmentGroup(t, n, r, o) {
            return r.segments.length === 0 && r.hasChildren() ? this.processChildren(t, n, r) : this.processSegment(t, n, r, r.segments, o, !0).pipe(O(i => i instanceof He ? [i] : []))
        }
        processChildren(t, n, r) {
            let o = [];
            for (let i of Object.keys(r.children)) i === "primary" ? o.unshift(i) : o.push(i);
            return W(o).pipe(xt(i => {
                let s = r.children[i],
                    a = qT(n, i);
                return this.processSegmentGroup(t, a, s, i)
            }), pu((i, s) => (i.push(...s), i)), Xt(null), hu(), te(i => {
                if (i === null) return Nr(r);
                let s = aD(i);
                return SA(s), A(s)
            }))
        }
        processSegment(t, n, r, o, i, s) {
            return W(n).pipe(xt(a => this.processSegmentAgainstRoute(a._injector ? ? t, n, a, r, o, i, s).pipe(Jt(u => {
                if (u instanceof Yo) return A(null);
                throw u
            }))), ft(a => !!a), Jt(a => {
                if (iD(a)) return bA(r, o, i) ? A(new pf) : Nr(r);
                throw a
            }))
        }
        processSegmentAgainstRoute(t, n, r, o, i, s, a) {
            return IA(r, o, i, s) ? r.redirectTo === void 0 ? this.matchSegmentAgainstRoute(t, o, r, i, s) : this.allowRedirects && a ? this.expandSegmentAgainstRouteUsingRedirect(t, o, n, r, i, s) : Nr(o) : Nr(o)
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
            let {
                matched: a,
                consumedSegments: u,
                positionalParamSegments: c,
                remainingSegments: l
            } = wf(n, o, i);
            if (!a) return Nr(n);
            o.redirectTo.startsWith("/") && (this.absoluteRedirectCount++, this.absoluteRedirectCount > MA && (this.allowRedirects = !1));
            let d = this.applyRedirects.applyRedirectCommands(u, o.redirectTo, c);
            return this.applyRedirects.lineralizeSegments(o, d).pipe(te(f => this.processSegment(t, r, n, f.concat(l), s, !1)))
        }
        matchSegmentAgainstRoute(t, n, r, o, i) {
            let s = vA(n, r, o, t, this.urlSerializer);
            return r.path === "**" && (n.children = {}), s.pipe(Oe(a => a.matched ? (t = r._injector ? ? t, this.getChildConfig(t, r, o).pipe(Oe(({
                routes: u
            }) => {
                let c = r._loadedInjector ? ? t,
                    {
                        consumedSegments: l,
                        remainingSegments: d,
                        parameters: f
                    } = a,
                    h = new qo(l, f, Object.freeze(y({}, this.urlTree.queryParams)), this.urlTree.fragment, AA(r), Mt(r), r.component ? ? r._loadedComponent ? ? null, r, xA(r)),
                    {
                        segmentGroup: p,
                        slicedSegments: g
                    } = Py(n, l, d, u);
                if (g.length === 0 && p.hasChildren()) return this.processChildren(c, u, p).pipe(O(w => w === null ? null : new He(h, w)));
                if (u.length === 0 && g.length === 0) return A(new He(h, []));
                let v = Mt(r) === i;
                return this.processSegment(c, u, p, g, v ? P : i, !0).pipe(O(w => new He(h, w instanceof He ? [w] : [])))
            }))) : Nr(n)))
        }
        getChildConfig(t, n, r) {
            return n.children ? A({
                routes: n.children,
                injector: t
            }) : n.loadChildren ? n._loadedRoutes !== void 0 ? A({
                routes: n._loadedRoutes,
                injector: n._loadedInjector
            }) : hA(t, n, r, this.urlSerializer).pipe(te(o => o ? this.configLoader.loadChildren(t, n).pipe(ue(i => {
                n._loadedRoutes = i.routes, n._loadedInjector = i.injector
            })) : mA(n))) : A({
                routes: [],
                injector: t
            })
        }
    };

function SA(e) {
    e.sort((t, n) => t.value.outlet === P ? -1 : n.value.outlet === P ? 1 : t.value.outlet.localeCompare(n.value.outlet))
}

function TA(e) {
    let t = e.value.routeConfig;
    return t && t.path === ""
}

function aD(e) {
    let t = [],
        n = new Set;
    for (let r of e) {
        if (!TA(r)) {
            t.push(r);
            continue
        }
        let o = t.find(i => r.value.routeConfig === i.value.routeConfig);
        o !== void 0 ? (o.children.push(...r.children), n.add(o)) : t.push(r)
    }
    for (let r of n) {
        let o = aD(r.children);
        t.push(new He(r.value, o))
    }
    return t.filter(r => !n.has(r))
}

function AA(e) {
    return e.data || {}
}

function xA(e) {
    return e.resolve || {}
}

function NA(e, t, n, r, o, i) {
    return te(s => _A(e, t, n, r, s.extractedUrl, o, i).pipe(O(({
        state: a,
        tree: u
    }) => Q(y({}, s), {
        targetSnapshot: a,
        urlAfterRedirects: u
    }))))
}

function RA(e, t) {
    return te(n => {
        let {
            targetSnapshot: r,
            guards: {
                canActivateChecks: o
            }
        } = n;
        if (!o.length) return A(n);
        let i = new Set(o.map(u => u.route)),
            s = new Set;
        for (let u of i)
            if (!s.has(u))
                for (let c of uD(u)) s.add(c);
        let a = 0;
        return W(s).pipe(xt(u => i.has(u) ? OA(u, r, e, t) : (u.data = vf(u, u.parent, e).resolve, A(void 0))), ue(() => a++), rr(1), te(u => a === s.size ? A(n) : De))
    })
}

function uD(e) {
    let t = e.children.map(n => uD(n)).flat();
    return [e, ...t]
}

function OA(e, t, n, r) {
    let o = e.routeConfig,
        i = e._resolve;
    return o ? .title !== void 0 && !eD(o) && (i[Qo] = o.title), FA(i, e, t, r).pipe(O(s => (e._resolvedData = s, e.data = vf(e, e.parent, n).resolve, null)))
}

function FA(e, t, n, r) {
    let o = Gd(e);
    if (o.length === 0) return A({});
    let i = {};
    return W(o).pipe(te(s => PA(e[s], t, n, r).pipe(ft(), ue(a => {
        i[s] = a
    }))), rr(1), Gr(i), Jt(s => iD(s) ? De : tr(s)))
}

function PA(e, t, n, r) {
    let o = Xo(t) ? ? r,
        i = Ur(e, o),
        s = i.resolve ? i.resolve(t, n) : Et(o, () => i(t, n));
    return gn(s)
}

function Hd(e) {
    return Oe(t => {
        let n = e(t);
        return n ? W(n).pipe(O(() => t)) : A(t)
    })
}
var cD = (() => {
        class e {
            buildTitle(n) {
                let r, o = n.root;
                for (; o !== void 0;) r = this.getResolvedTitleForRoute(o) ? ? r, o = o.children.find(i => i.outlet === P);
                return r
            }
            getResolvedTitleForRoute(n) {
                return n.data[Qo]
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: () => m(kA),
                    providedIn: "root"
                })
            }
        }
        return e
    })(),
    kA = (() => {
        class e extends cD {
            constructor(n) {
                super(), this.title = n
            }
            updateTitle(n) {
                let r = this.buildTitle(n);
                r !== void 0 && this.title.setTitle(r)
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(M(ey))
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
            }
        }
        return e
    })(),
    ti = new C("", {
        providedIn: "root",
        factory: () => ({})
    }),
    za = new C(""),
    Cf = (() => {
        class e {
            constructor() {
                this.componentLoaders = new WeakMap, this.childrenLoaders = new WeakMap, this.compiler = m(Qs)
            }
            loadComponent(n) {
                if (this.componentLoaders.get(n)) return this.componentLoaders.get(n);
                if (n._loadedComponent) return A(n._loadedComponent);
                this.onLoadStartListener && this.onLoadStartListener(n);
                let r = gn(n.loadComponent()).pipe(O(lD), ue(i => {
                        this.onLoadEndListener && this.onLoadEndListener(n), n._loadedComponent = i
                    }), en(() => {
                        this.componentLoaders.delete(n)
                    })),
                    o = new Jn(r, () => new he).pipe(Kn());
                return this.componentLoaders.set(n, o), o
            }
            loadChildren(n, r) {
                if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
                if (r._loadedRoutes) return A({
                    routes: r._loadedRoutes,
                    injector: r._loadedInjector
                });
                this.onLoadStartListener && this.onLoadStartListener(r);
                let i = LA(r, this.compiler, n, this.onLoadEndListener).pipe(en(() => {
                        this.childrenLoaders.delete(r)
                    })),
                    s = new Jn(i, () => new he).pipe(Kn());
                return this.childrenLoaders.set(r, s), s
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
            }
        }
        return e
    })();

function LA(e, t, n, r) {
    return gn(e.loadChildren()).pipe(O(lD), te(o => o instanceof lo || Array.isArray(o) ? A(o) : W(t.compileModuleAsync(o))), O(o => {
        r && r(e);
        let i, s, a = !1;
        return Array.isArray(o) ? (s = o, a = !0) : (i = o.create(n).injector, s = i.get(za, [], {
            optional: !0,
            self: !0
        }).flat()), {
            routes: s.map(Df),
            injector: i
        }
    }))
}

function VA(e) {
    return e && typeof e == "object" && "default" in e
}

function lD(e) {
    return VA(e) ? e.default : e
}
var Ef = (() => {
        class e {
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: () => m(jA),
                    providedIn: "root"
                })
            }
        }
        return e
    })(),
    jA = (() => {
        class e {
            shouldProcessUrl(n) {
                return !0
            }
            extract(n) {
                return n
            }
            merge(n, r) {
                return n
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
            }
        }
        return e
    })(),
    dD = new C(""),
    fD = new C("");

function UA(e, t, n) {
    let r = e.get(fD),
        o = e.get(ye);
    return e.get(q).runOutsideAngular(() => {
        if (!o.startViewTransition || r.skipNextTransition) return r.skipNextTransition = !1, Promise.resolve();
        let i, s = new Promise(c => {
                i = c
            }),
            a = o.startViewTransition(() => (i(), $A(e))),
            {
                onViewTransitionCreated: u
            } = r;
        return u && Et(e, () => u({
            transition: a,
            from: t,
            to: n
        })), s
    })
}

function $A(e) {
    return new Promise(t => {
        zl(t, {
            injector: e
        })
    })
}
var If = (() => {
    class e {
        get hasRequestedNavigation() {
            return this.navigationId !== 0
        }
        constructor() {
            this.currentNavigation = null, this.currentTransition = null, this.lastSuccessfulNavigation = null, this.events = new he, this.transitionAbortSubject = new he, this.configLoader = m(Cf), this.environmentInjector = m(Te), this.urlSerializer = m(Ko), this.rootContexts = m(Jo), this.location = m(br), this.inputBindingEnabled = m(Wa, {
                optional: !0
            }) !== null, this.titleStrategy = m(cD), this.options = m(ti, {
                optional: !0
            }) || {}, this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || "emptyOnly", this.urlHandlingStrategy = m(Ef), this.createViewTransition = m(dD, {
                optional: !0
            }), this.navigationId = 0, this.afterPreactivation = () => A(void 0), this.rootComponentType = null;
            let n = o => this.events.next(new Xd(o)),
                r = o => this.events.next(new ef(o));
            this.configLoader.onLoadEndListener = r, this.configLoader.onLoadStartListener = n
        }
        complete() {
            this.transitions ? .complete()
        }
        handleNavigationRequest(n) {
            let r = ++this.navigationId;
            this.transitions ? .next(Q(y(y({}, this.transitions.value), n), {
                id: r
            }))
        }
        setupNavigations(n, r, o) {
            return this.transitions = new pe({
                id: 0,
                currentUrlTree: r,
                currentRawUrl: r,
                extractedUrl: this.urlHandlingStrategy.extract(r),
                urlAfterRedirects: this.urlHandlingStrategy.extract(r),
                rawUrl: r,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Uo,
                restoredState: null,
                currentSnapshot: o.snapshot,
                targetSnapshot: null,
                currentRouterState: o,
                targetRouterState: null,
                guards: {
                    canActivateChecks: [],
                    canDeactivateChecks: []
                },
                guardsResult: null
            }), this.transitions.pipe(we(i => i.id !== 0), O(i => Q(y({}, i), {
                extractedUrl: this.urlHandlingStrategy.extract(i.rawUrl)
            })), Oe(i => {
                this.currentTransition = i;
                let s = !1,
                    a = !1;
                return A(i).pipe(ue(u => {
                    this.currentNavigation = {
                        id: u.id,
                        initialUrl: u.rawUrl,
                        extractedUrl: u.extractedUrl,
                        trigger: u.source,
                        extras: u.extras,
                        previousNavigation: this.lastSuccessfulNavigation ? Q(y({}, this.lastSuccessfulNavigation), {
                            previousNavigation: null
                        }) : null
                    }
                }), Oe(u => {
                    let c = !n.navigated || this.isUpdatingInternalState() || this.isUpdatedBrowserUrl(),
                        l = u.extras.onSameUrlNavigation ? ? n.onSameUrlNavigation;
                    if (!c && l !== "reload") {
                        let d = "";
                        return this.events.next(new pn(u.id, this.urlSerializer.serialize(u.rawUrl), d, ka.IgnoredSameUrlNavigation)), u.resolve(null), De
                    }
                    if (this.urlHandlingStrategy.shouldProcessUrl(u.rawUrl)) return A(u).pipe(Oe(d => {
                        let f = this.transitions ? .getValue();
                        return this.events.next(new Lr(d.id, this.urlSerializer.serialize(d.extractedUrl), d.source, d.restoredState)), f !== this.transitions ? .getValue() ? De : Promise.resolve(d)
                    }), NA(this.environmentInjector, this.configLoader, this.rootComponentType, n.config, this.urlSerializer, this.paramsInheritanceStrategy), ue(d => {
                        i.targetSnapshot = d.targetSnapshot, i.urlAfterRedirects = d.urlAfterRedirects, this.currentNavigation = Q(y({}, this.currentNavigation), {
                            finalUrl: d.urlAfterRedirects
                        });
                        let f = new La(d.id, this.urlSerializer.serialize(d.extractedUrl), this.urlSerializer.serialize(d.urlAfterRedirects), d.targetSnapshot);
                        this.events.next(f)
                    }));
                    if (c && this.urlHandlingStrategy.shouldProcessUrl(u.currentRawUrl)) {
                        let {
                            id: d,
                            extractedUrl: f,
                            source: h,
                            restoredState: p,
                            extras: g
                        } = u, v = new Lr(d, this.urlSerializer.serialize(f), h, p);
                        this.events.next(v);
                        let w = Jy(this.rootComponentType).snapshot;
                        return this.currentTransition = i = Q(y({}, u), {
                            targetSnapshot: w,
                            urlAfterRedirects: f,
                            extras: Q(y({}, g), {
                                skipLocationChange: !1,
                                replaceUrl: !1
                            })
                        }), this.currentNavigation.finalUrl = f, A(i)
                    } else {
                        let d = "";
                        return this.events.next(new pn(u.id, this.urlSerializer.serialize(u.extractedUrl), d, ka.IgnoredByUrlHandlingStrategy)), u.resolve(null), De
                    }
                }), ue(u => {
                    let c = new Yd(u.id, this.urlSerializer.serialize(u.extractedUrl), this.urlSerializer.serialize(u.urlAfterRedirects), u.targetSnapshot);
                    this.events.next(c)
                }), O(u => (this.currentTransition = i = Q(y({}, u), {
                    guards: YT(u.targetSnapshot, u.currentSnapshot, this.rootContexts)
                }), i)), iA(this.environmentInjector, u => this.events.next(u)), ue(u => {
                    if (i.guardsResult = u.guardsResult, kr(u.guardsResult)) throw nD(this.urlSerializer, u.guardsResult);
                    let c = new Qd(u.id, this.urlSerializer.serialize(u.extractedUrl), this.urlSerializer.serialize(u.urlAfterRedirects), u.targetSnapshot, !!u.guardsResult);
                    this.events.next(c)
                }), we(u => u.guardsResult ? !0 : (this.cancelNavigationTransition(u, "", Qe.GuardRejected), !1)), Hd(u => {
                    if (u.guards.canActivateChecks.length) return A(u).pipe(ue(c => {
                        let l = new Kd(c.id, this.urlSerializer.serialize(c.extractedUrl), this.urlSerializer.serialize(c.urlAfterRedirects), c.targetSnapshot);
                        this.events.next(l)
                    }), Oe(c => {
                        let l = !1;
                        return A(c).pipe(RA(this.paramsInheritanceStrategy, this.environmentInjector), ue({
                            next: () => l = !0,
                            complete: () => {
                                l || this.cancelNavigationTransition(c, "", Qe.NoDataFromResolver)
                            }
                        }))
                    }), ue(c => {
                        let l = new Jd(c.id, this.urlSerializer.serialize(c.extractedUrl), this.urlSerializer.serialize(c.urlAfterRedirects), c.targetSnapshot);
                        this.events.next(l)
                    }))
                }), Hd(u => {
                    let c = l => {
                        let d = [];
                        l.routeConfig ? .loadComponent && !l.routeConfig._loadedComponent && d.push(this.configLoader.loadComponent(l.routeConfig).pipe(ue(f => {
                            l.component = f
                        }), O(() => {})));
                        for (let f of l.children) d.push(...c(f));
                        return d
                    };
                    return zr(c(u.targetSnapshot.root)).pipe(Xt(null), ze(1))
                }), Hd(() => this.afterPreactivation()), Oe(() => {
                    let {
                        currentSnapshot: u,
                        targetSnapshot: c
                    } = i, l = this.createViewTransition ? .(this.environmentInjector, u.root, c.root);
                    return l ? W(l).pipe(O(() => i)) : A(i)
                }), O(u => {
                    let c = $T(n.routeReuseStrategy, u.targetSnapshot, u.currentRouterState);
                    return this.currentTransition = i = Q(y({}, u), {
                        targetRouterState: c
                    }), this.currentNavigation.targetRouterState = c, i
                }), ue(() => {
                    this.events.next(new Go)
                }), ZT(this.rootContexts, n.routeReuseStrategy, u => this.events.next(u), this.inputBindingEnabled), ze(1), ue({
                    next: u => {
                        s = !0, this.lastSuccessfulNavigation = this.currentNavigation, this.events.next(new Yt(u.id, this.urlSerializer.serialize(u.extractedUrl), this.urlSerializer.serialize(u.urlAfterRedirects))), this.titleStrategy ? .updateTitle(u.targetRouterState.snapshot), u.resolve(!0)
                    },
                    complete: () => {
                        s = !0
                    }
                }), yu(this.transitionAbortSubject.pipe(ue(u => {
                    throw u
                }))), en(() => {
                    !s && !a && this.cancelNavigationTransition(i, "", Qe.SupersededByNewNavigation), this.currentNavigation ? .id === i.id && (this.currentNavigation = null)
                }), Jt(u => {
                    if (a = !0, oD(u)) this.events.next(new hn(i.id, this.urlSerializer.serialize(i.extractedUrl), u.message, u.cancellationCode)), zT(u) ? this.events.next(new Wo(u.url)) : i.resolve(!1);
                    else {
                        this.events.next(new zo(i.id, this.urlSerializer.serialize(i.extractedUrl), u, i.targetSnapshot ? ? void 0));
                        try {
                            i.resolve(n.errorHandler(u))
                        } catch (c) {
                            this.options.resolveNavigationPromiseOnError ? i.resolve(!1) : i.reject(c)
                        }
                    }
                    return De
                }))
            }))
        }
        cancelNavigationTransition(n, r, o) {
            let i = new hn(n.id, this.urlSerializer.serialize(n.extractedUrl), r, o);
            this.events.next(i), n.resolve(!1)
        }
        isUpdatingInternalState() {
            return this.currentTransition ? .extractedUrl.toString() !== this.currentTransition ? .currentUrlTree.toString()
        }
        isUpdatedBrowserUrl() {
            return this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))).toString() !== this.currentTransition ? .extractedUrl.toString() && !this.currentTransition ? .extras.skipLocationChange
        }
        static {
            this.\u0275fac = function(r) {
                return new(r || e)
            }
        }
        static {
            this.\u0275prov = E({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            })
        }
    }
    return e
})();

function BA(e) {
    return e !== Uo
}
var HA = (() => {
        class e {
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: () => m(zA),
                    providedIn: "root"
                })
            }
        }
        return e
    })(),
    mf = class {
        shouldDetach(t) {
            return !1
        }
        store(t, n) {}
        shouldAttach(t) {
            return !1
        }
        retrieve(t) {
            return null
        }
        shouldReuseRoute(t, n) {
            return t.routeConfig === n.routeConfig
        }
    },
    zA = (() => {
        class e extends mf {
            static {
                this.\u0275fac = (() => {
                    let n;
                    return function(o) {
                        return (n || (n = Ht(e)))(o || e)
                    }
                })()
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
            }
        }
        return e
    })(),
    hD = (() => {
        class e {
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: () => m(GA),
                    providedIn: "root"
                })
            }
        }
        return e
    })(),
    GA = (() => {
        class e extends hD {
            constructor() {
                super(...arguments), this.location = m(br), this.urlSerializer = m(Ko), this.options = m(ti, {
                    optional: !0
                }) || {}, this.canceledNavigationResolution = this.options.canceledNavigationResolution || "replace", this.urlHandlingStrategy = m(Ef), this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred", this.currentUrlTree = new fn, this.rawUrlTree = this.currentUrlTree, this.currentPageId = 0, this.lastSuccessfulId = -1, this.routerState = Jy(null), this.stateMemento = this.createStateMemento()
            }
            getCurrentUrlTree() {
                return this.currentUrlTree
            }
            getRawUrlTree() {
                return this.rawUrlTree
            }
            restoredState() {
                return this.location.getState()
            }
            get browserPageId() {
                return this.canceledNavigationResolution !== "computed" ? this.currentPageId : this.restoredState() ? .\u0275routerPageId ? ? this.currentPageId
            }
            getRouterState() {
                return this.routerState
            }
            createStateMemento() {
                return {
                    rawUrlTree: this.rawUrlTree,
                    currentUrlTree: this.currentUrlTree,
                    routerState: this.routerState
                }
            }
            registerNonRouterCurrentEntryChangeListener(n) {
                return this.location.subscribe(r => {
                    r.type === "popstate" && n(r.url, r.state)
                })
            }
            handleRouterEvent(n, r) {
                if (n instanceof Lr) this.stateMemento = this.createStateMemento();
                else if (n instanceof pn) this.rawUrlTree = r.initialUrl;
                else if (n instanceof La) {
                    if (this.urlUpdateStrategy === "eager" && !r.extras.skipLocationChange) {
                        let o = this.urlHandlingStrategy.merge(r.finalUrl, r.initialUrl);
                        this.setBrowserUrl(o, r)
                    }
                } else n instanceof Go ? (this.currentUrlTree = r.finalUrl, this.rawUrlTree = this.urlHandlingStrategy.merge(r.finalUrl, r.initialUrl), this.routerState = r.targetRouterState, this.urlUpdateStrategy === "deferred" && (r.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, r))) : n instanceof hn && (n.code === Qe.GuardRejected || n.code === Qe.NoDataFromResolver) ? this.restoreHistory(r) : n instanceof zo ? this.restoreHistory(r, !0) : n instanceof Yt && (this.lastSuccessfulId = n.id, this.currentPageId = this.browserPageId)
            }
            setBrowserUrl(n, r) {
                let o = this.urlSerializer.serialize(n);
                if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
                    let i = this.browserPageId,
                        s = y(y({}, r.extras.state), this.generateNgRouterState(r.id, i));
                    this.location.replaceState(o, "", s)
                } else {
                    let i = y(y({}, r.extras.state), this.generateNgRouterState(r.id, this.browserPageId + 1));
                    this.location.go(o, "", i)
                }
            }
            restoreHistory(n, r = !1) {
                if (this.canceledNavigationResolution === "computed") {
                    let o = this.browserPageId,
                        i = this.currentPageId - o;
                    i !== 0 ? this.location.historyGo(i) : this.currentUrlTree === n.finalUrl && i === 0 && (this.resetState(n), this.resetUrlToCurrentUrlTree())
                } else this.canceledNavigationResolution === "replace" && (r && this.resetState(n), this.resetUrlToCurrentUrlTree())
            }
            resetState(n) {
                this.routerState = this.stateMemento.routerState, this.currentUrlTree = this.stateMemento.currentUrlTree, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, n.finalUrl ? ? this.rawUrlTree)
            }
            resetUrlToCurrentUrlTree() {
                this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId))
            }
            generateNgRouterState(n, r) {
                return this.canceledNavigationResolution === "computed" ? {
                    navigationId: n,
                    \u0275routerPageId: r
                } : {
                    navigationId: n
                }
            }
            static {
                this.\u0275fac = (() => {
                    let n;
                    return function(o) {
                        return (n || (n = Ht(e)))(o || e)
                    }
                })()
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
            }
        }
        return e
    })(),
    Vo = function(e) {
        return e[e.COMPLETE = 0] = "COMPLETE", e[e.FAILED = 1] = "FAILED", e[e.REDIRECTING = 2] = "REDIRECTING", e
    }(Vo || {});

function pD(e, t) {
    e.events.pipe(we(n => n instanceof Yt || n instanceof hn || n instanceof zo || n instanceof pn), O(n => n instanceof Yt || n instanceof pn ? Vo.COMPLETE : (n instanceof hn ? n.code === Qe.Redirect || n.code === Qe.SupersededByNewNavigation : !1) ? Vo.REDIRECTING : Vo.FAILED), we(n => n !== Vo.REDIRECTING), ze(1)).subscribe(() => {
        t()
    })
}

function WA(e) {
    throw e
}
var qA = {
        paths: "exact",
        fragment: "ignored",
        matrixParams: "ignored",
        queryParams: "exact"
    },
    ZA = {
        paths: "subset",
        fragment: "ignored",
        matrixParams: "ignored",
        queryParams: "subset"
    },
    Gn = (() => {
        class e {
            get currentUrlTree() {
                return this.stateManager.getCurrentUrlTree()
            }
            get rawUrlTree() {
                return this.stateManager.getRawUrlTree()
            }
            get events() {
                return this._events
            }
            get routerState() {
                return this.stateManager.getRouterState()
            }
            constructor() {
                this.disposed = !1, this.isNgZoneEnabled = !1, this.console = m(Gs), this.stateManager = m(hD), this.options = m(ti, {
                    optional: !0
                }) || {}, this.pendingTasks = m(Ln), this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred", this.navigationTransitions = m(If), this.urlSerializer = m(Ko), this.location = m(br), this.urlHandlingStrategy = m(Ef), this._events = new he, this.errorHandler = this.options.errorHandler || WA, this.navigated = !1, this.routeReuseStrategy = m(HA), this.onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore", this.config = m(za, {
                    optional: !0
                }) ? .flat() ? ? [], this.componentInputBindingEnabled = !!m(Wa, {
                    optional: !0
                }), this.eventsSubscription = new re, this.isNgZoneEnabled = m(q) instanceof q && q.isInAngularZone(), this.resetConfig(this.config), this.navigationTransitions.setupNavigations(this, this.currentUrlTree, this.routerState).subscribe({
                    error: n => {
                        this.console.warn(n)
                    }
                }), this.subscribeToNavigationEvents()
            }
            subscribeToNavigationEvents() {
                let n = this.navigationTransitions.events.subscribe(r => {
                    try {
                        let o = this.navigationTransitions.currentTransition,
                            i = this.navigationTransitions.currentNavigation;
                        if (o !== null && i !== null) {
                            if (this.stateManager.handleRouterEvent(r, i), r instanceof hn && r.code !== Qe.Redirect && r.code !== Qe.SupersededByNewNavigation) this.navigated = !0;
                            else if (r instanceof Yt) this.navigated = !0;
                            else if (r instanceof Wo) {
                                let s = this.urlHandlingStrategy.merge(r.url, o.currentRawUrl),
                                    a = {
                                        info: o.extras.info,
                                        skipLocationChange: o.extras.skipLocationChange,
                                        replaceUrl: this.urlUpdateStrategy === "eager" || BA(o.source)
                                    };
                                this.scheduleNavigation(s, Uo, null, a, {
                                    resolve: o.resolve,
                                    reject: o.reject,
                                    promise: o.promise
                                })
                            }
                        }
                        QA(r) && this._events.next(r)
                    } catch (o) {
                        this.navigationTransitions.transitionAbortSubject.next(o)
                    }
                });
                this.eventsSubscription.add(n)
            }
            resetRootComponentType(n) {
                this.routerState.root.component = n, this.navigationTransitions.rootComponentType = n
            }
            initialNavigation() {
                this.setUpLocationChangeListener(), this.navigationTransitions.hasRequestedNavigation || this.navigateToSyncWithBrowser(this.location.path(!0), Uo, this.stateManager.restoredState())
            }
            setUpLocationChangeListener() {
                this.nonRouterCurrentEntryChangeSubscription ? ? = this.stateManager.registerNonRouterCurrentEntryChangeListener((n, r) => {
                    setTimeout(() => {
                        this.navigateToSyncWithBrowser(n, "popstate", r)
                    }, 0)
                })
            }
            navigateToSyncWithBrowser(n, r, o) {
                let i = {
                        replaceUrl: !0
                    },
                    s = o ? .navigationId ? o : null;
                if (o) {
                    let u = y({}, o);
                    delete u.navigationId, delete u.\u0275routerPageId, Object.keys(u).length !== 0 && (i.state = u)
                }
                let a = this.parseUrl(n);
                this.scheduleNavigation(a, r, s, i)
            }
            get url() {
                return this.serializeUrl(this.currentUrlTree)
            }
            getCurrentNavigation() {
                return this.navigationTransitions.currentNavigation
            }
            get lastSuccessfulNavigation() {
                return this.navigationTransitions.lastSuccessfulNavigation
            }
            resetConfig(n) {
                this.config = n.map(Df), this.navigated = !1
            }
            ngOnDestroy() {
                this.dispose()
            }
            dispose() {
                this.navigationTransitions.complete(), this.nonRouterCurrentEntryChangeSubscription && (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(), this.nonRouterCurrentEntryChangeSubscription = void 0), this.disposed = !0, this.eventsSubscription.unsubscribe()
            }
            createUrlTree(n, r = {}) {
                let {
                    relativeTo: o,
                    queryParams: i,
                    fragment: s,
                    queryParamsHandling: a,
                    preserveFragment: u
                } = r, c = u ? this.currentUrlTree.fragment : s, l = null;
                switch (a) {
                    case "merge":
                        l = y(y({}, this.currentUrlTree.queryParams), i);
                        break;
                    case "preserve":
                        l = this.currentUrlTree.queryParams;
                        break;
                    default:
                        l = i || null
                }
                l !== null && (l = this.removeEmptyProps(l));
                let d;
                try {
                    let f = o ? o.snapshot : this.routerState.snapshot.root;
                    d = Zy(f)
                } catch {
                    (typeof n[0] != "string" || !n[0].startsWith("/")) && (n = []), d = this.currentUrlTree.root
                }
                return Yy(d, n, l, c ? ? null)
            }
            navigateByUrl(n, r = {
                skipLocationChange: !1
            }) {
                let o = kr(n) ? n : this.parseUrl(n),
                    i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
                return this.scheduleNavigation(i, Uo, null, r)
            }
            navigate(n, r = {
                skipLocationChange: !1
            }) {
                return YA(n), this.navigateByUrl(this.createUrlTree(n, r), r)
            }
            serializeUrl(n) {
                return this.urlSerializer.serialize(n)
            }
            parseUrl(n) {
                try {
                    return this.urlSerializer.parse(n)
                } catch {
                    return this.urlSerializer.parse("/")
                }
            }
            isActive(n, r) {
                let o;
                if (r === !0 ? o = y({}, qA) : r === !1 ? o = y({}, ZA) : o = r, kr(n)) return xy(this.currentUrlTree, n, o);
                let i = this.parseUrl(n);
                return xy(this.currentUrlTree, i, o)
            }
            removeEmptyProps(n) {
                return Object.entries(n).reduce((r, [o, i]) => (i != null && (r[o] = i), r), {})
            }
            scheduleNavigation(n, r, o, i, s) {
                if (this.disposed) return Promise.resolve(!1);
                let a, u, c;
                s ? (a = s.resolve, u = s.reject, c = s.promise) : c = new Promise((d, f) => {
                    a = d, u = f
                });
                let l = this.pendingTasks.add();
                return pD(this, () => {
                    queueMicrotask(() => this.pendingTasks.remove(l))
                }), this.navigationTransitions.handleNavigationRequest({
                    source: r,
                    restoredState: o,
                    currentUrlTree: this.currentUrlTree,
                    currentRawUrl: this.currentUrlTree,
                    rawUrl: n,
                    extras: i,
                    resolve: a,
                    reject: u,
                    promise: c,
                    currentSnapshot: this.routerState.snapshot,
                    currentRouterState: this.routerState
                }), c.catch(d => Promise.reject(d))
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
            }
        }
        return e
    })();

function YA(e) {
    for (let t = 0; t < e.length; t++)
        if (e[t] == null) throw new D(4008, !1)
}

function QA(e) {
    return !(e instanceof Go) && !(e instanceof Wo)
}
var Ga = class {};
var KA = (() => {
        class e {
            constructor(n, r, o, i, s) {
                this.router = n, this.injector = o, this.preloadingStrategy = i, this.loader = s
            }
            setUpPreloading() {
                this.subscription = this.router.events.pipe(we(n => n instanceof Yt), xt(() => this.preload())).subscribe(() => {})
            }
            preload() {
                return this.processRoutes(this.injector, this.router.config)
            }
            ngOnDestroy() {
                this.subscription && this.subscription.unsubscribe()
            }
            processRoutes(n, r) {
                let o = [];
                for (let i of r) {
                    i.providers && !i._injector && (i._injector = Us(i.providers, n, `Route: ${i.path}`));
                    let s = i._injector ? ? n,
                        a = i._loadedInjector ? ? s;
                    (i.loadChildren && !i._loadedRoutes && i.canLoad === void 0 || i.loadComponent && !i._loadedComponent) && o.push(this.preloadConfig(s, i)), (i.children || i._loadedRoutes) && o.push(this.processRoutes(a, i.children ? ? i._loadedRoutes))
                }
                return W(o).pipe(Kt())
            }
            preloadConfig(n, r) {
                return this.preloadingStrategy.preload(r, () => {
                    let o;
                    r.loadChildren && r.canLoad === void 0 ? o = this.loader.loadChildren(n, r) : o = A(null);
                    let i = o.pipe(te(s => s === null ? A(void 0) : (r._loadedRoutes = s.routes, r._loadedInjector = s.injector, this.processRoutes(s.injector ? ? n, s.routes))));
                    if (r.loadComponent && !r._loadedComponent) {
                        let s = this.loader.loadComponent(r);
                        return W([i, s]).pipe(Kt())
                    } else return i
                })
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(M(Gn), M(Qs), M(Te), M(Ga), M(Cf))
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                })
            }
        }
        return e
    })(),
    gD = new C(""),
    JA = (() => {
        class e {
            constructor(n, r, o, i, s = {}) {
                this.urlSerializer = n, this.transitions = r, this.viewportScroller = o, this.zone = i, this.options = s, this.lastId = 0, this.lastSource = "imperative", this.restoredId = 0, this.store = {}, s.scrollPositionRestoration || = "disabled", s.anchorScrolling || = "disabled"
            }
            init() {
                this.options.scrollPositionRestoration !== "disabled" && this.viewportScroller.setHistoryScrollRestoration("manual"), this.routerEventsSubscription = this.createScrollEvents(), this.scrollEventsSubscription = this.consumeScrollEvents()
            }
            createScrollEvents() {
                return this.transitions.events.subscribe(n => {
                    n instanceof Lr ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(), this.lastSource = n.navigationTrigger, this.restoredId = n.restoredState ? n.restoredState.navigationId : 0) : n instanceof Yt ? (this.lastId = n.id, this.scheduleScrollEvent(n, this.urlSerializer.parse(n.urlAfterRedirects).fragment)) : n instanceof pn && n.code === ka.IgnoredSameUrlNavigation && (this.lastSource = void 0, this.restoredId = 0, this.scheduleScrollEvent(n, this.urlSerializer.parse(n.url).fragment))
                })
            }
            consumeScrollEvents() {
                return this.transitions.events.subscribe(n => {
                    n instanceof Va && (n.position ? this.options.scrollPositionRestoration === "top" ? this.viewportScroller.scrollToPosition([0, 0]) : this.options.scrollPositionRestoration === "enabled" && this.viewportScroller.scrollToPosition(n.position) : n.anchor && this.options.anchorScrolling === "enabled" ? this.viewportScroller.scrollToAnchor(n.anchor) : this.options.scrollPositionRestoration !== "disabled" && this.viewportScroller.scrollToPosition([0, 0]))
                })
            }
            scheduleScrollEvent(n, r) {
                this.zone.runOutsideAngular(() => {
                    setTimeout(() => {
                        this.zone.run(() => {
                            this.transitions.events.next(new Va(n, this.lastSource === "popstate" ? this.store[this.restoredId] : null, r))
                        })
                    }, 0)
                })
            }
            ngOnDestroy() {
                this.routerEventsSubscription ? .unsubscribe(), this.scrollEventsSubscription ? .unsubscribe()
            }
            static {
                this.\u0275fac = function(r) {
                    Lg()
                }
            }
            static {
                this.\u0275prov = E({
                    token: e,
                    factory: e.\u0275fac
                })
            }
        }
        return e
    })();

function XA(e) {
    return e.routerState.root
}

function ni(e, t) {
    return {\
        u0275kind: e,
        \u0275providers: t
    }
}

function ex() {
    let e = m(Ze);
    return t => {
        let n = e.get(Vn);
        if (t !== n.components[0]) return;
        let r = e.get(Gn),
            o = e.get(mD);
        e.get(bf) === 1 && r.initialNavigation(), e.get(vD, null, L.Optional) ? .setUpPreloading(), e.get(gD, null, L.Optional) ? .init(), r.resetRootComponentType(n.componentTypes[0]), o.closed || (o.next(), o.complete(), o.unsubscribe())
    }
}
var mD = new C("", {
        factory: () => new he
    }),
    bf = new C("", {
        providedIn: "root",
        factory: () => 1
    });

function tx() {
    return ni(2, [{
        provide: bf,
        useValue: 0
    }, {
        provide: Zs,
        multi: !0,
        deps: [Ze],
        useFactory: t => {
            let n = t.get(Iv, Promise.resolve());
            return () => n.then(() => new Promise(r => {
                let o = t.get(Gn),
                    i = t.get(mD);
                pD(o, () => {
                    r(!0)
                }), t.get(If).afterPreactivation = () => (r(!0), i.closed ? A(void 0) : i), o.initialNavigation()
            }))
        }
    }])
}

function nx() {
    return ni(3, [{
        provide: Zs,
        multi: !0,
        useFactory: () => {
            let t = m(Gn);
            return () => {
                t.setUpLocationChangeListener()
            }
        }
    }, {
        provide: bf,
        useValue: 2
    }])
}
var vD = new C("");

function rx(e) {
    return ni(0, [{
        provide: vD,
        useExisting: KA
    }, {
        provide: Ga,
        useExisting: e
    }])
}

function ox() {
    return ni(8, [Fy, {
        provide: Wa,
        useExisting: Fy
    }])
}

function ix(e) {
    let t = [{
        provide: dD,
        useValue: UA
    }, {
        provide: fD,
        useValue: y({
            skipNextTransition: !!e ? .skipInitialTransition
        }, e)
    }];
    return ni(9, t)
}
var ky = new C("ROUTER_FORROOT_GUARD"),
    sx = [br, {
        provide: Ko,
        useClass: Bo
    }, Gn, Jo, {
        provide: Vr,
        useFactory: XA,
        deps: [Gn]
    }, Cf, []],
    HU = (() => {
        class e {
            constructor(n) {}
            static forRoot(n, r) {
                return {
                    ngModule: e,
                    providers: [sx, [], {
                        provide: za,
                        multi: !0,
                        useValue: n
                    }, {
                        provide: ky,
                        useFactory: lx,
                        deps: [
                            [Gn, new yo, new bs]
                        ]
                    }, {
                        provide: ti,
                        useValue: r || {}
                    }, r ? .useHash ? ux() : cx(), ax(), r ? .preloadingStrategy ? rx(r.preloadingStrategy).\u0275providers : [], r ? .initialNavigation ? dx(r) : [], r ? .bindToComponentInputs ? ox().\u0275providers : [], r ? .enableViewTransitions ? ix().\u0275providers : [], fx()]
                }
            }
            static forChild(n) {
                return {
                    ngModule: e,
                    providers: [{
                        provide: za,
                        multi: !0,
                        useValue: n
                    }]
                }
            }
            static {
                this.\u0275fac = function(r) {
                    return new(r || e)(M(ky, 8))
                }
            }
            static {
                this.\u0275mod = je({
                    type: e
                })
            }
            static {
                this.\u0275inj = Ue({})
            }
        }
        return e
    })();

function ax() {
    return {
        provide: gD,
        useFactory: () => {
            let e = m(kv),
                t = m(q),
                n = m(ti),
                r = m(If),
                o = m(Ko);
            return n.scrollOffset && e.setOffset(n.scrollOffset), new JA(o, r, e, t, n)
        }
    }
}

function ux() {
    return {
        provide: jn,
        useClass: _v
    }
}

function cx() {
    return {
        provide: jn,
        useClass: vd
    }
}

function lx(e) {
    return "guarded"
}

function dx(e) {
    return [e.initialNavigation === "disabled" ? nx().\u0275providers : [], e.initialNavigation === "enabledBlocking" ? tx().\u0275providers : []]
}
var Ly = new C("");

function fx() {
    return [{
        provide: Ly,
        useFactory: ex
    }, {
        provide: Ys,
        multi: !0,
        useExisting: Ly
    }]
}
export {
    re as a, R as b, he as c, pe as d, Br as e, De as f, ZN as g, YN as h, W as i, A as j, O as k, zr as l, te as m, Mi as n, du as o, At as p, QD as q, KD as r, JD as s, we as t, ew as u, nw as v, rw as w, oh as x, ze as y, Gr as z, ow as A, iw as B, uw as C, cw as D, mu as E, lw as F, dw as G, vu as H, Oe as I, yu as J, fw as K, ue as L, hw as M, pw as N, D as O, ne as P, Se as Q, ip as R, je as S, z as T, Fn as U, GL as V, WL as W, qL as X, xe as Y, E as Z, Ue as _, C as $, Ct as aa, ZL as ba, qe as ca, M as da, m as ea, YL as fa, _s as ga, Te as ha, GC as ia, Zu as ja, an as ka, Ht as la, rg as ma, Ze as na, ot as oa, QL as pa, KL as qa, JL as ra, XL as sa, eV as ta, tV as ua, nV as va, _ as wa, Vt as xa, pc as ya, gc as za, js as Aa, co as Ba, it as Ca, kn as Da, um as Ea, q as Fa, st as Ga, Le as Ha, sV as Ia, gm as Ja, Vc as Ka, ql as La, $b as Ma, e_ as Na, Im as Oa, $s as Pa, aV as Qa, uV as Ra, cV as Sa, lV as Ta, dV as Ua, fV as Va, hV as Wa, pV as Xa, gV as Ya, mV as Za, xm as _a, Nm as $a, Ql as ab, Rm as bb, Om as cb, m_ as db, vV as eb, y_ as fb, D_ as gb, yV as hb, i0 as ib, DV as jb, at as kb, wV as lb, CV as mb, EV as nb, u0 as ob, Jm as pb, c0 as qb, l0 as rb, d0 as sb, IV as tb, f0 as ub, h0 as vb, bV as wb, _V as xb, m0 as yb, Xm as zb, v0 as Ab, MV as Bb, y0 as Cb, It as Db, tv as Eb, SV as Fb, TV as Gb, AV as Hb, xV as Ib, NV as Jb, RV as Kb, OV as Lb, FV as Mb, PV as Nb, kV as Ob, LV as Pb, VV as Qb, Vn as Rb, Ks as Sb, H0 as Tb, jV as Ub, ye as Vb, gd as Wb, br as Xb, le as Yb, ct as Zb, nj as _b, rj as $b, oj as ac, ij as bc, Rv as cc, sj as dc, aj as ec, uj as fc, cj as gc, lj as hc, dj as ic, fj as jc, hj as kc, pj as lc, gj as mc, Pv as nc, xM as oc, Un as pc, Mr as qc, ha as rc, UM as sc, Aj as tc, qv as uc, Bj as vc, Hj as wc, ey as xc, bS as yc, $n as zc, TS as Ac, ly as Bc, Tr as Cc, aU as Dc, uU as Ec, KS as Fc, eT as Gc, lU as Hc, rT as Ic, iT as Jc, uT as Kc, _y as Lc, dU as Mc, My as Nc, fU as Oc, hU as Pc, pU as Qc, Bn as Rc, vU as Sc, yU as Tc, DU as Uc, wU as Vc, CU as Wc, EU as Xc, IU as Yc, Ty as Zc, Ay as _c, bU as $c, UT as ad, HU as bd
};