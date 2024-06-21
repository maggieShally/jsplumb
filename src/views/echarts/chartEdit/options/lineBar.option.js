/*
 * @Description: 条形柱图
 * @Date: 2024-01-18 17:21:47
 * @LastEditTime: 2024-04-30 14:09:15
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\options\lineBar.option.js
 */

import { getSeriesData, getToolTips } from '../hooks'

import { composeValue } from '../utils.js'

const getOptions = ({
  dimensionFields,
  quotaFields,
  data,
  options,
  chartType,
  markLine = {},
}) => {
  const { getCategoryData, seriesData } = getSeriesData(chartType)({dimensionFields,quotaFields,data,chartType})
  
  seriesData[0].markLine = {
    data: markLine?.data?.map(i => {
      const { yAxis, ...extra } = i
      return {
        ...extra,
        xAxis: yAxis
      }
    })
  }

  let xAxis = [
    {
      type: 'value',
    },
  ]

  quotaFields.forEach(item => {
    xAxis[0] = {
      ...xAxis[0],
      axisLabel: {
        ...options.xAxis[0]?.axisLabel,
        formatter: value => {
          return composeValue({ val: value, item })
        },
      },
    }
  })

  return {
    ...options,
    tooltip: {
      ...options.tooltip,
      ...getToolTips(chartType)
    },
    xAxis,
    yAxis: getCategoryData({ position: 'left' }),
    series: seriesData,
  }
}

export default {
  getOptions,
}
