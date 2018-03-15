<template lang="html">
  <section class="switchPage">
    <h2>Switch开关</h2>
    <p>表示两种相互对应的状态间的切换，多用于触发[开/关]</p>
    <h3>基础用法</h3>
    <p></p>
    <div class="switchPage-demo">
      <div class="switchPage-demo-example">
        <mz-switch
          v-model="value2"
          active-color="#eb3433"
          inactive-color="#dddddd">
        </mz-switch>
      </div>
      <div class="switchPage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">mz-switch</span>
                  <span class="hljs-attr">v-model</span>=<span class="hljs-string">"value2"</span>
                  <span class="hljs-attr">active-color</span>=<span class="hljs-string">"#eb3433"</span>
                  <span class="hljs-attr">inactive-color</span>=<span class="hljs-string">"#dddddd"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">mz-switch</span>&gt;</span>

                <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
                    data() {
                      <span class="hljs-keyword">return</span> {
                        <span class="hljs-attr">value1</span>: <span class="hljs-literal">true</span>,
                        <span class="hljs-attr">value2</span>: <span class="hljs-literal">true</span>
                      }
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
      value1: true,
      value2: true
    }
  }
}
</script>

<style lang="less">
.switchPage {
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
