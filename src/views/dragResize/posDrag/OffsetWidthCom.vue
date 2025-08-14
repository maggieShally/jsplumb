<!--
 * @Description: offsetWidth和offsetHeight, clientWidth和clientHeight, scrollLeft和scrollTop, scrollWidth和scrollHeight
 * @Author: <NAME>
 * @Date: 2024-10-10 10:38:01
 * @LastEditTime: 2025-02-12 15:29:00
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\dragResize\posDrag\OffsetWidthCom.vue
-->


<template>
  <el-button type="default" @click="handleShowWidthAndHeight('offset')">flexItemRef offsetHeightWidth</el-button>
  <el-button type="default" @click="handleShowWidthAndHeight('client')">flexItemRef clientHeightWidth</el-button>

  <el-button type="default" @click="handleShowTopAndLeft('offset')">flexItemRef offsetLeftAndTop</el-button>
  <el-button type="default" @click="handleShowTopAndLeft('client')">flexItemRef clientLeftAndTop</el-button>

  <el-button type="default" @click="handleShowScroll('scroll')">flexItemRef scroll</el-button>
  
  <div v-if="clickType === 'widthAndHeight'">
    <br> 
    {{type}}Width: {{width}}<br>
    {{type}}Height: {{height}}<br> <br> 
    {{widthAndHeightDesc[type]}}
  </div>

  <div v-if="clickType === 'leftAndTop'">
    <br> 
    {{type}}Left: {{left}}<br>
    {{type}}Top: {{top}}<br><br> 
    {{topAndLeftDesc[type]}}
  </div>

  <div v-if="clickType === 'scroll'">
    <br> 
    scrollLeft: {{scrollLeft}}<br>
    scrollTop: {{scrollTop}}<br>
    scrollWidth: {{scrollWidth}}<br>
    scrollHeight: {{scrollHeight}}<br><br> 
    <div v-html="scrollDesc" />
  </div>

  <div class="flex-wrap">
    <div ref="flexItemRef" class="flex-item">
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
      <p>flexItemRef</p>
    </div>
  </div>
</template>

<script>
import { reactive,ref, toRefs, onMounted } from 'vue'

const widthAndHeightDesc = {
  offset: '包括了元素的边框(border)、内边距(padding)和实际内容的宽度',
  client: 'clientWidth只包括了元素的实际内容的宽度，不包括边框和内边距的宽度'
}

const topAndLeftDesc = {
  offset: 'offsetLeft/offsetTop只读,相对父元素的偏移量',
  client: 'clientLeft/clientTop元素边框厚度'
}

const scrollDesc = `
  scrollTop和scrollLeft是可读写属性 。<br>
  scrollTop：返回网页滚动条垂直方向滚去的距离； <br>
  scrollLeft：返回网页滚动条水平方向滚去的距离；<br>
  scrollWidth和scrollHeight是只读属性，<br>
  返回当前节点的实际宽度和实际高度（不包括边框）,没有滚动条时和clientWidth和clientHeight一样
`

export default {
  name: 'OffsetWidthCom',
  components: {
  },
  props: {
  },
  setup() {
    const flexItemRef = ref(null)
    const state = reactive({
      clickType: '',
      type: '',

      width: '',
      height: '',
     
      left: '',
      top: '',

      scrollTop: '',
      scrollLeft: '',
      scrollWidth: '',
      scrollHeight: '',
    })

    const handleShowWidthAndHeight = type => {
      state.clickType = 'widthAndHeight'
      state.type = type
      state.width = flexItemRef.value[`${type}Width`]
      state.height = flexItemRef.value[`${type}Height`]
    }

    const handleShowTopAndLeft = type => {
      state.clickType = 'leftAndTop'
      state.type = type
      state.left = flexItemRef.value[`${type}Left`]
      state.top = flexItemRef.value[`${type}Top`]
    }

    const handleShowScroll = type => {
      state.clickType = 'scroll'
      state.type = type

      state.scrollTop = flexItemRef.value.scrollTop
      state.scrollLeft = flexItemRef.value.scrollLeft
      state.scrollHeight = flexItemRef.value.scrollHeight
      state.scrollWidth = flexItemRef.value.scrollWidth

    }

    onMounted(() => {

    })
    return {
      widthAndHeightDesc,
      topAndLeftDesc,
      scrollDesc,
      flexItemRef,
      ...toRefs(state),
      handleShowWidthAndHeight,
      handleShowTopAndLeft,
      handleShowScroll,
    }
  },
}

</script>
<style scoped lang='less'>
.flex-wrap {
  margin-top: 20px;
  padding: 40px;
  display: flex;
  width: 500px;
  height: 500px;
  background: #ccc;
  overflow: hidden;
  position: relative;
  .flex-item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 200px;
    height: 200px;
    background: #fff;
    border: 20px solid #000;
    overflow: auto;
  }
}
</style>