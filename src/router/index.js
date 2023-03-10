/*
 * @Author: yyshu yyshu@hisw.cn
 * @Date: 2023-03-10 14:44:52
 * @LastEditors: yyshu yyshu@hisw.cn
 * @LastEditTime: 2023-03-10 17:54:21
 * @FilePath: \vue-module-demo\src\router\index.js
 * @Description: 路由配置
 */
import { createRouter, createWebHistory } from "vue-router";
import Page1 from "@/views/page1.vue";
import Page2 from "@/views/page2.vue";
import Page3 from "@/views/page3.vue";

const routes = [
  // Echart尝试添加缩略图
  {
    path: "/page1",
    name: "page1",
    component: Page1,
  },
  // Merge Images
  {
    path: "/page2",
    name: "Page2",
    component: Page2,
  },
  // 时间进度条
  {
    path: "/page3",
    name: "Page3",
    component: Page3,
  },
  {
    path: "/",
    redirect: "/page3",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
