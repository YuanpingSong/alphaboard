<template>
    <div class="Finance">
        <v-layout>
            <v-flex xs12 class='pa-3'>
                <StockChart ></StockChart>
            </v-flex>
            <!-- <v-flex sm6 class='pa-3'>
                <highcharts :options="chartOptions"></highcharts>
            </v-flex> -->

        </v-layout>
        
        
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

        },
        data () {
            return {
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
