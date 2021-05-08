import { createApp } from 'vue'
import App from './App.vue'
import '@/views/ef/index.css'
import element from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import jsPlumb from 'jsplumb'

const app = createApp(App)
app.config.globalProperties.$jsPlumb = jsPlumb
app.use(element, { locale }).mount('#app')
