/*
 * @Description:
 * @Date: 2022-07-15 11:22:25
 * @LastEditTime: 2024-07-15 14:52:31
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\scatter\ApiChart.data.js
 */

export const countOption = () => {
  return {
    title: {
      text: '我是一个图表',
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '0%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    legend: {},
    dataZoom: [{}],
    xAxis: [
      // {
      //   type: 'category',
      //   data: [
      //     '1月1日',
      //     '1月2日',
      //     '1月3日',
      //     '1月4日',
      //     '1月5日',
      //     '1月6日',
      //     '1月7日',
      //     '2月1日',
      //     '2月2日',
      //     '2月3日',
      //     '2月4日',
      //     '2月5日',
      //     '2月6日',
      //     '2月7日',
      //     '1月1日',
      //     '1月2日',
      //     '1月3日',
      //     '1月4日',
      //     '1月5日',
      //     '1月6日',
      //     '1月7日',
      //     '2月1日',
      //     '2月2日',
      //     '2月3日',
      //     '2月4日',
      //     '2月5日',
      //     '2月6日',
      //     '2月7日',
      //   ],

      //   position: 'bottom',
      //   // axisTick: {
      //   //   length: (0 + 1) * 20
      //   // },

      //   // axisPointer: {
      //   //   type: 'line'
      //   // },
      //   // axisLabel: {
      //   //   margin: 10
      //   // }
      // },
      {
        type: 'category',
        data: ['1月', '2月', '1月', '2月'],
        position: 'bottom',
        // axisTick: {
        //   length: (1 + 1) * 20
        // },
        // axisPointer: {
        //   type: 'none'
        // },
        // axisLabel: {
        //   margin: 30
        // }
      },
      {
        type: 'category',
        data: ['2021', '2022'],
        position: 'bottom',
        
        // axisTick: {
        //   length: (2 + 1) * 20,
        // },
        // axisPointer: {
        //   type: 'none',
        // },
        // axisLabel: {
        //   margin: 60,
        // },
      },
    ],
    yAxis: [
      {
        type: 'value',
        // alignTicks: true,
        max: value => {
          console.log(value)
          const { max, min } = value
          const absMax = Math.max(Math.abs(max), Math.abs(min))
          return Math.floor(absMax * 1.2)
        },
        min: value => {
          const { max, min } = value
          const absMax = Math.max(Math.abs(max), Math.abs(min))
          return Math.floor(-absMax * 1.2)
        },
      },
      {
        type: 'value',
        // alignTicks: true,
        max: value => {
          console.log(value)
          const { max, min } = value
          const absMax = Math.max(Math.abs(max), Math.abs(min))
          console.log('1 absMax', absMax)
          return Math.floor(absMax * 1.2)
        },
        min: value => {
          const { max, min } = value
          const absMax = Math.max(Math.abs(max), Math.abs(min))
          console.log('1 absMax', absMax)
          return Math.floor(-absMax * 1.2)
        },
      },
    ],
    series: [
      {
        name: '单价',
        type: 'bar',
        yAxisIndex: 1,
        data: [
          20, 32, 0, 34, 90, 20, 20, 20, 32, 0, 34, 90, 20, 20,
          20, 32, 0, 34, 90, 20, 20, 20, 32, 0, 34, 90, 20, 20,
        ],
      },
      {
        name: '平均价',
        type: 'line',
        stack: 'Total',
        data: [
          220, 182, 191, -34, -290, 330, 310, 220, 182, 191, 234, 290, 330, 310,
          220, 182, 191, 234, 290, 330, 310, 220, 82, 191, 234, 290, 330, 310,
        ],
      },
    ],
  }
}
