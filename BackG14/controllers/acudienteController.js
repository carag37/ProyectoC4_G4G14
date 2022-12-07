import Acudiente from "../models/acudienteModels.js";

async function leerAcudiente (req,res) {

    try{
        const acudiente = await Acudiente.find();
        res.json({acudiente});
    }catch(error){
        console.log(error);
    }
    
}

async function crearAcudiente (req,res) {

    const {nombre,direccion,telefono,parentesco,estado = 1,usuarioSistema} =req.body;

    try{
        let acudiente = await Acudiente.findOne({usuarioSistema});
        console.log(acudiente);
        if (acudiente){
            return res.status(400).json({msg:" El acudiente ya existe"});
        }
        
        acudiente = new Acudiente(req.body);
        const acudienteGuardado = await acudiente.save();
        res.json(acudienteGuardado);

    }catch(error){
        console.log(error);
    }
    
}

async function actualizarAcudiente (req,res) {

    const {id} = req.params;
    //console.log(id);
    const acudiente = await Acudiente.findById(id);

    if(!acudiente){
        return res.status(400).json({msg:" El administrador no ha sido encontrado"});

    }
    acudiente.nombre = req.body.nombre || acudiente.nombre;
    acudiente.direccion = req.body.direccion || acudiente.direccion;
    acudiente.telefono = req.body.telefono || acudiente.telefono;
    acudiente.parentesco = req.body.parentesco || acudiente.parentesco;
    acudiente.estado =req.body.estado || acudiente.estado;
    acudiente.usuarioSistema = req.body.usuarioSistema || acudiente.usuarioSistema;
    acudiente.save();
    res.json({acudiente});
}

async function borrarAcudiente (req,res) {
//exports.borrarAdmin = async (req, res ) => {
    const {id} = req.params;
    const acudiente = await Acudiente.findById(id);
    
    if(!acudiente){
        return res.status(400).json({msg:" El acudiente no ha sido encontrado"});

    }
    try{
        await acudiente.deleteOne({_id: req.params.id});
        res.json({msg:"El acudiente ha sido Eliminado"});

    } catch(error){
        console.log(error);

    } 
}

export {leerAcudiente, crearAcudiente, actualizarAcudiente, borrarAcudiente}