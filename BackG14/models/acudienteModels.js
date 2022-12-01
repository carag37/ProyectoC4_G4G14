const mongoose = require("mongoose");

//import mongoose from "mongoose";

const AcudienteSchema = mongoose.Schema({
    nombre: { type: String, required: true, trim: true},
    parentezco: { type: String, required: true, trim: true, unique: true},
    materia:{ type: mongoose.Schema.Types.ObjectId, ref: "Materia"},
    mensaje:{ type: mongoose.Schema.Types.ObjectId, ref: "Mensaje" },
    usuarioSistema:{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
});

//definir el modelo
//export default mongoose.model("Acudiente", AcudienteSchema);

module.exports = mongoose.model("Acudiente", AcudienteSchema);
