const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./app/routes/user.routes');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/', routes);

app.use(express.static(__dirname + '/dist/rate-my-courses'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/rate-my-courses/index.html'));
});

module.exports = app;
