<template>
  <div class="mz-table"
    :class="[{
      'mz-table--fit': fit,
      'mz-table--striped': stripe,
      'mz-table--border': border || isGroup,
      'mz-table--hidden': isHidden,
      'mz-table--group': isGroup,
      'mz-table--fluid-height': maxHeight,
      'mz-table--enable-row-hover': !store.states.isComplex,
      'mz-table--enable-row-transition': (store.states.data || []).length !== 0 && (store.states.data || []).length < 100
    }, tableSize ? `mz-table--${ tableSize }` : '']"
    @mouseleave="handleMouseLeave($event)">
    <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>
    <div class="mz-table__header-wrapper" ref="headerWrapper" v-if="showHeader">
      <table-header
        ref="tableHeader"
        :store="store"
        :layout="layout"
        :border="border"
        :default-sort="defaultSort"
        :style="{ width: layout.bodyWidth ? layout.bodyWidth + 'px' : '' }">
      </table-header>
    </div>
    <div
      class="mz-table__body-wrapper"
      ref="bodyWrapper"
      :class="[`is-scroll-${scrollPosition}`]"
      :style="[bodyHeight]">
      <table-body
        :context="context"
        :store="store"
        :stripe="stripe"
        :layout="layout"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :highlight="highlightCurrentRow"
        :style="{ width: bodyWidth }">
      </table-body>
      <div :style="{ width: bodyWidth }" class="mz-table__empty-block" v-if="!data || data.length === 0">
        <span class="mz-table__empty-text"><slot name="empty">{{ emptyText || t('el.table.emptyText') }}</slot></span>
      </div>
      <div class="mz-table__append-wrapper" ref="appendWrapper" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </div>
    <div class="mz-table__footer-wrapper" ref="footerWrapper" v-if="showSummary" v-show="data && data.length > 0">
      <table-footer
        :store="store"
        :layout="layout"
        :border="border"
        :sum-text="sumText || t('el.table.sumText')"
        :summary-method="summaryMethod"
        :default-sort="defaultSort"
        :style="{ width: layout.bodyWidth ? layout.bodyWidth + 'px' : '' }">
      </table-footer>
    </div>
    <div class="mz-table__fixed" ref="fixedWrapper"
      v-if="fixedColumns.length > 0"
      :style="[
        { width: layout.fixedWidth ? layout.fixedWidth + 'px' : '' },
        fixedHeight
      ]">
      <div class="mz-table__fixed-header-wrapper" ref="fixedHeaderWrapper" v-if="showHeader">
        <table-header
          ref="fixedTableHeader"
          fixed="left"
          :border="border"
          :store="store"
          :layout="layout"
          :style="{ width: layout.fixedWidth ? layout.fixedWidth + 'px' : '' }"></table-header>
      </div>
      <div
        class="mz-table__fixed-body-wrapper"
        ref="fixedBodyWrapper"
        :style="[
          { top: layout.headerHeight + 'px' },
          fixedBodyHeight
        ]">
        <table-body
          fixed="left"
          :store="store"
          :stripe="stripe"
          :layout="layout"
          :highlight="highlightCurrentRow"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :style="{ width: layout.fixedWidth ? layout.fixedWidth + 'px' : '' }">
        </table-body>
        <div class="mz-table__append-gutter" :style="{ height: layout.appendHeight + 'px' }" v-if="$slots.append"></div>
      </div>
      <div class="mz-table__fixed-footer-wrapper" ref="fixedFooterWrapper" v-if="showSummary" v-show="data && data.length > 0">
        <table-footer
          fixed="left"
          :border="border"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          :store="store"
          :layout="layout"
          :style="{ width: layout.fixedWidth ? layout.fixedWidth + 'px' : '' }"></table-footer>
      </div>
    </div>
    <div class="mz-table__fixed-right" ref="rightFixedWrapper"
      v-if="rightFixedColumns.length > 0"
      :style="[
        { width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '' },
        { right: layout.scrollY ? (border ? layout.gutterWidth : (layout.gutterWidth || 0)) + 'px' : '' },
        fixedHeight
      ]">
      <div class="mz-table__fixed-header-wrapper" ref="rightFixedHeaderWrapper" v-if="showHeader">
        <table-header
          ref="rightFixedTableHeader"
          fixed="right"
          :border="border"
          :store="store"
          :layout="layout"
          :style="{ width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '' }"></table-header>
      </div>
      <div class="mz-table__fixed-body-wrapper" ref="rightFixedBodyWrapper"
        :style="[
          { top: layout.headerHeight + 'px' },
          fixedBodyHeight
        ]">
        <table-body
          fixed="right"
          :store="store"
          :stripe="stripe"
          :layout="layout"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :highlight="highlightCurrentRow"
          :style="{ width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '' }">
        </table-body>
      </div>
      <div class="mz-table__fixed-footer-wrapper" ref="rightFixedFooterWrapper" v-if="showSummary" v-show="data && data.length > 0">
        <table-footer
          fixed="right"
          :border="border"
          :sum-text="sumText || t('mz.table.sumText')"
          :summary-method="summaryMethod"
          :store="store"
          :layout="layout"
          :style="{ width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '' }"></table-footer>
      </div>
    </div>
    <div class="mz-table__fixed-right-patch"
      v-if="rightFixedColumns.length > 0"
      :style="{ width: layout.scrollY ? layout.gutterWidth + 'px' : '0', height: layout.headerHeight + 'px' }"></div>
    <div class="mz-table__column-resize-proxy" ref="resizeProxy" v-show="resizeProxyVisible"></div>
  </div>
</template>

<script type="text/babel">
  import MzCheckbox from '@/components/checkbox/mz-checkbox';
  import throttle from 'throttle-debounce/throttle';
  import debounce from 'throttle-debounce/debounce';
  import { addResizeListener, removeResizeListener } from '@/utils/resize-event';
  import Locale from '@/mixins/locale';
  import Migrating from '@/mixins/migrating';
  import TableStore from './table-store';
  import TableLayout from './table-layout';
  import TableBody from './table-body';
  import TableHeader from './table-header';
  import TableFooter from './table-footer';
  import { mousewheel } from './util';

  let tableIdSeed = 1;

  export default {
    name: 'MzTable',

    mixins: [Locale, Migrating],

    props: {
      data: {
        type: Array,
        default: function() {
          return [];
        }
      },

      size: String,

      width: [String, Number],

      height: [String, Number],

      maxHeight: [String, Number],

      fit: {
        type: Boolean,
        default: true
      },

      stripe: Boolean,

      border: Boolean,

      rowKey: [String, Function],

      context: {},

      showHeader: {
        type: Boolean,
        default: true
      },

      showSummary: Boolean,

      sumText: String,

      summaryMethod: Function,

      rowClassName: [String, Function],

      rowStyle: [Object, Function],

      cellClassName: [String, Function],

      cellStyle: [Object, Function],

      headerRowClassName: [String, Function],

      headerRowStyle: [Object, Function],

      headerCellClassName: [String, Function],

      headerCellStyle: [Object, Function],

      highlightCurrentRow: Boolean,

      currentRowKey: [String, Number],

      emptyText: String,

      expandRowKeys: Array,

      defaultExpandAll: Boolean,

      defaultSort: Object,

      tooltipEffect: String,

      spanMethod: Function
    },

    components: {
      TableHeader,
      TableFooter,
      TableBody,
      MzCheckbox
    },

    methods: {
      getMigratingConfig() {
        return {
          events: {
            expand: 'expand is renamed to expand-change'
          }
        };
      },

      setCurrentRow(row) {
        this.store.commit('setCurrentRow', row);
      },

      toggleRowSelection(row, selected) {
        this.store.toggleRowSelection(row, selected);
        this.store.updateAllSelected();
      },

      toggleRowExpansion(row, expanded) {
        this.store.toggleRowExpansion(row, expanded);
      },

      clearSelection() {
        this.store.clearSelection();
      },

      clearFilter() {
        this.store.clearFilter();
      },

      clearSort() {
        this.store.clearSort();
      },

      handleMouseLeave() {
        this.store.commit('setHoverRow', null);
        if (this.hoverState) this.hoverState = null;
      },

      updateScrollY() {
        this.layout.updateScrollY();
      },

      bindEvents() {
        const { headerWrapper, footerWrapper } = this.$refs;
        const refs = this.$refs;
        let self = this;
        this.bodyWrapper.addEventListener('scroll', function() {
          if (headerWrapper) headerWrapper.scrollLeft = this.scrollLeft;
          if (footerWrapper) footerWrapper.scrollLeft = this.scrollLeft;
          if (refs.fixedBodyWrapper) refs.fixedBodyWrapper.scrollTop = this.scrollTop;
          if (refs.rightFixedBodyWrapper) refs.rightFixedBodyWrapper.scrollTop = this.scrollTop;
          const maxScrollLeftPosition = this.scrollWidth - this.offsetWidth - 1;
          const scrollLeft = this.scrollLeft;
          if (scrollLeft >= maxScrollLeftPosition) {
            self.scrollPosition = 'right';
          } else if (scrollLeft === 0) {
            self.scrollPosition = 'left';
          } else {
            self.scrollPosition = 'middle';
          }
        });

        const scrollBodyWrapper = event => {
          const { deltaX, deltaY } = event;

          if (Math.abs(deltaX) < Math.abs(deltaY)) return;

          if (deltaX > 0) {
            this.bodyWrapper.scrollLeft += 10;
          } else if (deltaX < 0) {
            this.bodyWrapper.scrollLeft -= 10;
          }
        };
        if (headerWrapper) {
          mousewheel(headerWrapper, throttle(16, scrollBodyWrapper));
        }
        if (footerWrapper) {
          mousewheel(footerWrapper, throttle(16, scrollBodyWrapper));
        }

        if (this.fit) {
          this.windowResizeListener = throttle(50, () => {
            if (this.$ready) this.doLayout();
          });
          addResizeListener(this.$el, this.windowResizeListener);
        }
      },

      doLayout() {
        this.store.updateColumns();
        this.updateScrollY();
        this.layout.update();
        this.$nextTick(() => {
          if (this.height) {
            this.layout.setHeight(this.height);
          } else if (this.maxHeight) {
            this.layout.setMaxHeight(this.maxHeight);
          } else if (this.shouldUpdateHeight) {
            this.layout.updateHeight();
          }
        });
      }
    },

    created() {
      this.tableId = 'mz-table_' + tableIdSeed + '_';
      this.debouncedLayout = debounce(50, () => this.doLayout());
    },

    computed: {
      tableSize() {
        return this.size || (this.$ELEMENT || {}).size;
      },

      bodyWrapper() {
        return this.$refs.bodyWrapper;
      },

      shouldUpdateHeight() {
        return typeof this.height === 'number' ||
          this.fixedColumns.length > 0 ||
          this.rightFixedColumns.length > 0;
      },

      selection() {
        return this.store.states.selection;
      },

      columns() {
        return this.store.states.columns;
      },

      tableData() {
        return this.store.states.data;
      },

      fixedColumns() {
        return this.store.states.fixedColumns;
      },

      rightFixedColumns() {
        return this.store.states.rightFixedColumns;
      },

      bodyHeight() {
        let style = {};

        if (this.height) {
          style = {
            height: this.layout.bodyHeight ? this.layout.bodyHeight + 'px' : ''
          };
        } else if (this.maxHeight) {
          style = {
            'max-height': (this.showHeader
              ? this.maxHeight - this.layout.headerHeight - this.layout.footerHeight
              : this.maxHeight - this.layout.footerHeight) + 'px'
          };
        }

        return style;
      },

      bodyWidth() {
        const { bodyWidth, scrollY, gutterWidth } = this.layout;
        return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : '';
      },

      fixedBodyHeight() {
        let style = {};

        if (this.height) {
          style = {
            height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + 'px' : ''
          };
        } else if (this.maxHeight) {
          let maxHeight = this.layout.scrollX ? this.maxHeight - this.layout.gutterWidth : this.maxHeight;

          if (this.showHeader) {
            maxHeight -= this.layout.headerHeight;
          }

          maxHeight -= this.layout.footerHeight;

          style = {
            'max-height': maxHeight + 'px'
          };
        }

        return style;
      },

      fixedHeight() {
        let style = {};

        if (this.maxHeight) {
          style = {
            bottom: (this.layout.scrollX && this.data.length) ? this.layout.gutterWidth + 'px' : ''
          };
        } else {
          style = {
            height: this.layout.viewportHeight ? this.layout.viewportHeight + 'px' : ''
          };
        }

        return style;
      }
    },

    watch: {
      height(value) {
        this.layout.setHeight(value);
      },

      maxHeight(value) {
        this.layout.setMaxHeight(value);
      },

      currentRowKey(newVal) {
        this.store.setCurrentRowKey(newVal);
      },

      data: {
        immediate: true,
        handler(val) {
          this.store.commit('setData', val);
          if (this.$ready) {
            this.$nextTick(() => {
              this.doLayout();
            });
          }
        }
      },

      expandRowKeys: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.store.setExpandRowKeys(newVal);
          }
        }
      }
    },

    destroyed() {
      if (this.windowResizeListener) removeResizeListener(this.$el, this.windowResizeListener);
    },

    mounted() {
      this.bindEvents();
      this.doLayout();

      // init filters
      this.store.states.columns.forEach(column => {
        if (column.filteredValue && column.filteredValue.length) {
          this.store.commit('filterChange', {
            column,
            values: column.filteredValue,
            silent: true
          });
        }
      });

      this.$ready = true;
    },

    data() {
      const store = new TableStore(this, {
        rowKey: this.rowKey,
        defaultExpandAll: this.defaultExpandAll
      });
      const layout = new TableLayout({
        store,
        table: this,
        fit: this.fit,
        showHeader: this.showHeader
      });
      return {
        store,
        layout,
        isHidden: false,
        renderExpanded: null,
        resizeProxyVisible: false,
        // 是否拥有多级表头
        isGroup: false,
        scrollPosition: 'left'
      };
    }
  };
</script>
<style lang="less">
@charset "UTF-8";
.mz-table {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  font-size: 14px;
  color: #606266; }
  .mz-table__empty-block {
    position: relative;
    min-height: 60px;
    text-align: center;
    width: 100%;
    height: 100%; }
  .mz-table__empty-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #909399; }
  .mz-table__expand-column .cell {
    padding: 0;
    text-align: center; }
  .mz-table__expand-icon {
    position: relative;
    cursor: pointer;
    color: #666;
    font-size: 12px;
    transition: transform 0.2s ease-in-out;
    height: 20px; }
    .mz-table__expand-icon--expanded {
      transform: rotate(90deg); }
    .mz-table__expand-icon > .mz-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -5px;
      margin-top: -5px; }
  .mz-table__expanded-cell {
    background-color: #fff; }
    .mz-table__expanded-cell[class*=cell] {
      padding: 20px 50px; }
    .mz-table__expanded-cell:hover {
      background-color: #f5f7fa !important; }
  .mz-table--fit {
    border-right: 0;
    border-bottom: 0; }
    .mz-table--fit th.gutter, .mz-table--fit td.gutter {
      border-right-width: 1px; }
  .mz-table thead {
    color: #909399;
    font-weight: 500; }
    .mz-table thead.is-group th {
      background: #f5f7fa; }
  .mz-table th, .mz-table td {
    padding: 12px 0;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative; }
    .mz-table th.is-center, .mz-table td.is-center {
      text-align: center; }
    .mz-table th.is-left, .mz-table td.is-left {
      text-align: left; }
    .mz-table th.is-right, .mz-table td.is-right {
      text-align: right; }
    .mz-table th.gutter, .mz-table td.gutter {
      width: 15px;
      border-right-width: 0;
      border-bottom-width: 0;
      padding: 0; }
    .mz-table th.is-hidden > *, .mz-table td.is-hidden > * {
      visibility: hidden; }
  .mz-table--medium th, .mz-table--medium td {
    padding: 10px 0; }
  .mz-table--small {
    font-size: 12px; }
    .mz-table--small th, .mz-table--small td {
      padding: 8px 0; }
  .mz-table--mini {
    font-size: 12px; }
    .mz-table--mini th, .mz-table--mini td {
      padding: 6px 0; }
  .mz-table tr {
    background-color: #fff; }
    .mz-table tr input[type="checkbox"] {
      margin: 0; }
  .mz-table th.is-leaf, .mz-table td {
    border-bottom: 1px solid #ebeef5; }
  .mz-table th.is-sortable {
    cursor: pointer; }
  .mz-table th {
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    text-align: left;
    background-color: #fff; }
    .mz-table th div {
      display: inline-block;
      padding-left: 10px;
      padding-right: 10px;
      line-height: 40px;
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis; }
    .mz-table th > .cell {
      position: relative;
      word-wrap: normal;
      text-overflow: ellipsis;
      display: inline-block;
      vertical-align: middle;
      width: 100%;
      box-sizing: border-box; }
      .mz-table th > .cell.highlight {
        color: #eb3332; }
    .mz-table th.required > div::before {
      display: inline-block;
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ff4d51;
      margin-right: 5px;
      vertical-align: middle; }
  .mz-table td div {
    box-sizing: border-box; }
  .mz-table td.gutter {
    width: 0; }
  .mz-table .cell {
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
    padding-left: 10px;
    padding-right: 10px; }
    .mz-table .cell.mz-tooltip {
      white-space: nowrap;
      min-width: 50px; }
  .mz-table--group, .mz-table--border {
    border: 1px solid #ebeef5; }
    .mz-table::before, .mz-table--group::after, .mz-table--border::after {
      content: '';
      position: absolute;
      background-color: #ebeef5;
      z-index: 1; }
    .mz-table--group::after, .mz-table--border::after {
      top: 0;
      right: 0;
      width: 1px;
      height: 100%; }
  .mz-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px; }
  .mz-table--border {
    border-right: none;
    border-bottom: none; }
    .mz-table--border th, .mz-table--border td {
      border-right: 1px solid #ebeef5; }
      .mz-table--border th:first-child .cell, .mz-table--border td:first-child .cell {
        padding-left: 10px; }
    .mz-table--border .has-gutter th:nth-last-of-type(2), .mz-table--border .has-gutter td:nth-last-of-type(2) {
      border-right: none; }
    .mz-table--border th.gutter:last-of-type {
      border-bottom: 1px solid #ebeef5;
      border-bottom-width: 1px; }
    .mz-table--border th {
      border-bottom: 1px solid #ebeef5; }
  .mz-table--hidden {
    visibility: hidden; }
  .mz-table__fixed, .mz-table__fixed-right {
    position: absolute;
    top: 0;
    left: 0;
    overflow-x: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.12); }
    .mz-table__fixed::before, .mz-table__fixed-right::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: #ebeef5;
      z-index: 4; }
  .mz-table__fixed-right-patch {
    position: absolute;
    top: -1px;
    right: 0;
    background-color: #fff;
    border-bottom: 1px solid #ebeef5; }
  .mz-table__fixed-right {
    top: 0;
    left: auto;
    right: 0; }
    .mz-table__fixed-right .mz-table__fixed-header-wrapper,
    .mz-table__fixed-right .mz-table__fixed-body-wrapper,
    .mz-table__fixed-right .mz-table__fixed-footer-wrapper {
      left: auto;
      right: 0; }
  .mz-table__fixed-header-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3; }
  .mz-table__fixed-footer-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 3; }
    .mz-table__fixed-footer-wrapper tbody td {
      border-top: 1px solid #ebeef5;
      background-color: #f5f7fa;
      color: #606266; }
  .mz-table__fixed-body-wrapper {
    position: absolute;
    left: 0;
    top: 37px;
    overflow: hidden;
    z-index: 3; }
  .mz-table__header-wrapper, .mz-table__body-wrapper, .mz-table__footer-wrapper {
    width: 100%; }
  .mz-table__footer-wrapper {
    margin-top: -1px; }
    .mz-table__footer-wrapper td {
      border-top: 1px solid #ebeef5; }
  .mz-table__header, .mz-table__body, .mz-table__footer {
    table-layout: fixed; }
  .mz-table__header-wrapper, .mz-table__footer-wrapper {
    overflow: hidden; }
    .mz-table__header-wrapper tbody td, .mz-table__footer-wrapper tbody td {
      background-color: #f5f7fa;
      color: #606266; }
  .mz-table__body-wrapper {
    overflow: auto;
    position: relative; }
    .mz-table__body-wrapper.is-scroll-none ~ .mz-table__fixed,
    .mz-table__body-wrapper.is-scroll-none ~ .mz-table__fixed-right {
      box-shadow: none; }
    .mz-table__body-wrapper.is-scroll-left ~ .mz-table__fixed {
      box-shadow: none; }
    .mz-table__body-wrapper.is-scroll-right ~ .mz-table__fixed-right {
      box-shadow: none; }
    .mz-table__body-wrapper .mz-table--border.is-scroll-right ~ .mz-table__fixed-right {
      border-left: 1px solid #ebeef5; }
    .mz-table__body-wrapper .mz-table--border.is-scroll-left ~ .mz-table__fixed {
      border-right: 1px solid #ebeef5; }
  .mz-table .caret-wrapper {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 34px;
    width: 24px;
    vertical-align: middle;
    cursor: pointer;
    overflow: initial;
    position: relative; }
  .mz-table .sort-caret {
    width: 0;
    height: 0;
    border: solid 5px transparent;
    position: absolute; }
    .mz-table .sort-caret.ascending {
      border-bottom-color: #c0c4cc;
      top: 5px; }
    .mz-table .sort-caret.descending {
      border-top-color: #c0c4cc;
      bottom: 7px; }
  .mz-table .ascending .sort-caret.ascending {
    border-bottom-color: #eb3332; }
  .mz-table .descending .sort-caret.descending {
    border-top-color: #eb3332; }
  .mz-table .hidden-columns {
    visibility: hidden;
    position: absolute;
    z-index: -1; }
  .mz-table--striped .mz-table__body tr.mz-table__row--striped td {
    background: #FAFAFA; }
  .mz-table--striped .mz-table__body tr.mz-table__row--striped.current-row td {
    background-color: #ecf5ff; }
  .mz-table__body tr.hover-row > td, .mz-table__body tr.hover-row.current-row > td, .mz-table__body tr.hover-row.mz-table__row--striped > td, .mz-table__body tr.hover-row.mz-table__row--striped.current-row > td {
    background-color: #ecf5ff; }
  .mz-table__body tr.current-row > td {
    background-color: #ecf5ff; }
  .mz-table__column-resize-proxy {
    position: absolute;
    left: 200px;
    top: 0;
    bottom: 0;
    width: 0;
    border-left: 1px solid #ebeef5;
    z-index: 10; }
  .mz-table__column-filter-trigger {
    display: inline-block;
    line-height: 34px;
    cursor: pointer; }
    .mz-table__column-filter-trigger i {
      color: #909399;
      font-size: 12px;
      transform: scale(0.75); }
  .mz-table--enable-row-transition .mz-table__body td {
    transition: background-color .25s ease; }
  .mz-table--enable-row-hover .mz-table__body tr:hover > td {
    background-color: #f5f7fa; }
  .mz-table--fluid-height .mz-table__fixed,
  .mz-table--fluid-height .mz-table__fixed-right {
    bottom: 0;
    overflow: hidden; }


    .mz-table-column--selection .cell {
      padding-left: 14px;
      padding-right: 14px; }

    .mz-table-filter {
      border: solid 1px #ebeef5;
      border-radius: 2px;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      margin: 2px 0;
      /** used for dropdown mode */ }
      .mz-table-filter__list {
        padding: 5px 0;
        margin: 0;
        list-style: none;
        min-width: 100px; }
      .mz-table-filter__list-item {
        line-height: 36px;
        padding: 0 10px;
        cursor: pointer;
        font-size: 14px; }
        .mz-table-filter__list-item:hover {
          background-color: #ecf5ff;
          color: #66b1ff; }
        .mz-table-filter__list-item.is-active {
          background-color: #eb3332;
          color: #fff; }
      .mz-table-filter__content {
        min-width: 100px; }
      .mz-table-filter__bottom {
        border-top: 1px solid #ebeef5;
        padding: 8px; }
        .mz-table-filter__bottom button {
          background: transparent;
          border: none;
          color: #606266;
          cursor: pointer;
          font-size: 13px;
          padding: 0 3px; }
          .mz-table-filter__bottom button:hover {
            color: #eb3332; }
          .mz-table-filter__bottom button:focus {
            outline: none; }
          .mz-table-filter__bottom button.is-disabled {
            color: #c0c4cc;
            cursor: not-allowed; }
      .mz-table-filter__checkbox-group {
        padding: 10px; }
        .mz-table-filter__checkbox-group label.mz-checkbox {
          display: block;
          margin-bottom: 8px;
          margin-left: 5px; }
        .mz-table-filter__checkbox-group .mz-checkbox:last-child {
          margin-bottom: 0; }
</style>
