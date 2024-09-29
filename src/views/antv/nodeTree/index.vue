<!--
 * @Description: 
 * @Date: 2022-07-06 16:35:06
 * @LastEditTime: 2024-09-29 13:56:23
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\nodeTree\index.vue
-->

<template>
  <div ref="containerRef" id="container" style="width: 100%; height: 500px;"></div>
</template>

<script>
import { reactive, toRefs,ref,  onMounted } from 'vue'
import { Graph } from '@antv/x6'
import { DagreLayout } from '@antv/layout'

export default {
  name: '',
  components: {
  },
  props: {
  },
  setup() {
    const containerRef = ref(null)

    const state = reactive({
      
    })

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
        ['4', '8'],
        ['5', '9'],
        ['6', '10'],
        ['7', '11'],
        ['8', '12'],
      ]

      for (let i = 1; i <= 12; i++) {
        let temp = {
          id: `${i}`,
          shape: 'circle',
          width: 32,
          height: 32,
          label: i,
          attrs: {
            body: {
              fill: '#5F95FF',
              stroke: 'transparent',
            },
            label: {
              fill: '#ffffff',
            },
          },
        }
        if([5,6].includes(i)) {
          temp.comboId = 'A'
        }

        data.nodes.push(temp)
      }

      edges.forEach((edge) => {
        data.edges?.push({
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

      const graph = new Graph({
        container: containerRef.value,
      })

      const dagreLayout = new DagreLayout({
        type: 'dagre',
        rankdir: 'LR',
        align: 'UR',
        ranksep: 35,
        nodesep: 15,
      })
      const model = dagreLayout.layout(data)

      graph.fromJSON(model)


    })
    return {
      containerRef,
      ...toRefs(state),
    }
  },
}

</script>
<style scoped lang='less'></style>