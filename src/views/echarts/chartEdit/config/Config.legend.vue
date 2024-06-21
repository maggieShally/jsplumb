<template>
  <el-form-item label="是否显示">
    <el-switch v-model="chartOptions.legend.show"></el-switch>
  </el-form-item>
  <el-form-item label="展示方式">
    <el-select v-model="chartOptions.legend.type">
      <el-option value="plain" label="正常"></el-option>
      <el-option value="scroll" label="滚动"></el-option></el-select>
  </el-form-item>
  <el-form-item label="字体">
    <el-input v-model="chartOptions.legend.textStyle.fontSize"></el-input>
  </el-form-item>
  <el-form-item label="位置">
    <el-select v-model="chartOptions.legend.left">
      <el-option value="auto" label="自动"></el-option>
      <el-option value="center" label="居中"></el-option>
      <el-option value="left" label="居左"></el-option>
      <el-option value="right" label="居右"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import { onMounted } from 'vue'
import { useVModel } from '@vueuse/core'

export default {
  name: 'ConfigLegendCom',
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