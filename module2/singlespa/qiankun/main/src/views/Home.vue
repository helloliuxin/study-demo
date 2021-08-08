<!--
 * @Author: liuxin
 * @Date: 2021-08-05 13:34:41
 * @LastEditTime: 2021-08-07 18:53:05
 * @LastEditors: liuxin
 * @Description: 
-->
<template>
  <div class="layout-wrapper">
    <div class="layout-header">
      <div class="logo">QIANKUN-EXAMPLE</div>
      <ul class="sub-apps">
        <li
          v-for="item in microApps"
          :class="{ active: item.activeRule === current }"
          :key="item.name"
          @click="goto(item)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="userinfo">主应用的state: {{ JSON.stringify(user) }}</div>
    </div>
    <div id="subapp-viewport"></div>
  </div>
</template>

<script>
import microApps from "../micro-app";
// import NProgress from "nprogress";
import store from "@/store";
export default {
  name: "Home",
  data() {
    return {
      // isLoading: true,
      microApps,
      current: "/sub-vue/"
    };
  },
  computed: {
    user() {
      return store.getGlobalState("user");
    }
  },
  // watch: {
  //   isLoading(val) {
  //     if (val) {
  //       NProgress.start();
  //     } else {
  //       this.$nextTick(() => {
  //         NProgress.done();
  //       });
  //     }
  //   }
  // },
  created() {
    this.bindCurrent();
    // NProgress.start();
  },
  mounted() {
    this.listenRouterChange();
    console.log('microApps: ', this.microApps);
  },
  methods: {
    goto(item) {
      console.log("item: ", item);
      history.pushState(null, item.activeRule, item.activeRule);
      // this.current = item.activeRule
    },
    bindCurrent() {
      const path = window.location.pathname;
      if (this.microApps.findIndex((item) => item.activeRule === path) >= 0) {
        this.current = path;
        console.log("this.current: ", this.current);
      }
    },
    listenRouterChange() {
      const _wr = function(type) {
        const orig = history[type];
        return function() {
          const rv = orig.apply(this, arguments);
          // 在window创建一个自定义的pushState事件并调用,因为history.pushState不会触发popstate事件
          const e = new Event(type);
          e.arguments = arguments;
          window.dispatchEvent(e);
          return rv;
        };
      };
      // 重写了pushState方法
      history.pushState = _wr("pushState");
      // 监听pushState和popstate事件
      window.addEventListener("pushState", this.bindCurrent);
      window.addEventListener("popstate", this.bindCurrent);
      // 清理事件监听
      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("pushState", this.bindCurrent);
        window.removeEventListener("popstate", this.bindCurrent);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  .layout-header {
    height: 50px;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    line-height: 50px;
    position: relative;
    .logo {
      float: left;
      margin: 0 50px;
    }
    .sub-apps {
      float: left;
      list-style: none;
      margin: 0;
      li {
        list-style: none;
        display: inline-block;
        padding: 0 20px;
        cursor: pointer;
        &.active {
          color: #42b983;
          text-decoration: underline;
        }
      }
    }
    .userinfo {
      position: absolute;
      right: 100px;
      top: 0;
    }
  }
}
</style>
