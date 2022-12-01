const mongoose = require("mongoose");

//import mongoose from "mongoose";

const BoletinSchema = mongoose.Schema({
    nombre: { type: String, required: true, trim: true},
    alumno: { type: mongoose.Schema.Types.ObjectId, ref: "Alumno"},
    materia:{ type: mongoose.Schema.Types.ObjectId, ref: "Materia"},
    docente:{ type: mongoose.Schema.Types.ObjectId, ref: "Docente" },
    notas:{ type: Object  },
});

//definir el modelo
//export default mongoose.model("Boletin", BoletinSchema);

module.exports = mongoose.model("Boletin", BoletinSchema);