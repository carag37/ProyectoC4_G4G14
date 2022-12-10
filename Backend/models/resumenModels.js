import mongoose from "mongoose";
import genKey from "../utils/keyGenerator.js";

const ResumenSchema = mongoose.Schema ({
    "id": {type: String, default:() => genKey(5), set:() => genKey(5), immutable:true},
    "boletin": { type: mongoose.Schema.Types.ObjectId, ref: "boletines"},
    "materia":{ type: mongoose.Schema.Types.ObjectId, required:true, ref: "materias"},
    "notas": {type:[Number], min:0, max:5}
},{timestamps:true})

export default mongoose.model("resumenes", ResumenSchema)