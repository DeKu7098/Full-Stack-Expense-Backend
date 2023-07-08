const Sequelize = require("sequelize");
const mysql = require("mysql2");

const sequelize = new Sequelize("expense-tracker", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize ;
