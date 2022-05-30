/*
 * @Description:
 * @Date: 2022-04-27 09:41:18
 * @LastEditTime: 2022-04-27 09:57:20
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\viewPanel.js
 */

import { createApp } from 'vue'
import ViewPanelApp from './ViewPanelApp.vue'
import element from 'element-plus'
import 'element-plus/dist/index.css'
import * as icons from '@element-plus/icons-vue'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import router from './router/viewPanel.js'
import * as d3 from 'd3'
import vue3SeamlessScroll from 'vue3-seamless-scroll'
// 如果使用原生css3动画滚动组件时必须引入样式文件
import 'vue3-seamless-scroll/lib/vue3SeamlessScroll.css'
import vGanttChart from 'v-gantt-chart'

import VueDragResize from 'vue-drag-resize'

const app = createApp(ViewPanelApp)

app.component('vue-drag-resize', VueDragResize)

app.config.globalProperties.$d3 = d3

Object.keys(icons).forEach(key => {
  app.component(key, icons[key])
})

app
  .use(vGanttChart)
  .use(element, { locale })
  .use(router)
  .use(vue3SeamlessScroll)
  .mount('#viewPanel')

// export function createApp() {
//   return { app , router}
// }
