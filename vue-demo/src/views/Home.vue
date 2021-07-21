<!--
 * @Author: liuxin
 * @Date: 2021-07-14 21:32:48
 * @LastEditTime: 2021-07-21 22:20:44
 * @LastEditors: liuxin
 * @Description: 主页
-->
<template>
  <div class="menu">
    <a href="/#/NumBaseConversion"><div class="item">进制转换</div></a>
    <a href="/#/ImgGrayscaleProcessing"><div class="item">图片灰度处理</div></a>
    <a href="/#/TopK"><div class="item">数组中第 K 大的元素</div></a>
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
