import mongoose from "mongoose";

const BoletinSchema = mongoose.Schema ({
    //_id:
    "nombre": { type: String, required: true, trim: true},
    "alumno": { type: mongoose.Schema.Types.ObjectId, ref: "alumnos"},
    "materia":{ type: mongoose.Schema.Types.ObjectId, ref: "materias"},
    "docente":{ type: mongoose.Schema.Types.ObjectId, ref: "docentes" },
    "notas": {type:[Number]}
})

export default mongoose.model("boletines", BoletinSchema)