const bodyParser = require('body-parser');
const express = require('express');
const flatten = require('flat');
const app = express();
const BRAPIRequest = 'https://www.blackrock.com/tools/hackathon/portfolio-analysis?';
var fullBRAPIRequest = '';
const AVAPIRequest = 'https://www.alphavantage.co/query?';
const AVapikey = '1A89300OHUE3QR58';
var fullAVAPIRequest = '';

app.get('/', function (req, res) {
    res.send("OK")
});

/*
app.post('/hello', function (req, res) {
  const queryParams = req.query;
  const name = queryParams.name;
  res.send('POST: Hello, ' + name);
});

 */

app.post('/getBR', function (req, res) {
    const queryParams = req.query;
    const positions = queryParams.positions;
    const currency = queryParams.currency;
    const calculateRisk = queryParams.calculateRisk;
    const calculateExpectedReturns = queryParams.calculateExpectedReturns;
    const calculateStressTests = queryParams.calculateStressTests;
    fullBRAPIRequest = BRAPIRequest + 'positions=' + positions + '&currency=' + currency + '&calculateRisk=' + calculateRisk +
        '&calculateExpectedReturns=' + calculateExpectedReturns + '&calculateStressTests' + calculateStressTests;
    res.json(fetchBRData());
});

async function fetchBRData() {
    const response = await fetch(fullBRAPIRequest);
    const intermediate = await response.json();
    return {
        'weightedAveragePerformance': intermediate.resultMap.PORTFOLIOS[0].portfolios[0].returns.weightedAveragePerformance,
        'performanceChart': intermediate.resultMap.PORTFOLIOS[0].portfolios[0].returns.performanceChart
    };
}

app.post('/getAV', function (req, res) {
    const queryParams = req.query;
    const ticker = queryParams.ticker;
    const interval = queryParams.interval;
    fullAVAPIRequest = AVAPIRequest + 'function=TIME_SERIES_INTRADAY' + '&symbol=' + ticker + '&interval=' + interval + '&apikey=' +
        AVapikey;
    res.json(fetchAVData(interval));
});

async function fetchAVData(interval) {
    const response = await fetch(fullAVAPIRequest);
    const intermediate = await response.json();
    var priceArray = [];
    var volumeArray = [];
    var key = `Time Series (${interval})`;
    for (time in intermediate[key]) {
        var pair = [];
        pair[0] = time;
        pair[1] = intermediate[key][time]['1. open'];
        priceArray.push(pair);
    }
    for (time in intermediate[key]) {
        var pair = [];
        pair[0] = time;
        pair[1] = intermediate[key][time]['5. volume'];
        volumeArray.push(pair);
    }
    return {
        'price': priceArray,
        'volume': volumeArray
    };
}

// use port 8080 in your local environment. ports bellow 1024 requires sudo 
app.listen(8080, function () {
    console.log('Server listening on port 8080');
});
