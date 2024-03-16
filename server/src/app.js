// Import required modules
const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const Connection = require('./database/db');
const socketFunctions = require('./controller/socketFunctions');
const routes = require('./routes/auth.routes');

// Load environment variables
dotenv.config();

// Set up Express app
const app = express();
const server = http.createServer(app);

// Set up middleware for parsing JSON and URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

// Set up MongoDB connection
const URL = process.env.MONGODB_URI;
Connection(URL);

// Set up Socket.IO functions
socketFunctions(server);

// Set up routes
app.use('/', routes);

// Define port numbers
const EXPRESS_PORT = process.env.EXPRESS_PORT || 8000;

// Set up Express server
server.listen(EXPRESS_PORT, () => {
  console.log(`Server is running on PORT number ${EXPRESS_PORT}`);
});
