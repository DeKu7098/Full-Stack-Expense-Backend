const Sequelize = require("sequelize");
const mysql = require("mysql2");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_ADMIN, process.env.DB_PASS, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize ;
