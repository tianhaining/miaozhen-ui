<template lang="html">
  <section class="timePickerPage">
    <h2>TimePicker时间选择器</h2>
    <p>用于选择或输入日期</p>
    <h3>固定时间点</h3>
    <p>提供几个固定的时间点供用户选择</p>
    <div class="timePickerPage-demo">
      <div class="timePickerPage-demo-example">
        <mz-time-select
          v-model="value1"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }"
          placeholder="选择时间">
        </mz-time-select>
      </div>
      <div class="timePickerPage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">mz-time-select</span>
                  <span class="hljs-attr">v-model</span>=<span class="hljs-string">"value1"</span>
                  <span class="hljs-attr">:picker-options</span>=<span class="hljs-string">"{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }"</span>
                  <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"选择时间"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">mz-time-select</span>&gt;</span>

                <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
                    data() {
                      <span class="hljs-keyword">return</span> {
                        <span class="hljs-attr">value1</span>: <span class="hljs-string">''</span>
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
      value1: ''
    }
  }
}
</script>

<style lang="less">
.timePickerPage {
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
