<template lang="html">
  <div class="componentLibHome">
    <mz-row>
      <mz-col :span="5">
        <component-nav></component-nav>
      </mz-col>
      <mz-col :span="19">
        <div class="componentLibHome-content">
          <transition name="">
            <router-view></router-view>
          </transition>
        </div>
      </mz-col>
    </mz-row>
  </div>
</template>
<script>
import ComponentNav from './component-nav'
export default {
  data() {
    return {

    };
  },
  methods: {

  },
  components: {
    ComponentNav
  }
}
</script>
<style lang="less">
.componentLibHome {
  background-color: #fff;
  &-content {
    padding: 1rem 10rem 1rem 2rem;
    height: 58rem;
    overflow-y: scroll;
    /*修改滚动条的样式，目前只有chrome浏览器有效果*/
    &::-webkit-scrollbar {/*滚动条整体样式*/
      width: .5rem;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 10px;
       -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: #909399;
    }
    &::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 10px;
      background: #EDEDED;
    }
  }
}
</style>
