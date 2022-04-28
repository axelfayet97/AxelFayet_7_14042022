const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const nocache = require('nocache');
const bodyParser = require('body-parser');
const app = express();
const db = require('./app/config/db');
// const controller = require('./controllers/post.controller');
// À utiliser pour envoyer des données en dur avec la fonction run() lors de la synchro à la bdd
// const run = async () => {
// };
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
// Route test
app.get('/', (req, res) => {
    res.json({ message: 'API connected' });
});
db.sequelize.sync({ force: false }).then(() => {
    console.log('Drop and re-sync db.');
    // run();
});

module.exports = app;