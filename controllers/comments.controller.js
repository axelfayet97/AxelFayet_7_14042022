const commentModel = require('../models/comments.model');

// Create and save Comment
exports.createComment = (req, res) => {
    // Validation
    // if (!req.body) {
    //     res.status(400).json({ message: 'Content cannot be empty' })
    //     return
    // }
    // Create comment
    const comment = {
        name: "name",
        text: "text",
        tutorialId: 42
    }
    commentModel.create(comment)
        .then(data => {
            // console.log(data);
            res.send(data)
        })
        .catch(err => res.status(500).send({ err }));
}

// Delete a Comment with the specified id in the request
exports.deleteComment = (req, res) => {
    const id = req.params.id;
    commentModel.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Comment with id=${id}. Maybe comment was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Comment with id=" + id
            });
        });
};
// // Like management
// exports.commentLike = (req, res) => {

// };