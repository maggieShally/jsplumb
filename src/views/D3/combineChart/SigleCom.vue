<!--
 * @Description: 只有一个连线
 * @Date: 2023-02-24 16:37:38
 * @LastEditTime: 2023-02-27 15:34:40
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\combineChart\SigleCom.vue
-->

<template>
  <div style="marginBottom: 50px">
    <el-table :data="tableData">
      <el-table-column label="类别" prop="category" width="150px" />
      <el-table-column v-for="item in columns" :label="item.label" :prop="item.key" :key="item.key" width="180px" align="center">
        <template #default="scope">
          <div style="marginLeft: -12px" class="cell-wrapper">

            <Component v-if="scope.row[scope.column.rawColumnKey]?.chartType" :is="`${scope.row[scope.column.rawColumnKey].chartType}`" :label="scope.row[scope.column.rawColumnKey].label" />

            <div :id="`Str${scope.row[scope.column.rawColumnKey]?.id}`" class="strBox"></div>

            <div class="line-wrap" v-if="scope.row[scope.column.rawColumnKey]?.nextIds">
              <div class="first" :style="{width: scope.row[scope.column.rawColumnKey].firstWidth}"></div>
              <div class="second" :style="{height:scope.row[scope.column.rawColumnKey].secondHeight, 
              top: scope.row[scope.column.rawColumnKey].secondTop,
              left: scope.row[scope.column.rawColumnKey].secondLeft,
              }"></div>
              <!-- <template v-for="item in scope.row[scope.column.rawColumnKey]?.nextIds" :key="item"> -->
              <div class="third" :style="{width: scope.row[scope.column.rawColumnKey].thirdWidth, 
              top: scope.row[scope.column.rawColumnKey].thirdTop,
              left: scope.row[scope.column.rawColumnKey].thirdLeft,
              }">
                <div :class="['four', scope.row[scope.column.rawColumnKey].fourItem]"></div>
              </div>
              <!-- </template> -->
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <TableNextModal v-if="showNext" @onCancel="showNext = false" />
</template>

<script>
import { reactive, toRefs, nextTick } from 'vue'
import { weeks, columns } from './data.js'

import TableNextModal from './Table.modal.vue'

import SquareCom from './Square.vue'
import TriangleCom from './Triangle.vue'

export default {
  name: 'SigleCom',
  components: {
    TableNextModal,
    SquareCom,
    TriangleCom,
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
          nextIds: {
            targetRowId: 2,
            targetColumnKey: 'd1',
          },
          // rowIndex: 1,
          // colIndex: 2,
          // firstWidth: getFirstWidth,
          // secondHeight: (2 - 1) * 80 + 'px',
          // secondTop: '0px',
          // thirdWidth: 180 * 0.75 + (2 - 2) * 180 + 'px',
          // thirdTop: (2 - 1) * 80 + 'px',
        },
        d2: {
          chartType: 'SquareCom',
          label: '采购明细D2',
          nextIds: {
            targetRowId: 5,
            targetColumnKey: 'd3',
          },
        },
      },
      {
        id: 2,
        category: '运输',
        d1: {
          chartType: 'TriangleCom',
          label: '运输',
          nextIds: {
            targetRowId: 5,
            targetColumnKey: 'd1',
          },
        },
      },
      {
        id: 3,
        category: '仓库',
      },
      {
        id: 5,
        category: '生产控制',
        d1: {
          chartType: 'TriangleCom',
          label: '生产控制',
          nextIds: {
            targetRowId: 1,
            targetColumnKey: 'd2',
          },
        },
        d3: {
          chartType: 'TriangleCom',
          label: '生产控制d3',
          nextIds: {
            targetRowId: 6,
            targetColumnKey: 'd3',
          },
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
          nextIds: {
            targetRowId: 5,
            targetColumnKey: 'd5',
          },
        },
      },
      {
        id: 7,
        category: '产能',
      },
    ]

    const state = reactive({
      columns: columns,
      tableData: (function () {
        data.forEach((item, rowIndex) => {
          for (let i = 0; i < columns.length; i++) {
            const columnKey = columns[i].key

            if (item[columnKey]?.nextIds) {
              console.log(columnKey)
              const { targetRowId, targetColumnKey } = item[columnKey]?.nextIds

              const sourceColumnIndex = columns.findIndex(
                i => i.key === columnKey
              )
              const targetRowIndex = data.findIndex(i => i.id === targetRowId)
              const targetColumnIndex = columns.findIndex(
                i => i.key === targetColumnKey
              )

              const tableCellHeight = 110
              const tableCellWidth = 180

              const firstWidth = (function () {
                return (targetColumnIndex - sourceColumnIndex) * tableCellWidth
              })()

              const secondLeft = (function () {
                return (targetColumnIndex - sourceColumnIndex) * tableCellWidth
              })()

              const secondTop = (function () {
                return targetRowIndex - rowIndex > 0
                  ? 0
                  : -(Math.abs(targetRowIndex - rowIndex) - 0.5) *
                      tableCellHeight
              })()

              const secondHeight = (function () {
                return (
                  (Math.abs(targetRowIndex - rowIndex) - 1 + 0.5) *
                  tableCellHeight
                )
              })()

              const thirdWidth = (function () {
                if (targetColumnIndex > sourceColumnIndex) {
                  return 0
                }
                return (sourceColumnIndex - targetColumnIndex) * 168
              })()

              const thirdTop = (function () {
                if (targetRowIndex < rowIndex) {
                  return secondTop
                }
                return secondHeight
              })()

              const fourItemClass = (function () {
                if (targetRowIndex > rowIndex) {
                  return 'bottom'
                } else {
                  return 'top'
                }
              })()

              const keyInfo = {
                firstWidth: firstWidth + 'px',
                secondHeight: secondHeight + 'px',
                secondTop: secondTop + 'px',
                secondLeft: secondLeft + 'px',

                thirdWidth: thirdWidth + 'px',
                thirdTop: thirdTop + 'px',
                thirdLeft: firstWidth + 'px',
                fourItem: fourItemClass,
              }
              item[columnKey] = {
                ...item[columnKey],
                ...keyInfo,
              }
            }
          }
        })
        console.log(data)
        return data
      })(),

      showNext: false,
    })

    let initWidth = 12
    const handleShowLine = async (e, ids, scope) => {
      const targetEvent = e.currentTarget.getBoundingClientRect()

      await nextTick()

      console.log(window.getComputedStyle(e.currentTarget).top, ids)

      const targetEventList = ids.map(id => {
        return document.querySelector(`#Str${id}`)
      })

      const lineElement = e.currentTarget.nextElementSibling

      const thirdList = lineElement.querySelectorAll('.third')

      let maxHeight = 0,
        minHeight = 0,
        heightList = [],
        secondTop = 0

      thirdList.forEach((item, index) => {
        const clientRect = targetEventList[index].getBoundingClientRect()

        const offX = clientRect.x - targetEvent.x - targetEvent.width
        const offY = clientRect.y - targetEvent.y - targetEvent.height
        minHeight = offY < 0 && offY < minHeight ? offY : minHeight
        maxHeight = offY > 0 && offY > maxHeight ? offY : maxHeight

        // 尽量让线终点在单元格中间
        item.style.width = (offX < 0 ? -offX - 50 : offX + 30) + 'px'

        if (offX < 0) {
          item.style.transform = 'translate(-100%)'
          item.classList.add('rightArrow')
          item.querySelector('.four').style.left = 0
        } else {
          item.classList.add('leftArrow')
        }
        if (offY < 0) {
          secondTop = offY < secondTop ? offY : secondTop
        }
        heightList.push(top)
        item.style.top = offY + 'px'
      })

      lineElement.querySelector('.first').style.width = initWidth + 'px'
      lineElement.querySelector('.second').style.height =
        maxHeight - minHeight + 'px'
      lineElement.querySelector('.second').style.top = secondTop + 'px'
    }

    const handleShowNextInfo = () => {
      state.showNext = true
    }

    return {
      ...toRefs(state),
      handleShowLine,
      handleShowNextInfo,
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
  height: 90px;
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
    left: 2px;

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
        left: -50%;
      }
    }

    &.bottom {
      &::before {
        border-color: @color transparent transparent transparent;
        top: 0;
        left: -50%;
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
