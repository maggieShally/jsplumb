<!--
 * @Description: 
 * @Date: 2022-05-30 17:18:20
 * @LastEditTime: 2023-02-27 15:05:17
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\combineChart\index.vue
-->
<template>

  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="单线" name="sigle">
      
      <SigleCom />
    </el-tab-pane>
    <el-tab-pane label="多线" name="multiple">
      <MultipleCom />

    </el-tab-pane>
  <el-tab-pane label="多线" name="multiple2">
      <MultipleCom2 />

    </el-tab-pane>
  </el-tabs>


</template>

<script>
import { reactive, toRefs, nextTick } from 'vue'
import { weeks, columns } from './data.js'

import TableNextModal from './Table.modal.vue'

import SigleCom from './SigleCom.vue'
import MultipleCom from './MultipleCom.vue'
import MultipleCom2 from './MultipleCom2.vue'

export default {
  name: 'Table',
  components: {
    SigleCom,
    MultipleCom,
    MultipleCom2
  },
  setup() {
    
    const state =reactive({
      activeName: 'sigle'
    })

    return {
      ...toRefs(state),
    
    }
  },
}
</script>

<style lang="less" scoped>
</style>
