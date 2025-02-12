<!--
 * @Description: 
 * @Date: 2024-12-09 15:23:38
 * @LastEditTime: 2025-01-03 09:49:48
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\tailwindcss\index.vue
-->
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="testCss" name="testCss">
      <TestCss />
    </el-tab-pane>
    <el-tab-pane label="virtualList" name="virtualList">
      <virtualList />
    </el-tab-pane>
    <el-tab-pane label="camera" name="camera">
      <CameraCom />
    </el-tab-pane>
    <el-tab-pane label="jumping" name="jumping">
      <Jumping />
    </el-tab-pane>
    <el-tab-pane label="TestCeil" name="TestCeil">
      <TestCeil />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import TestCss from './testCss/index.vue'
import virtualList from './virtualList/index.vue' 
import CameraCom from './camera/index.vue'

import Jumping from './marcCodeTest/index.vue'
import TestCeil from './testCeil/index.vue'

export default {
  name: '',
  components: {
    TestCss,
    virtualList,
    CameraCom,
    Jumping
  },
  props: {
  },
  setup() {
    const state = reactive({
      activeName: "TestCeil"
    })
    onMounted(() => {
    })
    return {
      ...toRefs(state),
    }
  },
}

</script>
<style scoped lang='less'>
</style>