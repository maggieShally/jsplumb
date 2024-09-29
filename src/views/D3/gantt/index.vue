<!--
 * @Description: 
 * @Date: 2022-04-13 11:45:22
 * @LastEditTime: 2023-04-10 17:13:47
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\gantt\index.vue
-->
<template>
  <el-form :mode="searchForm" :inline="true">
    <el-form-item prop="name" label="名称">
      <el-input v-model="searchForm.name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="search" @click="handleSearch">查 询</el-button>
    </el-form-item>
  </el-form>
  <div class="operate-section">
    <el-icon>
      <operation />
    </el-icon>
    <el-icon>
      <timer />
    </el-icon>
    <el-icon>
      <setting />
    </el-icon>
  </div>

  <el-table :data="tableData" border :span-method="arraySpanMethod" class="my-table-gantt">
    <el-table-column label="产品大类" prop="itemCategroy" width="150"></el-table-column>
    <el-table-column label="料号" prop="itemNo" width="150"></el-table-column>
    <el-table-column label="仓库" prop="store" width="100"></el-table-column>
    <el-table-column label="刻度" :width="svgMarginLeft">
      <template #default="scope">
        <div style="height: 100px;" :id="`svg${scope.$index}`">
        </div>
      </template>
    </el-table-column>
    <el-table-column v-for="item in headerData" :label="item.label" :key="item.value" :width="rectWidth">

      <!-- <template #default>ddd</template> -->
    </el-table-column>
  </el-table>

  <div v-if="tipsInfo.visible" class="tips-section" :style="{top: tipsInfo.top + 'px', left: tipsInfo.left  + 'px'}">
    <div>我是tips</div>
  </div>
</template>

<script>
import { getCurrentInstance, toRefs, reactive, onMounted, nextTick } from 'vue'
import { headerData, tableData } from './data.js'

export default {
  name: 'D3Gantt',
  setup() {
    const { proxy } = getCurrentInstance()

    const d3 = proxy.$d3

    // const circleColor = 'rgba(144,238,144, 1)'
    // const lineColor = 'rgba(144,238,144, 1)' // 折线颜色

    const config = {
      store: {
        circleColor: 'rgba(144,238,144, 1)', // 圆圈颜色
        lineColor: 'rgba(144,238,144, .5)', // 折线颜色
        lineWidth: 2,
        r: 3,
      },
      sales: {
        circleColor: 'rgba(0,100,0,  1)',
        lineColor: 'rgba(0,100,0,  1)',
        lineWidth: 1.5,
        r: 3,
      },
    }

    const state = reactive({
      headerData,
      tableData,
      svgMarginLeft: 80,
      rectWidth: 140,
      rectHeight: 100,
      dateRang: 7, // 周期分隔（周： 7）

      showTips: false,
      tipsInfo: {
        top: 0,
        left: 0,
        visible: false,
      },

      searchForm: {
        name: '',
      },
    })

    const arraySpanMethod = ({ row, column, rowIndex, columnIndex }) => {
      if (columnIndex === 3) {
        return [1, headerData.length + 1]
      } else if (columnIndex > 3) {
        return [0, 0]
      }
    }

    const handleShowTip = (e, visible) => {
      // console.log(e)
      const { tipsInfo, svgMarginLeft } = state
      // console.log(d3.select(e.currentTarget).attr('id'))
      state.tipsInfo = {
        ...tipsInfo,
        visible: visible,
        top: e.pageY - svgMarginLeft,
        left: e.pageX + 10,
      }
    }

    const init = () => {
      for (let i = 0; i < tableData.length; i++) {
        const svg = d3
          .select(`#svg${i}`)
          .append('svg')
          .attr('width', headerData.length * state.rectWidth)
          .attr('height', state.rectHeight)

        // renderNoneBar({ svg, data: tableData[i].data })

        i == 0 &&
          renderArea({
            svg,
            data: tableData[i].data,
            type: tableData[i].storeType,
          })

        i === 1 &&
          renderLine({
            svg,
            data: tableData[i].data,
            type: tableData[i].storeType,
          })

        renderMinMax({
          svg,
          data: tableData[i].data,
          index: i,
        })
      }
    }

    // 渲染底部隐藏bar
    const renderNoneBar = ({ svg, data, margin = 0 }) => {
      const { rectWidth, rectHeight } = state
      const dateRang = 1
      // const margin = 3
      const gs = svg.selectAll('rect').data(data).enter().append('g')
      gs.append('rect')
        .attr('x', function (d, j) {
          return 50 + (rectWidth / dateRang) * j
        })
        .attr('y', 0)
        .attr('rx', 3)
        .attr('ry', 3)
        .attr('width', function (d, j) {
          return rectWidth / dateRang - margin
        })
        .attr('height', rectHeight)
        // .attr('fill', '#ccc')
        .attr('fill', 'transparent')
        .attr('id', function (d, j) {
          console.log(d, j)
          return d.id
        })
        .on('click', function (e) {})
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
    }

    const renderMinMax = ({ svg, data, index }) => {
      const { rectHeight, svgMarginLeft } = state
      const left = (svgMarginLeft / 3) * 2
      const onWayList = data.map(item => item.onWay)
      const max = d3.max(onWayList) + 10
      // const min = d3.min(onWayList)
      const min = 0

      const gs = svg.append('g')

      var lines = [
        [left, 0],
        [left, rectHeight],
        [left - 10, rectHeight],
      ]

      var linePath = d3.line()

      gs.append('path')
        .attr('d', linePath(lines))
        .attr('stroke', '#000')
        .attr('stroke-width', 1)
        .attr('fill', 'none')

      const textX = left - 10
      gs.append('text')
        .text(min)
        .attr('x', textX)
        .attr('y', rectHeight)
        .style('text-anchor', 'end')
      gs.append('text')
        .text(Math.ceil(max / 2))
        .attr('x', textX)
        .attr('y', Math.ceil(rectHeight / 2))
        .style('text-anchor', 'end')
      gs.append('text')
        .text(max)
        .attr('x', textX)
        .attr('y', 10)
        .style('text-anchor', 'end')
    }

    const renderLine = ({ svg, data, type }) => {
      const { rectHeight, svgMarginLeft } = state

      const { circleColor, lineColor, lineWidth, r } = config[type]

      const gs = svg.selectAll('circle').data(data).enter().append('g')

      const onWayList = data.map(item => item.onWay)
      const max = d3.max(onWayList) + 10
      // const min = d3.min(onWayList)
      const min = 0

      // 计算 x 位置
      const calcurXline = function (d, i) {
        const { rectWidth, rectHeight, dateRang } = state
        const xPos = rectWidth * i + (rectWidth / dateRang) * (d.start - 1)
        return xPos + svgMarginLeft
      }

      // 计算 y 位置
      const calcurYline = function (d) {
        const yPos = rectHeight - (d.onWay - min) / ((max - min) / rectHeight)
        return yPos
      }

      gs.append('line')
        .attr('x1', function (d, j) {
          return calcurXline(d, j)
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
          return nextData ? calcurXline(nextData, j + 1) : calcurXline(d, j)
        })
        .attr(
          'style',
          `stroke-width: ${lineWidth}; stroke: ${lineColor}; fill: none;`
        )

      gs.append('circle')
        .attr('r', r)
        .attr('cx', function (d, j) {
          return calcurXline(d, j)
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
    }

    const renderArea = ({ svg, data, type }) => {
      const { rectHeight, svgMarginLeft } = state

      const gs = svg.append('g')

      const onWayList = data.map(item => item.onWay)
      const max = d3.max(onWayList) + 10
      // const min = d3.min(onWayList)
      const min = 0

      // 计算 x 位置
      const calcurXline = function (d, i) {
        const { rectWidth, rectHeight, dateRang } = state
        const xPos = rectWidth * i + (rectWidth / dateRang) * (d.start - 1)
        return xPos + svgMarginLeft
      }

      // 计算 y 位置
      const calcurYline = function (d) {
        const yPos = rectHeight - (d.onWay - min) / ((max - min) / rectHeight)
        return yPos
      }

      // 创建数据
      let datas = data.map((d, j) => {
        return {
          x: calcurXline(d, j),
          y: calcurYline(d),
        }
      })
      console.log(datas)

      // 创建辅助函数
      var curveFunc = d3
        .area()
        .x(function (d) {
          return d.x
        })
        .y1(function (d) {
          return d.y
        }) // 区域上边界坐标
        .y0(100) // 区域下边界坐标

      // 添加属性
      gs.append('path')
        .attr('d', curveFunc(datas))
        // .attr('stroke', 'black')
        .attr('fill', 'rgba(144,238,144, .5)')

      gs.on('mouseover', function (e) {
        handleShowTip(e, true)
      })
        .on('mousemove', function (e) {
          handleShowTip(e, true)
        })
        .on('mouseleave', function (e) {
          handleShowTip(e, false)
        })
    }

    onMounted(async () => {
      await nextTick()

      setTimeout(() => {
        init()
      })
    })

    return {
      ...toRefs(state),
      arraySpanMethod,
    }
  },
}
</script>

<style lang="less" scoped>
.my-table-gantt {
  :deep(.el-table__row .el-table__cell) {
    // padding: 0;
  }
}

.tips-section {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  z-index: 99;
}

.operate-section {
  padding: 0 100px 10px 0;
  display: flex;
  justify-content: flex-end;
  .el-icon {
    margin-left: 10px;
    cursor: pointer;

    &:hover {
      color: rgb(56, 123, 211);
    }
  }
}
</style>