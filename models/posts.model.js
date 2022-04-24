const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');

const Post = sequelize.define('Post', {
    // Model attributes are defined here
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    imageUrl: {
        type: DataTypes.STRING
    }
}
);

module.exports = Post;