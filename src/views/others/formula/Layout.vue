<template>

  <teleport to="body" :disabled="isShow">
    <slot>
    </slot>
  </teleport>
</template>

<script>
import { computed, reactive, toRefs, watch } from 'vue'
export default {
  name: 'Layout',
  props: {
    showTab: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const state = reactive({
      visible: true,
    })

    const isShow = computed(() => props.showTab)

    watch(
      () => props.showTab,
      val => {
        if (!val) {
          state.visible = true
        }
      }
    )
    return {
      isShow,
      ...toRefs(state),
    }
  },
}
</script>

<style>
</style>