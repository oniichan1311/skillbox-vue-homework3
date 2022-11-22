import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// import data from './data';
// import myFunc from './myfunc';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');

// myFunc(data.message);
// myFunc(data.anotherMessage);
