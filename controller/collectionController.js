const axios = require("axios");
const NftCollection = require("../models/Nft_collections");
const { response, request } = require("express");


const getCollections= async (req, res) => {
try {
  const collections = await NftCollection.findAll();
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
  getCollections
  
};
