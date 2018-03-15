<template>
  <label
    class="mz-radio-button"
    :class="[
      size ? 'mz-radio-button--' + size : '',
      { 'is-active': value === label },
      { 'is-disabled': isDisabled },
      { 'is-focus': focus }
    ]"
    role="radio"
    :aria-checked="value === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="value = label"
  >
    <input
      class="mz-radio-button__orig-radio"
      :value="label"
      type="radio"
      v-model="value"
      :name="name"
      @change="handleChange"
      :disabled="isDisabled"
      tabindex="-1"
      @focus="focus = true"
      @blur="focus = false"
    >
    <span class="mz-radio-button__inner" :style="value === label ? activeStyle : null">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
  import Emitter from '@/mixins/emitter';

  export default {
    name: 'MzRadioButton',

    mixins: [Emitter],

    inject: {
      elFormItem: {
        default: ''
      }
    },

    props: {
      label: {},
      disabled: Boolean,
      name: String
    },
    data() {
      return {
        focus: false
      };
    },
    computed: {
      value: {
        get() {
          return this._radioGroup.value;
        },
        set(value) {
          this._radioGroup.$emit('input', value);
        }
      },
      _radioGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== 'MzRadioGroup') {
            parent = parent.$parent;
          } else {
            return parent;
          }
        }
        return false;
      },
      activeStyle() {
        return {
          backgroundColor: this._radioGroup.fill || '',
          borderColor: this._radioGroup.fill || '',
          boxShadow: this._radioGroup.fill ? `-1px 0 0 0 ${this._radioGroup.fill}` : '',
          color: this._radioGroup.textColor || ''
        };
      },
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      size() {
        return this._radioGroup.radioGroupSize || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      isDisabled() {
        return this.disabled || this._radioGroup.disabled;
      },
      tabIndex() {
        return !this.isDisabled ? (this._radioGroup ? (this.value === this.label ? 0 : -1) : 0) : -1;
      }
    },

    methods: {
      handleChange() {
        this.$nextTick(() => {
          this.dispatch('MzRadioGroup', 'handleChange', this.value);
        });
      }
    }
  };
</script>
<style lang="less">
@charset "UTF-8";
.mz-radio-button {
  position: relative;
  display: inline-block;
  outline: none; }
  .mz-radio-button__inner {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
    background: #fff;
    border: 1px solid #dcdfe6;
    font-weight: 500;
    border-left: 0;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    position: relative;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 0; }
    .mz-radio-button__inner.is-round {
      padding: 12px 20px; }
    .mz-radio-button__inner:hover {
      color: #eb3332; }
    .mz-radio-button__inner [class*="el-icon-"] {
      line-height: 0.9; }
      .mz-radio-button__inner [class*="el-icon-"] + span {
        margin-left: 5px; }
  .mz-radio-button__orig-radio {
    opacity: 0;
    outline: none;
    position: absolute;
    z-index: -1;
    left: -999px; }
    .mz-radio-button__orig-radio:checked + .mz-radio-button__inner {
      color: #fff;
      background-color: #eb3332;
      border-color: #eb3332;
      box-shadow: -1px 0 0 0 #eb3332; }
    .mz-radio-button__orig-radio:disabled + .mz-radio-button__inner {
      color: #c0c4cc;
      cursor: not-allowed;
      background-image: none;
      background-color: #fff;
      border-color: #ebeef5;
      box-shadow: none; }
    .mz-radio-button__orig-radio:disabled:checked + .mz-radio-button__inner {
      background-color: #f2f6fc; }
  .mz-radio-button:first-child .mz-radio-button__inner {
    border-left: 1px solid #dcdfe6;
    border-radius: 4px 0 0 4px;
    box-shadow: none !important; }
  .mz-radio-button:last-child .mz-radio-button__inner {
    border-radius: 0 4px 4px 0; }
  .mz-radio-button:first-child:last-child .mz-radio-button__inner {
    border-radius: 4px; }
  .mz-radio-button--medium .mz-radio-button__inner {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 0; }
    .mz-radio-button--medium .mz-radio-button__inner.is-round {
      padding: 10px 20px; }
  .mz-radio-button--small .mz-radio-button__inner {
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 0; }
    .mz-radio-button--small .mz-radio-button__inner.is-round {
      padding: 9px 15px; }
  .mz-radio-button--mini .mz-radio-button__inner {
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 0; }
    .mz-radio-button--mini .mz-radio-button__inner.is-round {
      padding: 7px 15px; }
  .mz-radio-button:focus:not(.is-focus):not(:active) {
    /*获得焦点时 样式提醒*/
    box-shadow: 0 0 2px 2px #eb3332; }
</style>
