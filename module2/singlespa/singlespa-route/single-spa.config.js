/*
 * @Author: liuxin
 * @Date: 2021-08-04 16:27:49
 * @LastEditTime: 2021-08-04 16:35:43
 * @LastEditors: liuxin
 * @Description: 
 */
import { registerApplication, start } from "single-spa";
import {
  constructRoutes,
  constructApplications,
  constructLayoutEngine
} from "single-spa-layout";
const template = document.querySelector("#single-spa-template");

const layoutData = {
  props: {
    authToken: "78sf9d0fds89-0fysdiuf6sf8",
    userInfo: {
      name: "hello",
    },
  },
};
const resolvedRoutes = constructRoutes(template, layoutData);
console.log('resolvedRoutes: ', resolvedRoutes);

const applications = constructApplications({
  routes: resolvedRoutes,
  loadApp: (app) => import(`./${app.name}/src/main.js`)
})

const layoutEngine = constructLayoutEngine({
  routes: resolvedRoutes,
  applications: applications
})
console.log('applications: ', applications);
applications.forEach(registerApplication);

layoutEngine.activate();
start();

window.addEventListener("single-spa:before-app-change", (evt) => {
  console.log("before-app-change>>>", evt);
});
window.addEventListener("single-spa:before-routing-event", (evt) => {
  console.log("before-routing-event>>>>", evt, evt.detail.newAppStatuses);
});
window.addEventListener("single-spa:before-mount-routing-event", (evt) => {
  console.log("before-mount-routing-event>>>>", evt);
});