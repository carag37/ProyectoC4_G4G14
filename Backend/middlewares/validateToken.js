import jwt from "jsonwebtoken"

const ACCESS_TOKEN = "ce1397ab3c6060a05847552354261875ee45275711cf1d75e1e462ccebeac638f6b71eb76bdcc2b281b9f73da6633198eae4d6e9f48fb151afe493b1ac482fd6"

export default (req, res, next) => {
    //console.log("Validando Token");
    const { token } = req.headers

    const nombre = jwt.verify(token, ACCESS_TOKEN)
    
    if (nombre==null){
    res.sendStatus(401)
        return
    }

    req.nombre = nombre
    
    next()  //siempre al final del Middlewware se debe llamar un next
}