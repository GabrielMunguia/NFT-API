const axios = require("axios");
const Nft = require("../models/Nft");
const { response, request } = require("express");
const formateadorAsset = require("../helpers/formateadorAsset");
const assetAdapter = require("../adapters/assetAdapter");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const generateRarity = require("../utils/rarityScoreV3");


axios.defaults.timeout = 90000000;





//Guarda todos los assets de una colleccion;
const saveAllAssets = async (req = request, res = response) => {
  try {

  
    const { slug } = req.params;
    let confing = {
      headers: {
        "X-API-KEY": "c1051ef9ad3643a0abaeb5f2a7126352",
      },
    };

    let assets = [];

    let next = null;
    let i = 0;

    do {
      if (next !== null) {
        const resp = await axios.get(
          `https://api.opensea.io/api/v1/assets?collection_slug=${slug}&limit=200&cursor=${next}&include_orders=true`,
          confing
        );
        assets = assets.concat(resp.data.assets);
        next = resp.data.next;
        //esperar dos segundos
      } else {
        const resp = await axios.get(
          `https://api.opensea.io/api/v1/assets?collection_slug=${slug}&limit=200&include_orders=true`,
          confing
        );
        console.log(`https://api.opensea.io/api/v1/assets?collection_slug=${slug}&limit=200&include_orders=true`)

        assets = assets.concat(resp.data.assets);
        next = resp.data.next;
      }
      console.log(i);
      i++;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } while (next !== null );

    assets = await generateRarity(assets);

    for (let i = 0; i < assets.length; i++) {
      const guardarNft = async () => {
        const data = formateadorAsset(assets[i]);
         const nft= new Nft(data);
        await nft.save();

       
 
        
      };
      await guardarNft();
    }
    
  


    res.json({
      status: true,
      msg: "Se agregaron correctamente los assets",
      slug,
      size: assets.length,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: false,
      msg: "ERORRR",
      error,

    });
  }
};








//Devuelve todos los assets por slug 
const getFullAsetsBySlug = async (req, res) => {
  try {
 
  
    const { slug } = req.params;
    const { page = 1, minPrice,maxPrice } = req.query;

    const limit = 24;
    const offset = (page - 1) * limit;
    const traitsQuery = req.traitsQuery;
    const orderBy=req.orderBy;
    const orders=req.order;


    const url=`assetsBySlug-${slug}-page-${page}-where-${JSON.stringify(traitsQuery)}-min-${minPrice}-max-${maxPrice}-orderBy${orderBy}-orders-${orders};`
console.log(orderBy,"-",orders)


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

const order=orderBy?[
  [orderBy, orders],
 
]:[
  ['rank', 'ASC'],
 
]

    let  where = traitsQuery ? {

      slug,
      traits: {
        [Op.or]: traitsQuery.map((trait) => {
          return Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("traits")),
            "LIKE",
            `%${trait}%`
          );
        }),
      },



    } : {
      slug,
    }
   //min price where 
    if(minPrice &&!maxPrice){
      where.price={
        [Op.gte]:parseFloat(minPrice)
      }
    }
    //max price where
    if(maxPrice &&!minPrice){
      where.price={
        [Op.lte]:parseFloat(maxPrice)
      }
    }
    //min and max price where
    if(minPrice &&maxPrice){
      where.price={
        [Op.between]:[parseFloat(minPrice),parseFloat(maxPrice)]
      }
    }




    const { rows, count } = await Nft.findAndCountAll({
      limit,
      offset,
      where,
      order
    });


    const assets = rows.map(asset => {
      return assetAdapter(asset);
    })
   
     client.set(url,JSON.stringify({
      status: true,
      page,
      total_pages: Math.ceil(count / limit),
      count,
      assets,


    }),(err,reply)=>{
     
      if(err)console.log(err);
     
     
    });
    client.expire( url,  82800)

    return res.json({
      status: true,
      page,
      total_pages: Math.ceil(count / limit),
      count,
      assets,


    });
   
    


  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Ocurrio un error!",
      error: error.message,
    });
  }

};



const getFullTraitsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const url = `traitsBySlug-${slug}`;
   
 const cache = await  client.get(url, async (err, reply) => {

  if(err){
    console.log('entro al error')
  }
  
  if (reply) {
    //cerrar conexion
    client.quit();
    return res.json({
      status: true,
     
      extra:"true"
    });
  } 
})


if(cache){

  return res.json(JSON.parse(cache));
}

  const traits=   await Nft.findAll({
      attributes: ['traits'],
     where: { slug } ,
  });
const traitsFilter={};
  traits.map((asset) => {
   try {
    const traitList = JSON.parse(asset.traits);
    traitList.map((t) => {
      const type = (t.trait_type + "").toUpperCase();
      const value = (t.value + "").toUpperCase();

      if (traitsFilter[type] === undefined) {
        traitsFilter[type] = [];
      }

      if (!traitsFilter[type].includes(value)) {
        traitsFilter[type].push(value);
      }
    });
   } catch (error) {
     console.log(error.message)
   }
  });


  client.set(url,JSON.stringify({
    status: true,
    slug,
    traits:traitsFilter


  }),(err,reply)=>{
   
    if(err)console.log(err);
   
   
  });
  client.expire( url,  82800)

  res.status(200).json({
    status: true,
    slug,
    traits:traitsFilter
   
  })
} catch (error) {
  res.status(500).json({
    status: false,
    msg: "Ocurrio un error!",
    error: error.message,
  });
}
}





module.exports = {
  saveAllAssets,
  getFullAsetsBySlug,
  getFullTraitsBySlug
};
