<!--
 * @Description: 
 * @Date: 2021-06-28 11:53:12
 * @LastEditTime: 2021-07-01 15:24:17
 * @FilePath: \jsplumb-test\src\views\D3\index.vue
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