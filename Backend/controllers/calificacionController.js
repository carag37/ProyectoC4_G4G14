import Calificacion from "../models/calificacionModels.js";

async function leerCalificacion(req, res) {
    try{
        const calificacion = await Calificacion.find();
        res.json({calificacion});
    }catch(error){
        console.log(error);
    }   
}

async function crearCalificacion(req, res) {
    const {nombre, alumno, materia, docente, notas} = req.body;
    const {id} = req.params;
    
    try{
        let calificacion = await Calificacion.findById(id);
        if (calificacion){
            return res.status(400).json({msg:" La calificacion ya existe"});
        }
        
        calificacion = new Calificacion(req.body);
        const calificacionGuardado = await calificacion.save();
        res.json(calificacionGuardado);

    }catch(error){
        console.log(error);
    }
    
}

async function actualizarCalificacion(req, res ) {
    const {id} = req.params;
    const calificacion = await Calificacion.findById(id);

    if(!calificacion){
        return res.status(400).json({msg:" El calificacion no ha sido encontrado"});

    }
    
    calificacion.nombre = req.body.nombre || calificacion.nombre;
    calificacion.alumno = req.body.alumno || calificacion.alumno;
    calificacion.materia = req.body.materia || calificacion.materia;
    calificacion.docente =req.body.docente || calificacion.docente;
    calificacion.notas =req.body.notas || calificacion.notas;
    calificacion.save();
    res.json({calificacion});
}

async function borrarCalificacion(req, res ) {
    const {id} = req.params;
    const calificacion = await Calificacion.findById(id);

    if(!calificacion){
        return res.status(400).json({msg:" El calificacion no ha sido encontrado"});

    }
    try{
        await Calificacion.deleteOne({_id: req.params.id});
        res.json({msg:"Calificacion Eliminado"});

    } catch(error){
    console.log(error);
  } 
}

export {leerCalificacion, crearCalificacion, actualizarCalificacion, borrarCalificacion}