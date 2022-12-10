import UsuarioSchema from "../models/usuarioModels.js";
import bcrypt from "bcrypt"
//--------------------------CREATE--------------------------------------------

async function crearUsuario(req, res) {
    
    const {nombre, edad, email, password, ciudad, notas} = req.body;    /*Se toman los datos del cuerpo(body - generalmente json) de la petición (req-uest)
                                                        mediante la desestructuración de objetos - Es preferible desestructurar para validaciones*/
    //const usuario = req.body; // Se puede llamar todo el body de la petición y enviarlo completo
    //const docUsuario = await UsuarioSchema.create(usuario)
    
    const salt = await bcrypt.genSalt(10)
    const passEncrypted = await bcrypt.hash(password, salt)
    

    let docUsuario;
    try{
    docUsuario = await UsuarioSchema.create({
        "nombre":nombre,
        "edad":edad,
        "email":email,
        "password":passEncrypted,
        "ciudad":ciudad,
        "notas":notas
    })
    } catch(error){
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
    }

    res.status(201);  //código de algo creado
    res.json(docUsuario); //envío el objeto creado como un JSON
    
}

//--------------------------READ---------------------------------------------

async function leerUsuario(req, res)  {
    
    const {nombre} = req //trae el nombre a partir del token desde el validateToken 
    let docUsuario;
     try{
        docUsuario = await UsuarioSchema.find({  
            "nombre":nombre,
            
        })

    // const {nombre, edad} = req.params //params por que viene desde la URL
    // let docUsuario;
    //  try{
    //     /*el find solo permite consultar con elementos que estén definidos en el modelo, me encuentra todos los elementos que haya según lo que se defina
    //     Lo que encuentre lo almacena en un Array, si se desea almacenar un único elemento se usa findOne*/
    //     docUsuario = await UsuarioSchema.find({  
    //         "nombre":nombre,
    //         "edad":edad,
    //     })

     }catch(error){
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
     }
     
    res.status(200);  //código de Ok, si es SendStatus no hace más consultas.
    res.json(docUsuario); //envío el objeto creado como un JSON
}

//-------------------------UPDATE-------------------------------------------

async function actualizarUsuario(req, res) {
    
    const {email} = req.params;
    const {cambios} = req.body;
    
    
    let docUsuario;
    
    try{
        // docUsuario = await UsuarioSchema.findOne({  //el find one busca un valor que debe ser único, solo permite consultar con elementos que estén definidos en el modelo
        //     "email": email  //Lo que está entre comillas se debe llamar igual al parámetro en la DB.
        // })   //Método 1

        docUsuario = await UsuarioSchema.updateOne({  //el updateone busca y edita un valor que debe ser único de elementos definidos en el modelo
            "email": email  //Lo que está entre comillas se debe llamar igual al parámetro en la DB.
        }, cambios, {runValidators:true})//{"edad":123})  //Primer parámetro para buscar, segundo parámetro para editar (objeto Json). //Método 2

     }catch(error){
        res.status(400)
        res.json(error.message);
        
        return  //return para evitar enviar 2 respuestas por ejecución
     }

          
    // docUsuario.edad = 123//Método 1.
    // docUsuario.save()    //Método 1.

    if(docUsuario.matchedCount==0){
         return res.status(400).json({msg:"El usuario " + email + " no ha sido encontrado"});
    }
    //  else if(docUsuario.modifiedCount<2){
    //      //return res.status(400).json({msg:" Los datos de " + email + " no han sido modificados"});
    //      return res.status(400).json(docUsuario)
    //  }
    else{res.status(200).json({msg:"Usuario " + email + " modificado correctamente"})}

    //res.status(200);  //código de Ok, si es SendStatus no hace más consultas.
    //res.json(docUsuario); //envío el objeto creado como un JSON
    


    // const usuario = await Usuario.findById(id);
    
    // usuario.nombre = req.body.nombre || usuario.nombre;
    // usuario.password = req.body.password || usuario.password;
    // usuario.email = req.body.email || usuario.email;
    // usuario.tipoUsuario =req.body.tipoUsuario || usuario.tipoUsuario;
    // usuario.save();
    // res.json({usuario});
}

//-------------------------DELETE-------------------------------------------

async function borrarUsuario(req, res ) {

    const {email} = req.params 
    let docUsuario;
    
    try{
        docUsuario = await UsuarioSchema.findOneAndDelete({  //el find one busca un valor que debe ser único, solo permite consultar con elementos que estén definidos en el modelo
            "email": email
        })

     }catch(error){
        res.status(400)
        res.json(error.message);
        return  //return para evitar enviar 2 respuestas por ejecución
     }

    
    if(!docUsuario){
        return res.status(400).json({msg:" El usuario " + email + " no ha sido encontrado"});
    }else{res.status(200).json({msg:"Usuario " + docUsuario.email + " eliminado correctamente"})}

    //res.json(docUsuario); //envío el objeto creado como un JSON

    //  if(!docUsuario){
    //     return res.status(400).json({msg:" El usuario no ha sido encontrado"});
    //  }

    // try{
    //     await Usuario.deleteOne({"email": email});
    //     res.json({msg:"Usuario Eliminado"});
    // } catch(error){
    //     res.status(400)
    //     res.json(error.message);
    //     return  //return para evitar enviar 2 respuestas por ejecución
    // } 
    
}

export {leerUsuario, crearUsuario, actualizarUsuario, borrarUsuario}
