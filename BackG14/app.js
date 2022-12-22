import express from "express";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import materiaRoutes from "./routes/materiaRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import alumnoRoutes from "./routes/alumnoRoutes.js";
import docenteRoutes from "./routes/docenteRoutes.js";
import acudienteRoutes from "./routes/acudienteRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import cursoRoutes from  "./routes/cursoRoutes.js";
import cors from "cors";
import boletinRoutes from "./routes/boletinRoutes.js";
//crear la app como express
const app = express();

//conecto la base de datos
conectarDB();

//Defino el puerto de conexión de la DB
const port = process.env.PORT || 4000

//Escucho el puerto
app.listen(port, ()=>{
    console.log("El servidor está ejecutandose correctamente en el puerto:" +port);
});

//Habilitar los cors
app.use(cors());

// habilitar express.json
app.use(express.json({ extended : true }));

//rutas o routes
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/usuarios/email", usuarioRoutes);
app.use("/api/usuarios/tipo", usuarioRoutes);
app.use("/api/materias", materiaRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/alumnos", alumnoRoutes);
app.use("/api/docentes", docenteRoutes);
app.use("/api/acudientes", acudienteRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/cursos",cursoRoutes);
app.use("/api/boletines", boletinRoutes);