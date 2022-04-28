const db = require('../config/db');
const User = db.users;
// const Post = db.posts;
// const Op = db.Sequelize.Op;
// const Comment = db.comments;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretToken = process.env.ACCESS_TOKEN_SECRET;

// Inscription
exports.signup = (signup) => {
    // Cryptage du mot de passe reçu dans le corps de la requête
    bcrypt.hash(signup.body.password, 10)
        .then(hash => {
            // Création d'un nouvel utilisateur
            // Sauvegarde de cet utilisateur dans la BDD
            return User.create({
                ...signup.body,
                password: hash
            })
                .then(data => { signup.res.status(201).send({ message: 'User successfully created !', data }) })
                .catch((err) => { signup.res.status(400).send(err) });
        })
        .catch((err) => {
            signup.res.status(500).send(err)
        });
};

// Connexion
exports.login = (req, res) => {
    // Recherche de l'utilisateur en fonction de son email dans la BDD
    return User.findByPk(req.body.id)
        .then(user => {
            if (!user) {
                return res.status(401).send({ error: 'User not found !' })
            }
            // On compare les hash des mots de passe de la requête et de la BDD
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // Mot de passe erroné
                    if (!valid) {
                        return res.status(401).send({ error: 'Wrong email or password' })
                    }
                    console.log(user.id);
                    // Mot de passe OK, génération d'un token d'authentification
                    res.status(200).send({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            secretToken,
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
};