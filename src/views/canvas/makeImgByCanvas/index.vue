<template>
  <div class="canvas-container">
    <canvas ref="canvasRef" width="400" height="400"></canvas>
    <el-button type="primary" @click="downloadImage">下载图片</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const canvasRef = ref(null)

const drawHelloKitty = (ctx) => {
  // 清空画布
  ctx.clearRect(0, 0, 400, 400)
  
  // 设置背景色
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, 400, 400)

  // 画脸
  ctx.beginPath()
  ctx.arc(200, 200, 100, 0, Math.PI * 2)
  ctx.fillStyle = '#fff'
  ctx.fill()
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 2
  ctx.stroke()

  // 画左耳
  ctx.beginPath()
  ctx.arc(140, 120, 30, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  // 画右耳
  ctx.beginPath()
  ctx.arc(260, 120, 30, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  // 画眼睛
  ctx.beginPath()
  ctx.arc(170, 180, 8, 0, Math.PI * 2)
  ctx.fillStyle = '#000'
  ctx.fill()

  ctx.beginPath()
  ctx.arc(230, 180, 8, 0, Math.PI * 2)
  ctx.fill()

  // 画鼻子
  ctx.beginPath()
  ctx.arc(200, 200, 8, 0, Math.PI * 2)
  ctx.fillStyle = '#ffb6c1'
  ctx.fill()

  // 画胡须
  // 左边
  ctx.beginPath()
  ctx.moveTo(140, 200)
  ctx.lineTo(180, 190)
  ctx.stroke()
  ctx.moveTo(140, 210)
  ctx.lineTo(180, 210)
  ctx.stroke()
  ctx.moveTo(140, 220)
  ctx.lineTo(180, 230)
  ctx.stroke()

  // 右边
  ctx.beginPath()
  ctx.moveTo(260, 200)
  ctx.lineTo(220, 190)
  ctx.stroke()
  ctx.moveTo(260, 210)
  ctx.lineTo(220, 210)
  ctx.stroke()
  ctx.moveTo(260, 220)
  ctx.lineTo(220, 230)
  ctx.stroke()

  // 画蝴蝶结
  ctx.beginPath()
  ctx.moveTo(180, 120)
  ctx.bezierCurveTo(190, 110, 210, 110, 220, 120)
  ctx.bezierCurveTo(210, 130, 190, 130, 180, 120)
  ctx.fillStyle = '#ff69b4'
  ctx.fill()
  ctx.stroke()
}

const downloadImage = () => {
  const canvas = canvasRef.value
  // 将canvas转换为图片URL
  const imageUrl = canvas.toDataURL('image/png')
  
  // 创建下载链接
  const link = document.createElement('a')
  link.download = 'hellokitty.png'
  link.href = imageUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  drawHelloKitty(ctx)
})
</script>

<style scoped>
.canvas-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

canvas {
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>