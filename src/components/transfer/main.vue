<template>
  <div class="mz-transfer">
    <transfer-panel
      v-bind="$props"
      :data="sourceData"
      :title="titles[0] || t('mz.transfer.titles.0')"
      :default-checked="leftDefaultChecked"
      :placeholder="filterPlaceholder || t('mz.transfer.filterPlaceholder')"
      @checked-change="onSourceCheckedChange">
      <slot name="left-footer"></slot>
    </transfer-panel>
    <div class="mz-transfer__buttons">
      <mz-button
        type="primary"
        :class="['mz-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToLeft"
        :disabled="rightChecked.length === 0">
        <i class="mz-icon-arrow-left"></i>
        <span v-if="buttonTexts[0] !== undefined">{{ buttonTexts[0] }}</span>
      </mz-button>
      <mz-button
        type="primary"
        :class="['mz-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToRight"
        :disabled="leftChecked.length === 0">
        <span v-if="buttonTexts[1] !== undefined">{{ buttonTexts[1] }}</span>
        <i class="mz-icon-arrow-right"></i>
      </mz-button>
    </div>
    <transfer-panel
      v-bind="$props"
      :data="targetData"
      :title="titles[1] || t('mz.transfer.titles.1')"
      :default-checked="rightDefaultChecked"
      :placeholder="filterPlaceholder || t('mz.transfer.filterPlaceholder')"
      @checked-change="onTargetCheckedChange">
      <slot name="right-footer"></slot>
    </transfer-panel>
  </div>
</template>

<script>
  import MzButton from '@/components/button/mz-button';
  import Emitter from '@/mixins/emitter';
  import Locale from '@/mixins/locale';
  import TransferPanel from './transfer-panel.vue';
  import Migrating from '@/mixins/migrating';

  export default {
    name: 'MzTransfer',

    mixins: [Emitter, Locale, Migrating],

    components: {
      TransferPanel,
      MzButton
    },

    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      titles: {
        type: Array,
        default() {
          return [];
        }
      },
      buttonTexts: {
        type: Array,
        default() {
          return [];
        }
      },
      filterPlaceholder: {
        type: String,
        default: ''
      },
      filterMethod: Function,
      leftDefaultChecked: {
        type: Array,
        default() {
          return [];
        }
      },
      rightDefaultChecked: {
        type: Array,
        default() {
          return [];
        }
      },
      renderContent: Function,
      value: {
        type: Array,
        default() {
          return [];
        }
      },
      format: {
        type: Object,
        default() {
          return {};
        }
      },
      filterable: Boolean,
      props: {
        type: Object,
        default() {
          return {
            label: 'label',
            key: 'key',
            disabled: 'disabled'
          };
        }
      }
    },

    data() {
      return {
        leftChecked: [],
        rightChecked: []
      };
    },

    computed: {
      sourceData() {
        return this.data.filter(item => this.value.indexOf(item[this.props.key]) === -1);
      },

      targetData() {
        return this.data.filter(item => this.value.indexOf(item[this.props.key]) > -1);
      },

      hasButtonTexts() {
        return this.buttonTexts.length === 2;
      }
    },

    watch: {
      value(val) {
        this.dispatch('MzFormItem', 'mz.form.change', val);
      }
    },

    methods: {
      getMigratingConfig() {
        return {
          props: {
            'footer-format': 'footer-format is renamed to format.'
          },
          events: {
            selectionchange: 'selectionchange is renamed to selection-change.'
          }
        };
      },

      onSourceCheckedChange(val) {
        this.leftChecked = val;
      },

      onTargetCheckedChange(val) {
        this.rightChecked = val;
      },

      addToLeft() {
        let currentValue = this.value.slice();
        this.rightChecked.forEach(item => {
          const index = currentValue.indexOf(item);
          if (index > -1) {
            currentValue.splice(index, 1);
          }
        });
        this.$emit('input', currentValue);
        this.$emit('change', currentValue, 'left', this.rightChecked);
      },

      addToRight() {
        let currentValue = this.value.slice();
        this.leftChecked.forEach(item => {
          if (this.value.indexOf(item) === -1) {
            currentValue = currentValue.concat(item);
          }
        });
        this.$emit('input', currentValue);
        this.$emit('change', currentValue, 'right', this.leftChecked);
      }
    }
  };
</script>
<style lang="less">
@charset "UTF-8";
.mz-transfer {
  font-size: 14px; }
  .mz-transfer__buttons {
    display: inline-block;
    vertical-align: middle;
    padding: 0 30px; }
  .mz-transfer__button {
    display: block;
    margin: 0 auto;
    padding: 10px;
    border-radius: 50%;
    color: #fff;
    background-color: #eb3332;
    font-size: 0; }
    .mz-transfer__button.is-with-texts {
      border-radius: 4px; }
    .mz-transfer__button.is-disabled {
      border: 1px solid #dcdfe6;
      background-color: #f5f7fa;
      color: #c0c4cc; }
      .mz-transfer__button.is-disabled:hover {
        border: 1px solid #dcdfe6;
        background-color: #f5f7fa;
        color: #c0c4cc; }
    .mz-transfer__button:first-child {
      margin-bottom: 10px; }
    .mz-transfer__button:nth-child(2) {
      margin: 0; }
    .mz-transfer__button i, .mz-transfer__button span {
      font-size: 14px; }
    .mz-transfer__button [class*="el-icon-"] + span {
      margin-left: 0; }

.mz-transfer-panel {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  display: inline-block;
  vertical-align: middle;
  width: 200px;
  max-height: 100%;
  box-sizing: border-box;
  position: relative; }
  .mz-transfer-panel__body {
    height: 246px; }
    .mz-transfer-panel__body.is-with-footer {
      padding-bottom: 40px; }
  .mz-transfer-panel__list {
    margin: 0;
    padding: 6px 0;
    list-style: none;
    height: 246px;
    overflow: auto;
    box-sizing: border-box; }
    .mz-transfer-panel__list.is-filterable {
      height: 194px;
      padding-top: 0; }
  .mz-transfer-panel__item {
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
    display: block; }
    .mz-transfer-panel__item + .mz-transfer-panel__item {
      margin-left: 0 !important;//加上important也是为了去掉 .mz-checkbox + .mz-checkbox的margin-left的影响
    }
    .mz-transfer-panel__item.mz-checkbox {
      color: #606266;
      display: block;/*这里添加是为了去除.mz-checkbox样式里面inline-block的影响*/
    }
    .mz-transfer-panel__item:hover {
      color: #eb3332; }
    .mz-transfer-panel__item.mz-checkbox .mz-checkbox__label {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      box-sizing: border-box;
      padding-left: 24px;
      line-height: 30px; }
    .mz-transfer-panel__item .mz-checkbox__input {
      position: absolute;
      top: 8px; }
  .mz-transfer-panel__filter {
    text-align: center;
    margin: 15px;
    box-sizing: border-box;
    display: block;
    width: auto !important;//加上important是为了去除.mz-input里面width:100%;的影响
   }
    .mz-transfer-panel__filter .mz-input__inner {
      height: 32px;
      width: 100%;
      font-size: 12px;
      display: inline-block;
      box-sizing: border-box;
      border-radius: 16px;
      padding-right: 10px;
      padding-left: 30px; }
    .mz-transfer-panel__filter .mz-input__icon {
      margin-left: 5px; }
    .mz-transfer-panel__filter .mz-icon-circle-close {
      cursor: pointer; }
  .mz-transfer-panel .mz-transfer-panel__header {
    height: 40px;
    line-height: 40px;
    background: #f5f7fa;
    margin: 0;
    padding-left: 15px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    color: #000; }
    .mz-transfer-panel .mz-transfer-panel__header .mz-checkbox {
      display: block;
      line-height: 40px; }
      .mz-transfer-panel .mz-transfer-panel__header .mz-checkbox .mz-checkbox__label {
        font-size: 16px;
        color: #303133;
        font-weight: normal; }
        .mz-transfer-panel .mz-transfer-panel__header .mz-checkbox .mz-checkbox__label span {
          position: absolute;
          right: 15px;
          color: #909399;
          font-size: 12px;
          font-weight: normal; }
  .mz-transfer-panel .mz-transfer-panel__footer {
    height: 40px;
    background: #fff;
    margin: 0;
    padding: 0;
    border-top: 1px solid #ebeef5;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1; }
    .mz-transfer-panel .mz-transfer-panel__footer::after {
      display: inline-block;
      content: "";
      height: 100%;
      vertical-align: middle; }
    .mz-transfer-panel .mz-transfer-panel__footer .mz-checkbox {
      padding-left: 20px;
      color: #606266; }
  .mz-transfer-panel .mz-transfer-panel__empty {
    margin: 0;
    height: 30px;
    line-height: 30px;
    padding: 6px 15px 0;
    color: #909399; }
  .mz-transfer-panel .mz-checkbox__label {
    padding-left: 8px; }
  .mz-transfer-panel .mz-checkbox__inner {
    height: 14px;
    width: 14px;
    border-radius: 3px; }
    .mz-transfer-panel .mz-checkbox__inner::after {
      height: 6px;
      width: 3px;
      left: 4px; }
</style>
