<!--
 * @Description: 类目轴
 * @Date: 2024-05-21 16:58:11
 * @LastEditTime: 2024-05-21 17:08:20
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\config\Config.xAxis.vue
-->

<template>
  <el-form-item label="显示标签">
    <el-switch v-model="chartOptions.xAxis[0].axisLabel.show"></el-switch>
  </el-form-item>
  <el-form-item label="字体大小">
    <el-input v-model="chartOptions.xAxis[0].axisLabel.fontSize"></el-input>
  </el-form-item>
  <el-form-item label="宽度">
    <el-input v-model="chartOptions.xAxis[0].axisLabel.width"></el-input>
  </el-form-item>
 
</template>

<script>
import { onMounted } from 'vue'
import { useVModel } from '@vueuse/core'

export default {
  name: 'ConfigXAxisCom',
  props: {
    options: Object
  },
  emits: ['update:options'],
  setup(props, context) {
    const chartOptions = useVModel(props, 'options', context.emit)
    
    return {
      chartOptions
    }
  }
}
</script>

<style></style>