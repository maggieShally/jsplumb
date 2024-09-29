<!--
 * @Description: 
 * @Date: 2022-07-12 10:46:35
 * @LastEditTime: 2024-08-08 09:02:24
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\department\index.vue
-->

<template>
  <el-button @click="handleChangeNode">change</el-button>
  <div class="wrap">
    <div className="app-main">
      <div id="container" class="app-content"></div>
    </div>

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
import { Graph, Markup } from '@antv/x6'
import { register, getTeleport } from '@antv/x6-vue-shape'
import { Scroller } from '@antv/x6-plugin-scroller'

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
      }, {
        itemNo: '我是一个料号',
        pn: '我是一个PN',
        status: '我是一个状态'
      }, {
        itemNo: '我是一个料号',
        pn: '我是一个PN',
        status: '我是一个状态'
      }],
    })
    let graph

    const registerGraph = function () {
      register({
        shape: 'NodeCom',

        component: {
          template: `<NodeCom @onShowZb="handleShowZb" ></NodeCom>`,
          components: {
            NodeCom,
          },
          setup() {

            const handleShowZb = node => {
              console.log(node.data)
              // const nextIds = initData.edges
              //   .filter(item => {
              //     return item.source.cell === node.data.id
              //   })
              //   .map(item => item.target.cell)

              // const zbNodeList = initData.nodes.filter(item => {
              //   return (
              //     nextIds.findIndex(n => n === item.id) > 0 &&
              //     item.type === 'zb'
              //   )
              // })

              // console.log(zbNodeList)
              // state.zbNodeList = zbNodeList
            }

            return {
              handleShowZb,
            }
          },
        },

      })

      Graph.registerEdge(
        'org-edge',
        {
          zIndex: 99,
          attrs: {
            line: {
              fill: 'none',
              strokeLinejoin: 'round',
              strokeWidth: '2',
              stroke: '#A2B1C3',
              sourceMarker: null,
              targetMarker: null,
            },
          },
          label: {
            position: 0.25,
          },
          attrs: {
            line: {
              stroke: '#ccc',
            },
          },
        },
        true
      )
    }


    const createNode = item => {
      return {
        ...item,
        shape: 'NodeCom',
        width: 150,
        height: Math.random()*100 + 150,
        data: item,
      }
    }

    const createEdge = item => {
      let defaultLabel = {
        markup: Markup.getForeignObjectMarkup(),
        attrs: {
          fo: {
          },
        }
      }
      if (item.data) {
        defaultLabel.attrs.fo = {
          width: 180,
          height: 70,
          x: 20,
          y: -25,
        }
      }

      return {
        shape: 'org-edge',
        source: item.source,
        target: item.target,
        data: item.data,
        connector: { name: 'normal' },
        defaultLabel
      }
    }

    const initGraph = function () {
      graph = new Graph({
        container: document.getElementById('container'),
        // width: 2200,
        // height: 700,
        // grid: true,
        // scroller: true,
        // autoResize: true,
        // panning: true,
        mousewheel: true,
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

        onEdgeLabelRendered(args) {
          const { selectors, edge } = args
          const content = selectors.foContent
          if (edge.data) {
            console.log(edge.id)
            const { data } = edge
            content.innerHTML = `
              <div class="text-label-box" id='${edge.id}' data-edge=${edge.data} onclick="handleCheck()" >
                <div>${data.name}</div>
                <div>${data.label} <span class="check-link">查详详情</span></div>
              </div>
              `
            document.getElementById(edge.id).onclick = () => {
              console.log(edge)
              console.log(edge.target.cell)
              console.log(edge.source.cell)
            }
          }
        }
      })

      graph.use(
        new Scroller({
          enabled: true,
          pageVisible: true,
          // pageBreak: true,
          pannable: true,
        }),
      )


      const data = {
        nodes: state.initData.nodes.map(item => {
          return createNode(item)
        }),
        edges: state.initData.edges.map(item => {
          return createEdge(item)
        }),
      }
      console.log(data)
      // layout(graph)

      const dagreLayout = new DagreLayout({
        // type: 'dagre',
        // rankdir: 'LR',
        // align: 'UR',
        // ranksep: 100,
        // nodesep: 50,
        rankdir: 'LR', // 可选，默认为图的中心
        align: 'DL', // 可选
        // nodesep: 30, // 可选
        ranksep: 150, // 可选
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
  height: 700px;

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

<style lang="less">
.text-label-box {
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #fff;

  .check-link {
    color: #3a4dfa;
  }
}


.app-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 8px;
  margin-left: 8px;

  .app-content {
    flex: 1;
    margin-right: 8px;
    margin-left: 8px;
  }
}
</style>
