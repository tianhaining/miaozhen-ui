<template lang="html">
  <section class="dateTimerPickerPage">
    <h2>DateTimerPicker日期时间选择器</h2>
    <p>在同一个选择器里选择日期和时间</p>
    <h3>日期和时间点</h3>
    <p></p>
    <div class="dateTimerPickerPage-demo">
      <div class="dateTimerPickerPage-demo-example">
        <div class="block">
          <span class="demonstration">默认</span>
          <mz-date-picker
            v-model="value1"
            type="datetime"
            placeholder="选择日期时间">
          </mz-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">带快捷选项</span>
          <mz-date-picker
            v-model="value2"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions1">
          </mz-date-picker>
        </div>
      </div>
      <div class="dateTimerPickerPage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block"</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"demonstration"</span>&gt;</span>默认<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">mz-date-picker</span>
                        <span class="hljs-attr">v-model</span>=<span class="hljs-string">"value1"</span>
                        <span class="hljs-attr">type</span>=<span class="hljs-string">"datetime"</span>
                        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"选择日期时间"</span>&gt;</span>
                      <span class="hljs-tag">&lt;/<span class="hljs-name">mz-date-picker</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block"</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"demonstration"</span>&gt;</span>带快捷选项<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">mz-date-picker</span>
                        <span class="hljs-attr">v-model</span>=<span class="hljs-string">"value2"</span>
                        <span class="hljs-attr">type</span>=<span class="hljs-string">"datetime"</span>
                        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"选择日期时间"</span>
                        <span class="hljs-attr">align</span>=<span class="hljs-string">"right"</span>
                        <span class="hljs-attr">:picker-options</span>=<span class="hljs-string">"pickerOptions1"</span>&gt;</span>
                      <span class="hljs-tag">&lt;/<span class="hljs-name">mz-date-picker</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

                  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
                      data() {
                        <span class="hljs-keyword">return</span> {
                          <span class="hljs-attr">pickerOptions1</span>: {
                            <span class="hljs-attr">shortcuts</span>: [{
                              <span class="hljs-attr">text</span>: <span class="hljs-string">'今天'</span>,
                              onClick(picker) {
                                picker.$emit(<span class="hljs-string">'pick'</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>());
                              }
                            }, {
                              <span class="hljs-attr">text</span>: <span class="hljs-string">'昨天'</span>,
                              onClick(picker) {
                                <span class="hljs-keyword">const</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
                                date.setTime(date.getTime() - <span class="hljs-number">3600</span> * <span class="hljs-number">1000</span> * <span class="hljs-number">24</span>);
                                picker.$emit(<span class="hljs-string">'pick'</span>, date);
                              }
                            }, {
                              <span class="hljs-attr">text</span>: <span class="hljs-string">'一周前'</span>,
                              onClick(picker) {
                                <span class="hljs-keyword">const</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
                                date.setTime(date.getTime() - <span class="hljs-number">3600</span> * <span class="hljs-number">1000</span> * <span class="hljs-number">24</span> * <span class="hljs-number">7</span>);
                                picker.$emit(<span class="hljs-string">'pick'</span>, date);
                              }
                            }]
                          },
                          <span class="hljs-attr">value1</span>: <span class="hljs-string">''</span>,
                          <span class="hljs-attr">value2</span>: <span class="hljs-string">''</span>
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
    return {
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value1: '',
      value2: ''
    };
  }
}
</script>

<style lang="less">
.dateTimerPickerPage {
  color: #5e6d82;
  &-demo {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    &-example {
      padding: 2rem;
      display: flex;
      .block {
        flex: 1;
        text-align: center;
      }
      .demonstration {
        display: block;
        margin-bottom: 1rem;
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
