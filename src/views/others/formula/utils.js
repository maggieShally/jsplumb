

 // 规换{{}}内容
 export function getTemplateInfo(template, data) {
  let resultKey = []

  const templateValue = renderTemplate(template, data)

  return {
    templateValue,
    resultKey: Array.from(new Set(resultKey)).join(','),
  }

  function renderTemplate(template, data) {
    const reg = /\s*\{\{([\w()（）%&#~$——+-x_/\u4e00-\u9fa5\s]+)\}\}\s*/
    if (reg.test(template)) {
      const name = reg.exec(template)[1]
      resultKey.push(data[name])
      template = template.replace(reg, ` ${data[name]} `)
      console.log(template)
      return renderTemplate(template, data)
    }
    return template
  }
}


// 处理同名相同的 加个数字
export function calcFieldList(originFieldList) {
  debugger
  return originFieldList.map((item, index, arr) => {
    const len = arr.slice(0, index + 1).filter(i => i.column === item.column)?.length
    return {
      ...item,
      label: len > 1 ? `${item.column}[${len - 1}]` : item.column,
      value: item.columnId,
    }
  })
}



export function getValueText(val, originFieldList) {
  let tempArr = val.match(/[a-zA-Z0-9]+/g)
  let valueText = val
  tempArr?.forEach(item => {
    const fieldItem = originFieldList.find(i => i.value === item.trim())
    if (fieldItem) {
      valueText = valueText.replace(item, '{{' + fieldItem.label + '}}')
      console.log('item', valueText)
    }
  });
  return valueText
}