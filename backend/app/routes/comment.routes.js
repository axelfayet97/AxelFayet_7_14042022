// ROUTE POUR LES COMMENTAIRES
module.exports = app => {
    const comCtrl = require('../controllers/comment.controller');
    const auth = require('../middlewares/auth.middleware');
    var router = require('express').Router();
    router.post('/', auth, comCtrl.createComment);
    router.get('/', auth, comCtrl.getAllComments);
    router.get('/:id', auth, comCtrl.findCommentById);
    router.put('/:id', auth, comCtrl.updateComment);
    router.delete('/:id', auth, comCtrl.deleteComment);
    app.use('/api/comments', router);
};
