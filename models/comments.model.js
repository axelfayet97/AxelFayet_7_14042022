const Sequelize = require("sequelize");
const db = require('../config/db.config');
const Post = require('./posts.model');  
const Comment = db.define("Comment", {
    commentId: {
        type: Sequelize.STRING,
    },
    userId: {
        type: Sequelize.STRING,

    },
    content: {
        type: Sequelize.STRING,
        allowNull: false

    },
    commentLike: {
        type: Sequelize.STRING,

    }
});
// Comment.belongsTo(Post, {
//     foreingKey: "postId",
//     as: "post"
// })
module.exports = Comment;