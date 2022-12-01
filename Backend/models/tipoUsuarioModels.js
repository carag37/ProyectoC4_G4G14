import mongoose from "mongoose";

const TipoUsuarioSchema = mongoose.Schema ({
    //_id:
    descripcion: { type: String, required: true, trim: true},
})

export default mongoose.model("tipoUsuarios", TipoUsuarioSchema)