<template>
    <v-stepper v-model="step" vertical dark>
        <!--                         Step 1                            -->
        <v-stepper-step :complete="step > 1" step="1" @click="step = 1">
            Enter Tickers in Your Portfolio
        </v-stepper-step>

        <v-stepper-content step="1">
            <v-card class="pa-2" >
                <v-text-field dark v-for="ticker in tickers"
                              v-model="ticker.ticker" :label="'Stock # ' + ticker.index" :key="ticker.index">
                </v-text-field>
            </v-card>

            <template>
                <v-btn block color="secondary" dark @click="AddInputField">Add Another</v-btn>
            </template>

            <v-btn color="primary" @click="step=2">Continue</v-btn>
            <v-btn flat @click="resetState">Cancel</v-btn>
        </v-stepper-content>

        <!--                         Step 2                            -->
        <v-stepper-step :complete="step > 2" step="2">Enter Proportions </v-stepper-step>

        <v-stepper-content step="2">
            <v-card class="mb-5">
                <div v-for="ticker in tickers" :key="ticker.index" v-if="ticker.ticker" class="pa-3">
                    <v-subheader class="pl-1">{{ticker.ticker}} Proportion (1-100) </v-subheader>
                    <v-slider
                            v-model="ticker.proportion"
                            thumb-label
                    ></v-slider>
                </div>
            </v-card>
            <v-btn color="primary" @click="validateProportion">Continue</v-btn>
            <v-btn flat @click="resetState">Cancel</v-btn>
        </v-stepper-content>

        <!--                         Step 3                            -->
        <v-stepper-step :complete="step > 3" step="3">Which Technical Indicators Do You Want to See?</v-stepper-step>
        <v-stepper-content step="3">
            <v-card class="pa-3">
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
            <v-btn flat @click="resetState">Cancel</v-btn>
        </v-stepper-content>

        <!--                         Step 4                            -->
        <v-stepper-step step="4">Subscribe to Our Alerts!</v-stepper-step>
        <v-stepper-content step="4">
            <v-card class="ma-3" >
                <v-layout v-for="ticker in tickers" v-if="ticker.ticker" row wrap >
                    <v-flex sm12 class="ml-3">
                        <v-subheader class="pl-0" sm12> Set Notification Limits for {{ticker.ticker}} </v-subheader>
                    </v-flex>
                    <v-layout>
                        <v-flex sm6 class="ml-3 mr-3">
                            <v-text-field v-model="ticker.max" label="Maximum Threshold"></v-text-field>
                        </v-flex>
                        <v-flex sm6 class="ml-3 mr-3">
                            <v-text-field v-model="ticker.min" label="Minimum Threshold"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-layout>
                <v-text-field v-model="config.phoneNumber" label="Your phone number" class="pl-3"
                              placeholder="+1 310 123 1234"></v-text-field>
                <v-checkbox
                        v-model="config.newsNotification"
                        label="Sign up for Text News Notifications"
                        class="pl-3"
                ></v-checkbox>
                <v-checkbox
                        v-model="config.stocksNotification"
                        label="Sign up for Text Market Notifications"
                        class="pl-3"
                ></v-checkbox>
            </v-card>
            <v-btn color="primary" @click="submitForm">Continue</v-btn>
            <v-btn flat @click="resetState">Cancel</v-btn>
        </v-stepper-content>

        <v-snackbar v-model="snackbar" :timeout="timeout"> {{snackText}}
            <v-btn
                    color="pink"
                    flat
                    @click="snackbar = false"
            >
                Fix
            </v-btn>
        </v-snackbar>
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

                const event = new Event('grewPortfolio');
                document.dispatchEvent(event);
            },
            submitForm: async function () {
                // validate step 4 inputs
                if ((this.config.newsNotification || this.config.stocksNotification) && (!this.config.phoneNumber)) {
                    this.snackText = 'Please provide a phone number if you wish to receive our notifications!';
                    this.snackbar = true;
                    return;
                }

                for (let ticker of this.tickers) {
                    if ( (ticker.min && ticker.min < 0) || (ticker.max && ticker.max < 0)) {
                        this.snackText = 'Limit price must be positive!';
                        this.snackbar = true;
                        return;
                    }

                    if (ticker.min && ticker.max && ticker.max < ticker.min) {
                        this.snackText = 'Max Limit must be no less than min limit';
                        this.snackbar = true;
                        return;
                    }
                }

                // remove empty ticker
                const filtered = this.tickers.filter(function(value, index, arr) {
                   return value.ticker;
                });

                // submit form
                this.config.phoneNumber = this.config.phoneNumber.replace(/\s/g,'');
                const payload = {
                    portfolio: filtered,
                    indicators: this.indicators,
                    configuration: this.config,
                };

                console.log(JSON.stringify(payload));
                try {
                    await fetch('/register', {
                        method: 'POST',
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    });
                } catch (err) {
                    this.snackText = "Failed to register due to " + err.message;
                    this.snackbar = true;
                }
            },
            validateProportion: function () {
                let sum = 0;
                for (let ticker of this.tickers) {
                    if (ticker.ticker) {
                        sum += ticker.proportion;
                    }
                }
                if (sum != 100) {

                    this.snackText = 'Proportions should add up to 100, Now: ' + sum.toString();
                    this.snackbar = true;
                } else {
                    this.step += 1;
                }
            },
            resetState: function () {
                this.step = 0;
                this.tickers = [
                    {
                        index: '1',
                        ticker: 'AAPL',
                        proportion: undefined,
                        min: undefined,
                        max: undefined,
                    },
                ];
            },

        },
        watch: {

        },

        data () {
            return {
                timeout: 5000,
                step: 0,
                snackbar: false,
                snackText: '',
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
                    performance: true,
                    risk: true,
                    expectedReturns: true,
                    stressTest: true,
                },
                config: {
                    newsNotification: true,
                    stocksNotification: true,
                    phoneNumber: undefined,
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
