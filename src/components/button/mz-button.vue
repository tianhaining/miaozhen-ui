<template>
  <button
    class="mz-button"
    @click="handleClick"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'mz-button--' + type : '',
      buttonSize ? 'mz-button--' + buttonSize : '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round
      }
    ]"
  >
    <i class="mz-icon-loading" v-if="loading" @click="handleInnerClick"></i>
    <i :class="icon" v-if="icon && !loading" @click="handleInnerClick"></i>
    <span v-if="$slots.default" @click="handleInnerClick"><slot></slot></span>
  </button>
</template>
<script>
  export default {
    name: 'MzButton',

    inject: {
      elFormItem: {
        default: ''
      }
    },

    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean
    },

    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      buttonSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      }
    },

    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      },
      handleInnerClick(evt) {
        if (this.disabled) {
          evt.stopPropagation();
        }
      }
    }
  };
</script>
<style lang="less">
.mz-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px; }
  .mz-button + .mz-button {
    margin-left: 10px; }
  .mz-button.is-round {
    padding: 12px 20px; }
  .mz-button:hover, .mz-button:focus {
    color: #eb3332;
    border-color: #d61918;
    background-color: #fff; 
  }
  .mz-button:active {
    color: #d61918;
    border-color: #d61918;
    outline: none; }
  .mz-button::-moz-focus-inner {
    border: 0; }
  .mz-button [class*="mz-icon-"] + span {
    margin-left: 5px; }
  .mz-button.is-plain:hover, .mz-button.is-plain:focus {
    background: #fff;
    border-color: #eb3332;
    color: #eb3332; }
  .mz-button.is-plain:active {
    background: #fff;
    border-color: #d61918;
    color: #d61918;
    outline: none; }
  .mz-button.is-active {
    color: #d61918;
    border-color: #d61918; }
  .mz-button.is-disabled, .mz-button.is-disabled:hover, .mz-button.is-disabled:focus {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5; }
  .mz-button.is-disabled.mz-button--text {
    background-color: transparent; }
  .mz-button.is-disabled.is-plain, .mz-button.is-disabled.is-plain:hover, .mz-button.is-disabled.is-plain:focus {
    background-color: #fff;
    border-color: #ebeef5;
    color: #c0c4cc; }
  .mz-button.is-loading {
    position: relative;
    pointer-events: none; }
    .mz-button.is-loading:before {
      pointer-events: none;
      content: '';
      position: absolute;
      left: -1px;
      top: -1px;
      right: -1px;
      bottom: -1px;
      border-radius: inherit;
      background-color: rgba(255, 255, 255, 0.35); }
  .mz-button.is-round {
    border-radius: 20px;
    padding: 12px 23px; }
  .mz-button--primary {
    color: #fff;
    background-color: #eb3332;
    border-color: #eb3332; }
    .mz-button--primary:hover, .mz-button--primary:focus {
      background: #ff4e4e;
      border-color: #ff4e4e;
      color: #fff; }
    .mz-button--primary:active {
      background: #d61918;
      border-color: #d61918;
      color: #fff;
      outline: none; }
    .mz-button--primary.is-active {
      background: #d61918;
      border-color: #d61918;
      color: #fff; }
    .mz-button--primary.is-disabled, .mz-button--primary.is-disabled:hover, .mz-button--primary.is-disabled:focus, .mz-button--primary.is-disabled:active {
      color: #fff;
      background-color: #a0cfff;
      border-color: #a0cfff; }
    .mz-button--primary.is-plain {//is-plain
      // color: #eb3332;
      // background: #ecf5ff;
      // border-color: #b3d8ff;
      color: #f56c6c;
      background: #fef0f0;
      border-color: #fbc4c4;
    }
      .mz-button--primary.is-plain:hover, .mz-button--primary.is-plain:focus {
        background: #eb3332;
        border-color: #eb3332;
        color: #fff; }
      .mz-button--primary.is-plain:active {
        background: #d61918;
        border-color: #d61918;
        color: #fff;
        outline: none; }
      .mz-button--primary.is-plain.is-disabled, .mz-button--primary.is-plain.is-disabled:hover, .mz-button--primary.is-plain.is-disabled:focus, .mz-button--primary.is-plain.is-disabled:active {
        color: #8cc5ff;
        background-color: #ecf5ff;
        border-color: #d9ecff; }
  .mz-button--success {
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a; }
    .mz-button--success:hover, .mz-button--success:focus {
      background: #85ce61;
      border-color: #85ce61;
      color: #fff; }
    .mz-button--success:active {
      background: #5daf34;
      border-color: #5daf34;
      color: #fff;
      outline: none; }
    .mz-button--success.is-active {
      background: #5daf34;
      border-color: #5daf34;
      color: #fff; }
    .mz-button--success.is-disabled, .mz-button--success.is-disabled:hover, .mz-button--success.is-disabled:focus, .mz-button--success.is-disabled:active {
      color: #fff;
      background-color: #b3e19d;
      border-color: #b3e19d; }
    .mz-button--success.is-plain {
      color: #67c23a;
      background: #f0f9eb;
      border-color: #c2e7b0; }
      .mz-button--success.is-plain:hover, .mz-button--success.is-plain:focus {
        background: #67c23a;
        border-color: #67c23a;
        color: #fff; }
      .mz-button--success.is-plain:active {
        background: #5daf34;
        border-color: #5daf34;
        color: #fff;
        outline: none; }
      .mz-button--success.is-plain.is-disabled, .mz-button--success.is-plain.is-disabled:hover, .mz-button--success.is-plain.is-disabled:focus, .mz-button--success.is-plain.is-disabled:active {
        color: #a4da89;
        background-color: #f0f9eb;
        border-color: #e1f3d8; }
  .mz-button--warning {
    color: #fff;
    background-color: #e6a23c;
    border-color: #e6a23c; }
    .mz-button--warning:hover, .mz-button--warning:focus {
      background: #ebb563;
      border-color: #ebb563;
      color: #fff; }
    .mz-button--warning:active {
      background: #cf9236;
      border-color: #cf9236;
      color: #fff;
      outline: none; }
    .mz-button--warning.is-active {
      background: #cf9236;
      border-color: #cf9236;
      color: #fff; }
    .mz-button--warning.is-disabled, .mz-button--warning.is-disabled:hover, .mz-button--warning.is-disabled:focus, .mz-button--warning.is-disabled:active {
      color: #fff;
      background-color: #f3d19e;
      border-color: #f3d19e; }
    .mz-button--warning.is-plain {
      color: #e6a23c;
      background: #fdf6ec;
      border-color: #f5dab1; }
      .mz-button--warning.is-plain:hover, .mz-button--warning.is-plain:focus {
        background: #e6a23c;
        border-color: #e6a23c;
        color: #fff; }
      .mz-button--warning.is-plain:active {
        background: #cf9236;
        border-color: #cf9236;
        color: #fff;
        outline: none; }
      .mz-button--warning.is-plain.is-disabled, .mz-button--warning.is-plain.is-disabled:hover, .mz-button--warning.is-plain.is-disabled:focus, .mz-button--warning.is-plain.is-disabled:active {
        color: #f0c78a;
        background-color: #fdf6ec;
        border-color: #faecd8; }
  .mz-button--danger {
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c; }
    .mz-button--danger:hover, .mz-button--danger:focus {
      background: #f78989;
      border-color: #f78989;
      color: #fff; }
    .mz-button--danger:active {
      background: #dd6161;
      border-color: #dd6161;
      color: #fff;
      outline: none; }
    .mz-button--danger.is-active {
      background: #dd6161;
      border-color: #dd6161;
      color: #fff; }
    .mz-button--danger.is-disabled, .mz-button--danger.is-disabled:hover, .mz-button--danger.is-disabled:focus, .mz-button--danger.is-disabled:active {
      color: #fff;
      background-color: #fab6b6;
      border-color: #fab6b6; }
    .mz-button--danger.is-plain {
      color: #f56c6c;
      background: #fef0f0;
      border-color: #fbc4c4; }
      .mz-button--danger.is-plain:hover, .mz-button--danger.is-plain:focus {
        background: #f56c6c;
        border-color: #f56c6c;
        color: #fff; }
      .mz-button--danger.is-plain:active {
        background: #dd6161;
        border-color: #dd6161;
        color: #fff;
        outline: none; }
      .mz-button--danger.is-plain.is-disabled, .mz-button--danger.is-plain.is-disabled:hover, .mz-button--danger.is-plain.is-disabled:focus, .mz-button--danger.is-plain.is-disabled:active {
        color: #f9a7a7;
        background-color: #fef0f0;
        border-color: #fde2e2; }
  .mz-button--info {
    color: #fff;
    background-color: #909399;
    border-color: #909399; }
    .mz-button--info:hover, .mz-button--info:focus {
      background: #a6a9ad;
      border-color: #a6a9ad;
      color: #fff; }
    .mz-button--info:active {
      background: #82848a;
      border-color: #82848a;
      color: #fff;
      outline: none; }
    .mz-button--info.is-active {
      background: #82848a;
      border-color: #82848a;
      color: #fff; }
    .mz-button--info.is-disabled, .mz-button--info.is-disabled:hover, .mz-button--info.is-disabled:focus, .mz-button--info.is-disabled:active {
      color: #fff;
      background-color: #c8c9cc;
      border-color: #c8c9cc; }
    .mz-button--info.is-plain {
      color: #909399;
      background: #f4f4f5;
      border-color: #d3d4d6; }
      .mz-button--info.is-plain:hover, .mz-button--info.is-plain:focus {
        background: #909399;
        border-color: #909399;
        color: #fff; }
      .mz-button--info.is-plain:active {
        background: #82848a;
        border-color: #82848a;
        color: #fff;
        outline: none; }
      .mz-button--info.is-plain.is-disabled, .mz-button--info.is-plain.is-disabled:hover, .mz-button--info.is-plain.is-disabled:focus, .mz-button--info.is-plain.is-disabled:active {
        color: #bcbec2;
        background-color: #f4f4f5;
        border-color: #e9e9eb; }
  .mz-button--medium {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px; }
    .mz-button--medium.is-round {
      padding: 10px 20px; }
  .mz-button--small {
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px; }
    .mz-button--small.is-round {
      padding: 9px 15px; }
  .mz-button--mini {
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 3px; }
    .mz-button--mini.is-round {
      padding: 7px 15px; }
  .mz-button--text {
    border-color: transparent;
    color: #eb3332;
    background: transparent;
    padding-left: 0;
    padding-right: 0; }
    .mz-button--text:hover, .mz-button--text:focus {
      color: #ff4e4e;
      border-color: transparent;
      background-color: transparent; }
    .mz-button--text:active {
      color: #d61918;
      border-color: transparent;
      background-color: transparent; }
    .mz-button--text.is-disabled, .mz-button--text.is-disabled:hover, .mz-button--text.is-disabled:focus {
      border-color: transparent; }

.mz-button-group {
  display: inline-block;
  vertical-align: middle; }
  .mz-button-group::before,
  .mz-button-group::after {
    display: table;
    content: ""; }

  .mz-button-group::after {
    clear: both; }
  .mz-button-group .mz-button {
    float: left;
    position: relative; }
    .mz-button-group .mz-button + .mz-button {
      margin-left: 0; }
    .mz-button-group .mz-button:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0; }
    .mz-button-group .mz-button:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0; }
    .mz-button-group .mz-button:first-child:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px; }
    .mz-button-group .mz-button:not(:first-child):not(:last-child) {
      border-radius: 0; }
    .mz-button-group .mz-button:not(:last-child) {
      margin-right: -1px; }
    .mz-button-group .mz-button:hover, .mz-button-group .mz-button:focus, .mz-button-group .mz-button:active {
      z-index: 1; }
    .mz-button-group .mz-button.is-active {
      z-index: 1; }
  .mz-button-group .mz-button--primary:first-child {
    border-right-color: rgba(255, 255, 255, 0.5); }
  .mz-button-group .mz-button--primary:last-child {
    border-left-color: rgba(255, 255, 255, 0.5); }
  .mz-button-group .mz-button--primary:not(:first-child):not(:last-child) {
    border-left-color: rgba(255, 255, 255, 0.5);
    border-right-color: rgba(255, 255, 255, 0.5); }
  .mz-button-group .mz-button--success:first-child {
    border-right-color: rgba(255, 255, 255, 0.5); }
  .mz-button-group .mz-button--success:last-child {
    border-left-color: rgba(255, 255, 255, 0.5); }
  .mz-button-group .mz-button--success:not(:first-child):not(:last-child) {
    border-left-color: rgba(255, 255, 255, 0.5);
    border-right-color: rgba(255, 255, 255, 0.5); }
  .mz-button-group .mz-button--warning:first-child {
    border-right-color: rgba(255, 255, 255, 0.5); }
  .mz-button-group .mz-button--warning:last-child {
    border-left-color: rgba(255, 255, 255, 0.5); }
  .mz-button-group .mz-button--warning:not(:first-child):not(:last-child) {
    border-left-color: rgba(255, 255, 255, 0.5);
    border-right-color: rgba(255, 255, 255, 0.5); }
  .mz-button-group .mz-button--danger:first-child {
    border-right-color: rgba(255, 255, 255, 0.5); }
  .mz-button-group .mz-button--danger:last-child {
    border-left-color: rgba(255, 255, 255, 0.5); }
  .mz-button-group .mz-button--danger:not(:first-child):not(:last-child) {
    border-left-color: rgba(255, 255, 255, 0.5);
    border-right-color: rgba(255, 255, 255, 0.5); }
  .mz-button-group .mz-button--info:first-child {
    border-right-color: rgba(255, 255, 255, 0.5); }
  .mz-button-group .mz-button--info:last-child {
    border-left-color: rgba(255, 255, 255, 0.5); }
  .mz-button-group .mz-button--info:not(:first-child):not(:last-child) {
    border-left-color: rgba(255, 255, 255, 0.5);
    border-right-color: rgba(255, 255, 255, 0.5); }
</style>
