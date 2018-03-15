<template lang="html">
  <section class="selectPage">
    <h2>Select选择器</h2>
    <p>当选项过多时，使用下拉菜单展示并选择内容</p>
    <h3>基础用法</h3>
    <p>适用广泛的基础单选</p>
    <div class="selectPage-demo">
      <div class="selectPage-demo-example">
        <mz-select v-model="value" placeholder="请选择">
          <mz-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </mz-option>
        </mz-select>
      </div>
      <div class="selectPage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-select</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"value"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请选择"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-option</span>
                      <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in options"</span>
                      <span class="hljs-attr">:key</span>=<span class="hljs-string">"item.value"</span>
                      <span class="hljs-attr">:label</span>=<span class="hljs-string">"item.label"</span>
                      <span class="hljs-attr">:value</span>=<span class="hljs-string">"item.value"</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">mz-option</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">mz-select</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

                <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
                    data() {
                      <span class="hljs-keyword">return</span> {
                        <span class="hljs-attr">options</span>: [{
                          <span class="hljs-attr">value</span>: <span class="hljs-string">'选项1'</span>,
                          <span class="hljs-attr">label</span>: <span class="hljs-string">'宝马'</span>
                        }, {
                          <span class="hljs-attr">value</span>: <span class="hljs-string">'选项2'</span>,
                          <span class="hljs-attr">label</span>: <span class="hljs-string">'奔驰'</span>
                        }, {
                          <span class="hljs-attr">value</span>: <span class="hljs-string">'选项3'</span>,
                          <span class="hljs-attr">label</span>: <span class="hljs-string">'宾利'</span>
                        }, {
                          <span class="hljs-attr">value</span>: <span class="hljs-string">'选项4'</span>,
                          <span class="hljs-attr">label</span>: <span class="hljs-string">'福特'</span>
                        }, {
                          <span class="hljs-attr">value</span>: <span class="hljs-string">'选项5'</span>,
                          <span class="hljs-attr">label</span>: <span class="hljs-string">'高尔夫'</span>
                        }],
                        <span class="hljs-attr">value</span>: <span class="hljs-string">''</span>
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
      options: [{
         value: '选项1',
         label: '宝马'
       }, {
         value: '选项2',
         label: '奔驰'
       }, {
         value: '选项3',
         label: '宾利'
       }, {
         value: '选项4',
         label: '福特'
       }, {
         value: '选项5',
         label: '高尔夫'
       }],
       value: ''
    }
  }
}
</script>

<style lang="less">
.selectPage {
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
