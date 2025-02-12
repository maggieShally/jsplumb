<!--
 * @Description: 右键快建菜单
 * @Date: 2022-12-14 10:56:03
 * @LastEditTime: 2025-02-06 14:09:29
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\echarts\chartEdit\components\contextMenu\index.vue
-->
<template>
  <div @contextmenu.prevent.stop="handleRightClick" v-click-outside="onClickOutside" style="width: 100%; height: 100%; position: relative">
    <slot>

    </slot>
    <teleport to="body">
      <div class="contextmenu" v-show="visible" :style="{ left: left + 'px', top: top + 'px' }">
        <slot name="menuList"></slot>
      </div>
    </teleport>
  </div>
</template>

<script>
import { reactive, toRefs, toRaw, watch, computed } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'

export default {
  name: 'ContextMenu',
  props: {
    actions: Array,
  },
  directives: {
    'click-outside': vClickOutside,
  },

  setup(props) {
    const state = reactive({
      visible: false,
      left: 0,
      top: 0,
    })

    const getActions = computed(() => {
      return toRaw(props.actions || []).map(action => {
        return action
      })
    })

    watch(
      () => state.visible,
      val => {
        if (val) {
          document.body.addEventListener('click', closeMenu)
          window.addEventListener('scroll', closeMenu, true)
        } else {
          document.body.removeEventListener('click', closeMenu)
          window.removeEventListener('scroll', closeMenu, true)
        }
      }
    )

    const closeMenu = () => {
      state.visible = false
    }

    const handleRightClick = event => {
      console.log(getActions.value)
      state.left = event.pageX
      state.top = event.pageY
      state.visible = true
    }

    const onClickOutside = () => {
      state.visible = false
    }

    return {
      getActions,
      ...toRefs(state),
      handleRightClick,
      onClickOutside,
    }
  },
}
</script>

<style lang="less" scoped>
.contextmenu {
  position: absolute;
  z-index: 999999;
  list-style: none;
  display: inline-block;
}
</style>
