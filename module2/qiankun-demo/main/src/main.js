/*
 * @Author: liuxin
 * @Date: 2021-08-08 15:03:46
 * @LastEditTime: 2021-08-08 17:07:31
 * @LastEditors: liuxin
 * @Description:
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import { registerMicroApps, start, setDefaultMountApp } from "qiankun";
import microApps from "./micro-app";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// 给子应用配置加上loader方法
const apps = microApps.map((item) => {
  return {
    ...item,
  };
});
console.log("apps: ", apps);

registerMicroApps(apps, {
  // 全局的微应用生命周期钩子
  // 用法: 注册微应用的基础配置信息。当浏览器 url 发生变化时，会自动检查每一个微应用注册的 activeRule 规则，符合规则的应用将会被自动激活。
  beforeLoad: (app) => {
    console.log("before load app.name====>>>>>", app.name);
  },
  beforeMount: [
    (app) => {
      console.log("[LifeCycle] before mount %c%s", "color: green;", app.name);
    },
  ],
  afterMount: [
    (app) => {
      console.log("[LifeCycle] after mount %c%s", "color: green;", app.name);
    },
  ],
  afterUnmount: [
    (app) => {
      console.log("[LifeCycle] after unmount %c%s", "color: green;", app.name);
    },
  ],
});

setDefaultMountApp("/sub-app1");
start();
