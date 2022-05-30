<!--
 * @Date: 2022-04-27 09:28:20
 * @LastEditTime: 2022-04-27 14:46:23
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\pages\panel\index.vue
-->
<template>

  <div id="viewPanel"></div>
</template>

<script>
import { Graph, Addon, EdgeView, Vector } from '@antv/x6';
import { onMounted } from 'vue-demi';

export default {
  name: 'viewPanel',
  setup() {

    let graph 
    const init = () => {
      graph = new Graph({
        container: document.getElementById('viewPanel'),
        width: 1920,
        height: 600,
        interacting: false,
        panning: {
          enabled: false,
        },
      })
      const graphJson = JSON.parse(localStorage.getItem('graphJson'))
      graphJson.cells.forEach(item => {
        item.position.x = item.position.x / 800 * 1920
      })
      graph.fromJSON(graphJson)
    }

    onMounted(() => {
      init()
    })
  }
}
</script>

<style>

</style>