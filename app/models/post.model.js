module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        content: {
            type: Sequelize.STRING
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return Post;
};