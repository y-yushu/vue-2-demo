const innerHtml =
  '<style>.blue{background:orange}</style><div class=""><h1>Hello,Web Component!</h1><p class="blue">This is content created with HTML.</p></div>'

class HiswEcharts extends HTMLElement {
  // 当元素被添加到DOM中时调用
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    // 使用模板
    const template = document.createElement('template')
    template.innerHTML = innerHtml
    shadow.appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {
    // console.log('connectedCallback')
  }

  // 可选：当元素从DOM中移除时调用
  disconnectedCallback() {
    // 这里可以清理事件监听器等
    console.log('disconnectedCallback')
  }
}

export default HiswEcharts
