<template>
  <div class="page">
    <button @click="tttt">赋值</button>
    <VMdPreview :text="value1" />
  </div>
</template>

<script>
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
// 代码高亮
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'
// 代码行号
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'
// 代码一键复制
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn'
VMdPreview.use(vuepressTheme, { Prism })
  .use(createLineNumbertPlugin())
  .use(createCopyCodePlugin())
  .use(createKatexPlugin())
  .extendMarkdown(md => {
    console.log('md.block.ruler', md.block.ruler)

    const uid = 'cdkl3'
    // 保留默认渲染
    const defaultRender = md.renderer.rules.fence
    // 添加自定义围栏代码块的渲染规则
    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
      const token = tokens[idx]
      console.log('token', token)
      if (token.info === 'mermaid') {
        return `<div class="mermaid-box">
          <span id="mermaid-${uid}-content" class="mermaid-span">${token.content}</span>
          <span id="mermaid-${uid}-mermaid"></span>
          <button id="mermaid-${uid}-button" class="mermaid-button">渲染</button>
          </div>`
      } else {
        return defaultRender(tokens, idx, options, env, self)
      }
    }
  })

// mermaid
const mock = `
# 这是图表

\`\`\`mermaid
C4Context
    title Rill Flow 系统架构 (C4模型)

    Person(user, "用户", "使用Rill Flow的开发者或系统管理员")

    System_Boundary(rill_flow, "Rill Flow") {
        Container(flow_trigger, "流程触发模块", "处理多种触发方式")
        Container(flow_orchestration, "流程编排模块", "提供流程定义和管理")
        Container(task_execution, "任务执行模块", "调度和执行各种任务")

        Container(visualization, "可视化编辑器", "图形化流程编排界面")
        Container(yaml_editor, "YAML编辑器", "文本化流程编排界面")

        ContainerDb(process_db, "流程存储", "存储流程定义和执行状态")
    }

    System_Ext(timer, "定时系统", "提供定时触发能力")
    System_Ext(message_queue, "消息队列", "提供事件触发能力")
    System_Ext(api_gateway, "API网关", "提供API触发能力")

    System_Ext(http_service, "HTTP服务", "外部HTTP服务")
    System_Ext(serverless, "Serverless平台", "无服务器函数执行环境")
    System_Ext(gpt_service, "GPT服务", "AI语言模型服务")
    System_Ext(custom_executor, "自定义执行器", "用户自定义的任务执行器")
    System_Ext(remote_executor, "远程执行器", "分布式任务执行器")

    Rel(user, flow_trigger, "配置触发器")
    Rel(user, flow_orchestration, "定义流程")
    Rel(user, visualization, "使用")
    Rel(user, yaml_editor, "使用")

    Rel(flow_trigger, timer, "接收触发")
    Rel(flow_trigger, message_queue, "接收事件")
    Rel(flow_trigger, api_gateway, "接收请求")

    Rel(flow_orchestration, visualization, "生成/更新")
    Rel(flow_orchestration, yaml_editor, "生成/更新")
    Rel(flow_orchestration, process_db, "存储/读取")

    Rel(flow_trigger, flow_orchestration, "启动流程")
    Rel(flow_orchestration, task_execution, "调度任务")

    Rel(task_execution, http_service, "调用")
    Rel(task_execution, serverless, "调用")
    Rel(task_execution, gpt_service, "调用")
    Rel(task_execution, custom_executor, "调用")
    Rel(task_execution, remote_executor, "调用")
\`\`\`

> 结束

\`\`\`js
const arr = [1,2,3,4]
\`\`\`

`

const mock2 =
  '为了计算这个问题，我们首先需要确定每只猫每天的捕鼠效率。\n因此，在9天内，每只猫可以捉到的老鼠数为：\n$$[ \\text{每只猫9天内捉到的老鼠数} = 9 \\times \\frac{1}{3} = 3]$$'
console.log('mock2', mock2)

export default {
  name: 'MdEdit1',
  components: { VMdPreview },
  data() {
    return {
      // value1: '# 准备',
      value1: mock2,
      ind: 0,
      chan: false,
      timer: null
    }
  },
  watch: {},
  mounted() {
    console.log('--------')
    document.addEventListener('click', this.clickListener)
  },
  destroyed() {
    document.removeEventListener('click', this.clickListener)
  },
  methods: {
    tttt() {
      // this.value1 = mock
      this.ind = 0
      this.value1 = ''
      this.getNext()
    },
    getNext() {
      if (mock[this.ind]) {
        this.value1 += mock[this.ind]
        this.$nextTick(() => {
          this.ind++
          this.getNext()
        })
        // setTimeout(() => {
        // }, 10)
      }
    },
    clickListener(e) {
      console.log('e.target', e.target)
      if (e.target.classList.contains('mermaid-button')) {
        console.log('成功')
        const regex = /mermaid-(\w+)-button/
        const match = e.target.id.match(regex)
        const xxx = match[1]
        console.log('xxx', xxx)
        const contentDom = document.getElementById(`mermaid-${xxx}-content`)
        const content = contentDom.textContent
        const mermDom = document.getElementById(`mermaid-${xxx}-mermaid`)
        mermDom.innerHTML = content
        window.mermaid.run({
          querySelector: `#mermaid-${xxx}-mermaid`
        })
      }
    }
  }
}
</script>

<style>
.page {
  height: 100%;
}
.mermaid-box {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.mermaid-box:hover .mermaid-button {
  display: block;
}
.mermaid-button {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
}
.mermaid-span {
  white-space: pre-wrap;
}
</style>
