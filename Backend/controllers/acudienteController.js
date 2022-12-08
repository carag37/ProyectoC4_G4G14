import Acudiente from "../models/acudienteModels.js";

async function leerAcudiente(req, res) {
    try{
        const acudiente = await Acudiente.find();
        res.json({acudiente});
    }catch(error){
        console.log(error);
    }   
}

async function crearAcudiente(req, res) {
    const {nombre, parentesco, materia, mensaje, usuarioSistema} = req.body;
    const {id} = req.params;

    try{
        let acudiente = await Acudiente.findOne({id});
        if (acudiente){
            return res.status(400).json({msg:" El Acudiente ya se encuentra registrado"});
        }
        
        acudiente = new Acudiente(req.body);
        const acudienteGuardado = await acudiente.save();
        res.json(acudienteGuardado);

    }catch(error){
        console.log(error);
    }  
}
async function actualizarAcudiente(req, res ) {
    const {id} = req.params;
    const acudiente = await Acudiente.findById(id);

    if(!acudiente){
        return res.status(400).json({msg:" El registro del acudiente no ha sido encontrado"});

    }
    
    acudiente.nombre = req.body.nombre || acudiente.nombre;
    acudiente.parentesco = req.body.parentesco || acudiente.parentesco;
    acudiente.materia = req.body.materia || acudiente.materia;
    acudiente.mensaje = req.body.mensaje || acudiente.mensaje;
    acudiente.usuarioSistema = req.body.usuarioSistema || acudiente.usuarioSistema;
    acudiente.save();
    res.json({acudiente});
}

async function borrarAcudiente(req, res ) {
    const {id} = req.params;
    const acudiente = await Acudiente.findById(id);

    if(!acudiente){
        return res.status(400).json({msg:" El registro del acudiente no ha sido encontrado"});

    }
    try{
        await Acudiente.deleteOne({_id: req.params.id});
        res.json({msg:"Registro de Acudiente Eliminado"});

    } catch(error){
    console.log(error);
  } 
}

export {leerAcudiente, crearAcudiente, actualizarAcudiente, borrarAcudiente}
