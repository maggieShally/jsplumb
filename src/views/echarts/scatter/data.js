/*
 * @Description:
 * @Date: 2022-03-30 10:53:17
 * @LastEditTime: 2023-05-09 10:20:26
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\scatter\data.js
 */

const dataAll = [
  {
    itemNo: 'AAA1',
    dataSet: [10.0, 8.04],
    type: 'step1'
  },
  {
    itemNo: 'AAA2',
    dataSet: [8.0, 6.95],
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
    dataSet: [10.0, 9.14],
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
    dataSet: [10.0, 7.46],
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

  // {
  //   itemNo: 'AAA1',
  //   dataSet: [8.0, 6.58],
  //   type: 'step4'
  // },
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
const markLineOpt = {
  animation: false,
  label: {
    formatter: 'y = 0.5 * x + 3',
    align: 'right'
  },
  lineStyle: {
    type: 'solid'
  },
  tooltip: {
    formatter: 'y = 0.5 * x + 3'
  },
  data: [
    [
      {
        coord: [0, 3],
        symbol: 'none'
      },
      {
        coord: [20, 13],
        symbol: 'none'
      }
    ]
  ]
}

const stepData = {
  step1Data: dataAll.filter(item => item.type === 'step1'),
  step2Data: dataAll.filter(item => item.type === 'step2'),
  step3Data: dataAll.filter(item => item.type === 'step3'),
  step4Data: dataAll.filter(item => item.type === 'step4')
}

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
  selectedMode: true
}

export const scatterOption = {
  title: {
    text: '分区显示',
    left: 'center',
    top: 0
  },
  grid: [
    { left: '7%', top: '12%', width: '38%', height: '35%' },
    { right: '7%', top: '12%', width: '38%', height: '35%' },
    { left: '7%', bottom: '7%', width: '38%', height: '35%' },
    { right: '7%', bottom: '7%', width: '38%', height: '35%' }
  ],
  tooltip: {
    show: true,
    formatter: function(params) {
      const itemNo =
        stepData[`step${params.seriesIndex + 1}Data`][params.dataIndex].itemNo
      let tips = `<div style="text-align: left">`
      for (let key in stepData) {
        const tempData = stepData[key].find(item => item.itemNo === itemNo)
        tips += tempData ? `${tempData?.type}: ${tempData.dataSet} </br>` : ''
      }

      tips += `</div>`
      return tips
    }
  },
  xAxis: [
    { gridIndex: 0 },
    { gridIndex: 1 },
    { gridIndex: 2 },
    { gridIndex: 3 }
  ],
  yAxis: [
    { gridIndex: 0, name: 'step1' },
    { gridIndex: 1, name: 'step2' },
    { gridIndex: 2, name: 'step3' },
    { gridIndex: 3, name: 'step4' }
  ],
  series: [
    {
      name: '步骤1',
      type: 'scatter',
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: stepData.step1Data.map(item => item.dataSet),
      ...selectedStyle
    },
    {
      name: '步骤2',
      type: 'scatter',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: stepData.step2Data.map(item => item.dataSet),
      ...selectedStyle
      // // markLine: markLineOpt
    },
    {
      name: '步骤3',
      type: 'scatter',
      xAxisIndex: 2,
      yAxisIndex: 2,
      data: stepData.step3Data.map(item => item.dataSet),
      ...selectedStyle
      // // markLine: markLineOpt
    },
    {
      name: '步骤4',
      type: 'scatter',
      xAxisIndex: 3,
      yAxisIndex: 3,
      data: stepData.step4Data.map(item => item.dataSet),
      ...selectedStyle
      // // markLine: markLineOpt
    }
  ]
}

export const testOption = {
  legend: {},
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  xAxis: {
    data: ['2013', '2014', '2015', '2016', '2017', '2018']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      name: '一月',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      },
      // emphasis: {
      //   focus: 'series'
      // },
      triggerLineEvent: true
    },
    {
      data: [320, 100, 250, 380, 470, 210, 430],
      type: 'line',
      name: '二月',
      triggerLineEvent: true,
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
      // emphasis: {
      //   focus: 'series'
      // }
    },
    {
      data: [720, 140, 450, 320, 520, 510, 230],
      type: 'bar',
      name: '三月',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
      // emphasis: {
      //   focus: 'series'
      // }
    },
    {
      data: [350, 200, 450, 280, 170, 310, 450],
      type: 'bar',
      name: '四月',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
      // emphasis: {
      //   focus: 'series'
      // }
    }
  ].map(item => {
    return {
      ...item,
      selectedMode: 'series',
      select: {
        disabled: false,
        labelLine: {
          show: true
        },
        label: {
          show: true,
          position: 'top'
        },
        itemStyle: {
          color: '#fff',
          borderColor: '#000',
          borderWidth: 10
        },
        lineStyle: {
          normal: {
            width: 4
          }
        }
      }
    }
  })
}

export const treeMapOptions = {
  series: [
    {
      type: 'treemap',
      data: [
        {
          name: 'nodeA',
          value: 10,
          children: [
            {
              name: 'nodeAa',
              value: 4
            },
            {
              name: 'nodeAb',
              value: 6
            }
          ]
        },
        {
          name: 'nodeB',
          value: 20,
          children: [
            {
              name: 'nodeBa',
              value: 20,
              children: [
                {
                  name: 'nodeBa1',
                  value: 20
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
