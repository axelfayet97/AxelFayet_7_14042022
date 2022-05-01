const db = require('../config/db');
const User = db.users;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();
const secretToken = process.env.ACCESS_TOKEN_SECRET;

// Inscription
exports.signup = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;
    // Vérification des champs renseignés, TO DO REGEXP SUR CHAMPS
    if (email == null || password == null/*,firstName == null, lastName == null*/) {
        return res.status(400).send({ error: 'Missing signup field.' })
    };
    // Vérification de la présence de l'utilisateur dans la BDD
    User.findOne({
        attribute: ['email'],
        where: { email: email }
    }).then(userFound => {
        if (!userFound) {
            // Cryptage du mot de passe reçu dans le corps de la requête
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    // Création et sauvegarde dans la base de données d'un nouvel utilisateur
                    return User.create({
                        ...req.body,
                        password: hash
                    })
                        .then(data => { res.status(201).send({ message: 'User successfully created !' }) })
                        .catch((err) => { res.status(400).send(err) });
                })
                .catch((err) => {
                    res.status(500).send(err)
                });
        } else {
            return res.status(409).send({ error: 'User already exists !' });
        };
    })
        .catch(error => res.status(500).send({ error, message: 'Something went wrong, please try again later...' }))

};

// // Connexion
exports.login = (req, res) => {
    // Recherche de l'utilisateur en fonction de son email dans la BDD
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' })
            }
            // On compare les hash des mots de passe de la requête et de la BDD
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.status(200).send({
                    userId: user.id,
                    token: jwt.sign(
                        { userId: user.id },
                        secretToken,
                        { expiresIn: '24h' }
                    )
                })
            } else {
                return res.status(401).json({ error: 'Mot de passe incorrect !' })
            }
        })
        .catch(error => res.status(500).json(error));
};

// Get all accounts
exports.getAccounts = (req, res) => {
    return User.findAll().then(data => {
        res.send(data);
    }).catch(error => res.send(error));
};
// Find a single Account with an id
exports.getOneAccount = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send({ data });
            } else {
                res.status(404).send({
                    message: `Cannot find user with id=${id}.`
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: 'Error retrieving user with id=' + id, error
            });
        });
};
exports.modifyAccount = (req, res) => {
    // Modification du MDP
    // Modification du Nom / Prénom
    // Modification de la bio,
    // Ajout et modification de la photo de profil => FS 
    const paramsId = req.params.id;
    User.update(req.body, {
        where: {
            id: paramsId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Profile was updated successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update profile with id=${paramsId}. Maybe profile was not found or req.body is empty!`
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: 'Error updating profile with id=' + paramsId, error
            });
        });
};