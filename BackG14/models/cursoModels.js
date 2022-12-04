//const mongoose = require("mongoose");

import mongoose from "mongoose";


const CursoSchema = mongoose.Schema({
    descripcion: { type: String, required: true, trim: true},
    materia:{ type: [mongoose.Schema.Types.ObjectId], ref: "Materia"},

});

export default mongoose.model("Curso", CursoSchema);
//module.exports = mongoose.model("Curso", cursoSchema);
