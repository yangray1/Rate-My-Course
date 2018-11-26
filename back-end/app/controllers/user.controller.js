const User = require('../models/user.models');

newUser = (req, res) => {
    console.log(req.body)
    console.log(req.headers)
    if (res.body === {})
        return res.status(400).send({
            message: "User content can not be empty",
        });

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        yearOfStudy: req.body.yearOfStudy,
        programOfStudy: req.body.programOfStudy,
        courses: req.body.courses,
        takenCourses: req.body.takenCourses,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        banned: req.body.banned,
    });


    user.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the User.'
        });
    });
};

allUsers = (req, res) => {
    User.find().then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving all users.'
        });
    });
};

findUser = (req, res) => {
    User.findOne({
        username: req.params.username
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: 'User not found with username ' + req.params.username
            });
        }
        res.send(user);
    }).catch(err => {
        return res.status(500).send({
            message: 'Error retrieving user with username ' + Request.params.username
        });
    });
};

updateUser = (req, res) => {

};

deleteUser = (req, res) => {

};

module.exports = {
    newUser,
    allUsers,
    findUser,
    updateUser,
    deleteUser,
};