const mongoose = require("mongoose");

//import mongoose from "mongoose";


const CursoSchema = mongoose.Schema({
    descripcion: { type: String, required: true, trim: true},
});

//export default mongoose.model("Curso", CursoSchema);
module.exports = mongoose.model("Curso", cursoSchema);
