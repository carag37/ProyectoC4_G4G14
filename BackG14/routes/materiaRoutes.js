import express from "express";
import { leerMateria, crearMateria, actualizarMateria, borrarMateria } from "../controllers/materiaController.js";

const materiaRoutes = express.Router()

//Crear
//Crear
//POST
materiaRoutes.post("/", crearMateria)
//Leer
//GET
materiaRoutes.get("/", leerMateria)
//Actualizar
//PUT
materiaRoutes.patch("/", actualizarMateria)
//Eliminar
//DELETE
materiaRoutes.delete("/", borrarMateria)

export default materiaRoutes;