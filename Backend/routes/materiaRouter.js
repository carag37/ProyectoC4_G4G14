import express from "express";
import { leerMateria, crearMateria, actualizarMateria, borrarMateria } from "../controllers/materiaController.js";

const materiaRouter = express.Router()

//Crear
//Crear
//POST
materiaRouter.post("/", crearMateria)
//Leer
//GET
materiaRouter.get("/", leerMateria)
//Actualizar
//PUT
materiaRouter.patch("/", actualizarMateria)
//Eliminar
//DELETE
materiaRouter.delete("/", borrarMateria)

export default materiaRouter;