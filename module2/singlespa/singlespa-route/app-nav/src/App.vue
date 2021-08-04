<!--
 * @Author: liuxin
 * @Date: 2021-08-04 15:53:23
 * @LastEditTime: 2021-08-04 17:01:05
 * @LastEditors: liuxin
 * @Description: 
-->
<template>
  <div id="app">
    <NavMenu @change="change" />
  </div>
</template>

<script>
import NavMenu from "./components/NavMenu.vue";

export default {
  name: "App",
  props: {
    singleSpa: {
      type: Object
    }
  },
  components: {
    NavMenu
  },
  methods: {
    change(hash) {
      console.log("this.hash", this.hash);
      console.log("this.singleSpa: ", this.singleSpa);
      if (this.singleSpa) {
        this.singleSpa.navigateToUrl(`/#/page/${hash}`);
        // history.pushState({ state: hash }, hash, `/#/page/${hash}`);
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
