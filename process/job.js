const axios = require("axios");
const cron = require("node-cron");
const NftCollection = require("../models/Nft_collections");
axios.defaults.timeout = 90000000;

cron.schedule(' 0 */12 * * *',  () => {
console.log('se ejecuto el job')
     hacerPeticiones();

});

const getData = async () => {
  try {

    const resp = await NftCollection.findAll({order: [
    ['one_day_volume', 'DESC']
],});



    return resp;

  } catch (error) {
   
    console.log(error);
  }

 
};

const hacerPeticiones = async () => {
try {
  const data = await getData();
console.log('la data',data.length)

  for (let i = 0; i < data.length; i++) {
console.log(`intento numero ${i}`)
try {
  console.log(data[i].slug)
    const url = `http://localhost:8080/api/assets/save/${data[i].slug}`;
   

 const resp = await axios.post(url);

 console.log(` Slug : ${data[i].slug} size : ${resp.data.size}}`);
} catch (error) {
  console.log('paso un error ')
}



  }
} catch (error) {
  console.log('error');
  console.log(error.message);
}
};

hacerPeticiones();