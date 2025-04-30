const y = ({ startTag: l, endTag: u, startToken: k, endToken: p, isClosed: c = !0, hasChildren: d = !1, meta: t = null }) => (e, o, s, b) => {
  const f = e.bMarks[o] + e.tShift[o];
  if (!e.src.startsWith(l, f))
    return !1;
  if (l === u) {
    const v = f + l.length, E = e.eMarks[o], W = e.src.slice(v, E), R = W.indexOf(u);
    if (R >= 0) {
      const w = v + R, S = e.src.slice(v, w);
      if (b) return !0;
      let n = e.push(k, "div", 1);
      return n.meta || (n.meta = {}), t && (n.meta = {
        ...n.meta,
        ...t
      }), n.markup = l, n.block = !0, d ? e.md.inline.parse(S, e.md, e.env, e.tokens) : n.content = S, n = e.push(p, "div", -1), n.markup = u, n.block = !0, n.meta || (n.meta = {}), n.meta.isClose = !0, e.line = o + 1, !0;
    }
    let h = o + 1, M = !1, P = W + `
`;
    for (; h < s; ) {
      const w = e.bMarks[h] + e.tShift[h], S = e.eMarks[h], n = e.src.slice(w, S), j = n.indexOf(u);
      if (j >= 0)
        if (n.slice(0, j).trim() === "") {
          M = !0;
          break;
        } else
          P += n + `
`;
      else
        P += n + `
`;
      h++;
    }
    if (c && !M)
      return !1;
    if (b) return !0;
    let B = P, i = e.push(k, "div", 1);
    return i.meta || (i.meta = {}), t && (i.meta = {
      ...i.meta,
      ...t
    }), i.markup = l, i.block = !0, d ? e.md.inline.parse(B.trim(), e.md, e.env, e.tokens) : i.content = B.trim(), i = e.push(p, "div", -1), i.markup = u, i.block = !0, i.meta || (i.meta = {}), i.meta.isClose = M, e.line = M ? h + 1 : s, !0;
  }
  let m = o, C = -1, I = !1;
  for (; m < s; ) {
    const E = e.getLines(m, m + 1, e.tShift[m], !1).indexOf(u);
    if (E >= 0) {
      C = e.bMarks[m] + e.tShift[m] + E, I = !0;
      break;
    }
    m++;
  }
  if (c && C === -1)
    return !1;
  if (b) return !0;
  let r = e.push(k, "div", 1);
  r.meta || (r.meta = {}), t && (r.meta = {
    ...r.meta,
    ...t
  }), r.markup = l, r.block = !0;
  let x = "", O = !1;
  return I ? (x = e.src.slice(f + l.length, C).trim(), O = !0) : x = e.src.slice(f + l.length).trim(), d ? e.md.inline.parse(x, e.md, e.env, e.tokens) : r.content = x, r = e.push(p, "div", -1), r.markup = u, r.block = !0, r.meta || (r.meta = {}), r.meta.isClose = O, e.line = I ? m + 1 : s, !0;
}, z = ({ startTag: l, endTag: u, startToken: k, meta: p }) => (c, d) => {
  const t = c.pos, e = c.posMax;
  if (!c.src.startsWith(l, t))
    return !1;
  let o = t + l.length, s = !1;
  for (; o <= e - u.length; ) {
    if (c.src.startsWith(u, o)) {
      s = !0;
      break;
    }
    o++;
  }
  if (!s) return !1;
  const b = c.src.slice(t + l.length, o).trim();
  if (!d) {
    const f = c.push(k, "", 0);
    f.meta || (f.meta = {}), p && (f.meta = {
      ...f.meta,
      ...p
    }), f.content = b, f.markup = k;
  }
  return c.pos = o + u.length, !0;
};
export {
  z as a,
  y as g
};
