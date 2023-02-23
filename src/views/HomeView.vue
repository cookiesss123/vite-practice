<template>
  <div class="home">
    <h1>Hello, This is Home Page.</h1>
    <router-link to="/">首頁</router-link> |
    <router-link to="/about">About</router-link>
    <hr>
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
</style>
