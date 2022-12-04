//const Alumno = require("../models/alumnoModels");

import Admin from "../models/adminModels";

async function leerAlumno (req,res) {
//exports.leerAlumno = async (req, res ) => {
    try{
        const alumno = await Alumno.find();
        res.json({alumno});
    }catch(error){
        console.log(error);
    }
    
}

async function crearAlumno (req,res) {
//exports.crearAlumno = async (req, res ) => {
    const {nombre,direccion,telefono,estado} =req.body;

    try{
        let alumno = await alumno.findOne({_id}); //verificar el id de mongo
        if (alumno){
            return res.status(400).json({msg:" El alumno ya existe"});
        }

        //ingreso de mas de 1 acudiente
        
        alumno = new Alumno(req.body);
        const alumnoGuardado = await alumno.save();
        res.json(alumnoGuardado);

    }catch(error){
        console.log(error);
    }
    
}

//exports.actualizarAlumno = async (req, res ) => {
    async function actualizarAlumno (req,res) {
    const {id} = req.params;
    //console.log(id);
    const alumno = await Alumno.findById(id);

    if(!alumno){
        return res.status(400).json({msg:" El alumno no ha sido encontrado"});

    }

    // como actualizar el arreglo de acudiente?????
    alumno.nombre = req.body.nombre || alumno.nombre;
    alumno.direccion = req.body.direccion || alumno.direccion;
    alumno.telefono = req.body.telefono || alumno.telefono;
    //alumno.curso = req.body.curso || alumno.curso;
    alumno.estado =req.body.estado || alumno.estado;
    alumno.save();
    res.json({alumno});
}

async function borrarAlumno (req,res) {
//exports.borrarAlumno = async (req, res ) => {
    const {id} = req.params;
    const alumno = await Alumno.findById(id);
    
    if(!alumno){
        return res.status(400).json({msg:" El alumno no ha sido encontrado"});

    }
    try{
        await alumno.deleteOne({_id: req.params.id});
        res.json({msg:"El alumno ha sido Eliminado"});

    } catch(error){
        console.log(error);

    } 
}

export {leerAlumno, crearAlumno, actualizarAlumno, borrarAlumno}