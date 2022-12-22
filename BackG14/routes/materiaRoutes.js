import express from "express";
import { leerMateriaId, crearMateria, actualizarMateria, borrarMateria, leerMaterias } from "../controllers/materiaController.js";
import loginMiddleware from "../middleware/loginMiddleware.js";

const materiaRoutes = express.Router()

//Crear
//Crear
//POST
materiaRoutes.post("/", loginMiddleware, crearMateria)
//Leer
//GET
materiaRoutes.get("one/:id", loginMiddleware,  leerMateriaId)
materiaRoutes.get("/all",  loginMiddleware,  leerMaterias)
//Actualizar
//PUT
materiaRoutes.patch("/:id", loginMiddleware, actualizarMateria)
//Eliminar
//DELETE
materiaRoutes.delete("/", loginMiddleware, borrarMateria)

export default materiaRoutes;