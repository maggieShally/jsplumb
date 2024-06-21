/*
 * @Description: 堆叠面积图
 * @Date: 2024-04-30 15:24:00
 * @LastEditTime: 2024-05-21 16:37:35
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\options\area.option.js
 */


import { getSeriesData, getToolTips, getLegendData } from '../hooks'

import { composeValue } from '../utils.js'

const getOptions = ({ dimensionFields, quotaFields, data, options, chartType, markLine = {} }) => {
  
  let { getCategoryData,  seriesData } = getSeriesData(chartType)({ dimensionFields, quotaFields, data, chartType })

  seriesData[0].markLine = markLine

  let yAxis = [
    {
      type: 'value'
    },
    {
      type: 'value'
    }
  ]

  quotaFields.forEach(item => {
    let index = item.doubleYAxis ? 1 : 0
    yAxis[index] = {
      ...yAxis[index],
      axisLabel: {
        formatter: value => {
          return composeValue({val: value, item})
        }
      }
    }
  })

  return {
    ...options,
    legend: {
      ...options.legend,
      data: getLegendData(quotaFields)
    },
    tooltip: {
      ...options.tooltip,
      ...getToolTips(chartType)
    },
    yAxis,
    xAxis: getCategoryData({position: 'bottom'}, options),
    series: seriesData.map(item => {
      item.type = 'line'
      item.areaStyle = {}
      item.stack = 'total'
      return item
    })
  }
}

export default {
  getOptions
}
