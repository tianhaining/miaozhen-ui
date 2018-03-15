<template lang="html">
  <section class="iconPage">
    <h2>Icon图标</h2>
    <p>提供了一套常用的图标集合</p>
    <h3>使用方法</h3>
    <p>直接通过设置类名为 mz-icon-iconName来使用即可。例如：</p>
    <div class="iconPage-demo">
      <div class="iconPage-demo-example">
        <i class="mz-icon-edit"></i>
        <i class="mz-icon-share"></i>
        <i class="mz-icon-delete"></i>
        <mz-button type="primary" icon="mz-icon-search">搜索</mz-button>
      </div>
      <div class="iconPage-demo-control">
        <mz-collapse @change="handleChange" accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html">
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mz-icon-edit"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mz-icon-share"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mz-icon-delete"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"mz-icon-search"</span>&gt;</span>搜索<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
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
.iconPage {
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
