import express from "express";
import { leerMateria, crearMateria, actualizarMateria, borrarMateria } from "../controllers/materiaController.js";

const router = express.Router()

//Crear
//Crear
//POST
router.post("/", crearMateria)
//Leer
//GET
router.get("/", leerMateria)
//Actualizar
//PUT
router.put("/", actualizarMateria)
//Eliminar
//DELETE
router.delete("/", borrarMateria)

export default router;