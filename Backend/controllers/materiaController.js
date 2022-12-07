import Materia from "../models/materiaModels.js";

async function leerMateria(req, res) {
    try{
        const materia = await Materia.find();
        res.json({materia});
    }catch(error){
        console.log(error);
    }   
}

async function crearMateria(req, res) {
    const {nombre, curso} = req.body;
    try{
        let materia = await Materia.findOne({nombre});
        if (materia){
            return res.status(400).json({msg:" La materia ya existe"});
        }
        
        materia = new Materia(req.body);
        const materiaGuardado = await materia.save();
        res.json(materiaGuardado);

    }catch(error){
        console.log(error);
    }
    
}

async function actualizarMateria(req, res ) {
    const {id} = req.params;
    const materia = await Materia.findById(id);

    if(!materia){
        return res.status(400).json({msg:" La materia no ha sido encontrada"});

    }
    
    materia.nombre = req.body.nombre || materia.nombre;
    materia.curso = req.body.curso || materia.curso;
    materia.save();
    res.json({materia});
}

async function borrarMateria(req, res ) {
    const {id} = req.params;
    const materia = await Materia.findById(id);

    if(!materia){
        return res.status(400).json({msg:" La materia no ha sido encontrada"});

    }
    try{
        await Materia.deleteOne({_id: req.params.id});
        res.json({msg:"Materia Eliminada"});

    } catch(error){
    console.log(error);
  } 
}

export {leerMateria, crearMateria, actualizarMateria, borrarMateria}
