const dbConfig = require("../config/config.js");
console.log(dbConfig.port);
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: "mysql",
  operatorsAliases: false
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.posts = require("./posts.model")(sequelize, Sequelize);
db.users = require("./users.model")(sequelize, Sequelize);
module.exports = db;

