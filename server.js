const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const nocache = require('nocache');
const bodyParser = require('body-parser');
const app = express();
const db = require('./app/config');
const controller = require('./app/controllers/post.controller');
// Use to test raw JSON implementation with run() when syncyng to db
// const run = async () => {
// };
var corsOptions = {
    origin: '*'
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// test route
app.get('/', (req, res) => {
    res.json({ message: 'API connected' });
});
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and re-sync db.');
    // run();
});
require('./app/routes/post.routes')(app);
require('./app/routes/user.routes')(app);
// set port, listen for requests
// Paramétrage du port
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

// Gestion des erreurs
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.log(bind + ' requires elevated privileges.');
            break;
        case 'EADDRINUSE':
            console.log(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Création du serveur Express
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);