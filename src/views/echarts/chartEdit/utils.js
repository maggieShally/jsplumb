/*
 * @Description:
 * @Date: 2024-01-18 14:31:36
 * @LastEditTime: 2025-02-06 17:29:27
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\utils.js
 */

import { uuid } from '@/utils'
import lodash from 'lodash'

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
    // return val / 1e3 + 'K'
    return val + 'K'
  },
  tenThousands: val => {
    // return val / 1e4 + 'W'
    return val + 'W'
  },
  million: val => {
    // return val / 1e6 + 'M'
    return val + 'M'
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
    val: item.scale ? lodash.ceil(val, item.scale) : val,
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
  if(element.aliasName) return element
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
  if(element.aliasName) return element
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



// 处理传到后台的字段 fields 字段
export const getFieldList = ({dimensionFields, quotaFields, drillList }) => {
  debugger
  return [...dimensionFields, ...drillList, ...quotaFields].reduce((res, item)=> {
    const { cnName: cnViewName, enName: enViewName, dataType, id, type, from } = item
    const { cnName, enName, columnId } = item?.originData || {}
    debugger
    if(res.findIndex(i => i.columnId === item.field) === -1) {
      res.push({
        cnViewName,
        enViewName,
        cnName,
        enName,
        dataType,
        columnId,
        field: id,
        id,
        from,
        type
      })
    } 
    return res
  }, [])
}


// 条件
export const getDataSetCondList = (data, activeDrillFieldList, headList) => {
  debugger
  return data.map((item, index) => {
    const { name } = item
    const activeItem = activeDrillFieldList[index]
    return {
      id: headList.find(i => i.cnName === activeItem.cnName)?.id,
      field: activeItem.field, // 维度id
      "operation": "=",
      "condValue": name?.split('_').at(-1),
      "valueFormat": null,
      "sort": 0
    }
  })
  
}


// 维度
export const getDimensionFields = (dimensionField, activeDrillFieldList) => {
  return [...dimensionField, ...activeDrillFieldList].reduce((res, item)=> {
    if(res.findIndex(i => i.field === item.field) === -1) {
      res.push(item)
    } 
    return res
  }, [])
  
}