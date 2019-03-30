<template>
  <div id="app">
      <Finance></Finance>
      <News></News>
  </div>
</template>

<script>
import Finance from './components/Finance.vue'
import News from './components/News.vue'
import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'
Vue.use(HighchartsVue)



export default {
  name: 'app',
  components: {
    Finance, News,
  }
}
</script>

<style>

</style>
