// MODELE POST
module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return Post;
};