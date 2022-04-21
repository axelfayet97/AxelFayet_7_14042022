module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        email: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        password: {
            type: Sequelize.STRING
        }
    });
    return User;
};