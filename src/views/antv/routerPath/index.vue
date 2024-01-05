<template>
  <div id="graphWrapper"></div>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { Graph, Model } from '@antv/x6'
import { GridLayout } from '@antv/layout'
import { register, getTeleport } from '@antv/x6-vue-shape'
import { Selection } from '@antv/x6-plugin-selection'
import { Transform } from '@antv/x6-plugin-transform'

import NodeCom from './NodeCom.vue'

import { mockData } from './data.js'
import { layout, getChildrenNodesAndEdges, getEdgesByNodeId } from './utils.js'

// 边的颜色
const lineStyle = {
  defaultColor: '#A2B1C3',
  activeColor: '#DB7093'
}

export default {
  name: 'RouterPath',
  components: {
  },
  setup() {

    let graph

    const state = reactive({
      allData: mockData
    })

    // 创建边
    const createEdge = item => {
      console.log(item)
      let line = {
        stroke: lineStyle.defaultColor,
        strokeWidth: 2,
      }
      if (item.lineType === 'dashed') {
        line.strokeDasharray = '10 10'
      }
      return {
        target: item.targetId,
        source: item.sourceId,
        data: item,
        connector: { name: 'normal' },
        attrs: {
          line,
        },
      }
    }

    const resistNode = () => {
      register({
        shape: 'NodeCom',
        width: 200,
        height: 150,
        component: {
          template: `<NodeCom :data="allData" @onNext='handleShowNext' @onPre='handleShowPre' @onHightLight='handleHightLightRoute' />`,
          components: {
            NodeCom
          },
          setup() {

            const allData = state.allData

            // 取消高亮状态
            const resetHightLight = () => {
              const nodes = graph.getNodes()
              const edges = graph.getEdges()
              for (let node of nodes) {
                node.setData({ isChecked: false })
              }
              for (let edge of edges) {
                edge.setAttrs({
                  line: {
                    stroke: lineStyle.defaultColor
                  }
                })
              }
            }

            // 上一层
            const handleShowPre = node => {
              const { parentNodeId } = node.data

              const { nodeList } = allData
              const nodes = graph.getNodes().filter(i => i.data.parentNodeId === parentNodeId)

              // 删除 同级 节点与边
              for (let item of nodes) {
                const originEdges = graph.getConnectedEdges(item)
                graph.removeCells(originEdges)
                graph.removeNode(item)
              }

              // 添加父节点 与 边
              const parentNode = nodeList.find(i => i.nodeId === parentNodeId)
              const parentEdges = getEdgesByNodeId(parentNodeId, allData, graph)

              graph.addNode({
                id: parentNode.nodeId,
                data: {
                  ...parentNode,
                  index: node.data.index
                },
                shape: 'NodeCom'
              })

              for (let item of parentEdges) {
                graph.addEdge(createEdge(item))
              }
              layout(graph)
              resetHightLight()
            }

            // 展开下一层
            const handleShowNext = node => {
              
              // 获取要添加的 子节点 与 边
              const { nodes, edges } = getChildrenNodesAndEdges(node, allData, graph)

              // 删除 节点 相边的边与 本节点
              const originEdges = graph.getConnectedEdges(node)
              graph.removeCells(originEdges)
              graph.removeNode(node)

              // 添加子节点与边
              for (let item of nodes) {
                graph.addNode({
                  shape: 'NodeCom',
                  id: item.nodeId,
                  data: {
                    ...item,
                    index: node.data.index
                  },
                })
              }

              for (let item of edges) {
                graph.addEdge(createEdge(item))
              }
              layout(graph)
              resetHightLight()
            }

            // 高亮路径
            const handleHightLightRoute = node => {
              const { isSelected } = node.data

              const allNodes = graph.getNodes()
              const allEdges = graph.getEdges()
              // 前续节点
              const preNodes = graph.getPredecessors(node)
              // 后续节点
              const nextNodes = graph.getSuccessors(node)

              const hightLightIds = [...preNodes, ...nextNodes, node].map(i => i.id)
              allNodes.forEach(itemNode => {
                const isChecked = hightLightIds.includes(itemNode.id)
                itemNode.setData({
                  isChecked: isSelected ? false : isChecked,
                  isSelected: !isSelected && node.id === itemNode.id ? true : false
                })
              })

              allEdges.forEach(edge => {
                const targetId = edge.target.cell
                const sourceId = edge.source.cell
                let color = lineStyle.defaultColor
                if ([targetId, sourceId].every(i => hightLightIds.includes(i))) {
                  color = lineStyle.activeColor
                }
                edge.setAttrs({
                  line: {
                    stroke: isSelected ? lineStyle.defaultColor : color,
                  }
                })
              })
            }

            return {
              allData,
              handleShowNext,
              handleShowPre,
              handleHightLightRoute
            }
          }
        }
      })
    }

    const initGraph = () => {
      graph = new Graph({
        container: document.getElementById('graphWrapper'),
        width: 5200,
        height: 700,
        grid: true,
        scroller: true,
        autoResize: true,
        panning: true,
        mousewheel: true,
      })

      graph.use(
        new Transform({
          resizing: {
            enabled: true
          },
        }),
      )

      // 节点点击
      graph.on('node:click', ({ e, x, y, node, view }) => {
        console.log({ e, x, y, node, view })
        // const { isSelected } = node.data
        // // isSelected && graph.unselect(node)
      })

      // 移动节点 处理节点 zIndex (移动的永远在最上层)
      graph.on('node:move', ({ e, x, y, node, view }) => {
        console.log({ e, x, y, node, view })
        node.toFront()
      })

      // 边点击
      graph.on('edge:click', ({ e, x, y, edge, view }) => {
        console.log(edge)
        const { isSelected } = edge.data
        edge.setData({ isSelected: !isSelected })
        edge.setAttrs({
          line: {
            stroke: isSelected ? lineStyle.defaultColor : lineStyle.activeColor
          }
        })
      })

    }

    const initData = () => {
      const { allData } = state
      const levelNode = allData.nodeList.filter(i => i.level === 1)
      let nodeIds = levelNode.map(i => i.nodeId)
      let levelEdge = []
      allData.edgesList.forEach(item => {
        if ([item.targetId, item.sourceId].every(i => nodeIds.includes(i)) && (item.targetId !== item.sourceId)) {
          if (!levelEdge.find(i => i.targetId === item.targetId && i.sourceId === item.sourceId)) {
            levelEdge.push(item)
          }
        }
      })
      const data = {
        nodes: levelNode.sort((a, b) => a.sort - b.sort).map((item, index) => {
          return {
            id: item.nodeId,
            data: {
              ...item,
              index
            },
            shape: 'NodeCom'
          }
        }),
        edges: levelEdge.map(item => createEdge(item))
      }
      console.log(data)
      graph.fromJSON(data)
      layout(graph)
    }

    onMounted(() => {
      resistNode()
      initGraph()
      initData()
    })

    return {
    }


  }
}
</script>

<style lang="less" scoped>
#graphWrapper {
  width: 100%;
  height: 700px;
}
</style>