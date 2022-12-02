//import mongoose from "mongoose";
const mongoose = require("mongoose");

const UsuariosSchema = mongoose.Schema({
    nombre: { type: String, required: true, trim: true},
    email: { type: String, required: true, trim: true, unique: true},
    password:{ type: String, required: true, trim: true},
    tipoUsuario:{ type: mongoose.Schema.Types.ObjectId, ref: "TipoUsuario" },
    estado:{type:String, required:true, trim:true},
    registro: { type: Date, default: Date.now()},
});

//definir el modelo


//export default mongoose.model("Usuario", UsuarioSchema)
module.exports = mongoose.model("Usuario", UsuariosSchema);
