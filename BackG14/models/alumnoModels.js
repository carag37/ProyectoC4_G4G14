//const mongoose = require("mongoose");

import mongoose from "mongoose";

const AlumnoSchema = mongoose.Schema({
    idAlumno:{type: Number, required: true, trim: true, unique:true},
    nombre: { type: String, required: true, trim: true},
    direccion: { type: String, required: true, trim: true},
    telefono: { type: Number, required: true, trim: true},
    edad: { type: Number, required: true, trim: true},
    curso: { type: mongoose.Schema.Types.ObjectId, ref: "Curso"},
    estado:{type:Boolean, required:true, trim:true},
    acudiente: [{type: mongoose.Schema.Types.ObjectId, ref: "Acudiente"}],
    
});

//definir el modelo
export default mongoose.model("Alumno", AlumnoSchema)
//module.exports = mongoose.model("Alumno", AlumnoSchema);
