const { loginUser } = require('../controller/auth/loginUser');
const { registerUser } = require('../controller/auth/registerUser');
const express = require('express');
const Router = express.Router();

Router.post('/api/register', registerUser);
Router.post('/api/login', loginUser);

module.exports = Router;
