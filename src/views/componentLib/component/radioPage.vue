<template lang="html">
  <section class="radioPage">
    <h2>Radio单选框</h2>
    <p>在一组备选框中进行单选</p>
    <h3>基础用法</h3>
    <p>由于选项默认可见，不宜过多，若选项过多，建议使用Select选择器</p>
    <div class="radioPage-demo">
      <div class="radioPage-demo-example">
        <mz-radio v-model="radio" label="1">备选项</mz-radio>
        <mz-radio v-model="radio" label="2">备选项</mz-radio>
      </div>
      <div class="radioPage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-radio</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"1"</span>&gt;</span>备选项<span class="hljs-tag">&lt;/<span class="hljs-name">mz-radio</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-radio</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"2"</span>&gt;</span>备选项<span class="hljs-tag">&lt;/<span class="hljs-name">mz-radio</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

                <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
                    data () {
                      <span class="hljs-keyword">return</span> {
                        <span class="hljs-attr">radio</span>: <span class="hljs-string">'1'</span>
                      };
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
      radio: '1'
    }
  }
}
</script>

<style lang="less">
.radioPage {
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
