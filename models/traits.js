const { DataTypes } =require( 'sequelize');
const  db = require( '../db/conexion');

const Trait = db.define('Nft', {

    display_type:{
        type: DataTypes.STRING,
       },
       max_value:{
        type: DataTypes.STRING,
       },
       order:{
        type: DataTypes.STRING,
       },
       trait_count:{
        type: DataTypes.STRING,
       },
       trait_type:{
        type: DataTypes.STRING,
       }
       ,
       value:{
        type: DataTypes.STRING,
       },


 

    



    
    
});

const setTabla= async()=>{
    await Trait.sync();
}
setTabla();
module.exports = Trait;