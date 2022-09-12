import Vue from 'vue';
import App from './App.vue';
import data from './data';
import myFunc from './myfunc';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

myFunc(data.message);
myFunc(data.anotherMessage);
