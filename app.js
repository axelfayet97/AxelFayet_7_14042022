// Import packages
const { json } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const nocache = require('nocache');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const db = require("./config/db.config");
require('dotenv').config();

// Import routes
const userRoute = require('./routes/users.route');
const postsRoute = require('./routes/posts.route');

// CORS
const corsOptions = {
    origin: '*'
};
app.use(cors(corsOptions));

// Sequelize
// Connexion à la BDD
try {
    db.sync({ force: true }).then(() => {
        console.log("Drop and re-sync db.");
    });
    // OU
    // db.sequelize.authenticate()
    //     .llthen(() => console.log('Connexion OK'))
    //     .catch(err => console.log("Error: " + err));
    // OU
    // db.sync()
}
catch (error) {
    console.log("Unable to connect to the database: ", error);
}

// Analyse Corps de la requête
app.use(express.json());
app.use(bodyParser.json());

// Sécurité helmet et désactivation du cache
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(nocache());

// Test sur localhost:PORT
// app.get('/', (req, res) => res.send('INDEX'));

// Routes de l'api
app.use('/api/auth', userRoute);
app.use('/api/posts', postsRoute);

// Export de l'application express
module.exports = app;