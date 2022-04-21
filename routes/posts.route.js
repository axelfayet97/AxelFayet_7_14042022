const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/posts.controller');
// const auth = require('../middlewares/auth.middleware');
// const multer = require('../middleware/multer-config');

router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.updatePost);
router.get('/', postCtrl.findAllPosts);
router.get('/:id', postCtrl.findOnePost);
router.delete('/:id', postCtrl.deletePost);
router.post('/:id/like', postCtrl.postLike)

module.exports = router;