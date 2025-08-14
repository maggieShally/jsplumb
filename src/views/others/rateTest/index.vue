



<template>
  <RouterLink to="/others/rateTest/test2">test2</RouterLink>
  <RouterLink to="/others/rateTest/test1">test1</RouterLink>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
export default {

}
</script>

<style></style>
