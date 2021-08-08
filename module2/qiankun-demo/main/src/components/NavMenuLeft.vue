<!--
 * @Author: liuxin
 * @Date: 2021-08-08 15:50:50
 * @LastEditTime: 2021-08-08 17:24:42
 * @LastEditors: liuxin
 * @Description: 
-->
<template>
  <div class="nav-meun">
    <el-menu
      :default-active="microApps[0].activeRule"
      class="el-menu-vertical-demo"
      :router="true"
    >
      <el-menu-item
        v-for="item in microApps"
        :key="item.name"
        :index="item.activeRule"
      >
        <i :class="item.icon"></i>
        <span slot="title">子应用{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavMenuLeft",
  props: {
    microApps: {
      type: Array,
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.nav-meun {
  width: 100%;
  height: 100%;
  .el-menu {
    height: 100%;
  }
}
</style>
