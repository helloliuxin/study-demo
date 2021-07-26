/*
 * @Author: liuxin
 * @Date: 2021-07-22 14:46:38
 * @LastEditTime: 2021-07-23 14:40:14
 * @LastEditors: liuxin
 * @Description:
 */
import Engine from "./engine";

export default class V2 {
  constructor() {
    this.root = null;
    this.engine = new Engine();
  }

  render(template, data) {
    let dom = this.engine.render(template.render(), data);
    console.log("dom: ", dom);
    this.root.appendChild(dom);
  }

  mounted(dom) {
    this.root = dom;
    return this;
  }
}
