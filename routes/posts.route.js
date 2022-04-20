
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

// Modifier une sauce + image avec Multer
// router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// Récupère l'array de sauce
// router.get('/', auth, sauceCtrl.getAllSauces);
// Récupère une seule sauce
// router.get('/:id', auth, sauceCtrl.getOneSauce);
// Supprime une sauce
// router.delete('/:id', auth, sauceCtrl.deleteSauce);
// Gestion de like/dislike
// router.post('/:id/like', auth, sauceCtrl.LikeOrDislikeSauce);


module.exports = router;