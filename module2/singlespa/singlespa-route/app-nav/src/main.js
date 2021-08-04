/*
 * @Author: liuxin
 * @Date: 2021-08-04 15:53:23
 * @LastEditTime: 2021-08-04 17:00:44
 * @LastEditors: liuxin
 * @Description: 
 */
import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';

import App from './App.vue';

Vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecyle-props
          // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
          /*
          name: this.name,
          mountParcel: this.mountParcel,
          */
          singleSpa: this.singleSpa,
        },
      });
    },
  },
});

export function bootstrap() {
  console.log("nav bootstrap>>>");
  return vueLifecycles.bootstrap();
}

export function mount(props) {
  console.log("nav mount>>>");
  return vueLifecycles.mount(props);
}

export function unmount() {
  console.log("nav unmount>>>");
  return vueLifecycles.unmount();
}