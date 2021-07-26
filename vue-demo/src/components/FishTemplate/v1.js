/*
 * @Author: liuxin
 * @Date: 2021-07-21 23:06:01
 * @LastEditTime: 2021-07-21 23:11:41
 * @LastEditors: liuxin
 * @Description:
 */
import Engine from "./engine";

export default class TemplateV1 {
  constructor() {
    this.root = null;
    this.engine = new Engine();
  }

  render(com, data) {
    let dom = this.engine.render(com.render(), data);
    console.log("html>>>", dom);
    this.root.appendChild(dom);
  }

  mounted(dom) {
    this.root = dom;
    return this;
  }
}
