const { Sequelize } = require('sequelize');


const db = new Sequelize('nft_api', 'nft', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
       
        acquire: 60000,
        idle: 20000
      }
      
    // logging: false,
});

module.exports=db;
