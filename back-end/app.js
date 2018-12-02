const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./app/routes/user.routes');
const loginRoutes = require('./app/routes/login.routes');
const requestReportRoutes = require('./app/routes/request-report.routes');
const reviewRoutes = require('./app/routes/review.routes');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/', userRoutes);
app.use('/', loginRoutes);
app.use('/', requestReportRoutes);
app.use('/', reviewRoutes);

app.use(express.static(__dirname + '/../rate-my-courses/dist/rate-my-courses'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../rate-my-courses/dist/rate-my-courses/index.html'));
});

module.exports = app;
