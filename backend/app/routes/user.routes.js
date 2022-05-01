// ROUTE POUR LES UTILISATEURS
module.exports = app => {
    const userCtrl = require('../controllers/user.controller');
    const auth = require('../middlewares/auth.middleware');
    const multer = require('../middlewares/multer.middleware');
    var router = require('express').Router();
    router.post('/signup', userCtrl.signup);
    router.post('/login', userCtrl.login);
    router.put('/:id', auth, multer, userCtrl.modifyAccount);
    router.get('/', userCtrl.getAccounts);
    router.get('/:id', userCtrl.getOneAccount);
    // router.delete('/:id', auth, userCtrl.deleteAccount); // DISABLE NOT DELETE
    app.use('/api/auth', router);
}
