const jwt = require('jsonwebtoken');
const secretToken = process.env.ACCESS_TOKEN_SECRET;
const db = require('../config/db');
const User = db.users;
// MIDDLEWARE D'AUTHENTIFICATION
module.exports = (req, res, next) => {
    console.log(req.headers.authorization.split(' ')[1]);
    try {
        // On récupère la valeur du token située après le Bearer
        const token = req.headers.authorization.split(' ')[1];
        // On décode le token avec la méthode verify en comparant le token à l'aide de la clé secrète
        const decodedToken = jwt.verify(token, secretToken);
        // On récupère et on stocke l'ID de l'utilisateur
        const userId = decodedToken.userId;
        // Protection des routes DELETE et UPDATE via intervention tierce
        req.auth = { userId };
        // Si l'ID du token est différent de celui dans le corps de la requête
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            // Sinon next middleware
            User.findOne({ where: { id: userId } })
                .then(user => {
                    req.auth = { userId, isAdmin: user.isAdmin }
                })
                .catch(error => { throw error })
            next();
        }
    } catch (error) {
        // Si une erreur survient...
        res.status(401).json({ error: error || 'Requête non authentifiée !' });
    };
}