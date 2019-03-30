<template>
  <div id="app">
      <Finance></Finance>
      <News></News>

      <v-jumbotron>
          <v-container fill-height>
              <v-layout align-center>
                  <v-flex>
                      <h3 class="display-3">Welcome to the site</h3>

                      <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>

                      <v-divider class="my-3"></v-divider>

                      <div class="title mb-3">Check out our newest features!</div>

                      <v-btn
                              class="mx-0"
                              color="primary"
                              large
                      >
                          See more
                      </v-btn>
                  </v-flex>
              </v-layout>
          </v-container>
      </v-jumbotron>


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

</style>
