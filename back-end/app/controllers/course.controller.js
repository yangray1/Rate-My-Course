const Course = require("../models/course.modals");

getAllCourseCodes = (req, res) => {
    Course.find({}, {})
}

getCourseByCourseCode = (req, res) => {

}