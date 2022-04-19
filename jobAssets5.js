require("dotenv").config();
const axios = require("axios");
const cron = require("node-cron");
const formateadorAsset = require("./helpers/formateadorAsset");
const Nft = require("./models/Nft");

const NftCollection = require("./models/Nft_collections");
const generateRarity = require("./utils/rarityScoreV3");
axios.defaults.timeout = 90000000;

cron.schedule(' 0 */12 * * *', () => {
  console.log('se ejecuto el job')
  hacerPeticiones();

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
  try {
    const data = await getData();

    for (let i = 1200; i < data.length; i++) {




    

      console.log(data[i].slug);

      const resp = await guardarAsset(data[i].slug)




      console.log(` Slug : ${data[i].slug} size : ${resp}}`);








    }
  } catch (error) {
    console.log('error');
    console.log(error.message);
    console.log(error);
  }
};



const guardarAsset = async (slug) => {

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
}





hacerPeticiones();