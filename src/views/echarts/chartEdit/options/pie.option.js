/*
 * @Description: 
 * @Date: 2024-04-30 15:29:23
 * @LastEditTime: 2024-04-30 16:11:44
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\options\pie.option.js
 */

import { getSeriesData, getToolTips } from '../hooks'

const getOptions = ({
  dimensionFields,
  quotaFields,
  data,
  options,
  chartType,
  markLine = {},
}) => {
  
  let { seriesData } = getSeriesData(chartType)({ dimensionFields,quotaFields,data,chartType })

  const { dataZoom, yAxis = {}, xAxis = {}, ...extraOptions } = options

  return {
    ...extraOptions,
    legend: {
      ...options.legend,
      data: null,
    },
    tooltip: {
      ...options.tooltip,
      ...getToolTips(chartType)
    },
    series: seriesData,
  }
}

export default {
  getOptions,
}
