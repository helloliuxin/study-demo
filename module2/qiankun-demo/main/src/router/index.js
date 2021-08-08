/*
 * @Author: liuxin
 * @Date: 2021-08-08 15:03:46
 * @LastEditTime: 2021-08-08 15:27:33
 * @LastEditors: liuxin
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Portal from "../views/Portal.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Portal",
    component: Portal,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
