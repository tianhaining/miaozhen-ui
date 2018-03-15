<template lang="html">
  <section class="inputPage">
    <h2>Input输入框</h2>
    <p></p>
    <h3>基础用法</h3>
    <p></p>
    <div class="inputPage-demo">
      <div class="inputPage-demo-example">
        <mz-row>
          <mz-col :span="4"><mz-input v-model="input" placeholder="请输入内容"></mz-input></mz-col>
        </mz-row>
      </div>
      <div class="inputPage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">mz-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"input"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入内容"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-input</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
                  data() {
                    <span class="hljs-keyword">return</span> {
                      <span class="hljs-attr">input</span>: <span class="hljs-string">''</span>
                    }
                  }
                }
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
      input: ''
    }
  }
}
</script>

<style lang="less">
.inputPage {
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
