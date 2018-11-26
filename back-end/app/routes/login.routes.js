const express = require('express');
const router = express.Router();

const login = require('../controllers/login.controller');
const loginRoute = '/api/login';

router.post(loginRoute, login);

module.exports = router;
