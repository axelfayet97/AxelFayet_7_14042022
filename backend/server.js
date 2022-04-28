const http = require('http');
const app = require('./app');
// Import des routes
require('./app/routes/post.routes')(app);
require('./app/routes/user.routes')(app);
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
// Paramétrage du port
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