<!--
 * @Description: L
 * @Date: 2023-11-24 18:20:12
 * @LastEditTime: 2024-06-26 18:33:59
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\G2Chart\index.vue
-->
<template>
  <div ref="chartG2Ref" class="g2Chart" id="container"></div>
</template>

<script>
import { Chart } from '@antv/g2'
import { onMounted } from 'vue'
export default {
  name: 'G2ChartPage',
  setup() {

    const chartG2Ref = ref(null)


    const data = [
      { genre: 'Sports', sold: 275, name: 'Sports' },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: null },
      { genre: 'Other', sold: 150 },
    ];

    let chart = null

    function PointLine({ encode, data } = {}) {
      return [
        { type: 'line', data, encode },
        { type: 'point', data, encode },
      ];
    }

    // 初始化图表实例
    const initChart = () => {
      chart = new Chart({
        container: chartG2Ref.value,
      });

      // chart
      //   .interval()
      //   // .mark(PointLine)
      //   // .line()
      //   .title({
      //     title: 'hello',
      //     subtitle: 'world',
      //   })
      //   .axis('x')
      //   .axis('y')
      //   .legend('color', {})
      //   .legend('size', {})
      //   .slider({
      //     x: {},
      //     y: {},
      //   })
      //   .data(data) // 绑定数据
      //   .encode('x', 'genre') // 编码 x 通道
      //   .encode('y', 'sold') // 编码 y 通道
      //   .label({
      //     text: 'sold', // 指定绑定的字段
      //     style: {
      //       dy: -15, // 指定样式
      //     },
      //   })

      chart.options({
        type: 'interval', // 创建一个 Interval 标记
        data: [
          // 绑定数据
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 },
        ],
        encode: {
          x: 'genre', // 编码 x 通道
          y: 'sold', // 编码 y 通道
        },
        labels: [
          {
            text: 'sold',
            dy: -15
          }
        ]
      })
      // 渲染可视化
      chart.render()
    }

    onMounted(() => {
      initChart()
      console.log(chart)

    })
    return {
      chartG2Ref
    }
  }
}
</script>

<style></style>