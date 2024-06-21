/*
 * @Description:
 * @Date: 2024-01-17 18:04:08
 * @LastEditTime: 2024-05-21 17:10:54
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\options\base.option.js
 */
export default function getBaseOption() {
  return {
    title: {
      text: '标题',
      show: true,
      left: 'auto',
      textStyle: {
        fontSize: 18,
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      show: true,
      type: 'plain',
      left: 'center',
      textStyle: {
        fontSize: 12,
      },
      top: '5%',
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        axisLabel: {
          show: true,
          fontSize: 12,
          width: '',
        },
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
      },
    ],
  }
}
