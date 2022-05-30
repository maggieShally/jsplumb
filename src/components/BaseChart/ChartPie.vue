<!--
 * @Description: echarts基础封装，返回 echarts实例
 * @Date: 2021-10-14 17:05:49
 * @LastEditTime: 2022-04-28 11:23:56
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\components\BaseChart\ChartPie.vue
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
  nextTick,
  computed,
} from 'vue'
import { useStore } from 'vuex'
import { merge } from 'lodash'
import dayjs from 'dayjs'
import ResizeListener from 'element-resize-detector'
import * as echarts from 'echarts'
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
    mode: {
      type: String,
      default: 'Node',
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

    const handleWindowResize = () => {
      if (!chart.value) return false
      chart.value.resize()
    }

    // merge option配置项
    const assembleDataToOption = () => {
      const posArr = [
        {
          left: '0%',
          top: '10%',
          rotation: '170',
        },
        {
          left: '20%',
          top: '30%',
          rotation: '170',
        },
        {
          left: '40%',
          top: '50%',
          rotation: '170',
        },
        {
          right: '0%',
          top: '10%',
          rotation: '100',
        },
        {
          right: '20%',
          top: '40%',
          rotation: '100',
        },
      ]
      return merge(
        {},
        {
          ...props.seriesData,
          graphic: [
            {
              type: 'group',
              width: '100%',
              height: '100%',
              bounding: 'raw',
             
            },
          ],
        },
        props.extraOption
      )
    }

    // 更新视图
    const updateChartView = async () => {
      if (!chart.value) return false
      const fullOptoin = assembleDataToOption()
      console.log(fullOptoin)

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
      () => {
        updateChartView()
        addChartResizeListener()
        chart.value.resize()
      },
      { deep: true }
    )

    watch(
      () => isManual.value,
      async val => {
        console.log(val)
        if (val) {
          await nextTick()
          chart.value.resize()
        }
      }
    )

    const initMethods = () => {
      // 点击 标题 复制标题
      chart.value.on('click', function (params) {
        if (params.componentType === 'title') {
          copyText(
            (props.seriesData.title.text || props.seriesData.title[0].text) +
              (props.seriesData.title.subtext ||
                props.seriesData.title[0].subtext ||
                ''),
            () => {
              proxy.$resetMessage.success('已复制标题')
            }
          )
        }
      })
    }

    function copyText(text, callback) {
      // text: 要复制的内容， callback: 回调
      var tag = document.createElement('input')
      tag.setAttribute('id', 'cp_input')
      tag.value = text
      document.getElementsByTagName('body')[0].appendChild(tag)
      document.getElementById('cp_input').select()
      document.execCommand('copy')
      document.getElementById('cp_input').remove()
      
      if (callback) {
        callback(text)
      }
    }

    onMounted(() => {
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
  min-height: 400px;
  overflow: hidden;
}
</style>
