const Sequelize = require('sequelize');

const Posts = {
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
};

module.exports = Posts;