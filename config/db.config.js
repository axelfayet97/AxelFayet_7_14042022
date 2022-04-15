module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "0123456789",
    DB: "groupomania_bdd",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};