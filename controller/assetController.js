const axios = require("axios");
const Nft = require("../models/Nft");
const { response, request } = require("express");
const OpenseaScraper = require("opensea-scraper");
const { formatPriceAsset } = require("../helpers/formateadorPrecio");
axios.defaults.timeout = 30000;

const getContract = async (slug) => {
  //peticion fetch get con header
  const response = await axios.get(
    `https://api.opensea.io/api/v1/collection/${slug}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "c1051ef9ad3643a0abaeb5f2a7126352",
      },
    }
  );
  const data = await response.data;

  return data.collection.primary_asset_contracts[0].address;
};
const getAssets = async (req = request, res = response) => {
  const { slug } = req.params;
  const options = {
    debug: false,
    logs: false,
    sort: true,
    browserInstance: undefined,
  };
  url =
    "https://opensea.io/collection/azuki?search[sortAscending]=true&search[sortBy]=PRICE";
  resultSize = 10000; // if you need less than 32 offers, please use the function `offers()` instead
  result = await OpenseaScraper.offersByScrollingByUrl(
    url,
    resultSize,
    options
  );
  let contract = await getContract(slug);

  res.json({
    status: true,
    msg: "GET API DESDE CONTROLADOR ASSET",
    slug,
    contract,
    size: result.offers.length,
    result: result.offers,
  });
};

const getFullAsets = async (req = request, res = response) => {
  try {
    const { slug } = req.params;
    let confing = {
      headers: {
        "X-API-KEY": "c1051ef9ad3643a0abaeb5f2a7126352",
      },
    };
    //traer todos los items de ese slug y los guarda en un array
    let assets = [];

    //let numeroDeItemsConTrait = 0;

    // Do while mientras el objeto next no sea null
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

        //esperar dos segundos
      }
      console.log(i);
      i++;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } while (next !== null);

    // for (let i = 0; i < assets.length; i++) {
    //   let suma = 0;

    //   assets[i].rarityScore = assets[i].traits.reduce((acc, cur) => {
    //     let rarity = cur.trait_count / assets.length;
    //     let score = 1 / rarity;
    //     suma = suma + score;
    //     return suma;
    //   }, 0);
    // }

    //Sacar el rarity score de cada item

    let tally = { TraitCount: {} };

    for (let i = 0; i < assets.length; i++) {
      let nftTraits = assets[i].map((e) => e.trait_type);
      let nftValues = assets[i].map((e) => e.trait_value);
      let numOfTraits = nftTraits.length;

      if (tally.TraitCount[numOfTraits]) {
        tally.TraitCount[numOfTraits]++;
      } else {
        tally.TraitCount[numOfTraits] = 1;
      }

      for (let j = 0; j < nftTraits.length; j++) {
        let current = nftTraits[j];
        if (tally[current]) {
          tally[current].occurences++;
        } else {
          tally[current] = { occurences: 1 };
        }

        let currentValue = nftValues[j];
        if (tally[current][currentValue]) {
          tally[current][currentValue]++;
        } else {
          tally[current][currentValue] = 1;
        }

      }
    }
    ///--------------

    const collectionAttributes = Object.keys(tally);
    const nftArr=[];

    for(let i = 0; i < assets.length; i++){
      let current= assets[i];
      let totalRarity = 0;

      for(let j = 0; j < current.traits.length; j++){
        let rarityScore= 8*(1/(tally[current[j].trait_type][current[j].trait_value]/assets.length));
        current.rarityScore= rarityScore;
        totalRarity+= rarityScore;
      }

      let rarityScoreNumTraits= 1/(tally.TraitCount[Object.keys(current).length]/assets.length);

      current.push({
        trait_type:"TraitCount",
        value:Object.keys(current).length,
        rarityScore:rarityScoreNumTraits
      });
      totalRarity+= rarityScoreNumTraits;



      if(current.length<collectionAttributes.length){
        let nftAtributes= current.map((e)=>e.trait_type);
        let absent= collectionAttributes.filter((e)=>!nftAtributes.includes(e));

        absent.forEach(type=>{
          let rarityScoreNull= 1/((assets.length-tally[type].occurences)/assets.length);
          current.push({
            trait_type:type,
            value:null,
            rarityScore:rarityScoreNull,
          });
          totalRarity+= rarityScoreNull;
        });

      }
      assets[i].rarityScore= totalRarity;
      assets[i].rarityScoreNumTraits= rarityScoreNumTraits;
      

    }
    //-----------



    assets.sort((a, b) => b.rarityScore - a.rarityScore);

    for (let i = 0; i < assets.length; i++) {
      assets[i].rank = i + 1;
    }

    assets.map(async (asset) => {
      const price =
        asset.last_sale !== null
          ? formatPriceAsset(
              asset.last_sale.payment_token.decimals,
              asset.last_sale.total_price
            )
          : 0;
      const data = {
        name: asset.name,
        slug: asset.collection.slug,
        price: asset.num_sales,
        image: asset.image_original_url,
        rank: asset.rank,
        permalink: asset.permalink,
      };
      const nft = new Nft(data);
      await nft.save();
    });

    //guardar archivo json
    // const data = JSON.stringify(assets);
    // const fs = require("fs");
    // fs.writeFile(`./public/assets/${slug}.json`, data, (err) => {
    //   if (err) throw err;
    //   console.log("The file has been saved!");
    // });

    res.json({
      status: true,
      msg: "GET API DESDE CONTROLADOR ASSET",
      slug,
      size: assets.length,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "ERORRR",
      error,
    });
  }
};

const getFullAsetsBySlug = async (req, res) => {
  const { slug } = req.params;
  const assets = await Nft.findAll({
    where: {
      slug,
    },
  });
  res.json({ size: assets.length, assets });
};
module.exports = {
  getAssets,
  getFullAsets,
  getFullAsetsBySlug,
};
