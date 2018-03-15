<template>
  <mz-menu-collapse-transition>
    <ul class="mz-menu"
      :key="+collapse"
      :style="{ backgroundColor: backgroundColor || '' }"
      :class="{
        'mz-menu--horizontal': mode === 'horizontal',
        'mz-menu--collapse': collapse
      }"
      role="menubar"
    >
      <slot></slot>
    </ul>
  </mz-menu-collapse-transition>
</template>
<script>
  import emitter from '@/mixins/emitter';
  import Migrating from '@/mixins/migrating';
  import Menubar from '@/utils/menu/aria-menubar';
  import { addClass, removeClass, hasClass } from '@/utils/dom';

  export default {
    name: 'MzMenu',

    componentName: 'MzMenu',

    mixins: [emitter, Migrating],

    provide() {
      return {
        rootMenu: this
      };
    },

    components: {
      'mz-menu-collapse-transition': {
        functional: true,
        render(createElement, context) {
          const data = {
            props: {
              mode: 'out-in'
            },
            on: {
              beforeEnter(el) {
                el.style.opacity = 0.2;
              },

              enter(el) {
                addClass(el, 'mz-opacity-transition');
                el.style.opacity = 1;
              },

              afterEnter(el) {
                removeClass(el, 'mz-opacity-transition');
                el.style.opacity = '';
              },

              beforeLeave(el) {
                if (!el.dataset) el.dataset = {};

                if (hasClass(el, 'mz-menu--collapse')) {
                  removeClass(el, 'mz-menu--collapse');
                  el.dataset.oldOverflow = el.style.overflow;
                  el.dataset.scrollWidth = el.scrollWidth;
                  addClass(el, 'mz-menu--collapse');
                }

                el.style.width = el.scrollWidth + 'px';
                el.style.overflow = 'hidden';
              },

              leave(el) {
                if (!hasClass(el, 'mz-menu--collapse')) {
                  addClass(el, 'horizontal-collapse-transition');
                  el.style.width = '64px';
                } else {
                  addClass(el, 'horizontal-collapse-transition');
                  el.style.width = el.dataset.scrollWidth + 'px';
                }
              },

              afterLeave(el) {
                removeClass(el, 'horizontal-collapse-transition');
                if (hasClass(el, 'mz-menu--collapse')) {
                  el.style.width = el.dataset.scrollWidth + 'px';
                } else {
                  el.style.width = '64px';
                }
                el.style.overflow = el.dataset.oldOverflow;
              }
            }
          };
          return createElement('transition', data, context.children);
        }
      }
    },

    props: {
      mode: {
        type: String,
        default: 'vertical'
      },
      defaultActive: {
        type: String,
        default: ''
      },
      defaultOpeneds: Array,
      uniqueOpened: Boolean,
      router: Boolean,
      menuTrigger: {
        type: String,
        default: 'hover'
      },
      collapse: Boolean,
      backgroundColor: String,
      textColor: String,
      activeTextColor: String
    },
    data() {
      return {
        activeIndex: this.defaultActive,
        openedMenus: (this.defaultOpeneds && !this.collapse) ? this.defaultOpeneds.slice(0) : [],
        items: {},
        submenus: {}
      };
    },
    computed: {
      hoverBackground() {
        return this.backgroundColor ? this.mixColor(this.backgroundColor, 0.2) : '';
      },
      isMenuPopup() {
        return this.mode === 'horizontal' || (this.mode === 'vertical' && this.collapse);
      }
    },
    watch: {
      defaultActive: 'updateActiveIndex',

      defaultOpeneds(value) {
        if (!this.collapse) {
          this.openedMenus = value;
        }
      },

      collapse(value) {
        if (value) this.openedMenus = [];
        this.broadcast('MzSubmenu', 'toggle-collapse', value);
      }
    },
    methods: {
      updateActiveIndex() {
        const item = this.items[this.defaultActive];
        if (item) {
          this.activeIndex = item.index;
          this.initOpenedMenu();
        } else {
          this.activeIndex = null;
        }
      },

      getMigratingConfig() {
        return {
          props: {
            'theme': 'theme is removed.'
          },
          events: {
            selectionchange: 'selectionchange is renamed to selection-change.'
          }
        };
      },
      getColorChannels(color) {
        color = color.replace('#', '');
        if (/^[0-9a-fA-F]{3}$/.test(color)) {
          color = color.split('');
          for (let i = 2; i >= 0; i--) {
            color.splice(i, 0, color[i]);
          }
          color = color.join('');
        }
        if (/^[0-9a-fA-F]{6}$/.test(color)) {
          return {
            red: parseInt(color.slice(0, 2), 16),
            green: parseInt(color.slice(2, 4), 16),
            blue: parseInt(color.slice(4, 6), 16)
          };
        } else {
          return {
            red: 255,
            green: 255,
            blue: 255
          };
        }
      },
      mixColor(color, percent) {
        let { red, green, blue } = this.getColorChannels(color);
        if (percent > 0) { // shade given color
          red *= 1 - percent;
          green *= 1 - percent;
          blue *= 1 - percent;
        } else { // tint given color
          red += (255 - red) * percent;
          green += (255 - green) * percent;
          blue += (255 - blue) * percent;
        }
        return `rgb(${ Math.round(red) }, ${ Math.round(green) }, ${ Math.round(blue) })`;
      },
      addItem(item) {
        this.$set(this.items, item.index, item);
      },
      removeItem(item) {
        delete this.items[item.index];
      },
      addSubmenu(item) {
        this.$set(this.submenus, item.index, item);
      },
      removeSubmenu(item) {
        delete this.submenus[item.index];
      },
      openMenu(index, indexPath) {
        let openedMenus = this.openedMenus;
        if (openedMenus.indexOf(index) !== -1) return;
        // 将不在该菜单路径下的其余菜单收起
        // collapse all menu that are not under current menu item
        if (this.uniqueOpened) {
          this.openedMenus = openedMenus.filter(index => {
            return indexPath.indexOf(index) !== -1;
          });
        }
        this.openedMenus.push(index);
      },
      closeMenu(index) {
        const i = this.openedMenus.indexOf(index);
        if (i !== -1) {
          this.openedMenus.splice(i, 1);
        }
      },
      handleSubmenuClick(submenu) {
        const { index, indexPath } = submenu;
        let isOpened = this.openedMenus.indexOf(index) !== -1;

        if (isOpened) {
          this.closeMenu(index);
          this.$emit('close', index, indexPath);
        } else {
          this.openMenu(index, indexPath);
          this.$emit('open', index, indexPath);
        }
      },
      handleItemClick(item) {
        let { index, indexPath } = item;
        this.activeIndex = item.index;
        this.$emit('select', index, indexPath, item);

        if (this.mode === 'horizontal' || this.collapse) {
          this.openedMenus = [];
        }

        if (this.router) {
          this.routeToItem(item);
        }
      },
      // 初始化展开菜单
      // initialize opened menu
      initOpenedMenu() {
        const index = this.activeIndex;
        const activeItem = this.items[index];
        if (!activeItem || this.mode === 'horizontal' || this.collapse) return;

        let indexPath = activeItem.indexPath;

        // 展开该菜单项的路径上所有子菜单
        // expand all submenus of the menu item
        indexPath.forEach(index => {
          let submenu = this.submenus[index];
          submenu && this.openMenu(index, submenu.indexPath);
        });
      },
      routeToItem(item) {
        let route = item.route || item.index;
        try {
          this.$router.push(route);
        } catch (e) {
          console.error(e);
        }
      },
      open(index) {
        const { indexPath } = this.submenus[index.toString()];
        indexPath.forEach(i => this.openMenu(i, indexPath));
      },
      close(index) {
        this.closeMenu(index);
      }
    },
    mounted() {
      this.initOpenedMenu();
      this.$on('item-click', this.handleItemClick);
      this.$on('submenu-click', this.handleSubmenuClick);
      if (this.mode === 'horizontal') {
        new Menubar(this.$el); // eslint-disable-line
      }
      this.$watch('items', this.updateActiveIndex);
    }
  };
</script>
<style lang="less">
.mz-menu {
  border-right: solid 1px #e6e6e6;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #fff; }
  .mz-menu::before,
  .mz-menu::after {
    display: table;
    content: ""; }

  .mz-menu::after {
    clear: both; }
  .mz-menu--horizontal {
    border-right: none;
    border-bottom: solid 1px #e6e6e6; }
    .mz-menu--horizontal > .mz-menu-item {
      float: left;
      height: 60px;
      line-height: 60px;
      margin: 0;
      border-bottom: 2px solid transparent;
      color: #909399; }
      .mz-menu--horizontal > .mz-menu-item a,
      .mz-menu--horizontal > .mz-menu-item a:hover {
        color: inherit; }
      .mz-menu--horizontal > .mz-menu-item:hover, .mz-menu--horizontal > .mz-menu-item:focus {
        background-color: #fff; }
    .mz-menu--horizontal > .mz-submenu {
      float: left; }
      .mz-menu--horizontal > .mz-submenu:focus, .mz-menu--horizontal > .mz-submenu:hover {
        outline: none; }
        .mz-menu--horizontal > .mz-submenu:focus .mz-submenu__title, .mz-menu--horizontal > .mz-submenu:hover .mz-submenu__title {
          color: #303133; }
      .mz-menu--horizontal > .mz-submenu.is-active .mz-submenu__title {
        border-bottom: 2px solid #eb3433;
        color: #303133; }
      .mz-menu--horizontal > .mz-submenu .mz-submenu__title {
        height: 60px;
        line-height: 60px;
        border-bottom: 2px solid transparent;
        color: #909399; }
        .mz-menu--horizontal > .mz-submenu .mz-submenu__title:hover {
          background-color: #fff; }
      .mz-menu--horizontal > .mz-submenu .mz-submenu__icon-arrow {
        position: static;
        vertical-align: middle;
        margin-left: 8px;
        margin-top: -3px; }
    .mz-menu--horizontal .mz-menu .mz-menu-item {
      background-color: #fff;
      float: none;
      height: 36px;
      line-height: 36px;
      padding: 0 10px;
      color: #909399; }
      .mz-menu--horizontal .mz-menu .mz-menu-item.is-active {
        color: #303133; }
    .mz-menu--horizontal .mz-menu-item:hover, .mz-menu--horizontal .mz-menu-item:focus {
      outline: none;
      color: #303133; }
    .mz-menu--horizontal > .mz-menu-item.is-active {
      border-bottom: 2px solid #eb3433;
      color: #303133; }
  .mz-menu--collapse {
    width: 64px; }
    .mz-menu--collapse > .mz-menu-item [class^="el-icon-"],
    .mz-menu--collapse > .mz-submenu > .mz-submenu__title [class^="el-icon-"] {
      margin: 0;
      vertical-align: middle;
      width: 24px;
      text-align: center; }
    .mz-menu--collapse > .mz-menu-item .mz-submenu__icon-arrow,
    .mz-menu--collapse > .mz-submenu > .mz-submenu__title .mz-submenu__icon-arrow {
      display: none; }
    .mz-menu--collapse > .mz-menu-item span,
    .mz-menu--collapse > .mz-submenu > .mz-submenu__title span {
      height: 0;
      width: 0;
      overflow: hidden;
      visibility: hidden;
      display: inline-block; }
    .mz-menu--collapse > .mz-menu-item.is-active i {
      color: inherit; }
    .mz-menu--collapse .mz-menu .mz-submenu {
      min-width: 200px; }
    .mz-menu--collapse .mz-submenu {
      position: relative; }
      .mz-menu--collapse .mz-submenu .mz-menu {
        position: absolute;
        margin-left: 5px;
        top: 0;
        left: 100%;
        z-index: 10;
        border: 1px solid #e4e7ed;
        border-radius: 2px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); }
      .mz-menu--collapse .mz-submenu.is-opened > .mz-submenu__title .mz-submenu__icon-arrow {
        transform: none; }
  .mz-menu--popup {
    z-index: 100;
    min-width: 200px;
    border: none;
    padding: 5px 0;
    border-radius: 2px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); }
    .mz-menu--popup-bottom-start {
      margin-top: 5px; }
    .mz-menu--popup-right-start {
      margin-left: 5px; }

.mz-menu-item {
  height: 56px;
  line-height: 56px;
  font-size: 14px;
  color: #303133;
  padding: 0 20px;
  list-style: none;
  cursor: pointer;
  position: relative;
  transition: border-color .3s, background-color .3s, color .3s;
  box-sizing: border-box;
  white-space: nowrap; }
  .mz-menu-item [class^="el-icon-"] {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle; }
  .mz-menu-item * {
    vertical-align: middle; }
  .mz-menu-item:first-child {
    margin-left: 0; }
  .mz-menu-item:last-child {
    margin-right: 0; }
  .mz-menu-item:hover, .mz-menu-item:focus {
    outline: none;
    background-color: #ecf5ff; }
  .mz-menu-item i {
    color: #909399; }
  .mz-menu-item.is-active {
    color: #eb3433; }
    .mz-menu-item.is-active i {
      color: inherit; }

.mz-submenu {
  list-style: none;
  margin: 0;
  padding-left: 0; }
  .mz-submenu__title {
    position: relative;
    height: 56px;
    line-height: 56px;
    font-size: 14px;
    color: #303133;
    padding: 0 20px;
    list-style: none;
    cursor: pointer;
    position: relative;
    transition: border-color .3s, background-color .3s, color .3s;
    box-sizing: border-box;
    white-space: nowrap; }
    .mz-submenu__title * {
      vertical-align: middle; }
    .mz-submenu__title i {
      color: #909399; }
    .mz-submenu__title:hover {
      background-color: #ecf5ff; }
  .mz-submenu .mz-menu {
    border: none; }
  .mz-submenu .mz-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 45px;
    min-width: 200px; }
  .mz-submenu__icon-arrow {
    position: absolute;
    top: 50%;
    right: 20px;
    margin-top: -7px;
    transition: transform .3s;
    font-size: 12px; }
  .mz-submenu.is-active .mz-submenu__title {
    border-bottom-color: #eb3433; }
  .mz-submenu.is-opened > .mz-submenu__title .mz-submenu__icon-arrow {
    transform: rotateZ(180deg); }
  .mz-submenu [class^="el-icon-"] {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px; }

.mz-menu-item-group > ul {
  padding: 0; }
.mz-menu-item-group__title {
  padding: 7px 0 7px 20px;
  line-height: normal;
  font-size: 12px;
  color: #909399; }

.horizontal-collapse-transition .mz-submenu__title .mz-submenu__icon-arrow {
  transition: .2s;
  opacity: 0; }
</style>
