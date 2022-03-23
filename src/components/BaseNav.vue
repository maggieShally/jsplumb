<!--
 * @Description: 
 * @Date: 2021-08-10 14:04:48
 * @LastEditTime: 2021-09-02 17:13:07
 * @FilePath: \jsplumb-test\src\components\BaseNav.vue
-->
<template>
  <el-menu default-active="2" class="menu-wrap" background-color="#2c3e50" text-color="#fff" active-text-color="#ffd04b" :router="true">
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
</template>

<script>
import { menuList } from '@/router'
import { reactive, toRefs } from 'vue'
export default {
  name: 'NavCom',
  setup() {
    console.log(menuList)
    const state = reactive({
      menuList: menuList,
    })
    return {
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