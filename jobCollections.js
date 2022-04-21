require("dotenv").config();
const cron= require('node-cron');
const axios = require("axios");
const Nft_collections = require("./models/Nft_collections");
const fs= require('fs');

const URL_LUKY = 'https://cms-cache.luckytrader.com/lucky/project-list?include=id,name,slug,updated_at';

const saveAllCollections = async () => {
    fs.appendFileSync(`saveAllCollections.txt`, `start ${new Date()}\n`);
try {

    const res = await axios.get(URL_LUKY);
    const data = await res.data;
    console.log(data.length);

    for (let i = 0; i < data.length; i++) {
        
        const newObject = {
            name: data[i].name,
            slug: data[i].slug,
            image: data[i].image.url,
            description: data[i].seo.metaDescription
        };

        let resultStats = null;


        let URL_STATS = `https://api.opensea.io/api/v1/collection/${newObject.slug == null ? "no" : newObject.slug.toString()}/stats`;
        let nameO = "";

        //validar si vienen 404 not found
        try {
            const res2 = await axios.get(URL_STATS);
            const data2 = await res2.data;
            resultStats = data2;
            nameO = newObject.slug;

        } catch (err) {
            try {
                //cambiar los espacios por guiones del name
                let nombreNew= newObject.name.toString();
                nombreNew = nombreNew.trim();
                nombreNew = nombreNew.split(" ");
                let aux= nombreNew.join("-");
                nombreNew = aux;
                nombreNew= nombreNew.toLowerCase();



                URL_STATS = `https://api.opensea.io/api/v1/collection/${nombreNew}/stats`;
                const res3 = await axios.get(URL_STATS);
                const data3 = await res3.data;
                resultStats = data3;
                nameO = newObject.name;
            }
            catch (err) {
                resultStats = null;
                nameO = "no encontrado";
                let errorText = `Error : Date: ${new Date()}  Mesagge : ${err.message}\n `;
                fs.appendFileSync(`logs/jobCollections/ErrorSaveCollection.txt`, errorText);
            }
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (resultStats !== null) {
            resultStats = resultStats.stats;

            newObject.owners = resultStats.num_owners;
            newObject.floor_price = resultStats.floor_price;
            newObject.total_supply = resultStats.total_supply;
            newObject.total_volume = resultStats.total_volume;
            newObject.one_day_volume = resultStats.one_day_volume;
            newObject.seven_day_volume = resultStats.seven_day_volume;
            newObject.thirty_day_volume = resultStats.thirty_day_volume;
            newObject.one_day_change = resultStats.one_day_change;
            newObject.seven_day_change = resultStats.seven_day_change;
            newObject.thirty_day_change = resultStats.thirty_day_change;
            newObject.one_day_average_price = resultStats.one_day_average_price;
            newObject.seven_day_average_price = resultStats.seven_day_average_price;
            newObject.thirty_day_average_price = resultStats.thirty_day_average_price;
            newObject.average_price = resultStats.average_price;
            newObject.one_day_sales = resultStats.one_day_sales;
            newObject.seven_day_sales = resultStats.seven_day_sales;
            newObject.thirty_day_sales = resultStats.thirty_day_sales;
            newObject.total_sales = resultStats.total_sales;

            const saveCollection = async () => {
                const dataSave = new Nft_collections(newObject);
                //guardar si no existe en la base de datos, si existe actualizar
                // const collection = await Nft_collections.findOne({
                //     where: {
                //         slug: dataSave.slug,
                //     },
                // });
                // if (collection) {
                //     await Nft_collections.update(
                //         {
                //             name: dataSave.name,
                //             slug: dataSave.slug,
                //             owners: dataSave.owners,
                //             floor_price: dataSave.floor_price,
                //             total_supply: dataSave.total_supply,
                //             total_volume: dataSave.total_volume,
                //             one_day_volume: dataSave.one_day_volume,
                //             seven_day_volume: dataSave.seven_day_volume,
                //             thirty_day_volume: dataSave.thirty_day_volume,
                //             one_day_change: dataSave.one_day_change,
                //             seven_day_change: dataSave.seven_day_change,
                //             thirty_day_change: dataSave.thirty_day_change,
                //             one_day_average_price: dataSave.one_day_average_price,
                //             seven_day_average_price: dataSave.seven_day_average_price,
                //             thirty_day_average_price: dataSave.thirty_day_average_price,
                //             average_price: dataSave.average_price,
                //             one_day_sales: dataSave.one_day_sales,
                //             seven_day_sales: dataSave.seven_day_sales,
                //             thirty_day_sales: dataSave.thirty_day_sales,
                //             total_sales: dataSave.total_sales,
                //             image: dataSave.image,
                //             description: dataSave.description,
                //             edit_date: dataSave.edit_date,
                //         },
                //         {
                //             where: {
                //                 slug: dataSave.slug,
                //             },
                //         }
                //     );
                // }
                // else {
                    await dataSave.save();
                // }
            };
            await saveCollection();
        } else {
            //imprimir urlStats
            console.log("run collection :",URL_STATS);
            /* console.log(nameO);
            console.log(newObject);
            console.log(resultStats); */
        }


    }
} catch (error) {
    let errorText = `Error : Date: ${new Date()}  Mesagge : ${error.message}\n `;
    fs.appendFileSync(`logs/jobCollections/ErrorSaveCollection.txt`, errorText);
}


fs.appendFileSync(`saveAllCollections.txt`, `end ${new Date()}\n`);
}


saveAllCollections();

// cron job  de una hora

cron.schedule('0 */1 * * *', () => {
    console.log('cron job running');
    fs.appendFileSync(`jobCollection.txt`, `cron job running ${new Date()}\n`);
    //  saveAllCollections();
});