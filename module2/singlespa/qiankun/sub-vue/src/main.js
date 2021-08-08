/*
 * @Author: liuxin
 * @Date: 2021-08-05 13:36:52
 * @LastEditTime: 2021-08-08 04:31:12
 * @LastEditors: liuxin
 * @Description:
 */
import "./public-path"; // 注意需要引入public-path
import Vue from "vue";
import App from "./App.vue";
import routes from "./router";
import store from "./store";
// import globalRegister from "./store/global-register"
import { store as commonStore } from "common";
import VueRouter from "vue-router";

Vue.config.productionTip = false;
let instance = null;

function render(props = {}) {
  console.log("props: ", props);
  const { container, routerBase } = props;
  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    mode: "history",
    routes
  });

  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector("#app") : "#app");
}

if (!window.__POWERED_BY_QIANKUN__) {
  // 这里是子应用独立运行的环境，实现子应用的登录逻辑

  // 独立运行时，也注册一个名为global的store module
  commonStore.globalRegister(store);
  // 模拟登录后，存储用户信息到global module
  const userInfo = { name: "我是独立运行时名字叫张三" }; // 假设登录后取到的用户信息
  store.commit("global/setGlobalState", { user: userInfo });
  render();
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}

export async function mount(props) {
  console.log("[vue] props from main framework", props);
  commonStore.globalRegister(store, props);

  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}
