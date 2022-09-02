<!--
 * @Description: 
 * @Date: 2022-07-12 10:46:35
 * @LastEditTime: 2022-07-27 15:23:54
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\department\index.vue
-->

<template>
  <el-button @click="handleChangeNode">change</el-button>
  <div class="wrap">
    <div id="container" class="left-content" style="height: 700px"></div>
    <div class="right-content">

      <el-table :data="dataList" border>
        <el-table-column label="料号" prop="itemNo"></el-table-column>
        <el-table-column label="PN" prop="pn"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { Graph, ObjectExt, Cell } from '@antv/x6'
import {
  DagreLayout,
  CircularLayout,
  ForceLayout,
  RadialLayout,
} from '@antv/layout'
import '@antv/x6-vue-shape'
import dagre from 'dagre'

import { initData } from './data.js'

import NodeCom from './NodeCom.vue'

export default {
  name: 'X6Panel',
  setup() {
    const state = reactive({
      initData: initData,
      zbNodeList: [],
      dataList: [{
        itemNo: '我是一个料号',
        pn: '我是一个PN',
        status: '我是一个状态'
      },{
        itemNo: '我是一个料号',
        pn: '我是一个PN',
        status: '我是一个状态'
      },{
        itemNo: '我是一个料号',
        pn: '我是一个PN',
        status: '我是一个状态'
      }],
    })
    let graph

    const registerGraph = function () {
      Graph.registerVueComponent(
        'NodeCom',
        {
          template: `<NodeCom />`,
          components: {
            NodeCom,
          },
        },
        true
      )

      Graph.registerEdge(
        'org-edge',
        {
          zIndex: -1,
          attrs: {
            line: {
              fill: 'none',
              strokeLinejoin: 'round',
              strokeWidth: '2',
              stroke: '#4b4a67',
              sourceMarker: null,
              targetMarker: null,
            },
          },
        },
        true
      )
    }

    const initGraph = function () {
      graph = new Graph({
        container: document.getElementById('container'),
        width: 2200,
        height: 700,
        grid: true,
        scroller: true,
        interacting: false,
        connecting: {
          anchor: 'orth',
          connector: 'rounded',
          connectionPoint: 'boundary',
          router: {
            name: 'er',
            args: {
              offset: 24,
              direction: 'H',
            },
          },
        },
      })

      const data = {
        nodes: state.initData.nodes.map(item => {
          return {
            ...item,
            shape: 'vue-shape',
            width: 150,
            height: 100,
            component: {
              template: `<NodeCom @onShowZb="handleShowZb" ></NodeCom>`,
              components: {
                NodeCom,
              },
              setup() {
                const handleShowZb = node => {
                  console.log(node.data)
                  const nextIds = initData.edges
                    .filter(item => {
                      return item.source.cell === node.data.id
                    })
                    .map(item => item.target.cell)

                  const zbNodeList = initData.nodes.filter(item => {
                    return (
                      nextIds.findIndex(n => n === item.id) > 0 &&
                      item.type === 'zb'
                    )
                  })

                  console.log(zbNodeList)
                  state.zbNodeList = zbNodeList
                }

                return {
                  handleShowZb,
                }
              },
            },
            data: item,
          }
        }),
        edges: state.initData.edges.map(item => {
          return {
            shape: 'org-edge',
            source: item.source,
            target: item.target,
            connector: { name: 'normal' },
            attrs: {
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 2,
              },
            },
          }
        }),
      }

      // layout(graph)

      const dagreLayout = new DagreLayout({
        // type: 'dagre',
        // rankdir: 'LR',
        // align: 'UR',
        // ranksep: 100,
        // nodesep: 50,
        rankdir: 'LR', // 可选，默认为图的中心
        align: 'DL', // 可选
        nodesep: 30, // 可选
        ranksep: 100, // 可选
        controlPoints: true, // 可选
        sortBy: 'value',
      })
      const model = dagreLayout.layout(data)

      graph.fromJSON(model)
    }

    const handleChangeNode = () => {
      graph.getNodes()[0].setData({
        name: 'xxxxxxxxxxxxxxx',
      })
    }

    onMounted(() => {
      registerGraph()
      initGraph()
    })

    return { ...toRefs(state), handleChangeNode }
  },
}
</script>

<style lang="less" scoped>
.wrap {
  display: flex;
  .left-content {
    flex: 1;
  }

  .right-content {
    width: 500px;
  }
}

.flex-wrap {
  display: flex;
  align-items: stretch;

  border: 1px solid #ddd;

  .flex-item {
    flex: 1;

    p {
      margin: 0;
      padding: 10px;
    }

    &:first-child {
      border-right: 1px solid #ddd;
    }
  }
}
</style>
