<template>
  <mz-input
    class="mz-date-editor"
    :class="'mz-date-editor--' + type"
    :readonly="!editable || readonly"
    :disabled="disabled"
    :size="pickerSize"
    :id="id"
    :name="name"
    v-if="!ranged"
    v-clickoutside="handleClose"
    :placeholder="placeholder"
    @focus="handleFocus"
    @keydown.native="handleKeydown"
    :value="displayValue"
    @input="value => userInput = value"
    @mouseenter.native="handleMouseEnter"
    @mouseleave.native="showClose = false"
    @change.native="handleChange"
    :validateEvent="false"
    :prefix-icon="triggerClass"
    ref="reference">
    <i slot="suffix"
      class="mz-input__icon"
      @click="handleClickIcon"
      :class="{ 'mz-icon-circle-close': showClose }"
      v-if="haveTrigger">
    </i>
  </mz-input>
  <div
    class="mz-date-editor mz-range-editor mz-input__inner"
    :class="[
      'mz-date-editor--' + type,
      pickerSize ? `mz-range-editor--${ pickerSize }` : '',
      disabled ? 'is-disabled' : '',
      pickerVisible ? 'is-active' : ''
    ]"
    @click="handleRangeClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="showClose = false"
    @keydown="handleKeydown"
    ref="reference"
    v-clickoutside="handleClose"
    v-else>
    <i :class="['mz-input__icon', 'mz-range__icon', triggerClass]"></i>
    <input
      :placeholder="startPlaceholder"
      :value="displayValue && displayValue[0]"
      :disabled="disabled"
      :id="id && id[0]"
      :readonly="!editable || readonly"
      :name="name && name[0]"
      @input="handleStartInput"
      @change="handleStartChange"
      @focus="handleFocus"
      class="mz-range-input">
    <span class="mz-range-separator">{{ rangeSeparator }}</span>
    <input
      :placeholder="endPlaceholder"
      :value="displayValue && displayValue[1]"
      :disabled="disabled"
      :id="id && id[1]"
      :readonly="!editable || readonly"
      :name="name && name[1]"
      @input="handleEndInput"
      @change="handleEndChange"
      @focus="handleFocus"
      class="mz-range-input">
    <i
      @click="handleClickIcon"
      v-if="haveTrigger"
      :class="{ 'mz-icon-circle-close': showClose }"
      class="mz-input__icon mz-range__close-icon">
    </i>
  </div>
</template>

<script>
import Vue from 'vue';
import Clickoutside from '@/utils/clickoutside';
import { formatDate, parseDate, isDateObject, getWeekNumber } from './util';
import Popper from '@/utils/vue-popper';
import Emitter from '@/mixins/emitter';
import Focus from '@/mixins/focus';
import MzInput from '@/components/input/mz-input';
import merge from '@/utils/merge';

const NewPopper = {
  props: {
    appendToBody: Popper.props.appendToBody,
    offset: Popper.props.offset,
    boundariesPadding: Popper.props.boundariesPadding
  },
  methods: Popper.methods,
  data() {
    return merge({ visibleArrow: true }, Popper.data);
  },
  beforeDestroy: Popper.beforeDestroy
};

const DEFAULT_FORMATS = {
  date: 'yyyy-MM-dd',
  month: 'yyyy-MM',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  time: 'HH:mm:ss',
  week: 'yyyywWW',
  timerange: 'HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  datetimerange: 'yyyy-MM-dd HH:mm:ss',
  year: 'yyyy'
};
const HAVE_TRIGGER_TYPES = [
  'date',
  'datetime',
  'time',
  'time-select',
  'week',
  'month',
  'year',
  'daterange',
  'timerange',
  'datetimerange'
];
const DATE_FORMATTER = function(value, format) {
  return formatDate(value, format);
};
const DATE_PARSER = function(text, format) {
  return parseDate(text, format);
};
const RANGE_FORMATTER = function(value, format) {
  if (Array.isArray(value) && value.length === 2) {
    const start = value[0];
    const end = value[1];

    if (start && end) {
      return [formatDate(start, format), formatDate(end, format)];
    }
  }
  return '';
};
const RANGE_PARSER = function(array, format, separator) {
  if (!Array.isArray(array)) {
    array = array.split(separator);
  }
  if (array.length === 2) {
    const range1 = array[0];
    const range2 = array[1];

    return [parseDate(range1, format), parseDate(range2, format)];
  }
  return [];
};
const TYPE_VALUE_RESOLVER_MAP = {
  default: {
    formatter(value) {
      if (!value) return '';
      return '' + value;
    },
    parser(text) {
      if (text === undefined || text === '') return null;
      return text;
    }
  },
  week: {
    formatter(value, format) {
      let week = getWeekNumber(value);
      let month = value.getMonth();
      const trueDate = new Date(value);
      if (week === 1 && month === 11) {
        trueDate.setHours(0, 0, 0, 0);
        trueDate.setDate(trueDate.getDate() + 3 - (trueDate.getDay() + 6) % 7);
      }
      let date = formatDate(trueDate, format);

      date = /WW/.test(date)
            ? date.replace(/WW/, week < 10 ? '0' + week : week)
            : date.replace(/W/, week);
      return date;
    },
    parser(text) {
      const array = (text || '').split('w');
      if (array.length === 2) {
        const year = Number(array[0]);
        const month = Number(array[1]);

        if (!isNaN(year) && !isNaN(month) && month < 54) {
          return text;
        }
      }
      return null;
    }
  },
  date: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  datetime: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  daterange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  datetimerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  timerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  time: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  month: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  year: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  number: {
    formatter(value) {
      if (!value) return '';
      return '' + value;
    },
    parser(text) {
      let result = Number(text);

      if (!isNaN(text)) {
        return result;
      } else {
        return null;
      }
    }
  }
};
const PLACEMENT_MAP = {
  left: 'bottom-start',
  center: 'bottom',
  right: 'bottom-end'
};

const parseAsFormatAndType = (value, customFormat, type, rangeSeparator = '-') => {
  if (!value) return null;
  const parser = (
    TYPE_VALUE_RESOLVER_MAP[type] ||
    TYPE_VALUE_RESOLVER_MAP['default']
  ).parser;
  const format = customFormat || DEFAULT_FORMATS[type];
  return parser(value, format, rangeSeparator);
};

const formatAsFormatAndType = (value, customFormat, type) => {
  if (!value) return null;
  const formatter = (
    TYPE_VALUE_RESOLVER_MAP[type] ||
    TYPE_VALUE_RESOLVER_MAP['default']
  ).formatter;
  const format = customFormat || DEFAULT_FORMATS[type];
  return formatter(value, format);
};

// only considers date-picker's value: Date or [Date, Date]
const valueEquals = function(a, b) {
  const aIsArray = a instanceof Array;
  const bIsArray = b instanceof Array;
  if (aIsArray && bIsArray) {
    return new Date(a[0]).getTime() === new Date(b[0]).getTime() &&
           new Date(a[1]).getTime() === new Date(b[1]).getTime();
  }
  if (!aIsArray && !bIsArray) {
    return new Date(a).getTime() === new Date(b).getTime();
  }
  return false;
};

const isString = function(val) {
  return typeof val === 'string' || val instanceof String;
};

const validator = function(val) {
  // either: String, Array of String, null / undefined
  return (
    val === null ||
    val === undefined ||
    isString(val) ||
    (Array.isArray(val) && val.length === 2 && val.every(isString))
  );
};

export default {
  mixins: [Emitter, NewPopper, Focus('reference')],

  inject: {
    elFormItem: {
      default: ''
    }
  },

  props: {
    size: String,
    format: String,
    valueFormat: String,
    readonly: Boolean,
    placeholder: String,
    startPlaceholder: String,
    endPlaceholder: String,
    name: {
      default: '',
      validator
    },
    disabled: Boolean,
    clearable: {
      type: Boolean,
      default: true
    },
    id: {
      default: '',
      validator
    },
    popperClass: String,
    editable: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: 'left'
    },
    value: {},
    defaultValue: {},
    rangeSeparator: {
      default: '-'
    },
    pickerOptions: {},
    unlinkPanels: Boolean
  },

  components: { MzInput },

  directives: { Clickoutside },

  data() {
    return {
      pickerVisible: false,
      showClose: false,
      userInput: null,
      valueOnOpen: null,  // value when picker opens, used to determine whether to emit change
      unwatchPickerOptions: null
    };
  },

  watch: {
    pickerVisible(val) {
      if (this.readonly || this.disabled) return;
      if (val) {
        this.showPicker();
        this.valueOnOpen = this.value;
      } else {
        this.hidePicker();
        this.emitChange(this.value);
        // flush user input if it is parsable
        // this.displayValue here is not a typo, it merges text for both panels in range mode
        const parsedValue = this.parseString(this.displayValue);
        if (this.userInput && parsedValue && this.isValidValue(parsedValue)) {
          this.userInput = null;
        }
        this.dispatch('ElFormItem', 'mz.form.blur');
        this.$emit('blur', this);
        this.blur();
      }
    },
    parsedValue: {
      immediate: true,
      handler(val) {
        if (this.picker) {
          this.picker.value = val;
        }
      }
    },
    defaultValue(val) {
      // NOTE: should eventually move to jsx style picker + panel ?
      if (this.picker) {
        this.picker.defaultValue = val;
      }
    }
  },

  computed: {
    ranged() {
      return this.type.indexOf('range') > -1;
    },

    reference() {
      const reference = this.$refs.reference;
      return reference.$el || reference;
    },

    refInput() {
      if (this.reference) {
        return [].slice.call(this.reference.querySelectorAll('input'));
      }
      return [];
    },

    valueIsEmpty() {
      const val = this.value;
      if (Array.isArray(val)) {
        for (let i = 0, len = val.length; i < len; i++) {
          if (val[i]) {
            return false;
          }
        }
      } else {
        if (val) {
          return false;
        }
      }
      return true;
    },

    triggerClass() {
      return this.type.indexOf('time') !== -1 ? 'mz-icon-time' : 'mz-icon-date';
    },

    selectionMode() {
      if (this.type === 'week') {
        return 'week';
      } else if (this.type === 'month') {
        return 'month';
      } else if (this.type === 'year') {
        return 'year';
      }

      return 'day';
    },

    haveTrigger() {
      if (typeof this.showTrigger !== 'undefined') {
        return this.showTrigger;
      }
      return HAVE_TRIGGER_TYPES.indexOf(this.type) !== -1;
    },

    displayValue() {
      const formattedValue = formatAsFormatAndType(this.parsedValue, this.format, this.type, this.rangeSeparator);
      if (Array.isArray(this.userInput)) {
        return [
          this.userInput[0] || (formattedValue && formattedValue[0]) || '',
          this.userInput[1] || (formattedValue && formattedValue[1]) || ''
        ];
      } else {
        return this.userInput !== null ? this.userInput : formattedValue || '';
      }
    },

    parsedValue() {
      const isParsed = isDateObject(this.value) || (Array.isArray(this.value) && this.value.every(isDateObject));
      if (this.valueFormat && !isParsed) {
        return parseAsFormatAndType(this.value, this.valueFormat, this.type, this.rangeSeparator) || this.value;
      } else {
        return this.value;
      }
    },

    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },

    pickerSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    }
  },

  created() {
    // vue-popper
    this.popperOptions = {
      boundariesPadding: 0,
      gpuAcceleration: false
    };
    this.placement = PLACEMENT_MAP[this.align] || PLACEMENT_MAP.left;
  },

  methods: {
    blur() {
      this.refInput.forEach(input => input.blur());
    },

    // {parse, formatTo} Value deals maps component value with internal Date
    parseValue(value) {
      const isParsed = isDateObject(value) || (Array.isArray(value) && value.every(isDateObject));
      if (this.valueFormat && !isParsed) {
        return parseAsFormatAndType(value, this.valueFormat, this.type, this.rangeSeparator) || value;
      } else {
        return value;
      }
    },

    formatToValue(date) {
      const isFormattable = isDateObject(date) || (Array.isArray(date) && date.every(isDateObject));
      if (this.valueFormat && isFormattable) {
        return formatAsFormatAndType(date, this.valueFormat, this.type, this.rangeSeparator);
      } else {
        return date;
      }
    },

    // {parse, formatTo} String deals with user input
    parseString(value) {
      const type = Array.isArray(value) ? this.type : this.type.replace('range', '');
      return parseAsFormatAndType(value, this.format, type);
    },

    formatToString(value) {
      const type = Array.isArray(value) ? this.type : this.type.replace('range', '');
      return formatAsFormatAndType(value, this.format, type);
    },

    handleMouseEnter() {
      if (this.readonly || this.disabled) return;
      if (!this.valueIsEmpty && this.clearable) {
        this.showClose = true;
      }
    },

    handleChange() {
      if (this.userInput) {
        const value = this.parseString(this.displayValue);
        if (value) {
          this.picker.value = value;
          if (this.isValidValue(value)) {
            this.emitInput(value);
            this.userInput = null;
          }
        }
      }
    },

    handleStartInput(event) {
      if (this.userInput) {
        this.userInput = [event.target.value, this.userInput[1]];
      } else {
        this.userInput = [event.target.value, null];
      }
    },

    handleEndInput(event) {
      if (this.userInput) {
        this.userInput = [this.userInput[0], event.target.value];
      } else {
        this.userInput = [null, event.target.value];
      }
    },

    handleStartChange(event) {
      const value = this.parseString(this.userInput && this.userInput[0]);
      if (value) {
        this.userInput = [this.formatToString(value), this.displayValue[1]];
        const newValue = [value, this.picker.value && this.picker.value[1]];
        this.picker.value = newValue;
        if (this.isValidValue(newValue)) {
          this.emitInput(newValue);
          this.userInput = null;
        }
      }
    },

    handleEndChange(event) {
      const value = this.parseString(this.userInput && this.userInput[1]);
      if (value) {
        this.userInput = [this.displayValue[0], this.formatToString(value)];
        const newValue = [this.picker.value && this.picker.value[0], value];
        this.picker.value = newValue;
        if (this.isValidValue(newValue)) {
          this.emitInput(newValue);
          this.userInput = null;
        }
      }
    },

    handleClickIcon(event) {
      if (this.readonly || this.disabled) return;
      if (this.showClose) {
        event.stopPropagation();
        this.emitInput(null);
        this.emitChange(null);
        this.showClose = false;
        if (this.picker && typeof this.picker.handleClear === 'function') {
          this.picker.handleClear();
        }
      } else {
        this.pickerVisible = !this.pickerVisible;
      }
    },

    handleClose() {
      this.pickerVisible = false;
    },

    handleFocus() {
      const type = this.type;

      if (HAVE_TRIGGER_TYPES.indexOf(type) !== -1 && !this.pickerVisible) {
        this.pickerVisible = true;
      }
      this.$emit('focus', this);
    },

    handleKeydown(event) {
      const keyCode = event.keyCode;

      // ESC
      if (keyCode === 27) {
        this.pickerVisible = false;
        event.stopPropagation();
        return;
      }

      // Tab
      if (keyCode === 9) {
        if (!this.ranged) {
          this.handleChange();
          this.pickerVisible = this.picker.visible = false;
          this.blur();
          event.stopPropagation();
        } else {
          // user may change focus between two input
          setTimeout(() => {
            if (this.refInput.indexOf(document.activeElement) === -1) {
              this.pickerVisible = false;
              this.blur();
              event.stopPropagation();
            }
          }, 0);
        }
        return;
      }

      // Enter
      if (keyCode === 13 && this.displayValue) {
        const value = this.parseString(this.displayValue);
        if (this.isValidValue(value)) {
          this.handleChange();
          this.pickerVisible = this.picker.visible = false;
          this.blur();
        }
        event.stopPropagation();
        return;
      }

      // if user is typing, do not let picker handle key input
      if (this.userInput) {
        event.stopPropagation();
        return;
      }

      // delegate other keys to panel
      if (this.picker && this.picker.handleKeydown) {
        this.picker.handleKeydown(event);
      }
    },

    handleRangeClick() {
      const type = this.type;

      if (HAVE_TRIGGER_TYPES.indexOf(type) !== -1 && !this.pickerVisible) {
        this.pickerVisible = true;
      }
      this.$emit('focus', this);
    },

    hidePicker() {
      if (this.picker) {
        this.picker.resetView && this.picker.resetView();
        this.pickerVisible = this.picker.visible = false;
        this.destroyPopper();
      }
    },

    showPicker() {
      if (this.$isServer) return;
      if (!this.picker) {
        this.mountPicker();
      }
      this.pickerVisible = this.picker.visible = true;

      this.updatePopper();

      this.picker.value = this.parsedValue;
      this.picker.resetView && this.picker.resetView();

      this.$nextTick(() => {
        this.picker.adjustSpinners && this.picker.adjustSpinners();
      });
    },

    mountPicker() {
      this.picker = new Vue(this.panel).$mount();
      this.picker.defaultValue = this.defaultValue;
      this.picker.popperClass = this.popperClass;
      this.popperElm = this.picker.$el;
      this.picker.width = this.reference.getBoundingClientRect().width;
      this.picker.showTime = this.type === 'datetime' || this.type === 'datetimerange';
      this.picker.selectionMode = this.selectionMode;
      this.picker.unlinkPanels = this.unlinkPanels;
      this.picker.arrowControl = this.arrowControl || this.timeArrowControl || false;
      if (this.format) {
        this.picker.format = this.format;
      }

      const updateOptions = () => {
        const options = this.pickerOptions;

        if (options && options.selectableRange) {
          let ranges = options.selectableRange;
          const parser = TYPE_VALUE_RESOLVER_MAP.datetimerange.parser;
          const format = DEFAULT_FORMATS.timerange;

          ranges = Array.isArray(ranges) ? ranges : [ranges];
          this.picker.selectableRange = ranges.map(range => parser(range, format, this.rangeSeparator));
        }

        for (const option in options) {
          if (options.hasOwnProperty(option) &&
              // 忽略 time-picker 的该配置项
              option !== 'selectableRange') {
            this.picker[option] = options[option];
          }
        }
      };
      updateOptions();
      this.unwatchPickerOptions = this.$watch('pickerOptions', () => updateOptions(), { deep: true });

      this.$el.appendChild(this.picker.$el);
      this.picker.resetView && this.picker.resetView();

      this.picker.$on('dodestroy', this.doDestroy);
      this.picker.$on('pick', (date = '', visible = false) => {
        this.userInput = null;
        this.pickerVisible = this.picker.visible = visible;
        this.emitInput(date);
        this.picker.resetView && this.picker.resetView();
      });

      this.picker.$on('select-range', (start, end, pos) => {
        if (this.refInput.length === 0) return;
        if (!pos || pos === 'min') {
          this.refInput[0].setSelectionRange(start, end);
          this.refInput[0].focus();
        } else if (pos === 'max') {
          this.refInput[1].setSelectionRange(start, end);
          this.refInput[1].focus();
        }
      });
    },

    unmountPicker() {
      if (this.picker) {
        this.picker.$destroy();
        this.picker.$off();
        if (typeof this.unwatchPickerOptions === 'function') {
          this.unwatchPickerOptions();
        }
        this.picker.$el.parentNode.removeChild(this.picker.$el);
      }
    },

    emitChange(val) {
      // determine user real change only
      if (val !== this.valueOnOpen) {
        this.$emit('change', val);
        this.dispatch('MzFormItem', 'mz.form.change', val);
        this.valueOnOpen = val;
      }
    },

    emitInput(val) {
      const formatted = this.formatToValue(val);
      if (!valueEquals(this.value, formatted)) {
        this.$emit('input', formatted);
      }
    },

    isValidValue(value) {
      if (!this.picker) {
        this.mountPicker();
      }
      if (this.picker.isValidValue) {
        return value && this.picker.isValidValue(value);
      } else {
        return true;
      }
    }
  }
};
</script>
<style lang="less">
.mz-date-table {
  font-size: 12px;
  user-select: none; }
  .mz-date-table.is-week-mode .mz-date-table__row:hover div {
    background-color: #f2f6fc; }
  .mz-date-table.is-week-mode .mz-date-table__row:hover td.available:hover {
    color: #606266; }
  .mz-date-table.is-week-mode .mz-date-table__row:hover td:first-child div {
    margin-left: 5px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px; }
  .mz-date-table.is-week-mode .mz-date-table__row:hover td:last-child div {
    margin-right: 5px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px; }
  .mz-date-table.is-week-mode .mz-date-table__row.current div {
    background-color: #f2f6fc; }
  .mz-date-table td {
    width: 32px;
    height: 30px;
    padding: 4px 0;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    position: relative; }
    .mz-date-table td div {
      height: 30px;
      padding: 3px 0;
      box-sizing: border-box; }
    .mz-date-table td span {
      width: 24px;
      height: 24px;
      display: block;
      margin: 0 auto;
      line-height: 24px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50%; }
    .mz-date-table td.next-month, .mz-date-table td.prev-month {
      color: #c0c4cc; }
    .mz-date-table td.today {
      position: relative; }
      .mz-date-table td.today span {
        color: #eb3332; }
      .mz-date-table td.today.start-date span, .mz-date-table td.today.end-date span {
        color: #fff; }
    .mz-date-table td.available:hover {
      color: #eb3332; }
    .mz-date-table td.in-range div {
      background-color: #f2f6fc; }
      .mz-date-table td.in-range div:hover {
        background-color: #f2f6fc; }
    .mz-date-table td.current:not(.disabled) span {
      color: #fff;
      background-color: #eb3332; }
    .mz-date-table td.start-date div, .mz-date-table td.end-date div {
      color: #fff; }
    .mz-date-table td.start-date span, .mz-date-table td.end-date span {
      background-color: #eb3332; }
    .mz-date-table td.start-date div {
      margin-left: 5px;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px; }
    .mz-date-table td.end-date div {
      margin-right: 5px;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px; }
    .mz-date-table td.disabled div {
      background-color: #f5f7fa;
      opacity: 1;
      cursor: not-allowed;
      color: #c0c4cc; }
    .mz-date-table td.week {
      font-size: 80%;
      color: #606266; }
  .mz-date-table th {
    padding: 5px;
    color: #606266;
    font-weight: 400;
    border-bottom: solid 1px #ebeef5; }

.mz-month-table {
  font-size: 12px;
  margin: -1px;
  border-collapse: collapse; }
  .mz-month-table td {
    text-align: center;
    padding: 20px 3px;
    cursor: pointer; }
    .mz-month-table td.disabled .cell {
      background-color: #f5f7fa;
      cursor: not-allowed;
      color: #c0c4cc; }
      .mz-month-table td.disabled .cell:hover {
        color: #c0c4cc; }
    .mz-month-table td .cell {
      width: 48px;
      height: 32px;
      display: block;
      line-height: 32px;
      color: #606266;
      margin: 0 auto; }
      .mz-month-table td .cell:hover {
        color: #eb3332; }
    .mz-month-table td.current:not(.disabled) .cell {
      color: #eb3332; }

.mz-year-table {
  font-size: 12px;
  margin: -1px;
  border-collapse: collapse; }
  .mz-year-table .mz-icon {
    color: #303133; }
  .mz-year-table td {
    text-align: center;
    padding: 20px 3px;
    cursor: pointer; }
    .mz-year-table td.disabled .cell {
      background-color: #f5f7fa;
      cursor: not-allowed;
      color: #c0c4cc; }
      .mz-year-table td.disabled .cell:hover {
        color: #c0c4cc; }
    .mz-year-table td .cell {
      width: 48px;
      height: 32px;
      display: block;
      line-height: 32px;
      color: #606266;
      margin: 0 auto; }
      .mz-year-table td .cell:hover {
        color: #eb3332; }
    .mz-year-table td.current:not(.disabled) .cell {
      color: #eb3332; }

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


.mz-picker-panel {
  color: #606266;
  border: 1px solid #e4e7ed;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  border-radius: 4px;
  line-height: 30px;
  margin: 5px 0; }
  .mz-picker-panel__body::after, .mz-picker-panel__body-wrapper::after {
    content: "";
    display: table;
    clear: both; }
  .mz-picker-panel__content {
    position: relative;
    margin: 15px; }
  .mz-picker-panel__footer {
    border-top: 1px solid #e4e4e4;
    padding: 4px;
    text-align: right;
    background-color: #fff;
    position: relative;
    font-size: 0; }
  .mz-picker-panel__shortcut {
    display: block;
    width: 100%;
    border: 0;
    background-color: transparent;
    line-height: 28px;
    font-size: 14px;
    color: #606266;
    padding-left: 12px;
    text-align: left;
    outline: none;
    cursor: pointer; }
    .mz-picker-panel__shortcut:hover {
      color: #eb3332; }
    .mz-picker-panel__shortcut.active {
      background-color: #e6f1fe;
      color: #eb3332; }
  .mz-picker-panel__btn {
    border: 1px solid #dcdcdc;
    color: #333;
    line-height: 24px;
    border-radius: 2px;
    padding: 0 20px;
    cursor: pointer;
    background-color: transparent;
    outline: none;
    font-size: 12px; }
    .mz-picker-panel__btn[disabled] {
      color: #cccccc;
      cursor: not-allowed; }
  .mz-picker-panel__icon-btn {
    font-size: 12px;
    color: #303133;
    border: 0;
    background: transparent;
    cursor: pointer;
    outline: none;
    margin-top: 8px; }
    .mz-picker-panel__icon-btn:hover {
      color: #eb3332; }
    .mz-picker-panel__icon-btn.is-disabled {
      color: #bbb; }
      .mz-picker-panel__icon-btn.is-disabled:hover {
        cursor: not-allowed; }
  .mz-picker-panel__link-btn {
    vertical-align: middle; }
  .mz-picker-panel .popper__arrow {
    transform: translateX(-400%); }

.mz-picker-panel *[slot=sidebar],
.mz-picker-panel__sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 110px;
  border-right: 1px solid #e4e4e4;
  box-sizing: border-box;
  padding-top: 6px;
  background-color: #fff;
  overflow: auto; }

.mz-picker-panel *[slot=sidebar] + .mz-picker-panel__body,
.mz-picker-panel__sidebar + .mz-picker-panel__body {
  margin-left: 110px; }

.mz-date-picker {
  width: 322px; }
  .mz-date-picker.has-sidebar.has-time {
    width: 434px; }
  .mz-date-picker.has-sidebar {
    width: 438px; }
  .mz-date-picker.has-time .mz-picker-panel__body-wrapper {
    position: relative; }
  .mz-date-picker .mz-picker-panel__content {
    width: 292px; }
  .mz-date-picker table {
    table-layout: fixed;
    width: 100%; }
  .mz-date-picker__editor-wrap {
    position: relative;
    display: table-cell;
    padding: 0 5px; }
  .mz-date-picker__time-header {
    position: relative;
    border-bottom: 1px solid #e4e4e4;
    font-size: 12px;
    padding: 8px 5px 5px 5px;
    display: table;
    width: 100%;
    box-sizing: border-box; }
  .mz-date-picker__header {
    margin: 12px;
    text-align: center; }
    .mz-date-picker__header--bordered {
      margin-bottom: 0;
      padding-bottom: 12px;
      border-bottom: solid 1px #ebeef5; }
      .mz-date-picker__header--bordered + .mz-picker-panel__content {
        margin-top: 0; }
  .mz-date-picker__header-label {
    font-size: 16px;
    font-weight: 500;
    padding: 0 5px;
    line-height: 22px;
    text-align: center;
    cursor: pointer;
    color: #606266; }
    .mz-date-picker__header-label:hover {
      color: #eb3332; }
    .mz-date-picker__header-label.active {
      color: #eb3332; }
  .mz-date-picker__prev-btn {
    float: left; }
  .mz-date-picker__next-btn {
    float: right; }
  .mz-date-picker__time-wrap {
    padding: 10px;
    text-align: center; }
  .mz-date-picker__time-label {
    float: left;
    cursor: pointer;
    line-height: 30px;
    margin-left: 10px; }


.mz-date-range-picker {
  width: 646px; }
  .mz-date-range-picker.has-sidebar {
    width: 756px; }
  .mz-date-range-picker table {
    table-layout: fixed;
    width: 100%; }
  .mz-date-range-picker .mz-picker-panel__body {
    min-width: 513px; }
  .mz-date-range-picker .mz-picker-panel__content {
    margin: 0; }
  .mz-date-range-picker__header {
    position: relative;
    text-align: center;
    height: 28px; }
    .mz-date-range-picker__header [class*=arrow-left] {
      float: left; }
    .mz-date-range-picker__header [class*=arrow-right] {
      float: right; }
    .mz-date-range-picker__header div {
      font-size: 16px;
      font-weight: 500;
      margin-right: 50px; }
  .mz-date-range-picker__content {
    float: left;
    width: 50%;
    box-sizing: border-box;
    margin: 0;
    padding: 16px; }
    .mz-date-range-picker__content.is-left {
      border-right: 1px solid #e4e4e4; }
    .mz-date-range-picker__content.is-right .mz-date-range-picker__header div {
      margin-left: 50px;
      margin-right: 50px; }
  .mz-date-range-picker__editors-wrap {
    box-sizing: border-box;
    display: table-cell; }
    .mz-date-range-picker__editors-wrap.is-right {
      text-align: right; }
  .mz-date-range-picker__time-header {
    position: relative;
    border-bottom: 1px solid #e4e4e4;
    font-size: 12px;
    padding: 8px 5px 5px 5px;
    display: table;
    width: 100%;
    box-sizing: border-box; }
    .mz-date-range-picker__time-header > .mz-icon-arrow-right {
      font-size: 20px;
      vertical-align: middle;
      display: table-cell;
      color: #303133; }
  .mz-date-range-picker__time-picker-wrap {
    position: relative;
    display: table-cell;
    padding: 0 5px; }
    .mz-date-range-picker__time-picker-wrap .mz-picker-panel {
      position: absolute;
      top: 13px;
      right: 0;
      z-index: 1;
      background: #fff; }

.mz-time-range-picker {
  width: 354px;
  overflow: visible; }
  .mz-time-range-picker__content {
    position: relative;
    text-align: center;
    padding: 10px; }
  .mz-time-range-picker__cell {
    box-sizing: border-box;
    margin: 0;
    padding: 4px 7px 7px;
    width: 49%;
    display: inline-block; }
  .mz-time-range-picker__header {
    margin-bottom: 5px;
    text-align: center;
    font-size: 14px; }
  .mz-time-range-picker__body {
    border-radius: 2px;
    border: 1px solid #e4e7ed; }


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
</style>
