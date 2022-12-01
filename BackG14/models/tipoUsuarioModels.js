const mongoose = require("mongoose");

//import mongoose from "mongoose";


const TipoUsuarioSchema = mongoose.Schema({
    descripcion: { type: String, required: true, trim: true},
});

//export default mongoose.model("TipoUsuario", TipoUsuarioSchema);
module.exports = mongoose.model("TipoUsuario", TipoUsuarioSchema);
