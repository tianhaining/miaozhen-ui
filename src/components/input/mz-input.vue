<template>
  <div :class="[
    type === 'textarea' ? 'mz-textarea' : 'mz-input',
    inputSize ? 'mz-input--' + inputSize : '',
    {
      'is-disabled': disabled,
      'mz-input-group': $slots.prepend || $slots.append,
      'mz-input-group--append': $slots.append,
      'mz-input-group--prepend': $slots.prepend,
      'mz-input--prefix': $slots.prefix || prefixIcon,
      'mz-input--suffix': $slots.suffix || suffixIcon
    }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="mz-input-group__prepend" v-if="$slots.prepend"  tabindex="0">
        <slot name="prepend"></slot>
      </div>
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="mz-input__inner"
        v-bind="$props"
        :autocomplete="autoComplete"
        :value="currentValue"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      >
      <!-- 前置内容 -->
      <span class="mz-input__prefix" v-if="$slots.prefix || prefixIcon" :style="prefixOffset">
        <slot name="prefix"></slot>
        <i class="mz-input__icon"
           v-if="prefixIcon"
           :class="prefixIcon">
        </i>
      </span>
      <!-- 后置内容 -->
      <span
        class="mz-input__suffix"
        v-if="$slots.suffix || suffixIcon || showClear || validateState && needStatusIcon"
        :style="suffixOffset">
        <span class="mz-input__suffix-inner">
          <template v-if="!showClear">
            <slot name="suffix"></slot>
            <i class="mz-input__icon"
              v-if="suffixIcon"
              :class="suffixIcon">
            </i>
          </template>
          <i v-else
            class="mz-input__icon mz-icon-circle-close mz-input__clear"
            @click="clear"
          ></i>
        </span>
        <i class="mz-input__icon"
          v-if="validateState"
          :class="['mz-input__validateIcon', validateIcon]">
        </i>
      </span>
      <!-- 后置元素 -->
      <div class="mz-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      :tabindex="tabindex"
      class="mz-textarea__inner"
      :value="currentValue"
      @input="handleInput"
      ref="textarea"
      v-bind="$props"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    >
    </textarea>
  </div>
</template>
<script>
  import emitter from '@/mixins/emitter';
  import Migrating from '@/mixins/migrating';
  import calcTextareaHeight from './calcTextareaHeight';
  import merge from '@/utils/merge';

  export default {
    name: 'MzInput',

    componentName: 'MzInput',

    mixins: [emitter, Migrating],

    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },

    data() {
      return {
        currentValue: this.value,
        textareaCalcStyle: {},
        prefixOffset: null,
        suffixOffset: null,
        hovering: false,
        focused: false
      };
    },

    props: {
      value: [String, Number],
      placeholder: String,
      size: String,
      resize: String,
      name: String,
      form: String,
      id: String,
      maxlength: Number,
      minlength: Number,
      readonly: Boolean,
      autofocus: Boolean,
      disabled: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      autosize: {
        type: [Boolean, Object],
        default: false
      },
      rows: {
        type: Number,
        default: 2
      },
      autoComplete: {
        type: String,
        default: 'off'
      },
      max: {},
      min: {},
      step: {},
      validateEvent: {
        type: Boolean,
        default: true
      },
      suffixIcon: String,
      prefixIcon: String,
      label: String,
      clearable: {
        type: Boolean,
        default: false
      },
      tabindex: String
    },

    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      validateState() {
        return this.elFormItem ? this.elFormItem.validateState : '';
      },
      needStatusIcon() {
        return this.elForm ? this.elForm.statusIcon : false;
      },
      validateIcon() {
        return {
          validating: 'mz-icon-loading',
          success: 'mz-icon-circle-check',
          error: 'mz-icon-circle-close'
        }[this.validateState];
      },
      textareaStyle() {
        return merge({}, this.textareaCalcStyle, { resize: this.resize });
      },
      inputSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      isGroup() {
        return this.$slots.prepend || this.$slots.append;
      },
      showClear() {
        return this.clearable && this.currentValue !== '' && (this.focused || this.hovering);
      }
    },

    watch: {
      'value'(val, oldValue) {
        this.setCurrentValue(val);
      }
    },

    methods: {
      focus() {
        (this.$refs.input || this.$refs.textarea).focus();
      },
      getMigratingConfig() {
        return {
          props: {
            'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
            'on-icon-click': 'on-icon-click is removed.'
          },
          events: {
            'click': 'click is removed.'
          }
        };
      },
      handleBlur(event) {
        this.focused = false;
        this.$emit('blur', event);
        if (this.validateEvent) {
          this.dispatch('MzFormItem', 'mz.form.blur', [this.currentValue]);
        }
      },
      inputSelect() {
        (this.$refs.input || this.$refs.textarea).select();
      },
      resizeTextarea() {
        if (this.$isServer) return;
        var { autosize, type } = this;
        if (type !== 'textarea') return;
        if (!autosize) {
          this.textareaCalcStyle = {
            minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
          };
          return;
        }
        const minRows = autosize.minRows;
        const maxRows = autosize.maxRows;

        this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
      },
      handleFocus(event) {
        this.focused = true;
        this.$emit('focus', event);
      },
      handleInput(event) {
        const value = event.target.value;
        this.$emit('input', value);
        this.setCurrentValue(value);
      },
      handleChange(event) {
        this.$emit('change', event.target.value);
      },
      setCurrentValue(value) {
        if (value === this.currentValue) return;
        this.$nextTick(_ => {
          this.resizeTextarea();
        });
        this.currentValue = value;
        if (this.validateEvent) {
          this.dispatch('MzFormItem', 'mz.form.change', [value]);
        }
      },
      calcIconOffset(place) {
        const pendantMap = {
          'suf': 'append',
          'pre': 'prepend'
        };

        const pendant = pendantMap[place];

        if (this.$slots[pendant]) {
          return { transform: `translateX(${place === 'suf' ? '-' : ''}${this.$el.querySelector(`.mz-input-group__${pendant}`).offsetWidth}px)` };
        }
      },
      clear() {
        this.$emit('input', '');
        this.$emit('change', '');
        this.setCurrentValue('');
        this.focus();
      }
    },

    created() {
      this.$on('inputSelect', this.inputSelect);
    },

    mounted() {
      this.resizeTextarea();
      if (this.isGroup) {
        this.prefixOffset = this.calcIconOffset('pre');
        this.suffixOffset = this.calcIconOffset('suf');
      }
    }
  };
</script>
<style lang="less">
.mz-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  &::-webkit-scrollbar {
    z-index: 11;
    width: 6px;
  }
  &::-webkit-scrollbar:horizontal {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    width: 6px;
    background: #b4bccc;
  }
  &::-webkit-scrollbar-corner {
    background: #fff;
  }
  &::-webkit-scrollbar-track {
    background: #fff;
  }
  &::-webkit-scrollbar-track-piece {
    background: #fff;
    width: 6px;
  }
  &__clear {
    color: #c0c4cc;
    font-size: 14px;
    line-height: 16px;
    cursor: pointer;
    transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  &__clear:hover {
    color: #909399;
  }
  &__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 1;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    &::placeholder {
      color: #c0c4cc;
    }
    &:hover {
      border-color: #c0c4cc;
    }
    &:focus {
      outline: none;
      border-color: #eb3332;
    }
    &::-ms-clear{//只能去除IE10中的小叉号
      display: none;
    }
  }
  &__suffix {
    position: absolute;
    height: 100%;
    right: 5px;
    top: 0;
    text-align: center;
    color: #c0c4cc;
    transition: all .3s;
    pointer-events: none;
    &-inner {
      pointer-events: all;
    }
  }
  &__prefix {
    position: absolute;
    height: 100%;
    left: 5px;
    top: 0;
    text-align: center;
    color: #c0c4cc;
    transition: all .3s;
  }
  &__icon {
    height: 100%;
    width: 25px;
    text-align: center;
    transition: all .3s;
    line-height: 40px;
    &:after {
      content: '';
      height: 100%;
      width: 0;
      display: inline-block;
      vertical-align: middle;
    }
  }
  &__validateIcon {
    pointer-events: none;
  }
  &.is-active &__inner {
    outline: none;
    border-color: #eb3332;
  }
  &.is-disabled &__inner {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
  &.is-disabled &__inner::placeholder {
    color: #c0c4cc;
  }
  &.is-disabled &__icon {
    cursor: not-allowed;
  }
  &--suffix &__inner {
    padding-right: 30px;
  }
  &--prefix &__inner {
    padding-left: 30px;
  }
  &--medium {
    font-size: 14px;
  }
  &--medium &__inner {
    height: 36px;
  }
  &--medium &__icon {
    line-height: 36px;
  }
  &--small {
    font-size: 13px;
  }
  &--small &__inner {
    height: 32px;
  }
  &--small &__icon {
    line-height: 32px;
  }
  &--mini {
    font-size: 12px;
  }
  &--mini &__inner {
    height: 28px;
  }
  &--mini &__icon {
    line-height: 28px;
  }

  &-group {
    line-height: normal;
    display: inline-table;
    width: 100%;
    border-collapse: separate;
  }
  &-group > &__inner {
    vertical-align: middle;
    display: table-cell;
  }
  &-group__append, &-group__prepend {
    background-color: #f5f7fa;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
  }
  &-group__append:focus, &-group__prepend:focus {
    outline: none;
  }
  &-group__append .mz-select,
  &-group__append .mz-button, &-group__prepend .mz-select,
  &-group__prepend .mz-button {
    display: inline-block;
    margin: -20px;
  }
  &-group__append button.mz-button,
  &-group__append div.mz-select &__inner,
  &-group__append div.mz-select:hover &__inner, &-group__prepend button.mz-button,
  &-group__prepend div.mz-select &__inner,
  &-group__prepend div.mz-select:hover &__inner {
    border-color: transparent;
    background-color: transparent;
    color: inherit;
    border-top: 0;
    border-bottom: 0;
  }
  &-group__append .mz-button,
  &-group__append .mz-input, &-group__prepend .mz-button,
  &-group__prepend .mz-input {
    font-size: inherit;
  }
  &-group__prepend {
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &-group__append {
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  &-group--prepend &__inner {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  &-group--prepend .mz-select &.is-focus &__inner {
    border-color: transparent;
  }
  &-group--append &__inner {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &-group--append .mz-select &.is-focus &__inner {
    border-color: transparent;
  }
}
.mz-textarea {
  display: inline-block;
  width: 100%;
  vertical-align: bottom;
  font-size: 14px;
  &__inner {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  &__inner::placeholder {
    color: #c0c4cc;
  }
  &__inner:hover {
    border-color: #c0c4cc;
  }
  &__inner:focus {
    outline: none;
    border-color: #eb3332;
  }
  &.is-disabled &__inner {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
  &.is-disabled &__inner::placeholder {
    color: #c0c4cc;
  }
}
</style>
