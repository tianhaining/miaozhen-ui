<template>
  <ul @click="onPagerClick" class="mz-pager">
    <li
      :class="{ active: currentPage === 1 }"
      v-if="pageCount > 0"
      class="number">1</li>
    <li
      class="mz-icon more btn-quickprev"
      :class="[quickprevIconClass]"
      v-if="showPrevMore"
      @mouseenter="quickprevIconClass = 'mz-icon-d-arrow-left'"
      @mouseleave="quickprevIconClass = 'mz-icon-more'">
    </li>
    <li
      v-for="pager in pagers"
      :class="{ active: currentPage === pager }"
      class="number">{{ pager }}</li>
    <li
      class="mz-icon more btn-quicknext"
      :class="[quicknextIconClass]"
      v-if="showNextMore"
      @mouseenter="quicknextIconClass = 'mz-icon-d-arrow-right'"
      @mouseleave="quicknextIconClass = 'mz-icon-more'">
    </li>
    <li
      :class="{ active: currentPage === pageCount }"
      class="number"
      v-if="pageCount > 1">{{ pageCount }}</li>
  </ul>
</template>

<script type="text/babel">
  export default {
    name: 'MzPager',

    props: {
      currentPage: Number,

      pageCount: Number
    },

    watch: {
      showPrevMore(val) {
        if (!val) this.quickprevIconClass = 'mz-icon-more';
      },

      showNextMore(val) {
        if (!val) this.quicknextIconClass = 'mz-icon-more';
      }
    },

    methods: {
      onPagerClick(event) {
        const target = event.target;
        if (target.tagName === 'UL') {
          return;
        }

        let newPage = Number(event.target.textContent);
        const pageCount = this.pageCount;
        const currentPage = this.currentPage;

        if (target.className.indexOf('more') !== -1) {
          if (target.className.indexOf('quickprev') !== -1) {
            newPage = currentPage - 5;
          } else if (target.className.indexOf('quicknext') !== -1) {
            newPage = currentPage + 5;
          }
        }

        /* istanbul ignore if */
        if (!isNaN(newPage)) {
          if (newPage < 1) {
            newPage = 1;
          }

          if (newPage > pageCount) {
            newPage = pageCount;
          }
        }

        if (newPage !== currentPage) {
          this.$emit('change', newPage);
        }
      }
    },

    computed: {
      pagers() {
        const pagerCount = 7;

        const currentPage = Number(this.currentPage);
        const pageCount = Number(this.pageCount);

        let showPrevMore = false;
        let showNextMore = false;

        if (pageCount > pagerCount) {
          if (currentPage > pagerCount - 3) {
            showPrevMore = true;
          }

          if (currentPage < pageCount - 3) {
            showNextMore = true;
          }
        }

        const array = [];

        if (showPrevMore && !showNextMore) {
          const startPage = pageCount - (pagerCount - 2);
          for (let i = startPage; i < pageCount; i++) {
            array.push(i);
          }
        } else if (!showPrevMore && showNextMore) {
          for (let i = 2; i < pagerCount; i++) {
            array.push(i);
          }
        } else if (showPrevMore && showNextMore) {
          const offset = Math.floor(pagerCount / 2) - 1;
          for (let i = currentPage - offset ; i <= currentPage + offset; i++) {
            array.push(i);
          }
        } else {
          for (let i = 2; i < pageCount; i++) {
            array.push(i);
          }
        }

        this.showPrevMore = showPrevMore;
        this.showNextMore = showNextMore;

        return array;
      }
    },

    data() {
      return {
        current: null,
        showPrevMore: false,
        showNextMore: false,
        quicknextIconClass: 'mz-icon-more',
        quickprevIconClass: 'mz-icon-more'
      };
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

.mz-pagination {
  white-space: nowrap;
  padding: 2px 5px;
  color: #606266;
  font-weight: bold; }
  .mz-pagination::before,
  .mz-pagination::after {
    display: table;
    content: ""; }

  .mz-pagination::after {
    clear: both; }
  .mz-pagination span:not([class*=suffix]),
  .mz-pagination button {
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    vertical-align: top;
    box-sizing: border-box; }
  .mz-pagination .mz-input__inner {
    text-align: center;
    -moz-appearance: textfield; }
  .mz-pagination .mz-input__suffix {
    right: 0;
    transform: scale(0.8); }
  .mz-pagination .mz-select .mz-input {
    width: 100px;
    margin: 0 5px; }
    .mz-pagination .mz-select .mz-input .mz-input__inner {
      padding-right: 25px;
      border-radius: 3px;
      height: 28px; }
  .mz-pagination button {
    border: none;
    padding: 0 6px;
    background: transparent; }
    .mz-pagination button:focus {
      outline: none; }
    .mz-pagination button:hover {
      color: #eb3332; }
    .mz-pagination button.disabled {
      color: #c0c4cc;
      background-color: #fff;
      cursor: not-allowed; }
  .mz-pagination .btn-prev,
  .mz-pagination .btn-next {
    background: center center no-repeat;
    background-size: 16px;
    background-color: #fff;
    cursor: pointer;
    margin: 0;
    color: #303133; }
    .mz-pagination .btn-prev .mz-icon,
    .mz-pagination .btn-next .mz-icon {
      display: block;
      font-size: 12px;
      font-weight: bold; }
  .mz-pagination .btn-prev {
    padding-right: 12px; }
  .mz-pagination .btn-next {
    padding-left: 12px; }
  .mz-pagination--small .btn-prev,
  .mz-pagination--small .btn-next,
  .mz-pagination--small .mz-pager li,
  .mz-pagination--small .mz-pager li:last-child {
    border-color: transparent;
    font-size: 12px;
    line-height: 22px;
    height: 22px;
    min-width: 22px; }
  .mz-pagination--small .arrow.disabled {
    visibility: hidden; }
  .mz-pagination__sizes {
    margin: 0 10px 0 0;
    font-weight: normal;
    color: #606266; }
    .mz-pagination__sizes .mz-input .mz-input__inner {
      font-size: 13px;
      padding-left: 8px; }
      .mz-pagination__sizes .mz-input .mz-input__inner:hover {
        border-color: #eb3332; }
  .mz-pagination__total {
    margin-right: 10px;
    font-weight: normal;
    color: #606266; }
  .mz-pagination__jump {
    margin-left: 24px;
    font-weight: normal;
    color: #606266; }
    .mz-pagination__jump .mz-input__inner {
      padding: 0 3px; }
  .mz-pagination__rightwrapper {
    float: right; }
  .mz-pagination__editor {
    line-height: 18px;
    padding: 0 2px;
    height: 28px;
    text-align: center;
    margin: 0 2px;
    box-sizing: border-box;
    border-radius: 3px; }
    .mz-pagination__editor.mz-input {
      width: 50px; }
    .mz-pagination__editor.mz-input .mz-input__inner {
      height: 28px; }
    .mz-pagination__editor .mz-input__inner::-webkit-inner-spin-button,
    .mz-pagination__editor .mz-input__inner::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0; }
  .mz-pagination.is-background .btn-prev,
  .mz-pagination.is-background .btn-next,
  .mz-pagination.is-background .mz-pager li {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    min-width: 30px;
    border-radius: 2px; }
  .mz-pagination.is-background .btn-prev, .mz-pagination.is-background .btn-next {
    padding: 0; }
    .mz-pagination.is-background .btn-prev.disabled, .mz-pagination.is-background .btn-next.disabled {
      color: #c0c4cc; }
  .mz-pagination.is-background .mz-pager li:hover {
    color: #eb3332; }
  .mz-pagination.is-background .mz-pager li.active {
    background-color: #eb3332;
    color: #fff; }
  .mz-pagination.is-background.mz-pagination--small .btn-prev,
  .mz-pagination.is-background.mz-pagination--small .btn-next,
  .mz-pagination.is-background.mz-pagination--small .mz-pager li {
    margin: 0 3px;
    min-width: 22px; }

.mz-pager {
  user-select: none;
  list-style: none;
  display: inline-block;
  vertical-align: top;
  font-size: 0;
  padding: 0;
  margin: 0; }
  .mz-pager .more::before {
    line-height: 30px; }
  .mz-pager li {
    padding: 0 4px;
    background: #fff;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    margin: 0; }
    .mz-pager li.btn-quicknext, .mz-pager li.btn-quickprev {
      line-height: 28px;
      color: #303133; }
    .mz-pager li.btn-quickprev:hover {
      cursor: pointer; }
    .mz-pager li.btn-quicknext:hover {
      cursor: pointer; }
    .mz-pager li.active + li {
      border-left: 0; }
    .mz-pager li:hover {
      color: #eb3332; }
    .mz-pager li.active {
      color: #eb3332;
      cursor: default; }
</style>
