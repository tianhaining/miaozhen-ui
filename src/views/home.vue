<template lang="html">
  <div class="home">
    <header-bar></header-bar>
    <div class="containter">
      <transition name="">
        <router-view></router-view>
      </transition>
    </div>
    <!-- <footer-nav></footer-nav> -->
  </div>
</template>

<script>
import headerBar from './headerBar'
export default {
  name: 'home',
  data(){
    return {}
  },
  components: {
    headerBar
  }
}
</script>

<style lang="less">
.containter {
  padding: 1rem;
}
</style>
