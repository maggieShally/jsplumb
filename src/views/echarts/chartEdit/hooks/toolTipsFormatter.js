


import { composeValue } from '../utils.js'

/**
 * @description: 常规 提示
 * @param {*} params
 * @return {*}
 */
export default function toolTipsFormatter(params) {
  let { name } = params[0]
  let tip = `${name}<br/>`
  params.forEach(item => {
    const {
      value,
      data: { data },
    } = item
    let valueText = composeValue({ val: value, item: data })
    tip += `<div style="display: flex; justify-content: space-between;"><span style="margin-right: 20px;">${item.marker}${item.seriesName}：</span><span>${valueText}</span></div>`
  })
  return tip
}