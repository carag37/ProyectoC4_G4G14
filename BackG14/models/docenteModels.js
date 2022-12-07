//const mongoose = require("mongoose");

import mongoose from "mongoose";

const DocenteSchema = mongoose.Schema({
    nombre: { type: String, required: true, trim: true},
    direccion: { type: String, required: true, trim: true},
    telefono: { type: Number, required: true, trim: true},
    materia:{type:String},
    //materia:{ type: mongoose.Schema.Types.ObjectId, ref: "Materia"},
    estado:{type:Boolean, required:true, trim:true},
    usuarioSistema:{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
});

//definir el modelo
export default mongoose.model("Docente", DocenteSchema);

//module.exports = mongoose.model("Docente", DocenteSchema);
