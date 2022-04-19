require("dotenv").config();

const fork = require('child_process').fork;

//buscar todos los archivos de la carpeta process

// const files = require('fs').readdirSync(__dirname + '/process');

// console.log(files);

// //crear una instancia de cada archivo
 
// files.forEach(function(file){
//     fork(__dirname + '/process/' + file);
// }
// );

//fork('process/process_collection/main.js');

//CRON JOB

const stringConvert='{"traits":[{"name":123,"value":1231}]}';

//convertir string a json
const jsonConvert=JSON.parse(stringConvert);

console.log(jsonConvert);



