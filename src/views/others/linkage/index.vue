<!--
 * @Description: 
 * @Date: 2022-07-07 11:09:33
 * @LastEditTime: 2022-12-02 17:40:55
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\linkage\index.vue
-->
<template>
  <div class="chart-panel">
    <div v-for="item in 4" :key="item" class="chart-sec">
      <div class="linkAge-sec" @mouseover="handleShowHover(item)">
        <div class="linkAge-operate" v-show="hoverChart === item">
          <p @click="handleSetLinkAge(item)">联动</p>
          <p v-if="mainChart === item" @click="mainChart=''">取消联动</p>
        </div>
        <div class="linkAge-operate" v-if="mainChart && mainChart != item">
          <el-checkbox v-model="chartInfoList[`a${item}`].isLink"></el-checkbox>

          <el-popover placement="right" :width="400" trigger="click">
            <template #reference>
              <span>
                <el-icon v-if="chartInfoList[`a${item}`].isLink">
                  <Edit />
                </el-icon>
              </span>
            </template>
            <el-table :data="[]">
              <el-table-column width="150" property="date" label="date" />
              <el-table-column width="100" property="name" label="name" />
              <el-table-column width="300" property="address" label="address" />
            </el-table>
          </el-popover>

        </div>
        <ChartCom :ref="chartItemRef" :unitKey="'b'+item+'a'" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, ref, unref, nextTick } from 'vue'

import ChartCom from './components/ChartCom.vue'
export default {
  name: 'AminsPage',
  components: {
    ChartCom,
  },

  setup(props) {
    const state = reactive({
      hoverChart: '',
      mainChart: '',
      linkAgeList: {},
      chartInfoList: {
        a1: {
          isLink: false,
        },
        a2: {
          isLink: false,
        },
        a3: {
          isLink: false,
        },
        a4: {
          isLink: false,
        },
      },
    })

    const dataChartItemRef = ref([])

    const chartItemRef = async el => {
      await nextTick()
      if (el) {
        if (
          dataChartItemRef.value.findIndex(item => item.chartRef?.name === el.chartRef.name) < 0
        ) {
          dataChartItemRef.value.push(el)
        }
      }
    }

    const handleShowHover = item => {
      console.log(item)
      if (state.mainChart) return
      state.hoverChart = item
    }

    const handleSetLinkAge = item => {
      state.mainChart = item
      console.log(unref(dataChartItemRef))
    }

    return {
      ...toRefs(state),
      handleShowHover,
      handleSetLinkAge,
      chartItemRef,
    }
  },
}
</script>

<style lang="less" scoped>
.chart-panel {
  width: 100%;
  display: flex;
}
.chart-sec {
  flex: 1;
}

.linkAge-sec {
  padding: 20px;
  border: 2px solid #fff;
  position: relative;

  &:hover {
    border: 2px solid #ddd;
  }

  .linkAge-operate {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>