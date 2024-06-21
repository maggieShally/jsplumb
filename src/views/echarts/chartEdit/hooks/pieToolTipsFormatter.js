

import { composeValue } from '../utils.js'

/**
 * @description: 饼图 提示框
 * @param {*} params
 * @return {*}
 */
export default function pieToolTipsFormatter(params) {
  let { seriesName } = params
  let tip = `${seriesName}<br/>`
  const {
    value,
    data: { data },
  } = params
  let valueText = composeValue({ val: value, item: data })
  tip += `<div style="display: flex; justify-content: space-between;"><span style="margin-right: 20px;">${params.marker}${params.name}：</span><span>${valueText}</span></div>`
  return tip
}
