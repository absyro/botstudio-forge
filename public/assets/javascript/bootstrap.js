!(function (t, e) {
    'object' == typeof exports && 'undefined' != typeof module ? (module.exports = e(require('@popperjs/core')))
    : 'function' == typeof define && define.amd ? define(['@popperjs/core'], e)
    : ((t = 'undefined' != typeof globalThis ? globalThis : t || self).bootstrap = e(t.Popper));
})(this, function (t) {
    'use strict';
    let e = (function t(e) {
            let i = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
            if (e) {
                for (let s in e)
                    if ('default' !== s) {
                        let n = Object.getOwnPropertyDescriptor(e, s);
                        Object.defineProperty(i, s, n.get ? n : { enumerable: !0, get: () => e[s] });
                    }
            }
            return (i.default = e), Object.freeze(i);
        })(t),
        i = new Map(),
        s = {
            set(t, e, s) {
                i.has(t) || i.set(t, new Map());
                let n = i.get(t);
                if (!n.has(e) && 0 !== n.size) {
                    console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);
                    return;
                }
                n.set(e, s);
            },
            get: (t, e) => (i.has(t) && i.get(t).get(e)) || null,
            remove(t, e) {
                if (!i.has(t)) return;
                let s = i.get(t);
                s.delete(e), 0 === s.size && i.delete(t);
            }
        },
        n = 'transitionend',
        r = (t) => (t && window.CSS && window.CSS.escape && (t = t.replace(/#([^\s"#']+)/g, (t, e) => `#${CSS.escape(e)}`)), t),
        o = (t) =>
            null == t ?
                `${t}`
            :   Object.prototype.toString
                    .call(t)
                    .match(/\s([a-z]+)/i)[1]
                    .toLowerCase(),
        l = (t) => {
            do t += Math.floor(1e6 * Math.random());
            while (document.getElementById(t));
            return t;
        },
        a = (t) => {
            if (!t) return 0;
            let { transitionDuration: e, transitionDelay: i } = window.getComputedStyle(t),
                s = Number.parseFloat(e),
                n = Number.parseFloat(i);
            return s || n ? ((e = e.split(',')[0]), (i = i.split(',')[0]), (Number.parseFloat(e) + Number.parseFloat(i)) * 1e3) : 0;
        },
        h = (t) => {
            t.dispatchEvent(new Event(n));
        },
        c = (t) => !!t && 'object' == typeof t && (void 0 !== t.jquery && (t = t[0]), void 0 !== t.nodeType),
        u = (t) =>
            c(t) ?
                t.jquery ?
                    t[0]
                :   t
            : 'string' == typeof t && t.length > 0 ? document.querySelector(r(t))
            : null,
        d = (t) => {
            if (!c(t) || 0 === t.getClientRects().length) return !1;
            let e = 'visible' === getComputedStyle(t).getPropertyValue('visibility'),
                i = t.closest('details:not([open])');
            if (!i) return e;
            if (i !== t) {
                let s = t.closest('summary');
                if ((s && s.parentNode !== i) || null === s) return !1;
            }
            return e;
        },
        g = (t) => !!(!t || t.nodeType !== Node.ELEMENT_NODE || t.classList.contains('disabled')) || (void 0 !== t.disabled ? t.disabled : t.hasAttribute('disabled') && 'false' !== t.getAttribute('disabled')),
        f = (t) => {
            if (!document.documentElement.attachShadow) return null;
            if ('function' == typeof t.getRootNode) {
                let e = t.getRootNode();
                return e instanceof ShadowRoot ? e : null;
            }
            return (
                t instanceof ShadowRoot ? t
                : t.parentNode ? f(t.parentNode)
                : null
            );
        },
        p = () => {},
        m = (t) => {
            t.offsetHeight;
        },
        b = () => (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery') ? window.jQuery : null),
        v = [],
        y = (t) => {
            'loading' === document.readyState ?
                (v.length ||
                    document.addEventListener('DOMContentLoaded', () => {
                        for (let t of v) t();
                    }),
                v.push(t))
            :   t();
        },
        w = () => 'rtl' === document.documentElement.dir,
        A = (t) => {
            y(() => {
                let e = b();
                if (e) {
                    let i = t.NAME,
                        s = e.fn[i];
                    (e.fn[i] = t.jQueryInterface), (e.fn[i].Constructor = t), (e.fn[i].noConflict = () => ((e.fn[i] = s), t.jQueryInterface));
                }
            });
        },
        E = (t, e = [], i = t) => ('function' == typeof t ? t(...e) : i),
        C = (t, e, i = !0) => {
            if (!i) {
                E(t);
                return;
            }
            let s = a(e) + 5,
                r = !1,
                o = ({ target: i }) => {
                    i === e && ((r = !0), e.removeEventListener(n, o), E(t));
                };
            e.addEventListener(n, o),
                setTimeout(() => {
                    r || h(e);
                }, s);
        },
        T = (t, e, i, s) => {
            let n = t.length,
                r = t.indexOf(e);
            return (
                -1 === r ?
                    !i && s ?
                        t[n - 1]
                    :   t[0]
                :   ((r += i ? 1 : -1), s && (r = (r + n) % n), t[Math.max(0, Math.min(r, n - 1))])
            );
        },
        k = /[^.]*(?=\..*)\.|.*/,
        $ = /\..*/,
        L = /::\d+$/,
        S = {},
        I = 1,
        D = { mouseenter: 'mouseover', mouseleave: 'mouseout' },
        O = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
    function N(t, e) {
        return (e && `${e}::${I++}`) || t.uidEvent || I++;
    }
    function P(t) {
        let e = N(t);
        return (t.uidEvent = e), (S[e] = S[e] || {}), S[e];
    }
    function x(t, e, i = null) {
        return Object.values(t).find((t) => t.callable === e && t.delegationSelector === i);
    }
    function _(t, e, i) {
        let s = 'string' == typeof e,
            n = z(t);
        return O.has(n) || (n = t), [s, s ? i : e || i, n];
    }
    function M(t, e, i, s, n) {
        var r, o, l, a, h, c;
        if ('string' != typeof e || !t) return;
        let [u, d, g] = _(e, i, s);
        e in D &&
            (d =
                ((r = d),
                function (t) {
                    if (!t.relatedTarget || (t.relatedTarget !== t.delegateTarget && !t.delegateTarget.contains(t.relatedTarget))) return r.call(this, t);
                }));
        let f = P(t),
            p = f[g] || (f[g] = {}),
            m = x(p, d, u ? i : null);
        if (m) {
            m.oneOff = m.oneOff && n;
            return;
        }
        let b = N(d, e.replace(k, '')),
            v =
                u ?
                    ((o = t),
                    (l = i),
                    (a = d),
                    function t(e) {
                        let i = o.querySelectorAll(l);
                        for (let { target: s } = e; s && s !== this; s = s.parentNode) for (let n of i) if (n === s) return q(e, { delegateTarget: s }), t.oneOff && H.off(o, e.type, l, a), a.apply(s, [e]);
                    })
                :   ((h = t),
                    (c = d),
                    function t(e) {
                        return q(e, { delegateTarget: h }), t.oneOff && H.off(h, e.type, c), c.apply(h, [e]);
                    });
        (v.delegationSelector = u ? i : null), (v.callable = d), (v.oneOff = n), (v.uidEvent = b), (p[b] = v), t.addEventListener(g, v, u);
    }
    function F(t, e, i, s, n) {
        let r = x(e[i], s, n);
        r && (t.removeEventListener(i, r, Boolean(n)), delete e[i][r.uidEvent]);
    }
    function j(t, e, i, s) {
        let n = e[i] || {};
        for (let [r, o] of Object.entries(n)) r.includes(s) && F(t, e, i, o.callable, o.delegationSelector);
    }
    function z(t) {
        return D[(t = t.replace($, ''))] || t;
    }
    let H = {
        on(t, e, i, s) {
            M(t, e, i, s, !1);
        },
        one(t, e, i, s) {
            M(t, e, i, s, !0);
        },
        off(t, e, i, s) {
            if ('string' != typeof e || !t) return;
            let [n, r, o] = _(e, i, s),
                l = o !== e,
                a = P(t),
                h = a[o] || {},
                c = e.startsWith('.');
            if (void 0 !== r) {
                if (!Object.keys(h).length) return;
                F(t, a, o, r, n ? i : null);
                return;
            }
            if (c) for (let u of Object.keys(a)) j(t, a, u, e.slice(1));
            for (let [d, g] of Object.entries(h)) {
                let f = d.replace(L, '');
                (!l || e.includes(f)) && F(t, a, o, g.callable, g.delegationSelector);
            }
        },
        trigger(t, e, i) {
            if ('string' != typeof e || !t) return null;
            let s = b(),
                n = z(e),
                r = null,
                o = !0,
                l = !0,
                a = !1;
            e !== n && s && ((r = s.Event(e, i)), s(t).trigger(r), (o = !r.isPropagationStopped()), (l = !r.isImmediatePropagationStopped()), (a = r.isDefaultPrevented()));
            let h = q(new Event(e, { bubbles: o, cancelable: !0 }), i);
            return a && h.preventDefault(), l && t.dispatchEvent(h), h.defaultPrevented && r && r.preventDefault(), h;
        }
    };
    function q(t, e = {}) {
        for (let [i, s] of Object.entries(e))
            try {
                t[i] = s;
            } catch (n) {
                Object.defineProperty(t, i, { configurable: !0, get: () => s });
            }
        return t;
    }
    function W(t) {
        if ('true' === t) return !0;
        if ('false' === t) return !1;
        if (t === Number(t).toString()) return Number(t);
        if ('' === t || 'null' === t) return null;
        if ('string' != typeof t) return t;
        try {
            return JSON.parse(decodeURIComponent(t));
        } catch (e) {
            return t;
        }
    }
    function B(t) {
        return t.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
    }
    let K = {
        setDataAttribute(t, e, i) {
            t.setAttribute(`data-bs-${B(e)}`, i);
        },
        removeDataAttribute(t, e) {
            t.removeAttribute(`data-bs-${B(e)}`);
        },
        getDataAttributes(t) {
            if (!t) return {};
            let e = {},
                i = Object.keys(t.dataset).filter((t) => t.startsWith('bs') && !t.startsWith('bsConfig'));
            for (let s of i) {
                let n = s.replace(/^bs/, '');
                e[(n = n.charAt(0).toLowerCase() + n.slice(1, n.length))] = W(t.dataset[s]);
            }
            return e;
        },
        getDataAttribute: (t, e) => W(t.getAttribute(`data-bs-${B(e)}`))
    };
    class R {
        static get Default() {
            return {};
        }
        static get DefaultType() {
            return {};
        }
        static get NAME() {
            throw Error('You have to implement the static method "NAME", for each component!');
        }
        _getConfig(t) {
            return (t = this._mergeConfigObj(t)), (t = this._configAfterMerge(t)), this._typeCheckConfig(t), t;
        }
        _configAfterMerge(t) {
            return t;
        }
        _mergeConfigObj(t, e) {
            let i = c(e) ? K.getDataAttribute(e, 'config') : {};
            return { ...this.constructor.Default, ...('object' == typeof i ? i : {}), ...(c(e) ? K.getDataAttributes(e) : {}), ...('object' == typeof t ? t : {}) };
        }
        _typeCheckConfig(t, e = this.constructor.DefaultType) {
            for (let [i, s] of Object.entries(e)) {
                let n = t[i],
                    r = c(n) ? 'element' : o(n);
                if (!RegExp(s).test(r)) throw TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${r}" but expected type "${s}".`);
            }
        }
    }
    class V extends R {
        constructor(t, e) {
            if ((super(), !(t = u(t)))) return;
            (this._element = t), (this._config = this._getConfig(e)), s.set(this._element, this.constructor.DATA_KEY, this);
        }
        dispose() {
            for (let t of (s.remove(this._element, this.constructor.DATA_KEY), H.off(this._element, this.constructor.EVENT_KEY), Object.getOwnPropertyNames(this))) this[t] = null;
        }
        _queueCallback(t, e, i = !0) {
            C(t, e, i);
        }
        _getConfig(t) {
            return (t = this._mergeConfigObj(t, this._element)), (t = this._configAfterMerge(t)), this._typeCheckConfig(t), t;
        }
        static getInstance(t) {
            return s.get(u(t), this.DATA_KEY);
        }
        static getOrCreateInstance(t, e = {}) {
            return this.getInstance(t) || new this(t, 'object' == typeof e ? e : null);
        }
        static get VERSION() {
            return '5.3.3';
        }
        static get DATA_KEY() {
            return `bs.${this.NAME}`;
        }
        static get EVENT_KEY() {
            return `.${this.DATA_KEY}`;
        }
        static eventName(t) {
            return `${t}${this.EVENT_KEY}`;
        }
    }
    let Q = (t) => {
            let e = t.getAttribute('data-bs-target');
            if (!e || '#' === e) {
                let i = t.getAttribute('href');
                if (!i || (!i.includes('#') && !i.startsWith('.'))) return null;
                i.includes('#') && !i.startsWith('#') && (i = `#${i.split('#')[1]}`), (e = i && '#' !== i ? i.trim() : null);
            }
            return e ?
                    e
                        .split(',')
                        .map((t) => r(t))
                        .join(',')
                :   null;
        },
        X = {
            find: (t, e = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e, t)),
            findOne: (t, e = document.documentElement) => Element.prototype.querySelector.call(e, t),
            children: (t, e) => [].concat(...t.children).filter((t) => t.matches(e)),
            parents(t, e) {
                let i = [],
                    s = t.parentNode.closest(e);
                for (; s; ) i.push(s), (s = s.parentNode.closest(e));
                return i;
            },
            prev(t, e) {
                let i = t.previousElementSibling;
                for (; i; ) {
                    if (i.matches(e)) return [i];
                    i = i.previousElementSibling;
                }
                return [];
            },
            next(t, e) {
                let i = t.nextElementSibling;
                for (; i; ) {
                    if (i.matches(e)) return [i];
                    i = i.nextElementSibling;
                }
                return [];
            },
            focusableChildren(t) {
                let e = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map((t) => `${t}:not([tabindex^="-"])`).join(',');
                return this.find(e, t).filter((t) => !g(t) && d(t));
            },
            getSelectorFromElement(t) {
                let e = Q(t);
                return e && X.findOne(e) ? e : null;
            },
            getElementFromSelector(t) {
                let e = Q(t);
                return e ? X.findOne(e) : null;
            },
            getMultipleElementsFromSelector(t) {
                let e = Q(t);
                return e ? X.find(e) : [];
            }
        },
        Y = (t, e = 'hide') => {
            let i = `click.dismiss${t.EVENT_KEY}`,
                s = t.NAME;
            H.on(document, i, `[data-bs-dismiss="${s}"]`, function (i) {
                if ((['A', 'AREA'].includes(this.tagName) && i.preventDefault(), g(this))) return;
                let n = X.getElementFromSelector(this) || this.closest(`.${s}`),
                    r = t.getOrCreateInstance(n);
                r[e]();
            });
        },
        U = '.bs.alert',
        G = `close${U}`,
        Z = `closed${U}`;
    class J extends V {
        static get NAME() {
            return 'alert';
        }
        close() {
            let t = H.trigger(this._element, G);
            if (t.defaultPrevented) return;
            this._element.classList.remove('show');
            let e = this._element.classList.contains('fade');
            this._queueCallback(() => this._destroyElement(), this._element, e);
        }
        _destroyElement() {
            this._element.remove(), H.trigger(this._element, Z), this.dispose();
        }
        static jQueryInterface(t) {
            return this.each(function () {
                let e = J.getOrCreateInstance(this);
                if ('string' == typeof t) {
                    if (void 0 === e[t] || t.startsWith('_') || 'constructor' === t) throw TypeError(`No method named "${t}"`);
                    e[t](this);
                }
            });
        }
    }
    Y(J, 'close'), A(J);
    let tt = '[data-bs-toggle="button"]',
        te = 'click.bs.button.data-api';
    class ti extends V {
        static get NAME() {
            return 'button';
        }
        toggle() {
            this._element.setAttribute('aria-pressed', this._element.classList.toggle('active'));
        }
        static jQueryInterface(t) {
            return this.each(function () {
                let e = ti.getOrCreateInstance(this);
                'toggle' === t && e[t]();
            });
        }
    }
    H.on(document, te, tt, (t) => {
        t.preventDefault();
        let e = t.target.closest(tt),
            i = ti.getOrCreateInstance(e);
        i.toggle();
    }),
        A(ti);
    let ts = '.bs.swipe',
        tn = `touchstart${ts}`,
        tr = `touchmove${ts}`,
        to = `touchend${ts}`,
        tl = `pointerdown${ts}`,
        ta = `pointerup${ts}`,
        th = { endCallback: null, leftCallback: null, rightCallback: null },
        tc = { endCallback: '(function|null)', leftCallback: '(function|null)', rightCallback: '(function|null)' };
    class tu extends R {
        constructor(t, e) {
            if ((super(), (this._element = t), !t || !tu.isSupported())) return;
            (this._config = this._getConfig(e)), (this._deltaX = 0), (this._supportPointerEvents = Boolean(window.PointerEvent)), this._initEvents();
        }
        static get Default() {
            return th;
        }
        static get DefaultType() {
            return tc;
        }
        static get NAME() {
            return 'swipe';
        }
        dispose() {
            H.off(this._element, ts);
        }
        _start(t) {
            if (!this._supportPointerEvents) {
                this._deltaX = t.touches[0].clientX;
                return;
            }
            this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX);
        }
        _end(t) {
            this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX), this._handleSwipe(), E(this._config.endCallback);
        }
        _move(t) {
            this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX;
        }
        _handleSwipe() {
            let t = Math.abs(this._deltaX);
            if (t <= 40) return;
            let e = t / this._deltaX;
            (this._deltaX = 0), e && E(e > 0 ? this._config.rightCallback : this._config.leftCallback);
        }
        _initEvents() {
            this._supportPointerEvents ? (H.on(this._element, tl, (t) => this._start(t)), H.on(this._element, ta, (t) => this._end(t)), this._element.classList.add('pointer-event')) : (H.on(this._element, tn, (t) => this._start(t)), H.on(this._element, tr, (t) => this._move(t)), H.on(this._element, to, (t) => this._end(t)));
        }
        _eventIsPointerPenTouch(t) {
            return this._supportPointerEvents && ('pen' === t.pointerType || 'touch' === t.pointerType);
        }
        static isSupported() {
            return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
        }
    }
    let td = '.bs.carousel',
        t8 = '.data-api',
        tg = 'next',
        tf = 'prev',
        tp = 'left',
        tm = 'right',
        tb = `slide${td}`,
        tv = `slid${td}`,
        ty = `keydown${td}`,
        tw = `mouseenter${td}`,
        tA = `mouseleave${td}`,
        tE = `dragstart${td}`,
        tC = `load${td}${t8}`,
        tT = `click${td}${t8}`,
        tk = 'carousel',
        t$ = 'active',
        t9 = '.active',
        tL = '.carousel-item',
        tS = t9 + tL,
        tI = { ArrowLeft: tm, ArrowRight: tp },
        tD = { interval: 5e3, keyboard: !0, pause: 'hover', ride: !1, touch: !0, wrap: !0 },
        tO = { interval: '(number|boolean)', keyboard: 'boolean', pause: '(string|boolean)', ride: '(boolean|string)', touch: 'boolean', wrap: 'boolean' };
    class tN extends V {
        constructor(t, e) {
            super(t, e), (this._interval = null), (this._activeElement = null), (this._isSliding = !1), (this.touchTimeout = null), (this._swipeHelper = null), (this._indicatorsElement = X.findOne('.carousel-indicators', this._element)), this._addEventListeners(), this._config.ride === tk && this.cycle();
        }
        static get Default() {
            return tD;
        }
        static get DefaultType() {
            return tO;
        }
        static get NAME() {
            return 'carousel';
        }
        next() {
            this._slide(tg);
        }
        nextWhenVisible() {
            !document.hidden && d(this._element) && this.next();
        }
        prev() {
            this._slide(tf);
        }
        pause() {
            this._isSliding && h(this._element), this._clearInterval();
        }
        cycle() {
            this._clearInterval(), this._updateInterval(), (this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval));
        }
        _maybeEnableCycle() {
            if (this._config.ride) {
                if (this._isSliding) {
                    H.one(this._element, tv, () => this.cycle());
                    return;
                }
                this.cycle();
            }
        }
        to(t) {
            let e = this._getItems();
            if (t > e.length - 1 || t < 0) return;
            if (this._isSliding) {
                H.one(this._element, tv, () => this.to(t));
                return;
            }
            let i = this._getItemIndex(this._getActive());
            i !== t && this._slide(t > i ? tg : tf, e[t]);
        }
        dispose() {
            this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
        }
        _configAfterMerge(t) {
            return (t.defaultInterval = t.interval), t;
        }
        _addEventListeners() {
            this._config.keyboard && H.on(this._element, ty, (t) => this._keydown(t)), 'hover' === this._config.pause && (H.on(this._element, tw, () => this.pause()), H.on(this._element, tA, () => this._maybeEnableCycle())), this._config.touch && tu.isSupported() && this._addTouchEventListeners();
        }
        _addTouchEventListeners() {
            for (let t of X.find('.carousel-item img', this._element)) H.on(t, tE, (t) => t.preventDefault());
            let e = () => {
                'hover' === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), (this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), 500 + this._config.interval)));
            };
            this._swipeHelper = new tu(this._element, { leftCallback: () => this._slide(this._directionToOrder(tp)), rightCallback: () => this._slide(this._directionToOrder(tm)), endCallback: e });
        }
        _keydown(t) {
            if (/input|textarea/i.test(t.target.tagName)) return;
            let e = tI[t.key];
            e && (t.preventDefault(), this._slide(this._directionToOrder(e)));
        }
        _getItemIndex(t) {
            return this._getItems().indexOf(t);
        }
        _setActiveIndicatorElement(t) {
            if (!this._indicatorsElement) return;
            let e = X.findOne(t9, this._indicatorsElement);
            e.classList.remove(t$), e.removeAttribute('aria-current');
            let i = X.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
            i && (i.classList.add(t$), i.setAttribute('aria-current', 'true'));
        }
        _updateInterval() {
            let t = this._activeElement || this._getActive();
            if (!t) return;
            let e = Number.parseInt(t.getAttribute('data-bs-interval'), 10);
            this._config.interval = e || this._config.defaultInterval;
        }
        _slide(t, e = null) {
            if (this._isSliding) return;
            let i = this._getActive(),
                s = t === tg,
                n = e || T(this._getItems(), i, s, this._config.wrap);
            if (n === i) return;
            let r = this._getItemIndex(n),
                o = (e) => H.trigger(this._element, e, { relatedTarget: n, direction: this._orderToDirection(t), from: this._getItemIndex(i), to: r }),
                l = o(tb);
            if (l.defaultPrevented || !i || !n) return;
            let a = Boolean(this._interval);
            this.pause(), (this._isSliding = !0), this._setActiveIndicatorElement(r), (this._activeElement = n);
            let h = s ? 'carousel-item-start' : 'carousel-item-end',
                c = s ? 'carousel-item-next' : 'carousel-item-prev';
            n.classList.add(c), m(n), i.classList.add(h), n.classList.add(h);
            let u = () => {
                n.classList.remove(h, c), n.classList.add(t$), i.classList.remove(t$, c, h), (this._isSliding = !1), o(tv);
            };
            this._queueCallback(u, i, this._isAnimated()), a && this.cycle();
        }
        _isAnimated() {
            return this._element.classList.contains('slide');
        }
        _getActive() {
            return X.findOne(tS, this._element);
        }
        _getItems() {
            return X.find(tL, this._element);
        }
        _clearInterval() {
            this._interval && (clearInterval(this._interval), (this._interval = null));
        }
        _directionToOrder(t) {
            return (
                w() ?
                    t === tp ?
                        tf
                    :   tg
                : t === tp ? tg
                : tf
            );
        }
        _orderToDirection(t) {
            return (
                w() ?
                    t === tf ?
                        tp
                    :   tm
                : t === tf ? tm
                : tp
            );
        }
        static jQueryInterface(t) {
            return this.each(function () {
                let e = tN.getOrCreateInstance(this, t);
                if ('number' == typeof t) {
                    e.to(t);
                    return;
                }
                if ('string' == typeof t) {
                    if (void 0 === e[t] || t.startsWith('_') || 'constructor' === t) throw TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    H.on(document, tT, '[data-bs-slide], [data-bs-slide-to]', function (t) {
        let e = X.getElementFromSelector(this);
        if (!e || !e.classList.contains(tk)) return;
        t.preventDefault();
        let i = tN.getOrCreateInstance(e),
            s = this.getAttribute('data-bs-slide-to');
        if (s) {
            i.to(s), i._maybeEnableCycle();
            return;
        }
        if ('next' === K.getDataAttribute(this, 'slide')) {
            i.next(), i._maybeEnableCycle();
            return;
        }
        i.prev(), i._maybeEnableCycle();
    }),
        H.on(window, tC, () => {
            let t = X.find('[data-bs-ride="carousel"]');
            for (let e of t) tN.getOrCreateInstance(e);
        }),
        A(tN);
    let tP = '.bs.collapse',
        tx = `show${tP}`,
        t_ = `shown${tP}`,
        tM = `hide${tP}`,
        tF = `hidden${tP}`,
        tj = `click${tP}.data-api`,
        tz = 'show',
        tH = 'collapse',
        tq = 'collapsing',
        tW = `:scope .${tH} .${tH}`,
        tB = '[data-bs-toggle="collapse"]',
        tK = { parent: null, toggle: !0 },
        tR = { parent: '(null|element)', toggle: 'boolean' };
    class tV extends V {
        constructor(t, e) {
            super(t, e), (this._isTransitioning = !1), (this._triggerArray = []);
            let i = X.find(tB);
            for (let s of i) {
                let n = X.getSelectorFromElement(s),
                    r = X.find(n).filter((t) => t === this._element);
                null !== n && r.length && this._triggerArray.push(s);
            }
            this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
        }
        static get Default() {
            return tK;
        }
        static get DefaultType() {
            return tR;
        }
        static get NAME() {
            return 'collapse';
        }
        toggle() {
            this._isShown() ? this.hide() : this.show();
        }
        show() {
            if (this._isTransitioning || this._isShown()) return;
            let t = [];
            if (
                (this._config.parent &&
                    (t = this._getFirstLevelChildren('.collapse.show, .collapse.collapsing')
                        .filter((t) => t !== this._element)
                        .map((t) => tV.getOrCreateInstance(t, { toggle: !1 }))),
                t.length && t[0]._isTransitioning)
            )
                return;
            let e = H.trigger(this._element, tx);
            if (e.defaultPrevented) return;
            for (let i of t) i.hide();
            let s = this._getDimension();
            this._element.classList.remove(tH), this._element.classList.add(tq), (this._element.style[s] = 0), this._addAriaAndCollapsedClass(this._triggerArray, !0), (this._isTransitioning = !0);
            let n = () => {
                    (this._isTransitioning = !1), this._element.classList.remove(tq), this._element.classList.add(tH, tz), (this._element.style[s] = ''), H.trigger(this._element, t_);
                },
                r = s[0].toUpperCase() + s.slice(1),
                o = `scroll${r}`;
            this._queueCallback(n, this._element, !0), (this._element.style[s] = `${this._element[o]}px`);
        }
        hide() {
            if (this._isTransitioning || !this._isShown()) return;
            let t = H.trigger(this._element, tM);
            if (t.defaultPrevented) return;
            let e = this._getDimension();
            for (let i of ((this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`), m(this._element), this._element.classList.add(tq), this._element.classList.remove(tH, tz), this._triggerArray)) {
                let s = X.getElementFromSelector(i);
                s && !this._isShown(s) && this._addAriaAndCollapsedClass([i], !1);
            }
            this._isTransitioning = !0;
            let n = () => {
                (this._isTransitioning = !1), this._element.classList.remove(tq), this._element.classList.add(tH), H.trigger(this._element, tF);
            };
            (this._element.style[e] = ''), this._queueCallback(n, this._element, !0);
        }
        _isShown(t = this._element) {
            return t.classList.contains(tz);
        }
        _configAfterMerge(t) {
            return (t.toggle = Boolean(t.toggle)), (t.parent = u(t.parent)), t;
        }
        _getDimension() {
            return this._element.classList.contains('collapse-horizontal') ? 'width' : 'height';
        }
        _initializeChildren() {
            if (!this._config.parent) return;
            let t = this._getFirstLevelChildren(tB);
            for (let e of t) {
                let i = X.getElementFromSelector(e);
                i && this._addAriaAndCollapsedClass([e], this._isShown(i));
            }
        }
        _getFirstLevelChildren(t) {
            let e = X.find(tW, this._config.parent);
            return X.find(t, this._config.parent).filter((t) => !e.includes(t));
        }
        _addAriaAndCollapsedClass(t, e) {
            if (t.length) for (let i of t) i.classList.toggle('collapsed', !e), i.setAttribute('aria-expanded', e);
        }
        static jQueryInterface(t) {
            let e = {};
            return (
                'string' == typeof t && /show|hide/.test(t) && (e.toggle = !1),
                this.each(function () {
                    let i = tV.getOrCreateInstance(this, e);
                    if ('string' == typeof t) {
                        if (void 0 === i[t]) throw TypeError(`No method named "${t}"`);
                        i[t]();
                    }
                })
            );
        }
    }
    H.on(document, tj, tB, function (t) {
        for (let e of (('A' === t.target.tagName || (t.delegateTarget && 'A' === t.delegateTarget.tagName)) && t.preventDefault(), X.getMultipleElementsFromSelector(this))) tV.getOrCreateInstance(e, { toggle: !1 }).toggle();
    }),
        A(tV);
    let tQ = 'dropdown',
        tX = '.bs.dropdown',
        tY = '.data-api',
        tU = 'ArrowDown',
        t3 = `hide${tX}`,
        t1 = `hidden${tX}`,
        t0 = `show${tX}`,
        t2 = `shown${tX}`,
        t4 = `click${tX}${tY}`,
        tG = `keydown${tX}${tY}`,
        tZ = `keyup${tX}${tY}`,
        t6 = 'show',
        t7 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
        tJ = `${t7}.${t6}`,
        t5 = '.dropdown-menu',
        et = w() ? 'top-end' : 'top-start',
        ee = w() ? 'top-start' : 'top-end',
        ei = w() ? 'bottom-end' : 'bottom-start',
        es = w() ? 'bottom-start' : 'bottom-end',
        en = w() ? 'left-start' : 'right-start',
        er = w() ? 'right-start' : 'left-start',
        eo = { autoClose: !0, boundary: 'clippingParents', display: 'dynamic', offset: [0, 2], popperConfig: null, reference: 'toggle' },
        el = { autoClose: '(boolean|string)', boundary: '(string|element)', display: 'string', offset: '(array|string|function)', popperConfig: '(null|object|function)', reference: '(string|element|object)' };
    class ea extends V {
        constructor(t, e) {
            super(t, e), (this._popper = null), (this._parent = this._element.parentNode), (this._menu = X.next(this._element, t5)[0] || X.prev(this._element, t5)[0] || X.findOne(t5, this._parent)), (this._inNavbar = this._detectNavbar());
        }
        static get Default() {
            return eo;
        }
        static get DefaultType() {
            return el;
        }
        static get NAME() {
            return tQ;
        }
        toggle() {
            return this._isShown() ? this.hide() : this.show();
        }
        show() {
            if (g(this._element) || this._isShown()) return;
            let t = { relatedTarget: this._element },
                e = H.trigger(this._element, t0, t);
            if (!e.defaultPrevented) {
                if ((this._createPopper(), 'ontouchstart' in document.documentElement && !this._parent.closest('.navbar-nav'))) for (let i of [].concat(...document.body.children)) H.on(i, 'mouseover', p);
                this._element.focus(), this._element.setAttribute('aria-expanded', !0), this._menu.classList.add(t6), this._element.classList.add(t6), H.trigger(this._element, t2, t);
            }
        }
        hide() {
            if (g(this._element) || !this._isShown()) return;
            let t = { relatedTarget: this._element };
            this._completeHide(t);
        }
        dispose() {
            this._popper && this._popper.destroy(), super.dispose();
        }
        update() {
            (this._inNavbar = this._detectNavbar()), this._popper && this._popper.update();
        }
        _completeHide(t) {
            let e = H.trigger(this._element, t3, t);
            if (!e.defaultPrevented) {
                if ('ontouchstart' in document.documentElement) for (let i of [].concat(...document.body.children)) H.off(i, 'mouseover', p);
                this._popper && this._popper.destroy(), this._menu.classList.remove(t6), this._element.classList.remove(t6), this._element.setAttribute('aria-expanded', 'false'), K.removeDataAttribute(this._menu, 'popper'), H.trigger(this._element, t1, t);
            }
        }
        _getConfig(t) {
            if ('object' == typeof (t = super._getConfig(t)).reference && !c(t.reference) && 'function' != typeof t.reference.getBoundingClientRect) throw TypeError(`${tQ.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
            return t;
        }
        _createPopper() {
            if (void 0 === e) throw TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
            let t = this._element;
            'parent' === this._config.reference ? (t = this._parent)
            : c(this._config.reference) ? (t = u(this._config.reference))
            : 'object' == typeof this._config.reference && (t = this._config.reference);
            let i = this._getPopperConfig();
            this._popper = e.createPopper(t, this._menu, i);
        }
        _isShown() {
            return this._menu.classList.contains(t6);
        }
        _getPlacement() {
            let t = this._parent;
            if (t.classList.contains('dropend')) return en;
            if (t.classList.contains('dropstart')) return er;
            if (t.classList.contains('dropup-center')) return 'top';
            if (t.classList.contains('dropdown-center')) return 'bottom';
            let e = 'end' === getComputedStyle(this._menu).getPropertyValue('--bs-position').trim();
            return (
                t.classList.contains('dropup') ?
                    e ? ee
                    :   et
                : e ? es
                : ei
            );
        }
        _detectNavbar() {
            return null !== this._element.closest('.navbar');
        }
        _getOffset() {
            let { offset: t } = this._config;
            return (
                'string' == typeof t ? t.split(',').map((t) => Number.parseInt(t, 10))
                : 'function' == typeof t ? (e) => t(e, this._element)
                : t
            );
        }
        _getPopperConfig() {
            let t = {
                placement: this._getPlacement(),
                modifiers: [
                    { name: 'preventOverflow', options: { boundary: this._config.boundary } },
                    { name: 'offset', options: { offset: this._getOffset() } }
                ]
            };
            return (this._inNavbar || 'static' === this._config.display) && (K.setDataAttribute(this._menu, 'popper', 'static'), (t.modifiers = [{ name: 'applyStyles', enabled: !1 }])), { ...t, ...E(this._config.popperConfig, [t]) };
        }
        _selectMenuItem({ key: t, target: e }) {
            let i = X.find('.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)', this._menu).filter((t) => d(t));
            i.length && T(i, e, t === tU, !i.includes(e)).focus();
        }
        static jQueryInterface(t) {
            return this.each(function () {
                let e = ea.getOrCreateInstance(this, t);
                if ('string' == typeof t) {
                    if (void 0 === e[t]) throw TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
        static clearMenus(t) {
            if (2 === t.button || ('keyup' === t.type && 'Tab' !== t.key)) return;
            let e = X.find(tJ);
            for (let i of e) {
                let s = ea.getInstance(i);
                if (!s || !1 === s._config.autoClose) continue;
                let n = t.composedPath(),
                    r = n.includes(s._menu);
                if (n.includes(s._element) || ('inside' === s._config.autoClose && !r) || ('outside' === s._config.autoClose && r) || (s._menu.contains(t.target) && (('keyup' === t.type && 'Tab' === t.key) || /input|select|option|textarea|form/i.test(t.target.tagName)))) continue;
                let o = { relatedTarget: s._element };
                'click' === t.type && (o.clickEvent = t), s._completeHide(o);
            }
        }
        static dataApiKeydownHandler(t) {
            let e = /input|textarea/i.test(t.target.tagName),
                i = 'Escape' === t.key,
                s = ['ArrowUp', tU].includes(t.key);
            if ((!s && !i) || (e && !i)) return;
            t.preventDefault();
            let n = this.matches(t7) ? this : X.prev(this, t7)[0] || X.next(this, t7)[0] || X.findOne(t7, t.delegateTarget.parentNode),
                r = ea.getOrCreateInstance(n);
            if (s) {
                t.stopPropagation(), r.show(), r._selectMenuItem(t);
                return;
            }
            r._isShown() && (t.stopPropagation(), r.hide(), n.focus());
        }
    }
    H.on(document, tG, t7, ea.dataApiKeydownHandler),
        H.on(document, tG, t5, ea.dataApiKeydownHandler),
        H.on(document, t4, ea.clearMenus),
        H.on(document, tZ, ea.clearMenus),
        H.on(document, t4, t7, function (t) {
            t.preventDefault(), ea.getOrCreateInstance(this).toggle();
        }),
        A(ea);
    let eh = 'backdrop',
        ec = 'show',
        eu = `mousedown.bs.${eh}`,
        ed = { className: 'modal-backdrop', clickCallback: null, isAnimated: !1, isVisible: !0, rootElement: 'body' },
        e8 = { className: 'string', clickCallback: '(function|null)', isAnimated: 'boolean', isVisible: 'boolean', rootElement: '(element|string)' };
    class eg extends R {
        constructor(t) {
            super(), (this._config = this._getConfig(t)), (this._isAppended = !1), (this._element = null);
        }
        static get Default() {
            return ed;
        }
        static get DefaultType() {
            return e8;
        }
        static get NAME() {
            return eh;
        }
        show(t) {
            if (!this._config.isVisible) {
                E(t);
                return;
            }
            this._append();
            let e = this._getElement();
            this._config.isAnimated && m(e),
                e.classList.add(ec),
                this._emulateAnimation(() => {
                    E(t);
                });
        }
        hide(t) {
            if (!this._config.isVisible) {
                E(t);
                return;
            }
            this._getElement().classList.remove(ec),
                this._emulateAnimation(() => {
                    this.dispose(), E(t);
                });
        }
        dispose() {
            this._isAppended && (H.off(this._element, eu), this._element.remove(), (this._isAppended = !1));
        }
        _getElement() {
            if (!this._element) {
                let t = document.createElement('div');
                (t.className = this._config.className), this._config.isAnimated && t.classList.add('fade'), (this._element = t);
            }
            return this._element;
        }
        _configAfterMerge(t) {
            return (t.rootElement = u(t.rootElement)), t;
        }
        _append() {
            if (this._isAppended) return;
            let t = this._getElement();
            this._config.rootElement.append(t),
                H.on(t, eu, () => {
                    E(this._config.clickCallback);
                }),
                (this._isAppended = !0);
        }
        _emulateAnimation(t) {
            C(t, this._getElement(), this._config.isAnimated);
        }
    }
    let ef = '.bs.focustrap',
        ep = `focusin${ef}`,
        em = `keydown.tab${ef}`,
        eb = 'backward',
        ev = { autofocus: !0, trapElement: null },
        ey = { autofocus: 'boolean', trapElement: 'element' };
    class ew extends R {
        constructor(t) {
            super(), (this._config = this._getConfig(t)), (this._isActive = !1), (this._lastTabNavDirection = null);
        }
        static get Default() {
            return ev;
        }
        static get DefaultType() {
            return ey;
        }
        static get NAME() {
            return 'focustrap';
        }
        activate() {
            !this._isActive && (this._config.autofocus && this._config.trapElement.focus(), H.off(document, ef), H.on(document, ep, (t) => this._handleFocusin(t)), H.on(document, em, (t) => this._handleKeydown(t)), (this._isActive = !0));
        }
        deactivate() {
            this._isActive && ((this._isActive = !1), H.off(document, ef));
        }
        _handleFocusin(t) {
            let { trapElement: e } = this._config;
            if (t.target === document || t.target === e || e.contains(t.target)) return;
            let i = X.focusableChildren(e);
            0 === i.length ? e.focus()
            : this._lastTabNavDirection === eb ? i[i.length - 1].focus()
            : i[0].focus();
        }
        _handleKeydown(t) {
            'Tab' === t.key && (this._lastTabNavDirection = t.shiftKey ? eb : 'forward');
        }
    }
    let eA = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
        eE = '.sticky-top',
        eC = 'padding-right',
        eT = 'margin-right';
    class ek {
        constructor() {
            this._element = document.body;
        }
        getWidth() {
            let t = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - t);
        }
        hide() {
            let t = this.getWidth();
            this._disableOverFlow(), this._setElementAttributes(this._element, eC, (e) => e + t), this._setElementAttributes(eA, eC, (e) => e + t), this._setElementAttributes(eE, eT, (e) => e - t);
        }
        reset() {
            this._resetElementAttributes(this._element, 'overflow'), this._resetElementAttributes(this._element, eC), this._resetElementAttributes(eA, eC), this._resetElementAttributes(eE, eT);
        }
        isOverflowing() {
            return this.getWidth() > 0;
        }
        _disableOverFlow() {
            this._saveInitialAttribute(this._element, 'overflow'), (this._element.style.overflow = 'hidden');
        }
        _setElementAttributes(t, e, i) {
            let s = this.getWidth(),
                n = (t) => {
                    if (t !== this._element && window.innerWidth > t.clientWidth + s) return;
                    this._saveInitialAttribute(t, e);
                    let n = window.getComputedStyle(t).getPropertyValue(e);
                    t.style.setProperty(e, `${i(Number.parseFloat(n))}px`);
                };
            this._applyManipulationCallback(t, n);
        }
        _saveInitialAttribute(t, e) {
            let i = t.style.getPropertyValue(e);
            i && K.setDataAttribute(t, e, i);
        }
        _resetElementAttributes(t, e) {
            let i = (t) => {
                let i = K.getDataAttribute(t, e);
                if (null === i) {
                    t.style.removeProperty(e);
                    return;
                }
                K.removeDataAttribute(t, e), t.style.setProperty(e, i);
            };
            this._applyManipulationCallback(t, i);
        }
        _applyManipulationCallback(t, e) {
            if (c(t)) {
                e(t);
                return;
            }
            for (let i of X.find(t, this._element)) e(i);
        }
    }
    let e$ = '.bs.modal',
        e9 = `hide${e$}`,
        eL = `hidePrevented${e$}`,
        eS = `hidden${e$}`,
        eI = `show${e$}`,
        eD = `shown${e$}`,
        eO = `resize${e$}`,
        eN = `click.dismiss${e$}`,
        eP = `mousedown.dismiss${e$}`,
        ex = `keydown.dismiss${e$}`,
        e_ = `click${e$}.data-api`,
        eM = 'modal-open',
        eF = 'show',
        ej = 'modal-static',
        ez = { backdrop: !0, focus: !0, keyboard: !0 },
        eH = { backdrop: '(boolean|string)', focus: 'boolean', keyboard: 'boolean' };
    class eq extends V {
        constructor(t, e) {
            super(t, e), (this._dialog = X.findOne('.modal-dialog', this._element)), (this._backdrop = this._initializeBackDrop()), (this._focustrap = this._initializeFocusTrap()), (this._isShown = !1), (this._isTransitioning = !1), (this._scrollBar = new ek()), this._addEventListeners();
        }
        static get Default() {
            return ez;
        }
        static get DefaultType() {
            return eH;
        }
        static get NAME() {
            return 'modal';
        }
        toggle(t) {
            return this._isShown ? this.hide() : this.show(t);
        }
        show(t) {
            if (this._isShown || this._isTransitioning) return;
            let e = H.trigger(this._element, eI, { relatedTarget: t });
            !e.defaultPrevented && ((this._isShown = !0), (this._isTransitioning = !0), this._scrollBar.hide(), document.body.classList.add(eM), this._adjustDialog(), this._backdrop.show(() => this._showElement(t)));
        }
        hide() {
            if (!this._isShown || this._isTransitioning) return;
            let t = H.trigger(this._element, e9);
            !t.defaultPrevented && ((this._isShown = !1), (this._isTransitioning = !0), this._focustrap.deactivate(), this._element.classList.remove(eF), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
        }
        dispose() {
            H.off(window, e$), H.off(this._dialog, e$), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
        }
        handleUpdate() {
            this._adjustDialog();
        }
        _initializeBackDrop() {
            return new eg({ isVisible: Boolean(this._config.backdrop), isAnimated: this._isAnimated() });
        }
        _initializeFocusTrap() {
            return new ew({ trapElement: this._element });
        }
        _showElement(t) {
            document.body.contains(this._element) || document.body.append(this._element), (this._element.style.display = 'block'), this._element.removeAttribute('aria-hidden'), this._element.setAttribute('aria-modal', !0), this._element.setAttribute('role', 'dialog'), (this._element.scrollTop = 0);
            let e = X.findOne('.modal-body', this._dialog);
            e && (e.scrollTop = 0), m(this._element), this._element.classList.add(eF);
            let i = () => {
                this._config.focus && this._focustrap.activate(), (this._isTransitioning = !1), H.trigger(this._element, eD, { relatedTarget: t });
            };
            this._queueCallback(i, this._dialog, this._isAnimated());
        }
        _addEventListeners() {
            H.on(this._element, ex, (t) => {
                if ('Escape' === t.key) {
                    if (this._config.keyboard) {
                        this.hide();
                        return;
                    }
                    this._triggerBackdropTransition();
                }
            }),
                H.on(window, eO, () => {
                    this._isShown && !this._isTransitioning && this._adjustDialog();
                }),
                H.on(this._element, eP, (t) => {
                    H.one(this._element, eN, (e) => {
                        if (this._element === t.target && this._element === e.target) {
                            if ('static' === this._config.backdrop) {
                                this._triggerBackdropTransition();
                                return;
                            }
                            this._config.backdrop && this.hide();
                        }
                    });
                });
        }
        _hideModal() {
            (this._element.style.display = 'none'),
                this._element.setAttribute('aria-hidden', !0),
                this._element.removeAttribute('aria-modal'),
                this._element.removeAttribute('role'),
                (this._isTransitioning = !1),
                this._backdrop.hide(() => {
                    document.body.classList.remove(eM), this._resetAdjustments(), this._scrollBar.reset(), H.trigger(this._element, eS);
                });
        }
        _isAnimated() {
            return this._element.classList.contains('fade');
        }
        _triggerBackdropTransition() {
            let t = H.trigger(this._element, eL);
            if (t.defaultPrevented) return;
            let e = this._element.scrollHeight > document.documentElement.clientHeight,
                i = this._element.style.overflowY;
            !('hidden' === i || this._element.classList.contains(ej)) &&
                (e || (this._element.style.overflowY = 'hidden'),
                this._element.classList.add(ej),
                this._queueCallback(() => {
                    this._element.classList.remove(ej),
                        this._queueCallback(() => {
                            this._element.style.overflowY = i;
                        }, this._dialog);
                }, this._dialog),
                this._element.focus());
        }
        _adjustDialog() {
            let t = this._element.scrollHeight > document.documentElement.clientHeight,
                e = this._scrollBar.getWidth(),
                i = e > 0;
            if (i && !t) {
                let s = w() ? 'paddingLeft' : 'paddingRight';
                this._element.style[s] = `${e}px`;
            }
            if (!i && t) {
                let n = w() ? 'paddingRight' : 'paddingLeft';
                this._element.style[n] = `${e}px`;
            }
        }
        _resetAdjustments() {
            (this._element.style.paddingLeft = ''), (this._element.style.paddingRight = '');
        }
        static jQueryInterface(t, e) {
            return this.each(function () {
                let i = eq.getOrCreateInstance(this, t);
                if ('string' == typeof t) {
                    if (void 0 === i[t]) throw TypeError(`No method named "${t}"`);
                    i[t](e);
                }
            });
        }
    }
    H.on(document, e_, '[data-bs-toggle="modal"]', function (t) {
        let e = X.getElementFromSelector(this);
        ['A', 'AREA'].includes(this.tagName) && t.preventDefault(),
            H.one(e, eI, (t) => {
                !t.defaultPrevented &&
                    H.one(e, eS, () => {
                        d(this) && this.focus();
                    });
            });
        let i = X.findOne('.modal.show');
        i && eq.getInstance(i).hide();
        let s = eq.getOrCreateInstance(e);
        s.toggle(this);
    }),
        Y(eq),
        A(eq);
    let eW = '.bs.offcanvas',
        eB = '.data-api',
        eK = `load${eW}${eB}`,
        eR = 'show',
        eV = 'showing',
        eQ = 'hiding',
        eX = '.offcanvas.show',
        eY = `show${eW}`,
        eU = `shown${eW}`,
        e3 = `hide${eW}`,
        e1 = `hidePrevented${eW}`,
        e0 = `hidden${eW}`,
        e2 = `resize${eW}`,
        e4 = `click${eW}${eB}`,
        eG = `keydown.dismiss${eW}`,
        eZ = { backdrop: !0, keyboard: !0, scroll: !1 },
        e6 = { backdrop: '(boolean|string)', keyboard: 'boolean', scroll: 'boolean' };
    class e7 extends V {
        constructor(t, e) {
            super(t, e), (this._isShown = !1), (this._backdrop = this._initializeBackDrop()), (this._focustrap = this._initializeFocusTrap()), this._addEventListeners();
        }
        static get Default() {
            return eZ;
        }
        static get DefaultType() {
            return e6;
        }
        static get NAME() {
            return 'offcanvas';
        }
        toggle(t) {
            return this._isShown ? this.hide() : this.show(t);
        }
        show(t) {
            if (this._isShown) return;
            let e = H.trigger(this._element, eY, { relatedTarget: t });
            if (e.defaultPrevented) return;
            (this._isShown = !0), this._backdrop.show(), this._config.scroll || new ek().hide(), this._element.setAttribute('aria-modal', !0), this._element.setAttribute('role', 'dialog'), this._element.classList.add(eV);
            let i = () => {
                (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(eR), this._element.classList.remove(eV), H.trigger(this._element, eU, { relatedTarget: t });
            };
            this._queueCallback(i, this._element, !0);
        }
        hide() {
            if (!this._isShown) return;
            let t = H.trigger(this._element, e3);
            if (t.defaultPrevented) return;
            this._focustrap.deactivate(), this._element.blur(), (this._isShown = !1), this._element.classList.add(eQ), this._backdrop.hide();
            let e = () => {
                this._element.classList.remove(eR, eQ), this._element.removeAttribute('aria-modal'), this._element.removeAttribute('role'), this._config.scroll || new ek().reset(), H.trigger(this._element, e0);
            };
            this._queueCallback(e, this._element, !0);
        }
        dispose() {
            this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
        }
        _initializeBackDrop() {
            let t = () => {
                    if ('static' === this._config.backdrop) {
                        H.trigger(this._element, e1);
                        return;
                    }
                    this.hide();
                },
                e = Boolean(this._config.backdrop);
            return new eg({ className: 'offcanvas-backdrop', isVisible: e, isAnimated: !0, rootElement: this._element.parentNode, clickCallback: e ? t : null });
        }
        _initializeFocusTrap() {
            return new ew({ trapElement: this._element });
        }
        _addEventListeners() {
            H.on(this._element, eG, (t) => {
                if ('Escape' === t.key) {
                    if (this._config.keyboard) {
                        this.hide();
                        return;
                    }
                    H.trigger(this._element, e1);
                }
            });
        }
        static jQueryInterface(t) {
            return this.each(function () {
                let e = e7.getOrCreateInstance(this, t);
                if ('string' == typeof t) {
                    if (void 0 === e[t] || t.startsWith('_') || 'constructor' === t) throw TypeError(`No method named "${t}"`);
                    e[t](this);
                }
            });
        }
    }
    H.on(document, e4, '[data-bs-toggle="offcanvas"]', function (t) {
        let e = X.getElementFromSelector(this);
        if ((['A', 'AREA'].includes(this.tagName) && t.preventDefault(), g(this))) return;
        H.one(e, e0, () => {
            d(this) && this.focus();
        });
        let i = X.findOne(eX);
        i && i !== e && e7.getInstance(i).hide();
        let s = e7.getOrCreateInstance(e);
        s.toggle(this);
    }),
        H.on(window, eK, () => {
            for (let t of X.find(eX)) e7.getOrCreateInstance(t).show();
        }),
        H.on(window, e2, () => {
            for (let t of X.find('[aria-modal][class*=show][class*=offcanvas-]')) 'fixed' !== getComputedStyle(t).position && e7.getOrCreateInstance(t).hide();
        }),
        Y(e7),
        A(e7);
    let eJ = { '*': ['class', 'dir', 'id', 'lang', 'role', /^aria-[\w-]*$/i], 'a': ['target', 'href', 'title', 'rel'], 'area': [], 'b': [], 'br': [], 'col': [], 'code': [], 'dd': [], 'div': [], 'dl': [], 'dt': [], 'em': [], 'hr': [], 'h1': [], 'h2': [], 'h3': [], 'h4': [], 'h5': [], 'h6': [], 'i': [], 'img': ['src', 'srcset', 'alt', 'title', 'width', 'height'], 'li': [], 'ol': [], 'p': [], 'pre': [], 's': [], 'small': [], 'span': [], 'sub': [], 'sup': [], 'strong': [], 'u': [], 'ul': [] },
        e5 = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']),
        it = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
        ie = (t, e) => {
            let i = t.nodeName.toLowerCase();
            return e.includes(i) ? !e5.has(i) || Boolean(it.test(t.nodeValue)) : e.filter((t) => t instanceof RegExp).some((t) => t.test(i));
        },
        ii = { allowList: eJ, content: {}, extraClass: '', html: !1, sanitize: !0, sanitizeFn: null, template: '<div></div>' },
        is = { allowList: 'object', content: 'object', extraClass: '(string|function)', html: 'boolean', sanitize: 'boolean', sanitizeFn: '(null|function)', template: 'string' },
        ir = { entry: '(string|element|function|null)', selector: '(string|element)' };
    class io extends R {
        constructor(t) {
            super(), (this._config = this._getConfig(t));
        }
        static get Default() {
            return ii;
        }
        static get DefaultType() {
            return is;
        }
        static get NAME() {
            return 'TemplateFactory';
        }
        getContent() {
            return Object.values(this._config.content)
                .map((t) => this._resolvePossibleFunction(t))
                .filter(Boolean);
        }
        hasContent() {
            return this.getContent().length > 0;
        }
        changeContent(t) {
            return this._checkContent(t), (this._config.content = { ...this._config.content, ...t }), this;
        }
        toHtml() {
            let t = document.createElement('div');
            for (let [e, i] of ((t.innerHTML = this._maybeSanitize(this._config.template)), Object.entries(this._config.content))) this._setContent(t, i, e);
            let s = t.children[0],
                n = this._resolvePossibleFunction(this._config.extraClass);
            return n && s.classList.add(...n.split(' ')), s;
        }
        _typeCheckConfig(t) {
            super._typeCheckConfig(t), this._checkContent(t.content);
        }
        _checkContent(t) {
            for (let [e, i] of Object.entries(t)) super._typeCheckConfig({ selector: e, entry: i }, ir);
        }
        _setContent(t, e, i) {
            let s = X.findOne(i, t);
            if (s) {
                if (!(e = this._resolvePossibleFunction(e))) {
                    s.remove();
                    return;
                }
                if (c(e)) {
                    this._putElementInTemplate(u(e), s);
                    return;
                }
                if (this._config.html) {
                    s.innerHTML = this._maybeSanitize(e);
                    return;
                }
                s.textContent = e;
            }
        }
        _maybeSanitize(t) {
            return this._config.sanitize ?
                    (function t(e, i, s) {
                        if (!e.length) return e;
                        if (s && 'function' == typeof s) return s(e);
                        let n = new window.DOMParser(),
                            r = n.parseFromString(e, 'text/html'),
                            o = [].concat(...r.body.querySelectorAll('*'));
                        for (let l of o) {
                            let a = l.nodeName.toLowerCase();
                            if (!Object.keys(i).includes(a)) {
                                l.remove();
                                continue;
                            }
                            let h = [].concat(...l.attributes),
                                c = [].concat(i['*'] || [], i[a] || []);
                            for (let u of h) ie(u, c) || l.removeAttribute(u.nodeName);
                        }
                        return r.body.innerHTML;
                    })(t, this._config.allowList, this._config.sanitizeFn)
                :   t;
        }
        _resolvePossibleFunction(t) {
            return E(t, [this]);
        }
        _putElementInTemplate(t, e) {
            if (this._config.html) {
                (e.innerHTML = ''), e.append(t);
                return;
            }
            e.textContent = t.textContent;
        }
    }
    let il = new Set(['sanitize', 'allowList', 'sanitizeFn']),
        ia = 'fade',
        ih = 'show',
        ic = '.modal',
        iu = 'hide.bs.modal',
        id = 'hover',
        i8 = 'focus',
        ig = { AUTO: 'auto', TOP: 'top', RIGHT: w() ? 'left' : 'right', BOTTOM: 'bottom', LEFT: w() ? 'right' : 'left' },
        ip = { allowList: eJ, animation: !0, boundary: 'clippingParents', container: !1, customClass: '', delay: 0, fallbackPlacements: ['top', 'right', 'bottom', 'left'], html: !1, offset: [0, 6], placement: 'top', popperConfig: null, sanitize: !0, sanitizeFn: null, selector: !1, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', title: '', trigger: 'hover focus' },
        im = { allowList: 'object', animation: 'boolean', boundary: '(string|element)', container: '(string|element|boolean)', customClass: '(string|function)', delay: '(number|object)', fallbackPlacements: 'array', html: 'boolean', offset: '(array|string|function)', placement: '(string|function)', popperConfig: '(null|object|function)', sanitize: 'boolean', sanitizeFn: '(null|function)', selector: '(string|boolean)', template: 'string', title: '(string|element|function)', trigger: 'string' };
    class ib extends V {
        constructor(t, i) {
            if (void 0 === e) throw TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
            super(t, i), (this._isEnabled = !0), (this._timeout = 0), (this._isHovered = null), (this._activeTrigger = {}), (this._popper = null), (this._templateFactory = null), (this._newContent = null), (this.tip = null), this._setListeners(), this._config.selector || this._fixTitle();
        }
        static get Default() {
            return ip;
        }
        static get DefaultType() {
            return im;
        }
        static get NAME() {
            return 'tooltip';
        }
        enable() {
            this._isEnabled = !0;
        }
        disable() {
            this._isEnabled = !1;
        }
        toggleEnabled() {
            this._isEnabled = !this._isEnabled;
        }
        toggle() {
            if (this._isEnabled) {
                if (((this._activeTrigger.click = !this._activeTrigger.click), this._isShown())) {
                    this._leave();
                    return;
                }
                this._enter();
            }
        }
        dispose() {
            clearTimeout(this._timeout), H.off(this._element.closest(ic), iu, this._hideModalHandler), this._element.getAttribute('data-bs-original-title') && this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title')), this._disposePopper(), super.dispose();
        }
        show() {
            if ('none' === this._element.style.display) throw Error('Please use show on visible elements');
            if (!(this._isWithContent() && this._isEnabled)) return;
            let t = H.trigger(this._element, this.constructor.eventName('show')),
                e = f(this._element),
                i = (e || this._element.ownerDocument.documentElement).contains(this._element);
            if (t.defaultPrevented || !i) return;
            this._disposePopper();
            let s = this._getTipElement();
            this._element.setAttribute('aria-describedby', s.getAttribute('id'));
            let { container: n } = this._config;
            if ((this._element.ownerDocument.documentElement.contains(this.tip) || (n.append(s), H.trigger(this._element, this.constructor.eventName('inserted'))), (this._popper = this._createPopper(s)), s.classList.add(ih), 'ontouchstart' in document.documentElement)) for (let r of [].concat(...document.body.children)) H.on(r, 'mouseover', p);
            let o = () => {
                H.trigger(this._element, this.constructor.eventName('shown')), !1 === this._isHovered && this._leave(), (this._isHovered = !1);
            };
            this._queueCallback(o, this.tip, this._isAnimated());
        }
        hide() {
            if (!this._isShown()) return;
            let t = H.trigger(this._element, this.constructor.eventName('hide'));
            if (t.defaultPrevented) return;
            let e = this._getTipElement();
            if ((e.classList.remove(ih), 'ontouchstart' in document.documentElement)) for (let i of [].concat(...document.body.children)) H.off(i, 'mouseover', p);
            (this._activeTrigger.click = !1), (this._activeTrigger[i8] = !1), (this._activeTrigger[id] = !1), (this._isHovered = null);
            let s = () => {
                !this._isWithActiveTrigger() && (this._isHovered || this._disposePopper(), this._element.removeAttribute('aria-describedby'), H.trigger(this._element, this.constructor.eventName('hidden')));
            };
            this._queueCallback(s, this.tip, this._isAnimated());
        }
        update() {
            this._popper && this._popper.update();
        }
        _isWithContent() {
            return Boolean(this._getTitle());
        }
        _getTipElement() {
            return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip;
        }
        _createTipElement(t) {
            let e = this._getTemplateFactory(t).toHtml();
            if (!e) return null;
            e.classList.remove(ia, ih), e.classList.add(`bs-${this.constructor.NAME}-auto`);
            let i = l(this.constructor.NAME).toString();
            return e.setAttribute('id', i), this._isAnimated() && e.classList.add(ia), e;
        }
        setContent(t) {
            (this._newContent = t), this._isShown() && (this._disposePopper(), this.show());
        }
        _getTemplateFactory(t) {
            return this._templateFactory ? this._templateFactory.changeContent(t) : (this._templateFactory = new io({ ...this._config, content: t, extraClass: this._resolvePossibleFunction(this._config.customClass) })), this._templateFactory;
        }
        _getContentForTemplate() {
            return { '.tooltip-inner': this._getTitle() };
        }
        _getTitle() {
            return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
        }
        _initializeOnDelegatedTarget(t) {
            return this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig());
        }
        _isAnimated() {
            return this._config.animation || (this.tip && this.tip.classList.contains(ia));
        }
        _isShown() {
            return this.tip && this.tip.classList.contains(ih);
        }
        _createPopper(t) {
            let i = E(this._config.placement, [this, t, this._element]),
                s = ig[i.toUpperCase()];
            return e.createPopper(this._element, t, this._getPopperConfig(s));
        }
        _getOffset() {
            let { offset: t } = this._config;
            return (
                'string' == typeof t ? t.split(',').map((t) => Number.parseInt(t, 10))
                : 'function' == typeof t ? (e) => t(e, this._element)
                : t
            );
        }
        _resolvePossibleFunction(t) {
            return E(t, [this._element]);
        }
        _getPopperConfig(t) {
            let e = {
                placement: t,
                modifiers: [
                    { name: 'flip', options: { fallbackPlacements: this._config.fallbackPlacements } },
                    { name: 'offset', options: { offset: this._getOffset() } },
                    { name: 'preventOverflow', options: { boundary: this._config.boundary } },
                    { name: 'arrow', options: { element: `.${this.constructor.NAME}-arrow` } },
                    {
                        name: 'preSetPlacement',
                        enabled: !0,
                        phase: 'beforeMain',
                        fn: (t) => {
                            this._getTipElement().setAttribute('data-popper-placement', t.state.placement);
                        }
                    }
                ]
            };
            return { ...e, ...E(this._config.popperConfig, [e]) };
        }
        _setListeners() {
            let t = this._config.trigger.split(' ');
            for (let e of t)
                if ('click' === e)
                    H.on(this._element, this.constructor.eventName('click'), this._config.selector, (t) => {
                        let e = this._initializeOnDelegatedTarget(t);
                        e.toggle();
                    });
                else if ('manual' !== e) {
                    let i = e === id ? this.constructor.eventName('mouseenter') : this.constructor.eventName('focusin'),
                        s = e === id ? this.constructor.eventName('mouseleave') : this.constructor.eventName('focusout');
                    H.on(this._element, i, this._config.selector, (t) => {
                        let e = this._initializeOnDelegatedTarget(t);
                        (e._activeTrigger['focusin' === t.type ? i8 : id] = !0), e._enter();
                    }),
                        H.on(this._element, s, this._config.selector, (t) => {
                            let e = this._initializeOnDelegatedTarget(t);
                            (e._activeTrigger['focusout' === t.type ? i8 : id] = e._element.contains(t.relatedTarget)), e._leave();
                        });
                }
            (this._hideModalHandler = () => {
                this._element && this.hide();
            }),
                H.on(this._element.closest(ic), iu, this._hideModalHandler);
        }
        _fixTitle() {
            let t = this._element.getAttribute('title');
            t && (this._element.getAttribute('aria-label') || this._element.textContent.trim() || this._element.setAttribute('aria-label', t), this._element.setAttribute('data-bs-original-title', t), this._element.removeAttribute('title'));
        }
        _enter() {
            if (this._isShown() || this._isHovered) {
                this._isHovered = !0;
                return;
            }
            (this._isHovered = !0),
                this._setTimeout(() => {
                    this._isHovered && this.show();
                }, this._config.delay.show);
        }
        _leave() {
            !this._isWithActiveTrigger() &&
                ((this._isHovered = !1),
                this._setTimeout(() => {
                    this._isHovered || this.hide();
                }, this._config.delay.hide));
        }
        _setTimeout(t, e) {
            clearTimeout(this._timeout), (this._timeout = setTimeout(t, e));
        }
        _isWithActiveTrigger() {
            return Object.values(this._activeTrigger).includes(!0);
        }
        _getConfig(t) {
            let e = K.getDataAttributes(this._element);
            for (let i of Object.keys(e)) il.has(i) && delete e[i];
            return (t = { ...e, ...('object' == typeof t && t ? t : {}) }), (t = this._mergeConfigObj(t)), (t = this._configAfterMerge(t)), this._typeCheckConfig(t), t;
        }
        _configAfterMerge(t) {
            return (t.container = !1 === t.container ? document.body : u(t.container)), 'number' == typeof t.delay && (t.delay = { show: t.delay, hide: t.delay }), 'number' == typeof t.title && (t.title = t.title.toString()), 'number' == typeof t.content && (t.content = t.content.toString()), t;
        }
        _getDelegateConfig() {
            let t = {};
            for (let [e, i] of Object.entries(this._config)) this.constructor.Default[e] !== i && (t[e] = i);
            return (t.selector = !1), (t.trigger = 'manual'), t;
        }
        _disposePopper() {
            this._popper && (this._popper.destroy(), (this._popper = null)), this.tip && (this.tip.remove(), (this.tip = null));
        }
        static jQueryInterface(t) {
            return this.each(function () {
                let e = ib.getOrCreateInstance(this, t);
                if ('string' == typeof t) {
                    if (void 0 === e[t]) throw TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    A(ib);
    let iv = { ...ib.Default, content: '', offset: [0, 8], placement: 'right', template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>', trigger: 'click' },
        iy = { ...ib.DefaultType, content: '(null|string|element|function)' };
    class iw extends ib {
        static get Default() {
            return iv;
        }
        static get DefaultType() {
            return iy;
        }
        static get NAME() {
            return 'popover';
        }
        _isWithContent() {
            return this._getTitle() || this._getContent();
        }
        _getContentForTemplate() {
            return { '.popover-header': this._getTitle(), '.popover-body': this._getContent() };
        }
        _getContent() {
            return this._resolvePossibleFunction(this._config.content);
        }
        static jQueryInterface(t) {
            return this.each(function () {
                let e = iw.getOrCreateInstance(this, t);
                if ('string' == typeof t) {
                    if (void 0 === e[t]) throw TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    A(iw);
    let iA = '.bs.scrollspy',
        iE = `activate${iA}`,
        iC = `click${iA}`,
        iT = `load${iA}.data-api`,
        ik = 'active',
        i$ = '[href]',
        i9 = '.nav-link',
        iL = `${i9}, .nav-item > ${i9}, .list-group-item`,
        iS = { offset: null, rootMargin: '0px 0px -25%', smoothScroll: !1, target: null, threshold: [0.1, 0.5, 1] },
        iI = { offset: '(number|null)', rootMargin: 'string', smoothScroll: 'boolean', target: 'element', threshold: 'array' };
    class iD extends V {
        constructor(t, e) {
            super(t, e), (this._targetLinks = new Map()), (this._observableSections = new Map()), (this._rootElement = 'visible' === getComputedStyle(this._element).overflowY ? null : this._element), (this._activeTarget = null), (this._observer = null), (this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }), this.refresh();
        }
        static get Default() {
            return iS;
        }
        static get DefaultType() {
            return iI;
        }
        static get NAME() {
            return 'scrollspy';
        }
        refresh() {
            for (let t of (this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : (this._observer = this._getNewObserver()), this._observableSections.values())) this._observer.observe(t);
        }
        dispose() {
            this._observer.disconnect(), super.dispose();
        }
        _configAfterMerge(t) {
            return (t.target = u(t.target) || document.body), (t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin), 'string' == typeof t.threshold && (t.threshold = t.threshold.split(',').map((t) => Number.parseFloat(t))), t;
        }
        _maybeEnableSmoothScroll() {
            this._config.smoothScroll &&
                (H.off(this._config.target, iC),
                H.on(this._config.target, iC, i$, (t) => {
                    let e = this._observableSections.get(t.target.hash);
                    if (e) {
                        t.preventDefault();
                        let i = this._rootElement || window,
                            s = e.offsetTop - this._element.offsetTop;
                        if (i.scrollTo) {
                            i.scrollTo({ top: s, behavior: 'smooth' });
                            return;
                        }
                        i.scrollTop = s;
                    }
                }));
        }
        _getNewObserver() {
            let t = { root: this._rootElement, threshold: this._config.threshold, rootMargin: this._config.rootMargin };
            return new IntersectionObserver((t) => this._observerCallback(t), t);
        }
        _observerCallback(t) {
            let e = (t) => this._targetLinks.get(`#${t.target.id}`),
                i = (t) => {
                    (this._previousScrollData.visibleEntryTop = t.target.offsetTop), this._process(e(t));
                },
                s = (this._rootElement || document.documentElement).scrollTop,
                n = s >= this._previousScrollData.parentScrollTop;
            for (let r of ((this._previousScrollData.parentScrollTop = s), t)) {
                if (!r.isIntersecting) {
                    (this._activeTarget = null), this._clearActiveClass(e(r));
                    continue;
                }
                let o = r.target.offsetTop >= this._previousScrollData.visibleEntryTop;
                if (n && o) {
                    if ((i(r), !s)) return;
                    continue;
                }
                n || o || i(r);
            }
        }
        _initializeTargetsAndObservables() {
            (this._targetLinks = new Map()), (this._observableSections = new Map());
            let t = X.find(i$, this._config.target);
            for (let e of t) {
                if (!e.hash || g(e)) continue;
                let i = X.findOne(decodeURI(e.hash), this._element);
                d(i) && (this._targetLinks.set(decodeURI(e.hash), e), this._observableSections.set(e.hash, i));
            }
        }
        _process(t) {
            this._activeTarget !== t && (this._clearActiveClass(this._config.target), (this._activeTarget = t), t.classList.add(ik), this._activateParents(t), H.trigger(this._element, iE, { relatedTarget: t }));
        }
        _activateParents(t) {
            if (t.classList.contains('dropdown-item')) {
                X.findOne('.dropdown-toggle', t.closest('.dropdown')).classList.add(ik);
                return;
            }
            for (let e of X.parents(t, '.nav, .list-group')) for (let i of X.prev(e, iL)) i.classList.add(ik);
        }
        _clearActiveClass(t) {
            t.classList.remove(ik);
            let e = X.find(`${i$}.${ik}`, t);
            for (let i of e) i.classList.remove(ik);
        }
        static jQueryInterface(t) {
            return this.each(function () {
                let e = iD.getOrCreateInstance(this, t);
                if ('string' == typeof t) {
                    if (void 0 === e[t] || t.startsWith('_') || 'constructor' === t) throw TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    H.on(window, iT, () => {
        for (let t of X.find('[data-bs-spy="scroll"]')) iD.getOrCreateInstance(t);
    }),
        A(iD);
    let iO = '.bs.tab',
        iN = `hide${iO}`,
        iP = `hidden${iO}`,
        ix = `show${iO}`,
        i_ = `shown${iO}`,
        iM = `click${iO}`,
        iF = `keydown${iO}`,
        ij = `load${iO}`,
        iz = 'ArrowRight',
        iH = 'ArrowDown',
        iq = 'Home',
        iW = 'active',
        iB = 'fade',
        iK = 'show',
        iR = '.dropdown-toggle',
        iV = `:not(${iR})`,
        iQ = `.nav-link${iV}, .list-group-item${iV}, [role="tab"]${iV}`,
        iX = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
        iY = `${iQ}, ${iX}`,
        iU = `.${iW}[data-bs-toggle="tab"], .${iW}[data-bs-toggle="pill"], .${iW}[data-bs-toggle="list"]`;
    class i3 extends V {
        constructor(t) {
            if ((super(t), (this._parent = this._element.closest('.list-group, .nav, [role="tablist"]')), !this._parent)) return;
            this._setInitialAttributes(this._parent, this._getChildren()), H.on(this._element, iF, (t) => this._keydown(t));
        }
        static get NAME() {
            return 'tab';
        }
        show() {
            let t = this._element;
            if (this._elemIsActive(t)) return;
            let e = this._getActiveElem(),
                i = e ? H.trigger(e, iN, { relatedTarget: t }) : null,
                s = H.trigger(t, ix, { relatedTarget: e });
            !s.defaultPrevented && (!i || !i.defaultPrevented) && (this._deactivate(e, t), this._activate(t, e));
        }
        _activate(t, e) {
            if (!t) return;
            t.classList.add(iW), this._activate(X.getElementFromSelector(t));
            let i = () => {
                if ('tab' !== t.getAttribute('role')) {
                    t.classList.add(iK);
                    return;
                }
                t.removeAttribute('tabindex'), t.setAttribute('aria-selected', !0), this._toggleDropDown(t, !0), H.trigger(t, i_, { relatedTarget: e });
            };
            this._queueCallback(i, t, t.classList.contains(iB));
        }
        _deactivate(t, e) {
            if (!t) return;
            t.classList.remove(iW), t.blur(), this._deactivate(X.getElementFromSelector(t));
            let i = () => {
                if ('tab' !== t.getAttribute('role')) {
                    t.classList.remove(iK);
                    return;
                }
                t.setAttribute('aria-selected', !1), t.setAttribute('tabindex', '-1'), this._toggleDropDown(t, !1), H.trigger(t, iP, { relatedTarget: e });
            };
            this._queueCallback(i, t, t.classList.contains(iB));
        }
        _keydown(t) {
            if (!['ArrowLeft', iz, 'ArrowUp', iH, iq, 'End'].includes(t.key)) return;
            t.stopPropagation(), t.preventDefault();
            let e = this._getChildren().filter((t) => !g(t)),
                i;
            if ([iq, 'End'].includes(t.key)) i = e[t.key === iq ? 0 : e.length - 1];
            else {
                let s = [iz, iH].includes(t.key);
                i = T(e, t.target, s, !0);
            }
            i && (i.focus({ preventScroll: !0 }), i3.getOrCreateInstance(i).show());
        }
        _getChildren() {
            return X.find(iY, this._parent);
        }
        _getActiveElem() {
            return this._getChildren().find((t) => this._elemIsActive(t)) || null;
        }
        _setInitialAttributes(t, e) {
            for (let i of (this._setAttributeIfNotExists(t, 'role', 'tablist'), e)) this._setInitialAttributesOnChild(i);
        }
        _setInitialAttributesOnChild(t) {
            t = this._getInnerElement(t);
            let e = this._elemIsActive(t),
                i = this._getOuterElement(t);
            t.setAttribute('aria-selected', e), i !== t && this._setAttributeIfNotExists(i, 'role', 'presentation'), e || t.setAttribute('tabindex', '-1'), this._setAttributeIfNotExists(t, 'role', 'tab'), this._setInitialAttributesOnTargetPanel(t);
        }
        _setInitialAttributesOnTargetPanel(t) {
            let e = X.getElementFromSelector(t);
            e && (this._setAttributeIfNotExists(e, 'role', 'tabpanel'), t.id && this._setAttributeIfNotExists(e, 'aria-labelledby', `${t.id}`));
        }
        _toggleDropDown(t, e) {
            let i = this._getOuterElement(t);
            if (!i.classList.contains('dropdown')) return;
            let s = (t, s) => {
                let n = X.findOne(t, i);
                n && n.classList.toggle(s, e);
            };
            s(iR, iW), s('.dropdown-menu', iK), i.setAttribute('aria-expanded', e);
        }
        _setAttributeIfNotExists(t, e, i) {
            t.hasAttribute(e) || t.setAttribute(e, i);
        }
        _elemIsActive(t) {
            return t.classList.contains(iW);
        }
        _getInnerElement(t) {
            return t.matches(iY) ? t : X.findOne(iY, t);
        }
        _getOuterElement(t) {
            return t.closest('.nav-item, .list-group-item') || t;
        }
        static jQueryInterface(t) {
            return this.each(function () {
                let e = i3.getOrCreateInstance(this);
                if ('string' == typeof t) {
                    if (void 0 === e[t] || t.startsWith('_') || 'constructor' === t) throw TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    H.on(document, iM, iX, function (t) {
        ['A', 'AREA'].includes(this.tagName) && t.preventDefault(), !g(this) && i3.getOrCreateInstance(this).show();
    }),
        H.on(window, ij, () => {
            for (let t of X.find(iU)) i3.getOrCreateInstance(t);
        }),
        A(i3);
    let i1 = '.bs.toast',
        i0 = `mouseover${i1}`,
        i2 = `mouseout${i1}`,
        i4 = `focusin${i1}`,
        iG = `focusout${i1}`,
        iZ = `hide${i1}`,
        i6 = `hidden${i1}`,
        i7 = `show${i1}`,
        iJ = `shown${i1}`,
        i5 = 'hide',
        st = 'show',
        se = 'showing',
        si = { animation: 'boolean', autohide: 'boolean', delay: 'number' },
        ss = { animation: !0, autohide: !0, delay: 5e3 };
    class sn extends V {
        constructor(t, e) {
            super(t, e), (this._timeout = null), (this._hasMouseInteraction = !1), (this._hasKeyboardInteraction = !1), this._setListeners();
        }
        static get Default() {
            return ss;
        }
        static get DefaultType() {
            return si;
        }
        static get NAME() {
            return 'toast';
        }
        show() {
            let t = H.trigger(this._element, i7);
            if (t.defaultPrevented) return;
            this._clearTimeout(), this._config.animation && this._element.classList.add('fade');
            let e = () => {
                this._element.classList.remove(se), H.trigger(this._element, iJ), this._maybeScheduleHide();
            };
            this._element.classList.remove(i5), m(this._element), this._element.classList.add(st, se), this._queueCallback(e, this._element, this._config.animation);
        }
        hide() {
            if (!this.isShown()) return;
            let t = H.trigger(this._element, iZ);
            if (t.defaultPrevented) return;
            let e = () => {
                this._element.classList.add(i5), this._element.classList.remove(se, st), H.trigger(this._element, i6);
            };
            this._element.classList.add(se), this._queueCallback(e, this._element, this._config.animation);
        }
        dispose() {
            this._clearTimeout(), this.isShown() && this._element.classList.remove(st), super.dispose();
        }
        isShown() {
            return this._element.classList.contains(st);
        }
        _maybeScheduleHide() {
            this._config.autohide &&
                !this._hasMouseInteraction &&
                !this._hasKeyboardInteraction &&
                (this._timeout = setTimeout(() => {
                    this.hide();
                }, this._config.delay));
        }
        _onInteraction(t, e) {
            switch (t.type) {
                case 'mouseover':
                case 'mouseout':
                    this._hasMouseInteraction = e;
                    break;
                case 'focusin':
                case 'focusout':
                    this._hasKeyboardInteraction = e;
            }
            if (e) {
                this._clearTimeout();
                return;
            }
            let i = t.relatedTarget;
            !(this._element === i || this._element.contains(i)) && this._maybeScheduleHide();
        }
        _setListeners() {
            H.on(this._element, i0, (t) => this._onInteraction(t, !0)), H.on(this._element, i2, (t) => this._onInteraction(t, !1)), H.on(this._element, i4, (t) => this._onInteraction(t, !0)), H.on(this._element, iG, (t) => this._onInteraction(t, !1));
        }
        _clearTimeout() {
            clearTimeout(this._timeout), (this._timeout = null);
        }
        static jQueryInterface(t) {
            return this.each(function () {
                let e = sn.getOrCreateInstance(this, t);
                if ('string' == typeof t) {
                    if (void 0 === e[t]) throw TypeError(`No method named "${t}"`);
                    e[t](this);
                }
            });
        }
    }
    return Y(sn), A(sn), { Alert: J, Button: ti, Carousel: tN, Collapse: tV, Dropdown: ea, Modal: eq, Offcanvas: e7, Popover: iw, ScrollSpy: iD, Tab: i3, Toast: sn, Tooltip: ib };
});
