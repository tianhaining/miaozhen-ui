<template lang="html">
  <section class="formPage">
    <h2>Form表单</h2>
    <p>由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据</p>
    <h3>典型表单</h3>
    <p>包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。</p>
    <div class="formPage-demo">
      <div class="formPage-demo-example">
        <mz-form ref="form" :model="form" label-width="80px">
          <mz-form-item label="活动名称">
            <mz-input v-model="form.name"></mz-input>
          </mz-form-item>
          <mz-form-item label="活动区域">
            <mz-select v-model="form.region" placeholder="请选择活动区域">
              <mz-option label="区域一" value="shanghai"></mz-option>
              <mz-option label="区域二" value="beijing"></mz-option>
            </mz-select>
          </mz-form-item>
          <mz-form-item label="活动时间">
            <mz-col :span="11">
              <mz-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></mz-date-picker>
            </mz-col>
            <mz-col class="line" :span="2">-</mz-col>
            <mz-col :span="11">
              <mz-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></mz-time-picker>
            </mz-col>
          </mz-form-item>
          <mz-form-item label="即时配送">
            <mz-switch v-model="form.delivery"></mz-switch>
          </mz-form-item>
          <mz-form-item label="活动性质">
            <mz-checkbox-group v-model="form.type">
              <mz-checkbox label="美食/餐厅线上活动" name="type"></mz-checkbox>
              <mz-checkbox label="地推活动" name="type"></mz-checkbox>
              <mz-checkbox label="线下主题活动" name="type"></mz-checkbox>
              <mz-checkbox label="单纯品牌曝光" name="type"></mz-checkbox>
            </mz-checkbox-group>
          </mz-form-item>
          <mz-form-item label="特殊资源">
            <mz-radio-group v-model="form.resource">
              <mz-radio label="线上品牌商赞助"></mz-radio>
              <mz-radio label="线下场地免费"></mz-radio>
            </mz-radio-group>
          </mz-form-item>
          <mz-form-item label="活动形式">
            <mz-input type="textarea" v-model="form.desc"></mz-input>
          </mz-form-item>
          <mz-form-item>
            <mz-button type="primary" @click="onSubmit">立即创建</mz-button>
            <mz-button>取消</mz-button>
          </mz-form-item>
        </mz-form>
      </div>
      <div class="formPage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">mz-form</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"form"</span> <span class="hljs-attr">:model</span>=<span class="hljs-string">"form"</span> <span class="hljs-attr">label-width</span>=<span class="hljs-string">"80px"</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"活动名称"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"form.name"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-input</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">mz-form-item</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"活动区域"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-select</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"form.region"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请选择活动区域"</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">mz-option</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"区域一"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"shanghai"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-option</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">mz-option</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"区域二"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"beijing"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-option</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">mz-select</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">mz-form-item</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"活动时间"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-col</span> <span class="hljs-attr">:span</span>=<span class="hljs-string">"11"</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">mz-date-picker</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"date"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"选择日期"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"form.date1"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100%;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-date-picker</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">mz-col</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-col</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line"</span> <span class="hljs-attr">:span</span>=<span class="hljs-string">"2"</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">mz-col</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-col</span> <span class="hljs-attr">:span</span>=<span class="hljs-string">"11"</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">mz-time-picker</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"fixed-time"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"选择时间"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"form.date2"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100%;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-time-picker</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">mz-col</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">mz-form-item</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"即时配送"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-switch</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"form.delivery"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-switch</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">mz-form-item</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"活动性质"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-checkbox-group</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"form.type"</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">mz-checkbox</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"美食/餐厅线上活动"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"type"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-checkbox</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">mz-checkbox</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"地推活动"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"type"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-checkbox</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">mz-checkbox</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"线下主题活动"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"type"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-checkbox</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">mz-checkbox</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"单纯品牌曝光"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"type"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-checkbox</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">mz-checkbox-group</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">mz-form-item</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"特殊资源"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-radio-group</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"form.resource"</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">mz-radio</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"线上品牌商赞助"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-radio</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">mz-radio</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"线下场地免费"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-radio</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">mz-radio-group</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">mz-form-item</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"活动形式"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"textarea"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"form.desc"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-input</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">mz-form-item</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-form-item</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> <span class="hljs-attr">@click</span>=<span class="hljs-string">"onSubmit"</span>&gt;</span>立即创建<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span>&gt;</span>取消<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">mz-form-item</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">mz-form</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
                    data() {
                      <span class="hljs-keyword">return</span> {
                        <span class="hljs-attr">form</span>: {
                          <span class="hljs-attr">name</span>: <span class="hljs-string">''</span>,
                          <span class="hljs-attr">region</span>: <span class="hljs-string">''</span>,
                          <span class="hljs-attr">date1</span>: <span class="hljs-string">''</span>,
                          <span class="hljs-attr">date2</span>: <span class="hljs-string">''</span>,
                          <span class="hljs-attr">delivery</span>: <span class="hljs-literal">false</span>,
                          <span class="hljs-attr">type</span>: [],
                          <span class="hljs-attr">resource</span>: <span class="hljs-string">''</span>,
                          <span class="hljs-attr">desc</span>: <span class="hljs-string">''</span>
                        }
                      }
                    },
                    <span class="hljs-attr">methods</span>: {
                      onSubmit() {
                        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'submit!'</span>);
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
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style lang="less">
.formPage {
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
