<!--
 * @Description: 
 * @Date: 2025-02-06 16:18:58
 * @LastEditTime: 2025-02-06 17:58:52
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\chartView\index.vue
-->

<template>

  <BaseChart ref="chartRef" :seriesData="options">
    <template #menuList>
      <!-- <div class="menu-list" v-if="showMenuDrill || showMenuAll">
        <div class="menu-item" v-if="showMenuDrill" @click="handleNextDrill">下钻</div>
        <div class="menu-item" v-if="showMenuAll" @click="handleShowData">{{ legendIsAll ? '单独显示此列' : '显示所有' }}</div>
      </div> -->
    </template>
  </BaseChart>

</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { dataViewApi } from '@/services'

import BaseChart from '../components/BaseChart'
import { chartTypeList, mockDataSetId } from '../config.js'

import * as chartOption from '../options'
import { calcDimensionField, calcQuotaField } from '../utils.js'
import { getFieldList, getDataSetCondList, getDimensionFields } from '../utils.js'
export default {
  name: 'ChartViewCom',
  components: {
    BaseChart
  },
  props: {
    dataViewConfig: {
      type: Object,
      default: () => {}
    },
    panelId: String
  },
  setup(props) {
    const state = reactive({
      options: {},
      headList: [],
      dimensionFields: [],
      quotaFields: [],
      drillList: [], 
      activeDrillValue: [], 
      activeDrillFieldList: [], 
      activeType: '', 
      markLine: {}, 
      dataSetDefaultCondList: {}
    })

    const getDataList = async extra => {
      let { viewId, headList, dimensionFields, quotaFields, drillList, activeDrillValue, activeDrillFieldList, activeType, options, markLine, dataSetDefaultCondList } = state

      const chartType = chartTypeList.find(i => i.value === activeType)?.chartType
      const tempDimensionFields = getDimensionFields(dimensionFields, activeDrillFieldList)
      const params = {
        chartType,
        dimensionFields: tempDimensionFields,
        quotaFields,
        dataId: mockDataSetId,
        fields: getFieldList({ dimensionFields, drillList, quotaFields }),
        isFilterPermission: "Y",
        isFormat: "N",
        page: 1,
        size: 10,
        // sortQueryList: dimensionFields.concat(quotaFields).filter(i => i.sort).map(i => {
        //   return {
        //     sort: i.sort,
        //     field: i.id
        //   }
        // }),
        // dataSetDefaultCondList: dataSetDefaultCondList.filter(i => i.operation && i.condValue.trim() !== ''),
        dataSetCondList: getDataSetCondList(activeDrillValue, activeDrillFieldList, headList),//下钻值
        viewId
      }
      const { data } = await dataViewApi.getViewData(params)
      state.headList = data.headList || []
      state.options = chartOption[`${activeType}Option`].getOptions({ dimensionFields: tempDimensionFields, quotaFields, data: data, options, chartType, markLine })

    }


    onMounted(async () => {
      const { data } = await dataViewApi.getViewConfigById({id: props.dataViewConfig.id})
      const { quotas, fields, drills, customStyle, viewType } = data
      state.drillList = drills.length ? fields.filter(item => drills[0].drillList.find(i => i.field === item.columnId)).map(item => calcDimensionField(item)) : []
      state.options = JSON.parse(customStyle).chartOption
      state.activeType = viewType
      state.dimensionFields = fields.filter(i => i.type === 'dimension').map(item => calcDimensionField(item))
      state.quotaFields = data.quotas.map(item => {
        return calcQuotaField(fields.find(i => i.columnId === item.field))
      })

      getDataList()

    })

    return {
      ...toRefs(state),
    }
  },
}

</script>
<style scoped lang='less'></style>