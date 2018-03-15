<template>
  <div
    v-show="ready"
    class="mz-carousel__item"
    :class="{
      'is-active': active,
      'mz-carousel__item--card': $parent.type === 'card',
      'is-in-stage': inStage,
      'is-hover': hover,
      'is-animating': animating
    }"
    @click="handleItemClick"
    :style="{
      msTransform: `translateX(${ translate }px) scale(${ scale })`,
      webkitTransform: `translateX(${ translate }px) scale(${ scale })`,
      transform: `translateX(${ translate }px) scale(${ scale })`
    }">
    <div
      v-if="$parent.type === 'card'"
      v-show="!active"
      class="mz-carousel__mask">
    </div>
    <slot></slot>
  </div>
</template>

<script>
  const CARD_SCALE = 0.83;
  export default {
    name: 'MzCarouselItem',

    props: {
      name: String,
      label: {
        type: [String, Number],
        default: ''
      }
    },

    data() {
      return {
        hover: false,
        translate: 0,
        scale: 1,
        active: false,
        ready: false,
        inStage: false,
        animating: false
      };
    },

    methods: {
      processIndex(index, activeIndex, length) {
        if (activeIndex === 0 && index === length - 1) {
          return -1;
        } else if (activeIndex === length - 1 && index === 0) {
          return length;
        } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
          return length + 1;
        } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
          return -2;
        }
        return index;
      },

      calculateTranslate(index, activeIndex, parentWidth) {
        if (this.inStage) {
          return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4;
        } else if (index < activeIndex) {
          return -(1 + CARD_SCALE) * parentWidth / 4;
        } else {
          return (3 + CARD_SCALE) * parentWidth / 4;
        }
      },

      translateItem(index, activeIndex, oldIndex) {
        const parentWidth = this.$parent.$el.offsetWidth;
        const length = this.$parent.items.length;
        if (this.$parent.type !== 'card' && oldIndex !== undefined) {
          this.animating = index === activeIndex || index === oldIndex;
        }
        if (index !== activeIndex && length > 2) {
          index = this.processIndex(index, activeIndex, length);
        }
        if (this.$parent.type === 'card') {
          this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
          this.active = index === activeIndex;
          this.translate = this.calculateTranslate(index, activeIndex, parentWidth);
          this.scale = this.active ? 1 : CARD_SCALE;
        } else {
          this.active = index === activeIndex;
          this.translate = parentWidth * (index - activeIndex);
        }
        this.ready = true;
      },

      handleItemClick() {
        const parent = this.$parent;
        if (parent && parent.type === 'card') {
          const index = parent.items.indexOf(this);
          parent.setActiveItem(index);
        }
      }
    },

    created() {
      this.$parent && this.$parent.updateItems();
    },

    destroyed() {
      this.$parent && this.$parent.updateItems();
    }
  };
</script>
<style lang="less">
.mz-carousel__item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: inline-block;
  overflow: hidden;
  z-index: 0; }
  .mz-carousel__item.is-active {
    z-index: 2; }
  .mz-carousel__item.is-animating {
    transition: transform .4s ease-in-out; }
  .mz-carousel__item--card {
    width: 50%;
    transition: transform .4s ease-in-out; }
    .mz-carousel__item--card.is-in-stage {
      cursor: pointer;
      z-index: 1; }
      .mz-carousel__item--card.is-in-stage:hover .mz-carousel__mask, .mz-carousel__item--card.is-in-stage.is-hover .mz-carousel__mask {
        opacity: 0.12; }
    .mz-carousel__item--card.is-active {
      z-index: 2; }
.mz-carousel__mask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  opacity: 0.24;
  transition: .2s; }
</style>
