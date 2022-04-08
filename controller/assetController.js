const axios = require("axios");

const { response, request } = require("express");
const OpenseaScraper = require("opensea-scraper");
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





    for (let i = 0; i < assets.length; i++) {
      let suma = 0;

      assets[i].rarityScore = assets[i].traits.reduce((acc, cur) => {
        let rarity = cur.trait_count / assets.length;
        let score = 1 / rarity;
        suma = suma + score;
        return suma;
      }, 0);
    }



    assets.sort((a, b) => b.rarityScore - a.rarityScore);



    for (let i = 0; i < assets.length; i++) {
      assets[i].rank = i + 1;
    }



    //guardar archivo json
    const data = JSON.stringify(assets);
    const fs = require("fs");
    fs.writeFile(`./public/assets/${slug}.json`, data, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });

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

module.exports = {
  getAssets,
  getFullAsets,
};
