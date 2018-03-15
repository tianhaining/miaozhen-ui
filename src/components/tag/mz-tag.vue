<template>
  <transition :name="disableTransitions ? '' : 'mz-zoom-in-center'">
    <span
      class="mz-tag"
      :class="[
        type ? 'mz-tag--' + type : '',
        tagSize && `mz-tag--${tagSize}`,
        {'is-hit': hit}
      ]"
      :style="{backgroundColor: color}">
      <slot></slot>
      <i class="mz-tag__close mz-icon-close"
        v-if="closable"
        @click.stop="handleClose"></i>
    </span>
  </transition>
</template>
<script>
  export default {
    name: 'MzTag',
    props: {
      text: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      disableTransitions: Boolean,
      color: String,
      size: String
    },
    methods: {
      handleClose(event) {
        this.$emit('close', event);
      }
    },
    computed: {
      tagSize() {
        return this.size || (this.$ELEMENT || {}).size;
      }
    }
  };
</script>
<style lang="less">
.mz-tag {
  background-color: rgba(64, 158, 255, 0.1);
  display: inline-block;
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  color: #409EFF;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid rgba(64, 158, 255, 0.2);
  white-space: nowrap; }
  .mz-tag .mz-icon-close {
    border-radius: 50%;
    text-align: center;
    position: relative;
    cursor: pointer;
    font-size: 12px;
    height: 16px;
    width: 16px;
    line-height: 16px;
    vertical-align: middle;
    top: -1px;
    right: -5px;
    color: #409EFF; }
    .mz-tag .mz-icon-close::before {
      display: block; }
    .mz-tag .mz-icon-close:hover {
      background-color: #409EFF;
      color: #fff; }
  .mz-tag--info {
    background-color: rgba(144, 147, 153, 0.1);
    border-color: rgba(144, 147, 153, 0.2);
    color: #909399; }
    .mz-tag--info.is-hit {
      border-color: #909399; }
    .mz-tag--info .mz-tag__close {
      color: #909399; }
    .mz-tag--info .mz-tag__close:hover {
      background-color: #909399;
      color: #fff; }
  .mz-tag--success {
    background-color: rgba(103, 194, 58, 0.1);
    border-color: rgba(103, 194, 58, 0.2);
    color: #67c23a; }
    .mz-tag--success.is-hit {
      border-color: #67c23a; }
    .mz-tag--success .mz-tag__close {
      color: #67c23a; }
    .mz-tag--success .mz-tag__close:hover {
      background-color: #67c23a;
      color: #fff; }
  .mz-tag--warning {
    background-color: rgba(230, 162, 60, 0.1);
    border-color: rgba(230, 162, 60, 0.2);
    color: #e6a23c; }
    .mz-tag--warning.is-hit {
      border-color: #e6a23c; }
    .mz-tag--warning .mz-tag__close {
      color: #e6a23c; }
    .mz-tag--warning .mz-tag__close:hover {
      background-color: #e6a23c;
      color: #fff; }
  .mz-tag--danger {
    background-color: rgba(245, 108, 108, 0.1);
    border-color: rgba(245, 108, 108, 0.2);
    color: #f56c6c; }
    .mz-tag--danger.is-hit {
      border-color: #f56c6c; }
    .mz-tag--danger .mz-tag__close {
      color: #f56c6c; }
    .mz-tag--danger .mz-tag__close:hover {
      background-color: #f56c6c;
      color: #fff; }
  .mz-tag--medium {
    height: 28px;
    line-height: 26px; }
    .mz-tag--medium .mz-icon-close {
      transform: scale(0.8); }
  .mz-tag--small {
    height: 24px;
    padding: 0 8px;
    line-height: 22px; }
    .mz-tag--small .mz-icon-close {
      transform: scale(0.8); }
  .mz-tag--mini {
    height: 20px;
    padding: 0 5px;
    line-height: 19px; }
    .mz-tag--mini .mz-icon-close {
      margin-left: -3px;
      transform: scale(0.7); }
</style>
