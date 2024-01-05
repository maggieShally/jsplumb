// 一行的节点个数
const getColumns = len => {
  if (len < 5) return 1
  if (len < 15) return 3
  if (len < 30) return 4
  return 5
}

// 获取 每组起始 X位置
const getCombineSortXPos = nodes => {
  let combineSort = new Array(9).fill(0)
  // 每组 节点个数
  let lengthArr = new Array(9).fill(0)
  for (let i = 0; i < combineSort.length; i++) {
    const allData = nodes.filter(n => n.data.sort === i)
    let len = allData.length
    lengthArr[i] = len
    if (i === 0) {
      combineSort[i] = getColumns(len) * nodeWidth
    } else {
      combineSort[i] =
        combineSort[i - 1] +
        (len ? getColumns(len) * nodeWidth + GroupSpace : 0)
    }
  }
  return {
    combineSort,
    lengthArr
  }
}

const nodeWidth = 220,
  nodeHeight = 180,
  GroupSpace = 170

// 布局计算节点位置
export function layout(graph) {
  let nodes = graph.getNodes()
  let edges = graph.getEdges()

  const { combineSort, lengthArr } = getCombineSortXPos(nodes)
  const maxLen = Math.max.apply(null, lengthArr)

  for (let i = 0; i < 9; i++) {
    let sort = i
    const allData = nodes
      .filter(node => node.data.sort === sort)
      .sort((a, b) => a.data.index - b.data.index)

    allData.forEach((item, index) => {
      const columns = getColumns(allData.length)
      const x =
        combineSort[sort - 1] + (index % columns) * nodeWidth + GroupSpace

      // 根据行最多的组为参照，计算 Y 起始位置 (节点相对居中显示)
      const startY =
        ((Math.ceil(maxLen / getColumns(maxLen)) -
          Math.ceil(lengthArr[sort] / getColumns(lengthArr[sort]))) /
          2) *
        nodeHeight
        
      const y = startY + Math.floor(index / columns) * nodeHeight
      item.position(x, y)
      item.setData({ index })
    })
  }
}

// 获取 子节点及子节点边
export const getChildrenNodesAndEdges = (node, allData, graph) => {
  const { sort, level, nodeId } = node.data
  const { edgesList, nodeList } = allData
  const nodes = nodeList.filter(item => {
    return (
      item.level === level + 1 &&
      item.sort === sort &&
      item.parentNodeId === nodeId
    )
  })
  if (!nodes.length) return false

  const allNodeIds = nodes.map(i => i.nodeId)
  const allShowNodesIds = graph
    .getNodes()
    .map(i => i.id)
    .concat(allNodeIds)

  let edges = edgesList
    .filter(edge => {
      const { targetId, sourceId } = edge
      return (
        targetId !== nodeId &&
        sourceId !== nodeId &&
        targetId !== sourceId &&
        [targetId, sourceId].some(i => allNodeIds.includes(i)) &&
        [targetId, sourceId].every(i => allShowNodesIds.includes(i))
      )
    })
    .map(i => i.sourceId + ' ' + i.targetId + ' ' + i.lineType)

  edges = Array.from(new Set(edges)).map(i => {
    const [sourceId, targetId, lineType] = i.split(' ')
    return {
      sourceId,
      targetId,
      lineType
    }
  })

  return {
    nodes,
    edges
  }
}

// 获取 兄弟节点
export const getNeighborNode = (node, allData, graph) => {
  return allData.nodeList.filter(
    i => i.data.parentNodeId === node.data.parentNodeId
  )
}

// 获取 节点的输入输出边
export const getEdgesByNodeId = (nodeId, allData, graph) => {
  const { nodeList, edgesList } = allData
  const showNodesIds = graph.getNodes().map(i => i.id)
  let edges = edgesList
    .filter(edge => {
      const { targetId, sourceId } = edge
      return (
        [targetId, sourceId].some(i => i === nodeId) &&
        [targetId, sourceId].every(i =>
          [...showNodesIds, nodeId].includes(i)
        ) &&
        targetId !== sourceId
      )
    })
    .map(i => i.sourceId + ' ' + i.targetId + ' ' + i.lineType)

  edges = Array.from(new Set(edges)).map(i => {
    const [sourceId, targetId, lineType] = i.split(' ')
    return {
      sourceId,
      targetId,
      lineType
    }
  })

  return edges
}
