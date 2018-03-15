<template>
  <transition name="msgbox-fade">
    <div
      class="mz-message-box__wrapper"
      tabindex="-1"
      v-show="visible"
      @click.self="handleWrapperClick"
      role="dialog"
      aria-modal="true"
      :aria-label="title || 'dialog'"
    >
      <div class="mz-message-box" :class="[customClass, center && 'mz-message-box--center']">
        <div class="mz-message-box__header" v-if="title !== undefined">
          <div class="mz-message-box__title">
            <div class="mz-message-box__status" :class="[ typeClass ]" v-if="typeClass && center"></div>
            <span>{{ title }}</span>
          </div>
          <button type="button"
                  class="mz-message-box__headerbtn"
                  aria-label="Close"
                  v-if="showClose"
                  @click="handleAction('cancel')"
                  @keydown.enter="handleAction('cancel')"
          >
            <i class="mz-message-box__close mz-icon-close"></i>
          </button>
        </div>
        <div class="mz-message-box__content" v-if="message !== ''">
          <div class="mz-message-box__status" :class="[ typeClass ]" v-if="typeClass && !center"></div>
          <div class="mz-message-box__message">
            <slot>
              <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
              <p v-else v-html="message"></p>
            </slot>
          </div>
          <div class="mz-message-box__input" v-show="showInput">
            <mz-input
              v-model="inputValue"
              :type="inputType"
              @compositionstart.native="handleComposition"
              @compositionupdate.native="handleComposition"
              @compositionend.native="handleComposition"
              @keyup.enter.native="handleKeyup"
              :placeholder="inputPlaceholder"
              ref="input"></mz-input>
            <div class="mz-message-box__errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
        </div>
        <div class="mz-message-box__btns">
          <mz-button
            :loading="cancelButtonLoading"
            :class="[ cancelButtonClasses ]"
            v-show="showCancelButton"
            :round="roundButton"
            size="small"
            type="secondary"
            @click.native="handleAction('cancel')"
            @keydown.enter="handleAction('cancel')"
          >
            {{ cancelButtonText || t('mz.messagebox.cancel') }}
          </mz-button>
          <mz-button
            :loading="confirmButtonLoading"
            ref="confirm"
            :class="[ confirmButtonClasses ]"
            v-show="showConfirmButton"
            :round="roundButton"
            size="small"
            @click.native="handleAction('confirm')"
            @keydown.enter="handleAction('confirm')"
          >
            {{ confirmButtonText || t('mz.messagebox.confirm') }}
          </mz-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import Popup from '@/utils/popup';
  import Locale from '@/mixins/locale';
  import MzInput from '@/components/input/mz-input';
  import MzButton from '@/components/button/mz-button';
  import { addClass, removeClass } from '@/utils/dom';
  import { t } from '@/locale';
  import Dialog from '@/utils/aria-dialog';

  let messageBox;
  let typeMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error'
  };

  export default {
    mixins: [Popup, Locale],

    props: {
      modal: {
        default: true
      },
      lockScroll: {
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      },
      closeOnHashChange: {
        default: true
      },
      center: {
        default: false,
        type: Boolean
      },
      roundButton: {
        default: false,
        type: Boolean
      }
    },

    components: {
      MzInput,
      MzButton
    },

    computed: {
      typeClass() {
        return this.type && typeMap[this.type] ? `mz-icon-${ typeMap[this.type] }` : '';
      },

      confirmButtonClasses() {
        return `mz-button--primary ${ this.confirmButtonClass }`;
      },
      cancelButtonClasses() {
        return `${ this.cancelButtonClass }`;
      }
    },

    methods: {
      handleComposition(event) {
        if (event.type === 'compositionend') {
          setTimeout(() => {
            this.isOnComposition = false;
          }, 100);
        } else {
          this.isOnComposition = true;
        }
      },
      handleKeyup() {
        !this.isOnComposition && this.handleAction('confirm');
      },
      getSafeClose() {
        const currentId = this.uid;
        return () => {
          this.$nextTick(() => {
            if (currentId === this.uid) this.doClose();
          });
        };
      },
      doClose() {
        if (!this.visible) return;
        this.visible = false;
        this._closing = true;

        this.onClose && this.onClose();
        messageBox.closeDialog(); // 解绑
        if (this.lockScroll) {
          setTimeout(() => {
            if (this.modal && this.bodyOverflow !== 'hidden') {
              document.body.style.overflow = this.bodyOverflow;
              document.body.style.paddingRight = this.bodyPaddingRight;
            }
            this.bodyOverflow = null;
            this.bodyPaddingRight = null;
          }, 200);
        }
        this.opened = false;

        if (!this.transition) {
          this.doAfterClose();
        }
        setTimeout(() => {
          if (this.action) this.callback(this.action, this);
        });
      },

      handleWrapperClick() {
        if (this.closeOnClickModal) {
          this.handleAction('cancel');
        }
      },

      handleAction(action) {
        if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
          return;
        }
        this.action = action;
        if (typeof this.beforeClose === 'function') {
          this.close = this.getSafeClose();
          this.beforeClose(action, this, this.close);
        } else {
          this.doClose();
        }
      },

      validate() {
        if (this.$type === 'prompt') {
          var inputPattern = this.inputPattern;
          if (inputPattern && !inputPattern.test(this.inputValue || '')) {
            this.editorErrorMessage = this.inputErrorMessage || t('mz.messagebox.error');
            addClass(this.getInputElement(), 'invalid');
            return false;
          }
          var inputValidator = this.inputValidator;
          if (typeof inputValidator === 'function') {
            var validateResult = inputValidator(this.inputValue);
            if (validateResult === false) {
              this.editorErrorMessage = this.inputErrorMessage || t('mz.messagebox.error');
              addClass(this.getInputElement(), 'invalid');
              return false;
            }
            if (typeof validateResult === 'string') {
              this.editorErrorMessage = validateResult;
              return false;
            }
          }
        }
        this.editorErrorMessage = '';
        removeClass(this.getInputElement(), 'invalid');
        return true;
      },
      getFistFocus() {
        const $btns = this.$el.querySelector('.mz-message-box__btns .mz-button');
        const $title = this.$el.querySelector('.mz-message-box__btns .mz-message-box__title');
        return $btns && $btns[0] || $title;
      },
      getInputElement() {
        const inputRefs = this.$refs.input.$refs;
        return inputRefs.input || inputRefs.textarea;
      }
    },

    watch: {
      inputValue: {
        immediate: true,
        handler(val) {
          this.$nextTick(_ => {
            if (this.$type === 'prompt' && val !== null) {
              this.validate();
            }
          });
        }
      },

      visible(val) {
        if (val) {
          this.uid++;
          if (this.$type === 'alert' || this.$type === 'confirm') {
            this.$nextTick(() => {
              this.$refs.confirm.$el.focus();
            });
          }
          this.focusAfterClosed = document.activeElement;
          messageBox = new Dialog(this.$el, this.focusAfterClosed, this.getFistFocus());
        }

        // prompt
        if (this.$type !== 'prompt') return;
        if (val) {
          setTimeout(() => {
            if (this.$refs.input && this.$refs.input.$el) {
              this.getInputElement().focus();
            }
          }, 500);
        } else {
          this.editorErrorMessage = '';
          removeClass(this.getInputElement(), 'invalid');
        }
      }
    },

    mounted() {
      if (this.closeOnHashChange) {
        window.addEventListener('hashchange', this.close);
      }
    },

    beforeDestroy() {
      if (this.closeOnHashChange) {
        window.removeEventListener('hashchange', this.close);
      }
      setTimeout(() => {
        messageBox.closeDialog();
      });
    },

    data() {
      return {
        uid: 1,
        title: undefined,
        message: '',
        type: '',
        customClass: '',
        showInput: false,
        inputValue: null,
        inputPlaceholder: '',
        inputType: 'text',
        inputPattern: null,
        inputValidator: null,
        inputErrorMessage: '',
        showConfirmButton: true,
        showCancelButton: false,
        action: '',
        confirmButtonText: '',
        cancelButtonText: '',
        confirmButtonLoading: false,
        cancelButtonLoading: false,
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',
        editorErrorMessage: null,
        callback: null,
        dangerouslyUseHTMLString: false,
        focusAfterClosed: null,
        isOnComposition: false
      };
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


.mz-message-box {
  display: inline-block;
  width: 420px;
  padding-bottom: 10px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: hidden;
  backface-visibility: hidden; }
  .mz-message-box__wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center; }
    .mz-message-box__wrapper::after {
      content: "";
      display: inline-block;
      height: 100%;
      width: 0;
      vertical-align: middle; }
  .mz-message-box__header {
    position: relative;
    padding: 15px;
    padding-bottom: 10px; }
  .mz-message-box__title {
    padding-left: 0;
    margin-bottom: 0;
    font-size: 18px;
    line-height: 1;
    color: #303133; }
  .mz-message-box__headerbtn {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    cursor: pointer; }
    .mz-message-box__headerbtn .mz-message-box__close {
      color: #909399; }
    .mz-message-box__headerbtn:focus .mz-message-box__close, .mz-message-box__headerbtn:hover .mz-message-box__close {
      color: #409EFF; }
  .mz-message-box__content {
    position: relative;
    padding: 10px 15px;
    color: #606266;
    font-size: 14px; }
  .mz-message-box__input {
    padding-top: 15px; }
    .mz-message-box__input input.invalid {
      border-color: #f56c6c; }
      .mz-message-box__input input.invalid:focus {
        border-color: #f56c6c; }
  .mz-message-box__status {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px !important; }
    .mz-message-box__status::before {
      padding-left: 1px; }
    .mz-message-box__status + .mz-message-box__message {
      padding-left: 36px;
      padding-right: 12px; }
    .mz-message-box__status.mz-icon-success {
      color: #67c23a; }
    .mz-message-box__status.mz-icon-info {
      color: #909399; }
    .mz-message-box__status.mz-icon-warning {
      color: #e6a23c; }
    .mz-message-box__status.mz-icon-error {
      color: #f56c6c; }
  .mz-message-box__message {
    margin: 0; }
    .mz-message-box__message p {
      margin: 0;
      line-height: 24px; }
  .mz-message-box__errormsg {
    color: #f56c6c;
    font-size: 12px;
    min-height: 18px;
    margin-top: 2px; }
  .mz-message-box__btns {
    padding: 5px 15px 0;
    text-align: right; }
    .mz-message-box__btns button:nth-child(2) {
      margin-left: 10px; }
  .mz-message-box__btns-reverse {
    flex-direction: row-reverse; }
  .mz-message-box--center {
    padding-bottom: 30px; }
    .mz-message-box--center .mz-message-box__header {
      padding-top: 30px; }
    .mz-message-box--center .mz-message-box__title {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center; }
    .mz-message-box--center .mz-message-box__status {
      position: relative;
      top: auto;
      padding-right: 5px;
      text-align: center;
      transform: translateY(-1px); }
    .mz-message-box--center .mz-message-box__message {
      margin-left: 0; }
    .mz-message-box--center .mz-message-box__btns, .mz-message-box--center .mz-message-box__content {
      text-align: center; }
    .mz-message-box--center .mz-message-box__content {
      padding-left: 27px;
      padding-right: 27px; }

.msgbox-fade-enter-active {
  animation: msgbox-fade-in .3s; }

.msgbox-fade-leave-active {
  animation: msgbox-fade-out .3s; }

@keyframes msgbox-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0; }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1; } }
@keyframes msgbox-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1; }
  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0; } }
</style>
