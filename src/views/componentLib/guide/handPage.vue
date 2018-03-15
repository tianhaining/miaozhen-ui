<template lang="html">
  <section class="handPage">
    <h2>快速上手</h2>
    <p>本节介绍如何在项目中使用miaozhen-ui</p>
    <h3>使用vue-cli</h3>
    <p>我们可以使用Vue提供的官方命令行工具vue-cli快速搭建大型单页应用</p>
    <div class="handPage-demo">
      <div class="handPage-demo-example">

      </div>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="less">
.handPage {
  color: #5e6d82;
  &-demo {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    &-example {
      padding: 2rem;
      i {
        font-size: 1.5rem;
        margin: 0 1rem;
      }
    }
  }
  .mz-collapse-item__header{
    text-align: center
  }
  .mz-icon-arrow-right {
    display: none;
  }
}
</style>
