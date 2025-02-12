

<template>
  <GridLayout :itemList="itemList" :idKey="idKey" />
</template>

<script>
import { reactive, toRefs, onMounted, defineAsyncComponent } from 'vue'

export default {
  name: 'SubGrid',
  components: {
    GridLayout: defineAsyncComponent(() => import('../GridLayout.vue'))
  },
  props: {
    dataInfo: Object,
    idKey: String,
  },
  setup(props, context) {

    const state = reactive({
      itemList: props.dataInfo?.subGridOpts?.children || []
    })

    onMounted(() => {

    })

    return {
      ...toRefs(state),
    }
  },
}

</script>
<style scoped lang='less'></style>