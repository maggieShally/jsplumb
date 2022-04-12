<!--
 * @Description: 
 * @Date: 2021-06-29 16:55:02
 * @LastEditTime: 2021-07-01 15:23:38
 * @FilePath: \jsplumb-test\src\views\D3\components\Second.vue
-->

<template>
  <p>learn example 2 (比例尺 坐标轴)</p>
  <svg id="secondSvg" width="300px" height="300px"></svg>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue'
const { proxy } = getCurrentInstance()

onMounted(() => {
  // const margin = { top: 60, bottom: 60, left: 60, right: 60 }
  const dataset = [2.5, 2.1, 1.7, 1.3, 0.9]
  const d3 = proxy.$d3

  // 创建比例尺
  const scaleLinear = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, 300])

  let svg = d3.select('#secondSvg')
  let g = svg.append('g')
  // .attr('transform', `translate(${margin.top}, ${margin.left} )`)

  const rectHeight = 30

  g.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', 20)
    .attr('y', function (d, i) {
      return i * rectHeight
    })
    .attr('width', function (d) {
      return scaleLinear(d)
    })
    .attr('height', function () {
      return rectHeight - 5
    })
    .attr('fill', 'steelblue')

  // 定义x轴坐标
  const xAxis = d3.axisBottom(scaleLinear).ticks(7)
  

  g.append('g')
    .attr('transform', `translate(20, ${dataset.length * rectHeight} )`)
    .call(xAxis)
})
</script>

<style>
</style>