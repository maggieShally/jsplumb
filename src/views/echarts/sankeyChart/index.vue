<!--
 * @Description: 
 * @Date: 2022-12-07 10:02:35
 * @LastEditTime: 2022-12-07 10:40:45
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\sankeyChart\index.vue
-->
<template>
  <div class="saneky-chart">
    <BaseChart ref="chartRef" name="sankeyChart" :seriesData="seriesData" />

  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from 'vue-demi'
import BaseChart from '@/components/BaseChart'

export default {
  name: 'SankeyChart',
  components: {
    BaseChart,
  },
  setup() {
    const chartRef = ref(null)
    const state = reactive({
      seriesData: {
        tooltip: {
          show: true,
          enterable: true,
          formatter: params => {
            const {
              data: { name, source, target, extraData },
              value,
            } = params
            let strHtml = ''
            if (name) {
              strHtml = `<div>
              ${params.marker} ${name} : ${value}
            </div>`
            } else {
              strHtml = `<div>
                ${source} - ${target} : ${value}
            </div>`
            }

            if (extraData?.length) {
              for (let i = 0; i < extraData.length; i++) {
                const itemData = extraData[i]
                strHtml += `<div>${itemData.name} : ${itemData.value} </div>`
              }
            }
            return strHtml
          },
        },
        series: {
          type: 'sankey',
          layout: 'none',
          emphasis: {
            focus: 'adjacency',
          },
          data: [
            {
              name: 'a',
            },
            {
              name: 'b',
            },
            {
              name: 'a1',
            },
            {
              name: 'a2',
            },
            {
              name: 'b1',
            },
            {
              name: 'c',
            },
          ],
          links: [
            {
              source: 'a',
              target: 'a1',
              value: 5,
              extraData: [
                {
                  name: 'target1',
                  value: '123',
                },
                {
                  name: 'target2',
                  value: '2232',
                },
              ],
            },
            {
              source: 'a',
              target: 'a2',
              value: 3,
            },
            {
              source: 'b',
              target: 'b1',
              value: 8,
            },
            {
              source: 'a',
              target: 'b1',
              value: 3,
            },
            {
              source: 'b1',
              target: 'a1',
              value: 1,
            },
            {
              source: 'b1',
              target: 'c',
              value: 2,
            },
          ],
        },
      },
    })

    onMounted(() => {
      console.log(chartRef.value.chartRef.chart)

      chartRef.value.chartRef.chart.on('click', params => {
        if (params.dataType === 'node') {
          console.log(params)
        }
      })
    })

    return {
      chartRef,

      ...toRefs(state),
    }
  },
}
</script>

<style lang="less" scoped>
.saneky-chart {
  width: 500px;
  height: 500px;
}
</style>