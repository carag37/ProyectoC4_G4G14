import Alumno from "../models/alumnoModels.js";
import Acudiente from "../models/acudienteModels.js"; 


//GET
async function leerAlumno (req,res) {
//exports.leerAlumno = async (req, res ) => {
    try{
        const alumno = await Alumno.find();
        res.json({alumno});
    }catch(error){
        console.log(error);
    }
    
}

async function crearAlumno (req,res) {                                //exports.crearAdmin = async (req, res ) => {  
        const {idAlumno,nombre,direccion,telefono,edad,curso,estado} =req.body;
    
        try{
            let alumno = await Alumno.findOne({idAlumno});
            if (alumno){
                return res.status(400).json({msg:" El alumno ya existe"});
            }
            
            alumno = new Alumno(req.body);
            const alumnoGuardado = await alumno.save();
            res.json(alumnoGuardado);
    
        }catch(error){
            console.log(error);
        }
        
    }
    
    

    async function actualizarAlumno (req,res) {                 //exports.actualizarAlumno = async (req, res ) => {
    const {id} = req.params;

    const alumno = await Alumno.findById(id);
   // console.log(alumno.acudiente[0]);
    
    if(!alumno){
        return res.status(400).json({msg:" El alumno no ha sido encontrado"});
    }
    
    alumno.idAlumno = req.body.idAlumno || alumno.idAlumno;
    alumno.nombre = req.body.nombre || alumno.nombre;
    alumno.direccion = req.body.direccion || alumno.direccion;
    alumno.telefono = req.body.telefono || alumno.telefono;
    alumno.curso = req.body.curso || alumno.curso;
    alumno.estado =req.body.estado || alumno.estado;
    alumno.usuarioSistema = req.body.usuarioSistema || alumno.usuarioSistema;
    for (let i=0 ;i<= alumno.acudiente.length;i++){
        if (alumno.acudiente[i] == req.body.acudiente){
            res.json({msg:"El acudiente ya existe"});
        }
    }
        alumno.acudiente.push({_id:req.body.acudiente})
        console.log(alumno.acudiente);
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