<!--
 * @Description: 
 * @Date: 2021-05-07 09:51:21
 * @LastEditTime: 2024-05-09 16:02:02
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\App.vue
-->
<template>
  <el-config-provider :locale="elementLocale">
    <!-- <el-button mb-2 @click="handleChangeLanguage">Switch Language</el-button> -->
    <el-container>
      <el-header>Header</el-header>
      <el-container class="wrapper">
        <el-aside width="200px">
          <BaseNav />
        </el-aside>
        <el-main>
          <div class="content-wrap">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>


<script>
import { provide, ref, computed } from 'vue'
import * as echarts from 'echarts'
import jsPlumb from 'jsplumb'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

import { useI18n } from 'vue-i18n'

import BaseNav from '@/components/BaseNav'

export default {
  name: 'App',
  components: {
    BaseNav,
  },
  setup() {
    provide('ec', echarts)
    provide('jsPlumb', jsPlumb)

    const { locale } = useI18n()

    const language = ref('zh-cn')
    const elementLocale = computed(() =>
      language.value === 'zh-cn' ? zhCn : en
    )

    const toggle = () => {
      language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn'
      console.log(language.value)
    }

    const handleChangeLanguage = () => {
      locale.value = locale.value === 'zh' ? 'en' : 'zh'
    }
    return {
      elementLocale,
      toggle,
      handleChangeLanguage,
    }
  },
}
</script>

<style>
@import './assets/main.less';

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f0f0f0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

a {
  margin: 0 5px;
}

.el-aside {
  overflow-x: hidden !important;
  position: absolute;
  top: 60px;
  bottom: 0;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #2c3e50;
}

.el-main {
  margin: 0 0 0 200px;
}

.wrapper {
  height: calc(100% - 60px);
}

.content-wrap {
  margin: 0px;
  padding: 20px;
  background-color: #ccc;
  background: #fff;
  border-radius: 12px;
  overflow-x: hidden;
  min-height: 830px;
}
</style>
