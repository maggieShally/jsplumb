<!--
 * @Description: 
 * @Date: 2021-11-12 09:11:20
 * @LastEditTime: 2021-12-03 09:50:33
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\x6\index.vue
-->

<template>
  <div id="container"></div>
  <!-- <BaseChart name="x6" :seriesData="seriesData" /> -->
</template>

<script>
import { reactive, toRefs, ref, inject } from 'vue'
import { Graph, Shape } from '@antv/x6'
import '@antv/x6-vue-shape'
import { DagreLayout } from '@antv/layout'
import dagre from 'dagre'

import { onMounted } from '@vue/runtime-core'
import BaseChart from './components/BaseChart.vue'
import TestChart from './components/TestChart.vue'

export default {
  name: 'X6Tree',
  components: {
    // BaseChart,
  },
  setup() {
    let graph
    var dir = 'LR'

    Graph.registerVueComponent(
      'TestChart',
      {
        template: `<TestChart/>`,
        components: {
          TestChart,
        },
      },
      true
    )

     // 自动布局
    function layout() {
      const nodes = graph.getNodes()
      const edges = graph.getEdges()
      const g = new dagre.graphlib.Graph()
      g.setGraph({ rankdir: dir, nodesep: 80, ranksep: 120 })
      g.setDefaultEdgeLabel(() => ({}))

      const width = 300
      const height = 250
      nodes.forEach(node => {
        console.log(node)
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

        console.log(sourceBBox, targetBBox)

        if ((dir === 'LR' || dir === 'RL') && sourceBBox.y !== targetBBox.y) {
          const gap =
            dir === 'LR'
              ? targetBBox.x - sourceBBox.x - sourceBBox.width
              : -sourceBBox.x + targetBBox.x + targetBBox.width
          const fix = dir === 'LR' ? sourceBBox.width : 0
          const x = sourceBBox.x + fix + gap / 2
          edge.setVertices([
            { x, y: sourceBBox.center.y },
            { x, y: targetBBox.center.y },
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
            { x: targetBBox.center.x, y },
          ])
        } else {
          edge.setVertices([])
        }
      })

      graph.unfreeze()
    }

    const regiseterEdge = () => {
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

    const state = reactive({})

    onMounted(() => {
      const data = {
        nodes: [],
        edges: [],
      }
      const edges = [
        ['1', '2'],
        ['2', '3'],
        ['2', '4'],
        ['4', '5'],
        ['4', '6'],
        ['4', '7'],
      ]

      for (let i = 1; i <= 7; i++) {
        data.nodes.push({
          id: `${i}`,
          shape: 'vue-shape',
          width: 320,
          height: 220,
          component: {
            template: `<TestChart :name="'A_'+${i}" ></TestChart>`,
            components: {
              TestChart,
            },
          },
        })
      }

      edges.forEach(edge => {
        data.edges.push({
          shape: 'org-edge',
          source: edge[0],
          target: edge[1],
          attrs: {
            line: {
              stroke: '#A2B1C3',
              strokeWidth: 2,
            },
          },
        })
      })

      graph = new Graph({
        container: document.getElementById('container'),
        width: 2200,
        height: 700,
        grid: true,
        scroller: true,
      })

      regiseterEdge()

    //   const dagreLayout = new DagreLayout({
    //     // type: 'dagre',
    //     // rankdir: 'LR',
    //     // align: 'UR',
    //     // ranksep: 100,
    //     // nodesep: 50,
    //     rankdir: 'LR', // 可选，默认为图的中心
    // align: 'DL', // 可选
    // nodesep: 20, // 可选
    // ranksep: 50, // 可选
    // controlPoints: true, // 可选
    //   })

      // const model = dagreLayout.layout(data)

      graph.fromJSON(data)
      layout()

      
    })

    return {
      ...toRefs(state),
    }
  },

  
}
</script>

<style>
</style>