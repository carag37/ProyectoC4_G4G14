import mongoose from "mongoose";
import genKey from "../utils/keyGenerator.js";

const MateriasSchema = mongoose.Schema ({
    "codigo": {type: String, default:() => genKey(5), set:() => genKey(5)},
    "nombre": { type: String, required: true, trim: true, unique: true},
    "curso": { type:[mongoose.Schema.Types.ObjectId], ref: "cursos"},
    "docente": { type: mongoose.Schema.Types.ObjectId, ref: "docentes"}
},{timestamps:true})

export default mongoose.model("materias", MateriasSchema)