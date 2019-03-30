const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send("OK")
});

// use port 8080 in your local environment. ports bellow 1024 requires sudo 
app.listen(8080, function () {
    console.log('Server listening on port 8080');
});
