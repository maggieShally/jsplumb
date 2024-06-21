<!--
 * @Description: 右键快建菜单
 * @Date: 2022-12-14 10:56:03
 * @LastEditTime: 2024-01-10 18:01:53
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\components\contextMenu\index.vue
-->
<template>
  <div @contextmenu.prevent.stop="handleRightClick" v-click-outside="onClickOutside" style="width: 100%; height: 100%; position: relative">
    <slot>

    </slot>

    <teleport to="body">
      <ul class="contextmenu" v-show="visible && getActions?.length" :style="{ left: left + 'px', top: top + 'px' }">
        <li class="contextmenu-item" v-for="item in getActions" :key="item.label" @click="item.onClick">
          <span>{{ item.label }}</span>
        </li>
      </ul>
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
  padding: 5px 0;
  background: #fff;
  border: 1px solid #ddd;
  list-style: none;
  border-radius: 3px;
  display: inline-block;
  font-size: 14px;
  color: #606266;
  min-width: 130px;

  .contextmenu-item {
    padding: 5px 15px;
    border-radius: 2px;

    cursor: pointer;

    &:hover {
      color: #409eff;
      background: #eee;
    }
  }
}
</style>
