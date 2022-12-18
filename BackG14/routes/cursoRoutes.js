import express from "express";
import { leerCurso, crearCurso, actualizarCurso, borrarCurso } from "../controllers/cursoController.js";
import loginMiddleware from "../middleware/loginMiddleware.js";

const cursoRoutes = express.Router()

//Crear
//Crear
//POST
cursoRoutes.post("/", loginMiddleware, crearCurso)
//Leer
//GET
cursoRoutes.get("/", loginMiddleware, leerCurso)
//Actualizar
//PUT
cursoRoutes.patch("/", loginMiddleware, actualizarCurso)
//Eliminar
//DELETE
cursoRoutes.delete("/", loginMiddleware, borrarCurso)

export default cursoRoutes;