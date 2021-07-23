<!--
 * @Description: 
 * @Date: 2021-06-29 15:30:17
 * @LastEditTime: 2021-06-30 17:34:16
 * @FilePath: \jsplumb-test\src\views\D3\components\First.vue
-->
<template>
  <p>learn example 1</p>
  <div id="box">

  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue'
const { proxy } = getCurrentInstance()

onMounted(() => {
  const width = 300
  const height = 300
  let svg = proxy.$d3
    .select('#box')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const dataset = [250, 210, 170, 130, 90]
  const rectHeight = 25
  svg
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', 20)
    .attr('y', (d, i) => {
      return i * rectHeight
    })
    .attr('width', function (d) {
      return d
    })
    .attr('height', rectHeight - 2)
    .attr('fill', 'steelblue')
})
</script>

<style>
</style>