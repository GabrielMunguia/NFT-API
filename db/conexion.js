const { Sequelize } = require('sequelize');


const db = new Sequelize('nft_api', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: {
       
        acquire: 60000,
        idle: 20000
      }
      
    // logging: false,
});

module.exports=db;
