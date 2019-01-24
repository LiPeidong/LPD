// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vant from 'vant'; //引入vant
import 'vant/lib/index.css';
Vue.use(Vant);

import './assets/style/reset.css' //引入全局重置样式
import './assets/style/fnw.css' //引入全局重置样式

import './assets/js/components.js'
// import './assets/js/small-exif.js'
import './assets/js/IDcardCheck.js'
import './assets/fonts/iconfont.css'
import ElementUI from 'element-ui'; //引入elm
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
import axios from './http'//引入axios
Vue.prototype.$http = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

