/*
 * @Author: liuxin
 * @Date: 2021-07-23 17:27:17
 * @LastEditTime: 2021-07-26 10:55:34
 * @LastEditors: liuxin
 * @Description:
 */
export default {
  render() {
    return `
    <div class="newslist">
      <div class="img" v-if="info.showImage"><img src="{{image}}"/></div>
      <div class="date" v-if="info.showDate">不可见{{info.name}}</div>
      <div class="img">可见{{info.name}}</div>
    </div>`;
  },
};
