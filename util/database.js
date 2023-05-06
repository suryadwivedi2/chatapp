require('dotenv').config();

const Sequelize=require('sequelize');

const sequelize =new Sequelize(process.env.DB_NAME,process.env.USER_NAME,process.env.USER_PASSWORD,{
    dialect:'mysql',
    hostname:process.env.HOST_NAME
})

module.exports=sequelize;