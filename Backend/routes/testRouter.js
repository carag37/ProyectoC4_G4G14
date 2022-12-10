import express from "express";
import UsuarioSchema from "../models/usuarioModels.js";

const testRouter = express.Router()

//Crear
//POST
//testRouter.post("/", crearUsuario)
//Leer
//GET
testRouter.get("/", async (req, res) => {
    
    
//---------EJEMPLO REPORTE------------------
    let reportes = await UsuarioSchema.find({
        //"edad" : {$gt:42} //gt = greater than - gte = greater than and equal
        //"edad" : {$lt:42} //lt = lower than - lte = lower than equal
        //https://www.mongodb.com/docs/manual/reference/operator/query/ -> todas las operaciones que existen.
        //"edad" : {$lt:42, $ne:15} //la coma funciona como "y" se deben cumplir ambas condiciones
        $or:[                      //otra manera de utilizar el and, or y demás comparativos
            {"edad" : {$gt:42}},
            {"nombre" : {$eq:"Ana"}} 
        ]
    })
    res.json(reportes)




    })



//Actualizar
//PUT
//testRouter.patch("/:email", actualizarUsuario)  //put para cambiar todos los valores, patch para cambiar algunos o todos
//Eliminar
//DELETE
//testRouter.delete("/:email", borrarUsuario)

export default testRouter