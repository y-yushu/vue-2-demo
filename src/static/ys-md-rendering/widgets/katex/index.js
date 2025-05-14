import { g as n, a } from "../../assets/getRule-BxmANlZK.js";
import { WidgetKatex as o } from "./render.js";
const t = {
  name: "katex",
  version: "0.0.1",
  logotype: "katex_open",
  // 渲染规则
  rule: (e) => {
    const r = n({
      startTag: "$$",
      endTag: "$$",
      startToken: t.logotype,
      endToken: "katex_close",
      meta: {
        isline: !1
        // 块解析
      }
    });
    e.block.ruler.before("fence", "latex_1", r), e.inline.ruler.before(
      "escape",
      "latex_2",
      a({
        startTag: "$",
        endTag: "$",
        startToken: t.logotype,
        meta: { isline: !0 }
      })
    ), e.inline.ruler.before(
      "escape",
      "latex_3",
      a({
        startTag: "\\(",
        endTag: "\\)",
        startToken: t.logotype,
        meta: { isline: !0 }
      })
    ), e.inline.ruler.before(
      "escape",
      "latex_4",
      a({
        startTag: "\\[",
        endTag: "\\]",
        startToken: t.logotype,
        meta: { isline: !1 }
      })
    );
  },
  // 渲染函数
  render: (e) => new o(e)
};
export {
  t as default
};
