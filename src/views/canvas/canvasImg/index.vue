<!--
 * @Description: 
 * @Date: 2021-07-21 15:50:58
 * @LastEditTime: 2024-10-16 14:41:46
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\canvas\canvasImg\index.vue
-->
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane name="first" label="svg">
      <SVGCom />
    </el-tab-pane>
    <el-tab-pane name="second" label="test">
      
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import SVGCom from './SVGCom.vue'

export default {
  name: 'canvasImg',
  components: {
    SVGCom
  },
  setup() {
    const state = reactive({
      activeName: 'first'
    })

    onMounted(() => {
      state.info = {
        name: '123'
      }
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style></style>