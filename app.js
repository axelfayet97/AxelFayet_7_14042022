// Import packages
const { json } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const nocache = require('nocache');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const db = require("./config/sequelize.config");
require('dotenv').config();

// Import routes
const userRoute = require('./routes/user.route');
const postsRoute = require('./routes/posts.route');

// CORS
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Sequelize
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });
// Connexion à la BDD
try {
    db.sequelize.authenticate()
        .then(() => console.log('Connexion OK'))
        .catch(err => console.log("Error: " + err));
}
catch (error) {
    console.log("Unable to connect to the database: ", error);
}

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

// Analyse Corps de la requête
app.use(express.json());
app.use(bodyParser.json());

// Sécurité helmet et désactivation du cache
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(nocache());


app.use('/api/auth', userRoute);
app.use('/api/posts', postsRoute);

// Export de l'application express
module.exports = app;