const jwt = require('jsonwebtoken');

const User = require('../models/user.models');
const authConfig = require('../../config/auth.config');

module.exports = (req, res) => {
    User.findOne({
        username: req.body.username
    }).then(user => {
        if (user && user.password === req.body.password) {
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
        } else {
            res.status(200).send({
                success: false,
                message: 'The username and password do not match.'
            });
        }
    }).catch(err => {
        return res.status(500).send({
            message: 'Error retrieving user with username ' + Request.params.username
        });
    });
};