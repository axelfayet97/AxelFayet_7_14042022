const { posts } = require('../config/db');
const db = require('../config/db');
const Post = db.posts;
// Create and Save a new Post
exports.createPost = (req, res) => {
    Post.create({
        ...req.body,
        userId: req.auth.userId
    }).then(data => {
        res.status(201).send({ message: 'Post créé !', data })
    }).catch((error) => { res.status(400).send(error) });
}
// Retrieve all Posts from the database.
exports.findAllPosts = (req, res) => {
    Post.findAll({ include: ['user', 'comments', 'likes', { model: db.comments, as: 'comments', include: 'user' }], order: [['updatedAt', 'DESC']] })
        .then(data => {
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
                    message: `Impossible de trouver le post à l'id=${id}.`
                });
            }
        }).catch(error => {
            res.status(500).send({
                message: 'Un problème est survenu lors de la récupération du post ' + id, error
            });
        });
};
// Update a Post by the id in the request
exports.updatePost = (req, res) => {
    const postId = req.params.id;
    if (postId != req.auth.userId) {
        return res.status(401).send({ message: "Non autorisé." })
    }
    Post.findOne({
        where: {
            id: postId,
            userId: req.auth.userId
        }
    }).then(post => {
        post.update(req.body)
            .then(() => {
                res.send({
                    message: 'Le post à correctement été modifié.'
                });
            }).catch(error => {
                res.status(500).send({
                    message: 'Une erreur est survenue lors de la modification du post id=' + postId, error
                });
            });
    })
};
// Delete a Post with the specified id in the request
exports.deletePost = (req, res) => {
    // TO DO : FS MULTER
    const id = req.params.id;
    if (req.auth.isAdmin == true || req.params.id == req.auth.userId) {
        Post.findOne({
            where: { id }
        }).then(post => {
            post.destroy({
                where: {
                    id,
                    userId: req.auth.userId
                }
            }).then(() => {
                res.send({
                    message: 'Le post à été correctement supprimé!'
                });
            }).catch(error => {
                res.status(500).send({
                    message: 'Impossible de supprimer le post avec l\'id ' + id, error
                });
            })
        }).catch(error => {
            res.status(500).send({
                message: 'Impossible de trouver le post avec l\'id ' + id, error
            });
        })
    } else {
        return res.status(401).send({ message: "Non autorisé." })
    }
};