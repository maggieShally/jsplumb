/*
 * @Description: 组合图
 * @Date: 2024-04-30 14:18:58
 * @LastEditTime: 2024-05-21 16:48:18
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\options\lineAndBar.option.js
 */


import { getSeriesData, getToolTips } from '../hooks'

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
    tooltip: {
      ...options.tooltip,
      ...getToolTips(chartType)
    },
    yAxis,
    xAxis: getCategoryData({position: 'bottom'}, options),
    series: seriesData.map(item => {
      const data = item.data[0].data
      if(data.chartType === 'area') {
        item.type = 'line'
        item.areaStyle = {}
      }
      return item
    })
  }
}

export default {
  getOptions
}