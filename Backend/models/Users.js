import mongoose from "mongoose";

const usersModel = mongoose.Schema ({
    //_id:
    "name":{type:String, required:true},
    "email":{type:String, required:true},
    "password":{type:String, required:true},
    "registry":{type:Array, required:false},
    "type":{type:Number, required:true},
})

export default mongoose.model("users", usersModel)