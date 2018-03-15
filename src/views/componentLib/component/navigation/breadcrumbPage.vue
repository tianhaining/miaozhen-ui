<template lang="html">
  <section class="alertPage">
    <h2>Breadcrumb面包屑</h2>
    <p>显示当前页面的路径，快速返回之前的任意页面</p>
    <h3>基础用法</h3>
    <p>适用广泛的基础用法</p>
    <div class="alertPage-demo">
      <div class="alertPage-demo-example">
        <mz-breadcrumb separator="/">
          <mz-breadcrumb-item :to="{ path: '/' }">首页</mz-breadcrumb-item>
          <mz-breadcrumb-item>活动管理</mz-breadcrumb-item>
          <mz-breadcrumb-item>活动列表</mz-breadcrumb-item>
          <mz-breadcrumb-item>活动详情</mz-breadcrumb-item>
        </mz-breadcrumb>
      </div>
      <div class="alertPage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>

              </pre>
            </div>
          </mz-collapse-item>
        </mz-collapse>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {

    };
  }
}
</script>

<style lang="less">
.alertPage {
  color: #5e6d82;
  &-demo {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    &-example {
      padding: 2rem;
    }
    .mz-alert{
      margin: 20px 0;
    }
    .mz-alert:first-child {
      margin: 0;
    }
  }
  .mz-collapse-item__header{
    text-align: center
  }
}
</style>
