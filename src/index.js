import HelloWorld from './components/HelloWorld';
import MzButton from './components/mz-button';
var components = [
  HelloWorld,
  MzButton
];
const install = function(Vue) {
  components.map(function(component) {
    Vue.component(component.name, component);
  });
};

export default {
  HelloWorld,
  MzButton
};

// // esri地图
// import EsriMap from './map_module/map/esrimap';

// const components = [
//   EsriMap
// ];

// function install(Vue, _) {
//   components.forEach(component => {
//     Vue.component(component.name, component);
//   });
// };
// export default {
//   EsriMap,
//   install
// };
