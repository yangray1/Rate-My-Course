const User = require("../models/user.modals");
const bcrypt = require("bcryptjs");

newUser = (req, res) => {
  if (res.body === {})
    return res.status(400).send({
      message: "User content can not be empty"
    });

  bcrypt.genSalt(10).then(salt => {
    return bcrypt.hash(req.body.password, salt)
  }).then(hash => {

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      yearOfStudy: req.body.yearOfStudy,
      programOfStudy: req.body.programOfStudy,
      courses: req.body.courses,
      takenCourses: req.body.takenCourses,
      password: hash,
      isAdmin: req.body.isAdmin,
      banned: req.body.banned
    });

    return user.save()
  }).then(newUser => {
    res.send(newUser);
  }).catch(err => {
    res.status(200).send({
      message: err || "Some error occurred while creating the User."
    });
  });
};

allUsers = (req, res) => {
  User.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving all users."
      });
    });
};

findUser = (req, res) => {
  User.findOne({
      username: req.params.username
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with username " + req.params.username
        });
      }
      res.send(user);
    })
    .catch(err => {
      return res.status(500).send({
        message: "Error retrieving user with username " + Request.params.username
      });
    });
};


updateUser = (req, res) => {
  // We pass in the user object. Ex: {user: {..}}
  // 1st argumnet, we get the id with the user object. users.id = xxxxx
  // 2nd argumnet is the whole user object.
  User.findByIdAndUpdate(req.body._id, req.body).then(user => {
    if (!user) {
      res.status(404).send({
        message: "User not found with username " + username
      });
    }
    // Update the user.
    res.send(user);

  })
};


module.exports = {
  newUser,
  allUsers,
  findUser,
  updateUser,
};