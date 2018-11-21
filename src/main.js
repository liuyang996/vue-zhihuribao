// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'
import { Toast } from 'mint-ui';
import VueLazyload from 'vue-lazyload'
import 'lib-flexible/flexible.js'
import './assets/css/style.css'
Vue.prototype.$axios = Axios;
Axios.defaults.baseURL = ''
Axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.use(VueLazyload)
// 按需引入部分组件
Vue.prototype.$toast = Toast;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
