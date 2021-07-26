/*
 * @Author: liuxin
 * @Date: 2021-07-22 14:46:16
 * @LastEditTime: 2021-07-26 13:18:30
 * @LastEditors: liuxin
 * @Description:
 */
import Vnode from "./vnode";

export default class Engine {
  constructor() {
    this.nodes = new Map(); // uuid: node节点
  }
  // "<div class= 'list'>{{hello}}</div>"
  // {hello: "hello world"}
  render(template, data) {
    console.log("template, data: ", template, data);
    let re1 = /<(\w+)\s*([^>]*)>([^<]*)<\/\1>/gm;
    let re2 = /<(\w+)\s*([^(/>)]*)\/>/gm;
    template.replace(/\n/gm, ""); // 去除换行
    console.log("去除换行template: ", template);
    while (re1.test(template) || re2.test(template)) {
      template = template.replace(re1, (s0, s1, s2, s3) => {
        let attr = this.parseAttribute(s2);
        let node = new Vnode(s1, attr, [], null, s3);
        this.nodes.set(node.uuid, node);
        return `(${node.uuid})`;
      });

      template = template.replace(re2, (s0, s1, s2) => {
        let attr = this.parseAttribute(s2);
        let node = new Vnode(s1, attr, [], null, "");
        this.nodes.set(node.uuid, node);
        return `(${node.uuid})`;
      });
    }
    console.log("template: ", template);
    console.log("第一阶段|解析创建node>>>", this.nodes);
    this.rootNode = this.parseToNode(template);
    console.log("第二阶段解析生成nodeTree>>>", this.rootNode);
    let dom = this.parseNodeToDom(this.rootNode, data);
    console.log("第三阶段nodeTree To domTree>>>", dom);
    return dom; // 返回一个dom
  }

  // 你要生成nodeTree,首先肯定创建一个`root`节点，然后递归循环，将其children和parent关联起来;用队列quene来存储节点容器用于判断遍历
  parseToNode(template) {
    // (kuqtpy4p.p4a)
    let re = /\((.*?)\)/g;
    let parent = new Vnode("root", {}, [], null, template);
    const quene = [];
    quene.push(parent);
    while (quene.length > 0) {
      let pnode = quene.shift();
      let nodestr = pnode.childrenTemplate.trim();
      // 正则表达式对象的lastIndex属性：https://www.cnblogs.com/2050/archive/2012/06/26/2563555.html
      re.lastIndex = 0;
      [...nodestr.matchAll(re)].forEach((item) => {
        let node = this.nodes.get(item[1]);
        // 为什么要创建新的节点,主要是赋值父节点的值
        const newnode = new Vnode(
          node.tag,
          node.attr,
          [],
          pnode,
          node.childrenTemplate
        );
        pnode.children.push(newnode); // 接上children指针
        quene.push(newnode);
      });
    }
    // 返回nodeTree
    return parent.children[0];
  }

  parseNodeToDom(rootNode, data) {
    const fragment = document.createDocumentFragment();
    // 也是使用队列来创建dom树,传入root节点，创建dom,如果有chilren,加入队列，while条件就是队列长度是否为0
    const quene = [];
    quene.push([rootNode, fragment, data]); // 初始化
    while (quene.length > 0) {
      const [vnode, pdom, scope] = quene.shift();
      if (vnode.attr.get("for")) {
        console.log("走for循环");
        // 先创建一个ele作为pdom
        // 首先需要先拿到全局的作用域 newslist, 然后根据newslist循环创建
        let [key, prop] = vnode.attr.get("for").split("in");
        key = key.trim(); // item
        prop = prop.trim(); // newslist
        for (let i = 0; i < scope[prop].length; i++) {
          let newnode = new Vnode(
            vnode.tag,
            vnode.attr,
            vnode.children,
            vnode.parent,
            vnode.childrenTemplate
          );
          let newScope = {}; // 它的作用域
          newScope[key] = scope[prop][i];
          let html = this.scopehtmlParse(newnode, data, newScope);
          let ele = this.createElement(newnode, html);
          this.scopeAttrParse(ele, newnode, data, newScope);
          pdom.appendChild(ele);
          newnode.children.forEach((cnode) => {
            quene.push([cnode, ele, newScope]);
          });
        }
      } else if (vnode.attr.get("v-if")) {
        // 判断v-if是否渲染dom
        const visibleResult = this.getEleStatus(vnode, data, scope);
        console.log("resultV-IF: ", visibleResult);
        if (visibleResult) {
          // 获取html,解析{{}}语法
          let html = this.scopehtmlParse(vnode, data, scope);
          console.log("html: ", html);
          let ele = this.createElement(vnode, html);
          // 有些属性值上面也用了{{语法}} 也需要解析  例如：<img src="item.img"/>
          this.scopeAttrParse(ele, vnode, data, scope);
          // 将创建的ele加入到父节点中
          pdom.appendChild(ele);

          vnode.children.forEach((cnode) => {
            quene.push([cnode, ele, scope]);
          });
        }
      } else {
        // 获取html,解析{{}}语法
        let html = this.scopehtmlParse(vnode, data, scope);
        console.log("html: ", html);
        let ele = this.createElement(vnode, html);
        // 有些属性值上面也用了{{语法}} 也需要解析  例如：<img src="item.img"/>
        this.scopeAttrParse(ele, vnode, data, scope);
        // 将创建的ele加入到父节点中
        pdom.appendChild(ele);

        vnode.children.forEach((cnode) => {
          quene.push([cnode, ele, scope]);
        });
      }
    }
    return fragment;
  }

  scopehtmlParse(node, globalScope, currentScope) {
    console.log("template111: ", node.childrenTemplate);
    let re = /\{\{(.*?)\}\}/gm;
    let html = node.childrenTemplate.replace(re, (s0, s1) => {
      console.log("s0, s1: ", s0, s1);
      let props = s1.split("."); // item.name.age
      let val = currentScope[props[0]] || globalScope[props[0]];
      props.slice(1).forEach((item) => {
        val = val[item];
      });
      return val;
    });
    return html;
  }

  createElement(node, html) {
    let ignoreAttr = ["for", "click", "v-if"];
    const { tag, attr } = node;
    let element = document.createElement(tag);
    for (let [key, value] of attr) {
      if (!ignoreAttr.includes(key)) {
        element.setAttribute(key, value);
      }
    }
    if (node.children.length === 0) {
      element.innerHTML = html;
    }
    return element;
  }

  scopeAttrParse(element, node, globalScope, currentScope) {
    let { attr } = node;
    let re = /\{\{(.*?)\}\}/gm;
    for (let [key, value] of attr) {
      let result = re.exec(value);
      if (result && result[1].split(".")) {
        let props = result[1].split(".");
        let val = currentScope[props[0]] || globalScope[props[0]];
        props.slice(1).forEach((item) => {
          val = val[item];
        });
        element.setAttribute(key, val);
      }
    }
  }

  getEleStatus(node, globalScope, currentScope) {
    let { attr } = node;
    let props = attr.get("v-if").split(".");
    let val = currentScope[props[0]] || globalScope[props[0]];
    props.slice(1).forEach((item) => {
      val = val[item];
    });
    return Boolean(val);
  }

  parseAttribute(str) {
    let attr = new Map();
    str = str.trim();
    let re = /([\w-]+)\s*=\s*['"](.*?)['"]/gm;
    str.replace(re, (s0, s1, s2) => {
      attr.set(s1, s2);
      return s0;
    });
    return attr;
  }
}
