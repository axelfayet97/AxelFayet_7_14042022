
const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/posts.controller');
const auth = require('../middlewares/auth.middleware');
// const multer = require('../middleware/multer-config');
const { route } = require('./user.route');

router.post('/', auth, postCtrl.createPost);

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