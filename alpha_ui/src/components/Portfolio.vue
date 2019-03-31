<template>
    <v-stepper v-model="step" vertical>
        <!--                         Step 1                            -->
        <v-stepper-step :complete="step > 1" step="1" @click="step = 1">
            Enter Tickers in Your Portfolio
        </v-stepper-step>

        <v-stepper-content step="1">
            <v-card color="grey lighten-4" class="pa-2" >
                <v-text-field v-for="ticker in tickers"
                              v-model="ticker.ticker" :label="'Stock # ' + ticker.index" :key="ticker.index">
                </v-text-field>
            </v-card>

            <template>
                <v-btn block color="secondary" dark @click="AddInputField">Add Another</v-btn>
            </template>

            <v-btn color="primary" @click="step = 2">Continue</v-btn>
            <v-btn flat @click="step = 0">Cancel</v-btn>
        </v-stepper-content>

        <!--                         Step 2                            -->
        <v-stepper-step :complete="step > 2" step="2">Enter Proportions </v-stepper-step>

        <v-stepper-content step="2">
            <v-card color="grey lighten-4" class="mb-5">
                <div v-for="ticker in tickers" :key="ticker.index" v-if="ticker.ticker" class="pa-3">
                    <v-subheader class="pl-0">{{ticker.ticker}} Proportion (1-100) </v-subheader>
                    <v-slider
                            v-model="ticker.proportion"
                            thumb-label
                    ></v-slider>
                </div>
            </v-card>
            <v-btn color="primary" @click="step = 3">Continue</v-btn>
            <v-btn flat @click="step = 0">Cancel</v-btn>
        </v-stepper-content>

        <!--                         Step 3                            -->
        <v-stepper-step :complete="step > 3" step="3">Which Technical Indicators Do You Want to See?</v-stepper-step>
        <v-stepper-content step="3">
            <v-card color="grey lighten-4" class="pa-3">
                <v-checkbox
                        v-model="indicators.performance"
                        label="Performance"
                ></v-checkbox>
                <v-checkbox
                        v-model="indicators.risk"
                        label="Risk"
                ></v-checkbox>
                <v-checkbox
                        v-model="indicators.expectedReturns"
                        label="Expected Returns"
                ></v-checkbox>
                <v-checkbox
                        v-model="indicators.stressTest"
                        label="Stress Test"
                ></v-checkbox>
            </v-card>
            <v-btn color="primary" @click="step = 4">Continue</v-btn>
            <v-btn flat @click="step = 0">Cancel</v-btn>
        </v-stepper-content>

        <!--                         Step 4                            -->
        <v-stepper-step step="4">Subscribe to Our Alerts!</v-stepper-step>
        <v-stepper-content step="4">
            <v-card color="grey lighten-4" class="ma-3" >
                <v-layout v-for="ticker in tickers" row wrap >
                    <v-flex sm12 class="ml-3">
                        <v-subheader class="pl-0" sm12> Set Notification Limits for {{ticker.ticker}} </v-subheader>
                    </v-flex>
                    <v-layout>
                        <v-flex sm6 class="ml-3 mr-3">
                            <v-text-field v-model="ticker.min" label="Maximum Threshold"></v-text-field>
                        </v-flex>
                        <v-flex sm6 class="ml-3 mr-3">
                            <v-text-field v-model="ticker.max" label="Minimum Threshold"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-layout>
            </v-card>
            <v-btn color="primary" @click="submitForm">Continue</v-btn>
            <v-btn flat @click="step = 0">Cancel</v-btn>
        </v-stepper-content>
    </v-stepper>

</template>


<script>
    export default {
        name: 'Portfolio',
        props: {
            // msg: String
        },
        components: {

        },
        mounted() {


        },
        methods: {
            AddInputField: function () {
                let ticker = {
                    index: (this.tickers.length + 1).toString(),
                    ticker: '',
                    proportion: undefined
                };
                this.tickers.push(ticker);
            },
            submitForm: function () {

            }
        },
        watch: {

            tickers: {
                handler (newQuestion, oldQuestion) {
                    console.log("hello from watch ")
                    let sum= 0;
                    for (let ticker of this.tickers) {
                        if (ticker.proportion) {
                            sum += ticker.proportion
                        }
                    }
                    console.log(sum);
                    if (sum > 100) {
                        sum -= 100;
                        while (sum) {
                            for (let i = 0; i < this.tickers.length; i++) {
                                if (this.tickers[i].proportion && this.tickers[i].proportion > 0) {
                                    this.tickers[i].proportion -= 1;
                                    sum -= 1;
                                    break;
                                }
                            }
                        }
                    }
                },
                deep: true,
            }
        },

        data () {
            return {
                step: 0,
                selected: [2],
                tickers: [
                    {
                        index: '1',
                        ticker: 'AAPL',
                        proportion: undefined,
                        min: undefined,
                        max: undefined,
                    },
                ],
                indicators : {
                    performance: false,
                    risk: false,
                    expectedReturns: false,
                    stressTest: false,
                },
                config: {
                    newsNotification: true,
                    stocksNotification: true,
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
