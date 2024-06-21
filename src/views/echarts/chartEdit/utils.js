/*
 * @Description:
 * @Date: 2024-01-18 14:31:36
 * @LastEditTime: 2024-05-22 10:25:04
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\utils.js
 */

import { uuid } from '@/utils'

// 样式转换 为 charts的格式
export const convertVal = val => {
  val.title[`${val.title.position}`] = 'auto'
}

// 组合函数
export const compose = (...arg) => {
  const funs = Array.prototype.slice.apply(arg)
  return funs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  )
}

// 单位数据处理
const unitFormatFunc = {
  thousands: val => {
    return val / 1e3 + 'K'
  },
  tenThousands: val => {
    return val / 1e4 + 'W'
  },
  million: val => {
    return val / 1e6 + 'M'
  },
  percent: val => val + '%',
}

/**
 * @description: 加单位
 * @param {*} val
 * @param {*} unit
 * @return {*}
 */
export const unitFunc = ({ val, item = {} }) => {
  if (item.unit) {
    return unitFormatFunc[item.unit](val)
  }
  return val
}

// 格式化
export const thousandsFunc = ({ val, item = {} }) => {
  return {
    val: item.format === 'thousands' ? val.toLocaleString() : val,
    item,
  }
}

/**
 * @description: 小数位
 * @param {*} val
 * @return {*}
 */
export const scaleFuc = ({ val, item = {} }) => {
  return {
    val: item.scale ? val.toFixed(item.scale) : val,
    item,
  }
}

// 组合处理 值操作（小数位，格试化，单位）
export const composeValue = compose(unitFunc, thousandsFunc, scaleFuc)

/**
 * @description: 转换选中维度字段
 * @param {*} element
 * @return {*}
 */
export const calcDimensionField = element => {
  if(element.id) return element
  const { columnId, cnName, enName, dataType, from, type } = element
  let key = uuid()
  return {
    id: key,
    aliasName: key,
    field: columnId,
    extraJson: '',
    dimensionType: 'row',
    scale: '',
    format: '',
    unit: '',
    sort: '',
    isTotal: '',
    name: cnName,
    cnName,
    enName,
    dataType,
    from,
    type,
    originData: element
  }
}


/**
 * @description: 转换选中指标字段
 * @param {*} element
 * @return {*}
 */
export const calcQuotaField = element => {
  if(element.id) return element
  const { columnId, cnName,enName, dataType, from , type} = element
  let key = uuid()
  return {
    id: key,
    aliasName: key,
    aggregate: 'sum',
    field: columnId,
    extraJson: '',
    scale: 2,
    format: '',
    unit: '',
    sort: '',
    top: '',
    isTotal: 'N',
    totalFormula: '',
    name: cnName,
    cnName, 
    enName, 
    dataType,
    from,
    type,
    originData: element
  }
}
