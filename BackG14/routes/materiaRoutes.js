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
router.put("/:id", actualizarMateria)
//Eliminar
//DELETE
router.delete("/:id", borrarMateria)

export default router;