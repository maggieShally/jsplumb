/*
 * @Description:
 * @Date: 2022-03-22 16:44:47
 * @LastEditTime: 2022-03-22 16:46:21
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\x6Panel\layout.js
 */

import dagre from 'dagre'

const layout = (graph, dir = 'LR') => {
  const nodes = graph.getNodes()
  const edges = graph.getEdges()
  const g = new dagre.graphlib.Graph()
  g.setGraph({ rankdir: dir, nodesep: 80, ranksep: 120 })
  g.setDefaultEdgeLabel(() => ({}))

  const width = 300
  const height = 250
  nodes.forEach(node => {
    g.setNode(node.id, { width, height })
  })

  edges.forEach(edge => {
    const source = edge.getSource()
    const target = edge.getTarget()
    g.setEdge(source.cell, target.cell)
  })

  dagre.layout(g)

  graph.freeze()

  g.nodes().forEach(id => {
    const node = graph.getCell(id)
    if (node) {
      const pos = g.node(id)
      node.position(pos.x, pos.y)
    }
  })

  edges.forEach(edge => {
    const source = edge.getSourceNode() ?? {}
    const target = edge.getTargetNode() ?? {}
    const sourceBBox = source.getBBox()
    const targetBBox = target.getBBox()

    if ((dir === 'LR' || dir === 'RL') && sourceBBox.y !== targetBBox.y) {
      const gap =
        dir === 'LR'
          ? targetBBox.x - sourceBBox.x - sourceBBox.width
          : -sourceBBox.x + targetBBox.x + targetBBox.width
      const fix = dir === 'LR' ? sourceBBox.width : 0
      const x = sourceBBox.x + fix + gap / 2
      edge.setVertices([
        { x, y: sourceBBox.center.y },
        { x, y: targetBBox.center.y }
      ])
    } else if (
      (dir === 'TB' || dir === 'BT') &&
      sourceBBox.x !== targetBBox.x
    ) {
      const gap =
        dir === 'TB'
          ? targetBBox.y - sourceBBox.y - sourceBBox.height
          : -sourceBBox.y + targetBBox.y + targetBBox.height
      const fix = dir === 'TB' ? sourceBBox.height : 0
      const y = sourceBBox.y + fix + gap / 2
      edge.setVertices([
        { x: sourceBBox.center.x, y },
        { x: targetBBox.center.x, y }
      ])
    } else {
      edge.setVertices([])
    }
  })

  graph.unfreeze()
}

export default layout
