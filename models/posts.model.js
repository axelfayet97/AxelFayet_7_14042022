module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("Post", {
    postId: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    // userId: {
    //   allowNull: false,
    //   type: Sequelize.STRING,
    //   // references: {
    //   //   model: 'Users',
    //   //   key: 'id'
    //   // }
    // },
    content: {
      allowNull: false,
      type: Sequelize.STRING
    },
    // imageUrl: {
    //   allowNull: true,
    //   type: Sequelize.STRING,

    // },
    // likes: {
    //   allowNull: false,
    //   default: 0,
    //   type: Sequelize.TINYINT
    // }
  });
  return Post;
};