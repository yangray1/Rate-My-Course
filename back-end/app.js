const express = require('express');
const routes = require('./app/routes/user.routes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/', routes);

module.exports = app;
