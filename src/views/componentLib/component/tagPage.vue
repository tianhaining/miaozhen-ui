<template lang="html">
  <section class="tagPage">
    <h2>Tag标签</h2>
    <p>用于标记和选择</p>
    <h3>基础用法</h3>
    <p></p>
    <div class="tagPage-demo">
      <div class="tagPage-demo-example">
        <mz-tag>标签一</mz-tag>
        <mz-tag type="success">标签二</mz-tag>
        <mz-tag type="info">标签三</mz-tag>
        <mz-tag type="warning">标签四</mz-tag>
        <mz-tag type="danger">标签五</mz-tag>
      </div>
      <div class="tagPage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">mz-tag</span>&gt;</span>标签一<span class="hljs-tag">&lt;/<span class="hljs-name">mz-tag</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-tag</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"success"</span>&gt;</span>标签二<span class="hljs-tag">&lt;/<span class="hljs-name">mz-tag</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-tag</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"info"</span>&gt;</span>标签三<span class="hljs-tag">&lt;/<span class="hljs-name">mz-tag</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-tag</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"warning"</span>&gt;</span>标签四<span class="hljs-tag">&lt;/<span class="hljs-name">mz-tag</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-tag</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"danger"</span>&gt;</span>标签五<span class="hljs-tag">&lt;/<span class="hljs-name">mz-tag</span>&gt;</span>
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
  data() {
    return {

    };
  }
}
</script>

<style lang="less">
.tagPage {
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
