const db = require('../config/db');
const Like = db.likes;
exports.likeState = (req, res) => {
    Like.findAll({
        where: {
            postId: req.body.postId,
            userId: req.auth.userId
        }
    })
        .then(likes => {
            if (likes.length === 0) {
                const like = new Like({
                    ...req.body,
                    userId: req.auth.userId
                });
                // Enregistrement de l'objet like dans la base de données
                like.save()
                    .then(data => {
                        res.status(200).send({ data, message: "like créé" })
                    })
                    .catch(error => res.status(400).send(error));
            } else {
                Like.destroy({
                    where: {
                        postId: req.body.postId,
                        userId: req.auth.userId
                    }
                })
                    .then(data => {
                        res.status(200).send({ data, message: "like retiré" })
                    })
                    .catch(error => res.status(400).send(error));
            }
        })
};
exports.getLikes = (req, res) => {
    Like.findAll({
        where: {
            postId: req.params.id
        }
    })
        .then(likes => {
            res.status(200).send({ data: likes });
        })
        .catch(error => res.status(400).send(error));
};