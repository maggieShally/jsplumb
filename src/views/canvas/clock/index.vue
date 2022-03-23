<!--
 * @Description: canvas 时钟
 * @Date: 2021-07-12 09:16:55
 * @LastEditTime: 2021-09-07 14:23:47
 * @FilePath: \jsplumb-test\src\views\canvas\clock\index.vue
-->
<template>
  <canvas id="canvas" width="600" height="600"></canvas>
</template>

<script setup>
import { onMounted } from '@vue/runtime-core'

const canvasClock = ctx => {
  ctx.save()
  ctx.clearRect(0, 0, 600, 600)
  ctx.translate(300, 300)
  ctx.save()

  ctx.beginPath()
  ctx.arc(0, 0, 100, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.closePath()

  ctx.beginPath()
  ctx.arc(0, 0, 5, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.closePath()

  let time = new Date()
  let hour = time.getHours() % 12
  let min = time.getMinutes()
  let second = time.getSeconds()

  //指针 —— 时针
  ctx.rotate(
    ((2 * Math.PI) / 12) * hour +
      ((2 * Math.PI) / 12) * (min / 60) -
      Math.PI / 2
  )
  ctx.beginPath()
  ctx.moveTo(-10, 0)
  ctx.lineTo(40, 0)
  ctx.lineWidth = 10
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
  ctx.save()

  // 分针

  ctx.rotate(
    ((2 * Math.PI) / 60) * min +
      ((2 * Math.PI) / 60) * (second / 60) -
      Math.PI / 2
  )
  ctx.beginPath()
  ctx.moveTo(-10, 0)
  ctx.lineTo(60, 0)
  ctx.lineWidth = 6
  ctx.strokeStyle = 'blue'
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
  ctx.save()

  // 秒针
  ctx.rotate(((2 * Math.PI) / 60) * second - Math.PI / 2)
  ctx.beginPath()
  ctx.moveTo(-10, 0)
  ctx.lineTo(80, 0)
  ctx.lineWidth = 2
  ctx.strokeStyle = 'red'
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
  ctx.save()

  // 刻度

  ctx.lineWidth = 1
  for (let i = 0; i < 60; i++) {
    ctx.rotate((2 * Math.PI) / 60)
    ctx.beginPath()
    ctx.moveTo(90, 0)
    ctx.lineTo(100, 0)
    ctx.stroke()
    ctx.closePath()
  }

  ctx.restore()
  ctx.save()

  ctx.lineWidth = 5
  for (let i = 0; i < 12; i++) {
    ctx.rotate((2 * Math.PI) / 12)
    ctx.beginPath()
    ctx.moveTo(80, 0)
    ctx.lineTo(100, 0)
    ctx.stroke()
    ctx.closePath()
  }

  ctx.restore()
  ctx.restore()
}

onMounted(() => {
  var context = document.getElementById('canvas')
  let ctx = context.getContext('2d')
  var timer = 0
  window.requestAnimationFrame(function render() {
    timer += 1
    canvasClock(ctx)
    window.requestAnimationFrame(render)
  })

  // setInterval(() => {
  //   canvasClock(ctx)
  // }, 1000)
})
</script> 

<style>
</style>