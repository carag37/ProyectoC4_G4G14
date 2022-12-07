import express from "express";
import { crearCalificacion, borrarCalificacion, leerCalificacion, actualizarCalificacion } from "../controllers/calificacionController.js";

const router = express.Router()

//Crear
//Crear
//POST
router.post("/", crearCalificacion)
//Leer
//GET
router.get("/", leerCalificacion)
//Actualizar
//PUT
router.put("/", actualizarCalificacion)
//Eliminar
//DELETE
router.delete("/", borrarCalificacion)

export default router;