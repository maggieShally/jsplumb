


<template>
  <canvas class="canvas-sec" ref="canvasRef" width="600" height="600" @click="handleClickPoint" > </canvas>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from 'vue'
export default {
  name: 'TestCom',
  components: {
  },
  props: {
  },
  setup() {
    const canvasRef = ref(null)

    let ctx = null

    const state = reactive({

    })

    const handleClickPoint = e => {
      console.log(e, e.offsetX, e.offsetY)
      const x = e.offsetX
      const y = e.offsetY
      for(let i = 0 ; i < 10; i++) {
        const random = Math.random() * 150
        ctx.moveTo(x + random, y + random)
        ctx.lineTo(x + random + 30, y + random + 30)
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    onMounted(() => {
      debugger
      ctx = canvasRef.value.getContext('2d')
      console.log(ctx)

      // 描边距形
      ctx.strokeStyle = 'green'
      ctx.strokeRect(170, 50, 50, 50)

      // 绘制一个实心圆
      ctx.beginPath()
      ctx.arc(300, 100, 50, 0, 2 * Math.PI)
      ctx.fillStyle = 'blue'
      ctx.fill()
      
      // 绘制一个空心圆
      ctx.beginPath()
      ctx.arc(450, 100, 50, 0, 2 * Math.PI)
      ctx.strokeStyle = 'green'
      ctx.lineWidth = 5
      ctx.stroke()
      ctx.closePath()

      // 绘制一个三角形
      ctx.beginPath()
      ctx.moveTo(0, 200)
      ctx.lineTo(100, 200)
      ctx.lineTo(0, 300)
      ctx.fillStyle = 'red'
      ctx.fill()

      // 绘制图片
      const img = new Image()
      img.src = "https://img.yzcdn.cn/vant/cat.jpeg"
      img.onload = function(){
        // ctx.drawImage(img, 50, 250, 200, 200)

        // createPattern(image, type) 方法可以创建一个模式
        const pattern = ctx.createPattern(img, 'repeat')
        ctx.fillStyle = pattern
        ctx.fillRect(50, 250, 200, 200)
      }
    })
    return {
      canvasRef,
      ...toRefs(state),
      handleClickPoint
    }
  },
}

</script>
<style scoped lang='less'>
.canvas-sec {
  
}
</style>