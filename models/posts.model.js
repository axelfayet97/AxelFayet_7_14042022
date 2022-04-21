module.exports = (sequelize, Sequelize) => {
    const Posts = sequelize.define('posts', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        content: {
            type: Sequelize.STRING
        },
        imageUrl: {
            type: Sequelize.STRING
        },
    });
    return Posts;
}