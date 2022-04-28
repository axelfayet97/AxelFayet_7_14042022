const { posts } = require('../config/db');
const db = require('../config/db');
const Post = db.posts;
// const Op = db.Sequelize.Op;
// Create and Save a new Post
exports.createPost = (req, res) => {
    console.log(request, req.auth);
    return Post.create({
        ...req.body,
        userId: req.auth.userId
    })
        .then(data => { res.status(201).send({ message: 'Post successfully created !', data }) })
        .catch((err) => { res.status(400).send(err) });
}
// Retrieve all Posts from the database.
exports.findAllPosts = (req, res) => {
    return Post.findAll({ include: ['user', 'comments', { model: Comment, as: 'comments', include: 'user' }] }).then(data => {
        res.send(data);
    }).catch(err => res.send(err));
};
// Find a single Post with an id
exports.findOnePost = (req, res) => {
    const id = req.params.id;
    Post.findByPk(id, { include: ['comments'] })
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
                message: 'Error retrieving Post with id=' + id, err
            });
        });
};
// Update a Post by the id in the request
exports.updatePost = (req, res) => {
    const id = req.params.id;
    // if (req.auth.userId == id) {
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
                message: 'Error updating Post with id=' + id, err
            });
        });
    // } else {
    //     return res.status(403).send({ message: 'Forbidden' })
    // }
};
// Delete a Post with the specified id in the request
exports.deletePost = (req, res) => {
    const id = req.params.id;
    console.log(id, req.auth);
    if (req.auth.userId == id) {
        Post.destroy({
            where: { id }
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
                    message: 'Could not delete Post with id=' + id, err
                });
            });
    } else {
        return res.status(403).send({ message: 'Forbidden' })
    }
};