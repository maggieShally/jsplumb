<!--
 * @Description: 
 * @Date: 2022-04-06 09:40:18
 * @LastEditTime: 2024-04-28 15:23:35
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\tableLine\Table.vue
-->
<template>

  <div style="margin-bottom: 50px">
    <el-table :data="tableData" border :span-method="objectSpanMethod">
      <el-table-column label="交易类型" prop="jyType" width="150px" />
      <el-table-column label="产品大类" prop="category" width="150px" />
      <el-table-column v-for="item in columns" :label="item.label" :prop="item.key" :key="item.key" width="180px">
        <template #default="scope">
          <div style="margin-left: -12px" class="cell-wrapper">
            <div :id="`Str${scope.row[scope.column.rawColumnKey]?.id}`" class="strBox"></div>

            <el-tooltip v-if="scope.row[scope.column.rawColumnKey]?.nextShow" effect="light" placement="bottom">
              <template #content>
                <el-button type="primary" size="small" @click="handleShowNextInfo">下钻</el-button>
              </template>
              <div :class="[
                'counter-progress',
                hightLightIds.length > 0 &&
                  !hightLightIds.includes(
                    scope.row[scope.column.rawColumnKey]?.id
                  )
                  ? 'noBg'
                  : ''
              ]">
                <div class="counter-progress-bg" :style="{
                  width:
                    (scope.row[scope.column.rawColumnKey]?.percent /
                      scope.row[scope.column.rawColumnKey]?.total) *
                    100 +
                    '%'
                }"></div>
                <div class="counter-progress-text">
                  {{ scope.row[scope.column.rawColumnKey]?.total }}
                </div>
              </div>
            </el-tooltip>

            <div v-else :class="[
              'counter-progress',
              hightLightIds.length > 0 &&
                !hightLightIds.includes(
                  scope.row[scope.column.rawColumnKey]?.id
                )
                ? 'noBg'
                : ''
            ]">
              <div class="counter-progress-bg" :style="{
                width:
                  (scope.row[scope.column.rawColumnKey]?.percent /
                    scope.row[scope.column.rawColumnKey]?.total) *
                  100 +
                  '%'
              }"></div>
              <div class="counter-progress-text">
                {{ scope.row[scope.column.rawColumnKey]?.total }}
              </div>
            </div>

            <span v-if="scope.row[scope.column.rawColumnKey]?.show" class="operate-text" type="primary" @click="
              handleShowLine(
                $event,
                scope.row[scope.column.rawColumnKey]?.nextIds,
                scope
              )
              ">{{
                activeId === scope.row[scope.column.rawColumnKey]?.id
                  ? '关闭'
                  : '展开'
              }}</span>
            <div v-if="activeId === scope.row[scope.column.rawColumnKey]?.id" class="line-wrap">
              <div class="first"></div>
              <div class="second"></div>
              <template v-for="item in scope.row[scope.column.rawColumnKey]?.nextIds" :key="item">
                <div class="third">
                  <div class="four"></div>
                </div>
              </template>
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
export default {
  name: 'Table',
  components: {
    TableNextModal
  },
  setup() {
    const state = reactive({
      columns: columns,
      tableData: [
        {
          id: 1,
          jyType: '采购明细',
          category: 'DDR3',
          ...weeks
          // week1: {
          //   total: 120,
          //   percent: 50,
          //   show: true,
          //   id: '11',
          //   nextIds: ['43', '64', '41']
          // }
        },
        {
          id: 2,
          jyType: '采购明细',
          category: 'FLASH',
          week1: {
            total: 120,
            percent: 50,
            id: '211',
            show: true,
            nextIds: ['64', '12',]
          }
        },
        {
          id: 3,
          jyType: '采购明细',
          category: 'DDR4',
          week1: {
            total: 120,
            percent: 50,
            nextShow: true
          }
        },

        {
          id: 4,
          jyType: '采购入库',
          category: 'DDR322',
          week1: {
            total: 120,
            percent: 50,
            id: '41'
          },
          week3: {
            id: '43',
            total: 120,
            percent: 50,
            show: true,
            nextIds: ['64', '146', '19', '16', '17', '71']
          }
        },
        {
          id: 5,
          jyType: '采购入库',
          category: 'FLASH'
        },
        {
          id: 6,
          jyType: '采购入库',
          category: 'DDR4',
          week4: {
            id: '64',
            total: 120,
            percent: 50
          }
        },
        {
          id: 7,
          jyType: '采购入库',
          category: 'DDR4',
          week4: {
            id: '71',
            total: 120,
            percent: 50
          }
        }
      ],

      showNext: false,

      activeId: '',

      hightLightIds: []
    })

    const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
      if (columnIndex === 0) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }

    let initWidth = 12
    const handleShowLine = async (e, ids, scope) => {
      const { activeId } = state

      const currentActiveId =
        activeId === scope.row[scope.column.rawColumnKey].id
          ? ''
          : scope.row[scope.column.rawColumnKey].id

      state.activeId = currentActiveId
      const targetEvent = e.currentTarget.getBoundingClientRect()

      await nextTick()

      if (!currentActiveId) {
        state.hightLightIds = []
        return false
      }

      state.hightLightIds = [...ids.sort(), currentActiveId]

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
      lineElement.querySelector('.second').style.height = maxHeight - minHeight + 'px'
      lineElement.querySelector('.second').style.top = secondTop + 'px'
    }

    const handleShowNextInfo = () => {
      state.showNext = true
    }

    return {
      ...toRefs(state),
      objectSpanMethod,
      handleShowLine,
      handleShowNextInfo
    }
  }
}
</script>

<style lang="less" scoped>
@color: #ffa011;

.line-wrap {
  display: inline-block;
  position: absolute;
  z-index: 999;
  // right: 20px;
  top: 20px;

  .first {
    width: 10px;
    height: 2px;
    background: @color;
  }

  .second {
    width: 2px;
    height: 50px;
    background: @color;
    position: absolute;
    right: 0;
  }

  .third {
    width: 100px;
    height: 2px;
    background: @color;
    position: absolute;
    top: 50px;
    left: 100%;
  }

  .four {
    width: 2px;
    height: 10px;
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
      border-color: @color transparent transparent transparent;
      position: absolute;
      left: 100%;
      bottom: -100%;
      transform: translate(-55%, -10%);
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
