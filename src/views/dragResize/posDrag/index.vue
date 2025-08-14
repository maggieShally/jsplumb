<!--
 * @Description: 
 * @Date: 2022-03-24 11:27:20
 * @LastEditTime: 2025-07-21 16:24:40
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\dragResize\posDrag\index.vue
-->
<template>
  <el-tabs v-model="panelName" >
    <el-tab-pane label="vuedraggable使用" name="vuedraggable">
      <div>
        <div>
          vuedraggable使用 ——不同component drag组相互拖动,
          左边向右边拖动，不可重复，右边元素不可拖动
        </div>
        <PosLeft @onActive="val => handleActive('leftActive', val)" />
        <PosRight
          @onActive="handleActive('rightActive')"
          :dragInfo="leftActivInfo"
          :hasAcitve="leftActive"
        />
      </div>
    </el-tab-pane>
    <el-tab-pane label="js移动缩放" name="JSDrag">
      <JSDrag />
    </el-tab-pane>
    <el-tab-pane label="offsetWidth" name="offsetWidth">
      <OffsetWidthCom />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { reactive, toRefs } from 'vue'
import PosLeft from './PosLeft'
import PosRight from './PosRight'
 
import  OffsetWidthCom from './OffsetWidthCom'

import JSDrag from './JSDrag'
export default {
  name: 'PosDrag',
  components: {
    PosLeft,
    PosRight,
    JSDrag,
    OffsetWidthCom
  },
  setup() {
    const state = reactive({
      leftActive: Date.now(),
      rightActive: Date.now(),
      leftActivInfo: {},

      panelName: 'JSDrag'
    })

    const handleActive = (type, activeInfo) => {
      console.log(type, activeInfo)
      state.leftActivInfo = activeInfo
      state[type] = Date.now()
    }

    return {
      ...toRefs(state),
      handleActive
    }
  }
}
</script>

<style></style>
