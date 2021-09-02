<!--
 * @Description: 
 * @Date: 2021-08-10 11:26:02
 * @LastEditTime: 2021-09-02 09:47:19
 * @FilePath: \jsplumb-test\src\views\echarts\node-setting.vue
-->
<template>
  <el-form :model="editForm" label-width="80px">
    <el-form-item label="标题" props="title">
      <el-input v-model="editForm.title" />
    </el-form-item>
    <!-- <el-form-item label="X轴" props="xData">
      <el-select v-model="editForm.xData">
        <el-option label="日期" :value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="y轴" props="yData">
      <el-select v-model="editForm.yData" multiple value-key="label">
        <el-option label="苹果销量" :value="{label: '苹果销量', value: [220, 100, 150, 40, 30, 410, 130]}"></el-option>
        <el-option label="荔枝销量" :value="{label: '荔枝销量', value: [210, 200, 450, 340, 230, 310, 730]}"></el-option>
        <el-option label="草莓销量" :value="{label: '草莓销量', value: [120, 400, 550, 440, 430, 110, 230]}"></el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item>
      <el-button type="primary" @click="handleGetOpton">设 置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
export default {
  name: 'ChartSetting',
  props: {
    data: Object,
  },
  setup(props, context) {
    const state = reactive({
      editForm: {
        title: '',
        // xData: '',
        // yData: '',
      },
    })

    const handleGetOpton = () => {
      // const { yData, xData } = state.editForm
      // console.log(state.editForm)
      // context.emit('getOptions', state.editForm)
    }

    // watch(
    //   () => props.data,
    //   value => {
    //     console.log(value)
    //     if (!value) return false
        // state.editForm = {
        //   title: value.title?.text,
        //   xData: value.xAxis?.data
        //     ? {
        //         label: '日期',
        //         value: value.xAxis?.data,
        //       }
        //     : '',
        //   yData: value.series?.map((item, index) => {
        //     return {
        //       label: value.legend?.data[index],
        //       value: item.data,
        //     }
        //   }),
        // }
      // }
    // )

    return {
      ...toRefs(state),
      handleGetOpton,
    }
  },
}
</script>

<style>
</style>