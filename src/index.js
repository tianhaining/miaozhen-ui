import MzButton from './components/mz-button';
import MzRadio from './components/mz-radio';
var components = [
  MzButton,
  MzRadio
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
  version: '1.0.4',
  install,
  MzButton,
  MzRadio
};
