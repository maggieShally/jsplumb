/**
 * @description: 根据指标获取 legend 数据
 * @param {*} quotaFields
 * @return {*}
 */

export default function getLegendData(quotaFields) {
  return quotaFields
    .filter(i => !i.isToolsShow)
    .map(item => item.name || item.cnName)
}
