/*
 * @Description:
 * @Date: 2022-07-15 11:22:25
 * @LastEditTime: 2022-07-15 16:44:59
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\linkage\components\ApiChart.data.js
 */

export const countOption = () => {
  return {
    title: {
      text: 'Stacked Line'
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '0%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    legend: {},
    dataZoom: [{
    
    }],
    xAxis: [
      {
        type: 'category',
        data: [
          '1月1日',
          '1月2日',
          '1月3日',
          '1月4日',
          '1月5日',
          '1月6日',
          '1月7日',
          '2月1日',
          '2月2日',
          '2月3日',
          '2月4日',
          '2月5日',
          '2月6日',
          '2月7日',
          '1月1日',
          '1月2日',
          '1月3日',
          '1月4日',
          '1月5日',
          '1月6日',
          '1月7日',
          '2月1日',
          '2月2日',
          '2月3日',
          '2月4日',
          '2月5日',
          '2月6日',
          '2月7日'
        ],

        position: 'bottom',
        axisTick: {
          length: (0 + 1) * 20
        },

        axisPointer: {
          type: 'line'
        },
        axisLabel: {
          margin: 10
        }
      },
      {
        type: 'category',
        data: ['1月', '2月', '1月', '2月'],
        position: 'bottom',
        axisTick: {
          length: (1 + 1) * 20
        },
        axisPointer: {
          type: 'none'
        },
        axisLabel: {
          margin: 30
        }
      },
      {
        type: 'category',
        data: ['2021', '2022'],
        position: 'bottom',
        axisTick: {
          length: (2 + 1) * 20
        },
        axisPointer: {
          type: 'none'
        },
        axisLabel: {
          margin: 60
        }
      }
    ],
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '单价',
        type: 'line',
        data: [
          120,
          132,
          101,
          134,
          90,
          230,
          210,
          120,
          132,
          101,
          134,
          90,
          230,
          210,
          120,
          132,
          101,
          134,
          90,
          230,
          210,
          120,
          132,
          101,
          134,
          90,
          230,
          210
        ]
      },
      {
        name: '平均价',
        type: 'line',
        stack: 'Total',
        data: [
          220,
          182,
          191,
          234,
          290,
          330,
          310,
          220,
          182,
          191,
          234,
          290,
          330,
          310,
          220,
          182,
          191,
          234,
          290,
          330,
          310,
          220,
          182,
          191,
          234,
          290,
          330,
          310
        ]
      }
    ]
  }
}
