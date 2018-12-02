const User = require("../models/user.modals");

newUser = (req, res) => {
  console.log(req.body);
  console.log(req.headers);
  if (res.body === {})
    return res.status(400).send({
      message: "User content can not be empty"
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
    banned: req.body.banned
  });

  user
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
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
  User.findByIdAndUpdate(req.body.user._id, req.body.user).then(user => {
      if (!user){
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
