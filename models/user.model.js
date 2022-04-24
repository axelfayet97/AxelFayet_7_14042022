const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');

const User = sequelize.define('User', {
    // Model attributes are defined here
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}
);

module.exports = User;