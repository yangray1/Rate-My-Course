const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');
const authMiddleware = require('../../auth.middleware');

const userRoute = '/api/users';

router.post(userRoute + '/save', user.newUser);
router.get(userRoute + '/profile/:username', authMiddleware, user.findUser);
router.get(userRoute + '/allUsers', user.allUsers); // authMiddleware, user.allUsers);
router.patch(userRoute + '/updateUser', user.updateUser);

module.exports = router;
