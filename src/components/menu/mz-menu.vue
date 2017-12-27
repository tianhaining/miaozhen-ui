<template>
  <ul class="mz-menu"
    :class="{
      'mz-menu--horizontal': mode === 'horizontal',
      'mz-menu--vertical': mode === 'vertical',
      'mz-menu--dark': theme === 'dark'
    }"
  >
    <slot></slot>
  </ul>
</template>
<script>
  import emitter from '@/mixins/emitter';
  import '@/theme-default/icon.css'
  export default {
    name: 'MzMenu',

    componentName: 'MzMenu',

    mixins: [emitter],

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
      theme: {
        type: String,
        default: 'light'
      },
      uniqueOpened: Boolean,
      router: Boolean,
      menuTrigger: {
        type: String,
        default: 'hover'
      }
    },
    data() {
      return {
        activedIndex: this.defaultActive,
        openedMenus: this.defaultOpeneds ? this.defaultOpeneds.slice(0) : [],
        items: {},
        submenus: {}
      };
    },
    watch: {
      defaultActive(value) {
        const item = this.items[value];
        if (item) {
          this.activedIndex = item.index;
          this.initOpenedMenu();
        } else {
          this.activedIndex = '';
        }

      },
      defaultOpeneds(value) {
        this.openedMenus = value;
      }
    },
    methods: {
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
        if (this.uniqueOpened) {
          this.openedMenus = openedMenus.filter(index => {
            return indexPath.indexOf(index) !== -1;
          });
        }
        this.openedMenus.push(index);
      },
      closeMenu(index, indexPath) {
        this.openedMenus.splice(this.openedMenus.indexOf(index), 1);
      },
      handleSubmenuClick(submenu) {
        const { index, indexPath } = submenu;
        let isOpened = this.openedMenus.indexOf(index) !== -1;

        if (isOpened) {
          this.closeMenu(index, indexPath);
          this.$emit('close', index, indexPath);
        } else {
          this.openMenu(index, indexPath);
          this.$emit('open', index, indexPath);
        }
      },
      handleItemClick(item) {
        let { index, indexPath } = item;
        this.activedIndex = item.index;
        this.$emit('select', index, indexPath, item);

        if (this.mode === 'horizontal') {
          this.openedMenus = [];
        }

        if (this.router) {
          this.routeToItem(item);
        }
      },
      // 初始化展开菜单
      initOpenedMenu() {
        const index = this.activedIndex;
        const activeItem = this.items[index];
        if (!activeItem || this.mode === 'horizontal') return;

        let indexPath = activeItem.indexPath;

        // 展开该菜单项的路径上所有子菜单
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
      }
    },
    mounted() {
      this.initOpenedMenu();
      this.$on('item-click', this.handleItemClick);
      this.$on('submenu-click', this.handleSubmenuClick);
    }
  };
</script>
<style lang="less">
@color: #b0b2b8;/*字体颜色*/
@background-color: #424242;/*dark时的颜色*/
@hoverColor: #434A50;/*hover时的颜色*/
@activeColor: #eb5958;/*active颜色*/
.commonStyle(@height, @line-height, @color) {
  position: relative;
  height: @height;
  line-height: @line-height;
  color: @color;
  cursor: pointer;
  font-size: 14px;
}
.mz-menu {
  list-style: none;
  &-item {
    .commonStyle(60px, 60px, @color);
    box-sizing: border-box;
    white-space: nowrap;
  }
  &--dark {
      background-color: @background-color;
      .mz-menu-item {
        .commonStyle(60px, 60px, @color);
      }
      .mz-menu-item:hover {
          background-color: @hoverColor;
      }
      .mz-submenu {
        &__title {
          .commonStyle(60px, 60px, @color);
        }
        .mz-menu {
          background-color: @background-color;
        }
      }
      .mz-submenu:hover {
          background-color: @hoverColor;
      }
  }
  &--horizontal {
    position: relative;
    margin: 0;
    display: block;
    border-bottom: 1px solid #e6e6e6;
    padding-left: 55px;
    border-right: none;
    .mz-menu-item {
      float: left;
      margin: 0;
      box-sizing: border-box;
      padding: 0 20px;
    }
    .mz-menu-item:hover {
      color: @activeColor;
    }
    .mz-submenu {
      float: left;
      margin: 0;
      box-sizing: border-box;
      padding: 0 20px;
      .commonStyle(60px, 60px, @color);
      .mz-menu {
        list-style: none;
        position: absolute;
        top: 65px;
        left: 0;
        border: 1px solid #e6e6e6;
        padding: 5px 0;
        z-index: 100;
        min-width: 100%;
        border-radius: 2px;
      }
      .mz-menu-item {
        float: none;
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
      }
    }
    .is-active{
      color: @activeColor !important;
      border-bottom: 2px solid @activeColor;
    }
  }
  &--vertical {
    position: relative;
    margin: 0;
    display: inline-block;
    border-right: 1px solid #e6e6e6;
    padding-left: 0px;
    width: 240px;
    text-align: left;
    min-height: 400px;
    .mz-menu-item:hover {
      color: @activeColor;
    }
    .mz-submenu {
      &__title {
        .commonStyle(60px, 60px, @color);
      }
      .mz-menu {
        padding-left: 0px;
      }
    }
    .is-active{
      color: @activeColor !important;
      border-right: 2px solid @activeColor;
    }
  }
  a {
    text-decoration: none;
    color: @color;
  }
  a:hover {
    text-decoration: none;
    color: @activeColor;
  }
}
.mz-menu:after {/*用于清除浮动*/
     content: ".";
     display:block;
     height: 0;
     clear: both;
     visibility: hidden;
}
</style>
