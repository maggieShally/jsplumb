<template>
  <div class="menu-container">
    <ul class="menu-list">
      <draggable v-model="menuList" @start="move" @end="end"  item-key="id">
        <template #item="{ element }">
          <li :type="element.type">
            <el-button type="default" :icon="element.icon">{{ element.name }}</el-button>
          </li>
        </template>
      </draggable>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import draggable from "vuedraggable";

export default {
  components: { draggable },
  emits: ['addNode'],
  setup(_, context) {
    const state = reactive({
      menuList: [
        {
          id: 1,
          name: '数据接入',
          type: 'add',
          icon: 'el-icon-s-marketing'
        },
        {
          id: 2,
          name: '接口调用',
          type: 'api',
          icon: 'el-icon-s-help'
        },
      ],
    });
    let nodeMenu

    const move = evt => {
      const type = evt.item.attributes.type.nodeValue
      nodeMenu = getMenuByType(type)
      console.log(nodeMenu)
    }

    const end = evt => {
      context.emit('addNode', evt, nodeMenu)
    }

    function getMenuByType(type) {
      return state.menuList.find(item => item.type === type)
    }

    return {
      ...toRefs(state),
      move,
      end
    };
  },
};
</script>

<style lang="less">
.menu-container {
  width: 200px;

  .menu-list {
    list-style: none;
    li {
      margin: 10px 0;
    }

  }
}
</style>