import Curso from "../models/cursoModels.js";

async function leerCurso(req, res) {
    try{
        const curso = await Curso.find();
        res.json({curso});
    }catch(error){
        console.log(error);
    }   
}

async function crearCurso(req, res) {
    const {descripcion} = req.body;
    try{
        let curso = await Curso.findOne({descripcion});
        if (curso){
            return res.status(400).json({msg:" El curso ya existe"});
        }
        
        curso = new Curso(req.body);
        const cursoGuardado = await curso.save();
        res.json(cursoGuardado);

    }catch(error){
        console.log(error);
    }
    
}

async function actualizarCurso(req, res ) {
    const {id} = req.params;
    const curso = await Curso.findById(id);

    if(!curso){
        return res.status(400).json({msg:" El curso no ha sido encontrada"});

    }
    
    curso.descripcion = req.body.descripcion || curso.nombre;
    curso.save();
    res.json({curso});
}

async function borrarCurso(req, res ) {
    const {id} = req.params;
    const curso = await Curso.findById(id);

    if(!curso){
        return res.status(400).json({msg:" El curso no ha sido encontrado"});

    }
    try{
        await Curso.deleteOne({_id: req.params.id});
        res.json({msg:"El curso ha sido  Eliminado"});

    } catch(error){
    console.log(error);
  } 
}

export {leerCurso, crearCurso, actualizarCurso, borrarCurso}
