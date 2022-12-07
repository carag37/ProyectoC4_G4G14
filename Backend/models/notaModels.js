import mongoose from "mongoose";

const NotaSchema = mongoose.Schema ({
    //_id:
    alumno: { type: mongoose.Schema.Types.ObjectId, ref: "alumnos"},
    materia:{ type: mongoose.Schema.Types.ObjectId, ref: "materias"},
    notas:{ type: Object  },
    
})

export default mongoose.model("notas", NotaSchema)