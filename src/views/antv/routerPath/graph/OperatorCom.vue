<!--
 * @Description: 主视图左侧操作按钮
 * @Date: 2024-08-07 13:59:07
 * @LastEditTime: 2024-08-09 17:09:20
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\antv\routerPath\graph\OperatorCom.vue
-->


<template>

  <div class="operator-sec">

    <el-tooltip content="图形居中" placement="right">
      <el-icon @click="handleCommand('center')">
        <Compass />
      </el-icon>
    </el-tooltip>

    <el-tooltip content="还原节点位置" placement="right">
      <el-icon @click="handleCommand('reset')">
        <RefreshLeft />
      </el-icon>
    </el-tooltip>

    <el-tooltip content="禁用选中连线" placement="right">
      <el-icon :class="isDisabledLine ? 'isActive' : ''" @click="handleCommand('disableLine')">
        <Compass />
      </el-icon>
    </el-tooltip>

    <el-dropdown type="primary" placement="right" @command="handleCommand">
      <el-icon>
        <Operation />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="itemProduct">产品大类</el-dropdown-item>
          <el-dropdown-item command="itemCapacity">容量</el-dropdown-item>
          <el-dropdown-item command="itemNum">sku</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-tooltip content="选起终点" placement="right">
      <el-icon @click="handleCommand('startEnd')">
        <SemiSelect />
      </el-icon>
    </el-tooltip>

    <el-tooltip content="全屏" placement="right">
      <el-icon @click="handleCommand('fullScreen')">
        <FullScreen />
      </el-icon>
    </el-tooltip>
  </div>

</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue'

export default {
  name: 'OperatorCom',
  components: {
  },
  props: {
    
  },
  emits: ['onCommand'],
  setup(props, context) {

    const state = reactive({
      isDisabledLine: false,
    })

    const handleCommand = command => {
      if(command === 'disableLine') {
        state.isDisabledLine = !state.isDisabledLine
      }
      context.emit('onCommand', command, state.isDisabledLine)
    }

    return {
      ...toRefs(state),
      handleCommand
    }
  }
}
</script>

<style lang='less' scoped>
.operator-sec {
  display: flex;
  flex-direction: column;
  position: absoluter;
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translate(0, -50%);
  z-index: 100;

  .el-icon {
    font-size: 20px;
    margin: 3px 0;
    cursor: pointer;
    
    &:hover {
      color: var(--el-color-primary);
    }
  }
}

.isActive {
  color: var(--el-color-primary);
}
</style>