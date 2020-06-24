import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 公共资源组件引入
import './common.components.register'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
