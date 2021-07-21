<!--
 * @Author: liuxin
 * @Date: 2021-07-21 22:10:04
 * @LastEditTime: 2021-07-21 22:33:27
 * @LastEditors: liuxin
 * @Description: 
-->
<template>
  <div>
    <div>输入数组: <input v-model="arr" type="text" /></div>
    输入序号：<input v-model="index" type="text" />
    <div>输出结果：{{ result }}</div>
    <button @click="findKthLargest">点击计算</button>
  </div>
</template>

<script>
import { findKthLargest } from "../utils/findKthLargest";
export default {
  name: "TopK",
  data() {
    return {
      arr: "3,2,1,5,6,4",
      index: 2,
      result: null,
    };
  },
  methods: {
    findKthLargest() {
      const { arr, index } = this;
      const nums = arr.split(",").map((num) => Number(num));
      this.result = findKthLargest(nums, index);
    },
  },
};
</script>

<style></style>
