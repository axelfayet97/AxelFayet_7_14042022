const dbConfig = require('./db.config.js');
const Sequelize = require('sequelize');
// CONNEXION A LA BASE DE DONNEES
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
    logging: false
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// MODELES
db.users = require('../models/user.model')(sequelize, Sequelize);
db.posts = require('../models/post.model')(sequelize, Sequelize);
db.comments = require('../models/comment.model')(sequelize, Sequelize);
db.likes = require('../models/like.model')(sequelize, Sequelize);
// RELATIONS
// Relations entre les Utilisateurs
db.users.hasMany(db.posts, { as: 'posts' });
db.users.hasMany(db.comments, { as: 'comments' });
db.users.hasMany(db.likes, { as: 'likes' });
// Relations entre les Posts
db.posts.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE'
});
db.posts.hasMany(db.comments, { as: 'comments' });
db.posts.hasMany(db.likes, { as: 'likes' });
// Relations entre les Commentaires
db.comments.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE'
})
db.comments.belongsTo(db.posts, {
    foreignKey: 'postId',
    as: 'post',
    onDelete: 'CASCADE'
});
// Relations entre les Likes
db.likes.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE'
});
db.likes.belongsTo(db.posts, {
    foreignKey: 'postId',
    as: 'post',
    onDelete: 'CASCADE'
});
// EXPORT DE L'OBJET DB
module.exports = db;