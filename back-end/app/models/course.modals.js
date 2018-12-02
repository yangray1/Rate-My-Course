const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    courseCode: {
        type: String,
        unique: true,
        required: true
    },
    courseName: String,
    courseDesc: String
});

module.exports = mongoose.model('Course', CourseSchema);