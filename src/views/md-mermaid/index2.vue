<template>
  <div class="page">
    <span class="mermaid">{{ value }}</span>
  </div>
</template>

<script>
// const mock = `graph LR
//   A --- B
//   B-->C[fa:fa-ban forbidden]
//   B-->D(fa:fa-spinner);
// `
const mock2 = `C4Context
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
`

export default {
  name: 'MdEdit1',
  data() {
    return {
      value: mock2
    }
  },
  methods: {}
}
</script>

<style>
.page {
  height: 100%;
}
</style>
