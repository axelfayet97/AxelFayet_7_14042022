const Post = require('../models/posts.model');
const User = require('../models/user.model');

Post.belongsTo(Post, {
    through: 'PostTags'
})

User.hasMany(Post, {
    through: 'PostTags'
})