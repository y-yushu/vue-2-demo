import { a1 as s, H as d, a2 as c, a3 as w, a4 as f, a5 as u, a6 as y, a7 as b, a8 as v, a9 as x, aa as k } from "./common-vendor-1T14HuIN.js";
import { h as $, n as z } from "./assets/vendor-CFP7JyYv.js";
const g = {}, _ = async (e, t) => {
  var o;
  const r = "m-0 p-0 rounded-t-none";
  if (g[e])
    return s`<pre class="${r}"><code class="language-${e}">${t}</code></pre>`;
  if (d.getLanguage(e)) {
    const n = (o = d.highlight(t, { language: e })) == null ? void 0 : o.value;
    return s` <pre class="${r}"><code class="hljs language-${e}" style="background-color: var(--tw-prose-pre-bg);">${c(
      n
    )}</code></pre>`;
  }
  try {
    const n = A[e];
    if (!n) return s`<pre class="${r}"><code class="language-${e}">${t}</code></pre>`;
    const a = await n();
    d.registerLanguage(e, a.default);
    const i = d.highlight(t, { language: e }).value;
    return s`<pre class="${r}"><code class="hljs language-${e}" style="background-color: var(--tw-prose-pre-bg);">${c(
      i
    )}</code></pre>`;
  } catch (n) {
    return console.error(`[hljs加载异常]
`, n), g[e] = !0, s`<pre class="${r}"><code class="language-${e}">${t}</code></pre>`;
  }
}, A = {
  "1c": () => import("./common-vendor-1T14HuIN.js").then((e) => e.ad),
  abnf: () => import("./common-vendor-1T14HuIN.js").then((e) => e.ae),
  accesslog: () => import("./common-vendor-1T14HuIN.js").then((e) => e.af),
  actionscript: () => import("./common-vendor-1T14HuIN.js").then((e) => e.ag),
  ada: () => import("./common-vendor-1T14HuIN.js").then((e) => e.ah),
  angelscript: () => import("./common-vendor-1T14HuIN.js").then((e) => e.ai),
  apache: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aj),
  applescript: () => import("./common-vendor-1T14HuIN.js").then((e) => e.ak),
  arcade: () => import("./common-vendor-1T14HuIN.js").then((e) => e.al),
  arduino: () => import("./common-vendor-1T14HuIN.js").then((e) => e.am),
  armasm: () => import("./common-vendor-1T14HuIN.js").then((e) => e.an),
  asciidoc: () => import("./common-vendor-1T14HuIN.js").then((e) => e.ao),
  aspectj: () => import("./common-vendor-1T14HuIN.js").then((e) => e.ap),
  autohotkey: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aq),
  autoit: () => import("./common-vendor-1T14HuIN.js").then((e) => e.ar),
  avrasm: () => import("./common-vendor-1T14HuIN.js").then((e) => e.as),
  awk: () => import("./common-vendor-1T14HuIN.js").then((e) => e.at),
  axapta: () => import("./common-vendor-1T14HuIN.js").then((e) => e.au),
  bash: () => import("./common-vendor-1T14HuIN.js").then((e) => e.av),
  basic: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aw),
  bnf: () => import("./common-vendor-1T14HuIN.js").then((e) => e.ax),
  brainfuck: () => import("./common-vendor-1T14HuIN.js").then((e) => e.ay),
  c: () => import("./common-vendor-1T14HuIN.js").then((e) => e.az),
  cal: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aA),
  capnproto: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aB),
  ceylon: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aC),
  clean: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aD),
  clojure: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aE),
  "clojure-repl": () => import("./common-vendor-1T14HuIN.js").then((e) => e.aF),
  cmake: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aG),
  coffeescript: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aH),
  coq: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aI),
  cos: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aJ),
  cpp: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aK),
  crmsh: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aL),
  crystal: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aM),
  csharp: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aN),
  csp: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aO),
  css: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aP),
  d: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aQ),
  dart: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aR),
  delphi: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aS),
  diff: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aT),
  django: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aU),
  dns: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aV),
  dockerfile: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aW),
  dos: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aX),
  dsconfig: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aY),
  dts: () => import("./common-vendor-1T14HuIN.js").then((e) => e.aZ),
  dust: () => import("./common-vendor-1T14HuIN.js").then((e) => e.a_),
  ebnf: () => import("./common-vendor-1T14HuIN.js").then((e) => e.a$),
  elixir: () => import("./common-vendor-1T14HuIN.js").then((e) => e.b0),
  elm: () => import("./common-vendor-1T14HuIN.js").then((e) => e.b1),
  erb: () => import("./common-vendor-1T14HuIN.js").then((e) => e.b2),
  erlang: () => import("./common-vendor-1T14HuIN.js").then((e) => e.b3),
  "erlang-repl": () => import("./common-vendor-1T14HuIN.js").then((e) => e.b4),
  excel: () => import("./common-vendor-1T14HuIN.js").then((e) => e.b5),
  fix: () => import("./common-vendor-1T14HuIN.js").then((e) => e.b6),
  flix: () => import("./common-vendor-1T14HuIN.js").then((e) => e.b7),
  fortran: () => import("./common-vendor-1T14HuIN.js").then((e) => e.b8),
  fsharp: () => import("./common-vendor-1T14HuIN.js").then((e) => e.b9),
  gams: () => import("./common-vendor-1T14HuIN.js").then((e) => e.ba),
  gauss: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bb),
  gcode: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bc),
  gherkin: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bd),
  glsl: () => import("./common-vendor-1T14HuIN.js").then((e) => e.be),
  gml: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bf),
  go: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bg),
  golo: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bh),
  gradle: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bi),
  groovy: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bj),
  haml: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bk),
  handlebars: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bl),
  haskell: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bm),
  haxe: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bn),
  hsp: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bo),
  // htmlbars: () => import('highlight.js/lib/languages/htmlbars'),
  http: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bp),
  hy: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bq),
  inform7: () => import("./common-vendor-1T14HuIN.js").then((e) => e.br),
  ini: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bs),
  irpf90: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bt),
  java: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bu),
  javascript: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bv),
  "jboss-cli": () => import("./common-vendor-1T14HuIN.js").then((e) => e.bw),
  json: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bx),
  julia: () => import("./common-vendor-1T14HuIN.js").then((e) => e.by),
  "julia-repl": () => import("./common-vendor-1T14HuIN.js").then((e) => e.bz),
  kotlin: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bA),
  lasso: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bB),
  latex: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bC),
  ldif: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bD),
  leaf: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bE),
  less: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bF),
  lisp: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bG),
  livecodeserver: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bH),
  livescript: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bI),
  llvm: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bJ),
  lsl: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bK),
  lua: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bL),
  makefile: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bM),
  markdown: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bN),
  mathematica: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bO),
  matlab: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bP),
  maxima: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bQ),
  mel: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bR),
  mercury: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bS),
  mipsasm: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bT),
  mizar: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bU),
  mojolicious: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bV),
  monkey: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bW),
  moonscript: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bX),
  n1ql: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bY),
  nginx: () => import("./common-vendor-1T14HuIN.js").then((e) => e.bZ),
  nim: () => import("./common-vendor-1T14HuIN.js").then((e) => e.b_),
  nix: () => import("./common-vendor-1T14HuIN.js").then((e) => e.b$),
  nsis: () => import("./common-vendor-1T14HuIN.js").then((e) => e.c0),
  objectivec: () => import("./common-vendor-1T14HuIN.js").then((e) => e.c1),
  ocaml: () => import("./common-vendor-1T14HuIN.js").then((e) => e.c2),
  openscad: () => import("./common-vendor-1T14HuIN.js").then((e) => e.c3),
  oxygene: () => import("./common-vendor-1T14HuIN.js").then((e) => e.c4),
  parser3: () => import("./common-vendor-1T14HuIN.js").then((e) => e.c5),
  perl: () => import("./common-vendor-1T14HuIN.js").then((e) => e.c6),
  pf: () => import("./common-vendor-1T14HuIN.js").then((e) => e.c7),
  pgsql: () => import("./common-vendor-1T14HuIN.js").then((e) => e.c8),
  php: () => import("./common-vendor-1T14HuIN.js").then((e) => e.c9),
  plaintext: () => import("./common-vendor-1T14HuIN.js").then((e) => e.ca),
  pony: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cb),
  powershell: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cc),
  processing: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cd),
  profile: () => import("./common-vendor-1T14HuIN.js").then((e) => e.ce),
  prolog: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cf),
  properties: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cg),
  protobuf: () => import("./common-vendor-1T14HuIN.js").then((e) => e.ch),
  puppet: () => import("./common-vendor-1T14HuIN.js").then((e) => e.ci),
  purebasic: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cj),
  python: () => import("./common-vendor-1T14HuIN.js").then((e) => e.ck),
  q: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cl),
  qml: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cm),
  r: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cn),
  reasonml: () => import("./common-vendor-1T14HuIN.js").then((e) => e.co),
  rib: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cp),
  roboconf: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cq),
  routeros: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cr),
  rsl: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cs),
  ruby: () => import("./common-vendor-1T14HuIN.js").then((e) => e.ct),
  ruleslanguage: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cu),
  rust: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cv),
  sas: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cw),
  scala: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cx),
  scheme: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cy),
  scilab: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cz),
  scss: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cA),
  shell: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cB),
  smali: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cC),
  smalltalk: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cD),
  sml: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cE),
  sqf: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cF),
  sql: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cG),
  stan: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cH),
  stata: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cI),
  step21: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cJ),
  stylus: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cK),
  subunit: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cL),
  swift: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cM),
  taggerscript: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cN),
  tap: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cO),
  tcl: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cP),
  thrift: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cQ),
  tp: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cR),
  twig: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cS),
  typescript: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cT),
  vala: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cU),
  vbnet: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cV),
  vbscript: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cW),
  "vbscript-html": () => import("./common-vendor-1T14HuIN.js").then((e) => e.cX),
  verilog: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cY),
  vhdl: () => import("./common-vendor-1T14HuIN.js").then((e) => e.cZ),
  vim: () => import("./common-vendor-1T14HuIN.js").then((e) => e.c_),
  wasm: () => import("./common-vendor-1T14HuIN.js").then((e) => e.c$),
  wren: () => import("./common-vendor-1T14HuIN.js").then((e) => e.d0),
  x86asm: () => import("./common-vendor-1T14HuIN.js").then((e) => e.d1),
  xl: () => import("./common-vendor-1T14HuIN.js").then((e) => e.d2),
  xml: () => import("./common-vendor-1T14HuIN.js").then((e) => e.d3),
  xquery: () => import("./common-vendor-1T14HuIN.js").then((e) => e.d4),
  yaml: () => import("./common-vendor-1T14HuIN.js").then((e) => e.d5),
  zephir: () => import("./common-vendor-1T14HuIN.js").then((e) => e.d6)
}, q = '*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.container{width:100%}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.prose{color:var(--tw-prose-body);max-width:65ch}.prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);font-size:1.25em;line-height:1.6;margin-top:1.2em;margin-bottom:1.2em}.prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);text-decoration:underline;font-weight:500}.prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal;margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em}.prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:disc;margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em}.prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{font-weight:400;color:var(--tw-prose-counters)}.prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;margin-top:1.25em}.prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:500;font-style:italic;color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em}.prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:800;font-size:2.25em;margin-top:0;margin-bottom:.8888889em;line-height:1.1111111}.prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:900;color:inherit}.prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:700;font-size:1.5em;margin-top:2em;margin-bottom:1em;line-height:1.3333333}.prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:800;color:inherit}.prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;font-size:1.25em;margin-top:1.6em;margin-bottom:.6em;line-height:1.6}.prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:700;color:inherit}.prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;margin-top:1.5em;margin-bottom:.5em;line-height:1.5}.prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:700;color:inherit}.prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){display:block;margin-top:2em;margin-bottom:2em}.prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:500;font-family:inherit;color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%),0 3px rgb(var(--tw-prose-kbd-shadows) / 10%);font-size:.875em;border-radius:.3125rem;padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;padding-inline-start:.375em}.prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-weight:600;font-size:.875em}.prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:"`"}.prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"`"}.prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);overflow-x:auto;font-weight:400;font-size:.875em;line-height:1.7142857;margin-top:1.7142857em;margin-bottom:1.7142857em;border-radius:.375rem;padding-top:.8571429em;padding-inline-end:1.1428571em;padding-bottom:.8571429em;padding-inline-start:1.1428571em}.prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){background-color:transparent;border-width:0;border-radius:0;padding:0;font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit}.prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:none}.prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){width:100%;table-layout:auto;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.7142857}.prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;vertical-align:bottom;padding-inline-end:.5714286em;padding-bottom:.5714286em;padding-inline-start:.5714286em}.prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);font-size:.875em;line-height:1.4285714;margin-top:.8571429em}.prose{--tw-prose-body: #374151;--tw-prose-headings: #111827;--tw-prose-lead: #4b5563;--tw-prose-links: #111827;--tw-prose-bold: #111827;--tw-prose-counters: #6b7280;--tw-prose-bullets: #d1d5db;--tw-prose-hr: #e5e7eb;--tw-prose-quotes: #111827;--tw-prose-quote-borders: #e5e7eb;--tw-prose-captions: #6b7280;--tw-prose-kbd: #111827;--tw-prose-kbd-shadows: 17 24 39;--tw-prose-code: #111827;--tw-prose-pre-code: #e5e7eb;--tw-prose-pre-bg: #1f2937;--tw-prose-th-borders: #d1d5db;--tw-prose-td-borders: #e5e7eb;--tw-prose-invert-body: #d1d5db;--tw-prose-invert-headings: #fff;--tw-prose-invert-lead: #9ca3af;--tw-prose-invert-links: #fff;--tw-prose-invert-bold: #fff;--tw-prose-invert-counters: #9ca3af;--tw-prose-invert-bullets: #4b5563;--tw-prose-invert-hr: #374151;--tw-prose-invert-quotes: #f3f4f6;--tw-prose-invert-quote-borders: #374151;--tw-prose-invert-captions: #9ca3af;--tw-prose-invert-kbd: #fff;--tw-prose-invert-kbd-shadows: 255 255 255;--tw-prose-invert-code: #fff;--tw-prose-invert-pre-code: #d1d5db;--tw-prose-invert-pre-bg: rgb(0 0 0 / 50%);--tw-prose-invert-th-borders: #4b5563;--tw-prose-invert-td-borders: #374151;font-size:1rem;line-height:1.75}.prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.prose :where(.prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.prose :where(.prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.prose :where(.prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.prose :where(.prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.prose :where(.prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.5714286em;padding-inline-end:.5714286em;padding-bottom:.5714286em;padding-inline-start:.5714286em}.prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.prose :where(.prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(.prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.static{position:static}.sticky{position:sticky}.top-0{top:0}.m-0{margin:0}.mx-1{margin-left:.25rem;margin-right:.25rem}.my-2{margin-top:.5rem;margin-bottom:.5rem}.block{display:block}.inline{display:inline}.flex{display:flex}.table{display:table}.grid{display:grid}.hidden{display:none}.aspect-video{aspect-ratio:16 / 9}.h-8{height:2rem}.h-full{height:100%}.min-h-40{min-height:10rem}.w-full{width:100%}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.resize{resize:both}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.space-x-4>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(1rem * var(--tw-space-x-reverse));margin-left:calc(1rem * calc(1 - var(--tw-space-x-reverse)))}.whitespace-pre-wrap{white-space:pre-wrap}.rounded-lg{border-radius:.5rem}.rounded-md{border-radius:.375rem}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.rounded-t-none{border-top-left-radius:0;border-top-right-radius:0}.border{border-width:1px}.border-l-2{border-left-width:2px}.border-gray-300{--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity, 1))}.bg-gray-700{--tw-bg-opacity: 1;background-color:rgb(55 65 81 / var(--tw-bg-opacity, 1))}.p-0{padding:0}.px-2{padding-left:.5rem;padding-right:.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.py-0{padding-top:0;padding-bottom:0}.py-0\\.5{padding-top:.125rem;padding-bottom:.125rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.font-bold{font-weight:700}.text-blue-400{--tw-text-opacity: 1;color:rgb(96 165 250 / var(--tw-text-opacity, 1))}.text-blue-500{--tw-text-opacity: 1;color:rgb(59 130 246 / var(--tw-text-opacity, 1))}.text-gray-400{--tw-text-opacity: 1;color:rgb(156 163 175 / var(--tw-text-opacity, 1))}.text-gray-500{--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity, 1))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.no-underline{text-decoration-line:none}.drop-shadow{--tw-drop-shadow: drop-shadow(0 1px 2px rgb(0 0 0 / .1)) drop-shadow(0 1px 1px rgb(0 0 0 / .06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.active\\:text-blue-300:active{--tw-text-opacity: 1;color:rgb(147 197 253 / var(--tw-text-opacity, 1))}.active\\:text-blue-400:active{--tw-text-opacity: 1;color:rgb(96 165 250 / var(--tw-text-opacity, 1))}';
var j = Object.defineProperty, L = Object.getOwnPropertyDescriptor, m = (e, t, r, o) => {
  for (var n = o > 1 ? void 0 : o ? L(t, r) : t, a = e.length - 1, i; a >= 0; a--)
    (i = e[a]) && (n = (o ? i(t, r, n) : i(n)) || n);
  return o && n && j(t, r, n), n;
};
let h = class extends y {
  constructor() {
    super(), this.key = "", this.copysuccess = {}, this.content = "", this.widgets = [], this.customRules = {}, this.key = z(9), this.md = new b({
      html: !0,
      linkify: !1,
      typographer: !0
    }), this.widgets = [], this.content = "", this.customRules = {};
  }
  // 添加初始化方法
  initialize({ widgets: e = [], content: t = "", mdConfig: r = null }) {
    r && (this.md = new b(r)), this.content = t, this.widgets = e, this.setupWidgets();
  }
  // 设置widgets的辅助方法
  setupWidgets() {
    this.widgets.forEach((e) => {
      if (e.rule(this.md), this.customRules[e.logotype])
        throw new Error(`[自定义组件渲染规则重复] ${e.logotype}`);
      this.customRules[e.logotype] = e.render;
    });
  }
  // 添加到 connectedCallback 生命周期方法中
  connectedCallback() {
    super.connectedCallback(), this.shadowRoot && this.shadowRoot.addEventListener("click", this.handleLinkClick.bind(this));
  }
  // 添加到 disconnectedCallback 生命周期方法中清理事件监听
  disconnectedCallback() {
    this.shadowRoot && this.shadowRoot.removeEventListener("click", this.handleLinkClick.bind(this)), super.disconnectedCallback();
  }
  // 添加链接点击处理方法
  handleLinkClick(e) {
    const t = e, o = t.composedPath().find(
      (n) => n instanceof HTMLAnchorElement || n instanceof HTMLElement && n.tagName === "A"
    );
    if (o) {
      const n = o.getAttribute("href") || "", a = o.textContent || "";
      this.dispatchEvent(
        new CustomEvent("link-click", {
          detail: {
            href: n,
            text: a,
            linkElement: o,
            originalEvent: t
          },
          bubbles: !0,
          composed: !0
        })
      );
    }
  }
  getHtml() {
    const e = this.md.render(this.content);
    return s`${c(e)}`;
  }
  getAST() {
    const e = this.md.parse(this.content, {}), t = this.buildNestedAST2(e, this.key);
    return this.renderAst3(t);
  }
  /**
   * 一维结构转树状结构
   * @param flatAST 抽象树
   * @param prefix_id id前缀
   * @returns 渲染树
   */
  buildNestedAST2(e, t = "") {
    const r = {
      key: "root",
      node: null,
      end: null,
      children: []
    }, o = [r];
    let n = !0;
    for (const [a, i] of e.entries()) {
      const l = o.length - 1;
      if (i.type === "inline") {
        const p = `${t}_${a}`;
        o[l].children.push({
          key: p,
          node: i,
          end: null,
          children: this.buildNestedAST2(i.children || [], p)
        });
      } else if (i.type === "html_inline")
        if (n) {
          n = !1;
          const p = {
            key: `${t}_${a}`,
            node: i,
            end: null,
            children: []
          };
          o[l].children.push(p), o.push(p);
        } else
          n = !0, o[l].end = i, o.pop();
      else if (i.nesting === 0)
        o[l].children.push({
          key: `${t}_${a}`,
          node: i,
          end: null,
          children: []
        });
      else if (i.nesting === 1) {
        const p = {
          key: `${t}_${a}`,
          node: i,
          end: null,
          children: []
        };
        o[l].children.push(p), o.push(p);
      } else i.nesting === -1 && (o[l].end = i, o.pop());
    }
    return r.children;
  }
  // 渲染AST3
  renderAst3(e) {
    return e.map((r) => {
      const o = r.node;
      switch (o.type) {
        // 行元素递归解析
        case "inline":
          return this.rederInline(this.renderAst3(r.children));
        // 块级元素解析
        case "heading_open":
          return this.renderHeading(o, this.renderAst3(r.children));
        case "paragraph_open":
          return this.renderParagraph(o, this.renderAst3(r.children));
        case "blockquote_open":
          return this.renderBlockquote(this.renderAst3(r.children));
        case "strong_open":
          return this.renderStrong(this.renderAst3(r.children));
        case "em_open":
          return this.renderEm(this.renderAst3(r.children));
        case "s_open":
          return this.renderS(this.renderAst3(r.children));
        case "ordered_list_open":
          return this.renderOrderedList(this.renderAst3(r.children));
        case "bullet_list_open":
          return this.renderBulletList(this.renderAst3(r.children));
        case "list_item_open":
          return this.renderListItem(this.renderAst3(r.children));
        // table相关解析
        case "table_open":
          return this.renderTable(this.renderAst3(r.children));
        case "thead_open":
          return this.renderThead(this.renderAst3(r.children));
        case "tbody_open":
          return this.renderTbody(this.renderAst3(r.children));
        case "tr_open":
          return this.renderTr(this.renderAst3(r.children));
        case "th_open":
          return this.renderTh(this.renderAst3(r.children));
        case "td_open":
          return this.renderTd(this.renderAst3(r.children));
        // 链接解析
        case "link_open":
          return this.renderLink(o, this.renderAst3(r.children));
        // 代码块
        case "fence":
          return this.renderFence(o, r.key);
        case "code_inline":
          return this.renderCodeInline(o);
        // 水平分隔线
        case "hr":
          return s`<hr />`;
        // 软换行
        case "softbreak":
          return s` `;
        // 硬换行
        case "hardbreak":
          return s`<br />`;
        // 图片
        case "image":
          return this.renderImage(o);
        // 文字解析
        case "text":
          return this.renderText(o);
        // 解析html代码
        case "html_block":
          return this.renderHtmlBlock(o);
        case "html_inline":
          return this.renderHtmlInline(o, r.end, this.renderAst3(r.children));
        default:
          const n = this.customRules[o.type];
          return n ? n(r) : (console.error("[未匹配类型]", o.type), s``);
      }
    }).filter((r) => r !== s``);
  }
  // 渲染行元素
  rederInline(e) {
    return s`${e}`;
  }
  // 渲染包裹标签
  renderHeading(e, t) {
    switch (e.tag) {
      case "h1":
        return s`<h1>${t}</h1>`;
      case "h2":
        return s`<h2>${t}</h2>`;
      case "h3":
        return s`<h3>${t}</h3>`;
      case "h4":
        return s`<h4>${t}</h4>`;
      case "h5":
        return s`<h5>${t}</h5>`;
      case "h6":
        return s`<h6>${t}</h6>`;
    }
    return console.error("[heading标签解析异常]", e), s``;
  }
  renderParagraph(e, t) {
    return e.hidden ? s`${t}` : s`<p>${t}</p>`;
  }
  renderBlockquote(e) {
    return s`<blockquote>${e}</blockquote>`;
  }
  renderStrong(e) {
    return s`<strong>${e}</strong>`;
  }
  renderEm(e) {
    return s`<em>${e}</em>`;
  }
  renderS(e) {
    return s`<s>${e}</s>`;
  }
  renderOrderedList(e) {
    return s`<ol>
      ${e}
    </ol>`;
  }
  renderBulletList(e) {
    return s`<ul>
      ${e}
    </ul>`;
  }
  renderListItem(e) {
    return s`<li>${e}</li>`;
  }
  renderTable(e) {
    return s`<table>
      ${e}
    </table>`;
  }
  renderThead(e) {
    return s`<thead>
      ${e}
    </thead>`;
  }
  renderTbody(e) {
    return s`<tbody>
      ${e}
    </tbody>`;
  }
  renderTr(e) {
    return s`<tr>
      ${e}
    </tr>`;
  }
  renderTh(e) {
    return s`<th>${e}</th>`;
  }
  renderTd(e) {
    return s`<td>${e}</td>`;
  }
  // 渲染链接
  renderLink(e, t) {
    var n;
    const o = ((n = (e.attrs || []).find((a) => a[0] === "href")) == null ? void 0 : n[1]) || "";
    return s`<a class="text-blue-500 no-underline active:text-blue-400" href="${o}" target="_blank" rel="noreferrer nofollow noopener">${t}</a>`;
  }
  // 渲染 块代码
  renderFence(e, t) {
    this.copysuccess.hasOwnProperty(t) || (this.copysuccess = { ...this.copysuccess, [t]: !1 });
    const r = () => {
      navigator != null && navigator.clipboard ? navigator.clipboard.writeText(e.content).then(() => {
        this.copysuccess = { ...this.copysuccess, [t]: !0 }, setTimeout(() => {
          this.copysuccess = { ...this.copysuccess, [t]: !1 };
        }, 1500);
      }).catch((n) => {
        console.error("复制失败", n);
      }) : console.error("[navigator.clipboard.writeText 未匹配]");
    }, o = e.info || "plaintext";
    return s`
      <div class="rounded-md">
        <div class="sticky top-0 flex h-8 select-none items-center justify-between rounded-t-md bg-gray-700 px-3 text-xs">
          <span class="font-bold text-gray-400">${o}</span>
          ${this.copysuccess[t] ? s`<span class="cursor-pointer text-white">复制成功</span>` : s`<span class="cursor-pointer text-blue-400 active:text-blue-300" @click=${r}>复制</span>`}
        </div>
        <div>${v(_(o, e.content), s`<pre><code class="language-${e.info}">${e.content}</code></pre>`)}</div>
      </div>
    `;
  }
  // 渲染 行代码
  renderCodeInline(e) {
    return s`<span class="mx-1 rounded-md bg-gray-700 px-2 py-0.5 text-white">${e.content}</span>`;
  }
  // 渲染图片
  renderImage(e) {
    var a, i, l;
    const t = e.attrs || [], r = ((a = t.find((p) => p[0] === "src")) == null ? void 0 : a[1]) || "", o = ((i = t.find((p) => p[0] === "alt")) == null ? void 0 : i[1]) || "", n = ((l = t.find((p) => p[0] === "title")) == null ? void 0 : l[1]) || "";
    return s`<img src="${r}" alt="${o}" title="${n}" />`;
  }
  // 渲染文本
  renderText(e) {
    return s`${e.content}`;
  }
  // 解析html本身
  renderHtmlBlock(e) {
    return s`${c(e.content)}`;
  }
  renderHtmlInline(e, t, r) {
    const o = s`${r}`, n = document.createElement("div");
    x(o, n);
    const a = n.innerHTML;
    return s`${c(e.content + a + (t == null ? void 0 : t.content))}`;
  }
  render() {
    return s`<div class="prose">${this.getAST()}</div>`;
  }
};
h.styles = [w(q), w($)];
m([
  f()
], h.prototype, "copysuccess", 2);
m([
  u({ type: String })
], h.prototype, "content", 2);
m([
  u({ type: Array })
], h.prototype, "widgets", 2);
h = m([
  k("ys-md-rendering")
], h);
function E(e) {
  const t = document.createElement("ys-md-rendering");
  return t.initialize(e), t;
}
export {
  h as YsMdRendering,
  E as createMdRendering
};
