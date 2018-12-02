const Course = require("../models/course.modals");

getAllCourseCodes = (req, res) => {
    Course.find({}, {courseCode: 1}).then(
        (courses) => {
            res.send({ courses })
        }
    ).catch((error) => {
		res.status(400).send(error)
	})
}

getCourseByCourseCode = (req, res) => {
    const course_code = req.params.course_code;

    Course.find({courseCode: course_code}).then(
        (course) => {
            if (course.length != 0){
                res.send({ course })
            }
            res.status(404).send()
        }
    ).catch((error) => {
		res.status(400).send(error)
	})
}

addCourse = (req, res) => {
    const new_course = new Course({
        courseCode: req.body.courseCode,
        courseName: req.body.courseName,
        courseDesc: req.body.courseDesc
    });

    new_course.save().then(
        (course) => {
            res.send({ course });
        }
    ).catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Course."
        });
      });
}

/* {courseCode: ______, courseName: ____, courseDesc: _____} */
modifyCourse = (req, res) => {
    const course_id = req.params.course_id; // the mongo generated _id

    Course.findById(course_id).then(
        (course) => {
            if (!course){
                console.log("cannot find this id")
                res.status(404).send()
            }
            else{
                course.courseCode = req.body.courseCode;
                course.courseName = req.body.courseName;
                course.courseDesc = req.body.courseDesc;
                return course.save()
            }
        }
    ).then(
        (course) => {
            res.send(course)
        }
    ).catch((error) => {
		res.status(400).send(error)
	})
}

module.exports = {
    getAllCourseCodes,
    getCourseByCourseCode,
    addCourse,
    modifyCourse
}