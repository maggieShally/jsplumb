


<template>
  <svg width="500" height="500" xmlns="http://wwww.w3.org/2000/svg">

    <circle cx="150" cy="150" r="50" stroke="#000" fill="transparent" stroke-width="2" />
    <circle cx="130" cy="130" r="7" stroke="#000" fill="#000" />
    <circle cx="170" cy="130" r="7" stroke="#000" fill="#000" />

    <g id="whiskers">
      <!-- stroke-dasharray 虚线，第一个参数为线长度，第二个为 空隙长度 -->
      <line x1="150" y1="150" x2="90" y2="130" style="stroke:#000;stroke-width:2; stroke-dasharray: 10,4" />
      <line x1="150" y1="150" x2="90" y2="170" style="stroke:#000;stroke-width:2" />
    </g>

    <g id="whiskers2">
      <line x1="150" y1="150" x2="210" y2="130" style="stroke:#000;stroke-width:2" />
      <line x1="150" y1="150" x2="210" y2="170" style="stroke:#000;stroke-width:2" />
    </g>

    <polyline points="110,116,120,70,140,100" style="fill: none; stroke: #000; stroke-width: 1;" />
    <polyline points="190,116,180,70,160,100" style="fill: none; stroke: #000; stroke-width: 1;" />

    <!-- bizi ,145,145,150,155,155,145,150,145 -->
    <!-- 
      A 有7个参数，
      rx：水平半径,
      ry：垂直半径, 
      x-axis-rotation：X轴旋转角度，
      large-arc-flag：弧度大小 0小，1大，
      sweep-flag：0表示弧线从起点到终点沿逆时针方向绘制，1表示沿顺时针方向绘制
      x: 终点x坐标,
      y: 终点y坐标
    -->


    <path d="M 155 145 L 145 145 A 5 10 0 1 0 155 145" stroke="#000" stroke-width="1" fill="#ffcccc"/>

    <circle r="1" fill="red">
      <animateMotion
        dur="2s"
        repeatCount="indefinite"
        path="M 155 145 L 145 145 A 5 10 0 1 0 155 145" />
    </circle>


    <polyline points="120, 170 130,180 170,180 180,170" stroke="#000" stroke-width="1" fill="none" />

    <!-- <use xlink:href='#whiskers2' x='10' y='10'/> -->

    <!-- 多边形 不少于三个点 自动闭合 -->
    <polygon points="300,130 300,190 370,190" fill="#ffcccc" />

  </svg>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'

export default {
  name: 'SVGCom',
  components: {
  },
  props: {
  },
  setup() {
    const state = reactive({})
    onMounted(() => {
    })
    return {
      ...toRefs(state),
    }
  },
}

</script>
<style scoped lang='less'>
</style>