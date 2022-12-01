const mongoose = require("mongoose");

//import mongoose from "mongoose";

const MensajeSchema = mongoose.Schema({
    texto: { type: String, required: true, trim: true},
    acudiente:{ type: mongoose.Schema.Types.ObjectId, ref: "Acudiente"},
    docente:{ type: mongoose.Schema.Types.ObjectId, ref: "Docente" },
});

//definir el modelo
//export default mongoose.model("Mensaje", MensajeSchema)

module.exports = mongoose.model("Mensaje", MensajeSchema);
