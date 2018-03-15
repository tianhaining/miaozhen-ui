<template lang="html">
  <section class="notificationPage">
    <h2>Notification通知</h2>
    <p>悬浮出现在页面角落，显示全局的通知提醒消息</p>
    <h3>基本用法</h3>
    <p>适用性广泛的通知栏</p>
    <div class="notificationPage-demo">
      <div class="notificationPage-demo-example">
        <mz-button
          plain
          @click="open">
          可自动关闭
        </mz-button>
        <mz-button
          plain
          @click="open2">
          不会自动关闭
        </mz-button>
      </div>
      <div class="notificationPage-demo-control">
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
  methods: {
    open() {
      const h = this.$createElement;

      this.$notify({
        title: '标题名称',
        message: h('i', { style: 'color: teal'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
      });
    },

    open2() {
      this.$notify({
        title: '提示',
        message: '这是一条不会自动关闭的消息',
        duration: 0
      });
    }
  }
}
</script>

<style lang="less">
.notificationPage {
  color: #5e6d82;
  &-demo {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    &-example {
      padding: 2rem;
    }
  }
  .mz-collapse-item__header{
    text-align: center
  }
}
</style>
