import mongoose from "mongoose";
import genKey from "../utils/keyGenerator.js";

//const boletines = ["Periodo 1", "Periodo 2", "Periodo 3", "Periodo 4"]

//function validacionPar(v){}

const BoletinSchema = mongoose.Schema ({
    "id": {type: String, default:() => genKey(5), set:() => genKey(5), immutable:true},
    "materia":{ type: mongoose.Schema.Types.ObjectId, required:true, ref: "materias"},
    "notas": {type:[Number], min:0, max:5, required:true},
    "alumno": { type: mongoose.Schema.Types.ObjectId, ref: "alumnos", required:true},
    "creador":{ type: mongoose.Schema.Types.ObjectId, ref: "usuarios" },
    "observaciones": { type: String, maxLength:40, trim: true},
    
},{timestamps:true})

export default mongoose.model("boletines", BoletinSchema)