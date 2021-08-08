/*
 * @Author: liuxin
 * @Date: 2021-08-08 15:03:54
 * @LastEditTime: 2021-08-08 17:37:15
 * @LastEditors: liuxin
 * @Description: src/router/index.js改为只暴露routes，new Router改到main.js中声明。
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

export default routes;
