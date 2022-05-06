// ROUTE POUR LES COMMENTAIRES
module.exports = app => {
    const comCtrl = require('../controllers/comment.controller');
    const auth = require('../middlewares/auth.middleware');
    var router = require('express').Router();
    router.post('/', auth, comCtrl.createComment);
    router.get('/', comCtrl.getAllComments);
    router.get('/:id', comCtrl.findCommentById);
    router.delete('/:id', auth, comCtrl.deleteComment);
    app.use('/api/comments', router);
};
