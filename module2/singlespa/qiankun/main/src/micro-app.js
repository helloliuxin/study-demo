/*
 * @Author: liuxin
 * @Date: 2021-08-05 14:07:12
 * @LastEditTime: 2021-08-06 17:34:38
 * @LastEditors: liuxin
 * @Description: 微应用配置信息
 */
import store from "./store";
const microApps = [
  {
    name: 'sub-vue',
    entry: process.env.VUE_APP_SUB_VUE,
    activeRule: '/sub-vue'
  },
  {
    name: 'sub-react',
    entry: process.env.VUE_APP_SUB_REACT,
    activeRule: '/sub-react'
  }
]

const apps = microApps.map(item => {
  return {
    ...item,
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由，子应用根据该值去定义qiankun环境下的路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  }
})

export default apps;