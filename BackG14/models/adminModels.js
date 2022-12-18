import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
    cedula: { type: Number, required: true, trim: true},
    nombre: { type: String, required: true, trim: true},
    direccion: { type: String, required: true, trim: true},
    telefono: { type: Number, required: true, trim: true},
    estado:{default: "true", type:Boolean, required:true, trim:true},
    usuarioSistema:{type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
});

export default mongoose.model("Admin", AdminSchema)

