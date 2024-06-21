/*
 * @Description: 根据图表类型返回series数据
 * @Date: 2024-05-21 16:34:30
 * @LastEditTime: 2024-05-21 16:46:24
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\hooks\getSeriesData.js
 */


import getNormalSeriesData from './getNormalSeriesData.js'
import getPieAndTreeMapSeriesData from './getPieAndTreeMapSeriesData.js'


const extraChartType = ['pie', 'treemap']

export default function getSeriesData(chartType) {
  
  if(extraChartType.includes(chartType)) {
    return getPieAndTreeMapSeriesData
  }
  return getNormalSeriesData

}