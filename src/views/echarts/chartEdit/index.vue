<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <DimensionQuotaList :dimensionFields="dimensionFields" :quotaFields="quotaFields" />
    </el-col>
    <el-col :span="4">
      <div>
        <el-space wrap>
          <el-tag :type="activeType === item.value ? 'danger' : 'info'" v-for="item in chartTypeList" :key="item.value" @click="handleChangeType(item.value)">{{ item.label }}</el-tag>
        </el-space>
      </div>
      <el-tabs v-model="activeEditName">
        <el-tab-pane label="数据配置" name="field">
          <SetDefaultFieldCom v-model:defaultCondFields="dataSetDefaultCondList" />
        </el-tab-pane>
        <el-tab-pane label="配置" name="config">
          <ChartConfig v-model:options="options" />
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="16">

      <el-button type="primary" @click="refreshData">改数据</el-button>
      <el-button type="primary" @click="refreshMarkLineData">markLine</el-button>

      <DimensionQuotaCom :chartType="activeType" v-model:dimensionList="dimensionFields" v-model:quotaList="quotaFields" />

      <div class="chart-wrap">
        <BaseChart v-if="quotaFields.length" ref="chartRef" name="apiChart" :seriesData="options" />
        <el-empty v-else></el-empty>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { reactive, toRefs, watch, onMounted, onBeforeMount } from 'vue'
import lodash from 'lodash'
import { watchArray } from '@vueuse/core'
import { dataViewApi } from '@/services'

import BaseChart from '@/components/BaseChart'

import DimensionQuotaCom from './DimensionQuotaCom.vue'
import DimensionQuotaList from './DimensionQuotaList.vue'

import { chartTypeList, mockDataSetId } from './config.js'
import * as chartOption from './options'
import getBaseOption from './options/base.option.js'

import ChartConfig from './Chart.config.vue'
// import { mockData, calcData } from './mockData'

import SetDefaultFieldCom from './components/SetDefaultField.vue'

export default {
  name: 'ChartViewEdit',
  components: {
    ChartConfig,
    BaseChart,
    DimensionQuotaCom,
    DimensionQuotaList,
    SetDefaultFieldCom
  },
  setup() {
    const state = reactive({
      activeEditName: 'field',
      dimensionFields: [],
      quotaFields: [],

      options: chartOption.lineOption.getOptions({ dimensionFields: [], quotaFields: [], data: [], options: getBaseOption(), chartType: 'line', markLine: {} }),//配置的样式
      markLine: {},
      activeType: 'line',

      dataSetDefaultCondList: [], //默认条件
    })

    watch(() => state.activeType, val => {
      getDataList()
    })

    watch(() => state.options, val => {
      console.log(val)
    }, {
      deep: true
    })

    watchArray(() => state.dimensionFields, () => {
      getDataList()
    }, {
      deep: true
    })


    watchArray(() => state.quotaFields, (newVal, oldVal) => {
      console.log(newVal, oldVal)
      getDataList()
    }, {
      deep: true
    })

    watchArray(() => state.dataSetDefaultCondList, () => {
      getDataList()
    }, {
      deep: true
    })

    const handleChangeType = value => {
      state.activeType = value
    }

    // 刷新数据
    const refreshData = () => {
      getDataList()
    }

    // 刷新MarkLine
    const refreshMarkLineData = () => {
      state.markLine = {
        "data": [
          {
            "axisIndex": 0,
            "name": "辅助线",
            "type": "custom",
            "value": 1254,
            "label": {
              "show": true,
              "position": "insideStartTop"
            },
            "lineStyle": {
              "type": "solid",
              "color": "#DE4A4A"
            },
            "typeName": "固定值",
            "yAxis": 1234
          }
        ],
        "symbol": [
          "circle",
          "arrow"
        ]
      }
      getDataList()
    }

    const getDataList = async extra => {
      const { dimensionFields, quotaFields, activeType, options, markLine, dataSetDefaultCondList } = state

      const chartType = chartTypeList.find(i => i.value === activeType)?.chartType
      const params = {
        chartType,
        dimensionFields,
        quotaFields,
        dataId: mockDataSetId,
        fields: dimensionFields.concat(quotaFields).map(item => {
          const { cnName: cnViewName, enName: enViewName, dataType, id, type, from } = item
          const { cnName, enName, columnId } = item?.originData || {}
          return {
            cnViewName,
            enViewName,
            cnName,
            enName,
            dataType,
            columnId,
            field: id,
            id,
            from,
            type
          }
        }),
        isFilterPermission: "Y",
        isFormat: "N",
        page: 1,
        size: 1000,
        sortQueryList: dimensionFields.concat(quotaFields).filter(i => i.sort).map(i => {
          return {
            sort: i.sort,
            field: i.id
          }
        }),
        dataSetDefaultCondList: dataSetDefaultCondList.filter(i => i.operation && i.condValue.trim() !== '')
      }
      console.log(params)
      const { data } = await dataViewApi.getViewData(params)
      state.options = chartOption[`${activeType}Option`].getOptions({ dimensionFields, quotaFields, data: data, options, chartType, markLine })
    }

    const login = async () => {
      await dataViewApi.userLogin()
    }

    onBeforeMount(login)

    onMounted(() => {
      getDataList()
    })

    return {
      chartTypeList,
      ...toRefs(state),
      handleChangeType,
      refreshData,
      refreshMarkLineData
    }
  }
}
</script>

<style lang="less">
.chart-wrap {
  width: 100%;
  height: 600px;
}
</style>