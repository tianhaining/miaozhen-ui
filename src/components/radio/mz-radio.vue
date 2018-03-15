<template>
  <label
    class="mz-radio"
    :class="[
      border && radioSize ? 'mz-radio--' + radioSize : '',
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-bordered': border },
      { 'is-checked': model === label }
    ]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = label"
  >
    <span class="mz-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <span class="mz-radio__inner"></span>
      <input
        class="mz-radio__original"
        :value="label"
        type="radio"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
      >
    </span>
    <span class="mz-radio__label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
  import Emitter from '@/mixins/emitter';

  export default {
    name: 'MzRadio',

    mixins: [Emitter],

    inject: {
      elFormItem: {
        default: ''
      }
    },

    componentName: 'MzRadio',

    props: {
      value: {},
      label: {},
      disabled: Boolean,
      name: String,
      border: Boolean,
      size: String
    },

    data() {
      return {
        focus: false
      };
    },
    computed: {
      isGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== 'MzRadioGroup') {
            parent = parent.$parent;
          } else {
            this._radioGroup = parent;
            return true;
          }
        }
        return false;
      },
      model: {
        get() {
          return this.isGroup ? this._radioGroup.value : this.value;
        },
        set(val) {
          if (this.isGroup) {
            this.dispatch('MzRadioGroup', 'input', [val]);
          } else {
            this.$emit('input', val);
          }
        }
      },
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      radioSize() {
        const temRadioSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
        return this.isGroup
          ? this._radioGroup.radioGroupSize || temRadioSize
          : temRadioSize;
      },
      isDisabled() {
        return this.isGroup
          ? this._radioGroup.disabled || this.disabled
          : this.disabled;
      },
      tabIndex() {
        return !this.isDisabled ? (this.isGroup ? (this.model === this.label ? 0 : -1) : 0) : -1;
      }
    },

    methods: {
      handleChange() {
        this.$nextTick(() => {
          this.$emit('change', this.model);
          this.isGroup && this.dispatch('MzRadioGroup', 'handleChange', this.model);
        });
      }
    }
  };
</script>
<style lang="less">
@charset "UTF-8";
.mz-radio {
  color: #606266;
  font-weight: 500;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: 14px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none; }
  .mz-radio.is-bordered {
    padding: 12px 20px 0 10px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    height: 40px; }
    .mz-radio.is-bordered.is-checked {
      border-color: #eb3332; }
    .mz-radio.is-bordered.is-disabled {
      cursor: not-allowed;
      border-color: #ebeef5; }
    .mz-radio.is-bordered + .mz-radio.is-bordered {
      margin-left: 10px; }
  .mz-radio--medium.is-bordered {
    padding: 10px 20px 0 10px;
    border-radius: 4px;
    height: 36px; }
    .mz-radio--medium.is-bordered .mz-radio__label {
      font-size: 14px; }
    .mz-radio--medium.is-bordered .mz-radio__inner {
      height: 14px;
      width: 14px; }
  .mz-radio--small.is-bordered {
    padding: 8px 15px 0 10px;
    border-radius: 3px;
    height: 32px; }
    .mz-radio--small.is-bordered .mz-radio__label {
      font-size: 12px; }
    .mz-radio--small.is-bordered .mz-radio__inner {
      height: 12px;
      width: 12px; }
  .mz-radio--mini.is-bordered {
    padding: 6px 15px 0 10px;
    border-radius: 3px;
    height: 28px; }
    .mz-radio--mini.is-bordered .mz-radio__label {
      font-size: 12px; }
    .mz-radio--mini.is-bordered .mz-radio__inner {
      height: 12px;
      width: 12px; }
  .mz-radio + .mz-radio {
    margin-left: 30px; }
  .mz-radio__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle; }
    .mz-radio__input.is-disabled .mz-radio__inner {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      cursor: not-allowed; }
      .mz-radio__input.is-disabled .mz-radio__inner::after {
        cursor: not-allowed;
        background-color: #f5f7fa; }
      .mz-radio__input.is-disabled .mz-radio__inner + .mz-radio__label {
        cursor: not-allowed; }
    .mz-radio__input.is-disabled.is-checked .mz-radio__inner {
      background-color: #f5f7fa;
      border-color: #e4e7ed; }
      .mz-radio__input.is-disabled.is-checked .mz-radio__inner::after {
        background-color: #c0c4cc; }
    .mz-radio__input.is-disabled + span.mz-radio__label {
      color: #c0c4cc;
      cursor: not-allowed; }
    .mz-radio__input.is-checked .mz-radio__inner {
      border-color: #eb3332;
      background: transparent; }
      .mz-radio__input.is-checked .mz-radio__inner::after {
        transform: translate(-50%, -50%) scale(1); }
    .mz-radio__input.is-checked + .mz-radio__label {
      color: #eb3332; }
    .mz-radio__input.is-focus .mz-radio__inner {
      border-color: #eb3332; }
  .mz-radio__inner {
    border: 1px solid #dcdfe6;
    border-radius: 100%;
    width: 14px;
    height: 14px;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box; }
    .mz-radio__inner:hover {
      border-color: #eb3332; }
    .mz-radio__inner::after {
      width: 6px;
      height: 6px;
      border-radius: 100%;
      background-color: #eb3332;
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6); }
  .mz-radio__original {
    opacity: 0;
    outline: none;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0; }
  .mz-radio:focus:not(.is-focus):not(:active) {
    /*获得焦点时 样式提醒*/ }
    .mz-radio:focus:not(.is-focus):not(:active) .mz-radio__inner {
      box-shadow: 0 0 2px 2px #eb3332; }
  .mz-radio__label {
    font-size: 14px;
    padding-left: 10px; }
</style>
