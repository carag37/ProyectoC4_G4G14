import Nota from "../models/notaModels.js";

async function leerNota(req, res) {
    try{
        const nota = await Nota.find();
        res.json({nota});
    }catch(error){
        console.log(error);
    }   
}

async function crearNota(req, res) {
    const {nombre, alumno, materia, docente, notas} = req.body;
    const {id} = req.params;
    
    try{
        let nota = await Nota.findById(id);
        if (nota){
            return res.status(400).json({msg:" La nota ya existe"});
        }
        
        nota = new Nota(req.body);
        const notaGuardado = await nota.save();
        res.json(notaGuardado);

    }catch(error){
        console.log(error);
    }
    
}

async function actualizarNota(req, res ) {
    const {id} = req.params;
    const nota = await Nota.findById(id);

    if(!nota){
        return res.status(400).json({msg:" El nota no ha sido encontrado"});

    }
    
    nota.nombre = req.body.nombre || nota.nombre;
    nota.alumno = req.body.alumno || nota.alumno;
    nota.materia = req.body.materia || nota.materia;
    nota.docente =req.body.docente || nota.docente;
    nota.notas =req.body.notas || nota.notas;
    nota.save();
    res.json({nota});
}

async function borrarNota(req, res ) {
    const {id} = req.params;
    const nota = await Nota.findById(id);

    if(!nota){
        return res.status(400).json({msg:" El nota no ha sido encontrado"});

    }
    try{
        await Nota.deleteOne({_id: req.params.id});
        res.json({msg:"Nota Eliminado"});

    } catch(error){
    console.log(error);
  } 
}

export {leerNota, crearNota, actualizarNota, borrarNota}