import Vue from 'vue'
import App from './App'
// import './styles/index.css'
import './plugins/element'
import './filters';
import router from './router'
import store from './store'

Vue.config.productionTip = false;
Vue.config.devtools = false;

new Vue({

  router,
  store,
  // apolloProvider: createProvider(),
  render: h => h(App),

}).$mount('#app')

