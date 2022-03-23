<!--
 * @Description: 
 * @Date: 2022-01-12 10:19:24
 * @LastEditTime: 2022-01-12 16:37:35
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\x6Flow\contextMenu.vue
-->

<template>
  <div>
    <ul v-if="visible" class="contextmenu" :style="{ left: left + 'px', top: top + 'px' }">
     <li @click="$emit('onRunNode')">运行节点</li>
      <li v-if="nodeType === 'edge'">删除连线</li>
      <template v-else>
        <li>删除边</li>
      </template>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
import { toRefs, reactive, watch, computed, unref, onMounted, onUnmounted } from 'vue'
import useClient from './useClient.js'
export default {
  name: 'BaseContextMenu',
  props: {
    nodeEvent: Object,
  },
  emits: ['onRunNode'],
  setup(props) {

    const state = reactive({
      visible: false,
      left: 0,
      top: 0,
    })

    const { clientData, getClientData } = useClient()

    const nodeType = computed(() => {
      return props.nodeEvent.nodeType
    })

    const handleClick = e => {
      getClientData(e)
    }

    const closeMenu = () => {
      state.visible = false
    }

    watch(() => props.nodeEvent, val => {
      getClientData(val.event)
    })

    watch(
      clientData,
      val => {
        state.left = val.x
        state.top = val.y
        state.visible = true
      },
      {
        deep: true,
      }
    )

    onMounted(() => {
      document.body.addEventListener('click', closeMenu)
      window.addEventListener('scroll', closeMenu, true)
    })

    onUnmounted(() => {
      document.body.removeEventListener('click', closeMenu)
      window.removeEventListener('scroll', closeMenu, true)
    })

    return {
      nodeType,
      ...toRefs(state),
      handleClick
    }
  },
}
</script>

<style lang="less" scoped>
.contextmenu {
  position: fixed;
  z-index: 999999;
  padding: 8px 15px;
  background: #fff;
  border: 1px solid #ddd;
  list-style: none;
  border-radius: 3px;
  display: inline-block;

  .contextmenu-item {
    margin: 5px 0px;
    a {
      font-size: 13px;
      color: #606266;

      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>