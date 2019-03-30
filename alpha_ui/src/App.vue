<template>
  <div id="app">
      <Fiance></Fiance>
      <News></News>
  </div>
</template>

<script>
import Finance from './components/Finance.vue'
import News from './components/News.vue'


export default {
  name: 'app',
  components: {
    Finance, News
  }
}
</script>

<style>

</style>
