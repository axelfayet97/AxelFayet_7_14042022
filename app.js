// Import packages
const { json } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const db = require("./models/sequelize.model");
require('dotenv').config();

// Import routes
// const userRoute = require('./routes/user');
// const postsRoute = require('./routes/posts');

// Sequelize BDD
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

console.log("App started");
// Export de l'application express
module.exports = app;