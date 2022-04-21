module.exports = (sequelize, Sequelize) => {
    const Posts = sequelize.define("posts", {
        userId: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        imageUrl: {
            type: Sequelize.STRING
        },
    });
    return Posts;
};