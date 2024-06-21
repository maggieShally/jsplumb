import toolTipsFormatter from './toolTipsFormatter.js'
import pieToolTipsFormatter from './pieToolTipsFormatter.js'

/**
 * @description: 根据图表类获取提示
 * @param {*} chartTyp
 * @return {*}
 */
export default function getToolTips(chartTyp) {
  return {
    trigger: ['pie'].includes(chartTyp) ? 'item' : 'axis',
    formatter: ['pie'].includes(chartTyp)
      ? pieToolTipsFormatter
      : toolTipsFormatter,
  }
}
