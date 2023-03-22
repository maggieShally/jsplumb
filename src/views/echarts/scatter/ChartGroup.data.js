/*
 * @Description:
 * @Date: 2022-04-28 11:17:45
 * @LastEditTime: 2022-07-14 15:58:19
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\scatter\ChartGroup.data.js
 */

export const options1 = {
  legend: {},
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['2012','2013','2014','2015', '2016']
  },
  yAxis: {
    type: 'value'
  },
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  grid: {
    top: '55%'
  },
  series: [
    {
      type: 'line',
      smooth: true,
      // seriesLayoutBy: 'row',
      emphasis: { focus: 'series' },
      name: '一月',
      data: [41.1, 30.4, 65.1, 53.3, 83.8, 98.7]
    },
    {
      type: 'line',
      smooth: true,
      // seriesLayoutBy: 'row',
      emphasis: { focus: 'series' },
      name: '二月',
      data: [86.5, 92.1, 85.7, 83.1, 73.4, 55.1]
    },
    {
      type: 'line',
      smooth: true,
      // seriesLayoutBy: 'row',
      emphasis: { focus: 'series' },
      name: '三月',
      data: [24.1, 67.2, 79.5, 86.4, 65.2, 82.5]
    },
    {
      type: 'line',
      smooth: true,
      // seriesLayoutBy: 'row',
      emphasis: { focus: 'series' },
      name: '四月',
      data: [55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
    },
    // {
    //   type: 'pie',
    //   id: 'pie',
    //   radius: '30%',
    //   center: ['50%', '25%'],
    //   emphasis: {
    //     focus: 'self'
    //   },
    //   label: {
    //     formatter: '{b}: {@2012} ({d}%)'
    //   },
    //   encode: {
    //     itemName: 'product',
    //     value: '2012',
    //     tooltip: '2012'
    //   }
    // }
  ]
}

export const options2 = {
  legend: {},
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
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
      }
    },
    {
      data: [320, 100, 250, 380, 470, 210, 430],
      type: 'bar',
      name: '二月',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    },
    {
      data: [720, 140, 450, 320, 520, 510, 230],
      type: 'bar',
      name: '三月',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    },
    {
      data: [350, 200, 450, 280, 170, 310, 450],
      type: 'bar',
      name: '四月',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
}
