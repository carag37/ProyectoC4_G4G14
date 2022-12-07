import userModel from "../models/usuarioModels.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { config } from "dotenv";

//require("dotenv").config({ path: "variables.env"});

//const ACCESS_TOKEN = "b36d6185c3638eb5ea0b7ac017c36e3a4b5aef7eac566c491cad96b4cb3a25722ce4e1c09a338c23cadba5918e5eae629568dfe4a477c49008c1bc4d4c8ee0ce"


export default async function login(req, res) {

    const { email, password } = req.headers;
   // config({ path: "variables.env"});
    try{

        // Revisar que el correo exista
        let usuario = await Usuario.findOne({ email });
        //Revisar que los campos de email y password no esten vacios.
        if (email == null || password == null) {
            res.sendStatus(401)
            return
        }

        //Validar que el password encriptado sea igual al password digitado por el usuario
        const passwordOk = await bcryptjs.compare(password, usuario.password);

        if (!passwordOk){
           return res.status(404).json({msg: "password incorrecto"});
        }

        let valido = {
            usuario: {id : usuario.id},
         };
         //res.json(valido);
          jwt.sign(
                    valido,
                    process.env.SECRETO,
                 {
                    //Determinar el tiempo de validez del token
                    expiresIn: '30d', 
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
    if (nombre == null || password == null) {
        res.sendStatus(401)
        return
    }
    const usuario = await userModel.findOne({
        nombre
    })
    if (usuario == null) {
        res.sendStatus(401)
        return
    }
    const valido = await bcrypt.compare(password, usuario.contraseña)

    if (valido) {
        const token = jwt.sign(nombre, ACCESS_TOKEN)
        res.status(200).json({ token })
    } else {
        res.sendStatus(401)
    }

}

  // exports.usuarioAutenticado = async ( req, res) =>{
    export  async function usuarioAutenticado ( req, res) {
    try{
        const usuario = await Usuario.findById(req.usuario.id);
        res.json({ usuario});
    }catch(error){
        res.status(403).json({ msg: "Hubo un error"});
    }
}