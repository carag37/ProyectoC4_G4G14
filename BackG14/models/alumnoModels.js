const mongoose = require("mongoose");

//import mongoose from "mongoose";

const AlumnoSchema = mongoose.Schema({
    nombre: { type: String, required: true, trim: true},
    direccion: { type: String, required: true, trim: true},
    telefono: { type: Number, required: true, trim: true},
    fechaNacimiento: { type: Date, required: true, trim: true, unique: true},
    estado:{type:String, required:true, trim:true},
    acudiente: {type: [mongoose.Schema.Types.ObjectId, ref: "Acudiente"]},
    Matricula: {type: mongoose.Schema.Types.ObjectId, ref: "Matricula"},
    
});

//definir el modelo
//export default mongoose.model("users", userModel)
module.exports = mongoose.model("Alumno", AlumnoSchema);
