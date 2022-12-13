import express from "express";
import { crearBoletin, borrarBoletin, leerBoletin, actualizarBoletin } from "../controllers/boletinController.js";

const boletinRoutes = express.Router()

//Crear
//Crear
//POST
boletinRoutes.post("/", crearBoletin)
//Leer
//GET
boletinRoutes.get("/", leerBoletin)
//Actualizar
//PUT
boletinRoutes.patch("/", actualizarBoletin)
//Eliminar
//DELETE
boletinRoutes.delete("/", borrarBoletin)

export default boletinRoutes;