import express from "express";
import mongoose from "mongoose";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import materiaRoutes from "./routes/materiaRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import alumnoRoutes from "./routes/alumnoRoutes.js";
import docenteRoutes from "./routes/docenteRoutes.js";

/*const express = require("express");
const mongoose = require("mongoose");
const usuarioRoutes = require("./routes/usuarioRoutes");
const tipoUsuarioRoutes = require("./routes/tipoUsuarioRoutes");*/

mongoose.connect("mongodb+srv://calificAPP:rootcalificAPP@clustercalificapp.c6gvwmq.mongodb.net/calificAPP-db?retryWrites=true&w=majority", (err)=>{
    if (err) {
        console.log(err);
    } else{
       
        console.log("Se ha conectado a la base de datos MongoDB");
    }
})

const app = express();
// habilitar express.json
app.use(express.json({ extended : true }));
//rutas o routes
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/materias", materiaRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/alumnos", alumnoRoutes);
app.use("api/docentes", docenteRoutes);

app.listen(4000, () => {
    console.log("Servidor corriendo en el puerto 4000");
});