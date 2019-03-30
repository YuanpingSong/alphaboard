<template>
    <div class="Finance">
        <highcharts :options="chartOptions"></highcharts>
    </div>


</template>


<script>

    //import {Chart} from 'highcharts-vue'
    export default {
        name: 'Finance',
        props: {
            // msg: String
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

</style>
