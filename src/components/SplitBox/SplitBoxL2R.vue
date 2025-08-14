<!--
 * @Description: 分屏组 左右可拖拉布局
 * @Date: 2024-07-01 11:46:11
 * @LastEditTime: 2024-07-10 14:47:11
 * @FilePath: \data-integration\src\components\SplitBox\SplitBoxL2R.vue
-->

<template>
  <div ref="container" class="container">
    <div class="my-left" :style="leftStyle">
      <slot name="left"></slot>
    </div>
    <div ref="split" style="width: 10px" class="my-split" />
    <div class="my-right" :style="rightStyle">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'SplitBoxL2R',
  props: {
    initRatio: {
      type: Number,
      default: 0.13
    }
  },
  setup(props) {

    const container = ref(null);
    const split = ref(null);
    const leftStyle = ref({});
    const rightStyle = ref({});
    const ratio = ref(props.initRatio);

    function updatePaneStyles(newRatio) {
      leftStyle.value = { width: `calc(${newRatio * 100}% - 5px)` };
      rightStyle.value = { width: `calc(${(1 - newRatio) * 100}% - 5px)` };
    }

    function handleResize(e) {
      const containerWidth = container.value.clientWidth;
      const rect = container.value.getBoundingClientRect();
      const initX = rect.left;
      function onMouseMove(e) {
        e.preventDefault();
        // 限制鼠标移动事件的范围为container容器四至范围内
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
          onMouseUp();
        }
        const moveScale = (e.clientX - initX) / containerWidth;
        const newRatio = moveScale;
        // console.log(newRatio)
        if (newRatio > 0.01 && newRatio < 0.95) {
          ratio.value = newRatio;
          updatePaneStyles(newRatio);
        }
      }

      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    function onDblClick(e) {
      ratio.value = 0.5;
      updatePaneStyles(ratio.value);
    }

    onMounted(() => {
      updatePaneStyles(ratio.value);
      if (split.value) {
        split.value.addEventListener('mousedown', handleResize, false);
        split.value.addEventListener('dblclick', onDblClick, false);
      }
    })

    onUnmounted(() => {
      if (split.value) {
        split.value.removeEventListener('mousedown', handleResize);
        split.value.removeEventListener('dblclick', onDblClick);
      }
    })

    return {
      container,
      split,
      leftStyle,
      rightStyle
    }
  }
}


</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

.my-left {
  z-index: 1;
  min-width: 20px;
  overflow: auto;
}

.my-right {
  padding: 20px;
  z-index: 1;
}

.my-split {
  cursor: col-resize;
  position: relative;
  z-index: 1;
  user-select: none;
  border-right: 1px solid #ddd;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: rgba(0, 0, 0, 0.15);
    width: 1.5px;
    height: 30px;
  }

  &:before {
    margin-left: -2px;
  }

  &:after {
    margin-left: 1px;
  }

  &:hover:before,
  &:hover:after {
    width: 1.5px;
    background-color: rgba(0, 0, 0, 0.35);
  }
}
</style>
