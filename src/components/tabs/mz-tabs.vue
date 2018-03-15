<script>
  import MzTabNav from './mz-tab-nav';

  export default {
    name: 'MzTabs',

    components: {
      MzTabNav
    },

    props: {
      type: String,
      activeName: String,
      closable: Boolean,
      addable: Boolean,
      value: {},
      editable: Boolean,
      tabPosition: {
        type: String,
        default: 'top'
      }
    },

    provide() {
      return {
        rootTabs: this
      };
    },

    data() {
      return {
        currentName: this.value || this.activeName,
        panes: []
      };
    },

    watch: {
      activeName(value) {
        this.setCurrentName(value);
      },
      value(value) {
        this.setCurrentName(value);
      },
      currentName(value) {
        if (this.$refs.nav) {
          this.$nextTick(_ => {
            this.$refs.nav.scrollToActiveTab();
          });
        }
      }
    },

    methods: {
      handleTabClick(tab, tabName, event) {
        if (tab.disabled) return;
        this.setCurrentName(tabName);
        this.$emit('tab-click', tab, event);
      },
      handleTabRemove(pane, ev) {
        if (pane.disabled) return;
        ev.stopPropagation();
        this.$emit('edit', pane.name, 'remove');
        this.$emit('tab-remove', pane.name);
      },
      handleTabAdd() {
        this.$emit('edit', null, 'add');
        this.$emit('tab-add');
      },
      setCurrentName(value) {
        this.currentName = value;
        this.$emit('input', value);
      },
      addPanes(item) {
        const index = this.$slots.default.filter(item => {
          return item.elm.nodeType === 1 && /\bel-tab-pane\b/.test(item.elm.className);
        }).indexOf(item.$vnode);
        this.panes.splice(index, 0, item);
      },
      removePanes(item) {
        const panes = this.panes;
        const index = panes.indexOf(item);
        if (index > -1) {
          panes.splice(index, 1);
        }
      }
    },
    render(h) {
      let {
        type,
        handleTabClick,
        handleTabRemove,
        handleTabAdd,
        currentName,
        panes,
        editable,
        addable,
        tabPosition
      } = this;

      const newButton = editable || addable
        ? (
          <span
            class="mz-tabs__new-tab"
            on-click={ handleTabAdd }
            tabindex="0"
            on-keydown={ (ev) => { if (ev.keyCode === 13) { handleTabAdd(); }} }
          >
            <i class="mz-icon-plus"></i>
          </span>
        )
        : null;

      const navData = {
        props: {
          currentName,
          onTabClick: handleTabClick,
          onTabRemove: handleTabRemove,
          editable,
          type,
          panes
        },
        ref: 'nav'
      };
      const header = (
        <div class={['mz-tabs__header', `is-${tabPosition}`]}>
          {newButton}
          <mz-tab-nav { ...navData }></mz-tab-nav>
        </div>
      );
      const panels = (
        <div class="mz-tabs__content">
          {this.$slots.default}
        </div>
      );

      return (
        <div class={{
          'mz-tabs': true,
          'mz-tabs--card': type === 'card',
          [`mz-tabs--${tabPosition}`]: true,
          'mz-tabs--border-card': type === 'border-card'
        }}>
          { tabPosition !== 'bottom' ? [header, panels] : [panels, header] }
        </div>
      );
    },
    created() {
      if (!this.currentName) {
        this.setCurrentName('0');
      }
    }
  };
</script>
<style lang="less">
.mz-tabs__header {
  padding: 0;
  position: relative;
  margin: 0 0 15px; }
.mz-tabs__active-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: #eb3332;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  list-style: none; }
.mz-tabs__new-tab {
  float: right;
  border: 1px solid #d3dce6;
  height: 18px;
  width: 18px;
  line-height: 18px;
  margin: 12px 0 9px 10px;
  border-radius: 3px;
  text-align: center;
  font-size: 12px;
  color: #d3dce6;
  cursor: pointer;
  transition: all .15s; }
  .mz-tabs__new-tab .mz-icon-plus {
    transform: scale(0.8, 0.8); }
  .mz-tabs__new-tab:hover {
    color: #eb3332; }
.mz-tabs__nav-wrap {
  overflow: hidden;
  margin-bottom: -1px;
  position: relative; }
  .mz-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #e4e7ed;
    z-index: 1; }
  .mz-tabs__nav-wrap.is-scrollable {
    padding: 0 20px;
    box-sizing: border-box; }
.mz-tabs__nav-scroll {
  overflow: hidden; }
.mz-tabs__nav-next, .mz-tabs__nav-prev {
  position: absolute;
  cursor: pointer;
  line-height: 44px;
  font-size: 12px;
  color: #909399; }
.mz-tabs__nav-next {
  right: 0; }
.mz-tabs__nav-prev {
  left: 0; }
.mz-tabs__nav {
  white-space: nowrap;
  position: relative;
  transition: transform .3s;
  float: left;
  z-index: 2; }
.mz-tabs__item {
  padding: 0 20px;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  position: relative; }
  .mz-tabs__item:focus, .mz-tabs__item:focus:active {
    outline: none; }
  .mz-tabs__item:focus.is-active.is-focus:not(:active) {
    box-shadow: 0 0 2px 2px #eb3332 inset;
    border-radius: 3px; }
  .mz-tabs__item .mz-icon-close {
    border-radius: 50%;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    margin-left: 5px; }
    .mz-tabs__item .mz-icon-close:before {
      transform: scale(0.9);
      display: inline-block; }
    .mz-tabs__item .mz-icon-close:hover {
      background-color: #c0c4cc;
      color: #fff; }
  .mz-tabs__item.is-active {
    color: #eb3332; }
  .mz-tabs__item:hover {
    color: #eb3332;
    cursor: pointer; }
  .mz-tabs__item.is-disabled {
    color: #c0c4cc;
    cursor: default; }
.mz-tabs__content {
  overflow: hidden;
  position: relative; }
.mz-tabs--card > .mz-tabs__header {
  border-bottom: 1px solid #e4e7ed; }
.mz-tabs--card > .mz-tabs__header .mz-tabs__nav-wrap::after {
  content: none; }
.mz-tabs--card > .mz-tabs__header .mz-tabs__nav {
  border: 1px solid #e4e7ed;
  border-bottom: none;
  border-radius: 4px 4px 0 0; }
.mz-tabs--card > .mz-tabs__header .mz-tabs__active-bar {
  display: none; }
.mz-tabs--card > .mz-tabs__header .mz-tabs__item .mz-icon-close {
  position: relative;
  font-size: 12px;
  width: 0;
  height: 14px;
  vertical-align: middle;
  line-height: 15px;
  overflow: hidden;
  top: -1px;
  right: -2px;
  transform-origin: 100% 50%; }
.mz-tabs--card > .mz-tabs__header .mz-tabs__item {
  border-bottom: 1px solid transparent;
  border-left: 1px solid #e4e7ed;
  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1); }
  .mz-tabs--card > .mz-tabs__header .mz-tabs__item:first-child {
    border-left: none; }
  .mz-tabs--card > .mz-tabs__header .mz-tabs__item.is-closable:hover {
    padding-left: 13px;
    padding-right: 13px; }
    .mz-tabs--card > .mz-tabs__header .mz-tabs__item.is-closable:hover .mz-icon-close {
      width: 14px; }
  .mz-tabs--card > .mz-tabs__header .mz-tabs__item.is-active {
    border-bottom-color: #fff; }
    .mz-tabs--card > .mz-tabs__header .mz-tabs__item.is-active.is-closable {
      padding-left: 20px;
      padding-right: 20px; }
      .mz-tabs--card > .mz-tabs__header .mz-tabs__item.is-active.is-closable .mz-icon-close {
        width: 14px; }
.mz-tabs--border-card {
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04); }
  .mz-tabs--border-card > .mz-tabs__content {
    padding: 15px; }
  .mz-tabs--border-card > .mz-tabs__header {
    background-color: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
    margin: 0; }
  .mz-tabs--border-card > .mz-tabs__header .mz-tabs__nav-wrap::after {
    content: none; }
  .mz-tabs--border-card > .mz-tabs__header .mz-tabs__item {
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    border: 1px solid transparent;
    margin: -1px -1px 0;
    color: #909399; }
    .mz-tabs--border-card > .mz-tabs__header .mz-tabs__item.is-active {
      color: #eb3332;
      background-color: #fff;
      border-right-color: #dcdfe6;
      border-left-color: #dcdfe6; }
    .mz-tabs--border-card > .mz-tabs__header .mz-tabs__item:hover {
      color: #eb3332; }
.mz-tabs--top .mz-tabs__item.is-top:nth-child(2),
.mz-tabs--top .mz-tabs__item.is-bottom:nth-child(2), .mz-tabs--bottom .mz-tabs__item.is-top:nth-child(2),
.mz-tabs--bottom .mz-tabs__item.is-bottom:nth-child(2) {
  padding-left: 0; }
.mz-tabs--top .mz-tabs__item.is-top:last-child,
.mz-tabs--top .mz-tabs__item.is-bottom:last-child, .mz-tabs--bottom .mz-tabs__item.is-top:last-child,
.mz-tabs--bottom .mz-tabs__item.is-bottom:last-child {
  padding-right: 0; }
.mz-tabs--top.mz-tabs--border-card .mz-tabs__item:nth-child(2), .mz-tabs--top.mz-tabs--card .mz-tabs__item:nth-child(2),
.mz-tabs--top .mz-tabs--left .mz-tabs__item:nth-child(2), .mz-tabs--top .mz-tabs--right .mz-tabs__item:nth-child(2), .mz-tabs--bottom.mz-tabs--border-card .mz-tabs__item:nth-child(2), .mz-tabs--bottom.mz-tabs--card .mz-tabs__item:nth-child(2),
.mz-tabs--bottom .mz-tabs--left .mz-tabs__item:nth-child(2), .mz-tabs--bottom .mz-tabs--right .mz-tabs__item:nth-child(2) {
  padding-left: 20px; }
.mz-tabs--top.mz-tabs--border-card .mz-tabs__item:last-child, .mz-tabs--top.mz-tabs--card .mz-tabs__item:last-child,
.mz-tabs--top .mz-tabs--left .mz-tabs__item:last-child, .mz-tabs--top .mz-tabs--right .mz-tabs__item:last-child, .mz-tabs--bottom.mz-tabs--border-card .mz-tabs__item:last-child, .mz-tabs--bottom.mz-tabs--card .mz-tabs__item:last-child,
.mz-tabs--bottom .mz-tabs--left .mz-tabs__item:last-child, .mz-tabs--bottom .mz-tabs--right .mz-tabs__item:last-child {
  padding-right: 20px; }
.mz-tabs--bottom .mz-tabs__header.is-bottom {
  margin-bottom: 0;
  margin-top: 10px; }
.mz-tabs--bottom.mz-tabs--border-card .mz-tabs__header.is-bottom {
  border-bottom: 0;
  border-top: 1px solid #dcdfe6; }
.mz-tabs--bottom.mz-tabs--border-card .mz-tabs__nav-wrap.is-bottom {
  margin-top: -1px;
  margin-bottom: 0; }
.mz-tabs--bottom.mz-tabs--border-card .mz-tabs__item.is-bottom:not(.is-active) {
  border: 1px solid transparent; }
.mz-tabs--bottom.mz-tabs--border-card .mz-tabs__item.is-bottom {
  margin: 0 -1px -1px -1px; }
.mz-tabs--left, .mz-tabs--right {
  overflow: hidden; }
  .mz-tabs--left .mz-tabs__header.is-left,
  .mz-tabs--left .mz-tabs__header.is-right,
  .mz-tabs--left .mz-tabs__nav-wrap.is-left,
  .mz-tabs--left .mz-tabs__nav-wrap.is-right,
  .mz-tabs--left .mz-tabs__nav-scroll, .mz-tabs--right .mz-tabs__header.is-left,
  .mz-tabs--right .mz-tabs__header.is-right,
  .mz-tabs--right .mz-tabs__nav-wrap.is-left,
  .mz-tabs--right .mz-tabs__nav-wrap.is-right,
  .mz-tabs--right .mz-tabs__nav-scroll {
    height: 100%; }
  .mz-tabs--left .mz-tabs__active-bar.is-left,
  .mz-tabs--left .mz-tabs__active-bar.is-right, .mz-tabs--right .mz-tabs__active-bar.is-left,
  .mz-tabs--right .mz-tabs__active-bar.is-right {
    top: 0;
    bottom: auto;
    width: 2px;
    height: auto; }
  .mz-tabs--left .mz-tabs__nav-wrap.is-left,
  .mz-tabs--left .mz-tabs__nav-wrap.is-right, .mz-tabs--right .mz-tabs__nav-wrap.is-left,
  .mz-tabs--right .mz-tabs__nav-wrap.is-right {
    margin-bottom: 0; }
    .mz-tabs--left .mz-tabs__nav-wrap.is-left.is-scrollable,
    .mz-tabs--left .mz-tabs__nav-wrap.is-right.is-scrollable, .mz-tabs--right .mz-tabs__nav-wrap.is-left.is-scrollable,
    .mz-tabs--right .mz-tabs__nav-wrap.is-right.is-scrollable {
      padding: 30px 0; }
    .mz-tabs--left .mz-tabs__nav-wrap.is-left::after,
    .mz-tabs--left .mz-tabs__nav-wrap.is-right::after, .mz-tabs--right .mz-tabs__nav-wrap.is-left::after,
    .mz-tabs--right .mz-tabs__nav-wrap.is-right::after {
      height: 100%;
      width: 2px;
      bottom: auto;
      top: 0; }
  .mz-tabs--left .mz-tabs__nav, .mz-tabs--right .mz-tabs__nav {
    float: none; }
  .mz-tabs--left .mz-tabs__item.is-left,
  .mz-tabs--left .mz-tabs__item.is-right, .mz-tabs--right .mz-tabs__item.is-left,
  .mz-tabs--right .mz-tabs__item.is-right {
    display: block; }
  .mz-tabs--left .mz-tabs__nav-prev,
  .mz-tabs--left .mz-tabs__nav-next, .mz-tabs--right .mz-tabs__nav-prev,
  .mz-tabs--right .mz-tabs__nav-next {
    height: 30px;
    line-height: 30px;
    width: 100%;
    text-align: center;
    cursor: pointer; }
    .mz-tabs--left .mz-tabs__nav-prev i,
    .mz-tabs--left .mz-tabs__nav-next i, .mz-tabs--right .mz-tabs__nav-prev i,
    .mz-tabs--right .mz-tabs__nav-next i {
      transform: rotateZ(90deg); }
  .mz-tabs--left .mz-tabs__nav-prev, .mz-tabs--right .mz-tabs__nav-prev {
    left: auto;
    top: 0; }
  .mz-tabs--left .mz-tabs__nav-next, .mz-tabs--right .mz-tabs__nav-next {
    right: auto;
    bottom: 0; }
.mz-tabs--left .mz-tabs__header.is-left {
  float: left;
  margin-bottom: 0;
  margin-right: 10px; }
.mz-tabs--left .mz-tabs__nav-wrap.is-left {
  margin-right: -1px; }
  .mz-tabs--left .mz-tabs__nav-wrap.is-left::after {
    left: auto;
    right: 0; }
.mz-tabs--left .mz-tabs__active-bar.is-left {
  right: 0;
  left: auto; }
.mz-tabs--left .mz-tabs__item.is-left {
  text-align: right; }
.mz-tabs--left.mz-tabs--card .mz-tabs__active-bar.is-left {
  display: none; }
.mz-tabs--left.mz-tabs--card .mz-tabs__item.is-left {
  border-left: none;
  border-right: 1px solid #e4e7ed;
  border-bottom: none;
  border-top: 1px solid #e4e7ed; }
.mz-tabs--left.mz-tabs--card .mz-tabs__item.is-left:first-child {
  border-right: 1px solid #e4e7ed;
  border-top: none; }
.mz-tabs--left.mz-tabs--card .mz-tabs__item.is-left.is-active {
  border: 1px solid #e4e7ed;
  border-right-color: #fff;
  border-left: none;
  border-bottom: none; }
  .mz-tabs--left.mz-tabs--card .mz-tabs__item.is-left.is-active:first-child {
    border-top: none; }
  .mz-tabs--left.mz-tabs--card .mz-tabs__item.is-left.is-active:last-child {
    border-bottom: none; }
.mz-tabs--left.mz-tabs--card .mz-tabs__nav {
  border-radius: 4px 0 0 4px;
  border-bottom: 1px solid #e4e7ed;
  border-right: none; }
.mz-tabs--left.mz-tabs--card .mz-tabs__new-tab {
  float: none; }
.mz-tabs--left.mz-tabs--border-card .mz-tabs__header.is-left {
  border-right: 1px solid #dfe4ed; }
.mz-tabs--left.mz-tabs--border-card .mz-tabs__item.is-left {
  border: 1px solid transparent;
  margin: -1px 0 -1px -1px; }
  .mz-tabs--left.mz-tabs--border-card .mz-tabs__item.is-left.is-active {
    border-color: transparent;
    border-top-color: #d1dbe5;
    border-bottom-color: #d1dbe5; }
.mz-tabs--right .mz-tabs__header.is-right {
  float: right;
  margin-bottom: 0;
  margin-left: 10px; }
.mz-tabs--right .mz-tabs__nav-wrap.is-right {
  margin-left: -1px; }
  .mz-tabs--right .mz-tabs__nav-wrap.is-right::after {
    left: 0;
    right: auto; }
.mz-tabs--right .mz-tabs__active-bar.is-right {
  left: 0; }
.mz-tabs--right.mz-tabs--card .mz-tabs__active-bar.is-right {
  display: none; }
.mz-tabs--right.mz-tabs--card .mz-tabs__item.is-right {
  border-bottom: none;
  border-top: 1px solid #e4e7ed; }
.mz-tabs--right.mz-tabs--card .mz-tabs__item.is-right:first-child {
  border-left: 1px solid #e4e7ed;
  border-top: none; }
.mz-tabs--right.mz-tabs--card .mz-tabs__item.is-right.is-active {
  border: 1px solid #e4e7ed;
  border-left-color: #fff;
  border-right: none;
  border-bottom: none; }
  .mz-tabs--right.mz-tabs--card .mz-tabs__item.is-right.is-active:first-child {
    border-top: none; }
  .mz-tabs--right.mz-tabs--card .mz-tabs__item.is-right.is-active:last-child {
    border-bottom: none; }
.mz-tabs--right.mz-tabs--card .mz-tabs__nav {
  border-radius: 0 4px 4px 0;
  border-bottom: 1px solid #e4e7ed;
  border-left: none; }
.mz-tabs--right.mz-tabs--border-card .mz-tabs__header.is-right {
  border-left: 1px solid #dfe4ed; }
.mz-tabs--right.mz-tabs--border-card .mz-tabs__item.is-right {
  border: 1px solid transparent;
  margin: -1px -1px -1px 0; }
  .mz-tabs--right.mz-tabs--border-card .mz-tabs__item.is-right.is-active {
    border-color: transparent;
    border-top-color: #d1dbe5;
    border-bottom-color: #d1dbe5; }

.slideInRight-transition,
.slideInLeft-transition {
  display: inline-block; }

.slideInRight-enter {
  animation: slideInRight-enter .3s; }

.slideInRight-leave {
  position: absolute;
  left: 0;
  right: 0;
  animation: slideInRight-leave .3s; }

.slideInLeft-enter {
  animation: slideInLeft-enter .3s; }

.slideInLeft-leave {
  position: absolute;
  left: 0;
  right: 0;
  animation: slideInLeft-leave .3s; }

@keyframes slideInRight-enter {
  0% {
    opacity: 0;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(100%);
    transform: translateX(100%); }
  to {
    opacity: 1;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(0);
    transform: translateX(0); } }
@keyframes slideInRight-leave {
  0% {
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1; }
  100% {
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
    opacity: 0; } }
@keyframes slideInLeft-enter {
  0% {
    opacity: 0;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%); }
  to {
    opacity: 1;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(0);
    transform: translateX(0); } }
@keyframes slideInLeft-leave {
  0% {
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1; }
  100% {
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    opacity: 0; } }
</style>
