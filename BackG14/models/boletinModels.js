//const mongoose = require("mongoose");

import mongoose from "mongoose";

const BoletinSchema = mongoose.Schema({
    alumno: { type: mongoose.Schema.Types.ObjectId, ref: "Alumno"},
    materia:{ type: mongoose.Schema.Types.ObjectId, ref: "Materia"},
    docente:{ type: mongoose.Schema.Types.ObjectId, ref: "Docente" },
    notas:{type: [Number]},
});

//definir el modelo
export default mongoose.model("Boletin", BoletinSchema);

//module.exports = mongoose.model("Boletin", BoletinSchema);