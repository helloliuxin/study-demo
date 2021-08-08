/*
 * @Author: liuxin
 * @Date: 2021-08-05 13:34:41
 * @LastEditTime: 2021-08-06 01:06:08
 * @LastEditors: liuxin
 * @Description: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/*',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
