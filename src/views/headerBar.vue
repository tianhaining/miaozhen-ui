<template lang="html">
  <header class="headerBar">
    <mz-row>
      <mz-col :span="12">
        <div class="headerBar-logo">
          <img class="headerBar-logo-img" src="../assets/logo.png" alt="秒针系统">
        </div>
      </mz-col>
      <mz-col :span="12">
        <mz-menu class="headerBar-nav"
          :default-active="headerActiveIndex"
          mode="horizontal"
          background-color="#424242"
          text-color="#fff"
          active-text-color="#eb3433"
          @select="handleSelect"
          >
          <mz-menu-item index="/home/componentHome">
            <i class="mz-icon-edit"></i>
            组件库
          </mz-menu-item>
          <mz-menu-item index="/home/echartsHome">
            <i class="mz-icon-picture"></i>
            图表
          </mz-menu-item>
        </mz-menu>
      </mz-col>
    </mz-row>
  </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'headerBar',
  data(){
    return {

    }
  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.$router.push(keyPath[0]);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
   },
   handleClose(key, keyPath) {
      console.log(key, keyPath);
   }
 },
 computed: mapState({
   headerActiveIndex: state => state.headerActiveIndex
 }),
 created(){

 }
}
</script>

<style lang="less">
  .headerBar {
    background: #424242;
    padding: 5px 30px 0px 30px;
    &-logo {
      height: 60px;
      &-img{
          height: 3.5rem;
      }
    }
    &-nav {
      border-bottom: 0px solid #e6e6e6;
    }
  }
</style>
