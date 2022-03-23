<!--
 * @Description: 滑动验组件tmpl
 * @Date: 2021-09-18 10:11:11
 * @LastEditTime: 2021-09-18 17:32:29
 * @FilePath: \jsplumb-test\src\views\canvas\vertify\VertifyCom.vue
-->

<template>
  <div class="vertifyWrap" @mousemove="handleDragMove" @mouseup="handleDragEnd">
    <div class="canvasArea">
      <canvas ref="canvasCtxRef" :width="width" :height="height"></canvas>
      <canvas ref="blockCtxRef" class="block" :width="width" :height="height"></canvas>
    </div>
    <div class="slider">
      <div class="sliderMask">
        <div class="slider"
          @mousedown="handleDragStart"
        >
          <div class="sliderIcon"
            :style="{'left': sliderLeft + 'px'}"
          >&rarr;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, toRefs } from 'vue'
export default {
  name: 'VertifyCom',
  props: {
    r: {
      type: Number,
      default: 9,
    },
    l: {
      type: Number,
      default: 42,
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 200,
    },
  },
  setup(props) {
    const canvasCtxRef = ref(null)
    const blockCtxRef = ref(null)
    const cR = computed(() => props.r)
    const cL = computed(() => props.l)

    const state = reactive({
      isMouseDown: false,
      originX: 0,
      originY: 0,
      sliderLeft: 20
    })

    const drawPath = (ctx, x, y, operation) => {
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.arc(
        x + cL.value / 2,
        y - cR.value + 2,
        cR.value,
        0.72 * Math.PI,
        2.26 * Math.PI
      )
      ctx.lineTo(x + cL.value, y)
      ctx.arc(
        x + cL.value + cR.value - 2,
        y + cL.value / 2,
        cR.value,
        1.21 * Math.PI,
        2.78 * Math.PI
      )
      ctx.lineTo(x + cL.value, y + cL.value)
      ctx.lineTo(x, y + cL.value)
      // anticlockwise为一个布尔值。为true时，是逆时针方向，否则顺时针方向
      ctx.arc(
        x + cR.value - 2,
        y + cL.value / 2,
        cR.value + 0.4,
        2.76 * Math.PI,
        1.24 * Math.PI,
        true
      )
      ctx.lineTo(x, y)
      ctx.lineWidth = 2
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.stroke()
      ctx.globalCompositeOperation = 'destination-over'
      operation === 'fill' ? ctx.fill() : ctx.clip()
    }

    const createImg = callback => {
      var img = new Image()
      img.onload = function () {
        callback.call(this, true, img)
      }
      img.src = '../../../../assets/imgs/canvasBg.jpg'
      img.src = 'https://img2.baidu.com/it/u=774566891,2193439878&fm=26&fmt=auto'
      return img
    }

    const initImg = () => {
      var img = createImg(function () {
        const canvasCtx = canvasCtxRef.value.getContext('2d')
        const blockCtx = blockCtxRef.value.getContext('2d')
        drawPath(canvasCtx, 250, 50, 'fill')
        drawPath(blockCtx, 10, 50, 'clip'); // 画入图片
        canvasCtx.drawImage(img, 0, 0, 400, 200)
      })
    }


    const handleDragStart = e => {
      console.log(e)
      state.originX = e.clientX
      state.originY = e.clientY
      state.isMouseDown = true
    }

    const handleDragMove = e => {
      if(!state.isMouseDown) return false
      
      const moveX = e.clientX - state.originX
      state.sliderLeft = moveX
      
    }

    const handleDragEnd = e => {
      state.isMouseDown = false
    }


    onMounted(() => {
      initImg()
    })

    return {
      ...toRefs(state),
      blockCtxRef,
      canvasCtxRef,
      handleDragStart,
      handleDragMove,
      handleDragEnd
    }
  },
}
</script>

<style lang="less" scoped>
.vertifyWrap {
  width: 400px;
  height: 200px;
  border: 1px solid #ddd;
  // background: url('../../../assets/imgs/canvasBg.jpg') 0 0 no-repeat;
  // background-size: cover;

  .canvasArea {
    position: relative;
    width: 100%;
    height: 80%;
    border: 1px solid #ddd;

    .block {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .slider {
    height: 20%;
    .sliderMask {
      height: 100%;
      border: 1px solid #ddd;
      box-shadow: 0px 0px 5px #ddd inset;
    }

    .slider {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #fff;

      .sliderIcon {
        width: 50px;
        height: 100%;
        border: 1px solid #ddd;
        position: absolute;
        left: 0;
        top: 0;
        cursor: pointer;
      }
    }
  }
}
</style>