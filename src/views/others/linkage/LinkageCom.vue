<!--
 * @Description: 联动
 * @Date: 2023-06-14 11:06:20
 * @LastEditTime: 2023-06-16 18:38:36
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\linkage\LinkageCom.vue
-->
<template>

  <div class="chart-sec">
    <div :class="['linkAge-sec', hoverChart ? 'isActive' : '']" @mouseover="handleShowHover" @mouseout="handleShowHover">
      <div class="linkAge-operate" v-show="hoverChart">
        <p @click="handleSetLinkAge" v-if="!mainChartId">联动</p>
        <p v-if="isEqualMain" @click="handleCancelLink">取消联动</p>
        <p v-if="!mainChartId" @click="handleDelItem">删除</p>
      </div>
      {{id}}
      {{isEqualMain}}
      <div class="linkAge-operate" v-if="!isEqualMain && mainChartId">
        <el-checkbox v-model="chartInfoList.isLink"></el-checkbox>

        <el-popover placement="right" :width="400" trigger="click">
          <template #reference>
            <span>
              <el-icon v-if="chartInfoList.isLink">
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
      <slot></slot>
    </div>
  </div>

</template>

<script>
import { reactive, toRefs, unref, computed } from 'vue'

export default {
  name: 'AminsPage',
  components: {},
  props: {
    id: String,
    mainId: String,
  },
  emits: ['onGetMain', 'onDelete'],
  setup(props, context) {
    const state = reactive({
      activeName: 'first',
      hoverChart: false,
      linkAgeList: {},
      chartInfoList: {
        isLink: false,
      },
    })

    const mainChartId = computed(() => props.mainId)
    const isEqualMain = computed(() => props.mainId === props.id)

    const handleShowHover = () => {
      if (unref(isEqualMain)) {
        state.hoverChart = true
      } else {
        state.hoverChart = !state.hoverChart
      }
    }

    const handleSetLinkAge = () => {
      context.emit('onGetMain', props.id)
    }

    const handleCancelLink = () => {
      state.hoverChart = false
      context.emit('onGetMain', '')
    }

    const handleDelItem = () => {
      context.emit('onDelete', props.id)
    }

    return {
      mainChartId,
      isEqualMain,
      ...toRefs(state),
      handleShowHover,
      handleSetLinkAge,
      handleCancelLink,
      handleDelItem,
    }
  },
}
</script>

<style lang="less" scoped>
.chart-panel {
  width: 100%;
}
.chart-sec {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: inline-block;
}

.linkAge-sec {
  padding: 20px;
  border: 2px solid #fff;
  position: relative;

  &:hover {
    border: 2px solid #ddd;
  }

  &.isActive {
    border: 2px solid #ddd;
  }

  .linkAge-operate {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>