/*
 * @Description:
 * @Date: 2021-05-07 09:51:21
 * @LastEditTime: 2021-09-02 14:55:20
 * @FilePath: \jsplumb-test\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import element from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import router from './router'
import * as d3 from 'd3'
import vue3SeamlessScroll from 'vue3-seamless-scroll'
// 如果使用原生css3动画滚动组件时必须引入样式文件
import 'vue3-seamless-scroll/lib/vue3SeamlessScroll.css'
import VueDragResize from 'vue-drag-resize'

const app = createApp(App)

app.component('vue-drag-resize', VueDragResize)

app.config.globalProperties.$d3 = d3
app
  .use(element, { locale })
  .use(router)
  .use(vue3SeamlessScroll)
  .mount('#app')

  // export function createApp() {
  //   return { app , router}
  // }