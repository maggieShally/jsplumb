import { GridLayout, DagreLayout } from '@antv/layout'
import { getColumns } from './utils.js'
import { processConfig } from '../config.js'

import { useCreateNodeAndEdge } from './useCreateNodeAndEdge.js'

// 让节点居中
const normalizeNodePosition = nodes => {
  nodes.forEach(node => {
    node.x -= (node.width || 120) / 2
    node.y -= (node.height || 120) / 2
  })
}

// 第一层 layout，的DagreLayout方法， 因为节点宽度不一至，所以动态跟据宽度返回 节点间距
const dagreLayout = new DagreLayout({
  rankdir: 'LR', // 可选，默认为图的中心
  controlPoints: true, // 可选
  ranksepFunc: node => {
    // process层节点间距
    return 80 * (node.width / 180)
  },
})

export const useNormalLayout = (state) => {
  const { createNode, createEdge } = useCreateNodeAndEdge(state.idKey)

  // 第一层 dragLayout 布局,计算出现在的节点组 按过程排序的节点（用户最外层布局）
  const initProcessData = showNodes => {
    const {
      dataList: { nodeList, edgesList },
    } = state

    const activeProcessGroup = Array.from(
      new Set(nodeList.map(i => i.processId))
    )

    const processSortNodes = []
    processConfig.forEach(i => {
      if (activeProcessGroup.includes(i.key)) {
        processSortNodes.push(i.key)
      }
    })

    let processEdges = []
    for (let i = 0; i < processSortNodes.length - 1; i++) {
      processEdges.push({
        source: processSortNodes[i],
        target: processSortNodes[i + 1],
      })
    }

    const processNodes = processSortNodes.map(i => {
      const processShowNodes = showNodes.filter(n => n.processId === i)
      const len = processShowNodes.length
      return {
        shape: 'rect',
        nodeId: i,
        id: i,
        data: {
          type: 'process',
        },
        label: '', //processConfig.find(p => p.key === i)?.label,
        width: getColumns(len) * 150,
        height: Math.ceil(len / getColumns(len)) * 160,
        attrs: {
          body: {
            fill: 'transparent',
            stroke: '',
            // fill: '#efdbff',
            stroke: '#9254de',
          },
        },
      }
    })

    // 先排外层节点组
    const firstLayout = dagreLayout.layout({
      nodes: processNodes,
      edges: processEdges.map(item => {
        return {
          ...item,
          data: {
            type: 'process',
          },
          connector: { name: 'smooth' },
          attrs: {
            wrap: {
              'stroke-width': 0,
            },
            line: {
              'stroke-width': 0,
              stroke: 'transparent',
            },
          },
        }
      }),
    })

    //节点局中
    normalizeNodePosition(firstLayout.nodes)

    return {
      firstLayout,
      nodes: processNodes,
      edges: processEdges,
    }
  }

  // 第二层 在第一层的基础上。。gridLayout布局
  const secondGridLayout = (processNodes, showNodes) => {
    const {
      dataList: { nodeList, edgesList },
    } = state
    const secondLayerList = processNodes.map(item => {
      const activeNodes = showNodes.filter(i => i.processId === item.id)
      const currentNodes = processNodes.find(i => i.id === item.id)
      console.log(currentNodes.x, currentNodes.y)
      const gridLayout = new GridLayout({
        type: 'grid',
        width: currentNodes.width,
        height: currentNodes.height,
        begin: [currentNodes.x, currentNodes.y],
      })
      return gridLayout.layout({
        nodes: activeNodes.map((i, index) => {
          return createNode(i.nodeId, i, index)
        }),
        edges: edgesList
          .filter(
            i =>
              showNodes.find(n => n.nodeId === i.sourceId) &&
              showNodes.find(n => n.nodeId === i.targetId)
          )
          .map(e => {
            return createEdge(e)
          }),
      })
    })

    secondLayerList.forEach(nodes => {
      if (nodes.nodes.length > 1) {
        normalizeNodePosition(nodes.nodes)
      }
    })

    return {
      secondLayerList,
    }
  }

  // 布局
  const getNormalLayoutData = showNodes => {
    
    // 外层过程节点组
    const { firstLayout, nodes: processNodes } = initProcessData(showNodes)

    // 第二层用 网格布局
    const { secondLayerList } = secondGridLayout(processNodes, showNodes)

    return {
      nodes: [
        ...firstLayout.nodes,
        ...secondLayerList.map(i => i.nodes).flat(),
      ],
      edges: [
        ...firstLayout.edges,
        ...secondLayerList.map(i => i.edges).flat(),
      ],
    }
  }

  return {
    getNormalLayoutData,
  }
}
