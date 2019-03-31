<template>
  <v-app id="app">

      <!--           navigation               -->
      <v-toolbar dense dark>
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


      <v-parallax dark
              src="https://s3-us-west-1.amazonaws.com/ypsongresume/lacitydark_compressed.jpg" :height="bgHeight" class="blur"
      >
      <v-layout row wrap align-center>
          <v-flex xs6 id="transparent">
              <portfolio ></portfolio>
          </v-flex>
          <v-flex xs6 class="display-1">
              <v-layout justify-center column align-center>
                  <v-flex xs12>
                      <h1 class="font-weight-thin">AlphaBoard</h1>
                  </v-flex>
                  <v-flex xs12>
                      <vue-typed-js :strings="['Your Personal Financial Secretary', 'Keep Track of Everyday News']" :loop="true"
                                    :showCursor="true">
                          <h4 class="typing font-weight-thin font-italic" ></h4>
                      </vue-typed-js>
                  </v-flex>
              </v-layout>

          </v-flex>

      </v-layout>
      </v-parallax>


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
    data () {
      return {
          bgHeight: 800,
      };
    },
    mounted () {
        document.addEventListener('grewPortfolio', this.increaseHeight);
    },
    methods: {
        increaseHeight: function () {
            this.bgHeight += 68;
        }
    },


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

.blur img {
    filter: blur(1px);
    -webkit-filter: blur(8px);

}

#transparent {
    opacity:0.85;
}



</style>
