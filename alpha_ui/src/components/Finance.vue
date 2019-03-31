<template>
    <div class="Finance">
        <v-layout>
            <v-flex xs12 class='pa-3' v-show="isRealTime">
                <StockChart> </StockChart>
            </v-flex>
            <v-flex xs12 class='pa-3' v-show="!isRealTime">
                <v-layout row wrap>

                    <v-flex sm6 md4 class="pa-2" v-for="card in cards" v-if="card.value" :key="card.index">
                        <v-card :color="card.color" class="white--text" height="220">
                            <v-card-title primary-title>
                                <v-layout row wrap>
                                    <v-flex xs9>
                                        <div class="display-1">{{card.displayName}}</div>
                                        <span class="subheading">{{card.explaination}}</span>
                                    </v-flex>
                                    <v-flex xs3 class="display-2 pl-2">{{card.value}}</v-flex>
                                </v-layout>
                            </v-card-title>

                        </v-card>
                    </v-flex>

                </v-layout>
            </v-flex>
        </v-layout>
        <v-btn block color="blue darken-3 ma-2" dark @click="toggleGraphs">{{this.btnText}}</v-btn>
    </div>


</template>


<script>

    import StockChart from './StockChart.vue'
    export default {
        name: 'Finance',
        props: {
            // msg: String
        },
        components: {
            StockChart,
        },
        mounted() {

        },
        methods: {
            toggleGraphs: function () {
                this.isRealTime = !this.isRealTime;
                if (this.isRealTime) {
                    this.btnText = 'See Metrics';
                } else {
                    this.btnText = 'See Real-time Market Data';
                }
            }
        },
        watch: {
            isRealTime: async function () {
                if (this.isRealTime) {
                    return
                }

                // otherwise, update chartOptions
                let res = await fetch('/getBR');
                console.log('res');
                console.log(res);
                let json = await res.json();
                console.log('json');
                console.log(json);

                console.log('---------------------------');
                console.log(json.weightedAveragePerformance);

               if (json.weightedAveragePerformance) {
                   Object.keys(json.weightedAveragePerformance).forEach(key => {
                       let value = json.weightedAveragePerformance[key];
                       for (let card of this.cards) {
                           if (card.key == key) {
                               card.value = value;
                               break;
                           }
                       }
                   });
               }

                for (let card of this.cards) {
                    if (!card.value) {
                        card.value = 'N/A'
                    }
                }
            }
        },
        data () {
            return {
                isRealTime: true,
                btnText: 'See Metrics',
                cards: [
                    {
                        key: 'rnrRiskAdjustedReturnOverall',
                        displayName: 'Risk Adjusted Return Overall',
                        explaination: 'Risk-adjusted return is of how much return your investment has made relative to the amount of risk the investment has taken over a given period of time.',
                        value:  6.03,
                        color: 'deep-orange darken-2',
                        index: 0,
                    },
                    {
                        key: 'rnrRiskRatingOverall',
                        displayName: 'Risk Rating Overall',
                        explaination: 'Financial risk ratios are primarily used to assess a company\'s capital structure and current risk level as evaluated in relation to the company\'s debt level.',
                        value: 2.351,
                        color: 'pink darken-3',
                        index: 1,
                    },
                    {
                        key: 'rnrPerformanceRatingOverall',
                        displayName: 'Performance Rating Overall',
                        explaination: 'Financial performance is a subjective measure of how well a firm can use assets from its primary mode of business and generate revenues.',
                        value: 2.55,
                        color: 'indigo darken-4',
                        index: 2,
                    },
                    {
                        key: 'rnrPrimaryIndexAlphaY1',
                        displayName: 'Primary Index Alpha',
                        explaination: '"Alpha" (the Greek letter α) is a term used in investing to describe a strategy\'s ability to beat the market, or it\'s "edge." ',
                        value: -0.33,
                        color: 'blue-grey darken-3',
                        index: 3,
                    },
                    {
                        key: 'rnrPrimaryIndexBetaY1',
                        displayName: 'Primary Index Beta',
                        explaination: 'A beta coefficient is a measure of the volatility, or systematic risk, of an individual stock in comparison to the unsystematic risk of the entire market. ',
                        color: 'teal darken-3',
                        value:  0.76,
                        index: 4,
                    },
                    {
                        key: 'rnrSharpeRatioY1',
                        displayName: 'Sharpe Ratio',
                        explaination: 'The Sharpe ratio was developed by Nobel laureate William F. Sharpe and is used to help investors understand the return of an investment compared to its risk.',
                        value:  0.45,
                        color: 'green darken-4',
                        index: 5,
                    },
                    {
                        key: 'rnrStandardDeviationY1',
                        displayName: 'Standard Deviation',
                        explaination: 'The standard deviation (also represented by the lower case Greek letter sigma σ) is a measure that is used to quantify the amount of variation or dispersion of a set of data values.',
                        value: 11.0,
                        color: 'light-blue darken-4',
                        index: 6,
                    },
                    {
                        key: 'rnrVolatility',
                        displayName: 'Volatility',
                        explaination: 'Volatility is a statistical measure of the dispersion of returns for a given security or market index. In most cases, the higher the volatility, the riskier the security.',
                        value: 44.0,
                        color: 'red darken-4',
                        index: 7,
                    },
                    {
                        key: 'grossReturnSinceInception',
                        displayName: 'Gross Return Since Inception',
                        explaination: 'The gross return is the return on an investment before the deduction of taxes and expenses. Gross return is expressed in percentage terms. ',
                        value:  7.21,
                        color: 'cyan darken-4',
                        index: 8,
                    },
                ]
            }
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


#s {
    width: 600px;
    height: 500px;
    display:inline-block;
    margin-right: 50px;

}

</style>
