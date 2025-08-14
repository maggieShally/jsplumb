<!--
 * @Description: 全屏组件
 * @Date: 2022-12-02 16:06:16
 * @LastEditTime: 2025-08-08 15:35:12
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\components\screenFull\index.vue
-->
<template>
 

  <template v-if="fullType === 'float'">
    <VueDragResize @activated="activateEv" :isActive="true" :x="200" :y="200" :sticks="['br',]" :w="500" :h="400" :parentH="parentH" :parentW="parentW" :parentLimitation="true" :z="zIndex">
      <div class="floatWrapper" @click="handleClickFocus">
        <div class="title" @click="handleAddzIndex">
          <h2>{{title}}</h2>
          <FullScreenToolCom :isFullScreen="fullType === 'fullScreen'" :isFloat="fullType === 'float'" :isPageFull="fullType === 'pageScreen'" @onScreenFull="clickScreenFull" @onFloat="clickFloat" @onPageFull="clickPageFull" />
        </div>
        <div class="content">
          <slot>
          </slot>
        </div>
      </div>
    </VueDragResize>
  </template>

  <template v-else>
    <teleport to="body" :disabled="fullType !== 'pageScreen'">
      <div ref="screenFullRef" :class="wrapClass">
        <div class="content">
          <FullScreenToolCom :isFullScreen="fullType === 'fullScreen'" :isFloat="fullType === 'float'" :isPageFull="fullType === 'pageScreen'" @onScreenFull="clickScreenFull" @onFloat="clickFloat" @onPageFull="clickPageFull" />
          <slot></slot>
        </div>
      </div>
    </teleport>
  </template>
  
</template>

<script>
import { nextTick, reactive, ref, toRefs, onMounted, computed, watch } from 'vue'
import { useFullscreen  } from '@vueuse/core'

import VueDragResize from 'vue-drag-resize'

import FullScreenToolCom from './FullScreenToolCom.vue'

export default {
  name: 'ScreenFullCom',
  components: {
    FullScreenToolCom,
    VueDragResize,
  },
  props: {
    title: {
      type: String,
      default: '浮窗',
    },
    placement: {
      type: String,
      default: 'top',
    },
  },
  emits: ['onToggle'],
  setup(props, context) {
    const screenFullRef = ref(null)
    
    const state = reactive({
      screenText: '全屏',
      fullType: '',
      parentW: window.innerWidth,
      parentH: window.innerHeight,
      zIndex: 998,
    })

    const windowReturn = useFullscreen(screenFullRef)

    watch(() => windowReturn.isFullscreen.value, val => {
      state.isFullScreen = val
      state.fullType = val ? 'fullScreen' : ''
    })

    const wrapClass = computed(() => {
      const { fullType } = state
      switch(fullType) {
        case 'float':
          return 'floatWrapper';
        case 'fullScreen':
          return 'screenfull';
        case 'pageScreen':
          return 'pageFullScreen';
        default:
          return ''
      }
    })

    // 全屏
    const clickScreenFull = async () => {
      windowReturn.toggle()
    }

    // 显示浮窗
    const clickFloat = async () => {
      if(state.isFullScreen) {
        windowReturn.toggle()
      }
      state.fullType = state.fullType === 'float' ? '' : 'float'
      handleAddzIndex()
      context.emit('onToggle', false)
    }

    // 网页全屏
    const clickPageFull = () => {
      state.fullType = state.fullType === 'pageScreen' ? '' : 'pageScreen'
      if(state.isFullScreen) {
        windowReturn.toggle()
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

    return {
      wrapClass,
      screenFullRef,
      ...toRefs(state),
      clickScreenFull,
      clickFloat,
      clickPageFull,
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