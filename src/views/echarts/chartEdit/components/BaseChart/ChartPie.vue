<!--
 * @Description: echarts基础封装，返回 echarts实例
 * @Date: 2021-10-14 17:05:49
 * @LastEditTime: 2025-01-21 10:26:05
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\components\BaseChart\ChartPie.vue
-->

<template>
  <div class="chart-wrap">
    <!-- {{isAll}} -->
    <ContextMenu>
      <div class="chart" ref="testChartRef"></div>
      <template #menuList>
        <slot name="menuList"></slot>
      </template>
    </ContextMenu>
  </div>
</template>

<script>
import {
  inject,
  onMounted,
  onUnmounted,
  watch,
  shallowRef,
  getCurrentInstance,
  nextTick,
  computed,
  reactive,
  toRefs,
  ref,
} from 'vue'
import { useVModel } from '@vueuse/core'
import { useStore } from 'vuex'
import lodash from 'lodash'
import dayjs from 'dayjs'
import ResizeListener from 'element-resize-detector'
import * as echarts from 'echarts'
import { localGet, copyText } from '@/utils'

import ContextMenu from '../contextMenu/index.vue'

export default {
  name: 'ChartPie',
  components: {
    ContextMenu
  },
  props: {
    name: String,
    chartType: {
      type: String,
      default: 'normal',
    },
    seriesData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    extraOption: {
      type: Object,
      default: () => ({}),
    },
    mode: {
      type: String,
      default: 'Node',
    },

    menuOption: {
      type: Array,
      default: () => []
    }

  },
  setup(props, context) {


    const getNode = props.mode === 'node' ? inject('getNode') : undefined

    const ec = echarts

    const { proxy } = getCurrentInstance()

    // 如果把ECharts实例对象放到 ref 里，容易影响到实例底层的运行。
    // 使用 shallowRef 替代，这样 Proxy 不会应用到 ECharts 实例底下的各个属性上
    const chart = shallowRef(null)
    const currentNode = shallowRef(getNode && getNode())

    const testChartRef = ref(null)

    const state = reactive({
      isDivider: props.isDivider,
      chartHeight: props.isDivider ? 'calc(100% - 50px)' : '100%',


      activeClickData: {},

      isAllSelected: true,
    })

    const isAll = computed(() => {
      const isAll  = state.isAllSelected
      return isAll
    })

    watch(
      () => props.seriesData,
      async () => {
        await nextTick()
        updateChartView()
        addChartResizeListener()
        chart.value?.resize()
      },
      { deep: true }
    )

    const handleWindowResize = () => {
      if (!chart.value) return false
      chart.value.resize()
    }

    // merge option配置项
    const assembleDataToOption = () => {

      return lodash.merge(
        {},
        {
          ...props.seriesData,
        },
        props.extraOption
      )
    }

    // 更新视图
    const updateChartView = async () => {
      if (!chart.value) return false
      const fullOption = assembleDataToOption()
      chart.value.setOption(fullOption, true)
    }

    const addChartResizeListener = () => {
      const instance = ResizeListener({
        strategy: 'scroll',
        callOnAdd: true,
      })
      instance.listenTo(
        testChartRef.value,
        async () => {
          if (!chart.value) return false
          chart.value.resize()
        }
      )
    }

    const initMethods = () => {
      // 点击 标题 复制标题

      chart.value.on('click', function (params) {
        if (params.componentType === 'title') {
          const title = chart.value.getOption().title[0]
          const copyTextStr = props.copyType.map(i => title[i] || ' ').join(' ')
          console.log(copyTextStr)
          copyText(copyTextStr, () => {
            proxy.$resetMessage.success('已复制标题')
          })
        }
      })

      chart.value.on('legendselectchanged', function (params) {
        console.log(params);
        if(!params.selected[params.name]) {
          state.isAllSelected = false
        } else {
          const { selected } = chart.value.getOption().legend[0]
          if(Object.values(selected).every(i => i === true)) {
            state.isAllSelected = true
          }
        }
      });

      // 右键
      chart.value.on('contextmenu', function (params) {
  //         {
  //   "id": "a3de8cbb25ae84c6c824e000bd2fdd4ab",
  //   "field": "a65b0b91fd5de61850bf27594",
  //   "operation": "=",
  //   "condValue": "蒙东",
  //   "valueFormat": null,
  //   "sort": 0
  // } 
        console.log(params)
        state.activeClickData = params
        console.log(params.data.data)
        chart.value.dispatchAction({
          type: 'hideTip',
        })
      })

    }

    onMounted(async () => {
      await nextTick()
      chart.value = ec.init(
        testChartRef.value,
        {},
        {
          renderer: 'svg',
        }
      )
      updateChartView()
      addChartResizeListener()
      initMethods()
    })

    onUnmounted(() => {
      chart.value?.dispose()
    })

    return {
      testChartRef,
      isAll,
      chart,
      currentNode,
      ...toRefs(state),
    }
  },
}
</script>

<style lang="less" scoped>
.chart-wrap {
  width: 100%;
  height: 100%;
  min-width: 40px;
  min-height: 40px;

  .title-sec {
    padding: 0 5px;
    text-align: left;

    .title-main {
      display: inline;
      font-weight: bold;
      font-size: 18px;
      color: #333;
      font-family: auto;
    }

    .title-sub {
      font-size: 12px;
      color: rgba(106, 105, 105, 0.9);
    }
  }
}

.chart {
  width: 100%;
  height: v-bind(chartHeight);
  min-width: 40px;
  min-height: 40px;
  overflow: hidden;
}
</style>
