require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const nocache = require('nocache');
const bodyParser = require('body-parser');
const app = express();
const db = require('./app/config/db');
// Définition des propriétés CORS
var corsOptions = {
    origin: '*'
};
app.use(cors(corsOptions));
// Parse les requêtes de application/json
app.use(bodyParser.json());
app.use(express.json());
// Parse les requêtes de application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Sécurité helmet et désactivation du cache
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(nocache());
// SYNCHRONISATION A LA BDD : DEFINIR FORCE SUR TRUE POUR PURGER
db.sequelize.sync({ force: false }).then(() => {
    console.log('Drop and re-sync db.');
});
// Import des routes
require('./app/routes/post.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/like.route')(app);
require('./app/routes/comment.routes')(app);
// EXPORT DE L'APPLICATION POUR LE SERVEUR
module.exports = app;