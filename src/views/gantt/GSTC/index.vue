<!--
 * @Description: 
 * @Date: 2021-09-13 11:20:43
 * @LastEditTime: 2021-09-15 14:35:58
 * @FilePath: \jsplumb-test\src\views\gantt\GSTC\index.vue
-->
<template>
  <div class="wrapper">
    <el-button @click="handleGetData">获取数据</el-button>
    <el-button @click="handleAddRow">添加row</el-button>
    <el-button @click="handleAddItem">添加Item</el-button>
    <div class="gstc-wrapper" ref="gstcRef"></div>
    <EditModal v-if="modal.visible" :title="modal.title" @onCancel="handleModalCancel" @onOk="handleModalOk" :dataSource="modal.data" />
    <!-- <infor-modal
      :visible="modal.visible"
      :title="modal.title"
      :dataSource="modal.data"
      @handleModal="closeModal"
    /> -->
  </div>
</template>

<script>
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import GSTC from 'gantt-schedule-timeline-calendar'
import { Plugin as TimelinePointer } from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js'
import { Plugin as ItemMovement } from 'gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js'
import { Plugin as Selection } from 'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js'
import { Plugin as ItemResizing } from 'gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js'
import { Plugin as Bookmarks } from 'gantt-schedule-timeline-calendar/dist/plugins/time-bookmarks.esm.min.js'

import 'gantt-schedule-timeline-calendar/dist/style.css'
import { toRefs } from '@vue/reactivity'

import EditModal from './Edit.modal'

export default {
  components: {
    EditModal,
  },
  props: {},
  setup(_, context) {
    let gstc,
      gstcState,
      lastRowId = 0,
      lastCellId = 0
    const state = reactive({
      selectedCell: [],
      modal: {
        visible: false,
        title: '',
        data: {},
      },
      subs: [],
    })
    const gstcRef = ref(null)

    function addListenClick(element, data) {
      const onClick = e => {
        e.preventDefault()
        alert(`Event ${data.item.id} clicked!`)
        state.modal = {
          visible: true,
          title: data.item.label,
          data,
        }
        // return false
      }
      element.addEventListener('dblclick', onClick)
      return {
        update(element, newData) {
          // console.log(newData)
          data = newData
        },
        destroy(element, data) {
          element.removeEventListener('click', onClick)
        },
      }
    }

    const handleModalCancel = () => {
      state.modal = {
        visible: false,
        title: '',
        data: {},
      }
    }

    const handleModalOk = name => {
      gstcState.update(
        `config.chart.items.${state.modal.data.item.id * 1}`,
        row => {
          row.label = name
          return row
        }
      )
      handleModalCancel()
    }

    const handleGetData = () => {
      console.log(gstcState.data.config)
    }

    const handleAddRow = rowName => {
      // console.log(GSTC.api.GSTCID(String(6+1)))
      let id = lastRowId++
      const row = {
        id: id,
        order: '订单' + id,
        label: '洗衣机总装',
        line: '线体' + id,
      }
      gstcState.update(`config.list.rows.${row.id}`, row)
    }

    const handleAddItem = () => {
      const rowCell = state.selectedCell['chart-timeline-grid-row-cell']
      let rowIds = rowCell.map(item => item.row.id)

      rowIds = Array.from(new Set(rowIds))

      rowIds.forEach(rowItem => {
        const length = rowCell.length
        const item = {
          id: lastCellId++,
          rowId: rowItem,
          label: '任务',
          time: {
            start: rowCell[0].time.leftGlobal,
            end: rowCell[length - 1].time.rightGlobal,
          },
        }
        gstcState.update(`config.chart.items.${item.id}`, item)
      })
    }

    onMounted(() => {
      const config = {
        licenseKey:
    '====BEGIN LICENSE KEY====\nXOfH/lnVASM6et4Co473t9jPIvhmQ/l0X3Ewog30VudX6GVkOB0n3oDx42NtADJ8HjYrhfXKSNu5EMRb5KzCLvMt/pu7xugjbvpyI1glE7Ha6E5VZwRpb4AC8T1KBF67FKAgaI7YFeOtPFROSCKrW5la38jbE5fo+q2N6wAfEti8la2ie6/7U2V+SdJPqkm/mLY/JBHdvDHoUduwe4zgqBUYLTNUgX6aKdlhpZPuHfj2SMeB/tcTJfH48rN1mgGkNkAT9ovROwI7ReLrdlHrHmJ1UwZZnAfxAC3ftIjgTEHsd/f+JrjW6t+kL6Ef1tT1eQ2DPFLJlhluTD91AsZMUg==||U2FsdGVkX1/SWWqU9YmxtM0T6Nm5mClKwqTaoF9wgZd9rNw2xs4hnY8Ilv8DZtFyNt92xym3eB6WA605N5llLm0D68EQtU9ci1rTEDopZ1ODzcqtTVSoFEloNPFSfW6LTIC9+2LSVBeeHXoLEQiLYHWihHu10Xll3KsH9iBObDACDm1PT7IV4uWvNpNeuKJc\npY3C5SG+3sHRX1aeMnHlKLhaIsOdw2IexjvMqocVpfRpX4wnsabNA0VJ3k95zUPS3vTtSegeDhwbl6j+/FZcGk9i+gAy6LuetlKuARjPYn2LH5Be3Ah+ggSBPlxf3JW9rtWNdUoFByHTcFlhzlU9HnpnBUrgcVMhCQ7SAjN9h2NMGmCr10Rn4OE0WtelNqYVig7KmENaPvFT+k2I0cYZ4KWwxxsQNKbjEAxJxrzK4HkaczCvyQbzj4Ppxx/0q+Cns44OeyWcwYD/vSaJm4Kptwpr+L4y5BoSO/WeqhSUQQ85nvOhtE0pSH/ZXYo3pqjPdQRfNm6NFeBl2lwTmZUEuw==\n====END LICENSE KEY====',
        innerHeight: 500,
        list: {
          // 行属性
          rows: {
            1: {
              id: '1',
              order: '订单1',
              label: '压缩机',
              line: '线体1',
              expanded: true,
            },
            2: {
              id: '2',
              order: '订单2',
              label: '门体',
              // parentId: '1',
              line: '线体2',
              expanded: true,
            },
            3: {
              id: '3',
              order: '订单3',
              label: '箱体',
              line: '线体3',
              parentId: '2',
            },
            4: {
              id: '4',
              order: '订单4',
              label: '空调总装',
              line: '线体4',
            },
            5: {
              id: '5',
              order: '订单5',
              label: '冰箱总装',
              line: '线体5',
            },
            6: {
              id: '6',
              order: '订单6',
              label: '洗衣机总装',
              line: '线体6',
            },
          },
          // 列定义
          columns: {
            data: {
              id: {
                id: 'id',
                data: 'id',
                width: 50,
                header: {
                  content: '序号',
                },
              },
              order: {
                id: 'order',
                data: 'order',
                width: 120,
                header: {
                  content: '生产订单',
                },
              },
              label: {
                id: 'label',
                data: 'label',
                width: 120,
                expander: true,
                header: {
                  content: '描述',
                },
              },
              line: {
                id: 'line',
                data: 'line',
                width: 120,
                header: {
                  content: '线体',
                },
              },
            },
          },
        },
        chart: {
          time: {
            // 时间轴开始截至，
            from: new Date().getTime() - 2 * 24 * 60 * 60 * 1000,
            to: new Date().getTime() + 168 * 24 * 60 * 60 * 1000,
            zoom: 20, // 10-22 缩放，默认 Shift + 滚轮， 默认缩放展示时间粒度， 一共有 小时、天、周、月、年
          },
          items: {
            1: {
              id: '1',
              rowId: '1',
              label: 'Item 1',
              time: {
                start: new Date().getTime() + 1 * 24 * 60 * 60 * 1000,
                end: new Date().getTime() + 2 * 24 * 60 * 60 * 1000,
              },
              style: {
                background: 'blue',
              },
            },
            21: {
              id: '21',
              rowId: '2',
              label: 'Item 2-1',
              time: {
                start: new Date().getTime() + 2 * 24 * 60 * 60 * 1000,
                end: new Date().getTime() + 3 * 24 * 60 * 60 * 1000,
              },
              style: {
                background: '#DAA520',
              },
            },
            22: {
              id: '22',
              rowId: '2',
              label: 'Item 2-2',
              time: {
                start: new Date().getTime() + 3 * 24 * 60 * 60 * 1000,
                end: new Date().getTime() + 4 * 24 * 60 * 60 * 1000,
              },
            },
            3: {
              id: '3',
              rowId: '3',
              label: 'Item 3',
              time: {
                start: new Date().getTime() + 3 * 24 * 60 * 60 * 1000,
                end: new Date().getTime() + 5 * 24 * 60 * 60 * 1000,
              },
            },
            4: {
              id: '4',
              rowId: '4',
              label: 'Item 4',
              time: {
                start: new Date().getTime() + 2 * 24 * 60 * 60 * 1000,
                end: new Date().getTime() + 5 * 24 * 60 * 60 * 1000,
              },
            },
            5: {
              id: '5',
              rowId: '5',
              label: 'Item 5',
              time: {
                start: new Date().getTime() + 3 * 24 * 60 * 60 * 1000,
                end: new Date().getTime() + 5 * 24 * 60 * 60 * 1000,
              },
            },
            6: {
              id: '6',
              rowId: '6',
              label: 'Item 6',
              time: {
                start: new Date().getTime() + 5 * 24 * 60 * 60 * 1000,
                end: new Date().getTime() + 6 * 24 * 60 * 60 * 1000,
              },
            },
          },
        },
        locale: {
          name: 'zh',
          Now: '现在',
          weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
          months: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月',
          ],
        },

        actions: {
          'chart-timeline-items-row-item': [addListenClick], // 监听事件
        },
        plugins: [
          TimelinePointer(),
          Selection({
            events: {
              // @ts-ignore
              onStart(lastSelected) {
                // we can clear selection each time we start to prevent shift+select multiple cells
                // gstc.api.plugins.selection.selectCells([]);
                console.log('selecting start')
              },
              // @ts-ignore
              onSelecting(selecting, lastSelected) {
                const filtered = selecting
                // console.log('Selecting cells', filtered['chart-timeline-grid-row-cell']);
                // console.log('Selecting items', filtered['chart-timeline-items-row-item']);
                return selecting
              },
              // @ts-ignore
              onEnd(selected, lastSelected) {
                const filtered = selected
                state.selectedCell = filtered
                console.log(
                  'Selected cells',
                  filtered['chart-timeline-grid-row-cell']
                )
                console.log(
                  'Selected items',
                  filtered['chart-timeline-items-row-item']
                )
                return filtered
              },
            },
          }),
          ItemResizing(),
          // 拖动 x 横向， y 纵向
          ItemMovement(),
          Bookmarks,
        ],
      }
      gstcState = GSTC.api.stateFromConfig(config)
      gstc = GSTC({
        element: gstcRef.value,
        state: gstcState,
      })
      lastRowId = Math.max.apply(null, Object.keys(config.list.rows)) + 1
      lastCellId = Math.max.apply(null, Object.keys(config.chart.items)) + 1
    })

    onUnmounted(() => {
      if (gstc) {
        gstc.destroy()
      }
    })

    return {
      gstcRef,
      ...toRefs(state),
      handleModalCancel,
      handleModalOk,
      handleGetData,
      handleAddRow,
      handleAddItem,
    }
  },
  // beforeDestroy() {
  //   this.subs.forEach(unsub => unsub());
  // }
}
</script>
<style lang="less" scoped>
// .wrapper .gantt-elastic__grid-line-time {
//   display: none;
// }
</style>