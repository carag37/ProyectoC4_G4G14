import express from "express";
import { crearBoletin, borrarBoletin, leerBoletin, actualizarBoletin } from "../controllers/boletinController.js";

const router = express.Router()

//Crear
//Crear
//POST
router.post("/", crearBoletin)
//Leer
//GET
router.get("/", leerBoletin)
//Actualizar
//PUT
router.put("/", actualizarBoletin)
//Eliminar
//DELETE
router.delete("/", borrarBoletin)

export default router;