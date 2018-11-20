const app = require('./app');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config');

mongoose.Promise = global.Promise;

const server = app.listen(process.env.PORT || 3000, () => {
    mongoose.connect(dbConfig.url, {
        useNewUrlParser: true
    }).then(() => {
        console.log('Successfully connected to the database');
        console.log(`Express is running on port ${server.address().port}`);
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
});