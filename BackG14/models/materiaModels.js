import mongoose from "mongoose";
import genKey from "../utils/keyGenerator.js";

const MateriasSchema = mongoose.Schema ({
    "codigo": {type: String, default:() => genKey(5), set:() => genKey(5)},
    "nombre": { type: String, required: true, trim: true, unique: true},
    "curso": [{ type: String, ref:"cursos" }],
    "docente": { type: mongoose.Schema.Types.ObjectId, ref: "docentes"},
    "creador":{ type: mongoose.Schema.Types.ObjectId, ref: "usuarios" }
    
},{timestamps:true})

export default mongoose.model("materias", MateriasSchema)