const axios = require("axios");
const Nft = require("../models/Nft");
const { response, request } = require("express");
const formateadorAsset = require("../helpers/formateadorAsset");
const assetAdapter = require("../adapters/assetAdapter");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const generateRarity = require("../utils/rarityScoreV3");

axios.defaults.timeout = 30000;



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
          `https://api.opensea.io/api/v1/assets?collection_slug=${slug}&limit=200&cursor=${next}`,
          confing
        );
        assets = assets.concat(resp.data.assets);
        next = resp.data.next;
        //esperar dos segundos
      } else {
        const resp = await axios.get(
          `https://api.opensea.io/api/v1/assets?collection_slug=${slug}&limit=200`,
          confing
        );

        assets = assets.concat(resp.data.assets);
        next = resp.data.next;
      }
      console.log(i);
      i++;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } while (next !== null);

    assets = await generateRarity(assets);

    for (let i = 0; i < assets.length; i++) {
      const guardarNft = async () => {
        const data = formateadorAsset(assets[i]);
        const nft = new Nft(data);

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
  const assets = await Nft.findAll({
    where: {
      slug,
    },
  });

  const array=[];
  assets.forEach(asset=>{
    array.push(assetAdapter(asset));
  });

  res.json({ size: assets.length, array });
} catch (error) {
  res.status(500).json({
    status: false,
    msg: "Ocurrio un error",
    error:error.message,
  })
}
};




module.exports = {
  saveAllAssets,
  getFullAsetsBySlug,
};
