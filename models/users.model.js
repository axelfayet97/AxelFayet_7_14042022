const Sequelize = require("sequelize");
const db = require('../config/db.config');
const User = db.define("User", {
  email: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true
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
    allowNull: true,
    type: Sequelize.BOOLEAN,
    default: false
  },
});

module.exports = User;