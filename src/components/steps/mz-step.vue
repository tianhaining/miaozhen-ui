<template>
  <div
    class="mz-step"
    :style="style"
    :class="[
      !isSimple && `is-${$parent.direction}`,
      isSimple && 'is-simple',
      isLast && !space && !isCenter && 'is-flex',
      isCenter && !isVertical && !isSimple && 'is-center'
     ]">
    <!-- icon & line -->
    <div
      class="mz-step__head"
      :class="`is-${currentStatus}`">
      <div
        class="mz-step__line"
        :style="isLast ? '' : { marginRight: $parent.stepOffset + 'px' }"
      >
        <i class="mz-step__line-inner" :style="lineStyle"></i>
      </div>

      <div class="mz-step__icon" :class="`is-${icon ? 'icon' : 'text'}`">
        <slot
          v-if="currentStatus !== 'success' && currentStatus !== 'error'"
          name="icon">
          <i v-if="icon" class="mz-step__icon-inner" :class="[icon]"></i>
          <div class="mz-step__icon-inner" v-if="!icon && !isSimple">{{ index + 1 }}</div>
        </slot>
        <i
          v-else
          :class="['mz-icon-' + (currentStatus === 'success' ? 'check' : 'close')]"
          class="mz-step__icon-inner is-status"
        >
        </i>
      </div>
    </div>
    <!-- title & description -->
    <div class="mz-step__main">
      <div
        class="mz-step__title"
        ref="title"
        :class="['is-' + currentStatus]">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="isSimple" class="mz-step__arrow"></div>
      <div
        v-else
        class="mz-step__description"
        :class="['is-' + currentStatus]">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MzStep',

  props: {
    title: String,
    icon: String,
    description: String,
    status: String
  },

  data() {
    return {
      index: -1,
      lineStyle: {},
      internalStatus: ''
    };
  },

  beforeCreate() {
    this.$parent.steps.push(this);
  },

  beforeDestroy() {
    const steps = this.$parent.steps;
    const index = steps.indexOf(this);
    if (index >= 0) {
      steps.splice(index, 1);
    }
  },

  computed: {
    currentStatus() {
      return this.status || this.internalStatus;
    },
    prevStatus() {
      const prevStep = this.$parent.steps[this.index - 1];
      return prevStep ? prevStep.currentStatus : 'wait';
    },
    isCenter() {
      return this.$parent.alignCenter;
    },
    isVertical() {
      return this.$parent.direction === 'vertical';
    },
    isSimple() {
      return this.$parent.simple;
    },
    isLast() {
      const parent = this.$parent;
      return parent.steps[parent.steps.length - 1] === this;
    },
    stepsCount() {
      return this.$parent.steps.length;
    },
    space() {
      const { isSimple, $parent: { space } } = this;
      return isSimple ? '' : space ;
    },
    style: function() {
      const style = {};
      const parent = this.$parent;
      const len = parent.steps.length;

      const space = (typeof this.space === 'number'
        ? this.space + 'px'
        : this.space
          ? this.space
          : 100 / (len - (this.isCenter ? 0 : 1)) + '%');
      style.flexBasis = space;
      if (this.isVertical) return style;
      if (this.isLast) {
        style.maxWidth = 100 / this.stepsCount + '%';
      } else {
        style.marginRight = -this.$parent.stepOffset + 'px';
      }

      return style;
    }
  },

  methods: {
    updateStatus(val) {
      const prevChild = this.$parent.$children[this.index - 1];

      if (val > this.index) {
        this.internalStatus = this.$parent.finishStatus;
      } else if (val === this.index && this.prevStatus !== 'error') {
        this.internalStatus = this.$parent.processStatus;
      } else {
        this.internalStatus = 'wait';
      }

      if (prevChild) prevChild.calcProgress(this.internalStatus);
    },

    calcProgress(status) {
      let step = 100;
      const style = {};

      style.transitionDelay = 150 * this.index + 'ms';
      if (status === this.$parent.processStatus) {
        step = this.currentStatus !== 'error' ? 0 : 0;
      } else if (status === 'wait') {
        step = 0;
        style.transitionDelay = (-150 * this.index) + 'ms';
      }

      style.borderWidth = step ? '1px' : 0;
      this.$parent.direction === 'vertical'
        ? style.height = step + '%'
        : style.width = step + '%';

      this.lineStyle = style;
    }
  },

  mounted() {
    const unwatch = this.$watch('index', val => {
      this.$watch('$parent.active', this.updateStatus, { immediate: true });
      unwatch();
    });
  }
};
</script>
<style lang="less">
.mz-step {
  position: relative;
  flex-shrink: 1; }
  .mz-step:last-of-type .mz-step__line {
    display: none; }
  .mz-step:last-of-type.is-flex {
    flex-basis: auto !important;
    flex-shrink: 0;
    flex-grow: 0; }
  .mz-step:last-of-type .mz-step__main, .mz-step:last-of-type .mz-step__description {
    padding-right: 0; }
  .mz-step__head {
    position: relative;
    width: 100%; }
    .mz-step__head.is-process {
      color: #303133;
      border-color: #303133; }
    .mz-step__head.is-wait {
      color: #c0c4cc;
      border-color: #c0c4cc; }
    .mz-step__head.is-success {
      color: #67c23a;
      border-color: #67c23a; }
    .mz-step__head.is-error {
      color: #f56c6c;
      border-color: #f56c6c; }
    .mz-step__head.is-finish {
      color: #eb3332;
      border-color: #eb3332; }
  .mz-step__icon {
    position: relative;
    z-index: 1;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    font-size: 14px;
    box-sizing: border-box;
    background: #fff;
    transition: .15s ease-out; }
    .mz-step__icon.is-text {
      border-radius: 50%;
      border: 2px solid;
      border-color: inherit; }
    .mz-step__icon.is-icon {
      width: 40px; }
  .mz-step__icon-inner {
    display: inline-block;
    user-select: none;
    text-align: center;
    font-weight: bold;
    line-height: 1;
    color: inherit; }
    .mz-step__icon-inner[class*=el-icon]:not(.is-status) {
      font-size: 25px;
      font-weight: normal; }
    .mz-step__icon-inner.is-status {
      transform: translateY(1px); }
  .mz-step__line {
    position: absolute;
    border-color: inherit;
    background-color: #c0c4cc; }
  .mz-step__line-inner {
    display: block;
    border-width: 1px;
    border-style: solid;
    border-color: inherit;
    transition: .15s ease-out;
    box-sizing: border-box;
    width: 0;
    height: 0; }
  .mz-step__main {
    white-space: normal;
    text-align: left; }
  .mz-step__title {
    font-size: 16px;
    line-height: 38px; }
    .mz-step__title.is-process {
      font-weight: bold;
      color: #303133; }
    .mz-step__title.is-wait {
      color: #c0c4cc; }
    .mz-step__title.is-success {
      color: #67c23a; }
    .mz-step__title.is-error {
      color: #f56c6c; }
    .mz-step__title.is-finish {
      color: #eb3332; }
  .mz-step__description {
    padding-right: 10%;
    margin-top: -5px;
    font-size: 12px;
    line-height: 20px;
    font-weight: normal; }
    .mz-step__description.is-process {
      color: #303133; }
    .mz-step__description.is-wait {
      color: #c0c4cc; }
    .mz-step__description.is-success {
      color: #67c23a; }
    .mz-step__description.is-error {
      color: #f56c6c; }
    .mz-step__description.is-finish {
      color: #eb3332; }
  .mz-step.is-horizontal {
    display: inline-block; }
    .mz-step.is-horizontal .mz-step__line {
      height: 2px;
      top: 11px;
      left: 0;
      right: 0; }
  .mz-step.is-vertical {
    display: flex; }
    .mz-step.is-vertical .mz-step__head {
      flex-grow: 0;
      width: 24px; }
    .mz-step.is-vertical .mz-step__main {
      padding-left: 10px;
      flex-grow: 1; }
    .mz-step.is-vertical .mz-step__title {
      line-height: 24px;
      padding-bottom: 8px; }
    .mz-step.is-vertical .mz-step__line {
      width: 2px;
      top: 0;
      bottom: 0;
      left: 11px; }
    .mz-step.is-vertical .mz-step__icon.is-icon {
      width: 24px; }
  .mz-step.is-center .mz-step__head {
    text-align: center; }
  .mz-step.is-center .mz-step__main {
    text-align: center; }
  .mz-step.is-center .mz-step__description {
    padding-left: 20%;
    padding-right: 20%; }
  .mz-step.is-center .mz-step__line {
    left: 50%;
    right: -50%; }
  .mz-step.is-simple {
    display: flex;
    align-items: center; }
    .mz-step.is-simple .mz-step__head {
      width: auto;
      font-size: 0;
      padding-right: 10px; }
    .mz-step.is-simple .mz-step__icon {
      background: transparent;
      width: 16px;
      height: 16px;
      font-size: 12px; }
    .mz-step.is-simple .mz-step__icon-inner[class*=el-icon]:not(.is-status) {
      font-size: 18px; }
    .mz-step.is-simple .mz-step__icon-inner.is-status {
      transform: scale(0.8) translateY(1px); }
    .mz-step.is-simple .mz-step__main {
      position: relative;
      display: flex;
      align-items: stretch;
      flex-grow: 1; }
    .mz-step.is-simple .mz-step__title {
      font-size: 16px;
      line-height: 20px; }
    .mz-step.is-simple:not(:last-of-type) .mz-step__title {
      max-width: 50%;
      word-break: break-all; }
    .mz-step.is-simple .mz-step__arrow {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center; }
      .mz-step.is-simple .mz-step__arrow::before, .mz-step.is-simple .mz-step__arrow::after {
        content: '';
        display: inline-block;
        position: absolute;
        height: 15px;
        width: 1px;
        background: #c0c4cc; }
      .mz-step.is-simple .mz-step__arrow::before {
        transform: rotate(-45deg) translateY(-4px);
        transform-origin: 0 0; }
      .mz-step.is-simple .mz-step__arrow::after {
        transform: rotate(45deg) translateY(4px);
        transform-origin: 100% 100%; }
    .mz-step.is-simple:last-of-type .mz-step__arrow {
      display: none; }
</style>
