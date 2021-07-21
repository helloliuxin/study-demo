/*
 * @Author: liuxin
 * @Date: 2021-07-21 22:01:31
 * @LastEditTime: 2021-07-21 22:31:26
 * @LastEditors: liuxin
 * @Description:
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
export const findKthLargest = function (nums, k) {
  // const newNums = nums.sort((a, b) => b - a);
  // return newNums[k - 1];
  const num = quickSort(nums, nums.length - k, 0);

  return num;
};

function quickSort(arr, targetIndex, start) {
  if (arr.length <= 1) return arr[0];
  let left = [];
  let right = [];
  const mid = Math.floor(arr.length / 2);
  const midNum = arr.splice(mid, 1)[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > midNum) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }

  if (left.length + start === targetIndex) {
    return midNum;
  } else if (left.length + start > targetIndex) {
    return quickSort(left, targetIndex, start);
  } else {
    return quickSort(right, targetIndex, left.length + start + 1);
  }
}
