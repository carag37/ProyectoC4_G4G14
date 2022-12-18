import express from "express";
import { crearBoletin, borrarBoletin, leerBoletin, actualizarBoletin } from "../controllers/boletinController.js";
import loginMiddleware from "../middleware/loginMiddleware.js";

const boletinRoutes = express.Router()

//Crear
//Crear
//POST
boletinRoutes.post("/", loginMiddleware, crearBoletin)
//Leer
//GET
boletinRoutes.get("/", loginMiddleware, leerBoletin)
//Actualizar
//PUT
boletinRoutes.patch("/", loginMiddleware, actualizarBoletin)
//Eliminar
//DELETE
boletinRoutes.delete("/", loginMiddleware, borrarBoletin)

export default boletinRoutes;