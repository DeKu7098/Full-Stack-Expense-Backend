const Sequelize = require('sequelize');
const sequelize =  require('../db/connect');

const password=sequelize.define('password',
{
    id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    isactive:{
        type:Sequelize.BOOLEAN,
    },
})
module.exports=password;