const { posts } = require('../config/db');
const db = require('../config/db');
const Post = db.posts;
// const Op = db.Sequelize.Op;
const Comment = db.comments;
// Create and Save a new Post
exports.createPost = (post, userId) => {
    return Post.create({
        ...post.body,
        userId: userId.user
    })
        .then(data => { post.res.status(201).send({ message: 'Post successfully created !', data }) })
        .catch((err) => { post.res.status(400).send(err) });
}
// Create & save comments
exports.createComment = (postId, comment) => {
    return Comment.create({
        name: comment.name,
        text: comment.text,
        postId
    })
        .then(data => { post.res.status(201).send({ message: 'Comment successfully added !', data }) })
        .catch((err) => { post.res.status(400).send(err) });
};
// Get comments for a given post
exports.findPostById = (postId) => {
    return Post.findByPk(postId, { include: ['comments'] })
        .then(data => { post.res.status(201).send({ data }) })
        .catch((err) => { post.res.status(400).send({err: 'Error while finding this post', err}) });
};
// Get comments for given post id
exports.findCommentById = (id) => {
    return Comment.findByPk(id, { include: ['post'] })
        .then((comment) => {
            return comment;
        })
        .catch((err) => { post.res.status(400).send({ err: 'Error while finding this comment', err }) });
};
// Retrieve all Posts from the database.
exports.findAllPosts = (posts) => {
    return Post.findAll().then(data => {
        posts.res.send(data);
    }).catch(err => posts.res.send(err));
};
// Find a single Post with an id
exports.findOnePost = (req, res) => {
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
exports.updatePost = (req, res) => {
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
exports.deletePost = (req, res) => {
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