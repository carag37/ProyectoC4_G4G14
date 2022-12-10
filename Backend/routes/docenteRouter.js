import express from "express";
import mwPrueba from "../middlewares/mwPrueba.js";
import { leerDocente, crearDocente, actualizarDocente, borrarDocente } from "../controllers/docenteController.js";




const docenteRouter = express.Router()

//Crear
//POST
docenteRouter.post("/", mwPrueba, crearDocente)
//Leer
//GET
//docenteRouter.get("/:nombre/:edad", leerDocente)
docenteRouter.get("/:email", leerDocente)
//Actualizar
//PUT
docenteRouter.patch("/:email", actualizarDocente)  //put para cambiar todos los valores, patch para cambiar algunos o todos
//Eliminar
//DELETE
docenteRouter.delete("/:email", borrarDocente)

export default docenteRouter