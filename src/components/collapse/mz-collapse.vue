<template>
  <div class="mz-collapse" role="tablist" aria-multiselectable="true">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'MzCollapse',

    componentName: 'MzCollapse',

    props: {
      accordion: Boolean,
      value: {
        type: [Array, String, Number],
        default() {
          return [];
        }
      }
    },

    data() {
      return {
        activeNames: [].concat(this.value)
      };
    },

    provide() {
      return {
        collapse: this
      };
    },

    watch: {
      value(value) {
        this.activeNames = [].concat(value);
      }
    },

    methods: {
      setActiveNames(activeNames) {
        activeNames = [].concat(activeNames);
        let value = this.accordion ? activeNames[0] : activeNames;
        this.activeNames = activeNames;
        this.$emit('input', value);
        this.$emit('change', value);
      },
      handleItemClick(item) {
        if (this.accordion) {
          this.setActiveNames(
            (this.activeNames[0] || this.activeNames[0] === 0) &&
            this.activeNames[0] === item.name
              ? '' : item.name
          );
        } else {
          let activeNames = this.activeNames.slice(0);
          let index = activeNames.indexOf(item.name);

          if (index > -1) {
            activeNames.splice(index, 1);
          } else {
            activeNames.push(item.name);
          }
          this.setActiveNames(activeNames);
        }
      }
    },

    created() {
      this.$on('item-click', this.handleItemClick);
    }
  };
</script>
<style lang="less">
.mz-collapse {
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5; }

.mz-collapse-item__header {
  height: 48px;
  line-height: 48px;
  background-color: #fff;
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  font-weight: 500;
  transition: border-bottom-color .3s;
  outline: none; }
  .mz-collapse-item__arrow {
    margin-right: 8px;
    transition: transform .3s;
    float: right;
    line-height: 48px;
    font-weight: 300; }
  .mz-collapse-item__header.focusing:focus:not(:hover) {
    color: #409EFF; }
.mz-collapse-item__wrap {
  will-change: height;
  background-color: #fff;
  overflow: hidden;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5; }
.mz-collapse-item__content {
  padding-bottom: 25px;
  font-size: 13px;
  color: #303133;
  line-height: 1.769230769230769; }
.mz-collapse-item.is-active .mz-collapse-item__header {
  border-bottom-color: transparent; }
  .mz-collapse-item.is-active .mz-collapse-item__header .mz-collapse-item__arrow {
    transform: rotate(90deg); }
.mz-collapse-item:last-child {
  margin-bottom: -1px; }
</style>
