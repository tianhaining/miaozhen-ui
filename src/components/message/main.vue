<template>
  <transition name="mz-message-fade">
    <div
      :class="[
        'mz-message',
        type && !iconClass ? `mz-message--${ type }` : '',
        center ? 'is-center' : '',
        customClass]"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      role="alert"
    >
      <i :class="iconClass" v-if="iconClass"></i>
      <i :class="typeClass" v-else></i>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="mz-message__content">{{ message }}</p>
        <p v-else v-html="message" class="mz-message__content"></p>
      </slot>
      <i v-if="showClose" class="mz-message__closeBtn mz-icon-close" @click="close"></i>
    </div>
  </transition>
</template>

<script type="text/babel">
  const typeMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error'
  };

  export default {
    data() {
      return {
        visible: false,
        message: '',
        duration: 3000,
        type: 'info',
        iconClass: '',
        customClass: '',
        onClose: null,
        showClose: false,
        closed: false,
        timer: null,
        dangerouslyUseHTMLString: false,
        center: false
      };
    },

    computed: {
      iconWrapClass() {
        const classes = ['mz-message__icon'];
        if (this.type && !this.iconClass) {
          classes.push(`mz-message__icon--${ this.type }`);
        }
        return classes;
      },

      typeClass() {
        return this.type && !this.iconClass
          ? `mz-message__icon mz-icon-${ typeMap[this.type] }`
          : '';
      }
    },

    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false;
          this.$el.addEventListener('transitionend', this.destroyElement);
        }
      }
    },

    methods: {
      destroyElement() {
        this.$el.removeEventListener('transitionend', this.destroyElement);
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },

      close() {
        this.closed = true;
        if (typeof this.onClose === 'function') {
          this.onClose(this);
        }
      },

      clearTimer() {
        clearTimeout(this.timer);
      },

      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close();
            }
          }, this.duration);
        }
      },
      keydown(e) {
        if (e.keyCode === 27) { // esc关闭消息
          if (!this.closed) {
            this.close();
          }
        }
      }
    },
    mounted() {
      this.startTimer();
      document.addEventListener('keydown', this.keydown);
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.keydown);
    }
  };
</script>
<style lang="less">
.mz-message {
  min-width: 380px;
  box-sizing: border-box;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: #ebeef5;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  background-color: #edf2fc;
  transition: opacity 0.3s, transform .4s;
  overflow: hidden;
  padding: 15px 15px 15px 20px;
  display: flex;
  align-items: center; }
  .mz-message.is-center {
    justify-content: center; }
  .mz-message p {
    margin: 0; }
  .mz-message--info .mz-message__content {
    color: #909399; }
  .mz-message--success {
    background-color: #f0f9eb;
    border-color: #e1f3d8; }
    .mz-message--success .mz-message__content {
      color: #67c23a; }
  .mz-message--warning {
    background-color: #fdf6ec;
    border-color: #faecd8; }
    .mz-message--warning .mz-message__content {
      color: #e6a23c; }
  .mz-message--error {
    background-color: #fef0f0;
    border-color: #fde2e2; }
    .mz-message--error .mz-message__content {
      color: #f56c6c; }
  .mz-message__icon {
    margin-right: 10px; }
  .mz-message__content {
    padding: 0;
    font-size: 14px;
    line-height: 1; }
    .mz-message__content:focus {
      outline-width: 0; }
  .mz-message__closeBtn {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    cursor: pointer;
    color: #c0c4cc;
    font-size: 16px; }
    .mz-message__closeBtn:focus {
      outline-width: 0; }
    .mz-message__closeBtn:hover {
      color: #909399; }
  .mz-message .mz-icon-success {
    color: #67c23a; }
  .mz-message .mz-icon-error {
    color: #f56c6c; }
  .mz-message .mz-icon-info {
    color: #909399; }
  .mz-message .mz-icon-warning {
    color: #e6a23c; }

.mz-message-fade-enter,
.mz-message-fade-leave-active {
  opacity: 0;
  transform: translate(-50%, -100%); }
</style>
