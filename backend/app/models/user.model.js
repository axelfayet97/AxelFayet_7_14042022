module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING
        },
        firstName: {
            allowNull: false,
            type: Sequelize.STRING
        },
        lastName: {
            allowNull: false,
            type: Sequelize.STRING
        },
        bio: {
            allowNull: true,
            type: Sequelize.STRING
        },
        isAdmin: {
            allowNull: true,
            type: Sequelize.BOOLEAN,
            default: false
        },
    });
    return User
};