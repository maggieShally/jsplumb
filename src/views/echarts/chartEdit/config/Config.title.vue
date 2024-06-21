

<template>
  <el-form-item label="是否显示">
    <el-switch v-model="chartOptions.title.show"></el-switch>
  </el-form-item>
  <el-form-item label="标题">
    <el-input v-model="chartOptions.title.text"></el-input>
  </el-form-item>
  <el-form-item label="字体">
    <el-input v-model="chartOptions.title.textStyle.fontSize"></el-input>
  </el-form-item>
  <el-form-item label="位置">
    <el-select v-model="chartOptions.title.left">
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
  name: 'ConfigTitleCom',
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