import mongoose from "mongoose";

const subjectsModel = mongoose.Schema ({
    //_id:
    "name":{type:String, required:true},
    "course":{type:String, required:true},
    "notes":{type:Array, required:false},
    "timeinit":{type:Number, required:true},
    "timeend":{type:Number, required:true},
    "description":{type:String, required:true},
})

export default mongoose.model("subjects", subjectsModel)