<template>
    <div class="Finance">
        <highcharts :options="chartOptions"></highcharts>
        <StockChart id="s"></StockChart>
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
}

</style>
