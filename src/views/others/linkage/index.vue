<!--
 * @Description: 联动 动态使用 grid-layout
 * @Date: 2022-07-07 11:09:33
 * @LastEditTime: 2025-02-07 11:04:32
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\linkage\index.vue
-->

<template>
  <el-button type="primary" @click="handleSaveLayout">保存</el-button>

  <div ref="chartPanelRef" class="chart-panel" id="chart-panel">

    <GridLayoutCom ref="gridlayoutRef" v-model:posList="layout" id="mainGrid">
      <template #default="{ item }">
        <!-- :ref="getChartRefs" -->
        <LinkageCom v-if="item.type === 'chart'" :id="item.id" :mainId="mainChartId" @onGetMain="handleGetMain" @onDelete="handleDelItem">
          <ChartCom  :unitKey="item.id" placement="right" :dataViewConfig="item.dataViewConfig" :panelId="panelId" />
        </LinkageCom>
      </template>
    </GridLayoutCom>

  </div>
</template>

<script>
import { toRefs, reactive, nextTick, ref, unref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import axios from 'axios'

import { uuid } from '@/utils'
import { getDom } from './utils'
import { dataViewApi } from '@/services'


import GridLayoutCom from './components/GridLayout'
import LinkageCom from './LinkageCom.vue'
import ChartCom from './components/ChartCom.vue'
import TabCom from './components/TabCom.vue'

export default {
  name: 'LinkeAge',
  components: {
    GridLayoutCom,
    LinkageCom,
    ChartCom,
    TabCom
  },
  setup() {


    const chartRefs = ref([])
    const chartPanelRef = ref(null)
    const gridlayoutRef = ref(null)
    const tabsRef = ref([])

    const route = useRoute()

    const state = reactive({

      mainChartId: '',

      chartList: [
        // {
        //   id: '111',
        //   type: 'chart',
        //   pos: {
        //     x: 2,
        //     y: 4,
        //     w: 2,
        //     h: 2,
        //     i: '111',
        //   },
        // },
        // {
        //   id: '222',
        //   type: 'chart',
        //   pos: {
        //     x: 0,
        //     y: 0,
        //     w: 2,
        //     h: 2,
        //     i: '222',
        //   },
        // },
      ],


      panelId: route.query.id,


      layout: [],
    })

    const allChartIds = computed(() => state.chartList.map(i => i.id))

    const getTabRefs = async el => {
      await nextTick()
      if (el) {
        const index = tabsRef.value?.findIndex(
          item => item.id === el.id
        )
        if (index < 0) {
          tabsRef.value.push(el)
        } else {
          tabsRef.value[index] = el
        }
      }
    }


    const getChartRefs = async el => {
      await nextTick()
      if (el) {
        const index = chartRefs.value?.findIndex(
          item => item?.chartRef?.name === el.chartRef.name
        )
        if (index < 0) {
          chartRefs.value.push(el)
        } else {
          chartRefs.value[index] = el
        }
      }
    }


    // 获取主联动id
    const handleGetMain = id => {
      state.mainChartId = id
    }

    //删除视图
    const handleDelItem = id => {
      state.chartList = state.chartList.filter(i => i.id !== id)
    }

    const handleSaveLayout = () => {
      console.log(gridlayoutRef.value.gridlayoutRef.layout)
      console.log(state.chartList)
    }

    let controller

    const getDataList = () => {
      controller = new AbortController()
      axios({
        url: 'http://dopdev.longsys.com/dea/favorite/get',
        method: 'get',
        signal: controller.signal,
      })
    }

    const handleCancel = () => {
      console.log(controller)
      controller.abort()
    }
    let num = 5

    // const handleAddItem = () => {
    //   state.chartList.push({
    //     id: 'test5' + num,
    //     type: 'chart',
    //     pos: {
    //       x: 3,
    //       y: 4,
    //       w: 2,
    //       h: 2,
    //       i: 'test5' + num,
    //     },
    //   })
    //   num++
    // }


    let dragInfo = {
      parentId: '',
      dragId: ''
    }

    // const drag = (e, id) => {
    //   let activeElelemt = getDom(e)
    //   // console.log(activeElelemt)
     
    //   let activeChartId = ((activeElelemt.id !== 'app' && activeElelemt.id !== id) ? activeElelemt.id : dragInfo.parentId).split('_')[0]
    //   const tabIds = state.chartList.filter(i => i.type === 'tab').map(i => i.id)
    //   activeChartId = activeChartId !== 'mainGrid' ? tabIds.includes(activeChartId) ? activeChartId : '' : 'mainGrid'

    //   dragInfo.dragId = id
    //   dragInfo.parentId = activeChartId
      
    //   if (activeChartId && activeChartId !== 'mainGrid') {

    //     // 进入tab组件 给tab组件 添加 子元素
    //     tabsRef.value.find(i => i.id === activeChartId)?.drag(e, id, {
    //       addItem: (dragPos, paneName) => {
    //         const chartLen = state.chartList.find(i => i.id === activeChartId).data.paneList?.find(i => i.name === paneName)?.chartList?.length

    //         console.log(chartLen)
    //         state.chartList.find(i => i.id === activeChartId)
    //           .data.paneList.find(i => i.name === paneName)
    //           .chartList.push({
    //             id,
    //             type: 'chart',
    //             pos: {
    //               ...dragPos,
    //               i: id,
    //               x: (chartLen * 2) % 12,
    //               y: chartLen,
    //             },
    //           })
    //       }
    //     })

    //     // 删除 外层 子元素
    //     state.chartList = state.chartList.filter(i => i.id !== id)
    //     gridlayoutRef.value.dragend()
    //   } else if(activeChartId === 'mainGrid') {

    //     // 外层添加 子元素
    //     gridlayoutRef.value.drag(e, id, unref(chartPanelRef), {
    //       addItem: dragPos => {
    //         state.chartList.push({
    //           id: id,
    //           type: 'chart',
    //           pos: {
    //             ...dragPos,
    //             i: id,
    //             x: (state.chartList.length * 2) % 12,
    //             y: state.chartList.length,
    //           },
    //         })
    //       }
    //     })


    //     // // tab组件的 得删除
    //     let preTabId = ''
    //     state.chartList.forEach(item => {
    //       if (item.type === 'tab') {
    //         item.data.paneList = item.data.paneList.map(paneItem => {
    //           if(paneItem.chartList.some(i => i.id === id)) {
    //             preTabId = item.id
    //           }
    //           return {
    //             ...paneItem,
    //             chartList: paneItem.chartList.filter(i => i.id !== id)
    //           }
    //         })
    //       }
    //     })
    //     console.log(preTabId)
    //     tabsRef.value.find(i => i.id === preTabId)?.dragend()
    //   }
    // }

    // const dragend = (e) => {
    //   const {  dragId } = dragInfo
    //   if(unref(allChartIds).includes(dragId)) {
    //     gridlayoutRef.value.dragend(e)
    //   } else {
    //     const { chartList } = state
    //     let preTabId = ''
    //     for(let i = 0; i < chartList.length; i++) {
    //       const item = chartList[i]
    //       if(item.type === 'tab') {
    //         const hasDragId = item.data.paneList.map(i => i.chartList.map(i => i.id)).flat().includes(dragId)
    //         if(hasDragId) {
    //           preTabId = item.id
    //           break
    //         }
    //       }
    //     }
    //     console.log(preTabId)
    //     tabsRef.value.find(i => i.id === preTabId)?.dragend()
    //   }
    // }

    // tab组件 添加 pane
    // const handleTabAddPane = id => {
    //   const activeItem = state.chartList.find(i => i.id === id)
    //   const len = activeItem.data.paneList.length + 1
    //   activeItem.data.paneList.push(
    //     {
    //       name: 'tab' + len,
    //       title: 'tab' + len,
    //       chartList: []
    //     }
    //   )
    // }

    // tab组件 删除 chart
    // const handleTabChart = (parentId, paneName, chartId) => {
    //   let activePanlListChartList = state.chartList.find(i => i.id === parentId)?.data?.paneList.find(i => i.name === paneName)?.chartList
    //   state.chartList.find(i => i.id === parentId).data.paneList.find(i => i.name === paneName).chartList = activePanlListChartList.filter(i => i.id !== chartId)
    // }


    const getPanelData = async () => {
      const { data } = await dataViewApi.getPanelConfig({ panelId: route.query.id})
      const { viewPanel, viewMap, resolution } = data
      const dataList = JSON.parse(viewPanel.panelContent).cells.map(item => {
        const posInfo = JSON.parse(viewPanel.resolution).find(i => i.resolution === '1920').layoutList.find(i => i.uuid === item.uuid)
        debugger
        return {
          type: 'chart',
          dataViewConfig: viewMap[item.data.viewId],
          pos: {
            ...posInfo.position,
            type: 'chart',
            w: Math.floor(posInfo.size.width / (1920 / 24)),
            h: Math.floor(posInfo.size.height / 30),
            // w:2,
            // h:2,
            x: Math.floor(posInfo.position.x / 24),
            y: Math.floor(posInfo.position.y / 30),
            i: item.uuid,
            id: item.uuid,
            dataViewConfig: viewMap[item.data.viewId],
          }
        }
      })

      state.chartList = dataList
      state.layout = dataList.map(i => i.pos )
      
      // Object.values(data.viewMap).map(item => {
      //   return {
      //     type: 'chart',
      //     dataViewConfig: item,
      //     pos: {
            
      //     }
      //   }
      // })
    }

    onMounted(() => {
      getPanelData()
    })

    return {
      chartPanelRef,
      gridlayoutRef,
      getChartRefs,
      getTabRefs,
      ...toRefs(state),
      handleGetMain,
      handleSaveLayout,

      handleCancel,
      getDataList,
      handleDelItem,
      // handleAddItem,
      // drag,
      // dragend,


      // handleTabAddPane,
      // handleTabChart

    }
  },
}
</script>

<style style="less" scoped>
.chart-panel {
  width: 100%;
  height: 100%;
}

#mainGrid {
  min-height: 1500px;
}

.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid #ccc 1px;
  background-color: #ccc;
}

.droppable-element {
  display: inline-block;
  width: 150px;
  text-align: center;
  background: #fdd;
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
}
</style>