const axios = require("axios");
const NftCollection = require("../models/Nft_collections");
const { response, request } = require("express");


const getCollectionsDay= async (req, res) => {
try {
  const collections = await NftCollection.findAll({order: [
    ['one_day_volume', 'DESC']
],});
  res.json({
    status: "ok",
    data: collections,
  });
} catch (error) {
  res.status(500).json({
    status: "error",
    message: error,
  })
}
};
const getCollectionsWeek= async (req, res) => {
  try {
    const collections = await NftCollection.findAll({order: [
      ['seven_day_volume', 'DESC']
  ],});
    res.json({
      status: "ok",
      data: collections,
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
      const collections = await NftCollection.findAll({order: [
        ['thirty_day_volume', 'DESC']
    ],});
      res.json({
        status: "ok",
        data: collections,
      });
    } catch (error) {
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
