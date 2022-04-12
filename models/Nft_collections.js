const { DataTypes } =require( 'sequelize');
const  db = require( '../db/conexion');

const Nft_collection = db.define('nft_collection', {
   name:{
         type: DataTypes.STRING(300)   ,
   },
   slug:{
    type: DataTypes.STRING(300)   ,
},
owners:{
    type: DataTypes.DECIMAL(18, 2),
},
floor_price:{
    type: DataTypes.DECIMAL(18, 2),
},
total_supply:{
    type: DataTypes.DECIMAL(18, 2),
},
total_volume:{
    type: DataTypes.DECIMAL(18, 2),
},
one_day_volume:{
    type: DataTypes.DECIMAL(18, 2),
},
seven_day_volume:{
    type: DataTypes.DECIMAL(18, 2),
},
thirty_day_volume:{
    type: DataTypes.DECIMAL(18, 2),
},
one_day_change:{
    type: DataTypes.DECIMAL(18, 2),
},
seven_day_change:{
    type: DataTypes.DECIMAL(18, 2),
},
thirty_day_change:{
    type: DataTypes.DECIMAL(18, 2),
},
one_day_average_price:{
    type: DataTypes.DECIMAL(18, 2),
},
seven_day_average_price:{
    type: DataTypes.DECIMAL(18, 2),
},
thirty_day_average_price:{
    type: DataTypes.DECIMAL(18, 2),
},
one_day_sales:{
    type: DataTypes.DECIMAL(18, 2),
},
seven_day_sales:{
    type: DataTypes.DECIMAL(18, 2),
},
thirty_day_sales:{
    type: DataTypes.DECIMAL(18, 2),
},
total_sales:{
    type: DataTypes.DECIMAL(18, 2),
},
image:{
    type: DataTypes.TEXT ,
},
description:{
    type: DataTypes.TEXT  ,
},
date_registration:{
    type: DataTypes.DATE,
},
edit_date:{
    type: DataTypes.DATE,
},
average_price:{
    type: DataTypes.DECIMAL(18, 2),
}
   
 

    



    
    
});

const setTabla= async()=>{
    await Nft_collection.sync();
}
setTabla();
module.exports = Nft_collection;