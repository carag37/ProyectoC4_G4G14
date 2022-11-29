import mongoose from "mongoose"

const conectarDB = async () => {
try{
    const connection = await mongoose.connect(
        "mongodb+srv://calificAPP:rootcalificAPP@cluster0.uayok5q.mongodb.net/?retryWrites=true&w=majority",
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