
<template>
    <ContextMenu :actions="menuList">
      <div :class="{ 'node-sec': true, 'isActive': isChecked}" :style="{'background-color': nodeBgCode, 'opacity': opacity }">
        <div>
          <span v-if="nodeInfo.level >= 1 || uKey === 'subPath'">{{ nodeInfo.itemProduct }}</span>
          <!-- / {{ nodeInfo.level }} / {{ nodeInfo.nodeId }} / {{ nodeInfo.jobName }} -->
          <span v-if="nodeInfo.level >= 2 || uKey === 'subPath'"> / {{ nodeInfo.itemNum }} </span>
          <!-- <span v-if="nodeInfo.level >= 3">/ {{ nodeInfo.nodeId }}</span> -->
        </div>

        <div class="plus-item" v-if="uKey === 'main'">
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

import { processConfig } from '../config.js'

export default {
  name: 'NodeCom',
  components: {
    Plus, ElIcon,
    ContextMenu,
  },
  props:{
    uKey: String
  },
  emits: ['onNext', 'onPre'],
  setup(props, context) {
    
    const getNode = inject('getNode')
    const getGraph = inject('getGraph')
    const graph = getGraph()

    const node = getNode()

    const state = reactive({
      nodeInfo: node.data,
      isChecked: false, // 要高亮的节点
      opacity: 1,
      index: node.data.index,
      menuList: getMenuList(node.data),

      nodeBgCode: processConfig.find(i => i.key === node.data.processId)?.color
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

    onMounted(() => {
      node.on('change:data', ({ current }) => {
        state.isChecked = current.isChecked
        state.index = current.index
        state.opacity = current.opacity
      })
    })

    return {
      ...toRefs(state),
      getNextLevel,
    }
  }
}
</script>

<style lang="less" scoped>
.node-sec {
  width: 100%;
  height: 100%;
  font-size: 12px;
  text-align: center;
  border: 3px solid #dadada;
  background: rgba(0,0,0, .5);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &.isActive {
    border-color: #c02828 
  }
}

.plus-item {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  text-align: center;

  .icon-plus {
    display: flex;
    width: 25px;
    height: 25px;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0,0,0, .5);
    border-radius: 5px;
    
  }
}
</style>