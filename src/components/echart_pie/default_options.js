/*
 * @Description:
 * @Date: 2021-08-04 15:09:11
 * @LastEditTime: 2021-08-04 16:44:13
 * @FilePath: \jsplumb-test\src\components\echart_pie\default_options.js
 */
const BASIC_OPTION = {
  title: {
    text: '某某水果数据',
    subtext: '来自xx公司',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: []
}

export { BASIC_OPTION }
