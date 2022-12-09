import express from "express";
import { crearBoletin, borrarBoletin, leerBoletin, actualizarBoletin } from "../controllers/boletinController.js";

const boletinRouter = express.Router()

//Crear
//Crear
//POST
boletinRouter.post("/", crearBoletin)
//Leer
//GET
boletinRouter.get("/", leerBoletin)
//Actualizar
//PUT
boletinRouter.put("/", actualizarBoletin)
//Eliminar
//DELETE
boletinRouter.delete("/", borrarBoletin)

export default boletinRouter;