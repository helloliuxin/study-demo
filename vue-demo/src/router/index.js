/*
 * @Author: liuxin
 * @Date: 2021-07-14 21:20:08
 * @LastEditTime: 2021-07-14 21:50:32
 * @LastEditors: liuxin
 * @Description: 路由
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
    path: "/numBaseConversion",
    name: "numBaseConversion",
    component: () =>
      import(
        /* webpackChunkName: "NumBaseConversion" */ "../views/NumBaseConversion.vue"
      ),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
