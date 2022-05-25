// ROUTE POUR LES LIKES
module.exports = app => {
    const likesCtrl = require('../controllers/like.controller');
    const auth = require('../middlewares/auth.middleware');
    var router = require('express').Router();
    router.post('/', auth, likesCtrl.likeState);
    router.get('/', auth, likesCtrl.getAllLikes);
    router.get('/:id', auth, likesCtrl.getLikes);
    app.use('/api/likes', router);
};