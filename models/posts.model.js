'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Message/*.belongsTo(models.User/*, {
        foreingKey: {
          allowNull: false
        }
      })*/
    }
  }
  Post.init({
    userId: DataTypes.STRING,
    content: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    likes: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};