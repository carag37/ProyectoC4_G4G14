import jwt from "jsonwebtoken"

export default ( req, res, next) =>{
    //leer el token desde header de postman
    const  token  = req.header("x-auth-token");
    //const token = req.header("x-auth-token");
    //console.log(token);

    // revisar si hay token 
    if(!token){
        return res.status(400).json({ msg:"No existe un Token"});
    }

    // validar token

    try{
        const cifrado = jwt.verify(token, process.env.CRYPT)
        req.usuario = cifrado.usuario;
        //console.log(cifrado.usuario);
        next();
    }catch(error){
        res.status(400).json({msg:"Token no valido "})
    }
}