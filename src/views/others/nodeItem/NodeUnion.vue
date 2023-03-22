<!--
 * @Description: 
 * @Date: 2022-06-16 11:22:06
 * @LastEditTime: 2022-12-05 10:22:27
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\nodeItem\NodeUnion.vue
-->

<template>
  <div class="node-union-wrap">

    <div class="node-line" v-if="currentNode.unionToParent">
      <IconUnion :type="currentNode.unionToParent.type" :nodeIndex="nodeIndex" :isLast="isLast" />
    </div>

    <div class="node">
      {{currentNode.name}}
    </div>

    <div>
      <el-dropdown :teleported="false" @command="handleCommand">
        <el-icon>
          <Edit />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="addSub">添加关联</el-dropdown-item>
            <el-dropdown-item command="edit">编辑关联</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>

    <div v-if="currentNode.children">
      <NodeUnion v-for="(item, index) in currentNode.children" :nodeIndex="index" :currentNode="item" :key="index" :childrenList="item.children" :isLast="childrenList.length - 1 === index" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import IconUnion from './IconUnion.vue'

export default {
  name: 'NodeUnion',
  components: {
    IconUnion,
  },
  props: {
    currentNode: {
      type: Object,
      default: () => {},
    },
    nodeIndex: {
      type: Number,
    },
    childrenList: {
      type: Array,
      default: () => [],
    },
    isLast: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const state = reactive({
      pathParam: 'm0,13 l18,0 m24,0 l18,0',
      lineLength: 13,
    })

    const handleCommand = (command) => {
      console.log(command)
    }

    return {
      ...toRefs(state),
      handleCommand,
    }
  },
}
</script>

<style lang="less" scoped>
.node-union-wrap {
  display: flex;
  .node-line {
    width: 100px;
  }
  .node {
    margin: 0 0 10px 0;
    min-width: 200px;
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 10px;
  }
}
</style>