import express from "express"
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import materiaRouter from "./routes/materiaRouter.js";
import calificacionRouter from "./routes/calificacionRouter.js";
import acudienteRouter from "./routes/acudienteRouter.js";
import conectarDB from "./config/db.js";

//const conectarDB = require("./config/db");

const app = express()

conectarDB();

const port = process.env.PORT || 4000

app.listen(port, ()=>{
    console.log("El servidor está ejecutandose correctamente en el puerto:" +port);
});

mongoose.connect("mongodb+srv://calificAPP:rootcalificAPP@clustercalificapp.c6gvwmq.mongodb.net/test", (err)=>{
    if (err) {
        console.log(err);
    } else {
        console.log("Se ha conectado a la base de datos");
    }
})
app.use(express.json())
app.use("/api/usuarios", userRouter)
app.use("/api/materias", materiaRouter)
app.use("/api/calificaciones", calificacionRouter)
app.use("/api/acudientes", acudienteRouter)