const Sequelize = require('sequelize');
const sequelize = require('../db/connect');
const expenses=sequelize.define('expenses',
{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    expense:{
        type:Sequelize.STRING
    },
    catg:{
        type:Sequelize.STRING,
    },
    desc:{
        type:Sequelize.STRING
    }
})
module.exports=expenses;