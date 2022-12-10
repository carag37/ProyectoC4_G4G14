import express from "express";
import { crearResumen, borrarResumen, leerResumen, actualizarResumen } from "../controllers/resumenController.js";

const resumenRouter = express.Router()

//Crear
//Crear
//POST
resumenRouter.post("/", crearResumen)
//Leer
//GET
resumenRouter.get("/", leerResumen)
//Actualizar
//PUT
resumenRouter.put("/", actualizarResumen)
//Eliminar
//DELETE
resumenRouter.delete("/", borrarResumen)

export default resumenRouter;