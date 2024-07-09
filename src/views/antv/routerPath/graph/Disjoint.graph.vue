<!--
 * @Description: 分离视图 （显示选中的路径）
 * @Date: 2024-04-19 15:08:58
 * @LastEditTime: 2024-07-09 18:27:06
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\routerPath\graph\Disjoint.graph.vue
-->

<template>
  <div class="graphWrapper" :id="`disjoinGraph${idKey}`"></div>
</template>

<script>
import { ref, reactive, toRefs, unref, watch, onMounted, computed } from 'vue'

import lodash from 'lodash'
import { Graph } from '@antv/x6'
import { GridLayout, DagreLayout } from '@antv/layout'
import { register, getTeleport } from '@antv/x6-vue-shape'
import { Selection } from '@antv/x6-plugin-selection'
import { Transform } from '@antv/x6-plugin-transform'


import { layout, getChildrenNodesAndEdges, getEdgesByNodeId } from './utils.js'

import NodeCom from './NodeCom.vue'

import { processEdges, processConfig } from '../config.js'
import { getColumns } from './utils.js'

import { lineStyle } from '../config.js'

import { useCreateNodeAndEdge } from './useCreateNodeAndEdge.js'

import { useNormalLayout } from './useNormalLayout.js'

// // 边的颜色
// const lineStyle = {
//   defaultColor: '#A2B1C3',
//   activeColor: '#DB7093',
//   hiddenColor: 'rgba(162,177,195,.3)'
// }

export default {
  name: 'DisjointGraph',
  components: {
  },
  props: {
    uKey: String,
    isMainGraph: {
      type: Boolean,
      default: false
    },
    data: { // 节点与边数据
      type: Object,
    },
    activeData: { // 分离路径才有的当前点击节点数据
      type: Object,
      default: () => { }
    }
  },
  emits: ['onGetTableData', 'onGetViewData'],
  setup(props, context) {

    // const disjoinGraphRef = ref(null)
    let graph

    const state = reactive({
      dataList: props.data,
      idKey: props.uKey,
      processData: {}, // 当前过程数据
    })

    watch(() => props.data, val => {
      state.dataList = lodash.cloneDeep({ ...val })
      if (props.isMainGraph) {
        initData()
      } else if (props.uKey === 'subView') {
        initDisjointData()
      } else {
        initDisjointPathData()
      }
    })

    const { createNode, createEdge } = useCreateNodeAndEdge(state.idKey)
    const { getNormalLayoutData } = useNormalLayout(state)

    const resistNode = () => {
      register({
        shape: 'NodeCom' + state.idKey,
        width: 120,
        height: 120,
        component: {
          template: `<NodeCom @onNext='handleShowNext' :uKey='uKey' @onPre='handleShowPre' />`,
          components: {
            NodeCom
          },
          setup() {
            const allData = computed(() => state.dataList)
            const uKey = computed(() => props.uKey)

            console.log(props.uKey)

            // 取消高亮状态
            const resetHightLight = () => {
              console.log(props.uKey)
              const nodes = graph.getNodes()
              const edges = graph.getEdges()
              for (let node of nodes) {
                node.setData({
                  isChecked: false,
                  opacity: 1
                })
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
              const { nodeList } = unref(allData)

              const nodes = graph.getNodes().filter(i => i.data.parentNodeId === parentNodeId)

              // 删除 同级 节点与边
              for (let item of nodes) {
                const originEdges = graph.getConnectedEdges(item)
                graph.removeCells(originEdges)
                graph.removeNode(item)
              }

              // 添加父节点 与 边
              const parentNode = nodeList.find(i => i.nodeId === parentNodeId)
              debugger
              const parentEdges = getEdgesByNodeId(parentNodeId, unref(allData), graph)

              graph.addNode(createNode(parentNode.nodeId, parentNode, node.data.index))

              for (let item of parentEdges) {
                graph.addEdge(createEdge(item))
              }
              // layout(graph)
              const showNodes = graph.getNodes().filter(i => i.data.type !== 'process').map(i => i.data)
              graph.fromJSON(getNormalLayoutData(showNodes))

              resetHightLight()
            }

            // 展开下一层
            const handleShowNext = node => {

              // 获取要添加的 子节点 与 边
              const { nodes, edges } = getChildrenNodesAndEdges(node, unref(allData), graph)

              // 删除 节点 相邻的边与 本节点
              const originEdges = graph.getConnectedEdges(node)
              graph.removeCells(originEdges)
              graph.removeNode(node)

              // 添加子节点与边
              for (let item of nodes) {
                graph.addNode(createNode(item.nodeId, item, node.data.index))
              }
              for (let item of edges) {
                graph.addEdge(createEdge(item))
              }

              const showNodes = graph.getNodes().filter(i => i.data.type !== 'process').map(i => i.data)
              graph.fromJSON(getNormalLayoutData(showNodes))
            }

            return {
              uKey,
              handleShowNext,
              handleShowPre,
            }
          }
        }
      })
    }

    const initGraph = () => {
      debugger
      graph = new Graph({
        container: document.getElementById(`disjoinGraph${state.idKey}`),
        width: 'auto',
        height: 400,
        grid: true,
        scroller: true,
        autoResize: true,
        panning: true,
        mousewheel: true,
        filter: ['rect'], // rect类型 不能选中
        interacting: function (cellView) {
          // process 不能移动，选中
          if (cellView.cell.data.type === 'process') {
            return {
              nodeMovable: false,
              edgeMovable: false,
              vertexMovable: false,
            }
          }
          return true
        },
        onEdgeLabelRendered(args) {
          const { selectors, edge } = args
          const content = selectors.foContent
          if (edge.data.isSubPath) {
            const { data: { lineTargetValueList } } = edge
            if (!lineTargetValueList.length) return false
            let str = `<div class="text-label-box" id='${edge.id}' onclick="handleCheck()" >`
            for (let item of lineTargetValueList.filter(i => i.isShow && i.currency === 'RMB')) {
              str += `<div>${item.targetName}(${item.currency})：${item.targetValue}</div>`
            }
            str += `<div><span class="check-link">查详详情</span></div> </div>`
            content.innerHTML = str
            document.getElementById(edge.id).onclick = () => {
              console.log(edge)
            }
          }
        }
      })

      graph.use(
        new Transform({
          resizing: {
            enabled: node => {
              // process 组不允许
              if (node.shape === "rect") {
                return false
              }
              return true
            }
          }
        }),
      )
    }

    // 根据点击节点 获取 底部维度数据
    const getTableData = node => {
      const nodeData = node.getData()
      console.log(nodeData.isChecked)
      let result = []
      const neighborNodes = graph.getNeighbors(node).map(i => {
        return {
          ...i.data
        }
      })
      result = neighborNodes.filter(i => i.sort < nodeData.sort)
      let len = result.length
      if (len === 0) {
        result = [{ ...nodeData }]
        result[0].childrenLevel = neighborNodes.filter(i => i.sort > nodeData.sort)
      } else {
        const lastKey = len - 1
        result[lastKey].childrenLevel = [{ ...nodeData }]
        result[lastKey].childrenLevel[0].childrenLevel = neighborNodes.filter(i => i.sort > nodeData.sort)
      }
      context.emit('onGetTableData', result)
    }

    // 高点路径
    const hightLightNodes = node => {
      const { isSelected } = node.data
      const allNodes = graph.getNodes()
      const allEdges = graph.getEdges()
      // 前续节点
      const preNodes = graph.getPredecessors(node)
      // 后续节点
      const nextNodes = graph.getSuccessors(node)

      let allHightLightNodes = [], allHightLightEdges = []

      const hightLightIds = [...preNodes, ...nextNodes, node].map(i => i.id)
      allNodes.forEach(itemNode => {
        const isChecked = hightLightIds.includes(itemNode.id)
        itemNode.setData({
          isChecked: isSelected ? false : isChecked,
          isSelected: !isSelected && node.id === itemNode.id ? true : false,
          opacity: isSelected ? 1 : isChecked ? 1 : 0.3
        })

        if (isChecked) {
          allHightLightNodes.push(itemNode.getData())
        }
      })

      allEdges.forEach(edge => {
        const targetId = edge.target.cell
        const sourceId = edge.source.cell
        let color = lineStyle.defaultColor
        if ([targetId, sourceId].every(i => hightLightIds.includes(i))) {
          color = lineStyle.activeColor
          allHightLightEdges.push(edge.getData())
        } else {
          color = lineStyle.hiddenColor
        }
        edge.setAttrs({
          line: {
            stroke: isSelected ? lineStyle.defaultColor : color,
          }
        })
      })

      console.log(allHightLightNodes, allHightLightEdges)
      return {
        nodeList: allHightLightNodes,
        edgesList: allHightLightEdges
      }
    }



    // graph点击事件
    const initMethod = () => {
      // 节点点击  高亮路径， 计算 节点详情
      graph.on('node:click', ({ e, x, y, node, view }) => {
        if (node.data.type === 'process') return false
        const hightLightCells = hightLightNodes(node)
        getTableData(node)

        if (props.isMainGraph) {
          console.log(hightLightCells)
          context.emit('onGetViewData', hightLightCells, node.data)
        }
      })

      // 移动节点 处理节点 zIndex (移动的永远在最上层)
      graph.on('node:move', ({ e, x, y, node, view }) => {
        console.log({ e, x, y, node, view })
        node.toFront()
      })

      // 边点击
      graph.on('edge:click', ({ e, x, y, edge, view }) => {
        console.log(edge)
        if (edge.data.type === 'process') return false
        const { isSelected } = edge.data
        edge.setData({ isSelected: !isSelected })
        edge.setAttrs({
          line: {
            stroke: isSelected ? lineStyle.defaultColor : lineStyle.activeColor
          }
        })
      })

      // 画布空白地点击(清除高亮和选中)
      graph.on('blank:click', ({ e, x, y }) => {
        const allNodes = graph.getNodes()
        const allEdges = graph.getEdges()

        allNodes.forEach(itemNode => {
          itemNode.setData({
            isChecked: false,
            isSelected: false,
            opacity: 1
          })
        })

        allEdges.forEach(edge => {
          if (edge.data.type === 'process') return false
          edge.setAttrs({
            line: {
              stroke: lineStyle.defaultColor,
            }
          })
        })
      })
    }

    // 显示SKU层
    const handleShowSku = level => {
      const { nodeList } = state.dataList
      const showNodes = nodeList.filter(i => i.level === level)
      const dataJson = getNormalLayoutData(showNodes.sort((a, b) => a.sort - b.sort))
      graph.fromJSON(dataJson)
    }

    // 主视图 节点 边 组成
    const initData = () => {
      const { dataList: { nodeList, edgesList } } = state
      const showNodes = nodeList.filter(i => i.level === 1)
      const dataJson = getNormalLayoutData(showNodes)
      graph.fromJSON(dataJson)
    }

    // 分离视图
    const initDisjointData = () => {
      const { nodeList, edgesList } = state.dataList
      if (state.dataList.nodeList.length) {
        const data = {
          nodes: nodeList.map((item, index) => createNode(item.nodeId, item, index)),
          edges: edgesList.map(item => createEdge(item))
        }
        graph.fromJSON(data)
        layout(graph)
        graph.zoomTo(0.6)
        graph.center()
      }
    }



    // 分离路径
    const disjointPathDagreLayout = new DagreLayout({
      rankdir: 'LR', // 可选，默认为图的中心
      controlPoints: true, // 可选
      nodesep: 60, // 可选
      ranksep: 130, // 可选
    })


    // 分离路径
    const initDisjointPathData = () => {
      const { nodeList, edgesList } = state.dataList
      if (state.dataList.nodeList.length) {
        const data = {
          nodes: nodeList.map((item, index) => createNode(item.nodeId, item, index)),
          edges: edgesList.map(item => createEdge(item))
        }
        console.log(data)
        const model = disjointPathDagreLayout.layout(data)
        graph.fromJSON(model)
        graph.zoomTo(0.6)
        graph.center()
      }
    }

    onMounted(() => {
      resistNode()
      initGraph()
      initMethod()

      if (props.uKey === 'subView') {
        initDisjointData()
      }
    })

    return {
      ...toRefs(state),
      handleShowSku,
    }
  }
}
</script>
<style>
.text-label-box {
  padding: 7px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5%;
  font-size: 12px;
}
</style>
<style lang='less' scoped>
.graphWrapper {
  width: 100%;
  height: 700px;
}
</style>