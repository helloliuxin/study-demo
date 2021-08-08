/*
 * @Author: liuxin
 * @Date: 2021-08-05 13:34:41
 * @LastEditTime: 2021-08-07 18:53:23
 * @LastEditors: liuxin
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {registerMicroApps, start, setDefaultMountApp} from 'qiankun'
import microApps from './micro-app'
// 引入nprogress的css
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

// 获取实例
const instance = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 定义loader方法，loading改变时，将变量赋值给App.vue的data中的isLoading
function loader (loading) {
  if (instance && instance.$children) {
    // instance.$children[0] 是App.vue，此时直接改动App.vue的isLoading
    instance.$children[0].isLoading = loading
  }
}

// 给子应用配置加上loader方法
const apps = microApps.map(item => {
  return {
    ...item,
    loader
  }
})
console.log('apps: ', apps);

registerMicroApps(apps, {
  // 全局的微应用生命周期钩子
  // 用法: 注册微应用的基础配置信息。当浏览器 url 发生变化时，会自动检查每一个微应用注册的 activeRule 规则，符合规则的应用将会被自动激活。
  beforeLoad: app => {
    console.log('before load app.name====>>>>>', app.name)
  },
  beforeMount: [
    app => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
    },
  ],
  afterMount: [
    app => {
      console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name);
    }
  ],
  afterUnmount: [
    app => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
    },
  ],
})

setDefaultMountApp('/sub-vue')
start();
