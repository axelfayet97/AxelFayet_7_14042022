const jwt = require('jsonwebtoken');
const secretToken = process.env.ACCESS_TOKEN_SECRET;

// MIDDLEWARE D'AUTHENTIFICATION
module.exports = (req, res, next) => {
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
            next();
        }
    } catch (error) {
        // Si une erreur survient...
        res.status(401).json({ error: error || 'Requête non authentifiée !' });
    };
}; 