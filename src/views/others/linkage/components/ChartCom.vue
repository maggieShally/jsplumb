<!--
 * @Description: 
 * @Date: 2022-07-15 16:43:48
 * @LastEditTime: 2023-03-31 11:01:23
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\linkage\components\ChartCom.vue
-->
<template>
  <ScreenFullCom @onExit="handleExit" :unitKey="unitKey" :placement="placement">
    <el-form :model="addForm" :inline="true">
      <el-form-item label="名称">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="age">
        <el-input v-model="addForm.age"></el-input>
      </el-form-item>
      <el-form-item label="下拉">
        <el-select v-model="addForm.type">
          <el-option value="1" label="111"></el-option>
          <el-option value="3" label="333"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <BaseChart ref="chartRef" :name="`A_${Date.now()}`" :seriesData="seriesData" />
  </ScreenFullCom>
</template>

<script>
import { reactive, toRefs, ref, nextTick } from 'vue'

import BaseChart from '@/components/BaseChart'
import ScreenFullCom from '@/components/screenFull'

import { countOption } from './ApiChart.data.js'

export default {
  name: 'ChartCom',
  components: {
    BaseChart,
    ScreenFullCom,
  },
  props: {
    unitKey: String,
    placement: String,
  },
  setup() {
    const chartRef = ref(null)
    const state = reactive({
      seriesData: countOption(),
      addForm: {
        name: '',
        age:'',
        type: 1,
      },
    })

    const handleExit = async () => {
      console.log('handleExit')
      await nextTick()
      chartRef.value.chartRef.chartResize()
    }

    const handleSubmit = () => {
      console.log(state.addForm)
    }


    return {
      chartRef,
      ...toRefs(state),
      handleExit,
      handleSubmit,
    }
  },
}
</script>

<style>
</style>