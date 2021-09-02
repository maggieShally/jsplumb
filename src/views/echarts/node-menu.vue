<!--
 * @Description: 
 * @Date: 2021-08-06 16:28:14
 * @LastEditTime: 2021-08-12 15:24:50
 * @FilePath: \jsplumb-test\src\views\echarts\node-menu.vue
-->
<template>
  <div class="menu-container">
    <ul class="menu-list">
      <draggable v-model="menuList" @start="move" @end="end" item-key="id">
        <template #item="{ element }">
          <li :type="element.type">
            <div class="">
              <el-image style="width: 100px; height: 100px" :src="element.imgUrl"></el-image>
            </div>
            <!-- <el-button type="default" :icon="element.icon">{{ element.name }}</el-button> -->
          </li>
        </template>
      </draggable>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import draggable from 'vuedraggable'

export default {
  name: 'EchartNodeMenu',
  components: { draggable },
  emits: ['addNode'],
  setup(_, context) {
    const state = reactive({
      menuList: [
        {
          id: 1,
          name: '柱图',
          type: 'bar',
          icon: 'el-icon-s-marketing',
          imgUrl: require('@/assets/imgs/chartImg/img-bar.png')
        },
        {
          id: 2,
          name: '折线',
          type: 'line',
          icon: 'el-icon-s-marketing',
          imgUrl: require('@/assets/imgs/chartImg/img-line.png')
        },
      ],
    })
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
      end,
    }
  },
}
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