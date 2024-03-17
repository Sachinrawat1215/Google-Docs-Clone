const { loginUser } = require('../controller/auth/loginUser');
const { registerUser } = require('../controller/auth/registerUser');
const createDocument = require('../controller/documents/createDocument');
const express = require('express');
const {
  getAllUserDocuments,
} = require('../controller/documents/getAllDocuments');
const Router = express.Router();

// Authentication Routes
Router.post('/api/register', registerUser);
Router.post('/api/login', loginUser);

// Document Routes
Router.post('/api/doc/create', createDocument);
Router.get('/api/docs/:userId', getAllUserDocuments);

module.exports = Router;
