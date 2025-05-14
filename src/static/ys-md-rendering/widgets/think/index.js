import { g as n } from "../../assets/getRule-BxmANlZK.js";
import { WidgetThink as o } from "./render.js";
const t = {
  name: "thinking",
  version: "0.0.1",
  logotype: "thinking_open",
  // 渲染规则
  rule: (e) => {
    e.block.ruler.before(
      "fence",
      "thinking",
      n({
        startTag: "<thinking>",
        endTag: "</thinking>",
        startToken: t.logotype,
        endToken: "thinking_close",
        isClosed: !1
      })
    ), e.block.ruler.before(
      "fence",
      "thinking",
      n({
        startTag: "<think>",
        endTag: "</think>",
        startToken: t.logotype,
        endToken: "thinking_close",
        isClosed: !1
      })
    );
  },
  // 渲染函数
  render: (e) => new o(e)
};
export {
  t as default
};
