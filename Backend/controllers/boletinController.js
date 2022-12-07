import Boletin from "../models/boletinModels.js";

async function leerBoletin(req, res) {
    try{
        const boletin = await Boletin.find();
        res.json({boletin});
    }catch(error){
        console.log(error);
    }   
}

async function crearBoletin(req, res) {
    const {nombre, alumno, materia, docente, notas} = req.body;
    const {id} = req.params;
    
    try{
        let boletin = await Boletin.findById(id);
        if (boletin){
            return res.status(400).json({msg:" El boletín ya existe"});
        }
        
        boletin = new Boletin(req.body);
        const boletinGuardado = await boletin.save();
        res.json(boletinGuardado);

    }catch(error){
        console.log(error);
    }
    
}

async function actualizarBoletin(req, res ) {
    const {id} = req.params;
    const boletin = await Boletin.findById(id);

    if(!boletin){
        return res.status(400).json({msg:" El boletin no ha sido encontrado"});

    }
    
    boletin.nombre = req.body.nombre || boletin.nombre;
    boletin.alumno = req.body.alumno || boletin.alumno;
    boletin.materia = req.body.materia || boletin.materia;
    boletin.docente =req.body.docente || boletin.docente;
    boletin.notas =req.body.notas || boletin.notas;
    boletin.save();
    res.json({boletin});
}

async function borrarBoletin(req, res ) {
    const {id} = req.params;
    const boletin = await Boletin.findById(id);

    if(!boletin){
        return res.status(400).json({msg:" El boletin no ha sido encontrado"});

    }
    try{
        await Boletin.deleteOne({_id: req.params.id});
        res.json({msg:"Boletin Eliminado"});

    } catch(error){
    console.log(error);
  } 
}

export {leerBoletin, crearBoletin, actualizarBoletin, borrarBoletin}