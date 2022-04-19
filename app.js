// Import packages
const { json } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const mysql = require('mysql2');
const db = require("./config/sequelize.config");
require('dotenv').config();


// Import routes
const userRoute = require('./routes/users.route');
const postsRoute = require('./routes/posts.route');

// Sequelize
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });
// Connexion à la BDD
db.sequelize.authenticate()
    .then(() => console.log('Connexion OK'))
    .catch(err => console.log("Error: " + err));

// var connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PWD,
//     database: process.env.DB_DB
// });

// TEST DB
// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });

// connection.end();




console.log("App started");
// Export de l'application express
module.exports = app;