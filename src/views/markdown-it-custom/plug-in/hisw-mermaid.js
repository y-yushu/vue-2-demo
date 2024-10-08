const innerHtml = '<style>.container{position:relative;aspect-ratio:16/9}</style><div class="container"><div id="mermaid-code"></div></div>'

class HiswMermaid extends HTMLElement {
  static get observedAttributes() {
    return ['markdown'] // 监听 markdown 属性
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    // 使用模板
    const template = document.createElement('template')
    template.innerHTML = innerHtml
    shadow.appendChild(template.content.cloneNode(true))
    // 将 highlight.js 样式添加到 Shadow DOM
    const style = document.createElement('style')
    style.textContent = this.getHighlightStyles()
    shadow.appendChild(style)
  }

  // 代码样式
  getHighlightStyles() {
    return 'pre code.hljs{display:block;overflow-x:auto;padding:1em;white-space: pre-wrap;word-wrap: break-word}code.hljs{padding:3px 5px;white-space: pre-wrap;word-wrap: break-word}.hljs{background:#23241f;color:#f8f8f2}.hljs-subst,.hljs-tag{color:#f8f8f2}.hljs-emphasis,.hljs-strong{color:#a8a8a2}.hljs-bullet,.hljs-link,.hljs-literal,.hljs-number,.hljs-quote,.hljs-regexp{color:#ae81ff}.hljs-code,.hljs-section,.hljs-selector-class,.hljs-title{color:#a6e22e}.hljs-strong{font-weight:700}.hljs-emphasis{font-style:italic}.hljs-attr,.hljs-keyword,.hljs-name,.hljs-selector-tag{color:#f92672}.hljs-attribute,.hljs-symbol{color:#66d9ef}.hljs-class .hljs-title,.hljs-params,.hljs-title.class_{color:#f8f8f2}.hljs-addition,.hljs-built_in,.hljs-selector-attr,.hljs-selector-id,.hljs-selector-pseudo,.hljs-string,.hljs-template-variable,.hljs-type,.hljs-variable{color:#e6db74}.hljs-comment,.hljs-deletion,.hljs-meta{color:#75715e}'
  }

  connectedCallback() {
    this.renderMarkdown() // 初始化渲染
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'markdown' && oldValue !== newValue) {
      this.renderMarkdown() // 当属性变化时重新渲染
    }
  }

  renderMarkdown() {
    const html = this.innerHTML.trim()
    const markdownContentDiv = this.shadowRoot.getElementById('mermaid-code')
    markdownContentDiv.innerHTML = html // 插入渲染后的HTML
    // const md = new MarkdownIt({
    //   highlight: str => {
    //     const highlighted = hljs.highlightAuto(str).value
    //     return `<pre><code class="hljs">${highlighted}</code></pre>`
    //   }
    // })

    // const markdownText = this.getAttribute('markdown') || ''
    // const decodedParam = decodeURIComponent(markdownText)
    // const markdownStr = '```json\n' + decodedParam
    // const html = md.render(markdownStr)

    // const markdownContentDiv = this.shadowRoot.getElementById('mermaid-code')
    // markdownContentDiv.innerHTML = html // 插入渲染后的HTML
  }
}

export default HiswMermaid
