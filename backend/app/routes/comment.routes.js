// ROUTE POUR LES COMMENTAIRES
module.exports = app => {
    const comCtrl = require('../controllers/comment.controller');
    // const auth = require('../middlewares/auth.middleware');
    var router = require('express').Router();
    router.post('/', comCtrl.createComment);
    router.get('/', comCtrl.getAllComments);
    router.get('/', comCtrl.findCommentById);
    router.delete('/:id', /*auth,*/ comCtrl.deleteComment);
    app.use('/api/comments', router);
};
