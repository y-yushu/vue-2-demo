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
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/md-edit'
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
