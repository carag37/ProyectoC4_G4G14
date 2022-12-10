import Docente from "../models/docenteModels.js";

async function leerDocente(req,res){
    try{
        const docente =await Docente.find();
        res.json({docente});
    }catch(error){
        console.log(error);
    }
}
//Registro Docente
async function crearDocente(req,res){
    const{nombre, direccion, telefono, materia, usuarioSistema, estado} = req.body;

    try{
        let docente =await Docente.findOne({usuarioSistema});
        if (docente){
            return res.status(400).json({msg:"El docente ya existe"});
        }

        docente=new Docente(req.body);
        const docenteGuardado = await docente.save();
        res.json(docenteGuardado);
    }catch(error){
        console.log(error);
    }
}

//Actualizar docente
async function actualizarDocente(req,res){
    const {id}= req.params;
    const docente = await Docente.findById(id);

    if(!Docente){
        return res.status(400).json({msg:"El docente no ha sido encontrado"});
    }

    docente.nombre = req.body.nombre || docente.nombre;
    docente.direccion = req.body.direccion || docente.direccion;
    docente.telefono = req.body.telefono || docente.telefono;
    docente.materia = req.body.materia || docente.materia;
    //solo admin podría cambiar el usuarioSistema y estado
    //docente.usuarioSistema = req.body.usuarioSistema || docente.usuarioSistema;
    //docente.estado = req.body.estado || docente.estado;
    docente.save();
    res.json({docente});
}

//Eliminar docente
async function borrarDocente(req, res){
    const {id}= req.params;
    const docente =await Docente.findById(id);

    if(!docente){
        return res.status(400).json({msg:"El docente no ha sido encontrado"});
    }
    try{
        await Docente.deleteOne({_id: req.params.id});
        res.json({msg:"Docente Eliminado"});
    }catch(error){
        console.log(error);
    }
}

export{leerDocente,crearDocente,actualizarDocente,borrarDocente}