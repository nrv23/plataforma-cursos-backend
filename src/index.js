const express = require('express');
const cors = require('cors');
const http = require("http");
const path = require('path');
const helmet = require("helmet");
const xss = require("xss-clean");
const DB = require('./config/dbConnection');
const { serverPort } = require("./config/enviromentConfig");
const { authLimiter } = require('./middleware/rate-limiter');
// 
const app = express();
const router = require("./router");
const notFound = require("./router/not-found");

(async () => {
    try {

        await DB.connect();
        
        // set security HTTP headers
        app.use(helmet());
        app.use(express.json());
        app.use(express.urlencoded({
            extended: true
        }));
        // servir una carpeta publica para mostrar que el api esta corriendo
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(xss());
        app.use(cors());

        app.use("/api/v1", router);
        app.use((req, res) => { // agregar ruta cuando la busqueda no encuentre un recurso
            return notFound(req, res);
        });


        if (process.env.NODE_ENV === 'prod') {
            app.use('/api/v1/', authLimiter);
        }


        const server = http.createServer(app);
        const port = process.env.NODE_ENV === "dev" ? 3000 : serverPort;

        server.listen(port, () => {
            console.log(`Escuchando peticiones por puerto : ${port}`);
            console.log(`Ejecutando servidor en ambiente: ${process.env.NODE_ENV}`);
        })

        const exitHandler = () => {
            if (server) {
                server.close(() => {
                    //logger.info('Server closed');
                    process.exit(1);
                });
            } else {
                process.exit(1);
            }
        };

        const unexpectedErrorHandler = (error) => {
            //logger.error(error);
            exitHandler();
        };

        process.on('uncaughtException', unexpectedErrorHandler);
        process.on('unhandledRejection', unexpectedErrorHandler);

        process.on('SIGTERM', () => {
            //logger.info('SIGTERM received');
            if (server) {
                server.close();
            }
        });

    } catch (error) {
        console.log(error);
        //logger.error(error);
        process.exit(1);
    }
})();


module.exports = app;