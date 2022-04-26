const Sequelize = require("sequelize");
const db = require('../config/db.config');

const Post = db.define('Post', {
  userId: {
    allowNull: false,
    type: Sequelize.STRING,
    // references: {
    //   model: 'Users',
    //   key: 'id'
    // }
  },
  postId: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true

  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    allowNull: true,
    type: Sequelize.STRING,

  },
  likes: {
    allowNull: true,
    default: 0,
    type: Sequelize.BOOLEAN
  }
});

module.exports = Post;