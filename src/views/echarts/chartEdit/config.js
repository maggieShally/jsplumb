/*
 * @Description:
 * @Date: 2024-01-17 17:45:17
 * @LastEditTime: 2025-01-20 11:48:50
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\config.js
 */

// 模拟的数据集ID
export const mockDataSetId = 'dba58813-cead-4ea5-b369-eb1f789ed635'

export const chartTypeList = [
  {
    value: 'line',
    label: '折线',
    chartType: 'line',
  },
  {
    value: 'bar',
    label: '柱图',
    chartType: 'bar',
  },
  {
    value: 'stackBar',
    label: '叠加柱图',
    chartType: 'bar',
  },
  {
    value: 'lineBar',
    label: '条形柱图',
    chartType: 'bar',
  },
  {
    value: 'lineAndBar',
    label: '组合图',
    chartType: 'bar',
  },
  {
    value: 'area',
    label: '堆叠面积图',
    chartType: 'area',
  },
  {
    value: 'pie',
    label: '饼图',
    chartType: 'pie',
  },
]


const normalDataTypeList = ['string', 'date']


/**
 * @description: 维度下拉
 * @param {*} dataType
 * @return {*}
 */
export const getDimensionConfig = dataType => {
  return [
    {
      label: '排序',
      configKey: 'sort',
      children: [
        {
          label: '升序',
          value: 'asc',
        },
        {
          label: '降序',
          value: 'desc',
        },
      ],
      dataTypeList: normalDataTypeList
    },
    {
      label: '时间格式',
      configKey: 'format',
      children: [
        {
          label: '日',
          value: 'yyyy-mm-dd',
        },{
          label: '周',
          value: 'yyyy-ww',
        },{
          label: '月',
          value: 'yyyy-mm',
        },{
          label: '季',
          value: 'yyyy-q',
        },{
          label: '年',
          value: 'yyyy',
        },
      ],
      dataTypeList: ['date']
    }
  ].filter(item => item.dataTypeList.includes(dataType))
}




const normalChartTypeList = ['line', 'bar', 'lineBar', 'stackBar', 'lineAndBar']
/**
 * @description: 获取指标下拉框类型
 * @param {*} chartType
 * @return {*}
 */
export const getQuotaConfig = chartType => {
  return [
    {
      label: '类型',
      configKey: 'chartType',
      children: [
        {
          label: '柱图',
          value: 'bar',
        },
        {
          label: '折线',
          value: 'line',
        },
        {
          label: '面积',
          value: 'area',
        },
      ],
      chartTypeList: ['lineAndBar']
    },
    {
      label: '排序',
      configKey: 'sort',
      children: [
        {
          label: '升序',
          value: 'asc',
        },
        {
          label: '降序',
          value: 'desc',
        },
      ],
    },
    {
      label: '快速计算',
      configKey: 'quickCalc',
      children: [
        {
          label: '列占比',
          value: 'ratio',
        },
        {
          label: '累计值',
          value: 'cumulative',
        },
      ],
    },
    {
      label: 'TOP',
      configKey: 'top',
      children: [
        {
          label: '10',
          value: 10,
        },
        {
          label: '20',
          value: 10,
        },
        {
          label: '自定义',
          value: -1,
        },
      ],
    },
    {
      label: '双轴',
      configKey: 'doubleYAxis',
      value: true,
    },
    {
      label: '格试化',
      configKey: 'format',
      children: [
        {
          label: '千分位',
          value: 'thousands',
        },
        {
          label: '百分比',
          value: 'percent',
          configKey: 'unit',
        },
      ],
    },
    {
      label: '单位',
      configKey: 'unit',
      children: [
        {
          label: 'K',
          value: 'thousands',
        },
        {
          label: 'W',
          value: 'tenThousands',
        },
        {
          label: 'M',
          value: 'million',
        },
      ],
    },
    {
      label: '小数位',
      configKey: 'scale',
      children: [
        {
          label: 2,
          value: 2,
        },
        {
          label: 3,
          value: 3,
        },
        {
          label: 4,
          value: 4,
        },
      ],
    },
    {
      label: '仅在浮窗显示',
      configKey: 'isToolsShow',
      value: true,
    }
  ].filter(item => (item.chartTypeList || normalChartTypeList).includes(chartType))
}
