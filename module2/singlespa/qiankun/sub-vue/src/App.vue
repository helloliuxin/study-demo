<!--
 * @Author: liuxin
 * @Date: 2021-08-05 13:36:52
 * @LastEditTime: 2021-08-07 17:54:31
 * @LastEditors: liuxin
 * @Description: 
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <a href="#" @click="gotoSubReact" style="marin: 0 0 0 10px"
        >跳转到sub-react</a
      >
    </div>
    <div>从vuex的global module的state： {{ JSON.stringify(user) }}</div>
    <button @click="update">更新state</button>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    // 通过global获取user信息
    ...mapState("global", {
      user: (state) => state.user // 获取父应用的user信息
    })
  },
  methods: {
    ...mapActions("global", ["setGlobalState"]),
    update() {
      this.setGlobalState({ user: { name: "张三" } });
    },
    gotoSubReact() {
      history.pushState(null, "sub-react", "/sub-react");
    }
  }
};
</script>

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
