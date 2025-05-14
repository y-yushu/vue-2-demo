import { g as n } from "../../assets/getRule-BxmANlZK.js";
import { WidgetEcharts as a } from "./render.js";
const r = /* @__PURE__ */ new Map(), l = {
  name: "echarts",
  version: "0.0.1",
  logotype: "echarts_open",
  // 渲染规则
  rule: (e) => {
    const t = "<echarts>", s = "</echarts>", o = l.logotype, c = n({
      startTag: t,
      endTag: s,
      startToken: o,
      endToken: "echarts_close",
      isClosed: !1
    });
    e.block.ruler.before("fence", "echarts", c);
  },
  // 渲染函数
  render: (e) => {
    const t = e.key;
    if (r.has(t)) {
      const o = r.get(t);
      return o && (o.token = e), o;
    }
    const s = new a(e);
    return r.set(t, s), s;
  }
};
export {
  l as default
};
