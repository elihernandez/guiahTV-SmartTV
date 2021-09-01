(function (self, undefined) {
    function Call(t, l) {
        var n = arguments.length > 2 ? arguments[2] : [];
        if (!1 === IsCallable(t))
            throw new TypeError(
                Object.prototype.toString.call(t) + "is not a function."
            );
        return t.apply(l, n);
    }
    function CreateMethodProperty(e, r, t) {
        var a = { value: t, writable: !0, enumerable: !1, configurable: !0 };
        Object.defineProperty(e, r, a);
    }
    function Get(n, t) {
        return n[t];
    }
    function HasOwnProperty(r, t) {
        return Object.prototype.hasOwnProperty.call(r, t);
    }
    function IsCallable(n) {
        return "function" == typeof n;
    }
    function RequireObjectCoercible(e) {
        if (null === e || e === undefined)
            throw TypeError(
                Object.prototype.toString.call(e) +
                    " is not coercible to Object."
            );
        return e;
    }
    function SameValueNonNumber(e, n) {
        return e === n;
    }
    function ToObject(e) {
        if (null === e || e === undefined) throw TypeError();
        return Object(e);
    }
    function GetV(t, e) {
        return ToObject(t)[e];
    }
    function GetMethod(e, n) {
        var r = GetV(e, n);
        if (null === r || r === undefined) return undefined;
        if (!1 === IsCallable(r))
            throw new TypeError("Method not callable: " + n);
        return r;
    }
    function Type(e) {
        switch (typeof e) {
            case "undefined":
                return "undefined";
            case "boolean":
                return "boolean";
            case "number":
                return "number";
            case "string":
                return "string";
            case "symbol":
                return "symbol";
            default:
                return null === e
                    ? "null"
                    : "Symbol" in self &&
                      (e instanceof self.Symbol ||
                          e.constructor === self.Symbol)
                    ? "symbol"
                    : "object";
        }
    }
    function OrdinaryToPrimitive(r, t) {
        if ("string" === t) var e = ["toString", "valueOf"];
        else e = ["valueOf", "toString"];
        for (var i = 0; i < e.length; ++i) {
            var n = e[i],
                a = Get(r, n);
            if (IsCallable(a)) {
                var o = Call(a, r);
                if ("object" !== Type(o)) return o;
            }
        }
        throw new TypeError("Cannot convert to primitive.");
    }
    function SameValueZero(n, e) {
        return (
            Type(n) === Type(e) &&
            ("number" === Type(n)
                ? !(!isNaN(n) || !isNaN(e)) ||
                  (1 / n === Infinity && 1 / e == -Infinity) ||
                  (1 / n == -Infinity && 1 / e === Infinity) ||
                  n === e
                : SameValueNonNumber(n, e))
        );
    }
    function ToInteger(n) {
        if ("symbol" === Type(n))
            throw new TypeError("Cannot convert a Symbol value to a number");
        var t = Number(n);
        return isNaN(t)
            ? 0
            : 1 / t === Infinity ||
              1 / t == -Infinity ||
              t === Infinity ||
              t === -Infinity
            ? t
            : (t < 0 ? -1 : 1) * Math.floor(Math.abs(t));
    }
    function ToLength(n) {
        var t = ToInteger(n);
        return t <= 0 ? 0 : Math.min(t, Math.pow(2, 53) - 1);
    }
    function ToPrimitive(e) {
        var t = arguments.length > 1 ? arguments[1] : undefined;
        if ("object" === Type(e)) {
            if (arguments.length < 2) var i = "default";
            else t === String ? (i = "string") : t === Number && (i = "number");
            var r =
                "function" == typeof self.Symbol &&
                "symbol" == typeof self.Symbol.toPrimitive
                    ? GetMethod(e, self.Symbol.toPrimitive)
                    : undefined;
            if (r !== undefined) {
                var n = Call(r, e, [i]);
                if ("object" !== Type(n)) return n;
                throw new TypeError(
                    "Cannot convert exotic object to primitive."
                );
            }
            return "default" === i && (i = "number"), OrdinaryToPrimitive(e, i);
        }
        return e;
    }
    function ToString(t) {
        switch (Type(t)) {
            case "symbol":
                throw new TypeError(
                    "Cannot convert a Symbol value to a string"
                );
            case "object":
                return ToString(ToPrimitive(t, String));
            default:
                return String(t);
        }
    }
    function ToPropertyKey(r) {
        var i = ToPrimitive(r, String);
        return "symbol" === Type(i) ? i : ToString(i);
    }
    function TrimString(e, u) {
        var r = RequireObjectCoercible(e),
            t = ToString(r),
            n =
                /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/
                    .source;
        if ("start" === u)
            var p = String.prototype.replace.call(
                t,
                new RegExp("^" + n, "g"),
                ""
            );
        else
            p =
                "end" === u
                    ? String.prototype.replace.call(
                          t,
                          new RegExp(n + "$", "g"),
                          ""
                      )
                    : String.prototype.replace.call(
                          t,
                          new RegExp("^" + n + "|" + n + "$", "g"),
                          ""
                      );
        return p;
    }
    if (!("includes" in Array.prototype)) {
        CreateMethodProperty(Array.prototype, "includes", function e(r) {
            "use strict";
            var t = ToObject(this),
                o = ToLength(Get(t, "length"));
            if (0 === o) return !1;
            var n = ToInteger(arguments[1]);
            if (n >= 0) var a = n;
            else (a = o + n) < 0 && (a = 0);
            for (; a < o; ) {
                var i = Get(t, ToString(a));
                if (SameValueZero(r, i)) return !0;
                a += 1;
            }
            return !1;
        });
    }
    if (
        !(
            "getOwnPropertyDescriptor" in Object &&
            "function" == typeof Object.getOwnPropertyDescriptor &&
            (function () {
                try {
                    return (
                        "3" === Object.getOwnPropertyDescriptor("13.7", 1).value
                    );
                } catch (t) {
                    return !1;
                }
            })()
        )
    ) {
        !(function () {
            var e = Object.getOwnPropertyDescriptor,
                t = function () {
                    try {
                        return (
                            1 ===
                            Object.defineProperty(
                                document.createElement("div"),
                                "one",
                                {
                                    get: function () {
                                        return 1;
                                    },
                                }
                            ).one
                        );
                    } catch (e) {
                        return !1;
                    }
                },
                r = {}.toString,
                n = "".split;
            CreateMethodProperty(
                Object,
                "getOwnPropertyDescriptor",
                function c(o, i) {
                    var a = ToObject(o);
                    a =
                        ("string" === Type(a) || a instanceof String) &&
                        "[object String]" == r.call(o)
                            ? n.call(o, "")
                            : Object(o);
                    var u = ToPropertyKey(i);
                    if (t)
                        try {
                            return e(a, u);
                        } catch (l) {}
                    if (HasOwnProperty(a, u))
                        return {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: a[u],
                        };
                }
            );
        })();
    }
    if (
        !(
            "keys" in Object &&
            (function () {
                return 2 === Object.keys(arguments).length;
            })(1, 2) &&
            (function () {
                try {
                    return Object.keys(""), !0;
                } catch (t) {
                    return !1;
                }
            })()
        )
    ) {
        CreateMethodProperty(
            Object,
            "keys",
            (function () {
                "use strict";
                function t() {
                    var t;
                    try {
                        t = Object.create({});
                    } catch (r) {
                        return !0;
                    }
                    return o.call(t, "__proto__");
                }
                function r(t) {
                    var r = n.call(t),
                        e = "[object Arguments]" === r;
                    return (
                        e ||
                            (e =
                                "[object Array]" !== r &&
                                null !== t &&
                                "object" == typeof t &&
                                "number" == typeof t.length &&
                                t.length >= 0 &&
                                "[object Function]" === n.call(t.callee)),
                        e
                    );
                }
                var e = Object.prototype.hasOwnProperty,
                    n = Object.prototype.toString,
                    o = Object.prototype.propertyIsEnumerable,
                    c = !o.call({ toString: null }, "toString"),
                    l = o.call(function () {}, "prototype"),
                    i = [
                        "toString",
                        "toLocaleString",
                        "valueOf",
                        "hasOwnProperty",
                        "isPrototypeOf",
                        "propertyIsEnumerable",
                        "constructor",
                    ],
                    u = function (t) {
                        var r = t.constructor;
                        return r && r.prototype === t;
                    },
                    a = {
                        $console: !0,
                        $external: !0,
                        $frame: !0,
                        $frameElement: !0,
                        $frames: !0,
                        $innerHeight: !0,
                        $innerWidth: !0,
                        $outerHeight: !0,
                        $outerWidth: !0,
                        $pageXOffset: !0,
                        $pageYOffset: !0,
                        $parent: !0,
                        $scrollLeft: !0,
                        $scrollTop: !0,
                        $scrollX: !0,
                        $scrollY: !0,
                        $self: !0,
                        $webkitIndexedDB: !0,
                        $webkitStorageInfo: !0,
                        $window: !0,
                    },
                    f = (function () {
                        if ("undefined" == typeof window) return !1;
                        for (var t in window)
                            try {
                                if (
                                    !a["$" + t] &&
                                    e.call(window, t) &&
                                    null !== window[t] &&
                                    "object" == typeof window[t]
                                )
                                    try {
                                        u(window[t]);
                                    } catch (r) {
                                        return !0;
                                    }
                            } catch (r) {
                                return !0;
                            }
                        return !1;
                    })(),
                    p = function (t) {
                        if ("undefined" == typeof window || !f) return u(t);
                        try {
                            return u(t);
                        } catch (r) {
                            return !1;
                        }
                    };
                return function s(o) {
                    var u = "[object Function]" === n.call(o),
                        a = r(o),
                        f = "[object String]" === n.call(o),
                        s = [];
                    if (o === undefined || null === o)
                        throw new TypeError(
                            "Cannot convert undefined or null to object"
                        );
                    var y = l && u;
                    if (f && o.length > 0 && !e.call(o, 0))
                        for (var h = 0; h < o.length; ++h) s.push(String(h));
                    if (a && o.length > 0)
                        for (var g = 0; g < o.length; ++g) s.push(String(g));
                    else
                        for (var w in o)
                            (t() && "__proto__" === w) ||
                                (y && "prototype" === w) ||
                                !e.call(o, w) ||
                                s.push(String(w));
                    if (c)
                        for (var d = p(o), $ = 0; $ < i.length; ++$)
                            (d && "constructor" === i[$]) ||
                                !e.call(o, i[$]) ||
                                s.push(i[$]);
                    return s;
                };
            })()
        );
    }
    if (
        !(
            "getOwnPropertyNames" in Object &&
            (function () {
                try {
                    return Object.getOwnPropertyNames(1), !0;
                } catch (t) {
                    return !1;
                }
            })()
        )
    ) {
        !(function () {
            var t = {}.toString,
                e = "".split,
                r = [].concat,
                o = Object.prototype.hasOwnProperty,
                c = Object.getOwnPropertyNames || Object.keys,
                n = "object" == typeof self ? c(self) : [];
            CreateMethodProperty(Object, "getOwnPropertyNames", function l(a) {
                var p = ToObject(a);
                if ("[object Window]" === t.call(p))
                    try {
                        return c(p);
                    } catch (j) {
                        return r.call([], n);
                    }
                p = "[object String]" == t.call(p) ? e.call(p, "") : Object(p);
                for (
                    var i = c(p), s = ["length", "prototype"], O = 0;
                    O < s.length;
                    O++
                ) {
                    var b = s[O];
                    o.call(p, b) && !i.includes(b) && i.push(b);
                }
                if (i.includes("__proto__")) {
                    var f = i.indexOf("__proto__");
                    i.splice(f, 1);
                }
                return i;
            });
        })();
    }
    if (
        !(
            "trim" in String.prototype &&
            (function () {
                var r = "​᠎";
                return (
                    !"\t\n\x0B\f\r                　\u2028\u2029\ufeff".trim() &&
                    r.trim() === r
                );
            })()
        )
    ) {
        CreateMethodProperty(String.prototype, "trim", function t() {
            "use strict";
            var t = this;
            return TrimString(t, "start+end");
        });
    }
})(
    ("object" === typeof window && window) ||
        ("object" === typeof self && self) ||
        ("object" === typeof global && global) ||
        {}
);
