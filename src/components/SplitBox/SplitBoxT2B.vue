<!--
 * @Description: 分屏组 上下 可拖拉布局
 * @Date: 2024-07-01 11:46:11
 * @LastEditTime: 2024-08-07 15:58:51
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\components\SplitBox\SplitBoxT2B.vue
-->

<template>
  <div ref="container" class="box-container">
    <div class="my-top" :style="topStyle">
      <slot name="top"></slot>
    </div>
    <div ref="spliter" style="width: 100%; height: 10px" class="my-spliter" />
    <div class="my-bottom" :style="bottomStyle">
      <slot name="bottom"></slot>
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
      default: 0.6
    }
  },
  setup(props) {

    const container = ref(null);
    const spliter = ref(null);
    const topStyle = ref({});
    const bottomStyle = ref({});
    const ratio = ref(props.initRatio);

    function updatePaneStyles(newRatio) {
      topStyle.value = { height: `calc(${newRatio * 100}% - 5px)` };
      bottomStyle.value = { height: `calc(${(1 - newRatio) * 100}% - 5px)` };
    }

    function handleResize(e) {
      const containerHeight = container.value.clientHeight;
      const rect = container.value.getBoundingClientRect();
      const initX = rect.left;
      const initY = rect.top;
      function onMouseMove(e) {
        e.preventDefault();
        // 限制鼠标移动事件的范围为container容器四至范围内
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
          onMouseUp();
        }
        const moveScale = (e.clientY - initY) / containerHeight;
        const newRatio = moveScale;
        // console.log(newRatio)
        if (newRatio > 0.05 && newRatio < 0.95) {
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
      if (spliter.value) {
        spliter.value.addEventListener('mousedown', handleResize, false);
        spliter.value.addEventListener('dblclick', onDblClick, false);
      }
    })

    onUnmounted(() => {
      if (spliter.value) {
        spliter.value.removeEventListener('mousedown', handleResize);
        spliter.value.removeEventListener('dblclick', onDblClick);
      }
    })

    return {
      container,
      spliter,
      topStyle,
      bottomStyle
    }
  }
}


</script>

<style scoped>
.box-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.my-top {
  padding-bottom: 10px;
  width: 100%;
  z-index: 1;
  min-height: 80px;
  overflow: auto;
}

.my-bottom {
  padding-top: 10px;
  height: 100%;
  z-index: 1;
}

.my-spliter {
  cursor: row-resize;
  position: relative;
  z-index: 1;
  user-select: none;
  border-bottom: 1px solid #ddd;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: rgba(0, 0, 0, 0.15);
    width: 30px;
    height: 1.5px;
  }

  &:before {
    margin-top: 7px;
  }

  &:after {
    margin-top: 1px;
  }

  &:hover:before,
  &:hover:after {
    height: 1.5px;
    background-color: rgba(0, 0, 0, 0.35);
  }
}
</style>
