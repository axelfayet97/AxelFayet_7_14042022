const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/posts.controller');
const auth = require('../middlewares/auth.middleware');
// const multer = require('../middleware/multer-config');

router.post('/', /*auth,*/ postCtrl.createPost);
router.put('/:id', /*auth,*/ postCtrl.updatePost);
router.get('/', /*auth,*/ postCtrl.findAllPosts);
router.get('/:id', /*auth,*/ postCtrl.findOnePost);
router.delete('/:id', /*auth,*/ postCtrl.deletePost);
router.post('/:id/like', /*auth,*/ postCtrl.postLike)

module.exports = router;