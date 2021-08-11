/*
 * @Description: 
 * @Date: 2021-08-09 11:22:45
 * @LastEditTime: 2021-08-09 11:23:25
 * @FilePath: \jsplumb-test\src\views\echarts\utils.js
 */

export const chartDefaultOption = {
  seriesData: {
    yAxis: {
      type: 'value',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    series: [
      {
        name: '苹果销量',
        type: 'bar',
        data: [220, 100, 150, 40, 30, 410, 130],
      },
      {
        name: '草莓销量',
        type: 'line',
        data: [420, 20, 30, 20, 20, 450, 230],
      },
    ],
  },
}