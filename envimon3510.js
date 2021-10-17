const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));

app.use(express.static(__dirname + '/www'));

app.listen(3510, () => {
    console.log('http://localhost:3510');
});

const api = require('./service/app');
app.use(api);