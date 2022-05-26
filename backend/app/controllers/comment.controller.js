const db = require('../config/db');
const Comment = db.comments;
// Create & save comments
exports.createComment = (req, res) => {
    // TO DO : FS MULTER
    // Création d'un nouvel objet commentaire
    const postId = req.body.postId;
    if (!postId) {
        return res.status(404).send({ message: 'Aucun post ne correspond à cet ID.' })
    }
    const comment = new Comment({
        ...req.body,
        userId: req.auth.userId
    });
    // Enregistrement de l'objet commentaire dans la base de données
    comment.save()
        .then(() => {
            Comment.findAll({
                where: { postId },
                include: ['user']
            })
                .then((comments) => {
                    res.status(200).send(comments);
                })
        })
        .catch(error => res.status(400).send({ error }));
};
// Get comments for given post id
exports.findCommentById = (req, res) => {
    Comment.findByPk(req.params.id, { where: { postId: req.params.postId } })
        .then((comment) => {
            res.status(200).send(comment);
        })
        .catch((error) => { res.status(400).send({ error: 'Une erreur est survenue au chargement de ce commentaire.', error }) });
};
exports.getAllComments = (req, res) => {
    // Retrieve all Posts from the database.
    Comment.findAll({ include: ['user'], order: [['updatedAt', 'DESC']] })
        .then(comments => {
            res.status(200).send(comments);
        }).catch(error => res.send(error));
}
// Update a comment 
exports.updateComment = (req, res) => {
    const commentId = req.params.id;
    Comment.findOne({
        where: {
            id: commentId,
            userId: req.auth.userId
        }
    }).then(comment => {
        comment.update(req.body)
            .then(() => {
                res.send({
                    message: 'Le comment à correctement été modifié.'
                });
            })
            .catch(error => {
                res.status(500).send({
                    message: 'Une erreur est survenue lors de la modification du comment id=' + commentId, error
                });
            });
    })
};
// Delete a comment
exports.deleteComment = (req, res) => {
    // TO DO : FS MULTER
    const id = req.params.id;
    if (req.auth.isAdmin == true || req.params.id == req.auth.userId) {
        Comment.findOne({
            where: { id }
        }).then(comment => {
            comment.destroy({
                where: {
                    id,
                    userId: req.auth.userId
                }
            }).then(() => {
                res.send({
                    message: 'Le commentaire à été supprimé!'
                });
            }).catch(error => {
                res.status(500).send({
                    message: 'Impossible de supprimmer le commentaire à l\'id ' + id, error
                });
            });
        }).catch(error => {
            res.status(500).send({
                message: 'Impossible de trouver le commentaire avec l\'id ' + id, error
            });
        })
    } else {
        return res.status(401).send({ message: "Non autorisé." })
    }
}