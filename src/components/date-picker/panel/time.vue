<template>
  <transition name="mz-zoom-in-top" @after-leave="$emit('dodestroy')">
    <div
      v-show="visible"
      class="mz-time-panel mz-popper"
      :class="popperClass">
      <div class="mz-time-panel__content" :class="{ 'has-seconds': showSeconds }">
        <time-spinner
          ref="spinner"
          @change="handleChange"
          :arrow-control="useArrow"
          :show-seconds="showSeconds"
          :am-pm-mode="amPmMode"
          @select-range="setSelectionRange"
          :date="date">
        </time-spinner>
      </div>
      <div class="mz-time-panel__footer">
        <button
          type="button"
          class="mz-time-panel__btn cancel"
          @click="handleCancel">{{ t('mz.datepicker.cancel') }}</button>
        <button
          type="button"
          class="mz-time-panel__btn"
          :class="{confirm: !disabled}"
          @click="handleConfirm()">{{ t('mz.datepicker.confirm') }}</button>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import { limitTimeRange, isDate, clearMilliseconds, timeWithinRange } from '../util';
  import Locale from '@/mixins/locale';
  import TimeSpinner from '../basic/time-spinner';

  export default {
    mixins: [Locale],

    components: {
      TimeSpinner
    },

    props: {
      visible: Boolean,
      timeArrowControl: Boolean
    },

    watch: {
      visible(val) {
        if (val) {
          this.oldValue = this.value;
          this.$nextTick(() => this.$refs.spinner.emitSelectRange('hours'));
        } else {
          this.needInitAdjust = true;
        }
      },

      value(newVal) {
        let date;
        if (newVal instanceof Date) {
          date = limitTimeRange(newVal, this.selectableRange, this.format);
        } else if (!newVal) {
          date = this.defaultValue ? new Date(this.defaultValue) : new Date();
        }

        this.date = date;
        if (this.visible && this.needInitAdjust) {
          this.$nextTick(_ => this.adjustSpinners());
          this.needInitAdjust = false;
        }
      },

      selectableRange(val) {
        this.$refs.spinner.selectableRange = val;
      },

      defaultValue(val) {
        if (!isDate(this.value)) {
          this.date = val ? new Date(val) : new Date();
        }
      }
    },

    data() {
      return {
        popperClass: '',
        format: 'HH:mm:ss',
        value: '',
        defaultValue: null,
        date: new Date(),
        oldValue: new Date(),
        selectableRange: [],
        selectionRange: [0, 2],
        disabled: false,
        arrowControl: false,
        needInitAdjust: true
      };
    },

    computed: {
      showSeconds() {
        return (this.format || '').indexOf('ss') !== -1;
      },
      useArrow() {
        return this.arrowControl || this.timeArrowControl || false;
      },
      amPmMode() {
        if ((this.format || '').indexOf('A') !== -1) return 'A';
        if ((this.format || '').indexOf('a') !== -1) return 'a';
        return '';
      }
    },

    methods: {
      handleCancel() {
        this.$emit('pick', this.oldValue, false);
      },

      handleChange(date) {
        // this.visible avoids edge cases, when use scrolls during panel closing animation
        if (this.visible) {
          this.date = clearMilliseconds(date);
          // if date is out of range, do not emit
          if (this.isValidValue(this.date)) {
            this.$emit('pick', this.date, true);
          }
        }
      },

      setSelectionRange(start, end) {
        this.$emit('select-range', start, end);
        this.selectionRange = [start, end];
      },

      handleConfirm(visible = false, first) {
        if (first) return;
        const date = clearMilliseconds(limitTimeRange(this.date, this.selectableRange, this.format));
        this.$emit('pick', date, visible, first);
      },

      handleKeydown(event) {
        const keyCode = event.keyCode;
        const mapping = { 38: -1, 40: 1, 37: -1, 39: 1 };

        // Left or Right
        if (keyCode === 37 || keyCode === 39) {
          const step = mapping[keyCode];
          this.changeSelectionRange(step);
          event.preventDefault();
          return;
        }

        // Up or Down
        if (keyCode === 38 || keyCode === 40) {
          const step = mapping[keyCode];
          this.$refs.spinner.scrollDown(step);
          event.preventDefault();
          return;
        }
      },

      isValidValue(date) {
        return timeWithinRange(date, this.selectableRange, this.format);
      },

      adjustSpinners() {
        return this.$refs.spinner.adjustSpinners();
      },

      changeSelectionRange(step) {
        const list = [0, 3].concat(this.showSeconds ? [6] : []);
        const mapping = ['hours', 'minutes'].concat(this.showSeconds ? ['seconds'] : []);
        const index = list.indexOf(this.selectionRange[0]);
        const next = (index + step + list.length) % list.length;
        this.$refs.spinner.emitSelectRange(mapping[next]);
      }
    },

    mounted() {
      this.$nextTick(() => this.handleConfirm(true, true));
      this.$emit('mounted');
    }
  };
</script>
<style lang="less">
.fade-in-linear-enter-active,
.fade-in-linear-leave-active {
  transition: opacity 200ms linear; }

.fade-in-linear-enter,
.fade-in-linear-leave,
.fade-in-linear-leave-active {
  opacity: 0; }

.mz-fade-in-linear-enter-active,
.mz-fade-in-linear-leave-active {
  transition: opacity 200ms linear; }

.mz-fade-in-linear-enter,
.mz-fade-in-linear-leave,
.mz-fade-in-linear-leave-active {
  opacity: 0; }

.mz-fade-in-enter-active,
.mz-fade-in-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1); }

.mz-fade-in-enter,
.mz-fade-in-leave-active {
  opacity: 0; }

.mz-zoom-in-center-enter-active,
.mz-zoom-in-center-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1); }

.mz-zoom-in-center-enter,
.mz-zoom-in-center-leave-active {
  opacity: 0;
  transform: scaleX(0); }

.mz-zoom-in-top-enter-active,
.mz-zoom-in-top-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms, opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;
  transform-origin: center top; }

.mz-zoom-in-top-enter,
.mz-zoom-in-top-leave-active {
  opacity: 0;
  transform: scaleY(0); }

.mz-zoom-in-bottom-enter-active,
.mz-zoom-in-bottom-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms, opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;
  transform-origin: center bottom; }

.mz-zoom-in-bottom-enter,
.mz-zoom-in-bottom-leave-active {
  opacity: 0;
  transform: scaleY(0); }

.mz-zoom-in-left-enter-active,
.mz-zoom-in-left-leave-active {
  opacity: 1;
  transform: scale(1, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms, opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;
  transform-origin: top left; }

.mz-zoom-in-left-enter,
.mz-zoom-in-left-leave-active {
  opacity: 0;
  transform: scale(0.45, 0.45); }

.collapse-transition {
  transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out; }

.horizontal-collapse-transition {
  transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out, 0.3s padding-right ease-in-out; }

.mz-list-enter-active,
.mz-list-leave-active {
  transition: all 1s; }

.mz-list-enter, .mz-list-leave-active {
  opacity: 0;
  transform: translateY(-30px); }

.mz-opacity-transition {
  transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1); }

.mz-date-editor {
  position: relative;
  display: inline-block;
  text-align: left; }
  .mz-date-editor.mz-input, .mz-date-editor.mz-input__inner {
    width: 220px; }
  .mz-date-editor--daterange.mz-input, .mz-date-editor--daterange.mz-input__inner, .mz-date-editor--timerange.mz-input, .mz-date-editor--timerange.mz-input__inner {
    width: 350px; }
  .mz-date-editor--datetimerange.mz-input, .mz-date-editor--datetimerange.mz-input__inner {
    width: 400px; }
  .mz-date-editor .mz-icon-circle-close {
    cursor: pointer; }
  .mz-date-editor .mz-range__icon {
    font-size: 14px;
    margin-left: -5px;
    color: #c0c4cc;
    float: left;
    line-height: 32px; }
  .mz-date-editor .mz-range-input {
    appearance: none;
    border: none;
    outline: none;
    display: inline-block;
    height: 100%;
    margin: 0;
    padding: 0;
    width: 39%;
    text-align: center;
    font-size: 14px;
    color: #606266; }
    .mz-date-editor .mz-range-input::placeholder {
      color: #c0c4cc; }
  .mz-date-editor .mz-range-separator {
    display: inline-block;
    height: 100%;
    padding: 0 5px;
    margin: 0;
    text-align: center;
    line-height: 32px;
    font-size: 14px;
    width: 5%;
    color: #303133; }
  .mz-date-editor .mz-range__close-icon {
    font-size: 14px;
    color: #c0c4cc;
    width: 25px;
    display: inline-block;
    float: right;
    line-height: 32px; }

.mz-range-editor.mz-input__inner {
  padding: 3px 10px; }
.mz-range-editor.is-active {
  border-color: #eb3332; }
  .mz-range-editor.is-active:hover {
    border-color: #eb3332; }
.mz-range-editor--medium.mz-input__inner {
  height: 36px; }
.mz-range-editor--medium .mz-range-separator {
  line-height: 28px;
  font-size: 14px; }
.mz-range-editor--medium .mz-range-input {
  font-size: 14px; }
.mz-range-editor--medium .mz-range__icon,
.mz-range-editor--medium .mz-range__close-icon {
  line-height: 28px; }
.mz-range-editor--small.mz-input__inner {
  height: 32px; }
.mz-range-editor--small .mz-range-separator {
  line-height: 24px;
  font-size: 13px; }
.mz-range-editor--small .mz-range-input {
  font-size: 13px; }
.mz-range-editor--small .mz-range__icon,
.mz-range-editor--small .mz-range__close-icon {
  line-height: 24px; }
.mz-range-editor--mini.mz-input__inner {
  height: 28px; }
.mz-range-editor--mini .mz-range-separator {
  line-height: 20px;
  font-size: 12px; }
.mz-range-editor--mini .mz-range-input {
  font-size: 12px; }
.mz-range-editor--mini .mz-range__icon,
.mz-range-editor--mini .mz-range__close-icon {
  line-height: 20px; }
.mz-range-editor.is-disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed; }
  .mz-range-editor.is-disabled:hover, .mz-range-editor.is-disabled:focus {
    border-color: #e4e7ed; }
  .mz-range-editor.is-disabled input {
    background-color: #f5f7fa;
    color: #c0c4cc;
    cursor: not-allowed; }
    .mz-range-editor.is-disabled input::placeholder {
      color: #c0c4cc; }
  .mz-range-editor.is-disabled .mz-range-separator {
    color: #c0c4cc; }

.mz-time-spinner.has-seconds .mz-time-spinner__wrapper {
  width: 32.3%; }
.mz-time-spinner.has-seconds .mz-time-spinner__wrapper:nth-child(2) {
  margin-left: 1%; }
.mz-time-spinner__wrapper {
  max-height: 190px;
  overflow: auto;
  display: inline-block;
  width: 50%;
  vertical-align: top;
  position: relative; }
  .mz-time-spinner__wrapper .mz-scrollbar__wrap:not(.mz-scrollbar__wrap--hidden-default) {
    padding-bottom: 15px; }
  .mz-time-spinner__wrapper.is-arrow {
    box-sizing: border-box;
    text-align: center;
    overflow: hidden; }
    .mz-time-spinner__wrapper.is-arrow .mz-time-spinner__list {
      transform: translateY(-32px); }
    .mz-time-spinner__wrapper.is-arrow .mz-time-spinner__item:hover:not(.disabled):not(.active) {
      background: #fff;
      cursor: default; }
.mz-time-spinner__arrow {
  font-size: 12px;
  color: #909399;
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 1;
  text-align: center;
  height: 30px;
  line-height: 30px;
  cursor: pointer; }
  .mz-time-spinner__arrow:hover {
    color: #eb3332; }
  .mz-time-spinner__arrow.mz-icon-arrow-up {
    top: 10px; }
  .mz-time-spinner__arrow.mz-icon-arrow-down {
    bottom: 10px; }
.mz-time-spinner__input.mz-input {
  width: 70%; }
  .mz-time-spinner__input.mz-input .mz-input__inner {
    padding: 0;
    text-align: center; }
.mz-time-spinner__list {
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center; }
  .mz-time-spinner__list::after, .mz-time-spinner__list::before {
    content: '';
    display: block;
    width: 100%;
    height: 80px; }
.mz-time-spinner__item {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  color: #606266; }
  .mz-time-spinner__item:hover:not(.disabled):not(.active) {
    background: #f5f7fa;
    cursor: pointer; }
  .mz-time-spinner__item.active:not(.disabled) {
    color: #303133;
    font-weight: bold; }
  .mz-time-spinner__item.disabled {
    color: #c0c4cc;
    cursor: not-allowed; }

.mz-time-panel {
  margin: 5px 0;
  border: solid 1px #e4e7ed;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  position: absolute;
  width: 180px;
  left: 0;
  z-index: 1000;
  user-select: none; }
  .mz-time-panel__content {
    font-size: 0;
    position: relative;
    overflow: hidden; }
    .mz-time-panel__content::after, .mz-time-panel__content::before {
      content: "";
      top: 50%;
      position: absolute;
      margin-top: -15px;
      height: 32px;
      z-index: -1;
      left: 0;
      right: 0;
      box-sizing: border-box;
      padding-top: 6px;
      text-align: left;
      border-top: 1px solid #e4e7ed;
      border-bottom: 1px solid #e4e7ed; }
    .mz-time-panel__content::after {
      left: 50%;
      margin-left: 12%;
      margin-right: 12%; }
    .mz-time-panel__content::before {
      padding-left: 50%;
      margin-right: 12%;
      margin-left: 12%; }
    .mz-time-panel__content.has-seconds::after {
      left: calc(100% / 3 * 2); }
    .mz-time-panel__content.has-seconds::before {
      padding-left: calc(100% / 3); }
  .mz-time-panel__footer {
    border-top: 1px solid #e4e4e4;
    padding: 4px;
    height: 36px;
    line-height: 25px;
    text-align: right;
    box-sizing: border-box; }
  .mz-time-panel__btn {
    border: none;
    line-height: 28px;
    padding: 0 5px;
    margin: 0 5px;
    cursor: pointer;
    background-color: transparent;
    outline: none;
    font-size: 12px;
    color: #303133; }
    .mz-time-panel__btn.confirm {
      font-weight: 800;
      color: #eb3332; }
  .mz-time-panel .popper__arrow {
    transform: translateX(-400%); }

    .mz-scrollbar {
      overflow: hidden;
      position: relative; }
      .mz-scrollbar:hover > .mz-scrollbar__bar, .mz-scrollbar:active > .mz-scrollbar__bar, .mz-scrollbar:focus > .mz-scrollbar__bar {
        opacity: 1;
        transition: opacity 340ms ease-out; }
      .mz-scrollbar__wrap {
        overflow: scroll;
        height: 100%; }
        .mz-scrollbar__wrap--hidden-default::-webkit-scrollbar {
          width: 0;
          height: 0; }
      .mz-scrollbar__thumb {
        position: relative;
        display: block;
        width: 0;
        height: 0;
        cursor: pointer;
        border-radius: inherit;
        background-color: rgba(144, 147, 153, 0.3);
        transition: .3s background-color; }
        .mz-scrollbar__thumb:hover {
          background-color: rgba(144, 147, 153, 0.5); }
      .mz-scrollbar__bar {
        position: absolute;
        right: 2px;
        bottom: 2px;
        z-index: 1;
        border-radius: 4px;
        opacity: 0;
        transition: opacity 120ms ease-out; }
        .mz-scrollbar__bar.is-vertical {
          width: 6px;
          top: 2px; }
          .mz-scrollbar__bar.is-vertical > div {
            width: 100%; }
        .mz-scrollbar__bar.is-horizontal {
          height: 6px;
          left: 2px; }
          .mz-scrollbar__bar.is-horizontal > div {
            height: 100%; }
</style>
