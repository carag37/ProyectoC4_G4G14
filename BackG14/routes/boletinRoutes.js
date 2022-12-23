import express from "express";
import { crearBoletin, borrarBoletin, leerBoletin, leerBoletines, actualizarBoletin } from "../controllers/boletinController.js";
import loginMiddleware from "../middleware/loginMiddleware.js";

const boletinRoutes = express.Router()

//Crear
//Crear
//POST
boletinRoutes.post("/", loginMiddleware, crearBoletin)
//Leer
//GET
boletinRoutes.get("/one/:id", loginMiddleware, leerBoletin)
boletinRoutes.get("/all", loginMiddleware, leerBoletines)
//Actualizar
//PUT
boletinRoutes.patch("/:id", loginMiddleware, actualizarBoletin)
//Eliminar
//DELETE
boletinRoutes.delete("/", loginMiddleware, borrarBoletin)

export default boletinRoutes;