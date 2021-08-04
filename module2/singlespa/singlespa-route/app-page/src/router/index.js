/*
 * @Author: liuxin
 * @Date: 2021-08-04 15:54:32
 * @LastEditTime: 2021-08-04 16:14:12
 * @LastEditors: liuxin
 * @Description: 
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Detail from "../components/Detail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "detail",
    component: Detail,
  },
  {
    path: "/page/detail",
    name: "detail",
    component: Detail,
  },
  {
    path: "/page/comment",
    name: "comment",
    component: () =>
      import(/* webpackChunkName: "comment" */ "../components/Comment.vue"),
  },
  {
    path: "/page/recommend",
    name: "recommend",
    component: () =>
      import(/* webpackChunkName: "recommend" */ "../components/Recommend.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
