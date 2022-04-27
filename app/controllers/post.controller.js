const db = require('../config/db');
const Post = db.posts;
// const Op = db.Sequelize.Op;
const Comment = db.comments;
// Create and Save a new Post
exports.createPost = (post) => {
    return Post.create({
        title: post.title,
        description: post.description,
    })
        .then((post) => {
            console.log('>> Created post: ' + JSON.stringify(post, null, 4));
            return post;
        })
        .catch((err) => {
            console.log('>> Error while creating post: ', err);
        });
};
// Create & save comments
exports.createComment = (postId, comment) => {
    return Comment.create({
        name: comment.name,
        text: comment.text,
        postId: postId,
    })
        .then((comment) => {
            console.log('>> Created comment: ' + JSON.stringify(comment, null, 4));
            return comment;
        })
        .catch((err) => {
            console.log('>> Error while creating comment: ', err);
        });
};
// Get comments for a given post
exports.findPostById = (postId) => {
    return Post.findByPk(postId, { include: ['comments'] })
        .then((post) => {
            return post;
        })
        .catch((err) => {
            console.log('>> Error while finding post: ', err);
        });
};
// Get comments for given post id
exports.findCommentById = (id) => {
    return Comment.findByPk(id, { include: ['post'] })
        .then((comment) => {
            return comment;
        })
        .catch((err) => {
            console.log('>> Error while finding comment: ', err);
        });
};
// Retrieve all Posts from the database.
exports.findAll = () => {
    return Post.findAll({
        include: ['comments'],
    }).then((posts) => {
        return posts;
    });
};
// Find a single Post with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Post.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Post with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving Post with id=' + id
            });
        });
};
// Update a Post by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Post.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Post was updated successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating Post with id=' + id
            });
        });
};
// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Post.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Post was deleted successfully!'
                });
            } else {
                res.send({
                    message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete Post with id=' + id
            });
        });
};