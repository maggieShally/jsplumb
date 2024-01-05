<!--
 * @Description: 
 * @Date: 2022-01-13 09:42:18
 * @LastEditTime: 2024-01-02 11:00:42
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\x6Tree\index.vue
-->

<template>
  <el-button @click="handleChangeNode">change</el-button>
  <div class="wrap">
    <div id="container" class="left-content" style="height: 700px"></div>
    <TeleportContainer />

    <div class="right-content">
      <p>指标</p>
      <div v-for="node in zbNodeList" :key="node.id">
        <div>{{ node.name }}</div>
        <div class="flex-wrap">
          <div class="flex-item" v-for="item in node.data" :key="item.name">
            <p>{{ item.name }}</p>
            <p>{{ item.quantity }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, h } from 'vue'
import { Graph, ObjectExt, Cell } from '@antv/x6'
import { DagreLayout, CircularLayout, ForceLayout, RadialLayout } from '@antv/layout'
import { register, getTeleport } from '@antv/x6-vue-shape'

import dagre from 'dagre'

import layout from './layout.js'

import { initData, data2 } from './data.js'

import NodeCom from './NodeCom.vue'

register({
  shape: 'custom-vue-node',
  width: 100,
  height: 100,
  component: NodeCom,
})


const TeleportContainer = getTeleport()


export default {
  name: 'X6Panel',
  components: {
    TeleportContainer: h(TeleportContainer)
  },
  setup() {
    const state = reactive({
      initData: initData,
      zbNodeList: [],
    })
    let graph

    const registerGraph = function () {



      // Graph.registerNode(
      //   'NodeCom',
      //   {
      //     template: `<NodeCom />`,
      //     components: {
      //       NodeCom,
      //     },
      //   },
      //   true
      // )

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
        layout: {
          type: 'radial',
          unitRadius: 50,
        },
      })

      const data = {
        nodes: state.initData.nodes.map(item => {
          return {
            ...item,
            shape: 'custom-vue-node',
            width: 150,
            height: item.type === 'zb' ? 140 : 100,
            // component: {
            //   template: `<NodeCom @onShowZb="handleShowZb" ></NodeCom>`,
            //   components: {
            //     NodeCom,
            //   },
            //   setup() {
            //     const handleShowZb = node => {
            //       console.log(node.data)
            //       const nextIds = initData.edges
            //         .filter(item => {
            //           return item.source.cell === node.data.id
            //         })
            //         .map(item => item.target.cell)

            //       const zbNodeList = initData.nodes.filter(item => {
            //         return (
            //           nextIds.findIndex(n => n === item.id) > 0 &&
            //           item.type === 'zb'
            //         )
            //       })

            //       console.log(zbNodeList)
            //       state.zbNodeList = zbNodeList
            //     }

            //     return {
            //       handleShowZb,
            //     }
            //   },
            // },
            data: item,
            ports: {
              groups: {
                // 输入链接桩群组定义
                in: {
                  position: 'left',
                  attrs: {
                    circle: {
                      r: 1,
                      magnet: true,
                      stroke: '#fff',
                      strokeWidth: 1,
                      fill: '#fff',
                    },
                  },
                },
                // 输出链接桩群组定义
                out: {
                  position: 'right',
                  attrs: {
                    circle: {
                      r: 1,
                      magnet: true,
                      stroke: '#fff',
                      strokeWidth: 1,
                      fill: '#fff',
                    },
                  },
                },
                // 指标
                zb: {
                  position: 'right',
                  attrs: {
                    circle: {
                      r: 1,
                      magnet: true,
                      stroke: '#fff',
                      strokeWidth: 1,
                      fill: '#fff',
                    },
                  },
                },
              },
              items: [
                {
                  id: 'left',
                  group: 'in',
                },
                {
                  id: 'right',
                  group: 'out',
                },
                {
                  id: 'bottom',
                  group: 'out',
                },
              ],
            },
            tools: [
              {
                name: 'button-remove',
                args: { x: 10, y: 10 },
              },
            ],
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
