<template lang="html">
  <section class="progressPage">
    <h2>Progress进度条</h2>
    <p>用于展示操作进度，告知用户当前状态和预期</p>
    <h3>线性进度条-百分比外显</h3>
    <p></p>
    <div class="progressPage-demo">
      <div class="progressPage-demo-example">
        <mz-progress :percentage="0"></mz-progress>
        <mz-progress :percentage="70"></mz-progress>
        <mz-progress :percentage="100" status="success"></mz-progress>
        <mz-progress :percentage="50" status="exception"></mz-progress>
      </div>
      <div class="progressPage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">mz-progress</span> <span class="hljs-attr">:percentage</span>=<span class="hljs-string">"0"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-progress</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-progress</span> <span class="hljs-attr">:percentage</span>=<span class="hljs-string">"70"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-progress</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-progress</span> <span class="hljs-attr">:percentage</span>=<span class="hljs-string">"100"</span> <span class="hljs-attr">status</span>=<span class="hljs-string">"success"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-progress</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-progress</span> <span class="hljs-attr">:percentage</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">status</span>=<span class="hljs-string">"exception"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-progress</span>&gt;</span>
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
.progressPage {
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
