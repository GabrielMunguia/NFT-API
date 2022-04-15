const fork = require('child_process').fork;

//buscar todos los archivos de la carpeta process

const files = require('fs').readdirSync(__dirname + '/process');

console.log(files);

//crear una instancia de cada archivo
 
files.forEach(function(file){
    fork(__dirname + '/process/' + file);
}
);


