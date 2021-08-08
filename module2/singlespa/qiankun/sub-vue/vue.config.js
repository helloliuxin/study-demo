/*
 * @Author: liuxin
 * @Date: 2021-08-05 14:27:49
 * @LastEditTime: 2021-08-08 03:54:34
 * @LastEditors: liuxin
 * @Description: 
 */
// pagkage.json的name需注意与主应用一致
const { name } = require("./package.json");

module.exports = {
  publicPath: '/subapp/sub-vue',
  transpileDependencies: ['common'],
  configureWebpack: {
    output: {
      // 以package.json的name作为应用名称，在主应用使用
      library: `${name}-[name]`,
      libraryTarget: "umd", // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`
    }
  },
  // devServer的端口改为与主应用配置的一致,且加上跨域headers和output配置。
  devServer: {
    port: process.env.VUE_APP_PORT, // 在.env中VUE_APP_PORT=7788，与父应用的配置一致
    headers: {
      "Access-Control-Allow-Origin": "*" // 主应用获取子应用时跨域响应头
    }
  }
};
