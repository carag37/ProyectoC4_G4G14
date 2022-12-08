import express from "express";
import {leerAcudiente, crearAcudiente, actualizarAcudiente, borrarAcudiente} from "../controllers/acudienteController.js";


const router = express.Router()

//Crear
//POST
router.post("/", crearAcudiente)
//Leer
//GET
router.get("/", leerAcudiente)
//Actualizar
//PUT
router.put("/", actualizarAcudiente)
//Eliminar
//DELETE
router.delete("/", borrarAcudiente)

export default router