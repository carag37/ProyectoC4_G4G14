import express from "express";
import { leerUsuario, crearUsuario, actualizarUsuario, borrarUsuario } from "../controllers/usuarioController.js";


const router = express.Router()

//Crear
//POST
router.post("/", crearUsuario)
//Leer
//GET
router.get("/", leerUsuario)
//Actualizar
//PUT
router.put("/", actualizarUsuario)
//Eliminar
//DELETE
router.delete("/", borrarUsuario)

export default router