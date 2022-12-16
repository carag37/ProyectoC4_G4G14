import Usuario from "../models/usuarioModels.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { config } from "dotenv";

//require("dotenv").config({ path: "variables.env"});

//const ACCESS_TOKEN = "b36d6185c3638eb5ea0b7ac017c36e3a4b5aef7eac566c491cad96b4cb3a25722ce4e1c09a338c23cadba5918e5eae629568dfe4a477c49008c1bc4d4c8ee0ce"

async function login(req, res) {

    const { email, password } = req.body;
    config({ path: "variables.env"}); //funcion que llama al archivo de las variables de entorno
    
    
    try{
        // revisar que el correo exista
        let usuario = await Usuario.findOne({email});
        
       /* if (usuario==null || password == null){
            res.sendStatus(401);
            return;
        }*/

        if (!usuario){
            return res.status(400).json({ msg : 'El usuario no existe'});
        }

        //validar el password
        const passwordCorrecto = await bcrypt.compare(password, usuario.password);
        //res.json(passwordCorrecto);
    

        if (!passwordCorrecto){
           return res.status(404).json({msg: "El Password es incorrecto"});
        }

        // Si las validaciones son correctas entonces crear el token

        let token = {
           usuario: {id : usuario.id},
        };

         jwt.sign(
           token,
           process.env.CRYPT,
           {
               expiresIn: '30d', //Tiempo de expriracion del token
           },
           (error, token) =>{
               if (error) throw error;
               // mensaje de confirmación
               res.json({token});
           }

         );


   }catch(error){
       console.log(error);
   }
}

      
   async function usuarioAutenticado ( req, res) {
    try{
        const usuario = await Usuario.findById(req.usuario.id);
        res.json({ usuario});
    }catch(error){
        res.status(403).json({ msg: "Hubo un error"});
    }
}

export {login, usuarioAutenticado}