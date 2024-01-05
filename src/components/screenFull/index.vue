<!--
 * @Description: 
 * @Date: 2022-12-02 16:06:16
 * @LastEditTime: 2023-12-15 16:22:31
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\components\screenFull\index.vue
-->
<template>
  <div class="screenfull" ref="screenFullRef" :id="unitKey">
    <div class="content" v-if="!isPageFull && !isFloat">
      <FullScreenToolCom :isFullScreen="isFullScreen" :placement="placement" :isFloat="isFloat" :isPageFull="isPageFull" @onScreenFull="clickScreenFull" @onFloat="clickFloat" @onPageFull="clickPageFull" />
      <slot>
      </slot>
    </div>
  </div>

  <Teleport to="body">
    <!-- 浮窗状态 start  -->
    <template v-if="isFloat">
      <VueDragResize @activated="activateEv" :isActive="true" :x="200" :y="200" :sticks="['br',]" :w="500" :h="400" :parentH="parentH" :parentW="parentW" :parentLimitation="true" :z="zIndex">
        <div class="floatWrapper" @click="handleClickFocus">
          <div class="title" @click="handleAddzIndex">
            <h2>{{title}} {{zIndex}}</h2>
            <FullScreenToolCom :isFullScreen="isFullScreen" :isFloat="isFloat" :isPageFull="isPageFull" @onScreenFull="clickScreenFull" @onFloat="clickFloat" @onPageFull="clickPageFull" />
          </div>
          <div class="content">
            <slot>
            </slot>
          </div>
        </div>
      </VueDragResize>
    </template>
    <!-- 浮窗状态 end  -->

    <!-- 网页全屏状态 start  -->
    <div class="pageFullScreen" v-if="isPageFull">
      <FullScreenToolCom :isFullScreen="isFullScreen" :isFloat="isFloat" :isPageFull="isPageFull" @onScreenFull="clickScreenFull" @onFloat="clickFloat" @onPageFull="clickPageFull" />
      <slot></slot>
    </div>
    <!-- 网页全屏状态 end  -->
  </Teleport>

</template>

<script>
import { nextTick, reactive, ref, toRefs, onMounted } from 'vue'
import screenfull from 'screenfull'
import VueDragResize from 'vue-drag-resize'

import FullScreenToolCom from './FullScreenToolCom.vue'

export default {
  name: 'ScreenFullCom',
  components: {
    FullScreenToolCom,
    VueDragResize,
  },
  props: {
    unitKey: {
      type: String,
      default: 'fullScreenChart',
    }, // 给当前全屏元素唯一id，界面有多个全屏的时候，取消全屏只取消当前的全屏否则change会执行多次
    title: {
      type: String,
      default: '浮窗',
    },
    placement: {
      type: String,
      default: 'top',
    },
  },
  emits: ['onExit', 'onToggle'],
  setup(props, context) {
    const screenFullRef = ref(null)

    const state = reactive({
      screenText: '全屏',
      isFloat: false,
      isFullScreen: false,
      isPageFull: false,
      parentW: window.innerWidth,
      parentH: window.innerHeight,
      zIndex: 998,
    })

    // 全屏
    const clickScreenFull = async () => {
      state.isFloat = false
      state.isPageFull = false

      await nextTick()

      localStorage.setItem('screenFullKey', props.unitKey)
      if (screenfull.isEnabled) {
        screenfull.toggle(document.querySelector(`#${props.unitKey}`))
      }
    }

    // 监听全屏变化
    screenfull.on('change', () => {
      const activeUnitKey = localStorage.getItem('screenFullKey')
      if (screenFullRef.value?.id === activeUnitKey) {
        console.log(screenfull.isFullscreen)
        state.isFullScreen = screenfull.isFullscreen
        context.emit('onToggle', screenfull.isFullscreen)
      }
      if (
        !screenfull.isFullscreen &&
        screenFullRef.value?.id === activeUnitKey
      ) {
        context.emit('onExit')
      }
    })

    // 显示浮窗
    const clickFloat = async () => {
      if (screenfull.isEnabled && screenfull.isFullscreen) {
        screenfull.toggle(document.querySelector(`#${props.unitKey}`))
      }

      state.isPageFull = false
      state.isFloat = !state.isFloat
      handleAddzIndex()
      context.emit('onExit')
    }

    // 退出浮窗
    const handleCloseFloat = () => {
      state.isFloat = false
      state.zIndex = 998
      context.emit('onExit')
    }

    // 网页全屏
    const clickPageFull = () => {
      state.isFloat = false
      state.isPageFull = !state.isPageFull
      if (screenfull.isEnabled && screenfull.isFullscreen) {
        screenfull.toggle(document.querySelector(`#${props.unitKey}`))
      }
    }

    const activateEv = index => {
      console.log(index)
    }

    // 处理 vue-drag-resize 无法聚焦 input  textarea 问题
    const handleClickFocus = e => {
      if (e.target.nodeName === 'INPUT' || e.target.nodeName === 'TEXTAREA') {
        e.target.focus()
      }
    }

    const handleAddzIndex = () => {
      const { zIndex } = state
      let maxZIndex = Number(localStorage.getItem('floatMaxZIndex') || 0)

      if (zIndex < maxZIndex) {
        maxZIndex = maxZIndex + 1
        state.zIndex = maxZIndex
        localStorage.setItem('floatMaxZIndex', maxZIndex)
      } else {
        localStorage.setItem('floatMaxZIndex', zIndex + 1)
      }
    }

    onMounted(() => {
      state.toolTeleport = false
    })

    return {
      screenFullRef,
      ...toRefs(state),
      clickScreenFull,
      clickFloat,
      clickPageFull,
      handleCloseFloat,
      activateEv,
      handleClickFocus,
      handleAddzIndex,
    }
  },
}
</script>

<style lang="less" scoped>
.screenfull {
  padding: 20px;
  width: 100%;
  height: 100%;

  .content {
    height: calc(100% - 20px);
    position: relative;
  }
}
.screenfull:fullscreen {
  background-color: #fff;
}

.pageFullScreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
}

.floatWrapper {
  height: 100%;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  overflow: auto;

  .title {
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #dcdfe6;
    cursor: move;
  }

  .content {
    padding: 10px;
    height: calc(100% - 45px);
    z-index: 99;
    overflow: auto;
  }
}

.vdr.active:before {
  outline: none;
}

.vdr-stick {
  opacity: 0;

  &.vdr-stick-br {
    opacity: 1;
  }
}
</style>