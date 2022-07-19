/*
 * @Description:
 * @Date: 2022-07-04 10:18:10
 * @LastEditTime: 2022-07-04 11:34:50
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\utils.js
 */
export const rendTree = arr => {
  const result = []
  const itemMap = {}

  for (const item of arr) {
    itemMap[item.id] = { ...item, children: [] }
  }

  for (const item of arr) {
    const { id, pid } = item
    const treeItem = itemMap[id]
    if (pid === 0) {
      result.push(treeItem)
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: []
        }
      } else {
        itemMap[pid].children.push(treeItem)
      }
    }
  }

  result.forEach(item => {
   
    updateScore(item, item.children.length)
  })

  return result
}

function updateScore(n, count) {
  n.parentCount ??= count

  n.children.forEach(function(c) {
    updateScore(c, c.children.length)
    n.parentCount += c.parentCount

   
  })
}
