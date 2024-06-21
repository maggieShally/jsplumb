


/**
 * @description: 饼图 矩阵 数据计算
 * @param {*} dimensionFields
 * @param {*} quotaFields
 * @param {*} data
 * @param {*} chartType
 * @return {*}
 */
export default function getPieAndTreeMapSeriesData({dimensionFields,quotaFields,data, chartType }) {
  const { headList, dataList } = data
  const valueKey = quotaFields[0]?.id
  const seriesData = {
    type: chartType,
    name: dimensionFields.map(i => i.cnName).join('_'),
    data: dataList.map(item => {
      return {
        name: dimensionFields.map(i => item[i.id]).join('_'),
        value: item[valueKey],
      }
    }),
  }

  return {
    seriesData,
  }
}
