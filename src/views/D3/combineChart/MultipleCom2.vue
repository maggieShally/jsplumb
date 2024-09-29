<!--
 * @Description: 多条连线
 * @Date: 2023-02-24 16:39:42
 * @LastEditTime: 2024-09-26 10:48:41
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\combineChart\MultipleCom2.vue
-->

<template>
  <div>

    <div style="margin-bottom: 50px">
      <el-table :data="tableData" border>
        <el-table-column label="名称" prop="category" width="150px" />
        <el-table-column v-for="(item, index) in columns" :label="item.label" :prop="item.key" :key="item.key" :width="columnWidth" align="center">
          <template #default="scope">
            <div style="margin-left: -12px" class="cell-wrapper">
              <div class="dragg-wrap" :style="{left: -168 * index + (180 - 80) / 2 + 'px'}" v-if="scope.row[scope.column.rawColumnKey]?.chartType">
                <VueDragResize :isResizable="false" :isActive="true" :w="80" :h="80" :x="scope.row[scope.column.rawColumnKey].left" :parentH="90" :parentW="168*columns.length" :parentLimitation="true" v-on:dragstop="event => resize(event, scope.$index, scope.column.rawColumnKey)" :key="scope.row[scope.column.rawColumnKey].key">
                 <Component :is="`${scope.row[scope.column.rawColumnKey].chartType}`" :label="scope.row[scope.column.rawColumnKey].label" />
                </VueDragResize>
              </div>

              <template v-else>
                {{scope.row[scope.column.rawColumnKey]?.label}}
              </template>

              <template v-if="scope.row[scope.column.rawColumnKey]?.chartType">
                <div :id="`Str${scope.row[scope.column.rawColumnKey]?.id}`" class="strBox"></div>
                <div class="line-wrap" v-if="scope.row[scope.column.rawColumnKey]?.nextIds">
                  <template v-for="item in scope.row[scope.column.rawColumnKey]?.nextIds" :key="item.targetColumnKey + item.targetRowId">
                    <div class="first" :style="{width: item.keyInfo.firstWidth}"></div>
                    <div class="second" :style="{height:item.keyInfo.secondHeight,top: item.keyInfo.secondTop,left: item.keyInfo.secondLeft}"></div>
                    <div class="third" :style="{width: item.keyInfo.thirdWidth, top: item.keyInfo.thirdTop,left: item.keyInfo.thirdLeft}">
                      <div :class="['four', item.keyInfo.fourItem]"></div>
                    </div>
                  </template>
                </div>
              </template>
            </div>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <TableNextModal v-if="showNext" @onCancel="showNext = false" />
  </div>
</template>

<script>
import { reactive, toRefs, nextTick, onMounted } from 'vue'
import lodash from 'lodash'
import VueDragResize from 'vue-drag-resize'

import { columns } from './data.js'

import TableNextModal from './Table.modal.vue'

import SquareCom from './Square.vue'
import TriangleCom from './Triangle.vue'
import CircleCom from './Circle.vue'


export default {
  name: 'MultipleCom2',
  components: {
    VueDragResize,
    TableNextModal,
    SquareCom,
    TriangleCom,
    CircleCom,
  },
  setup() {
    
    const getFirstWidth = '12px'

    const data = [
      {
        id: 1,
        category: '外购下单',
        d0: {
          chartType: 'SquareCom',
          label: '采购明细',
          nextIds: [
            {
              targetRowId: 2,
              targetColumnKey: 'd1',
            },
          ],
        },
        d2: {
          chartType: 'SquareCom',
          label: '采购明细D2',
          nextIds: [
            {
              targetRowId: 6,
              targetColumnKey: 'd3',
            },
            {
              targetRowId: 3,
              targetColumnKey: 'd5',
            },
          ],
        },
      },
      {
        id: 2,
        category: '运输',
        d1: {
          chartType: 'TriangleCom',
          label: '运输',
          nextIds: [
            {
              targetRowId: 5,
              targetColumnKey: 'd1',
            },
          ],
        },
      },
      {
        id: 3,
        category: '仓库',
        d5: {
          chartType: 'CircleCom',
          label: '仓库d5',
        },
      },
      {
        id: 5,
        category: '生产控制',
        d1: {
          chartType: 'TriangleCom',
          label: '生产控制',
          nextIds: [
            {
              targetRowId: 1,
              targetColumnKey: 'd2',
            },
          ],
        },
        d3: {
          chartType: 'TriangleCom',
          label: '生产控制d3',
        },
        d5: {
          chartType: 'TriangleCom',
          label: '生产控制d5',
        },
      },
      {
        id: 6,
        category: '产品入库',
        d3: {
          chartType: 'TriangleCom',
          label: '产品入库d3',
          nextIds: [
            {
              targetRowId: 5,
              targetColumnKey: 'd3',
            },
            {
              targetRowId: 5,
              targetColumnKey: 'd5',
            },
          ],
        },
      },
      {
        id: 7,
        category: '预估时间',
        d1: {
          label: '30',
        },
        d2: {
          label: '130',
        },
        d3: {
          label: '130',
        },
      },
    ]

    const state = reactive({
      columns: columns,
      tableData: [],

      columnWidth: 180,
      columnHeight: 80,

      showNext: false,
    })

    const handleDraggerStart = (element, column) => {
      console.log(element, column)
    }


    const resize = (newRect, rowIndex, columnKey) => {
      const nextColumnIndex = Math.floor(
        (newRect.left + state.columnWidth / 2) / 180
      )

      let rowId = state.tableData[rowIndex].id

      const nextColumnKey = `d${nextColumnIndex}`
      console.log(newRect)
      debugger
      if (state.tableData[rowIndex][nextColumnKey] && nextColumnKey !== columnKey) {
        alert('此处已有数据，不能停放')

        const originColumnIndex = state.columns.findIndex(i => i.key === columnKey)
        state.tableData[rowIndex][columnKey] = {
          ...state.tableData[rowIndex][columnKey],
          left: originColumnIndex * 168,
          key: new Date().getTime(),
        }
        return false
      }

      state.tableData[rowIndex][nextColumnKey] = {
        ...lodash.clone(state.tableData[rowIndex][columnKey]),
        left: nextColumnIndex * 168,
      }

      if (nextColumnIndex !== Number(columnKey.replace('d', ''))) {
        delete state.tableData[rowIndex][columnKey]

        // 更新位置后，连此节点的nextIds 的targetColumnKey也要变更
        let parentInfo = []
        state.tableData.forEach((item, rowIndex) => {
          state.columns.forEach(columnItem => {
            item[columnItem.key]?.nextIds?.forEach(nexIdItem => {
              if (
                nexIdItem.targetColumnKey === columnKey &&
                nexIdItem.targetRowId === rowId
              ) {
                nexIdItem.targetColumnKey = nextColumnKey
                parentInfo.push({
                  rowIndex,
                  columnKey: columnItem.key,
                })
              }
            })
          })
        })

        // 更新当前节点到子节点的 路径线数据
        state.tableData[rowIndex][nextColumnKey].nextIds?.forEach(
          (item, nextIdIndex) => {
            console.log(nextColumnKey)
            debugger
            item.keyInfo = calcLineStyle({
              item,
              rowIndex,
              columnKey: nextColumnKey,
              nextIdIndex
            })
          }
        )

        // 更新当前节点的 父节点到当前节点的路径线数据
        parentInfo.forEach(pItem => {
          state.tableData[pItem.rowIndex][pItem.columnKey]?.nextIds?.forEach(
            (item, nextIdIndex) => {
              console.log(nextColumnKey)

              item.keyInfo = calcLineStyle({
                item,
                rowIndex: pItem.rowIndex,
                columnKey: pItem.columnKey,
                nextIdIndex
              })
            }
          )
        })
      }
    }

    const calcLineStyle = ({ item, rowIndex, columnKey, nextIdIndex}) => {
      const { targetRowId, targetColumnKey } = item

      const sourceColumnIndex = columns.findIndex(i => i.key === columnKey)
      const targetRowIndex = data.findIndex(i => i.id === targetRowId)
      const targetColumnIndex = columns.findIndex(
        i => i.key === targetColumnKey
      )

      const tableCellHeight = state.columnHeight + 20

      const tableCellWidth = state.columnWidth

      // 由三条件组成，横，坚，横 ,箭头

      const fourItemClass = (function () {
        if (targetColumnKey === columnKey) {
          if (targetRowIndex - rowIndex < 0) {
            return 'top'
          } else {
            return 'bottom'
          }
        } else {
          return targetRowIndex - rowIndex < 0 ? '' : 'right'
        }
      })()

      const firstWidth = (function () {
        if (targetColumnIndex === sourceColumnIndex) {
          return 0
        }
        let width = 0.5 * tableCellWidth
        return width
      })()

      const secondLeft = (function () {
        if (targetColumnIndex === sourceColumnIndex) {
          return 4
        }
        return 0.5 * tableCellWidth
      })()

      const secondTop = (function () {
        if (targetRowIndex > rowIndex) {
          return 0
        } else {
          const diff = targetColumnIndex === sourceColumnIndex ? 0.5 : 0
          return (
            Math.abs(targetRowIndex - rowIndex + diff) * -1 * tableCellHeight
          )
        }
      })()

      const secondHeight = (function () {
        if (targetColumnIndex === sourceColumnIndex) {
          return (Math.abs(targetRowIndex - rowIndex) - 0.5) * tableCellHeight
        }
        return Math.abs(targetRowIndex - rowIndex) * tableCellHeight
      })()

      const thirdWidth = (function () {
        if (targetColumnIndex === sourceColumnIndex) {
          return 0
        }
        return (
          (targetColumnIndex - sourceColumnIndex - 1 + 0.2) * tableCellWidth
        )
      })()

      const thirdTop = (function () {
        return secondHeight * (targetRowIndex - rowIndex < 0 ? -1 : 1)
      })()

      return {
        firstWidth: firstWidth + 'px',
        secondHeight: secondHeight + 'px',
        secondTop: secondTop + 'px',
        secondLeft: secondLeft + 'px',
        thirdWidth: thirdWidth + 'px',
        thirdTop: thirdTop + 'px',
        thirdLeft: firstWidth + 'px',
        fourItem: fourItemClass,
      }
    }

    const calcItemLineStyle = (itemData, rowIndex) => {
      for (let i = 0; i < columns.length; i++) {
        const columnKey = columns[i].key

        if (itemData[columnKey]?.nextIds?.length) {
          itemData[columnKey]?.nextIds?.forEach((item, nextIdIndex) => {
            item.keyInfo = calcLineStyle({ item, rowIndex, columnKey, nextIdIndex })
          })
        }
      }
    }

    const calcData = data => {
      data.forEach((item, rowIndex) => {
        state.columns
        for (let key in item) {
          const index = state.columns.findIndex(i => i.key === key)
          if (index !== -1) {
            item[key].left = index * 168
          }
        }

        calcItemLineStyle(item, rowIndex)
      })
      return data
    }

    onMounted(() => {
      state.tableData = calcData(data)
    })

    return {
      ...toRefs(state),
      resize,
      handleDraggerStart,
    }
  },
}
</script>

<style lang="less" scoped>
@color: #ffa011;

.cell-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

.vdr.active:before {
  outline: none !important;
}

.dragg-wrap {
  position: absolute;
  width: 500px;
  height: 80px;
}

.line-wrap {
  display: inline-block;
  position: absolute;
  z-index: 999;
  top: 50%;

  .first {
    width: 10px;
    height: 2px;
    background: @color;
    position: absolute;
    left: 0;
  }

  .second {
    width: 2px;
    height: 80px;
    background: @color;
    position: absolute;
    right: 50%;
  }

  .third {
    width: 100px;
    height: 2px;
    background: @color;
    position: absolute;
    top: 50px;
    left: 50%;
  }

  .four {
    width: 2px;
    // height: 2px;
    background: @color;
    position: absolute;
    top: 0;
    left: 100%;

    &:before {
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent transparent @color;
      position: absolute;
      left: 100%;
      transform: translate(-50%, -40%);
      top: 50%;
    }

    &.top {
      &::before {
        border-color: transparent transparent @color transparent;
        top: -5px;
        left: 250%;
      }
    }

    &.bottom {
      &::before {
        border-color: @color transparent transparent transparent;
        top: 2px;
        left: 250%;
      }
    }
  }
}

.counter-progress {
  width: 70%;
  padding: 2px;
  height: 10px;
  display: inline-block;
  position: relative;
  border-radius: 0px;
  text-align: center;
  overflow: hidden;
  background-color: rgba(221, 221, 221, 1);
  font-size: 12px;

  &.noBg {
    background-color: rgba(221, 221, 221, 0.3);
    .counter-progress-bg {
      background-color: rgba(64, 158, 255, 0.2);
    }
  }

  &.emptyBg {
    background-color: rgba(123, 124, 136, 0.2);
  }

  .counter-progress-bg {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 0;
    background-color: rgba(64, 158, 255, 1);
  }

  .counter-progress-text {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #fff;
    z-index: 3;
    line-height: 1em;
  }
}

.operate-text {
  margin: 0 0 0 10px;
  font-size: 12px;
}

:deep(.el-table .el-table__cell) {
  z-index: auto;
}
</style>
