<template>
  <label
    class="mz-checkbox"
    :class="[
      border && checkboxSize ? 'mz-checkbox--' + checkboxSize : '',
      { 'is-disabled': isDisabled },
      { 'is-bordered': border },
      { 'is-checked': isChecked }
    ]"
    role="checkbox"
    :aria-checked="indeterminate ? 'mixed': isChecked"
    :aria-disabled="isDisabled"
    :id="id"
  >
    <span class="mz-checkbox__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus
      }"
       aria-checked="mixed"
    >
      <span class="mz-checkbox__inner"></span>
      <input
        v-if="trueLabel || falseLabel"
        class="mz-checkbox__original"
        type="checkbox"
        :name="name"
        :disabled="isDisabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false">
      <input
        v-else
        class="mz-checkbox__original"
        type="checkbox"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false">
    </span>
    <span class="mz-checkbox__label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
  import Emitter from '@/mixins/emitter';

  export default {
    name: 'MzCheckbox',

    mixins: [Emitter],

    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },

    componentName: 'MzCheckbox',

    data() {
      return {
        selfModel: false,
        focus: false,
        isLimitExceeded: false
      };
    },

    computed: {
      model: {
        get() {
          return this.isGroup
            ? this.store : this.value !== undefined
              ? this.value : this.selfModel;
        },

        set(val) {
          if (this.isGroup) {
            this.isLimitExceeded = false;
            (this._checkboxGroup.min !== undefined &&
              val.length < this._checkboxGroup.min &&
              (this.isLimitExceeded = true));

            (this._checkboxGroup.max !== undefined &&
              val.length > this._checkboxGroup.max &&
              (this.isLimitExceeded = true));

            this.isLimitExceeded === false &&
            this.dispatch('MzCheckboxGroup', 'input', [val]);
          } else {
            this.$emit('input', val);
            this.selfModel = val;
          }
        }
      },

      isChecked() {
        if ({}.toString.call(this.model) === '[object Boolean]') {
          return this.model;
        } else if (Array.isArray(this.model)) {
          return this.model.indexOf(this.label) > -1;
        } else if (this.model !== null && this.model !== undefined) {
          return this.model === this.trueLabel;
        }
      },

      isGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== 'MzCheckboxGroup') {
            parent = parent.$parent;
          } else {
            this._checkboxGroup = parent;
            return true;
          }
        }
        return false;
      },

      store() {
        return this._checkboxGroup ? this._checkboxGroup.value : this.value;
      },

      isDisabled() {
        return this.isGroup
          ? this._checkboxGroup.disabled || this.disabled || (this.elForm || {}).disabled
          : this.disabled || (this.elForm || {}).disabled;
      },

      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },

      checkboxSize() {
        const temCheckboxSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
        return this.isGroup
          ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize
          : temCheckboxSize;
      }
    },

    props: {
      value: {},
      label: {},
      indeterminate: Boolean,
      disabled: Boolean,
      checked: Boolean,
      name: String,
      trueLabel: [String, Number],
      falseLabel: [String, Number],
      id: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
      controls: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
      border: Boolean,
      size: String
    },

    methods: {
      addToStore() {
        if (
          Array.isArray(this.model) &&
          this.model.indexOf(this.label) === -1
        ) {
          this.model.push(this.label);
        } else {
          this.model = this.trueLabel || true;
        }
      },
      handleChange(ev) {
        if (this.isLimitExceeded) return;
        let value;
        if (ev.target.checked) {
          value = this.trueLabel === undefined ? true : this.trueLabel;
        } else {
          value = this.falseLabel === undefined ? false : this.falseLabel;
        }
        this.$emit('change', value, ev);
        this.$nextTick(() => {
          if (this.isGroup) {
            this.dispatch('MzCheckboxGroup', 'change', [this._checkboxGroup.value]);
          }
        });
      }
    },

    created() {
      this.checked && this.addToStore();
    },
    mounted() { // 为indeterminate元素 添加aria-controls 属性
      if (this.indeterminate) {
        this.$el.setAttribute('aria-controls', this.controls);
      }
    }
  };
</script>
<style lang="less">
@charset "UTF-8";
.mz-checkbox {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  user-select: none; }
  .mz-checkbox.is-bordered {
    padding: 9px 20px 9px 10px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    line-height: normal;
    height: 40px; }
    .mz-checkbox.is-bordered.is-checked {
      border-color: #eb3332; }
    .mz-checkbox.is-bordered.is-disabled {
      border-color: #ebeef5;
      cursor: not-allowed; }
    .mz-checkbox.is-bordered + .mz-checkbox.is-bordered {
      margin-left: 10px; }
    .mz-checkbox.is-bordered.mz-checkbox--medium {
      padding: 7px 20px 7px 10px;
      border-radius: 4px;
      height: 36px; }
      .mz-checkbox.is-bordered.mz-checkbox--medium .mz-checkbox__label {
        line-height: 17px;
        font-size: 14px; }
      .mz-checkbox.is-bordered.mz-checkbox--medium .mz-checkbox__inner {
        height: 14px;
        width: 14px; }
    .mz-checkbox.is-bordered.mz-checkbox--small {
      padding: 5px 15px 5px 10px;
      border-radius: 3px;
      height: 32px; }
      .mz-checkbox.is-bordered.mz-checkbox--small .mz-checkbox__label {
        line-height: 15px;
        font-size: 12px; }
      .mz-checkbox.is-bordered.mz-checkbox--small .mz-checkbox__inner {
        height: 12px;
        width: 12px; }
        .mz-checkbox.is-bordered.mz-checkbox--small .mz-checkbox__inner::after {
          height: 6px;
          width: 2px; }
    .mz-checkbox.is-bordered.mz-checkbox--mini {
      padding: 3px 15px 3px 10px;
      border-radius: 3px;
      height: 28px; }
      .mz-checkbox.is-bordered.mz-checkbox--mini .mz-checkbox__label {
        line-height: 12px;
        font-size: 12px; }
      .mz-checkbox.is-bordered.mz-checkbox--mini .mz-checkbox__inner {
        height: 12px;
        width: 12px; }
        .mz-checkbox.is-bordered.mz-checkbox--mini .mz-checkbox__inner::after {
          height: 6px;
          width: 2px; }
  .mz-checkbox__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle; }
    .mz-checkbox__input.is-disabled .mz-checkbox__inner {
      background-color: #edf2fc;
      border-color: #dcdfe6;
      cursor: not-allowed; }
      .mz-checkbox__input.is-disabled .mz-checkbox__inner::after {
        cursor: not-allowed;
        border-color: #c0c4cc; }
      .mz-checkbox__input.is-disabled .mz-checkbox__inner + .mz-checkbox__label {
        cursor: not-allowed; }
    .mz-checkbox__input.is-disabled.is-checked .mz-checkbox__inner {
      background-color: #f2f6fc;
      border-color: #dcdfe6; }
      .mz-checkbox__input.is-disabled.is-checked .mz-checkbox__inner::after {
        border-color: #c0c4cc; }
    .mz-checkbox__input.is-disabled.is-indeterminate .mz-checkbox__inner {
      background-color: #f2f6fc;
      border-color: #dcdfe6; }
      .mz-checkbox__input.is-disabled.is-indeterminate .mz-checkbox__inner::before {
        background-color: #c0c4cc;
        border-color: #c0c4cc; }
    .mz-checkbox__input.is-disabled + span.mz-checkbox__label {
      color: #c0c4cc;
      cursor: not-allowed; }
    .mz-checkbox__input.is-checked .mz-checkbox__inner {
      background-color: #eb3332;
      border-color: #eb3332; }
      .mz-checkbox__input.is-checked .mz-checkbox__inner::after {
        transform: rotate(45deg) scaleY(1); }
    .mz-checkbox__input.is-checked + .mz-checkbox__label {
      color: #eb3332; }
    .mz-checkbox__input.is-focus {
      /*focus时 视觉上区分*/ }
      .mz-checkbox__input.is-focus .mz-checkbox__inner {
        border-color: #eb3332; }
    .mz-checkbox__input.is-indeterminate .mz-checkbox__inner {
      background-color: #eb3332;
      border-color: #eb3332; }
      .mz-checkbox__input.is-indeterminate .mz-checkbox__inner::before {
        content: '';
        position: absolute;
        display: block;
        background-color: #fff;
        height: 2px;
        transform: scale(0.5);
        left: 0;
        right: 0;
        top: 5px; }
      .mz-checkbox__input.is-indeterminate .mz-checkbox__inner::after {
        display: none; }
  .mz-checkbox__inner {
    display: inline-block;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    z-index: 1;
    transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46), background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46); }
    .mz-checkbox__inner:hover {
      border-color: #eb3332; }
    .mz-checkbox__inner::after {
      box-sizing: content-box;
      content: "";
      border: 1px solid #fff;
      border-left: 0;
      border-top: 0;
      height: 7px;
      left: 4px;
      position: absolute;
      top: 1px;
      transform: rotate(45deg) scaleY(0);
      width: 3px;
      transition: transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6) 0.05s;
      transform-origin: center; }
  .mz-checkbox__original {
    opacity: 0;
    outline: none;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    left: -999px; }
  .mz-checkbox__label {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px; }
  .mz-checkbox + .mz-checkbox {
    margin-left: 30px; }

.mz-checkbox-button {
  position: relative;
  display: inline-block; }
  .mz-checkbox-button__inner {
    display: inline-block;
    line-height: 1;
    font-weight: 500;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-left: 0;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    position: relative;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 0; }
    .mz-checkbox-button__inner.is-round {
      padding: 12px 20px; }
    .mz-checkbox-button__inner:hover {
      color: #eb3332; }
    .mz-checkbox-button__inner [class*="el-icon-"] {
      line-height: 0.9; }
      .mz-checkbox-button__inner [class*="el-icon-"] + span {
        margin-left: 5px; }
  .mz-checkbox-button__original {
    opacity: 0;
    outline: none;
    position: absolute;
    margin: 0;
    left: -999px; }
  .mz-checkbox-button.is-checked .mz-checkbox-button__inner {
    color: #fff;
    background-color: #eb3332;
    border-color: #eb3332;
    box-shadow: -1px 0 0 0 #8cc5ff; }
  .mz-checkbox-button.is-disabled .mz-checkbox-button__inner {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
    box-shadow: none; }
  .mz-checkbox-button:first-child .mz-checkbox-button__inner {
    border-left: 1px solid #dcdfe6;
    border-radius: 4px 0 0 4px;
    box-shadow: none !important; }
  .mz-checkbox-button.is-focus .mz-checkbox-button__inner {
    border-color: #eb3332; }
  .mz-checkbox-button:last-child .mz-checkbox-button__inner {
    border-radius: 0 4px 4px 0; }
  .mz-checkbox-button--medium .mz-checkbox-button__inner {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 0; }
    .mz-checkbox-button--medium .mz-checkbox-button__inner.is-round {
      padding: 10px 20px; }
  .mz-checkbox-button--small .mz-checkbox-button__inner {
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 0; }
    .mz-checkbox-button--small .mz-checkbox-button__inner.is-round {
      padding: 9px 15px; }
  .mz-checkbox-button--mini .mz-checkbox-button__inner {
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 0; }
    .mz-checkbox-button--mini .mz-checkbox-button__inner.is-round {
      padding: 7px 15px; }

.mz-checkbox-group {
  font-size: 0; }
</style>
