import MzButton from './components/mz-button';
import MzRadio from './components/mz-radio';
const components = [
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

module.exports =  {
  version: '1.0.1',
  MzButton,
  MzRadio
};

module.exports.default = module.exports;
