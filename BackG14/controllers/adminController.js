import Admin from "../models/adminModels.js";

async function leerAdmin (req,res) {
//exports.leerAdmin = async (req, res ) => {
    try{
        const admin = await Admin.find();
        res.json({admin});
    }catch(error){
        console.log(error);
    }
    
}

async function leerAdminUser (req,res) {
    
    const {id} = req.params;
    const admin = await Admin.find().where("usuarioSistema").equals(id);
    res.json(admin);
        
    }
async function crearAdmin (req,res) {

    const {cedula,nombre,direccion,telefono,estado,usuarioSistema} =req.body;

    try{
        let admin = await Admin.findOne({usuarioSistema});
        if (admin){
            return res.status(400).json({msg:"El administrador ya existe"});
        }
        
        admin = new Admin(req.body);
        const adminGuardado = await admin.save();
        res.json(adminGuardado);

    }catch(error){
        console.log(error);
    }
    
}

async function actualizarAdmin (req,res) {

    const {id} = req.params;
    //console.log(id);
    const admin = await Admin.findById(id);

    if(!admin){
        return res.status(400).json({msg:"El administrador no ha sido encontrado"});

    }
    admin.cedula = req.body.cedula || admin.cedula;
    admin.nombre = req.body.nombre || admin.nombre;
    admin.direccion = req.body.direccion || admin.direccion;
    admin.telefono = req.body.telefono || admin.telefono;
    admin.estado =req.body.estado || admin.estado;
    admin.save();
    res.json({admin});
}

async function borrarAdmin (req,res) {

    const {id} = req.params;
    const admin = await Admin.findById(id);
    
    if(!admin){
        return res.status(400).json({msg:"El administrador no ha sido encontrado"});

    }
    try{
        await admin.deleteOne({_id: req.params.id});
        res.json({msg:"El administrador ha sido Eliminado"});

    } catch(error){
        console.log(error);

    } 
}

export {leerAdmin, crearAdmin, actualizarAdmin, leerAdminUser, borrarAdmin}