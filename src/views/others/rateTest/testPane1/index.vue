<!--
 * @Description: 
 * @Date: 2025-07-03 10:36:40
 * @LastEditTime: 2025-08-11 17:19:17
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\rateTest\testPane1\index.vue
-->

<template>
  <div>
    {{ info.myName.isName }}
  </div>
  <el-button v-tooltip:top="'测试tooltip指令'" type="primary" @click="handleChangeName">changeName</el-button>

  <!-- <el-tabs v-model="activeName">
    <el-tab-pane label="b1" name="b1">
      <BCom :count="1" />
    </el-tab-pane>
    <el-tab-pane label="b2" name="b2">
      <BCom :count="2" />
    </el-tab-pane>
    <el-tab-pane label="b3" name="b3">
      <BCom :count="3" />
    </el-tab-pane>
    <el-tab-pane label="asyncA" name="asyncA">
      <AsyncACom />
    </el-tab-pane>
  </el-tabs> -->

  <el-button @click="showCom = !showCom">切换组件</el-button>
  <el-button @click="activeName = 'b1'">切换到B1</el-button>
  <el-button @click="activeName = 'b2'">切换到B2</el-button>
  <el-button @click="activeName = 'b3'">切换到B3</el-button>

  <keep-alive>
    <BCom :count="activeName" :key="activeName"/>
  </keep-alive>
</template>

<script>
import { ref, computed, reactive, defineAsyncComponent } from 'vue'
import BCom from './BCom.vue'

const AsyncACom = defineAsyncComponent(() => {
  return import('./asyncA.vue')
})

export default {
  name: 'TestPane1',
  components: {
    AsyncACom,
    BCom
  },
  setup() {
    const showCom = ref(false)
    const activeName = ref('b1')

    const name = reactive({
      isName: 'name1'
    })

    const myName = computed(() => {
      return {
        isName: name.isName
      }
    })

    const info = computed(() => {
      return {
        myName: myName.value
      }
    })

    const handleChangeName = () => {
      name.isName = 'name2'

      showCom.value = true
    }

    return {
      info,
      showCom,
      handleChangeName,
      activeName
    }
  }
}
</script>

<style></style>
