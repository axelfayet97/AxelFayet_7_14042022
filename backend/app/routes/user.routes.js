// ROUTE POUR LES UTILISATEURS
module.exports = app => {
    const userCtrl = require('../controllers/user.controller');
    const auth = require('../middlewares/auth.middleware');
    const multer = require('../middlewares/multer.middleware');
    const rateLimit = require('../middlewares/rateLimit.middleware')
    var router = require('express').Router();
    router.post('/signup', userCtrl.signup);
    router.post('/login', rateLimit, userCtrl.login);
    router.put('/:id', auth, multer, userCtrl.modifyAccount);
    router.get('/', auth, userCtrl.getAccounts);
    router.get('/:id', auth, userCtrl.getOneAccount);
    router.delete('/:id', auth, userCtrl.deleteAccount);
    app.use('/api/auth', router);
}
