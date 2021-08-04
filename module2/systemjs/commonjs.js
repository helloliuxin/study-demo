/*
 * @Author: liuxin
 * @Date: 2021-08-03 17:08:09
 * @LastEditTime: 2021-08-03 17:17:36
 * @LastEditors: liuxin
 * @Description: 
 */
const url = require("url");
const { System, applyImportMap, setBaseUrl } = require("systemjs");

// Setting base URL is optional - the default is to use process.cwd()
// so the code here is redundant
const basePath = url.pathToFileURL(process.cwd()).href;
console.log('process.cwd(): ', process.cwd());
setBaseUrl(System, basePath);

applyImportMap(System, {
  imports: {
    md5: "./md5.js",
  }
})

System.imports("md5").then((md5) => {
  console.log('md5 module', md5);
})