<template lang="html">
  <section class="checkboxPage">
    <h2>Checkbox多选框</h2>
    <p>一个备选框中进行多选</p>
    <h3>基础用法</h3>
    <p>单独使用可以表示两种状态之间的切换，写在标签中的内容为checkbox按钮后的介绍</p>
    <div class="checkboxPage-demo">
      <div class="checkboxPage-demo-example">
        <mz-checkbox v-model="checked">备选项</mz-checkbox>
      </div>
      <div class="checkboxPage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
                  <span class="hljs-comment">&lt;!-- `checked` 为 true 或 false --&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-checkbox</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"checked"</span>&gt;</span>备选项<span class="hljs-tag">&lt;/<span class="hljs-name">mz-checkbox</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
                    data() {
                      <span class="hljs-keyword">return</span> {
                        <span class="hljs-attr">checked</span>: <span class="hljs-literal">true</span>
                      };
                    }
                  };
                </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
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
      checked: true
    }
  }
}
</script>

<style lang="less">
.checkboxPage {
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
