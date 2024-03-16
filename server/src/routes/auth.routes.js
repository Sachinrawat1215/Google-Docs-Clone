const { registerUser } = require('../controller/auth/registerUser');
const express = require('express');
const Router = express.Router();

Router.post('/api/register', registerUser);

module.exports = Router;
