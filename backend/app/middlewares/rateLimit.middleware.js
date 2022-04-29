// Middleware bloquant l'IP de l'utilisateur après un nombre de connexions échouées
const rateLimit = require('express-rate-limit');

const loginlimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5, // Limite à 5 essais chaque requête par IP par `windowMS`
    standardHeaders: true, // Retourne les information de RateLimit dans les headers `RateLimit-*`
    legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
    // Message après {max} nombre d'essais
    message: "Nombre de tentatives dépassé, veuillez essayer à nouveau dans 5 minutes"
})

module.exports = loginlimiter;