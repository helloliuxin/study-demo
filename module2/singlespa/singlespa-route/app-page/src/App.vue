<!--
 * @Author: liuxin
 * @Date: 2021-08-04 15:54:32
 * @LastEditTime: 2021-08-04 16:13:02
 * @LastEditors: liuxin
 * @Description: 
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
