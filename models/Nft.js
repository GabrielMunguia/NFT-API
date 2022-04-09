const { DataTypes } =require( 'sequelize');
const  db = require( '../db/conexion');

const Nft = db.define('Nft', {
    slug: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    rank: {
        type: DataTypes.FLOAT
    },
    permalink: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.FLOAT
    },
});


module.exports = Nft;