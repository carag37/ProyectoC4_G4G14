import mongoose from "mongoose";

const MensajeSchema = mongoose.Schema ({
    //_id:
    texto: { type: String, required: true, trim: true},
    acudiente:{ type: mongoose.Schema.Types.ObjectId, ref: "acudientes"},
    docente:{ type: mongoose.Schema.Types.ObjectId, ref: "docentes" },
})

export default mongoose.model("mensajes", MensajeSchema)