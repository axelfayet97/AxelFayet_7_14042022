const multer = require('multer');
// Génération de l'extension du fichier
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};
// Enresitrement dans constante storage
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // Dossier de destination
        callback(null, 'images');
    },
    // Génération du nom du fichier
    filename: (req, file, callback) => {
        // Préviens de l'écriture du fichier avec l'extension a l'intérieur
        const name = file.originalname.split(/[.][a-zA-Z]{2,}$/mg).join('_');
        // Réécriture du nom du fichier pour éviter d'éventuels problèmes
        const fixName = name.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, fixName + Date.now() + '.' + extension);
    }
});
// Export du fichier
module.exports = multer({ storage }).single('image');