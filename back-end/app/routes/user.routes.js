const user = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

const userRoute = '/api/users/';

router.post(userRoute + 'save', user.newUser);
router.get(userRoute + 'profile/:username', user.findUser);
router.get(userRoute + 'allUsers', user.allUsers);

module.exports = router;