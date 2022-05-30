/*
 * @Description: 
 * @Date: 2022-04-27 09:55:27
 * @LastEditTime: 2022-04-27 18:04:01
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\router\viewPanel.js
 */
import { createRouter, createWebHistory } from 'vue-router'


import ViewPanel from "../views/pages/panel/index.vue";
 
 
const routes = [{
    path: "/",
    name: "advertising",
    component: ViewPanel
  },
];


const router = createRouter({
  history: createWebHistory('/viewPanel'),
  routes
})

export default router