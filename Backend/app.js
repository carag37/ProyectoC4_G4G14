import express from "express"
import userRouter from "./routes/userRouter.js";
import materiaRouter from "./routes/materiaRouter.js";
import cursoRouter from "./routes/cursoRouter.js";
import boletinRouter from "./routes/boletinRouter.js";
import resumenRouter from "./routes/resumenRouter.js";
import docenteRouter from "./routes/docenteRouter.js";
import conectarDB from "./config/db.js";
import testRouter from "./routes/testRouter.js";
import loginRouter from "./routes/loginRouter.js";
//import mwPrueba from "./middlewares/mwPrueba.js";

//const conectarDB = require("./config/db");

const app = express()

conectarDB();

const port = process.env.PORT || 4000

app.listen(port, ()=>{
    console.log("El servidor está ejecutandose correctamente en el puerto:" +port);
});

app.use(express.json())
//app.use(mwPrueba)
app.use("/api/usuarios", userRouter)
app.use("/api/materias", materiaRouter)
app.use("/api/docentes", docenteRouter)
app.use("/api/boletines", boletinRouter)
app.use("/api/cursos", cursoRouter)
app.use("/api/resumenes", resumenRouter)
app.use("/api/test", testRouter)
app.use("/api/login", loginRouter)