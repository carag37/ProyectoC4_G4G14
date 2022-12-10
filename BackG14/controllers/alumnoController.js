import Alumno from "../models/alumnoModels.js";
import Acudiente from "../models/acudienteModels.js"; 


//GET
async function leerAlumno (req,res) {

    try{
        const alumno = await Alumno.find();
        res.json({alumno});
    }catch(error){
        console.log(error);
    }
    
}

async function crearAlumno (req,res) {                                  
        const {idAlumno,nombre,direccion,telefono,edad,curso} =req.body;
    
        //const alumnoId = req.body.idAlumno;
        console.log(idAlumno);

        try{
            /*const alumno = await Alumno.find({idAlumno});
            console.log(alumno.id);

            if (alumno){
                return res.status(400).json({msg:idAlumno+"El alumno ya existe"});
            }*/
            
            const alumno = new Alumno(req.body);
           // res.json(alumno);
            const alumnoGuardado = await alumno.save();
            res.json(alumnoGuardado);
    
        }catch(error){
            console.log(error);
        }
        
    }
    
    

    async function actualizarAlumno (req,res) {                 //exports.actualizarAlumno = async (req, res ) => {
    const {id} = req.params;

    const alumno = await Alumno.findById(id);
    const acudienteExiste =await Acudiente.findById(req.acudiente);
   
    // console.log(alumno.acudiente[0]);
    
    if(!alumno){
        return res.status(400).json({msg:"El alumno no ha sido encontrado"});
    }

    if(!acudienteExiste){
        return res.status(400).json({msg:"El acudiente no ha sido encontrado"});
    }
    alumno.idAlumno = req.body.idAlumno || alumno.idAlumno;
    alumno.nombre = req.body.nombre || alumno.nombre;
    alumno.direccion = req.body.direccion || alumno.direccion;
    alumno.telefono = req.body.telefono || alumno.telefono;
    alumno.curso = req.body.curso || alumno.curso;
    alumno.estado =req.body.estado || alumno.estado;
    alumno.usuarioSistema = req.body.usuarioSistema || alumno.usuarioSistema;
    console.log(alumno.acudiente.length);

    alumno.acudiente.push({_id:req.body.acudiente})
/*
    for (let i=0 ;i<= alumno.acudiente.length;i++){
        if (alumno.acudiente[i] == req.body.acudiente){ 
            res.json({msg:"El acudiente ya existe"});
        } else{
            alumno.acudiente.push({_id:req.body.acudiente})
            return;
        }

    }*/
        
    alumno.save();
   res.json({alumno});
}

async function borrarAlumno (req,res) {

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