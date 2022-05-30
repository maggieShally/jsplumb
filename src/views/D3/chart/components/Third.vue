<!--
 * @Description: 
 * @Date: 2021-06-30 17:52:24
 * @LastEditTime: 2022-04-13 14:14:46
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\chart\components\Third.vue
-->

<template>
  <p>learn example 3 (柱状图))</p>
  <svg id="thirdSvg" width="300" height="300"></svg>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive } from 'vue'
const { proxy } = getCurrentInstance()

onMounted(() => {
  const width = 300
  const height = 300
  const margin = { top: 25, bottom: 25, left: 20, right: 20 }
  var dataset = [10, 20, 30, 23, 13, 40, 27, 35, 20]
  const d3 = proxy.$d3

  let svg = d3.select('#thirdSvg')
  let g = svg
    .append('g')
    .attr('transform', `translate(${margin.top}, ${margin.left})`)

  // 定义x轴坐标 scaleBand 坐标轴   根据domain的长度，等分rangeRound域
  const xScale = d3
    .scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, width - margin.left - margin.right])
  const xAxis = d3.axisBottom(xScale)

  //定义y轴坐标 scaleLinear 线性比例尺 建立 domain 与 range的映射关系
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([height - margin.top - margin.bottom, 0])
  const yAxis = d3.axisLeft(yScale)

  g.append('g')
    .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
    .call(xAxis)

  g.append('g').attr('transform', 'translate(0,0)').call(yAxis)

  const rectWidth = 10

  const gs = g
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('g')
  


// 绘制距形
    gs.append('rect')
    .attr('y', function (d, i) {
       console.log(d, yScale(d))
      return yScale(d)
    })
    .attr('x', function (d, i) {
      return xScale(i) + rectWidth / 2
    })
    .attr('width', function (d) {
      return xScale.step() - rectWidth
    })
    .attr('height', function (d) {
      console.log(yScale(d))
      return height - margin.top - margin.bottom - yScale(d)
    })
    .attr('fill', '#FFA354')
    .on('mouseover', function(){
      d3.select(this)
      .transition()
      .duration(1500)
      .attr('fill', 'yellowgreen')
    })
    .on('mouseout', function() {
      d3.select(this)
      .transition()
      .duration(1000)
      .attr('fill', 'steelblue')
    })


// 绘制文本    
  gs.append('text')
    .attr('x', function (d, i) {
      return xScale(i) + rectWidth / 2
    })
    .attr('y', function (d) {
      return yScale(d)
    })
    .attr('dx', function () {
      return (xScale.step()-rectWidth)/2
    })
    .attr('dy', 20)
    .text(function (d) {
      return d
    })
})
</script>

<style>
</style>