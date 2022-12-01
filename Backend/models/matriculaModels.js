import mongoose from "mongoose";

const MatriculaSchema = mongoose.Schema ({
    //_id:
    alumno: { type: mongoose.Schema.Types.ObjectId, ref: "alumnos"},
    curso:{ type: mongoose.Schema.Types.ObjectId, ref: "cursos"},
})

export default mongoose.model("matriculas", MatriculaSchema)