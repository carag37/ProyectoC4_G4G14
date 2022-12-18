import mongoose from "mongoose";

const AcudienteSchema = mongoose.Schema({
    cedula:{type: Number, Required:true, trim:true},
    nombre: { type: String, required: true, trim: true},
    direccion: { type: String, required: true, trim: true},
    telefono: { type: Number, required: true, trim: true},
    alumno:   { type: [mongoose.Schema.Types.ObjectId], ref: "alumno"},
    parentesco: { type: String, required: true, trim: true},
    estado:{default: "true",type:Boolean, required:true},
    usuarioSistema:{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
});

export default mongoose.model("Acudiente", AcudienteSchema);

