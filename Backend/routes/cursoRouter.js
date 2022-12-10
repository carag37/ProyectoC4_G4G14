import express from "express";
import { leerCurso, crearCurso, actualizarCurso, borrarCurso } from "../controllers/cursoController.js";

const cursoRouter = express.Router()

//Crear
//Crear
//POST
cursoRouter.post("/", crearCurso)
//Leer
//GET
cursoRouter.get("/", leerCurso)
//Actualizar
//PUT
cursoRouter.patch("/", actualizarCurso)
//Eliminar
//DELETE
cursoRouter.delete("/", borrarCurso)

export default cursoRouter;