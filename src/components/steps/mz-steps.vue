<template>
  <div
    class="mz-steps"
    :class="[
       !simple && 'mz-steps--' + direction,
       simple && 'mz-steps--simple'
     ]">
      <slot></slot>
  </div>
</template>

<script>
import Migrating from '@/mixins/migrating';

export default {
  name: 'MzSteps',

  mixins: [Migrating],

  props: {
    space: [Number, String],
    active: Number,
    direction: {
      type: String,
      default: 'horizontal'
    },
    alignCenter: Boolean,
    simple: Boolean,
    finishStatus: {
      type: String,
      default: 'finish'
    },
    processStatus: {
      type: String,
      default: 'process'
    }
  },

  data() {
    return {
      steps: [],
      stepOffset: 0
    };
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          'center': 'center is removed.'
        },
        events: {//TODO 原来没有，这里加上
          selectionchange: 'selectionchange is renamed to selection-change.'
        }
      };
    }
  },

  watch: {
    active(newVal, oldVal) {
      this.$emit('change', newVal, oldVal);
    },

    steps(steps) {
      steps.forEach((child, index) => {
        child.index = index;
      });
    }
  }
};
</script>
<style lang="less">
.mz-steps {
  display: flex; }
  .mz-steps--simple {
    padding: 13px 8%;
    border-radius: 4px;
    background: #f5f7fa; }
  .mz-steps--horizontal {
    white-space: nowrap; }
  .mz-steps--vertical {
    height: 100%;
    flex-flow: column; }
</style>
