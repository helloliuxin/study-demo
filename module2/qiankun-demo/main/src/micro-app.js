/*
 * @Author: liuxin
 * @Date: 2021-08-08 16:53:29
 * @LastEditTime: 2021-08-08 17:16:08
 * @LastEditors: liuxin
 * @Description: 微应用配置信息
 */
const microApps = [
  {
    name: "sub-app1",
    entry: process.env.VUE_APP_SUB_APP1,
    activeRule: "/sub-app1",
    icon: "el-icon-menu",
  },
  {
    name: "sub-app2",
    entry: process.env.VUE_APP_SUB_APP2,
    activeRule: "/sub-app2",
    icon: "el-icon-document",
  },
  {
    name: "sub-app3",
    entry: process.env.VUE_APP_SUB_APP3,
    activeRule: "/sub-app3",
    icon: "el-icon-setting",
  },
];

const apps = microApps.map((item) => {
  return {
    ...item,
    container: "#subapp-viewport", // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由，子应用根据该值去定义qiankun环境下的路由
    },
  };
});

export default apps;
