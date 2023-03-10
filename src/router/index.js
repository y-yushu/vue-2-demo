/*
 * @Author: yyshu yyshu@hisw.cn
 * @Date: 2023-03-10 14:44:52
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-03-10 16:17:35
 * @FilePath: \vue-module-demo\src\router\index.js
 * @Description: 路由配置
 */
import { createRouter, createWebHistory } from "vue-router";
import Page1 from "@/views/page1.vue";
import Page2 from "@/views/page2.vue";

const routes = [
  {
    path: "/page1",
    name: "page1",
    component: Page1,
  },
  {
    path: "/page2",
    name: "Page2",
    component: Page2,
  },
  {
    path: "/",
    redirect: "/page2",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
