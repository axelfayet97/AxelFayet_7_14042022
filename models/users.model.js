const Sequelize = require("sequelize");
const db = require('../config/db.config');

const User = db.define("User", {
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
});

module.exports = User;