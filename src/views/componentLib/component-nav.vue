<template lang="html">
  <nav class="side-nav">
    <mz-menu
      :default-active="activeIndex"
      :default-openeds="keyArr"
      @open="handleOpen"
      @close="handleClose"
      class="mz-menu-vertical-demo">
      <mz-submenu index="guide-menu">
        <template slot="title">
          <span>开发指南</span>
        </template>
        <mz-menu-item index="/home/componentHome/installPage" @click="changeRouter('/home/componentHome/installPage')">安装</mz-menu-item>
        <mz-menu-item index="/home/componentHome/handPage" @click="changeRouter('/home/componentHome/handPage')">快速上手</mz-menu-item>
      </mz-submenu>
      <mz-submenu index="component-menu">
        <template slot="title">
          <span>组件</span>
        </template>
        <mz-menu-item-group v-for="(item, index) in comLibNavData" :title="item.type" :key="index">
          <mz-menu-item v-for="(comItem, comIndex) in item.componentNavInfo" :index="comItem.index" :key="comIndex" @click="changeRouter(comItem.index)">{{comItem.name}}</mz-menu-item>
        </mz-menu-item-group>
      </mz-submenu>
    </mz-menu>
  </nav>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      keyArr:['guide-menu', 'component-menu']
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getInitData(){
        this.$store.commit('getLibNavData');
    },
    changeRouter(path){
      this.$router.push(path);
      this.$store.commit('changeIndex', {
        index: path
      })
    }
  },
  computed: mapState({
    activeIndex: state => state.activeIndex,
    comLibNavData: state => state.comLibNavData
  }),
  created(){
    this.getInitData();
    this.$store.commit('changeIndex', {
      index: this.$route.path
    })
  }
}
</script>
<style lang="less">
.side-nav {
  padding: 1rem 0rem 1rem 0rem;
  height: 58rem;
  overflow-y: scroll;
}
/*修改滚动条的样式，目前只有chrome浏览器有效果*/
.side-nav::-webkit-scrollbar {/*滚动条整体样式*/
  width: .5rem;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.side-nav::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 10px;
   -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #909399;
}
.side-nav::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 10px;
  background: #EDEDED;
}
</style>
