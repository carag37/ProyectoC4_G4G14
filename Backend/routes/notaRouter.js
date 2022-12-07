import express from "express";
import { crearNota, borrarNota, leerNota, actualizarNota } from "../controllers/notaController.js";

const router = express.Router()

//Crear
//Crear
//POST
router.post("/", crearNota)
//Leer
//GET
router.get("/", leerNota)
//Actualizar
//PUT
router.put("/", actualizarNota)
//Eliminar
//DELETE
router.delete("/", borrarNota)

export default router;