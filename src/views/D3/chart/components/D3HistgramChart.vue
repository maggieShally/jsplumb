<!--
 * @Description: 直方图 histogram 返回一个分箱数组，查看数据的分布情况（计算区间值内的个数）
 * @Date: 2022-06-14 11:05:00
 * @LastEditTime: 2022-06-16 09:14:55
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\chart\components\D3HistgramChart.vue
-->
<template>
  <h3>直方图 histogram</h3>
  <div id="histgram-chart" class="d3-chart"></div>
</template>

<script>
import { getCurrentInstance, onMounted } from 'vue'
import { unemploymentData } from './data.js'

export default {
  name: 'D3HistgramChart',
  setup() {
    const { proxy } = getCurrentInstance()
    const d3 = proxy.$d3

    let svg, histogram

    const data = unemploymentData.map(item => item.rate)
    // const data = d3.range(10).map(d3.randomBates(10))
    console.log(data)
    const width = 600

    const initSvg = () => {
      svg = d3
        .select('#histgram-chart')
        .append('svg')
        .attr('width', width)
        .attr('height', 350)
        .append('g')

      const xScale = d3.scaleLinear().domain([0, d3.max(data)]).rangeRound([20, 600 - 20])

      const xAxis = d3.axisBottom(xScale)

      const bins = d3
        .histogram()
        .domain(xScale.domain())
        .thresholds(xScale.ticks(Math.ceil(d3.max(data))))(data)

      var yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(bins, function (d) {
            return d.length
          }),
        ])
        .range([300, 0])
         const yAxis = d3.axisLeft(yScale)

      console.log(bins)

      const bar = svg
        .selectAll('.bar')
        .data(bins)
        .enter()
        .append('g')
        .attr('class', 'bar')
        .attr('transform', function (d) {
          debugger
          return 'translate(' + xScale(d.x0) + ',' + yScale(d.length) + ')'
        })

      bar
        .append('rect')
        .attr('x', 1)
        .attr('width', xScale(bins[0].x1) - xScale(bins[0].x0) - 1)
        .attr('height', function (d) {
          return 300 - yScale(d.length)
        })

      svg.append('g').attr('transform', `translate(0, ${300})`).call(xAxis)
      svg.append('g').attr('transform', `translate(30, 0)`).call(yAxis)
    }

    onMounted(() => {
      initSvg()
    })
  },
}
</script>

<style lang="less" scoped>
.d3-chart {
  width: 300px;
  height: 300px;
  .bar {
    background-color: #ccddee;
  }
}
</style>