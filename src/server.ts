import express from "express";
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from "./config/swagger";
import router from "./router";
import db from "./config/db";
import cors, {CorsOptions} from 'cors';
import colors from "colors";
import morgan from "morgan";

//Conectar a db
async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.green.bold("Base de datos conectada"));
    } catch (error) {
        console.log(error);
        console.log(colors.red.bold('Hubo un error al conectar la DB'));
        
    }
    
}

connectDB()

const server = express()

//Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
            
        }
        
    }

}
server.use(cors(corsOptions))

//leer datos de formulario
server.use(express.json())
server.use(morgan('dev')) //muestra las peticiones en consola

//routing
server.use('/api/products', router)

//DOCs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default server