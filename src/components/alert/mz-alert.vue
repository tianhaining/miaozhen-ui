<template>
  <transition name="mz-alert-fade">
    <div
      class="mz-alert"
      :class="[typeClass, center ? 'is-center' : '']"
      v-show="visible"
      role="alert"
    >
      <i class="mz-alert__icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
      <div class="mz-alert__content">
        <span class="mz-alert__title" :class="[ isBoldTitle ]" v-if="title">{{ title }}</span>
        <slot>
          <p class="mz-alert__description" v-if="description">{{ description }}</p>
        </slot>
        <i class="mz-alert__closebtn" :class="{ 'is-customed': closeText !== '', 'mz-icon-close': closeText === '' }" v-show="closable" @click="close()">{{closeText}}</i>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  const TYPE_CLASSES_MAP = {
    'success': 'mz-icon-success',
    'warning': 'mz-icon-warning',
    'error': 'mz-icon-error'
  };
  export default {
    name: 'MzAlert',

    props: {
      title: {
        type: String,
        default: '',
        required: true
      },
      description: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'info'
      },
      closable: {
        type: Boolean,
        default: true
      },
      closeText: {
        type: String,
        default: ''
      },
      showIcon: Boolean,
      center: Boolean
    },

    data() {
      return {
        visible: true
      };
    },

    methods: {
      close() {
        this.visible = false;
        this.$emit('close');
      }
    },

    computed: {
      typeClass() {
        return `mz-alert--${ this.type }`;
      },

      iconClass() {
        return TYPE_CLASSES_MAP[this.type] || 'mz-icon-info';
      },

      isBigIcon() {
        return this.description || this.$slots.default ? 'is-big' : '';
      },

      isBoldTitle() {
        return this.description || this.$slots.default ? 'is-bold' : '';
      }
    }
  };
</script>
<style lang="less">
.mz-alert {
  width: 100%;
  padding: 8px 16px;
  margin: 0;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  opacity: 1;
  display: flex;
  align-items: center;
  transition: opacity .2s; }
  .mz-alert.is-center {
    justify-content: center; }
  .mz-alert--success {
    background-color: #f0f9eb;
    color: #67c23a; }
    .mz-alert--success .mz-alert__description {
      color: #67c23a; }
  .mz-alert--info {
    background-color: #f4f4f5;
    color: #909399; }
    .mz-alert--info .mz-alert__description {
      color: #909399; }
  .mz-alert--warning {
    background-color: #fdf6ec;
    color: #e6a23c; }
    .mz-alert--warning .mz-alert__description {
      color: #e6a23c; }
  .mz-alert--error {
    background-color: #fef0f0;
    color: #f56c6c; }
    .mz-alert--error .mz-alert__description {
      color: #f56c6c; }
  .mz-alert__content {
    display: table-cell;
    padding: 0 8px; }
  .mz-alert__icon {
    font-size: 16px;
    width: 16px; }
    .mz-alert__icon.is-big {
      font-size: 28px;
      width: 28px; }
  .mz-alert__title {
    font-size: 13px;
    line-height: 18px; }
    .mz-alert__title.is-bold {
      font-weight: bold; }
  .mz-alert .mz-alert__description {
    font-size: 12px;
    margin: 5px 0 0 0; }
  .mz-alert__closebtn {
    font-size: 12px;
    color: #c0c4cc;
    opacity: 1;
    position: absolute;
    top: 12px;
    right: 15px;
    cursor: pointer; }
    .mz-alert__closebtn.is-customed {
      font-style: normal;
      font-size: 13px;
      top: 9px; }

.mz-alert-fade-enter,
.mz-alert-fade-leave-active {
  opacity: 0; }
</style>
