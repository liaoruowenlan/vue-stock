// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
// import sockjs from "./assets/websoket/sockjs.min.js";
// import web from "./assets/websoket/stomp.js";
import './assets/css/index.css'
import axios from 'axios';
Vue.prototype.$axios=axios;

Vue.use(ElementUI)
axios.defaults.headers['Authorization']=sessionStorage.getItem('token')||' '
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8';
Vue.config.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
// axios.interceptors.request.use(function (config) {    // 这里的config包含每次请求的内容
//     var token = sessionStorage.getItem("token");
//     alert(token);
//     if (token) {
//         config.headers.Authorization = token;
//     }
//     return config;
// }, function (err) {
//     this.$message.error('服务器正在开小差，请稍后再试');
// });