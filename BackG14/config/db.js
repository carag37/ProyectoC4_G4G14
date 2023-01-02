import mongoose from "mongoose"
import { config } from "dotenv";

config({ path: "variables.env"}); //funcion que llama al archivo de las variables de entorno

const conectarDB = async () => {
try{
    const connection = await mongoose.connect(
        process.env.UP_MDB,
        //"mongodb+srv://calificAPP:rootcalificAPP@clustercalificapp.c6gvwmq.mongodb.net/calificAPP-db?retryWrites=true&w=majority"
       // "mongodb+srv://calificAPP:rootcalificAPP@clustercalificapp.c6gvwmq.mongodb.net/prueba-cr?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,      
        });
        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB conectado en :${url}`);
 
}catch(error){
 console.log(`error: ${error.message}`);
 process.exit(1);
}

}

export default conectarDB;