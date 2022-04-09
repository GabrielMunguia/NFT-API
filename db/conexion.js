const { Sequelize } = require('sequelize');


const db = new Sequelize('nft_api', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});

module.exports=db;
