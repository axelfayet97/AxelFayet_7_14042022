module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    firstname: {
      allowNull: false,
      type: Sequelize.STRING
    },
    lastname: {
      allowNull: false,
      type: Sequelize.STRING
    },
    bio: {
      allowNull: true,
      type: Sequelize.STRING
    },
    isAdmin: {
      allowNull: false,
      type: Sequelize.TINYINT,
      default: false
    },
    // createdAt: {
    //   allowNull: false,
    //   type: Sequelize.DATE
    // },
    // updatedAt: {
    //   allowNull: false,
    //   type: Sequelize.DATE
    // }
  });
  return User;
}