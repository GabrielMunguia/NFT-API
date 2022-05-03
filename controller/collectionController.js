
const NftCollection = require("../models/Nft_collections");
const { response, request } = require("express");

const { QueryTypes } = require('sequelize');
const db = require("../db/conexion");




const getCollectionsDay= async (req, res) => {
try {

  const url = `collections-day`;
 
  const cache = await  client.get(url, async (err, reply) => {

    if(err){
      console.log('entro al error')
    }
    
    if (reply) {
      //cerrar conexion
      client.quit();
   
    } 
  })
  
  
  if(cache){
  
    return res.json(JSON.parse(cache));
  }


const collectionsDay = await db.query("SELECT * FROM nft_collections as c WHERE (select count(*)from Nfts as n where n.slug=c.slug )>0 order by one_day_volume desc; ", { type: QueryTypes.SELECT });


client.set(url,JSON.stringify({
  status: "ok",
  data: collectionsDay,


}),(err,reply)=>{
 
  if(err)console.log(err);
 
 
});

client.expire( url,  18000)




res.json({
    status: "ok",
    data: collectionsDay,
  });
} catch (error) {
  res.status(500).json({
    status: "error",
    message: error.message,
  })
}
};




const getCollectionsWeek= async (req, res) => {
  try {
    const url = `collections-week`;

    const cache = await  client.get(url, async (err, reply) => {

      if(err){
        console.log('entro al error')
      }
      
      if (reply) {
        //cerrar conexion
        client.quit();
     
      } 
    })
    
    
    if(cache){
    
      return res.json(JSON.parse(cache));
    }


    const collectionsWeek = await db.query("SELECT * FROM nft_collections as c WHERE (select count(*)from Nfts as n where n.slug=c.slug )>0 order by seven_day_volume desc; ", { type: QueryTypes.SELECT });
   

client.set(url,JSON.stringify({
  status: "ok",
  data: collectionsWeek,


}),(err,reply)=>{
 
  if(err)console.log(err);
 
 
});

client.expire( url,  18000)
   
   
   
    res.json({
      status: "ok",
      data: collectionsWeek,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    })
  }
  };
  const getCollectionsMoth= async (req, res) => {
    try {
      const url = `collections-moth`;    
      const cache = await  client.get(url, async (err, reply) => {

        if(err){
          console.log('entro al error')
        }
        
        if (reply) {
          //cerrar conexion
          client.quit();
       
        } 
      })
      
      
      if(cache){
      
        return res.json(JSON.parse(cache));
      }

const collectionsMoth = await db.query("SELECT * FROM nft_collections as c WHERE (select count(*)from Nfts as n where n.slug=c.slug )>0 order by thirty_day_volume desc; ", { type: QueryTypes.SELECT });







client.set(url,JSON.stringify({
  status: "ok",
  data: collectionsMoth,


}),(err,reply)=>{
 
  if(err)console.log(err);
 
 
});

client.expire( url,  18000)
res.json({
        status: "ok",
        data: collectionsMoth,
      });
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        status: "error",
        message: error,
      })
    }
    };

  const saveCollection = async (req, res) => {
    try { 
      const data= req.body;
      //guardar si no existe en la base de datos, si existe actualizar
      const collection = await NftCollection.findOne({
        where: {
          slug: data.slug,
        },
      });
      if (collection) {
        await NftCollection.update(
          {
            name: data.name,
            slug: data.slug,
            owners: data.owners,
            floor_price: data.floor_price,
            total_supply: data.total_supply,
            total_volume: data.total_volume,
            one_day_volume: data.one_day_volume,
            seven_day_volume: data.seven_day_volume,
            thirty_day_volume: data.thirty_day_volume,
            one_day_change: data.one_day_change,
            seven_day_change: data.seven_day_change,
            thirty_day_change: data.thirty_day_change,
            one_day_average_price: data.one_day_average_price,
            seven_day_average_price: data.seven_day_average_price,
            thirty_day_average_price: data.thirty_day_average_price,
            average_price: data.average_price,
            one_day_sales: data.one_day_sales,
            seven_day_sales: data.seven_day_sales,
            thirty_day_sales: data.thirty_day_sales,
            total_sales: data.total_sales,
            image: data.image,
            description: data.description,
            date_registration: data.date_registration,
            edit_date: data.edit_date,
            
          },
          {
            where: {
              slug: data.slug,
            },
          }
        );
      } else {
        await NftCollection.create(data);
      }


      res.json({
        status: "ok",
        data: collection,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      })
    }
  };

    


module.exports = {
  getCollectionsWeek,
  getCollectionsMoth,
  getCollectionsDay,
  saveCollection,
  
};
