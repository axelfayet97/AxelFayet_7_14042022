const dbConfig = require('./db.config.js');
const Sequelize = require('sequelize');
// DATABASE CONNECTION
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
// MODELS
db.users = require('../models/user.model')(sequelize, Sequelize);
db.posts = require('../models/post.model')(sequelize, Sequelize);
db.comments = require('../models/comment.model')(sequelize, Sequelize);
db.likes = require('../models/like.model')(sequelize, Sequelize);
// RELATIONS
db.users.hasMany(db.posts, { as: 'posts' });
db.users.hasMany(db.comments, { as: 'comments' });
db.users.hasMany(db.likes, { as: 'likes' });
// Posts relations
db.posts.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'user'
});
db.posts.hasMany(db.comments, { as: 'comments' });
db.posts.hasMany(db.likes, { as: 'likes' });
// Comments relations
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
// Likes relations
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
// DB EXPORT
module.exports = db;