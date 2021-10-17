var https = require('https');
var fs = require('fs');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

var port = process.env.PORT || 3510;

// var https_options = {
//     key: fs.readFileSync("/etc/apache2/ssl/private.key"),
//     cert: fs.readFileSync("/etc/apache2/ssl/public.crt"),
//     ca: fs.readFileSync('/etc/apache2/ssl/intermediate.crt')
// };

// var server = https.createServer(https_options, app);
// server.listen(port, function () {
//     console.log('Hello IREALLYHOST listening on port ' + server.address().port);
// });

app.listen(port, () => {
    console.log('running on http://localhost:' + port)
});

app.use(express.static(__dirname + '/www'));

const api = require('./service/app');
app.use(api);