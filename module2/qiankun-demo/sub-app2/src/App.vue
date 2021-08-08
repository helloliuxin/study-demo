<!--
 * @Author: liuxin
 * @Date: 2021-08-08 15:04:45
 * @LastEditTime: 2021-08-08 17:51:19
 * @LastEditors: liuxin
 * @Description: 
-->
<template>
  <div id="app">
    <div id="nav">
      <h3>子应用sub-app2</h3>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
