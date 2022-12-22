import express from "express";
import { leerCursoId, crearCurso, actualizarCurso, borrarCurso, leerCurso } from "../controllers/cursoController.js";
import loginMiddleware from "../middleware/loginMiddleware.js";

const cursoRoutes = express.Router()

//Crear
//Crear
//POST
cursoRoutes.post("/", loginMiddleware, crearCurso)
//Leer
//GET
cursoRoutes.get("/one/:id", loginMiddleware, leerCursoId)
cursoRoutes.get("/all", loginMiddleware, leerCurso)

//Actualizar
//PUT
cursoRoutes.patch("/", loginMiddleware, actualizarCurso)
//Eliminar
//DELETE
cursoRoutes.delete("/", loginMiddleware, borrarCurso)

export default cursoRoutes;