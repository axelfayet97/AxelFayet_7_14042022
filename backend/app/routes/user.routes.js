// ROUTE POUR LES UTILISATEURS
module.exports = app => {
    const userCtrl = require('../controllers/user.controller');
    var router = require('express').Router();
    router.post('/signup', userCtrl.signup);
    router.post('/login', userCtrl.login);
    app.use('/api/auth', router);
}
