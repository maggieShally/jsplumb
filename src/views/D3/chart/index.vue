<!--
 * @Description: 
 * @Date: 2021-06-28 11:53:12
 * @LastEditTime: 2022-06-14 11:19:20
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
      <Four />
    </el-col>
  </el-row>
  <el-row :gutter="24">
    <el-col :span="6">
      <D3PieChart />
    </el-col>
    <el-col :span="6">
      <D3HistgramChart />
    </el-col>

  </el-row>
</template>

<script setup>
import First from './components/First.vue'
import Second from './components/Second.vue'
import Third from './components/Third.vue'
import Four from './components/Four.vue'
import D3PieChart from './components/D3PieChart.vue'
import D3HistgramChart from './components/D3HistgramChart.vue'
</script>

<style>
</style>