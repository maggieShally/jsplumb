<!--
 * @Description: 
 * @Date: 2022-03-24 11:27:32
 * @LastEditTime: 2023-10-13 17:31:08
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\dragResize\posDrag\PosLeft.vue
-->
<template>
  <ul class="menu-list">
    <draggable :group="{ name: 'site', pull: 'clone', put: true }" v-model="leftList" :move="onMove" @end="onEnd" item-key="id">
      <template #item="{ element }">
        <div>
          <li :type="element.type">
            {{ element.name }}
          </li>
        </div>

      </template>
    </draggable>
  </ul>
</template>

<script>
import { reactive, toRefs } from 'vue'
import draggable from 'vuedraggable'

export default {
  name: 'PosLeft',
  components: {
    draggable
  },
  emits: ['onActive'],
  setup(_, context) {
    const state = reactive({
      leftList: [
        { id: 11, name: 'www.itxst.com' },
        { id: 22, name: 'www.jd.com' },
        { id: 33, name: 'www.baidu.com' },
        { id: 44, name: 'www.taobao.com' }
      ],
      activeId: ''
    })

    const onMove = (e, originalEvent) => {
      console.log(e.draggedContext.element.id)
      const activeId = e.draggedContext.element.id
      state.activeId = activeId

    }

    const onEnd = evt => {
      debugger
      context.emit('onActive', {
        id: state.activeId,
        index: evt.newDraggableIndex
      })
    }

    return {
      ...toRefs(state),
      onMove,
      onEnd
    }
  }
}
</script>

<style lang="less" scoped>
.menu-list {
  margin: 100px;
  padding: 10px;
  width: 200px;
  border: 1px solid #ddd;
  list-style: none;
  display: inline-block;
  vertical-align: top;

  li {
    line-height: 2em;
    margin: 10px 0;
    padding: 10px;
    width: 100%;
    display: inline-block;
    border: 1px solid #ddd;
  }
}
</style>
