import * as echarts from 'echarts'

const innerHtml =
  '<style>.container{aspect-ratio:16/9}.chart{height:100%}</style><div class="container"><div id="chart"class="chart"></div></div>'

class HiswEcharts extends HTMLElement {
  data = null // 数据
  chat = null // 图表

  static get observedAttributes() {
    return ['data']
  }

  // 当元素被添加到DOM中时调用
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    // 使用模板
    const template = document.createElement('template')
    template.innerHTML = innerHtml
    shadow.appendChild(template.content.cloneNode(true))
    // 创建resize处理函数并保存引用
    this.resizeHandler = this.windowResize.bind(this)
  }

  // 生命周期 -- 参数变化
  attributeChangedCallback(name, _, newValue) {
    if (name === 'data') {
      this.data = newValue
    }
  }

  // 生命周期 -- 组件插入
  connectedCallback() {
    this.initChat()
    // 添加事件监听
    window.addEventListener('resize', this.resizeHandler)
  }

  // 生命周期 -- 组件移除
  disconnectedCallback() {
    // 销毁监听
    window.removeEventListener('resize', this.resizeHandler)
  }

  // 初始化图表
  initChat() {
    try {
      const obj = JSON.parse(this.data)
      const chartElement = this.shadowRoot.getElementById('chart')
      this.chat = echarts.init(chartElement)
      this.chat.setOption(obj)
    } catch (err) {
      console.error('[hisw-echarts]', err)
      this.renderFailure()
    }
  }

  // 屏幕宽度变化
  windowResize() {
    if (this.chat) this.chat.resize()
  }

  // 加载失败
  renderFailure() {}
}

export default HiswEcharts
