import mongoose from "mongoose";

const AlumnoSchema = mongoose.Schema ({
    //_id:
    nombre: { type: String, required: true, trim: true},
    direccion: { type: String, required: true, trim: true},
    telefono: { type: Number, required: true, trim: true},
    fechaNacimiento: { type: Date, required: true, trim: true, unique: true},
    acudiente: {type: mongoose.Schema.Types.ObjectId, ref: "acudientes"},
    matricula: {type: mongoose.Schema.Types.ObjectId, ref: "matriculas"},
})

export default mongoose.model("alumnos", AlumnoSchema)