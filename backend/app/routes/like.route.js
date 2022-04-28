module.exports = app => {
    const likes = require('../controllers/like.controller');
    // const auth = require('../middlewares/auth.middleware');
    var router = require('express').Router();

    // Update a Post with id
    router.put('/:id', /*auth,*/likes.updateComment);
    app.use('/api/post/likes');
};
