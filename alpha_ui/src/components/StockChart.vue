<template>
<<<<<<< HEAD
  <div class="StockChart" style="height:600px">
=======
>>>>>>> b3b92dcaa1433458478d74d4465a747168148655
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
        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
        backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
                [0, '#2a2a2b'],
                [1, '#3e3e40']
            ]
        },
        style: {
            fontFamily: '\'Unica One\', sans-serif'
        },
        plotBorderColor: '#606063'
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

