<!--
 * @Description: echarts基础封装，返回 echarts实例
 * @Date: 2021-10-14 17:05:49
 * @LastEditTime: 2023-11-27 13:32:23
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\components\BaseChart\ChartPie.vue
-->

<template>
  <div class="chart-wrap">

    <div class="title-sec" v-if="isDivider">
      <TipsNodeCom :content="description">
        <div class="title-main">{{ title }}
        </div>
      </TipsNodeCom>
      <slot name="tips"></slot>
      <div class="title-sub">{{ subText }}</div>
    </div>
    <ContextMenu :actions="menuList">
      <div :id="`${name}_chart`" class="chart"></div>
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
} from 'vue'
import { useStore } from 'vuex'
import lodash from 'lodash'
import dayjs from 'dayjs'
import ResizeListener from 'element-resize-detector'
import * as echarts from 'echarts'
import { localGet, copyText } from '@/utils'
import waterConfig from './config.js'

import TipsNodeCom from '../TipsNodeCom'

import ContextMenu from '../contextMenu'

export default {
  name: 'ChartPie',
  components: {
    TipsNodeCom,
    ContextMenu,
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
    hasWater: {
      type: Boolean,
      default: true,
    },
    waterType: {
      type: String,
      default: 'normal',
    },
    isDivider: {
      // 是否分开显示 标题
      type: Boolean,
      default: false,
    },
    contextMenuMap: {
      type: Map,
      defaut: () => new Map(),
    },
    copyType: {
      type: Array,
      default: () => ['text', 'subtext'],
    },
  },
  setup(props, context) {
    const getNode = props.mode === 'node' ? inject('getNode') : undefined

    const ec = echarts

    const isManual = inject('isManual', '') // 手动触发 resize(tab 切换显示时 会导致获取不到宽度 需要手动触发 resize)

    const { proxy } = getCurrentInstance()

    // 如果把ECharts实例对象放到 ref 里，容易影响到实例底层的运行。
    // 使用 shallowRef 替代，这样 Proxy 不会应用到 ECharts 实例底下的各个属性上
    const chart = shallowRef(null)
    const currentNode = shallowRef(getNode && getNode())

    const state = reactive({
      isDivider: props.isDivider,
      chartHeight: props.isDivider ? 'calc(100% - 50px)' : '100%',
      menuList: [],

      activeClickIndex: 0,
      activeClickNodeInfo: {},
    })

    const handleWindowResize = () => {
      if (!chart.value) return false
      chart.value.resize()
    }

    // merge option配置项
    const assembleDataToOption = () => {
      // const userInfo = localGet('userInfo')

      return lodash.merge(
        {},
        {
          ...props.seriesData,
          // graphic: props.hasWater
          //   ? waterConfig[props.waterType](userInfo)
          //   : null,
        },
        props.extraOption
      )
    }

    // 更新视图
    const updateChartView = async () => {
      if (!chart.value) return false
      const fullOptoin = assembleDataToOption()
      chart.value.setOption(fullOptoin, true)
    }

    const addChartResizeListener = () => {
      const instance = ResizeListener({
        strategy: 'scroll',
        callOnAdd: true,
      })
      instance.listenTo(
        document.querySelector(`#${props.name}_chart`),
        async () => {
          if (!chart.value) return false
          chart.value.resize()
        }
      )
    }

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

    watch(
      () => isManual.value,
      async val => {
        await nextTick()
        chart.value.resize()
      }
    )

    //标题
    const title = computed(() => {
      let title = {}
      if (lodash.isArray(props.seriesData?.title)) {
        title = props.seriesData?.title[0]
      } else {
        title = props.seriesData?.title
      }

      return title?.text
    })

    //副标题
    const subText = computed(() => {
      let title = {}
      if (lodash.isArray(props.seriesData?.title)) {
        title = props.seriesData?.title[0]
      } else {
        title = props.seriesData?.title
      }

      return title?.subtext
    })

    //详细信息
    const description = computed(() => {
      let title = {}
      if (lodash.isArray(props.seriesData?.title)) {
        title = props.seriesData?.title[0]
      } else {
        title = props.seriesData?.title
      }

      return title.itemLongDesc
    })

    // 柱图 用的 右键
    const normalContextMenu = () => {
      if (!props.contextMenuMap?.keys()) return false

      chart.value.getZr().on('contextmenu', function (params) {
        let pointInPixel = [params.offsetX, params.offsetY]
        let xIndex

        // 找到当前点击区域 grid Index
        if (chart.value.containPixel('grid', pointInPixel)) {
          xIndex = chart.value.convertFromPixel({ seriesIndex: 0 }, [
            params.offsetX,
            params.offsetY,
          ])[0]
        }
        const series = chart.value.getOption().series
        let menuList = []

        for (let [label, valueList] of props.contextMenuMap) {
          const targetValue = series.find(item => item.name === label).data[
            xIndex
          ]
          if (targetValue !== null) {
            menuList.push(...valueList)
          }
        }
        console.log(menuList)
        state.menuList = menuList
        state.activeClickIndex = xIndex

        chart.value.dispatchAction({
          type: 'hideTip',
        })
      })
    }

    // 桑基图右键
    const sankeyContextMenu = () => {
      chart.value.on('contextmenu', function (params) {
        console.log(params.data)

        let menuList = []
        if (params.dataType === 'node') {
          for (let [label, valueList] of props.contextMenuMap) {
            if (params.data[label] || label === 'all') {
              menuList.push(...valueList)
            }
          }
          state.activeClickNodeInfo = params.data
        }
        console.log(menuList)
        chart.value.dispatchAction({
          type: 'hideTip',
        })
        state.menuList = menuList
      })
    }

    // 矩阵图 左键
    const treemapContextMenu = () => {
      chart.value.on('contextmenu', function (params) {
        console.log(params.data)
        let menuList = []
      
        for (let [label, valueList] of props.contextMenuMap) {
          if (params.data[label] || label === 'all') {
            menuList.push(...valueList)
          }
        }
        state.activeClickNodeInfo = params.data
     
        console.log(menuList)
        chart.value.dispatchAction({
          type: 'hideTip',
        })
        state.menuList = menuList
      })
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

      if (props.chartType === 'normal') {
        normalContextMenu()
      } else if (props.chartType === 'sankey') {
        sankeyContextMenu()
      } else if (props.chartType === 'treemap') {
        treemapContextMenu()
      }
    }

    onMounted(async () => {
      await nextTick()
      chart.value = ec.init(
        document.querySelector(`#${props.name}_chart`),
        {},
        {
          // renderer: 'svg',
        }
      )
      updateChartView()
      addChartResizeListener()
      initMethods()
    })

    onUnmounted(() => {
      chart.value?.dispose()
      window.removeEventListener('resize', handleWindowResize)
    })

    return {
      title,
      subText,
      description,
      chart,
      currentNode,
      ...toRefs(state),
      handleWindowResize,
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
