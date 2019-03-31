<template>
    <div class="Finance">
        <v-layout>
            <v-flex xs12 class='pa-3' v-if="isRealTime">
                <StockChart ></StockChart>
            </v-flex>
            <v-flex sm12 class='pa-3' v-if="!isRealTime">
                <highcharts :options="chartOptions"></highcharts>
            </v-flex>
        </v-layout>
        <v-btn block color="secondary" dark @click="toggleGraphs">Block Button</v-btn>
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
            }
        },
        watch: {
            isRealTime: async function () {
                if (this.isRealTime) {
                    return;
                }

                // otherwise, update chartOptions
                let res = await fetch('/getBR');
                let json = await res.json();
                let seires = json.sth; // edit this
                this.chartOptions.series = series;
            }
        },
        data () {
            return {
                isRealTime: true,
                chartOptions: {
                    series: [{
                        data: [1,2,3] // sample data
                    }]
                }
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
