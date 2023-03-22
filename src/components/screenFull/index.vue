<!--
 * @Description: 
 * @Date: 2022-12-02 16:06:16
 * @LastEditTime: 2022-12-02 18:36:55
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\components\screenFull\index.vue
-->
<template>

  <div class="screenfull" ref="screenFullRef" :id="unitKey">
    <span @click="clickScreenFull">全屏</span>
    <slot></slot>
  </div>

</template>

<script>
import { ref, unref } from 'vue'
import screenfull from 'screenfull'

export default {
  name: 'ScreenFullCom',
  props: {
    unitKey: {
      type: String,
      default: 'isFullScreen',
    }, // 给当前全屏元素唯一id，界面有多个全屏的时候，取消全屏只取消当前的全屏否则change会执行多次
  },
  emits: ['onExit', 'onToggle'],
  setup(props, context) {
    const screenFullRef = ref(null)

    const clickScreenFull = () => {
      localStorage.setItem('screenFullKey', props.unitKey)
      if (screenfull.isEnabled) {
        screenfull.toggle(document.querySelector(`#${props.unitKey}`))
      }
    }

    screenfull.on('change', () => {
      const activeUnitKey = localStorage.getItem('screenFullKey')
      if(screenFullRef.value?.id === activeUnitKey) {
          context.emit('onToggle', screenfull.isFullscreen)
      }
      if (
        !screenfull.isFullscreen &&
        screenFullRef.value?.id === activeUnitKey
      ) {
        context.emit('onExit')
      }
    })

    return {
      screenFullRef,
      clickScreenFull,
    }
  },
}
</script>

<style lang="less" scoped>
.screenfull:fullscreen {
  background-color: #fff;
}
</style>