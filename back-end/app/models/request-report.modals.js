const mongoose = require('mongoose');

const RequestReportSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    resolved: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    content: {
        type: Object,
        required: true
    },
});

module.exports = mongoose.model('RequestReport', RequestReportSchema);
