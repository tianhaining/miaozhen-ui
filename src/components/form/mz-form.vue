<template>
  <form class="mz-form" :class="[
    labelPosition ? 'mz-form--label-' + labelPosition : '',
    { 'mz-form--inline': inline }
  ]">
    <slot></slot>
  </form>
</template>
<script>
  export default {
    name: 'MzForm',

    componentName: 'MzForm',

    provide() {
      return {
        elForm: this
      };
    },

    props: {
      model: Object,
      rules: Object,
      labelPosition: String,
      labelWidth: String,
      labelSuffix: {
        type: String,
        default: ''
      },
      inline: Boolean,
      inlineMessage: Boolean,
      statusIcon: Boolean,
      showMessage: {
        type: Boolean,
        default: true
      },
      size: String,
      disabled: Boolean,
      validateOnRuleChange: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      rules() {
        if (this.validateOnRuleChange) {
          this.validate(() => {});
        }
      }
    },
    data() {
      return {
        fields: []
      };
    },
    created() {
      this.$on('mz.form.addField', (field) => {
        if (field) {
          this.fields.push(field);
        }
      });
      /* istanbul ignore next */
      this.$on('mz.form.removeField', (field) => {
        if (field.prop) {
          this.fields.splice(this.fields.indexOf(field), 1);
        }
      });
    },
    methods: {
      resetFields() {
        if (!this.model) {
          process.env.NODE_ENV !== 'production' &&
          console.warn('[Element Warn][Form]model is required for resetFields to work.');
          return;
        }
        this.fields.forEach(field => {
          field.resetField();
        });
      },
      clearValidate() {
        this.fields.forEach(field => {
          field.clearValidate();
        });
      },
      validate(callback) {
        if (!this.model) {
          console.warn('[Element Warn][Form]model is required for validate to work!');
          return;
        }

        let promise;
        // if no callback, return promise
        if (typeof callback !== 'function' && window.Promise) {
          promise = new window.Promise((resolve, reject) => {
            callback = function(valid) {
              valid ? resolve(valid) : reject(valid);
            };
          });
        }

        let valid = true;
        let count = 0;
        // 如果需要验证的fields为空，调用验证时立刻返回callback
        if (this.fields.length === 0 && callback) {
          callback(true);
        }
        this.fields.forEach((field, index) => {
          field.validate('', errors => {
            if (errors) {
              valid = false;
            }
            if (typeof callback === 'function' && ++count === this.fields.length) {
              callback(valid);
            }
          });
        });

        if (promise) {
          return promise;
        }
      },
      validateField(prop, cb) {
        let field = this.fields.filter(field => field.prop === prop)[0];
        if (!field) { throw new Error('must call validateField with valid prop string!'); }

        field.validate('', cb);
      }
    }
  };
</script>
<style lang="less">
.mz-form--label-left .mz-form-item__label {
  text-align: left; }
.mz-form--label-top .mz-form-item__label {
  float: none;
  display: inline-block;
  text-align: left;
  padding: 0 0 10px 0; }
.mz-form--inline .mz-form-item {
  display: inline-block;
  margin-right: 10px;
  vertical-align: top; }
.mz-form--inline .mz-form-item__label {
  float: none;
  display: inline-block; }
.mz-form--inline .mz-form-item__content {
  display: inline-block;
  vertical-align: top; }
.mz-form--inline.mz-form--label-top .mz-form-item__content {
  display: block; }

.mz-form-item {
  margin-bottom: 22px; }
  .mz-form-item::before,
  .mz-form-item::after {
    display: table;
    content: ""; }

  .mz-form-item::after {
    clear: both; }
  .mz-form-item .mz-form-item {
    margin-bottom: 0; }
  .mz-form-item .mz-input__validateIcon {
    display: none; }
  .mz-form-item--medium .mz-form-item__label {
    line-height: 36px; }
  .mz-form-item--medium .mz-form-item__content {
    line-height: 36px; }
  .mz-form-item--small .mz-form-item__label {
    line-height: 32px; }
  .mz-form-item--small .mz-form-item__content {
    line-height: 32px; }
  .mz-form-item--small.mz-form-item {
    margin-bottom: 18px; }
  .mz-form-item--small .mz-form-item__error {
    padding-top: 2px; }
  .mz-form-item--mini .mz-form-item__label {
    line-height: 28px; }
  .mz-form-item--mini .mz-form-item__content {
    line-height: 28px; }
  .mz-form-item--mini.mz-form-item {
    margin-bottom: 18px; }
  .mz-form-item--mini .mz-form-item__error {
    padding-top: 1px; }
  .mz-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box; }
  .mz-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px; }
    .mz-form-item__content::before,
    .mz-form-item__content::after {
      display: table;
      content: ""; }

    .mz-form-item__content::after {
      clear: both; }
  .mz-form-item__error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0; }
    .mz-form-item__error--inline {
      position: relative;
      top: auto;
      left: auto;
      display: inline-block;
      margin-left: 10px; }
  .mz-form-item.is-required .mz-form-item__label:before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px; }
  .mz-form-item.is-error .mz-input__inner, .mz-form-item.is-error .mz-input__inner:focus, .mz-form-item.is-error .mz-textarea__inner, .mz-form-item.is-error .mz-textarea__inner:focus {
    border-color: #f56c6c; }
  .mz-form-item.is-error .mz-input-group__append .mz-input__inner, .mz-form-item.is-error .mz-input-group__prepend .mz-input__inner {
    border-color: transparent; }
  .mz-form-item.is-error .mz-input__validateIcon {
    color: #f56c6c; }
  .mz-form-item.is-success .mz-input__inner, .mz-form-item.is-success .mz-input__inner:focus, .mz-form-item.is-success .mz-textarea__inner, .mz-form-item.is-success .mz-textarea__inner:focus {
    border-color: #67c23a; }
  .mz-form-item.is-success .mz-input-group__append .mz-input__inner, .mz-form-item.is-success .mz-input-group__prepend .mz-input__inner {
    border-color: transparent; }
  .mz-form-item.is-success .mz-input__validateIcon {
    color: #67c23a; }
  .mz-form-item--feedback .mz-input__validateIcon {
    display: inline-block; }
</style>
