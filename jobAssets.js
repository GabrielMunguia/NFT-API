require("dotenv").config();
const axios = require("axios");
const cron = require("node-cron");
const formateadorAsset = require("./helpers/formateadorAsset");
const Nft = require("./models/Nft");
const fs= require('fs');
const NftCollection = require("./models/Nft_collections");
const generateRarity = require("./utils/rarityScoreV3");
axios.defaults.timeout = 90000000;

cron.schedule(' 0 */23 * * *', () => {
 try {

  fs.appendFileSync(`jobAssets.txt`, `se ejecuto el job ${new Date()} \n`);
  hacerPeticiones();
 } catch (error) {
  let errorText = `Error : Date: ${new Date()}  Mesagge : ${error.message}\n `;
  fs.appendFileSync(`logs/jobAssets/JOBErrorSaveAsset.txt`, errorText);
 }

});

const getData = async () => {
  try {

    const resp = await NftCollection.findAll({
      order: [
        ['one_day_volume', 'DESC']
      ],
    });

    return resp;

  } catch (error) {

    console.log(error);
  }


};

const hacerPeticiones = async () => {
  fs.appendFileSync(`hacerPeticiones.txt`, `se ejecuto el job start ${new Date()} \n`);
  try {
    const data = await getData();

    for (let i = 334; i < data.length; i++) {

    try {
    
   

      const resp = await guardarAsset(data[i].slug)



    } catch (error) {
      let errorText = `Error : Date: ${new Date()}  Mesagge : ${error.message}\n `;

      fs.appendFileSync(`logs/jobAssets/ErrorSaveAsset.txt`, errorText);
  
    }



    }
  } catch (error) {

    let errorText = `Error : Date: ${new Date()}  Mesagge : ${error.message}\n `;

    fs.appendFileSync(`logs/jobAssets/ErrorSaveAsset.txt`, errorText);

  }

  fs.appendFileSync(`hacerPeticiones.txt`, `se ejecuto el job end ${new Date()} \n`);
};



const guardarAsset = async (slug) => {

try {
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


      assets = assets.concat(resp.data.assets);
      next = resp.data.next;
    }

    i++;
    await new Promise((resolve) => setTimeout(resolve, 2000));
  } while (next !== null );

  assets = await generateRarity(assets);

  for (let i = 0; i < assets.length; i++) {
    const guardarNft = async () => {
      const data = formateadorAsset(assets[i]);
      const nft = new Nft(data);

      await nft.save();
    };
    await guardarNft();
  }

  return assets.length;
} catch (error) {
  console.log('entro al error')
  let errorText = `Error : Date: ${new Date()}  Mesagge : ${error.message}\n `;

  fs.appendFileSync(`logs/jobAssets/ErrorSaveAsset.txt`, errorText);
}
}





hacerPeticiones();