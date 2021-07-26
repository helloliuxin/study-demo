<!--
 * @Author: liuxin
 * @Date: 2021-07-22 14:24:30
 * @LastEditTime: 2021-07-26 13:19:14
 * @LastEditors: liuxin
 * @Description: 
-->
<template>
  <div></div>
</template>

<script>
import { V2 } from "../components/RenderTemplate";
// import NewsList from "@/components/FishTemplate/components/NewsList.js";
import VIF from "@/components/RenderTemplate/components/v-if.js";

export default {
  name: "RenderTemplate",
  data() {
    return {
      page: 1,
      count: 50,
      template: `
      <div class= 'list'>  
        {{hello}}哈哈哈
      </div>`,
      info: {
        hello: "hello world",
      },
      vIfScope: {
        image:
          "http://cms-bucket.ws.126.net/2021/0201/9c211c79p00qnu1ff00h8c000s600e3c.png?imageView&thumbnail=140y88&quality=85",
        info: { showImage: true, showDate: false, name: "aaa" },
      },
    };
  },
  async mounted() {
    // let newslist = await this.getNewsList();
    // newslist = newslist.result;
    // console.log(newslist);

    const v2 = new V2().mounted(this.$el);
    // const { template, info } = this;
    // 渲染模板
    // v2.render(template, info);
    // v2.render(NewsList, { newslist });
    v2.render(VIF, this.vIfScope);
  },
  methods: {
    getNewsList() {
      return fetch("https://api.apiopen.top/getWangYiNews", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: this.page,
          count: this.count,
        }),
      }).then((response) => response.json());
    },
  },
};
</script>

<style lang="less">
.news-item {
  display: flex;
  width: 600px;
  height: 100px;
  justify-content: space-between;
}
</style>
