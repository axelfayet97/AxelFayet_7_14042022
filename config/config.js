require('dotenv').config();

module.exports = {
  "username": process.env.DB_USER,
  "port": process.env.DB_PORT,
  "password": process.env.DB_PWD,
  "database": process.env.DB_NAME,
  "host": process.env.DB_HOST,
  "dialect": process.env.DB_DIALECT
}
