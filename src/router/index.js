/*
 * @Author: yyshu yyshu@hisw.cn
 * @Date: 2023-03-14 14:24:51
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-05-26 15:07:24
 * @FilePath: \vue-module-demo\src\router\index.js
 * @Description: 路由
 */
import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    redirect: "/wang-editor",
  },
  {
    // wangEditor编辑器
    path: "/wang-editor",
    name: "wangEditor",
    component: () => import("@/views/Wang-editor/Wang-editor"),
  },
  {
    // 将Dom转存为图片
    path: "/dom-to-image",
    name: "domToImage",
    component: () => import("@/views/Dom-to-image"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
