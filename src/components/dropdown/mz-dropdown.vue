<script>
  import Clickoutside from '@/utils/clickoutside';
  import Emitter from '@/mixins/emitter';
  import Migrating from '@/mixins/migrating';
  import MzButton from '@/components/button/mz-button';
  import MzButtonGroup from '@/components/button/mz-button-group';
  import { generateId } from '@/utils/util';

  export default {
    name: 'MzDropdown',

    componentName: 'MzDropdown',

    mixins: [Emitter, Migrating],

    directives: { Clickoutside },

    components: {
      MzButton,
      MzButtonGroup
    },

    provide() {
      return {
        dropdown: this
      };
    },

    props: {
      trigger: {
        type: String,
        default: 'hover'
      },
      type: String,
      size: {
        type: String,
        default: ''
      },
      splitButton: Boolean,
      hideOnClick: {
        type: Boolean,
        default: true
      },
      placement: {
        type: String,
        default: 'bottom-end'
      },
      visibleArrow: {
        default: true
      },
      showTimeout: {
        type: Number,
        default: 250
      },
      hideTimeout: {
        type: Number,
        default: 150
      }
    },

    data() {
      return {
        timeout: null,
        visible: false,
        triggerElm: null,
        menuItems: null,
        menuItemsArray: null,
        dropdownElm: null,
        focusing: false
      };
    },

    computed: {
      dropdownSize() {
        return this.size || (this.$ELEMENT || {}).size;
      },
      listId() {
        return `dropdown-menu-${generateId()}`;
      }
    },

    mounted() {
      this.$on('menu-item-click', this.handleMenuItemClick);
      this.initEvent();
      this.initAria();
    },

    watch: {
      visible(val) {
        this.broadcast('MzDropdownMenu', 'visible', val);
        this.$emit('visible-change', val);
      },
      focusing(val) {
        const selfDefine = this.$el.querySelector('.mz-dropdown-selfdefine');
        if (selfDefine) { // 自定义
          if (val) {
            selfDefine.className += ' focusing';
          } else {
            selfDefine.className = selfDefine.className.replace('focusing', '');
          }
        }
      }
    },

    methods: {
      getMigratingConfig() {
        return {
          props: {
            'menu-align': 'menu-align is renamed to placement.'
          },
          events: {
            selectionchange: 'selectionchange is renamed to selection-change.'
          }
        };
      },
      show() {
        if (this.triggerElm.disabled) return;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.visible = true;
        }, this.showTimeout);
      },
      hide() {
        if (this.triggerElm.disabled) return;
        this.removeTabindex();
        this.resetTabindex(this.triggerElm);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.visible = false;
        }, this.hideTimeout);
      },
      handleClick() {
        if (this.triggerElm.disabled) return;
        if (this.visible) {
          this.hide();
        } else {
          this.show();
        }
      },
      handleTriggerKeyDown(ev) {
        const keyCode = ev.keyCode;
        if ([38, 40].indexOf(keyCode) > -1) { // up/down
          this.removeTabindex();
          this.resetTabindex(this.menuItems[0]);
          this.menuItems[0].focus();
          ev.preventDefault();
          ev.stopPropagation();
        } else if (keyCode === 13) { // space enter选中
          this.handleClick();
        } else if ([9, 27].indexOf(keyCode) > -1) { // tab || esc
          this.hide();
        }
        return;
      },
      handleItemKeyDown(ev) {
        const keyCode = ev.keyCode;
        const target = ev.target;
        const currentIndex = this.menuItemsArray.indexOf(target);
        const max = this.menuItemsArray.length - 1;
        let nextIndex;
        if ([38, 40].indexOf(keyCode) > -1) { // up/down
          if (keyCode === 38) { // up
            nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
          } else { // down
            nextIndex = currentIndex < max ? currentIndex + 1 : max;
          }
          this.removeTabindex();
          this.resetTabindex(this.menuItems[nextIndex]);
          this.menuItems[nextIndex].focus();
          ev.preventDefault();
          ev.stopPropagation();
        } else if (keyCode === 13) { // enter选中
          this.triggerElm.focus();
          target.click();
          if (!this.hideOnClick) { // click关闭
            this.visible = false;
          }
        } else if ([9, 27].indexOf(keyCode) > -1) { // tab // esc
          this.hide();
          this.triggerElm.focus();
        }
        return;
      },
      resetTabindex(ele) { // 下次tab时组件聚焦元素
        this.removeTabindex();
        ele.setAttribute('tabindex', '0'); // 下次期望的聚焦元素
      },
      removeTabindex() {
        this.triggerElm.setAttribute('tabindex', '-1');
        this.menuItemsArray.forEach((item) => {
          item.setAttribute('tabindex', '-1');
        });
      },
      initAria() {
        this.dropdownElm.setAttribute('id', this.listId);
        this.triggerElm.setAttribute('aria-haspopup', 'list');
        this.triggerElm.setAttribute('aria-controls', this.listId);
        this.menuItems = this.dropdownElm.querySelectorAll("[tabindex='-1']");
        this.menuItemsArray = Array.prototype.slice.call(this.menuItems);

        if (!this.splitButton) { // 自定义
          this.triggerElm.setAttribute('role', 'button');
          this.triggerElm.setAttribute('tabindex', '0');
          this.triggerElm.setAttribute('class', (this.triggerElm.getAttribute('class') || '') + ' mz-dropdown-selfdefine'); // 控制
        }
      },
      initEvent() {
        let { trigger, show, hide, handleClick, splitButton, handleTriggerKeyDown, handleItemKeyDown } = this;
        this.triggerElm = splitButton
          ? this.$refs.trigger.$el
          : this.$slots.default[0].elm;

        let dropdownElm = this.dropdownElm = this.$slots.dropdown[0].elm;

        this.triggerElm.addEventListener('keydown', handleTriggerKeyDown); // triggerElm keydown
        dropdownElm.addEventListener('keydown', handleItemKeyDown, true); // item keydown
        // 控制自定义元素的样式
        if (!splitButton) {
          this.triggerElm.addEventListener('focus', () => {
            this.focusing = true;
          });
          this.triggerElm.addEventListener('blur', () => {
            this.focusing = false;
          });
          this.triggerElm.addEventListener('click', () => {
            this.focusing = false;
          });
        }
        if (trigger === 'hover') {
          this.triggerElm.addEventListener('mouseenter', show);
          this.triggerElm.addEventListener('mouseleave', hide);
          dropdownElm.addEventListener('mouseenter', show);
          dropdownElm.addEventListener('mouseleave', hide);
        } else if (trigger === 'click') {
          this.triggerElm.addEventListener('click', handleClick);
        }
      },
      handleMenuItemClick(command, instance) {
        if (this.hideOnClick) {
          this.visible = false;
        }
        this.$emit('command', command, instance);
      }
    },

    render(h) {
      let { hide, splitButton, type, dropdownSize } = this;

      var handleMainButtonClick = (event) => {
        this.$emit('click', event);
        hide();
      };

      let triggerElm = !splitButton
        ? this.$slots.default
        : (<mz-button-group>
          <mz-button type={type} size={dropdownSize} nativeOn-click={handleMainButtonClick}>
            {this.$slots.default}
          </mz-button>
          <mz-button ref="trigger" type={type} size={dropdownSize} class="mz-dropdown__caret-button">
            <i class="mz-dropdown__icon mz-icon-arrow-down"></i>
          </mz-button>
        </mz-button-group>);

      return (
        <div class="mz-dropdown" v-clickoutside={hide}>
          {triggerElm}
          {this.$slots.dropdown}
        </div>
      );
    }
  };
</script>
<style lang="less">
.mz-dropdown {
  display: inline-block;
  position: relative;
  color: #606266;
  font-size: 14px; }
  .mz-dropdown .mz-button-group {
    display: block; }
    .mz-dropdown .mz-button-group .mz-button {
      float: none; }
  .mz-dropdown .mz-dropdown__caret-button {
    padding-left: 5px;
    padding-right: 5px;
    position: relative;
    border-left: none; }
    .mz-dropdown .mz-dropdown__caret-button::before {
      content: '';
      position: absolute;
      display: block;
      width: 1px;
      top: 5px;
      bottom: 5px;
      left: 0;
      background: rgba(255, 255, 255, 0.5); }
    .mz-dropdown .mz-dropdown__caret-button:hover::before {
      top: 0;
      bottom: 0; }
    .mz-dropdown .mz-dropdown__caret-button .mz-dropdown__icon {
      padding-left: 0; }
  .mz-dropdown__icon {
    font-size: 12px;
    margin: 0 3px; }
  .mz-dropdown .mz-dropdown-selfdefine:focus:active, .mz-dropdown .mz-dropdown-selfdefine:focus:not(.focusing) {
    outline-width: 0; }

.mz-dropdown-menu {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 10px 0;
  margin: 5px 0;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); }
  .mz-dropdown-menu__item {
    list-style: none;
    line-height: 36px;
    padding: 0 20px;
    margin: 0;
    font-size: 14px;
    color: #606266;
    cursor: pointer;
    outline: none; }
    .mz-dropdown-menu__item:not(.is-disabled):hover, .mz-dropdown-menu__item:focus {
      background-color: #ecf5ff;
      color: #eb3332; }
    .mz-dropdown-menu__item--divided {
      position: relative;
      margin-top: 6px;
      border-top: 1px solid #ebeef5; }
      .mz-dropdown-menu__item--divided:before {
        content: '';
        height: 6px;
        display: block;
        margin: 0 -20px;
        background-color: #fff; }
    .mz-dropdown-menu__item.is-disabled {
      cursor: default;
      color: #bbb;
      pointer-events: none; }
  .mz-dropdown-menu--medium {
    padding: 6px 0; }
    .mz-dropdown-menu--medium .mz-dropdown-menu__item {
      line-height: 30px;
      padding: 0 17px;
      font-size: 14px; }
      .mz-dropdown-menu--medium .mz-dropdown-menu__item.mz-dropdown-menu__item--divided {
        margin-top: 6px; }
        .mz-dropdown-menu--medium .mz-dropdown-menu__item.mz-dropdown-menu__item--divided:before {
          height: 6px;
          margin: 0 -17px; }
  .mz-dropdown-menu--small {
    padding: 6px 0; }
    .mz-dropdown-menu--small .mz-dropdown-menu__item {
      line-height: 27px;
      padding: 0 15px;
      font-size: 13px; }
      .mz-dropdown-menu--small .mz-dropdown-menu__item.mz-dropdown-menu__item--divided {
        margin-top: 4px; }
        .mz-dropdown-menu--small .mz-dropdown-menu__item.mz-dropdown-menu__item--divided:before {
          height: 4px;
          margin: 0 -15px; }
  .mz-dropdown-menu--mini {
    padding: 3px 0; }
    .mz-dropdown-menu--mini .mz-dropdown-menu__item {
      line-height: 24px;
      padding: 0 10px;
      font-size: 12px; }
      .mz-dropdown-menu--mini .mz-dropdown-menu__item.mz-dropdown-menu__item--divided {
        margin-top: 3px; }
        .mz-dropdown-menu--mini .mz-dropdown-menu__item.mz-dropdown-menu__item--divided:before {
          height: 3px;
          margin: 0 -10px; }
</style>
