const mongoose = require("mongoose");
const { mongoUrlConnect } = require("./enviromentConfig");

class Db {

    static async connect() {
        try {

        
            await mongoose.connect(mongoUrlConnect);
            console.info("Se ha conectado exitosamente a la base de datos");

        } catch (error) {
            console.error("Hubo un error", error);
            return Promise.reject(error);
        }
    }
}


module.exports = Db;