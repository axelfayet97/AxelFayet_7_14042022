const { posts } = require('../config/db');
const db = require('../config/db');
const Post = db.posts;
// const Op = db.Sequelize.Op;
// Create and Save a new Post
exports.createPost = (req, res) => {
    // TO DO : FS MULTER
    return Post.create({
        // content: req.body.content,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        ...req.body,
        userId: req.auth.userId
    })
        .then(data => { res.status(201).send({ message: 'Post successfully created !', data }) })
        .catch((error) => { res.status(400).send(error) });
}
// Retrieve all Posts from the database.
exports.findAllPosts = (req, res) => {
    return Post.findAll({ include: ['user', 'comments', 'likes'/*, { model: db.comments, as: 'comments', include: 'user' }],*/], order: [['updatedAt', 'DESC']] }).then(data => {
        res.send(data);
    }).catch(error => res.send(error));
};
// Find a single Post with an id
exports.findOnePost = (req, res) => {
    const id = req.params.id;
    Post.findByPk(id, { include: ['user', 'comments', 'likes'] })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Post with id=${id}.`
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: 'Error retrieving Post with id=' + id, error
            });
        });
};
// Update a Post by the id in the request
exports.updatePost = (req, res) => {
    const postId = req.params.id;
    Post.update(req.body, {
        where: {
            id: postId,
            userId: req.auth.userId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Post was updated successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update Post with id=${postId}. Maybe Post was not found or req.body is empty!`
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: 'Error updating Post with id=' + postId, error
            });
        });
};
// Delete a Post with the specified id in the request
exports.deletePost = (req, res) => {
    // TO DO : FS MULTER
    const postId = req.params.id;
    Post.findOne({
        where: {
            id: postId,
        }
    }).then(post => {
        // Condition if user => connecté OU isAdmin == true
        post.destroy()
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: 'Le post à été correctement supprimé!'
                    });
                } else {
                    res.send({
                        message: `Impossible de supprimer l'id=${postId}.`
                    });
                }
            })
            .catch(error => {
                res.status(500).send({
                    message: 'Impossible de supprimer le post avec l\id' + postId, error
                });
            });
    })
        .catch(error => {
            res.status(500).send({
                message: 'Impossible de trouver le post avec l\'id=' + postId, error
            });
        });
};