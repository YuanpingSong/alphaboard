<template>
  <div class="StockChart">
    <highcharts class="stock" :constructor-type="'stockChart'" :options="stockOptions"></highcharts>
    <p @click="updateChart">Click Me </p>
  </div>
</template>

<script>
export default {
  name: 'StockChart',
  data () {
    return {
      stockOptions: {
        rangeSelector: {
          selected: 1
        },
        title: {
          text: ''
        },
        chart: {
          height: 600,
        },
        series: [{
          name: 'AAPL',
          data: [10, 20, 10, 23, 65, 121, 44, 66, 98, 30, 32, 56, 25, 12, 53],
          pointStart: Date.UTC(2018, 1, 1),
          pointInterval: 1000 * 3600 * 24,
          tooltip: {
            valueDecimals: 2
          }
        },
          {
            name: 'MSFT',
            data: [15, 27, 19, 33, 65, 121, 44, 66, 98, 30, 32, 56, 25, 12, 53],
            pointStart: Date.UTC(2018, 1, 1),
            pointInterval: 1000 * 3600 * 24,
            tooltip: {
              valueDecimals: 2
            }
          }]
      }
    }
  },
  mounted () {
    let boundUpdateChart = this.updateChart.bind(this);
    setInterval(boundUpdateChart, 1000);
  },
  methods: {
    updateChart: function () {
      console.log('Hi from updateChart');
      this.stockOptions.title.text ='MSFT Stock Price';
      this.stockOptions.series[0].data.push(Math.random() * 100);
    }
  }

}
</script>


<style scoped>
.stock {
  width: 100%;
  display:inline-block;
}

</style>

