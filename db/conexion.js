const { Sequelize } = require('sequelize');

console.log(process.env) // remove this after you've confirmed it working


const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false,
    pool: {
       
        acquire: 60000,
        idle: 20000
      }
      
    // logging: false,
});

module.exports=db;
