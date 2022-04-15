module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userId: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        imageUrl: {
            type: Sequelize.STRING
        },
        likes: {
            type: Sequelize.BOOLEAN
        },
        usersLike: {
            type: Sequelize.STRING
        }
    });
    return User;
};