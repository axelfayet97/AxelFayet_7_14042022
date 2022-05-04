// ROUTE POUR LES POSTS
module.exports = app => {
    const posts = require('../controllers/post.controller');
    const auth = require('../middlewares/auth.middleware');
    var router = require('express').Router();
    router.post('/', auth, posts.createPost);
    router.get('/', posts.findAllPosts);
    router.get('/:id', posts.findOnePost);
    router.put('/:id', auth, posts.updatePost);
    router.delete('/:id', auth, posts.deletePost);
    app.use('/api/posts', router);
};
