<template>
  <div
    class="mz-select-dropdown mz-popper"
    :class="[{ 'is-multiple': $parent.multiple }, popperClass]"
    :style="{ minWidth: minWidth }">
    <slot></slot>
  </div>
</template>

<script type="text/babel">
  import Popper from '@/utils/vue-popper';

  export default {
    name: 'MzSelectDropdown',

    componentName: 'MzSelectDropdown',

    mixins: [Popper],

    props: {
      placement: {
        default: 'bottom-start'
      },

      boundariesPadding: {
        default: 0
      },

      popperOptions: {
        default() {
          return {
            gpuAcceleration: false
          };
        }
      },

      visibleArrow: {
        default: true
      }
    },

    data() {
      return {
        minWidth: ''
      };
    },

    computed: {
      popperClass() {
        return this.$parent.popperClass;
      }
    },

    watch: {
      '$parent.inputWidth'() {
        this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
      }
    },

    mounted() {
      this.referenceElm = this.$parent.$refs.reference.$el;
      this.$parent.popperElm = this.popperElm = this.$el;
      // this.$on('updatePopper', () => {
      //   if (this.$parent.visible) this.updatePopper();
      // });
      this.$on('destroyPopper', this.destroyPopper);
    }
  };
</script>
<style lang="less">
.mz-popper .popper__arrow,
.mz-popper .popper__arrow::after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid; }
.mz-popper .popper__arrow {
  border-width: 6px;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03)); }
.mz-popper .popper__arrow::after {
  content: " ";
  border-width: 6px; }
.mz-popper[x-placement^="top"] {
  margin-bottom: 12px; }
.mz-popper[x-placement^="top"] .popper__arrow {
  bottom: -6px;
  left: 50%;
  margin-right: 3px;
  border-top-color: #ebeef5;
  border-bottom-width: 0; }
  .mz-popper[x-placement^="top"] .popper__arrow::after {
    bottom: 1px;
    margin-left: -6px;
    border-top-color: #fff;
    border-bottom-width: 0; }
.mz-popper[x-placement^="bottom"] {
  margin-top: 12px; }
.mz-popper[x-placement^="bottom"] .popper__arrow {
  top: -6px;
  left: 50%;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #ebeef5; }
  .mz-popper[x-placement^="bottom"] .popper__arrow::after {
    top: 1px;
    margin-left: -6px;
    border-top-width: 0;
    border-bottom-color: #fff; }
.mz-popper[x-placement^="right"] {
  margin-left: 12px; }
.mz-popper[x-placement^="right"] .popper__arrow {
  top: 50%;
  left: -6px;
  margin-bottom: 3px;
  border-right-color: #ebeef5;
  border-left-width: 0; }
  .mz-popper[x-placement^="right"] .popper__arrow::after {
    bottom: -6px;
    left: 1px;
    border-right-color: #fff;
    border-left-width: 0; }
.mz-popper[x-placement^="left"] {
  margin-right: 12px; }
.mz-popper[x-placement^="left"] .popper__arrow {
  top: 50%;
  right: -6px;
  margin-bottom: 3px;
  border-right-width: 0;
  border-left-color: #ebeef5; }
  .mz-popper[x-placement^="left"] .popper__arrow::after {
    right: 1px;
    bottom: -6px;
    margin-left: -6px;
    border-right-width: 0;
    border-left-color: #fff; }

.mz-select-dropdown {
  position: absolute;
  z-index: 1001;
  border: solid 1px #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 5px 0; }
  .mz-select-dropdown.is-multiple .mz-select-dropdown__item.selected {
    color: #eb3332;
    background-color: #fff; }
    .mz-select-dropdown.is-multiple .mz-select-dropdown__item.selected.hover {
      background-color: #f5f7fa; }
    .mz-select-dropdown.is-multiple .mz-select-dropdown__item.selected::after {
      position: absolute;
      right: 20px;
      font-family: 'element-icons';
      content: "\E611";
      font-size: 12px;
      font-weight: bold;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale; }
  .mz-select-dropdown .mz-scrollbar.is-empty .mz-select-dropdown__list {
    padding: 0; }
  .mz-select-dropdown .popper__arrow {
    transform: translateX(-400%); }
  .mz-select-dropdown.is-arrow-fixed .popper__arrow {
    transform: translateX(-200%); }

.mz-select-dropdown__empty {
  padding: 10px 0;
  margin: 0;
  text-align: center;
  color: #999;
  font-size: 14px; }

.mz-select-dropdown__wrap {
  max-height: 274px; }

.mz-select-dropdown__list {
  list-style: none;
  padding: 6px 0;
  margin: 0;
  box-sizing: border-box; }
</style>
