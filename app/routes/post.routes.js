module.exports = app => {
    const posts = require('../controllers/post.controller.js');
    var router = require('express').Router();
    // Create a new Post
    router.post('/', posts.createPost);
    // Retrieve all Posts
    router.get('/', posts.findAll);
    // Retrieve a single Post with id
    router.get('/:id', posts.findOne);
    // Update a Post with id
    router.put('/:id', posts.update);
    // Delete a Post with id
    router.delete('/:id', posts.delete);
    app.use('/api/posts', router);
};
