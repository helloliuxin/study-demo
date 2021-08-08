<!--
 * @Author: liuxin
 * @Date: 2021-08-05 13:34:41
 * @LastEditTime: 2021-08-07 18:52:40
 * @LastEditors: liuxin
 * @Description: 
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import NProgress from "nprogress";
export default {
  name: 'App',
  data () {
    return {
      isLoading: true,
    }
  },
  watch: {
    isLoading (val) {
      if (val) {
        NProgress.start()
      } else {
        this.$nextTick(() => {
          NProgress.done()
        })
      }
    }
  },
  created () {
    NProgress.start()
  }
}
</script>


<style lang="scss">
html,
body {
  margin: 0 !important;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
