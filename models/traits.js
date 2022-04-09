const { DataTypes } =require( 'sequelize');
const  db = require( '../db/conexion');

const Trait = db.define('Trait', {

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
        type: DataTypes.INTEGER,
       },
       trait_type:{
        type: DataTypes.STRING,
       }
       ,
       value:{
        type: DataTypes.STRING,
       },
       token_id:{
        type: DataTypes.INTEGER,
         }


 

    



    
    
});

const setTabla= async()=>{
    await Trait.sync();
}
setTabla();
module.exports = Trait;