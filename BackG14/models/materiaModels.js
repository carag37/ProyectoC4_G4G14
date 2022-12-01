const mongoose = require("mongoose");

//import mongoose from "mongoose";


const MateriaSchema = mongoose.Schema({
    nombre: { type: String, required: true, trim: true},
    curso: { type: mongoose.Schema.Types.ObjectId, ref: "Curso"},
    
});

//definir el modelo
//export default mongoose.model("Materia", MateriaSchema)

module.exports = mongoose.model("Materia", MateriaSchema);
