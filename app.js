// Import packages
const { json } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

require('dotenv').config();

// Import routes
const userRoute = require('./routes/user');
const postsRoute = require('./routes/posts');



// Export de l'application express
module.exports = app;