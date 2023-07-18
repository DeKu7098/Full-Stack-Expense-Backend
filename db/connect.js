const Sequelize = require("sequelize");
const mysql = require("mysql2");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_ADMIN, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

module.exports = sequelize ;
