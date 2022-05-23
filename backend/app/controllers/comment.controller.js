const db = require('../config/db');
const Comment = db.comments;
// Create & save comments
exports.createComment = (req, res) => {
    // TO DO : FS MULTER
    // Création d'un nouvel objet commentaire
    const postId = req.body.postId;
    if (!postId) {
        return res.status(404).send({ message: 'Unable to get post ID' })
    }
    const comment = new Comment({
        ...req.body,
        userId: req.auth.userId
    });
    // Enregistrement de l'objet commentaire dans la base de données
    comment.save({ include: ['user'] })
        .then(() => {
            Comment.findAll({
                where: { postId }
            })
                .then((comments) => {
                    res.status(200).send(comments);
                })
        })
        .catch(error => res.status(400).send({ error }));
};
// Get comments for given post id
exports.findCommentById = (req, res) => {
    Comment.findByPk(req.params.id, { include: ['post'], where: { postId: req.params.postId } })
        .then((comment) => {
            res.status(200).send(comment);
        })
        .catch((error) => { res.status(400).send({ error: 'Error while finding this comment', error }) });
};
exports.getAllComments = (req, res) => {
    // Retrieve all Posts from the database.
    Comment.findAll({ order: [['updatedAt', 'DESC']] })
        .then(comments => {
            res.status(200).send(comments);
        }).catch(error => res.send(error));
}
// Delete a comment
exports.deleteComment = (req, res) => {
    // TO DO : FS MULTER
    const id = req.params.id;
    Comment.destroy({
        where: {
            id,
            userId: req.auth.userId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Comment was deleted successfully!'
                });
            } else {
                res.send({
                    message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: 'Could not delete Comment with id=' + id, error
            });
        });
}