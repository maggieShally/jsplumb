


const isToolsShowConfig = {
  itemStyle: {
    opacity: 0,
  },
  lineStyle: {
    opacity: 0,
  },
}


/**
 * @description: 计算 常规图表 seriesData 常规数据
 * @param {*} dimensionFields
 * @param {*} quotaFields
 * @param {*} data
 * @param {*} chartType
 * @return {*}
 */
export default function getNormalSeriesData({ dimensionFields, quotaFields, data, chartType }) {
  const { headList, dataList } = data
  const categoryData = [],
    dimensionLen = dimensionFields.length

  for (let i = dimensionLen - 1; i >= 0; i--) {
    let item = dimensionFields[i]
    let data = new Map()
    dataList.forEach(d => {
      let name = d[item.id]
      if (i === dimensionLen - 1) {
        name = dimensionFields.map(i => d[i.id]).join('_')
      }
      data.set(name, (data.get(name) ?? 0) + 1)
    })
    categoryData.push(data)
  }

  // 显示指标数据
  const seriesData = quotaFields.map(item => {
    let temp = {
      name: item.name || item.cnName,
      type: chartType,
      yAxisIndex: item.doubleYAxis ? 1 : 0,
      data: dataList.map((d, index) => {
        return {
          value: Number(d[item.id]),
          preTitle: dimensionFields
            .map(dimensionItem => {
              return dataList[index][dimensionItem.id]
            })
            .join('_'),
          data: item,
        }
      }),
    }

    if (item.isToolsShow) {
      temp = {
        ...temp,
        ...isToolsShowConfig,
      }
    }
    return temp
  })
  

  // X轴数据
  const getCategoryData = ({ position }, originOptions) => {
    console.log(originOptions)
    if(!categoryData.length) {
      return [{
        type: 'category',
        axisLabel: {
          show: true,
          fontSize: 12,
          width: ''
        }
      }]
    }
    return categoryData.map((item, index, arr) => {
      const data = [...item.keys()]
      return {
        type: 'category',
        position,
        axisLabel: {
          ...originOptions.xAxis[index]?.axisLabel,
          margin: 20 * (index + 1),
          formatter: value => {
            return value.split('_').at(-1)
          },
        },
        axisTick: {
          length: 30 * (index + 1),
          interval: function (index, value) {
            //   console.log(index, value)
          },
        },
        data,
      }
    })
  }
  return {
    getCategoryData,
    seriesData,
  }
}
