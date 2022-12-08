import mongoose from "mongoose";

const AcudienteSchema = mongoose.Schema ({
    //_id:
    nombre: { type: String, required: true, trim: true},
    parentesco: { type: String, required: true, trim: true, unique: true},
    materia:{ type: mongoose.Schema.Types.ObjectId, ref: "materias"},
    mensaje:{ type: mongoose.Schema.Types.ObjectId, ref: "mensajes" },
    usuarioSistema:{ type: mongoose.Schema.Types.ObjectId, ref: "usuarios" },
})

export default mongoose.model("acudientes", AcudienteSchema)