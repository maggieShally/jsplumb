/*
 * @Description:
 * @Date: 2022-03-30 15:10:21
 * @LastEditTime: 2022-03-31 09:19:21
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\scatter\data.same.js
 */

export const dataAll = [
  {
    itemNo: 'AAA1',
    dataSet: [10.0, 8.04],
    type: 'step1'
  },
  {
    itemNo: 'AAA2',
    dataSet: [8.0, 4.95],
    type: 'step1'
  },
  {
    itemNo: 'AAA3',
    dataSet: [13.0, 7.58],
    type: 'step1'
  },
  {
    itemNo: 'AAA4',
    dataSet: [9.0, 8.81],
    type: 'step1'
  },

  {
    itemNo: 'AAA1',
    dataSet: [17.0, 9.14],
    type: 'step2'
  },
  {
    itemNo: 'AAA2',
    dataSet: [8.0, 8.14],
    type: 'step2'
  },
  {
    itemNo: 'AAA3',
    dataSet: [13.0, 8.74],
    type: 'step2'
  },
  {
    itemNo: 'AAA4',
    dataSet: [9.0, 8.77],
    type: 'step2'
  },

  {
    itemNo: 'AAA1',
    dataSet: [20.0, 7.46],
    type: 'step3'
  },
  {
    itemNo: 'AAA2',
    dataSet: [8.0, 6.77],
    type: 'step3'
  },
  {
    itemNo: 'AAA3',
    dataSet: [13.0, 12.74],
    type: 'step3'
  },
  {
    itemNo: 'AAA4',
    dataSet: [9.0, 7.11],
    type: 'step3'
  },

  {
    itemNo: 'AAA1',
    dataSet: [8.0, 6.58],
    type: 'step4'
  },
  {
    itemNo: 'AAA2',
    dataSet: [8.0, 5.76],
    type: 'step4'
  },
  {
    itemNo: 'AAA3',
    dataSet: [8.0, 7.71],
    type: 'step4'
  },
  {
    itemNo: 'AAA4',
    dataSet: [8.0, 8.84],
    type: 'step4'
  }
]

const tempData = [
  [
    [10.0, 8.04],
    [8.0, 6.95],
    [13.0, 7.58],
    [9.0, 8.81],
    [11.0, 8.33],
    [14.0, 9.96],
    [6.0, 7.24],
    [4.0, 4.26],
    [12.0, 10.84],
    [7.0, 4.82],
    [5.0, 5.68]
  ],
  [
    [10.0, 9.14],
    [8.0, 8.14],
    [13.0, 8.74],
    [9.0, 8.77],
    [11.0, 9.26],
    [14.0, 8.1],
    [6.0, 6.13],
    [4.0, 3.1],
    [12.0, 9.13],
    [7.0, 7.26],
    [5.0, 4.74]
  ],
  [
    [10.0, 7.46],
    [8.0, 6.77],
    [13.0, 12.74],
    [9.0, 7.11],
    [11.0, 7.81],
    [14.0, 8.84],
    [6.0, 6.08],
    [4.0, 5.39],
    [12.0, 8.15],
    [7.0, 6.42],
    [5.0, 5.73]
  ],
  [
    [8.0, 6.58],
    [8.0, 5.76],
    [8.0, 7.71],
    [8.0, 8.84],
    [8.0, 8.47],
    [8.0, 7.04],
    [8.0, 5.25],
    [19.0, 12.5],
    [8.0, 5.56],
    [8.0, 7.91],
    [8.0, 6.89]
  ]
]

const selectedStyle = {
  select: {
    label: {
      // show: true
    },
    itemStyle: {
      color: 'rgba(194, 20, 20, 1)',
      borderWidth: 24,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowBlur: 20
    }
  },
  selectedMode: 'multiple'
}

export const scatterOption = {
  legend: {},
  tooltip: {},
  grid: {
    left: "13%",
    right: "7%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: {
    type: "value",
    // scale: true,
    // min: 5,
    // max: 20,
    axisLabel: {
      formatter: "{value}"
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: "value",
    // scale: true,
    
    axisLabel: {
      formatter: "{value}"
    },
    splitLine: {
      show: false
    }
  },
  series: [{
    name: "料 号",
    type: "scatter",
    data: dataAll.map(item => item.dataSet),
    colorBy: "data",
    ...selectedStyle,
    markLine: {
      silent: true,
      symbol: 'none',
      data: [
        [
          {
            name: 'start',
            coord:   [8.0, 6.68]
          },
          {
            name: 'start',
            coord:  [10.0, 8.15],
          }
        ],
        [
          {
            name: 'start',
            coord:  [10.0, 8.15]
          },
          {
            name: 'start',
            coord:  [17.0, 9.25],
          }
        ],
        [
          {
            name: 'start',
            coord:  [17.0, 9.25],
          },
          {
            name: 'start',
            coord:   [20.0, 7.57],
          }
        ]
      ]
    }
  }]
}