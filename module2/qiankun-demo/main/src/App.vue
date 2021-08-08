<!--
 * @Author: liuxin
 * @Date: 2021-08-08 15:03:46
 * @LastEditTime: 2021-08-08 17:49:08
 * @LastEditors: liuxin
 * @Description: 
-->
<template>
  <div id="app">
    <div class="container">
      <div class="container-left">
        <NavMenuLeft :microApps="microApps"></NavMenuLeft>
      </div>
      <div class="container-right">
        <div id="subapp-viewport"></div>
      </div>
    </div>
  </div>
</template>

<script>
import NavMenuLeft from "./components/NavMenuLeft.vue";
import microApps from "./micro-app";
export default {
  name: "app",
  components: {
    NavMenuLeft,
  },
  data() {
    return {
      microApps,
    };
  },
  mounted() {
    console.log("microApps: ", this.microApps);
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 0 !important;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
.container {
  display: flex;
  width: 100%;
  height: 100%;
  &-left {
    width: 200px;
    height: 100%;
  }
  &-right {
    flex: 1;
  }
}
</style>
