<!--
 * @Description: 
 * @Date: 2021-11-19 09:29:16
 * @LastEditTime: 2021-12-03 09:50:04
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\x6\components\ChartPie.vue
-->


<template>
  <div :id="`${name}_chart`" class="chart"></div>
</template>

<script>
import {
  inject,
  onMounted,
  onUnmounted,
  watch,
  shallowRef,
  getCurrentInstance,
  ref,
} from 'vue'
import * as echarts from 'echarts'

import { merge } from 'lodash'
import ResizeListener from 'element-resize-detector'

export default {
  name: 'ChartPie',
  props: {
    name: String,
    seriesData: {
      type: Object,
      requried: true,
      default: () => ({}),
    },
    extraOption: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const ec = echarts
    const getNode = inject('getNode')
    const { proxy } = getCurrentInstance()
    // console.log(getNode().data.seriesData)

    // 如果把ECharts实例对象放到 ref 里，容易影响到实例底层的运行。
    // 使用 shallowRef 替代，这样 Proxy 不会应用到 ECharts 实例底下的各个属性上
    const chart = shallowRef(null)

    const currentNode = shallowRef(getNode())

    const handleWindowResize = () => {
      if (!chart.value) return false
      chart.value.resize()
    }

    // merge option配置项
    const assembleDataToOption = () => {
      return merge(
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
      const fullOptoin = assembleDataToOption()

      chart.value.setOption(fullOptoin, true)
    }

    const addChartResizeListener = () => {
      const instance = ResizeListener({
        strategy: 'scroll',
        callOnAdd: true,
      })
      instance.listenTo(document.querySelector(`#${props.name}_chart`), () => {
        if (!chart.value) return false
        chart.value.resize()
      })
    }

    watch(
      () => props.seriesData,
      () => {
        updateChartView()
        addChartResizeListener()
      },
      { deep: true }
    )

    const initMethods = () => {
      // 订单和交付显示同步
      chart.value.on('legendselectchanged', function (params) {
        console.log(params)
        if (params.name === '订单和交付') {
          chart.value.dispatchAction({
            type: params.selected['订单和交付']
              ? 'legendSelect'
              : 'legendUnSelect',
            name: '订单数量',
          })
        }
      })

      // 点击 标题 复制标题
      chart.value.on('click', function (params) {
        if (params.componentType === 'title') {
          copyText(props.seriesData.title.text, () => {
            proxy.$resetMessage.success('已复制标题')
          })
        }
      })
    }

    function copyText(text, callback) {
      // text: 要复制的内容， callback: 回调
      var tag = document.createElement('input')
      tag.setAttribute('id', 'cp_hgz_input')
      tag.value = text
      document.getElementsByTagName('body')[0].appendChild(tag)
      document.getElementById('cp_hgz_input').select()
      document.execCommand('copy')
      document.getElementById('cp_hgz_input').remove()
      if (callback) {
        callback(text)
      }
    }

    onMounted(() => {
      chart.value = ec.init(document.querySelector(`#${props.name}_chart`), {},{
        renderer: 'svg'
      })
      updateChartView()
      addChartResizeListener()
      initMethods()
    })

    onUnmounted(() => {
      chart.value.dispose()
      window.removeEventListener('resize', handleWindowResize)
    })

    return {
      chart,
      currentNode,
    }
  },
}
</script>

<style lang="less" scoped>
.chart {
  width: 100%;
  height: 100%;
  min-width: 40px;
  min-height: 40px;
}
</style>
