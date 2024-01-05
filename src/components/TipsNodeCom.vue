<!--
 * @Description: 加一层tips 如果有tips，显示，tips,没有不显示
 * @Date: 2022-10-13 14:00:37
 * @LastEditTime: 2023-05-26 19:58:56
 * @FilePath: \cloud-dop-web\src\components\TipsNodeCom.vue
-->
<template>
  <span class="tips-node-wrap">
    <el-tooltip class="box-item" effect="dark" :disabled="!$attrs.content" :placement="placement" v-bind="$attrs" :hide-after="50" :teleported="true">
      <slot></slot>
    </el-tooltip>
  </span>
</template>

<script>
import { ElTooltip } from 'element-plus'
export default {
  name: 'TipsNodeCom',
  components: {
    ElTooltip
  },
  props: {
    placement: {
      type: String,
      default: 'top',
    },
  },
}
</script>

<style lang="less" scoped>
.tips-node-wrap {
  display: inline-flex;
}
</style>