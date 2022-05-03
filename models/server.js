const express = require("express");
const compression = require('compression')
const cors = require('cors');
const db = require("../db/conexion");
const redis = require('redis');
// const client =  redis.createClient({
//   host: '127.0.0.1',
//    port: 6379
// });

module.exports= client = redis.createClient({
  url: 'redis://localhost:6379'
})
client.on('error', function (err) {
  console.log('Error ' + err);
});
client.connect()


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.assets='/api/assets';
    this.collections='/api/collections';

     //MIDDLEWARES
     this.middleware();
    //RUTAS
    this.routes();
    //CONEXION A LA BASE DE DATOS
    this.dbConnection();
    //COmpresion de archivos

    //Conectar redis
   
    
  }

  

  routes() {


    this.app.use(this.assets,require('../routes/Asset') );
    this.app.use(this.collections,require('../routes/Collection') );
    this.app.use(compression())
  }
  async dbConnection() {

    try {
        
        await db.authenticate();
        
        console.log('Base de datos online');

    } catch (error) {
        throw new Error( error );
    }

}
  middleware() {
      //Directorio publico
      this.app.use(express.static('public'))
      //CORS
      this.app.use(cors())
      //Lectura y parseo del body en JSON
      this.app.use(express.json())
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      //imprimir el host y el puerto
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
