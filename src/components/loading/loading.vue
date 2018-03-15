<template>
  <transition name="mz-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="mz-loading-mask"
      :style="{ backgroundColor: background || '' }"
      :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div class="mz-loading-spinner">
        <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none"/>
        </svg>
        <i v-else :class="spinner"></i>
        <p v-if="text" class="mz-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        text: null,
        spinner: null,
        background: null,
        fullscreen: true,
        visible: false,
        customClass: ''
      };
    },

    methods: {
      handleAfterLeave() {
        this.$emit('after-leave');
      },
      setText(text) {
        this.text = text;
      }
    }
  };
</script>
<style lang="less">
.mz-loading-parent--relative {
  position: relative !important; }
.mz-loading-parent--hidden {
  overflow: hidden !important; }

.mz-loading-mask {
  position: absolute;
  z-index: 2000;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s; }
  .mz-loading-mask.is-fullscreen {
    position: fixed; }
    .mz-loading-mask.is-fullscreen .mz-loading-spinner {
      margin-top: -25px; }
      .mz-loading-mask.is-fullscreen .mz-loading-spinner .circular {
        height: 50px;
        width: 50px; }

.mz-loading-spinner {
  top: 50%;
  margin-top: -21px;
  width: 100%;
  text-align: center;
  position: absolute; }
  .mz-loading-spinner .mz-loading-text {
    color: #409EFF;
    margin: 3px 0;
    font-size: 14px; }
  .mz-loading-spinner .circular {
    height: 42px;
    width: 42px;
    animation: loading-rotate 2s linear infinite; }
  .mz-loading-spinner .path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: #409EFF;
    stroke-linecap: round; }
  .mz-loading-spinner i {
    color: #409EFF; }

.mz-loading-fade-enter,
.mz-loading-fade-leave-active {
  opacity: 0; }

@keyframes loading-rotate {
  100% {
    transform: rotate(360deg); } }
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0; }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px; }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px; } }
</style>
