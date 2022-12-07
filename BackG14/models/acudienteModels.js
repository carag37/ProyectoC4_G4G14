import mongoose from "mongoose";

const AcudienteSchema = mongoose.Schema({
   //    idAcudiente:{type: Number, required: true, trim: true, unique:true},
    nombre: { type: String, required: true, trim: true},
    direccion: { type: String, required: true, trim: true},
    telefono: { type: Number, required: true, trim: true},
    //alumno:   { type: [mongoose.Schema.Types.ObjectId], ref: "alumno"},
    parentesco: { type: String, required: true, trim: true},
    estado:{type:Boolean, required:true},
    usuarioSistema:{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
});

//definir el modelo
export default mongoose.model("Acudiente", AcudienteSchema);

//module.exports = mongoose.model("Acudiente", AcudienteSchema);
