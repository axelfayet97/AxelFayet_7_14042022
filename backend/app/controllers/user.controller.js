const db = require('../config/db');
const User = db.users;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
        .catch(err => res.status(500).send({ err, message: 'Something went wrong, please try again later...' }))

};

// Connexion
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

exports.modifyAccount = (req, res) => {
    // Modification du MDP
    // Modification du Nom / Prénom
    // Modification de la bio,
    // Ajout et modification de la photo de profil => Installation FS
};