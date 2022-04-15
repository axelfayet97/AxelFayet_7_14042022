// Import packages
const { json } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const mysql = require('mysql2');
const db = require("./models/Sequelize");
require('dotenv').config();


// Import routes
const userRoute = require('./routes/user');
const postsRoute = require('./routes/posts');

// Sequelize
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});
// Connexion à la BDD
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.BDD_PWD,
    database: process.env.BDD_NAME
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

connection.end();




console.log("App started");
// Export de l'application express
module.exports = app;