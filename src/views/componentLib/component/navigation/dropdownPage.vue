<template lang="html">
  <section class="alertPage">
    <h2>Alert警告</h2>
    <p>用于页面中展示重要的提示信息</p>
    <h3>基本用法</h3>
    <p>页面中的非浮层元素，不会自动消失</p>
    <div class="alertPage-demo">
      <div class="alertPage-demo-example">

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
