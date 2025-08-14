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

          <!--设置默认筛选 -->
          <SetDefaultFieldCom v-model:defaultCondFields="dataSetDefaultCondList" />

          <!-- 下钻 -->
          <DrillCom v-model:drillList="drillList"  @onCleanDrill="handleCleanDrill" />

        </el-tab-pane>
        <el-tab-pane label="配置" name="config">
          <ChartConfig v-model:options="options" />
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="16">

      <el-button type="primary" @click="refreshData">改数据</el-button>
      <el-button type="primary" @click="refreshMarkLineData">markLine</el-button>

      <!-- 选择的 指标与维度 -->
      <DimensionQuotaCom :chartType="activeType" v-model:dimensionList="dimensionFields" v-model:quotaList="quotaFields" />

      <!-- 视图 eCharts图表组件 -->
      <div class="chart-wrap">
        <BaseChart ref="chartRef" name="apiChart" :seriesData="options">
          <template #menuList>
            <div class="menu-list" v-if="showMenuDrill || showMenuAll">
              <div class="menu-item" v-if="showMenuDrill" @click="handleNextDrill">下钻</div>
              <div class="menu-item" v-if="showMenuAll" @click="handleShowData">{{ legendIsAll ? '单独显示此列' : '显示所有' }}</div>
            </div>
          </template>
        </BaseChart>
        <!-- <el-empty v-else></el-empty>  v-if="quotaFields.length"-->
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { reactive, toRefs, watch, ref, computed, onMounted, onBeforeMount } from 'vue'
import lodash from 'lodash'
import { useRouter, useRoute } from 'vue-router'
import { watchArray } from '@vueuse/core'
import { dataViewApi } from '@/services'

import BaseChart from './components/BaseChart'

import DimensionQuotaCom from './DimensionQuotaCom.vue'
import DimensionQuotaList from './DimensionQuotaList.vue'

import { chartTypeList, mockDataSetId } from './config.js'
import * as chartOption from './options'
import getBaseOption from './options/base.option.js'
import { getFieldList, getDataSetCondList, getDimensionFields } from './utils.js'

import ChartConfig from './Chart.config.vue'

import SetDefaultFieldCom from './components/SetDefaultField.vue'

import DrillCom from './components/DrillCom.vue'

import { calcDimensionField,  calcQuotaField } from './utils.js'

export default {
  name: 'ChartViewEdit',
  components: {
    ChartConfig,
    BaseChart,
    DimensionQuotaCom,
    DimensionQuotaList,
    SetDefaultFieldCom,
    DrillCom
  },
  setup() {
    const route = useRoute()

    const chartRef = ref(null)
    const state = reactive({
      activeEditName: 'field',
      dimensionFields: [], // 选择的维度
      quotaFields: [], // 选择的指标

      drillList: [], // 选择的下钻字段
      activeDrillFieldList: [], // 下钻的路径
      activeDrillValue: [], // 下钻路径值

      options: chartOption.lineOption.getOptions({ dimensionFields: [], quotaFields: [], data: [], options: getBaseOption(), chartType: 'line', markLine: {} }),//配置的样式
      markLine: {},
      activeType: 'line',

      dataSetDefaultCondList: [], //默认条件

      legendIsAll: true, //图例全部显示

      headList: [], //类目轴数据,


      viewId: route.query.id

    })

    watch(() => state.activeType, val => {
      getDataList()
    })

    watchArray(() => state.dimensionFields, () => {
      getDataList()
    }, {
      deep: true
    })

    watchArray(() => state.quotaFields, (newVal, oldVal) => {
      getDataList()
    }, {
      deep: true
    })

    watchArray(() => state.dataSetDefaultCondList, () => {
      getDataList()
    }, {
      deep: true
    })

    const showMenuDrill = computed(() => state.drillList.length && state.activeDrillFieldList.length < state.drillList.length)
    const showMenuAll = computed(() => state.quotaFields.length > 1)
    
    const getChart = () => {
      return chartRef.value.chartRef.chart
    }

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
      let { viewId, headList, dimensionFields, quotaFields, drillList, activeDrillValue, activeDrillFieldList, activeType, options, markLine, dataSetDefaultCondList } = state
     
      const chartType = chartTypeList.find(i => i.value === activeType)?.chartType
      const tempDimensionFields = getDimensionFields(dimensionFields, activeDrillFieldList)
      const params = {
        chartType,
        dimensionFields: tempDimensionFields,
        quotaFields,
        dataId: mockDataSetId,
        fields: getFieldList({ dimensionFields, drillList, quotaFields}),
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
        dataSetDefaultCondList: dataSetDefaultCondList.filter(i => i.operation && i.condValue.trim() !== ''),
        dataSetCondList: getDataSetCondList(activeDrillValue, activeDrillFieldList, headList),//下钻值
        viewId
      }
      const { data } = await dataViewApi.getViewData(params)
      state.headList = data.headList || []
      state.options = chartOption[`${activeType}Option`].getOptions({ dimensionFields: tempDimensionFields, quotaFields, data: data, options, chartType, markLine })
    
    }

   
    // 下钻
    const handleNextDrill = () => {
      console.log('handleNextDrill')
      const { drillList, activeDrillFieldList } = state
      let activeLen = activeDrillFieldList.length
      if(activeLen === 0) {
        state.activeDrillFieldList.push(drillList[0])
        activeLen++
      }
      const nextDrillItem = drillList[activeLen]
      state.activeDrillFieldList.push(nextDrillItem)
      console.log(chartRef.value.chartRef.activeClickData)
      state.activeDrillValue.push(chartRef.value.chartRef.activeClickData)
      getDataList()
    }

    const handleCleanDrill = () => {
      state.activeDrillFieldList = []
      state.activeDrillValue = []
      state.drillList = []
      getDataList()
    }

    // 单独显示,显示所有
    const handleShowData = () => {
      const { legendIsAll } = state
      if(legendIsAll) {
        getChart().dispatchAction({
          type: 'legendInverseSelect',
        })
        getChart().dispatchAction({
          type: 'legendSelect',
          name: chartRef.value.chartRef.activeClickData.name
        })
      } else {
        getChart().dispatchAction({
          type: 'legendAllSelect',
        })
      }
      state.legendIsAll = !legendIsAll
    }

    const login = async () => {
      await dataViewApi.userLogin()
    }

    const getConfigData = async () => {
      const { data } = await dataViewApi.getViewConfigById({id: route.query.id})
      const { quotas, fields, drills, customStyle, viewType } = data
      state.drillList = fields.filter(item => drills[0].drillList.find(i => i.field === item.columnId)).map(item => calcDimensionField(item))
      state.options = JSON.parse(customStyle).chartOption
      state.activeType = viewType
      state.dimensionFields = fields.filter(i => i.type === 'dimension').map(item => calcDimensionField(item))
      state.quotaFields = data.quotas.map(item => {
        return calcQuotaField(fields.find(i => i.columnId === item.field))
      })
    }

    onBeforeMount(login)

    onMounted(() => {
      // if(route.query.id) {
      //   getConfigData()
      // }
    })

    return {
      showMenuDrill,
      showMenuAll,
      chartRef,
      chartTypeList,
      ...toRefs(state),
      handleChangeType,
      refreshData,
      refreshMarkLineData,
      handleNextDrill,
      handleShowData,
      handleCleanDrill
    }
  }
}
</script>

<style lang="less">
.chart-wrap {
  width: 100%;
  height: 600px;
}

.menu-list {
  width: 150px;
  min-width: 130px;
  border-radius: 3px;
  font-size: 14px;
  color: #606266;
  border: 1px solid #ddd;
  background: #fff;

  .menu-item {
    padding: 5px 10px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;

    &:last-of-type {
      border-bottom: none;
    }
  }
}
</style>