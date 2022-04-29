// ROUTE POUR LES COMMENTAIRES
module.exports = app => {
    const comments = require('../controllers/comment.controller');
    // const auth = require('../middlewares/auth.middleware');
    var router = require('express').Router();

    // Create a new Comment
    router.post('/', auth, comments.createComment);
    // Retrieve a single Post with id
    router.get('/', comments.findCommentById);
    // Update a Post with id
    router.put('/:id', auth, comments.updateComment);
    // Delete a Post with id
    router.delete('/:id', auth, comments.deleteComment)
    app.use('/api/posts/', router);
};
