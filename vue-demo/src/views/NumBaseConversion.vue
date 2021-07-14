<!--
 * @Author: liuxin
 * @Date: 2021-07-14 21:43:43
 * @LastEditTime: 2021-07-14 22:25:20
 * @LastEditors: liuxin
 * @Description: 
-->
<template>
  <div class="base-conversion">
    NumBaseConversion
    <hr />
    <ul>
      <li>
        <label for="number"> 要转换的10进制数 </label>
        <input id="number" type="number" v-model="number" />
      </li>
      <li>
        <label for="radix"> 目标进制 </label>
        <input id="radix" type="number" v-model="radix" />
      </li>
      <li>
        <label for="precision"> 保留小数位数 </label>
        <input id="precision" type="number" v-model="precision" />
      </li>
    </ul>
    <div class="btn" @click="compute">开始计算</div>
    <hr />
    <div class="result">计算结果：{{ result }}</div>
  </div>
</template>

<script>
import { numBaseConversion } from "../utils/numberBaseConversion";
export default {
  name: "NumBaseConversion",
  data() {
    return {
      number: null,
      radix: 64,
      precision: 10,
      result: null,
    };
  },
  methods: {
    compute() {
      const { number, radix, precision } = this;
      this.result = numBaseConversion(number, radix, precision);
    },
  },
};
</script>

<style lang="less" scoped>
li {
  list-style: none;
  margin-bottom: 10px;
  text-align: left;
}
label {
  display: inline-block;
  width: 150px;
  padding-right: 10px;
  -moz-text-align-last: right;
  text-align-last: right;
  vertical-align: middle;
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  background: lightgreen;
  margin: 10px;
  cursor: pointer;
}
.result {
  text-align: left;
}
</style>
