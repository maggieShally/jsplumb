<!--
 * @Description: 
 * @Date: 2023-03-30 15:22:29
 * @LastEditTime: 2023-03-31 10:31:39
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\components\screenFull\FullScreenToolCom.vue
-->
<template>
  <div :class="['tools-wrap', `is${placement}`]" ref="toolRef">

    <el-tooltip :content="pageText" :placement="placement" teleported :append-to="toolRef">
      <span @click="$emit('onPageFull')">
        <el-icon :size="20">
          <CopyDocument />
        </el-icon>
      </span>
    </el-tooltip>

    <el-tooltip :content="floatText" :placement="placement" teleported :append-to="toolRef">
      <span @click="$emit('onFloat')">
        <el-icon :size="20">
          <CopyDocument />
        </el-icon>
      </span>
    </el-tooltip>

    <el-tooltip :content="screenText" :placement="placement" teleported :append-to="toolRef">
      <span @click="$emit('onScreenFull')">
        <el-icon :size="20">
          <FullScreen />
        </el-icon>
      </span>
    </el-tooltip>

  </div>
</template>

<script>
import { computed, reactive, toRefs, ref } from 'vue'
export default {
  name: 'FullScreenToolCom',
  props: {
    isFloat: {
      type: Boolean,
    },
    isFullScreen: {
      type: Boolean,
    },
    isPageFull: {
      type: Boolean,
    },
    placement: {
      type: String,
      default: 'top',
    },
  },
  setup(props) {
    const toolRef = ref(null)
    const state = reactive({})

    const screenText = computed(() => {
      return props.isFullScreen ? '退出全屏' : '全屏'
    })

    const floatText = computed(() => {
      return props.isFloat ? '退出浮窗' : '浮窗'
    })

    const pageText = computed(() => {
      return props.isPageFull ? '退出网页全屏' : '网页全屏'
    })

    return {
      toolRef,
      screenText,
      floatText,
      pageText,
      ...toRefs(state),
    }
  },
}
</script>

<style lang="less" scoped>
.tools-wrap {
  text-align: right;

  .el-icon {
    cursor: pointer;
  }

  &.isright {
    position: absolute;
    right: 0px;
    top: 50px;

    .el-icon {
      display: block;
    }
  }
}
</style>