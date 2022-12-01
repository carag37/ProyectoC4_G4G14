import mongoose from "mongoose";

const DocenteSchema = mongoose.Schema ({
    //_id:
    nombre: { type: String, required: true, trim: true},
    direccion: { type: String, required: true, trim: true},
    telefono: { type: Number, required: true, trim: true},
   // email: { type: String, required: true, trim: true, unique: true},
    materia:{ type: mongoose.Schema.Types.ObjectId, ref: "materias"},
    mensaje: {type: mongoose.Schema.Types.ObjectId, ref: "mensajes"},
    usuarioSistema:{ type: mongoose.Schema.Types.ObjectId, ref: "usuarios" },
})

export default mongoose.model("docentes", DocenteSchema)