<!--
 * @Description: tab 组件
 * @Date: 2023-08-08 09:46:58
 * @LastEditTime: 2023-08-09 15:39:52
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\linkage\components\TabCom.vue
-->


<template>
  <div class="container">
    <div class="operate-sec">
      <span @click="$emit('onDelete')">删除</span>
    </div>

    <el-button type="primary" @click="handleAddTab">add tab</el-button>
    <el-tabs v-model="tabActiveName" class="tab-container">
      <el-tab-pane v-for="paneItem in paneList" :key="paneItem.name" :name="paneItem.name" :label="paneItem.title" lazy>
        <div class="pane-sec" :ref="getChartPanelRef" :id="id + '_' + paneItem.name">
          <GridLayoutCom :ref="getGridLayoutRef" :dataList="paneItem.chartList" :id="id + '_' + paneItem.name + '_grid'">
            <template #default="{ item }">
              <LinkageCom v-if="item.type === 'chart'" :id="item.id" :mainId="mainChartId" @onDelete="handleDelItem(paneItem.name, item.id)">
                <ChartCom :unitKey="item.id" placement="right" />
              </LinkageCom>
            </template>
          </GridLayoutCom>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { computed, reactive, toRefs, ref, nextTick, unref } from 'vue'
import { GridLayout, GridItem } from 'vue-grid-layout'
import GridLayoutCom from './GridLayout'

import LinkageCom from '../LinkageCom.vue'
import ChartCom from './ChartCom.vue'

export default {
  name: 'TabCom',
  components: {
    GridLayoutCom,
    LinkageCom,
    ChartCom
  },
  props: {
    itemData: { // tab组件所有数据
      type: Object,
      default: () => {}
    },
    id: {
      type: String,
      default: ''
    },
    mainId: {
      type: String,
      default: ''
    }
  },
  emits: ['onDelete', 'onAddPane', 'onDelPane', 'onDelChart'],
  setup(props, context) {

    const chartPanelRef = ref([])
    const gridLayoutRef = ref([])

    const state = reactive({
      tabActiveName: 'tab1',
    })

    const paneList = computed(() => {
      return props.itemData.data?.paneList || []
    })
    const mainChartId = computed(() => props.mainId)


    const getChartPanelRef = async el => {
      await nextTick()
      if (el) {
        const index = chartPanelRef.value?.findIndex(
          item => item?.id === el.id
        )
        if (index < 0) {
          chartPanelRef.value.push(el)
        } else {
          chartPanelRef.value[index] = el
        }
      }
    }

    const getGridLayoutRef = async el => {
      await nextTick()
      if (el) {
        const index = gridLayoutRef.value?.findIndex(
          item => item?.id === el.id
        )
        if (index < 0) {
          gridLayoutRef.value.push(el)
        } else {
          gridLayoutRef.value[index] = el
        }
      }
    }

    const handleAddTab = () => {
      context.emit('onAddPane')
    }

    const handleDelItem = (panelName = state.tabActiveName, chartId) => {
      
      context.emit('onDelChart',props.id, panelName, chartId)
    }


    const drag = (e, id, { addItem}) => {

      const activeChartPanelRef = chartPanelRef.value.find(i => i.id === props.id + '_' + state.tabActiveName)
      const activeGridLayoutRef = gridLayoutRef.value.find(i => i.$attrs.id === props.id + '_' + state.tabActiveName + '_grid')

      activeGridLayoutRef.drag(e, id, activeChartPanelRef, {
        addItem: (dragPos) => addItem(dragPos, state.tabActiveName)
      })
    }

    const dragend = e => {
      console.log('tab dragend')
      const activeGridLayoutRef = gridLayoutRef.value.find(i => i.$attrs.id === props.id + '_' + state.tabActiveName + '_grid')
      
      activeGridLayoutRef.dragend(e)
    }

    return {
      drag,
      dragend,
      getChartPanelRef,
      getGridLayoutRef,
      mainChartId,
      paneList,
      ...toRefs(state),
      handleAddTab,
      handleDelItem,
    }
  }

}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  border: 1px solid #ddd;
}

.tab-container {
  height: calc(100% - 30px);


  :deep(.el-tabs__content) {
    height: calc(100% - 40px);

    .el-tab-pane {
      height: 100%;
    }
  }
}

.pane-sec {
  width: 100%;
  min-width: 400px;
  height: 100%;
  min-height: 200px;
}

.operate-sec {
  position: absolute;
  top: 10px;
  right: 10px
}
</style>