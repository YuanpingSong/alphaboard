<template>
  <div id="app">

      <v-card
              color="grey lighten-4"
              flat
              height="200px"
              tile
      >
          <v-toolbar dense>
              <v-toolbar-side-icon></v-toolbar-side-icon>

              <v-toolbar-title>AlphaBoard</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                  <v-icon>search</v-icon>
              </v-btn>

              <v-btn icon>
                  <v-icon>favorite</v-icon>
              </v-btn>

              <v-btn icon>
                  <v-icon>more_vert</v-icon>
              </v-btn>
          </v-toolbar>
      </v-card>

      <!--<v-img src="webwxgetmsgimg.jpeg" max-height="1000" max-width="1000">-->
          <!--<v-layout-->
                  <!--align-center-->
                  <!--column-->
                  <!--justify-center-->
          <!--&gt;-->
              <!--<h1 class="display-2 font-weight-thin mb-3">Vuetify.js</h1>-->
              <!--<h4 class="subheading">Build your application today!</h4>-->
          <!--</v-layout>-->
      <!--</v-img>-->

      <Finance class="f"></Finance>
      <News class="n"></News>


  </div>
</template>



<script>
import Vue from 'vue'

// component library
import Vuetify from 'vuetify'

// charting library
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import mapInit from 'highcharts/modules/map'

// single file components
import Finance from './components/Finance.vue'
import News from './components/News.vue'

// register plugins
Vue.use(Vuetify)
Vue.use(HighchartsVue)

// register highcharts constructors
stockInit(Highcharts)
mapInit(Highcharts)


export default {
  name: 'app',
  components: {
      Finance,
      News,
      // put additional single file components here
  }
}
</script>

<style>
.f {
    width: 600px;
    height: 200px;
}
.f {display:inline-block;margin-right:10px;}

</style>
