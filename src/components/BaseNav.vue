<!--
 * @Description: 
 * @Date: 2021-08-10 14:04:48
 * @LastEditTime: 2025-07-21 16:43:43
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\components\BaseNav.vue
-->
<template>
  <el-scrollbar height="100%" style="background-color:#2c3e50;">
    {{onRoutes}}
    <el-menu class="menu-wrap" background-color="#2c3e50" text-color="#fff" :default-active="onRoutes" router active-text-color="#ffd04b">
      <template v-for="menuItem in menuList" :key="menuItem.index">
        <el-sub-menu :index="menuItem.index" v-if="menuItem.children">
          <template #title>
            <i :class="`iconfont ${menuItem.icon}`"></i>
            <span>{{ menuItem.title }}</span>
          </template>
          <template v-for="subMenuItem in menuItem.children" :key="subMenuItem.index">
            <el-menu-item :index="subMenuItem.index">{{ subMenuItem.title }}</el-menu-item>
          </template>
        </el-sub-menu>

        <el-menu-item v-else :index="menuItem.index">
          <i :class="`iconfont ${menuItem.icon}`"></i>
          <template #title>{{ menuItem.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>

  </el-scrollbar>
</template>

<script>

import { reactive, toRefs, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { menuList } from '@/router'

export default {
  name: 'NavCom',
  setup() {
    console.log(menuList)
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      menuList: menuList,
    })

    const onRoutes  = computed(() => {
      return route.path
    })

    return {
      onRoutes,
      ...toRefs(state),
    }
  },
}
</script>

<style lang="less" scoped>
.menu-wrap {
  width: 200px;
  display: inline-block;
  text-align: left;
  height: 100%;
}

.iconfont {
  margin-right: 5px;
}
</style>