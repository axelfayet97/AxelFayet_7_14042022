const { posts } = require('../config/db');
const db = require('../config/db');
const Comment = db.comments;
// Create & save comments
exports.createComment = (req, res) => {
    return Comment.update(
        { 'comments': sequelize.fn('array_append', sequelize.col('comments'), ...req.body) },
        { 'where': { post: postId  } }
    )
        .then(data => { res.status(201).send({ message: 'Comment successfully added !', data }) })
        .catch((err) => { res.status(400).send(err) });
};

// Get comments for given post id
exports.findCommentById = (req, res) => {
    return Comment.findByPk(req.body.id, { include: ['post'] })
        .then((comment) => {
            return comment;
        })
        .catch((err) => { res.status(400).send({ err: 'Error while finding this comment', err }) });
};
// Delete a comment
exports.deleteComment = (req, req) => {
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
            .catch(err => {
                res.status(500).send({
                    message: 'Could not delete Comment with id=' + id, err
                });
            });
    } else {
        return res.status(403).send({ message: 'Forbidden' })
    }
}