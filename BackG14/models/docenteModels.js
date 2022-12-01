const mongoose = require("mongoose");

//import mongoose from "mongoose";

const DocenteSchema = mongoose.Schema({
    nombre: { type: String, required: true, trim: true},
    direccion: { type: String, required: true, trim: true},
    telefono: { type: Number, required: true, trim: true},
   // email: { type: String, required: true, trim: true, unique: true},
    materia:{ type: mongoose.Schema.Types.ObjectId, ref: "Materia"},
    mensaje: {type: mongoose.Schema.Types.ObjectId, ref: "Mensaje"},
    usuarioSistema:{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
});

//definir el modelo
//export default mongoose.model("Docente", DocenteSchema);

module.exports = mongoose.model("Docente", DocenteSchema);
