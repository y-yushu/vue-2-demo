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
    redirect: '/antv-g6'
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
