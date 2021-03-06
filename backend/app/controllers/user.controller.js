const db = require('../config/db');
const User = db.users;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();
const secretToken = process.env.ACCESS_TOKEN_SECRET;
const complexity = require('complexity')
const options = {
    uppercase: 1,
    lowercase: 1,
    special: 1,
    min: 8
}
complexity.create(options)

// Inscription
exports.signup = (req, res) => {
    const nameRegexp = new RegExp(/^[A-Za-zÀ-Ÿá-ÿ][A-Za-zÀ-Ÿá-ÿ-' ]+$/);
    const mailRegexp = new RegExp(/^([a-z0-9.-_]+)@([\da-z\.-]+)([a-z]{2,})$/);
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    // Vérification des champs renseignés, TO DO REGEXP SUR CHAMPS
    if (email == null || password == null, firstName == null, lastName == null) {
        return res.status(400).send({ error: 'Il manque un ou plusieurs champs' })
    };
    if (nameRegexp.test(firstName) == false || nameRegexp.test(lastName) == false || mailRegexp.test(email) == false) {
        return res.status(400).send({ error: 'Il manque un ou plusieurs champs' })
    }
    // Vérification de la présence de l'utilisateur dans la BDD
    User.findOne({
        attribute: ['email'],
        where: { email }
    }).then(userFound => {
        if (!userFound) {
            // Cryptage du mot de passe reçu dans le corps de la requête
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    // Création et sauvegarde dans la base de données d'un nouvel utilisateur
                    if (complexity.check(req.body.password, options)) {
                        return User.create({
                            ...req.body,
                            password: hash
                        }).then(data => {
                            res.status(201).send({ message: 'Compte créé !', data })
                        }).catch((error) => {
                            res.status(400).send(error)
                        });
                    }
                    else {
                        throw 'Votre mot de passe est trop simple !'
                    }
                }).catch((error) => {
                    res.status(500).send(error)
                });
        } else {
            return res.status(409).send({ error: 'Cet utilisateur existe déjà !' });
        };
    }).catch(error => res.status(500).send({ error, message: 'Une erreur est survenue, veuillez réessayer' }))
};
// Connexion
exports.login = (req, res) => {
    // Recherche de l'utilisateur en fonction de son email dans la BDD
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' })
        }
        // On compare les hash des mots de passe de la requête et de la BDD
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.status(200).send({
                userId: user.id,
                isAdmin: user.isAdmin,
                token: jwt.sign(
                    { userId: user.id, isAdmin: user.isAdmin },
                    secretToken,
                    { expiresIn: '24h' }
                ),
                message: 'Connexion réussie'
            })
        } else {
            return res.status(401).json({ error: 'Mot de passe incorrect !' })
        }
    }).catch(error => res.status(500).json(error));
};
// Get all accounts
exports.getAccounts = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data)
        }).catch(error => res.send(error));
};
// Find a single Account with an id
exports.getOneAccount = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Impossible de trouve l'utilisateur avec l'id=${id}.`
                });
            }
        }).catch(error => {
            res.status(500).send({
                message: 'Impossible de récupérer les informations de l\'utilisateur possédant l\id=' + id, error
            });
        });
};
exports.modifyAccount = (req, res) => {
    // Vérification auth
    if (req.params.id != req.auth.userId) {
        return res.status(401).send({ message: 'Non autorisé.' })
    }
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    // Vérification des champs
    if (!firstname || !lastname) {
        return res.status(400).send({ 'error': `Les champs 'nom' et 'prénom' doivent être remplis ` });
    }
    const userObject = req.file ?
        {
            ...req.body.user,
            imageUrl: req.file.filename
        } : { ...req.body };
    // TO DO : Trouver un moyen de modif mdp
    if (req.body.password) {
        return res.status(400).send({ message: 'Le mot de passe doit être modifié par une autre méthode' })
    }
    User.update({ ...userObject, id: req.params.id }, { where: { id: req.params.id } })
        .then(() => res.status(200).send({ message: 'Utilisateur modifié !' }
        )).catch(error => res.status(400).send({ error }));
};
exports.deleteAccount = (req, res) => {
    // Vérification auth
    User.findOne({ where: { id: req.params.id } })
        .then(user => {
            if (req.auth.isAdmin == true || user.id == req.auth.userId) {
                User.destroy({ where: { id: req.auth.userId } })
                    .then(res.status(200).send({ message: 'Utilisateur supprimé avec succès' }))
            } else {
                return res.status(401).send({ message: 'Non autorisé.' })
            }
        }).catch(error => res.status(400).send(error))
}