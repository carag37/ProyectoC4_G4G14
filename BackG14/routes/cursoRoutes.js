import express from "express";
import { leerCurso, crearCurso, actualizarCurso, borrarCurso } from "../controllers/cursoController.js";

const cursoRoutes = express.Router()

//Crear
//Crear
//POST
cursoRoutes.post("/", crearCurso)
//Leer
//GET
cursoRoutes.get("/", leerCurso)
//Actualizar
//PUT
cursoRoutes.patch("/", actualizarCurso)
//Eliminar
//DELETE
cursoRoutes.delete("/", borrarCurso)

export default cursoRoutes;