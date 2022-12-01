import mongoose from "mongoose";

const notesModel = mongoose.Schema ({
    //_id:
    "name":{type:String, required:true},
    "value":{type:String, required:true},
    "subject":{type:Array, required:false},
    "course":{type:Number, required:true},
    "comment":{type:String, required:true},
})

export default mongoose.model("notes", notesModel)