import { a3 as u, ab as v, a5 as f, a6 as h, a1 as o, a2 as p, aa as x } from "../../common-vendor-1T14HuIN.js";
import { k as g, a as c } from "./vendor-CXf97L3f.js";
var y = Object.defineProperty, m = Object.getOwnPropertyDescriptor, d = (r, n, e, a) => {
  for (var t = a > 1 ? void 0 : a ? m(n, e) : n, s = r.length - 1, i; s >= 0; s--)
    (i = r[s]) && (t = (a ? i(n, e, t) : i(t)) || t);
  return a && t && y(n, e, t), t;
};
let l = class extends h {
  constructor(r) {
    super(), this.token = r;
  }
  render() {
    var n;
    const r = this.token.node.content || "";
    if ((n = this.token.node.meta) != null && n.isline)
      try {
        const e = c.renderToString(r, {
          throwOnError: !1,
          displayMode: !1,
          strict: "ignore"
        });
        return o`<span>${p(e)}</span>`;
      } catch (e) {
        return console.error("KaTeX 渲染错误1:", e), o` <span class="katex-error">${r}</span> `;
      }
    else if (r.includes(`
`)) {
      const e = r.split(`
`).map((s) => s.trim()).filter((s) => s !== ""), a = /\\begin\{|\\end\{/.test(r);
      let t;
      a ? t = r.replace(/\n/g, " \\\\ ") : e.some((i) => i.includes("=")) ? t = `\\begin{aligned}
` + e.join(` \\\\
`) + `
\\end{aligned}` : t = e.join(" \\\\ ");
      try {
        const s = c.renderToString(t, {
          throwOnError: !1,
          displayMode: !0,
          strict: "ignore"
        });
        return o`<div>
            <span class="katex-display">${p(s)}</span>
          </div>`;
      } catch (s) {
        return console.error("KaTeX 渲染错误2:", s), o`<div>
            <div class="katex-error">
              <p>渲染错误</p>
              <pre>${r}</pre>
            </div>
          </div>`;
      }
    } else
      try {
        const e = c.renderToString(r, {
          throwOnError: !1,
          displayMode: !0,
          strict: "ignore"
        });
        return o`<div>
            <span class="katex-display">${p(e)}</span>
          </div>`;
      } catch (e) {
        return console.error("KaTeX 渲染错误3:", e), o`<div>
            <div class="katex-error">
              <pre>${r}</pre>
            </div>
          </div>`;
      }
  }
};
l.styles = [
  u(g),
  v`
      .katex-display {
        display: block;
        text-align: center;
      }
      .katex .tag {
        display: none !important;
      }
      .katex-error {
        color: red;
      }
    `
];
d([
  f({ type: Object })
], l.prototype, "token", 2);
l = d([
  x("widget-katex")
], l);
export {
  l as WidgetKatex
};
