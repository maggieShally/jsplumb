/*
 * @Description: 叠加柱图
 * @Date: 2024-01-18 17:44:42
 * @LastEditTime: 2024-05-21 16:52:11
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\options\stackBar.option.js
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
  const { getCategoryData, seriesData } = getSeriesData(chartType)({
    dimensionFields,
    quotaFields,
    data,
    chartType,
  })

  seriesData[0].markLine = markLine

  let yAxis = [
    {
      type: 'value',
    },
    {
      type: 'value',
    },
  ]

  quotaFields.forEach(item => {
    let index = item.doubleYAxis ? 1 : 0
    yAxis[index] = {
      ...yAxis[index],
      axisLabel: {
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
      ...getToolTips(chartType),
    },
    yAxis,
    xAxis: getCategoryData({position: 'bottom'}, options),
    series: seriesData.map(item => {
      return {
        ...item,
        stack: 'total',
      }
    }),
  }
}

export default {
  getOptions,
}
