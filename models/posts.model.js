const Sequelize = require("sequelize");
const db = require('../config/db.config');
const Comment = require('./comments.model');
const Post = db.define('Post', {
  // userId: {
  //   allowNull: false,
  //   type: Sequelize.STRING,
  //   references: {
  //     model: 'Users',
  //     key: 'id'
  //   }
  // },
  postId: {
    type: Sequelize.STRING,
    // autoIncrement: true,
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
Post.hasMany(Comment, { as: "comments" });
module.exports = Post;