<!--
 * @Description: 
 * @Date: 2022-06-14 09:17:20
 * @LastEditTime: 2022-06-16 10:58:05
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\chart\components\D3PieChart.vue
-->
<template>
  <h3> D3 pie chart</h3>
  <div id="pie-chart" class="pie-chart"></div>
</template>

<script>
import { getCurrentInstance, onMounted } from 'vue'
export default {
  name: 'D3PieChart',
  setup() {
    const { proxy } = getCurrentInstance()
    const d3 = proxy.$d3

    const color = d3.scaleOrdinal(d3.schemeCategory10) // 生成颜色函数

    let svg, pieData, arc, arcs

    const dataset = [
      { value: 1048, name: '搜索引擎' },
      { value: 735, name: '直接访问' },
      { value: 580, name: '邮件营销' },
      { value: 484, name: '联盟广告' },
      { value: 300, name: '视频广告' },
    ]
    const width = 300

    const initData = () => {
      // 布局 是为了获得 绘图所需的数据
      const pie = d3.pie().value(d => d.value)
      pieData = pie(dataset)
      console.log(pieData)
    }

    // 画弧形
    const paintArc = () => {
      const outerRadius = 100
      const innerRadius = 40

      arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius)

      arcs = svg
        .selectAll('g')
        .data(pieData)
        .enter()
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + width / 2 + ')')

      arcs
        .append('path')
        .attr('fill', function (d, i) {
          return color(i)
        })
        .attr('d', function (d) {
          return arc(d) //调用弧生成器，得到路径值
        })

      arcs
        .append('text')
        .attr('transform', function (d) {
          return 'translate(' + arc.centroid(d) + ')'
        })
        .attr('text-anchor', 'middle')
        .text(function (d) {
          return d.data.value
        })
    }

    onMounted(() => {
      svg = d3
        .select('#pie-chart')
        .append('svg')
        .attr('width', 300)
        .attr('height', 300)

      initData()

      paintArc()
    })
  },
}
</script>

<style lang="less" scoped>
.pie-chart {
  width: 300px;
  height: 300px;
}
</style>