const express = require("express");
const cors = require('cors');
const db = require("../db/conexion");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.assets='/api/assets'

     //MIDDLEWARES
     this.middleware();
    //RUTAS
    this.routes();
    //CONEXION A LA BASE DE DATOS
    this.dbConnection();
  }

  routes() {


    this.app.use(this.assets,require('../routes/Asset') )
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
