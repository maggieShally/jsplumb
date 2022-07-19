/*
 * @Description:
 * @Date: 2022-07-13 15:12:40
 * @LastEditTime: 2022-07-15 09:39:14
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\nodeTree\utils.js
 */
const calcChildrenIds = data => {
  const result = []
  calc(data, result)
  return result
  function calc(data, result) {
    for (let item of data) {
      result.push(item.id)

      if (item.childrenList?.length) {
        calc(item.childrenList, result)
      }
    }
  }
}

const getRandomPosition = ({ nodeX, nodeY }, graph) => {
  //e--当前节点对象   graph--G6.Graph对象
  //生成的坐标点
  let X = 0
  let Y = 0
  //获取半径
  let R = graph.cfg.layout.linkDistance
  if (R == undefined) {
    R = 50
  }

  let Cx = parseInt(nodeX)
  let Cy = parseInt(nodeY)

  //随机横坐标
  let Rx = parseInt(Math.floor(Math.random() * R * 2) + 1 - R)
  //1- 一二象限 2-三四象限
  let qd = Math.floor(Math.random() * 2) + 1

  if (qd == 1) {
    X = Cx + Rx
    Y = Cy - parseInt(Math.sqrt(R * R - Rx * Rx))
  } else {
    X = Cx + Rx
    Y = Cy + parseInt(Math.sqrt(R * R - Rx * Rx))
  }

  return {
    x: X,
    y: Y
  }
}

export { calcChildrenIds, getRandomPosition }
