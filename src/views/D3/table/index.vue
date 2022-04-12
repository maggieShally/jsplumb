<!--
 * @Description: 
 * @Date: 2022-04-12 09:44:11
 * @LastEditTime: 2022-04-12 17:51:59
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\table\index.vue
-->
<template>
  <div style="height: 20px">
    <div v-if="showTips">我是tips</div>
  </div>
  <div class="wrapper">
    <svg id="headerChart" :width="width" height="36"></svg>
  <svg id="tableChart" :width="width" :height="height"></svg>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, getCurrentInstance, computed } from 'vue'
import { headerData, tableData } from './data.js'

export default {
  name: 'D3Table',
  setup() {
    const { proxy } = getCurrentInstance()
    const margin = { top: 25, bottom: 25, left: 0, right: 0 }
    const height = 60
    const d3 = proxy.$d3

    let headerChart, tableChart

    const state = reactive({
      width: window.screen.width > 1920 ? 1600 : headerData.length * 100,
      height: window.screen.height > 1920 ? 1200 : 600,
      showTips: false
    })

    const rectWidth = computed(() => state.width / headerData.length)

    const xScale = d3
      .scaleBand()
      .domain(d3.range(headerData.length))
      .rangeRound([0, state.width - margin.left - margin.right])

    const initHeader = () => {
      headerChart = d3.select('#headerChart')

      const g = headerChart.append('g')

      // 外框线
      g.append('rect')
        .attr('y', 0)
        .attr('x', 0)
        .attr('width', state.width)
        .attr('height', 30)
        .attr('fill', 'transparent')
        .attr('stroke', '#ddd')

      const gs = headerChart
        .selectAll('line')
        .data(headerData)
        .enter()
        .append('g')

      // 单元格边线
      gs.append('line')
        .attr('x1', function (d, i) {
          return xScale(i) + rectWidth.value
        })
        .attr('x2', function (d, i) {
          return xScale(i) + rectWidth.value
        })
        .attr('y1', 5)
        .attr('y2', 27)
        .attr('stroke', '#ddd')

      // 单元格右边线
      gs.append('text')
        .attr('x', function (d, i) {
          return xScale(i) + rectWidth.value / 2
        })
        .attr('y', 0)
        .attr('dx', 0)
        .attr('dy', 20)
        .text(function (d) {
          return d.label
        })
    }

    const initTable = () => {
      let tableChart = d3.select('#tableChart')


      // 每一行数据
      for (let i = 0; i < tableData.length; i++) {
        const g = tableChart.append('g')

        const gs = g.selectAll('rect').data(tableData[i]).enter()
      

        // 行 的小格
        gs.append('rect')
          .attr('x', function (d, j) {
            return (
              rectWidth.value * (d.week - 1) +
              (rectWidth.value / 7) * (d.start - 1)
            )
          })
          .attr('y', i * height + 15)
          .attr('rx', 3)
          .attr('ry', 3)
          .attr('width', function (d, j) {
            return (rectWidth.value / 7) * (d.end - d.start + 1)
          })
          .attr('height', 50)
          .attr('fill', 'rgba(30,144,255, .5)')
          .attr('stroke', 'rgba(30,144,255, 1)')
          .attr('id', function (d, j) {
            return `str${d.id}`
          })
          .attr('nextId', function(d, j) {
            return d.nextId
          })
          .on('click', function (e) {

            const nextId = tableData[i].find(item => item.id == e.target.id.split('str')[1]).nextId ?? []
            nextId.push(e.target.id.split('str')[1])
            // console.log(document.querySelector('#str2'))

            nextId.forEach(id => {
              d3.select(document.querySelector(`#str${id}`))
                .transition()
                .duration(500)
                .attr('fill', 'yellowgreen')
            })
            
          })
          .on('mouseover', function(e) {
            state.showTips = true
          })
          .on('mouseleave', function(e) {
            state.showTips = false
          })

        g.append('line')
          .attr('x1', 0)
           .attr('y1', (i + 1) * height + 10)
          .attr('x2', state.width)
          .attr('y2', (i + 1) * height  + 10)
          .attr('style', 'stroke-width: 1; stroke: rgba(233, 123, 22, .3); fill: none;')

       
      }
    }

    onMounted(() => {
      initHeader()
      initTable()
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  overflow: auto;
}
</style>