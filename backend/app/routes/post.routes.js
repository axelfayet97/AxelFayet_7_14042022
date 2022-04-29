// ROUTE POUR LES POSTS
module.exports = app => {
    const posts = require('../controllers/post.controller');
    const auth = require('../middlewares/auth.middleware');
    var router = require('express').Router();

    // Create a new Post
    router.post('/', auth, posts.createPost);
    // Retrieve all Posts
    router.get('/', posts.findAllPosts);
    // Retrieve a single Post with id
    router.get('/:id', posts.findOnePost);
    // Update a Post with id
    router.put('/:id', auth, posts.updatePost);
    // Delete a Post with id
    router.delete('/:id', auth, posts.deletePost);
    app.use('/api/posts', router);
};
