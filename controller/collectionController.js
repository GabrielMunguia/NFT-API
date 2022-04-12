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
    


module.exports = {
  getCollectionsWeek,
  getCollectionsMoth,
  getCollectionsDay
  
};
