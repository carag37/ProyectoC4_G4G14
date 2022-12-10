import mongoose from "mongoose";

const DocenteSchema = mongoose.Schema ({
    //_id:
    nombre: { type: String, required: true, trim: true},
    email: { type: String, required: true, trim: true, unique: true},
    telefono: { type: Number, required: true, trim: true},
    materia:{ type: mongoose.Schema.Types.ObjectId, ref: "materias"},
   
})

export default mongoose.model("docentes", DocenteSchema)