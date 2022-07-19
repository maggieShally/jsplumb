<!--
 * @Description: 
 * @Date: 2022-04-02 10:34:27
 * @LastEditTime: 2022-04-07 09:20:17
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\barChart\index.vue
-->
<template>
  <h3>图</h3>
  <Table />

<!--
  <div class="bar-chart">
    <div id="container"></div>
  </div>
-->
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { PivotSheet, S2Event, measureTextWidth, DataCell } from '@antv/s2'
import Table from './Table.vue'
import { data } from './data.js'

export default {
  name: 'BarChart',
  components: {
    Table
  },
  setup() {
    const state = reactive({
      dataCfg: data
    })
    let s2

    // 进度条
    const PROGRESS_BAR = {
      width: 80,
      height: 10,
      innerHeight: 6
    }

    // 当前进度状态颜色
    const STATUS_COLOR = {
      healthy: '#30BF78',
      late: '#FAAD14',
      danger: '#F4664A'
    }

    const DERIVE_COLOR = {
      up: '#F4664A',
      down: '#30BF78'
    }

    // 间距
    const PADDING = 10

    function getStatusColorByProgress(realProgress, expectedProgress) {
      const leftWorker = expectedProgress - realProgress
      if (leftWorker <= 0.1) {
        return STATUS_COLOR.healthy
      }
      if (leftWorker > 0.1 && leftWorker <= 0.3) {
        return STATUS_COLOR.late
      }
      return STATUS_COLOR.danger
    }

    const CONTAINER_COLOR = '#E9E9E9'

    class KpiStrategyDataCell extends DataCell {
      // 重写数值单元格
      initCell() {
        super.initCell()
        // 在绘制完原本的单元格后, 再绘制进度条和衍生指标
        this.renderProgressBar()
      }

      // 如果是进度, 格式化为百分比 (只做 demo 示例, 请根据实际情况使用)
      getFormattedFieldValue() {
        const { data } = this.meta
        if (!data || !data.isProgress) {
          return super.getFormattedFieldValue()
        }
        const formattedValue = `${data.value * 100} %`
        return { formattedValue, value: data.value }
      }

      // 绘制子弹进度条
      renderProgressBar() {
        const { x, y, width, height, data } = this.meta
        // console.log(x, y, width, height,)
        if (!data || !data.isProgress) {
          return
        }
        const currentProgress = data.value
        const expectedProgress = data.expectedValue

        const currentProgressWidth = Math.min(
          PROGRESS_BAR.width * currentProgress,
          PROGRESS_BAR.width
        )

        // 总进度条
        this.addShape('rect', {
          attrs: {
            x: x,
            y: y + (height - PROGRESS_BAR.height) / 2,
            // x: x + width - PROGRESS_BAR.width - PADDING,
            // y: y + (height - PROGRESS_BAR.height) / 2,
            width: PROGRESS_BAR.width,
            height: PROGRESS_BAR.height,
            fill: CONTAINER_COLOR
          }
        })
        // 当前进度条
        this.addShape('rect', {
          attrs: {
            x: x,
            y: y + (height - PROGRESS_BAR.innerHeight) / 2,
            // x: x + width - PROGRESS_BAR.width - PADDING,
            // y: y + (height - PROGRESS_BAR.innerHeight) / 2,
            width: currentProgressWidth,
            height: PROGRESS_BAR.innerHeight,
            fill: getStatusColorByProgress(currentProgress, expectedProgress)
          }
        })
        

        // 添加线

        // this.addShape('rect', {
        //   attrs: {
        //     x: x + width - PROGRESS_BAR.width,
        //     y: y + (height - PROGRESS_BAR.innerHeight) / 2,
        //     width: 20,
        //     height: 2,
        //     fill: '#ddd'
        //   }
        // })

        // this.addShape('rect', {
        //   attrs: {
        //     x: x + width - PROGRESS_BAR.width + 20,
        //     y: y + (height - PROGRESS_BAR.innerHeight) / 2,
        //     width: 2,
        //     height: 200,
        //     fill: '#ddd',
        //     globalAlpha: 1
        //   }
        // })

      }
    }

    const init = () => {
      const container = document.getElementById('container')
      const s2Options = {
        width: 1500,
        height: 680,
        // tooltip: {
        //   operation: {
        //     trend: true,
        //     hiddenColumns: true,
        //   },
        // },
      
        // showSeriesNumber: true,
        // frozenRowCount: 1, // 行头冻结数量
        // frozenColCount: 1, // 列头冻结数量
        // frozenTrailingRowCount: 1, // 列尾冻结数量
        // frozenTrailingColCount: 1, // 列尾冻结数量
        conditions: {
          // interval: [
          //   {
          //     field: 'number',
          //     mapping(fieldValue, data) {
          //       console.log(fieldValue, data)
          //       return {
          //         fill: '#80BFFF',
          //         // 自定义柱状图范围
          //         isCompare: true,
          //         maxValue: 12000,
          //         minValue: 300
          //       }
          //     }
          //   }
          // ]
        },
        // interaction: {
        //   selectedCellsSpotlight: true,
        //   hoverHighlight: false
        // },
        dataCell: viewMeta => {
          return new KpiStrategyDataCell(viewMeta, viewMeta.spreadsheet)
        }
      }
      s2 = new PivotSheet(container, state.dataCfg, s2Options)
      s2.render()

      initMethods()
    }

    const initMethods = () => {
      s2.on(S2Event.DATA_CELL_CLICK, cells => {
        console.log('点击', cells)

        s2.interaction.setState({
          stateName: 'selected'
        })
        console.log(s2.interaction.isSelectedState())
      })
    }

    onMounted(() => {
      // init()
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less" scoped>
.bar-chart {
  width: 100%;
  height: 800px;
}
</style>
