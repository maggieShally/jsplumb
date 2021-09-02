<!--
 * @Description: 
 * @Date: 2021-08-04 15:56:51
 * @LastEditTime: 2021-09-02 14:48:59
 * @FilePath: \jsplumb-test\src\views\Echarts\index.vue
-->
<template>
  <div class="echart-pie-wrap media">
    <div class="media-left">
      <NodeMenu @addNode="addNode" />
      <!-- <el-button type="primary" @click="addNode">切换数据</el-button> -->
    </div>
    <div class="media-content">
      <div class="echart-panel-wrap" ref="container">
        <template v-for="(seriesItem, index) in dataList" :key="index">
          <echart-pie v-if="seriesItem.seriesData" :position="dataInfoList[index]" :parentPos="{
              width: 1220,
              height: 700
            }" :emptyImg="seriesItem.emptyImg" :series-data="seriesItem.seriesData" :extra-option="extraOption" :name="`demo${index}`" @onClicked="() => handleOnClick(index)" @onDragStop="handleDragStop" @onDelItem="() => handleDelItem(index)" />
        </template>
      </div>
    </div>
    <div class="media-right">
      <NodeSetting :data="activeNode" @getOptions="handleGetOptons" />
    </div>
  </div>
</template>

<script>
import EchartPie from '@/components/echart_pie'
import { computed, ref, reactive, toRefs } from 'vue'
import { merge } from 'lodash'

import NodeSetting from './node-setting.vue'
import NodeMenu from './node-menu.vue'

export default {
  name: 'EchartTemplate',
  components: { EchartPie, 
  NodeSetting,
   NodeMenu },
  setup() {
    const container = ref(null)
    const state = reactive({
      dataList: [],
      extraOption: {
        color: ['#fe883a', '#2d90d1', '#f75981', '#90e2a9'],
      },
      dataInfoList: [],
      activeIndex: '',
      key: 0,
    })

    const activeNode = computed(() => {
      return state.dataList[state.activeIndex]?.seriesData
    })

    const addNode = (evt, nodeMenu) => {
      const screenX = evt.originalEvent.clientX,
        screenY = evt.originalEvent.clientY

      const containerRect = container.value.getBoundingClientRect()
      let left = screenX,
        top = screenY

      console.log(containerRect)
      left = left - containerRect.x
      top = top - containerRect.y

      state.dataInfoList[state.key] = {
        left: left,
        top: top,
        width: 400,
        height: 400,
      }
      state.dataList[state.key] = {
        seriesData: {
          tooltip: {
            trigger: 'axis',
          },
          yAxis: [
            {
              type: 'value',
            },
          ],
          xAxis: {},
          series: [],
        },
        emptyImg: nodeMenu.imgUrl,
        chartType: nodeMenu.type,
      }
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

    const handleActivated = () => {
      state.activeIndex = ''
    }

    const handleSave = () => {
      console.log(
        state.dataInfoList.filter(item => JSON.stringify(item) !== '{}')
      )
    }

    const handleGetOptons = ({ yData, xData, title }) => {
      console.log(state.activeIndex)
      const { seriesData, chartType } = state.dataList[state.activeIndex]
      state.dataList[state.activeIndex].seriesData = merge(seriesData, {
        title: {
          text: title,
        },
        legend: {
          data: yData.map(item => item.label),
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xData.value,
        },
        series: yData.map(item => {
          return {
            name: item.label,
            data: item.value,
            type: chartType,
          }
        }),
      })
    }

    return {
      container,
      ...toRefs(state),
      activeNode,
      addNode,
      handleDragStop,
      handleOnClick,
      handleSave,
      handleDelItem,
      handleGetOptons,
      handleActivated,
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
  width: 100%;

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