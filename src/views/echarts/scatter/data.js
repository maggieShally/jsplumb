/*
 * @Description:
 * @Date: 2022-03-30 10:53:17
 * @LastEditTime: 2023-11-28 16:36:06
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\scatter\data.js
 */

import { sankeyData } from './sankeydata.js'

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
  tooltip: {},
  series: [
    {
      type: 'treemap',
      // leafDepth: 1,
      data: [
        {
          "children": [
            {
              "children": [
                {
                  "name": "ZJC0012C1380",
                  "value": 352800.0
                },
                {
                  "name": "ZJC0012C1162",
                  "value": 2077.1298828125
                },
                {
                  "name": "ZJC0012C0691",
                  "value": 1516990.625
                },
                {
                  "name": "ZJC0012C0198",
                  "value": 659.260009765625
                },
                {
                  "name": "ZJC0012C1034",
                  "value": 705.4400024414063
                },
                {
                  "name": "ZJC0012C1025",
                  "value": 6942.8701171875
                },
                {
                  "name": "ZJC0012C0124",
                  "value": 6170.18017578125
                },
                {
                  "name": "ZJC0012C1466",
                  "value": 12321.1201171875
                },
                {
                  "name": "ZJC0012C1169",
                  "value": 43350.078125
                },
                {
                  "name": "ZJC0012C0774",
                  "value": 579.1199951171875
                },
                {
                  "name": "ZJC0012C0950",
                  "value": 9165076.0
                },
                {
                  "name": "ZJC0012C0125",
                  "value": 231.64999389648438
                },
                {
                  "name": "ZJC0012C0169",
                  "value": 1777.8299560546876
                },
                {
                  "name": "ZJC0012C1445",
                  "value": 367110.0
                },
                {
                  "name": "ZJC0012C0237",
                  "value": 305200.8125
                },
                {
                  "name": "ZJC0012C0645",
                  "value": 901945.25
                },
                {
                  "name": "ZJC0012C0667",
                  "value": 696.8699951171875
                },
                {
                  "name": "ZJC0012C1448",
                  "value": 17722.419921875
                },
                {
                  "name": "ZJC0012C0558",
                  "value": 19638.400390625
                }
              ],
              "name": "UFS LINE",
              "value": 12721995.056182862
            },
            {
              "children": [
                {
                  "name": "ZJC0012X0124",
                  "value": 111091.1875
                },
                {
                  "name": "ZJC0012C1093",
                  "value": 2690029.75
                },
                {
                  "name": "ZJC0012C1132",
                  "value": 1316945.875
                },
                {
                  "name": "ZJC0012X0126",
                  "value": 1461.239990234375
                },
                {
                  "name": "ZJC0012C1013",
                  "value": 31863.8203125
                },
                {
                  "name": "ZJC0012C1256",
                  "value": 5023018.0
                },
                {
                  "name": "ZJC0012C0686",
                  "value": 442020.34375
                },
                {
                  "name": "ZJC0012C1259",
                  "value": 6944451.0
                },
                {
                  "name": "ZJC0012C0600",
                  "value": 35562.62890625
                },
                {
                  "name": "ZJC0012C1019",
                  "value": 13984.0
                },
                {
                  "name": "ZJC0012C0606",
                  "value": 2952.139892578125
                },
                {
                  "name": "ZJC0012C0848",
                  "value": 2421.77001953125
                },
                {
                  "name": "ZJC0012X0197",
                  "value": 2666.81005859375
                },
                {
                  "name": "ZJC0012X0118",
                  "value": 6959.93017578125
                },
                {
                  "name": "ZJC0012A1591",
                  "value": 59.630001068115237
                },
                {
                  "name": "ZJC0012C1384",
                  "value": 11421.2802734375
                },
                {
                  "name": "ZJC0012X0115",
                  "value": 32664.2109375
                },
                {
                  "name": "ZJC0012C0572",
                  "value": 32724.44921875
                },
                {
                  "name": "ZJC0012C1386",
                  "value": 51374.8984375
                },
                {
                  "name": "ZJC0012C1266",
                  "value": 619787.875
                },
                {
                  "name": "ZJC0012C1147",
                  "value": 167960.0
                },
                {
                  "name": "ZJC0012C1269",
                  "value": 103630.75
                },
                {
                  "name": "ZJC0012C0732",
                  "value": 2418001.75
                },
                {
                  "name": "ZJC0012C1426",
                  "value": 909886.9375
                },
                {
                  "name": "ZJC0012C0736",
                  "value": 6806.56005859375
                },
                {
                  "name": "ZJC0012C0978",
                  "value": 28795.009765625
                },
                {
                  "name": "ZJC0012C0737",
                  "value": 1773.6500244140626
                },
                {
                  "name": "ZJC0012X0266",
                  "value": 5539.60009765625
                },
                {
                  "name": "ZJC0012K0051",
                  "value": 1443666.5
                },
                {
                  "name": "ZJC0012C1271",
                  "value": 3948967.25
                },
                {
                  "name": "ZJC0012C0580",
                  "value": 18.770000457763673
                },
                {
                  "name": "ZJC0012C1031",
                  "value": 20936.16015625
                },
                {
                  "name": "ZJC0012C0581",
                  "value": 231.3000030517578
                },
                {
                  "name": "ZJC0012X0268",
                  "value": 2918.9599609375
                },
                {
                  "name": "ZJC0012C0221",
                  "value": 242633.203125
                },
                {
                  "name": "ZJC0012C1313",
                  "value": 1256893.0
                },
                {
                  "name": "ZJC0012C0741",
                  "value": 993.8500213623047
                },
                {
                  "name": "ZJC0012C0621",
                  "value": 1612838.625
                },
                {
                  "name": "ZJC0012C1316",
                  "value": 1174473.625
                },
                {
                  "name": "ZJC0012X0270",
                  "value": 4604.39990234375
                },
                {
                  "name": "ZJC0012C0625",
                  "value": 158337.3125
                },
                {
                  "name": "ZJC0012C0746",
                  "value": 1666285.25
                },
                {
                  "name": "ZJC0012C0868",
                  "value": 16709143.0
                },
                {
                  "name": "ZJC0012C0906",
                  "value": 243769.59375
                },
                {
                  "name": "ZJC0012X0254",
                  "value": 7578.2001953125
                },
                {
                  "name": "ZJC0012X0099",
                  "value": 1388.9100036621094
                },
                {
                  "name": "ZJC0012C1280",
                  "value": 703273.0
                },
                {
                  "name": "ZJC0012C1283",
                  "value": 1370.3199462890626
                },
                {
                  "name": "ZJC0012A1173",
                  "value": 21790.109375
                },
                {
                  "name": "ZJC0012C1044",
                  "value": 5252612.0
                },
                {
                  "name": "ZJC0012C0594",
                  "value": 57633.51171875
                },
                {
                  "name": "ZJC0012C0595",
                  "value": 436.5
                },
                {
                  "name": "ZJC0012C1167",
                  "value": 11873.5498046875
                },
                {
                  "name": "ZJC0012C0475",
                  "value": 34296.87109375
                },
                {
                  "name": "ZJC0012C1168",
                  "value": 1107988.0
                },
                {
                  "name": "ZJC0012C0750",
                  "value": 13717.3095703125
                },
                {
                  "name": "ZJC0012C0754",
                  "value": 553412.4375
                },
                {
                  "name": "ZJC0012C1206",
                  "value": 12914785.0
                },
                {
                  "name": "ZJC0012C1207",
                  "value": 9055200.0
                },
                {
                  "name": "ZJC0012C0910",
                  "value": 440800.0
                },
                {
                  "name": "ZJC0012C0515",
                  "value": 334.6199951171875
                },
                {
                  "name": "ZJC0012C1209",
                  "value": 315816.1875
                },
                {
                  "name": "ZJC0012K0033",
                  "value": 1113.0
                },
                {
                  "name": "ZJC0012C1290",
                  "value": 5238.0
                },
                {
                  "name": "ZJC0012X0207",
                  "value": 2425.75
                },
                {
                  "name": "ZJC0012C1052",
                  "value": 739.2000122070313
                },
                {
                  "name": "ZJC0012C0481",
                  "value": 12942348.0
                },
                {
                  "name": "ZJC0012X0325",
                  "value": 10526.400390625
                },
                {
                  "name": "ZJC0012C1176",
                  "value": 25359.6796875
                },
                {
                  "name": "ZJC0012C0880",
                  "value": 117511.203125
                },
                {
                  "name": "ZJC0012C1210",
                  "value": 11295.4599609375
                },
                {
                  "name": "ZJC0012C1333",
                  "value": 20293.2890625
                },
                {
                  "name": "ZJC0012C0801",
                  "value": 301369.59375
                },
                {
                  "name": "ZJC0012C1220",
                  "value": 6148348.0
                },
                {
                  "name": "ZJC0012C1221",
                  "value": 334410.59375
                },
                {
                  "name": "ZJC0012C1343",
                  "value": 73385.3984375
                },
                {
                  "name": "ZJC0012C1101",
                  "value": 125856.0
                },
                {
                  "name": "ZJC0012C0651",
                  "value": 49446.0
                },
                {
                  "name": "ZJC0012C0258",
                  "value": 135.68999862670899
                },
                {
                  "name": "ZJC0012C1348",
                  "value": 86171.796875
                },
                {
                  "name": "ZJC0012C1107",
                  "value": 76971.046875
                },
                {
                  "name": "ZJC0012X0220",
                  "value": 3032.81005859375
                },
                {
                  "name": "ZJC0012C1074",
                  "value": 86550.1796875
                },
                {
                  "name": "ZJC0012X0227",
                  "value": 8961.080078125
                },
                {
                  "name": "ZJC0012X0225",
                  "value": 17987.44921875
                },
                {
                  "name": "ZJC0012C0541",
                  "value": 54040.51953125
                },
                {
                  "name": "ZJC0012C0421",
                  "value": 454897.1875
                },
                {
                  "name": "ZJC0012C1357",
                  "value": 220835.546875
                },
                {
                  "name": "ZJC0012C1115",
                  "value": 11994486.0
                },
                {
                  "name": "ZJC0012C0544",
                  "value": 2886338.25
                },
                {
                  "name": "ZJC0017S0003",
                  "value": 7241634.5
                },
                {
                  "name": "ZJC0012C1358",
                  "value": 945.0
                },
                {
                  "name": "ZJC0012C0821",
                  "value": 36144.2890625
                },
                {
                  "name": "ZJC0012C0668",
                  "value": 61110.0
                },
                {
                  "name": "ZJC0012C0789",
                  "value": 1527518.625
                },
                {
                  "name": "ZJC0012C0824",
                  "value": 47212.05859375
                },
                {
                  "name": "ZJC0012X0191",
                  "value": 9634.9296875
                },
                {
                  "name": "ZJC0012X0212",
                  "value": 10233.6103515625
                },
                {
                  "name": "ZJC0012X0218",
                  "value": 4940.6201171875
                },
                {
                  "name": "ZJC0012C1360",
                  "value": 438837.59375
                },
                {
                  "name": "ZJC0012C0790",
                  "value": 152.64999389648438
                },
                {
                  "name": "ZJC0012C1241",
                  "value": 2671589.75
                },
                {
                  "name": "ZJC0012C1087",
                  "value": 3442.719970703125
                },
                {
                  "name": "ZJC0012C1000",
                  "value": 31847.0390625
                },
                {
                  "name": "ZJC0012C0550",
                  "value": 23737.400390625
                },
                {
                  "name": "ZJC0012C1364",
                  "value": 581400.0
                },
                {
                  "name": "ZJC0012C0793",
                  "value": 501.20001220703127
                },
                {
                  "name": "ZJC0012C0555",
                  "value": 9166.5
                },
                {
                  "name": "ZJC0012C0951",
                  "value": 2867400.0
                },
                {
                  "name": "ZJC0012C1248",
                  "value": 397458.46875
                },
                {
                  "name": "ZJC0012C0952",
                  "value": 18412422.0
                },
                {
                  "name": "ZJC0012C0955",
                  "value": 124740.20703125
                },
                {
                  "name": "ZJC0012C1406",
                  "value": 48732.5
                },
                {
                  "name": "ZJC0012C0836",
                  "value": 115595.4296875
                },
                {
                  "name": "ZJC0012C0957",
                  "value": 249200.9375
                },
                {
                  "name": "WHP0006X1272",
                  "value": 887.469970703125
                },
                {
                  "name": "ZJC0012C0719",
                  "value": 3487932.5
                }
              ],
              "name": "EMBEDDED LINE",
              "value": 154461363.5468483
            },
            {
              "children": [
                {
                  "name": "ZJC0011C0051",
                  "value": 17115.0
                },
                {
                  "name": "ZJC0011S0213",
                  "value": 4329476.5
                },
                {
                  "name": "ZJC0011S0204",
                  "value": 463308.375
                },
                {
                  "name": "ZJC0011S0226",
                  "value": 628051.25
                },
                {
                  "name": "ZJC0011S0007",
                  "value": 129.30999755859376
                },
                {
                  "name": "ZJC0011S0188",
                  "value": 173055.765625
                },
                {
                  "name": "ZJC0011S0201",
                  "value": 39219.55859375
                },
                {
                  "name": "ZJC0011S0058",
                  "value": 219.2899932861328
                },
                {
                  "name": "ZJC0011S0234",
                  "value": 5304000.0
                }
              ],
              "name": "MCP LINE",
              "value": 10954575.049209595
            }
          ],
          "name": "ESG",
          "value": 178137933.65224076
        },
        {
          "children": [
            {
              "children": [
                {
                  "name": "ZJPL026C0018",
                  "value": 3064.330078125
                },
                {
                  "name": "ZJPL026C0019",
                  "value": 2948.409912109375
                },
                {
                  "name": "ZJPL026A0009",
                  "value": 21777.720703125
                },
                {
                  "name": "ZJPL026A0011",
                  "value": 70375.609375
                }
              ],
              "name": "EXTENDED STORAGE LINE",
              "value": 98166.07006835938
            },
            {
              "children": [
                {
                  "name": "CF00053.0001.00",
                  "value": 165693.921875
                },
                {
                  "name": "CF00537.0001.00",
                  "value": 2695.7099609375
                },
                {
                  "name": "ZJPL009C0061",
                  "value": 64.97000122070313
                },
                {
                  "name": "ZJPL009C0066",
                  "value": 22055.6796875
                },
                {
                  "name": "ZJPL009C0022",
                  "value": 1444740.0
                },
                {
                  "name": "ZJPL009C0067",
                  "value": 155949.296875
                },
                {
                  "name": "ZJPL009C0045",
                  "value": 17482.310546875
                },
                {
                  "name": "ZJPL009C0023",
                  "value": 3482296.25
                },
                {
                  "name": "ZJPL009C0064",
                  "value": 75638.3671875
                },
                {
                  "name": "ZJPL009C0065",
                  "value": 164499.04296875
                },
                {
                  "name": "ZJPL009C0103",
                  "value": 159868.59375
                },
                {
                  "name": "ZJPL009C0101",
                  "value": 151962.1875
                },
                {
                  "name": "ZJPL009C0024",
                  "value": 733758.75
                },
                {
                  "name": "ZJPL009C0102",
                  "value": 430030.6875
                },
                {
                  "name": "ZJPL009C0107",
                  "value": 176465.453125
                },
                {
                  "name": "ZJPL009C0106",
                  "value": 98836.40625
                },
                {
                  "name": "ZJPL009C0109",
                  "value": 247498.203125
                },
                {
                  "name": "CF00517.0001.00",
                  "value": 55526.5
                },
                {
                  "name": "ZJPL009C0090",
                  "value": 248382.125
                },
                {
                  "name": "ZJPL009C0051",
                  "value": 234698.921875
                },
                {
                  "name": "ZJPL009C0073",
                  "value": 1382116.5
                },
                {
                  "name": "ZJPL009C0030",
                  "value": 553.9199829101563
                },
                {
                  "name": "ZJPL009C0031",
                  "value": 448141.65625
                },
                {
                  "name": "ZJPL009C0131",
                  "value": 335932.75
                },
                {
                  "name": "ZJPL009C0032",
                  "value": 339550.84375
                },
                {
                  "name": "CF00077.0001.00",
                  "value": 47955.26171875
                },
                {
                  "name": "ZJPL009C0136",
                  "value": 140969.5
                },
                {
                  "name": "ZJPL009C0135",
                  "value": 153626.1875
                },
                {
                  "name": "ZJPL009C0019",
                  "value": 574420.8125
                },
                {
                  "name": "ZJPL009C0138",
                  "value": 99846.84375
                }
              ],
              "name": "CF LINE",
              "value": 11591257.652679444
            },
            {
              "children": [
                {
                  "name": "ZJPL018A0078",
                  "value": 1046430.1875
                },
                {
                  "name": "ZJPL018A0077",
                  "value": 1002904.3125
                },
                {
                  "name": "ZJPL018A0076",
                  "value": 8568777.0
                },
                {
                  "name": "ZJPL018A0075",
                  "value": 7872921.0
                },
                {
                  "name": "ZJPL018C0168",
                  "value": 45168.578125
                },
                {
                  "name": "ZJPL018C0167",
                  "value": 61715.73046875
                },
                {
                  "name": "ZJPL018C0088",
                  "value": 115799.7890625
                },
                {
                  "name": "ZJPL018C0005",
                  "value": 33355.171875
                },
                {
                  "name": "ZJPL018A0156",
                  "value": 10487.25
                },
                {
                  "name": "ZJCL018C0028",
                  "value": 5340.66015625
                },
                {
                  "name": "ZJCL018A0018",
                  "value": 0.09000000357627869
                },
                {
                  "name": "ZJCL018C0183",
                  "value": 1348.6099853515626
                },
                {
                  "name": "ZJCL018C0783",
                  "value": 1841501.75
                },
                {
                  "name": "ZJPL018C0152",
                  "value": 1182348.25
                },
                {
                  "name": "ZJPL018C0151",
                  "value": 586730.5625
                },
                {
                  "name": "ZJPL018C0113",
                  "value": 1120.6800537109376
                },
                {
                  "name": "ZJPL018A0007",
                  "value": 0.36000001430511477
                },
                {
                  "name": "ZJPL018C0110",
                  "value": 131425.0
                },
                {
                  "name": "ZJCL018C0819",
                  "value": 126000.0
                },
                {
                  "name": "ZJPL018A0048",
                  "value": 1726.239990234375
                },
                {
                  "name": "ZJPL018C0114",
                  "value": 5456.02001953125
                },
                {
                  "name": "ZJPL018C0109",
                  "value": 45503.109375
                },
                {
                  "name": "ZJCL018C0773",
                  "value": 95700.0
                },
                {
                  "name": "ZJPL018C0108",
                  "value": 22772.369140625
                },
                {
                  "name": "ZJPL018C0107",
                  "value": 338464.8046875
                },
                {
                  "name": "ZJCL018C0051",
                  "value": 36.45000076293945
                },
                {
                  "name": "ZJCL018A0023",
                  "value": 0.18000000715255738
                },
                {
                  "name": "ZJCL018C0771",
                  "value": 73700.0
                },
                {
                  "name": "ZJPL018A0056",
                  "value": 0.18000000715255738
                },
                {
                  "name": "ZJPL018A0055",
                  "value": 0.18000000715255738
                },
                {
                  "name": "ZJPL018C0142",
                  "value": 13255.080078125
                },
                {
                  "name": "ZJPL018C0141",
                  "value": 19496.7890625
                },
                {
                  "name": "ZJPL018C0020",
                  "value": 15408.9296875
                },
                {
                  "name": "ZJPL018C0183",
                  "value": 2413.949951171875
                },
                {
                  "name": "ZJPL018C0265",
                  "value": 89222.203125
                },
                {
                  "name": "ZJPL018C0022",
                  "value": 55463.109375
                },
                {
                  "name": "ZJPL018C0143",
                  "value": 557324.4375
                },
                {
                  "name": "ZJPL018C0187",
                  "value": 31003.919921875
                },
                {
                  "name": "ZJPL018A0137",
                  "value": 1580.9300537109376
                },
                {
                  "name": "ZJPL018C0148",
                  "value": 53729.08984375
                },
                {
                  "name": "ZJPL018A0135",
                  "value": 326900.375
                },
                {
                  "name": "ZJPL018A0178",
                  "value": 10737.6904296875
                },
                {
                  "name": "ZJPL018C0103",
                  "value": 13653.3203125
                },
                {
                  "name": "ZJCL018C0202",
                  "value": 394.8500061035156
                },
                {
                  "name": "ZJCL018C0687",
                  "value": 62222.0
                },
                {
                  "name": "ZJCL018C0569",
                  "value": 127.56999969482422
                },
                {
                  "name": "ZJCL018C0723",
                  "value": 211657.703125
                },
                {
                  "name": "ZJPL018S0001",
                  "value": 6993.7099609375
                },
                {
                  "name": "ZJCL018C0561",
                  "value": 180294.09375
                },
                {
                  "name": "ZJCL018C0682",
                  "value": 67200.0
                },
                {
                  "name": "ZJCL018C0362",
                  "value": 5216.0
                },
                {
                  "name": "ZJCL018C0120",
                  "value": 61200.0
                },
                {
                  "name": "ZJCL018C0563",
                  "value": 18.219999313354493
                },
                {
                  "name": "ZJPL018C0171",
                  "value": 13498.6396484375
                },
                {
                  "name": "ZJPL018C0098",
                  "value": 52789.41015625
                },
                {
                  "name": "ZJPL018A0182",
                  "value": 117150.1171875
                },
                {
                  "name": "ZJPL018C0173",
                  "value": 98962.6015625
                },
                {
                  "name": "ZJPL018C0013",
                  "value": 4239.7998046875
                },
                {
                  "name": "ZJPL018A0106",
                  "value": 138480.92578125
                },
                {
                  "name": "ZJPL018C0254",
                  "value": 77703.03125
                },
                {
                  "name": "ZJPL018A0105",
                  "value": 70773.029296875
                },
                {
                  "name": "ZJPL018C0011",
                  "value": 25789.44140625
                },
                {
                  "name": "ZJPL018C0176",
                  "value": 30667.5
                },
                {
                  "name": "ZJPL018A0189",
                  "value": 1692.1199951171876
                },
                {
                  "name": "ZJPL018C0059",
                  "value": 484717.625
                },
                {
                  "name": "ZJCL018C0074",
                  "value": 5748.0
                },
                {
                  "name": "ZJCL018A0042",
                  "value": 0.18000000715255738
                }
              ],
              "name": "CDIMM LINE",
              "value": 26124460.907711
            },
            {
              "children": [
                {
                  "name": "UA01254.0001.00",
                  "value": 75714.5625
                },
                {
                  "name": "UA00698.0001.00",
                  "value": 127096.4765625
                },
                {
                  "name": "ZJPL023C0063",
                  "value": 66501.8994140625
                },
                {
                  "name": "ZJPL023A0172",
                  "value": 190402.546875
                },
                {
                  "name": "ZJPL023C0185",
                  "value": 7076.580078125
                },
                {
                  "name": "ZJPL023C0100",
                  "value": 66353.9375
                },
                {
                  "name": "ZJPL023C0067",
                  "value": 145925.80078125
                },
                {
                  "name": "ZJPL023A0174",
                  "value": 68222.921875
                },
                {
                  "name": "ZJPL023C0066",
                  "value": 83299.5625
                },
                {
                  "name": "UA01303.0001.00",
                  "value": 27022.98046875
                },
                {
                  "name": "UA01302.0003.00",
                  "value": 289541.7890625
                },
                {
                  "name": "ZJPL023C0178",
                  "value": 149269.25
                },
                {
                  "name": "ZJPL006A0052",
                  "value": 150818.34375
                },
                {
                  "name": "ZJPL023C0059",
                  "value": 68932.796875
                },
                {
                  "name": "ZJPL006A0051",
                  "value": 82763.7578125
                },
                {
                  "name": "ZJPL006A0057",
                  "value": 235943.515625
                },
                {
                  "name": "UA01078.0001.00",
                  "value": 21651.0703125
                },
                {
                  "name": "ZJPL023C0191",
                  "value": 273884.71875
                },
                {
                  "name": "ZJPL023A0165",
                  "value": 318142.71875
                },
                {
                  "name": "UA01305.0003.00",
                  "value": 165700.078125
                },
                {
                  "name": "UA00694.0001.00",
                  "value": 18956.48046875
                },
                {
                  "name": "ZJPL023C0194",
                  "value": 17508.560546875
                },
                {
                  "name": "ZJPL023C0197",
                  "value": 10164.0
                },
                {
                  "name": "UA01306.0001.00",
                  "value": 6553.080078125
                },
                {
                  "name": "ZJPL023C0232",
                  "value": 8326.599609375
                },
                {
                  "name": "UA01385.0001.00",
                  "value": 81949.0
                },
                {
                  "name": "ZJPL023C0069",
                  "value": 273101.953125
                },
                {
                  "name": "ZJPL023C0104",
                  "value": 1264920.96875
                },
                {
                  "name": "ZJPL023C0225",
                  "value": 157891.529296875
                },
                {
                  "name": "ZJPL006A0063",
                  "value": 235746.203125
                },
                {
                  "name": "ZJPL023A0159",
                  "value": 3452.580078125
                },
                {
                  "name": "ZJPL006A0062",
                  "value": 447306.09375
                },
                {
                  "name": "ZJPL023C0227",
                  "value": 44225.87890625
                },
                {
                  "name": "UA01203.0001.00",
                  "value": 124.79000091552735
                },
                {
                  "name": "ZJPL023C0105",
                  "value": 52487.01171875
                },
                {
                  "name": "ZJPL023C0226",
                  "value": 315485.09765625
                },
                {
                  "name": "ZJPL023C0228",
                  "value": 15962.0703125
                },
                {
                  "name": "UA01373.0001.00",
                  "value": 218297.828125
                },
                {
                  "name": "UA01390.0001.00",
                  "value": 106545.90234375
                },
                {
                  "name": "UA01317.0002.00",
                  "value": 210361.640625
                },
                {
                  "name": "UA01299.0003.00",
                  "value": 19.940000534057618
                },
                {
                  "name": "ZJPL023C0160",
                  "value": 81721.1171875
                },
                {
                  "name": "ZJPL023A0111",
                  "value": 27980.0390625
                },
                {
                  "name": "UA00397.0001.00",
                  "value": 59.7599983215332
                },
                {
                  "name": "ZJPL023A0113",
                  "value": 14294.6396484375
                },
                {
                  "name": "ZJPL003A0009",
                  "value": 117480.70703125
                },
                {
                  "name": "ZJPL023A0112",
                  "value": 13732.9599609375
                },
                {
                  "name": "ZJPL023C0166",
                  "value": 2363.56005859375
                },
                {
                  "name": "ZJPL023C0045",
                  "value": 91578.7421875
                },
                {
                  "name": "ZJPL023C0157",
                  "value": 30693.6494140625
                },
                {
                  "name": "UA01080.0001.00",
                  "value": 4132.3701171875
                },
                {
                  "name": "ZJPL006A0074",
                  "value": 189101.015625
                },
                {
                  "name": "ZJPL023C0037",
                  "value": 8495.900390625
                },
                {
                  "name": "ZJPL006A0073",
                  "value": 366995.5
                },
                {
                  "name": "UA01381.0001.00",
                  "value": 93807.46875
                },
                {
                  "name": "UA01316.0002.00",
                  "value": 220464.8203125
                },
                {
                  "name": "ZJPL023C0052",
                  "value": 1951053.75
                },
                {
                  "name": "ZJPL023C0051",
                  "value": 1671370.75
                },
                {
                  "name": "ZJPL023C0175",
                  "value": 103771.8828125
                },
                {
                  "name": "ZJPL023C0054",
                  "value": 199282.921875
                },
                {
                  "name": "ZJPL023C0174",
                  "value": 175749.71484375
                },
                {
                  "name": "ZJPL023C0053",
                  "value": 163933.359375
                },
                {
                  "name": "ZJPL023A0186",
                  "value": 15623.5
                },
                {
                  "name": "ZJPL023C0056",
                  "value": 63745.0
                },
                {
                  "name": "ZJPL023C0055",
                  "value": 36837.8203125
                },
                {
                  "name": "ZJPL023C0168",
                  "value": 73959.859375
                },
                {
                  "name": "UA01204.0001.00",
                  "value": 368.8999938964844
                },
                {
                  "name": "ZJPL006A0083",
                  "value": 350.8399963378906
                },
                {
                  "name": "UA01209.0001.00",
                  "value": 41.2599983215332
                },
                {
                  "name": "ZJPL006A0091",
                  "value": 363887.46875
                },
                {
                  "name": "ZJPL023A0132",
                  "value": 158008.25
                },
                {
                  "name": "ZJPL023A0134",
                  "value": 415655.59375
                },
                {
                  "name": "UA00390.0001.00",
                  "value": 19.739999771118165
                },
                {
                  "name": "ZJPL023C0136",
                  "value": 1551945.375
                },
                {
                  "name": "UA00398.0001.00",
                  "value": 4828.3798828125
                },
                {
                  "name": "UA01318.0001.00",
                  "value": 3660.929931640625
                },
                {
                  "name": "ZJPL023A0125",
                  "value": 3833.219970703125
                },
                {
                  "name": "UA01320.0001.00",
                  "value": 167649.875
                },
                {
                  "name": "UA00886.0001.00",
                  "value": 958278.6875
                },
                {
                  "name": "UA00698.0002.00",
                  "value": 97120.4296875
                },
                {
                  "name": "ZJPL023C0151",
                  "value": 210214.94140625
                },
                {
                  "name": "ZJPL023A0123",
                  "value": 58335.6884765625
                },
                {
                  "name": "ZJPL023C0152",
                  "value": 90897.4375
                },
                {
                  "name": "ZJPL023C0155",
                  "value": 39016.6796875
                },
                {
                  "name": "UA00402.0001.00",
                  "value": 154.1199951171875
                },
                {
                  "name": "ZJPL023C0154",
                  "value": 77611.4013671875
                },
                {
                  "name": "ZJPL006A0022",
                  "value": 62124.83984375
                },
                {
                  "name": "ZJPL023C0146",
                  "value": 33887.828125
                },
                {
                  "name": "ZJPL023C0024",
                  "value": 59044.6796875
                },
                {
                  "name": "ZJPL023C0027",
                  "value": 180032.63671875
                },
                {
                  "name": "ZJPL023C0147",
                  "value": 87604.78125
                },
                {
                  "name": "ZJPL023C0026",
                  "value": 52006.140625
                },
                {
                  "name": "ZJPL023A0114",
                  "value": 11601.489990234375
                },
                {
                  "name": "ZJPL023A0117",
                  "value": 42240.5390625
                },
                {
                  "name": "ZJPL006A0024",
                  "value": 705918.046875
                },
                {
                  "name": "ZJPL006A0023",
                  "value": 358555.390625
                },
                {
                  "name": "UA00881.0001.00",
                  "value": 52791.53125
                },
                {
                  "name": "ZJPL023C0081",
                  "value": 49255.0
                },
                {
                  "name": "ZJPL023C0080",
                  "value": 27147.9296875
                },
                {
                  "name": "ZJPL023C0084",
                  "value": 107263.78125
                },
                {
                  "name": "UA00391.0001.00",
                  "value": 463.1700134277344
                },
                {
                  "name": "ZJPL023A0150",
                  "value": 6132.6201171875
                },
                {
                  "name": "UA00699.0001.00",
                  "value": 53994.21875
                },
                {
                  "name": "UA00408.0001.00",
                  "value": 185.3000030517578
                },
                {
                  "name": "UA01300.0001.00",
                  "value": 21171.6796875
                },
                {
                  "name": "UA01319.0001.00",
                  "value": 57409.078125
                },
                {
                  "name": "ZJPL023C0233",
                  "value": 10761.2001953125
                },
                {
                  "name": "ZJPL023C0235",
                  "value": 1560576.75
                },
                {
                  "name": "ZJPL023A0147",
                  "value": 6696.47998046875
                },
                {
                  "name": "ZJPL023C0097",
                  "value": 145662.0
                },
                {
                  "name": "ZJPL023C0130",
                  "value": 74.5199966430664
                },
                {
                  "name": "ZJPL006A0042",
                  "value": 275329.9375
                },
                {
                  "name": "UA01007.0001.00",
                  "value": 14.4399995803833
                },
                {
                  "name": "ZJPL023C0129",
                  "value": 8164.580078125
                },
                {
                  "name": "UA00695.0001.00",
                  "value": 14695.0302734375
                },
                {
                  "name": "ZJPL006A0049",
                  "value": 43571.490234375
                },
                {
                  "name": "UA01374.0001.00",
                  "value": 60558.51953125
                }
              ],
              "name": "CUSB LINE",
              "value": 20118698.17184162
            },
            {
              "children": [
                {
                  "name": "ZJCL007A0042",
                  "value": 1563840.125
                },
                {
                  "name": "ZJCL007A0041",
                  "value": 1236704.0
                },
                {
                  "name": "ZJCL007A0044",
                  "value": 892130.125
                },
                {
                  "name": "ZJC0007C5278",
                  "value": 388800.0
                },
                {
                  "name": "ZJPL007C0102",
                  "value": 1004487.09375
                },
                {
                  "name": "ZJPL007C0103",
                  "value": 707736.8125
                },
                {
                  "name": "ZJPL007C0104",
                  "value": 4458416.5
                },
                {
                  "name": "ZJPL007C0105",
                  "value": 9509160.0
                },
                {
                  "name": "ZJPL007C0106",
                  "value": 193309.046875
                },
                {
                  "name": "ZJPL007C0060",
                  "value": 15560.8095703125
                },
                {
                  "name": "ZJPL007C0061",
                  "value": 23072.33984375
                },
                {
                  "name": "ZJC0007C3651",
                  "value": 8785.2802734375
                },
                {
                  "name": "ZJC0007C2684",
                  "value": 676.52001953125
                },
                {
                  "name": "ZJPL007C0062",
                  "value": 205354.984375
                },
                {
                  "name": "ZJC0007C2689",
                  "value": 594.530029296875
                },
                {
                  "name": "ZJP0007C0268",
                  "value": 2561945.25
                },
                {
                  "name": "ZJPL007C0110",
                  "value": 499575.625
                },
                {
                  "name": "ZJPL007C0112",
                  "value": 312319.65625
                },
                {
                  "name": "SD00202.0001.00",
                  "value": 58.64999771118165
                },
                {
                  "name": "SD00324.0001.00",
                  "value": 597107.375
                },
                {
                  "name": "ZJPL007C0114",
                  "value": 1511136.875
                },
                {
                  "name": "ZJPL007C0115",
                  "value": 1103807.8125
                },
                {
                  "name": "ZJPL007A0163",
                  "value": 2844602.25
                },
                {
                  "name": "ZJPL007A0043",
                  "value": 2644810.5
                },
                {
                  "name": "ZJPL007A0164",
                  "value": 431816.3125
                },
                {
                  "name": "ZJPL007A0044",
                  "value": 482212.6875
                },
                {
                  "name": "ZJPL007A0165",
                  "value": 529826.1875
                },
                {
                  "name": "ZJPL007C0072",
                  "value": 6441952.0
                },
                {
                  "name": "ZJPL007A0166",
                  "value": 1244579.375
                },
                {
                  "name": "ZJC0007C3645",
                  "value": 363.0199890136719
                },
                {
                  "name": "ZJPL007A0161",
                  "value": 12368038.5
                },
                {
                  "name": "ZJPL007A0162",
                  "value": 2685067.5
                },
                {
                  "name": "SD00308.0002.00",
                  "value": 106650.6015625
                },
                {
                  "name": "ZJPL007C0107",
                  "value": 1890459.125
                },
                {
                  "name": "ZJPL007C0108",
                  "value": 4206315.0
                },
                {
                  "name": "ZJP0007C0253",
                  "value": 216210.9375
                },
                {
                  "name": "ZJPL007C0165",
                  "value": 25784.109375
                },
                {
                  "name": "ZJC0007C4361",
                  "value": 950.6699829101563
                },
                {
                  "name": "ZJPL007C0044",
                  "value": 6893741.25
                },
                {
                  "name": "ZJPL007C0045",
                  "value": 916489.8125
                },
                {
                  "name": "ZJPL007C0046",
                  "value": 17846995.5
                },
                {
                  "name": "ZJPL007A0119",
                  "value": 75.89999771118164
                },
                {
                  "name": "ZJPL007C0048",
                  "value": 24157572.0
                },
                {
                  "name": "ZJPL007C0049",
                  "value": 13586768.0
                },
                {
                  "name": "ZJC0007C3792",
                  "value": 873.5999755859375
                },
                {
                  "name": "ZJP0007C0251",
                  "value": 577532.875
                },
                {
                  "name": "ZJP0007C0252",
                  "value": 170068.03125
                },
                {
                  "name": "ZJPL007A0077",
                  "value": 4859365.0
                },
                {
                  "name": "ZJPL007A0110",
                  "value": 51.75
                },
                {
                  "name": "ZJPL007A0111",
                  "value": 39.20000076293945
                },
                {
                  "name": "SD00228.0001.00",
                  "value": 37.94999885559082
                },
                {
                  "name": "ZJPL007C0162",
                  "value": 421466.65625
                },
                {
                  "name": "ZJPL007C0163",
                  "value": 849012.125
                },
                {
                  "name": "ZJPL007C0043",
                  "value": 5002653.5
                },
                {
                  "name": "ZJCL007C0109",
                  "value": 85800.0
                },
                {
                  "name": "SD00200.0001.00",
                  "value": 27.599999427795415
                },
                {
                  "name": "ZJPL007A0109",
                  "value": 700612.625
                },
                {
                  "name": "ZJPL007C0055",
                  "value": 1488141.5
                },
                {
                  "name": "ZJPL007A0106",
                  "value": 191053.640625
                },
                {
                  "name": "ZJC0007A2461",
                  "value": 6.920000076293945
                },
                {
                  "name": "ZJPL007C0057",
                  "value": 12923.9501953125
                },
                {
                  "name": "ZJPL007C0058",
                  "value": 15344.33984375
                },
                {
                  "name": "ZJP0007C0267",
                  "value": 739324.9375
                },
                {
                  "name": "ZJPL007C0059",
                  "value": 13383.919921875
                },
                {
                  "name": "ZJPL007A0068",
                  "value": 231727.328125
                },
                {
                  "name": "ZJC0007C2972",
                  "value": 65.70999908447266
                },
                {
                  "name": "ZJPL007A0064",
                  "value": 27843.169921875
                },
                {
                  "name": "SD00464.0001.00",
                  "value": 245.0699920654297
                },
                {
                  "name": "ZJC0007C3789",
                  "value": 2059.7900390625
                },
                {
                  "name": "ZJPL007C0053",
                  "value": 451058.703125
                },
                {
                  "name": "ZJPL007C0054",
                  "value": 840845.625
                },
                {
                  "name": "SD00468.0001.00",
                  "value": 11.5
                },
                {
                  "name": "ZJP0007C0257",
                  "value": 314660.0625
                },
                {
                  "name": "ZJP0007C0231",
                  "value": 1242338.375
                },
                {
                  "name": "ZJPL007A0138",
                  "value": 115339.1171875
                },
                {
                  "name": "SD00454.0001.00",
                  "value": 1722.6099853515626
                },
                {
                  "name": "ZJPL007A0139",
                  "value": 145.97000122070313
                },
                {
                  "name": "ZJPL007A0018",
                  "value": 399593.4375
                },
                {
                  "name": "ZJCL007A0085",
                  "value": 15000.0
                },
                {
                  "name": "SD00392.0001.00",
                  "value": 605.4199829101563
                },
                {
                  "name": "ZJPL007C0146",
                  "value": 559207.25
                },
                {
                  "name": "ZJPL007C0147",
                  "value": 1540367.125
                },
                {
                  "name": "ZJPL007A0136",
                  "value": 8492.650390625
                },
                {
                  "name": "ZJP0007C0230",
                  "value": 191912.046875
                },
                {
                  "name": "ZJPL007A0137",
                  "value": 23449.0
                },
                {
                  "name": "ZJPL007A0132",
                  "value": 1677312.375
                },
                {
                  "name": "ZJPL007A0133",
                  "value": 2170368.5
                },
                {
                  "name": "ZJC0007C3856",
                  "value": 29133.029296875
                },
                {
                  "name": "ZJPL007A0093",
                  "value": 204220.40625
                },
                {
                  "name": "ZJPL007C0021",
                  "value": 15742.580078125
                },
                {
                  "name": "ZJPL007A0090",
                  "value": 605322.875
                },
                {
                  "name": "ZJC0007C3979",
                  "value": 1823.469970703125
                },
                {
                  "name": "ZJPL007A0091",
                  "value": 659407.9375
                },
                {
                  "name": "ZJPL007A0092",
                  "value": 152046.234375
                },
                {
                  "name": "ZJCL007C0006",
                  "value": 680518.1875
                },
                {
                  "name": "ZJPL007C0019",
                  "value": 1399.43994140625
                },
                {
                  "name": "SD00201.0001.00",
                  "value": 10.350000143051148
                },
                {
                  "name": "ZJP0007C0224",
                  "value": 91574.78125
                },
                {
                  "name": "ZJCL007C0085",
                  "value": 999200.0
                },
                {
                  "name": "SD00307.0003.00",
                  "value": 44265.0
                },
                {
                  "name": "SD00386.0001.00",
                  "value": 2129.419921875
                },
                {
                  "name": "ZJCL007C0086",
                  "value": 1973320.0
                },
                {
                  "name": "ZJC0007C3162",
                  "value": 247.41000366210938
                },
                {
                  "name": "ZJP0007C0242",
                  "value": 1763573.0
                },
                {
                  "name": "ZJPL007A0128",
                  "value": 5534.39013671875
                },
                {
                  "name": "ZJPL007A0008",
                  "value": 637079.53125
                },
                {
                  "name": "ZJPL007C0038",
                  "value": 46116.5390625
                },
                {
                  "name": "ZJPL007A0120",
                  "value": 64013.3203125
                },
                {
                  "name": "ZJPL007A0122",
                  "value": 490525.375
                },
                {
                  "name": "ZJPL007A0084",
                  "value": 257735.1875
                },
                {
                  "name": "ZJPL007C0032",
                  "value": 431904.71875
                },
                {
                  "name": "ZJC0007C2638",
                  "value": 729.3800048828125
                },
                {
                  "name": "ZJCL007C0018",
                  "value": 1683940.375
                },
                {
                  "name": "ZJCL007C0017",
                  "value": 334950.46875
                },
                {
                  "name": "IFF0001A4267",
                  "value": 183926.40625
                },
                {
                  "name": "ZJP0007C0297",
                  "value": 129494.8984375
                },
                {
                  "name": "ZJP0007C0299",
                  "value": 94543.8515625
                },
                {
                  "name": "ZJPL007C0003",
                  "value": 149626.40625
                },
                {
                  "name": "ZJCL007A0024",
                  "value": 528877.0625
                },
                {
                  "name": "ZJPL007C0005",
                  "value": 6609.1201171875
                },
                {
                  "name": "ZJPL007A0157",
                  "value": 892474.3125
                },
                {
                  "name": "ZJPL007A0158",
                  "value": 93596.953125
                },
                {
                  "name": "ZJPL007A0152",
                  "value": 603376.3125
                },
                {
                  "name": "ZJC0007C2388",
                  "value": 922.1300048828125
                },
                {
                  "name": "ZJPL007C0082",
                  "value": 548161.5625
                },
                {
                  "name": "ZJPL007A0155",
                  "value": 328862.40625
                },
                {
                  "name": "ZJC0007C2788",
                  "value": 1257.68994140625
                },
                {
                  "name": "ZJPL007C0240",
                  "value": 29272.3203125
                },
                {
                  "name": "ZJC0007C3997",
                  "value": 2342.2099609375
                },
                {
                  "name": "ZJPL007C0086",
                  "value": 76425.7265625
                },
                {
                  "name": "ZJPL007A0150",
                  "value": 19235095.5
                },
                {
                  "name": "ZJPL007A0151",
                  "value": 3868344.0
                },
                {
                  "name": "ZJC0007C2709",
                  "value": 235.55999755859376
                },
                {
                  "name": "ZJCL007C0023",
                  "value": 7301442.75
                },
                {
                  "name": "ZJP0007C0208",
                  "value": 1305223.4375
                },
                {
                  "name": "ZJCL007C0021",
                  "value": 2070438.125
                },
                {
                  "name": "SD00462.0001.00",
                  "value": 1009.7999877929688
                },
                {
                  "name": "ZJP0007C0202",
                  "value": 11071.490234375
                },
                {
                  "name": "ZJCL007C0020",
                  "value": 329898.25
                },
                {
                  "name": "ZJPL007C0099",
                  "value": 15568.0400390625
                },
                {
                  "name": "ZJP0007C0187",
                  "value": 32504.1796875
                },
                {
                  "name": "ZJPL007A0149",
                  "value": 10556195.25
                },
                {
                  "name": "ZJPL007C0136",
                  "value": 347309.90625
                },
                {
                  "name": "ZJPL007A0145",
                  "value": 19359836.0
                },
                {
                  "name": "ZJPL007C0137",
                  "value": 207431.0625
                },
                {
                  "name": "ZJPL007A0146",
                  "value": 53144080.0
                },
                {
                  "name": "ZJPL007A0141",
                  "value": 2147913.0
                },
                {
                  "name": "ZJPL007A0142",
                  "value": 612036.0
                },
                {
                  "name": "ZJPL007C0093",
                  "value": 516221.671875
                },
                {
                  "name": "ZJP0007C0181",
                  "value": 8709.25
                },
                {
                  "name": "ZJPL007A0143",
                  "value": 61578.9296875
                },
                {
                  "name": "ZJPL007A0144",
                  "value": 383752.5546875
                },
                {
                  "name": "ZJC0007C3988",
                  "value": 18597.30078125
                },
                {
                  "name": "ZJC0007C3985",
                  "value": 3216.389892578125
                },
                {
                  "name": "SD00209.0001.00",
                  "value": 46.68000030517578
                }
              ],
              "name": "CSSD LINE",
              "value": 287641939.50932577
            },
            {
              "children": [
                {
                  "name": "ZJCL001A0482",
                  "value": 0.8999999761581421
                },
                {
                  "name": "ZJPL001A0099",
                  "value": 1890.0
                },
                {
                  "name": "CD00038.0001.00",
                  "value": 7356.47998046875
                },
                {
                  "name": "ZJPL001A0092",
                  "value": 39866.37890625
                },
                {
                  "name": "ZJCL001A0483",
                  "value": 22.799999237060548
                },
                {
                  "name": "ZJCL001A0123",
                  "value": 3.799999952316284
                },
                {
                  "name": "CD01080.0001.00",
                  "value": 2361.360107421875
                },
                {
                  "name": "CD01033.0001.00",
                  "value": 72.93000030517578
                },
                {
                  "name": "ZJPL001A0085",
                  "value": 1210.93994140625
                },
                {
                  "name": "ZJCL001A0375",
                  "value": 1891.8399658203126
                },
                {
                  "name": "ZJPL001A0198",
                  "value": 112693.59375
                },
                {
                  "name": "ZJPL001A0195",
                  "value": 66960.0
                },
                {
                  "name": "ZJPL001A0194",
                  "value": 161886.388671875
                },
                {
                  "name": "ZJPL001A0192",
                  "value": 74859.751953125
                },
                {
                  "name": "ZJCL001C0198",
                  "value": 60579.51953125
                },
                {
                  "name": "ZJPL001A0190",
                  "value": 15891.849609375
                },
                {
                  "name": "ZJCL001A0100",
                  "value": 34026.30078125
                },
                {
                  "name": "ZJP0001C0645",
                  "value": 211045.6875
                },
                {
                  "name": "ZJP0001C0644",
                  "value": 145866.1328125
                },
                {
                  "name": "ZJP0001C0642",
                  "value": 1511.4599609375
                },
                {
                  "name": "ZJPL001A0188",
                  "value": 20348.900390625
                },
                {
                  "name": "ZJPL001A0187",
                  "value": 1771.0
                },
                {
                  "name": "CD00151.0001.00",
                  "value": 7610.6201171875
                },
                {
                  "name": "ZJPL001A0183",
                  "value": 14735.51953125
                },
                {
                  "name": "ZJPL001A0182",
                  "value": 195495.53125
                },
                {
                  "name": "ZJPL001A0181",
                  "value": 1045993.125
                },
                {
                  "name": "ZJPL001A0060",
                  "value": 76.16000366210938
                },
                {
                  "name": "ZJPL001A0180",
                  "value": 576.6799926757813
                },
                {
                  "name": "ZJCL001C0065",
                  "value": 53628.69140625
                },
                {
                  "name": "ZJCL001C0068",
                  "value": 13831.5595703125
                },
                {
                  "name": "ZJCL001C0067",
                  "value": 30903.599609375
                },
                {
                  "name": "ZJCL001A0111",
                  "value": 528318.421875
                },
                {
                  "name": "ZJCL001A0354",
                  "value": 9.5
                },
                {
                  "name": "ZJCL001A0117",
                  "value": 4.800000190734863
                },
                {
                  "name": "ZJCL001C0294",
                  "value": 15522.0
                },
                {
                  "name": "ZJCL001A0445",
                  "value": 366.70001220703127
                },
                {
                  "name": "ZJCL001A0324",
                  "value": 3.799999952316284
                },
                {
                  "name": "ZJCL001A0446",
                  "value": 577.5999755859375
                },
                {
                  "name": "ZJCL001C0298",
                  "value": 674450.375
                },
                {
                  "name": "ZJCL001A0327",
                  "value": 8.100000143051148
                },
                {
                  "name": "ZJCL001A0328",
                  "value": 7.599999904632568
                },
                {
                  "name": "ZJCL001A0333",
                  "value": 860685.375
                },
                {
                  "name": "CD00108.0001.00",
                  "value": 13691.25
                },
                {
                  "name": "ZJCL001A0330",
                  "value": 0.800000011920929
                },
                {
                  "name": "ZJCL001A0458",
                  "value": 45970.87109375
                },
                {
                  "name": "ZJCL001C0031",
                  "value": 2575.8798828125
                },
                {
                  "name": "ZJCL001C0033",
                  "value": 330661.59375
                },
                {
                  "name": "ZJCL001C0275",
                  "value": 348592.0
                },
                {
                  "name": "ZJCL001C0154",
                  "value": 41615.23828125
                },
                {
                  "name": "CD01120.0001.00",
                  "value": 698.5800170898438
                },
                {
                  "name": "CD01135.0001.00",
                  "value": 82239.2578125
                },
                {
                  "name": "CD00191.0001.00",
                  "value": 5380.10986328125
                },
                {
                  "name": "ZJCL001C0386",
                  "value": 55344.828125
                },
                {
                  "name": "ZJCL001C0026",
                  "value": 173980.671875
                },
                {
                  "name": "ZJCL001C0389",
                  "value": 210833.703125
                },
                {
                  "name": "ZJCL001A0430",
                  "value": 5.400000095367432
                },
                {
                  "name": "ZJCL001C0388",
                  "value": 68602.5
                },
                {
                  "name": "ZJCL001A0310",
                  "value": 9.5
                },
                {
                  "name": "ZJCL001A0431",
                  "value": 30.399999618530275
                },
                {
                  "name": "ZJP0001C0698",
                  "value": 176885.125
                },
                {
                  "name": "ZJP0001C0697",
                  "value": 158652.21875
                },
                {
                  "name": "ZJP0001C0696",
                  "value": 197342.984375
                },
                {
                  "name": "ZJCL001S0085",
                  "value": 11139.25
                },
                {
                  "name": "ZJPL001C0309",
                  "value": 86497.8984375
                },
                {
                  "name": "CD00269.0001.00",
                  "value": 373.260009765625
                },
                {
                  "name": "ZJPL001C0308",
                  "value": 45972.7109375
                },
                {
                  "name": "ZJPL001C0307",
                  "value": 52348.23046875
                },
                {
                  "name": "ZJCL001S0095",
                  "value": 1225879.75
                },
                {
                  "name": "ZJPL001C0302",
                  "value": 34938.6015625
                },
                {
                  "name": "ZJPL001C0301",
                  "value": 40958.78125
                },
                {
                  "name": "ZJPL001C0300",
                  "value": 7500.4501953125
                },
                {
                  "name": "ZJPL001C0306",
                  "value": 43710.28125
                },
                {
                  "name": "ZJPL001C0305",
                  "value": 2344.7999267578127
                },
                {
                  "name": "ZJPL001C0303",
                  "value": 220758.1171875
                },
                {
                  "name": "ZJCL001A0183",
                  "value": 7.199999809265137
                },
                {
                  "name": "ZJCL001A0184",
                  "value": 15.199999809265137
                },
                {
                  "name": "CD01032.0001.00",
                  "value": 2013.0
                },
                {
                  "name": "ZJCL001S0060",
                  "value": 5.699999809265137
                },
                {
                  "name": "ZJPL001C0313",
                  "value": 434979.625
                },
                {
                  "name": "ZJPL001C0312",
                  "value": 83445.8203125
                },
                {
                  "name": "ZJCL001S0063",
                  "value": 0.8999999761581421
                },
                {
                  "name": "ZJPL001C0311",
                  "value": 660976.4375
                },
                {
                  "name": "ZJCL001S0064",
                  "value": 20.899999618530275
                },
                {
                  "name": "ZJPL001C0310",
                  "value": 531220.75
                },
                {
                  "name": "ZJPL001C0317",
                  "value": 356395.78125
                },
                {
                  "name": "ZJPL001C0316",
                  "value": 109228.8359375
                },
                {
                  "name": "ZJCL001S0068",
                  "value": 2.700000047683716
                },
                {
                  "name": "ZJPL001C0314",
                  "value": 1189.530029296875
                },
                {
                  "name": "ZJC0001X0979",
                  "value": 264.59999084472659
                },
                {
                  "name": "ZJPL001C0331",
                  "value": 121984.3828125
                },
                {
                  "name": "ZJPL001C0330",
                  "value": 671894.75
                },
                {
                  "name": "ZJC0001X0971",
                  "value": 1546.1600341796876
                },
                {
                  "name": "ZJP0001C0819",
                  "value": 978382.625
                },
                {
                  "name": "ZJPL001C0329",
                  "value": 58994.25
                },
                {
                  "name": "ZJCL001S0073",
                  "value": 2.700000047683716
                },
                {
                  "name": "ZJCL001S0070",
                  "value": 1.7999999523162842
                },
                {
                  "name": "ZJCL001S0071",
                  "value": 1.899999976158142
                },
                {
                  "name": "ZJCL001S0074",
                  "value": 3.799999952316284
                },
                {
                  "name": "ZJPL001C0201",
                  "value": 36632.25
                },
                {
                  "name": "ZJPL001C0200",
                  "value": 76039.34765625
                },
                {
                  "name": "ZJPL001C0321",
                  "value": 24547.30078125
                },
                {
                  "name": "ZJPL001C0328",
                  "value": 8655.849609375
                },
                {
                  "name": "ZJCL001S0078",
                  "value": 0.8999999761581421
                },
                {
                  "name": "ZJPL001C0205",
                  "value": 3586.650146484375
                },
                {
                  "name": "ZJPL001C0204",
                  "value": 31141.9296875
                },
                {
                  "name": "ZJCL001S0039",
                  "value": 1.899999976158142
                },
                {
                  "name": "ZJP0001C0701",
                  "value": 2028161.125
                },
                {
                  "name": "ZJP0001C0700",
                  "value": 512236.09375
                },
                {
                  "name": "ZJCL001S0043",
                  "value": 7.599999904632568
                },
                {
                  "name": "ZJCL001S0041",
                  "value": 11.399999618530274
                },
                {
                  "name": "ZJCL001S0047",
                  "value": 11.399999618530274
                },
                {
                  "name": "ZJCL001S0049",
                  "value": 454320.0
                },
                {
                  "name": "CD00315.0001.00",
                  "value": 4459.509765625
                },
                {
                  "name": "ZJP0001C0838",
                  "value": 1250.219970703125
                },
                {
                  "name": "ZJCL001S0052",
                  "value": 5.5
                },
                {
                  "name": "ZJCL001S0059",
                  "value": 1.7999999523162842
                },
                {
                  "name": "ZJCL001S0056",
                  "value": 30.399999618530275
                },
                {
                  "name": "ZJCL001S0018",
                  "value": 1.899999976158142
                },
                {
                  "name": "ZJCL001S0016",
                  "value": 22064.779296875
                },
                {
                  "name": "ZJCL001A0024",
                  "value": 260.2199935913086
                },
                {
                  "name": "ZJCL001A0387",
                  "value": 5154.2001953125
                },
                {
                  "name": "ZJCL001S0021",
                  "value": 3.5999999046325685
                },
                {
                  "name": "CD01079.0001.00",
                  "value": 17.030000686645509
                },
                {
                  "name": "ZJCL001S0023",
                  "value": 0.800000011920929
                },
                {
                  "name": "ZJCL001S0145",
                  "value": 2910.0
                },
                {
                  "name": "CD00258.0001.00",
                  "value": 48.970001220703128
                },
                {
                  "name": "ZJCL001S0027",
                  "value": 1.899999976158142
                },
                {
                  "name": "ZJCL001A0035",
                  "value": 13.300000190734864
                },
                {
                  "name": "ZJCL001S0150",
                  "value": 43427.8603515625
                },
                {
                  "name": "ZJPL001C0261",
                  "value": 35520.3515625
                },
                {
                  "name": "ZJPL001C0260",
                  "value": 25096.2109375
                },
                {
                  "name": "ZJPL001C0023",
                  "value": 36387.359375
                },
                {
                  "name": "CD00188.0001.00",
                  "value": 249.44000244140626
                },
                {
                  "name": "ZJPL001C0022",
                  "value": 681945.546875
                },
                {
                  "name": "ZJPL001C0021",
                  "value": 271260.4375
                },
                {
                  "name": "ZJPL001C0020",
                  "value": 863056.75
                },
                {
                  "name": "ZJCL001C0530",
                  "value": 60634.0703125
                },
                {
                  "name": "ZJCL001C0418",
                  "value": 315696.5625
                },
                {
                  "name": "ZJCL001C0539",
                  "value": 171868.125
                },
                {
                  "name": "ZJPL001C0137",
                  "value": 48087.4306640625
                },
                {
                  "name": "ZJPL001C0136",
                  "value": 2541356.0
                },
                {
                  "name": "ZJPL001C0015",
                  "value": 1417967.75
                },
                {
                  "name": "ZJPL001C0135",
                  "value": 5741895.25
                },
                {
                  "name": "ZJPL001C0014",
                  "value": 256575.765625
                },
                {
                  "name": "ZJPL001C0134",
                  "value": 103049.23046875
                },
                {
                  "name": "ZJPL001C0013",
                  "value": 72227.2578125
                },
                {
                  "name": "ZJCL001S0124",
                  "value": 15210.0
                },
                {
                  "name": "ZJPL001C0019",
                  "value": 952460.125
                },
                {
                  "name": "ZJPL001C0018",
                  "value": 1111738.875
                },
                {
                  "name": "ZJPL001C0139",
                  "value": 113538.6171875
                },
                {
                  "name": "ZJPL001C0017",
                  "value": 737758.671875
                },
                {
                  "name": "ZJPL001C0138",
                  "value": 146652.91796875
                },
                {
                  "name": "ZJPL001C0259",
                  "value": 34357.48046875
                },
                {
                  "name": "ZJPL001C0151",
                  "value": 2248957.3125
                },
                {
                  "name": "ZJCL001S0005",
                  "value": 167.1999969482422
                },
                {
                  "name": "ZJCL001S0006",
                  "value": 74568.90234375
                },
                {
                  "name": "ZJPL001C0034",
                  "value": 92242.703125
                },
                {
                  "name": "ZJPL001C0155",
                  "value": 479136.0
                },
                {
                  "name": "ZJPL001C0276",
                  "value": 83955.431640625
                },
                {
                  "name": "ZJPL001C0154",
                  "value": 180660.015625
                },
                {
                  "name": "ZJPL001C0275",
                  "value": 30438.359375
                },
                {
                  "name": "ZJPL001C0153",
                  "value": 3337950.9375
                },
                {
                  "name": "ZJPL001C0274",
                  "value": 115719.75
                },
                {
                  "name": "ZJPL001C0152",
                  "value": 2974880.625
                },
                {
                  "name": "ZJCL001C0520",
                  "value": 4058.909912109375
                },
                {
                  "name": "ZJCL001C0527",
                  "value": 578140.875
                },
                {
                  "name": "ZJCL001C0529",
                  "value": 135432.953125
                },
                {
                  "name": "ZJCL001C0528",
                  "value": 467096.9375
                },
                {
                  "name": "ZJPL001C0269",
                  "value": 16947.740234375
                },
                {
                  "name": "ZJPL001C0268",
                  "value": 26426.400390625
                },
                {
                  "name": "ZJPL001C0146",
                  "value": 30305.869140625
                },
                {
                  "name": "ZJPL001C0267",
                  "value": 53968.66015625
                },
                {
                  "name": "ZJPL001C0025",
                  "value": 23772.25
                },
                {
                  "name": "ZJPL001C0024",
                  "value": 65724.5234375
                },
                {
                  "name": "ZJPL001C0145",
                  "value": 38933.23828125
                },
                {
                  "name": "ZJPL001C0266",
                  "value": 29320.240234375
                },
                {
                  "name": "ZJCL001S0015",
                  "value": 19754.0
                },
                {
                  "name": "ZJCL001S0136",
                  "value": 1344155.75
                },
                {
                  "name": "ZJCL001S0013",
                  "value": 433652.5
                },
                {
                  "name": "ZJCL001S0134",
                  "value": 28200.0
                },
                {
                  "name": "ZJPL001C0162",
                  "value": 250380.95703125
                },
                {
                  "name": "ZJPL001C0283",
                  "value": 1567955.0
                },
                {
                  "name": "ZJPL001C0161",
                  "value": 638.8800048828125
                },
                {
                  "name": "ZJPL001C0282",
                  "value": 121359.0234375
                },
                {
                  "name": "ZJPL001C0281",
                  "value": 257078.6484375
                },
                {
                  "name": "ZJPL001C0280",
                  "value": 109446.5380859375
                },
                {
                  "name": "ZJPL001C0166",
                  "value": 28263.5
                },
                {
                  "name": "ZJPL001C0287",
                  "value": 98188.7578125
                },
                {
                  "name": "ZJPL001C0165",
                  "value": 37438.421875
                },
                {
                  "name": "ZJPL001C0164",
                  "value": 140556.703125
                },
                {
                  "name": "ZJPL001C0285",
                  "value": 97499.63671875
                },
                {
                  "name": "ZJPL001C0163",
                  "value": 286301.671875
                },
                {
                  "name": "ZJPL001C0284",
                  "value": 43527.8896484375
                },
                {
                  "name": "ZJPL001C0038",
                  "value": 2869847.1875
                },
                {
                  "name": "ZJPL001C0159",
                  "value": 1487935.0
                },
                {
                  "name": "ZJPL001C0037",
                  "value": 2663317.8125
                },
                {
                  "name": "ZJPL001C0158",
                  "value": 99828.9765625
                },
                {
                  "name": "ZJPL001C0279",
                  "value": 395589.84375
                },
                {
                  "name": "ZJCL001C0519",
                  "value": 17640.0
                },
                {
                  "name": "ZJPL001C0157",
                  "value": 89366.609375
                },
                {
                  "name": "ZJPL001C0278",
                  "value": 923566.96875
                },
                {
                  "name": "ZJPL001C0036",
                  "value": 390068.03125
                },
                {
                  "name": "ZJPL001C0277",
                  "value": 584823.5703125
                },
                {
                  "name": "ZJPL001C0035",
                  "value": 30133.990234375
                },
                {
                  "name": "ZJPL001C0052",
                  "value": 146379.359375
                },
                {
                  "name": "ZJCL001S0107",
                  "value": 1.899999976158142
                },
                {
                  "name": "ZJPL001C0051",
                  "value": 31335.529296875
                },
                {
                  "name": "ZJPL001C0293",
                  "value": 2039.18994140625
                },
                {
                  "name": "ZJPL001C0050",
                  "value": 590411.25
                },
                {
                  "name": "ZJPL001C0171",
                  "value": 719298.28125
                },
                {
                  "name": "ZJPL001C0170",
                  "value": 371536.9375
                },
                {
                  "name": "ZJPL001C0291",
                  "value": 240000.0
                },
                {
                  "name": "ZJPL001C0177",
                  "value": 348198.625
                },
                {
                  "name": "ZJPL001C0056",
                  "value": 265916.0625
                },
                {
                  "name": "ZJPL001C0176",
                  "value": 1286239.875
                },
                {
                  "name": "ZJPL001C0175",
                  "value": 278490.09375
                },
                {
                  "name": "ZJPL001C0296",
                  "value": 2814.919921875
                },
                {
                  "name": "ZJPL001C0049",
                  "value": 741492.875
                },
                {
                  "name": "ZJPL001C0048",
                  "value": 1063023.515625
                },
                {
                  "name": "ZJPL001C0169",
                  "value": 105175.2890625
                },
                {
                  "name": "ZJCL001S0110",
                  "value": 1.899999976158142
                },
                {
                  "name": "ZJPL001C0047",
                  "value": 597788.078125
                },
                {
                  "name": "ZJPL001C0168",
                  "value": 162062.515625
                },
                {
                  "name": "ZJPL001C0167",
                  "value": 161115.6796875
                },
                {
                  "name": "ZJPL001C0288",
                  "value": 36503.6015625
                },
                {
                  "name": "ZJPL001C0046",
                  "value": 6560743.5
                },
                {
                  "name": "ZJC0001X0983",
                  "value": 3391.5000610351564
                },
                {
                  "name": "ZJPL001C0341",
                  "value": 68949.3125
                },
                {
                  "name": "ZJC0001X0984",
                  "value": 49.11000037193298
                },
                {
                  "name": "ZJPL001C0340",
                  "value": 469846.21875
                },
                {
                  "name": "ZJC0001X0985",
                  "value": 1819.7999725341798
                },
                {
                  "name": "ZJC0001X0986",
                  "value": 2044.739990234375
                },
                {
                  "name": "ZJC0001X0980",
                  "value": 18.200000762939454
                },
                {
                  "name": "ZJC0001X0981",
                  "value": 3843.6199951171877
                },
                {
                  "name": "ZJC0001X0982",
                  "value": 1537.7999572753907
                },
                {
                  "name": "ZJPL001C0214",
                  "value": 4275.8798828125
                },
                {
                  "name": "ZJPL001A0329",
                  "value": 713569.21875
                },
                {
                  "name": "ZJPL001C0213",
                  "value": 37294.708984375
                },
                {
                  "name": "ZJPL001C0333",
                  "value": 2001035.4375
                },
                {
                  "name": "ZJPL001A0328",
                  "value": 388120.96875
                },
                {
                  "name": "ZJPL001C0212",
                  "value": 4702.5
                },
                {
                  "name": "ZJPL001C0332",
                  "value": 333775.0625
                },
                {
                  "name": "ZJPL001A0327",
                  "value": 848948.03125
                },
                {
                  "name": "ZJPL001C0339",
                  "value": 164407.234375
                },
                {
                  "name": "ZJPL001C0218",
                  "value": 16481.3994140625
                },
                {
                  "name": "ZJPL001A0326",
                  "value": 914460.65625
                },
                {
                  "name": "ZJPL001A0325",
                  "value": 1033042.125
                },
                {
                  "name": "ZJPL001A0324",
                  "value": 2292332.8125
                },
                {
                  "name": "CD00036.0001.00",
                  "value": 28314.83984375
                },
                {
                  "name": "ZJPL001C0215",
                  "value": 26918.33984375
                },
                {
                  "name": "ZJPL001A0323",
                  "value": 1961442.875
                },
                {
                  "name": "ZJPL001A0321",
                  "value": 62569.23828125
                },
                {
                  "name": "ZJPL001A0320",
                  "value": 60641.73046875
                },
                {
                  "name": "ZJPL001C0232",
                  "value": 444792.03125
                },
                {
                  "name": "ZJPL001C0110",
                  "value": 495100.265625
                },
                {
                  "name": "ZJPL001A0319",
                  "value": 45029.25
                },
                {
                  "name": "ZJPL001C0104",
                  "value": 124041.6875
                },
                {
                  "name": "ZJPL001C0224",
                  "value": 34635.62890625
                },
                {
                  "name": "ZJPL001C0103",
                  "value": 664153.0
                },
                {
                  "name": "ZJPL001A0317",
                  "value": 46483.91015625
                },
                {
                  "name": "ZJPL001C0223",
                  "value": 73071.1171875
                },
                {
                  "name": "ZJPL001A0316",
                  "value": 140996.65625
                },
                {
                  "name": "ZJPL001C0222",
                  "value": 22894.6201171875
                },
                {
                  "name": "ZJPL001A0315",
                  "value": 21888.009765625
                },
                {
                  "name": "ZJPL001A0314",
                  "value": 209910.203125
                },
                {
                  "name": "ZJPL001A0313",
                  "value": 246741.34375
                },
                {
                  "name": "ZJPL001C0106",
                  "value": 1827525.984375
                },
                {
                  "name": "ZJPL001C0105",
                  "value": 3142747.8125
                },
                {
                  "name": "ZJPL001A0312",
                  "value": 143441.1875
                },
                {
                  "name": "ZJPL001A0311",
                  "value": 8440.75
                },
                {
                  "name": "ZJPL001A0310",
                  "value": 66.08000183105469
                },
                {
                  "name": "ZJPL001C0243",
                  "value": 62631.3984375
                },
                {
                  "name": "ZJPL001C0121",
                  "value": 16500.630859375
                },
                {
                  "name": "ZJPL001C0242",
                  "value": 39007.30859375
                },
                {
                  "name": "ZJPL001C0241",
                  "value": 104494.6796875
                },
                {
                  "name": "ZJPL001C0240",
                  "value": 401370.875
                },
                {
                  "name": "ZJPL001C0236",
                  "value": 122904.8984375
                },
                {
                  "name": "ZJPL001C0115",
                  "value": 358824.0859375
                },
                {
                  "name": "ZJPL001C0235",
                  "value": 41736.30859375
                },
                {
                  "name": "ZJPL001C0114",
                  "value": 60880.8984375
                },
                {
                  "name": "ZJPL001C0234",
                  "value": 425994.46875
                },
                {
                  "name": "ZJPL001C0233",
                  "value": 845725.75
                },
                {
                  "name": "ZJPL001C0119",
                  "value": 288125.90625
                },
                {
                  "name": "ZJPL001A0303",
                  "value": 484097.265625
                },
                {
                  "name": "ZJPL001C0239",
                  "value": 178286.109375
                },
                {
                  "name": "ZJPL001C0238",
                  "value": 205382.421875
                },
                {
                  "name": "CD01081.0001.00",
                  "value": 62.36000061035156
                },
                {
                  "name": "ZJPL001C0117",
                  "value": 279936.0
                },
                {
                  "name": "ZJPL001A0302",
                  "value": 1528504.34375
                },
                {
                  "name": "ZJPL001C0237",
                  "value": 139897.375
                },
                {
                  "name": "ZJPL001A0301",
                  "value": 1437086.4375
                },
                {
                  "name": "ZJPL001C0116",
                  "value": 275672.703125
                },
                {
                  "name": "ZJPL001A0300",
                  "value": 444547.9375
                },
                {
                  "name": "ZJPL001C0012",
                  "value": 341838.90625
                },
                {
                  "name": "ZJPL001C0010",
                  "value": 411553.875
                },
                {
                  "name": "ZJPL001C0005",
                  "value": 1120.050048828125
                },
                {
                  "name": "ZJPL001C0247",
                  "value": 46483.83984375
                },
                {
                  "name": "ZJPL001C0125",
                  "value": 445216.96875
                },
                {
                  "name": "ZJPL001C0246",
                  "value": 35603.37890625
                },
                {
                  "name": "ZJPL001C0004",
                  "value": 64813.078125
                },
                {
                  "name": "ZJPL001C0003",
                  "value": 603120.1875
                },
                {
                  "name": "ZJPL001C0002",
                  "value": 276.8699951171875
                },
                {
                  "name": "ZJPL001C0129",
                  "value": 3874690.5
                },
                {
                  "name": "ZJPL001C0007",
                  "value": 158355.28125
                },
                {
                  "name": "ZJPL001C0249",
                  "value": 35514.4609375
                },
                {
                  "name": "ZJPL001C0006",
                  "value": 84.94999694824219
                },
                {
                  "name": "ZJPL001C0248",
                  "value": 49461.53125
                },
                {
                  "name": "ZJPL001A0377",
                  "value": 88666.078125
                },
                {
                  "name": "ZJPL001A0135",
                  "value": 360025.796875
                },
                {
                  "name": "ZJPL001A0134",
                  "value": 419349.046875
                },
                {
                  "name": "ZJPL001A0376",
                  "value": 124603.921875
                },
                {
                  "name": "ZJPL001A0375",
                  "value": 443053.15625
                },
                {
                  "name": "ZJPL001A0373",
                  "value": 178487.59375
                },
                {
                  "name": "ZJPL001A0372",
                  "value": 710705.9375
                },
                {
                  "name": "ZJCL001C0370",
                  "value": 8359.8095703125
                },
                {
                  "name": "ZJPL001A0371",
                  "value": 939605.53125
                },
                {
                  "name": "ZJPL001A0370",
                  "value": 853591.578125
                },
                {
                  "name": "CD00237.0001.00",
                  "value": 653.4000091552734
                },
                {
                  "name": "ZJCL001C0493",
                  "value": 540188.25
                },
                {
                  "name": "ZJCL001C0495",
                  "value": 24939.859375
                },
                {
                  "name": "ZJPL001S0003",
                  "value": 14894.2099609375
                },
                {
                  "name": "ZJCL001C0014",
                  "value": 26407.5
                },
                {
                  "name": "ZJCL001C0498",
                  "value": 3726220.25
                },
                {
                  "name": "ZJCL001C0138",
                  "value": 130122.0
                },
                {
                  "name": "ZJCL001C0258",
                  "value": 473337.75
                },
                {
                  "name": "ZJCL001A0526",
                  "value": 30.399999618530275
                },
                {
                  "name": "ZJPL001A0369",
                  "value": 2236992.84375
                },
                {
                  "name": "ZJPL001A0368",
                  "value": 2422364.21875
                },
                {
                  "name": "ZJPL001A0367",
                  "value": 3150559.5
                },
                {
                  "name": "ZJPL001A0364",
                  "value": 802489.6875
                },
                {
                  "name": "ZJPL001A0363",
                  "value": 1530181.84375
                },
                {
                  "name": "ZJPL001A0362",
                  "value": 1457153.6875
                },
                {
                  "name": "ZJCL001C0480",
                  "value": 769987.59375
                },
                {
                  "name": "ZJCL001C0360",
                  "value": 1474007.375
                },
                {
                  "name": "ZJCL001C0242",
                  "value": 427113.59375
                },
                {
                  "name": "CD01114.0001.00",
                  "value": 77.94999694824219
                },
                {
                  "name": "ZJPL001A0359",
                  "value": 703068.84375
                },
                {
                  "name": "ZJPL001A0238",
                  "value": 160359.4765625
                },
                {
                  "name": "ZJPL001A0358",
                  "value": 4918297.5
                },
                {
                  "name": "ZJPL001A0236",
                  "value": 128.81999588012696
                },
                {
                  "name": "ZJPL001A0235",
                  "value": 121249.568359375
                },
                {
                  "name": "ZJPL001A0231",
                  "value": 266612.484375
                },
                {
                  "name": "ZJCL001C0350",
                  "value": 16354.3701171875
                },
                {
                  "name": "ZJCL001C0470",
                  "value": 106709.7890625
                },
                {
                  "name": "ZJCL001C0351",
                  "value": 326734.84375
                },
                {
                  "name": "ZJCL001C0354",
                  "value": 1313649.0
                },
                {
                  "name": "ZJCL001C0474",
                  "value": 3437255.25
                },
                {
                  "name": "ZJCL001C0234",
                  "value": 66442.1796875
                },
                {
                  "name": "ZJCL001C0476",
                  "value": 208987.59375
                },
                {
                  "name": "ZJCL001C0238",
                  "value": 7.599999904632568
                },
                {
                  "name": "ZJPL001A0349",
                  "value": 414323.90625
                },
                {
                  "name": "ZJPL001A0346",
                  "value": 262726.0
                },
                {
                  "name": "ZJPL001A0345",
                  "value": 224136.46875
                },
                {
                  "name": "ZJPL001A0343",
                  "value": 76339.1484375
                },
                {
                  "name": "ZJPL001A0342",
                  "value": 10433.2802734375
                },
                {
                  "name": "ZJCL001C0342",
                  "value": 3660.0
                },
                {
                  "name": "ZJCL001C0463",
                  "value": 7106.39990234375
                },
                {
                  "name": "ZJCL001C0346",
                  "value": 701910.3125
                },
                {
                  "name": "ZJCL001C0467",
                  "value": 3146226.0
                },
                {
                  "name": "CD00300.0001.00",
                  "value": 324.6400146484375
                },
                {
                  "name": "ZJCL001C0229",
                  "value": 162607.796875
                },
                {
                  "name": "ZJPL001A0058",
                  "value": 1265.989990234375
                },
                {
                  "name": "ZJPL001A0179",
                  "value": 3823.56005859375
                },
                {
                  "name": "ZJPL001C0184",
                  "value": 20125.900390625
                },
                {
                  "name": "ZJPL001A0178",
                  "value": 606562.75
                },
                {
                  "name": "ZJPL001A0299",
                  "value": 2563386.625
                },
                {
                  "name": "ZJPL001A0298",
                  "value": 1030457.0625
                },
                {
                  "name": "ZJPL001C0061",
                  "value": 101419.0
                },
                {
                  "name": "ZJPL001A0177",
                  "value": 287.44000244140627
                },
                {
                  "name": "ZJPL001C0060",
                  "value": 197290.546875
                },
                {
                  "name": "ZJPL001A0175",
                  "value": 1590259.6875
                },
                {
                  "name": "ZJPL001C0067",
                  "value": 269181.1875
                },
                {
                  "name": "ZJPL001A0174",
                  "value": 79.75
                },
                {
                  "name": "ZJPL001C0066",
                  "value": 410373.15625
                },
                {
                  "name": "ZJPL001A0173",
                  "value": 789.6900024414063
                },
                {
                  "name": "ZJPL001C0065",
                  "value": 430090.03125
                },
                {
                  "name": "ZJPL001A0172",
                  "value": 1708933.0
                },
                {
                  "name": "ZJPL001C0064",
                  "value": 109945.0078125
                },
                {
                  "name": "ZJCL001C0330",
                  "value": 58.400001525878909
                },
                {
                  "name": "ZJCL001C0333",
                  "value": 194922.296875
                },
                {
                  "name": "ZJCL001C0454",
                  "value": 1002000.0
                },
                {
                  "name": "ZJCL001C0458",
                  "value": 169.88999938964845
                },
                {
                  "name": "ZJPL001C0059",
                  "value": 75574.1796875
                },
                {
                  "name": "ZJPL001C0057",
                  "value": 5697836.0
                },
                {
                  "name": "ZJPL001C0299",
                  "value": 32917.05859375
                },
                {
                  "name": "ZJPL001A0049",
                  "value": 68082.837890625
                },
                {
                  "name": "ZJPL001C0074",
                  "value": 162950.984375
                },
                {
                  "name": "ZJPL001C0195",
                  "value": 638894.875
                },
                {
                  "name": "ZJPL001C0073",
                  "value": 47557.96875
                },
                {
                  "name": "ZJPL001C0194",
                  "value": 203678.10546875
                },
                {
                  "name": "ZJPL001C0193",
                  "value": 950953.125
                },
                {
                  "name": "ZJPL001C0072",
                  "value": 60654.8203125
                },
                {
                  "name": "ZJPL001C0071",
                  "value": 1619944.53125
                },
                {
                  "name": "ZJPL001C0199",
                  "value": 14772.990234375
                },
                {
                  "name": "ZJPL001C0078",
                  "value": 708909.75
                },
                {
                  "name": "ZJPL001C0077",
                  "value": 458050.3125
                },
                {
                  "name": "ZJPL001C0075",
                  "value": 104354.5390625
                },
                {
                  "name": "ZJPL001A0281",
                  "value": 85.06999969482422
                },
                {
                  "name": "ZJPL001A0160",
                  "value": 2023155.46875
                },
                {
                  "name": "ZJPL001C0070",
                  "value": 3250531.25
                },
                {
                  "name": "ZJCL001C0320",
                  "value": 6062.83984375
                },
                {
                  "name": "ZJCL001C0323",
                  "value": 330074.90625
                },
                {
                  "name": "ZJCL001C0443",
                  "value": 111136.40625
                },
                {
                  "name": "ZJCL001C0329",
                  "value": 23349.140625
                },
                {
                  "name": "ZJCL001C0328",
                  "value": 2373727.0
                },
                {
                  "name": "ZJPL001C0069",
                  "value": 1406492.53125
                },
                {
                  "name": "ZJPL001C0068",
                  "value": 1205805.90625
                },
                {
                  "name": "ZJPL001A0159",
                  "value": 1738866.40625
                },
                {
                  "name": "ZJPL001C0085",
                  "value": 258289.0
                },
                {
                  "name": "ZJPL001A0157",
                  "value": 2670441.25
                },
                {
                  "name": "ZJPL001C0084",
                  "value": 2586306.25
                },
                {
                  "name": "ZJPL001A0156",
                  "value": 5432731.25
                },
                {
                  "name": "ZJPL001C0083",
                  "value": 835476.625
                },
                {
                  "name": "ZJPL001A0154",
                  "value": 1966844.9375
                },
                {
                  "name": "ZJPL001C0082",
                  "value": 1140117.375
                },
                {
                  "name": "ZJPL001A0153",
                  "value": 12332653.0
                },
                {
                  "name": "ZJPL001C0087",
                  "value": 2616342.5
                },
                {
                  "name": "ZJPL001A0151",
                  "value": 755134.78125
                },
                {
                  "name": "ZJPL001A0150",
                  "value": 3372026.875
                },
                {
                  "name": "ZJPL001A0271",
                  "value": 432559.96875
                },
                {
                  "name": "ZJPL001C0086",
                  "value": 346736.0
                },
                {
                  "name": "ZJPL001A0270",
                  "value": 1719847.375
                },
                {
                  "name": "ZJPL001C0081",
                  "value": 503301.59375
                },
                {
                  "name": "ZJPL001C0080",
                  "value": 659255.203125
                },
                {
                  "name": "ZJCL001C0430",
                  "value": 228299.375
                },
                {
                  "name": "ZJCL001C0313",
                  "value": 69945.1171875
                },
                {
                  "name": "ZJCL001C0319",
                  "value": 2449.840087890625
                },
                {
                  "name": "ZJPL001C0079",
                  "value": 749373.046875
                },
                {
                  "name": "ZJPL001A0269",
                  "value": 476386.25
                },
                {
                  "name": "ZJPL001A0268",
                  "value": 1665802.375
                },
                {
                  "name": "ZJPL001A0026",
                  "value": 492.239990234375
                },
                {
                  "name": "ZJPL001C0096",
                  "value": 123709.24609375
                },
                {
                  "name": "ZJPL001A0267",
                  "value": 524786.625
                },
                {
                  "name": "ZJPL001A0387",
                  "value": 69799.890625
                },
                {
                  "name": "ZJPL001C0095",
                  "value": 647170.65625
                },
                {
                  "name": "ZJPL001A0266",
                  "value": 1011752.90625
                },
                {
                  "name": "ZJPL001A0144",
                  "value": 4369665.5
                },
                {
                  "name": "ZJPL001C0094",
                  "value": 130673.7734375
                },
                {
                  "name": "ZJPL001A0265",
                  "value": 2259948.0
                },
                {
                  "name": "ZJPL001A0264",
                  "value": 4669990.5
                },
                {
                  "name": "ZJPL001A0385",
                  "value": 431939.03125
                },
                {
                  "name": "ZJPL001A0143",
                  "value": 1374117.0
                },
                {
                  "name": "ZJPL001C0093",
                  "value": 1179932.75
                },
                {
                  "name": "ZJPL001A0263",
                  "value": 1919195.5
                },
                {
                  "name": "ZJPL001A0384",
                  "value": 98775.5234375
                },
                {
                  "name": "ZJPL001A0142",
                  "value": 663.0999755859375
                },
                {
                  "name": "ZJPL001A0383",
                  "value": 30342.94921875
                },
                {
                  "name": "ZJPL001A0262",
                  "value": 169712.1484375
                },
                {
                  "name": "ZJPL001A0141",
                  "value": 611266.125
                },
                {
                  "name": "ZJPL001A0140",
                  "value": 5187959.5
                },
                {
                  "name": "ZJPL001A0261",
                  "value": 3685092.25
                },
                {
                  "name": "ZJPL001A0382",
                  "value": 8222.4404296875
                },
                {
                  "name": "ZJCL001C0420",
                  "value": 653543.5625
                },
                {
                  "name": "ZJPL001C0092",
                  "value": 8137053.0
                },
                {
                  "name": "CD00107.0001.00",
                  "value": 7446.990234375
                },
                {
                  "name": "ZJPL001C0091",
                  "value": 559972.3125
                },
                {
                  "name": "ZJCL001C0422",
                  "value": 200622.40625
                },
                {
                  "name": "ZJPL001C0090",
                  "value": 439964.03125
                },
                {
                  "name": "ZJCL001C0421",
                  "value": 418439.53125
                },
                {
                  "name": "ZJPL001S0010",
                  "value": 145754.125
                },
                {
                  "name": "ZJCL001C0302",
                  "value": 13136.580078125
                },
                {
                  "name": "ZJCL001C0428",
                  "value": 991006.125
                },
                {
                  "name": "ZJCL001C0308",
                  "value": 2535.6298828125
                },
                {
                  "name": "ZJPL001A0139",
                  "value": 11808.5
                },
                {
                  "name": "ZJPL001A0138",
                  "value": 1848592.875
                },
                {
                  "name": "ZJPL001A0137",
                  "value": 1484024.8125
                },
                {
                  "name": "ZJPL001A0258",
                  "value": 3306.06005859375
                },
                {
                  "name": "CD01115.0001.00",
                  "value": 191.07999801635743
                },
                {
                  "name": "ZJPL001A0136",
                  "value": 12619.6796875
                },
                {
                  "name": "ZJPL001A0378",
                  "value": 20756.349609375
                }
              ],
              "name": "CCARD LINE",
              "value": 261096084.65105463
            }
          ],
          "name": "Lexar BG",
          "value": 606670606.9626808
        },
        {
          "children": [
            {
              "children": [
                {
                  "name": "ZJC0001S1416",
                  "value": 1.899999976158142
                },
                {
                  "name": "ZJC0001X0423",
                  "value": 77.0
                },
                {
                  "name": "ZJC0001X1514",
                  "value": 4973.2900390625
                },
                {
                  "name": "ZJC0001X0667",
                  "value": 9.49999988079071
                },
                {
                  "name": "ZJC0001X0623",
                  "value": 133.00000190734864
                },
                {
                  "name": "ZJC0001X1112",
                  "value": 68.39999771118164
                },
                {
                  "name": "ZJC0001C1471",
                  "value": 85400.0
                },
                {
                  "name": "ZJC0001X1158",
                  "value": 36.900001525878909
                },
                {
                  "name": "ZJC0001X0300",
                  "value": 35.0
                },
                {
                  "name": "ZJC0001S0803",
                  "value": 15631.599609375
                },
                {
                  "name": "ZJC0001S0968",
                  "value": 6120.0
                },
                {
                  "name": "ZJC0001S0209",
                  "value": 3.799999952316284
                },
                {
                  "name": "WHP0003S1827",
                  "value": 3.759999990463257
                },
                {
                  "name": "ZJC0001A1948",
                  "value": 23.31999969482422
                },
                {
                  "name": "ZJC0001C1435",
                  "value": 35040.0
                },
                {
                  "name": "ZJC0001C1398",
                  "value": 30600.0
                },
                {
                  "name": "ZJC0001S1066",
                  "value": 26745.0
                },
                {
                  "name": "ZJP0001S0305",
                  "value": 17056.0
                },
                {
                  "name": "ZJC0001X0903",
                  "value": 95.0
                },
                {
                  "name": "ZJC0001S1105",
                  "value": 13440.900390625
                },
                {
                  "name": "ZJC0001X0759",
                  "value": 4.800000190734863
                },
                {
                  "name": "ZJC0001X1203",
                  "value": 3850.0
                },
                {
                  "name": "ZJC0001S1421",
                  "value": 3.799999952316284
                },
                {
                  "name": "ZJC0001X1684",
                  "value": 31800.0
                },
                {
                  "name": "ZJC0001X0275",
                  "value": 18.99999976158142
                },
                {
                  "name": "ZJC0001X0074",
                  "value": 64.5999984741211
                },
                {
                  "name": "ZJC0001X0075",
                  "value": 108.0
                },
                {
                  "name": "ZJC0001X1087",
                  "value": 752.3999862670899
                },
                {
                  "name": "ZJP0001S0351",
                  "value": 78450.0
                },
                {
                  "name": "ZJP0001S0350",
                  "value": 17744.0
                },
                {
                  "name": "ZJP0001S0352",
                  "value": 64932.0
                },
                {
                  "name": "ZJP0001S0355",
                  "value": 33856.0
                },
                {
                  "name": "ZJC0001C1465",
                  "value": 10440.0
                },
                {
                  "name": "ZJP0001S0354",
                  "value": 128634.0
                },
                {
                  "name": "ZJC0001C1466",
                  "value": 34800.0
                },
                {
                  "name": "ZJC0001A1477",
                  "value": 2119.1201171875
                },
                {
                  "name": "ZJC0001S1551",
                  "value": 56821.6484375
                },
                {
                  "name": "ZJC0001S1271",
                  "value": 7.599999904632568
                },
                {
                  "name": "ZJC0001X0519",
                  "value": 28.5
                },
                {
                  "name": "ZJC0001X1658",
                  "value": 12749.6103515625
                },
                {
                  "name": "ZJC0001S0303",
                  "value": 3.799999952316284
                },
                {
                  "name": "ZJC0001S0982",
                  "value": 3.799999952316284
                },
                {
                  "name": "ZJC0001X0242",
                  "value": 105.4000015258789
                },
                {
                  "name": "ZJC0001X0440",
                  "value": 21.0
                },
                {
                  "name": "ZJC0001X1496",
                  "value": 182940.0
                },
                {
                  "name": "ZJC0001X0089",
                  "value": 30.399999618530275
                },
                {
                  "name": "ZJP0001C0809",
                  "value": 15296.0
                },
                {
                  "name": "ZJC0001X1693",
                  "value": 1286.1400146484376
                },
                {
                  "name": "ZJC0001C1414",
                  "value": 49400.0
                },
                {
                  "name": "ZJP0001S0320",
                  "value": 8528.0
                },
                {
                  "name": "ZJC0001C1459",
                  "value": 220500.0
                },
                {
                  "name": "ZJP0001C0843",
                  "value": 15520.0
                },
                {
                  "name": "ZJC0001C1412",
                  "value": 137215.9375
                },
                {
                  "name": "ZJC0001S0592",
                  "value": 11.399999618530274
                },
                {
                  "name": "ZJC0001S1083",
                  "value": 3.200000047683716
                },
                {
                  "name": "ZJC0001X1823",
                  "value": 94140.0
                },
                {
                  "name": "ZJC0001X0538",
                  "value": 125.39999771118166
                },
                {
                  "name": "ZJC0001S1644",
                  "value": 246500.0
                },
                {
                  "name": "ZJC0001X0137",
                  "value": 3.799999952316284
                },
                {
                  "name": "ZJC0001X1786",
                  "value": 15600.0
                },
                {
                  "name": "ZJC0001X0138",
                  "value": 11.399999856948853
                },
                {
                  "name": "ZJC0001S1929",
                  "value": 72801.4609375
                },
                {
                  "name": "ZJC0001X1386",
                  "value": 10.800000429153443
                },
                {
                  "name": "ZJC0001X0850",
                  "value": 55.0
                },
                {
                  "name": "ZJC0001S1606",
                  "value": 14040.08984375
                },
                {
                  "name": "ZJP0001S0374",
                  "value": 12614.400390625
                },
                {
                  "name": "ZJC0001C1444",
                  "value": 11600.0
                },
                {
                  "name": "ZJC0001S0282",
                  "value": 3.799999952316284
                },
                {
                  "name": "ZJC0001S1490",
                  "value": 24.5
                },
                {
                  "name": "ZJC0001S0082",
                  "value": 17.100000381469728
                }
              ],
              "name": "ST CARD LINE",
              "value": 1811092.277616024
            },
            {
              "children": [
                {
                  "name": "ZJC0001X1514",
                  "value": 4378.60009765625
                },
                {
                  "name": "ZJC0001S0968",
                  "value": 3.799999952316284
                },
                {
                  "name": "ZJC0007X1317",
                  "value": 967476.625
                },
                {
                  "name": "ZJC0007X1315",
                  "value": 535392.0
                },
                {
                  "name": "ZJC0007X1316",
                  "value": 1012925.1875
                },
                {
                  "name": "ZJC0007X1679",
                  "value": 1419600.28125
                },
                {
                  "name": "ZJC0007X1680",
                  "value": 880303.5
                },
                {
                  "name": "ZJC0007X1683",
                  "value": 1057414.375
                },
                {
                  "name": "ZJC0007X1681",
                  "value": 336127.90625
                },
                {
                  "name": "ZJC0007X1682",
                  "value": 235020.703125
                },
                {
                  "name": "IFF0001A3406",
                  "value": 911161.375
                },
                {
                  "name": "IFF0001A3401",
                  "value": 299591.375
                },
                {
                  "name": "IFF0001A3400",
                  "value": 3003916.25
                },
                {
                  "name": "IFF0001A3093",
                  "value": 26668.009765625
                },
                {
                  "name": "ZJC0007X1323",
                  "value": 154132.4375
                },
                {
                  "name": "IFW0001A1798",
                  "value": 8404.0
                },
                {
                  "name": "ZJC0007X0359",
                  "value": 298119.1875
                },
                {
                  "name": "ZJC0007X1694",
                  "value": 662522.5625
                },
                {
                  "name": "ZJC0007X1695",
                  "value": 494903.6875
                },
                {
                  "name": "ZJC0001S1034",
                  "value": 6607.35009765625
                },
                {
                  "name": "ZJC0007X1655",
                  "value": 10526019.75
                },
                {
                  "name": "ZJC0007X1894",
                  "value": 833169.25
                },
                {
                  "name": "ZJC0007X1895",
                  "value": 122441.921875
                },
                {
                  "name": "ZJC0007X1658",
                  "value": 3568802.5
                },
                {
                  "name": "ZJC0007X1659",
                  "value": 4061154.5
                },
                {
                  "name": "ZJC0007A5444",
                  "value": 515.1600036621094
                },
                {
                  "name": "ZJC0007X1656",
                  "value": 10780800.0
                },
                {
                  "name": "ZJC0007X1657",
                  "value": 9534518.25
                },
                {
                  "name": "ZJC0003A3230",
                  "value": 11589.599609375
                },
                {
                  "name": "ZJC0007X1783",
                  "value": 1158821.0625
                },
                {
                  "name": "ZJC0007X1660",
                  "value": 292680.0
                },
                {
                  "name": "ZJC0007X2071",
                  "value": 291160.0
                },
                {
                  "name": "ZJC0007X2070",
                  "value": 240640.0
                },
                {
                  "name": "ZJC0007X1308",
                  "value": 470836.8125
                },
                {
                  "name": "ZJC0007X1302",
                  "value": 753625.0
                },
                {
                  "name": "ZJC0007X1303",
                  "value": 327198.3125
                },
                {
                  "name": "ZJC0007X1784",
                  "value": 708802.359375
                },
                {
                  "name": "ZJC0007X1306",
                  "value": 4238369.25
                },
                {
                  "name": "ZJC0007X1788",
                  "value": 284875.90625
                },
                {
                  "name": "ZJC0007X1789",
                  "value": 379440.0
                },
                {
                  "name": "IFF0001A3751",
                  "value": 6863.919921875
                },
                {
                  "name": "ZJC0007X1790",
                  "value": 388124.15625
                },
                {
                  "name": "ZJC0007X1874",
                  "value": 90786.78125
                },
                {
                  "name": "ZJC0007X1875",
                  "value": 243043.71875
                },
                {
                  "name": "ZJC0007X1751",
                  "value": 816000.0
                },
                {
                  "name": "ZJC0007X1879",
                  "value": 267026.59375
                },
                {
                  "name": "ZJC0007X1876",
                  "value": 8320.0
                },
                {
                  "name": "ZJC0007X1877",
                  "value": 247904.0
                },
                {
                  "name": "IFF0001A3286",
                  "value": 642880.0
                },
                {
                  "name": "IFF0001A3043",
                  "value": 10633.1201171875
                },
                {
                  "name": "ZJC0007X1760",
                  "value": 320305.4375
                },
                {
                  "name": "ZJC0007X2299",
                  "value": 406400.0
                },
                {
                  "name": "ZJC0007X1761",
                  "value": 262144.0
                },
                {
                  "name": "ZJC0007X1880",
                  "value": 79325.3984375
                },
                {
                  "name": "ZJC0007X2298",
                  "value": 147600.0
                },
                {
                  "name": "IFF0001A4012",
                  "value": 5403498.5
                },
                {
                  "name": "ZJC0007X2291",
                  "value": 260401.203125
                },
                {
                  "name": "ZJC0007X2292",
                  "value": 1261269.625
                },
                {
                  "name": "IFF0001A2752",
                  "value": 78910.2890625
                },
                {
                  "name": "IFF0001A3720",
                  "value": 543576.4375
                },
                {
                  "name": "IFF0001A4015",
                  "value": 8307.259765625
                },
                {
                  "name": "IFW0001A2726",
                  "value": 163.9499969482422
                },
                {
                  "name": "ZJC0007X1522",
                  "value": 127146.5234375
                },
                {
                  "name": "IFW0001A2725",
                  "value": 148.38999938964845
                },
                {
                  "name": "ZJC0007X1520",
                  "value": 1429412.625
                },
                {
                  "name": "ZJC0007X1521",
                  "value": 1370061.28125
                },
                {
                  "name": "ZJC0007X0799",
                  "value": 25216.0
                },
                {
                  "name": "ZJC0007X1888",
                  "value": 397214.40625
                },
                {
                  "name": "IFF0001A3298",
                  "value": 547008.0
                },
                {
                  "name": "IFF0001A3297",
                  "value": 716.5599975585938
                },
                {
                  "name": "IFF0001A2085",
                  "value": 191020.796875
                },
                {
                  "name": "IFF0001A3613",
                  "value": 6960.0
                },
                {
                  "name": "ZJC0007X1732",
                  "value": 822252.0
                },
                {
                  "name": "ZJC0007X1058",
                  "value": 114508.40625
                },
                {
                  "name": "ZJC0007X2026",
                  "value": 403256.9375
                },
                {
                  "name": "ZJC0007X1971",
                  "value": 347321.0
                },
                {
                  "name": "ZJC0007X1972",
                  "value": 2319241.75
                },
                {
                  "name": "ZJC0007X1978",
                  "value": 188659.203125
                },
                {
                  "name": "ZJC0007X1733",
                  "value": 583860.0
                },
                {
                  "name": "ZJC0007X1184",
                  "value": 201600.0
                },
                {
                  "name": "ZJC0007X2394",
                  "value": 70853.796875
                },
                {
                  "name": "ZJC0007X1185",
                  "value": 17000.0
                },
                {
                  "name": "ZJC0007X2395",
                  "value": 418624.0
                },
                {
                  "name": "ZJC0007X2393",
                  "value": 188455.796875
                },
                {
                  "name": "ZJC0007X2396",
                  "value": 6576.0
                },
                {
                  "name": "ZJC0007X2034",
                  "value": 355357.59375
                },
                {
                  "name": "IFF0001A3701",
                  "value": 119692.1796875
                },
                {
                  "name": "IFF0001A3700",
                  "value": 231427.546875
                },
                {
                  "name": "ZJC0007X1864",
                  "value": 1606173.5625
                },
                {
                  "name": "ZJC0007X1741",
                  "value": 363082.625
                },
                {
                  "name": "ZJC0001S1606",
                  "value": 66567.6875
                },
                {
                  "name": "ZJC0007X1989",
                  "value": 132748.953125
                },
                {
                  "name": "ZJC0007X1865",
                  "value": 861812.8125
                },
                {
                  "name": "ZJC0007X1986",
                  "value": 4333984.0
                },
                {
                  "name": "ZJC0007X1866",
                  "value": 534737.625
                },
                {
                  "name": "ZJC0007X1195",
                  "value": 81222.3984375
                },
                {
                  "name": "IFF0001A3399",
                  "value": 232645.171875
                },
                {
                  "name": "ZJC0007X1196",
                  "value": 67798.5
                },
                {
                  "name": "IFF0001A3397",
                  "value": 606.6699829101563
                },
                {
                  "name": "ZJC0007X1870",
                  "value": 1142154.0
                },
                {
                  "name": "ZJC0007X1750",
                  "value": 202240.0
                },
                {
                  "name": "ZJC0007X1990",
                  "value": 18110.94921875
                },
                {
                  "name": "IFF0001A4121",
                  "value": 142764.484375
                },
                {
                  "name": "IFF0001A4122",
                  "value": 26609.80078125
                },
                {
                  "name": "ZJC0007X1192",
                  "value": 60797.62109375
                },
                {
                  "name": "ZJC0007X1716",
                  "value": 1238799.375
                },
                {
                  "name": "ZJC0007X1951",
                  "value": 66456.0
                },
                {
                  "name": "ZJC0007X2006",
                  "value": 94500.0
                },
                {
                  "name": "ZJC0007X1039",
                  "value": 542807.625
                },
                {
                  "name": "ZJC0007X1950",
                  "value": 56378.80078125
                },
                {
                  "name": "ZJC0007X1832",
                  "value": 191332.796875
                },
                {
                  "name": "ZJC0007X0865",
                  "value": 126597.6015625
                },
                {
                  "name": "IFF0001A3487",
                  "value": 1123215.25
                },
                {
                  "name": "IFF0001A3486",
                  "value": 184987.203125
                },
                {
                  "name": "IFF0001A3242",
                  "value": 146901.3125
                },
                {
                  "name": "ZJC0007X1040",
                  "value": 69598.3125
                },
                {
                  "name": "IFF0001A3241",
                  "value": 379010.40625
                },
                {
                  "name": "ZJC0007X1287",
                  "value": 26633.349609375
                },
                {
                  "name": "ZJC0007X0197",
                  "value": 150456.21875
                },
                {
                  "name": "ZJC0007X1288",
                  "value": 57945.75
                },
                {
                  "name": "IFF0001A3240",
                  "value": 1580454.0
                },
                {
                  "name": "ZJC0007X0199",
                  "value": 182960.3125
                },
                {
                  "name": "ZJC0007X1164",
                  "value": 377825.625
                },
                {
                  "name": "ZJC0007X1286",
                  "value": 76032.203125
                },
                {
                  "name": "IFF0001A3126",
                  "value": 1159698.0
                },
                {
                  "name": "ZJC0007X1969",
                  "value": 1937.8399658203126
                },
                {
                  "name": "ZJC0007X1168",
                  "value": 124848.0
                },
                {
                  "name": "ZJC0007X1169",
                  "value": 1257984.0
                },
                {
                  "name": "ZJC0007X1724",
                  "value": 99528.0
                },
                {
                  "name": "ZJC0007X1843",
                  "value": 1100089.0
                },
                {
                  "name": "ZJC0007X1723",
                  "value": 310752.0
                },
                {
                  "name": "ZJC0007X2383",
                  "value": 344064.0
                },
                {
                  "name": "ZJC0007X2384",
                  "value": 303552.0
                },
                {
                  "name": "IFF0001A3254",
                  "value": 162227.796875
                },
                {
                  "name": "IFF0001A3133",
                  "value": 200185.203125
                },
                {
                  "name": "IFF0001A3252",
                  "value": 2614165.0
                },
                {
                  "name": "IFF0001A3010",
                  "value": 62720.0
                },
                {
                  "name": "ZJC0007X2387",
                  "value": 192432.0
                },
                {
                  "name": "ZJC0007X2025",
                  "value": 351317.375
                },
                {
                  "name": "ZJC0007X1970",
                  "value": 501627.9375
                },
                {
                  "name": "IFF0001A3251",
                  "value": 185931.203125
                },
                {
                  "name": "ZJC0007X2143",
                  "value": 2646989.625
                },
                {
                  "name": "ZJC0007X2386",
                  "value": 245088.0
                },
                {
                  "name": "IFF0001A1877",
                  "value": 6830.830078125
                },
                {
                  "name": "ZJC0001S1551",
                  "value": 154.52000427246095
                },
                {
                  "name": "ZJC0007X1381",
                  "value": 219579.359375
                },
                {
                  "name": "ZJC0007X1386",
                  "value": 9771.2001953125
                },
                {
                  "name": "ZJC0007X2110",
                  "value": 62320.0
                },
                {
                  "name": "ZJC0007X1022",
                  "value": 68020.0
                },
                {
                  "name": "ZJC0007X2111",
                  "value": 117480.0
                },
                {
                  "name": "ZJC0003A0910",
                  "value": 81.83999633789063
                },
                {
                  "name": "IFF0001A2816",
                  "value": 59634.55078125
                },
                {
                  "name": "ZJC0007X1269",
                  "value": 5076648.75
                },
                {
                  "name": "ZJC0007X1388",
                  "value": 1150563.875
                },
                {
                  "name": "ZJC0007X1026",
                  "value": 482788.375
                },
                {
                  "name": "ZJC0007X1702",
                  "value": 63632.0
                },
                {
                  "name": "ZJC0007X1703",
                  "value": 55040.0
                },
                {
                  "name": "ZJC0007X1701",
                  "value": 373300.0
                },
                {
                  "name": "IFF0001A3354",
                  "value": 12162.6103515625
                },
                {
                  "name": "ZJC0007X1270",
                  "value": 3132825.5625
                },
                {
                  "name": "ZJC0007X2123",
                  "value": 813866.5625
                },
                {
                  "name": "ZJC0007X1274",
                  "value": 6091770.75
                },
                {
                  "name": "ZJC0007X2122",
                  "value": 571230.125
                },
                {
                  "name": "IFF0001A3357",
                  "value": 2235816.0
                },
                {
                  "name": "ZJC0007X1236",
                  "value": 1097285.875
                },
                {
                  "name": "ZJC0007X1235",
                  "value": 3002755.3125
                },
                {
                  "name": "ZJC0007X1805",
                  "value": 769254.0
                },
                {
                  "name": "ZJC0007X1806",
                  "value": 75750.0
                },
                {
                  "name": "ZJC0007X1925",
                  "value": 442565.21875
                },
                {
                  "name": "ZJC0007X1807",
                  "value": 395410.40625
                },
                {
                  "name": "ZJC0007X1808",
                  "value": 249326.40625
                },
                {
                  "name": "ZJC0007X2216",
                  "value": 140389.203125
                },
                {
                  "name": "IFF0001A3333",
                  "value": 13863.9697265625
                },
                {
                  "name": "ZJC0007X1254",
                  "value": 1024405.625
                },
                {
                  "name": "ZJC0007X2220",
                  "value": 321796.8125
                },
                {
                  "name": "ZJC0007X1253",
                  "value": 419956.6875
                },
                {
                  "name": "ZJC0007X1374",
                  "value": 301039.1875
                },
                {
                  "name": "ZJC0007X2100",
                  "value": 225991.6875
                },
                {
                  "name": "ICP5603S0001",
                  "value": 24.75
                },
                {
                  "name": "ZJC0007X0802",
                  "value": 369740.0
                },
                {
                  "name": "ZJC0007X0923",
                  "value": 128744.0
                },
                {
                  "name": "ZJC0007X1333",
                  "value": 146000.0
                },
                {
                  "name": "ZJC0007X0800",
                  "value": 466714.8125
                },
                {
                  "name": "ZJC0007X0801",
                  "value": 7680.39990234375
                },
                {
                  "name": "IFF0001A3300",
                  "value": 1280084.875
                },
                {
                  "name": "ZJC0004C0225",
                  "value": 11718.33984375
                },
                {
                  "name": "ZJC0007X1221",
                  "value": 646484.875
                },
                {
                  "name": "ZJC0007X1222",
                  "value": 786825.5625
                },
                {
                  "name": "ZJC0007X0374",
                  "value": 256640.0
                },
                {
                  "name": "ZJC0008C0049",
                  "value": 3396.340087890625
                },
                {
                  "name": "IFF0001A3545",
                  "value": 132551.78125
                },
                {
                  "name": "IFF0001A3302",
                  "value": 1117840.25
                },
                {
                  "name": "IFF0001A3544",
                  "value": 253170.0
                },
                {
                  "name": "IFF0001A3543",
                  "value": 191905.203125
                },
                {
                  "name": "ZJC0007X1347",
                  "value": 191456.0
                },
                {
                  "name": "ZJC0007X1108",
                  "value": 224808.0
                },
                {
                  "name": "ZJC0007X1229",
                  "value": 700560.0
                },
                {
                  "name": "ZJC0007X2318",
                  "value": 1065859.25
                },
                {
                  "name": "ZJC0007X2319",
                  "value": 1886337.625
                },
                {
                  "name": "ZJC0007X1227",
                  "value": 220970.0
                },
                {
                  "name": "ZJC0007X1107",
                  "value": 11136.0
                },
                {
                  "name": "ZJC0007X1228",
                  "value": 370662.0
                },
                {
                  "name": "ZJC0007X1349",
                  "value": 849408.0
                },
                {
                  "name": "IFF0001A3432",
                  "value": 90679.8984375
                },
                {
                  "name": "IFF0001A3431",
                  "value": 3236282.25
                },
                {
                  "name": "ZJC0008C0051",
                  "value": 6517.009765625
                },
                {
                  "name": "ZJC0008C0052",
                  "value": 9440.3896484375
                },
                {
                  "name": "ZJC0007X1111",
                  "value": 439472.53125
                },
                {
                  "name": "ZJC0008C0050",
                  "value": 5718.47998046875
                },
                {
                  "name": "ZJC0007X1230",
                  "value": 2317182.375
                },
                {
                  "name": "IFF0001A3312",
                  "value": 173288.234375
                }
              ],
              "name": "ST FLASH LINE",
              "value": 157971896.55148006
            },
            {
              "children": [
                {
                  "name": "IDF0001A0322",
                  "value": 59.36000061035156
                }
              ],
              "name": "ST DRAM LINE",
              "value": 59.36000061035156
            },
            {
              "children": [
                {
                  "name": "ZJC0007X1706",
                  "value": 1506900.0
                },
                {
                  "name": "ZJC0007X1715",
                  "value": 890615.0
                },
                {
                  "name": "ZJC0007X1705",
                  "value": 447000.0
                },
                {
                  "name": "ZJC0007X1809",
                  "value": 24113.359375
                },
                {
                  "name": "ZJC0007X2006",
                  "value": 78000.0
                },
                {
                  "name": "ZJC0007X1886",
                  "value": 36897.8984375
                },
                {
                  "name": "ZJC0007X1245",
                  "value": 65296.33984375
                },
                {
                  "name": "ZJC0007X1795",
                  "value": 171080.0
                },
                {
                  "name": "ZJC0007X1796",
                  "value": 389300.0
                },
                {
                  "name": "ZJC0007X1675",
                  "value": 146754.671875
                },
                {
                  "name": "ZJC0007X1714",
                  "value": 1743802.625
                },
                {
                  "name": "ZJC0007X1701",
                  "value": 291000.0
                },
                {
                  "name": "ZJC0007X2240",
                  "value": 27600.0
                },
                {
                  "name": "ZJC0007X1460",
                  "value": 360955.71875
                },
                {
                  "name": "ZJC0007X2263",
                  "value": 537090.25
                },
                {
                  "name": "ZJC0007X1793",
                  "value": 526944.0
                },
                {
                  "name": "ZJC0007X1244",
                  "value": 38876.23046875
                },
                {
                  "name": "ZJC0007X1794",
                  "value": 96140.0
                },
                {
                  "name": "ZJC0007X1693",
                  "value": 18848.060546875
                },
                {
                  "name": "ZJC0007S1497",
                  "value": 1501.219970703125
                }
              ],
              "name": "ST SSD LINE",
              "value": 7398715.374267578
            }
          ],
          "name": "DMS",
          "value": 167181763.56336428
        },
        {
          "children": [
            {
              "children": [
                {
                  "name": "ZJC0022S0314",
                  "value": 54251.3984375
                },
                {
                  "name": "ZJC0022S0633",
                  "value": 1465383.84375
                },
                {
                  "name": "ZJC0022S0212",
                  "value": 826.010009765625
                },
                {
                  "name": "ZJC0022A0220",
                  "value": 285718.25
                },
                {
                  "name": "ZJC0022S0674",
                  "value": 493300.21875
                },
                {
                  "name": "ZJC0022S0376",
                  "value": 105775.4921875
                },
                {
                  "name": "ZJC0022S0275",
                  "value": 1661.110046386719
                },
                {
                  "name": "ZJC0022S0374",
                  "value": 131085.03125
                },
                {
                  "name": "ZJC0022S0318",
                  "value": 89730.546875
                },
                {
                  "name": "ZJC0022S0461",
                  "value": 5303.22021484375
                },
                {
                  "name": "ZJC0020S0038",
                  "value": 141.05999755859376
                },
                {
                  "name": "ZJC0022S0282",
                  "value": 505.0799865722656
                },
                {
                  "name": "ZJC0020S0298",
                  "value": 5787.72998046875
                },
                {
                  "name": "ZJC0022S0601",
                  "value": 170110.3671875
                },
                {
                  "name": "ZJC0020S0271",
                  "value": 9254.7998046875
                },
                {
                  "name": "ZJC0020S0293",
                  "value": 2576.0400390625
                },
                {
                  "name": "ZJC0022S0026",
                  "value": 7540.75
                },
                {
                  "name": "ZJC0022S0245",
                  "value": 5921279.0
                },
                {
                  "name": "ZJC0022S0300",
                  "value": 332787.375
                },
                {
                  "name": "ZJC0022S0047",
                  "value": 2184521.75
                },
                {
                  "name": "ZJC0022S0067",
                  "value": 5051249.25
                },
                {
                  "name": "ZJC0022S0286",
                  "value": 2642.780029296875
                },
                {
                  "name": "ZJC0022S0606",
                  "value": 3120.39990234375
                },
                {
                  "name": "ZJC0022S0427",
                  "value": 5103785.5
                },
                {
                  "name": "ZJC0022S0625",
                  "value": 43320.0
                },
                {
                  "name": "ZJC0012A0622",
                  "value": 781805.875
                },
                {
                  "name": "ZJC0022S0350",
                  "value": 4539742.0
                },
                {
                  "name": "ZJC0020S0269",
                  "value": 2336.8701171875
                },
                {
                  "name": "ZJC0020A0208",
                  "value": 426.6099853515625
                },
                {
                  "name": "ZJC0020S0265",
                  "value": 28234.119140625
                },
                {
                  "name": "ZJC0022A0237",
                  "value": 207723.21875
                }
              ],
              "name": "INDUSTRIAL LINE",
              "value": 27031925.69644165
            }
          ],
          "name": "ISG",
          "value": 27031925.69644165
        },
        {
          "children": [
            {
              "children": [
                {
                  "name": "ZJC0001S1932",
                  "value": 240000.0
                },
                {
                  "name": "ZJC0001S0843",
                  "value": 577500.0
                },
                {
                  "name": "ZJC0001S0601",
                  "value": 163193.46875
                },
                {
                  "name": "ZJC0001S1933",
                  "value": 440000.0
                },
                {
                  "name": "ZJC0001S0841",
                  "value": 205.89999389648438
                },
                {
                  "name": "ZJC0001S0842",
                  "value": 81.4000015258789
                },
                {
                  "name": "ZJC0001S0600",
                  "value": 26538.83984375
                },
                {
                  "name": "ZJC0001S0609",
                  "value": 1106.780029296875
                },
                {
                  "name": "ZJC0001S1938",
                  "value": 25421.189453125
                },
                {
                  "name": "ZJC0001S0845",
                  "value": 54408.859375
                },
                {
                  "name": "ZJP0001S0461",
                  "value": 88805.890625
                },
                {
                  "name": "ZJP0001S0460",
                  "value": 28291.16015625
                },
                {
                  "name": "ZJP0001S0463",
                  "value": 48448.55859375
                },
                {
                  "name": "ZJP0001S0462",
                  "value": 104088.8515625
                },
                {
                  "name": "ZJP0001S0465",
                  "value": 33368.0
                },
                {
                  "name": "ZJP0001S0464",
                  "value": 26936.0
                },
                {
                  "name": "ZJP0001S0467",
                  "value": 18524.970703125
                },
                {
                  "name": "ZJP0001S0225",
                  "value": 513720.0
                },
                {
                  "name": "ZJP0001S0466",
                  "value": 4544.0
                },
                {
                  "name": "ZJP0001S0227",
                  "value": 36348.0
                },
                {
                  "name": "ZJP0001S0469",
                  "value": 22805.279296875
                },
                {
                  "name": "ZJP0001S0468",
                  "value": 8220.26953125
                },
                {
                  "name": "ZJC0001S1943",
                  "value": 3444429.25
                },
                {
                  "name": "ZJC0001S1701",
                  "value": 16400.0
                },
                {
                  "name": "ZJC0001A0183",
                  "value": 70069.8828125
                },
                {
                  "name": "ZJC0001S0855",
                  "value": 52.209999084472659
                },
                {
                  "name": "ZJC0001S1707",
                  "value": 13200.0
                },
                {
                  "name": "ZJC0001S1948",
                  "value": 37918.87890625
                },
                {
                  "name": "ZJC0001S0614",
                  "value": 7628.43017578125
                },
                {
                  "name": "ZJP0001S0470",
                  "value": 36528.5703125
                },
                {
                  "name": "ZJC0001S0615",
                  "value": 79041.59375
                },
                {
                  "name": "ZJP0001S0230",
                  "value": 2055489.625
                },
                {
                  "name": "ZJP0001S0232",
                  "value": 49018.55859375
                },
                {
                  "name": "ZJP0001S0234",
                  "value": 3805.830078125
                },
                {
                  "name": "ZJP0001S0476",
                  "value": 96451.34375
                },
                {
                  "name": "ZJP0001S0475",
                  "value": 318672.1875
                },
                {
                  "name": "ZJP0001S0236",
                  "value": 64759.44140625
                },
                {
                  "name": "ZJP0001S0478",
                  "value": 42371.8203125
                },
                {
                  "name": "ZJP0001S0477",
                  "value": 175513.625
                },
                {
                  "name": "ZJP0001S0237",
                  "value": 110586.4453125
                },
                {
                  "name": "ZJP0001S0479",
                  "value": 112698.640625
                },
                {
                  "name": "ZJC0001S0821",
                  "value": 110545.8359375
                },
                {
                  "name": "ZJC0001A1480",
                  "value": 24.920000076293947
                },
                {
                  "name": "ZJC0001S0820",
                  "value": 30436.380859375
                },
                {
                  "name": "ZJC0001S0827",
                  "value": 51.79999923706055
                },
                {
                  "name": "ZJC0001S0828",
                  "value": 56.79999923706055
                },
                {
                  "name": "ZJC0001S1914",
                  "value": 596.6999816894531
                },
                {
                  "name": "ZJC0001S0826",
                  "value": 30.600000381469728
                },
                {
                  "name": "ZJC0001S0823",
                  "value": 222.0
                },
                {
                  "name": "ZJC0001S1913",
                  "value": 483.5999908447266
                },
                {
                  "name": "ZJP0001S0480",
                  "value": 116101.53125
                },
                {
                  "name": "ZJP0001S0482",
                  "value": 341470.5546875
                },
                {
                  "name": "ZJP0001S0484",
                  "value": 65406.73046875
                },
                {
                  "name": "ZJP0001S0245",
                  "value": 33933.23046875
                },
                {
                  "name": "ZJP0001S0489",
                  "value": 645169.375
                },
                {
                  "name": "ZJP0001S0488",
                  "value": 16217.1201171875
                },
                {
                  "name": "ZJP0001S0249",
                  "value": 180754.5625
                },
                {
                  "name": "ZJC0001S1922",
                  "value": 146838.40625
                },
                {
                  "name": "ZJC0001A2582",
                  "value": 15397.19970703125
                },
                {
                  "name": "ZJC0001A2587",
                  "value": 725906.875
                },
                {
                  "name": "ZJC0001A2103",
                  "value": 76454.0703125
                },
                {
                  "name": "ZJC0001A2586",
                  "value": 20379.7109375
                },
                {
                  "name": "ZJC0001S0839",
                  "value": 411.3999938964844
                },
                {
                  "name": "ZJC0001S1928",
                  "value": 37402.921875
                },
                {
                  "name": "ZJC0001S1925",
                  "value": 18045.0
                },
                {
                  "name": "ZJC0001S1923",
                  "value": 16932.5390625
                },
                {
                  "name": "ZJP0001S0492",
                  "value": 14400.0
                },
                {
                  "name": "ZJC0001S1924",
                  "value": 145290.6875
                },
                {
                  "name": "ZJP0001S0491",
                  "value": 9600.0
                },
                {
                  "name": "ZJP0001S0494",
                  "value": 74556.8125
                },
                {
                  "name": "ZJP0001S0493",
                  "value": 47746.51953125
                },
                {
                  "name": "ZJP0001S0496",
                  "value": 6307.3701171875
                },
                {
                  "name": "ZJP0001S0495",
                  "value": 15745.009765625
                },
                {
                  "name": "ZJP0001S0498",
                  "value": 46709.08984375
                },
                {
                  "name": "ZJP0001S0497",
                  "value": 99258.546875
                },
                {
                  "name": "ZJP0001S0258",
                  "value": 639671.125
                },
                {
                  "name": "ZJP0001S0499",
                  "value": 85000.0
                },
                {
                  "name": "ZJC0001A2588",
                  "value": 281420.0625
                },
                {
                  "name": "ZJC0001A2107",
                  "value": 5709.259765625
                },
                {
                  "name": "ZJC0001A2109",
                  "value": 23842.5
                },
                {
                  "name": "ZJC0001S1976",
                  "value": 44226.421875
                },
                {
                  "name": "ZJC0001S0888",
                  "value": 10011.919921875
                },
                {
                  "name": "ZJC0001S1977",
                  "value": 47786.69140625
                },
                {
                  "name": "ZJC0001S0644",
                  "value": 6111.89990234375
                },
                {
                  "name": "ZJC0001S0641",
                  "value": 46600.0
                },
                {
                  "name": "ZJC0001S0884",
                  "value": 59972.140625
                },
                {
                  "name": "ZJC0001S1970",
                  "value": 142781.953125
                },
                {
                  "name": "ZJC0001S0882",
                  "value": 172699.125
                },
                {
                  "name": "ZJC0001S0640",
                  "value": 25920.0
                },
                {
                  "name": "ZJC0001X1158",
                  "value": 51250.0
                },
                {
                  "name": "ZJC0001S0407",
                  "value": 98.0
                },
                {
                  "name": "ZJC0001S1739",
                  "value": 95848.796875
                },
                {
                  "name": "ZJC0001S0889",
                  "value": 260.2200012207031
                },
                {
                  "name": "ZJC0001S0405",
                  "value": 6.800000190734863
                },
                {
                  "name": "ZJC0001S1736",
                  "value": 2674.050048828125
                },
                {
                  "name": "ZJC0001S1978",
                  "value": 122234.7734375
                },
                {
                  "name": "ZJC0001S0648",
                  "value": 98723.078125
                },
                {
                  "name": "ZJP0001S0266",
                  "value": 2671215.375
                },
                {
                  "name": "ZJP0001S0269",
                  "value": 133843.875
                },
                {
                  "name": "ZJC0001S0890",
                  "value": 154713.203125
                },
                {
                  "name": "ZJC0001S1503",
                  "value": 23957.970703125
                },
                {
                  "name": "ZJC0001S0899",
                  "value": 393365.09375
                },
                {
                  "name": "ZJC0001S1504",
                  "value": 8152.4599609375
                },
                {
                  "name": "ZJC0001S1746",
                  "value": 201930.125
                },
                {
                  "name": "ZJC0001S1985",
                  "value": 860009.8125
                },
                {
                  "name": "ZJC0001S0655",
                  "value": 200.55999755859376
                },
                {
                  "name": "ZJC0001S1502",
                  "value": 1326884.0
                },
                {
                  "name": "ZJC0001S1744",
                  "value": 376480.8125
                },
                {
                  "name": "ZJC0001S0653",
                  "value": 18.5
                },
                {
                  "name": "ZJC0001S1500",
                  "value": 446457.53125
                },
                {
                  "name": "ZJC0001S1984",
                  "value": 645279.5
                },
                {
                  "name": "ZJC0001S1740",
                  "value": 152059.1875
                },
                {
                  "name": "ZJC0001S1509",
                  "value": 1680.0
                },
                {
                  "name": "ZJP0001S0270",
                  "value": 1308496.625
                },
                {
                  "name": "ZJC0001S0418",
                  "value": 3.4000000953674318
                },
                {
                  "name": "ZJC0001S1508",
                  "value": 38669.5
                },
                {
                  "name": "ZJP0001S0272",
                  "value": 39623.48828125
                },
                {
                  "name": "ZJC0001S1505",
                  "value": 4364.75
                },
                {
                  "name": "ZJC0001S1747",
                  "value": 85674.8984375
                },
                {
                  "name": "ZJC0001S1506",
                  "value": 7363.47998046875
                },
                {
                  "name": "ZJP0001S0275",
                  "value": 17549.619140625
                },
                {
                  "name": "ZJP0001S0279",
                  "value": 355534.6875
                },
                {
                  "name": "ZJP0001C0675",
                  "value": 60386.921875
                },
                {
                  "name": "ZJC0001S0660",
                  "value": 4.5
                },
                {
                  "name": "ZJC0001S1991",
                  "value": 52400.0
                },
                {
                  "name": "ZJC0001S0623",
                  "value": 17056.58984375
                },
                {
                  "name": "ZJC0001S1712",
                  "value": 1096758.0
                },
                {
                  "name": "ZJC0001S1954",
                  "value": 54161.828125
                },
                {
                  "name": "ZJC0001S1713",
                  "value": 140400.0
                },
                {
                  "name": "ZJC0001S1955",
                  "value": 12076.3203125
                },
                {
                  "name": "ZJC0001S0863",
                  "value": 6259.0
                },
                {
                  "name": "ZJC0001S0621",
                  "value": 4012.080078125
                },
                {
                  "name": "ZJC0001S1952",
                  "value": 404942.90625
                },
                {
                  "name": "ZJC0001S0622",
                  "value": 377886.8125
                },
                {
                  "name": "ZJC0001S1718",
                  "value": 111378.3671875
                },
                {
                  "name": "ZJC0001S1719",
                  "value": 129.0
                },
                {
                  "name": "ZJP0001S0281",
                  "value": 30077.720703125
                },
                {
                  "name": "ZJC0001S1716",
                  "value": 277168.25
                },
                {
                  "name": "ZJC0001S1958",
                  "value": 88434.421875
                },
                {
                  "name": "ZJP0001S0280",
                  "value": 607441.0625
                },
                {
                  "name": "ZJC0001S1959",
                  "value": 6137.43017578125
                },
                {
                  "name": "ZJC0001S1717",
                  "value": 56882.0703125
                },
                {
                  "name": "ZJC0001S0867",
                  "value": 1880.0
                },
                {
                  "name": "ZJC0001S0625",
                  "value": 113148.1484375
                },
                {
                  "name": "ZJC0001S1714",
                  "value": 239947.0
                },
                {
                  "name": "ZJC0001S1956",
                  "value": 1236.1700439453126
                },
                {
                  "name": "ZJP0001S0285",
                  "value": 121465.921875
                },
                {
                  "name": "ZJP0001S0287",
                  "value": 1571898.75
                },
                {
                  "name": "ZJP0001S0286",
                  "value": 239398.5
                },
                {
                  "name": "ZJP0001S0289",
                  "value": 306240.0
                },
                {
                  "name": "ZJP0001S0288",
                  "value": 2074527.1875
                },
                {
                  "name": "ZJP0001C0685",
                  "value": 2365.0
                },
                {
                  "name": "WHP0015X0802",
                  "value": 31.0
                },
                {
                  "name": "ZJC0001S0876",
                  "value": 14.399999618530274
                },
                {
                  "name": "ZJC0001S0877",
                  "value": 28.399999618530275
                },
                {
                  "name": "ZJC0001S0635",
                  "value": 13610.4599609375
                },
                {
                  "name": "ZJC0001S1724",
                  "value": 26771.19921875
                },
                {
                  "name": "ZJC0001S0874",
                  "value": 9.300000190734864
                },
                {
                  "name": "ZJC0001S1721",
                  "value": 492692.375
                },
                {
                  "name": "ZJC0001S0875",
                  "value": 6.800000190734863
                },
                {
                  "name": "ZJC0001S1964",
                  "value": 56172.0
                },
                {
                  "name": "ZJC0001S0872",
                  "value": 717633.25
                },
                {
                  "name": "ZJC0001S1961",
                  "value": 124222.25
                },
                {
                  "name": "ZJC0001S1962",
                  "value": 2662.080078125
                },
                {
                  "name": "ZJC0001A3234",
                  "value": 6622.77978515625
                },
                {
                  "name": "ZJC0001S1960",
                  "value": 88434.421875
                },
                {
                  "name": "ZJC0001S1969",
                  "value": 8370.0
                },
                {
                  "name": "ZJP0001S0291",
                  "value": 184660.0
                },
                {
                  "name": "ZJP0001S0294",
                  "value": 251656.0
                },
                {
                  "name": "ZJC0001S0636",
                  "value": 137843.046875
                },
                {
                  "name": "ZJC0001S0878",
                  "value": 6.359999656677246
                },
                {
                  "name": "ZJC0001S1725",
                  "value": 33099.0
                },
                {
                  "name": "ZJP0001S0293",
                  "value": 838800.0
                },
                {
                  "name": "ZJC0001S1726",
                  "value": 177600.0
                },
                {
                  "name": "ZJP0001S0295",
                  "value": 1727841.0
                },
                {
                  "name": "ZJP0001S0298",
                  "value": 52800.0
                },
                {
                  "name": "ZJP0001S0297",
                  "value": 110434.2890625
                },
                {
                  "name": "ZJP0001S0058",
                  "value": 8147.509765625
                },
                {
                  "name": "ZJC0001A3237",
                  "value": 3616.1298828125
                },
                {
                  "name": "ZJC0001S1776",
                  "value": 27266.939453125
                },
                {
                  "name": "ZJC0001S1774",
                  "value": 15036.6201171875
                },
                {
                  "name": "ZJC0001A2750",
                  "value": 275.0
                },
                {
                  "name": "ZJC0001S0686",
                  "value": 840.3400268554688
                },
                {
                  "name": "ZJC0001A2994",
                  "value": 78000.0
                },
                {
                  "name": "ZJC0001S0441",
                  "value": 7488.89990234375
                },
                {
                  "name": "ZJC0001S1772",
                  "value": 45384.30078125
                },
                {
                  "name": "ZJC0001S0207",
                  "value": 180.0
                },
                {
                  "name": "ZJC0001S0449",
                  "value": 39981.3984375
                },
                {
                  "name": "ZJC0001A2754",
                  "value": 1361.699951171875
                },
                {
                  "name": "ZJC0001S1782",
                  "value": 1160408.4375
                },
                {
                  "name": "ZJC0001S0691",
                  "value": 4358.72021484375
                },
                {
                  "name": "ZJC0001A1669",
                  "value": 38.75
                },
                {
                  "name": "ZJC0001S1789",
                  "value": 124507.23828125
                },
                {
                  "name": "ZJC0001S1548",
                  "value": 10665.599609375
                },
                {
                  "name": "ZJC0001S1303",
                  "value": 120600.0
                },
                {
                  "name": "ZJC0001S0698",
                  "value": 303.2799987792969
                },
                {
                  "name": "ZJC0001S1787",
                  "value": 86265.1171875
                },
                {
                  "name": "ZJC0001S1304",
                  "value": 554727.875
                },
                {
                  "name": "ZJC0001S0699",
                  "value": 120000.0
                },
                {
                  "name": "ZJC0001S1788",
                  "value": 142170.16796875
                },
                {
                  "name": "ZJC0001S1301",
                  "value": 43288.80078125
                },
                {
                  "name": "ZJC0001S1785",
                  "value": 82895.6875
                },
                {
                  "name": "ZJC0001S1302",
                  "value": 117260.0
                },
                {
                  "name": "ZJC0001S0455",
                  "value": 39.380001068115237
                },
                {
                  "name": "ZJC0001S1786",
                  "value": 18791.2890625
                },
                {
                  "name": "ZJC0001A0584",
                  "value": 46.5
                },
                {
                  "name": "ZJC0001S1783",
                  "value": 13950.0
                },
                {
                  "name": "ZJC0001S1300",
                  "value": 6450.0
                },
                {
                  "name": "ZJC0001S0695",
                  "value": 170.97000122070313
                },
                {
                  "name": "ZJC0001S1784",
                  "value": 4301.14990234375
                },
                {
                  "name": "ZJC0001S1549",
                  "value": 181649.4375
                },
                {
                  "name": "ZJC0001S1550",
                  "value": 108521.96875
                },
                {
                  "name": "ZJC0001S1793",
                  "value": 79411.1328125
                },
                {
                  "name": "ZJC0001S1790",
                  "value": 58850.0
                },
                {
                  "name": "ZJC0001A2526",
                  "value": 6133.169921875
                },
                {
                  "name": "ZJC0001S0425",
                  "value": 3.4000000953674318
                },
                {
                  "name": "ZJC0001S1756",
                  "value": 11430.0
                },
                {
                  "name": "ZJC0001S1757",
                  "value": 4400.0
                },
                {
                  "name": "ZJC0001S0423",
                  "value": 24208.19921875
                },
                {
                  "name": "ZJC0001S1755",
                  "value": 14354.2099609375
                },
                {
                  "name": "ZJC0001S1510",
                  "value": 19539.05078125
                },
                {
                  "name": "ZJC0001S1511",
                  "value": 271802.3125
                },
                {
                  "name": "ZJC0001S1516",
                  "value": 105357.15625
                },
                {
                  "name": "ZJC0001S1759",
                  "value": 145523.3125
                },
                {
                  "name": "ZJC0001S0678",
                  "value": 12.399999618530274
                },
                {
                  "name": "ZJC0001S1767",
                  "value": 29426.830078125
                },
                {
                  "name": "ZJC0001S1526",
                  "value": 15068.0
                },
                {
                  "name": "ZJC0001S1768",
                  "value": 85893.169921875
                },
                {
                  "name": "ZJC0001S0679",
                  "value": 108.80000305175781
                },
                {
                  "name": "ZJC0001S1766",
                  "value": 389.510009765625
                },
                {
                  "name": "ZJC0001S1521",
                  "value": 819447.375
                },
                {
                  "name": "ZJC0001S1763",
                  "value": 281895.6875
                },
                {
                  "name": "ZJC0001S1764",
                  "value": 15120.0
                },
                {
                  "name": "ZJC0001A2740",
                  "value": 1640.0
                },
                {
                  "name": "ZJC0001S1520",
                  "value": 327407.6875
                },
                {
                  "name": "ZJP0001S0090",
                  "value": 24898.0
                },
                {
                  "name": "ZJP0001C0818",
                  "value": 120060.0
                },
                {
                  "name": "ZJC0001S1528",
                  "value": 184573.5
                },
                {
                  "name": "ZJP0001C0813",
                  "value": 27324.0
                },
                {
                  "name": "ZJC0001A2743",
                  "value": 7.099999904632568
                },
                {
                  "name": "ZJC0001S0005",
                  "value": 92.44000244140625
                },
                {
                  "name": "ZJC0001A2794",
                  "value": 769272.0
                },
                {
                  "name": "ZJC0001S0487",
                  "value": 4603.0400390625
                },
                {
                  "name": "ZJC0001S1335",
                  "value": 155520.0
                },
                {
                  "name": "ZJC0001S0488",
                  "value": 66917.2890625
                },
                {
                  "name": "ZJC0001S1332",
                  "value": 18000.0
                },
                {
                  "name": "ZJC0001S0486",
                  "value": 769.1699829101563
                },
                {
                  "name": "ZJC0001A2798",
                  "value": 99600.0
                },
                {
                  "name": "ZJC0001S1100",
                  "value": 59819.37109375
                },
                {
                  "name": "ZJC0001A2797",
                  "value": 369702.0
                },
                {
                  "name": "ZJC0001A1227",
                  "value": 65.27999877929688
                },
                {
                  "name": "ZJC0001S1349",
                  "value": 141753.40625
                },
                {
                  "name": "ZJC0001S1108",
                  "value": 36613.69921875
                },
                {
                  "name": "ZJC0001A0384",
                  "value": 40.54999923706055
                },
                {
                  "name": "ZJC0001S1587",
                  "value": 92010.390625
                },
                {
                  "name": "ZJC0001S1588",
                  "value": 102442.859375
                },
                {
                  "name": "ZJC0001S1101",
                  "value": 2613.030029296875
                },
                {
                  "name": "ZJC0001S0012",
                  "value": 47.54999923706055
                },
                {
                  "name": "ZJC0001S1102",
                  "value": 112822.7734375
                },
                {
                  "name": "ZJC0001S1586",
                  "value": 9517.66015625
                },
                {
                  "name": "ZJP0001C0833",
                  "value": 22340.310546875
                },
                {
                  "name": "ZJP0001C0832",
                  "value": 7161288.0
                },
                {
                  "name": "ZJC0001S1110",
                  "value": 149.60000610351563
                },
                {
                  "name": "ZJC0001S1352",
                  "value": 13108.7900390625
                },
                {
                  "name": "ZJC0001S0263",
                  "value": 88.4000015258789
                },
                {
                  "name": "ZJC0001S1594",
                  "value": 80120.1328125
                },
                {
                  "name": "ZJC0001S0022",
                  "value": 79.19999694824219
                },
                {
                  "name": "ZJC0001S0264",
                  "value": 61.20000076293945
                },
                {
                  "name": "ZJC0001S1595",
                  "value": 245551.1875
                },
                {
                  "name": "ZJC0001S1353",
                  "value": 17095.310546875
                },
                {
                  "name": "ZJC0001S1317",
                  "value": 323940.3125
                },
                {
                  "name": "ZJC0001S1559",
                  "value": 68118.140625
                },
                {
                  "name": "ZJC0001X0923",
                  "value": 5.099999904632568
                },
                {
                  "name": "ZJC0001S1798",
                  "value": 75521.3828125
                },
                {
                  "name": "ZJC0001S1556",
                  "value": 62104.6015625
                },
                {
                  "name": "ZJC0001S0226",
                  "value": 56.099998474121097
                },
                {
                  "name": "ZJC0001S1557",
                  "value": 2862584.75
                },
                {
                  "name": "ZJC0001S1799",
                  "value": 187360.48046875
                },
                {
                  "name": "ZJC0001S1312",
                  "value": 69900.0
                },
                {
                  "name": "ZJC0001S1554",
                  "value": 143536.0
                },
                {
                  "name": "ZJC0001S1796",
                  "value": 72334.3125
                },
                {
                  "name": "ZJC0001S1555",
                  "value": 2803606.5
                },
                {
                  "name": "ZJC0001S1552",
                  "value": 166120.0
                },
                {
                  "name": "ZJC0001S1794",
                  "value": 67035.796875
                },
                {
                  "name": "ZJC0001S1553",
                  "value": 411407.09375
                },
                {
                  "name": "ZJC0001S1795",
                  "value": 10268.6796875
                },
                {
                  "name": "ZJC0001S1318",
                  "value": 168115.5
                },
                {
                  "name": "ZJC0001S1319",
                  "value": 38825.37890625
                },
                {
                  "name": "ZJP0001C0842",
                  "value": 131360.0
                },
                {
                  "name": "ZJP0001C0840",
                  "value": 10450.0
                },
                {
                  "name": "ZJC0001A2778",
                  "value": 4000.0
                },
                {
                  "name": "ZJC0001S1560",
                  "value": 28536.0
                },
                {
                  "name": "ZJC0001S1327",
                  "value": 320501.0
                },
                {
                  "name": "ZJC0001S1569",
                  "value": 79779.7578125
                },
                {
                  "name": "ZJC0001S1328",
                  "value": 229418.6171875
                },
                {
                  "name": "ZJC0001S0239",
                  "value": 1351.1700439453126
                },
                {
                  "name": "ZJC0001S1325",
                  "value": 296716.1875
                },
                {
                  "name": "ZJC0001S0478",
                  "value": 122793.296875
                },
                {
                  "name": "ZJC0001S1326",
                  "value": 370825.40625
                },
                {
                  "name": "ZJC0001S1323",
                  "value": 104.19999694824219
                },
                {
                  "name": "ZJC0001S0476",
                  "value": 149.57000732421876
                },
                {
                  "name": "ZJC0001S1324",
                  "value": 168.3000030517578
                },
                {
                  "name": "ZJC0001A2543",
                  "value": 4479.2900390625
                },
                {
                  "name": "ZJC0001S1563",
                  "value": 10820.3896484375
                },
                {
                  "name": "ZJC0001S1564",
                  "value": 338175.875
                },
                {
                  "name": "ZJC0001S1330",
                  "value": 3277.550048828125
                },
                {
                  "name": "ZJC0001S1570",
                  "value": 308463.125
                },
                {
                  "name": "ZJC0001S1376",
                  "value": 12000.0
                },
                {
                  "name": "ZJC0001S1377",
                  "value": 245778.625
                },
                {
                  "name": "ZJC0001S1144",
                  "value": 70088.7890625
                },
                {
                  "name": "ZJC0001S1382",
                  "value": 3340.0
                },
                {
                  "name": "ZJC0001S1140",
                  "value": 154510.015625
                },
                {
                  "name": "ZJC0001S1149",
                  "value": 24750.900390625
                },
                {
                  "name": "ZJC0001S1147",
                  "value": 74273.296875
                },
                {
                  "name": "ZJC0001S1148",
                  "value": 186321.59375
                },
                {
                  "name": "ZJC0001S1146",
                  "value": 200605.5
                },
                {
                  "name": "ZJC0001S1388",
                  "value": 11843.259765625
                },
                {
                  "name": "ZJC0001X0311",
                  "value": 42.5
                },
                {
                  "name": "ZJC0001S1154",
                  "value": 871.2000122070313
                },
                {
                  "name": "ZJC0001S1396",
                  "value": 2200.0
                },
                {
                  "name": "ZJC0001S1155",
                  "value": 11092.6201171875
                },
                {
                  "name": "ZJC0001S1152",
                  "value": 19446.779296875
                },
                {
                  "name": "ZJC0001S1394",
                  "value": 6819.5
                },
                {
                  "name": "ZJC0001S1392",
                  "value": 340066.0
                },
                {
                  "name": "ZJC0001S1391",
                  "value": 6095.64990234375
                },
                {
                  "name": "ZJC0001S1119",
                  "value": 99870.3984375
                },
                {
                  "name": "ZJP0001A0123",
                  "value": 29606.400390625
                },
                {
                  "name": "ZJC0001S1358",
                  "value": 48894.6015625
                },
                {
                  "name": "ZJC0001S1359",
                  "value": 29987.220703125
                },
                {
                  "name": "ZJC0001S1114",
                  "value": 40.0
                },
                {
                  "name": "ZJC0001S1356",
                  "value": 68954.2265625
                },
                {
                  "name": "ZJC0001S1598",
                  "value": 219938.859375
                },
                {
                  "name": "ZJC0001S1357",
                  "value": 75754.578125
                },
                {
                  "name": "ZJP0001A0127",
                  "value": 42540.0
                },
                {
                  "name": "ZJC0001S1599",
                  "value": 80695.201171875
                },
                {
                  "name": "ZJC0001S1115",
                  "value": 17699.599609375
                },
                {
                  "name": "ZJC0001S1354",
                  "value": 25660.099609375
                },
                {
                  "name": "ZJP0001A0126",
                  "value": 130400.0
                },
                {
                  "name": "ZJP0001A0125",
                  "value": 45704.0
                },
                {
                  "name": "ZJC0001S1113",
                  "value": 1159.0400390625
                },
                {
                  "name": "ZJP0001A0129",
                  "value": 144984.0
                },
                {
                  "name": "ZJC0001A1805",
                  "value": 37659.96875
                },
                {
                  "name": "ZJC0001A1807",
                  "value": 298075.90625
                },
                {
                  "name": "ZJC0001S1121",
                  "value": 4118943.375
                },
                {
                  "name": "ZJC0001S1363",
                  "value": 43010.78125
                },
                {
                  "name": "ZJC0001S0274",
                  "value": 14.800000190734864
                },
                {
                  "name": "ZJC0001S1364",
                  "value": 239110.34375
                },
                {
                  "name": "ZJC0001S1361",
                  "value": 294034.09375
                },
                {
                  "name": "ZJC0001S1120",
                  "value": 42817.73046875
                },
                {
                  "name": "ZJP0001A0131",
                  "value": 66000.0
                },
                {
                  "name": "ZJP0001A0130",
                  "value": 110240.0
                },
                {
                  "name": "ZJC0001S1360",
                  "value": 99475.3203125
                },
                {
                  "name": "ZJC0001S1129",
                  "value": 2000.0
                },
                {
                  "name": "ZJC0001S1365",
                  "value": 6648.009765625
                },
                {
                  "name": "ZJC0001S1124",
                  "value": 130320.2578125
                },
                {
                  "name": "ZJC0001S1366",
                  "value": 695.7999877929688
                },
                {
                  "name": "ZJC0001A2907",
                  "value": 897083.0
                },
                {
                  "name": "ZJC0001A2908",
                  "value": 9660.0
                },
                {
                  "name": "ZJC0001S1374",
                  "value": 297.54998779296877
                },
                {
                  "name": "ZJC0001S1371",
                  "value": 5656.22021484375
                },
                {
                  "name": "ZJC0001S1178",
                  "value": 26820.0
                },
                {
                  "name": "ZJC0001S2026",
                  "value": 55000.0
                },
                {
                  "name": "ZJC0001S1179",
                  "value": 110951.3984375
                },
                {
                  "name": "ZJC0001S1187",
                  "value": 8493.25
                },
                {
                  "name": "ZJC0001S2035",
                  "value": 507690.59375
                },
                {
                  "name": "ZJC0001S2034",
                  "value": 180711.640625
                },
                {
                  "name": "ZJC0001S1185",
                  "value": 483.0199890136719
                },
                {
                  "name": "ZJC0001S0096",
                  "value": 37.400001525878909
                },
                {
                  "name": "ZJC0001A2954",
                  "value": 113.4000015258789
                },
                {
                  "name": "ZJC0001A2711",
                  "value": 15646.1796875
                },
                {
                  "name": "ZJC0001S1186",
                  "value": 16048.3203125
                },
                {
                  "name": "ZJC0001A2955",
                  "value": 21.479999542236329
                },
                {
                  "name": "ZJC0001S0092",
                  "value": 86131.25
                },
                {
                  "name": "ZJC0001S1182",
                  "value": 104736.3984375
                },
                {
                  "name": "ZJP0001A0159",
                  "value": 62472.0
                },
                {
                  "name": "ZJC0001S2037",
                  "value": 25489.44921875
                },
                {
                  "name": "ZJP0001A0158",
                  "value": 7160.0
                },
                {
                  "name": "ZJC0001S2036",
                  "value": 974935.875
                },
                {
                  "name": "ZJC0001S1190",
                  "value": 695544.0
                },
                {
                  "name": "ZJC0001S1191",
                  "value": 33905.62109375
                },
                {
                  "name": "ZJP0001A0160",
                  "value": 13680.0
                },
                {
                  "name": "ZJC0001S1196",
                  "value": 167601.28125
                },
                {
                  "name": "ZJP0001A0164",
                  "value": 101500.0
                },
                {
                  "name": "ZJC0001S1195",
                  "value": 65646.828125
                },
                {
                  "name": "ZJC0001S1192",
                  "value": 29178.0
                },
                {
                  "name": "ZJC0001S1193",
                  "value": 555102.5625
                },
                {
                  "name": "ZJP0001A0161",
                  "value": 18000.0
                },
                {
                  "name": "ZJC0001A0549",
                  "value": 63.54999923706055
                },
                {
                  "name": "ZJC0001S2009",
                  "value": 114127.7421875
                },
                {
                  "name": "ZJP0001A0166",
                  "value": 51360.0
                },
                {
                  "name": "ZJP0001A0165",
                  "value": 90500.0
                },
                {
                  "name": "ZJC0001S2004",
                  "value": 330000.0
                },
                {
                  "name": "ZJC0001S1399",
                  "value": 47938.328125
                },
                {
                  "name": "ZJC0001X0760",
                  "value": 30.90999984741211
                },
                {
                  "name": "ZJC0001A1848",
                  "value": 17550.0
                },
                {
                  "name": "ZJC0001S0076",
                  "value": 77.0
                },
                {
                  "name": "ZJC0001S1166",
                  "value": 53030.96875
                },
                {
                  "name": "ZJC0001S1162",
                  "value": 103454.07421875
                },
                {
                  "name": "ZJC0001S2019",
                  "value": 56160.0
                },
                {
                  "name": "ZJC0001S2018",
                  "value": 2700.0
                },
                {
                  "name": "ZJC0001S2017",
                  "value": 192404.21484375
                },
                {
                  "name": "WHP0015S3977",
                  "value": 61.650001525878909
                },
                {
                  "name": "ZJC0001S1176",
                  "value": 427540.5625
                },
                {
                  "name": "ZJC0001S2024",
                  "value": 116000.0
                },
                {
                  "name": "ZJC0001S1177",
                  "value": 12466.9501953125
                },
                {
                  "name": "ZJC0001S2022",
                  "value": 26981.51953125
                },
                {
                  "name": "ZJC0001S2021",
                  "value": 498240.0
                },
                {
                  "name": "ZJC0001A2703",
                  "value": 880.6099853515625
                },
                {
                  "name": "ZJC0001S2020",
                  "value": 144000.0
                },
                {
                  "name": "ZJC0001C1208",
                  "value": 380210.0
                },
                {
                  "name": "ZJC0001S1173",
                  "value": 118.52999877929688
                },
                {
                  "name": "ZJC0001A2705",
                  "value": 139.25999450683595
                },
                {
                  "name": "ZJC0001S1170",
                  "value": 173851.296875
                },
                {
                  "name": "ZJC0001S1171",
                  "value": 734.760009765625
                },
                {
                  "name": "ZJC0001A2704",
                  "value": 780.47998046875
                },
                {
                  "name": "ZJC0001A3168",
                  "value": 59106.921875
                },
                {
                  "name": "ZJP0001A0504",
                  "value": 2708.39990234375
                },
                {
                  "name": "ZJC0001X1473",
                  "value": 1229.5400390625
                },
                {
                  "name": "ZJP0001S0500",
                  "value": 9855.330078125
                },
                {
                  "name": "ZJP0001S0502",
                  "value": 4863.68017578125
                },
                {
                  "name": "ZJP0001S0501",
                  "value": 107622.359375
                },
                {
                  "name": "ZJP0001S0506",
                  "value": 25794.9609375
                },
                {
                  "name": "ZJP0001S0508",
                  "value": 7228.22998046875
                },
                {
                  "name": "ZJP0001S0507",
                  "value": 23634.740234375
                },
                {
                  "name": "ZJC0001A3176",
                  "value": 40.34000015258789
                },
                {
                  "name": "ZJC0001A3179",
                  "value": 37.400001525878909
                },
                {
                  "name": "ZJP0001C0597",
                  "value": 93280.0
                },
                {
                  "name": "ZJP0001C0596",
                  "value": 28140.0
                },
                {
                  "name": "ZJP0001C0593",
                  "value": 93990.0
                },
                {
                  "name": "ZJC0001A2297",
                  "value": 12.399999618530274
                },
                {
                  "name": "ZJC0001S2049",
                  "value": 30150.0
                },
                {
                  "name": "ZJC0001S2048",
                  "value": 35470.80078125
                },
                {
                  "name": "ZJC0001S2047",
                  "value": 210532.0
                },
                {
                  "name": "ZJC0001X1494",
                  "value": 74.0
                },
                {
                  "name": "ZJC0001X1260",
                  "value": 37.0
                },
                {
                  "name": "ZJC0001S2051",
                  "value": 39628.5
                },
                {
                  "name": "ZJC0001S2059",
                  "value": 42000.0
                },
                {
                  "name": "ZJP0001A0539",
                  "value": 1134882.0
                },
                {
                  "name": "ZJC0001S2068",
                  "value": 18733.19921875
                },
                {
                  "name": "ZJC0001S2065",
                  "value": 13982.080078125
                },
                {
                  "name": "ZJC0001S2064",
                  "value": 3600.0
                },
                {
                  "name": "ZJP0001A0546",
                  "value": 68535.0
                },
                {
                  "name": "ZJC0001X0345",
                  "value": 37.20000076293945
                },
                {
                  "name": "ZJP0001A0544",
                  "value": 30000.0
                },
                {
                  "name": "ZJP0001A0543",
                  "value": 40500.0
                },
                {
                  "name": "ZJC0001S0926",
                  "value": 150585.328125
                },
                {
                  "name": "ZJC0001S0924",
                  "value": 690.0
                },
                {
                  "name": "ZJC0001S0925",
                  "value": 33984.140625
                },
                {
                  "name": "ZJP0001S0302",
                  "value": 577372.921875
                },
                {
                  "name": "ZJP0001S0301",
                  "value": 57500.0
                },
                {
                  "name": "ZJP0001S0304",
                  "value": 357988.03125
                },
                {
                  "name": "ZJP0001S0309",
                  "value": 326711.0
                },
                {
                  "name": "ZJC0001S0934",
                  "value": 157.8300018310547
                },
                {
                  "name": "ZJP0001S0311",
                  "value": 786056.390625
                },
                {
                  "name": "ZJP0001S0317",
                  "value": 56294.48828125
                },
                {
                  "name": "ZJC0001S0903",
                  "value": 58559.8984375
                },
                {
                  "name": "ZJC0001S0900",
                  "value": 54262.30078125
                },
                {
                  "name": "ZJC0001S0901",
                  "value": 46.5
                },
                {
                  "name": "ZJC0001S2090",
                  "value": 8030.340087890625
                },
                {
                  "name": "ZJP0001S0324",
                  "value": 28915.7890625
                },
                {
                  "name": "ZJP0001S0326",
                  "value": 2985500.25
                },
                {
                  "name": "ZJP0001S0325",
                  "value": 55599.26953125
                },
                {
                  "name": "ZJP0001S0328",
                  "value": 22235.4609375
                },
                {
                  "name": "ZJP0001S0327",
                  "value": 16849.740234375
                },
                {
                  "name": "ZJP0001S0329",
                  "value": 392196.0
                },
                {
                  "name": "ZJC0001S0916",
                  "value": 56937.58984375
                },
                {
                  "name": "ZJC0001S0914",
                  "value": 107159.15625
                },
                {
                  "name": "ZJC0001S0911",
                  "value": 90578.3984375
                },
                {
                  "name": "ZJP0001S0330",
                  "value": 335800.5
                },
                {
                  "name": "ZJP0001S0333",
                  "value": 17460.0
                },
                {
                  "name": "ZJP0001S0332",
                  "value": 37300.0
                },
                {
                  "name": "ZJP0001S0335",
                  "value": 43125.0
                },
                {
                  "name": "ZJP0001S0337",
                  "value": 40929.0
                },
                {
                  "name": "ZJP0001S0336",
                  "value": 47142.0
                },
                {
                  "name": "ZJP0001S0339",
                  "value": 210784.0
                },
                {
                  "name": "ZJP0001S0338",
                  "value": 150095.0
                },
                {
                  "name": "ZJC0001S0964",
                  "value": 9314.419921875
                },
                {
                  "name": "ZJC0001S0722",
                  "value": 72000.0
                },
                {
                  "name": "ZJC0001S0965",
                  "value": 113887.0625
                },
                {
                  "name": "ZJC0001S1812",
                  "value": 31998.23046875
                },
                {
                  "name": "ZJC0001S0962",
                  "value": 476.70001220703127
                },
                {
                  "name": "ZJC0001S0963",
                  "value": 24454.44921875
                },
                {
                  "name": "ZJC0001S0721",
                  "value": 11791.3798828125
                },
                {
                  "name": "ZJC0001S0961",
                  "value": 321.4700012207031
                },
                {
                  "name": "ZJC0001A2476",
                  "value": 3.4000000953674318
                },
                {
                  "name": "ZJC0001S1819",
                  "value": 47195.21875
                },
                {
                  "name": "ZJC0001S1818",
                  "value": 17006.94921875
                },
                {
                  "name": "ZJC0001S1815",
                  "value": 11592.0
                },
                {
                  "name": "ZJC0001S0724",
                  "value": 21078.080078125
                },
                {
                  "name": "ZJC0001S1813",
                  "value": 27608.3203125
                },
                {
                  "name": "ZJP0001S0340",
                  "value": 129540.0
                },
                {
                  "name": "ZJP0001C0747",
                  "value": 63960.0
                },
                {
                  "name": "ZJP0001S0341",
                  "value": 3900938.25
                },
                {
                  "name": "ZJP0001C0746",
                  "value": 6396.0
                },
                {
                  "name": "ZJP0001S0344",
                  "value": 308568.78125
                },
                {
                  "name": "ZJP0001S0343",
                  "value": 46242.6015625
                },
                {
                  "name": "ZJP0001S0346",
                  "value": 10271.8798828125
                },
                {
                  "name": "ZJP0001S0345",
                  "value": 23039.640625
                },
                {
                  "name": "ZJP0001S0348",
                  "value": 17075.880859375
                },
                {
                  "name": "ZJP0001S0347",
                  "value": 30167.640625
                },
                {
                  "name": "ZJP0001C0740",
                  "value": 709488.0
                },
                {
                  "name": "ZJP0001S0349",
                  "value": 77788.3828125
                },
                {
                  "name": "ZJC0001S1823",
                  "value": 99858.0
                },
                {
                  "name": "ZJC0001S1820",
                  "value": 751.7100219726563
                },
                {
                  "name": "ZJC0001S0971",
                  "value": 169695.703125
                },
                {
                  "name": "ZJC0001S0972",
                  "value": 52786.98046875
                },
                {
                  "name": "ZJC0001S0730",
                  "value": 99856.609375
                },
                {
                  "name": "ZJC0001S1828",
                  "value": 5611.83984375
                },
                {
                  "name": "ZJC0001S0979",
                  "value": 3887.580078125
                },
                {
                  "name": "ZJC0001S1824",
                  "value": 238374.0
                },
                {
                  "name": "ZJC0001S1825",
                  "value": 154734.0
                },
                {
                  "name": "ZJP0001C0759",
                  "value": 846788.0
                },
                {
                  "name": "ZJP0001C0758",
                  "value": 1421485.0
                },
                {
                  "name": "ZJP0001C0757",
                  "value": 3482614.0
                },
                {
                  "name": "ZJP0001C0756",
                  "value": 14475893.0
                },
                {
                  "name": "ZJP0001S0357",
                  "value": 21780.0
                },
                {
                  "name": "ZJP0001S0356",
                  "value": 32895.3984375
                },
                {
                  "name": "ZJC0001S0943",
                  "value": 18.700000762939454
                },
                {
                  "name": "ZJC0001S0701",
                  "value": 115500.0
                },
                {
                  "name": "ZJC0001A2697",
                  "value": 5603.990234375
                },
                {
                  "name": "ZJC0001S0949",
                  "value": 360912.0
                },
                {
                  "name": "ZJC0001S0702",
                  "value": 112.0
                },
                {
                  "name": "ZJP0001S0360",
                  "value": 185608.8125
                },
                {
                  "name": "ZJP0001S0362",
                  "value": 762976.09375
                },
                {
                  "name": "ZJP0001S0361",
                  "value": 211091.265625
                },
                {
                  "name": "ZJP0001S0364",
                  "value": 349000.0
                },
                {
                  "name": "ZJP0001S0363",
                  "value": 860400.0
                },
                {
                  "name": "ZJP0001C0768",
                  "value": 32000.0
                },
                {
                  "name": "ZJP0001S0366",
                  "value": 1398837.0
                },
                {
                  "name": "ZJP0001S0368",
                  "value": 21000.0
                },
                {
                  "name": "ZJP0001C0765",
                  "value": 38960.0
                },
                {
                  "name": "ZJP0001C0764",
                  "value": 17095.0
                },
                {
                  "name": "ZJP0001C0760",
                  "value": 349697.4375
                },
                {
                  "name": "ZJC0015S0017",
                  "value": 13345.7998046875
                },
                {
                  "name": "ZJC0015S0016",
                  "value": 72965.609375
                },
                {
                  "name": "ZJC0001S0953",
                  "value": 49736.33984375
                },
                {
                  "name": "ZJC0015S0014",
                  "value": 1094813.375
                },
                {
                  "name": "ZJC0001S1800",
                  "value": 14257.580078125
                },
                {
                  "name": "ZJC0001S0952",
                  "value": 195.05999755859376
                },
                {
                  "name": "ZJC0001A2221",
                  "value": 426.0
                },
                {
                  "name": "ZJC0001S0719",
                  "value": 2323.239990234375
                },
                {
                  "name": "ZJC0001S1808",
                  "value": 7000.3701171875
                },
                {
                  "name": "ZJC0001S1806",
                  "value": 57704.0
                },
                {
                  "name": "ZJC0001S1807",
                  "value": 19695.0
                },
                {
                  "name": "ZJC0001S1805",
                  "value": 172222.71875
                },
                {
                  "name": "ZJC0001S1803",
                  "value": 114835.9921875
                },
                {
                  "name": "ZJP0001S0370",
                  "value": 1459449.125
                },
                {
                  "name": "ZJP0001S0373",
                  "value": 92946.78125
                },
                {
                  "name": "ZJP0001S0375",
                  "value": 4125414.75
                },
                {
                  "name": "ZJP0001S0377",
                  "value": 123040.0
                },
                {
                  "name": "ZJP0001S0376",
                  "value": 19910.98046875
                },
                {
                  "name": "ZJP0001S0379",
                  "value": 84304.740234375
                },
                {
                  "name": "ZJP0001S0378",
                  "value": 99400.0
                },
                {
                  "name": "ZJC0001W0384",
                  "value": 110.0199966430664
                },
                {
                  "name": "ZJC0001S1613",
                  "value": 9643.849609375
                },
                {
                  "name": "ZJC0001S0767",
                  "value": 3.700000047683716
                },
                {
                  "name": "ZJC0001S1614",
                  "value": 3441.199951171875
                },
                {
                  "name": "ZJC0001S1612",
                  "value": 69472.0625
                },
                {
                  "name": "ZJC0001S1850",
                  "value": 168404.46875
                },
                {
                  "name": "ZJC0001S1619",
                  "value": 3780.0
                },
                {
                  "name": "ZJC0001X1030",
                  "value": 127.79999542236328
                },
                {
                  "name": "ZJC0001S1858",
                  "value": 104857.9296875
                },
                {
                  "name": "ZJC0001S0527",
                  "value": 63.900001525878909
                },
                {
                  "name": "ZJP0001S0383",
                  "value": 178491.84375
                },
                {
                  "name": "ZJP0001S0386",
                  "value": 1019273.53125
                },
                {
                  "name": "ZJP0001S0388",
                  "value": 18679.73046875
                },
                {
                  "name": "ZJP0001C0789",
                  "value": 12000.0
                },
                {
                  "name": "ZJP0001S0387",
                  "value": 1149904.5
                },
                {
                  "name": "ZJP0001S0148",
                  "value": 418002.0
                },
                {
                  "name": "ZJP0001C0787",
                  "value": 31020.0
                },
                {
                  "name": "ZJP0001S0147",
                  "value": 51560.0
                },
                {
                  "name": "ZJP0001S0389",
                  "value": 46607.23828125
                },
                {
                  "name": "ZJP0001C0786",
                  "value": 44160.0
                },
                {
                  "name": "ZJC0001S0535",
                  "value": 596326.25
                },
                {
                  "name": "ZJC0001S1624",
                  "value": 139861.984375
                },
                {
                  "name": "ZJC0001S1625",
                  "value": 222765.515625
                },
                {
                  "name": "ZJC0001A2044",
                  "value": 577.5
                },
                {
                  "name": "ZJC0001S1622",
                  "value": 23109.33984375
                },
                {
                  "name": "ZJC0001S0776",
                  "value": 63.60000228881837
                },
                {
                  "name": "ZJC0001S1865",
                  "value": 7373.52978515625
                },
                {
                  "name": "ZJC0001S0531",
                  "value": 12.399999618530274
                },
                {
                  "name": "ZJC0001S0774",
                  "value": 1620.0
                },
                {
                  "name": "ZJP0001S0391",
                  "value": 76962.28125
                },
                {
                  "name": "ZJC0001S1628",
                  "value": 132100.0
                },
                {
                  "name": "ZJP0001S0390",
                  "value": 1924.1300048828126
                },
                {
                  "name": "ZJC0001S1629",
                  "value": 68730.0
                },
                {
                  "name": "ZJC0001S1868",
                  "value": 46134.25
                },
                {
                  "name": "ZJP0001S0393",
                  "value": 91825.203125
                },
                {
                  "name": "ZJP0001S0392",
                  "value": 57643.62890625
                },
                {
                  "name": "ZJP0001S0395",
                  "value": 250762.59375
                },
                {
                  "name": "ZJP0001S0394",
                  "value": 24926.619140625
                },
                {
                  "name": "ZJP0001S0397",
                  "value": 17075.880859375
                },
                {
                  "name": "ZJP0001S0396",
                  "value": 30167.640625
                },
                {
                  "name": "ZJP0001S0399",
                  "value": 273350.0
                },
                {
                  "name": "ZJP0001S0398",
                  "value": 653650.0
                },
                {
                  "name": "ZJP0001C0797",
                  "value": 27280.0
                },
                {
                  "name": "ZJC0001A3100",
                  "value": 615661.171875
                },
                {
                  "name": "ZJC0001A2492",
                  "value": 16.68000030517578
                },
                {
                  "name": "ZJC0001S0503",
                  "value": 55.79999923706055
                },
                {
                  "name": "ZJC0001X1059",
                  "value": 33.29999923706055
                },
                {
                  "name": "ZJC0001S1837",
                  "value": 9400.0
                },
                {
                  "name": "ZJC0001S0507",
                  "value": 230.39999389648438
                },
                {
                  "name": "ZJC0001S1838",
                  "value": 128107.296875
                },
                {
                  "name": "ZJP0001S0162",
                  "value": 49084.12109375
                },
                {
                  "name": "ZJC0001S0504",
                  "value": 319.5
                },
                {
                  "name": "ZJC0001S1835",
                  "value": 11548.990234375
                },
                {
                  "name": "ZJC0001S1836",
                  "value": 12360.669921875
                },
                {
                  "name": "ZJC0001S1844",
                  "value": 110520.953125
                },
                {
                  "name": "ZJC0001A3110",
                  "value": 15.300000190734864
                },
                {
                  "name": "ZJC0001S0997",
                  "value": 20908.23046875
                },
                {
                  "name": "ZJC0001S0998",
                  "value": 105847.5
                },
                {
                  "name": "ZJC0001S1603",
                  "value": 234000.0
                },
                {
                  "name": "ZJC0001S1845",
                  "value": 237511.453125
                },
                {
                  "name": "ZJC0001S0995",
                  "value": 944.3200073242188
                },
                {
                  "name": "ZJC0001S1600",
                  "value": 98569.4921875
                },
                {
                  "name": "ZJC0001S0996",
                  "value": 166507.296875
                },
                {
                  "name": "ZJC0001S1843",
                  "value": 27617.3203125
                },
                {
                  "name": "ZJC0001S0993",
                  "value": 941873.0625
                },
                {
                  "name": "ZJC0001S0994",
                  "value": 25342.05078125
                },
                {
                  "name": "ZJC0001S0992",
                  "value": 291763.5
                },
                {
                  "name": "ZJC0001S0519",
                  "value": 13.600000381469727
                },
                {
                  "name": "ZJC0001S0759",
                  "value": 1737.8599853515626
                },
                {
                  "name": "ZJP0001S0171",
                  "value": 133450.421875
                },
                {
                  "name": "ZJC0001S1849",
                  "value": 127200.25
                },
                {
                  "name": "ZJC0001S0757",
                  "value": 3600.0
                },
                {
                  "name": "ZJP0001S0173",
                  "value": 2243245.0
                },
                {
                  "name": "ZJC0001S0515",
                  "value": 184.55999755859376
                },
                {
                  "name": "ZJC0001S1604",
                  "value": 1112760.0
                },
                {
                  "name": "ZJC0001S1605",
                  "value": 511536.0
                },
                {
                  "name": "ZJP0001C0576",
                  "value": 8920.0
                },
                {
                  "name": "ZJC0001C0915",
                  "value": 11221.9599609375
                },
                {
                  "name": "ZJC0001S0568",
                  "value": 50.400001525878909
                },
                {
                  "name": "ZJC0001S1657",
                  "value": 140544.953125
                },
                {
                  "name": "ZJC0001S0569",
                  "value": 31822.798828125
                },
                {
                  "name": "ZJC0001S1897",
                  "value": 66000.0
                },
                {
                  "name": "ZJC0001S1414",
                  "value": 1560479.125
                },
                {
                  "name": "ZJC0001S1898",
                  "value": 5645.330078125
                },
                {
                  "name": "ZJC0001S1656",
                  "value": 687.219970703125
                },
                {
                  "name": "ZJC0001S1653",
                  "value": 412.3299865722656
                },
                {
                  "name": "ZJC0001S0562",
                  "value": 14773.8896484375
                },
                {
                  "name": "ZJC0001S1894",
                  "value": 75740.0
                },
                {
                  "name": "ZJC0001S0563",
                  "value": 148.0
                },
                {
                  "name": "ZJC0001S1652",
                  "value": 320.6199951171875
                },
                {
                  "name": "ZJP0001S0180",
                  "value": 531835.5625
                },
                {
                  "name": "ZJC0001S1418",
                  "value": 838920.375
                },
                {
                  "name": "ZJC0001X0829",
                  "value": 80.5999984741211
                },
                {
                  "name": "ZJC0001S0579",
                  "value": 67.5
                },
                {
                  "name": "ZJC0001S1669",
                  "value": 54603.3515625
                },
                {
                  "name": "ZJC0001S1666",
                  "value": 91876.7578125
                },
                {
                  "name": "ZJC0001S1425",
                  "value": 196964.421875
                },
                {
                  "name": "ZJC0001S1667",
                  "value": 23702.0
                },
                {
                  "name": "ZJC0001S1422",
                  "value": 37614.140625
                },
                {
                  "name": "ZJC0001S0332",
                  "value": 686.0
                },
                {
                  "name": "ZJC0001S1428",
                  "value": 29442.48046875
                },
                {
                  "name": "ZJC0001S1430",
                  "value": 1222.9100341796876
                },
                {
                  "name": "ZJC0001S0583",
                  "value": 210.8000030517578
                },
                {
                  "name": "ZJC0001S1877",
                  "value": 113631.0
                },
                {
                  "name": "ZJC0001S1635",
                  "value": 39592.19921875
                },
                {
                  "name": "ZJC0001S1878",
                  "value": 73325.203125
                },
                {
                  "name": "ZJC0001S1876",
                  "value": 192195.359375
                },
                {
                  "name": "ZJC0001S1634",
                  "value": 145290.59765625
                },
                {
                  "name": "ZJC0001S1873",
                  "value": 43449.75
                },
                {
                  "name": "ZJC0001S1631",
                  "value": 31590.0
                },
                {
                  "name": "ZJC0001S1874",
                  "value": 64879.4296875
                },
                {
                  "name": "ZJC0001S0541",
                  "value": 63798.0
                },
                {
                  "name": "ZJC0001S1630",
                  "value": 19250.0
                },
                {
                  "name": "ZJC0001S0548",
                  "value": 40899.26171875
                },
                {
                  "name": "ZJC0001C1371",
                  "value": 10878.6201171875
                },
                {
                  "name": "ZJC0001A2856",
                  "value": 549.0
                },
                {
                  "name": "ZJC0001X0607",
                  "value": 79.9000015258789
                },
                {
                  "name": "ZJC0001S1402",
                  "value": 264.0
                },
                {
                  "name": "ZJC0001S0555",
                  "value": 18173.869140625
                },
                {
                  "name": "ZJC0001S0795",
                  "value": 12000.0
                },
                {
                  "name": "ZJC0001S0311",
                  "value": 3.0999999046325685
                },
                {
                  "name": "ZJC0001S0554",
                  "value": 15.300000190734864
                },
                {
                  "name": "ZJC0001S1885",
                  "value": 171442.5
                },
                {
                  "name": "ZJC0001S0551",
                  "value": 110587.0
                },
                {
                  "name": "ZJC0001S1640",
                  "value": 11813.9599609375
                },
                {
                  "name": "ZJC0001S0794",
                  "value": 103200.0
                },
                {
                  "name": "ZJC0001S0559",
                  "value": 29700.0
                },
                {
                  "name": "ZJC0001S0317",
                  "value": 1281.5999755859376
                },
                {
                  "name": "ZJC0001S1407",
                  "value": 127679.890625
                },
                {
                  "name": "ZJC0001S1649",
                  "value": 1533624.25
                },
                {
                  "name": "ZJC0001S1217",
                  "value": 10579.1796875
                },
                {
                  "name": "ZJC0001S1218",
                  "value": 91972.796875
                },
                {
                  "name": "ZJC0001S1215",
                  "value": 1420.9000244140626
                },
                {
                  "name": "ZJC0001S1216",
                  "value": 6990.259765625
                },
                {
                  "name": "ZJC0001S1458",
                  "value": 25201.2890625
                },
                {
                  "name": "ZJC0001A2673",
                  "value": 39225.6015625
                },
                {
                  "name": "ZJC0001S1697",
                  "value": 13167.900390625
                },
                {
                  "name": "ZJC0001S1214",
                  "value": 20710.900390625
                },
                {
                  "name": "ZJC0001S0367",
                  "value": 49.29999923706055
                },
                {
                  "name": "ZJC0001S1456",
                  "value": 2248.820068359375
                },
                {
                  "name": "ZJC0001S0125",
                  "value": 28.399999618530275
                },
                {
                  "name": "ZJC0001S1695",
                  "value": 53919.62890625
                },
                {
                  "name": "ZJC0001S1212",
                  "value": 18529.009765625
                },
                {
                  "name": "ZJC0001S1696",
                  "value": 127016.921875
                },
                {
                  "name": "ZJC0001S1219",
                  "value": 1557.4599609375
                },
                {
                  "name": "ZJC0001S1220",
                  "value": 290395.484375
                },
                {
                  "name": "ZJC0001S1462",
                  "value": 42123.05859375
                },
                {
                  "name": "ZJC0001S1221",
                  "value": 297460.65625
                },
                {
                  "name": "ZJC0001S1463",
                  "value": 48569.23046875
                },
                {
                  "name": "ZJC0001S1460",
                  "value": 39578.640625
                },
                {
                  "name": "ZJC0001S1461",
                  "value": 746400.0
                },
                {
                  "name": "ZJC0001S0370",
                  "value": 13.600000381469727
                },
                {
                  "name": "ZJC0001S1228",
                  "value": 204.0
                },
                {
                  "name": "ZJC0001S1229",
                  "value": 58500.0
                },
                {
                  "name": "ZJC0001S1468",
                  "value": 44000.0
                },
                {
                  "name": "ZJC0001S1469",
                  "value": 86551.203125
                },
                {
                  "name": "ZJC0001S1225",
                  "value": 2090.5
                },
                {
                  "name": "ZJC0001S1223",
                  "value": 24.0
                },
                {
                  "name": "ZJC0001S1231",
                  "value": 1916.4200439453126
                },
                {
                  "name": "ZJC0001S1473",
                  "value": 10219.01953125
                },
                {
                  "name": "ZJC0001S0385",
                  "value": 3512.340087890625
                },
                {
                  "name": "ZJC0001S1474",
                  "value": 532.0800170898438
                },
                {
                  "name": "ZJC0001S1471",
                  "value": 2031.2099609375
                },
                {
                  "name": "ZJC0001S0141",
                  "value": 2459.169921875
                },
                {
                  "name": "ZJC0001S1230",
                  "value": 2575.5
                },
                {
                  "name": "ZJC0001S1679",
                  "value": 30747.109375
                },
                {
                  "name": "ZJC0001S1677",
                  "value": 8028.0
                },
                {
                  "name": "ZJC0001A2890",
                  "value": 4832.64990234375
                },
                {
                  "name": "ZJC0001S0347",
                  "value": 41628.4609375
                },
                {
                  "name": "ZJC0001S1678",
                  "value": 2126383.0
                },
                {
                  "name": "ZJC0001S0586",
                  "value": 161393.84765625
                },
                {
                  "name": "ZJC0001S0344",
                  "value": 10.199999809265137
                },
                {
                  "name": "ZJC0001S1675",
                  "value": 81774.5703125
                },
                {
                  "name": "ZJC0001S1674",
                  "value": 25323.580078125
                },
                {
                  "name": "ZJP0001C0729",
                  "value": 12792.0
                },
                {
                  "name": "ZJC0001S1682",
                  "value": 21534.3203125
                },
                {
                  "name": "ZJC0001S1441",
                  "value": 27445.109375
                },
                {
                  "name": "ZJC0001S0591",
                  "value": 43068.98046875
                },
                {
                  "name": "ZJC0001A2898",
                  "value": 13371.8994140625
                },
                {
                  "name": "ZJC0001S1681",
                  "value": 25151.01953125
                },
                {
                  "name": "ZJC0001S0117",
                  "value": 79085.921875
                },
                {
                  "name": "ZJC0001S1206",
                  "value": 4863.7900390625
                },
                {
                  "name": "ZJC0001S1205",
                  "value": 21455.1796875
                },
                {
                  "name": "ZJC0001S1202",
                  "value": 205800.0
                },
                {
                  "name": "ZJC0001S1444",
                  "value": 28080.0
                },
                {
                  "name": "ZJC0001S0597",
                  "value": 183949.046875
                },
                {
                  "name": "ZJC0001S1203",
                  "value": 137160.0
                },
                {
                  "name": "ZJC0001S1445",
                  "value": 121639.109375
                },
                {
                  "name": "ZJC0001S1687",
                  "value": 161469.375
                },
                {
                  "name": "ZJC0001S1200",
                  "value": 20000.0
                },
                {
                  "name": "ZJC0001S1442",
                  "value": 4560.0
                },
                {
                  "name": "ZJC0001S1684",
                  "value": 88320.59375
                },
                {
                  "name": "ZJC0001S1201",
                  "value": 92392.46875
                },
                {
                  "name": "ZJC0001S0596",
                  "value": 128389.0234375
                },
                {
                  "name": "ZJC0001S1208",
                  "value": 26905.720703125
                },
                {
                  "name": "ZJC0001S1209",
                  "value": 46190.21875
                },
                {
                  "name": "ZJP0001C0739",
                  "value": 835200.0
                },
                {
                  "name": "ZJC0001S1451",
                  "value": 146253.0
                },
                {
                  "name": "ZJC0001S1693",
                  "value": 99573.921875
                },
                {
                  "name": "ZJC0001S0121",
                  "value": 28.399999618530275
                },
                {
                  "name": "ZJC0001S1694",
                  "value": 11510.240234375
                },
                {
                  "name": "ZJC0001S1691",
                  "value": 5940.0
                },
                {
                  "name": "ZJC0001S1692",
                  "value": 361449.75
                },
                {
                  "name": "ZJC0001S1018",
                  "value": 71130.5234375
                },
                {
                  "name": "ZJC0001S1013",
                  "value": 4501.5
                },
                {
                  "name": "ZJC0001S1497",
                  "value": 216568.203125
                },
                {
                  "name": "ZJC0001S1498",
                  "value": 44484.6298828125
                },
                {
                  "name": "ZJC0001S1022",
                  "value": 21239.93994140625
                },
                {
                  "name": "ZJC0001S1264",
                  "value": 257323.421875
                },
                {
                  "name": "ZJC0001S0176",
                  "value": 112.0
                },
                {
                  "name": "ZJC0001S1023",
                  "value": 2417.260009765625
                },
                {
                  "name": "ZJC0001S1265",
                  "value": 308955.34375
                },
                {
                  "name": "ZJC0001S1262",
                  "value": 205800.0
                },
                {
                  "name": "ZJC0001S1021",
                  "value": 1354.949951171875
                },
                {
                  "name": "ZJC0001S1263",
                  "value": 201743.640625
                },
                {
                  "name": "ZJC0001S1260",
                  "value": 151272.0
                },
                {
                  "name": "ZJC0001S1261",
                  "value": 20043.19921875
                },
                {
                  "name": "ZJP0001A0232",
                  "value": 46212.28125
                },
                {
                  "name": "ZJC0001X1529",
                  "value": 88.80000305175781
                },
                {
                  "name": "ZJC0001S1268",
                  "value": 15006.0302734375
                },
                {
                  "name": "ZJC0001S1027",
                  "value": 10.199999809265137
                },
                {
                  "name": "ZJC0001S1266",
                  "value": 51340.91015625
                },
                {
                  "name": "ZJC0001C0694",
                  "value": 21.1299991607666
                },
                {
                  "name": "ZJC0001S1034",
                  "value": 114000.15625
                },
                {
                  "name": "ZJC0001S1031",
                  "value": 9708.7998046875
                },
                {
                  "name": "ZJC0001S1032",
                  "value": 223945.3125
                },
                {
                  "name": "ZJC0001S1030",
                  "value": 784.0
                },
                {
                  "name": "ZJC0001S1272",
                  "value": 214546.5
                },
                {
                  "name": "ZJC0001A2803",
                  "value": 98838.0
                },
                {
                  "name": "ZJC0001S1239",
                  "value": 53834.3984375
                },
                {
                  "name": "ZJC0001S1237",
                  "value": 6015.990234375
                },
                {
                  "name": "ZJC0001S1238",
                  "value": 11645.41015625
                },
                {
                  "name": "ZJC0001S1235",
                  "value": 143080.2890625
                },
                {
                  "name": "ZJC0001S1477",
                  "value": 51380.810546875
                },
                {
                  "name": "ZJC0001S1236",
                  "value": 40041.8515625
                },
                {
                  "name": "ZJC0001S0386",
                  "value": 323.0
                },
                {
                  "name": "ZJC0001S1475",
                  "value": 33000.0
                },
                {
                  "name": "ZJC0001S1234",
                  "value": 44358.671875
                },
                {
                  "name": "ZJC0001S1476",
                  "value": 174042.0
                },
                {
                  "name": "ZJC0001S1484",
                  "value": 5394.419921875
                },
                {
                  "name": "ZJC0001S1242",
                  "value": 29502.119140625
                },
                {
                  "name": "ZJC0001S1243",
                  "value": 27000.0
                },
                {
                  "name": "ZJC0001S1485",
                  "value": 1305.489990234375
                },
                {
                  "name": "ZJC0001S1240",
                  "value": 51883.19921875
                },
                {
                  "name": "ZJC0001S1482",
                  "value": 1817.010009765625
                },
                {
                  "name": "ZJC0001S1481",
                  "value": 408.4700012207031
                },
                {
                  "name": "ZJC0001A0835",
                  "value": 30906.529296875
                },
                {
                  "name": "ZJC0001S1006",
                  "value": 330.57000732421877
                },
                {
                  "name": "ZJC0001S1248",
                  "value": 302900.25
                },
                {
                  "name": "ZJC0001S1007",
                  "value": 14.0
                },
                {
                  "name": "ZJC0001S1249",
                  "value": 256410.1875
                },
                {
                  "name": "ZJC0001S1488",
                  "value": 128694.921875
                },
                {
                  "name": "ZJC0001S1004",
                  "value": 110.0
                },
                {
                  "name": "ZJC0001S1246",
                  "value": 4760.0
                },
                {
                  "name": "ZJC0001S1005",
                  "value": 7597.3798828125
                },
                {
                  "name": "ZJC0001S1247",
                  "value": 21.299999237060548
                },
                {
                  "name": "ZJC0001S1489",
                  "value": 142605.015625
                },
                {
                  "name": "ZJC0001S0155",
                  "value": 11.899999618530274
                },
                {
                  "name": "ZJC0001S1002",
                  "value": 26288.400390625
                },
                {
                  "name": "ZJC0001S1244",
                  "value": 22500.0
                },
                {
                  "name": "ZJC0001S1486",
                  "value": 1404.81005859375
                },
                {
                  "name": "ZJC0001S1003",
                  "value": 3072.22998046875
                },
                {
                  "name": "ZJC0001S1245",
                  "value": 2160.0
                },
                {
                  "name": "ZJC0001X0212",
                  "value": 20.399999618530275
                },
                {
                  "name": "ZJC0001S1493",
                  "value": 8904.7802734375
                },
                {
                  "name": "ZJC0001S1491",
                  "value": 4180.18994140625
                },
                {
                  "name": "ZJC0001S1490",
                  "value": 122445.2734375
                },
                {
                  "name": "ZJC0001S1059",
                  "value": 9200.0
                },
                {
                  "name": "ZJC0001C1115",
                  "value": 60934.609375
                },
                {
                  "name": "ZJC0001A0653",
                  "value": 1.5499999523162842
                },
                {
                  "name": "ZJC0001S1065",
                  "value": 119.0
                },
                {
                  "name": "ZJC0001S1062",
                  "value": 843.719970703125
                },
                {
                  "name": "ZJC0001S1063",
                  "value": 14.0
                },
                {
                  "name": "ZJC0001X0879",
                  "value": 156.1999969482422
                },
                {
                  "name": "ZJC0001S1068",
                  "value": 183498.34375
                },
                {
                  "name": "ZJC0001C1349",
                  "value": 75362.40234375
                },
                {
                  "name": "ZJC0001S1077",
                  "value": 72779.8828125
                },
                {
                  "name": "ZJC0001S1078",
                  "value": 31.469999313354493
                },
                {
                  "name": "ZJC0001S1076",
                  "value": 202510.3125
                },
                {
                  "name": "ZJC0001A0666",
                  "value": 755143.453125
                },
                {
                  "name": "ZJC0001A0667",
                  "value": 118480.4921875
                },
                {
                  "name": "ZJC0001S1073",
                  "value": 1840.3399658203126
                },
                {
                  "name": "ZJP0001A0043",
                  "value": 59565.0
                },
                {
                  "name": "ZJP0001A0042",
                  "value": 39730.0
                },
                {
                  "name": "ZJP0001A0041",
                  "value": 23000.0
                },
                {
                  "name": "ZJC0001S1072",
                  "value": 6570.0
                },
                {
                  "name": "ZJP0001A0040",
                  "value": 16350.0
                },
                {
                  "name": "ZJP0001A0045",
                  "value": 86000.0
                },
                {
                  "name": "ZJC0001S1037",
                  "value": 2205.5
                },
                {
                  "name": "ZJC0001S1038",
                  "value": 76354.921875
                },
                {
                  "name": "ZJC0001S1035",
                  "value": 634090.1875
                },
                {
                  "name": "ZJC0001S1286",
                  "value": 427947.3125
                },
                {
                  "name": "ZJC0001S1042",
                  "value": 301708.8046875
                },
                {
                  "name": "ZJC0001S1043",
                  "value": 17.0
                },
                {
                  "name": "ZJC0001S1285",
                  "value": 128265.8984375
                },
                {
                  "name": "ZJC0001S1282",
                  "value": 58568.08984375
                },
                {
                  "name": "ZJC0001S1280",
                  "value": 299532.03125
                },
                {
                  "name": "ZJC0001S1281",
                  "value": 19692.669921875
                },
                {
                  "name": "ZJC0001S1048",
                  "value": 36129.0390625
                },
                {
                  "name": "ZJC0001S1049",
                  "value": 5042.18994140625
                },
                {
                  "name": "ZJC0001S1046",
                  "value": 15998.0400390625
                },
                {
                  "name": "ZJC0001S1288",
                  "value": 46174.470703125
                },
                {
                  "name": "ZJC0001S1047",
                  "value": 53827.58984375
                },
                {
                  "name": "ZJC0001S1053",
                  "value": 640.3200073242188
                },
                {
                  "name": "ZJC0001S1054",
                  "value": 826.4500122070313
                },
                {
                  "name": "ZJC0001S1051",
                  "value": 48354.46875
                },
                {
                  "name": "ZJC0001S1052",
                  "value": 8618.1103515625
                },
                {
                  "name": "ZJC0001S1050",
                  "value": 13354.6396484375
                },
                {
                  "name": "ZJC0001X0027",
                  "value": 137.70000457763673
                },
                {
                  "name": "ZJC0001X0028",
                  "value": 129.49999809265138
                },
                {
                  "name": "ZJC0001X0023",
                  "value": 47.599998474121097
                },
                {
                  "name": "ZJC0001X1110",
                  "value": 42.599998474121097
                },
                {
                  "name": "WHP0015X0805",
                  "value": 80.5999984741211
                },
                {
                  "name": "WHP0015X0803",
                  "value": 44.20000076293945
                },
                {
                  "name": "WHP0015X0804",
                  "value": 96.19999694824219
                },
                {
                  "name": "ZJC0001X0275",
                  "value": 15702.750244140625
                },
                {
                  "name": "ZJC0001X1120",
                  "value": 198.8000030517578
                },
                {
                  "name": "ZJC0001A2176",
                  "value": 927.2899780273438
                },
                {
                  "name": "ZJC0001S1081",
                  "value": 29.600000381469728
                },
                {
                  "name": "ZJP0001S0401",
                  "value": 10271.8798828125
                },
                {
                  "name": "ZJP0001S0400",
                  "value": 23039.640625
                },
                {
                  "name": "ZJP0001S0403",
                  "value": 186046.203125
                },
                {
                  "name": "ZJP0001S0402",
                  "value": 5593837.5
                },
                {
                  "name": "ZJP0001S0405",
                  "value": 26800.0
                },
                {
                  "name": "ZJP0001S0404",
                  "value": 36781.390625
                },
                {
                  "name": "ZJP0001S0407",
                  "value": 125156.3515625
                },
                {
                  "name": "ZJP0001S0406",
                  "value": 2232.0
                },
                {
                  "name": "ZJP0001S0409",
                  "value": 200850.875
                },
                {
                  "name": "ZJP0001S0408",
                  "value": 532344.75
                },
                {
                  "name": "ZJC0001A3031",
                  "value": 22.100000381469728
                },
                {
                  "name": "ZJC0001X1386",
                  "value": 37026.58984375
                },
                {
                  "name": "ZJC0001A3270",
                  "value": 10801.5
                },
                {
                  "name": "ZJP0001S0410",
                  "value": 4029960.0
                },
                {
                  "name": "ZJP0001S0412",
                  "value": 11724.169921875
                },
                {
                  "name": "ZJP0001S0414",
                  "value": 525000.0
                },
                {
                  "name": "ZJP0001S0413",
                  "value": 261000.0
                },
                {
                  "name": "ZJC0001S1097",
                  "value": 241076.375
                },
                {
                  "name": "ZJC0001S1098",
                  "value": 121067.6328125
                },
                {
                  "name": "ZJP0001S0415",
                  "value": 1478583.0
                },
                {
                  "name": "ZJP0001S0418",
                  "value": 1018710.0
                },
                {
                  "name": "ZJP0001S0417",
                  "value": 78925.8515625
                },
                {
                  "name": "ZJP0001S0419",
                  "value": 38218.201171875
                },
                {
                  "name": "ZJC0001S0800",
                  "value": 41494.6484375
                },
                {
                  "name": "ZJC0001X0229",
                  "value": 265.04998779296877
                },
                {
                  "name": "ZJP0001A0427",
                  "value": 16800.0
                },
                {
                  "name": "ZJC0001S0803",
                  "value": 4200.0
                },
                {
                  "name": "ZJC0001S0802",
                  "value": 50.400001525878909
                },
                {
                  "name": "ZJP0001S0421",
                  "value": 9660.0
                },
                {
                  "name": "ZJP0001S0423",
                  "value": 210929.90625
                },
                {
                  "name": "ZJP0001S0425",
                  "value": 4830.0
                },
                {
                  "name": "ZJP0001S0424",
                  "value": 130709.203125
                },
                {
                  "name": "ZJP0001S0426",
                  "value": 234500.90625
                },
                {
                  "name": "ZJP0001S0429",
                  "value": 208912.546875
                },
                {
                  "name": "ZJP0001S0428",
                  "value": 347377.6875
                },
                {
                  "name": "ZJC0001S1907",
                  "value": 34890.0
                },
                {
                  "name": "ZJC0001S0818",
                  "value": 27000.0
                },
                {
                  "name": "ZJC0001S0819",
                  "value": 43217.2109375
                },
                {
                  "name": "ZJC0001S1905",
                  "value": 222.0
                },
                {
                  "name": "ZJC0001S1906",
                  "value": 225798.734375
                },
                {
                  "name": "ZJC0001S1903",
                  "value": 10350.0
                },
                {
                  "name": "ZJP0001S0430",
                  "value": 91467.9921875
                },
                {
                  "name": "ZJP0001S0432",
                  "value": 3664.219970703125
                },
                {
                  "name": "ZJP0001S0431",
                  "value": 302651.65625
                },
                {
                  "name": "ZJP0001S0434",
                  "value": 273643.875
                },
                {
                  "name": "ZJP0001S0433",
                  "value": 113302.1171875
                },
                {
                  "name": "ZJP0001S0436",
                  "value": 35095.41015625
                },
                {
                  "name": "ZJP0001S0435",
                  "value": 20952.0
                },
                {
                  "name": "ZJP0001S0438",
                  "value": 4560.0
                },
                {
                  "name": "ZJP0001S0439",
                  "value": 2352.0
                },
                {
                  "name": "ZJC0001A3066",
                  "value": 117.30000305175781
                },
                {
                  "name": "ZJC0001X1574",
                  "value": 142.0
                },
                {
                  "name": "ZJP0001S0443",
                  "value": 42560.0
                },
                {
                  "name": "ZJP0001S0442",
                  "value": 4042.050048828125
                },
                {
                  "name": "ZJP0001S0445",
                  "value": 145718.84375
                },
                {
                  "name": "ZJP0001S0444",
                  "value": 3452.60009765625
                },
                {
                  "name": "ZJP0001S0447",
                  "value": 141707.82421875
                },
                {
                  "name": "ZJP0001S0449",
                  "value": 615039.046875
                },
                {
                  "name": "ZJP0001S0448",
                  "value": 260909.015625
                },
                {
                  "name": "ZJP0001S0209",
                  "value": 311040.0
                },
                {
                  "name": "ZJP0001S0208",
                  "value": 12122.5400390625
                },
                {
                  "name": "ZJP0001A0211",
                  "value": 4200.0
                },
                {
                  "name": "ZJP0001A0213",
                  "value": 2000.0
                },
                {
                  "name": "ZJC0001X0497",
                  "value": 55.5
                },
                {
                  "name": "ZJC0001X1345",
                  "value": 2058.0
                },
                {
                  "name": "ZJP0001S0450",
                  "value": 27420.640625
                },
                {
                  "name": "ZJP0001S0210",
                  "value": 26280.0
                },
                {
                  "name": "ZJP0001S0451",
                  "value": 21700.650390625
                },
                {
                  "name": "ZJP0001S0454",
                  "value": 5692.64990234375
                },
                {
                  "name": "ZJP0001S0211",
                  "value": 69440.0
                },
                {
                  "name": "ZJP0001S0214",
                  "value": 44420.0
                },
                {
                  "name": "ZJP0001S0456",
                  "value": 121800.0
                },
                {
                  "name": "ZJP0001S0455",
                  "value": 41697.640625
                },
                {
                  "name": "ZJP0001S0457",
                  "value": 112000.0
                },
                {
                  "name": "ZJP0001S0459",
                  "value": 133158.71484375
                },
                {
                  "name": "WHP0015X0636",
                  "value": 11.100000381469727
                },
                {
                  "name": "WHP0015X0635",
                  "value": 3.4000000953674318
                }
              ],
              "name": "CARD LINE",
              "value": 180271384.6820941
            },
            {
              "children": [
                {
                  "name": "ZJC0018S0223",
                  "value": 26.0
                },
                {
                  "name": "ZJC0018S0183",
                  "value": 1088.27001953125
                },
                {
                  "name": "ZJC0018A0214",
                  "value": 2288.0
                },
                {
                  "name": "ZJC0018S0469",
                  "value": 1144.0
                }
              ],
              "name": "EDIMM LINE",
              "value": 4546.27001953125
            },
            {
              "children": [
                {
                  "name": "ZJC0018C0451",
                  "value": 653.7899780273438
                },
                {
                  "name": "ZJC0018C0398",
                  "value": 181954.90625
                },
                {
                  "name": "ZJC0018C0437",
                  "value": 171402.0625
                },
                {
                  "name": "ZJC0018A0128",
                  "value": 4931.18017578125
                }
              ],
              "name": "FDIMM LINE",
              "value": 358941.9389038086
            },
            {
              "children": [
                {
                  "name": "ZJC0007A1583",
                  "value": 322.7300109863281
                },
                {
                  "name": "ZJC0007C5155",
                  "value": 132.0
                },
                {
                  "name": "ZJC0007S1618",
                  "value": 408935.0
                },
                {
                  "name": "ZJC0007S0646",
                  "value": 465273.1875
                },
                {
                  "name": "ZJC0007C5035",
                  "value": 1281.3599853515626
                },
                {
                  "name": "ZJC0007S1619",
                  "value": 38.099998474121097
                },
                {
                  "name": "ZJC0007C3771",
                  "value": 1498.3800048828126
                },
                {
                  "name": "ZJC0007S0926",
                  "value": 76736.0
                },
                {
                  "name": "ZJC0007C5272",
                  "value": 2250.280029296875
                },
                {
                  "name": "ZJP0007C0272",
                  "value": 1740000.0
                },
                {
                  "name": "ZJC0007S1614",
                  "value": 38797.390625
                },
                {
                  "name": "ZJC0007S1736",
                  "value": 387357.96875
                },
                {
                  "name": "ZJP0007C0273",
                  "value": 1810000.0
                },
                {
                  "name": "ZJC0007C5037",
                  "value": 911.9400024414063
                },
                {
                  "name": "ZJC0007C3777",
                  "value": 3286.840087890625
                },
                {
                  "name": "ZJC0007C4624",
                  "value": 576.780029296875
                },
                {
                  "name": "ZJC0007C4905",
                  "value": 137100.40625
                },
                {
                  "name": "ZJC0007C3419",
                  "value": 1452.1500244140626
                },
                {
                  "name": "ZJC0007C4627",
                  "value": 46811.078125
                },
                {
                  "name": "ZJC0007S0650",
                  "value": 104810.140625
                },
                {
                  "name": "ZJC0007S0655",
                  "value": 1247.010009765625
                },
                {
                  "name": "ZJC0007S1106",
                  "value": 1123916.125
                },
                {
                  "name": "ZJC0007S0930",
                  "value": 215412.484375
                },
                {
                  "name": "ZJC0008C0145",
                  "value": 114.6500015258789
                },
                {
                  "name": "ZJC0007S0654",
                  "value": 2076865.0
                },
                {
                  "name": "ZJC0007S0412",
                  "value": 622912.0625
                },
                {
                  "name": "ZJC0007S1501",
                  "value": 58802.44921875
                },
                {
                  "name": "ZJC0008C0143",
                  "value": 2014.75
                },
                {
                  "name": "ZJC0008C0144",
                  "value": 160.5500030517578
                },
                {
                  "name": "ZJC0007S0536",
                  "value": 130.52000427246095
                },
                {
                  "name": "ZJC0007C2276",
                  "value": 32.189998626708987
                },
                {
                  "name": "ZJC0007C2310",
                  "value": 797.8800048828125
                },
                {
                  "name": "ZJC0007S0303",
                  "value": 1607000.25
                },
                {
                  "name": "ZJC0007S0786",
                  "value": 7123.39990234375
                },
                {
                  "name": "ZJC0007S1116",
                  "value": 617444.625
                },
                {
                  "name": "ZJC0007S0307",
                  "value": 64902.73828125
                },
                {
                  "name": "ZJC0007S0702",
                  "value": 132048.671875
                },
                {
                  "name": "ZJC0007C5178",
                  "value": 55685.19921875
                },
                {
                  "name": "ZJC0007C5453",
                  "value": 476.0
                },
                {
                  "name": "ZJC0007S0828",
                  "value": 685.7999877929688
                },
                {
                  "name": "ZJC0007C5051",
                  "value": 833.1500244140625
                },
                {
                  "name": "ZJC0007S0827",
                  "value": 204583.328125
                },
                {
                  "name": "ZJC0007A5042",
                  "value": 138806.953125
                },
                {
                  "name": "ZJC0007C1135",
                  "value": 10268.4599609375
                },
                {
                  "name": "ZJC0007C4923",
                  "value": 124506.3515625
                },
                {
                  "name": "ZJC0007C4888",
                  "value": 276.0
                },
                {
                  "name": "ZJC0007C4645",
                  "value": 45446.0703125
                },
                {
                  "name": "ZJC0007C4926",
                  "value": 123698.2578125
                },
                {
                  "name": "ZJC0007A1809",
                  "value": 36.58000183105469
                },
                {
                  "name": "ZJC0007S0790",
                  "value": 38974.328125
                },
                {
                  "name": "ZJC0007S1120",
                  "value": 1902887.125
                },
                {
                  "name": "ZJC0007S1124",
                  "value": 1592014.875
                },
                {
                  "name": "ZJC0007S1644",
                  "value": 17664.0
                },
                {
                  "name": "ZJC0007S0831",
                  "value": 659586.4375
                },
                {
                  "name": "ZJC0007S1489",
                  "value": 129743.40625
                },
                {
                  "name": "ZJC0007S1125",
                  "value": 727.4199829101563
                },
                {
                  "name": "ZJC0007S0714",
                  "value": 706592.4375
                },
                {
                  "name": "ZJC0007S0956",
                  "value": 44462.0
                },
                {
                  "name": "ZJC0007S0317",
                  "value": 269670.75
                },
                {
                  "name": "ZJC0007S0832",
                  "value": 34.63999938964844
                },
                {
                  "name": "ZJC0007S0718",
                  "value": 52065.80078125
                },
                {
                  "name": "ZJC0007C4992",
                  "value": 1884.22998046875
                },
                {
                  "name": "ZJC0007S1769",
                  "value": 244000.0
                },
                {
                  "name": "ZJC0007S1529",
                  "value": 309882.0625
                },
                {
                  "name": "ZJC0007C4512",
                  "value": 6525.0
                },
                {
                  "name": "ZJC0007C5048",
                  "value": 50.0
                },
                {
                  "name": "ZJC0007C5049",
                  "value": 571.0499877929688
                },
                {
                  "name": "ZJC0007C4915",
                  "value": 4679.91015625
                },
                {
                  "name": "ZJC0007C4517",
                  "value": 1552.0
                },
                {
                  "name": "ZJC0007S1493",
                  "value": 636914.125
                },
                {
                  "name": "IFF0001A1734",
                  "value": 13020.0
                },
                {
                  "name": "ZJC0007S0321",
                  "value": 92479.5390625
                },
                {
                  "name": "ZJC0007S1497",
                  "value": 307566.65625
                },
                {
                  "name": "ZJC0007S0682",
                  "value": 39.9900016784668
                },
                {
                  "name": "IFF0001A1732",
                  "value": 390840.0
                },
                {
                  "name": "ZJC0007S1375",
                  "value": 329857.375
                },
                {
                  "name": "ZJC0007C5050",
                  "value": 1803.699951171875
                },
                {
                  "name": "ZJC0007S1132",
                  "value": 77977.671875
                },
                {
                  "name": "ZJC0007S1777",
                  "value": 659736.0
                },
                {
                  "name": "ZJC0007S0325",
                  "value": 269487.0625
                },
                {
                  "name": "IFF0001A3358",
                  "value": 5040.0
                },
                {
                  "name": "ZJC0007S1534",
                  "value": 95.25
                },
                {
                  "name": "ZJC0007S0686",
                  "value": 1145.6500244140626
                },
                {
                  "name": "ZJC0007S1137",
                  "value": 466178.15625
                },
                {
                  "name": "ZJC0007S1533",
                  "value": 94607.5
                },
                {
                  "name": "ZJC0007S0960",
                  "value": 7320.0
                },
                {
                  "name": "ZJC0007S1773",
                  "value": 43931.25
                },
                {
                  "name": "ZJC0007A3442",
                  "value": 76670.671875
                },
                {
                  "name": "ZJC0007C5199",
                  "value": 4727.7001953125
                },
                {
                  "name": "ZJC0007S1537",
                  "value": 179435.125
                },
                {
                  "name": "ZJC0007S0568",
                  "value": 835.7999877929688
                },
                {
                  "name": "ZJC0007S0601",
                  "value": 192850.59375
                },
                {
                  "name": "ZJC0007S1657",
                  "value": 57312.08984375
                },
                {
                  "name": "ZJC0007C2361",
                  "value": 7883.47021484375
                },
                {
                  "name": "ZJC0007S0605",
                  "value": 896716.375
                },
                {
                  "name": "ZJC0007C4421",
                  "value": 87504.7109375
                },
                {
                  "name": "ZJC0007C5235",
                  "value": 16728.0
                },
                {
                  "name": "ZJC0007C4943",
                  "value": 8106.08984375
                },
                {
                  "name": "ZJC0007C0983",
                  "value": 87682.9296875
                },
                {
                  "name": "ZJC0007S0291",
                  "value": 4417354.5
                },
                {
                  "name": "ZJC0007C4706",
                  "value": 4324.91015625
                },
                {
                  "name": "ZJC0007S1262",
                  "value": 313874.34375
                },
                {
                  "name": "ZJC0007X1120",
                  "value": 545664.1875
                },
                {
                  "name": "ZJC0007S0694",
                  "value": 474257.375
                },
                {
                  "name": "ZJC0007S1387",
                  "value": 565541.25
                },
                {
                  "name": "ZJC0007S1781",
                  "value": 100797.5234375
                },
                {
                  "name": "ZJC0007S1423",
                  "value": 220361.234375
                },
                {
                  "name": "ZJC0007S0614",
                  "value": 141777.453125
                },
                {
                  "name": "ZJC0007S1427",
                  "value": 2205342.0
                },
                {
                  "name": "ZJC0007S1789",
                  "value": 19760.0
                },
                {
                  "name": "ZJC0007S1944",
                  "value": 75511.71875
                },
                {
                  "name": "ZJC0007C5228",
                  "value": 6666.56005859375
                },
                {
                  "name": "ZJC0007C4014",
                  "value": 4938.31982421875
                },
                {
                  "name": "ZJC0007C4377",
                  "value": 180738.15625
                },
                {
                  "name": "ZJC0007C4652",
                  "value": 1058967.75
                },
                {
                  "name": "ZJC0007C3207",
                  "value": 154448.15625
                },
                {
                  "name": "ZJC0007C4417",
                  "value": 75253.5
                },
                {
                  "name": "ZJC0007C4416",
                  "value": 46314.2890625
                },
                {
                  "name": "ZJC0007A4424",
                  "value": 7937.56982421875
                },
                {
                  "name": "ZJC0007C4778",
                  "value": 13423.1298828125
                },
                {
                  "name": "ZJC0007C5348",
                  "value": 2668.340087890625
                },
                {
                  "name": "ZJC0007S1391",
                  "value": 179058.1875
                },
                {
                  "name": "IFF0001A3332",
                  "value": 10080.0
                },
                {
                  "name": "WHP0035M4041",
                  "value": 19.6200008392334
                },
                {
                  "name": "HAP0035M1178",
                  "value": 12796.0400390625
                },
                {
                  "name": "ZJC0007C4042",
                  "value": 242600.234375
                },
                {
                  "name": "ZJC0007S1958",
                  "value": 2794.3299560546877
                },
                {
                  "name": "ZJC0007C4041",
                  "value": 362478.09375
                },
                {
                  "name": "ZJC0007C2022",
                  "value": 71834.359375
                },
                {
                  "name": "ZJC0007C4320",
                  "value": 11460.0
                },
                {
                  "name": "ZJC0007C4044",
                  "value": 59995.8984375
                },
                {
                  "name": "ZJC0007C5251",
                  "value": 2070.0
                },
                {
                  "name": "IFF0001A1913",
                  "value": 327600.0
                },
                {
                  "name": "ZJC0007C4604",
                  "value": 362.17999267578127
                },
                {
                  "name": "ZJC0007C4327",
                  "value": 229713.84375
                },
                {
                  "name": "ZJC0007S0592",
                  "value": 2973.510009765625
                },
                {
                  "name": "ZJC0007S0196",
                  "value": 999942.125
                },
                {
                  "name": "ZJC0007C5419",
                  "value": 15058.25
                },
                {
                  "name": "ZJC0007S1040",
                  "value": 281556.5
                },
                {
                  "name": "ZJC0007S0871",
                  "value": 79653.0
                },
                {
                  "name": "ZJC0007S1443",
                  "value": 4410865.5
                },
                {
                  "name": "IFF0001A1922",
                  "value": 156000.0
                },
                {
                  "name": "ZJC0007S1287",
                  "value": 1839525.75
                },
                {
                  "name": "ZJC0007C0929",
                  "value": 10164.5400390625
                },
                {
                  "name": "ZJC0007S1044",
                  "value": 495330.65625
                },
                {
                  "name": "ZJC0007S0512",
                  "value": 660.1699829101563
                },
                {
                  "name": "ZJC0007S0875",
                  "value": 86480.2578125
                },
                {
                  "name": "ZJC0007S0996",
                  "value": 2098980.0
                },
                {
                  "name": "ZJC0007S1447",
                  "value": 1962356.25
                },
                {
                  "name": "ZJC0007S0511",
                  "value": 1067408.0
                },
                {
                  "name": "ZJC0007S1323",
                  "value": 1091188.375
                },
                {
                  "name": "ZJC0007S1048",
                  "value": 516196.0625
                },
                {
                  "name": "ZJC0007S1606",
                  "value": 4632.60009765625
                },
                {
                  "name": "ZJC0007S1607",
                  "value": 6.320000171661377
                },
                {
                  "name": "ZJC0007C4035",
                  "value": 33451.76953125
                },
                {
                  "name": "ZJC0007C5084",
                  "value": 38457.078125
                },
                {
                  "name": "ZJC0007C3581",
                  "value": 4426.8701171875
                },
                {
                  "name": "ZJC0007C5120",
                  "value": 881.3699951171875
                },
                {
                  "name": "ZJC0007S0638",
                  "value": 1041707.0
                },
                {
                  "name": "ZJC0007C4313",
                  "value": 363.0
                },
                {
                  "name": "ZJC0007C3740",
                  "value": 195987.515625
                },
                {
                  "name": "ZJC0007C3900",
                  "value": 14730.0
                },
                {
                  "name": "ZJC0007C4713",
                  "value": 234.30999755859376
                },
                {
                  "name": "ZJC0007C3623",
                  "value": 496.05999755859377
                },
                {
                  "name": "ZJC0007S1291",
                  "value": 75201.359375
                },
                {
                  "name": "ZJC0007S1610",
                  "value": 71801.3515625
                },
                {
                  "name": "ZJC0007S0088",
                  "value": 2779.5400390625
                },
                {
                  "name": "IFF0001A1774",
                  "value": 107280.0
                }
              ],
              "name": "FSSD LINE",
              "value": 52317420.33893442
            },
            {
              "children": [
                {
                  "name": "ZJPL026C0016",
                  "value": 2446.52001953125
                },
                {
                  "name": "ZJPL026C0019",
                  "value": 1965.5
                },
                {
                  "name": "ZJC0007S0892",
                  "value": 951.1799926757813
                },
                {
                  "name": "ZJPL026C0015",
                  "value": 754.6799926757813
                }
              ],
              "name": "ESSD LINE",
              "value": 6117.8800048828129
            },
            {
              "children": [
                {
                  "name": "ZJP0006S0095",
                  "value": 941280.0
                },
                {
                  "name": "ZJP0006S0050",
                  "value": 53662.5
                },
                {
                  "name": "ZJP0006C0106",
                  "value": 1188221.4375
                },
                {
                  "name": "ZJP0006S0096",
                  "value": 116520.0
                },
                {
                  "name": "ZJP0006S0054",
                  "value": 105825.0
                },
                {
                  "name": "ZJP0006S0098",
                  "value": 1033632.0
                },
                {
                  "name": "ZJP0006S0057",
                  "value": 141480.0
                },
                {
                  "name": "ZJP0006C0102",
                  "value": 1335262.5
                },
                {
                  "name": "ZJP0006S0012",
                  "value": 967346.75
                },
                {
                  "name": "ZJP0006S0091",
                  "value": 108928.4375
                },
                {
                  "name": "ZJP0003C0004",
                  "value": 313452.0
                },
                {
                  "name": "ZJC0003S0067",
                  "value": 58.650001525878909
                },
                {
                  "name": "ZJP0006S0092",
                  "value": 28416.83984375
                },
                {
                  "name": "ZJC0006S0046",
                  "value": 585.52001953125
                },
                {
                  "name": "ZJC0006S0040",
                  "value": 17600.0
                },
                {
                  "name": "ZJP0006C0111",
                  "value": 229392.0
                },
                {
                  "name": "ZJP0006S0058",
                  "value": 221692.5
                },
                {
                  "name": "ZJP0006C0110",
                  "value": 186256.9453125
                },
                {
                  "name": "ZJP0006S0062",
                  "value": 105300.0
                },
                {
                  "name": "ZJP0006S0061",
                  "value": 30000.0
                },
                {
                  "name": "ZJP0006C0136",
                  "value": 87265.078125
                },
                {
                  "name": "ZJP0006S0101",
                  "value": 75000.0
                },
                {
                  "name": "ZJP0006S0100",
                  "value": 150000.0
                },
                {
                  "name": "ZJP0004S0001",
                  "value": 38513.7109375
                },
                {
                  "name": "ZJC0006S0059",
                  "value": 288.0
                },
                {
                  "name": "ZJC0006S0057",
                  "value": 168.0
                },
                {
                  "name": "ZJP0006C0101",
                  "value": 762795.0
                },
                {
                  "name": "ZJP0006S0075",
                  "value": 7327504.5
                },
                {
                  "name": "ZJP0006S0074",
                  "value": 5609806.5
                },
                {
                  "name": "ZJP0006C0128",
                  "value": 167043.59375
                },
                {
                  "name": "ZJP0006S0077",
                  "value": 16031.8798828125
                },
                {
                  "name": "ZJP0006C0127",
                  "value": 147600.0
                },
                {
                  "name": "ZJP0006S0076",
                  "value": 34560.0
                },
                {
                  "name": "ZJP0006C0005",
                  "value": 21600.0
                },
                {
                  "name": "ZJP0006S0079",
                  "value": 564533.5625
                },
                {
                  "name": "ZJP0006S0078",
                  "value": 948258.625
                },
                {
                  "name": "ZJP0006S0071",
                  "value": 1075365.75
                },
                {
                  "name": "ZJC0006S0018",
                  "value": 792.3599853515625
                },
                {
                  "name": "ZJC0004C0225",
                  "value": 7146.4599609375
                },
                {
                  "name": "ZJC0003A3230",
                  "value": 9478.7001953125
                },
                {
                  "name": "ZJP0006C0055",
                  "value": 260369.6484375
                },
                {
                  "name": "ZJP0006C0054",
                  "value": 191107.796875
                },
                {
                  "name": "ZJP0006C0052",
                  "value": 34958.16015625
                },
                {
                  "name": "ZJP0006S0084",
                  "value": 1821805.625
                },
                {
                  "name": "ZJP0006S0083",
                  "value": 142500.0
                },
                {
                  "name": "ZJP0006C0117",
                  "value": 66647.703125
                },
                {
                  "name": "ZJP0006S0044",
                  "value": 895339.5
                },
                {
                  "name": "ZJP0006S0088",
                  "value": 545702.390625
                },
                {
                  "name": "ZJP0006C0114",
                  "value": 20671.6796875
                },
                {
                  "name": "ZJC0006S0107",
                  "value": 3805.4599609375
                },
                {
                  "name": "ZJC0003S0078",
                  "value": 7026.10009765625
                },
                {
                  "name": "ZJP0006S0082",
                  "value": 135000.0
                },
                {
                  "name": "ZJP0006S0081",
                  "value": 16031.8798828125
                },
                {
                  "name": "ZJC0006S0037",
                  "value": 2086829.875
                },
                {
                  "name": "ZJP0006S0048",
                  "value": 28395.0
                }
              ],
              "name": "USB LINE",
              "value": 30424855.619361879
            },
            {
              "children": [
                {
                  "name": "IFF0001A1734",
                  "value": 57600.0
                },
                {
                  "name": "IFF0001A1732",
                  "value": 59400.0
                }
              ],
              "name": "FLASH LINE",
              "value": 117000.0
            }
          ],
          "name": "EMG",
          "value": 263500266.72931863
        }
      ],
      upperLabel: {
        show: true,
        height: 30
      },
      levels: getLevelOption(),
    }
  ]
};


function getLevelOption() {
  return [
    {
      itemStyle: {
        borderColor: '#777',
        borderWidth: 0,
        gapWidth: 1
      },
      upperLabel: {
        show: true
      }
    },
    {
      itemStyle: {
        borderColor: '#555',
        borderWidth: 5,
        gapWidth: 1
      },
      emphasis: {
        itemStyle: {
          borderColor: '#ddd'
        }
      }
    },
    {
      colorSaturation: [0.35, 0.5],
      itemStyle: {
        borderWidth: 5,
        gapWidth: 1,
        borderColorSaturation: 0.6
      }
    }
  ];
}


export const  sankeyOptions =  {
  series: {
    type: 'sankey',
    // layout: 'none',
    top: 5,
    bottom: 10,
    emphasis: {
      disabled: true
      // focus: 'adjacency'
    },
    selectedMode: "single",
    select: {
      disabled: false,
      itemStyle: {
        opacity: 1
      }
    },
    itemStyle: {
      opacity: 0.24
    },
    lineStyle: {
      opacity: 0.24
    },
    // data: [
    //   {
    //     name: 'a',
    //     orderIndex: 0,
    //   },
    //   {
    //     name: 'b',
    //     orderIndex: 1,
    //   },
    //   {
    //     name: 'a1',
    //     orderIndex: 2,
    //   },
    //   {
    //     name: 'a2',
    //     orderIndex: 3,
    //   },
    //   {
    //     name: 'b1',
    //     orderIndex: 4,
    //   },
    //   {
    //     name: 'c',
    //     orderIndex: 5,
    //   }
    // ],
    // links: [
    //   {
    //     source: 'a',
    //     target: 'a1',
    //     value: 5
    //   },
    //   {
    //     source: 'a',
    //     target: 'a2',
    //     value: 3
    //   },
    //   {
    //     source: 'b',
    //     target: 'b1',
    //     value: 8
    //   },
    //   {
    //     source: 'a',
    //     target: 'b1',
    //     value: 3
    //   },
    //   {
    //     source: 'b1',
    //     target: 'a1',
    //     value: 1
    //   },
    //   {
    //     source: 'b1',
    //     target: 'c',
    //     value: 2
    //   }
    // ].map((item, index) => {
    //   return {
    //     ...item,
    //     orderIndex: index
    //   }
    // }),
    data: sankeyData.nodes,
    links: sankeyData.links
  }
};