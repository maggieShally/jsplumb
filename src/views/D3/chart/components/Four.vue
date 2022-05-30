<!--
 * @Description: 捆绑布局 
 * @Date: 2022-04-13 16:45:22
 * @LastEditTime: 2022-04-14 09:09:37
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\chart\components\Four.vue
-->
<template>
  <p>learn example 1</p>
  <div id="box">

  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue'
const { proxy } = getCurrentInstance()
const d3 = proxy.$d3
const width = 300
const height = 300

const init = () => {
  const svg = d3.select('#box')
  svg.attr('width', width).attr('height', height)

  var vertex = {
    name: '',
    children: [
      { name: '北京' },
      { name: '上海' },
      { name: '杭州' },
      { name: '广州' },
      { name: '桂林' },
      { name: '昆明' },
      { name: '成都' },
      { name: '西安' },
      { name: '太原' },
    ],
  }

  var edges = [
    { source: '北京', target: '上海' },
    { source: '北京', target: '广州' },
    { source: '北京', target: '杭州' },
    { source: '北京', target: '西安' },
    { source: '北京', target: '成都' },
    { source: '北京', target: '太原' },
    { source: '北京', target: '桂林' },
    { source: '北京', target: '昆明' },
    { source: '北京', target: '成都' },
    { source: '上海', target: '杭州' },
    { source: '昆明', target: '成都' },
    { source: '西安', target: '太原' },
  ]

  const Zoom_data = 400

  var cluster = d3.cluster()
    .size([360, width / 2 - Zoom_data])
    .separation(function (a, b) {
      return (a.parent == b.parent ? 1 : 2) / a.depth
    })

  var bundle = d3.curveBundle()

  //数据接口
  // var nodes = cluster.values(vertex)
  var oLinks = map(vertex.children, edges)

  var links = oLinks

  //将links中的source和target由名称替换成节点
  function map(nodes, links) {
    debugger
    var hash = []
    for (var i = 0; i < nodes.length; i++) {
      hash[nodes[i].name] = nodes[i]
    }
    var resultLinks = []
    for (var j = 0; j < links.length; j++) {
      resultLinks.push({
        source: hash[links[j].source],
        target: hash[links[j].target],
      })
    }
    return resultLinks
  }

  //3. 绘图
  var line = d3.line
    .radial()
    .interpolate('bundle')
    .tension(0.85)
    .radius(function (d) {
      return d.y
    })
    .angle(function (d) {
      return (d.x / 180) * Math.PI
    })

  const gBundle = svg
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

  var color = d3.scale.category20c()

  var link = gBundle
    .selectAll('.link')
    .data(links)
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', line) //使用线段生成器

  var node = gBundle
    .selectAll('.node')
    .data(
      vertex.filter(function (d) {
        return !d.children
      })
    )
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', function (d) {
      return (
        'rotate(' +
        (d.x - 90) +
        ')translate(' +
        d.y +
        ')' +
        'rotate(' +
        (90 - d.x) +
        ')'
      )
    })

  node
    .append('circle')
    .attr('r', 20)
    .style('fill', function (d, i) {
      return color(i)
    })

  node
    .append('text')
    .attr('dy', '.2em')
    .style('text-anchor', 'middle')
    .text(function (d) {
      return d.name
    })
}

onMounted(() => {
  // init()
})
</script>

<style lang="less">
</style>