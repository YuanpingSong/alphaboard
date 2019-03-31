<template>
  <v-app id="app">



      <!--<v-card-->
              <!--color="blue lighten-4"-->
              <!--flat-->
              <!--height="200px"-->
              <!--tile-->
      <!--&gt;-->
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
      <!--</v-card>-->

      <v-parallax dark
              src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      >
          <v-layout class="display-1"
                  align-center
                  column
                  justify-center
          >
              <h1 class="font-weight-thin">AlphaBoard</h1>
              <vue-typed-js :strings="['Your Personal Financial Secretary', 'Keep Track of Everyday News']" :loop="true"
                            :showCursor="true">
                  <h4 class="typing"></h4>
              </vue-typed-js>
          </v-layout>
      </v-parallax>

      <portfolio></portfolio>
      <Finance class="f"></Finance>
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
  }//,
    // mounted() {
    //     let recaptchaScript = document.createElement('script')
    //     recaptchaScript.setAttribute('src', 'https://unpkg.com/vue-typer/dist/vue-typer.min.js')
    //     document.head.appendChild(recaptchaScript)
    // },
}
</script>

<style>
.f {
    width: 600px;
    height: 200px;
}

/*.line-1{*/
    /*position: relative;*/
    /*top: 50%;*/
    /*width: 24em;*/
    /*margin: 0 auto;*/
    /*border-right: 2px solid rgba(255,255,255,.75);*/
    /*font-size: 180%;*/
    /*text-align: center;*/
    /*white-space: nowrap;*/
    /*overflow: hidden;*/
    /*transform: translateY(-50%);*/
/*}*/

/* Animation */
/*.typewriter{*/
    /*animation: typewriter 2.5s steps(44) 1s 1 normal both,*/
    /*blinkTextCursor 500ms steps(44) infinite normal;*/
    /*font-family: 'Amiri';*/
    /*font-style: italic;*/
    /*font-size: 30px;*/
    /*text-align: center;*/
/*}*/

/*@keyframes typewriter{*/
    /*from{width: 0;}*/
    /*to{width: 10.8em;}*/
/*}*/
/*@keyframes blinkTextCursor{*/
    /*from{border-right-color: rgba(255,255,255,.75);}*/
    /*to{border-right-color: transparent;}*/
/*}*/
h1 {
    font-size: 70px;
    font-family: 'Cardo';
    text-align: center;
    margin-bottom: 30px;
}

h4 {
    font-size: 30px;
    font-family: 'Amiri';
    text-align: center;
}

</style>
