import mongoose from "mongoose";

const UsuarioSchema = mongoose.Schema ({
    //_id:
    nombre: { type: String, required: true, trim: true},
    email: { type: String, required: true, trim: true, unique: true},
    password:{ type: String, required: true, trim: true},
    tipoUsuario:{ type: mongoose.Schema.Types.ObjectId, ref: "tipoUsuario" },
    fechaRegistro: { type: Date, default: Date.now()},
})

export default mongoose.model("usuarios", UsuarioSchema)