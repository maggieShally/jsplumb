/*
 * @Description:
 * @Date: 2021-05-07 09:51:21
 * @LastEditTime: 2024-06-25 10:13:41
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import element from 'element-plus'
import 'element-plus/dist/index.css'
import * as icons from '@element-plus/icons-vue'
import locale from "element-plus/es/locale/lang/zh-cn"

import i18n from './i18n/index'
import gridLayout from 'vue-grid-layout'

import router from './router/index.js'
import * as d3 from 'd3'

import vue3SeamlessScroll from 'vue3-seamless-scroll'
// 如果使用原生css3动画滚动组件时必须引入样式文件
import 'vue3-seamless-scroll/lib/vue3SeamlessScroll.css'

import "@antv/s2-vue/dist/style.min.css"

// import vGanttChart from 'v-gantt-chart'
import VueDragResize from 'vue-drag-resize'

// import ClickOutside from 'element-plus/lib/directives/click-outside/index.js'


import './assets/tailwindcss.css'

const app = createApp(App)

app.component('vue-drag-resize', VueDragResize)

app.config.globalProperties.$d3 = d3


Object.keys(icons).forEach(key => {
  app.component(key, icons[key])
})

// app.directive('click-outside', ClickOutside)

app
  // .use(vGanttChart)
  .use(element, { locale })
  .use(router)
  .use(vue3SeamlessScroll)
  .use(i18n)
  .use(gridLayout)
  .mount('#app')

// export function createApp() {
//   return { app , router}
// }
