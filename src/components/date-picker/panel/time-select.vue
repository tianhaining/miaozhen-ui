<template>
  <transition name="mz-zoom-in-top" @before-enter="handleMenuEnter" @after-leave="$emit('dodestroy')">
    <div
      ref="popper"
      v-show="visible"
      :style="{ width: width + 'px' }"
      :class="popperClass"
      class="mz-picker-panel time-select mz-popper">
      <mz-scrollbar noresize wrap-class="mz-picker-panel__content">
        <div class="time-select-item"
          v-for="item in items"
          :class="{ selected: value === item.value, disabled: item.disabled, default: item.value === defaultValue }"
          :disabled="item.disabled"
          @click="handleClick(item)">{{ item.value }}</div>
      </mz-scrollbar>
    </div>
  </transition>
</template>

<script type="text/babel">
  import MzScrollbar from '@/components/scrollbar/main';
  import scrollIntoView from '@/utils/scroll-into-view';

  const parseTime = function(time) {
    const values = (time || '').split(':');
    if (values.length >= 2) {
      const hours = parseInt(values[0], 10);
      const minutes = parseInt(values[1], 10);

      return {
        hours,
        minutes
      };
    }
    /* istanbul ignore next */
    return null;
  };

  const compareTime = function(time1, time2) {
    const value1 = parseTime(time1);
    const value2 = parseTime(time2);

    const minutes1 = value1.minutes + value1.hours * 60;
    const minutes2 = value2.minutes + value2.hours * 60;

    if (minutes1 === minutes2) {
      return 0;
    }

    return minutes1 > minutes2 ? 1 : -1;
  };

  const formatTime = function(time) {
    return (time.hours < 10 ? '0' + time.hours : time.hours) + ':' + (time.minutes < 10 ? '0' + time.minutes : time.minutes);
  };

  const nextTime = function(time, step) {
    const timeValue = parseTime(time);
    const stepValue = parseTime(step);

    const next = {
      hours: timeValue.hours,
      minutes: timeValue.minutes
    };

    next.minutes += stepValue.minutes;
    next.hours += stepValue.hours;

    next.hours += Math.floor(next.minutes / 60);
    next.minutes = next.minutes % 60;

    return formatTime(next);
  };

  export default {
    components: { MzScrollbar },

    watch: {
      value(val) {
        if (!val) return;
        this.$nextTick(() => this.scrollToOption());
      }
    },

    methods: {
      handleClick(item) {
        if (!item.disabled) {
          this.$emit('pick', item.value);
        }
      },

      handleClear() {
        this.$emit('pick', null);
      },

      scrollToOption(selector = '.selected') {
        const menu = this.$refs.popper.querySelector('.mz-picker-panel__content');
        scrollIntoView(menu, menu.querySelector(selector));
      },

      handleMenuEnter() {
        const selected = this.items.map(item => item.value).indexOf(this.value) !== -1;
        const hasDefault = this.items.map(item => item.value).indexOf(this.defaultValue) !== -1;
        const option = (selected && '.selected') || (hasDefault && '.default') || '.time-select-item:not(.disabled)';
        this.$nextTick(() => this.scrollToOption(option));
      },

      scrollDown(step) {
        const items = this.items;
        const length = items.length;
        let total = items.length;
        let index = items.map(item => item.value).indexOf(this.value);
        while (total--) {
          index = (index + step + length) % length;
          if (!items[index].disabled) {
            this.$emit('pick', items[index].value, true);
            return;
          }
        }
      },

      isValidValue(date) {
        return this.items.filter(item => !item.disabled).map(item => item.value).indexOf(date) !== -1;
      },

      handleKeydown(event) {
        const keyCode = event.keyCode;
        if (keyCode === 38 || keyCode === 40) {
          const mapping = { 40: 1, 38: -1 };
          const offset = mapping[keyCode.toString()];
          this.scrollDown(offset);
          event.stopPropagation();
          return;
        }
      }
    },

    data() {
      return {
        popperClass: '',
        start: '09:00',
        end: '18:00',
        step: '00:30',
        value: '',
        defaultValue: '',
        visible: false,
        minTime: '',
        maxTime: '',
        width: 0
      };
    },

    computed: {
      items() {
        const start = this.start;
        const end = this.end;
        const step = this.step;

        const result = [];

        if (start && end && step) {
          let current = start;
          while (compareTime(current, end) <= 0) {
            result.push({
              value: current,
              disabled: compareTime(current, this.minTime || '-1:-1') <= 0 ||
                compareTime(current, this.maxTime || '100:100') >= 0
            });
            current = nextTime(current, step);
          }
        }

        return result;
      }
    }
  };
</script>
<style lang="less">
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

.time-select {
  margin: 5px 0;
  min-width: 0; }

.time-select .mz-picker-panel__content {
  max-height: 200px;
  margin: 0; }

.time-select-item {
  padding: 8px 10px;
  font-size: 14px;
  line-height: 20px; }

.time-select-item.selected:not(.disabled) {
  color: #eb3332;
  font-weight: bold; }

.time-select-item.disabled {
  color: #e4e7ed;
  cursor: not-allowed; }

.time-select-item:hover {
  background-color: #f5f7fa;
  font-weight: bold;
  cursor: pointer; }
</style>
