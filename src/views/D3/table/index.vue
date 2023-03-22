<!--
 * @Description: 
 * @Date: 2022-04-12 09:44:11
 * @LastEditTime: 2022-10-26 16:26:18
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\table\index.vue
-->
<template>

  <div class="wrapper">
    <svg id="headerChart" :width="width" height="36"></svg>
    <svg id="tableChart" :width="width" :height="height"></svg>

    <div v-if="tipsInfo.visible" class="tips-section" :style="{top: tipsInfo.top + 'px', left: tipsInfo.left  + 'px'}">
      <div>我是tips</div>
    </div>
  </div>

</template>

<script>
import {
  onMounted,
  reactive,
  toRefs,
  getCurrentInstance,
  computed,
  unref,
} from 'vue'
import { headerData, tableData } from './data.js'

export default {
  name: 'D3Table',
  setup() {
    const { proxy } = getCurrentInstance()
    const d3 = proxy.$d3

    // 基础配置信息
    const margin = { top: 25, bottom: 25, left: 0, right: 0 }
    const rectHeight = 60 // 行高
    const dateRang = 7 // 周期分隔（周： 7）
    const defaultBarColor = 'rgba(30,144,255, .5)' // 默认 bar 颜色
    const defaultBarBorderColor = 'rgba(30,144,255, 1)' // 默认 bar 边框 颜色
    const activeBarColor = 'yellowgreen' // 点击 bar 颜色

    const circleColor = 'rgba(255,127,80, 1)'
    const lineColor = 'rgba(112,128,144, 1)' // 折线颜色
    const borderColor = 'rgba(112,128,144, .4)' // 顶部边框
    const rowBorderColor = 'rgba(233, 123, 22, .3)' // 行 边线

    const nodeTypeColor = {
      oneType: {
        color: 'rgba(222,222,222, .5)',
      },
      twoType: {
        color: 'rgba(153,136,153, .5)',
      },
      threeType: {
        color: 'rgba(255,99,71, .5)',
      },
    }

    let headerChart, tableChart, xScale

    const state = reactive({
      width: window.screen.width > 1920 ? 1600 : headerData.length * 100,
      height: window.screen.height > 1920 ? 1200 : 600,
      showTips: false,
      tipsInfo: {
        top: 0,
        left: 0,
        visible: false,
      },
      headerData: headerData,
      tableData: tableData,
    })

    const rectWidth = computed(() => state.width / headerData.length)

    const handleShowTip = (e, visible) => {
      const { tipsInfo } = state
      // console.log(d3.select(e.currentTarget).attr('id'))
      state.tipsInfo = {
        ...tipsInfo,
        visible: visible,
        top: e.offsetY + 10,
        left: e.offsetX + 10,
      }
    }

    const init = () => {
      xScale = d3
        .scaleBand()
        .domain(d3.range(headerData.length))
        .rangeRound([0, state.width - margin.left - margin.right])

      initHeader()
      initTable()
    }

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
        .attr('stroke', borderColor)

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
        .attr('stroke', borderColor)

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

    let moveInfo = {}

    //开始drag
    const dragStart = (d, i, a, node) => {
      const originTransform = node.attr('transform')
      const prefix = originTransform ? `${originTransform}` : ''
      moveInfo = {
        x: d.x,
        y: d.y,
        prefix,
      }
    }

    //drag
    const dragDrag = function (d, i, a, node) {
      const diffX = d.x - moveInfo.x
      node.attr('transform', `${moveInfo.prefix}translate(${diffX}, 0)`)

      console.log('___dragDrag___')
    }

    // 结束 drag
    const dragEnd = (d, i, a, node) => {
      const yList = node
        .attr('transform')
        .match(/\d*,/g)
        .map(i => parseFloat(i.replace(',', '')))
      const allYPos = yList.reduce((result, item) => (result += item), 0)

      const unitCount = Math.ceil(allYPos / (unref(rectWidth) / dateRang))
      console.log('___dragEnd___相对原点移动位置', allYPos, unitCount)
    }

    // drag 移动
    var dragHandler = d3
      .drag()
      .on('start', function (d, i, a) {
        const node = d3.select(this)
        dragStart(d, i, a, node)
      })
      .on('drag', function (d, i, a) {
        const node = d3.select(this)
        dragDrag(d, i, a, node)
      })
      .on('end', function (d, i, a) {
        const node = d3.select(this)
        dragEnd(d, i, a, node)
      })

    // zoom 缩放
    // var zoomHandler  =d3.zoom()

    // 渲染 bar
    const renderBar = ({ i, data }) => {
      const g = tableChart.append('g')

      const gs = g.selectAll('rect').data(data).enter()
      // 行 的小格
      gs.append('rect')
        .attr('x', function (d, j) {
          return (
            rectWidth.value * (d.week - 1) +
            (rectWidth.value / dateRang) * (d.start - 1)
          )
        })
        .attr('y', i * rectHeight + 15)
        .attr('rx', 3)
        .attr('ry', 3)
        .attr('width', function (d, j) {
          return (rectWidth.value / dateRang) * (d.end - d.start + 1)
        })
        .attr('height', 50)
        .attr('fill', function (d, j) {
          return nodeTypeColor[d.nodeType]?.color || defaultBarColor
        })
        .attr('stroke', defaultBarBorderColor)
        .attr('id', function (d, j) {
          return `str${d.id}`
        })
        .attr('nextId', function (d, j) {
          return d.nextId
        })
        .on('click', function (e) {
          const nextId =
            data.find(item => item.id == e.currentTarget.id.split('str')[1])
              .nextId ?? []
          nextId.push(e.currentTarget.id.split('str')[1])

          if (!d3.select(this).attr('data-active')) {
            nextId.forEach(id => {
              d3.select(document.querySelector(`#str${id}`))
                .transition()
                .duration(500)
                .attr('fill', activeBarColor)
                .attr('data-active', 'active')
            })
          } else {
            nextId.forEach(id => {
              d3.select(document.querySelector(`#str${id}`))
                .transition()
                .duration(500)
                .attr('fill', defaultBarColor)
                .attr('data-active', '')
            })
          }
        })
        .on('mouseover', function (e) {
          // console.log(d3.select(this).attr('id'))
          handleShowTip(e, true)
        })
        .on('mousemove', function (e) {
          handleShowTip(e, true)
        })
        .on('mouseleave', function (e) {
          handleShowTip(e, false)
        })
        .call(dragHandler)
        .call(
          d3.zoom().on('zoom', function () {
            d3.select(this).attr('transform', d3.event.transform)
          })
        )

      // 每一行下面的 分格 线
      g.append('line')
        .attr('x1', 0)
        .attr('y1', (i + 1) * rectHeight + 10)
        .attr('x2', state.width)
        .attr('y2', (i + 1) * rectHeight + 10)
        .attr(
          'style',
          `stroke-width: 1; stroke: ${rowBorderColor}; fill: none;`
        )
    }

    const renderLine = ({ i, data }) => {
      const g = tableChart.append('g')

      const gs = g.selectAll('circle').data(data).enter().append('g')

      const onWayList = data.map(item => item.onWay)
      const max = d3.max(onWayList) + 5
      const min = d3.min(onWayList) - 5

      // 计算 x 位置
      const calcurXline = function (d) {
        const xPos =
          rectWidth.value * (d.week - 1) +
          (rectWidth.value / dateRang) * (d.start - 1)
        return xPos
      }

      // 计算 y 位置
      const calcurYline = function (d) {
        const yPos =
          rectHeight * (i + 1) -
          ((d.onWay - min) / ((max - min) / rectHeight) - 10)
        return yPos
      }

      gs.append('line')
        .attr('x1', function (d, j) {
          return calcurXline(d)
        })
        .attr('y1', function (d, j) {
          return calcurYline(d)
        })
        .attr('y2', function (d, j) {
          return calcurYline(d)
        })
        .attr('x2', function (d, j) {
          const nextData = data[j + 1]
          return nextData ? calcurXline(nextData) : calcurXline(d)
        })
        .attr('stroke', lineColor)

      gs.append('line')
        .attr('x1', function (d, j) {
          const nextData = data[j + 1]
          return nextData ? calcurXline(nextData) : calcurXline(d)
        })
        .attr('y1', function (d, j) {
          return calcurYline(d)
        })
        .attr('y2', function (d, j) {
          const nextData = data[j + 1]
          return nextData ? calcurYline(nextData) : calcurYline(d)
        })
        .attr('x2', function (d, j) {
          const nextData = data[j + 1]
          return nextData ? calcurXline(nextData) : calcurXline(d)
        })
        .attr('stroke', lineColor)

      gs.append('circle')
        .attr('r', 3)
        .attr('cx', function (d, j) {
          return calcurXline(d)
        })
        .attr('cy', function (d, j) {
          return calcurYline(d)
        })
        .attr('id', function (d, j) {
          return d.id
        })
        .attr('fill', circleColor)
        .on('mouseover', function (e) {
          handleShowTip(e, true)
        })
        .on('mousemove', function (e) {
          handleShowTip(e, true)
        })
        .on('mouseleave', function (e) {
          handleShowTip(e, false)
        })

      // 每一行下面的 分格 线
      g.append('line')
        .attr('x1', 0)
        .attr('y1', (i + 1) * rectHeight + 10)
        .attr('x2', state.width)
        .attr('y2', (i + 1) * rectHeight + 10)
        .attr(
          'style',
          `stroke-width: 1; stroke: ${rowBorderColor}; fill: none;`
        )
    }

    const initTable = () => {
      tableChart = d3.select('#tableChart')

      // 每一行数据
      for (let i = 0; i < tableData.length; i++) {
        const { type, data } = tableData[i]
        if (type === 'bar') {
          renderBar({ i, data })
        } else if (type === 'line') {
          renderLine({ i, data })
        }
      }
    }

    onMounted(() => {
      init()
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  overflow: auto;
  position: relative;

  .tips-section {
    position: absolute;
    width: 200px;
    height: 200px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #fff;
  }
}
</style>