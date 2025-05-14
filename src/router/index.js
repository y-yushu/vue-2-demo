/*
 * @Author: yyshu yyshu@hisw.cn
 * @Date: 2023-03-14 14:24:51
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-08-31 16:22:05
 * @FilePath: \vue-module-demo\src\router\index.js
 * @Description: 路由
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/lit_sub'
  },
  {
    // markdown中的`\n`问题
    path: '/lit_sub',
    name: 'LitSub',
    component: () => import('@/views/lit_sub/index')
  },
  {
    // markdown中的`\n`问题
    path: '/markdown-it-2',
    name: 'MarkdownIt2',
    component: () => import('@/views/markdown-it2/index')
  },
  {
    // 语音识别功能
    path: '/marked',
    name: 'MarkedPage',
    component: () => import('@/views/marked/index')
  },
  {
    // 语音识别功能
    path: '/stt',
    name: 'SttPage',
    component: () => import('@/views/stt/index')
  },
  {
    // claude-generate 生成页面测试
    path: '/claude-generate',
    name: 'ClaudeGenerate',
    component: () => import('@/views/claude-generate/index')
  },
  {
    // xlsx解析
    path: '/xlsx',
    name: 'Xlsx',
    component: () => import('@/views/xlsx/index')
  },
  {
    // 高德map
    path: '/gaode-map',
    name: 'GaodeMap',
    component: () => import('@/views/gaode-map/index')
  },
  {
    // markdown-it-custom 自定义渲染
    path: '/markdown-it-custom',
    name: 'MarkdownItCustom',
    component: () => import('@/views/markdown-it-custom/index')
  },
  {
    // typewriter 打字机
    // 注：目前看文字输出没问题，但是markdown-it渲染时，会出现问题
    path: '/typewriter',
    name: 'Typewriter',
    component: () => import('@/views/typewriter/index')
  },
  {
    // three 练习3
    path: '/three-3',
    name: 'ThreePage3',
    component: () => import('@/views/three_3/index')
  },
  {
    // three 练习2
    path: '/three-2',
    name: 'ThreePage2',
    component: () => import('@/views/three_2/index')
  },
  {
    // three 练习
    path: '/three',
    name: 'ThreePage',
    component: () => import('@/views/three/index')
  },
  {
    // 测试路由跳转
    path: '/test/:id?',
    name: 'TestPage',
    component: () => import('@/views/test/index')
  },
  {
    // @antv/g6 图表
    path: '/antv-g6',
    name: 'AntvG6',
    component: () => import('@/views/antv-g6/index')
  },
  {
    // mind-elixir 图表
    path: '/mind-elixir',
    name: 'MindElixir',
    component: () => import('@/views/mindElixir/index')
  },
  {
    // echart图表1
    path: '/echart-1',
    name: 'EchartOne',
    component: () => import('@/views/echarts/index1')
  },
  {
    // echart图表2
    path: '/echart-2',
    name: 'EchartTwo',
    component: () => import('@/views/echarts/index2')
  },
  {
    // md实现流程图2
    path: '/md-mermaid2',
    name: 'mdMermaid2',
    component: () => import('@/views/md-mermaid/index2')
  },
  {
    // md实现流程图
    path: '/md-mermaid',
    name: 'mdMermaid',
    component: () => import('@/views/md-mermaid/index')
  },
  {
    // html仿element
    path: '/html-element',
    name: 'htmlElement',
    component: () => import('@/views/html-element/index')
  },
  {
    // 自定义md编辑
    path: '/md-edit_2',
    name: 'mdEdit22',
    component: () => import('@/views/md-edit2/index')
  },
  {
    // 自定义md编辑
    path: '/md-edit',
    name: 'mdEdit',
    component: () => import('@/views/md-edit/index')
  },
  {
    // 自定义md编辑
    path: '/md-edit_0',
    name: 'mdEdit0',
    component: () => import('@/views/md-edit/index_0')
  },
  {
    // 自定义md编辑
    path: '/md-edit_1',
    name: 'mdEdit1',
    component: () => import('@/views/md-edit/index_1')
  },
  {
    // 自定义富文本编辑
    path: '/md-edit_2',
    name: 'mdEdit2',
    component: () => import('@/views/md-edit/index_2')
  },
  {
    // SSE连接
    path: '/sse',
    name: 'sse',
    component: () => import('@/views/sse')
  },
  {
    // vColorPicker
    path: '/vColorPicker',
    name: 'vColorPicker',
    component: () => import('@/views/vColorPicker')
  },
  {
    // vue-pdf使用
    path: '/vue-pdf',
    name: 'vuePdf',
    component: () => import('@/views/vue-pdf')
  },
  {
    // wangEditor编辑器
    path: '/wang-editor',
    name: 'wangEditor',
    component: () => import('@/views/Wang-editor/Wang-editor')
  },
  {
    // 将Dom转存为图片
    path: '/dom-to-image',
    name: 'domToImage',
    component: () => import('@/views/Dom-to-image')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
