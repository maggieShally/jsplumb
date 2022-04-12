<!--
 * @Description: 
 * @Date: 2021-06-28 11:53:12
 * @LastEditTime: 2022-04-12 09:45:58
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\chart\index.vue
-->

<template>
  <el-row :gutter="24">
    <el-col :span="6">
      <First />
    </el-col>
    <el-col :span="6">
      <Second />
    </el-col>
    <el-col :span="6">
      <Third />
    </el-col>
    <el-col :span="6">
    </el-col>
  </el-row>
</template>

<script setup>
import First from './components/First.vue'
import Second from './components/Second.vue'
import Third from './components/Third.vue'
</script>

<style>
</style>