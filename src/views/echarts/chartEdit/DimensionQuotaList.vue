<!--
 * @Description: 数据集 指标列表
 * @Date: 2024-04-29 11:20:53
 * @LastEditTime: 2025-02-12 16:26:18
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\DimensionQuotaList.vue
-->



<template>
  <draggable v-model="dimensionList" :group="{ name: 'field-item', pull: 'clone', put: false }" :move="handleDimensionMove" :clone="handleDimensionDragClone" item-key="columnId">
    <template #item="{ element }">

      <el-tag :class="disabledDimensionList.includes(element.columnId) ? 'forbid' : ''" type="primary" style="width: 100%">
        {{ disabledDimensionList.includes(element.columnId) ? 'forbid' : '' }}
        {{ element.columnName }}</el-tag>
    </template>
  </draggable>

  <el-divider></el-divider>

  <draggable v-model="quotaList" :group="{ name: 'field-item', pull: 'clone', put: false }" :move="handleQuotaMove" :clone="handleQuotaDragClone" item-key="columnId">
    <template #item="{ element }">
      <el-tag :class="disabledQuotaList.includes(element.columnId) ? 'forbid' : ''" type="primary" style="width: 100%">{{ element.columnName }}</el-tag>
    </template>
  </draggable>
</template>

<script>
import { ref, reactive, toRefs, onMounted, computed } from 'vue'
import draggable from 'vuedraggable'

import { dataViewApi } from '@/services'

import { mockDataSetId } from './config.js'
import { calcDimensionField, calcQuotaField } from './utils.js'

export default {
  name: 'DimensionQuotaList',
  components: {
    draggable
  },
  props: {
    dimensionFields: Array, //已选中的维度字段
    quotaFields: Array, // 已选中的指标字段
  },
  setup(props) {

    const state = reactive({
      dimensionList: [],
      quotaList: []
    })

    const disabledDimensionList = computed(() => props.dimensionFields.map(i => i.field))
    const disabledQuotaList = computed(() => props.quotaFields.map(i => i.field))

    const getDataFields = async () => {
      const { data } = await dataViewApi.getDataFields({ "businessId": mockDataSetId, "dataType": "dataSet" })
      state.dimensionList = data.filter(i => i.columnTypeName !== 'number').map(i => {
        return {
          ...i,
          dataType: i.customColumnType,
          type: 'dimension',
          from: 'dataSet'
        }
      })
      state.quotaList = data.filter(i => i.columnTypeName === 'number').map(i => {
        return {
          ...i,
          dataType: i.customColumnType,
          type: 'quota',
          from: 'dataSet',
          isTotal: 'N',
          aggregate: 'sum'
        }
      })
    }

    const handleDimensionDragClone = item => {
      return calcDimensionField(item)
    }

    const handleQuotaDragClone = (item) => {
      return calcQuotaField(item)
    }

    const handleQuotaMove = (e, originalEvent) => {
      const toId = e.to.id
      if (['defaultFields', 'quotaFields'].includes(toId)) {
        const currentFieldList = e.relatedContext.list.map(i => i.field)
        if (!currentFieldList.includes(e.draggedContext.element.field)) {
          return true
        }
      }
      return false
    }

    const handleDimensionMove = (e, originalEvent) => {
      const toId = e.to.id
      if (['defaultFields', 'dimensionFields', 'drillField'].includes(toId)) {
        const currentFieldList = e.relatedContext.list.map(i => i.field)
        if (!currentFieldList.includes(e.draggedContext.element.field)) {
          return true
        }
      }
      return false
    }

    onMounted(() => {
      getDataFields()
    })

    return {
      disabledDimensionList,
      disabledQuotaList,
      ...toRefs(state),
      handleDimensionDragClone,
      handleQuotaDragClone,
      handleDimensionMove,
      handleQuotaMove
    }
  }
}
</script>

<style lang='less' scoped>
.el-tag {
  margin: 3px;
}
</style>