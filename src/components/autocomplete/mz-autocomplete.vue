<template>
  <div
    class="mz-autocomplete"
    v-clickoutside="close"
    aria-haspopup="listbox"
    role="combobox"
    :aria-expanded="suggestionVisible"
    :aria-owns="id"
  >
    <mz-input
      ref="input"
      v-bind="$props"
      @compositionstart.native="handleComposition"
      @compositionupdate.native="handleComposition"
      @compositionend.native="handleComposition"
      @input="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.up.native.prevent="highlight(highlightedIndex - 1)"
      @keydown.down.native.prevent="highlight(highlightedIndex + 1)"
      @keydown.enter.native="handleKeyEnter"
      @keydown.native.tab="close"
      :label="label"
    >
      <template slot="prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </template>
      <template slot="append" v-if="$slots.append">
        <slot name="append"></slot>
      </template>
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix" v-if="$slots.suffix">
        <slot name="suffix"></slot>
      </template>
    </mz-input>
    <mz-autocomplete-suggestions
      visible-arrow
      :class="[popperClass ? popperClass : '']"
      ref="suggestions"
      placement="bottom-start"
      :id="id">
      <li
        v-for="(item, index) in suggestions"
        :key="index"
        :class="{'highlighted': highlightedIndex === index}"
        @click="select(item)"
        :id="`${id}-item-${index}`"
        role="option"
        :aria-selected="highlightedIndex === index"
      >
        <slot :item="item">
          {{ item[valueKey] }}
        </slot>
      </li>
    </mz-autocomplete-suggestions>
  </div>
</template>
<script>
//处理密集调用的函数，debounce是在多少毫秒内不再被触发的时候，就会执行一次，如果不停的调用的话，他们实际上最后只执行一次。
  import debounce from 'throttle-debounce/debounce';
  import MzInput from '@/components/input/mz-input';
  import Clickoutside from '@/utils/clickoutside';
  import MzAutocompleteSuggestions from './mz-autocomplete-suggestions.vue';
  import Emitter from '@/mixins/emitter';
  import Migrating from '@/mixins/migrating';
  import { generateId } from '@/utils/util';
  import Focus from '@/mixins/focus';

  export default {
    name: 'MzAutocomplete',

    mixins: [Emitter, Focus('input'), Migrating],

    componentName: 'MzAutocomplete',

    components: {
      MzInput,
      MzAutocompleteSuggestions
    },

    directives: { Clickoutside },

    props: {
      valueKey: {
        type: String,
        default: 'value'
      },
      popperClass: String,
      placeholder: String,
      disabled: Boolean,
      name: String,
      size: String,
      value: String,
      maxlength: Number,
      minlength: Number,
      autofocus: Boolean,
      fetchSuggestions: Function,
      triggerOnFocus: {
        type: Boolean,
        default: true
      },
      customItem: String,
      selectWhenUnmatched: {
        type: Boolean,
        default: false
      },
      prefixIcon: String,
      suffixIcon: String,
      label: String,
      debounce: {
        type: Number,
        default: 300
      }
    },
    data() {
      return {
        activated: false,
        isOnComposition: false,
        suggestions: [],
        loading: false,
        highlightedIndex: -1
      };
    },
    computed: {
      suggestionVisible() {
        const suggestions = this.suggestions;
        let isValidData = Array.isArray(suggestions) && suggestions.length > 0;
        return (isValidData || this.loading) && this.activated;
      },
      id() {
        return `mz-autocomplete-${generateId()}`;
      }
    },
    watch: {
      suggestionVisible(val) {
        this.broadcast('MzAutocompleteSuggestions', 'visible', [val, this.$refs.input.$refs.input.offsetWidth]);
      }
    },
    methods: {
      getMigratingConfig() {
        return {
          props: {
            'custom-item': 'custom-item is removed, use scoped slot instead.',
            'props': 'props is removed, use value-key instead.'
          }
        };
      },
      getData(queryString) {
        this.loading = true;
        this.fetchSuggestions(queryString, (suggestions) => {
          this.loading = false;
          if (Array.isArray(suggestions)) {
            this.suggestions = suggestions;
          } else {
            console.error('autocomplete suggestions must be an array');
          }
        });
      },
      handleComposition(event) {
        if (event.type === 'compositionend') {
          this.isOnComposition = false;
          this.handleChange(event.target.value);
        } else {
          this.isOnComposition = true;
        }
      },
      handleChange(value) {
        this.$emit('input', value);
        if (this.isOnComposition || (!this.triggerOnFocus && !value)) {
          this.suggestions = [];
          return;
        }
        this.debouncedGetData(value);
      },
      handleFocus(event) {
        this.activated = true;
        this.$emit('focus', event);
        if (this.triggerOnFocus) {
          this.debouncedGetData(this.value);
        }
      },
      handleBlur(event) {
        this.$emit('blur', event);
      },
      close(e) {
        this.activated = false;
      },
      handleKeyEnter(e) {
        if (this.suggestionVisible && this.highlightedIndex >= 0 && this.highlightedIndex < this.suggestions.length) {
          e.preventDefault();
          this.select(this.suggestions[this.highlightedIndex]);
        } else if (this.selectWhenUnmatched) {
          this.$emit('select', {value: this.value});
          this.$nextTick(_ => {
            this.suggestions = [];
            this.highlightedIndex = -1;
          });
        }
      },
      select(item) {
        this.$emit('input', item[this.valueKey]);
        this.$emit('select', item);
        this.$nextTick(_ => {
          this.suggestions = [];
          this.highlightedIndex = -1;
        });
      },
      highlight(index) {
        if (!this.suggestionVisible || this.loading) { return; }
        if (index < 0) {
          this.highlightedIndex = -1;
          return;
        }
        if (index >= this.suggestions.length) {
          index = this.suggestions.length - 1;
        }
        const suggestion = this.$refs.suggestions.$el.querySelector('.mz-autocomplete-suggestion__wrap');
        const suggestionList = suggestion.querySelectorAll('.mz-autocomplete-suggestion__list li');

        let highlightItem = suggestionList[index];
        let scrollTop = suggestion.scrollTop;
        let offsetTop = highlightItem.offsetTop;

        if (offsetTop + highlightItem.scrollHeight > (scrollTop + suggestion.clientHeight)) {
          suggestion.scrollTop += highlightItem.scrollHeight;
        }
        if (offsetTop < scrollTop) {
          suggestion.scrollTop -= highlightItem.scrollHeight;
        }
        this.highlightedIndex = index;
        this.$el.querySelector('.mz-input__inner').setAttribute('aria-activedescendant', `${this.id}-item-${this.highlightedIndex}`);
      }
    },
    mounted() {
      this.debouncedGetData = debounce(this.debounce, (val) => {
        this.getData(val);
      });
      this.$on('item-click', item => {
        this.select(item);
      });
      let $input = this.$el.querySelector('.mz-input__inner');
      $input.setAttribute('role', 'textbox');
      $input.setAttribute('aria-autocomplete', 'list');
      $input.setAttribute('aria-controls', 'id');
      $input.setAttribute('aria-activedescendant', `${this.id}-item-${this.highlightedIndex}`);
    },
    beforeDestroy() {
      this.$refs.suggestions.$destroy();
    }
  };
</script>
<style lang="less">
.el-scrollbar {
  overflow: hidden;
  position: relative; }
  .el-scrollbar:hover > .el-scrollbar__bar, .el-scrollbar:active > .el-scrollbar__bar, .el-scrollbar:focus > .el-scrollbar__bar {
    opacity: 1;
    transition: opacity 340ms ease-out; }
  .el-scrollbar__wrap {
    overflow: scroll;
    height: 100%; }
    .el-scrollbar__wrap--hidden-default::-webkit-scrollbar {
      width: 0;
      height: 0; }
  .el-scrollbar__thumb {
    position: relative;
    display: block;
    width: 0;
    height: 0;
    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(144, 147, 153, 0.3);
    transition: .3s background-color; }
    .el-scrollbar__thumb:hover {
      background-color: rgba(144, 147, 153, 0.5); }
  .el-scrollbar__bar {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 120ms ease-out; }
    .el-scrollbar__bar.is-vertical {
      width: 6px;
      top: 2px; }
      .el-scrollbar__bar.is-vertical > div {
        width: 100%; }
    .el-scrollbar__bar.is-horizontal {
      height: 6px;
      left: 2px; }
      .el-scrollbar__bar.is-horizontal > div {
        height: 100%; }


        .el-popper .popper__arrow,
        .el-popper .popper__arrow::after {
          position: absolute;
          display: block;
          width: 0;
          height: 0;
          border-color: transparent;
          border-style: solid; }
        .el-popper .popper__arrow {
          border-width: 6px;
          filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03)); }
        .el-popper .popper__arrow::after {
          content: " ";
          border-width: 6px; }
        .el-popper[x-placement^="top"] {
          margin-bottom: 12px; }
        .el-popper[x-placement^="top"] .popper__arrow {
          bottom: -6px;
          left: 50%;
          margin-right: 3px;
          border-top-color: #ebeef5;
          border-bottom-width: 0; }
          .el-popper[x-placement^="top"] .popper__arrow::after {
            bottom: 1px;
            margin-left: -6px;
            border-top-color: #fff;
            border-bottom-width: 0; }
        .el-popper[x-placement^="bottom"] {
          margin-top: 12px; }
        .el-popper[x-placement^="bottom"] .popper__arrow {
          top: -6px;
          left: 50%;
          margin-right: 3px;
          border-top-width: 0;
          border-bottom-color: #ebeef5; }
          .el-popper[x-placement^="bottom"] .popper__arrow::after {
            top: 1px;
            margin-left: -6px;
            border-top-width: 0;
            border-bottom-color: #fff; }
        .el-popper[x-placement^="right"] {
          margin-left: 12px; }
        .el-popper[x-placement^="right"] .popper__arrow {
          top: 50%;
          left: -6px;
          margin-bottom: 3px;
          border-right-color: #ebeef5;
          border-left-width: 0; }
          .el-popper[x-placement^="right"] .popper__arrow::after {
            bottom: -6px;
            left: 1px;
            border-right-color: #fff;
            border-left-width: 0; }
        .el-popper[x-placement^="left"] {
          margin-right: 12px; }
        .el-popper[x-placement^="left"] .popper__arrow {
          top: 50%;
          right: -6px;
          margin-bottom: 3px;
          border-right-width: 0;
          border-left-color: #ebeef5; }
          .el-popper[x-placement^="left"] .popper__arrow::after {
            right: 1px;
            bottom: -6px;
            margin-left: -6px;
            border-right-width: 0;
            border-left-color: #fff; }

        .el-autocomplete {
          position: relative;
          display: inline-block; }

        .el-autocomplete-suggestion {
          margin: 5px 0;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          border-radius: 4px; }
          .el-autocomplete-suggestion.el-popper .popper__arrow {
            left: 24px !important; }
          .el-autocomplete-suggestion__wrap {
            max-height: 280px;
            padding: 10px 0;
            box-sizing: border-box;
            overflow: auto;
            background-color: #fff;
            border: 1px solid #e4e7ed;
            border-radius: 4px; }
          .el-autocomplete-suggestion__list {
            margin: 0;
            padding: 0; }
          .el-autocomplete-suggestion li {
            padding: 0 20px;
            margin: 0;
            line-height: 34px;
            cursor: pointer;
            color: #606266;
            font-size: 14px;
            list-style: none;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis; }
            .el-autocomplete-suggestion li:hover {
              background-color: #f5f7fa; }
            .el-autocomplete-suggestion li.highlighted {
              background-color: #f5f7fa; }
            .el-autocomplete-suggestion li.divider {
              margin-top: 6px;
              border-top: 1px solid #000; }
            .el-autocomplete-suggestion li.divider:last-child {
              margin-bottom: -6px; }
          .el-autocomplete-suggestion.is-loading li {
            text-align: center;
            height: 100px;
            line-height: 100px;
            font-size: 20px;
            color: #999; }
            .el-autocomplete-suggestion.is-loading li::after {
              display: inline-block;
              content: "";
              height: 100%;
              vertical-align: middle; }
            .el-autocomplete-suggestion.is-loading li:hover {
              background-color: #fff; }
          .el-autocomplete-suggestion.is-loading .el-icon-loading {
            vertical-align: middle; }

</style>
