<template>
  <v-app id="app">
      <portfolio></portfolio>
      <Finance></Finance>
      <News></News>

      <v-card
              color="blue lighten-4"
              flat
              height="200px"
              tile
      >
          <v-toolbar dense>
              <v-toolbar-side-icon></v-toolbar-side-icon>

              <v-toolbar-title>Title</v-toolbar-title>

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


      <v-responsive>
          <v-container fill-height>
              <v-layout align-center>
                  <v-flex>
                      <h3 class="display-3">Welcome to the site</h3>

                      <span class="subheading">We provide personalized financial services that make money management so much easier!</span>

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
      </v-responsive>


      <Finance></Finance>
      <News></News>


  </v-app>
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
import Portfolio from './components/Portfolio.vue'

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
      Portfolio,
      // put additional single file components here
  }
}
</script>

<style>
    #inspire img {
        height: 100%
    }


</style>
