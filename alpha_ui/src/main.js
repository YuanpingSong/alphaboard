import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import App from './App.vue'
import HighchartsVue from 'highcharts-vue'
// index.js or main.js
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
Vue.use(HighchartsVue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
