<!--
 * @Description: 
 * @Date: 2024-02-21 14:20:03
 * @LastEditTime: 2024-03-06 10:54:35
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\iframeTest\ApprovalCom.vue
-->
<template>
  <slot></slot>
</template>

<script>
import { ref, reactive, toRefs, onMounted} from 'vue'
import { on } from 'screenfull'
export default {
name: 'ApprovalCom',
components: {
},
props: {
},
emits: ['onApproval'],
setup(props, context){

  // const canClickToggle = val => {
  //   parent.document.querySelector('#canCick').value = val
  // }

  // onMounted(() => {
  //   parent.window.doSubmit = () => {
  //     canClickToggle(false)
  //     context.emit('onApproval', {}, () => {
  //       canClickToggle(true)
  //       console.log('onsuccess')
  //     })
  //   }
  // })

 return {
  // canClickToggle
 }
}
}
</script>

<style lang='less' scoped>

</style>