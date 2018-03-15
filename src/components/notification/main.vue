<template>
  <transition name="mz-notification-fade">
    <div
      :class="['mz-notification', customClass, horizontalClass]"
      v-show="visible"
      :style="positionStyle"
      @mouseenter="clearTimer()"
      @mouseleave="startTimer()"
      @click="click"
      role="alert"
    >
      <i
        class="mz-notification__icon"
        :class="[ typeClass, iconClass ]"
        v-if="type || iconClass">
      </i>
      <div class="mz-notification__group" :class="{ 'is-with-icon': typeClass || iconClass }">
        <h2 class="mz-notification__title" v-text="title"></h2>
        <div class="mz-notification__content" v-show="message">
          <slot>
            <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
            <p v-else v-html="message"></p>
          </slot>
        </div>
        <div
          class="mz-notification__closeBtn mz-icon-close"
          v-if="showClose"
          @click.stop="close"></div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  let typeMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error'
  };

  export default {
    data() {
      return {
        visible: false,
        title: '',
        message: '',
        duration: 4500,
        type: '',
        showClose: true,
        customClass: '',
        iconClass: '',
        onClose: null,
        onClick: null,
        closed: false,
        verticalOffset: 0,
        timer: null,
        dangerouslyUseHTMLString: false,
        position: 'top-right'
      };
    },

    computed: {
      typeClass() {
        return this.type && typeMap[this.type] ? `mz-icon-${ typeMap[this.type] }` : '';
      },

      horizontalClass() {
        return this.position.indexOf('right') > -1 ? 'right' : 'left';
      },

      verticalProperty() {
        return /^top-/.test(this.position) ? 'top' : 'bottom';
      },

      positionStyle() {
        return {
          [this.verticalProperty]: `${ this.verticalOffset }px`
        };
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

      click() {
        if (typeof this.onClick === 'function') {
          this.onClick();
        }
      },

      close() {
        this.closed = true;
        if (typeof this.onClose === 'function') {
          this.onClose();
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
        if (e.keyCode === 46 || e.keyCode === 8) {
          this.clearTimer(); // detele 取消倒计时
        } else if (e.keyCode === 27) { // esc关闭消息
          if (!this.closed) {
            this.close();
          }
        } else {
          this.startTimer(); // 恢复倒计时
        }
      }
    },
    mounted() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
      document.addEventListener('keydown', this.keydown);
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.keydown);
    }
  };
</script>
<style lang="less">
.mz-notification {
  display: flex;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  position: fixed;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: opacity .3s, transform .3s, left .3s, right .3s, top 0.4s, bottom .3s;
  overflow: hidden; }
  .mz-notification.right {
    right: 16px; }
  .mz-notification.left {
    left: 16px; }
  .mz-notification__group {
    margin-left: 13px; }
  .mz-notification__title {
    font-weight: bold;
    font-size: 16px;
    color: #303133;
    margin: 0; }
  .mz-notification__content {
    font-size: 14px;
    line-height: 21px;
    margin: 6px 0 0 0;
    color: #606266;
    text-align: justify; }
    .mz-notification__content p {
      margin: 0; }
  .mz-notification__icon {
    height: 24px;
    width: 24px;
    font-size: 24px; }
  .mz-notification__closeBtn {
    position: absolute;
    top: 18px;
    right: 15px;
    cursor: pointer;
    color: #909399;
    font-size: 16px; }
    .mz-notification__closeBtn:hover {
      color: #606266; }
  .mz-notification .mz-icon-success {
    color: #67c23a; }
  .mz-notification .mz-icon-error {
    color: #f56c6c; }
  .mz-notification .mz-icon-info {
    color: #909399; }
  .mz-notification .mz-icon-warning {
    color: #e6a23c; }

.mz-notification-fade-enter.right {
  right: 0;
  transform: translateX(100%); }
.mz-notification-fade-enter.left {
  left: 0;
  transform: translateX(-100%); }

.mz-notification-fade-leave-active {
  opacity: 0; }
</style>
