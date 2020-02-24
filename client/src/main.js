// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketIO from 'vue-socket.io';
import socketio from 'socket.io-client';
import BootStrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// export const SocketInstance = new socketio('http://localhost:3000');
// Vue.use(VueSocketIO, SocketInstance)

Vue.use(new VueSocketIO({
  debug : true,
  connection: 'localhost:3000'
}));

Vue.use(BootStrapVue);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
