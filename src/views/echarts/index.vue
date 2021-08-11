<!--
 * @Description: 
 * @Date: 2021-08-04 15:56:51
 * @LastEditTime: 2021-08-09 11:55:10
 * @FilePath: \jsplumb-test\src\views\Echarts\index.vue
-->
<template>
  <div class="echart-pie-wrap media">
    <div class="media-left">
      <el-button type="primary" @click="handleSelect">切换数据</el-button>
    </div>
    <div class="media-content">
      <div class="echart-panel-wrap">
        <div v-for="(seriesItem, index) in dataList" :key="index">
          <echart-pie v-if="seriesItem.seriesData" :series-data="seriesItem.seriesData" :extra-option="extraOption" :name="`demo${index}`" @onClicked="() => handleOnClick(index)" @onDragStop="handleDragStop" @onDelItem="() => handleDelItem(index)" />
        </div>
      </div>
    </div>
    <div class="media-right">
      <el-button type="primary" @click="handleSave">保 存</el-button>
    </div>
  </div>
</template>

<script>
import EchartPie from '@/components/echart_pie'
import { nextTick, reactive, toRefs } from 'vue'

import { chartDefaultOption } from './utils'

export default {
  name: 'EchartTemplate',
  components: { EchartPie },
  setup() {
    const state = reactive({
      dataList: [
        // {
        //   seriesData: {
        //     yAxis: {
        //       type: 'value',
        //     },
        //     xAxis: {
        //       type: 'category',
        //       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        //     },
        //     series: [
        //       {
        //         name: '苹果销量',
        //         type: 'bar',
        //         data: [120, 200, 150, 80, 70, 110, 130],
        //       },
        //       {
        //         name: '草莓销量',
        //         type: 'line',
        //         data: [220, 20, 50, 80, 90, 150, 230],
        //       },
        //     ],
        //   },
        // },
      ],

      extraOption: {
        color: ['#fe883a', '#2d90d1', '#f75981', '#90e2a9'],
      },
      dataInfoList: [],
      activeIndex: 0,
      key: 0,
    })

    const handleSelect = () => {
      state.dataInfoList[state.key] = {
        left: 0,
        top: 0,
        width: 400,
        height: 400,
      }
      state.dataList[state.key] = chartDefaultOption
      state.key += 1
    }

    const handleDragStop = obj => {
      state.dataInfoList[state.activeIndex] = obj
    }

    const handleOnClick = index => {
      state.activeIndex = index
    }

    const handleDelItem = async index => {
      state.dataInfoList[index] = {}
      state.dataList[index] = {}
    }

    const handleSave = () => {
      console.log(state.dataInfoList.filter(item => JSON.stringify(item) !== '{}'))
    }

    return {
      ...toRefs(state),
      handleSelect,
      handleDragStop,
      handleOnClick,
      handleSave,
      handleDelItem,
    }
  },
}
</script>

<style lang="less" scoped>
.echart-pie-wrap {
  width: 90vw;
  height: 90vh;
  margin: 20px auto;

  .chart-wrap {
    height: 300px;
    width: 200px;
  }

  .echart-panel-wrap {
    width: 100%;
    height: 700px;
    position: relative;
  }
}
.media {
  display: flex;
  align-items: stretch;
  border-top: 1px solid #ddd;
  height: 100%;

  .media-left {
    width: 200px;
  }

  .media-content {
    flex: 1;
    min-height: 500px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    position: relative;
    overflow: auto;
  }

  .media-right {
    width: 300px;
  }
}
</style>