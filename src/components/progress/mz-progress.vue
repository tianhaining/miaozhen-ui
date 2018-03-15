<template>
  <div
    class="mz-progress"
    :class="[
      'mz-progress--' + type,
      status ? 'is-' + status : '',
      {
        'mz-progress--without-text': !showText,
        'mz-progress--text-inside': textInside,
      }
    ]"
    role="progressbar"
    :aria-valuenow="percentage"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div class="mz-progress-bar" v-if="type === 'line'">
      <div class="mz-progress-bar__outer" :style="{height: strokeWidth + 'px'}">
        <div class="mz-progress-bar__inner" :style="barStyle">
          <div class="mz-progress-bar__innerText" v-if="showText && textInside">{{percentage}}%</div>
        </div>
      </div>
    </div>
    <div class="mz-progress-circle" :style="{height: width + 'px', width: width + 'px'}" v-else>
      <svg viewBox="0 0 100 100">
        <path class="mz-progress-circle__track" :d="trackPath" stroke="#e5e9f2" :stroke-width="relativeStrokeWidth" fill="none"></path>
        <path class="mz-progress-circle__path" :d="trackPath" stroke-linecap="round" :stroke="stroke" :stroke-width="relativeStrokeWidth" fill="none" :style="circlePathStyle"></path>
      </svg>
    </div>
    <div
      class="mz-progress__text"
      v-if="showText && !textInside"
      :style="{fontSize: progressTextSize + 'px'}"
    >
      <template v-if="!status">{{percentage}}%</template>
      <i v-else :class="iconClass"></i>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MzProgress',
    props: {
      type: {
        type: String,
        default: 'line',
        validator: val => ['line', 'circle'].indexOf(val) > -1
      },
      percentage: {
        type: Number,
        default: 0,
        required: true,
        validator: val => val >= 0 && val <= 100
      },
      status: {
        type: String
      },
      strokeWidth: {
        type: Number,
        default: 6
      },
      textInside: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 126
      },
      showText: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      barStyle() {
        var style = {};
        style.width = this.percentage + '%';
        return style;
      },
      relativeStrokeWidth() {
        return (this.strokeWidth / this.width * 100).toFixed(1);
      },
      trackPath() {
        var radius = parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);

        return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
      },
      perimeter() {
        var radius = 50 - parseFloat(this.relativeStrokeWidth) / 2;
        return 2 * Math.PI * radius;
      },
      circlePathStyle() {
        var perimeter = this.perimeter;
        return {
          strokeDasharray: `${perimeter}px,${perimeter}px`,
          strokeDashoffset: (1 - this.percentage / 100) * perimeter + 'px',
          transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
        };
      },
      stroke() {
        var ret;
        switch (this.status) {
          case 'success':
            ret = '#13ce66';
            break;
          case 'exception':
            ret = '#ff4949';
            break;
          default:
            ret = '#20a0ff';
        }
        return ret;
      },
      iconClass() {
        if (this.type === 'line') {
          return this.status === 'success' ? 'mz-icon-circle-check' : 'mz-icon-circle-cross';
        } else {
          return this.status === 'success' ? 'mz-icon-check' : 'mz-icon-close';
        }
      },
      progressTextSize() {
        return this.type === 'line'
          ? 12 + this.strokeWidth * 0.4
          : this.width * 0.111111 + 2 ;
      }
    }
  };
</script>
<style lang="less">
.mz-progress {
  position: relative;
  line-height: 1; }
  .mz-progress__text {
    font-size: 14px;
    color: #606266;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    line-height: 1; }
    .mz-progress__text i {
      vertical-align: middle;
      display: block; }
  .mz-progress--circle {
    display: inline-block; }
    .mz-progress--circle .mz-progress__text {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      text-align: center;
      margin: 0;
      transform: translate(0, -50%); }
      .mz-progress--circle .mz-progress__text i {
        vertical-align: middle;
        display: inline-block; }
  .mz-progress--without-text .mz-progress__text {
    display: none; }
  .mz-progress--without-text .mz-progress-bar {
    padding-right: 0;
    margin-right: 0;
    display: block; }
  .mz-progress--text-inside .mz-progress-bar {
    padding-right: 0;
    margin-right: 0; }
  .mz-progress.is-success .mz-progress-bar__inner {
    background-color: #67c23a; }
  .mz-progress.is-success .mz-progress__text {
    color: #67c23a; }
  .mz-progress.is-exception .mz-progress-bar__inner {
    background-color: #f56c6c; }
  .mz-progress.is-exception .mz-progress__text {
    color: #f56c6c; }

.mz-progress-bar {
  padding-right: 50px;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  margin-right: -55px;
  box-sizing: border-box; }
  .mz-progress-bar__outer {
    height: 6px;
    border-radius: 100px;
    background-color: #ebeef5;
    overflow: hidden;
    position: relative;
    vertical-align: middle; }
  .mz-progress-bar__inner {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #409EFF;
    text-align: right;
    border-radius: 100px;
    line-height: 1;
    white-space: nowrap; }
    .mz-progress-bar__inner::after {
      display: inline-block;
      content: "";
      height: 100%;
      vertical-align: middle; }
  .mz-progress-bar__innerText {
    display: inline-block;
    vertical-align: middle;
    color: #fff;
    font-size: 12px;
    margin: 0 5px; }

@keyframes progress {
  0% {
    background-position: 0 0; }
  100% {
    background-position: 32px 0; } }
</style>
