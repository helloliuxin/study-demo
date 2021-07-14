<!--
 * @Author: liuxin
 * @Date: 2021-07-14 21:32:48
 * @LastEditTime: 2021-07-14 22:25:38
 * @LastEditors: liuxin
 * @Description: 主页
-->
<template>
  <div class="menu">
    <a href="/#/NumBaseConversion"><div class="item">NumBaseConversion</div></a>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="less" scoped>
.menu {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .item {
    border: 1px #e0e0e0 solid;
    background: #f0f0f0;
    width: 200px;
    height: 100px;
    margin: 10px;
    border-radius: 6px;
  }
}
</style>
