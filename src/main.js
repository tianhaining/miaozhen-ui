// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
// import MiaozhenUI from 'miaozhen-ui';
// import 'miaozhen-ui/dist/static/css/app.css';
import MiaozhenUI from 'miaozhen-ued';
import 'miaozhen-ued/dist/static/css/app.css';
Vue.use(MiaozhenUI);
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
