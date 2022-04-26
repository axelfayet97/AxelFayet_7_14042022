const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comments.controller');
// const auth = require('../middlewares/auth.middleware');
// const multer = require('../middleware/multer-config');

router.post('/:id', /*auth,*/commentCtrl.createComment);
router.delete('/:id', /*auth,*/commentCtrl.deleteComment);
// router.post('/:id/like', commentCtrl.postLike)

module.exports = router;