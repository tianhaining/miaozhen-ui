<template>
  <ul class="mz-select-group__wrap" v-show="visible">
    <li class="mz-select-group__title">{{ label }}</li>
    <li>
      <ul class="mz-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
  import Emitter from '@/mixins/emitter';

  export default {
    mixins: [Emitter],

    name: 'MzOptionGroup',

    componentName: 'MzOptionGroup',

    props: {
      label: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        visible: true
      };
    },

    watch: {
      disabled(val) {
        this.broadcast('MzOption', 'handleGroupDisabled', val);
      }
    },

    methods: {
      queryChange() {
        this.visible = this.$children &&
          Array.isArray(this.$children) &&
          this.$children.some(option => option.visible === true);
      }
    },

    created() {
      this.$on('queryChange', this.queryChange);
    },

    mounted() {
      if (this.disabled) {
        this.broadcast('MzOption', 'handleGroupDisabled', this.disabled);
      }
    }
  };
</script>
<style lang="less">
.mz-select-group {
  margin: 0;
  padding: 0; }
  .mz-select-group__wrap {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0; }
    .mz-select-group__wrap:not(:last-of-type) {
      padding-bottom: 24px; }
      .mz-select-group__wrap:not(:last-of-type)::after {
        content: '';
        position: absolute;
        display: block;
        left: 20px;
        right: 20px;
        bottom: 12px;
        height: 1px;
        background: #e4e7ed; }
  .mz-select-group__title {
    padding-left: 20px;
    font-size: 12px;
    color: #909399;
    line-height: 30px; }
  .mz-select-group .mz-select-dropdown__item {
    padding-left: 20px; }
</style>
