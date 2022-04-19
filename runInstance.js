require("dotenv").config();

const fork_get_collection = require('child_process').fork;
const fork_get_assets = require('child_process').fork;

//buscar todos los archivos de la carpeta process

// const files = require('fs').readdirSync(__dirname + '/process');

// console.log(files);

// //crear una instancia de cada archivo
 
// files.forEach(function(file){
//     fork(__dirname + '/process/' + file);
// }
// );

fork_get_collection('process/process_collection/main.js');
fork_get_assets('process/job.js');