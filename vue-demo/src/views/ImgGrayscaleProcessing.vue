<!--
 * @Author: liuxin
 * @Date: 2021-07-14 23:46:21
 * @LastEditTime: 2021-07-15 03:44:19
 * @LastEditors: liuxin
 * @Description: 本地读取图片灰度处理
-->
<template>
  <div class="graycale">
    ImgGrayscaleProcessing
    <hr />
    <div>
      选择图片：
      <input
        type="file"
        id="fileElem"
        multiple
        accept="image/*"
        style="display: none"
        @change="handleFiles($event)"
      />
      <a href="#" id="fileSelect">Select some files</a>
    </div>
    <div class="box">
      <div id="fileList">
        <p>No files selected!</p>
      </div>
      <div class="gray-img">
        <p>灰度图：</p>
        <canvas id="paper" width="0" height="0"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
const imageDataContext = new WeakMap();
window.URL = window.URL || window.webkitURL;

export default {
  name: "ImgGrayscaleProcessing",
  data() {
    return {};
  },
  mounted() {
    const fileSelect = document.getElementById("fileSelect");
    const fileElem = document.getElementById("fileElem");

    fileSelect.addEventListener(
      "click",
      function (e) {
        console.log("e: ", e);

        if (fileElem) {
          fileElem.click();
        }
        e.preventDefault(); // prevent navigation to "#"
      },
      false
    );
  },
  methods: {
    handleFiles(event) {
      const fileList = document.getElementById("fileList");
      const canvas = document.getElementById("paper");
      const context = canvas.getContext("2d");
      const files = event.target.files;
      const { getImageData, traverse } = this;
      console.log("files: ", files);
      if (!files.length) {
        fileList.innerHTML = "<p>No files selected!</p>";
      } else {
        fileList.innerHTML = "<p>原图: </p>";
        var list = document.createElement("div");
        fileList.appendChild(list);
        for (var i = 0; i < files.length; i++) {
          var div = document.createElement("div");
          list.appendChild(div);
          var img = document.createElement("img");
          img.src = window.URL.createObjectURL(files[i]);
          img.onload = function () {
            console.log("img: ", img, img.width, img.height);
            const imageData = getImageData(img);
            console.log("imageData: ", imageData);
            // 遍历 imageData 数据对象
            traverse(imageData, ({ r, g, b, a }) => {
              // 对每个像素进行灰度化处理
              const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
              return [v, v, v, a];
            });
            // 更新canvas内容
            canvas.width = imageData.width;
            canvas.height = imageData.height;
            context.putImageData(imageData, 0, 0);
            window.URL.revokeObjectURL(this.src);
          };
          div.appendChild(img);
          var info = document.createElement("p");
          info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
          div.appendChild(info);
        }
      }
    },

    // 获得图片的 imageData 数据
    getImageData(img, rect = [0, 0, img.width, img.height]) {
      let context;
      if (imageDataContext.has(img)) context = imageDataContext.get(img);
      else {
        // OffscreenCanvas提供了一个可以脱离屏幕渲染的canvas对象。它在窗口环境和web worker环境均有效
        const canvas = new OffscreenCanvas(img.width, img.height);
        context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);
        imageDataContext.set(img, context);
      }
      return context.getImageData(...rect);
    },

    // 循环遍历 imageData 数据
    traverse(imageData, pass) {
      console.log("pass: ", pass);
      const { width, height, data } = imageData;
      console.log("data: ", data);
      for (let i = 0; i < width * height * 4; i += 4) {
        const [r, g, b, a] = pass({
          r: data[i] / 255,
          g: data[i + 1] / 255,
          b: data[i + 2] / 255,
          a: data[i + 3] / 255,
          index: i,
          width,
          height,
          x: ((i / 4) % width) / width,
          y: Math.floor(i / 4 / width) / height
        });
        data.set(
          [r, g, b, a].map((v) => Math.round(v * 255)),
          i
        );
      }
      return imageData;
    }
  }
};
</script>

<style lang="less">
.box {
  display: flex;
  #fileList {
    flex: 1;
  }
  .gray-img {
    flex: 1;
  }
}
</style>
