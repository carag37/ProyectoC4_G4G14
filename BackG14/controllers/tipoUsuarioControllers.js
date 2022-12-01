const TipoUsuario = require("../models/tipoUsuarioModels");

//import TipoUsuario from "../models/tipoUsuario";

exports.leerTipoUsuario = async (req, res ) => {
    try{
 //revisar forma de buscar el id
        const tipoUsuario = await TipoUsuario.find();
        res.json({tipoUsuario});
    }catch(error){
        console.log(error);
    }
    
}

exports.crearTipoUsuario = async (req, res ) => {
    const {descripcion} =req.body;

    try{
        let tipoUsuario = await TipoUsuario.findOne({descripcion});
        if (tipoUsuario){
            return res.status(400).json({msg:" El tipo de usuario ya existe"});
        }
        
        tipoUsuario = new TipoUsuario(req.body);
        const tipoUsuarioGuardado = await tipoUsuario.save();
        res.json(tipoUsuarioGuardado);

    }catch(error){
        console.log(error);
    }
    
}

exports.actualizarTipoUsuario = async (req, res ) => {
    const {id} = req.params;
    //console.log(id);
    const tipoUsuario = await TipoUsuario.findById(id);

    if(!tipoUsuario){
        return res.status(400).json({msg:" El tipo de usuario no ha sido encontrado"});

    }
    
    tipoUsuario.descripcion = req.body.descripcion || tipoUsuario.descripcion;
    tipoUsuario.save();
    res.json({tipoUsuario});
}

exports.borrarTipoUsuario = async (req, res ) => {
    const {id} = req.params;
    const tipoUsuario = await TipoUsuario.findById(id);
    
    if(!tipoUsuario){
        return res.status(400).json({msg:" El tipo de usuario no ha sido encontrado"});

    }
    try{
        await TipoUsuario.deleteOne({_id: req.params.id});
        res.json({msg:"El tipo de Usuario esta Eliminado"});

    } catch(error){
        console.log(error);

    } 
}