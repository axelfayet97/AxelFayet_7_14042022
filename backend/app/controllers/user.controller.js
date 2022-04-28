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
exports.login = (login) => {
    // Recherche de l'utilisateur en fonction de son email dans la BDD
    return User.findByPk(login.body.id)
        .then(user => {
            if (!user) {
                return login.res.status(401).send({ error: 'User not found !' })
            }
            // On compare les hash des mots de passe de la requête et de la BDD
            bcrypt.compare(login.body.password, user.password)
                .then(valid => {
                    // Mot de passe erroné
                    if (!valid) {
                        return login.res.status(401).send({ error: 'Wrong email or password' })
                    }
                    // Mot de passe OK, génération d'un token d'authentification
                    login.res.status(200).send({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            secretToken,
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(err => login.res.status(500).send(err));
        })
        .catch(err => login.res.status(500).send(err));
};