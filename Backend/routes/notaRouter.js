import express from "express";
import { crearNota, borrarNota, leerNota, actualizarNota } from "../controllers/notaController.js";

const notaRouter = express.Router()

//Crear
//Crear
//POST
notaRouter.post("/", crearNota)
//Leer
//GET
notaRouter.get("/", leerNota)
//Actualizar
//PUT
notaRouter.put("/", actualizarNota)
//Eliminar
//DELETE
notaRouter.delete("/", borrarNota)

export default notaRouter;