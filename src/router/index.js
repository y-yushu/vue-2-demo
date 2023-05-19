/*
 * @Author: yyshu yyshu@hisw.cn
 * @Date: 2023-03-14 14:24:51
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-05-19 18:40:33
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
    redirect: "/dom-to-image",
  },
  {
    // 将Dom转存为图片
    path: "/dom-to-image",
    name: "home",
    component: () => import("@/views/Dom-to-image"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
