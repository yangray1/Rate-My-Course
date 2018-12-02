const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    course: {
        type: String,
        required: true
    },
    reviewer: {
        type: String,
        required: true
    },
    profName: {
        type: String,
        required: true
    },
    overallRating: {
        type: Number,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    workload: {
        type: Number,
        required: true
    },
    hoursPerWeek: {
        type: Number,
        required: true
    },
    textbookUsed: {
        type: Boolean,
        required: true
    },
    gradeReceived: {
        type: String,
        required: true
    },
    writtenReview: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Review', ReviewSchema);