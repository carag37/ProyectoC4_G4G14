import Docente from "../models/docenteModels.js";

async function leerDocentes(req,res){
    try{
        const docente =await Docente.find();
        res.json({docente});
    }catch(error){
        console.log(error);
    }
}

async function leerDocente(req,res){
    const {id}= req.params;
    const docente =await Docente.findById(id);
    
    if(!docente){
        return res.status(400).json({msg:"El docente no ha sido encontrado"});
    }
    try{
        res.json({docente});
    }catch(error){
        console.log(error);
    }
}

//Registro Docente
async function crearDocente(req,res){
    const{nombre, direccion, telefono, materia, usuarioSistema, estado} = req.body;

    try{
        let docente =await Docente.findOne({usuarioSistema});
        if (docente){
            return res.status(400).json({msg:"El docente ya existe"});
        }

        docente=new Docente(req.body);
        const docenteGuardado = await docente.save();
        res.json(docenteGuardado);
    }catch(error){
        console.log(error);
    }
}

//Actualizar docente
async function actualizarDocente(req,res){
    const {id}= req.params;
    const docente = await Docente.findById(id);

    if(!Docente){
        return res.status(400).json({msg:"El docente no ha sido encontrado"});
    }

    docente.nombre = req.body.nombre || docente.nombre;
        docente.direccion = req.body.direccion || docente.direccion;
        docente.telefono = req.body.telefono || docente.telefono;
        docente.usuarioSistema = req.body.usuarioSistema || docente.usuarioSistema;
        docente.estado = req.body.estado || docente.estado;
        docente.telefono = req.body.telefono || docente.telefono;
        const flag = docente.materias.includes(req.body.materias)
    
    
      if(req.body.materias == undefined){
         docente.materias=docente.materias; 
         res.json({docente}); 
        }else 
         if (flag==true)
             res.json({msg:"La materia ya existe"});
         else {
            let seleccionadas=req.body.materias;
            for (let i = 0; i < seleccionadas.length; i++) {
                docente.materias.push(seleccionadas[i])
                
            }
             res.json({docente});
            } 
    
         docente.save(); 
    }



    async function cargarMaterias(req, res) {
    
        let idD = [];
        let materiasD = [];
        let docDocente;
    
        for (let i = 0; i < req.body.length; i++){
        
        idD.push(req.body[i].idD);
        materiasD.push(req.body[i].materiasD); 
        
        try {
    
            docDocente = await Docente.updateOne({ _id: req.body[i].idD }, { materias: req.body[i].materiasD})
    
        } catch (error) {
            res.status(400)
            res.json(error.message);
            return  //return para evitar enviar 2 respuestas por ejecución
        }
    
        console.log(idD)
        console.log(materiasD)
    
        }
    
    }

//Eliminar docente
async function borrarDocente(req, res){
    const {id}= req.params;
    const docente =await Docente.findById(id);

    if(!docente){
        return res.status(400).json({msg:"El docente no ha sido encontrado"});
    }
    try{
        await Docente.deleteOne({_id: req.params.id});
        res.json({msg:"Docente Eliminado"});
    }catch(error){
        console.log(error);
    }
}

export{leerDocentes,leerDocente,crearDocente,actualizarDocente,borrarDocente, cargarMaterias}