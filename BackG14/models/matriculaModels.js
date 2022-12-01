const mongoose = require("mongoose");

//import mongoose from "mongoose";

const MatriculaSchema = mongoose.Schema({
    alumno: { type: mongoose.Schema.Types.ObjectId, ref: "Alumno"},
    curso:{ type: mongoose.Schema.Types.ObjectId, ref: "curso"},
    });

//definir el modelo
//export default mongoose.model("Matricula", MatriculaSchema);

module.exports = mongoose.model("Matricula", MatriculaSchema);