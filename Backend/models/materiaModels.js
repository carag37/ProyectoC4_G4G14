import mongoose from "mongoose";

const MateriasSchema = mongoose.Schema ({
    //_id:
    nombre: { type: String, required: true, trim: true},
    curso: { type: String, required: true, trim: true},
    //curso: { type: mongoose.Schema.Types.ObjectId, ref: "cursos"},
})

export default mongoose.model("materias", MateriasSchema)