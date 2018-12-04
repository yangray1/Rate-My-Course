const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user.modals');
const authConfig = require('../../config/auth.config');

module.exports = (req, res) => {
    let user;

    User.findOne({
        username: req.body.username
    }).then(usr => {
        user = usr;
        return user ? bcrypt.compare(req.body.password, user.password) : Promise.reject('user not found');
    }).then(match => {
        if (!match) return Promise.reject('wrong password');
        const token = jwt.sign({
            username: user.username,
            isAdmin: user.isAdmin
        }, authConfig.secret);

        res.status(200).send({
            success: true,
            isAdmin: user.isAdmin,
            message: 'Authentication Successful!',
            user: user,
            token: token
        });
    }).catch(err => {
        return res.status(500).send({
            message: err + ': Error retrieving user with username ' + req.body.username
        });
    });
};