module.exports = app => {
    const posts = require('../controllers/post.controller.js');
    const auth = require('../middlewares/auth.middleware');
    var router = require('express').Router();

    // Create a new Post
    router.post('/', /*auth,*/ posts.createComment);
    // Retrieve a single Post with id
    router.get('/:id', posts.findCommentById);
    // Update a Post with id
    router.put('/:id', posts.updatePost);
    // Delete a Post with id
    app.use('/api/posts', router);
};
