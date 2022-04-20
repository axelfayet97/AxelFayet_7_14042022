const express = require('express');
const db = require('../models/posts.model');
// const posts = db.posts;
// const Op = db.Sequelize.Op;

// Create and save Post
exports.createPost = (req, res) => {
    // Validation
    if (!req.body) {
        res.status(400).json({ message: 'Content cannot be empty' })
        return
    }
    // Create post
    const post = {
        ...req.body
    }
    // Save post
    Post.create(post)
        .then(data => {
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

};
// Find a single Post with an id
exports.findOnePost = (req, res) => {

};
// Update a Post by the id in the request
exports.updatePost = (req, res) => {

};
// Delete a Post with the specified id in the request
exports.deletePost = (req, res) => {

};
// Delete all Posts from the database.
exports.deleteAllPosts = (req, res) => {

};
