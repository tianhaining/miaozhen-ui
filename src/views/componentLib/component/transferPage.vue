<template lang="html">
  <section class="transferPage">
    <h2>Transfer穿梭框</h2>
    <p></p>
    <h3>基础用法</h3>
    <p></p>
    <div class="transferPage-demo">
      <div class="transferPage-demo-example">
        <mz-transfer v-model="value1" :data="data"></mz-transfer>
      </div>
      <div class="transferPage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-transfer</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"value1"</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">"data"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-transfer</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

                <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
                    data() {
                      <span class="hljs-keyword">const</span> generateData = <span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> {
                        <span class="hljs-keyword">const</span> data = [];
                        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt;= <span class="hljs-number">15</span>; i++) {
                          data.push({
                            <span class="hljs-attr">key</span>: i,
                            <span class="hljs-attr">label</span>: <span class="hljs-string">`备选项 <span class="hljs-subst">${ i }</span>`</span>,
                            <span class="hljs-attr">disabled</span>: i % <span class="hljs-number">4</span> === <span class="hljs-number">0</span>
                          });
                        }
                        <span class="hljs-keyword">return</span> data;
                      };
                      <span class="hljs-keyword">return</span> {
                        <span class="hljs-attr">data</span>: generateData(),
                        <span class="hljs-attr">value1</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">4</span>]
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
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${ i }`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      data: generateData(),
      value1: [1, 4]
    };
  }
}
</script>

<style lang="less">
.transferPage {
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
