const express = require('express');
const routes = require('./app/routes/user.routes');

const app = express();
app.use('/', routes);

module.exports = app;