<template>
  <div
    class="mz-switch"
    :class="{ 'is-disabled': disabled, 'is-checked': checked }"
    role="switch"
    :aria-checked="checked"
    :aria-disabled="disabled"
    @click="switchValue"
  >
    <input
      class="mz-switch__input"
      type="checkbox"
      @change="handleChange"
      ref="input"
      :name="name"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="disabled"
      @keydown.enter="switchValue"
    >
    <span
      :class="['mz-switch__label', 'mz-switch__labmz--left', !checked ? 'is-active' : '']"
      v-if="inactiveIconClass || inactiveText">
      <i :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
      <span v-if="!inactiveIconClass && inactiveText" :aria-hidden="checked">{{ inactiveText }}</span>
    </span>
    <span class="mz-switch__core" ref="core" :style="{ 'width': coreWidth + 'px' }">
      <span class="mz-switch__button" :style="{ transform }"></span>
    </span>
    <span
      :class="['mz-switch__label', 'mz-switch__labmz--right', checked ? 'is-active' : '']"
      v-if="activeIconClass || activeText">
      <i :class="[activeIconClass]" v-if="activeIconClass"></i>
      <span v-if="!activeIconClass && activeText" :aria-hidden="!checked">{{ activeText }}</span>
    </span>
  </div>
</template>
<script>
  import Focus from '@/mixins/focus';
  import Migrating from '@/mixins/migrating';

  export default {
    name: 'MzSwitch',
    mixins: [Focus('input'), Migrating],
    props: {
      value: {
        type: [Boolean, String, Number],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 0
      },
      activeIconClass: {
        type: String,
        default: ''
      },
      inactiveIconClass: {
        type: String,
        default: ''
      },
      activeText: String,
      inactiveText: String,
      activeColor: {
        type: String,
        default: ''
      },
      inactiveColor: {
        type: String,
        default: ''
      },
      activeValue: {
        type: [Boolean, String, Number],
        default: true
      },
      inactiveValue: {
        type: [Boolean, String, Number],
        default: false
      },
      name: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        coreWidth: this.width
      };
    },
    created() {
      if (!~[this.activeValue, this.inactiveValue].indexOf(this.value)) {
        this.$emit('input', this.inactiveValue);
      }
    },
    computed: {
      checked() {
        return this.value === this.activeValue;
      },
      transform() {
        return this.checked ? `translate3d(${ this.coreWidth - 20 }px, 0, 0)` : '';
      }
    },
    watch: {
      checked() {
        this.$refs.input.checked = this.checked;
        if (this.activeColor || this.inactiveColor) {
          this.setBackgroundColor();
        }
      }
    },
    methods: {
      handleChange(event) {
        this.$emit('input', !this.checked ? this.activeValue : this.inactiveValue);
        this.$emit('change', !this.checked ? this.activeValue : this.inactiveValue);
        this.$nextTick(() => {
          // set input's checked property
          // in case parent refuses to change component's value
          this.$refs.input.checked = this.checked;
        });
      },
      setBackgroundColor() {
        let newColor = this.checked ? this.activeColor : this.inactiveColor;
        this.$refs.core.style.borderColor = newColor;
        this.$refs.core.style.backgroundColor = newColor;
      },
      switchValue() {
        this.$refs.input.click();
      },
      getMigratingConfig() {
        return {
          props: {
            'on-color': 'on-color is renamed to active-color.',
            'off-color': 'off-color is renamed to inactive-color.',
            'on-text': 'on-text is renamed to active-text.',
            'off-text': 'off-text is renamed to inactive-text.',
            'on-value': 'on-value is renamed to active-value.',
            'off-value': 'off-value is renamed to inactive-value.',
            'on-icon-class': 'on-icon-class is renamed to active-icon-class.',
            'off-icon-class': 'off-icon-class is renamed to inactive-icon-class.'
          },
          events: {//添加这个方法解决Error in mounted hook: "TypeError: Cannot read property 'input' of undefined"
            selectionchange: 'selectionchange is renamed to selection-change.'
          }
        };
      }
    },
    mounted() {
      /* istanbul ignore if */
      this.coreWidth = this.width || 40;
      if (this.activeColor || this.inactiveColor) {
        this.setBackgroundColor();
      }
      this.$refs.input.checked = this.checked;
    }
  };
</script>
<style lang="less">
.mz-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  vertical-align: middle; }
  .mz-switch.is-disabled .mz-switch__core, .mz-switch.is-disabled .mz-switch__label {
    cursor: not-allowed; }
  .mz-switch__label {
    transition: .2s;
    height: 20px;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    vertical-align: middle;
    color: #303133; }
    .mz-switch__label.is-active {
      color: #eb3332; }
    .mz-switch__label--left {
      margin-right: 10px; }
    .mz-switch__label--right {
      margin-left: 10px; }
    .mz-switch__label * {
      line-height: 1;
      font-size: 14px;
      display: inline-block; }
  .mz-switch__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0; }
    .mz-switch__input:focus ~ .mz-switch__core {
      outline: 1px solid #eb3332; }
  .mz-switch__core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color .3s, background-color .3s;
    vertical-align: middle; }
    .mz-switch__core .mz-switch__button {
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: transform .3s;
      width: 16px;
      height: 16px;
      background-color: #fff; }
  .mz-switch.is-checked .mz-switch__core {
    border-color: #eb3332;
    background-color: #eb3332; }
  .mz-switch.is-disabled {
    opacity: 0.6; }
  .mz-switch--wide .mz-switch__label.mz-switch__label--left span {
    left: 10px; }
  .mz-switch--wide .mz-switch__label.mz-switch__label--right span {
    right: 10px; }
  .mz-switch .label-fade-enter, .mz-switch .label-fade-leave-active {
    opacity: 0; }
</style>
