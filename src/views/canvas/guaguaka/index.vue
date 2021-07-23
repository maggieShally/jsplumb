<!--
 * @Description: canvas 刮刮乐
 * @Date: 2021-07-12 09:17:10
 * @LastEditTime: 2021-07-21 15:51:12
 * @FilePath: \jsplumb-test\src\views\canvas\guaguaka\index.vue
-->

<template>
  <div class="wrap">
    <canvas id="canvas" width="400" height="400" @mousedown="canvasDown" @mousemove="canvasMove" @mouseup="canvasUp"></canvas>
    <div class="text">恭喜您获得100w</div>
  </div>
</template>

<script setup>
import { onMounted } from '@vue/runtime-core'
let isDraw = false
let context, ctx, wrap

const canvasDown = function () {
  isDraw = true
}

const canvasMove = function (e) {
  if (!isDraw) return
  ctx.beginPath()
  const x = e.pageX - context.offsetLeft - wrap.offsetLeft
  const y = e.pageY - context.offsetTop - wrap.offsetTop

  ctx.globalCompositeOperation = 'destination-out'
  ctx.arc(x, y, 10, 0, 2 * Math.PI)
  ctx.fill()
  ctx.closePath()
}

const canvasUp = function () {
  isDraw = false
}

onMounted(() => {
  context = document.getElementById('canvas')
  wrap = document.querySelector('.wrap')
  ctx = context.getContext('2d')

  ctx.fillStyle = 'darkgray'
  ctx.fillRect(0, 0, 400, 100)
  ctx.fillStyle = '#fff'
  ctx.fillText('刮刮卡', 180, 50)

  
})
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

.wrap {
  margin: 0 auto;
  position: relative;
  width: 400px;
  height: 400px;
}

.text {
  position: absolute;
  left: 130px;
  top: 35px;
  font-size: 24px;
  z-index: -3;
}
</style>