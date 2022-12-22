import mongoose from "mongoose";
import genKey from "../utils/keyGenerator.js";

const CursoSchema = mongoose.Schema ({
    //"id": {type: String, default:() => genKey(5), set:() => genKey(5), immutable:true},
    "descripcion": {type:String, minLength:2, maxLength:3, required:true, unique: true},
    "materia": [{ type: String }],
    "creador":{ type: mongoose.Schema.Types.ObjectId, ref: "usuarios" }
    
},{timestamps:true})

export default mongoose.model("cursos", CursoSchema)
