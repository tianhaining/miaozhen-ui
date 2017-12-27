import MzButton from './components/mz-button';/*按钮*/
import MzRadio from './components/mz-radio';/*单选框*/
import MzBreadcrumb from './components/breadcrumb/mz-breadcrumb'/*面包屑导航*/
import MzBreadcrumbItem from './components/breadcrumb/mz-breadcrumb-item'/*面包屑导航其中一项*/
import MzMenu from './components/menu/mz-menu'/*导航*/
import MzSubmenu from './components/menu/mz-submenu'/*子导航*/
import MzMenuItem from './components/menu/mz-menu-item'/*导航条中的其中一项*/
var components = [
  MzButton,
  MzRadio,
  MzBreadcrumb,
  MzBreadcrumbItem,
  MzMenu,
  MzSubmenu,
  MzMenuItem
];

const install = function(Vue) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default {
  version: '1.0.8',
  install,
  MzButton,
  MzRadio,
  MzBreadcrumb,
  MzBreadcrumbItem,
  MzMenu,
  MzSubmenu,
  MzMenuItem
};
