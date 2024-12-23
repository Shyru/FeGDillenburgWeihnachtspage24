'use strict';
var T = "function" == typeof Object.defineProperties ? Object.defineProperty : function(f, g, e) {
        if (f == Array.prototype || f == Object.prototype)
            return f;
        f[g] = e.value;
        return f
    }
;
function U(f) {
    f = ["object" == typeof globalThis && globalThis, f, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var g = 0; g < f.length; ++g) {
        var e = f[g];
        if (e && e.Math == Math)
            return e
    }
    throw Error("Cannot find global object");
}
var V = U(this);
function W(f, g) {
    if (g)
        a: {
            var e = V;
            f = f.split(".");
            for (var h = 0; h < f.length - 1; h++) {
                var p = f[h];
                if (!(p in e))
                    break a;
                e = e[p]
            }
            f = f[f.length - 1];
            h = e[f];
            g = g(h);
            g != h && null != g && T(e, f, {
                configurable: !0,
                writable: !0,
                value: g
            })
        }
}
W("Array.prototype.includes", function(f) {
    return f ? f : function(g, e) {
        var h = this;
        h instanceof String && (h = String(h));
        var p = h.length;
        e = e || 0;
        for (0 > e && (e = Math.max(e + p, 0)); e < p; e++) {
            var m = h[e];
            if (m === g || Object.is(m, g))
                return !0
        }
        return !1
    }
});
(function() {
        function f() {
            if (window.location.hash && window.location.hash.includes("-")) {
                const a = window.location.hash.substring(1).split("-")[1]
                    , b = document.getElementsByClassName(r);
                for (let c = 0; c < b.length; c++) {
                    const d = b[c];
                    if (a === d.getAttribute("data-comment-id")) {
                        d.scrollIntoView();
                        break
                    }
                }
            }
        }
        function g() {
            const a = q[v];
            return a ? a : {}
        }
        function e(a, b) {
            return (a = document.getElementById("welcomments__script").getAttribute(a)) && 0 !== a.length ? a : b
        }
        function h(a) {
            const b = a.getAttribute("data-author-name")
                , c = a.getElementsByClassName(x)[0];
            c && (c.setAttribute("data-original-inner-text", c.innerText),
                    c.onclick = d => {
                        d.preventDefault();
                        "true" !== c.getAttribute("data-is-replying") ? (p(),
                            c.setAttribute("data-is-replying", "true"),
                            c.innerText = "Abbrechen",
                            t.placeholder = "Schreibe Deine Antwort an " + b,
                            y.value = a.getAttribute("data-comment-id"),
                            a.appendChild(n)) : p()
                    }
            )
        }
        function p() {
            y.value = "";
            t.placeholder = N;
            O.appendChild(n);
            const a = document.getElementsByClassName(x);
            for (let b = 0; b < a.length; b++) {
                const c = a[b];
                "true" === c.getAttribute("data-is-replying") && (c.setAttribute("data-is-replying", "false"),
                    c.innerText = c.getAttribute("data-original-inner-text").trim())
            }
        }
        function m(a) {
            const b = n.querySelector('[name="' + a + '"]');
            if (!b)
                throw Error(`A required form input with name "${a}" is missing.`);
            return b
        }
        function P(a, b) {
            if (!a)
                throw Error(`No element with id ${b} found.`);
        }
        function X(a) {
            a.preventDefault();
            B(!0);
            const b = new XMLHttpRequest;
            b.onreadystatechange = function() {
                if (4 === b.readyState)
                    try {
                        const d = JSON.parse(b.responseText);
                        if (200 <= b.status && 300 > b.status && "ok" === d.status) {
                            p();
                            y.value = "";
                            C.value = "";
                            D.value = "";
                            z && (z.value = "");
                            t.value = "";
                            w.value = "";
                            B(!1);
                            var c = d.comment;
                            q[v] = g();
                            q[v][c.id] = c;
                            window.localStorage["io.welcomments.pending_comments"] = JSON.stringify(q);
                            G(d.comment)
                        } else
                            console.log(d.message),
                                B(!1)
                    } catch (d) {
                        throw B(!1),
                            d;
                    }
            }
            ;
            a = {
                "website-id": H.value,
                permalink: Q.value,
                "page-slug": E.value,
                "replying-to": y.value,
                "author-name": C.value,
                "author-url": D.value,
                message: t.value
            };
            z && (a["author-email"] = z.value);
            b.open("POST", n.action);
            b.setRequestHeader("Content-Type", "application/json");
            b.setRequestHeader("Accept", "application/json");
            b.send(JSON.stringify(a))
        }
        function G(a) {
            var b = a.replying_to, c;
            let d, k = 0;
            const u = document.getElementsByClassName(r);
            for (var l = 0; l < u.length; l++)
                if (a.id === u[l].getAttribute("data-comment-id"))
                    return;
            if (b && 0 < b.trim().length)
                for (let I = 0; I < u.length; I++)
                    if (l = u[I],
                    b === l.getAttribute("data-comment-id")) {
                        k = (c = l.getAttribute("data-nesting-level")) ? parseInt(c) + 1 : 1;
                        d = l.parentNode;
                        c = l;
                        break
                    }
            b = document.createElement("div");
            b.innerHTML = A.placeholderCommentFactory({
                id: a.id,
                date: new Date(a.date),
                author: a.author,
                message: a.message
            });
            a = b.firstChild;
            h(a);
            c ? (d.insertBefore(a, c.nextSibling),
                a.setAttribute("data-nesting-level", `${k}`),
                a.className = `${a.className} welcomments__nesting-level-${k}`) : F.append(a);
            if (a = document.getElementById(e("data-comment-count-title-id", "welcomments__comment-count-title")))
                a.innerText = A.commentCountTitleFactory(document.getElementsByClassName(r).length)
        }
        function B(a) {
            C.disabled = a;
            D.disabled = a;
            t.disabled = a;
            w.disabled = a;
            w.innerText = a ? "Warte..." : R
        }
        function Y() {
            const a = F.getElementsByClassName(r);
            if (a && 0 < a.length) {
                var b = [];
                for (let d = 0; d < a.length; d++)
                    b.push(a[d].getAttribute("data-comment-id"));
                b.sort();
                b = b[b.length - 1]
            }
            const c = new XMLHttpRequest;
            c.onreadystatechange = function() {
                if (4 === c.readyState)
                    try {
                        var d = JSON.parse(c.responseText);
                        if (200 <= c.status && 300 > c.status && "ok" === d.status) {
                            const k = d.comments;
                            if (k)
                                for (d = 0; d < k.length; d++)
                                    G(k[d]);
                            f()
                        }
                    } catch (k) {
                        console.error(k)
                    }
            }
            ;
            c.open("POST", `${J}/websites/${H.value}/pages/${E.value}/pending-comments`);
            c.setRequestHeader("Content-Type", "application/json");
            c.setRequestHeader("Accept", "application/json");
            c.send(JSON.stringify({
                most_recent_comment_id: b
            }))
        }
        function Z(a) {
            const b = new XMLHttpRequest;
            b.onreadystatechange = function() {
                if (4 === b.readyState)
                    try {
                        const c = JSON.parse(b.responseText);
                        if (200 <= b.status && 300 > b.status) {
                            const d = c.likes;
                            d && (a.setAttribute("data-count", d),
                                a.innerHTML = `+${d}`)
                        }
                    } catch (c) {
                        console.error(c)
                    }
            }
            ;
            b.open("GET", `${J}/likes?url=${window.location.href}`);
            b.setRequestHeader("Content-Type", "application/json");
            b.setRequestHeader("Accept", "application/json");
            b.send()
        }
        function aa(a, b, c) {
            const d = new XMLHttpRequest;
            d.onreadystatechange = function() {
                4 === d.readyState && 200 > d.status && 300 <= d.status && (a.setAttribute("data-count", b),
                    a.innerHTML = `+${b}`)
            }
            ;
            d.open("POST", `${J}/likes`);
            d.setRequestHeader("Content-Type", "application/json");
            d.setRequestHeader("Accept", "application/json");
            d.send(JSON.stringify({
                url: window.location.href,
                count: c
            }))
        }
        function ba() {
            const a = document.getElementById("welcomments__like-button");
            if (a) {
                Z(a);
                var b, c, d;
                const k = function() {
                    c = parseInt(a.getAttribute("data-count"));
                    d = 0;
                    b = window.setInterval(function() {
                        d++;
                        const l = c + d;
                        a.innerHTML = `+${l}`;
                        a.setAttribute("data-count", l)
                    }, 50)
                }
                    , u = function() {
                    aa(a, c, d);
                    window.clearInterval(b);
                    b = null;
                    d = c = 0
                };
                a.addEventListener("mousedown", k);
                a.addEventListener("mouseup", u);
                a.addEventListener("touchstart", k);
                a.addEventListener("touchend", u)
            }
        }
        const A = window.welcomments
            , J = A && A.apiUrl ? A.apiUrl : "https://welcomments.io/api";
        let v, q, S, K, L, r, x, M, n, O, N, F, H, Q, E, y, C, D, z, t, w, R;
        window.addEventListener("DOMContentLoaded", () => {
                S = e("data-comment-element-id-prefix", "welcomments__comment");
                e("data-welcomments-container-id", "welcomments__container");
                K = e("data-comment-container-id", "welcomments__comment-container");
                L = e("data-comment-form-id", "welcomments__form");
                r = e("data-comment-element-classname", "welcomments__comment");
                x = e("data-comment-reply-link-classname", "welcomments__comment-reply-link");
                M = e("data-submit-button-id", "welcomments__submit-button");
                n = document.getElementById(L);
                F = document.getElementById(K);
                w = document.getElementById(M);
                H = m("website-id");
                Q = m("permalink");
                E = m("page-slug");
                y = m("replying-to");
                C = m("author-name");
                D = m("author-url");
                z = n.querySelector('[name="author-email"]');
                t = m("message");
                if (!n || "FORM" !== n.nodeName.toUpperCase())
                    throw Error(`No <form> element with id ${L} found.`);
                P(F, K);
                P(w, M);
                if (0 < document.getElementsByClassName(r).length && 0 === document.getElementsByClassName(x).length)
                    throw Error(`The comment reply buttons must have the classname ${x}.`);
                v = E.value;
                O = n.parentNode;
                N = t.placeholder;
                R = w.innerText;
                n.addEventListener("submit", X);
                var a = window.localStorage["io.welcomments.pending_comments"];
                q = a ? JSON.parse(a) : {};
                a = g();
                var b = Object.keys(a ? a : {});
                if (a) {
                    for (let d = 0; d < b.length; d++) {
                        var c = b[d];
                        const k = a[c];
                        document.getElementById(`${S}-${c}`) ? (c = k,
                            q[v] = g(),
                            q[v][c.id] = void 0,
                            window.localStorage["io.welcomments.pending_comments"] = JSON.stringify(q)) : G(k)
                    }
                    0 < b.length && f()
                }
                Y();
                a = document.getElementsByClassName(r);
                for (b = 0; b < a.length; b++)
                    h(a[b]);
                ba()
            }
        )
    }
)();
