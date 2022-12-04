//const mongoose = require("mongoose");

import mongoose from "mongoose";

const Resumenchema = mongoose.Schema({
    boletin: { type: mongoose.Schema.Types.ObjectId, ref: "boletin"},
    materia:{ type: mongoose.Schema.Types.ObjectId, ref: "Materia"},
    docente:{ type: mongoose.Schema.Types.ObjectId, ref: "Docente" },
    notas:{type: [Number]},
});

//definir el modelo
export default mongoose.model("Resumen", ResumenSchema);

//module.exports = mongoose.model("Resumen", ResumenSchema);