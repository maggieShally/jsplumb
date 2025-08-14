<!--
 * @Description: 
 * @Date: 2022-03-24 11:27:38
 * @LastEditTime: 2022-03-24 15:12:23
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\dragResize\posDrag\PosRight.vue
-->

<template>
    <ul class="menu-list">
      <draggable group="site" filter=".forbid" :options="{ group: { name: 'site', pull: 'clone' }, sort: true }" v-model="rightList" @start="onStart" @end="onEnd" item-key="id">
        <template #item="{ element }">
          <li :type="element.type" class="forbid">
            {{ element.name }}
          </li>
        </template>
      </draggable>
    </ul>
</template>

<script>
import { reactive, toRefs, watch, computed } from 'vue'
import draggable from 'vuedraggable'

export default {
  name: 'PosRight',
  components: {
    draggable
  },
  props: {
    dragInfo: Object,
    hasActive: Number
  },
  setup(props) {
    const state = reactive({
      rightList: [
        { id: 1, name: 'www.google.com' },
        { id: 2, name: 'www.msn.com' },
        { id: 3, name: 'www.ebay.com' },
        { id: 4, name: 'www.yahoo.com' }
      ]
    })

    const dragInfo = computed(() => props.dragInfo)

    watch(() => props.hasActive, (newVal, oldVal)=> {
      console.log(newVal, oldVal)
      const items = state.rightList.filter(item => item.id === dragInfo.value.id)
      if(items.length < 2) return false
       state.rightList.splice(dragInfo.value.index, 1)
    })

    const onStart = evt => {
      console.log(evt)
    }

    const onEnd = evt => {
      console.log('right', evt)
    }

    return {
      ...toRefs(state),
      onStart,
      onEnd
    }
  }
}
</script>

<style lang="less" scoped>
.menu-list {
  padding: 10px;
  margin: 100px;
  width: 200px;
  display: inline-block;
  border: 1px solid #ddd;
  list-style: none;
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
