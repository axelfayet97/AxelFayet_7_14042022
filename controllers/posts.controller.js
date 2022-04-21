const express = require('express');
const db = require('../models/posts.model');
// const Op = db.Sequelize.Op;
const Posts = db.posts;

// Create and save Post
exports.createPost = (req, res) => {
    // Validation
    // if (!req.body) {
    //     res.status(400).json({ message: 'Content cannot be empty' })
    //     return
    // }
    // Create post
    const post = {
        userId: req.body.userId,
        content: req.body.content,
        imageUrl: req.body.imageUrl
    }
    // Save post
    Posts.create(post)
        .then(data => {
            console.log("post created");
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong, try again later'
            })
        });
}
// Retrieve all Posts from the database.
exports.findAllPosts = (req, res) => {
    Posts.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Posts."
            });
        });
};
// Find a single Post with an id
exports.findOnePost = (req, res) => {
    const id = req.params.id;
    Posts.findByPk(id)
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
                message: "Error retrieving Post with id=" + id
            });
        });
};
// Update a Post by the id in the request
exports.updatePost = (req, res) => {
    const id = req.params.id;
    Posts.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Post was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Post with id= " + id
            });
        });
};
// Delete a Post with the specified id in the request
exports.deletePost = (req, res) => {
    const id = req.params.id;
    Posts.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Post was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Post with id=" + id
            });
        });
};
// Like management
exports.postLike = (req, res) => {

};