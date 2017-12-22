<template>
<label class="mz-radio"
  :class="{
      'is-disabled': isDisabled
    }"
  >
  <input
    class="mz-radio--input"
    :class="{
        'is-disabled': isDisabled
      }"
    :value="label"
    type="radio"
    v-model="model"
    @focus="focus = true"
    @blur="focus = false"
    :name="name"
    :disabled="isDisabled"/>
  <span class="mz-radio--label">
    <slot></slot>
    <template v-if="!$slots.default">{{label}}</template>
  </span>
</label>
</template>
<script>
  export default {
    name: 'MzRadio',
    componentName: 'MzRadio',
    props: {
      value: {},
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

      isDisabled() {
        return this.isGroup
          ? this._radioGroup.disabled || this.disabled
          : this.disabled;
      }
    }
  };
</script>
<style lang="less">
.radioStyle(@positon, @display, @width, @height, @radius) {
  position: @positon;
  display: @display;
  width: @width;
  height: @height;
  /*设置为圆形，看起来是个单选框*/
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
  border-radius: @radius;
}
.scaleStyle (@scale){/*定义2D缩放转换*/
  -webkit-transform: @scale;
  -moz-transform: @scale;
  transform: @scale;
}
.inputStyle (@borderColor, @cursor){
  /*去除浏览器默认样式*/
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /*自定义样式*/
  // vertical-align: top;
  border: 1px solid @borderColor;
  outline: none;
  cursor: @cursor;
  line-height: 1;
  vertical-align: middle;
  margin: 0;
  .radioStyle(relative, inline-block, 14px, 14px, 14px);
}
.inputAfterStyle (@background){
  content: '';
  .radioStyle(absolute, block, 8px, 8px, 8px);
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: @background;
  .scaleStyle (scale(0));
  /*增加一些动画,设置过渡效果*/
  -webkit-transition : all ease-in-out 300ms;
  -moz-transition : all ease-in-out 300ms;
  transition : all ease-in-out 300ms;
}
.mz-radio {
  font-size: 14px;
  line-height: 1;
  display: inline-block;
  color: #606266;
  &--input {
    .inputStyle (#eb3332, pointer);
  }
  /*单选框选中之后的样式*/
  &--input:after {
    .inputAfterStyle (#eb3332);
  }
  &--input:checked:after {
    .scaleStyle (scale(1));
  }
  &--label {
    font-size: 14px;
    vertical-align: middle;
    padding-left: 4px;
  }
}
/*禁用状态下的样式*/
.mz-radio.is-disabled {
  cursor: not-allowed;
  .is-disabled {
    .inputStyle (#e2e1e1, not-allowed);
  }
  /*单选框选中之后的样式*/
  .is-disabled:after {
    content: '';
    .radioStyle(absolute, block, 8px, 8px, 8px);
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: #e2e1e1;
  }
}
</style>
