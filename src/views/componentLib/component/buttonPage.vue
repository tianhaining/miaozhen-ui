<template lang="html">
  <section class="buttonPage">
    <h2>Button按钮</h2>
    <p>常用的操作按钮</p>
    <h3>基础用法</h3>
    <p>基础的按钮用法</p>
    <div class="buttonPage-demo">
      <div class="buttonPage-demo-example">
        <div>
          <mz-button>默认按钮</mz-button>
          <mz-button type="primary">主要按钮</mz-button>
          <mz-button type="success">成功按钮</mz-button>
          <mz-button type="info">信息按钮</mz-button>
          <mz-button type="warning">警告按钮</mz-button>
          <mz-button type="danger">危险按钮</mz-button>
        </div>

        <div style="margin: 20px 0">
          <mz-button plain>朴素按钮</mz-button>
          <mz-button type="primary" plain>主要按钮</mz-button>
          <mz-button type="success" plain>成功按钮</mz-button>
          <mz-button type="info" plain>信息按钮</mz-button>
          <mz-button type="warning" plain>警告按钮</mz-button>
          <mz-button type="danger" plain>危险按钮</mz-button>
        </div>

        <div>
          <mz-button round>圆形按钮</mz-button>
          <mz-button type="primary" round>主要按钮</mz-button>
          <mz-button type="success" round>成功按钮</mz-button>
          <mz-button type="info" round>信息按钮</mz-button>
          <mz-button type="warning" round>警告按钮</mz-button>
          <mz-button type="danger" round>危险按钮</mz-button>
        </div>

      </div>
      <div class="buttonPage-demo-control">
        <mz-collapse @change="handleChange" accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html">
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span>&gt;</span>默认按钮<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span>&gt;</span>主要按钮<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"success"</span>&gt;</span>成功按钮<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"info"</span>&gt;</span>信息按钮<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"warning"</span>&gt;</span>警告按钮<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"danger"</span>&gt;</span>危险按钮<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"margin: 20px 0"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">plain</span>&gt;</span>朴素按钮<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> <span class="hljs-attr">plain</span>&gt;</span>主要按钮<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"success"</span> <span class="hljs-attr">plain</span>&gt;</span>成功按钮<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"info"</span> <span class="hljs-attr">plain</span>&gt;</span>信息按钮<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"warning"</span> <span class="hljs-attr">plain</span>&gt;</span>警告按钮<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"danger"</span> <span class="hljs-attr">plain</span>&gt;</span>危险按钮<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

              <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">round</span>&gt;</span>圆形按钮<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> <span class="hljs-attr">round</span>&gt;</span>主要按钮<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"success"</span> <span class="hljs-attr">round</span>&gt;</span>成功按钮<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"info"</span> <span class="hljs-attr">round</span>&gt;</span>信息按钮<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"warning"</span> <span class="hljs-attr">round</span>&gt;</span>警告按钮<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"danger"</span> <span class="hljs-attr">round</span>&gt;</span>危险按钮<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
              </code>
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
  data(){
    return {

    }
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
}
</script>

<style lang="less">
.buttonPage {
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
  .mz-icon-arrow-right {
    display: none;
  }
}
</style>
