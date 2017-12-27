export default {
  computed: {
    indexPath() {
      var path = [this.index];
      var parent = this.$parent;
      while (parent.$options.componentName !== 'MzMenu') {
        if (parent.index) {
          path.unshift(parent.index);
        }
        parent = parent.$parent;
      }
      return path;
    },
    rootMenu() {
      var parent = this.$parent;
      while (
        parent &&
        parent.$options.componentName !== 'MzMenu'
      ) {
        parent = parent.$parent;
      }
      return parent;
    },
    parentMenu() {
      let parent = this.$parent;
      while (
        parent &&
        ['MzMenu', 'MzSubmenu'].indexOf(parent.$options.componentName) === -1
      ) {
        parent = parent.$parent;
      }
      return parent;
    },
    paddingStyle() {
      if (this.rootMenu.mode !== 'vertical') return {};

      let padding = 20;
      let parent = this.$parent;
      while (parent && parent.$options.componentName !== 'MzMenu') {
        if (parent.$options.componentName === 'MzSubmenu') {
          padding += 20;
        }
        parent = parent.$parent;
      }
      return {paddingLeft: padding + 'px'};
    }
  }
};
