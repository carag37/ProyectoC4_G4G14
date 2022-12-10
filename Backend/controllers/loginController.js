import UsuarioSchema from "../models/usuarioModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//---------EJEMPLO AUTENTICACIÓN-------------------

const ACCESS_TOKEN = "ce1397ab3c6060a05847552354261875ee45275711cf1d75e1e462ccebeac638f6b71eb76bdcc2b281b9f73da6633198eae4d6e9f48fb151afe493b1ac482fd6"

export default async function login(req, res) {
    
    const { nombre, password } = req.headers;
    
    if(nombre == null || password==null){
        res.sendStatus(401)
        return
    }

    const userAuth = await UsuarioSchema.findOne({
        "nombre": nombre
    })

    if (userAuth == null) {
        res.sendStatus(401)
        return
    }

    const validate = await bcrypt.compare(password, userAuth.password)

    if (validate) {
        const token = jwt.sign(nombre, ACCESS_TOKEN)
        res.status(200).json({token})
    } else {
        res.sendStatus(401)
    }

}