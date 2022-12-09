import mongoose from "mongoose";
import genKey from "../utils/keyGenerator.js";

// const perfilSchema = mongoose.Schema ({
//     "mensaje":{type:String},
//     "estado":{type:String}
// }) //se pueden hacer esquemas para que estén incluidos en otros

const ciudades = ["Barranquilla", "Medellín", "Bogotá", "Cali", "Bucaramanga"]

function validacionPar(v){
if(v % 2 == 0){
    return true;
} else{return false;}
}

const UsuarioSchema = mongoose.Schema ({
    "id": {type: String, default:() => genKey(10), set:() => genKey(10), immutable:true},
    "nombre": { type: String, minLength: 2, maxLength:30, required: true, trim: true},
    "edad": {type:Number,
             min:15,
             max:99,   
             validate:{
                validator:validacionPar,
                //message: props => `$(props.value) tiene que ser par`
             message: "El número debe ser par"
            }},
    "email": { type: String, required: true, trim: true, unique:true},
    "password":{ type: String, required: true, trim: true},
    "ciudad":{type: String, enum:ciudades},
    //"perfil":{type : perfilSchema},
    "notas": {type:[Number]},
    //"activo": Boolean,
    //"id":mongoose.Types.ObjectId,
    //"fechaRegistro": { type: Date, default: Date.now()},
},{timestamps:true})

export default mongoose.model("usuarios", UsuarioSchema)