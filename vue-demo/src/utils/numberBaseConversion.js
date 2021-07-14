/*
 * @Author: liuxin
 * @Date: 2021-07-14 22:09:41
 * @LastEditTime: 2021-07-14 23:25:42
 * @LastEditors: liuxin
 * @Description: 十进制转其他进制
 */
/**
 * @description: 进制转换
 * @param {number} num 要处理的数字
 * @param {number} radix 目标进制
 * @param {number} precision 保留小数位数
 * @return {string} 结果
 */
export const numBaseConversion = (
  num,
  radix = 64,
  precision = 10,
  format = (arr) => arr.map((item) => `(${item})`).join("")
) => {
  console.log("precision: ", precision, radix, format);
  const sign = num < 0 ? -1 : 1; // 符号
  let decimal = (sign * num) % 1; // 小数部分
  let integer = sign * num - decimal; // 整数部分

  let digit,
    tmp,
    intArr = [],
    decArr = [];

  // 处理整数部分
  while (integer > 0) {
    digit = integer % radix;
    integer = (integer - digit) / radix;
    intArr.unshift(digit);
  }

  // 处理小数部分
  while (precision > 0) {
    decimal = decimal * radix;
    if (decimal >= 1) {
      tmp = decimal % 1;
      digit = decimal - tmp;
      decimal = tmp;
      decArr.push(digit);
    } else {
      decArr.push(0);
    }
    --precision;
  }

  intArr.length === 0 && intArr.push(0); // 如果整数位没有值补位
  const signString = sign > 0 ? "" : "-";
  const intString = format(intArr);
  const decString = `.${format(decArr)}`;
  return signString + intString + decString;
};
