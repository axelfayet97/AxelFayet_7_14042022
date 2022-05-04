const db = require('../config/db');
const Like = db.likes;

exports.likeState = (req, res) => {
    Like.findAll({
        where: {
            postId: req.body.postId,
            userId: req.body.userId
        }
    })
        .then(likes => {
            if (likes.length === 0) {
                const like = new Like({
                    ...req.body
                    // User ID ?
                });
                // Enregistrement de l'objet like dans la base de données
                like.save()
                    .then(() => {
                        Like.findAll({
                            where: { postId: req.body.postId }
                        }).then(likes => {
                            res.status(200).json({ like: likes.length });
                        })
                    })
                    .catch(error => res.status(400).json({ error }));
            } else {
                Like.destroy({
                    where: {
                        postId: req.body.postId,
                        userId: req.body.userId
                    }
                })
                    .then(() => {
                        Like.findAll({
                            where: { postId: req.body.postId }
                        }).then(likes => {
                            res.status(200).json({ like: likes.length });
                        })
                    })
                    .catch(error => res.status(400).json({ error }));
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
            console.log(likes);
            res.status(200).send({ data: likes });
        })
        .catch(error => res.status(400).send(error));
};