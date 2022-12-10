import DocenteSchema from "../models/docenteModels.js";
import bcrypt from "bcrypt"
//--------------------------CREATE--------------------------------------------

async function crearDocente(req, res) {
    
    const {nombre, email, telefono, materia} = req.body;    /*Se toman los datos del cuerpo(body - generalmente json) de la petición (req-uest)
                                                        mediante la desestructuración de objetos - Es preferible desestructurar para validaciones*/
    //const docente = req.body; // Se puede llamar todo el body de la petición y enviarlo completo
    //const docDocente = await DocenteSchema.create(docente)
    
    //const salt = await bcrypt.genSalt(10)
    //const passEncrypted = await bcrypt.hash(password, salt)
    

    let docDocente;
    try{
    docDocente = await DocenteSchema.create({
        "nombre":nombre,
        "email":email,
        "telefono":telefono,
        "materia":materia,

    })
    } catch(error){
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    res.status(201);  //código de algo creado
    res.json(docDocente); //envío el objeto creado como un JSON
    
}

//--------------------------READ---------------------------------------------

async function leerDocente(req, res)  {
    
    const {email} = req.params//trae el nombre a partir de la dirección
    let docDocente;
     try{
        docDocente = await DocenteSchema.find({  
            "email":email,
            
        })

    // const {nombre, edad} = req.params //params por que viene desde la URL
    // let docDocente;
    //  try{
    //     /*el find solo permite consultar con elementos que estén definidos en el modelo, me encuentra todos los elementos que haya según lo que se defina
    //     Lo que encuentre lo almacena en un Array, si se desea almacenar un único elemento se usa findOne*/
    //     docDocente = await DocenteSchema.find({  
    //         "nombre":nombre,
    //         "edad":edad,
    //     })

     }catch(error){
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
     }
     
    res.status(200);  //código de Ok, si es SendStatus no hace más consultas.
    res.json(docDocente); //envío el objeto creado como un JSON
}

//-------------------------UPDATE-------------------------------------------

async function actualizarDocente(req, res) {
    
    const {email} = req.params
    const {cambios} = req.body;
    
    
    let docDocente;
    
    try{
        // docDocente = await DocenteSchema.findOne({  //el find one busca un valor que debe ser único, solo permite consultar con elementos que estén definidos en el modelo
        //     "email": email  //Lo que está entre comillas se debe llamar igual al parámetro en la DB.
        // })   //Método 1

        docDocente = await DocenteSchema.updateOne({  //el updateone busca y edita un valor que debe ser único de elementos definidos en el modelo
            "email": email  //Lo que está entre comillas se debe llamar igual al parámetro en la DB.
        }, cambios, {runValidators:true})//{"edad":123})  //Primer parámetro para buscar, segundo parámetro para editar (objeto Json). //Método 2

     }catch(error){
        res.status(400)
        res.json(error.message);
        
        return  //return para evitar enviar 2 respuestas por ejecución
     }

          
    // docDocente.edad = 123//Método 1.
    // docDocente.save()    //Método 1.

    if(docDocente.matchedCount==0){
         return res.status(400).json({msg:"El docente " + email + " no ha sido encontrado"});
    }
    //  else if(docDocente.modifiedCount<2){
    //      //return res.status(400).json({msg:" Los datos de " + email + " no han sido modificados"});
    //      return res.status(400).json(docDocente)
    //  }
    else{res.status(200).json({msg:"Docente " + email + " modificado correctamente"})}

    //res.status(200);  //código de Ok, si es SendStatus no hace más consultas.
    //res.json(docDocente); //envío el objeto creado como un JSON
    


    // const docente = await Docente.findById(id);
    
    // docente.nombre = req.body.nombre || docente.nombre;
    // docente.password = req.body.password || docente.password;
    // docente.email = req.body.email || docente.email;
    // docente.tipoDocente =req.body.tipoDocente || docente.tipoDocente;
    // docente.save();
    // res.json({docente});
}

//-------------------------DELETE-------------------------------------------

async function borrarDocente(req, res ) {

    const {email} = req.params
    let docDocente;
    
    try{
        docDocente = await DocenteSchema.findOneAndDelete({  //el find one busca un valor que debe ser único, solo permite consultar con elementos que estén definidos en el modelo
            "email": email
        })

     }catch(error){
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
     }

    
    if(!docDocente){
        return res.status(400).json({msg:" El docente " + email + " no ha sido encontrado"});
    }else{res.status(200).json({msg:"Docente " + docDocente.email + " eliminado correctamente"})}

    //res.json(docDocente); //envío el objeto creado como un JSON

    //  if(!docDocente){
    //     return res.status(400).json({msg:" El docente no ha sido encontrado"});
    //  }

    // try{
    //     await Docente.deleteOne({"email": email});
    //     res.json({msg:"Docente Eliminado"});
    // } catch(error){
    //     res.status(400)
    //     res.json(error.message);
    //     return  //return para evitar enviar 2 respuestas por ejecución
    // } 
    
}

export {leerDocente, crearDocente, actualizarDocente, borrarDocente}
