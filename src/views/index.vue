<!--
 * @Description: 
 * @Date: 2022-04-27 17:55:50
 * @LastEditTime: 2024-09-29 15:40:17
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\index.vue
-->
<template>
  <el-config-provider :locale="elementLocale">
    <!-- <el-button mb-2 @click="handleChangeLanguage">Switch Language</el-button> -->
    <el-container style="height: 100%;">
      <el-header style="height: 40px;">Header</el-header>
      <el-container class="wrapper">
        <el-aside width="200px">
          <BaseNav />
        </el-aside>
        <el-main>
          <div class="content-wrap">
            <div style="height: 100%; overflow: auto">
              <router-view></router-view>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script>
import { provide, ref, computed } from 'vue'
import jsPlumb from 'jsplumb'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

import { useI18n } from 'vue-i18n'

import BaseNav from '@/components/BaseNav'

export default {
  name: 'RouterIndex',
  components: {
    BaseNav,
  },
  setup() {
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
a {
  margin: 0 5px;
}

.el-aside {
  overflow-x: hidden !important;
  position: absolute;
  top: 40px;
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
  height: calc(100% - 40px);
}

.content-wrap {
  margin: 0px;
  padding: 20px;
  background-color: #ccc;
  background: #fff;
  border-radius: 12px;
  height: 100%;
  overflow: hidden;
}
</style>
