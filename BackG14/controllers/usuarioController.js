import Usuario from "../models/usuarioModels.js";
import bcrypt from "bcrypt"

async function leerUsuario (req,res) {

    try{
        const usuario = await Usuario.find();
        res.json({usuario});
    }catch(error){
        console.log(error);
    }   
}

async function leerUserId (req,res) {
    
    const {id} = req.params
    try{
        const usuario = await Usuario.findById(id);
        res.json({usuario});
    }catch(error){
        console.log(error);
    }
        //const usuario = await Usuario.find().where("_id").equals(id);        
    }

    async function leerUserTipo (req,res) {
    
        const {tipoUsuario} = req.params
        try{
            const usuario = await Usuario.find().where("tipoUsuario").equals(tipoUsuario);
            res.json({usuario});
        }catch(error){
            console.log(error);
        }        
    }
       

async function leerEmail (req,res) {
    
    const {email} = req.params
    try{
        const usuario = await Usuario.find(email);
        res.json({usuario});
        console.log(usuario);
    }catch(error){
        console.log(error);
    }
            
        }
    
    
async function crearUsuario (req,res) {
    const {  nombre, password, email} = req.body;  
    
    const salt = await bcrypt.genSalt(10);
    //const passwordCrypt = await bcrypt.hash(password,salt);

    try{
        //verificar si el correo ya existe
        let usuario = await Usuario.findOne({email});
        if (usuario){
            return res.status(400).json({msg:"El usuario ya existe"});
        }
        

        usuario = new Usuario(req.body);
         //hash
         usuario.password = await bcrypt.hash(password, salt);

         //Guardar Usuario en la base de datos
        const usuarioGuardado = await usuario.save();
        res.json(usuarioGuardado);

    }catch(error){
        console.log(error);
    }
    
}

async function actualizarUsuario (req,res) {

    const {id} = req.params;
    const usuario = await Usuario.findById(id);

    if(!usuario){
        return res.status(400).json({msg:"El usuario no ha sido encontrado"});

    }
    usuario.nombre = req.body.nombre || usuario.nombre;
    usuario.password = req.body.password || usuario.password;
    usuario.email = req.body.email || usuario.email;
    usuario.estado =req.body.estado || usuario.estado;
    usuario.save();
    usuario.password = await bcrypt.hash(usuario.password, 10);  //verificar si es igual password nuevo = encriptado
    res.json({usuario});
}

async function borrarUsuario (req,res) {

    const {id} = req.params;
    const usuario = await Usuario.findById(id);

    if(!usuario){
        return res.status(400).json({msg:" El usuario no ha sido encontrado"});

    }
    try{
        await Usuario.deleteOne({_id: req.params.id});
        res.json({msg:"Usuario Eliminado"});

    } catch(error){
    console.log(error);
  } 
}

export {leerUsuario, crearUsuario, actualizarUsuario, borrarUsuario,leerUserId, leerEmail, leerUserTipo }