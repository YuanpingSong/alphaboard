<template>

  <div class="StockChart" class="text-xs-center">
    <highcharts class="stock" :constructor-type="'stockChart'" :options="stockOptions" v-if="inRealTime"></highcharts>
  </div>
</template>

<script>
export default {
  name: 'StockChart',

  data () {
    return {
      inRealTime: true,
      intervalVar: undefined,
      showProgress: true,
      stockOptions: {
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
              fontFamily: 'Helvetica, sans-serif'
          },
          height: 600,
          plotBorderColor: '#606063'
      },
        title: {
          text: '',
          style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
            fontSize: '20px'
          }
        },
        subtitle: {
          style: {
            color: '#E0E0E3',
            textTransform: 'uppercase'
          }
        },
        xAxis: {
          gridLineColor: '#707073',
          labels: {
            style: {
              color: '#E0E0E3'
            }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          title: {
            style: {
              color: '#A0A0A3'

            }
          }
        },
        yAxis: {
          gridLineColor: '#707073',
          labels: {
            style: {
              color: '#E0E0E3'
            }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          tickWidth: 1,
          title: {
            style: {
              color: '#A0A0A3'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          style: {
            color: '#F0F0F0'
          }
        },
        plotOptions: {
          series: {
            dataLabels: {
              color: '#B0B0B3'
            },
            marker: {
              lineColor: '#333'
            }
          },
          boxplot: {
            fillColor: '#505053'
          },
          candlestick: {
            lineColor: 'white'
          },
          errorbar: {
            color: 'white'
          }
        },
        legend: {
          itemStyle: {
            color: '#E0E0E3'
          },
          itemHoverStyle: {
            color: '#FFF'
          },
          itemHiddenStyle: {
            color: '#606063'
          }
        },
        credits: {
          style: {
            color: '#666'
          }
        },
        labels: {
          style: {
            color: '#707073'
          }
        },

        drilldown: {
          activeAxisLabelStyle: {
            color: '#F0F0F3'
          },
          activeDataLabelStyle: {
            color: '#F0F0F3'
          }
        },

        navigation: {
          buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
              fill: '#505053'
            }
          }
        },

        // scroll charts
        rangeSelector: {
          buttonTheme: {
            fill: '#505053',
            stroke: '#000000',
            style: {
              color: '#CCC'
            },
            states: {
              hover: {
                fill: '#707073',
                stroke: '#000000',
                style: {
                  color: 'white'
                }
              },
              select: {
                fill: '#000003',
                stroke: '#000000',
                style: {
                  color: 'white'
                }
              }
            }
          },
          inputBoxBorderColor: '#505053',
          inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
          },
          labelStyle: {
            color: 'silver'
          }
        },

        navigator: {
          handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
          },
          outlineColor: '#CCC',
          maskFill: 'rgba(255,255,255,0.1)',
          series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
          },
          xAxis: {
            gridLineColor: '#505053'
          }
        },

        scrollbar: {
          barBackgroundColor: '#808083',
          barBorderColor: '#808083',
          buttonArrowColor: '#CCC',
          buttonBackgroundColor: '#606063',
          buttonBorderColor: '#606063',
          rifleColor: '#FFF',
          trackBackgroundColor: '#404043',
          trackBorderColor: '#404043'
        },

        // special colors for some of the
        legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        background2: '#505053',
        dataLabelsColor: '#B0B0B3',
        textColor: '#C0C0C0',
        contrastTextColor: '#F0F0F3',
        maskColor: 'rgba(255,255,255,0.3)',

        series: []
      }
    }
  },
  mounted () {
    this.updateChart();
    // let boundUpdateChart = this.simulateUpdate.bind(this);
    // this.intervalVar = setInterval(boundUpdateChart, 2000);
  },
  methods: {
    updateChart: async function () {
      this.stockOptions.title.text ='Portfolio (Real time)';
      // this.stockOptions.series[0].data.push(Math.random() * 100);
      let res = await fetch('/getAV');
      let json = await res.json();

      let series = []
      Object.keys(json).forEach(key => {

          let temp = {};
          temp.data= [];
          temp.name = key;
          console.log(json);
          let value = json[key];
          value.price.forEach(function (pair) {
            temp.data.push(parseFloat(pair[1]))
          });
          temp.data.reverse();
          temp.pointStart = Date.parse(value.price[value.price.length - 1][0]);
          temp.pointInterval = 1000 * 60;
          temp.tooltip = {
            valueDecimals: 2,
          };
          series.push(temp);

      });
      this.stockOptions.series = series;
    },
    simulateUpdate: function () {
      for (let series of this.stockOptions.series) {
       series.data.push(series.data[series.data.length-1]*(0.98 + 0.04*Math.random()));
      }
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

