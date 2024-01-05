
<template>
    <ContextMenu :actions="menuList">
      <div :class="{ 'node-sec': true, 'isActive': isChecked}" @click="handleGetRouter">
        <div>
          <span v-if="nodeInfo.level >= 1">{{ nodeInfo.itemProduct }} / {{ nodeInfo.level }} / {{ nodeInfo.nodeId }} / {{ nodeInfo.jobName }}</span>
          <span v-if="nodeInfo.level >= 2"> / {{ nodeInfo.itemNum }} </span>
          <span v-if="nodeInfo.level >= 3">/ {{ nodeInfo.nodeId }}</span>
        </div>

        <div class="plus-item">
          <span v-if="nodeInfo.level < 3" class="icon-plus" @click.stop="getNextLevel">
            <el-icon :size="18">
              <Plus />
            </el-icon>
          </span>
        </div>
      </div>
    </ContextMenu>
</template>

<script>
import { toRefs, reactive, inject, onMounted, ref } from 'vue'
import { ElIcon } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import ContextMenu from '@/components/contextMenu'

export default {
  name: 'NodeCom',
  components: {
    Plus, ElIcon,
    ContextMenu,
  },
  props: {
    data: Object
  },
  emits: ['onNext', 'onPre', 'onHightLight'],
  setup(props, context) {
    const getNode = inject('getNode')
    const getGraph = inject('getGraph')
    const graph = getGraph()

    const node = getNode()

    const state = reactive({
      nodeInfo: node.data,
      isChecked: false, // 要高亮的节节点
      index: node.data.index,
      menuList: getMenuList(node.data),
      isSelected: node.data.isSelected, // 被先中的节点
    })

    function getMenuList(data) {
      let menuList = []
      if (data.level > 1) {
        menuList.push({
          label: '返回上一层',
          onClick: handleGoPreLevel.bind(null)
        })
      }
      return menuList
    }

    // 返回上一层
    function handleGoPreLevel() {
      context.emit('onPre', node)
    }

    // 下一层
    const getNextLevel = () => {
      context.emit('onNext', node)
    }

    const handleGetRouter = () => {
      context.emit('onHightLight', node)
    }

    onMounted(() => {
      node.on('change:data', ({ current }) => {
        state.isChecked = current.isChecked
        state.index = current.index
        state.isSelected = current.isSelected
      })
    })

    return {
      ...toRefs(state),
      getNextLevel,
      handleGetRouter,
    }
  }
}
</script>

<style lang="less" scoped>
.node-sec {
  width: 100%;
  height: 100%;
  text-align: center;
  border: 3px solid #dadada;
  background: rgba(255,255,255, .5);

  &.isActive {
    border-color: #c02828 
  }
}

.plus-item {
  margin-top: 30px;
  text-align: center;

  .icon-plus {
    border: 1px solid #ddd;
    padding: 3px 5px;
  }
}
</style>