<template>
  <transition name="dialog-fade">
    <div class="mz-dialog__wrapper" v-show="visible" @click.self="handleWrapperClick">
      <div
        class="mz-dialog"
        :class="[{ 'is-fullscreen': fullscreen, 'mz-dialog--center': center }, customClass]"
        ref="dialog"
        :style="style">
        <div class="mz-dialog__header">
          <slot name="title">
            <span class="mz-dialog__title">{{ title }}</span>
          </slot>
          <button
            type="button"
            class="mz-dialog__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleClose">
            <i class="mz-dialog__close mz-icon mz-icon-close"></i>
          </button>
        </div>
        <div class="mz-dialog__body" v-if="rendered"><slot></slot></div>
        <div class="mz-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Popup from '@/utils/popup';
  import Migrating from '@/mixins/migrating';
  import emitter from '@/mixins/emitter';

  export default {
    name: 'MzDialog',

    mixins: [Popup, emitter, Migrating],

    props: {
      title: {
        type: String,
        default: ''
      },

      modal: {
        type: Boolean,
        default: true
      },

      modalAppendToBody: {
        type: Boolean,
        default: true
      },

      appendToBody: {
        type: Boolean,
        default: false
      },

      lockScroll: {
        type: Boolean,
        default: true
      },

      closeOnClickModal: {
        type: Boolean,
        default: true
      },

      closeOnPressEscape: {
        type: Boolean,
        default: true
      },

      showClose: {
        type: Boolean,
        default: true
      },

      width: String,

      fullscreen: Boolean,

      customClass: {
        type: String,
        default: ''
      },

      top: {
        type: String,
        default: '15vh'
      },
      beforeClose: Function,
      center: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        closed: false
      };
    },

    watch: {
      visible(val) {
        if (val) {
          this.closed = false;
          this.$emit('open');
          this.$el.addEventListener('scroll', this.updatePopper);
          this.$nextTick(() => {
            this.$refs.dialog.scrollTop = 0;
          });
          if (this.appendToBody) {
            document.body.appendChild(this.$el);
          }
        } else {
          this.$el.removeEventListener('scroll', this.updatePopper);
          if (!this.closed) this.$emit('close');
        }
      }
    },

    computed: {
      style() {
        let style = {};
        if (this.width) {
          style.width = this.width;
        }
        if (!this.fullscreen) {
          style.marginTop = this.top;
        }
        return style;
      }
    },

    methods: {
      getMigratingConfig() {
        return {
          props: {
            'size': 'size is removed.'
          },
          events: {
            selectionchange: 'selectionchange is renamed to selection-change.'
          }
        };
      },
      handleWrapperClick() {
        if (!this.closeOnClickModal) return;
        this.handleClose();
      },
      handleClose() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide);
        } else {
          this.hide();
        }
      },
      hide(cancel) {
        if (cancel !== false) {
          this.$emit('update:visible', false);
          this.$emit('close');
          this.closed = true;
        }
      },
      updatePopper() {
        this.broadcast('MzSelectDropdown', 'updatePopper');
        this.broadcast('MzDropdownMenu', 'updatePopper');
      }
    },

    mounted() {
      if (this.visible) {
        this.rendered = true;
        this.open();
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      }
    },

    destroyed() {
      // if appendToBody is true, remove DOM node after destroy
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };
</script>
<style lang="less">
.v-modal-enter {
  animation: v-modal-in .2s ease; }

.v-modal-leave {
  animation: v-modal-out .2s ease forwards; }

@keyframes v-modal-in {
  0% {
    opacity: 0; } }
@keyframes v-modal-out {
  100% {
    opacity: 0; } }
.v-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000; }

.mz-dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  width: 50%; }
  .mz-dialog.is-fullscreen {
    width: 100%;
    margin-top: 0;
    margin-bottom: 0;
    height: 100%;
    overflow: auto; }
  .mz-dialog__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0; }
  .mz-dialog__header {
    padding: 20px;
    padding-bottom: 10px; }
  .mz-dialog__headerbtn {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 16px; }
    .mz-dialog__headerbtn .mz-dialog__close {
      color: #909399; }
    .mz-dialog__headerbtn:focus .mz-dialog__close, .mz-dialog__headerbtn:hover .mz-dialog__close {
      color: #409EFF; }
  .mz-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: #303133; }
  .mz-dialog__body {
    padding: 30px 20px;
    color: #606266;
    line-height: 24px;
    font-size: 14px; }
  .mz-dialog__footer {
    padding: 20px;
    padding-top: 10px;
    text-align: right;
    box-sizing: border-box; }
  .mz-dialog--center {
    text-align: center; }
    .mz-dialog--center .mz-dialog__body {
      text-align: initial;
      padding: 25px 25px 30px; }
    .mz-dialog--center .mz-dialog__footer {
      text-align: inherit; }

.dialog-fade-enter-active {
  animation: dialog-fade-in .3s; }

.dialog-fade-leave-active {
  animation: dialog-fade-out .3s; }

@keyframes dialog-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0; }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1; } }
@keyframes dialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1; }
  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0; } }
</style>
