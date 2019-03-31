const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const express = require('express');
const flatten = require('flat');
const app = express();
const BRAPIRequest = 'https://www.blackrock.com/tools/hackathon/portfolio-analysis?';
var fullBRAPIRequest = '';
const AVAPIRequest = 'https://www.alphavantage.co/query?';
const AVapikey = '1A89300OHUE3QR58';
var fullAVAPIRequest = '';
var monitorAVAPIRequest = '';
const temPhoneNum = '+14244022075';
const twilioAuth = {
    'accountSid': 'ACc7e00247ad8e7e8c5f4e06fba407a6fd',
    'authToken': 'a01c1d7bead6bbc06e4278ee690c1633',
    'from': '+17076060583'
};
const client = require('twilio')(twilioAuth.accountSid, twilioAuth.authToken);
var userData = {};
app.use(express.static('alpha_ui/dist'));
var erBase = require("eventregistry");
var er = new erBase.EventRegistry({apiKey: "89c5ed5c-7159-4fa5-984f-47390eb9b977"});
var fourNews = [];
er.getCategoryUri("business").then((categoryUri) => {
    var q = new erBase.QueryArticles({
        categoryUri: categoryUri,
        isDuplicateFilter: "skipDuplicates", // possible values are "skipDuplicates" or "keepOnlyDuplicates" or "keepAll";
        requestedResult: new erBase.RequestArticlesInfo({
            page: 1,
            count: 4,
            sortBy: "rel",
            returnInfo: new erBase.ReturnInfo()
        })
    });
    return er.execQuery(q);
}).then((response) => {
    let i = 0;
    for (i; i < 4; i++) {
        fourNews.push({
            imageSrc: response.articles.results[i].image,
            title: response.articles.results[i].title,
            body: response.articles.results[i].body,
            url: response.articles.results[i].url
        });
    }
});

app.get('/news', function (req, res) {
    res.json(fourNews);
});

app.post('/register', bodyParser(), function (req, res) {
    userData = req.body;
    res.send('Register successfully sent!');
});

app.get('/getBR', async function (req, res) {
    // const queryParams = req.query;
    let positions = '';
    let i = 0;
    for (i; i < userData.portfolio.length; i++) {
        positions += userData.portfolio[i].ticker;
        positions += '~';
        positions += userData.portfolio[i].proportion.toString();
        positions += '%7C';
    }
    const currency = 'USD';
    const calculateRisk = userData.indicators.risk.toString();
    const calculateExpectedReturns = userData.indicators.expectedReturns.toString();
    const calculateStressTests = userData.indicators.stressTest.toString();
    fullBRAPIRequest = BRAPIRequest + 'positions=' + positions + '&calculateExposures=true&currency=' + currency + '&calculateRisk=' + calculateRisk +
        '&calculateExpectedReturns=' + calculateExpectedReturns + '&calculateStressTests=' + calculateStressTests;
    console.log(fullBRAPIRequest);
    let result = await fetchBRData();
    console.log(JSON.stringify(result));
    res.json(result);
});

async function fetchBRData() {
    const response = await fetch(fullBRAPIRequest);
    const intermediate = await response.json();
    console.log(intermediate);
    console.log('------------------------------------------------------')
    console.log(intermediate.resultMap);
    console.log('------------------------------------------------------')
    console.log(intermediate.resultMap.PORTFOLIOS[0]);
    console.log('------------------------------------------------------')
    console.log(intermediate.resultMap.PORTFOLIOS[0].portfolios[0]);
    console.log('------------------------------------------------------')
    console.log(intermediate.resultMap.PORTFOLIOS[0].portfolios[0].returns);
    return {
        'weightedAveragePerformance': intermediate.resultMap.PORTFOLIOS[0].portfolios[0].returns.weightedAveragePerformance,
        // 'performanceChart': intermediate.resultMap.PORTFOLIOS[0].portfolios[0].returns.performanceChart
    };
}

app.get('/getAV', async function (req, res) {
    console.log("getAV")
    monitorAVData();
    setInterval(monitorAVData, 300000);
    let i = 0;
    let final = {};
    for (i; i < userData.portfolio.length; i++) {
        fullAVAPIRequest = AVAPIRequest + 'function=TIME_SERIES_INTRADAY' + '&symbol=' + userData.portfolio[i].ticker + '&interval=1min' + '&outputsize=full' +
            '&apikey=' + AVapikey;
        final[userData.portfolio[i].ticker] = await fetchAVData();
    }

    final['average'] = {};
    let j = 0;
    final['average']['price'] = [];
    for (j; j < 1000; j++) {
        let k = 0;
        let averageVal = 0;
        for (k; k < userData.portfolio.length; k++) {
            averageVal += parseFloat(final[userData.portfolio[k].ticker].price[j][1])/k;

        }
        final['average']['price'].push([final[userData.portfolio[0].ticker].price[j][0], averageVal.toString() ]);
        // console.log(final);
    }
    res.json(final);
});

async function fetchAVData() {
    const response = await fetch(fullAVAPIRequest);
    const intermediate = await response.json();
    let priceArray = [];
    let volumeArray = [];
    let key = 'Time Series (1min)';
    let counter = 0;
    for (time in intermediate[key]) {
        if (counter >= 1000)
            break;
        let pricePair = [];
        pricePair[0] = time;
        pricePair[1] = intermediate[key][time]['1. open'];
        priceArray.push(pricePair);
        let volumePair = [];
        volumePair[0] = time;
        volumePair[1] = intermediate[key][time]['5. volume'];
        volumeArray.push(volumePair);
        counter++;
    }
    return {
        'price': priceArray,
        'volume': volumeArray
    };
}

function sendSMS(client, content) {
    console.log(userData.configuration.phoneNumber);
    client.messages.create({
        body: content,
        from: twilioAuth.from,
        to: userData.configuration.phoneNumber,
    }).then(message => console.log(message.sid));
}

async function monitorAVData() {
    console.log("monitor")
    let i = 0;
    for (i; i < userData.portfolio.length; i++) {
        monitorAVAPIRequest = AVAPIRequest + 'function=TIME_SERIES_INTRADAY' + '&symbol=' + userData.portfolio[i].ticker + '&interval=5min' +
            '&apikey=' + AVapikey;
        const response = await fetch(monitorAVAPIRequest);
        const intermediate = await response.json();
        let counter = 0;
        let prev = 0;
        let curr = 0;
        sendSMS(client, `Your stock ${userData.portfolio[i].ticker} rose above ${userData.portfolio[i].max} now!`);
       /* for (time in intermediate['Time Series (5min)']) {
            if (counter === 0) {
                curr = parseFloat(intermediate['Time Series (5min)'][time]['1. open']);
                if (hasOwnProperty('max') && parseInt(userData.portfolio[i].max) < curr) {

                } else if (hasOwnProperty('min')) {
                    sendSMS(client, `Your stock ${userData.portfolio[i].ticker} dropped below ${userData.portfolio[i].min} now!`);
                }
                counter += 1;
            } else if (counter === 1) {
                prev = parseFloat(intermediate['Time Series (5min)'][time]['1. open']);
                if (curr - prev >= prev * 0.01) {
                    sendSMS(client, `Your stock ${userData.portfolio[i].ticker} was 1% in the latest 5 minutes!`);
                } else if (curr - prev <= -prev * 0.01) {
                    sendSMS(client, `Your stock ${userData.portfolio[i].ticker} was down 1% in the latest 5 minutes!`);
                }
            } else
                break;
        }*/
    }

}

// use port 8080 in your local environment. ports bellow 1024 requires sudo 
app.listen(8080, function () {
    console.log('Server listening on port 8080');
});

