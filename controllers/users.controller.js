const userModel = require('../models/user.model');
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

    userModel.create({
        email: req.body.email,
        password: req.body.password
    })
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    console.log(userModel.email);
    })
        .catch(error => res.status(500).json({ error }));
};

// Connexion
exports.login = (req, res) => {
    // Recherche de l'utilisateur en fonction de son email dans la BDD
    const id = req.params.id;
    userModel.findByPk(id)
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
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            secretToken,
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};