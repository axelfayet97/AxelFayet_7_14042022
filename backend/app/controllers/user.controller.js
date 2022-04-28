const db = require('../config/db');
const User = db.users;
// const Post = db.posts;
// const Op = db.Sequelize.Op;
// const Comment = db.comments;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretToken = process.env.ACCESS_TOKEN_SECRET;

// Inscription
exports.signup = (req, res) => {
    // Cryptage du mot de passe reçu dans le corps de la requête
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Création d'un nouvel utilisateur
            // Sauvegarde de cet utilisateur dans la BDD
            return User.create({
                ...req.body,
                password: hash
            })
                .then(data => { res.status(201).send({ message: 'User successfully created !', data }) })
                .catch((err) => { res.status(400).send(err) });
        })
        .catch((err) => {
            res.status(500).send(err)
        });
};

// Connexion
exports.login = (req, res) => {
    // Recherche de l'utilisateur en fonction de son email dans la BDD
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' })
            }
            // On compare les hash des mots de passe de la requête et de la BDD
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // Mot de passe erroné
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' })
                    }
                    // Mot de passe OK, génération d'un token d'authentification
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            secretToken,
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};