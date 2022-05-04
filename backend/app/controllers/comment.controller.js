const db = require('../config/db');
const Comment = db.comments;
// Create & save comments
exports.createComment = (req, res) => {
    // TO DO : FS MULTER
    const commentObject = req.body;
    // Création d'un nouvel objet commentaire
    const comment = new Comment({
        ...commentObject
    });
    console.log(commentObject);
    // Enregistrement de l'objet commentaire dans la base de données
    comment.save()
        .then(() => {
            Comment.findAll({
                where: { postId: req.body.postId }
            })
                .then((comments) => {
                    res.status(200).json(comments);
                })
        })
        .catch(error => res.status(400).json({ error }));
};

// Get comments for given post id
exports.findCommentById = (req, res) => {
    Comment.findByPk(req.body.id, { include: ['post'], where: { postId: req.params.postId } })
        .then((comment) => {
            res.status(200).send(comment);
        })
        .catch((error) => { res.status(400).send({ error: 'Error while finding this comment', error }) });
};
exports.getAllComments = (req, res) => {
    // Retrieve all Posts from the database.
    Comments.findAll({ include: ['user', 'comments'/*, { model: db.comments, as: 'comments', include: 'user' }*/] }).then(comments => {
        res.status(200).send(comments);
    }).catch(error => res.send(error));
}
// Delete a comment
exports.deleteComment = (req, req) => {
    // TO DO : FS MULTER
    const id = req.params.id;
    if (req.auth.userId == id) {
        Comment.destroy({
            where: { id }
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
                    message: 'Could not delete Comment with id=' + id, err
                });
            });
    } else {
        return res.status(403).send({ message: 'Forbidden' })
    }
}