import mongoose from "mongoose";

const CursoSchema = mongoose.Schema ({
    //_id:
    descripcion: { type: String, required: true, trim: true},
    materia: { type: mongoose.Schema.Types.ObjectId, ref: "materias"},
})

export default mongoose.model("cursos", CursoSchema)